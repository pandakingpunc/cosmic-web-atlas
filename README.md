# Cosmic Web Atlas

An interactive 3D model of the large-scale structure of the universe, from the Local Group out to the cosmic microwave background (Three.js, a single HTML file).

## Files

- `kozmik-ag.html`: the main model. Opens directly in the browser.
- `index.html`: an early Laniakea Supercluster draft.

## What's inside

- **2MRS galaxies:** 43,482 real galaxies from the 2MASS Redshift Survey, placed in supergalactic coordinates from their redshifts.
- **Local Group:** the Milky Way, Andromeda and Triangulum, plus satellites and dwarfs: the Magellanic Clouds, the Sagittarius, Sculptor, Fornax, Carina, Draco, Ursa Minor, Sextans, Canes Venatici II, Leo I & II and Leo T dwarfs, M32, M110, NGC 147, NGC 185, Andromeda I–III, NGC 6822, IC 10, IC 1613, WLM, the Tucana and Cetus dwarfs and the Antlia–Sextans Group. Satellite labels appear only when you get close.
- **Nearby galaxies & groups:** M81 (with the M82 starburst), Centaurus A (with the hidden Circinus), the Sculptor Group (NGC 253, NGC 55, NGC 300), the IC 342–Maffei group behind the Milky Way, NGC 1023, Sombrero, NGC 2997, Columba, the NGC 2403 group, M51, the megamaser M106, NGC 1316 (Fornax A), the Leo II Cloud…
- **Measured structures:** clusters, superclusters, walls and distant structures the catalog cannot see (Shapley, Vela, Boötes, the Quipu and Serpens–Corona Borealis superstructures mapped in 2025, the Centaurus Wall, the Perseus–Pegasus Filament, the Sloan and BOSS Great Walls, the Huge-LQG, the Hercules–Corona Borealis Great Wall…) at their positions from the literature.
- **Distant objects:** the Bullet Cluster, Pandora's Cluster, the Phoenix Cluster, El Gordo and the Sausage; the lensing clusters Abell 2218, Abell 370, SMACS J0723.3−7327 (JWST's first deep field), MACS J0416.1−2403, MACS J1149.6+2223 (supernova Refsdal), RX J1347.5−1145 and MS 0735.6+7421; the Spiderweb, SPT2349−56, MAGAZ3NE and TN 1338 protoclusters; the quasars J0313−1806, ULAS J1342+0928 and Pōniuā'ena; the lensed star Earendel; and the frontier galaxies GN-z11, MACS0647−JD, GLASS-z12, HD1 (debated), JADES-GS-z14-0 and MoM-z14.
- **Voids:** the Local Void and its northern and southern branches, the Sculptor, Microscopium, Boötes, Canes Major, Capricornus, Columba, Taurus and Hercules voids, the Dipole Repeller, the KBC Void, the Eridanus Supervoid…
- **Estimated web:** unmapped regions (including behind the plane of the Milky Way) are filled with a Voronoi foam model. The texture is realistic; the individual positions are invented.
- **Zone of Avoidance**, Laniakea flow lines, distance rings, supergalactic axis markers, the z≈14 galaxy frontier and the CMB shell.
- 5 scales: Local Group · Local Sheet · Laniakea · Cosmic web · Observable universe.

## Usage

- **Language:** the app opens in English; the `EN | TR` switch at the top of the panel changes to Turkish without reloading. The choice is remembered in the browser and can also be set in the link with `?lang=en` or `?lang=tr`. Share links are the same in both languages.
- **Search:** type a name in the panel's search box, or press `/` first. Accents, case and punctuation are ignored (`momz` finds MoM-z14).
- **Guided tour:** "Start tour" (or `T`) takes you from the Milky Way to the CMB in 16 stops.
- **Info card:** click a label to see the distance, redshift, light travel time, the age of the universe when that light set out, sky position (RA/Dec) and galactic coordinates.
- **Sharing:** the selected object is written to the address bar (`#nesne=koma-kumesi`) and can be shared with "Copy link".
- **Shortcuts:** `1`–`5` scales, `Space` auto-rotate, `L` labels, `G` estimated web, `V` voids, `W` Zone of Avoidance, `F` distant objects, `T` tour, `Esc` close, `?` shortcut list.
- **Save image:** downloads the current scene as a PNG (labels not included).

Cosmology: H₀ = 70 km/s/Mpc, Ωm = 0.3. Distances are comoving (present-day) distances.

## Development

Everything lives in `kozmik-ag.html` — no build step. The `dev/` folder holds the data
format reference (`SPEC.md`) and the test tooling (syntax, i18n parity, id references and
a Node smoke test of the whole scene); see `dev/README.md`.

## Data source and credits

The galaxies come from this catalog:

> Huchra, J. P. et al. 2012, *The 2MASS Redshift Survey — Description and Data Release*, ApJS 199, 26. http://tdc-www.harvard.edu/2mrs/

Neither this repository nor the page contains any catalog data. When the page opens, the browser downloads the l, b, Kc and cz columns of the 43,482 galaxies with 200 ≤ cz ≤ 40,000 km/s from [CDS VizieR](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=J/ApJS/199/26) (J/ApJS/199/26, ~1.4 MB) and computes the positions itself. If CDS cannot be reached, the VizieR mirror at Harvard is tried; if neither answers, the model opens without the galaxies and the panel shows a "Try again" button. The downloaded data is kept only in that browser's cache.

This work uses the VizieR catalogue access tool, CDS, Strasbourg, France (doi:10.26093/cds/vizier).
