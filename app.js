!function(e) {
    var t = {};
    function n(a) {
        if (t[a])
            return t[a].exports;
        var i = t[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(i.exports, i, i.exports, n),
            i.l = !0,
            i.exports
    }
    n.m = e,
        n.c = t,
        n.d = function(e, t, a) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: a
            })
        }
        ,
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
        }
        ,
        n.t = function(e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var a = Object.create(null);
            if (n.r(a),
                Object.defineProperty(a, "default", {
                    enumerable: !0,
                    value: e
                }),
            2 & t && "string" != typeof e)
                for (var i in e)
                    n.d(a, i, function(t) {
                        return e[t]
                    }
                        .bind(null, i));
            return a
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                        return e.default
                    }
                    : function() {
                        return e
                    }
            ;
            return n.d(t, "a", t),
                t
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 10)
}([function(e, t) {
    var n = {
        exports: {}
    };
    function a(e) {
        return e instanceof Map ? e.clear = e.delete = e.set = function() {
                throw new Error("map is read-only")
            }
            : e instanceof Set && (e.add = e.clear = e.delete = function() {
                throw new Error("set is read-only")
            }
        ),
            Object.freeze(e),
            Object.getOwnPropertyNames(e).forEach((function(t) {
                    var n = e[t];
                    "object" != typeof n || Object.isFrozen(n) || a(n)
                }
            )),
            e
    }
    n.exports = a,
        n.exports.default = a;
    var i = n.exports;
    class r {
        constructor(e) {
            void 0 === e.data && (e.data = {}),
                this.data = e.data,
                this.isMatchIgnored = !1
        }
        ignoreMatch() {
            this.isMatchIgnored = !0
        }
    }
    function o(e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;")
    }
    function s(e, ...t) {
        const n = Object.create(null);
        for (const t in e)
            n[t] = e[t];
        return t.forEach((function(e) {
                for (const t in e)
                    n[t] = e[t]
            }
        )),
            n
    }
    const c = e => !!e.kind;
    class l {
        constructor(e, t) {
            this.buffer = "",
                this.classPrefix = t.classPrefix,
                e.walk(this)
        }
        addText(e) {
            this.buffer += o(e)
        }
        openNode(e) {
            if (!c(e))
                return;
            let t = e.kind;
            t = e.sublanguage ? "language-" + t : ( (e, {prefix: t}) => {
                    if (e.includes(".")) {
                        const n = e.split(".");
                        return [`${t}${n.shift()}`, ...n.map( (e, t) => `${e}${"_".repeat(t + 1)}`)].join(" ")
                    }
                    return `${t}${e}`
                }
            )(t, {
                prefix: this.classPrefix
            }),
                this.span(t)
        }
        closeNode(e) {
            c(e) && (this.buffer += "</span>")
        }
        value() {
            return this.buffer
        }
        span(e) {
            this.buffer += `<span class="${e}">`
        }
    }
    class u {
        constructor() {
            this.rootNode = {
                children: []
            },
                this.stack = [this.rootNode]
        }
        get top() {
            return this.stack[this.stack.length - 1]
        }
        get root() {
            return this.rootNode
        }
        add(e) {
            this.top.children.push(e)
        }
        openNode(e) {
            const t = {
                kind: e,
                children: []
            };
            this.add(t),
                this.stack.push(t)
        }
        closeNode() {
            if (this.stack.length > 1)
                return this.stack.pop()
        }
        closeAllNodes() {
            for (; this.closeNode(); )
                ;
        }
        toJSON() {
            return JSON.stringify(this.rootNode, null, 4)
        }
        walk(e) {
            return this.constructor._walk(e, this.rootNode)
        }
        static _walk(e, t) {
            return "string" == typeof t ? e.addText(t) : t.children && (e.openNode(t),
                t.children.forEach(t => this._walk(e, t)),
                e.closeNode(t)),
                e
        }
        static _collapse(e) {
            "string" != typeof e && e.children && (e.children.every(e => "string" == typeof e) ? e.children = [e.children.join("")] : e.children.forEach(e => {
                    u._collapse(e)
                }
            ))
        }
    }
    class d extends u {
        constructor(e) {
            super(),
                this.options = e
        }
        addKeyword(e, t) {
            "" !== e && (this.openNode(t),
                this.addText(e),
                this.closeNode())
        }
        addText(e) {
            "" !== e && this.add(e)
        }
        addSublanguage(e, t) {
            const n = e.root;
            n.kind = t,
                n.sublanguage = !0,
                this.add(n)
        }
        toHTML() {
            return new l(this,this.options).value()
        }
        finalize() {
            return !0
        }
    }
    function g(e) {
        return e ? "string" == typeof e ? e : e.source : null
    }
    function f(e) {
        return h("(?=", e, ")")
    }
    function b(e) {
        return h("(?:", e, ")*")
    }
    function p(e) {
        return h("(?:", e, ")?")
    }
    function h(...e) {
        return e.map(e => g(e)).join("")
    }
    function m(...e) {
        return "(" + (function(e) {
            const t = e[e.length - 1];
            return "object" == typeof t && t.constructor === Object ? (e.splice(e.length - 1, 1),
                t) : {}
        }(e).capture ? "" : "?:") + e.map(e => g(e)).join("|") + ")"
    }
    function y(e) {
        return new RegExp(e.toString() + "|").exec("").length - 1
    }
    const v = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
    function w(e, {joinWith: t}) {
        let n = 0;
        return e.map(e => {
                n += 1;
                const t = n;
                let a = g(e)
                    , i = "";
                for (; a.length > 0; ) {
                    const e = v.exec(a);
                    if (!e) {
                        i += a;
                        break
                    }
                    i += a.substring(0, e.index),
                        a = a.substring(e.index + e[0].length),
                        "\\" === e[0][0] && e[1] ? i += "\\" + String(Number(e[1]) + t) : (i += e[0],
                        "(" === e[0] && n++)
                }
                return i
            }
        ).map(e => `(${e})`).join(t)
    }
    const E = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"
        , _ = {
        begin: "\\\\[\\s\\S]",
        relevance: 0
    }
        , x = {
        scope: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [_]
    }
        , S = {
        scope: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [_]
    }
        , A = function(e, t, n={}) {
        const a = s({
            scope: "comment",
            begin: e,
            end: t,
            contains: []
        }, n);
        a.contains.push({
            scope: "doctag",
            begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
            end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
            excludeBegin: !0,
            relevance: 0
        });
        const i = m("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
        return a.contains.push({
            begin: h(/[ ]+/, "(", i, /[.]?[:]?([.][ ]|[ ])/, "){3}")
        }),
            a
    }
        , N = A("//", "$")
        , k = A("/\\*", "\\*/")
        , O = A("#", "$")
        , T = {
        scope: "number",
        begin: "\\b\\d+(\\.\\d+)?",
        relevance: 0
    }
        , M = {
        scope: "number",
        begin: E,
        relevance: 0
    }
        , C = {
        scope: "number",
        begin: "\\b(0b[01]+)",
        relevance: 0
    }
        , R = {
        begin: /(?=\/[^/\n]*\/)/,
        contains: [{
            scope: "regexp",
            begin: /\//,
            end: /\/[gimuy]*/,
            illegal: /\n/,
            contains: [_, {
                begin: /\[/,
                end: /\]/,
                relevance: 0,
                contains: [_]
            }]
        }]
    }
        , L = {
        scope: "title",
        begin: "[a-zA-Z]\\w*",
        relevance: 0
    }
        , B = {
        scope: "title",
        begin: "[a-zA-Z_]\\w*",
        relevance: 0
    }
        , I = {
        begin: "\\.\\s*[a-zA-Z_]\\w*",
        relevance: 0
    };
    var $ = Object.freeze({
        __proto__: null,
        MATCH_NOTHING_RE: /\b\B/,
        IDENT_RE: "[a-zA-Z]\\w*",
        UNDERSCORE_IDENT_RE: "[a-zA-Z_]\\w*",
        NUMBER_RE: "\\b\\d+(\\.\\d+)?",
        C_NUMBER_RE: E,
        BINARY_NUMBER_RE: "\\b(0b[01]+)",
        RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
        SHEBANG: (e={}) => {
            const t = /^#![ ]*\//;
            return e.binary && (e.begin = h(t, /.*\b/, e.binary, /\b.*/)),
                s({
                    scope: "meta",
                    begin: t,
                    end: /$/,
                    relevance: 0,
                    "on:begin": (e, t) => {
                        0 !== e.index && t.ignoreMatch()
                    }
                }, e)
        }
        ,
        BACKSLASH_ESCAPE: _,
        APOS_STRING_MODE: x,
        QUOTE_STRING_MODE: S,
        PHRASAL_WORDS_MODE: {
            begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
        },
        COMMENT: A,
        C_LINE_COMMENT_MODE: N,
        C_BLOCK_COMMENT_MODE: k,
        HASH_COMMENT_MODE: O,
        NUMBER_MODE: T,
        C_NUMBER_MODE: M,
        BINARY_NUMBER_MODE: C,
        REGEXP_MODE: R,
        TITLE_MODE: L,
        UNDERSCORE_TITLE_MODE: B,
        METHOD_GUARD: I,
        END_SAME_AS_BEGIN: function(e) {
            return Object.assign(e, {
                "on:begin": (e, t) => {
                    t.data._beginMatch = e[1]
                }
                ,
                "on:end": (e, t) => {
                    t.data._beginMatch !== e[1] && t.ignoreMatch()
                }
            })
        }
    });
    function j(e, t) {
        "." === e.input[e.index - 1] && t.ignoreMatch()
    }
    function H(e, t) {
        void 0 !== e.className && (e.scope = e.className,
            delete e.className)
    }
    function z(e, t) {
        t && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)",
            e.__beforeBegin = j,
            e.keywords = e.keywords || e.beginKeywords,
            delete e.beginKeywords,
        void 0 === e.relevance && (e.relevance = 0))
    }
    function D(e, t) {
        Array.isArray(e.illegal) && (e.illegal = m(...e.illegal))
    }
    function P(e, t) {
        if (e.match) {
            if (e.begin || e.end)
                throw new Error("begin & end are not supported with match");
            e.begin = e.match,
                delete e.match
        }
    }
    function q(e, t) {
        void 0 === e.relevance && (e.relevance = 1)
    }
    const U = (e, t) => {
        if (!e.beforeMatch)
            return;
        if (e.starts)
            throw new Error("beforeMatch cannot be used with starts");
        const n = Object.assign({}, e);
        Object.keys(e).forEach(t => {
                delete e[t]
            }
        ),
            e.keywords = n.keywords,
            e.begin = h(n.beforeMatch, f(n.begin)),
            e.starts = {
                relevance: 0,
                contains: [Object.assign(n, {
                    endsParent: !0
                })]
            },
            e.relevance = 0,
            delete n.beforeMatch
    }
        , Z = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"];
    function F(e, t) {
        return t ? Number(t) : function(e) {
            return Z.includes(e.toLowerCase())
        }(e) ? 0 : 1
    }
    const K = {}
        , G = e => {
        console.error(e)
    }
        , W = (e, ...t) => {
        console.log("WARN: " + e, ...t)
    }
        , X = (e, t) => {
        K[`${e}/${t}`] || (console.log(`Deprecated as of ${e}. ${t}`),
            K[`${e}/${t}`] = !0)
    }
        , Q = new Error;
    function J(e, t, {key: n}) {
        let a = 0;
        const i = e[n]
            , r = {}
            , o = {};
        for (let e = 1; e <= t.length; e++)
            o[e + a] = i[e],
                r[e + a] = !0,
                a += y(t[e - 1]);
        e[n] = o,
            e[n]._emit = r,
            e[n]._multi = !0
    }
    function V(e) {
        !function(e) {
            e.scope && "object" == typeof e.scope && null !== e.scope && (e.beginScope = e.scope,
                delete e.scope)
        }(e),
        "string" == typeof e.beginScope && (e.beginScope = {
            _wrap: e.beginScope
        }),
        "string" == typeof e.endScope && (e.endScope = {
            _wrap: e.endScope
        }),
            function(e) {
                if (Array.isArray(e.begin)) {
                    if (e.skip || e.excludeBegin || e.returnBegin)
                        throw G("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),
                            Q;
                    if ("object" != typeof e.beginScope || null === e.beginScope)
                        throw G("beginScope must be object"),
                            Q;
                    J(e, e.begin, {
                        key: "beginScope"
                    }),
                        e.begin = w(e.begin, {
                            joinWith: ""
                        })
                }
            }(e),
            function(e) {
                if (Array.isArray(e.end)) {
                    if (e.skip || e.excludeEnd || e.returnEnd)
                        throw G("skip, excludeEnd, returnEnd not compatible with endScope: {}"),
                            Q;
                    if ("object" != typeof e.endScope || null === e.endScope)
                        throw G("endScope must be object"),
                            Q;
                    J(e, e.end, {
                        key: "endScope"
                    }),
                        e.end = w(e.end, {
                            joinWith: ""
                        })
                }
            }(e)
    }
    function Y(e) {
        function t(t, n) {
            return new RegExp(g(t),"m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (n ? "g" : ""))
        }
        class n {
            constructor() {
                this.matchIndexes = {},
                    this.regexes = [],
                    this.matchAt = 1,
                    this.position = 0
            }
            addRule(e, t) {
                t.position = this.position++,
                    this.matchIndexes[this.matchAt] = t,
                    this.regexes.push([t, e]),
                    this.matchAt += y(e) + 1
            }
            compile() {
                0 === this.regexes.length && (this.exec = () => null);
                const e = this.regexes.map(e => e[1]);
                this.matcherRe = t(w(e, {
                    joinWith: "|"
                }), !0),
                    this.lastIndex = 0
            }
            exec(e) {
                this.matcherRe.lastIndex = this.lastIndex;
                const t = this.matcherRe.exec(e);
                if (!t)
                    return null;
                const n = t.findIndex( (e, t) => t > 0 && void 0 !== e)
                    , a = this.matchIndexes[n];
                return t.splice(0, n),
                    Object.assign(t, a)
            }
        }
        class a {
            constructor() {
                this.rules = [],
                    this.multiRegexes = [],
                    this.count = 0,
                    this.lastIndex = 0,
                    this.regexIndex = 0
            }
            getMatcher(e) {
                if (this.multiRegexes[e])
                    return this.multiRegexes[e];
                const t = new n;
                return this.rules.slice(e).forEach( ([e,n]) => t.addRule(e, n)),
                    t.compile(),
                    this.multiRegexes[e] = t,
                    t
            }
            resumingScanAtSamePosition() {
                return 0 !== this.regexIndex
            }
            considerAll() {
                this.regexIndex = 0
            }
            addRule(e, t) {
                this.rules.push([e, t]),
                "begin" === t.type && this.count++
            }
            exec(e) {
                const t = this.getMatcher(this.regexIndex);
                t.lastIndex = this.lastIndex;
                let n = t.exec(e);
                if (this.resumingScanAtSamePosition())
                    if (n && n.index === this.lastIndex)
                        ;
                    else {
                        const t = this.getMatcher(0);
                        t.lastIndex = this.lastIndex + 1,
                            n = t.exec(e)
                    }
                return n && (this.regexIndex += n.position + 1,
                this.regexIndex === this.count && this.considerAll()),
                    n
            }
        }
        if (e.compilerExtensions || (e.compilerExtensions = []),
        e.contains && e.contains.includes("self"))
            throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
        return e.classNameAliases = s(e.classNameAliases || {}),
            function n(i, r) {
                const o = i;
                if (i.isCompiled)
                    return o;
                [H, P, V, U].forEach(e => e(i, r)),
                    e.compilerExtensions.forEach(e => e(i, r)),
                    i.__beforeBegin = null,
                    [z, D, q].forEach(e => e(i, r)),
                    i.isCompiled = !0;
                let c = null;
                return "object" == typeof i.keywords && i.keywords.$pattern && (i.keywords = Object.assign({}, i.keywords),
                    c = i.keywords.$pattern,
                    delete i.keywords.$pattern),
                    c = c || /\w+/,
                i.keywords && (i.keywords = function e(t, n, a="keyword") {
                    const i = Object.create(null);
                    return "string" == typeof t ? r(a, t.split(" ")) : Array.isArray(t) ? r(a, t) : Object.keys(t).forEach((function(a) {
                            Object.assign(i, e(t[a], n, a))
                        }
                    )),
                        i;
                    function r(e, t) {
                        n && (t = t.map(e => e.toLowerCase())),
                            t.forEach((function(t) {
                                    const n = t.split("|");
                                    i[n[0]] = [e, F(n[0], n[1])]
                                }
                            ))
                    }
                }(i.keywords, e.case_insensitive)),
                    o.keywordPatternRe = t(c, !0),
                r && (i.begin || (i.begin = /\B|\b/),
                    o.beginRe = t(o.begin),
                i.end || i.endsWithParent || (i.end = /\B|\b/),
                i.end && (o.endRe = t(o.end)),
                    o.terminatorEnd = g(o.end) || "",
                i.endsWithParent && r.terminatorEnd && (o.terminatorEnd += (i.end ? "|" : "") + r.terminatorEnd)),
                i.illegal && (o.illegalRe = t(i.illegal)),
                i.contains || (i.contains = []),
                    i.contains = [].concat(...i.contains.map((function(e) {
                            return function(e) {
                                e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map((function(t) {
                                        return s(e, {
                                            variants: null
                                        }, t)
                                    }
                                )));
                                if (e.cachedVariants)
                                    return e.cachedVariants;
                                if (function e(t) {
                                    return !!t && (t.endsWithParent || e(t.starts))
                                }(e))
                                    return s(e, {
                                        starts: e.starts ? s(e.starts) : null
                                    });
                                if (Object.isFrozen(e))
                                    return s(e);
                                return e
                            }("self" === e ? i : e)
                        }
                    ))),
                    i.contains.forEach((function(e) {
                            n(e, o)
                        }
                    )),
                i.starts && n(i.starts, r),
                    o.matcher = function(e) {
                        const t = new a;
                        return e.contains.forEach(e => t.addRule(e.begin, {
                            rule: e,
                            type: "begin"
                        })),
                        e.terminatorEnd && t.addRule(e.terminatorEnd, {
                            type: "end"
                        }),
                        e.illegal && t.addRule(e.illegal, {
                            type: "illegal"
                        }),
                            t
                    }(o),
                    o
            }(e)
    }
    class ee extends Error {
        constructor(e, t) {
            super(e),
                this.name = "HTMLInjectionError",
                this.html = t
        }
    }
    const te = o
        , ne = s
        , ae = Symbol("nomatch");
    var ie = function(e) {
        const t = Object.create(null)
            , n = Object.create(null)
            , a = [];
        let o = !0;
        const s = "Could not find the language '{}', did you forget to load/include a language module?"
            , c = {
            disableAutodetect: !0,
            name: "Plain text",
            contains: []
        };
        let l = {
            ignoreUnescapedHTML: !1,
            throwUnescapedHTML: !1,
            noHighlightRe: /^(no-?highlight)$/i,
            languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
            classPrefix: "hljs-",
            cssSelector: "pre code",
            languages: null,
            __emitter: d
        };
        function u(e) {
            return l.noHighlightRe.test(e)
        }
        function g(e, t, n) {
            let a = ""
                , i = "";
            "object" == typeof t ? (a = e,
                n = t.ignoreIllegals,
                i = t.language) : (X("10.7.0", "highlight(lang, code, ...args) has been deprecated."),
                X("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),
                i = e,
                a = t),
            void 0 === n && (n = !0);
            const r = {
                code: a,
                language: i
            };
            N("before:highlight", r);
            const o = r.result ? r.result : y(r.language, r.code, n);
            return o.code = r.code,
                N("after:highlight", o),
                o
        }
        function y(e, n, a, i) {
            const c = Object.create(null);
            function u() {
                if (!S.keywords)
                    return void N.addText(k);
                let e = 0;
                S.keywordPatternRe.lastIndex = 0;
                let t = S.keywordPatternRe.exec(k)
                    , n = "";
                for (; t; ) {
                    n += k.substring(e, t.index);
                    const i = w.case_insensitive ? t[0].toLowerCase() : t[0]
                        , r = (a = i,
                        S.keywords[a]);
                    if (r) {
                        const [e,a] = r;
                        if (N.addText(n),
                            n = "",
                            c[i] = (c[i] || 0) + 1,
                        c[i] <= 7 && (O += a),
                            e.startsWith("_"))
                            n += t[0];
                        else {
                            const n = w.classNameAliases[e] || e;
                            N.addKeyword(t[0], n)
                        }
                    } else
                        n += t[0];
                    e = S.keywordPatternRe.lastIndex,
                        t = S.keywordPatternRe.exec(k)
                }
                var a;
                n += k.substr(e),
                    N.addText(n)
            }
            function d() {
                null != S.subLanguage ? function() {
                    if ("" === k)
                        return;
                    let e = null;
                    if ("string" == typeof S.subLanguage) {
                        if (!t[S.subLanguage])
                            return void N.addText(k);
                        e = y(S.subLanguage, k, !0, A[S.subLanguage]),
                            A[S.subLanguage] = e._top
                    } else
                        e = v(k, S.subLanguage.length ? S.subLanguage : null);
                    S.relevance > 0 && (O += e.relevance),
                        N.addSublanguage(e._emitter, e.language)
                }() : u(),
                    k = ""
            }
            function g(e, t) {
                let n = 1;
                const a = t.length - 1;
                for (; n <= a; ) {
                    if (!e._emit[n]) {
                        n++;
                        continue
                    }
                    const a = w.classNameAliases[e[n]] || e[n]
                        , i = t[n];
                    a ? N.addKeyword(i, a) : (k = i,
                        u(),
                        k = ""),
                        n++
                }
            }
            function f(e, t) {
                return e.scope && "string" == typeof e.scope && N.openNode(w.classNameAliases[e.scope] || e.scope),
                e.beginScope && (e.beginScope._wrap ? (N.addKeyword(k, w.classNameAliases[e.beginScope._wrap] || e.beginScope._wrap),
                    k = "") : e.beginScope._multi && (g(e.beginScope, t),
                    k = "")),
                    S = Object.create(e, {
                        parent: {
                            value: S
                        }
                    }),
                    S
            }
            function b(e) {
                return 0 === S.matcher.regexIndex ? (k += e[0],
                    1) : (C = !0,
                    0)
            }
            function p(e) {
                const t = e[0]
                    , a = n.substr(e.index)
                    , i = function e(t, n, a) {
                    let i = function(e, t) {
                        const n = e && e.exec(t);
                        return n && 0 === n.index
                    }(t.endRe, a);
                    if (i) {
                        if (t["on:end"]) {
                            const e = new r(t);
                            t["on:end"](n, e),
                            e.isMatchIgnored && (i = !1)
                        }
                        if (i) {
                            for (; t.endsParent && t.parent; )
                                t = t.parent;
                            return t
                        }
                    }
                    if (t.endsWithParent)
                        return e(t.parent, n, a)
                }(S, e, a);
                if (!i)
                    return ae;
                const o = S;
                S.endScope && S.endScope._wrap ? (d(),
                    N.addKeyword(t, S.endScope._wrap)) : S.endScope && S.endScope._multi ? (d(),
                    g(S.endScope, e)) : o.skip ? k += t : (o.returnEnd || o.excludeEnd || (k += t),
                    d(),
                o.excludeEnd && (k = t));
                do {
                    S.scope && N.closeNode(),
                    S.skip || S.subLanguage || (O += S.relevance),
                        S = S.parent
                } while (S !== i.parent);
                return i.starts && f(i.starts, e),
                    o.returnEnd ? 0 : t.length
            }
            let h = {};
            function m(t, i) {
                const s = i && i[0];
                if (k += t,
                null == s)
                    return d(),
                        0;
                if ("begin" === h.type && "end" === i.type && h.index === i.index && "" === s) {
                    if (k += n.slice(i.index, i.index + 1),
                        !o) {
                        const t = new Error(`0 width match regex (${e})`);
                        throw t.languageName = e,
                            t.badRule = h.rule,
                            t
                    }
                    return 1
                }
                if (h = i,
                "begin" === i.type)
                    return function(e) {
                        const t = e[0]
                            , n = e.rule
                            , a = new r(n)
                            , i = [n.__beforeBegin, n["on:begin"]];
                        for (const n of i)
                            if (n && (n(e, a),
                                a.isMatchIgnored))
                                return b(t);
                        return n.skip ? k += t : (n.excludeBegin && (k += t),
                            d(),
                        n.returnBegin || n.excludeBegin || (k = t)),
                            f(n, e),
                            n.returnBegin ? 0 : t.length
                    }(i);
                if ("illegal" === i.type && !a) {
                    const e = new Error('Illegal lexeme "' + s + '" for mode "' + (S.scope || "<unnamed>") + '"');
                    throw e.mode = S,
                        e
                }
                if ("end" === i.type) {
                    const e = p(i);
                    if (e !== ae)
                        return e
                }
                if ("illegal" === i.type && "" === s)
                    return 1;
                if (M > 1e5 && M > 3 * i.index) {
                    throw new Error("potential infinite loop, way more iterations than matches")
                }
                return k += s,
                    s.length
            }
            const w = x(e);
            if (!w)
                throw G(s.replace("{}", e)),
                    new Error('Unknown language: "' + e + '"');
            const E = Y(w);
            let _ = ""
                , S = i || E;
            const A = {}
                , N = new l.__emitter(l);
            !function() {
                const e = [];
                for (let t = S; t !== w; t = t.parent)
                    t.scope && e.unshift(t.scope);
                e.forEach(e => N.openNode(e))
            }();
            let k = ""
                , O = 0
                , T = 0
                , M = 0
                , C = !1;
            try {
                for (S.matcher.considerAll(); ; ) {
                    M++,
                        C ? C = !1 : S.matcher.considerAll(),
                        S.matcher.lastIndex = T;
                    const e = S.matcher.exec(n);
                    if (!e)
                        break;
                    const t = m(n.substring(T, e.index), e);
                    T = e.index + t
                }
                return m(n.substr(T)),
                    N.closeAllNodes(),
                    N.finalize(),
                    _ = N.toHTML(),
                    {
                        language: e,
                        value: _,
                        relevance: O,
                        illegal: !1,
                        _emitter: N,
                        _top: S
                    }
            } catch (t) {
                if (t.message && t.message.includes("Illegal"))
                    return {
                        language: e,
                        value: te(n),
                        illegal: !0,
                        relevance: 0,
                        _illegalBy: {
                            message: t.message,
                            index: T,
                            context: n.slice(T - 100, T + 100),
                            mode: t.mode,
                            resultSoFar: _
                        },
                        _emitter: N
                    };
                if (o)
                    return {
                        language: e,
                        value: te(n),
                        illegal: !1,
                        relevance: 0,
                        errorRaised: t,
                        _emitter: N,
                        _top: S
                    };
                throw t
            }
        }
        function v(e, n) {
            n = n || l.languages || Object.keys(t);
            const a = function(e) {
                const t = {
                    value: te(e),
                    illegal: !1,
                    relevance: 0,
                    _top: c,
                    _emitter: new l.__emitter(l)
                };
                return t._emitter.addText(e),
                    t
            }(e)
                , i = n.filter(x).filter(A).map(t => y(t, e, !1));
            i.unshift(a);
            const r = i.sort( (e, t) => {
                    if (e.relevance !== t.relevance)
                        return t.relevance - e.relevance;
                    if (e.language && t.language) {
                        if (x(e.language).supersetOf === t.language)
                            return 1;
                        if (x(t.language).supersetOf === e.language)
                            return -1
                    }
                    return 0
                }
            )
                , [o,s] = r
                , u = o;
            return u.secondBest = s,
                u
        }
        function w(e) {
            let t = null;
            const a = function(e) {
                let t = e.className + " ";
                t += e.parentNode ? e.parentNode.className : "";
                const n = l.languageDetectRe.exec(t);
                if (n) {
                    const t = x(n[1]);
                    return t || (W(s.replace("{}", n[1])),
                        W("Falling back to no-highlight mode for this block.", e)),
                        t ? n[1] : "no-highlight"
                }
                return t.split(/\s+/).find(e => u(e) || x(e))
            }(e);
            if (u(a))
                return;
            if (N("before:highlightElement", {
                el: e,
                language: a
            }),
            e.children.length > 0 && (l.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),
                console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),
                console.warn("The element with unescaped HTML:"),
                console.warn(e)),
                l.throwUnescapedHTML)) {
                throw new ee("One of your code blocks includes unescaped HTML.",e.innerHTML)
            }
            t = e;
            const i = t.textContent
                , r = a ? g(i, {
                language: a,
                ignoreIllegals: !0
            }) : v(i);
            e.innerHTML = r.value,
                function(e, t, a) {
                    const i = t && n[t] || a;
                    e.classList.add("hljs"),
                        e.classList.add("language-" + i)
                }(e, a, r.language),
                e.result = {
                    language: r.language,
                    re: r.relevance,
                    relevance: r.relevance
                },
            r.secondBest && (e.secondBest = {
                language: r.secondBest.language,
                relevance: r.secondBest.relevance
            }),
                N("after:highlightElement", {
                    el: e,
                    result: r,
                    text: i
                })
        }
        let E = !1;
        function _() {
            if ("loading" === document.readyState)
                return void (E = !0);
            document.querySelectorAll(l.cssSelector).forEach(w)
        }
        function x(e) {
            return e = (e || "").toLowerCase(),
            t[e] || t[n[e]]
        }
        function S(e, {languageName: t}) {
            "string" == typeof e && (e = [e]),
                e.forEach(e => {
                        n[e.toLowerCase()] = t
                    }
                )
        }
        function A(e) {
            const t = x(e);
            return t && !t.disableAutodetect
        }
        function N(e, t) {
            const n = e;
            a.forEach((function(e) {
                    e[n] && e[n](t)
                }
            ))
        }
        "undefined" != typeof window && window.addEventListener && window.addEventListener("DOMContentLoaded", (function() {
                E && _()
            }
        ), !1),
            Object.assign(e, {
                highlight: g,
                highlightAuto: v,
                highlightAll: _,
                highlightElement: w,
                highlightBlock: function(e) {
                    return X("10.7.0", "highlightBlock will be removed entirely in v12.0"),
                        X("10.7.0", "Please use highlightElement now."),
                        w(e)
                },
                configure: function(e) {
                    l = ne(l, e)
                },
                initHighlighting: () => {
                    _(),
                        X("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.")
                }
                ,
                initHighlightingOnLoad: function() {
                    _(),
                        X("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.")
                },
                registerLanguage: function(n, a) {
                    let i = null;
                    try {
                        i = a(e)
                    } catch (e) {
                        if (G("Language definition for '{}' could not be registered.".replace("{}", n)),
                            !o)
                            throw e;
                        G(e),
                            i = c
                    }
                    i.name || (i.name = n),
                        t[n] = i,
                        i.rawDefinition = a.bind(null, e),
                    i.aliases && S(i.aliases, {
                        languageName: n
                    })
                },
                unregisterLanguage: function(e) {
                    delete t[e];
                    for (const t of Object.keys(n))
                        n[t] === e && delete n[t]
                },
                listLanguages: function() {
                    return Object.keys(t)
                },
                getLanguage: x,
                registerAliases: S,
                autoDetection: A,
                inherit: ne,
                addPlugin: function(e) {
                    !function(e) {
                        e["before:highlightBlock"] && !e["before:highlightElement"] && (e["before:highlightElement"] = t => {
                                e["before:highlightBlock"](Object.assign({
                                    block: t.el
                                }, t))
                            }
                        ),
                        e["after:highlightBlock"] && !e["after:highlightElement"] && (e["after:highlightElement"] = t => {
                                e["after:highlightBlock"](Object.assign({
                                    block: t.el
                                }, t))
                            }
                        )
                    }(e),
                        a.push(e)
                }
            }),
            e.debugMode = function() {
                o = !1
            }
            ,
            e.safeMode = function() {
                o = !0
            }
            ,
            e.versionString = "11.5.1",
            e.regex = {
                concat: h,
                lookahead: f,
                either: m,
                optional: p,
                anyNumberOfTimes: b
            };
        for (const e in $)
            "object" == typeof $[e] && i($[e]);
        return Object.assign(e, $),
            e
    }({});
    e.exports = ie,
        ie.HighlightJS = ie,
        ie.default = ie
}
    , function(e, t, n) {
        var a;
        a = function() {
            return function() {
                var e = {
                    686: function(e, t, n) {
                        "use strict";
                        n.d(t, {
                            default: function() {
                                return _
                            }
                        });
                        var a = n(279)
                            , i = n.n(a)
                            , r = n(370)
                            , o = n.n(r)
                            , s = n(817)
                            , c = n.n(s);
                        function l(e) {
                            try {
                                return document.execCommand(e)
                            } catch (e) {
                                return !1
                            }
                        }
                        var u = function(e) {
                            var t = c()(e);
                            return l("cut"),
                                t
                        };
                        function d(e) {
                            var t = "rtl" === document.documentElement.getAttribute("dir")
                                , n = document.createElement("textarea");
                            n.style.fontSize = "12pt",
                                n.style.border = "0",
                                n.style.padding = "0",
                                n.style.margin = "0",
                                n.style.position = "absolute",
                                n.style[t ? "right" : "left"] = "-9999px";
                            var a = window.pageYOffset || document.documentElement.scrollTop;
                            return n.style.top = "".concat(a, "px"),
                                n.setAttribute("readonly", ""),
                                n.value = e,
                                n
                        }
                        var g = function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                container: document.body
                            }
                                , n = "";
                            if ("string" == typeof e) {
                                var a = d(e);
                                t.container.appendChild(a),
                                    n = c()(a),
                                    l("copy"),
                                    a.remove()
                            } else
                                n = c()(e),
                                    l("copy");
                            return n
                        };
                        function f(e) {
                            return (f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                        return typeof e
                                    }
                                    : function(e) {
                                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                                    }
                            )(e)
                        }
                        var b = function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                                , t = e.action
                                , n = void 0 === t ? "copy" : t
                                , a = e.container
                                , i = e.target
                                , r = e.text;
                            if ("copy" !== n && "cut" !== n)
                                throw new Error('Invalid "action" value, use either "copy" or "cut"');
                            if (void 0 !== i) {
                                if (!i || "object" !== f(i) || 1 !== i.nodeType)
                                    throw new Error('Invalid "target" value, use a valid Element');
                                if ("copy" === n && i.hasAttribute("disabled"))
                                    throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                if ("cut" === n && (i.hasAttribute("readonly") || i.hasAttribute("disabled")))
                                    throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes')
                            }
                            return r ? g(r, {
                                container: a
                            }) : i ? "cut" === n ? u(i) : g(i, {
                                container: a
                            }) : void 0
                        };
                        function p(e) {
                            return (p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                        return typeof e
                                    }
                                    : function(e) {
                                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                                    }
                            )(e)
                        }
                        function h(e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var a = t[n];
                                a.enumerable = a.enumerable || !1,
                                    a.configurable = !0,
                                "value"in a && (a.writable = !0),
                                    Object.defineProperty(e, a.key, a)
                            }
                        }
                        function m(e, t) {
                            return (m = Object.setPrototypeOf || function(e, t) {
                                    return e.__proto__ = t,
                                        e
                                }
                            )(e, t)
                        }
                        function y(e) {
                            var t = function() {
                                if ("undefined" == typeof Reflect || !Reflect.construct)
                                    return !1;
                                if (Reflect.construct.sham)
                                    return !1;
                                if ("function" == typeof Proxy)
                                    return !0;
                                try {
                                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
                                    ))),
                                        !0
                                } catch (e) {
                                    return !1
                                }
                            }();
                            return function() {
                                var n, a = w(e);
                                if (t) {
                                    var i = w(this).constructor;
                                    n = Reflect.construct(a, arguments, i)
                                } else
                                    n = a.apply(this, arguments);
                                return v(this, n)
                            }
                        }
                        function v(e, t) {
                            return !t || "object" !== p(t) && "function" != typeof t ? function(e) {
                                if (void 0 === e)
                                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return e
                            }(e) : t
                        }
                        function w(e) {
                            return (w = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                                    return e.__proto__ || Object.getPrototypeOf(e)
                                }
                            )(e)
                        }
                        function E(e, t) {
                            var n = "data-clipboard-".concat(e);
                            if (t.hasAttribute(n))
                                return t.getAttribute(n)
                        }
                        var _ = function(e) {
                            !function(e, t) {
                                if ("function" != typeof t && null !== t)
                                    throw new TypeError("Super expression must either be null or a function");
                                e.prototype = Object.create(t && t.prototype, {
                                    constructor: {
                                        value: e,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }),
                                t && m(e, t)
                            }(r, e);
                            var t, n, a, i = y(r);
                            function r(e, t) {
                                var n;
                                return function(e, t) {
                                    if (!(e instanceof t))
                                        throw new TypeError("Cannot call a class as a function")
                                }(this, r),
                                    (n = i.call(this)).resolveOptions(t),
                                    n.listenClick(e),
                                    n
                            }
                            return t = r,
                                a = [{
                                    key: "copy",
                                    value: function(e) {
                                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                            container: document.body
                                        };
                                        return g(e, t)
                                    }
                                }, {
                                    key: "cut",
                                    value: function(e) {
                                        return u(e)
                                    }
                                }, {
                                    key: "isSupported",
                                    value: function() {
                                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"]
                                            , t = "string" == typeof e ? [e] : e
                                            , n = !!document.queryCommandSupported;
                                        return t.forEach((function(e) {
                                                n = n && !!document.queryCommandSupported(e)
                                            }
                                        )),
                                            n
                                    }
                                }],
                            (n = [{
                                key: "resolveOptions",
                                value: function() {
                                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                    this.action = "function" == typeof e.action ? e.action : this.defaultAction,
                                        this.target = "function" == typeof e.target ? e.target : this.defaultTarget,
                                        this.text = "function" == typeof e.text ? e.text : this.defaultText,
                                        this.container = "object" === p(e.container) ? e.container : document.body
                                }
                            }, {
                                key: "listenClick",
                                value: function(e) {
                                    var t = this;
                                    this.listener = o()(e, "click", (function(e) {
                                            return t.onClick(e)
                                        }
                                    ))
                                }
                            }, {
                                key: "onClick",
                                value: function(e) {
                                    var t = e.delegateTarget || e.currentTarget
                                        , n = this.action(t) || "copy"
                                        , a = b({
                                        action: n,
                                        container: this.container,
                                        target: this.target(t),
                                        text: this.text(t)
                                    });
                                    this.emit(a ? "success" : "error", {
                                        action: n,
                                        text: a,
                                        trigger: t,
                                        clearSelection: function() {
                                            t && t.focus(),
                                                document.activeElement.blur(),
                                                window.getSelection().removeAllRanges()
                                        }
                                    })
                                }
                            }, {
                                key: "defaultAction",
                                value: function(e) {
                                    return E("action", e)
                                }
                            }, {
                                key: "defaultTarget",
                                value: function(e) {
                                    var t = E("target", e);
                                    if (t)
                                        return document.querySelector(t)
                                }
                            }, {
                                key: "defaultText",
                                value: function(e) {
                                    return E("text", e)
                                }
                            }, {
                                key: "destroy",
                                value: function() {
                                    this.listener.destroy()
                                }
                            }]) && h(t.prototype, n),
                            a && h(t, a),
                                r
                        }(i())
                    },
                    828: function(e) {
                        if ("undefined" != typeof Element && !Element.prototype.matches) {
                            var t = Element.prototype;
                            t.matches = t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector
                        }
                        e.exports = function(e, t) {
                            for (; e && 9 !== e.nodeType; ) {
                                if ("function" == typeof e.matches && e.matches(t))
                                    return e;
                                e = e.parentNode
                            }
                        }
                    },
                    438: function(e, t, n) {
                        var a = n(828);
                        function i(e, t, n, a, i) {
                            var o = r.apply(this, arguments);
                            return e.addEventListener(n, o, i),
                                {
                                    destroy: function() {
                                        e.removeEventListener(n, o, i)
                                    }
                                }
                        }
                        function r(e, t, n, i) {
                            return function(n) {
                                n.delegateTarget = a(n.target, t),
                                n.delegateTarget && i.call(e, n)
                            }
                        }
                        e.exports = function(e, t, n, a, r) {
                            return "function" == typeof e.addEventListener ? i.apply(null, arguments) : "function" == typeof n ? i.bind(null, document).apply(null, arguments) : ("string" == typeof e && (e = document.querySelectorAll(e)),
                                Array.prototype.map.call(e, (function(e) {
                                        return i(e, t, n, a, r)
                                    }
                                )))
                        }
                    },
                    879: function(e, t) {
                        t.node = function(e) {
                            return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
                        }
                            ,
                            t.nodeList = function(e) {
                                var n = Object.prototype.toString.call(e);
                                return void 0 !== e && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length"in e && (0 === e.length || t.node(e[0]))
                            }
                            ,
                            t.string = function(e) {
                                return "string" == typeof e || e instanceof String
                            }
                            ,
                            t.fn = function(e) {
                                return "[object Function]" === Object.prototype.toString.call(e)
                            }
                    },
                    370: function(e, t, n) {
                        var a = n(879)
                            , i = n(438);
                        e.exports = function(e, t, n) {
                            if (!e && !t && !n)
                                throw new Error("Missing required arguments");
                            if (!a.string(t))
                                throw new TypeError("Second argument must be a String");
                            if (!a.fn(n))
                                throw new TypeError("Third argument must be a Function");
                            if (a.node(e))
                                return function(e, t, n) {
                                    return e.addEventListener(t, n),
                                        {
                                            destroy: function() {
                                                e.removeEventListener(t, n)
                                            }
                                        }
                                }(e, t, n);
                            if (a.nodeList(e))
                                return function(e, t, n) {
                                    return Array.prototype.forEach.call(e, (function(e) {
                                            e.addEventListener(t, n)
                                        }
                                    )),
                                        {
                                            destroy: function() {
                                                Array.prototype.forEach.call(e, (function(e) {
                                                        e.removeEventListener(t, n)
                                                    }
                                                ))
                                            }
                                        }
                                }(e, t, n);
                            if (a.string(e))
                                return function(e, t, n) {
                                    return i(document.body, e, t, n)
                                }(e, t, n);
                            throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
                        }
                    },
                    817: function(e) {
                        e.exports = function(e) {
                            var t;
                            if ("SELECT" === e.nodeName)
                                e.focus(),
                                    t = e.value;
                            else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) {
                                var n = e.hasAttribute("readonly");
                                n || e.setAttribute("readonly", ""),
                                    e.select(),
                                    e.setSelectionRange(0, e.value.length),
                                n || e.removeAttribute("readonly"),
                                    t = e.value
                            } else {
                                e.hasAttribute("contenteditable") && e.focus();
                                var a = window.getSelection()
                                    , i = document.createRange();
                                i.selectNodeContents(e),
                                    a.removeAllRanges(),
                                    a.addRange(i),
                                    t = a.toString()
                            }
                            return t
                        }
                    },
                    279: function(e) {
                        function t() {}
                        t.prototype = {
                            on: function(e, t, n) {
                                var a = this.e || (this.e = {});
                                return (a[e] || (a[e] = [])).push({
                                    fn: t,
                                    ctx: n
                                }),
                                    this
                            },
                            once: function(e, t, n) {
                                var a = this;
                                function i() {
                                    a.off(e, i),
                                        t.apply(n, arguments)
                                }
                                return i._ = t,
                                    this.on(e, i, n)
                            },
                            emit: function(e) {
                                for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), a = 0, i = n.length; a < i; a++)
                                    n[a].fn.apply(n[a].ctx, t);
                                return this
                            },
                            off: function(e, t) {
                                var n = this.e || (this.e = {})
                                    , a = n[e]
                                    , i = [];
                                if (a && t)
                                    for (var r = 0, o = a.length; r < o; r++)
                                        a[r].fn !== t && a[r].fn._ !== t && i.push(a[r]);
                                return i.length ? n[e] = i : delete n[e],
                                    this
                            }
                        },
                            e.exports = t,
                            e.exports.TinyEmitter = t
                    }
                }
                    , t = {};
                function n(a) {
                    if (t[a])
                        return t[a].exports;
                    var i = t[a] = {
                        exports: {}
                    };
                    return e[a](i, i.exports, n),
                        i.exports
                }
                return n.n = function(e) {
                    var t = e && e.__esModule ? function() {
                                return e.default
                            }
                            : function() {
                                return e
                            }
                    ;
                    return n.d(t, {
                        a: t
                    }),
                        t
                }
                    ,
                    n.d = function(e, t) {
                        for (var a in t)
                            n.o(t, a) && !n.o(e, a) && Object.defineProperty(e, a, {
                                enumerable: !0,
                                get: t[a]
                            })
                    }
                    ,
                    n.o = function(e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t)
                    }
                    ,
                    n(686)
            }().default
        }
            ,
            e.exports = a()
    }
    , function(e, t, n) {
        var a, i = function(e) {
            function t(e, t) {
                return e.classList ? e.classList.contains(t) : new RegExp("\\b" + t + "\\b").test(e.className)
            }
            function n(e, t, n) {
                e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n)
            }
            function a(e, t, n) {
                e.detachEvent ? e.detachEvent("on" + t, n) : e.removeEventListener(t, n)
            }
            function i(e, a, i, r) {
                n(r || document, a, (function(n) {
                        for (var a, r = n.target || n.srcElement; r && !(a = t(r, e)); )
                            r = r.parentElement;
                        a && i.call(r, n)
                    }
                ))
            }
            if (document.querySelector) {
                var r = {
                    selector: 0,
                    source: 0,
                    minChars: 3,
                    delay: 150,
                    offsetLeft: 0,
                    offsetTop: 1,
                    cache: 1,
                    menuClass: "",
                    renderItem: function(e, t) {
                        t = t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                        var n = new RegExp("(" + t.split(" ").join("|") + ")","gi");
                        return '<div class="autocomplete-suggestion" data-val="' + e + '">' + e.replace(n, "<b>$1</b>") + "</div>"
                    },
                    onSelect: function() {}
                };
                for (var o in e)
                    e.hasOwnProperty(o) && (r[o] = e[o]);
                for (var s = "object" == typeof r.selector ? [r.selector] : document.querySelectorAll(r.selector), c = 0; c < s.length; c++) {
                    var l = s[c];
                    l.sc = document.createElement("div"),
                        l.sc.className = "autocomplete-suggestions " + r.menuClass,
                        l.autocompleteAttr = l.getAttribute("autocomplete"),
                        l.setAttribute("autocomplete", "off"),
                        l.cache = {},
                        l.last_val = "",
                        l.updateSC = function(e, t) {
                            var n = l.getBoundingClientRect();
                            if (l.sc.style.left = Math.round(n.left + (window.pageXOffset || document.documentElement.scrollLeft) + r.offsetLeft) + "px",
                                l.sc.style.top = Math.round(n.bottom + (window.pageYOffset || document.documentElement.scrollTop) + r.offsetTop) + "px",
                                l.sc.style.width = Math.round(n.right - n.left) + "px",
                            !e && (l.sc.style.display = "block",
                            l.sc.maxHeight || (l.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(l.sc, null) : l.sc.currentStyle).maxHeight)),
                            l.sc.suggestionHeight || (l.sc.suggestionHeight = l.sc.querySelector(".autocomplete-suggestion").offsetHeight),
                                l.sc.suggestionHeight))
                                if (t) {
                                    var a = l.sc.scrollTop
                                        , i = t.getBoundingClientRect().top - l.sc.getBoundingClientRect().top;
                                    i + l.sc.suggestionHeight - l.sc.maxHeight > 0 ? l.sc.scrollTop = i + l.sc.suggestionHeight + a - l.sc.maxHeight : 0 > i && (l.sc.scrollTop = i + a)
                                } else
                                    l.sc.scrollTop = 0
                        }
                        ,
                        n(window, "resize", l.updateSC),
                        document.body.appendChild(l.sc),
                        i("autocomplete-suggestion", "mouseleave", (function() {
                                var e = l.sc.querySelector(".autocomplete-suggestion.selected");
                                e && setTimeout((function() {
                                        e.className = e.className.replace("selected", "")
                                    }
                                ), 20)
                            }
                        ), l.sc),
                        i("autocomplete-suggestion", "mouseover", (function() {
                                var e = l.sc.querySelector(".autocomplete-suggestion.selected");
                                e && (e.className = e.className.replace("selected", "")),
                                    this.className += " selected"
                            }
                        ), l.sc),
                        i("autocomplete-suggestion", "mousedown", (function(e) {
                                if (t(this, "autocomplete-suggestion")) {
                                    var n = this.getAttribute("data-val");
                                    l.value = n,
                                        r.onSelect(e, n, this),
                                        l.sc.style.display = "none"
                                }
                            }
                        ), l.sc),
                        l.blurHandler = function() {
                            try {
                                var e = document.querySelector(".autocomplete-suggestions:hover")
                            } catch (t) {
                                e = 0
                            }
                            e ? l !== document.activeElement && setTimeout((function() {
                                    l.focus()
                                }
                            ), 20) : (l.last_val = l.value,
                                l.sc.style.display = "none",
                                setTimeout((function() {
                                        l.sc.style.display = "none"
                                    }
                                ), 350))
                        }
                        ,
                        n(l, "blur", l.blurHandler);
                    var u = function(e) {
                        var t = l.value;
                        if (l.cache[t] = e,
                        e.length && t.length >= r.minChars) {
                            for (var n = "", a = 0; a < e.length; a++)
                                n += r.renderItem(e[a], t);
                            l.sc.innerHTML = n,
                                l.updateSC(0)
                        } else
                            l.sc.style.display = "none"
                    };
                    l.keydownHandler = function(e) {
                        var t, n = window.event ? e.keyCode : e.which;
                        if ((40 == n || 38 == n) && l.sc.innerHTML)
                            return (a = l.sc.querySelector(".autocomplete-suggestion.selected")) ? (t = 40 == n ? a.nextSibling : a.previousSibling) ? (a.className = a.className.replace("selected", ""),
                                t.className += " selected",
                                l.value = t.getAttribute("data-val")) : (a.className = a.className.replace("selected", ""),
                                l.value = l.last_val,
                                t = 0) : ((t = 40 == n ? l.sc.querySelector(".autocomplete-suggestion") : l.sc.childNodes[l.sc.childNodes.length - 1]).className += " selected",
                                l.value = t.getAttribute("data-val")),
                                l.updateSC(0, t),
                                !1;
                        if (27 == n)
                            l.value = l.last_val,
                                l.sc.style.display = "none";
                        else if (13 == n || 9 == n) {
                            var a;
                            (a = l.sc.querySelector(".autocomplete-suggestion.selected")) && "none" != l.sc.style.display && (r.onSelect(e, a.getAttribute("data-val"), a),
                                setTimeout((function() {
                                        l.sc.style.display = "none"
                                    }
                                ), 20))
                        }
                    }
                        ,
                        n(l, "keydown", l.keydownHandler),
                        l.keyupHandler = function(e) {
                            var t = window.event ? e.keyCode : e.which;
                            if (!t || (35 > t || t > 40) && 13 != t && 27 != t) {
                                var n = l.value;
                                if (n.length >= r.minChars) {
                                    if (n != l.last_val) {
                                        if (l.last_val = n,
                                            clearTimeout(l.timer),
                                            r.cache) {
                                            if (n in l.cache)
                                                return void u(l.cache[n]);
                                            for (var a = 1; a < n.length - r.minChars; a++) {
                                                var i = n.slice(0, n.length - a);
                                                if (i in l.cache && !l.cache[i].length)
                                                    return void u([])
                                            }
                                        }
                                        l.timer = setTimeout((function() {
                                                r.source(n, u)
                                            }
                                        ), r.delay)
                                    }
                                } else
                                    l.last_val = n,
                                        l.sc.style.display = "none"
                            }
                        }
                        ,
                        n(l, "keyup", l.keyupHandler),
                        l.focusHandler = function(e) {
                            l.last_val = "\n",
                                l.keyupHandler(e)
                        }
                        ,
                    r.minChars || n(l, "focus", l.focusHandler)
                }
                this.destroy = function() {
                    for (var e = 0; e < s.length; e++) {
                        var t = s[e];
                        a(window, "resize", t.updateSC),
                            a(t, "blur", t.blurHandler),
                            a(t, "focus", t.focusHandler),
                            a(t, "keydown", t.keydownHandler),
                            a(t, "keyup", t.keyupHandler),
                            t.autocompleteAttr ? t.setAttribute("autocomplete", t.autocompleteAttr) : t.removeAttribute("autocomplete"),
                            document.body.removeChild(t.sc),
                            t = null
                    }
                }
            }
        };
        void 0 === (a = function() {
            return i
        }
            .call(t, n, t, e)) || (e.exports = a)
    }
    , function(e, t) {
        const n = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"]
            , a = ["true", "false", "null", "undefined", "NaN", "Infinity"]
            , i = ["Object", "Function", "Boolean", "Symbol", "Math", "Date", "Number", "BigInt", "String", "RegExp", "Array", "Float32Array", "Float64Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Int32Array", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array", "Set", "Map", "WeakSet", "WeakMap", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "Reflect", "Proxy", "Intl", "WebAssembly"]
            , r = ["Error", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"]
            , o = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"]
            , s = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"]
            , c = [].concat(o, i, r);
        e.exports = function(e) {
            const t = e.regex
                , l = "[A-Za-z$_][0-9A-Za-z$_]*"
                , u = "<>"
                , d = "</>"
                , g = {
                begin: /<[A-Za-z0-9\\._:-]+/,
                end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
                isTrulyOpeningTag: (e, t) => {
                    const n = e[0].length + e.index
                        , a = e.input[n];
                    if ("<" === a || "," === a)
                        return void t.ignoreMatch();
                    let i;
                    ">" === a && (( (e, {after: t}) => {
                            const n = "</" + e[0].slice(1);
                            return -1 !== e.input.indexOf(n, t)
                        }
                    )(e, {
                        after: n
                    }) || t.ignoreMatch());
                    (i = e.input.substr(n).match(/^\s+extends\s+/)) && 0 === i.index && t.ignoreMatch()
                }
            }
                , f = {
                $pattern: "[A-Za-z$_][0-9A-Za-z$_]*",
                keyword: n,
                literal: a,
                built_in: c,
                "variable.language": s
            }
                , b = "\\.([0-9](_?[0-9])*)"
                , p = {
                className: "number",
                variants: [{
                    begin: `(\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)((${b})|\\.)?|(${b}))[eE][+-]?([0-9](_?[0-9])*)\\b`
                }, {
                    begin: `\\b(0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*)\\b((${b})\\b|\\.)?|(${b})\\b`
                }, {
                    begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
                }, {
                    begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
                }, {
                    begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
                }, {
                    begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
                }, {
                    begin: "\\b0[0-7]+n?\\b"
                }],
                relevance: 0
            }
                , h = {
                className: "subst",
                begin: "\\$\\{",
                end: "\\}",
                keywords: f,
                contains: []
            }
                , m = {
                begin: "html`",
                end: "",
                starts: {
                    end: "`",
                    returnEnd: !1,
                    contains: [e.BACKSLASH_ESCAPE, h],
                    subLanguage: "xml"
                }
            }
                , y = {
                begin: "css`",
                end: "",
                starts: {
                    end: "`",
                    returnEnd: !1,
                    contains: [e.BACKSLASH_ESCAPE, h],
                    subLanguage: "css"
                }
            }
                , v = {
                className: "string",
                begin: "`",
                end: "`",
                contains: [e.BACKSLASH_ESCAPE, h]
            }
                , w = {
                className: "comment",
                variants: [e.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
                    relevance: 0,
                    contains: [{
                        begin: "(?=@[A-Za-z]+)",
                        relevance: 0,
                        contains: [{
                            className: "doctag",
                            begin: "@[A-Za-z]+"
                        }, {
                            className: "type",
                            begin: "\\{",
                            end: "\\}",
                            excludeEnd: !0,
                            excludeBegin: !0,
                            relevance: 0
                        }, {
                            className: "variable",
                            begin: l + "(?=\\s*(-)|$)",
                            endsParent: !0,
                            relevance: 0
                        }, {
                            begin: /(?=[^\n])\s/,
                            relevance: 0
                        }]
                    }]
                }), e.C_BLOCK_COMMENT_MODE, e.C_LINE_COMMENT_MODE]
            }
                , E = [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, m, y, v, p];
            h.contains = E.concat({
                begin: /\{/,
                end: /\}/,
                keywords: f,
                contains: ["self"].concat(E)
            });
            const _ = [].concat(w, h.contains)
                , x = _.concat([{
                begin: /\(/,
                end: /\)/,
                keywords: f,
                contains: ["self"].concat(_)
            }])
                , S = {
                className: "params",
                begin: /\(/,
                end: /\)/,
                excludeBegin: !0,
                excludeEnd: !0,
                keywords: f,
                contains: x
            }
                , A = {
                variants: [{
                    match: [/class/, /\s+/, l, /\s+/, /extends/, /\s+/, t.concat(l, "(", t.concat(/\./, l), ")*")],
                    scope: {
                        1: "keyword",
                        3: "title.class",
                        5: "keyword",
                        7: "title.class.inherited"
                    }
                }, {
                    match: [/class/, /\s+/, l],
                    scope: {
                        1: "keyword",
                        3: "title.class"
                    }
                }]
            }
                , N = {
                relevance: 0,
                match: t.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
                className: "title.class",
                keywords: {
                    _: [...i, ...r]
                }
            }
                , k = {
                variants: [{
                    match: [/function/, /\s+/, l, /(?=\s*\()/]
                }, {
                    match: [/function/, /\s*(?=\()/]
                }],
                className: {
                    1: "keyword",
                    3: "title.function"
                },
                label: "func.def",
                contains: [S],
                illegal: /%/
            }
                , O = {
                match: t.concat(/\b/, (T = [...o, "super"],
                    t.concat("(?!", T.join("|"), ")")), l, t.lookahead(/\(/)),
                className: "title.function",
                relevance: 0
            };
            var T;
            const M = {
                begin: t.concat(/\./, t.lookahead(t.concat(l, /(?![0-9A-Za-z$_(])/))),
                end: l,
                excludeBegin: !0,
                keywords: "prototype",
                className: "property",
                relevance: 0
            }
                , C = {
                match: [/get|set/, /\s+/, l, /(?=\()/],
                className: {
                    1: "keyword",
                    3: "title.function"
                },
                contains: [{
                    begin: /\(\)/
                }, S]
            }
                , R = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>"
                , L = {
                match: [/const|var|let/, /\s+/, l, /\s*/, /=\s*/, /(async\s*)?/, t.lookahead(R)],
                keywords: "async",
                className: {
                    1: "keyword",
                    3: "title.function"
                },
                contains: [S]
            };
            return {
                name: "Javascript",
                aliases: ["js", "jsx", "mjs", "cjs"],
                keywords: f,
                exports: {
                    PARAMS_CONTAINS: x,
                    CLASS_REFERENCE: N
                },
                illegal: /#(?![$_A-z])/,
                contains: [e.SHEBANG({
                    label: "shebang",
                    binary: "node",
                    relevance: 5
                }), {
                    label: "use_strict",
                    className: "meta",
                    relevance: 10,
                    begin: /^\s*['"]use (strict|asm)['"]/
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, m, y, v, w, p, N, {
                    className: "attr",
                    begin: l + t.lookahead(":"),
                    relevance: 0
                }, L, {
                    begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
                    keywords: "return throw case",
                    relevance: 0,
                    contains: [w, e.REGEXP_MODE, {
                        className: "function",
                        begin: R,
                        returnBegin: !0,
                        end: "\\s*=>",
                        contains: [{
                            className: "params",
                            variants: [{
                                begin: e.UNDERSCORE_IDENT_RE,
                                relevance: 0
                            }, {
                                className: null,
                                begin: /\(\s*\)/,
                                skip: !0
                            }, {
                                begin: /\(/,
                                end: /\)/,
                                excludeBegin: !0,
                                excludeEnd: !0,
                                keywords: f,
                                contains: x
                            }]
                        }]
                    }, {
                        begin: /,/,
                        relevance: 0
                    }, {
                        match: /\s+/,
                        relevance: 0
                    }, {
                        variants: [{
                            begin: u,
                            end: d
                        }, {
                            match: /<[A-Za-z0-9\\._:-]+\s*\/>/
                        }, {
                            begin: g.begin,
                            "on:begin": g.isTrulyOpeningTag,
                            end: g.end
                        }],
                        subLanguage: "xml",
                        contains: [{
                            begin: g.begin,
                            end: g.end,
                            skip: !0,
                            contains: ["self"]
                        }]
                    }]
                }, k, {
                    beginKeywords: "while if switch catch for"
                }, {
                    begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
                    returnBegin: !0,
                    label: "func.def",
                    contains: [S, e.inherit(e.TITLE_MODE, {
                        begin: l,
                        className: "title.function"
                    })]
                }, {
                    match: /\.\.\./,
                    relevance: 0
                }, M, {
                    match: "\\$" + l,
                    relevance: 0
                }, {
                    match: [/\bconstructor(?=\s*\()/],
                    className: {
                        1: "title.function"
                    },
                    contains: [S]
                }, O, {
                    relevance: 0,
                    match: /\b[A-Z][A-Z_0-9]+\b/,
                    className: "variable.constant"
                }, A, C, {
                    match: /\$[(.]/
                }]
            }
        }
    }
    , function(e, t) {
        e.exports = function(e) {
            const t = e.regex
                , n = {}
                , a = {
                begin: /\$\{/,
                end: /\}/,
                contains: ["self", {
                    begin: /:-/,
                    contains: [n]
                }]
            };
            Object.assign(n, {
                className: "variable",
                variants: [{
                    begin: t.concat(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
                }, a]
            });
            const i = {
                className: "subst",
                begin: /\$\(/,
                end: /\)/,
                contains: [e.BACKSLASH_ESCAPE]
            }
                , r = {
                begin: /<<-?\s*(?=\w+)/,
                starts: {
                    contains: [e.END_SAME_AS_BEGIN({
                        begin: /(\w+)/,
                        end: /(\w+)/,
                        className: "string"
                    })]
                }
            }
                , o = {
                className: "string",
                begin: /"/,
                end: /"/,
                contains: [e.BACKSLASH_ESCAPE, n, i]
            };
            i.contains.push(o);
            const s = {
                begin: /\$\(\(/,
                end: /\)\)/,
                contains: [{
                    begin: /\d+#[0-9a-f]+/,
                    className: "number"
                }, e.NUMBER_MODE, n]
            }
                , c = e.SHEBANG({
                binary: `(${["fish", "bash", "zsh", "sh", "csh", "ksh", "tcsh", "dash", "scsh"].join("|")})`,
                relevance: 10
            })
                , l = {
                className: "function",
                begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                returnBegin: !0,
                contains: [e.inherit(e.TITLE_MODE, {
                    begin: /\w[\w\d_]*/
                })],
                relevance: 0
            };
            return {
                name: "Bash",
                aliases: ["sh"],
                keywords: {
                    $pattern: /\b[a-z][a-z0-9._-]+\b/,
                    keyword: ["if", "then", "else", "elif", "fi", "for", "while", "in", "do", "done", "case", "esac", "function"],
                    literal: ["true", "false"],
                    built_in: ["break", "cd", "continue", "eval", "exec", "exit", "export", "getopts", "hash", "pwd", "readonly", "return", "shift", "test", "times", "trap", "umask", "unset", "alias", "bind", "builtin", "caller", "command", "declare", "echo", "enable", "help", "let", "local", "logout", "mapfile", "printf", "read", "readarray", "source", "type", "typeset", "ulimit", "unalias", "set", "shopt", "autoload", "bg", "bindkey", "bye", "cap", "chdir", "clone", "comparguments", "compcall", "compctl", "compdescribe", "compfiles", "compgroups", "compquote", "comptags", "comptry", "compvalues", "dirs", "disable", "disown", "echotc", "echoti", "emulate", "fc", "fg", "float", "functions", "getcap", "getln", "history", "integer", "jobs", "kill", "limit", "log", "noglob", "popd", "print", "pushd", "pushln", "rehash", "sched", "setcap", "setopt", "stat", "suspend", "ttyctl", "unfunction", "unhash", "unlimit", "unsetopt", "vared", "wait", "whence", "where", "which", "zcompile", "zformat", "zftp", "zle", "zmodload", "zparseopts", "zprof", "zpty", "zregexparse", "zsocket", "zstyle", "ztcp", "chcon", "chgrp", "chown", "chmod", "cp", "dd", "df", "dir", "dircolors", "ln", "ls", "mkdir", "mkfifo", "mknod", "mktemp", "mv", "realpath", "rm", "rmdir", "shred", "sync", "touch", "truncate", "vdir", "b2sum", "base32", "base64", "cat", "cksum", "comm", "csplit", "cut", "expand", "fmt", "fold", "head", "join", "md5sum", "nl", "numfmt", "od", "paste", "ptx", "pr", "sha1sum", "sha224sum", "sha256sum", "sha384sum", "sha512sum", "shuf", "sort", "split", "sum", "tac", "tail", "tr", "tsort", "unexpand", "uniq", "wc", "arch", "basename", "chroot", "date", "dirname", "du", "echo", "env", "expr", "factor", "groups", "hostid", "id", "link", "logname", "nice", "nohup", "nproc", "pathchk", "pinky", "printenv", "printf", "pwd", "readlink", "runcon", "seq", "sleep", "stat", "stdbuf", "stty", "tee", "test", "timeout", "tty", "uname", "unlink", "uptime", "users", "who", "whoami", "yes"]
                },
                contains: [c, e.SHEBANG(), l, s, e.HASH_COMMENT_MODE, r, {
                    match: /(\/[a-z._-]+)+/
                }, o, {
                    className: "",
                    begin: /\\"/
                }, {
                    className: "string",
                    begin: /'/,
                    end: /'/
                }, n]
            }
        }
    }
    , function(e, t) {
        e.exports = function(e) {
            const t = e.regex
                , n = e.COMMENT("//", "$", {
                contains: [{
                    begin: /\\\n/
                }]
            })
                , a = "(decltype\\(auto\\)|" + t.optional("[a-zA-Z_]\\w*::") + "[a-zA-Z_]\\w*" + t.optional("<[^<>]+>") + ")"
                , i = {
                className: "type",
                variants: [{
                    begin: "\\b[a-z\\d_]*_t\\b"
                }, {
                    match: /\batomic_[a-z]{3,6}\b/
                }]
            }
                , r = {
                className: "string",
                variants: [{
                    begin: '(u8?|U|L)?"',
                    end: '"',
                    illegal: "\\n",
                    contains: [e.BACKSLASH_ESCAPE]
                }, {
                    begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
                    end: "'",
                    illegal: "."
                }, e.END_SAME_AS_BEGIN({
                    begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
                    end: /\)([^()\\ ]{0,16})"/
                })]
            }
                , o = {
                className: "number",
                variants: [{
                    begin: "\\b(0b[01']+)"
                }, {
                    begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
                }, {
                    begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
                }],
                relevance: 0
            }
                , s = {
                className: "meta",
                begin: /#\s*[a-z]+\b/,
                end: /$/,
                keywords: {
                    keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
                },
                contains: [{
                    begin: /\\\n/,
                    relevance: 0
                }, e.inherit(r, {
                    className: "string"
                }), {
                    className: "string",
                    begin: /<.*?>/
                }, n, e.C_BLOCK_COMMENT_MODE]
            }
                , c = {
                className: "title",
                begin: t.optional("[a-zA-Z_]\\w*::") + e.IDENT_RE,
                relevance: 0
            }
                , l = t.optional("[a-zA-Z_]\\w*::") + e.IDENT_RE + "\\s*\\("
                , u = {
                keyword: ["asm", "auto", "break", "case", "continue", "default", "do", "else", "enum", "extern", "for", "fortran", "goto", "if", "inline", "register", "restrict", "return", "sizeof", "struct", "switch", "typedef", "union", "volatile", "while", "_Alignas", "_Alignof", "_Atomic", "_Generic", "_Noreturn", "_Static_assert", "_Thread_local", "alignas", "alignof", "noreturn", "static_assert", "thread_local", "_Pragma"],
                type: ["float", "double", "signed", "unsigned", "int", "short", "long", "char", "void", "_Bool", "_Complex", "_Imaginary", "_Decimal32", "_Decimal64", "_Decimal128", "const", "static", "complex", "bool", "imaginary"],
                literal: "true false NULL",
                built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"
            }
                , d = [s, i, n, e.C_BLOCK_COMMENT_MODE, o, r]
                , g = {
                variants: [{
                    begin: /=/,
                    end: /;/
                }, {
                    begin: /\(/,
                    end: /\)/
                }, {
                    beginKeywords: "new throw return else",
                    end: /;/
                }],
                keywords: u,
                contains: d.concat([{
                    begin: /\(/,
                    end: /\)/,
                    keywords: u,
                    contains: d.concat(["self"]),
                    relevance: 0
                }]),
                relevance: 0
            }
                , f = {
                begin: "(" + a + "[\\*&\\s]+)+" + l,
                returnBegin: !0,
                end: /[{;=]/,
                excludeEnd: !0,
                keywords: u,
                illegal: /[^\w\s\*&:<>.]/,
                contains: [{
                    begin: "decltype\\(auto\\)",
                    keywords: u,
                    relevance: 0
                }, {
                    begin: l,
                    returnBegin: !0,
                    contains: [e.inherit(c, {
                        className: "title.function"
                    })],
                    relevance: 0
                }, {
                    relevance: 0,
                    match: /,/
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: u,
                    relevance: 0,
                    contains: [n, e.C_BLOCK_COMMENT_MODE, r, o, i, {
                        begin: /\(/,
                        end: /\)/,
                        keywords: u,
                        relevance: 0,
                        contains: ["self", n, e.C_BLOCK_COMMENT_MODE, r, o, i]
                    }]
                }, i, n, e.C_BLOCK_COMMENT_MODE, s]
            };
            return {
                name: "C",
                aliases: ["h"],
                keywords: u,
                disableAutodetect: !0,
                illegal: "</",
                contains: [].concat(g, f, d, [s, {
                    begin: e.IDENT_RE + "::",
                    keywords: u
                }, {
                    className: "class",
                    beginKeywords: "enum class struct union",
                    end: /[{;:<>=]/,
                    contains: [{
                        beginKeywords: "final class struct"
                    }, e.TITLE_MODE]
                }]),
                exports: {
                    preprocessor: s,
                    strings: r,
                    keywords: u
                }
            }
        }
    }
    , function(e, t) {
        e.exports = function(e) {
            const t = e.regex
                , n = t.concat(/[A-Z_]/, t.optional(/[A-Z0-9_.-]*:/), /[A-Z0-9_.-]*/)
                , a = {
                className: "symbol",
                begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
            }
                , i = {
                begin: /\s/,
                contains: [{
                    className: "keyword",
                    begin: /#?[a-z_][a-z1-9_-]+/,
                    illegal: /\n/
                }]
            }
                , r = e.inherit(i, {
                begin: /\(/,
                end: /\)/
            })
                , o = e.inherit(e.APOS_STRING_MODE, {
                className: "string"
            })
                , s = e.inherit(e.QUOTE_STRING_MODE, {
                className: "string"
            })
                , c = {
                endsWithParent: !0,
                illegal: /</,
                relevance: 0,
                contains: [{
                    className: "attr",
                    begin: /[A-Za-z0-9._:-]+/,
                    relevance: 0
                }, {
                    begin: /=\s*/,
                    relevance: 0,
                    contains: [{
                        className: "string",
                        endsParent: !0,
                        variants: [{
                            begin: /"/,
                            end: /"/,
                            contains: [a]
                        }, {
                            begin: /'/,
                            end: /'/,
                            contains: [a]
                        }, {
                            begin: /[^\s"'=<>`]+/
                        }]
                    }]
                }]
            };
            return {
                name: "HTML, XML",
                aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg"],
                case_insensitive: !0,
                contains: [{
                    className: "meta",
                    begin: /<![a-z]/,
                    end: />/,
                    relevance: 10,
                    contains: [i, s, o, r, {
                        begin: /\[/,
                        end: /\]/,
                        contains: [{
                            className: "meta",
                            begin: /<![a-z]/,
                            end: />/,
                            contains: [i, r, s, o]
                        }]
                    }]
                }, e.COMMENT(/<!--/, /-->/, {
                    relevance: 10
                }), {
                    begin: /<!\[CDATA\[/,
                    end: /\]\]>/,
                    relevance: 10
                }, a, {
                    className: "meta",
                    end: /\?>/,
                    variants: [{
                        begin: /<\?xml/,
                        relevance: 10,
                        contains: [s]
                    }, {
                        begin: /<\?[a-z][a-z0-9]+/
                    }]
                }, {
                    className: "tag",
                    begin: /<style(?=\s|>)/,
                    end: />/,
                    keywords: {
                        name: "style"
                    },
                    contains: [c],
                    starts: {
                        end: /<\/style>/,
                        returnEnd: !0,
                        subLanguage: ["css", "xml"]
                    }
                }, {
                    className: "tag",
                    begin: /<script(?=\s|>)/,
                    end: />/,
                    keywords: {
                        name: "script"
                    },
                    contains: [c],
                    starts: {
                        end: /<\/script>/,
                        returnEnd: !0,
                        subLanguage: ["javascript", "handlebars", "xml"]
                    }
                }, {
                    className: "tag",
                    begin: /<>|<\/>/
                }, {
                    className: "tag",
                    begin: t.concat(/</, t.lookahead(t.concat(n, t.either(/\/>/, />/, /\s/)))),
                    end: /\/?>/,
                    contains: [{
                        className: "name",
                        begin: n,
                        relevance: 0,
                        starts: c
                    }]
                }, {
                    className: "tag",
                    begin: t.concat(/<\//, t.lookahead(t.concat(n, />/))),
                    contains: [{
                        className: "name",
                        begin: n,
                        relevance: 0
                    }, {
                        begin: />/,
                        relevance: 0,
                        endsParent: !0
                    }]
                }]
            }
        }
    }
    , function(e, t) {
        e.exports = function(e) {
            const t = e.regex
                , n = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)"
                , a = t.either(/\b([A-Z]+[a-z0-9]+)+/, /\b([A-Z]+[a-z0-9]+)+[A-Z]+/)
                , i = t.concat(a, /(::\w+)*/)
                , r = {
                "variable.constant": ["__FILE__", "__LINE__"],
                "variable.language": ["self", "super"],
                keyword: ["alias", "and", "attr_accessor", "attr_reader", "attr_writer", "begin", "BEGIN", "break", "case", "class", "defined", "do", "else", "elsif", "end", "END", "ensure", "for", "if", "in", "include", "module", "next", "not", "or", "redo", "require", "rescue", "retry", "return", "then", "undef", "unless", "until", "when", "while", "yield"],
                built_in: ["proc", "lambda"],
                literal: ["true", "false", "nil"]
            }
                , o = {
                className: "doctag",
                begin: "@[A-Za-z]+"
            }
                , s = {
                begin: "#<",
                end: ">"
            }
                , c = [e.COMMENT("#", "$", {
                contains: [o]
            }), e.COMMENT("^=begin", "^=end", {
                contains: [o],
                relevance: 10
            }), e.COMMENT("^__END__", e.MATCH_NOTHING_RE)]
                , l = {
                className: "subst",
                begin: /#\{/,
                end: /\}/,
                keywords: r
            }
                , u = {
                className: "string",
                contains: [e.BACKSLASH_ESCAPE, l],
                variants: [{
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /"/,
                    end: /"/
                }, {
                    begin: /`/,
                    end: /`/
                }, {
                    begin: /%[qQwWx]?\(/,
                    end: /\)/
                }, {
                    begin: /%[qQwWx]?\[/,
                    end: /\]/
                }, {
                    begin: /%[qQwWx]?\{/,
                    end: /\}/
                }, {
                    begin: /%[qQwWx]?</,
                    end: />/
                }, {
                    begin: /%[qQwWx]?\//,
                    end: /\//
                }, {
                    begin: /%[qQwWx]?%/,
                    end: /%/
                }, {
                    begin: /%[qQwWx]?-/,
                    end: /-/
                }, {
                    begin: /%[qQwWx]?\|/,
                    end: /\|/
                }, {
                    begin: /\B\?(\\\d{1,3})/
                }, {
                    begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/
                }, {
                    begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/
                }, {
                    begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/
                }, {
                    begin: /\B\?\\(c|C-)[\x20-\x7e]/
                }, {
                    begin: /\B\?\\?\S/
                }, {
                    begin: t.concat(/<<[-~]?'?/, t.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)),
                    contains: [e.END_SAME_AS_BEGIN({
                        begin: /(\w+)/,
                        end: /(\w+)/,
                        contains: [e.BACKSLASH_ESCAPE, l]
                    })]
                }]
            }
                , d = {
                className: "number",
                relevance: 0,
                variants: [{
                    begin: "\\b([1-9](_?[0-9])*|0)(\\.([0-9](_?[0-9])*))?([eE][+-]?([0-9](_?[0-9])*)|r)?i?\\b"
                }, {
                    begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
                }, {
                    begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b"
                }, {
                    begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b"
                }, {
                    begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
                }, {
                    begin: "\\b0(_?[0-7])+r?i?\\b"
                }]
            }
                , g = {
                variants: [{
                    match: /\(\)/
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /(?=\))/,
                    excludeBegin: !0,
                    endsParent: !0,
                    keywords: r
                }]
            }
                , f = [u, {
                variants: [{
                    match: [/class\s+/, i, /\s+<\s+/, i]
                }, {
                    match: [/class\s+/, i]
                }],
                scope: {
                    2: "title.class",
                    4: "title.class.inherited"
                },
                keywords: r
            }, {
                relevance: 0,
                match: [i, /\.new[ (]/],
                scope: {
                    1: "title.class"
                }
            }, {
                relevance: 0,
                match: /\b[A-Z][A-Z_0-9]+\b/,
                className: "variable.constant"
            }, {
                match: [/def/, /\s+/, n],
                scope: {
                    1: "keyword",
                    3: "title.function"
                },
                contains: [g]
            }, {
                begin: e.IDENT_RE + "::"
            }, {
                className: "symbol",
                begin: e.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
                relevance: 0
            }, {
                className: "symbol",
                begin: ":(?!\\s)",
                contains: [u, {
                    begin: n
                }],
                relevance: 0
            }, d, {
                className: "variable",
                begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
            }, {
                className: "params",
                begin: /\|/,
                end: /\|/,
                excludeBegin: !0,
                excludeEnd: !0,
                relevance: 0,
                keywords: r
            }, {
                begin: "(" + e.RE_STARTERS_RE + "|unless)\\s*",
                keywords: "unless",
                contains: [{
                    className: "regexp",
                    contains: [e.BACKSLASH_ESCAPE, l],
                    illegal: /\n/,
                    variants: [{
                        begin: "/",
                        end: "/[a-z]*"
                    }, {
                        begin: /%r\{/,
                        end: /\}[a-z]*/
                    }, {
                        begin: "%r\\(",
                        end: "\\)[a-z]*"
                    }, {
                        begin: "%r!",
                        end: "![a-z]*"
                    }, {
                        begin: "%r\\[",
                        end: "\\][a-z]*"
                    }]
                }].concat(s, c),
                relevance: 0
            }].concat(s, c);
            l.contains = f,
                g.contains = f;
            const b = [{
                begin: /^\s*=>/,
                starts: {
                    end: "$",
                    contains: f
                }
            }, {
                className: "meta.prompt",
                begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]|(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>)(?=[ ])",
                starts: {
                    end: "$",
                    keywords: r,
                    contains: f
                }
            }];
            return c.unshift(s),
                {
                    name: "Ruby",
                    aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
                    keywords: r,
                    illegal: /\/\*/,
                    contains: [e.SHEBANG({
                        binary: "ruby"
                    })].concat(b).concat(c).concat(f)
                }
        }
    }
    , function(e, t) {
        e.exports = function(e) {
            const t = e.regex
                , n = /[\p{XID_Start}_]\p{XID_Continue}*/u
                , a = ["and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal|10", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"]
                , i = {
                $pattern: /[A-Za-z]\w+|__\w+__/,
                keyword: a,
                built_in: ["__import__", "abs", "all", "any", "ascii", "bin", "bool", "breakpoint", "bytearray", "bytes", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip"],
                literal: ["__debug__", "Ellipsis", "False", "None", "NotImplemented", "True"],
                type: ["Any", "Callable", "Coroutine", "Dict", "List", "Literal", "Generic", "Optional", "Sequence", "Set", "Tuple", "Type", "Union"]
            }
                , r = {
                className: "meta",
                begin: /^(>>>|\.\.\.) /
            }
                , o = {
                className: "subst",
                begin: /\{/,
                end: /\}/,
                keywords: i,
                illegal: /#/
            }
                , s = {
                begin: /\{\{/,
                relevance: 0
            }
                , c = {
                className: "string",
                contains: [e.BACKSLASH_ESCAPE],
                variants: [{
                    begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
                    end: /'''/,
                    contains: [e.BACKSLASH_ESCAPE, r],
                    relevance: 10
                }, {
                    begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
                    end: /"""/,
                    contains: [e.BACKSLASH_ESCAPE, r],
                    relevance: 10
                }, {
                    begin: /([fF][rR]|[rR][fF]|[fF])'''/,
                    end: /'''/,
                    contains: [e.BACKSLASH_ESCAPE, r, s, o]
                }, {
                    begin: /([fF][rR]|[rR][fF]|[fF])"""/,
                    end: /"""/,
                    contains: [e.BACKSLASH_ESCAPE, r, s, o]
                }, {
                    begin: /([uU]|[rR])'/,
                    end: /'/,
                    relevance: 10
                }, {
                    begin: /([uU]|[rR])"/,
                    end: /"/,
                    relevance: 10
                }, {
                    begin: /([bB]|[bB][rR]|[rR][bB])'/,
                    end: /'/
                }, {
                    begin: /([bB]|[bB][rR]|[rR][bB])"/,
                    end: /"/
                }, {
                    begin: /([fF][rR]|[rR][fF]|[fF])'/,
                    end: /'/,
                    contains: [e.BACKSLASH_ESCAPE, s, o]
                }, {
                    begin: /([fF][rR]|[rR][fF]|[fF])"/,
                    end: /"/,
                    contains: [e.BACKSLASH_ESCAPE, s, o]
                }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
            }
                , l = "[0-9](_?[0-9])*"
                , u = `(\\b(${l}))?\\.(${l})|\\b(${l})\\.`
                , d = "\\b|" + a.join("|")
                , g = {
                className: "number",
                relevance: 0,
                variants: [{
                    begin: `(\\b(${l})|(${u}))[eE][+-]?(${l})[jJ]?(?=${d})`
                }, {
                    begin: `(${u})[jJ]?`
                }, {
                    begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${d})`
                }, {
                    begin: `\\b0[bB](_?[01])+[lL]?(?=${d})`
                }, {
                    begin: `\\b0[oO](_?[0-7])+[lL]?(?=${d})`
                }, {
                    begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${d})`
                }, {
                    begin: `\\b(${l})[jJ](?=${d})`
                }]
            }
                , f = {
                className: "comment",
                begin: t.lookahead(/# type:/),
                end: /$/,
                keywords: i,
                contains: [{
                    begin: /# type:/
                }, {
                    begin: /#/,
                    end: /\b\B/,
                    endsWithParent: !0
                }]
            }
                , b = {
                className: "params",
                variants: [{
                    className: "",
                    begin: /\(\s*\)/,
                    skip: !0
                }, {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: i,
                    contains: ["self", r, g, c, e.HASH_COMMENT_MODE]
                }]
            };
            return o.contains = [c, g, r],
                {
                    name: "Python",
                    aliases: ["py", "gyp", "ipython"],
                    unicodeRegex: !0,
                    keywords: i,
                    illegal: /(<\/|->|\?)|=>/,
                    contains: [r, g, {
                        begin: /\bself\b/
                    }, {
                        beginKeywords: "if",
                        relevance: 0
                    }, c, f, e.HASH_COMMENT_MODE, {
                        match: [/\bdef/, /\s+/, n],
                        scope: {
                            1: "keyword",
                            3: "title.function"
                        },
                        contains: [b]
                    }, {
                        variants: [{
                            match: [/\bclass/, /\s+/, n, /\s*/, /\(\s*/, n, /\s*\)/]
                        }, {
                            match: [/\bclass/, /\s+/, n]
                        }],
                        scope: {
                            1: "keyword",
                            3: "title.class",
                            6: "title.class.inherited"
                        }
                    }, {
                        className: "meta",
                        begin: /^[\t ]*@/,
                        end: /(?=#)|$/,
                        contains: [g, b, c]
                    }]
                }
        }
    }
    , function(e, t) {
        e.exports = function(e) {
            const t = {
                begin: /<\/?[A-Za-z_]/,
                end: ">",
                subLanguage: "xml",
                relevance: 0
            }
                , n = {
                variants: [{
                    begin: /\[.+?\]\[.*?\]/,
                    relevance: 0
                }, {
                    begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
                    relevance: 2
                }, {
                    begin: e.regex.concat(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
                    relevance: 2
                }, {
                    begin: /\[.+?\]\([./?&#].*?\)/,
                    relevance: 1
                }, {
                    begin: /\[.*?\]\(.*?\)/,
                    relevance: 0
                }],
                returnBegin: !0,
                contains: [{
                    match: /\[(?=\])/
                }, {
                    className: "string",
                    relevance: 0,
                    begin: "\\[",
                    end: "\\]",
                    excludeBegin: !0,
                    returnEnd: !0
                }, {
                    className: "link",
                    relevance: 0,
                    begin: "\\]\\(",
                    end: "\\)",
                    excludeBegin: !0,
                    excludeEnd: !0
                }, {
                    className: "symbol",
                    relevance: 0,
                    begin: "\\]\\[",
                    end: "\\]",
                    excludeBegin: !0,
                    excludeEnd: !0
                }]
            }
                , a = {
                className: "strong",
                contains: [],
                variants: [{
                    begin: /_{2}/,
                    end: /_{2}/
                }, {
                    begin: /\*{2}/,
                    end: /\*{2}/
                }]
            }
                , i = {
                className: "emphasis",
                contains: [],
                variants: [{
                    begin: /\*(?!\*)/,
                    end: /\*/
                }, {
                    begin: /_(?!_)/,
                    end: /_/,
                    relevance: 0
                }]
            }
                , r = e.inherit(a, {
                contains: []
            })
                , o = e.inherit(i, {
                contains: []
            });
            a.contains.push(o),
                i.contains.push(r);
            let s = [t, n];
            return [a, i, r, o].forEach(e => {
                    e.contains = e.contains.concat(s)
                }
            ),
                s = s.concat(a, i),
                {
                    name: "Markdown",
                    aliases: ["md", "mkdown", "mkd"],
                    contains: [{
                        className: "section",
                        variants: [{
                            begin: "^#{1,6}",
                            end: "$",
                            contains: s
                        }, {
                            begin: "(?=^.+?\\n[=-]{2,}$)",
                            contains: [{
                                begin: "^[=-]*$"
                            }, {
                                begin: "^",
                                end: "\\n",
                                contains: s
                            }]
                        }]
                    }, t, {
                        className: "bullet",
                        begin: "^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)",
                        end: "\\s+",
                        excludeEnd: !0
                    }, a, i, {
                        className: "quote",
                        begin: "^>\\s+",
                        contains: s,
                        end: "$"
                    }, {
                        className: "code",
                        variants: [{
                            begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*"
                        }, {
                            begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*"
                        }, {
                            begin: "```",
                            end: "```+[ ]*$"
                        }, {
                            begin: "~~~",
                            end: "~~~+[ ]*$"
                        }, {
                            begin: "`.+?`"
                        }, {
                            begin: "(?=^( {4}|\\t))",
                            contains: [{
                                begin: "^( {4}|\\t)",
                                end: "(\\n)$"
                            }],
                            relevance: 0
                        }]
                    }, {
                        begin: "^[-\\*]{3,}",
                        end: "$"
                    }, n, {
                        begin: /^\[[^\n]+\]:/,
                        returnBegin: !0,
                        contains: [{
                            className: "symbol",
                            begin: /\[/,
                            end: /\]/,
                            excludeBegin: !0,
                            excludeEnd: !0
                        }, {
                            className: "link",
                            begin: /:\s*/,
                            end: /$/,
                            excludeBegin: !0
                        }]
                    }]
                }
        }
    }
    , function(e, t, n) {
        n(11),
            e.exports = n(13)
    }
    , function(e, t, n) {
        "use strict";
        n.r(t);
        var a = n(0)
            , i = n.n(a)
            , r = n(1)
            , o = n.n(r)
            , s = n(2)
            , c = n.n(s)
            , l = n(3)
            , u = n.n(l)
            , d = n(4)
            , g = n.n(d)
            , f = n(7)
            , b = n.n(f)
            , p = n(8)
            , h = n.n(p)
            , m = n(6)
            , y = n.n(m)
            , v = n(5)
            , w = n.n(v)
            , E = n(9)
            , _ = n.n(E);
        n(12);
        i.a.registerLanguage("javascript", u.a),
            i.a.registerLanguage("bash", g.a),
            i.a.registerLanguage("c", w.a),
            i.a.registerLanguage("html", y.a),
            i.a.registerLanguage("ruby", b.a),
            i.a.registerLanguage("python", h.a),
            i.a.registerLanguage("markdown", _.a);
        var x = !0;
        window.isSearchLoading = !1;
        var S, A, N, k, O, T, M, C, R, L, B = !0, I = "exploits", $ = "default", j = "", H = "";
        const z = {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
            , D = {}
            , P = c.a;
        let q, U, Z, F;
        function K(e, t) {
            let n = document.createElement(e);
            return Object.keys(t).forEach(e => {
                    n[e] = t[e]
                }
            ),
                n
        }
        function G(e, t={}) {
            let {method: n="GET", body: a=null} = t;
            return fetch(e, {
                method: n,
                body: a,
                headers: z
            }).then(e => e.json())
        }
        function W() {
            window.isSearchLoading = !0,
                Q(!0),
                history.pushState("", "", "/?query=" + M.value + "#" + I),
                V(!1),
            R == M.value && L == document.querySelector("#is-title").checked && H == I && j == $ || (C = 0,
                Z.innerText = "",
                x = !0),
                L = document.querySelector("#is-title").checked,
                R = M.value,
                H = I,
                j = $;
            let e = {
                type: I,
                sort: $,
                query: R,
                title: document.querySelector("#is-title").checked,
                offset: C
            };
            const t = function(e, t, n=this) {
                let a = null
                    , i = null;
                const r = () => e.apply(n, i);
                return function() {
                    i = arguments,
                        clearTimeout(a),
                        a = setTimeout(r, t)
                }
            }(e => {
                    window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight && x && W()
                }
                , 500);
            return B && (window.addEventListener("scroll", t, !1),
                B = !1),
                C += 10,
                G("/search", {
                    method: "POST",
                    body: JSON.stringify(e)
                }).then(e => {
                        !function(e=[], t, n) {
                            let a;
                            q.classList.add("search_top"),
                                O.classList.add("top");
                            let i = document.createDocumentFragment();
                            "tools" == n ? (e.forEach(e => {
                                    a = e.id.replace(/[^\w\s-]/g, "").replace(/[-\s]+/g, "-"),
                                        D[a] = {
                                            title: e.title,
                                            toolhref: e.download,
                                            vulnid: "" + e.id,
                                            href: e.href
                                        },
                                        i.appendChild(function({id: e, href: t, title: n, type: a, download: i}) {
                                            let r, o;
                                            return e = e.replace(/[^\w\s-]/g, "").replace(/[-\s]+/g, "-"),
                                                r = `\n    <label id="label-${e}" for="accordion-${e}" class="tile tile-centered">\n        <div class="tile-icon">\n            <div class="avatar logo logo_${a}"></div>\n        </div>\n        <div class="tile-content">\n            <div class="accordion-header text-bold"></div>\n            <div class="btn-group btn-group-block exploit-actions">\n            <div class="tile-subtitle">\n            <button class="btn btn-link" data-id="${e}" data-action="toolhref">\n                 ${i}\n            </button>\n            </div>\n\n            </div>\n        </div>\n    </label>`,
                                                o = K("div", {
                                                    className: "panel",
                                                    innerHTML: r
                                                }),
                                                o.querySelector(".accordion-header").innerText = n,
                                                o
                                        }(e))
                                }
                            ),
                                N.setAttribute("data-badge", t),
                                N.setAttribute("class", "badge active"),
                                A.removeAttribute("class", "badge active")) : (e.forEach(e => {
                                    a = e.id.replace(/[^\w\s-]/g, "").replace(/[-\s]+/g, "-"),
                                        D[a] = {
                                            title: e.title,
                                            source: e.source,
                                            vulnid: "" + e.id,
                                            href: e.href
                                        },
                                        i.appendChild(function({id: e, score: t, published: n, type: a, title: i, source: r, language: s}) {
                                            let c, l, u;
                                            l = t < 0 ? "none" : t < 4 ? "low" : t > 7 ? "high" : "medium";
                                            e = e.replace(/[^\w\s-]/g, "").replace(/[-\s]+/g, "-"),
                                            t < 10 && (t = t.toFixed(1));
                                            return c = `<div class="accordion">\n    <input type="checkbox" id="accordion-${e}" name="accordion-checkbox" hidden>\n    <label id="label-${e}" for="accordion-${e}" class="tile tile-centered">\n        <div class="tile-icon badge ${l}" data-badge="${t}">\n            <div class="avatar logo logo_${a}"></div>\n        </div>\n        <div class="tile-content">\n            <div class="accordion-header text-large text-bold"></div>\n            <div class="tile-subtitle text-gray">${n}</div>\n        </div>\n    </label>\n    <div class="accordion-body">\n        <div class="col-12 centered">\n            <div class="btn-group btn-group-block exploit-actions">\n                <button class="btn tooltip tooltip-bottom" id="copy-${e}" data-clipboard-target="#code-${e}" data-tooltip="Bottom Tooltip Text">Copy</button>\n                <button class="btn" data-id="${e}" data-action="download">Download</button>\n                <button class="btn" data-id="${e}" data-action="goto">Open</button>\n                <button class="btn" data-id="${e}" data-action="origin">Source</button>\n                <a class="btn" data-id="${e}" data-action="share" href="#share-url">Share</a>\n            </div>\n            <pre class="centered code" data-lang="${s.toUpperCase()}">\n                    <code id="code-${e}" class="code-block ${s}">\n                    </code>\n            </pre>\n        </div>\n    </div>\n</div>`,
                                                u = K("div", {
                                                    className: "panel",
                                                    innerHTML: c
                                                }),
                                                u.querySelector(".accordion-header").innerText = i,
                                                u.querySelector("#code-" + e).textContent = r,
                                                new o.a(`#copy-${e}`).on("success", (function(e) {
                                                        e.clearSelection()
                                                    }
                                                )),
                                                u
                                        }(e))
                                }
                            ),
                                A.setAttribute("data-badge", t),
                                A.setAttribute("class", "badge active"),
                                N.removeAttribute("class", "badge active"));
                            Z.appendChild(i),
                                X(),
                            e.length < 10 && (x = !1);
                            T.remove(),
                                Q(!1),
                                J(!0),
                                V(!0),
                                window.isSearchLoading = !1
                        }(e.exploits, e.exploits_total, I)
                    }
                )
        }
        function X() {
            [...Z.querySelectorAll(".code-block")].forEach(e => {
                    i.a.highlightBlock(e)
                }
            )
        }
        function Q(e) {
            F && (F.style.visibility = e ? "visible" : "hidden")
        }
        function J(e) {
            S && (S.style.visibility = e ? "visible" : "hidden")
        }
        function V(e) {
            k && k[e ? "removeAttribute" : "setAttribute"]("disabled", "")
        }
        document.addEventListener("DOMContentLoaded", (function() {
                var e;
                q = document.querySelector("#search-box"),
                    U = document.querySelector("#search-form"),
                    Z = document.querySelector("#search-results"),
                    F = document.querySelector("#loader"),
                    S = document.querySelector("#tabs"),
                    A = document.querySelector("#exploit-tab"),
                    N = document.querySelector("#tools-tab"),
                    k = document.querySelector("#formfield"),
                    O = document.querySelector(".wrap"),
                    T = document.querySelector(".toptable"),
                    M = document.querySelector("#query"),
                    C = 0,
                    R = "",
                    L = !1,
                    J(!1),
                    function() {
                        Z.addEventListener("click", e => {
                                let t = e.target.getAttribute("data-id")
                                    , n = e.target.getAttribute("data-action");
                                if (t && n)
                                    switch (n) {
                                        case "download":
                                            !function(e) {
                                                let {vulnid: t, source: n} = D[e]
                                                    , a = K("a", {
                                                    download: t + ".txt",
                                                    href: URL.createObjectURL(new Blob([n],{
                                                        type: "octet/stream"
                                                    })),
                                                    style: {
                                                        display: "none"
                                                    }
                                                });
                                                document.body.appendChild(a),
                                                    a.click(),
                                                    document.body.removeChild(a),
                                                    setTimeout( () => URL.revokeObjectURL(a.href), 1500)
                                            }(t);
                                            break;
                                        case "goto":
                                            window.open("/exploit?id=" + D[t].vulnid, "_blank");
                                            break;
                                        case "share":
                                            !function(e) {
                                                let t = location.origin + "/exploit?id=" + D[e].vulnid;
                                                document.querySelector(".copylink").setAttribute("value", t);
                                                let n = encodeURIComponent(D[e].title);
                                                t = encodeURIComponent(t),
                                                    document.querySelector(".facebook").setAttribute("href", "https://facebook.com/sharer/sharer.php?u=" + t),
                                                    document.querySelector(".twitter").setAttribute("href", "https://twitter.com/intent/tweet/?text=" + n + "&url=" + t + "&via=sploitus_com"),
                                                    document.querySelector(".googleplus").setAttribute("href", "https://plus.google.com/share?url=" + t),
                                                    document.querySelector(".linkedin").setAttribute("href", "https://www.linkedin.com/shareArticle?mini=true&url=" + t + "&title=" + n),
                                                    document.querySelector(".reddit").setAttribute("href", "https://reddit.com/submit/?url=" + t),
                                                    document.querySelector(".ycombinator").setAttribute("href", "https://news.ycombinator.com/submitlink?u=" + t + "&t=" + n),
                                                    document.querySelector(".vk").setAttribute("href", "https://vk.com/share.php?title=" + n + "&url=" + t),
                                                    document.querySelector(".telegram").setAttribute("href", "https://telegram.me/share/url?text=" + n + "&url=" + t),
                                                    new o.a(".copybutton").on("success", (function(e) {
                                                            e.clearSelection()
                                                        }
                                                    ))
                                            }(t);
                                            break;
                                        case "origin":
                                            window.open(D[t].href, "_blank");
                                            break;
                                        case "toolhref":
                                            window.open(D[t].toolhref, "_blank")
                                    }
                            }
                        ),
                        S && S.addEventListener("click", e => {
                                let t = e.target.getAttribute("data-id")
                                    , n = e.target.getAttribute("data-action");
                                if (t && n && (t != I || t != $))
                                    switch (n) {
                                        case "change":
                                            I = t,
                                                W();
                                            break;
                                        case "sort":
                                            (function(e) {
                                                    S.querySelectorAll("#sort").forEach((function(t) {
                                                            t.getAttribute("data-id") == e ? t.setAttribute("class", "label label-primary") : (t.removeAttribute("class", "label-primary"),
                                                                t.setAttribute("class", "label"))
                                                        }
                                                    ))
                                                }
                                            )($ = t),
                                                W()
                                    }
                            }
                        );
                        Z.addEventListener("transitionend", e => {
                                "max-height" === e.propertyName && "accordion-body" === e.target.className && e.target.parentNode.querySelector("label").scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                })
                            }
                        ),
                        U && U.addEventListener("submit", e => (e.preventDefault(),
                            W()))
                    }(),
                    new P({
                        selector: 'input[name="query"]',
                        minChars: 1,
                        delay: 100,
                        source: (e="", t) => {
                            G("/autocomplete?query=" + e).then(e => {
                                    if (!window.isSearchLoading)
                                        return t(e)
                                }
                            )
                        }
                    }),
                    (e = function(e, t) {
                        t || (t = window.location.href),
                            e = e.replace(/[\[\]]/g, "\\$&");
                        var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
                        return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
                    }("query")) ? (M.value = e,
                        I = "tools" == location.hash.substring(1) ? "tools" : "exploits",
                        W()) : function() {
                        if (T) {
                            var e = document.createDocumentFragment();
                            G("/top").then(t => {
                                    t.top.forEach( (t, n) => {
                                            let a = K("li", {
                                                innerHTML: `<a href="/exploit?id=${t.id}">${t.title}</a>`
                                            });
                                            e.appendChild(a)
                                        }
                                    ),
                                        Q(!1),
                                        T.innerHTML = '<h4 class="text-center">Exploits of the week</h4>',
                                        T.appendChild(e)
                                }
                            )
                        }
                    }(),
                    function() {
                        T || exploits.forEach(e => {
                                let t = e.id.replace(/[^\w\s-]/g, "").replace(/[-\s]+/g, "-");
                                new o.a("#copy-" + t).on("success", (function(e) {
                                        console.info("Action:", e.action),
                                            console.info("Text:", e.text),
                                            console.info("Trigger:", e.trigger),
                                            e.clearSelection()
                                    }
                                )),
                                    D[t] = {
                                        source: e.source,
                                        vulnid: "" + e.id,
                                        href: e.href,
                                        title: e.title
                                    }
                            }
                        );
                        X()
                    }()
            }
        ))
    }
    , function(e, t) {
        const n = "dark"
            , a = "light"
            , i = e => {
                localStorage.setItem("SP_THEME", e),
                    document.querySelector("body").className = "theme-" + e,
                    document.getElementById("theme-toggle").checked = e === n
            }
        ;
        i(localStorage.getItem("SP_THEME") || a),
            document.getElementById("theme-toggle").addEventListener("click", e => {
                    e.target.checked ? i(n) : i(a)
                }
            )
    }
    , function(e, t, n) {}
]);
