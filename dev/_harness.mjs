// Smoke-test harness: runs kozmik-ag.html's module script in Node with stubs.
import fs from 'fs';

/* ---------- self-contained THREE stub (injected into the app source) ---------- */
const THREE_STUB = `
export class Vector3 {
  constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
  set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
  setScalar(s) { this.x = this.y = this.z = s; return this; }
  copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
  clone() { return new Vector3(this.x, this.y, this.z); }
  add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
  addScaledVector(v, s) { this.x += v.x * s; this.y += v.y * s; this.z += v.z * s; return this; }
  sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
  subVectors(a, b) { this.x = a.x - b.x; this.y = a.y - b.y; this.z = a.z - b.z; return this; }
  multiply(v) { this.x *= v.x; this.y *= v.y; this.z *= v.z; return this; }
  multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
  divide(v) { this.x /= v.x; this.y /= v.y; this.z /= v.z; return this; }
  divideScalar(s) { return this.multiplyScalar(1 / s); }
  length() { return Math.hypot(this.x, this.y, this.z); }
  lengthSq() { return this.x * this.x + this.y * this.y + this.z * this.z; }
  normalize() { const l = this.length() || 1; return this.divideScalar(l); }
  dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
  crossVectors(a, b) { this.x = a.y * b.z - a.z * b.y; this.y = a.z * b.x - a.x * b.z; this.z = a.x * b.y - a.y * b.x; return this; }
  distanceTo(v) { return Math.hypot(this.x - v.x, this.y - v.y, this.z - v.z); }
  distanceToSquared(v) { const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z; return dx * dx + dy * dy + dz * dz; }
  lerpVectors(a, b, t) { this.x = a.x + (b.x - a.x) * t; this.y = a.y + (b.y - a.y) * t; this.z = a.z + (b.z - a.z) * t; return this; }
  applyMatrix4(m) { const e = m.elements; const x = this.x, y = this.y, z = this.z;
    this.x = e[0] * x + e[4] * y + e[8] * z + e[12]; this.y = e[1] * x + e[5] * y + e[9] * z + e[13]; this.z = e[2] * x + e[6] * y + e[10] * z + e[14]; return this; }
}
export class Matrix4 {
  constructor() { this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }
  set(...a) { this.elements = a.slice(0, 16); return this; }
  copy(m) { this.elements = m.elements.slice(); return this; }
  clone() { const m = new Matrix4(); m.elements = this.elements.slice(); return m; }
  transpose() { const e = this.elements; let t;
    t = e[1]; e[1] = e[4]; e[4] = t; t = e[2]; e[2] = e[8]; e[8] = t; t = e[6]; e[6] = e[9]; e[9] = t;
    t = e[3]; e[3] = e[12]; e[12] = t; t = e[7]; e[7] = e[13]; e[13] = t; t = e[11]; e[11] = e[14]; e[14] = t; return this; }
}
export class Float32BufferAttribute { constructor(arr, itemSize) { this.array = Float32Array.from(arr); this.itemSize = itemSize; this.needsUpdate = false; } }
export class BufferGeometry {
  constructor() { this.attributes = {}; }
  setAttribute(name, attr) { this.attributes[name] = attr; return this; }
  dispose() {}
}
class Obj3D {
  constructor() { this.position = new Vector3(); this.scale = new Vector3(1, 1, 1); this.children = []; this.visible = true; this.matrixAutoUpdate = true; this.matrix = new Matrix4(); }
  add(o) { this.children.push(o); return this; }
  remove(o) { const i = this.children.indexOf(o); if (i >= 0) this.children.splice(i, 1); return this; }
}
export class Points extends Obj3D { constructor(g, m) { super(); this.geometry = g; this.material = m; this.frustumCulled = true; } }
export class Mesh extends Obj3D { constructor(g, m) { super(); this.geometry = g; this.material = m; } }
export class Line extends Obj3D { constructor(g, m) { super(); this.geometry = g; this.material = m; } }
export class LineLoop extends Line {}
export class LineSegments extends Line {}
export class Group extends Obj3D {}
export class Scene extends Obj3D {}
export class PerspectiveCamera extends Obj3D {
  constructor(fov, aspect, near, far) { super(); this.fov = fov; this.aspect = aspect; this.near = near; this.far = far; this.up = new Vector3(); }
  updateProjectionMatrix() {}
}
class Material { constructor(o = {}) { Object.assign(this, o); if (o.uniforms) this.uniforms = o.uniforms; } }
export class ShaderMaterial extends Material {}
export class MeshBasicMaterial extends Material {}
export class LineBasicMaterial extends Material {}
export class SphereGeometry {}
export class IcosahedronGeometry {}
export const AdditiveBlending = 2, DoubleSide = 2;
export class Clock { getDelta() { return 0.016; } }
export class WebGLRenderer {
  constructor() { this.domElement = mkEl('canvas'); this.domElement.toDataURL = () => 'data:,'; this._pr = 1; }
  setPixelRatio(p) { this._pr = p; } getPixelRatio() { return this._pr; }
  setSize() {} setClearColor() {} render() {}
  setAnimationLoop(cb) { globalThis.__animLoop = cb; }
}
`;
const ORBIT_STUB = `
export class OrbitControls {
  constructor(camera, dom) { this.object = camera; this.domElement = dom; this.target = new THREE.Vector3(0, 0, 0); this._l = {}; }
  addEventListener(t, f) { (this._l[t] = this._l[t] || []).push(f); }
  update() {}
}
`;
const CSS2D_STUB = `
export class CSS2DObject extends Obj3D { constructor(el) { super(); this.element = el; this.center = { set() {} }; this.isCSS2DObject = true; } }
export class CSS2DRenderer {
  constructor() { this.domElement = mkEl('div'); }
  setSize() {} render() {}
}
`;

/* ---------- DOM stub (lives in the harness; app code reaches it via globals) ---------- */
function mkEl(tag = 'div') {
  const el = {
    tagName: (tag || 'div').toUpperCase(), children: [], style: {}, dataset: {},
    className: '', textContent: '', innerHTML: '', value: '', checked: true, hidden: false, disabled: false, tabIndex: 0,
    classList: { _s: new Set(), toggle(c, f) { if (f === undefined ? !this._s.has(c) : f) this._s.add(c); else this._s.delete(c); }, contains(c) { return this._s.has(c); }, add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); } },
    setAttribute(k, v) { (this._attrs = this._attrs || {})[k] = String(v); }, getAttribute(k) { return (this._attrs || {})[k]; }, removeAttribute(k) { delete (this._attrs || {})[k]; },
    addEventListener() {}, removeEventListener() {},
    appendChild(c) { this.children.push(c); return c; }, append(...cs) { this.children.push(...cs); }, remove() {},
    focus() {}, blur() {}, click() {}, select() {}, scrollIntoView() {},
    dispatchEvent() { return true; }, contains() { return false; },
  };
  return el;
}
globalThis.mkEl = mkEl;   // stub code içindeki WebGLRenderer / CSS2DRenderer kullanır
globalThis.__els = {};
const scaleBtns = [0, 1, 2, 3, 4].map(i => { const b = mkEl('button'); b.dataset.s = String(i); return b; });
const langBtns = ['en', 'tr'].map(l => { const b = mkEl('button'); b.dataset.l = l; return b; });
globalThis.document = {
  documentElement: mkEl('html'), body: mkEl('body'), title: '',
  getElementById: id => globalThis.__els[id] || (globalThis.__els[id] = mkEl()),
  createElement: t => mkEl(t),
  querySelectorAll: sel => {
    if (sel === '.scales button') return scaleBtns;
    if (sel === '.lang button') return langBtns;
    return [];
  },
};
globalThis.window = globalThis;
globalThis.innerWidth = 1600; globalThis.innerHeight = 900; globalThis.devicePixelRatio = 1;
globalThis.addEventListener = () => {};
globalThis.matchMedia = () => ({ matches: false });
const store = {};
globalThis.localStorage = { getItem: k => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); } };
globalThis.location = { hash: '', search: '', pathname: '/kozmik-ag.html', href: 'http://localhost/kozmik-ag.html' };
globalThis.history = { replaceState() {} };
globalThis.fetch = () => Promise.reject(new Error('offline-stub'));

/* ---------- build runnable module ---------- */
let src = fs.readFileSync('dev/_check.mjs', 'utf8');
src = src.replace("import * as THREE from 'three';", THREE_STUB + '\nconst THREE = { Vector3, Matrix4, Float32BufferAttribute, BufferGeometry, Points, Mesh, Line, LineLoop, LineSegments, Group, Scene, PerspectiveCamera, ShaderMaterial, MeshBasicMaterial, LineBasicMaterial, SphereGeometry, IcosahedronGeometry, AdditiveBlending, DoubleSide, Clock, WebGLRenderer };');
src = src.replace("import {OrbitControls} from 'three/addons/controls/OrbitControls.js';", ORBIT_STUB);
src = src.replace("import {CSS2DRenderer, CSS2DObject} from 'three/addons/renderers/CSS2DRenderer.js';", CSS2D_STUB);
fs.writeFileSync('dev/_run.mjs', src);
await import('./_run.mjs');
// birkaç kare çalıştır
for (let i = 0; i < 3; i++) globalThis.__animLoop && globalThis.__animLoop();
const cw = globalThis.__cw;
console.log('RUN OK · known ids:', Object.keys(cw.OBJ).length, '· known pts:', cw.known, '· guess pts:', cw.guess, '· haze pts:', cw.haze, '· nodes:', cw.nodes, '· edges:', cw.edges);
console.log('DC(0.05) =', cw.DC(0.05).toFixed(1), 'Mpc · zOfD(DC(0.05)) =', cw.zOfD(cw.DC(0.05)).toFixed(4), '· TL(1090) =', cw.TL(1090).toFixed(5), 'Gyr');
