# dev/ — contributor tooling

The atlas itself is a single file, `../kozmik-ag.html`; it needs no build step and no
tooling to run. This folder is only for people editing it.

- `SPEC.md` — the data formats for adding objects (clusters, voids, superclusters,
  distant objects, tour stops) with the project's accuracy and bilingual-text rules.
- `_extract.js` — pulls the module script out of `kozmik-ag.html` into `_check.mjs`.
- `_static.cjs` — static checks: i18n key parity (EN/TR), dangling filament/supercluster
  id references.
- `_harness.mjs` — smoke test: runs the whole module script in Node with stubbed
  three.js and DOM (scene building, animation frames, cosmology functions), and prints
  object counts.

Run everything from the repository root:

```
node dev/_extract.js
node --check dev/_check.mjs
node dev/_static.cjs
node dev/_harness.mjs
```

`_check.mjs` and `_run.mjs` are generated files; do not edit them.
