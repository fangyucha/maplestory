(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload"))
    return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
    s(i);
  new MutationObserver(i => {
    for (const r of i)
      if (r.type === "childList")
        for (const o of r.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o)
  }
  ).observe(document, {
    childList: !0,
    subtree: !0
  });
  function n(i) {
    const r = {};
    return i.integrity && (r.integrity = i.integrity),
      i.referrerpolicy && (r.referrerPolicy = i.referrerpolicy),
      i.crossorigin === "use-credentials" ? r.credentials = "include" : i.crossorigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin",
      r
  }
  function s(i) {
    if (i.ep)
      return;
    i.ep = !0;
    const r = n(i);
    fetch(i.href, r)
  }
}
)();
function xr(t, e) {
  const n = Object.create(null)
    , s = t.split(",");
  for (let i = 0; i < s.length; i++)
    n[s[i]] = !0;
  return e ? i => !!n[i.toLowerCase()] : i => !!n[i]
}
function ii(t) {
  if (B(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n]
        , i = Ce(s) ? nh(s) : ii(s);
      if (i)
        for (const r in i)
          e[r] = i[r]
    }
    return e
  } else {
    if (Ce(t))
      return t;
    if (de(t))
      return t
  }
}
const Zu = /;(?![^(]*\))/g
  , eh = /:([^]+)/
  , th = /\/\*.*?\*\//gs;
function nh(t) {
  const e = {};
  return t.replace(th, "").split(Zu).forEach(n => {
    if (n) {
      const s = n.split(eh);
      s.length > 1 && (e[s[0].trim()] = s[1].trim())
    }
  }
  ),
    e
}
function fn(t) {
  let e = "";
  if (Ce(t))
    e = t;
  else if (B(t))
    for (let n = 0; n < t.length; n++) {
      const s = fn(t[n]);
      s && (e += s + " ")
    }
  else if (de(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim()
}
const sh = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , ih = xr(sh);
function ga(t) {
  return !!t || t === ""
}
const dt = t => Ce(t) ? t : t == null ? "" : B(t) || de(t) && (t.toString === Ca || !W(t.toString)) ? JSON.stringify(t, ma, 2) : String(t)
  , ma = (t, e) => e && e.__v_isRef ? ma(t, e.value) : pn(e) ? {
    [`Map(${e.size})`]: [...e.entries()].reduce((n, [s, i]) => (n[`${s} =>`] = i,
      n), {})
  } : ya(e) ? {
    [`Set(${e.size})`]: [...e.values()]
  } : de(e) && !B(e) && !Ea(e) ? String(e) : e
  , ce = {}
  , dn = []
  , it = () => { }
  , rh = () => !1
  , oh = /^on[^a-z]/
  , ri = t => oh.test(t)
  , Nr = t => t.startsWith("onUpdate:")
  , De = Object.assign
  , Rr = (t, e) => {
    const n = t.indexOf(e);
    n > -1 && t.splice(n, 1)
  }
  , lh = Object.prototype.hasOwnProperty
  , Q = (t, e) => lh.call(t, e)
  , B = Array.isArray
  , pn = t => oi(t) === "[object Map]"
  , ya = t => oi(t) === "[object Set]"
  , W = t => typeof t == "function"
  , Ce = t => typeof t == "string"
  , Ar = t => typeof t == "symbol"
  , de = t => t !== null && typeof t == "object"
  , va = t => de(t) && W(t.then) && W(t.catch)
  , Ca = Object.prototype.toString
  , oi = t => Ca.call(t)
  , ah = t => oi(t).slice(8, -1)
  , Ea = t => oi(t) === "[object Object]"
  , Or = t => Ce(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t
  , Rs = xr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , li = t => {
    const e = Object.create(null);
    return n => e[n] || (e[n] = t(n))
  }
  , ch = /-(\w)/g
  , wn = li(t => t.replace(ch, (e, n) => n ? n.toUpperCase() : ""))
  , uh = /\B([A-Z])/g
  , An = li(t => t.replace(uh, "-$1").toLowerCase())
  , ba = li(t => t.charAt(0).toUpperCase() + t.slice(1))
  , xi = li(t => t ? `on${ba(t)}` : "")
  , Jn = (t, e) => !Object.is(t, e)
  , As = (t, e) => {
    for (let n = 0; n < t.length; n++)
      t[n](e)
  }
  , Ms = (t, e, n) => {
    Object.defineProperty(t, e, {
      configurable: !0,
      enumerable: !1,
      value: n
    })
  }
  , Fs = t => {
    const e = parseFloat(t);
    return isNaN(e) ? t : e
  }
  ;
let Fo;
const hh = () => Fo || (Fo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let ze;
class fh {
  constructor(e = !1) {
    this.detached = e,
      this.active = !0,
      this.effects = [],
      this.cleanups = [],
      this.parent = ze,
      !e && ze && (this.index = (ze.scopes || (ze.scopes = [])).push(this) - 1)
  }
  run(e) {
    if (this.active) {
      const n = ze;
      try {
        return ze = this,
          e()
      } finally {
        ze = n
      }
    }
  }
  on() {
    ze = this
  }
  off() {
    ze = this.parent
  }
  stop(e) {
    if (this.active) {
      let n, s;
      for (n = 0,
        s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0,
        s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0,
          s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !e) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i,
          i.index = this.index)
      }
      this.parent = void 0,
        this.active = !1
    }
  }
}
function dh(t, e = ze) {
  e && e.active && e.effects.push(t)
}
function ph() {
  return ze
}
function _h(t) {
  ze && ze.cleanups.push(t)
}
const Pr = t => {
  const e = new Set(t);
  return e.w = 0,
    e.n = 0,
    e
}
  , wa = t => (t.w & Ot) > 0
  , Ia = t => (t.n & Ot) > 0
  , gh = ({ deps: t }) => {
    if (t.length)
      for (let e = 0; e < t.length; e++)
        t[e].w |= Ot
  }
  , mh = t => {
    const { deps: e } = t;
    if (e.length) {
      let n = 0;
      for (let s = 0; s < e.length; s++) {
        const i = e[s];
        wa(i) && !Ia(i) ? i.delete(t) : e[n++] = i,
          i.w &= ~Ot,
          i.n &= ~Ot
      }
      e.length = n
    }
  }
  , qi = new WeakMap;
let Vn = 0
  , Ot = 1;
const Ki = 30;
let Ze;
const Gt = Symbol("")
  , Gi = Symbol("");
class Dr {
  constructor(e, n = null, s) {
    this.fn = e,
      this.scheduler = n,
      this.active = !0,
      this.deps = [],
      this.parent = void 0,
      dh(this, s)
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = Ze
      , n = St;
    for (; e;) {
      if (e === this)
        return;
      e = e.parent
    }
    try {
      return this.parent = Ze,
        Ze = this,
        St = !0,
        Ot = 1 << ++Vn,
        Vn <= Ki ? gh(this) : Lo(this),
        this.fn()
    } finally {
      Vn <= Ki && mh(this),
        Ot = 1 << --Vn,
        Ze = this.parent,
        St = n,
        this.parent = void 0,
        this.deferStop && this.stop()
    }
  }
  stop() {
    Ze === this ? this.deferStop = !0 : this.active && (Lo(this),
      this.onStop && this.onStop(),
      this.active = !1)
  }
}
function Lo(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0
  }
}
let St = !0;
const Ta = [];
function On() {
  Ta.push(St),
    St = !1
}
function Pn() {
  const t = Ta.pop();
  St = t === void 0 ? !0 : t
}
function qe(t, e, n) {
  if (St && Ze) {
    let s = qi.get(t);
    s || qi.set(t, s = new Map);
    let i = s.get(n);
    i || s.set(n, i = Pr()),
      Sa(i)
  }
}
function Sa(t, e) {
  let n = !1;
  Vn <= Ki ? Ia(t) || (t.n |= Ot,
    n = !wa(t)) : n = !t.has(Ze),
    n && (t.add(Ze),
      Ze.deps.push(t))
}
function yt(t, e, n, s, i, r) {
  const o = qi.get(t);
  if (!o)
    return;
  let l = [];
  if (e === "clear")
    l = [...o.values()];
  else if (n === "length" && B(t)) {
    const a = Fs(s);
    o.forEach((c, u) => {
      (u === "length" || u >= a) && l.push(c)
    }
    )
  } else
    switch (n !== void 0 && l.push(o.get(n)),
    e) {
      case "add":
        B(t) ? Or(n) && l.push(o.get("length")) : (l.push(o.get(Gt)),
          pn(t) && l.push(o.get(Gi)));
        break;
      case "delete":
        B(t) || (l.push(o.get(Gt)),
          pn(t) && l.push(o.get(Gi)));
        break;
      case "set":
        pn(t) && l.push(o.get(Gt));
        break
    }
  if (l.length === 1)
    l[0] && Yi(l[0]);
  else {
    const a = [];
    for (const c of l)
      c && a.push(...c);
    Yi(Pr(a))
  }
}
function Yi(t, e) {
  const n = B(t) ? t : [...t];
  for (const s of n)
    s.computed && Bo(s);
  for (const s of n)
    s.computed || Bo(s)
}
function Bo(t, e) {
  (t !== Ze || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run())
}
const yh = xr("__proto__,__v_isRef,__isVue")
  , xa = new Set(Object.getOwnPropertyNames(Symbol).filter(t => t !== "arguments" && t !== "caller").map(t => Symbol[t]).filter(Ar))
  , vh = kr()
  , Ch = kr(!1, !0)
  , Eh = kr(!0)
  , Uo = bh();
function bh() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach(e => {
    t[e] = function (...n) {
      const s = Z(this);
      for (let r = 0, o = this.length; r < o; r++)
        qe(s, "get", r + "");
      const i = s[e](...n);
      return i === -1 || i === !1 ? s[e](...n.map(Z)) : i
    }
  }
  ),
    ["push", "pop", "shift", "unshift", "splice"].forEach(e => {
      t[e] = function (...n) {
        On();
        const s = Z(this)[e].apply(this, n);
        return Pn(),
          s
      }
    }
    ),
    t
}
function kr(t = !1, e = !1) {
  return function (s, i, r) {
    if (i === "__v_isReactive")
      return !t;
    if (i === "__v_isReadonly")
      return t;
    if (i === "__v_isShallow")
      return e;
    if (i === "__v_raw" && r === (t ? e ? Bh : Pa : e ? Oa : Aa).get(s))
      return s;
    const o = B(s);
    if (!t && o && Q(Uo, i))
      return Reflect.get(Uo, i, r);
    const l = Reflect.get(s, i, r);
    return (Ar(i) ? xa.has(i) : yh(i)) || (t || qe(s, "get", i),
      e) ? l : Pe(l) ? o && Or(i) ? l : l.value : de(l) ? t ? Da(l) : Lr(l) : l
  }
}
const wh = Na()
  , Ih = Na(!0);
function Na(t = !1) {
  return function (n, s, i, r) {
    let o = n[s];
    if (In(o) && Pe(o) && !Pe(i))
      return !1;
    if (!t && (!Ls(i) && !In(i) && (o = Z(o),
      i = Z(i)),
      !B(n) && Pe(o) && !Pe(i)))
      return o.value = i,
        !0;
    const l = B(n) && Or(s) ? Number(s) < n.length : Q(n, s)
      , a = Reflect.set(n, s, i, r);
    return n === Z(r) && (l ? Jn(i, o) && yt(n, "set", s, i) : yt(n, "add", s, i)),
      a
  }
}
function Th(t, e) {
  const n = Q(t, e);
  t[e];
  const s = Reflect.deleteProperty(t, e);
  return s && n && yt(t, "delete", e, void 0),
    s
}
function Sh(t, e) {
  const n = Reflect.has(t, e);
  return (!Ar(e) || !xa.has(e)) && qe(t, "has", e),
    n
}
function xh(t) {
  return qe(t, "iterate", B(t) ? "length" : Gt),
    Reflect.ownKeys(t)
}
const Ra = {
  get: vh,
  set: wh,
  deleteProperty: Th,
  has: Sh,
  ownKeys: xh
}
  , Nh = {
    get: Eh,
    set(t, e) {
      return !0
    },
    deleteProperty(t, e) {
      return !0
    }
  }
  , Rh = De({}, Ra, {
    get: Ch,
    set: Ih
  })
  , Mr = t => t
  , ai = t => Reflect.getPrototypeOf(t);
function Es(t, e, n = !1, s = !1) {
  t = t.__v_raw;
  const i = Z(t)
    , r = Z(e);
  n || (e !== r && qe(i, "get", e),
    qe(i, "get", r));
  const { has: o } = ai(i)
    , l = s ? Mr : n ? Ur : Xn;
  if (o.call(i, e))
    return l(t.get(e));
  if (o.call(i, r))
    return l(t.get(r));
  t !== i && t.get(e)
}
function bs(t, e = !1) {
  const n = this.__v_raw
    , s = Z(n)
    , i = Z(t);
  return e || (t !== i && qe(s, "has", t),
    qe(s, "has", i)),
    t === i ? n.has(t) : n.has(t) || n.has(i)
}
function ws(t, e = !1) {
  return t = t.__v_raw,
    !e && qe(Z(t), "iterate", Gt),
    Reflect.get(t, "size", t)
}
function Wo(t) {
  t = Z(t);
  const e = Z(this);
  return ai(e).has.call(e, t) || (e.add(t),
    yt(e, "add", t, t)),
    this
}
function Ho(t, e) {
  e = Z(e);
  const n = Z(this)
    , { has: s, get: i } = ai(n);
  let r = s.call(n, t);
  r || (t = Z(t),
    r = s.call(n, t));
  const o = i.call(n, t);
  return n.set(t, e),
    r ? Jn(e, o) && yt(n, "set", t, e) : yt(n, "add", t, e),
    this
}
function $o(t) {
  const e = Z(this)
    , { has: n, get: s } = ai(e);
  let i = n.call(e, t);
  i || (t = Z(t),
    i = n.call(e, t)),
    s && s.call(e, t);
  const r = e.delete(t);
  return i && yt(e, "delete", t, void 0),
    r
}
function jo() {
  const t = Z(this)
    , e = t.size !== 0
    , n = t.clear();
  return e && yt(t, "clear", void 0, void 0),
    n
}
function Is(t, e) {
  return function (s, i) {
    const r = this
      , o = r.__v_raw
      , l = Z(o)
      , a = e ? Mr : t ? Ur : Xn;
    return !t && qe(l, "iterate", Gt),
      o.forEach((c, u) => s.call(i, a(c), a(u), r))
  }
}
function Ts(t, e, n) {
  return function (...s) {
    const i = this.__v_raw
      , r = Z(i)
      , o = pn(r)
      , l = t === "entries" || t === Symbol.iterator && o
      , a = t === "keys" && o
      , c = i[t](...s)
      , u = n ? Mr : e ? Ur : Xn;
    return !e && qe(r, "iterate", a ? Gi : Gt),
    {
      next() {
        const { value: h, done: d } = c.next();
        return d ? {
          value: h,
          done: d
        } : {
          value: l ? [u(h[0]), u(h[1])] : u(h),
          done: d
        }
      },
      [Symbol.iterator]() {
        return this
      }
    }
  }
}
function It(t) {
  return function (...e) {
    return t === "delete" ? !1 : this
  }
}
function Ah() {
  const t = {
    get(r) {
      return Es(this, r)
    },
    get size() {
      return ws(this)
    },
    has: bs,
    add: Wo,
    set: Ho,
    delete: $o,
    clear: jo,
    forEach: Is(!1, !1)
  }
    , e = {
      get(r) {
        return Es(this, r, !1, !0)
      },
      get size() {
        return ws(this)
      },
      has: bs,
      add: Wo,
      set: Ho,
      delete: $o,
      clear: jo,
      forEach: Is(!1, !0)
    }
    , n = {
      get(r) {
        return Es(this, r, !0)
      },
      get size() {
        return ws(this, !0)
      },
      has(r) {
        return bs.call(this, r, !0)
      },
      add: It("add"),
      set: It("set"),
      delete: It("delete"),
      clear: It("clear"),
      forEach: Is(!0, !1)
    }
    , s = {
      get(r) {
        return Es(this, r, !0, !0)
      },
      get size() {
        return ws(this, !0)
      },
      has(r) {
        return bs.call(this, r, !0)
      },
      add: It("add"),
      set: It("set"),
      delete: It("delete"),
      clear: It("clear"),
      forEach: Is(!0, !0)
    };
  return ["keys", "values", "entries", Symbol.iterator].forEach(r => {
    t[r] = Ts(r, !1, !1),
      n[r] = Ts(r, !0, !1),
      e[r] = Ts(r, !1, !0),
      s[r] = Ts(r, !0, !0)
  }
  ),
    [t, n, e, s]
}
const [Oh, Ph, Dh, kh] = Ah();
function Fr(t, e) {
  const n = e ? t ? kh : Dh : t ? Ph : Oh;
  return (s, i, r) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? s : Reflect.get(Q(n, i) && i in s ? n : s, i, r)
}
const Mh = {
  get: Fr(!1, !1)
}
  , Fh = {
    get: Fr(!1, !0)
  }
  , Lh = {
    get: Fr(!0, !1)
  }
  , Aa = new WeakMap
  , Oa = new WeakMap
  , Pa = new WeakMap
  , Bh = new WeakMap;
function Uh(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0
  }
}
function Wh(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Uh(ah(t))
}
function Lr(t) {
  return In(t) ? t : Br(t, !1, Ra, Mh, Aa)
}
function Hh(t) {
  return Br(t, !1, Rh, Fh, Oa)
}
function Da(t) {
  return Br(t, !0, Nh, Lh, Pa)
}
function Br(t, e, n, s, i) {
  if (!de(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const r = i.get(t);
  if (r)
    return r;
  const o = Wh(t);
  if (o === 0)
    return t;
  const l = new Proxy(t, o === 2 ? s : n);
  return i.set(t, l),
    l
}
function _n(t) {
  return In(t) ? _n(t.__v_raw) : !!(t && t.__v_isReactive)
}
function In(t) {
  return !!(t && t.__v_isReadonly)
}
function Ls(t) {
  return !!(t && t.__v_isShallow)
}
function ka(t) {
  return _n(t) || In(t)
}
function Z(t) {
  const e = t && t.__v_raw;
  return e ? Z(e) : t
}
function Ma(t) {
  return Ms(t, "__v_skip", !0),
    t
}
const Xn = t => de(t) ? Lr(t) : t
  , Ur = t => de(t) ? Da(t) : t;
function Fa(t) {
  St && Ze && (t = Z(t),
    Sa(t.dep || (t.dep = Pr())))
}
function La(t, e) {
  t = Z(t),
    t.dep && Yi(t.dep)
}
function Pe(t) {
  return !!(t && t.__v_isRef === !0)
}
function Yt(t) {
  return Ua(t, !1)
}
function Ba(t) {
  return Ua(t, !0)
}
function Ua(t, e) {
  return Pe(t) ? t : new $h(t, e)
}
class $h {
  constructor(e, n) {
    this.__v_isShallow = n,
      this.dep = void 0,
      this.__v_isRef = !0,
      this._rawValue = n ? e : Z(e),
      this._value = n ? e : Xn(e)
  }
  get value() {
    return Fa(this),
      this._value
  }
  set value(e) {
    const n = this.__v_isShallow || Ls(e) || In(e);
    e = n ? e : Z(e),
      Jn(e, this._rawValue) && (this._rawValue = e,
        this._value = n ? e : Xn(e),
        La(this))
  }
}
function Se(t) {
  return Pe(t) ? t.value : t
}
const jh = {
  get: (t, e, n) => Se(Reflect.get(t, e, n)),
  set: (t, e, n, s) => {
    const i = t[e];
    return Pe(i) && !Pe(n) ? (i.value = n,
      !0) : Reflect.set(t, e, n, s)
  }
};
function Wa(t) {
  return _n(t) ? t : new Proxy(t, jh)
}
var Ha;
class Vh {
  constructor(e, n, s, i) {
    this._setter = n,
      this.dep = void 0,
      this.__v_isRef = !0,
      this[Ha] = !1,
      this._dirty = !0,
      this.effect = new Dr(e, () => {
        this._dirty || (this._dirty = !0,
          La(this))
      }
      ),
      this.effect.computed = this,
      this.effect.active = this._cacheable = !i,
      this.__v_isReadonly = s
  }
  get value() {
    const e = Z(this);
    return Fa(e),
      (e._dirty || !e._cacheable) && (e._dirty = !1,
        e._value = e.effect.run()),
      e._value
  }
  set value(e) {
    this._setter(e)
  }
}
Ha = "__v_isReadonly";
function zh(t, e, n = !1) {
  let s, i;
  const r = W(t);
  return r ? (s = t,
    i = it) : (s = t.get,
      i = t.set),
    new Vh(s, i, r || !i, n)
}
function xt(t, e, n, s) {
  let i;
  try {
    i = s ? t(...s) : t()
  } catch (r) {
    ci(r, e, n)
  }
  return i
}
function Ye(t, e, n, s) {
  if (W(t)) {
    const r = xt(t, e, n, s);
    return r && va(r) && r.catch(o => {
      ci(o, e, n)
    }
    ),
      r
  }
  const i = [];
  for (let r = 0; r < t.length; r++)
    i.push(Ye(t[r], e, n, s));
  return i
}
function ci(t, e, n, s = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let r = e.parent;
    const o = e.proxy
      , l = n;
    for (; r;) {
      const c = r.ec;
      if (c) {
        for (let u = 0; u < c.length; u++)
          if (c[u](t, o, l) === !1)
            return
      }
      r = r.parent
    }
    const a = e.appContext.config.errorHandler;
    if (a) {
      xt(a, null, 10, [t, o, l]);
      return
    }
  }
  qh(t, n, i, s)
}
function qh(t, e, n, s = !0) {
  console.error(t)
}
let Zn = !1
  , Qi = !1;
const Oe = [];
let ht = 0;
const gn = [];
let pt = null
  , $t = 0;
const $a = Promise.resolve();
let Wr = null;
function ja(t) {
  const e = Wr || $a;
  return t ? e.then(this ? t.bind(this) : t) : e
}
function Kh(t) {
  let e = ht + 1
    , n = Oe.length;
  for (; e < n;) {
    const s = e + n >>> 1;
    es(Oe[s]) < t ? e = s + 1 : n = s
  }
  return e
}
function Hr(t) {
  (!Oe.length || !Oe.includes(t, Zn && t.allowRecurse ? ht + 1 : ht)) && (t.id == null ? Oe.push(t) : Oe.splice(Kh(t.id), 0, t),
    Va())
}
function Va() {
  !Zn && !Qi && (Qi = !0,
    Wr = $a.then(qa))
}
function Gh(t) {
  const e = Oe.indexOf(t);
  e > ht && Oe.splice(e, 1)
}
function Yh(t) {
  B(t) ? gn.push(...t) : (!pt || !pt.includes(t, t.allowRecurse ? $t + 1 : $t)) && gn.push(t),
    Va()
}
function Vo(t, e = Zn ? ht + 1 : 0) {
  for (; e < Oe.length; e++) {
    const n = Oe[e];
    n && n.pre && (Oe.splice(e, 1),
      e--,
      n())
  }
}
function za(t) {
  if (gn.length) {
    const e = [...new Set(gn)];
    if (gn.length = 0,
      pt) {
      pt.push(...e);
      return
    }
    for (pt = e,
      pt.sort((n, s) => es(n) - es(s)),
      $t = 0; $t < pt.length; $t++)
      pt[$t]();
    pt = null,
      $t = 0
  }
}
const es = t => t.id == null ? 1 / 0 : t.id
  , Qh = (t, e) => {
    const n = es(t) - es(e);
    if (n === 0) {
      if (t.pre && !e.pre)
        return -1;
      if (e.pre && !t.pre)
        return 1
    }
    return n
  }
  ;
function qa(t) {
  Qi = !1,
    Zn = !0,
    Oe.sort(Qh);
  const e = it;
  try {
    for (ht = 0; ht < Oe.length; ht++) {
      const n = Oe[ht];
      n && n.active !== !1 && xt(n, null, 14)
    }
  } finally {
    ht = 0,
      Oe.length = 0,
      za(),
      Zn = !1,
      Wr = null,
      (Oe.length || gn.length) && qa()
  }
}
function Jh(t, e, ...n) {
  if (t.isUnmounted)
    return;
  const s = t.vnode.props || ce;
  let i = n;
  const r = e.startsWith("update:")
    , o = r && e.slice(7);
  if (o && o in s) {
    const u = `${o === "modelValue" ? "model" : o}Modifiers`
      , { number: h, trim: d } = s[u] || ce;
    d && (i = n.map(g => Ce(g) ? g.trim() : g)),
      h && (i = n.map(Fs))
  }
  let l, a = s[l = xi(e)] || s[l = xi(wn(e))];
  !a && r && (a = s[l = xi(An(e))]),
    a && Ye(a, t, 6, i);
  const c = s[l + "Once"];
  if (c) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[l])
      return;
    t.emitted[l] = !0,
      Ye(c, t, 6, i)
  }
}
function Ka(t, e, n = !1) {
  const s = e.emitsCache
    , i = s.get(t);
  if (i !== void 0)
    return i;
  const r = t.emits;
  let o = {}
    , l = !1;
  if (!W(t)) {
    const a = c => {
      const u = Ka(c, e, !0);
      u && (l = !0,
        De(o, u))
    }
      ;
    !n && e.mixins.length && e.mixins.forEach(a),
      t.extends && a(t.extends),
      t.mixins && t.mixins.forEach(a)
  }
  return !r && !l ? (de(t) && s.set(t, null),
    null) : (B(r) ? r.forEach(a => o[a] = null) : De(o, r),
      de(t) && s.set(t, o),
      o)
}
function ui(t, e) {
  return !t || !ri(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""),
    Q(t, e[0].toLowerCase() + e.slice(1)) || Q(t, An(e)) || Q(t, e))
}
let Ge = null
  , hi = null;
function Bs(t) {
  const e = Ge;
  return Ge = t,
    hi = t && t.type.__scopeId || null,
    e
}
function Xh(t) {
  hi = t
}
function Zh() {
  hi = null
}
function ef(t, e = Ge, n) {
  if (!e || t._n)
    return t;
  const s = (...i) => {
    s._d && el(-1);
    const r = Bs(e);
    let o;
    try {
      o = t(...i)
    } finally {
      Bs(r),
        s._d && el(1)
    }
    return o
  }
    ;
  return s._n = !0,
    s._c = !0,
    s._d = !0,
    s
}
function Ni(t) {
  const { type: e, vnode: n, proxy: s, withProxy: i, props: r, propsOptions: [o], slots: l, attrs: a, emit: c, render: u, renderCache: h, data: d, setupState: g, ctx: C, inheritAttrs: E } = t;
  let U, P;
  const he = Bs(t);
  try {
    if (n.shapeFlag & 4) {
      const ee = i || s;
      U = ut(u.call(ee, ee, h, r, g, d, C)),
        P = a
    } else {
      const ee = e;
      U = ut(ee.length > 1 ? ee(r, {
        attrs: a,
        slots: l,
        emit: c
      }) : ee(r, null)),
        P = e.props ? a : tf(a)
    }
  } catch (ee) {
    qn.length = 0,
      ci(ee, t, 1),
      U = gt(rt)
  }
  let D = U;
  if (P && E !== !1) {
    const ee = Object.keys(P)
      , { shapeFlag: ge } = D;
    ee.length && ge & 7 && (o && ee.some(Nr) && (P = nf(P, o)),
      D = Pt(D, P))
  }
  return n.dirs && (D = Pt(D),
    D.dirs = D.dirs ? D.dirs.concat(n.dirs) : n.dirs),
    n.transition && (D.transition = n.transition),
    U = D,
    Bs(he),
    U
}
const tf = t => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || ri(n)) && ((e || (e = {}))[n] = t[n]);
  return e
}
  , nf = (t, e) => {
    const n = {};
    for (const s in t)
      (!Nr(s) || !(s.slice(9) in e)) && (n[s] = t[s]);
    return n
  }
  ;
function sf(t, e, n) {
  const { props: s, children: i, component: r } = t
    , { props: o, children: l, patchFlag: a } = e
    , c = r.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? zo(s, o, c) : !!o;
    if (a & 8) {
      const u = e.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const d = u[h];
        if (o[d] !== s[d] && !ui(c, d))
          return !0
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? zo(s, o, c) : !0 : !!o;
  return !1
}
function zo(t, e, n) {
  const s = Object.keys(e);
  if (s.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (e[r] !== t[r] && !ui(n, r))
      return !0
  }
  return !1
}
function rf({ vnode: t, parent: e }, n) {
  for (; e && e.subTree === t;)
    (t = e.vnode).el = n,
      e = e.parent
}
const of = t => t.__isSuspense;
function lf(t, e) {
  e && e.pendingBranch ? B(t) ? e.effects.push(...t) : e.effects.push(t) : Yh(t)
}
function af(t, e) {
  if (Ne) {
    let n = Ne.provides;
    const s = Ne.parent && Ne.parent.provides;
    s === n && (n = Ne.provides = Object.create(s)),
      n[t] = e
  }
}
function Os(t, e, n = !1) {
  const s = Ne || Ge;
  if (s) {
    const i = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && W(e) ? e.call(s.proxy) : e
  }
}
const Ss = {};
function Qt(t, e, n) {
  return Ga(t, e, n)
}
function Ga(t, e, { immediate: n, deep: s, flush: i, onTrack: r, onTrigger: o } = ce) {
  const l = Ne;
  let a, c = !1, u = !1;
  if (Pe(t) ? (a = () => t.value,
    c = Ls(t)) : _n(t) ? (a = () => t,
      s = !0) : B(t) ? (u = !0,
        c = t.some(D => _n(D) || Ls(D)),
        a = () => t.map(D => {
          if (Pe(D))
            return D.value;
          if (_n(D))
            return zt(D);
          if (W(D))
            return xt(D, l, 2)
        }
        )) : W(t) ? e ? a = () => xt(t, l, 2) : a = () => {
          if (!(l && l.isUnmounted))
            return h && h(),
              Ye(t, l, 3, [d])
        }
    : a = it,
    e && s) {
    const D = a;
    a = () => zt(D())
  }
  let h, d = D => {
    h = P.onStop = () => {
      xt(D, l, 4)
    }
  }
    , g;
  if (ns)
    if (d = it,
      e ? n && Ye(e, l, 3, [a(), u ? [] : void 0, d]) : a(),
      i === "sync") {
      const D = nd();
      g = D.__watcherHandles || (D.__watcherHandles = [])
    } else
      return it;
  let C = u ? new Array(t.length).fill(Ss) : Ss;
  const E = () => {
    if (P.active)
      if (e) {
        const D = P.run();
        (s || c || (u ? D.some((ee, ge) => Jn(ee, C[ge])) : Jn(D, C))) && (h && h(),
          Ye(e, l, 3, [D, C === Ss ? void 0 : u && C[0] === Ss ? [] : C, d]),
          C = D)
      } else
        P.run()
  }
    ;
  E.allowRecurse = !!e;
  let U;
  i === "sync" ? U = E : i === "post" ? U = () => Be(E, l && l.suspense) : (E.pre = !0,
    l && (E.id = l.uid),
    U = () => Hr(E));
  const P = new Dr(a, U);
  e ? n ? E() : C = P.run() : i === "post" ? Be(P.run.bind(P), l && l.suspense) : P.run();
  const he = () => {
    P.stop(),
      l && l.scope && Rr(l.scope.effects, P)
  }
    ;
  return g && g.push(he),
    he
}
function cf(t, e, n) {
  const s = this.proxy
    , i = Ce(t) ? t.includes(".") ? Ya(s, t) : () => s[t] : t.bind(s, s);
  let r;
  W(e) ? r = e : (r = e.handler,
    n = e);
  const o = Ne;
  Tn(this);
  const l = Ga(i, r.bind(s), n);
  return o ? Tn(o) : Jt(),
    l
}
function Ya(t, e) {
  const n = e.split(".");
  return () => {
    let s = t;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s
  }
}
function zt(t, e) {
  if (!de(t) || t.__v_skip || (e = e || new Set,
    e.has(t)))
    return t;
  if (e.add(t),
    Pe(t))
    zt(t.value, e);
  else if (B(t))
    for (let n = 0; n < t.length; n++)
      zt(t[n], e);
  else if (ya(t) || pn(t))
    t.forEach(n => {
      zt(n, e)
    }
    );
  else if (Ea(t))
    for (const n in t)
      zt(t[n], e);
  return t
}
function uf() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map
  };
  return tc(() => {
    t.isMounted = !0
  }
  ),
    $r(() => {
      t.isUnmounting = !0
    }
    ),
    t
}
const Ke = [Function, Array]
  , hf = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Ke,
      onEnter: Ke,
      onAfterEnter: Ke,
      onEnterCancelled: Ke,
      onBeforeLeave: Ke,
      onLeave: Ke,
      onAfterLeave: Ke,
      onLeaveCancelled: Ke,
      onBeforeAppear: Ke,
      onAppear: Ke,
      onAfterAppear: Ke,
      onAppearCancelled: Ke
    },
    setup(t, { slots: e }) {
      const n = Yf()
        , s = uf();
      let i;
      return () => {
        const r = e.default && Ja(e.default(), !0);
        if (!r || !r.length)
          return;
        let o = r[0];
        if (r.length > 1) {
          for (const E of r)
            if (E.type !== rt) {
              o = E;
              break
            }
        }
        const l = Z(t)
          , { mode: a } = l;
        if (s.isLeaving)
          return Ri(o);
        const c = qo(o);
        if (!c)
          return Ri(o);
        const u = Ji(c, l, s, n);
        Xi(c, u);
        const h = n.subTree
          , d = h && qo(h);
        let g = !1;
        const { getTransitionKey: C } = c.type;
        if (C) {
          const E = C();
          i === void 0 ? i = E : E !== i && (i = E,
            g = !0)
        }
        if (d && d.type !== rt && (!jt(c, d) || g)) {
          const E = Ji(d, l, s, n);
          if (Xi(d, E),
            a === "out-in")
            return s.isLeaving = !0,
              E.afterLeave = () => {
                s.isLeaving = !1,
                  n.update.active !== !1 && n.update()
              }
              ,
              Ri(o);
          a === "in-out" && c.type !== rt && (E.delayLeave = (U, P, he) => {
            const D = Qa(s, d);
            D[String(d.key)] = d,
              U._leaveCb = () => {
                P(),
                  U._leaveCb = void 0,
                  delete u.delayedLeave
              }
              ,
              u.delayedLeave = he
          }
          )
        }
        return o
      }
    }
  }
  , ff = hf;
function Qa(t, e) {
  const { leavingVNodes: n } = t;
  let s = n.get(e.type);
  return s || (s = Object.create(null),
    n.set(e.type, s)),
    s
}
function Ji(t, e, n, s) {
  const { appear: i, mode: r, persisted: o = !1, onBeforeEnter: l, onEnter: a, onAfterEnter: c, onEnterCancelled: u, onBeforeLeave: h, onLeave: d, onAfterLeave: g, onLeaveCancelled: C, onBeforeAppear: E, onAppear: U, onAfterAppear: P, onAppearCancelled: he } = e
    , D = String(t.key)
    , ee = Qa(n, t)
    , ge = (O, te) => {
      O && Ye(O, s, 9, te)
    }
    , Qe = (O, te) => {
      const ue = te[1];
      ge(O, te),
        B(O) ? O.every(Te => Te.length <= 1) && ue() : O.length <= 1 && ue()
    }
    , G = {
      mode: r,
      persisted: o,
      beforeEnter(O) {
        let te = l;
        if (!n.isMounted)
          if (i)
            te = E || l;
          else
            return;
        O._leaveCb && O._leaveCb(!0);
        const ue = ee[D];
        ue && jt(t, ue) && ue.el._leaveCb && ue.el._leaveCb(),
          ge(te, [O])
      },
      enter(O) {
        let te = a
          , ue = c
          , Te = u;
        if (!n.isMounted)
          if (i)
            te = U || a,
              ue = P || c,
              Te = he || u;
          else
            return;
        let F = !1;
        const k = O._enterCb = N => {
          F || (F = !0,
            N ? ge(Te, [O]) : ge(ue, [O]),
            G.delayedLeave && G.delayedLeave(),
            O._enterCb = void 0)
        }
          ;
        te ? Qe(te, [O, k]) : k()
      },
      leave(O, te) {
        const ue = String(t.key);
        if (O._enterCb && O._enterCb(!0),
          n.isUnmounting)
          return te();
        ge(h, [O]);
        let Te = !1;
        const F = O._leaveCb = k => {
          Te || (Te = !0,
            te(),
            k ? ge(C, [O]) : ge(g, [O]),
            O._leaveCb = void 0,
            ee[ue] === t && delete ee[ue])
        }
          ;
        ee[ue] = t,
          d ? Qe(d, [O, F]) : F()
      },
      clone(O) {
        return Ji(O, e, n, s)
      }
    };
  return G
}
function Ri(t) {
  if (fi(t))
    return t = Pt(t),
      t.children = null,
      t
}
function qo(t) {
  return fi(t) ? t.children ? t.children[0] : void 0 : t
}
function Xi(t, e) {
  t.shapeFlag & 6 && t.component ? Xi(t.component.subTree, e) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent),
    t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e
}
function Ja(t, e = !1, n) {
  let s = []
    , i = 0;
  for (let r = 0; r < t.length; r++) {
    let o = t[r];
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
    o.type === Re ? (o.patchFlag & 128 && i++,
      s = s.concat(Ja(o.children, e, l))) : (e || o.type !== rt) && s.push(l != null ? Pt(o, {
        key: l
      }) : o)
  }
  if (i > 1)
    for (let r = 0; r < s.length; r++)
      s[r].patchFlag = -2;
  return s
}
function Xa(t) {
  return W(t) ? {
    setup: t,
    name: t.name
  } : t
}
const Ps = t => !!t.type.__asyncLoader
  , fi = t => t.type.__isKeepAlive;
function df(t, e) {
  Za(t, "a", e)
}
function pf(t, e) {
  Za(t, "da", e)
}
function Za(t, e, n = Ne) {
  const s = t.__wdc || (t.__wdc = () => {
    let i = n;
    for (; i;) {
      if (i.isDeactivated)
        return;
      i = i.parent
    }
    return t()
  }
  );
  if (di(e, s, n),
    n) {
    let i = n.parent;
    for (; i && i.parent;)
      fi(i.parent.vnode) && _f(s, e, n, i),
        i = i.parent
  }
}
function _f(t, e, n, s) {
  const i = di(e, t, s, !0);
  jr(() => {
    Rr(s[e], i)
  }
    , n)
}
function di(t, e, n = Ne, s = !1) {
  if (n) {
    const i = n[t] || (n[t] = [])
      , r = e.__weh || (e.__weh = (...o) => {
        if (n.isUnmounted)
          return;
        On(),
          Tn(n);
        const l = Ye(e, n, t, o);
        return Jt(),
          Pn(),
          l
      }
      );
    return s ? i.unshift(r) : i.push(r),
      r
  }
}
const Et = t => (e, n = Ne) => (!ns || t === "sp") && di(t, (...s) => e(...s), n)
  , ec = Et("bm")
  , tc = Et("m")
  , gf = Et("bu")
  , mf = Et("u")
  , $r = Et("bum")
  , jr = Et("um")
  , yf = Et("sp")
  , vf = Et("rtg")
  , Cf = Et("rtc");
function Ef(t, e = Ne) {
  di("ec", t, e)
}
function Ko(t, e) {
  const n = Ge;
  if (n === null)
    return t;
  const s = gi(n) || n.proxy
    , i = t.dirs || (t.dirs = []);
  for (let r = 0; r < e.length; r++) {
    let [o, l, a, c = ce] = e[r];
    o && (W(o) && (o = {
      mounted: o,
      updated: o
    }),
      o.deep && zt(l),
      i.push({
        dir: o,
        instance: s,
        value: l,
        oldValue: void 0,
        arg: a,
        modifiers: c
      }))
  }
  return t
}
function Lt(t, e, n, s) {
  const i = t.dirs
    , r = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    r && (l.oldValue = r[o].value);
    let a = l.dir[s];
    a && (On(),
      Ye(a, n, 8, [t.el, l, t, e]),
      Pn())
  }
}
const bf = Symbol();
function an(t, e, n, s) {
  let i;
  const r = n && n[s];
  if (B(t) || Ce(t)) {
    i = new Array(t.length);
    for (let o = 0, l = t.length; o < l; o++)
      i[o] = e(t[o], o, void 0, r && r[o])
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let o = 0; o < t; o++)
      i[o] = e(o + 1, o, void 0, r && r[o])
  } else if (de(t))
    if (t[Symbol.iterator])
      i = Array.from(t, (o, l) => e(o, l, void 0, r && r[l]));
    else {
      const o = Object.keys(t);
      i = new Array(o.length);
      for (let l = 0, a = o.length; l < a; l++) {
        const c = o[l];
        i[l] = e(t[c], c, l, r && r[l])
      }
    }
  else
    i = [];
  return n && (n[s] = i),
    i
}
const Zi = t => t ? dc(t) ? gi(t) || t.proxy : Zi(t.parent) : null
  , zn = De(Object.create(null), {
    $: t => t,
    $el: t => t.vnode.el,
    $data: t => t.data,
    $props: t => t.props,
    $attrs: t => t.attrs,
    $slots: t => t.slots,
    $refs: t => t.refs,
    $parent: t => Zi(t.parent),
    $root: t => Zi(t.root),
    $emit: t => t.emit,
    $options: t => Vr(t),
    $forceUpdate: t => t.f || (t.f = () => Hr(t.update)),
    $nextTick: t => t.n || (t.n = ja.bind(t.proxy)),
    $watch: t => cf.bind(t)
  })
  , Ai = (t, e) => t !== ce && !t.__isScriptSetup && Q(t, e)
  , wf = {
    get({ _: t }, e) {
      const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: l, appContext: a } = t;
      let c;
      if (e[0] !== "$") {
        const g = o[e];
        if (g !== void 0)
          switch (g) {
            case 1:
              return s[e];
            case 2:
              return i[e];
            case 4:
              return n[e];
            case 3:
              return r[e]
          }
        else {
          if (Ai(s, e))
            return o[e] = 1,
              s[e];
          if (i !== ce && Q(i, e))
            return o[e] = 2,
              i[e];
          if ((c = t.propsOptions[0]) && Q(c, e))
            return o[e] = 3,
              r[e];
          if (n !== ce && Q(n, e))
            return o[e] = 4,
              n[e];
          er && (o[e] = 0)
        }
      }
      const u = zn[e];
      let h, d;
      if (u)
        return e === "$attrs" && qe(t, "get", e),
          u(t);
      if ((h = l.__cssModules) && (h = h[e]))
        return h;
      if (n !== ce && Q(n, e))
        return o[e] = 4,
          n[e];
      if (d = a.config.globalProperties,
        Q(d, e))
        return d[e]
    },
    set({ _: t }, e, n) {
      const { data: s, setupState: i, ctx: r } = t;
      return Ai(i, e) ? (i[e] = n,
        !0) : s !== ce && Q(s, e) ? (s[e] = n,
          !0) : Q(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (r[e] = n,
            !0)
    },
    has({ _: { data: t, setupState: e, accessCache: n, ctx: s, appContext: i, propsOptions: r } }, o) {
      let l;
      return !!n[o] || t !== ce && Q(t, o) || Ai(e, o) || (l = r[0]) && Q(l, o) || Q(s, o) || Q(zn, o) || Q(i.config.globalProperties, o)
    },
    defineProperty(t, e, n) {
      return n.get != null ? t._.accessCache[e] = 0 : Q(n, "value") && this.set(t, e, n.value, null),
        Reflect.defineProperty(t, e, n)
    }
  };
let er = !0;
function If(t) {
  const e = Vr(t)
    , n = t.proxy
    , s = t.ctx;
  er = !1,
    e.beforeCreate && Go(e.beforeCreate, t, "bc");
  const { data: i, computed: r, methods: o, watch: l, provide: a, inject: c, created: u, beforeMount: h, mounted: d, beforeUpdate: g, updated: C, activated: E, deactivated: U, beforeDestroy: P, beforeUnmount: he, destroyed: D, unmounted: ee, render: ge, renderTracked: Qe, renderTriggered: G, errorCaptured: O, serverPrefetch: te, expose: ue, inheritAttrs: Te, components: F, directives: k, filters: N } = e;
  if (c && Tf(c, s, null, t.appContext.config.unwrapInjectedRef),
    o)
    for (const $ in o) {
      const z = o[$];
      W(z) && (s[$] = z.bind(n))
    }
  if (i) {
    const $ = i.call(n, n);
    de($) && (t.data = Lr($))
  }
  if (er = !0,
    r)
    for (const $ in r) {
      const z = r[$]
        , Ee = W(z) ? z.bind(n, n) : W(z.get) ? z.get.bind(n, n) : it
        , on = !W(z) && W(z.set) ? z.set.bind(n) : it
        , ne = ks({
          get: Ee,
          set: on
        });
      Object.defineProperty(s, $, {
        enumerable: !0,
        configurable: !0,
        get: () => ne.value,
        set: fe => ne.value = fe
      })
    }
  if (l)
    for (const $ in l)
      nc(l[$], s, n, $);
  if (a) {
    const $ = W(a) ? a.call(n) : a;
    Reflect.ownKeys($).forEach(z => {
      af(z, $[z])
    }
    )
  }
  u && Go(u, t, "c");
  function Y($, z) {
    B(z) ? z.forEach(Ee => $(Ee.bind(n))) : z && $(z.bind(n))
  }
  if (Y(ec, h),
    Y(tc, d),
    Y(gf, g),
    Y(mf, C),
    Y(df, E),
    Y(pf, U),
    Y(Ef, O),
    Y(Cf, Qe),
    Y(vf, G),
    Y($r, he),
    Y(jr, ee),
    Y(yf, te),
    B(ue))
    if (ue.length) {
      const $ = t.exposed || (t.exposed = {});
      ue.forEach(z => {
        Object.defineProperty($, z, {
          get: () => n[z],
          set: Ee => n[z] = Ee
        })
      }
      )
    } else
      t.exposed || (t.exposed = {});
  ge && t.render === it && (t.render = ge),
    Te != null && (t.inheritAttrs = Te),
    F && (t.components = F),
    k && (t.directives = k)
}
function Tf(t, e, n = it, s = !1) {
  B(t) && (t = tr(t));
  for (const i in t) {
    const r = t[i];
    let o;
    de(r) ? "default" in r ? o = Os(r.from || i, r.default, !0) : o = Os(r.from || i) : o = Os(r),
      Pe(o) && s ? Object.defineProperty(e, i, {
        enumerable: !0,
        configurable: !0,
        get: () => o.value,
        set: l => o.value = l
      }) : e[i] = o
  }
}
function Go(t, e, n) {
  Ye(B(t) ? t.map(s => s.bind(e.proxy)) : t.bind(e.proxy), e, n)
}
function nc(t, e, n, s) {
  const i = s.includes(".") ? Ya(n, s) : () => n[s];
  if (Ce(t)) {
    const r = e[t];
    W(r) && Qt(i, r)
  } else if (W(t))
    Qt(i, t.bind(n));
  else if (de(t))
    if (B(t))
      t.forEach(r => nc(r, e, n, s));
    else {
      const r = W(t.handler) ? t.handler.bind(n) : e[t.handler];
      W(r) && Qt(i, r, t)
    }
}
function Vr(t) {
  const e = t.type
    , { mixins: n, extends: s } = e
    , { mixins: i, optionsCache: r, config: { optionMergeStrategies: o } } = t.appContext
    , l = r.get(e);
  let a;
  return l ? a = l : !i.length && !n && !s ? a = e : (a = {},
    i.length && i.forEach(c => Us(a, c, o, !0)),
    Us(a, e, o)),
    de(e) && r.set(e, a),
    a
}
function Us(t, e, n, s = !1) {
  const { mixins: i, extends: r } = e;
  r && Us(t, r, n, !0),
    i && i.forEach(o => Us(t, o, n, !0));
  for (const o in e)
    if (!(s && o === "expose")) {
      const l = Sf[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o]
    }
  return t
}
const Sf = {
  data: Yo,
  props: Ut,
  emits: Ut,
  methods: Ut,
  computed: Ut,
  beforeCreate: ke,
  created: ke,
  beforeMount: ke,
  mounted: ke,
  beforeUpdate: ke,
  updated: ke,
  beforeDestroy: ke,
  beforeUnmount: ke,
  destroyed: ke,
  unmounted: ke,
  activated: ke,
  deactivated: ke,
  errorCaptured: ke,
  serverPrefetch: ke,
  components: Ut,
  directives: Ut,
  watch: Nf,
  provide: Yo,
  inject: xf
};
function Yo(t, e) {
  return e ? t ? function () {
    return De(W(t) ? t.call(this, this) : t, W(e) ? e.call(this, this) : e)
  }
    : e : t
}
function xf(t, e) {
  return Ut(tr(t), tr(e))
}
function tr(t) {
  if (B(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e
  }
  return t
}
function ke(t, e) {
  return t ? [...new Set([].concat(t, e))] : e
}
function Ut(t, e) {
  return t ? De(De(Object.create(null), t), e) : e
}
function Nf(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = De(Object.create(null), t);
  for (const s in e)
    n[s] = ke(t[s], e[s]);
  return n
}
function Rf(t, e, n, s = !1) {
  const i = {}
    , r = {};
  Ms(r, _i, 1),
    t.propsDefaults = Object.create(null),
    sc(t, e, i, r);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? t.props = s ? i : Hh(i) : t.type.props ? t.props = i : t.props = r,
    t.attrs = r
}
function Af(t, e, n, s) {
  const { props: i, attrs: r, vnode: { patchFlag: o } } = t
    , l = Z(i)
    , [a] = t.propsOptions;
  let c = !1;
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const u = t.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let d = u[h];
        if (ui(t.emitsOptions, d))
          continue;
        const g = e[d];
        if (a)
          if (Q(r, d))
            g !== r[d] && (r[d] = g,
              c = !0);
          else {
            const C = wn(d);
            i[C] = nr(a, l, C, g, t, !1)
          }
        else
          g !== r[d] && (r[d] = g,
            c = !0)
      }
    }
  } else {
    sc(t, e, i, r) && (c = !0);
    let u;
    for (const h in l)
      (!e || !Q(e, h) && ((u = An(h)) === h || !Q(e, u))) && (a ? n && (n[h] !== void 0 || n[u] !== void 0) && (i[h] = nr(a, l, h, void 0, t, !0)) : delete i[h]);
    if (r !== l)
      for (const h in r)
        (!e || !Q(e, h)) && (delete r[h],
          c = !0)
  }
  c && yt(t, "set", "$attrs")
}
function sc(t, e, n, s) {
  const [i, r] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let a in e) {
      if (Rs(a))
        continue;
      const c = e[a];
      let u;
      i && Q(i, u = wn(a)) ? !r || !r.includes(u) ? n[u] = c : (l || (l = {}))[u] = c : ui(t.emitsOptions, a) || (!(a in s) || c !== s[a]) && (s[a] = c,
        o = !0)
    }
  if (r) {
    const a = Z(n)
      , c = l || ce;
    for (let u = 0; u < r.length; u++) {
      const h = r[u];
      n[h] = nr(i, a, h, c[h], t, !Q(c, h))
    }
  }
  return o
}
function nr(t, e, n, s, i, r) {
  const o = t[n];
  if (o != null) {
    const l = Q(o, "default");
    if (l && s === void 0) {
      const a = o.default;
      if (o.type !== Function && W(a)) {
        const { propsDefaults: c } = i;
        n in c ? s = c[n] : (Tn(i),
          s = c[n] = a.call(null, e),
          Jt())
      } else
        s = a
    }
    o[0] && (r && !l ? s = !1 : o[1] && (s === "" || s === An(n)) && (s = !0))
  }
  return s
}
function ic(t, e, n = !1) {
  const s = e.propsCache
    , i = s.get(t);
  if (i)
    return i;
  const r = t.props
    , o = {}
    , l = [];
  let a = !1;
  if (!W(t)) {
    const u = h => {
      a = !0;
      const [d, g] = ic(h, e, !0);
      De(o, d),
        g && l.push(...g)
    }
      ;
    !n && e.mixins.length && e.mixins.forEach(u),
      t.extends && u(t.extends),
      t.mixins && t.mixins.forEach(u)
  }
  if (!r && !a)
    return de(t) && s.set(t, dn),
      dn;
  if (B(r))
    for (let u = 0; u < r.length; u++) {
      const h = wn(r[u]);
      Qo(h) && (o[h] = ce)
    }
  else if (r)
    for (const u in r) {
      const h = wn(u);
      if (Qo(h)) {
        const d = r[u]
          , g = o[h] = B(d) || W(d) ? {
            type: d
          } : Object.assign({}, d);
        if (g) {
          const C = Zo(Boolean, g.type)
            , E = Zo(String, g.type);
          g[0] = C > -1,
            g[1] = E < 0 || C < E,
            (C > -1 || Q(g, "default")) && l.push(h)
        }
      }
    }
  const c = [o, l];
  return de(t) && s.set(t, c),
    c
}
function Qo(t) {
  return t[0] !== "$"
}
function Jo(t) {
  const e = t && t.toString().match(/^\s*function (\w+)/);
  return e ? e[1] : t === null ? "null" : ""
}
function Xo(t, e) {
  return Jo(t) === Jo(e)
}
function Zo(t, e) {
  return B(e) ? e.findIndex(n => Xo(n, t)) : W(e) && Xo(e, t) ? 0 : -1
}
const rc = t => t[0] === "_" || t === "$stable"
  , zr = t => B(t) ? t.map(ut) : [ut(t)]
  , Of = (t, e, n) => {
    if (e._n)
      return e;
    const s = ef((...i) => zr(e(...i)), n);
    return s._c = !1,
      s
  }
  , oc = (t, e, n) => {
    const s = t._ctx;
    for (const i in t) {
      if (rc(i))
        continue;
      const r = t[i];
      if (W(r))
        e[i] = Of(i, r, s);
      else if (r != null) {
        const o = zr(r);
        e[i] = () => o
      }
    }
  }
  , lc = (t, e) => {
    const n = zr(e);
    t.slots.default = () => n
  }
  , Pf = (t, e) => {
    if (t.vnode.shapeFlag & 32) {
      const n = e._;
      n ? (t.slots = Z(e),
        Ms(e, "_", n)) : oc(e, t.slots = {})
    } else
      t.slots = {},
        e && lc(t, e);
    Ms(t.slots, _i, 1)
  }
  , Df = (t, e, n) => {
    const { vnode: s, slots: i } = t;
    let r = !0
      , o = ce;
    if (s.shapeFlag & 32) {
      const l = e._;
      l ? n && l === 1 ? r = !1 : (De(i, e),
        !n && l === 1 && delete i._) : (r = !e.$stable,
          oc(e, i)),
        o = e
    } else
      e && (lc(t, e),
        o = {
          default: 1
        });
    if (r)
      for (const l in i)
        !rc(l) && !(l in o) && delete i[l]
  }
  ;
function ac() {
  return {
    app: null,
    config: {
      isNativeTag: rh,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap,
    propsCache: new WeakMap,
    emitsCache: new WeakMap
  }
}
let kf = 0;
function Mf(t, e) {
  return function (s, i = null) {
    W(s) || (s = Object.assign({}, s)),
      i != null && !de(i) && (i = null);
    const r = ac()
      , o = new Set;
    let l = !1;
    const a = r.app = {
      _uid: kf++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: sd,
      get config() {
        return r.config
      },
      set config(c) { },
      use(c, ...u) {
        return o.has(c) || (c && W(c.install) ? (o.add(c),
          c.install(a, ...u)) : W(c) && (o.add(c),
            c(a, ...u))),
          a
      },
      mixin(c) {
        return r.mixins.includes(c) || r.mixins.push(c),
          a
      },
      component(c, u) {
        return u ? (r.components[c] = u,
          a) : r.components[c]
      },
      directive(c, u) {
        return u ? (r.directives[c] = u,
          a) : r.directives[c]
      },
      mount(c, u, h) {
        if (!l) {
          const d = gt(s, i);
          return d.appContext = r,
            u && e ? e(d, c) : t(d, c, h),
            l = !0,
            a._container = c,
            c.__vue_app__ = a,
            gi(d.component) || d.component.proxy
        }
      },
      unmount() {
        l && (t(null, a._container),
          delete a._container.__vue_app__)
      },
      provide(c, u) {
        return r.provides[c] = u,
          a
      }
    };
    return a
  }
}
function sr(t, e, n, s, i = !1) {
  if (B(t)) {
    t.forEach((d, g) => sr(d, e && (B(e) ? e[g] : e), n, s, i));
    return
  }
  if (Ps(s) && !i)
    return;
  const r = s.shapeFlag & 4 ? gi(s.component) || s.component.proxy : s.el
    , o = i ? null : r
    , { i: l, r: a } = t
    , c = e && e.r
    , u = l.refs === ce ? l.refs = {} : l.refs
    , h = l.setupState;
  if (c != null && c !== a && (Ce(c) ? (u[c] = null,
    Q(h, c) && (h[c] = null)) : Pe(c) && (c.value = null)),
    W(a))
    xt(a, l, 12, [o, u]);
  else {
    const d = Ce(a)
      , g = Pe(a);
    if (d || g) {
      const C = () => {
        if (t.f) {
          const E = d ? Q(h, a) ? h[a] : u[a] : a.value;
          i ? B(E) && Rr(E, r) : B(E) ? E.includes(r) || E.push(r) : d ? (u[a] = [r],
            Q(h, a) && (h[a] = u[a])) : (a.value = [r],
              t.k && (u[t.k] = a.value))
        } else
          d ? (u[a] = o,
            Q(h, a) && (h[a] = o)) : g && (a.value = o,
              t.k && (u[t.k] = o))
      }
        ;
      o ? (C.id = -1,
        Be(C, n)) : C()
    }
  }
}
const Be = lf;
function Ff(t) {
  return Lf(t)
}
function Lf(t, e) {
  const n = hh();
  n.__VUE__ = !0;
  const { insert: s, remove: i, patchProp: r, createElement: o, createText: l, createComment: a, setText: c, setElementText: u, parentNode: h, nextSibling: d, setScopeId: g = it, insertStaticContent: C } = t
    , E = (f, p, _, y = null, m = null, I = null, S = !1, w = null, T = !!p.dynamicChildren) => {
      if (f === p)
        return;
      f && !jt(f, p) && (y = Ft(f),
        fe(f, m, I, !0),
        f = null),
        p.patchFlag === -2 && (T = !1,
          p.dynamicChildren = null);
      const { type: v, ref: R, shapeFlag: x } = p;
      switch (v) {
        case pi:
          U(f, p, _, y);
          break;
        case rt:
          P(f, p, _, y);
          break;
        case Oi:
          f == null && he(p, _, y, S);
          break;
        case Re:
          F(f, p, _, y, m, I, S, w, T);
          break;
        default:
          x & 1 ? ge(f, p, _, y, m, I, S, w, T) : x & 6 ? k(f, p, _, y, m, I, S, w, T) : (x & 64 || x & 128) && v.process(f, p, _, y, m, I, S, w, T, je)
      }
      R != null && m && sr(R, f && f.ref, I, p || f, !p)
    }
    , U = (f, p, _, y) => {
      if (f == null)
        s(p.el = l(p.children), _, y);
      else {
        const m = p.el = f.el;
        p.children !== f.children && c(m, p.children)
      }
    }
    , P = (f, p, _, y) => {
      f == null ? s(p.el = a(p.children || ""), _, y) : p.el = f.el
    }
    , he = (f, p, _, y) => {
      [f.el, f.anchor] = C(f.children, p, _, y, f.el, f.anchor)
    }
    , D = ({ el: f, anchor: p }, _, y) => {
      let m;
      for (; f && f !== p;)
        m = d(f),
          s(f, _, y),
          f = m;
      s(p, _, y)
    }
    , ee = ({ el: f, anchor: p }) => {
      let _;
      for (; f && f !== p;)
        _ = d(f),
          i(f),
          f = _;
      i(p)
    }
    , ge = (f, p, _, y, m, I, S, w, T) => {
      S = S || p.type === "svg",
        f == null ? Qe(p, _, y, m, I, S, w, T) : te(f, p, m, I, S, w, T)
    }
    , Qe = (f, p, _, y, m, I, S, w) => {
      let T, v;
      const { type: R, props: x, shapeFlag: A, transition: L, dirs: K } = f;
      if (T = f.el = o(f.type, I, x && x.is, x),
        A & 8 ? u(T, f.children) : A & 16 && O(f.children, T, null, y, m, I && R !== "foreignObject", S, w),
        K && Lt(f, null, y, "created"),
        x) {
        for (const se in x)
          se !== "value" && !Rs(se) && r(T, se, null, x[se], I, f.children, y, m, Je);
        "value" in x && r(T, "value", null, x.value),
          (v = x.onVnodeBeforeMount) && ct(v, y, f)
      }
      G(T, f, f.scopeId, S, y),
        K && Lt(f, null, y, "beforeMount");
      const re = (!m || m && !m.pendingBranch) && L && !L.persisted;
      re && L.beforeEnter(T),
        s(T, p, _),
        ((v = x && x.onVnodeMounted) || re || K) && Be(() => {
          v && ct(v, y, f),
            re && L.enter(T),
            K && Lt(f, null, y, "mounted")
        }
          , m)
    }
    , G = (f, p, _, y, m) => {
      if (_ && g(f, _),
        y)
        for (let I = 0; I < y.length; I++)
          g(f, y[I]);
      if (m) {
        let I = m.subTree;
        if (p === I) {
          const S = m.vnode;
          G(f, S, S.scopeId, S.slotScopeIds, m.parent)
        }
      }
    }
    , O = (f, p, _, y, m, I, S, w, T = 0) => {
      for (let v = T; v < f.length; v++) {
        const R = f[v] = w ? Tt(f[v]) : ut(f[v]);
        E(null, R, p, _, y, m, I, S, w)
      }
    }
    , te = (f, p, _, y, m, I, S) => {
      const w = p.el = f.el;
      let { patchFlag: T, dynamicChildren: v, dirs: R } = p;
      T |= f.patchFlag & 16;
      const x = f.props || ce
        , A = p.props || ce;
      let L;
      _ && Bt(_, !1),
        (L = A.onVnodeBeforeUpdate) && ct(L, _, p, f),
        R && Lt(p, f, _, "beforeUpdate"),
        _ && Bt(_, !0);
      const K = m && p.type !== "foreignObject";
      if (v ? ue(f.dynamicChildren, v, w, _, y, K, I) : S || z(f, p, w, null, _, y, K, I, !1),
        T > 0) {
        if (T & 16)
          Te(w, p, x, A, _, y, m);
        else if (T & 2 && x.class !== A.class && r(w, "class", null, A.class, m),
          T & 4 && r(w, "style", x.style, A.style, m),
          T & 8) {
          const re = p.dynamicProps;
          for (let se = 0; se < re.length; se++) {
            const me = re[se]
              , Xe = x[me]
              , ln = A[me];
            (ln !== Xe || me === "value") && r(w, me, Xe, ln, m, f.children, _, y, Je)
          }
        }
        T & 1 && f.children !== p.children && u(w, p.children)
      } else
        !S && v == null && Te(w, p, x, A, _, y, m);
      ((L = A.onVnodeUpdated) || R) && Be(() => {
        L && ct(L, _, p, f),
          R && Lt(p, f, _, "updated")
      }
        , y)
    }
    , ue = (f, p, _, y, m, I, S) => {
      for (let w = 0; w < p.length; w++) {
        const T = f[w]
          , v = p[w]
          , R = T.el && (T.type === Re || !jt(T, v) || T.shapeFlag & 70) ? h(T.el) : _;
        E(T, v, R, null, y, m, I, S, !0)
      }
    }
    , Te = (f, p, _, y, m, I, S) => {
      if (_ !== y) {
        if (_ !== ce)
          for (const w in _)
            !Rs(w) && !(w in y) && r(f, w, _[w], null, S, p.children, m, I, Je);
        for (const w in y) {
          if (Rs(w))
            continue;
          const T = y[w]
            , v = _[w];
          T !== v && w !== "value" && r(f, w, v, T, S, p.children, m, I, Je)
        }
        "value" in y && r(f, "value", _.value, y.value)
      }
    }
    , F = (f, p, _, y, m, I, S, w, T) => {
      const v = p.el = f ? f.el : l("")
        , R = p.anchor = f ? f.anchor : l("");
      let { patchFlag: x, dynamicChildren: A, slotScopeIds: L } = p;
      L && (w = w ? w.concat(L) : L),
        f == null ? (s(v, _, y),
          s(R, _, y),
          O(p.children, _, R, m, I, S, w, T)) : x > 0 && x & 64 && A && f.dynamicChildren ? (ue(f.dynamicChildren, A, _, m, I, S, w),
            (p.key != null || m && p === m.subTree) && cc(f, p, !0)) : z(f, p, _, R, m, I, S, w, T)
    }
    , k = (f, p, _, y, m, I, S, w, T) => {
      p.slotScopeIds = w,
        f == null ? p.shapeFlag & 512 ? m.ctx.activate(p, _, y, S, T) : N(p, _, y, m, I, S, T) : H(f, p, T)
    }
    , N = (f, p, _, y, m, I, S) => {
      const w = f.component = Gf(f, y, m);
      if (fi(f) && (w.ctx.renderer = je),
        Qf(w),
        w.asyncDep) {
        if (m && m.registerDep(w, Y),
          !f.el) {
          const T = w.subTree = gt(rt);
          P(null, T, p, _)
        }
        return
      }
      Y(w, f, p, _, m, I, S)
    }
    , H = (f, p, _) => {
      const y = p.component = f.component;
      if (sf(f, p, _))
        if (y.asyncDep && !y.asyncResolved) {
          $(y, p, _);
          return
        } else
          y.next = p,
            Gh(y.update),
            y.update();
      else
        p.el = f.el,
          y.vnode = p
    }
    , Y = (f, p, _, y, m, I, S) => {
      const w = () => {
        if (f.isMounted) {
          let { next: R, bu: x, u: A, parent: L, vnode: K } = f, re = R, se;
          Bt(f, !1),
            R ? (R.el = K.el,
              $(f, R, S)) : R = K,
            x && As(x),
            (se = R.props && R.props.onVnodeBeforeUpdate) && ct(se, L, R, K),
            Bt(f, !0);
          const me = Ni(f)
            , Xe = f.subTree;
          f.subTree = me,
            E(Xe, me, h(Xe.el), Ft(Xe), f, m, I),
            R.el = me.el,
            re === null && rf(f, me.el),
            A && Be(A, m),
            (se = R.props && R.props.onVnodeUpdated) && Be(() => ct(se, L, R, K), m)
        } else {
          let R;
          const { el: x, props: A } = p
            , { bm: L, m: K, parent: re } = f
            , se = Ps(p);
          if (Bt(f, !1),
            L && As(L),
            !se && (R = A && A.onVnodeBeforeMount) && ct(R, re, p),
            Bt(f, !0),
            x && lt) {
            const me = () => {
              f.subTree = Ni(f),
                lt(x, f.subTree, f, m, null)
            }
              ;
            se ? p.type.__asyncLoader().then(() => !f.isUnmounted && me()) : me()
          } else {
            const me = f.subTree = Ni(f);
            E(null, me, _, y, f, m, I),
              p.el = me.el
          }
          if (K && Be(K, m),
            !se && (R = A && A.onVnodeMounted)) {
            const me = p;
            Be(() => ct(R, re, me), m)
          }
          (p.shapeFlag & 256 || re && Ps(re.vnode) && re.vnode.shapeFlag & 256) && f.a && Be(f.a, m),
            f.isMounted = !0,
            p = _ = y = null
        }
      }
        , T = f.effect = new Dr(w, () => Hr(v), f.scope)
        , v = f.update = () => T.run();
      v.id = f.uid,
        Bt(f, !0),
        v()
    }
    , $ = (f, p, _) => {
      p.component = f;
      const y = f.vnode.props;
      f.vnode = p,
        f.next = null,
        Af(f, p.props, y, _),
        Df(f, p.children, _),
        On(),
        Vo(),
        Pn()
    }
    , z = (f, p, _, y, m, I, S, w, T = !1) => {
      const v = f && f.children
        , R = f ? f.shapeFlag : 0
        , x = p.children
        , { patchFlag: A, shapeFlag: L } = p;
      if (A > 0) {
        if (A & 128) {
          on(v, x, _, y, m, I, S, w, T);
          return
        } else if (A & 256) {
          Ee(v, x, _, y, m, I, S, w, T);
          return
        }
      }
      L & 8 ? (R & 16 && Je(v, m, I),
        x !== v && u(_, x)) : R & 16 ? L & 16 ? on(v, x, _, y, m, I, S, w, T) : Je(v, m, I, !0) : (R & 8 && u(_, ""),
          L & 16 && O(x, _, y, m, I, S, w, T))
    }
    , Ee = (f, p, _, y, m, I, S, w, T) => {
      f = f || dn,
        p = p || dn;
      const v = f.length
        , R = p.length
        , x = Math.min(v, R);
      let A;
      for (A = 0; A < x; A++) {
        const L = p[A] = T ? Tt(p[A]) : ut(p[A]);
        E(f[A], L, _, null, m, I, S, w, T)
      }
      v > R ? Je(f, m, I, !0, !1, x) : O(p, _, y, m, I, S, w, T, x)
    }
    , on = (f, p, _, y, m, I, S, w, T) => {
      let v = 0;
      const R = p.length;
      let x = f.length - 1
        , A = R - 1;
      for (; v <= x && v <= A;) {
        const L = f[v]
          , K = p[v] = T ? Tt(p[v]) : ut(p[v]);
        if (jt(L, K))
          E(L, K, _, null, m, I, S, w, T);
        else
          break;
        v++
      }
      for (; v <= x && v <= A;) {
        const L = f[x]
          , K = p[A] = T ? Tt(p[A]) : ut(p[A]);
        if (jt(L, K))
          E(L, K, _, null, m, I, S, w, T);
        else
          break;
        x--,
          A--
      }
      if (v > x) {
        if (v <= A) {
          const L = A + 1
            , K = L < R ? p[L].el : y;
          for (; v <= A;)
            E(null, p[v] = T ? Tt(p[v]) : ut(p[v]), _, K, m, I, S, w, T),
              v++
        }
      } else if (v > A)
        for (; v <= x;)
          fe(f[v], m, I, !0),
            v++;
      else {
        const L = v
          , K = v
          , re = new Map;
        for (v = K; v <= A; v++) {
          const Ve = p[v] = T ? Tt(p[v]) : ut(p[v]);
          Ve.key != null && re.set(Ve.key, v)
        }
        let se, me = 0;
        const Xe = A - K + 1;
        let ln = !1
          , Do = 0;
        const Un = new Array(Xe);
        for (v = 0; v < Xe; v++)
          Un[v] = 0;
        for (v = L; v <= x; v++) {
          const Ve = f[v];
          if (me >= Xe) {
            fe(Ve, m, I, !0);
            continue
          }
          let at;
          if (Ve.key != null)
            at = re.get(Ve.key);
          else
            for (se = K; se <= A; se++)
              if (Un[se - K] === 0 && jt(Ve, p[se])) {
                at = se;
                break
              }
          at === void 0 ? fe(Ve, m, I, !0) : (Un[at - K] = v + 1,
            at >= Do ? Do = at : ln = !0,
            E(Ve, p[at], _, null, m, I, S, w, T),
            me++)
        }
        const ko = ln ? Bf(Un) : dn;
        for (se = ko.length - 1,
          v = Xe - 1; v >= 0; v--) {
          const Ve = K + v
            , at = p[Ve]
            , Mo = Ve + 1 < R ? p[Ve + 1].el : y;
          Un[v] === 0 ? E(null, at, _, Mo, m, I, S, w, T) : ln && (se < 0 || v !== ko[se] ? ne(at, _, Mo, 2) : se--)
        }
      }
    }
    , ne = (f, p, _, y, m = null) => {
      const { el: I, type: S, transition: w, children: T, shapeFlag: v } = f;
      if (v & 6) {
        ne(f.component.subTree, p, _, y);
        return
      }
      if (v & 128) {
        f.suspense.move(p, _, y);
        return
      }
      if (v & 64) {
        S.move(f, p, _, je);
        return
      }
      if (S === Re) {
        s(I, p, _);
        for (let x = 0; x < T.length; x++)
          ne(T[x], p, _, y);
        s(f.anchor, p, _);
        return
      }
      if (S === Oi) {
        D(f, p, _);
        return
      }
      if (y !== 2 && v & 1 && w)
        if (y === 0)
          w.beforeEnter(I),
            s(I, p, _),
            Be(() => w.enter(I), m);
        else {
          const { leave: x, delayLeave: A, afterLeave: L } = w
            , K = () => s(I, p, _)
            , re = () => {
              x(I, () => {
                K(),
                  L && L()
              }
              )
            }
            ;
          A ? A(I, K, re) : re()
        }
      else
        s(I, p, _)
    }
    , fe = (f, p, _, y = !1, m = !1) => {
      const { type: I, props: S, ref: w, children: T, dynamicChildren: v, shapeFlag: R, patchFlag: x, dirs: A } = f;
      if (w != null && sr(w, null, _, f, !0),
        R & 256) {
        p.ctx.deactivate(f);
        return
      }
      const L = R & 1 && A
        , K = !Ps(f);
      let re;
      if (K && (re = S && S.onVnodeBeforeUnmount) && ct(re, p, f),
        R & 6)
        Cs(f.component, _, y);
      else {
        if (R & 128) {
          f.suspense.unmount(_, y);
          return
        }
        L && Lt(f, null, p, "beforeUnmount"),
          R & 64 ? f.type.remove(f, p, _, m, je, y) : v && (I !== Re || x > 0 && x & 64) ? Je(v, p, _, !1, !0) : (I === Re && x & 384 || !m && R & 16) && Je(T, p, _),
          y && Me(f)
      }
      (K && (re = S && S.onVnodeUnmounted) || L) && Be(() => {
        re && ct(re, p, f),
          L && Lt(f, null, p, "unmounted")
      }
        , _)
    }
    , Me = f => {
      const { type: p, el: _, anchor: y, transition: m } = f;
      if (p === Re) {
        ft(_, y);
        return
      }
      if (p === Oi) {
        ee(f);
        return
      }
      const I = () => {
        i(_),
          m && !m.persisted && m.afterLeave && m.afterLeave()
      }
        ;
      if (f.shapeFlag & 1 && m && !m.persisted) {
        const { leave: S, delayLeave: w } = m
          , T = () => S(_, I);
        w ? w(f.el, I, T) : T()
      } else
        I()
    }
    , ft = (f, p) => {
      let _;
      for (; f !== p;)
        _ = d(f),
          i(f),
          f = _;
      i(p)
    }
    , Cs = (f, p, _) => {
      const { bum: y, scope: m, update: I, subTree: S, um: w } = f;
      y && As(y),
        m.stop(),
        I && (I.active = !1,
          fe(S, f, p, _)),
        w && Be(w, p),
        Be(() => {
          f.isUnmounted = !0
        }
          , p),
        p && p.pendingBranch && !p.isUnmounted && f.asyncDep && !f.asyncResolved && f.suspenseId === p.pendingId && (p.deps--,
          p.deps === 0 && p.resolve())
    }
    , Je = (f, p, _, y = !1, m = !1, I = 0) => {
      for (let S = I; S < f.length; S++)
        fe(f[S], p, _, y, m)
    }
    , Ft = f => f.shapeFlag & 6 ? Ft(f.component.subTree) : f.shapeFlag & 128 ? f.suspense.next() : d(f.anchor || f.el)
    , Fe = (f, p, _) => {
      f == null ? p._vnode && fe(p._vnode, null, null, !0) : E(p._vnode || null, f, p, null, null, null, _),
        Vo(),
        za(),
        p._vnode = f
    }
    , je = {
      p: E,
      um: fe,
      m: ne,
      r: Me,
      mt: N,
      mc: O,
      pc: z,
      pbc: ue,
      n: Ft,
      o: t
    };
  let Le, lt;
  return e && ([Le, lt] = e(je)),
  {
    render: Fe,
    hydrate: Le,
    createApp: Mf(Fe, Le)
  }
}
function Bt({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n
}
function cc(t, e, n = !1) {
  const s = t.children
    , i = e.children;
  if (B(s) && B(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let l = i[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[r] = Tt(i[r]),
        l.el = o.el),
        n || cc(o, l)),
        l.type === pi && (l.el = o.el)
    }
}
function Bf(t) {
  const e = t.slice()
    , n = [0];
  let s, i, r, o, l;
  const a = t.length;
  for (s = 0; s < a; s++) {
    const c = t[s];
    if (c !== 0) {
      if (i = n[n.length - 1],
        t[i] < c) {
        e[s] = i,
          n.push(s);
        continue
      }
      for (r = 0,
        o = n.length - 1; r < o;)
        l = r + o >> 1,
          t[n[l]] < c ? r = l + 1 : o = l;
      c < t[n[r]] && (r > 0 && (e[s] = n[r - 1]),
        n[r] = s)
    }
  }
  for (r = n.length,
    o = n[r - 1]; r-- > 0;)
    n[r] = o,
      o = e[o];
  return n
}
const Uf = t => t.__isTeleport
  , Re = Symbol(void 0)
  , pi = Symbol(void 0)
  , rt = Symbol(void 0)
  , Oi = Symbol(void 0)
  , qn = [];
let tt = null;
function _e(t = !1) {
  qn.push(tt = t ? null : [])
}
function Wf() {
  qn.pop(),
    tt = qn[qn.length - 1] || null
}
let ts = 1;
function el(t) {
  ts += t
}
function uc(t) {
  return t.dynamicChildren = ts > 0 ? tt || dn : null,
    Wf(),
    ts > 0 && tt && tt.push(t),
    t
}
function ye(t, e, n, s, i, r) {
  return uc(J(t, e, n, s, i, r, !0))
}
function hc(t, e, n, s, i) {
  return uc(gt(t, e, n, s, i, !0))
}
function Hf(t) {
  return t ? t.__v_isVNode === !0 : !1
}
function jt(t, e) {
  return t.type === e.type && t.key === e.key
}
const _i = "__vInternal"
  , fc = ({ key: t }) => t ?? null
  , Ds = ({ ref: t, ref_key: e, ref_for: n }) => t != null ? Ce(t) || Pe(t) || W(t) ? {
    i: Ge,
    r: t,
    k: e,
    f: !!n
  } : t : null;
function J(t, e = null, n = null, s = 0, i = null, r = t === Re ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && fc(e),
    ref: e && Ds(e),
    scopeId: hi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ge
  };
  return l ? (qr(a, n),
    r & 128 && t.normalize(a)) : n && (a.shapeFlag |= Ce(n) ? 8 : 16),
    ts > 0 && !o && tt && (a.patchFlag > 0 || r & 6) && a.patchFlag !== 32 && tt.push(a),
    a
}
const gt = $f;
function $f(t, e = null, n = null, s = 0, i = null, r = !1) {
  if ((!t || t === bf) && (t = rt),
    Hf(t)) {
    const l = Pt(t, e, !0);
    return n && qr(l, n),
      ts > 0 && !r && tt && (l.shapeFlag & 6 ? tt[tt.indexOf(t)] = l : tt.push(l)),
      l.patchFlag |= -2,
      l
  }
  if (ed(t) && (t = t.__vccOpts),
    e) {
    e = jf(e);
    let { class: l, style: a } = e;
    l && !Ce(l) && (e.class = fn(l)),
      de(a) && (ka(a) && !B(a) && (a = De({}, a)),
        e.style = ii(a))
  }
  const o = Ce(t) ? 1 : of(t) ? 128 : Uf(t) ? 64 : de(t) ? 4 : W(t) ? 2 : 0;
  return J(t, e, n, s, i, o, r, !0)
}
function jf(t) {
  return t ? ka(t) || _i in t ? De({}, t) : t : null
}
function Pt(t, e, n = !1) {
  const { props: s, ref: i, patchFlag: r, children: o } = t
    , l = e ? zf(s || {}, e) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: l,
    key: l && fc(l),
    ref: e && e.ref ? n && i ? B(i) ? i.concat(Ds(e)) : [i, Ds(e)] : Ds(e) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: o,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== Re ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Pt(t.ssContent),
    ssFallback: t.ssFallback && Pt(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx
  }
}
function Vf(t = " ", e = 0) {
  return gt(pi, null, t, e)
}
function Pi(t = "", e = !1) {
  return e ? (_e(),
    hc(rt, null, t)) : gt(rt, null, t)
}
function ut(t) {
  return t == null || typeof t == "boolean" ? gt(rt) : B(t) ? gt(Re, null, t.slice()) : typeof t == "object" ? Tt(t) : gt(pi, null, String(t))
}
function Tt(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : Pt(t)
}
function qr(t, e) {
  let n = 0;
  const { shapeFlag: s } = t;
  if (e == null)
    e = null;
  else if (B(e))
    n = 16;
  else if (typeof e == "object")
    if (s & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1),
        qr(t, i()),
        i._c && (i._d = !0));
      return
    } else {
      n = 32;
      const i = e._;
      !i && !(_i in e) ? e._ctx = Ge : i === 3 && Ge && (Ge.slots._ === 1 ? e._ = 1 : (e._ = 2,
        t.patchFlag |= 1024))
    }
  else
    W(e) ? (e = {
      default: e,
      _ctx: Ge
    },
      n = 32) : (e = String(e),
        s & 64 ? (n = 16,
          e = [Vf(e)]) : n = 8);
  t.children = e,
    t.shapeFlag |= n
}
function zf(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    for (const i in s)
      if (i === "class")
        e.class !== s.class && (e.class = fn([e.class, s.class]));
      else if (i === "style")
        e.style = ii([e.style, s.style]);
      else if (ri(i)) {
        const r = e[i]
          , o = s[i];
        o && r !== o && !(B(r) && r.includes(o)) && (e[i] = r ? [].concat(r, o) : o)
      } else
        i !== "" && (e[i] = s[i])
  }
  return e
}
function ct(t, e, n, s = null) {
  Ye(t, e, 7, [n, s])
}
const qf = ac();
let Kf = 0;
function Gf(t, e, n) {
  const s = t.type
    , i = (e ? e.appContext : t.appContext) || qf
    , r = {
      uid: Kf++,
      vnode: t,
      type: s,
      parent: e,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new fh(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: e ? e.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: ic(s, i),
      emitsOptions: Ka(s, i),
      emit: null,
      emitted: null,
      propsDefaults: ce,
      inheritAttrs: s.inheritAttrs,
      ctx: ce,
      data: ce,
      props: ce,
      attrs: ce,
      slots: ce,
      refs: ce,
      setupState: ce,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
  return r.ctx = {
    _: r
  },
    r.root = e ? e.root : r,
    r.emit = Jh.bind(null, r),
    t.ce && t.ce(r),
    r
}
let Ne = null;
const Yf = () => Ne || Ge
  , Tn = t => {
    Ne = t,
      t.scope.on()
  }
  , Jt = () => {
    Ne && Ne.scope.off(),
      Ne = null
  }
  ;
function dc(t) {
  return t.vnode.shapeFlag & 4
}
let ns = !1;
function Qf(t, e = !1) {
  ns = e;
  const { props: n, children: s } = t.vnode
    , i = dc(t);
  Rf(t, n, i, e),
    Pf(t, s);
  const r = i ? Jf(t, e) : void 0;
  return ns = !1,
    r
}
function Jf(t, e) {
  const n = t.type;
  t.accessCache = Object.create(null),
    t.proxy = Ma(new Proxy(t.ctx, wf));
  const { setup: s } = n;
  if (s) {
    const i = t.setupContext = s.length > 1 ? Zf(t) : null;
    Tn(t),
      On();
    const r = xt(s, t, 0, [t.props, i]);
    if (Pn(),
      Jt(),
      va(r)) {
      if (r.then(Jt, Jt),
        e)
        return r.then(o => {
          tl(t, o, e)
        }
        ).catch(o => {
          ci(o, t, 0)
        }
        );
      t.asyncDep = r
    } else
      tl(t, r, e)
  } else
    pc(t, e)
}
function tl(t, e, n) {
  W(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : de(e) && (t.setupState = Wa(e)),
    pc(t, n)
}
let nl;
function pc(t, e, n) {
  const s = t.type;
  if (!t.render) {
    if (!e && nl && !s.render) {
      const i = s.template || Vr(t).template;
      if (i) {
        const { isCustomElement: r, compilerOptions: o } = t.appContext.config
          , { delimiters: l, compilerOptions: a } = s
          , c = De(De({
            isCustomElement: r,
            delimiters: l
          }, o), a);
        s.render = nl(i, c)
      }
    }
    t.render = s.render || it
  }
  Tn(t),
    On(),
    If(t),
    Pn(),
    Jt()
}
function Xf(t) {
  return new Proxy(t.attrs, {
    get(e, n) {
      return qe(t, "get", "$attrs"),
        e[n]
    }
  })
}
function Zf(t) {
  const e = s => {
    t.exposed = s || {}
  }
    ;
  let n;
  return {
    get attrs() {
      return n || (n = Xf(t))
    },
    slots: t.slots,
    emit: t.emit,
    expose: e
  }
}
function gi(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Wa(Ma(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in zn)
          return zn[n](t)
      },
      has(e, n) {
        return n in e || n in zn
      }
    }))
}
function ed(t) {
  return W(t) && "__vccOpts" in t
}
const ks = (t, e) => zh(t, e, ns)
  , td = Symbol("")
  , nd = () => Os(td)
  , sd = "3.2.45"
  , id = "http://www.w3.org/2000/svg"
  , Vt = typeof document < "u" ? document : null
  , sl = Vt && Vt.createElement("template")
  , rd = {
    insert: (t, e, n) => {
      e.insertBefore(t, n || null)
    }
    ,
    remove: t => {
      const e = t.parentNode;
      e && e.removeChild(t)
    }
    ,
    createElement: (t, e, n, s) => {
      const i = e ? Vt.createElementNS(id, t) : Vt.createElement(t, n ? {
        is: n
      } : void 0);
      return t === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple),
        i
    }
    ,
    createText: t => Vt.createTextNode(t),
    createComment: t => Vt.createComment(t),
    setText: (t, e) => {
      t.nodeValue = e
    }
    ,
    setElementText: (t, e) => {
      t.textContent = e
    }
    ,
    parentNode: t => t.parentNode,
    nextSibling: t => t.nextSibling,
    querySelector: t => Vt.querySelector(t),
    setScopeId(t, e) {
      t.setAttribute(e, "")
    },
    insertStaticContent(t, e, n, s, i, r) {
      const o = n ? n.previousSibling : e.lastChild;
      if (i && (i === r || i.nextSibling))
        for (; e.insertBefore(i.cloneNode(!0), n),
          !(i === r || !(i = i.nextSibling));)
          ;
      else {
        sl.innerHTML = s ? `<svg>${t}</svg>` : t;
        const l = sl.content;
        if (s) {
          const a = l.firstChild;
          for (; a.firstChild;)
            l.appendChild(a.firstChild);
          l.removeChild(a)
        }
        e.insertBefore(l, n)
      }
      return [o ? o.nextSibling : e.firstChild, n ? n.previousSibling : e.lastChild]
    }
  };
function od(t, e, n) {
  const s = t._vtc;
  s && (e = (e ? [e, ...s] : [...s]).join(" ")),
    e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e
}
function ld(t, e, n) {
  const s = t.style
    , i = Ce(n);
  if (n && !i) {
    for (const r in n)
      ir(s, r, n[r]);
    if (e && !Ce(e))
      for (const r in e)
        n[r] == null && ir(s, r, "")
  } else {
    const r = s.display;
    i ? e !== n && (s.cssText = n) : e && t.removeAttribute("style"),
      "_vod" in t && (s.display = r)
  }
}
const il = /\s*!important$/;
function ir(t, e, n) {
  if (B(n))
    n.forEach(s => ir(t, e, s));
  else if (n == null && (n = ""),
    e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const s = ad(t, e);
    il.test(n) ? t.setProperty(An(s), n.replace(il, ""), "important") : t[s] = n
  }
}
const rl = ["Webkit", "Moz", "ms"]
  , Di = {};
function ad(t, e) {
  const n = Di[e];
  if (n)
    return n;
  let s = wn(e);
  if (s !== "filter" && s in t)
    return Di[e] = s;
  s = ba(s);
  for (let i = 0; i < rl.length; i++) {
    const r = rl[i] + s;
    if (r in t)
      return Di[e] = r
  }
  return e
}
const ol = "http://www.w3.org/1999/xlink";
function cd(t, e, n, s, i) {
  if (s && e.startsWith("xlink:"))
    n == null ? t.removeAttributeNS(ol, e.slice(6, e.length)) : t.setAttributeNS(ol, e, n);
  else {
    const r = ih(e);
    n == null || r && !ga(n) ? t.removeAttribute(e) : t.setAttribute(e, r ? "" : n)
  }
}
function ud(t, e, n, s, i, r, o) {
  if (e === "innerHTML" || e === "textContent") {
    s && o(s, i, r),
      t[e] = n ?? "";
    return
  }
  if (e === "value" && t.tagName !== "PROGRESS" && !t.tagName.includes("-")) {
    t._value = n;
    const a = n ?? "";
    (t.value !== a || t.tagName === "OPTION") && (t.value = a),
      n == null && t.removeAttribute(e);
    return
  }
  let l = !1;
  if (n === "" || n == null) {
    const a = typeof t[e];
    a === "boolean" ? n = ga(n) : n == null && a === "string" ? (n = "",
      l = !0) : a === "number" && (n = 0,
        l = !0)
  }
  try {
    t[e] = n
  } catch { }
  l && t.removeAttribute(e)
}
function un(t, e, n, s) {
  t.addEventListener(e, n, s)
}
function hd(t, e, n, s) {
  t.removeEventListener(e, n, s)
}
function fd(t, e, n, s, i = null) {
  const r = t._vei || (t._vei = {})
    , o = r[e];
  if (s && o)
    o.value = s;
  else {
    const [l, a] = dd(e);
    if (s) {
      const c = r[e] = gd(s, i);
      un(t, l, c, a)
    } else
      o && (hd(t, l, o, a),
        r[e] = void 0)
  }
}
const ll = /(?:Once|Passive|Capture)$/;
function dd(t) {
  let e;
  if (ll.test(t)) {
    e = {};
    let s;
    for (; s = t.match(ll);)
      t = t.slice(0, t.length - s[0].length),
        e[s[0].toLowerCase()] = !0
  }
  return [t[2] === ":" ? t.slice(3) : An(t.slice(2)), e]
}
let ki = 0;
const pd = Promise.resolve()
  , _d = () => ki || (pd.then(() => ki = 0),
    ki = Date.now());
function gd(t, e) {
  const n = s => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Ye(md(s, n.value), e, 5, [s])
  }
    ;
  return n.value = t,
    n.attached = _d(),
    n
}
function md(t, e) {
  if (B(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t),
        t._stopped = !0
    }
      ,
      e.map(s => i => !i._stopped && s && s(i))
  } else
    return e
}
const al = /^on[a-z]/
  , yd = (t, e, n, s, i = !1, r, o, l, a) => {
    e === "class" ? od(t, s, i) : e === "style" ? ld(t, n, s) : ri(e) ? Nr(e) || fd(t, e, n, s, o) : (e[0] === "." ? (e = e.slice(1),
      !0) : e[0] === "^" ? (e = e.slice(1),
        !1) : vd(t, e, s, i)) ? ud(t, e, s, r, o, l, a) : (e === "true-value" ? t._trueValue = s : e === "false-value" && (t._falseValue = s),
          cd(t, e, s, i))
  }
  ;
function vd(t, e, n, s) {
  return s ? !!(e === "innerHTML" || e === "textContent" || e in t && al.test(e) && W(n)) : e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA" || al.test(e) && Ce(n) ? !1 : e in t
}
const Cd = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
ff.props;
const cl = t => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return B(e) ? n => As(e, n) : e
}
  ;
function Ed(t) {
  t.target.composing = !0
}
function ul(t) {
  const e = t.target;
  e.composing && (e.composing = !1,
    e.dispatchEvent(new Event("input")))
}
const hl = {
  created(t, { modifiers: { lazy: e, trim: n, number: s } }, i) {
    t._assign = cl(i);
    const r = s || i.props && i.props.type === "number";
    un(t, e ? "change" : "input", o => {
      if (o.target.composing)
        return;
      let l = t.value;
      n && (l = l.trim()),
        r && (l = Fs(l)),
        t._assign(l)
    }
    ),
      n && un(t, "change", () => {
        t.value = t.value.trim()
      }
      ),
      e || (un(t, "compositionstart", Ed),
        un(t, "compositionend", ul),
        un(t, "change", ul))
  },
  mounted(t, { value: e }) {
    t.value = e ?? ""
  },
  beforeUpdate(t, { value: e, modifiers: { lazy: n, trim: s, number: i } }, r) {
    if (t._assign = cl(r),
      t.composing || document.activeElement === t && t.type !== "range" && (n || s && t.value.trim() === e || (i || t.type === "number") && Fs(t.value) === e))
      return;
    const o = e ?? "";
    t.value !== o && (t.value = o)
  }
}
  , bd = De({
    patchProp: yd
  }, rd);
let fl;
function wd() {
  return fl || (fl = Ff(bd))
}
const Id = (...t) => {
  const e = wd().createApp(...t)
    , { mount: n } = e;
  return e.mount = s => {
    const i = Td(s);
    if (!i)
      return;
    const r = e._component;
    !W(r) && !r.render && !r.template && (r.template = i.innerHTML),
      i.innerHTML = "";
    const o = n(i, !1, i instanceof SVGElement);
    return i instanceof Element && (i.removeAttribute("v-cloak"),
      i.setAttribute("data-v-app", "")),
      o
  }
    ,
    e
}
  ;
function Td(t) {
  return Ce(t) ? document.querySelector(t) : t
}
var dl;
const ds = typeof window < "u"
  , Sd = t => typeof t == "function"
  , xd = t => typeof t == "string"
  , Nd = () => { }
  ;
ds && ((dl = window == null ? void 0 : window.navigator) != null && dl.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function _c(t) {
  return typeof t == "function" ? t() : Se(t)
}
function Rd(t, e) {
  function n(...s) {
    t(() => e.apply(this, s), {
      fn: e,
      thisArg: this,
      args: s
    })
  }
  return n
}
const gc = t => t();
function Ad(t = gc) {
  const e = Yt(!0);
  function n() {
    e.value = !1
  }
  function s() {
    e.value = !0
  }
  return {
    isActive: e,
    pause: n,
    resume: s,
    eventFilter: (...r) => {
      e.value && t(...r)
    }
  }
}
function Od(t) {
  return t
}
function Pd(t) {
  return ph() ? (_h(t),
    !0) : !1
}
var pl = Object.getOwnPropertySymbols
  , Dd = Object.prototype.hasOwnProperty
  , kd = Object.prototype.propertyIsEnumerable
  , Md = (t, e) => {
    var n = {};
    for (var s in t)
      Dd.call(t, s) && e.indexOf(s) < 0 && (n[s] = t[s]);
    if (t != null && pl)
      for (var s of pl(t))
        e.indexOf(s) < 0 && kd.call(t, s) && (n[s] = t[s]);
    return n
  }
  ;
function Fd(t, e, n = {}) {
  const s = n
    , { eventFilter: i = gc } = s
    , r = Md(s, ["eventFilter"]);
  return Qt(t, Rd(i, e), r)
}
var Ld = Object.defineProperty
  , Bd = Object.defineProperties
  , Ud = Object.getOwnPropertyDescriptors
  , Ws = Object.getOwnPropertySymbols
  , mc = Object.prototype.hasOwnProperty
  , yc = Object.prototype.propertyIsEnumerable
  , _l = (t, e, n) => e in t ? Ld(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
  }) : t[e] = n
  , Wd = (t, e) => {
    for (var n in e || (e = {}))
      mc.call(e, n) && _l(t, n, e[n]);
    if (Ws)
      for (var n of Ws(e))
        yc.call(e, n) && _l(t, n, e[n]);
    return t
  }
  , Hd = (t, e) => Bd(t, Ud(e))
  , $d = (t, e) => {
    var n = {};
    for (var s in t)
      mc.call(t, s) && e.indexOf(s) < 0 && (n[s] = t[s]);
    if (t != null && Ws)
      for (var s of Ws(t))
        e.indexOf(s) < 0 && yc.call(t, s) && (n[s] = t[s]);
    return n
  }
  ;
function jd(t, e, n = {}) {
  const s = n
    , { eventFilter: i } = s
    , r = $d(s, ["eventFilter"])
    , { eventFilter: o, pause: l, resume: a, isActive: c } = Ad(i);
  return {
    stop: Fd(t, e, Hd(Wd({}, r), {
      eventFilter: o
    })),
    pause: l,
    resume: a,
    isActive: c
  }
}
function Vd(t) {
  var e;
  const n = _c(t);
  return (e = n == null ? void 0 : n.$el) != null ? e : n
}
const Hs = ds ? window : void 0;
ds && window.document;
ds && window.navigator;
ds && window.location;
function zd(...t) {
  let e, n, s, i;
  if (xd(t[0]) || Array.isArray(t[0]) ? ([n, s, i] = t,
    e = Hs) : [e, n, s, i] = t,
    !e)
    return Nd;
  Array.isArray(n) || (n = [n]),
    Array.isArray(s) || (s = [s]);
  const r = []
    , o = () => {
      r.forEach(u => u()),
        r.length = 0
    }
    , l = (u, h, d) => (u.addEventListener(h, d, i),
      () => u.removeEventListener(h, d, i))
    , a = Qt(() => Vd(e), u => {
      o(),
        u && r.push(...n.flatMap(h => s.map(d => l(u, h, d))))
    }
      , {
        immediate: !0,
        flush: "post"
      })
    , c = () => {
      a(),
        o()
    }
    ;
  return Pd(c),
    c
}
const rr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , or = "__vueuse_ssr_handlers__";
rr[or] = rr[or] || {};
const qd = rr[or];
function Kd(t, e) {
  return qd[t] || e
}
function Gd(t) {
  return t == null ? "any" : t instanceof Set ? "set" : t instanceof Map ? "map" : t instanceof Date ? "date" : typeof t == "boolean" ? "boolean" : typeof t == "string" ? "string" : typeof t == "object" ? "object" : Number.isNaN(t) ? "any" : "number"
}
var Yd = Object.defineProperty
  , gl = Object.getOwnPropertySymbols
  , Qd = Object.prototype.hasOwnProperty
  , Jd = Object.prototype.propertyIsEnumerable
  , ml = (t, e, n) => e in t ? Yd(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
  }) : t[e] = n
  , yl = (t, e) => {
    for (var n in e || (e = {}))
      Qd.call(e, n) && ml(t, n, e[n]);
    if (gl)
      for (var n of gl(e))
        Jd.call(e, n) && ml(t, n, e[n]);
    return t
  }
  ;
const Xd = {
  boolean: {
    read: t => t === "true",
    write: t => String(t)
  },
  object: {
    read: t => JSON.parse(t),
    write: t => JSON.stringify(t)
  },
  number: {
    read: t => Number.parseFloat(t),
    write: t => String(t)
  },
  any: {
    read: t => t,
    write: t => String(t)
  },
  string: {
    read: t => t,
    write: t => String(t)
  },
  map: {
    read: t => new Map(JSON.parse(t)),
    write: t => JSON.stringify(Array.from(t.entries()))
  },
  set: {
    read: t => new Set(JSON.parse(t)),
    write: t => JSON.stringify(Array.from(t))
  },
  date: {
    read: t => new Date(t),
    write: t => t.toISOString()
  }
};
function Zd(t, e, n, s = {}) {
  var i;
  const { flush: r = "pre", deep: o = !0, listenToStorageChanges: l = !0, writeDefaults: a = !0, mergeDefaults: c = !1, shallow: u, window: h = Hs, eventFilter: d, onError: g = G => {
    console.error(G)
  }
  } = s
    , C = (u ? Ba : Yt)(e);
  if (!n)
    try {
      n = Kd("getDefaultStorage", () => {
        var G;
        return (G = Hs) == null ? void 0 : G.localStorage
      }
      )()
    } catch (G) {
      g(G)
    }
  if (!n)
    return C;
  const E = _c(e)
    , U = Gd(E)
    , P = (i = s.serializer) != null ? i : Xd[U]
    , { pause: he, resume: D } = jd(C, () => ee(C.value), {
      flush: r,
      deep: o,
      eventFilter: d
    });
  return h && l && zd(h, "storage", Qe),
    Qe(),
    C;
  function ee(G) {
    try {
      if (G == null)
        n.removeItem(t);
      else {
        const O = P.write(G)
          , te = n.getItem(t);
        te !== O && (n.setItem(t, O),
          h && (h == null || h.dispatchEvent(new StorageEvent("storage", {
            key: t,
            oldValue: te,
            newValue: O,
            storageArea: n
          }))))
      }
    } catch (O) {
      g(O)
    }
  }
  function ge(G) {
    const O = G ? G.newValue : n.getItem(t);
    if (O == null)
      return a && E !== null && n.setItem(t, P.write(E)),
        E;
    if (!G && c) {
      const te = P.read(O);
      return Sd(c) ? c(te, E) : U === "object" && !Array.isArray(te) ? yl(yl({}, E), te) : te
    } else
      return typeof O != "string" ? O : P.read(O)
  }
  function Qe(G) {
    if (!(G && G.storageArea !== n)) {
      if (G && G.key == null) {
        C.value = E;
        return
      }
      if (!(G && G.key !== t)) {
        he();
        try {
          C.value = ge(G)
        } catch (O) {
          g(O)
        } finally {
          G ? ja(D) : D()
        }
      }
    }
  }
}
function ep(t, e, n = {}) {
  const { window: s = Hs } = n;
  return Zd(t, e, s == null ? void 0 : s.localStorage, n)
}
var vl;
(function (t) {
  t.UP = "UP",
    t.RIGHT = "RIGHT",
    t.DOWN = "DOWN",
    t.LEFT = "LEFT",
    t.NONE = "NONE"
}
)(vl || (vl = {}));
var tp = Object.defineProperty
  , Cl = Object.getOwnPropertySymbols
  , np = Object.prototype.hasOwnProperty
  , sp = Object.prototype.propertyIsEnumerable
  , El = (t, e, n) => e in t ? tp(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
  }) : t[e] = n
  , ip = (t, e) => {
    for (var n in e || (e = {}))
      np.call(e, n) && El(t, n, e[n]);
    if (Cl)
      for (var n of Cl(e))
        sp.call(e, n) && El(t, n, e[n]);
    return t
  }
  ;
const rp = {
  easeInSine: [.12, 0, .39, 0],
  easeOutSine: [.61, 1, .88, 1],
  easeInOutSine: [.37, 0, .63, 1],
  easeInQuad: [.11, 0, .5, 0],
  easeOutQuad: [.5, 1, .89, 1],
  easeInOutQuad: [.45, 0, .55, 1],
  easeInCubic: [.32, 0, .67, 0],
  easeOutCubic: [.33, 1, .68, 1],
  easeInOutCubic: [.65, 0, .35, 1],
  easeInQuart: [.5, 0, .75, 0],
  easeOutQuart: [.25, 1, .5, 1],
  easeInOutQuart: [.76, 0, .24, 1],
  easeInQuint: [.64, 0, .78, 0],
  easeOutQuint: [.22, 1, .36, 1],
  easeInOutQuint: [.83, 0, .17, 1],
  easeInExpo: [.7, 0, .84, 0],
  easeOutExpo: [.16, 1, .3, 1],
  easeInOutExpo: [.87, 0, .13, 1],
  easeInCirc: [.55, 0, 1, .45],
  easeOutCirc: [0, .55, .45, 1],
  easeInOutCirc: [.85, 0, .15, 1],
  easeInBack: [.36, 0, .66, -.56],
  easeOutBack: [.34, 1.56, .64, 1],
  easeInOutBack: [.68, -.6, .32, 1.6]
};
ip({
  linear: Od
}, rp);
const mn = ep("config", {});
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const vc = {
  NODE_CLIENT: !1,
  NODE_ADMIN: !1,
  SDK_VERSION: "${JSCORE_VERSION}"
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const b = function (t, e) {
  if (!t)
    throw Dn(e)
}
  , Dn = function (t) {
    return new Error("Firebase Database (" + vc.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + t)
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Cc = function (t) {
  const e = [];
  let n = 0;
  for (let s = 0; s < t.length; s++) {
    let i = t.charCodeAt(s);
    i < 128 ? e[n++] = i : i < 2048 ? (e[n++] = i >> 6 | 192,
      e[n++] = i & 63 | 128) : (i & 64512) === 55296 && s + 1 < t.length && (t.charCodeAt(s + 1) & 64512) === 56320 ? (i = 65536 + ((i & 1023) << 10) + (t.charCodeAt(++s) & 1023),
        e[n++] = i >> 18 | 240,
        e[n++] = i >> 12 & 63 | 128,
        e[n++] = i >> 6 & 63 | 128,
        e[n++] = i & 63 | 128) : (e[n++] = i >> 12 | 224,
          e[n++] = i >> 6 & 63 | 128,
          e[n++] = i & 63 | 128)
  }
  return e
}
  , op = function (t) {
    const e = [];
    let n = 0
      , s = 0;
    for (; n < t.length;) {
      const i = t[n++];
      if (i < 128)
        e[s++] = String.fromCharCode(i);
      else if (i > 191 && i < 224) {
        const r = t[n++];
        e[s++] = String.fromCharCode((i & 31) << 6 | r & 63)
      } else if (i > 239 && i < 365) {
        const r = t[n++]
          , o = t[n++]
          , l = t[n++]
          , a = ((i & 7) << 18 | (r & 63) << 12 | (o & 63) << 6 | l & 63) - 65536;
        e[s++] = String.fromCharCode(55296 + (a >> 10)),
          e[s++] = String.fromCharCode(56320 + (a & 1023))
      } else {
        const r = t[n++]
          , o = t[n++];
        e[s++] = String.fromCharCode((i & 15) << 12 | (r & 63) << 6 | o & 63)
      }
    }
    return e.join("")
  }
  , Kr = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/="
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_."
    },
    HAS_NATIVE_SUPPORT: typeof atob == "function",
    encodeByteArray(t, e) {
      if (!Array.isArray(t))
        throw Error("encodeByteArray takes an array as a parameter");
      this.init_();
      const n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_
        , s = [];
      for (let i = 0; i < t.length; i += 3) {
        const r = t[i]
          , o = i + 1 < t.length
          , l = o ? t[i + 1] : 0
          , a = i + 2 < t.length
          , c = a ? t[i + 2] : 0
          , u = r >> 2
          , h = (r & 3) << 4 | l >> 4;
        let d = (l & 15) << 2 | c >> 6
          , g = c & 63;
        a || (g = 64,
          o || (d = 64)),
          s.push(n[u], n[h], n[d], n[g])
      }
      return s.join("")
    },
    encodeString(t, e) {
      return this.HAS_NATIVE_SUPPORT && !e ? btoa(t) : this.encodeByteArray(Cc(t), e)
    },
    decodeString(t, e) {
      return this.HAS_NATIVE_SUPPORT && !e ? atob(t) : op(this.decodeStringToByteArray(t, e))
    },
    decodeStringToByteArray(t, e) {
      this.init_();
      const n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_
        , s = [];
      for (let i = 0; i < t.length;) {
        const r = n[t.charAt(i++)]
          , l = i < t.length ? n[t.charAt(i)] : 0;
        ++i;
        const c = i < t.length ? n[t.charAt(i)] : 64;
        ++i;
        const h = i < t.length ? n[t.charAt(i)] : 64;
        if (++i,
          r == null || l == null || c == null || h == null)
          throw Error();
        const d = r << 2 | l >> 4;
        if (s.push(d),
          c !== 64) {
          const g = l << 4 & 240 | c >> 2;
          if (s.push(g),
            h !== 64) {
            const C = c << 6 & 192 | h;
            s.push(C)
          }
        }
      }
      return s
    },
    init_() {
      if (!this.byteToCharMap_) {
        this.byteToCharMap_ = {},
          this.charToByteMap_ = {},
          this.byteToCharMapWebSafe_ = {},
          this.charToByteMapWebSafe_ = {};
        for (let t = 0; t < this.ENCODED_VALS.length; t++)
          this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t),
            this.charToByteMap_[this.byteToCharMap_[t]] = t,
            this.byteToCharMapWebSafe_[t] = this.ENCODED_VALS_WEBSAFE.charAt(t),
            this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]] = t,
            t >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)] = t,
              this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)] = t)
      }
    }
  }
  , Ec = function (t) {
    const e = Cc(t);
    return Kr.encodeByteArray(e, !0)
  }
  , $s = function (t) {
    return Ec(t).replace(/\./g, "")
  }
  , lr = function (t) {
    try {
      return Kr.decodeString(t, !0)
    } catch (e) {
      console.error("base64Decode failed: ", e)
    }
    return null
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function lp(t) {
  return bc(void 0, t)
}
function bc(t, e) {
  if (!(e instanceof Object))
    return e;
  switch (e.constructor) {
    case Date:
      const n = e;
      return new Date(n.getTime());
    case Object:
      t === void 0 && (t = {});
      break;
    case Array:
      t = [];
      break;
    default:
      return e
  }
  for (const n in e)
    !e.hasOwnProperty(n) || !ap(n) || (t[n] = bc(t[n], e[n]));
  return t
}
function ap(t) {
  return t !== "__proto__"
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function cp() {
  return typeof navigator < "u" && typeof navigator.userAgent == "string" ? navigator.userAgent : ""
}
function wc() {
  return typeof window < "u" && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(cp())
}
function up() {
  return typeof navigator == "object" && navigator.product === "ReactNative"
}
function Ic() {
  return vc.NODE_ADMIN === !0
}
function hp() {
  try {
    return typeof indexedDB == "object"
  } catch {
    return !1
  }
}
function fp() {
  return new Promise((t, e) => {
    try {
      let n = !0;
      const s = "validate-browser-context-for-indexeddb-analytics-module"
        , i = self.indexedDB.open(s);
      i.onsuccess = () => {
        i.result.close(),
          n || self.indexedDB.deleteDatabase(s),
          t(!0)
      }
        ,
        i.onupgradeneeded = () => {
          n = !1
        }
        ,
        i.onerror = () => {
          var r;
          e(((r = i.error) === null || r === void 0 ? void 0 : r.message) || "")
        }
    } catch (n) {
      e(n)
    }
  }
  )
}
function dp() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("Unable to locate global object.")
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pp = () => dp().__FIREBASE_DEFAULTS__
  , _p = () => {
    if (typeof process > "u" || typeof process.env > "u")
      return;
    const t = {}.__FIREBASE_DEFAULTS__;
    if (t)
      return JSON.parse(t)
  }
  , gp = () => {
    if (typeof document > "u")
      return;
    let t;
    try {
      t = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
    } catch {
      return
    }
    const e = t && lr(t[1]);
    return e && JSON.parse(e)
  }
  , Tc = () => {
    try {
      return pp() || _p() || gp()
    } catch (t) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);
      return
    }
  }
  , mp = t => {
    var e, n;
    return (n = (e = Tc()) === null || e === void 0 ? void 0 : e.emulatorHosts) === null || n === void 0 ? void 0 : n[t]
  }
  , yp = t => {
    const e = mp(t);
    if (!e)
      return;
    const n = e.lastIndexOf(":");
    if (n <= 0 || n + 1 === e.length)
      throw new Error(`Invalid host ${e} with no separate hostname and port!`);
    const s = parseInt(e.substring(n + 1), 10);
    return e[0] === "[" ? [e.substring(1, n - 1), s] : [e.substring(0, n), s]
  }
  , vp = () => {
    var t;
    return (t = Tc()) === null || t === void 0 ? void 0 : t.config
  }
  ;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mi {
  constructor() {
    this.reject = () => { }
      ,
      this.resolve = () => { }
      ,
      this.promise = new Promise((e, n) => {
        this.resolve = e,
          this.reject = n
      }
      )
  }
  wrapCallback(e) {
    return (n, s) => {
      n ? this.reject(n) : this.resolve(s),
        typeof e == "function" && (this.promise.catch(() => { }
        ),
          e.length === 1 ? e(n) : e(n, s))
    }
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Cp(t, e) {
  if (t.uid)
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  const n = {
    alg: "none",
    type: "JWT"
  }
    , s = e || "demo-project"
    , i = t.iat || 0
    , r = t.sub || t.user_id;
  if (!r)
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  const o = Object.assign({
    iss: `https://securetoken.google.com/${s}`,
    aud: s,
    iat: i,
    exp: i + 3600,
    auth_time: i,
    sub: r,
    user_id: r,
    firebase: {
      sign_in_provider: "custom",
      identities: {}
    }
  }, t)
    , l = "";
  return [$s(JSON.stringify(n)), $s(JSON.stringify(o)), l].join(".")
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ep = "FirebaseError";
class ps extends Error {
  constructor(e, n, s) {
    super(n),
      this.code = e,
      this.customData = s,
      this.name = Ep,
      Object.setPrototypeOf(this, ps.prototype),
      Error.captureStackTrace && Error.captureStackTrace(this, Sc.prototype.create)
  }
}
class Sc {
  constructor(e, n, s) {
    this.service = e,
      this.serviceName = n,
      this.errors = s
  }
  create(e, ...n) {
    const s = n[0] || {}
      , i = `${this.service}/${e}`
      , r = this.errors[e]
      , o = r ? bp(r, s) : "Error"
      , l = `${this.serviceName}: ${o} (${i}).`;
    return new ps(i, l, s)
  }
}
function bp(t, e) {
  return t.replace(wp, (n, s) => {
    const i = e[s];
    return i != null ? String(i) : `<${s}?>`
  }
  )
}
const wp = /\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ss(t) {
  return JSON.parse(t)
}
function Ie(t) {
  return JSON.stringify(t)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const xc = function (t) {
  let e = {}
    , n = {}
    , s = {}
    , i = "";
  try {
    const r = t.split(".");
    e = ss(lr(r[0]) || ""),
      n = ss(lr(r[1]) || ""),
      i = r[2],
      s = n.d || {},
      delete n.d
  } catch { }
  return {
    header: e,
    claims: n,
    data: s,
    signature: i
  }
}
  , Ip = function (t) {
    const e = xc(t)
      , n = e.claims;
    return !!n && typeof n == "object" && n.hasOwnProperty("iat")
  }
  , Tp = function (t) {
    const e = xc(t).claims;
    return typeof e == "object" && e.admin === !0
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function bt(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e)
}
function Sn(t, e) {
  if (Object.prototype.hasOwnProperty.call(t, e))
    return t[e]
}
function bl(t) {
  for (const e in t)
    if (Object.prototype.hasOwnProperty.call(t, e))
      return !1;
  return !0
}
function js(t, e, n) {
  const s = {};
  for (const i in t)
    Object.prototype.hasOwnProperty.call(t, i) && (s[i] = e.call(n, t[i], i, t));
  return s
}
function ar(t, e) {
  if (t === e)
    return !0;
  const n = Object.keys(t)
    , s = Object.keys(e);
  for (const i of n) {
    if (!s.includes(i))
      return !1;
    const r = t[i]
      , o = e[i];
    if (wl(r) && wl(o)) {
      if (!ar(r, o))
        return !1
    } else if (r !== o)
      return !1
  }
  for (const i of s)
    if (!n.includes(i))
      return !1;
  return !0
}
function wl(t) {
  return t !== null && typeof t == "object"
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Sp(t) {
  const e = [];
  for (const [n, s] of Object.entries(t))
    Array.isArray(s) ? s.forEach(i => {
      e.push(encodeURIComponent(n) + "=" + encodeURIComponent(i))
    }
    ) : e.push(encodeURIComponent(n) + "=" + encodeURIComponent(s));
  return e.length ? "&" + e.join("&") : ""
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xp {
  constructor() {
    this.chain_ = [],
      this.buf_ = [],
      this.W_ = [],
      this.pad_ = [],
      this.inbuf_ = 0,
      this.total_ = 0,
      this.blockSize = 512 / 8,
      this.pad_[0] = 128;
    for (let e = 1; e < this.blockSize; ++e)
      this.pad_[e] = 0;
    this.reset()
  }
  reset() {
    this.chain_[0] = 1732584193,
      this.chain_[1] = 4023233417,
      this.chain_[2] = 2562383102,
      this.chain_[3] = 271733878,
      this.chain_[4] = 3285377520,
      this.inbuf_ = 0,
      this.total_ = 0
  }
  compress_(e, n) {
    n || (n = 0);
    const s = this.W_;
    if (typeof e == "string")
      for (let h = 0; h < 16; h++)
        s[h] = e.charCodeAt(n) << 24 | e.charCodeAt(n + 1) << 16 | e.charCodeAt(n + 2) << 8 | e.charCodeAt(n + 3),
          n += 4;
    else
      for (let h = 0; h < 16; h++)
        s[h] = e[n] << 24 | e[n + 1] << 16 | e[n + 2] << 8 | e[n + 3],
          n += 4;
    for (let h = 16; h < 80; h++) {
      const d = s[h - 3] ^ s[h - 8] ^ s[h - 14] ^ s[h - 16];
      s[h] = (d << 1 | d >>> 31) & 4294967295
    }
    let i = this.chain_[0], r = this.chain_[1], o = this.chain_[2], l = this.chain_[3], a = this.chain_[4], c, u;
    for (let h = 0; h < 80; h++) {
      h < 40 ? h < 20 ? (c = l ^ r & (o ^ l),
        u = 1518500249) : (c = r ^ o ^ l,
          u = 1859775393) : h < 60 ? (c = r & o | l & (r | o),
            u = 2400959708) : (c = r ^ o ^ l,
              u = 3395469782);
      const d = (i << 5 | i >>> 27) + c + a + u + s[h] & 4294967295;
      a = l,
        l = o,
        o = (r << 30 | r >>> 2) & 4294967295,
        r = i,
        i = d
    }
    this.chain_[0] = this.chain_[0] + i & 4294967295,
      this.chain_[1] = this.chain_[1] + r & 4294967295,
      this.chain_[2] = this.chain_[2] + o & 4294967295,
      this.chain_[3] = this.chain_[3] + l & 4294967295,
      this.chain_[4] = this.chain_[4] + a & 4294967295
  }
  update(e, n) {
    if (e == null)
      return;
    n === void 0 && (n = e.length);
    const s = n - this.blockSize;
    let i = 0;
    const r = this.buf_;
    let o = this.inbuf_;
    for (; i < n;) {
      if (o === 0)
        for (; i <= s;)
          this.compress_(e, i),
            i += this.blockSize;
      if (typeof e == "string") {
        for (; i < n;)
          if (r[o] = e.charCodeAt(i),
            ++o,
            ++i,
            o === this.blockSize) {
            this.compress_(r),
              o = 0;
            break
          }
      } else
        for (; i < n;)
          if (r[o] = e[i],
            ++o,
            ++i,
            o === this.blockSize) {
            this.compress_(r),
              o = 0;
            break
          }
    }
    this.inbuf_ = o,
      this.total_ += n
  }
  digest() {
    const e = [];
    let n = this.total_ * 8;
    this.inbuf_ < 56 ? this.update(this.pad_, 56 - this.inbuf_) : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
    for (let i = this.blockSize - 1; i >= 56; i--)
      this.buf_[i] = n & 255,
        n /= 256;
    this.compress_(this.buf_);
    let s = 0;
    for (let i = 0; i < 5; i++)
      for (let r = 24; r >= 0; r -= 8)
        e[s] = this.chain_[i] >> r & 255,
          ++s;
    return e
  }
}
function Gr(t, e) {
  return `${t} failed: ${e} argument `
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Np = function (t) {
  const e = [];
  let n = 0;
  for (let s = 0; s < t.length; s++) {
    let i = t.charCodeAt(s);
    if (i >= 55296 && i <= 56319) {
      const r = i - 55296;
      s++,
        b(s < t.length, "Surrogate pair missing trail surrogate.");
      const o = t.charCodeAt(s) - 56320;
      i = 65536 + (r << 10) + o
    }
    i < 128 ? e[n++] = i : i < 2048 ? (e[n++] = i >> 6 | 192,
      e[n++] = i & 63 | 128) : i < 65536 ? (e[n++] = i >> 12 | 224,
        e[n++] = i >> 6 & 63 | 128,
        e[n++] = i & 63 | 128) : (e[n++] = i >> 18 | 240,
          e[n++] = i >> 12 & 63 | 128,
          e[n++] = i >> 6 & 63 | 128,
          e[n++] = i & 63 | 128)
  }
  return e
}
  , yi = function (t) {
    let e = 0;
    for (let n = 0; n < t.length; n++) {
      const s = t.charCodeAt(n);
      s < 128 ? e++ : s < 2048 ? e += 2 : s >= 55296 && s <= 56319 ? (e += 4,
        n++) : e += 3
    }
    return e
  };
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function kn(t) {
  return t && t._delegate ? t._delegate : t
}
class is {
  constructor(e, n, s) {
    this.name = e,
      this.instanceFactory = n,
      this.type = s,
      this.multipleInstances = !1,
      this.serviceProps = {},
      this.instantiationMode = "LAZY",
      this.onInstanceCreated = null
  }
  setInstantiationMode(e) {
    return this.instantiationMode = e,
      this
  }
  setMultipleInstances(e) {
    return this.multipleInstances = e,
      this
  }
  setServiceProps(e) {
    return this.serviceProps = e,
      this
  }
  setInstanceCreatedCallback(e) {
    return this.onInstanceCreated = e,
      this
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Wt = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rp {
  constructor(e, n) {
    this.name = e,
      this.container = n,
      this.component = null,
      this.instances = new Map,
      this.instancesDeferred = new Map,
      this.instancesOptions = new Map,
      this.onInitCallbacks = new Map
  }
  get(e) {
    const n = this.normalizeInstanceIdentifier(e);
    if (!this.instancesDeferred.has(n)) {
      const s = new mi;
      if (this.instancesDeferred.set(n, s),
        this.isInitialized(n) || this.shouldAutoInitialize())
        try {
          const i = this.getOrInitializeService({
            instanceIdentifier: n
          });
          i && s.resolve(i)
        } catch { }
    }
    return this.instancesDeferred.get(n).promise
  }
  getImmediate(e) {
    var n;
    const s = this.normalizeInstanceIdentifier(e == null ? void 0 : e.identifier)
      , i = (n = e == null ? void 0 : e.optional) !== null && n !== void 0 ? n : !1;
    if (this.isInitialized(s) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({
          instanceIdentifier: s
        })
      } catch (r) {
        if (i)
          return null;
        throw r
      }
    else {
      if (i)
        return null;
      throw Error(`Service ${this.name} is not available`)
    }
  }
  getComponent() {
    return this.component
  }
  setComponent(e) {
    if (e.name !== this.name)
      throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (this.component = e,
      !!this.shouldAutoInitialize()) {
      if (Op(e))
        try {
          this.getOrInitializeService({
            instanceIdentifier: Wt
          })
        } catch { }
      for (const [n, s] of this.instancesDeferred.entries()) {
        const i = this.normalizeInstanceIdentifier(n);
        try {
          const r = this.getOrInitializeService({
            instanceIdentifier: i
          });
          s.resolve(r)
        } catch { }
      }
    }
  }
  clearInstance(e = Wt) {
    this.instancesDeferred.delete(e),
      this.instancesOptions.delete(e),
      this.instances.delete(e)
  }
  async delete() {
    const e = Array.from(this.instances.values());
    await Promise.all([...e.filter(n => "INTERNAL" in n).map(n => n.INTERNAL.delete()), ...e.filter(n => "_delete" in n).map(n => n._delete())])
  }
  isComponentSet() {
    return this.component != null
  }
  isInitialized(e = Wt) {
    return this.instances.has(e)
  }
  getOptions(e = Wt) {
    return this.instancesOptions.get(e) || {}
  }
  initialize(e = {}) {
    const { options: n = {} } = e
      , s = this.normalizeInstanceIdentifier(e.instanceIdentifier);
    if (this.isInitialized(s))
      throw Error(`${this.name}(${s}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const i = this.getOrInitializeService({
      instanceIdentifier: s,
      options: n
    });
    for (const [r, o] of this.instancesDeferred.entries()) {
      const l = this.normalizeInstanceIdentifier(r);
      s === l && o.resolve(i)
    }
    return i
  }
  onInit(e, n) {
    var s;
    const i = this.normalizeInstanceIdentifier(n)
      , r = (s = this.onInitCallbacks.get(i)) !== null && s !== void 0 ? s : new Set;
    r.add(e),
      this.onInitCallbacks.set(i, r);
    const o = this.instances.get(i);
    return o && e(o, i),
      () => {
        r.delete(e)
      }
  }
  invokeOnInitCallbacks(e, n) {
    const s = this.onInitCallbacks.get(n);
    if (s)
      for (const i of s)
        try {
          i(e, n)
        } catch { }
  }
  getOrInitializeService({ instanceIdentifier: e, options: n = {} }) {
    let s = this.instances.get(e);
    if (!s && this.component && (s = this.component.instanceFactory(this.container, {
      instanceIdentifier: Ap(e),
      options: n
    }),
      this.instances.set(e, s),
      this.instancesOptions.set(e, n),
      this.invokeOnInitCallbacks(s, e),
      this.component.onInstanceCreated))
      try {
        this.component.onInstanceCreated(this.container, e, s)
      } catch { }
    return s || null
  }
  normalizeInstanceIdentifier(e = Wt) {
    return this.component ? this.component.multipleInstances ? e : Wt : e
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT"
  }
}
function Ap(t) {
  return t === Wt ? void 0 : t
}
function Op(t) {
  return t.instantiationMode === "EAGER"
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pp {
  constructor(e) {
    this.name = e,
      this.providers = new Map
  }
  addComponent(e) {
    const n = this.getProvider(e.name);
    if (n.isComponentSet())
      throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
    n.setComponent(e)
  }
  addOrOverwriteComponent(e) {
    this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name),
      this.addComponent(e)
  }
  getProvider(e) {
    if (this.providers.has(e))
      return this.providers.get(e);
    const n = new Rp(e, this);
    return this.providers.set(e, n),
      n
  }
  getProviders() {
    return Array.from(this.providers.values())
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var oe;
(function (t) {
  t[t.DEBUG = 0] = "DEBUG",
    t[t.VERBOSE = 1] = "VERBOSE",
    t[t.INFO = 2] = "INFO",
    t[t.WARN = 3] = "WARN",
    t[t.ERROR = 4] = "ERROR",
    t[t.SILENT = 5] = "SILENT"
}
)(oe || (oe = {}));
const Dp = {
  debug: oe.DEBUG,
  verbose: oe.VERBOSE,
  info: oe.INFO,
  warn: oe.WARN,
  error: oe.ERROR,
  silent: oe.SILENT
}
  , kp = oe.INFO
  , Mp = {
    [oe.DEBUG]: "log",
    [oe.VERBOSE]: "log",
    [oe.INFO]: "info",
    [oe.WARN]: "warn",
    [oe.ERROR]: "error"
  }
  , Fp = (t, e, ...n) => {
    if (e < t.logLevel)
      return;
    const s = new Date().toISOString()
      , i = Mp[e];
    if (i)
      console[i](`[${s}]  ${t.name}:`, ...n);
    else
      throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)
  }
  ;
class Nc {
  constructor(e) {
    this.name = e,
      this._logLevel = kp,
      this._logHandler = Fp,
      this._userLogHandler = null
  }
  get logLevel() {
    return this._logLevel
  }
  set logLevel(e) {
    if (!(e in oe))
      throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
    this._logLevel = e
  }
  setLogLevel(e) {
    this._logLevel = typeof e == "string" ? Dp[e] : e
  }
  get logHandler() {
    return this._logHandler
  }
  set logHandler(e) {
    if (typeof e != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = e
  }
  get userLogHandler() {
    return this._userLogHandler
  }
  set userLogHandler(e) {
    this._userLogHandler = e
  }
  debug(...e) {
    this._userLogHandler && this._userLogHandler(this, oe.DEBUG, ...e),
      this._logHandler(this, oe.DEBUG, ...e)
  }
  log(...e) {
    this._userLogHandler && this._userLogHandler(this, oe.VERBOSE, ...e),
      this._logHandler(this, oe.VERBOSE, ...e)
  }
  info(...e) {
    this._userLogHandler && this._userLogHandler(this, oe.INFO, ...e),
      this._logHandler(this, oe.INFO, ...e)
  }
  warn(...e) {
    this._userLogHandler && this._userLogHandler(this, oe.WARN, ...e),
      this._logHandler(this, oe.WARN, ...e)
  }
  error(...e) {
    this._userLogHandler && this._userLogHandler(this, oe.ERROR, ...e),
      this._logHandler(this, oe.ERROR, ...e)
  }
}
const Lp = (t, e) => e.some(n => t instanceof n);
let Il, Tl;
function Bp() {
  return Il || (Il = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
}
function Up() {
  return Tl || (Tl = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])
}
const Rc = new WeakMap
  , cr = new WeakMap
  , Ac = new WeakMap
  , Mi = new WeakMap
  , Yr = new WeakMap;
function Wp(t) {
  const e = new Promise((n, s) => {
    const i = () => {
      t.removeEventListener("success", r),
        t.removeEventListener("error", o)
    }
      , r = () => {
        n(Nt(t.result)),
          i()
      }
      , o = () => {
        s(t.error),
          i()
      }
      ;
    t.addEventListener("success", r),
      t.addEventListener("error", o)
  }
  );
  return e.then(n => {
    n instanceof IDBCursor && Rc.set(n, t)
  }
  ).catch(() => { }
  ),
    Yr.set(e, t),
    e
}
function Hp(t) {
  if (cr.has(t))
    return;
  const e = new Promise((n, s) => {
    const i = () => {
      t.removeEventListener("complete", r),
        t.removeEventListener("error", o),
        t.removeEventListener("abort", o)
    }
      , r = () => {
        n(),
          i()
      }
      , o = () => {
        s(t.error || new DOMException("AbortError", "AbortError")),
          i()
      }
      ;
    t.addEventListener("complete", r),
      t.addEventListener("error", o),
      t.addEventListener("abort", o)
  }
  );
  cr.set(t, e)
}
let ur = {
  get(t, e, n) {
    if (t instanceof IDBTransaction) {
      if (e === "done")
        return cr.get(t);
      if (e === "objectStoreNames")
        return t.objectStoreNames || Ac.get(t);
      if (e === "store")
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0])
    }
    return Nt(t[e])
  },
  set(t, e, n) {
    return t[e] = n,
      !0
  },
  has(t, e) {
    return t instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in t
  }
};
function $p(t) {
  ur = t(ur)
}
function jp(t) {
  return t === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function (e, ...n) {
    const s = t.call(Fi(this), e, ...n);
    return Ac.set(s, e.sort ? e.sort() : [e]),
      Nt(s)
  }
    : Up().includes(t) ? function (...e) {
      return t.apply(Fi(this), e),
        Nt(Rc.get(this))
    }
      : function (...e) {
        return Nt(t.apply(Fi(this), e))
      }
}
function Vp(t) {
  return typeof t == "function" ? jp(t) : (t instanceof IDBTransaction && Hp(t),
    Lp(t, Bp()) ? new Proxy(t, ur) : t)
}
function Nt(t) {
  if (t instanceof IDBRequest)
    return Wp(t);
  if (Mi.has(t))
    return Mi.get(t);
  const e = Vp(t);
  return e !== t && (Mi.set(t, e),
    Yr.set(e, t)),
    e
}
const Fi = t => Yr.get(t);
function zp(t, e, { blocked: n, upgrade: s, blocking: i, terminated: r } = {}) {
  const o = indexedDB.open(t, e)
    , l = Nt(o);
  return s && o.addEventListener("upgradeneeded", a => {
    s(Nt(o.result), a.oldVersion, a.newVersion, Nt(o.transaction))
  }
  ),
    n && o.addEventListener("blocked", () => n()),
    l.then(a => {
      r && a.addEventListener("close", () => r()),
        i && a.addEventListener("versionchange", () => i())
    }
    ).catch(() => { }
    ),
    l
}
const qp = ["get", "getKey", "getAll", "getAllKeys", "count"]
  , Kp = ["put", "add", "delete", "clear"]
  , Li = new Map;
function Sl(t, e) {
  if (!(t instanceof IDBDatabase && !(e in t) && typeof e == "string"))
    return;
  if (Li.get(e))
    return Li.get(e);
  const n = e.replace(/FromIndex$/, "")
    , s = e !== n
    , i = Kp.includes(n);
  if (!(n in (s ? IDBIndex : IDBObjectStore).prototype) || !(i || qp.includes(n)))
    return;
  const r = async function (o, ...l) {
    const a = this.transaction(o, i ? "readwrite" : "readonly");
    let c = a.store;
    return s && (c = c.index(l.shift())),
      (await Promise.all([c[n](...l), i && a.done]))[0]
  };
  return Li.set(e, r),
    r
}
$p(t => ({
  ...t,
  get: (e, n, s) => Sl(e, n) || t.get(e, n, s),
  has: (e, n) => !!Sl(e, n) || t.has(e, n)
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Gp {
  constructor(e) {
    this.container = e
  }
  getPlatformInfoString() {
    return this.container.getProviders().map(n => {
      if (Yp(n)) {
        const s = n.getImmediate();
        return `${s.library}/${s.version}`
      } else
        return null
    }
    ).filter(n => n).join(" ")
  }
}
function Yp(t) {
  const e = t.getComponent();
  return (e == null ? void 0 : e.type) === "VERSION"
}
const hr = "@firebase/app"
  , xl = "0.9.0";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Zt = new Nc("@firebase/app")
  , Qp = "@firebase/app-compat"
  , Jp = "@firebase/analytics-compat"
  , Xp = "@firebase/analytics"
  , Zp = "@firebase/app-check-compat"
  , e_ = "@firebase/app-check"
  , t_ = "@firebase/auth"
  , n_ = "@firebase/auth-compat"
  , s_ = "@firebase/database"
  , i_ = "@firebase/database-compat"
  , r_ = "@firebase/functions"
  , o_ = "@firebase/functions-compat"
  , l_ = "@firebase/installations"
  , a_ = "@firebase/installations-compat"
  , c_ = "@firebase/messaging"
  , u_ = "@firebase/messaging-compat"
  , h_ = "@firebase/performance"
  , f_ = "@firebase/performance-compat"
  , d_ = "@firebase/remote-config"
  , p_ = "@firebase/remote-config-compat"
  , __ = "@firebase/storage"
  , g_ = "@firebase/storage-compat"
  , m_ = "@firebase/firestore"
  , y_ = "@firebase/firestore-compat"
  , v_ = "firebase"
  , C_ = "9.15.0";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fr = "[DEFAULT]"
  , E_ = {
    [hr]: "fire-core",
    [Qp]: "fire-core-compat",
    [Xp]: "fire-analytics",
    [Jp]: "fire-analytics-compat",
    [e_]: "fire-app-check",
    [Zp]: "fire-app-check-compat",
    [t_]: "fire-auth",
    [n_]: "fire-auth-compat",
    [s_]: "fire-rtdb",
    [i_]: "fire-rtdb-compat",
    [r_]: "fire-fn",
    [o_]: "fire-fn-compat",
    [l_]: "fire-iid",
    [a_]: "fire-iid-compat",
    [c_]: "fire-fcm",
    [u_]: "fire-fcm-compat",
    [h_]: "fire-perf",
    [f_]: "fire-perf-compat",
    [d_]: "fire-rc",
    [p_]: "fire-rc-compat",
    [__]: "fire-gcs",
    [g_]: "fire-gcs-compat",
    [m_]: "fire-fst",
    [y_]: "fire-fst-compat",
    "fire-js": "fire-js",
    [v_]: "fire-js-all"
  };
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Vs = new Map
  , dr = new Map;
function b_(t, e) {
  try {
    t.container.addComponent(e)
  } catch (n) {
    Zt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`, n)
  }
}
function zs(t) {
  const e = t.name;
  if (dr.has(e))
    return Zt.debug(`There were multiple attempts to register component ${e}.`),
      !1;
  dr.set(e, t);
  for (const n of Vs.values())
    b_(n, t);
  return !0
}
function w_(t, e) {
  const n = t.container.getProvider("heartbeat").getImmediate({
    optional: !0
  });
  return n && n.triggerHeartbeat(),
    t.container.getProvider(e)
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const I_ = {
  ["no-app"]: "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
  ["bad-app-name"]: "Illegal App name: '{$appName}",
  ["duplicate-app"]: "Firebase App named '{$appName}' already exists with different options or config",
  ["app-deleted"]: "Firebase App named '{$appName}' already deleted",
  ["no-options"]: "Need to provide options, when not being deployed to hosting via source.",
  ["invalid-app-argument"]: "firebase.{$appName}() takes either no argument or a Firebase App instance.",
  ["invalid-log-argument"]: "First argument to `onLog` must be null or a function.",
  ["idb-open"]: "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
  ["idb-get"]: "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
  ["idb-set"]: "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
  ["idb-delete"]: "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."
}
  , Rt = new Sc("app", "Firebase", I_);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class T_ {
  constructor(e, n, s) {
    this._isDeleted = !1,
      this._options = Object.assign({}, e),
      this._config = Object.assign({}, n),
      this._name = n.name,
      this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled,
      this._container = s,
      this.container.addComponent(new is("app", () => this, "PUBLIC"))
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(),
      this._automaticDataCollectionEnabled
  }
  set automaticDataCollectionEnabled(e) {
    this.checkDestroyed(),
      this._automaticDataCollectionEnabled = e
  }
  get name() {
    return this.checkDestroyed(),
      this._name
  }
  get options() {
    return this.checkDestroyed(),
      this._options
  }
  get config() {
    return this.checkDestroyed(),
      this._config
  }
  get container() {
    return this._container
  }
  get isDeleted() {
    return this._isDeleted
  }
  set isDeleted(e) {
    this._isDeleted = e
  }
  checkDestroyed() {
    if (this.isDeleted)
      throw Rt.create("app-deleted", {
        appName: this._name
      })
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const S_ = C_;
function Oc(t, e = {}) {
  let n = t;
  typeof e != "object" && (e = {
    name: e
  });
  const s = Object.assign({
    name: fr,
    automaticDataCollectionEnabled: !1
  }, e)
    , i = s.name;
  if (typeof i != "string" || !i)
    throw Rt.create("bad-app-name", {
      appName: String(i)
    });
  if (n || (n = vp()),
    !n)
    throw Rt.create("no-options");
  const r = Vs.get(i);
  if (r) {
    if (ar(n, r.options) && ar(s, r.config))
      return r;
    throw Rt.create("duplicate-app", {
      appName: i
    })
  }
  const o = new Pp(i);
  for (const a of dr.values())
    o.addComponent(a);
  const l = new T_(n, s, o);
  return Vs.set(i, l),
    l
}
function x_(t = fr) {
  const e = Vs.get(t);
  if (!e && t === fr)
    return Oc();
  if (!e)
    throw Rt.create("no-app", {
      appName: t
    });
  return e
}
function yn(t, e, n) {
  var s;
  let i = (s = E_[t]) !== null && s !== void 0 ? s : t;
  n && (i += `-${n}`);
  const r = i.match(/\s|\//)
    , o = e.match(/\s|\//);
  if (r || o) {
    const l = [`Unable to register library "${i}" with version "${e}":`];
    r && l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),
      r && o && l.push("and"),
      o && l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),
      Zt.warn(l.join(" "));
    return
  }
  zs(new is(`${i}-version`, () => ({
    library: i,
    version: e
  }), "VERSION"))
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const N_ = "firebase-heartbeat-database"
  , R_ = 1
  , rs = "firebase-heartbeat-store";
let Bi = null;
function Pc() {
  return Bi || (Bi = zp(N_, R_, {
    upgrade: (t, e) => {
      switch (e) {
        case 0:
          t.createObjectStore(rs)
      }
    }
  }).catch(t => {
    throw Rt.create("idb-open", {
      originalErrorMessage: t.message
    })
  }
  )),
    Bi
}
async function A_(t) {
  try {
    return (await Pc()).transaction(rs).objectStore(rs).get(Dc(t))
  } catch (e) {
    if (e instanceof ps)
      Zt.warn(e.message);
    else {
      const n = Rt.create("idb-get", {
        originalErrorMessage: e == null ? void 0 : e.message
      });
      Zt.warn(n.message)
    }
  }
}
async function Nl(t, e) {
  try {
    const s = (await Pc()).transaction(rs, "readwrite");
    return await s.objectStore(rs).put(e, Dc(t)),
      s.done
  } catch (n) {
    if (n instanceof ps)
      Zt.warn(n.message);
    else {
      const s = Rt.create("idb-set", {
        originalErrorMessage: n == null ? void 0 : n.message
      });
      Zt.warn(s.message)
    }
  }
}
function Dc(t) {
  return `${t.name}!${t.options.appId}`
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const O_ = 1024
  , P_ = 30 * 24 * 60 * 60 * 1e3;
class D_ {
  constructor(e) {
    this.container = e,
      this._heartbeatsCache = null;
    const n = this.container.getProvider("app").getImmediate();
    this._storage = new M_(n),
      this._heartbeatsCachePromise = this._storage.read().then(s => (this._heartbeatsCache = s,
        s))
  }
  async triggerHeartbeat() {
    const n = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString()
      , s = Rl();
    if (this._heartbeatsCache === null && (this._heartbeatsCache = await this._heartbeatsCachePromise),
      !(this._heartbeatsCache.lastSentHeartbeatDate === s || this._heartbeatsCache.heartbeats.some(i => i.date === s)))
      return this._heartbeatsCache.heartbeats.push({
        date: s,
        agent: n
      }),
        this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter(i => {
          const r = new Date(i.date).valueOf();
          return Date.now() - r <= P_
        }
        ),
        this._storage.overwrite(this._heartbeatsCache)
  }
  async getHeartbeatsHeader() {
    if (this._heartbeatsCache === null && await this._heartbeatsCachePromise,
      this._heartbeatsCache === null || this._heartbeatsCache.heartbeats.length === 0)
      return "";
    const e = Rl()
      , { heartbeatsToSend: n, unsentEntries: s } = k_(this._heartbeatsCache.heartbeats)
      , i = $s(JSON.stringify({
        version: 2,
        heartbeats: n
      }));
    return this._heartbeatsCache.lastSentHeartbeatDate = e,
      s.length > 0 ? (this._heartbeatsCache.heartbeats = s,
        await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [],
          this._storage.overwrite(this._heartbeatsCache)),
      i
  }
}
function Rl() {
  return new Date().toISOString().substring(0, 10)
}
function k_(t, e = O_) {
  const n = [];
  let s = t.slice();
  for (const i of t) {
    const r = n.find(o => o.agent === i.agent);
    if (r) {
      if (r.dates.push(i.date),
        Al(n) > e) {
        r.dates.pop();
        break
      }
    } else if (n.push({
      agent: i.agent,
      dates: [i.date]
    }),
      Al(n) > e) {
      n.pop();
      break
    }
    s = s.slice(1)
  }
  return {
    heartbeatsToSend: n,
    unsentEntries: s
  }
}
class M_ {
  constructor(e) {
    this.app = e,
      this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()
  }
  async runIndexedDBEnvironmentCheck() {
    return hp() ? fp().then(() => !0).catch(() => !1) : !1
  }
  async read() {
    return await this._canUseIndexedDBPromise ? await A_(this.app) || {
      heartbeats: []
    } : {
      heartbeats: []
    }
  }
  async overwrite(e) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const i = await this.read();
      return Nl(this.app, {
        lastSentHeartbeatDate: (n = e.lastSentHeartbeatDate) !== null && n !== void 0 ? n : i.lastSentHeartbeatDate,
        heartbeats: e.heartbeats
      })
    } else
      return
  }
  async add(e) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const i = await this.read();
      return Nl(this.app, {
        lastSentHeartbeatDate: (n = e.lastSentHeartbeatDate) !== null && n !== void 0 ? n : i.lastSentHeartbeatDate,
        heartbeats: [...i.heartbeats, ...e.heartbeats]
      })
    } else
      return
  }
}
function Al(t) {
  return $s(JSON.stringify({
    version: 2,
    heartbeats: t
  })).length
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function F_(t) {
  zs(new is("platform-logger", e => new Gp(e), "PRIVATE")),
    zs(new is("heartbeat", e => new D_(e), "PRIVATE")),
    yn(hr, xl, t),
    yn(hr, xl, "esm2017"),
    yn("fire-js", "")
}
F_("");
const Ol = "@firebase/database"
  , Pl = "0.14.0";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let kc = "";
function L_(t) {
  kc = t
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class B_ {
  constructor(e) {
    this.domStorage_ = e,
      this.prefix_ = "firebase:"
  }
  set(e, n) {
    n == null ? this.domStorage_.removeItem(this.prefixedName_(e)) : this.domStorage_.setItem(this.prefixedName_(e), Ie(n))
  }
  get(e) {
    const n = this.domStorage_.getItem(this.prefixedName_(e));
    return n == null ? null : ss(n)
  }
  remove(e) {
    this.domStorage_.removeItem(this.prefixedName_(e))
  }
  prefixedName_(e) {
    return this.prefix_ + e
  }
  toString() {
    return this.domStorage_.toString()
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class U_ {
  constructor() {
    this.cache_ = {},
      this.isInMemoryStorage = !0
  }
  set(e, n) {
    n == null ? delete this.cache_[e] : this.cache_[e] = n
  }
  get(e) {
    return bt(this.cache_, e) ? this.cache_[e] : null
  }
  remove(e) {
    delete this.cache_[e]
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Mc = function (t) {
  try {
    if (typeof window < "u" && typeof window[t] < "u") {
      const e = window[t];
      return e.setItem("firebase:sentinel", "cache"),
        e.removeItem("firebase:sentinel"),
        new B_(e)
    }
  } catch { }
  return new U_
}
  , qt = Mc("localStorage")
  , pr = Mc("sessionStorage");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const vn = new Nc("@firebase/database")
  , W_ = function () {
    let t = 1;
    return function () {
      return t++
    }
  }()
  , Fc = function (t) {
    const e = Np(t)
      , n = new xp;
    n.update(e);
    const s = n.digest();
    return Kr.encodeByteArray(s)
  }
  , _s = function (...t) {
    let e = "";
    for (let n = 0; n < t.length; n++) {
      const s = t[n];
      Array.isArray(s) || s && typeof s == "object" && typeof s.length == "number" ? e += _s.apply(null, s) : typeof s == "object" ? e += Ie(s) : e += s,
        e += " "
    }
    return e
  };
let Xt = null
  , Dl = !0;
const H_ = function (t, e) {
  b(!e || t === !0 || t === !1, "Can't turn on custom loggers persistently."),
    t === !0 ? (vn.logLevel = oe.VERBOSE,
      Xt = vn.log.bind(vn),
      e && pr.set("logging_enabled", !0)) : typeof t == "function" ? Xt = t : (Xt = null,
        pr.remove("logging_enabled"))
}
  , Ae = function (...t) {
    if (Dl === !0 && (Dl = !1,
      Xt === null && pr.get("logging_enabled") === !0 && H_(!0)),
      Xt) {
      const e = _s.apply(null, t);
      Xt(e)
    }
  }
  , gs = function (t) {
    return function (...e) {
      Ae(t, ...e)
    }
  }
  , _r = function (...t) {
    const e = "FIREBASE INTERNAL ERROR: " + _s(...t);
    vn.error(e)
  }
  , vt = function (...t) {
    const e = `FIREBASE FATAL ERROR: ${_s(...t)}`;
    throw vn.error(e),
    new Error(e)
  }
  , He = function (...t) {
    const e = "FIREBASE WARNING: " + _s(...t);
    vn.warn(e)
  }
  , $_ = function () {
    typeof window < "u" && window.location && window.location.protocol && window.location.protocol.indexOf("https:") !== -1 && He("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")
  }
  , Lc = function (t) {
    return typeof t == "number" && (t !== t || t === Number.POSITIVE_INFINITY || t === Number.NEGATIVE_INFINITY)
  }
  , j_ = function (t) {
    if (document.readyState === "complete")
      t();
    else {
      let e = !1;
      const n = function () {
        if (!document.body) {
          setTimeout(n, Math.floor(10));
          return
        }
        e || (e = !0,
          t())
      };
      document.addEventListener ? (document.addEventListener("DOMContentLoaded", n, !1),
        window.addEventListener("load", n, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", () => {
          document.readyState === "complete" && n()
        }
        ),
          window.attachEvent("onload", n))
    }
  }
  , xn = "[MIN_NAME]"
  , en = "[MAX_NAME]"
  , Mn = function (t, e) {
    if (t === e)
      return 0;
    if (t === xn || e === en)
      return -1;
    if (e === xn || t === en)
      return 1;
    {
      const n = kl(t)
        , s = kl(e);
      return n !== null ? s !== null ? n - s === 0 ? t.length - e.length : n - s : -1 : s !== null ? 1 : t < e ? -1 : 1
    }
  }
  , V_ = function (t, e) {
    return t === e ? 0 : t < e ? -1 : 1
  }
  , Wn = function (t, e) {
    if (e && t in e)
      return e[t];
    throw new Error("Missing required key (" + t + ") in object: " + Ie(e))
  }
  , Qr = function (t) {
    if (typeof t != "object" || t === null)
      return Ie(t);
    const e = [];
    for (const s in t)
      e.push(s);
    e.sort();
    let n = "{";
    for (let s = 0; s < e.length; s++)
      s !== 0 && (n += ","),
        n += Ie(e[s]),
        n += ":",
        n += Qr(t[e[s]]);
    return n += "}",
      n
  }
  , Bc = function (t, e) {
    const n = t.length;
    if (n <= e)
      return [t];
    const s = [];
    for (let i = 0; i < n; i += e)
      i + e > n ? s.push(t.substring(i, n)) : s.push(t.substring(i, i + e));
    return s
  };
function $e(t, e) {
  for (const n in t)
    t.hasOwnProperty(n) && e(n, t[n])
}
const Uc = function (t) {
  b(!Lc(t), "Invalid JSON number");
  const e = 11
    , n = 52
    , s = (1 << e - 1) - 1;
  let i, r, o, l, a;
  t === 0 ? (r = 0,
    o = 0,
    i = 1 / t === -1 / 0 ? 1 : 0) : (i = t < 0,
      t = Math.abs(t),
      t >= Math.pow(2, 1 - s) ? (l = Math.min(Math.floor(Math.log(t) / Math.LN2), s),
        r = l + s,
        o = Math.round(t * Math.pow(2, n - l) - Math.pow(2, n))) : (r = 0,
          o = Math.round(t / Math.pow(2, 1 - s - n))));
  const c = [];
  for (a = n; a; a -= 1)
    c.push(o % 2 ? 1 : 0),
      o = Math.floor(o / 2);
  for (a = e; a; a -= 1)
    c.push(r % 2 ? 1 : 0),
      r = Math.floor(r / 2);
  c.push(i ? 1 : 0),
    c.reverse();
  const u = c.join("");
  let h = "";
  for (a = 0; a < 64; a += 8) {
    let d = parseInt(u.substr(a, 8), 2).toString(16);
    d.length === 1 && (d = "0" + d),
      h = h + d
  }
  return h.toLowerCase()
}
  , z_ = function () {
    return !!(typeof window == "object" && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href))
  }
  , q_ = function () {
    return typeof Windows == "object" && typeof Windows.UI == "object"
  };
function K_(t, e) {
  let n = "Unknown Error";
  t === "too_big" ? n = "The data requested exceeds the maximum size that can be accessed with a single request." : t === "permission_denied" ? n = "Client doesn't have permission to access the desired data." : t === "unavailable" && (n = "The service is unavailable");
  const s = new Error(t + " at " + e._path.toString() + ": " + n);
  return s.code = t.toUpperCase(),
    s
}
const G_ = new RegExp("^-?(0*)\\d{1,10}$")
  , Y_ = -2147483648
  , Q_ = 2147483647
  , kl = function (t) {
    if (G_.test(t)) {
      const e = Number(t);
      if (e >= Y_ && e <= Q_)
        return e
    }
    return null
  }
  , Fn = function (t) {
    try {
      t()
    } catch (e) {
      setTimeout(() => {
        const n = e.stack || "";
        throw He("Exception was thrown by user callback.", n),
        e
      }
        , Math.floor(0))
    }
  }
  , J_ = function () {
    return (typeof window == "object" && window.navigator && window.navigator.userAgent || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0
  }
  , Kn = function (t, e) {
    const n = setTimeout(t, e);
    return typeof n == "number" && typeof Deno < "u" && Deno.unrefTimer ? Deno.unrefTimer(n) : typeof n == "object" && n.unref && n.unref(),
      n
  };
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class X_ {
  constructor(e, n) {
    this.appName_ = e,
      this.appCheckProvider = n,
      this.appCheck = n == null ? void 0 : n.getImmediate({
        optional: !0
      }),
      this.appCheck || n == null || n.get().then(s => this.appCheck = s)
  }
  getToken(e) {
    return this.appCheck ? this.appCheck.getToken(e) : new Promise((n, s) => {
      setTimeout(() => {
        this.appCheck ? this.getToken(e).then(n, s) : n(null)
      }
        , 0)
    }
    )
  }
  addTokenChangeListener(e) {
    var n;
    (n = this.appCheckProvider) === null || n === void 0 || n.get().then(s => s.addTokenListener(e))
  }
  notifyForInvalidToken() {
    He(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Z_ {
  constructor(e, n, s) {
    this.appName_ = e,
      this.firebaseOptions_ = n,
      this.authProvider_ = s,
      this.auth_ = null,
      this.auth_ = s.getImmediate({
        optional: !0
      }),
      this.auth_ || s.onInit(i => this.auth_ = i)
  }
  getToken(e) {
    return this.auth_ ? this.auth_.getToken(e).catch(n => n && n.code === "auth/token-not-initialized" ? (Ae("Got auth/token-not-initialized error.  Treating as null token."),
      null) : Promise.reject(n)) : new Promise((n, s) => {
        setTimeout(() => {
          this.auth_ ? this.getToken(e).then(n, s) : n(null)
        }
          , 0)
      }
      )
  }
  addTokenChangeListener(e) {
    this.auth_ ? this.auth_.addAuthTokenListener(e) : this.authProvider_.get().then(n => n.addAuthTokenListener(e))
  }
  removeTokenChangeListener(e) {
    this.authProvider_.get().then(n => n.removeAuthTokenListener(e))
  }
  notifyForInvalidToken() {
    let e = 'Provided authentication credentials for the app named "' + this.appName_ + '" are invalid. This usually indicates your app was not initialized correctly. ';
    "credential" in this.firebaseOptions_ ? e += 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : "serviceAccount" in this.firebaseOptions_ ? e += 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : e += 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',
      He(e)
  }
}
class Cn {
  constructor(e) {
    this.accessToken = e
  }
  getToken(e) {
    return Promise.resolve({
      accessToken: this.accessToken
    })
  }
  addTokenChangeListener(e) {
    e(this.accessToken)
  }
  removeTokenChangeListener(e) { }
  notifyForInvalidToken() { }
}
Cn.OWNER = "owner";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Jr = "5"
  , Wc = "v"
  , Hc = "s"
  , $c = "r"
  , jc = "f"
  , Vc = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/
  , zc = "ls"
  , qc = "p"
  , gr = "ac"
  , Kc = "websocket"
  , Gc = "long_polling";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Yc {
  constructor(e, n, s, i, r = !1, o = "", l = !1) {
    this.secure = n,
      this.namespace = s,
      this.webSocketOnly = i,
      this.nodeAdmin = r,
      this.persistenceKey = o,
      this.includeNamespaceInQueryParams = l,
      this._host = e.toLowerCase(),
      this._domain = this._host.substr(this._host.indexOf(".") + 1),
      this.internalHost = qt.get("host:" + e) || this._host
  }
  isCacheableHost() {
    return this.internalHost.substr(0, 2) === "s-"
  }
  isCustomHost() {
    return this._domain !== "firebaseio.com" && this._domain !== "firebaseio-demo.com"
  }
  get host() {
    return this._host
  }
  set host(e) {
    e !== this.internalHost && (this.internalHost = e,
      this.isCacheableHost() && qt.set("host:" + this._host, this.internalHost))
  }
  toString() {
    let e = this.toURLString();
    return this.persistenceKey && (e += "<" + this.persistenceKey + ">"),
      e
  }
  toURLString() {
    const e = this.secure ? "https://" : "http://"
      , n = this.includeNamespaceInQueryParams ? `?ns=${this.namespace}` : "";
    return `${e}${this.host}/${n}`
  }
}
function eg(t) {
  return t.host !== t.internalHost || t.isCustomHost() || t.includeNamespaceInQueryParams
}
function Qc(t, e, n) {
  b(typeof e == "string", "typeof type must == string"),
    b(typeof n == "object", "typeof params must == object");
  let s;
  if (e === Kc)
    s = (t.secure ? "wss://" : "ws://") + t.internalHost + "/.ws?";
  else if (e === Gc)
    s = (t.secure ? "https://" : "http://") + t.internalHost + "/.lp?";
  else
    throw new Error("Unknown connection type: " + e);
  eg(t) && (n.ns = t.namespace);
  const i = [];
  return $e(n, (r, o) => {
    i.push(r + "=" + o)
  }
  ),
    s + i.join("&")
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tg {
  constructor() {
    this.counters_ = {}
  }
  incrementCounter(e, n = 1) {
    bt(this.counters_, e) || (this.counters_[e] = 0),
      this.counters_[e] += n
  }
  get() {
    return lp(this.counters_)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ui = {}
  , Wi = {};
function Xr(t) {
  const e = t.toString();
  return Ui[e] || (Ui[e] = new tg),
    Ui[e]
}
function ng(t, e) {
  const n = t.toString();
  return Wi[n] || (Wi[n] = e()),
    Wi[n]
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class sg {
  constructor(e) {
    this.onMessage_ = e,
      this.pendingResponses = [],
      this.currentResponseNum = 0,
      this.closeAfterResponse = -1,
      this.onClose = null
  }
  closeAfter(e, n) {
    this.closeAfterResponse = e,
      this.onClose = n,
      this.closeAfterResponse < this.currentResponseNum && (this.onClose(),
        this.onClose = null)
  }
  handleResponse(e, n) {
    for (this.pendingResponses[e] = n; this.pendingResponses[this.currentResponseNum];) {
      const s = this.pendingResponses[this.currentResponseNum];
      delete this.pendingResponses[this.currentResponseNum];
      for (let i = 0; i < s.length; ++i)
        s[i] && Fn(() => {
          this.onMessage_(s[i])
        }
        );
      if (this.currentResponseNum === this.closeAfterResponse) {
        this.onClose && (this.onClose(),
          this.onClose = null);
        break
      }
      this.currentResponseNum++
    }
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ml = "start"
  , ig = "close"
  , rg = "pLPCommand"
  , og = "pRTLPCB"
  , Jc = "id"
  , Xc = "pw"
  , Zc = "ser"
  , lg = "cb"
  , ag = "seg"
  , cg = "ts"
  , ug = "d"
  , hg = "dframe"
  , eu = 1870
  , tu = 30
  , fg = eu - tu
  , dg = 25e3
  , pg = 3e4;
class hn {
  constructor(e, n, s, i, r, o, l) {
    this.connId = e,
      this.repoInfo = n,
      this.applicationId = s,
      this.appCheckToken = i,
      this.authToken = r,
      this.transportSessionId = o,
      this.lastSessionId = l,
      this.bytesSent = 0,
      this.bytesReceived = 0,
      this.everConnected_ = !1,
      this.log_ = gs(e),
      this.stats_ = Xr(n),
      this.urlFn = a => (this.appCheckToken && (a[gr] = this.appCheckToken),
        Qc(n, Gc, a))
  }
  open(e, n) {
    this.curSegmentNum = 0,
      this.onDisconnect_ = n,
      this.myPacketOrderer = new sg(e),
      this.isClosed_ = !1,
      this.connectTimeoutTimer_ = setTimeout(() => {
        this.log_("Timed out trying to connect."),
          this.onClosed_(),
          this.connectTimeoutTimer_ = null
      }
        , Math.floor(pg)),
      j_(() => {
        if (this.isClosed_)
          return;
        this.scriptTagHolder = new Zr((...r) => {
          const [o, l, a, c, u] = r;
          if (this.incrementIncomingBytes_(r),
            !!this.scriptTagHolder)
            if (this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_),
              this.connectTimeoutTimer_ = null),
              this.everConnected_ = !0,
              o === Ml)
              this.id = l,
                this.password = a;
            else if (o === ig)
              l ? (this.scriptTagHolder.sendNewPolls = !1,
                this.myPacketOrderer.closeAfter(l, () => {
                  this.onClosed_()
                }
                )) : this.onClosed_();
            else
              throw new Error("Unrecognized command received: " + o)
        }
          , (...r) => {
            const [o, l] = r;
            this.incrementIncomingBytes_(r),
              this.myPacketOrderer.handleResponse(o, l)
          }
          , () => {
            this.onClosed_()
          }
          , this.urlFn);
        const s = {};
        s[Ml] = "t",
          s[Zc] = Math.floor(Math.random() * 1e8),
          this.scriptTagHolder.uniqueCallbackIdentifier && (s[lg] = this.scriptTagHolder.uniqueCallbackIdentifier),
          s[Wc] = Jr,
          this.transportSessionId && (s[Hc] = this.transportSessionId),
          this.lastSessionId && (s[zc] = this.lastSessionId),
          this.applicationId && (s[qc] = this.applicationId),
          this.appCheckToken && (s[gr] = this.appCheckToken),
          typeof location < "u" && location.hostname && Vc.test(location.hostname) && (s[$c] = jc);
        const i = this.urlFn(s);
        this.log_("Connecting via long-poll to " + i),
          this.scriptTagHolder.addTag(i, () => { }
          )
      }
      )
  }
  start() {
    this.scriptTagHolder.startLongPoll(this.id, this.password),
      this.addDisconnectPingFrame(this.id, this.password)
  }
  static forceAllow() {
    hn.forceAllow_ = !0
  }
  static forceDisallow() {
    hn.forceDisallow_ = !0
  }
  static isAvailable() {
    return hn.forceAllow_ ? !0 : !hn.forceDisallow_ && typeof document < "u" && document.createElement != null && !z_() && !q_()
  }
  markConnectionHealthy() { }
  shutdown_() {
    this.isClosed_ = !0,
      this.scriptTagHolder && (this.scriptTagHolder.close(),
        this.scriptTagHolder = null),
      this.myDisconnFrame && (document.body.removeChild(this.myDisconnFrame),
        this.myDisconnFrame = null),
      this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_),
        this.connectTimeoutTimer_ = null)
  }
  onClosed_() {
    this.isClosed_ || (this.log_("Longpoll is closing itself"),
      this.shutdown_(),
      this.onDisconnect_ && (this.onDisconnect_(this.everConnected_),
        this.onDisconnect_ = null))
  }
  close() {
    this.isClosed_ || (this.log_("Longpoll is being closed."),
      this.shutdown_())
  }
  send(e) {
    const n = Ie(e);
    this.bytesSent += n.length,
      this.stats_.incrementCounter("bytes_sent", n.length);
    const s = Ec(n)
      , i = Bc(s, fg);
    for (let r = 0; r < i.length; r++)
      this.scriptTagHolder.enqueueSegment(this.curSegmentNum, i.length, i[r]),
        this.curSegmentNum++
  }
  addDisconnectPingFrame(e, n) {
    this.myDisconnFrame = document.createElement("iframe");
    const s = {};
    s[hg] = "t",
      s[Jc] = e,
      s[Xc] = n,
      this.myDisconnFrame.src = this.urlFn(s),
      this.myDisconnFrame.style.display = "none",
      document.body.appendChild(this.myDisconnFrame)
  }
  incrementIncomingBytes_(e) {
    const n = Ie(e).length;
    this.bytesReceived += n,
      this.stats_.incrementCounter("bytes_received", n)
  }
}
class Zr {
  constructor(e, n, s, i) {
    this.onDisconnect = s,
      this.urlFn = i,
      this.outstandingRequests = new Set,
      this.pendingSegs = [],
      this.currentSerial = Math.floor(Math.random() * 1e8),
      this.sendNewPolls = !0;
    {
      this.uniqueCallbackIdentifier = W_(),
        window[rg + this.uniqueCallbackIdentifier] = e,
        window[og + this.uniqueCallbackIdentifier] = n,
        this.myIFrame = Zr.createIFrame_();
      let r = "";
      this.myIFrame.src && this.myIFrame.src.substr(0, 11) === "javascript:" && (r = '<script>document.domain="' + document.domain + '";<\/script>');
      const o = "<html><body>" + r + "</body></html>";
      try {
        this.myIFrame.doc.open(),
          this.myIFrame.doc.write(o),
          this.myIFrame.doc.close()
      } catch (l) {
        Ae("frame writing exception"),
          l.stack && Ae(l.stack),
          Ae(l)
      }
    }
  }
  static createIFrame_() {
    const e = document.createElement("iframe");
    if (e.style.display = "none",
      document.body) {
      document.body.appendChild(e);
      try {
        e.contentWindow.document || Ae("No IE domain setting required")
      } catch {
        const s = document.domain;
        e.src = "javascript:void((function(){document.open();document.domain='" + s + "';document.close();})())"
      }
    } else
      throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
    return e.contentDocument ? e.doc = e.contentDocument : e.contentWindow ? e.doc = e.contentWindow.document : e.document && (e.doc = e.document),
      e
  }
  close() {
    this.alive = !1,
      this.myIFrame && (this.myIFrame.doc.body.innerHTML = "",
        setTimeout(() => {
          this.myIFrame !== null && (document.body.removeChild(this.myIFrame),
            this.myIFrame = null)
        }
          , Math.floor(0)));
    const e = this.onDisconnect;
    e && (this.onDisconnect = null,
      e())
  }
  startLongPoll(e, n) {
    for (this.myID = e,
      this.myPW = n,
      this.alive = !0; this.newRequest_();)
      ;
  }
  newRequest_() {
    if (this.alive && this.sendNewPolls && this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
      this.currentSerial++;
      const e = {};
      e[Jc] = this.myID,
        e[Xc] = this.myPW,
        e[Zc] = this.currentSerial;
      let n = this.urlFn(e)
        , s = ""
        , i = 0;
      for (; this.pendingSegs.length > 0 && this.pendingSegs[0].d.length + tu + s.length <= eu;) {
        const o = this.pendingSegs.shift();
        s = s + "&" + ag + i + "=" + o.seg + "&" + cg + i + "=" + o.ts + "&" + ug + i + "=" + o.d,
          i++
      }
      return n = n + s,
        this.addLongPollTag_(n, this.currentSerial),
        !0
    } else
      return !1
  }
  enqueueSegment(e, n, s) {
    this.pendingSegs.push({
      seg: e,
      ts: n,
      d: s
    }),
      this.alive && this.newRequest_()
  }
  addLongPollTag_(e, n) {
    this.outstandingRequests.add(n);
    const s = () => {
      this.outstandingRequests.delete(n),
        this.newRequest_()
    }
      , i = setTimeout(s, Math.floor(dg))
      , r = () => {
        clearTimeout(i),
          s()
      }
      ;
    this.addTag(e, r)
  }
  addTag(e, n) {
    setTimeout(() => {
      try {
        if (!this.sendNewPolls)
          return;
        const s = this.myIFrame.doc.createElement("script");
        s.type = "text/javascript",
          s.async = !0,
          s.src = e,
          s.onload = s.onreadystatechange = function () {
            const i = s.readyState;
            (!i || i === "loaded" || i === "complete") && (s.onload = s.onreadystatechange = null,
              s.parentNode && s.parentNode.removeChild(s),
              n())
          }
          ,
          s.onerror = () => {
            Ae("Long-poll script failed to load: " + e),
              this.sendNewPolls = !1,
              this.close()
          }
          ,
          this.myIFrame.doc.body.appendChild(s)
      } catch { }
    }
      , Math.floor(1))
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _g = 16384
  , gg = 45e3;
let qs = null;
typeof MozWebSocket < "u" ? qs = MozWebSocket : typeof WebSocket < "u" && (qs = WebSocket);
class et {
  constructor(e, n, s, i, r, o, l) {
    this.connId = e,
      this.applicationId = s,
      this.appCheckToken = i,
      this.authToken = r,
      this.keepaliveTimer = null,
      this.frames = null,
      this.totalFrames = 0,
      this.bytesSent = 0,
      this.bytesReceived = 0,
      this.log_ = gs(this.connId),
      this.stats_ = Xr(n),
      this.connURL = et.connectionURL_(n, o, l, i, s),
      this.nodeAdmin = n.nodeAdmin
  }
  static connectionURL_(e, n, s, i, r) {
    const o = {};
    return o[Wc] = Jr,
      typeof location < "u" && location.hostname && Vc.test(location.hostname) && (o[$c] = jc),
      n && (o[Hc] = n),
      s && (o[zc] = s),
      i && (o[gr] = i),
      r && (o[qc] = r),
      Qc(e, Kc, o)
  }
  open(e, n) {
    this.onDisconnect = n,
      this.onMessage = e,
      this.log_("Websocket connecting to " + this.connURL),
      this.everConnected_ = !1,
      qt.set("previous_websocket_failure", !0);
    try {
      let s;
      Ic(),
        this.mySock = new qs(this.connURL, [], s)
    } catch (s) {
      this.log_("Error instantiating WebSocket.");
      const i = s.message || s.data;
      i && this.log_(i),
        this.onClosed_();
      return
    }
    this.mySock.onopen = () => {
      this.log_("Websocket connected."),
        this.everConnected_ = !0
    }
      ,
      this.mySock.onclose = () => {
        this.log_("Websocket connection was disconnected."),
          this.mySock = null,
          this.onClosed_()
      }
      ,
      this.mySock.onmessage = s => {
        this.handleIncomingFrame(s)
      }
      ,
      this.mySock.onerror = s => {
        this.log_("WebSocket error.  Closing connection.");
        const i = s.message || s.data;
        i && this.log_(i),
          this.onClosed_()
      }
  }
  start() { }
  static forceDisallow() {
    et.forceDisallow_ = !0
  }
  static isAvailable() {
    let e = !1;
    if (typeof navigator < "u" && navigator.userAgent) {
      const n = /Android ([0-9]{0,}\.[0-9]{0,})/
        , s = navigator.userAgent.match(n);
      s && s.length > 1 && parseFloat(s[1]) < 4.4 && (e = !0)
    }
    return !e && qs !== null && !et.forceDisallow_
  }
  static previouslyFailed() {
    return qt.isInMemoryStorage || qt.get("previous_websocket_failure") === !0
  }
  markConnectionHealthy() {
    qt.remove("previous_websocket_failure")
  }
  appendFrame_(e) {
    if (this.frames.push(e),
      this.frames.length === this.totalFrames) {
      const n = this.frames.join("");
      this.frames = null;
      const s = ss(n);
      this.onMessage(s)
    }
  }
  handleNewFrameCount_(e) {
    this.totalFrames = e,
      this.frames = []
  }
  extractFrameCount_(e) {
    if (b(this.frames === null, "We already have a frame buffer"),
      e.length <= 6) {
      const n = Number(e);
      if (!isNaN(n))
        return this.handleNewFrameCount_(n),
          null
    }
    return this.handleNewFrameCount_(1),
      e
  }
  handleIncomingFrame(e) {
    if (this.mySock === null)
      return;
    const n = e.data;
    if (this.bytesReceived += n.length,
      this.stats_.incrementCounter("bytes_received", n.length),
      this.resetKeepAlive(),
      this.frames !== null)
      this.appendFrame_(n);
    else {
      const s = this.extractFrameCount_(n);
      s !== null && this.appendFrame_(s)
    }
  }
  send(e) {
    this.resetKeepAlive();
    const n = Ie(e);
    this.bytesSent += n.length,
      this.stats_.incrementCounter("bytes_sent", n.length);
    const s = Bc(n, _g);
    s.length > 1 && this.sendString_(String(s.length));
    for (let i = 0; i < s.length; i++)
      this.sendString_(s[i])
  }
  shutdown_() {
    this.isClosed_ = !0,
      this.keepaliveTimer && (clearInterval(this.keepaliveTimer),
        this.keepaliveTimer = null),
      this.mySock && (this.mySock.close(),
        this.mySock = null)
  }
  onClosed_() {
    this.isClosed_ || (this.log_("WebSocket is closing itself"),
      this.shutdown_(),
      this.onDisconnect && (this.onDisconnect(this.everConnected_),
        this.onDisconnect = null))
  }
  close() {
    this.isClosed_ || (this.log_("WebSocket is being closed"),
      this.shutdown_())
  }
  resetKeepAlive() {
    clearInterval(this.keepaliveTimer),
      this.keepaliveTimer = setInterval(() => {
        this.mySock && this.sendString_("0"),
          this.resetKeepAlive()
      }
        , Math.floor(gg))
  }
  sendString_(e) {
    try {
      this.mySock.send(e)
    } catch (n) {
      this.log_("Exception thrown from WebSocket.send():", n.message || n.data, "Closing connection."),
        setTimeout(this.onClosed_.bind(this), 0)
    }
  }
}
et.responsesRequiredToBeHealthy = 2;
et.healthyTimeout = 3e4;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class os {
  constructor(e) {
    this.initTransports_(e)
  }
  static get ALL_TRANSPORTS() {
    return [hn, et]
  }
  static get IS_TRANSPORT_INITIALIZED() {
    return this.globalTransportInitialized_
  }
  initTransports_(e) {
    const n = et && et.isAvailable();
    let s = n && !et.previouslyFailed();
    if (e.webSocketOnly && (n || He("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),
      s = !0),
      s)
      this.transports_ = [et];
    else {
      const i = this.transports_ = [];
      for (const r of os.ALL_TRANSPORTS)
        r && r.isAvailable() && i.push(r);
      os.globalTransportInitialized_ = !0
    }
  }
  initialTransport() {
    if (this.transports_.length > 0)
      return this.transports_[0];
    throw new Error("No transports available")
  }
  upgradeTransport() {
    return this.transports_.length > 1 ? this.transports_[1] : null
  }
}
os.globalTransportInitialized_ = !1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const mg = 6e4
  , yg = 5e3
  , vg = 10 * 1024
  , Cg = 100 * 1024
  , Hi = "t"
  , Fl = "d"
  , Eg = "s"
  , Ll = "r"
  , bg = "e"
  , Bl = "o"
  , Ul = "a"
  , Wl = "n"
  , Hl = "p"
  , wg = "h";
class Ig {
  constructor(e, n, s, i, r, o, l, a, c, u) {
    this.id = e,
      this.repoInfo_ = n,
      this.applicationId_ = s,
      this.appCheckToken_ = i,
      this.authToken_ = r,
      this.onMessage_ = o,
      this.onReady_ = l,
      this.onDisconnect_ = a,
      this.onKill_ = c,
      this.lastSessionId = u,
      this.connectionCount = 0,
      this.pendingDataMessages = [],
      this.state_ = 0,
      this.log_ = gs("c:" + this.id + ":"),
      this.transportManager_ = new os(n),
      this.log_("Connection created"),
      this.start_()
  }
  start_() {
    const e = this.transportManager_.initialTransport();
    this.conn_ = new e(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, null, this.lastSessionId),
      this.primaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0;
    const n = this.connReceiver_(this.conn_)
      , s = this.disconnReceiver_(this.conn_);
    this.tx_ = this.conn_,
      this.rx_ = this.conn_,
      this.secondaryConn_ = null,
      this.isHealthy_ = !1,
      setTimeout(() => {
        this.conn_ && this.conn_.open(n, s)
      }
        , Math.floor(0));
    const i = e.healthyTimeout || 0;
    i > 0 && (this.healthyTimeout_ = Kn(() => {
      this.healthyTimeout_ = null,
        this.isHealthy_ || (this.conn_ && this.conn_.bytesReceived > Cg ? (this.log_("Connection exceeded healthy timeout but has received " + this.conn_.bytesReceived + " bytes.  Marking connection healthy."),
          this.isHealthy_ = !0,
          this.conn_.markConnectionHealthy()) : this.conn_ && this.conn_.bytesSent > vg ? this.log_("Connection exceeded healthy timeout but has sent " + this.conn_.bytesSent + " bytes.  Leaving connection alive.") : (this.log_("Closing unhealthy connection after timeout."),
            this.close()))
    }
      , Math.floor(i)))
  }
  nextTransportId_() {
    return "c:" + this.id + ":" + this.connectionCount++
  }
  disconnReceiver_(e) {
    return n => {
      e === this.conn_ ? this.onConnectionLost_(n) : e === this.secondaryConn_ ? (this.log_("Secondary connection lost."),
        this.onSecondaryConnectionLost_()) : this.log_("closing an old connection")
    }
  }
  connReceiver_(e) {
    return n => {
      this.state_ !== 2 && (e === this.rx_ ? this.onPrimaryMessageReceived_(n) : e === this.secondaryConn_ ? this.onSecondaryMessageReceived_(n) : this.log_("message on old connection"))
    }
  }
  sendRequest(e) {
    const n = {
      t: "d",
      d: e
    };
    this.sendData_(n)
  }
  tryCleanupConnection() {
    this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_ && (this.log_("cleaning up and promoting a connection: " + this.secondaryConn_.connId),
      this.conn_ = this.secondaryConn_,
      this.secondaryConn_ = null)
  }
  onSecondaryControl_(e) {
    if (Hi in e) {
      const n = e[Hi];
      n === Ul ? this.upgradeIfSecondaryHealthy_() : n === Ll ? (this.log_("Got a reset on secondary, closing it"),
        this.secondaryConn_.close(),
        (this.tx_ === this.secondaryConn_ || this.rx_ === this.secondaryConn_) && this.close()) : n === Bl && (this.log_("got pong on secondary."),
          this.secondaryResponsesRequired_--,
          this.upgradeIfSecondaryHealthy_())
    }
  }
  onSecondaryMessageReceived_(e) {
    const n = Wn("t", e)
      , s = Wn("d", e);
    if (n === "c")
      this.onSecondaryControl_(s);
    else if (n === "d")
      this.pendingDataMessages.push(s);
    else
      throw new Error("Unknown protocol layer: " + n)
  }
  upgradeIfSecondaryHealthy_() {
    this.secondaryResponsesRequired_ <= 0 ? (this.log_("Secondary connection is healthy."),
      this.isHealthy_ = !0,
      this.secondaryConn_.markConnectionHealthy(),
      this.proceedWithUpgrade_()) : (this.log_("sending ping on secondary."),
        this.secondaryConn_.send({
          t: "c",
          d: {
            t: Hl,
            d: {}
          }
        }))
  }
  proceedWithUpgrade_() {
    this.secondaryConn_.start(),
      this.log_("sending client ack on secondary"),
      this.secondaryConn_.send({
        t: "c",
        d: {
          t: Ul,
          d: {}
        }
      }),
      this.log_("Ending transmission on primary"),
      this.conn_.send({
        t: "c",
        d: {
          t: Wl,
          d: {}
        }
      }),
      this.tx_ = this.secondaryConn_,
      this.tryCleanupConnection()
  }
  onPrimaryMessageReceived_(e) {
    const n = Wn("t", e)
      , s = Wn("d", e);
    n === "c" ? this.onControl_(s) : n === "d" && this.onDataMessage_(s)
  }
  onDataMessage_(e) {
    this.onPrimaryResponse_(),
      this.onMessage_(e)
  }
  onPrimaryResponse_() {
    this.isHealthy_ || (this.primaryResponsesRequired_--,
      this.primaryResponsesRequired_ <= 0 && (this.log_("Primary connection is healthy."),
        this.isHealthy_ = !0,
        this.conn_.markConnectionHealthy()))
  }
  onControl_(e) {
    const n = Wn(Hi, e);
    if (Fl in e) {
      const s = e[Fl];
      if (n === wg)
        this.onHandshake_(s);
      else if (n === Wl) {
        this.log_("recvd end transmission on primary"),
          this.rx_ = this.secondaryConn_;
        for (let i = 0; i < this.pendingDataMessages.length; ++i)
          this.onDataMessage_(this.pendingDataMessages[i]);
        this.pendingDataMessages = [],
          this.tryCleanupConnection()
      } else
        n === Eg ? this.onConnectionShutdown_(s) : n === Ll ? this.onReset_(s) : n === bg ? _r("Server Error: " + s) : n === Bl ? (this.log_("got pong on primary."),
          this.onPrimaryResponse_(),
          this.sendPingOnPrimaryIfNecessary_()) : _r("Unknown control packet command: " + n)
    }
  }
  onHandshake_(e) {
    const n = e.ts
      , s = e.v
      , i = e.h;
    this.sessionId = e.s,
      this.repoInfo_.host = i,
      this.state_ === 0 && (this.conn_.start(),
        this.onConnectionEstablished_(this.conn_, n),
        Jr !== s && He("Protocol version mismatch detected"),
        this.tryStartUpgrade_())
  }
  tryStartUpgrade_() {
    const e = this.transportManager_.upgradeTransport();
    e && this.startUpgrade_(e)
  }
  startUpgrade_(e) {
    this.secondaryConn_ = new e(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId),
      this.secondaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0;
    const n = this.connReceiver_(this.secondaryConn_)
      , s = this.disconnReceiver_(this.secondaryConn_);
    this.secondaryConn_.open(n, s),
      Kn(() => {
        this.secondaryConn_ && (this.log_("Timed out trying to upgrade."),
          this.secondaryConn_.close())
      }
        , Math.floor(mg))
  }
  onReset_(e) {
    this.log_("Reset packet received.  New host: " + e),
      this.repoInfo_.host = e,
      this.state_ === 1 ? this.close() : (this.closeConnections_(),
        this.start_())
  }
  onConnectionEstablished_(e, n) {
    this.log_("Realtime connection established."),
      this.conn_ = e,
      this.state_ = 1,
      this.onReady_ && (this.onReady_(n, this.sessionId),
        this.onReady_ = null),
      this.primaryResponsesRequired_ === 0 ? (this.log_("Primary connection is healthy."),
        this.isHealthy_ = !0) : Kn(() => {
          this.sendPingOnPrimaryIfNecessary_()
        }
          , Math.floor(yg))
  }
  sendPingOnPrimaryIfNecessary_() {
    !this.isHealthy_ && this.state_ === 1 && (this.log_("sending ping on primary."),
      this.sendData_({
        t: "c",
        d: {
          t: Hl,
          d: {}
        }
      }))
  }
  onSecondaryConnectionLost_() {
    const e = this.secondaryConn_;
    this.secondaryConn_ = null,
      (this.tx_ === e || this.rx_ === e) && this.close()
  }
  onConnectionLost_(e) {
    this.conn_ = null,
      !e && this.state_ === 0 ? (this.log_("Realtime connection failed."),
        this.repoInfo_.isCacheableHost() && (qt.remove("host:" + this.repoInfo_.host),
          this.repoInfo_.internalHost = this.repoInfo_.host)) : this.state_ === 1 && this.log_("Realtime connection lost."),
      this.close()
  }
  onConnectionShutdown_(e) {
    this.log_("Connection shutdown command received. Shutting down..."),
      this.onKill_ && (this.onKill_(e),
        this.onKill_ = null),
      this.onDisconnect_ = null,
      this.close()
  }
  sendData_(e) {
    if (this.state_ !== 1)
      throw "Connection is not connected";
    this.tx_.send(e)
  }
  close() {
    this.state_ !== 2 && (this.log_("Closing realtime connection."),
      this.state_ = 2,
      this.closeConnections_(),
      this.onDisconnect_ && (this.onDisconnect_(),
        this.onDisconnect_ = null))
  }
  closeConnections_() {
    this.log_("Shutting down all connections"),
      this.conn_ && (this.conn_.close(),
        this.conn_ = null),
      this.secondaryConn_ && (this.secondaryConn_.close(),
        this.secondaryConn_ = null),
      this.healthyTimeout_ && (clearTimeout(this.healthyTimeout_),
        this.healthyTimeout_ = null)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class nu {
  put(e, n, s, i) { }
  merge(e, n, s, i) { }
  refreshAuthToken(e) { }
  refreshAppCheckToken(e) { }
  onDisconnectPut(e, n, s) { }
  onDisconnectMerge(e, n, s) { }
  onDisconnectCancel(e, n) { }
  reportStats(e) { }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class su {
  constructor(e) {
    this.allowedEvents_ = e,
      this.listeners_ = {},
      b(Array.isArray(e) && e.length > 0, "Requires a non-empty array")
  }
  trigger(e, ...n) {
    if (Array.isArray(this.listeners_[e])) {
      const s = [...this.listeners_[e]];
      for (let i = 0; i < s.length; i++)
        s[i].callback.apply(s[i].context, n)
    }
  }
  on(e, n, s) {
    this.validateEventType_(e),
      this.listeners_[e] = this.listeners_[e] || [],
      this.listeners_[e].push({
        callback: n,
        context: s
      });
    const i = this.getInitialEvent(e);
    i && n.apply(s, i)
  }
  off(e, n, s) {
    this.validateEventType_(e);
    const i = this.listeners_[e] || [];
    for (let r = 0; r < i.length; r++)
      if (i[r].callback === n && (!s || s === i[r].context)) {
        i.splice(r, 1);
        return
      }
  }
  validateEventType_(e) {
    b(this.allowedEvents_.find(n => n === e), "Unknown event: " + e)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ks extends su {
  constructor() {
    super(["online"]),
      this.online_ = !0,
      typeof window < "u" && typeof window.addEventListener < "u" && !wc() && (window.addEventListener("online", () => {
        this.online_ || (this.online_ = !0,
          this.trigger("online", !0))
      }
        , !1),
        window.addEventListener("offline", () => {
          this.online_ && (this.online_ = !1,
            this.trigger("online", !1))
        }
          , !1))
  }
  static getInstance() {
    return new Ks
  }
  getInitialEvent(e) {
    return b(e === "online", "Unknown event type: " + e),
      [this.online_]
  }
  currentlyOnline() {
    return this.online_
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $l = 32
  , jl = 768;
class ie {
  constructor(e, n) {
    if (n === void 0) {
      this.pieces_ = e.split("/");
      let s = 0;
      for (let i = 0; i < this.pieces_.length; i++)
        this.pieces_[i].length > 0 && (this.pieces_[s] = this.pieces_[i],
          s++);
      this.pieces_.length = s,
        this.pieceNum_ = 0
    } else
      this.pieces_ = e,
        this.pieceNum_ = n
  }
  toString() {
    let e = "";
    for (let n = this.pieceNum_; n < this.pieces_.length; n++)
      this.pieces_[n] !== "" && (e += "/" + this.pieces_[n]);
    return e || "/"
  }
}
function X() {
  return new ie("")
}
function j(t) {
  return t.pieceNum_ >= t.pieces_.length ? null : t.pieces_[t.pieceNum_]
}
function Dt(t) {
  return t.pieces_.length - t.pieceNum_
}
function le(t) {
  let e = t.pieceNum_;
  return e < t.pieces_.length && e++,
    new ie(t.pieces_, e)
}
function iu(t) {
  return t.pieceNum_ < t.pieces_.length ? t.pieces_[t.pieces_.length - 1] : null
}
function Tg(t) {
  let e = "";
  for (let n = t.pieceNum_; n < t.pieces_.length; n++)
    t.pieces_[n] !== "" && (e += "/" + encodeURIComponent(String(t.pieces_[n])));
  return e || "/"
}
function ru(t, e = 0) {
  return t.pieces_.slice(t.pieceNum_ + e)
}
function ou(t) {
  if (t.pieceNum_ >= t.pieces_.length)
    return null;
  const e = [];
  for (let n = t.pieceNum_; n < t.pieces_.length - 1; n++)
    e.push(t.pieces_[n]);
  return new ie(e, 0)
}
function ve(t, e) {
  const n = [];
  for (let s = t.pieceNum_; s < t.pieces_.length; s++)
    n.push(t.pieces_[s]);
  if (e instanceof ie)
    for (let s = e.pieceNum_; s < e.pieces_.length; s++)
      n.push(e.pieces_[s]);
  else {
    const s = e.split("/");
    for (let i = 0; i < s.length; i++)
      s[i].length > 0 && n.push(s[i])
  }
  return new ie(n, 0)
}
function q(t) {
  return t.pieceNum_ >= t.pieces_.length
}
function Ue(t, e) {
  const n = j(t)
    , s = j(e);
  if (n === null)
    return e;
  if (n === s)
    return Ue(le(t), le(e));
  throw new Error("INTERNAL ERROR: innerPath (" + e + ") is not within outerPath (" + t + ")")
}
function eo(t, e) {
  if (Dt(t) !== Dt(e))
    return !1;
  for (let n = t.pieceNum_, s = e.pieceNum_; n <= t.pieces_.length; n++,
    s++)
    if (t.pieces_[n] !== e.pieces_[s])
      return !1;
  return !0
}
function nt(t, e) {
  let n = t.pieceNum_
    , s = e.pieceNum_;
  if (Dt(t) > Dt(e))
    return !1;
  for (; n < t.pieces_.length;) {
    if (t.pieces_[n] !== e.pieces_[s])
      return !1;
    ++n,
      ++s
  }
  return !0
}
class Sg {
  constructor(e, n) {
    this.errorPrefix_ = n,
      this.parts_ = ru(e, 0),
      this.byteLength_ = Math.max(1, this.parts_.length);
    for (let s = 0; s < this.parts_.length; s++)
      this.byteLength_ += yi(this.parts_[s]);
    lu(this)
  }
}
function xg(t, e) {
  t.parts_.length > 0 && (t.byteLength_ += 1),
    t.parts_.push(e),
    t.byteLength_ += yi(e),
    lu(t)
}
function Ng(t) {
  const e = t.parts_.pop();
  t.byteLength_ -= yi(e),
    t.parts_.length > 0 && (t.byteLength_ -= 1)
}
function lu(t) {
  if (t.byteLength_ > jl)
    throw new Error(t.errorPrefix_ + "has a key path longer than " + jl + " bytes (" + t.byteLength_ + ").");
  if (t.parts_.length > $l)
    throw new Error(t.errorPrefix_ + "path specified exceeds the maximum depth that can be written (" + $l + ") or object contains a cycle " + Ht(t))
}
function Ht(t) {
  return t.parts_.length === 0 ? "" : "in property '" + t.parts_.join(".") + "'"
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class to extends su {
  constructor() {
    super(["visible"]);
    let e, n;
    typeof document < "u" && typeof document.addEventListener < "u" && (typeof document.hidden < "u" ? (n = "visibilitychange",
      e = "hidden") : typeof document.mozHidden < "u" ? (n = "mozvisibilitychange",
        e = "mozHidden") : typeof document.msHidden < "u" ? (n = "msvisibilitychange",
          e = "msHidden") : typeof document.webkitHidden < "u" && (n = "webkitvisibilitychange",
            e = "webkitHidden")),
      this.visible_ = !0,
      n && document.addEventListener(n, () => {
        const s = !document[e];
        s !== this.visible_ && (this.visible_ = s,
          this.trigger("visible", s))
      }
        , !1)
  }
  static getInstance() {
    return new to
  }
  getInitialEvent(e) {
    return b(e === "visible", "Unknown event type: " + e),
      [this.visible_]
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Hn = 1e3
  , Rg = 60 * 5 * 1e3
  , Vl = 30 * 1e3
  , Ag = 1.3
  , Og = 3e4
  , Pg = "server_kill"
  , zl = 3;
class mt extends nu {
  constructor(e, n, s, i, r, o, l, a) {
    if (super(),
      this.repoInfo_ = e,
      this.applicationId_ = n,
      this.onDataUpdate_ = s,
      this.onConnectStatus_ = i,
      this.onServerInfoUpdate_ = r,
      this.authTokenProvider_ = o,
      this.appCheckTokenProvider_ = l,
      this.authOverride_ = a,
      this.id = mt.nextPersistentConnectionId_++,
      this.log_ = gs("p:" + this.id + ":"),
      this.interruptReasons_ = {},
      this.listens = new Map,
      this.outstandingPuts_ = [],
      this.outstandingGets_ = [],
      this.outstandingPutCount_ = 0,
      this.outstandingGetCount_ = 0,
      this.onDisconnectRequestQueue_ = [],
      this.connected_ = !1,
      this.reconnectDelay_ = Hn,
      this.maxReconnectDelay_ = Rg,
      this.securityDebugCallback_ = null,
      this.lastSessionId = null,
      this.establishConnectionTimer_ = null,
      this.visible_ = !1,
      this.requestCBHash_ = {},
      this.requestNumber_ = 0,
      this.realtime_ = null,
      this.authToken_ = null,
      this.appCheckToken_ = null,
      this.forceTokenRefresh_ = !1,
      this.invalidAuthTokenCount_ = 0,
      this.invalidAppCheckTokenCount_ = 0,
      this.firstConnection_ = !0,
      this.lastConnectionAttemptTime_ = null,
      this.lastConnectionEstablishedTime_ = null,
      a && !Ic())
      throw new Error("Auth override specified in options, but not supported on non Node.js platforms");
    to.getInstance().on("visible", this.onVisible_, this),
      e.host.indexOf("fblocal") === -1 && Ks.getInstance().on("online", this.onOnline_, this)
  }
  sendRequest(e, n, s) {
    const i = ++this.requestNumber_
      , r = {
        r: i,
        a: e,
        b: n
      };
    this.log_(Ie(r)),
      b(this.connected_, "sendRequest call when we're not connected not allowed."),
      this.realtime_.sendRequest(r),
      s && (this.requestCBHash_[i] = s)
  }
  get(e) {
    this.initConnection_();
    const n = new mi
      , i = {
        action: "g",
        request: {
          p: e._path.toString(),
          q: e._queryObject
        },
        onComplete: o => {
          const l = o.d;
          o.s === "ok" ? n.resolve(l) : n.reject(l)
        }
      };
    this.outstandingGets_.push(i),
      this.outstandingGetCount_++;
    const r = this.outstandingGets_.length - 1;
    return this.connected_ && this.sendGet_(r),
      n.promise
  }
  listen(e, n, s, i) {
    this.initConnection_();
    const r = e._queryIdentifier
      , o = e._path.toString();
    this.log_("Listen called for " + o + " " + r),
      this.listens.has(o) || this.listens.set(o, new Map),
      b(e._queryParams.isDefault() || !e._queryParams.loadsAllData(), "listen() called for non-default but complete query"),
      b(!this.listens.get(o).has(r), "listen() called twice for same path/queryId.");
    const l = {
      onComplete: i,
      hashFn: n,
      query: e,
      tag: s
    };
    this.listens.get(o).set(r, l),
      this.connected_ && this.sendListen_(l)
  }
  sendGet_(e) {
    const n = this.outstandingGets_[e];
    this.sendRequest("g", n.request, s => {
      delete this.outstandingGets_[e],
        this.outstandingGetCount_--,
        this.outstandingGetCount_ === 0 && (this.outstandingGets_ = []),
        n.onComplete && n.onComplete(s)
    }
    )
  }
  sendListen_(e) {
    const n = e.query
      , s = n._path.toString()
      , i = n._queryIdentifier;
    this.log_("Listen on " + s + " for " + i);
    const r = {
      p: s
    }
      , o = "q";
    e.tag && (r.q = n._queryObject,
      r.t = e.tag),
      r.h = e.hashFn(),
      this.sendRequest(o, r, l => {
        const a = l.d
          , c = l.s;
        mt.warnOnListenWarnings_(a, n),
          (this.listens.get(s) && this.listens.get(s).get(i)) === e && (this.log_("listen response", l),
            c !== "ok" && this.removeListen_(s, i),
            e.onComplete && e.onComplete(c, a))
      }
      )
  }
  static warnOnListenWarnings_(e, n) {
    if (e && typeof e == "object" && bt(e, "w")) {
      const s = Sn(e, "w");
      if (Array.isArray(s) && ~s.indexOf("no_index")) {
        const i = '".indexOn": "' + n._queryParams.getIndex().toString() + '"'
          , r = n._path.toString();
        He(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)
      }
    }
  }
  refreshAuthToken(e) {
    this.authToken_ = e,
      this.log_("Auth token refreshed"),
      this.authToken_ ? this.tryAuth() : this.connected_ && this.sendRequest("unauth", {}, () => { }
      ),
      this.reduceReconnectDelayIfAdminCredential_(e)
  }
  reduceReconnectDelayIfAdminCredential_(e) {
    (e && e.length === 40 || Tp(e)) && (this.log_("Admin auth credential detected.  Reducing max reconnect time."),
      this.maxReconnectDelay_ = Vl)
  }
  refreshAppCheckToken(e) {
    this.appCheckToken_ = e,
      this.log_("App check token refreshed"),
      this.appCheckToken_ ? this.tryAppCheck() : this.connected_ && this.sendRequest("unappeck", {}, () => { }
      )
  }
  tryAuth() {
    if (this.connected_ && this.authToken_) {
      const e = this.authToken_
        , n = Ip(e) ? "auth" : "gauth"
        , s = {
          cred: e
        };
      this.authOverride_ === null ? s.noauth = !0 : typeof this.authOverride_ == "object" && (s.authvar = this.authOverride_),
        this.sendRequest(n, s, i => {
          const r = i.s
            , o = i.d || "error";
          this.authToken_ === e && (r === "ok" ? this.invalidAuthTokenCount_ = 0 : this.onAuthRevoked_(r, o))
        }
        )
    }
  }
  tryAppCheck() {
    this.connected_ && this.appCheckToken_ && this.sendRequest("appcheck", {
      token: this.appCheckToken_
    }, e => {
      const n = e.s
        , s = e.d || "error";
      n === "ok" ? this.invalidAppCheckTokenCount_ = 0 : this.onAppCheckRevoked_(n, s)
    }
    )
  }
  unlisten(e, n) {
    const s = e._path.toString()
      , i = e._queryIdentifier;
    this.log_("Unlisten called for " + s + " " + i),
      b(e._queryParams.isDefault() || !e._queryParams.loadsAllData(), "unlisten() called for non-default but complete query"),
      this.removeListen_(s, i) && this.connected_ && this.sendUnlisten_(s, i, e._queryObject, n)
  }
  sendUnlisten_(e, n, s, i) {
    this.log_("Unlisten on " + e + " for " + n);
    const r = {
      p: e
    }
      , o = "n";
    i && (r.q = s,
      r.t = i),
      this.sendRequest(o, r)
  }
  onDisconnectPut(e, n, s) {
    this.initConnection_(),
      this.connected_ ? this.sendOnDisconnect_("o", e, n, s) : this.onDisconnectRequestQueue_.push({
        pathString: e,
        action: "o",
        data: n,
        onComplete: s
      })
  }
  onDisconnectMerge(e, n, s) {
    this.initConnection_(),
      this.connected_ ? this.sendOnDisconnect_("om", e, n, s) : this.onDisconnectRequestQueue_.push({
        pathString: e,
        action: "om",
        data: n,
        onComplete: s
      })
  }
  onDisconnectCancel(e, n) {
    this.initConnection_(),
      this.connected_ ? this.sendOnDisconnect_("oc", e, null, n) : this.onDisconnectRequestQueue_.push({
        pathString: e,
        action: "oc",
        data: null,
        onComplete: n
      })
  }
  sendOnDisconnect_(e, n, s, i) {
    const r = {
      p: n,
      d: s
    };
    this.log_("onDisconnect " + e, r),
      this.sendRequest(e, r, o => {
        i && setTimeout(() => {
          i(o.s, o.d)
        }
          , Math.floor(0))
      }
      )
  }
  put(e, n, s, i) {
    this.putInternal("p", e, n, s, i)
  }
  merge(e, n, s, i) {
    this.putInternal("m", e, n, s, i)
  }
  putInternal(e, n, s, i, r) {
    this.initConnection_();
    const o = {
      p: n,
      d: s
    };
    r !== void 0 && (o.h = r),
      this.outstandingPuts_.push({
        action: e,
        request: o,
        onComplete: i
      }),
      this.outstandingPutCount_++;
    const l = this.outstandingPuts_.length - 1;
    this.connected_ ? this.sendPut_(l) : this.log_("Buffering put: " + n)
  }
  sendPut_(e) {
    const n = this.outstandingPuts_[e].action
      , s = this.outstandingPuts_[e].request
      , i = this.outstandingPuts_[e].onComplete;
    this.outstandingPuts_[e].queued = this.connected_,
      this.sendRequest(n, s, r => {
        this.log_(n + " response", r),
          delete this.outstandingPuts_[e],
          this.outstandingPutCount_--,
          this.outstandingPutCount_ === 0 && (this.outstandingPuts_ = []),
          i && i(r.s, r.d)
      }
      )
  }
  reportStats(e) {
    if (this.connected_) {
      const n = {
        c: e
      };
      this.log_("reportStats", n),
        this.sendRequest("s", n, s => {
          if (s.s !== "ok") {
            const r = s.d;
            this.log_("reportStats", "Error sending stats: " + r)
          }
        }
        )
    }
  }
  onDataMessage_(e) {
    if ("r" in e) {
      this.log_("from server: " + Ie(e));
      const n = e.r
        , s = this.requestCBHash_[n];
      s && (delete this.requestCBHash_[n],
        s(e.b))
    } else {
      if ("error" in e)
        throw "A server-side error has occurred: " + e.error;
      "a" in e && this.onDataPush_(e.a, e.b)
    }
  }
  onDataPush_(e, n) {
    this.log_("handleServerMessage", e, n),
      e === "d" ? this.onDataUpdate_(n.p, n.d, !1, n.t) : e === "m" ? this.onDataUpdate_(n.p, n.d, !0, n.t) : e === "c" ? this.onListenRevoked_(n.p, n.q) : e === "ac" ? this.onAuthRevoked_(n.s, n.d) : e === "apc" ? this.onAppCheckRevoked_(n.s, n.d) : e === "sd" ? this.onSecurityDebugPacket_(n) : _r("Unrecognized action received from server: " + Ie(e) + `
Are you using the latest client?`)
  }
  onReady_(e, n) {
    this.log_("connection ready"),
      this.connected_ = !0,
      this.lastConnectionEstablishedTime_ = new Date().getTime(),
      this.handleTimestamp_(e),
      this.lastSessionId = n,
      this.firstConnection_ && this.sendConnectStats_(),
      this.restoreState_(),
      this.firstConnection_ = !1,
      this.onConnectStatus_(!0)
  }
  scheduleConnect_(e) {
    b(!this.realtime_, "Scheduling a connect when we're already connected/ing?"),
      this.establishConnectionTimer_ && clearTimeout(this.establishConnectionTimer_),
      this.establishConnectionTimer_ = setTimeout(() => {
        this.establishConnectionTimer_ = null,
          this.establishConnection_()
      }
        , Math.floor(e))
  }
  initConnection_() {
    !this.realtime_ && this.firstConnection_ && this.scheduleConnect_(0)
  }
  onVisible_(e) {
    e && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_ && (this.log_("Window became visible.  Reducing delay."),
      this.reconnectDelay_ = Hn,
      this.realtime_ || this.scheduleConnect_(0)),
      this.visible_ = e
  }
  onOnline_(e) {
    e ? (this.log_("Browser went online."),
      this.reconnectDelay_ = Hn,
      this.realtime_ || this.scheduleConnect_(0)) : (this.log_("Browser went offline.  Killing connection."),
        this.realtime_ && this.realtime_.close())
  }
  onRealtimeDisconnect_() {
    if (this.log_("data client disconnected"),
      this.connected_ = !1,
      this.realtime_ = null,
      this.cancelSentTransactions_(),
      this.requestCBHash_ = {},
      this.shouldReconnect_()) {
      this.visible_ ? this.lastConnectionEstablishedTime_ && (new Date().getTime() - this.lastConnectionEstablishedTime_ > Og && (this.reconnectDelay_ = Hn),
        this.lastConnectionEstablishedTime_ = null) : (this.log_("Window isn't visible.  Delaying reconnect."),
          this.reconnectDelay_ = this.maxReconnectDelay_,
          this.lastConnectionAttemptTime_ = new Date().getTime());
      const e = new Date().getTime() - this.lastConnectionAttemptTime_;
      let n = Math.max(0, this.reconnectDelay_ - e);
      n = Math.random() * n,
        this.log_("Trying to reconnect in " + n + "ms"),
        this.scheduleConnect_(n),
        this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * Ag)
    }
    this.onConnectStatus_(!1)
  }
  async establishConnection_() {
    if (this.shouldReconnect_()) {
      this.log_("Making a connection attempt"),
        this.lastConnectionAttemptTime_ = new Date().getTime(),
        this.lastConnectionEstablishedTime_ = null;
      const e = this.onDataMessage_.bind(this)
        , n = this.onReady_.bind(this)
        , s = this.onRealtimeDisconnect_.bind(this)
        , i = this.id + ":" + mt.nextConnectionId_++
        , r = this.lastSessionId;
      let o = !1
        , l = null;
      const a = function () {
        l ? l.close() : (o = !0,
          s())
      }
        , c = function (h) {
          b(l, "sendRequest call when we're not connected not allowed."),
            l.sendRequest(h)
        };
      this.realtime_ = {
        close: a,
        sendRequest: c
      };
      const u = this.forceTokenRefresh_;
      this.forceTokenRefresh_ = !1;
      try {
        const [h, d] = await Promise.all([this.authTokenProvider_.getToken(u), this.appCheckTokenProvider_.getToken(u)]);
        o ? Ae("getToken() completed but was canceled") : (Ae("getToken() completed. Creating connection."),
          this.authToken_ = h && h.accessToken,
          this.appCheckToken_ = d && d.token,
          l = new Ig(i, this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, e, n, s, g => {
            He(g + " (" + this.repoInfo_.toString() + ")"),
              this.interrupt(Pg)
          }
            , r))
      } catch (h) {
        this.log_("Failed to get token: " + h),
          o || (this.repoInfo_.nodeAdmin && He(h),
            a())
      }
    }
  }
  interrupt(e) {
    Ae("Interrupting connection for reason: " + e),
      this.interruptReasons_[e] = !0,
      this.realtime_ ? this.realtime_.close() : (this.establishConnectionTimer_ && (clearTimeout(this.establishConnectionTimer_),
        this.establishConnectionTimer_ = null),
        this.connected_ && this.onRealtimeDisconnect_())
  }
  resume(e) {
    Ae("Resuming connection for reason: " + e),
      delete this.interruptReasons_[e],
      bl(this.interruptReasons_) && (this.reconnectDelay_ = Hn,
        this.realtime_ || this.scheduleConnect_(0))
  }
  handleTimestamp_(e) {
    const n = e - new Date().getTime();
    this.onServerInfoUpdate_({
      serverTimeOffset: n
    })
  }
  cancelSentTransactions_() {
    for (let e = 0; e < this.outstandingPuts_.length; e++) {
      const n = this.outstandingPuts_[e];
      n && "h" in n.request && n.queued && (n.onComplete && n.onComplete("disconnect"),
        delete this.outstandingPuts_[e],
        this.outstandingPutCount_--)
    }
    this.outstandingPutCount_ === 0 && (this.outstandingPuts_ = [])
  }
  onListenRevoked_(e, n) {
    let s;
    n ? s = n.map(r => Qr(r)).join("$") : s = "default";
    const i = this.removeListen_(e, s);
    i && i.onComplete && i.onComplete("permission_denied")
  }
  removeListen_(e, n) {
    const s = new ie(e).toString();
    let i;
    if (this.listens.has(s)) {
      const r = this.listens.get(s);
      i = r.get(n),
        r.delete(n),
        r.size === 0 && this.listens.delete(s)
    } else
      i = void 0;
    return i
  }
  onAuthRevoked_(e, n) {
    Ae("Auth token revoked: " + e + "/" + n),
      this.authToken_ = null,
      this.forceTokenRefresh_ = !0,
      this.realtime_.close(),
      (e === "invalid_token" || e === "permission_denied") && (this.invalidAuthTokenCount_++,
        this.invalidAuthTokenCount_ >= zl && (this.reconnectDelay_ = Vl,
          this.authTokenProvider_.notifyForInvalidToken()))
  }
  onAppCheckRevoked_(e, n) {
    Ae("App check token revoked: " + e + "/" + n),
      this.appCheckToken_ = null,
      this.forceTokenRefresh_ = !0,
      (e === "invalid_token" || e === "permission_denied") && (this.invalidAppCheckTokenCount_++,
        this.invalidAppCheckTokenCount_ >= zl && this.appCheckTokenProvider_.notifyForInvalidToken())
  }
  onSecurityDebugPacket_(e) {
    this.securityDebugCallback_ ? this.securityDebugCallback_(e) : "msg" in e && console.log("FIREBASE: " + e.msg.replace(`
`, `
FIREBASE: `))
  }
  restoreState_() {
    this.tryAuth(),
      this.tryAppCheck();
    for (const e of this.listens.values())
      for (const n of e.values())
        this.sendListen_(n);
    for (let e = 0; e < this.outstandingPuts_.length; e++)
      this.outstandingPuts_[e] && this.sendPut_(e);
    for (; this.onDisconnectRequestQueue_.length;) {
      const e = this.onDisconnectRequestQueue_.shift();
      this.sendOnDisconnect_(e.action, e.pathString, e.data, e.onComplete)
    }
    for (let e = 0; e < this.outstandingGets_.length; e++)
      this.outstandingGets_[e] && this.sendGet_(e)
  }
  sendConnectStats_() {
    const e = {};
    let n = "js";
    e["sdk." + n + "." + kc.replace(/\./g, "-")] = 1,
      wc() ? e["framework.cordova"] = 1 : up() && (e["framework.reactnative"] = 1),
      this.reportStats(e)
  }
  shouldReconnect_() {
    const e = Ks.getInstance().currentlyOnline();
    return bl(this.interruptReasons_) && e
  }
}
mt.nextPersistentConnectionId_ = 0;
mt.nextConnectionId_ = 0;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class V {
  constructor(e, n) {
    this.name = e,
      this.node = n
  }
  static Wrap(e, n) {
    return new V(e, n)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class vi {
  getCompare() {
    return this.compare.bind(this)
  }
  indexedValueChanged(e, n) {
    const s = new V(xn, e)
      , i = new V(xn, n);
    return this.compare(s, i) !== 0
  }
  minPost() {
    return V.MIN
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let xs;
class au extends vi {
  static get __EMPTY_NODE() {
    return xs
  }
  static set __EMPTY_NODE(e) {
    xs = e
  }
  compare(e, n) {
    return Mn(e.name, n.name)
  }
  isDefinedOn(e) {
    throw Dn("KeyIndex.isDefinedOn not expected to be called.")
  }
  indexedValueChanged(e, n) {
    return !1
  }
  minPost() {
    return V.MIN
  }
  maxPost() {
    return new V(en, xs)
  }
  makePost(e, n) {
    return b(typeof e == "string", "KeyIndex indexValue must always be a string."),
      new V(e, xs)
  }
  toString() {
    return ".key"
  }
}
const En = new au;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ns {
  constructor(e, n, s, i, r = null) {
    this.isReverse_ = i,
      this.resultGenerator_ = r,
      this.nodeStack_ = [];
    let o = 1;
    for (; !e.isEmpty();)
      if (e = e,
        o = n ? s(e.key, n) : 1,
        i && (o *= -1),
        o < 0)
        this.isReverse_ ? e = e.left : e = e.right;
      else if (o === 0) {
        this.nodeStack_.push(e);
        break
      } else
        this.nodeStack_.push(e),
          this.isReverse_ ? e = e.right : e = e.left
  }
  getNext() {
    if (this.nodeStack_.length === 0)
      return null;
    let e = this.nodeStack_.pop(), n;
    if (this.resultGenerator_ ? n = this.resultGenerator_(e.key, e.value) : n = {
      key: e.key,
      value: e.value
    },
      this.isReverse_)
      for (e = e.left; !e.isEmpty();)
        this.nodeStack_.push(e),
          e = e.right;
    else
      for (e = e.right; !e.isEmpty();)
        this.nodeStack_.push(e),
          e = e.left;
    return n
  }
  hasNext() {
    return this.nodeStack_.length > 0
  }
  peek() {
    if (this.nodeStack_.length === 0)
      return null;
    const e = this.nodeStack_[this.nodeStack_.length - 1];
    return this.resultGenerator_ ? this.resultGenerator_(e.key, e.value) : {
      key: e.key,
      value: e.value
    }
  }
}
class we {
  constructor(e, n, s, i, r) {
    this.key = e,
      this.value = n,
      this.color = s ?? we.RED,
      this.left = i ?? We.EMPTY_NODE,
      this.right = r ?? We.EMPTY_NODE
  }
  copy(e, n, s, i, r) {
    return new we(e ?? this.key, n ?? this.value, s ?? this.color, i ?? this.left, r ?? this.right)
  }
  count() {
    return this.left.count() + 1 + this.right.count()
  }
  isEmpty() {
    return !1
  }
  inorderTraversal(e) {
    return this.left.inorderTraversal(e) || !!e(this.key, this.value) || this.right.inorderTraversal(e)
  }
  reverseTraversal(e) {
    return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e)
  }
  min_() {
    return this.left.isEmpty() ? this : this.left.min_()
  }
  minKey() {
    return this.min_().key
  }
  maxKey() {
    return this.right.isEmpty() ? this.key : this.right.maxKey()
  }
  insert(e, n, s) {
    let i = this;
    const r = s(e, i.key);
    return r < 0 ? i = i.copy(null, null, null, i.left.insert(e, n, s), null) : r === 0 ? i = i.copy(null, n, null, null, null) : i = i.copy(null, null, null, null, i.right.insert(e, n, s)),
      i.fixUp_()
  }
  removeMin_() {
    if (this.left.isEmpty())
      return We.EMPTY_NODE;
    let e = this;
    return !e.left.isRed_() && !e.left.left.isRed_() && (e = e.moveRedLeft_()),
      e = e.copy(null, null, null, e.left.removeMin_(), null),
      e.fixUp_()
  }
  remove(e, n) {
    let s, i;
    if (s = this,
      n(e, s.key) < 0)
      !s.left.isEmpty() && !s.left.isRed_() && !s.left.left.isRed_() && (s = s.moveRedLeft_()),
        s = s.copy(null, null, null, s.left.remove(e, n), null);
    else {
      if (s.left.isRed_() && (s = s.rotateRight_()),
        !s.right.isEmpty() && !s.right.isRed_() && !s.right.left.isRed_() && (s = s.moveRedRight_()),
        n(e, s.key) === 0) {
        if (s.right.isEmpty())
          return We.EMPTY_NODE;
        i = s.right.min_(),
          s = s.copy(i.key, i.value, null, null, s.right.removeMin_())
      }
      s = s.copy(null, null, null, null, s.right.remove(e, n))
    }
    return s.fixUp_()
  }
  isRed_() {
    return this.color
  }
  fixUp_() {
    let e = this;
    return e.right.isRed_() && !e.left.isRed_() && (e = e.rotateLeft_()),
      e.left.isRed_() && e.left.left.isRed_() && (e = e.rotateRight_()),
      e.left.isRed_() && e.right.isRed_() && (e = e.colorFlip_()),
      e
  }
  moveRedLeft_() {
    let e = this.colorFlip_();
    return e.right.left.isRed_() && (e = e.copy(null, null, null, null, e.right.rotateRight_()),
      e = e.rotateLeft_(),
      e = e.colorFlip_()),
      e
  }
  moveRedRight_() {
    let e = this.colorFlip_();
    return e.left.left.isRed_() && (e = e.rotateRight_(),
      e = e.colorFlip_()),
      e
  }
  rotateLeft_() {
    const e = this.copy(null, null, we.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, e, null)
  }
  rotateRight_() {
    const e = this.copy(null, null, we.RED, this.left.right, null);
    return this.left.copy(null, null, this.color, null, e)
  }
  colorFlip_() {
    const e = this.left.copy(null, null, !this.left.color, null, null)
      , n = this.right.copy(null, null, !this.right.color, null, null);
    return this.copy(null, null, !this.color, e, n)
  }
  checkMaxDepth_() {
    const e = this.check_();
    return Math.pow(2, e) <= this.count() + 1
  }
  check_() {
    if (this.isRed_() && this.left.isRed_())
      throw new Error("Red node has red child(" + this.key + "," + this.value + ")");
    if (this.right.isRed_())
      throw new Error("Right child of (" + this.key + "," + this.value + ") is red");
    const e = this.left.check_();
    if (e !== this.right.check_())
      throw new Error("Black depths differ");
    return e + (this.isRed_() ? 0 : 1)
  }
}
we.RED = !0;
we.BLACK = !1;
class Dg {
  copy(e, n, s, i, r) {
    return this
  }
  insert(e, n, s) {
    return new we(e, n, null)
  }
  remove(e, n) {
    return this
  }
  count() {
    return 0
  }
  isEmpty() {
    return !0
  }
  inorderTraversal(e) {
    return !1
  }
  reverseTraversal(e) {
    return !1
  }
  minKey() {
    return null
  }
  maxKey() {
    return null
  }
  check_() {
    return 0
  }
  isRed_() {
    return !1
  }
}
class We {
  constructor(e, n = We.EMPTY_NODE) {
    this.comparator_ = e,
      this.root_ = n
  }
  insert(e, n) {
    return new We(this.comparator_, this.root_.insert(e, n, this.comparator_).copy(null, null, we.BLACK, null, null))
  }
  remove(e) {
    return new We(this.comparator_, this.root_.remove(e, this.comparator_).copy(null, null, we.BLACK, null, null))
  }
  get(e) {
    let n, s = this.root_;
    for (; !s.isEmpty();) {
      if (n = this.comparator_(e, s.key),
        n === 0)
        return s.value;
      n < 0 ? s = s.left : n > 0 && (s = s.right)
    }
    return null
  }
  getPredecessorKey(e) {
    let n, s = this.root_, i = null;
    for (; !s.isEmpty();)
      if (n = this.comparator_(e, s.key),
        n === 0) {
        if (s.left.isEmpty())
          return i ? i.key : null;
        for (s = s.left; !s.right.isEmpty();)
          s = s.right;
        return s.key
      } else
        n < 0 ? s = s.left : n > 0 && (i = s,
          s = s.right);
    throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")
  }
  isEmpty() {
    return this.root_.isEmpty()
  }
  count() {
    return this.root_.count()
  }
  minKey() {
    return this.root_.minKey()
  }
  maxKey() {
    return this.root_.maxKey()
  }
  inorderTraversal(e) {
    return this.root_.inorderTraversal(e)
  }
  reverseTraversal(e) {
    return this.root_.reverseTraversal(e)
  }
  getIterator(e) {
    return new Ns(this.root_, null, this.comparator_, !1, e)
  }
  getIteratorFrom(e, n) {
    return new Ns(this.root_, e, this.comparator_, !1, n)
  }
  getReverseIteratorFrom(e, n) {
    return new Ns(this.root_, e, this.comparator_, !0, n)
  }
  getReverseIterator(e) {
    return new Ns(this.root_, null, this.comparator_, !0, e)
  }
}
We.EMPTY_NODE = new Dg;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function kg(t, e) {
  return Mn(t.name, e.name)
}
function no(t, e) {
  return Mn(t, e)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let mr;
function Mg(t) {
  mr = t
}
const cu = function (t) {
  return typeof t == "number" ? "number:" + Uc(t) : "string:" + t
}
  , uu = function (t) {
    if (t.isLeafNode()) {
      const e = t.val();
      b(typeof e == "string" || typeof e == "number" || typeof e == "object" && bt(e, ".sv"), "Priority must be a string or number.")
    } else
      b(t === mr || t.isEmpty(), "priority of unexpected type.");
    b(t === mr || t.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.")
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let ql;
class be {
  constructor(e, n = be.__childrenNodeConstructor.EMPTY_NODE) {
    this.value_ = e,
      this.priorityNode_ = n,
      this.lazyHash_ = null,
      b(this.value_ !== void 0 && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value."),
      uu(this.priorityNode_)
  }
  static set __childrenNodeConstructor(e) {
    ql = e
  }
  static get __childrenNodeConstructor() {
    return ql
  }
  isLeafNode() {
    return !0
  }
  getPriority() {
    return this.priorityNode_
  }
  updatePriority(e) {
    return new be(this.value_, e)
  }
  getImmediateChild(e) {
    return e === ".priority" ? this.priorityNode_ : be.__childrenNodeConstructor.EMPTY_NODE
  }
  getChild(e) {
    return q(e) ? this : j(e) === ".priority" ? this.priorityNode_ : be.__childrenNodeConstructor.EMPTY_NODE
  }
  hasChild() {
    return !1
  }
  getPredecessorChildName(e, n) {
    return null
  }
  updateImmediateChild(e, n) {
    return e === ".priority" ? this.updatePriority(n) : n.isEmpty() && e !== ".priority" ? this : be.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e, n).updatePriority(this.priorityNode_)
  }
  updateChild(e, n) {
    const s = j(e);
    return s === null ? n : n.isEmpty() && s !== ".priority" ? this : (b(s !== ".priority" || Dt(e) === 1, ".priority must be the last token in a path"),
      this.updateImmediateChild(s, be.__childrenNodeConstructor.EMPTY_NODE.updateChild(le(e), n)))
  }
  isEmpty() {
    return !1
  }
  numChildren() {
    return 0
  }
  forEachChild(e, n) {
    return !1
  }
  val(e) {
    return e && !this.getPriority().isEmpty() ? {
      ".value": this.getValue(),
      ".priority": this.getPriority().val()
    } : this.getValue()
  }
  hash() {
    if (this.lazyHash_ === null) {
      let e = "";
      this.priorityNode_.isEmpty() || (e += "priority:" + cu(this.priorityNode_.val()) + ":");
      const n = typeof this.value_;
      e += n + ":",
        n === "number" ? e += Uc(this.value_) : e += this.value_,
        this.lazyHash_ = Fc(e)
    }
    return this.lazyHash_
  }
  getValue() {
    return this.value_
  }
  compareTo(e) {
    return e === be.__childrenNodeConstructor.EMPTY_NODE ? 1 : e instanceof be.__childrenNodeConstructor ? -1 : (b(e.isLeafNode(), "Unknown node type"),
      this.compareToLeafNode_(e))
  }
  compareToLeafNode_(e) {
    const n = typeof e.value_
      , s = typeof this.value_
      , i = be.VALUE_TYPE_ORDER.indexOf(n)
      , r = be.VALUE_TYPE_ORDER.indexOf(s);
    return b(i >= 0, "Unknown leaf type: " + n),
      b(r >= 0, "Unknown leaf type: " + s),
      i === r ? s === "object" ? 0 : this.value_ < e.value_ ? -1 : this.value_ === e.value_ ? 0 : 1 : r - i
  }
  withIndex() {
    return this
  }
  isIndexed() {
    return !0
  }
  equals(e) {
    if (e === this)
      return !0;
    if (e.isLeafNode()) {
      const n = e;
      return this.value_ === n.value_ && this.priorityNode_.equals(n.priorityNode_)
    } else
      return !1
  }
}
be.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let hu, fu;
function Fg(t) {
  hu = t
}
function Lg(t) {
  fu = t
}
class Bg extends vi {
  compare(e, n) {
    const s = e.node.getPriority()
      , i = n.node.getPriority()
      , r = s.compareTo(i);
    return r === 0 ? Mn(e.name, n.name) : r
  }
  isDefinedOn(e) {
    return !e.getPriority().isEmpty()
  }
  indexedValueChanged(e, n) {
    return !e.getPriority().equals(n.getPriority())
  }
  minPost() {
    return V.MIN
  }
  maxPost() {
    return new V(en, new be("[PRIORITY-POST]", fu))
  }
  makePost(e, n) {
    const s = hu(e);
    return new V(n, new be("[PRIORITY-POST]", s))
  }
  toString() {
    return ".priority"
  }
}
const pe = new Bg;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ug = Math.log(2);
class Wg {
  constructor(e) {
    const n = r => parseInt(Math.log(r) / Ug, 10)
      , s = r => parseInt(Array(r + 1).join("1"), 2);
    this.count = n(e + 1),
      this.current_ = this.count - 1;
    const i = s(this.count);
    this.bits_ = e + 1 & i
  }
  nextBitIsOne() {
    const e = !(this.bits_ & 1 << this.current_);
    return this.current_--,
      e
  }
}
const Gs = function (t, e, n, s) {
  t.sort(e);
  const i = function (a, c) {
    const u = c - a;
    let h, d;
    if (u === 0)
      return null;
    if (u === 1)
      return h = t[a],
        d = n ? n(h) : h,
        new we(d, h.node, we.BLACK, null, null);
    {
      const g = parseInt(u / 2, 10) + a
        , C = i(a, g)
        , E = i(g + 1, c);
      return h = t[g],
        d = n ? n(h) : h,
        new we(d, h.node, we.BLACK, C, E)
    }
  }
    , r = function (a) {
      let c = null
        , u = null
        , h = t.length;
      const d = function (C, E) {
        const U = h - C
          , P = h;
        h -= C;
        const he = i(U + 1, P)
          , D = t[U]
          , ee = n ? n(D) : D;
        g(new we(ee, D.node, E, null, he))
      }
        , g = function (C) {
          c ? (c.left = C,
            c = C) : (u = C,
              c = C)
        };
      for (let C = 0; C < a.count; ++C) {
        const E = a.nextBitIsOne()
          , U = Math.pow(2, a.count - (C + 1));
        E ? d(U, we.BLACK) : (d(U, we.BLACK),
          d(U, we.RED))
      }
      return u
    }
    , o = new Wg(t.length)
    , l = r(o);
  return new We(s || e, l)
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let $i;
const cn = {};
class _t {
  constructor(e, n) {
    this.indexes_ = e,
      this.indexSet_ = n
  }
  static get Default() {
    return b(cn && pe, "ChildrenNode.ts has not been loaded"),
      $i = $i || new _t({
        ".priority": cn
      }, {
        ".priority": pe
      }),
      $i
  }
  get(e) {
    const n = Sn(this.indexes_, e);
    if (!n)
      throw new Error("No index defined for " + e);
    return n instanceof We ? n : null
  }
  hasIndex(e) {
    return bt(this.indexSet_, e.toString())
  }
  addIndex(e, n) {
    b(e !== En, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
    const s = [];
    let i = !1;
    const r = n.getIterator(V.Wrap);
    let o = r.getNext();
    for (; o;)
      i = i || e.isDefinedOn(o.node),
        s.push(o),
        o = r.getNext();
    let l;
    i ? l = Gs(s, e.getCompare()) : l = cn;
    const a = e.toString()
      , c = Object.assign({}, this.indexSet_);
    c[a] = e;
    const u = Object.assign({}, this.indexes_);
    return u[a] = l,
      new _t(u, c)
  }
  addToIndexes(e, n) {
    const s = js(this.indexes_, (i, r) => {
      const o = Sn(this.indexSet_, r);
      if (b(o, "Missing index implementation for " + r),
        i === cn)
        if (o.isDefinedOn(e.node)) {
          const l = []
            , a = n.getIterator(V.Wrap);
          let c = a.getNext();
          for (; c;)
            c.name !== e.name && l.push(c),
              c = a.getNext();
          return l.push(e),
            Gs(l, o.getCompare())
        } else
          return cn;
      else {
        const l = n.get(e.name);
        let a = i;
        return l && (a = a.remove(new V(e.name, l))),
          a.insert(e, e.node)
      }
    }
    );
    return new _t(s, this.indexSet_)
  }
  removeFromIndexes(e, n) {
    const s = js(this.indexes_, i => {
      if (i === cn)
        return i;
      {
        const r = n.get(e.name);
        return r ? i.remove(new V(e.name, r)) : i
      }
    }
    );
    return new _t(s, this.indexSet_)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let $n;
class M {
  constructor(e, n, s) {
    this.children_ = e,
      this.priorityNode_ = n,
      this.indexMap_ = s,
      this.lazyHash_ = null,
      this.priorityNode_ && uu(this.priorityNode_),
      this.children_.isEmpty() && b(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority")
  }
  static get EMPTY_NODE() {
    return $n || ($n = new M(new We(no), null, _t.Default))
  }
  isLeafNode() {
    return !1
  }
  getPriority() {
    return this.priorityNode_ || $n
  }
  updatePriority(e) {
    return this.children_.isEmpty() ? this : new M(this.children_, e, this.indexMap_)
  }
  getImmediateChild(e) {
    if (e === ".priority")
      return this.getPriority();
    {
      const n = this.children_.get(e);
      return n === null ? $n : n
    }
  }
  getChild(e) {
    const n = j(e);
    return n === null ? this : this.getImmediateChild(n).getChild(le(e))
  }
  hasChild(e) {
    return this.children_.get(e) !== null
  }
  updateImmediateChild(e, n) {
    if (b(n, "We should always be passing snapshot nodes"),
      e === ".priority")
      return this.updatePriority(n);
    {
      const s = new V(e, n);
      let i, r;
      n.isEmpty() ? (i = this.children_.remove(e),
        r = this.indexMap_.removeFromIndexes(s, this.children_)) : (i = this.children_.insert(e, n),
          r = this.indexMap_.addToIndexes(s, this.children_));
      const o = i.isEmpty() ? $n : this.priorityNode_;
      return new M(i, o, r)
    }
  }
  updateChild(e, n) {
    const s = j(e);
    if (s === null)
      return n;
    {
      b(j(e) !== ".priority" || Dt(e) === 1, ".priority must be the last token in a path");
      const i = this.getImmediateChild(s).updateChild(le(e), n);
      return this.updateImmediateChild(s, i)
    }
  }
  isEmpty() {
    return this.children_.isEmpty()
  }
  numChildren() {
    return this.children_.count()
  }
  val(e) {
    if (this.isEmpty())
      return null;
    const n = {};
    let s = 0
      , i = 0
      , r = !0;
    if (this.forEachChild(pe, (o, l) => {
      n[o] = l.val(e),
        s++,
        r && M.INTEGER_REGEXP_.test(o) ? i = Math.max(i, Number(o)) : r = !1
    }
    ),
      !e && r && i < 2 * s) {
      const o = [];
      for (const l in n)
        o[l] = n[l];
      return o
    } else
      return e && !this.getPriority().isEmpty() && (n[".priority"] = this.getPriority().val()),
        n
  }
  hash() {
    if (this.lazyHash_ === null) {
      let e = "";
      this.getPriority().isEmpty() || (e += "priority:" + cu(this.getPriority().val()) + ":"),
        this.forEachChild(pe, (n, s) => {
          const i = s.hash();
          i !== "" && (e += ":" + n + ":" + i)
        }
        ),
        this.lazyHash_ = e === "" ? "" : Fc(e)
    }
    return this.lazyHash_
  }
  getPredecessorChildName(e, n, s) {
    const i = this.resolveIndex_(s);
    if (i) {
      const r = i.getPredecessorKey(new V(e, n));
      return r ? r.name : null
    } else
      return this.children_.getPredecessorKey(e)
  }
  getFirstChildName(e) {
    const n = this.resolveIndex_(e);
    if (n) {
      const s = n.minKey();
      return s && s.name
    } else
      return this.children_.minKey()
  }
  getFirstChild(e) {
    const n = this.getFirstChildName(e);
    return n ? new V(n, this.children_.get(n)) : null
  }
  getLastChildName(e) {
    const n = this.resolveIndex_(e);
    if (n) {
      const s = n.maxKey();
      return s && s.name
    } else
      return this.children_.maxKey()
  }
  getLastChild(e) {
    const n = this.getLastChildName(e);
    return n ? new V(n, this.children_.get(n)) : null
  }
  forEachChild(e, n) {
    const s = this.resolveIndex_(e);
    return s ? s.inorderTraversal(i => n(i.name, i.node)) : this.children_.inorderTraversal(n)
  }
  getIterator(e) {
    return this.getIteratorFrom(e.minPost(), e)
  }
  getIteratorFrom(e, n) {
    const s = this.resolveIndex_(n);
    if (s)
      return s.getIteratorFrom(e, i => i);
    {
      const i = this.children_.getIteratorFrom(e.name, V.Wrap);
      let r = i.peek();
      for (; r != null && n.compare(r, e) < 0;)
        i.getNext(),
          r = i.peek();
      return i
    }
  }
  getReverseIterator(e) {
    return this.getReverseIteratorFrom(e.maxPost(), e)
  }
  getReverseIteratorFrom(e, n) {
    const s = this.resolveIndex_(n);
    if (s)
      return s.getReverseIteratorFrom(e, i => i);
    {
      const i = this.children_.getReverseIteratorFrom(e.name, V.Wrap);
      let r = i.peek();
      for (; r != null && n.compare(r, e) > 0;)
        i.getNext(),
          r = i.peek();
      return i
    }
  }
  compareTo(e) {
    return this.isEmpty() ? e.isEmpty() ? 0 : -1 : e.isLeafNode() || e.isEmpty() ? 1 : e === ms ? -1 : 0
  }
  withIndex(e) {
    if (e === En || this.indexMap_.hasIndex(e))
      return this;
    {
      const n = this.indexMap_.addIndex(e, this.children_);
      return new M(this.children_, this.priorityNode_, n)
    }
  }
  isIndexed(e) {
    return e === En || this.indexMap_.hasIndex(e)
  }
  equals(e) {
    if (e === this)
      return !0;
    if (e.isLeafNode())
      return !1;
    {
      const n = e;
      if (this.getPriority().equals(n.getPriority()))
        if (this.children_.count() === n.children_.count()) {
          const s = this.getIterator(pe)
            , i = n.getIterator(pe);
          let r = s.getNext()
            , o = i.getNext();
          for (; r && o;) {
            if (r.name !== o.name || !r.node.equals(o.node))
              return !1;
            r = s.getNext(),
              o = i.getNext()
          }
          return r === null && o === null
        } else
          return !1;
      else
        return !1
    }
  }
  resolveIndex_(e) {
    return e === En ? null : this.indexMap_.get(e.toString())
  }
}
M.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
class Hg extends M {
  constructor() {
    super(new We(no), M.EMPTY_NODE, _t.Default)
  }
  compareTo(e) {
    return e === this ? 0 : 1
  }
  equals(e) {
    return e === this
  }
  getPriority() {
    return this
  }
  getImmediateChild(e) {
    return M.EMPTY_NODE
  }
  isEmpty() {
    return !1
  }
}
const ms = new Hg;
Object.defineProperties(V, {
  MIN: {
    value: new V(xn, M.EMPTY_NODE)
  },
  MAX: {
    value: new V(en, ms)
  }
});
au.__EMPTY_NODE = M.EMPTY_NODE;
be.__childrenNodeConstructor = M;
Mg(ms);
Lg(ms);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $g = !0;
function xe(t, e = null) {
  if (t === null)
    return M.EMPTY_NODE;
  if (typeof t == "object" && ".priority" in t && (e = t[".priority"]),
    b(e === null || typeof e == "string" || typeof e == "number" || typeof e == "object" && ".sv" in e, "Invalid priority type found: " + typeof e),
    typeof t == "object" && ".value" in t && t[".value"] !== null && (t = t[".value"]),
    typeof t != "object" || ".sv" in t) {
    const n = t;
    return new be(n, xe(e))
  }
  if (!(t instanceof Array) && $g) {
    const n = [];
    let s = !1;
    if ($e(t, (o, l) => {
      if (o.substring(0, 1) !== ".") {
        const a = xe(l);
        a.isEmpty() || (s = s || !a.getPriority().isEmpty(),
          n.push(new V(o, a)))
      }
    }
    ),
      n.length === 0)
      return M.EMPTY_NODE;
    const r = Gs(n, kg, o => o.name, no);
    if (s) {
      const o = Gs(n, pe.getCompare());
      return new M(r, xe(e), new _t({
        ".priority": o
      }, {
        ".priority": pe
      }))
    } else
      return new M(r, xe(e), _t.Default)
  } else {
    let n = M.EMPTY_NODE;
    return $e(t, (s, i) => {
      if (bt(t, s) && s.substring(0, 1) !== ".") {
        const r = xe(i);
        (r.isLeafNode() || !r.isEmpty()) && (n = n.updateImmediateChild(s, r))
      }
    }
    ),
      n.updatePriority(xe(e))
  }
}
Fg(xe);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jg extends vi {
  constructor(e) {
    super(),
      this.indexPath_ = e,
      b(!q(e) && j(e) !== ".priority", "Can't create PathIndex with empty path or .priority key")
  }
  extractChild(e) {
    return e.getChild(this.indexPath_)
  }
  isDefinedOn(e) {
    return !e.getChild(this.indexPath_).isEmpty()
  }
  compare(e, n) {
    const s = this.extractChild(e.node)
      , i = this.extractChild(n.node)
      , r = s.compareTo(i);
    return r === 0 ? Mn(e.name, n.name) : r
  }
  makePost(e, n) {
    const s = xe(e)
      , i = M.EMPTY_NODE.updateChild(this.indexPath_, s);
    return new V(n, i)
  }
  maxPost() {
    const e = M.EMPTY_NODE.updateChild(this.indexPath_, ms);
    return new V(en, e)
  }
  toString() {
    return ru(this.indexPath_, 0).join("/")
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Vg extends vi {
  compare(e, n) {
    const s = e.node.compareTo(n.node);
    return s === 0 ? Mn(e.name, n.name) : s
  }
  isDefinedOn(e) {
    return !0
  }
  indexedValueChanged(e, n) {
    return !e.equals(n)
  }
  minPost() {
    return V.MIN
  }
  maxPost() {
    return V.MAX
  }
  makePost(e, n) {
    const s = xe(e);
    return new V(n, s)
  }
  toString() {
    return ".value"
  }
}
const zg = new Vg;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function du(t) {
  return {
    type: "value",
    snapshotNode: t
  }
}
function Nn(t, e) {
  return {
    type: "child_added",
    snapshotNode: e,
    childName: t
  }
}
function ls(t, e) {
  return {
    type: "child_removed",
    snapshotNode: e,
    childName: t
  }
}
function as(t, e, n) {
  return {
    type: "child_changed",
    snapshotNode: e,
    childName: t,
    oldSnap: n
  }
}
function qg(t, e) {
  return {
    type: "child_moved",
    snapshotNode: e,
    childName: t
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class so {
  constructor(e) {
    this.index_ = e
  }
  updateChild(e, n, s, i, r, o) {
    b(e.isIndexed(this.index_), "A node must be indexed if only a child is updated");
    const l = e.getImmediateChild(n);
    return l.getChild(i).equals(s.getChild(i)) && l.isEmpty() === s.isEmpty() || (o != null && (s.isEmpty() ? e.hasChild(n) ? o.trackChildChange(ls(n, l)) : b(e.isLeafNode(), "A child remove without an old child only makes sense on a leaf node") : l.isEmpty() ? o.trackChildChange(Nn(n, s)) : o.trackChildChange(as(n, s, l))),
      e.isLeafNode() && s.isEmpty()) ? e : e.updateImmediateChild(n, s).withIndex(this.index_)
  }
  updateFullNode(e, n, s) {
    return s != null && (e.isLeafNode() || e.forEachChild(pe, (i, r) => {
      n.hasChild(i) || s.trackChildChange(ls(i, r))
    }
    ),
      n.isLeafNode() || n.forEachChild(pe, (i, r) => {
        if (e.hasChild(i)) {
          const o = e.getImmediateChild(i);
          o.equals(r) || s.trackChildChange(as(i, r, o))
        } else
          s.trackChildChange(Nn(i, r))
      }
      )),
      n.withIndex(this.index_)
  }
  updatePriority(e, n) {
    return e.isEmpty() ? M.EMPTY_NODE : e.updatePriority(n)
  }
  filtersNodes() {
    return !1
  }
  getIndexedFilter() {
    return this
  }
  getIndex() {
    return this.index_
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class cs {
  constructor(e) {
    this.indexedFilter_ = new so(e.getIndex()),
      this.index_ = e.getIndex(),
      this.startPost_ = cs.getStartPost_(e),
      this.endPost_ = cs.getEndPost_(e),
      this.startIsInclusive_ = !e.startAfterSet_,
      this.endIsInclusive_ = !e.endBeforeSet_
  }
  getStartPost() {
    return this.startPost_
  }
  getEndPost() {
    return this.endPost_
  }
  matches(e) {
    const n = this.startIsInclusive_ ? this.index_.compare(this.getStartPost(), e) <= 0 : this.index_.compare(this.getStartPost(), e) < 0
      , s = this.endIsInclusive_ ? this.index_.compare(e, this.getEndPost()) <= 0 : this.index_.compare(e, this.getEndPost()) < 0;
    return n && s
  }
  updateChild(e, n, s, i, r, o) {
    return this.matches(new V(n, s)) || (s = M.EMPTY_NODE),
      this.indexedFilter_.updateChild(e, n, s, i, r, o)
  }
  updateFullNode(e, n, s) {
    n.isLeafNode() && (n = M.EMPTY_NODE);
    let i = n.withIndex(this.index_);
    i = i.updatePriority(M.EMPTY_NODE);
    const r = this;
    return n.forEachChild(pe, (o, l) => {
      r.matches(new V(o, l)) || (i = i.updateImmediateChild(o, M.EMPTY_NODE))
    }
    ),
      this.indexedFilter_.updateFullNode(e, i, s)
  }
  updatePriority(e, n) {
    return e
  }
  filtersNodes() {
    return !0
  }
  getIndexedFilter() {
    return this.indexedFilter_
  }
  getIndex() {
    return this.index_
  }
  static getStartPost_(e) {
    if (e.hasStart()) {
      const n = e.getIndexStartName();
      return e.getIndex().makePost(e.getIndexStartValue(), n)
    } else
      return e.getIndex().minPost()
  }
  static getEndPost_(e) {
    if (e.hasEnd()) {
      const n = e.getIndexEndName();
      return e.getIndex().makePost(e.getIndexEndValue(), n)
    } else
      return e.getIndex().maxPost()
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Kg {
  constructor(e) {
    this.withinDirectionalStart = n => this.reverse_ ? this.withinEndPost(n) : this.withinStartPost(n),
      this.withinDirectionalEnd = n => this.reverse_ ? this.withinStartPost(n) : this.withinEndPost(n),
      this.withinStartPost = n => {
        const s = this.index_.compare(this.rangedFilter_.getStartPost(), n);
        return this.startIsInclusive_ ? s <= 0 : s < 0
      }
      ,
      this.withinEndPost = n => {
        const s = this.index_.compare(n, this.rangedFilter_.getEndPost());
        return this.endIsInclusive_ ? s <= 0 : s < 0
      }
      ,
      this.rangedFilter_ = new cs(e),
      this.index_ = e.getIndex(),
      this.limit_ = e.getLimit(),
      this.reverse_ = !e.isViewFromLeft(),
      this.startIsInclusive_ = !e.startAfterSet_,
      this.endIsInclusive_ = !e.endBeforeSet_
  }
  updateChild(e, n, s, i, r, o) {
    return this.rangedFilter_.matches(new V(n, s)) || (s = M.EMPTY_NODE),
      e.getImmediateChild(n).equals(s) ? e : e.numChildren() < this.limit_ ? this.rangedFilter_.getIndexedFilter().updateChild(e, n, s, i, r, o) : this.fullLimitUpdateChild_(e, n, s, r, o)
  }
  updateFullNode(e, n, s) {
    let i;
    if (n.isLeafNode() || n.isEmpty())
      i = M.EMPTY_NODE.withIndex(this.index_);
    else if (this.limit_ * 2 < n.numChildren() && n.isIndexed(this.index_)) {
      i = M.EMPTY_NODE.withIndex(this.index_);
      let r;
      this.reverse_ ? r = n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_) : r = n.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
      let o = 0;
      for (; r.hasNext() && o < this.limit_;) {
        const l = r.getNext();
        if (this.withinDirectionalStart(l))
          if (this.withinDirectionalEnd(l))
            i = i.updateImmediateChild(l.name, l.node),
              o++;
          else
            break;
        else
          continue
      }
    } else {
      i = n.withIndex(this.index_),
        i = i.updatePriority(M.EMPTY_NODE);
      let r;
      this.reverse_ ? r = i.getReverseIterator(this.index_) : r = i.getIterator(this.index_);
      let o = 0;
      for (; r.hasNext();) {
        const l = r.getNext();
        o < this.limit_ && this.withinDirectionalStart(l) && this.withinDirectionalEnd(l) ? o++ : i = i.updateImmediateChild(l.name, M.EMPTY_NODE)
      }
    }
    return this.rangedFilter_.getIndexedFilter().updateFullNode(e, i, s)
  }
  updatePriority(e, n) {
    return e
  }
  filtersNodes() {
    return !0
  }
  getIndexedFilter() {
    return this.rangedFilter_.getIndexedFilter()
  }
  getIndex() {
    return this.index_
  }
  fullLimitUpdateChild_(e, n, s, i, r) {
    let o;
    if (this.reverse_) {
      const h = this.index_.getCompare();
      o = (d, g) => h(g, d)
    } else
      o = this.index_.getCompare();
    const l = e;
    b(l.numChildren() === this.limit_, "");
    const a = new V(n, s)
      , c = this.reverse_ ? l.getFirstChild(this.index_) : l.getLastChild(this.index_)
      , u = this.rangedFilter_.matches(a);
    if (l.hasChild(n)) {
      const h = l.getImmediateChild(n);
      let d = i.getChildAfterChild(this.index_, c, this.reverse_);
      for (; d != null && (d.name === n || l.hasChild(d.name));)
        d = i.getChildAfterChild(this.index_, d, this.reverse_);
      const g = d == null ? 1 : o(d, a);
      if (u && !s.isEmpty() && g >= 0)
        return r != null && r.trackChildChange(as(n, s, h)),
          l.updateImmediateChild(n, s);
      {
        r != null && r.trackChildChange(ls(n, h));
        const E = l.updateImmediateChild(n, M.EMPTY_NODE);
        return d != null && this.rangedFilter_.matches(d) ? (r != null && r.trackChildChange(Nn(d.name, d.node)),
          E.updateImmediateChild(d.name, d.node)) : E
      }
    } else
      return s.isEmpty() ? e : u && o(c, a) >= 0 ? (r != null && (r.trackChildChange(ls(c.name, c.node)),
        r.trackChildChange(Nn(n, s))),
        l.updateImmediateChild(n, s).updateImmediateChild(c.name, M.EMPTY_NODE)) : e
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class io {
  constructor() {
    this.limitSet_ = !1,
      this.startSet_ = !1,
      this.startNameSet_ = !1,
      this.startAfterSet_ = !1,
      this.endSet_ = !1,
      this.endNameSet_ = !1,
      this.endBeforeSet_ = !1,
      this.limit_ = 0,
      this.viewFrom_ = "",
      this.indexStartValue_ = null,
      this.indexStartName_ = "",
      this.indexEndValue_ = null,
      this.indexEndName_ = "",
      this.index_ = pe
  }
  hasStart() {
    return this.startSet_
  }
  isViewFromLeft() {
    return this.viewFrom_ === "" ? this.startSet_ : this.viewFrom_ === "l"
  }
  getIndexStartValue() {
    return b(this.startSet_, "Only valid if start has been set"),
      this.indexStartValue_
  }
  getIndexStartName() {
    return b(this.startSet_, "Only valid if start has been set"),
      this.startNameSet_ ? this.indexStartName_ : xn
  }
  hasEnd() {
    return this.endSet_
  }
  getIndexEndValue() {
    return b(this.endSet_, "Only valid if end has been set"),
      this.indexEndValue_
  }
  getIndexEndName() {
    return b(this.endSet_, "Only valid if end has been set"),
      this.endNameSet_ ? this.indexEndName_ : en
  }
  hasLimit() {
    return this.limitSet_
  }
  hasAnchoredLimit() {
    return this.limitSet_ && this.viewFrom_ !== ""
  }
  getLimit() {
    return b(this.limitSet_, "Only valid if limit has been set"),
      this.limit_
  }
  getIndex() {
    return this.index_
  }
  loadsAllData() {
    return !(this.startSet_ || this.endSet_ || this.limitSet_)
  }
  isDefault() {
    return this.loadsAllData() && this.index_ === pe
  }
  copy() {
    const e = new io;
    return e.limitSet_ = this.limitSet_,
      e.limit_ = this.limit_,
      e.startSet_ = this.startSet_,
      e.startAfterSet_ = this.startAfterSet_,
      e.indexStartValue_ = this.indexStartValue_,
      e.startNameSet_ = this.startNameSet_,
      e.indexStartName_ = this.indexStartName_,
      e.endSet_ = this.endSet_,
      e.endBeforeSet_ = this.endBeforeSet_,
      e.indexEndValue_ = this.indexEndValue_,
      e.endNameSet_ = this.endNameSet_,
      e.indexEndName_ = this.indexEndName_,
      e.index_ = this.index_,
      e.viewFrom_ = this.viewFrom_,
      e
  }
}
function Gg(t) {
  return t.loadsAllData() ? new so(t.getIndex()) : t.hasLimit() ? new Kg(t) : new cs(t)
}
function Kl(t) {
  const e = {};
  if (t.isDefault())
    return e;
  let n;
  if (t.index_ === pe ? n = "$priority" : t.index_ === zg ? n = "$value" : t.index_ === En ? n = "$key" : (b(t.index_ instanceof jg, "Unrecognized index type!"),
    n = t.index_.toString()),
    e.orderBy = Ie(n),
    t.startSet_) {
    const s = t.startAfterSet_ ? "startAfter" : "startAt";
    e[s] = Ie(t.indexStartValue_),
      t.startNameSet_ && (e[s] += "," + Ie(t.indexStartName_))
  }
  if (t.endSet_) {
    const s = t.endBeforeSet_ ? "endBefore" : "endAt";
    e[s] = Ie(t.indexEndValue_),
      t.endNameSet_ && (e[s] += "," + Ie(t.indexEndName_))
  }
  return t.limitSet_ && (t.isViewFromLeft() ? e.limitToFirst = t.limit_ : e.limitToLast = t.limit_),
    e
}
function Gl(t) {
  const e = {};
  if (t.startSet_ && (e.sp = t.indexStartValue_,
    t.startNameSet_ && (e.sn = t.indexStartName_),
    e.sin = !t.startAfterSet_),
    t.endSet_ && (e.ep = t.indexEndValue_,
      t.endNameSet_ && (e.en = t.indexEndName_),
      e.ein = !t.endBeforeSet_),
    t.limitSet_) {
    e.l = t.limit_;
    let n = t.viewFrom_;
    n === "" && (t.isViewFromLeft() ? n = "l" : n = "r"),
      e.vf = n
  }
  return t.index_ !== pe && (e.i = t.index_.toString()),
    e
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ys extends nu {
  constructor(e, n, s, i) {
    super(),
      this.repoInfo_ = e,
      this.onDataUpdate_ = n,
      this.authTokenProvider_ = s,
      this.appCheckTokenProvider_ = i,
      this.log_ = gs("p:rest:"),
      this.listens_ = {}
  }
  reportStats(e) {
    throw new Error("Method not implemented.")
  }
  static getListenId_(e, n) {
    return n !== void 0 ? "tag$" + n : (b(e._queryParams.isDefault(), "should have a tag if it's not a default query."),
      e._path.toString())
  }
  listen(e, n, s, i) {
    const r = e._path.toString();
    this.log_("Listen called for " + r + " " + e._queryIdentifier);
    const o = Ys.getListenId_(e, s)
      , l = {};
    this.listens_[o] = l;
    const a = Kl(e._queryParams);
    this.restRequest_(r + ".json", a, (c, u) => {
      let h = u;
      if (c === 404 && (h = null,
        c = null),
        c === null && this.onDataUpdate_(r, h, !1, s),
        Sn(this.listens_, o) === l) {
        let d;
        c ? c === 401 ? d = "permission_denied" : d = "rest_error:" + c : d = "ok",
          i(d, null)
      }
    }
    )
  }
  unlisten(e, n) {
    const s = Ys.getListenId_(e, n);
    delete this.listens_[s]
  }
  get(e) {
    const n = Kl(e._queryParams)
      , s = e._path.toString()
      , i = new mi;
    return this.restRequest_(s + ".json", n, (r, o) => {
      let l = o;
      r === 404 && (l = null,
        r = null),
        r === null ? (this.onDataUpdate_(s, l, !1, null),
          i.resolve(l)) : i.reject(new Error(l))
    }
    ),
      i.promise
  }
  refreshAuthToken(e) { }
  restRequest_(e, n = {}, s) {
    return n.format = "export",
      Promise.all([this.authTokenProvider_.getToken(!1), this.appCheckTokenProvider_.getToken(!1)]).then(([i, r]) => {
        i && i.accessToken && (n.auth = i.accessToken),
          r && r.token && (n.ac = r.token);
        const o = (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host + e + "?ns=" + this.repoInfo_.namespace + Sp(n);
        this.log_("Sending REST request for " + o);
        const l = new XMLHttpRequest;
        l.onreadystatechange = () => {
          if (s && l.readyState === 4) {
            this.log_("REST Response for " + o + " received. status:", l.status, "response:", l.responseText);
            let a = null;
            if (l.status >= 200 && l.status < 300) {
              try {
                a = ss(l.responseText)
              } catch {
                He("Failed to parse JSON response for " + o + ": " + l.responseText)
              }
              s(null, a)
            } else
              l.status !== 401 && l.status !== 404 && He("Got unsuccessful REST response for " + o + " Status: " + l.status),
                s(l.status);
            s = null
          }
        }
          ,
          l.open("GET", o, !0),
          l.send()
      }
      )
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Yg {
  constructor() {
    this.rootNode_ = M.EMPTY_NODE
  }
  getNode(e) {
    return this.rootNode_.getChild(e)
  }
  updateSnapshot(e, n) {
    this.rootNode_ = this.rootNode_.updateChild(e, n)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Qs() {
  return {
    value: null,
    children: new Map
  }
}
function pu(t, e, n) {
  if (q(e))
    t.value = n,
      t.children.clear();
  else if (t.value !== null)
    t.value = t.value.updateChild(e, n);
  else {
    const s = j(e);
    t.children.has(s) || t.children.set(s, Qs());
    const i = t.children.get(s);
    e = le(e),
      pu(i, e, n)
  }
}
function yr(t, e, n) {
  t.value !== null ? n(e, t.value) : Qg(t, (s, i) => {
    const r = new ie(e.toString() + "/" + s);
    yr(i, r, n)
  }
  )
}
function Qg(t, e) {
  t.children.forEach((n, s) => {
    e(s, n)
  }
  )
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Jg {
  constructor(e) {
    this.collection_ = e,
      this.last_ = null
  }
  get() {
    const e = this.collection_.get()
      , n = Object.assign({}, e);
    return this.last_ && $e(this.last_, (s, i) => {
      n[s] = n[s] - i
    }
    ),
      this.last_ = e,
      n
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Yl = 10 * 1e3
  , Xg = 30 * 1e3
  , Zg = 5 * 60 * 1e3;
class em {
  constructor(e, n) {
    this.server_ = n,
      this.statsToReport_ = {},
      this.statsListener_ = new Jg(e);
    const s = Yl + (Xg - Yl) * Math.random();
    Kn(this.reportStats_.bind(this), Math.floor(s))
  }
  reportStats_() {
    const e = this.statsListener_.get()
      , n = {};
    let s = !1;
    $e(e, (i, r) => {
      r > 0 && bt(this.statsToReport_, i) && (n[i] = r,
        s = !0)
    }
    ),
      s && this.server_.reportStats(n),
      Kn(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * Zg))
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var st;
(function (t) {
  t[t.OVERWRITE = 0] = "OVERWRITE",
    t[t.MERGE = 1] = "MERGE",
    t[t.ACK_USER_WRITE = 2] = "ACK_USER_WRITE",
    t[t.LISTEN_COMPLETE = 3] = "LISTEN_COMPLETE"
}
)(st || (st = {}));
function _u() {
  return {
    fromUser: !0,
    fromServer: !1,
    queryId: null,
    tagged: !1
  }
}
function ro() {
  return {
    fromUser: !1,
    fromServer: !0,
    queryId: null,
    tagged: !1
  }
}
function oo(t) {
  return {
    fromUser: !1,
    fromServer: !0,
    queryId: t,
    tagged: !0
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Js {
  constructor(e, n, s) {
    this.path = e,
      this.affectedTree = n,
      this.revert = s,
      this.type = st.ACK_USER_WRITE,
      this.source = _u()
  }
  operationForChild(e) {
    if (q(this.path)) {
      if (this.affectedTree.value != null)
        return b(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths."),
          this;
      {
        const n = this.affectedTree.subtree(new ie(e));
        return new Js(X(), n, this.revert)
      }
    } else
      return b(j(this.path) === e, "operationForChild called for unrelated child."),
        new Js(le(this.path), this.affectedTree, this.revert)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class us {
  constructor(e, n) {
    this.source = e,
      this.path = n,
      this.type = st.LISTEN_COMPLETE
  }
  operationForChild(e) {
    return q(this.path) ? new us(this.source, X()) : new us(this.source, le(this.path))
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tn {
  constructor(e, n, s) {
    this.source = e,
      this.path = n,
      this.snap = s,
      this.type = st.OVERWRITE
  }
  operationForChild(e) {
    return q(this.path) ? new tn(this.source, X(), this.snap.getImmediateChild(e)) : new tn(this.source, le(this.path), this.snap)
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class hs {
  constructor(e, n, s) {
    this.source = e,
      this.path = n,
      this.children = s,
      this.type = st.MERGE
  }
  operationForChild(e) {
    if (q(this.path)) {
      const n = this.children.subtree(new ie(e));
      return n.isEmpty() ? null : n.value ? new tn(this.source, X(), n.value) : new hs(this.source, X(), n)
    } else
      return b(j(this.path) === e, "Can't get a merge for a child not on the path of the operation"),
        new hs(this.source, le(this.path), this.children)
  }
  toString() {
    return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")"
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class nn {
  constructor(e, n, s) {
    this.node_ = e,
      this.fullyInitialized_ = n,
      this.filtered_ = s
  }
  isFullyInitialized() {
    return this.fullyInitialized_
  }
  isFiltered() {
    return this.filtered_
  }
  isCompleteForPath(e) {
    if (q(e))
      return this.isFullyInitialized() && !this.filtered_;
    const n = j(e);
    return this.isCompleteForChild(n)
  }
  isCompleteForChild(e) {
    return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(e)
  }
  getNode() {
    return this.node_
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tm {
  constructor(e) {
    this.query_ = e,
      this.index_ = this.query_._queryParams.getIndex()
  }
}
function nm(t, e, n, s) {
  const i = []
    , r = [];
  return e.forEach(o => {
    o.type === "child_changed" && t.index_.indexedValueChanged(o.oldSnap, o.snapshotNode) && r.push(qg(o.childName, o.snapshotNode))
  }
  ),
    jn(t, i, "child_removed", e, s, n),
    jn(t, i, "child_added", e, s, n),
    jn(t, i, "child_moved", r, s, n),
    jn(t, i, "child_changed", e, s, n),
    jn(t, i, "value", e, s, n),
    i
}
function jn(t, e, n, s, i, r) {
  const o = s.filter(l => l.type === n);
  o.sort((l, a) => im(t, l, a)),
    o.forEach(l => {
      const a = sm(t, l, r);
      i.forEach(c => {
        c.respondsTo(l.type) && e.push(c.createEvent(a, t.query_))
      }
      )
    }
    )
}
function sm(t, e, n) {
  return e.type === "value" || e.type === "child_removed" || (e.prevName = n.getPredecessorChildName(e.childName, e.snapshotNode, t.index_)),
    e
}
function im(t, e, n) {
  if (e.childName == null || n.childName == null)
    throw Dn("Should only compare child_ events.");
  const s = new V(e.childName, e.snapshotNode)
    , i = new V(n.childName, n.snapshotNode);
  return t.index_.compare(s, i)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ci(t, e) {
  return {
    eventCache: t,
    serverCache: e
  }
}
function Gn(t, e, n, s) {
  return Ci(new nn(e, n, s), t.serverCache)
}
function gu(t, e, n, s) {
  return Ci(t.eventCache, new nn(e, n, s))
}
function vr(t) {
  return t.eventCache.isFullyInitialized() ? t.eventCache.getNode() : null
}
function sn(t) {
  return t.serverCache.isFullyInitialized() ? t.serverCache.getNode() : null
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let ji;
const rm = () => (ji || (ji = new We(V_)),
  ji);
class ae {
  constructor(e, n = rm()) {
    this.value = e,
      this.children = n
  }
  static fromObject(e) {
    let n = new ae(null);
    return $e(e, (s, i) => {
      n = n.set(new ie(s), i)
    }
    ),
      n
  }
  isEmpty() {
    return this.value === null && this.children.isEmpty()
  }
  findRootMostMatchingPathAndValue(e, n) {
    if (this.value != null && n(this.value))
      return {
        path: X(),
        value: this.value
      };
    if (q(e))
      return null;
    {
      const s = j(e)
        , i = this.children.get(s);
      if (i !== null) {
        const r = i.findRootMostMatchingPathAndValue(le(e), n);
        return r != null ? {
          path: ve(new ie(s), r.path),
          value: r.value
        } : null
      } else
        return null
    }
  }
  findRootMostValueAndPath(e) {
    return this.findRootMostMatchingPathAndValue(e, () => !0)
  }
  subtree(e) {
    if (q(e))
      return this;
    {
      const n = j(e)
        , s = this.children.get(n);
      return s !== null ? s.subtree(le(e)) : new ae(null)
    }
  }
  set(e, n) {
    if (q(e))
      return new ae(n, this.children);
    {
      const s = j(e)
        , r = (this.children.get(s) || new ae(null)).set(le(e), n)
        , o = this.children.insert(s, r);
      return new ae(this.value, o)
    }
  }
  remove(e) {
    if (q(e))
      return this.children.isEmpty() ? new ae(null) : new ae(null, this.children);
    {
      const n = j(e)
        , s = this.children.get(n);
      if (s) {
        const i = s.remove(le(e));
        let r;
        return i.isEmpty() ? r = this.children.remove(n) : r = this.children.insert(n, i),
          this.value === null && r.isEmpty() ? new ae(null) : new ae(this.value, r)
      } else
        return this
    }
  }
  get(e) {
    if (q(e))
      return this.value;
    {
      const n = j(e)
        , s = this.children.get(n);
      return s ? s.get(le(e)) : null
    }
  }
  setTree(e, n) {
    if (q(e))
      return n;
    {
      const s = j(e)
        , r = (this.children.get(s) || new ae(null)).setTree(le(e), n);
      let o;
      return r.isEmpty() ? o = this.children.remove(s) : o = this.children.insert(s, r),
        new ae(this.value, o)
    }
  }
  fold(e) {
    return this.fold_(X(), e)
  }
  fold_(e, n) {
    const s = {};
    return this.children.inorderTraversal((i, r) => {
      s[i] = r.fold_(ve(e, i), n)
    }
    ),
      n(e, this.value, s)
  }
  findOnPath(e, n) {
    return this.findOnPath_(e, X(), n)
  }
  findOnPath_(e, n, s) {
    const i = this.value ? s(n, this.value) : !1;
    if (i)
      return i;
    if (q(e))
      return null;
    {
      const r = j(e)
        , o = this.children.get(r);
      return o ? o.findOnPath_(le(e), ve(n, r), s) : null
    }
  }
  foreachOnPath(e, n) {
    return this.foreachOnPath_(e, X(), n)
  }
  foreachOnPath_(e, n, s) {
    if (q(e))
      return this;
    {
      this.value && s(n, this.value);
      const i = j(e)
        , r = this.children.get(i);
      return r ? r.foreachOnPath_(le(e), ve(n, i), s) : new ae(null)
    }
  }
  foreach(e) {
    this.foreach_(X(), e)
  }
  foreach_(e, n) {
    this.children.inorderTraversal((s, i) => {
      i.foreach_(ve(e, s), n)
    }
    ),
      this.value && n(e, this.value)
  }
  foreachChild(e) {
    this.children.inorderTraversal((n, s) => {
      s.value && e(n, s.value)
    }
    )
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ot {
  constructor(e) {
    this.writeTree_ = e
  }
  static empty() {
    return new ot(new ae(null))
  }
}
function Yn(t, e, n) {
  if (q(e))
    return new ot(new ae(n));
  {
    const s = t.writeTree_.findRootMostValueAndPath(e);
    if (s != null) {
      const i = s.path;
      let r = s.value;
      const o = Ue(i, e);
      return r = r.updateChild(o, n),
        new ot(t.writeTree_.set(i, r))
    } else {
      const i = new ae(n)
        , r = t.writeTree_.setTree(e, i);
      return new ot(r)
    }
  }
}
function Ql(t, e, n) {
  let s = t;
  return $e(n, (i, r) => {
    s = Yn(s, ve(e, i), r)
  }
  ),
    s
}
function Jl(t, e) {
  if (q(e))
    return ot.empty();
  {
    const n = t.writeTree_.setTree(e, new ae(null));
    return new ot(n)
  }
}
function Cr(t, e) {
  return rn(t, e) != null
}
function rn(t, e) {
  const n = t.writeTree_.findRootMostValueAndPath(e);
  return n != null ? t.writeTree_.get(n.path).getChild(Ue(n.path, e)) : null
}
function Xl(t) {
  const e = []
    , n = t.writeTree_.value;
  return n != null ? n.isLeafNode() || n.forEachChild(pe, (s, i) => {
    e.push(new V(s, i))
  }
  ) : t.writeTree_.children.inorderTraversal((s, i) => {
    i.value != null && e.push(new V(s, i.value))
  }
  ),
    e
}
function At(t, e) {
  if (q(e))
    return t;
  {
    const n = rn(t, e);
    return n != null ? new ot(new ae(n)) : new ot(t.writeTree_.subtree(e))
  }
}
function Er(t) {
  return t.writeTree_.isEmpty()
}
function Rn(t, e) {
  return mu(X(), t.writeTree_, e)
}
function mu(t, e, n) {
  if (e.value != null)
    return n.updateChild(t, e.value);
  {
    let s = null;
    return e.children.inorderTraversal((i, r) => {
      i === ".priority" ? (b(r.value !== null, "Priority writes must always be leaf nodes"),
        s = r.value) : n = mu(ve(t, i), r, n)
    }
    ),
      !n.getChild(t).isEmpty() && s !== null && (n = n.updateChild(ve(t, ".priority"), s)),
      n
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function lo(t, e) {
  return Eu(e, t)
}
function om(t, e, n, s, i) {
  b(s > t.lastWriteId, "Stacking an older write on top of newer ones"),
    i === void 0 && (i = !0),
    t.allWrites.push({
      path: e,
      snap: n,
      writeId: s,
      visible: i
    }),
    i && (t.visibleWrites = Yn(t.visibleWrites, e, n)),
    t.lastWriteId = s
}
function lm(t, e) {
  for (let n = 0; n < t.allWrites.length; n++) {
    const s = t.allWrites[n];
    if (s.writeId === e)
      return s
  }
  return null
}
function am(t, e) {
  const n = t.allWrites.findIndex(l => l.writeId === e);
  b(n >= 0, "removeWrite called with nonexistent writeId.");
  const s = t.allWrites[n];
  t.allWrites.splice(n, 1);
  let i = s.visible
    , r = !1
    , o = t.allWrites.length - 1;
  for (; i && o >= 0;) {
    const l = t.allWrites[o];
    l.visible && (o >= n && cm(l, s.path) ? i = !1 : nt(s.path, l.path) && (r = !0)),
      o--
  }
  if (i) {
    if (r)
      return um(t),
        !0;
    if (s.snap)
      t.visibleWrites = Jl(t.visibleWrites, s.path);
    else {
      const l = s.children;
      $e(l, a => {
        t.visibleWrites = Jl(t.visibleWrites, ve(s.path, a))
      }
      )
    }
    return !0
  } else
    return !1
}
function cm(t, e) {
  if (t.snap)
    return nt(t.path, e);
  for (const n in t.children)
    if (t.children.hasOwnProperty(n) && nt(ve(t.path, n), e))
      return !0;
  return !1
}
function um(t) {
  t.visibleWrites = yu(t.allWrites, hm, X()),
    t.allWrites.length > 0 ? t.lastWriteId = t.allWrites[t.allWrites.length - 1].writeId : t.lastWriteId = -1
}
function hm(t) {
  return t.visible
}
function yu(t, e, n) {
  let s = ot.empty();
  for (let i = 0; i < t.length; ++i) {
    const r = t[i];
    if (e(r)) {
      const o = r.path;
      let l;
      if (r.snap)
        nt(n, o) ? (l = Ue(n, o),
          s = Yn(s, l, r.snap)) : nt(o, n) && (l = Ue(o, n),
            s = Yn(s, X(), r.snap.getChild(l)));
      else if (r.children) {
        if (nt(n, o))
          l = Ue(n, o),
            s = Ql(s, l, r.children);
        else if (nt(o, n))
          if (l = Ue(o, n),
            q(l))
            s = Ql(s, X(), r.children);
          else {
            const a = Sn(r.children, j(l));
            if (a) {
              const c = a.getChild(le(l));
              s = Yn(s, X(), c)
            }
          }
      } else
        throw Dn("WriteRecord should have .snap or .children")
    }
  }
  return s
}
function vu(t, e, n, s, i) {
  if (!s && !i) {
    const r = rn(t.visibleWrites, e);
    if (r != null)
      return r;
    {
      const o = At(t.visibleWrites, e);
      if (Er(o))
        return n;
      if (n == null && !Cr(o, X()))
        return null;
      {
        const l = n || M.EMPTY_NODE;
        return Rn(o, l)
      }
    }
  } else {
    const r = At(t.visibleWrites, e);
    if (!i && Er(r))
      return n;
    if (!i && n == null && !Cr(r, X()))
      return null;
    {
      const o = function (c) {
        return (c.visible || i) && (!s || !~s.indexOf(c.writeId)) && (nt(c.path, e) || nt(e, c.path))
      }
        , l = yu(t.allWrites, o, e)
        , a = n || M.EMPTY_NODE;
      return Rn(l, a)
    }
  }
}
function fm(t, e, n) {
  let s = M.EMPTY_NODE;
  const i = rn(t.visibleWrites, e);
  if (i)
    return i.isLeafNode() || i.forEachChild(pe, (r, o) => {
      s = s.updateImmediateChild(r, o)
    }
    ),
      s;
  if (n) {
    const r = At(t.visibleWrites, e);
    return n.forEachChild(pe, (o, l) => {
      const a = Rn(At(r, new ie(o)), l);
      s = s.updateImmediateChild(o, a)
    }
    ),
      Xl(r).forEach(o => {
        s = s.updateImmediateChild(o.name, o.node)
      }
      ),
      s
  } else {
    const r = At(t.visibleWrites, e);
    return Xl(r).forEach(o => {
      s = s.updateImmediateChild(o.name, o.node)
    }
    ),
      s
  }
}
function dm(t, e, n, s, i) {
  b(s || i, "Either existingEventSnap or existingServerSnap must exist");
  const r = ve(e, n);
  if (Cr(t.visibleWrites, r))
    return null;
  {
    const o = At(t.visibleWrites, r);
    return Er(o) ? i.getChild(n) : Rn(o, i.getChild(n))
  }
}
function pm(t, e, n, s) {
  const i = ve(e, n)
    , r = rn(t.visibleWrites, i);
  if (r != null)
    return r;
  if (s.isCompleteForChild(n)) {
    const o = At(t.visibleWrites, i);
    return Rn(o, s.getNode().getImmediateChild(n))
  } else
    return null
}
function _m(t, e) {
  return rn(t.visibleWrites, e)
}
function gm(t, e, n, s, i, r, o) {
  let l;
  const a = At(t.visibleWrites, e)
    , c = rn(a, X());
  if (c != null)
    l = c;
  else if (n != null)
    l = Rn(a, n);
  else
    return [];
  if (l = l.withIndex(o),
    !l.isEmpty() && !l.isLeafNode()) {
    const u = []
      , h = o.getCompare()
      , d = r ? l.getReverseIteratorFrom(s, o) : l.getIteratorFrom(s, o);
    let g = d.getNext();
    for (; g && u.length < i;)
      h(g, s) !== 0 && u.push(g),
        g = d.getNext();
    return u
  } else
    return []
}
function mm() {
  return {
    visibleWrites: ot.empty(),
    allWrites: [],
    lastWriteId: -1
  }
}
function Xs(t, e, n, s) {
  return vu(t.writeTree, t.treePath, e, n, s)
}
function ao(t, e) {
  return fm(t.writeTree, t.treePath, e)
}
function Zl(t, e, n, s) {
  return dm(t.writeTree, t.treePath, e, n, s)
}
function Zs(t, e) {
  return _m(t.writeTree, ve(t.treePath, e))
}
function ym(t, e, n, s, i, r) {
  return gm(t.writeTree, t.treePath, e, n, s, i, r)
}
function co(t, e, n) {
  return pm(t.writeTree, t.treePath, e, n)
}
function Cu(t, e) {
  return Eu(ve(t.treePath, e), t.writeTree)
}
function Eu(t, e) {
  return {
    treePath: t,
    writeTree: e
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class vm {
  constructor() {
    this.changeMap = new Map
  }
  trackChildChange(e) {
    const n = e.type
      , s = e.childName;
    b(n === "child_added" || n === "child_changed" || n === "child_removed", "Only child changes supported for tracking"),
      b(s !== ".priority", "Only non-priority child changes can be tracked.");
    const i = this.changeMap.get(s);
    if (i) {
      const r = i.type;
      if (n === "child_added" && r === "child_removed")
        this.changeMap.set(s, as(s, e.snapshotNode, i.snapshotNode));
      else if (n === "child_removed" && r === "child_added")
        this.changeMap.delete(s);
      else if (n === "child_removed" && r === "child_changed")
        this.changeMap.set(s, ls(s, i.oldSnap));
      else if (n === "child_changed" && r === "child_added")
        this.changeMap.set(s, Nn(s, e.snapshotNode));
      else if (n === "child_changed" && r === "child_changed")
        this.changeMap.set(s, as(s, e.snapshotNode, i.oldSnap));
      else
        throw Dn("Illegal combination of changes: " + e + " occurred after " + i)
    } else
      this.changeMap.set(s, e)
  }
  getChanges() {
    return Array.from(this.changeMap.values())
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Cm {
  getCompleteChild(e) {
    return null
  }
  getChildAfterChild(e, n, s) {
    return null
  }
}
const bu = new Cm;
class uo {
  constructor(e, n, s = null) {
    this.writes_ = e,
      this.viewCache_ = n,
      this.optCompleteServerCache_ = s
  }
  getCompleteChild(e) {
    const n = this.viewCache_.eventCache;
    if (n.isCompleteForChild(e))
      return n.getNode().getImmediateChild(e);
    {
      const s = this.optCompleteServerCache_ != null ? new nn(this.optCompleteServerCache_, !0, !1) : this.viewCache_.serverCache;
      return co(this.writes_, e, s)
    }
  }
  getChildAfterChild(e, n, s) {
    const i = this.optCompleteServerCache_ != null ? this.optCompleteServerCache_ : sn(this.viewCache_)
      , r = ym(this.writes_, i, n, 1, s, e);
    return r.length === 0 ? null : r[0]
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Em(t) {
  return {
    filter: t
  }
}
function bm(t, e) {
  b(e.eventCache.getNode().isIndexed(t.filter.getIndex()), "Event snap not indexed"),
    b(e.serverCache.getNode().isIndexed(t.filter.getIndex()), "Server snap not indexed")
}
function wm(t, e, n, s, i) {
  const r = new vm;
  let o, l;
  if (n.type === st.OVERWRITE) {
    const c = n;
    c.source.fromUser ? o = br(t, e, c.path, c.snap, s, i, r) : (b(c.source.fromServer, "Unknown source."),
      l = c.source.tagged || e.serverCache.isFiltered() && !q(c.path),
      o = ei(t, e, c.path, c.snap, s, i, l, r))
  } else if (n.type === st.MERGE) {
    const c = n;
    c.source.fromUser ? o = Tm(t, e, c.path, c.children, s, i, r) : (b(c.source.fromServer, "Unknown source."),
      l = c.source.tagged || e.serverCache.isFiltered(),
      o = wr(t, e, c.path, c.children, s, i, l, r))
  } else if (n.type === st.ACK_USER_WRITE) {
    const c = n;
    c.revert ? o = Nm(t, e, c.path, s, i, r) : o = Sm(t, e, c.path, c.affectedTree, s, i, r)
  } else if (n.type === st.LISTEN_COMPLETE)
    o = xm(t, e, n.path, s, r);
  else
    throw Dn("Unknown operation type: " + n.type);
  const a = r.getChanges();
  return Im(e, o, a),
  {
    viewCache: o,
    changes: a
  }
}
function Im(t, e, n) {
  const s = e.eventCache;
  if (s.isFullyInitialized()) {
    const i = s.getNode().isLeafNode() || s.getNode().isEmpty()
      , r = vr(t);
    (n.length > 0 || !t.eventCache.isFullyInitialized() || i && !s.getNode().equals(r) || !s.getNode().getPriority().equals(r.getPriority())) && n.push(du(vr(e)))
  }
}
function wu(t, e, n, s, i, r) {
  const o = e.eventCache;
  if (Zs(s, n) != null)
    return e;
  {
    let l, a;
    if (q(n))
      if (b(e.serverCache.isFullyInitialized(), "If change path is empty, we must have complete server data"),
        e.serverCache.isFiltered()) {
        const c = sn(e)
          , u = c instanceof M ? c : M.EMPTY_NODE
          , h = ao(s, u);
        l = t.filter.updateFullNode(e.eventCache.getNode(), h, r)
      } else {
        const c = Xs(s, sn(e));
        l = t.filter.updateFullNode(e.eventCache.getNode(), c, r)
      }
    else {
      const c = j(n);
      if (c === ".priority") {
        b(Dt(n) === 1, "Can't have a priority with additional path components");
        const u = o.getNode();
        a = e.serverCache.getNode();
        const h = Zl(s, n, u, a);
        h != null ? l = t.filter.updatePriority(u, h) : l = o.getNode()
      } else {
        const u = le(n);
        let h;
        if (o.isCompleteForChild(c)) {
          a = e.serverCache.getNode();
          const d = Zl(s, n, o.getNode(), a);
          d != null ? h = o.getNode().getImmediateChild(c).updateChild(u, d) : h = o.getNode().getImmediateChild(c)
        } else
          h = co(s, c, e.serverCache);
        h != null ? l = t.filter.updateChild(o.getNode(), c, h, u, i, r) : l = o.getNode()
      }
    }
    return Gn(e, l, o.isFullyInitialized() || q(n), t.filter.filtersNodes())
  }
}
function ei(t, e, n, s, i, r, o, l) {
  const a = e.serverCache;
  let c;
  const u = o ? t.filter : t.filter.getIndexedFilter();
  if (q(n))
    c = u.updateFullNode(a.getNode(), s, null);
  else if (u.filtersNodes() && !a.isFiltered()) {
    const g = a.getNode().updateChild(n, s);
    c = u.updateFullNode(a.getNode(), g, null)
  } else {
    const g = j(n);
    if (!a.isCompleteForPath(n) && Dt(n) > 1)
      return e;
    const C = le(n)
      , U = a.getNode().getImmediateChild(g).updateChild(C, s);
    g === ".priority" ? c = u.updatePriority(a.getNode(), U) : c = u.updateChild(a.getNode(), g, U, C, bu, null)
  }
  const h = gu(e, c, a.isFullyInitialized() || q(n), u.filtersNodes())
    , d = new uo(i, h, r);
  return wu(t, h, n, i, d, l)
}
function br(t, e, n, s, i, r, o) {
  const l = e.eventCache;
  let a, c;
  const u = new uo(i, e, r);
  if (q(n))
    c = t.filter.updateFullNode(e.eventCache.getNode(), s, o),
      a = Gn(e, c, !0, t.filter.filtersNodes());
  else {
    const h = j(n);
    if (h === ".priority")
      c = t.filter.updatePriority(e.eventCache.getNode(), s),
        a = Gn(e, c, l.isFullyInitialized(), l.isFiltered());
    else {
      const d = le(n)
        , g = l.getNode().getImmediateChild(h);
      let C;
      if (q(d))
        C = s;
      else {
        const E = u.getCompleteChild(h);
        E != null ? iu(d) === ".priority" && E.getChild(ou(d)).isEmpty() ? C = E : C = E.updateChild(d, s) : C = M.EMPTY_NODE
      }
      if (g.equals(C))
        a = e;
      else {
        const E = t.filter.updateChild(l.getNode(), h, C, d, u, o);
        a = Gn(e, E, l.isFullyInitialized(), t.filter.filtersNodes())
      }
    }
  }
  return a
}
function ea(t, e) {
  return t.eventCache.isCompleteForChild(e)
}
function Tm(t, e, n, s, i, r, o) {
  let l = e;
  return s.foreach((a, c) => {
    const u = ve(n, a);
    ea(e, j(u)) && (l = br(t, l, u, c, i, r, o))
  }
  ),
    s.foreach((a, c) => {
      const u = ve(n, a);
      ea(e, j(u)) || (l = br(t, l, u, c, i, r, o))
    }
    ),
    l
}
function ta(t, e, n) {
  return n.foreach((s, i) => {
    e = e.updateChild(s, i)
  }
  ),
    e
}
function wr(t, e, n, s, i, r, o, l) {
  if (e.serverCache.getNode().isEmpty() && !e.serverCache.isFullyInitialized())
    return e;
  let a = e, c;
  q(n) ? c = s : c = new ae(null).setTree(n, s);
  const u = e.serverCache.getNode();
  return c.children.inorderTraversal((h, d) => {
    if (u.hasChild(h)) {
      const g = e.serverCache.getNode().getImmediateChild(h)
        , C = ta(t, g, d);
      a = ei(t, a, new ie(h), C, i, r, o, l)
    }
  }
  ),
    c.children.inorderTraversal((h, d) => {
      const g = !e.serverCache.isCompleteForChild(h) && d.value === null;
      if (!u.hasChild(h) && !g) {
        const C = e.serverCache.getNode().getImmediateChild(h)
          , E = ta(t, C, d);
        a = ei(t, a, new ie(h), E, i, r, o, l)
      }
    }
    ),
    a
}
function Sm(t, e, n, s, i, r, o) {
  if (Zs(i, n) != null)
    return e;
  const l = e.serverCache.isFiltered()
    , a = e.serverCache;
  if (s.value != null) {
    if (q(n) && a.isFullyInitialized() || a.isCompleteForPath(n))
      return ei(t, e, n, a.getNode().getChild(n), i, r, l, o);
    if (q(n)) {
      let c = new ae(null);
      return a.getNode().forEachChild(En, (u, h) => {
        c = c.set(new ie(u), h)
      }
      ),
        wr(t, e, n, c, i, r, l, o)
    } else
      return e
  } else {
    let c = new ae(null);
    return s.foreach((u, h) => {
      const d = ve(n, u);
      a.isCompleteForPath(d) && (c = c.set(u, a.getNode().getChild(d)))
    }
    ),
      wr(t, e, n, c, i, r, l, o)
  }
}
function xm(t, e, n, s, i) {
  const r = e.serverCache
    , o = gu(e, r.getNode(), r.isFullyInitialized() || q(n), r.isFiltered());
  return wu(t, o, n, s, bu, i)
}
function Nm(t, e, n, s, i, r) {
  let o;
  if (Zs(s, n) != null)
    return e;
  {
    const l = new uo(s, e, i)
      , a = e.eventCache.getNode();
    let c;
    if (q(n) || j(n) === ".priority") {
      let u;
      if (e.serverCache.isFullyInitialized())
        u = Xs(s, sn(e));
      else {
        const h = e.serverCache.getNode();
        b(h instanceof M, "serverChildren would be complete if leaf node"),
          u = ao(s, h)
      }
      u = u,
        c = t.filter.updateFullNode(a, u, r)
    } else {
      const u = j(n);
      let h = co(s, u, e.serverCache);
      h == null && e.serverCache.isCompleteForChild(u) && (h = a.getImmediateChild(u)),
        h != null ? c = t.filter.updateChild(a, u, h, le(n), l, r) : e.eventCache.getNode().hasChild(u) ? c = t.filter.updateChild(a, u, M.EMPTY_NODE, le(n), l, r) : c = a,
        c.isEmpty() && e.serverCache.isFullyInitialized() && (o = Xs(s, sn(e)),
          o.isLeafNode() && (c = t.filter.updateFullNode(c, o, r)))
    }
    return o = e.serverCache.isFullyInitialized() || Zs(s, X()) != null,
      Gn(e, c, o, t.filter.filtersNodes())
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rm {
  constructor(e, n) {
    this.query_ = e,
      this.eventRegistrations_ = [];
    const s = this.query_._queryParams
      , i = new so(s.getIndex())
      , r = Gg(s);
    this.processor_ = Em(r);
    const o = n.serverCache
      , l = n.eventCache
      , a = i.updateFullNode(M.EMPTY_NODE, o.getNode(), null)
      , c = r.updateFullNode(M.EMPTY_NODE, l.getNode(), null)
      , u = new nn(a, o.isFullyInitialized(), i.filtersNodes())
      , h = new nn(c, l.isFullyInitialized(), r.filtersNodes());
    this.viewCache_ = Ci(h, u),
      this.eventGenerator_ = new tm(this.query_)
  }
  get query() {
    return this.query_
  }
}
function Am(t) {
  return t.viewCache_.serverCache.getNode()
}
function Om(t, e) {
  const n = sn(t.viewCache_);
  return n && (t.query._queryParams.loadsAllData() || !q(e) && !n.getImmediateChild(j(e)).isEmpty()) ? n.getChild(e) : null
}
function na(t) {
  return t.eventRegistrations_.length === 0
}
function Pm(t, e) {
  t.eventRegistrations_.push(e)
}
function sa(t, e, n) {
  const s = [];
  if (n) {
    b(e == null, "A cancel should cancel all event registrations.");
    const i = t.query._path;
    t.eventRegistrations_.forEach(r => {
      const o = r.createCancelEvent(n, i);
      o && s.push(o)
    }
    )
  }
  if (e) {
    let i = [];
    for (let r = 0; r < t.eventRegistrations_.length; ++r) {
      const o = t.eventRegistrations_[r];
      if (!o.matches(e))
        i.push(o);
      else if (e.hasAnyCallback()) {
        i = i.concat(t.eventRegistrations_.slice(r + 1));
        break
      }
    }
    t.eventRegistrations_ = i
  } else
    t.eventRegistrations_ = [];
  return s
}
function ia(t, e, n, s) {
  e.type === st.MERGE && e.source.queryId !== null && (b(sn(t.viewCache_), "We should always have a full cache before handling merges"),
    b(vr(t.viewCache_), "Missing event cache, even though we have a server cache"));
  const i = t.viewCache_
    , r = wm(t.processor_, i, e, n, s);
  return bm(t.processor_, r.viewCache),
    b(r.viewCache.serverCache.isFullyInitialized() || !i.serverCache.isFullyInitialized(), "Once a server snap is complete, it should never go back"),
    t.viewCache_ = r.viewCache,
    Iu(t, r.changes, r.viewCache.eventCache.getNode(), null)
}
function Dm(t, e) {
  const n = t.viewCache_.eventCache
    , s = [];
  return n.getNode().isLeafNode() || n.getNode().forEachChild(pe, (r, o) => {
    s.push(Nn(r, o))
  }
  ),
    n.isFullyInitialized() && s.push(du(n.getNode())),
    Iu(t, s, n.getNode(), e)
}
function Iu(t, e, n, s) {
  const i = s ? [s] : t.eventRegistrations_;
  return nm(t.eventGenerator_, e, n, i)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let ti;
class km {
  constructor() {
    this.views = new Map
  }
}
function Mm(t) {
  b(!ti, "__referenceConstructor has already been defined"),
    ti = t
}
function Fm() {
  return b(ti, "Reference.ts has not been loaded"),
    ti
}
function Lm(t) {
  return t.views.size === 0
}
function ho(t, e, n, s) {
  const i = e.source.queryId;
  if (i !== null) {
    const r = t.views.get(i);
    return b(r != null, "SyncTree gave us an op for an invalid query."),
      ia(r, e, n, s)
  } else {
    let r = [];
    for (const o of t.views.values())
      r = r.concat(ia(o, e, n, s));
    return r
  }
}
function Bm(t, e, n, s, i) {
  const r = e._queryIdentifier
    , o = t.views.get(r);
  if (!o) {
    let l = Xs(n, i ? s : null)
      , a = !1;
    l ? a = !0 : s instanceof M ? (l = ao(n, s),
      a = !1) : (l = M.EMPTY_NODE,
        a = !1);
    const c = Ci(new nn(l, a, !1), new nn(s, i, !1));
    return new Rm(e, c)
  }
  return o
}
function Um(t, e, n, s, i, r) {
  const o = Bm(t, e, s, i, r);
  return t.views.has(e._queryIdentifier) || t.views.set(e._queryIdentifier, o),
    Pm(o, n),
    Dm(o, n)
}
function Wm(t, e, n, s) {
  const i = e._queryIdentifier
    , r = [];
  let o = [];
  const l = kt(t);
  if (i === "default")
    for (const [a, c] of t.views.entries())
      o = o.concat(sa(c, n, s)),
        na(c) && (t.views.delete(a),
          c.query._queryParams.loadsAllData() || r.push(c.query));
  else {
    const a = t.views.get(i);
    a && (o = o.concat(sa(a, n, s)),
      na(a) && (t.views.delete(i),
        a.query._queryParams.loadsAllData() || r.push(a.query)))
  }
  return l && !kt(t) && r.push(new (Fm())(e._repo, e._path)),
  {
    removed: r,
    events: o
  }
}
function Tu(t) {
  const e = [];
  for (const n of t.views.values())
    n.query._queryParams.loadsAllData() || e.push(n);
  return e
}
function bn(t, e) {
  let n = null;
  for (const s of t.views.values())
    n = n || Om(s, e);
  return n
}
function Su(t, e) {
  if (e._queryParams.loadsAllData())
    return Ei(t);
  {
    const s = e._queryIdentifier;
    return t.views.get(s)
  }
}
function xu(t, e) {
  return Su(t, e) != null
}
function kt(t) {
  return Ei(t) != null
}
function Ei(t) {
  for (const e of t.views.values())
    if (e.query._queryParams.loadsAllData())
      return e;
  return null
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let ni;
function Hm(t) {
  b(!ni, "__referenceConstructor has already been defined"),
    ni = t
}
function $m() {
  return b(ni, "Reference.ts has not been loaded"),
    ni
}
let jm = 1;
class ra {
  constructor(e) {
    this.listenProvider_ = e,
      this.syncPointTree_ = new ae(null),
      this.pendingWriteTree_ = mm(),
      this.tagToQueryMap = new Map,
      this.queryToTagMap = new Map
  }
}
function Nu(t, e, n, s, i) {
  return om(t.pendingWriteTree_, e, n, s, i),
    i ? ys(t, new tn(_u(), e, n)) : []
}
function Kt(t, e, n = !1) {
  const s = lm(t.pendingWriteTree_, e);
  if (am(t.pendingWriteTree_, e)) {
    let r = new ae(null);
    return s.snap != null ? r = r.set(X(), !0) : $e(s.children, o => {
      r = r.set(new ie(o), !0)
    }
    ),
      ys(t, new Js(s.path, r, n))
  } else
    return []
}
function bi(t, e, n) {
  return ys(t, new tn(ro(), e, n))
}
function Vm(t, e, n) {
  const s = ae.fromObject(n);
  return ys(t, new hs(ro(), e, s))
}
function zm(t, e) {
  return ys(t, new us(ro(), e))
}
function qm(t, e, n) {
  const s = po(t, n);
  if (s) {
    const i = _o(s)
      , r = i.path
      , o = i.queryId
      , l = Ue(r, e)
      , a = new us(oo(o), l);
    return go(t, r, a)
  } else
    return []
}
function Ir(t, e, n, s, i = !1) {
  const r = e._path
    , o = t.syncPointTree_.get(r);
  let l = [];
  if (o && (e._queryIdentifier === "default" || xu(o, e))) {
    const a = Wm(o, e, n, s);
    Lm(o) && (t.syncPointTree_ = t.syncPointTree_.remove(r));
    const c = a.removed;
    if (l = a.events,
      !i) {
      const u = c.findIndex(d => d._queryParams.loadsAllData()) !== -1
        , h = t.syncPointTree_.findOnPath(r, (d, g) => kt(g));
      if (u && !h) {
        const d = t.syncPointTree_.subtree(r);
        if (!d.isEmpty()) {
          const g = Ym(d);
          for (let C = 0; C < g.length; ++C) {
            const E = g[C]
              , U = E.query
              , P = Ou(t, E);
            t.listenProvider_.startListening(Qn(U), si(t, U), P.hashFn, P.onComplete)
          }
        }
      }
      !h && c.length > 0 && !s && (u ? t.listenProvider_.stopListening(Qn(e), null) : c.forEach(d => {
        const g = t.queryToTagMap.get(wi(d));
        t.listenProvider_.stopListening(Qn(d), g)
      }
      ))
    }
    Qm(t, c)
  }
  return l
}
function Km(t, e, n, s) {
  const i = po(t, s);
  if (i != null) {
    const r = _o(i)
      , o = r.path
      , l = r.queryId
      , a = Ue(o, e)
      , c = new tn(oo(l), a, n);
    return go(t, o, c)
  } else
    return []
}
function Gm(t, e, n, s) {
  const i = po(t, s);
  if (i) {
    const r = _o(i)
      , o = r.path
      , l = r.queryId
      , a = Ue(o, e)
      , c = ae.fromObject(n)
      , u = new hs(oo(l), a, c);
    return go(t, o, u)
  } else
    return []
}
function oa(t, e, n, s = !1) {
  const i = e._path;
  let r = null
    , o = !1;
  t.syncPointTree_.foreachOnPath(i, (d, g) => {
    const C = Ue(d, i);
    r = r || bn(g, C),
      o = o || kt(g)
  }
  );
  let l = t.syncPointTree_.get(i);
  l ? (o = o || kt(l),
    r = r || bn(l, X())) : (l = new km,
      t.syncPointTree_ = t.syncPointTree_.set(i, l));
  let a;
  r != null ? a = !0 : (a = !1,
    r = M.EMPTY_NODE,
    t.syncPointTree_.subtree(i).foreachChild((g, C) => {
      const E = bn(C, X());
      E && (r = r.updateImmediateChild(g, E))
    }
    ));
  const c = xu(l, e);
  if (!c && !e._queryParams.loadsAllData()) {
    const d = wi(e);
    b(!t.queryToTagMap.has(d), "View does not exist, but we have a tag");
    const g = Jm();
    t.queryToTagMap.set(d, g),
      t.tagToQueryMap.set(g, d)
  }
  const u = lo(t.pendingWriteTree_, i);
  let h = Um(l, e, n, u, r, a);
  if (!c && !o && !s) {
    const d = Su(l, e);
    h = h.concat(Xm(t, e, d))
  }
  return h
}
function fo(t, e, n) {
  const i = t.pendingWriteTree_
    , r = t.syncPointTree_.findOnPath(e, (o, l) => {
      const a = Ue(o, e)
        , c = bn(l, a);
      if (c)
        return c
    }
    );
  return vu(i, e, r, n, !0)
}
function ys(t, e) {
  return Ru(e, t.syncPointTree_, null, lo(t.pendingWriteTree_, X()))
}
function Ru(t, e, n, s) {
  if (q(t.path))
    return Au(t, e, n, s);
  {
    const i = e.get(X());
    n == null && i != null && (n = bn(i, X()));
    let r = [];
    const o = j(t.path)
      , l = t.operationForChild(o)
      , a = e.children.get(o);
    if (a && l) {
      const c = n ? n.getImmediateChild(o) : null
        , u = Cu(s, o);
      r = r.concat(Ru(l, a, c, u))
    }
    return i && (r = r.concat(ho(i, t, s, n))),
      r
  }
}
function Au(t, e, n, s) {
  const i = e.get(X());
  n == null && i != null && (n = bn(i, X()));
  let r = [];
  return e.children.inorderTraversal((o, l) => {
    const a = n ? n.getImmediateChild(o) : null
      , c = Cu(s, o)
      , u = t.operationForChild(o);
    u && (r = r.concat(Au(u, l, a, c)))
  }
  ),
    i && (r = r.concat(ho(i, t, s, n))),
    r
}
function Ou(t, e) {
  const n = e.query
    , s = si(t, n);
  return {
    hashFn: () => (Am(e) || M.EMPTY_NODE).hash(),
    onComplete: i => {
      if (i === "ok")
        return s ? qm(t, n._path, s) : zm(t, n._path);
      {
        const r = K_(i, n);
        return Ir(t, n, null, r)
      }
    }
  }
}
function si(t, e) {
  const n = wi(e);
  return t.queryToTagMap.get(n)
}
function wi(t) {
  return t._path.toString() + "$" + t._queryIdentifier
}
function po(t, e) {
  return t.tagToQueryMap.get(e)
}
function _o(t) {
  const e = t.indexOf("$");
  return b(e !== -1 && e < t.length - 1, "Bad queryKey."),
  {
    queryId: t.substr(e + 1),
    path: new ie(t.substr(0, e))
  }
}
function go(t, e, n) {
  const s = t.syncPointTree_.get(e);
  b(s, "Missing sync point for query tag that we're tracking");
  const i = lo(t.pendingWriteTree_, e);
  return ho(s, n, i, null)
}
function Ym(t) {
  return t.fold((e, n, s) => {
    if (n && kt(n))
      return [Ei(n)];
    {
      let i = [];
      return n && (i = Tu(n)),
        $e(s, (r, o) => {
          i = i.concat(o)
        }
        ),
        i
    }
  }
  )
}
function Qn(t) {
  return t._queryParams.loadsAllData() && !t._queryParams.isDefault() ? new ($m())(t._repo, t._path) : t
}
function Qm(t, e) {
  for (let n = 0; n < e.length; ++n) {
    const s = e[n];
    if (!s._queryParams.loadsAllData()) {
      const i = wi(s)
        , r = t.queryToTagMap.get(i);
      t.queryToTagMap.delete(i),
        t.tagToQueryMap.delete(r)
    }
  }
}
function Jm() {
  return jm++
}
function Xm(t, e, n) {
  const s = e._path
    , i = si(t, e)
    , r = Ou(t, n)
    , o = t.listenProvider_.startListening(Qn(e), i, r.hashFn, r.onComplete)
    , l = t.syncPointTree_.subtree(s);
  if (i)
    b(!kt(l.value), "If we're adding a query, it shouldn't be shadowed");
  else {
    const a = l.fold((c, u, h) => {
      if (!q(c) && u && kt(u))
        return [Ei(u).query];
      {
        let d = [];
        return u && (d = d.concat(Tu(u).map(g => g.query))),
          $e(h, (g, C) => {
            d = d.concat(C)
          }
          ),
          d
      }
    }
    );
    for (let c = 0; c < a.length; ++c) {
      const u = a[c];
      t.listenProvider_.stopListening(Qn(u), si(t, u))
    }
  }
  return o
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mo {
  constructor(e) {
    this.node_ = e
  }
  getImmediateChild(e) {
    const n = this.node_.getImmediateChild(e);
    return new mo(n)
  }
  node() {
    return this.node_
  }
}
class yo {
  constructor(e, n) {
    this.syncTree_ = e,
      this.path_ = n
  }
  getImmediateChild(e) {
    const n = ve(this.path_, e);
    return new yo(this.syncTree_, n)
  }
  node() {
    return fo(this.syncTree_, this.path_)
  }
}
const Zm = function (t) {
  return t = t || {},
    t.timestamp = t.timestamp || new Date().getTime(),
    t
}
  , la = function (t, e, n) {
    if (!t || typeof t != "object")
      return t;
    if (b(".sv" in t, "Unexpected leaf node or priority contents"),
      typeof t[".sv"] == "string")
      return ey(t[".sv"], e, n);
    if (typeof t[".sv"] == "object")
      return ty(t[".sv"], e);
    b(!1, "Unexpected server value: " + JSON.stringify(t, null, 2))
  }
  , ey = function (t, e, n) {
    switch (t) {
      case "timestamp":
        return n.timestamp;
      default:
        b(!1, "Unexpected server value: " + t)
    }
  }
  , ty = function (t, e, n) {
    t.hasOwnProperty("increment") || b(!1, "Unexpected server value: " + JSON.stringify(t, null, 2));
    const s = t.increment;
    typeof s != "number" && b(!1, "Unexpected increment value: " + s);
    const i = e.node();
    if (b(i !== null && typeof i < "u", "Expected ChildrenNode.EMPTY_NODE for nulls"),
      !i.isLeafNode())
      return s;
    const o = i.getValue();
    return typeof o != "number" ? s : o + s
  }
  , ny = function (t, e, n, s) {
    return vo(e, new yo(n, t), s)
  }
  , Pu = function (t, e, n) {
    return vo(t, new mo(e), n)
  };
function vo(t, e, n) {
  const s = t.getPriority().val()
    , i = la(s, e.getImmediateChild(".priority"), n);
  let r;
  if (t.isLeafNode()) {
    const o = t
      , l = la(o.getValue(), e, n);
    return l !== o.getValue() || i !== o.getPriority().val() ? new be(l, xe(i)) : t
  } else {
    const o = t;
    return r = o,
      i !== o.getPriority().val() && (r = r.updatePriority(new be(i))),
      o.forEachChild(pe, (l, a) => {
        const c = vo(a, e.getImmediateChild(l), n);
        c !== a && (r = r.updateImmediateChild(l, c))
      }
      ),
      r
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Co {
  constructor(e = "", n = null, s = {
    children: {},
    childCount: 0
  }) {
    this.name = e,
      this.parent = n,
      this.node = s
  }
}
function Eo(t, e) {
  let n = e instanceof ie ? e : new ie(e)
    , s = t
    , i = j(n);
  for (; i !== null;) {
    const r = Sn(s.node.children, i) || {
      children: {},
      childCount: 0
    };
    s = new Co(i, s, r),
      n = le(n),
      i = j(n)
  }
  return s
}
function Ln(t) {
  return t.node.value
}
function Du(t, e) {
  t.node.value = e,
    Tr(t)
}
function ku(t) {
  return t.node.childCount > 0
}
function sy(t) {
  return Ln(t) === void 0 && !ku(t)
}
function Ii(t, e) {
  $e(t.node.children, (n, s) => {
    e(new Co(n, t, s))
  }
  )
}
function Mu(t, e, n, s) {
  n && !s && e(t),
    Ii(t, i => {
      Mu(i, e, !0, s)
    }
    ),
    n && s && e(t)
}
function iy(t, e, n) {
  let s = n ? t : t.parent;
  for (; s !== null;) {
    if (e(s))
      return !0;
    s = s.parent
  }
  return !1
}
function vs(t) {
  return new ie(t.parent === null ? t.name : vs(t.parent) + "/" + t.name)
}
function Tr(t) {
  t.parent !== null && ry(t.parent, t.name, t)
}
function ry(t, e, n) {
  const s = sy(n)
    , i = bt(t.node.children, e);
  s && i ? (delete t.node.children[e],
    t.node.childCount--,
    Tr(t)) : !s && !i && (t.node.children[e] = n.node,
      t.node.childCount++,
      Tr(t))
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const oy = /[\[\].#$\/\u0000-\u001F\u007F]/
  , ly = /[\[\].#$\u0000-\u001F\u007F]/
  , Vi = 10 * 1024 * 1024
  , Fu = function (t) {
    return typeof t == "string" && t.length !== 0 && !oy.test(t)
  }
  , Lu = function (t) {
    return typeof t == "string" && t.length !== 0 && !ly.test(t)
  }
  , ay = function (t) {
    return t && (t = t.replace(/^\/*\.info(\/|$)/, "/")),
      Lu(t)
  }
  , Bu = function (t, e, n, s) {
    s && e === void 0 || bo(Gr(t, "value"), e, n)
  }
  , bo = function (t, e, n) {
    const s = n instanceof ie ? new Sg(n, t) : n;
    if (e === void 0)
      throw new Error(t + "contains undefined " + Ht(s));
    if (typeof e == "function")
      throw new Error(t + "contains a function " + Ht(s) + " with contents = " + e.toString());
    if (Lc(e))
      throw new Error(t + "contains " + e.toString() + " " + Ht(s));
    if (typeof e == "string" && e.length > Vi / 3 && yi(e) > Vi)
      throw new Error(t + "contains a string greater than " + Vi + " utf8 bytes " + Ht(s) + " ('" + e.substring(0, 50) + "...')");
    if (e && typeof e == "object") {
      let i = !1
        , r = !1;
      if ($e(e, (o, l) => {
        if (o === ".value")
          i = !0;
        else if (o !== ".priority" && o !== ".sv" && (r = !0,
          !Fu(o)))
          throw new Error(t + " contains an invalid key (" + o + ") " + Ht(s) + `.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);
        xg(s, o),
          bo(t, l, s),
          Ng(s)
      }
      ),
        i && r)
        throw new Error(t + ' contains ".value" child ' + Ht(s) + " in addition to actual children.")
    }
  }
  , Uu = function (t, e, n, s) {
    if (!(s && n === void 0) && !Lu(n))
      throw new Error(Gr(t, e) + 'was an invalid path = "' + n + `". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)
  }
  , cy = function (t, e, n, s) {
    n && (n = n.replace(/^\/*\.info(\/|$)/, "/")),
      Uu(t, e, n, s)
  }
  , wo = function (t, e) {
    if (j(e) === ".info")
      throw new Error(t + " failed = Can't modify data under /.info/")
  }
  , uy = function (t, e) {
    const n = e.path.toString();
    if (typeof e.repoInfo.host != "string" || e.repoInfo.host.length === 0 || !Fu(e.repoInfo.namespace) && e.repoInfo.host.split(":")[0] !== "localhost" || n.length !== 0 && !ay(n))
      throw new Error(Gr(t, "url") + `must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class hy {
  constructor() {
    this.eventLists_ = [],
      this.recursionDepth_ = 0
  }
}
function Io(t, e) {
  let n = null;
  for (let s = 0; s < e.length; s++) {
    const i = e[s]
      , r = i.getPath();
    n !== null && !eo(r, n.path) && (t.eventLists_.push(n),
      n = null),
      n === null && (n = {
        events: [],
        path: r
      }),
      n.events.push(i)
  }
  n && t.eventLists_.push(n)
}
function Wu(t, e, n) {
  Io(t, n),
    Hu(t, s => eo(s, e))
}
function Ct(t, e, n) {
  Io(t, n),
    Hu(t, s => nt(s, e) || nt(e, s))
}
function Hu(t, e) {
  t.recursionDepth_++;
  let n = !0;
  for (let s = 0; s < t.eventLists_.length; s++) {
    const i = t.eventLists_[s];
    if (i) {
      const r = i.path;
      e(r) ? (fy(t.eventLists_[s]),
        t.eventLists_[s] = null) : n = !1
    }
  }
  n && (t.eventLists_ = []),
    t.recursionDepth_--
}
function fy(t) {
  for (let e = 0; e < t.events.length; e++) {
    const n = t.events[e];
    if (n !== null) {
      t.events[e] = null;
      const s = n.getEventRunner();
      Xt && Ae("event: " + n.toString()),
        Fn(s)
    }
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const dy = "repo_interrupt"
  , py = 25;
class _y {
  constructor(e, n, s, i) {
    this.repoInfo_ = e,
      this.forceRestClient_ = n,
      this.authTokenProvider_ = s,
      this.appCheckProvider_ = i,
      this.dataUpdateCount = 0,
      this.statsListener_ = null,
      this.eventQueue_ = new hy,
      this.nextWriteId_ = 1,
      this.interceptServerDataCallback_ = null,
      this.onDisconnect_ = Qs(),
      this.transactionQueueTree_ = new Co,
      this.persistentConnection_ = null,
      this.key = this.repoInfo_.toURLString()
  }
  toString() {
    return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host
  }
}
function gy(t, e, n) {
  if (t.stats_ = Xr(t.repoInfo_),
    t.forceRestClient_ || J_())
    t.server_ = new Ys(t.repoInfo_, (s, i, r, o) => {
      aa(t, s, i, r, o)
    }
      , t.authTokenProvider_, t.appCheckProvider_),
      setTimeout(() => ca(t, !0), 0);
  else {
    if (typeof n < "u" && n !== null) {
      if (typeof n != "object")
        throw new Error("Only objects are supported for option databaseAuthVariableOverride");
      try {
        Ie(n)
      } catch (s) {
        throw new Error("Invalid authOverride provided: " + s)
      }
    }
    t.persistentConnection_ = new mt(t.repoInfo_, e, (s, i, r, o) => {
      aa(t, s, i, r, o)
    }
      , s => {
        ca(t, s)
      }
      , s => {
        my(t, s)
      }
      , t.authTokenProvider_, t.appCheckProvider_, n),
      t.server_ = t.persistentConnection_
  }
  t.authTokenProvider_.addTokenChangeListener(s => {
    t.server_.refreshAuthToken(s)
  }
  ),
    t.appCheckProvider_.addTokenChangeListener(s => {
      t.server_.refreshAppCheckToken(s.token)
    }
    ),
    t.statsReporter_ = ng(t.repoInfo_, () => new em(t.stats_, t.server_)),
    t.infoData_ = new Yg,
    t.infoSyncTree_ = new ra({
      startListening: (s, i, r, o) => {
        let l = [];
        const a = t.infoData_.getNode(s._path);
        return a.isEmpty() || (l = bi(t.infoSyncTree_, s._path, a),
          setTimeout(() => {
            o("ok")
          }
            , 0)),
          l
      }
      ,
      stopListening: () => { }
    }),
    So(t, "connected", !1),
    t.serverSyncTree_ = new ra({
      startListening: (s, i, r, o) => (t.server_.listen(s, r, i, (l, a) => {
        const c = o(l, a);
        Ct(t.eventQueue_, s._path, c)
      }
      ),
        []),
      stopListening: (s, i) => {
        t.server_.unlisten(s, i)
      }
    })
}
function $u(t) {
  const n = t.infoData_.getNode(new ie(".info/serverTimeOffset")).val() || 0;
  return new Date().getTime() + n
}
function To(t) {
  return Zm({
    timestamp: $u(t)
  })
}
function aa(t, e, n, s, i) {
  t.dataUpdateCount++;
  const r = new ie(e);
  n = t.interceptServerDataCallback_ ? t.interceptServerDataCallback_(e, n) : n;
  let o = [];
  if (i)
    if (s) {
      const a = js(n, c => xe(c));
      o = Gm(t.serverSyncTree_, r, a, i)
    } else {
      const a = xe(n);
      o = Km(t.serverSyncTree_, r, a, i)
    }
  else if (s) {
    const a = js(n, c => xe(c));
    o = Vm(t.serverSyncTree_, r, a)
  } else {
    const a = xe(n);
    o = bi(t.serverSyncTree_, r, a)
  }
  let l = r;
  o.length > 0 && (l = Ti(t, r)),
    Ct(t.eventQueue_, l, o)
}
function ca(t, e) {
  So(t, "connected", e),
    e === !1 && vy(t)
}
function my(t, e) {
  $e(e, (n, s) => {
    So(t, n, s)
  }
  )
}
function So(t, e, n) {
  const s = new ie("/.info/" + e)
    , i = xe(n);
  t.infoData_.updateSnapshot(s, i);
  const r = bi(t.infoSyncTree_, s, i);
  Ct(t.eventQueue_, s, r)
}
function ju(t) {
  return t.nextWriteId_++
}
function yy(t, e, n, s, i) {
  xo(t, "set", {
    path: e.toString(),
    value: n,
    priority: s
  });
  const r = To(t)
    , o = xe(n, s)
    , l = fo(t.serverSyncTree_, e)
    , a = Pu(o, l, r)
    , c = ju(t)
    , u = Nu(t.serverSyncTree_, e, a, c, !0);
  Io(t.eventQueue_, u),
    t.server_.put(e.toString(), o.val(!0), (d, g) => {
      const C = d === "ok";
      C || He("set at " + e + " failed: " + d);
      const E = Kt(t.serverSyncTree_, c, !C);
      Ct(t.eventQueue_, e, E),
        by(t, i, d, g)
    }
    );
  const h = Gu(t, e);
  Ti(t, h),
    Ct(t.eventQueue_, h, [])
}
function vy(t) {
  xo(t, "onDisconnectEvents");
  const e = To(t)
    , n = Qs();
  yr(t.onDisconnect_, X(), (i, r) => {
    const o = ny(i, r, t.serverSyncTree_, e);
    pu(n, i, o)
  }
  );
  let s = [];
  yr(n, X(), (i, r) => {
    s = s.concat(bi(t.serverSyncTree_, i, r));
    const o = Gu(t, i);
    Ti(t, o)
  }
  ),
    t.onDisconnect_ = Qs(),
    Ct(t.eventQueue_, X(), s)
}
function Cy(t, e, n) {
  let s;
  j(e._path) === ".info" ? s = oa(t.infoSyncTree_, e, n) : s = oa(t.serverSyncTree_, e, n),
    Wu(t.eventQueue_, e._path, s)
}
function ua(t, e, n) {
  let s;
  j(e._path) === ".info" ? s = Ir(t.infoSyncTree_, e, n) : s = Ir(t.serverSyncTree_, e, n),
    Wu(t.eventQueue_, e._path, s)
}
function Ey(t) {
  t.persistentConnection_ && t.persistentConnection_.interrupt(dy)
}
function xo(t, ...e) {
  let n = "";
  t.persistentConnection_ && (n = t.persistentConnection_.id + ":"),
    Ae(n, ...e)
}
function by(t, e, n, s) {
  e && Fn(() => {
    if (n === "ok")
      e(null);
    else {
      const i = (n || "error").toUpperCase();
      let r = i;
      s && (r += ": " + s);
      const o = new Error(r);
      o.code = i,
        e(o)
    }
  }
  )
}
function Vu(t, e, n) {
  return fo(t.serverSyncTree_, e, n) || M.EMPTY_NODE
}
function No(t, e = t.transactionQueueTree_) {
  if (e || Si(t, e),
    Ln(e)) {
    const n = qu(t, e);
    b(n.length > 0, "Sending zero length transaction queue"),
      n.every(i => i.status === 0) && wy(t, vs(e), n)
  } else
    ku(e) && Ii(e, n => {
      No(t, n)
    }
    )
}
function wy(t, e, n) {
  const s = n.map(c => c.currentWriteId)
    , i = Vu(t, e, s);
  let r = i;
  const o = i.hash();
  for (let c = 0; c < n.length; c++) {
    const u = n[c];
    b(u.status === 0, "tryToSendTransactionQueue_: items in queue should all be run."),
      u.status = 1,
      u.retryCount++;
    const h = Ue(e, u.path);
    r = r.updateChild(h, u.currentOutputSnapshotRaw)
  }
  const l = r.val(!0)
    , a = e;
  t.server_.put(a.toString(), l, c => {
    xo(t, "transaction put response", {
      path: a.toString(),
      status: c
    });
    let u = [];
    if (c === "ok") {
      const h = [];
      for (let d = 0; d < n.length; d++)
        n[d].status = 2,
          u = u.concat(Kt(t.serverSyncTree_, n[d].currentWriteId)),
          n[d].onComplete && h.push(() => n[d].onComplete(null, !0, n[d].currentOutputSnapshotResolved)),
          n[d].unwatcher();
      Si(t, Eo(t.transactionQueueTree_, e)),
        No(t, t.transactionQueueTree_),
        Ct(t.eventQueue_, e, u);
      for (let d = 0; d < h.length; d++)
        Fn(h[d])
    } else {
      if (c === "datastale")
        for (let h = 0; h < n.length; h++)
          n[h].status === 3 ? n[h].status = 4 : n[h].status = 0;
      else {
        He("transaction at " + a.toString() + " failed: " + c);
        for (let h = 0; h < n.length; h++)
          n[h].status = 4,
            n[h].abortReason = c
      }
      Ti(t, e)
    }
  }
    , o)
}
function Ti(t, e) {
  const n = zu(t, e)
    , s = vs(n)
    , i = qu(t, n);
  return Iy(t, i, s),
    s
}
function Iy(t, e, n) {
  if (e.length === 0)
    return;
  const s = [];
  let i = [];
  const o = e.filter(l => l.status === 0).map(l => l.currentWriteId);
  for (let l = 0; l < e.length; l++) {
    const a = e[l]
      , c = Ue(n, a.path);
    let u = !1, h;
    if (b(c !== null, "rerunTransactionsUnderNode_: relativePath should not be null."),
      a.status === 4)
      u = !0,
        h = a.abortReason,
        i = i.concat(Kt(t.serverSyncTree_, a.currentWriteId, !0));
    else if (a.status === 0)
      if (a.retryCount >= py)
        u = !0,
          h = "maxretry",
          i = i.concat(Kt(t.serverSyncTree_, a.currentWriteId, !0));
      else {
        const d = Vu(t, a.path, o);
        a.currentInputSnapshot = d;
        const g = e[l].update(d.val());
        if (g !== void 0) {
          bo("transaction failed: Data returned ", g, a.path);
          let C = xe(g);
          typeof g == "object" && g != null && bt(g, ".priority") || (C = C.updatePriority(d.getPriority()));
          const U = a.currentWriteId
            , P = To(t)
            , he = Pu(C, d, P);
          a.currentOutputSnapshotRaw = C,
            a.currentOutputSnapshotResolved = he,
            a.currentWriteId = ju(t),
            o.splice(o.indexOf(U), 1),
            i = i.concat(Nu(t.serverSyncTree_, a.path, he, a.currentWriteId, a.applyLocally)),
            i = i.concat(Kt(t.serverSyncTree_, U, !0))
        } else
          u = !0,
            h = "nodata",
            i = i.concat(Kt(t.serverSyncTree_, a.currentWriteId, !0))
      }
    Ct(t.eventQueue_, n, i),
      i = [],
      u && (e[l].status = 2,
        function (d) {
          setTimeout(d, Math.floor(0))
        }(e[l].unwatcher),
        e[l].onComplete && (h === "nodata" ? s.push(() => e[l].onComplete(null, !1, e[l].currentInputSnapshot)) : s.push(() => e[l].onComplete(new Error(h), !1, null))))
  }
  Si(t, t.transactionQueueTree_);
  for (let l = 0; l < s.length; l++)
    Fn(s[l]);
  No(t, t.transactionQueueTree_)
}
function zu(t, e) {
  let n, s = t.transactionQueueTree_;
  for (n = j(e); n !== null && Ln(s) === void 0;)
    s = Eo(s, n),
      e = le(e),
      n = j(e);
  return s
}
function qu(t, e) {
  const n = [];
  return Ku(t, e, n),
    n.sort((s, i) => s.order - i.order),
    n
}
function Ku(t, e, n) {
  const s = Ln(e);
  if (s)
    for (let i = 0; i < s.length; i++)
      n.push(s[i]);
  Ii(e, i => {
    Ku(t, i, n)
  }
  )
}
function Si(t, e) {
  const n = Ln(e);
  if (n) {
    let s = 0;
    for (let i = 0; i < n.length; i++)
      n[i].status !== 2 && (n[s] = n[i],
        s++);
    n.length = s,
      Du(e, n.length > 0 ? n : void 0)
  }
  Ii(e, s => {
    Si(t, s)
  }
  )
}
function Gu(t, e) {
  const n = vs(zu(t, e))
    , s = Eo(t.transactionQueueTree_, e);
  return iy(s, i => {
    zi(t, i)
  }
  ),
    zi(t, s),
    Mu(s, i => {
      zi(t, i)
    }
    ),
    n
}
function zi(t, e) {
  const n = Ln(e);
  if (n) {
    const s = [];
    let i = []
      , r = -1;
    for (let o = 0; o < n.length; o++)
      n[o].status === 3 || (n[o].status === 1 ? (b(r === o - 1, "All SENT items should be at beginning of queue."),
        r = o,
        n[o].status = 3,
        n[o].abortReason = "set") : (b(n[o].status === 0, "Unexpected transaction status in abort"),
          n[o].unwatcher(),
          i = i.concat(Kt(t.serverSyncTree_, n[o].currentWriteId, !0)),
          n[o].onComplete && s.push(n[o].onComplete.bind(null, new Error("set"), !1, null))));
    r === -1 ? Du(e, void 0) : n.length = r + 1,
      Ct(t.eventQueue_, vs(e), i);
    for (let o = 0; o < s.length; o++)
      Fn(s[o])
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ty(t) {
  let e = "";
  const n = t.split("/");
  for (let s = 0; s < n.length; s++)
    if (n[s].length > 0) {
      let i = n[s];
      try {
        i = decodeURIComponent(i.replace(/\+/g, " "))
      } catch { }
      e += "/" + i
    }
  return e
}
function Sy(t) {
  const e = {};
  t.charAt(0) === "?" && (t = t.substring(1));
  for (const n of t.split("&")) {
    if (n.length === 0)
      continue;
    const s = n.split("=");
    s.length === 2 ? e[decodeURIComponent(s[0])] = decodeURIComponent(s[1]) : He(`Invalid query segment '${n}' in query '${t}'`)
  }
  return e
}
const ha = function (t, e) {
  const n = xy(t)
    , s = n.namespace;
  n.domain === "firebase.com" && vt(n.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),
    (!s || s === "undefined") && n.domain !== "localhost" && vt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),
    n.secure || $_();
  const i = n.scheme === "ws" || n.scheme === "wss";
  return {
    repoInfo: new Yc(n.host, n.secure, s, i, e, "", s !== n.subdomain),
    path: new ie(n.pathString)
  }
}
  , xy = function (t) {
    let e = ""
      , n = ""
      , s = ""
      , i = ""
      , r = ""
      , o = !0
      , l = "https"
      , a = 443;
    if (typeof t == "string") {
      let c = t.indexOf("//");
      c >= 0 && (l = t.substring(0, c - 1),
        t = t.substring(c + 2));
      let u = t.indexOf("/");
      u === -1 && (u = t.length);
      let h = t.indexOf("?");
      h === -1 && (h = t.length),
        e = t.substring(0, Math.min(u, h)),
        u < h && (i = Ty(t.substring(u, h)));
      const d = Sy(t.substring(Math.min(t.length, h)));
      c = e.indexOf(":"),
        c >= 0 ? (o = l === "https" || l === "wss",
          a = parseInt(e.substring(c + 1), 10)) : c = e.length;
      const g = e.slice(0, c);
      if (g.toLowerCase() === "localhost")
        n = "localhost";
      else if (g.split(".").length <= 2)
        n = g;
      else {
        const C = e.indexOf(".");
        s = e.substring(0, C).toLowerCase(),
          n = e.substring(C + 1),
          r = s
      }
      "ns" in d && (r = d.ns)
    }
    return {
      host: e,
      port: a,
      domain: n,
      subdomain: s,
      secure: o,
      scheme: l,
      pathString: i,
      namespace: r
    }
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fa = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz"
  , Ny = function () {
    let t = 0;
    const e = [];
    return function (n) {
      const s = n === t;
      t = n;
      let i;
      const r = new Array(8);
      for (i = 7; i >= 0; i--)
        r[i] = fa.charAt(n % 64),
          n = Math.floor(n / 64);
      b(n === 0, "Cannot push at time == 0");
      let o = r.join("");
      if (s) {
        for (i = 11; i >= 0 && e[i] === 63; i--)
          e[i] = 0;
        e[i]++
      } else
        for (i = 0; i < 12; i++)
          e[i] = Math.floor(Math.random() * 64);
      for (i = 0; i < 12; i++)
        o += fa.charAt(e[i]);
      return b(o.length === 20, "nextPushId: Length should be 20."),
        o
    }
  }();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Yu {
  constructor(e, n, s, i) {
    this.eventType = e,
      this.eventRegistration = n,
      this.snapshot = s,
      this.prevName = i
  }
  getPath() {
    const e = this.snapshot.ref;
    return this.eventType === "value" ? e._path : e.parent._path
  }
  getEventType() {
    return this.eventType
  }
  getEventRunner() {
    return this.eventRegistration.getEventRunner(this)
  }
  toString() {
    return this.getPath().toString() + ":" + this.eventType + ":" + Ie(this.snapshot.exportVal())
  }
}
class Qu {
  constructor(e, n, s) {
    this.eventRegistration = e,
      this.error = n,
      this.path = s
  }
  getPath() {
    return this.path
  }
  getEventType() {
    return "cancel"
  }
  getEventRunner() {
    return this.eventRegistration.getEventRunner(this)
  }
  toString() {
    return this.path.toString() + ":cancel"
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ry {
  constructor(e, n) {
    this.snapshotCallback = e,
      this.cancelCallback = n
  }
  onValue(e, n) {
    this.snapshotCallback.call(null, e, n)
  }
  onCancel(e) {
    return b(this.hasCancelCallback, "Raising a cancel event on a listener with no cancel callback"),
      this.cancelCallback.call(null, e)
  }
  get hasCancelCallback() {
    return !!this.cancelCallback
  }
  matches(e) {
    return this.snapshotCallback === e.snapshotCallback || this.snapshotCallback.userCallback !== void 0 && this.snapshotCallback.userCallback === e.snapshotCallback.userCallback && this.snapshotCallback.context === e.snapshotCallback.context
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ro {
  constructor(e, n, s, i) {
    this._repo = e,
      this._path = n,
      this._queryParams = s,
      this._orderByCalled = i
  }
  get key() {
    return q(this._path) ? null : iu(this._path)
  }
  get ref() {
    return new wt(this._repo, this._path)
  }
  get _queryIdentifier() {
    const e = Gl(this._queryParams)
      , n = Qr(e);
    return n === "{}" ? "default" : n
  }
  get _queryObject() {
    return Gl(this._queryParams)
  }
  isEqual(e) {
    if (e = kn(e),
      !(e instanceof Ro))
      return !1;
    const n = this._repo === e._repo
      , s = eo(this._path, e._path)
      , i = this._queryIdentifier === e._queryIdentifier;
    return n && s && i
  }
  toJSON() {
    return this.toString()
  }
  toString() {
    return this._repo.toString() + Tg(this._path)
  }
}
class wt extends Ro {
  constructor(e, n) {
    super(e, n, new io, !1)
  }
  get parent() {
    const e = ou(this._path);
    return e === null ? null : new wt(this._repo, e)
  }
  get root() {
    let e = this;
    for (; e.parent !== null;)
      e = e.parent;
    return e
  }
}
class fs {
  constructor(e, n, s) {
    this._node = e,
      this.ref = n,
      this._index = s
  }
  get priority() {
    return this._node.getPriority().val()
  }
  get key() {
    return this.ref.key
  }
  get size() {
    return this._node.numChildren()
  }
  child(e) {
    const n = new ie(e)
      , s = Mt(this.ref, e);
    return new fs(this._node.getChild(n), s, pe)
  }
  exists() {
    return !this._node.isEmpty()
  }
  exportVal() {
    return this._node.val(!0)
  }
  forEach(e) {
    return this._node.isLeafNode() ? !1 : !!this._node.forEachChild(this._index, (s, i) => e(new fs(i, Mt(this.ref, s), pe)))
  }
  hasChild(e) {
    const n = new ie(e);
    return !this._node.getChild(n).isEmpty()
  }
  hasChildren() {
    return this._node.isLeafNode() ? !1 : !this._node.isEmpty()
  }
  toJSON() {
    return this.exportVal()
  }
  val() {
    return this._node.val()
  }
}
function da(t, e) {
  return t = kn(t),
    t._checkNotDeleted("ref"),
    e !== void 0 ? Mt(t._root, e) : t._root
}
function Mt(t, e) {
  return t = kn(t),
    j(t._path) === null ? cy("child", "path", e, !1) : Uu("child", "path", e, !1),
    new wt(t._repo, ve(t._path, e))
}
function Ay(t, e) {
  t = kn(t),
    wo("push", t._path),
    Bu("push", e, t._path, !0);
  const n = $u(t._repo)
    , s = Ny(n)
    , i = Mt(t, s)
    , r = Mt(t, s);
  let o;
  return e != null ? o = Ao(r, e).then(() => r) : o = Promise.resolve(r),
    i.then = o.then.bind(o),
    i.catch = o.then.bind(o, void 0),
    i
}
function pa(t) {
  return wo("remove", t._path),
    Ao(t, null)
}
function Ao(t, e) {
  t = kn(t),
    wo("set", t._path),
    Bu("set", e, t._path, !1);
  const n = new mi;
  return yy(t._repo, t._path, e, null, n.wrapCallback(() => { }
  )),
    n.promise
}
class Oo {
  constructor(e) {
    this.callbackContext = e
  }
  respondsTo(e) {
    return e === "value"
  }
  createEvent(e, n) {
    const s = n._queryParams.getIndex();
    return new Yu("value", this, new fs(e.snapshotNode, new wt(n._repo, n._path), s))
  }
  getEventRunner(e) {
    return e.getEventType() === "cancel" ? () => this.callbackContext.onCancel(e.error) : () => this.callbackContext.onValue(e.snapshot, null)
  }
  createCancelEvent(e, n) {
    return this.callbackContext.hasCancelCallback ? new Qu(this, e, n) : null
  }
  matches(e) {
    return e instanceof Oo ? !e.callbackContext || !this.callbackContext ? !0 : e.callbackContext.matches(this.callbackContext) : !1
  }
  hasAnyCallback() {
    return this.callbackContext !== null
  }
}
class Po {
  constructor(e, n) {
    this.eventType = e,
      this.callbackContext = n
  }
  respondsTo(e) {
    let n = e === "children_added" ? "child_added" : e;
    return n = n === "children_removed" ? "child_removed" : n,
      this.eventType === n
  }
  createCancelEvent(e, n) {
    return this.callbackContext.hasCancelCallback ? new Qu(this, e, n) : null
  }
  createEvent(e, n) {
    b(e.childName != null, "Child events should have a childName.");
    const s = Mt(new wt(n._repo, n._path), e.childName)
      , i = n._queryParams.getIndex();
    return new Yu(e.type, this, new fs(e.snapshotNode, s, i), e.prevName)
  }
  getEventRunner(e) {
    return e.getEventType() === "cancel" ? () => this.callbackContext.onCancel(e.error) : () => this.callbackContext.onValue(e.snapshot, e.prevName)
  }
  matches(e) {
    return e instanceof Po ? this.eventType === e.eventType && (!this.callbackContext || !e.callbackContext || this.callbackContext.matches(e.callbackContext)) : !1
  }
  hasAnyCallback() {
    return !!this.callbackContext
  }
}
function Oy(t, e, n, s, i) {
  let r;
  if (typeof s == "object" && (r = void 0,
    i = s),
    typeof s == "function" && (r = s),
    i && i.onlyOnce) {
    const a = n
      , c = (u, h) => {
        ua(t._repo, t, l),
          a(u, h)
      }
      ;
    c.userCallback = n.userCallback,
      c.context = n.context,
      n = c
  }
  const o = new Ry(n, r || void 0)
    , l = e === "value" ? new Oo(o) : new Po(e, o);
  return Cy(t._repo, t, l),
    () => ua(t._repo, t, l)
}
function _a(t, e, n, s) {
  return Oy(t, "value", e, n, s)
}
Mm(wt);
Hm(wt);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Py = "FIREBASE_DATABASE_EMULATOR_HOST"
  , Sr = {};
let Dy = !1;
function ky(t, e, n, s) {
  t.repoInfo_ = new Yc(`${e}:${n}`, !1, t.repoInfo_.namespace, t.repoInfo_.webSocketOnly, t.repoInfo_.nodeAdmin, t.repoInfo_.persistenceKey, t.repoInfo_.includeNamespaceInQueryParams),
    s && (t.authTokenProvider_ = s)
}
function My(t, e, n, s, i) {
  let r = s || t.options.databaseURL;
  r === void 0 && (t.options.projectId || vt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),
    Ae("Using default host for project ", t.options.projectId),
    r = `${t.options.projectId}-default-rtdb.firebaseio.com`);
  let o = ha(r, i), l = o.repoInfo, a, c;
  typeof process < "u" && process.env && (c = process.env[Py]),
    c ? (a = !0,
      r = `http://${c}?ns=${l.namespace}`,
      o = ha(r, i),
      l = o.repoInfo) : a = !o.repoInfo.secure;
  const u = i && a ? new Cn(Cn.OWNER) : new Z_(t.name, t.options, e);
  uy("Invalid Firebase Database URL", o),
    q(o.path) || vt("Database URL must point to the root of a Firebase Database (not including a child path).");
  const h = Ly(l, t, u, new X_(t.name, n));
  return new By(h, t)
}
function Fy(t, e) {
  const n = Sr[e];
  (!n || n[t.key] !== t) && vt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),
    Ey(t),
    delete n[t.key]
}
function Ly(t, e, n, s) {
  let i = Sr[e.name];
  i || (i = {},
    Sr[e.name] = i);
  let r = i[t.toURLString()];
  return r && vt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),
    r = new _y(t, Dy, n, s),
    i[t.toURLString()] = r,
    r
}
class By {
  constructor(e, n) {
    this._repoInternal = e,
      this.app = n,
      this.type = "database",
      this._instanceStarted = !1
  }
  get _repo() {
    return this._instanceStarted || (gy(this._repoInternal, this.app.options.appId, this.app.options.databaseAuthVariableOverride),
      this._instanceStarted = !0),
      this._repoInternal
  }
  get _root() {
    return this._rootInternal || (this._rootInternal = new wt(this._repo, X())),
      this._rootInternal
  }
  _delete() {
    return this._rootInternal !== null && (Fy(this._repo, this.app.name),
      this._repoInternal = null,
      this._rootInternal = null),
      Promise.resolve()
  }
  _checkNotDeleted(e) {
    this._rootInternal === null && vt("Cannot call " + e + " on a deleted database.")
  }
}
function Ju(t = x_(), e) {
  const n = w_(t, "database").getImmediate({
    identifier: e
  })
    , s = yp("database");
  return s && Xu(n, ...s),
    n
}
function Xu(t, e, n, s = {}) {
  t = kn(t),
    t._checkNotDeleted("useEmulator"),
    t._instanceStarted && vt("Cannot call useEmulator() after instance has already been initialized.");
  const i = t._repoInternal;
  let r;
  if (i.repoInfo_.nodeAdmin)
    s.mockUserToken && vt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),
      r = new Cn(Cn.OWNER);
  else if (s.mockUserToken) {
    const o = typeof s.mockUserToken == "string" ? s.mockUserToken : Cp(s.mockUserToken, t.app.options.projectId);
    r = new Cn(o)
  }
  ky(i, e, n, r)
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Uy(t) {
  L_(S_),
    zs(new is("database", (e, { instanceIdentifier: n }) => {
      const s = e.getProvider("app").getImmediate()
        , i = e.getProvider("auth-internal")
        , r = e.getProvider("app-check-internal");
      return My(s, i, r, n)
    }
      , "PUBLIC").setMultipleInstances(!0)),
    yn(Ol, Pl, t),
    yn(Ol, Pl, "esm2017")
}
mt.prototype.simpleListen = function (t, e) {
  this.sendRequest("q", {
    p: t
  }, e)
}
  ;
mt.prototype.echo = function (t, e) {
  this.sendRequest("echo", {
    d: t
  }, e)
}
  ;
Uy();
const Bn = t => (Xh("data-v-b4865a0e"),
  t = t(),
  Zh(),
  t)
  , Wy = {
    class: "lt-sm:h-screen h-50vh flex flex-col"
  }
  , Hy = {
    class: "flex px-2"
  }
  , $y = {
    class: "ml-auto flex gap-2 items-center children:case-upper children:text-size-3"
  }
  , jy = Bn(() => J("hr", {
    class: "mx-0 mt-0"
  }, null, -1))
  , Vy = {
    key: 0,
    class: "flex flex-col flex-1"
  }
  , zy = {
    class: "mr-auto"
  }
  , qy = {
    class: "player-line mt-auto"
  }
  , Ky = Bn(() => J("span", {
    class: "mr-auto"
  }, "Index", -1))
  , Gy = {
    key: 0,
    class: "player-line"
  }
  , Yy = Bn(() => J("span", {
    class: "mr-auto"
  }, "Me", -1))
  , Qy = Bn(() => J("hr", {
    class: "mx-0"
  }, null, -1))
  , Jy = {
    key: 1,
    class: "flex flex-col gap-4 my-4 h-52"
  }
  , Xy = {
    class: "font-bold text-center"
  }
  , Zy = {
    class: "flex gap-2 justify-center children:transition-colors"
  }
  , ev = ["onClick"]
  , tv = {
    class: "flex gap-2 justify-center children:transition-colors"
  }
  , nv = ["onClick"]
  , sv = ["disabled"]
  , iv = {
    key: 2,
    class: "flex flex-col justify-center items-center my-4 gap-4 h-52"
  }
  , rv = Bn(() => J("div", {
    class: "text-size-6"
  }, "Done.", -1))
  , ov = {
    key: 0
  }
  , lv = {
    key: 1
  }
  , av = {
    key: 1
  }
  , cv = Bn(() => J("div", {
    class: "p-8"
  }, " Made with ❤️ ", -1))
  , uv = Xa({
    __name: "MPQRoom",
    emits: ["exit"],
    setup(t, { emit: e }) {
      const s = [1, 2, 3, 4]
        , i = {
          r: 34,
          g: 197,
          b: 94,
          a: 1
        }
        , r = {
          r: 248,
          g: 113,
          b: 113,
          a: .4
        }
        , o = Ju()
        , l = da(o, `rooms/${mn.value.roomId}`);
      function a() {
        const F = Yt(!1);
        return _a(da(o, ".info/connected"), k => {
          F.value = k.val() === !0
        }
        ),
          F
      }
      function c(F, k) {
        let N = null;
        const H = Yt()
          , Y = Mt(l, "players");
        Qt(H, (ne, fe) => {
          if (!N)
            throw new Error("playerRef is null");
          fe && Ao(N, ne)
        }
          , {
            deep: !0
          }),
          Qt(F, ne => {
            if (!ne)
              return;
            const fe = Object.entries(ne.players).find(([Me, ft]) => ft.nickName === k);
            if (fe) {
              const [Me, ft] = fe;
              N = Mt(Y, Me),
                H.value = ft
            } else {
              const Me = {
                nickName: k,
                answers: Array(10).fill(0),
                triedAnswers: []
              };
              N = Ay(Y, Me),
                H.value = Me
            }
          }
          ),
          $r(() => {
            N && pa(N)
          }
          );
        function $(ne, fe) {
          H.value && (H.value.answers[ne] = fe)
        }
        function z(ne, fe, Me) {
          H.value && (H.value.triedAnswers || (H.value.triedAnswers = []),
            H.value.triedAnswers[ne] || (H.value.triedAnswers[ne] = []),
            Me ? H.value.triedAnswers[ne] = H.value.triedAnswers[ne].filter(ft => ft !== fe) : H.value.triedAnswers[ne].push(fe))
        }
        const Ee = ks(() => !H.value || !F.value ? null : Object.fromEntries(Object.entries(F.value.players).filter(([ne, fe]) => ne !== N.key)))
          , on = ks(() => {
            var Ft;
            if (!H.value || !Ee.value)
              return null;
            const ne = H.value.answers.findIndex(Fe => Fe === 0);
            if (ne === -1)
              return null;
            const fe = Object.values(Ee.value).sort((Fe, je) => {
              const Le = Fe.answers.some(f => f > 0) ? 1 : 0;
              return (je.answers.some(f => f > 0) ? 1 : 0) - Le
            }
            )
              , Me = 3
              , ft = ((Ft = H.value.triedAnswers) == null ? void 0 : Ft[ne]) ?? []
              , Cs = u(s).filter(Fe => ft.indexOf(Fe[Me]) === -1).filter(Fe => {
                var je;
                for (let Le = 0; Le < Me; Le++) {
                  const lt = fe[Le];
                  if (!lt)
                    break;
                  const f = lt.answers[ne];
                  if (f !== 0 && Fe[Le] !== f || (((je = lt.triedAnswers) == null ? void 0 : je[ne]) ?? []).indexOf(Fe[Le]) !== -1)
                    return !1
                }
                return !0
              }
              )
              , Je = s.map(Fe => {
                const je = Cs.reduce((Le, lt) => lt[Me] === Fe ? Le + 1 : Le, 0);
                return {
                  value: Fe,
                  probability: je / Cs.length
                }
              }
              );
            return {
              index: ne,
              values: Je
            }
          }
          );
        return {
          player: H,
          otherPlayers: Ee,
          nextPossible: on,
          updateAnswer: $,
          updateTriedAnswer: z
        }
      }
      function u(F) {
        const k = F.slice()
          , N = k.length
          , H = [k.slice()]
          , Y = Array(N).fill(0);
        let $ = 1, z, Ee;
        for (; $ < N;)
          Y[$] < $ ? (z = $ % 2 && Y[$],
            Ee = k[$],
            k[$] = k[z],
            k[z] = Ee,
            ++Y[$],
            $ = 1,
            H.push(k.slice())) : (Y[$] = 0,
              ++$);
        return H
      }
      function h() {
        const F = Ba();
        let k = null;
        const N = Y => {
          Y.exists() ? F.value = Y.val() : F.value = {
            players: {}
          }
        }
          ;
        ec(() => {
          k = _a(l, N)
        }
        ),
          jr(() => {
            k == null || k()
          }
          );
        function H() {
          pa(l)
        }
        return {
          room: F,
          reset: H
        }
      }
      const d = a()
        , { room: g, reset: C } = h()
        , { player: E, otherPlayers: U, nextPossible: P, updateAnswer: he, updateTriedAnswer: D } = c(g, mn.value.nickName);
      function ee(F) {
        return P.value ? P.value.values.find(k => k.value === F).probability > 0 : !1
      }
      function ge(F, k, N) {
        const H = N * 2 - 1
          , Y = F.a - k.a
          , z = ((H * Y === -1 ? H : (H + Y) / (1 + H * Y)) + 1) / 2
          , Ee = 1 - z;
        return {
          r: Math.round(F.r * z + k.r * Ee),
          g: Math.round(F.g * z + k.g * Ee),
          b: Math.round(F.b * z + k.b * Ee),
          a: F.a * N + k.a * (1 - N)
        }
      }
      function Qe() {
        confirm("Are you sure to reset?") && C()
      }
      function G(F) {
        if (!ee(F) && !confirm(`Are you sure to set to ${F}?`))
          return;
        const k = P.value.index;
        he(k, F)
      }
      function O(F) {
        const k = !ee(F)
          , N = P.value.index;
        D(N, F, k)
      }
      function te() {
        const F = P.value.index - 1;
        he(F, 0)
      }
      function ue(F) {
        const k = P.value.values.find(H => H.value === F)
          , N = ge(i, r, k.probability);
        return {
          backgroundColor: `rgba(${N.r}, ${N.g}, ${N.b}, ${N.a})`
        }
      }
      const Te = ks(() => E.value ? E.value.answers.reduce((k, N) => k + N, 0) / 10 : 0);
      return (F, k) => (_e(),
        ye("div", Wy, [J("div", Hy, [J("h3", null, "Room ID: " + dt(Se(mn).roomId), 1), J("div", $y, [Se(g) ? (_e(),
          ye("button", {
            key: 0,
            onClick: Qe
          }, "reset")) : Pi("", !0), J("button", {
            onClick: k[0] || (k[0] = N => e("exit"))
          }, "exit")])]), jy, Se(d) && Se(g) ? (_e(),
            ye("div", Vy, [(_e(!0),
              ye(Re, null, an(Se(U), (N, H) => (_e(),
                ye("div", {
                  key: H,
                  class: "player-line"
                }, [J("span", zy, dt(N.nickName), 1), (_e(!0),
                  ye(Re, null, an(N.answers, (Y, $) => (_e(),
                    ye("span", {
                      class: fn(["cell answer", {
                        unknown: Y === 0
                      }]),
                      key: $
                    }, dt(Y), 3))), 128))]))), 128)), J("div", qy, [Ky, (_e(),
                      ye(Re, null, an(10, N => J("span", {
                        class: "cell",
                        key: N
                      }, dt(N), 1)), 64))]), Se(E) ? (_e(),
                        ye("div", Gy, [Yy, (_e(!0),
                          ye(Re, null, an(Se(E).answers, (N, H) => (_e(),
                            ye("span", {
                              class: fn(["cell answer", {
                                unknown: N === 0
                              }]),
                              key: H
                            }, dt(N), 3))), 128))])) : Pi("", !0), Qy, Se(P) ? (_e(),
                              ye("div", Jy, [J("span", Xy, "Current: " + dt(Se(P).index + 1), 1), J("div", Zy, [(_e(),
                                ye(Re, null, an(s, N => J("button", {
                                  key: N,
                                  style: ii(ue(N)),
                                  onClick: H => G(N)
                                }, dt(N), 13, ev)), 64))]), J("div", tv, [(_e(),
                                  ye(Re, null, an(s, N => J("button", {
                                    key: N,
                                    class: fn(["bg-opacity-40", ee(N) ? "bg-red" : "bg-dark-50"]),
                                    onClick: H => O(N)
                                  }, dt(N), 11, nv)), 64))]), J("button", {
                                    disabled: Se(P).index === 0,
                                    onClick: te,
                                    class: "case-upper self-center transition-colors"
                                  }, "undo", 8, sv)])) : (_e(),
                                    ye("div", iv, [rv, J("div", null, [J("div", null, "Avg: " + dt(Se(Te)), 1), Se(Te) < 2.5 ? (_e(),
                                      ye("div", ov, "You are lucky guy!")) : Se(Te) > 3 ? (_e(),
                                        ye("div", lv, "You have a hard time.")) : Pi("", !0)]), J("button", {
                                          onClick: k[1] || (k[1] = N => Se(he)(10 - 1, 0)),
                                          class: "case-upper"
                                        }, "undo")]))])) : (_e(),
                                          ye("p", av, " Not connected. ")), cv]))
    }
  });
const hv = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, i] of e)
    n[s] = i;
  return n
}
  , fv = hv(uv, [["__scopeId", "data-v-b4865a0e"]])
  , dv = {
    key: 1
  }
  , pv = J("h2", null, "Please input nickname and room ID:", -1)
  , _v = J("button", {
    type: "submit"
  }, "Join", -1)
  , gv = J("p", null, "Use on your phone", -1)
  , mv = ["src"]
  , yv = Xa({
    __name: "App",
    setup(t) {
      const e = Yt(!1)
        , n = Yt(mn.value.roomId ?? "")
        , s = Yt(mn.value.nickName ?? "");
      function i(o) {
        const l = n.value.trim().toLowerCase()
          , a = s.value.trim();
        !l || !a || (mn.value = {
          roomId: l,
          nickName: a
        },
          e.value = !0,
          o.preventDefault())
      }
      const r = encodeURIComponent(location.href);
      return (o, l) => e.value ? (_e(),
        hc(fv, {
          key: 0,
          onExit: l[0] || (l[0] = a => e.value = !1)
        })) : (_e(),
          ye("div", dv, [pv, J("form", {
            class: "flex flex-col items-center gap-4 children:text-center",
            onSubmit: i
          }, [Ko(J("input", {
            "onUpdate:modelValue": l[1] || (l[1] = a => s.value = a),
            placeholder: "Nickname",
            required: "",
            maxlength: "12",
            class: "text-size-6 w-8ch"
          }, null, 512), [[hl, s.value]]), Ko(J("input", {
            "onUpdate:modelValue": l[2] || (l[2] = a => n.value = a),
            placeholder: "Room ID",
            required: "",
            maxlength: "8",
            class: "text-size-8 w-8ch font-mono"
          }, null, 512), [[hl, n.value]]), _v], 32), J("div", null, [gv, J("img", {
            title: "QR code",
            src: "https://quickchart.io/qr?format=svg&margin=2&text=" + Se(r)
          }, null, 8, mv)])]))
    }
  });
var vv = "firebase"
  , Cv = "9.15.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
yn(vv, Cv, "app");
const Ev = {
  apiKey: "AIzaSyDhPenQYB2oDmXs5mSWtKzoyiSuND4uJc4",
  authDomain: "maplestory-helper.firebaseapp.com",
  databaseURL: "https://maplestory-helper-default-rtdb.firebaseio.com",
  projectId: "maplestory-helper",
  storageBucket: "maplestory-helper.appspot.com",
  messagingSenderId: "353918151741",
  appId: "1:353918151741:web:8ce6304051640509a48e54",
  measurementId: "G-JFY0HE5PTP"
}
  , bv = Oc(Ev)
  , wv = Ju(bv);
location.hostname === "localhost" && Xu(wv, "localhost", 9e3);
Id(yv).mount("#app");