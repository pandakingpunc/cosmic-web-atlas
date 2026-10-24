# Cosmic Web Atlas

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23541415.svg)](https://doi.org/10.5281/zenodo.23541415)

An interactive 3D model of the large-scale structure of the universe, from the Local Group out to the cosmic microwave background (Three.js, a single HTML file).

**[▶ Open the atlas](https://pandakingpunc.github.io/cosmic-web-atlas/)** (GitHub Pages) — or just open `index.html` in a browser.

## Files

- `index.html`: the main model. Opens directly in the browser, and it is what GitHub Pages serves for this repo.
- `data/desi-dr1.bin`: a 600,043-object sample of DESI Data Release 1 (3.6 MB), read by the page at start-up.
- `dev/desi_build.py`: rebuilds that file from the DESI DR1 catalogs.
- `dev/laniakea-draft.html`: an early Laniakea Supercluster draft, kept for reference.

## What's inside

- **2MRS galaxies:** 43,482 real galaxies from the 2MASS Redshift Survey, placed in supergalactic coordinates from their redshifts.
- **DESI DR1 galaxies and quasars:** 600,043 objects from the Dark Energy Spectroscopic Instrument's first data release, carrying the real web far beyond 2MRS: all 300,043 bright galaxies of the volume-limited BGS sample (z 0.1–0.4), plus random samples of 140,000 luminous red galaxies (z 0.4–1.1), 100,000 emission-line galaxies (z 0.8–1.6) and 60,000 quasars (z 0.8–3.5). They cover DESI's footprint only (two wedges, north and south of the Milky Way), and the `DESI DR1` layer switch turns them off.
- **Local Group:** the Milky Way, Andromeda and Triangulum, plus satellites and dwarfs: the Magellanic Clouds, the Sagittarius, Sculptor, Fornax, Carina, Draco, Ursa Minor, Sextans, Canes Venatici II, Leo I & II and Leo T dwarfs, M32, M110, NGC 147, NGC 185, Andromeda I–III, NGC 6822, IC 10, IC 1613, WLM, the Tucana and Cetus dwarfs and the Antlia–Sextans Group, plus the ultra-faint and diffuse satellites Boötes I, Segue 1, Crater II and Antlia 2, Andromeda XIX, and the isolated Phoenix, Pegasus, Aquarius (DDO 210), SagDIG and Leo A dwarfs. Satellite labels appear only when you get close.
- **Nearby galaxies & groups:** M81 (with the M82 starburst), Centaurus A (with the hidden Circinus), the Sculptor Group (NGC 253, NGC 55, NGC 300), the IC 342–Maffei group behind the Milky Way, NGC 1023, Sombrero, NGC 2997, Columba, the NGC 2403 group, M51, the megamaser M106, NGC 1316 (Fornax A), the Leo II Cloud, M83, NGC 4945, M94, the Black Eye, Sunflower, Fireworks, Whale and Needle galaxies, NGC 891, M77, NGC 1365, the Leo Triplet, NGC 7331; Virgo's giants M87, M49, M60, M84 and M100; and famous oddities farther out: Stephan's Quintet, the Antennae, Arp 220, NGC 6240, the Cartwheel, Hoag's Object, the Tadpole, the "dark-matter-free" NGC 1052-DF2, Malin 1 and IC 1101…
- **Measured structures:** clusters, superclusters, walls and distant structures the catalog cannot see (Shapley, Vela, Boötes, the Quipu and Serpens–Corona Borealis superstructures mapped in 2025, the Centaurus Wall, the Perseus–Pegasus Filament, the Sloan and BOSS Great Walls, the Huge-LQG, the Hercules–Corona Borealis Great Wall…) at their positions from the literature.
- **More superclusters and voids:** the Phoenix, Columba, Pegasus, Sextans, Aquarius and Capricornus superclusters with their Abell member clusters, and the SSRS2 voids (Fornax, Cetus, Aquarius, nearby Eridanus, Piscis Austrinus) plus the Pegasus Void.
- **Distant objects:** the Bullet Cluster, Pandora's Cluster, the Phoenix Cluster, El Gordo and the Sausage; the lensing clusters Abell 2218, Abell 370, SMACS J0723.3−7327 (JWST's first deep field), MACS J0416.1−2403, MACS J1149.6+2223 (supernova Refsdal), RX J1347.5−1145 and MS 0735.6+7421; the Spiderweb, SPT2349−56, MAGAZ3NE and TN 1338 protoclusters; the quasars J0313−1806, ULAS J1342+0928 and Pōniuā'ena; the lensed star Earendel; the record clusters MACS J0717.5+3745, the Train Wreck (Abell 520), CL 0024+17, the Baby Bullet, Abell 2163, Abell 1835, SPT-CL J2106−5844, IDCS J1426.5+3508, JKCS 041 and XLSSC 122; the King Ghidorah Supercluster and the CL J1001+0220, z66OD and A2744-z7p9OD protoclusters; the quasars 3C 273, 3C 48, TON 618, APM 08279+5255, the Twin Quasar, the Einstein Cross, the Cloverleaf, J0529−4351, SDSS J0100+2802 and UHZ1; WISE W2246−0526, the Sunburst Arc, CR7, A1689-zD1, EGSY8p7, GRB 090423, GRB 090429B, the Cosmic Gems Arc, Maisie's Galaxy and JADES-GS-z13-0; and the frontier galaxies GN-z11, MACS0647−JD, GLASS-z12, HD1 (debated), JADES-GS-z14-0 and MoM-z14.
- **Voids:** the Local Void and its northern and southern branches, the Sculptor, Microscopium, Boötes, Canes Major, Capricornus, Columba, Taurus and Hercules voids, the Dipole Repeller, the KBC Void, the Eridanus Supervoid…
- **Estimated web:** unmapped regions (including behind the plane of the Milky Way) are filled with a Voronoi foam model. The texture is realistic; the individual positions are invented.
- **Zone of Avoidance**, Laniakea flow lines, distance rings, supergalactic axis markers, the z≈14 galaxy frontier and the CMB shell.
- 5 scales: Local Group · Local Sheet · Laniakea · Cosmic web · Observable universe.

## Usage

- **Language:** the app opens in English; the `EN | TR` switch at the top of the panel changes to Turkish without reloading. The choice is remembered in the browser and can also be set in the link with `?lang=en` or `?lang=tr`. Share links are the same in both languages.
- **Search:** type a name in the panel's search box, or press `/` first. Accents, case and punctuation are ignored (`momz` finds MoM-z14).
- **Guided tour:** "Start tour" (or `T`) takes you from the Milky Way to the CMB in 16 stops.
- **Records tour:** "Records tour" (or `R`) visits the heaviest, largest, most powerful and most distant things in the atlas.
- **Info card:** click a label to see the distance, redshift, light travel time, the age of the universe when that light set out, today's recession velocity (H₀·D, which exceeds the speed of light beyond ~4.3 Gpc), sky position (RA/Dec), galactic coordinates and the five nearest neighbors.
- **Measure:** "Measure from here" (or `M`) on one object, then pick another: the card shows the present-day distance between them and a line is drawn in the scene.
- **Atlas index:** "Atlas index" (or `I`) lists every labeled object, filterable by kind and sortable by distance or name.
- **Look back in time:** the slider draws the sphere from which light set out a chosen number of years ago, with its redshift, present-day radius and the age of the universe at the time.
- **Our motion:** arrows at the center show the Local Group's 627 km/s and the Sun's 369.8 km/s motion relative to the CMB (`O` toggles them).
- **Sharing:** the selected object is written to the address bar (`#nesne=koma-kumesi`) and can be shared with "Copy link".
- **Shortcuts:** `1`–`5` scales, `Space` auto-rotate, `L` labels, `G` estimated web, `V` voids, `W` Zone of Avoidance, `F` distant objects, `O` our motion, `T` tour, `R` records tour, `I` atlas index, `M` measure, `Esc` close, `?` shortcut list.
- **Save image:** downloads the current scene as a PNG (labels not included).

Cosmology: H₀ = 70 km/s/Mpc, Ωm = 0.3. Distances are comoving (present-day) distances.

## Development

Everything lives in `index.html` — no build step. The `dev/` folder holds the data
format reference (`SPEC.md`) and the test tooling (syntax, i18n parity, id references and
a Node smoke test of the whole scene); see `dev/README.md`.

## Data source and credits

The galaxies come from this catalog:

> Huchra, J. P. et al. 2012, *The 2MASS Redshift Survey — Description and Data Release*, ApJS 199, 26. http://tdc-www.harvard.edu/2mrs/

The 2MRS catalog is not stored in this repository. When the page opens, the browser downloads the l, b, Kc and cz columns of the 43,482 galaxies with 200 ≤ cz ≤ 40,000 km/s from [CDS VizieR](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=J/ApJS/199/26) (J/ApJS/199/26, ~1.4 MB) and computes the positions itself. If CDS cannot be reached, the VizieR mirror at Harvard is tried; if neither answers, the model opens without the galaxies and the panel shows a "Try again" button. The downloaded data is kept only in that browser's cache.

This work uses the VizieR catalogue access tool, CDS, Strasbourg, France (doi:10.26093/cds/vizier).

The deep galaxies and quasars come from DESI Data Release 1:

> DESI Collaboration et al. 2026, *Data Release 1 of the Dark Energy Spectroscopic Instrument*, AJ 171, 285. https://data.desi.lbl.gov/doc/releases/dr1/

DESI's data server does not allow cross-origin requests, so the page cannot download it the way it downloads 2MRS. Instead, `data/desi-dr1.bin` holds a sample made by `dev/desi_build.py` from the DR1 large-scale-structure clustering catalogs (LSS v1.5: `BGS_BRIGHT-21.5`, `LRG`, `ELG_LOPnotqso`, `QSO`; NGC + SGC). Changes made to the DESI data: only RA, Dec and redshift are kept; LRG, ELG and QSO are randomly subsampled with a fixed seed; values are rounded to 16 bits (RA ≈ 0.0055°, Dec ≈ 0.0027°, z ≈ 0.00005). DESI data are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

To rebuild the file, download the eight `*_clustering.dat.fits` files from `https://data.desi.lbl.gov/public/dr1/survey/catalogs/dr1/LSS/iron/LSScats/v1.5/` into one folder (about 650 MB) and run `python dev/desi_build.py <folder>` (numpy only).

This research used data obtained with the Dark Energy Spectroscopic Instrument (DESI). DESI construction and operations is managed by the Lawrence Berkeley National Laboratory. This material is based upon work supported by the U.S. Department of Energy, Office of Science, Office of High-Energy Physics, under Contract No. DE–AC02–05CH11231, and by the National Energy Research Scientific Computing Center, a DOE Office of Science User Facility under the same contract. Additional support for DESI was provided by the U.S. National Science Foundation (NSF), Division of Astronomical Sciences under Contract No. AST-0950945 to the NSF's National Optical-Infrared Astronomy Research Laboratory; the Science and Technology Facilities Council of the United Kingdom; the Gordon and Betty Moore Foundation; the Heising-Simons Foundation; the French Alternative Energies and Atomic Energy Commission (CEA); the National Council of Humanities, Science and Technology of Mexico (CONAHCYT); the Ministry of Science and Innovation of Spain (MICINN), and by the DESI Member Institutions: www.desi.lbl.gov/collaborating-institutions. The DESI collaboration is honored to be permitted to conduct scientific research on I’oligam Du’ag (Kitt Peak), a mountain with particular significance to the Tohono O’odham Nation. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the U.S. National Science Foundation, the U.S. Department of Energy, or any of the listed funding agencies.

## Citation and license

If you use the atlas, please cite it: GitHub's "Cite this repository" button reads [`CITATION.cff`](CITATION.cff), and every release is archived on Zenodo with a DOI.

> Karatum, M. (2026). *Cosmic Web Atlas: an interactive 3D model of the large-scale structure of the universe* (Version 1.1.0) [Computer software]. Zenodo. https://doi.org/10.5281/zenodo.23541415

The DOI above always resolves to the latest version; version 1.1.0 itself is [10.5281/zenodo.23611209](https://doi.org/10.5281/zenodo.23611209) and version 1.0.0 is [10.5281/zenodo.23541416](https://doi.org/10.5281/zenodo.23541416).

The code is released under the [MIT License](LICENSE). The 2MRS catalog is not part of this repository; cite Huchra et al. 2012 for it. The DESI sample in `data/` stays under CC BY 4.0; cite DESI Collaboration et al. 2026 for it.
