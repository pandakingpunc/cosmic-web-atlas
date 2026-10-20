# Data format — Cosmic Web Atlas

Reference for contributing content to `index.html`, a single-file Three.js app
("Cosmic Web Atlas" / "Kozmik Ağ Atlası") that renders the large-scale structure of
the universe in supergalactic coordinates (1 unit = 1 Mpc, comoving, H0 = 70, Om = 0.3).
Bilingual UI: Turkish is the source language, English provided via `en:{n, t}` fields.

New objects are added directly inside the module script of `index.html`
(`L.push(...)`, `KE.push(...)`, `VOIDS.push(...)`, `SC.push(...)`, `farObj({...})`,
tour stops inside the `TOUR` array). The identifiers below exist in that scope:
`L`, `KE`, `VOIDS`, `SC`, `farObj`, `eq2sg(raDeg, decDeg, dMpc) -> Vector3`,
`DC(z) -> Mpc`, `V(x, y, z) -> Vector3`.

Section markers used when this file guided a multi-agent expansion (kept for reference):

  `// @L`      — entries pushed into the known-objects list: `L.push(['id', {...}]);`
  `// @KE`     — filaments: `KE.push(['idA', 'idB', widthMpc?]);`  (width optional, default 1.25)
  `// @VOIDS`  — voids: `VOIDS.push({...});`
  `// @SC`     — superclusters/walls: `SC.push({...});`
  `// @FAR`    — distant objects: `farObj({...});`
  `// @TOUR`   — tour stops: array literal items `{q, h, d, t, en:{h, t}},`

- Only use identifiers that exist at your section's paste point:
  `L`, `KE`, `VOIDS`, `SC`, `farObj`, `eq2sg(raDeg, decDeg, dMpc) -> Vector3`,
  `DC(z) -> Mpc`, `V(x, y, z) -> Vector3`. No other helpers. No new top-level
  constants, no functions, no loops (write pushes/calls out literally).
- Strings: single quotes; escape apostrophes as `\'`. Turkish prose uses Turkish
  characters (ç ğ ı İ ö ş ü) and decimal commas ("2,5 milyon"); JS numbers always use
  decimal points (z: 0.397).
- The code will be syntax-checked with `node --check`. It must parse cleanly.

## DATA FORMATS

### L entry (measured/known object)
```js
L.push(['virgo', {n:'Başak Kümesi', ra:187.7, dec:12.39, d:16.5, m:1.25, k:'küme', lv:'local lani', c:'ok', lbl:2,
  t:'Türkçe açıklama, 1–3 cümle, somut sayılarla.',
  en:{n:'Virgo Cluster', t:'English description.'}}]);
```
- `ra`, `dec`: J2000 equatorial coordinates in DEGREES (not h:m:s).
- distance: give `d` in Mpc for anything under ~500 Mpc (preferred when a measured
  distance exists); otherwise give `z` (the app computes comoving distance).
- `m`: richness/mass proxy. 0 for individual galaxies/dwarfs. ~0.1–0.2 small groups,
  0.4–1 rich clusters, 1.5–2.6 the biggest (Coma=2, Norma=1.8, Shapley's A3558=2.6).
- `k`: kind — use ONLY: 'gökada', 'grup', 'küme'  (English mapping is automatic).
- `lv`: label visibility window (camera distance, Mpc):
  'sat' = Milky Way/Andromeda satellites (seen 0–1.6),
  'lg'  = Local Group members (0–28),
  'local' = nearby volume (4–200),
  'lani' = Laniakea scale (45–950),
  'web' = cosmic-web scale (380–7000).
  Combine with spaces, e.g. 'local lani'.
- `c`: confidence — 'ok' measured, 'approx' position/distance rough, 'debated' disputed.
- `lbl`: 0 = no label (silent member), 1 = label, 2 = big label (use sparingly).
- `of`: optional parent structure name (Turkish), shown in search/info only.
- `t` + `en.t`: REQUIRED both. 1–3 sentences with at least one concrete fact
  (discovery year, mass, size, notable property). No marketing prose, no "very big".

### KE filament — `KE.push(['idA', 'idB', 1.5]);` connects two defined ids
(existing or yours). Width in Mpc, omit for default.

### VOIDS entry
```js
VOIDS.push({n:'Çoban (Boötes) Boşluğu', c:eq2sg(222.5, 46, 213), r:50, lv:'web', conf:'ok',
  t:'...', en:{n:'Boötes Void', t:'...'}});
```
`c`: center via eq2sg(ra, dec, distanceMpc). `r`: radius Mpc. `conf`: ok/approx/debated.

### SC entry (supercluster / wall; label auto-placed at mean of members)
```js
SC.push({n:'Shapley Süperkümesi', of:['a3558','a3562'], lv:'web', c:'ok', big:1,
  t:'...', en:{n:'Shapley Supercluster', t:'...'}});
```
`of`: array of EXISTING ids (see list below) and/or ids you define in your own @L
section. `k:'duvar'` marks a wall (changes kind chip). `big:1` optional.

### farObj (distant object, z >= 0.15; the app computes its position and visuals)
```js
farObj({n:'El Gordo · ACT-CL J0102−4915', ra:15.72, dec:-49.25, z:.87, shape:'blob',
  sz:[3,2.2,2.2], np:300, ps:7, k:'küme', c:'ok', size:330, t:'...', en:{n:'...', t:'...'}});
```
- shapes: 'blob' (sz = [sx,sy,sz] Gaussian sigmas in Mpc, np points, ps point size;
  optional nq bright-core points + qs their size), 'arc' (len, rc, th), 'ring' (rr, th),
  'point' (ps only).
- `k`: ONLY 'gökada', 'küme', 'süperküme', 'yapı', 'kuasar grubu', 'kuasar', 'protoküme'.
- `size`: fly-to distance heuristic — clusters 200–330, structures 1600–3500,
  single galaxies/quasars 2500–3000.
- `c`: 'ok' or 'debated' mostly.

### TOUR stop
```js
{q:'Sloan Büyük Duvarı', h:'Sloan Büyük Duvarı', d:550, t:'Türkçe durak metni.',
  en:{h:'Sloan Great Wall', t:'English stop text.'}},
```
`q` MUST exactly equal the Turkish name of an existing label (matching is exact after
lowercasing/Turkish-fold, so copy the string character-for-character). `d`: camera
distance for the stop. Narrative: one paragraph, connects to the journey's arc.

## EXISTING IDS (do NOT redefine)
mw m31 m33 lmc smc sagdeg n6822 ic10 ic1613 wlm leo1d scds fds m32 m110 and2
m81 cena scl canes leo1 m101 ursa virgo fornax erid dorado maffei ic342 maffei1
maffei2 ngc1023 m104 n2997 col leo2 antlia hydra cen a3574 ciza norma pavo oph
perseus a262 a347 n383 a2634 a569 a400 coma leo a779 a2199 a2197 herc a2147 a2052
a1185 a1228 vsc0 vsc1 vsc2 a1795 a2142 a1689 a2029 a3558 a3562 a3556 a3560 a3571
a3528 a1736 a3532 a3266 a3158 a3128 a3112 a85 a133 a119 a2670 a2734 a2717 a4059
a2065 a2061 a2067 a2089 a2092 a1377 a1318 a1291 sgw0..sgw7 spw0..spw6

## ALREADY PRESENT (do NOT duplicate)
Superclusters/walls: Hydra–Centaurus, Perseus–Pisces, Coma, CfA2 Great Wall, Hercules,
Leo, Vela, Boötes, Shapley, Horologium–Reticulum, Pisces–Cetus, Sculptor, Corona
Borealis, Ursa Major, Ophiuchus, Pavo–Indus, Sloan Great Wall, South Pole Wall,
Laniakea (label).
Voids: Local Void, Northern/Southern Local Void, Sculptor, Microscopium, Boötes,
Giant Void (CVn), Dipole Repeller, KBC Void, Eridanus Supervoid.
Far objects: Saraswati SC, Bullet Cluster, Pandora's Cluster, BOSS Great Wall,
Phoenix Cluster, Giant Arc, Big Ring, El Gordo, Huge-LQG, Clowes–Campusano LQG,
Hercules–Corona Borealis Great Wall, Spiderweb, Hyperion, SPT2349-56, J0313-1806,
GN-z11, JADES-GS-z14-0, MoM-z14.
Tour stops: You are here, Andromeda, Virgo, Laniakea, Norma/Great Attractor,
Perseus–Pisces, CfA2, Shapley, Sloan GW, Huge-LQG, galaxy front z≈14, CMB.

## ACCURACY
- Verify coordinates/distances with web search when not certain. RA/Dec J2000 in
  degrees. If sources disagree, take the commonly cited value and set c:'approx'.
- Never invent precise-looking numbers you cannot back. Round honestly.
