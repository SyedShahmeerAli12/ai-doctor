"use strict";
var SimliLib = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/livekit-client/dist/livekit-client.umd.js
  var require_livekit_client_umd = __commonJS({
    "node_modules/livekit-client/dist/livekit-client.umd.js"(exports, module) {
      !(function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).LivekitClient = {});
      })(exports, (function(e) {
        "use strict";
        function t(e2, t2) {
          return t2.forEach((function(t3) {
            t3 && "string" != typeof t3 && !Array.isArray(t3) && Object.keys(t3).forEach((function(n2) {
              if ("default" !== n2 && !(n2 in e2)) {
                var i2 = Object.getOwnPropertyDescriptor(t3, n2);
                Object.defineProperty(e2, n2, i2.get ? i2 : { enumerable: true, get: function() {
                  return t3[n2];
                } });
              }
            }));
          })), Object.freeze(e2);
        }
        var n = Object.defineProperty, i = (e2, t2, i2) => ((e3, t3, i3) => t3 in e3 ? n(e3, t3, { enumerable: true, configurable: true, writable: true, value: i3 }) : e3[t3] = i3)(e2, "symbol" != typeof t2 ? t2 + "" : t2, i2);
        class r {
          constructor() {
            i(this, "_locking"), i(this, "_locks"), this._locking = Promise.resolve(), this._locks = 0;
          }
          isLocked() {
            return this._locks > 0;
          }
          lock() {
            let e2;
            this._locks += 1;
            const t2 = new Promise(((t3) => e2 = () => {
              this._locks -= 1, t3();
            })), n2 = this._locking.then((() => e2));
            return this._locking = this._locking.then((() => t2)), n2;
          }
        }
        function s(e2, t2) {
          if (!e2) throw new Error(t2);
        }
        const a = 34028234663852886e22, o = -34028234663852886e22, c = 4294967295, d = 2147483647, l = -2147483648;
        function u(e2) {
          if ("number" != typeof e2) throw new Error("invalid int 32: " + typeof e2);
          if (!Number.isInteger(e2) || e2 > d || e2 < l) throw new Error("invalid int 32: " + e2);
        }
        function h(e2) {
          if ("number" != typeof e2) throw new Error("invalid uint 32: " + typeof e2);
          if (!Number.isInteger(e2) || e2 > c || e2 < 0) throw new Error("invalid uint 32: " + e2);
        }
        function p(e2) {
          if ("number" != typeof e2) throw new Error("invalid float 32: " + typeof e2);
          if (Number.isFinite(e2) && (e2 > a || e2 < o)) throw new Error("invalid float 32: " + e2);
        }
        const m = /* @__PURE__ */ Symbol("@bufbuild/protobuf/enum-type");
        function g(e2) {
          const t2 = e2[m];
          return s(t2, "missing enum type on enum object"), t2;
        }
        function v(e2, t2, n2, i2) {
          e2[m] = f(t2, n2.map(((t3) => ({ no: t3.no, name: t3.name, localName: e2[t3.no] }))));
        }
        function f(e2, t2, n2) {
          const i2 = /* @__PURE__ */ Object.create(null), r2 = /* @__PURE__ */ Object.create(null), s2 = [];
          for (const e3 of t2) {
            const t3 = y(e3);
            s2.push(t3), i2[e3.name] = t3, r2[e3.no] = t3;
          }
          return { typeName: e2, values: s2, findName: (e3) => i2[e3], findNumber: (e3) => r2[e3] };
        }
        function k(e2, t2, n2) {
          const i2 = {};
          for (const e3 of t2) {
            const t3 = y(e3);
            i2[t3.localName] = t3.no, i2[t3.no] = t3.localName;
          }
          return v(i2, e2, t2), i2;
        }
        function y(e2) {
          return "localName" in e2 ? e2 : Object.assign(Object.assign({}, e2), { localName: e2.name });
        }
        class b {
          equals(e2) {
            return this.getType().runtime.util.equals(this.getType(), this, e2);
          }
          clone() {
            return this.getType().runtime.util.clone(this);
          }
          fromBinary(e2, t2) {
            const n2 = this.getType().runtime.bin, i2 = n2.makeReadOptions(t2);
            return n2.readMessage(this, i2.readerFactory(e2), e2.byteLength, i2), this;
          }
          fromJson(e2, t2) {
            const n2 = this.getType(), i2 = n2.runtime.json, r2 = i2.makeReadOptions(t2);
            return i2.readMessage(n2, e2, r2, this), this;
          }
          fromJsonString(e2, t2) {
            let n2;
            try {
              n2 = JSON.parse(e2);
            } catch (e3) {
              throw new Error("cannot decode ".concat(this.getType().typeName, " from JSON: ").concat(e3 instanceof Error ? e3.message : String(e3)));
            }
            return this.fromJson(n2, t2);
          }
          toBinary(e2) {
            const t2 = this.getType().runtime.bin, n2 = t2.makeWriteOptions(e2), i2 = n2.writerFactory();
            return t2.writeMessage(this, i2, n2), i2.finish();
          }
          toJson(e2) {
            const t2 = this.getType().runtime.json, n2 = t2.makeWriteOptions(e2);
            return t2.writeMessage(this, n2);
          }
          toJsonString(e2) {
            var t2;
            const n2 = this.toJson(e2);
            return JSON.stringify(n2, null, null !== (t2 = null == e2 ? void 0 : e2.prettySpaces) && void 0 !== t2 ? t2 : 0);
          }
          toJSON() {
            return this.toJson({ emitDefaultValues: true });
          }
          getType() {
            return Object.getPrototypeOf(this).constructor;
          }
        }
        function T() {
          let e2 = 0, t2 = 0;
          for (let n3 = 0; n3 < 28; n3 += 7) {
            let i2 = this.buf[this.pos++];
            if (e2 |= (127 & i2) << n3, 0 == (128 & i2)) return this.assertBounds(), [e2, t2];
          }
          let n2 = this.buf[this.pos++];
          if (e2 |= (15 & n2) << 28, t2 = (112 & n2) >> 4, 0 == (128 & n2)) return this.assertBounds(), [e2, t2];
          for (let n3 = 3; n3 <= 31; n3 += 7) {
            let i2 = this.buf[this.pos++];
            if (t2 |= (127 & i2) << n3, 0 == (128 & i2)) return this.assertBounds(), [e2, t2];
          }
          throw new Error("invalid varint");
        }
        function S(e2, t2, n2) {
          for (let i3 = 0; i3 < 28; i3 += 7) {
            const r3 = e2 >>> i3, s2 = !(r3 >>> 7 == 0 && 0 == t2), a2 = 255 & (s2 ? 128 | r3 : r3);
            if (n2.push(a2), !s2) return;
          }
          const i2 = e2 >>> 28 & 15 | (7 & t2) << 4, r2 = !(t2 >> 3 == 0);
          if (n2.push(255 & (r2 ? 128 | i2 : i2)), r2) {
            for (let e3 = 3; e3 < 31; e3 += 7) {
              const i3 = t2 >>> e3, r3 = !(i3 >>> 7 == 0), s2 = 255 & (r3 ? 128 | i3 : i3);
              if (n2.push(s2), !r3) return;
            }
            n2.push(t2 >>> 31 & 1);
          }
        }
        const E = 4294967296;
        function C(e2) {
          const t2 = "-" === e2[0];
          t2 && (e2 = e2.slice(1));
          const n2 = 1e6;
          let i2 = 0, r2 = 0;
          function s2(t3, s3) {
            const a2 = Number(e2.slice(t3, s3));
            r2 *= n2, i2 = i2 * n2 + a2, i2 >= E && (r2 += i2 / E | 0, i2 %= E);
          }
          return s2(-24, -18), s2(-18, -12), s2(-12, -6), s2(-6), t2 ? P(i2, r2) : R(i2, r2);
        }
        function w(e2, t2) {
          if ({ lo: e2, hi: t2 } = (function(e3, t3) {
            return { lo: e3 >>> 0, hi: t3 >>> 0 };
          })(e2, t2), t2 <= 2097151) return String(E * t2 + e2);
          const n2 = 16777215 & (e2 >>> 24 | t2 << 8), i2 = t2 >> 16 & 65535;
          let r2 = (16777215 & e2) + 6777216 * n2 + 6710656 * i2, s2 = n2 + 8147497 * i2, a2 = 2 * i2;
          const o2 = 1e7;
          return r2 >= o2 && (s2 += Math.floor(r2 / o2), r2 %= o2), s2 >= o2 && (a2 += Math.floor(s2 / o2), s2 %= o2), a2.toString() + I(s2) + I(r2);
        }
        function R(e2, t2) {
          return { lo: 0 | e2, hi: 0 | t2 };
        }
        function P(e2, t2) {
          return t2 = ~t2, e2 ? e2 = 1 + ~e2 : t2 += 1, R(e2, t2);
        }
        const I = (e2) => {
          const t2 = String(e2);
          return "0000000".slice(t2.length) + t2;
        };
        function D(e2, t2) {
          if (e2 >= 0) {
            for (; e2 > 127; ) t2.push(127 & e2 | 128), e2 >>>= 7;
            t2.push(e2);
          } else {
            for (let n2 = 0; n2 < 9; n2++) t2.push(127 & e2 | 128), e2 >>= 7;
            t2.push(1);
          }
        }
        function _() {
          let e2 = this.buf[this.pos++], t2 = 127 & e2;
          if (0 == (128 & e2)) return this.assertBounds(), t2;
          if (e2 = this.buf[this.pos++], t2 |= (127 & e2) << 7, 0 == (128 & e2)) return this.assertBounds(), t2;
          if (e2 = this.buf[this.pos++], t2 |= (127 & e2) << 14, 0 == (128 & e2)) return this.assertBounds(), t2;
          if (e2 = this.buf[this.pos++], t2 |= (127 & e2) << 21, 0 == (128 & e2)) return this.assertBounds(), t2;
          e2 = this.buf[this.pos++], t2 |= (15 & e2) << 28;
          for (let t3 = 5; 0 != (128 & e2) && t3 < 10; t3++) e2 = this.buf[this.pos++];
          if (0 != (128 & e2)) throw new Error("invalid varint");
          return this.assertBounds(), t2 >>> 0;
        }
        const M = (function() {
          const e2 = new DataView(new ArrayBuffer(8));
          if ("function" == typeof BigInt && "function" == typeof e2.getBigInt64 && "function" == typeof e2.getBigUint64 && "function" == typeof e2.setBigInt64 && "function" == typeof e2.setBigUint64 && ("object" != typeof process || "object" != typeof process.env || "1" !== process.env.BUF_BIGINT_DISABLE)) {
            const t3 = BigInt("-9223372036854775808"), n3 = BigInt("9223372036854775807"), i2 = BigInt("0"), r2 = BigInt("18446744073709551615");
            return { zero: BigInt(0), supported: true, parse(e3) {
              const i3 = "bigint" == typeof e3 ? e3 : BigInt(e3);
              if (i3 > n3 || i3 < t3) throw new Error("int64 invalid: ".concat(e3));
              return i3;
            }, uParse(e3) {
              const t4 = "bigint" == typeof e3 ? e3 : BigInt(e3);
              if (t4 > r2 || t4 < i2) throw new Error("uint64 invalid: ".concat(e3));
              return t4;
            }, enc(t4) {
              return e2.setBigInt64(0, this.parse(t4), true), { lo: e2.getInt32(0, true), hi: e2.getInt32(4, true) };
            }, uEnc(t4) {
              return e2.setBigInt64(0, this.uParse(t4), true), { lo: e2.getInt32(0, true), hi: e2.getInt32(4, true) };
            }, dec: (t4, n4) => (e2.setInt32(0, t4, true), e2.setInt32(4, n4, true), e2.getBigInt64(0, true)), uDec: (t4, n4) => (e2.setInt32(0, t4, true), e2.setInt32(4, n4, true), e2.getBigUint64(0, true)) };
          }
          const t2 = (e3) => s(/^-?[0-9]+$/.test(e3), "int64 invalid: ".concat(e3)), n2 = (e3) => s(/^[0-9]+$/.test(e3), "uint64 invalid: ".concat(e3));
          return { zero: "0", supported: false, parse: (e3) => ("string" != typeof e3 && (e3 = e3.toString()), t2(e3), e3), uParse: (e3) => ("string" != typeof e3 && (e3 = e3.toString()), n2(e3), e3), enc: (e3) => ("string" != typeof e3 && (e3 = e3.toString()), t2(e3), C(e3)), uEnc: (e3) => ("string" != typeof e3 && (e3 = e3.toString()), n2(e3), C(e3)), dec: (e3, t3) => (function(e4, t4) {
            let n3 = R(e4, t4);
            const i2 = 2147483648 & n3.hi;
            i2 && (n3 = P(n3.lo, n3.hi));
            const r2 = w(n3.lo, n3.hi);
            return i2 ? "-" + r2 : r2;
          })(e3, t3), uDec: (e3, t3) => w(e3, t3) };
        })();
        var O, A, N;
        function L(e2, t2, n2) {
          if (t2 === n2) return true;
          if (e2 == O.BYTES) {
            if (!(t2 instanceof Uint8Array && n2 instanceof Uint8Array)) return false;
            if (t2.length !== n2.length) return false;
            for (let e3 = 0; e3 < t2.length; e3++) if (t2[e3] !== n2[e3]) return false;
            return true;
          }
          switch (e2) {
            case O.UINT64:
            case O.FIXED64:
            case O.INT64:
            case O.SFIXED64:
            case O.SINT64:
              return t2 == n2;
          }
          return false;
        }
        function x(e2, t2) {
          switch (e2) {
            case O.BOOL:
              return false;
            case O.UINT64:
            case O.FIXED64:
            case O.INT64:
            case O.SFIXED64:
            case O.SINT64:
              return 0 == t2 ? M.zero : "0";
            case O.DOUBLE:
            case O.FLOAT:
              return 0;
            case O.BYTES:
              return new Uint8Array(0);
            case O.STRING:
              return "";
            default:
              return 0;
          }
        }
        function U(e2, t2) {
          switch (e2) {
            case O.BOOL:
              return false === t2;
            case O.STRING:
              return "" === t2;
            case O.BYTES:
              return t2 instanceof Uint8Array && !t2.byteLength;
            default:
              return 0 == t2;
          }
        }
        !(function(e2) {
          e2[e2.DOUBLE = 1] = "DOUBLE", e2[e2.FLOAT = 2] = "FLOAT", e2[e2.INT64 = 3] = "INT64", e2[e2.UINT64 = 4] = "UINT64", e2[e2.INT32 = 5] = "INT32", e2[e2.FIXED64 = 6] = "FIXED64", e2[e2.FIXED32 = 7] = "FIXED32", e2[e2.BOOL = 8] = "BOOL", e2[e2.STRING = 9] = "STRING", e2[e2.BYTES = 12] = "BYTES", e2[e2.UINT32 = 13] = "UINT32", e2[e2.SFIXED32 = 15] = "SFIXED32", e2[e2.SFIXED64 = 16] = "SFIXED64", e2[e2.SINT32 = 17] = "SINT32", e2[e2.SINT64 = 18] = "SINT64";
        })(O || (O = {})), (function(e2) {
          e2[e2.BIGINT = 0] = "BIGINT", e2[e2.STRING = 1] = "STRING";
        })(A || (A = {})), (function(e2) {
          e2[e2.Varint = 0] = "Varint", e2[e2.Bit64 = 1] = "Bit64", e2[e2.LengthDelimited = 2] = "LengthDelimited", e2[e2.StartGroup = 3] = "StartGroup", e2[e2.EndGroup = 4] = "EndGroup", e2[e2.Bit32 = 5] = "Bit32";
        })(N || (N = {}));
        class F {
          constructor(e2) {
            this.stack = [], this.textEncoder = null != e2 ? e2 : new TextEncoder(), this.chunks = [], this.buf = [];
          }
          finish() {
            this.chunks.push(new Uint8Array(this.buf));
            let e2 = 0;
            for (let t3 = 0; t3 < this.chunks.length; t3++) e2 += this.chunks[t3].length;
            let t2 = new Uint8Array(e2), n2 = 0;
            for (let e3 = 0; e3 < this.chunks.length; e3++) t2.set(this.chunks[e3], n2), n2 += this.chunks[e3].length;
            return this.chunks = [], t2;
          }
          fork() {
            return this.stack.push({ chunks: this.chunks, buf: this.buf }), this.chunks = [], this.buf = [], this;
          }
          join() {
            let e2 = this.finish(), t2 = this.stack.pop();
            if (!t2) throw new Error("invalid state, fork stack empty");
            return this.chunks = t2.chunks, this.buf = t2.buf, this.uint32(e2.byteLength), this.raw(e2);
          }
          tag(e2, t2) {
            return this.uint32((e2 << 3 | t2) >>> 0);
          }
          raw(e2) {
            return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(e2), this;
          }
          uint32(e2) {
            for (h(e2); e2 > 127; ) this.buf.push(127 & e2 | 128), e2 >>>= 7;
            return this.buf.push(e2), this;
          }
          int32(e2) {
            return u(e2), D(e2, this.buf), this;
          }
          bool(e2) {
            return this.buf.push(e2 ? 1 : 0), this;
          }
          bytes(e2) {
            return this.uint32(e2.byteLength), this.raw(e2);
          }
          string(e2) {
            let t2 = this.textEncoder.encode(e2);
            return this.uint32(t2.byteLength), this.raw(t2);
          }
          float(e2) {
            p(e2);
            let t2 = new Uint8Array(4);
            return new DataView(t2.buffer).setFloat32(0, e2, true), this.raw(t2);
          }
          double(e2) {
            let t2 = new Uint8Array(8);
            return new DataView(t2.buffer).setFloat64(0, e2, true), this.raw(t2);
          }
          fixed32(e2) {
            h(e2);
            let t2 = new Uint8Array(4);
            return new DataView(t2.buffer).setUint32(0, e2, true), this.raw(t2);
          }
          sfixed32(e2) {
            u(e2);
            let t2 = new Uint8Array(4);
            return new DataView(t2.buffer).setInt32(0, e2, true), this.raw(t2);
          }
          sint32(e2) {
            return u(e2), D(e2 = (e2 << 1 ^ e2 >> 31) >>> 0, this.buf), this;
          }
          sfixed64(e2) {
            let t2 = new Uint8Array(8), n2 = new DataView(t2.buffer), i2 = M.enc(e2);
            return n2.setInt32(0, i2.lo, true), n2.setInt32(4, i2.hi, true), this.raw(t2);
          }
          fixed64(e2) {
            let t2 = new Uint8Array(8), n2 = new DataView(t2.buffer), i2 = M.uEnc(e2);
            return n2.setInt32(0, i2.lo, true), n2.setInt32(4, i2.hi, true), this.raw(t2);
          }
          int64(e2) {
            let t2 = M.enc(e2);
            return S(t2.lo, t2.hi, this.buf), this;
          }
          sint64(e2) {
            let t2 = M.enc(e2), n2 = t2.hi >> 31;
            return S(t2.lo << 1 ^ n2, (t2.hi << 1 | t2.lo >>> 31) ^ n2, this.buf), this;
          }
          uint64(e2) {
            let t2 = M.uEnc(e2);
            return S(t2.lo, t2.hi, this.buf), this;
          }
        }
        class B {
          constructor(e2, t2) {
            this.varint64 = T, this.uint32 = _, this.buf = e2, this.len = e2.length, this.pos = 0, this.view = new DataView(e2.buffer, e2.byteOffset, e2.byteLength), this.textDecoder = null != t2 ? t2 : new TextDecoder();
          }
          tag() {
            let e2 = this.uint32(), t2 = e2 >>> 3, n2 = 7 & e2;
            if (t2 <= 0 || n2 < 0 || n2 > 5) throw new Error("illegal tag: field no " + t2 + " wire type " + n2);
            return [t2, n2];
          }
          skip(e2, t2) {
            let n2 = this.pos;
            switch (e2) {
              case N.Varint:
                for (; 128 & this.buf[this.pos++]; ) ;
                break;
              case N.Bit64:
                this.pos += 4;
              case N.Bit32:
                this.pos += 4;
                break;
              case N.LengthDelimited:
                let n3 = this.uint32();
                this.pos += n3;
                break;
              case N.StartGroup:
                for (; ; ) {
                  const [e3, n4] = this.tag();
                  if (n4 === N.EndGroup) {
                    if (void 0 !== t2 && e3 !== t2) throw new Error("invalid end group tag");
                    break;
                  }
                  this.skip(n4, e3);
                }
                break;
              default:
                throw new Error("cant skip wire type " + e2);
            }
            return this.assertBounds(), this.buf.subarray(n2, this.pos);
          }
          assertBounds() {
            if (this.pos > this.len) throw new RangeError("premature EOF");
          }
          int32() {
            return 0 | this.uint32();
          }
          sint32() {
            let e2 = this.uint32();
            return e2 >>> 1 ^ -(1 & e2);
          }
          int64() {
            return M.dec(...this.varint64());
          }
          uint64() {
            return M.uDec(...this.varint64());
          }
          sint64() {
            let [e2, t2] = this.varint64(), n2 = -(1 & e2);
            return e2 = (e2 >>> 1 | (1 & t2) << 31) ^ n2, t2 = t2 >>> 1 ^ n2, M.dec(e2, t2);
          }
          bool() {
            let [e2, t2] = this.varint64();
            return 0 !== e2 || 0 !== t2;
          }
          fixed32() {
            return this.view.getUint32((this.pos += 4) - 4, true);
          }
          sfixed32() {
            return this.view.getInt32((this.pos += 4) - 4, true);
          }
          fixed64() {
            return M.uDec(this.sfixed32(), this.sfixed32());
          }
          sfixed64() {
            return M.dec(this.sfixed32(), this.sfixed32());
          }
          float() {
            return this.view.getFloat32((this.pos += 4) - 4, true);
          }
          double() {
            return this.view.getFloat64((this.pos += 8) - 8, true);
          }
          bytes() {
            let e2 = this.uint32(), t2 = this.pos;
            return this.pos += e2, this.assertBounds(), this.buf.subarray(t2, t2 + e2);
          }
          string() {
            return this.textDecoder.decode(this.bytes());
          }
        }
        function j(e2) {
          const t2 = e2.field.localName, n2 = /* @__PURE__ */ Object.create(null);
          return n2[t2] = (function(e3) {
            const t3 = e3.field;
            if (t3.repeated) return [];
            if (void 0 !== t3.default) return t3.default;
            switch (t3.kind) {
              case "enum":
                return t3.T.values[0].no;
              case "scalar":
                return x(t3.T, t3.L);
              case "message":
                const e4 = t3.T, n3 = new e4();
                return e4.fieldWrapper ? e4.fieldWrapper.unwrapField(n3) : n3;
              case "map":
                throw "map fields are not allowed to be extensions";
            }
          })(e2), [n2, () => n2[t2]];
        }
        let q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), V = [];
        for (let e2 = 0; e2 < q.length; e2++) V[q[e2].charCodeAt(0)] = e2;
        V["-".charCodeAt(0)] = q.indexOf("+"), V["_".charCodeAt(0)] = q.indexOf("/");
        const H = { dec(e2) {
          let t2 = 3 * e2.length / 4;
          "=" == e2[e2.length - 2] ? t2 -= 2 : "=" == e2[e2.length - 1] && (t2 -= 1);
          let n2, i2 = new Uint8Array(t2), r2 = 0, s2 = 0, a2 = 0;
          for (let t3 = 0; t3 < e2.length; t3++) {
            if (n2 = V[e2.charCodeAt(t3)], void 0 === n2) switch (e2[t3]) {
              case "=":
                s2 = 0;
              case "\n":
              case "\r":
              case "	":
              case " ":
                continue;
              default:
                throw Error("invalid base64 string.");
            }
            switch (s2) {
              case 0:
                a2 = n2, s2 = 1;
                break;
              case 1:
                i2[r2++] = a2 << 2 | (48 & n2) >> 4, a2 = n2, s2 = 2;
                break;
              case 2:
                i2[r2++] = (15 & a2) << 4 | (60 & n2) >> 2, a2 = n2, s2 = 3;
                break;
              case 3:
                i2[r2++] = (3 & a2) << 6 | n2, s2 = 0;
            }
          }
          if (1 == s2) throw Error("invalid base64 string.");
          return i2.subarray(0, r2);
        }, enc(e2) {
          let t2, n2 = "", i2 = 0, r2 = 0;
          for (let s2 = 0; s2 < e2.length; s2++) switch (t2 = e2[s2], i2) {
            case 0:
              n2 += q[t2 >> 2], r2 = (3 & t2) << 4, i2 = 1;
              break;
            case 1:
              n2 += q[r2 | t2 >> 4], r2 = (15 & t2) << 2, i2 = 2;
              break;
            case 2:
              n2 += q[r2 | t2 >> 6], n2 += q[63 & t2], i2 = 0;
          }
          return i2 && (n2 += q[r2], n2 += "=", 1 == i2 && (n2 += "=")), n2;
        } };
        function W(e2, t2, n2) {
          J(t2, e2);
          const i2 = t2.runtime.bin.makeReadOptions(n2), r2 = (function(e3, t3) {
            if (!t3.repeated && ("enum" == t3.kind || "scalar" == t3.kind)) {
              for (let n3 = e3.length - 1; n3 >= 0; --n3) if (e3[n3].no == t3.no) return [e3[n3]];
              return [];
            }
            return e3.filter(((e4) => e4.no === t3.no));
          })(e2.getType().runtime.bin.listUnknownFields(e2), t2.field), [s2, a2] = j(t2);
          for (const e3 of r2) t2.runtime.bin.readField(s2, i2.readerFactory(e3.data), t2.field, e3.wireType, i2);
          return a2();
        }
        function K(e2, t2, n2, i2) {
          J(t2, e2);
          const r2 = t2.runtime.bin.makeReadOptions(i2), s2 = t2.runtime.bin.makeWriteOptions(i2);
          if (z(e2, t2)) {
            const n3 = e2.getType().runtime.bin.listUnknownFields(e2).filter(((e3) => e3.no != t2.field.no));
            e2.getType().runtime.bin.discardUnknownFields(e2);
            for (const t3 of n3) e2.getType().runtime.bin.onUnknownField(e2, t3.no, t3.wireType, t3.data);
          }
          const a2 = s2.writerFactory();
          let o2 = t2.field;
          o2.opt || o2.repeated || "enum" != o2.kind && "scalar" != o2.kind || (o2 = Object.assign(Object.assign({}, t2.field), { opt: true })), t2.runtime.bin.writeField(o2, n2, a2, s2);
          const c2 = r2.readerFactory(a2.finish());
          for (; c2.pos < c2.len; ) {
            const [t3, n3] = c2.tag(), i3 = c2.skip(n3, t3);
            e2.getType().runtime.bin.onUnknownField(e2, t3, n3, i3);
          }
        }
        function z(e2, t2) {
          const n2 = e2.getType();
          return t2.extendee.typeName === n2.typeName && !!n2.runtime.bin.listUnknownFields(e2).find(((e3) => e3.no == t2.field.no));
        }
        function J(e2, t2) {
          s(e2.extendee.typeName == t2.getType().typeName, "extension ".concat(e2.typeName, " can only be applied to message ").concat(e2.extendee.typeName));
        }
        function G(e2, t2) {
          const n2 = e2.localName;
          if (e2.repeated) return t2[n2].length > 0;
          if (e2.oneof) return t2[e2.oneof.localName].case === n2;
          switch (e2.kind) {
            case "enum":
            case "scalar":
              return e2.opt || e2.req ? void 0 !== t2[n2] : "enum" == e2.kind ? t2[n2] !== e2.T.values[0].no : !U(e2.T, t2[n2]);
            case "message":
              return void 0 !== t2[n2];
            case "map":
              return Object.keys(t2[n2]).length > 0;
          }
        }
        function Q(e2, t2) {
          const n2 = e2.localName, i2 = !e2.opt && !e2.req;
          if (e2.repeated) t2[n2] = [];
          else if (e2.oneof) t2[e2.oneof.localName] = { case: void 0 };
          else switch (e2.kind) {
            case "map":
              t2[n2] = {};
              break;
            case "enum":
              t2[n2] = i2 ? e2.T.values[0].no : void 0;
              break;
            case "scalar":
              t2[n2] = i2 ? x(e2.T, e2.L) : void 0;
              break;
            case "message":
              t2[n2] = void 0;
          }
        }
        function Y(e2, t2) {
          if (null === e2 || "object" != typeof e2) return false;
          if (!Object.getOwnPropertyNames(b.prototype).every(((t3) => t3 in e2 && "function" == typeof e2[t3]))) return false;
          const n2 = e2.getType();
          return null !== n2 && "function" == typeof n2 && "typeName" in n2 && "string" == typeof n2.typeName && (void 0 === t2 || n2.typeName == t2.typeName);
        }
        function X(e2, t2) {
          return Y(t2) || !e2.fieldWrapper ? t2 : e2.fieldWrapper.wrapField(t2);
        }
        O.DOUBLE, O.FLOAT, O.INT64, O.UINT64, O.INT32, O.UINT32, O.BOOL, O.STRING, O.BYTES;
        const Z = { ignoreUnknownFields: false }, $ = { emitDefaultValues: false, enumAsInteger: false, useProtoFieldName: false, prettySpaces: 0 };
        function ee(e2) {
          return e2 ? Object.assign(Object.assign({}, Z), e2) : Z;
        }
        function te(e2) {
          return e2 ? Object.assign(Object.assign({}, $), e2) : $;
        }
        const ne = /* @__PURE__ */ Symbol(), ie = /* @__PURE__ */ Symbol();
        function re(e2) {
          if (null === e2) return "null";
          switch (typeof e2) {
            case "object":
              return Array.isArray(e2) ? "array" : "object";
            case "string":
              return e2.length > 100 ? "string" : '"'.concat(e2.split('"').join('\\"'), '"');
            default:
              return String(e2);
          }
        }
        function se(e2, t2, n2, i2, r2) {
          let a2 = n2.localName;
          if (n2.repeated) {
            if (s("map" != n2.kind), null === t2) return;
            if (!Array.isArray(t2)) throw new Error("cannot decode field ".concat(r2.typeName, ".").concat(n2.name, " from JSON: ").concat(re(t2)));
            const o2 = e2[a2];
            for (const e3 of t2) {
              if (null === e3) throw new Error("cannot decode field ".concat(r2.typeName, ".").concat(n2.name, " from JSON: ").concat(re(e3)));
              switch (n2.kind) {
                case "message":
                  o2.push(n2.T.fromJson(e3, i2));
                  break;
                case "enum":
                  const t3 = ce(n2.T, e3, i2.ignoreUnknownFields, true);
                  t3 !== ie && o2.push(t3);
                  break;
                case "scalar":
                  try {
                    o2.push(oe(n2.T, e3, n2.L, true));
                  } catch (t4) {
                    let i3 = "cannot decode field ".concat(r2.typeName, ".").concat(n2.name, " from JSON: ").concat(re(e3));
                    throw t4 instanceof Error && t4.message.length > 0 && (i3 += ": ".concat(t4.message)), new Error(i3);
                  }
              }
            }
          } else if ("map" == n2.kind) {
            if (null === t2) return;
            if ("object" != typeof t2 || Array.isArray(t2)) throw new Error("cannot decode field ".concat(r2.typeName, ".").concat(n2.name, " from JSON: ").concat(re(t2)));
            const s2 = e2[a2];
            for (const [e3, a3] of Object.entries(t2)) {
              if (null === a3) throw new Error("cannot decode field ".concat(r2.typeName, ".").concat(n2.name, " from JSON: map value null"));
              let o2;
              try {
                o2 = ae(n2.K, e3);
              } catch (e4) {
                let i3 = "cannot decode map key for field ".concat(r2.typeName, ".").concat(n2.name, " from JSON: ").concat(re(t2));
                throw e4 instanceof Error && e4.message.length > 0 && (i3 += ": ".concat(e4.message)), new Error(i3);
              }
              switch (n2.V.kind) {
                case "message":
                  s2[o2] = n2.V.T.fromJson(a3, i2);
                  break;
                case "enum":
                  const e4 = ce(n2.V.T, a3, i2.ignoreUnknownFields, true);
                  e4 !== ie && (s2[o2] = e4);
                  break;
                case "scalar":
                  try {
                    s2[o2] = oe(n2.V.T, a3, A.BIGINT, true);
                  } catch (e5) {
                    let i3 = "cannot decode map value for field ".concat(r2.typeName, ".").concat(n2.name, " from JSON: ").concat(re(t2));
                    throw e5 instanceof Error && e5.message.length > 0 && (i3 += ": ".concat(e5.message)), new Error(i3);
                  }
              }
            }
          } else switch (n2.oneof && (e2 = e2[n2.oneof.localName] = { case: a2 }, a2 = "value"), n2.kind) {
            case "message":
              const s2 = n2.T;
              if (null === t2 && "google.protobuf.Value" != s2.typeName) return;
              let o2 = e2[a2];
              Y(o2) ? o2.fromJson(t2, i2) : (e2[a2] = o2 = s2.fromJson(t2, i2), s2.fieldWrapper && !n2.oneof && (e2[a2] = s2.fieldWrapper.unwrapField(o2)));
              break;
            case "enum":
              const c2 = ce(n2.T, t2, i2.ignoreUnknownFields, false);
              switch (c2) {
                case ne:
                  Q(n2, e2);
                  break;
                case ie:
                  break;
                default:
                  e2[a2] = c2;
              }
              break;
            case "scalar":
              try {
                const i3 = oe(n2.T, t2, n2.L, false);
                if (i3 === ne) Q(n2, e2);
                else e2[a2] = i3;
              } catch (e3) {
                let i3 = "cannot decode field ".concat(r2.typeName, ".").concat(n2.name, " from JSON: ").concat(re(t2));
                throw e3 instanceof Error && e3.message.length > 0 && (i3 += ": ".concat(e3.message)), new Error(i3);
              }
          }
        }
        function ae(e2, t2) {
          if (e2 === O.BOOL) switch (t2) {
            case "true":
              t2 = true;
              break;
            case "false":
              t2 = false;
          }
          return oe(e2, t2, A.BIGINT, true).toString();
        }
        function oe(e2, t2, n2, i2) {
          if (null === t2) return i2 ? x(e2, n2) : ne;
          switch (e2) {
            case O.DOUBLE:
            case O.FLOAT:
              if ("NaN" === t2) return Number.NaN;
              if ("Infinity" === t2) return Number.POSITIVE_INFINITY;
              if ("-Infinity" === t2) return Number.NEGATIVE_INFINITY;
              if ("" === t2) break;
              if ("string" == typeof t2 && t2.trim().length !== t2.length) break;
              if ("string" != typeof t2 && "number" != typeof t2) break;
              const i3 = Number(t2);
              if (Number.isNaN(i3)) break;
              if (!Number.isFinite(i3)) break;
              return e2 == O.FLOAT && p(i3), i3;
            case O.INT32:
            case O.FIXED32:
            case O.SFIXED32:
            case O.SINT32:
            case O.UINT32:
              let r2;
              if ("number" == typeof t2 ? r2 = t2 : "string" == typeof t2 && t2.length > 0 && t2.trim().length === t2.length && (r2 = Number(t2)), void 0 === r2) break;
              return e2 == O.UINT32 || e2 == O.FIXED32 ? h(r2) : u(r2), r2;
            case O.INT64:
            case O.SFIXED64:
            case O.SINT64:
              if ("number" != typeof t2 && "string" != typeof t2) break;
              const s2 = M.parse(t2);
              return n2 ? s2.toString() : s2;
            case O.FIXED64:
            case O.UINT64:
              if ("number" != typeof t2 && "string" != typeof t2) break;
              const a2 = M.uParse(t2);
              return n2 ? a2.toString() : a2;
            case O.BOOL:
              if ("boolean" != typeof t2) break;
              return t2;
            case O.STRING:
              if ("string" != typeof t2) break;
              try {
                encodeURIComponent(t2);
              } catch (e3) {
                throw new Error("invalid UTF8");
              }
              return t2;
            case O.BYTES:
              if ("" === t2) return new Uint8Array(0);
              if ("string" != typeof t2) break;
              return H.dec(t2);
          }
          throw new Error();
        }
        function ce(e2, t2, n2, i2) {
          if (null === t2) return "google.protobuf.NullValue" == e2.typeName ? 0 : i2 ? e2.values[0].no : ne;
          switch (typeof t2) {
            case "number":
              if (Number.isInteger(t2)) return t2;
              break;
            case "string":
              const i3 = e2.findName(t2);
              if (void 0 !== i3) return i3.no;
              if (n2) return ie;
          }
          throw new Error("cannot decode enum ".concat(e2.typeName, " from JSON: ").concat(re(t2)));
        }
        function de(e2) {
          return !(!e2.repeated && "map" != e2.kind) || !e2.oneof && ("message" != e2.kind && (!e2.opt && !e2.req));
        }
        function le(e2, t2, n2) {
          if ("map" == e2.kind) {
            s("object" == typeof t2 && null != t2);
            const i2 = {}, r2 = Object.entries(t2);
            switch (e2.V.kind) {
              case "scalar":
                for (const [t4, n3] of r2) i2[t4.toString()] = he(e2.V.T, n3);
                break;
              case "message":
                for (const [e3, t4] of r2) i2[e3.toString()] = t4.toJson(n2);
                break;
              case "enum":
                const t3 = e2.V.T;
                for (const [e3, s2] of r2) i2[e3.toString()] = ue(t3, s2, n2.enumAsInteger);
            }
            return n2.emitDefaultValues || r2.length > 0 ? i2 : void 0;
          }
          if (e2.repeated) {
            s(Array.isArray(t2));
            const i2 = [];
            switch (e2.kind) {
              case "scalar":
                for (let n3 = 0; n3 < t2.length; n3++) i2.push(he(e2.T, t2[n3]));
                break;
              case "enum":
                for (let r2 = 0; r2 < t2.length; r2++) i2.push(ue(e2.T, t2[r2], n2.enumAsInteger));
                break;
              case "message":
                for (let e3 = 0; e3 < t2.length; e3++) i2.push(t2[e3].toJson(n2));
            }
            return n2.emitDefaultValues || i2.length > 0 ? i2 : void 0;
          }
          switch (e2.kind) {
            case "scalar":
              return he(e2.T, t2);
            case "enum":
              return ue(e2.T, t2, n2.enumAsInteger);
            case "message":
              return X(e2.T, t2).toJson(n2);
          }
        }
        function ue(e2, t2, n2) {
          var i2;
          if (s("number" == typeof t2), "google.protobuf.NullValue" == e2.typeName) return null;
          if (n2) return t2;
          const r2 = e2.findNumber(t2);
          return null !== (i2 = null == r2 ? void 0 : r2.name) && void 0 !== i2 ? i2 : t2;
        }
        function he(e2, t2) {
          switch (e2) {
            case O.INT32:
            case O.SFIXED32:
            case O.SINT32:
            case O.FIXED32:
            case O.UINT32:
              return s("number" == typeof t2), t2;
            case O.FLOAT:
            case O.DOUBLE:
              return s("number" == typeof t2), Number.isNaN(t2) ? "NaN" : t2 === Number.POSITIVE_INFINITY ? "Infinity" : t2 === Number.NEGATIVE_INFINITY ? "-Infinity" : t2;
            case O.STRING:
              return s("string" == typeof t2), t2;
            case O.BOOL:
              return s("boolean" == typeof t2), t2;
            case O.UINT64:
            case O.FIXED64:
            case O.INT64:
            case O.SFIXED64:
            case O.SINT64:
              return s("bigint" == typeof t2 || "string" == typeof t2 || "number" == typeof t2), t2.toString();
            case O.BYTES:
              return s(t2 instanceof Uint8Array), H.enc(t2);
          }
        }
        const pe = /* @__PURE__ */ Symbol("@bufbuild/protobuf/unknown-fields"), me = { readUnknownFields: true, readerFactory: (e2) => new B(e2) }, ge = { writeUnknownFields: true, writerFactory: () => new F() };
        function ve(e2) {
          return e2 ? Object.assign(Object.assign({}, me), e2) : me;
        }
        function fe(e2) {
          return e2 ? Object.assign(Object.assign({}, ge), e2) : ge;
        }
        function ke(e2, t2, n2, i2, r2) {
          let { repeated: s2, localName: a2 } = n2;
          switch (n2.oneof && ((e2 = e2[n2.oneof.localName]).case != a2 && delete e2.value, e2.case = a2, a2 = "value"), n2.kind) {
            case "scalar":
            case "enum":
              const o2 = "enum" == n2.kind ? O.INT32 : n2.T;
              let c2 = Te;
              if ("scalar" == n2.kind && n2.L > 0 && (c2 = be), s2) {
                let n3 = e2[a2];
                if (i2 == N.LengthDelimited && o2 != O.STRING && o2 != O.BYTES) {
                  let e3 = t2.uint32() + t2.pos;
                  for (; t2.pos < e3; ) n3.push(c2(t2, o2));
                } else n3.push(c2(t2, o2));
              } else e2[a2] = c2(t2, o2);
              break;
            case "message":
              const d2 = n2.T;
              s2 ? e2[a2].push(ye(t2, new d2(), r2, n2)) : Y(e2[a2]) ? ye(t2, e2[a2], r2, n2) : (e2[a2] = ye(t2, new d2(), r2, n2), !d2.fieldWrapper || n2.oneof || n2.repeated || (e2[a2] = d2.fieldWrapper.unwrapField(e2[a2])));
              break;
            case "map":
              let [l2, u2] = (function(e3, t3, n3) {
                const i3 = t3.uint32(), r3 = t3.pos + i3;
                let s3, a3;
                for (; t3.pos < r3; ) {
                  const [i4] = t3.tag();
                  switch (i4) {
                    case 1:
                      s3 = Te(t3, e3.K);
                      break;
                    case 2:
                      switch (e3.V.kind) {
                        case "scalar":
                          a3 = Te(t3, e3.V.T);
                          break;
                        case "enum":
                          a3 = t3.int32();
                          break;
                        case "message":
                          a3 = ye(t3, new e3.V.T(), n3, void 0);
                      }
                  }
                }
                void 0 === s3 && (s3 = x(e3.K, A.BIGINT));
                "string" != typeof s3 && "number" != typeof s3 && (s3 = s3.toString());
                if (void 0 === a3) switch (e3.V.kind) {
                  case "scalar":
                    a3 = x(e3.V.T, A.BIGINT);
                    break;
                  case "enum":
                    a3 = e3.V.T.values[0].no;
                    break;
                  case "message":
                    a3 = new e3.V.T();
                }
                return [s3, a3];
              })(n2, t2, r2);
              e2[a2][l2] = u2;
          }
        }
        function ye(e2, t2, n2, i2) {
          const r2 = t2.getType().runtime.bin, s2 = null == i2 ? void 0 : i2.delimited;
          return r2.readMessage(t2, e2, s2 ? i2.no : e2.uint32(), n2, s2), t2;
        }
        function be(e2, t2) {
          const n2 = Te(e2, t2);
          return "bigint" == typeof n2 ? n2.toString() : n2;
        }
        function Te(e2, t2) {
          switch (t2) {
            case O.STRING:
              return e2.string();
            case O.BOOL:
              return e2.bool();
            case O.DOUBLE:
              return e2.double();
            case O.FLOAT:
              return e2.float();
            case O.INT32:
              return e2.int32();
            case O.INT64:
              return e2.int64();
            case O.UINT64:
              return e2.uint64();
            case O.FIXED64:
              return e2.fixed64();
            case O.BYTES:
              return e2.bytes();
            case O.FIXED32:
              return e2.fixed32();
            case O.SFIXED32:
              return e2.sfixed32();
            case O.SFIXED64:
              return e2.sfixed64();
            case O.SINT64:
              return e2.sint64();
            case O.UINT32:
              return e2.uint32();
            case O.SINT32:
              return e2.sint32();
          }
        }
        function Se(e2, t2, n2, i2) {
          s(void 0 !== t2);
          const r2 = e2.repeated;
          switch (e2.kind) {
            case "scalar":
            case "enum":
              let a2 = "enum" == e2.kind ? O.INT32 : e2.T;
              if (r2) if (s(Array.isArray(t2)), e2.packed) !(function(e3, t3, n3, i3) {
                if (!i3.length) return;
                e3.tag(n3, N.LengthDelimited).fork();
                let [, r3] = Re(t3);
                for (let t4 = 0; t4 < i3.length; t4++) e3[r3](i3[t4]);
                e3.join();
              })(n2, a2, e2.no, t2);
              else for (const i3 of t2) we(n2, a2, e2.no, i3);
              else we(n2, a2, e2.no, t2);
              break;
            case "message":
              if (r2) {
                s(Array.isArray(t2));
                for (const r3 of t2) Ce(n2, i2, e2, r3);
              } else Ce(n2, i2, e2, t2);
              break;
            case "map":
              s("object" == typeof t2 && null != t2);
              for (const [r3, s2] of Object.entries(t2)) Ee(n2, i2, e2, r3, s2);
          }
        }
        function Ee(e2, t2, n2, i2, r2) {
          e2.tag(n2.no, N.LengthDelimited), e2.fork();
          let a2 = i2;
          switch (n2.K) {
            case O.INT32:
            case O.FIXED32:
            case O.UINT32:
            case O.SFIXED32:
            case O.SINT32:
              a2 = Number.parseInt(i2);
              break;
            case O.BOOL:
              s("true" == i2 || "false" == i2), a2 = "true" == i2;
          }
          switch (we(e2, n2.K, 1, a2), n2.V.kind) {
            case "scalar":
              we(e2, n2.V.T, 2, r2);
              break;
            case "enum":
              we(e2, O.INT32, 2, r2);
              break;
            case "message":
              s(void 0 !== r2), e2.tag(2, N.LengthDelimited).bytes(r2.toBinary(t2));
          }
          e2.join();
        }
        function Ce(e2, t2, n2, i2) {
          const r2 = X(n2.T, i2);
          n2.delimited ? e2.tag(n2.no, N.StartGroup).raw(r2.toBinary(t2)).tag(n2.no, N.EndGroup) : e2.tag(n2.no, N.LengthDelimited).bytes(r2.toBinary(t2));
        }
        function we(e2, t2, n2, i2) {
          s(void 0 !== i2);
          let [r2, a2] = Re(t2);
          e2.tag(n2, r2)[a2](i2);
        }
        function Re(e2) {
          let t2 = N.Varint;
          switch (e2) {
            case O.BYTES:
            case O.STRING:
              t2 = N.LengthDelimited;
              break;
            case O.DOUBLE:
            case O.FIXED64:
            case O.SFIXED64:
              t2 = N.Bit64;
              break;
            case O.FIXED32:
            case O.SFIXED32:
            case O.FLOAT:
              t2 = N.Bit32;
          }
          return [t2, O[e2].toLowerCase()];
        }
        function Pe(e2) {
          if (void 0 === e2) return e2;
          if (Y(e2)) return e2.clone();
          if (e2 instanceof Uint8Array) {
            const t2 = new Uint8Array(e2.byteLength);
            return t2.set(e2), t2;
          }
          return e2;
        }
        function Ie(e2) {
          return e2 instanceof Uint8Array ? e2 : new Uint8Array(e2);
        }
        class De {
          constructor(e2, t2) {
            this._fields = e2, this._normalizer = t2;
          }
          findJsonName(e2) {
            if (!this.jsonNames) {
              const e3 = {};
              for (const t2 of this.list()) e3[t2.jsonName] = e3[t2.name] = t2;
              this.jsonNames = e3;
            }
            return this.jsonNames[e2];
          }
          find(e2) {
            if (!this.numbers) {
              const e3 = {};
              for (const t2 of this.list()) e3[t2.no] = t2;
              this.numbers = e3;
            }
            return this.numbers[e2];
          }
          list() {
            return this.all || (this.all = this._normalizer(this._fields)), this.all;
          }
          byNumber() {
            return this.numbersAsc || (this.numbersAsc = this.list().concat().sort(((e2, t2) => e2.no - t2.no))), this.numbersAsc;
          }
          byMember() {
            if (!this.members) {
              this.members = [];
              const e2 = this.members;
              let t2;
              for (const n2 of this.list()) n2.oneof ? n2.oneof !== t2 && (t2 = n2.oneof, e2.push(t2)) : e2.push(n2);
            }
            return this.members;
          }
        }
        function _e(e2, t2) {
          const n2 = Oe(e2);
          return t2 ? n2 : Ue(xe(n2));
        }
        const Me = Oe;
        function Oe(e2) {
          let t2 = false;
          const n2 = [];
          for (let i2 = 0; i2 < e2.length; i2++) {
            let r2 = e2.charAt(i2);
            switch (r2) {
              case "_":
                t2 = true;
                break;
              case "0":
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
                n2.push(r2), t2 = false;
                break;
              default:
                t2 && (t2 = false, r2 = r2.toUpperCase()), n2.push(r2);
            }
          }
          return n2.join("");
        }
        const Ae = /* @__PURE__ */ new Set(["constructor", "toString", "toJSON", "valueOf"]), Ne = /* @__PURE__ */ new Set(["getType", "clone", "equals", "fromBinary", "fromJson", "fromJsonString", "toBinary", "toJson", "toJsonString", "toObject"]), Le = (e2) => "".concat(e2, "$"), xe = (e2) => Ne.has(e2) ? Le(e2) : e2, Ue = (e2) => Ae.has(e2) ? Le(e2) : e2;
        class Fe {
          constructor(e2) {
            this.kind = "oneof", this.repeated = false, this.packed = false, this.opt = false, this.req = false, this.default = void 0, this.fields = [], this.name = e2, this.localName = _e(e2, false);
          }
          addField(e2) {
            s(e2.oneof === this, "field ".concat(e2.name, " not one of ").concat(this.name)), this.fields.push(e2);
          }
          findField(e2) {
            if (!this._lookup) {
              this._lookup = /* @__PURE__ */ Object.create(null);
              for (let e3 = 0; e3 < this.fields.length; e3++) this._lookup[this.fields[e3].localName] = this.fields[e3];
            }
            return this._lookup[e2];
          }
        }
        const Be = (je = (e2) => new De(e2, ((e3) => (function(e4, t2) {
          var n2, i2, r2, s2, a2, o2;
          const c2 = [];
          let d2;
          for (const t3 of "function" == typeof e4 ? e4() : e4) {
            const e5 = t3;
            if (e5.localName = _e(t3.name, void 0 !== t3.oneof), e5.jsonName = null !== (n2 = t3.jsonName) && void 0 !== n2 ? n2 : Me(t3.name), e5.repeated = null !== (i2 = t3.repeated) && void 0 !== i2 && i2, "scalar" == t3.kind && (e5.L = null !== (r2 = t3.L) && void 0 !== r2 ? r2 : A.BIGINT), e5.delimited = null !== (s2 = t3.delimited) && void 0 !== s2 && s2, e5.req = null !== (a2 = t3.req) && void 0 !== a2 && a2, e5.opt = null !== (o2 = t3.opt) && void 0 !== o2 && o2, void 0 === t3.packed && (e5.packed = "enum" == t3.kind || "scalar" == t3.kind && t3.T != O.BYTES && t3.T != O.STRING), void 0 !== t3.oneof) {
              const n3 = "string" == typeof t3.oneof ? t3.oneof : t3.oneof.name;
              d2 && d2.name == n3 || (d2 = new Fe(n3)), e5.oneof = d2, d2.addField(e5);
            }
            c2.push(e5);
          }
          return c2;
        })(e3))), qe = (e2) => {
          for (const t2 of e2.getType().fields.byMember()) {
            if (t2.opt) continue;
            const n2 = t2.localName, i2 = e2;
            if (t2.repeated) i2[n2] = [];
            else switch (t2.kind) {
              case "oneof":
                i2[n2] = { case: void 0 };
                break;
              case "enum":
                i2[n2] = 0;
                break;
              case "map":
                i2[n2] = {};
                break;
              case "scalar":
                i2[n2] = x(t2.T, t2.L);
            }
          }
        }, { syntax: "proto3", json: { makeReadOptions: ee, makeWriteOptions: te, readMessage(e2, t2, n2, i2) {
          if (null == t2 || Array.isArray(t2) || "object" != typeof t2) throw new Error("cannot decode message ".concat(e2.typeName, " from JSON: ").concat(re(t2)));
          i2 = null != i2 ? i2 : new e2();
          const r2 = /* @__PURE__ */ new Map(), s2 = n2.typeRegistry;
          for (const [a2, o2] of Object.entries(t2)) {
            const t3 = e2.fields.findJsonName(a2);
            if (t3) {
              if (t3.oneof) {
                if (null === o2 && "scalar" == t3.kind) continue;
                const n3 = r2.get(t3.oneof);
                if (void 0 !== n3) throw new Error("cannot decode message ".concat(e2.typeName, ' from JSON: multiple keys for oneof "').concat(t3.oneof.name, '" present: "').concat(n3, '", "').concat(a2, '"'));
                r2.set(t3.oneof, a2);
              }
              se(i2, o2, t3, n2, e2);
            } else {
              let t4 = false;
              if ((null == s2 ? void 0 : s2.findExtension) && a2.startsWith("[") && a2.endsWith("]")) {
                const r3 = s2.findExtension(a2.substring(1, a2.length - 1));
                if (r3 && r3.extendee.typeName == e2.typeName) {
                  t4 = true;
                  const [e3, s3] = j(r3);
                  se(e3, o2, r3.field, n2, r3), K(i2, r3, s3(), n2);
                }
              }
              if (!t4 && !n2.ignoreUnknownFields) throw new Error("cannot decode message ".concat(e2.typeName, ' from JSON: key "').concat(a2, '" is unknown'));
            }
          }
          return i2;
        }, writeMessage(e2, t2) {
          const n2 = e2.getType(), i2 = {};
          let r2;
          try {
            for (r2 of n2.fields.byNumber()) {
              if (!G(r2, e2)) {
                if (r2.req) throw "required field not set";
                if (!t2.emitDefaultValues) continue;
                if (!de(r2)) continue;
              }
              const n3 = le(r2, r2.oneof ? e2[r2.oneof.localName].value : e2[r2.localName], t2);
              void 0 !== n3 && (i2[t2.useProtoFieldName ? r2.name : r2.jsonName] = n3);
            }
            const s2 = t2.typeRegistry;
            if (null == s2 ? void 0 : s2.findExtensionFor) for (const r3 of n2.runtime.bin.listUnknownFields(e2)) {
              const a2 = s2.findExtensionFor(n2.typeName, r3.no);
              if (a2 && z(e2, a2)) {
                const n3 = W(e2, a2, t2), r4 = le(a2.field, n3, t2);
                void 0 !== r4 && (i2[a2.field.jsonName] = r4);
              }
            }
          } catch (e3) {
            const t3 = r2 ? "cannot encode field ".concat(n2.typeName, ".").concat(r2.name, " to JSON") : "cannot encode message ".concat(n2.typeName, " to JSON"), i3 = e3 instanceof Error ? e3.message : String(e3);
            throw new Error(t3 + (i3.length > 0 ? ": ".concat(i3) : ""));
          }
          return i2;
        }, readScalar: (e2, t2, n2) => oe(e2, t2, null != n2 ? n2 : A.BIGINT, true), writeScalar(e2, t2, n2) {
          if (void 0 !== t2) return n2 || U(e2, t2) ? he(e2, t2) : void 0;
        }, debug: re }, bin: { makeReadOptions: ve, makeWriteOptions: fe, listUnknownFields(e2) {
          var t2;
          return null !== (t2 = e2[pe]) && void 0 !== t2 ? t2 : [];
        }, discardUnknownFields(e2) {
          delete e2[pe];
        }, writeUnknownFields(e2, t2) {
          const n2 = e2[pe];
          if (n2) for (const e3 of n2) t2.tag(e3.no, e3.wireType).raw(e3.data);
        }, onUnknownField(e2, t2, n2, i2) {
          const r2 = e2;
          Array.isArray(r2[pe]) || (r2[pe] = []), r2[pe].push({ no: t2, wireType: n2, data: i2 });
        }, readMessage(e2, t2, n2, i2, r2) {
          const s2 = e2.getType(), a2 = r2 ? t2.len : t2.pos + n2;
          let o2, c2;
          for (; t2.pos < a2 && ([o2, c2] = t2.tag(), true !== r2 || c2 != N.EndGroup); ) {
            const n3 = s2.fields.find(o2);
            if (n3) ke(e2, t2, n3, c2, i2);
            else {
              const n4 = t2.skip(c2, o2);
              i2.readUnknownFields && this.onUnknownField(e2, o2, c2, n4);
            }
          }
          if (r2 && (c2 != N.EndGroup || o2 !== n2)) throw new Error("invalid end group tag");
        }, readField: ke, writeMessage(e2, t2, n2) {
          const i2 = e2.getType();
          for (const r2 of i2.fields.byNumber()) if (G(r2, e2)) Se(r2, r2.oneof ? e2[r2.oneof.localName].value : e2[r2.localName], t2, n2);
          else if (r2.req) throw new Error("cannot encode field ".concat(i2.typeName, ".").concat(r2.name, " to binary: required field not set"));
          return n2.writeUnknownFields && this.writeUnknownFields(e2, t2), t2;
        }, writeField(e2, t2, n2, i2) {
          void 0 !== t2 && Se(e2, t2, n2, i2);
        } }, util: Object.assign(Object.assign({}, { setEnumType: v, initPartial(e2, t2) {
          if (void 0 === e2) return;
          const n2 = t2.getType();
          for (const i2 of n2.fields.byMember()) {
            const n3 = i2.localName, r2 = t2, s2 = e2;
            if (null != s2[n3]) switch (i2.kind) {
              case "oneof":
                const e3 = s2[n3].case;
                if (void 0 === e3) continue;
                const t3 = i2.findField(e3);
                let a2 = s2[n3].value;
                t3 && "message" == t3.kind && !Y(a2, t3.T) ? a2 = new t3.T(a2) : t3 && "scalar" === t3.kind && t3.T === O.BYTES && (a2 = Ie(a2)), r2[n3] = { case: e3, value: a2 };
                break;
              case "scalar":
              case "enum":
                let o2 = s2[n3];
                i2.T === O.BYTES && (o2 = i2.repeated ? o2.map(Ie) : Ie(o2)), r2[n3] = o2;
                break;
              case "map":
                switch (i2.V.kind) {
                  case "scalar":
                  case "enum":
                    if (i2.V.T === O.BYTES) for (const [e5, t4] of Object.entries(s2[n3])) r2[n3][e5] = Ie(t4);
                    else Object.assign(r2[n3], s2[n3]);
                    break;
                  case "message":
                    const e4 = i2.V.T;
                    for (const t4 of Object.keys(s2[n3])) {
                      let i3 = s2[n3][t4];
                      e4.fieldWrapper || (i3 = new e4(i3)), r2[n3][t4] = i3;
                    }
                }
                break;
              case "message":
                const c2 = i2.T;
                if (i2.repeated) r2[n3] = s2[n3].map(((e4) => Y(e4, c2) ? e4 : new c2(e4)));
                else {
                  const e4 = s2[n3];
                  c2.fieldWrapper ? "google.protobuf.BytesValue" === c2.typeName ? r2[n3] = Ie(e4) : r2[n3] = e4 : r2[n3] = Y(e4, c2) ? e4 : new c2(e4);
                }
            }
          }
        }, equals: (e2, t2, n2) => t2 === n2 || !(!t2 || !n2) && e2.fields.byMember().every(((e3) => {
          const i2 = t2[e3.localName], r2 = n2[e3.localName];
          if (e3.repeated) {
            if (i2.length !== r2.length) return false;
            switch (e3.kind) {
              case "message":
                return i2.every(((t3, n3) => e3.T.equals(t3, r2[n3])));
              case "scalar":
                return i2.every(((t3, n3) => L(e3.T, t3, r2[n3])));
              case "enum":
                return i2.every(((e4, t3) => L(O.INT32, e4, r2[t3])));
            }
            throw new Error("repeated cannot contain ".concat(e3.kind));
          }
          switch (e3.kind) {
            case "message":
              let t3 = i2, n3 = r2;
              return e3.T.fieldWrapper && (void 0 === t3 || Y(t3) || (t3 = e3.T.fieldWrapper.wrapField(t3)), void 0 === n3 || Y(n3) || (n3 = e3.T.fieldWrapper.wrapField(n3))), e3.T.equals(t3, n3);
            case "enum":
              return L(O.INT32, i2, r2);
            case "scalar":
              return L(e3.T, i2, r2);
            case "oneof":
              if (i2.case !== r2.case) return false;
              const s2 = e3.findField(i2.case);
              if (void 0 === s2) return true;
              switch (s2.kind) {
                case "message":
                  return s2.T.equals(i2.value, r2.value);
                case "enum":
                  return L(O.INT32, i2.value, r2.value);
                case "scalar":
                  return L(s2.T, i2.value, r2.value);
              }
              throw new Error("oneof cannot contain ".concat(s2.kind));
            case "map":
              const a2 = Object.keys(i2).concat(Object.keys(r2));
              switch (e3.V.kind) {
                case "message":
                  const t4 = e3.V.T;
                  return a2.every(((e4) => t4.equals(i2[e4], r2[e4])));
                case "enum":
                  return a2.every(((e4) => L(O.INT32, i2[e4], r2[e4])));
                case "scalar":
                  const n4 = e3.V.T;
                  return a2.every(((e4) => L(n4, i2[e4], r2[e4])));
              }
          }
        })), clone(e2) {
          const t2 = e2.getType(), n2 = new t2(), i2 = n2;
          for (const n3 of t2.fields.byMember()) {
            const t3 = e2[n3.localName];
            let r2;
            if (n3.repeated) r2 = t3.map(Pe);
            else if ("map" == n3.kind) {
              r2 = i2[n3.localName];
              for (const [e3, n4] of Object.entries(t3)) r2[e3] = Pe(n4);
            } else r2 = "oneof" == n3.kind ? n3.findField(t3.case) ? { case: t3.case, value: Pe(t3.value) } : { case: void 0 } : Pe(t3);
            i2[n3.localName] = r2;
          }
          for (const n3 of t2.runtime.bin.listUnknownFields(e2)) t2.runtime.bin.onUnknownField(i2, n3.no, n3.wireType, n3.data);
          return n2;
        } }), { newFieldList: je, initFields: qe }), makeMessageType(e2, t2, n2) {
          return (function(e3, t3, n3, i2) {
            var r2;
            const s2 = null !== (r2 = null == i2 ? void 0 : i2.localName) && void 0 !== r2 ? r2 : t3.substring(t3.lastIndexOf(".") + 1), a2 = { [s2]: function(t4) {
              e3.util.initFields(this), e3.util.initPartial(t4, this);
            } }[s2];
            return Object.setPrototypeOf(a2.prototype, new b()), Object.assign(a2, { runtime: e3, typeName: t3, fields: e3.util.newFieldList(n3), fromBinary: (e4, t4) => new a2().fromBinary(e4, t4), fromJson: (e4, t4) => new a2().fromJson(e4, t4), fromJsonString: (e4, t4) => new a2().fromJsonString(e4, t4), equals: (t4, n4) => e3.util.equals(a2, t4, n4) }), a2;
          })(this, e2, t2, n2);
        }, makeEnum: k, makeEnumType: f, getEnumType: g, makeExtension(e2, t2, n2) {
          return /* @__PURE__ */ (function(e3, t3, n3, i2) {
            let r2;
            return { typeName: t3, extendee: n3, get field() {
              if (!r2) {
                const n4 = "function" == typeof i2 ? i2() : i2;
                n4.name = t3.split(".").pop(), n4.jsonName = "[".concat(t3, "]"), r2 = e3.util.newFieldList([n4]).list()[0];
              }
              return r2;
            }, runtime: e3 };
          })(this, e2, t2, n2);
        } });
        var je, qe;
        class Ve extends b {
          constructor(e2) {
            super(), this.seconds = M.zero, this.nanos = 0, Be.util.initPartial(e2, this);
          }
          fromJson(e2, t2) {
            if ("string" != typeof e2) throw new Error("cannot decode google.protobuf.Timestamp from JSON: ".concat(Be.json.debug(e2)));
            const n2 = e2.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
            if (!n2) throw new Error("cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string");
            const i2 = Date.parse(n2[1] + "-" + n2[2] + "-" + n2[3] + "T" + n2[4] + ":" + n2[5] + ":" + n2[6] + (n2[8] ? n2[8] : "Z"));
            if (Number.isNaN(i2)) throw new Error("cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string");
            if (i2 < Date.parse("0001-01-01T00:00:00Z") || i2 > Date.parse("9999-12-31T23:59:59Z")) throw new Error("cannot decode message google.protobuf.Timestamp from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive");
            return this.seconds = M.parse(i2 / 1e3), this.nanos = 0, n2[7] && (this.nanos = parseInt("1" + n2[7] + "0".repeat(9 - n2[7].length)) - 1e9), this;
          }
          toJson(e2) {
            const t2 = 1e3 * Number(this.seconds);
            if (t2 < Date.parse("0001-01-01T00:00:00Z") || t2 > Date.parse("9999-12-31T23:59:59Z")) throw new Error("cannot encode google.protobuf.Timestamp to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive");
            if (this.nanos < 0) throw new Error("cannot encode google.protobuf.Timestamp to JSON: nanos must not be negative");
            let n2 = "Z";
            if (this.nanos > 0) {
              const e3 = (this.nanos + 1e9).toString().substring(1);
              n2 = "000000" === e3.substring(3) ? "." + e3.substring(0, 3) + "Z" : "000" === e3.substring(6) ? "." + e3.substring(0, 6) + "Z" : "." + e3 + "Z";
            }
            return new Date(t2).toISOString().replace(".000Z", n2);
          }
          toDate() {
            return new Date(1e3 * Number(this.seconds) + Math.ceil(this.nanos / 1e6));
          }
          static now() {
            return Ve.fromDate(/* @__PURE__ */ new Date());
          }
          static fromDate(e2) {
            const t2 = e2.getTime();
            return new Ve({ seconds: M.parse(Math.floor(t2 / 1e3)), nanos: t2 % 1e3 * 1e6 });
          }
          static fromBinary(e2, t2) {
            return new Ve().fromBinary(e2, t2);
          }
          static fromJson(e2, t2) {
            return new Ve().fromJson(e2, t2);
          }
          static fromJsonString(e2, t2) {
            return new Ve().fromJsonString(e2, t2);
          }
          static equals(e2, t2) {
            return Be.util.equals(Ve, e2, t2);
          }
        }
        Ve.runtime = Be, Ve.typeName = "google.protobuf.Timestamp", Ve.fields = Be.util.newFieldList((() => [{ no: 1, name: "seconds", kind: "scalar", T: 3 }, { no: 2, name: "nanos", kind: "scalar", T: 5 }]));
        const He = Be.makeMessageType("livekit.MetricsBatch", (() => [{ no: 1, name: "timestamp_ms", kind: "scalar", T: 3 }, { no: 2, name: "normalized_timestamp", kind: "message", T: Ve }, { no: 3, name: "str_data", kind: "scalar", T: 9, repeated: true }, { no: 4, name: "time_series", kind: "message", T: We, repeated: true }, { no: 5, name: "events", kind: "message", T: ze, repeated: true }])), We = Be.makeMessageType("livekit.TimeSeriesMetric", (() => [{ no: 1, name: "label", kind: "scalar", T: 13 }, { no: 2, name: "participant_identity", kind: "scalar", T: 13 }, { no: 3, name: "track_sid", kind: "scalar", T: 13 }, { no: 4, name: "samples", kind: "message", T: Ke, repeated: true }, { no: 5, name: "rid", kind: "scalar", T: 13 }])), Ke = Be.makeMessageType("livekit.MetricSample", (() => [{ no: 1, name: "timestamp_ms", kind: "scalar", T: 3 }, { no: 2, name: "normalized_timestamp", kind: "message", T: Ve }, { no: 3, name: "value", kind: "scalar", T: 2 }])), ze = Be.makeMessageType("livekit.EventMetric", (() => [{ no: 1, name: "label", kind: "scalar", T: 13 }, { no: 2, name: "participant_identity", kind: "scalar", T: 13 }, { no: 3, name: "track_sid", kind: "scalar", T: 13 }, { no: 4, name: "start_timestamp_ms", kind: "scalar", T: 3 }, { no: 5, name: "end_timestamp_ms", kind: "scalar", T: 3, opt: true }, { no: 6, name: "normalized_start_timestamp", kind: "message", T: Ve }, { no: 7, name: "normalized_end_timestamp", kind: "message", T: Ve, opt: true }, { no: 8, name: "metadata", kind: "scalar", T: 9 }, { no: 9, name: "rid", kind: "scalar", T: 13 }])), Je = Be.makeEnum("livekit.AudioCodec", [{ no: 0, name: "DEFAULT_AC" }, { no: 1, name: "OPUS" }, { no: 2, name: "AAC" }, { no: 3, name: "AC_MP3" }]), Ge = Be.makeEnum("livekit.VideoCodec", [{ no: 0, name: "DEFAULT_VC" }, { no: 1, name: "H264_BASELINE" }, { no: 2, name: "H264_MAIN" }, { no: 3, name: "H264_HIGH" }, { no: 4, name: "VP8" }]), Qe = Be.makeEnum("livekit.ImageCodec", [{ no: 0, name: "IC_DEFAULT" }, { no: 1, name: "IC_JPEG" }]), Ye = Be.makeEnum("livekit.BackupCodecPolicy", [{ no: 0, name: "PREFER_REGRESSION" }, { no: 1, name: "SIMULCAST" }, { no: 2, name: "REGRESSION" }]), Xe = Be.makeEnum("livekit.TrackType", [{ no: 0, name: "AUDIO" }, { no: 1, name: "VIDEO" }, { no: 2, name: "DATA" }]), Ze = Be.makeEnum("livekit.TrackSource", [{ no: 0, name: "UNKNOWN" }, { no: 1, name: "CAMERA" }, { no: 2, name: "MICROPHONE" }, { no: 3, name: "SCREEN_SHARE" }, { no: 4, name: "SCREEN_SHARE_AUDIO" }]), $e = Be.makeEnum("livekit.VideoQuality", [{ no: 0, name: "LOW" }, { no: 1, name: "MEDIUM" }, { no: 2, name: "HIGH" }, { no: 3, name: "OFF" }]), et = Be.makeEnum("livekit.ConnectionQuality", [{ no: 0, name: "POOR" }, { no: 1, name: "GOOD" }, { no: 2, name: "EXCELLENT" }, { no: 3, name: "LOST" }]), tt = Be.makeEnum("livekit.ClientConfigSetting", [{ no: 0, name: "UNSET" }, { no: 1, name: "DISABLED" }, { no: 2, name: "ENABLED" }]), nt = Be.makeEnum("livekit.DisconnectReason", [{ no: 0, name: "UNKNOWN_REASON" }, { no: 1, name: "CLIENT_INITIATED" }, { no: 2, name: "DUPLICATE_IDENTITY" }, { no: 3, name: "SERVER_SHUTDOWN" }, { no: 4, name: "PARTICIPANT_REMOVED" }, { no: 5, name: "ROOM_DELETED" }, { no: 6, name: "STATE_MISMATCH" }, { no: 7, name: "JOIN_FAILURE" }, { no: 8, name: "MIGRATION" }, { no: 9, name: "SIGNAL_CLOSE" }, { no: 10, name: "ROOM_CLOSED" }, { no: 11, name: "USER_UNAVAILABLE" }, { no: 12, name: "USER_REJECTED" }, { no: 13, name: "SIP_TRUNK_FAILURE" }, { no: 14, name: "CONNECTION_TIMEOUT" }, { no: 15, name: "MEDIA_FAILURE" }, { no: 16, name: "AGENT_ERROR" }]), it = Be.makeEnum("livekit.ReconnectReason", [{ no: 0, name: "RR_UNKNOWN" }, { no: 1, name: "RR_SIGNAL_DISCONNECTED" }, { no: 2, name: "RR_PUBLISHER_FAILED" }, { no: 3, name: "RR_SUBSCRIBER_FAILED" }, { no: 4, name: "RR_SWITCH_CANDIDATE" }]), rt = Be.makeEnum("livekit.SubscriptionError", [{ no: 0, name: "SE_UNKNOWN" }, { no: 1, name: "SE_CODEC_UNSUPPORTED" }, { no: 2, name: "SE_TRACK_NOTFOUND" }]), st = Be.makeEnum("livekit.AudioTrackFeature", [{ no: 0, name: "TF_STEREO" }, { no: 1, name: "TF_NO_DTX" }, { no: 2, name: "TF_AUTO_GAIN_CONTROL" }, { no: 3, name: "TF_ECHO_CANCELLATION" }, { no: 4, name: "TF_NOISE_SUPPRESSION" }, { no: 5, name: "TF_ENHANCED_NOISE_CANCELLATION" }, { no: 6, name: "TF_PRECONNECT_BUFFER" }]), at = Be.makeEnum("livekit.PacketTrailerFeature", [{ no: 0, name: "PTF_USER_TIMESTAMP" }, { no: 1, name: "PTF_FRAME_ID" }]), ot = Be.makeMessageType("livekit.Room", (() => [{ no: 1, name: "sid", kind: "scalar", T: 9 }, { no: 2, name: "name", kind: "scalar", T: 9 }, { no: 3, name: "empty_timeout", kind: "scalar", T: 13 }, { no: 14, name: "departure_timeout", kind: "scalar", T: 13 }, { no: 4, name: "max_participants", kind: "scalar", T: 13 }, { no: 5, name: "creation_time", kind: "scalar", T: 3 }, { no: 15, name: "creation_time_ms", kind: "scalar", T: 3 }, { no: 6, name: "turn_password", kind: "scalar", T: 9 }, { no: 7, name: "enabled_codecs", kind: "message", T: ct, repeated: true }, { no: 8, name: "metadata", kind: "scalar", T: 9 }, { no: 9, name: "num_participants", kind: "scalar", T: 13 }, { no: 11, name: "num_publishers", kind: "scalar", T: 13 }, { no: 10, name: "active_recording", kind: "scalar", T: 8 }, { no: 13, name: "version", kind: "message", T: Wt }])), ct = Be.makeMessageType("livekit.Codec", (() => [{ no: 1, name: "mime", kind: "scalar", T: 9 }, { no: 2, name: "fmtp_line", kind: "scalar", T: 9 }])), dt = Be.makeMessageType("livekit.ParticipantPermission", (() => [{ no: 1, name: "can_subscribe", kind: "scalar", T: 8 }, { no: 2, name: "can_publish", kind: "scalar", T: 8 }, { no: 3, name: "can_publish_data", kind: "scalar", T: 8 }, { no: 9, name: "can_publish_sources", kind: "enum", T: Be.getEnumType(Ze), repeated: true }, { no: 7, name: "hidden", kind: "scalar", T: 8 }, { no: 8, name: "recorder", kind: "scalar", T: 8 }, { no: 10, name: "can_update_metadata", kind: "scalar", T: 8 }, { no: 11, name: "agent", kind: "scalar", T: 8 }, { no: 12, name: "can_subscribe_metrics", kind: "scalar", T: 8 }, { no: 13, name: "can_manage_agent_session", kind: "scalar", T: 8 }])), lt = Be.makeMessageType("livekit.ParticipantInfo", (() => [{ no: 1, name: "sid", kind: "scalar", T: 9 }, { no: 2, name: "identity", kind: "scalar", T: 9 }, { no: 3, name: "state", kind: "enum", T: Be.getEnumType(ut) }, { no: 4, name: "tracks", kind: "message", T: vt, repeated: true }, { no: 5, name: "metadata", kind: "scalar", T: 9 }, { no: 6, name: "joined_at", kind: "scalar", T: 3 }, { no: 17, name: "joined_at_ms", kind: "scalar", T: 3 }, { no: 9, name: "name", kind: "scalar", T: 9 }, { no: 10, name: "version", kind: "scalar", T: 13 }, { no: 11, name: "permission", kind: "message", T: dt }, { no: 12, name: "region", kind: "scalar", T: 9 }, { no: 13, name: "is_publisher", kind: "scalar", T: 8 }, { no: 14, name: "kind", kind: "enum", T: Be.getEnumType(ht) }, { no: 15, name: "attributes", kind: "map", K: 9, V: { kind: "scalar", T: 9 } }, { no: 16, name: "disconnect_reason", kind: "enum", T: Be.getEnumType(nt) }, { no: 18, name: "kind_details", kind: "enum", T: Be.getEnumType(pt), repeated: true }, { no: 19, name: "data_tracks", kind: "message", T: ft, repeated: true }, { no: 20, name: "client_protocol", kind: "scalar", T: 5 }])), ut = Be.makeEnum("livekit.ParticipantInfo.State", [{ no: 0, name: "JOINING" }, { no: 1, name: "JOINED" }, { no: 2, name: "ACTIVE" }, { no: 3, name: "DISCONNECTED" }]), ht = Be.makeEnum("livekit.ParticipantInfo.Kind", [{ no: 0, name: "STANDARD" }, { no: 1, name: "INGRESS" }, { no: 2, name: "EGRESS" }, { no: 3, name: "SIP" }, { no: 4, name: "AGENT" }, { no: 7, name: "CONNECTOR" }, { no: 8, name: "BRIDGE" }]), pt = Be.makeEnum("livekit.ParticipantInfo.KindDetail", [{ no: 0, name: "CLOUD_AGENT" }, { no: 1, name: "FORWARDED" }, { no: 2, name: "CONNECTOR_WHATSAPP" }, { no: 3, name: "CONNECTOR_TWILIO" }, { no: 4, name: "BRIDGE_RTSP" }]), mt = Be.makeEnum("livekit.Encryption.Type", [{ no: 0, name: "NONE" }, { no: 1, name: "GCM" }, { no: 2, name: "CUSTOM" }]), gt = Be.makeMessageType("livekit.SimulcastCodecInfo", (() => [{ no: 1, name: "mime_type", kind: "scalar", T: 9 }, { no: 2, name: "mid", kind: "scalar", T: 9 }, { no: 3, name: "cid", kind: "scalar", T: 9 }, { no: 4, name: "layers", kind: "message", T: yt, repeated: true }, { no: 5, name: "video_layer_mode", kind: "enum", T: Be.getEnumType(bt) }, { no: 6, name: "sdp_cid", kind: "scalar", T: 9 }])), vt = Be.makeMessageType("livekit.TrackInfo", (() => [{ no: 1, name: "sid", kind: "scalar", T: 9 }, { no: 2, name: "type", kind: "enum", T: Be.getEnumType(Xe) }, { no: 3, name: "name", kind: "scalar", T: 9 }, { no: 4, name: "muted", kind: "scalar", T: 8 }, { no: 5, name: "width", kind: "scalar", T: 13 }, { no: 6, name: "height", kind: "scalar", T: 13 }, { no: 7, name: "simulcast", kind: "scalar", T: 8 }, { no: 8, name: "disable_dtx", kind: "scalar", T: 8 }, { no: 9, name: "source", kind: "enum", T: Be.getEnumType(Ze) }, { no: 10, name: "layers", kind: "message", T: yt, repeated: true }, { no: 11, name: "mime_type", kind: "scalar", T: 9 }, { no: 12, name: "mid", kind: "scalar", T: 9 }, { no: 13, name: "codecs", kind: "message", T: gt, repeated: true }, { no: 14, name: "stereo", kind: "scalar", T: 8 }, { no: 15, name: "disable_red", kind: "scalar", T: 8 }, { no: 16, name: "encryption", kind: "enum", T: Be.getEnumType(mt) }, { no: 17, name: "stream", kind: "scalar", T: 9 }, { no: 18, name: "version", kind: "message", T: Wt }, { no: 19, name: "audio_features", kind: "enum", T: Be.getEnumType(st), repeated: true }, { no: 20, name: "backup_codec_policy", kind: "enum", T: Be.getEnumType(Ye) }, { no: 21, name: "packet_trailer_features", kind: "enum", T: Be.getEnumType(at), repeated: true }])), ft = Be.makeMessageType("livekit.DataTrackInfo", (() => [{ no: 1, name: "pub_handle", kind: "scalar", T: 13 }, { no: 2, name: "sid", kind: "scalar", T: 9 }, { no: 3, name: "name", kind: "scalar", T: 9 }, { no: 4, name: "encryption", kind: "enum", T: Be.getEnumType(mt) }])), kt = Be.makeMessageType("livekit.DataTrackSubscriptionOptions", (() => [{ no: 1, name: "target_fps", kind: "scalar", T: 13, opt: true }])), yt = Be.makeMessageType("livekit.VideoLayer", (() => [{ no: 1, name: "quality", kind: "enum", T: Be.getEnumType($e) }, { no: 2, name: "width", kind: "scalar", T: 13 }, { no: 3, name: "height", kind: "scalar", T: 13 }, { no: 4, name: "bitrate", kind: "scalar", T: 13 }, { no: 5, name: "ssrc", kind: "scalar", T: 13 }, { no: 6, name: "spatial_layer", kind: "scalar", T: 5 }, { no: 7, name: "rid", kind: "scalar", T: 9 }, { no: 8, name: "repair_ssrc", kind: "scalar", T: 13 }])), bt = Be.makeEnum("livekit.VideoLayer.Mode", [{ no: 0, name: "MODE_UNUSED" }, { no: 1, name: "ONE_SPATIAL_LAYER_PER_STREAM" }, { no: 2, name: "MULTIPLE_SPATIAL_LAYERS_PER_STREAM" }, { no: 3, name: "ONE_SPATIAL_LAYER_PER_STREAM_INCOMPLETE_RTCP_SR" }]), Tt = Be.makeMessageType("livekit.DataPacket", (() => [{ no: 1, name: "kind", kind: "enum", T: Be.getEnumType(St) }, { no: 4, name: "participant_identity", kind: "scalar", T: 9 }, { no: 5, name: "destination_identities", kind: "scalar", T: 9, repeated: true }, { no: 2, name: "user", kind: "message", T: Pt, oneof: "value" }, { no: 3, name: "speaker", kind: "message", T: wt, oneof: "value" }, { no: 6, name: "sip_dtmf", kind: "message", T: It, oneof: "value" }, { no: 7, name: "transcription", kind: "message", T: Dt, oneof: "value" }, { no: 8, name: "metrics", kind: "message", T: He, oneof: "value" }, { no: 9, name: "chat_message", kind: "message", T: Mt, oneof: "value" }, { no: 10, name: "rpc_request", kind: "message", T: Ot, oneof: "value" }, { no: 11, name: "rpc_ack", kind: "message", T: At, oneof: "value" }, { no: 12, name: "rpc_response", kind: "message", T: Nt, oneof: "value" }, { no: 13, name: "stream_header", kind: "message", T: Gt, oneof: "value" }, { no: 14, name: "stream_chunk", kind: "message", T: Qt, oneof: "value" }, { no: 15, name: "stream_trailer", kind: "message", T: Yt, oneof: "value" }, { no: 18, name: "encrypted_packet", kind: "message", T: Et, oneof: "value" }, { no: 16, name: "sequence", kind: "scalar", T: 13 }, { no: 17, name: "participant_sid", kind: "scalar", T: 9 }])), St = Be.makeEnum("livekit.DataPacket.Kind", [{ no: 0, name: "RELIABLE" }, { no: 1, name: "LOSSY" }]), Et = Be.makeMessageType("livekit.EncryptedPacket", (() => [{ no: 1, name: "encryption_type", kind: "enum", T: Be.getEnumType(mt) }, { no: 2, name: "iv", kind: "scalar", T: 12 }, { no: 3, name: "key_index", kind: "scalar", T: 13 }, { no: 4, name: "encrypted_value", kind: "scalar", T: 12 }])), Ct = Be.makeMessageType("livekit.EncryptedPacketPayload", (() => [{ no: 1, name: "user", kind: "message", T: Pt, oneof: "value" }, { no: 3, name: "chat_message", kind: "message", T: Mt, oneof: "value" }, { no: 4, name: "rpc_request", kind: "message", T: Ot, oneof: "value" }, { no: 5, name: "rpc_ack", kind: "message", T: At, oneof: "value" }, { no: 6, name: "rpc_response", kind: "message", T: Nt, oneof: "value" }, { no: 7, name: "stream_header", kind: "message", T: Gt, oneof: "value" }, { no: 8, name: "stream_chunk", kind: "message", T: Qt, oneof: "value" }, { no: 9, name: "stream_trailer", kind: "message", T: Yt, oneof: "value" }])), wt = Be.makeMessageType("livekit.ActiveSpeakerUpdate", (() => [{ no: 1, name: "speakers", kind: "message", T: Rt, repeated: true }])), Rt = Be.makeMessageType("livekit.SpeakerInfo", (() => [{ no: 1, name: "sid", kind: "scalar", T: 9 }, { no: 2, name: "level", kind: "scalar", T: 2 }, { no: 3, name: "active", kind: "scalar", T: 8 }])), Pt = Be.makeMessageType("livekit.UserPacket", (() => [{ no: 1, name: "participant_sid", kind: "scalar", T: 9 }, { no: 5, name: "participant_identity", kind: "scalar", T: 9 }, { no: 2, name: "payload", kind: "scalar", T: 12 }, { no: 3, name: "destination_sids", kind: "scalar", T: 9, repeated: true }, { no: 6, name: "destination_identities", kind: "scalar", T: 9, repeated: true }, { no: 4, name: "topic", kind: "scalar", T: 9, opt: true }, { no: 8, name: "id", kind: "scalar", T: 9, opt: true }, { no: 9, name: "start_time", kind: "scalar", T: 4, opt: true }, { no: 10, name: "end_time", kind: "scalar", T: 4, opt: true }, { no: 11, name: "nonce", kind: "scalar", T: 12 }])), It = Be.makeMessageType("livekit.SipDTMF", (() => [{ no: 3, name: "code", kind: "scalar", T: 13 }, { no: 4, name: "digit", kind: "scalar", T: 9 }])), Dt = Be.makeMessageType("livekit.Transcription", (() => [{ no: 2, name: "transcribed_participant_identity", kind: "scalar", T: 9 }, { no: 3, name: "track_id", kind: "scalar", T: 9 }, { no: 4, name: "segments", kind: "message", T: _t, repeated: true }])), _t = Be.makeMessageType("livekit.TranscriptionSegment", (() => [{ no: 1, name: "id", kind: "scalar", T: 9 }, { no: 2, name: "text", kind: "scalar", T: 9 }, { no: 3, name: "start_time", kind: "scalar", T: 4 }, { no: 4, name: "end_time", kind: "scalar", T: 4 }, { no: 5, name: "final", kind: "scalar", T: 8 }, { no: 6, name: "language", kind: "scalar", T: 9 }])), Mt = Be.makeMessageType("livekit.ChatMessage", (() => [{ no: 1, name: "id", kind: "scalar", T: 9 }, { no: 2, name: "timestamp", kind: "scalar", T: 3 }, { no: 3, name: "edit_timestamp", kind: "scalar", T: 3, opt: true }, { no: 4, name: "message", kind: "scalar", T: 9 }, { no: 5, name: "deleted", kind: "scalar", T: 8 }, { no: 6, name: "generated", kind: "scalar", T: 8 }])), Ot = Be.makeMessageType("livekit.RpcRequest", (() => [{ no: 1, name: "id", kind: "scalar", T: 9 }, { no: 2, name: "method", kind: "scalar", T: 9 }, { no: 3, name: "payload", kind: "scalar", T: 9 }, { no: 4, name: "response_timeout_ms", kind: "scalar", T: 13 }, { no: 5, name: "version", kind: "scalar", T: 13 }, { no: 6, name: "compressed_payload", kind: "scalar", T: 12 }])), At = Be.makeMessageType("livekit.RpcAck", (() => [{ no: 1, name: "request_id", kind: "scalar", T: 9 }])), Nt = Be.makeMessageType("livekit.RpcResponse", (() => [{ no: 1, name: "request_id", kind: "scalar", T: 9 }, { no: 2, name: "payload", kind: "scalar", T: 9, oneof: "value" }, { no: 3, name: "error", kind: "message", T: Lt, oneof: "value" }, { no: 4, name: "compressed_payload", kind: "scalar", T: 12, oneof: "value" }])), Lt = Be.makeMessageType("livekit.RpcError", (() => [{ no: 1, name: "code", kind: "scalar", T: 13 }, { no: 2, name: "message", kind: "scalar", T: 9 }, { no: 3, name: "data", kind: "scalar", T: 9 }])), xt = Be.makeMessageType("livekit.ParticipantTracks", (() => [{ no: 1, name: "participant_sid", kind: "scalar", T: 9 }, { no: 2, name: "track_sids", kind: "scalar", T: 9, repeated: true }])), Ut = Be.makeMessageType("livekit.ServerInfo", (() => [{ no: 1, name: "edition", kind: "enum", T: Be.getEnumType(Ft) }, { no: 2, name: "version", kind: "scalar", T: 9 }, { no: 3, name: "protocol", kind: "scalar", T: 5 }, { no: 4, name: "region", kind: "scalar", T: 9 }, { no: 5, name: "node_id", kind: "scalar", T: 9 }, { no: 6, name: "debug_info", kind: "scalar", T: 9 }, { no: 7, name: "agent_protocol", kind: "scalar", T: 5 }])), Ft = Be.makeEnum("livekit.ServerInfo.Edition", [{ no: 0, name: "Standard" }, { no: 1, name: "Cloud" }]), Bt = Be.makeMessageType("livekit.ClientInfo", (() => [{ no: 1, name: "sdk", kind: "enum", T: Be.getEnumType(jt) }, { no: 2, name: "version", kind: "scalar", T: 9 }, { no: 3, name: "protocol", kind: "scalar", T: 5 }, { no: 4, name: "os", kind: "scalar", T: 9 }, { no: 5, name: "os_version", kind: "scalar", T: 9 }, { no: 6, name: "device_model", kind: "scalar", T: 9 }, { no: 7, name: "browser", kind: "scalar", T: 9 }, { no: 8, name: "browser_version", kind: "scalar", T: 9 }, { no: 9, name: "address", kind: "scalar", T: 9 }, { no: 10, name: "network", kind: "scalar", T: 9 }, { no: 11, name: "other_sdks", kind: "scalar", T: 9 }, { no: 12, name: "client_protocol", kind: "scalar", T: 5 }])), jt = Be.makeEnum("livekit.ClientInfo.SDK", [{ no: 0, name: "UNKNOWN" }, { no: 1, name: "JS" }, { no: 2, name: "SWIFT" }, { no: 3, name: "ANDROID" }, { no: 4, name: "FLUTTER" }, { no: 5, name: "GO" }, { no: 6, name: "UNITY" }, { no: 7, name: "REACT_NATIVE" }, { no: 8, name: "RUST" }, { no: 9, name: "PYTHON" }, { no: 10, name: "CPP" }, { no: 11, name: "UNITY_WEB" }, { no: 12, name: "NODE" }, { no: 13, name: "UNREAL" }, { no: 14, name: "ESP32" }]), qt = Be.makeMessageType("livekit.ClientConfiguration", (() => [{ no: 1, name: "video", kind: "message", T: Vt }, { no: 2, name: "screen", kind: "message", T: Vt }, { no: 3, name: "resume_connection", kind: "enum", T: Be.getEnumType(tt) }, { no: 4, name: "disabled_codecs", kind: "message", T: Ht }, { no: 5, name: "force_relay", kind: "enum", T: Be.getEnumType(tt) }])), Vt = Be.makeMessageType("livekit.VideoConfiguration", (() => [{ no: 1, name: "hardware_encoder", kind: "enum", T: Be.getEnumType(tt) }])), Ht = Be.makeMessageType("livekit.DisabledCodecs", (() => [{ no: 1, name: "codecs", kind: "message", T: ct, repeated: true }, { no: 2, name: "publish", kind: "message", T: ct, repeated: true }])), Wt = Be.makeMessageType("livekit.TimedVersion", (() => [{ no: 1, name: "unix_micro", kind: "scalar", T: 3 }, { no: 2, name: "ticks", kind: "scalar", T: 5 }])), Kt = Be.makeEnum("livekit.DataStream.OperationType", [{ no: 0, name: "CREATE" }, { no: 1, name: "UPDATE" }, { no: 2, name: "DELETE" }, { no: 3, name: "REACTION" }]), zt = Be.makeMessageType("livekit.DataStream.TextHeader", (() => [{ no: 1, name: "operation_type", kind: "enum", T: Be.getEnumType(Kt) }, { no: 2, name: "version", kind: "scalar", T: 5 }, { no: 3, name: "reply_to_stream_id", kind: "scalar", T: 9 }, { no: 4, name: "attached_stream_ids", kind: "scalar", T: 9, repeated: true }, { no: 5, name: "generated", kind: "scalar", T: 8 }]), { localName: "DataStream_TextHeader" }), Jt = Be.makeMessageType("livekit.DataStream.ByteHeader", (() => [{ no: 1, name: "name", kind: "scalar", T: 9 }]), { localName: "DataStream_ByteHeader" }), Gt = Be.makeMessageType("livekit.DataStream.Header", (() => [{ no: 1, name: "stream_id", kind: "scalar", T: 9 }, { no: 2, name: "timestamp", kind: "scalar", T: 3 }, { no: 3, name: "topic", kind: "scalar", T: 9 }, { no: 4, name: "mime_type", kind: "scalar", T: 9 }, { no: 5, name: "total_length", kind: "scalar", T: 4, opt: true }, { no: 7, name: "encryption_type", kind: "enum", T: Be.getEnumType(mt) }, { no: 8, name: "attributes", kind: "map", K: 9, V: { kind: "scalar", T: 9 } }, { no: 9, name: "text_header", kind: "message", T: zt, oneof: "content_header" }, { no: 10, name: "byte_header", kind: "message", T: Jt, oneof: "content_header" }]), { localName: "DataStream_Header" }), Qt = Be.makeMessageType("livekit.DataStream.Chunk", (() => [{ no: 1, name: "stream_id", kind: "scalar", T: 9 }, { no: 2, name: "chunk_index", kind: "scalar", T: 4 }, { no: 3, name: "content", kind: "scalar", T: 12 }, { no: 4, name: "version", kind: "scalar", T: 5 }, { no: 5, name: "iv", kind: "scalar", T: 12, opt: true }]), { localName: "DataStream_Chunk" }), Yt = Be.makeMessageType("livekit.DataStream.Trailer", (() => [{ no: 1, name: "stream_id", kind: "scalar", T: 9 }, { no: 2, name: "reason", kind: "scalar", T: 9 }, { no: 3, name: "attributes", kind: "map", K: 9, V: { kind: "scalar", T: 9 } }]), { localName: "DataStream_Trailer" }), Xt = Be.makeMessageType("livekit.FilterParams", (() => [{ no: 1, name: "include_events", kind: "scalar", T: 9, repeated: true }, { no: 2, name: "exclude_events", kind: "scalar", T: 9, repeated: true }])), Zt = Be.makeMessageType("livekit.WebhookConfig", (() => [{ no: 1, name: "url", kind: "scalar", T: 9 }, { no: 2, name: "signing_key", kind: "scalar", T: 9 }, { no: 3, name: "filter_params", kind: "message", T: Xt }])), $t = Be.makeMessageType("livekit.SubscribedAudioCodec", (() => [{ no: 1, name: "codec", kind: "scalar", T: 9 }, { no: 2, name: "enabled", kind: "scalar", T: 8 }])), en = Be.makeEnum("livekit.JobRestartPolicy", [{ no: 0, name: "JRP_ON_FAILURE" }, { no: 1, name: "JRP_NEVER" }]), tn = Be.makeMessageType("livekit.RoomAgentDispatch", (() => [{ no: 1, name: "agent_name", kind: "scalar", T: 9 }, { no: 2, name: "metadata", kind: "scalar", T: 9 }, { no: 3, name: "restart_policy", kind: "enum", T: Be.getEnumType(en) }])), nn = Be.makeEnum("livekit.SignalTarget", [{ no: 0, name: "PUBLISHER" }, { no: 1, name: "SUBSCRIBER" }]), rn = Be.makeEnum("livekit.StreamState", [{ no: 0, name: "ACTIVE" }, { no: 1, name: "PAUSED" }]), sn = Be.makeEnum("livekit.CandidateProtocol", [{ no: 0, name: "UDP" }, { no: 1, name: "TCP" }, { no: 2, name: "TLS" }]), an = Be.makeMessageType("livekit.SignalRequest", (() => [{ no: 1, name: "offer", kind: "message", T: Sn, oneof: "message" }, { no: 2, name: "answer", kind: "message", T: Sn, oneof: "message" }, { no: 3, name: "trickle", kind: "message", T: vn, oneof: "message" }, { no: 4, name: "add_track", kind: "message", T: dn, oneof: "message" }, { no: 5, name: "mute", kind: "message", T: fn, oneof: "message" }, { no: 6, name: "subscription", kind: "message", T: Cn, oneof: "message" }, { no: 7, name: "track_setting", kind: "message", T: Pn, oneof: "message" }, { no: 8, name: "leave", kind: "message", T: _n, oneof: "message" }, { no: 10, name: "update_layers", kind: "message", T: On, oneof: "message" }, { no: 11, name: "subscription_permission", kind: "message", T: zn, oneof: "message" }, { no: 12, name: "sync_state", kind: "message", T: Qn, oneof: "message" }, { no: 13, name: "simulate", kind: "message", T: Zn, oneof: "message" }, { no: 14, name: "ping", kind: "scalar", T: 3, oneof: "message" }, { no: 15, name: "update_metadata", kind: "message", T: An, oneof: "message" }, { no: 16, name: "ping_req", kind: "message", T: $n, oneof: "message" }, { no: 17, name: "update_audio_track", kind: "message", T: In, oneof: "message" }, { no: 18, name: "update_video_track", kind: "message", T: Dn, oneof: "message" }, { no: 19, name: "publish_data_track_request", kind: "message", T: ln, oneof: "message" }, { no: 20, name: "unpublish_data_track_request", kind: "message", T: hn, oneof: "message" }, { no: 21, name: "update_data_subscription", kind: "message", T: wn, oneof: "message" }])), on = Be.makeMessageType("livekit.SignalResponse", (() => [{ no: 1, name: "join", kind: "message", T: kn, oneof: "message" }, { no: 2, name: "answer", kind: "message", T: Sn, oneof: "message" }, { no: 3, name: "offer", kind: "message", T: Sn, oneof: "message" }, { no: 4, name: "trickle", kind: "message", T: vn, oneof: "message" }, { no: 5, name: "update", kind: "message", T: En, oneof: "message" }, { no: 6, name: "track_published", kind: "message", T: bn, oneof: "message" }, { no: 8, name: "leave", kind: "message", T: _n, oneof: "message" }, { no: 9, name: "mute", kind: "message", T: fn, oneof: "message" }, { no: 10, name: "speakers_changed", kind: "message", T: Ln, oneof: "message" }, { no: 11, name: "room_update", kind: "message", T: xn, oneof: "message" }, { no: 12, name: "connection_quality", kind: "message", T: Fn, oneof: "message" }, { no: 13, name: "stream_state_update", kind: "message", T: jn, oneof: "message" }, { no: 14, name: "subscribed_quality_update", kind: "message", T: Hn, oneof: "message" }, { no: 15, name: "subscription_permission_update", kind: "message", T: Jn, oneof: "message" }, { no: 16, name: "refresh_token", kind: "scalar", T: 9, oneof: "message" }, { no: 17, name: "track_unpublished", kind: "message", T: Tn, oneof: "message" }, { no: 18, name: "pong", kind: "scalar", T: 3, oneof: "message" }, { no: 19, name: "reconnect", kind: "message", T: yn, oneof: "message" }, { no: 20, name: "pong_resp", kind: "message", T: ei, oneof: "message" }, { no: 21, name: "subscription_response", kind: "message", T: ii, oneof: "message" }, { no: 22, name: "request_response", kind: "message", T: ri, oneof: "message" }, { no: 23, name: "track_subscribed", kind: "message", T: ai, oneof: "message" }, { no: 24, name: "room_moved", kind: "message", T: Gn, oneof: "message" }, { no: 25, name: "media_sections_requirement", kind: "message", T: ui, oneof: "message" }, { no: 26, name: "subscribed_audio_codec_update", kind: "message", T: Wn, oneof: "message" }, { no: 27, name: "publish_data_track_response", kind: "message", T: un, oneof: "message" }, { no: 28, name: "unpublish_data_track_response", kind: "message", T: pn, oneof: "message" }, { no: 29, name: "data_track_subscriber_handles", kind: "message", T: mn, oneof: "message" }])), cn = Be.makeMessageType("livekit.SimulcastCodec", (() => [{ no: 1, name: "codec", kind: "scalar", T: 9 }, { no: 2, name: "cid", kind: "scalar", T: 9 }, { no: 4, name: "layers", kind: "message", T: yt, repeated: true }, { no: 5, name: "video_layer_mode", kind: "enum", T: Be.getEnumType(bt) }])), dn = Be.makeMessageType("livekit.AddTrackRequest", (() => [{ no: 1, name: "cid", kind: "scalar", T: 9 }, { no: 2, name: "name", kind: "scalar", T: 9 }, { no: 3, name: "type", kind: "enum", T: Be.getEnumType(Xe) }, { no: 4, name: "width", kind: "scalar", T: 13 }, { no: 5, name: "height", kind: "scalar", T: 13 }, { no: 6, name: "muted", kind: "scalar", T: 8 }, { no: 7, name: "disable_dtx", kind: "scalar", T: 8 }, { no: 8, name: "source", kind: "enum", T: Be.getEnumType(Ze) }, { no: 9, name: "layers", kind: "message", T: yt, repeated: true }, { no: 10, name: "simulcast_codecs", kind: "message", T: cn, repeated: true }, { no: 11, name: "sid", kind: "scalar", T: 9 }, { no: 12, name: "stereo", kind: "scalar", T: 8 }, { no: 13, name: "disable_red", kind: "scalar", T: 8 }, { no: 14, name: "encryption", kind: "enum", T: Be.getEnumType(mt) }, { no: 15, name: "stream", kind: "scalar", T: 9 }, { no: 16, name: "backup_codec_policy", kind: "enum", T: Be.getEnumType(Ye) }, { no: 17, name: "audio_features", kind: "enum", T: Be.getEnumType(st), repeated: true }, { no: 18, name: "packet_trailer_features", kind: "enum", T: Be.getEnumType(at), repeated: true }])), ln = Be.makeMessageType("livekit.PublishDataTrackRequest", (() => [{ no: 1, name: "pub_handle", kind: "scalar", T: 13 }, { no: 2, name: "name", kind: "scalar", T: 9 }, { no: 3, name: "encryption", kind: "enum", T: Be.getEnumType(mt) }])), un = Be.makeMessageType("livekit.PublishDataTrackResponse", (() => [{ no: 1, name: "info", kind: "message", T: ft }])), hn = Be.makeMessageType("livekit.UnpublishDataTrackRequest", (() => [{ no: 1, name: "pub_handle", kind: "scalar", T: 13 }])), pn = Be.makeMessageType("livekit.UnpublishDataTrackResponse", (() => [{ no: 1, name: "info", kind: "message", T: ft }])), mn = Be.makeMessageType("livekit.DataTrackSubscriberHandles", (() => [{ no: 1, name: "sub_handles", kind: "map", K: 13, V: { kind: "message", T: gn } }])), gn = Be.makeMessageType("livekit.DataTrackSubscriberHandles.PublishedDataTrack", (() => [{ no: 1, name: "publisher_identity", kind: "scalar", T: 9 }, { no: 2, name: "publisher_sid", kind: "scalar", T: 9 }, { no: 3, name: "track_sid", kind: "scalar", T: 9 }]), { localName: "DataTrackSubscriberHandles_PublishedDataTrack" }), vn = Be.makeMessageType("livekit.TrickleRequest", (() => [{ no: 1, name: "candidateInit", kind: "scalar", T: 9 }, { no: 2, name: "target", kind: "enum", T: Be.getEnumType(nn) }, { no: 3, name: "final", kind: "scalar", T: 8 }])), fn = Be.makeMessageType("livekit.MuteTrackRequest", (() => [{ no: 1, name: "sid", kind: "scalar", T: 9 }, { no: 2, name: "muted", kind: "scalar", T: 8 }])), kn = Be.makeMessageType("livekit.JoinResponse", (() => [{ no: 1, name: "room", kind: "message", T: ot }, { no: 2, name: "participant", kind: "message", T: lt }, { no: 3, name: "other_participants", kind: "message", T: lt, repeated: true }, { no: 4, name: "server_version", kind: "scalar", T: 9 }, { no: 5, name: "ice_servers", kind: "message", T: Nn, repeated: true }, { no: 6, name: "subscriber_primary", kind: "scalar", T: 8 }, { no: 7, name: "alternative_url", kind: "scalar", T: 9 }, { no: 8, name: "client_configuration", kind: "message", T: qt }, { no: 9, name: "server_region", kind: "scalar", T: 9 }, { no: 10, name: "ping_timeout", kind: "scalar", T: 5 }, { no: 11, name: "ping_interval", kind: "scalar", T: 5 }, { no: 12, name: "server_info", kind: "message", T: Ut }, { no: 13, name: "sif_trailer", kind: "scalar", T: 12 }, { no: 14, name: "enabled_publish_codecs", kind: "message", T: ct, repeated: true }, { no: 15, name: "fast_publish", kind: "scalar", T: 8 }])), yn = Be.makeMessageType("livekit.ReconnectResponse", (() => [{ no: 1, name: "ice_servers", kind: "message", T: Nn, repeated: true }, { no: 2, name: "client_configuration", kind: "message", T: qt }, { no: 3, name: "server_info", kind: "message", T: Ut }, { no: 4, name: "last_message_seq", kind: "scalar", T: 13 }])), bn = Be.makeMessageType("livekit.TrackPublishedResponse", (() => [{ no: 1, name: "cid", kind: "scalar", T: 9 }, { no: 2, name: "track", kind: "message", T: vt }])), Tn = Be.makeMessageType("livekit.TrackUnpublishedResponse", (() => [{ no: 1, name: "track_sid", kind: "scalar", T: 9 }])), Sn = Be.makeMessageType("livekit.SessionDescription", (() => [{ no: 1, name: "type", kind: "scalar", T: 9 }, { no: 2, name: "sdp", kind: "scalar", T: 9 }, { no: 3, name: "id", kind: "scalar", T: 13 }, { no: 4, name: "mid_to_track_id", kind: "map", K: 9, V: { kind: "scalar", T: 9 } }])), En = Be.makeMessageType("livekit.ParticipantUpdate", (() => [{ no: 1, name: "participants", kind: "message", T: lt, repeated: true }])), Cn = Be.makeMessageType("livekit.UpdateSubscription", (() => [{ no: 1, name: "track_sids", kind: "scalar", T: 9, repeated: true }, { no: 2, name: "subscribe", kind: "scalar", T: 8 }, { no: 3, name: "participant_tracks", kind: "message", T: xt, repeated: true }])), wn = Be.makeMessageType("livekit.UpdateDataSubscription", (() => [{ no: 1, name: "updates", kind: "message", T: Rn, repeated: true }])), Rn = Be.makeMessageType("livekit.UpdateDataSubscription.Update", (() => [{ no: 1, name: "track_sid", kind: "scalar", T: 9 }, { no: 2, name: "subscribe", kind: "scalar", T: 8 }, { no: 3, name: "options", kind: "message", T: kt }]), { localName: "UpdateDataSubscription_Update" }), Pn = Be.makeMessageType("livekit.UpdateTrackSettings", (() => [{ no: 1, name: "track_sids", kind: "scalar", T: 9, repeated: true }, { no: 3, name: "disabled", kind: "scalar", T: 8 }, { no: 4, name: "quality", kind: "enum", T: Be.getEnumType($e) }, { no: 5, name: "width", kind: "scalar", T: 13 }, { no: 6, name: "height", kind: "scalar", T: 13 }, { no: 7, name: "fps", kind: "scalar", T: 13 }, { no: 8, name: "priority", kind: "scalar", T: 13 }])), In = Be.makeMessageType("livekit.UpdateLocalAudioTrack", (() => [{ no: 1, name: "track_sid", kind: "scalar", T: 9 }, { no: 2, name: "features", kind: "enum", T: Be.getEnumType(st), repeated: true }])), Dn = Be.makeMessageType("livekit.UpdateLocalVideoTrack", (() => [{ no: 1, name: "track_sid", kind: "scalar", T: 9 }, { no: 2, name: "width", kind: "scalar", T: 13 }, { no: 3, name: "height", kind: "scalar", T: 13 }])), _n = Be.makeMessageType("livekit.LeaveRequest", (() => [{ no: 1, name: "can_reconnect", kind: "scalar", T: 8 }, { no: 2, name: "reason", kind: "enum", T: Be.getEnumType(nt) }, { no: 3, name: "action", kind: "enum", T: Be.getEnumType(Mn) }, { no: 4, name: "regions", kind: "message", T: ti }])), Mn = Be.makeEnum("livekit.LeaveRequest.Action", [{ no: 0, name: "DISCONNECT" }, { no: 1, name: "RESUME" }, { no: 2, name: "RECONNECT" }]), On = Be.makeMessageType("livekit.UpdateVideoLayers", (() => [{ no: 1, name: "track_sid", kind: "scalar", T: 9 }, { no: 2, name: "layers", kind: "message", T: yt, repeated: true }])), An = Be.makeMessageType("livekit.UpdateParticipantMetadata", (() => [{ no: 1, name: "metadata", kind: "scalar", T: 9 }, { no: 2, name: "name", kind: "scalar", T: 9 }, { no: 3, name: "attributes", kind: "map", K: 9, V: { kind: "scalar", T: 9 } }, { no: 4, name: "request_id", kind: "scalar", T: 13 }])), Nn = Be.makeMessageType("livekit.ICEServer", (() => [{ no: 1, name: "urls", kind: "scalar", T: 9, repeated: true }, { no: 2, name: "username", kind: "scalar", T: 9 }, { no: 3, name: "credential", kind: "scalar", T: 9 }])), Ln = Be.makeMessageType("livekit.SpeakersChanged", (() => [{ no: 1, name: "speakers", kind: "message", T: Rt, repeated: true }])), xn = Be.makeMessageType("livekit.RoomUpdate", (() => [{ no: 1, name: "room", kind: "message", T: ot }])), Un = Be.makeMessageType("livekit.ConnectionQualityInfo", (() => [{ no: 1, name: "participant_sid", kind: "scalar", T: 9 }, { no: 2, name: "quality", kind: "enum", T: Be.getEnumType(et) }, { no: 3, name: "score", kind: "scalar", T: 2 }])), Fn = Be.makeMessageType("livekit.ConnectionQualityUpdate", (() => [{ no: 1, name: "updates", kind: "message", T: Un, repeated: true }])), Bn = Be.makeMessageType("livekit.StreamStateInfo", (() => [{ no: 1, name: "participant_sid", kind: "scalar", T: 9 }, { no: 2, name: "track_sid", kind: "scalar", T: 9 }, { no: 3, name: "state", kind: "enum", T: Be.getEnumType(rn) }])), jn = Be.makeMessageType("livekit.StreamStateUpdate", (() => [{ no: 1, name: "stream_states", kind: "message", T: Bn, repeated: true }])), qn = Be.makeMessageType("livekit.SubscribedQuality", (() => [{ no: 1, name: "quality", kind: "enum", T: Be.getEnumType($e) }, { no: 2, name: "enabled", kind: "scalar", T: 8 }])), Vn = Be.makeMessageType("livekit.SubscribedCodec", (() => [{ no: 1, name: "codec", kind: "scalar", T: 9 }, { no: 2, name: "qualities", kind: "message", T: qn, repeated: true }])), Hn = Be.makeMessageType("livekit.SubscribedQualityUpdate", (() => [{ no: 1, name: "track_sid", kind: "scalar", T: 9 }, { no: 2, name: "subscribed_qualities", kind: "message", T: qn, repeated: true }, { no: 3, name: "subscribed_codecs", kind: "message", T: Vn, repeated: true }])), Wn = Be.makeMessageType("livekit.SubscribedAudioCodecUpdate", (() => [{ no: 1, name: "track_sid", kind: "scalar", T: 9 }, { no: 2, name: "subscribed_audio_codecs", kind: "message", T: $t, repeated: true }])), Kn = Be.makeMessageType("livekit.TrackPermission", (() => [{ no: 1, name: "participant_sid", kind: "scalar", T: 9 }, { no: 2, name: "all_tracks", kind: "scalar", T: 8 }, { no: 3, name: "track_sids", kind: "scalar", T: 9, repeated: true }, { no: 4, name: "participant_identity", kind: "scalar", T: 9 }])), zn = Be.makeMessageType("livekit.SubscriptionPermission", (() => [{ no: 1, name: "all_participants", kind: "scalar", T: 8 }, { no: 2, name: "track_permissions", kind: "message", T: Kn, repeated: true }])), Jn = Be.makeMessageType("livekit.SubscriptionPermissionUpdate", (() => [{ no: 1, name: "participant_sid", kind: "scalar", T: 9 }, { no: 2, name: "track_sid", kind: "scalar", T: 9 }, { no: 3, name: "allowed", kind: "scalar", T: 8 }])), Gn = Be.makeMessageType("livekit.RoomMovedResponse", (() => [{ no: 1, name: "room", kind: "message", T: ot }, { no: 2, name: "token", kind: "scalar", T: 9 }, { no: 3, name: "participant", kind: "message", T: lt }, { no: 4, name: "other_participants", kind: "message", T: lt, repeated: true }])), Qn = Be.makeMessageType("livekit.SyncState", (() => [{ no: 1, name: "answer", kind: "message", T: Sn }, { no: 2, name: "subscription", kind: "message", T: Cn }, { no: 3, name: "publish_tracks", kind: "message", T: bn, repeated: true }, { no: 4, name: "data_channels", kind: "message", T: Xn, repeated: true }, { no: 5, name: "offer", kind: "message", T: Sn }, { no: 6, name: "track_sids_disabled", kind: "scalar", T: 9, repeated: true }, { no: 7, name: "datachannel_receive_states", kind: "message", T: Yn, repeated: true }, { no: 8, name: "publish_data_tracks", kind: "message", T: un, repeated: true }])), Yn = Be.makeMessageType("livekit.DataChannelReceiveState", (() => [{ no: 1, name: "publisher_sid", kind: "scalar", T: 9 }, { no: 2, name: "last_seq", kind: "scalar", T: 13 }])), Xn = Be.makeMessageType("livekit.DataChannelInfo", (() => [{ no: 1, name: "label", kind: "scalar", T: 9 }, { no: 2, name: "id", kind: "scalar", T: 13 }, { no: 3, name: "target", kind: "enum", T: Be.getEnumType(nn) }])), Zn = Be.makeMessageType("livekit.SimulateScenario", (() => [{ no: 1, name: "speaker_update", kind: "scalar", T: 5, oneof: "scenario" }, { no: 2, name: "node_failure", kind: "scalar", T: 8, oneof: "scenario" }, { no: 3, name: "migration", kind: "scalar", T: 8, oneof: "scenario" }, { no: 4, name: "server_leave", kind: "scalar", T: 8, oneof: "scenario" }, { no: 5, name: "switch_candidate_protocol", kind: "enum", T: Be.getEnumType(sn), oneof: "scenario" }, { no: 6, name: "subscriber_bandwidth", kind: "scalar", T: 3, oneof: "scenario" }, { no: 7, name: "disconnect_signal_on_resume", kind: "scalar", T: 8, oneof: "scenario" }, { no: 8, name: "disconnect_signal_on_resume_no_messages", kind: "scalar", T: 8, oneof: "scenario" }, { no: 9, name: "leave_request_full_reconnect", kind: "scalar", T: 8, oneof: "scenario" }])), $n = Be.makeMessageType("livekit.Ping", (() => [{ no: 1, name: "timestamp", kind: "scalar", T: 3 }, { no: 2, name: "rtt", kind: "scalar", T: 3 }])), ei = Be.makeMessageType("livekit.Pong", (() => [{ no: 1, name: "last_ping_timestamp", kind: "scalar", T: 3 }, { no: 2, name: "timestamp", kind: "scalar", T: 3 }])), ti = Be.makeMessageType("livekit.RegionSettings", (() => [{ no: 1, name: "regions", kind: "message", T: ni, repeated: true }])), ni = Be.makeMessageType("livekit.RegionInfo", (() => [{ no: 1, name: "region", kind: "scalar", T: 9 }, { no: 2, name: "url", kind: "scalar", T: 9 }, { no: 3, name: "distance", kind: "scalar", T: 3 }])), ii = Be.makeMessageType("livekit.SubscriptionResponse", (() => [{ no: 1, name: "track_sid", kind: "scalar", T: 9 }, { no: 2, name: "err", kind: "enum", T: Be.getEnumType(rt) }])), ri = Be.makeMessageType("livekit.RequestResponse", (() => [{ no: 1, name: "request_id", kind: "scalar", T: 13 }, { no: 2, name: "reason", kind: "enum", T: Be.getEnumType(si) }, { no: 3, name: "message", kind: "scalar", T: 9 }, { no: 4, name: "trickle", kind: "message", T: vn, oneof: "request" }, { no: 5, name: "add_track", kind: "message", T: dn, oneof: "request" }, { no: 6, name: "mute", kind: "message", T: fn, oneof: "request" }, { no: 7, name: "update_metadata", kind: "message", T: An, oneof: "request" }, { no: 8, name: "update_audio_track", kind: "message", T: In, oneof: "request" }, { no: 9, name: "update_video_track", kind: "message", T: Dn, oneof: "request" }, { no: 10, name: "publish_data_track", kind: "message", T: ln, oneof: "request" }, { no: 11, name: "unpublish_data_track", kind: "message", T: hn, oneof: "request" }])), si = Be.makeEnum("livekit.RequestResponse.Reason", [{ no: 0, name: "OK" }, { no: 1, name: "NOT_FOUND" }, { no: 2, name: "NOT_ALLOWED" }, { no: 3, name: "LIMIT_EXCEEDED" }, { no: 4, name: "QUEUED" }, { no: 5, name: "UNSUPPORTED_TYPE" }, { no: 6, name: "UNCLASSIFIED_ERROR" }, { no: 7, name: "INVALID_HANDLE" }, { no: 8, name: "INVALID_NAME" }, { no: 9, name: "DUPLICATE_HANDLE" }, { no: 10, name: "DUPLICATE_NAME" }]), ai = Be.makeMessageType("livekit.TrackSubscribed", (() => [{ no: 1, name: "track_sid", kind: "scalar", T: 9 }])), oi = Be.makeMessageType("livekit.ConnectionSettings", (() => [{ no: 1, name: "auto_subscribe", kind: "scalar", T: 8 }, { no: 2, name: "adaptive_stream", kind: "scalar", T: 8 }, { no: 3, name: "subscriber_allow_pause", kind: "scalar", T: 8, opt: true }, { no: 4, name: "disable_ice_lite", kind: "scalar", T: 8 }, { no: 5, name: "auto_subscribe_data_track", kind: "scalar", T: 8, opt: true }])), ci = Be.makeMessageType("livekit.JoinRequest", (() => [{ no: 1, name: "client_info", kind: "message", T: Bt }, { no: 2, name: "connection_settings", kind: "message", T: oi }, { no: 3, name: "metadata", kind: "scalar", T: 9 }, { no: 4, name: "participant_attributes", kind: "map", K: 9, V: { kind: "scalar", T: 9 } }, { no: 5, name: "add_track_requests", kind: "message", T: dn, repeated: true }, { no: 6, name: "publisher_offer", kind: "message", T: Sn }, { no: 7, name: "reconnect", kind: "scalar", T: 8 }, { no: 8, name: "reconnect_reason", kind: "enum", T: Be.getEnumType(it) }, { no: 9, name: "participant_sid", kind: "scalar", T: 9 }, { no: 10, name: "sync_state", kind: "message", T: Qn }])), di = Be.makeMessageType("livekit.WrappedJoinRequest", (() => [{ no: 1, name: "compression", kind: "enum", T: Be.getEnumType(li) }, { no: 2, name: "join_request", kind: "scalar", T: 12 }])), li = Be.makeEnum("livekit.WrappedJoinRequest.Compression", [{ no: 0, name: "NONE" }, { no: 1, name: "GZIP" }]), ui = Be.makeMessageType("livekit.MediaSectionsRequirement", (() => [{ no: 1, name: "num_audios", kind: "scalar", T: 13 }, { no: 2, name: "num_videos", kind: "scalar", T: 13 }])), hi = Be.makeEnum("livekit.EncodingOptionsPreset", [{ no: 0, name: "H264_720P_30" }, { no: 1, name: "H264_720P_60" }, { no: 2, name: "H264_1080P_30" }, { no: 3, name: "H264_1080P_60" }, { no: 4, name: "PORTRAIT_H264_720P_30" }, { no: 5, name: "PORTRAIT_H264_720P_60" }, { no: 6, name: "PORTRAIT_H264_1080P_30" }, { no: 7, name: "PORTRAIT_H264_1080P_60" }]), pi = Be.makeEnum("livekit.EncodedFileType", [{ no: 0, name: "DEFAULT_FILETYPE" }, { no: 1, name: "MP4" }, { no: 2, name: "OGG" }, { no: 3, name: "MP3" }]), mi = Be.makeEnum("livekit.StreamProtocol", [{ no: 0, name: "DEFAULT_PROTOCOL" }, { no: 1, name: "RTMP" }, { no: 2, name: "SRT" }, { no: 3, name: "WEBSOCKET" }]), gi = Be.makeEnum("livekit.SegmentedFileProtocol", [{ no: 0, name: "DEFAULT_SEGMENTED_FILE_PROTOCOL" }, { no: 1, name: "HLS_PROTOCOL" }]), vi = Be.makeEnum("livekit.SegmentedFileSuffix", [{ no: 0, name: "INDEX" }, { no: 1, name: "TIMESTAMP" }]), fi = Be.makeEnum("livekit.ImageFileSuffix", [{ no: 0, name: "IMAGE_SUFFIX_INDEX" }, { no: 1, name: "IMAGE_SUFFIX_TIMESTAMP" }, { no: 2, name: "IMAGE_SUFFIX_NONE_OVERWRITE" }]), ki = Be.makeEnum("livekit.AudioMixing", [{ no: 0, name: "DEFAULT_MIXING" }, { no: 1, name: "DUAL_CHANNEL_AGENT" }, { no: 2, name: "DUAL_CHANNEL_ALTERNATE" }]), yi = Be.makeMessageType("livekit.EncodingOptions", (() => [{ no: 1, name: "width", kind: "scalar", T: 5 }, { no: 2, name: "height", kind: "scalar", T: 5 }, { no: 3, name: "depth", kind: "scalar", T: 5 }, { no: 4, name: "framerate", kind: "scalar", T: 5 }, { no: 5, name: "audio_codec", kind: "enum", T: Be.getEnumType(Je) }, { no: 6, name: "audio_bitrate", kind: "scalar", T: 5 }, { no: 7, name: "audio_frequency", kind: "scalar", T: 5 }, { no: 8, name: "video_codec", kind: "enum", T: Be.getEnumType(Ge) }, { no: 9, name: "video_bitrate", kind: "scalar", T: 5 }, { no: 10, name: "key_frame_interval", kind: "scalar", T: 1 }, { no: 11, name: "audio_quality", kind: "scalar", T: 5 }, { no: 12, name: "video_quality", kind: "scalar", T: 5 }])), bi = Be.makeMessageType("livekit.StreamOutput", (() => [{ no: 1, name: "protocol", kind: "enum", T: Be.getEnumType(mi) }, { no: 2, name: "urls", kind: "scalar", T: 9, repeated: true }])), Ti = Be.makeMessageType("livekit.SegmentedFileOutput", (() => [{ no: 1, name: "protocol", kind: "enum", T: Be.getEnumType(gi) }, { no: 2, name: "filename_prefix", kind: "scalar", T: 9 }, { no: 3, name: "playlist_name", kind: "scalar", T: 9 }, { no: 11, name: "live_playlist_name", kind: "scalar", T: 9 }, { no: 4, name: "segment_duration", kind: "scalar", T: 13 }, { no: 10, name: "filename_suffix", kind: "enum", T: Be.getEnumType(vi) }, { no: 8, name: "disable_manifest", kind: "scalar", T: 8 }, { no: 5, name: "s3", kind: "message", T: Ei, oneof: "output" }, { no: 6, name: "gcp", kind: "message", T: Ci, oneof: "output" }, { no: 7, name: "azure", kind: "message", T: wi, oneof: "output" }, { no: 9, name: "aliOSS", kind: "message", T: Ri, oneof: "output" }])), Si = Be.makeMessageType("livekit.ImageOutput", (() => [{ no: 1, name: "capture_interval", kind: "scalar", T: 13 }, { no: 2, name: "width", kind: "scalar", T: 5 }, { no: 3, name: "height", kind: "scalar", T: 5 }, { no: 4, name: "filename_prefix", kind: "scalar", T: 9 }, { no: 5, name: "filename_suffix", kind: "enum", T: Be.getEnumType(fi) }, { no: 6, name: "image_codec", kind: "enum", T: Be.getEnumType(Qe) }, { no: 7, name: "disable_manifest", kind: "scalar", T: 8 }, { no: 8, name: "s3", kind: "message", T: Ei, oneof: "output" }, { no: 9, name: "gcp", kind: "message", T: Ci, oneof: "output" }, { no: 10, name: "azure", kind: "message", T: wi, oneof: "output" }, { no: 11, name: "aliOSS", kind: "message", T: Ri, oneof: "output" }])), Ei = Be.makeMessageType("livekit.S3Upload", (() => [{ no: 1, name: "access_key", kind: "scalar", T: 9 }, { no: 2, name: "secret", kind: "scalar", T: 9 }, { no: 11, name: "session_token", kind: "scalar", T: 9 }, { no: 12, name: "assume_role_arn", kind: "scalar", T: 9 }, { no: 13, name: "assume_role_external_id", kind: "scalar", T: 9 }, { no: 3, name: "region", kind: "scalar", T: 9 }, { no: 4, name: "endpoint", kind: "scalar", T: 9 }, { no: 5, name: "bucket", kind: "scalar", T: 9 }, { no: 6, name: "force_path_style", kind: "scalar", T: 8 }, { no: 7, name: "metadata", kind: "map", K: 9, V: { kind: "scalar", T: 9 } }, { no: 8, name: "tagging", kind: "scalar", T: 9 }, { no: 9, name: "content_disposition", kind: "scalar", T: 9 }, { no: 10, name: "proxy", kind: "message", T: Pi }])), Ci = Be.makeMessageType("livekit.GCPUpload", (() => [{ no: 1, name: "credentials", kind: "scalar", T: 9 }, { no: 2, name: "bucket", kind: "scalar", T: 9 }, { no: 3, name: "proxy", kind: "message", T: Pi }])), wi = Be.makeMessageType("livekit.AzureBlobUpload", (() => [{ no: 1, name: "account_name", kind: "scalar", T: 9 }, { no: 2, name: "account_key", kind: "scalar", T: 9 }, { no: 3, name: "container_name", kind: "scalar", T: 9 }])), Ri = Be.makeMessageType("livekit.AliOSSUpload", (() => [{ no: 1, name: "access_key", kind: "scalar", T: 9 }, { no: 2, name: "secret", kind: "scalar", T: 9 }, { no: 3, name: "region", kind: "scalar", T: 9 }, { no: 4, name: "endpoint", kind: "scalar", T: 9 }, { no: 5, name: "bucket", kind: "scalar", T: 9 }])), Pi = Be.makeMessageType("livekit.ProxyConfig", (() => [{ no: 1, name: "url", kind: "scalar", T: 9 }, { no: 2, name: "username", kind: "scalar", T: 9 }, { no: 3, name: "password", kind: "scalar", T: 9 }])), Ii = Be.makeMessageType("livekit.AutoParticipantEgress", (() => [{ no: 1, name: "preset", kind: "enum", T: Be.getEnumType(hi), oneof: "options" }, { no: 2, name: "advanced", kind: "message", T: yi, oneof: "options" }, { no: 3, name: "file_outputs", kind: "message", T: Mi, repeated: true }, { no: 4, name: "segment_outputs", kind: "message", T: Ti, repeated: true }])), Di = Be.makeMessageType("livekit.AutoTrackEgress", (() => [{ no: 1, name: "filepath", kind: "scalar", T: 9 }, { no: 5, name: "disable_manifest", kind: "scalar", T: 8 }, { no: 2, name: "s3", kind: "message", T: Ei, oneof: "output" }, { no: 3, name: "gcp", kind: "message", T: Ci, oneof: "output" }, { no: 4, name: "azure", kind: "message", T: wi, oneof: "output" }, { no: 6, name: "aliOSS", kind: "message", T: Ri, oneof: "output" }])), _i = Be.makeMessageType("livekit.RoomCompositeEgressRequest", (() => [{ no: 1, name: "room_name", kind: "scalar", T: 9 }, { no: 2, name: "layout", kind: "scalar", T: 9 }, { no: 3, name: "audio_only", kind: "scalar", T: 8 }, { no: 15, name: "audio_mixing", kind: "enum", T: Be.getEnumType(ki) }, { no: 4, name: "video_only", kind: "scalar", T: 8 }, { no: 5, name: "custom_base_url", kind: "scalar", T: 9 }, { no: 6, name: "file", kind: "message", T: Mi, oneof: "output" }, { no: 7, name: "stream", kind: "message", T: bi, oneof: "output" }, { no: 10, name: "segments", kind: "message", T: Ti, oneof: "output" }, { no: 8, name: "preset", kind: "enum", T: Be.getEnumType(hi), oneof: "options" }, { no: 9, name: "advanced", kind: "message", T: yi, oneof: "options" }, { no: 11, name: "file_outputs", kind: "message", T: Mi, repeated: true }, { no: 12, name: "stream_outputs", kind: "message", T: bi, repeated: true }, { no: 13, name: "segment_outputs", kind: "message", T: Ti, repeated: true }, { no: 14, name: "image_outputs", kind: "message", T: Si, repeated: true }, { no: 16, name: "webhooks", kind: "message", T: Zt, repeated: true }])), Mi = Be.makeMessageType("livekit.EncodedFileOutput", (() => [{ no: 1, name: "file_type", kind: "enum", T: Be.getEnumType(pi) }, { no: 2, name: "filepath", kind: "scalar", T: 9 }, { no: 6, name: "disable_manifest", kind: "scalar", T: 8 }, { no: 3, name: "s3", kind: "message", T: Ei, oneof: "output" }, { no: 4, name: "gcp", kind: "message", T: Ci, oneof: "output" }, { no: 5, name: "azure", kind: "message", T: wi, oneof: "output" }, { no: 7, name: "aliOSS", kind: "message", T: Ri, oneof: "output" }])), Oi = Be.makeMessageType("livekit.RoomEgress", (() => [{ no: 1, name: "room", kind: "message", T: _i }, { no: 3, name: "participant", kind: "message", T: Ii }, { no: 2, name: "tracks", kind: "message", T: Di }])), Ai = Be.makeMessageType("livekit.RoomConfiguration", (() => [{ no: 1, name: "name", kind: "scalar", T: 9 }, { no: 2, name: "empty_timeout", kind: "scalar", T: 13 }, { no: 3, name: "departure_timeout", kind: "scalar", T: 13 }, { no: 4, name: "max_participants", kind: "scalar", T: 13 }, { no: 11, name: "metadata", kind: "scalar", T: 9 }, { no: 5, name: "egress", kind: "message", T: Oi }, { no: 7, name: "min_playout_delay", kind: "scalar", T: 13 }, { no: 8, name: "max_playout_delay", kind: "scalar", T: 13 }, { no: 9, name: "sync_streams", kind: "scalar", T: 8 }, { no: 10, name: "agents", kind: "message", T: tn, repeated: true }, { no: 12, name: "tags", kind: "map", K: 9, V: { kind: "scalar", T: 9 } }])), Ni = Be.makeMessageType("livekit.TokenSourceRequest", (() => [{ no: 1, name: "room_name", kind: "scalar", T: 9, opt: true }, { no: 2, name: "participant_name", kind: "scalar", T: 9, opt: true }, { no: 3, name: "participant_identity", kind: "scalar", T: 9, opt: true }, { no: 4, name: "participant_metadata", kind: "scalar", T: 9, opt: true }, { no: 5, name: "participant_attributes", kind: "map", K: 9, V: { kind: "scalar", T: 9 } }, { no: 6, name: "room_config", kind: "message", T: Ai, opt: true }])), Li = Be.makeMessageType("livekit.TokenSourceResponse", (() => [{ no: 1, name: "server_url", kind: "scalar", T: 9 }, { no: 2, name: "participant_token", kind: "scalar", T: 9 }]));
        function xi(e2) {
          return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
        }
        var Ui, Fi = { exports: {} }, Bi = Fi.exports;
        var ji, qi, Vi = (Ui || (Ui = 1, (function(e2) {
          var t2, n2;
          t2 = Bi, n2 = function() {
            var e3 = function() {
            }, t3 = "undefined", n3 = typeof window !== t3 && typeof window.navigator !== t3 && /Trident\/|MSIE /.test(window.navigator.userAgent), i2 = ["trace", "debug", "info", "warn", "error"], r2 = {}, s2 = null;
            function a2(e4, t4) {
              var n4 = e4[t4];
              if ("function" == typeof n4.bind) return n4.bind(e4);
              try {
                return Function.prototype.bind.call(n4, e4);
              } catch (t5) {
                return function() {
                  return Function.prototype.apply.apply(n4, [e4, arguments]);
                };
              }
            }
            function o2() {
              console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
            }
            function c2() {
              for (var n4 = this.getLevel(), r3 = 0; r3 < i2.length; r3++) {
                var s3 = i2[r3];
                this[s3] = r3 < n4 ? e3 : this.methodFactory(s3, n4, this.name);
              }
              if (this.log = this.debug, typeof console === t3 && n4 < this.levels.SILENT) return "No console available for logging";
            }
            function d2(e4) {
              return function() {
                typeof console !== t3 && (c2.call(this), this[e4].apply(this, arguments));
              };
            }
            function l2(i3, r3, s3) {
              return (function(i4) {
                return "debug" === i4 && (i4 = "log"), typeof console !== t3 && ("trace" === i4 && n3 ? o2 : void 0 !== console[i4] ? a2(console, i4) : void 0 !== console.log ? a2(console, "log") : e3);
              })(i3) || d2.apply(this, arguments);
            }
            function u2(e4, n4) {
              var a3, o3, d3, u3 = this, h3 = "loglevel";
              function p2() {
                var e5;
                if (typeof window !== t3 && h3) {
                  try {
                    e5 = window.localStorage[h3];
                  } catch (e6) {
                  }
                  if (typeof e5 === t3) try {
                    var n5 = window.document.cookie, i3 = encodeURIComponent(h3), r3 = n5.indexOf(i3 + "=");
                    -1 !== r3 && (e5 = /^([^;]+)/.exec(n5.slice(r3 + i3.length + 1))[1]);
                  } catch (e6) {
                  }
                  return void 0 === u3.levels[e5] && (e5 = void 0), e5;
                }
              }
              function m2(e5) {
                var t4 = e5;
                if ("string" == typeof t4 && void 0 !== u3.levels[t4.toUpperCase()] && (t4 = u3.levels[t4.toUpperCase()]), "number" == typeof t4 && t4 >= 0 && t4 <= u3.levels.SILENT) return t4;
                throw new TypeError("log.setLevel() called with invalid level: " + e5);
              }
              "string" == typeof e4 ? h3 += ":" + e4 : "symbol" == typeof e4 && (h3 = void 0), u3.name = e4, u3.levels = { TRACE: 0, DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4, SILENT: 5 }, u3.methodFactory = n4 || l2, u3.getLevel = function() {
                return null != d3 ? d3 : null != o3 ? o3 : a3;
              }, u3.setLevel = function(e5, n5) {
                return d3 = m2(e5), false !== n5 && (function(e6) {
                  var n6 = (i2[e6] || "silent").toUpperCase();
                  if (typeof window !== t3 && h3) {
                    try {
                      return void (window.localStorage[h3] = n6);
                    } catch (e7) {
                    }
                    try {
                      window.document.cookie = encodeURIComponent(h3) + "=" + n6 + ";";
                    } catch (e7) {
                    }
                  }
                })(d3), c2.call(u3);
              }, u3.setDefaultLevel = function(e5) {
                o3 = m2(e5), p2() || u3.setLevel(e5, false);
              }, u3.resetLevel = function() {
                d3 = null, (function() {
                  if (typeof window !== t3 && h3) {
                    try {
                      window.localStorage.removeItem(h3);
                    } catch (e5) {
                    }
                    try {
                      window.document.cookie = encodeURIComponent(h3) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                    } catch (e5) {
                    }
                  }
                })(), c2.call(u3);
              }, u3.enableAll = function(e5) {
                u3.setLevel(u3.levels.TRACE, e5);
              }, u3.disableAll = function(e5) {
                u3.setLevel(u3.levels.SILENT, e5);
              }, u3.rebuild = function() {
                if (s2 !== u3 && (a3 = m2(s2.getLevel())), c2.call(u3), s2 === u3) for (var e5 in r2) r2[e5].rebuild();
              }, a3 = m2(s2 ? s2.getLevel() : "WARN");
              var g2 = p2();
              null != g2 && (d3 = m2(g2)), c2.call(u3);
            }
            (s2 = new u2()).getLogger = function(e4) {
              if ("symbol" != typeof e4 && "string" != typeof e4 || "" === e4) throw new TypeError("You must supply a name when creating a logger.");
              var t4 = r2[e4];
              return t4 || (t4 = r2[e4] = new u2(e4, s2.methodFactory)), t4;
            };
            var h2 = typeof window !== t3 ? window.log : void 0;
            return s2.noConflict = function() {
              return typeof window !== t3 && window.log === s2 && (window.log = h2), s2;
            }, s2.getLoggers = function() {
              return r2;
            }, s2.default = s2, s2;
          }, e2.exports ? e2.exports = n2() : t2.log = n2();
        })(Fi)), Fi.exports);
        e.LogLevel = void 0, (ji = e.LogLevel || (e.LogLevel = {}))[ji.trace = 0] = "trace", ji[ji.debug = 1] = "debug", ji[ji.info = 2] = "info", ji[ji.warn = 3] = "warn", ji[ji.error = 4] = "error", ji[ji.silent = 5] = "silent", e.LoggerNames = void 0, (qi = e.LoggerNames || (e.LoggerNames = {})).Default = "livekit", qi.Room = "livekit-room", qi.TokenSource = "livekit-token-source", qi.Participant = "livekit-participant", qi.Track = "livekit-track", qi.Publication = "livekit-track-publication", qi.Engine = "livekit-engine", qi.Signal = "livekit-signal", qi.PCManager = "livekit-pc-manager", qi.PCTransport = "livekit-pc-transport", qi.E2EE = "lk-e2ee", qi.DataTracks = "livekit-data-tracks";
        let Hi = Vi.getLogger(e.LoggerNames.Default);
        const Wi = Object.values(e.LoggerNames).map(((e2) => Vi.getLogger(e2)));
        function Ki(e2, t2) {
          const n2 = Vi.getLogger(e2);
          return n2.setDefaultLevel(Hi.getLevel()), t2 ? (function(e3, t3) {
            const n3 = (n4) => (i3, r2) => {
              const s2 = t3(), a2 = s2 || r2 ? Object.assign(Object.assign({}, s2), r2) : void 0;
              e3[n4](i3, a2);
            }, i2 = Object.create(e3);
            return i2.trace = n3("trace"), i2.debug = n3("debug"), i2.info = n3("info"), i2.warn = n3("warn"), i2.error = n3("error"), i2;
          })(n2, t2) : n2;
        }
        Hi.setDefaultLevel(e.LogLevel.info);
        const zi = Vi.getLogger(e.LoggerNames.E2EE), Ji = 7e3, Gi = [0, 300, 1200, 2700, 4800, Ji, Ji, Ji, Ji, Ji];
        class Qi {
          constructor(e2) {
            this._retryDelays = void 0 !== e2 ? [...e2] : Gi;
          }
          nextRetryDelayInMs(e2) {
            if (e2.retryCount >= this._retryDelays.length) return null;
            const t2 = this._retryDelays[e2.retryCount];
            return e2.retryCount <= 1 ? t2 : t2 + 1e3 * Math.random();
          }
        }
        function Yi(e2, t2) {
          var n2 = {};
          for (var i2 in e2) Object.prototype.hasOwnProperty.call(e2, i2) && t2.indexOf(i2) < 0 && (n2[i2] = e2[i2]);
          if (null != e2 && "function" == typeof Object.getOwnPropertySymbols) {
            var r2 = 0;
            for (i2 = Object.getOwnPropertySymbols(e2); r2 < i2.length; r2++) t2.indexOf(i2[r2]) < 0 && Object.prototype.propertyIsEnumerable.call(e2, i2[r2]) && (n2[i2[r2]] = e2[i2[r2]]);
          }
          return n2;
        }
        function Xi(e2, t2, n2, i2) {
          return new (n2 || (n2 = Promise))((function(r2, s2) {
            function a2(e3) {
              try {
                c2(i2.next(e3));
              } catch (e4) {
                s2(e4);
              }
            }
            function o2(e3) {
              try {
                c2(i2.throw(e3));
              } catch (e4) {
                s2(e4);
              }
            }
            function c2(e3) {
              var t3;
              e3.done ? r2(e3.value) : (t3 = e3.value, t3 instanceof n2 ? t3 : new n2((function(e4) {
                e4(t3);
              }))).then(a2, o2);
            }
            c2((i2 = i2.apply(e2, t2 || [])).next());
          }));
        }
        function Zi(e2) {
          var t2 = "function" == typeof Symbol && Symbol.iterator, n2 = t2 && e2[t2], i2 = 0;
          if (n2) return n2.call(e2);
          if (e2 && "number" == typeof e2.length) return { next: function() {
            return e2 && i2 >= e2.length && (e2 = void 0), { value: e2 && e2[i2++], done: !e2 };
          } };
          throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }
        function $i(e2) {
          return this instanceof $i ? (this.v = e2, this) : new $i(e2);
        }
        function er(e2, t2, n2) {
          if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
          var i2, r2 = n2.apply(e2, t2 || []), s2 = [];
          return i2 = Object.create(("function" == typeof AsyncIterator ? AsyncIterator : Object).prototype), a2("next"), a2("throw"), a2("return", (function(e3) {
            return function(t3) {
              return Promise.resolve(t3).then(e3, d2);
            };
          })), i2[Symbol.asyncIterator] = function() {
            return this;
          }, i2;
          function a2(e3, t3) {
            r2[e3] && (i2[e3] = function(t4) {
              return new Promise((function(n3, i3) {
                s2.push([e3, t4, n3, i3]) > 1 || o2(e3, t4);
              }));
            }, t3 && (i2[e3] = t3(i2[e3])));
          }
          function o2(e3, t3) {
            try {
              (n3 = r2[e3](t3)).value instanceof $i ? Promise.resolve(n3.value.v).then(c2, d2) : l2(s2[0][2], n3);
            } catch (e4) {
              l2(s2[0][3], e4);
            }
            var n3;
          }
          function c2(e3) {
            o2("next", e3);
          }
          function d2(e3) {
            o2("throw", e3);
          }
          function l2(e3, t3) {
            e3(t3), s2.shift(), s2.length && o2(s2[0][0], s2[0][1]);
          }
        }
        function tr(e2) {
          if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
          var t2, n2 = e2[Symbol.asyncIterator];
          return n2 ? n2.call(e2) : (e2 = Zi(e2), t2 = {}, i2("next"), i2("throw"), i2("return"), t2[Symbol.asyncIterator] = function() {
            return this;
          }, t2);
          function i2(n3) {
            t2[n3] = e2[n3] && function(t3) {
              return new Promise((function(i3, r2) {
                (function(e3, t4, n4, i4) {
                  Promise.resolve(i4).then((function(t5) {
                    e3({ value: t5, done: n4 });
                  }), t4);
                })(i3, r2, (t3 = e2[n3](t3)).done, t3.value);
              }));
            };
          }
        }
        "function" == typeof SuppressedError && SuppressedError;
        var nr, ir = { exports: {} };
        var rr = (function() {
          if (nr) return ir.exports;
          nr = 1;
          var e2, t2 = "object" == typeof Reflect ? Reflect : null, n2 = t2 && "function" == typeof t2.apply ? t2.apply : function(e3, t3, n3) {
            return Function.prototype.apply.call(e3, t3, n3);
          };
          e2 = t2 && "function" == typeof t2.ownKeys ? t2.ownKeys : Object.getOwnPropertySymbols ? function(e3) {
            return Object.getOwnPropertyNames(e3).concat(Object.getOwnPropertySymbols(e3));
          } : function(e3) {
            return Object.getOwnPropertyNames(e3);
          };
          var i2 = Number.isNaN || function(e3) {
            return e3 != e3;
          };
          function r2() {
            r2.init.call(this);
          }
          ir.exports = r2, ir.exports.once = function(e3, t3) {
            return new Promise((function(n3, i3) {
              function r3(n4) {
                e3.removeListener(t3, s3), i3(n4);
              }
              function s3() {
                "function" == typeof e3.removeListener && e3.removeListener("error", r3), n3([].slice.call(arguments));
              }
              m2(e3, t3, s3, { once: true }), "error" !== t3 && (function(e4, t4, n4) {
                "function" == typeof e4.on && m2(e4, "error", t4, n4);
              })(e3, r3, { once: true });
            }));
          }, r2.EventEmitter = r2, r2.prototype._events = void 0, r2.prototype._eventsCount = 0, r2.prototype._maxListeners = void 0;
          var s2 = 10;
          function a2(e3) {
            if ("function" != typeof e3) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e3);
          }
          function o2(e3) {
            return void 0 === e3._maxListeners ? r2.defaultMaxListeners : e3._maxListeners;
          }
          function c2(e3, t3, n3, i3) {
            var r3, s3, c3, d3;
            if (a2(n3), void 0 === (s3 = e3._events) ? (s3 = e3._events = /* @__PURE__ */ Object.create(null), e3._eventsCount = 0) : (void 0 !== s3.newListener && (e3.emit("newListener", t3, n3.listener ? n3.listener : n3), s3 = e3._events), c3 = s3[t3]), void 0 === c3) c3 = s3[t3] = n3, ++e3._eventsCount;
            else if ("function" == typeof c3 ? c3 = s3[t3] = i3 ? [n3, c3] : [c3, n3] : i3 ? c3.unshift(n3) : c3.push(n3), (r3 = o2(e3)) > 0 && c3.length > r3 && !c3.warned) {
              c3.warned = true;
              var l3 = new Error("Possible EventEmitter memory leak detected. " + c3.length + " " + String(t3) + " listeners added. Use emitter.setMaxListeners() to increase limit");
              l3.name = "MaxListenersExceededWarning", l3.emitter = e3, l3.type = t3, l3.count = c3.length, d3 = l3, console && console.warn && console.warn(d3);
            }
            return e3;
          }
          function d2() {
            if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
          }
          function l2(e3, t3, n3) {
            var i3 = { fired: false, wrapFn: void 0, target: e3, type: t3, listener: n3 }, r3 = d2.bind(i3);
            return r3.listener = n3, i3.wrapFn = r3, r3;
          }
          function u2(e3, t3, n3) {
            var i3 = e3._events;
            if (void 0 === i3) return [];
            var r3 = i3[t3];
            return void 0 === r3 ? [] : "function" == typeof r3 ? n3 ? [r3.listener || r3] : [r3] : n3 ? (function(e4) {
              for (var t4 = new Array(e4.length), n4 = 0; n4 < t4.length; ++n4) t4[n4] = e4[n4].listener || e4[n4];
              return t4;
            })(r3) : p2(r3, r3.length);
          }
          function h2(e3) {
            var t3 = this._events;
            if (void 0 !== t3) {
              var n3 = t3[e3];
              if ("function" == typeof n3) return 1;
              if (void 0 !== n3) return n3.length;
            }
            return 0;
          }
          function p2(e3, t3) {
            for (var n3 = new Array(t3), i3 = 0; i3 < t3; ++i3) n3[i3] = e3[i3];
            return n3;
          }
          function m2(e3, t3, n3, i3) {
            if ("function" == typeof e3.on) i3.once ? e3.once(t3, n3) : e3.on(t3, n3);
            else {
              if ("function" != typeof e3.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e3);
              e3.addEventListener(t3, (function r3(s3) {
                i3.once && e3.removeEventListener(t3, r3), n3(s3);
              }));
            }
          }
          return Object.defineProperty(r2, "defaultMaxListeners", { enumerable: true, get: function() {
            return s2;
          }, set: function(e3) {
            if ("number" != typeof e3 || e3 < 0 || i2(e3)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e3 + ".");
            s2 = e3;
          } }), r2.init = function() {
            void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
          }, r2.prototype.setMaxListeners = function(e3) {
            if ("number" != typeof e3 || e3 < 0 || i2(e3)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e3 + ".");
            return this._maxListeners = e3, this;
          }, r2.prototype.getMaxListeners = function() {
            return o2(this);
          }, r2.prototype.emit = function(e3) {
            for (var t3 = [], i3 = 1; i3 < arguments.length; i3++) t3.push(arguments[i3]);
            var r3 = "error" === e3, s3 = this._events;
            if (void 0 !== s3) r3 = r3 && void 0 === s3.error;
            else if (!r3) return false;
            if (r3) {
              var a3;
              if (t3.length > 0 && (a3 = t3[0]), a3 instanceof Error) throw a3;
              var o3 = new Error("Unhandled error." + (a3 ? " (" + a3.message + ")" : ""));
              throw o3.context = a3, o3;
            }
            var c3 = s3[e3];
            if (void 0 === c3) return false;
            if ("function" == typeof c3) n2(c3, this, t3);
            else {
              var d3 = c3.length, l3 = p2(c3, d3);
              for (i3 = 0; i3 < d3; ++i3) n2(l3[i3], this, t3);
            }
            return true;
          }, r2.prototype.addListener = function(e3, t3) {
            return c2(this, e3, t3, false);
          }, r2.prototype.on = r2.prototype.addListener, r2.prototype.prependListener = function(e3, t3) {
            return c2(this, e3, t3, true);
          }, r2.prototype.once = function(e3, t3) {
            return a2(t3), this.on(e3, l2(this, e3, t3)), this;
          }, r2.prototype.prependOnceListener = function(e3, t3) {
            return a2(t3), this.prependListener(e3, l2(this, e3, t3)), this;
          }, r2.prototype.removeListener = function(e3, t3) {
            var n3, i3, r3, s3, o3;
            if (a2(t3), void 0 === (i3 = this._events)) return this;
            if (void 0 === (n3 = i3[e3])) return this;
            if (n3 === t3 || n3.listener === t3) 0 == --this._eventsCount ? this._events = /* @__PURE__ */ Object.create(null) : (delete i3[e3], i3.removeListener && this.emit("removeListener", e3, n3.listener || t3));
            else if ("function" != typeof n3) {
              for (r3 = -1, s3 = n3.length - 1; s3 >= 0; s3--) if (n3[s3] === t3 || n3[s3].listener === t3) {
                o3 = n3[s3].listener, r3 = s3;
                break;
              }
              if (r3 < 0) return this;
              0 === r3 ? n3.shift() : (function(e4, t4) {
                for (; t4 + 1 < e4.length; t4++) e4[t4] = e4[t4 + 1];
                e4.pop();
              })(n3, r3), 1 === n3.length && (i3[e3] = n3[0]), void 0 !== i3.removeListener && this.emit("removeListener", e3, o3 || t3);
            }
            return this;
          }, r2.prototype.off = r2.prototype.removeListener, r2.prototype.removeAllListeners = function(e3) {
            var t3, n3, i3;
            if (void 0 === (n3 = this._events)) return this;
            if (void 0 === n3.removeListener) return 0 === arguments.length ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : void 0 !== n3[e3] && (0 == --this._eventsCount ? this._events = /* @__PURE__ */ Object.create(null) : delete n3[e3]), this;
            if (0 === arguments.length) {
              var r3, s3 = Object.keys(n3);
              for (i3 = 0; i3 < s3.length; ++i3) "removeListener" !== (r3 = s3[i3]) && this.removeAllListeners(r3);
              return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
            }
            if ("function" == typeof (t3 = n3[e3])) this.removeListener(e3, t3);
            else if (void 0 !== t3) for (i3 = t3.length - 1; i3 >= 0; i3--) this.removeListener(e3, t3[i3]);
            return this;
          }, r2.prototype.listeners = function(e3) {
            return u2(this, e3, true);
          }, r2.prototype.rawListeners = function(e3) {
            return u2(this, e3, false);
          }, r2.listenerCount = function(e3, t3) {
            return "function" == typeof e3.listenerCount ? e3.listenerCount(t3) : h2.call(e3, t3);
          }, r2.prototype.listenerCount = h2, r2.prototype.eventNames = function() {
            return this._eventsCount > 0 ? e2(this._events) : [];
          }, ir.exports;
        })();
        let sr = true, ar = true;
        function or(e2, t2, n2) {
          const i2 = e2.match(t2);
          return i2 && i2.length >= n2 && parseFloat(i2[n2], 10);
        }
        function cr(e2, t2, n2) {
          if (!e2.RTCPeerConnection) return;
          if (!Object.getOwnPropertyDescriptor(EventTarget.prototype, "addEventListener").writable) return void ur("Unable to polyfill events");
          const i2 = e2.RTCPeerConnection.prototype, r2 = i2.addEventListener;
          i2.addEventListener = function(e3, i3) {
            if (e3 !== t2) return r2.apply(this, arguments);
            const s3 = (e4) => {
              const t3 = n2(e4);
              t3 && (i3.handleEvent ? i3.handleEvent(t3) : i3(t3));
            };
            return this._eventMap = this._eventMap || {}, this._eventMap[t2] || (this._eventMap[t2] = /* @__PURE__ */ new Map()), this._eventMap[t2].set(i3, s3), r2.apply(this, [e3, s3]);
          };
          const s2 = i2.removeEventListener;
          i2.removeEventListener = function(e3, n3) {
            if (e3 !== t2 || !this._eventMap || !this._eventMap[t2]) return s2.apply(this, arguments);
            if (!this._eventMap[t2].has(n3)) return s2.apply(this, arguments);
            const i3 = this._eventMap[t2].get(n3);
            return this._eventMap[t2].delete(n3), 0 === this._eventMap[t2].size && delete this._eventMap[t2], 0 === Object.keys(this._eventMap).length && delete this._eventMap, s2.apply(this, [e3, i3]);
          }, Object.defineProperty(i2, "on" + t2, { get() {
            return this["_on" + t2];
          }, set(e3) {
            this["_on" + t2] && (this.removeEventListener(t2, this["_on" + t2]), delete this["_on" + t2]), e3 && this.addEventListener(t2, this["_on" + t2] = e3);
          }, enumerable: true, configurable: true });
        }
        function dr(e2) {
          return "boolean" != typeof e2 ? new Error("Argument type: " + typeof e2 + ". Please use a boolean.") : (sr = e2, e2 ? "adapter.js logging disabled" : "adapter.js logging enabled");
        }
        function lr(e2) {
          return "boolean" != typeof e2 ? new Error("Argument type: " + typeof e2 + ". Please use a boolean.") : (ar = !e2, "adapter.js deprecation warnings " + (e2 ? "disabled" : "enabled"));
        }
        function ur() {
          if ("object" == typeof window) {
            if (sr) return;
            "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments);
          }
        }
        function hr(e2, t2) {
          ar && console.warn(e2 + " is deprecated, please use " + t2 + " instead.");
        }
        function pr(e2) {
          return "[object Object]" === Object.prototype.toString.call(e2);
        }
        function mr(e2) {
          return pr(e2) ? Object.keys(e2).reduce((function(t2, n2) {
            const i2 = pr(e2[n2]), r2 = i2 ? mr(e2[n2]) : e2[n2], s2 = i2 && !Object.keys(r2).length;
            return void 0 === r2 || s2 ? t2 : Object.assign(t2, { [n2]: r2 });
          }), {}) : e2;
        }
        function gr(e2, t2, n2) {
          t2 && !n2.has(t2.id) && (n2.set(t2.id, t2), Object.keys(t2).forEach(((i2) => {
            i2.endsWith("Id") ? gr(e2, e2.get(t2[i2]), n2) : i2.endsWith("Ids") && t2[i2].forEach(((t3) => {
              gr(e2, e2.get(t3), n2);
            }));
          })));
        }
        function vr(e2, t2, n2) {
          const i2 = n2 ? "outbound-rtp" : "inbound-rtp", r2 = /* @__PURE__ */ new Map();
          if (null === t2) return r2;
          const s2 = [];
          return e2.forEach(((e3) => {
            "track" === e3.type && e3.trackIdentifier === t2.id && s2.push(e3);
          })), s2.forEach(((t3) => {
            e2.forEach(((n3) => {
              n3.type === i2 && n3.trackId === t3.id && gr(e2, n3, r2);
            }));
          })), r2;
        }
        const fr = ur;
        function kr(e2, t2) {
          const n2 = e2 && e2.navigator;
          if (!n2.mediaDevices) return;
          const i2 = function(e3) {
            if ("object" != typeof e3 || e3.mandatory || e3.optional) return e3;
            const t3 = {};
            return Object.keys(e3).forEach(((n3) => {
              if ("require" === n3 || "advanced" === n3 || "mediaSource" === n3) return;
              const i3 = "object" == typeof e3[n3] ? e3[n3] : { ideal: e3[n3] };
              void 0 !== i3.exact && "number" == typeof i3.exact && (i3.min = i3.max = i3.exact);
              const r3 = function(e4, t4) {
                return e4 ? e4 + t4.charAt(0).toUpperCase() + t4.slice(1) : "deviceId" === t4 ? "sourceId" : t4;
              };
              if (void 0 !== i3.ideal) {
                t3.optional = t3.optional || [];
                let e4 = {};
                "number" == typeof i3.ideal ? (e4[r3("min", n3)] = i3.ideal, t3.optional.push(e4), e4 = {}, e4[r3("max", n3)] = i3.ideal, t3.optional.push(e4)) : (e4[r3("", n3)] = i3.ideal, t3.optional.push(e4));
              }
              void 0 !== i3.exact && "number" != typeof i3.exact ? (t3.mandatory = t3.mandatory || {}, t3.mandatory[r3("", n3)] = i3.exact) : ["min", "max"].forEach(((e4) => {
                void 0 !== i3[e4] && (t3.mandatory = t3.mandatory || {}, t3.mandatory[r3(e4, n3)] = i3[e4]);
              }));
            })), e3.advanced && (t3.optional = (t3.optional || []).concat(e3.advanced)), t3;
          }, r2 = function(e3, r3) {
            if (t2.version >= 61) return r3(e3);
            if ((e3 = JSON.parse(JSON.stringify(e3))) && "object" == typeof e3.audio) {
              const t3 = function(e4, t4, n3) {
                t4 in e4 && !(n3 in e4) && (e4[n3] = e4[t4], delete e4[t4]);
              };
              t3((e3 = JSON.parse(JSON.stringify(e3))).audio, "autoGainControl", "googAutoGainControl"), t3(e3.audio, "noiseSuppression", "googNoiseSuppression"), e3.audio = i2(e3.audio);
            }
            if (e3 && "object" == typeof e3.video) {
              let s3 = e3.video.facingMode;
              s3 = s3 && ("object" == typeof s3 ? s3 : { ideal: s3 });
              const a2 = t2.version < 66;
              if (s3 && ("user" === s3.exact || "environment" === s3.exact || "user" === s3.ideal || "environment" === s3.ideal) && (!n2.mediaDevices.getSupportedConstraints || !n2.mediaDevices.getSupportedConstraints().facingMode || a2)) {
                let t3;
                if (delete e3.video.facingMode, "environment" === s3.exact || "environment" === s3.ideal ? t3 = ["back", "rear"] : "user" !== s3.exact && "user" !== s3.ideal || (t3 = ["front"]), t3) return n2.mediaDevices.enumerateDevices().then(((n3) => {
                  let a3 = (n3 = n3.filter(((e4) => "videoinput" === e4.kind))).find(((e4) => t3.some(((t4) => e4.label.toLowerCase().includes(t4)))));
                  return !a3 && n3.length && t3.includes("back") && (a3 = n3[n3.length - 1]), a3 && (e3.video.deviceId = s3.exact ? { exact: a3.deviceId } : { ideal: a3.deviceId }), e3.video = i2(e3.video), fr("chrome: " + JSON.stringify(e3)), r3(e3);
                }));
              }
              e3.video = i2(e3.video);
            }
            return fr("chrome: " + JSON.stringify(e3)), r3(e3);
          }, s2 = function(e3) {
            return t2.version >= 64 ? e3 : { name: { PermissionDeniedError: "NotAllowedError", PermissionDismissedError: "NotAllowedError", InvalidStateError: "NotAllowedError", DevicesNotFoundError: "NotFoundError", ConstraintNotSatisfiedError: "OverconstrainedError", TrackStartError: "NotReadableError", MediaDeviceFailedDueToShutdown: "NotAllowedError", MediaDeviceKillSwitchOn: "NotAllowedError", TabCaptureError: "AbortError", ScreenCaptureError: "AbortError", DeviceCaptureError: "AbortError" }[e3.name] || e3.name, message: e3.message, constraint: e3.constraint || e3.constraintName, toString() {
              return this.name + (this.message && ": ") + this.message;
            } };
          };
          if (n2.getUserMedia = function(e3, t3, i3) {
            r2(e3, ((e4) => {
              n2.webkitGetUserMedia(e4, t3, ((e5) => {
                i3 && i3(s2(e5));
              }));
            }));
          }.bind(n2), n2.mediaDevices.getUserMedia) {
            const e3 = n2.mediaDevices.getUserMedia.bind(n2.mediaDevices);
            n2.mediaDevices.getUserMedia = function(t3) {
              return r2(t3, ((t4) => e3(t4).then(((e4) => {
                if (t4.audio && !e4.getAudioTracks().length || t4.video && !e4.getVideoTracks().length) throw e4.getTracks().forEach(((e5) => {
                  e5.stop();
                })), new DOMException("", "NotFoundError");
                return e4;
              }), ((e4) => Promise.reject(s2(e4))))));
            };
          }
        }
        function yr(e2) {
          e2.MediaStream = e2.MediaStream || e2.webkitMediaStream;
        }
        function br(e2, t2) {
          if (!(t2.version > 102)) if ("object" == typeof e2 && e2.RTCPeerConnection && !("ontrack" in e2.RTCPeerConnection.prototype)) {
            Object.defineProperty(e2.RTCPeerConnection.prototype, "ontrack", { get() {
              return this._ontrack;
            }, set(e3) {
              this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e3);
            }, enumerable: true, configurable: true });
            const t3 = e2.RTCPeerConnection.prototype.setRemoteDescription;
            e2.RTCPeerConnection.prototype.setRemoteDescription = function() {
              return this._ontrackpoly || (this._ontrackpoly = (t4) => {
                t4.stream.addEventListener("addtrack", ((n2) => {
                  let i2;
                  i2 = e2.RTCPeerConnection.prototype.getReceivers ? this.getReceivers().find(((e3) => e3.track && e3.track.id === n2.track.id)) : { track: n2.track };
                  const r2 = new Event("track");
                  r2.track = n2.track, r2.receiver = i2, r2.transceiver = { receiver: i2 }, r2.streams = [t4.stream], this.dispatchEvent(r2);
                })), t4.stream.getTracks().forEach(((n2) => {
                  let i2;
                  i2 = e2.RTCPeerConnection.prototype.getReceivers ? this.getReceivers().find(((e3) => e3.track && e3.track.id === n2.id)) : { track: n2 };
                  const r2 = new Event("track");
                  r2.track = n2, r2.receiver = i2, r2.transceiver = { receiver: i2 }, r2.streams = [t4.stream], this.dispatchEvent(r2);
                }));
              }, this.addEventListener("addstream", this._ontrackpoly)), t3.apply(this, arguments);
            };
          } else cr(e2, "track", ((e3) => (e3.transceiver || Object.defineProperty(e3, "transceiver", { value: { receiver: e3.receiver } }), e3)));
        }
        function Tr(e2) {
          if ("object" == typeof e2 && e2.RTCPeerConnection && !("getSenders" in e2.RTCPeerConnection.prototype) && "createDTMFSender" in e2.RTCPeerConnection.prototype) {
            const t2 = function(e3, t3) {
              return { track: t3, get dtmf() {
                return void 0 === this._dtmf && ("audio" === t3.kind ? this._dtmf = e3.createDTMFSender(t3) : this._dtmf = null), this._dtmf;
              }, _pc: e3 };
            };
            if (!e2.RTCPeerConnection.prototype.getSenders) {
              e2.RTCPeerConnection.prototype.getSenders = function() {
                return this._senders = this._senders || [], this._senders.slice();
              };
              const n3 = e2.RTCPeerConnection.prototype.addTrack;
              e2.RTCPeerConnection.prototype.addTrack = function(e3, i4) {
                let r2 = n3.apply(this, arguments);
                return r2 || (r2 = t2(this, e3), this._senders.push(r2)), r2;
              };
              const i3 = e2.RTCPeerConnection.prototype.removeTrack;
              e2.RTCPeerConnection.prototype.removeTrack = function(e3) {
                i3.apply(this, arguments);
                const t3 = this._senders.indexOf(e3);
                -1 !== t3 && this._senders.splice(t3, 1);
              };
            }
            const n2 = e2.RTCPeerConnection.prototype.addStream;
            e2.RTCPeerConnection.prototype.addStream = function(e3) {
              this._senders = this._senders || [], n2.apply(this, [e3]), e3.getTracks().forEach(((e4) => {
                this._senders.push(t2(this, e4));
              }));
            };
            const i2 = e2.RTCPeerConnection.prototype.removeStream;
            e2.RTCPeerConnection.prototype.removeStream = function(e3) {
              this._senders = this._senders || [], i2.apply(this, [e3]), e3.getTracks().forEach(((e4) => {
                const t3 = this._senders.find(((t4) => t4.track === e4));
                t3 && this._senders.splice(this._senders.indexOf(t3), 1);
              }));
            };
          } else if ("object" == typeof e2 && e2.RTCPeerConnection && "getSenders" in e2.RTCPeerConnection.prototype && "createDTMFSender" in e2.RTCPeerConnection.prototype && e2.RTCRtpSender && !("dtmf" in e2.RTCRtpSender.prototype)) {
            const t2 = e2.RTCPeerConnection.prototype.getSenders;
            e2.RTCPeerConnection.prototype.getSenders = function() {
              const e3 = t2.apply(this, []);
              return e3.forEach(((e4) => e4._pc = this)), e3;
            }, Object.defineProperty(e2.RTCRtpSender.prototype, "dtmf", { get() {
              return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf;
            } });
          }
        }
        function Sr(e2, t2) {
          if (t2.version >= 67) return;
          if (!("object" == typeof e2 && e2.RTCPeerConnection && e2.RTCRtpSender && e2.RTCRtpReceiver)) return;
          if (!("getStats" in e2.RTCRtpSender.prototype)) {
            const t3 = e2.RTCPeerConnection.prototype.getSenders;
            t3 && (e2.RTCPeerConnection.prototype.getSenders = function() {
              const e3 = t3.apply(this, []);
              return e3.forEach(((e4) => e4._pc = this)), e3;
            });
            const n3 = e2.RTCPeerConnection.prototype.addTrack;
            n3 && (e2.RTCPeerConnection.prototype.addTrack = function() {
              const e3 = n3.apply(this, arguments);
              return e3._pc = this, e3;
            }), e2.RTCRtpSender.prototype.getStats = function() {
              const e3 = this;
              return this._pc.getStats().then(((t4) => vr(t4, e3.track, true)));
            };
          }
          if (!("getStats" in e2.RTCRtpReceiver.prototype)) {
            const t3 = e2.RTCPeerConnection.prototype.getReceivers;
            t3 && (e2.RTCPeerConnection.prototype.getReceivers = function() {
              const e3 = t3.apply(this, []);
              return e3.forEach(((e4) => e4._pc = this)), e3;
            }), cr(e2, "track", ((e3) => (e3.receiver._pc = e3.srcElement, e3))), e2.RTCRtpReceiver.prototype.getStats = function() {
              const e3 = this;
              return this._pc.getStats().then(((t4) => vr(t4, e3.track, false)));
            };
          }
          if (!("getStats" in e2.RTCRtpSender.prototype) || !("getStats" in e2.RTCRtpReceiver.prototype)) return;
          const n2 = e2.RTCPeerConnection.prototype.getStats;
          e2.RTCPeerConnection.prototype.getStats = function() {
            if (arguments.length > 0 && arguments[0] instanceof e2.MediaStreamTrack) {
              const e3 = arguments[0];
              let t3, n3, i2;
              return this.getSenders().forEach(((n4) => {
                n4.track === e3 && (t3 ? i2 = true : t3 = n4);
              })), this.getReceivers().forEach(((t4) => (t4.track === e3 && (n3 ? i2 = true : n3 = t4), t4.track === e3))), i2 || t3 && n3 ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : t3 ? t3.getStats() : n3 ? n3.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
            }
            return n2.apply(this, arguments);
          };
        }
        function Er(e2) {
          e2.RTCPeerConnection.prototype.getLocalStreams = function() {
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map(((e3) => this._shimmedLocalStreams[e3][0]));
          };
          const t2 = e2.RTCPeerConnection.prototype.addTrack;
          e2.RTCPeerConnection.prototype.addTrack = function(e3, n3) {
            if (!n3) return t2.apply(this, arguments);
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            const i3 = t2.apply(this, arguments);
            return this._shimmedLocalStreams[n3.id] ? -1 === this._shimmedLocalStreams[n3.id].indexOf(i3) && this._shimmedLocalStreams[n3.id].push(i3) : this._shimmedLocalStreams[n3.id] = [n3, i3], i3;
          };
          const n2 = e2.RTCPeerConnection.prototype.addStream;
          e2.RTCPeerConnection.prototype.addStream = function(e3) {
            this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e3.getTracks().forEach(((e4) => {
              if (this.getSenders().find(((t4) => t4.track === e4))) throw new DOMException("Track already exists.", "InvalidAccessError");
            }));
            const t3 = this.getSenders();
            n2.apply(this, arguments);
            const i3 = this.getSenders().filter(((e4) => -1 === t3.indexOf(e4)));
            this._shimmedLocalStreams[e3.id] = [e3].concat(i3);
          };
          const i2 = e2.RTCPeerConnection.prototype.removeStream;
          e2.RTCPeerConnection.prototype.removeStream = function(e3) {
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[e3.id], i2.apply(this, arguments);
          };
          const r2 = e2.RTCPeerConnection.prototype.removeTrack;
          e2.RTCPeerConnection.prototype.removeTrack = function(e3) {
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e3 && Object.keys(this._shimmedLocalStreams).forEach(((t3) => {
              const n3 = this._shimmedLocalStreams[t3].indexOf(e3);
              -1 !== n3 && this._shimmedLocalStreams[t3].splice(n3, 1), 1 === this._shimmedLocalStreams[t3].length && delete this._shimmedLocalStreams[t3];
            })), r2.apply(this, arguments);
          };
        }
        function Cr(e2, t2) {
          if (!e2.RTCPeerConnection) return;
          if (e2.RTCPeerConnection.prototype.addTrack && t2.version >= 65) return Er(e2);
          const n2 = e2.RTCPeerConnection.prototype.getLocalStreams;
          e2.RTCPeerConnection.prototype.getLocalStreams = function() {
            const e3 = n2.apply(this);
            return this._reverseStreams = this._reverseStreams || {}, e3.map(((e4) => this._reverseStreams[e4.id]));
          };
          const i2 = e2.RTCPeerConnection.prototype.addStream;
          e2.RTCPeerConnection.prototype.addStream = function(t3) {
            if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, t3.getTracks().forEach(((e3) => {
              if (this.getSenders().find(((t4) => t4.track === e3))) throw new DOMException("Track already exists.", "InvalidAccessError");
            })), !this._reverseStreams[t3.id]) {
              const n3 = new e2.MediaStream(t3.getTracks());
              this._streams[t3.id] = n3, this._reverseStreams[n3.id] = t3, t3 = n3;
            }
            i2.apply(this, [t3]);
          };
          const r2 = e2.RTCPeerConnection.prototype.removeStream;
          function s2(e3, t3) {
            let n3 = t3.sdp;
            return Object.keys(e3._reverseStreams || []).forEach(((t4) => {
              const i3 = e3._reverseStreams[t4], r3 = e3._streams[i3.id];
              n3 = n3.replace(new RegExp(r3.id, "g"), i3.id);
            })), new RTCSessionDescription({ type: t3.type, sdp: n3 });
          }
          e2.RTCPeerConnection.prototype.removeStream = function(e3) {
            this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, r2.apply(this, [this._streams[e3.id] || e3]), delete this._reverseStreams[this._streams[e3.id] ? this._streams[e3.id].id : e3.id], delete this._streams[e3.id];
          }, e2.RTCPeerConnection.prototype.addTrack = function(t3, n3) {
            if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
            const i3 = [].slice.call(arguments, 1);
            if (1 !== i3.length || !i3[0].getTracks().find(((e3) => e3 === t3))) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
            if (this.getSenders().find(((e3) => e3.track === t3))) throw new DOMException("Track already exists.", "InvalidAccessError");
            this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {};
            const r3 = this._streams[n3.id];
            if (r3) r3.addTrack(t3), Promise.resolve().then((() => {
              this.dispatchEvent(new Event("negotiationneeded"));
            }));
            else {
              const i4 = new e2.MediaStream([t3]);
              this._streams[n3.id] = i4, this._reverseStreams[i4.id] = n3, this.addStream(i4);
            }
            return this.getSenders().find(((e3) => e3.track === t3));
          }, ["createOffer", "createAnswer"].forEach((function(t3) {
            const n3 = e2.RTCPeerConnection.prototype[t3], i3 = { [t3]() {
              const e3 = arguments;
              return arguments.length && "function" == typeof arguments[0] ? n3.apply(this, [(t4) => {
                const n4 = s2(this, t4);
                e3[0].apply(null, [n4]);
              }, (t4) => {
                e3[1] && e3[1].apply(null, t4);
              }, arguments[2]]) : n3.apply(this, arguments).then(((e4) => s2(this, e4)));
            } };
            e2.RTCPeerConnection.prototype[t3] = i3[t3];
          }));
          const a2 = e2.RTCPeerConnection.prototype.setLocalDescription;
          e2.RTCPeerConnection.prototype.setLocalDescription = function() {
            return arguments.length && arguments[0].type ? (arguments[0] = (function(e3, t3) {
              let n3 = t3.sdp;
              return Object.keys(e3._reverseStreams || []).forEach(((t4) => {
                const i3 = e3._reverseStreams[t4], r3 = e3._streams[i3.id];
                n3 = n3.replace(new RegExp(i3.id, "g"), r3.id);
              })), new RTCSessionDescription({ type: t3.type, sdp: n3 });
            })(this, arguments[0]), a2.apply(this, arguments)) : a2.apply(this, arguments);
          };
          const o2 = Object.getOwnPropertyDescriptor(e2.RTCPeerConnection.prototype, "localDescription");
          Object.defineProperty(e2.RTCPeerConnection.prototype, "localDescription", { get() {
            const e3 = o2.get.apply(this);
            return "" === e3.type ? e3 : s2(this, e3);
          } }), e2.RTCPeerConnection.prototype.removeTrack = function(e3) {
            if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
            if (!e3._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
            if (!(e3._pc === this)) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
            let t3;
            this._streams = this._streams || {}, Object.keys(this._streams).forEach(((n3) => {
              this._streams[n3].getTracks().find(((t4) => e3.track === t4)) && (t3 = this._streams[n3]);
            })), t3 && (1 === t3.getTracks().length ? this.removeStream(this._reverseStreams[t3.id]) : t3.removeTrack(e3.track), this.dispatchEvent(new Event("negotiationneeded")));
          };
        }
        function wr(e2, t2) {
          !e2.RTCPeerConnection && e2.webkitRTCPeerConnection && (e2.RTCPeerConnection = e2.webkitRTCPeerConnection), e2.RTCPeerConnection && t2.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach((function(t3) {
            const n2 = e2.RTCPeerConnection.prototype[t3], i2 = { [t3]() {
              return arguments[0] = new ("addIceCandidate" === t3 ? e2.RTCIceCandidate : e2.RTCSessionDescription)(arguments[0]), n2.apply(this, arguments);
            } };
            e2.RTCPeerConnection.prototype[t3] = i2[t3];
          }));
        }
        function Rr(e2, t2) {
          t2.version > 102 || cr(e2, "negotiationneeded", ((e3) => {
            const n2 = e3.target;
            if (!(t2.version < 72 || n2.getConfiguration && "plan-b" === n2.getConfiguration().sdpSemantics) || "stable" === n2.signalingState) return e3;
          }));
        }
        var Pr = Object.freeze({ __proto__: null, fixNegotiationNeeded: Rr, shimAddTrackRemoveTrack: Cr, shimAddTrackRemoveTrackWithNative: Er, shimGetSendersWithDtmf: Tr, shimGetUserMedia: kr, shimMediaStream: yr, shimOnTrack: br, shimPeerConnection: wr, shimSenderReceiverGetStats: Sr });
        function Ir(e2, t2) {
          const n2 = e2 && e2.navigator, i2 = e2 && e2.MediaStreamTrack;
          if (n2.getUserMedia = function(e3, t3, i3) {
            hr("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), n2.mediaDevices.getUserMedia(e3).then(t3, i3);
          }, !(t2.version > 55 && "autoGainControl" in n2.mediaDevices.getSupportedConstraints())) {
            const e3 = function(e4, t4, n3) {
              t4 in e4 && !(n3 in e4) && (e4[n3] = e4[t4], delete e4[t4]);
            }, t3 = n2.mediaDevices.getUserMedia.bind(n2.mediaDevices);
            if (n2.mediaDevices.getUserMedia = function(n3) {
              return "object" == typeof n3 && "object" == typeof n3.audio && (n3 = JSON.parse(JSON.stringify(n3)), e3(n3.audio, "autoGainControl", "mozAutoGainControl"), e3(n3.audio, "noiseSuppression", "mozNoiseSuppression")), t3(n3);
            }, i2 && i2.prototype.getSettings) {
              const t4 = i2.prototype.getSettings;
              i2.prototype.getSettings = function() {
                const n3 = t4.apply(this, arguments);
                return e3(n3, "mozAutoGainControl", "autoGainControl"), e3(n3, "mozNoiseSuppression", "noiseSuppression"), n3;
              };
            }
            if (i2 && i2.prototype.applyConstraints) {
              const t4 = i2.prototype.applyConstraints;
              i2.prototype.applyConstraints = function(n3) {
                return "audio" === this.kind && "object" == typeof n3 && (n3 = JSON.parse(JSON.stringify(n3)), e3(n3, "autoGainControl", "mozAutoGainControl"), e3(n3, "noiseSuppression", "mozNoiseSuppression")), t4.apply(this, [n3]);
              };
            }
          }
        }
        function Dr(e2) {
          "object" == typeof e2 && e2.RTCTrackEvent && "receiver" in e2.RTCTrackEvent.prototype && !("transceiver" in e2.RTCTrackEvent.prototype) && Object.defineProperty(e2.RTCTrackEvent.prototype, "transceiver", { get() {
            return { receiver: this.receiver };
          } });
        }
        function _r(e2, t2) {
          "object" == typeof e2 && (e2.RTCPeerConnection || e2.mozRTCPeerConnection) && (!e2.RTCPeerConnection && e2.mozRTCPeerConnection && (e2.RTCPeerConnection = e2.mozRTCPeerConnection), t2.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach((function(t3) {
            const n2 = e2.RTCPeerConnection.prototype[t3], i2 = { [t3]() {
              return arguments[0] = new ("addIceCandidate" === t3 ? e2.RTCIceCandidate : e2.RTCSessionDescription)(arguments[0]), n2.apply(this, arguments);
            } };
            e2.RTCPeerConnection.prototype[t3] = i2[t3];
          })));
        }
        function Mr(e2, t2) {
          if ("object" != typeof e2 || !e2.RTCPeerConnection && !e2.mozRTCPeerConnection) return;
          if (t2.version >= 151) return;
          const n2 = { inboundrtp: "inbound-rtp", outboundrtp: "outbound-rtp", candidatepair: "candidate-pair", localcandidate: "local-candidate", remotecandidate: "remote-candidate" }, i2 = e2.RTCPeerConnection.prototype.getStats;
          e2.RTCPeerConnection.prototype.getStats = function() {
            const [e3, r2, s2] = arguments;
            return "closed" === this.signalingState ? Promise.resolve(/* @__PURE__ */ new Map()) : i2.apply(this, [e3 || null]).then(((e4) => {
              if (t2.version < 53 && !r2) try {
                e4.forEach(((e5) => {
                  e5.type = n2[e5.type] || e5.type;
                }));
              } catch (t3) {
                if ("TypeError" !== t3.name) throw t3;
                e4.forEach(((t4, i3) => {
                  e4.set(i3, Object.assign({}, t4, { type: n2[t4.type] || t4.type }));
                }));
              }
              return e4;
            })).then(r2, s2);
          };
        }
        function Or(e2) {
          if ("object" != typeof e2 || !e2.RTCPeerConnection || !e2.RTCRtpSender) return;
          if (e2.RTCRtpSender && "getStats" in e2.RTCRtpSender.prototype) return;
          const t2 = e2.RTCPeerConnection.prototype.getSenders;
          t2 && (e2.RTCPeerConnection.prototype.getSenders = function() {
            const e3 = t2.apply(this, []);
            return e3.forEach(((e4) => e4._pc = this)), e3;
          });
          const n2 = e2.RTCPeerConnection.prototype.addTrack;
          n2 && (e2.RTCPeerConnection.prototype.addTrack = function() {
            const e3 = n2.apply(this, arguments);
            return e3._pc = this, e3;
          }), e2.RTCRtpSender.prototype.getStats = function() {
            return this.track ? this._pc.getStats(this.track) : Promise.resolve(/* @__PURE__ */ new Map());
          };
        }
        function Ar(e2) {
          if ("object" != typeof e2 || !e2.RTCPeerConnection || !e2.RTCRtpSender) return;
          if (e2.RTCRtpSender && "getStats" in e2.RTCRtpReceiver.prototype) return;
          const t2 = e2.RTCPeerConnection.prototype.getReceivers;
          t2 && (e2.RTCPeerConnection.prototype.getReceivers = function() {
            const e3 = t2.apply(this, []);
            return e3.forEach(((e4) => e4._pc = this)), e3;
          }), cr(e2, "track", ((e3) => (e3.receiver._pc = e3.srcElement, e3))), e2.RTCRtpReceiver.prototype.getStats = function() {
            return this._pc.getStats(this.track);
          };
        }
        function Nr(e2) {
          e2.RTCPeerConnection && !("removeStream" in e2.RTCPeerConnection.prototype) && (e2.RTCPeerConnection.prototype.removeStream = function(e3) {
            hr("removeStream", "removeTrack"), this.getSenders().forEach(((t2) => {
              t2.track && e3.getTracks().includes(t2.track) && this.removeTrack(t2);
            }));
          });
        }
        function Lr(e2) {
          e2.DataChannel && !e2.RTCDataChannel && (e2.RTCDataChannel = e2.DataChannel);
        }
        function xr(e2) {
          if ("object" != typeof e2 || !e2.RTCPeerConnection) return;
          const t2 = e2.RTCPeerConnection.prototype.addTransceiver;
          t2 && (e2.RTCPeerConnection.prototype.addTransceiver = function() {
            this.setParametersPromises = [];
            let e3 = arguments[1] && arguments[1].sendEncodings;
            void 0 === e3 && (e3 = []), e3 = [...e3];
            const n2 = e3.length > 0;
            n2 && e3.forEach(((e4) => {
              if ("rid" in e4) {
                if (!/^[a-z0-9]{0,16}$/i.test(e4.rid)) throw new TypeError("Invalid RID value provided.");
              }
              if ("scaleResolutionDownBy" in e4 && !(parseFloat(e4.scaleResolutionDownBy) >= 1)) throw new RangeError("scale_resolution_down_by must be >= 1.0");
              if ("maxFramerate" in e4 && !(parseFloat(e4.maxFramerate) >= 0)) throw new RangeError("max_framerate must be >= 0.0");
            }));
            const i2 = t2.apply(this, arguments);
            if (n2) {
              const { sender: t3 } = i2, n3 = t3.getParameters();
              (!("encodings" in n3) || 1 === n3.encodings.length && 0 === Object.keys(n3.encodings[0]).length) && (n3.encodings = e3, t3.sendEncodings = e3, this.setParametersPromises.push(t3.setParameters(n3).then((() => {
                delete t3.sendEncodings;
              })).catch((() => {
                delete t3.sendEncodings;
              }))));
            }
            return i2;
          });
        }
        function Ur(e2) {
          if ("object" != typeof e2 || !e2.RTCRtpSender) return;
          const t2 = e2.RTCRtpSender.prototype.getParameters;
          t2 && (e2.RTCRtpSender.prototype.getParameters = function() {
            const e3 = t2.apply(this, arguments);
            return "encodings" in e3 || (e3.encodings = [].concat(this.sendEncodings || [{}])), e3;
          });
        }
        function Fr(e2) {
          if ("object" != typeof e2 || !e2.RTCPeerConnection) return;
          const t2 = e2.RTCPeerConnection.prototype.createOffer;
          e2.RTCPeerConnection.prototype.createOffer = function() {
            return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then((() => t2.apply(this, arguments))).finally((() => {
              this.setParametersPromises = [];
            })) : t2.apply(this, arguments);
          };
        }
        function Br(e2) {
          if ("object" != typeof e2 || !e2.RTCPeerConnection) return;
          const t2 = e2.RTCPeerConnection.prototype.createAnswer;
          e2.RTCPeerConnection.prototype.createAnswer = function() {
            return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then((() => t2.apply(this, arguments))).finally((() => {
              this.setParametersPromises = [];
            })) : t2.apply(this, arguments);
          };
        }
        var jr = Object.freeze({ __proto__: null, shimAddTransceiver: xr, shimCreateAnswer: Br, shimCreateOffer: Fr, shimGetDisplayMedia: function(e2, t2) {
          e2.navigator.mediaDevices && "getDisplayMedia" in e2.navigator.mediaDevices || e2.navigator.mediaDevices && (e2.navigator.mediaDevices.getDisplayMedia = function(n2) {
            if (!n2 || !n2.video) {
              const e3 = new DOMException("getDisplayMedia without video constraints is undefined");
              return e3.name = "NotFoundError", e3.code = 8, Promise.reject(e3);
            }
            return true === n2.video ? n2.video = { mediaSource: t2 } : n2.video.mediaSource = t2, e2.navigator.mediaDevices.getUserMedia(n2);
          });
        }, shimGetParameters: Ur, shimGetStats: Mr, shimGetUserMedia: Ir, shimOnTrack: Dr, shimPeerConnection: _r, shimRTCDataChannel: Lr, shimReceiverGetStats: Ar, shimRemoveStream: Nr, shimSenderGetStats: Or });
        function qr(e2) {
          if ("object" == typeof e2 && e2.RTCPeerConnection) {
            if ("getLocalStreams" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.getLocalStreams = function() {
              return this._localStreams || (this._localStreams = []), this._localStreams;
            }), !("addStream" in e2.RTCPeerConnection.prototype)) {
              const t2 = e2.RTCPeerConnection.prototype.addTrack;
              e2.RTCPeerConnection.prototype.addStream = function(e3) {
                this._localStreams || (this._localStreams = []), this._localStreams.includes(e3) || this._localStreams.push(e3), e3.getAudioTracks().forEach(((n2) => t2.call(this, n2, e3))), e3.getVideoTracks().forEach(((n2) => t2.call(this, n2, e3)));
              }, e2.RTCPeerConnection.prototype.addTrack = function(e3) {
                for (var n2 = arguments.length, i2 = new Array(n2 > 1 ? n2 - 1 : 0), r2 = 1; r2 < n2; r2++) i2[r2 - 1] = arguments[r2];
                return i2 && i2.forEach(((e4) => {
                  this._localStreams ? this._localStreams.includes(e4) || this._localStreams.push(e4) : this._localStreams = [e4];
                })), t2.apply(this, arguments);
              };
            }
            "removeStream" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.removeStream = function(e3) {
              this._localStreams || (this._localStreams = []);
              const t2 = this._localStreams.indexOf(e3);
              if (-1 === t2) return;
              this._localStreams.splice(t2, 1);
              const n2 = e3.getTracks();
              this.getSenders().forEach(((e4) => {
                n2.includes(e4.track) && this.removeTrack(e4);
              }));
            });
          }
        }
        function Vr(e2) {
          if ("object" == typeof e2 && e2.RTCPeerConnection && ("getRemoteStreams" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.getRemoteStreams = function() {
            return this._remoteStreams ? this._remoteStreams : [];
          }), !("onaddstream" in e2.RTCPeerConnection.prototype))) {
            Object.defineProperty(e2.RTCPeerConnection.prototype, "onaddstream", { get() {
              return this._onaddstream;
            }, set(e3) {
              this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e3), this.addEventListener("track", this._onaddstreampoly = (e4) => {
                e4.streams.forEach(((e5) => {
                  if (this._remoteStreams || (this._remoteStreams = []), this._remoteStreams.includes(e5)) return;
                  this._remoteStreams.push(e5);
                  const t3 = new Event("addstream");
                  t3.stream = e5, this.dispatchEvent(t3);
                }));
              });
            } });
            const t2 = e2.RTCPeerConnection.prototype.setRemoteDescription;
            e2.RTCPeerConnection.prototype.setRemoteDescription = function() {
              const e3 = this;
              return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(t3) {
                t3.streams.forEach(((t4) => {
                  if (e3._remoteStreams || (e3._remoteStreams = []), e3._remoteStreams.indexOf(t4) >= 0) return;
                  e3._remoteStreams.push(t4);
                  const n2 = new Event("addstream");
                  n2.stream = t4, e3.dispatchEvent(n2);
                }));
              }), t2.apply(e3, arguments);
            };
          }
        }
        function Hr(e2) {
          if ("object" != typeof e2 || !e2.RTCPeerConnection) return;
          const t2 = e2.RTCPeerConnection.prototype, n2 = t2.createOffer, i2 = t2.createAnswer, r2 = t2.setLocalDescription, s2 = t2.setRemoteDescription, a2 = t2.addIceCandidate;
          t2.createOffer = function(e3, t3) {
            const i3 = arguments.length >= 2 ? arguments[2] : arguments[0], r3 = n2.apply(this, [i3]);
            return t3 ? (r3.then(e3, t3), Promise.resolve()) : r3;
          }, t2.createAnswer = function(e3, t3) {
            const n3 = arguments.length >= 2 ? arguments[2] : arguments[0], r3 = i2.apply(this, [n3]);
            return t3 ? (r3.then(e3, t3), Promise.resolve()) : r3;
          };
          let o2 = function(e3, t3, n3) {
            const i3 = r2.apply(this, [e3]);
            return n3 ? (i3.then(t3, n3), Promise.resolve()) : i3;
          };
          t2.setLocalDescription = o2, o2 = function(e3, t3, n3) {
            const i3 = s2.apply(this, [e3]);
            return n3 ? (i3.then(t3, n3), Promise.resolve()) : i3;
          }, t2.setRemoteDescription = o2, o2 = function(e3, t3, n3) {
            const i3 = a2.apply(this, [e3]);
            return n3 ? (i3.then(t3, n3), Promise.resolve()) : i3;
          }, t2.addIceCandidate = o2;
        }
        function Wr(e2) {
          const t2 = e2 && e2.navigator;
          if (t2.mediaDevices && t2.mediaDevices.getUserMedia) {
            const e3 = t2.mediaDevices, n2 = e3.getUserMedia.bind(e3);
            t2.mediaDevices.getUserMedia = (e4) => n2(Kr(e4));
          }
          !t2.getUserMedia && t2.mediaDevices && t2.mediaDevices.getUserMedia && (t2.getUserMedia = function(e3, n2, i2) {
            t2.mediaDevices.getUserMedia(e3).then(n2, i2);
          }.bind(t2));
        }
        function Kr(e2) {
          return e2 && void 0 !== e2.video ? Object.assign({}, e2, { video: mr(e2.video) }) : e2;
        }
        function zr(e2) {
          if (!e2.RTCPeerConnection) return;
          const t2 = e2.RTCPeerConnection;
          e2.RTCPeerConnection = function(e3, n2) {
            if (e3 && e3.iceServers) {
              const t3 = [];
              for (let n3 = 0; n3 < e3.iceServers.length; n3++) {
                let i2 = e3.iceServers[n3];
                void 0 === i2.urls && i2.url ? (hr("RTCIceServer.url", "RTCIceServer.urls"), i2 = JSON.parse(JSON.stringify(i2)), i2.urls = i2.url, delete i2.url, t3.push(i2)) : t3.push(e3.iceServers[n3]);
              }
              e3.iceServers = t3;
            }
            return new t2(e3, n2);
          }, e2.RTCPeerConnection.prototype = t2.prototype, "generateCertificate" in t2 && Object.defineProperty(e2.RTCPeerConnection, "generateCertificate", { get: () => t2.generateCertificate });
        }
        function Jr(e2) {
          "object" == typeof e2 && e2.RTCTrackEvent && "receiver" in e2.RTCTrackEvent.prototype && !("transceiver" in e2.RTCTrackEvent.prototype) && Object.defineProperty(e2.RTCTrackEvent.prototype, "transceiver", { get() {
            return { receiver: this.receiver };
          } });
        }
        function Gr(e2) {
          const t2 = e2.RTCPeerConnection.prototype.createOffer;
          e2.RTCPeerConnection.prototype.createOffer = function(e3) {
            if (e3) {
              void 0 !== e3.offerToReceiveAudio && (e3.offerToReceiveAudio = !!e3.offerToReceiveAudio);
              const t3 = this.getTransceivers().find(((e4) => "audio" === e4.receiver.track.kind));
              false === e3.offerToReceiveAudio && t3 ? "sendrecv" === t3.direction ? t3.setDirection ? t3.setDirection("sendonly") : t3.direction = "sendonly" : "recvonly" === t3.direction && (t3.setDirection ? t3.setDirection("inactive") : t3.direction = "inactive") : true !== e3.offerToReceiveAudio || t3 || this.addTransceiver("audio", { direction: "recvonly" }), void 0 !== e3.offerToReceiveVideo && (e3.offerToReceiveVideo = !!e3.offerToReceiveVideo);
              const n2 = this.getTransceivers().find(((e4) => "video" === e4.receiver.track.kind));
              false === e3.offerToReceiveVideo && n2 ? "sendrecv" === n2.direction ? n2.setDirection ? n2.setDirection("sendonly") : n2.direction = "sendonly" : "recvonly" === n2.direction && (n2.setDirection ? n2.setDirection("inactive") : n2.direction = "inactive") : true !== e3.offerToReceiveVideo || n2 || this.addTransceiver("video", { direction: "recvonly" });
            }
            return t2.apply(this, arguments);
          };
        }
        function Qr(e2) {
          "object" != typeof e2 || e2.AudioContext || (e2.AudioContext = e2.webkitAudioContext);
        }
        var Yr, Xr = Object.freeze({ __proto__: null, shimAudioContext: Qr, shimCallbacksAPI: Hr, shimConstraints: Kr, shimCreateOfferLegacy: Gr, shimGetUserMedia: Wr, shimLocalStreamsAPI: qr, shimRTCIceServerUrls: zr, shimRemoteStreamsAPI: Vr, shimTrackEventTransceiver: Jr }), Zr = { exports: {} };
        var $r = (Yr || (Yr = 1, (function(e2) {
          const t2 = { generateIdentifier: function() {
            return Math.random().toString(36).substring(2, 12);
          } };
          t2.localCName = t2.generateIdentifier(), t2.splitLines = function(e3) {
            return e3.trim().split("\n").map(((e4) => e4.trim()));
          }, t2.splitSections = function(e3) {
            return e3.split("\nm=").map(((e4, t3) => (t3 > 0 ? "m=" + e4 : e4).trim() + "\r\n"));
          }, t2.getDescription = function(e3) {
            const n2 = t2.splitSections(e3);
            return n2 && n2[0];
          }, t2.getMediaSections = function(e3) {
            const n2 = t2.splitSections(e3);
            return n2.shift(), n2;
          }, t2.matchPrefix = function(e3, n2) {
            return t2.splitLines(e3).filter(((e4) => 0 === e4.indexOf(n2)));
          }, t2.parseCandidate = function(e3) {
            let t3;
            t3 = 0 === e3.indexOf("a=candidate:") ? e3.substring(12).split(" ") : e3.substring(10).split(" ");
            const n2 = { foundation: t3[0], component: { 1: "rtp", 2: "rtcp" }[t3[1]] || t3[1], protocol: t3[2].toLowerCase(), priority: parseInt(t3[3], 10), ip: t3[4], address: t3[4], port: parseInt(t3[5], 10), type: t3[7] };
            for (let e4 = 8; e4 < t3.length; e4 += 2) switch (t3[e4]) {
              case "raddr":
                n2.relatedAddress = t3[e4 + 1];
                break;
              case "rport":
                n2.relatedPort = parseInt(t3[e4 + 1], 10);
                break;
              case "tcptype":
                n2.tcpType = t3[e4 + 1];
                break;
              case "ufrag":
                n2.ufrag = t3[e4 + 1], n2.usernameFragment = t3[e4 + 1];
                break;
              default:
                void 0 === n2[t3[e4]] && (n2[t3[e4]] = t3[e4 + 1]);
            }
            return n2;
          }, t2.writeCandidate = function(e3) {
            const t3 = [];
            t3.push(e3.foundation);
            const n2 = e3.component;
            "rtp" === n2 ? t3.push(1) : "rtcp" === n2 ? t3.push(2) : t3.push(n2), t3.push(e3.protocol.toUpperCase()), t3.push(e3.priority), t3.push(e3.address || e3.ip), t3.push(e3.port);
            const i2 = e3.type;
            return t3.push("typ"), t3.push(i2), "host" !== i2 && e3.relatedAddress && void 0 !== e3.relatedPort && (t3.push("raddr"), t3.push(e3.relatedAddress), t3.push("rport"), t3.push(e3.relatedPort)), e3.tcpType && "tcp" === e3.protocol.toLowerCase() && (t3.push("tcptype"), t3.push(e3.tcpType)), (e3.usernameFragment || e3.ufrag) && (t3.push("ufrag"), t3.push(e3.usernameFragment || e3.ufrag)), "candidate:" + t3.join(" ");
          }, t2.parseIceOptions = function(e3) {
            return e3.substring(14).split(" ");
          }, t2.parseRtpMap = function(e3) {
            let t3 = e3.substring(9).split(" ");
            const n2 = { payloadType: parseInt(t3.shift(), 10) };
            return t3 = t3[0].split("/"), n2.name = t3[0], n2.clockRate = parseInt(t3[1], 10), n2.channels = 3 === t3.length ? parseInt(t3[2], 10) : 1, n2.numChannels = n2.channels, n2;
          }, t2.writeRtpMap = function(e3) {
            let t3 = e3.payloadType;
            void 0 !== e3.preferredPayloadType && (t3 = e3.preferredPayloadType);
            const n2 = e3.channels || e3.numChannels || 1;
            return "a=rtpmap:" + t3 + " " + e3.name + "/" + e3.clockRate + (1 !== n2 ? "/" + n2 : "") + "\r\n";
          }, t2.parseExtmap = function(e3) {
            const t3 = e3.substring(9).split(" ");
            return { id: parseInt(t3[0], 10), direction: t3[0].indexOf("/") > 0 ? t3[0].split("/")[1] : "sendrecv", uri: t3[1], attributes: t3.slice(2).join(" ") };
          }, t2.writeExtmap = function(e3) {
            return "a=extmap:" + (e3.id || e3.preferredId) + (e3.direction && "sendrecv" !== e3.direction ? "/" + e3.direction : "") + " " + e3.uri + (e3.attributes ? " " + e3.attributes : "") + "\r\n";
          }, t2.parseFmtp = function(e3) {
            const t3 = {};
            let n2;
            const i2 = e3.substring(e3.indexOf(" ") + 1).split(";");
            for (let e4 = 0; e4 < i2.length; e4++) n2 = i2[e4].trim().split("="), t3[n2[0].trim()] = n2[1];
            return t3;
          }, t2.writeFmtp = function(e3) {
            let t3 = "", n2 = e3.payloadType;
            if (void 0 !== e3.preferredPayloadType && (n2 = e3.preferredPayloadType), e3.parameters && Object.keys(e3.parameters).length) {
              const i2 = [];
              Object.keys(e3.parameters).forEach(((t4) => {
                void 0 !== e3.parameters[t4] ? i2.push(t4 + "=" + e3.parameters[t4]) : i2.push(t4);
              })), t3 += "a=fmtp:" + n2 + " " + i2.join(";") + "\r\n";
            }
            return t3;
          }, t2.parseRtcpFb = function(e3) {
            const t3 = e3.substring(e3.indexOf(" ") + 1).split(" ");
            return { type: t3.shift(), parameter: t3.join(" ") };
          }, t2.writeRtcpFb = function(e3) {
            let t3 = "", n2 = e3.payloadType;
            return void 0 !== e3.preferredPayloadType && (n2 = e3.preferredPayloadType), e3.rtcpFeedback && e3.rtcpFeedback.length && e3.rtcpFeedback.forEach(((e4) => {
              t3 += "a=rtcp-fb:" + n2 + " " + e4.type + (e4.parameter && e4.parameter.length ? " " + e4.parameter : "") + "\r\n";
            })), t3;
          }, t2.parseSsrcMedia = function(e3) {
            const t3 = e3.indexOf(" "), n2 = { ssrc: parseInt(e3.substring(7, t3), 10) }, i2 = e3.indexOf(":", t3);
            return i2 > -1 ? (n2.attribute = e3.substring(t3 + 1, i2), n2.value = e3.substring(i2 + 1)) : n2.attribute = e3.substring(t3 + 1), n2;
          }, t2.parseSsrcGroup = function(e3) {
            const t3 = e3.substring(13).split(" ");
            return { semantics: t3.shift(), ssrcs: t3.map(((e4) => parseInt(e4, 10))) };
          }, t2.getMid = function(e3) {
            const n2 = t2.matchPrefix(e3, "a=mid:")[0];
            if (n2) return n2.substring(6);
          }, t2.parseFingerprint = function(e3) {
            const t3 = e3.substring(14).split(" ");
            return { algorithm: t3[0].toLowerCase(), value: t3[1].toUpperCase() };
          }, t2.getDtlsParameters = function(e3, n2) {
            return { role: "auto", fingerprints: t2.matchPrefix(e3 + n2, "a=fingerprint:").map(t2.parseFingerprint) };
          }, t2.writeDtlsParameters = function(e3, t3) {
            let n2 = "a=setup:" + t3 + "\r\n";
            return e3.fingerprints.forEach(((e4) => {
              n2 += "a=fingerprint:" + e4.algorithm + " " + e4.value + "\r\n";
            })), n2;
          }, t2.parseCryptoLine = function(e3) {
            const t3 = e3.substring(9).split(" ");
            return { tag: parseInt(t3[0], 10), cryptoSuite: t3[1], keyParams: t3[2], sessionParams: t3.slice(3) };
          }, t2.writeCryptoLine = function(e3) {
            return "a=crypto:" + e3.tag + " " + e3.cryptoSuite + " " + ("object" == typeof e3.keyParams ? t2.writeCryptoKeyParams(e3.keyParams) : e3.keyParams) + (e3.sessionParams ? " " + e3.sessionParams.join(" ") : "") + "\r\n";
          }, t2.parseCryptoKeyParams = function(e3) {
            if (0 !== e3.indexOf("inline:")) return null;
            const t3 = e3.substring(7).split("|");
            return { keyMethod: "inline", keySalt: t3[0], lifeTime: t3[1], mkiValue: t3[2] ? t3[2].split(":")[0] : void 0, mkiLength: t3[2] ? t3[2].split(":")[1] : void 0 };
          }, t2.writeCryptoKeyParams = function(e3) {
            return e3.keyMethod + ":" + e3.keySalt + (e3.lifeTime ? "|" + e3.lifeTime : "") + (e3.mkiValue && e3.mkiLength ? "|" + e3.mkiValue + ":" + e3.mkiLength : "");
          }, t2.getCryptoParameters = function(e3, n2) {
            return t2.matchPrefix(e3 + n2, "a=crypto:").map(t2.parseCryptoLine);
          }, t2.getIceParameters = function(e3, n2) {
            const i2 = t2.matchPrefix(e3 + n2, "a=ice-ufrag:")[0], r2 = t2.matchPrefix(e3 + n2, "a=ice-pwd:")[0];
            return i2 && r2 ? { usernameFragment: i2.substring(12), password: r2.substring(10) } : null;
          }, t2.writeIceParameters = function(e3) {
            let t3 = "a=ice-ufrag:" + e3.usernameFragment + "\r\na=ice-pwd:" + e3.password + "\r\n";
            return e3.iceLite && (t3 += "a=ice-lite\r\n"), t3;
          }, t2.parseRtpParameters = function(e3) {
            const n2 = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] }, i2 = t2.splitLines(e3)[0].split(" ");
            n2.profile = i2[2];
            for (let r3 = 3; r3 < i2.length; r3++) {
              const s2 = i2[r3], a2 = t2.matchPrefix(e3, "a=rtpmap:" + s2 + " ")[0];
              if (a2) {
                const i3 = t2.parseRtpMap(a2), r4 = t2.matchPrefix(e3, "a=fmtp:" + s2 + " ");
                switch (i3.parameters = r4.length ? t2.parseFmtp(r4[0]) : {}, i3.rtcpFeedback = t2.matchPrefix(e3, "a=rtcp-fb:" + s2 + " ").map(t2.parseRtcpFb), n2.codecs.push(i3), i3.name.toUpperCase()) {
                  case "RED":
                  case "ULPFEC":
                    n2.fecMechanisms.push(i3.name.toUpperCase());
                }
              }
            }
            t2.matchPrefix(e3, "a=extmap:").forEach(((e4) => {
              n2.headerExtensions.push(t2.parseExtmap(e4));
            }));
            const r2 = t2.matchPrefix(e3, "a=rtcp-fb:* ").map(t2.parseRtcpFb);
            return n2.codecs.forEach(((e4) => {
              r2.forEach(((t3) => {
                e4.rtcpFeedback.find(((e5) => e5.type === t3.type && e5.parameter === t3.parameter)) || e4.rtcpFeedback.push(t3);
              }));
            })), n2;
          }, t2.writeRtpDescription = function(e3, n2) {
            let i2 = "";
            i2 += "m=" + e3 + " ", i2 += n2.codecs.length > 0 ? "9" : "0", i2 += " " + (n2.profile || "UDP/TLS/RTP/SAVPF") + " ", i2 += n2.codecs.map(((e4) => void 0 !== e4.preferredPayloadType ? e4.preferredPayloadType : e4.payloadType)).join(" ") + "\r\n", i2 += "c=IN IP4 0.0.0.0\r\n", i2 += "a=rtcp:9 IN IP4 0.0.0.0\r\n", n2.codecs.forEach(((e4) => {
              i2 += t2.writeRtpMap(e4), i2 += t2.writeFmtp(e4), i2 += t2.writeRtcpFb(e4);
            }));
            let r2 = 0;
            return n2.codecs.forEach(((e4) => {
              e4.maxptime > r2 && (r2 = e4.maxptime);
            })), r2 > 0 && (i2 += "a=maxptime:" + r2 + "\r\n"), n2.headerExtensions && n2.headerExtensions.forEach(((e4) => {
              i2 += t2.writeExtmap(e4);
            })), i2;
          }, t2.parseRtpEncodingParameters = function(e3) {
            const n2 = [], i2 = t2.parseRtpParameters(e3), r2 = -1 !== i2.fecMechanisms.indexOf("RED"), s2 = -1 !== i2.fecMechanisms.indexOf("ULPFEC"), a2 = t2.matchPrefix(e3, "a=ssrc:").map(((e4) => t2.parseSsrcMedia(e4))).filter(((e4) => "cname" === e4.attribute)), o2 = a2.length > 0 && a2[0].ssrc;
            let c2;
            const d2 = t2.matchPrefix(e3, "a=ssrc-group:FID").map(((e4) => e4.substring(17).split(" ").map(((e5) => parseInt(e5, 10)))));
            d2.length > 0 && d2[0].length > 1 && d2[0][0] === o2 && (c2 = d2[0][1]), i2.codecs.forEach(((e4) => {
              if ("RTX" === e4.name.toUpperCase() && e4.parameters.apt) {
                let t3 = { ssrc: o2, codecPayloadType: parseInt(e4.parameters.apt, 10) };
                o2 && c2 && (t3.rtx = { ssrc: c2 }), n2.push(t3), r2 && (t3 = JSON.parse(JSON.stringify(t3)), t3.fec = { ssrc: o2, mechanism: s2 ? "red+ulpfec" : "red" }, n2.push(t3));
              }
            })), 0 === n2.length && o2 && n2.push({ ssrc: o2 });
            let l2 = t2.matchPrefix(e3, "b=");
            return l2.length && (l2 = 0 === l2[0].indexOf("b=TIAS:") ? parseInt(l2[0].substring(7), 10) : 0 === l2[0].indexOf("b=AS:") ? 1e3 * parseInt(l2[0].substring(5), 10) * 0.95 - 16e3 : void 0, n2.forEach(((e4) => {
              e4.maxBitrate = l2;
            }))), n2;
          }, t2.parseRtcpParameters = function(e3) {
            const n2 = {}, i2 = t2.matchPrefix(e3, "a=ssrc:").map(((e4) => t2.parseSsrcMedia(e4))).filter(((e4) => "cname" === e4.attribute))[0];
            i2 && (n2.cname = i2.value, n2.ssrc = i2.ssrc);
            const r2 = t2.matchPrefix(e3, "a=rtcp-rsize");
            n2.reducedSize = r2.length > 0, n2.compound = 0 === r2.length;
            const s2 = t2.matchPrefix(e3, "a=rtcp-mux");
            return n2.mux = s2.length > 0, n2;
          }, t2.writeRtcpParameters = function(e3) {
            let t3 = "";
            return e3.reducedSize && (t3 += "a=rtcp-rsize\r\n"), e3.mux && (t3 += "a=rtcp-mux\r\n"), void 0 !== e3.ssrc && e3.cname && (t3 += "a=ssrc:" + e3.ssrc + " cname:" + e3.cname + "\r\n"), t3;
          }, t2.parseMsid = function(e3) {
            let n2;
            const i2 = t2.matchPrefix(e3, "a=msid:");
            if (1 === i2.length) return n2 = i2[0].substring(7).split(" "), { stream: n2[0], track: n2[1] };
            const r2 = t2.matchPrefix(e3, "a=ssrc:").map(((e4) => t2.parseSsrcMedia(e4))).filter(((e4) => "msid" === e4.attribute));
            return r2.length > 0 ? (n2 = r2[0].value.split(" "), { stream: n2[0], track: n2[1] }) : void 0;
          }, t2.parseSctpDescription = function(e3) {
            const n2 = t2.parseMLine(e3), i2 = t2.matchPrefix(e3, "a=max-message-size:");
            let r2;
            i2.length > 0 && (r2 = parseInt(i2[0].substring(19), 10)), isNaN(r2) && (r2 = 65536);
            const s2 = t2.matchPrefix(e3, "a=sctp-port:");
            if (s2.length > 0) return { port: parseInt(s2[0].substring(12), 10), protocol: n2.fmt, maxMessageSize: r2 };
            const a2 = t2.matchPrefix(e3, "a=sctpmap:");
            if (a2.length > 0) {
              const e4 = a2[0].substring(10).split(" ");
              return { port: parseInt(e4[0], 10), protocol: e4[1], maxMessageSize: r2 };
            }
          }, t2.writeSctpDescription = function(e3, t3) {
            let n2 = [];
            return n2 = "DTLS/SCTP" !== e3.protocol ? ["m=" + e3.kind + " 9 " + e3.protocol + " " + t3.protocol + "\r\n", "c=IN IP4 0.0.0.0\r\n", "a=sctp-port:" + t3.port + "\r\n"] : ["m=" + e3.kind + " 9 " + e3.protocol + " " + t3.port + "\r\n", "c=IN IP4 0.0.0.0\r\n", "a=sctpmap:" + t3.port + " " + t3.protocol + " 65535\r\n"], void 0 !== t3.maxMessageSize && n2.push("a=max-message-size:" + t3.maxMessageSize + "\r\n"), n2.join("");
          }, t2.generateSessionId = function() {
            return Math.random().toString().substr(2, 22);
          }, t2.writeSessionBoilerplate = function(e3, n2, i2) {
            let r2;
            const s2 = void 0 !== n2 ? n2 : 2;
            return r2 = e3 || t2.generateSessionId(), "v=0\r\no=" + (i2 || "thisisadapterortc") + " " + r2 + " " + s2 + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n";
          }, t2.getDirection = function(e3, n2) {
            const i2 = t2.splitLines(e3);
            for (let e4 = 0; e4 < i2.length; e4++) switch (i2[e4]) {
              case "a=sendrecv":
              case "a=sendonly":
              case "a=recvonly":
              case "a=inactive":
                return i2[e4].substring(2);
            }
            return n2 ? t2.getDirection(n2) : "sendrecv";
          }, t2.getKind = function(e3) {
            return t2.splitLines(e3)[0].split(" ")[0].substring(2);
          }, t2.isRejected = function(e3) {
            return "0" === e3.split(" ", 2)[1];
          }, t2.parseMLine = function(e3) {
            const n2 = t2.splitLines(e3)[0].substring(2).split(" ");
            return { kind: n2[0], port: parseInt(n2[1], 10), protocol: n2[2], fmt: n2.slice(3).join(" ") };
          }, t2.parseOLine = function(e3) {
            const n2 = t2.matchPrefix(e3, "o=")[0].substring(2).split(" ");
            return { username: n2[0], sessionId: n2[1], sessionVersion: parseInt(n2[2], 10), netType: n2[3], addressType: n2[4], address: n2[5] };
          }, t2.isValidSDP = function(e3) {
            if ("string" != typeof e3 || 0 === e3.length) return false;
            const n2 = t2.splitLines(e3);
            for (let e4 = 0; e4 < n2.length; e4++) if (n2[e4].length < 2 || "=" !== n2[e4].charAt(1)) return false;
            return true;
          }, e2.exports = t2;
        })(Zr)), Zr.exports), es = xi($r), ts = t({ __proto__: null, default: es }, [$r]);
        function ns(e2) {
          if (!e2.RTCIceCandidate || e2.RTCIceCandidate && "foundation" in e2.RTCIceCandidate.prototype) return;
          const t2 = e2.RTCIceCandidate;
          e2.RTCIceCandidate = function(e3) {
            if ("object" == typeof e3 && e3.candidate && 0 === e3.candidate.indexOf("a=") && ((e3 = JSON.parse(JSON.stringify(e3))).candidate = e3.candidate.substring(2)), e3.candidate && e3.candidate.length) {
              const n2 = new t2(e3), i2 = es.parseCandidate(e3.candidate);
              for (const e4 in i2) e4 in n2 || Object.defineProperty(n2, e4, { value: i2[e4] });
              return n2.toJSON = function() {
                return { candidate: n2.candidate, sdpMid: n2.sdpMid, sdpMLineIndex: n2.sdpMLineIndex, usernameFragment: n2.usernameFragment };
              }, n2;
            }
            return new t2(e3);
          }, e2.RTCIceCandidate.prototype = t2.prototype, cr(e2, "icecandidate", ((t3) => (t3.candidate && Object.defineProperty(t3, "candidate", { value: new e2.RTCIceCandidate(t3.candidate), writable: "false" }), t3)));
        }
        function is(e2) {
          !e2.RTCIceCandidate || e2.RTCIceCandidate && "relayProtocol" in e2.RTCIceCandidate.prototype || cr(e2, "icecandidate", ((e3) => {
            if (e3.candidate) {
              const t2 = es.parseCandidate(e3.candidate.candidate);
              "relay" === t2.type && (e3.candidate.relayProtocol = { 0: "tls", 1: "tcp", 2: "udp" }[t2.priority >> 24]);
            }
            return e3;
          }));
        }
        function rs(e2, t2) {
          if (!e2.RTCPeerConnection) return;
          "sctp" in e2.RTCPeerConnection.prototype || Object.defineProperty(e2.RTCPeerConnection.prototype, "sctp", { get() {
            return void 0 === this._sctp ? null : this._sctp;
          } });
          const n2 = e2.RTCPeerConnection.prototype.setRemoteDescription;
          e2.RTCPeerConnection.prototype.setRemoteDescription = function() {
            if (this._sctp = null, "chrome" === t2.browser && t2.version >= 76) {
              const { sdpSemantics: e3 } = this.getConfiguration();
              "plan-b" === e3 && Object.defineProperty(this, "sctp", { get() {
                return void 0 === this._sctp ? null : this._sctp;
              }, enumerable: true, configurable: true });
            }
            if ((function(e3) {
              if (!e3 || !e3.sdp) return false;
              const t3 = es.splitSections(e3.sdp);
              return t3.shift(), t3.some(((e4) => {
                const t4 = es.parseMLine(e4);
                return t4 && "application" === t4.kind && -1 !== t4.protocol.indexOf("SCTP");
              }));
            })(arguments[0])) {
              const e3 = (function(e4) {
                const t3 = e4.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                if (null === t3 || t3.length < 2) return -1;
                const n4 = parseInt(t3[1], 10);
                return n4 != n4 ? -1 : n4;
              })(arguments[0]), n3 = (function(e4) {
                let n4 = 65536;
                return "firefox" === t2.browser && (n4 = t2.version < 57 ? -1 === e4 ? 16384 : 2147483637 : t2.version < 60 ? 57 === t2.version ? 65535 : 65536 : 2147483637), n4;
              })(e3), i2 = (function(e4, n4) {
                let i3 = 65536;
                "firefox" === t2.browser && 57 === t2.version && (i3 = 65535);
                const r3 = es.matchPrefix(e4.sdp, "a=max-message-size:");
                return r3.length > 0 ? i3 = parseInt(r3[0].substring(19), 10) : "firefox" === t2.browser && -1 !== n4 && (i3 = 2147483637), i3;
              })(arguments[0], e3);
              let r2;
              r2 = 0 === n3 && 0 === i2 ? Number.POSITIVE_INFINITY : 0 === n3 || 0 === i2 ? Math.max(n3, i2) : Math.min(n3, i2);
              const s2 = {};
              Object.defineProperty(s2, "maxMessageSize", { get: () => r2 }), this._sctp = s2;
            }
            return n2.apply(this, arguments);
          };
        }
        function ss(e2, t2) {
          if (!e2.RTCPeerConnection || !("createDataChannel" in e2.RTCPeerConnection.prototype)) return;
          if ("chrome" === t2.browser && t2.version > 149) return;
          if ("firefox" === t2.browser && t2.version > 60) return;
          function n2(e3, t3) {
            const n3 = e3.send;
            e3.send = function() {
              const i3 = arguments[0], r2 = i3.length || i3.size || i3.byteLength;
              if ("open" === e3.readyState && t3.sctp && r2 > t3.sctp.maxMessageSize) throw new TypeError("Message too large (can send a maximum of " + t3.sctp.maxMessageSize + " bytes)");
              return n3.apply(e3, arguments);
            };
          }
          const i2 = e2.RTCPeerConnection.prototype.createDataChannel;
          e2.RTCPeerConnection.prototype.createDataChannel = function() {
            const e3 = i2.apply(this, arguments);
            return n2(e3, this), e3;
          }, cr(e2, "datachannel", ((e3) => (n2(e3.channel, e3.target), e3)));
        }
        function as(e2) {
          if (!e2.RTCPeerConnection || "connectionState" in e2.RTCPeerConnection.prototype) return;
          const t2 = e2.RTCPeerConnection.prototype;
          Object.defineProperty(t2, "connectionState", { get() {
            return { completed: "connected", checking: "connecting" }[this.iceConnectionState] || this.iceConnectionState;
          }, enumerable: true, configurable: true }), Object.defineProperty(t2, "onconnectionstatechange", { get() {
            return this._onconnectionstatechange || null;
          }, set(e3) {
            this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), e3 && this.addEventListener("connectionstatechange", this._onconnectionstatechange = e3);
          }, enumerable: true, configurable: true }), ["setLocalDescription", "setRemoteDescription"].forEach(((e3) => {
            const n2 = t2[e3];
            t2[e3] = function() {
              return this._connectionstatechangepoly || (this._connectionstatechangepoly = (e4) => {
                const t3 = e4.target;
                if (t3._lastConnectionState !== t3.connectionState) {
                  t3._lastConnectionState = t3.connectionState;
                  const n3 = new Event("connectionstatechange", e4);
                  t3.dispatchEvent(n3);
                }
                return e4;
              }, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n2.apply(this, arguments);
            };
          }));
        }
        function os(e2, t2) {
          if (!e2.RTCPeerConnection) return;
          if ("chrome" === t2.browser && t2.version >= 71) return;
          if ("safari" === t2.browser && t2._safariVersion >= 13.1) return;
          const n2 = e2.RTCPeerConnection.prototype.setRemoteDescription;
          e2.RTCPeerConnection.prototype.setRemoteDescription = function(t3) {
            if (t3 && t3.sdp && -1 !== t3.sdp.indexOf("\na=extmap-allow-mixed")) {
              const n3 = t3.sdp.split("\n").filter(((e3) => "a=extmap-allow-mixed" !== e3.trim())).join("\n");
              e2.RTCSessionDescription && t3 instanceof e2.RTCSessionDescription ? arguments[0] = new e2.RTCSessionDescription({ type: t3.type, sdp: n3 }) : t3.sdp = n3;
            }
            return n2.apply(this, arguments);
          };
        }
        function cs(e2, t2) {
          if (!e2.RTCPeerConnection || !e2.RTCPeerConnection.prototype) return;
          const n2 = e2.RTCPeerConnection.prototype.addIceCandidate;
          n2 && 0 !== n2.length && (e2.RTCPeerConnection.prototype.addIceCandidate = function() {
            return arguments[0] ? ("chrome" === t2.browser && t2.version < 78 || "firefox" === t2.browser && t2.version < 68 || "safari" === t2.browser) && arguments[0] && "" === arguments[0].candidate ? Promise.resolve() : n2.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
          });
        }
        function ds(e2, t2) {
          if (!e2.RTCPeerConnection || !e2.RTCPeerConnection.prototype) return;
          const n2 = e2.RTCPeerConnection.prototype.setLocalDescription;
          n2 && 0 !== n2.length && (e2.RTCPeerConnection.prototype.setLocalDescription = function() {
            let e3 = arguments[0] || {};
            if ("object" != typeof e3 || e3.type && e3.sdp) return n2.apply(this, arguments);
            if (e3 = { type: e3.type, sdp: e3.sdp }, !e3.type) switch (this.signalingState) {
              case "stable":
              case "have-local-offer":
              case "have-remote-pranswer":
                e3.type = "offer";
                break;
              default:
                e3.type = "answer";
            }
            if (e3.sdp || "offer" !== e3.type && "answer" !== e3.type) return n2.apply(this, [e3]);
            return ("offer" === e3.type ? this.createOffer : this.createAnswer).apply(this).then(((e4) => n2.apply(this, [e4])));
          });
        }
        var ls, us, hs = Object.freeze({ __proto__: null, removeExtmapAllowMixed: os, shimAddIceCandidateNullOrEmpty: cs, shimConnectionState: as, shimMaxMessageSize: rs, shimParameterlessSetLocalDescription: ds, shimRTCIceCandidate: ns, shimRTCIceCandidateRelayProtocol: is, shimSendThrowTypeError: ss });
        !(function() {
          let { window: e2 } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { shimChrome: true, shimFirefox: true, shimSafari: true };
          const n2 = ur, i2 = (function(e3) {
            const t3 = { browser: null, version: null };
            if (void 0 === e3 || !e3.navigator || !e3.navigator.userAgent) return t3.browser = "Not a browser.", t3;
            const { navigator: n3 } = e3;
            if (n3.userAgentData && n3.userAgentData.brands) {
              const e4 = n3.userAgentData.brands.find(((e5) => "Chromium" === e5.brand));
              if (e4) return { browser: "chrome", version: parseInt(e4.version, 10) };
            }
            if (n3.mozGetUserMedia) t3.browser = "firefox", t3.version = parseInt(or(n3.userAgent, /Firefox\/(\d+)\./, 1));
            else if (n3.webkitGetUserMedia || false === e3.isSecureContext && e3.webkitRTCPeerConnection) t3.browser = "chrome", t3.version = parseInt(or(n3.userAgent, /Chrom(e|ium)\/(\d+)\./, 2)) || null;
            else {
              if (!e3.RTCPeerConnection || !n3.userAgent.match(/AppleWebKit\/(\d+)\./)) return t3.browser = "Not a supported browser.", t3;
              t3.browser = "safari", t3.version = parseInt(or(n3.userAgent, /AppleWebKit\/(\d+)\./, 1)), t3.supportsUnifiedPlan = e3.RTCRtpTransceiver && "currentDirection" in e3.RTCRtpTransceiver.prototype, t3._safariVersion = or(n3.userAgent, /Version\/(\d+(\.?\d+))/, 1);
            }
            return t3;
          })(e2), r2 = { browserDetails: i2, commonShim: hs, extractVersion: or, disableLog: dr, disableWarnings: lr, sdp: ts };
          switch (i2.browser) {
            case "chrome":
              if (!Pr || !wr || !t2.shimChrome) return n2("Chrome shim is not included in this adapter release."), r2;
              if (null === i2.version) return n2("Chrome shim can not determine version, not shimming."), r2;
              n2("adapter.js shimming chrome."), r2.browserShim = Pr, cs(e2, i2), ds(e2), kr(e2, i2), yr(e2), wr(e2, i2), br(e2, i2), Cr(e2, i2), Tr(e2), Sr(e2, i2), Rr(e2, i2), ns(e2), is(e2), as(e2), rs(e2, i2), ss(e2, i2), os(e2, i2);
              break;
            case "firefox":
              if (!jr || !_r || !t2.shimFirefox) return n2("Firefox shim is not included in this adapter release."), r2;
              n2("adapter.js shimming firefox."), r2.browserShim = jr, cs(e2, i2), ds(e2), Ir(e2, i2), _r(e2, i2), Mr(e2, i2), Dr(e2), Nr(e2), Or(e2), Ar(e2), Lr(e2), xr(e2), Ur(e2), Fr(e2), Br(e2), ns(e2), as(e2), rs(e2, i2), ss(e2, i2);
              break;
            case "safari":
              if (!Xr || !t2.shimSafari) return n2("Safari shim is not included in this adapter release."), r2;
              n2("adapter.js shimming safari."), r2.browserShim = Xr, cs(e2, i2), ds(e2), zr(e2), Gr(e2), Hr(e2), qr(e2), Vr(e2), Jr(e2), Wr(e2), Qr(e2), ns(e2), is(e2), rs(e2, i2), ss(e2, i2), os(e2, i2);
              break;
            default:
              n2("Unsupported browser!");
          }
        })({ window: "undefined" == typeof window ? void 0 : window });
        class ps extends (us = Promise) {
          constructor(e2) {
            super(e2);
          }
          catch(e2) {
            return super.catch(e2);
          }
          static reject(e2) {
            return super.reject(e2);
          }
          static all(e2) {
            return super.all(e2);
          }
          static race(e2) {
            return super.race(e2);
          }
        }
        ls = ps, ps.resolve = (e2) => Reflect.get(us, "resolve", ls).call(ls, e2);
        const ms = /version\/(\d+(\.?_?\d+)+)/i;
        let gs;
        function vs(e2) {
          let t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          if (void 0 === e2 && "undefined" == typeof navigator) return;
          const n2 = (null != e2 ? e2 : navigator.userAgent).toLowerCase();
          if (void 0 === gs || t2) {
            const e3 = fs.find(((e4) => {
              let { test: t3 } = e4;
              return t3.test(n2);
            }));
            gs = null == e3 ? void 0 : e3.describe(n2);
          }
          return gs;
        }
        const fs = [{ test: /firefox|iceweasel|fxios/i, describe: (e2) => ({ name: "Firefox", version: ks(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e2), os: e2.toLowerCase().includes("fxios") ? "iOS" : void 0, osVersion: ys(e2) }) }, { test: /chrom|crios|crmo/i, describe: (e2) => ({ name: "Chrome", version: ks(/(?:chrome|chromium|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e2), os: e2.toLowerCase().includes("crios") ? "iOS" : void 0, osVersion: ys(e2) }) }, { test: /safari|applewebkit/i, describe: (e2) => ({ name: "Safari", version: ks(ms, e2), os: e2.includes("mobile/") ? "iOS" : "macOS", osVersion: ys(e2) }) }];
        function ks(e2, t2) {
          let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
          const i2 = t2.match(e2);
          return i2 && i2.length >= n2 && i2[n2] || "";
        }
        function ys(e2) {
          return e2.includes("mac os") ? ks(/\(.+?(\d+_\d+(:?_\d+)?)/, e2, 1).replace(/_/g, ".") : void 0;
        }
        const bs = "2.18.9";
        class Ts extends Error {
          constructor(e2, t2, n2) {
            super(t2 || "an error has occurred"), this.name = "LiveKitError", this.code = e2, void 0 !== (null == n2 ? void 0 : n2.cause) && (this.cause = null == n2 ? void 0 : n2.cause);
          }
        }
        class Ss extends Ts {
        }
        var Es, Cs, ws, Rs, Ps, Is, Ds;
        e.ConnectionErrorReason = void 0, (Es = e.ConnectionErrorReason || (e.ConnectionErrorReason = {}))[Es.NotAllowed = 0] = "NotAllowed", Es[Es.ServerUnreachable = 1] = "ServerUnreachable", Es[Es.InternalError = 2] = "InternalError", Es[Es.Cancelled = 3] = "Cancelled", Es[Es.LeaveRequest = 4] = "LeaveRequest", Es[Es.Timeout = 5] = "Timeout", Es[Es.WebSocket = 6] = "WebSocket", Es[Es.ServiceNotFound = 7] = "ServiceNotFound";
        class _s extends Ss {
          constructor(t2, n2, i2, r2) {
            super(1, t2), this.name = "ConnectionError", this.status = i2, this.reason = n2, this.context = r2, this.reasonName = e.ConnectionErrorReason[n2];
          }
          static notAllowed(t2, n2, i2) {
            return new _s(t2, e.ConnectionErrorReason.NotAllowed, n2, i2);
          }
          static timeout(t2) {
            return new _s(t2, e.ConnectionErrorReason.Timeout);
          }
          static leaveRequest(t2, n2) {
            return new _s(t2, e.ConnectionErrorReason.LeaveRequest, void 0, n2);
          }
          static internal(t2, n2) {
            return new _s(t2, e.ConnectionErrorReason.InternalError, void 0, n2);
          }
          static cancelled(t2) {
            return new _s(t2, e.ConnectionErrorReason.Cancelled);
          }
          static serverUnreachable(t2, n2) {
            return new _s(t2, e.ConnectionErrorReason.ServerUnreachable, n2);
          }
          static websocket(t2, n2, i2) {
            return new _s(t2, e.ConnectionErrorReason.WebSocket, n2, i2);
          }
          static serviceNotFound(t2, n2) {
            return new _s(t2, e.ConnectionErrorReason.ServiceNotFound, void 0, n2);
          }
        }
        class Ms extends Ts {
          constructor(e2) {
            super(21, null != e2 ? e2 : "device is unsupported"), this.name = "DeviceUnsupportedError";
          }
        }
        class Os extends Ts {
          constructor(e2) {
            super(20, null != e2 ? e2 : "track is invalid"), this.name = "TrackInvalidError";
          }
        }
        class As extends Ts {
          constructor(e2) {
            super(10, null != e2 ? e2 : "unsupported server"), this.name = "UnsupportedServer";
          }
        }
        class Ns extends Ts {
          constructor(e2) {
            super(12, null != e2 ? e2 : "unexpected connection state"), this.name = "UnexpectedConnectionState";
          }
        }
        class Ls extends Ts {
          constructor(e2) {
            super(13, null != e2 ? e2 : "unable to negotiate"), this.name = "NegotiationError";
          }
        }
        class xs extends Ts {
          constructor(e2, t2) {
            super(15, e2), this.name = "PublishTrackError", this.status = t2;
          }
        }
        class Us extends Ss {
          constructor(e2, t2) {
            super(15, e2), this.name = "SignalRequestError", this.reason = t2, this.reasonName = "string" == typeof t2 ? t2 : si[t2];
          }
        }
        e.DataStreamErrorReason = void 0, (Cs = e.DataStreamErrorReason || (e.DataStreamErrorReason = {}))[Cs.AlreadyOpened = 0] = "AlreadyOpened", Cs[Cs.AbnormalEnd = 1] = "AbnormalEnd", Cs[Cs.DecodeFailed = 2] = "DecodeFailed", Cs[Cs.LengthExceeded = 3] = "LengthExceeded", Cs[Cs.Incomplete = 4] = "Incomplete", Cs[Cs.HandlerAlreadyRegistered = 7] = "HandlerAlreadyRegistered", Cs[Cs.EncryptionTypeMismatch = 8] = "EncryptionTypeMismatch";
        class Fs extends Ss {
          constructor(t2, n2) {
            super(16, t2), this.name = "DataStreamError", this.reason = n2, this.reasonName = e.DataStreamErrorReason[n2];
          }
        }
        class Bs extends Ts {
          constructor(e2) {
            super(18, e2), this.name = "SignalReconnectError";
          }
        }
        e.MediaDeviceFailure = void 0, (ws = e.MediaDeviceFailure || (e.MediaDeviceFailure = {})).PermissionDenied = "PermissionDenied", ws.NotFound = "NotFound", ws.DeviceInUse = "DeviceInUse", ws.Other = "Other", (function(e2) {
          e2.getFailure = function(t2) {
            if (t2 && "name" in t2) return "NotFoundError" === t2.name || "DevicesNotFoundError" === t2.name ? e2.NotFound : "NotAllowedError" === t2.name || "PermissionDeniedError" === t2.name ? e2.PermissionDenied : "NotReadableError" === t2.name || "TrackStartError" === t2.name ? e2.DeviceInUse : e2.Other;
          };
        })(e.MediaDeviceFailure || (e.MediaDeviceFailure = {}));
        class js {
        }
        js.setTimeout = function() {
          return setTimeout(...arguments);
        }, js.setInterval = function() {
          return setInterval(...arguments);
        }, js.clearTimeout = function() {
          return clearTimeout(...arguments);
        }, js.clearInterval = function() {
          return clearInterval(...arguments);
        }, e.RoomEvent = void 0, (Rs = e.RoomEvent || (e.RoomEvent = {})).Connected = "connected", Rs.Reconnecting = "reconnecting", Rs.SignalReconnecting = "signalReconnecting", Rs.Reconnected = "reconnected", Rs.Disconnected = "disconnected", Rs.ConnectionStateChanged = "connectionStateChanged", Rs.Moved = "moved", Rs.MediaDevicesChanged = "mediaDevicesChanged", Rs.ParticipantConnected = "participantConnected", Rs.ParticipantDisconnected = "participantDisconnected", Rs.TrackPublished = "trackPublished", Rs.TrackSubscribed = "trackSubscribed", Rs.TrackSubscriptionFailed = "trackSubscriptionFailed", Rs.TrackUnpublished = "trackUnpublished", Rs.TrackUnsubscribed = "trackUnsubscribed", Rs.TrackMuted = "trackMuted", Rs.TrackUnmuted = "trackUnmuted", Rs.LocalTrackPublished = "localTrackPublished", Rs.LocalTrackUnpublished = "localTrackUnpublished", Rs.LocalAudioSilenceDetected = "localAudioSilenceDetected", Rs.ActiveSpeakersChanged = "activeSpeakersChanged", Rs.ParticipantMetadataChanged = "participantMetadataChanged", Rs.ParticipantNameChanged = "participantNameChanged", Rs.ParticipantAttributesChanged = "participantAttributesChanged", Rs.ParticipantActive = "participantActive", Rs.RoomMetadataChanged = "roomMetadataChanged", Rs.DataReceived = "dataReceived", Rs.SipDTMFReceived = "sipDTMFReceived", Rs.TranscriptionReceived = "transcriptionReceived", Rs.ConnectionQualityChanged = "connectionQualityChanged", Rs.TrackStreamStateChanged = "trackStreamStateChanged", Rs.TrackSubscriptionPermissionChanged = "trackSubscriptionPermissionChanged", Rs.TrackSubscriptionStatusChanged = "trackSubscriptionStatusChanged", Rs.AudioPlaybackStatusChanged = "audioPlaybackChanged", Rs.VideoPlaybackStatusChanged = "videoPlaybackChanged", Rs.MediaDevicesError = "mediaDevicesError", Rs.ParticipantPermissionsChanged = "participantPermissionsChanged", Rs.SignalConnected = "signalConnected", Rs.RecordingStatusChanged = "recordingStatusChanged", Rs.ParticipantEncryptionStatusChanged = "participantEncryptionStatusChanged", Rs.EncryptionError = "encryptionError", Rs.DCBufferStatusChanged = "dcBufferStatusChanged", Rs.ActiveDeviceChanged = "activeDeviceChanged", Rs.ChatMessage = "chatMessage", Rs.LocalTrackSubscribed = "localTrackSubscribed", Rs.MetricsReceived = "metricsReceived", Rs.DataTrackPublished = "dataTrackPublished", Rs.DataTrackUnpublished = "dataTrackUnpublished", Rs.LocalDataTrackPublished = "localDataTrackPublished", Rs.LocalDataTrackUnpublished = "localDataTrackUnpublished", e.ParticipantEvent = void 0, (Ps = e.ParticipantEvent || (e.ParticipantEvent = {})).TrackPublished = "trackPublished", Ps.TrackSubscribed = "trackSubscribed", Ps.TrackSubscriptionFailed = "trackSubscriptionFailed", Ps.TrackUnpublished = "trackUnpublished", Ps.TrackUnsubscribed = "trackUnsubscribed", Ps.TrackMuted = "trackMuted", Ps.TrackUnmuted = "trackUnmuted", Ps.LocalTrackPublished = "localTrackPublished", Ps.LocalTrackUnpublished = "localTrackUnpublished", Ps.LocalTrackCpuConstrained = "localTrackCpuConstrained", Ps.LocalSenderCreated = "localSenderCreated", Ps.ParticipantMetadataChanged = "participantMetadataChanged", Ps.ParticipantNameChanged = "participantNameChanged", Ps.DataReceived = "dataReceived", Ps.SipDTMFReceived = "sipDTMFReceived", Ps.TranscriptionReceived = "transcriptionReceived", Ps.IsSpeakingChanged = "isSpeakingChanged", Ps.ConnectionQualityChanged = "connectionQualityChanged", Ps.TrackStreamStateChanged = "trackStreamStateChanged", Ps.TrackSubscriptionPermissionChanged = "trackSubscriptionPermissionChanged", Ps.TrackSubscriptionStatusChanged = "trackSubscriptionStatusChanged", Ps.TrackCpuConstrained = "trackCpuConstrained", Ps.MediaDevicesError = "mediaDevicesError", Ps.AudioStreamAcquired = "audioStreamAcquired", Ps.ParticipantPermissionsChanged = "participantPermissionsChanged", Ps.PCTrackAdded = "pcTrackAdded", Ps.AttributesChanged = "attributesChanged", Ps.LocalTrackSubscribed = "localTrackSubscribed", Ps.ChatMessage = "chatMessage", Ps.Active = "active", e.EngineEvent = void 0, (Is = e.EngineEvent || (e.EngineEvent = {})).TransportsCreated = "transportsCreated", Is.Connected = "connected", Is.Disconnected = "disconnected", Is.Resuming = "resuming", Is.Resumed = "resumed", Is.Restarting = "restarting", Is.Restarted = "restarted", Is.SignalResumed = "signalResumed", Is.SignalRestarted = "signalRestarted", Is.Closing = "closing", Is.MediaTrackAdded = "mediaTrackAdded", Is.ActiveSpeakersUpdate = "activeSpeakersUpdate", Is.DataPacketReceived = "dataPacketReceived", Is.RTPVideoMapUpdate = "rtpVideoMapUpdate", Is.DCBufferStatusChanged = "dcBufferStatusChanged", Is.ParticipantUpdate = "participantUpdate", Is.RoomUpdate = "roomUpdate", Is.SpeakersChanged = "speakersChanged", Is.StreamStateChanged = "streamStateChanged", Is.ConnectionQualityUpdate = "connectionQualityUpdate", Is.SubscriptionError = "subscriptionError", Is.SubscriptionPermissionUpdate = "subscriptionPermissionUpdate", Is.RemoteMute = "remoteMute", Is.SubscribedQualityUpdate = "subscribedQualityUpdate", Is.LocalTrackUnpublished = "localTrackUnpublished", Is.LocalTrackSubscribed = "localTrackSubscribed", Is.Offline = "offline", Is.SignalRequestResponse = "signalRequestResponse", Is.SignalConnected = "signalConnected", Is.RoomMoved = "roomMoved", Is.PublishDataTrackResponse = "publishDataTrackResponse", Is.UnPublishDataTrackResponse = "unPublishDataTrackResponse", Is.DataTrackSubscriberHandles = "dataTrackSubscriberHandles", Is.DataTrackPacketReceived = "dataTrackPacketReceived", Is.Joined = "joined", Is.TokenRefreshed = "tokenRefreshed", Is.ServerRegionsReported = "serverRegionsReported", e.TrackEvent = void 0, (Ds = e.TrackEvent || (e.TrackEvent = {})).Message = "message", Ds.Muted = "muted", Ds.Unmuted = "unmuted", Ds.Restarted = "restarted", Ds.Ended = "ended", Ds.Subscribed = "subscribed", Ds.Unsubscribed = "unsubscribed", Ds.CpuConstrained = "cpuConstrained", Ds.UpdateSettings = "updateSettings", Ds.UpdateSubscription = "updateSubscription", Ds.AudioPlaybackStarted = "audioPlaybackStarted", Ds.AudioPlaybackFailed = "audioPlaybackFailed", Ds.AudioSilenceDetected = "audioSilenceDetected", Ds.VisibilityChanged = "visibilityChanged", Ds.VideoDimensionsChanged = "videoDimensionsChanged", Ds.VideoPlaybackStarted = "videoPlaybackStarted", Ds.VideoPlaybackFailed = "videoPlaybackFailed", Ds.ElementAttached = "elementAttached", Ds.ElementDetached = "elementDetached", Ds.UpstreamPaused = "upstreamPaused", Ds.UpstreamResumed = "upstreamResumed", Ds.SubscriptionPermissionChanged = "subscriptionPermissionChanged", Ds.SubscriptionStatusChanged = "subscriptionStatusChanged", Ds.SubscriptionFailed = "subscriptionFailed", Ds.TrackProcessorUpdate = "trackProcessorUpdate", Ds.AudioTrackFeatureUpdate = "audioTrackFeatureUpdate", Ds.TranscriptionReceived = "transcriptionReceived", Ds.TimeSyncUpdate = "timeSyncUpdate", Ds.PreConnectBufferFlushed = "preConnectBufferFlushed";
        class qs {
          constructor(e2, t2, n2, i2, r2) {
            if ("object" == typeof e2) this.width = e2.width, this.height = e2.height, this.aspectRatio = e2.aspectRatio, this.encoding = { maxBitrate: e2.maxBitrate, maxFramerate: e2.maxFramerate, priority: e2.priority };
            else {
              if (void 0 === t2 || void 0 === n2) throw new TypeError("Unsupported options: provide at least width, height and maxBitrate");
              this.width = e2, this.height = t2, this.aspectRatio = e2 / t2, this.encoding = { maxBitrate: n2, maxFramerate: i2, priority: r2 };
            }
          }
          get resolution() {
            return { width: this.width, height: this.height, frameRate: this.encoding.maxFramerate, aspectRatio: this.aspectRatio };
          }
        }
        const Vs = ["opus", "red"], Hs = ["vp8", "h264"], Ws = ["vp8", "h264", "vp9", "av1", "h265"];
        function Ks(e2) {
          return !!Hs.find(((t2) => t2 === e2));
        }
        const zs = Ks;
        var Js, Gs;
        e.BackupCodecPolicy = void 0, (Js = e.BackupCodecPolicy || (e.BackupCodecPolicy = {}))[Js.PREFER_REGRESSION = 0] = "PREFER_REGRESSION", Js[Js.SIMULCAST = 1] = "SIMULCAST", Js[Js.REGRESSION = 2] = "REGRESSION", e.AudioPresets = void 0, (Gs = e.AudioPresets || (e.AudioPresets = {})).telephone = { maxBitrate: 12e3 }, Gs.speech = { maxBitrate: 24e3 }, Gs.music = { maxBitrate: 48e3 }, Gs.musicStereo = { maxBitrate: 64e3 }, Gs.musicHighQuality = { maxBitrate: 96e3 }, Gs.musicHighQualityStereo = { maxBitrate: 128e3 };
        const Qs = { h90: new qs(160, 90, 9e4, 20), h180: new qs(320, 180, 16e4, 20), h216: new qs(384, 216, 18e4, 20), h360: new qs(640, 360, 45e4, 20), h540: new qs(960, 540, 8e5, 25), h720: new qs(1280, 720, 17e5, 30), h1080: new qs(1920, 1080, 3e6, 30), h1440: new qs(2560, 1440, 5e6, 30), h2160: new qs(3840, 2160, 8e6, 30) }, Ys = { h120: new qs(160, 120, 7e4, 20), h180: new qs(240, 180, 125e3, 20), h240: new qs(320, 240, 14e4, 20), h360: new qs(480, 360, 33e4, 20), h480: new qs(640, 480, 5e5, 20), h540: new qs(720, 540, 6e5, 25), h720: new qs(960, 720, 13e5, 30), h1080: new qs(1440, 1080, 23e5, 30), h1440: new qs(1920, 1440, 38e5, 30) }, Xs = { h360fps3: new qs(640, 360, 2e5, 3, "medium"), h360fps15: new qs(640, 360, 4e5, 15, "medium"), h720fps5: new qs(1280, 720, 8e5, 5, "medium"), h720fps15: new qs(1280, 720, 15e5, 15, "medium"), h720fps30: new qs(1280, 720, 2e6, 30, "medium"), h1080fps15: new qs(1920, 1080, 25e5, 15, "medium"), h1080fps30: new qs(1920, 1080, 5e6, 30, "medium"), original: new qs(0, 0, 7e6, 30, "medium") };
        function Zs(e2, t2, n2) {
          var i2, r2, s2, a2;
          const { optionsWithoutProcessor: o2, audioProcessor: c2, videoProcessor: d2 } = da(null != e2 ? e2 : {}), l2 = null == t2 ? void 0 : t2.processor, u2 = null == n2 ? void 0 : n2.processor, h2 = null != o2 ? o2 : {};
          return true === h2.audio && (h2.audio = {}), true === h2.video && (h2.video = {}), h2.audio && ($s(h2.audio, t2), null !== (i2 = (s2 = h2.audio).deviceId) && void 0 !== i2 || (s2.deviceId = { ideal: "default" }), (c2 || l2) && (h2.audio.processor = null != c2 ? c2 : l2)), h2.video && ($s(h2.video, n2), null !== (r2 = (a2 = h2.video).deviceId) && void 0 !== r2 || (a2.deviceId = { ideal: "default" }), (d2 || u2) && (h2.video.processor = null != d2 ? d2 : u2)), h2;
        }
        function $s(e2, t2) {
          return Object.keys(t2).forEach(((n2) => {
            void 0 === e2[n2] && (e2[n2] = t2[n2]);
          })), e2;
        }
        function ea(e2) {
          var t2, n2, i2, r2;
          const s2 = {};
          if (e2.video) if ("object" == typeof e2.video) {
            const n3 = {}, r3 = n3, a2 = e2.video;
            Object.keys(a2).forEach(((e3) => {
              if ("resolution" === e3) $s(r3, a2.resolution);
              else r3[e3] = a2[e3];
            })), s2.video = n3, null !== (t2 = (i2 = s2.video).deviceId) && void 0 !== t2 || (i2.deviceId = { ideal: "default" });
          } else s2.video = !!e2.video && { deviceId: { ideal: "default" } };
          else s2.video = false;
          return e2.audio ? "object" == typeof e2.audio ? (s2.audio = e2.audio, null !== (n2 = (r2 = s2.audio).deviceId) && void 0 !== n2 || (r2.deviceId = { ideal: "default" })) : s2.audio = { deviceId: { ideal: "default" } } : s2.audio = false, s2;
        }
        function ta(e2) {
          return Xi(this, arguments, void 0, (function(e3) {
            let t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 200;
            return (function* () {
              const n2 = na();
              if (n2) {
                const i2 = n2.createAnalyser();
                i2.fftSize = 2048;
                const r2 = i2.frequencyBinCount, s2 = new Uint8Array(r2);
                n2.createMediaStreamSource(new MediaStream([e3.mediaStreamTrack])).connect(i2), yield fa(t2), i2.getByteTimeDomainData(s2);
                const a2 = s2.some(((e4) => 128 !== e4 && 0 !== e4));
                return n2.close(), !a2;
              }
              return false;
            })();
          }));
        }
        function na() {
          var e2;
          const t2 = "undefined" != typeof window && (window.AudioContext || window.webkitAudioContext);
          if (t2) {
            const n2 = new t2({ latencyHint: "interactive" });
            if ("suspended" === n2.state && "undefined" != typeof window && (null === (e2 = window.document) || void 0 === e2 ? void 0 : e2.body)) {
              const e3 = () => Xi(this, void 0, void 0, (function* () {
                var t3;
                try {
                  "suspended" === n2.state && (yield n2.resume());
                } catch (e4) {
                  console.warn("Error trying to auto-resume audio context", e4);
                } finally {
                  null === (t3 = window.document.body) || void 0 === t3 || t3.removeEventListener("click", e3);
                }
              }));
              n2.addEventListener("statechange", (() => {
                var t3;
                "closed" === n2.state && (null === (t3 = window.document.body) || void 0 === t3 || t3.removeEventListener("click", e3));
              })), window.document.body.addEventListener("click", e3);
            }
            return n2;
          }
        }
        function ia(e2) {
          return "audioinput" === e2 ? pa.Source.Microphone : "videoinput" === e2 ? pa.Source.Camera : pa.Source.Unknown;
        }
        function ra(e2) {
          return e2 === pa.Source.Microphone ? "audioinput" : e2 === pa.Source.Camera ? "videoinput" : void 0;
        }
        function sa(e2) {
          var t2, n2;
          let i2 = null === (t2 = e2.video) || void 0 === t2 || t2;
          return e2.resolution && e2.resolution.width > 0 && e2.resolution.height > 0 && (i2 = "boolean" == typeof i2 ? {} : i2, i2 = Pa() ? Object.assign(Object.assign({}, i2), { width: { max: e2.resolution.width }, height: { max: e2.resolution.height }, frameRate: e2.resolution.frameRate }) : Object.assign(Object.assign({}, i2), { width: { ideal: e2.resolution.width }, height: { ideal: e2.resolution.height }, frameRate: e2.resolution.frameRate })), { audio: null !== (n2 = e2.audio) && void 0 !== n2 && n2, video: i2, controller: e2.controller, selfBrowserSurface: e2.selfBrowserSurface, surfaceSwitching: e2.surfaceSwitching, systemAudio: e2.systemAudio, preferCurrentTab: e2.preferCurrentTab };
        }
        function aa(e2) {
          return e2.split("/")[1].toLowerCase();
        }
        function oa(e2) {
          const t2 = [];
          return e2.forEach(((e3) => {
            void 0 !== e3.track && t2.push(new bn({ cid: e3.track.mediaStreamID, track: e3.trackInfo }));
          })), t2;
        }
        function ca(e2) {
          return "mediaStreamTrack" in e2 ? { trackID: e2.sid, source: e2.source, muted: e2.isMuted, enabled: e2.mediaStreamTrack.enabled, kind: e2.kind, streamID: e2.mediaStreamID, streamTrackID: e2.mediaStreamTrack.id } : { trackID: e2.trackSid, enabled: e2.isEnabled, muted: e2.isMuted, trackInfo: Object.assign({ mimeType: e2.mimeType, name: e2.trackName, encrypted: e2.isEncrypted, kind: e2.kind, source: e2.source }, e2.track ? ca(e2.track) : {}) };
        }
        function da(e2) {
          const t2 = Object.assign({}, e2);
          let n2, i2;
          return "object" == typeof t2.audio && t2.audio.processor && (n2 = t2.audio.processor, t2.audio = Object.assign(Object.assign({}, t2.audio), { processor: void 0 })), "object" == typeof t2.video && t2.video.processor && (i2 = t2.video.processor, t2.video = Object.assign(Object.assign({}, t2.video), { processor: void 0 })), { audioProcessor: n2, videoProcessor: i2, optionsWithoutProcessor: (r2 = t2, void 0 === r2 ? r2 : "function" == typeof structuredClone ? "object" == typeof r2 && null !== r2 ? structuredClone(Object.assign({}, r2)) : structuredClone(r2) : JSON.parse(JSON.stringify(r2))) };
          var r2;
        }
        function la(e2, t2) {
          return e2.width * e2.height < t2.width * t2.height;
        }
        const ua = [];
        var ha;
        e.VideoQuality = void 0, (ha = e.VideoQuality || (e.VideoQuality = {}))[ha.LOW = 0] = "LOW", ha[ha.MEDIUM = 1] = "MEDIUM", ha[ha.HIGH = 2] = "HIGH";
        class pa extends rr.EventEmitter {
          get streamState() {
            return this._streamState;
          }
          setStreamState(e2) {
            this._streamState = e2;
          }
          constructor(t2, n2) {
            let i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            var r2;
            super(), this.attachedElements = [], this.isMuted = false, this._streamState = pa.StreamState.Active, this.isInBackground = false, this._currentBitrate = 0, this.log = Hi, this.appVisibilityChangedListener = () => {
              this.backgroundTimeout && clearTimeout(this.backgroundTimeout), "hidden" === document.visibilityState ? this.backgroundTimeout = setTimeout((() => this.handleAppVisibilityChanged()), 5e3) : this.handleAppVisibilityChanged();
            }, this.log = Ki(null !== (r2 = i2.loggerName) && void 0 !== r2 ? r2 : e.LoggerNames.Track), this.loggerContextCb = i2.loggerContextCb, this.setMaxListeners(100), this.kind = n2, this._mediaStreamTrack = t2, this._mediaStreamID = t2.id, this.source = pa.Source.Unknown;
          }
          get logContext() {
            var e2;
            return Object.assign(Object.assign({}, null === (e2 = this.loggerContextCb) || void 0 === e2 ? void 0 : e2.call(this)), ca(this));
          }
          get currentBitrate() {
            return this._currentBitrate;
          }
          get mediaStreamTrack() {
            return this._mediaStreamTrack;
          }
          get mediaStreamID() {
            return this._mediaStreamID;
          }
          attach(t2) {
            let n2 = "audio";
            this.kind === pa.Kind.Video && (n2 = "video"), 0 === this.attachedElements.length && this.kind === pa.Kind.Video && this.addAppVisibilityListener(), t2 || ("audio" === n2 && (ua.forEach(((e2) => {
              null !== e2.parentElement || t2 || (t2 = e2);
            })), t2 && ua.splice(ua.indexOf(t2), 1)), t2 || (t2 = document.createElement(n2))), this.attachedElements.includes(t2) || this.attachedElements.push(t2), ma(this.mediaStreamTrack, t2);
            const i2 = t2.srcObject.getTracks(), r2 = i2.some(((e2) => "audio" === e2.kind));
            return t2.play().then((() => {
              this.emit(r2 ? e.TrackEvent.AudioPlaybackStarted : e.TrackEvent.VideoPlaybackStarted);
            })).catch(((n3) => {
              "NotAllowedError" === n3.name ? this.emit(r2 ? e.TrackEvent.AudioPlaybackFailed : e.TrackEvent.VideoPlaybackFailed, n3) : "AbortError" === n3.name ? Hi.debug("".concat(r2 ? "audio" : "video", " playback aborted, likely due to new play request")) : Hi.warn("could not playback ".concat(r2 ? "audio" : "video"), n3), r2 && t2 && i2.some(((e2) => "video" === e2.kind)) && "NotAllowedError" === n3.name && (t2.muted = true, t2.play().catch((() => {
              })));
            })), this.emit(e.TrackEvent.ElementAttached, t2), t2;
          }
          detach(t2) {
            try {
              if (t2) {
                ga(this.mediaStreamTrack, t2);
                const n3 = this.attachedElements.indexOf(t2);
                return n3 >= 0 && (this.attachedElements.splice(n3, 1), this.recycleElement(t2), this.emit(e.TrackEvent.ElementDetached, t2)), t2;
              }
              const n2 = [];
              return this.attachedElements.forEach(((t3) => {
                ga(this.mediaStreamTrack, t3), n2.push(t3), this.recycleElement(t3), this.emit(e.TrackEvent.ElementDetached, t3);
              })), this.attachedElements = [], n2;
            } finally {
              0 === this.attachedElements.length && this.removeAppVisibilityListener();
            }
          }
          stop() {
            this.stopMonitor(), this._mediaStreamTrack.stop();
          }
          enable() {
            this._mediaStreamTrack.enabled = true;
          }
          disable() {
            this._mediaStreamTrack.enabled = false;
          }
          stopMonitor() {
            this.monitorInterval && clearInterval(this.monitorInterval), this.timeSyncHandle && cancelAnimationFrame(this.timeSyncHandle);
          }
          updateLoggerOptions(e2) {
            e2.loggerName && (this.log = Ki(e2.loggerName)), e2.loggerContextCb && (this.loggerContextCb = e2.loggerContextCb);
          }
          recycleElement(e2) {
            if (e2 instanceof HTMLAudioElement) {
              let t2 = true;
              e2.pause(), ua.forEach(((e3) => {
                e3.parentElement || (t2 = false);
              })), t2 && ua.push(e2);
            }
          }
          handleAppVisibilityChanged() {
            return Xi(this, void 0, void 0, (function* () {
              this.isInBackground = "hidden" === document.visibilityState, this.isInBackground || this.kind !== pa.Kind.Video || setTimeout((() => this.attachedElements.forEach(((e2) => e2.play().catch((() => {
              }))))), 0);
            }));
          }
          addAppVisibilityListener() {
            Ma() ? (this.isInBackground = "hidden" === document.visibilityState, document.addEventListener("visibilitychange", this.appVisibilityChangedListener)) : this.isInBackground = false;
          }
          removeAppVisibilityListener() {
            Ma() && document.removeEventListener("visibilitychange", this.appVisibilityChangedListener);
          }
        }
        function ma(e2, t2) {
          let n2, i2;
          n2 = t2.srcObject instanceof MediaStream ? t2.srcObject : new MediaStream(), i2 = "audio" === e2.kind ? n2.getAudioTracks() : n2.getVideoTracks(), i2.includes(e2) || (i2.forEach(((e3) => {
            n2.removeTrack(e3);
          })), n2.addTrack(e2)), Pa() && t2 instanceof HTMLVideoElement || (t2.autoplay = true), t2.muted = 0 === n2.getAudioTracks().length, t2 instanceof HTMLVideoElement && (t2.playsInline = true), t2.srcObject !== n2 && (t2.srcObject = n2, (Pa() || wa()) && t2 instanceof HTMLVideoElement && setTimeout((() => {
            t2.srcObject = n2, t2.play().catch((() => {
            }));
          }), 0));
        }
        function ga(e2, t2) {
          if (t2.srcObject instanceof MediaStream) {
            const n2 = t2.srcObject;
            n2.removeTrack(e2), n2.getTracks().length > 0 ? t2.srcObject = n2 : t2.srcObject = null;
          }
        }
        !(function(e2) {
          let t2, n2, i2;
          !(function(e3) {
            e3.Audio = "audio", e3.Video = "video", e3.Unknown = "unknown";
          })(t2 = e2.Kind || (e2.Kind = {})), (function(e3) {
            e3.Camera = "camera", e3.Microphone = "microphone", e3.ScreenShare = "screen_share", e3.ScreenShareAudio = "screen_share_audio", e3.Unknown = "unknown";
          })(n2 = e2.Source || (e2.Source = {})), (function(e3) {
            e3.Active = "active", e3.Paused = "paused", e3.Unknown = "unknown";
          })(i2 = e2.StreamState || (e2.StreamState = {})), e2.kindToProto = function(e3) {
            switch (e3) {
              case t2.Audio:
                return Xe.AUDIO;
              case t2.Video:
                return Xe.VIDEO;
              default:
                return Xe.DATA;
            }
          }, e2.kindFromProto = function(e3) {
            switch (e3) {
              case Xe.AUDIO:
                return t2.Audio;
              case Xe.VIDEO:
                return t2.Video;
              default:
                return t2.Unknown;
            }
          }, e2.sourceToProto = function(e3) {
            switch (e3) {
              case n2.Camera:
                return Ze.CAMERA;
              case n2.Microphone:
                return Ze.MICROPHONE;
              case n2.ScreenShare:
                return Ze.SCREEN_SHARE;
              case n2.ScreenShareAudio:
                return Ze.SCREEN_SHARE_AUDIO;
              default:
                return Ze.UNKNOWN;
            }
          }, e2.sourceFromProto = function(e3) {
            switch (e3) {
              case Ze.CAMERA:
                return n2.Camera;
              case Ze.MICROPHONE:
                return n2.Microphone;
              case Ze.SCREEN_SHARE:
                return n2.ScreenShare;
              case Ze.SCREEN_SHARE_AUDIO:
                return n2.ScreenShareAudio;
              default:
                return n2.Unknown;
            }
          }, e2.streamStateFromProto = function(e3) {
            switch (e3) {
              case rn.ACTIVE:
                return i2.Active;
              case rn.PAUSED:
                return i2.Paused;
              default:
                return i2.Unknown;
            }
          };
        })(pa || (pa = {}));
        const va = "https://aomediacodec.github.io/av1-rtp-spec/#dependency-descriptor-rtp-header-extension";
        function fa(e2) {
          return new ps(((t2) => js.setTimeout(t2, e2)));
        }
        function ka() {
          return "addTransceiver" in RTCPeerConnection.prototype;
        }
        function ya() {
          return "addTrack" in RTCPeerConnection.prototype;
        }
        function ba() {
          if (!("getCapabilities" in RTCRtpSender)) return false;
          if (Pa() || wa()) return false;
          const e2 = RTCRtpSender.getCapabilities("video");
          let t2 = false;
          if (e2) {
            for (const n2 of e2.codecs) if ("video/av1" === n2.mimeType.toLowerCase()) {
              t2 = true;
              break;
            }
          }
          return t2;
        }
        function Ta() {
          if (!("getCapabilities" in RTCRtpSender)) return false;
          if (wa()) return false;
          if (Pa()) {
            const e3 = vs();
            if ((null == e3 ? void 0 : e3.version) && Fa(e3.version, "16") < 0) return false;
            if ("iOS" === (null == e3 ? void 0 : e3.os) && (null == e3 ? void 0 : e3.osVersion) && Fa(e3.osVersion, "16") < 0) return false;
          }
          const e2 = RTCRtpSender.getCapabilities("video");
          let t2 = false;
          if (e2) {
            for (const n2 of e2.codecs) if ("video/vp9" === n2.mimeType.toLowerCase()) {
              t2 = true;
              break;
            }
          }
          return t2;
        }
        function Sa(e2) {
          return "av1" === e2 || "vp9" === e2;
        }
        function Ea(e2) {
          return !(!document || Ia()) && (e2 || (e2 = document.createElement("audio")), "setSinkId" in e2);
        }
        function Ca() {
          return "undefined" != typeof RTCPeerConnection && (ka() || ya());
        }
        function wa() {
          var e2;
          return "Firefox" === (null === (e2 = vs()) || void 0 === e2 ? void 0 : e2.name);
        }
        function Ra() {
          const e2 = vs();
          return !!e2 && "Chrome" === e2.name && "iOS" !== e2.os;
        }
        function Pa() {
          var e2;
          return "Safari" === (null === (e2 = vs()) || void 0 === e2 ? void 0 : e2.name);
        }
        function Ia() {
          const e2 = vs();
          return "Safari" === (null == e2 ? void 0 : e2.name) || "iOS" === (null == e2 ? void 0 : e2.os);
        }
        function Da() {
          const e2 = vs();
          return "Safari" === (null == e2 ? void 0 : e2.name) && e2.version.startsWith("17.") || "iOS" === (null == e2 ? void 0 : e2.os) && !!(null == e2 ? void 0 : e2.osVersion) && Fa(e2.osVersion, "17") >= 0;
        }
        function _a() {
          var e2, t2;
          return !!Ma() && (null !== (t2 = null === (e2 = navigator.userAgentData) || void 0 === e2 ? void 0 : e2.mobile) && void 0 !== t2 ? t2 : /Tablet|iPad|Mobile|Android|BlackBerry/.test(navigator.userAgent));
        }
        function Ma() {
          return "undefined" != typeof document;
        }
        function Oa() {
          return "ReactNative" == navigator.product;
        }
        function Aa(e2) {
          return e2.hostname.endsWith(".livekit.cloud") || e2.hostname.endsWith(".livekit.run");
        }
        function Na(e2) {
          return Aa(e2) ? e2.hostname.split(".")[0] : null;
        }
        function La() {
          if (global && global.LiveKitReactNativeGlobal) return global.LiveKitReactNativeGlobal;
        }
        function xa() {
          if (!Oa()) return;
          let e2 = La();
          return e2 ? e2.platform : void 0;
        }
        function Ua() {
          if (Ma()) return window.devicePixelRatio;
          if (Oa()) {
            let e2 = La();
            if (e2) return e2.devicePixelRatio;
          }
          return 1;
        }
        function Fa(e2, t2) {
          const n2 = e2.split("."), i2 = t2.split("."), r2 = Math.min(n2.length, i2.length);
          for (let e3 = 0; e3 < r2; ++e3) {
            const t3 = parseInt(n2[e3], 10), s2 = parseInt(i2[e3], 10);
            if (t3 > s2) return 1;
            if (t3 < s2) return -1;
            if (e3 === r2 - 1 && t3 === s2) return 0;
          }
          return "" === e2 && "" !== t2 ? -1 : "" === t2 ? 1 : n2.length == i2.length ? 0 : n2.length < i2.length ? -1 : 1;
        }
        function Ba(e2) {
          for (const t2 of e2) t2.target.handleResize(t2);
        }
        function ja(e2) {
          for (const t2 of e2) t2.target.handleVisibilityChanged(t2);
        }
        let qa = null;
        const Va = () => (qa || (qa = new ResizeObserver(Ba)), qa);
        let Ha = null;
        const Wa = () => (Ha || (Ha = new IntersectionObserver(ja, { root: null, rootMargin: "0px" })), Ha);
        let Ka, za;
        function Ja() {
          let e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 16, t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 16, n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], i2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          const r2 = document.createElement("canvas");
          r2.width = e2, r2.height = t2;
          const s2 = r2.getContext("2d");
          null == s2 || s2.fillRect(0, 0, r2.width, r2.height), i2 && s2 && (s2.beginPath(), s2.arc(e2 / 2, t2 / 2, 50, 0, 2 * Math.PI, true), s2.closePath(), s2.fillStyle = "grey", s2.fill());
          const a2 = r2.captureStream(), [o2] = a2.getTracks();
          if (!o2) throw Error("Could not get empty media stream video track");
          return o2.enabled = n2, o2;
        }
        function Ga() {
          if (!za) {
            const e2 = new AudioContext(), t2 = e2.createOscillator(), n2 = e2.createGain();
            n2.gain.setValueAtTime(0, 0);
            const i2 = e2.createMediaStreamDestination();
            if (t2.connect(n2), n2.connect(i2), t2.start(), [za] = i2.stream.getAudioTracks(), !za) throw Error("Could not get empty media stream audio track");
            za.enabled = false;
          }
          return za.clone();
        }
        class Qa {
          get isResolved() {
            return this._isResolved;
          }
          constructor(e2, t2) {
            this._isResolved = false, this.onFinally = t2, this.promise = new Promise(((t3, n2) => Xi(this, void 0, void 0, (function* () {
              this.resolve = t3, this.reject = n2, e2 && (yield e2(t3, n2));
            })))).finally((() => {
              var e3;
              this._isResolved = true, null === (e3 = this.onFinally) || void 0 === e3 || e3.call(this);
            }));
          }
        }
        function Ya(e2) {
          return Ws.includes(e2);
        }
        function Xa(e2) {
          if ("string" == typeof e2 || "number" == typeof e2) return e2;
          if (Array.isArray(e2)) return e2[0];
          if (void 0 !== e2.exact) return Array.isArray(e2.exact) ? e2.exact[0] : e2.exact;
          if (void 0 !== e2.ideal) return Array.isArray(e2.ideal) ? e2.ideal[0] : e2.ideal;
          throw Error("could not unwrap constraint");
        }
        function Za(e2) {
          return e2.startsWith("ws") ? e2.replace(/^(ws)/, "http") : e2;
        }
        function $a(t2) {
          switch (t2.reason) {
            case e.ConnectionErrorReason.LeaveRequest:
              return t2.context;
            case e.ConnectionErrorReason.Cancelled:
              return nt.CLIENT_INITIATED;
            case e.ConnectionErrorReason.NotAllowed:
              return nt.USER_REJECTED;
            case e.ConnectionErrorReason.ServerUnreachable:
              return nt.JOIN_FAILURE;
            default:
              return nt.UNKNOWN_REASON;
          }
        }
        function eo(e2) {
          return void 0 !== e2 ? Number(e2) : void 0;
        }
        function to(e2) {
          return void 0 !== e2 ? BigInt(e2) : void 0;
        }
        function no(e2) {
          return !!e2 && !(e2 instanceof MediaStreamTrack) && e2.isLocal;
        }
        function io(e2) {
          return !!e2 && e2.kind == pa.Kind.Audio;
        }
        function ro(e2) {
          return !!e2 && e2.kind == pa.Kind.Video;
        }
        function so(e2) {
          return no(e2) && ro(e2);
        }
        function ao(e2) {
          return no(e2) && io(e2);
        }
        function oo(e2) {
          return !!e2 && !e2.isLocal;
        }
        function co(e2) {
          return !!e2 && !e2.isLocal;
        }
        function lo(e2) {
          return oo(e2) && ro(e2);
        }
        function uo(e2) {
          return e2.isLocal;
        }
        function ho() {
          return "undefined" != typeof CompressionStream;
        }
        function po(e2, t2) {
          let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const i2 = (function(e3, t3) {
            const n3 = new URL((function(e4) {
              return e4.startsWith("http") ? e4.replace(/^(http)/, "ws") : e4;
            })(e3));
            return t3.forEach(((e4, t4) => {
              n3.searchParams.set(t4, e4);
            })), go(n3, "rtc");
          })(e2, t2);
          return n2 ? i2 : go(i2, "v1");
        }
        function mo(e2) {
          return e2.endsWith("/") ? e2 : "".concat(e2, "/");
        }
        function go(e2, t2) {
          return e2.pathname = "".concat(mo(e2.pathname)).concat(t2), e2;
        }
        function vo(e2) {
          if ("string" == typeof e2) return on.fromJson(JSON.parse(e2), { ignoreUnknownFields: true });
          if (e2 instanceof ArrayBuffer) return on.fromBinary(new Uint8Array(e2));
          throw new Error("could not decode websocket message: ".concat(typeof e2));
        }
        const fo = "AES-GCM", ko = "lk_e2ee", yo = { sharedKey: false, ratchetSalt: "LKFrameEncryptionKey", ratchetWindowSize: 8, failureTolerance: 10, keyringSize: 16, keySize: 128 };
        var bo, To;
        function So() {
          return Co() || Eo();
        }
        function Eo() {
          return void 0 !== window.RTCRtpScriptTransform;
        }
        function Co() {
          return void 0 !== window.RTCRtpSender && void 0 !== window.RTCRtpSender.prototype.createEncodedStreams;
        }
        function wo(e2) {
          return Xi(this, void 0, void 0, (function* () {
            let t2 = new TextEncoder();
            return yield crypto.subtle.importKey("raw", t2.encode(e2), { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"]);
          }));
        }
        function Ro(e2) {
          return Xi(this, void 0, void 0, (function* () {
            return yield crypto.subtle.importKey("raw", e2, "HKDF", false, ["deriveBits", "deriveKey"]);
          }));
        }
        function Po(e2, t2) {
          const n2 = new TextEncoder().encode(t2);
          switch (e2) {
            case "HKDF":
              return { name: "HKDF", salt: n2, hash: "SHA-256", info: new ArrayBuffer(128) };
            case "PBKDF2":
              return { name: "PBKDF2", salt: n2, hash: "SHA-256", iterations: 1e5 };
            default:
              throw new Error("algorithm ".concat(e2, " is currently unsupported"));
          }
        }
        e.KeyProviderEvent = void 0, (bo = e.KeyProviderEvent || (e.KeyProviderEvent = {})).SetKey = "setKey", bo.RatchetRequest = "ratchetRequest", bo.KeyRatcheted = "keyRatcheted", e.KeyHandlerEvent = void 0, (e.KeyHandlerEvent || (e.KeyHandlerEvent = {})).KeyRatcheted = "keyRatcheted", e.EncryptionEvent = void 0, (To = e.EncryptionEvent || (e.EncryptionEvent = {})).ParticipantEncryptionStatusChanged = "participantEncryptionStatusChanged", To.EncryptionError = "encryptionError", e.CryptorEvent = void 0, (e.CryptorEvent || (e.CryptorEvent = {})).Error = "cryptorError";
        function Io(e2) {
          var t2, n2, i2, r2, s2;
          if ("sipDtmf" !== (null === (t2 = e2.value) || void 0 === t2 ? void 0 : t2.case) && "metrics" !== (null === (n2 = e2.value) || void 0 === n2 ? void 0 : n2.case) && "speaker" !== (null === (i2 = e2.value) || void 0 === i2 ? void 0 : i2.case) && "transcription" !== (null === (r2 = e2.value) || void 0 === r2 ? void 0 : r2.case) && "encryptedPacket" !== (null === (s2 = e2.value) || void 0 === s2 ? void 0 : s2.case)) return new Ct({ value: e2.value });
        }
        class Do extends rr.EventEmitter {
          constructor() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            super(), this.latestManuallySetKeyIndex = 0, this.onKeyRatcheted = (e2, t3, n2) => {
              Hi.debug("key ratcheted event received", { ratchetResult: e2, participantId: t3, keyIndex: n2 });
            }, this.keyInfoMap = /* @__PURE__ */ new Map(), this.options = Object.assign(Object.assign({}, yo), t2), this.on(e.KeyProviderEvent.KeyRatcheted, this.onKeyRatcheted);
          }
          onSetEncryptionKey(t2, n2, i2) {
            const r2 = { key: t2, participantIdentity: n2, keyIndex: i2 };
            if (!this.options.sharedKey && !n2) throw new Error("participant identity needs to be passed for encryption key if sharedKey option is false");
            this.keyInfoMap.set("".concat(null != n2 ? n2 : "shared", "-").concat(null != i2 ? i2 : 0), r2), void 0 !== i2 && (this.latestManuallySetKeyIndex = i2), this.emit(e.KeyProviderEvent.SetKey, r2, void 0 !== i2);
          }
          getKeys() {
            return Array.from(this.keyInfoMap.values());
          }
          getLatestManuallySetKeyIndex() {
            return this.latestManuallySetKeyIndex;
          }
          getOptions() {
            return this.options;
          }
          ratchetKey(t2, n2) {
            this.emit(e.KeyProviderEvent.RatchetRequest, t2, n2);
          }
        }
        var _o;
        e.CryptorErrorReason = void 0, (_o = e.CryptorErrorReason || (e.CryptorErrorReason = {}))[_o.InvalidKey = 0] = "InvalidKey", _o[_o.MissingKey = 1] = "MissingKey", _o[_o.InternalError = 2] = "InternalError";
        class Mo extends rr.EventEmitter {
          constructor(t2, n2) {
            super(), this.decryptDataRequests = /* @__PURE__ */ new Map(), this.encryptDataRequests = /* @__PURE__ */ new Map(), this.onWorkerMessage = (t3) => {
              var n3, i2;
              const { kind: r2, data: s2 } = t3.data;
              switch (r2) {
                case "error":
                  if (Hi.error(s2.error.message), s2.uuid) {
                    const e2 = this.decryptDataRequests.get(s2.uuid);
                    if (null == e2 ? void 0 : e2.reject) {
                      e2.reject(s2.error);
                      break;
                    }
                    const t5 = this.encryptDataRequests.get(s2.uuid);
                    if (null == t5 ? void 0 : t5.reject) {
                      t5.reject(s2.error);
                      break;
                    }
                  }
                  this.emit(e.EncryptionEvent.EncryptionError, s2.error, s2.participantIdentity);
                  break;
                case "initAck":
                  s2.enabled && this.keyProvider.getKeys().forEach(((e2) => {
                    this.postKey(e2, false);
                  }));
                  break;
                case "enable":
                  if (s2.enabled && this.keyProvider.getKeys().forEach(((e2) => {
                    this.postKey(e2, false);
                  })), this.encryptionEnabled !== s2.enabled && s2.participantIdentity === (null === (n3 = this.room) || void 0 === n3 ? void 0 : n3.localParticipant.identity)) this.emit(e.EncryptionEvent.ParticipantEncryptionStatusChanged, s2.enabled, this.room.localParticipant), this.encryptionEnabled = s2.enabled;
                  else if (s2.participantIdentity) {
                    const t5 = null === (i2 = this.room) || void 0 === i2 ? void 0 : i2.getParticipantByIdentity(s2.participantIdentity);
                    if (!t5) throw TypeError("couldn't set encryption status, participant not found".concat(s2.participantIdentity));
                    this.emit(e.EncryptionEvent.ParticipantEncryptionStatusChanged, s2.enabled, t5);
                  }
                  break;
                case "ratchetKey":
                  this.keyProvider.emit(e.KeyProviderEvent.KeyRatcheted, s2.ratchetResult, s2.participantIdentity, s2.keyIndex);
                  break;
                case "decryptDataResponse":
                  const t4 = this.decryptDataRequests.get(s2.uuid);
                  (null == t4 ? void 0 : t4.resolve) && t4.resolve(s2);
                  break;
                case "encryptDataResponse":
                  const r3 = this.encryptDataRequests.get(s2.uuid);
                  (null == r3 ? void 0 : r3.resolve) && r3.resolve(s2);
              }
            }, this.onWorkerError = (t3) => {
              Hi.error("e2ee worker encountered an error:", { error: t3.error }), this.emit(e.EncryptionEvent.EncryptionError, t3.error, void 0);
            }, this.keyProvider = t2.keyProvider, this.worker = t2.worker, this.encryptionEnabled = false, this.dataChannelEncryptionEnabled = n2;
          }
          get isEnabled() {
            return this.encryptionEnabled;
          }
          get isDataChannelEncryptionEnabled() {
            return this.isEnabled && this.dataChannelEncryptionEnabled;
          }
          setup(e2) {
            if (!So()) throw new Ms("tried to setup end-to-end encryption on an unsupported browser");
            if (Hi.info("setting up e2ee"), e2 !== this.room) {
              this.room = e2, this.setupEventListeners(e2, this.keyProvider);
              const t2 = { kind: "init", data: { keyProviderOptions: this.keyProvider.getOptions(), loglevel: zi.getLevel() } };
              this.worker && (Hi.info("initializing worker", { worker: this.worker }), this.worker.onmessage = this.onWorkerMessage, this.worker.onerror = this.onWorkerError, this.worker.postMessage(t2));
            }
          }
          setParticipantCryptorEnabled(e2, t2) {
            Hi.debug("set e2ee to ".concat(e2, " for participant ").concat(t2)), this.postEnable(e2, t2);
          }
          setSifTrailer(e2) {
            e2 && 0 !== e2.length ? this.postSifTrailer(e2) : Hi.warn("ignoring server sent trailer as it's empty");
          }
          setupEngine(t2) {
            t2.on(e.EngineEvent.RTPVideoMapUpdate, ((e2) => {
              this.postRTPMap(e2);
            }));
          }
          setupEventListeners(t2, n2) {
            t2.on(e.RoomEvent.TrackPublished, ((e2, t3) => this.setParticipantCryptorEnabled(e2.trackInfo.encryption !== mt.NONE, t3.identity))), t2.on(e.RoomEvent.ConnectionStateChanged, ((n3) => {
              n3 === e.ConnectionState.Connected && t2.remoteParticipants.forEach(((e2) => {
                e2.trackPublications.forEach(((t3) => {
                  this.setParticipantCryptorEnabled(t3.trackInfo.encryption !== mt.NONE, e2.identity);
                }));
              }));
            })).on(e.RoomEvent.TrackUnsubscribed, ((e2, t3, n3) => {
              var i2;
              const r2 = { kind: "removeTransform", data: { participantIdentity: n3.identity, trackId: e2.mediaStreamID } };
              null === (i2 = this.worker) || void 0 === i2 || i2.postMessage(r2);
            })).on(e.RoomEvent.TrackSubscribed, ((e2, t3, n3) => {
              this.setupE2EEReceiver(e2, n3.identity, t3.trackInfo);
            })).on(e.RoomEvent.SignalConnected, (() => {
              if (!this.room) throw new TypeError("expected room to be present on signal connect");
              const e2 = n2.getLatestManuallySetKeyIndex();
              n2.getKeys().forEach(((t3) => {
                var n3;
                this.postKey(t3, e2 === (null !== (n3 = t3.keyIndex) && void 0 !== n3 ? n3 : 0));
              })), this.setParticipantCryptorEnabled(this.room.localParticipant.isE2EEEnabled, this.room.localParticipant.identity);
            })), t2.localParticipant.on(e.ParticipantEvent.LocalSenderCreated, ((e2, t3) => Xi(this, void 0, void 0, (function* () {
              this.setupE2EESender(t3, e2);
            })))), t2.localParticipant.on(e.ParticipantEvent.LocalTrackPublished, ((e2) => {
              if (!ro(e2.track) || !Ia()) return;
              const t3 = { kind: "updateCodec", data: { trackId: e2.track.mediaStreamID, codec: aa(e2.trackInfo.codecs[0].mimeType), participantIdentity: this.room.localParticipant.identity } };
              this.worker.postMessage(t3);
            })), n2.on(e.KeyProviderEvent.SetKey, ((e2, t3) => this.postKey(e2, null == t3 || t3))).on(e.KeyProviderEvent.RatchetRequest, ((e2, t3) => this.postRatchetRequest(e2, t3)));
          }
          encryptData(e2) {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.worker) throw Error("could not encrypt data, worker is missing");
              const t2 = crypto.randomUUID(), n2 = { kind: "encryptDataRequest", data: { uuid: t2, payload: e2, participantIdentity: this.room.localParticipant.identity } }, i2 = new Qa();
              return i2.onFinally = () => {
                this.encryptDataRequests.delete(t2);
              }, this.encryptDataRequests.set(t2, i2), this.worker.postMessage(n2), i2.promise;
            }));
          }
          handleEncryptedData(e2, t2, n2, i2) {
            if (!this.worker) throw Error("could not handle encrypted data, worker is missing");
            const r2 = crypto.randomUUID(), s2 = { kind: "decryptDataRequest", data: { uuid: r2, payload: e2, iv: t2, participantIdentity: n2, keyIndex: i2 } }, a2 = new Qa();
            return a2.onFinally = () => {
              this.decryptDataRequests.delete(r2);
            }, this.decryptDataRequests.set(r2, a2), this.worker.postMessage(s2), a2.promise;
          }
          postRatchetRequest(e2, t2) {
            if (!this.worker) throw Error("could not ratchet key, worker is missing");
            const n2 = { kind: "ratchetRequest", data: { participantIdentity: e2, keyIndex: t2 } };
            this.worker.postMessage(n2);
          }
          postKey(e2, t2) {
            let { key: n2, participantIdentity: i2, keyIndex: r2 } = e2;
            var s2;
            if (!this.worker) throw Error("could not set key, worker is missing");
            const a2 = { kind: "setKey", data: { participantIdentity: i2, isPublisher: i2 === (null === (s2 = this.room) || void 0 === s2 ? void 0 : s2.localParticipant.identity), key: n2, keyIndex: r2, updateCurrentKeyIndex: t2 } };
            this.worker.postMessage(a2);
          }
          postEnable(e2, t2) {
            if (!this.worker) throw new ReferenceError("failed to enable e2ee, worker is not ready");
            {
              const n2 = { kind: "enable", data: { enabled: e2, participantIdentity: t2 } };
              this.worker.postMessage(n2);
            }
          }
          postRTPMap(e2) {
            var t2;
            if (!this.worker) throw TypeError("could not post rtp map, worker is missing");
            if (!(null === (t2 = this.room) || void 0 === t2 ? void 0 : t2.localParticipant.identity)) throw TypeError("could not post rtp map, local participant identity is missing");
            const n2 = { kind: "setRTPMap", data: { map: e2, participantIdentity: this.room.localParticipant.identity } };
            this.worker.postMessage(n2);
          }
          postSifTrailer(e2) {
            if (!this.worker) throw Error("could not post SIF trailer, worker is missing");
            const t2 = { kind: "setSifTrailer", data: { trailer: e2 } };
            this.worker.postMessage(t2);
          }
          setupE2EEReceiver(e2, t2, n2) {
            if (e2.receiver) {
              if (!(null == n2 ? void 0 : n2.mimeType) || "" === n2.mimeType) throw new TypeError("MimeType missing from trackInfo, cannot set up E2EE cryptor");
              this.handleReceiver(e2.receiver, e2.mediaStreamID, t2, "video" === e2.kind ? aa(n2.mimeType) : void 0);
            }
          }
          setupE2EESender(e2, t2) {
            no(e2) && t2 ? this.handleSender(t2, e2.mediaStreamID, void 0) : t2 || Hi.warn("early return because sender is not ready");
          }
          handleReceiver(e2, t2, n2, i2) {
            return Xi(this, void 0, void 0, (function* () {
              if (this.worker) {
                if (Eo() && !Ra()) {
                  const r2 = { kind: "decode", participantIdentity: n2, trackId: t2, codec: i2 };
                  e2.transform = new RTCRtpScriptTransform(this.worker, r2);
                } else {
                  if (ko in e2 && i2) {
                    const e3 = { kind: "updateCodec", data: { trackId: t2, codec: i2, participantIdentity: n2 } };
                    return void this.worker.postMessage(e3);
                  }
                  let r2 = e2.writableStream, s2 = e2.readableStream;
                  if (!r2 || !s2) {
                    const t3 = e2.createEncodedStreams();
                    e2.writableStream = t3.writable, r2 = t3.writable, e2.readableStream = t3.readable, s2 = t3.readable;
                  }
                  const a2 = { kind: "decode", data: { readableStream: s2, writableStream: r2, trackId: t2, codec: i2, participantIdentity: n2, isReuse: ko in e2 } };
                  this.worker.postMessage(a2, [s2, r2]);
                }
                e2[ko] = true;
              }
            }));
          }
          handleSender(e2, t2, n2) {
            var i2;
            if (!(ko in e2) && this.worker) {
              if (!(null === (i2 = this.room) || void 0 === i2 ? void 0 : i2.localParticipant.identity) || "" === this.room.localParticipant.identity) throw TypeError("local identity needs to be known in order to set up encrypted sender");
              if (Eo() && !Ra()) {
                Hi.info("initialize script transform");
                const i3 = { kind: "encode", participantIdentity: this.room.localParticipant.identity, trackId: t2, codec: n2 };
                e2.transform = new RTCRtpScriptTransform(this.worker, i3);
              } else {
                Hi.info("initialize encoded streams");
                const i3 = e2.createEncodedStreams(), r2 = { kind: "encode", data: { readableStream: i3.readable, writableStream: i3.writable, codec: n2, trackId: t2, participantIdentity: this.room.localParticipant.identity, isReuse: false } };
                this.worker.postMessage(r2, [i3.readable, i3.writable]);
              }
              e2[ko] = true;
            }
          }
        }
        class Oo {
          constructor() {
            this.failedConnectionAttempts = /* @__PURE__ */ new Map(), this.backOffPromises = /* @__PURE__ */ new Map();
          }
          static getInstance() {
            return this._instance || (this._instance = new Oo()), this._instance;
          }
          addFailedConnectionAttempt(e2) {
            var t2;
            const n2 = Na(new URL(e2));
            if (!n2) return;
            let i2 = null !== (t2 = this.failedConnectionAttempts.get(n2)) && void 0 !== t2 ? t2 : 0;
            this.failedConnectionAttempts.set(n2, i2 + 1), this.backOffPromises.set(n2, fa(Math.min(500 * Math.pow(2, i2), 15e3)));
          }
          getBackOffPromise(e2) {
            const t2 = new URL(e2), n2 = t2 && Na(t2);
            return n2 && this.backOffPromises.get(n2) || Promise.resolve();
          }
          resetFailedConnectionAttempts(e2) {
            const t2 = new URL(e2), n2 = t2 && Na(t2);
            n2 && (this.failedConnectionAttempts.set(n2, 0), this.backOffPromises.set(n2, Promise.resolve()));
          }
          resetAll() {
            this.backOffPromises.clear(), this.failedConnectionAttempts.clear();
          }
        }
        Oo._instance = null;
        const Ao = "default";
        class No {
          constructor() {
            this._previousDevices = [];
          }
          static getInstance() {
            return void 0 === this.instance && (this.instance = new No()), this.instance;
          }
          get previousDevices() {
            return this._previousDevices;
          }
          getDevices(e2) {
            return Xi(this, arguments, void 0, (function(e3) {
              var t2 = this;
              let n2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
              return (function* () {
                var i2;
                if ((null === (i2 = No.userMediaPromiseMap) || void 0 === i2 ? void 0 : i2.size) > 0) {
                  Hi.debug("awaiting getUserMedia promise");
                  try {
                    e3 ? yield No.userMediaPromiseMap.get(e3) : yield Promise.all(No.userMediaPromiseMap.values());
                  } catch (e4) {
                    Hi.warn("error waiting for media permissons");
                  }
                }
                let r2 = yield navigator.mediaDevices.enumerateDevices();
                if (n2 && (!Pa() || !t2.hasDeviceInUse(e3))) {
                  if (0 === r2.filter(((t3) => t3.kind === e3)).length || r2.some(((t3) => {
                    const n3 = "" === t3.label, i3 = !e3 || t3.kind === e3;
                    return n3 && i3;
                  }))) {
                    const t3 = { video: "audioinput" !== e3 && "audiooutput" !== e3, audio: "videoinput" !== e3 && { deviceId: { ideal: "default" } } }, n3 = yield navigator.mediaDevices.getUserMedia(t3);
                    r2 = yield navigator.mediaDevices.enumerateDevices(), n3.getTracks().forEach(((e4) => {
                      e4.stop();
                    }));
                  }
                }
                return t2._previousDevices = r2, e3 && (r2 = r2.filter(((t3) => t3.kind === e3))), r2;
              })();
            }));
          }
          normalizeDeviceId(e2, t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              if (t2 !== Ao) return t2;
              const i2 = yield this.getDevices(e2), r2 = i2.find(((e3) => e3.deviceId === Ao));
              if (!r2) return void Hi.warn("could not reliably determine default device");
              const s2 = i2.find(((e3) => e3.deviceId !== Ao && e3.groupId === (null != n2 ? n2 : r2.groupId)));
              if (s2) return null == s2 ? void 0 : s2.deviceId;
              Hi.warn("could not reliably determine default device");
            }));
          }
          hasDeviceInUse(e2) {
            return e2 ? No.userMediaPromiseMap.has(e2) : No.userMediaPromiseMap.size > 0;
          }
        }
        No.mediaDeviceKinds = ["audioinput", "audiooutput", "videoinput"], No.userMediaPromiseMap = /* @__PURE__ */ new Map();
        const Lo = 65535, xo = 4294967295;
        class Uo {
          static u16(e2) {
            return new Uo(e2, Lo);
          }
          static u32(e2) {
            return new Uo(e2, xo);
          }
          constructor(e2, t2) {
            if (this.value = e2, e2 < 0) throw new Error("WrapAroundUnsignedInt: cannot faithfully represent an integer smaller than 0");
            if (t2 > Number.MAX_SAFE_INTEGER) throw new Error("WrapAroundUnsignedInt: cannot faithfully represent an integer bigger than MAX_SAFE_INTEGER.");
            this.maxSize = t2, this.clamp();
          }
          clamp() {
            for (; this.value > this.maxSize; ) this.value -= this.maxSize + 1;
            for (; this.value < 0; ) this.value += this.maxSize + 1;
          }
          clone() {
            return new Uo(this.value, this.maxSize);
          }
          update(e2) {
            this.value = e2(this.value), this.clamp();
          }
          increment() {
            let e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.update(((t2) => t2 + e2));
          }
          decrement() {
            let e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.update(((t2) => t2 - e2));
          }
          getThenIncrement() {
            const e2 = this.value;
            return this.increment(), new Uo(e2, this.maxSize);
          }
          isBefore(e2) {
            const t2 = this.value >>> 0, n2 = (e2.value >>> 0) - t2 >>> 0;
            return 0 !== n2 && n2 < this.maxSize + 1;
          }
        }
        class Fo {
          static fromRtpTicks(e2) {
            return new Fo(e2, 9e4);
          }
          static rtpRandom() {
            const e2 = Math.round(Math.random() * xo);
            return Fo.fromRtpTicks(e2);
          }
          constructor(e2, t2) {
            this.timestamp = Uo.u32(e2), this.rateInHz = t2;
          }
          asTicks() {
            return this.timestamp.value;
          }
          clone() {
            return new Fo(this.timestamp.value, this.rateInHz);
          }
          wrappingAdd(e2) {
            this.timestamp.increment(e2);
          }
          isBefore(e2) {
            return this.timestamp.isBefore(e2.timestamp);
          }
        }
        class Bo {
          constructor(e2, t2, n2) {
            this.epoch = t2, this.base = n2, this.previous = n2.clone(), this.rateInHz = e2;
          }
          static startingNow(e2, t2) {
            return new Bo(t2, /* @__PURE__ */ new Date(), e2);
          }
          static startingAtTime(e2, t2, n2) {
            return new Bo(n2, e2, t2);
          }
          static rtpStartingNow(e2) {
            return Bo.startingNow(e2, 9e4);
          }
          static rtpStartingAtTime(e2, t2) {
            return Bo.startingAtTime(e2, t2, 9e4);
          }
          now() {
            return this.at(/* @__PURE__ */ new Date());
          }
          at(e2) {
            let t2 = e2.getTime() - this.epoch.getTime(), n2 = Bo.durationInMsToTicks(t2, this.rateInHz), i2 = this.base.clone();
            return i2.wrappingAdd(n2), i2.isBefore(this.previous) && (i2 = this.previous), this.previous = i2.clone(), i2.clone();
          }
          static durationInMsToTicks(e2, t2) {
            let n2 = (1e6 * e2 * t2 + 5e8) / 1e9;
            return Math.round(n2);
          }
        }
        function jo(e2) {
          if (e2 instanceof DataView) return e2;
          if (e2 instanceof ArrayBuffer) return new DataView(e2);
          if (e2 instanceof Uint8Array) return new DataView(e2.buffer, e2.byteOffset, e2.byteLength);
          throw new Error("Error coercing ".concat(e2, " to DataView - input was not DataView, ArrayBuffer, or Uint8Array."));
        }
        var qo;
        !(function(e2) {
          e2[e2.Reserved = 0] = "Reserved", e2[e2.TooLarge = 1] = "TooLarge";
        })(qo || (qo = {}));
        class Vo extends Ss {
          constructor(e2, t2) {
            super(19, e2), this.name = "DataTrackHandleError", this.reason = t2, this.reasonName = qo[t2];
          }
          isReason(e2) {
            return this.reason === e2;
          }
          static tooLarge() {
            return new Vo("Value too large to be a valid track handle", qo.TooLarge);
          }
          static reserved(e2) {
            return new Vo("0x".concat(e2.toString(16), " is a reserved value."), qo.Reserved);
          }
        }
        const Ho = { fromNumber(e2) {
          if (0 === e2) throw Vo.reserved(e2);
          if (e2 > Lo) throw Vo.tooLarge();
          return e2;
        } };
        class Wo {
          constructor() {
            this.value = 0;
          }
          get() {
            return this.value += 1, this.value > Lo ? null : this.value;
          }
          reset() {
            this.value = 0;
          }
        }
        const Ko = { from: (e2) => ({ sid: e2.sid, pubHandle: e2.pubHandle, name: e2.name, usesE2ee: e2.encryption !== mt.NONE }), toProtobuf: (e2) => new ft({ sid: e2.sid, pubHandle: e2.pubHandle, name: e2.name, encryption: e2.usesE2ee ? mt.GCM : mt.NONE }) };
        var zo;
        !(function(e2) {
          e2[e2.WAITING = 0] = "WAITING", e2[e2.RUNNING = 1] = "RUNNING", e2[e2.COMPLETED = 2] = "COMPLETED";
        })(zo || (zo = {}));
        class Jo {
          constructor() {
            this.pendingTasks = /* @__PURE__ */ new Map(), this.taskMutex = new r(), this.nextTaskIndex = 0;
          }
          run(e2) {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = { id: this.nextTaskIndex++, enqueuedAt: Date.now(), status: zo.WAITING };
              this.pendingTasks.set(t2.id, t2);
              const n2 = yield this.taskMutex.lock();
              try {
                return t2.executedAt = Date.now(), t2.status = zo.RUNNING, yield e2();
              } finally {
                t2.status = zo.COMPLETED, this.pendingTasks.delete(t2.id), n2();
              }
            }));
          }
          flush() {
            return Xi(this, void 0, void 0, (function* () {
              return this.run((() => Xi(this, void 0, void 0, (function* () {
              }))));
            }));
          }
          snapshot() {
            return Array.from(this.pendingTasks.values());
          }
        }
        class Go {
          get readyState() {
            return this.ws.readyState;
          }
          constructor(e2) {
            let t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            var n2, i2;
            if (null === (n2 = t2.signal) || void 0 === n2 ? void 0 : n2.aborted) throw new DOMException("This operation was aborted", "AbortError");
            this.url = e2;
            const r2 = new WebSocket(e2, null !== (i2 = t2.protocols) && void 0 !== i2 ? i2 : []);
            r2.binaryType = "arraybuffer", this.ws = r2;
            const s2 = function() {
              let { closeCode: e3, reason: t3 } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              return r2.close(e3, t3);
            };
            this.opened = new ps(((e3, t3) => {
              const n3 = () => {
                t3(_s.websocket("Encountered websocket error during connection establishment"));
              };
              r2.onopen = () => {
                e3({ readable: new ReadableStream({ start(e4) {
                  r2.onmessage = (t4) => {
                    let { data: n4 } = t4;
                    return e4.enqueue(n4);
                  }, r2.onerror = (t4) => e4.error(t4);
                }, cancel: s2 }), writable: new WritableStream({ write(e4) {
                  r2.send(e4);
                }, abort() {
                  r2.close();
                }, close: s2 }), protocol: r2.protocol, extensions: r2.extensions }), r2.removeEventListener("error", n3);
              }, r2.addEventListener("error", n3);
            })), this.closed = new ps(((e3, t3) => {
              const n3 = () => Xi(this, void 0, void 0, (function* () {
                const n4 = new ps(((e4) => {
                  r2.readyState !== WebSocket.CLOSED && r2.addEventListener("close", ((t4) => {
                    e4(t4);
                  }), { once: true });
                })), i3 = yield ps.race([fa(250), n4]);
                i3 ? e3(i3) : t3(_s.websocket("Encountered unspecified websocket error without a timely close event"));
              }));
              r2.onclose = (t4) => {
                let { code: i3, reason: s3 } = t4;
                e3({ closeCode: i3, reason: s3 }), r2.removeEventListener("error", n3);
              }, r2.addEventListener("error", n3);
            })), t2.signal && (t2.signal.onabort = () => r2.close()), this.close = s2;
          }
        }
        const Qo = ["syncState", "trickle", "offer", "answer", "simulate", "leave"];
        var Yo;
        !(function(e2) {
          e2[e2.CONNECTING = 0] = "CONNECTING", e2[e2.CONNECTED = 1] = "CONNECTED", e2[e2.RECONNECTING = 2] = "RECONNECTING", e2[e2.DISCONNECTING = 3] = "DISCONNECTING", e2[e2.DISCONNECTED = 4] = "DISCONNECTED";
        })(Yo || (Yo = {}));
        class Xo {
          get currentState() {
            return this.state;
          }
          get isDisconnected() {
            return this.state === Yo.DISCONNECTING || this.state === Yo.DISCONNECTED;
          }
          get isEstablishingConnection() {
            return this.state === Yo.CONNECTING || this.state === Yo.RECONNECTING;
          }
          getNextRequestId() {
            return this._requestId += 1, this._requestId;
          }
          constructor() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            var i2;
            this.rtt = 0, this.state = Yo.DISCONNECTED, this.log = Hi, this._requestId = 0, this.useV0SignalPath = false, this.resetCallbacks = () => {
              this.onAnswer = void 0, this.onLeave = void 0, this.onLocalTrackPublished = void 0, this.onLocalTrackUnpublished = void 0, this.onNegotiateRequested = void 0, this.onOffer = void 0, this.onRemoteMuteChanged = void 0, this.onSubscribedQualityUpdate = void 0, this.onTokenRefresh = void 0, this.onTrickle = void 0, this.onClose = void 0, this.onMediaSectionsRequirement = void 0;
            }, this.loggerContextCb = n2.loggerContextCb, this.log = Ki(null !== (i2 = n2.loggerName) && void 0 !== i2 ? i2 : e.LoggerNames.Signal, (() => this.logContext)), this.useJSON = t2, this.requestQueue = new Jo(), this.queuedRequests = [], this.closingLock = new r(), this.connectionLock = new r(), this.state = Yo.DISCONNECTED;
          }
          get logContext() {
            var e2, t2;
            return null !== (t2 = null === (e2 = this.loggerContextCb) || void 0 === e2 ? void 0 : e2.call(this)) && void 0 !== t2 ? t2 : {};
          }
          join(e2, t2, n2, i2) {
            return Xi(this, arguments, void 0, (function(e3, t3, n3, i3) {
              var r2 = this;
              let s2 = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a2 = arguments.length > 5 ? arguments[5] : void 0;
              return (function* () {
                r2.state = Yo.CONNECTING, r2.options = n3;
                return yield r2.connect(e3, t3, n3, i3, s2, a2);
              })();
            }));
          }
          reconnect(e2, t2, n2, i2) {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.options) return void this.log.warn("attempted to reconnect without signal options being set, ignoring");
              this.state = Yo.RECONNECTING, this.clearPingInterval();
              return yield this.connect(e2, t2, Object.assign(Object.assign({}, this.options), { reconnect: true, sid: n2, reconnectReason: i2 }), void 0, this.useV0SignalPath);
            }));
          }
          connect(e2, t2, n2, i2) {
            return Xi(this, arguments, void 0, (function(e3, t3, n3, i3) {
              var r2 = this;
              let s2 = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a2 = arguments.length > 5 ? arguments[5] : void 0;
              return (function* () {
                const o2 = yield r2.connectionLock.lock();
                r2.connectOptions = n3, r2.useV0SignalPath = s2;
                const c2 = (function() {
                  var e4;
                  const t4 = new Bt({ sdk: jt.JS, protocol: 16, version: bs });
                  return Oa() && (t4.os = null !== (e4 = xa()) && void 0 !== e4 ? e4 : ""), t4;
                })(), d2 = s2 ? (function(e4, t4, n4) {
                  var i4;
                  const r3 = new URLSearchParams();
                  r3.set("access_token", e4), n4.reconnect && (r3.set("reconnect", "1"), n4.sid && r3.set("sid", n4.sid));
                  r3.set("auto_subscribe", n4.autoSubscribe ? "1" : "0"), r3.set("sdk", Oa() ? "reactnative" : "js"), r3.set("version", t4.version), r3.set("protocol", t4.protocol.toString()), t4.deviceModel && r3.set("device_model", t4.deviceModel);
                  t4.os && r3.set("os", t4.os);
                  t4.osVersion && r3.set("os_version", t4.osVersion);
                  t4.browser && r3.set("browser", t4.browser);
                  t4.browserVersion && r3.set("browser_version", t4.browserVersion);
                  n4.adaptiveStream && r3.set("adaptive_stream", "1");
                  n4.reconnectReason && r3.set("reconnect_reason", n4.reconnectReason.toString());
                  (null === (i4 = navigator.connection) || void 0 === i4 ? void 0 : i4.type) && r3.set("network", navigator.connection.type);
                  return r3;
                })(t3, c2, n3) : yield (function(e4, t4, n4, i4) {
                  return Xi(this, void 0, void 0, (function* () {
                    const r3 = new URLSearchParams();
                    r3.set("access_token", e4);
                    const s3 = new ci({ clientInfo: t4, connectionSettings: new oi({ autoSubscribe: !!n4.autoSubscribe, adaptiveStream: !!n4.adaptiveStream }), reconnect: !!n4.reconnect, participantSid: n4.sid ? n4.sid : void 0, publisherOffer: i4 });
                    n4.reconnectReason && (s3.reconnectReason = n4.reconnectReason);
                    const a3 = s3.toBinary();
                    let o3, c3;
                    if (ho()) {
                      const e5 = new CompressionStream("gzip"), t5 = e5.writable.getWriter();
                      t5.write(new Uint8Array(a3)), t5.close();
                      const n5 = [], i5 = e5.readable.getReader();
                      for (; ; ) {
                        const { done: e6, value: t6 } = yield i5.read();
                        if (e6) break;
                        n5.push(t6);
                      }
                      const r4 = n5.reduce(((e6, t6) => e6 + t6.length), 0), s4 = new Uint8Array(r4);
                      let d4 = 0;
                      for (const e6 of n5) s4.set(e6, d4), d4 += e6.length;
                      o3 = s4, c3 = li.GZIP;
                    } else o3 = a3, c3 = li.NONE;
                    const d3 = new di({ joinRequest: o3, compression: c3 }).toBinary(), l3 = (e5) => {
                      const t5 = Array.from(e5, ((e6) => String.fromCodePoint(e6))).join("");
                      return btoa(t5);
                    };
                    return r3.set("join_request", l3(d3).replace(/\+/g, "-").replace(/\//g, "_")), r3;
                  }));
                })(t3, c2, n3, a2), l2 = po(e3, d2, s2).toString(), u2 = (h2 = l2, go(new URL(Za(h2)), "validate")).toString();
                var h2;
                return new Promise(((e4, t4) => Xi(r2, void 0, void 0, (function* () {
                  var r3, s3;
                  try {
                    let a3 = false;
                    const o3 = (e5) => Xi(this, void 0, void 0, (function* () {
                      if (a3) return;
                      a3 = true;
                      const n4 = (function(e6) {
                        let t5 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "Unknown reason";
                        if (!(e6 instanceof AbortSignal)) return t5;
                        const n5 = e6.reason;
                        switch (typeof n5) {
                          case "string":
                            return n5;
                          case "object":
                            return n5 instanceof Error ? n5.message : t5;
                          default:
                            return "toString" in n5 ? n5.toString() : t5;
                        }
                      })(e5 instanceof Event ? e5.currentTarget : e5, "Abort handler called");
                      this.streamWriter && !this.isDisconnected ? this.sendLeave().then((() => this.close(n4))).catch(((e6) => {
                        this.log.error(e6), this.close();
                      })) : this.close(), c3(), t4(_s.cancelled(n4));
                    }));
                    null == i3 || i3.addEventListener("abort", o3);
                    const c3 = () => {
                      clearTimeout(d3), null == i3 || i3.removeEventListener("abort", o3);
                    }, d3 = setTimeout((() => {
                      o3(_s.timeout("room connection has timed out (signal)"));
                    }), n3.websocketTimeout), h3 = (e5, t5) => {
                      this.handleSignalConnected(e5, d3, t5);
                    }, p2 = new URL(l2);
                    p2.searchParams.has("access_token") && p2.searchParams.set("access_token", "<redacted>"), this.log.info("signal connecting to ".concat(p2), { reconnect: n3.reconnect, reconnectReason: n3.reconnectReason }), this.ws && (yield this.close(false)), this.ws = new Go(l2);
                    try {
                      this.ws.closed.then(((e5) => {
                        var n4;
                        this.isEstablishingConnection && t4(_s.internal("Websocket got closed during a (re)connection attempt: ".concat(e5.reason))), 1e3 !== e5.closeCode && (this.log.warn("websocket closed", { reason: e5.reason, code: e5.closeCode, wasClean: 1e3 === e5.closeCode, state: this.state }), this.state === Yo.CONNECTED && this.handleOnClose(null !== (n4 = e5.reason) && void 0 !== n4 ? n4 : "Unexpected WS error"));
                      })).catch(((e5) => {
                        this.isEstablishingConnection && t4(_s.internal("Websocket error during a (re)connection attempt: ".concat(e5)));
                      }));
                      const i4 = yield this.ws.opened.catch(((e5) => Xi(this, void 0, void 0, (function* () {
                        if (this.state === Yo.CONNECTED) this.handleWSError(e5), t4(e5);
                        else {
                          this.state = Yo.DISCONNECTED, clearTimeout(d3);
                          const n4 = yield this.handleConnectionError(e5, u2);
                          t4(n4);
                        }
                      }))));
                      if (clearTimeout(d3), !i4) return;
                      const a4 = i4.readable.getReader();
                      this.streamWriter = i4.writable.getWriter();
                      const o4 = yield a4.read();
                      if (a4.releaseLock(), !o4.value) throw _s.internal("no message received as first message");
                      const c4 = vo(o4.value), l3 = this.validateFirstMessage(c4, null !== (r3 = n3.reconnect) && void 0 !== r3 && r3);
                      if (!l3.isValid) return void t4(l3.error);
                      "join" === (null === (s3 = c4.message) || void 0 === s3 ? void 0 : s3.case) && (this.pingTimeoutDuration = c4.message.value.pingTimeout, this.pingIntervalDuration = c4.message.value.pingInterval, this.pingTimeoutDuration && this.pingTimeoutDuration > 0 && this.log.debug("ping config", { timeout: this.pingTimeoutDuration, interval: this.pingIntervalDuration }), this.onJoined && this.onJoined(c4.message.value));
                      h3(i4, l3.shouldProcessFirstMessage ? c4 : void 0), e4(l3.response);
                    } catch (e5) {
                      t4(e5);
                    } finally {
                      c3();
                    }
                  } finally {
                    o2();
                  }
                }))));
              })();
            }));
          }
          startReadingLoop(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              for (t2 && this.handleSignalResponse(t2); ; ) {
                this.signalLatency && (yield fa(this.signalLatency));
                const { done: t3, value: n2 } = yield e2.read();
                if (t3) break;
                const i2 = vo(n2);
                this.handleSignalResponse(i2);
              }
            }));
          }
          close() {
            return Xi(this, arguments, void 0, (function() {
              var e2 = this;
              let t2 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "Close method called on signal client";
              return (function* () {
                if ([Yo.DISCONNECTING || Yo.DISCONNECTED].includes(e2.state)) return void e2.log.debug("ignoring signal close as it's already in disconnecting state");
                const i2 = yield e2.closingLock.lock();
                try {
                  if (e2.clearPingInterval(), t2 && (e2.state = Yo.DISCONNECTING), e2.ws) {
                    e2.ws.close({ closeCode: 1e3, reason: n2 });
                    const t3 = e2.ws.closed;
                    e2.ws = void 0, e2.streamWriter = void 0, yield Promise.race([t3, fa(250)]);
                  }
                } catch (t3) {
                  e2.log.debug("websocket error while closing", { error: t3 });
                } finally {
                  t2 && (e2.state = Yo.DISCONNECTED), i2();
                }
              })();
            }));
          }
          sendOffer(e2, t2) {
            this.log.debug("sending offer", { offerSdp: e2.sdp }), this.sendRequest({ case: "offer", value: $o(e2, t2) });
          }
          sendAnswer(e2, t2) {
            return this.log.debug("sending answer", { answerSdp: e2.sdp }), this.sendRequest({ case: "answer", value: $o(e2, t2) });
          }
          sendIceCandidate(e2, t2) {
            return this.log.debug("sending ice candidate", { candidate: e2 }), this.sendRequest({ case: "trickle", value: new vn({ candidateInit: JSON.stringify(e2), target: t2 }) });
          }
          sendMuteTrack(e2, t2) {
            return this.sendRequest({ case: "mute", value: new fn({ sid: e2, muted: t2 }) });
          }
          sendAddTrack(e2) {
            return this.sendRequest({ case: "addTrack", value: e2 });
          }
          sendUpdateLocalMetadata(e2, t2) {
            return Xi(this, arguments, void 0, (function(e3, t3) {
              var n2 = this;
              let i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              return (function* () {
                const r2 = n2.getNextRequestId();
                return yield n2.sendRequest({ case: "updateMetadata", value: new An({ requestId: r2, metadata: e3, name: t3, attributes: i2 }) }), r2;
              })();
            }));
          }
          sendUpdateTrackSettings(e2) {
            this.sendRequest({ case: "trackSetting", value: e2 });
          }
          sendUpdateSubscription(e2) {
            return this.sendRequest({ case: "subscription", value: e2 });
          }
          sendSyncState(e2) {
            return this.sendRequest({ case: "syncState", value: e2 });
          }
          sendUpdateVideoLayers(e2, t2) {
            return this.sendRequest({ case: "updateLayers", value: new On({ trackSid: e2, layers: t2 }) });
          }
          sendUpdateSubscriptionPermissions(e2, t2) {
            return this.sendRequest({ case: "subscriptionPermission", value: new zn({ allParticipants: e2, trackPermissions: t2 }) });
          }
          sendSimulateScenario(e2) {
            return this.sendRequest({ case: "simulate", value: e2 });
          }
          sendPing() {
            return Promise.all([this.sendRequest({ case: "ping", value: M.parse(Date.now()) }), this.sendRequest({ case: "pingReq", value: new $n({ timestamp: M.parse(Date.now()), rtt: M.parse(this.rtt) }) })]);
          }
          sendUpdateLocalAudioTrack(e2, t2) {
            return this.sendRequest({ case: "updateAudioTrack", value: new In({ trackSid: e2, features: t2 }) });
          }
          sendLeave() {
            return this.sendRequest({ case: "leave", value: new _n({ reason: nt.CLIENT_INITIATED, action: Mn.DISCONNECT }) });
          }
          sendPublishDataTrackRequest(e2, t2, n2) {
            return this.sendRequest({ case: "publishDataTrackRequest", value: new ln({ pubHandle: e2, name: t2, encryption: n2 ? mt.GCM : mt.NONE }) });
          }
          sendUnPublishDataTrackRequest(e2) {
            return this.sendRequest({ case: "unpublishDataTrackRequest", value: new hn({ pubHandle: e2 }) });
          }
          sendUpdateDataSubscription(e2, t2) {
            return this.sendRequest({ case: "updateDataSubscription", value: new wn({ updates: [new Rn({ trackSid: e2, subscribe: t2 })] }) });
          }
          sendRequest(e2) {
            return Xi(this, arguments, void 0, (function(e3) {
              var t2 = this;
              let n2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              return (function* () {
                const i2 = !n2 && !(function(e4) {
                  const t3 = Qo.indexOf(e4.case) >= 0;
                  return Hi.trace("request allowed to bypass queue:", { canPass: t3, req: e4 }), t3;
                })(e3);
                if (i2 && t2.state === Yo.RECONNECTING) return void t2.queuedRequests.push((() => Xi(t2, void 0, void 0, (function* () {
                  yield this.sendRequest(e3, true);
                }))));
                if (n2 || (yield t2.requestQueue.flush()), t2.signalLatency && (yield fa(t2.signalLatency)), t2.isDisconnected) return void t2.log.debug("skipping signal request (type: ".concat(e3.case, ") - SignalClient disconnected"));
                if (!t2.streamWriter) return void t2.log.error("cannot send signal request before connected, type: ".concat(null == e3 ? void 0 : e3.case));
                const r2 = new an({ message: e3 });
                try {
                  t2.useJSON ? yield t2.streamWriter.write(r2.toJsonString()) : yield t2.streamWriter.write(r2.toBinary());
                } catch (e4) {
                  t2.log.error("error sending signal message", { error: e4 });
                }
              })();
            }));
          }
          handleSignalResponse(e2) {
            var t2, n2;
            const i2 = e2.message;
            if (null == i2) return void this.log.debug("received unsupported message");
            let r2 = false;
            if ("answer" === i2.case) {
              const e3 = Zo(i2.value);
              this.onAnswer && this.onAnswer(e3, i2.value.id, i2.value.midToTrackId);
            } else if ("offer" === i2.case) {
              const e3 = Zo(i2.value);
              this.onOffer && this.onOffer(e3, i2.value.id, i2.value.midToTrackId);
            } else if ("trickle" === i2.case) {
              const e3 = JSON.parse(i2.value.candidateInit);
              this.onTrickle && this.onTrickle(e3, i2.value.target);
            } else "update" === i2.case ? this.onParticipantUpdate && this.onParticipantUpdate(null !== (t2 = i2.value.participants) && void 0 !== t2 ? t2 : []) : "trackPublished" === i2.case ? this.onLocalTrackPublished && this.onLocalTrackPublished(i2.value) : "speakersChanged" === i2.case ? this.onSpeakersChanged && this.onSpeakersChanged(null !== (n2 = i2.value.speakers) && void 0 !== n2 ? n2 : []) : "leave" === i2.case ? this.onLeave && this.onLeave(i2.value) : "mute" === i2.case ? this.onRemoteMuteChanged && this.onRemoteMuteChanged(i2.value.sid, i2.value.muted) : "roomUpdate" === i2.case ? this.onRoomUpdate && i2.value.room && this.onRoomUpdate(i2.value.room) : "connectionQuality" === i2.case ? this.onConnectionQuality && this.onConnectionQuality(i2.value) : "streamStateUpdate" === i2.case ? this.onStreamStateUpdate && this.onStreamStateUpdate(i2.value) : "subscribedQualityUpdate" === i2.case ? this.onSubscribedQualityUpdate && this.onSubscribedQualityUpdate(i2.value) : "subscriptionPermissionUpdate" === i2.case ? this.onSubscriptionPermissionUpdate && this.onSubscriptionPermissionUpdate(i2.value) : "refreshToken" === i2.case ? this.onTokenRefresh && this.onTokenRefresh(i2.value) : "trackUnpublished" === i2.case ? this.onLocalTrackUnpublished && this.onLocalTrackUnpublished(i2.value) : "subscriptionResponse" === i2.case ? this.onSubscriptionError && this.onSubscriptionError(i2.value) : "pong" === i2.case || ("pongResp" === i2.case ? (this.rtt = Date.now() - Number.parseInt(i2.value.lastPingTimestamp.toString()), this.resetPingTimeout(), r2 = true) : "requestResponse" === i2.case ? this.onRequestResponse && this.onRequestResponse(i2.value) : "trackSubscribed" === i2.case ? this.onLocalTrackSubscribed && this.onLocalTrackSubscribed(i2.value.trackSid) : "roomMoved" === i2.case ? (this.onTokenRefresh && this.onTokenRefresh(i2.value.token), this.onRoomMoved && this.onRoomMoved(i2.value)) : "mediaSectionsRequirement" === i2.case ? this.onMediaSectionsRequirement && this.onMediaSectionsRequirement(i2.value) : "publishDataTrackResponse" === i2.case ? this.onPublishDataTrackResponse && this.onPublishDataTrackResponse(i2.value) : "unpublishDataTrackResponse" === i2.case ? this.onUnPublishDataTrackResponse && this.onUnPublishDataTrackResponse(i2.value) : "dataTrackSubscriberHandles" === i2.case ? this.onDataTrackSubscriberHandles && this.onDataTrackSubscriberHandles(i2.value) : this.log.debug("unsupported message", { msgCase: i2.case }));
            r2 || this.resetPingTimeout();
          }
          setReconnected() {
            for (; this.queuedRequests.length > 0; ) {
              const e2 = this.queuedRequests.shift();
              e2 && this.requestQueue.run(e2);
            }
          }
          handleOnClose(e2) {
            return Xi(this, void 0, void 0, (function* () {
              if (this.state === Yo.DISCONNECTED) return;
              const t2 = this.onClose;
              yield this.close(void 0, e2), this.log.info("websocket connection closed: ".concat(e2), { reason: e2 }), t2 && t2(e2);
            }));
          }
          handleWSError(e2) {
            this.log.error("websocket error", { error: e2 });
          }
          resetPingTimeout() {
            this.clearPingTimeout(), this.pingTimeoutDuration ? this.pingTimeout = js.setTimeout((() => {
              this.log.warn("ping timeout triggered. last pong received at: ".concat(new Date(Date.now() - 1e3 * this.pingTimeoutDuration).toUTCString())), this.handleOnClose("ping timeout");
            }), 1e3 * this.pingTimeoutDuration) : this.log.warn("ping timeout duration not set");
          }
          clearPingTimeout() {
            this.pingTimeout && js.clearTimeout(this.pingTimeout);
          }
          startPingInterval() {
            this.clearPingInterval(), this.resetPingTimeout(), this.pingIntervalDuration ? (this.log.debug("start ping interval"), this.pingInterval = js.setInterval((() => {
              this.sendPing();
            }), 1e3 * this.pingIntervalDuration)) : this.log.warn("ping interval duration not set");
          }
          clearPingInterval() {
            this.log.debug("clearing ping interval"), this.clearPingTimeout(), this.pingInterval && js.clearInterval(this.pingInterval);
          }
          handleSignalConnected(e2, t2, n2) {
            this.state = Yo.CONNECTED, this.log.info("signal connected"), clearTimeout(t2), this.startPingInterval(), this.startReadingLoop(e2.readable.getReader(), n2);
          }
          validateFirstMessage(e2, t2) {
            var n2, i2, r2, s2, a2;
            return "join" === (null === (n2 = e2.message) || void 0 === n2 ? void 0 : n2.case) ? { isValid: true, response: e2.message.value } : this.state === Yo.RECONNECTING && "leave" !== (null === (i2 = e2.message) || void 0 === i2 ? void 0 : i2.case) ? "reconnect" === (null === (r2 = e2.message) || void 0 === r2 ? void 0 : r2.case) ? { isValid: true, response: e2.message.value } : (this.log.debug("declaring signal reconnected without reconnect response received"), { isValid: true, response: void 0, shouldProcessFirstMessage: true }) : this.isEstablishingConnection && "leave" === (null === (s2 = e2.message) || void 0 === s2 ? void 0 : s2.case) ? { isValid: false, error: _s.leaveRequest("Received leave request while trying to (re)connect", e2.message.value.reason) } : t2 ? { isValid: false, error: _s.internal("Unexpected first message") } : { isValid: false, error: _s.internal("did not receive join response, got ".concat(null === (a2 = e2.message) || void 0 === a2 ? void 0 : a2.case, " instead")) };
          }
          handleConnectionError(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              try {
                const n2 = yield fetch(t2);
                switch (n2.status) {
                  case 404:
                    const e3 = yield n2.text();
                    return e3.includes("requested room does not exist") ? _s.notAllowed(e3, n2.status) : _s.serviceNotFound("v1 RTC path not found. Consider upgrading your LiveKit server version", "v0-rtc");
                  case 401:
                  case 403:
                    const t3 = yield n2.text();
                    return _s.notAllowed(t3, n2.status);
                }
                return e2 instanceof _s ? e2 : _s.internal("Encountered unknown websocket error during connection: ".concat(e2), { status: n2.status, statusText: n2.statusText });
              } catch (e3) {
                return e3 instanceof _s ? e3 : _s.serverUnreachable(e3 instanceof Error ? e3.message : "server was not reachable");
              }
            }));
          }
        }
        function Zo(e2) {
          const t2 = { type: "offer", sdp: e2.sdp };
          switch (e2.type) {
            case "answer":
            case "offer":
            case "pranswer":
            case "rollback":
              t2.type = e2.type;
          }
          return t2;
        }
        function $o(e2, t2) {
          return new Sn({ sdp: e2.sdp, type: e2.type, id: t2 });
        }
        class ec {
          constructor() {
            this.buffer = [], this._totalSize = 0;
          }
          push(e2) {
            this.buffer.push(e2), this._totalSize += e2.data.byteLength;
          }
          pop() {
            const e2 = this.buffer.shift();
            return e2 && (this._totalSize -= e2.data.byteLength), e2;
          }
          getAll() {
            return this.buffer.slice();
          }
          popToSequence(e2) {
            for (; this.buffer.length > 0; ) {
              if (!(this.buffer[0].sequence <= e2)) break;
              this.pop();
            }
          }
          alignBufferedAmount(e2) {
            for (; this.buffer.length > 0; ) {
              const t2 = this.buffer[0];
              if (this._totalSize - t2.data.byteLength <= e2) break;
              this.pop();
            }
          }
          get length() {
            return this.buffer.length;
          }
        }
        class tc {
          constructor(e2) {
            this._map = /* @__PURE__ */ new Map(), this._lastCleanup = 0, this.ttl = e2;
          }
          set(e2, t2) {
            const n2 = Date.now();
            n2 - this._lastCleanup > this.ttl / 2 && this.cleanup();
            const i2 = n2 + this.ttl;
            return this._map.set(e2, { value: t2, expiresAt: i2 }), this;
          }
          get(e2) {
            const t2 = this._map.get(e2);
            if (t2) {
              if (!(t2.expiresAt < Date.now())) return t2.value;
              this._map.delete(e2);
            }
          }
          has(e2) {
            const t2 = this._map.get(e2);
            return !!t2 && (!(t2.expiresAt < Date.now()) || (this._map.delete(e2), false));
          }
          delete(e2) {
            return this._map.delete(e2);
          }
          clear() {
            this._map.clear();
          }
          cleanup() {
            const e2 = Date.now();
            for (const [t2, n2] of this._map.entries()) n2.expiresAt < e2 && this._map.delete(t2);
            this._lastCleanup = e2;
          }
          get size() {
            return this.cleanup(), this._map.size;
          }
          forEach(e2) {
            this.cleanup();
            for (const [t2, n2] of this._map.entries()) n2.expiresAt >= Date.now() && e2(n2.value, t2, this.asValueMap());
          }
          map(e2) {
            this.cleanup();
            const t2 = [], n2 = this.asValueMap();
            for (const [i2, r2] of n2.entries()) t2.push(e2(r2, i2, n2));
            return t2;
          }
          asValueMap() {
            const e2 = /* @__PURE__ */ new Map();
            for (const [t2, n2] of this._map.entries()) n2.expiresAt >= Date.now() && e2.set(t2, n2.value);
            return e2;
          }
        }
        var nc, ic, rc, sc, ac, oc = {}, cc = {}, dc = { exports: {} };
        function lc() {
          if (nc) return dc.exports;
          nc = 1;
          var e2 = dc.exports = { v: [{ name: "version", reg: /^(\d*)$/ }], o: [{ name: "origin", reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/, names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"], format: "%s %s %d %s IP%d %s" }], s: [{ name: "name" }], i: [{ name: "description" }], u: [{ name: "uri" }], e: [{ name: "email" }], p: [{ name: "phone" }], z: [{ name: "timezones" }], r: [{ name: "repeats" }], t: [{ name: "timing", reg: /^(\d*) (\d*)/, names: ["start", "stop"], format: "%d %d" }], c: [{ name: "connection", reg: /^IN IP(\d) (\S*)/, names: ["version", "ip"], format: "IN IP%d %s" }], b: [{ push: "bandwidth", reg: /^(TIAS|AS|CT|RR|RS):(\d*)/, names: ["type", "limit"], format: "%s:%s" }], m: [{ reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/, names: ["type", "port", "protocol", "payloads"], format: "%s %d %s %s" }], a: [{ push: "rtp", reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/, names: ["payload", "codec", "rate", "encoding"], format: function(e3) {
            return e3.encoding ? "rtpmap:%d %s/%s/%s" : e3.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s";
          } }, { push: "fmtp", reg: /^fmtp:(\d*) ([\S| ]*)/, names: ["payload", "config"], format: "fmtp:%d %s" }, { name: "control", reg: /^control:(.*)/, format: "control:%s" }, { name: "rtcp", reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/, names: ["port", "netType", "ipVer", "address"], format: function(e3) {
            return null != e3.address ? "rtcp:%d %s IP%d %s" : "rtcp:%d";
          } }, { push: "rtcpFbTrrInt", reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/, names: ["payload", "value"], format: "rtcp-fb:%s trr-int %d" }, { push: "rtcpFb", reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/, names: ["payload", "type", "subtype"], format: function(e3) {
            return null != e3.subtype ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s";
          } }, { push: "ext", reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/, names: ["value", "direction", "encrypt-uri", "uri", "config"], format: function(e3) {
            return "extmap:%d" + (e3.direction ? "/%s" : "%v") + (e3["encrypt-uri"] ? " %s" : "%v") + " %s" + (e3.config ? " %s" : "");
          } }, { name: "extmapAllowMixed", reg: /^(extmap-allow-mixed)/ }, { push: "crypto", reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/, names: ["id", "suite", "config", "sessionConfig"], format: function(e3) {
            return null != e3.sessionConfig ? "crypto:%d %s %s %s" : "crypto:%d %s %s";
          } }, { name: "setup", reg: /^setup:(\w*)/, format: "setup:%s" }, { name: "connectionType", reg: /^connection:(new|existing)/, format: "connection:%s" }, { name: "mid", reg: /^mid:([^\s]*)/, format: "mid:%s" }, { name: "msid", reg: /^msid:(.*)/, format: "msid:%s" }, { name: "ptime", reg: /^ptime:(\d*(?:\.\d*)*)/, format: "ptime:%d" }, { name: "maxptime", reg: /^maxptime:(\d*(?:\.\d*)*)/, format: "maxptime:%d" }, { name: "direction", reg: /^(sendrecv|recvonly|sendonly|inactive)/ }, { name: "icelite", reg: /^(ice-lite)/ }, { name: "iceUfrag", reg: /^ice-ufrag:(\S*)/, format: "ice-ufrag:%s" }, { name: "icePwd", reg: /^ice-pwd:(\S*)/, format: "ice-pwd:%s" }, { name: "fingerprint", reg: /^fingerprint:(\S*) (\S*)/, names: ["type", "hash"], format: "fingerprint:%s %s" }, { push: "candidates", reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/, names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"], format: function(e3) {
            var t2 = "candidate:%s %d %s %d %s %d typ %s";
            return t2 += null != e3.raddr ? " raddr %s rport %d" : "%v%v", t2 += null != e3.tcptype ? " tcptype %s" : "%v", null != e3.generation && (t2 += " generation %d"), t2 += null != e3["network-id"] ? " network-id %d" : "%v", t2 += null != e3["network-cost"] ? " network-cost %d" : "%v";
          } }, { name: "endOfCandidates", reg: /^(end-of-candidates)/ }, { name: "remoteCandidates", reg: /^remote-candidates:(.*)/, format: "remote-candidates:%s" }, { name: "iceOptions", reg: /^ice-options:(\S*)/, format: "ice-options:%s" }, { push: "ssrcs", reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/, names: ["id", "attribute", "value"], format: function(e3) {
            var t2 = "ssrc:%d";
            return null != e3.attribute && (t2 += " %s", null != e3.value && (t2 += ":%s")), t2;
          } }, { push: "ssrcGroups", reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/, names: ["semantics", "ssrcs"], format: "ssrc-group:%s %s" }, { name: "msidSemantic", reg: /^msid-semantic:\s?(\w*) (\S*)/, names: ["semantic", "token"], format: "msid-semantic: %s %s" }, { push: "groups", reg: /^group:(\w*) (.*)/, names: ["type", "mids"], format: "group:%s %s" }, { name: "rtcpMux", reg: /^(rtcp-mux)/ }, { name: "rtcpRsize", reg: /^(rtcp-rsize)/ }, { name: "sctpmap", reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/, names: ["sctpmapNumber", "app", "maxMessageSize"], format: function(e3) {
            return null != e3.maxMessageSize ? "sctpmap:%s %s %s" : "sctpmap:%s %s";
          } }, { name: "xGoogleFlag", reg: /^x-google-flag:([^\s]*)/, format: "x-google-flag:%s" }, { push: "rids", reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/, names: ["id", "direction", "params"], format: function(e3) {
            return e3.params ? "rid:%s %s %s" : "rid:%s %s";
          } }, { push: "imageattrs", reg: new RegExp("^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"), names: ["pt", "dir1", "attrs1", "dir2", "attrs2"], format: function(e3) {
            return "imageattr:%s %s %s" + (e3.dir2 ? " %s %s" : "");
          } }, { name: "simulcast", reg: new RegExp("^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"), names: ["dir1", "list1", "dir2", "list2"], format: function(e3) {
            return "simulcast:%s %s" + (e3.dir2 ? " %s %s" : "");
          } }, { name: "simulcast_03", reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/, names: ["value"], format: "simulcast: %s" }, { name: "framerate", reg: /^framerate:(\d+(?:$|\.\d+))/, format: "framerate:%s" }, { name: "sourceFilter", reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/, names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"], format: "source-filter: %s %s %s %s %s" }, { name: "bundleOnly", reg: /^(bundle-only)/ }, { name: "label", reg: /^label:(.+)/, format: "label:%s" }, { name: "sctpPort", reg: /^sctp-port:(\d+)$/, format: "sctp-port:%s" }, { name: "maxMessageSize", reg: /^max-message-size:(\d+)$/, format: "max-message-size:%s" }, { push: "tsRefClocks", reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/, names: ["clksrc", "clksrcExt"], format: function(e3) {
            return "ts-refclk:%s" + (null != e3.clksrcExt ? "=%s" : "");
          } }, { name: "mediaClk", reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/, names: ["id", "mediaClockName", "mediaClockValue", "rateNumerator", "rateDenominator"], format: function(e3) {
            var t2 = "mediaclk:";
            return t2 += null != e3.id ? "id=%s %s" : "%v%s", t2 += null != e3.mediaClockValue ? "=%s" : "", t2 += null != e3.rateNumerator ? " rate=%s" : "", t2 += null != e3.rateDenominator ? "/%s" : "";
          } }, { name: "keywords", reg: /^keywds:(.+)$/, format: "keywds:%s" }, { name: "content", reg: /^content:(.+)/, format: "content:%s" }, { name: "bfcpFloorCtrl", reg: /^floorctrl:(c-only|s-only|c-s)/, format: "floorctrl:%s" }, { name: "bfcpConfId", reg: /^confid:(\d+)/, format: "confid:%s" }, { name: "bfcpUserId", reg: /^userid:(\d+)/, format: "userid:%s" }, { name: "bfcpFloorId", reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/, names: ["id", "mStream"], format: "floorid:%s mstrm:%s" }, { push: "invalid", names: ["value"] }] };
          return Object.keys(e2).forEach((function(t2) {
            e2[t2].forEach((function(e3) {
              e3.reg || (e3.reg = /(.*)/), e3.format || (e3.format = "%s");
            }));
          })), dc.exports;
        }
        function uc() {
          return ic || (ic = 1, (function(e2) {
            var t2 = function(e3) {
              return String(Number(e3)) === e3 ? Number(e3) : e3;
            }, n2 = function(e3, n3, i3) {
              var r3 = e3.name && e3.names;
              e3.push && !n3[e3.push] ? n3[e3.push] = [] : r3 && !n3[e3.name] && (n3[e3.name] = {});
              var s3 = e3.push ? {} : r3 ? n3[e3.name] : n3;
              !(function(e4, n4, i4, r4) {
                if (r4 && !i4) n4[r4] = t2(e4[1]);
                else for (var s4 = 0; s4 < i4.length; s4 += 1) null != e4[s4 + 1] && (n4[i4[s4]] = t2(e4[s4 + 1]));
              })(i3.match(e3.reg), s3, e3.names, e3.name), e3.push && n3[e3.push].push(s3);
            }, i2 = lc(), r2 = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
            e2.parse = function(e3) {
              var t3 = {}, s3 = [], a2 = t3;
              return e3.split(/(\r\n|\r|\n)/).filter(r2).forEach((function(e4) {
                var t4 = e4[0], r3 = e4.slice(2);
                "m" === t4 && (s3.push({ rtp: [], fmtp: [] }), a2 = s3[s3.length - 1]);
                for (var o2 = 0; o2 < (i2[t4] || []).length; o2 += 1) {
                  var c2 = i2[t4][o2];
                  if (c2.reg.test(r3)) return n2(c2, a2, r3);
                }
              })), t3.media = s3, t3;
            };
            var s2 = function(e3, n3) {
              var i3 = n3.split(/=(.+)/, 2);
              return 2 === i3.length ? e3[i3[0]] = t2(i3[1]) : 1 === i3.length && n3.length > 1 && (e3[i3[0]] = void 0), e3;
            };
            e2.parseParams = function(e3) {
              return e3.split(/;\s?/).reduce(s2, {});
            }, e2.parseFmtpConfig = e2.parseParams, e2.parsePayloads = function(e3) {
              return e3.toString().split(" ").map(Number);
            }, e2.parseRemoteCandidates = function(e3) {
              for (var n3 = [], i3 = e3.split(" ").map(t2), r3 = 0; r3 < i3.length; r3 += 3) n3.push({ component: i3[r3], ip: i3[r3 + 1], port: i3[r3 + 2] });
              return n3;
            }, e2.parseImageAttributes = function(e3) {
              return e3.split(" ").map((function(e4) {
                return e4.substring(1, e4.length - 1).split(",").reduce(s2, {});
              }));
            }, e2.parseSimulcastStreamList = function(e3) {
              return e3.split(";").map((function(e4) {
                return e4.split(",").map((function(e5) {
                  var n3, i3 = false;
                  return "~" !== e5[0] ? n3 = t2(e5) : (n3 = t2(e5.substring(1, e5.length)), i3 = true), { scid: n3, paused: i3 };
                }));
              }));
            };
          })(cc)), cc;
        }
        function hc() {
          if (sc) return rc;
          sc = 1;
          var e2 = lc(), t2 = /%[sdv%]/g, n2 = function(e3) {
            var n3 = 1, i3 = arguments, r3 = i3.length;
            return e3.replace(t2, (function(e4) {
              if (n3 >= r3) return e4;
              var t3 = i3[n3];
              switch (n3 += 1, e4) {
                case "%%":
                  return "%";
                case "%s":
                  return String(t3);
                case "%d":
                  return Number(t3);
                case "%v":
                  return "";
              }
            }));
          }, i2 = function(e3, t3, i3) {
            var r3 = [e3 + "=" + (t3.format instanceof Function ? t3.format(t3.push ? i3 : i3[t3.name]) : t3.format)];
            if (t3.names) for (var s3 = 0; s3 < t3.names.length; s3 += 1) {
              var a2 = t3.names[s3];
              t3.name ? r3.push(i3[t3.name][a2]) : r3.push(i3[t3.names[s3]]);
            }
            else r3.push(i3[t3.name]);
            return n2.apply(null, r3);
          }, r2 = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"], s2 = ["i", "c", "b", "a"];
          return rc = function(t3, n3) {
            n3 = n3 || {}, null == t3.version && (t3.version = 0), null == t3.name && (t3.name = " "), t3.media.forEach((function(e3) {
              null == e3.payloads && (e3.payloads = "");
            }));
            var a2 = n3.outerOrder || r2, o2 = n3.innerOrder || s2, c2 = [];
            return a2.forEach((function(n4) {
              e2[n4].forEach((function(e3) {
                e3.name in t3 && null != t3[e3.name] ? c2.push(i2(n4, e3, t3)) : e3.push in t3 && null != t3[e3.push] && t3[e3.push].forEach((function(t4) {
                  c2.push(i2(n4, e3, t4));
                }));
              }));
            })), t3.media.forEach((function(t4) {
              c2.push(i2("m", e2.m[0], t4)), o2.forEach((function(n4) {
                e2[n4].forEach((function(e3) {
                  e3.name in t4 && null != t4[e3.name] ? c2.push(i2(n4, e3, t4)) : e3.push in t4 && null != t4[e3.push] && t4[e3.push].forEach((function(t5) {
                    c2.push(i2(n4, e3, t5));
                  }));
                }));
              }));
            })), c2.join("\r\n") + "\r\n";
          }, rc;
        }
        var pc = (function() {
          if (ac) return oc;
          ac = 1;
          var e2 = uc(), t2 = hc(), n2 = lc();
          return oc.grammar = n2, oc.write = t2, oc.parse = e2.parse, oc.parseParams = e2.parseParams, oc.parseFmtpConfig = e2.parseFmtpConfig, oc.parsePayloads = e2.parsePayloads, oc.parseRemoteCandidates = e2.parseRemoteCandidates, oc.parseImageAttributes = e2.parseImageAttributes, oc.parseSimulcastStreamList = e2.parseSimulcastStreamList, oc;
        })();
        function mc(e2) {
          let t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50, n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          var i2, r2;
          let s2;
          const a2 = null !== (i2 = n2.isImmediate) && void 0 !== i2 && i2, o2 = null !== (r2 = n2.callback) && void 0 !== r2 && r2, c2 = n2.maxWait;
          let d2 = Date.now(), l2 = [];
          const u2 = function() {
            for (var n3 = arguments.length, i3 = new Array(n3), r3 = 0; r3 < n3; r3++) i3[r3] = arguments[r3];
            const u3 = this;
            return new Promise(((n4, r4) => {
              const h2 = a2 && void 0 === s2;
              if (void 0 !== s2 && js.clearTimeout(s2), s2 = js.setTimeout((function() {
                if (s2 = void 0, d2 = Date.now(), !a2) {
                  const t3 = e2.apply(u3, i3);
                  o2 && o2(t3), l2.forEach(((e3) => {
                    let { resolve: n5 } = e3;
                    return n5(t3);
                  })), l2 = [];
                }
              }), (function() {
                if (void 0 !== c2) {
                  const e3 = Date.now() - d2;
                  if (e3 + t2 >= c2) return c2 - e3;
                }
                return t2;
              })()), h2) {
                const t3 = e2.apply(u3, i3);
                return o2 && o2(t3), n4(t3);
              }
              l2.push({ resolve: n4, reject: r4 });
            }));
          };
          return u2.cancel = function(e3) {
            void 0 !== s2 && js.clearTimeout(s2), l2.forEach(((t3) => {
              let { reject: n3 } = t3;
              return n3(e3);
            })), l2 = [];
          }, u2;
        }
        const gc = "negotiationStarted", vc = "negotiationComplete", fc = "offerAnswered", kc = "rtpVideoPayloadTypes";
        class yc extends rr.EventEmitter {
          get pc() {
            return this._pc || (this._pc = this.createPC()), this._pc;
          }
          constructor(t2) {
            let n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            var i2;
            super(), this.log = Hi, this.ddExtID = 0, this.latestOfferId = 0, this.latestAcknowledgedOfferId = 0, this.pendingCandidates = [], this.restartingIce = false, this.renegotiate = false, this.trackBitrates = [], this.remoteStereoMids = [], this.remoteNackMids = [], this.negotiate = mc(((e2) => Xi(this, void 0, void 0, (function* () {
              this.emit(gc);
              try {
                yield this.createAndSendOffer();
              } catch (t3) {
                if (!e2) throw t3;
                e2(t3);
              }
            }))), 20), this.close = () => {
              this._pc && (this.pendingInitialOffer = void 0, this._pc.close(), this._pc.onconnectionstatechange = null, this._pc.oniceconnectionstatechange = null, this._pc.onicegatheringstatechange = null, this._pc.ondatachannel = null, this._pc.onnegotiationneeded = null, this._pc.onsignalingstatechange = null, this._pc.onicecandidate = null, this._pc.ondatachannel = null, this._pc.ontrack = null, this._pc.onconnectionstatechange = null, this._pc.oniceconnectionstatechange = null, this._pc = null);
            }, this.log = Ki(null !== (i2 = n2.loggerName) && void 0 !== i2 ? i2 : e.LoggerNames.PCTransport), this.loggerOptions = n2, this.config = t2, this._pc = this.createPC(), this.offerLock = new r();
          }
          createPC() {
            const e2 = new RTCPeerConnection(this.config);
            return e2.onicecandidate = (e3) => {
              var t2;
              e3.candidate && (null === (t2 = this.onIceCandidate) || void 0 === t2 || t2.call(this, e3.candidate));
            }, e2.onicecandidateerror = (e3) => {
              var t2;
              null === (t2 = this.onIceCandidateError) || void 0 === t2 || t2.call(this, e3);
            }, e2.oniceconnectionstatechange = () => {
              var t2;
              null === (t2 = this.onIceConnectionStateChange) || void 0 === t2 || t2.call(this, e2.iceConnectionState);
            }, e2.onsignalingstatechange = () => {
              var t2;
              null === (t2 = this.onSignalingStatechange) || void 0 === t2 || t2.call(this, e2.signalingState);
            }, e2.onconnectionstatechange = () => {
              var t2;
              null === (t2 = this.onConnectionStateChange) || void 0 === t2 || t2.call(this, e2.connectionState);
            }, e2.ondatachannel = (e3) => {
              var t2;
              null === (t2 = this.onDataChannel) || void 0 === t2 || t2.call(this, e3);
            }, e2.ontrack = (e3) => {
              var t2;
              null === (t2 = this.onTrack) || void 0 === t2 || t2.call(this, e3);
            }, e2;
          }
          get logContext() {
            var e2, t2;
            return Object.assign({}, null === (t2 = (e2 = this.loggerOptions).loggerContextCb) || void 0 === t2 ? void 0 : t2.call(e2));
          }
          get isICEConnected() {
            return null !== this._pc && ("connected" === this.pc.iceConnectionState || "completed" === this.pc.iceConnectionState);
          }
          addIceCandidate(e2) {
            return Xi(this, void 0, void 0, (function* () {
              if (this.pc.remoteDescription && !this.restartingIce) return this.pc.addIceCandidate(e2);
              this.pendingCandidates.push(e2);
            }));
          }
          setRemoteDescription(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2, i2;
              if ("answer" === e2.type && this.latestOfferId > 0 && t2 > 0 && t2 !== this.latestOfferId) return this.log.warn("ignoring answer for old offer", Object.assign(Object.assign({}, this.logContext), { offerId: t2, latestOfferId: this.latestOfferId })), false;
              let r2;
              if ("offer" === e2.type) {
                let { stereoMids: t3, nackMids: n3 } = (function(e3) {
                  var t4;
                  const n4 = [], i3 = [], r3 = pc.parse(null !== (t4 = e3.sdp) && void 0 !== t4 ? t4 : "");
                  let s2 = 0;
                  return r3.media.forEach(((e4) => {
                    var t5;
                    const r4 = Sc(e4.mid);
                    "audio" === e4.type && (e4.rtp.some(((e5) => "opus" === e5.codec && (s2 = e5.payload, true))), (null === (t5 = e4.rtcpFb) || void 0 === t5 ? void 0 : t5.some(((e5) => e5.payload === s2 && "nack" === e5.type))) && i3.push(r4), e4.fmtp.some(((e5) => e5.payload === s2 && (e5.config.includes("sprop-stereo=1") && n4.push(r4), true))));
                  })), { stereoMids: n4, nackMids: i3 };
                })(e2);
                this.remoteStereoMids = t3, this.remoteNackMids = n3;
              } else if ("answer" === e2.type) {
                if (this.pendingInitialOffer && this._pc) {
                  const e3 = this.pendingInitialOffer;
                  this.pendingInitialOffer = void 0;
                  const t4 = pc.parse(null !== (n2 = e3.sdp) && void 0 !== n2 ? n2 : "");
                  t4.media.forEach(((e4) => {
                    Tc(e4);
                  })), this.log.debug("setting pending initial offer before processing answer", this.logContext), yield this.setMungedSDP(e3, pc.write(t4));
                }
                const t3 = pc.parse(null !== (i2 = e2.sdp) && void 0 !== i2 ? i2 : "");
                t3.media.forEach(((e3) => {
                  const t4 = Sc(e3.mid);
                  "audio" === e3.type && this.trackBitrates.some(((n3) => {
                    if (!n3.transceiver || t4 != n3.transceiver.mid) return false;
                    let i3 = 0;
                    if (e3.rtp.some(((e4) => e4.codec.toUpperCase() === n3.codec.toUpperCase() && (i3 = e4.payload, true))), 0 === i3) return true;
                    let r3 = false;
                    for (const t5 of e3.fmtp) if (t5.payload === i3) {
                      t5.config = t5.config.split(";").filter(((e4) => !e4.includes("maxaveragebitrate"))).join(";"), n3.maxbr > 0 && (t5.config += ";maxaveragebitrate=".concat(1e3 * n3.maxbr)), r3 = true;
                      break;
                    }
                    return r3 || n3.maxbr > 0 && e3.fmtp.push({ payload: i3, config: "maxaveragebitrate=".concat(1e3 * n3.maxbr) }), true;
                  }));
                })), r2 = pc.write(t3);
              }
              if (yield this.setMungedSDP(e2, r2, true), this.pendingCandidates.forEach(((e3) => {
                this.pc.addIceCandidate(e3);
              })), this.pendingCandidates = [], this.restartingIce = false, "answer" === e2.type && (this.latestAcknowledgedOfferId = t2, this.emit(fc, t2)), this.renegotiate) this.renegotiate = false, yield this.createAndSendOffer();
              else if ("answer" === e2.type && (this.emit(vc), e2.sdp)) {
                pc.parse(e2.sdp).media.forEach(((e3) => {
                  "video" === e3.type && this.emit(kc, e3.rtp);
                }));
              }
              return true;
            }));
          }
          createInitialOffer() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              const t2 = yield this.offerLock.lock();
              try {
                if ("stable" !== this.pc.signalingState) return void this.log.warn("signaling state is not stable, cannot create initial offer", this.logContext);
                const t3 = this.latestOfferId + 1;
                this.latestOfferId = t3;
                const n2 = yield this.pc.createOffer();
                this.pendingInitialOffer = { sdp: n2.sdp, type: n2.type };
                const i2 = pc.parse(null !== (e2 = n2.sdp) && void 0 !== e2 ? e2 : "");
                return i2.media.forEach(((e3) => {
                  Tc(e3);
                })), n2.sdp = pc.write(i2), { offer: n2, offerId: t3 };
              } finally {
                t2();
              }
            }));
          }
          createAndSendOffer(e2) {
            return Xi(this, void 0, void 0, (function* () {
              var t2;
              const n2 = yield this.offerLock.lock();
              try {
                if (void 0 === this.onOffer) return;
                if ((null == e2 ? void 0 : e2.iceRestart) && (this.log.debug("restarting ICE", this.logContext), this.restartingIce = true), this._pc && ("have-local-offer" === this._pc.signalingState || this.pendingInitialOffer)) {
                  const t3 = this._pc.remoteDescription;
                  if (!(null == e2 ? void 0 : e2.iceRestart) || !t3) return this.renegotiate = true, void this.log.debug("requesting renegotiation", Object.assign({}, this.logContext));
                  yield this._pc.setRemoteDescription(t3);
                } else if (!this._pc || "closed" === this._pc.signalingState) return void this.log.warn("could not createOffer with closed peer connection", this.logContext);
                this.log.debug("starting to negotiate", this.logContext);
                const n3 = this.latestOfferId + 1;
                this.latestOfferId = n3;
                const i2 = yield this.pc.createOffer(e2);
                this.log.debug("original offer", Object.assign({ sdp: i2.sdp }, this.logContext));
                const r2 = pc.parse(null !== (t2 = i2.sdp) && void 0 !== t2 ? t2 : "");
                if (r2.media.forEach(((e3) => {
                  Tc(e3), "audio" === e3.type ? bc(e3, ["all"], []) : "video" === e3.type && this.trackBitrates.some(((t3) => {
                    if (!e3.msid || !t3.cid || !e3.msid.includes(t3.cid)) return false;
                    let n4 = 0;
                    if (e3.rtp.some(((e4) => e4.codec.toUpperCase() === t3.codec.toUpperCase() && (n4 = e4.payload, true))), 0 === n4) return true;
                    if (Sa(t3.codec) && !Pa() && this.ensureVideoDDExtensionForSVC(e3, r2), !Sa(t3.codec)) return true;
                    const i3 = Math.round(0.7 * t3.maxbr);
                    for (const t4 of e3.fmtp) if (t4.payload === n4) {
                      t4.config.includes("x-google-start-bitrate") || (t4.config += ";x-google-start-bitrate=".concat(i3));
                      break;
                    }
                    return true;
                  }));
                })), this.latestOfferId > n3) return void this.log.warn("latestOfferId mismatch", Object.assign(Object.assign({}, this.logContext), { latestOfferId: this.latestOfferId, offerId: n3 }));
                yield this.setMungedSDP(i2, pc.write(r2)), this.onOffer(i2, this.latestOfferId);
              } finally {
                n2();
              }
            }));
          }
          createAndSetAnswer() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              const t2 = yield this.pc.createAnswer(), n2 = pc.parse(null !== (e2 = t2.sdp) && void 0 !== e2 ? e2 : "");
              return n2.media.forEach(((e3) => {
                Tc(e3), "audio" === e3.type && bc(e3, this.remoteStereoMids, this.remoteNackMids);
              })), yield this.setMungedSDP(t2, pc.write(n2)), t2;
            }));
          }
          createDataChannel(e2, t2) {
            return this.pc.createDataChannel(e2, t2);
          }
          addTransceiver(e2, t2) {
            return this.pc.addTransceiver(e2, t2);
          }
          addTransceiverOfKind(e2, t2) {
            return this.pc.addTransceiver(e2, t2);
          }
          addTrack(e2) {
            if (!this._pc) throw new Ns("PC closed, cannot add track");
            return this._pc.addTrack(e2);
          }
          setTrackCodecBitrate(e2) {
            this.trackBitrates.push(e2);
          }
          setConfiguration(e2) {
            var t2;
            if (!this._pc) throw new Ns("PC closed, cannot configure");
            return null === (t2 = this._pc) || void 0 === t2 ? void 0 : t2.setConfiguration(e2);
          }
          canRemoveTrack() {
            var e2;
            return !!(null === (e2 = this._pc) || void 0 === e2 ? void 0 : e2.removeTrack);
          }
          removeTrack(e2) {
            var t2;
            return null === (t2 = this._pc) || void 0 === t2 ? void 0 : t2.removeTrack(e2);
          }
          getConnectionState() {
            var e2, t2;
            return null !== (t2 = null === (e2 = this._pc) || void 0 === e2 ? void 0 : e2.connectionState) && void 0 !== t2 ? t2 : "closed";
          }
          getICEConnectionState() {
            var e2, t2;
            return null !== (t2 = null === (e2 = this._pc) || void 0 === e2 ? void 0 : e2.iceConnectionState) && void 0 !== t2 ? t2 : "closed";
          }
          getSignallingState() {
            var e2, t2;
            return null !== (t2 = null === (e2 = this._pc) || void 0 === e2 ? void 0 : e2.signalingState) && void 0 !== t2 ? t2 : "closed";
          }
          getTransceivers() {
            var e2, t2;
            return null !== (t2 = null === (e2 = this._pc) || void 0 === e2 ? void 0 : e2.getTransceivers()) && void 0 !== t2 ? t2 : [];
          }
          getSenders() {
            var e2, t2;
            return null !== (t2 = null === (e2 = this._pc) || void 0 === e2 ? void 0 : e2.getSenders()) && void 0 !== t2 ? t2 : [];
          }
          getLocalDescription() {
            var e2;
            return null === (e2 = this._pc) || void 0 === e2 ? void 0 : e2.localDescription;
          }
          getRemoteDescription() {
            var e2;
            return null === (e2 = this.pc) || void 0 === e2 ? void 0 : e2.remoteDescription;
          }
          getStats() {
            return this.pc.getStats();
          }
          getConnectedAddress() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              if (!this._pc) return;
              let t2 = "";
              const n2 = /* @__PURE__ */ new Map(), i2 = /* @__PURE__ */ new Map();
              if ((yield this._pc.getStats()).forEach(((e3) => {
                switch (e3.type) {
                  case "transport":
                    t2 = e3.selectedCandidatePairId;
                    break;
                  case "candidate-pair":
                    "" === t2 && e3.selected && (t2 = e3.id), n2.set(e3.id, e3);
                    break;
                  case "remote-candidate":
                    i2.set(e3.id, "".concat(e3.address, ":").concat(e3.port));
                }
              })), "" === t2) return;
              const r2 = null === (e2 = n2.get(t2)) || void 0 === e2 ? void 0 : e2.remoteCandidateId;
              return void 0 !== r2 ? i2.get(r2) : void 0;
            }));
          }
          setMungedSDP(e2, t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              var i2, r2;
              const s2 = e2.sdp;
              if (t2) {
                e2.sdp = t2;
                try {
                  return this.log.debug("setting munged ".concat(n2 ? "remote" : "local", " description"), this.logContext), void (n2 ? yield this.pc.setRemoteDescription(e2) : yield this.pc.setLocalDescription(e2));
                } catch (n3) {
                  this.log.warn("not able to set ".concat(e2.type, ", falling back to unmodified sdp"), Object.assign(Object.assign({}, this.logContext), { error: n3, mungedSdp: t2, originalSdp: s2 })), e2.sdp = s2;
                }
              }
              try {
                n2 ? yield null === (i2 = this._pc) || void 0 === i2 ? void 0 : i2.setRemoteDescription(e2) : yield null === (r2 = this._pc) || void 0 === r2 ? void 0 : r2.setLocalDescription(e2);
              } catch (i3) {
                let r3 = "unknown error";
                i3 instanceof Error ? r3 = i3.message : "string" == typeof i3 && (r3 = i3);
                const a2 = { error: r3, sdp: e2.sdp };
                throw t2 && t2 !== s2 && (a2.mungedSdp = t2), !n2 && this.pc.remoteDescription && (a2.remoteSdp = this.pc.remoteDescription), this.log.error("unable to set ".concat(e2.type), Object.assign(Object.assign({}, this.logContext), { fields: a2 })), new Ls(r3);
              }
            }));
          }
          ensureVideoDDExtensionForSVC(e2, t2) {
            var n2, i2;
            if (!(null === (n2 = e2.ext) || void 0 === n2 ? void 0 : n2.some(((e3) => e3.uri === va)))) {
              if (0 === this.ddExtID) {
                let e3 = 0;
                t2.media.forEach(((t3) => {
                  var n3;
                  null === (n3 = t3.ext) || void 0 === n3 || n3.forEach(((t4) => {
                    t4.value > e3 && (e3 = t4.value);
                  }));
                })), this.ddExtID = e3 + 1;
              }
              null === (i2 = e2.ext) || void 0 === i2 || i2.push({ value: this.ddExtID, uri: va });
            }
          }
        }
        function bc(e2, t2, n2) {
          const i2 = Sc(e2.mid);
          let r2 = 0;
          e2.rtp.some(((e3) => "opus" === e3.codec && (r2 = e3.payload, true))), r2 > 0 && (e2.rtcpFb || (e2.rtcpFb = []), n2.includes(i2) && !e2.rtcpFb.some(((e3) => e3.payload === r2 && "nack" === e3.type)) && e2.rtcpFb.push({ payload: r2, type: "nack" }), (t2.includes(i2) || 1 === t2.length && "all" === t2[0]) && e2.fmtp.some(((e3) => e3.payload === r2 && (e3.config.includes("stereo=1") || (e3.config += ";stereo=1"), true))));
        }
        function Tc(e2) {
          if (e2.connection) {
            const t2 = e2.connection.ip.indexOf(":") >= 0;
            (4 === e2.connection.version && t2 || 6 === e2.connection.version && !t2) && (e2.connection.ip = "0.0.0.0", e2.connection.version = 4);
          }
        }
        function Sc(e2) {
          return "number" == typeof e2 ? e2.toFixed(0) : e2;
        }
        const Ec = "vp8", Cc = { audioPreset: e.AudioPresets.music, dtx: true, red: true, forceStereo: false, simulcast: true, screenShareEncoding: Xs.h1080fps15.encoding, stopMicTrackOnMute: false, videoCodec: Ec, backupCodec: true, preConnectBuffer: false }, wc = { deviceId: { ideal: "default" }, autoGainControl: true, echoCancellation: true, noiseSuppression: true, voiceIsolation: true }, Rc = { deviceId: { ideal: "default" }, resolution: Qs.h720.resolution }, Pc = { adaptiveStream: false, dynacast: false, stopLocalTrackOnUnpublish: true, reconnectPolicy: new Qi(), disconnectOnPageLeave: true, webAudioMix: false, singlePeerConnection: true }, Ic = { autoSubscribe: true, maxRetries: 1, peerConnectionTimeout: 15e3, websocketTimeout: 15e3 };
        var Dc;
        !(function(e2) {
          e2[e2.NEW = 0] = "NEW", e2[e2.CONNECTING = 1] = "CONNECTING", e2[e2.CONNECTED = 2] = "CONNECTED", e2[e2.FAILED = 3] = "FAILED", e2[e2.CLOSING = 4] = "CLOSING", e2[e2.CLOSED = 5] = "CLOSED";
        })(Dc || (Dc = {}));
        class _c {
          get needsPublisher() {
            return this.isPublisherConnectionRequired;
          }
          get needsSubscriber() {
            return this.isSubscriberConnectionRequired;
          }
          get currentState() {
            return this.state;
          }
          get mode() {
            return this._mode;
          }
          constructor(t2, n2, i2) {
            var s2;
            this.peerConnectionTimeout = Ic.peerConnectionTimeout, this.log = Hi, this.updateState = () => {
              var e2, t3;
              const n3 = this.state, i3 = this.requiredTransports.map(((e3) => e3.getConnectionState()));
              i3.every(((e3) => "connected" === e3)) ? this.state = Dc.CONNECTED : i3.some(((e3) => "failed" === e3)) ? this.state = Dc.FAILED : i3.some(((e3) => "connecting" === e3)) ? this.state = Dc.CONNECTING : i3.every(((e3) => "closed" === e3)) ? this.state = Dc.CLOSED : i3.some(((e3) => "closed" === e3)) ? this.state = Dc.CLOSING : i3.every(((e3) => "new" === e3)) && (this.state = Dc.NEW), n3 !== this.state && (this.log.debug("pc state change: from ".concat(Dc[n3], " to ").concat(Dc[this.state]), this.logContext), null === (e2 = this.onStateChange) || void 0 === e2 || e2.call(this, this.state, this.publisher.getConnectionState(), null === (t3 = this.subscriber) || void 0 === t3 ? void 0 : t3.getConnectionState()));
            }, this.log = Ki(null !== (s2 = n2.loggerName) && void 0 !== s2 ? s2 : e.LoggerNames.PCManager), this.loggerOptions = n2, this.isPublisherConnectionRequired = "subscriber-primary" !== t2, this.isSubscriberConnectionRequired = "subscriber-primary" === t2, this.publisher = new yc(i2, n2), this._mode = t2, "publisher-only" !== t2 && (this.subscriber = new yc(i2, n2), this.subscriber.onConnectionStateChange = this.updateState, this.subscriber.onIceConnectionStateChange = this.updateState, this.subscriber.onSignalingStatechange = this.updateState, this.subscriber.onIceCandidate = (e2) => {
              var t3;
              null === (t3 = this.onIceCandidate) || void 0 === t3 || t3.call(this, e2, nn.SUBSCRIBER);
            }, this.subscriber.onDataChannel = (e2) => {
              var t3;
              null === (t3 = this.onDataChannel) || void 0 === t3 || t3.call(this, e2);
            }, this.subscriber.onTrack = (e2) => {
              var t3;
              null === (t3 = this.onTrack) || void 0 === t3 || t3.call(this, e2);
            }), this.publisher.onConnectionStateChange = this.updateState, this.publisher.onIceConnectionStateChange = this.updateState, this.publisher.onSignalingStatechange = this.updateState, this.publisher.onIceCandidate = (e2) => {
              var t3;
              null === (t3 = this.onIceCandidate) || void 0 === t3 || t3.call(this, e2, nn.PUBLISHER);
            }, this.publisher.onTrack = (e2) => {
              var t3;
              null === (t3 = this.onTrack) || void 0 === t3 || t3.call(this, e2);
            }, this.publisher.onOffer = (e2, t3) => {
              var n3;
              null === (n3 = this.onPublisherOffer) || void 0 === n3 || n3.call(this, e2, t3);
            }, this.state = Dc.NEW, this.connectionLock = new r(), this.remoteOfferLock = new r();
          }
          get logContext() {
            var e2, t2;
            return Object.assign({}, null === (t2 = (e2 = this.loggerOptions).loggerContextCb) || void 0 === t2 ? void 0 : t2.call(e2));
          }
          requirePublisher() {
            let e2 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            this.isPublisherConnectionRequired = e2, this.updateState();
          }
          createAndSendPublisherOffer(e2) {
            return this.publisher.createAndSendOffer(e2);
          }
          setPublisherAnswer(e2, t2) {
            return this.publisher.setRemoteDescription(e2, t2);
          }
          removeTrack(e2) {
            return this.publisher.removeTrack(e2);
          }
          close() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              if (this.publisher && "closed" !== this.publisher.getSignallingState()) {
                const e3 = this.publisher;
                for (const t2 of e3.getSenders()) try {
                  e3.canRemoveTrack() && e3.removeTrack(t2);
                } catch (e4) {
                  this.log.warn("could not removeTrack", Object.assign(Object.assign({}, this.logContext), { error: e4 }));
                }
              }
              yield Promise.all([this.publisher.close(), null === (e2 = this.subscriber) || void 0 === e2 ? void 0 : e2.close()]), this.updateState();
            }));
          }
          triggerIceRestart() {
            return Xi(this, void 0, void 0, (function* () {
              this.subscriber && (this.subscriber.restartingIce = true), this.needsPublisher && (yield this.createAndSendPublisherOffer({ iceRestart: true }));
            }));
          }
          addIceCandidate(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2;
              t2 === nn.PUBLISHER ? yield this.publisher.addIceCandidate(e2) : yield null === (n2 = this.subscriber) || void 0 === n2 ? void 0 : n2.addIceCandidate(e2);
            }));
          }
          createSubscriberAnswerFromOffer(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2, i2, r2;
              this.log.debug("received server offer", Object.assign(Object.assign({}, this.logContext), { RTCSdpType: e2.type, sdp: e2.sdp, signalingState: null === (n2 = this.subscriber) || void 0 === n2 ? void 0 : n2.getSignallingState().toString() }));
              const s2 = yield this.remoteOfferLock.lock();
              try {
                if (!(yield null === (i2 = this.subscriber) || void 0 === i2 ? void 0 : i2.setRemoteDescription(e2, t2))) return;
                return yield null === (r2 = this.subscriber) || void 0 === r2 ? void 0 : r2.createAndSetAnswer();
              } finally {
                s2();
              }
            }));
          }
          updateConfiguration(e2, t2) {
            var n2;
            this.publisher.setConfiguration(e2), null === (n2 = this.subscriber) || void 0 === n2 || n2.setConfiguration(e2), t2 && this.triggerIceRestart();
          }
          ensurePCTransportConnection(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2;
              const i2 = yield this.connectionLock.lock();
              try {
                this.isPublisherConnectionRequired && "connected" !== this.publisher.getConnectionState() && "connecting" !== this.publisher.getConnectionState() && (this.log.debug("negotiation required, start negotiating", this.logContext), this.publisher.negotiate()), yield Promise.all(null === (n2 = this.requiredTransports) || void 0 === n2 ? void 0 : n2.map(((n3) => this.ensureTransportConnected(n3, e2, t2))));
              } finally {
                i2();
              }
            }));
          }
          negotiate(e2) {
            return Xi(this, void 0, void 0, (function* () {
              return new ps(((t2, n2) => {
                const i2 = this.publisher.latestOfferId;
                if (this.publisher.latestAcknowledgedOfferId > i2) return this.log.debug("negotiation already handled in more recent acknowledged offer", this.logContext), void t2();
                let r2 = false;
                const s2 = () => {
                  r2 || (r2 = true, clearTimeout(c2), this.publisher.off(fc, a2), e2.signal.removeEventListener("abort", o2));
                }, a2 = (e3) => {
                  e3 > i2 && (s2(), t2());
                }, o2 = () => {
                  s2(), n2(new Ls("negotiation aborted"));
                }, c2 = setTimeout((() => {
                  s2(), n2(new Ls("negotiation timed out"));
                }), this.peerConnectionTimeout);
                e2.signal.addEventListener("abort", o2), this.publisher.on(fc, a2), this.publisher.negotiate(((e3) => {
                  s2(), e3 instanceof Error ? n2(e3) : n2(new Error(String(e3)));
                }));
              }));
            }));
          }
          addPublisherTransceiver(e2, t2) {
            return this.publisher.addTransceiver(e2, t2);
          }
          addPublisherTransceiverOfKind(e2, t2) {
            return this.publisher.addTransceiverOfKind(e2, t2);
          }
          getMidForReceiver(e2) {
            const t2 = (this.subscriber ? this.subscriber.getTransceivers() : this.publisher.getTransceivers()).find(((t3) => t3.receiver === e2));
            return null == t2 ? void 0 : t2.mid;
          }
          addPublisherTrack(e2) {
            return this.publisher.addTrack(e2);
          }
          createPublisherDataChannel(e2, t2) {
            return this.publisher.createDataChannel(e2, t2);
          }
          getConnectedAddress(e2) {
            return e2 === nn.PUBLISHER || e2 === nn.SUBSCRIBER ? this.publisher.getConnectedAddress() : this.requiredTransports[0].getConnectedAddress();
          }
          get requiredTransports() {
            const e2 = [];
            return this.isPublisherConnectionRequired && e2.push(this.publisher), this.isSubscriberConnectionRequired && this.subscriber && e2.push(this.subscriber), e2;
          }
          ensureTransportConnected(e2, t2) {
            return Xi(this, arguments, void 0, (function(e3, t3) {
              var n2 = this;
              let i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.peerConnectionTimeout;
              return (function* () {
                if ("connected" !== e3.getConnectionState()) return new Promise(((e4, r2) => Xi(n2, void 0, void 0, (function* () {
                  const n3 = () => {
                    this.log.warn("abort transport connection", this.logContext), js.clearTimeout(s2), r2(_s.cancelled("room connection has been cancelled"));
                  };
                  (null == t3 ? void 0 : t3.signal.aborted) && n3(), null == t3 || t3.signal.addEventListener("abort", n3);
                  const s2 = js.setTimeout((() => {
                    null == t3 || t3.signal.removeEventListener("abort", n3), r2(_s.internal("could not establish pc connection"));
                  }), i2);
                  for (; this.state !== Dc.CONNECTED; ) if (yield fa(50), null == t3 ? void 0 : t3.signal.aborted) return void r2(_s.cancelled("room connection has been cancelled"));
                  js.clearTimeout(s2), null == t3 || t3.signal.removeEventListener("abort", n3), e4();
                }))));
              })();
            }));
          }
        }
        class Mc extends Error {
          constructor(e2, t2, n2) {
            super(t2), this.code = e2, this.message = Ac(t2, Mc.MAX_MESSAGE_BYTES), this.data = n2 ? Ac(n2, Mc.MAX_DATA_BYTES) : void 0;
          }
          static fromProto(e2) {
            return new Mc(e2.code, e2.message, e2.data);
          }
          toProto() {
            return new Lt({ code: this.code, message: this.message, data: this.data });
          }
          static builtIn(e2, t2) {
            return new Mc(Mc.ErrorCode[e2], Mc.ErrorMessage[e2], t2);
          }
        }
        Mc.MAX_MESSAGE_BYTES = 256, Mc.MAX_DATA_BYTES = 15360, Mc.ErrorCode = { APPLICATION_ERROR: 1500, CONNECTION_TIMEOUT: 1501, RESPONSE_TIMEOUT: 1502, RECIPIENT_DISCONNECTED: 1503, RESPONSE_PAYLOAD_TOO_LARGE: 1504, SEND_FAILED: 1505, UNSUPPORTED_METHOD: 1400, RECIPIENT_NOT_FOUND: 1401, REQUEST_PAYLOAD_TOO_LARGE: 1402, UNSUPPORTED_SERVER: 1403, UNSUPPORTED_VERSION: 1404 }, Mc.ErrorMessage = { APPLICATION_ERROR: "Application error in method handler", CONNECTION_TIMEOUT: "Connection timeout", RESPONSE_TIMEOUT: "Response timeout", RECIPIENT_DISCONNECTED: "Recipient disconnected", RESPONSE_PAYLOAD_TOO_LARGE: "Response payload too large", SEND_FAILED: "Failed to send", UNSUPPORTED_METHOD: "Method not supported at destination", RECIPIENT_NOT_FOUND: "Recipient not found", REQUEST_PAYLOAD_TOO_LARGE: "Request payload too large", UNSUPPORTED_SERVER: "RPC not supported by server", UNSUPPORTED_VERSION: "Unsupported RPC version" };
        function Oc(e2) {
          return new TextEncoder().encode(e2).length;
        }
        function Ac(e2, t2) {
          if (Oc(e2) <= t2) return e2;
          let n2 = 0, i2 = e2.length;
          const r2 = new TextEncoder();
          for (; n2 < i2; ) {
            const s2 = Math.floor((n2 + i2 + 1) / 2);
            r2.encode(e2.slice(0, s2)).length <= t2 ? n2 = s2 : i2 = s2 - 1;
          }
          return e2.slice(0, n2);
        }
        const Nc = 2e3;
        function Lc(e2, t2) {
          if (!t2) return 0;
          let n2, i2;
          return "bytesReceived" in e2 ? (n2 = e2.bytesReceived, i2 = t2.bytesReceived) : "bytesSent" in e2 && (n2 = e2.bytesSent, i2 = t2.bytesSent), void 0 === n2 || void 0 === i2 || void 0 === e2.timestamp || void 0 === t2.timestamp ? 0 : 8 * (n2 - i2) * 1e3 / (e2.timestamp - t2.timestamp);
        }
        const xc = "undefined" != typeof MediaRecorder;
        const Uc = xc ? MediaRecorder : class {
          constructor() {
            throw new Error("MediaRecorder is not available in this environment");
          }
        };
        class Fc extends Uc {
          constructor(e2, t2) {
            if (!xc) throw new Error("MediaRecorder is not available in this environment");
            let n2, i2;
            super(new MediaStream([e2.mediaStreamTrack]), t2);
            const r2 = () => {
              this.removeEventListener("dataavailable", n2), this.removeEventListener("stop", r2), this.removeEventListener("error", s2), null == i2 || i2.close(), i2 = void 0;
            }, s2 = (e3) => {
              null == i2 || i2.error(e3), this.removeEventListener("dataavailable", n2), this.removeEventListener("stop", r2), this.removeEventListener("error", s2), i2 = void 0;
            };
            this.byteStream = new ReadableStream({ start: (e3) => {
              i2 = e3, n2 = (t3) => Xi(this, void 0, void 0, (function* () {
                let n3;
                if (t3.data.arrayBuffer) {
                  const e4 = yield t3.data.arrayBuffer();
                  n3 = new Uint8Array(e4);
                } else {
                  if (!t3.data.byteArray) throw new Error("no data available!");
                  n3 = t3.data.byteArray;
                }
                void 0 !== i2 && e3.enqueue(n3);
              })), this.addEventListener("dataavailable", n2);
            }, cancel: () => {
              r2();
            } }), this.addEventListener("stop", r2), this.addEventListener("error", s2);
          }
        }
        class Bc extends pa {
          get sender() {
            return this._sender;
          }
          set sender(e2) {
            this._sender = e2;
          }
          get constraints() {
            return this._constraints;
          }
          get hasPreConnectBuffer() {
            return !!this.localTrackRecorder;
          }
          constructor(t2, n2, i2) {
            let s2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            super(t2, n2, arguments.length > 4 ? arguments[4] : void 0), this.manuallyStopped = false, this.pendingDeviceChange = false, this._isUpstreamPaused = false, this.handleTrackMuteEvent = () => this.debouncedTrackMuteHandler().catch((() => this.log.debug("track mute bounce got cancelled by an unmute event", this.logContext))), this.debouncedTrackMuteHandler = mc((() => Xi(this, void 0, void 0, (function* () {
              yield this.pauseUpstream();
            }))), 5e3), this.handleTrackUnmuteEvent = () => Xi(this, void 0, void 0, (function* () {
              this.debouncedTrackMuteHandler.cancel("unmute"), yield this.resumeUpstream();
            })), this.handleEnded = () => {
              this.isInBackground && (this.reacquireTrack = true), this._mediaStreamTrack.removeEventListener("mute", this.handleTrackMuteEvent), this._mediaStreamTrack.removeEventListener("unmute", this.handleTrackUnmuteEvent), this.emit(e.TrackEvent.Ended, this);
            }, this.reacquireTrack = false, this.providedByUser = s2, this.muteLock = new r(), this.pauseUpstreamLock = new r(), this.trackChangeLock = new r(), this.trackChangeLock.lock().then(((e2) => Xi(this, void 0, void 0, (function* () {
              try {
                yield this.setMediaStreamTrack(t2, true);
              } finally {
                e2();
              }
            })))), this._constraints = t2.getConstraints(), i2 && (this._constraints = i2);
          }
          get id() {
            return this._mediaStreamTrack.id;
          }
          get dimensions() {
            if (this.kind !== pa.Kind.Video) return;
            const { width: e2, height: t2 } = this._mediaStreamTrack.getSettings();
            return e2 && t2 ? { width: e2, height: t2 } : void 0;
          }
          get isUpstreamPaused() {
            return this._isUpstreamPaused;
          }
          get isUserProvided() {
            return this.providedByUser;
          }
          get mediaStreamTrack() {
            var e2, t2;
            return null !== (t2 = null === (e2 = this.processor) || void 0 === e2 ? void 0 : e2.processedTrack) && void 0 !== t2 ? t2 : this._mediaStreamTrack;
          }
          get isLocal() {
            return true;
          }
          getSourceTrackSettings() {
            return this._mediaStreamTrack.getSettings();
          }
          setMediaStreamTrack(e2, t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              var i2;
              if (e2 === this._mediaStreamTrack && !t2) return;
              let r2;
              if (this._mediaStreamTrack && (this.attachedElements.forEach(((e3) => {
                ga(this._mediaStreamTrack, e3);
              })), this.debouncedTrackMuteHandler.cancel("new-track"), this._mediaStreamTrack.removeEventListener("ended", this.handleEnded), this._mediaStreamTrack.removeEventListener("mute", this.handleTrackMuteEvent), this._mediaStreamTrack.removeEventListener("unmute", this.handleTrackUnmuteEvent)), this.mediaStream = new MediaStream([e2]), e2 && (e2.addEventListener("ended", this.handleEnded), e2.addEventListener("mute", this.handleTrackMuteEvent), e2.addEventListener("unmute", this.handleTrackUnmuteEvent), this._constraints = e2.getConstraints()), this.processor && e2) {
                if (this.log.debug("restarting processor", this.logContext), "unknown" === this.kind) throw TypeError("cannot set processor on track of unknown kind");
                this.processorElement && (ma(e2, this.processorElement), this.processorElement.muted = true), yield this.processor.restart({ track: e2, kind: this.kind, element: this.processorElement, localTrack: this }), r2 = this.processor.processedTrack;
              }
              this.sender && "closed" !== (null === (i2 = this.sender.transport) || void 0 === i2 ? void 0 : i2.state) && (yield this.sender.replaceTrack(null != r2 ? r2 : e2)), this.providedByUser || this._mediaStreamTrack === e2 || this._mediaStreamTrack.stop(), this._mediaStreamTrack = e2, e2 && (this._mediaStreamTrack.enabled = !!n2 || !this.isMuted, yield this.resumeUpstream(), this.attachedElements.forEach(((t3) => {
                ma(null != r2 ? r2 : e2, t3);
              })));
            }));
          }
          waitForDimensions() {
            return Xi(this, arguments, void 0, (function() {
              var e2 = this;
              let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3;
              return (function* () {
                var n2;
                if (e2.kind === pa.Kind.Audio) throw new Error("cannot get dimensions for audio tracks");
                "iOS" === (null === (n2 = vs()) || void 0 === n2 ? void 0 : n2.os) && (yield fa(10));
                const i2 = Date.now();
                for (; Date.now() - i2 < t2; ) {
                  const t3 = e2.dimensions;
                  if (t3) return t3;
                  yield fa(50);
                }
                throw new Os("unable to get track dimensions after timeout");
              })();
            }));
          }
          setDeviceId(e2) {
            return Xi(this, void 0, void 0, (function* () {
              return this._constraints.deviceId === e2 && this._mediaStreamTrack.getSettings().deviceId === Xa(e2) || (this._constraints.deviceId = e2, this.isMuted ? (this.pendingDeviceChange = true, true) : (yield this.restartTrack(), Xa(e2) === this._mediaStreamTrack.getSettings().deviceId));
            }));
          }
          getDeviceId() {
            return Xi(this, arguments, void 0, (function() {
              var e2 = this;
              let t2 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
              return (function* () {
                if (e2.source === pa.Source.ScreenShare) return;
                const { deviceId: n2, groupId: i2 } = e2._mediaStreamTrack.getSettings(), r2 = e2.kind === pa.Kind.Audio ? "audioinput" : "videoinput";
                return t2 ? No.getInstance().normalizeDeviceId(r2, n2, i2) : n2;
              })();
            }));
          }
          mute() {
            return Xi(this, void 0, void 0, (function* () {
              return this.setTrackMuted(true), this;
            }));
          }
          unmute() {
            return Xi(this, void 0, void 0, (function* () {
              return this.setTrackMuted(false), this;
            }));
          }
          replaceTrack(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              const n2 = yield this.trackChangeLock.lock();
              try {
                if (!this.sender) throw new Os("unable to replace an unpublished track");
                let n3, i2;
                "boolean" == typeof t2 ? n3 = t2 : void 0 !== t2 && (n3 = t2.userProvidedTrack, i2 = t2.stopProcessor), this.providedByUser = null == n3 || n3, this.log.debug("replace MediaStreamTrack", this.logContext), yield this.setMediaStreamTrack(e2), i2 && this.processor && (yield this.internalStopProcessor());
              } finally {
                n2();
              }
              return yield this.onSenderTrackSwapped(), this;
            }));
          }
          onSenderTrackSwapped() {
            return Xi(this, void 0, void 0, (function* () {
            }));
          }
          restart(t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              this.manuallyStopped = false;
              const i2 = yield this.trackChangeLock.lock();
              try {
                t2 || (t2 = this._constraints);
                const { deviceId: i3, facingMode: r2 } = t2, s2 = Yi(t2, ["deviceId", "facingMode"]);
                this.log.debug("restarting track with constraints", Object.assign(Object.assign({}, this.logContext), { constraints: t2 }));
                const a2 = { audio: false, video: false };
                this.kind === pa.Kind.Video ? a2.video = !i3 && !r2 || { deviceId: i3, facingMode: r2 } : a2.audio = !i3 || Object.assign({ deviceId: i3 }, s2), this.attachedElements.forEach(((e2) => {
                  ga(this.mediaStreamTrack, e2);
                })), this._mediaStreamTrack.removeEventListener("ended", this.handleEnded), this._mediaStreamTrack.stop();
                const o2 = (yield navigator.mediaDevices.getUserMedia(a2)).getTracks()[0];
                return this.kind === pa.Kind.Video && (yield o2.applyConstraints(s2)), o2.addEventListener("ended", this.handleEnded), this.log.debug("re-acquired MediaStreamTrack", this.logContext), yield this.setMediaStreamTrack(o2, false, n2), this._constraints = t2, this.pendingDeviceChange = false, this.emit(e.TrackEvent.Restarted, this), this.manuallyStopped && (this.log.warn("track was stopped during a restart, stopping restarted track", this.logContext), this.stop()), this;
              } finally {
                i2();
              }
            }));
          }
          setTrackMuted(t2) {
            this.log.debug("setting ".concat(this.kind, " track ").concat(t2 ? "muted" : "unmuted"), this.logContext), this.isMuted === t2 && this._mediaStreamTrack.enabled !== t2 || (this.isMuted = t2, this._mediaStreamTrack.enabled = !t2, this.emit(t2 ? e.TrackEvent.Muted : e.TrackEvent.Unmuted, this));
          }
          get needsReAcquisition() {
            return "live" !== this._mediaStreamTrack.readyState || this._mediaStreamTrack.muted || !this._mediaStreamTrack.enabled || this.reacquireTrack;
          }
          handleAppVisibilityChanged() {
            const e2 = Object.create(null, { handleAppVisibilityChanged: { get: () => super.handleAppVisibilityChanged } });
            return Xi(this, void 0, void 0, (function* () {
              yield e2.handleAppVisibilityChanged.call(this), _a() && (this.log.debug("visibility changed, is in Background: ".concat(this.isInBackground), this.logContext), this.isInBackground || !this.needsReAcquisition || this.isUserProvided || this.isMuted || (this.log.debug("track needs to be reacquired, restarting ".concat(this.source), this.logContext), yield this.restart(), this.reacquireTrack = false));
            }));
          }
          stop() {
            var e2;
            this.manuallyStopped = true, super.stop(), this._mediaStreamTrack.removeEventListener("ended", this.handleEnded), this._mediaStreamTrack.removeEventListener("mute", this.handleTrackMuteEvent), this._mediaStreamTrack.removeEventListener("unmute", this.handleTrackUnmuteEvent), null === (e2 = this.processor) || void 0 === e2 || e2.destroy(), this.processor = void 0;
          }
          pauseUpstream() {
            return Xi(this, void 0, void 0, (function* () {
              var t2;
              const n2 = yield this.pauseUpstreamLock.lock();
              try {
                if (true === this._isUpstreamPaused) return;
                if (!this.sender) return void this.log.warn("unable to pause upstream for an unpublished track", this.logContext);
                this._isUpstreamPaused = true, this.emit(e.TrackEvent.UpstreamPaused, this);
                const n3 = vs();
                if ("Safari" === (null == n3 ? void 0 : n3.name) && Fa(n3.version, "12.0") < 0) throw new Ms("pauseUpstream is not supported on Safari < 12.");
                "closed" !== (null === (t2 = this.sender.transport) || void 0 === t2 ? void 0 : t2.state) && (yield this.sender.replaceTrack(null));
              } finally {
                n2();
              }
            }));
          }
          resumeUpstream() {
            return Xi(this, void 0, void 0, (function* () {
              var t2;
              const n2 = yield this.pauseUpstreamLock.lock();
              try {
                if (false === this._isUpstreamPaused) return;
                if (!this.sender) return void this.log.warn("unable to resume upstream for an unpublished track", this.logContext);
                this._isUpstreamPaused = false, this.emit(e.TrackEvent.UpstreamResumed, this), "closed" !== (null === (t2 = this.sender.transport) || void 0 === t2 ? void 0 : t2.state) && (yield this.sender.replaceTrack(this.mediaStreamTrack));
              } finally {
                n2();
              }
            }));
          }
          getRTCStatsReport() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              if (!(null === (e2 = this.sender) || void 0 === e2 ? void 0 : e2.getStats)) return;
              return yield this.sender.getStats();
            }));
          }
          setProcessor(t2) {
            return Xi(this, arguments, void 0, (function(t3) {
              var n2 = this;
              let i2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
              return (function* () {
                var r2;
                const s2 = yield n2.trackChangeLock.lock();
                try {
                  n2.log.debug("setting up processor", n2.logContext);
                  const s3 = document.createElement(n2.kind), a2 = { kind: n2.kind, track: n2._mediaStreamTrack, element: s3, audioContext: n2.audioContext, localTrack: n2 };
                  if (yield t3.init(a2), n2.log.debug("processor initialized", n2.logContext), n2.processor && (yield n2.internalStopProcessor()), "unknown" === n2.kind) throw TypeError("cannot set processor on track of unknown kind");
                  if (ma(n2._mediaStreamTrack, s3), s3.muted = true, s3.play().catch(((e2) => {
                    e2 instanceof DOMException && "AbortError" === e2.name ? (n2.log.warn("failed to play processor element, retrying", Object.assign(Object.assign({}, n2.logContext), { error: e2 })), setTimeout((() => {
                      s3.play().catch(((e3) => {
                        n2.log.error("failed to play processor element", Object.assign(Object.assign({}, n2.logContext), { err: e3 }));
                      }));
                    }), 100)) : n2.log.error("failed to play processor element", Object.assign(Object.assign({}, n2.logContext), { error: e2 }));
                  })), n2.processor = t3, n2.processorElement = s3, n2.processor.processedTrack) {
                    for (const e2 of n2.attachedElements) e2 !== n2.processorElement && i2 && (ga(n2._mediaStreamTrack, e2), ma(n2.processor.processedTrack, e2));
                    yield null === (r2 = n2.sender) || void 0 === r2 ? void 0 : r2.replaceTrack(n2.processor.processedTrack);
                  }
                  n2.emit(e.TrackEvent.TrackProcessorUpdate, n2.processor);
                } finally {
                  s2();
                }
                yield n2.onSenderTrackSwapped();
              })();
            }));
          }
          getProcessor() {
            return this.processor;
          }
          stopProcessor() {
            return Xi(this, arguments, void 0, (function() {
              var e2 = this;
              let t2 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
              return (function* () {
                const n2 = yield e2.trackChangeLock.lock();
                try {
                  yield e2.internalStopProcessor(t2);
                } finally {
                  n2();
                }
                yield e2.onSenderTrackSwapped();
              })();
            }));
          }
          internalStopProcessor() {
            return Xi(this, arguments, void 0, (function() {
              var t2 = this;
              let n2 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
              return (function* () {
                var i2, r2;
                t2.processor && (t2.log.debug("stopping processor", t2.logContext), null === (i2 = t2.processor.processedTrack) || void 0 === i2 || i2.stop(), yield t2.processor.destroy(), t2.processor = void 0, n2 || (null === (r2 = t2.processorElement) || void 0 === r2 || r2.remove(), t2.processorElement = void 0), yield t2._mediaStreamTrack.applyConstraints(t2._constraints), yield t2.setMediaStreamTrack(t2._mediaStreamTrack, true), t2.emit(e.TrackEvent.TrackProcessorUpdate));
              })();
            }));
          }
          startPreConnectBuffer() {
            let e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 100;
            if (xc) if (this.localTrackRecorder) this.log.warn("preconnect buffer already started");
            else {
              {
                let e3 = "audio/webm;codecs=opus";
                MediaRecorder.isTypeSupported(e3) || (e3 = "video/mp4"), this.localTrackRecorder = new Fc(this, { mimeType: e3 });
              }
              this.localTrackRecorder.start(e2), this.autoStopPreConnectBuffer = setTimeout((() => {
                this.log.warn("preconnect buffer timed out, stopping recording automatically", this.logContext), this.stopPreConnectBuffer();
              }), 1e4);
            }
            else this.log.warn("MediaRecorder is not available, cannot start preconnect buffer", this.logContext);
          }
          stopPreConnectBuffer() {
            clearTimeout(this.autoStopPreConnectBuffer), this.localTrackRecorder && (this.localTrackRecorder.stop(), this.localTrackRecorder = void 0);
          }
          getPreConnectBuffer() {
            var e2;
            return null === (e2 = this.localTrackRecorder) || void 0 === e2 ? void 0 : e2.byteStream;
          }
          getPreConnectBufferMimeType() {
            var e2;
            return null === (e2 = this.localTrackRecorder) || void 0 === e2 ? void 0 : e2.mimeType;
          }
        }
        class jc extends Bc {
          get enhancedNoiseCancellation() {
            return this.isKrispNoiseFilterEnabled;
          }
          constructor(t2, n2) {
            let i2 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], r2 = arguments.length > 3 ? arguments[3] : void 0, s2 = arguments.length > 4 ? arguments[4] : void 0;
            super(t2, pa.Kind.Audio, n2, i2, s2), this.stopOnMute = false, this.isKrispNoiseFilterEnabled = false, this.monitorSender = () => Xi(this, void 0, void 0, (function* () {
              if (!this.sender) return void (this._currentBitrate = 0);
              let e2;
              try {
                e2 = yield this.getSenderStats();
              } catch (e3) {
                return void this.log.error("could not get audio sender stats", Object.assign(Object.assign({}, this.logContext), { error: e3 }));
              }
              e2 && this.prevStats && (this._currentBitrate = Lc(e2, this.prevStats)), this.prevStats = e2;
            })), this.handleKrispNoiseFilterEnable = () => {
              this.isKrispNoiseFilterEnabled = true, this.log.debug("Krisp noise filter enabled", this.logContext), this.emit(e.TrackEvent.AudioTrackFeatureUpdate, this, st.TF_ENHANCED_NOISE_CANCELLATION, true);
            }, this.handleKrispNoiseFilterDisable = () => {
              this.isKrispNoiseFilterEnabled = false, this.log.debug("Krisp noise filter disabled", this.logContext), this.emit(e.TrackEvent.AudioTrackFeatureUpdate, this, st.TF_ENHANCED_NOISE_CANCELLATION, false);
            }, this.audioContext = r2, this.checkForSilence();
          }
          mute() {
            const e2 = Object.create(null, { mute: { get: () => super.mute } });
            return Xi(this, void 0, void 0, (function* () {
              const t2 = yield this.muteLock.lock();
              try {
                return this.isMuted ? (this.log.debug("Track already muted", this.logContext), this) : (this.source === pa.Source.Microphone && this.stopOnMute && !this.isUserProvided && (this.log.debug("stopping mic track", this.logContext), this._mediaStreamTrack.stop()), yield e2.mute.call(this), this);
              } finally {
                t2();
              }
            }));
          }
          unmute() {
            const e2 = Object.create(null, { unmute: { get: () => super.unmute } });
            return Xi(this, void 0, void 0, (function* () {
              const t2 = yield this.muteLock.lock();
              try {
                return this.isMuted ? (this.source !== pa.Source.Microphone || !this.stopOnMute && "ended" !== this._mediaStreamTrack.readyState && !this.pendingDeviceChange || this.isUserProvided || (this.log.debug("reacquiring mic track", this.logContext), yield this.restart(void 0, true)), yield e2.unmute.call(this), this) : (this.log.debug("Track already unmuted", this.logContext), this);
              } finally {
                t2();
              }
            }));
          }
          restartTrack(e2) {
            return Xi(this, void 0, void 0, (function* () {
              let t2;
              if (e2) {
                const n2 = ea({ audio: e2 });
                "boolean" != typeof n2.audio && (t2 = n2.audio);
              }
              yield this.restart(t2);
            }));
          }
          restart(e2, t2) {
            const n2 = Object.create(null, { restart: { get: () => super.restart } });
            return Xi(this, void 0, void 0, (function* () {
              const i2 = yield n2.restart.call(this, e2, t2);
              return this.checkForSilence(), i2;
            }));
          }
          startMonitor() {
            Ma() && (this.monitorInterval || (this.monitorInterval = setInterval((() => {
              this.monitorSender();
            }), Nc)));
          }
          setProcessor(t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2;
              const i2 = yield this.trackChangeLock.lock();
              try {
                if (!Oa() && !this.audioContext) throw Error("Audio context needs to be set on LocalAudioTrack in order to enable processors");
                this.processor && (yield this.internalStopProcessor());
                const i3 = { kind: this.kind, track: this._mediaStreamTrack, audioContext: this.audioContext, localTrack: this };
                this.log.debug("setting up audio processor ".concat(t2.name), this.logContext), yield t2.init(i3), this.processor = t2, this.processor.processedTrack && (yield null === (n2 = this.sender) || void 0 === n2 ? void 0 : n2.replaceTrack(this.processor.processedTrack), this.processor.processedTrack.addEventListener("enable-lk-krisp-noise-filter", this.handleKrispNoiseFilterEnable), this.processor.processedTrack.addEventListener("disable-lk-krisp-noise-filter", this.handleKrispNoiseFilterDisable)), this.emit(e.TrackEvent.TrackProcessorUpdate, this.processor);
              } finally {
                i2();
              }
            }));
          }
          setAudioContext(e2) {
            this.audioContext = e2;
          }
          getSenderStats() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              if (!(null === (e2 = this.sender) || void 0 === e2 ? void 0 : e2.getStats)) return;
              let t2;
              return (yield this.sender.getStats()).forEach(((e3) => {
                "outbound-rtp" === e3.type && (t2 = { type: "audio", streamId: e3.id, packetsSent: e3.packetsSent, packetsLost: e3.packetsLost, bytesSent: e3.bytesSent, timestamp: e3.timestamp, roundTripTime: e3.roundTripTime, jitter: e3.jitter });
              })), t2;
            }));
          }
          checkForSilence() {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = yield ta(this);
              return t2 && (this.isMuted || this.log.debug("silence detected on local audio track", this.logContext), this.emit(e.TrackEvent.AudioSilenceDetected)), t2;
            }));
          }
        }
        const qc = Object.values(Qs), Vc = Object.values(Ys), Hc = Object.values(Xs), Wc = [Qs.h180, Qs.h360], Kc = [Ys.h180, Ys.h360], zc = (e2) => [{ scaleResolutionDownBy: 2, fps: e2.encoding.maxFramerate }].map(((t2) => {
          var n2, i2;
          return new qs(Math.floor(e2.width / t2.scaleResolutionDownBy), Math.floor(e2.height / t2.scaleResolutionDownBy), Math.max(15e4, Math.floor(e2.encoding.maxBitrate / (Math.pow(t2.scaleResolutionDownBy, 2) * ((null !== (n2 = e2.encoding.maxFramerate) && void 0 !== n2 ? n2 : 30) / (null !== (i2 = t2.fps) && void 0 !== i2 ? i2 : 30))))), t2.fps, e2.encoding.priority);
        })), Jc = ["q", "h", "f"];
        function Gc(e2, t2, n2, i2) {
          var r2, s2;
          let a2 = null == i2 ? void 0 : i2.videoEncoding;
          e2 && (a2 = null == i2 ? void 0 : i2.screenShareEncoding);
          const o2 = null == i2 ? void 0 : i2.simulcast, c2 = null == i2 ? void 0 : i2.scalabilityMode, d2 = null == i2 ? void 0 : i2.videoCodec;
          if (!a2 && !o2 && !c2 || !t2 || !n2) return [{}];
          a2 || (a2 = (function(e3, t3, n3, i3) {
            const r3 = (function(e4, t4, n4) {
              if (e4) return Hc;
              const i4 = t4 > n4 ? t4 / n4 : n4 / t4;
              if (Math.abs(i4 - 16 / 9) < Math.abs(i4 - 4 / 3)) return qc;
              return Vc;
            })(e3, t3, n3);
            let { encoding: s3 } = r3[0];
            const a3 = Math.max(t3, n3);
            for (let e4 = 0; e4 < r3.length; e4 += 1) {
              const t4 = r3[e4];
              if (s3 = t4.encoding, t4.width >= a3) break;
            }
            if (i3) switch (i3) {
              case "av1":
              case "h265":
                s3 = Object.assign({}, s3), s3.maxBitrate = 0.7 * s3.maxBitrate;
                break;
              case "vp9":
                s3 = Object.assign({}, s3), s3.maxBitrate = 0.85 * s3.maxBitrate;
            }
            return s3;
          })(e2, t2, n2, d2), Hi.debug("using video encoding", a2));
          const l2 = a2.maxFramerate, u2 = new qs(t2, n2, a2.maxBitrate, a2.maxFramerate, a2.priority);
          if (c2 && Sa(d2)) {
            const e3 = new $c(c2), t3 = [];
            if (e3.spatial > 3) throw new Error("unsupported scalabilityMode: ".concat(c2));
            const n3 = vs();
            if (Ia() || Oa() || "Chrome" === (null == n3 ? void 0 : n3.name) && Fa(null == n3 ? void 0 : n3.version, "113") < 0) {
              const i3 = "h" == e3.suffix ? 2 : 3, r3 = (function(e4) {
                return e4 || (e4 = vs()), "Safari" === (null == e4 ? void 0 : e4.name) && Fa(e4.version, "18.3") > 0 || "iOS" === (null == e4 ? void 0 : e4.os) && !!(null == e4 ? void 0 : e4.osVersion) && Fa(e4.osVersion, "18.3") > 0;
              })(n3);
              for (let n4 = 0; n4 < e3.spatial; n4 += 1) t3.push({ rid: Jc[2 - n4], maxBitrate: a2.maxBitrate / Math.pow(i3, n4), maxFramerate: u2.encoding.maxFramerate, scaleResolutionDownBy: r3 ? Math.pow(2, n4) : void 0 });
              t3[0].scalabilityMode = c2;
            } else t3.push({ maxBitrate: a2.maxBitrate, maxFramerate: u2.encoding.maxFramerate, scalabilityMode: c2 });
            return u2.encoding.priority && (t3[0].priority = u2.encoding.priority, t3[0].networkPriority = u2.encoding.priority), Hi.debug("using svc encoding", { encodings: t3 }), t3;
          }
          if (!o2) return [a2];
          let h2, p2 = [];
          if (p2 = e2 ? null !== (r2 = Zc(null == i2 ? void 0 : i2.screenShareSimulcastLayers)) && void 0 !== r2 ? r2 : Yc(e2, u2) : null !== (s2 = Zc(null == i2 ? void 0 : i2.videoSimulcastLayers)) && void 0 !== s2 ? s2 : Yc(e2, u2), p2.length > 0) {
            const e3 = p2[0];
            p2.length > 1 && ([, h2] = p2);
            const i3 = Math.max(t2, n2);
            if (i3 >= 960 && h2) return Xc(t2, n2, [e3, h2, u2], l2);
            if (i3 >= 480) return Xc(t2, n2, [e3, u2], l2);
          }
          return Xc(t2, n2, [u2]);
        }
        function Qc(e2, t2, n2) {
          var i2, r2, s2, a2;
          if (!n2.backupCodec || true === n2.backupCodec || n2.backupCodec.codec === n2.videoCodec) return;
          t2 !== n2.backupCodec.codec && Hi.warn("requested a different codec than specified as backup", { serverRequested: t2, backup: n2.backupCodec.codec }), n2.videoCodec = t2, n2.videoEncoding = n2.backupCodec.encoding;
          const o2 = e2.mediaStreamTrack.getSettings(), c2 = null !== (i2 = o2.width) && void 0 !== i2 ? i2 : null === (r2 = e2.dimensions) || void 0 === r2 ? void 0 : r2.width, d2 = null !== (s2 = o2.height) && void 0 !== s2 ? s2 : null === (a2 = e2.dimensions) || void 0 === a2 ? void 0 : a2.height;
          e2.source === pa.Source.ScreenShare && n2.simulcast && (n2.simulcast = false);
          return Gc(e2.source === pa.Source.ScreenShare, c2, d2, n2);
        }
        function Yc(e2, t2) {
          if (e2) return zc(t2);
          const { width: n2, height: i2 } = t2, r2 = n2 > i2 ? n2 / i2 : i2 / n2;
          return Math.abs(r2 - 16 / 9) < Math.abs(r2 - 4 / 3) ? Wc : Kc;
        }
        function Xc(e2, t2, n2, i2) {
          const r2 = [];
          if (n2.forEach(((n3, s2) => {
            if (s2 >= Jc.length) return;
            const a2 = Math.min(e2, t2), o2 = { rid: Jc[s2], scaleResolutionDownBy: Math.max(1, a2 / Math.min(n3.width, n3.height)), maxBitrate: n3.encoding.maxBitrate }, c2 = i2 && n3.encoding.maxFramerate ? Math.min(i2, n3.encoding.maxFramerate) : n3.encoding.maxFramerate;
            c2 && (o2.maxFramerate = c2);
            const d2 = vs(), l2 = "Firefox" === (null == d2 ? void 0 : d2.name) && "iOS" !== d2.os || 0 === s2;
            n3.encoding.priority && l2 && (o2.priority = n3.encoding.priority, o2.networkPriority = n3.encoding.priority), r2.push(o2);
          })), Oa() && "ios" === xa()) {
            let e3;
            r2.forEach(((t4) => {
              e3 ? t4.maxFramerate && t4.maxFramerate > e3 && (e3 = t4.maxFramerate) : e3 = t4.maxFramerate;
            }));
            let t3 = true;
            r2.forEach(((n3) => {
              var i3;
              n3.maxFramerate != e3 && (t3 && (t3 = false, Hi.info("Simulcast on iOS React-Native requires all encodings to share the same framerate.")), Hi.info('Setting framerate of encoding "'.concat(null !== (i3 = n3.rid) && void 0 !== i3 ? i3 : "", '" to ').concat(e3)), n3.maxFramerate = e3);
            }));
          }
          return r2;
        }
        function Zc(e2) {
          if (e2) return e2.sort(((e3, t2) => {
            const { encoding: n2 } = e3, { encoding: i2 } = t2;
            return n2.maxBitrate > i2.maxBitrate ? 1 : n2.maxBitrate < i2.maxBitrate ? -1 : n2.maxBitrate === i2.maxBitrate && n2.maxFramerate && i2.maxFramerate ? n2.maxFramerate > i2.maxFramerate ? 1 : -1 : 0;
          }));
        }
        class $c {
          constructor(e2) {
            const t2 = e2.match(/^L(\d)T(\d)(h|_KEY|_KEY_SHIFT){0,1}$/);
            if (!t2) throw new Error("invalid scalability mode");
            if (this.spatial = parseInt(t2[1]), this.temporal = parseInt(t2[2]), t2.length > 3) switch (t2[3]) {
              case "h":
              case "_KEY":
              case "_KEY_SHIFT":
                this.suffix = t2[3];
            }
          }
          toString() {
            var e2;
            return "L".concat(this.spatial, "T").concat(this.temporal).concat(null !== (e2 = this.suffix) && void 0 !== e2 ? e2 : "");
          }
        }
        class ed extends Bc {
          get sender() {
            return this._sender;
          }
          set sender(e2) {
            this._sender = e2, this.degradationPreference && this.setDegradationPreference(this.degradationPreference);
          }
          constructor(t2, n2) {
            let i2 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], s2 = arguments.length > 3 ? arguments[3] : void 0;
            super(t2, pa.Kind.Video, n2, i2, s2), this.simulcastCodecs = /* @__PURE__ */ new Map(), this.degradationPreference = "balanced", this.isCpuConstrained = false, this.optimizeForPerformance = false, this.monitorSender = () => Xi(this, void 0, void 0, (function* () {
              if (!this.sender) return void (this._currentBitrate = 0);
              let t3;
              try {
                t3 = yield this.getSenderStats();
              } catch (e2) {
                return void this.log.error("could not get video sender stats", Object.assign(Object.assign({}, this.logContext), { error: e2 }));
              }
              const n3 = new Map(t3.map(((e2) => [e2.rid, e2]))), i3 = t3.some(((e2) => "cpu" === e2.qualityLimitationReason));
              if (i3 !== this.isCpuConstrained && (this.isCpuConstrained = i3, this.isCpuConstrained && this.emit(e.TrackEvent.CpuConstrained)), this.prevStats) {
                let e2 = 0;
                n3.forEach(((t4, n4) => {
                  var i4;
                  const r2 = null === (i4 = this.prevStats) || void 0 === i4 ? void 0 : i4.get(n4);
                  e2 += Lc(t4, r2);
                })), this._currentBitrate = e2;
              }
              this.prevStats = n3;
            })), this.senderLock = new r();
          }
          get isSimulcast() {
            return !!(this.sender && this.sender.getParameters().encodings.length > 1);
          }
          startMonitor(e2) {
            var t2;
            if (this.signalClient = e2, !Ma()) return;
            const n2 = null === (t2 = this.sender) || void 0 === t2 ? void 0 : t2.getParameters();
            n2 && (this.encodings = n2.encodings), this.monitorInterval || (this.monitorInterval = setInterval((() => {
              this.monitorSender();
            }), Nc));
          }
          stop() {
            this._mediaStreamTrack.getConstraints(), this.simulcastCodecs.forEach(((e2) => {
              e2.mediaStreamTrack.stop();
            })), super.stop();
          }
          pauseUpstream() {
            const e2 = Object.create(null, { pauseUpstream: { get: () => super.pauseUpstream } });
            return Xi(this, void 0, void 0, (function* () {
              var t2, n2, i2, r2, s2;
              yield e2.pauseUpstream.call(this);
              try {
                for (var a2, o2 = true, c2 = tr(this.simulcastCodecs.values()); !(t2 = (a2 = yield c2.next()).done); o2 = true) {
                  r2 = a2.value, o2 = false;
                  const e3 = r2;
                  yield null === (s2 = e3.sender) || void 0 === s2 ? void 0 : s2.replaceTrack(null);
                }
              } catch (e3) {
                n2 = { error: e3 };
              } finally {
                try {
                  o2 || t2 || !(i2 = c2.return) || (yield i2.call(c2));
                } finally {
                  if (n2) throw n2.error;
                }
              }
            }));
          }
          resumeUpstream() {
            const e2 = Object.create(null, { resumeUpstream: { get: () => super.resumeUpstream } });
            return Xi(this, void 0, void 0, (function* () {
              var t2, n2, i2, r2, s2;
              yield e2.resumeUpstream.call(this);
              try {
                for (var a2, o2 = true, c2 = tr(this.simulcastCodecs.values()); !(t2 = (a2 = yield c2.next()).done); o2 = true) {
                  r2 = a2.value, o2 = false;
                  const e3 = r2;
                  yield null === (s2 = e3.sender) || void 0 === s2 ? void 0 : s2.replaceTrack(e3.mediaStreamTrack);
                }
              } catch (e3) {
                n2 = { error: e3 };
              } finally {
                try {
                  o2 || t2 || !(i2 = c2.return) || (yield i2.call(c2));
                } finally {
                  if (n2) throw n2.error;
                }
              }
            }));
          }
          mute() {
            const e2 = Object.create(null, { mute: { get: () => super.mute } });
            return Xi(this, void 0, void 0, (function* () {
              const t2 = yield this.muteLock.lock();
              try {
                return this.isMuted ? (this.log.debug("Track already muted", this.logContext), this) : (this.source !== pa.Source.Camera || this.isUserProvided || (this.log.debug("stopping camera track", this.logContext), this._mediaStreamTrack.stop()), yield e2.mute.call(this), this);
              } finally {
                t2();
              }
            }));
          }
          unmute() {
            const e2 = Object.create(null, { unmute: { get: () => super.unmute } });
            return Xi(this, void 0, void 0, (function* () {
              const t2 = yield this.muteLock.lock();
              try {
                return this.isMuted ? (this.source !== pa.Source.Camera || this.isUserProvided || (this.log.debug("reacquiring camera track", this.logContext), yield this.restart(void 0, true)), yield e2.unmute.call(this), this) : (this.log.debug("Track already unmuted", this.logContext), this);
              } finally {
                t2();
              }
            }));
          }
          setTrackMuted(e2) {
            super.setTrackMuted(e2);
            for (const t2 of this.simulcastCodecs.values()) t2.mediaStreamTrack.enabled = !e2;
          }
          getSenderStats() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              if (!(null === (e2 = this.sender) || void 0 === e2 ? void 0 : e2.getStats)) return [];
              const t2 = [], n2 = yield this.sender.getStats();
              return n2.forEach(((e3) => {
                var i2;
                if ("outbound-rtp" === e3.type) {
                  const r2 = { type: "video", streamId: e3.id, frameHeight: e3.frameHeight, frameWidth: e3.frameWidth, framesPerSecond: e3.framesPerSecond, framesSent: e3.framesSent, firCount: e3.firCount, pliCount: e3.pliCount, nackCount: e3.nackCount, packetsSent: e3.packetsSent, bytesSent: e3.bytesSent, qualityLimitationReason: e3.qualityLimitationReason, qualityLimitationDurations: e3.qualityLimitationDurations, qualityLimitationResolutionChanges: e3.qualityLimitationResolutionChanges, rid: null !== (i2 = e3.rid) && void 0 !== i2 ? i2 : e3.id, retransmittedPacketsSent: e3.retransmittedPacketsSent, targetBitrate: e3.targetBitrate, timestamp: e3.timestamp }, s2 = n2.get(e3.remoteId);
                  s2 && (r2.jitter = s2.jitter, r2.packetsLost = s2.packetsLost, r2.roundTripTime = s2.roundTripTime), t2.push(r2);
                }
              })), t2.sort(((e3, t3) => {
                var n3, i2;
                return (null !== (n3 = t3.frameWidth) && void 0 !== n3 ? n3 : 0) - (null !== (i2 = e3.frameWidth) && void 0 !== i2 ? i2 : 0);
              })), t2;
            }));
          }
          setPublishingQuality(t2) {
            const n2 = [];
            for (let i2 = e.VideoQuality.LOW; i2 <= e.VideoQuality.HIGH; i2 += 1) n2.push(new qn({ quality: i2, enabled: i2 <= t2 }));
            this.log.debug("setting publishing quality. max quality ".concat(t2), this.logContext), this.setPublishingLayers(Sa(this.codec), n2);
          }
          restartTrack(e2) {
            return Xi(this, void 0, void 0, (function* () {
              var t2, n2, i2, r2, s2;
              let a2;
              if (e2) {
                const t3 = ea({ video: e2 });
                "boolean" != typeof t3.video && (a2 = t3.video);
              }
              yield this.restart(a2), this.isCpuConstrained = false;
              try {
                for (var o2, c2 = true, d2 = tr(this.simulcastCodecs.values()); !(t2 = (o2 = yield d2.next()).done); c2 = true) {
                  r2 = o2.value, c2 = false;
                  const e3 = r2;
                  e3.sender && "closed" !== (null === (s2 = e3.sender.transport) || void 0 === s2 ? void 0 : s2.state) && (e3.mediaStreamTrack = this.mediaStreamTrack.clone(), yield e3.sender.replaceTrack(e3.mediaStreamTrack));
                }
              } catch (e3) {
                n2 = { error: e3 };
              } finally {
                try {
                  c2 || t2 || !(i2 = d2.return) || (yield i2.call(d2));
                } finally {
                  if (n2) throw n2.error;
                }
              }
              yield this.onSenderTrackSwapped();
            }));
          }
          onSenderTrackSwapped() {
            return Xi(this, void 0, void 0, (function* () {
              yield this.refreshSenderEncodings();
            }));
          }
          refreshSenderEncodings() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              if (!this.sender || !this.publishOptions || this.optimizeForPerformance) return;
              const t2 = yield this.senderLock.lock();
              try {
                let t3;
                try {
                  t3 = yield this.waitForDimensions();
                } catch (e3) {
                  return void this.log.warn("could not determine new track dimensions, skipping encoding recompute", Object.assign(Object.assign({}, this.logContext), { error: e3 }));
                }
                if (this.lastEncodedDimensions && this.lastEncodedDimensions.width === t3.width && this.lastEncodedDimensions.height === t3.height) return;
                const n2 = Gc(this.source === pa.Source.ScreenShare, t3.width, t3.height, Object.assign({}, this.publishOptions));
                yield this.applyEncodingsToSender(this.sender, n2), this.encodings = n2, this.lastEncodedDimensions = t3;
                for (const [t4, n3] of this.simulcastCodecs) {
                  if (!n3.sender || "closed" === (null === (e2 = n3.sender.transport) || void 0 === e2 ? void 0 : e2.state)) continue;
                  if (!Ks(t4)) continue;
                  const i2 = Qc(this, t4, Object.assign({}, this.publishOptions));
                  i2 && (yield this.applyEncodingsToSender(n3.sender, i2), n3.encodings = i2);
                }
              } catch (e3) {
                this.log.warn("failed to apply recomputed encodings", Object.assign(Object.assign({}, this.logContext), { error: e3 }));
              } finally {
                t2();
              }
            }));
          }
          applyEncodingsToSender(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              const n2 = e2.getParameters();
              n2.encodings && n2.encodings.length === t2.length && (n2.encodings.forEach(((e3, n3) => {
                if (false === e3.active) return;
                const i2 = t2[n3];
                void 0 !== i2.scaleResolutionDownBy && (e3.scaleResolutionDownBy = i2.scaleResolutionDownBy), void 0 !== i2.maxBitrate && (e3.maxBitrate = i2.maxBitrate), void 0 !== i2.maxFramerate && (e3.maxFramerate = i2.maxFramerate), void 0 !== i2.priority && (e3.priority = i2.priority, e3.networkPriority = i2.priority);
              })), this.log.debug("updating sender encodings after track restart", Object.assign(Object.assign({}, this.logContext), { encodings: n2.encodings })), yield e2.setParameters(n2));
            }));
          }
          setProcessor(e2) {
            const t2 = Object.create(null, { setProcessor: { get: () => super.setProcessor } });
            return Xi(this, arguments, void 0, (function(e3) {
              var n2 = this;
              let i2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
              return (function* () {
                var r2, s2, a2, o2, c2, d2;
                if (yield t2.setProcessor.call(n2, e3, i2), null === (c2 = n2.processor) || void 0 === c2 ? void 0 : c2.processedTrack) try {
                  for (var l2, u2 = true, h2 = tr(n2.simulcastCodecs.values()); !(r2 = (l2 = yield h2.next()).done); u2 = true) {
                    o2 = l2.value, u2 = false;
                    const e4 = o2;
                    yield null === (d2 = e4.sender) || void 0 === d2 ? void 0 : d2.replaceTrack(n2.processor.processedTrack);
                  }
                } catch (e4) {
                  s2 = { error: e4 };
                } finally {
                  try {
                    u2 || r2 || !(a2 = h2.return) || (yield a2.call(h2));
                  } finally {
                    if (s2) throw s2.error;
                  }
                }
              })();
            }));
          }
          setDegradationPreference(e2) {
            return Xi(this, void 0, void 0, (function* () {
              if (this.degradationPreference = e2, this.sender) try {
                this.log.debug("setting degradationPreference to ".concat(e2), this.logContext);
                const t2 = this.sender.getParameters();
                t2.degradationPreference = e2, this.sender.setParameters(t2);
              } catch (e3) {
                this.log.warn("failed to set degradationPreference", Object.assign({ error: e3 }, this.logContext));
              }
            }));
          }
          addSimulcastTrack(e2, t2) {
            if (this.simulcastCodecs.has(e2)) return void this.log.error("".concat(e2, " already added, skipping adding simulcast codec"), this.logContext);
            const n2 = { codec: e2, mediaStreamTrack: this.mediaStreamTrack.clone(), sender: void 0, encodings: t2 };
            return this.simulcastCodecs.set(e2, n2), n2;
          }
          setSimulcastTrackSender(e2, t2) {
            const n2 = this.simulcastCodecs.get(e2);
            n2 && (n2.sender = t2, setTimeout((() => {
              this.subscribedCodecs && this.setPublishingCodecs(this.subscribedCodecs);
            }), 5e3));
          }
          setPublishingCodecs(e2) {
            return Xi(this, void 0, void 0, (function* () {
              var t2, n2, i2, r2, s2, a2, o2;
              if (this.log.debug("setting publishing codecs", Object.assign(Object.assign({}, this.logContext), { codecs: e2, currentCodec: this.codec })), !this.codec && e2.length > 0) return yield this.setPublishingLayers(Sa(e2[0].codec), e2[0].qualities), [];
              this.subscribedCodecs = e2;
              const c2 = [];
              try {
                for (t2 = true, n2 = tr(e2); !(r2 = (i2 = yield n2.next()).done); t2 = true) {
                  o2 = i2.value, t2 = false;
                  const e3 = o2;
                  if (this.codec && this.codec !== e3.codec) {
                    const t3 = this.simulcastCodecs.get(e3.codec);
                    if (this.log.debug("try setPublishingCodec for ".concat(e3.codec), Object.assign(Object.assign({}, this.logContext), { simulcastCodecInfo: t3 })), t3 && t3.sender) t3.encodings && (this.log.debug("try setPublishingLayersForSender ".concat(e3.codec), this.logContext), yield td(t3.sender, t3.encodings, e3.qualities, this.senderLock, Sa(e3.codec), this.log, this.logContext));
                    else for (const t4 of e3.qualities) if (t4.enabled) {
                      c2.push(e3.codec);
                      break;
                    }
                  } else yield this.setPublishingLayers(Sa(e3.codec), e3.qualities);
                }
              } catch (e3) {
                s2 = { error: e3 };
              } finally {
                try {
                  t2 || r2 || !(a2 = n2.return) || (yield a2.call(n2));
                } finally {
                  if (s2) throw s2.error;
                }
              }
              return c2;
            }));
          }
          setPublishingLayers(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              this.optimizeForPerformance ? this.log.info("skipping setPublishingLayers due to optimized publishing performance", Object.assign(Object.assign({}, this.logContext), { qualities: t2 })) : (this.log.debug("setting publishing layers", Object.assign(Object.assign({}, this.logContext), { qualities: t2 })), this.sender && this.encodings && (yield td(this.sender, this.encodings, t2, this.senderLock, e2, this.log, this.logContext)));
            }));
          }
          prioritizePerformance() {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.sender) throw new Error("sender not found");
              const e2 = yield this.senderLock.lock();
              try {
                this.optimizeForPerformance = true;
                const e3 = this.sender.getParameters();
                e3.encodings = e3.encodings.map(((e4, t2) => {
                  var n2;
                  return Object.assign(Object.assign({}, e4), { active: 0 === t2, scaleResolutionDownBy: Math.max(1, Math.ceil((null !== (n2 = this.mediaStreamTrack.getSettings().height) && void 0 !== n2 ? n2 : 360) / 360)), scalabilityMode: 0 === t2 && Sa(this.codec) ? "L1T3" : void 0, maxFramerate: 0 === t2 ? 15 : 0, maxBitrate: 0 === t2 ? e4.maxBitrate : 0 });
                })), this.log.debug("setting performance optimised encodings", Object.assign(Object.assign({}, this.logContext), { encodings: e3.encodings })), this.encodings = e3.encodings, yield this.sender.setParameters(e3);
              } catch (e3) {
                this.log.error("failed to set performance optimised encodings", Object.assign(Object.assign({}, this.logContext), { error: e3 })), this.optimizeForPerformance = false;
              } finally {
                e2();
              }
            }));
          }
          handleAppVisibilityChanged() {
            const e2 = Object.create(null, { handleAppVisibilityChanged: { get: () => super.handleAppVisibilityChanged } });
            return Xi(this, void 0, void 0, (function* () {
              yield e2.handleAppVisibilityChanged.call(this), _a() && this.isInBackground && this.source === pa.Source.Camera && (this._mediaStreamTrack.enabled = false);
            }));
          }
        }
        function td(e2, t2, n2, i2, r2, s2, a2) {
          return Xi(this, void 0, void 0, (function* () {
            const o2 = yield i2.lock();
            s2.debug("setPublishingLayersForSender", Object.assign(Object.assign({}, a2), { sender: e2, qualities: n2, senderEncodings: t2 }));
            try {
              const i3 = e2.getParameters(), { encodings: o3 } = i3;
              if (!o3) return;
              if (o3.length !== t2.length) return void s2.warn("cannot set publishing layers, encodings mismatch", Object.assign(Object.assign({}, a2), { encodings: o3, senderEncodings: t2 }));
              let c2 = false;
              if (false) ;
              else {
                if (r2) {
                  n2.some(((e3) => e3.enabled)) && n2.forEach(((e3) => e3.enabled = true));
                }
                o3.forEach(((e3, i4) => {
                  var r3;
                  let o4 = null !== (r3 = e3.rid) && void 0 !== r3 ? r3 : "";
                  "" === o4 && (o4 = "q");
                  const d2 = nd(o4), l2 = n2.find(((e4) => e4.quality === d2));
                  l2 && e3.active !== l2.enabled && (c2 = true, e3.active = l2.enabled, s2.debug("setting layer ".concat(l2.quality, " to ").concat(e3.active ? "enabled" : "disabled"), a2), wa() && (l2.enabled ? (e3.scaleResolutionDownBy = t2[i4].scaleResolutionDownBy, e3.maxBitrate = t2[i4].maxBitrate, e3.maxFrameRate = t2[i4].maxFrameRate) : (e3.scaleResolutionDownBy = 4, e3.maxBitrate = 10, e3.maxFrameRate = 2)));
                }));
              }
              c2 && (i3.encodings = o3, s2.debug("setting encodings", Object.assign(Object.assign({}, a2), { encodings: i3.encodings })), yield e2.setParameters(i3));
            } finally {
              o2();
            }
          }));
        }
        function nd(t2) {
          switch (t2) {
            case "f":
            default:
              return e.VideoQuality.HIGH;
            case "h":
              return e.VideoQuality.MEDIUM;
            case "q":
              return e.VideoQuality.LOW;
          }
        }
        function id(t2, n2, i2, r2) {
          if (!i2) return [new yt({ quality: e.VideoQuality.HIGH, width: t2, height: n2, bitrate: 0, ssrc: 0 })];
          if (r2) {
            const r3 = i2[0].scalabilityMode, s2 = new $c(r3), a2 = [], o2 = "h" == s2.suffix ? 1.5 : 2, c2 = "h" == s2.suffix ? 2 : 3;
            for (let r4 = 0; r4 < s2.spatial; r4 += 1) a2.push(new yt({ quality: Math.min(e.VideoQuality.HIGH, s2.spatial - 1) - r4, width: Math.ceil(t2 / Math.pow(o2, r4)), height: Math.ceil(n2 / Math.pow(o2, r4)), bitrate: i2[0].maxBitrate ? Math.ceil(i2[0].maxBitrate / Math.pow(c2, r4)) : 0, ssrc: 0 }));
            return a2;
          }
          return i2.map(((e2) => {
            var i3, r3, s2;
            const a2 = null !== (i3 = e2.scaleResolutionDownBy) && void 0 !== i3 ? i3 : 1;
            let o2 = nd(null !== (r3 = e2.rid) && void 0 !== r3 ? r3 : "");
            return new yt({ quality: o2, width: Math.ceil(t2 / a2), height: Math.ceil(n2 / a2), bitrate: null !== (s2 = e2.maxBitrate) && void 0 !== s2 ? s2 : 0, ssrc: 0 });
          }));
        }
        const rd = "_lossy", sd = "_reliable", ad = "_data_track", od = "leave-reconnect";
        var cd, dd;
        !(function(e2) {
          e2[e2.New = 0] = "New", e2[e2.Connected = 1] = "Connected", e2[e2.Disconnected = 2] = "Disconnected", e2[e2.Reconnecting = 3] = "Reconnecting", e2[e2.Closed = 4] = "Closed";
        })(cd || (cd = {})), (function(e2) {
          e2[e2.RELIABLE = 0] = "RELIABLE", e2[e2.LOSSY = 1] = "LOSSY", e2[e2.DATA_TRACK_LOSSY = 2] = "DATA_TRACK_LOSSY";
        })(dd || (dd = {}));
        class ld extends rr.EventEmitter {
          get isClosed() {
            return this._isClosed;
          }
          get isNewlyCreated() {
            return this._isNewlyCreated;
          }
          get pendingReconnect() {
            return !!this.reconnectTimeout;
          }
          constructor(t2) {
            var n2;
            super(), this.options = t2, this.rtcConfig = {}, this.peerConnectionTimeout = Ic.peerConnectionTimeout, this.fullReconnectOnNext = false, this.latestRemoteOfferId = 0, this.subscriberPrimary = false, this.pcState = cd.New, this._isClosed = true, this._isNewlyCreated = true, this.pendingTrackResolvers = {}, this.reconnectAttempts = 0, this.reconnectStart = 0, this.attemptingReconnect = false, this.joinAttempts = 0, this.maxJoinAttempts = 1, this.shouldFailNext = false, this.shouldFailOnV1Path = false, this.log = Hi, this.reliableDataSequence = 1, this.reliableMessageBuffer = new ec(), this.reliableReceivedState = new tc(3e4), this.lossyDataStatCurrentBytes = 0, this.lossyDataStatByterate = 0, this.lossyDataDropCount = 0, this.midToTrackId = {}, this.isWaitingForNetworkReconnect = false, this.bufferStatusLowClosingFuture = new Qa(), this.handleDataChannel = (e2) => Xi(this, [e2], void 0, (function(e3) {
              var t3 = this;
              let { channel: n3 } = e3;
              return (function* () {
                if (!n3) return;
                let e4;
                if (n3.label === sd) t3.reliableDCSub = n3, e4 = t3.handleDataMessage;
                else if (n3.label === rd) t3.lossyDCSub = n3, e4 = t3.handleDataMessage;
                else {
                  if (n3.label !== ad) return;
                  t3.dataTrackDCSub = n3, e4 = t3.handleDataTrackMessage;
                }
                t3.log.debug("on data channel ".concat(n3.id, ", ").concat(n3.label)), n3.onmessage = e4;
              })();
            })), this.handleDataMessage = (t3) => Xi(this, void 0, void 0, (function* () {
              var n3, i2, r2, s2, a2;
              const o2 = yield this.dataProcessLock.lock();
              try {
                let o3;
                if (t3.data instanceof ArrayBuffer) o3 = t3.data;
                else {
                  if (!(t3.data instanceof Blob)) return void this.log.error("unsupported data type", { data: t3.data });
                  o3 = yield t3.data.arrayBuffer();
                }
                const c2 = Tt.fromBinary(new Uint8Array(o3));
                if (c2.sequence > 0 && "" !== c2.participantSid) {
                  const e2 = this.reliableReceivedState.get(c2.participantSid);
                  if (e2 && c2.sequence <= e2) return;
                  this.reliableReceivedState.set(c2.participantSid, c2.sequence);
                }
                if ("speaker" === (null === (n3 = c2.value) || void 0 === n3 ? void 0 : n3.case)) this.emit(e.EngineEvent.ActiveSpeakersUpdate, c2.value.value.speakers);
                else if ("encryptedPacket" === (null === (i2 = c2.value) || void 0 === i2 ? void 0 : i2.case)) {
                  if (!this.e2eeManager) return void this.log.error("Received encrypted packet but E2EE not set up");
                  const t4 = yield null === (r2 = this.e2eeManager) || void 0 === r2 ? void 0 : r2.handleEncryptedData(c2.value.value.encryptedValue, c2.value.value.iv, c2.participantIdentity, c2.value.value.keyIndex), n4 = Ct.fromBinary(t4.payload), i3 = new Tt({ value: n4.value, participantIdentity: c2.participantIdentity, participantSid: c2.participantSid });
                  "user" === (null === (s2 = i3.value) || void 0 === s2 ? void 0 : s2.case) && ud(i3, i3.value.value), this.emit(e.EngineEvent.DataPacketReceived, i3, c2.value.value.encryptionType);
                } else "user" === (null === (a2 = c2.value) || void 0 === a2 ? void 0 : a2.case) && ud(c2, c2.value.value), this.emit(e.EngineEvent.DataPacketReceived, c2, mt.NONE);
              } finally {
                o2();
              }
            })), this.handleDataTrackMessage = (e2) => Xi(this, void 0, void 0, (function* () {
              let t3;
              if (e2.data instanceof ArrayBuffer) t3 = e2.data;
              else {
                if (!(e2.data instanceof Blob)) return void this.log.error("unsupported data type", { data: e2.data });
                t3 = yield e2.data.arrayBuffer();
              }
              this.emit("dataTrackPacketReceived", new Uint8Array(t3));
            })), this.handleDataError = (e2) => {
              const t3 = 0 === e2.currentTarget.maxRetransmits ? "lossy" : "reliable";
              if (e2 instanceof ErrorEvent && e2.error) {
                const { error: n3 } = e2.error;
                this.log.error("DataChannel error on ".concat(t3, ": ").concat(e2.message), { error: n3 });
              } else this.log.error("Unknown DataChannel error on ".concat(t3), { event: e2 });
            }, this.handleBufferedAmountLow = (e2) => {
              this.updateAndEmitDCBufferStatus(e2);
            }, this.handleDisconnect = (t3, n3) => {
              if (this._isClosed) return;
              this.log.warn("".concat(t3, " disconnected")), 0 === this.reconnectAttempts && (this.reconnectStart = Date.now());
              const i2 = (t4) => {
                this.log.warn("could not recover connection after ".concat(this.reconnectAttempts, " attempts, ").concat(t4, "ms. giving up")), this.emit(e.EngineEvent.Disconnected), this.close();
              }, r2 = Date.now() - this.reconnectStart;
              let s2 = this.getNextRetryDelay({ elapsedMs: r2, retryCount: this.reconnectAttempts });
              null !== s2 ? (t3 === od && (s2 = 0), this.log.debug("reconnecting in ".concat(s2, "ms")), this.clearReconnectTimeout(), this.token && this.emit(e.EngineEvent.TokenRefreshed, this.token), this.reconnectTimeout = js.setTimeout((() => this.attemptReconnect(n3).finally((() => this.reconnectTimeout = void 0))), s2)) : i2(r2);
            }, this.waitForRestarted = () => new Promise(((t3, n3) => {
              this.pcState === cd.Connected && t3();
              const i2 = () => {
                this.off(e.EngineEvent.Disconnected, r2), t3();
              }, r2 = () => {
                this.off(e.EngineEvent.Restarted, i2), n3();
              };
              this.once(e.EngineEvent.Restarted, i2), this.once(e.EngineEvent.Disconnected, r2);
            })), this.updateAndEmitDCBufferStatus = (t3) => {
              if (t3 === dd.RELIABLE) {
                const e2 = this.dataChannelForKind(t3);
                e2 && this.reliableMessageBuffer.alignBufferedAmount(e2.bufferedAmount);
              }
              const n3 = this.isBufferStatusLow(t3);
              void 0 !== n3 && n3 !== this.dcBufferStatus.get(t3) && (this.dcBufferStatus.set(t3, n3), this.emit(e.EngineEvent.DCBufferStatusChanged, n3, t3));
            }, this.isBufferStatusLow = (e2) => {
              const t3 = this.dataChannelForKind(e2);
              if (t3) return t3.bufferedAmount <= t3.bufferedAmountLowThreshold;
            }, this.handleBrowserOnLine = () => Xi(this, void 0, void 0, (function* () {
              if (!this.url) return;
              (yield fetch(Za(this.url), { method: "HEAD" }).then(((e2) => e2.ok)).catch((() => false))) && (this.log.info("detected network reconnected"), (this.client.currentState === Yo.RECONNECTING || this.isWaitingForNetworkReconnect && this.client.currentState === Yo.CONNECTED) && (this.clearReconnectTimeout(), this.attemptReconnect(it.RR_SIGNAL_DISCONNECTED), this.isWaitingForNetworkReconnect = false));
            })), this.handleBrowserOffline = () => Xi(this, void 0, void 0, (function* () {
              if (this.url) try {
                yield Promise.race([fetch(Za(this.url), { method: "HEAD" }), fa(4e3).then((() => Promise.reject()))]);
              } catch (e2) {
                false === window.navigator.onLine && (this.log.info("detected network interruption"), this.isWaitingForNetworkReconnect = true);
              }
            })), this.log = Ki(null !== (n2 = t2.loggerName) && void 0 !== n2 ? n2 : e.LoggerNames.Engine, (() => this.logContext)), this.loggerOptions = { loggerName: t2.loggerName, loggerContextCb: () => this.logContext }, this.client = new Xo(void 0, this.loggerOptions), this.client.signalLatency = this.options.expSignalLatency, this.reconnectPolicy = this.options.reconnectPolicy, this.closingLock = new r(), this.dataProcessLock = new r(), this.dcBufferStatus = /* @__PURE__ */ new Map([[dd.RELIABLE, true], [dd.LOSSY, true], [dd.DATA_TRACK_LOSSY, true]]), this.client.onParticipantUpdate = (t3) => this.emit(e.EngineEvent.ParticipantUpdate, t3), this.client.onConnectionQuality = (t3) => this.emit(e.EngineEvent.ConnectionQualityUpdate, t3), this.client.onRoomUpdate = (t3) => this.emit(e.EngineEvent.RoomUpdate, t3), this.client.onSubscriptionError = (t3) => this.emit(e.EngineEvent.SubscriptionError, t3), this.client.onSubscriptionPermissionUpdate = (t3) => this.emit(e.EngineEvent.SubscriptionPermissionUpdate, t3), this.client.onSpeakersChanged = (t3) => this.emit(e.EngineEvent.SpeakersChanged, t3), this.client.onStreamStateUpdate = (t3) => this.emit(e.EngineEvent.StreamStateChanged, t3), this.client.onRequestResponse = (t3) => this.emit(e.EngineEvent.SignalRequestResponse, t3), this.client.onParticipantUpdate = (t3) => this.emit(e.EngineEvent.ParticipantUpdate, t3), this.client.onJoined = (t3) => this.emit(e.EngineEvent.Joined, t3), this.on(e.EngineEvent.Closing, (() => {
              var e2, t3;
              null === (t3 = (e2 = this.bufferStatusLowClosingFuture).reject) || void 0 === t3 || t3.call(e2, new Ns("engine closed"));
            })), this.bufferStatusLowClosingFuture.promise.catch((() => {
            }));
          }
          get logContext() {
            var e2, t2, n2, i2, r2, s2;
            return { room: null === (t2 = null === (e2 = this.latestJoinResponse) || void 0 === e2 ? void 0 : e2.room) || void 0 === t2 ? void 0 : t2.name, roomID: null === (i2 = null === (n2 = this.latestJoinResponse) || void 0 === n2 ? void 0 : n2.room) || void 0 === i2 ? void 0 : i2.sid, participant: null === (s2 = null === (r2 = this.latestJoinResponse) || void 0 === r2 ? void 0 : r2.participant) || void 0 === s2 ? void 0 : s2.identity, participantID: this.participantSid };
          }
          join(t2, n2, i2, r2) {
            return Xi(this, arguments, void 0, (function(t3, n3, i3, r3) {
              var s2 = this;
              let a2 = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
              return (function* () {
                var o2, c2, d2;
                s2._isNewlyCreated = false, s2.url = t3, s2.token = n3, s2.signalOpts = i3, s2.maxJoinAttempts = i3.maxRetries;
                try {
                  let l2;
                  if (s2.joinAttempts += 1, s2.setupSignalClientCallbacks(), !a2 && ho()) {
                    s2.pcManager || (yield s2.configure(), s2.createDataChannels(), s2.addMediaSections(3, 3));
                    const e2 = yield null === (o2 = s2.pcManager) || void 0 === o2 ? void 0 : o2.publisher.createInitialOffer();
                    e2 && (l2 = $o(e2.offer, e2.offerId));
                  }
                  if (null == r3 ? void 0 : r3.aborted) throw _s.cancelled("Connection aborted");
                  if (!a2 && s2.shouldFailOnV1Path) throw s2.shouldFailOnV1Path = false, _s.serviceNotFound("Simulated v1 path failure", "v0-rtc");
                  const u2 = yield s2.client.join(t3, n3, i3, r3, a2, l2);
                  s2._isClosed = false, s2.latestJoinResponse = u2, s2.participantSid = null === (c2 = u2.participant) || void 0 === c2 ? void 0 : c2.sid, s2.subscriberPrimary = u2.subscriberPrimary, !a2 && ho() ? null === (d2 = s2.pcManager) || void 0 === d2 || d2.updateConfiguration(s2.makeRTCConfiguration(u2)) : (s2.pcManager || (yield s2.configure(u2, !a2)), s2.subscriberPrimary && !u2.fastPublish || s2.negotiate().catch(((e2) => {
                    s2.log.error(e2);
                  }))), s2.registerOnLineListener(), s2.clientConfiguration = u2.clientConfiguration, s2.emit(e.EngineEvent.SignalConnected, u2);
                  let h2 = u2.serverInfo;
                  return h2 || (h2 = { version: u2.serverVersion, region: u2.serverRegion }), s2.log.info("connected to Livekit Server ".concat(Object.entries(h2).map(((e2) => {
                    let [t4, n4] = e2;
                    return "".concat(t4, ": ").concat(n4);
                  })).join(", "))), { joinResponse: u2, serverInfo: h2 };
                } catch (o3) {
                  if (o3 instanceof _s) {
                    if (o3.reason === e.ConnectionErrorReason.ServerUnreachable) {
                      if (s2.log.warn("Couldn't connect to server, attempt ".concat(s2.joinAttempts, " of ").concat(s2.maxJoinAttempts)), s2.joinAttempts < s2.maxJoinAttempts) return s2.join(t3, n3, i3, r3, a2);
                    } else if (o3.reason === e.ConnectionErrorReason.ServiceNotFound) return s2.log.warn("Initial connection failed: ".concat(o3.message, " \u2013 Retrying")), s2.pcManager && (s2.pcManager.onStateChange = void 0, yield s2.cleanupPeerConnections()), s2.join(t3, n3, i3, r3, true);
                  }
                  throw o3;
                }
              })();
            }));
          }
          close() {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = yield this.closingLock.lock();
              if (this.isClosed) t2();
              else try {
                this._isClosed = true, this.joinAttempts = 0, this.emit(e.EngineEvent.Closing), this.removeAllListeners(), this.deregisterOnLineListener(), this.clearPendingReconnect(), this.cleanupLossyDataStats(), yield this.cleanupPeerConnections(), yield this.cleanupClient();
              } finally {
                t2();
              }
            }));
          }
          cleanupPeerConnections() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              yield null === (e2 = this.pcManager) || void 0 === e2 ? void 0 : e2.close(), this.pcManager = void 0;
              const t2 = (e3) => {
                e3 && (e3.close(), e3.onbufferedamountlow = null, e3.onclose = null, e3.onclosing = null, e3.onerror = null, e3.onmessage = null, e3.onopen = null);
              };
              t2(this.lossyDC), t2(this.lossyDCSub), t2(this.reliableDC), t2(this.reliableDCSub), t2(this.dataTrackDC), t2(this.dataTrackDCSub), this.lossyDC = void 0, this.lossyDCSub = void 0, this.reliableDC = void 0, this.reliableDCSub = void 0, this.dataTrackDC = void 0, this.dataTrackDCSub = void 0, this.reliableMessageBuffer = new ec(), this.reliableDataSequence = 1, this.reliableReceivedState.clear();
            }));
          }
          cleanupLossyDataStats() {
            this.lossyDataStatByterate = 0, this.lossyDataStatCurrentBytes = 0, this.lossyDataStatInterval && (clearInterval(this.lossyDataStatInterval), this.lossyDataStatInterval = void 0), this.lossyDataDropCount = 0;
          }
          cleanupClient() {
            return Xi(this, void 0, void 0, (function* () {
              yield this.client.close(), this.client.resetCallbacks();
              for (const e2 of Object.keys(this.pendingTrackResolvers)) this.pendingTrackResolvers[e2].reject();
              this.pendingTrackResolvers = {};
            }));
          }
          addTrack(e2) {
            if (this.pendingTrackResolvers[e2.cid]) throw new Os("a track with the same ID has already been published");
            return new Promise(((t2, n2) => {
              const i2 = setTimeout((() => {
                delete this.pendingTrackResolvers[e2.cid], n2(_s.timeout("publication of local track timed out, no response from server"));
              }), 1e4);
              this.pendingTrackResolvers[e2.cid] = { resolve: (e3) => {
                clearTimeout(i2), t2(e3);
              }, reject: () => {
                clearTimeout(i2), n2(new Error("Cancelled publication by calling unpublish"));
              } }, this.client.sendAddTrack(e2);
            }));
          }
          removeTrack(e2) {
            if (e2.track && this.pendingTrackResolvers[e2.track.id]) {
              const { reject: t2 } = this.pendingTrackResolvers[e2.track.id];
              t2 && t2(), delete this.pendingTrackResolvers[e2.track.id];
            }
            try {
              return this.pcManager.removeTrack(e2), true;
            } catch (e3) {
              this.log.warn("failed to remove track", { error: e3 });
            }
            return false;
          }
          updateMuteStatus(e2, t2) {
            this.client.sendMuteTrack(e2, t2);
          }
          get dataSubscriberReadyState() {
            var e2;
            return null === (e2 = this.reliableDCSub) || void 0 === e2 ? void 0 : e2.readyState;
          }
          getConnectedServerAddress() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              return null === (e2 = this.pcManager) || void 0 === e2 ? void 0 : e2.getConnectedAddress();
            }));
          }
          setRegionStrategy(e2) {
            this.regionStrategy = e2;
          }
          configure(t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              var i2;
              if (!this.pcManager || this.pcManager.currentState === Dc.NEW) {
                if (t2) {
                  this.participantSid = null === (i2 = t2.participant) || void 0 === i2 ? void 0 : i2.sid;
                  const e2 = this.makeRTCConfiguration(t2);
                  this.pcManager = new _c(n2 ? "publisher-only" : t2.subscriberPrimary ? "subscriber-primary" : "publisher-primary", this.loggerOptions, e2);
                } else {
                  const e2 = this.makeRTCConfiguration();
                  this.pcManager = new _c("publisher-only", this.loggerOptions, e2);
                }
                this.emit(e.EngineEvent.TransportsCreated, this.pcManager.publisher, this.pcManager.subscriber), this.pcManager.onIceCandidate = (e2, t3) => {
                  this.client.sendIceCandidate(e2, t3);
                }, this.pcManager.onPublisherOffer = (e2, t3) => {
                  this.client.sendOffer(e2, t3);
                }, this.pcManager.onDataChannel = this.handleDataChannel, this.pcManager.onStateChange = (t3, n3, i3) => Xi(this, void 0, void 0, (function* () {
                  if (this.log.debug("primary PC state changed ".concat(t3)), ["closed", "disconnected", "failed"].includes(n3) && (this.publisherConnectionPromise = void 0), t3 === Dc.CONNECTED) {
                    const t4 = this.pcState === cd.New;
                    this.pcState = cd.Connected, t4 && this.emit(e.EngineEvent.Connected, this.latestJoinResponse);
                  } else t3 === Dc.FAILED && (this.pcState !== cd.Connected && this.pcState !== cd.Reconnecting || (this.pcState = cd.Disconnected, this.handleDisconnect("peerconnection failed", "failed" === i3 ? it.RR_SUBSCRIBER_FAILED : it.RR_PUBLISHER_FAILED)));
                  const r2 = this.client.isDisconnected || this.client.currentState === Yo.RECONNECTING, s2 = [Dc.FAILED, Dc.CLOSING, Dc.CLOSED].includes(t3);
                  r2 && s2 && !this._isClosed && this.emit(e.EngineEvent.Offline);
                })), this.pcManager.onTrack = (t3) => {
                  0 !== t3.streams.length && this.emit(e.EngineEvent.MediaTrackAdded, t3.track, t3.streams[0], t3.receiver);
                };
              }
            }));
          }
          setupSignalClientCallbacks() {
            this.client.onAnswer = (e2, t2, n2) => Xi(this, void 0, void 0, (function* () {
              this.pcManager && (this.log.debug("received server answer", { RTCSdpType: e2.type, sdp: e2.sdp, midToTrackId: n2 }), this.midToTrackId = n2, yield this.pcManager.setPublisherAnswer(e2, t2));
            })), this.client.onTrickle = (e2, t2) => {
              this.pcManager && (this.log.debug("got ICE candidate from peer", { candidate: e2, target: t2 }), this.pcManager.addIceCandidate(e2, t2));
            }, this.client.onOffer = (e2, t2, n2) => Xi(this, void 0, void 0, (function* () {
              if (this.latestRemoteOfferId = t2, !this.pcManager) return;
              this.midToTrackId = n2;
              const i2 = yield this.pcManager.createSubscriberAnswerFromOffer(e2, t2);
              i2 && this.client.sendAnswer(i2, t2);
            })), this.client.onLocalTrackPublished = (e2) => {
              var t2;
              if (this.log.debug("received trackPublishedResponse", { cid: e2.cid, track: null === (t2 = e2.track) || void 0 === t2 ? void 0 : t2.sid }), !this.pendingTrackResolvers[e2.cid]) return void this.log.error("missing track resolver for ".concat(e2.cid), { cid: e2.cid });
              const { resolve: n2 } = this.pendingTrackResolvers[e2.cid];
              delete this.pendingTrackResolvers[e2.cid], n2(e2.track);
            }, this.client.onLocalTrackUnpublished = (t2) => {
              this.emit(e.EngineEvent.LocalTrackUnpublished, t2);
            }, this.client.onLocalTrackSubscribed = (t2) => {
              this.emit(e.EngineEvent.LocalTrackSubscribed, t2);
            }, this.client.onTokenRefresh = (t2) => {
              this.token = t2, this.emit(e.EngineEvent.TokenRefreshed, t2);
            }, this.client.onRemoteMuteChanged = (t2, n2) => {
              this.emit(e.EngineEvent.RemoteMute, t2, n2);
            }, this.client.onSubscribedQualityUpdate = (t2) => {
              this.emit(e.EngineEvent.SubscribedQualityUpdate, t2);
            }, this.client.onRoomMoved = (t2) => {
              var n2;
              this.participantSid = null === (n2 = t2.participant) || void 0 === n2 ? void 0 : n2.sid, this.latestJoinResponse && (this.latestJoinResponse.room = t2.room), this.emit(e.EngineEvent.RoomMoved, t2);
            }, this.client.onMediaSectionsRequirement = (e2) => {
              this.addMediaSections(e2.numAudios, e2.numVideos), this.negotiate();
            }, this.client.onPublishDataTrackResponse = (t2) => {
              this.emit(e.EngineEvent.PublishDataTrackResponse, t2);
            }, this.client.onUnPublishDataTrackResponse = (t2) => {
              this.emit(e.EngineEvent.UnPublishDataTrackResponse, t2);
            }, this.client.onDataTrackSubscriberHandles = (t2) => {
              this.emit(e.EngineEvent.DataTrackSubscriberHandles, t2);
            }, this.client.onClose = () => {
              this.handleDisconnect("signal", it.RR_SIGNAL_DISCONNECTED);
            }, this.client.onLeave = (t2) => {
              switch (this.log.info("client leave request received (action=".concat(null == t2 ? void 0 : t2.action, ")"), { reason: null == t2 ? void 0 : t2.reason }), t2.regions && (this.log.debug("updating regions"), this.emit(e.EngineEvent.ServerRegionsReported, t2.regions)), t2.action) {
                case Mn.DISCONNECT:
                  this.emit(e.EngineEvent.Disconnected, null == t2 ? void 0 : t2.reason), this.close();
                  break;
                case Mn.RECONNECT:
                  this.fullReconnectOnNext = true, this.handleDisconnect(od);
                  break;
                case Mn.RESUME:
                  this.handleDisconnect(od);
              }
            };
          }
          makeRTCConfiguration(e2) {
            var t2;
            const n2 = Object.assign({}, this.rtcConfig);
            if ((null === (t2 = this.signalOpts) || void 0 === t2 ? void 0 : t2.e2eeEnabled) && (this.log.debug("E2EE - setting up transports with insertable streams"), n2.encodedInsertableStreams = true), n2.sdpSemantics = "unified-plan", n2.continualGatheringPolicy = "gather_continually", !e2) return n2;
            if (e2.iceServers && !n2.iceServers) {
              const t3 = [];
              e2.iceServers.forEach(((e3) => {
                const n3 = { urls: e3.urls };
                e3.username && (n3.username = e3.username), e3.credential && (n3.credential = e3.credential), t3.push(n3);
              })), n2.iceServers = t3;
            }
            return e2.clientConfiguration && e2.clientConfiguration.forceRelay === tt.ENABLED && (n2.iceTransportPolicy = "relay"), n2;
          }
          addMediaSections(e2, t2) {
            var n2, i2;
            const r2 = { direction: "recvonly" };
            for (let t3 = 0; t3 < e2; t3++) null === (n2 = this.pcManager) || void 0 === n2 || n2.addPublisherTransceiverOfKind("audio", r2);
            for (let e3 = 0; e3 < t2; e3++) null === (i2 = this.pcManager) || void 0 === i2 || i2.addPublisherTransceiverOfKind("video", r2);
          }
          createDataChannels() {
            this.pcManager && (this.lossyDC && (this.lossyDC.onmessage = null, this.lossyDC.onerror = null), this.reliableDC && (this.reliableDC.onmessage = null, this.reliableDC.onerror = null), this.dataTrackDC && (this.dataTrackDC.onmessage = null, this.dataTrackDC.onerror = null), this.lossyDC = this.pcManager.createPublisherDataChannel(rd, { ordered: false, maxRetransmits: 0 }), this.reliableDC = this.pcManager.createPublisherDataChannel(sd, { ordered: true }), this.dataTrackDC = this.pcManager.createPublisherDataChannel(ad, { ordered: false, maxRetransmits: 0 }), this.lossyDC.onmessage = this.handleDataMessage, this.reliableDC.onmessage = this.handleDataMessage, this.dataTrackDC.onmessage = this.handleDataTrackMessage, this.lossyDC.onerror = this.handleDataError, this.reliableDC.onerror = this.handleDataError, this.dataTrackDC.onerror = this.handleDataError, this.lossyDC.bufferedAmountLowThreshold = 65535, this.reliableDC.bufferedAmountLowThreshold = 65535, this.dataTrackDC.bufferedAmountLowThreshold = 65535, this.lossyDC.onbufferedamountlow = () => this.handleBufferedAmountLow(dd.LOSSY), this.reliableDC.onbufferedamountlow = () => this.handleBufferedAmountLow(dd.RELIABLE), this.dataTrackDC.onbufferedamountlow = () => this.handleBufferedAmountLow(dd.DATA_TRACK_LOSSY), this.cleanupLossyDataStats(), this.lossyDataStatInterval = setInterval((() => {
              this.lossyDataStatByterate = this.lossyDataStatCurrentBytes, this.lossyDataStatCurrentBytes = 0;
              const e2 = this.dataChannelForKind(dd.LOSSY);
              if (e2) {
                const t2 = this.lossyDataStatByterate / 10;
                e2.bufferedAmountLowThreshold = Math.min(Math.max(t2, 8192), 262144);
              }
            }), 1e3));
          }
          createSender(e2, t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              if (ka()) {
                return yield this.createTransceiverRTCRtpSender(e2, t2, n2);
              }
              if (ya()) {
                this.log.warn("using add-track fallback");
                return yield this.createRTCRtpSender(e2.mediaStreamTrack);
              }
              throw new Ns("Required webRTC APIs not supported on this device");
            }));
          }
          createSimulcastSender(e2, t2, n2, i2) {
            return Xi(this, void 0, void 0, (function* () {
              if (ka()) return this.createSimulcastTransceiverSender(e2, t2, n2, i2);
              if (ya()) return this.log.debug("using add-track fallback"), this.createRTCRtpSender(e2.mediaStreamTrack);
              throw new Ns("Cannot stream on this device");
            }));
          }
          createTransceiverRTCRtpSender(e2, t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.pcManager) throw new Ns("publisher is closed");
              const i2 = [];
              e2.mediaStream && i2.push(e2.mediaStream), ro(e2) && (e2.codec = t2.videoCodec);
              const r2 = { direction: "sendonly", streams: i2 };
              n2 && (r2.sendEncodings = n2);
              return (yield this.pcManager.addPublisherTransceiver(e2.mediaStreamTrack, r2)).sender;
            }));
          }
          createSimulcastTransceiverSender(e2, t2, n2, i2) {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.pcManager) throw new Ns("publisher is closed");
              const r2 = { direction: "sendonly" };
              i2 && (r2.sendEncodings = i2);
              const s2 = yield this.pcManager.addPublisherTransceiver(t2.mediaStreamTrack, r2);
              if (n2.videoCodec) return e2.setSimulcastTrackSender(n2.videoCodec, s2.sender), s2.sender;
            }));
          }
          createRTCRtpSender(e2) {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.pcManager) throw new Ns("publisher is closed");
              return this.pcManager.addPublisherTrack(e2);
            }));
          }
          attemptReconnect(t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2, i2, r2;
              if (!this._isClosed) if (this.attemptingReconnect) this.log.warn("already attempting reconnect, returning early");
              else {
                (null === (n2 = this.clientConfiguration) || void 0 === n2 ? void 0 : n2.resumeConnection) !== tt.DISABLED && (null !== (r2 = null === (i2 = this.pcManager) || void 0 === i2 ? void 0 : i2.currentState) && void 0 !== r2 ? r2 : Dc.NEW) !== Dc.NEW || (this.fullReconnectOnNext = true);
                try {
                  this.attemptingReconnect = true, this.fullReconnectOnNext ? yield this.restartConnection() : yield this.resumeConnection(t2), this.clearPendingReconnect(), this.fullReconnectOnNext = false;
                } catch (t3) {
                  this.reconnectAttempts += 1;
                  let n3 = true;
                  t3 instanceof Ns ? (this.log.debug("received unrecoverable error", { error: t3 }), n3 = false) : t3 instanceof Bs || (this.fullReconnectOnNext = true), n3 ? this.handleDisconnect("reconnect", it.RR_UNKNOWN) : (this.log.info("could not recover connection after ".concat(this.reconnectAttempts, " attempts, ").concat(Date.now() - this.reconnectStart, "ms. giving up")), this.emit(e.EngineEvent.Disconnected), yield this.close());
                } finally {
                  this.attemptingReconnect = false;
                }
              }
            }));
          }
          getNextRetryDelay(e2) {
            try {
              return this.reconnectPolicy.nextRetryDelayInMs(e2);
            } catch (e3) {
              this.log.warn("encountered error in reconnect policy", { error: e3 });
            }
            return null;
          }
          restartConnection(t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2, i2, r2;
              try {
                if (!this.url || !this.token) throw new Ns("could not reconnect, url or token not saved");
                let i3;
                this.log.info("reconnecting, attempt: ".concat(this.reconnectAttempts)), this.emit(e.EngineEvent.Restarting), this.client.isDisconnected || (yield this.client.sendLeave()), yield this.cleanupPeerConnections(), yield this.cleanupClient();
                try {
                  if (!this.signalOpts) throw this.log.warn("attempted connection restart, without signal options present"), new Bs();
                  i3 = (yield this.join(null != t2 ? t2 : this.url, this.token, this.signalOpts, void 0, !this.options.singlePeerConnection)).joinResponse;
                } catch (t3) {
                  if (t3 instanceof _s && t3.reason === e.ConnectionErrorReason.NotAllowed) throw new Ns("could not reconnect, token might be expired");
                  throw new Bs();
                }
                if (this.shouldFailNext) throw this.shouldFailNext = false, new Error("simulated failure");
                if (this.client.setReconnected(), this.emit(e.EngineEvent.SignalRestarted, i3), yield this.waitForPCReconnected(), this.client.currentState !== Yo.CONNECTED) throw new Bs("Signal connection got severed during reconnect");
                null === (n2 = this.regionStrategy) || void 0 === n2 || n2.resetAttempts(), this.emit(e.EngineEvent.Restarted);
              } catch (e2) {
                const t3 = yield null === (i2 = this.regionStrategy) || void 0 === i2 ? void 0 : i2.getNextUrl();
                if (t3) return void (yield this.restartConnection(t3));
                throw null === (r2 = this.regionStrategy) || void 0 === r2 || r2.resetAttempts(), e2;
              }
            }));
          }
          resumeConnection(t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2;
              if (!this.url || !this.token) throw new Ns("could not reconnect, url or token not saved");
              if (!this.pcManager) throw new Ns("publisher and subscriber connections unset");
              let i2;
              this.log.info("resuming signal connection, attempt ".concat(this.reconnectAttempts)), this.emit(e.EngineEvent.Resuming);
              try {
                this.setupSignalClientCallbacks(), i2 = yield this.client.reconnect(this.url, this.token, this.participantSid, t2);
              } catch (t3) {
                let n3 = "";
                if (t3 instanceof Error && (n3 = t3.message, this.log.error(t3.message, { error: t3 })), t3 instanceof _s && t3.reason === e.ConnectionErrorReason.NotAllowed) throw new Ns("could not reconnect, token might be expired");
                if (t3 instanceof _s && t3.reason === e.ConnectionErrorReason.LeaveRequest) throw t3;
                throw new Bs(n3);
              }
              if (this.emit(e.EngineEvent.SignalResumed), i2) {
                const e2 = this.makeRTCConfiguration(i2);
                this.pcManager.updateConfiguration(e2), this.latestJoinResponse && (this.latestJoinResponse.serverInfo = i2.serverInfo);
              } else this.log.warn("Did not receive reconnect response");
              if (this.shouldFailNext) throw this.shouldFailNext = false, new Error("simulated failure");
              if (yield this.pcManager.triggerIceRestart(), yield this.waitForPCReconnected(), this.client.currentState !== Yo.CONNECTED) throw new Bs("Signal connection got severed during reconnect");
              this.client.setReconnected(), "open" === (null === (n2 = this.reliableDC) || void 0 === n2 ? void 0 : n2.readyState) && null === this.reliableDC.id && this.createDataChannels(), (null == i2 ? void 0 : i2.lastMessageSeq) && this.resendReliableMessagesForResume(i2.lastMessageSeq), this.emit(e.EngineEvent.Resumed);
            }));
          }
          waitForPCInitialConnection(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.pcManager) throw new Ns("PC manager is closed");
              yield this.pcManager.ensurePCTransportConnection(t2, e2);
            }));
          }
          waitForPCReconnected() {
            return Xi(this, void 0, void 0, (function* () {
              this.pcState = cd.Reconnecting, this.log.debug("waiting for peer connection to reconnect");
              try {
                if (yield fa(2e3), !this.pcManager) throw new Ns("PC manager is closed");
                yield this.pcManager.ensurePCTransportConnection(void 0, this.peerConnectionTimeout), this.pcState = cd.Connected;
              } catch (e2) {
                throw this.pcState = cd.Disconnected, _s.internal("could not establish PC connection, ".concat(e2.message));
              }
            }));
          }
          publishRpcResponse(e2, t2, n2, i2) {
            return Xi(this, void 0, void 0, (function* () {
              const r2 = new Tt({ destinationIdentities: [e2], kind: St.RELIABLE, value: { case: "rpcResponse", value: new Nt({ requestId: t2, value: i2 ? { case: "error", value: i2.toProto() } : { case: "payload", value: null != n2 ? n2 : "" } }) } });
              yield this.sendDataPacket(r2, dd.RELIABLE);
            }));
          }
          publishRpcAck(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              const n2 = new Tt({ destinationIdentities: [e2], kind: St.RELIABLE, value: { case: "rpcAck", value: new At({ requestId: t2 }) } });
              yield this.sendDataPacket(n2, dd.RELIABLE);
            }));
          }
          sendDataPacket(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              if (yield this.ensurePublisherConnected(t2), this.e2eeManager && this.e2eeManager.isDataChannelEncryptionEnabled) {
                const t3 = Io(e2);
                if (t3) {
                  const n3 = yield this.e2eeManager.encryptData(t3.toBinary());
                  e2.value = { case: "encryptedPacket", value: new Et({ encryptedValue: n3.payload, iv: n3.iv, keyIndex: n3.keyIndex }) };
                }
              }
              t2 === dd.RELIABLE && (e2.sequence = this.reliableDataSequence, this.reliableDataSequence += 1);
              const n2 = e2.toBinary();
              switch (t2) {
                case dd.LOSSY:
                case dd.DATA_TRACK_LOSSY:
                  return this.sendLossyBytes(n2, t2);
                case dd.RELIABLE:
                  const i2 = this.dataChannelForKind(t2);
                  if (i2) {
                    if (yield this.waitForBufferStatusLow(t2), this.reliableMessageBuffer.push({ data: n2, sequence: e2.sequence }), this.attemptingReconnect) return;
                    i2.send(n2);
                  }
                  this.updateAndEmitDCBufferStatus(t2);
              }
            }));
          }
          sendLossyBytes(e2, t2) {
            return Xi(this, arguments, void 0, (function(e3, t3) {
              var n2 = this;
              let i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "drop";
              return (function* () {
                yield n2.ensurePublisherConnected(t3);
                const r2 = n2.dataChannelForKind(t3);
                if (r2) {
                  if (!n2.isBufferStatusLow(t3)) switch (i2) {
                    case "wait":
                      yield n2.waitForBufferStatusLow(t3);
                      break;
                    case "drop":
                      return n2.lossyDataDropCount += 1, void (n2.lossyDataDropCount % 100 == 0 && n2.log.warn("dropping lossy data channel messages, total dropped: ".concat(n2.lossyDataDropCount)));
                  }
                  if (n2.lossyDataStatCurrentBytes += e3.byteLength, n2.attemptingReconnect) return;
                  r2.send(e3);
                }
                n2.updateAndEmitDCBufferStatus(t3);
              })();
            }));
          }
          resendReliableMessagesForResume(e2) {
            return Xi(this, void 0, void 0, (function* () {
              yield this.ensurePublisherConnected(dd.RELIABLE);
              const t2 = this.dataChannelForKind(dd.RELIABLE);
              t2 && (this.reliableMessageBuffer.popToSequence(e2), this.reliableMessageBuffer.getAll().forEach(((e3) => {
                t2.send(e3.data);
              }))), this.updateAndEmitDCBufferStatus(dd.RELIABLE);
            }));
          }
          waitForBufferStatusLow(e2) {
            return Xi(this, void 0, void 0, (function* () {
              return new ps(((t2, n2) => Xi(this, void 0, void 0, (function* () {
                if (this.isClosed && n2(new Ns("engine closed")), this.isBufferStatusLow(e2)) t2();
                else {
                  const i2 = this.dataChannelForKind(e2);
                  if (!i2) return void n2(new Ns("DataChannel not found, kind: ".concat(e2)));
                  this.bufferStatusLowClosingFuture.promise.catch(((e3) => n2(e3))), i2.addEventListener("bufferedamountlow", (() => t2()), { once: true });
                }
              }))));
            }));
          }
          ensureDataTransportConnected(e2) {
            return Xi(this, arguments, void 0, (function(e3) {
              var t2 = this;
              let n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.subscriberPrimary;
              return (function* () {
                var i2;
                if (!t2.pcManager) throw new Ns("PC manager is closed");
                const r2 = n2 ? t2.pcManager.subscriber : t2.pcManager.publisher, s2 = n2 ? "Subscriber" : "Publisher";
                if (!r2) throw _s.internal("".concat(s2, " connection not set"));
                let a2 = false;
                n2 || t2.dataChannelForKind(e3, n2) || (t2.createDataChannels(), a2 = true), a2 || n2 || t2.pcManager.publisher.isICEConnected || "checking" === t2.pcManager.publisher.getICEConnectionState() || (a2 = true), a2 && t2.negotiate().catch(((e4) => {
                  t2.log.error(e4);
                }));
                const o2 = t2.dataChannelForKind(e3, n2);
                if ("open" === (null == o2 ? void 0 : o2.readyState)) return;
                const c2 = (/* @__PURE__ */ new Date()).getTime() + t2.peerConnectionTimeout;
                for (; (/* @__PURE__ */ new Date()).getTime() < c2; ) {
                  if (r2.isICEConnected && "open" === (null === (i2 = t2.dataChannelForKind(e3, n2)) || void 0 === i2 ? void 0 : i2.readyState)) return;
                  yield fa(50);
                }
                throw _s.internal("could not establish ".concat(s2, " connection, state: ").concat(r2.getICEConnectionState()));
              })();
            }));
          }
          ensurePublisherConnected(e2) {
            return Xi(this, void 0, void 0, (function* () {
              this.publisherConnectionPromise || (this.publisherConnectionPromise = this.ensureDataTransportConnected(e2, false)), yield this.publisherConnectionPromise;
            }));
          }
          verifyTransport() {
            if (!this.pcManager) return false;
            return !![Dc.CONNECTING, Dc.CONNECTED].includes(this.pcManager.currentState) && !(!this.client.ws || this.client.ws.readyState === WebSocket.CLOSED);
          }
          negotiate() {
            return Xi(this, void 0, void 0, (function* () {
              return new ps(((t2, n2) => Xi(this, void 0, void 0, (function* () {
                if (!this.pcManager) return void n2(new Ls("PC manager is closed"));
                this.pcManager.requirePublisher(), 0 != this.pcManager.publisher.getTransceivers().length || this.lossyDC || this.reliableDC || this.dataTrackDC || this.createDataChannels();
                const i2 = new AbortController(), r2 = () => {
                  i2.abort(), this.log.debug("engine disconnected while negotiation was ongoing"), t2();
                };
                this.isClosed && n2(new Ls("cannot negotiate on closed engine")), this.on(e.EngineEvent.Closing, r2), this.on(e.EngineEvent.Restarting, r2), this.pcManager.publisher.once(kc, ((t3) => {
                  const n3 = /* @__PURE__ */ new Map();
                  t3.forEach(((e2) => {
                    const t4 = e2.codec.toLowerCase();
                    Ya(t4) && n3.set(e2.payload, t4);
                  })), this.emit(e.EngineEvent.RTPVideoMapUpdate, n3);
                }));
                try {
                  yield this.pcManager.negotiate(i2), t2();
                } catch (e2) {
                  if (i2.signal.aborted) return void t2();
                  e2 instanceof Ls && (this.fullReconnectOnNext = true), this.handleDisconnect("negotiation", it.RR_UNKNOWN), e2 instanceof Error ? n2(e2) : n2(new Error(String(e2)));
                } finally {
                  this.off(e.EngineEvent.Closing, r2), this.off(e.EngineEvent.Restarting, r2);
                }
              }))));
            }));
          }
          dataChannelForKind(e2, t2) {
            switch (e2) {
              case dd.RELIABLE:
                return t2 ? this.reliableDCSub : this.reliableDC;
              case dd.LOSSY:
                return t2 ? this.lossyDCSub : this.lossyDC;
              case dd.DATA_TRACK_LOSSY:
                return t2 ? this.dataTrackDCSub : this.dataTrackDC;
            }
          }
          sendSyncState(e2, t2, n2) {
            var i2, r2, s2, a2;
            if (!this.pcManager) return void this.log.warn("sync state cannot be sent without peer connection setup");
            const o2 = this.pcManager.publisher.getLocalDescription(), c2 = this.pcManager.publisher.getRemoteDescription(), d2 = null === (i2 = this.pcManager.subscriber) || void 0 === i2 ? void 0 : i2.getRemoteDescription(), l2 = null === (r2 = this.pcManager.subscriber) || void 0 === r2 ? void 0 : r2.getLocalDescription(), u2 = null === (a2 = null === (s2 = this.signalOpts) || void 0 === s2 ? void 0 : s2.autoSubscribe) || void 0 === a2 || a2, h2 = new Array(), p2 = new Array();
            e2.forEach(((e3) => {
              e3.isDesired !== u2 && h2.push(e3.trackSid), e3.isEnabled || p2.push(e3.trackSid);
            })), this.client.sendSyncState(new Qn({ answer: "publisher-only" === this.pcManager.mode ? c2 ? $o({ sdp: c2.sdp, type: c2.type }) : void 0 : l2 ? $o({ sdp: l2.sdp, type: l2.type }) : void 0, offer: "publisher-only" === this.pcManager.mode ? o2 ? $o({ sdp: o2.sdp, type: o2.type }) : void 0 : d2 ? $o({ sdp: d2.sdp, type: d2.type }) : void 0, subscription: new Cn({ trackSids: h2, subscribe: !u2, participantTracks: [] }), publishTracks: oa(t2), dataChannels: this.dataChannelsInfo(), trackSidsDisabled: p2, datachannelReceiveStates: this.reliableReceivedState.map(((e3, t3) => new Yn({ publisherSid: t3, lastSeq: e3 }))), publishDataTracks: n2.map(((e3) => new un({ info: Ko.toProtobuf(e3) }))) }));
          }
          failNext() {
            this.shouldFailNext = true;
          }
          failNextV1Path() {
            this.shouldFailOnV1Path = true;
          }
          dataChannelsInfo() {
            const e2 = [], t2 = (t3, n2) => {
              void 0 !== (null == t3 ? void 0 : t3.id) && null !== t3.id && e2.push(new Xn({ label: t3.label, id: t3.id, target: n2 }));
            };
            return t2(this.dataChannelForKind(dd.LOSSY), nn.PUBLISHER), t2(this.dataChannelForKind(dd.RELIABLE), nn.PUBLISHER), t2(this.dataChannelForKind(dd.LOSSY, true), nn.SUBSCRIBER), t2(this.dataChannelForKind(dd.RELIABLE, true), nn.SUBSCRIBER), e2;
          }
          clearReconnectTimeout() {
            this.reconnectTimeout && js.clearTimeout(this.reconnectTimeout);
          }
          clearPendingReconnect() {
            this.clearReconnectTimeout(), this.reconnectAttempts = 0;
          }
          registerOnLineListener() {
            Ma() && (window.addEventListener("online", this.handleBrowserOnLine), window.addEventListener("offline", this.handleBrowserOffline));
          }
          deregisterOnLineListener() {
            Ma() && (window.removeEventListener("online", this.handleBrowserOnLine), window.removeEventListener("offline", this.handleBrowserOffline));
          }
          getTrackIdForReceiver(e2) {
            var t2;
            const n2 = null === (t2 = this.pcManager) || void 0 === t2 ? void 0 : t2.getMidForReceiver(e2);
            if (n2) {
              const e3 = Object.entries(this.midToTrackId).find(((e4) => {
                let [t3] = e4;
                return t3 === n2;
              }));
              if (e3) return e3[1];
            }
          }
        }
        function ud(e2, t2) {
          const n2 = e2.participantIdentity ? e2.participantIdentity : t2.participantIdentity;
          e2.participantIdentity = n2, t2.participantIdentity = n2;
          const i2 = 0 !== e2.destinationIdentities.length ? e2.destinationIdentities : t2.destinationIdentities;
          e2.destinationIdentities = i2, t2.destinationIdentities = i2;
        }
        const hd = 5e3;
        class pd {
          static fetchRegionSettings(e2, t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              const i2 = yield pd.fetchLock.lock();
              try {
                const i3 = yield fetch("".concat((function(e3) {
                  return "".concat(e3.protocol.replace("ws", "http"), "//").concat(e3.host, "/settings");
                })(e2), "/regions"), { headers: { authorization: "Bearer ".concat(t2) }, signal: n2 });
                if (i3.ok) {
                  const e3 = (function(e4) {
                    var t4;
                    const n3 = e4.get("Cache-Control");
                    if (n3) {
                      const e5 = null === (t4 = n3.match(/(?:^|[,\s])max-age=(\d+)/)) || void 0 === t4 ? void 0 : t4[1];
                      if (e5) return parseInt(e5, 10);
                    }
                  })(i3.headers), t3 = e3 ? 1e3 * e3 : hd;
                  return { regionSettings: yield i3.json(), updatedAtInMs: Date.now(), maxAgeInMs: t3 };
                }
                throw 401 === i3.status ? _s.notAllowed("Could not fetch region settings: ".concat(i3.statusText), i3.status) : _s.internal("Could not fetch region settings: ".concat(i3.statusText));
              } catch (e3) {
                throw e3 instanceof _s ? e3 : (null == n2 ? void 0 : n2.aborted) ? _s.cancelled("Region fetching was aborted") : _s.serverUnreachable("Could not fetch region settings, ".concat(e3 instanceof Error ? "".concat(e3.name, ": ").concat(e3.message) : e3));
              } finally {
                i2();
              }
            }));
          }
          static scheduleRefetch(t2, n2, i2) {
            return Xi(this, void 0, void 0, (function* () {
              const r2 = pd.settingsTimeouts.get(t2.hostname);
              clearTimeout(r2), pd.settingsTimeouts.set(t2.hostname, setTimeout((() => Xi(this, void 0, void 0, (function* () {
                try {
                  const e2 = yield pd.fetchRegionSettings(t2, n2);
                  pd.updateCachedRegionSettings(t2, n2, e2);
                } catch (r3) {
                  if (r3 instanceof _s && r3.reason === e.ConnectionErrorReason.NotAllowed) return void Hi.debug("token is not valid, cancelling auto region refresh");
                  Hi.debug("auto refetching of region settings failed", { error: r3 }), pd.scheduleRefetch(t2, n2, i2);
                }
              }))), i2));
            }));
          }
          static updateCachedRegionSettings(e2, t2, n2) {
            pd.cache.set(e2.hostname, n2), pd.scheduleRefetch(e2, t2, n2.maxAgeInMs);
          }
          static stopRefetch(e2) {
            const t2 = pd.settingsTimeouts.get(e2);
            t2 && (clearTimeout(t2), pd.settingsTimeouts.delete(e2));
          }
          static scheduleCleanup(e2) {
            let t2 = pd.connectionTrackers.get(e2);
            t2 && (t2.cleanupTimeout && clearTimeout(t2.cleanupTimeout), t2.cleanupTimeout = setTimeout((() => {
              const t3 = pd.connectionTrackers.get(e2);
              t3 && 0 === t3.connectionCount && (Hi.debug("stopping region refetch after disconnect delay", { hostname: e2 }), pd.stopRefetch(e2)), t3 && (t3.cleanupTimeout = void 0);
            }), 3e4));
          }
          static cancelCleanup(e2) {
            const t2 = pd.connectionTrackers.get(e2);
            (null == t2 ? void 0 : t2.cleanupTimeout) && (clearTimeout(t2.cleanupTimeout), t2.cleanupTimeout = void 0);
          }
          notifyConnected() {
            const e2 = this.serverUrl.hostname;
            let t2 = pd.connectionTrackers.get(e2);
            t2 || (t2 = { connectionCount: 0 }, pd.connectionTrackers.set(e2, t2)), t2.connectionCount++, pd.cancelCleanup(e2);
          }
          notifyDisconnected() {
            const e2 = this.serverUrl.hostname, t2 = pd.connectionTrackers.get(e2);
            t2 && (t2.connectionCount = Math.max(0, t2.connectionCount - 1), 0 === t2.connectionCount && pd.scheduleCleanup(e2));
          }
          constructor(e2, t2) {
            this.attemptedRegions = [], this.serverUrl = new URL(e2), this.token = t2;
          }
          updateToken(e2) {
            var t2;
            this.token = e2;
            const n2 = this.getServerUrl(), i2 = pd.cache.get(n2.hostname);
            pd.scheduleRefetch(this.serverUrl, this.token, null !== (t2 = null == i2 ? void 0 : i2.maxAgeInMs) && void 0 !== t2 ? t2 : hd);
          }
          isCloud() {
            return Aa(this.serverUrl);
          }
          getServerUrl() {
            return this.serverUrl;
          }
          fetchRegionSettings(e2) {
            return Xi(this, void 0, void 0, (function* () {
              return pd.fetchRegionSettings(this.serverUrl, this.token, e2);
            }));
          }
          getNextBestRegionUrl(e2) {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.isCloud()) throw Error("region availability is only supported for LiveKit Cloud domains");
              let t2 = pd.cache.get(this.serverUrl.hostname);
              (!t2 || Date.now() - t2.updatedAtInMs > t2.maxAgeInMs) && (t2 = yield this.fetchRegionSettings(e2), pd.updateCachedRegionSettings(this.serverUrl, this.token, t2));
              const n2 = t2.regionSettings.regions.filter(((e3) => !this.attemptedRegions.find(((t3) => t3.url === e3.url))));
              if (n2.length > 0) {
                const e3 = n2[0];
                return this.attemptedRegions.push(e3), Hi.debug("next region: ".concat(e3.region)), e3.url;
              }
              return null;
            }));
          }
          resetAttempts() {
            this.attemptedRegions = [];
          }
          setServerReportedRegions(e2) {
            pd.updateCachedRegionSettings(this.serverUrl, this.token, e2);
          }
        }
        pd.cache = /* @__PURE__ */ new Map(), pd.settingsTimeouts = /* @__PURE__ */ new Map(), pd.connectionTrackers = /* @__PURE__ */ new Map(), pd.fetchLock = new r();
        class md {
          get info() {
            return this._info;
          }
          validateBytesReceived() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            if ("number" == typeof this.totalByteSize && 0 !== this.totalByteSize) {
              if (t2 && this.bytesReceived < this.totalByteSize) throw new Fs("Not enough chunk(s) received - expected ".concat(this.totalByteSize, " bytes of data total, only received ").concat(this.bytesReceived, " bytes"), e.DataStreamErrorReason.Incomplete);
              if (this.bytesReceived > this.totalByteSize) throw new Fs("Extra chunk(s) received - expected ".concat(this.totalByteSize, " bytes of data total, received ").concat(this.bytesReceived, " bytes"), e.DataStreamErrorReason.LengthExceeded);
            }
          }
          constructor(e2, t2, n2) {
            this.reader = t2, this.totalByteSize = n2, this._info = e2, this.bytesReceived = 0;
          }
        }
        class gd extends md {
          handleChunkReceived(e2) {
            var t2;
            this.bytesReceived += e2.content.byteLength, this.validateBytesReceived();
            const n2 = this.totalByteSize ? this.bytesReceived / this.totalByteSize : void 0;
            null === (t2 = this.onProgress) || void 0 === t2 || t2.call(this, n2);
          }
          [Symbol.asyncIterator]() {
            const e2 = this.reader.getReader();
            e2.closed.catch((() => {
            }));
            const t2 = () => {
              e2.releaseLock(), this.signal = void 0;
            };
            return { next: () => Xi(this, void 0, void 0, (function* () {
              try {
                const t3 = this.signal;
                if (null == t3 ? void 0 : t3.aborted) throw t3.reason;
                const n2 = yield new Promise(((n3, i2) => {
                  if (t3) {
                    const r2 = () => i2(t3.reason);
                    t3.addEventListener("abort", r2, { once: true }), e2.read().then(n3, i2).finally((() => {
                      t3.removeEventListener("abort", r2);
                    }));
                  } else e2.read().then(n3, i2);
                }));
                return n2.done ? (this.validateBytesReceived(true), { done: true, value: void 0 }) : (this.handleChunkReceived(n2.value), { done: false, value: n2.value.content });
              } catch (e3) {
                throw t2(), e3;
              }
            })), return() {
              return Xi(this, void 0, void 0, (function* () {
                return t2(), { done: true, value: void 0 };
              }));
            } };
          }
          withAbortSignal(e2) {
            return this.signal = e2, this;
          }
          readAll() {
            return Xi(this, arguments, void 0, (function() {
              var e2 = this;
              let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              return (function* () {
                var n2, i2, r2, s2;
                let a2 = /* @__PURE__ */ new Set();
                const o2 = t2.signal ? e2.withAbortSignal(t2.signal) : e2;
                try {
                  for (var c2, d2 = true, l2 = tr(o2); !(n2 = (c2 = yield l2.next()).done); d2 = true) {
                    s2 = c2.value, d2 = false;
                    const e3 = s2;
                    a2.add(e3);
                  }
                } catch (e3) {
                  i2 = { error: e3 };
                } finally {
                  try {
                    d2 || n2 || !(r2 = l2.return) || (yield r2.call(l2));
                  } finally {
                    if (i2) throw i2.error;
                  }
                }
                return Array.from(a2);
              })();
            }));
          }
        }
        class vd extends md {
          constructor(e2, t2, n2) {
            super(e2, t2, n2), this.receivedChunks = /* @__PURE__ */ new Map();
          }
          handleChunkReceived(e2) {
            var t2;
            const n2 = eo(e2.chunkIndex), i2 = this.receivedChunks.get(n2);
            if (i2 && i2.version > e2.version) return;
            this.receivedChunks.set(n2, e2), this.bytesReceived += e2.content.byteLength, this.validateBytesReceived();
            const r2 = this.totalByteSize ? this.bytesReceived / this.totalByteSize : void 0;
            null === (t2 = this.onProgress) || void 0 === t2 || t2.call(this, r2);
          }
          [Symbol.asyncIterator]() {
            const t2 = this.reader.getReader();
            t2.closed.catch((() => {
            }));
            const n2 = new TextDecoder("utf-8", { fatal: true }), i2 = this.signal, r2 = () => {
              t2.releaseLock(), this.signal = void 0;
            };
            return { next: () => Xi(this, void 0, void 0, (function* () {
              try {
                if (null == i2 ? void 0 : i2.aborted) throw i2.reason;
                const r3 = yield new Promise(((e2, n3) => {
                  if (i2) {
                    const r4 = () => n3(i2.reason);
                    i2.addEventListener("abort", r4, { once: true }), t2.read().then(e2, n3).finally((() => {
                      i2.removeEventListener("abort", r4);
                    }));
                  } else t2.read().then(e2, n3);
                }));
                if (r3.done) return this.validateBytesReceived(true), { done: true, value: void 0 };
                {
                  let t3;
                  this.handleChunkReceived(r3.value);
                  try {
                    t3 = n2.decode(r3.value.content);
                  } catch (t4) {
                    throw new Fs("Cannot decode datastream chunk ".concat(r3.value.chunkIndex, " as text: ").concat(t4), e.DataStreamErrorReason.DecodeFailed);
                  }
                  return { done: false, value: t3 };
                }
              } catch (e2) {
                throw r2(), e2;
              }
            })), return() {
              return Xi(this, void 0, void 0, (function* () {
                return r2(), { done: true, value: void 0 };
              }));
            } };
          }
          withAbortSignal(e2) {
            return this.signal = e2, this;
          }
          readAll() {
            return Xi(this, arguments, void 0, (function() {
              var e2 = this;
              let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              return (function* () {
                var n2, i2, r2, s2;
                let a2 = "";
                const o2 = t2.signal ? e2.withAbortSignal(t2.signal) : e2;
                try {
                  for (var c2, d2 = true, l2 = tr(o2); !(n2 = (c2 = yield l2.next()).done); d2 = true) {
                    s2 = c2.value, d2 = false;
                    a2 += s2;
                  }
                } catch (e3) {
                  i2 = { error: e3 };
                } finally {
                  try {
                    d2 || n2 || !(r2 = l2.return) || (yield r2.call(l2));
                  } finally {
                    if (i2) throw i2.error;
                  }
                }
                return a2;
              })();
            }));
          }
        }
        class fd {
          constructor() {
            this.log = Hi, this.byteStreamControllers = /* @__PURE__ */ new Map(), this.textStreamControllers = /* @__PURE__ */ new Map(), this.byteStreamHandlers = /* @__PURE__ */ new Map(), this.textStreamHandlers = /* @__PURE__ */ new Map(), this.isConnected = false, this.bufferedPackets = [];
          }
          setConnected(e2) {
            this.isConnected = e2, e2 && this.flushBufferedPackets();
          }
          flushBufferedPackets() {
            const e2 = this.bufferedPackets;
            this.bufferedPackets = [];
            for (const { packet: t2, encryptionType: n2 } of e2) this.handleDataStreamPacket(t2, n2);
          }
          registerTextStreamHandler(t2, n2) {
            if (this.textStreamHandlers.has(t2)) throw new Fs('A text stream handler for topic "'.concat(t2, '" has already been set.'), e.DataStreamErrorReason.HandlerAlreadyRegistered);
            this.textStreamHandlers.set(t2, n2);
          }
          unregisterTextStreamHandler(e2) {
            this.textStreamHandlers.delete(e2);
          }
          registerByteStreamHandler(t2, n2) {
            if (this.byteStreamHandlers.has(t2)) throw new Fs('A byte stream handler for topic "'.concat(t2, '" has already been set.'), e.DataStreamErrorReason.HandlerAlreadyRegistered);
            this.byteStreamHandlers.set(t2, n2);
          }
          unregisterByteStreamHandler(e2) {
            this.byteStreamHandlers.delete(e2);
          }
          clearControllers() {
            this.byteStreamControllers.clear(), this.textStreamControllers.clear(), this.bufferedPackets = [];
          }
          validateParticipantHasNoActiveDataStreams(t2) {
            const n2 = Array.from(this.textStreamControllers.entries()).filter(((e2) => e2[1].sendingParticipantIdentity === t2)), i2 = Array.from(this.byteStreamControllers.entries()).filter(((e2) => e2[1].sendingParticipantIdentity === t2));
            if (n2.length > 0 || i2.length > 0) {
              const r2 = new Fs("Participant ".concat(t2, " unexpectedly disconnected in the middle of sending data"), e.DataStreamErrorReason.AbnormalEnd);
              for (const [e2, t3] of i2) t3.controller.error(r2), this.byteStreamControllers.delete(e2);
              for (const [e2, t3] of n2) t3.controller.error(r2), this.textStreamControllers.delete(e2);
            }
          }
          handleDataStreamPacket(e2, t2) {
            if (this.isConnected) switch (e2.value.case) {
              case "streamHeader":
                return this.handleStreamHeader(e2.value.value, e2.participantIdentity, t2);
              case "streamChunk":
                return this.handleStreamChunk(e2.value.value, t2);
              case "streamTrailer":
                return this.handleStreamTrailer(e2.value.value, t2);
              default:
                throw new Error('DataPacket of value "'.concat(e2.value.case, '" is not data stream related!'));
            }
            else this.bufferedPackets.push({ packet: e2, encryptionType: t2 });
          }
          handleStreamHeader(t2, n2, i2) {
            var r2;
            if ("byteHeader" === t2.contentHeader.case) {
              const s2 = this.byteStreamHandlers.get(t2.topic);
              if (!s2) return void this.log.debug("ignoring incoming byte stream due to no handler for topic", t2.topic);
              let a2;
              const o2 = { id: t2.streamId, name: null !== (r2 = t2.contentHeader.value.name) && void 0 !== r2 ? r2 : "unknown", mimeType: t2.mimeType, size: t2.totalLength ? Number(t2.totalLength) : void 0, topic: t2.topic, timestamp: eo(t2.timestamp), attributes: t2.attributes, encryptionType: i2 }, c2 = new ReadableStream({ start: (i3) => {
                if (a2 = i3, this.textStreamControllers.has(t2.streamId)) throw new Fs("A data stream read is already in progress for a stream with id ".concat(t2.streamId, "."), e.DataStreamErrorReason.AlreadyOpened);
                this.byteStreamControllers.set(t2.streamId, { info: o2, controller: a2, startTime: Date.now(), sendingParticipantIdentity: n2 });
              } });
              s2(new gd(o2, c2, eo(t2.totalLength)), { identity: n2 });
            } else if ("textHeader" === t2.contentHeader.case) {
              const r3 = this.textStreamHandlers.get(t2.topic);
              if (!r3) return void this.log.debug("ignoring incoming text stream due to no handler for topic", t2.topic);
              let s2;
              const a2 = { id: t2.streamId, mimeType: t2.mimeType, size: t2.totalLength ? Number(t2.totalLength) : void 0, topic: t2.topic, timestamp: Number(t2.timestamp), attributes: t2.attributes, encryptionType: i2, attachedStreamIds: t2.contentHeader.value.attachedStreamIds }, o2 = new ReadableStream({ start: (i3) => {
                if (s2 = i3, this.textStreamControllers.has(t2.streamId)) throw new Fs("A data stream read is already in progress for a stream with id ".concat(t2.streamId, "."), e.DataStreamErrorReason.AlreadyOpened);
                this.textStreamControllers.set(t2.streamId, { info: a2, controller: s2, startTime: Date.now(), sendingParticipantIdentity: n2 });
              } });
              r3(new vd(a2, o2, eo(t2.totalLength)), { identity: n2 });
            }
          }
          handleStreamChunk(t2, n2) {
            const i2 = this.byteStreamControllers.get(t2.streamId);
            i2 && (i2.info.encryptionType !== n2 ? (i2.controller.error(new Fs("Encryption type mismatch for stream ".concat(t2.streamId, ". Expected ").concat(n2, ", got ").concat(i2.info.encryptionType), e.DataStreamErrorReason.EncryptionTypeMismatch)), this.byteStreamControllers.delete(t2.streamId)) : t2.content.length > 0 && i2.controller.enqueue(t2));
            const r2 = this.textStreamControllers.get(t2.streamId);
            r2 && (r2.info.encryptionType !== n2 ? (r2.controller.error(new Fs("Encryption type mismatch for stream ".concat(t2.streamId, ". Expected ").concat(n2, ", got ").concat(r2.info.encryptionType), e.DataStreamErrorReason.EncryptionTypeMismatch)), this.textStreamControllers.delete(t2.streamId)) : t2.content.length > 0 && r2.controller.enqueue(t2));
          }
          handleStreamTrailer(t2, n2) {
            const i2 = this.textStreamControllers.get(t2.streamId);
            i2 && (i2.info.encryptionType !== n2 ? i2.controller.error(new Fs("Encryption type mismatch for stream ".concat(t2.streamId, ". Expected ").concat(n2, ", got ").concat(i2.info.encryptionType), e.DataStreamErrorReason.EncryptionTypeMismatch)) : (i2.info.attributes = Object.assign(Object.assign({}, i2.info.attributes), t2.attributes), i2.controller.close(), this.textStreamControllers.delete(t2.streamId)));
            const r2 = this.byteStreamControllers.get(t2.streamId);
            r2 && (r2.info.encryptionType !== n2 ? r2.controller.error(new Fs("Encryption type mismatch for stream ".concat(t2.streamId, ". Expected ").concat(n2, ", got ").concat(r2.info.encryptionType), e.DataStreamErrorReason.EncryptionTypeMismatch)) : (r2.info.attributes = Object.assign(Object.assign({}, r2.info.attributes), t2.attributes), r2.controller.close()), this.byteStreamControllers.delete(t2.streamId));
          }
        }
        class kd {
          constructor(e2, t2, n2) {
            this.writableStream = e2, this.defaultWriter = e2.getWriter(), this.onClose = n2, this.info = t2;
          }
          write(e2) {
            return this.defaultWriter.write(e2);
          }
          close() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              yield this.defaultWriter.close(), this.defaultWriter.releaseLock(), null === (e2 = this.onClose) || void 0 === e2 || e2.call(this);
            }));
          }
        }
        class yd extends kd {
        }
        class bd extends kd {
        }
        class Td {
          constructor(e2, t2) {
            this.engine = e2, this.log = t2;
          }
          setupEngine(e2) {
            this.engine = e2;
          }
          sendText(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2;
              const i2 = crypto.randomUUID(), r2 = new TextEncoder().encode(e2).byteLength, s2 = null === (n2 = null == t2 ? void 0 : t2.attachments) || void 0 === n2 ? void 0 : n2.map((() => crypto.randomUUID())), a2 = new Array(s2 ? s2.length + 1 : 1).fill(0), o2 = (e3, n3) => {
                var i3;
                a2[n3] = e3;
                const r3 = a2.reduce(((e4, t3) => e4 + t3), 0);
                null === (i3 = null == t2 ? void 0 : t2.onProgress) || void 0 === i3 || i3.call(t2, r3);
              }, c2 = yield this.streamText({ streamId: i2, totalSize: r2, destinationIdentities: null == t2 ? void 0 : t2.destinationIdentities, topic: null == t2 ? void 0 : t2.topic, attachedStreamIds: s2, attributes: null == t2 ? void 0 : t2.attributes });
              return yield c2.write(e2), o2(1, 0), yield c2.close(), (null == t2 ? void 0 : t2.attachments) && s2 && (yield Promise.all(t2.attachments.map(((e3, n3) => Xi(this, void 0, void 0, (function* () {
                return this._sendFile(s2[n3], e3, { topic: t2.topic, mimeType: e3.type, onProgress: (e4) => {
                  o2(e4, n3 + 1);
                } });
              })))))), c2.info;
            }));
          }
          streamText(t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2, i2, r2;
              const s2 = null !== (n2 = null == t2 ? void 0 : t2.streamId) && void 0 !== n2 ? n2 : crypto.randomUUID(), a2 = { id: s2, mimeType: "text/plain", timestamp: Date.now(), topic: null !== (i2 = null == t2 ? void 0 : t2.topic) && void 0 !== i2 ? i2 : "", size: null == t2 ? void 0 : t2.totalSize, attributes: null == t2 ? void 0 : t2.attributes, encryptionType: (null === (r2 = this.engine.e2eeManager) || void 0 === r2 ? void 0 : r2.isDataChannelEncryptionEnabled) ? mt.GCM : mt.NONE, attachedStreamIds: null == t2 ? void 0 : t2.attachedStreamIds }, o2 = new Gt({ streamId: s2, mimeType: a2.mimeType, topic: a2.topic, timestamp: to(a2.timestamp), totalLength: to(a2.size), attributes: a2.attributes, contentHeader: { case: "textHeader", value: new zt({ version: null == t2 ? void 0 : t2.version, attachedStreamIds: a2.attachedStreamIds, replyToStreamId: null == t2 ? void 0 : t2.replyToStreamId, operationType: "update" === (null == t2 ? void 0 : t2.type) ? Kt.UPDATE : Kt.CREATE }) } }), c2 = null == t2 ? void 0 : t2.destinationIdentities, d2 = new Tt({ destinationIdentities: c2, value: { case: "streamHeader", value: o2 } });
              yield this.engine.sendDataPacket(d2, dd.RELIABLE);
              let l2 = 0;
              const u2 = this.engine, h2 = new WritableStream({ write(e2) {
                return Xi(this, void 0, void 0, (function* () {
                  for (const t3 of (function(e3, t4) {
                    const n3 = [];
                    let i3 = new TextEncoder().encode(e3);
                    for (; i3.length > t4; ) {
                      let e4 = t4;
                      for (; e4 > 0; ) {
                        const t5 = i3[e4];
                        if (void 0 !== t5 && 128 != (192 & t5)) break;
                        e4--;
                      }
                      n3.push(i3.slice(0, e4)), i3 = i3.slice(e4);
                    }
                    return i3.length > 0 && n3.push(i3), n3;
                  })(e2, 15e3)) {
                    const e3 = new Qt({ content: t3, streamId: s2, chunkIndex: to(l2) }), n3 = new Tt({ destinationIdentities: c2, value: { case: "streamChunk", value: e3 } });
                    yield u2.sendDataPacket(n3, dd.RELIABLE), l2 += 1;
                  }
                }));
              }, close() {
                return Xi(this, void 0, void 0, (function* () {
                  const e2 = new Yt({ streamId: s2 }), t3 = new Tt({ destinationIdentities: c2, value: { case: "streamTrailer", value: e2 } });
                  yield u2.sendDataPacket(t3, dd.RELIABLE);
                }));
              }, abort(e2) {
                console.log("Sink error:", e2);
              } });
              let p2 = () => Xi(this, void 0, void 0, (function* () {
                yield m2.close();
              }));
              u2.once(e.EngineEvent.Closing, p2);
              const m2 = new yd(h2, a2, (() => this.engine.off(e.EngineEvent.Closing, p2)));
              return m2;
            }));
          }
          sendFile(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              const n2 = crypto.randomUUID();
              return yield this._sendFile(n2, e2, t2), { id: n2 };
            }));
          }
          _sendFile(e2, t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              var i2;
              const r2 = yield this.streamBytes({ streamId: e2, totalSize: t2.size, name: t2.name, mimeType: null !== (i2 = null == n2 ? void 0 : n2.mimeType) && void 0 !== i2 ? i2 : t2.type, topic: null == n2 ? void 0 : n2.topic, destinationIdentities: null == n2 ? void 0 : n2.destinationIdentities }), s2 = t2.stream().getReader();
              for (; ; ) {
                const { done: e3, value: t3 } = yield s2.read();
                if (e3) break;
                yield r2.write(t3);
              }
              return yield r2.close(), r2.info;
            }));
          }
          streamBytes(e2) {
            return Xi(this, void 0, void 0, (function* () {
              var t2, n2, i2, s2, a2;
              const o2 = null !== (t2 = null == e2 ? void 0 : e2.streamId) && void 0 !== t2 ? t2 : crypto.randomUUID(), c2 = null == e2 ? void 0 : e2.destinationIdentities, d2 = { id: o2, mimeType: null !== (n2 = null == e2 ? void 0 : e2.mimeType) && void 0 !== n2 ? n2 : "application/octet-stream", topic: null !== (i2 = null == e2 ? void 0 : e2.topic) && void 0 !== i2 ? i2 : "", timestamp: Date.now(), attributes: null == e2 ? void 0 : e2.attributes, size: null == e2 ? void 0 : e2.totalSize, name: null !== (s2 = null == e2 ? void 0 : e2.name) && void 0 !== s2 ? s2 : "unknown", encryptionType: (null === (a2 = this.engine.e2eeManager) || void 0 === a2 ? void 0 : a2.isDataChannelEncryptionEnabled) ? mt.GCM : mt.NONE }, l2 = new Gt({ totalLength: to(d2.size), mimeType: d2.mimeType, streamId: o2, topic: d2.topic, timestamp: to(Date.now()), attributes: d2.attributes, contentHeader: { case: "byteHeader", value: new Jt({ name: d2.name }) } }), u2 = new Tt({ destinationIdentities: c2, value: { case: "streamHeader", value: l2 } });
              yield this.engine.sendDataPacket(u2, dd.RELIABLE);
              let h2 = 0;
              const p2 = new r(), m2 = this.engine, g2 = this.log, v2 = new WritableStream({ write(e3) {
                return Xi(this, void 0, void 0, (function* () {
                  const t3 = yield p2.lock();
                  let n3 = 0;
                  try {
                    for (; n3 < e3.byteLength; ) {
                      const t4 = e3.slice(n3, n3 + 15e3), i3 = new Tt({ destinationIdentities: c2, value: { case: "streamChunk", value: new Qt({ content: t4, streamId: o2, chunkIndex: to(h2) }) } });
                      yield m2.sendDataPacket(i3, dd.RELIABLE), h2 += 1, n3 += t4.byteLength;
                    }
                  } finally {
                    t3();
                  }
                }));
              }, close() {
                return Xi(this, void 0, void 0, (function* () {
                  const e3 = new Yt({ streamId: o2 }), t3 = new Tt({ destinationIdentities: c2, value: { case: "streamTrailer", value: e3 } });
                  yield m2.sendDataPacket(t3, dd.RELIABLE);
                }));
              }, abort(e3) {
                g2.error("Sink error:", e3);
              } });
              return new bd(v2, d2);
            }));
          }
        }
        function Sd(e2) {
          if (0 === e2.length) {
            return new AbortController().signal;
          }
          if (1 === e2.length) return e2[0];
          for (const t3 of e2) if (t3.aborted) return t3;
          const t2 = new AbortController(), n2 = Array(e2.length);
          return e2.forEach(((e3, i2) => {
            const r2 = () => {
              t2.abort(e3.reason), (() => {
                for (const e4 of n2) e4();
              })();
            };
            e3.addEventListener("abort", r2), n2[i2] = () => e3.removeEventListener("abort", r2);
          })), t2.signal;
        }
        function Ed(e2) {
          const t2 = new AbortController();
          return setTimeout((() => {
            t2.abort(new DOMException("signal timed out after ".concat(e2, " ms"), "TimeoutError"));
          }), e2), t2.signal;
        }
        var Cd, wd, Rd;
        !(function(e2) {
          e2[e2.TooShort = 0] = "TooShort", e2[e2.HeaderOverrun = 1] = "HeaderOverrun", e2[e2.MissingExtWords = 2] = "MissingExtWords", e2[e2.UnsupportedVersion = 3] = "UnsupportedVersion", e2[e2.InvalidHandle = 4] = "InvalidHandle", e2[e2.MalformedExt = 5] = "MalformedExt";
        })(Cd || (Cd = {}));
        class Pd extends Ss {
          constructor(e2, t2, n2) {
            super(19, e2, n2), this.name = "DataTrackDeserializeError", this.reason = t2, this.reasonName = Cd[t2];
          }
          static tooShort() {
            return new Pd("Too short to contain a valid header", Cd.TooShort);
          }
          static headerOverrun() {
            return new Pd("Header exceeds total packet length", Cd.HeaderOverrun);
          }
          static missingExtWords() {
            return new Pd("Extension word indicator is missing", Cd.MissingExtWords);
          }
          static unsupportedVersion(e2) {
            return new Pd("Unsupported version ".concat(e2), Cd.UnsupportedVersion);
          }
          static invalidHandle(e2) {
            return new Pd("invalid track handle: ".concat(e2.message), Cd.InvalidHandle, { cause: e2 });
          }
          static malformedExt(e2) {
            return new Pd("Extension with tag ".concat(e2, " is malformed"), Cd.MalformedExt);
          }
        }
        !(function(e2) {
          e2[e2.TooSmallForHeader = 0] = "TooSmallForHeader", e2[e2.TooSmallForPayload = 1] = "TooSmallForPayload";
        })(wd || (wd = {}));
        class Id extends Ss {
          constructor(e2, t2, n2) {
            super(19, e2, n2), this.name = "DataTrackSerializeError", this.reason = t2, this.reasonName = wd[t2];
          }
          static tooSmallForHeader() {
            return new Id("Buffer cannot fit header", wd.TooSmallForHeader);
          }
          static tooSmallForPayload() {
            return new Id("Buffer cannot fit payload", wd.TooSmallForPayload);
          }
        }
        class Dd {
          toBinary() {
            const e2 = this.toBinaryLengthBytes(), t2 = new ArrayBuffer(e2), n2 = new DataView(t2), i2 = this.toBinaryInto(n2);
            if (e2 !== i2) throw new Error("".concat(this.constructor.name, ".toBinary: written bytes (").concat(i2, " bytes) not equal to allocated array buffer length (").concat(e2, " bytes)."));
            return new Uint8Array(t2);
          }
        }
        !(function(e2) {
          e2[e2.UserTimestamp = 2] = "UserTimestamp", e2[e2.E2ee = 1] = "E2ee";
        })(Rd || (Rd = {}));
        class _d extends Dd {
        }
        class Md extends _d {
          constructor(e2) {
            super(), this.timestamp = e2;
          }
          toBinaryLengthBytes() {
            return 2 + Md.lengthBytes;
          }
          toBinaryInto(e2) {
            let t2 = 0;
            e2.setUint8(t2, Md.tag), t2 += 1, e2.setUint8(t2, Md.lengthBytes), t2 += 1, e2.setBigUint64(t2, this.timestamp), t2 += 8;
            const n2 = this.toBinaryLengthBytes();
            if (t2 !== n2) throw new Error("DataTrackUserTimestampExtension.toBinaryInto: Wrote ".concat(t2, " bytes but expected length was ").concat(n2, " bytes"));
            return t2;
          }
          toJSON() {
            return { tag: Md.tag, lengthBytes: Md.lengthBytes, timestamp: this.timestamp };
          }
        }
        Md.tag = Rd.UserTimestamp, Md.lengthBytes = 8;
        class Od extends _d {
          constructor(e2, t2) {
            super(), this.keyIndex = e2, this.iv = t2;
          }
          toBinaryLengthBytes() {
            return 2 + Od.lengthBytes;
          }
          toBinaryInto(e2) {
            let t2 = 0;
            e2.setUint8(t2, Od.tag), t2 += 1, e2.setUint8(t2, Od.lengthBytes), t2 += 1, e2.setUint8(t2, this.keyIndex), t2 += 1;
            for (let n3 = 0; n3 < this.iv.length; n3 += 1) e2.setUint8(t2, this.iv[n3]), t2 += 1;
            const n2 = this.toBinaryLengthBytes();
            if (t2 !== n2) throw new Error("DataTrackE2eeExtension.toBinaryInto: Wrote ".concat(t2, " bytes but expected length was ").concat(n2, " bytes"));
            return t2;
          }
          toJSON() {
            return { tag: Od.tag, lengthBytes: Od.lengthBytes, keyIndex: this.keyIndex, iv: this.iv };
          }
        }
        Od.tag = Rd.E2ee, Od.lengthBytes = 13;
        class Ad extends Dd {
          constructor() {
            let e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            super(), this.userTimestamp = e2.userTimestamp, this.e2ee = e2.e2ee;
          }
          toBinaryLengthBytes() {
            let e2 = 0;
            return this.userTimestamp && (e2 += this.userTimestamp.toBinaryLengthBytes()), this.e2ee && (e2 += this.e2ee.toBinaryLengthBytes()), e2;
          }
          toBinaryInto(e2) {
            let t2 = 0;
            if (this.e2ee) {
              t2 += this.e2ee.toBinaryInto(e2);
            }
            if (this.userTimestamp) {
              t2 += this.userTimestamp.toBinaryInto(new DataView(e2.buffer, e2.byteOffset + t2));
            }
            const n2 = this.toBinaryLengthBytes();
            if (t2 !== n2) throw new Error("DataTrackExtensions.toBinaryInto: Wrote ".concat(t2, " bytes but expected length was ").concat(n2, " bytes"));
            return t2;
          }
          static fromBinary(e2) {
            const t2 = jo(e2);
            let n2, i2, r2 = 0;
            for (; t2.byteLength - r2 >= 2; ) {
              const e3 = t2.getUint8(r2);
              r2 += 1;
              const s2 = t2.getUint8(r2);
              if (r2 += 1, 0 !== e3) switch (e3) {
                case Rd.UserTimestamp:
                  if (t2.byteLength - r2 < Md.lengthBytes) throw Pd.malformedExt(e3);
                  n2 = new Md(t2.getBigUint64(r2)), r2 += s2;
                  break;
                case Rd.E2ee:
                  if (t2.byteLength - r2 < Od.lengthBytes) throw Pd.malformedExt(e3);
                  const a2 = t2.getUint8(r2), o2 = new Uint8Array(12);
                  for (let e4 = 0; e4 < o2.length; e4 += 1) {
                    let n3 = r2;
                    n3 += 1, n3 += 1 * e4, o2[e4] = t2.getUint8(n3);
                  }
                  i2 = new Od(a2, o2), r2 += s2;
                  break;
                default:
                  if (t2.byteLength - r2 < s2) throw Pd.malformedExt(e3);
                  r2 += s2;
              }
            }
            return [new Ad({ userTimestamp: n2, e2ee: i2 }), t2.byteLength];
          }
          toJSON() {
            var e2, t2, n2, i2;
            return { userTimestamp: null !== (t2 = null === (e2 = this.userTimestamp) || void 0 === e2 ? void 0 : e2.toJSON()) && void 0 !== t2 ? t2 : null, e2ee: null !== (i2 = null === (n2 = this.e2ee) || void 0 === n2 ? void 0 : n2.toJSON()) && void 0 !== i2 ? i2 : null };
          }
        }
        const Nd = { from: (e2) => ({ payload: e2.payload, extensions: new Ad({ userTimestamp: e2.userTimestamp ? new Md(e2.userTimestamp) : void 0 }) }), lossyIntoFrame(e2) {
          var t2;
          return { payload: e2.payload, userTimestamp: null === (t2 = e2.extensions.userTimestamp) || void 0 === t2 ? void 0 : t2.timestamp };
        } }, Ld = /* @__PURE__ */ Symbol.for("lk.track"), xd = /* @__PURE__ */ Symbol.for("lk.data-track");
        class Ud {
          constructor(e2, t2, n2) {
            this.trackSymbol = Ld, this.isLocal = false, this.typeSymbol = xd, this.info = e2, this.manager = t2, this.publisherIdentity = n2.publisherIdentity;
          }
          subscribe(e2) {
            try {
              const [t2, n2] = this.manager.openSubscriptionStream(this.info.sid, null == e2 ? void 0 : e2.signal, null == e2 ? void 0 : e2.bufferSize);
              return n2.catch((() => {
              })), t2;
            } catch (e3) {
              throw e3;
            }
          }
        }
        class Fd extends Dd {
          constructor(e2) {
            var t2;
            super(), this.marker = e2.marker, this.trackHandle = e2.trackHandle, this.sequence = e2.sequence, this.frameNumber = e2.frameNumber, this.timestamp = e2.timestamp, this.extensions = null !== (t2 = e2.extensions) && void 0 !== t2 ? t2 : new Ad();
          }
          extensionsMetrics() {
            const e2 = this.extensions.toBinaryLengthBytes(), t2 = Math.ceil((2 + e2) / 4);
            return { lengthBytes: e2, lengthWords: t2, paddingLengthBytes: 4 * t2 - 2 - e2 };
          }
          toBinaryLengthBytes() {
            const { lengthBytes: e2, paddingLengthBytes: t2 } = this.extensionsMetrics();
            let n2 = 12;
            return e2 > 0 && (n2 += 2 + e2 + t2), n2;
          }
          toBinaryInto(e2) {
            if (e2.byteLength < this.toBinaryLengthBytes()) throw Id.tooSmallForHeader();
            let t2, n2 = 0;
            switch (this.marker) {
              case Bd.Inter:
                t2 = 0;
                break;
              case Bd.Final:
                t2 = 1;
                break;
              case Bd.Start:
                t2 = 2;
                break;
              case Bd.Single:
                t2 = 3;
            }
            n2 |= t2 << 3;
            const { lengthBytes: i2, lengthWords: r2, paddingLengthBytes: s2 } = this.extensionsMetrics();
            i2 > 0 && (n2 |= 4);
            let a2 = 0;
            if (e2.setUint8(a2, n2), a2 += 1, e2.setUint8(a2, 0), a2 += 1, e2.setUint16(a2, this.trackHandle), a2 += 2, e2.setUint16(a2, this.sequence.value), a2 += 2, e2.setUint16(a2, this.frameNumber.value), a2 += 2, e2.setUint32(a2, this.timestamp.asTicks()), a2 += 4, i2 > 0) {
              const t3 = r2 - 1;
              e2.setUint16(a2, t3), a2 += 2;
              a2 += this.extensions.toBinaryInto(new DataView(e2.buffer, e2.byteOffset + a2));
              for (let t4 = 0; t4 < s2; t4 += 1) e2.setUint8(a2, 0), a2 += 1;
            }
            const o2 = this.toBinaryLengthBytes();
            if (a2 !== o2) throw new Error("DataTrackPacketHeader.toBinaryInto: Wrote ".concat(a2, " bytes but expected length was ").concat(o2, " bytes"));
            return o2;
          }
          static fromBinary(e2) {
            const t2 = jo(e2);
            if (t2.byteLength < 12) throw Pd.tooShort();
            let n2 = 0;
            const i2 = t2.getUint8(n2);
            n2 += 1;
            const r2 = i2 >> 5 & 7;
            if (r2 > 0) throw Pd.unsupportedVersion(r2);
            let s2;
            switch (i2 >> 3 & 3) {
              case 2:
                s2 = Bd.Start;
                break;
              case 1:
                s2 = Bd.Final;
                break;
              case 3:
                s2 = Bd.Single;
                break;
              default:
                s2 = Bd.Inter;
            }
            const a2 = (i2 >> 2 & 1) > 0;
            let o2;
            n2 += 1;
            try {
              o2 = Ho.fromNumber(t2.getUint16(n2));
            } catch (e3) {
              throw e3 instanceof Vo && (e3.isReason(qo.Reserved) || e3.isReason(qo.TooLarge)) ? Pd.invalidHandle(e3) : e3;
            }
            n2 += 2;
            const c2 = Uo.u16(t2.getUint16(n2));
            n2 += 2;
            const d2 = Uo.u16(t2.getUint16(n2));
            n2 += 2;
            const l2 = Fo.fromRtpTicks(t2.getUint32(n2));
            n2 += 4;
            let u2 = new Ad();
            if (a2) {
              if (t2.byteLength - n2 < 2) throw Pd.missingExtWords();
              let e3 = t2.getUint16(n2);
              n2 += 2;
              let i3 = 4 * (e3 + 1) - 2;
              if (n2 + i3 > t2.byteLength) throw Pd.headerOverrun();
              let r3 = new DataView(t2.buffer, t2.byteOffset + n2, i3);
              const [s3, a3] = Ad.fromBinary(r3);
              u2 = s3, n2 += a3;
            }
            return [new Fd({ marker: s2, trackHandle: o2, sequence: c2, frameNumber: d2, timestamp: l2, extensions: u2 }), n2];
          }
          toJSON() {
            return { marker: this.marker, trackHandle: this.trackHandle, sequence: this.sequence.value, frameNumber: this.frameNumber.value, timestamp: this.timestamp.asTicks(), extensions: this.extensions.toJSON() };
          }
        }
        var Bd;
        !(function(e2) {
          e2[e2.Start = 0] = "Start", e2[e2.Inter = 1] = "Inter", e2[e2.Final = 2] = "Final", e2[e2.Single = 3] = "Single";
        })(Bd || (Bd = {}));
        class jd extends Dd {
          constructor(e2, t2) {
            super(), this.header = e2, this.payload = t2;
          }
          toBinaryLengthBytes() {
            return this.header.toBinaryLengthBytes() + this.payload.byteLength;
          }
          toBinaryInto(e2) {
            let t2 = 0;
            if (t2 += this.header.toBinaryInto(e2), e2.byteLength - t2 < this.payload.byteLength) throw Id.tooSmallForPayload();
            for (let n3 = 0; n3 < this.payload.length; n3 += 1) e2.setUint8(t2, this.payload[n3]), t2 += 1;
            const n2 = this.toBinaryLengthBytes();
            if (t2 !== n2) throw new Error("DataTrackPacket.toBinaryInto: Wrote ".concat(t2, " bytes but expected length was ").concat(n2, " bytes"));
            return n2;
          }
          static fromBinary(e2) {
            const t2 = jo(e2), [n2, i2] = Fd.fromBinary(t2), r2 = t2.buffer.slice(t2.byteOffset + i2, t2.byteOffset + t2.byteLength);
            return [new jd(n2, new Uint8Array(r2)), t2.byteLength];
          }
          toJSON() {
            return { header: this.header.toJSON(), payload: this.payload };
          }
        }
        const qd = Ki(e.LoggerNames.DataTracks);
        class Vd extends Ss {
          constructor(e2, t2, n2, i2) {
            super(19, "Frame ".concat(n2, " dropped: ").concat(e2), i2), this.name = "DataTrackDepacketizerDropError", this.reason = t2, this.reasonName = Hd[t2], this.frameNumber = n2;
          }
          static interrupted(e2, t2) {
            return new Vd("Interrupted by the start of a new frame ".concat(t2), Hd.Interrupted, e2);
          }
          static unknownFrame(e2) {
            return new Vd("Initial packet was never received.", Hd.UnknownFrame, e2);
          }
          static bufferFull(e2) {
            return new Vd("Reorder buffer is full.", Hd.BufferFull, e2);
          }
          static incomplete(e2, t2, n2) {
            return new Vd("Not all packets received before final packet. Received ".concat(t2, " packets, expected ").concat(n2, " packets."), Hd.Incomplete, e2);
          }
        }
        var Hd, Wd;
        !(function(e2) {
          e2[e2.Interrupted = 0] = "Interrupted", e2[e2.UnknownFrame = 1] = "UnknownFrame", e2[e2.BufferFull = 2] = "BufferFull", e2[e2.Incomplete = 3] = "Incomplete";
        })(Hd || (Hd = {}));
        class Kd {
          constructor() {
            this.partial = null;
          }
          push(e2, t2) {
            switch (e2.header.marker) {
              case Bd.Single:
                return this.frameFromSingle(e2, t2);
              case Bd.Start:
                return this.beginPartial(e2, t2);
              case Bd.Inter:
              case Bd.Final:
                return this.pushToPartial(e2);
            }
          }
          reset() {
            this.partial = null;
          }
          frameFromSingle(e2, t2) {
            if (e2.header.marker !== Bd.Single) throw new Error("Depacketizer.frameFromSingle: packet.header.marker was not FrameMarker.Single, found ".concat(e2.header.marker, "."));
            if (this.partial) {
              if (null == t2 ? void 0 : t2.errorOnPartialFrames) {
                const t3 = this.partial.frameNumber;
                throw this.reset(), Vd.interrupted(t3, e2.header.frameNumber.value);
              }
              qd.warn("Data track frame ".concat(this.partial.frameNumber, " was interrupted by the start of a new frame, dropping."));
            }
            return this.reset(), { payload: e2.payload, extensions: e2.header.extensions };
          }
          beginPartial(e2, t2) {
            if (e2.header.marker !== Bd.Start) throw new Error("Depacketizer.beginPartial: packet.header.marker was not FrameMarker.Start, found ".concat(e2.header.marker, "."));
            if (this.partial) {
              if (null == t2 ? void 0 : t2.errorOnPartialFrames) {
                const t3 = this.partial.frameNumber;
                throw this.reset(), Vd.interrupted(t3, e2.header.frameNumber.value);
              }
              qd.warn("Data track frame ".concat(this.partial.frameNumber, " was interrupted by the start of a new frame ").concat(e2.header.frameNumber.value, ", dropping."));
            }
            this.reset();
            const n2 = e2.header.sequence;
            return this.partial = { frameNumber: e2.header.frameNumber.value, startSequence: n2, extensions: e2.header.extensions, payloads: /* @__PURE__ */ new Map([[n2.value, e2.payload]]) }, null;
          }
          pushToPartial(e2) {
            if (e2.header.marker !== Bd.Inter && e2.header.marker !== Bd.Final) throw new Error("Depacketizer.pushToPartial: packet.header.marker was not FrameMarker.Inter or FrameMarker.Final, found ".concat(e2.header.marker, "."));
            if (!this.partial) throw this.reset(), Vd.unknownFrame(e2.header.frameNumber.value);
            if (e2.header.frameNumber.value !== this.partial.frameNumber) {
              const t2 = this.partial.frameNumber;
              throw this.reset(), Vd.interrupted(t2, e2.header.frameNumber.value);
            }
            if (this.partial.payloads.size >= Kd.MAX_BUFFER_PACKETS) {
              const e3 = this.partial.frameNumber;
              throw this.reset(), Vd.bufferFull(e3);
            }
            return this.partial.payloads.has(e2.header.sequence.value) && qd.warn("Data track frame ".concat(this.partial.frameNumber, " received duplicate packet for sequence ").concat(e2.header.sequence.value, ", so replacing with newly received packet.")), this.partial.payloads.set(e2.header.sequence.value, e2.payload), e2.header.marker === Bd.Final ? this.finalize(this.partial, e2.header.sequence.value) : null;
          }
          finalize(e2, t2) {
            const n2 = e2.payloads.size;
            let i2 = 0;
            for (const t3 of e2.payloads.values()) i2 += t3.length;
            const r2 = new Uint8Array(i2);
            let s2 = e2.startSequence.clone(), a2 = 0;
            for (; ; ) {
              const n3 = e2.payloads.get(s2.value);
              if (!n3) break;
              e2.payloads.delete(s2.value);
              const i3 = r2.length - a2;
              if (n3.length > i3) throw new Error("Depacketizer.finalize: Expected at least ".concat(n3.length, " more bytes left in the payload buffer, only got ").concat(i3, " bytes."));
              if (r2.set(n3, a2), a2 += n3.length, s2.value == t2) return this.reset(), { payload: r2, extensions: e2.extensions };
              s2.increment();
            }
            throw this.reset(), Vd.incomplete(e2.frameNumber, n2, t2 - e2.startSequence.value + 1);
          }
        }
        Kd.MAX_BUFFER_PACKETS = 128, (function(e2) {
          e2[e2.Unpublished = 0] = "Unpublished", e2[e2.Timeout = 1] = "Timeout", e2[e2.Disconnected = 2] = "Disconnected", e2[e2.Cancelled = 4] = "Cancelled";
        })(Wd || (Wd = {}));
        class zd extends Ss {
          constructor(e2, t2, n2) {
            super(22, e2, n2), this.name = "DataTrackSubscribeError", this.reason = t2, this.reasonName = Wd[t2];
          }
          static unpublished() {
            return new zd("The track has been unpublished and is no longer available", Wd.Unpublished);
          }
          static timeout() {
            return new zd("Request to subscribe to data track timed-out", Wd.Timeout);
          }
          static disconnected() {
            return new zd("Cannot subscribe to data track when disconnected", Wd.Disconnected);
          }
          static cancelled() {
            return new zd("Subscription to data track cancelled by caller", Wd.Cancelled);
          }
        }
        const Jd = Ki(e.LoggerNames.DataTracks);
        class Gd {
          constructor(e2) {
            var t2;
            const n2 = null !== e2.e2eeManager;
            if (e2.info.usesE2ee !== n2) throw new Error("IncomingDataTrackPipeline: DataTrackInfo.usesE2ee must match presence of decryptionProvider");
            const i2 = new Kd();
            this.publisherIdentity = e2.publisherIdentity, this.e2eeManager = null !== (t2 = e2.e2eeManager) && void 0 !== t2 ? t2 : null, this.depacketizer = i2;
          }
          updateE2eeManager(e2) {
            this.e2eeManager = e2;
          }
          processPacket(e2) {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = this.depacketize(e2);
              if (!t2) return null;
              const n2 = yield this.decryptIfNeeded(t2);
              return n2 || null;
            }));
          }
          depacketize(e2) {
            let t2;
            try {
              t2 = this.depacketizer.push(e2);
            } catch (e3) {
              return Jd.warn("Data frame depacketize error: ".concat(e3)), null;
            }
            return t2;
          }
          decryptIfNeeded(e2) {
            return Xi(this, void 0, void 0, (function* () {
              var t2, n2;
              const i2 = this.e2eeManager;
              if (!i2) return e2;
              const r2 = null !== (n2 = null === (t2 = e2.extensions) || void 0 === t2 ? void 0 : t2.e2ee) && void 0 !== n2 ? n2 : null;
              if (!r2) return Jd.error("Missing E2EE meta"), null;
              let s2;
              try {
                s2 = yield i2.handleEncryptedData(e2.payload, r2.iv, this.publisherIdentity, r2.keyIndex);
              } catch (e3) {
                return Jd.error("Error decrypting packet: ".concat(e3)), null;
              }
              return e2.payload = s2.payload, e2;
            }));
          }
        }
        const Qd = Ki(e.LoggerNames.DataTracks);
        class Yd extends rr.EventEmitter {
          constructor(e2) {
            var t2;
            super(), this.descriptors = /* @__PURE__ */ new Map(), this.subscriptionHandles = /* @__PURE__ */ new Map(), this.e2eeManager = null !== (t2 = null == e2 ? void 0 : e2.e2eeManager) && void 0 !== t2 ? t2 : null;
          }
          updateE2eeManager(e2) {
            this.e2eeManager = e2;
            for (const t2 of this.descriptors.values()) "active" === t2.subscription.type && t2.subscription.pipeline.updateE2eeManager(e2);
          }
          openSubscriptionStream(e2, t2) {
            let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 16, i2 = null;
            const r2 = new Qa(), s2 = () => {
              null == t2 || t2.removeEventListener("abort", o2);
            }, a2 = () => {
              if (s2(), !i2) return void Qd.warn("ReadableStream subscribed to ".concat(e2, " was not started."));
              const t3 = this.descriptors.get(e2);
              t3 ? "active" === t3.subscription.type ? (t3.subscription.streamControllers.delete(i2), 0 === t3.subscription.streamControllers.size && this.unSubscribeRequest(t3.info.sid)) : Qd.warn("Subscription for track ".concat(e2, " is not active, skipping cancel...")) : Qd.warn("Unknown track ".concat(e2, ", skipping cancel..."));
            }, o2 = () => {
              var t3;
              if (!i2) return;
              const n3 = this.descriptors.get(e2);
              "active" === (null == n3 ? void 0 : n3.subscription.type) && n3.subscription.streamControllers.delete(i2), i2.error(zd.cancelled()), null === (t3 = r2.reject) || void 0 === t3 || t3.call(r2, zd.cancelled()), a2();
            }, c2 = new ReadableStream({ start: (n3) => {
              i2 = n3, this.subscribeRequest(e2, t2).then((() => Xi(this, void 0, void 0, (function* () {
                var i3, a3, c3;
                const d2 = this.descriptors.get(e2);
                if (!d2) {
                  Qd.error("Unknown track ".concat(e2));
                  const t3 = zd.disconnected();
                  return n3.error(t3), void (null === (i3 = r2.reject) || void 0 === i3 || i3.call(r2, t3));
                }
                if ("active" !== d2.subscription.type) {
                  Qd.error("Subscription for track ".concat(e2, " is not active"));
                  const t3 = zd.disconnected();
                  return n3.error(t3), void (null === (a3 = r2.reject) || void 0 === a3 || a3.call(r2, t3));
                }
                (null == t2 ? void 0 : t2.aborted) ? o2() : (null == t2 || t2.addEventListener("abort", o2), d2.subscription.streamControllers.set(n3, s2), null === (c3 = r2.resolve) || void 0 === c3 || c3.call(r2));
              })))).catch(((e3) => {
                var t3;
                n3.error(e3), null === (t3 = r2.reject) || void 0 === t3 || t3.call(r2, e3);
              }));
            }, cancel: () => {
              a2();
            } }, new CountQueuingStrategy({ highWaterMark: n2 }));
            return [c2, r2.promise];
          }
          subscribeRequest(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              const n2 = this.descriptors.get(e2);
              if (!n2) throw new Error("Cannot subscribe to unknown track");
              const i2 = (t3, n3, i3) => Xi(this, void 0, void 0, (function* () {
                if ("active" === t3.subscription.type) return;
                if ("pending" !== t3.subscription.type) throw new Error("Descriptor for track ".concat(e2, " is not pending, found ").concat(t3.subscription.type));
                const r2 = Sd([n3, i3].filter(((e3) => void 0 !== e3))), s2 = new Qa();
                t3.subscription.completionFuture.promise.then((() => {
                  var e3;
                  return null === (e3 = s2.resolve) || void 0 === e3 ? void 0 : e3.call(s2);
                })).catch(((e3) => {
                  var t4;
                  return null === (t4 = s2.reject) || void 0 === t4 ? void 0 : t4.call(s2, e3);
                }));
                const a2 = () => {
                  var e3;
                  "pending" === t3.subscription.type && (t3.subscription.pendingRequestCount -= 1, (null == i3 ? void 0 : i3.aborted) || t3.subscription.pendingRequestCount <= 0 ? t3.subscription.cancel() : null === (e3 = s2.reject) || void 0 === e3 || e3.call(s2, zd.cancelled()));
                };
                r2.aborted && a2(), r2.addEventListener("abort", a2), yield s2.promise, r2.removeEventListener("abort", a2);
              }));
              switch (n2.subscription.type) {
                case "none": {
                  n2.subscription = { type: "pending", completionFuture: new Qa(), pendingRequestCount: 1, cancel: () => {
                    var t3, i3;
                    const s2 = n2.subscription;
                    n2.subscription = { type: "none" }, this.emit("sfuUpdateSubscription", { sid: e2, subscribe: false }), "pending" === s2.type && (null === (i3 = (t3 = s2.completionFuture).reject) || void 0 === i3 || i3.call(t3, r2.aborted ? zd.timeout() : zd.cancelled()));
                  } }, this.emit("sfuUpdateSubscription", { sid: e2, subscribe: true });
                  const r2 = Ed(1e4);
                  return void (yield i2(n2, t2, r2));
                }
                case "pending":
                  return n2.subscription.pendingRequestCount += 1, void (yield i2(n2, t2));
                case "active":
                  return;
              }
            }));
          }
          querySubscribed() {
            return Xi(this, void 0, void 0, (function* () {
              return Array.from(this.descriptors.values()).filter(((e2) => "active" === e2.subscription.type)).map(((e2) => [e2.info, e2.publisherIdentity]));
            }));
          }
          unSubscribeRequest(e2) {
            var t2;
            const n2 = this.descriptors.get(e2);
            if (!n2) throw new Error("Cannot subscribe to unknown track");
            if ("active" !== n2.subscription.type) return void Qd.warn("Unexpected descriptor state in unSubscribeRequest, expected active, found ".concat(null === (t2 = n2.subscription) || void 0 === t2 ? void 0 : t2.type));
            this.closeStreamControllers(n2.subscription.streamControllers, e2);
            const i2 = n2.subscription;
            n2.subscription = { type: "none" }, this.subscriptionHandles.delete(i2.subcriptionHandle), this.emit("sfuUpdateSubscription", { sid: e2, subscribe: false });
          }
          closeStreamControllers(e2, t2) {
            for (const [n2, i2] of e2) {
              i2();
              try {
                n2.close();
              } catch (e3) {
                Qd.warn("Failed to close readable stream for track ".concat(t2, ": ").concat(e3));
              }
            }
          }
          receiveSfuPublicationUpdates(e2) {
            return Xi(this, void 0, void 0, (function* () {
              if (0 === e2.size) return;
              const t2 = /* @__PURE__ */ new Map();
              for (const [n2, i2] of e2.entries()) {
                const e3 = /* @__PURE__ */ new Set();
                for (const t3 of i2) e3.add(t3.sid), this.descriptors.has(t3.sid) || (yield this.handleTrackPublished(n2, t3));
                t2.set(n2, e3);
              }
              for (const [e3, n2] of t2.entries()) {
                let t3 = Array.from(this.descriptors.entries()).filter(((t4) => {
                  let [n3, i2] = t4;
                  return i2.publisherIdentity === e3;
                })).map(((e4) => {
                  let [t4] = e4;
                  return t4;
                })).filter(((e4) => !n2.has(e4)));
                for (const e4 of t3) this.handleTrackUnpublished(e4);
              }
            }));
          }
          queryPublications() {
            return Xi(this, void 0, void 0, (function* () {
              return Array.from(this.descriptors.values()).map(((e2) => e2.info));
            }));
          }
          handleTrackPublished(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              if (this.descriptors.has(t2.sid)) return void Qd.error("Existing descriptor for track ".concat(t2.sid));
              let n2 = { info: t2, publisherIdentity: e2, subscription: { type: "none" } };
              this.descriptors.set(n2.info.sid, n2);
              const i2 = new Ud(n2.info, this, { publisherIdentity: e2 });
              this.emit("trackPublished", { track: i2 });
            }));
          }
          handleTrackUnpublished(e2) {
            const t2 = this.descriptors.get(e2);
            t2 ? (this.descriptors.delete(e2), "active" === t2.subscription.type && (this.closeStreamControllers(t2.subscription.streamControllers, e2), this.subscriptionHandles.delete(t2.subscription.subcriptionHandle)), this.emit("trackUnpublished", { sid: e2, publisherIdentity: t2.publisherIdentity })) : Qd.error("Unknown track ".concat(e2));
          }
          receivedSfuSubscriberHandles(e2) {
            for (const [t2, n2] of e2.entries()) this.registerSubscriberHandle(t2, n2);
          }
          registerSubscriberHandle(e2, t2) {
            var n2, i2;
            const r2 = this.descriptors.get(t2);
            if (r2) switch (r2.subscription.type) {
              case "none":
                return void Qd.warn("No subscription for ".concat(t2));
              case "active":
                return r2.subscription.subcriptionHandle = e2, void this.subscriptionHandles.set(e2, t2);
              case "pending": {
                const s2 = new Gd({ info: r2.info, publisherIdentity: r2.publisherIdentity, e2eeManager: this.e2eeManager }), a2 = r2.subscription;
                r2.subscription = { type: "active", subcriptionHandle: e2, pipeline: s2, streamControllers: /* @__PURE__ */ new Map() }, this.subscriptionHandles.set(e2, t2), null === (i2 = (n2 = a2.completionFuture).resolve) || void 0 === i2 || i2.call(n2);
              }
            }
            else Qd.error("Unknown track ".concat(t2));
          }
          packetReceived(e2) {
            return Xi(this, void 0, void 0, (function* () {
              let t2;
              try {
                [t2] = jd.fromBinary(e2);
              } catch (e3) {
                return void Qd.error("Failed to deserialize packet: ".concat(e3));
              }
              const n2 = this.subscriptionHandles.get(t2.header.trackHandle);
              if (!n2) return void Qd.warn("Unknown subscriber handle ".concat(t2.header.trackHandle));
              const i2 = this.descriptors.get(n2);
              if (!i2) return void Qd.error("Missing descriptor for track ".concat(n2));
              if ("active" !== i2.subscription.type) return void Qd.warn("Received packet for track ".concat(n2, " without active subscription"));
              const r2 = yield i2.subscription.pipeline.processPacket(t2);
              if (r2) for (const e3 of i2.subscription.streamControllers.keys()) {
                if (null !== e3.desiredSize && e3.desiredSize <= 0) {
                  Qd.warn("Cannot send frame to subscribers: readable stream is full (desiredSize is ".concat(e3.desiredSize, "). To increase this threshold, set a higher 'options.highWaterMark' when calling .subscribe()."));
                  continue;
                }
                const t3 = Nd.lossyIntoFrame(r2);
                e3.enqueue(t3);
              }
            }));
          }
          resendSubscriptionUpdates() {
            for (const [e2, t2] of this.descriptors) "none" !== t2.subscription.type && this.emit("sfuUpdateSubscription", { sid: e2, subscribe: true });
          }
          handleRemoteParticipantDisconnected(e2) {
            var t2, n2;
            for (const i2 of this.descriptors.values()) if (i2.publisherIdentity === e2) switch (i2.subscription.type) {
              case "none":
                break;
              case "pending":
                null === (n2 = (t2 = i2.subscription.completionFuture).reject) || void 0 === n2 || n2.call(t2, zd.disconnected());
                break;
              case "active":
                this.unSubscribeRequest(i2.info.sid);
            }
          }
          reset() {
            var e2, t2;
            for (const n2 of this.descriptors.values()) this.emit("trackUnpublished", { sid: n2.info.sid, publisherIdentity: n2.publisherIdentity }), "pending" === n2.subscription.type && (null === (t2 = (e2 = n2.subscription.completionFuture).reject) || void 0 === t2 || t2.call(e2, zd.disconnected())), "active" === n2.subscription.type && this.closeStreamControllers(n2.subscription.streamControllers, n2.info.sid);
            this.descriptors.clear(), this.subscriptionHandles.clear();
          }
        }
        class Xd extends Ss {
          constructor(e2, t2, n2) {
            super(19, e2, n2), this.name = "DataTrackPacketizerError", this.reason = t2, this.reasonName = Zd[t2];
          }
          static mtuTooShort() {
            return new Xd("MTU is too short to send frame", Zd.MtuTooShort);
          }
        }
        var Zd, $d, el, tl;
        !(function(e2) {
          e2[e2.MtuTooShort = 0] = "MtuTooShort";
        })(Zd || (Zd = {}));
        class nl {
          constructor(e2, t2) {
            this.sequence = Uo.u16(0), this.frameNumber = Uo.u16(0), this.clock = Bo.rtpStartingNow(Fo.rtpRandom()), this.handle = e2, this.mtuSizeBytes = t2;
          }
          static computeFrameMarker(e2, t2) {
            return t2 <= 1 ? Bd.Single : 0 === e2 ? Bd.Start : e2 === t2 - 1 ? Bd.Final : Bd.Inter;
          }
          *packetize(e2, t2) {
            var n2;
            const i2 = this.frameNumber.getThenIncrement(), r2 = { marker: Bd.Inter, trackHandle: this.handle, sequence: Uo.u16(0), frameNumber: i2, timestamp: null !== (n2 = null == t2 ? void 0 : t2.now) && void 0 !== n2 ? n2 : this.clock.now(), extensions: e2.extensions }, s2 = new Fd(r2).toBinaryLengthBytes();
            if (s2 >= this.mtuSizeBytes) throw Xd.mtuTooShort();
            const a2 = this.mtuSizeBytes - s2, o2 = Math.ceil(e2.payload.byteLength / a2);
            for (let t3 = 0, n3 = 0; n3 < e2.payload.byteLength; [t3, n3] = [t3 + 1, n3 + a2]) {
              const i3 = this.sequence.getThenIncrement(), s3 = new Fd(Object.assign(Object.assign({}, r2), { marker: nl.computeFrameMarker(t3, o2), sequence: i3 })), c2 = Math.min(a2, e2.payload.byteLength - n3), d2 = new Uint8Array(e2.payload.buffer, e2.payload.byteOffset + n3, c2);
              yield new jd(s3, d2);
            }
          }
        }
        !(function(e2) {
          e2[e2.NotAllowed = 0] = "NotAllowed", e2[e2.DuplicateName = 1] = "DuplicateName", e2[e2.Timeout = 2] = "Timeout", e2[e2.LimitReached = 3] = "LimitReached", e2[e2.Disconnected = 4] = "Disconnected", e2[e2.Cancelled = 5] = "Cancelled", e2[e2.InvalidName = 6] = "InvalidName", e2[e2.Unknown = 7] = "Unknown";
        })($d || ($d = {}));
        class il extends Ss {
          constructor(e2, t2, n2) {
            super(21, e2, n2), this.name = "DataTrackPublishError", this.reason = t2, this.reasonName = $d[t2], this.rawMessage = null == n2 ? void 0 : n2.rawMessage;
          }
          static notAllowed(e2) {
            return new il("Data track publishing unauthorized", $d.NotAllowed, { rawMessage: e2 });
          }
          static duplicateName(e2) {
            return new il("Track name already taken", $d.DuplicateName, { rawMessage: e2 });
          }
          static invalidName(e2) {
            return new il("Track name is invalid", $d.InvalidName, { rawMessage: e2 });
          }
          static timeout() {
            return new il("Publish data track timed-out. Does the LiveKit server support data tracks?", $d.Timeout);
          }
          static limitReached(e2) {
            return new il("Data track publication limit reached", $d.LimitReached, { rawMessage: e2 });
          }
          static unknown(e2, t2) {
            return new il("Received RequestResponse for publishDataTrack, but reason was unrecognised (".concat(e2, ", ").concat(t2, ")"), $d.Unknown);
          }
          static disconnected() {
            return new il("Room disconnected", $d.Disconnected);
          }
          static cancelled() {
            return new il("Publish data track cancelled by caller", $d.Cancelled);
          }
        }
        !(function(e2) {
          e2[e2.TrackUnpublished = 0] = "TrackUnpublished", e2[e2.Dropped = 1] = "Dropped";
        })(el || (el = {}));
        class rl extends Ss {
          constructor(e2, t2, n2) {
            super(22, e2, n2), this.name = "DataTrackPushFrameError", this.reason = t2, this.reasonName = el[t2];
          }
          static trackUnpublished() {
            return new rl("Track is no longer published", el.TrackUnpublished);
          }
          static dropped(e2) {
            return new rl("Frame was dropped", el.Dropped, { cause: e2 });
          }
        }
        !(function(e2) {
          e2[e2.Packetizer = 0] = "Packetizer", e2[e2.Encryption = 1] = "Encryption";
        })(tl || (tl = {}));
        class sl extends Ss {
          constructor(e2, t2, n2) {
            super(21, e2, n2), this.name = "DataTrackOutgoingPipelineError", this.reason = t2, this.reasonName = tl[t2];
          }
          static packetizer(e2) {
            return new sl("Error packetizing frame", tl.Packetizer, { cause: e2 });
          }
          static encryption(e2) {
            return new sl("Error encrypting frame", tl.Encryption, { cause: e2 });
          }
        }
        class al {
          constructor(t2, n2) {
            this.trackSymbol = Ld, this.isLocal = true, this.typeSymbol = xd, this.handle = null, this.log = Hi, this.flushedFuture = new Qa(), this.isFlushed = true, this.handleManagerReset = () => {
              var e2, t3;
              null === (t3 = (e2 = this.flushedFuture).resolve) || void 0 === t3 || t3.call(e2), this.manager.off("packetsFlushedChange", this.handleManagerPacketsFlushedChange), this.manager.off("reset", this.handleManagerReset);
            }, this.handleManagerPacketsFlushedChange = (e2) => {
              var t3, n3;
              this.isFlushed = e2.isFlushed, e2.isFlushed && (null === (n3 = (t3 = this.flushedFuture).resolve) || void 0 === n3 || n3.call(t3), this.flushedFuture = new Qa());
            }, this.options = t2, this.manager = n2, this.log = Ki(e.LoggerNames.DataTracks), this.manager.on("packetsFlushedChange", this.handleManagerPacketsFlushedChange), this.manager.on("reset", this.handleManagerReset);
          }
          static withExplicitHandle(e2, t2, n2) {
            const i2 = new al(e2, t2);
            return i2.handle = n2, i2;
          }
          get info() {
            const e2 = this.descriptor;
            return "active" === (null == e2 ? void 0 : e2.type) ? e2.info : void 0;
          }
          get descriptor() {
            return this.handle ? this.manager.getDescriptor(this.handle) : null;
          }
          publish(e2) {
            return Xi(this, void 0, void 0, (function* () {
              try {
                this.handle = yield this.manager.publishRequest(this.options, e2);
              } catch (e3) {
                throw e3;
              }
            }));
          }
          isPublished() {
            var e2;
            return "active" === (null === (e2 = this.descriptor) || void 0 === e2 ? void 0 : e2.type) && "unpublished" !== this.descriptor.publishState;
          }
          tryPush(e2) {
            if (!this.handle) throw rl.trackUnpublished();
            const t2 = Nd.from(e2);
            try {
              return this.manager.tryProcessAndSend(this.handle, t2);
            } catch (e3) {
              throw e3;
            }
          }
          flush() {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.isFlushed) return this.flushedFuture.promise;
            }));
          }
          unpublish() {
            return Xi(this, void 0, void 0, (function* () {
              if (this.handle) try {
                yield this.manager.unpublishRequest(this.handle);
              } catch (e2) {
                throw e2;
              }
              else Hi.warn('Data track "'.concat(this.options.name, '" is not published, so unpublishing has no effect.'));
            }));
          }
        }
        class ol {
          constructor(e2) {
            this.e2eeManager = e2.e2eeManager, this.packetizer = new nl(e2.info.pubHandle, ol.TRANSPORT_MTU_BYTES);
          }
          updateE2eeManager(e2) {
            this.e2eeManager = e2;
          }
          processFrame(e2) {
            return er(this, arguments, (function* () {
              const t2 = yield $i(this.encryptIfNeeded(e2));
              try {
                yield $i(yield* (function(e3) {
                  var t3, n2;
                  return t3 = {}, i2("next"), i2("throw", (function(e4) {
                    throw e4;
                  })), i2("return"), t3[Symbol.iterator] = function() {
                    return this;
                  }, t3;
                  function i2(i3, r2) {
                    t3[i3] = e3[i3] ? function(t4) {
                      return (n2 = !n2) ? { value: $i(e3[i3](t4)), done: false } : r2 ? r2(t4) : t4;
                    } : r2;
                  }
                })(tr(this.packetizer.packetize(t2))));
              } catch (e3) {
                if (e3 instanceof Xd) throw sl.packetizer(e3);
                throw e3;
              }
            }));
          }
          encryptIfNeeded(e2) {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.e2eeManager) return e2;
              let t2;
              try {
                t2 = yield this.e2eeManager.encryptData(e2.payload);
              } catch (e3) {
                throw sl.encryption(e3);
              }
              return e2.payload = t2.payload, e2.extensions.e2ee = new Od(t2.keyIndex, t2.iv), e2;
            }));
          }
        }
        ol.TRANSPORT_MTU_BYTES = 16e3;
        const cl = Ki(e.LoggerNames.DataTracks), dl = { pending: () => ({ type: "pending", completionFuture: new Qa() }), active: (e2, t2) => ({ type: "active", info: e2, publishState: "published", pipeline: new ol({ info: e2, e2eeManager: t2 }), unpublishingFuture: new Qa() }) };
        class ll extends rr.EventEmitter {
          constructor(e2) {
            var t2;
            super(), this.handleAllocator = new Wo(), this.descriptors = /* @__PURE__ */ new Map(), this.inFlightPacketCounter = /* @__PURE__ */ new Map(), this.e2eeManager = null !== (t2 = null == e2 ? void 0 : e2.e2eeManager) && void 0 !== t2 ? t2 : null;
          }
          static withDescriptors(e2) {
            const t2 = new ll();
            return t2.descriptors = e2, t2;
          }
          updateE2eeManager(e2) {
            this.e2eeManager = e2;
            for (const t2 of this.descriptors.values()) "active" === t2.type && t2.pipeline.updateE2eeManager(e2);
          }
          getDescriptor(e2) {
            var t2;
            return null !== (t2 = this.descriptors.get(e2)) && void 0 !== t2 ? t2 : null;
          }
          tryProcessAndSend(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2, i2, r2, s2, a2;
              const o2 = this.getDescriptor(e2);
              if ("active" !== (null == o2 ? void 0 : o2.type)) throw rl.trackUnpublished();
              if ("unpublished" === o2.publishState) throw rl.trackUnpublished();
              if ("republishing" === o2.publishState) throw rl.dropped("Data track republishing");
              try {
                try {
                  for (var c2, d2 = true, l2 = tr(o2.pipeline.processFrame(t2)); !(n2 = (c2 = yield l2.next()).done); d2 = true) {
                    s2 = c2.value, d2 = false;
                    const t3 = s2, n3 = null !== (a2 = this.inFlightPacketCounter.get(e2)) && void 0 !== a2 ? a2 : 0;
                    this.inFlightPacketCounter.set(e2, n3 + 1), 0 === n3 && this.emit("packetsFlushedChange", { handle: e2, isFlushed: false }), this.emit("packetAvailable", { handle: e2, bytes: t3.toBinary() });
                  }
                } catch (e3) {
                  i2 = { error: e3 };
                } finally {
                  try {
                    d2 || n2 || !(r2 = l2.return) || (yield r2.call(l2));
                  } finally {
                    if (i2) throw i2.error;
                  }
                }
              } catch (e3) {
                throw rl.dropped(e3);
              }
            }));
          }
          handlePacketSendComplete(e2) {
            var t2;
            let n2 = (null !== (t2 = this.inFlightPacketCounter.get(e2)) && void 0 !== t2 ? t2 : 0) - 1;
            n2 < 0 && (cl.warn("OutgoingDataTrackManager.handlePacketSendComplete: inFlightPacketCounter was decremented below 0 (got ".concat(this.inFlightPacketCounter, " - resetting to 0. Were more packets send than were emitted?")), n2 = 0), this.inFlightPacketCounter.set(e2, n2), 0 === n2 && this.emit("packetsFlushedChange", { handle: e2, isFlushed: true });
          }
          publishRequest(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              const n2 = this.handleAllocator.get();
              if (!n2) throw il.limitReached();
              const i2 = Ed(1e4), r2 = t2 ? Sd([t2, i2]) : i2;
              if (this.descriptors.has(n2)) throw new Error("Descriptor for handle already exists");
              const s2 = dl.pending();
              this.descriptors.set(n2, s2);
              const a2 = () => {
                var e3, t3;
                const r3 = this.descriptors.get(n2);
                r3 ? (this.descriptors.delete(n2), this.emit("sfuUnpublishRequest", { handle: n2 }), "pending" === r3.type && (null === (t3 = (e3 = r3.completionFuture).reject) || void 0 === t3 || t3.call(e3, i2.aborted ? il.timeout() : il.cancelled()))) : cl.warn("No descriptor for ".concat(n2));
              };
              return r2.aborted ? (a2(), s2.completionFuture.promise.then((() => n2))) : (r2.addEventListener("abort", a2), this.emit("sfuPublishRequest", { handle: n2, name: e2.name, usesE2ee: null !== this.e2eeManager }), yield s2.completionFuture.promise, r2.removeEventListener("abort", a2), this.emit("trackPublished", { track: al.withExplicitHandle(e2, this, n2) }), n2);
            }));
          }
          queryPublished() {
            return Array.from(this.descriptors.values()).filter(((e2) => "active" === e2.type)).map(((e2) => e2.info));
          }
          unpublishRequest(e2) {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = this.descriptors.get(e2);
              t2 ? "active" === t2.type ? (this.emit("sfuUnpublishRequest", { handle: e2 }), yield t2.unpublishingFuture.promise, this.inFlightPacketCounter.delete(e2), this.emit("trackUnpublished", { sid: t2.info.sid })) : cl.warn("Track ".concat(e2, " not active")) : cl.warn("No descriptor for ".concat(e2));
            }));
          }
          receivedSfuPublishResponse(e2, t2) {
            var n2, i2, r2, s2;
            const a2 = this.descriptors.get(e2);
            if (a2) switch (this.descriptors.delete(e2), a2.type) {
              case "pending":
                if ("ok" === t2.type) {
                  const e3 = t2.data, r3 = e3.usesE2ee ? this.e2eeManager : null;
                  this.descriptors.set(e3.pubHandle, dl.active(e3, r3)), null === (i2 = (n2 = a2.completionFuture).resolve) || void 0 === i2 || i2.call(n2);
                } else null === (s2 = (r2 = a2.completionFuture).reject) || void 0 === s2 || s2.call(r2, t2.error);
                return;
              case "active":
                if ("republishing" !== a2.publishState) return void cl.warn("Track ".concat(e2, " already active"));
                if ("error" === t2.type) return void cl.warn("Republish failed for track ".concat(e2));
                cl.debug("Track ".concat(e2, " republished")), a2.info.sid = t2.data.sid, a2.publishState = "published", this.descriptors.set(a2.info.pubHandle, a2);
            }
            else cl.warn("No descriptor for ".concat(e2));
          }
          receivedSfuUnpublishResponse(e2) {
            var t2, n2;
            const i2 = this.descriptors.get(e2);
            i2 ? (this.descriptors.delete(e2), "active" === i2.type ? (i2.publishState = "unpublished", null === (n2 = (t2 = i2.unpublishingFuture).resolve) || void 0 === n2 || n2.call(t2)) : cl.warn("Track ".concat(e2, " not active"))) : cl.warn("No descriptor for ".concat(e2));
          }
          sfuWillRepublishTracks() {
            var e2, t2;
            for (const [n2, i2] of this.descriptors.entries()) switch (i2.type) {
              case "pending":
                this.descriptors.delete(n2), null === (t2 = (e2 = i2.completionFuture).reject) || void 0 === t2 || t2.call(e2, il.disconnected());
                break;
              case "active":
                i2.publishState = "republishing", this.emit("sfuPublishRequest", { handle: i2.info.pubHandle, name: i2.info.name, usesE2ee: i2.info.usesE2ee });
            }
          }
          reset() {
            return Xi(this, void 0, void 0, (function* () {
              var e2, t2, n2, i2;
              this.handleAllocator.reset();
              for (const r2 of this.descriptors.values()) switch (r2.type) {
                case "pending":
                  null === (t2 = (e2 = r2.completionFuture).reject) || void 0 === t2 || t2.call(e2, il.disconnected());
                  break;
                case "active":
                  null === (i2 = (n2 = r2.unpublishingFuture).resolve) || void 0 === i2 || i2.call(n2), yield this.unpublishRequest(r2.info.pubHandle);
              }
              this.descriptors.clear(), this.inFlightPacketCounter.clear(), this.emit("reset");
            }));
          }
        }
        class ul extends pa {
          constructor(e2, t2, n2, i2, r2) {
            super(e2, n2, r2), this.sid = t2, this.receiver = i2;
          }
          get isLocal() {
            return false;
          }
          setMuted(t2) {
            this.isMuted !== t2 && (this.isMuted = t2, this._mediaStreamTrack.enabled = !t2, this.emit(t2 ? e.TrackEvent.Muted : e.TrackEvent.Unmuted, this));
          }
          setMediaStream(t2) {
            this.mediaStream = t2;
            const n2 = (i2) => {
              i2.track === this._mediaStreamTrack && (t2.removeEventListener("removetrack", n2), this.receiver && "playoutDelayHint" in this.receiver && (this.receiver.playoutDelayHint = void 0), this.receiver = void 0, this._currentBitrate = 0, this.emit(e.TrackEvent.Ended, this));
            };
            t2.addEventListener("removetrack", n2);
          }
          start() {
            this.startMonitor(), super.enable();
          }
          stop() {
            this.stopMonitor(), super.disable();
          }
          getRTCStatsReport() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              if (!(null === (e2 = this.receiver) || void 0 === e2 ? void 0 : e2.getStats)) return;
              return yield this.receiver.getStats();
            }));
          }
          setPlayoutDelay(e2) {
            this.receiver ? "playoutDelayHint" in this.receiver ? this.receiver.playoutDelayHint = e2 : this.log.warn("Playout delay not supported in this browser") : this.log.warn("Cannot set playout delay, track already ended");
          }
          getPlayoutDelay() {
            if (this.receiver) {
              if ("playoutDelayHint" in this.receiver) return this.receiver.playoutDelayHint;
              this.log.warn("Playout delay not supported in this browser");
            } else this.log.warn("Cannot get playout delay, track already ended");
            return 0;
          }
          startMonitor() {
            this.monitorInterval || (this.monitorInterval = setInterval((() => this.monitorReceiver()), Nc)), "undefined" != typeof RTCRtpReceiver && "getSynchronizationSources" in RTCRtpReceiver && this.registerTimeSyncUpdate();
          }
          registerTimeSyncUpdate() {
            const t2 = () => {
              var n2;
              this.timeSyncHandle = requestAnimationFrame((() => t2()));
              const i2 = null === (n2 = this.receiver) || void 0 === n2 ? void 0 : n2.getSynchronizationSources()[0];
              if (i2) {
                const { timestamp: t3, rtpTimestamp: n3 } = i2;
                n3 && this.rtpTimestamp !== n3 && (this.emit(e.TrackEvent.TimeSyncUpdate, { timestamp: t3, rtpTimestamp: n3 }), this.rtpTimestamp = n3);
              }
            };
            t2();
          }
        }
        class hl extends ul {
          constructor(e2, t2, n2, i2, r2, s2) {
            super(e2, t2, pa.Kind.Audio, n2, s2), this.monitorReceiver = () => Xi(this, void 0, void 0, (function* () {
              if (!this.receiver) return void (this._currentBitrate = 0);
              const e3 = yield this.getReceiverStats();
              e3 && this.prevStats && this.receiver && (this._currentBitrate = Lc(e3, this.prevStats)), this.prevStats = e3;
            })), this.audioContext = i2, this.webAudioPluginNodes = [], r2 && (this.sinkId = r2.deviceId);
          }
          setVolume(e2) {
            var t2;
            for (const n2 of this.attachedElements) this.audioContext ? null === (t2 = this.gainNode) || void 0 === t2 || t2.gain.setTargetAtTime(e2, 0, 0.1) : n2.volume = e2;
            Oa() && this._mediaStreamTrack._setVolume(e2), this.elementVolume = e2;
          }
          getVolume() {
            if (this.elementVolume) return this.elementVolume;
            if (Oa()) return 1;
            let e2 = 0;
            return this.attachedElements.forEach(((t2) => {
              t2.volume > e2 && (e2 = t2.volume);
            })), e2;
          }
          setSinkId(e2) {
            return Xi(this, void 0, void 0, (function* () {
              this.sinkId = e2, yield Promise.all(this.attachedElements.map(((t2) => {
                if (Ea(t2)) return t2.setSinkId(e2);
              })));
            }));
          }
          attach(e2) {
            const t2 = 0 === this.attachedElements.length;
            return e2 ? super.attach(e2) : e2 = super.attach(), this.sinkId && Ea(e2) && e2.setSinkId(this.sinkId).catch(((e3) => {
              this.log.error("Failed to set sink id on remote audio track", e3, this.logContext);
            })), this.audioContext && t2 && (this.log.debug("using audio context mapping", this.logContext), this.connectWebAudio(this.audioContext, e2), e2.volume = 0, e2.muted = true), this.elementVolume && this.setVolume(this.elementVolume), e2;
          }
          detach(e2) {
            let t2;
            return e2 ? (t2 = super.detach(e2), this.audioContext && (this.attachedElements.length > 0 ? this.connectWebAudio(this.audioContext, this.attachedElements[0]) : this.disconnectWebAudio())) : (t2 = super.detach(), this.disconnectWebAudio()), t2;
          }
          setAudioContext(e2) {
            this.audioContext = e2, e2 && this.attachedElements.length > 0 ? this.connectWebAudio(e2, this.attachedElements[0]) : e2 || this.disconnectWebAudio();
          }
          setWebAudioPlugins(e2) {
            this.webAudioPluginNodes = e2, this.attachedElements.length > 0 && this.audioContext && this.connectWebAudio(this.audioContext, this.attachedElements[0]);
          }
          connectWebAudio(t2, n2) {
            this.disconnectWebAudio(), this.sourceNode = t2.createMediaStreamSource(n2.srcObject);
            let i2 = this.sourceNode;
            this.webAudioPluginNodes.forEach(((e2) => {
              i2.connect(e2), i2 = e2;
            })), this.gainNode = t2.createGain(), i2.connect(this.gainNode), this.gainNode.connect(t2.destination), this.elementVolume && this.gainNode.gain.setTargetAtTime(this.elementVolume, 0, 0.1), "running" !== t2.state && t2.resume().then((() => {
              "running" !== t2.state && this.emit(e.TrackEvent.AudioPlaybackFailed, new Error("Audio Context couldn't be started automatically"));
            })).catch(((t3) => {
              this.emit(e.TrackEvent.AudioPlaybackFailed, t3);
            }));
          }
          disconnectWebAudio() {
            var e2, t2;
            null === (e2 = this.gainNode) || void 0 === e2 || e2.disconnect(), null === (t2 = this.sourceNode) || void 0 === t2 || t2.disconnect(), this.gainNode = void 0, this.sourceNode = void 0;
          }
          getReceiverStats() {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.receiver || !this.receiver.getStats) return;
              let e2;
              return (yield this.receiver.getStats()).forEach(((t2) => {
                "inbound-rtp" === t2.type && (e2 = { type: "audio", streamId: t2.id, timestamp: t2.timestamp, jitter: t2.jitter, bytesReceived: t2.bytesReceived, concealedSamples: t2.concealedSamples, concealmentEvents: t2.concealmentEvents, silentConcealedSamples: t2.silentConcealedSamples, silentConcealmentEvents: t2.silentConcealmentEvents, totalAudioEnergy: t2.totalAudioEnergy, totalSamplesDuration: t2.totalSamplesDuration });
              })), e2;
            }));
          }
        }
        class pl extends ul {
          constructor(e2, t2, n2, i2, r2) {
            super(e2, t2, pa.Kind.Video, n2, r2), this.elementInfos = [], this.monitorReceiver = () => Xi(this, void 0, void 0, (function* () {
              if (!this.receiver) return void (this._currentBitrate = 0);
              const e3 = yield this.getReceiverStats();
              e3 && this.prevStats && this.receiver && (this._currentBitrate = Lc(e3, this.prevStats)), this.prevStats = e3;
            })), this.debouncedHandleResize = mc((() => {
              this.updateDimensions();
            }), 100), this.adaptiveStreamSettings = i2;
          }
          get isAdaptiveStream() {
            return void 0 !== this.adaptiveStreamSettings;
          }
          setStreamState(e2) {
            super.setStreamState(e2), this.log.debug("setStreamState", e2), this.isAdaptiveStream && e2 === pa.StreamState.Active && this.updateVisibility();
          }
          get mediaStreamTrack() {
            return this._mediaStreamTrack;
          }
          setMuted(e2) {
            super.setMuted(e2), this.attachedElements.forEach(((t2) => {
              e2 ? ga(this._mediaStreamTrack, t2) : ma(this._mediaStreamTrack, t2);
            }));
          }
          attach(e2) {
            if (e2 ? super.attach(e2) : e2 = super.attach(), this.adaptiveStreamSettings && void 0 === this.elementInfos.find(((t2) => t2.element === e2))) {
              const t2 = new ml(e2);
              this.observeElementInfo(t2);
            }
            return e2;
          }
          observeElementInfo(e2) {
            this.adaptiveStreamSettings && void 0 === this.elementInfos.find(((t2) => t2 === e2)) ? (e2.handleResize = () => {
              this.debouncedHandleResize();
            }, e2.handleVisibilityChanged = () => {
              this.updateVisibility();
            }, this.elementInfos.push(e2), e2.observe(), this.debouncedHandleResize(), this.updateVisibility()) : this.log.warn("visibility resize observer not triggered", this.logContext);
          }
          stopObservingElementInfo(e2) {
            if (!this.isAdaptiveStream) return void this.log.warn("stopObservingElementInfo ignored", this.logContext);
            const t2 = this.elementInfos.filter(((t3) => t3 === e2));
            for (const e3 of t2) e3.stopObserving();
            this.elementInfos = this.elementInfos.filter(((t3) => t3 !== e2)), this.updateVisibility(), this.debouncedHandleResize();
          }
          detach(e2) {
            let t2 = [];
            if (e2) return this.stopObservingElement(e2), super.detach(e2);
            t2 = super.detach();
            for (const e3 of t2) this.stopObservingElement(e3);
            return t2;
          }
          getDecoderImplementation() {
            var e2;
            return null === (e2 = this.prevStats) || void 0 === e2 ? void 0 : e2.decoderImplementation;
          }
          getReceiverStats() {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.receiver || !this.receiver.getStats) return;
              const e2 = yield this.receiver.getStats();
              let t2, n2 = "", i2 = /* @__PURE__ */ new Map();
              return e2.forEach(((e3) => {
                "inbound-rtp" === e3.type ? (n2 = e3.codecId, t2 = { type: "video", streamId: e3.id, framesDecoded: e3.framesDecoded, framesDropped: e3.framesDropped, framesReceived: e3.framesReceived, packetsReceived: e3.packetsReceived, packetsLost: e3.packetsLost, frameWidth: e3.frameWidth, frameHeight: e3.frameHeight, pliCount: e3.pliCount, firCount: e3.firCount, nackCount: e3.nackCount, jitter: e3.jitter, timestamp: e3.timestamp, bytesReceived: e3.bytesReceived, decoderImplementation: e3.decoderImplementation }) : "codec" === e3.type && i2.set(e3.id, e3);
              })), t2 && "" !== n2 && i2.get(n2) && (t2.mimeType = i2.get(n2).mimeType), t2;
            }));
          }
          stopObservingElement(e2) {
            const t2 = this.elementInfos.filter(((t3) => t3.element === e2));
            for (const e3 of t2) this.stopObservingElementInfo(e3);
          }
          handleAppVisibilityChanged() {
            const e2 = Object.create(null, { handleAppVisibilityChanged: { get: () => super.handleAppVisibilityChanged } });
            return Xi(this, void 0, void 0, (function* () {
              yield e2.handleAppVisibilityChanged.call(this), this.isAdaptiveStream && this.updateVisibility();
            }));
          }
          updateVisibility(t2) {
            var n2, i2;
            const r2 = this.elementInfos.reduce(((e2, t3) => Math.max(e2, t3.visibilityChangedAt || 0)), 0), s2 = !(null !== (i2 = null === (n2 = this.adaptiveStreamSettings) || void 0 === n2 ? void 0 : n2.pauseVideoInBackground) && void 0 !== i2 && !i2) && this.isInBackground, a2 = this.elementInfos.some(((e2) => e2.pictureInPicture)), o2 = this.elementInfos.some(((e2) => e2.visible)) && !s2 || a2;
            (this.lastVisible !== o2 || t2) && (!o2 && Date.now() - r2 < 100 ? js.setTimeout((() => {
              this.updateVisibility();
            }), 100) : (this.lastVisible = o2, this.emit(e.TrackEvent.VisibilityChanged, o2, this)));
          }
          updateDimensions() {
            var t2, n2;
            let i2 = 0, r2 = 0;
            const s2 = this.getPixelDensity();
            for (const e2 of this.elementInfos) {
              const t3 = e2.width() * s2, n3 = e2.height() * s2;
              t3 + n3 > i2 + r2 && (i2 = t3, r2 = n3);
            }
            (null === (t2 = this.lastDimensions) || void 0 === t2 ? void 0 : t2.width) === i2 && (null === (n2 = this.lastDimensions) || void 0 === n2 ? void 0 : n2.height) === r2 || (this.lastDimensions = { width: i2, height: r2 }, this.emit(e.TrackEvent.VideoDimensionsChanged, this.lastDimensions, this));
          }
          getPixelDensity() {
            var e2;
            const t2 = null === (e2 = this.adaptiveStreamSettings) || void 0 === e2 ? void 0 : e2.pixelDensity;
            if ("screen" === t2) return Ua();
            if (!t2) {
              return Ua() > 2 ? 2 : 1;
            }
            return t2;
          }
        }
        class ml {
          get visible() {
            return this.isPiP || this.isIntersecting;
          }
          get pictureInPicture() {
            return this.isPiP;
          }
          constructor(e2, t2) {
            this.onVisibilityChanged = (e3) => {
              var t3;
              const { target: n2, isIntersecting: i2 } = e3;
              n2 === this.element && (this.isIntersecting = i2, this.isPiP = gl(this.element), this.visibilityChangedAt = Date.now(), null === (t3 = this.handleVisibilityChanged) || void 0 === t3 || t3.call(this));
            }, this.onEnterPiP = () => {
              var e3, t3;
              null === (t3 = null === (e3 = window.documentPictureInPicture) || void 0 === e3 ? void 0 : e3.window) || void 0 === t3 || t3.addEventListener("pagehide", this.onLeavePiP), queueMicrotask((() => {
                requestAnimationFrame((() => {
                  var e4;
                  this.isPiP = gl(this.element), null === (e4 = this.handleVisibilityChanged) || void 0 === e4 || e4.call(this);
                }));
              }));
            }, this.onLeavePiP = () => {
              var e3;
              this.isPiP = gl(this.element), null === (e3 = this.handleVisibilityChanged) || void 0 === e3 || e3.call(this);
            }, this.element = e2, this.isIntersecting = null != t2 ? t2 : vl(e2), this.isPiP = Ma() && gl(e2), this.visibilityChangedAt = 0;
          }
          width() {
            return this.element.clientWidth;
          }
          height() {
            return this.element.clientHeight;
          }
          observe() {
            var e2, t2, n2;
            this.isIntersecting = vl(this.element), this.isPiP = gl(this.element), this.element.handleResize = () => {
              var e3;
              null === (e3 = this.handleResize) || void 0 === e3 || e3.call(this);
            }, this.element.handleVisibilityChanged = this.onVisibilityChanged, Wa().observe(this.element), Va().observe(this.element), this.element.addEventListener("enterpictureinpicture", this.onEnterPiP), this.element.addEventListener("leavepictureinpicture", this.onLeavePiP), null === (e2 = window.documentPictureInPicture) || void 0 === e2 || e2.addEventListener("enter", this.onEnterPiP), null === (n2 = null === (t2 = window.documentPictureInPicture) || void 0 === t2 ? void 0 : t2.window) || void 0 === n2 || n2.addEventListener("pagehide", this.onLeavePiP);
          }
          stopObserving() {
            var e2, t2, n2, i2, r2;
            null === (e2 = Wa()) || void 0 === e2 || e2.unobserve(this.element), null === (t2 = Va()) || void 0 === t2 || t2.unobserve(this.element), this.element.removeEventListener("enterpictureinpicture", this.onEnterPiP), this.element.removeEventListener("leavepictureinpicture", this.onLeavePiP), null === (n2 = window.documentPictureInPicture) || void 0 === n2 || n2.removeEventListener("enter", this.onEnterPiP), null === (r2 = null === (i2 = window.documentPictureInPicture) || void 0 === i2 ? void 0 : i2.window) || void 0 === r2 || r2.removeEventListener("pagehide", this.onLeavePiP);
          }
        }
        function gl(e2) {
          var t2, n2;
          return document.pictureInPictureElement === e2 || !!(null === (t2 = window.documentPictureInPicture) || void 0 === t2 ? void 0 : t2.window) && vl(e2, null === (n2 = window.documentPictureInPicture) || void 0 === n2 ? void 0 : n2.window);
        }
        function vl(e2, t2) {
          const n2 = t2 || window;
          let i2 = e2.offsetTop, r2 = e2.offsetLeft;
          const s2 = e2.offsetWidth, a2 = e2.offsetHeight, { hidden: o2 } = e2, { display: c2 } = getComputedStyle(e2);
          for (; e2.offsetParent; ) i2 += (e2 = e2.offsetParent).offsetTop, r2 += e2.offsetLeft;
          return i2 < n2.pageYOffset + n2.innerHeight && r2 < n2.pageXOffset + n2.innerWidth && i2 + a2 > n2.pageYOffset && r2 + s2 > n2.pageXOffset && !o2 && "none" !== c2;
        }
        class fl extends rr.EventEmitter {
          constructor(t2, n2, i2, r2) {
            var s2;
            super(), this.metadataMuted = false, this.encryption = mt.NONE, this.log = Hi, this.handleMuted = () => {
              this.emit(e.TrackEvent.Muted);
            }, this.handleUnmuted = () => {
              this.emit(e.TrackEvent.Unmuted);
            }, this.log = Ki(null !== (s2 = null == r2 ? void 0 : r2.loggerName) && void 0 !== s2 ? s2 : e.LoggerNames.Publication), this.loggerContextCb = this.loggerContextCb, this.setMaxListeners(100), this.kind = t2, this.trackSid = n2, this.trackName = i2, this.source = pa.Source.Unknown;
          }
          setTrack(t2) {
            this.track && (this.track.off(e.TrackEvent.Muted, this.handleMuted), this.track.off(e.TrackEvent.Unmuted, this.handleUnmuted)), this.track = t2, t2 && (t2.on(e.TrackEvent.Muted, this.handleMuted), t2.on(e.TrackEvent.Unmuted, this.handleUnmuted));
          }
          get logContext() {
            var e2;
            return Object.assign(Object.assign({}, null === (e2 = this.loggerContextCb) || void 0 === e2 ? void 0 : e2.call(this)), ca(this));
          }
          get isMuted() {
            return this.metadataMuted;
          }
          get isEnabled() {
            return true;
          }
          get isSubscribed() {
            return void 0 !== this.track;
          }
          get isEncrypted() {
            return this.encryption !== mt.NONE;
          }
          get audioTrack() {
            if (io(this.track)) return this.track;
          }
          get videoTrack() {
            if (ro(this.track)) return this.track;
          }
          updateInfo(e2) {
            this.trackSid = e2.sid, this.trackName = e2.name, this.source = pa.sourceFromProto(e2.source), this.mimeType = e2.mimeType, this.kind === pa.Kind.Video && e2.width > 0 && (this.dimensions = { width: e2.width, height: e2.height }, this.simulcasted = e2.simulcast), this.encryption = e2.encryption, this.trackInfo = e2, this.log.debug("update publication info", Object.assign(Object.assign({}, this.logContext), { info: e2 }));
          }
        }
        !(function(e2) {
          var t2, n2;
          (t2 = e2.SubscriptionStatus || (e2.SubscriptionStatus = {})).Desired = "desired", t2.Subscribed = "subscribed", t2.Unsubscribed = "unsubscribed", (n2 = e2.PermissionStatus || (e2.PermissionStatus = {})).Allowed = "allowed", n2.NotAllowed = "not_allowed";
        })(fl || (fl = {}));
        class kl extends fl {
          get isUpstreamPaused() {
            var e2;
            return null === (e2 = this.track) || void 0 === e2 ? void 0 : e2.isUpstreamPaused;
          }
          constructor(t2, n2, i2, r2) {
            super(t2, n2.sid, n2.name, r2), this.track = void 0, this.handleTrackEnded = () => {
              this.emit(e.TrackEvent.Ended);
            }, this.handleCpuConstrained = () => {
              this.track && ro(this.track) && this.emit(e.TrackEvent.CpuConstrained, this.track);
            }, this.updateInfo(n2), this.setTrack(i2);
          }
          setTrack(t2) {
            this.track && (this.track.off(e.TrackEvent.Ended, this.handleTrackEnded), this.track.off(e.TrackEvent.CpuConstrained, this.handleCpuConstrained)), super.setTrack(t2), t2 && (t2.on(e.TrackEvent.Ended, this.handleTrackEnded), t2.on(e.TrackEvent.CpuConstrained, this.handleCpuConstrained));
          }
          get isMuted() {
            return this.track ? this.track.isMuted : super.isMuted;
          }
          get audioTrack() {
            return super.audioTrack;
          }
          get videoTrack() {
            return super.videoTrack;
          }
          get isLocal() {
            return true;
          }
          mute() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              return null === (e2 = this.track) || void 0 === e2 ? void 0 : e2.mute();
            }));
          }
          unmute() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              return null === (e2 = this.track) || void 0 === e2 ? void 0 : e2.unmute();
            }));
          }
          pauseUpstream() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              yield null === (e2 = this.track) || void 0 === e2 ? void 0 : e2.pauseUpstream();
            }));
          }
          resumeUpstream() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              yield null === (e2 = this.track) || void 0 === e2 ? void 0 : e2.resumeUpstream();
            }));
          }
          getTrackFeatures() {
            var e2;
            if (io(this.track)) {
              const t2 = this.track.getSourceTrackSettings(), n2 = /* @__PURE__ */ new Set();
              return t2.autoGainControl && n2.add(st.TF_AUTO_GAIN_CONTROL), t2.echoCancellation && n2.add(st.TF_ECHO_CANCELLATION), t2.noiseSuppression && n2.add(st.TF_NOISE_SUPPRESSION), t2.channelCount && t2.channelCount > 1 && n2.add(st.TF_STEREO), (null === (e2 = this.options) || void 0 === e2 ? void 0 : e2.dtx) || n2.add(st.TF_NO_DTX), this.track.enhancedNoiseCancellation && n2.add(st.TF_ENHANCED_NOISE_CANCELLATION), Array.from(n2.values());
            }
            return [];
          }
        }
        function yl(e2, t2) {
          return Xi(this, void 0, void 0, (function* () {
            null != e2 || (e2 = {});
            let n2 = false;
            const { audioProcessor: i2, videoProcessor: r2, optionsWithoutProcessor: s2 } = da(e2);
            let a2 = s2.audio, o2 = s2.video;
            if (i2 && "object" == typeof s2.audio && (s2.audio.processor = i2), r2 && "object" == typeof s2.video && (s2.video.processor = r2), e2.audio && "object" == typeof s2.audio && "string" == typeof s2.audio.deviceId) {
              const e3 = s2.audio.deviceId;
              s2.audio.deviceId = { exact: e3 }, n2 = true, a2 = Object.assign(Object.assign({}, s2.audio), { deviceId: { ideal: e3 } });
            }
            if (s2.video && "object" == typeof s2.video && "string" == typeof s2.video.deviceId) {
              const e3 = s2.video.deviceId;
              s2.video.deviceId = { exact: e3 }, n2 = true, o2 = Object.assign(Object.assign({}, s2.video), { deviceId: { ideal: e3 } });
            }
            true === s2.audio ? s2.audio = { deviceId: "default" } : "object" == typeof s2.audio && null !== s2.audio && (s2.audio = Object.assign(Object.assign({}, s2.audio), { deviceId: s2.audio.deviceId || "default" })), true === s2.video ? s2.video = { deviceId: "default" } : "object" != typeof s2.video || s2.video.deviceId || (s2.video.deviceId = "default");
            const c2 = Zs(s2, wc, Rc), d2 = ea(c2), l2 = navigator.mediaDevices.getUserMedia(d2);
            s2.audio && (No.userMediaPromiseMap.set("audioinput", l2), l2.catch((() => No.userMediaPromiseMap.delete("audioinput")))), s2.video && (No.userMediaPromiseMap.set("videoinput", l2), l2.catch((() => No.userMediaPromiseMap.delete("videoinput"))));
            try {
              const e3 = yield l2;
              return yield Promise.all(e3.getTracks().map(((n3) => Xi(this, void 0, void 0, (function* () {
                const s3 = "audio" === n3.kind;
                let a3, o3 = s3 ? c2.audio : c2.video;
                "boolean" != typeof o3 && o3 || (o3 = {});
                const l3 = s3 ? d2.audio : d2.video;
                "boolean" != typeof l3 && (a3 = l3);
                const u2 = n3.getSettings().deviceId;
                (null == a3 ? void 0 : a3.deviceId) && Xa(a3.deviceId) !== u2 ? a3.deviceId = u2 : a3 || (a3 = { deviceId: u2 });
                const h2 = (function(e4, t3, n4) {
                  switch (e4.kind) {
                    case "audio":
                      return new jc(e4, t3, false, void 0, n4);
                    case "video":
                      return new ed(e4, t3, false, n4);
                    default:
                      throw new Os("unsupported track type: ".concat(e4.kind));
                  }
                })(n3, a3, t2);
                return h2.kind === pa.Kind.Video ? h2.source = pa.Source.Camera : h2.kind === pa.Kind.Audio && (h2.source = pa.Source.Microphone), h2.mediaStream = e3, io(h2) && i2 ? yield h2.setProcessor(i2) : ro(h2) && r2 && (yield h2.setProcessor(r2)), h2;
              })))));
            } catch (i3) {
              if (!n2) throw i3;
              return yl(Object.assign(Object.assign({}, e2), { audio: a2, video: o2 }), t2);
            }
          }));
        }
        function bl(e2) {
          return Xi(this, void 0, void 0, (function* () {
            return (yield yl({ audio: false, video: null == e2 || e2 }))[0];
          }));
        }
        function Tl(e2) {
          return Xi(this, void 0, void 0, (function* () {
            return (yield yl({ audio: null == e2 || e2, video: false }))[0];
          }));
        }
        var Sl, El;
        e.ConnectionQuality = void 0, (Sl = e.ConnectionQuality || (e.ConnectionQuality = {})).Excellent = "excellent", Sl.Good = "good", Sl.Poor = "poor", Sl.Lost = "lost", Sl.Unknown = "unknown";
        class Cl extends rr.EventEmitter {
          get logContext() {
            var e2, t2;
            return Object.assign({}, null === (t2 = null === (e2 = this.loggerOptions) || void 0 === e2 ? void 0 : e2.loggerContextCb) || void 0 === t2 ? void 0 : t2.call(e2));
          }
          get isEncrypted() {
            return this.trackPublications.size > 0 && Array.from(this.trackPublications.values()).every(((e2) => e2.isEncrypted));
          }
          get isAgent() {
            var e2;
            return (null === (e2 = this.permissions) || void 0 === e2 ? void 0 : e2.agent) || this.kind === ht.AGENT;
          }
          get isActive() {
            var e2;
            return (null === (e2 = this.participantInfo) || void 0 === e2 ? void 0 : e2.state) === ut.ACTIVE;
          }
          get kind() {
            return this._kind;
          }
          get attributes() {
            return Object.freeze(Object.assign({}, this._attributes));
          }
          constructor(t2, n2, i2, r2, s2, a2) {
            let o2 = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : ht.STANDARD;
            var c2;
            super(), this.audioLevel = 0, this.isSpeaking = false, this._connectionQuality = e.ConnectionQuality.Unknown, this.log = Hi, this.loggerOptions = a2, this.log = Ki(null !== (c2 = null == a2 ? void 0 : a2.loggerName) && void 0 !== c2 ? c2 : e.LoggerNames.Participant, (() => this.logContext)), this.setMaxListeners(100), this.sid = t2, this.identity = n2, this.name = i2, this.metadata = r2, this.audioTrackPublications = /* @__PURE__ */ new Map(), this.videoTrackPublications = /* @__PURE__ */ new Map(), this.trackPublications = /* @__PURE__ */ new Map(), this._kind = o2, this._attributes = null != s2 ? s2 : {};
          }
          getTrackPublications() {
            return Array.from(this.trackPublications.values());
          }
          getTrackPublication(e2) {
            for (const [, t2] of this.trackPublications) if (t2.source === e2) return t2;
          }
          getTrackPublicationByName(e2) {
            for (const [, t2] of this.trackPublications) if (t2.trackName === e2) return t2;
          }
          waitUntilActive() {
            return this.isActive ? Promise.resolve() : (this.activeFuture || (this.activeFuture = new Qa(), this.once(e.ParticipantEvent.Active, (() => {
              var e2, t2;
              null === (t2 = null === (e2 = this.activeFuture) || void 0 === e2 ? void 0 : e2.resolve) || void 0 === t2 || t2.call(e2), this.activeFuture = void 0;
            }))), this.activeFuture.promise);
          }
          get connectionQuality() {
            return this._connectionQuality;
          }
          get isCameraEnabled() {
            var e2;
            const t2 = this.getTrackPublication(pa.Source.Camera);
            return !(null === (e2 = null == t2 ? void 0 : t2.isMuted) || void 0 === e2 || e2);
          }
          get isMicrophoneEnabled() {
            var e2;
            const t2 = this.getTrackPublication(pa.Source.Microphone);
            return !(null === (e2 = null == t2 ? void 0 : t2.isMuted) || void 0 === e2 || e2);
          }
          get isScreenShareEnabled() {
            return !!this.getTrackPublication(pa.Source.ScreenShare);
          }
          get isLocal() {
            return false;
          }
          get joinedAt() {
            return this.participantInfo ? new Date(1e3 * Number.parseInt(this.participantInfo.joinedAt.toString())) : /* @__PURE__ */ new Date();
          }
          updateInfo(t2) {
            var n2;
            return !(this.participantInfo && this.participantInfo.sid === t2.sid && this.participantInfo.version > t2.version) && (this.identity = t2.identity, this.sid = t2.sid, this._setName(t2.name), this._setMetadata(t2.metadata), this._setAttributes(t2.attributes), t2.state === ut.ACTIVE && (null === (n2 = this.participantInfo) || void 0 === n2 ? void 0 : n2.state) !== ut.ACTIVE && this.emit(e.ParticipantEvent.Active), t2.permission && this.setPermissions(t2.permission), this.participantInfo = t2, true);
          }
          _setMetadata(t2) {
            const n2 = this.metadata !== t2, i2 = this.metadata;
            this.metadata = t2, n2 && this.emit(e.ParticipantEvent.ParticipantMetadataChanged, i2);
          }
          _setName(t2) {
            const n2 = this.name !== t2;
            this.name = t2, n2 && this.emit(e.ParticipantEvent.ParticipantNameChanged, t2);
          }
          _setAttributes(t2) {
            const n2 = (function(e2, t3) {
              var n3;
              void 0 === e2 && (e2 = {}), void 0 === t3 && (t3 = {});
              const i2 = [...Object.keys(t3), ...Object.keys(e2)], r2 = {};
              for (const s2 of i2) e2[s2] !== t3[s2] && (r2[s2] = null !== (n3 = t3[s2]) && void 0 !== n3 ? n3 : "");
              return r2;
            })(this.attributes, t2);
            this._attributes = t2, Object.keys(n2).length > 0 && this.emit(e.ParticipantEvent.AttributesChanged, n2);
          }
          setPermissions(t2) {
            var n2, i2, r2, s2, a2, o2;
            const c2 = this.permissions, d2 = t2.canPublish !== (null === (n2 = this.permissions) || void 0 === n2 ? void 0 : n2.canPublish) || t2.canSubscribe !== (null === (i2 = this.permissions) || void 0 === i2 ? void 0 : i2.canSubscribe) || t2.canPublishData !== (null === (r2 = this.permissions) || void 0 === r2 ? void 0 : r2.canPublishData) || t2.hidden !== (null === (s2 = this.permissions) || void 0 === s2 ? void 0 : s2.hidden) || t2.recorder !== (null === (a2 = this.permissions) || void 0 === a2 ? void 0 : a2.recorder) || t2.canPublishSources.length !== this.permissions.canPublishSources.length || t2.canPublishSources.some(((e2, t3) => {
              var n3;
              return e2 !== (null === (n3 = this.permissions) || void 0 === n3 ? void 0 : n3.canPublishSources[t3]);
            })) || t2.canSubscribeMetrics !== (null === (o2 = this.permissions) || void 0 === o2 ? void 0 : o2.canSubscribeMetrics);
            return this.permissions = t2, d2 && this.emit(e.ParticipantEvent.ParticipantPermissionsChanged, c2), d2;
          }
          setIsSpeaking(t2) {
            t2 !== this.isSpeaking && (this.isSpeaking = t2, t2 && (this.lastSpokeAt = /* @__PURE__ */ new Date()), this.emit(e.ParticipantEvent.IsSpeakingChanged, t2));
          }
          setConnectionQuality(t2) {
            const n2 = this._connectionQuality;
            this._connectionQuality = (function(t3) {
              switch (t3) {
                case et.EXCELLENT:
                  return e.ConnectionQuality.Excellent;
                case et.GOOD:
                  return e.ConnectionQuality.Good;
                case et.POOR:
                  return e.ConnectionQuality.Poor;
                case et.LOST:
                  return e.ConnectionQuality.Lost;
                default:
                  return e.ConnectionQuality.Unknown;
              }
            })(t2), n2 !== this._connectionQuality && this.emit(e.ParticipantEvent.ConnectionQualityChanged, this._connectionQuality);
          }
          setDisconnected() {
            var e2, t2;
            this.activeFuture && (null === (t2 = (e2 = this.activeFuture).reject) || void 0 === t2 || t2.call(e2, new Error("Participant disconnected")), this.activeFuture = void 0);
          }
          setAudioContext(e2) {
            this.audioContext = e2, this.audioTrackPublications.forEach(((t2) => io(t2.track) && t2.track.setAudioContext(e2)));
          }
          addTrackPublication(t2) {
            t2.on(e.TrackEvent.Muted, (() => {
              this.emit(e.ParticipantEvent.TrackMuted, t2);
            })), t2.on(e.TrackEvent.Unmuted, (() => {
              this.emit(e.ParticipantEvent.TrackUnmuted, t2);
            }));
            const n2 = t2;
            switch (n2.track && (n2.track.sid = t2.trackSid), this.trackPublications.set(t2.trackSid, t2), t2.kind) {
              case pa.Kind.Audio:
                this.audioTrackPublications.set(t2.trackSid, t2);
                break;
              case pa.Kind.Video:
                this.videoTrackPublications.set(t2.trackSid, t2);
            }
          }
        }
        class wl extends Cl {
          constructor(t2, n2, i2, s2, a2, o2, c2) {
            super(t2, n2, void 0, void 0, void 0, { loggerName: s2.loggerName, loggerContextCb: () => this.engine.logContext }), this.pendingPublishing = /* @__PURE__ */ new Set(), this.pendingPublishPromises = /* @__PURE__ */ new Map(), this.participantTrackPermissions = [], this.allParticipantsAllowedToSubscribe = true, this.encryptionType = mt.NONE, this.e2eeStateMutex = new r(), this.enabledPublishVideoCodecs = [], this.pendingAcks = /* @__PURE__ */ new Map(), this.pendingResponses = /* @__PURE__ */ new Map(), this.handleReconnecting = () => {
              this.reconnectFuture || (this.reconnectFuture = new Qa());
            }, this.handleReconnected = () => {
              var e2, t3;
              null === (t3 = null === (e2 = this.reconnectFuture) || void 0 === e2 ? void 0 : e2.resolve) || void 0 === t3 || t3.call(e2), this.reconnectFuture = void 0, this.updateTrackSubscriptionPermissions();
            }, this.handleClosing = () => {
              var e2, t3, n3, i3, r2, s3;
              this.reconnectFuture && (this.reconnectFuture.promise.catch(((e3) => this.log.warn(e3.message))), null === (t3 = null === (e2 = this.reconnectFuture) || void 0 === e2 ? void 0 : e2.reject) || void 0 === t3 || t3.call(e2, new Error("Got disconnected during reconnection attempt")), this.reconnectFuture = void 0), this.signalConnectedFuture && (null === (i3 = (n3 = this.signalConnectedFuture).reject) || void 0 === i3 || i3.call(n3, new Error("Got disconnected without signal connected")), this.signalConnectedFuture = void 0), null === (s3 = null === (r2 = this.activeAgentFuture) || void 0 === r2 ? void 0 : r2.reject) || void 0 === s3 || s3.call(r2, new Error("Got disconnected without active agent present")), this.activeAgentFuture = void 0, this.firstActiveAgent = void 0;
            }, this.handleSignalConnected = (e2) => {
              var t3, n3;
              e2.participant && this.updateInfo(e2.participant), this.signalConnectedFuture || (this.signalConnectedFuture = new Qa()), null === (n3 = (t3 = this.signalConnectedFuture).resolve) || void 0 === n3 || n3.call(t3);
            }, this.handleSignalRequestResponse = (e2) => {
              const { requestId: t3, reason: n3, message: i3 } = e2, r2 = this.pendingSignalRequests.get(t3);
              switch (r2 && (n3 !== si.OK && r2.reject(new Us(i3, n3)), this.pendingSignalRequests.delete(t3)), e2.request.case) {
                case "publishDataTrack": {
                  let t4;
                  switch (e2.reason) {
                    case si.NOT_ALLOWED:
                      t4 = il.notAllowed(e2.message);
                      break;
                    case si.DUPLICATE_NAME:
                      t4 = il.duplicateName(e2.message);
                      break;
                    case si.INVALID_NAME:
                      t4 = il.invalidName(e2.message);
                      break;
                    case si.LIMIT_EXCEEDED:
                      t4 = il.limitReached(e2.message);
                      break;
                    default:
                      return void (t4 = il.unknown(e2.reason, e2.message));
                  }
                  this.roomOutgoingDataTrackManager.receivedSfuPublishResponse(e2.request.value.pubHandle, { type: "error", error: t4 });
                  break;
                }
              }
            }, this.handleDataPacket = (e2) => {
              switch (e2.value.case) {
                case "rpcResponse":
                  let t3 = e2.value.value, n3 = null, i3 = null;
                  "payload" === t3.value.case ? n3 = t3.value.value : "error" === t3.value.case && (i3 = Mc.fromProto(t3.value.value)), this.handleIncomingRpcResponse(t3.requestId, n3, i3);
                  break;
                case "rpcAck":
                  let r2 = e2.value.value;
                  this.handleIncomingRpcAck(r2.requestId);
              }
            }, this.updateTrackSubscriptionPermissions = () => {
              this.log.debug("updating track subscription permissions", { allParticipantsAllowed: this.allParticipantsAllowedToSubscribe, participantTrackPermissions: this.participantTrackPermissions }), this.engine.client.sendUpdateSubscriptionPermissions(this.allParticipantsAllowedToSubscribe, this.participantTrackPermissions.map(((e2) => (function(e3) {
                var t3, n3, i3;
                if (!e3.participantSid && !e3.participantIdentity) throw new Error("Invalid track permission, must provide at least one of participantIdentity and participantSid");
                return new Kn({ participantIdentity: null !== (t3 = e3.participantIdentity) && void 0 !== t3 ? t3 : "", participantSid: null !== (n3 = e3.participantSid) && void 0 !== n3 ? n3 : "", allTracks: null !== (i3 = e3.allowAll) && void 0 !== i3 && i3, trackSids: e3.allowedTrackSids || [] });
              })(e2))));
            }, this.onTrackUnmuted = (e2) => {
              this.onTrackMuted(e2, e2.isUpstreamPaused);
            }, this.onTrackMuted = (e2, t3) => {
              void 0 === t3 && (t3 = true), e2.sid ? this.engine.updateMuteStatus(e2.sid, t3) : this.log.error("could not update mute status for unpublished track", ca(e2));
            }, this.onTrackUpstreamPaused = (e2) => {
              this.log.debug("upstream paused", ca(e2)), this.onTrackMuted(e2, true);
            }, this.onTrackUpstreamResumed = (e2) => {
              this.log.debug("upstream resumed", ca(e2)), this.onTrackMuted(e2, e2.isMuted);
            }, this.onTrackFeatureUpdate = (e2) => {
              const t3 = this.audioTrackPublications.get(e2.sid);
              t3 ? this.engine.client.sendUpdateLocalAudioTrack(t3.trackSid, t3.getTrackFeatures()) : this.log.warn("Could not update local audio track settings, missing publication for track ".concat(e2.sid));
            }, this.onTrackCpuConstrained = (t3, n3) => {
              this.log.debug("track cpu constrained", ca(n3)), this.emit(e.ParticipantEvent.LocalTrackCpuConstrained, t3, n3);
            }, this.handleSubscribedQualityUpdate = (e2) => Xi(this, void 0, void 0, (function* () {
              var t3, n3, i3, r2, s3;
              if (!(null === (s3 = this.roomOptions) || void 0 === s3 ? void 0 : s3.dynacast)) return;
              const a3 = this.videoTrackPublications.get(e2.trackSid);
              if (!a3) return void this.log.warn("received subscribed quality update for unknown track", { trackSid: e2.trackSid });
              if (!a3.videoTrack) return;
              const o3 = yield a3.videoTrack.setPublishingCodecs(e2.subscribedCodecs);
              try {
                for (var c3, d2 = true, l2 = tr(o3); !(t3 = (c3 = yield l2.next()).done); d2 = true) {
                  r2 = c3.value, d2 = false;
                  const e3 = r2;
                  zs(e3) && (this.log.debug("publish ".concat(e3, " for ").concat(a3.videoTrack.sid), ca(a3)), yield this.publishAdditionalCodecForTrack(a3.videoTrack, e3, a3.options));
                }
              } catch (e3) {
                n3 = { error: e3 };
              } finally {
                try {
                  d2 || t3 || !(i3 = l2.return) || (yield i3.call(l2));
                } finally {
                  if (n3) throw n3.error;
                }
              }
            })), this.handleLocalTrackUnpublished = (e2) => {
              const t3 = this.trackPublications.get(e2.trackSid);
              t3 ? this.unpublishTrack(t3.track) : this.log.warn("received unpublished event for unknown track", { trackSid: e2.trackSid });
            }, this.handleTrackEnded = (e2) => Xi(this, void 0, void 0, (function* () {
              if (e2.source === pa.Source.ScreenShare || e2.source === pa.Source.ScreenShareAudio) this.log.debug("unpublishing local track due to TrackEnded", ca(e2)), this.unpublishTrack(e2);
              else if (e2.isUserProvided) yield e2.mute();
              else if (ao(e2) || so(e2)) try {
                if (Ma()) try {
                  const t3 = yield null === navigator || void 0 === navigator ? void 0 : navigator.permissions.query({ name: e2.source === pa.Source.Camera ? "camera" : "microphone" });
                  if (t3 && "denied" === t3.state) throw this.log.warn("user has revoked access to ".concat(e2.source), ca(e2)), t3.onchange = () => {
                    "denied" !== t3.state && (e2.isMuted || e2.restartTrack(), t3.onchange = null);
                  }, new Error("GetUserMedia Permission denied");
                } catch (e3) {
                }
                e2.isMuted || (this.log.debug("track ended, attempting to use a different device", ca(e2)), ao(e2) ? yield e2.restartTrack({ deviceId: "default" }) : yield e2.restartTrack());
              } catch (t3) {
                this.log.warn("could not restart track, muting instead", ca(e2)), yield e2.mute();
              }
            })), this.audioTrackPublications = /* @__PURE__ */ new Map(), this.videoTrackPublications = /* @__PURE__ */ new Map(), this.trackPublications = /* @__PURE__ */ new Map(), this.engine = i2, this.roomOptions = s2, this.setupEngine(i2), this.activeDeviceMap = /* @__PURE__ */ new Map([["audioinput", "default"], ["videoinput", "default"], ["audiooutput", "default"]]), this.pendingSignalRequests = /* @__PURE__ */ new Map(), this.rpcHandlers = a2, this.roomOutgoingDataStreamManager = o2, this.roomOutgoingDataTrackManager = c2;
          }
          get lastCameraError() {
            return this.cameraError;
          }
          get lastMicrophoneError() {
            return this.microphoneError;
          }
          get isE2EEEnabled() {
            return this.encryptionType !== mt.NONE;
          }
          getTrackPublication(e2) {
            const t2 = super.getTrackPublication(e2);
            if (t2) return t2;
          }
          getTrackPublicationByName(e2) {
            const t2 = super.getTrackPublicationByName(e2);
            if (t2) return t2;
          }
          setupEngine(t2) {
            var n2;
            this.engine = t2, this.engine.on(e.EngineEvent.RemoteMute, ((e2, t3) => {
              const n3 = this.trackPublications.get(e2);
              n3 && n3.track && (t3 ? n3.mute() : n3.unmute());
            })), (null === (n2 = this.signalConnectedFuture) || void 0 === n2 ? void 0 : n2.isResolved) && (this.signalConnectedFuture = void 0), this.engine.on(e.EngineEvent.Connected, this.handleReconnected).on(e.EngineEvent.SignalConnected, this.handleSignalConnected).on(e.EngineEvent.SignalRestarted, this.handleReconnected).on(e.EngineEvent.SignalResumed, this.handleReconnected).on(e.EngineEvent.Restarting, this.handleReconnecting).on(e.EngineEvent.Resuming, this.handleReconnecting).on(e.EngineEvent.LocalTrackUnpublished, this.handleLocalTrackUnpublished).on(e.EngineEvent.SubscribedQualityUpdate, this.handleSubscribedQualityUpdate).on(e.EngineEvent.Closing, this.handleClosing).on(e.EngineEvent.SignalRequestResponse, this.handleSignalRequestResponse).on(e.EngineEvent.DataPacketReceived, this.handleDataPacket);
          }
          setMetadata(e2) {
            return Xi(this, void 0, void 0, (function* () {
              yield this.requestMetadataUpdate({ metadata: e2 });
            }));
          }
          setName(e2) {
            return Xi(this, void 0, void 0, (function* () {
              yield this.requestMetadataUpdate({ name: e2 });
            }));
          }
          setAttributes(e2) {
            return Xi(this, void 0, void 0, (function* () {
              yield this.requestMetadataUpdate({ attributes: e2 });
            }));
          }
          requestMetadataUpdate(e2) {
            return Xi(this, arguments, void 0, (function(e3) {
              var t2 = this;
              let { metadata: n2, name: i2, attributes: r2 } = e3;
              return (function* () {
                return new ps(((e4, s2) => Xi(t2, void 0, void 0, (function* () {
                  var t3, a2;
                  try {
                    let o2 = false;
                    const c2 = yield this.engine.client.sendUpdateLocalMetadata(null !== (t3 = null != n2 ? n2 : this.metadata) && void 0 !== t3 ? t3 : "", null !== (a2 = null != i2 ? i2 : this.name) && void 0 !== a2 ? a2 : "", r2), d2 = performance.now();
                    for (this.pendingSignalRequests.set(c2, { resolve: e4, reject: (e5) => {
                      s2(e5), o2 = true;
                    }, values: { name: i2, metadata: n2, attributes: r2 } }); performance.now() - d2 < 5e3 && !o2; ) {
                      if ((!i2 || this.name === i2) && (!n2 || this.metadata === n2) && (!r2 || Object.entries(r2).every(((e5) => {
                        let [t4, n3] = e5;
                        return this.attributes[t4] === n3 || "" === n3 && !this.attributes[t4];
                      })))) return this.pendingSignalRequests.delete(c2), void e4();
                      yield fa(50);
                    }
                    s2(new Us("Request to update local metadata timed out", "TimeoutError"));
                  } catch (e5) {
                    e5 instanceof Error ? s2(e5) : s2(new Error(String(e5)));
                  }
                }))));
              })();
            }));
          }
          setCameraEnabled(e2, t2, n2) {
            return this.setTrackEnabled(pa.Source.Camera, e2, t2, n2);
          }
          setMicrophoneEnabled(e2, t2, n2) {
            return this.setTrackEnabled(pa.Source.Microphone, e2, t2, n2);
          }
          setScreenShareEnabled(e2, t2, n2) {
            return this.setTrackEnabled(pa.Source.ScreenShare, e2, t2, n2);
          }
          setE2EEEnabled(e2) {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = yield this.e2eeStateMutex.lock();
              try {
                if (this.encryptionType = e2 ? mt.GCM : mt.NONE, yield Promise.all(this.pendingPublishPromises.values()), 0 === this.trackPublications.size || Array.from(this.trackPublications.values()).every(((t3) => t3.isEncrypted === e2))) return;
                yield this.republishAllTracks(void 0, false);
              } finally {
                t2();
              }
            }));
          }
          setTrackEnabled(t2, n2, i2, r2) {
            return Xi(this, void 0, void 0, (function* () {
              var s2, a2;
              this.log.debug("setTrackEnabled", { source: t2, enabled: n2 }), this.republishPromise && (yield this.republishPromise);
              let o2 = this.getTrackPublication(t2);
              if (n2) if (o2) yield o2.unmute();
              else {
                let n3;
                if (this.pendingPublishing.has(t2)) {
                  const e2 = yield this.waitForPendingPublicationOfSource(t2);
                  return e2 || this.log.info("waiting for pending publication promise timed out", { source: t2 }), yield null == e2 ? void 0 : e2.unmute(), e2;
                }
                this.pendingPublishing.add(t2);
                try {
                  switch (t2) {
                    case pa.Source.Camera:
                      n3 = yield this.createTracks({ video: null === (s2 = i2) || void 0 === s2 || s2 });
                      break;
                    case pa.Source.Microphone:
                      n3 = yield this.createTracks({ audio: null === (a2 = i2) || void 0 === a2 || a2 });
                      break;
                    case pa.Source.ScreenShare:
                      n3 = yield this.createScreenTracks(Object.assign({}, i2));
                      break;
                    default:
                      throw new Os(t2);
                  }
                } catch (i3) {
                  throw null == n3 || n3.forEach(((e2) => {
                    e2.stop();
                  })), i3 instanceof Error && this.emit(e.ParticipantEvent.MediaDevicesError, i3, ra(t2)), this.pendingPublishing.delete(t2), i3;
                }
                for (const e2 of n3) {
                  const n4 = Object.assign(Object.assign({}, this.roomOptions.publishDefaults), i2);
                  t2 === pa.Source.Microphone && io(e2) && n4.preConnectBuffer && (this.log.info("starting preconnect buffer for microphone"), e2.startPreConnectBuffer());
                }
                try {
                  const e2 = [];
                  for (const t4 of n3) this.log.info("publishing track", ca(t4)), e2.push(this.publishTrack(t4, r2));
                  const t3 = yield Promise.all(e2);
                  [o2] = t3;
                } catch (e2) {
                  throw null == n3 || n3.forEach(((e3) => {
                    e3.stop();
                  })), e2;
                } finally {
                  this.pendingPublishing.delete(t2);
                }
              }
              else if (!(null == o2 ? void 0 : o2.track) && this.pendingPublishing.has(t2) && (o2 = yield this.waitForPendingPublicationOfSource(t2), o2 || this.log.info("waiting for pending publication promise timed out", { source: t2 })), o2 && o2.track) if (t2 === pa.Source.ScreenShare) {
                const e2 = [this.unpublishTrack(o2.track)], t3 = this.getTrackPublication(pa.Source.ScreenShareAudio);
                t3 && t3.track && e2.push(this.unpublishTrack(t3.track)), [o2] = yield Promise.all(e2);
              } else yield o2.mute();
              return o2;
            }));
          }
          enableCameraAndMicrophone() {
            return Xi(this, void 0, void 0, (function* () {
              if (!this.pendingPublishing.has(pa.Source.Camera) && !this.pendingPublishing.has(pa.Source.Microphone)) {
                this.pendingPublishing.add(pa.Source.Camera), this.pendingPublishing.add(pa.Source.Microphone);
                try {
                  const e2 = yield this.createTracks({ audio: true, video: true });
                  yield Promise.all(e2.map(((e3) => this.publishTrack(e3))));
                } finally {
                  this.pendingPublishing.delete(pa.Source.Camera), this.pendingPublishing.delete(pa.Source.Microphone);
                }
              }
            }));
          }
          createTracks(t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2, i2;
              null != t2 || (t2 = {});
              const r2 = Zs(t2, null === (n2 = this.roomOptions) || void 0 === n2 ? void 0 : n2.audioCaptureDefaults, null === (i2 = this.roomOptions) || void 0 === i2 ? void 0 : i2.videoCaptureDefaults);
              try {
                const t3 = yield yl(r2, { loggerName: this.roomOptions.loggerName, loggerContextCb: () => this.logContext });
                return t3.map(((t4) => (io(t4) && (this.microphoneError = void 0, t4.setAudioContext(this.audioContext), t4.source = pa.Source.Microphone, this.emit(e.ParticipantEvent.AudioStreamAcquired)), ro(t4) && (this.cameraError = void 0, t4.source = pa.Source.Camera), t4)));
              } catch (e2) {
                throw e2 instanceof Error && (t2.audio && (this.microphoneError = e2), t2.video && (this.cameraError = e2)), e2;
              }
            }));
          }
          createScreenTracks(t2) {
            return Xi(this, void 0, void 0, (function* () {
              if (void 0 === t2 && (t2 = {}), void 0 === navigator.mediaDevices.getDisplayMedia) throw new Ms("getDisplayMedia not supported");
              void 0 !== t2.resolution || Da() || (t2.resolution = Xs.h1080fps30.resolution);
              const n2 = sa(t2), i2 = yield navigator.mediaDevices.getDisplayMedia(n2), r2 = i2.getVideoTracks();
              if (0 === r2.length) throw new Os("no video track found");
              const s2 = new ed(r2[0], void 0, false, { loggerName: this.roomOptions.loggerName, loggerContextCb: () => this.logContext });
              s2.source = pa.Source.ScreenShare, t2.contentHint && (s2.mediaStreamTrack.contentHint = t2.contentHint);
              const a2 = [s2];
              if (i2.getAudioTracks().length > 0) {
                this.emit(e.ParticipantEvent.AudioStreamAcquired);
                const t3 = new jc(i2.getAudioTracks()[0], void 0, false, this.audioContext, { loggerName: this.roomOptions.loggerName, loggerContextCb: () => this.logContext });
                t3.source = pa.Source.ScreenShareAudio, a2.push(t3);
              }
              return a2;
            }));
          }
          publishTrack(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              return this.publishOrRepublishTrack(e2, t2);
            }));
          }
          waitForNextEngineRestart() {
            let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 15e3;
            return new Promise(((n2, i2) => {
              const r2 = () => {
                clearTimeout(o2), this.engine.off(e.EngineEvent.Restarted, s2), this.engine.off(e.EngineEvent.Closing, a2);
              }, s2 = () => {
                r2(), n2();
              }, a2 = () => {
                r2(), i2(new Error("engine closed before restart completed"));
              }, o2 = setTimeout((() => {
                r2(), i2(new Error("timed out waiting for engine restart"));
              }), t2);
              this.engine.once(e.EngineEvent.Restarted, s2), this.engine.once(e.EngineEvent.Closing, a2);
            }));
          }
          publishOrRepublishTrack(e2, t2) {
            return Xi(this, arguments, void 0, (function(e3, t3) {
              var n2 = this;
              let i2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
              return (function* () {
                var s2, a2, o2, c2;
                let d2, l2;
                if (ao(e3) && e3.setAudioContext(n2.audioContext), yield null === (s2 = n2.reconnectFuture) || void 0 === s2 ? void 0 : s2.promise, n2.republishPromise && !i2 && (yield n2.republishPromise), no(e3) && n2.pendingPublishPromises.has(e3) && (yield n2.pendingPublishPromises.get(e3)), e3 instanceof MediaStreamTrack) d2 = e3.getConstraints();
                else {
                  let t4;
                  switch (d2 = e3.constraints, e3.source) {
                    case pa.Source.Microphone:
                      t4 = "audioinput";
                      break;
                    case pa.Source.Camera:
                      t4 = "videoinput";
                  }
                  t4 && n2.activeDeviceMap.has(t4) && (d2 = Object.assign(Object.assign({}, d2), { deviceId: n2.activeDeviceMap.get(t4) }));
                }
                if (e3 instanceof MediaStreamTrack) switch (e3.kind) {
                  case "audio":
                    e3 = new jc(e3, d2, true, n2.audioContext, { loggerName: n2.roomOptions.loggerName, loggerContextCb: () => n2.logContext });
                    break;
                  case "video":
                    e3 = new ed(e3, d2, true, { loggerName: n2.roomOptions.loggerName, loggerContextCb: () => n2.logContext });
                    break;
                  default:
                    throw new Os("unsupported MediaStreamTrack kind ".concat(e3.kind));
                }
                else e3.updateLoggerOptions({ loggerName: n2.roomOptions.loggerName, loggerContextCb: () => n2.logContext });
                if (n2.trackPublications.forEach(((t4) => {
                  t4.track && t4.track === e3 && (l2 = t4);
                })), l2) return n2.log.warn("track has already been published, skipping", ca(l2)), l2;
                const u2 = Object.assign(Object.assign({}, n2.roomOptions.publishDefaults), t3), h2 = "channelCount" in e3.mediaStreamTrack.getSettings() && 2 === e3.mediaStreamTrack.getSettings().channelCount || 2 === e3.mediaStreamTrack.getConstraints().channelCount, p2 = null !== (a2 = u2.forceStereo) && void 0 !== a2 ? a2 : h2;
                p2 && (void 0 === u2.dtx && n2.log.debug("Opus DTX will be disabled for stereo tracks by default. Enable them explicitly to make it work.", ca(e3)), void 0 === u2.red && n2.log.debug("Opus RED will be disabled for stereo tracks by default. Enable them explicitly to make it work."), null !== (o2 = u2.dtx) && void 0 !== o2 || (u2.dtx = false), null !== (c2 = u2.red) && void 0 !== c2 || (u2.red = false)), !(function() {
                  const e4 = vs(), t4 = "17.2";
                  if (e4) return "Safari" !== e4.name && "iOS" !== e4.os || !!("iOS" === e4.os && e4.osVersion && Fa(e4.osVersion, t4) >= 0) || "Safari" === e4.name && Fa(e4.version, t4) >= 0;
                })() && n2.roomOptions.e2ee && (n2.log.info("End-to-end encryption is set up, simulcast publishing will be disabled on Safari versions and iOS browsers running iOS < v17.2"), u2.simulcast = false), u2.source && (e3.source = u2.source);
                const m2 = new Promise(((t4, i3) => Xi(n2, void 0, void 0, (function* () {
                  try {
                    if (this.engine.client.currentState !== Yo.CONNECTED) {
                      this.log.debug("deferring track publication until signal is connected", { track: ca(e3) });
                      let n3 = false;
                      const r3 = setTimeout((() => {
                        n3 = true, e3.stop(), i3(new xs("publishing rejected as engine not connected within timeout", 408));
                      }), 15e3);
                      if (yield this.waitUntilEngineConnected(), clearTimeout(r3), n3) return;
                      const s3 = yield this.publish(e3, u2, p2);
                      t4(s3);
                    } else try {
                      const n3 = yield this.publish(e3, u2, p2);
                      t4(n3);
                    } catch (e4) {
                      i3(e4);
                    }
                  } catch (e4) {
                    i3(e4);
                  }
                }))));
                n2.pendingPublishPromises.set(e3, m2);
                try {
                  return yield m2;
                } catch (s3) {
                  if (!r2 && s3 instanceof Ls) return n2.log.warn("negotiation due to track publish failed, retrying after reconnect", { error: s3 }), n2.pendingPublishPromises.delete(e3), yield n2.waitForNextEngineRestart(), yield n2.publishOrRepublishTrack(e3, t3, i2, true);
                  throw s3;
                } finally {
                  n2.pendingPublishPromises.delete(e3);
                }
              })();
            }));
          }
          waitUntilEngineConnected() {
            return this.signalConnectedFuture || (this.signalConnectedFuture = new Qa()), this.signalConnectedFuture.promise;
          }
          hasPermissionsToPublish(e2) {
            if (!this.permissions) return this.log.warn("no permissions present for publishing track", ca(e2)), false;
            const { canPublish: t2, canPublishSources: n2 } = this.permissions;
            return !(!t2 || 0 !== n2.length && !n2.map(((e3) => (function(e4) {
              switch (e4) {
                case Ze.CAMERA:
                  return pa.Source.Camera;
                case Ze.MICROPHONE:
                  return pa.Source.Microphone;
                case Ze.SCREEN_SHARE:
                  return pa.Source.ScreenShare;
                case Ze.SCREEN_SHARE_AUDIO:
                  return pa.Source.ScreenShareAudio;
                default:
                  return pa.Source.Unknown;
              }
            })(e3))).includes(e2.source)) || (this.log.warn("insufficient permissions to publish", ca(e2)), false);
          }
          publish(t2, n2, i2) {
            return Xi(this, void 0, void 0, (function* () {
              var r2, s2, a2, o2, c2, d2, l2, u2, h2, p2;
              if (!this.hasPermissionsToPublish(t2)) throw new xs("failed to publish track, insufficient permissions", 403);
              Array.from(this.trackPublications.values()).find(((e2) => no(t2) && e2.source === t2.source)) && t2.source !== pa.Source.Unknown && this.log.info("publishing a second track with the same source: ".concat(t2.source), ca(t2)), n2.stopMicTrackOnMute && io(t2) && (t2.stopOnMute = true), t2.source === pa.Source.ScreenShare && wa() && (n2.simulcast = false), "av1" !== n2.videoCodec || ba() || (n2.videoCodec = void 0), "vp9" !== n2.videoCodec || Ta() || (n2.videoCodec = void 0), void 0 === n2.videoCodec && (n2.videoCodec = Ec), this.enabledPublishVideoCodecs.length > 0 && (this.enabledPublishVideoCodecs.some(((e2) => n2.videoCodec === aa(e2.mime))) || (n2.videoCodec = aa(this.enabledPublishVideoCodecs[0].mime)));
              const m2 = n2.videoCodec;
              t2.on(e.TrackEvent.Muted, this.onTrackMuted), t2.on(e.TrackEvent.Unmuted, this.onTrackUnmuted), t2.on(e.TrackEvent.Ended, this.handleTrackEnded), t2.on(e.TrackEvent.UpstreamPaused, this.onTrackUpstreamPaused), t2.on(e.TrackEvent.UpstreamResumed, this.onTrackUpstreamResumed), t2.on(e.TrackEvent.AudioTrackFeatureUpdate, this.onTrackFeatureUpdate);
              const g2 = [], v2 = !(null === (r2 = n2.dtx) || void 0 === r2 || r2), f2 = t2.getSourceTrackSettings();
              f2.autoGainControl && g2.push(st.TF_AUTO_GAIN_CONTROL), f2.echoCancellation && g2.push(st.TF_ECHO_CANCELLATION), f2.noiseSuppression && g2.push(st.TF_NOISE_SUPPRESSION), f2.channelCount && f2.channelCount > 1 && g2.push(st.TF_STEREO), v2 && g2.push(st.TF_NO_DTX), ao(t2) && t2.hasPreConnectBuffer && g2.push(st.TF_PRECONNECT_BUFFER);
              const k2 = new dn({ cid: t2.mediaStreamTrack.id, name: n2.name, type: pa.kindToProto(t2.kind), muted: t2.isMuted, source: pa.sourceToProto(t2.source), disableDtx: v2, encryption: this.encryptionType, stereo: i2, disableRed: this.isE2EEEnabled || !(null === (s2 = n2.red) || void 0 === s2 || s2), stream: null == n2 ? void 0 : n2.stream, backupCodecPolicy: null == n2 ? void 0 : n2.backupCodecPolicy, audioFeatures: g2 });
              let y2;
              if (t2.kind === pa.Kind.Video) {
                let e2 = { width: 0, height: 0 };
                try {
                  e2 = yield t2.waitForDimensions();
                } catch (n3) {
                  const i3 = null !== (o2 = null === (a2 = this.roomOptions.videoCaptureDefaults) || void 0 === a2 ? void 0 : a2.resolution) && void 0 !== o2 ? o2 : Qs.h720.resolution;
                  e2 = { width: i3.width, height: i3.height }, this.log.error("could not determine track dimensions, using defaults", Object.assign(Object.assign({}, ca(t2)), { dims: e2 }));
                }
                k2.width = e2.width, k2.height = e2.height, so(t2) && (Sa(m2) && (t2.source === pa.Source.ScreenShare && (n2.scalabilityMode = "L1T3", "contentHint" in t2.mediaStreamTrack && (t2.mediaStreamTrack.contentHint = "motion", this.log.debug("forcing contentHint to motion for screenshare with SVC codecs", ca(t2)))), n2.scalabilityMode = null !== (c2 = n2.scalabilityMode) && void 0 !== c2 ? c2 : "L3T3_KEY"), k2.simulcastCodecs = [new cn({ codec: m2, cid: t2.mediaStreamTrack.id })], true === n2.backupCodec && (n2.backupCodec = { codec: Ec }), n2.backupCodec && m2 !== n2.backupCodec.codec && k2.encryption === mt.NONE && (this.roomOptions.dynacast || (this.roomOptions.dynacast = true), k2.simulcastCodecs.push(new cn({ codec: n2.backupCodec.codec, cid: "" })))), y2 = Gc(t2.source === pa.Source.ScreenShare, k2.width, k2.height, n2), k2.layers = id(k2.width, k2.height, y2, Sa(n2.videoCodec));
              } else t2.kind === pa.Kind.Audio && (y2 = [{ maxBitrate: null === (d2 = n2.audioPreset) || void 0 === d2 ? void 0 : d2.maxBitrate, priority: null !== (u2 = null === (l2 = n2.audioPreset) || void 0 === l2 ? void 0 : l2.priority) && void 0 !== u2 ? u2 : "high", networkPriority: null !== (p2 = null === (h2 = n2.audioPreset) || void 0 === h2 ? void 0 : h2.priority) && void 0 !== p2 ? p2 : "high" }]);
              if (!this.engine || this.engine.isClosed) throw new Ns("cannot publish track when not connected");
              const b2 = () => Xi(this, void 0, void 0, (function* () {
                var i3, r3, s3;
                if (!this.engine.pcManager) throw new Ns("pcManager is not ready");
                if (t2.sender = yield this.engine.createSender(t2, n2, y2), this.emit(e.ParticipantEvent.LocalSenderCreated, t2.sender, t2), so(t2) && (null !== (i3 = n2.degradationPreference) && void 0 !== i3 || (n2.degradationPreference = (function(e2) {
                  return e2.source === pa.Source.ScreenShare || e2.constraints.height && Xa(e2.constraints.height) >= 1080 ? "maintain-resolution" : "balanced";
                })(t2)), t2.setDegradationPreference(n2.degradationPreference)), y2) if (wa() && t2.kind === pa.Kind.Audio) {
                  let e2;
                  for (const n3 of this.engine.pcManager.publisher.getTransceivers()) if (n3.sender === t2.sender) {
                    e2 = n3;
                    break;
                  }
                  e2 && this.engine.pcManager.publisher.setTrackCodecBitrate({ transceiver: e2, codec: "opus", maxbr: (null === (r3 = y2[0]) || void 0 === r3 ? void 0 : r3.maxBitrate) ? y2[0].maxBitrate / 1e3 : 0 });
                } else t2.codec && Sa(t2.codec) && (null === (s3 = y2[0]) || void 0 === s3 ? void 0 : s3.maxBitrate) && this.engine.pcManager.publisher.setTrackCodecBitrate({ cid: k2.cid, codec: t2.codec, maxbr: y2[0].maxBitrate / 1e3 });
                yield this.engine.negotiate();
              }));
              let T2;
              const S2 = new Promise(((e2, n3) => Xi(this, void 0, void 0, (function* () {
                var i3;
                try {
                  T2 = yield this.engine.addTrack(k2), e2(T2);
                } catch (e3) {
                  if (t2.sender && (null === (i3 = this.engine.pcManager) || void 0 === i3 ? void 0 : i3.publisher)) {
                    try {
                      this.engine.pcManager.publisher.removeTrack(t2.sender);
                    } catch (e4) {
                      this.log.error(e4);
                    }
                    yield this.engine.negotiate().catch(((e4) => {
                      this.log.error("failed to negotiate after removing track due to failed add track request", Object.assign(Object.assign({}, ca(t2)), { error: e4 }));
                    }));
                  }
                  n3(e3);
                }
              }))));
              if (this.enabledPublishVideoCodecs.length > 0) {
                const e2 = yield Promise.all([S2, b2()]);
                T2 = e2[0];
              } else {
                let e2;
                if (T2 = yield S2, T2.codecs.forEach(((t3) => {
                  void 0 === e2 && (e2 = t3.mimeType);
                })), e2 && t2.kind === pa.Kind.Video) {
                  const i3 = aa(e2);
                  i3 !== m2 && (this.log.debug("falling back to server selected codec", Object.assign(Object.assign({}, ca(t2)), { codec: i3 })), n2.videoCodec = i3, y2 = Gc(t2.source === pa.Source.ScreenShare, k2.width, k2.height, n2));
                }
                yield b2();
              }
              const E2 = new kl(t2.kind, T2, t2, { loggerName: this.roomOptions.loggerName, loggerContextCb: () => this.logContext });
              if (E2.on(e.TrackEvent.CpuConstrained, ((e2) => this.onTrackCpuConstrained(e2, E2))), E2.options = n2, t2.sid = T2.sid, so(t2) && (t2.publishOptions = n2, k2.width && k2.height && (t2.lastEncodedDimensions = { width: k2.width, height: k2.height })), this.log.debug("publishing ".concat(t2.kind, " with encodings"), { encodings: y2, trackInfo: T2 }), so(t2) ? t2.startMonitor(this.engine.client) : ao(t2) && t2.startMonitor(), this.addTrackPublication(E2), this.emit(e.ParticipantEvent.LocalTrackPublished, E2), ao(t2) && T2.audioFeatures.includes(st.TF_PRECONNECT_BUFFER)) {
                const n3 = t2.getPreConnectBuffer(), i3 = t2.getPreConnectBufferMimeType();
                if (this.on(e.ParticipantEvent.LocalTrackSubscribed, ((e2) => {
                  if (e2.trackSid === T2.sid) {
                    if (!t2.hasPreConnectBuffer) return void this.log.warn("subscribe event came to late, buffer already closed");
                    this.log.debug("finished recording preconnect buffer", ca(t2)), t2.stopPreConnectBuffer();
                  }
                })), n3) {
                  const e2 = new Promise(((e3, r3) => Xi(this, void 0, void 0, (function* () {
                    var s3, a3, o3, c3, d3, l3;
                    try {
                      this.log.debug("waiting for agent", ca(t2));
                      const m3 = setTimeout((() => {
                        r3(new Error("agent not active within 10 seconds"));
                      }), 1e4), g3 = yield this.waitUntilActiveAgentPresent();
                      clearTimeout(m3), this.log.debug("sending preconnect buffer", ca(t2));
                      const v3 = yield this.streamBytes({ name: "preconnect-buffer", mimeType: i3, topic: "lk.agent.pre-connect-audio-buffer", destinationIdentities: [g3.identity], attributes: { trackId: E2.trackSid, sampleRate: String(null !== (d3 = f2.sampleRate) && void 0 !== d3 ? d3 : "48000"), channels: String(null !== (l3 = f2.channelCount) && void 0 !== l3 ? l3 : "1") } });
                      try {
                        for (var u3, h3 = true, p3 = tr(n3); !(s3 = (u3 = yield p3.next()).done); h3 = true) {
                          c3 = u3.value, h3 = false;
                          const e4 = c3;
                          yield v3.write(e4);
                        }
                      } catch (e4) {
                        a3 = { error: e4 };
                      } finally {
                        try {
                          h3 || s3 || !(o3 = p3.return) || (yield o3.call(p3));
                        } finally {
                          if (a3) throw a3.error;
                        }
                      }
                      yield v3.close(), e3();
                    } catch (e4) {
                      r3(e4);
                    }
                  }))));
                  e2.then((() => {
                    this.log.debug("preconnect buffer sent successfully", ca(t2));
                  })).catch(((e3) => {
                    this.log.error("error sending preconnect buffer", Object.assign(Object.assign({}, ca(t2)), { error: e3 }));
                  }));
                }
              }
              return E2;
            }));
          }
          get isLocal() {
            return true;
          }
          publishAdditionalCodecForTrack(e2, t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              var i2;
              if (this.encryptionType !== mt.NONE) return;
              let r2;
              if (this.trackPublications.forEach(((t3) => {
                t3.track && t3.track === e2 && (r2 = t3);
              })), !r2) throw new Os("track is not published");
              if (!so(e2)) throw new Os("track is not a video track");
              const s2 = Object.assign(Object.assign({}, null === (i2 = this.roomOptions) || void 0 === i2 ? void 0 : i2.publishDefaults), n2), a2 = Qc(e2, t2, s2);
              if (!a2) return void this.log.info("backup codec has been disabled, ignoring request to add additional codec for track", ca(e2));
              const o2 = e2.addSimulcastTrack(t2, a2);
              if (!o2) return;
              const c2 = new dn({ cid: o2.mediaStreamTrack.id, type: pa.kindToProto(e2.kind), muted: e2.isMuted, source: pa.sourceToProto(e2.source), sid: e2.sid, simulcastCodecs: [{ codec: s2.videoCodec, cid: o2.mediaStreamTrack.id }] });
              if (c2.layers = id(c2.width, c2.height, a2), !this.engine || this.engine.isClosed) throw new Ns("cannot publish track when not connected");
              const d2 = (yield Promise.all([this.engine.addTrack(c2), (() => Xi(this, void 0, void 0, (function* () {
                yield this.engine.createSimulcastSender(e2, o2, s2, a2), yield this.engine.negotiate();
              })))()]))[0];
              this.log.debug("published ".concat(t2, " for track ").concat(e2.sid), { encodings: a2, trackInfo: d2 });
            }));
          }
          unpublishTrack(t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              var i2, r2;
              if (no(t2)) {
                const e2 = this.pendingPublishPromises.get(t2);
                e2 && (this.log.debug("awaiting publish promise before attempting to unpublish", ca(t2)), yield e2);
              }
              const s2 = this.getPublicationForTrack(t2), a2 = s2 ? ca(s2) : void 0;
              if (this.log.info("unpublishing track", a2), !s2 || !s2.track) return void this.log.warn("track was not unpublished because no publication was found", a2);
              (t2 = s2.track).off(e.TrackEvent.Muted, this.onTrackMuted), t2.off(e.TrackEvent.Unmuted, this.onTrackUnmuted), t2.off(e.TrackEvent.Ended, this.handleTrackEnded), t2.off(e.TrackEvent.UpstreamPaused, this.onTrackUpstreamPaused), t2.off(e.TrackEvent.UpstreamResumed, this.onTrackUpstreamResumed), t2.off(e.TrackEvent.AudioTrackFeatureUpdate, this.onTrackFeatureUpdate), void 0 === n2 && (n2 = null === (r2 = null === (i2 = this.roomOptions) || void 0 === i2 ? void 0 : i2.stopLocalTrackOnUnpublish) || void 0 === r2 || r2), n2 ? t2.stop() : t2.stopMonitor();
              let o2 = false;
              const c2 = t2.sender;
              if (t2.sender = void 0, this.engine.pcManager && this.engine.pcManager.currentState < Dc.FAILED && c2) try {
                for (const e2 of this.engine.pcManager.publisher.getTransceivers()) e2.sender === c2 && (e2.direction = "inactive", o2 = true);
                try {
                  o2 = this.engine.removeTrack(c2);
                } catch (e2) {
                  this.log.warn(e2), o2 = true;
                }
                if (so(t2)) {
                  for (const [, e2] of t2.simulcastCodecs) if (e2.sender) {
                    try {
                      o2 = this.engine.removeTrack(e2.sender);
                    } catch (e3) {
                      this.log.warn(e3), o2 = true;
                    }
                    e2.sender = void 0;
                  }
                  t2.simulcastCodecs.clear();
                }
              } catch (e2) {
                this.log.warn("failed to unpublish track", Object.assign(Object.assign({}, a2), { error: e2 }));
              }
              switch (this.trackPublications.delete(s2.trackSid), s2.kind) {
                case pa.Kind.Audio:
                  this.audioTrackPublications.delete(s2.trackSid);
                  break;
                case pa.Kind.Video:
                  this.videoTrackPublications.delete(s2.trackSid);
              }
              return this.emit(e.ParticipantEvent.LocalTrackUnpublished, s2), s2.setTrack(void 0), o2 && (yield this.engine.negotiate()), s2;
            }));
          }
          unpublishTracks(e2) {
            return Xi(this, void 0, void 0, (function* () {
              return (yield Promise.all(e2.map(((e3) => this.unpublishTrack(e3))))).filter(((e3) => !!e3));
            }));
          }
          republishAllTracks(e2) {
            return Xi(this, arguments, void 0, (function(e3) {
              var t2 = this;
              let n2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
              return (function* () {
                t2.republishPromise && (yield t2.republishPromise), t2.republishPromise = new ps(((i2, r2) => Xi(t2, void 0, void 0, (function* () {
                  try {
                    const t3 = [];
                    this.trackPublications.forEach(((n3) => {
                      n3.track && (e3 && (n3.options = Object.assign(Object.assign({}, n3.options), e3)), t3.push(n3));
                    })), yield Promise.all(t3.map(((e4) => Xi(this, void 0, void 0, (function* () {
                      const t4 = e4.track;
                      yield this.unpublishTrack(t4, false), !n2 || t4.isMuted || t4.source === pa.Source.ScreenShare || t4.source === pa.Source.ScreenShareAudio || !ao(t4) && !so(t4) || t4.isUserProvided || (this.log.debug("restarting existing track", { track: e4.trackSid }), yield t4.restartTrack()), yield this.publishOrRepublishTrack(t4, e4.options, true);
                    }))))), i2();
                  } catch (e4) {
                    e4 instanceof Error ? r2(e4) : r2(new Error(String(e4)));
                  } finally {
                    this.republishPromise = void 0;
                  }
                })))), yield t2.republishPromise;
              })();
            }));
          }
          publishData(e2) {
            return Xi(this, arguments, void 0, (function(e3) {
              var t2 = this;
              let n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return (function* () {
                const i2 = n2.reliable ? dd.RELIABLE : dd.LOSSY, r2 = n2.reliable ? St.RELIABLE : St.LOSSY, s2 = n2.destinationIdentities, a2 = n2.topic;
                let o2 = new Pt({ participantIdentity: t2.identity, payload: e3, destinationIdentities: s2, topic: a2 });
                const c2 = new Tt({ kind: r2, value: { case: "user", value: o2 } });
                yield t2.engine.sendDataPacket(c2, i2);
              })();
            }));
          }
          publishDtmf(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              const n2 = new Tt({ kind: St.RELIABLE, value: { case: "sipDtmf", value: new It({ code: e2, digit: t2 }) } });
              yield this.engine.sendDataPacket(n2, dd.RELIABLE);
            }));
          }
          sendChatMessage(t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              const i2 = { id: crypto.randomUUID(), message: t2, timestamp: Date.now(), attachedFiles: null == n2 ? void 0 : n2.attachments }, r2 = new Tt({ value: { case: "chatMessage", value: new Mt(Object.assign(Object.assign({}, i2), { timestamp: M.parse(i2.timestamp) })) } });
              return yield this.engine.sendDataPacket(r2, dd.RELIABLE), this.emit(e.ParticipantEvent.ChatMessage, i2), i2;
            }));
          }
          editChatMessage(t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              const i2 = Object.assign(Object.assign({}, n2), { message: t2, editTimestamp: Date.now() }), r2 = new Tt({ value: { case: "chatMessage", value: new Mt(Object.assign(Object.assign({}, i2), { timestamp: M.parse(i2.timestamp), editTimestamp: M.parse(i2.editTimestamp) })) } });
              return yield this.engine.sendDataPacket(r2, dd.RELIABLE), this.emit(e.ParticipantEvent.ChatMessage, i2), i2;
            }));
          }
          sendText(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              return this.roomOutgoingDataStreamManager.sendText(e2, t2);
            }));
          }
          streamText(e2) {
            return Xi(this, void 0, void 0, (function* () {
              return this.roomOutgoingDataStreamManager.streamText(e2);
            }));
          }
          sendFile(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              return this.roomOutgoingDataStreamManager.sendFile(e2, t2);
            }));
          }
          streamBytes(e2) {
            return Xi(this, void 0, void 0, (function* () {
              return this.roomOutgoingDataStreamManager.streamBytes(e2);
            }));
          }
          performRpc(e2) {
            let { destinationIdentity: t2, method: n2, payload: i2, responseTimeout: r2 = 15e3 } = e2;
            return new ps(((e3, s2) => Xi(this, void 0, void 0, (function* () {
              var a2, o2, c2, d2;
              if (Oc(i2) > 15360) return void s2(Mc.builtIn("REQUEST_PAYLOAD_TOO_LARGE"));
              if ((null === (o2 = null === (a2 = this.engine.latestJoinResponse) || void 0 === a2 ? void 0 : a2.serverInfo) || void 0 === o2 ? void 0 : o2.version) && Fa(null === (d2 = null === (c2 = this.engine.latestJoinResponse) || void 0 === c2 ? void 0 : c2.serverInfo) || void 0 === d2 ? void 0 : d2.version, "1.8.0") < 0) return void s2(Mc.builtIn("UNSUPPORTED_SERVER"));
              const l2 = Math.max(r2, 8e3), u2 = crypto.randomUUID();
              yield this.publishRpcRequest(t2, u2, n2, i2, l2);
              const h2 = setTimeout((() => {
                this.pendingAcks.delete(u2), s2(Mc.builtIn("CONNECTION_TIMEOUT")), this.pendingResponses.delete(u2), clearTimeout(p2);
              }), 7e3);
              this.pendingAcks.set(u2, { resolve: () => {
                clearTimeout(h2);
              }, participantIdentity: t2 });
              const p2 = setTimeout((() => {
                this.pendingResponses.delete(u2), s2(Mc.builtIn("RESPONSE_TIMEOUT"));
              }), r2);
              this.pendingResponses.set(u2, { resolve: (t3, n3) => {
                clearTimeout(p2), this.pendingAcks.has(u2) && (this.log.warn("RPC response received before ack", u2), this.pendingAcks.delete(u2), clearTimeout(h2)), n3 ? s2(n3) : e3(null != t3 ? t3 : "");
              }, participantIdentity: t2 });
            }))));
          }
          registerRpcMethod(e2, t2) {
            this.rpcHandlers.has(e2) && this.log.warn("you're overriding the RPC handler for method ".concat(e2, ", in the future this will throw an error")), this.rpcHandlers.set(e2, t2);
          }
          unregisterRpcMethod(e2) {
            this.rpcHandlers.delete(e2);
          }
          setTrackSubscriptionPermissions(e2) {
            let t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            this.participantTrackPermissions = t2, this.allParticipantsAllowedToSubscribe = e2, this.engine.client.isDisconnected || this.updateTrackSubscriptionPermissions();
          }
          handleIncomingRpcAck(e2) {
            const t2 = this.pendingAcks.get(e2);
            t2 ? (t2.resolve(), this.pendingAcks.delete(e2)) : console.error("Ack received for unexpected RPC request", e2);
          }
          handleIncomingRpcResponse(e2, t2, n2) {
            const i2 = this.pendingResponses.get(e2);
            i2 ? (i2.resolve(t2, n2), this.pendingResponses.delete(e2)) : console.error("Response received for unexpected RPC request", e2);
          }
          publishRpcRequest(e2, t2, n2, i2, r2) {
            return Xi(this, void 0, void 0, (function* () {
              const s2 = new Tt({ destinationIdentities: [e2], kind: St.RELIABLE, value: { case: "rpcRequest", value: new Ot({ id: t2, method: n2, payload: i2, responseTimeoutMs: r2, version: 1 }) } });
              yield this.engine.sendDataPacket(s2, dd.RELIABLE);
            }));
          }
          handleParticipantDisconnected(e2) {
            for (const [t2, { participantIdentity: n2 }] of this.pendingAcks) n2 === e2 && this.pendingAcks.delete(t2);
            for (const [t2, { participantIdentity: n2, resolve: i2 }] of this.pendingResponses) n2 === e2 && (i2(null, Mc.builtIn("RECIPIENT_DISCONNECTED")), this.pendingResponses.delete(t2));
          }
          setEnabledPublishCodecs(e2) {
            this.enabledPublishVideoCodecs = e2.filter(((e3) => "video" === e3.mime.split("/")[0].toLowerCase()));
          }
          updateInfo(e2) {
            return !!super.updateInfo(e2) && (e2.tracks.forEach(((e3) => {
              var t2, n2;
              const i2 = this.trackPublications.get(e3.sid);
              if (i2) {
                const r2 = i2.isMuted || null !== (n2 = null === (t2 = i2.track) || void 0 === t2 ? void 0 : t2.isUpstreamPaused) && void 0 !== n2 && n2;
                r2 !== e3.muted && (this.log.debug("updating server mute state after reconcile", Object.assign(Object.assign({}, ca(i2)), { mutedOnServer: r2 })), this.engine.client.sendMuteTrack(e3.sid, r2));
              }
            })), true);
          }
          setActiveAgent(e2) {
            var t2, n2, i2, r2;
            this.firstActiveAgent = e2, e2 && !this.firstActiveAgent && (this.firstActiveAgent = e2), e2 ? null === (n2 = null === (t2 = this.activeAgentFuture) || void 0 === t2 ? void 0 : t2.resolve) || void 0 === n2 || n2.call(t2, e2) : null === (r2 = null === (i2 = this.activeAgentFuture) || void 0 === i2 ? void 0 : i2.reject) || void 0 === r2 || r2.call(i2, new Error("Agent disconnected")), this.activeAgentFuture = void 0;
          }
          waitUntilActiveAgentPresent() {
            return this.firstActiveAgent ? Promise.resolve(this.firstActiveAgent) : (this.activeAgentFuture || (this.activeAgentFuture = new Qa()), this.activeAgentFuture.promise);
          }
          getPublicationForTrack(e2) {
            let t2;
            return this.trackPublications.forEach(((n2) => {
              const i2 = n2.track;
              i2 && (e2 instanceof MediaStreamTrack ? (ao(i2) || so(i2)) && i2.mediaStreamTrack === e2 && (t2 = n2) : e2 === i2 && (t2 = n2));
            })), t2;
          }
          waitForPendingPublicationOfSource(e2) {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = Date.now();
              for (; Date.now() < t2 + 1e4; ) {
                const t3 = Array.from(this.pendingPublishPromises.entries()).find(((t4) => {
                  let [n2] = t4;
                  return n2.source === e2;
                }));
                if (t3) return t3[1];
                yield fa(20);
              }
            }));
          }
          publishDataTrack(e2) {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = new al(e2, this.roomOutgoingDataTrackManager);
              return yield t2.publish(), t2;
            }));
          }
        }
        class Rl extends DOMException {
          constructor(e2, t2) {
            super(e2, "AbortError"), this.reason = t2;
          }
        }
        class Pl extends Map {
          constructor() {
            super(...arguments), this.pending = /* @__PURE__ */ new Map();
          }
          set(e2, t2) {
            var n2, i2;
            super.set(e2, t2);
            const r2 = null === (n2 = this.pending) || void 0 === n2 ? void 0 : n2.get(e2);
            if (r2) {
              for (const e3 of r2) e3.isResolved || null === (i2 = e3.resolve) || void 0 === i2 || i2.call(e3, t2);
              this.pending.delete(e2);
            }
            return this;
          }
          get [Symbol.toStringTag]() {
            return "DeferrableMap";
          }
          getDeferred(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              const n2 = this.get(e2);
              if (void 0 !== n2) return n2;
              if (null == t2 ? void 0 : t2.aborted) throw new Rl("The operation was aborted.", t2.reason);
              const i2 = new Qa(void 0, (() => {
                const t3 = this.pending.get(e2);
                if (!t3) return;
                const n3 = t3.indexOf(i2);
                -1 !== n3 && t3.splice(n3, 1), 0 === t3.length && this.pending.delete(e2);
              })), r2 = this.pending.get(e2);
              if (r2 ? r2.push(i2) : this.pending.set(e2, [i2]), t2) {
                const e3 = () => {
                  var e4;
                  i2.isResolved || null === (e4 = i2.reject) || void 0 === e4 || e4.call(i2, new Rl("The operation was aborted.", t2.reason));
                };
                t2.addEventListener("abort", e3, { once: true }), i2.promise.finally((() => {
                  t2.removeEventListener("abort", e3);
                }));
              }
              return i2.promise;
            }));
          }
        }
        class Il extends fl {
          constructor(t2, n2, i2, r2) {
            super(t2, n2.sid, n2.name, r2), this.track = void 0, this.allowed = true, this.requestedDisabled = void 0, this.visible = true, this.handleEnded = (t3) => {
              this.setTrack(void 0), this.emit(e.TrackEvent.Ended, t3);
            }, this.handleVisibilityChange = (e2) => {
              this.log.debug("adaptivestream video visibility ".concat(this.trackSid, ", visible=").concat(e2), this.logContext), this.visible = e2, this.emitTrackUpdate();
            }, this.handleVideoDimensionsChange = (e2) => {
              this.log.debug("adaptivestream video dimensions ".concat(e2.width, "x").concat(e2.height), this.logContext), this.videoDimensionsAdaptiveStream = e2, this.emitTrackUpdate();
            }, this.subscribed = i2, this.updateInfo(n2);
          }
          setSubscribed(t2) {
            const n2 = this.subscriptionStatus, i2 = this.permissionStatus;
            this.subscribed = t2, t2 && (this.allowed = true);
            const r2 = new Cn({ trackSids: [this.trackSid], subscribe: this.subscribed, participantTracks: [new xt({ participantSid: "", trackSids: [this.trackSid] })] });
            this.emit(e.TrackEvent.UpdateSubscription, r2), this.emitSubscriptionUpdateIfChanged(n2), this.emitPermissionUpdateIfChanged(i2);
          }
          get subscriptionStatus() {
            return false === this.subscribed ? fl.SubscriptionStatus.Unsubscribed : super.isSubscribed ? fl.SubscriptionStatus.Subscribed : fl.SubscriptionStatus.Desired;
          }
          get permissionStatus() {
            return this.allowed ? fl.PermissionStatus.Allowed : fl.PermissionStatus.NotAllowed;
          }
          get isSubscribed() {
            return false !== this.subscribed && super.isSubscribed;
          }
          get isDesired() {
            return false !== this.subscribed;
          }
          get isEnabled() {
            return void 0 !== this.requestedDisabled ? !this.requestedDisabled : !this.isAdaptiveStream || this.visible;
          }
          get isLocal() {
            return false;
          }
          setEnabled(e2) {
            this.isManualOperationAllowed() && this.requestedDisabled !== !e2 && (this.requestedDisabled = !e2, this.emitTrackUpdate());
          }
          setVideoQuality(e2) {
            this.isManualOperationAllowed() && this.requestedMaxQuality !== e2 && (this.requestedMaxQuality = e2, this.requestedVideoDimensions = void 0, this.emitTrackUpdate());
          }
          setVideoDimensions(e2) {
            var t2, n2;
            this.isManualOperationAllowed() && ((null === (t2 = this.requestedVideoDimensions) || void 0 === t2 ? void 0 : t2.width) === e2.width && (null === (n2 = this.requestedVideoDimensions) || void 0 === n2 ? void 0 : n2.height) === e2.height || (lo(this.track) && (this.requestedVideoDimensions = e2), this.requestedMaxQuality = void 0, this.emitTrackUpdate()));
          }
          setVideoFPS(e2) {
            this.isManualOperationAllowed() && lo(this.track) && this.fps !== e2 && (this.fps = e2, this.emitTrackUpdate());
          }
          get videoQuality() {
            var t2;
            return null !== (t2 = this.requestedMaxQuality) && void 0 !== t2 ? t2 : e.VideoQuality.HIGH;
          }
          setTrack(t2) {
            const n2 = this.subscriptionStatus, i2 = this.permissionStatus, r2 = this.track;
            r2 !== t2 && (r2 && (r2.off(e.TrackEvent.VideoDimensionsChanged, this.handleVideoDimensionsChange), r2.off(e.TrackEvent.VisibilityChanged, this.handleVisibilityChange), r2.off(e.TrackEvent.Ended, this.handleEnded), r2.detach(), r2.stopMonitor(), this.emit(e.TrackEvent.Unsubscribed, r2)), super.setTrack(t2), t2 && (t2.sid = this.trackSid, t2.on(e.TrackEvent.VideoDimensionsChanged, this.handleVideoDimensionsChange), t2.on(e.TrackEvent.VisibilityChanged, this.handleVisibilityChange), t2.on(e.TrackEvent.Ended, this.handleEnded), this.emit(e.TrackEvent.Subscribed, t2)), this.emitPermissionUpdateIfChanged(i2), this.emitSubscriptionUpdateIfChanged(n2));
          }
          setAllowed(e2) {
            const t2 = this.subscriptionStatus, n2 = this.permissionStatus;
            this.allowed = e2, this.emitPermissionUpdateIfChanged(n2), this.emitSubscriptionUpdateIfChanged(t2);
          }
          setSubscriptionError(t2) {
            this.emit(e.TrackEvent.SubscriptionFailed, t2);
          }
          updateInfo(t2) {
            super.updateInfo(t2);
            const n2 = this.metadataMuted;
            this.metadataMuted = t2.muted, this.track ? this.track.setMuted(t2.muted) : n2 !== t2.muted && this.emit(t2.muted ? e.TrackEvent.Muted : e.TrackEvent.Unmuted);
          }
          emitSubscriptionUpdateIfChanged(t2) {
            const n2 = this.subscriptionStatus;
            t2 !== n2 && this.emit(e.TrackEvent.SubscriptionStatusChanged, n2, t2);
          }
          emitPermissionUpdateIfChanged(t2) {
            this.permissionStatus !== t2 && this.emit(e.TrackEvent.SubscriptionPermissionChanged, this.permissionStatus, t2);
          }
          isManualOperationAllowed() {
            return !!this.isDesired || (this.log.warn("cannot update track settings when not subscribed", this.logContext), false);
          }
          get isAdaptiveStream() {
            return lo(this.track) && this.track.isAdaptiveStream;
          }
          emitTrackUpdate() {
            const t2 = new Pn({ trackSids: [this.trackSid], disabled: !this.isEnabled, fps: this.fps });
            if (this.kind === pa.Kind.Video) {
              let n2 = this.requestedVideoDimensions;
              if (void 0 !== this.videoDimensionsAdaptiveStream) if (n2) {
                la(this.videoDimensionsAdaptiveStream, n2) && (this.log.debug("using adaptive stream dimensions instead of requested", Object.assign(Object.assign({}, this.logContext), this.videoDimensionsAdaptiveStream)), n2 = this.videoDimensionsAdaptiveStream);
              } else if (void 0 !== this.requestedMaxQuality && this.trackInfo) {
                const e2 = (function(e3, t3) {
                  var n3;
                  return null === (n3 = e3.layers) || void 0 === n3 ? void 0 : n3.find(((e4) => e4.quality === t3));
                })(this.trackInfo, this.requestedMaxQuality);
                e2 && la(this.videoDimensionsAdaptiveStream, e2) && (this.log.debug("using adaptive stream dimensions instead of max quality layer", Object.assign(Object.assign({}, this.logContext), this.videoDimensionsAdaptiveStream)), n2 = this.videoDimensionsAdaptiveStream);
              } else this.log.debug("using adaptive stream dimensions", Object.assign(Object.assign({}, this.logContext), this.videoDimensionsAdaptiveStream)), n2 = this.videoDimensionsAdaptiveStream;
              n2 ? (t2.width = Math.ceil(n2.width), t2.height = Math.ceil(n2.height)) : void 0 !== this.requestedMaxQuality ? (this.log.debug("using requested max quality", Object.assign(Object.assign({}, this.logContext), { quality: this.requestedMaxQuality })), t2.quality = this.requestedMaxQuality) : (this.log.debug("using default quality", Object.assign(Object.assign({}, this.logContext), { quality: e.VideoQuality.HIGH })), t2.quality = e.VideoQuality.HIGH);
            }
            this.emit(e.TrackEvent.UpdateSettings, t2);
          }
        }
        class Dl extends Cl {
          static fromParticipantInfo(e2, t2, n2, i2) {
            return new Dl(e2, t2.sid, t2.identity, t2.name, t2.metadata, t2.attributes, n2, t2.kind, t2.dataTracks.map(((e3) => {
              const n3 = Ko.from(e3);
              return new Ud(n3, i2, { publisherIdentity: t2.identity });
            })));
          }
          get logContext() {
            return Object.assign(Object.assign({}, super.logContext), { remoteParticipantID: this.sid, remoteParticipant: this.identity });
          }
          constructor(e2, t2, n2, i2, r2, s2, a2) {
            let o2 = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : ht.STANDARD, c2 = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : [];
            super(t2, n2 || "", i2, r2, s2, a2, o2), this.signalClient = e2, this.trackPublications = /* @__PURE__ */ new Map(), this.audioTrackPublications = /* @__PURE__ */ new Map(), this.videoTrackPublications = /* @__PURE__ */ new Map(), this.dataTracks = new Pl(c2.map(((e3) => [e3.info.name, e3]))), this.volumeMap = /* @__PURE__ */ new Map();
          }
          addTrackPublication(t2) {
            super.addTrackPublication(t2), t2.on(e.TrackEvent.UpdateSettings, ((e2) => {
              this.log.debug("send update settings", Object.assign(Object.assign(Object.assign({}, this.logContext), ca(t2)), { settings: e2 })), this.signalClient.sendUpdateTrackSettings(e2);
            })), t2.on(e.TrackEvent.UpdateSubscription, ((e2) => {
              e2.participantTracks.forEach(((e3) => {
                e3.participantSid = this.sid;
              })), this.signalClient.sendUpdateSubscription(e2);
            })), t2.on(e.TrackEvent.SubscriptionPermissionChanged, ((n2) => {
              this.emit(e.ParticipantEvent.TrackSubscriptionPermissionChanged, t2, n2);
            })), t2.on(e.TrackEvent.SubscriptionStatusChanged, ((n2) => {
              this.emit(e.ParticipantEvent.TrackSubscriptionStatusChanged, t2, n2);
            })), t2.on(e.TrackEvent.Subscribed, ((n2) => {
              this.emit(e.ParticipantEvent.TrackSubscribed, n2, t2);
            })), t2.on(e.TrackEvent.Unsubscribed, ((n2) => {
              this.emit(e.ParticipantEvent.TrackUnsubscribed, n2, t2);
            })), t2.on(e.TrackEvent.SubscriptionFailed, ((n2) => {
              this.emit(e.ParticipantEvent.TrackSubscriptionFailed, t2.trackSid, n2);
            }));
          }
          getTrackPublication(e2) {
            const t2 = super.getTrackPublication(e2);
            if (t2) return t2;
          }
          getTrackPublicationByName(e2) {
            const t2 = super.getTrackPublicationByName(e2);
            if (t2) return t2;
          }
          setVolume(e2) {
            let t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : pa.Source.Microphone;
            this.volumeMap.set(t2, e2);
            const n2 = this.getTrackPublication(t2);
            n2 && n2.track && n2.track.setVolume(e2);
          }
          getVolume() {
            let e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : pa.Source.Microphone;
            const t2 = this.getTrackPublication(e2);
            return t2 && t2.track ? t2.track.getVolume() : this.volumeMap.get(e2);
          }
          addSubscribedMediaTrack(t2, n2, i2, r2, s2, a2) {
            let o2 = this.getTrackPublicationBySid(n2);
            if (o2 || n2.startsWith("TR") || this.trackPublications.forEach(((e2) => {
              o2 || t2.kind !== e2.kind.toString() || (o2 = e2);
            })), !o2) return 0 === a2 ? (this.log.error("could not find published track", Object.assign(Object.assign({}, this.logContext), { trackSid: n2 })), void this.emit(e.ParticipantEvent.TrackSubscriptionFailed, n2)) : (void 0 === a2 && (a2 = 20), void setTimeout((() => {
              this.addSubscribedMediaTrack(t2, n2, i2, r2, s2, a2 - 1);
            }), 150));
            if ("ended" === t2.readyState) return this.log.error("unable to subscribe because MediaStreamTrack is ended. Do not call MediaStreamTrack.stop()", Object.assign(Object.assign({}, this.logContext), ca(o2))), void this.emit(e.ParticipantEvent.TrackSubscriptionFailed, n2);
            let c2;
            return c2 = "video" === t2.kind ? new pl(t2, n2, r2, s2) : new hl(t2, n2, r2, this.audioContext, this.audioOutput), c2.source = o2.source, c2.isMuted = o2.isMuted, c2.setMediaStream(i2), c2.start(), o2.setTrack(c2), this.volumeMap.has(o2.source) && oo(c2) && io(c2) && c2.setVolume(this.volumeMap.get(o2.source)), o2;
          }
          get hasMetadata() {
            return !!this.participantInfo;
          }
          getTrackPublicationBySid(e2) {
            return this.trackPublications.get(e2);
          }
          updateInfo(t2) {
            if (!super.updateInfo(t2)) return false;
            const n2 = /* @__PURE__ */ new Map(), i2 = /* @__PURE__ */ new Map();
            return t2.tracks.forEach(((e2) => {
              var t3, r2;
              let s2 = this.getTrackPublicationBySid(e2.sid);
              if (s2) s2.updateInfo(e2);
              else {
                const n3 = pa.kindFromProto(e2.type);
                if (!n3) return;
                s2 = new Il(n3, e2, null === (t3 = this.signalClient.connectOptions) || void 0 === t3 ? void 0 : t3.autoSubscribe, { loggerContextCb: () => this.logContext, loggerName: null === (r2 = this.loggerOptions) || void 0 === r2 ? void 0 : r2.loggerName }), s2.updateInfo(e2), i2.set(e2.sid, s2);
                const a2 = Array.from(this.trackPublications.values()).find(((e3) => e3.source === (null == s2 ? void 0 : s2.source)));
                a2 && s2.source !== pa.Source.Unknown && this.log.debug("received a second track publication for ".concat(this.identity, " with the same source: ").concat(s2.source), Object.assign(Object.assign({}, this.logContext), { oldTrack: ca(a2), newTrack: ca(s2) })), this.addTrackPublication(s2);
              }
              n2.set(e2.sid, s2);
            })), this.trackPublications.forEach(((e2) => {
              n2.has(e2.trackSid) || (this.log.trace("detected removed track on remote participant, unpublishing", Object.assign(Object.assign({}, this.logContext), ca(e2))), this.unpublishTrack(e2.trackSid, true));
            })), i2.forEach(((t3) => {
              this.emit(e.ParticipantEvent.TrackPublished, t3);
            })), true;
          }
          unpublishTrack(t2, n2) {
            const i2 = this.trackPublications.get(t2);
            if (!i2) return;
            const { track: r2 } = i2;
            switch (r2 && (r2.stop(), i2.setTrack(void 0)), this.trackPublications.delete(t2), i2.kind) {
              case pa.Kind.Audio:
                this.audioTrackPublications.delete(t2);
                break;
              case pa.Kind.Video:
                this.videoTrackPublications.delete(t2);
            }
            n2 && this.emit(e.ParticipantEvent.TrackUnpublished, i2);
          }
          setAudioOutput(e2) {
            return Xi(this, void 0, void 0, (function* () {
              this.audioOutput = e2;
              const t2 = [];
              this.audioTrackPublications.forEach(((n2) => {
                var i2;
                io(n2.track) && oo(n2.track) && t2.push(n2.track.setSinkId(null !== (i2 = e2.deviceId) && void 0 !== i2 ? i2 : "default"));
              })), yield Promise.all(t2);
            }));
          }
          addRemoteDataTrack(e2) {
            this.dataTracks.set(e2.info.name, e2);
          }
          removeRemoteDataTrack(e2) {
            for (const [t2, n2] of this.dataTracks.entries()) e2 === n2.info.sid && this.dataTracks.delete(t2);
          }
          emit(e2) {
            for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), i2 = 1; i2 < t2; i2++) n2[i2 - 1] = arguments[i2];
            return this.log.trace("participant event", Object.assign(Object.assign({}, this.logContext), { event: e2, args: n2 })), super.emit(e2, ...n2);
          }
        }
        e.ConnectionState = void 0, (El = e.ConnectionState || (e.ConnectionState = {})).Disconnected = "disconnected", El.Connecting = "connecting", El.Connected = "connected", El.Reconnecting = "reconnecting", El.SignalReconnecting = "signalReconnecting";
        class _l extends rr.EventEmitter {
          get hasE2EESetup() {
            return void 0 !== this.e2eeManager;
          }
          constructor(t2) {
            var n2, i2, s2, a2, o2, c2, d2;
            if (super(), n2 = this, this.state = e.ConnectionState.Disconnected, this.activeSpeakers = [], this.isE2EEEnabled = false, this.audioEnabled = true, this.e2eeStateMutex = new r(), this.isVideoPlaybackBlocked = false, this.log = Hi, this.bufferedEvents = [], this.isResuming = false, this.rpcHandlers = /* @__PURE__ */ new Map(), this.connect = (t3, n3, i3) => Xi(this, void 0, void 0, (function* () {
              var r2;
              if (!Ca()) throw Oa() ? Error("WebRTC isn't detected, have you called registerGlobals?") : Error("LiveKit doesn't seem to be supported on this browser. Try to update your browser and make sure no browser extensions are disabling webRTC.");
              const s3 = yield this.disconnectLock.lock();
              if (this.state === e.ConnectionState.Connected) return this.log.info("already connected to room ".concat(this.name)), s3(), Promise.resolve();
              if (this.connectFuture) return s3(), this.connectFuture.promise;
              this.setAndEmitConnectionState(e.ConnectionState.Connecting), (null === (r2 = this.regionUrlProvider) || void 0 === r2 ? void 0 : r2.getServerUrl().toString()) !== mo(t3) && (this.regionUrl = void 0, this.regionUrlProvider = void 0), Aa(new URL(t3)) && (void 0 === this.regionUrlProvider ? this.regionUrlProvider = new pd(t3, n3) : this.regionUrlProvider.updateToken(n3), this.regionUrlProvider.fetchRegionSettings().then(((e2) => {
                var t4;
                null === (t4 = this.regionUrlProvider) || void 0 === t4 || t4.setServerReportedRegions(e2);
              })).catch(((e2) => {
                this.log.warn("could not fetch region settings", { error: e2 });
              })));
              const a3 = (r3, o4, c3) => Xi(this, void 0, void 0, (function* () {
                var d3, l2;
                this.abortController && this.abortController.abort();
                const u2 = new AbortController();
                this.abortController = u2, null == s3 || s3();
                try {
                  if (yield Oo.getInstance().getBackOffPromise(t3), u2.signal.aborted) throw _s.cancelled("Connection attempt aborted");
                  yield this.attemptConnection(null != c3 ? c3 : t3, n3, i3, u2), this.abortController = void 0, r3();
                } catch (n4) {
                  if (this.regionUrlProvider && n4 instanceof _s && n4.reason !== e.ConnectionErrorReason.Cancelled && n4.reason !== e.ConnectionErrorReason.NotAllowed) {
                    let i4 = null;
                    try {
                      this.log.debug("Fetching next region"), i4 = yield this.regionUrlProvider.getNextBestRegionUrl(null === (d3 = this.abortController) || void 0 === d3 ? void 0 : d3.signal);
                    } catch (t4) {
                      if (t4 instanceof _s && (401 === t4.status || t4.reason === e.ConnectionErrorReason.Cancelled)) return this.handleDisconnect(this.options.stopLocalTrackOnUnpublish), void o4(t4);
                    }
                    [e.ConnectionErrorReason.InternalError, e.ConnectionErrorReason.ServerUnreachable, e.ConnectionErrorReason.Timeout].includes(n4.reason) && (this.log.debug("Adding failed connection attempt to back off"), Oo.getInstance().addFailedConnectionAttempt(t3)), i4 && !(null === (l2 = this.abortController) || void 0 === l2 ? void 0 : l2.signal.aborted) ? (this.log.info("Initial connection failed with ConnectionError: ".concat(n4.message, ". Retrying with another region: ").concat(i4)), this.recreateEngine(true), yield a3(r3, o4, i4)) : (this.handleDisconnect(this.options.stopLocalTrackOnUnpublish, $a(n4)), o4(n4));
                  } else {
                    let e2 = nt.UNKNOWN_REASON;
                    n4 instanceof _s && (e2 = $a(n4)), this.handleDisconnect(this.options.stopLocalTrackOnUnpublish, e2), o4(n4);
                  }
                }
              })), o3 = this.regionUrl;
              return this.regionUrl = void 0, this.connectFuture = new Qa(((e2, t4) => {
                a3(e2, t4, o3);
              }), (() => {
                this.clearConnectionFutures();
              })), this.connectFuture.promise;
            })), this.connectSignal = (e2, t3, n3, i3, r2, s3) => Xi(this, void 0, void 0, (function* () {
              const { joinResponse: a3, serverInfo: o3 } = yield n3.join(e2, t3, { autoSubscribe: i3.autoSubscribe, adaptiveStream: "object" == typeof r2.adaptiveStream || r2.adaptiveStream, maxRetries: i3.maxRetries, e2eeEnabled: !!this.e2eeManager, websocketTimeout: i3.websocketTimeout }, s3.signal, !r2.singlePeerConnection);
              if (this.serverInfo = o3, !o3.version) throw new As("unknown server version");
              return "0.15.1" === o3.version && this.options.dynacast && (this.log.debug("disabling dynacast due to server version"), r2.dynacast = false), a3;
            })), this.applyJoinResponse = (e2) => {
              const t3 = e2.participant;
              if (this.localParticipant.sid = t3.sid, this.localParticipant.identity = t3.identity, this.localParticipant.setEnabledPublishCodecs(e2.enabledPublishCodecs), this.e2eeManager) try {
                this.e2eeManager.setSifTrailer(e2.sifTrailer);
              } catch (e3) {
                this.log.error(e3 instanceof Error ? e3.message : "Could not set SifTrailer", { error: e3 });
              }
              this.handleParticipantUpdates([t3, ...e2.otherParticipants]), e2.room && this.handleRoomUpdate(e2.room);
            }, this.attemptConnection = (t3, n3, i3, r2) => Xi(this, void 0, void 0, (function* () {
              var s3, a3;
              this.state === e.ConnectionState.Reconnecting || this.isResuming || (null === (s3 = this.engine) || void 0 === s3 ? void 0 : s3.pendingReconnect) ? (this.log.info("Reconnection attempt replaced by new connection attempt"), this.recreateEngine(true)) : this.maybeCreateEngine(), (null === (a3 = this.regionUrlProvider) || void 0 === a3 ? void 0 : a3.isCloud()) && this.engine.setRegionStrategy(this.createRegionStrategy()), this.acquireAudioContext(), this.connOptions = Object.assign(Object.assign({}, Ic), i3), this.connOptions.rtcConfig && (this.engine.rtcConfig = this.connOptions.rtcConfig), this.connOptions.peerConnectionTimeout && (this.engine.peerConnectionTimeout = this.connOptions.peerConnectionTimeout);
              try {
                const i4 = yield this.connectSignal(t3, n3, this.engine, this.connOptions, this.options, r2);
                this.applyJoinResponse(i4), this.setupLocalParticipantEvents(), this.emit(e.RoomEvent.SignalConnected);
              } catch (e2) {
                yield this.engine.close(), this.recreateEngine();
                const t4 = r2.signal.aborted ? _s.cancelled("Signal connection aborted") : _s.serverUnreachable("could not establish signal connection");
                throw e2 instanceof Error && (t4.message = "".concat(t4.message, ": ").concat(e2.message)), e2 instanceof _s && (t4.reason = e2.reason, t4.status = e2.status), this.log.debug("error trying to establish signal connection", { error: e2 }), t4;
              }
              if (r2.signal.aborted) throw yield this.engine.close(), this.recreateEngine(), _s.cancelled("Connection attempt aborted");
              try {
                yield this.engine.waitForPCInitialConnection(this.connOptions.peerConnectionTimeout, r2);
              } catch (e2) {
                throw yield this.engine.close(), this.recreateEngine(), e2;
              }
              Ma() && this.options.disconnectOnPageLeave && (window.addEventListener("pagehide", this.onPageLeave), window.addEventListener("beforeunload", this.onPageLeave)), Ma() && window.addEventListener("freeze", this.onPageLeave), this.setAndEmitConnectionState(e.ConnectionState.Connected), this.emit(e.RoomEvent.Connected), Oo.getInstance().resetFailedConnectionAttempts(t3), this.registerConnectionReconcile(), this.regionUrlProvider && this.regionUrlProvider.notifyConnected();
            })), this.disconnect = function() {
              for (var t3 = arguments.length, i3 = new Array(t3), r2 = 0; r2 < t3; r2++) i3[r2] = arguments[r2];
              return Xi(n2, [...i3], void 0, (function() {
                var t4 = this;
                let n3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                return (function* () {
                  var i4, r3, s3;
                  const a3 = yield t4.disconnectLock.lock();
                  try {
                    if (t4.state === e.ConnectionState.Disconnected) return void t4.log.debug("already disconnected");
                    if (t4.log.info("disconnect from room"), t4.state === e.ConnectionState.Connecting || t4.state === e.ConnectionState.Reconnecting || t4.isResuming) {
                      const e2 = "Abort connection attempt due to user initiated disconnect";
                      t4.log.warn(e2), null === (i4 = t4.abortController) || void 0 === i4 || i4.abort(e2), null === (s3 = null === (r3 = t4.connectFuture) || void 0 === r3 ? void 0 : r3.reject) || void 0 === s3 || s3.call(r3, _s.cancelled("Client initiated disconnect")), t4.connectFuture = void 0;
                    }
                    t4.engine && (t4.engine.client.isDisconnected || (yield t4.engine.client.sendLeave()), yield t4.engine.close()), t4.handleDisconnect(n3, nt.CLIENT_INITIATED), t4.engine = void 0;
                  } finally {
                    a3();
                  }
                })();
              }));
            }, this.onPageLeave = () => Xi(this, void 0, void 0, (function* () {
              this.log.info("Page leave detected, disconnecting"), yield this.disconnect();
            })), this.startAudio = () => Xi(this, void 0, void 0, (function* () {
              const t3 = [], n3 = vs();
              if (n3 && "iOS" === n3.os) {
                const n4 = "livekit-dummy-audio-el";
                let i3 = document.getElementById(n4);
                if (!i3) {
                  i3 = document.createElement("audio"), i3.id = n4, i3.autoplay = true, i3.hidden = true;
                  const t4 = Ga();
                  t4.enabled = true;
                  const r2 = new MediaStream([t4]);
                  i3.srcObject = r2, document.addEventListener("visibilitychange", (() => {
                    i3 && (i3.srcObject = document.hidden ? null : r2, document.hidden || (this.log.debug("page visible again, triggering startAudio to resume playback and update playback status"), this.startAudio()));
                  })), document.body.append(i3), this.once(e.RoomEvent.Disconnected, (() => {
                    null == i3 || i3.remove(), i3 = null;
                  }));
                }
                t3.push(i3);
              }
              this.remoteParticipants.forEach(((e2) => {
                e2.audioTrackPublications.forEach(((e3) => {
                  e3.track && e3.track.attachedElements.forEach(((e4) => {
                    t3.push(e4);
                  }));
                }));
              }));
              try {
                yield Promise.all([this.acquireAudioContext(), ...t3.map(((e2) => (e2.muted = false, e2.play())))]), this.handleAudioPlaybackStarted();
              } catch (e2) {
                throw this.handleAudioPlaybackFailed(e2), e2;
              }
            })), this.startVideo = () => Xi(this, void 0, void 0, (function* () {
              const e2 = [];
              for (const t3 of this.remoteParticipants.values()) t3.videoTrackPublications.forEach(((t4) => {
                var n3;
                null === (n3 = t4.track) || void 0 === n3 || n3.attachedElements.forEach(((t5) => {
                  e2.includes(t5) || e2.push(t5);
                }));
              }));
              yield Promise.all(e2.map(((e3) => e3.play()))).then((() => {
                this.handleVideoPlaybackStarted();
              })).catch(((e3) => {
                "NotAllowedError" === e3.name ? this.handleVideoPlaybackFailed() : this.log.warn("Resuming video playback failed, make sure you call `startVideo` directly in a user gesture handler");
              }));
            })), this.handleRestarting = () => {
              this.clearConnectionReconcile(), this.isResuming = false;
              for (const e2 of this.remoteParticipants.values()) this.handleParticipantDisconnected(e2.identity, e2);
              this.setAndEmitConnectionState(e.ConnectionState.Reconnecting) && this.emit(e.RoomEvent.Reconnecting);
            }, this.handleRestarted = () => {
              this.outgoingDataTrackManager.sfuWillRepublishTracks(), this.incomingDataTrackManager.resendSubscriptionUpdates();
            }, this.handleSignalRestarted = (t3) => Xi(this, void 0, void 0, (function* () {
              this.log.debug("signal reconnected to server, region ".concat(t3.serverRegion), { region: t3.serverRegion }), this.bufferedEvents = [], this.applyJoinResponse(t3);
              try {
                yield this.localParticipant.republishAllTracks(void 0, true);
              } catch (e2) {
                this.log.error("error trying to re-publish tracks after reconnection", { error: e2 });
              }
              try {
                yield this.engine.waitForRestarted(), this.log.debug("fully reconnected to server", { region: t3.serverRegion });
              } catch (e2) {
                return;
              }
              this.setAndEmitConnectionState(e.ConnectionState.Connected), this.emit(e.RoomEvent.Reconnected), this.registerConnectionReconcile(), this.emitBufferedEvents();
            })), this.handleParticipantUpdates = (e2) => {
              var t3;
              for (const n4 of e2) {
                if (n4.identity === this.localParticipant.identity) {
                  this.localParticipant.updateInfo(n4);
                  continue;
                }
                "" === n4.identity && (n4.identity = null !== (t3 = this.sidToIdentity.get(n4.sid)) && void 0 !== t3 ? t3 : "");
                let e3 = this.remoteParticipants.get(n4.identity);
                n4.state === ut.DISCONNECTED ? this.handleParticipantDisconnected(n4.identity, e3) : e3 = this.getOrCreateParticipant(n4.identity, n4);
              }
              const n3 = new Map(e2.filter(((e3) => e3.identity !== this.localParticipant.identity)).map(((e3) => [e3.identity, e3.dataTracks.map(((e4) => Ko.from(e4)))])));
              this.incomingDataTrackManager.receiveSfuPublicationUpdates(n3);
            }, this.handleActiveSpeakersUpdate = (t3) => {
              const n3 = [], i3 = {};
              t3.forEach(((e2) => {
                if (i3[e2.sid] = true, e2.sid === this.localParticipant.sid) this.localParticipant.audioLevel = e2.level, this.localParticipant.setIsSpeaking(true), n3.push(this.localParticipant);
                else {
                  const t4 = this.getRemoteParticipantBySid(e2.sid);
                  t4 && (t4.audioLevel = e2.level, t4.setIsSpeaking(true), n3.push(t4));
                }
              })), i3[this.localParticipant.sid] || (this.localParticipant.audioLevel = 0, this.localParticipant.setIsSpeaking(false)), this.remoteParticipants.forEach(((e2) => {
                i3[e2.sid] || (e2.audioLevel = 0, e2.setIsSpeaking(false));
              })), this.activeSpeakers = n3, this.emitWhenConnected(e.RoomEvent.ActiveSpeakersChanged, n3);
            }, this.handleSpeakersChanged = (t3) => {
              const n3 = /* @__PURE__ */ new Map();
              this.activeSpeakers.forEach(((e2) => {
                const t4 = this.remoteParticipants.get(e2.identity);
                t4 && t4.sid !== e2.sid || n3.set(e2.sid, e2);
              })), t3.forEach(((e2) => {
                let t4 = this.getRemoteParticipantBySid(e2.sid);
                e2.sid === this.localParticipant.sid && (t4 = this.localParticipant), t4 && (t4.audioLevel = e2.level, t4.setIsSpeaking(e2.active), e2.active ? n3.set(e2.sid, t4) : n3.delete(e2.sid));
              }));
              const i3 = Array.from(n3.values());
              i3.sort(((e2, t4) => t4.audioLevel - e2.audioLevel)), this.activeSpeakers = i3, this.emitWhenConnected(e.RoomEvent.ActiveSpeakersChanged, i3);
            }, this.handleStreamStateUpdate = (t3) => {
              t3.streamStates.forEach(((t4) => {
                const n3 = this.getRemoteParticipantBySid(t4.participantSid);
                if (!n3) return;
                const i3 = n3.getTrackPublicationBySid(t4.trackSid);
                if (!i3 || !i3.track) return;
                const r2 = pa.streamStateFromProto(t4.state);
                i3.track.setStreamState(r2), r2 !== i3.track.streamState && (n3.emit(e.ParticipantEvent.TrackStreamStateChanged, i3, i3.track.streamState), this.emitWhenConnected(e.RoomEvent.TrackStreamStateChanged, i3, i3.track.streamState, n3));
              }));
            }, this.handleSubscriptionPermissionUpdate = (e2) => {
              const t3 = this.getRemoteParticipantBySid(e2.participantSid);
              if (!t3) return;
              const n3 = t3.getTrackPublicationBySid(e2.trackSid);
              n3 && n3.setAllowed(e2.allowed);
            }, this.handleSubscriptionError = (e2) => {
              const t3 = Array.from(this.remoteParticipants.values()).find(((t4) => t4.trackPublications.has(e2.trackSid)));
              if (!t3) return;
              const n3 = t3.getTrackPublicationBySid(e2.trackSid);
              n3 && n3.setSubscriptionError(e2.err);
            }, this.handleDataPacket = (e2, t3) => {
              const n3 = this.remoteParticipants.get(e2.participantIdentity);
              if ("user" === e2.value.case) this.handleUserPacket(n3, e2.value.value, e2.kind, t3);
              else if ("transcription" === e2.value.case) this.handleTranscription(n3, e2.value.value);
              else if ("sipDtmf" === e2.value.case) this.handleSipDtmf(n3, e2.value.value);
              else if ("chatMessage" === e2.value.case) this.handleChatMessage(n3, e2.value.value);
              else if ("metrics" === e2.value.case) this.handleMetrics(e2.value.value, n3);
              else if ("streamHeader" === e2.value.case || "streamChunk" === e2.value.case || "streamTrailer" === e2.value.case) this.handleDataStream(e2, t3);
              else if ("rpcRequest" === e2.value.case) {
                const t4 = e2.value.value;
                this.handleIncomingRpcRequest(e2.participantIdentity, t4.id, t4.method, t4.payload, t4.responseTimeoutMs, t4.version);
              }
            }, this.handleUserPacket = (t3, n3, i3, r2) => {
              this.emit(e.RoomEvent.DataReceived, n3.payload, t3, i3, n3.topic, r2), null == t3 || t3.emit(e.ParticipantEvent.DataReceived, n3.payload, i3, r2);
            }, this.handleSipDtmf = (t3, n3) => {
              this.emit(e.RoomEvent.SipDTMFReceived, n3, t3), null == t3 || t3.emit(e.ParticipantEvent.SipDTMFReceived, n3);
            }, this.handleTranscription = (t3, n3) => {
              const i3 = n3.transcribedParticipantIdentity === this.localParticipant.identity ? this.localParticipant : this.getParticipantByIdentity(n3.transcribedParticipantIdentity), r2 = null == i3 ? void 0 : i3.trackPublications.get(n3.trackId), s3 = (function(e2, t4) {
                return e2.segments.map(((e3) => {
                  let { id: n4, text: i4, language: r3, startTime: s4, endTime: a3, final: o3 } = e3;
                  var c3;
                  const d3 = null !== (c3 = t4.get(n4)) && void 0 !== c3 ? c3 : Date.now(), l2 = Date.now();
                  return o3 ? t4.delete(n4) : t4.set(n4, d3), { id: n4, text: i4, startTime: Number.parseInt(s4.toString()), endTime: Number.parseInt(a3.toString()), final: o3, language: r3, firstReceivedTime: d3, lastReceivedTime: l2 };
                }));
              })(n3, this.transcriptionReceivedTimes);
              null == r2 || r2.emit(e.TrackEvent.TranscriptionReceived, s3), null == i3 || i3.emit(e.ParticipantEvent.TranscriptionReceived, s3, r2), this.emit(e.RoomEvent.TranscriptionReceived, s3, i3, r2);
            }, this.handleChatMessage = (t3, n3) => {
              const i3 = (function(e2) {
                const { id: t4, timestamp: n4, message: i4, editTimestamp: r2 } = e2;
                return { id: t4, timestamp: Number.parseInt(n4.toString()), editTimestamp: r2 ? Number.parseInt(r2.toString()) : void 0, message: i4 };
              })(n3);
              this.emit(e.RoomEvent.ChatMessage, i3, t3);
            }, this.handleMetrics = (t3, n3) => {
              this.emit(e.RoomEvent.MetricsReceived, t3, n3);
            }, this.handleDataStream = (e2, t3) => {
              this.incomingDataStreamManager.handleDataStreamPacket(e2, t3);
            }, this.bufferedSegments = /* @__PURE__ */ new Map(), this.handleAudioPlaybackStarted = () => {
              this.canPlaybackAudio || (this.audioEnabled = true, this.emit(e.RoomEvent.AudioPlaybackStatusChanged, true));
            }, this.handleAudioPlaybackFailed = (t3) => {
              this.log.warn("could not playback audio", { error: t3 }), this.canPlaybackAudio && (this.audioEnabled = false, this.emit(e.RoomEvent.AudioPlaybackStatusChanged, false));
            }, this.handleVideoPlaybackStarted = () => {
              this.isVideoPlaybackBlocked && (this.isVideoPlaybackBlocked = false, this.emit(e.RoomEvent.VideoPlaybackStatusChanged, true));
            }, this.handleVideoPlaybackFailed = () => {
              this.isVideoPlaybackBlocked || (this.isVideoPlaybackBlocked = true, this.emit(e.RoomEvent.VideoPlaybackStatusChanged, false));
            }, this.handleDeviceChange = () => Xi(this, void 0, void 0, (function* () {
              var t3;
              "iOS" !== (null === (t3 = vs()) || void 0 === t3 ? void 0 : t3.os) && (yield this.selectDefaultDevices()), this.emit(e.RoomEvent.MediaDevicesChanged);
            })), this.handleRoomUpdate = (t3) => {
              const n3 = this.roomInfo;
              this.roomInfo = t3, n3 && n3.metadata !== t3.metadata && this.emitWhenConnected(e.RoomEvent.RoomMetadataChanged, t3.metadata), (null == n3 ? void 0 : n3.activeRecording) !== t3.activeRecording && this.emitWhenConnected(e.RoomEvent.RecordingStatusChanged, t3.activeRecording);
            }, this.handleConnectionQualityUpdate = (e2) => {
              e2.updates.forEach(((e3) => {
                if (e3.participantSid === this.localParticipant.sid) return void this.localParticipant.setConnectionQuality(e3.quality);
                const t3 = this.getRemoteParticipantBySid(e3.participantSid);
                t3 && t3.setConnectionQuality(e3.quality);
              }));
            }, this.onLocalParticipantMetadataChanged = (t3) => {
              this.emit(e.RoomEvent.ParticipantMetadataChanged, t3, this.localParticipant);
            }, this.onLocalParticipantNameChanged = (t3) => {
              this.emit(e.RoomEvent.ParticipantNameChanged, t3, this.localParticipant);
            }, this.onLocalAttributesChanged = (t3) => {
              this.emit(e.RoomEvent.ParticipantAttributesChanged, t3, this.localParticipant);
            }, this.onLocalTrackMuted = (t3) => {
              this.emit(e.RoomEvent.TrackMuted, t3, this.localParticipant);
            }, this.onLocalTrackUnmuted = (t3) => {
              this.emit(e.RoomEvent.TrackUnmuted, t3, this.localParticipant);
            }, this.onTrackProcessorUpdate = (e2) => {
              var t3;
              null === (t3 = null == e2 ? void 0 : e2.onPublish) || void 0 === t3 || t3.call(e2, this);
            }, this.onLocalTrackPublished = (t3) => Xi(this, void 0, void 0, (function* () {
              var n3, i3, r2, s3, a3, o3;
              if (null === (n3 = t3.track) || void 0 === n3 || n3.on(e.TrackEvent.TrackProcessorUpdate, this.onTrackProcessorUpdate), null === (i3 = t3.track) || void 0 === i3 || i3.on(e.TrackEvent.Restarted, this.onLocalTrackRestarted), null === (a3 = null === (s3 = null === (r2 = t3.track) || void 0 === r2 ? void 0 : r2.getProcessor()) || void 0 === s3 ? void 0 : s3.onPublish) || void 0 === a3 || a3.call(s3, this), this.emit(e.RoomEvent.LocalTrackPublished, t3, this.localParticipant), ao(t3.track)) {
                (yield t3.track.checkForSilence()) && this.emit(e.RoomEvent.LocalAudioSilenceDetected, t3);
              }
              const c3 = yield null === (o3 = t3.track) || void 0 === o3 ? void 0 : o3.getDeviceId(false), d3 = ra(t3.source);
              d3 && c3 && c3 !== this.localParticipant.activeDeviceMap.get(d3) && (this.localParticipant.activeDeviceMap.set(d3, c3), this.emit(e.RoomEvent.ActiveDeviceChanged, d3, c3));
            })), this.onLocalTrackUnpublished = (t3) => {
              var n3, i3;
              null === (n3 = t3.track) || void 0 === n3 || n3.off(e.TrackEvent.TrackProcessorUpdate, this.onTrackProcessorUpdate), null === (i3 = t3.track) || void 0 === i3 || i3.off(e.TrackEvent.Restarted, this.onLocalTrackRestarted), this.emit(e.RoomEvent.LocalTrackUnpublished, t3, this.localParticipant);
            }, this.onLocalTrackRestarted = (t3) => Xi(this, void 0, void 0, (function* () {
              const n3 = yield t3.getDeviceId(false), i3 = ra(t3.source);
              i3 && n3 && n3 !== this.localParticipant.activeDeviceMap.get(i3) && (this.log.debug("local track restarted, setting ".concat(i3, " ").concat(n3, " active")), this.localParticipant.activeDeviceMap.set(i3, n3), this.emit(e.RoomEvent.ActiveDeviceChanged, i3, n3));
            })), this.onLocalConnectionQualityChanged = (t3) => {
              this.emit(e.RoomEvent.ConnectionQualityChanged, t3, this.localParticipant);
            }, this.onMediaDevicesError = (t3, n3) => {
              this.emit(e.RoomEvent.MediaDevicesError, t3, n3);
            }, this.onLocalParticipantPermissionsChanged = (t3) => {
              this.emit(e.RoomEvent.ParticipantPermissionsChanged, t3, this.localParticipant);
            }, this.onLocalChatMessageSent = (t3) => {
              this.emit(e.RoomEvent.ChatMessage, t3, this.localParticipant);
            }, this.setMaxListeners(100), this.remoteParticipants = /* @__PURE__ */ new Map(), this.sidToIdentity = /* @__PURE__ */ new Map(), this.options = Object.assign(Object.assign({}, Pc), t2), this.log = Ki(null !== (i2 = this.options.loggerName) && void 0 !== i2 ? i2 : e.LoggerNames.Room, (() => this.logContext)), this.transcriptionReceivedTimes = /* @__PURE__ */ new Map(), this.options.audioCaptureDefaults = Object.assign(Object.assign({}, wc), null == t2 ? void 0 : t2.audioCaptureDefaults), this.options.videoCaptureDefaults = Object.assign(Object.assign({}, Rc), null == t2 ? void 0 : t2.videoCaptureDefaults), this.options.publishDefaults = Object.assign(Object.assign({}, Cc), null == t2 ? void 0 : t2.publishDefaults), this.maybeCreateEngine(), this.incomingDataStreamManager = new fd(), this.outgoingDataStreamManager = new Td(this.engine, this.log), this.incomingDataTrackManager = new Yd({ e2eeManager: this.e2eeManager }), this.incomingDataTrackManager.on("sfuUpdateSubscription", ((e2) => {
              this.engine.client.sendUpdateDataSubscription(e2.sid, e2.subscribe);
            })).on("trackPublished", ((t3) => {
              var n3;
              t3.track.publisherIdentity !== this.localParticipant.identity && (this.emit(e.RoomEvent.DataTrackPublished, t3.track), null === (n3 = this.remoteParticipants.get(t3.track.publisherIdentity)) || void 0 === n3 || n3.addRemoteDataTrack(t3.track));
            })).on("trackUnpublished", ((t3) => {
              var n3;
              t3.publisherIdentity !== this.localParticipant.identity && (this.emit(e.RoomEvent.DataTrackUnpublished, t3.sid), null === (n3 = this.remoteParticipants.get(t3.publisherIdentity)) || void 0 === n3 || n3.removeRemoteDataTrack(t3.sid));
            })), this.outgoingDataTrackManager = new ll({ e2eeManager: this.e2eeManager }), this.outgoingDataTrackManager.on("sfuPublishRequest", ((e2) => {
              this.engine.client.sendPublishDataTrackRequest(e2.handle, e2.name, e2.usesE2ee);
            })).on("sfuUnpublishRequest", ((e2) => {
              this.engine.client.sendUnPublishDataTrackRequest(e2.handle);
            })).on("trackPublished", ((t3) => {
              this.emit(e.RoomEvent.LocalDataTrackPublished, t3.track);
            })).on("trackUnpublished", ((t3) => {
              this.emit(e.RoomEvent.LocalDataTrackUnpublished, t3.sid);
            })).on("packetAvailable", ((e2) => {
              let { handle: t3, bytes: n3 } = e2;
              this.engine.sendLossyBytes(n3, dd.DATA_TRACK_LOSSY, "wait").finally((() => this.outgoingDataTrackManager.handlePacketSendComplete(t3)));
            })), this.disconnectLock = new r(), this.localParticipant = new wl("", "", this.engine, this.options, this.rpcHandlers, this.outgoingDataStreamManager, this.outgoingDataTrackManager), (this.options.e2ee || this.options.encryption) && this.setupE2EE(), this.engine.e2eeManager = this.e2eeManager, this.incomingDataTrackManager.updateE2eeManager(null !== (s2 = this.e2eeManager) && void 0 !== s2 ? s2 : null), this.outgoingDataTrackManager.updateE2eeManager(null !== (a2 = this.e2eeManager) && void 0 !== a2 ? a2 : null), this.options.videoCaptureDefaults.deviceId && this.localParticipant.activeDeviceMap.set("videoinput", Xa(this.options.videoCaptureDefaults.deviceId)), this.options.audioCaptureDefaults.deviceId && this.localParticipant.activeDeviceMap.set("audioinput", Xa(this.options.audioCaptureDefaults.deviceId)), (null === (o2 = this.options.audioOutput) || void 0 === o2 ? void 0 : o2.deviceId) && this.switchActiveDevice("audiooutput", Xa(this.options.audioOutput.deviceId)).catch(((e2) => this.log.warn("Could not set audio output: ".concat(e2.message)))), Ma()) {
              const e2 = new AbortController();
              null === (d2 = null === (c2 = navigator.mediaDevices) || void 0 === c2 ? void 0 : c2.addEventListener) || void 0 === d2 || d2.call(c2, "devicechange", this.handleDeviceChange, { signal: e2.signal }), _l.cleanupRegistry && _l.cleanupRegistry.register(this, (() => {
                e2.abort();
              }));
            }
          }
          registerTextStreamHandler(e2, t2) {
            return this.incomingDataStreamManager.registerTextStreamHandler(e2, t2);
          }
          unregisterTextStreamHandler(e2) {
            return this.incomingDataStreamManager.unregisterTextStreamHandler(e2);
          }
          registerByteStreamHandler(e2, t2) {
            return this.incomingDataStreamManager.registerByteStreamHandler(e2, t2);
          }
          unregisterByteStreamHandler(e2) {
            return this.incomingDataStreamManager.unregisterByteStreamHandler(e2);
          }
          registerRpcMethod(e2, t2) {
            if (this.rpcHandlers.has(e2)) throw Error("RPC handler already registered for method ".concat(e2, ", unregisterRpcMethod before trying to register again"));
            this.rpcHandlers.set(e2, t2);
          }
          unregisterRpcMethod(e2) {
            this.rpcHandlers.delete(e2);
          }
          setE2EEEnabled(e2) {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = yield this.e2eeStateMutex.lock();
              try {
                if (!this.e2eeManager) throw Error("e2ee not configured, please set e2ee settings within the room options");
                this.isE2EEEnabled !== e2 && (yield this.localParticipant.setE2EEEnabled(e2), "" !== this.localParticipant.identity && this.e2eeManager.setParticipantCryptorEnabled(e2, this.localParticipant.identity));
              } finally {
                t2();
              }
            }));
          }
          setupE2EE() {
            var t2, n2;
            const i2 = !!this.options.encryption, r2 = this.options.encryption || this.options.e2ee;
            r2 && ("e2eeManager" in r2 ? (this.e2eeManager = r2.e2eeManager, this.e2eeManager.isDataChannelEncryptionEnabled = i2) : this.e2eeManager = new Mo(r2, i2), this.e2eeManager.on(e.EncryptionEvent.ParticipantEncryptionStatusChanged, ((t3, n3) => {
              uo(n3) && (this.isE2EEEnabled = t3), this.emit(e.RoomEvent.ParticipantEncryptionStatusChanged, t3, n3);
            })), this.e2eeManager.on(e.EncryptionEvent.EncryptionError, ((t3, n3) => {
              const i3 = n3 ? this.getParticipantByIdentity(n3) : void 0;
              this.emit(e.RoomEvent.EncryptionError, t3, i3);
            })), null === (t2 = this.e2eeManager) || void 0 === t2 || t2.setup(this), null === (n2 = this.e2eeManager) || void 0 === n2 || n2.setupEngine(this.engine));
          }
          get logContext() {
            var e2, t2, n2;
            return { room: this.name, roomID: null === (e2 = this.roomInfo) || void 0 === e2 ? void 0 : e2.sid, participant: null === (t2 = this.localParticipant) || void 0 === t2 ? void 0 : t2.identity, participantID: null === (n2 = this.localParticipant) || void 0 === n2 ? void 0 : n2.sid };
          }
          get isRecording() {
            var e2, t2;
            return null !== (t2 = null === (e2 = this.roomInfo) || void 0 === e2 ? void 0 : e2.activeRecording) && void 0 !== t2 && t2;
          }
          getSid() {
            return this.state === e.ConnectionState.Disconnected ? ps.resolve("") : this.roomInfo && "" !== this.roomInfo.sid ? ps.resolve(this.roomInfo.sid) : new ps(((t2, n2) => {
              const i2 = (n3) => {
                "" !== n3.sid && (this.engine.off(e.EngineEvent.RoomUpdate, i2), t2(n3.sid));
              };
              this.engine.on(e.EngineEvent.RoomUpdate, i2), this.once(e.RoomEvent.Disconnected, (() => {
                this.engine.off(e.EngineEvent.RoomUpdate, i2), n2(new Ns("Room disconnected before room server id was available"));
              }));
            }));
          }
          get name() {
            var e2, t2;
            return null !== (t2 = null === (e2 = this.roomInfo) || void 0 === e2 ? void 0 : e2.name) && void 0 !== t2 ? t2 : "";
          }
          get metadata() {
            var e2;
            return null === (e2 = this.roomInfo) || void 0 === e2 ? void 0 : e2.metadata;
          }
          get numParticipants() {
            var e2, t2;
            return null !== (t2 = null === (e2 = this.roomInfo) || void 0 === e2 ? void 0 : e2.numParticipants) && void 0 !== t2 ? t2 : 0;
          }
          get numPublishers() {
            var e2, t2;
            return null !== (t2 = null === (e2 = this.roomInfo) || void 0 === e2 ? void 0 : e2.numPublishers) && void 0 !== t2 ? t2 : 0;
          }
          maybeCreateEngine() {
            (!this.engine || !this.engine.isNewlyCreated && this.engine.isClosed) && (this.engine = new ld(this.options), this.engine.e2eeManager = this.e2eeManager, this.engine.on(e.EngineEvent.ParticipantUpdate, this.handleParticipantUpdates).on(e.EngineEvent.RoomUpdate, this.handleRoomUpdate).on(e.EngineEvent.SpeakersChanged, this.handleSpeakersChanged).on(e.EngineEvent.StreamStateChanged, this.handleStreamStateUpdate).on(e.EngineEvent.ConnectionQualityUpdate, this.handleConnectionQualityUpdate).on(e.EngineEvent.SubscriptionError, this.handleSubscriptionError).on(e.EngineEvent.SubscriptionPermissionUpdate, this.handleSubscriptionPermissionUpdate).on(e.EngineEvent.MediaTrackAdded, ((e2, t2, n2) => {
              this.onTrackAdded(e2, t2, n2);
            })).on(e.EngineEvent.Disconnected, ((e2) => {
              this.handleDisconnect(this.options.stopLocalTrackOnUnpublish, e2);
            })).on(e.EngineEvent.ActiveSpeakersUpdate, this.handleActiveSpeakersUpdate).on(e.EngineEvent.DataPacketReceived, this.handleDataPacket).on(e.EngineEvent.Resuming, (() => {
              this.clearConnectionReconcile(), this.isResuming = true, this.log.debug("Resuming signal connection"), this.setAndEmitConnectionState(e.ConnectionState.SignalReconnecting) && this.emit(e.RoomEvent.SignalReconnecting);
            })).on(e.EngineEvent.Resumed, (() => {
              this.registerConnectionReconcile(), this.isResuming = false, this.log.debug("Resumed signal connection"), this.updateSubscriptions(), this.emitBufferedEvents(), this.setAndEmitConnectionState(e.ConnectionState.Connected) && this.emit(e.RoomEvent.Reconnected);
            })).on(e.EngineEvent.SignalResumed, (() => {
              this.bufferedEvents = [], (this.state === e.ConnectionState.Reconnecting || this.isResuming) && this.sendSyncState();
            })).on(e.EngineEvent.Restarting, this.handleRestarting).on(e.EngineEvent.Restarted, this.handleRestarted).on(e.EngineEvent.SignalRestarted, this.handleSignalRestarted).on(e.EngineEvent.Offline, (() => {
              this.setAndEmitConnectionState(e.ConnectionState.Reconnecting) && this.emit(e.RoomEvent.Reconnecting);
            })).on(e.EngineEvent.DCBufferStatusChanged, ((t2, n2) => {
              this.emit(e.RoomEvent.DCBufferStatusChanged, t2, n2);
            })).on(e.EngineEvent.LocalTrackSubscribed, ((e2) => {
              this.handleLocalTrackSubscribed(e2);
            })).on(e.EngineEvent.RoomMoved, ((t2) => {
              this.log.debug("room moved", t2), t2.room && this.handleRoomUpdate(t2.room), this.remoteParticipants.forEach(((e2, t3) => {
                this.handleParticipantDisconnected(t3, e2);
              })), this.emit(e.RoomEvent.Moved, t2.room.name), t2.participant ? this.handleParticipantUpdates([t2.participant, ...t2.otherParticipants]) : this.handleParticipantUpdates(t2.otherParticipants);
            })).on(e.EngineEvent.PublishDataTrackResponse, ((e2) => {
              e2.info ? this.outgoingDataTrackManager.receivedSfuPublishResponse(e2.info.pubHandle, { type: "ok", data: { sid: e2.info.sid, pubHandle: e2.info.pubHandle, name: e2.info.name, usesE2ee: e2.info.encryption !== mt.NONE } }) : this.log.warn("received PublishDataTrackResponse, but event.info was ".concat(e2.info, ", so skipping."));
            })).on(e.EngineEvent.UnPublishDataTrackResponse, ((e2) => {
              e2.info ? this.outgoingDataTrackManager.receivedSfuUnpublishResponse(e2.info.pubHandle) : this.log.warn("received UnPublishDataTrackResponse, but event.info was ".concat(e2.info, ", so skipping."));
            })).on(e.EngineEvent.DataTrackSubscriberHandles, ((e2) => {
              const t2 = new Map(Object.entries(e2.subHandles).map(((e3) => {
                let [t3, n2] = e3;
                return [parseInt(t3, 10), n2.trackSid];
              })));
              this.incomingDataTrackManager.receivedSfuSubscriberHandles(t2);
            })).on(e.EngineEvent.DataTrackPacketReceived, ((e2) => {
              try {
                this.incomingDataTrackManager.packetReceived(e2);
              } catch (e3) {
                throw e3;
              }
            })).on(e.EngineEvent.Joined, ((e2) => {
              const t2 = new Map(e2.otherParticipants.map(((e3) => [e3.identity, e3.dataTracks.map(((e4) => Ko.from(e4)))])));
              this.incomingDataTrackManager.receiveSfuPublicationUpdates(t2);
            })).on(e.EngineEvent.TokenRefreshed, ((e2) => {
              var t2;
              null === (t2 = this.regionUrlProvider) || void 0 === t2 || t2.updateToken(e2);
            })).on(e.EngineEvent.ServerRegionsReported, ((e2) => {
              var t2;
              null === (t2 = this.regionUrlProvider) || void 0 === t2 || t2.setServerReportedRegions({ regionSettings: e2, updatedAtInMs: Date.now(), maxAgeInMs: hd });
            })), this.localParticipant && this.localParticipant.setupEngine(this.engine), this.e2eeManager && this.e2eeManager.setupEngine(this.engine), this.outgoingDataStreamManager && this.outgoingDataStreamManager.setupEngine(this.engine));
          }
          createRegionStrategy() {
            return { getNextUrl: (e2) => Xi(this, void 0, void 0, (function* () {
              return this.regionUrlProvider ? this.regionUrlProvider.getNextBestRegionUrl(e2) : null;
            })), resetAttempts: () => {
              var e2;
              return null === (e2 = this.regionUrlProvider) || void 0 === e2 ? void 0 : e2.resetAttempts();
            } };
          }
          static getLocalDevices(e2) {
            let t2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            return No.getInstance().getDevices(e2, t2);
          }
          prepareConnection(t2, n2) {
            return Xi(this, void 0, void 0, (function* () {
              if (this.state === e.ConnectionState.Disconnected) {
                this.log.debug("prepareConnection to ".concat(t2));
                try {
                  if (Aa(new URL(t2)) && n2) {
                    this.regionUrlProvider = new pd(t2, n2);
                    const i2 = yield this.regionUrlProvider.getNextBestRegionUrl();
                    i2 && this.state === e.ConnectionState.Disconnected && (this.regionUrl = i2, yield fetch(Za(i2), { method: "HEAD" }), this.log.debug("prepared connection to ".concat(i2)));
                  } else yield fetch(Za(t2), { method: "HEAD" });
                } catch (e2) {
                  this.log.warn("could not prepare connection", { error: e2 });
                }
              }
            }));
          }
          getParticipantByIdentity(e2) {
            return this.localParticipant.identity === e2 ? this.localParticipant : this.remoteParticipants.get(e2);
          }
          clearConnectionFutures() {
            this.connectFuture = void 0;
          }
          simulateScenario(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              let n2, i2 = () => Xi(this, void 0, void 0, (function* () {
              }));
              switch (e2) {
                case "signal-reconnect":
                  yield this.engine.client.handleOnClose("simulate disconnect");
                  break;
                case "fail-on-v1-path":
                  this.engine.failNextV1Path();
                  break;
                case "speaker":
                  n2 = new Zn({ scenario: { case: "speakerUpdate", value: 3 } });
                  break;
                case "node-failure":
                  n2 = new Zn({ scenario: { case: "nodeFailure", value: true } });
                  break;
                case "server-leave":
                  n2 = new Zn({ scenario: { case: "serverLeave", value: true } });
                  break;
                case "migration":
                  n2 = new Zn({ scenario: { case: "migration", value: true } });
                  break;
                case "resume-reconnect":
                  this.engine.failNext(), yield this.engine.client.handleOnClose("simulate resume-disconnect");
                  break;
                case "disconnect-signal-on-resume":
                  i2 = () => Xi(this, void 0, void 0, (function* () {
                    yield this.engine.client.handleOnClose("simulate resume-disconnect");
                  })), n2 = new Zn({ scenario: { case: "disconnectSignalOnResume", value: true } });
                  break;
                case "disconnect-signal-on-resume-no-messages":
                  i2 = () => Xi(this, void 0, void 0, (function* () {
                    yield this.engine.client.handleOnClose("simulate resume-disconnect");
                  })), n2 = new Zn({ scenario: { case: "disconnectSignalOnResumeNoMessages", value: true } });
                  break;
                case "full-reconnect":
                  this.engine.fullReconnectOnNext = true, yield this.engine.client.handleOnClose("simulate full-reconnect");
                  break;
                case "force-tcp":
                case "force-tls":
                  n2 = new Zn({ scenario: { case: "switchCandidateProtocol", value: "force-tls" === e2 ? 2 : 1 } }), i2 = () => Xi(this, void 0, void 0, (function* () {
                    const e3 = this.engine.client.onLeave;
                    e3 && e3(new _n({ reason: nt.CLIENT_INITIATED, action: Mn.RECONNECT }));
                  }));
                  break;
                case "subscriber-bandwidth":
                  if (void 0 === t2 || "number" != typeof t2) throw new Error("subscriber-bandwidth requires a number as argument");
                  n2 = new Zn({ scenario: { case: "subscriberBandwidth", value: to(t2) } });
                  break;
                case "leave-full-reconnect":
                  n2 = new Zn({ scenario: { case: "leaveRequestFullReconnect", value: true } });
              }
              n2 && (yield this.engine.client.sendSimulateScenario(n2), yield i2());
            }));
          }
          get canPlaybackAudio() {
            return this.audioEnabled;
          }
          get canPlaybackVideo() {
            return !this.isVideoPlaybackBlocked;
          }
          getActiveDevice(e2) {
            return this.localParticipant.activeDeviceMap.get(e2);
          }
          switchActiveDevice(t2, n2) {
            return Xi(this, arguments, void 0, (function(t3, n3) {
              var i2 = this;
              let r2 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
              return (function* () {
                var s2, a2, o2, c2, d2, l2, u2;
                let h2 = true, p2 = false;
                const m2 = r2 ? { exact: n3 } : n3;
                if ("audioinput" === t3) {
                  p2 = 0 === i2.localParticipant.audioTrackPublications.size;
                  const e2 = null !== (s2 = i2.getActiveDevice(t3)) && void 0 !== s2 ? s2 : i2.options.audioCaptureDefaults.deviceId;
                  i2.options.audioCaptureDefaults.deviceId = m2;
                  const n4 = Array.from(i2.localParticipant.audioTrackPublications.values()).filter(((e3) => e3.source === pa.Source.Microphone));
                  try {
                    h2 = (yield Promise.all(n4.map(((e3) => {
                      var t4;
                      return null === (t4 = e3.audioTrack) || void 0 === t4 ? void 0 : t4.setDeviceId(m2);
                    })))).every(((e3) => true === e3));
                  } catch (t4) {
                    throw i2.options.audioCaptureDefaults.deviceId = e2, t4;
                  }
                  const r3 = n4.some(((e3) => {
                    var t4, n5;
                    return null !== (n5 = null === (t4 = e3.track) || void 0 === t4 ? void 0 : t4.isMuted) && void 0 !== n5 && n5;
                  }));
                  h2 && r3 && (p2 = true);
                } else if ("videoinput" === t3) {
                  p2 = 0 === i2.localParticipant.videoTrackPublications.size;
                  const e2 = null !== (a2 = i2.getActiveDevice(t3)) && void 0 !== a2 ? a2 : i2.options.videoCaptureDefaults.deviceId;
                  i2.options.videoCaptureDefaults.deviceId = m2;
                  const n4 = Array.from(i2.localParticipant.videoTrackPublications.values()).filter(((e3) => e3.source === pa.Source.Camera));
                  try {
                    h2 = (yield Promise.all(n4.map(((e3) => {
                      var t4;
                      return null === (t4 = e3.videoTrack) || void 0 === t4 ? void 0 : t4.setDeviceId(m2);
                    })))).every(((e3) => true === e3));
                  } catch (t4) {
                    throw i2.options.videoCaptureDefaults.deviceId = e2, t4;
                  }
                  const r3 = n4.some(((e3) => {
                    var t4, n5;
                    return null !== (n5 = null === (t4 = e3.track) || void 0 === t4 ? void 0 : t4.isMuted) && void 0 !== n5 && n5;
                  }));
                  h2 && r3 && (p2 = true);
                } else if ("audiooutput" === t3) {
                  if (p2 = true, !Ea() && !i2.options.webAudioMix || i2.options.webAudioMix && i2.audioContext && !("setSinkId" in i2.audioContext)) throw new Error("cannot switch audio output, the current browser does not support it");
                  i2.options.webAudioMix && (n3 = null !== (o2 = yield No.getInstance().normalizeDeviceId("audiooutput", n3)) && void 0 !== o2 ? o2 : ""), null !== (c2 = (u2 = i2.options).audioOutput) && void 0 !== c2 || (u2.audioOutput = {});
                  const e2 = null !== (d2 = i2.getActiveDevice(t3)) && void 0 !== d2 ? d2 : i2.options.audioOutput.deviceId;
                  i2.options.audioOutput.deviceId = n3;
                  try {
                    i2.options.webAudioMix && (null === (l2 = i2.audioContext) || void 0 === l2 || l2.setSinkId(n3)), yield Promise.all(Array.from(i2.remoteParticipants.values()).map(((e3) => e3.setAudioOutput({ deviceId: n3 }))));
                  } catch (t4) {
                    throw i2.options.audioOutput.deviceId = e2, t4;
                  }
                }
                return p2 && (i2.localParticipant.activeDeviceMap.set(t3, n3), i2.emit(e.RoomEvent.ActiveDeviceChanged, t3, n3)), h2;
              })();
            }));
          }
          setupLocalParticipantEvents() {
            this.localParticipant.on(e.ParticipantEvent.ParticipantMetadataChanged, this.onLocalParticipantMetadataChanged).on(e.ParticipantEvent.ParticipantNameChanged, this.onLocalParticipantNameChanged).on(e.ParticipantEvent.AttributesChanged, this.onLocalAttributesChanged).on(e.ParticipantEvent.TrackMuted, this.onLocalTrackMuted).on(e.ParticipantEvent.TrackUnmuted, this.onLocalTrackUnmuted).on(e.ParticipantEvent.LocalTrackPublished, this.onLocalTrackPublished).on(e.ParticipantEvent.LocalTrackUnpublished, this.onLocalTrackUnpublished).on(e.ParticipantEvent.ConnectionQualityChanged, this.onLocalConnectionQualityChanged).on(e.ParticipantEvent.MediaDevicesError, this.onMediaDevicesError).on(e.ParticipantEvent.AudioStreamAcquired, this.startAudio).on(e.ParticipantEvent.ChatMessage, this.onLocalChatMessageSent).on(e.ParticipantEvent.ParticipantPermissionsChanged, this.onLocalParticipantPermissionsChanged);
          }
          recreateEngine(e2) {
            const t2 = this.engine;
            e2 && t2 && !t2.client.isDisconnected ? t2.client.sendLeave().finally((() => t2.close())) : null == t2 || t2.close(), this.engine = void 0, this.isResuming = false, this.remoteParticipants.clear(), this.sidToIdentity.clear(), this.bufferedEvents = [], this.maybeCreateEngine();
          }
          onTrackAdded(t2, n2, i2) {
            if (this.state === e.ConnectionState.Connecting || this.state === e.ConnectionState.Reconnecting) {
              const r3 = () => {
                this.log.debug("deferring on track for later", { mediaTrackId: t2.id, mediaStreamId: n2.id, tracksInStream: n2.getTracks().map(((e2) => e2.id)) }), this.onTrackAdded(t2, n2, i2), s3();
              }, s3 = () => {
                this.off(e.RoomEvent.Reconnected, r3), this.off(e.RoomEvent.Connected, r3), this.off(e.RoomEvent.Disconnected, s3);
              };
              return this.once(e.RoomEvent.Reconnected, r3), this.once(e.RoomEvent.Connected, r3), void this.once(e.RoomEvent.Disconnected, s3);
            }
            if (this.state === e.ConnectionState.Disconnected) return void this.log.warn("skipping incoming track after Room disconnected");
            if ("ended" === t2.readyState) return void this.log.debug("skipping incoming track as it already ended");
            const r2 = (function(e2) {
              const t3 = e2.split("|");
              return t3.length > 1 ? [t3[0], e2.substr(t3[0].length + 1)] : [e2, ""];
            })(n2.id), s2 = r2[0];
            let a2 = r2[1], o2 = t2.id;
            if (a2 && a2.startsWith("TR") && (o2 = a2), s2 === this.localParticipant.sid) return void this.log.warn("tried to create RemoteParticipant for local participant");
            const c2 = Array.from(this.remoteParticipants.values()).find(((e2) => e2.sid === s2));
            if (!c2) return void (s2.startsWith("PA") && this.log.error("Tried to add a track for a participant, that's not present. Sid: ".concat(s2)));
            if (!o2.startsWith("TR")) {
              const e2 = this.engine.getTrackIdForReceiver(i2);
              if (!e2) return void this.log.error("Tried to add a track whose 'sid' could not be found for a participant, that's not present. Sid: ".concat(s2));
              o2 = e2;
            }
            let d2;
            o2.startsWith("TR") || this.log.warn("Tried to add a track whose 'sid' could not be determined for a participant, that's not present. Sid: ".concat(s2, ", streamId: ").concat(a2, ", trackId: ").concat(o2), { remoteParticipantID: s2, streamId: a2, trackId: o2 }), this.options.adaptiveStream && (d2 = "object" == typeof this.options.adaptiveStream ? this.options.adaptiveStream : {});
            const l2 = c2.addSubscribedMediaTrack(t2, o2, n2, i2, d2);
            (null == l2 ? void 0 : l2.isEncrypted) && !this.e2eeManager && this.emit(e.RoomEvent.EncryptionError, new Error("Encrypted ".concat(l2.source, " track received from participant ").concat(c2.sid, ", but room does not have encryption enabled!")));
          }
          handleLocalTrackSubscribed(t2) {
            const n2 = () => this.localParticipant.getTrackPublications().find(((e2) => {
              let { trackSid: n3 } = e2;
              return n3 === t2;
            })), i2 = n2();
            if (i2) return void this.emitLocalTrackSubscribed(i2);
            this.log.debug("deferring LocalTrackSubscribed, publication not yet available", { subscribedSid: t2 });
            let r2;
            const s2 = (e2) => {
              e2.trackSid === t2 && (a2(), this.emitLocalTrackSubscribed(e2));
            }, a2 = () => {
              clearTimeout(r2), this.localParticipant.off(e.ParticipantEvent.LocalTrackPublished, s2), this.off(e.RoomEvent.Disconnected, a2);
            };
            this.localParticipant.on(e.ParticipantEvent.LocalTrackPublished, s2), this.once(e.RoomEvent.Disconnected, a2), r2 = setTimeout((() => {
              a2();
              const e2 = n2();
              e2 ? this.emitLocalTrackSubscribed(e2) : this.log.warn("could not find local track publication for LocalTrackSubscribed event after timeout", { subscribedSid: t2 });
            }), 1e4);
          }
          emitLocalTrackSubscribed(t2) {
            this.localParticipant.emit(e.ParticipantEvent.LocalTrackSubscribed, t2), this.emitWhenConnected(e.RoomEvent.LocalTrackSubscribed, t2, this.localParticipant);
          }
          handleDisconnect() {
            let t2 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], n2 = arguments.length > 1 ? arguments[1] : void 0;
            var i2, r2;
            if (this.clearConnectionReconcile(), this.isResuming = false, this.bufferedEvents = [], this.transcriptionReceivedTimes.clear(), this.incomingDataStreamManager.clearControllers(), this.incomingDataTrackManager.reset(), this.outgoingDataTrackManager.reset(), this.state !== e.ConnectionState.Disconnected) {
              this.regionUrl = void 0, this.regionUrlProvider && this.regionUrlProvider.notifyDisconnected();
              try {
                this.remoteParticipants.forEach(((e2) => {
                  e2.trackPublications.forEach(((t3) => {
                    e2.unpublishTrack(t3.trackSid);
                  }));
                })), this.localParticipant.trackPublications.forEach(((e2) => {
                  var n3, i3, r3;
                  e2.track && this.localParticipant.unpublishTrack(e2.track, t2), t2 ? (null === (n3 = e2.track) || void 0 === n3 || n3.detach(), null === (i3 = e2.track) || void 0 === i3 || i3.stop()) : null === (r3 = e2.track) || void 0 === r3 || r3.stopMonitor();
                })), this.localParticipant.off(e.ParticipantEvent.ParticipantMetadataChanged, this.onLocalParticipantMetadataChanged).off(e.ParticipantEvent.ParticipantNameChanged, this.onLocalParticipantNameChanged).off(e.ParticipantEvent.AttributesChanged, this.onLocalAttributesChanged).off(e.ParticipantEvent.TrackMuted, this.onLocalTrackMuted).off(e.ParticipantEvent.TrackUnmuted, this.onLocalTrackUnmuted).off(e.ParticipantEvent.LocalTrackPublished, this.onLocalTrackPublished).off(e.ParticipantEvent.LocalTrackUnpublished, this.onLocalTrackUnpublished).off(e.ParticipantEvent.ConnectionQualityChanged, this.onLocalConnectionQualityChanged).off(e.ParticipantEvent.MediaDevicesError, this.onMediaDevicesError).off(e.ParticipantEvent.AudioStreamAcquired, this.startAudio).off(e.ParticipantEvent.ChatMessage, this.onLocalChatMessageSent).off(e.ParticipantEvent.ParticipantPermissionsChanged, this.onLocalParticipantPermissionsChanged), this.localParticipant.trackPublications.clear(), this.localParticipant.videoTrackPublications.clear(), this.localParticipant.audioTrackPublications.clear(), this.remoteParticipants.clear(), this.sidToIdentity.clear(), this.activeSpeakers = [], this.audioContext && "boolean" == typeof this.options.webAudioMix && (this.audioContext.close(), this.audioContext = void 0), Ma() && (window.removeEventListener("beforeunload", this.onPageLeave), window.removeEventListener("pagehide", this.onPageLeave), window.removeEventListener("freeze", this.onPageLeave), null === (r2 = null === (i2 = navigator.mediaDevices) || void 0 === i2 ? void 0 : i2.removeEventListener) || void 0 === r2 || r2.call(i2, "devicechange", this.handleDeviceChange));
              } finally {
                this.setAndEmitConnectionState(e.ConnectionState.Disconnected), this.emit(e.RoomEvent.Disconnected, n2);
              }
            }
          }
          handleParticipantDisconnected(t2, n2) {
            var i2;
            this.remoteParticipants.delete(t2), n2 && (this.incomingDataStreamManager.validateParticipantHasNoActiveDataStreams(t2), this.incomingDataTrackManager.handleRemoteParticipantDisconnected(t2), n2.trackPublications.forEach(((e2) => {
              n2.unpublishTrack(e2.trackSid, true);
            })), this.emit(e.RoomEvent.ParticipantDisconnected, n2), n2.setDisconnected(), null === (i2 = this.localParticipant) || void 0 === i2 || i2.handleParticipantDisconnected(n2.identity));
          }
          handleIncomingRpcRequest(e2, t2, n2, i2, r2, s2) {
            return Xi(this, void 0, void 0, (function* () {
              if (yield this.engine.publishRpcAck(e2, t2), 1 !== s2) return void (yield this.engine.publishRpcResponse(e2, t2, null, Mc.builtIn("UNSUPPORTED_VERSION")));
              const a2 = this.rpcHandlers.get(n2);
              if (!a2) return void (yield this.engine.publishRpcResponse(e2, t2, null, Mc.builtIn("UNSUPPORTED_METHOD")));
              let o2 = null, c2 = null;
              try {
                const s3 = yield a2({ requestId: t2, callerIdentity: e2, payload: i2, responseTimeout: r2 });
                Oc(s3) > 15360 ? (o2 = Mc.builtIn("RESPONSE_PAYLOAD_TOO_LARGE"), this.log.warn("RPC Response payload too large for ".concat(n2))) : c2 = s3;
              } catch (e3) {
                e3 instanceof Mc ? o2 = e3 : (this.log.warn("Uncaught error returned by RPC handler for ".concat(n2, ". Returning APPLICATION_ERROR instead."), e3), o2 = Mc.builtIn("APPLICATION_ERROR"));
              }
              yield this.engine.publishRpcResponse(e2, t2, c2, o2);
            }));
          }
          selectDefaultDevices() {
            return Xi(this, void 0, void 0, (function* () {
              var t2, n2, i2;
              const r2 = No.getInstance().previousDevices, s2 = yield No.getInstance().getDevices(void 0, false), a2 = vs();
              if ("Chrome" === (null == a2 ? void 0 : a2.name) && "iOS" !== a2.os) for (let t3 of s2) {
                const n3 = r2.find(((e2) => e2.deviceId === t3.deviceId));
                n3 && "" !== n3.label && n3.kind === t3.kind && n3.label !== t3.label && "default" === this.getActiveDevice(t3.kind) && this.emit(e.RoomEvent.ActiveDeviceChanged, t3.kind, t3.deviceId);
              }
              const o2 = ["audiooutput", "audioinput", "videoinput"];
              for (let e2 of o2) {
                const a3 = ia(e2), o3 = this.localParticipant.getTrackPublication(a3);
                if (o3 && (null === (t2 = o3.track) || void 0 === t2 ? void 0 : t2.isUserProvided)) continue;
                const c2 = s2.filter(((t3) => t3.kind === e2)), d2 = this.getActiveDevice(e2);
                d2 === (null === (n2 = r2.filter(((t3) => t3.kind === e2))[0]) || void 0 === n2 ? void 0 : n2.deviceId) && c2.length > 0 && (null === (i2 = c2[0]) || void 0 === i2 ? void 0 : i2.deviceId) !== d2 ? yield this.switchActiveDevice(e2, c2[0].deviceId) : "audioinput" === e2 && !Ia() || "videoinput" === e2 || !(c2.length > 0) || c2.find(((t3) => t3.deviceId === this.getActiveDevice(e2))) || "audiooutput" === e2 && Ia() || (yield this.switchActiveDevice(e2, c2[0].deviceId));
              }
            }));
          }
          acquireAudioContext() {
            return Xi(this, void 0, void 0, (function* () {
              var t2, n2;
              if ("boolean" != typeof this.options.webAudioMix && this.options.webAudioMix.audioContext ? this.audioContext = this.options.webAudioMix.audioContext : this.audioContext && "closed" !== this.audioContext.state || (this.audioContext = null !== (t2 = na()) && void 0 !== t2 ? t2 : void 0), this.options.webAudioMix && this.remoteParticipants.forEach(((e2) => e2.setAudioContext(this.audioContext))), this.localParticipant.setAudioContext(this.audioContext), this.audioContext && "suspended" === this.audioContext.state) try {
                yield Promise.race([this.audioContext.resume(), fa(200)]);
              } catch (e2) {
                this.log.warn("Could not resume audio context", { error: e2 });
              }
              const i2 = "running" === (null === (n2 = this.audioContext) || void 0 === n2 ? void 0 : n2.state);
              i2 !== this.canPlaybackAudio && (this.audioEnabled = i2, this.emit(e.RoomEvent.AudioPlaybackStatusChanged, i2));
            }));
          }
          createParticipant(e2, t2) {
            var n2;
            let i2;
            return i2 = t2 ? Dl.fromParticipantInfo(this.engine.client, t2, { loggerContextCb: () => this.logContext, loggerName: this.options.loggerName }, this.incomingDataTrackManager) : new Dl(this.engine.client, "", e2, void 0, void 0, void 0, { loggerContextCb: () => this.logContext, loggerName: this.options.loggerName }), this.options.webAudioMix && i2.setAudioContext(this.audioContext), (null === (n2 = this.options.audioOutput) || void 0 === n2 ? void 0 : n2.deviceId) && i2.setAudioOutput(this.options.audioOutput).catch(((e3) => this.log.warn("Could not set audio output: ".concat(e3.message)))), i2;
          }
          getOrCreateParticipant(t2, n2) {
            if (this.remoteParticipants.has(t2)) {
              const e2 = this.remoteParticipants.get(t2);
              if (n2) {
                e2.updateInfo(n2) && this.sidToIdentity.set(n2.sid, n2.identity);
              }
              return e2;
            }
            const i2 = this.createParticipant(t2, n2);
            return this.remoteParticipants.set(t2, i2), this.sidToIdentity.set(n2.sid, n2.identity), this.emitWhenConnected(e.RoomEvent.ParticipantConnected, i2), i2.on(e.ParticipantEvent.TrackPublished, ((t3) => {
              this.emitWhenConnected(e.RoomEvent.TrackPublished, t3, i2);
            })).on(e.ParticipantEvent.TrackSubscribed, ((t3, n3) => {
              t3.kind === pa.Kind.Audio ? (t3.on(e.TrackEvent.AudioPlaybackStarted, this.handleAudioPlaybackStarted), t3.on(e.TrackEvent.AudioPlaybackFailed, this.handleAudioPlaybackFailed)) : t3.kind === pa.Kind.Video && (t3.on(e.TrackEvent.VideoPlaybackFailed, this.handleVideoPlaybackFailed), t3.on(e.TrackEvent.VideoPlaybackStarted, this.handleVideoPlaybackStarted)), this.emitWhenConnected(e.RoomEvent.TrackSubscribed, t3, n3, i2);
            })).on(e.ParticipantEvent.TrackUnpublished, ((t3) => {
              this.emit(e.RoomEvent.TrackUnpublished, t3, i2);
            })).on(e.ParticipantEvent.TrackUnsubscribed, ((t3, n3) => {
              this.emit(e.RoomEvent.TrackUnsubscribed, t3, n3, i2);
            })).on(e.ParticipantEvent.TrackMuted, ((t3) => {
              this.emitWhenConnected(e.RoomEvent.TrackMuted, t3, i2);
            })).on(e.ParticipantEvent.TrackUnmuted, ((t3) => {
              this.emitWhenConnected(e.RoomEvent.TrackUnmuted, t3, i2);
            })).on(e.ParticipantEvent.ParticipantMetadataChanged, ((t3) => {
              this.emitWhenConnected(e.RoomEvent.ParticipantMetadataChanged, t3, i2);
            })).on(e.ParticipantEvent.ParticipantNameChanged, ((t3) => {
              this.emitWhenConnected(e.RoomEvent.ParticipantNameChanged, t3, i2);
            })).on(e.ParticipantEvent.AttributesChanged, ((t3) => {
              this.emitWhenConnected(e.RoomEvent.ParticipantAttributesChanged, t3, i2);
            })).on(e.ParticipantEvent.ConnectionQualityChanged, ((t3) => {
              this.emitWhenConnected(e.RoomEvent.ConnectionQualityChanged, t3, i2);
            })).on(e.ParticipantEvent.ParticipantPermissionsChanged, ((t3) => {
              this.emitWhenConnected(e.RoomEvent.ParticipantPermissionsChanged, t3, i2);
            })).on(e.ParticipantEvent.TrackSubscriptionStatusChanged, ((t3, n3) => {
              this.emitWhenConnected(e.RoomEvent.TrackSubscriptionStatusChanged, t3, n3, i2);
            })).on(e.ParticipantEvent.TrackSubscriptionFailed, ((t3, n3) => {
              this.emit(e.RoomEvent.TrackSubscriptionFailed, t3, i2, n3);
            })).on(e.ParticipantEvent.TrackSubscriptionPermissionChanged, ((t3, n3) => {
              this.emitWhenConnected(e.RoomEvent.TrackSubscriptionPermissionChanged, t3, n3, i2);
            })).on(e.ParticipantEvent.Active, (() => {
              this.emitWhenConnected(e.RoomEvent.ParticipantActive, i2), i2.kind === ht.AGENT && this.localParticipant.setActiveAgent(i2);
            })), n2 && i2.updateInfo(n2), i2;
          }
          sendSyncState() {
            const e2 = Array.from(this.remoteParticipants.values()).reduce(((e3, t3) => (e3.push(...t3.getTrackPublications()), e3)), []), t2 = this.localParticipant.getTrackPublications(), n2 = this.outgoingDataTrackManager.queryPublished();
            this.engine.sendSyncState(e2, t2, n2);
          }
          updateSubscriptions() {
            for (const e2 of this.remoteParticipants.values()) for (const t2 of e2.videoTrackPublications.values()) t2.isSubscribed && co(t2) && t2.emitTrackUpdate();
          }
          getRemoteParticipantBySid(e2) {
            const t2 = this.sidToIdentity.get(e2);
            if (t2) return this.remoteParticipants.get(t2);
          }
          registerConnectionReconcile() {
            this.clearConnectionReconcile();
            let e2 = 0;
            this.connectionReconcileInterval = js.setInterval((() => {
              this.engine && !this.engine.isClosed && this.engine.verifyTransport() ? e2 = 0 : (e2++, this.log.warn("detected connection state mismatch", { numFailures: e2, engine: this.engine ? { closed: this.engine.isClosed, transportsConnectedOrConnecting: this.engine.verifyTransport() } : void 0 }), e2 >= 3 && (this.recreateEngine(), this.handleDisconnect(this.options.stopLocalTrackOnUnpublish, nt.STATE_MISMATCH)));
            }), 4e3);
          }
          clearConnectionReconcile() {
            this.connectionReconcileInterval && js.clearInterval(this.connectionReconcileInterval);
          }
          setAndEmitConnectionState(t2) {
            return t2 !== this.state && (this.log.info("connection state changed: ".concat(this.state, " -> ").concat(t2)), this.state = t2, this.incomingDataStreamManager.setConnected(t2 === e.ConnectionState.Connected), this.emit(e.RoomEvent.ConnectionStateChanged, this.state), true);
          }
          emitBufferedEvents() {
            this.bufferedEvents.forEach(((e2) => {
              let [t2, n2] = e2;
              this.emit(t2, ...n2);
            })), this.bufferedEvents = [];
          }
          emitWhenConnected(t2) {
            for (var n2 = arguments.length, i2 = new Array(n2 > 1 ? n2 - 1 : 0), r2 = 1; r2 < n2; r2++) i2[r2 - 1] = arguments[r2];
            if (this.state === e.ConnectionState.Reconnecting || this.isResuming || !this.engine || this.engine.pendingReconnect) this.bufferedEvents.push([t2, i2]);
            else if (this.state === e.ConnectionState.Connected) return this.emit(t2, ...i2);
            return false;
          }
          simulateParticipants(t2) {
            return Xi(this, void 0, void 0, (function* () {
              var n2, i2, r2, s2;
              const a2 = Object.assign({ audio: true, video: true, useRealTracks: false }, t2.publish), o2 = Object.assign({ count: 9, audio: false, video: true, aspectRatios: [1.66, 1.7, 1.3] }, t2.participants);
              if (this.handleDisconnect(), this.roomInfo = new ot({ sid: "RM_SIMULATED", name: "simulated-room", emptyTimeout: 0, maxParticipants: 0, creationTime: M.parse((/* @__PURE__ */ new Date()).getTime()), metadata: "", numParticipants: 1, numPublishers: 1, turnPassword: "", enabledCodecs: [], activeRecording: false }), this.localParticipant.updateInfo(new lt({ identity: "simulated-local", name: "local-name" })), this.setupLocalParticipantEvents(), this.emit(e.RoomEvent.SignalConnected), this.emit(e.RoomEvent.Connected), this.setAndEmitConnectionState(e.ConnectionState.Connected), a2.video) {
                const t3 = new kl(pa.Kind.Video, new vt({ source: Ze.CAMERA, sid: Math.floor(1e4 * Math.random()).toString(), type: Xe.AUDIO, name: "video-dummy" }), new ed(a2.useRealTracks && (null === (n2 = window.navigator.mediaDevices) || void 0 === n2 ? void 0 : n2.getUserMedia) ? (yield window.navigator.mediaDevices.getUserMedia({ video: true })).getVideoTracks()[0] : Ja(160 * (null !== (i2 = o2.aspectRatios[0]) && void 0 !== i2 ? i2 : 1), 160, true, true), void 0, false, { loggerName: this.options.loggerName, loggerContextCb: () => this.logContext }), { loggerName: this.options.loggerName, loggerContextCb: () => this.logContext });
                this.localParticipant.addTrackPublication(t3), this.localParticipant.emit(e.ParticipantEvent.LocalTrackPublished, t3);
              }
              if (a2.audio) {
                const t3 = new kl(pa.Kind.Audio, new vt({ source: Ze.MICROPHONE, sid: Math.floor(1e4 * Math.random()).toString(), type: Xe.AUDIO }), new jc(a2.useRealTracks && (null === (r2 = navigator.mediaDevices) || void 0 === r2 ? void 0 : r2.getUserMedia) ? (yield navigator.mediaDevices.getUserMedia({ audio: true })).getAudioTracks()[0] : Ga(), void 0, false, this.audioContext, { loggerName: this.options.loggerName, loggerContextCb: () => this.logContext }), { loggerName: this.options.loggerName, loggerContextCb: () => this.logContext });
                this.localParticipant.addTrackPublication(t3), this.localParticipant.emit(e.ParticipantEvent.LocalTrackPublished, t3);
              }
              for (let e2 = 0; e2 < o2.count - 1; e2 += 1) {
                let t3 = new lt({ sid: Math.floor(1e4 * Math.random()).toString(), identity: "simulated-".concat(e2), state: ut.ACTIVE, tracks: [], joinedAt: M.parse(Date.now()) });
                const n3 = this.getOrCreateParticipant(t3.identity, t3);
                if (o2.video) {
                  const i3 = Ja(160 * (null !== (s2 = o2.aspectRatios[e2 % o2.aspectRatios.length]) && void 0 !== s2 ? s2 : 1), 160, false, true), r3 = new vt({ source: Ze.CAMERA, sid: Math.floor(1e4 * Math.random()).toString(), type: Xe.AUDIO });
                  n3.addSubscribedMediaTrack(i3, r3.sid, new MediaStream([i3]), new RTCRtpReceiver()), t3.tracks = [...t3.tracks, r3];
                }
                if (o2.audio) {
                  const e3 = Ga(), i3 = new vt({ source: Ze.MICROPHONE, sid: Math.floor(1e4 * Math.random()).toString(), type: Xe.AUDIO });
                  n3.addSubscribedMediaTrack(e3, i3.sid, new MediaStream([e3]), new RTCRtpReceiver()), t3.tracks = [...t3.tracks, i3];
                }
                n3.updateInfo(t3);
              }
            }));
          }
          emit(t2) {
            for (var n2 = arguments.length, i2 = new Array(n2 > 1 ? n2 - 1 : 0), r2 = 1; r2 < n2; r2++) i2[r2 - 1] = arguments[r2];
            if (t2 !== e.RoomEvent.ActiveSpeakersChanged && t2 !== e.RoomEvent.TranscriptionReceived) {
              const n3 = Ml(i2).filter(((e2) => void 0 !== e2));
              t2 !== e.RoomEvent.TrackSubscribed && t2 !== e.RoomEvent.TrackUnsubscribed || this.log.trace("subscribe trace: ".concat(t2), { event: t2, args: n3 }), this.log.debug("room event ".concat(t2), { event: t2, args: n3 });
            }
            return super.emit(t2, ...i2);
          }
        }
        function Ml(e2) {
          return e2.map(((e3) => {
            if (e3) return Array.isArray(e3) ? Ml(e3) : "object" == typeof e3 ? "logContext" in e3 ? e3.logContext : void 0 : e3;
          }));
        }
        _l.cleanupRegistry = "undefined" != typeof FinalizationRegistry && new FinalizationRegistry(((e2) => {
          e2();
        }));
        var Ol, Al = Object.freeze({ __proto__: null, Convert: class {
          static toAgentAttributes(e2) {
            return JSON.parse(e2);
          }
          static agentAttributesToJson(e2) {
            return JSON.stringify(e2);
          }
          static toTranscriptionAttributes(e2) {
            return JSON.parse(e2);
          }
          static transcriptionAttributesToJson(e2) {
            return JSON.stringify(e2);
          }
        } });
        e.CheckStatus = void 0, (Ol = e.CheckStatus || (e.CheckStatus = {}))[Ol.IDLE = 0] = "IDLE", Ol[Ol.RUNNING = 1] = "RUNNING", Ol[Ol.SKIPPED = 2] = "SKIPPED", Ol[Ol.SUCCESS = 3] = "SUCCESS", Ol[Ol.FAILED = 4] = "FAILED";
        class Nl extends rr.EventEmitter {
          constructor(t2, n2) {
            let i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            super(), this.status = e.CheckStatus.IDLE, this.logs = [], this.options = {}, this.url = t2, this.token = n2, this.name = this.constructor.name, this.room = new _l(i2.roomOptions), this.connectOptions = i2.connectOptions, this.options = i2;
          }
          run(t2) {
            return Xi(this, void 0, void 0, (function* () {
              if (this.status !== e.CheckStatus.IDLE) throw Error("check is running already");
              this.setStatus(e.CheckStatus.RUNNING);
              try {
                yield this.perform();
              } catch (e2) {
                e2 instanceof Error && (this.options.errorsAsWarnings ? this.appendWarning(e2.message) : this.appendError(e2.message));
              }
              return yield this.disconnect(), yield new Promise(((e2) => setTimeout(e2, 500))), this.status !== e.CheckStatus.SKIPPED && this.setStatus(this.isSuccess() ? e.CheckStatus.SUCCESS : e.CheckStatus.FAILED), t2 && t2(), this.getInfo();
            }));
          }
          isSuccess() {
            return !this.logs.some(((e2) => "error" === e2.level));
          }
          connect(t2) {
            return Xi(this, void 0, void 0, (function* () {
              return this.room.state === e.ConnectionState.Connected || (t2 || (t2 = this.url), yield this.room.connect(t2, this.token, this.connectOptions)), this.room;
            }));
          }
          disconnect() {
            return Xi(this, void 0, void 0, (function* () {
              this.room && this.room.state !== e.ConnectionState.Disconnected && (yield this.room.disconnect(), yield new Promise(((e2) => setTimeout(e2, 500))));
            }));
          }
          skip() {
            this.setStatus(e.CheckStatus.SKIPPED);
          }
          switchProtocol(t2) {
            return Xi(this, void 0, void 0, (function* () {
              let n2 = false, i2 = false;
              if (this.room.on(e.RoomEvent.Reconnecting, (() => {
                n2 = true;
              })), this.room.once(e.RoomEvent.Reconnected, (() => {
                i2 = true;
              })), this.room.simulateScenario("force-".concat(t2)), yield new Promise(((e2) => setTimeout(e2, 1e3))), !n2) return;
              const r2 = Date.now() + 1e4;
              for (; Date.now() < r2; ) {
                if (i2) return;
                yield fa(100);
              }
              throw new Error("Could not reconnect using ".concat(t2, " protocol after 10 seconds"));
            }));
          }
          appendMessage(e2) {
            this.logs.push({ level: "info", message: e2 }), this.emit("update", this.getInfo());
          }
          appendWarning(e2) {
            this.logs.push({ level: "warning", message: e2 }), this.emit("update", this.getInfo());
          }
          appendError(e2) {
            this.logs.push({ level: "error", message: e2 }), this.emit("update", this.getInfo());
          }
          setStatus(e2) {
            this.status = e2, this.emit("update", this.getInfo());
          }
          get engine() {
            var e2;
            return null === (e2 = this.room) || void 0 === e2 ? void 0 : e2.engine;
          }
          getInfo() {
            return { logs: this.logs, name: this.name, status: this.status, description: this.description };
          }
        }
        class Ll extends Nl {
          get description() {
            return "Cloud regions";
          }
          perform() {
            return Xi(this, void 0, void 0, (function* () {
              const e2 = new pd(this.url, this.token);
              if (!e2.isCloud()) return void this.skip();
              const t2 = [], n2 = /* @__PURE__ */ new Set();
              for (let i3 = 0; i3 < 3; i3++) {
                const i4 = yield e2.getNextBestRegionUrl();
                if (!i4) break;
                if (n2.has(i4)) continue;
                n2.add(i4);
                const r2 = yield this.checkCloudRegion(i4);
                this.appendMessage("".concat(r2.region, " RTT: ").concat(r2.rtt, "ms, duration: ").concat(r2.duration, "ms")), t2.push(r2);
              }
              t2.sort(((e3, t3) => 0.5 * (e3.duration - t3.duration) + 0.5 * (e3.rtt - t3.rtt)));
              const i2 = t2[0];
              this.bestStats = i2, this.appendMessage("best Cloud region: ".concat(i2.region));
            }));
          }
          getInfo() {
            const e2 = super.getInfo();
            return e2.data = this.bestStats, e2;
          }
          checkCloudRegion(e2) {
            return Xi(this, void 0, void 0, (function* () {
              var t2, n2;
              yield this.connect(e2), "tcp" === this.options.protocol && (yield this.switchProtocol("tcp"));
              const i2 = null === (t2 = this.room.serverInfo) || void 0 === t2 ? void 0 : t2.region;
              if (!i2) throw new Error("Region not found");
              const r2 = yield this.room.localParticipant.streamText({ topic: "test" }), s2 = "A".repeat(1e3), a2 = Date.now();
              for (let e3 = 0; e3 < 1e3; e3++) yield r2.write(s2);
              yield r2.close();
              const o2 = Date.now(), c2 = yield null === (n2 = this.room.engine.pcManager) || void 0 === n2 ? void 0 : n2.publisher.getStats(), d2 = { region: i2, rtt: 1e4, duration: o2 - a2 };
              return null == c2 || c2.forEach(((e3) => {
                "candidate-pair" === e3.type && e3.nominated && (d2.rtt = 1e3 * e3.currentRoundTripTime);
              })), yield this.disconnect(), d2;
            }));
          }
        }
        const xl = 1e4;
        class Ul extends Nl {
          get description() {
            return "Connection via UDP vs TCP";
          }
          perform() {
            return Xi(this, void 0, void 0, (function* () {
              const e2 = yield this.checkConnectionProtocol("udp"), t2 = yield this.checkConnectionProtocol("tcp");
              this.bestStats = e2, e2.qualityLimitationDurations.bandwidth - t2.qualityLimitationDurations.bandwidth > 0.5 || (e2.packetsLost - t2.packetsLost) / e2.packetsSent > 0.01 ? (this.appendMessage("best connection quality via tcp"), this.bestStats = t2) : this.appendMessage("best connection quality via udp");
              const n2 = this.bestStats;
              this.appendMessage("upstream bitrate: ".concat((n2.bitrateTotal / n2.count / 1e3 / 1e3).toFixed(2), " mbps")), this.appendMessage("RTT: ".concat((n2.rttTotal / n2.count * 1e3).toFixed(2), " ms")), this.appendMessage("jitter: ".concat((n2.jitterTotal / n2.count * 1e3).toFixed(2), " ms")), n2.packetsLost > 0 && this.appendWarning("packets lost: ".concat((n2.packetsLost / n2.packetsSent * 100).toFixed(2), "%")), n2.qualityLimitationDurations.bandwidth > 1 && this.appendWarning("bandwidth limited ".concat((n2.qualityLimitationDurations.bandwidth / 10 * 100).toFixed(2), "%")), n2.qualityLimitationDurations.cpu > 0 && this.appendWarning("cpu limited ".concat((n2.qualityLimitationDurations.cpu / 10 * 100).toFixed(2), "%"));
            }));
          }
          getInfo() {
            const e2 = super.getInfo();
            return e2.data = this.bestStats, e2;
          }
          checkConnectionProtocol(e2) {
            return Xi(this, void 0, void 0, (function* () {
              yield this.connect(), "tcp" === e2 ? yield this.switchProtocol("tcp") : yield this.switchProtocol("udp");
              const t2 = document.createElement("canvas");
              t2.width = 1280, t2.height = 720;
              const n2 = t2.getContext("2d");
              if (!n2) throw new Error("Could not get canvas context");
              let i2 = 0;
              const r2 = () => {
                i2 = (i2 + 1) % 360, n2.fillStyle = "hsl(".concat(i2, ", 100%, 50%)"), n2.fillRect(0, 0, t2.width, t2.height), requestAnimationFrame(r2);
              };
              r2();
              const s2 = t2.captureStream(30).getVideoTracks()[0], a2 = (yield this.room.localParticipant.publishTrack(s2, { simulcast: false, degradationPreference: "maintain-resolution", videoEncoding: { maxBitrate: 2e6 } })).track, o2 = { protocol: e2, packetsLost: 0, packetsSent: 0, qualityLimitationDurations: {}, rttTotal: 0, jitterTotal: 0, bitrateTotal: 0, count: 0 }, c2 = setInterval((() => Xi(this, void 0, void 0, (function* () {
                const e3 = yield a2.getRTCStatsReport();
                null == e3 || e3.forEach(((e4) => {
                  "outbound-rtp" === e4.type ? (o2.packetsSent = e4.packetsSent, o2.qualityLimitationDurations = e4.qualityLimitationDurations, o2.bitrateTotal += e4.targetBitrate, o2.count++) : "remote-inbound-rtp" === e4.type && (o2.packetsLost = e4.packetsLost, o2.rttTotal += e4.roundTripTime, o2.jitterTotal += e4.jitter);
                }));
              }))), 1e3);
              return yield new Promise(((e3) => setTimeout(e3, xl))), clearInterval(c2), s2.stop(), t2.remove(), yield this.disconnect(), o2;
            }));
          }
        }
        class Fl extends Nl {
          get description() {
            return "Can publish audio";
          }
          perform() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              const t2 = yield this.connect(), n2 = yield Tl();
              if (yield ta(n2, 1e3)) throw new Error("unable to detect audio from microphone");
              this.appendMessage("detected audio from microphone"), t2.localParticipant.publishTrack(n2), yield new Promise(((e3) => setTimeout(e3, 3e3)));
              const i2 = yield null === (e2 = n2.sender) || void 0 === e2 ? void 0 : e2.getStats();
              if (!i2) throw new Error("Could not get RTCStats");
              let r2 = 0;
              if (i2.forEach(((e3) => {
                "outbound-rtp" !== e3.type || "audio" !== e3.kind && (e3.kind || "audio" !== e3.mediaType) || (r2 = e3.packetsSent);
              })), 0 === r2) throw new Error("Could not determine packets are sent");
              this.appendMessage("published ".concat(r2, " audio packets"));
            }));
          }
        }
        class Bl extends Nl {
          get description() {
            return "Can publish video";
          }
          perform() {
            return Xi(this, void 0, void 0, (function* () {
              var e2;
              const t2 = yield this.connect(), n2 = yield bl();
              yield this.checkForVideo(n2.mediaStreamTrack), t2.localParticipant.publishTrack(n2), yield new Promise(((e3) => setTimeout(e3, 5e3)));
              const i2 = yield null === (e2 = n2.sender) || void 0 === e2 ? void 0 : e2.getStats();
              if (!i2) throw new Error("Could not get RTCStats");
              let r2 = 0;
              if (i2.forEach(((e3) => {
                "outbound-rtp" !== e3.type || "video" !== e3.kind && (e3.kind || "video" !== e3.mediaType) || (r2 += e3.packetsSent);
              })), 0 === r2) throw new Error("Could not determine packets are sent");
              this.appendMessage("published ".concat(r2, " video packets"));
            }));
          }
          checkForVideo(e2) {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = new MediaStream();
              t2.addTrack(e2.clone());
              const n2 = document.createElement("video");
              n2.srcObject = t2, n2.muted = true, n2.autoplay = true, n2.playsInline = true, n2.setAttribute("playsinline", "true"), document.body.appendChild(n2), yield new Promise(((t3) => {
                n2.onplay = () => {
                  setTimeout((() => {
                    var i2, r2, s2, a2;
                    const o2 = document.createElement("canvas"), c2 = e2.getSettings(), d2 = null !== (r2 = null !== (i2 = c2.width) && void 0 !== i2 ? i2 : n2.videoWidth) && void 0 !== r2 ? r2 : 1280, l2 = null !== (a2 = null !== (s2 = c2.height) && void 0 !== s2 ? s2 : n2.videoHeight) && void 0 !== a2 ? a2 : 720;
                    o2.width = d2, o2.height = l2;
                    const u2 = o2.getContext("2d");
                    u2.drawImage(n2, 0, 0);
                    const h2 = u2.getImageData(0, 0, o2.width, o2.height).data;
                    let p2 = true;
                    for (let e3 = 0; e3 < h2.length; e3 += 4) if (0 !== h2[e3] || 0 !== h2[e3 + 1] || 0 !== h2[e3 + 2]) {
                      p2 = false;
                      break;
                    }
                    p2 ? this.appendError("camera appears to be producing only black frames") : this.appendMessage("received video frames"), t3();
                  }), 1e3);
                }, n2.play();
              })), t2.getTracks().forEach(((e3) => e3.stop())), n2.remove();
            }));
          }
        }
        class jl extends Nl {
          get description() {
            return "Resuming connection after interruption";
          }
          perform() {
            return Xi(this, void 0, void 0, (function* () {
              var t2;
              const n2 = yield this.connect();
              let i2, r2 = false, s2 = false;
              const a2 = new Promise(((e2) => {
                setTimeout(e2, 5e3), i2 = e2;
              })), o2 = () => {
                r2 = true;
              };
              n2.on(e.RoomEvent.SignalReconnecting, o2).on(e.RoomEvent.Reconnecting, o2).on(e.RoomEvent.Reconnected, (() => {
                s2 = true, i2(true);
              })), null === (t2 = n2.engine.client.ws) || void 0 === t2 || t2.close();
              const c2 = n2.engine.client.onClose;
              if (c2 && c2(""), yield a2, !r2) throw new Error("Did not attempt to reconnect");
              if (!s2 || n2.state !== e.ConnectionState.Connected) throw this.appendWarning("reconnection is only possible in Redis-based configurations"), new Error("Not able to reconnect");
            }));
          }
        }
        class ql extends Nl {
          get description() {
            return "Can connect via TURN";
          }
          perform() {
            return Xi(this, void 0, void 0, (function* () {
              var e2, t2, n2;
              Aa(new URL(this.url)) && (this.appendMessage("Using region specific url"), this.url = null !== (e2 = yield new pd(this.url, this.token).getNextBestRegionUrl()) && void 0 !== e2 ? e2 : this.url);
              const i2 = new Xo(), r2 = yield i2.join(this.url, this.token, { autoSubscribe: true, maxRetries: 0, e2eeEnabled: false, websocketTimeout: 15e3 }, void 0, true);
              let s2 = false, a2 = false, o2 = false;
              for (let e3 of r2.iceServers) for (let t3 of e3.urls) t3.startsWith("turn:") ? (a2 = true, o2 = true) : t3.startsWith("turns:") && (a2 = true, o2 = true, s2 = true), t3.startsWith("stun:") && (o2 = true);
              o2 ? a2 && !s2 && this.appendWarning("TURN is configured server side, but TURN/TLS is unavailable.") : this.appendWarning("No STUN servers configured on server side."), yield i2.close(), (null === (n2 = null === (t2 = this.connectOptions) || void 0 === t2 ? void 0 : t2.rtcConfig) || void 0 === n2 ? void 0 : n2.iceServers) || a2 ? yield this.room.connect(this.url, this.token, { rtcConfig: { iceTransportPolicy: "relay" } }) : (this.appendWarning("No TURN servers configured."), this.skip(), yield new Promise(((e3) => setTimeout(e3, 0))));
            }));
          }
        }
        class Vl extends Nl {
          get description() {
            return "Establishing WebRTC connection";
          }
          perform() {
            return Xi(this, void 0, void 0, (function* () {
              let t2 = false, n2 = false;
              this.room.on(e.RoomEvent.SignalConnected, (() => {
                var e2;
                const i2 = this.room.engine.client.onTrickle;
                this.room.engine.client.onTrickle = (e3, r2) => {
                  if (e3.candidate) {
                    const i3 = new RTCIceCandidate(e3);
                    let r3 = "".concat(i3.protocol, " ").concat(i3.address, ":").concat(i3.port, " ").concat(i3.type);
                    i3.address && (!(function(e4) {
                      const t3 = e4.split(".");
                      if (4 === t3.length) {
                        if ("10" === t3[0]) return true;
                        if ("192" === t3[0] && "168" === t3[1]) return true;
                        if ("172" === t3[0]) {
                          const e5 = parseInt(t3[1], 10);
                          if (e5 >= 16 && e5 <= 31) return true;
                        }
                      }
                      return false;
                    })(i3.address) ? "tcp" === i3.protocol && "passive" === i3.tcpType ? (t2 = true, r3 += " (passive)") : "udp" === i3.protocol && (n2 = true) : r3 += " (private)"), this.appendMessage(r3);
                  }
                  i2 && i2(e3, r2);
                }, (null === (e2 = this.room.engine.pcManager) || void 0 === e2 ? void 0 : e2.subscriber) && (this.room.engine.pcManager.subscriber.onIceCandidateError = (e3) => {
                  e3 instanceof RTCPeerConnectionIceErrorEvent && this.appendWarning("error with ICE candidate: ".concat(e3.errorCode, " ").concat(e3.errorText, " ").concat(e3.url));
                });
              }));
              try {
                yield this.connect(), Hi.info("now the room is connected");
              } catch (e2) {
                throw this.appendWarning("ports need to be open on firewall in order to connect."), e2;
              }
              t2 || this.appendWarning("Server is not configured for ICE/TCP"), n2 || this.appendWarning("No public IPv4 UDP candidates were found. Your server is likely not configured correctly");
            }));
          }
        }
        class Hl extends Nl {
          get description() {
            return "Connecting to signal connection via WebSocket";
          }
          perform() {
            return Xi(this, void 0, void 0, (function* () {
              var e2, t2, n2;
              (this.url.startsWith("ws:") || this.url.startsWith("http:")) && this.appendWarning("Server is insecure, clients may block connections to it");
              let i2, r2 = new Xo();
              try {
                i2 = yield r2.join(this.url, this.token, { autoSubscribe: true, maxRetries: 0, e2eeEnabled: false, websocketTimeout: 15e3 }, void 0, true);
              } catch (e3) {
                if (Aa(new URL(this.url))) {
                  this.appendMessage("Initial connection failed with error ".concat(e3.message, ". Retrying with region fallback"));
                  const t3 = new pd(this.url, this.token), n3 = yield t3.getNextBestRegionUrl();
                  n3 && (i2 = yield r2.join(n3, this.token, { autoSubscribe: true, maxRetries: 0, e2eeEnabled: false, websocketTimeout: 15e3 }, void 0, true), this.appendMessage("Fallback to region worked. To avoid initial connections failing, ensure you're calling room.prepareConnection() ahead of time"));
                }
              }
              i2 ? (this.appendMessage("Connected to server, version ".concat(i2.serverVersion, ".")), (null === (e2 = i2.serverInfo) || void 0 === e2 ? void 0 : e2.edition) === Ft.Cloud && (null === (t2 = i2.serverInfo) || void 0 === t2 ? void 0 : t2.region) && this.appendMessage("LiveKit Cloud: ".concat(null === (n2 = i2.serverInfo) || void 0 === n2 ? void 0 : n2.region))) : this.appendError("Websocket connection could not be established"), yield r2.close();
            }));
          }
        }
        class Wl extends rr.EventEmitter {
          constructor(e2, t2) {
            let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            super(), this.options = {}, this.checkResults = /* @__PURE__ */ new Map(), this.url = e2, this.token = t2, this.options = n2;
          }
          getNextCheckId() {
            const t2 = this.checkResults.size;
            return this.checkResults.set(t2, { logs: [], status: e.CheckStatus.IDLE, name: "", description: "" }), t2;
          }
          updateCheck(e2, t2) {
            this.checkResults.set(e2, t2), this.emit("checkUpdate", e2, t2);
          }
          isSuccess() {
            return Array.from(this.checkResults.values()).every(((t2) => t2.status !== e.CheckStatus.FAILED));
          }
          getResults() {
            return Array.from(this.checkResults.values());
          }
          createAndRunCheck(e2) {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = this.getNextCheckId(), n2 = new e2(this.url, this.token, this.options), i2 = (e3) => {
                this.updateCheck(t2, e3);
              };
              n2.on("update", i2);
              const r2 = yield n2.run();
              return n2.off("update", i2), r2;
            }));
          }
          checkWebsocket() {
            return Xi(this, void 0, void 0, (function* () {
              return this.createAndRunCheck(Hl);
            }));
          }
          checkWebRTC() {
            return Xi(this, void 0, void 0, (function* () {
              return this.createAndRunCheck(Vl);
            }));
          }
          checkTURN() {
            return Xi(this, void 0, void 0, (function* () {
              return this.createAndRunCheck(ql);
            }));
          }
          checkReconnect() {
            return Xi(this, void 0, void 0, (function* () {
              return this.createAndRunCheck(jl);
            }));
          }
          checkPublishAudio() {
            return Xi(this, void 0, void 0, (function* () {
              return this.createAndRunCheck(Fl);
            }));
          }
          checkPublishVideo() {
            return Xi(this, void 0, void 0, (function* () {
              return this.createAndRunCheck(Bl);
            }));
          }
          checkConnectionProtocol() {
            return Xi(this, void 0, void 0, (function* () {
              const e2 = yield this.createAndRunCheck(Ul);
              if (e2.data && "protocol" in e2.data) {
                const t2 = e2.data;
                this.options.protocol = t2.protocol;
              }
              return e2;
            }));
          }
          checkCloudRegion() {
            return Xi(this, void 0, void 0, (function* () {
              return this.createAndRunCheck(Ll);
            }));
          }
        }
        class Kl {
        }
        class zl {
        }
        function Jl(e2, t2, n2) {
          return (t2 = (function(e3) {
            var t3 = (function(e4, t4) {
              if ("object" != typeof e4 || !e4) return e4;
              var n3 = e4[Symbol.toPrimitive];
              if (void 0 !== n3) {
                var i2 = n3.call(e4, t4);
                if ("object" != typeof i2) return i2;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === t4 ? String : Number)(e4);
            })(e3, "string");
            return "symbol" == typeof t3 ? t3 : t3 + "";
          })(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
        }
        new TextEncoder();
        const Gl = new TextDecoder();
        function Ql(e2) {
          if (Uint8Array.fromBase64) return Uint8Array.fromBase64("string" == typeof e2 ? e2 : Gl.decode(e2), { alphabet: "base64url" });
          let t2 = e2;
          t2 instanceof Uint8Array && (t2 = Gl.decode(t2)), t2 = t2.replace(/-/g, "+").replace(/_/g, "/");
          try {
            return (function(e3) {
              if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e3);
              const t3 = atob(e3), n2 = new Uint8Array(t3.length);
              for (let e4 = 0; e4 < t3.length; e4++) n2[e4] = t3.charCodeAt(e4);
              return n2;
            })(t2);
          } catch (e3) {
            throw new TypeError("The input to be decoded is not correctly encoded.");
          }
        }
        class Yl extends Error {
          constructor(e2, t2) {
            var n2;
            super(e2, t2), Jl(this, "code", "ERR_JOSE_GENERIC"), this.name = this.constructor.name, null === (n2 = Error.captureStackTrace) || void 0 === n2 || n2.call(Error, this, this.constructor);
          }
        }
        Jl(Yl, "code", "ERR_JOSE_GENERIC");
        Jl(class extends Yl {
          constructor(e2, t2) {
            let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "unspecified", i2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "unspecified";
            super(e2, { cause: { claim: n2, reason: i2, payload: t2 } }), Jl(this, "code", "ERR_JWT_CLAIM_VALIDATION_FAILED"), Jl(this, "claim", void 0), Jl(this, "reason", void 0), Jl(this, "payload", void 0), this.claim = n2, this.reason = i2, this.payload = t2;
          }
        }, "code", "ERR_JWT_CLAIM_VALIDATION_FAILED");
        Jl(class extends Yl {
          constructor(e2, t2) {
            let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "unspecified", i2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "unspecified";
            super(e2, { cause: { claim: n2, reason: i2, payload: t2 } }), Jl(this, "code", "ERR_JWT_EXPIRED"), Jl(this, "claim", void 0), Jl(this, "reason", void 0), Jl(this, "payload", void 0), this.claim = n2, this.reason = i2, this.payload = t2;
          }
        }, "code", "ERR_JWT_EXPIRED");
        Jl(class extends Yl {
          constructor() {
            super(...arguments), Jl(this, "code", "ERR_JOSE_ALG_NOT_ALLOWED");
          }
        }, "code", "ERR_JOSE_ALG_NOT_ALLOWED");
        Jl(class extends Yl {
          constructor() {
            super(...arguments), Jl(this, "code", "ERR_JOSE_NOT_SUPPORTED");
          }
        }, "code", "ERR_JOSE_NOT_SUPPORTED");
        Jl(class extends Yl {
          constructor() {
            super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "decryption operation failed", arguments.length > 1 ? arguments[1] : void 0), Jl(this, "code", "ERR_JWE_DECRYPTION_FAILED");
          }
        }, "code", "ERR_JWE_DECRYPTION_FAILED");
        Jl(class extends Yl {
          constructor() {
            super(...arguments), Jl(this, "code", "ERR_JWE_INVALID");
          }
        }, "code", "ERR_JWE_INVALID");
        Jl(class extends Yl {
          constructor() {
            super(...arguments), Jl(this, "code", "ERR_JWS_INVALID");
          }
        }, "code", "ERR_JWS_INVALID");
        class Xl extends Yl {
          constructor() {
            super(...arguments), Jl(this, "code", "ERR_JWT_INVALID");
          }
        }
        Jl(Xl, "code", "ERR_JWT_INVALID");
        Jl(class extends Yl {
          constructor() {
            super(...arguments), Jl(this, "code", "ERR_JWK_INVALID");
          }
        }, "code", "ERR_JWK_INVALID");
        Jl(class extends Yl {
          constructor() {
            super(...arguments), Jl(this, "code", "ERR_JWKS_INVALID");
          }
        }, "code", "ERR_JWKS_INVALID");
        Jl(class extends Yl {
          constructor() {
            super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "no applicable key found in the JSON Web Key Set", arguments.length > 1 ? arguments[1] : void 0), Jl(this, "code", "ERR_JWKS_NO_MATCHING_KEY");
          }
        }, "code", "ERR_JWKS_NO_MATCHING_KEY");
        Jl(class extends Yl {
          constructor() {
            super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "multiple matching keys found in the JSON Web Key Set", arguments.length > 1 ? arguments[1] : void 0), Jl(this, Symbol.asyncIterator, void 0), Jl(this, "code", "ERR_JWKS_MULTIPLE_MATCHING_KEYS");
          }
        }, "code", "ERR_JWKS_MULTIPLE_MATCHING_KEYS");
        Jl(class extends Yl {
          constructor() {
            super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "request timed out", arguments.length > 1 ? arguments[1] : void 0), Jl(this, "code", "ERR_JWKS_TIMEOUT");
          }
        }, "code", "ERR_JWKS_TIMEOUT");
        Jl(class extends Yl {
          constructor() {
            super(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "signature verification failed", arguments.length > 1 ? arguments[1] : void 0), Jl(this, "code", "ERR_JWS_SIGNATURE_VERIFICATION_FAILED");
          }
        }, "code", "ERR_JWS_SIGNATURE_VERIFICATION_FAILED");
        const Zl = (e2) => "object" == typeof e2 && null !== e2;
        function $l(e2) {
          if ("string" != typeof e2) throw new Xl("JWTs must use Compact JWS serialization, JWT must be a string");
          const { 1: t2, length: n2 } = e2.split(".");
          if (5 === n2) throw new Xl("Only JWTs using Compact JWS serialization can be decoded");
          if (3 !== n2) throw new Xl("Invalid JWT");
          if (!t2) throw new Xl("JWTs must contain a payload");
          let i2, r2;
          try {
            i2 = Ql(t2);
          } catch (e3) {
            throw new Xl("Failed to base64url decode the payload");
          }
          try {
            r2 = JSON.parse(Gl.decode(i2));
          } catch (e3) {
            throw new Xl("Failed to parse the decoded payload as JSON");
          }
          if (!(function(e3) {
            if (!Zl(e3) || "[object Object]" !== Object.prototype.toString.call(e3)) return false;
            if (null === Object.getPrototypeOf(e3)) return true;
            let t3 = e3;
            for (; null !== Object.getPrototypeOf(t3); ) t3 = Object.getPrototypeOf(t3);
            return Object.getPrototypeOf(e3) === t3;
          })(r2)) throw new Xl("Invalid JWT Claims Set");
          return r2;
        }
        const eu = 1e3;
        function tu(e2) {
          const t2 = $l(e2), { roomConfig: n2 } = t2, i2 = Yi(t2, ["roomConfig"]);
          return Object.assign(Object.assign({}, i2), { roomConfig: t2.roomConfig ? Ai.fromJson(t2.roomConfig, { ignoreUnknownFields: true }) : void 0 });
        }
        class nu extends zl {
          constructor() {
            super(...arguments), this.cachedFetchOptions = null, this.cachedResponse = null, this.fetchMutex = new r();
          }
          isSameAsCachedFetchOptions(e2) {
            if (!this.cachedFetchOptions) return false;
            for (const t2 of Object.keys(this.cachedFetchOptions)) switch (t2) {
              case "roomName":
              case "participantName":
              case "participantIdentity":
              case "participantMetadata":
              case "participantAttributes":
              case "agentName":
              case "agentMetadata":
                if (this.cachedFetchOptions[t2] !== e2[t2]) return false;
                break;
              default:
                throw new Error("Options key ".concat(t2, " not being checked for equality!"));
            }
            return true;
          }
          shouldReturnCachedValueFromFetch(e2) {
            return !!this.cachedResponse && (!!(function(e3) {
              const t2 = tu(e3.participantToken);
              if (!(null == t2 ? void 0 : t2.nbf) || !(null == t2 ? void 0 : t2.exp)) return true;
              const n2 = /* @__PURE__ */ new Date(), i2 = t2.nbf * eu, r2 = new Date(i2), s2 = t2.exp * eu, a2 = new Date(s2 - 6e4);
              return r2 <= n2 && a2 > n2;
            })(this.cachedResponse) && !!this.isSameAsCachedFetchOptions(e2));
          }
          getCachedResponseJwtPayload() {
            return this.cachedResponse ? tu(this.cachedResponse.participantToken) : null;
          }
          fetch(e2, t2) {
            return Xi(this, void 0, void 0, (function* () {
              const n2 = yield this.fetchMutex.lock();
              try {
                if (t2 && (this.cachedResponse = null), this.shouldReturnCachedValueFromFetch(e2)) return this.cachedResponse.toJson();
                this.cachedFetchOptions = e2;
                const n3 = yield this.update(e2);
                return this.cachedResponse = n3, n3.toJson();
              } finally {
                n2();
              }
            }));
          }
        }
        class iu extends Kl {
          constructor(e2) {
            super(), this.literalOrFn = e2;
          }
          fetch() {
            return Xi(this, void 0, void 0, (function* () {
              return "function" == typeof this.literalOrFn ? this.literalOrFn() : this.literalOrFn;
            }));
          }
        }
        class ru extends nu {
          constructor(e2) {
            super(), this.customFn = e2;
          }
          update(e2) {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = this.customFn(e2);
              let n2;
              return n2 = t2 instanceof Promise ? yield t2 : t2, Li.fromJson(n2, { ignoreUnknownFields: true });
            }));
          }
        }
        class su extends nu {
          constructor(e2) {
            let t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            super(), this.url = e2, this.endpointOptions = t2;
          }
          createRequestFromOptions(e2) {
            var t2, n2, i2;
            const r2 = new Ni();
            for (const s2 of Object.keys(e2)) switch (s2) {
              case "roomName":
              case "participantName":
              case "participantIdentity":
              case "participantMetadata":
                r2[s2] = e2[s2];
                break;
              case "participantAttributes":
                r2.participantAttributes = null !== (t2 = e2.participantAttributes) && void 0 !== t2 ? t2 : {};
                break;
              case "agentName":
                r2.roomConfig = null !== (n2 = r2.roomConfig) && void 0 !== n2 ? n2 : new Ai(), 0 === r2.roomConfig.agents.length && r2.roomConfig.agents.push(new tn()), r2.roomConfig.agents[0].agentName = e2.agentName;
                break;
              case "agentMetadata":
                r2.roomConfig = null !== (i2 = r2.roomConfig) && void 0 !== i2 ? i2 : new Ai(), 0 === r2.roomConfig.agents.length && r2.roomConfig.agents.push(new tn()), r2.roomConfig.agents[0].metadata = e2.agentMetadata;
                break;
              default:
                throw new Error("Options key ".concat(s2, " not being included in forming request!"));
            }
            return r2;
          }
          update(e2) {
            return Xi(this, void 0, void 0, (function* () {
              var t2;
              const n2 = this.createRequestFromOptions(e2), i2 = yield fetch(this.url, Object.assign(Object.assign({}, this.endpointOptions), { method: null !== (t2 = this.endpointOptions.method) && void 0 !== t2 ? t2 : "POST", headers: Object.assign({ "Content-Type": "application/json" }, this.endpointOptions.headers), body: n2.toJsonString({ useProtoFieldName: true }) }));
              if (!i2.ok) throw new Error("Error generating token from endpoint ".concat(this.url, ": received ").concat(i2.status, " / ").concat(yield i2.text()));
              const r2 = yield i2.json();
              return Li.fromJson(r2, { ignoreUnknownFields: true });
            }));
          }
        }
        class au extends su {
          constructor(e2, t2) {
            const { baseUrl: n2 = "https://cloud-api.livekit.io" } = t2, i2 = Yi(t2, ["baseUrl"]);
            super("".concat(n2, "/api/v2/sandbox/connection-details"), Object.assign(Object.assign({}, i2), { headers: { "X-Sandbox-ID": e2 } }));
          }
        }
        const ou = { literal: (e2) => new iu(e2), custom: (e2) => new ru(e2), endpoint(e2) {
          return new su(e2, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {});
        }, sandboxTokenServer(e2) {
          return new au(e2, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {});
        } };
        const cu = /* @__PURE__ */ new Map([["obs virtual camera", { facingMode: "environment", confidence: "medium" }]]), du = /* @__PURE__ */ new Map([["iphone", { facingMode: "environment", confidence: "medium" }], ["ipad", { facingMode: "environment", confidence: "medium" }]]);
        function lu(e2) {
          var t2;
          const n2 = e2.trim().toLowerCase();
          if ("" !== n2) return cu.has(n2) ? cu.get(n2) : null === (t2 = Array.from(du.entries()).find(((e3) => {
            let [t3] = e3;
            return n2.includes(t3);
          }))) || void 0 === t2 ? void 0 : t2[1];
        }
        const uu = /* @__PURE__ */ Symbol.for("lk.serializer");
        function hu(e2) {
          return Object.assign(Object.assign({}, e2), { symbol: uu });
        }
        const pu = { json: function() {
          return hu({ parse: (e2) => JSON.parse(e2), serialize: (e2) => JSON.stringify(e2) });
        }, raw: function() {
          return hu({ parse: (e2) => e2, serialize: (e2) => e2 });
        }, custom: function(e2) {
          return hu(e2);
        } };
        e.BaseKeyProvider = Do, e.Checker = Nl, e.ConnectionCheck = Wl, e.ConnectionError = _s, e.CriticalTimers = js, e.CryptorError = class extends Ts {
          constructor(t2) {
            let n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.CryptorErrorReason.InternalError, i2 = arguments.length > 2 ? arguments[2] : void 0;
            super(40, t2), this.reason = n2, this.participantIdentity = i2;
          }
        }, e.DataPacket_Kind = St, e.DataStreamError = Fs, e.DataTrackPacket = jd, e.DefaultReconnectPolicy = Qi, e.DeviceUnsupportedError = Ms, e.DisconnectReason = nt, e.Encryption_Type = mt, e.ExternalE2EEKeyProvider = class extends Do {
          constructor() {
            let e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            super(Object.assign(Object.assign({}, e2), { sharedKey: true, ratchetWindowSize: 0, failureTolerance: -1 }));
          }
          setKey(e2) {
            return Xi(this, void 0, void 0, (function* () {
              const t2 = "string" == typeof e2 ? yield wo(e2) : yield Ro(e2);
              this.onSetEncryptionKey(t2);
            }));
          }
        }, e.LivekitError = Ts, e.LivekitReasonedError = Ss, e.LocalAudioTrack = jc, e.LocalDataTrack = al, e.LocalParticipant = wl, e.LocalTrack = Bc, e.LocalTrackPublication = kl, e.LocalTrackRecorder = Fc, e.LocalVideoTrack = ed, e.Mutex = r, e.NegotiationError = Ls, e.Participant = Cl, e.ParticipantKind = ht, e.PublishDataError = class extends Ts {
          constructor(e2) {
            super(14, null != e2 ? e2 : "unable to publish data"), this.name = "PublishDataError";
          }
        }, e.PublishTrackError = xs, e.RemoteAudioTrack = hl, e.RemoteDataTrack = Ud, e.RemoteParticipant = Dl, e.RemoteTrack = ul, e.RemoteTrackPublication = Il, e.RemoteVideoTrack = pl, e.Room = _l, e.RpcError = Mc, e.ScreenSharePresets = Xs, e.SignalReconnectError = Bs, e.SignalRequestError = Us, e.SimulatedError = class extends Ts {
          constructor() {
            super(-1, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Simulated failure"), this.name = "simulated";
          }
        }, e.SubscriptionError = rt, e.TokenSource = ou, e.TokenSourceConfigurable = zl, e.TokenSourceFixed = Kl, e.Track = pa, e.TrackInvalidError = Os, e.TrackPublication = fl, e.TrackType = Xe, e.UnexpectedConnectionState = Ns, e.UnsupportedServer = As, e.VideoPreset = qs, e.VideoPresets = Qs, e.VideoPresets43 = Ys, e.areTokenSourceFetchOptionsEqual = function(e2, t2) {
          const n2 = /* @__PURE__ */ new Set([...Object.keys(e2), ...Object.keys(t2)]);
          for (const i2 of n2) switch (i2) {
            case "roomName":
            case "participantName":
            case "participantIdentity":
            case "participantMetadata":
            case "participantAttributes":
            case "agentName":
            case "agentMetadata":
              if (e2[i2] !== t2[i2]) return false;
              break;
            default:
              throw new Error("Options key ".concat(i2, " not being checked for equality!"));
          }
          return true;
        }, e.asEncryptablePacket = Io, e.attachToElement = ma, e.attributes = Al, e.audioCodecs = Vs, e.compareVersions = Fa, e.createAudioAnalyser = function(e2, t2) {
          const n2 = Object.assign({ cloneTrack: false, fftSize: 2048, smoothingTimeConstant: 0.8, minDecibels: -100, maxDecibels: -80 }, t2), i2 = na();
          if (!i2) throw new Error("Audio Context not supported on this browser");
          const r2 = n2.cloneTrack ? e2.mediaStreamTrack.clone() : e2.mediaStreamTrack, s2 = i2.createMediaStreamSource(new MediaStream([r2])), a2 = i2.createAnalyser();
          a2.minDecibels = n2.minDecibels, a2.maxDecibels = n2.maxDecibels, a2.fftSize = n2.fftSize, a2.smoothingTimeConstant = n2.smoothingTimeConstant, s2.connect(a2);
          const o2 = new Uint8Array(a2.frequencyBinCount);
          return { calculateVolume: () => {
            a2.getByteFrequencyData(o2);
            let e3 = 0;
            for (const t3 of o2) e3 += Math.pow(t3 / 255, 2);
            return Math.sqrt(e3 / o2.length);
          }, analyser: a2, cleanup: () => Xi(this, void 0, void 0, (function* () {
            yield i2.close(), n2.cloneTrack && r2.stop();
          })) };
        }, e.createE2EEKey = function() {
          return window.crypto.getRandomValues(new Uint8Array(32));
        }, e.createKeyMaterialFromBuffer = Ro, e.createKeyMaterialFromString = wo, e.createLocalAudioTrack = Tl, e.createLocalScreenTracks = function(e2) {
          return Xi(this, void 0, void 0, (function* () {
            if (void 0 === e2 && (e2 = {}), void 0 !== e2.resolution || Da() || (e2.resolution = Xs.h1080fps30.resolution), void 0 === navigator.mediaDevices.getDisplayMedia) throw new Ms("getDisplayMedia not supported");
            const t2 = sa(e2), n2 = yield navigator.mediaDevices.getDisplayMedia(t2), i2 = n2.getVideoTracks();
            if (0 === i2.length) throw new Os("no video track found");
            const r2 = new ed(i2[0], void 0, false);
            r2.source = pa.Source.ScreenShare;
            const s2 = [r2];
            if (n2.getAudioTracks().length > 0) {
              const e3 = new jc(n2.getAudioTracks()[0], void 0, false);
              e3.source = pa.Source.ScreenShareAudio, s2.push(e3);
            }
            return s2;
          }));
        }, e.createLocalTracks = yl, e.createLocalVideoTrack = bl, e.decodeTokenPayload = tu, e.deriveKeys = function(e2, t2) {
          return Xi(this, void 0, void 0, (function* () {
            const n2 = Po(e2.algorithm.name, t2.ratchetSalt), i2 = yield crypto.subtle.deriveKey(n2, e2, { name: fo, length: t2.keySize }, false, ["encrypt", "decrypt"]);
            return { material: e2, encryptionKey: i2 };
          }));
        }, e.detachTrack = ga, e.facingModeFromDeviceLabel = lu, e.facingModeFromLocalTrack = function(e2) {
          let t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          var n2;
          const i2 = no(e2) ? e2.mediaStreamTrack : e2, r2 = i2.getSettings();
          let s2 = { facingMode: null !== (n2 = t2.defaultFacingMode) && void 0 !== n2 ? n2 : "user", confidence: "low" };
          if ("facingMode" in r2) {
            const e3 = r2.facingMode;
            Hi.trace("rawFacingMode", { rawFacingMode: e3 }), e3 && "string" == typeof e3 && (function(e4) {
              const t3 = ["user", "environment", "left", "right"];
              return void 0 === e4 || t3.includes(e4);
            })(e3) && (s2 = { facingMode: e3, confidence: "high" });
          }
          if (["low", "medium"].includes(s2.confidence)) {
            Hi.trace("Try to get facing mode from device label: (".concat(i2.label, ")"));
            const e3 = lu(i2.label);
            void 0 !== e3 && (s2 = e3);
          }
          return s2;
        }, e.getBrowser = vs, e.getEmptyAudioStreamTrack = Ga, e.getEmptyVideoStreamTrack = function() {
          return Ka || (Ka = Ja()), Ka.clone();
        }, e.getLogger = Ki, e.importKey = function(e2) {
          return Xi(this, arguments, void 0, (function(e3) {
            let t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { name: fo }, n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "encrypt";
            return (function* () {
              return crypto.subtle.importKey("raw", e3, t2, false, "derive" === n2 ? ["deriveBits", "deriveKey"] : ["encrypt", "decrypt"]);
            })();
          }));
        }, e.isAudioCodec = function(e2) {
          return Vs.includes(e2);
        }, e.isAudioTrack = io, e.isBackupCodec = zs, e.isBackupVideoCodec = Ks, e.isBrowserSupported = Ca, e.isE2EESupported = So, e.isInsertableStreamSupported = Co, e.isLocalParticipant = uo, e.isLocalTrack = no, e.isRemoteParticipant = function(e2) {
          return !e2.isLocal;
        }, e.isRemoteTrack = oo, e.isScriptTransformSupported = Eo, e.isSerializer = function(e2) {
          return "object" == typeof e2 && null !== e2 && "symbol" in e2 && e2.symbol === uu;
        }, e.isVideoCodec = Ya, e.isVideoFrame = function(e2) {
          return "type" in e2;
        }, e.isVideoTrack = ro, e.needsRbspUnescaping = function(e2) {
          for (var t2 = 0; t2 < e2.length - 3; t2++) if (0 == e2[t2] && 0 == e2[t2 + 1] && 3 == e2[t2 + 2]) return true;
          return false;
        }, e.parseRbsp = function(e2) {
          const t2 = [];
          for (var n2 = e2.length, i2 = 0; i2 < e2.length; ) n2 - i2 >= 3 && !e2[i2] && !e2[i2 + 1] && 3 == e2[i2 + 2] ? (t2.push(e2[i2++]), t2.push(e2[i2++]), i2++) : t2.push(e2[i2++]);
          return new Uint8Array(t2);
        }, e.protocolVersion = 16, e.ratchet = function(e2, t2) {
          return Xi(this, void 0, void 0, (function* () {
            const n2 = Po(e2.algorithm.name, t2);
            return crypto.subtle.deriveBits(n2, e2, 256);
          }));
        }, e.serializers = pu, e.setLogExtension = function(t2, n2) {
          (n2 ? [n2] : Wi).forEach(((n3) => {
            const i2 = n3.methodFactory;
            n3.methodFactory = (n4, r2, s2) => {
              const a2 = i2(n4, r2, s2), o2 = e.LogLevel[n4], c2 = o2 >= r2 && o2 < e.LogLevel.silent;
              return (e2, n5) => {
                n5 ? a2(e2, n5) : a2(e2), c2 && t2(o2, e2, n5);
              };
            }, n3.setLevel(n3.getLevel());
          }));
        }, e.setLogLevel = function(e2, t2) {
          if (t2) Vi.getLogger(t2).setLevel(e2);
          else for (const t3 of Wi) t3.setLevel(e2);
        }, e.supportsAV1 = ba, e.supportsAdaptiveStream = function() {
          return void 0 !== typeof ResizeObserver && void 0 !== typeof IntersectionObserver;
        }, e.supportsAudioOutputSelection = function() {
          return Ea();
        }, e.supportsDynacast = function() {
          return ka();
        }, e.supportsVP9 = Ta, e.version = bs, e.videoCodecs = Ws, e.writeRbsp = function(e2) {
          const t2 = [];
          for (var n2 = 0, i2 = 0; i2 < e2.length; ++i2) {
            var r2 = e2[i2];
            r2 <= 3 && n2 >= 2 && (t2.push(3), n2 = 0), t2.push(r2), 0 == r2 ? ++n2 : n2 = 0;
          }
          return new Uint8Array(t2);
        };
      }));
    }
  });

  // node_modules/simli-client/dist/Logger.js
  var require_Logger = __commonJS({
    "node_modules/simli-client/dist/Logger.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Logger = exports.LogLevel = void 0;
      var LogLevel;
      (function(LogLevel2) {
        LogLevel2[LogLevel2["DEBUG"] = 0] = "DEBUG";
        LogLevel2[LogLevel2["INFO"] = 1] = "INFO";
        LogLevel2[LogLevel2["ERROR"] = 2] = "ERROR";
        LogLevel2[LogLevel2["CRITICAL"] = 3] = "CRITICAL";
      })(LogLevel || (exports.LogLevel = LogLevel = {}));
      var Logger = class {
        currentLevel;
        destination;
        session_id;
        constructor(level = LogLevel.INFO) {
          this.currentLevel = level;
          this.destination = null;
          this.session_id = null;
        }
        formatMessage(level, message) {
          const timestamp = (/* @__PURE__ */ new Date()).toISOString();
          const destination = this.destination ?? "not_received";
          const sessionId = this.session_id ?? "not_received";
          return `SimliClient | ${timestamp} | ${level} | ${destination}/${sessionId} | ${message}`;
        }
        log(level, levelName, message, ...args) {
          if (level < this.currentLevel) {
            return;
          }
          const formattedMessage = this.formatMessage(levelName, message);
          switch (level) {
            case LogLevel.DEBUG:
            case LogLevel.INFO:
              console.log(formattedMessage, ...args);
              break;
            case LogLevel.ERROR:
            case LogLevel.CRITICAL:
              console.error(formattedMessage, ...args);
              break;
          }
        }
        debug(message, ...args) {
          this.log(LogLevel.DEBUG, "DEBUG", message, ...args);
        }
        info(message, ...args) {
          this.log(LogLevel.INFO, "INFO", message, ...args);
        }
        error(message, ...args) {
          this.log(LogLevel.ERROR, "ERROR", message, ...args);
        }
        critical(message, ...args) {
          this.log(LogLevel.CRITICAL, "CRITICAL", message, ...args);
        }
        setLevel(level) {
          this.currentLevel = level;
        }
        getLevel() {
          return this.currentLevel;
        }
      };
      exports.Logger = Logger;
    }
  });

  // node_modules/simli-client/dist/Signaling/WebSocketSignaling.js
  var require_WebSocketSignaling = __commonJS({
    "node_modules/simli-client/dist/Signaling/WebSocketSignaling.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WebSocketSignaling = void 0;
      var Logger_1 = require_Logger();
      var WebSocketSignaling = class {
        wsURL;
        wsConnection;
        logger;
        constructor(wsURL, logger) {
          this.wsURL = wsURL;
          this.wsConnection = new WebSocket(this.wsURL);
          this.wsConnection.addEventListener("message", (message) => this.logger.debug(message.data));
          this.logger = logger;
        }
        async connect(connected) {
          this.wsConnection.onopen = connected;
        }
        disconnect() {
          this.wsConnection.close();
        }
        send(data) {
          if (this.wsConnection.readyState != WebSocket.OPEN) {
            throw `Invalid State, WS Connection ${this.wsConnection.readyState.toString()}`;
          }
          this.wsConnection.send(data);
        }
        sendOffer(offer) {
          this.send(JSON.stringify(offer));
        }
        sendSignal(data) {
          this.send(data);
        }
        sendAudioData(audioData) {
          if (this.logger.getLevel() === Logger_1.LogLevel.DEBUG)
            this.logger.debug("Sent Audio of length: " + (audioData.length / 32e3).toString());
          this.send(audioData);
        }
        sendAudioDataImmediate(audioData) {
          if (this.logger.getLevel() === Logger_1.LogLevel.DEBUG)
            this.logger.debug("Sent Audio of length for immediate playback: " + (audioData.length / 32e3).toString());
          const asciiStr = "PLAY_IMMEDIATE";
          const encoder = new TextEncoder();
          const strBytes = encoder.encode(asciiStr);
          const buffer = new Uint8Array(strBytes.length + audioData.length);
          buffer.set(strBytes, 0);
          buffer.set(audioData, strBytes.length);
          this.send(buffer);
        }
      };
      exports.WebSocketSignaling = WebSocketSignaling;
    }
  });

  // node_modules/simli-client/dist/Transports/BaseTransport.js
  var require_BaseTransport = __commonJS({
    "node_modules/simli-client/dist/Transports/BaseTransport.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.handleMessage = handleMessage;
      exports.register_destination = register_destination;
      function register_destination(logger, serialized_info) {
        const parsed = JSON.parse(serialized_info);
        logger.destination = parsed.destination;
        logger.session_id = parsed.session_id;
      }
      async function handleMessage(transport, message) {
        const firstToken = message.data.toUpperCase().split(" ")[0];
        switch (firstToken) {
          case "START": {
            break;
          }
          case "ACK": {
            transport.emit("ack");
            break;
          }
          case "STOP": {
            transport.disconnect();
            transport.emit("stop");
            break;
          }
          case "CLOSING":
          case "RATE":
          case "ERROR":
          case "ERROR:": {
            transport.disconnect();
            transport.emit("error", message.data);
          }
          case "SPEAK": {
            transport.emit("speaking");
            break;
          }
          case "SILENT": {
            transport.emit("silent");
            break;
          }
          default: {
            if (firstToken.includes("SDP") || firstToken.includes("LIVEKIT")) {
              transport.emit("connection_info", message.data);
            } else if (firstToken.includes("VIDEO_METADATA")) {
              transport.emit("video_info", message.data);
            } else if (firstToken.includes("ENDFRAME")) {
              transport.emit("stop");
              transport.disconnect();
            } else if (firstToken.includes("DESTINATION")) {
              transport.emit("destination", message.data);
            } else {
              transport.emit("unknown", message.data);
            }
          }
        }
      }
    }
  });

  // node_modules/simli-client/dist/Transports/LivekitTransport.js
  var require_LivekitTransport = __commonJS({
    "node_modules/simli-client/dist/Transports/LivekitTransport.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LivekitTransport = void 0;
      var livekit_client_1 = require_livekit_client_umd();
      var WebSocketSignaling_1 = require_WebSocketSignaling();
      var BaseTransport_1 = require_BaseTransport();
      var LivekitTransport = class {
        videoElementAnchor;
        audioElementAnchor;
        signalingConnection;
        session_token;
        pc;
        logger;
        events = /* @__PURE__ */ new Map();
        websocketPromise;
        websocketReject = null;
        constructor(simliBaseWSURL, session_token, videoElementAnchor, audioElementAnchor, logger, failSignal) {
          this.logger = logger;
          this.on("startup_error", failSignal);
          this.session_token = session_token;
          const wsURL = new URL(simliBaseWSURL + "/compose/webrtc/livekit");
          wsURL.searchParams.set("session_token", session_token);
          this.signalingConnection = new WebSocketSignaling_1.WebSocketSignaling(wsURL, this.logger);
          this.on("destination", (serilized_info) => (0, BaseTransport_1.register_destination)(this.logger, serilized_info));
          this.websocketPromise = new Promise((resolve, reject) => {
            this.websocketReject = reject;
            this.signalingConnection.connect(() => {
              resolve("success");
              this.logger.debug("LK WebSocket Connected");
            });
          });
          this.signalingConnection.wsConnection.onmessage = (message) => {
            (0, BaseTransport_1.handleMessage)(this, message);
          };
          this.signalingConnection.wsConnection.onerror = (evt) => {
            this.emit("startup_error", "Websocket Failed");
            if (this.websocketReject) {
              this.websocketReject("Websocket Failed");
              this.websocketReject = null;
            }
          };
          const options = { adaptiveStream: true, dynacast: true };
          this.pc = new livekit_client_1.Room(options);
          this.on("connection_info", (serialized_info) => this.join_lk_room(serialized_info));
          this.videoElementAnchor = videoElementAnchor;
          this.audioElementAnchor = audioElementAnchor;
        }
        on(event, callback) {
          if (!this.events.has(event)) {
            this.events.set(event, /* @__PURE__ */ new Set());
          }
          this.events.get(event)?.add(callback);
          this.logger.debug("Registered Callback for Event: " + event);
        }
        off(event, callback) {
          if (!this.events.has(event)) {
            throw "Event Not Regsitered";
          }
          this.events.get(event)?.delete(callback);
        }
        emit(event, ...args) {
          this.logger.debug("Event: " + event);
          this.events.get(event)?.forEach((callback) => {
            callback(...args);
          });
        }
        async connect() {
          this.logger.info("Connecting");
          this.setupConnectionStateHandler();
          await this.websocketPromise;
        }
        async disconnect() {
          this.logger.info("Disconnecting");
          try {
            this.signalingConnection.sendSignal("DONE");
          } catch {
            this.logger.error("FAILED TO SEND FINAL MESSAGE");
          }
          try {
            this.signalingConnection.disconnect();
          } catch {
            this.logger.error("SIGNALING ALREADY DISCONNECTED");
          }
          try {
            await this.pc.disconnect();
          } catch {
            this.logger.error("LOCAL PEER ALREADY CLOSED");
          }
        }
        async join_lk_room(serialized_info) {
          const info = JSON.parse(serialized_info);
          this.logger.debug(info);
          if (info.livekit_url && info.livekit_token) {
            await this.pc.connect(info.livekit_url, info.livekit_token);
          } else {
            this.disconnect();
            this.emit("error", "Invalid Join Info, Contact Simli For Support");
          }
        }
        setupConnectionStateHandler() {
          this.pc.on(livekit_client_1.RoomEvent.Disconnected, () => {
            this.disconnect();
          });
          this.pc.on(livekit_client_1.RoomEvent.Connected, () => {
          });
          this.pc.on(livekit_client_1.RoomEvent.TrackSubscribed, (track, publication, participant) => {
            this.logger.debug("Track Received: " + track.kind);
            if (track.kind === livekit_client_1.Track.Kind.Video) {
              track.attach(this.videoElementAnchor);
              this.videoElementAnchor.requestVideoFrameCallback(() => {
                this.emit("start");
              });
            } else if (track.kind === livekit_client_1.Track.Kind.Audio) {
              track.attach(this.audioElementAnchor);
            }
          });
        }
      };
      exports.LivekitTransport = LivekitTransport;
    }
  });

  // node_modules/simli-client/dist/Transports/P2PTransport.js
  var require_P2PTransport = __commonJS({
    "node_modules/simli-client/dist/Transports/P2PTransport.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.P2PTransport = void 0;
      var WebSocketSignaling_1 = require_WebSocketSignaling();
      var BaseTransport_1 = require_BaseTransport();
      var P2PTransport = class {
        videoElementAnchor;
        audioElementAnchor;
        signalingConnection;
        session_token;
        pc;
        events = /* @__PURE__ */ new Map();
        logger;
        iceCandidateCount;
        previousIceCandidateCount;
        iceTimeout = null;
        websocketPromise;
        websocketReject = null;
        constructor(simliBaseWSURL, session_token, enableSFU, iceServers, videoElementAnchor, audioElementAnchor, logger, failSignal) {
          this.logger = logger;
          this.on("startup_error", failSignal);
          this.session_token = session_token;
          const wsURL = new URL(simliBaseWSURL + "/compose/webrtc/p2p");
          wsURL.searchParams.set("session_token", session_token);
          wsURL.searchParams.set("enableSFU", String(enableSFU));
          this.on("destination", (serilized_info) => (0, BaseTransport_1.register_destination)(this.logger, serilized_info));
          this.signalingConnection = new WebSocketSignaling_1.WebSocketSignaling(wsURL, this.logger);
          this.websocketPromise = new Promise((resolve, reject) => {
            this.websocketReject = reject;
            this.signalingConnection.connect(() => {
              resolve("success");
              this.logger.debug("P2P WebSocket Connected");
            });
          });
          this.signalingConnection.wsConnection.onmessage = (message) => {
            (0, BaseTransport_1.handleMessage)(this, message);
          };
          this.signalingConnection.wsConnection.onerror = (evt) => {
            this.emit("startup_error", "Websocket Failed");
            if (this.websocketReject) {
              this.websocketReject("Websocket Failed");
              this.websocketReject = null;
            }
          };
          this.on("connection_info", (serialized_info) => this.registerPeerInfo(serialized_info));
          this.videoElementAnchor = videoElementAnchor;
          this.audioElementAnchor = audioElementAnchor;
          this.iceCandidateCount = 0;
          this.previousIceCandidateCount = 0;
          const config = {
            sdpSemantics: "unified-plan",
            iceServers
          };
          this.pc = new window.RTCPeerConnection(config);
          this.pc.addTransceiver("audio", {
            direction: "recvonly"
          });
          this.pc.addTransceiver("video", {
            direction: "recvonly"
          });
        }
        on(event, callback) {
          if (!this.events.has(event)) {
            this.events.set(event, /* @__PURE__ */ new Set());
          }
          this.events.get(event)?.add(callback);
        }
        off(event, callback) {
          this.events.get(event)?.delete(callback);
        }
        emit(event, ...args) {
          this.events.get(event)?.forEach((callback) => {
            try {
              callback(...args);
            } catch {
              this.logger.error("CALLBACK FAILED: " + callback.name);
            }
          });
        }
        async connect() {
          const offer = await this.pc.createOffer();
          await this.pc.setLocalDescription(offer);
          await this.waitForIceGathering();
          this.setupPeerConnectionListeners();
          await this.websocketPromise;
          if (this.pc.localDescription) {
            this.signalingConnection.sendOffer(this.pc.localDescription);
          }
        }
        async disconnect() {
          this.logger.info("Disconnecting");
          try {
            this.signalingConnection.sendSignal("DONE");
          } catch {
            this.logger.error("FAILED TO SEND FINAL MESSAGE");
          }
          try {
            this.signalingConnection.disconnect();
          } catch {
            this.logger.error("SIGNALING ALREADY DISCONNECTED");
          }
          try {
            this.pc.close();
          } catch {
            this.logger.error("LOCAL PEER ALREADY CLOSED");
          }
        }
        async registerPeerInfo(serialized_info) {
          const info = JSON.parse(serialized_info);
          if (info.sdp && info.type == "answer") {
            await this.pc.setRemoteDescription(new RTCSessionDescription(info));
          } else {
            this.disconnect();
            this.emit("error", "Invalid Join Info, Contact Simli For Support");
          }
        }
        async waitForIceGathering() {
          this.iceCandidateCount = 0;
          this.previousIceCandidateCount = 0;
          if (this.pc.iceGatheringState === "complete") {
            return;
          }
          return new Promise((resolve, reject) => {
            if (!this.iceTimeout) {
              this.iceTimeout = setTimeout(() => {
                reject(new Error("ICE gathering timeout"));
              }, 1e4);
            }
            const checkIceCandidates = () => {
              if (this.pc.iceGatheringState === "complete" || this.iceCandidateCount === this.previousIceCandidateCount) {
                if (this.iceTimeout) {
                  clearTimeout(this.iceTimeout);
                }
                resolve();
              } else {
                this.previousIceCandidateCount = this.iceCandidateCount;
                setTimeout(checkIceCandidates, 150);
              }
            };
            checkIceCandidates();
          });
        }
        setupPeerConnectionListeners() {
          this.pc.addEventListener("track", (evt) => {
            if (evt.track.kind === "video") {
              this.videoElementAnchor.srcObject = evt.streams[0];
              this.videoElementAnchor.requestVideoFrameCallback(() => {
                this.emit("start");
              });
            } else if (evt.track.kind === "audio" && this.audioElementAnchor) {
              this.audioElementAnchor.srcObject = evt.streams[0];
            }
          });
          this.pc.onicecandidate = (event) => {
            if (event.candidate !== null) {
              this.iceCandidateCount += 1;
            }
          };
        }
      };
      exports.P2PTransport = P2PTransport;
    }
  });

  // node_modules/simli-client/dist/Client.js
  var require_Client = __commonJS({
    "node_modules/simli-client/dist/Client.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LogLevel = exports.Logger = exports.SimliClient = void 0;
      exports.generateSimliSessionToken = generateSimliSessionToken;
      exports.generateIceServers = generateIceServers;
      var LivekitTransport_1 = require_LivekitTransport();
      var P2PTransport_1 = require_P2PTransport();
      var Logger_1 = require_Logger();
      Object.defineProperty(exports, "Logger", { enumerable: true, get: function() {
        return Logger_1.Logger;
      } });
      Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function() {
        return Logger_1.LogLevel;
      } });
      var AudioProcessor = (buffer) => {
        if (buffer <= 0) {
          throw "Invalid Buffer Size, Can't be negative";
        }
        if (Math.floor(buffer) - buffer != 0) {
          throw "Invalid Buffer Size, Can't be a float";
        }
        return `
        class AudioProcessor extends AudioWorkletProcessor {
          constructor() {
            super();
            this.buffer = new Int16Array(${buffer});
            this.bufferIndex = 0;
        }

          process(inputs, outputs, parameters) {
            const input = inputs[0];
            const inputChannel = input[0];
            if (inputChannel) {
              for (let i = 0; i < inputChannel.length; i++) {
                this.buffer[this.bufferIndex] = Math.max(-32768, Math.min(32767, Math.round(inputChannel[i] * 32767)));
                this.bufferIndex++;

                if (this.bufferIndex === this.buffer.length){
                  this.port.postMessage({type: 'audioData', data: this.buffer.slice(0, this.bufferIndex)});
                  this.bufferIndex = 0;
                }
              }
            }
            return true;
          }
        }

        registerProcessor('audio-processor', AudioProcessor);
      `;
      };
      async function generateSimliSessionToken(request, SimliURL = "https://api.simli.ai") {
        const url = `${SimliURL}/compose/token`;
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(request.config),
          headers: {
            "Content-Type": "application/json",
            "x-simli-api-key": request.apiKey
          }
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw errorText;
        }
        const resJSON = await response.json();
        return resJSON;
      }
      async function generateIceServers(apiKey, SimliURL = "https://api.simli.ai") {
        try {
          const url = `${SimliURL}/compose/ice`;
          const response = await fetch(url, {
            headers: {
              "Content-Type": "application/json",
              "x-simli-api-key": apiKey
            },
            method: "GET"
          });
          if (!response.ok) {
            throw new Error(`SIMLI: HTTP error! status: ${response.status}`);
          }
          const iceServers = await response.json();
          if (!iceServers || iceServers.length === 0) {
            throw new Error("SIMLI: No ICE servers returned");
          }
          return iceServers;
        } catch (error) {
          return [{ urls: ["stun:stun.l.google.com:19302"] }];
        }
      }
      var SimliClient = class {
        session_token;
        transport = "livekit";
        signaling = "websockets";
        videoElement;
        audioElement;
        audioBufferSize = 3e3;
        connection;
        connectionTimeout;
        connectionResolve;
        connectionReject;
        connectionPromise;
        sourceNode = null;
        audioWorklet = null;
        MAX_RETRY_ATTEMPTS = 10;
        RETRY_DELAY = 2e3;
        CONNECTION_TIMEOUT_MS = 15e3;
        retryAttempt = 0;
        SimliWSURL = "wss://api.simli.ai";
        audioContext = new (window.AudioContext || window.webkitAudioContext)({
          sampleRate: 16e3
        });
        logger;
        iceServers;
        persistent_events;
        failReason = null;
        shouldStop = false;
        // Type-safe event methods
        on(event, callback) {
          if (!this.persistent_events.has(event)) {
            this.persistent_events.set(event, /* @__PURE__ */ new Set());
          }
          this.persistent_events.get(event)?.add(callback);
          this.logger.debug("Registered Callback for Event: " + event);
          this.connection.on(event, callback);
        }
        off(event, callback) {
          if (!this.persistent_events.has(event)) {
            throw "Event Not Regsitered";
          }
          this.persistent_events.get(event)?.delete(callback);
          this.connection.off(event, callback);
        }
        constructor(session_token, videoElement, audioElement, iceServers, logLevel = Logger_1.LogLevel.DEBUG, transport_mode = "p2p", signaling = "websockets", SimliWSURL = "wss://api.simli.ai", audioBufferSize = 3e3) {
          if (audioBufferSize <= 0) {
            throw "Invalid Buffer Size, Can't be negative";
          }
          if (Math.floor(audioBufferSize) - audioBufferSize != 0) {
            throw "Invalid Buffer Size, Can't be a float";
          }
          if (!(SimliWSURL.startsWith("ws://") || SimliWSURL.startsWith("wss://")) || SimliWSURL.endsWith("/")) {
            throw "Invalid Simli WS URL";
          }
          this.session_token = session_token;
          this.transport = transport_mode;
          this.signaling = signaling;
          this.SimliWSURL = SimliWSURL;
          this.videoElement = videoElement;
          this.audioElement = audioElement;
          this.iceServers = iceServers;
          this.logger = new Logger_1.Logger(logLevel);
          let resolveFn;
          let rejectFn;
          this.connectionPromise = new Promise((resolve, reject) => {
            resolveFn = resolve;
            rejectFn = reject;
          });
          this.connectionResolve = resolveFn;
          this.connectionReject = rejectFn;
          this.persistent_events = /* @__PURE__ */ new Map();
          this.connectionTimeout = setTimeout(() => this.connectionReject("CONNECTION TIMED OUT"), this.CONNECTION_TIMEOUT_MS);
          switch (this.transport) {
            case "livekit":
              this.connection = new LivekitTransport_1.LivekitTransport(this.SimliWSURL, this.session_token, videoElement, audioElement, this.logger, this.connectionReject);
              break;
            case "p2p":
              if (!iceServers || iceServers.length == 0) {
                throw "Ice Servers Required for P2P Mode";
              }
              this.connection = new P2PTransport_1.P2PTransport(this.SimliWSURL, this.session_token, true, iceServers, videoElement, audioElement, this.logger, this.connectionReject);
              break;
            default:
              throw new Error("Not Implemented Yet");
          }
          this.connection.on("start", () => {
            this.connectionResolve();
            clearTimeout(this.connectionTimeout);
          });
          this.connection.on("unknown", (message) => this.logger.debug("UNKOWN MESSAGE FROM SERVER: " + message));
          this.connection.on("error", (message) => {
            this.failReason = message;
            this.connectionReject(message);
          });
        }
        resetConnections(videoElement, audioElement, iceServers) {
          this.failReason = null;
          let resolveFn;
          let rejectFn;
          this.connectionPromise = new Promise((resolve, reject) => {
            resolveFn = resolve;
            rejectFn = reject;
          });
          this.connectionResolve = resolveFn;
          this.connectionReject = rejectFn;
          this.connectionTimeout = setTimeout(() => this.connectionReject("Connection Timed Out"), this.CONNECTION_TIMEOUT_MS);
          switch (this.transport) {
            case "livekit":
              this.connection = new LivekitTransport_1.LivekitTransport(this.SimliWSURL, this.session_token, videoElement, audioElement, this.logger, this.connectionReject);
              break;
            case "p2p":
              if (!iceServers || iceServers.length == 0) {
                throw "Ice Servers Required for P2P Mode";
              }
              this.connection = new P2PTransport_1.P2PTransport(this.SimliWSURL, this.session_token, true, iceServers, videoElement, audioElement, this.logger, this.connectionReject);
              break;
            default:
              throw new Error("Not Implemented Yet");
          }
          this.connection.on("start", () => {
            this.connectionResolve();
            clearTimeout(this.connectionTimeout);
          });
          this.connection.on("error", (message) => {
            this.retryAttempt = this.MAX_RETRY_ATTEMPTS;
            this.connectionReject(message);
          });
          this.connection.on("unknown", (message) => this.logger.debug("UNKOWN MESSAGE FROM SERVER: " + message));
          this.persistent_events.forEach((callbacks, event) => {
            callbacks.forEach((callback) => {
              this.connection.on(event, callback);
            });
          });
        }
        async start() {
          if (this.shouldStop) {
            throw new Error("Disconnect Already Called, Can't reuse same SimliClient multiple times create a new SimliClient Object");
          }
          try {
            await this.connection.connect();
            await this.connectionPromise;
            this.retryAttempt = 0;
          } catch (error) {
            if (this.failReason) {
              throw error;
            }
            if (this.retryAttempt >= this.MAX_RETRY_ATTEMPTS)
              throw new Error("Too Many Retry Attempts Failed to connect");
            if (this.shouldStop) {
              this.shouldStop = false;
              throw new Error("Called Disconnect Before A Connecction succeeded");
            }
            this.logger.error("FAILED: " + error);
            await this.connection.disconnect();
            await new Promise((resolve) => setTimeout(resolve, this.RETRY_DELAY));
            this.retryAttempt += 1;
            if (this.retryAttempt > 2)
              this.transport = "livekit";
            this.resetConnections(this.videoElement, this.audioElement, this.iceServers);
            await this.start();
          }
        }
        async stop() {
          this.shouldStop = true;
          await this.connection.disconnect();
        }
        listenToMediastreamTrack(stream) {
          this.initializeAudioWorklet(this.audioContext, stream);
        }
        initializeAudioWorklet(audioContext, stream) {
          audioContext.audioWorklet.addModule(URL.createObjectURL(new Blob([AudioProcessor(this.audioBufferSize)], {
            type: "application/javascript"
          }))).then(() => {
            this.audioWorklet = new AudioWorkletNode(audioContext, "audio-processor");
            this.sourceNode = audioContext.createMediaStreamSource(new MediaStream([stream]));
            if (this.audioWorklet === null) {
              throw new Error("SIMLI: AudioWorklet not initialized");
            }
            this.sourceNode.connect(this.audioWorklet);
            this.audioWorklet.port.onmessage = (event) => {
              if (event.data.type === "audioData") {
                this.connection.signalingConnection.sendAudioData(new Uint8Array(event.data.data.buffer));
              }
            };
          });
        }
        ClearBuffer = () => {
          this.connection.signalingConnection.sendSignal("SKIP");
        };
        sendAudioData(audioData) {
          this.connection.signalingConnection.sendAudioData(audioData);
        }
        sendAudioDataImmediate(audioData) {
          this.connection.signalingConnection.sendAudioDataImmediate(audioData);
        }
      };
      exports.SimliClient = SimliClient;
    }
  });

  // node_modules/simli-client/dist/index.js
  var require_index = __commonJS({
    "node_modules/simli-client/dist/index.js"(exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LogLevel = exports.generateIceServers = exports.generateSimliSessionToken = exports.SimliClient = void 0;
      var Client_1 = require_Client();
      Object.defineProperty(exports, "SimliClient", { enumerable: true, get: function() {
        return Client_1.SimliClient;
      } });
      Object.defineProperty(exports, "generateSimliSessionToken", { enumerable: true, get: function() {
        return Client_1.generateSimliSessionToken;
      } });
      Object.defineProperty(exports, "generateIceServers", { enumerable: true, get: function() {
        return Client_1.generateIceServers;
      } });
      Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function() {
        return Client_1.LogLevel;
      } });
    }
  });
  return require_index();
})();
