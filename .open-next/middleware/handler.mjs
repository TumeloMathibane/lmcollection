
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.0.2";globalThis.nextVersion = "15.5.19";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge/chunks/edge-wrapper_fa177864.js
var require_edge_wrapper_fa177864 = __commonJS({
  ".next/server/edge/chunks/edge-wrapper_fa177864.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/edge-wrapper_fa177864.js", 88912, (e, t, h) => {
      self._ENTRIES ||= {};
      let l = Promise.resolve().then(() => e.i(58217));
      l.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(l, { get(e2, t2) {
        if ("then" === t2) return (t3, h3) => e2.then(t3, h3);
        let h2 = (...h3) => e2.then((e3) => (0, e3[t2])(...h3));
        return h2.then = (h3, l2) => e2.then((e3) => e3[t2]).then(h3, l2), h2;
      } });
    }]);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__fde9ded8._.js
var require_root_of_the_server_fde9ded8 = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__fde9ded8._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__fde9ded8._.js", 28042, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, a = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, s = {};
      function l(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function c(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, a2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != a2 ? a2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function u(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = c(e2), { domain: a2, expires: i2, httponly: o2, maxage: s2, path: l2, samesite: u2, secure: h2, partitioned: f2, priority: g } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var y, m, w = { name: t2, value: decodeURIComponent(r2), domain: a2, ...i2 && { expires: new Date(i2) }, ...o2 && { httpOnly: true }, ..."string" == typeof s2 && { maxAge: Number(s2) }, path: l2, ...u2 && { sameSite: d.includes(y = (y = u2).toLowerCase()) ? y : void 0 }, ...h2 && { secure: true }, ...g && { priority: p.includes(m = (m = g).toLowerCase()) ? m : void 0 }, ...f2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in w) w[t3] && (e3[t3] = w[t3]);
          return e3;
        }
      }
      ((e2, t2) => {
        for (var r2 in t2) n(e2, r2, { get: t2[r2], enumerable: true });
      })(s, { RequestCookies: () => h, ResponseCookies: () => f, parseCookie: () => c, parseSetCookie: () => u, stringifyCookie: () => l }), t.exports = ((e2, t2, r2, s2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let l2 of i(t2)) o.call(e2, l2) || l2 === r2 || n(e2, l2, { get: () => t2[l2], enumerable: !(s2 = a(t2, l2)) || s2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), s);
      var d = ["strict", "lax", "none"], p = ["low", "medium", "high"], h = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of c(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => l(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => l(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, f = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let a2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(a2) ? a2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, a3, i2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, i2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, l2(), a3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (i2 = true, s2 = a3, o2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!i2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(a2)) {
            let t3 = u(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, a2 = this._parsed;
          return a2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = l(r3);
              t3.append("set-cookie", e4);
            }
          }(a2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(l).join("; ");
        }
      };
    }, 59110, (e, t, r) => {
      (() => {
        "use strict";
        var r2 = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let n2 = r3(223), a2 = r3(172), i2 = r3(930), o = "context", s = new n2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, a2.registerGlobal)(o, e3, i2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...n3) {
              return this._getContextManager().with(e3, t3, r4, ...n3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, a2.getGlobal)(o) || s;
            }
            disable() {
              this._getContextManager().disable(), (0, a2.unregisterGlobal)(o, i2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = l;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let n2 = r3(56), a2 = r3(912), i2 = r3(957), o = r3(172);
          class s {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, o.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              let t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: i2.DiagLogLevel.INFO }) => {
                var n3, s2, l;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (n3 = e5.stack) ? n3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let c = (0, o.getGlobal)("diag"), u = (0, a2.createLogLevelDiagLogger)(null != (s2 = r4.logLevel) ? s2 : i2.DiagLogLevel.INFO, e4);
                if (c && !r4.suppressOverrideMessage) {
                  let e5 = null != (l = Error().stack) ? l : "<failed to generate stacktrace>";
                  c.warn(`Current logger will be overwritten from ${e5}`), u.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o.registerGlobal)("diag", u, t3, true);
              }, t3.disable = () => {
                (0, o.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s()), this._instance;
            }
          }
          t2.DiagAPI = s;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let n2 = r3(660), a2 = r3(172), i2 = r3(930), o = "metrics";
          class s {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new s()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, a2.registerGlobal)(o, e3, i2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, a2.getGlobal)(o) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, a2.unregisterGlobal)(o, i2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = s;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let n2 = r3(172), a2 = r3(874), i2 = r3(194), o = r3(277), s = r3(369), l = r3(930), c = "propagation", u = new a2.NoopTextMapPropagator();
          class d {
            constructor() {
              this.createBaggage = s.createBaggage, this.getBaggage = o.getBaggage, this.getActiveBaggage = o.getActiveBaggage, this.setBaggage = o.setBaggage, this.deleteBaggage = o.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(c, e3, l.DiagAPI.instance());
            }
            inject(e3, t3, r4 = i2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = i2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(c, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(c) || u;
            }
          }
          t2.PropagationAPI = d;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let n2 = r3(172), a2 = r3(846), i2 = r3(139), o = r3(607), s = r3(930), l = "trace";
          class c {
            constructor() {
              this._proxyTracerProvider = new a2.ProxyTracerProvider(), this.wrapSpanContext = i2.wrapSpanContext, this.isSpanContextValid = i2.isSpanContextValid, this.deleteSpan = o.deleteSpan, this.getSpan = o.getSpan, this.getActiveSpan = o.getActiveSpan, this.getSpanContext = o.getSpanContext, this.setSpan = o.setSpan, this.setSpanContext = o.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new c()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, n2.registerGlobal)(l, this._proxyTracerProvider, s.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, n2.unregisterGlobal)(l, s.DiagAPI.instance()), this._proxyTracerProvider = new a2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = c;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let n2 = r3(491), a2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function i2(e3) {
            return e3.getValue(a2) || void 0;
          }
          t2.getBaggage = i2, t2.getActiveBaggage = function() {
            return i2(n2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(a2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(a2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let n2 = new r3(this._entries);
              return n2._entries.set(e3, t3), n2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let n2 = r3(930), a2 = r3(993), i2 = r3(830), o = n2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new a2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: i2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let n2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...n3) {
              return t3.call(r4, ...n3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              let t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, n2) => {
                let a2 = new r3(t3._currentContext);
                return a2._currentContext.set(e4, n2), a2;
              }, t3.deleteValue = (e4) => {
                let n2 = new r3(t3._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let n2 = r3(172);
          function a2(e3, t3, r4) {
            let a3 = (0, n2.getGlobal)("diag");
            if (a3) return r4.unshift(t3), a3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return a2("debug", this._namespace, e3);
            }
            error(...e3) {
              return a2("error", this._namespace, e3);
            }
            info(...e3) {
              return a2("info", this._namespace, e3);
            }
            warn(...e3) {
              return a2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return a2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let n2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, n3) {
              let a2 = t3[r5];
              return "function" == typeof a2 && e3 >= n3 ? a2.bind(t3) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", n2.DiagLogLevel.ERROR), warn: r4("warn", n2.DiagLogLevel.WARN), info: r4("info", n2.DiagLogLevel.INFO), debug: r4("debug", n2.DiagLogLevel.DEBUG), verbose: r4("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t2.DiagLogLevel || (t2.DiagLogLevel = {}));
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let n2 = r3(200), a2 = r3(521), i2 = r3(130), o = a2.VERSION.split(".")[0], s = Symbol.for(`opentelemetry.js.api.${o}`), l = n2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, n3 = false) {
            var i3;
            let o2 = l[s] = null != (i3 = l[s]) ? i3 : { version: a2.VERSION };
            if (!n3 && o2[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (o2.version !== a2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${o2.version} for ${e3} does not match previously registered API v${a2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return o2[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${a2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let n3 = null == (t3 = l[s]) ? void 0 : t3.version;
            if (n3 && (0, i2.isCompatible)(n3)) return null == (r4 = l[s]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${a2.VERSION}.`);
            let r4 = l[s];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let n2 = r3(521), a2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function i2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), n3 = e3.match(a2);
            if (!n3) return () => false;
            let i3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != i3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function o(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let n4 = e4.match(a2);
              if (!n4) return o(e4);
              let s = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              if (null != s.prerelease || i3.major !== s.major) return o(e4);
              if (0 === i3.major) return i3.minor === s.minor && i3.patch <= s.patch ? (t3.add(e4), true) : o(e4);
              return i3.minor <= s.minor ? (t3.add(e4), true) : o(e4);
            };
          }
          t2._makeCompatibilityCheck = i2, t2.isCompatible = i2(n2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t2.ValueType || (t2.ValueType = {}));
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            constructor() {
            }
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class n2 {
          }
          t2.NoopMetric = n2;
          class a2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = a2;
          class i2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = i2;
          class o extends n2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = o;
          class s {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = s;
          class l extends s {
          }
          t2.NoopObservableCounterMetric = l;
          class c extends s {
          }
          t2.NoopObservableGaugeMetric = c;
          class u extends s {
          }
          t2.NoopObservableUpDownCounterMetric = u, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new a2(), t2.NOOP_HISTOGRAM_METRIC = new o(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new i2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new c(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let n2 = r3(102);
          class a2 {
            getMeter(e3, t3, r4) {
              return n2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = a2, t2.NOOP_METER_PROVIDER = new a2();
        }, 200: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), a2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), a2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), a2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), a2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let n2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let n2 = r3(491), a2 = r3(607), i2 = r3(403), o = r3(139), s = n2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = s.active()) {
              var n3;
              if (null == t3 ? void 0 : t3.root) return new i2.NonRecordingSpan();
              let l = r4 && (0, a2.getSpanContext)(r4);
              return "object" == typeof (n3 = l) && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, o.isSpanContextValid)(l) ? new i2.NonRecordingSpan(l) : new i2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, n3) {
              let i3, o2, l;
              if (arguments.length < 2) return;
              2 == arguments.length ? l = t3 : 3 == arguments.length ? (i3 = t3, l = r4) : (i3 = t3, o2 = r4, l = n3);
              let c = null != o2 ? o2 : s.active(), u = this.startSpan(e3, i3, c), d = (0, a2.setSpan)(c, u);
              return s.with(d, l, void 0, u);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let n2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new n2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let n2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, n3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = n3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, n3) {
              let a2 = this._getTracer();
              return Reflect.apply(a2.startActiveSpan, a2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let n2 = r3(125), a2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var a3;
              return null != (a3 = this.getDelegateTracer(e3, t3, r4)) ? a3 : new n2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : a2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var n3;
              return null == (n3 = this._delegate) ? void 0 : n3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t2.SamplingDecision || (t2.SamplingDecision = {}));
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let n2 = r3(780), a2 = r3(403), i2 = r3(491), o = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s(e3) {
            return e3.getValue(o) || void 0;
          }
          function l(e3, t3) {
            return e3.setValue(o, t3);
          }
          t2.getSpan = s, t2.getActiveSpan = function() {
            return s(i2.ContextAPI.getInstance().active());
          }, t2.setSpan = l, t2.deleteSpan = function(e3) {
            return e3.deleteValue(o);
          }, t2.setSpanContext = function(e3, t3) {
            return l(e3, new a2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = s(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let n2 = r3(564);
          class a2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), a3 = r4.indexOf("=");
                if (-1 !== a3) {
                  let i2 = r4.slice(0, a3), o = r4.slice(a3 + 1, t3.length);
                  (0, n2.validateKey)(i2) && (0, n2.validateValue)(o) && e4.set(i2, o);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new a2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = a2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", n2 = `[a-z]${r3}{0,255}`, a2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, i2 = RegExp(`^(?:${n2}|${a2})$`), o = /^[ -~]{0,255}[!-~]$/, s = /,|=/;
          t2.validateKey = function(e3) {
            return i2.test(e3);
          }, t2.validateValue = function(e3) {
            return o.test(e3) && !s.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let n2 = r3(325);
          t2.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let n2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t2.SpanKind || (t2.SpanKind = {}));
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let n2 = r3(476), a2 = r3(403), i2 = /^([0-9a-f]{32})$/i, o = /^[0-9a-f]{16}$/i;
          function s(e3) {
            return i2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l(e3) {
            return o.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t2.isValidTraceId = s, t2.isValidSpanId = l, t2.isSpanContextValid = function(e3) {
            return s(e3.traceId) && l(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new a2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t2.SpanStatusCode || (t2.SpanStatusCode = {}));
        }, 475: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t2.TraceFlags || (t2.TraceFlags = {}));
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, n = {};
        function a(e2) {
          var t2 = n[e2];
          if (void 0 !== t2) return t2.exports;
          var i2 = n[e2] = { exports: {} }, o = true;
          try {
            r2[e2].call(i2.exports, i2, i2.exports, a), o = false;
          } finally {
            o && delete n[e2];
          }
          return i2.exports;
        }
        a.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var i = {};
        (() => {
          Object.defineProperty(i, "__esModule", { value: true }), i.trace = i.propagation = i.metrics = i.diag = i.context = i.INVALID_SPAN_CONTEXT = i.INVALID_TRACEID = i.INVALID_SPANID = i.isValidSpanId = i.isValidTraceId = i.isSpanContextValid = i.createTraceState = i.TraceFlags = i.SpanStatusCode = i.SpanKind = i.SamplingDecision = i.ProxyTracerProvider = i.ProxyTracer = i.defaultTextMapSetter = i.defaultTextMapGetter = i.ValueType = i.createNoopMeter = i.DiagLogLevel = i.DiagConsoleLogger = i.ROOT_CONTEXT = i.createContextKey = i.baggageEntryMetadataFromString = void 0;
          var e2 = a(369);
          Object.defineProperty(i, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t2 = a(780);
          Object.defineProperty(i, "createContextKey", { enumerable: true, get: function() {
            return t2.createContextKey;
          } }), Object.defineProperty(i, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t2.ROOT_CONTEXT;
          } });
          var r3 = a(972);
          Object.defineProperty(i, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r3.DiagConsoleLogger;
          } });
          var n2 = a(957);
          Object.defineProperty(i, "DiagLogLevel", { enumerable: true, get: function() {
            return n2.DiagLogLevel;
          } });
          var o = a(102);
          Object.defineProperty(i, "createNoopMeter", { enumerable: true, get: function() {
            return o.createNoopMeter;
          } });
          var s = a(901);
          Object.defineProperty(i, "ValueType", { enumerable: true, get: function() {
            return s.ValueType;
          } });
          var l = a(194);
          Object.defineProperty(i, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(i, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var c = a(125);
          Object.defineProperty(i, "ProxyTracer", { enumerable: true, get: function() {
            return c.ProxyTracer;
          } });
          var u = a(846);
          Object.defineProperty(i, "ProxyTracerProvider", { enumerable: true, get: function() {
            return u.ProxyTracerProvider;
          } });
          var d = a(996);
          Object.defineProperty(i, "SamplingDecision", { enumerable: true, get: function() {
            return d.SamplingDecision;
          } });
          var p = a(357);
          Object.defineProperty(i, "SpanKind", { enumerable: true, get: function() {
            return p.SpanKind;
          } });
          var h = a(847);
          Object.defineProperty(i, "SpanStatusCode", { enumerable: true, get: function() {
            return h.SpanStatusCode;
          } });
          var f = a(475);
          Object.defineProperty(i, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var g = a(98);
          Object.defineProperty(i, "createTraceState", { enumerable: true, get: function() {
            return g.createTraceState;
          } });
          var y = a(139);
          Object.defineProperty(i, "isSpanContextValid", { enumerable: true, get: function() {
            return y.isSpanContextValid;
          } }), Object.defineProperty(i, "isValidTraceId", { enumerable: true, get: function() {
            return y.isValidTraceId;
          } }), Object.defineProperty(i, "isValidSpanId", { enumerable: true, get: function() {
            return y.isValidSpanId;
          } });
          var m = a(476);
          Object.defineProperty(i, "INVALID_SPANID", { enumerable: true, get: function() {
            return m.INVALID_SPANID;
          } }), Object.defineProperty(i, "INVALID_TRACEID", { enumerable: true, get: function() {
            return m.INVALID_TRACEID;
          } }), Object.defineProperty(i, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return m.INVALID_SPAN_CONTEXT;
          } });
          let w = a(67);
          Object.defineProperty(i, "context", { enumerable: true, get: function() {
            return w.context;
          } });
          let b = a(506);
          Object.defineProperty(i, "diag", { enumerable: true, get: function() {
            return b.diag;
          } });
          let v = a(886);
          Object.defineProperty(i, "metrics", { enumerable: true, get: function() {
            return v.metrics;
          } });
          let _ = a(939);
          Object.defineProperty(i, "propagation", { enumerable: true, get: function() {
            return _.propagation;
          } });
          let E = a(845);
          Object.defineProperty(i, "trace", { enumerable: true, get: function() {
            return E.trace;
          } }), i.default = { context: w.context, diag: b.diag, metrics: v.metrics, propagation: _.propagation, trace: E.trace };
        })(), t.exports = i;
      })();
    }, 71498, (e, t, r) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2 = {};
        (() => {
          e2.parse = function(e3, r3) {
            if ("string" != typeof e3) throw TypeError("argument str must be a string");
            for (var a2 = {}, i = e3.split(n), o = (r3 || {}).decode || t2, s = 0; s < i.length; s++) {
              var l = i[s], c = l.indexOf("=");
              if (!(c < 0)) {
                var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
                '"' == d[0] && (d = d.slice(1, -1)), void 0 == a2[u] && (a2[u] = function(e4, t3) {
                  try {
                    return t3(e4);
                  } catch (t4) {
                    return e4;
                  }
                }(d, o));
              }
            }
            return a2;
          }, e2.serialize = function(e3, t3, n2) {
            var i = n2 || {}, o = i.encode || r2;
            if ("function" != typeof o) throw TypeError("option encode is invalid");
            if (!a.test(e3)) throw TypeError("argument name is invalid");
            var s = o(t3);
            if (s && !a.test(s)) throw TypeError("argument val is invalid");
            var l = e3 + "=" + s;
            if (null != i.maxAge) {
              var c = i.maxAge - 0;
              if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(c);
            }
            if (i.domain) {
              if (!a.test(i.domain)) throw TypeError("option domain is invalid");
              l += "; Domain=" + i.domain;
            }
            if (i.path) {
              if (!a.test(i.path)) throw TypeError("option path is invalid");
              l += "; Path=" + i.path;
            }
            if (i.expires) {
              if ("function" != typeof i.expires.toUTCString) throw TypeError("option expires is invalid");
              l += "; Expires=" + i.expires.toUTCString();
            }
            if (i.httpOnly && (l += "; HttpOnly"), i.secure && (l += "; Secure"), i.sameSite) switch ("string" == typeof i.sameSite ? i.sameSite.toLowerCase() : i.sameSite) {
              case true:
              case "strict":
                l += "; SameSite=Strict";
                break;
              case "lax":
                l += "; SameSite=Lax";
                break;
              case "none":
                l += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return l;
          };
          var t2 = decodeURIComponent, r2 = encodeURIComponent, n = /; */, a = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), t.exports = e2;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        var e2 = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function n2() {
          }
          function a2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function i(e4, t3, n3, i2, o2) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var s2 = new a2(n3, i2 || e4, o2), l = r3 ? r3 + t3 : t3;
            return e4._events[l] ? e4._events[l].fn ? e4._events[l] = [e4._events[l], s2] : e4._events[l].push(s2) : (e4._events[l] = s2, e4._eventsCount++), e4;
          }
          function o(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new n2() : delete e4._events[t3];
          }
          function s() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r3 = false)), s.prototype.eventNames = function() {
            var e4, n3, a3 = [];
            if (0 === this._eventsCount) return a3;
            for (n3 in e4 = this._events) t2.call(e4, n3) && a3.push(r3 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? a3.concat(Object.getOwnPropertySymbols(e4)) : a3;
          }, s.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var a3 = 0, i2 = n3.length, o2 = Array(i2); a3 < i2; a3++) o2[a3] = n3[a3].fn;
            return o2;
          }, s.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, s.prototype.emit = function(e4, t3, n3, a3, i2, o2) {
            var s2 = r3 ? r3 + e4 : e4;
            if (!this._events[s2]) return false;
            var l, c, u = this._events[s2], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, n3), true;
                case 4:
                  return u.fn.call(u.context, t3, n3, a3), true;
                case 5:
                  return u.fn.call(u.context, t3, n3, a3, i2), true;
                case 6:
                  return u.fn.call(u.context, t3, n3, a3, i2, o2), true;
              }
              for (c = 1, l = Array(d - 1); c < d; c++) l[c - 1] = arguments[c];
              u.fn.apply(u.context, l);
            } else {
              var p, h = u.length;
              for (c = 0; c < h; c++) switch (u[c].once && this.removeListener(e4, u[c].fn, void 0, true), d) {
                case 1:
                  u[c].fn.call(u[c].context);
                  break;
                case 2:
                  u[c].fn.call(u[c].context, t3);
                  break;
                case 3:
                  u[c].fn.call(u[c].context, t3, n3);
                  break;
                case 4:
                  u[c].fn.call(u[c].context, t3, n3, a3);
                  break;
                default:
                  if (!l) for (p = 1, l = Array(d - 1); p < d; p++) l[p - 1] = arguments[p];
                  u[c].fn.apply(u[c].context, l);
              }
            }
            return true;
          }, s.prototype.on = function(e4, t3, r4) {
            return i(this, e4, t3, r4, false);
          }, s.prototype.once = function(e4, t3, r4) {
            return i(this, e4, t3, r4, true);
          }, s.prototype.removeListener = function(e4, t3, n3, a3) {
            var i2 = r3 ? r3 + e4 : e4;
            if (!this._events[i2]) return this;
            if (!t3) return o(this, i2), this;
            var s2 = this._events[i2];
            if (s2.fn) s2.fn !== t3 || a3 && !s2.once || n3 && s2.context !== n3 || o(this, i2);
            else {
              for (var l = 0, c = [], u = s2.length; l < u; l++) (s2[l].fn !== t3 || a3 && !s2[l].once || n3 && s2[l].context !== n3) && c.push(s2[l]);
              c.length ? this._events[i2] = 1 === c.length ? c[0] : c : o(this, i2);
            }
            return this;
          }, s.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && o(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prefixed = r3, s.EventEmitter = s, e3.exports = s;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let n2 = 0, a2 = e4.length;
            for (; a2 > 0; ) {
              let i = a2 / 2 | 0, o = n2 + i;
              0 >= r3(e4[o], t3) ? (n2 = ++o, a2 -= i + 1) : a2 = i;
            }
            return n2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let a2 = n2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(a2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let n2 = r3(213);
          class a2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let i = (e4, t3, r4) => new Promise((i2, o) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void i2(e4);
            let s = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  i2(r4());
                } catch (e5) {
                  o(e5);
                }
                return;
              }
              let n3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, s2 = r4 instanceof Error ? r4 : new a2(n3);
              "function" == typeof e4.cancel && e4.cancel(), o(s2);
            }, t3);
            n2(e4.then(i2, o), () => {
              clearTimeout(s);
            });
          });
          e3.exports = i, e3.exports.default = i, e3.exports.TimeoutError = a2;
        } }, r2 = {};
        function n(t2) {
          var a2 = r2[t2];
          if (void 0 !== a2) return a2.exports;
          var i = r2[t2] = { exports: {} }, o = true;
          try {
            e2[t2](i, i.exports, n), o = false;
          } finally {
            o && delete r2[t2];
          }
          return i.exports;
        }
        n.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var a = {};
        (() => {
          Object.defineProperty(a, "__esModule", { value: true });
          let e3 = n(993), t2 = n(816), r3 = n(821), i = () => {
          }, o = new t2.TimeoutError();
          a.default = class extends e3 {
            constructor(e4) {
              var t3, n2, a2, o2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = i, this._resolveIdle = i, !("number" == typeof (e4 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: r3.default }, e4)).intervalCap && e4.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (n2 = null == (t3 = e4.intervalCap) ? void 0 : t3.toString()) ? n2 : ""}\` (${typeof e4.intervalCap})`);
              if (void 0 === e4.interval || !(Number.isFinite(e4.interval) && e4.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (o2 = null == (a2 = e4.interval) ? void 0 : a2.toString()) ? o2 : ""}\` (${typeof e4.interval})`);
              this._carryoverConcurrencyCount = e4.carryoverConcurrencyCount, this._isIntervalIgnored = e4.intervalCap === 1 / 0 || 0 === e4.interval, this._intervalCap = e4.intervalCap, this._interval = e4.interval, this._queue = new e4.queueClass(), this._queueClass = e4.queueClass, this.concurrency = e4.concurrency, this._timeout = e4.timeout, this._throwOnTimeout = true === e4.throwOnTimeout, this._isPaused = false === e4.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = i, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = i, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let e4 = Date.now();
              if (void 0 === this._intervalId) {
                let t3 = this._intervalEnd - e4;
                if (!(t3 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                  this._onResumeInterval();
                }, t3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let e4 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let t3 = this._queue.dequeue();
                  return !!t3 && (this.emit("active"), t3(), e4 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); ) ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(e4) {
              if (!("number" == typeof e4 && e4 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e4}\` (${typeof e4})`);
              this._concurrency = e4, this._processQueue();
            }
            async add(e4, r4 = {}) {
              return new Promise((n2, a2) => {
                let i2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let i3 = void 0 === this._timeout && void 0 === r4.timeout ? e4() : t2.default(Promise.resolve(e4()), void 0 === r4.timeout ? this._timeout : r4.timeout, () => {
                      (void 0 === r4.throwOnTimeout ? this._throwOnTimeout : r4.throwOnTimeout) && a2(o);
                    });
                    n2(await i3);
                  } catch (e5) {
                    a2(e5);
                  }
                  this._next();
                };
                this._queue.enqueue(i2, r4), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(e4, t3) {
              return Promise.all(e4.map(async (e5) => this.add(e5, t3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size) return new Promise((e4) => {
                let t3 = this._resolveEmpty;
                this._resolveEmpty = () => {
                  t3(), e4();
                };
              });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e4) => {
                let t3 = this._resolveIdle;
                this._resolveIdle = () => {
                  t3(), e4();
                };
              });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(e4) {
              return this._queue.filter(e4).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(e4) {
              this._timeout = e4;
            }
          };
        })(), t.exports = a;
      })();
    }, 51615, (e, t, r) => {
      t.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, t, r) => {
      t.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(r, { getTestReqInfo: function() {
        return o;
      }, withRequest: function() {
        return i;
      } });
      let n = new (e.r(78500)).AsyncLocalStorage();
      function a(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function i(e2, t2, r2) {
        let i2 = a(e2, t2);
        return i2 ? n.run(i2, r2) : r2();
      }
      function o(e2, t2) {
        let r2 = n.getStore();
        return r2 || (e2 && t2 ? a(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var n = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(r, { handleFetch: function() {
        return s;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return i;
      } });
      let a = e.r(25085), i = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function o(e2, t2) {
        let { url: r2, method: a2, headers: i2, body: o2, cache: s2, credentials: l2, integrity: c, mode: u, redirect: d, referrer: p, referrerPolicy: h } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: a2, headers: [...Array.from(i2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? n.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: c, mode: u, redirect: d, referrer: p, referrerPolicy: h } };
      }
      async function s(e2, t2) {
        let r2 = (0, a.getTestReqInfo)(t2, i);
        if (!r2) return e2(t2);
        let { testData: s2, proxyPort: l2 } = r2, c = await o(s2, t2), u = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(c), next: { internal: true } });
        if (!u.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await u.json(), { api: p } = d;
        switch (p) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            let { status: h, headers: f, body: g } = d.response;
            return new Response(g ? n.Buffer.from(g, "base64") : null, { status: h, headers: new Headers(f) });
          default:
            return p;
        }
      }
      function l(t2) {
        return e.g.fetch = function(e2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? t2(e2, r2) : s(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), !function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(r, { interceptTestApis: function() {
        return i;
      }, wrapRequestHandler: function() {
        return o;
      } });
      let n = e.r(25085), a = e.r(28325);
      function i() {
        return (0, a.interceptFetch)(e.g.fetch);
      }
      function o(e2) {
        return (t2, r2) => (0, n.withRequest)(t2, a.reader, () => e2(t2, r2));
      }
    }, 89666, (e, t, r) => {
      t.exports = function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }, t.exports.__esModule = true, t.exports.default = t.exports;
    }, 62665, (e) => {
      "use strict";
      e.s(["CompactEncrypt", () => tr, "CompactSign", () => ti, "EmbeddedJWK", () => tf, "EncryptJWT", () => tu, "FlattenedEncrypt", () => eX, "FlattenedSign", () => ta, "GeneralEncrypt", () => eQ, "GeneralSign", () => ts, "SignJWT", () => tc, "UnsecuredJWT", () => tS, "base64url", () => tI, "calculateJwkThumbprint", () => tp, "calculateJwkThumbprintUri", () => th, "compactDecrypt", () => eJ, "compactVerify", () => e5, "createLocalJWKSet", () => tb, "createRemoteJWKSet", () => tE, "cryptoRuntime", () => tN, "decodeJwt", () => tA, "decodeProtectedHeader", () => tx, "errors", () => tC, "exportJWK", () => eq, "exportPKCS8", () => eG, "exportSPKI", () => eV, "flattenedDecrypt", () => eL, "flattenedVerify", () => e2, "generalDecrypt", () => eB, "generalVerify", () => e4, "generateKeyPair", () => tO, "generateSecret", () => tk, "importJWK", () => ek, "importPKCS8", () => eO, "importSPKI", () => eR, "importX509", () => eT, "jwtDecrypt", () => tt, "jwtVerify", () => te], 62665), e.s([], 72460), e.s(["JOSEAlgNotAllowed", () => a, "JOSEError", () => t, "JOSENotSupported", () => i, "JWEDecompressionFailed", () => s, "JWEDecryptionFailed", () => o, "JWEInvalid", () => l, "JWKInvalid", () => d, "JWKSInvalid", () => p, "JWKSMultipleMatchingKeys", () => f, "JWKSNoMatchingKey", () => h, "JWKSTimeout", () => g, "JWSInvalid", () => c, "JWSSignatureVerificationFailed", () => y, "JWTClaimValidationFailed", () => r, "JWTExpired", () => n, "JWTInvalid", () => u], 70690);
      class t extends Error {
        static get code() {
          return "ERR_JOSE_GENERIC";
        }
        constructor(e10) {
          var t2;
          super(e10), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, null == (t2 = Error.captureStackTrace) || t2.call(Error, this, this.constructor);
        }
      }
      class r extends t {
        static get code() {
          return "ERR_JWT_CLAIM_VALIDATION_FAILED";
        }
        constructor(e10, t2 = "unspecified", r2 = "unspecified") {
          super(e10), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = t2, this.reason = r2;
        }
      }
      class n extends t {
        static get code() {
          return "ERR_JWT_EXPIRED";
        }
        constructor(e10, t2 = "unspecified", r2 = "unspecified") {
          super(e10), this.code = "ERR_JWT_EXPIRED", this.claim = t2, this.reason = r2;
        }
      }
      class a extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
        }
        static get code() {
          return "ERR_JOSE_ALG_NOT_ALLOWED";
        }
      }
      class i extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
        }
        static get code() {
          return "ERR_JOSE_NOT_SUPPORTED";
        }
      }
      class o extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JWE_DECRYPTION_FAILED", this.message = "decryption operation failed";
        }
        static get code() {
          return "ERR_JWE_DECRYPTION_FAILED";
        }
      }
      class s extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JWE_DECOMPRESSION_FAILED", this.message = "decompression operation failed";
        }
        static get code() {
          return "ERR_JWE_DECOMPRESSION_FAILED";
        }
      }
      class l extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JWE_INVALID";
        }
        static get code() {
          return "ERR_JWE_INVALID";
        }
      }
      class c extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JWS_INVALID";
        }
        static get code() {
          return "ERR_JWS_INVALID";
        }
      }
      class u extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JWT_INVALID";
        }
        static get code() {
          return "ERR_JWT_INVALID";
        }
      }
      class d extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JWK_INVALID";
        }
        static get code() {
          return "ERR_JWK_INVALID";
        }
      }
      class p extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JWKS_INVALID";
        }
        static get code() {
          return "ERR_JWKS_INVALID";
        }
      }
      class h extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JWKS_NO_MATCHING_KEY", this.message = "no applicable key found in the JSON Web Key Set";
        }
        static get code() {
          return "ERR_JWKS_NO_MATCHING_KEY";
        }
      }
      class f extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS", this.message = "multiple matching keys found in the JSON Web Key Set";
        }
        static get code() {
          return "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        }
      }
      Symbol.asyncIterator;
      class g extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JWKS_TIMEOUT", this.message = "request timed out";
        }
        static get code() {
          return "ERR_JWKS_TIMEOUT";
        }
      }
      class y extends t {
        constructor() {
          super(...arguments), this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED", this.message = "signature verification failed";
        }
        static get code() {
          return "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        }
      }
      var m = e.i(70690);
      e.s(["decode", () => N, "encode", () => I], 41199);
      let w = crypto, b = async (e10, t2) => {
        let r2 = `SHA-${e10.slice(-3)}`;
        return new Uint8Array(await w.subtle.digest(r2, t2));
      }, v = new TextEncoder(), _ = new TextDecoder();
      function E(...e10) {
        let t2 = new Uint8Array(e10.reduce((e11, { length: t3 }) => e11 + t3, 0)), r2 = 0;
        return e10.forEach((e11) => {
          t2.set(e11, r2), r2 += e11.length;
        }), t2;
      }
      function S(e10, t2, r2) {
        if (t2 < 0 || t2 >= 4294967296) throw RangeError(`value must be >= 0 and <= ${4294967296 - 1}. Received ${t2}`);
        e10.set([t2 >>> 24, t2 >>> 16, t2 >>> 8, 255 & t2], r2);
      }
      function x(e10) {
        let t2 = Math.floor(e10 / 4294967296), r2 = new Uint8Array(8);
        return S(r2, t2, 0), S(r2, e10 % 4294967296, 4), r2;
      }
      function A(e10) {
        let t2 = new Uint8Array(4);
        return S(t2, e10), t2;
      }
      function C(e10) {
        return E(A(e10.length), e10);
      }
      async function P(e10, t2, r2) {
        let n2 = Math.ceil((t2 >> 3) / 32), a2 = new Uint8Array(32 * n2);
        for (let t3 = 0; t3 < n2; t3++) {
          let n3 = new Uint8Array(4 + e10.length + r2.length);
          n3.set(A(t3 + 1)), n3.set(e10, 4), n3.set(r2, 4 + e10.length), a2.set(await b("sha256", n3), 32 * t3);
        }
        return a2.slice(0, t2 >> 3);
      }
      let R = (e10) => {
        let t2 = e10;
        "string" == typeof t2 && (t2 = v.encode(t2));
        let r2 = [];
        for (let e11 = 0; e11 < t2.length; e11 += 32768) r2.push(String.fromCharCode.apply(null, t2.subarray(e11, e11 + 32768)));
        return btoa(r2.join(""));
      }, T = (e10) => R(e10).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"), O = (e10) => {
        let t2 = atob(e10), r2 = new Uint8Array(t2.length);
        for (let e11 = 0; e11 < t2.length; e11++) r2[e11] = t2.charCodeAt(e11);
        return r2;
      }, k = (e10) => {
        let t2 = e10;
        t2 instanceof Uint8Array && (t2 = _.decode(t2)), t2 = t2.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
        try {
          return O(t2);
        } catch (e11) {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }, I = T, N = k;
      var H = e.i(41199);
      e.i(72460);
      let M = w.getRandomValues.bind(w);
      function D(e10) {
        switch (e10) {
          case "A128GCM":
          case "A128GCMKW":
          case "A192GCM":
          case "A192GCMKW":
          case "A256GCM":
          case "A256GCMKW":
            return 96;
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return 128;
          default:
            throw new i(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      let j = (e10) => M(new Uint8Array(D(e10) >> 3)), U = (e10, t2) => {
        if (t2.length << 3 !== D(e10)) throw new l("Invalid Initialization Vector length");
      }, W = (e10, t2) => {
        let r2 = e10.byteLength << 3;
        if (r2 !== t2) throw new l(`Invalid Content Encryption Key length. Expected ${t2} bits, got ${r2} bits`);
      };
      function K(e10, t2 = "algorithm.name") {
        return TypeError(`CryptoKey does not support this operation, its ${t2} must be ${e10}`);
      }
      function L(e10, t2) {
        return e10.name === t2;
      }
      function J(e10) {
        return parseInt(e10.name.slice(4), 10);
      }
      function B(e10, t2) {
        if (t2.length && !t2.some((t3) => e10.usages.includes(t3))) {
          let e11 = "CryptoKey does not support this operation, its usages must include ";
          if (t2.length > 2) {
            let r2 = t2.pop();
            e11 += `one of ${t2.join(", ")}, or ${r2}.`;
          } else 2 === t2.length ? e11 += `one of ${t2[0]} or ${t2[1]}.` : e11 += `${t2[0]}.`;
          throw TypeError(e11);
        }
      }
      function $(e10, t2, ...r2) {
        switch (t2) {
          case "A128GCM":
          case "A192GCM":
          case "A256GCM": {
            if (!L(e10.algorithm, "AES-GCM")) throw K("AES-GCM");
            let r3 = parseInt(t2.slice(1, 4), 10);
            if (e10.algorithm.length !== r3) throw K(r3, "algorithm.length");
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW": {
            if (!L(e10.algorithm, "AES-KW")) throw K("AES-KW");
            let r3 = parseInt(t2.slice(1, 4), 10);
            if (e10.algorithm.length !== r3) throw K(r3, "algorithm.length");
            break;
          }
          case "ECDH":
            switch (e10.algorithm.name) {
              case "ECDH":
              case "X25519":
              case "X448":
                break;
              default:
                throw K("ECDH, X25519, or X448");
            }
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW":
            if (!L(e10.algorithm, "PBKDF2")) throw K("PBKDF2");
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512": {
            if (!L(e10.algorithm, "RSA-OAEP")) throw K("RSA-OAEP");
            let r3 = parseInt(t2.slice(9), 10) || 1;
            if (J(e10.algorithm.hash) !== r3) throw K(`SHA-${r3}`, "algorithm.hash");
            break;
          }
          default:
            throw TypeError("CryptoKey does not support this operation");
        }
        B(e10, r2);
      }
      function V(e10, t2, ...r2) {
        if (r2.length > 2) {
          let t3 = r2.pop();
          e10 += `one of type ${r2.join(", ")}, or ${t3}.`;
        } else 2 === r2.length ? e10 += `one of type ${r2[0]} or ${r2[1]}.` : e10 += `of type ${r2[0]}.`;
        return null == t2 ? e10 += ` Received ${t2}` : "function" == typeof t2 && t2.name ? e10 += ` Received function ${t2.name}` : "object" == typeof t2 && null != t2 && t2.constructor && t2.constructor.name && (e10 += ` Received an instance of ${t2.constructor.name}`), e10;
      }
      let G = (e10, ...t2) => V("Key must be ", e10, ...t2);
      function q(e10, t2, ...r2) {
        return V(`Key for the ${e10} algorithm must be `, t2, ...r2);
      }
      let z = ["CryptoKey"];
      async function F(e10, t2, r2, n2, a2, i2) {
        let s2, l2;
        if (!(t2 instanceof Uint8Array)) throw TypeError(G(t2, "Uint8Array"));
        let c2 = parseInt(e10.slice(1, 4), 10), u2 = await w.subtle.importKey("raw", t2.subarray(c2 >> 3), "AES-CBC", false, ["decrypt"]), d2 = await w.subtle.importKey("raw", t2.subarray(0, c2 >> 3), { hash: `SHA-${c2 << 1}`, name: "HMAC" }, false, ["sign"]), p2 = E(i2, n2, r2, x(i2.length << 3)), h2 = new Uint8Array((await w.subtle.sign("HMAC", d2, p2)).slice(0, c2 >> 3));
        try {
          s2 = ((e11, t3) => {
            if (!(e11 instanceof Uint8Array)) throw TypeError("First argument must be a buffer");
            if (!(t3 instanceof Uint8Array)) throw TypeError("Second argument must be a buffer");
            if (e11.length !== t3.length) throw TypeError("Input buffers must have the same length");
            let r3 = e11.length, n3 = 0, a3 = -1;
            for (; ++a3 < r3; ) n3 |= e11[a3] ^ t3[a3];
            return 0 === n3;
          })(a2, h2);
        } catch (e11) {
        }
        if (!s2) throw new o();
        try {
          l2 = new Uint8Array(await w.subtle.decrypt({ iv: n2, name: "AES-CBC" }, u2, r2));
        } catch (e11) {
        }
        if (!l2) throw new o();
        return l2;
      }
      async function X(e10, t2, r2, n2, a2, i2) {
        let s2;
        t2 instanceof Uint8Array ? s2 = await w.subtle.importKey("raw", t2, "AES-GCM", false, ["decrypt"]) : ($(t2, e10, "decrypt"), s2 = t2);
        try {
          return new Uint8Array(await w.subtle.decrypt({ additionalData: i2, iv: n2, name: "AES-GCM", tagLength: 128 }, s2, E(r2, a2)));
        } catch (e11) {
          throw new o();
        }
      }
      let Y = async (e10, t2, r2, n2, a2, o2) => {
        if (!(t2 instanceof CryptoKey) && !(t2 instanceof Uint8Array)) throw TypeError(G(t2, ...z, "Uint8Array"));
        switch (U(e10, n2), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return t2 instanceof Uint8Array && W(t2, parseInt(e10.slice(-3), 10)), F(e10, t2, r2, n2, a2, o2);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return t2 instanceof Uint8Array && W(t2, parseInt(e10.slice(1, 4), 10)), X(e10, t2, r2, n2, a2, o2);
          default:
            throw new i("Unsupported JWE Content Encryption Algorithm");
        }
      }, Q = async () => {
        throw new i('JWE "zip" (Compression Algorithm) Header Parameter is not supported by your javascript runtime. You need to use the `inflateRaw` decrypt option to provide Inflate Raw implementation.');
      }, Z = async () => {
        throw new i('JWE "zip" (Compression Algorithm) Header Parameter is not supported by your javascript runtime. You need to use the `deflateRaw` encrypt option to provide Deflate Raw implementation.');
      }, ee = (...e10) => {
        let t2, r2 = e10.filter(Boolean);
        if (0 === r2.length || 1 === r2.length) return true;
        for (let e11 of r2) {
          let r3 = Object.keys(e11);
          if (!t2 || 0 === t2.size) {
            t2 = new Set(r3);
            continue;
          }
          for (let e12 of r3) {
            if (t2.has(e12)) return false;
            t2.add(e12);
          }
        }
        return true;
      };
      function et(e10) {
        if ("object" != typeof e10 || null === e10 || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t2 = e10;
        for (; null !== Object.getPrototypeOf(t2); ) t2 = Object.getPrototypeOf(t2);
        return Object.getPrototypeOf(e10) === t2;
      }
      let er = [{ hash: "SHA-256", name: "HMAC" }, true, ["sign"]];
      function en(e10, t2) {
        if (e10.algorithm.length !== parseInt(t2.slice(1, 4), 10)) throw TypeError(`Invalid key size for alg: ${t2}`);
      }
      function ea(e10, t2, r2) {
        if (e10 instanceof CryptoKey) return $(e10, t2, r2), e10;
        if (e10 instanceof Uint8Array) return w.subtle.importKey("raw", e10, "AES-KW", true, [r2]);
        throw TypeError(G(e10, ...z, "Uint8Array"));
      }
      let ei = async (e10, t2, r2) => {
        let n2 = await ea(t2, e10, "wrapKey");
        en(n2, e10);
        let a2 = await w.subtle.importKey("raw", r2, ...er);
        return new Uint8Array(await w.subtle.wrapKey("raw", a2, n2, "AES-KW"));
      }, eo = async (e10, t2, r2) => {
        let n2 = await ea(t2, e10, "unwrapKey");
        en(n2, e10);
        let a2 = await w.subtle.unwrapKey("raw", r2, n2, "AES-KW", ...er);
        return new Uint8Array(await w.subtle.exportKey("raw", a2));
      };
      async function es(e10, t2, r2, n2, a2 = new Uint8Array(0), i2 = new Uint8Array(0)) {
        let o2;
        if (!(e10 instanceof CryptoKey)) throw TypeError(G(e10, ...z));
        if ($(e10, "ECDH"), !(t2 instanceof CryptoKey)) throw TypeError(G(t2, ...z));
        $(t2, "ECDH", "deriveBits");
        let s2 = E(C(v.encode(r2)), C(a2), C(i2), A(n2));
        return o2 = "X25519" === e10.algorithm.name ? 256 : "X448" === e10.algorithm.name ? 448 : Math.ceil(parseInt(e10.algorithm.namedCurve.substr(-3), 10) / 8) << 3, P(new Uint8Array(await w.subtle.deriveBits({ name: e10.algorithm.name, public: e10 }, t2, o2)), n2, s2);
      }
      async function el(e10) {
        if (!(e10 instanceof CryptoKey)) throw TypeError(G(e10, ...z));
        return w.subtle.generateKey(e10.algorithm, true, ["deriveBits"]);
      }
      function ec(e10) {
        if (!(e10 instanceof CryptoKey)) throw TypeError(G(e10, ...z));
        return ["P-256", "P-384", "P-521"].includes(e10.algorithm.namedCurve) || "X25519" === e10.algorithm.name || "X448" === e10.algorithm.name;
      }
      async function eu(e10, t2, r2, n2) {
        if (!(e10 instanceof Uint8Array) || e10.length < 8) throw new l("PBES2 Salt Input must be 8 or more octets");
        let a2 = E(v.encode(t2), new Uint8Array([0]), e10), i2 = parseInt(t2.slice(13, 16), 10), o2 = { hash: `SHA-${t2.slice(8, 11)}`, iterations: r2, name: "PBKDF2", salt: a2 }, s2 = await function(e11, t3) {
          if (e11 instanceof Uint8Array) return w.subtle.importKey("raw", e11, "PBKDF2", false, ["deriveBits"]);
          if (e11 instanceof CryptoKey) return $(e11, t3, "deriveBits", "deriveKey"), e11;
          throw TypeError(G(e11, ...z, "Uint8Array"));
        }(n2, t2);
        if (s2.usages.includes("deriveBits")) return new Uint8Array(await w.subtle.deriveBits(o2, s2, i2));
        if (s2.usages.includes("deriveKey")) return w.subtle.deriveKey(o2, s2, { length: i2, name: "AES-KW" }, false, ["wrapKey", "unwrapKey"]);
        throw TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
      }
      let ed = async (e10, t2, r2, n2 = 2048, a2 = M(new Uint8Array(16))) => {
        let i2 = await eu(a2, e10, n2, t2);
        return { encryptedKey: await ei(e10.slice(-6), i2, r2), p2c: n2, p2s: T(a2) };
      }, ep = async (e10, t2, r2, n2, a2) => {
        let i2 = await eu(a2, e10, n2, t2);
        return eo(e10.slice(-6), i2, r2);
      };
      function eh(e10) {
        switch (e10) {
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return "RSA-OAEP";
          default:
            throw new i(`alg ${e10} is not supported either by JOSE or your javascript runtime`);
        }
      }
      let ef = (e10, t2) => {
        if (e10.startsWith("RS") || e10.startsWith("PS")) {
          let { modulusLength: r2 } = t2.algorithm;
          if ("number" != typeof r2 || r2 < 2048) throw TypeError(`${e10} requires key modulusLength to be 2048 bits or larger`);
        }
      }, eg = async (e10, t2, r2) => {
        if (!(t2 instanceof CryptoKey)) throw TypeError(G(t2, ...z));
        if ($(t2, e10, "encrypt", "wrapKey"), ef(e10, t2), t2.usages.includes("encrypt")) return new Uint8Array(await w.subtle.encrypt(eh(e10), t2, r2));
        if (t2.usages.includes("wrapKey")) {
          let n2 = await w.subtle.importKey("raw", r2, ...er);
          return new Uint8Array(await w.subtle.wrapKey("raw", n2, t2, eh(e10)));
        }
        throw TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
      }, ey = async (e10, t2, r2) => {
        if (!(t2 instanceof CryptoKey)) throw TypeError(G(t2, ...z));
        if ($(t2, e10, "decrypt", "unwrapKey"), ef(e10, t2), t2.usages.includes("decrypt")) return new Uint8Array(await w.subtle.decrypt(eh(e10), t2, r2));
        if (t2.usages.includes("unwrapKey")) {
          let n2 = await w.subtle.unwrapKey("raw", r2, t2, eh(e10), ...er);
          return new Uint8Array(await w.subtle.exportKey("raw", n2));
        }
        throw TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
      };
      function em(e10) {
        switch (e10) {
          case "A128GCM":
            return 128;
          case "A192GCM":
            return 192;
          case "A256GCM":
          case "A128CBC-HS256":
            return 256;
          case "A192CBC-HS384":
            return 384;
          case "A256CBC-HS512":
            return 512;
          default:
            throw new i(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      let ew = (e10) => M(new Uint8Array(em(e10) >> 3)), eb = (e10, t2) => {
        let r2 = (e10.match(/.{1,64}/g) || []).join("\n");
        return `-----BEGIN ${t2}-----
${r2}
-----END ${t2}-----`;
      }, ev = async (e10, t2, r2) => {
        if (!(r2 instanceof CryptoKey)) throw TypeError(G(r2, ...z));
        if (!r2.extractable) throw TypeError("CryptoKey is not extractable");
        if (r2.type !== e10) throw TypeError(`key is not a ${e10} key`);
        return eb(R(new Uint8Array(await w.subtle.exportKey(t2, r2))), `${e10.toUpperCase()} KEY`);
      }, e_ = (e10, t2, r2 = 0) => {
        0 === r2 && (t2.unshift(t2.length), t2.unshift(6));
        let n2 = e10.indexOf(t2[0], r2);
        if (-1 === n2) return false;
        let a2 = e10.subarray(n2, n2 + t2.length);
        return a2.length === t2.length && (a2.every((e11, r3) => e11 === t2[r3]) || e_(e10, t2, n2 + 1));
      }, eE = (e10) => {
        switch (true) {
          case e_(e10, [42, 134, 72, 206, 61, 3, 1, 7]):
            return "P-256";
          case e_(e10, [43, 129, 4, 0, 34]):
            return "P-384";
          case e_(e10, [43, 129, 4, 0, 35]):
            return "P-521";
          case e_(e10, [43, 101, 110]):
            return "X25519";
          case e_(e10, [43, 101, 111]):
            return "X448";
          case e_(e10, [43, 101, 112]):
            return "Ed25519";
          case e_(e10, [43, 101, 113]):
            return "Ed448";
          default:
            throw new i("Invalid or unsupported EC Key Curve or OKP Key Sub Type");
        }
      }, eS = async (e10, t2, r2, n2, a2) => {
        var o2;
        let s2, l2, c2 = new Uint8Array(atob(r2.replace(e10, "")).split("").map((e11) => e11.charCodeAt(0))), u2 = "spki" === t2;
        switch (n2) {
          case "PS256":
          case "PS384":
          case "PS512":
            s2 = { name: "RSA-PSS", hash: `SHA-${n2.slice(-3)}` }, l2 = u2 ? ["verify"] : ["sign"];
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            s2 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${n2.slice(-3)}` }, l2 = u2 ? ["verify"] : ["sign"];
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            s2 = { name: "RSA-OAEP", hash: `SHA-${parseInt(n2.slice(-3), 10) || 1}` }, l2 = u2 ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
            break;
          case "ES256":
            s2 = { name: "ECDSA", namedCurve: "P-256" }, l2 = u2 ? ["verify"] : ["sign"];
            break;
          case "ES384":
            s2 = { name: "ECDSA", namedCurve: "P-384" }, l2 = u2 ? ["verify"] : ["sign"];
            break;
          case "ES512":
            s2 = { name: "ECDSA", namedCurve: "P-521" }, l2 = u2 ? ["verify"] : ["sign"];
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let e11 = eE(c2);
            s2 = e11.startsWith("P-") ? { name: "ECDH", namedCurve: e11 } : { name: e11 }, l2 = u2 ? [] : ["deriveBits"];
            break;
          }
          case "EdDSA":
            s2 = { name: eE(c2) }, l2 = u2 ? ["verify"] : ["sign"];
            break;
          default:
            throw new i('Invalid or unsupported "alg" (Algorithm) value');
        }
        return w.subtle.importKey(t2, c2, s2, null != (o2 = null == a2 ? void 0 : a2.extractable) && o2, l2);
      }, ex = (e10, t2, r2) => eS(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, "spki", e10, t2, r2);
      function eA(e10) {
        let t2 = [], r2 = 0;
        for (; r2 < e10.length; ) {
          let n2 = eC(e10.subarray(r2));
          t2.push(n2), r2 += n2.byteLength;
        }
        return t2;
      }
      function eC(e10) {
        let t2 = 0, r2 = 31 & e10[0];
        if (t2++, 31 === r2) {
          for (r2 = 0; e10[t2] >= 128; ) r2 = 128 * r2 + e10[t2] - 128, t2++;
          r2 = 128 * r2 + e10[t2] - 128, t2++;
        }
        let n2 = 0;
        if (e10[t2] < 128) n2 = e10[t2], t2++;
        else if (128 === n2) {
          for (n2 = 0; 0 !== e10[t2 + n2] || 0 !== e10[t2 + n2 + 1]; ) {
            if (n2 > e10.byteLength) throw TypeError("invalid indefinite form length");
            n2++;
          }
          let r3 = t2 + n2 + 2;
          return { byteLength: r3, contents: e10.subarray(t2, t2 + n2), raw: e10.subarray(0, r3) };
        } else {
          let r3 = 127 & e10[t2];
          t2++, n2 = 0;
          for (let a3 = 0; a3 < r3; a3++) n2 = 256 * n2 + e10[t2], t2++;
        }
        let a2 = t2 + n2;
        return { byteLength: a2, contents: e10.subarray(t2, a2), raw: e10.subarray(0, a2) };
      }
      let eP = async (e10) => {
        var t2, r2;
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: n2, keyUsages: a2 } = function(e11) {
          let t3, r3;
          switch (e11.kty) {
            case "oct":
              switch (e11.alg) {
                case "HS256":
                case "HS384":
                case "HS512":
                  t3 = { name: "HMAC", hash: `SHA-${e11.alg.slice(-3)}` }, r3 = ["sign", "verify"];
                  break;
                case "A128CBC-HS256":
                case "A192CBC-HS384":
                case "A256CBC-HS512":
                  throw new i(`${e11.alg} keys cannot be imported as CryptoKey instances`);
                case "A128GCM":
                case "A192GCM":
                case "A256GCM":
                case "A128GCMKW":
                case "A192GCMKW":
                case "A256GCMKW":
                  t3 = { name: "AES-GCM" }, r3 = ["encrypt", "decrypt"];
                  break;
                case "A128KW":
                case "A192KW":
                case "A256KW":
                  t3 = { name: "AES-KW" }, r3 = ["wrapKey", "unwrapKey"];
                  break;
                case "PBES2-HS256+A128KW":
                case "PBES2-HS384+A192KW":
                case "PBES2-HS512+A256KW":
                  t3 = { name: "PBKDF2" }, r3 = ["deriveBits"];
                  break;
                default:
                  throw new i('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t3 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t3 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t3 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e11.alg.slice(-3), 10) || 1}` }, r3 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new i('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                  t3 = { name: "ECDSA", namedCurve: "P-256" }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES384":
                  t3 = { name: "ECDSA", namedCurve: "P-384" }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES512":
                  t3 = { name: "ECDSA", namedCurve: "P-521" }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t3 = { name: "ECDH", namedCurve: e11.crv }, r3 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new i('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "EdDSA":
                  t3 = { name: e11.crv }, r3 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t3 = { name: e11.crv }, r3 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new i('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            default:
              throw new i('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t3, keyUsages: r3 };
        }(e10), o2 = [n2, null != (t2 = e10.ext) && t2, null != (r2 = e10.key_ops) ? r2 : a2];
        if ("PBKDF2" === n2.name) return w.subtle.importKey("raw", k(e10.k), ...o2);
        let s2 = { ...e10 };
        return delete s2.alg, delete s2.use, w.subtle.importKey("jwk", s2, ...o2);
      };
      async function eR(e10, t2, r2) {
        if ("string" != typeof e10 || 0 !== e10.indexOf("-----BEGIN PUBLIC KEY-----")) throw TypeError('"spki" must be SPKI formatted string');
        return ex(e10, t2, r2);
      }
      async function eT(e10, t2, r2) {
        let n2;
        if ("string" != typeof e10 || 0 !== e10.indexOf("-----BEGIN CERTIFICATE-----")) throw TypeError('"x509" must be X.509 formatted string');
        try {
          n2 = eb(function(e11) {
            let t3 = eA(eA(eC(e11).contents)[0].contents);
            return R(t3[160 === t3[0].raw[0] ? 6 : 5].raw);
          }(O(e10.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, ""))), "PUBLIC KEY");
        } catch (e11) {
          throw TypeError("Failed to parse the X.509 certificate", { cause: e11 });
        }
        return ex(n2, t2, r2);
      }
      async function eO(e10, t2, r2) {
        if ("string" != typeof e10 || 0 !== e10.indexOf("-----BEGIN PRIVATE KEY-----")) throw TypeError('"pkcs8" must be PKCS#8 formatted string');
        return eS(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "pkcs8", e10, t2, r2);
      }
      async function ek(e10, t2, r2) {
        var n2;
        if (!et(e10)) throw TypeError("JWK must be an object");
        switch (t2 || (t2 = e10.alg), e10.kty) {
          case "oct":
            if ("string" != typeof e10.k || !e10.k) throw TypeError('missing "k" (Key Value) Parameter value');
            if (null != r2 || (r2 = true !== e10.ext), r2) return eP({ ...e10, alg: t2, ext: null != (n2 = e10.ext) && n2 });
            return k(e10.k);
          case "RSA":
            if (void 0 !== e10.oth) throw new i('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
          case "EC":
          case "OKP":
            return eP({ ...e10, alg: t2 });
          default:
            throw new i('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      let eI = (e10, t2, r2) => {
        e10.startsWith("HS") || "dir" === e10 || e10.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(e10) ? ((e11, t3) => {
          if (!(t3 instanceof Uint8Array)) {
            if (!(t3 instanceof CryptoKey)) throw TypeError(q(e11, t3, ...z, "Uint8Array"));
            if ("secret" !== t3.type) throw TypeError(`${z.join(" or ")} instances for symmetric algorithms must be of type "secret"`);
          }
        })(e10, t2) : ((e11, t3, r3) => {
          if (!(t3 instanceof CryptoKey)) throw TypeError(q(e11, t3, ...z));
          if ("secret" === t3.type) throw TypeError(`${z.join(" or ")} instances for asymmetric algorithms must not be of type "secret"`);
          if ("sign" === r3 && "public" === t3.type) throw TypeError(`${z.join(" or ")} instances for asymmetric algorithm signing must be of type "private"`);
          if ("decrypt" === r3 && "public" === t3.type) throw TypeError(`${z.join(" or ")} instances for asymmetric algorithm decryption must be of type "private"`);
          if (t3.algorithm && "verify" === r3 && "private" === t3.type) throw TypeError(`${z.join(" or ")} instances for asymmetric algorithm verifying must be of type "public"`);
          if (t3.algorithm && "encrypt" === r3 && "private" === t3.type) throw TypeError(`${z.join(" or ")} instances for asymmetric algorithm encryption must be of type "public"`);
        })(e10, t2, r2);
      };
      async function eN(e10, t2, r2, n2, a2) {
        if (!(r2 instanceof Uint8Array)) throw TypeError(G(r2, "Uint8Array"));
        let i2 = parseInt(e10.slice(1, 4), 10), o2 = await w.subtle.importKey("raw", r2.subarray(i2 >> 3), "AES-CBC", false, ["encrypt"]), s2 = await w.subtle.importKey("raw", r2.subarray(0, i2 >> 3), { hash: `SHA-${i2 << 1}`, name: "HMAC" }, false, ["sign"]), l2 = new Uint8Array(await w.subtle.encrypt({ iv: n2, name: "AES-CBC" }, o2, t2)), c2 = E(a2, n2, l2, x(a2.length << 3));
        return { ciphertext: l2, tag: new Uint8Array((await w.subtle.sign("HMAC", s2, c2)).slice(0, i2 >> 3)) };
      }
      async function eH(e10, t2, r2, n2, a2) {
        let i2;
        r2 instanceof Uint8Array ? i2 = await w.subtle.importKey("raw", r2, "AES-GCM", false, ["encrypt"]) : ($(r2, e10, "encrypt"), i2 = r2);
        let o2 = new Uint8Array(await w.subtle.encrypt({ additionalData: a2, iv: n2, name: "AES-GCM", tagLength: 128 }, i2, t2)), s2 = o2.slice(-16);
        return { ciphertext: o2.slice(0, -16), tag: s2 };
      }
      let eM = async (e10, t2, r2, n2, a2) => {
        if (!(r2 instanceof CryptoKey) && !(r2 instanceof Uint8Array)) throw TypeError(G(r2, ...z, "Uint8Array"));
        switch (U(e10, n2), e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return r2 instanceof Uint8Array && W(r2, parseInt(e10.slice(-3), 10)), eN(e10, t2, r2, n2, a2);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return r2 instanceof Uint8Array && W(r2, parseInt(e10.slice(1, 4), 10)), eH(e10, t2, r2, n2, a2);
          default:
            throw new i("Unsupported JWE Content Encryption Algorithm");
        }
      };
      async function eD(e10, t2, r2, n2) {
        let a2 = e10.slice(0, 7);
        n2 || (n2 = j(a2));
        let { ciphertext: i2, tag: o2 } = await eM(a2, r2, t2, n2, new Uint8Array(0));
        return { encryptedKey: i2, iv: T(n2), tag: T(o2) };
      }
      async function ej(e10, t2, r2, n2, a2) {
        return Y(e10.slice(0, 7), t2, r2, n2, a2, new Uint8Array(0));
      }
      async function eU(e10, t2, r2, n2, a2) {
        switch (eI(e10, t2, "decrypt"), e10) {
          case "dir":
            if (void 0 !== r2) throw new l("Encountered unexpected JWE Encrypted Key");
            return t2;
          case "ECDH-ES":
            if (void 0 !== r2) throw new l("Encountered unexpected JWE Encrypted Key");
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let a3, o2;
            if (!et(n2.epk)) throw new l('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
            if (!ec(t2)) throw new i("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let s2 = await ek(n2.epk, e10);
            if (void 0 !== n2.apu) {
              if ("string" != typeof n2.apu) throw new l('JOSE Header "apu" (Agreement PartyUInfo) invalid');
              try {
                a3 = k(n2.apu);
              } catch (e11) {
                throw new l("Failed to base64url decode the apu");
              }
            }
            if (void 0 !== n2.apv) {
              if ("string" != typeof n2.apv) throw new l('JOSE Header "apv" (Agreement PartyVInfo) invalid');
              try {
                o2 = k(n2.apv);
              } catch (e11) {
                throw new l("Failed to base64url decode the apv");
              }
            }
            let c2 = await es(s2, t2, "ECDH-ES" === e10 ? n2.enc : e10, "ECDH-ES" === e10 ? em(n2.enc) : parseInt(e10.slice(-5, -2), 10), a3, o2);
            if ("ECDH-ES" === e10) return c2;
            if (void 0 === r2) throw new l("JWE Encrypted Key missing");
            return eo(e10.slice(-6), c2, r2);
          }
          case "RSA1_5":
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            if (void 0 === r2) throw new l("JWE Encrypted Key missing");
            return ey(e10, t2, r2);
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            let i2;
            if (void 0 === r2) throw new l("JWE Encrypted Key missing");
            if ("number" != typeof n2.p2c) throw new l('JOSE Header "p2c" (PBES2 Count) missing or invalid');
            let o2 = (null == a2 ? void 0 : a2.maxPBES2Count) || 1e4;
            if (n2.p2c > o2) throw new l('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
            if ("string" != typeof n2.p2s) throw new l('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
            try {
              i2 = k(n2.p2s);
            } catch (e11) {
              throw new l("Failed to base64url decode the p2s");
            }
            return ep(e10, t2, r2, n2.p2c, i2);
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            if (void 0 === r2) throw new l("JWE Encrypted Key missing");
            return eo(e10, t2, r2);
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            let a3, i2;
            if (void 0 === r2) throw new l("JWE Encrypted Key missing");
            if ("string" != typeof n2.iv) throw new l('JOSE Header "iv" (Initialization Vector) missing or invalid');
            if ("string" != typeof n2.tag) throw new l('JOSE Header "tag" (Authentication Tag) missing or invalid');
            try {
              a3 = k(n2.iv);
            } catch (e11) {
              throw new l("Failed to base64url decode the iv");
            }
            try {
              i2 = k(n2.tag);
            } catch (e11) {
              throw new l("Failed to base64url decode the tag");
            }
            return ej(e10, t2, r2, a3, i2);
          }
          default:
            throw new i('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
      }
      let eW = function(e10, t2, r2, n2, a2) {
        let o2;
        if (void 0 !== a2.crit && void 0 === n2.crit) throw new e10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!n2 || void 0 === n2.crit) return /* @__PURE__ */ new Set();
        if (!Array.isArray(n2.crit) || 0 === n2.crit.length || n2.crit.some((e11) => "string" != typeof e11 || 0 === e11.length)) throw new e10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        for (let s2 of (o2 = void 0 !== r2 ? new Map([...Object.entries(r2), ...t2.entries()]) : t2, n2.crit)) {
          if (!o2.has(s2)) throw new i(`Extension Header Parameter "${s2}" is not recognized`);
          if (void 0 === a2[s2]) throw new e10(`Extension Header Parameter "${s2}" is missing`);
          if (o2.get(s2) && void 0 === n2[s2]) throw new e10(`Extension Header Parameter "${s2}" MUST be integrity protected`);
        }
        return new Set(n2.crit);
      }, eK = (e10, t2) => {
        if (void 0 !== t2 && (!Array.isArray(t2) || t2.some((e11) => "string" != typeof e11))) throw TypeError(`"${e10}" option must be an array of strings`);
        if (t2) return new Set(t2);
      };
      async function eL(e10, t2, r2) {
        var n2;
        let o2, s2, c2, u2, d2, p2, h2;
        if (!et(e10)) throw new l("Flattened JWE must be an object");
        if (void 0 === e10.protected && void 0 === e10.header && void 0 === e10.unprotected) throw new l("JOSE Header missing");
        if ("string" != typeof e10.iv) throw new l("JWE Initialization Vector missing or incorrect type");
        if ("string" != typeof e10.ciphertext) throw new l("JWE Ciphertext missing or incorrect type");
        if ("string" != typeof e10.tag) throw new l("JWE Authentication Tag missing or incorrect type");
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new l("JWE Protected Header incorrect type");
        if (void 0 !== e10.encrypted_key && "string" != typeof e10.encrypted_key) throw new l("JWE Encrypted Key incorrect type");
        if (void 0 !== e10.aad && "string" != typeof e10.aad) throw new l("JWE AAD incorrect type");
        if (void 0 !== e10.header && !et(e10.header)) throw new l("JWE Shared Unprotected Header incorrect type");
        if (void 0 !== e10.unprotected && !et(e10.unprotected)) throw new l("JWE Per-Recipient Unprotected Header incorrect type");
        if (e10.protected) try {
          let t3 = k(e10.protected);
          o2 = JSON.parse(_.decode(t3));
        } catch (e11) {
          throw new l("JWE Protected Header is invalid");
        }
        if (!ee(o2, e10.header, e10.unprotected)) throw new l("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
        let f2 = { ...o2, ...e10.header, ...e10.unprotected };
        if (eW(l, /* @__PURE__ */ new Map(), null == r2 ? void 0 : r2.crit, o2, f2), void 0 !== f2.zip) {
          if (!o2 || !o2.zip) throw new l('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
          if ("DEF" !== f2.zip) throw new i('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
        }
        let { alg: g2, enc: y2 } = f2;
        if ("string" != typeof g2 || !g2) throw new l("missing JWE Algorithm (alg) in JWE Header");
        if ("string" != typeof y2 || !y2) throw new l("missing JWE Encryption Algorithm (enc) in JWE Header");
        let m2 = r2 && eK("keyManagementAlgorithms", r2.keyManagementAlgorithms), w2 = r2 && eK("contentEncryptionAlgorithms", r2.contentEncryptionAlgorithms);
        if (m2 && !m2.has(g2)) throw new a('"alg" (Algorithm) Header Parameter not allowed');
        if (w2 && !w2.has(y2)) throw new a('"enc" (Encryption Algorithm) Header Parameter not allowed');
        if (void 0 !== e10.encrypted_key) try {
          s2 = k(e10.encrypted_key);
        } catch (e11) {
          throw new l("Failed to base64url decode the encrypted_key");
        }
        let b2 = false;
        "function" == typeof t2 && (t2 = await t2(o2, e10), b2 = true);
        try {
          c2 = await eU(g2, t2, s2, f2, r2);
        } catch (e11) {
          if (e11 instanceof TypeError || e11 instanceof l || e11 instanceof i) throw e11;
          c2 = ew(y2);
        }
        try {
          u2 = k(e10.iv);
        } catch (e11) {
          throw new l("Failed to base64url decode the iv");
        }
        try {
          d2 = k(e10.tag);
        } catch (e11) {
          throw new l("Failed to base64url decode the tag");
        }
        let S2 = v.encode(null != (n2 = e10.protected) ? n2 : "");
        p2 = void 0 !== e10.aad ? E(S2, v.encode("."), v.encode(e10.aad)) : S2;
        try {
          h2 = k(e10.ciphertext);
        } catch (e11) {
          throw new l("Failed to base64url decode the ciphertext");
        }
        let x2 = await Y(y2, c2, h2, u2, d2, p2);
        "DEF" === f2.zip && (x2 = await ((null == r2 ? void 0 : r2.inflateRaw) || Q)(x2));
        let A2 = { plaintext: x2 };
        if (void 0 !== e10.protected && (A2.protectedHeader = o2), void 0 !== e10.aad) try {
          A2.additionalAuthenticatedData = k(e10.aad);
        } catch (e11) {
          throw new l("Failed to base64url decode the aad");
        }
        return (void 0 !== e10.unprotected && (A2.sharedUnprotectedHeader = e10.unprotected), void 0 !== e10.header && (A2.unprotectedHeader = e10.header), b2) ? { ...A2, key: t2 } : A2;
      }
      async function eJ(e10, t2, r2) {
        if (e10 instanceof Uint8Array && (e10 = _.decode(e10)), "string" != typeof e10) throw new l("Compact JWE must be a string or Uint8Array");
        let { 0: n2, 1: a2, 2: i2, 3: o2, 4: s2, length: c2 } = e10.split(".");
        if (5 !== c2) throw new l("Invalid Compact JWE");
        let u2 = await eL({ ciphertext: o2, iv: i2 || void 0, protected: n2 || void 0, tag: s2 || void 0, encrypted_key: a2 || void 0 }, t2, r2), d2 = { plaintext: u2.plaintext, protectedHeader: u2.protectedHeader };
        return "function" == typeof t2 ? { ...d2, key: u2.key } : d2;
      }
      async function eB(e10, t2, r2) {
        if (!et(e10)) throw new l("General JWE must be an object");
        if (!Array.isArray(e10.recipients) || !e10.recipients.every(et)) throw new l("JWE Recipients missing or incorrect type");
        if (!e10.recipients.length) throw new l("JWE Recipients has no members");
        for (let n2 of e10.recipients) try {
          return await eL({ aad: e10.aad, ciphertext: e10.ciphertext, encrypted_key: n2.encrypted_key, header: n2.header, iv: e10.iv, protected: e10.protected, tag: e10.tag, unprotected: e10.unprotected }, t2, r2);
        } catch (e11) {
        }
        throw new o();
      }
      let e$ = async (e10) => {
        if (e10 instanceof Uint8Array) return { kty: "oct", k: T(e10) };
        if (!(e10 instanceof CryptoKey)) throw TypeError(G(e10, ...z, "Uint8Array"));
        if (!e10.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        let { ext: t2, key_ops: r2, alg: n2, use: a2, ...i2 } = await w.subtle.exportKey("jwk", e10);
        return i2;
      };
      async function eV(e10) {
        return ev("public", "spki", e10);
      }
      async function eG(e10) {
        return ev("private", "pkcs8", e10);
      }
      async function eq(e10) {
        return e$(e10);
      }
      async function ez(e10, t2, r2, n2, a2 = {}) {
        let o2, s2, l2;
        switch (eI(e10, r2, "encrypt"), e10) {
          case "dir":
            l2 = r2;
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            if (!ec(r2)) throw new i("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let { apu: c2, apv: u2 } = a2, { epk: d2 } = a2;
            d2 || (d2 = (await el(r2)).privateKey);
            let { x: p2, y: h2, crv: f2, kty: g2 } = await eq(d2), y2 = await es(r2, d2, "ECDH-ES" === e10 ? t2 : e10, "ECDH-ES" === e10 ? em(t2) : parseInt(e10.slice(-5, -2), 10), c2, u2);
            if (s2 = { epk: { x: p2, crv: f2, kty: g2 } }, "EC" === g2 && (s2.epk.y = h2), c2 && (s2.apu = T(c2)), u2 && (s2.apv = T(u2)), "ECDH-ES" === e10) {
              l2 = y2;
              break;
            }
            l2 = n2 || ew(t2);
            let m2 = e10.slice(-6);
            o2 = await ei(m2, y2, l2);
            break;
          }
          case "RSA1_5":
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            l2 = n2 || ew(t2), o2 = await eg(e10, r2, l2);
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            l2 = n2 || ew(t2);
            let { p2c: i2, p2s: c2 } = a2;
            ({ encryptedKey: o2, ...s2 } = await ed(e10, r2, l2, i2, c2));
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            l2 = n2 || ew(t2), o2 = await ei(e10, r2, l2);
            break;
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW": {
            l2 = n2 || ew(t2);
            let { iv: i2 } = a2;
            ({ encryptedKey: o2, ...s2 } = await eD(e10, r2, l2, i2));
            break;
          }
          default:
            throw new i('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
        return { cek: l2, encryptedKey: o2, parameters: s2 };
      }
      let eF = Symbol();
      class eX {
        constructor(e10) {
          if (!(e10 instanceof Uint8Array)) throw TypeError("plaintext must be an instance of Uint8Array");
          this._plaintext = e10;
        }
        setKeyManagementParameters(e10) {
          if (this._keyManagementParameters) throw TypeError("setKeyManagementParameters can only be called once");
          return this._keyManagementParameters = e10, this;
        }
        setProtectedHeader(e10) {
          if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this._protectedHeader = e10, this;
        }
        setSharedUnprotectedHeader(e10) {
          if (this._sharedUnprotectedHeader) throw TypeError("setSharedUnprotectedHeader can only be called once");
          return this._sharedUnprotectedHeader = e10, this;
        }
        setUnprotectedHeader(e10) {
          if (this._unprotectedHeader) throw TypeError("setUnprotectedHeader can only be called once");
          return this._unprotectedHeader = e10, this;
        }
        setAdditionalAuthenticatedData(e10) {
          return this._aad = e10, this;
        }
        setContentEncryptionKey(e10) {
          if (this._cek) throw TypeError("setContentEncryptionKey can only be called once");
          return this._cek = e10, this;
        }
        setInitializationVector(e10) {
          if (this._iv) throw TypeError("setInitializationVector can only be called once");
          return this._iv = e10, this;
        }
        async encrypt(e10, t2) {
          let r2, n2, a2, o2, s2, c2, u2;
          if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) throw new l("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
          if (!ee(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) throw new l("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
          let d2 = { ...this._protectedHeader, ...this._unprotectedHeader, ...this._sharedUnprotectedHeader };
          if (eW(l, /* @__PURE__ */ new Map(), null == t2 ? void 0 : t2.crit, this._protectedHeader, d2), void 0 !== d2.zip) {
            if (!this._protectedHeader || !this._protectedHeader.zip) throw new l('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
            if ("DEF" !== d2.zip) throw new i('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
          }
          let { alg: p2, enc: h2 } = d2;
          if ("string" != typeof p2 || !p2) throw new l('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          if ("string" != typeof h2 || !h2) throw new l('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          if ("dir" === p2) {
            if (this._cek) throw TypeError("setContentEncryptionKey cannot be called when using Direct Encryption");
          } else if ("ECDH-ES" === p2 && this._cek) throw TypeError("setContentEncryptionKey cannot be called when using Direct Key Agreement");
          {
            let a3;
            ({ cek: n2, encryptedKey: r2, parameters: a3 } = await ez(p2, h2, e10, this._cek, this._keyManagementParameters)), a3 && (t2 && eF in t2 ? this._unprotectedHeader ? this._unprotectedHeader = { ...this._unprotectedHeader, ...a3 } : this.setUnprotectedHeader(a3) : this._protectedHeader ? this._protectedHeader = { ...this._protectedHeader, ...a3 } : this.setProtectedHeader(a3));
          }
          if (this._iv || (this._iv = j(h2)), o2 = this._protectedHeader ? v.encode(T(JSON.stringify(this._protectedHeader))) : v.encode(""), this._aad ? (s2 = T(this._aad), a2 = E(o2, v.encode("."), v.encode(s2))) : a2 = o2, "DEF" === d2.zip) {
            let e11 = await ((null == t2 ? void 0 : t2.deflateRaw) || Z)(this._plaintext);
            ({ ciphertext: c2, tag: u2 } = await eM(h2, e11, n2, this._iv, a2));
          } else ({ ciphertext: c2, tag: u2 } = await eM(h2, this._plaintext, n2, this._iv, a2));
          let f2 = { ciphertext: T(c2), iv: T(this._iv), tag: T(u2) };
          return r2 && (f2.encrypted_key = T(r2)), s2 && (f2.aad = s2), this._protectedHeader && (f2.protected = _.decode(o2)), this._sharedUnprotectedHeader && (f2.unprotected = this._sharedUnprotectedHeader), this._unprotectedHeader && (f2.header = this._unprotectedHeader), f2;
        }
      }
      class eY {
        constructor(e10, t2, r2) {
          this.parent = e10, this.key = t2, this.options = r2;
        }
        setUnprotectedHeader(e10) {
          if (this.unprotectedHeader) throw TypeError("setUnprotectedHeader can only be called once");
          return this.unprotectedHeader = e10, this;
        }
        addRecipient(...e10) {
          return this.parent.addRecipient(...e10);
        }
        encrypt(...e10) {
          return this.parent.encrypt(...e10);
        }
        done() {
          return this.parent;
        }
      }
      class eQ {
        constructor(e10) {
          this._recipients = [], this._plaintext = e10;
        }
        addRecipient(e10, t2) {
          let r2 = new eY(this, e10, { crit: null == t2 ? void 0 : t2.crit });
          return this._recipients.push(r2), r2;
        }
        setProtectedHeader(e10) {
          if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this._protectedHeader = e10, this;
        }
        setSharedUnprotectedHeader(e10) {
          if (this._unprotectedHeader) throw TypeError("setSharedUnprotectedHeader can only be called once");
          return this._unprotectedHeader = e10, this;
        }
        setAdditionalAuthenticatedData(e10) {
          return this._aad = e10, this;
        }
        async encrypt(e10) {
          var t2, r2, n2;
          let a2;
          if (!this._recipients.length) throw new l("at least one recipient must be added");
          if (e10 = { deflateRaw: null == e10 ? void 0 : e10.deflateRaw }, 1 === this._recipients.length) {
            let [t3] = this._recipients, r3 = await new eX(this._plaintext).setAdditionalAuthenticatedData(this._aad).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(t3.unprotectedHeader).encrypt(t3.key, { ...t3.options, ...e10 }), n3 = { ciphertext: r3.ciphertext, iv: r3.iv, recipients: [{}], tag: r3.tag };
            return r3.aad && (n3.aad = r3.aad), r3.protected && (n3.protected = r3.protected), r3.unprotected && (n3.unprotected = r3.unprotected), r3.encrypted_key && (n3.recipients[0].encrypted_key = r3.encrypted_key), r3.header && (n3.recipients[0].header = r3.header), n3;
          }
          for (let e11 = 0; e11 < this._recipients.length; e11++) {
            let t3 = this._recipients[e11];
            if (!ee(this._protectedHeader, this._unprotectedHeader, t3.unprotectedHeader)) throw new l("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
            let r3 = { ...this._protectedHeader, ...this._unprotectedHeader, ...t3.unprotectedHeader }, { alg: n3 } = r3;
            if ("string" != typeof n3 || !n3) throw new l('JWE "alg" (Algorithm) Header Parameter missing or invalid');
            if ("dir" === n3 || "ECDH-ES" === n3) throw new l('"dir" and "ECDH-ES" alg may only be used with a single recipient');
            if ("string" != typeof r3.enc || !r3.enc) throw new l('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
            if (a2) {
              if (a2 !== r3.enc) throw new l('JWE "enc" (Encryption Algorithm) Header Parameter must be the same for all recipients');
            } else a2 = r3.enc;
            if (eW(l, /* @__PURE__ */ new Map(), t3.options.crit, this._protectedHeader, r3), void 0 !== r3.zip && (!this._protectedHeader || !this._protectedHeader.zip)) throw new l('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
          }
          let i2 = ew(a2), o2 = { ciphertext: "", iv: "", recipients: [], tag: "" };
          for (let s2 = 0; s2 < this._recipients.length; s2++) {
            let l2 = this._recipients[s2], c2 = {};
            o2.recipients.push(c2);
            let u2 = { ...this._protectedHeader, ...this._unprotectedHeader, ...l2.unprotectedHeader }.alg.startsWith("PBES2") ? 2048 + s2 : void 0;
            if (0 === s2) {
              let t3 = await new eX(this._plaintext).setAdditionalAuthenticatedData(this._aad).setContentEncryptionKey(i2).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(l2.unprotectedHeader).setKeyManagementParameters({ p2c: u2 }).encrypt(l2.key, { ...l2.options, ...e10, [eF]: true });
              o2.ciphertext = t3.ciphertext, o2.iv = t3.iv, o2.tag = t3.tag, t3.aad && (o2.aad = t3.aad), t3.protected && (o2.protected = t3.protected), t3.unprotected && (o2.unprotected = t3.unprotected), c2.encrypted_key = t3.encrypted_key, t3.header && (c2.header = t3.header);
              continue;
            }
            let { encryptedKey: d2, parameters: p2 } = await ez((null == (t2 = l2.unprotectedHeader) ? void 0 : t2.alg) || (null == (r2 = this._protectedHeader) ? void 0 : r2.alg) || (null == (n2 = this._unprotectedHeader) ? void 0 : n2.alg), a2, l2.key, i2, { p2c: u2 });
            c2.encrypted_key = T(d2), (l2.unprotectedHeader || p2) && (c2.header = { ...l2.unprotectedHeader, ...p2 });
          }
          return o2;
        }
      }
      function eZ(e10, t2) {
        let r2 = `SHA-${e10.slice(-3)}`;
        switch (e10) {
          case "HS256":
          case "HS384":
          case "HS512":
            return { hash: r2, name: "HMAC" };
          case "PS256":
          case "PS384":
          case "PS512":
            return { hash: r2, name: "RSA-PSS", saltLength: e10.slice(-3) >> 3 };
          case "RS256":
          case "RS384":
          case "RS512":
            return { hash: r2, name: "RSASSA-PKCS1-v1_5" };
          case "ES256":
          case "ES384":
          case "ES512":
            return { hash: r2, name: "ECDSA", namedCurve: t2.namedCurve };
          case "EdDSA":
            return { name: t2.name };
          default:
            throw new i(`alg ${e10} is not supported either by JOSE or your javascript runtime`);
        }
      }
      function e0(e10, t2, r2) {
        if (t2 instanceof CryptoKey) return !function(e11, t3, ...r3) {
          switch (t3) {
            case "HS256":
            case "HS384":
            case "HS512": {
              if (!L(e11.algorithm, "HMAC")) throw K("HMAC");
              let r4 = parseInt(t3.slice(2), 10);
              if (J(e11.algorithm.hash) !== r4) throw K(`SHA-${r4}`, "algorithm.hash");
              break;
            }
            case "RS256":
            case "RS384":
            case "RS512": {
              if (!L(e11.algorithm, "RSASSA-PKCS1-v1_5")) throw K("RSASSA-PKCS1-v1_5");
              let r4 = parseInt(t3.slice(2), 10);
              if (J(e11.algorithm.hash) !== r4) throw K(`SHA-${r4}`, "algorithm.hash");
              break;
            }
            case "PS256":
            case "PS384":
            case "PS512": {
              if (!L(e11.algorithm, "RSA-PSS")) throw K("RSA-PSS");
              let r4 = parseInt(t3.slice(2), 10);
              if (J(e11.algorithm.hash) !== r4) throw K(`SHA-${r4}`, "algorithm.hash");
              break;
            }
            case "EdDSA":
              if ("Ed25519" !== e11.algorithm.name && "Ed448" !== e11.algorithm.name) throw K("Ed25519 or Ed448");
              break;
            case "ES256":
            case "ES384":
            case "ES512": {
              if (!L(e11.algorithm, "ECDSA")) throw K("ECDSA");
              let r4 = function(e12) {
                switch (e12) {
                  case "ES256":
                    return "P-256";
                  case "ES384":
                    return "P-384";
                  case "ES512":
                    return "P-521";
                  default:
                    throw Error("unreachable");
                }
              }(t3);
              if (e11.algorithm.namedCurve !== r4) throw K(r4, "algorithm.namedCurve");
              break;
            }
            default:
              throw TypeError("CryptoKey does not support this operation");
          }
          B(e11, r3);
        }(t2, e10, r2), t2;
        if (t2 instanceof Uint8Array) {
          if (!e10.startsWith("HS")) throw TypeError(G(t2, ...z));
          return w.subtle.importKey("raw", t2, { hash: `SHA-${e10.slice(-3)}`, name: "HMAC" }, false, [r2]);
        }
        throw TypeError(G(t2, ...z, "Uint8Array"));
      }
      let e1 = async (e10, t2, r2, n2) => {
        let a2 = await e0(e10, t2, "verify");
        ef(e10, a2);
        let i2 = eZ(e10, a2.algorithm);
        try {
          return await w.subtle.verify(i2, a2, r2, n2);
        } catch (e11) {
          return false;
        }
      };
      async function e2(e10, t2, r2) {
        var n2;
        let i2, o2;
        if (!et(e10)) throw new c("Flattened JWS must be an object");
        if (void 0 === e10.protected && void 0 === e10.header) throw new c('Flattened JWS must have either of the "protected" or "header" members');
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new c("JWS Protected Header incorrect type");
        if (void 0 === e10.payload) throw new c("JWS Payload missing");
        if ("string" != typeof e10.signature) throw new c("JWS Signature missing or incorrect type");
        if (void 0 !== e10.header && !et(e10.header)) throw new c("JWS Unprotected Header incorrect type");
        let s2 = {};
        if (e10.protected) try {
          let t3 = k(e10.protected);
          s2 = JSON.parse(_.decode(t3));
        } catch (e11) {
          throw new c("JWS Protected Header is invalid");
        }
        if (!ee(s2, e10.header)) throw new c("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        let l2 = { ...s2, ...e10.header }, u2 = eW(c, /* @__PURE__ */ new Map([["b64", true]]), null == r2 ? void 0 : r2.crit, s2, l2), d2 = true;
        if (u2.has("b64") && "boolean" != typeof (d2 = s2.b64)) throw new c('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        let { alg: p2 } = l2;
        if ("string" != typeof p2 || !p2) throw new c('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        let h2 = r2 && eK("algorithms", r2.algorithms);
        if (h2 && !h2.has(p2)) throw new a('"alg" (Algorithm) Header Parameter not allowed');
        if (d2) {
          if ("string" != typeof e10.payload) throw new c("JWS Payload must be a string");
        } else if ("string" != typeof e10.payload && !(e10.payload instanceof Uint8Array)) throw new c("JWS Payload must be a string or an Uint8Array instance");
        let f2 = false;
        "function" == typeof t2 && (t2 = await t2(s2, e10), f2 = true), eI(p2, t2, "verify");
        let g2 = E(v.encode(null != (n2 = e10.protected) ? n2 : ""), v.encode("."), "string" == typeof e10.payload ? v.encode(e10.payload) : e10.payload);
        try {
          i2 = k(e10.signature);
        } catch (e11) {
          throw new c("Failed to base64url decode the signature");
        }
        if (!await e1(p2, t2, i2, g2)) throw new y();
        if (d2) try {
          o2 = k(e10.payload);
        } catch (e11) {
          throw new c("Failed to base64url decode the payload");
        }
        else o2 = "string" == typeof e10.payload ? v.encode(e10.payload) : e10.payload;
        let m2 = { payload: o2 };
        return (void 0 !== e10.protected && (m2.protectedHeader = s2), void 0 !== e10.header && (m2.unprotectedHeader = e10.header), f2) ? { ...m2, key: t2 } : m2;
      }
      async function e5(e10, t2, r2) {
        if (e10 instanceof Uint8Array && (e10 = _.decode(e10)), "string" != typeof e10) throw new c("Compact JWS must be a string or Uint8Array");
        let { 0: n2, 1: a2, 2: i2, length: o2 } = e10.split(".");
        if (3 !== o2) throw new c("Invalid Compact JWS");
        let s2 = await e2({ payload: a2, protected: n2, signature: i2 }, t2, r2), l2 = { payload: s2.payload, protectedHeader: s2.protectedHeader };
        return "function" == typeof t2 ? { ...l2, key: s2.key } : l2;
      }
      async function e4(e10, t2, r2) {
        if (!et(e10)) throw new c("General JWS must be an object");
        if (!Array.isArray(e10.signatures) || !e10.signatures.every(et)) throw new c("JWS Signatures missing or incorrect type");
        for (let n2 of e10.signatures) try {
          return await e2({ header: n2.header, payload: e10.payload, protected: n2.protected, signature: n2.signature }, t2, r2);
        } catch (e11) {
        }
        throw new y();
      }
      let e6 = (e10) => Math.floor(e10.getTime() / 1e3), e8 = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i, e3 = (e10) => {
        let t2 = e8.exec(e10);
        if (!t2) throw TypeError("Invalid time period format");
        let r2 = parseFloat(t2[1]);
        switch (t2[2].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            return Math.round(r2);
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            return Math.round(60 * r2);
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            return Math.round(3600 * r2);
          case "day":
          case "days":
          case "d":
            return Math.round(86400 * r2);
          case "week":
          case "weeks":
          case "w":
            return Math.round(604800 * r2);
          default:
            return Math.round(31557600 * r2);
        }
      }, e9 = (e10) => e10.toLowerCase().replace(/^application\//, ""), e7 = (e10, t2, a2 = {}) => {
        let i2, o2, { typ: s2 } = a2;
        if (s2 && ("string" != typeof e10.typ || e9(e10.typ) !== e9(s2))) throw new r('unexpected "typ" JWT header value', "typ", "check_failed");
        try {
          i2 = JSON.parse(_.decode(t2));
        } catch (e11) {
        }
        if (!et(i2)) throw new u("JWT Claims Set must be a top-level JSON object");
        let { requiredClaims: l2 = [], issuer: c2, subject: d2, audience: p2, maxTokenAge: h2 } = a2;
        for (let e11 of (void 0 !== h2 && l2.push("iat"), void 0 !== p2 && l2.push("aud"), void 0 !== d2 && l2.push("sub"), void 0 !== c2 && l2.push("iss"), new Set(l2.reverse()))) if (!(e11 in i2)) throw new r(`missing required "${e11}" claim`, e11, "missing");
        if (c2 && !(Array.isArray(c2) ? c2 : [c2]).includes(i2.iss)) throw new r('unexpected "iss" claim value', "iss", "check_failed");
        if (d2 && i2.sub !== d2) throw new r('unexpected "sub" claim value', "sub", "check_failed");
        if (p2 && !((e11, t3) => "string" == typeof e11 ? t3.includes(e11) : !!Array.isArray(e11) && t3.some(Set.prototype.has.bind(new Set(e11))))(i2.aud, "string" == typeof p2 ? [p2] : p2)) throw new r('unexpected "aud" claim value', "aud", "check_failed");
        switch (typeof a2.clockTolerance) {
          case "string":
            o2 = e3(a2.clockTolerance);
            break;
          case "number":
            o2 = a2.clockTolerance;
            break;
          case "undefined":
            o2 = 0;
            break;
          default:
            throw TypeError("Invalid clockTolerance option type");
        }
        let { currentDate: f2 } = a2, g2 = e6(f2 || /* @__PURE__ */ new Date());
        if ((void 0 !== i2.iat || h2) && "number" != typeof i2.iat) throw new r('"iat" claim must be a number', "iat", "invalid");
        if (void 0 !== i2.nbf) {
          if ("number" != typeof i2.nbf) throw new r('"nbf" claim must be a number', "nbf", "invalid");
          if (i2.nbf > g2 + o2) throw new r('"nbf" claim timestamp check failed', "nbf", "check_failed");
        }
        if (void 0 !== i2.exp) {
          if ("number" != typeof i2.exp) throw new r('"exp" claim must be a number', "exp", "invalid");
          if (i2.exp <= g2 - o2) throw new n('"exp" claim timestamp check failed', "exp", "check_failed");
        }
        if (h2) {
          let e11 = g2 - i2.iat;
          if (e11 - o2 > ("number" == typeof h2 ? h2 : e3(h2))) throw new n('"iat" claim timestamp check failed (too far in the past)', "iat", "check_failed");
          if (e11 < 0 - o2) throw new r('"iat" claim timestamp check failed (it should be in the past)', "iat", "check_failed");
        }
        return i2;
      };
      async function te(e10, t2, r2) {
        var n2;
        let a2 = await e5(e10, t2, r2);
        if ((null == (n2 = a2.protectedHeader.crit) ? void 0 : n2.includes("b64")) && false === a2.protectedHeader.b64) throw new u("JWTs MUST NOT use unencoded payload");
        let i2 = { payload: e7(a2.protectedHeader, a2.payload, r2), protectedHeader: a2.protectedHeader };
        return "function" == typeof t2 ? { ...i2, key: a2.key } : i2;
      }
      async function tt(e10, t2, n2) {
        let a2 = await eJ(e10, t2, n2), i2 = e7(a2.protectedHeader, a2.plaintext, n2), { protectedHeader: o2 } = a2;
        if (void 0 !== o2.iss && o2.iss !== i2.iss) throw new r('replicated "iss" claim header parameter mismatch', "iss", "mismatch");
        if (void 0 !== o2.sub && o2.sub !== i2.sub) throw new r('replicated "sub" claim header parameter mismatch', "sub", "mismatch");
        if (void 0 !== o2.aud && JSON.stringify(o2.aud) !== JSON.stringify(i2.aud)) throw new r('replicated "aud" claim header parameter mismatch', "aud", "mismatch");
        let s2 = { payload: i2, protectedHeader: o2 };
        return "function" == typeof t2 ? { ...s2, key: a2.key } : s2;
      }
      class tr {
        constructor(e10) {
          this._flattened = new eX(e10);
        }
        setContentEncryptionKey(e10) {
          return this._flattened.setContentEncryptionKey(e10), this;
        }
        setInitializationVector(e10) {
          return this._flattened.setInitializationVector(e10), this;
        }
        setProtectedHeader(e10) {
          return this._flattened.setProtectedHeader(e10), this;
        }
        setKeyManagementParameters(e10) {
          return this._flattened.setKeyManagementParameters(e10), this;
        }
        async encrypt(e10, t2) {
          let r2 = await this._flattened.encrypt(e10, t2);
          return [r2.protected, r2.encrypted_key, r2.iv, r2.ciphertext, r2.tag].join(".");
        }
      }
      let tn = async (e10, t2, r2) => {
        let n2 = await e0(e10, t2, "sign");
        return ef(e10, n2), new Uint8Array(await w.subtle.sign(eZ(e10, n2.algorithm), n2, r2));
      };
      class ta {
        constructor(e10) {
          if (!(e10 instanceof Uint8Array)) throw TypeError("payload must be an instance of Uint8Array");
          this._payload = e10;
        }
        setProtectedHeader(e10) {
          if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this._protectedHeader = e10, this;
        }
        setUnprotectedHeader(e10) {
          if (this._unprotectedHeader) throw TypeError("setUnprotectedHeader can only be called once");
          return this._unprotectedHeader = e10, this;
        }
        async sign(e10, t2) {
          let r2;
          if (!this._protectedHeader && !this._unprotectedHeader) throw new c("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
          if (!ee(this._protectedHeader, this._unprotectedHeader)) throw new c("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
          let n2 = { ...this._protectedHeader, ...this._unprotectedHeader }, a2 = eW(c, /* @__PURE__ */ new Map([["b64", true]]), null == t2 ? void 0 : t2.crit, this._protectedHeader, n2), i2 = true;
          if (a2.has("b64") && "boolean" != typeof (i2 = this._protectedHeader.b64)) throw new c('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
          let { alg: o2 } = n2;
          if ("string" != typeof o2 || !o2) throw new c('JWS "alg" (Algorithm) Header Parameter missing or invalid');
          eI(o2, e10, "sign");
          let s2 = this._payload;
          i2 && (s2 = v.encode(T(s2)));
          let l2 = E(r2 = this._protectedHeader ? v.encode(T(JSON.stringify(this._protectedHeader))) : v.encode(""), v.encode("."), s2), u2 = { signature: T(await tn(o2, e10, l2)), payload: "" };
          return i2 && (u2.payload = _.decode(s2)), this._unprotectedHeader && (u2.header = this._unprotectedHeader), this._protectedHeader && (u2.protected = _.decode(r2)), u2;
        }
      }
      class ti {
        constructor(e10) {
          this._flattened = new ta(e10);
        }
        setProtectedHeader(e10) {
          return this._flattened.setProtectedHeader(e10), this;
        }
        async sign(e10, t2) {
          let r2 = await this._flattened.sign(e10, t2);
          if (void 0 === r2.payload) throw TypeError("use the flattened module for creating JWS with b64: false");
          return `${r2.protected}.${r2.payload}.${r2.signature}`;
        }
      }
      class to {
        constructor(e10, t2, r2) {
          this.parent = e10, this.key = t2, this.options = r2;
        }
        setProtectedHeader(e10) {
          if (this.protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this.protectedHeader = e10, this;
        }
        setUnprotectedHeader(e10) {
          if (this.unprotectedHeader) throw TypeError("setUnprotectedHeader can only be called once");
          return this.unprotectedHeader = e10, this;
        }
        addSignature(...e10) {
          return this.parent.addSignature(...e10);
        }
        sign(...e10) {
          return this.parent.sign(...e10);
        }
        done() {
          return this.parent;
        }
      }
      class ts {
        constructor(e10) {
          this._signatures = [], this._payload = e10;
        }
        addSignature(e10, t2) {
          let r2 = new to(this, e10, t2);
          return this._signatures.push(r2), r2;
        }
        async sign() {
          if (!this._signatures.length) throw new c("at least one signature must be added");
          let e10 = { signatures: [], payload: "" };
          for (let t2 = 0; t2 < this._signatures.length; t2++) {
            let r2 = this._signatures[t2], n2 = new ta(this._payload);
            n2.setProtectedHeader(r2.protectedHeader), n2.setUnprotectedHeader(r2.unprotectedHeader);
            let { payload: a2, ...i2 } = await n2.sign(r2.key, r2.options);
            if (0 === t2) e10.payload = a2;
            else if (e10.payload !== a2) throw new c("inconsistent use of JWS Unencoded Payload (RFC7797)");
            e10.signatures.push(i2);
          }
          return e10;
        }
      }
      class tl {
        constructor(e10) {
          if (!et(e10)) throw TypeError("JWT Claims Set MUST be an object");
          this._payload = e10;
        }
        setIssuer(e10) {
          return this._payload = { ...this._payload, iss: e10 }, this;
        }
        setSubject(e10) {
          return this._payload = { ...this._payload, sub: e10 }, this;
        }
        setAudience(e10) {
          return this._payload = { ...this._payload, aud: e10 }, this;
        }
        setJti(e10) {
          return this._payload = { ...this._payload, jti: e10 }, this;
        }
        setNotBefore(e10) {
          return "number" == typeof e10 ? this._payload = { ...this._payload, nbf: e10 } : this._payload = { ...this._payload, nbf: e6(/* @__PURE__ */ new Date()) + e3(e10) }, this;
        }
        setExpirationTime(e10) {
          return "number" == typeof e10 ? this._payload = { ...this._payload, exp: e10 } : this._payload = { ...this._payload, exp: e6(/* @__PURE__ */ new Date()) + e3(e10) }, this;
        }
        setIssuedAt(e10) {
          return void 0 === e10 ? this._payload = { ...this._payload, iat: e6(/* @__PURE__ */ new Date()) } : this._payload = { ...this._payload, iat: e10 }, this;
        }
      }
      class tc extends tl {
        setProtectedHeader(e10) {
          return this._protectedHeader = e10, this;
        }
        async sign(e10, t2) {
          var r2;
          let n2 = new ti(v.encode(JSON.stringify(this._payload)));
          if (n2.setProtectedHeader(this._protectedHeader), Array.isArray(null == (r2 = this._protectedHeader) ? void 0 : r2.crit) && this._protectedHeader.crit.includes("b64") && false === this._protectedHeader.b64) throw new u("JWTs MUST NOT use unencoded payload");
          return n2.sign(e10, t2);
        }
      }
      class tu extends tl {
        setProtectedHeader(e10) {
          if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
          return this._protectedHeader = e10, this;
        }
        setKeyManagementParameters(e10) {
          if (this._keyManagementParameters) throw TypeError("setKeyManagementParameters can only be called once");
          return this._keyManagementParameters = e10, this;
        }
        setContentEncryptionKey(e10) {
          if (this._cek) throw TypeError("setContentEncryptionKey can only be called once");
          return this._cek = e10, this;
        }
        setInitializationVector(e10) {
          if (this._iv) throw TypeError("setInitializationVector can only be called once");
          return this._iv = e10, this;
        }
        replicateIssuerAsHeader() {
          return this._replicateIssuerAsHeader = true, this;
        }
        replicateSubjectAsHeader() {
          return this._replicateSubjectAsHeader = true, this;
        }
        replicateAudienceAsHeader() {
          return this._replicateAudienceAsHeader = true, this;
        }
        async encrypt(e10, t2) {
          let r2 = new tr(v.encode(JSON.stringify(this._payload)));
          return this._replicateIssuerAsHeader && (this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss }), this._replicateSubjectAsHeader && (this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub }), this._replicateAudienceAsHeader && (this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud }), r2.setProtectedHeader(this._protectedHeader), this._iv && r2.setInitializationVector(this._iv), this._cek && r2.setContentEncryptionKey(this._cek), this._keyManagementParameters && r2.setKeyManagementParameters(this._keyManagementParameters), r2.encrypt(e10, t2);
        }
      }
      let td = (e10, t2) => {
        if ("string" != typeof e10 || !e10) throw new d(`${t2} missing or invalid`);
      };
      async function tp(e10, t2) {
        let r2;
        if (!et(e10)) throw TypeError("JWK must be an object");
        if (null != t2 || (t2 = "sha256"), "sha256" !== t2 && "sha384" !== t2 && "sha512" !== t2) throw TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        switch (e10.kty) {
          case "EC":
            td(e10.crv, '"crv" (Curve) Parameter'), td(e10.x, '"x" (X Coordinate) Parameter'), td(e10.y, '"y" (Y Coordinate) Parameter'), r2 = { crv: e10.crv, kty: e10.kty, x: e10.x, y: e10.y };
            break;
          case "OKP":
            td(e10.crv, '"crv" (Subtype of Key Pair) Parameter'), td(e10.x, '"x" (Public Key) Parameter'), r2 = { crv: e10.crv, kty: e10.kty, x: e10.x };
            break;
          case "RSA":
            td(e10.e, '"e" (Exponent) Parameter'), td(e10.n, '"n" (Modulus) Parameter'), r2 = { e: e10.e, kty: e10.kty, n: e10.n };
            break;
          case "oct":
            td(e10.k, '"k" (Key Value) Parameter'), r2 = { k: e10.k, kty: e10.kty };
            break;
          default:
            throw new i('"kty" (Key Type) Parameter missing or unsupported');
        }
        let n2 = v.encode(JSON.stringify(r2));
        return T(await b(t2, n2));
      }
      async function th(e10, t2) {
        null != t2 || (t2 = "sha256");
        let r2 = await tp(e10, t2);
        return `urn:ietf:params:oauth:jwk-thumbprint:sha-${t2.slice(-3)}:${r2}`;
      }
      async function tf(e10, t2) {
        let r2 = { ...e10, ...null == t2 ? void 0 : t2.header };
        if (!et(r2.jwk)) throw new c('"jwk" (JSON Web Key) Header Parameter must be a JSON object');
        let n2 = await ek({ ...r2.jwk, ext: true }, r2.alg, true);
        if (n2 instanceof Uint8Array || "public" !== n2.type) throw new c('"jwk" (JSON Web Key) Header Parameter must be a public key');
        return n2;
      }
      function tg(e10) {
        return e10 && "object" == typeof e10 && Array.isArray(e10.keys) && e10.keys.every(ty);
      }
      function ty(e10) {
        return et(e10);
      }
      class tm {
        constructor(e10) {
          if (this._cached = /* @__PURE__ */ new WeakMap(), !tg(e10)) throw new p("JSON Web Key Set malformed");
          this._jwks = function(e11) {
            return "function" == typeof structuredClone ? structuredClone(e11) : JSON.parse(JSON.stringify(e11));
          }(e10);
        }
        async getKey(e10, t2) {
          let { alg: r2, kid: n2 } = { ...e10, ...null == t2 ? void 0 : t2.header }, a2 = function(e11) {
            switch ("string" == typeof e11 && e11.slice(0, 2)) {
              case "RS":
              case "PS":
                return "RSA";
              case "ES":
                return "EC";
              case "Ed":
                return "OKP";
              default:
                throw new i('Unsupported "alg" value for a JSON Web Key Set');
            }
          }(r2), o2 = this._jwks.keys.filter((e11) => {
            let t3 = a2 === e11.kty;
            if (t3 && "string" == typeof n2 && (t3 = n2 === e11.kid), t3 && "string" == typeof e11.alg && (t3 = r2 === e11.alg), t3 && "string" == typeof e11.use && (t3 = "sig" === e11.use), t3 && Array.isArray(e11.key_ops) && (t3 = e11.key_ops.includes("verify")), t3 && "EdDSA" === r2 && (t3 = "Ed25519" === e11.crv || "Ed448" === e11.crv), t3) switch (r2) {
              case "ES256":
                t3 = "P-256" === e11.crv;
                break;
              case "ES256K":
                t3 = "secp256k1" === e11.crv;
                break;
              case "ES384":
                t3 = "P-384" === e11.crv;
                break;
              case "ES512":
                t3 = "P-521" === e11.crv;
            }
            return t3;
          }), { 0: s2, length: l2 } = o2;
          if (0 === l2) throw new h();
          if (1 !== l2) {
            let e11 = new f(), { _cached: t3 } = this;
            throw e11[Symbol.asyncIterator] = async function* () {
              for (let e12 of o2) try {
                yield await tw(t3, e12, r2);
              } catch (e13) {
                continue;
              }
            }, e11;
          }
          return tw(this._cached, s2, r2);
        }
      }
      async function tw(e10, t2, r2) {
        let n2 = e10.get(t2) || e10.set(t2, {}).get(t2);
        if (void 0 === n2[r2]) {
          let e11 = await ek({ ...t2, ext: true }, r2);
          if (e11 instanceof Uint8Array || "public" !== e11.type) throw new p("JSON Web Key Set members must be public keys");
          n2[r2] = e11;
        }
        return n2[r2];
      }
      function tb(e10) {
        let t2 = new tm(e10);
        return async function(e11, r2) {
          return t2.getKey(e11, r2);
        };
      }
      let tv = async (e10, r2, n2) => {
        let a2, i2, o2 = false;
        "function" == typeof AbortController && (a2 = new AbortController(), i2 = setTimeout(() => {
          o2 = true, a2.abort();
        }, r2));
        let s2 = await fetch(e10.href, { signal: a2 ? a2.signal : void 0, redirect: "manual", headers: n2.headers }).catch((e11) => {
          if (o2) throw new g();
          throw e11;
        });
        if (void 0 !== i2 && clearTimeout(i2), 200 !== s2.status) throw new t("Expected 200 OK from the JSON Web Key Set HTTP response");
        try {
          return await s2.json();
        } catch (e11) {
          throw new t("Failed to parse the JSON Web Key Set HTTP response as JSON");
        }
      };
      class t_ extends tm {
        constructor(e10, t2) {
          if (super({ keys: [] }), this._jwks = void 0, !(e10 instanceof URL)) throw TypeError("url must be an instance of URL");
          this._url = new URL(e10.href), this._options = { agent: null == t2 ? void 0 : t2.agent, headers: null == t2 ? void 0 : t2.headers }, this._timeoutDuration = "number" == typeof (null == t2 ? void 0 : t2.timeoutDuration) ? null == t2 ? void 0 : t2.timeoutDuration : 5e3, this._cooldownDuration = "number" == typeof (null == t2 ? void 0 : t2.cooldownDuration) ? null == t2 ? void 0 : t2.cooldownDuration : 3e4, this._cacheMaxAge = "number" == typeof (null == t2 ? void 0 : t2.cacheMaxAge) ? null == t2 ? void 0 : t2.cacheMaxAge : 6e5;
        }
        coolingDown() {
          return "number" == typeof this._jwksTimestamp && Date.now() < this._jwksTimestamp + this._cooldownDuration;
        }
        fresh() {
          return "number" == typeof this._jwksTimestamp && Date.now() < this._jwksTimestamp + this._cacheMaxAge;
        }
        async getKey(e10, t2) {
          this._jwks && this.fresh() || await this.reload();
          try {
            return await super.getKey(e10, t2);
          } catch (r2) {
            if (r2 instanceof h && false === this.coolingDown()) return await this.reload(), super.getKey(e10, t2);
            throw r2;
          }
        }
        async reload() {
          this._pendingFetch && ("undefined" != typeof WebSocketPair || "undefined" != typeof navigator && "Cloudflare-Workers" === navigator.userAgent) && (this._pendingFetch = void 0), this._pendingFetch || (this._pendingFetch = tv(this._url, this._timeoutDuration, this._options).then((e10) => {
            if (!tg(e10)) throw new p("JSON Web Key Set malformed");
            this._jwks = { keys: e10.keys }, this._jwksTimestamp = Date.now(), this._pendingFetch = void 0;
          }).catch((e10) => {
            throw this._pendingFetch = void 0, e10;
          })), await this._pendingFetch;
        }
      }
      function tE(e10, t2) {
        let r2 = new t_(e10, t2);
        return async function(e11, t3) {
          return r2.getKey(e11, t3);
        };
      }
      class tS extends tl {
        encode() {
          let e10 = T(JSON.stringify({ alg: "none" })), t2 = T(JSON.stringify(this._payload));
          return `${e10}.${t2}.`;
        }
        static decode(e10, t2) {
          let r2;
          if ("string" != typeof e10) throw new u("Unsecured JWT must be a string");
          let { 0: n2, 1: a2, 2: i2, length: o2 } = e10.split(".");
          if (3 !== o2 || "" !== i2) throw new u("Invalid Unsecured JWT");
          try {
            if (r2 = JSON.parse(_.decode(k(n2))), "none" !== r2.alg) throw Error();
          } catch (e11) {
            throw new u("Invalid Unsecured JWT");
          }
          return { payload: e7(r2, k(a2), t2), header: r2 };
        }
      }
      function tx(e10) {
        let t2;
        if ("string" == typeof e10) {
          let r2 = e10.split(".");
          (3 === r2.length || 5 === r2.length) && ([t2] = r2);
        } else if ("object" == typeof e10 && e10) if ("protected" in e10) t2 = e10.protected;
        else throw TypeError("Token does not contain a Protected Header");
        try {
          if ("string" != typeof t2 || !t2) throw Error();
          let e11 = JSON.parse(_.decode(N(t2)));
          if (!et(e11)) throw Error();
          return e11;
        } catch (e11) {
          throw TypeError("Invalid Token or Protected Header formatting");
        }
      }
      function tA(e10) {
        let t2, r2;
        if ("string" != typeof e10) throw new u("JWTs must use Compact JWS serialization, JWT must be a string");
        let { 1: n2, length: a2 } = e10.split(".");
        if (5 === a2) throw new u("Only JWTs using Compact JWS serialization can be decoded");
        if (3 !== a2) throw new u("Invalid JWT");
        if (!n2) throw new u("JWTs must contain a payload");
        try {
          t2 = N(n2);
        } catch (e11) {
          throw new u("Failed to base64url decode the payload");
        }
        try {
          r2 = JSON.parse(_.decode(t2));
        } catch (e11) {
          throw new u("Failed to parse the decoded payload as JSON");
        }
        if (!et(r2)) throw new u("Invalid JWT Claims Set");
        return r2;
      }
      var tC = m;
      async function tP(e10, t2) {
        var r2;
        let n2, a2, o2;
        switch (e10) {
          case "HS256":
          case "HS384":
          case "HS512":
            n2 = parseInt(e10.slice(-3), 10), a2 = { name: "HMAC", hash: `SHA-${n2}`, length: n2 }, o2 = ["sign", "verify"];
            break;
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return M(new Uint8Array((n2 = parseInt(e10.slice(-3), 10)) >> 3));
          case "A128KW":
          case "A192KW":
          case "A256KW":
            a2 = { name: "AES-KW", length: n2 = parseInt(e10.slice(1, 4), 10) }, o2 = ["wrapKey", "unwrapKey"];
            break;
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW":
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            a2 = { name: "AES-GCM", length: n2 = parseInt(e10.slice(1, 4), 10) }, o2 = ["encrypt", "decrypt"];
            break;
          default:
            throw new i('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        return w.subtle.generateKey(a2, null != (r2 = null == t2 ? void 0 : t2.extractable) && r2, o2);
      }
      function tR(e10) {
        var t2;
        let r2 = null != (t2 = null == e10 ? void 0 : e10.modulusLength) ? t2 : 2048;
        if ("number" != typeof r2 || r2 < 2048) throw new i("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
        return r2;
      }
      async function tT(e10, t2) {
        var r2, n2, a2;
        let o2, s2;
        switch (e10) {
          case "PS256":
          case "PS384":
          case "PS512":
            o2 = { name: "RSA-PSS", hash: `SHA-${e10.slice(-3)}`, publicExponent: new Uint8Array([1, 0, 1]), modulusLength: tR(t2) }, s2 = ["sign", "verify"];
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            o2 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e10.slice(-3)}`, publicExponent: new Uint8Array([1, 0, 1]), modulusLength: tR(t2) }, s2 = ["sign", "verify"];
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            o2 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e10.slice(-3), 10) || 1}`, publicExponent: new Uint8Array([1, 0, 1]), modulusLength: tR(t2) }, s2 = ["decrypt", "unwrapKey", "encrypt", "wrapKey"];
            break;
          case "ES256":
            o2 = { name: "ECDSA", namedCurve: "P-256" }, s2 = ["sign", "verify"];
            break;
          case "ES384":
            o2 = { name: "ECDSA", namedCurve: "P-384" }, s2 = ["sign", "verify"];
            break;
          case "ES512":
            o2 = { name: "ECDSA", namedCurve: "P-521" }, s2 = ["sign", "verify"];
            break;
          case "EdDSA":
            s2 = ["sign", "verify"];
            let l2 = null != (r2 = null == t2 ? void 0 : t2.crv) ? r2 : "Ed25519";
            switch (l2) {
              case "Ed25519":
              case "Ed448":
                o2 = { name: l2 };
                break;
              default:
                throw new i("Invalid or unsupported crv option provided");
            }
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            s2 = ["deriveKey", "deriveBits"];
            let e11 = null != (n2 = null == t2 ? void 0 : t2.crv) ? n2 : "P-256";
            switch (e11) {
              case "P-256":
              case "P-384":
              case "P-521":
                o2 = { name: "ECDH", namedCurve: e11 };
                break;
              case "X25519":
              case "X448":
                o2 = { name: e11 };
                break;
              default:
                throw new i("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448");
            }
            break;
          }
          default:
            throw new i('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        return w.subtle.generateKey(o2, null != (a2 = null == t2 ? void 0 : t2.extractable) && a2, s2);
      }
      async function tO(e10, t2) {
        return tT(e10, t2);
      }
      async function tk(e10, t2) {
        return tP(e10, t2);
      }
      var tI = H;
      let tN = "WebCryptoAPI";
    }, 9145, (e) => {
      "use strict";
      e.s(["default", () => n, "hkdf", () => n], 9145);
      let t = async (e2, t2, r2, n2, a) => {
        let { crypto: { subtle: i } } = (() => {
          if ("undefined" != typeof globalThis) return globalThis;
          if ("undefined" != typeof self) return self;
          throw Error("unable to locate global object");
        })();
        return new Uint8Array(await i.deriveBits({ name: "HKDF", hash: `SHA-${e2.substr(3)}`, salt: r2, info: n2 }, await i.importKey("raw", t2, "HKDF", false, ["deriveBits"]), a << 3));
      };
      function r(e2, t2) {
        if ("string" == typeof e2) return new TextEncoder().encode(e2);
        if (!(e2 instanceof Uint8Array)) throw TypeError(`"${t2}"" must be an instance of Uint8Array or a string`);
        return e2;
      }
      async function n(e2, n2, a, i, o) {
        return t(function(e3) {
          switch (e3) {
            case "sha256":
            case "sha384":
            case "sha512":
            case "sha1":
              return e3;
            default:
              throw TypeError('unsupported "digest" value');
          }
        }(e2), function(e3) {
          let t2 = r(e3, "ikm");
          if (!t2.byteLength) throw TypeError('"ikm" must be at least one byte in length');
          return t2;
        }(n2), r(a, "salt"), function(e3) {
          let t2 = r(e3, "info");
          if (t2.byteLength > 1024) throw TypeError('"info" must not contain more than 1024 bytes');
          return t2;
        }(i), function(e3, t2) {
          if ("number" != typeof e3 || !Number.isInteger(e3) || e3 < 1) throw TypeError('"keylen" must be a positive integer');
          if (e3 > 255 * (parseInt(t2.substr(3), 10) >> 3 || 20)) throw TypeError('"keylen" too large');
          return e3;
        }(o, e2));
      }
    }, 67866, (e) => {
      "use strict";
      e.s(["NIL", () => P, "parse", () => f, "stringify", () => u, "v1", () => h, "v3", () => S, "v4", () => x, "v5", () => C, "validate", () => s, "version", () => R], 67866), e.s([], 43692), e.i(43692);
      var t, r, n, a = new Uint8Array(16);
      function i() {
        if (!t && !(t = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        return t(a);
      }
      let o = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i, s = function(e2) {
        return "string" == typeof e2 && o.test(e2);
      };
      for (var l = [], c = 0; c < 256; ++c) l.push((c + 256).toString(16).substr(1));
      let u = function(e2) {
        var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r2 = (l[e2[t2 + 0]] + l[e2[t2 + 1]] + l[e2[t2 + 2]] + l[e2[t2 + 3]] + "-" + l[e2[t2 + 4]] + l[e2[t2 + 5]] + "-" + l[e2[t2 + 6]] + l[e2[t2 + 7]] + "-" + l[e2[t2 + 8]] + l[e2[t2 + 9]] + "-" + l[e2[t2 + 10]] + l[e2[t2 + 11]] + l[e2[t2 + 12]] + l[e2[t2 + 13]] + l[e2[t2 + 14]] + l[e2[t2 + 15]]).toLowerCase();
        if (!s(r2)) throw TypeError("Stringified UUID is invalid");
        return r2;
      };
      var d = 0, p = 0;
      let h = function(e2, t2, a2) {
        var o2 = t2 && a2 || 0, s2 = t2 || Array(16), l2 = (e2 = e2 || {}).node || r, c2 = void 0 !== e2.clockseq ? e2.clockseq : n;
        if (null == l2 || null == c2) {
          var h2 = e2.random || (e2.rng || i)();
          null == l2 && (l2 = r = [1 | h2[0], h2[1], h2[2], h2[3], h2[4], h2[5]]), null == c2 && (c2 = n = (h2[6] << 8 | h2[7]) & 16383);
        }
        var f2 = void 0 !== e2.msecs ? e2.msecs : Date.now(), g2 = void 0 !== e2.nsecs ? e2.nsecs : p + 1, y2 = f2 - d + (g2 - p) / 1e4;
        if (y2 < 0 && void 0 === e2.clockseq && (c2 = c2 + 1 & 16383), (y2 < 0 || f2 > d) && void 0 === e2.nsecs && (g2 = 0), g2 >= 1e4) throw Error("uuid.v1(): Can't create more than 10M uuids/sec");
        d = f2, p = g2, n = c2;
        var m2 = ((268435455 & (f2 += 122192928e5)) * 1e4 + g2) % 4294967296;
        s2[o2++] = m2 >>> 24 & 255, s2[o2++] = m2 >>> 16 & 255, s2[o2++] = m2 >>> 8 & 255, s2[o2++] = 255 & m2;
        var w2 = f2 / 4294967296 * 1e4 & 268435455;
        s2[o2++] = w2 >>> 8 & 255, s2[o2++] = 255 & w2, s2[o2++] = w2 >>> 24 & 15 | 16, s2[o2++] = w2 >>> 16 & 255, s2[o2++] = c2 >>> 8 | 128, s2[o2++] = 255 & c2;
        for (var b2 = 0; b2 < 6; ++b2) s2[o2 + b2] = l2[b2];
        return t2 || u(s2);
      }, f = function(e2) {
        if (!s(e2)) throw TypeError("Invalid UUID");
        var t2, r2 = new Uint8Array(16);
        return r2[0] = (t2 = parseInt(e2.slice(0, 8), 16)) >>> 24, r2[1] = t2 >>> 16 & 255, r2[2] = t2 >>> 8 & 255, r2[3] = 255 & t2, r2[4] = (t2 = parseInt(e2.slice(9, 13), 16)) >>> 8, r2[5] = 255 & t2, r2[6] = (t2 = parseInt(e2.slice(14, 18), 16)) >>> 8, r2[7] = 255 & t2, r2[8] = (t2 = parseInt(e2.slice(19, 23), 16)) >>> 8, r2[9] = 255 & t2, r2[10] = (t2 = parseInt(e2.slice(24, 36), 16)) / 1099511627776 & 255, r2[11] = t2 / 4294967296 & 255, r2[12] = t2 >>> 24 & 255, r2[13] = t2 >>> 16 & 255, r2[14] = t2 >>> 8 & 255, r2[15] = 255 & t2, r2;
      };
      function g(e2, t2, r2) {
        function n2(e3, n3, a2, i2) {
          if ("string" == typeof e3 && (e3 = function(e4) {
            e4 = unescape(encodeURIComponent(e4));
            for (var t3 = [], r3 = 0; r3 < e4.length; ++r3) t3.push(e4.charCodeAt(r3));
            return t3;
          }(e3)), "string" == typeof n3 && (n3 = f(n3)), 16 !== n3.length) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
          var o2 = new Uint8Array(16 + e3.length);
          if (o2.set(n3), o2.set(e3, n3.length), (o2 = r2(o2))[6] = 15 & o2[6] | t2, o2[8] = 63 & o2[8] | 128, a2) {
            i2 = i2 || 0;
            for (var s2 = 0; s2 < 16; ++s2) a2[i2 + s2] = o2[s2];
            return a2;
          }
          return u(o2);
        }
        try {
          n2.name = e2;
        } catch (e3) {
        }
        return n2.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", n2.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8", n2;
      }
      function y(e2) {
        return (e2 + 64 >>> 9 << 4) + 14 + 1;
      }
      function m(e2, t2) {
        var r2 = (65535 & e2) + (65535 & t2);
        return (e2 >> 16) + (t2 >> 16) + (r2 >> 16) << 16 | 65535 & r2;
      }
      function w(e2, t2, r2, n2, a2, i2) {
        var o2;
        return m((o2 = m(m(t2, e2), m(n2, i2))) << a2 | o2 >>> 32 - a2, r2);
      }
      function b(e2, t2, r2, n2, a2, i2, o2) {
        return w(t2 & r2 | ~t2 & n2, e2, t2, a2, i2, o2);
      }
      function v(e2, t2, r2, n2, a2, i2, o2) {
        return w(t2 & n2 | r2 & ~n2, e2, t2, a2, i2, o2);
      }
      function _(e2, t2, r2, n2, a2, i2, o2) {
        return w(t2 ^ r2 ^ n2, e2, t2, a2, i2, o2);
      }
      function E(e2, t2, r2, n2, a2, i2, o2) {
        return w(r2 ^ (t2 | ~n2), e2, t2, a2, i2, o2);
      }
      let S = g("v3", 48, function(e2) {
        if ("string" == typeof e2) {
          var t2 = unescape(encodeURIComponent(e2));
          e2 = new Uint8Array(t2.length);
          for (var r2 = 0; r2 < t2.length; ++r2) e2[r2] = t2.charCodeAt(r2);
        }
        return function(e3) {
          for (var t3 = [], r3 = 32 * e3.length, n2 = "0123456789abcdef", a2 = 0; a2 < r3; a2 += 8) {
            var i2 = e3[a2 >> 5] >>> a2 % 32 & 255, o2 = parseInt(n2.charAt(i2 >>> 4 & 15) + n2.charAt(15 & i2), 16);
            t3.push(o2);
          }
          return t3;
        }(function(e3, t3) {
          e3[t3 >> 5] |= 128 << t3 % 32, e3[y(t3) - 1] = t3;
          for (var r3 = 1732584193, n2 = -271733879, a2 = -1732584194, i2 = 271733878, o2 = 0; o2 < e3.length; o2 += 16) {
            var s2 = r3, l2 = n2, c2 = a2, u2 = i2;
            r3 = b(r3, n2, a2, i2, e3[o2], 7, -680876936), i2 = b(i2, r3, n2, a2, e3[o2 + 1], 12, -389564586), a2 = b(a2, i2, r3, n2, e3[o2 + 2], 17, 606105819), n2 = b(n2, a2, i2, r3, e3[o2 + 3], 22, -1044525330), r3 = b(r3, n2, a2, i2, e3[o2 + 4], 7, -176418897), i2 = b(i2, r3, n2, a2, e3[o2 + 5], 12, 1200080426), a2 = b(a2, i2, r3, n2, e3[o2 + 6], 17, -1473231341), n2 = b(n2, a2, i2, r3, e3[o2 + 7], 22, -45705983), r3 = b(r3, n2, a2, i2, e3[o2 + 8], 7, 1770035416), i2 = b(i2, r3, n2, a2, e3[o2 + 9], 12, -1958414417), a2 = b(a2, i2, r3, n2, e3[o2 + 10], 17, -42063), n2 = b(n2, a2, i2, r3, e3[o2 + 11], 22, -1990404162), r3 = b(r3, n2, a2, i2, e3[o2 + 12], 7, 1804603682), i2 = b(i2, r3, n2, a2, e3[o2 + 13], 12, -40341101), a2 = b(a2, i2, r3, n2, e3[o2 + 14], 17, -1502002290), n2 = b(n2, a2, i2, r3, e3[o2 + 15], 22, 1236535329), r3 = v(r3, n2, a2, i2, e3[o2 + 1], 5, -165796510), i2 = v(i2, r3, n2, a2, e3[o2 + 6], 9, -1069501632), a2 = v(a2, i2, r3, n2, e3[o2 + 11], 14, 643717713), n2 = v(n2, a2, i2, r3, e3[o2], 20, -373897302), r3 = v(r3, n2, a2, i2, e3[o2 + 5], 5, -701558691), i2 = v(i2, r3, n2, a2, e3[o2 + 10], 9, 38016083), a2 = v(a2, i2, r3, n2, e3[o2 + 15], 14, -660478335), n2 = v(n2, a2, i2, r3, e3[o2 + 4], 20, -405537848), r3 = v(r3, n2, a2, i2, e3[o2 + 9], 5, 568446438), i2 = v(i2, r3, n2, a2, e3[o2 + 14], 9, -1019803690), a2 = v(a2, i2, r3, n2, e3[o2 + 3], 14, -187363961), n2 = v(n2, a2, i2, r3, e3[o2 + 8], 20, 1163531501), r3 = v(r3, n2, a2, i2, e3[o2 + 13], 5, -1444681467), i2 = v(i2, r3, n2, a2, e3[o2 + 2], 9, -51403784), a2 = v(a2, i2, r3, n2, e3[o2 + 7], 14, 1735328473), n2 = v(n2, a2, i2, r3, e3[o2 + 12], 20, -1926607734), r3 = _(r3, n2, a2, i2, e3[o2 + 5], 4, -378558), i2 = _(i2, r3, n2, a2, e3[o2 + 8], 11, -2022574463), a2 = _(a2, i2, r3, n2, e3[o2 + 11], 16, 1839030562), n2 = _(n2, a2, i2, r3, e3[o2 + 14], 23, -35309556), r3 = _(r3, n2, a2, i2, e3[o2 + 1], 4, -1530992060), i2 = _(i2, r3, n2, a2, e3[o2 + 4], 11, 1272893353), a2 = _(a2, i2, r3, n2, e3[o2 + 7], 16, -155497632), n2 = _(n2, a2, i2, r3, e3[o2 + 10], 23, -1094730640), r3 = _(r3, n2, a2, i2, e3[o2 + 13], 4, 681279174), i2 = _(i2, r3, n2, a2, e3[o2], 11, -358537222), a2 = _(a2, i2, r3, n2, e3[o2 + 3], 16, -722521979), n2 = _(n2, a2, i2, r3, e3[o2 + 6], 23, 76029189), r3 = _(r3, n2, a2, i2, e3[o2 + 9], 4, -640364487), i2 = _(i2, r3, n2, a2, e3[o2 + 12], 11, -421815835), a2 = _(a2, i2, r3, n2, e3[o2 + 15], 16, 530742520), n2 = _(n2, a2, i2, r3, e3[o2 + 2], 23, -995338651), r3 = E(r3, n2, a2, i2, e3[o2], 6, -198630844), i2 = E(i2, r3, n2, a2, e3[o2 + 7], 10, 1126891415), a2 = E(a2, i2, r3, n2, e3[o2 + 14], 15, -1416354905), n2 = E(n2, a2, i2, r3, e3[o2 + 5], 21, -57434055), r3 = E(r3, n2, a2, i2, e3[o2 + 12], 6, 1700485571), i2 = E(i2, r3, n2, a2, e3[o2 + 3], 10, -1894986606), a2 = E(a2, i2, r3, n2, e3[o2 + 10], 15, -1051523), n2 = E(n2, a2, i2, r3, e3[o2 + 1], 21, -2054922799), r3 = E(r3, n2, a2, i2, e3[o2 + 8], 6, 1873313359), i2 = E(i2, r3, n2, a2, e3[o2 + 15], 10, -30611744), a2 = E(a2, i2, r3, n2, e3[o2 + 6], 15, -1560198380), n2 = E(n2, a2, i2, r3, e3[o2 + 13], 21, 1309151649), r3 = E(r3, n2, a2, i2, e3[o2 + 4], 6, -145523070), i2 = E(i2, r3, n2, a2, e3[o2 + 11], 10, -1120210379), a2 = E(a2, i2, r3, n2, e3[o2 + 2], 15, 718787259), n2 = E(n2, a2, i2, r3, e3[o2 + 9], 21, -343485551), r3 = m(r3, s2), n2 = m(n2, l2), a2 = m(a2, c2), i2 = m(i2, u2);
          }
          return [r3, n2, a2, i2];
        }(function(e3) {
          if (0 === e3.length) return [];
          for (var t3 = 8 * e3.length, r3 = new Uint32Array(y(t3)), n2 = 0; n2 < t3; n2 += 8) r3[n2 >> 5] |= (255 & e3[n2 / 8]) << n2 % 32;
          return r3;
        }(e2), 8 * e2.length));
      }), x = function(e2, t2, r2) {
        var n2 = (e2 = e2 || {}).random || (e2.rng || i)();
        if (n2[6] = 15 & n2[6] | 64, n2[8] = 63 & n2[8] | 128, t2) {
          r2 = r2 || 0;
          for (var a2 = 0; a2 < 16; ++a2) t2[r2 + a2] = n2[a2];
          return t2;
        }
        return u(n2);
      };
      function A(e2, t2) {
        return e2 << t2 | e2 >>> 32 - t2;
      }
      let C = g("v5", 80, function(e2) {
        var t2 = [1518500249, 1859775393, 2400959708, 3395469782], r2 = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        if ("string" == typeof e2) {
          var n2 = unescape(encodeURIComponent(e2));
          e2 = [];
          for (var a2 = 0; a2 < n2.length; ++a2) e2.push(n2.charCodeAt(a2));
        } else Array.isArray(e2) || (e2 = Array.prototype.slice.call(e2));
        e2.push(128);
        for (var i2 = Math.ceil((e2.length / 4 + 2) / 16), o2 = Array(i2), s2 = 0; s2 < i2; ++s2) {
          for (var l2 = new Uint32Array(16), c2 = 0; c2 < 16; ++c2) l2[c2] = e2[64 * s2 + 4 * c2] << 24 | e2[64 * s2 + 4 * c2 + 1] << 16 | e2[64 * s2 + 4 * c2 + 2] << 8 | e2[64 * s2 + 4 * c2 + 3];
          o2[s2] = l2;
        }
        o2[i2 - 1][14] = (e2.length - 1) * 8 / 4294967296, o2[i2 - 1][14] = Math.floor(o2[i2 - 1][14]), o2[i2 - 1][15] = (e2.length - 1) * 8 | 0;
        for (var u2 = 0; u2 < i2; ++u2) {
          for (var d2 = new Uint32Array(80), p2 = 0; p2 < 16; ++p2) d2[p2] = o2[u2][p2];
          for (var h2 = 16; h2 < 80; ++h2) d2[h2] = A(d2[h2 - 3] ^ d2[h2 - 8] ^ d2[h2 - 14] ^ d2[h2 - 16], 1);
          for (var f2 = r2[0], g2 = r2[1], y2 = r2[2], m2 = r2[3], w2 = r2[4], b2 = 0; b2 < 80; ++b2) {
            var v2 = Math.floor(b2 / 20), _2 = A(f2, 5) + function(e3, t3, r3, n3) {
              switch (e3) {
                case 0:
                  return t3 & r3 ^ ~t3 & n3;
                case 1:
                case 3:
                  return t3 ^ r3 ^ n3;
                case 2:
                  return t3 & r3 ^ t3 & n3 ^ r3 & n3;
              }
            }(v2, g2, y2, m2) + w2 + t2[v2] + d2[b2] >>> 0;
            w2 = m2, m2 = y2, y2 = A(g2, 30) >>> 0, g2 = f2, f2 = _2;
          }
          r2[0] = r2[0] + f2 >>> 0, r2[1] = r2[1] + g2 >>> 0, r2[2] = r2[2] + y2 >>> 0, r2[3] = r2[3] + m2 >>> 0, r2[4] = r2[4] + w2 >>> 0;
        }
        return [r2[0] >> 24 & 255, r2[0] >> 16 & 255, r2[0] >> 8 & 255, 255 & r2[0], r2[1] >> 24 & 255, r2[1] >> 16 & 255, r2[1] >> 8 & 255, 255 & r2[1], r2[2] >> 24 & 255, r2[2] >> 16 & 255, r2[2] >> 8 & 255, 255 & r2[2], r2[3] >> 24 & 255, r2[3] >> 16 & 255, r2[3] >> 8 & 255, 255 & r2[3], r2[4] >> 24 & 255, r2[4] >> 16 & 255, r2[4] >> 8 & 255, 255 & r2[4]];
      }), P = "00000000-0000-0000-0000-000000000000", R = function(e2) {
        if (!s(e2)) throw TypeError("Invalid UUID");
        return parseInt(e2.substr(14, 1), 16);
      };
    }, 83111, (e, t, r) => {
      "use strict";
      function n(e2, t2, r2) {
        a(e2, t2), t2.set(e2, r2);
      }
      function a(e2, t2) {
        if (t2.has(e2)) throw TypeError("Cannot initialize the same private elements twice on an object");
      }
      function i(e2, t2) {
        return e2.get(s(e2, t2));
      }
      function o(e2, t2, r2) {
        return e2.set(s(e2, t2), r2), r2;
      }
      function s(e2, t2, r2) {
        if ("function" == typeof e2 ? e2 === t2 : e2.has(t2)) return arguments.length < 3 ? t2 : r2;
        throw TypeError("Private element is not present on this object");
      }
      Object.defineProperty(r, "__esModule", { value: true }), r.SessionStore = void 0, r.defaultCookies = function(e2) {
        let t2 = e2 ? "__Secure-" : "";
        return { sessionToken: { name: `${t2}next-auth.session-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e2 } }, callbackUrl: { name: `${t2}next-auth.callback-url`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e2 } }, csrfToken: { name: `${e2 ? "__Host-" : ""}next-auth.csrf-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e2 } }, pkceCodeVerifier: { name: `${t2}next-auth.pkce.code_verifier`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e2, maxAge: 900 } }, state: { name: `${t2}next-auth.state`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e2, maxAge: 900 } }, nonce: { name: `${t2}next-auth.nonce`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: e2 } } };
      };
      var l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakSet();
      function p(e2) {
        let t2 = Math.ceil(e2.value.length / 3933);
        if (1 === t2) return i(l, this)[e2.name] = e2.value, [e2];
        let r2 = [];
        for (let n2 = 0; n2 < t2; n2++) {
          let t3 = `${e2.name}.${n2}`, a2 = e2.value.substr(3933 * n2, 3933);
          r2.push({ ...e2, name: t3, value: a2 }), i(l, this)[t3] = a2;
        }
        return i(u, this).debug("CHUNKING_SESSION_COOKIE", { message: "Session cookie exceeds allowed 4096 bytes.", emptyCookieSize: 163, valueSize: e2.value.length, chunks: r2.map((e3) => e3.value.length + 163) }), r2;
      }
      function h() {
        let e2 = {};
        for (let r2 in i(l, this)) {
          var t2;
          null == (t2 = i(l, this)) || delete t2[r2], e2[r2] = { name: r2, value: "", options: { ...i(c, this).options, maxAge: 0 } };
        }
        return e2;
      }
      r.SessionStore = class {
        constructor(e2, t2, r2) {
          !function(e3, t3) {
            a(e3, t3), t3.add(e3);
          }(this, d), n(this, l, {}), n(this, c, void 0), n(this, u, void 0), o(u, this, r2), o(c, this, e2);
          let { cookies: s2 } = t2, { name: p2 } = e2;
          if ("function" == typeof (null == s2 ? void 0 : s2.getAll)) for (let { name: e3, value: t3 } of s2.getAll()) e3.startsWith(p2) && (i(l, this)[e3] = t3);
          else if (s2 instanceof Map) for (let e3 of s2.keys()) e3.startsWith(p2) && (i(l, this)[e3] = s2.get(e3));
          else for (let e3 in s2) e3.startsWith(p2) && (i(l, this)[e3] = s2[e3]);
        }
        get value() {
          return Object.keys(i(l, this)).sort((e2, t2) => {
            var r2, n2;
            return parseInt(null != (r2 = e2.split(".").pop()) ? r2 : "0") - parseInt(null != (n2 = t2.split(".").pop()) ? n2 : "0");
          }).map((e2) => i(l, this)[e2]).join("");
        }
        chunk(e2, t2) {
          let r2 = s(d, this, h).call(this);
          for (let n2 of s(d, this, p).call(this, { name: i(c, this).name, value: e2, options: { ...i(c, this).options, ...t2 } })) r2[n2.name] = n2;
          return Object.values(r2);
        }
        clean() {
          return Object.values(s(d, this, h).call(this));
        }
      };
    }, 12594, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
    }, 79464, (e, t, r) => {
      "use strict";
      var n = e.r(89666);
      Object.defineProperty(r, "__esModule", { value: true });
      var a = { encode: true, decode: true, getToken: true };
      r.decode = d, r.encode = u, r.getToken = p;
      var i = e.r(62665), o = n(e.r(9145)), s = e.r(67866), l = e.r(83111), c = e.r(12594);
      async function u(e2) {
        let { token: t2 = {}, secret: r2, maxAge: n2 = 2592e3, salt: a2 = "" } = e2, o2 = await h(r2, a2);
        return await new i.EncryptJWT(t2).setProtectedHeader({ alg: "dir", enc: "A256GCM" }).setIssuedAt().setExpirationTime((Date.now() / 1e3 | 0) + n2).setJti((0, s.v4)()).encrypt(o2);
      }
      async function d(e2) {
        let { token: t2, secret: r2, salt: n2 = "" } = e2;
        if (!t2) return null;
        let a2 = await h(r2, n2), { payload: o2 } = await (0, i.jwtDecrypt)(t2, a2, { clockTolerance: 15 });
        return o2;
      }
      async function p(e2) {
        var t2, r2, n2, a2;
        let { req: i2, secureCookie: o2 = null != (t2 = null == (r2 = process.env.NEXTAUTH_URL) ? void 0 : r2.startsWith("https://")) ? t2 : !!process.env.VERCEL, cookieName: s2 = o2 ? "__Secure-next-auth.session-token" : "next-auth.session-token", raw: c2, decode: u2 = d, logger: p2 = console, secret: h2 = null != (n2 = process.env.NEXTAUTH_SECRET) ? n2 : process.env.AUTH_SECRET } = e2;
        if (!i2) throw Error("Must pass `req` to JWT getToken()");
        let f = new l.SessionStore({ name: s2, options: { secure: o2 } }, { cookies: i2.cookies, headers: i2.headers }, p2).value, g = i2.headers instanceof Headers ? i2.headers.get("authorization") : null == (a2 = i2.headers) ? void 0 : a2.authorization;
        if (f || (null == g ? void 0 : g.split(" ")[0]) !== "Bearer" || (f = decodeURIComponent(g.split(" ")[1])), !f) return null;
        if (c2) return f;
        try {
          return await u2({ token: f, secret: h2 });
        } catch (e3) {
          return null;
        }
      }
      async function h(e2, t2) {
        return await (0, o.default)("sha256", e2, t2, `NextAuth.js Generated Encryption Key${t2 ? ` (${t2})` : ""}`, 32);
      }
      Object.keys(c).forEach(function(e2) {
        !("default" === e2 || "__esModule" === e2 || Object.prototype.hasOwnProperty.call(a, e2)) && (e2 in r && r[e2] === c[e2] || Object.defineProperty(r, e2, { enumerable: true, get: function() {
          return c[e2];
        } }));
      });
    }, 64445, (e, t, r) => {
      (() => {
        var r2 = { 226: function(t2, r3) {
          !function(n2, a2) {
            "use strict";
            var i = "function", o = "undefined", s = "object", l = "string", c = "major", u = "model", d = "name", p = "type", h = "vendor", f = "version", g = "architecture", y = "console", m = "mobile", w = "tablet", b = "smarttv", v = "wearable", _ = "embedded", E = "Amazon", S = "Apple", x = "ASUS", A = "BlackBerry", C = "Browser", P = "Chrome", R = "Firefox", T = "Google", O = "Huawei", k = "Microsoft", I = "Motorola", N = "Opera", H = "Samsung", M = "Sharp", D = "Sony", j = "Xiaomi", U = "Zebra", W = "Facebook", K = "Chromium OS", L = "Mac OS", J = function(e2, t3) {
              var r4 = {};
              for (var n3 in e2) t3[n3] && t3[n3].length % 2 == 0 ? r4[n3] = t3[n3].concat(e2[n3]) : r4[n3] = e2[n3];
              return r4;
            }, B = function(e2) {
              for (var t3 = {}, r4 = 0; r4 < e2.length; r4++) t3[e2[r4].toUpperCase()] = e2[r4];
              return t3;
            }, $ = function(e2, t3) {
              return typeof e2 === l && -1 !== V(t3).indexOf(V(e2));
            }, V = function(e2) {
              return e2.toLowerCase();
            }, G = function(e2, t3) {
              if (typeof e2 === l) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === o ? e2 : e2.substring(0, 350);
            }, q = function(e2, t3) {
              for (var r4, n3, o2, l2, c2, u2, d2 = 0; d2 < t3.length && !c2; ) {
                var p2 = t3[d2], h2 = t3[d2 + 1];
                for (r4 = n3 = 0; r4 < p2.length && !c2 && p2[r4]; ) if (c2 = p2[r4++].exec(e2)) for (o2 = 0; o2 < h2.length; o2++) u2 = c2[++n3], typeof (l2 = h2[o2]) === s && l2.length > 0 ? 2 === l2.length ? typeof l2[1] == i ? this[l2[0]] = l2[1].call(this, u2) : this[l2[0]] = l2[1] : 3 === l2.length ? typeof l2[1] !== i || l2[1].exec && l2[1].test ? this[l2[0]] = u2 ? u2.replace(l2[1], l2[2]) : void 0 : this[l2[0]] = u2 ? l2[1].call(this, u2, l2[2]) : void 0 : 4 === l2.length && (this[l2[0]] = u2 ? l2[3].call(this, u2.replace(l2[1], l2[2])) : a2) : this[l2] = u2 || a2;
                d2 += 2;
              }
            }, z = function(e2, t3) {
              for (var r4 in t3) if (typeof t3[r4] === s && t3[r4].length > 0) {
                for (var n3 = 0; n3 < t3[r4].length; n3++) if ($(t3[r4][n3], e2)) return "?" === r4 ? a2 : r4;
              } else if ($(t3[r4], e2)) return "?" === r4 ? a2 : r4;
              return e2;
            }, F = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, X = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [f, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [f, [d, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [d, f], [/opios[\/ ]+([\w\.]+)/i], [f, [d, N + " Mini"]], [/\bopr\/([\w\.]+)/i], [f, [d, N]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [d, f], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [f, [d, "UC" + C]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [f, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [f, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [f, [d, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [f, [d, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [f, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, "$1 Secure " + C], f], [/\bfocus\/([\w\.]+)/i], [f, [d, R + " Focus"]], [/\bopt\/([\w\.]+)/i], [f, [d, N + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [f, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [f, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [f, [d, N + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [f, [d, "MIUI " + C]], [/fxios\/([-\w\.]+)/i], [f, [d, R]], [/\bqihu|(qi?ho?o?|360)browser/i], [[d, "360 " + C]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[d, /(.+)/, "$1 " + C], f], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], f], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [d, f], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [d], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[d, W], f], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [d, f], [/\bgsa\/([\w\.]+) .*safari\//i], [f, [d, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [f, [d, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [f, [d, P + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[d, P + " WebView"], f], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [f, [d, "Android " + C]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [d, f], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [f, [d, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [f, d], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [d, [f, z, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [d, f], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[d, "Netscape"], f], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [f, [d, R + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [d, f], [/(cobalt)\/([\w\.]+)/i], [d, [f, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[g, "amd64"]], [/(ia32(?=;))/i], [[g, V]], [/((?:i[346]|x)86)[;\)]/i], [[g, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[g, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[g, "armhf"]], [/windows (ce|mobile); ppc;/i], [[g, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[g, /ower/, "", V]], [/(sun4\w)[;\)]/i], [[g, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[g, V]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [u, [h, H], [p, w]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [u, [h, H], [p, m]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [u, [h, S], [p, m]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [u, [h, S], [p, w]], [/(macintosh);/i], [u, [h, S]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [u, [h, M], [p, m]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [u, [h, O], [p, w]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [u, [h, O], [p, m]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[u, /_/g, " "], [h, j], [p, m]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[u, /_/g, " "], [h, j], [p, w]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [u, [h, "OPPO"], [p, m]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [u, [h, "Vivo"], [p, m]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [u, [h, "Realme"], [p, m]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [u, [h, I], [p, m]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [u, [h, I], [p, w]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [u, [h, "LG"], [p, w]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [u, [h, "LG"], [p, m]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [u, [h, "Lenovo"], [p, w]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[u, /_/g, " "], [h, "Nokia"], [p, m]], [/(pixel c)\b/i], [u, [h, T], [p, w]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [u, [h, T], [p, m]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [u, [h, D], [p, m]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[u, "Xperia Tablet"], [h, D], [p, w]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [u, [h, "OnePlus"], [p, m]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [u, [h, E], [p, w]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[u, /(.+)/g, "Fire Phone $1"], [h, E], [p, m]], [/(playbook);[-\w\),; ]+(rim)/i], [u, h, [p, w]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [u, [h, A], [p, m]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [u, [h, x], [p, w]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [u, [h, x], [p, m]], [/(nexus 9)/i], [u, [h, "HTC"], [p, w]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [h, [u, /_/g, " "], [p, m]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [u, [h, "Acer"], [p, w]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [u, [h, "Meizu"], [p, m]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [h, u, [p, m]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [h, u, [p, w]], [/(surface duo)/i], [u, [h, k], [p, w]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [u, [h, "Fairphone"], [p, m]], [/(u304aa)/i], [u, [h, "AT&T"], [p, m]], [/\bsie-(\w*)/i], [u, [h, "Siemens"], [p, m]], [/\b(rct\w+) b/i], [u, [h, "RCA"], [p, w]], [/\b(venue[\d ]{2,7}) b/i], [u, [h, "Dell"], [p, w]], [/\b(q(?:mv|ta)\w+) b/i], [u, [h, "Verizon"], [p, w]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [u, [h, "Barnes & Noble"], [p, w]], [/\b(tm\d{3}\w+) b/i], [u, [h, "NuVision"], [p, w]], [/\b(k88) b/i], [u, [h, "ZTE"], [p, w]], [/\b(nx\d{3}j) b/i], [u, [h, "ZTE"], [p, m]], [/\b(gen\d{3}) b.+49h/i], [u, [h, "Swiss"], [p, m]], [/\b(zur\d{3}) b/i], [u, [h, "Swiss"], [p, w]], [/\b((zeki)?tb.*\b) b/i], [u, [h, "Zeki"], [p, w]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[h, "Dragon Touch"], u, [p, w]], [/\b(ns-?\w{0,9}) b/i], [u, [h, "Insignia"], [p, w]], [/\b((nxa|next)-?\w{0,9}) b/i], [u, [h, "NextBook"], [p, w]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[h, "Voice"], u, [p, m]], [/\b(lvtel\-)?(v1[12]) b/i], [[h, "LvTel"], u, [p, m]], [/\b(ph-1) /i], [u, [h, "Essential"], [p, m]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [u, [h, "Envizen"], [p, w]], [/\b(trio[-\w\. ]+) b/i], [u, [h, "MachSpeed"], [p, w]], [/\btu_(1491) b/i], [u, [h, "Rotor"], [p, w]], [/(shield[\w ]+) b/i], [u, [h, "Nvidia"], [p, w]], [/(sprint) (\w+)/i], [h, u, [p, m]], [/(kin\.[onetw]{3})/i], [[u, /\./g, " "], [h, k], [p, m]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [u, [h, U], [p, w]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [u, [h, U], [p, m]], [/smart-tv.+(samsung)/i], [h, [p, b]], [/hbbtv.+maple;(\d+)/i], [[u, /^/, "SmartTV"], [h, H], [p, b]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[h, "LG"], [p, b]], [/(apple) ?tv/i], [h, [u, S + " TV"], [p, b]], [/crkey/i], [[u, P + "cast"], [h, T], [p, b]], [/droid.+aft(\w)( bui|\))/i], [u, [h, E], [p, b]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [u, [h, M], [p, b]], [/(bravia[\w ]+)( bui|\))/i], [u, [h, D], [p, b]], [/(mitv-\w{5}) bui/i], [u, [h, j], [p, b]], [/Hbbtv.*(technisat) (.*);/i], [h, u, [p, b]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[h, G], [u, G], [p, b]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[p, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [h, u, [p, y]], [/droid.+; (shield) bui/i], [u, [h, "Nvidia"], [p, y]], [/(playstation [345portablevi]+)/i], [u, [h, D], [p, y]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [u, [h, k], [p, y]], [/((pebble))app/i], [h, u, [p, v]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [u, [h, S], [p, v]], [/droid.+; (glass) \d/i], [u, [h, T], [p, v]], [/droid.+; (wt63?0{2,3})\)/i], [u, [h, U], [p, v]], [/(quest( 2| pro)?)/i], [u, [h, W], [p, v]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [h, [p, _]], [/(aeobc)\b/i], [u, [h, E], [p, _]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [u, [p, m]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [u, [p, w]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[p, w]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[p, m]], [/(android[-\w\. ]{0,9});.+buil/i], [u, [h, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [f, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [f, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [d, f], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [f, d]], os: [[/microsoft (windows) (vista|xp)/i], [d, f], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [d, [f, z, F]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[d, "Windows"], [f, z, F]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[f, /_/g, "."], [d, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[d, L], [f, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [f, d], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [d, f], [/\(bb(10);/i], [f, [d, A]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [f, [d, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [f, [d, R + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [f, [d, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [f, [d, "watchOS"]], [/crkey\/([\d\.]+)/i], [f, [d, P + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[d, K], f], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [d, f], [/(sunos) ?([\w\.\d]*)/i], [[d, "Solaris"], f], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [d, f]] }, Y = function(e2, t3) {
              if (typeof e2 === s && (t3 = e2, e2 = a2), !(this instanceof Y)) return new Y(e2, t3).getResult();
              var r4 = typeof n2 !== o && n2.navigator ? n2.navigator : a2, y2 = e2 || (r4 && r4.userAgent ? r4.userAgent : ""), b2 = r4 && r4.userAgentData ? r4.userAgentData : a2, v2 = t3 ? J(X, t3) : X, _2 = r4 && r4.userAgent == y2;
              return this.getBrowser = function() {
                var e3, t4 = {};
                return t4[d] = a2, t4[f] = a2, q.call(t4, y2, v2.browser), t4[c] = typeof (e3 = t4[f]) === l ? e3.replace(/[^\d\.]/g, "").split(".")[0] : a2, _2 && r4 && r4.brave && typeof r4.brave.isBrave == i && (t4[d] = "Brave"), t4;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[g] = a2, q.call(e3, y2, v2.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[h] = a2, e3[u] = a2, e3[p] = a2, q.call(e3, y2, v2.device), _2 && !e3[p] && b2 && b2.mobile && (e3[p] = m), _2 && "Macintosh" == e3[u] && r4 && typeof r4.standalone !== o && r4.maxTouchPoints && r4.maxTouchPoints > 2 && (e3[u] = "iPad", e3[p] = w), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[d] = a2, e3[f] = a2, q.call(e3, y2, v2.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[d] = a2, e3[f] = a2, q.call(e3, y2, v2.os), _2 && !e3[d] && b2 && "Unknown" != b2.platform && (e3[d] = b2.platform.replace(/chrome os/i, K).replace(/macos/i, L)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return y2;
              }, this.setUA = function(e3) {
                return y2 = typeof e3 === l && e3.length > 350 ? G(e3, 350) : e3, this;
              }, this.setUA(y2), this;
            };
            if (Y.VERSION = "1.0.35", Y.BROWSER = B([d, f, c]), Y.CPU = B([g]), Y.DEVICE = B([u, h, p, y, m, b, w, v, _]), Y.ENGINE = Y.OS = B([d, f]), typeof r3 !== o) t2.exports && (r3 = t2.exports = Y), r3.UAParser = Y;
            else if (typeof define === i && define.amd) e.r, void 0 !== Y && e.v(Y);
            else typeof n2 !== o && (n2.UAParser = Y);
            var Q = typeof n2 !== o && (n2.jQuery || n2.Zepto);
            if (Q && !Q.ua) {
              var Z = new Y();
              Q.ua = Z.getResult(), Q.ua.get = function() {
                return Z.getUA();
              }, Q.ua.set = function(e2) {
                Z.setUA(e2);
                var t3 = Z.getResult();
                for (var r4 in t3) Q.ua[r4] = t3[r4];
              };
            }
          }(this);
        } }, n = {};
        function a(e2) {
          var t2 = n[e2];
          if (void 0 !== t2) return t2.exports;
          var i = n[e2] = { exports: {} }, o = true;
          try {
            r2[e2].call(i.exports, i, i.exports, a), o = false;
          } finally {
            o && delete n[e2];
          }
          return i.exports;
        }
        a.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = a(226);
      })();
    }, 8946, (e, t, r) => {
      "use strict";
      var n = { H: null, A: null };
      function a(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var i = Array.isArray;
      function o() {
      }
      var s = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), p = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), y = Symbol.iterator, m = Object.prototype.hasOwnProperty, w = Object.assign;
      function b(e2, t2, r2) {
        var n2 = r2.ref;
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== n2 ? n2 : null, props: r2 };
      }
      function v(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      var _ = /\/+/g;
      function E(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function S(e2, t2, r2) {
        if (null == e2) return e2;
        var n2 = [], c2 = 0;
        return !function e3(t3, r3, n3, c3, u2) {
          var d2, p2, h2, f2 = typeof t3;
          ("undefined" === f2 || "boolean" === f2) && (t3 = null);
          var m2 = false;
          if (null === t3) m2 = true;
          else switch (f2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case s:
                case l:
                  m2 = true;
                  break;
                case g:
                  return e3((m2 = t3._init)(t3._payload), r3, n3, c3, u2);
              }
          }
          if (m2) return u2 = u2(t3), m2 = "" === c3 ? "." + E(t3, 0) : c3, i(u2) ? (n3 = "", null != m2 && (n3 = m2.replace(_, "$&/") + "/"), e3(u2, r3, n3, "", function(e4) {
            return e4;
          })) : null != u2 && (v(u2) && (d2 = u2, p2 = n3 + (null == u2.key || t3 && t3.key === u2.key ? "" : ("" + u2.key).replace(_, "$&/") + "/") + m2, u2 = b(d2.type, p2, d2.props)), r3.push(u2)), 1;
          m2 = 0;
          var w2 = "" === c3 ? "." : c3 + ":";
          if (i(t3)) for (var S2 = 0; S2 < t3.length; S2++) f2 = w2 + E(c3 = t3[S2], S2), m2 += e3(c3, r3, n3, f2, u2);
          else if ("function" == typeof (S2 = null === (h2 = t3) || "object" != typeof h2 ? null : "function" == typeof (h2 = y && h2[y] || h2["@@iterator"]) ? h2 : null)) for (t3 = S2.call(t3), S2 = 0; !(c3 = t3.next()).done; ) f2 = w2 + E(c3 = c3.value, S2++), m2 += e3(c3, r3, n3, f2, u2);
          else if ("object" === f2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(o, o) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, n3, c3, u2);
            throw Error(a(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        }(e2, n2, "", "", function(e3) {
          return t2.call(r2, e3, c2++);
        }), n2;
      }
      function x(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function A() {
        return /* @__PURE__ */ new WeakMap();
      }
      function C() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Children = { map: S, forEach: function(e2, t2, r2) {
        S(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return S(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return S(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!v(e2)) throw Error(a(143));
        return e2;
      } }, r.Fragment = c, r.Profiler = d, r.StrictMode = u, r.Suspense = h, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, r.cache = function(e2) {
        return function() {
          var t2 = n.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(A);
          void 0 === (t2 = r2.get(e2)) && (t2 = C(), r2.set(e2, t2)), r2 = 0;
          for (var a2 = arguments.length; r2 < a2; r2++) {
            var i2 = arguments[r2];
            if ("function" == typeof i2 || "object" == typeof i2 && null !== i2) {
              var o2 = t2.o;
              null === o2 && (t2.o = o2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = o2.get(i2)) && (t2 = C(), o2.set(i2, t2));
            } else null === (o2 = t2.p) && (t2.p = o2 = /* @__PURE__ */ new Map()), void 0 === (t2 = o2.get(i2)) && (t2 = C(), o2.set(i2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var s2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = s2;
          } catch (e3) {
            throw (s2 = t2).s = 2, s2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(a(267, e2));
        var n2 = w({}, e2.props), i2 = e2.key;
        if (null != t2) for (o2 in void 0 !== t2.key && (i2 = "" + t2.key), t2) m.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (n2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) n2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          n2.children = s2;
        }
        return b(e2.type, i2, n2);
      }, r.createElement = function(e2, t2, r2) {
        var n2, a2 = {}, i2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (i2 = "" + t2.key), t2) m.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (a2[n2] = t2[n2]);
        var o2 = arguments.length - 2;
        if (1 === o2) a2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          a2.children = s2;
        }
        if (e2 && e2.defaultProps) for (n2 in o2 = e2.defaultProps) void 0 === a2[n2] && (a2[n2] = o2[n2]);
        return b(e2, i2, a2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: p, render: e2 };
      }, r.isValidElement = v, r.lazy = function(e2) {
        return { $$typeof: g, _payload: { _status: -1, _result: e2 }, _init: x };
      }, r.memo = function(e2, t2) {
        return { $$typeof: f, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return n.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return n.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return n.H.useId();
      }, r.useMemo = function(e2, t2) {
        return n.H.useMemo(e2, t2);
      }, r.version = "19.2.0-canary-0bdb9206-20250818";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(8946);
    }, 58217, (e) => {
      "use strict";
      let t;
      async function r() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.s(["default", () => tb], 58217);
      let n = null;
      async function a() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        n || (n = r());
        let e10 = await n;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function i(...e10) {
        let t2 = await r();
        try {
          var n2;
          await (null == t2 || null == (n2 = t2.onRequestError) ? void 0 : n2.call(t2, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let o = null;
      function s() {
        return o || (o = a()), o;
      }
      function l(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t2 = new Proxy(function() {
          }, { get(t3, r2) {
            if ("then" === r2) return {};
            throw Object.defineProperty(Error(l(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(l(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r2, n2, a2) {
            if ("function" == typeof a2[0]) return a2[0](t2);
            throw Object.defineProperty(Error(l(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t2 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      s();
      class c extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class u extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class d extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let p = "_N_T_", h = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function f(e10) {
        var t2, r2, n2, a2, i2, o2 = [], s2 = 0;
        function l2() {
          for (; s2 < e10.length && /\s/.test(e10.charAt(s2)); ) s2 += 1;
          return s2 < e10.length;
        }
        for (; s2 < e10.length; ) {
          for (t2 = s2, i2 = false; l2(); ) if ("," === (r2 = e10.charAt(s2))) {
            for (n2 = s2, s2 += 1, l2(), a2 = s2; s2 < e10.length && "=" !== (r2 = e10.charAt(s2)) && ";" !== r2 && "," !== r2; ) s2 += 1;
            s2 < e10.length && "=" === e10.charAt(s2) ? (i2 = true, s2 = a2, o2.push(e10.substring(t2, n2)), t2 = s2) : s2 = n2 + 1;
          } else s2 += 1;
          (!i2 || s2 >= e10.length) && o2.push(e10.substring(t2, e10.length));
        }
        return o2;
      }
      function g(e10) {
        let t2 = {}, r2 = [];
        if (e10) for (let [n2, a2] of e10.entries()) "set-cookie" === n2.toLowerCase() ? (r2.push(...f(a2)), t2[n2] = 1 === r2.length ? r2[0] : r2) : t2[n2] = a2;
        return t2;
      }
      function y(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t2) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t2 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...h, GROUP: { builtinReact: [h.reactServerComponents, h.actionBrowser], serverOnly: [h.reactServerComponents, h.actionBrowser, h.instrument, h.middleware], neutralTarget: [h.apiNode, h.apiEdge], clientOnly: [h.serverSideRendering, h.appPagesBrowser], bundled: [h.reactServerComponents, h.actionBrowser, h.serverSideRendering, h.appPagesBrowser, h.shared, h.instrument, h.middleware], appPages: [h.reactServerComponents, h.serverSideRendering, h.appPagesBrowser, h.actionBrowser] } });
      let m = Symbol("response"), w = Symbol("passThrough"), b = Symbol("waitUntil");
      class v {
        constructor(e10, t2) {
          this[w] = false, this[b] = t2 ? { kind: "external", function: t2 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[m] || (this[m] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[w] = true;
        }
        waitUntil(e10) {
          if ("external" === this[b].kind) return (0, this[b].function)(e10);
          this[b].promises.push(e10);
        }
      }
      class _ extends v {
        constructor(e10) {
          var t2;
          super(e10.request, null == (t2 = e10.context) ? void 0 : t2.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function E(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function S(e10) {
        let t2 = e10.indexOf("#"), r2 = e10.indexOf("?"), n2 = r2 > -1 && (t2 < 0 || r2 < t2);
        return n2 || t2 > -1 ? { pathname: e10.substring(0, n2 ? r2 : t2), query: n2 ? e10.substring(r2, t2 > -1 ? t2 : void 0) : "", hash: t2 > -1 ? e10.slice(t2) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function x(e10, t2) {
        if (!e10.startsWith("/") || !t2) return e10;
        let { pathname: r2, query: n2, hash: a2 } = S(e10);
        return "" + t2 + r2 + n2 + a2;
      }
      function A(e10, t2) {
        if (!e10.startsWith("/") || !t2) return e10;
        let { pathname: r2, query: n2, hash: a2 } = S(e10);
        return "" + r2 + t2 + n2 + a2;
      }
      function C(e10, t2) {
        if ("string" != typeof e10) return false;
        let { pathname: r2 } = S(e10);
        return r2 === t2 || r2.startsWith(t2 + "/");
      }
      let P = /* @__PURE__ */ new WeakMap();
      function R(e10, t2) {
        let r2;
        if (!t2) return { pathname: e10 };
        let n2 = P.get(t2);
        n2 || (n2 = t2.map((e11) => e11.toLowerCase()), P.set(t2, n2));
        let a2 = e10.split("/", 2);
        if (!a2[1]) return { pathname: e10 };
        let i2 = a2[1].toLowerCase(), o2 = n2.indexOf(i2);
        return o2 < 0 ? { pathname: e10 } : (r2 = t2[o2], { pathname: e10 = e10.slice(r2.length + 1) || "/", detectedLocale: r2 });
      }
      let T = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function O(e10, t2) {
        return new URL(String(e10).replace(T, "localhost"), t2 && String(t2).replace(T, "localhost"));
      }
      let k = Symbol("NextURLInternal");
      class I {
        constructor(e10, t2, r2) {
          let n2, a2;
          "object" == typeof t2 && "pathname" in t2 || "string" == typeof t2 ? (n2 = t2, a2 = r2 || {}) : a2 = r2 || t2 || {}, this[k] = { url: O(e10, n2 ?? a2.base), options: a2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t2, r2, n2, a2;
          let i2 = function(e11, t3) {
            var r3, n3;
            let { basePath: a3, i18n: i3, trailingSlash: o3 } = null != (r3 = t3.nextConfig) ? r3 : {}, s3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : o3 };
            a3 && C(s3.pathname, a3) && (s3.pathname = function(e12, t4) {
              if (!C(e12, t4)) return e12;
              let r4 = e12.slice(t4.length);
              return r4.startsWith("/") ? r4 : "/" + r4;
            }(s3.pathname, a3), s3.basePath = a3);
            let l2 = s3.pathname;
            if (s3.pathname.startsWith("/_next/data/") && s3.pathname.endsWith(".json")) {
              let e12 = s3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              s3.buildId = e12[0], l2 = "index" !== e12[1] ? "/" + e12.slice(1).join("/") : "/", true === t3.parseData && (s3.pathname = l2);
            }
            if (i3) {
              let e12 = t3.i18nProvider ? t3.i18nProvider.analyze(s3.pathname) : R(s3.pathname, i3.locales);
              s3.locale = e12.detectedLocale, s3.pathname = null != (n3 = e12.pathname) ? n3 : s3.pathname, !e12.detectedLocale && s3.buildId && (e12 = t3.i18nProvider ? t3.i18nProvider.analyze(l2) : R(l2, i3.locales)).detectedLocale && (s3.locale = e12.detectedLocale);
            }
            return s3;
          }(this[k].url.pathname, { nextConfig: this[k].options.nextConfig, parseData: true, i18nProvider: this[k].options.i18nProvider }), o2 = function(e11, t3) {
            let r3;
            if ((null == t3 ? void 0 : t3.host) && !Array.isArray(t3.host)) r3 = t3.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r3 = e11.hostname;
            }
            return r3.toLowerCase();
          }(this[k].url, this[k].options.headers);
          this[k].domainLocale = this[k].options.i18nProvider ? this[k].options.i18nProvider.detectDomainLocale(o2) : function(e11, t3, r3) {
            if (e11) for (let i3 of (r3 && (r3 = r3.toLowerCase()), e11)) {
              var n3, a3;
              if (t3 === (null == (n3 = i3.domain) ? void 0 : n3.split(":", 1)[0].toLowerCase()) || r3 === i3.defaultLocale.toLowerCase() || (null == (a3 = i3.locales) ? void 0 : a3.some((e12) => e12.toLowerCase() === r3))) return i3;
            }
          }(null == (t2 = this[k].options.nextConfig) || null == (e10 = t2.i18n) ? void 0 : e10.domains, o2);
          let s2 = (null == (r2 = this[k].domainLocale) ? void 0 : r2.defaultLocale) || (null == (a2 = this[k].options.nextConfig) || null == (n2 = a2.i18n) ? void 0 : n2.defaultLocale);
          this[k].url.pathname = i2.pathname, this[k].defaultLocale = s2, this[k].basePath = i2.basePath ?? "", this[k].buildId = i2.buildId, this[k].locale = i2.locale ?? s2, this[k].trailingSlash = i2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t2;
          return t2 = function(e11, t3, r2, n2) {
            if (!t3 || t3 === r2) return e11;
            let a2 = e11.toLowerCase();
            return !n2 && (C(a2, "/api") || C(a2, "/" + t3.toLowerCase())) ? e11 : x(e11, "/" + t3);
          }((e10 = { basePath: this[k].basePath, buildId: this[k].buildId, defaultLocale: this[k].options.forceLocale ? void 0 : this[k].defaultLocale, locale: this[k].locale, pathname: this[k].url.pathname, trailingSlash: this[k].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t2 = E(t2)), e10.buildId && (t2 = A(x(t2, "/_next/data/" + e10.buildId), "/" === e10.pathname ? "index.json" : ".json")), t2 = x(t2, e10.basePath), !e10.buildId && e10.trailingSlash ? t2.endsWith("/") ? t2 : A(t2, "/") : E(t2);
        }
        formatSearch() {
          return this[k].url.search;
        }
        get buildId() {
          return this[k].buildId;
        }
        set buildId(e10) {
          this[k].buildId = e10;
        }
        get locale() {
          return this[k].locale ?? "";
        }
        set locale(e10) {
          var t2, r2;
          if (!this[k].locale || !(null == (r2 = this[k].options.nextConfig) || null == (t2 = r2.i18n) ? void 0 : t2.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[k].locale = e10;
        }
        get defaultLocale() {
          return this[k].defaultLocale;
        }
        get domainLocale() {
          return this[k].domainLocale;
        }
        get searchParams() {
          return this[k].url.searchParams;
        }
        get host() {
          return this[k].url.host;
        }
        set host(e10) {
          this[k].url.host = e10;
        }
        get hostname() {
          return this[k].url.hostname;
        }
        set hostname(e10) {
          this[k].url.hostname = e10;
        }
        get port() {
          return this[k].url.port;
        }
        set port(e10) {
          this[k].url.port = e10;
        }
        get protocol() {
          return this[k].url.protocol;
        }
        set protocol(e10) {
          this[k].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t2 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t2}${this.hash}`;
        }
        set href(e10) {
          this[k].url = O(e10), this.analyze();
        }
        get origin() {
          return this[k].url.origin;
        }
        get pathname() {
          return this[k].url.pathname;
        }
        set pathname(e10) {
          this[k].url.pathname = e10;
        }
        get hash() {
          return this[k].url.hash;
        }
        set hash(e10) {
          this[k].url.hash = e10;
        }
        get search() {
          return this[k].url.search;
        }
        set search(e10) {
          this[k].url.search = e10;
        }
        get password() {
          return this[k].url.password;
        }
        set password(e10) {
          this[k].url.password = e10;
        }
        get username() {
          return this[k].url.username;
        }
        set username(e10) {
          this[k].url.username = e10;
        }
        get basePath() {
          return this[k].basePath;
        }
        set basePath(e10) {
          this[k].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new I(String(this), this[k].options);
        }
      }
      var N, H = e.i(28042);
      let M = Symbol("internal request");
      class D extends Request {
        constructor(e10, t2 = {}) {
          let r2 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          y(r2), e10 instanceof Request ? super(e10, t2) : super(r2, t2);
          let n2 = new I(r2, { headers: g(this.headers), nextConfig: t2.nextConfig });
          this[M] = { cookies: new H.RequestCookies(this.headers), nextUrl: n2, url: n2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[M].cookies;
        }
        get nextUrl() {
          return this[M].nextUrl;
        }
        get page() {
          throw new u();
        }
        get ua() {
          throw new d();
        }
        get url() {
          return this[M].url;
        }
      }
      class j {
        static get(e10, t2, r2) {
          let n2 = Reflect.get(e10, t2, r2);
          return "function" == typeof n2 ? n2.bind(e10) : n2;
        }
        static set(e10, t2, r2, n2) {
          return Reflect.set(e10, t2, r2, n2);
        }
        static has(e10, t2) {
          return Reflect.has(e10, t2);
        }
        static deleteProperty(e10, t2) {
          return Reflect.deleteProperty(e10, t2);
        }
      }
      let U = Symbol("internal response"), W = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function K(e10, t2) {
        var r2;
        if (null == e10 || null == (r2 = e10.request) ? void 0 : r2.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r3 = [];
          for (let [n2, a2] of e10.request.headers) t2.set("x-middleware-request-" + n2, a2), r3.push(n2);
          t2.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class L extends Response {
        constructor(e10, t2 = {}) {
          super(e10, t2);
          let r2 = this.headers, n2 = new Proxy(new H.ResponseCookies(r2), { get(e11, n3, a2) {
            switch (n3) {
              case "delete":
              case "set":
                return (...a3) => {
                  let i2 = Reflect.apply(e11[n3], e11, a3), o2 = new Headers(r2);
                  return i2 instanceof H.ResponseCookies && r2.set("x-middleware-set-cookie", i2.getAll().map((e12) => (0, H.stringifyCookie)(e12)).join(",")), K(t2, o2), i2;
                };
              default:
                return j.get(e11, n3, a2);
            }
          } });
          this[U] = { cookies: n2, url: t2.url ? new I(t2.url, { headers: g(r2), nextConfig: t2.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[U].cookies;
        }
        static json(e10, t2) {
          let r2 = Response.json(e10, t2);
          return new L(r2.body, r2);
        }
        static redirect(e10, t2) {
          let r2 = "number" == typeof t2 ? t2 : (null == t2 ? void 0 : t2.status) ?? 307;
          if (!W.has(r2)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let n2 = "object" == typeof t2 ? t2 : {}, a2 = new Headers(null == n2 ? void 0 : n2.headers);
          return a2.set("Location", y(e10)), new L(null, { ...n2, headers: a2, status: r2 });
        }
        static rewrite(e10, t2) {
          let r2 = new Headers(null == t2 ? void 0 : t2.headers);
          return r2.set("x-middleware-rewrite", y(e10)), K(t2, r2), new L(null, { ...t2, headers: r2 });
        }
        static next(e10) {
          let t2 = new Headers(null == e10 ? void 0 : e10.headers);
          return t2.set("x-middleware-next", "1"), K(e10, t2), new L(null, { ...e10, headers: t2 });
        }
      }
      function J(e10, t2) {
        let r2 = "string" == typeof t2 ? new URL(t2) : t2, n2 = new URL(e10, t2), a2 = n2.origin === r2.origin;
        return { url: a2 ? n2.toString().slice(r2.origin.length) : n2.toString(), isRelative: a2 };
      }
      let B = "next-router-prefetch", $ = ["rsc", "next-router-state-tree", B, "next-hmr-refresh", "next-router-segment-prefetch"], V = "_rsc";
      class G extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new G();
        }
      }
      class q extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t2, r2, n2) {
            if ("symbol" == typeof r2) return j.get(t2, r2, n2);
            let a2 = r2.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            if (void 0 !== i2) return j.get(t2, i2, n2);
          }, set(t2, r2, n2, a2) {
            if ("symbol" == typeof r2) return j.set(t2, r2, n2, a2);
            let i2 = r2.toLowerCase(), o2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            return j.set(t2, o2 ?? r2, n2, a2);
          }, has(t2, r2) {
            if ("symbol" == typeof r2) return j.has(t2, r2);
            let n2 = r2.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 !== a2 && j.has(t2, a2);
          }, deleteProperty(t2, r2) {
            if ("symbol" == typeof r2) return j.deleteProperty(t2, r2);
            let n2 = r2.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 === a2 || j.deleteProperty(t2, a2);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t2, r2) {
            switch (t2) {
              case "append":
              case "delete":
              case "set":
                return G.callable;
              default:
                return j.get(e11, t2, r2);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new q(e10);
        }
        append(e10, t2) {
          let r2 = this.headers[e10];
          "string" == typeof r2 ? this.headers[e10] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e10] = t2;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t2 = this.headers[e10];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t2) {
          this.headers[e10] = t2;
        }
        forEach(e10, t2) {
          for (let [r2, n2] of this.entries()) e10.call(t2, n2, r2, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t2 = e10.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t2 = e10.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t2 = this.get(e10);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let z = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class F {
        disable() {
          throw z;
        }
        getStore() {
        }
        run() {
          throw z;
        }
        exit() {
          throw z;
        }
        enterWith() {
          throw z;
        }
        static bind(e10) {
          return e10;
        }
      }
      let X = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function Y() {
        return X ? new X() : new F();
      }
      let Q = Y();
      class Z extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new Z();
        }
      }
      class ee {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t2, r2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return Z.callable;
              default:
                return j.get(e11, t2, r2);
            }
          } });
        }
      }
      let et = Symbol.for("next.mutated.cookies");
      class er {
        static wrap(e10, t2) {
          let r2 = new H.ResponseCookies(new Headers());
          for (let t3 of e10.getAll()) r2.set(t3);
          let n2 = [], a2 = /* @__PURE__ */ new Set(), i2 = () => {
            let e11 = Q.getStore();
            if (e11 && (e11.pathWasRevalidated = true), n2 = r2.getAll().filter((e12) => a2.has(e12.name)), t2) {
              let e12 = [];
              for (let t3 of n2) {
                let r3 = new H.ResponseCookies(new Headers());
                r3.set(t3), e12.push(r3.toString());
              }
              t2(e12);
            }
          }, o2 = new Proxy(r2, { get(e11, t3, r3) {
            switch (t3) {
              case et:
                return n2;
              case "delete":
                return function(...t4) {
                  a2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e11.delete(...t4), o2;
                  } finally {
                    i2();
                  }
                };
              case "set":
                return function(...t4) {
                  a2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e11.set(...t4), o2;
                  } finally {
                    i2();
                  }
                };
              default:
                return j.get(e11, t3, r3);
            }
          } });
          return o2;
        }
      }
      function en(e10, t2) {
        if ("action" !== e10.phase) throw new Z();
      }
      var ea = function(e10) {
        return e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404", e10;
      }(ea || {}), ei = function(e10) {
        return e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents", e10;
      }(ei || {}), eo = function(e10) {
        return e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer", e10;
      }(eo || {}), es = function(e10) {
        return e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch", e10;
      }(es || {}), el = function(e10) {
        return e10.startServer = "startServer.startServer", e10;
      }(el || {}), ec = function(e10) {
        return e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult", e10;
      }(ec || {}), eu = function(e10) {
        return e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch", e10;
      }(eu || {}), ed = function(e10) {
        return e10.executeRoute = "Router.executeRoute", e10;
      }(ed || {}), ep = function(e10) {
        return e10.runHandler = "Node.runHandler", e10;
      }(ep || {}), eh = function(e10) {
        return e10.runHandler = "AppRouteRouteHandlers.runHandler", e10;
      }(eh || {}), ef = function(e10) {
        return e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport", e10;
      }(ef || {}), eg = function(e10) {
        return e10.execute = "Middleware.execute", e10;
      }(eg || {});
      let ey = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), em = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function ew(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let eb = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: ev, propagation: e_, trace: eE, SpanStatusCode: eS, SpanKind: ex, ROOT_CONTEXT: eA } = t = e.r(59110);
      class eC extends Error {
        constructor(e10, t2) {
          super(), this.bubble = e10, this.result = t2;
        }
      }
      let eP = (e10, t2) => {
        (function(e11) {
          return "object" == typeof e11 && null !== e11 && e11 instanceof eC;
        })(t2) && t2.bubble ? e10.setAttribute("next.bubble", true) : (t2 && (e10.recordException(t2), e10.setAttribute("error.type", t2.name)), e10.setStatus({ code: eS.ERROR, message: null == t2 ? void 0 : t2.message })), e10.end();
      }, eR = /* @__PURE__ */ new Map(), eT = t.createContextKey("next.rootSpanId"), eO = 0, ek = { set(e10, t2, r2) {
        e10.push({ key: t2, value: r2 });
      } };
      class eI {
        getTracerInstance() {
          return eE.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ev;
        }
        getTracePropagationData() {
          let e10 = ev.active(), t2 = [];
          return e_.inject(e10, t2, ek), t2;
        }
        getActiveScopeSpan() {
          return eE.getSpan(null == ev ? void 0 : ev.active());
        }
        withPropagatedContext(e10, t2, r2) {
          let n2 = ev.active();
          if (eE.getSpanContext(n2)) return t2();
          let a2 = e_.extract(n2, e10, r2);
          return ev.with(a2, t2);
        }
        trace(...e10) {
          var t2;
          let [r2, n2, a2] = e10, { fn: i2, options: o2 } = "function" == typeof n2 ? { fn: n2, options: {} } : { fn: a2, options: { ...n2 } }, s2 = o2.spanName ?? r2;
          if (!ey.has(r2) && "1" !== process.env.NEXT_OTEL_VERBOSE || o2.hideSpan) return i2();
          let l2 = this.getSpanContext((null == o2 ? void 0 : o2.parentSpan) ?? this.getActiveScopeSpan()), c2 = false;
          l2 ? (null == (t2 = eE.getSpanContext(l2)) ? void 0 : t2.isRemote) && (c2 = true) : (l2 = (null == ev ? void 0 : ev.active()) ?? eA, c2 = true);
          let u2 = eO++;
          return o2.attributes = { "next.span_name": s2, "next.span_type": r2, ...o2.attributes }, ev.with(l2.setValue(eT, u2), () => this.getTracerInstance().startActiveSpan(s2, o2, (e11) => {
            let t3;
            eb && r2 && em.has(r2) && (t3 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let n3 = false, a3 = () => {
              !n3 && (n3 = true, eR.delete(u2), t3 && performance.measure(`${eb}:next-${(r2.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t3, end: performance.now() }));
            };
            if (c2 && eR.set(u2, new Map(Object.entries(o2.attributes ?? {}))), i2.length > 1) try {
              return i2(e11, (t4) => eP(e11, t4));
            } catch (t4) {
              throw eP(e11, t4), t4;
            } finally {
              a3();
            }
            try {
              let t4 = i2(e11);
              if (ew(t4)) return t4.then((t5) => (e11.end(), t5)).catch((t5) => {
                throw eP(e11, t5), t5;
              }).finally(a3);
              return e11.end(), a3(), t4;
            } catch (t4) {
              throw eP(e11, t4), a3(), t4;
            }
          }));
        }
        wrap(...e10) {
          let t2 = this, [r2, n2, a2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return ey.has(r2) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n2;
            "function" == typeof e11 && "function" == typeof a2 && (e11 = e11.apply(this, arguments));
            let i2 = arguments.length - 1, o2 = arguments[i2];
            if ("function" != typeof o2) return t2.trace(r2, e11, () => a2.apply(this, arguments));
            {
              let n3 = t2.getContext().bind(ev.active(), o2);
              return t2.trace(r2, e11, (e12, t3) => (arguments[i2] = function(e13) {
                return null == t3 || t3(e13), n3.apply(this, arguments);
              }, a2.apply(this, arguments)));
            }
          } : a2;
        }
        startSpan(...e10) {
          let [t2, r2] = e10, n2 = this.getSpanContext((null == r2 ? void 0 : r2.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t2, r2, n2);
        }
        getSpanContext(e10) {
          return e10 ? eE.setSpan(ev.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = ev.active().getValue(eT);
          return eR.get(e10);
        }
        setRootSpanAttribute(e10, t2) {
          let r2 = ev.active().getValue(eT), n2 = eR.get(r2);
          n2 && n2.set(e10, t2);
        }
      }
      let eN = (() => {
        let e10 = new eI();
        return () => e10;
      })(), eH = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eH);
      class eM {
        constructor(e10, t2, r2, n2) {
          var a2;
          let i2 = e10 && function(e11, t3) {
            let r3 = q.from(e11.headers);
            return { isOnDemandRevalidate: r3.get("x-prerender-revalidate") === t3.previewModeId, revalidateOnlyGenerated: r3.has("x-prerender-revalidate-if-generated") };
          }(t2, e10).isOnDemandRevalidate, o2 = null == (a2 = r2.get(eH)) ? void 0 : a2.value;
          this._isEnabled = !!(!i2 && o2 && e10 && o2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n2;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: eH, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: eH, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function eD(e10, t2) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r2 = e10.headers["x-middleware-set-cookie"], n2 = new Headers();
          for (let e11 of f(r2)) n2.append("set-cookie", e11);
          for (let e11 of new H.ResponseCookies(n2).getAll()) t2.set(e11);
        }
      }
      let ej = Y();
      class eU extends Error {
        constructor(e10, t2) {
          super("Invariant: " + (e10.endsWith(".") ? e10 : e10 + ".") + " This is a bug in Next.js.", t2), this.name = "InvariantError";
        }
      }
      var eW = e.i(99734);
      e.i(51615);
      class eK {
        constructor(e10, t2, r2) {
          this.prev = null, this.next = null, this.key = e10, this.data = t2, this.size = r2;
        }
      }
      class eL {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class eJ {
        constructor(e10, t2, r2) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t2, this.onEvict = r2, this.head = new eL(), this.tail = new eL(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t2) {
          let r2 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t2)) ?? 1;
          if (r2 <= 0) throw Object.defineProperty(Error(`LRUCache: calculateSize returned ${r2}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", { value: "E789", enumerable: false, configurable: true });
          if (r2 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let n2 = this.cache.get(e10);
          if (n2) n2.data = t2, this.totalSize = this.totalSize - n2.size + r2, n2.size = r2, this.moveToHead(n2);
          else {
            let n3 = new eK(e10, t2, r2);
            this.cache.set(e10, n3), this.addToHead(n3), this.totalSize += r2;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t2 = this.cache.get(e10);
          if (t2) return this.moveToHead(t2), t2.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t2 = e10;
            yield [t2.key, t2.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t2 = this.cache.get(e10);
          t2 && (this.removeNode(t2), this.cache.delete(e10), this.totalSize -= t2.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      new eJ(52428800, (e10) => e10.size), process.env.NEXT_PRIVATE_DEBUG_CACHE && console.debug.bind(console, "DefaultCacheHandler:"), process.env.NEXT_PRIVATE_DEBUG_CACHE && ((e10, ...t2) => {
        console.log(`use-cache: ${e10}`, ...t2);
      }), Symbol.for("@next/cache-handlers");
      let eB = Symbol.for("@next/cache-handlers-map"), e$ = Symbol.for("@next/cache-handlers-set"), eV = globalThis;
      function eG() {
        if (eV[eB]) return eV[eB].entries();
      }
      async function eq(e10, t2) {
        if (!e10) return t2();
        let r2 = ez(e10);
        try {
          return await t2();
        } finally {
          let t3 = function(e11, t4) {
            let r3 = new Set(e11.pendingRevalidatedTags), n2 = new Set(e11.pendingRevalidateWrites);
            return { pendingRevalidatedTags: t4.pendingRevalidatedTags.filter((e12) => !r3.has(e12)), pendingRevalidates: Object.fromEntries(Object.entries(t4.pendingRevalidates).filter(([t5]) => !(t5 in e11.pendingRevalidates))), pendingRevalidateWrites: t4.pendingRevalidateWrites.filter((e12) => !n2.has(e12)) };
          }(r2, ez(e10));
          await eX(e10, t3);
        }
      }
      function ez(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function eF(e10, t2) {
        if (0 === e10.length) return;
        let r2 = [];
        t2 && r2.push(t2.revalidateTag(e10));
        let n2 = function() {
          if (eV[e$]) return eV[e$].values();
        }();
        if (n2) for (let t3 of n2) r2.push(t3.expireTags(...e10));
        await Promise.all(r2);
      }
      async function eX(e10, t2) {
        let r2 = (null == t2 ? void 0 : t2.pendingRevalidatedTags) ?? e10.pendingRevalidatedTags ?? [], n2 = (null == t2 ? void 0 : t2.pendingRevalidates) ?? e10.pendingRevalidates ?? {}, a2 = (null == t2 ? void 0 : t2.pendingRevalidateWrites) ?? e10.pendingRevalidateWrites ?? [];
        return Promise.all([eF(r2, e10.incrementalCache), ...Object.values(n2), ...a2]);
      }
      let eY = Y();
      class eQ {
        constructor({ waitUntil: e10, onClose: t2, onTaskError: r2 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t2, this.onTaskError = r2, this.callbackQueue = new eW.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (ew(e10)) this.waitUntil || eZ(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          var t2;
          this.waitUntil || eZ();
          let r2 = ej.getStore();
          r2 && this.workUnitStores.add(r2);
          let n2 = eY.getStore(), a2 = n2 ? n2.rootTaskSpawnPhase : null == r2 ? void 0 : r2.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i2 = (t2 = async () => {
            try {
              await eY.run({ rootTaskSpawnPhase: a2 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, X ? X.bind(t2) : F.bind(t2));
          this.callbackQueue.add(i2);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = Q.getStore();
          if (!e10) throw Object.defineProperty(new eU("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return eq(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t2) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t2), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t2);
          } catch (e11) {
            console.error(Object.defineProperty(new eU("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function eZ() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function e0(e10) {
        let t2, r2 = { then: (n2, a2) => (t2 || (t2 = e10()), t2.then((e11) => {
          r2.value = e11;
        }).catch(() => {
        }), t2.then(n2, a2)) };
        return r2;
      }
      class e1 {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function e2() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let e5 = Symbol.for("@next/request-context");
      async function e4(e10, t2, r2) {
        let n2 = [], a2 = r2 && r2.size > 0;
        for (let t3 of ((e11) => {
          let t4 = ["/layout"];
          if (e11.startsWith("/")) {
            let r3 = e11.split("/");
            for (let e12 = 1; e12 < r3.length + 1; e12++) {
              let n3 = r3.slice(0, e12).join("/");
              n3 && (n3.endsWith("/page") || n3.endsWith("/route") || (n3 = `${n3}${!n3.endsWith("/") ? "/" : ""}layout`), t4.push(n3));
            }
          }
          return t4;
        })(e10)) t3 = `${p}${t3}`, n2.push(t3);
        if (t2.pathname && !a2) {
          let e11 = `${p}${t2.pathname}`;
          n2.push(e11);
        }
        return { tags: n2, expirationsByCacheKind: function(e11) {
          let t3 = /* @__PURE__ */ new Map(), r3 = eG();
          if (r3) for (let [n3, a3] of r3) "getExpiration" in a3 && t3.set(n3, e0(async () => a3.getExpiration(...e11)));
          return t3;
        }(n2) };
      }
      class e6 extends D {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let e8 = { keys: (e10) => Array.from(e10.keys()), get: (e10, t2) => e10.get(t2) ?? void 0 }, e3 = (e10, t2) => eN().withPropagatedContext(e10.headers, t2, e8), e9 = false;
      async function e7(t2) {
        var r2;
        let n2, a2;
        if (!e9 && (e9 = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
          let { interceptTestApis: t3, wrapRequestHandler: r3 } = e.r(94165);
          t3(), e3 = r3(e3);
        }
        await s();
        let i2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t2.request.url = t2.request.url.replace(/\.rsc($|\?)/, "$1");
        let o2 = t2.bypassNextUrl ? new URL(t2.request.url) : new I(t2.request.url, { headers: t2.request.headers, nextConfig: t2.request.nextConfig });
        for (let e10 of [...o2.searchParams.keys()]) {
          let t3 = o2.searchParams.getAll(e10), r3 = function(e11) {
            for (let t4 of ["nxtP", "nxtI"]) if (e11 !== t4 && e11.startsWith(t4)) return e11.substring(t4.length);
            return null;
          }(e10);
          if (r3) {
            for (let e11 of (o2.searchParams.delete(r3), t3)) o2.searchParams.append(r3, e11);
            o2.searchParams.delete(e10);
          }
        }
        let l2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in o2 && (l2 = o2.buildId || "", o2.buildId = "");
        let c2 = function(e10) {
          let t3 = new Headers();
          for (let [r3, n3] of Object.entries(e10)) for (let e11 of Array.isArray(n3) ? n3 : [n3]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t3.append(r3, e11));
          return t3;
        }(t2.request.headers), u2 = c2.has("x-nextjs-data"), d2 = "1" === c2.get("rsc");
        u2 && "/index" === o2.pathname && (o2.pathname = "/");
        let p2 = /* @__PURE__ */ new Map();
        if (!i2) for (let e10 of $) {
          let t3 = c2.get(e10);
          null !== t3 && (p2.set(e10, t3), c2.delete(e10));
        }
        let h2 = o2.searchParams.get(V), f2 = new e6({ page: t2.page, input: function(e10) {
          let t3 = "string" == typeof e10, r3 = t3 ? new URL(e10) : e10;
          return r3.searchParams.delete(V), t3 ? r3.toString() : r3;
        }(o2).toString(), init: { body: t2.request.body, headers: c2, method: t2.request.method, nextConfig: t2.request.nextConfig, signal: t2.request.signal } });
        u2 && Object.defineProperty(f2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t2.IncrementalCache && (globalThis.__incrementalCache = new t2.IncrementalCache({ CurCacheHandler: t2.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t2.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: e2() }) }));
        let g2 = t2.request.waitUntil ?? (null == (r2 = function() {
          let e10 = globalThis[e5];
          return null == e10 ? void 0 : e10.get();
        }()) ? void 0 : r2.waitUntil), y2 = new _({ request: f2, page: t2.page, context: g2 ? { waitUntil: g2 } : void 0 });
        if ((n2 = await e3(f2, () => {
          if ("/middleware" === t2.page || "/src/middleware" === t2.page) {
            let e10 = y2.waitUntil.bind(y2), r3 = new e1();
            return eN().trace(eg.execute, { spanName: `middleware ${f2.method} ${f2.nextUrl.pathname}`, attributes: { "http.target": f2.nextUrl.pathname, "http.method": f2.method } }, async () => {
              try {
                var n3, i3, o3, s2, c3, u3;
                let d3 = e2(), p3 = await e4("/", f2.nextUrl, null), h3 = (c3 = f2.nextUrl, u3 = (e11) => {
                  a2 = e11;
                }, function(e11, t3, r4, n4, a3, i4, o4, s3, l3, c4, u4, d4) {
                  function p4(e12) {
                    r4 && r4.setHeader("Set-Cookie", e12);
                  }
                  let h4 = {};
                  return { type: "request", phase: e11, implicitTags: i4, url: { pathname: n4.pathname, search: n4.search ?? "" }, rootParams: a3, get headers() {
                    return h4.headers || (h4.headers = function(e12) {
                      let t4 = q.from(e12);
                      for (let e13 of $) t4.delete(e13);
                      return q.seal(t4);
                    }(t3.headers)), h4.headers;
                  }, get cookies() {
                    if (!h4.cookies) {
                      let e12 = new H.RequestCookies(q.from(t3.headers));
                      eD(t3, e12), h4.cookies = ee.seal(e12);
                    }
                    return h4.cookies;
                  }, set cookies(value) {
                    h4.cookies = value;
                  }, get mutableCookies() {
                    if (!h4.mutableCookies) {
                      let e12 = function(e13, t4) {
                        let r5 = new H.RequestCookies(q.from(e13));
                        return er.wrap(r5, t4);
                      }(t3.headers, o4 || (r4 ? p4 : void 0));
                      eD(t3, e12), h4.mutableCookies = e12;
                    }
                    return h4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    return h4.userspaceMutableCookies || (h4.userspaceMutableCookies = function(e12) {
                      let t4 = new Proxy(e12.mutableCookies, { get(r5, n5, a4) {
                        switch (n5) {
                          case "delete":
                            return function(...n6) {
                              return en(e12, "cookies().delete"), r5.delete(...n6), t4;
                            };
                          case "set":
                            return function(...n6) {
                              return en(e12, "cookies().set"), r5.set(...n6), t4;
                            };
                          default:
                            return j.get(r5, n5, a4);
                        }
                      } });
                      return t4;
                    }(this)), h4.userspaceMutableCookies;
                  }, get draftMode() {
                    return h4.draftMode || (h4.draftMode = new eM(l3, t3, this.cookies, this.mutableCookies)), h4.draftMode;
                  }, renderResumeDataCache: s3 ?? null, isHmrRefresh: c4, serverComponentsHmrCache: u4 || globalThis.__serverComponentsHmrCache, devFallbackParams: null };
                }("action", f2, void 0, c3, {}, p3, u3, void 0, d3, false, void 0, null)), g3 = function({ page: e11, renderOpts: t3, isPrefetchRequest: r4, buildId: n4, previouslyRevalidatedTags: a3 }) {
                  var i4;
                  let o4 = !t3.shouldWaitOnAllReady && !t3.supportsDynamicResponse && !t3.isDraftMode && !t3.isPossibleServerAction, s3 = t3.dev ?? false, l3 = s3 || o4 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), c4 = { isStaticGeneration: o4, page: e11, route: (i4 = e11.split("/").reduce((e12, t4, r5, n5) => t4 ? "(" === t4[0] && t4.endsWith(")") || "@" === t4[0] || ("page" === t4 || "route" === t4) && r5 === n5.length - 1 ? e12 : e12 + "/" + t4 : e12, "")).startsWith("/") ? i4 : "/" + i4, incrementalCache: t3.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t3.cacheLifeProfiles, isRevalidate: t3.isRevalidate, isBuildTimePrerendering: t3.nextExport, hasReadableErrorStacks: t3.hasReadableErrorStacks, fetchCache: t3.fetchCache, isOnDemandRevalidate: t3.isOnDemandRevalidate, isDraftMode: t3.isDraftMode, isPrefetchRequest: r4, buildId: n4, reactLoadableManifest: (null == t3 ? void 0 : t3.reactLoadableManifest) || {}, assetPrefix: (null == t3 ? void 0 : t3.assetPrefix) || "", afterContext: function(e12) {
                    let { waitUntil: t4, onClose: r5, onAfterTaskError: n5 } = e12;
                    return new eQ({ waitUntil: t4, onClose: r5, onTaskError: n5 });
                  }(t3), cacheComponentsEnabled: t3.experimental.cacheComponents, dev: s3, previouslyRevalidatedTags: a3, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t4 = eG();
                    if (t4) for (let [r5, n5] of t4) "refreshTags" in n5 && e12.set(r5, e0(async () => n5.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: X ? X.snapshot() : function(e12, ...t4) {
                    return e12(...t4);
                  }, shouldTrackFetchMetrics: l3 };
                  return t3.store = c4, c4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (i3 = t2.request.nextConfig) || null == (n3 = i3.experimental) ? void 0 : n3.cacheLife, experimental: { isRoutePPREnabled: false, cacheComponents: false, authInterrupts: !!(null == (s2 = t2.request.nextConfig) || null == (o3 = s2.experimental) ? void 0 : o3.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r3.onClose.bind(r3), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === f2.headers.get(B), buildId: l2 ?? "", previouslyRevalidatedTags: [] });
                return await Q.run(g3, () => ej.run(h3, t2.handler, f2, y2));
              } finally {
                setTimeout(() => {
                  r3.dispatchClose();
                }, 0);
              }
            });
          }
          return t2.handler(f2, y2);
        })) && !(n2 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        n2 && a2 && n2.headers.set("set-cookie", a2);
        let m2 = null == n2 ? void 0 : n2.headers.get("x-middleware-rewrite");
        if (n2 && m2 && (d2 || !i2)) {
          let e10 = new I(m2, { forceLocale: true, headers: t2.request.headers, nextConfig: t2.request.nextConfig });
          i2 || e10.host !== f2.nextUrl.host || (e10.buildId = l2 || e10.buildId, n2.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r3, isRelative: a3 } = J(e10.toString(), o2.toString());
          !i2 && u2 && n2.headers.set("x-nextjs-rewrite", r3), d2 && a3 && (o2.pathname !== e10.pathname && n2.headers.set("x-nextjs-rewritten-path", e10.pathname), o2.search !== e10.search && n2.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (n2 && m2 && d2 && h2) {
          let e10 = new URL(m2);
          e10.searchParams.has(V) || (e10.searchParams.set(V, h2), n2.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let w2 = null == n2 ? void 0 : n2.headers.get("Location");
        if (n2 && w2 && !i2) {
          let e10 = new I(w2, { forceLocale: false, headers: t2.request.headers, nextConfig: t2.request.nextConfig });
          n2 = new Response(n2.body, n2), e10.host === o2.host && (e10.buildId = l2 || e10.buildId, n2.headers.set("Location", e10.toString())), u2 && (n2.headers.delete("Location"), n2.headers.set("x-nextjs-redirect", J(e10.toString(), o2.toString()).url));
        }
        let v2 = n2 || L.next(), E2 = v2.headers.get("x-middleware-override-headers"), S2 = [];
        if (E2) {
          for (let [e10, t3] of p2) v2.headers.set(`x-middleware-request-${e10}`, t3), S2.push(e10);
          S2.length > 0 && v2.headers.set("x-middleware-override-headers", E2 + "," + S2.join(","));
        }
        return { response: v2, waitUntil: ("internal" === y2[b].kind ? Promise.all(y2[b].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: f2.fetchMetrics };
      }
      e.s(["config", () => tf, "middleware", () => th], 96592);
      var te = e.i(79464);
      e.s([], 85835), e.i(64445), "undefined" == typeof URLPattern || URLPattern;
      var tt = e.i(40049);
      if (/* @__PURE__ */ new WeakMap(), tt.default.unstable_postpone, false === function(e10) {
        return e10.includes("needs to bail out of prerendering at this point because it used") && e10.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }("Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error")) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)`), RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`), Y();
      let { env: tr, stdout: tn } = (null == (N = globalThis) ? void 0 : N.process) ?? {}, ta = tr && !tr.NO_COLOR && (tr.FORCE_COLOR || (null == tn ? void 0 : tn.isTTY) && !tr.CI && "dumb" !== tr.TERM), ti = (e10, t2, r2, n2) => {
        let a2 = e10.substring(0, n2) + r2, i2 = e10.substring(n2 + t2.length), o2 = i2.indexOf(t2);
        return ~o2 ? a2 + ti(i2, t2, r2, o2) : a2 + i2;
      }, to = (e10, t2, r2 = e10) => ta ? (n2) => {
        let a2 = "" + n2, i2 = a2.indexOf(t2, e10.length);
        return ~i2 ? e10 + ti(a2, t2, r2, i2) + t2 : e10 + a2 + t2;
      } : String, ts = to("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      to("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), to("\x1B[3m", "\x1B[23m"), to("\x1B[4m", "\x1B[24m"), to("\x1B[7m", "\x1B[27m"), to("\x1B[8m", "\x1B[28m"), to("\x1B[9m", "\x1B[29m"), to("\x1B[30m", "\x1B[39m");
      let tl = to("\x1B[31m", "\x1B[39m"), tc = to("\x1B[32m", "\x1B[39m"), tu = to("\x1B[33m", "\x1B[39m");
      to("\x1B[34m", "\x1B[39m");
      let td = to("\x1B[35m", "\x1B[39m");
      to("\x1B[38;2;173;127;168m", "\x1B[39m"), to("\x1B[36m", "\x1B[39m");
      let tp = to("\x1B[37m", "\x1B[39m");
      async function th(e10) {
        let { pathname: t2 } = e10.nextUrl;
        if (t2.startsWith("/admin") && !t2.startsWith("/admin/auth") && !await (0, te.getToken)({ req: e10 })) {
          let t3 = e10.nextUrl.clone();
          return t3.pathname = "/admin/auth/signin", L.redirect(t3);
        }
        return L.next();
      }
      to("\x1B[90m", "\x1B[39m"), to("\x1B[40m", "\x1B[49m"), to("\x1B[41m", "\x1B[49m"), to("\x1B[42m", "\x1B[49m"), to("\x1B[43m", "\x1B[49m"), to("\x1B[44m", "\x1B[49m"), to("\x1B[45m", "\x1B[49m"), to("\x1B[46m", "\x1B[49m"), to("\x1B[47m", "\x1B[49m"), tp(ts("\u25CB")), tl(ts("\u2A2F")), tu(ts("\u26A0")), tp(ts(" ")), tc(ts("\u2713")), td(ts("\xBB")), new eJ(1e4, (e10) => e10.length), /* @__PURE__ */ new WeakMap(), e.i(85835);
      let tf = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"] };
      var tg = e.i(96592);
      Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 });
      let ty = { ...tg }, tm = ty.middleware || ty.default, tw = "/middleware";
      if ("function" != typeof tm) throw Object.defineProperty(Error(`The Middleware "${tw}" must export a \`middleware\` or a \`default\` function`), "__NEXT_ERROR_CODE", { value: "E120", enumerable: false, configurable: true });
      function tb(e10) {
        return e7({ ...e10, page: tw, handler: async (...e11) => {
          try {
            return await tm(...e11);
          } catch (a2) {
            let t2 = e11[0], r2 = new URL(t2.url), n2 = r2.pathname + r2.search;
            throw await i(a2, { path: n2, method: t2.method, headers: Object.fromEntries(t2.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), a2;
          }
        } });
      }
    }]);
  }
});

// .next/server/edge/chunks/turbopack-edge-wrapper_0566111c.js
var require_turbopack_edge_wrapper_0566111c = __commonJS({
  ".next/server/edge/chunks/turbopack-edge-wrapper_0566111c.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-edge-wrapper_0566111c.js", { otherChunks: ["chunks/edge-wrapper_fa177864.js", "chunks/[root-of-the-server]__fde9ded8._.js"], runtimeModuleIds: [88912] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = /* @__PURE__ */ new WeakMap();
      function r(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let n = r.prototype, o = Object.prototype.hasOwnProperty, u = "undefined" != typeof Symbol && Symbol.toStringTag;
      function i(e2, t2, r2) {
        o.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function l(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = a(t2), e2[t2] = r2), r2;
      }
      function a(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function s(e2, t2) {
        i(e2, "__esModule", { value: true }), u && i(e2, u, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          "function" == typeof t2[r2] ? i(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : i(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      n.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = l(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, s(n2, e2);
      }, n.j = function(e2, r2) {
        var n2, u2;
        let i2, a2, s2;
        null != r2 ? a2 = (i2 = l(this.c, r2)).exports : (i2 = this.m, a2 = this.e);
        let c2 = (n2 = i2, u2 = a2, (s2 = t.get(n2)) || (t.set(n2, s2 = []), n2.exports = n2.namespaceObject = new Proxy(u2, { get(e3, t2) {
          if (o.call(e3, t2) || "default" === t2 || "__esModule" === t2) return Reflect.get(e3, t2);
          for (let e4 of s2) {
            let r3 = Reflect.get(e4, t2);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t2 = Reflect.ownKeys(e3);
          for (let e4 of s2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t2.includes(r3) || t2.push(r3);
          return t2;
        } })), s2);
        "object" == typeof e2 && null !== e2 && c2.push(e2);
      }, n.v = function(e2, t2) {
        (null != t2 ? l(this.c, t2) : this.m).exports = e2;
      }, n.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? l(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let c = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, f = [null, c({}), c([]), c(c)];
      function d(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !f.includes(t3); t3 = c(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2[o2] = () => e2 : n2.push("default", () => e2)), s(t2, n2), t2;
      }
      function h(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function p(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function m() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      n.i = function(e2) {
        let t2 = x(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = d(r2, h(r2), r2 && r2.__esModule);
      }, n.A = function(e2) {
        return this.r(e2)(this.i.bind(this));
      }, n.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, n.r = function(e2) {
        return x(e2, this.m).exports;
      }, n.f = function(e2) {
        function t2(t3) {
          if (o.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (o.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let b = Symbol("turbopack queues"), y = Symbol("turbopack exports"), O = Symbol("turbopack error");
      function g(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      n.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: i2, promise: l2 } = m(), a2 = Object.assign(l2, { [y]: r2.exports, [b]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), a2.catch(() => {
          });
        } }), s2 = { get: () => a2, set(e3) {
          e3 !== a2 && (a2[y] = e3);
        } };
        Object.defineProperty(r2, "exports", s2), Object.defineProperty(r2, "namespaceObject", s2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (b in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [y]: {}, [b]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[y] = e5, g(t4);
                }, (e5) => {
                  r4[O] = e5, g(t4);
                }), r4;
              }
            }
            return { [y]: e4, [b]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[O]) throw e4[O];
            return e4[y];
          }), { promise: u3, resolve: i3 } = m(), l3 = Object.assign(() => i3(r3), { queueCount: 0 });
          function a3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (l3.queueCount++, e4.push(l3)));
          }
          return t3.map((e4) => e4[b](a3)), l3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? i2(a2[O] = e3) : u2(a2[y]), g(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let w = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function _(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      w.prototype = URL.prototype, n.U = w, n.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, n.g = globalThis;
      let j = r.prototype;
      var C = function(e2) {
        return e2[e2.Runtime = 0] = "Runtime", e2[e2.Parent = 1] = "Parent", e2[e2.Update = 2] = "Update", e2;
      }(C || {});
      let k = /* @__PURE__ */ new Map();
      n.M = k;
      let R = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Map();
      async function P(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return M(e2, t2, $(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!k.has(e3) || R.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let i2 = r2.moduleChunks || [], l2 = i2.map((e3) => U.get(e3)).filter((e3) => e3);
        if (l2.length > 0) {
          if (l2.length === i2.length) return void await Promise.all(l2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of i2) U.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = M(e2, t2, $(n3));
            U.set(n3, r4), l2.push(r4);
          }
          n2 = Promise.all(l2);
        } else {
          for (let o3 of (n2 = M(e2, t2, $(r2.path)), i2)) U.has(o3) || U.set(o3, n2);
        }
        for (let e3 of o2) R.has(e3) || R.set(e3, n2);
        await n2;
      }
      j.l = function(e2) {
        return P(1, this.m.id, e2);
      };
      let v = Promise.resolve(void 0), T = /* @__PURE__ */ new WeakMap();
      function M(t2, r2, n2) {
        let o2 = e.loadChunkCached(t2, n2), u2 = T.get(o2);
        if (void 0 === u2) {
          let e2 = T.set.bind(T, o2, v);
          u2 = o2.then(e2).catch((e3) => {
            let o3;
            switch (t2) {
              case 0:
                o3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case 1:
                o3 = `from module ${r2}`;
                break;
              case 2:
                o3 = "from an HMR update";
                break;
              default:
                _(t2, (e4) => `Unknown source type: ${e4}`);
            }
            throw Error(`Failed to load chunk ${n2} ${o3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
          }), T.set(o2, u2);
        }
        return u2;
      }
      function $(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      j.L = function(e2) {
        return M(1, this.m.id, e2);
      }, j.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, j.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, j.b = function(e2) {
        let t2 = new Blob([`self.TURBOPACK_WORKER_LOCATION = ${JSON.stringify(location.origin)};
self.TURBOPACK_NEXT_CHUNK_URLS = ${JSON.stringify(e2.reverse().map($), null, 2)};
importScripts(...self.TURBOPACK_NEXT_CHUNK_URLS.map(c => self.TURBOPACK_WORKER_LOCATION + c).reverse());`], { type: "text/javascript" });
        return URL.createObjectURL(t2);
      };
      let A = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      n.w = function(t2, r2, n2) {
        return e.loadWebAssembly(1, this.m.id, t2, r2, n2);
      }, n.u = function(t2, r2) {
        return e.loadWebAssemblyModule(1, this.m.id, t2, r2);
      };
      let E = {};
      n.c = E;
      let x = (e2, t2) => {
        let r2 = E[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return K(e2, C.Parent, t2.id);
      };
      function K(e2, t2, n2) {
        let o2 = k.get(e2);
        "function" != typeof o2 && function(e3, t3, r2) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r2}`;
              break;
            case 1:
              n3 = `because it was required from module ${r2}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              _(t3, (e4) => `Unknown source type: ${e4}`);
          }
          throw Error(`Module ${e3} was instantiated ${n3}, but the module factory is not available. It might have been deleted in an HMR update.`);
        }(e2, t2, n2);
        let u2 = a(e2), i2 = u2.exports;
        E[e2] = u2;
        let l2 = new r(u2, i2);
        try {
          o2(l2, u2, i2);
        } catch (e3) {
          throw u2.error = e3, e3;
        }
        return u2.namespaceObject && u2.exports !== u2.namespaceObject && d(u2.exports, u2.namespaceObject), u2;
      }
      function S(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          let t3 = decodeURIComponent(("undefined" != typeof TURBOPACK_NEXT_CHUNK_URLS ? TURBOPACK_NEXT_CHUNK_URLS.pop() : e2.getAttribute("src")).replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3, r3, n3) {
          let o2 = 1;
          for (; o2 < e2.length; ) {
            let t4 = e2[o2], n4 = o2 + 1;
            for (; n4 < e2.length && "function" != typeof e2[n4]; ) n4++;
            if (n4 === e2.length) throw Error("malformed chunk format, expected a factory function");
            if (!r3.has(t4)) {
              let u2 = e2[n4];
              for (Object.defineProperty(u2, "name", { value: "__TURBOPACK__module__evaluation__" }); o2 < n4; o2++) t4 = e2[o2], r3.set(t4, u2);
            }
            o2 = n4 + 1;
          }
        }(t2, 0, k)), e.registerChunk(n2, r2);
      }
      function N(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : d(n2, h(n2), true);
      }
      n.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? d(t2.default, h(t2), true) : t2;
      }, N.resolve = (e2, t2) => __require.resolve(e2, t2), n.x = N, (() => {
        e = { registerChunk(e2, o3) {
          t2.add(e2), function(e3) {
            let t3 = r2.get(e3);
            if (null != t3) {
              for (let r3 of t3) r3.requiredChunks.delete(e3), 0 === r3.requiredChunks.size && n2(r3.runtimeModuleIds, r3.chunkPath);
              r2.delete(e3);
            }
          }(e2), null != o3 && (0 === o3.otherChunks.length ? n2(o3.runtimeModuleIds, e2) : function(e3, o4, u2) {
            let i2 = /* @__PURE__ */ new Set(), l2 = { runtimeModuleIds: u2, chunkPath: e3, requiredChunks: i2 };
            for (let e4 of o4) {
              let n3 = p(e4);
              if (t2.has(n3)) continue;
              i2.add(n3);
              let o5 = r2.get(n3);
              null == o5 && (o5 = /* @__PURE__ */ new Set(), r2.set(n3, o5)), o5.add(l2);
            }
            0 === l2.requiredChunks.size && n2(l2.runtimeModuleIds, l2.chunkPath);
          }(e2, o3.otherChunks.filter((e3) => {
            var t3;
            return t3 = p(e3), A.test(t3);
          }), o3.runtimeModuleIds));
        }, loadChunkCached(e2, t3) {
          throw Error("chunk loading is not supported");
        }, async loadWebAssembly(e2, t3, r3, n3, u2) {
          let i2 = await o2(r3, n3);
          return await WebAssembly.instantiate(i2, u2);
        }, loadWebAssemblyModule: async (e2, t3, r3, n3) => o2(r3, n3) };
        let t2 = /* @__PURE__ */ new Set(), r2 = /* @__PURE__ */ new Map();
        function n2(e2, t3) {
          for (let r3 of e2) !function(e3, t4) {
            let r4 = E[t4];
            if (r4) {
              if (r4.error) throw r4.error;
              return;
            }
            K(t4, C.Runtime, e3);
          }(t3, r3);
        }
        async function o2(e2, t3) {
          let r3;
          try {
            r3 = t3();
          } catch (e3) {
          }
          if (!r3) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
          return r3;
        }
      })();
      let q = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: S }, q.forEach(S);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\..*).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$"] }];
    require_edge_wrapper_fa177864();
    require_root_of_the_server_fde9ded8();
    require_turbopack_edge_wrapper_0566111c();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "maximumResponseBody": 5e7, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [{ "protocol": "https", "hostname": "placehold.jp" }, { "protocol": "https", "hostname": "example.com" }, { "protocol": "https", "hostname": "clean-ant-257.convex.cloud" }, { "protocol": "https", "hostname": "brave-cheetah-312.convex.cloud/" }], "unoptimized": true }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/home/tumelo/Desktop/workspace/lmcollection", "experimental": { "useSkewCookie": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "clientParamParsing": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 3, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "viewTransition": false, "routerBFCache": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "cacheComponents": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "devtoolSegmentExplorer": true, "browserDebugInfoInTerminal": false, "optimizeRouterScrolling": false, "middlewareClientMaxBodySize": 10485760, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "root": "/home/tumelo/Desktop/workspace/lmcollection" } };
var BuildId = "vd5vRMcA3dRJrboFkJdHE";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/auth/signin", "regex": "^/admin/auth/signin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/auth/signin(?:/)?$" }, { "page": "/admin/auth/signup", "regex": "^/admin/auth/signup(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/auth/signup(?:/)?$" }, { "page": "/admin/categories", "regex": "^/admin/categories(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/categories(?:/)?$" }, { "page": "/admin/customers", "regex": "^/admin/customers(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/customers(?:/)?$" }, { "page": "/admin/orders", "regex": "^/admin/orders(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/orders(?:/)?$" }, { "page": "/admin/products", "regex": "^/admin/products(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/products(?:/)?$" }, { "page": "/admin/products/add-product", "regex": "^/admin/products/add\\-product(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/products/add\\-product(?:/)?$" }, { "page": "/apple-icon.png", "regex": "^/apple\\-icon\\.png(?:/)?$", "routeKeys": {}, "namedRegex": "^/apple\\-icon\\.png(?:/)?$" }, { "page": "/cancel", "regex": "^/cancel(?:/)?$", "routeKeys": {}, "namedRegex": "^/cancel(?:/)?$" }, { "page": "/cart", "regex": "^/cart(?:/)?$", "routeKeys": {}, "namedRegex": "^/cart(?:/)?$" }, { "page": "/collection/products/all", "regex": "^/collection/products/all(?:/)?$", "routeKeys": {}, "namedRegex": "^/collection/products/all(?:/)?$" }, { "page": "/coming-soon", "regex": "^/coming\\-soon(?:/)?$", "routeKeys": {}, "namedRegex": "^/coming\\-soon(?:/)?$" }, { "page": "/icon.png", "regex": "^/icon\\.png(?:/)?$", "routeKeys": {}, "namedRegex": "^/icon\\.png(?:/)?$" }, { "page": "/info", "regex": "^/info(?:/)?$", "routeKeys": {}, "namedRegex": "^/info(?:/)?$" }, { "page": "/info/about", "regex": "^/info/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/info/about(?:/)?$" }, { "page": "/info/contact", "regex": "^/info/contact(?:/)?$", "routeKeys": {}, "namedRegex": "^/info/contact(?:/)?$" }, { "page": "/info/policies", "regex": "^/info/policies(?:/)?$", "routeKeys": {}, "namedRegex": "^/info/policies(?:/)?$" }, { "page": "/notify", "regex": "^/notify(?:/)?$", "routeKeys": {}, "namedRegex": "^/notify(?:/)?$" }, { "page": "/payments/checkout", "regex": "^/payments/checkout(?:/)?$", "routeKeys": {}, "namedRegex": "^/payments/checkout(?:/)?$" }, { "page": "/return", "regex": "^/return(?:/)?$", "routeKeys": {}, "namedRegex": "^/return(?:/)?$" }], "dynamic": [{ "page": "/admin/products/[id]", "regex": "^/admin/products/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/admin/products/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/auth/[...nextauth]", "regex": "^/api/auth/(.+?)(?:/)?$", "routeKeys": { "nxtPnextauth": "nxtPnextauth" }, "namedRegex": "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$" }, { "page": "/collection/products/[productId]", "regex": "^/collection/products/([^/]+?)(?:/)?$", "routeKeys": { "nxtPproductId": "nxtPproductId" }, "namedRegex": "^/collection/products/(?<nxtPproductId>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/apple-icon.png": { "initialHeaders": { "cache-control": "public, immutable, no-transform, max-age=31536000", "content-type": "image/png", "x-next-cache-tags": "_N_T_/layout,_N_T_/apple-icon.png/layout,_N_T_/apple-icon.png/route,_N_T_/apple-icon.png" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/apple-icon.png", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/icon.png": { "initialHeaders": { "cache-control": "public, immutable, no-transform, max-age=31536000", "content-type": "image/png", "x-next-cache-tags": "_N_T_/layout,_N_T_/icon.png/layout,_N_T_/icon.png/route,_N_T_/icon.png" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/icon.png", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/return": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/return", "dataRoute": "/return.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/cancel": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/cancel", "dataRoute": "/cancel.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/categories": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/categories", "dataRoute": "/admin/categories.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/customers": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/customers", "dataRoute": "/admin/customers.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/orders": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/orders", "dataRoute": "/admin/orders.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/auth/signin": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/auth/signin", "dataRoute": "/admin/auth/signin.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/auth/signup": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/auth/signup", "dataRoute": "/admin/auth/signup.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/coming-soon": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/coming-soon", "dataRoute": "/coming-soon.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/info/about": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/info/about", "dataRoute": "/info/about.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/info/contact": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/info/contact", "dataRoute": "/info/contact.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/info": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/info", "dataRoute": "/info.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/info/policies": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/info/policies", "dataRoute": "/info/policies.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/cart": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/cart", "dataRoute": "/cart.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/products/add-product": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/products/add-product", "dataRoute": "/admin/products/add-product.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/payments/checkout": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/payments/checkout", "dataRoute": "/payments/checkout.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "493224f56eedb77390bc78c91f400ebb", "previewModeSigningKey": "eef415491eb2e94523d7ae00bcd1114ec2d15b4030c4daeef34dddd921749ddb", "previewModeEncryptionKey": "7c2cd08a2c9d569785fd0d2aa0a17720ec8b17a13be5aeb935182d86c4b46c78" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/edge-wrapper_fa177864.js", "server/edge/chunks/[root-of-the-server]__fde9ded8._.js", "server/edge/chunks/turbopack-edge-wrapper_0566111c.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\..*).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "vd5vRMcA3dRJrboFkJdHE", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Jr4p5ZO1mhdTUmnsTbWA3vdW+oAd7A4TjI4O4SOWVSw=", "__NEXT_PREVIEW_MODE_ID": "493224f56eedb77390bc78c91f400ebb", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "7c2cd08a2c9d569785fd0d2aa0a17720ec8b17a13be5aeb935182d86c4b46c78", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "eef415491eb2e94523d7ae00bcd1114ec2d15b4030c4daeef34dddd921749ddb" } } }, "sortedMiddleware": ["/"], "functions": {} };
var AppPathRoutesManifest = { "/(overview)/cart/page": "/cart", "/(overview)/collection/products/[productId]/page": "/collection/products/[productId]", "/(overview)/collection/products/all/page": "/collection/products/all", "/(overview)/info/about/page": "/info/about", "/(overview)/info/contact/page": "/info/contact", "/(overview)/info/page": "/info", "/(overview)/info/policies/page": "/info/policies", "/(overview)/page": "/", "/(payments)/payments/checkout/page": "/payments/checkout", "/(post-payment)/cancel/page": "/cancel", "/(post-payment)/notify/route": "/notify", "/(post-payment)/return/page": "/return", "/_not-found/page": "/_not-found", "/admin/(overview)/categories/page": "/admin/categories", "/admin/(overview)/customers/page": "/admin/customers", "/admin/(overview)/orders/page": "/admin/orders", "/admin/(overview)/page": "/admin", "/admin/(overview)/products/[id]/page": "/admin/products/[id]", "/admin/(overview)/products/add-product/page": "/admin/products/add-product", "/admin/(overview)/products/page": "/admin/products", "/admin/auth/signin/page": "/admin/auth/signin", "/admin/auth/signup/page": "/admin/auth/signup", "/api/auth/[...nextauth]/route": "/api/auth/[...nextauth]", "/api/auth/signup/route": "/api/auth/signup", "/apple-icon.png/route": "/apple-icon.png", "/coming-soon/page": "/coming-soon", "/icon.png/route": "/icon.png" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/_document": "pages/_document.js", "/_error": "pages/_error.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream2 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream2({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(localizedPath, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
