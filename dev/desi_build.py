"""DESI DR1 alt kümesini atlasın okuduğu ikili dosyaya çevirir: data/desi-dr1.bin

DESI'nin veri sunucusu tarayıcıdan başka sitelere (CORS) izin vermediği için 2MRS gibi
canlı çekilemiyor; bu betik bir kez çalıştırılır, çıktısı repoya girer.

Girdi: DESI DR1 LSS "clustering" katalogları (v1.5), NGC + SGC:
  https://data.desi.lbl.gov/public/dr1/survey/catalogs/dr1/LSS/iron/LSScats/v1.5/
  BGS_BRIGHT-21.5, LRG, ELG_LOPnotqso, QSO  ->  <ad>_{NGC,SGC}_clustering.dat.fits

Kullanım (repo kökünden):
  python dev/desi_build.py <fits klasörü>

Yalnızca numpy gerekir. Örnekleme sabit tohumlu, yani çıktı her seferinde aynıdır.

Biçim (little-endian):
  8 bayt  : 'DESI', sürüm (u8 = 1), iz sayısı (u8), 2 bayt boşluk
  her iz  : kod (u8), 3 bayt boşluk, n (u32), sonra n adet u16 RA, n adet u16 Dec, n adet u16 z
  RA  = q / 65535 * 360        Dec = q / 65535 * 180 - 90        z = q / 65535 * ZMAX
"""
import os
import struct
import sys

import numpy as np

ZMAX = 3.5
SEED = 20261024
# (kod, dosya adı, en çok kaç nesne) — kod index.html'deki DESI_T ile aynı sırada
TRACERS = [
    (0, 'BGS_BRIGHT-21.5', None),   # hepsi (~300 bin): yakın evrenin ağı en iyi bunda görünür
    (1, 'LRG', 140000),
    (2, 'ELG_LOPnotqso', 100000),
    (3, 'QSO', 60000),
]

FITS_T = {'L': '?', 'B': 'u1', 'I': 'i2', 'J': 'i4', 'K': 'i8', 'E': 'f4', 'D': 'f8', 'A': 'S'}


def header(f):
    cards = {}
    while True:
        blk = f.read(2880)
        if len(blk) < 2880:
            raise ValueError('FITS başlığı yarım')
        for i in range(0, 2880, 80):
            c = blk[i:i + 80].decode('ascii')
            k = c[:8].strip()
            if k == 'END':
                return cards
            if c[8:10] == '= ':
                v = c[10:].split('/')[0].strip() if not c[10:].strip().startswith("'") else c[10:].split("'")[1]
                cards[k] = v.strip()


def read_table(path, cols):
    """İlk BINTABLE uzantısından istenen sütunları okur."""
    with open(path, 'rb') as f:
        h = header(f)
        n = int(h.get('NAXIS', 0))
        size = int(np.prod([int(h['NAXIS%d' % i]) for i in range(1, n + 1)])) * abs(int(h['BITPIX'])) // 8 if n else 0
        f.seek((size + 2879) // 2880 * 2880, 1)
        h = header(f)
        if h.get('XTENSION') != 'BINTABLE':
            raise ValueError('BINTABLE bekleniyordu: ' + path)
        width, rows = int(h['NAXIS1']), int(h['NAXIS2'])
        names, formats, offsets, off = [], [], [], 0
        for i in range(1, int(h['TFIELDS']) + 1):
            form = h['TFORM%d' % i]
            rep = int(form[:-1]) if form[:-1] else 1
            code = form[-1]
            item = {'L': 1, 'B': 1, 'I': 2, 'J': 4, 'K': 8, 'E': 4, 'D': 8, 'A': 1}[code]
            dt = ('S%d' % rep) if code == 'A' else (('>' + FITS_T[code]) if rep == 1 else ('(%d,)>%s' % (rep, FITS_T[code])))
            names.append(h['TTYPE%d' % i].strip()); formats.append(dt); offsets.append(off)
            off += rep * item
        if off != width:
            raise ValueError('satır genişliği tutmuyor: %d != %d' % (off, width))
        dt = np.dtype({'names': names, 'formats': formats, 'offsets': offsets, 'itemsize': width})
        data = np.frombuffer(f.read(width * rows), dtype=dt, count=rows)
        return {c: data[c].astype('f8') for c in cols}


def main(src):
    rng = np.random.default_rng(SEED)
    out = bytearray(b'DESI' + struct.pack('<BB2x', 1, len(TRACERS)))
    for code, name, cap in TRACERS:
        parts = [read_table(os.path.join(src, '%s_%s_clustering.dat.fits' % (name, cap_)), ['RA', 'DEC', 'Z'])
                 for cap_ in ('NGC', 'SGC')]
        ra, dec, z = (np.concatenate([p[c] for p in parts]) for c in ('RA', 'DEC', 'Z'))
        ok = np.isfinite(ra) & np.isfinite(dec) & np.isfinite(z) & (z > 0) & (z < ZMAX)
        idx = np.flatnonzero(ok)
        total = len(idx)
        if cap and total > cap:
            idx = np.sort(rng.choice(idx, cap, replace=False))
        idx = idx[np.argsort(z[idx], kind='stable')]          # z sırası: sıkıştırma için
        q = lambda a, lo, span: np.clip(np.rint((a - lo) / span * 65535), 0, 65535).astype('<u2')
        qra, qdec, qz = q(ra[idx] % 360, 0, 360), q(dec[idx], -90, 180), q(z[idx], 0, ZMAX)
        out += struct.pack('<B3xI', code, len(idx))
        out += qra.tobytes() + qdec.tobytes() + qz.tobytes()
        print('%-16s %8d / %8d  z %.3f–%.3f' % (name, len(idx), total, z[idx].min(), z[idx].max()))
    dst = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'desi-dr1.bin')
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, 'wb') as f:
        f.write(out)
    print('yazıldı: data/desi-dr1.bin, %.2f MB' % (len(out) / 1e6))


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
