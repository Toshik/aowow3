if (typeof $WH == "undefined") {
	var $WH = window
}
$WH.$E = function (a) {
	if (!a) {
		if (typeof event != "undefined") {
			a = event
		} else {
			return null
		}
	}
	if (a.which) {
		a._button = a.which
	} else {
		a._button = a.button;
		if ($WH.Browser.ie678 && a._button) {
			if (a._button & 4) {
				a._button = 2
			} else {
				if (a._button & 2) {
					a._button = 3
				}
			}
		} else {
			a._button = a.button + 1
		}
	}
	a._target = a.target ? a.target : a.srcElement;
	a._wheelDelta = a.wheelDelta ? a.wheelDelta : -a.detail;
	return a
};
$WH.$A = function (c) {
	var e = [];
	for (var d = 0, b = c.length; d < b; ++d) {
		e.push(c[d])
	}
	return e
};
if (!Function.prototype.bind) {
	Function.prototype.bind = function () {
		var c = this,
			a = $WH.$A(arguments),
			b = a.shift();
		return function () {
			return c.apply(b, a.concat($WH.$A(arguments)))
		}
	}
}
$WH.bindfunc = function () {
	args = $WH.$A(arguments);
	var b = args.shift();
	var a = args.shift();
	return function () {
		return b.apply(a, args.concat($WH.$A(arguments)))
	}
};
if (!String.prototype.ltrim) {
	String.prototype.ltrim = function () {
		return this.replace(/^\s*/, "")
	}
}
if (!String.prototype.rtrim) {
	String.prototype.rtrim = function () {
		return this.replace(/\s*$/, "")
	}
}
if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.ltrim().rtrim()
	}
}
if (!String.prototype.removeAllWhitespace) {
	String.prototype.removeAllWhitespace = function () {
		return this.replace("/s+/g", "")
	}
}
$WH.strcmp = function (d, c) {
	if (d == c) {
		return 0
	}
	if (d == null) {
		return -1
	}
	if (c == null) {
		return 1
	}
	var f = parseFloat(d);
	var e = parseFloat(c);
	if (!isNaN(f) && !isNaN(e) && f != e) {
		return f < e ? -1 : 1
	}
	if (typeof d == "string" && typeof c == "string") {
		return d.localeCompare(c)
	}
	return d < c ? -1 : 1
};
$WH.trim = function (a) {
	return a.replace(/(^\s*|\s*$)/g, "")
};
$WH.rtrim = function (c, d) {
	var b = c.length;
	while (--b > 0 && c.charAt(b) == d) {}
	c = c.substring(0, b + 1);
	if (c == d) {
		c = ""
	}
	return c
};
$WH.sprintf = function (b) {
	var a;
	for (a = 1, len = arguments.length; a < len; ++a) {
		b = b.replace("$" + a, arguments[a])
	}
	return b
};
$WH.sprintfa = function (b) {
	var a;
	for (a = 1, len = arguments.length; a < len; ++a) {
		b = b.replace(new RegExp("\\$" + a, "g"), arguments[a])
	}
	return b
};
$WH.sprintfo = function (c) {
	if (typeof c == "object" && c.length) {
		var a = c;
		c = a[0];
		var b;
		for (b = 1; b < a.length; ++b) {
			c = c.replace("$" + b, a[b])
		}
		return c
	}
};
$WH.str_replace = function (e, d, c) {
	while (e.indexOf(d) != -1) {
		e = e.replace(d, c)
	}
	return e
};
$WH.urlencode = function (a) {
	a = encodeURIComponent(a);
	a = str_replace(a, "+", "%2B");
	return a
};
$WH.urlencode2 = function (a) {
	a = encodeURIComponent(a);
	a = str_replace(a, "%20", "+");
	a = str_replace(a, "%3D", "=");
	return a
};
$WH.number_format = function (a) {
	x = ("" + parseFloat(a)).split(".");
	a = x[0];
	x = x.length > 1 ? "." + x[1] : "";
	if (a.length <= 3) {
		return a + x
	}
	return $WH.number_format(a.substr(0, a.length - 3)) + "," + a.substr(a.length - 3) + x
};
$WH.is_array = function (b) {
	return !! (b && b.constructor == Array)
};
$WH.in_array = function (c, g, h, e) {
	if (c == null) {
		return -1
	}
	if (h) {
		return $WH.in_arrayf(c, g, h, e)
	}
	for (var d = e || 0, b = c.length; d < b; ++d) {
		if (c[d] == g) {
			return d
		}
	}
	return -1
};
$WH.in_arrayf = function (c, g, h, e) {
	for (var d = e || 0, b = c.length; d < b; ++d) {
		if (h(c[d]) == g) {
			return d
		}
	}
	return -1
};
$WH.rs = function () {
	var e = $WH.rs.random;
	var b = "";
	for (var a = 0; a < 16; a++) {
		var d = Math.floor(Math.random() * e.length);
		if (a == 0 && d < 11) {
			d += 10
		}
		b += e.substring(d, d + 1)
	}
	return b
};
$WH.rs.random = "0123456789abcdefghiklmnopqrstuvwxyz";
$WH.isset = function (a) {
	return typeof window[a] != "undefined"
};
if (!$WH.isset("console")) {
	console = {
		log: function () {}
	}
}
$WH.array_walk = function (d, h, c) {
	var g;
	for (var e = 0, b = d.length; e < b; ++e) {
		g = h(d[e], c, d, e);
		if (g != null) {
			d[e] = g
		}
	}
};
$WH.array_apply = function (d, h, c) {
	var g;
	for (var e = 0, b = d.length; e < b; ++e) {
		h(d[e], c, d, e)
	}
};
$WH.array_filter = function (c, g) {
	var e = [];
	for (var d = 0, b = c.length; d < b; ++d) {
		if (g(c[d])) {
			e.push(c[d])
		}
	}
	return e
};
$WH.array_index = function (c, e, g, h) {
	if (!is_array(c)) {
		return false
	}
	if (!c.__R || h) {
		c.__R = {};
		if (!g) {
			g = function (a) {
				return a
			}
		}
		for (var d = 0, b = c.length; d < b; ++d) {
			c.__R[g(c[d])] = d
		}
	}
	return (e == null ? c.__R : !isNaN(c.__R[e]))
};
$WH.array_compare = function (d, c) {
	if (d.length != c.length) {
		return false
	}
	var g = {};
	for (var f = d.length; f >= 0; --f) {
		g[d[f]] = true
	}
	var e = true;
	for (var f = c.length; f >= 0; --f) {
		if (g[c[f]] === undefined) {
			e = false
		}
	}
	return e
};
$WH.array_unique = function (b) {
	var c = [];
	var e = {};
	for (var d = b.length - 1; d >= 0; --d) {
		e[b[d]] = 1
	}
	for (var d in e) {
		c.push(d)
	}
	return c
};
$WH.ge = function (a) {
	if (typeof a != "string") {
		return a
	}
	return document.getElementById(a)
};
$WH.gE = function (a, b) {
	return a.getElementsByTagName(b)
};
$WH.ce = function (d, b, e) {
	var a = document.createElement(d);
	if (b) {
		$WH.cOr(a, b)
	}
	if (e) {
		$WH.ae(a, e)
	}
	return a
};
$WH.de = function (a) {
	if (!a || !a.parentNode) {
		return
	}
	a.parentNode.removeChild(a)
};
$WH.ae = function (a, b) {
	if ($WH.is_array(b)) {
		$WH.array_apply(b, a.appendChild.bind(a));
		return b
	} else {
		return a.appendChild(b)
	}
};
$WH.aef = function (a, b) {
	return a.insertBefore(b, a.firstChild)
};
$WH.ee = function (a, b) {
	if (!b) {
		b = 0
	}
	while (a.childNodes[b]) {
		a.removeChild(a.childNodes[b])
	}
};
$WH.ct = function (a) {
	return document.createTextNode(a)
};
$WH.st = function (a, b) {
	if (a.firstChild && a.firstChild.nodeType == 3) {
		a.firstChild.nodeValue = b
	} else {
		$WH.aef(a, ct(b))
	}
};
$WH.nw = function (a) {
	a.style.whiteSpace = "nowrap"
};
$WH.rf = function () {
	return false
};
$WH.rf2 = function (a) {
	a = $WH.$E(a);
	if (a.ctrlKey || a.shiftKey || a.altKey || a.metaKey) {
		return
	}
	return false
};
$WH.tb = function () {
	this.blur()
};
$WH.aE = function (b, c, a) {
	if ($WH.Browser.ie678) {
		b.attachEvent("on" + c, a)
	} else {
		b.addEventListener(c, a, false)
	}
};
$WH.dE = function (b, c, a) {
	if ($WH.Browser.ie678) {
		b.detachEvent("on" + c, a)
	} else {
		b.removeEventListener(c, a, false)
	}
};
$WH.sp = function (a) {
	if (!a) {
		a = event
	}
	if ($WH.Browser.ie678) {
		a.cancelBubble = true
	} else {
		a.stopPropagation()
	}
};
$WH.sc = function (h, i, d, f, g) {
	var e = new Date();
	var c = h + "=" + escape(d) + "; ";
	e.setDate(e.getDate() + i);
	c += "expires=" + e.toUTCString() + "; ";
	if (f) {
		c += "path=" + f + "; "
	}
	if (g) {
		c += "domain=" + g + "; "
	}
	document.cookie = c;
	$WH.gc(h);
	$WH.gc.C[h] = d
};
$WH.dc = function (a) {
	$WH.sc(a, -1);
	$WH.gc.C[a] = null
};
$WH.gc = function (f) {
	if ($WH.gc.I == null) {
		var e = unescape(document.cookie).split("; ");
		$WH.gc.C = {};
		for (var c = 0, a = e.length; c < a; ++c) {
			var g = e[c].indexOf("="),
				b, d;
			if (g != -1) {
				b = e[c].substr(0, g);
				d = e[c].substr(g + 1)
			} else {
				b = e[c];
				d = ""
			}
			$WH.gc.C[b] = d
		}
		$WH.gc.I = 1
	}
	if (!f) {
		return $WH.gc.C
	} else {
		return $WH.gc.C[f]
	}
};
$WH.ns = function (a) {
	if ($WH.Browser.ie678) {
		a.onfocus = tb;
		a.onmousedown = a.onselectstart = a.ondragstart = $WH.rf
	}
};
$WH.eO = function (b) {
	for (var a in b) {
		delete b[a]
	}
};
$WH.dO = function (a) {
	function b() {}
	b.prototype = a;
	return new b
};
$WH.cO = function (c, a) {
	for (var b in a) {
		if (a[b] !== null && typeof a[b] == "object" && a[b].length) {
			c[b] = a[b].slice(0)
		} else {
			c[b] = a[b]
		}
	}
	return c
};
$WH.cOr = function (c, a) {
	for (var b in a) {
		if (typeof a[b] == "object") {
			if (a[b].length) {
				c[b] = a[b].slice(0)
			} else {
				if (!c[b]) {
					c[b] = {}
				}
				$WH.cOr(c[b], a[b])
			}
		} else {
			c[b] = a[b]
		}
	}
	return c
};
$WH.Browser = {
	ie: !!(window.attachEvent && !window.opera),
	opera: !!window.opera,
	safari: navigator.userAgent.indexOf("Safari") != -1,
	firefox: navigator.userAgent.indexOf("Firefox") != -1,
	chrome: navigator.userAgent.indexOf("Chrome") != -1
};
$WH.Browser.ie8 = $WH.Browser.ie && navigator.userAgent.indexOf("MSIE 8.0") != -1;
$WH.Browser.ie7 = $WH.Browser.ie && navigator.userAgent.indexOf("MSIE 7.0") != -1 && !$WH.Browser.ie8;
$WH.Browser.ie6 = $WH.Browser.ie && navigator.userAgent.indexOf("MSIE 6.0") != -1 && !$WH.Browser.ie7;
$WH.Browser.ie67 = $WH.Browser.ie6 || $WH.Browser.ie7;
$WH.Browser.ie678 = $WH.Browser.ie67 || $WH.Browser.ie8;
$WH.OS = {
	windows: navigator.appVersion.indexOf("Windows") != -1,
	mac: navigator.appVersion.indexOf("Macintosh") != -1,
	linux: navigator.appVersion.indexOf("Linux") != -1
};
$WH.g_getWindowSize = function () {
	var a = 0,
		b = 0;
	if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		a = document.documentElement.clientWidth;
		b = document.documentElement.clientHeight
	} else {
		if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
			a = document.body.clientWidth;
			b = document.body.clientHeight
		} else {
			if (typeof window.innerWidth == "number") {
				a = window.innerWidth;
				b = window.innerHeight
			}
		}
	}
	return {
		w: a,
		h: b
	}
};
$WH.g_getScroll = function () {
	var a = 0,
		b = 0;
	if (typeof(window.pageYOffset) == "number") {
		a = window.pageXOffset;
		b = window.pageYOffset
	} else {
		if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			a = document.body.scrollLeft;
			b = document.body.scrollTop
		} else {
			if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
				a = document.documentElement.scrollLeft;
				b = document.documentElement.scrollTop
			}
		}
	}
	return {
		x: a,
		y: b
	}
};
$WH.g_getCursorPos = function (c) {
	var a, d;
	if (window.innerHeight) {
		a = c.pageX;
		d = c.pageY
	} else {
		var b = $WH.g_getScroll();
		a = c.clientX + b.x;
		d = c.clientY + b.y
	}
	return {
		x: a,
		y: d
	}
};
$WH.ac = function (c, d) {
	var a = 0,
		g = 0,
		b;
	while (c) {
		a += c.offsetLeft;
		g += c.offsetTop;
		b = c.parentNode;
		while (b && b != c.offsetParent && b.offsetParent) {
			if (b.scrollLeft || b.scrollTop) {
				a -= (b.scrollLeft | 0);
				g -= (b.scrollTop | 0);
				break
			}
			b = b.parentNode
		}
		c = c.offsetParent
	}
	if ($WH.isset("Lightbox") && Lightbox.isVisible()) {
		d = true
	}
	if (d) {
		var f = $WH.g_getScroll();
		a += f.x;
		g += f.y
	}
	var e = [a, g];
	e.x = a;
	e.y = g;
	return e
};
$WH.g_scrollTo = function (c, b) {
	var l, k = $WH.g_getWindowSize(),
		m = $WH.g_getScroll(),
		i = k.w,
		e = k.h,
		g = m.x,
		d = m.y;
	c = ge(c);
	if (b == null) {
		b = []
	} else {
		if (typeof b == "number") {
			b = [b]
		}
	}
	l = b.length;
	if (l == 0) {
		b[0] = b[1] = b[2] = b[3] = 0
	} else {
		if (l == 1) {
			b[1] = b[2] = b[3] = b[0]
		} else {
			if (l == 2) {
				b[2] = b[0];
				b[3] = b[1]
			} else {
				if (l == 3) {
					b[3] = b[1]
				}
			}
		}
	}
	l = $WH.ac(c);
	var a = l[0] - b[3],
		h = l[1] - b[0],
		j = l[0] + c.offsetWidth + b[1],
		f = l[1] + c.offsetHeight + b[2];
	if (j - a > i || a < g) {
		g = a
	} else {
		if (j - i > g) {
			g = j - i
		}
	}
	if (f - h > e || h < d) {
		d = h
	} else {
		if (f - e > d) {
			d = f - e
		}
	}
	scrollTo(g, d)
};
$WH.g_createReverseLookupJson = function (b) {
	var c = {};
	for (var a in b) {
		c[b[a]] = a
	}
	return c
};
$WH.g_getLocaleFromDomain = function (a) {
	var c = $WH.g_getLocaleFromDomain.L;
	if (a) {
		var b = a.indexOf(".");
		if (b != -1) {
			a = a.substring(0, b)
		}
	}
	return (c[a] ? c[a] : 0)
};
$WH.g_getLocaleFromDomain.L = {
	fr: 2,
	de: 3,
	es: 6,
	ru: 7,
	www: 0
};
$WH.g_getDomainFromLocale = function (a) {
	var b;
	if ($WH.g_getDomainFromLocale.L) {
		b = $WH.g_getDomainFromLocale.L
	} else {
		b = $WH.g_getDomainFromLocale.L = $WH.g_createReverseLookupJson($WH.g_getLocaleFromDomain.L)
	}
	return (b[a] ? b[a] : "www")
};
$WH.g_getIdFromTypeName = function (a) {
	var b = $WH.g_getIdFromTypeName.L;
	return (b[a] ? b[a] : -1)
};
$WH.g_getIdFromTypeName.L = {
	npc: 1,
	object: 2,
	item: 3,
	itemset: 4,
	quest: 5,
	spell: 6,
	zone: 7,
	faction: 8,
	pet: 9,
	achievement: 10,
	title: 11,
	statistic: 16,
	profile: 100
};
$WH.g_ajaxIshRequest = function (b) {
	var c = document.getElementsByTagName("head")[0],
		a = $WH.g_getGets();
	if (a.refresh != null) {
		b += "&refresh"
	}
	if (a.locale != null) {
		b += "&locale=" + a.locale
	}
	if (a.ptr != null) {
		b += "&ptr"
	}
	$WH.ae(c, $WH.ce("script", {
		type: "text/javascript",
		src: b,
		charset: "utf8"
	}))
};
$WH.g_getGets = function () {
	if ($WH.g_getGets.C != null) {
		return $WH.g_getGets.C
	}
	var b = $WH.g_getQueryString();
	var a = $WH.g_parseQueryString(b);
	$WH.g_getGets.C = a;
	return a
};
$WH.g_getQueryString = function () {
	var a = "";
	if (location.pathname) {
		a += location.pathname.substr(1)
	}
	if (location.search) {
		if (location.pathname) {
			a += "&"
		}
		a += location.search.substr(1)
	}
	return a
};
$WH.g_parseQueryString = function (e) {
	e = decodeURIComponent(e);
	var d = e.split("&");
	var c = {};
	for (var b = 0, a = d.length; b < a; ++b) {
		$WH.g_splitQueryParam(d[b], c)
	}
	return c
};
$WH.g_splitQueryParam = function (c, d) {
	var e = c.indexOf("=");
	var a;
	var b;
	if (e != -1) {
		a = c.substr(0, e);
		b = c.substr(e + 1)
	} else {
		a = c;
		b = ""
	}
	d[a] = b
};
$WH.g_createRect = function (d, c, a, b) {
	return {
		l: d,
		t: c,
		r: d + a,
		b: c + b
	}
};
$WH.g_intersectRect = function (d, c) {
	return ! (d.l >= c.r || c.l >= d.r || d.t >= c.b || c.t >= d.b)
};
$WH.g_convertRatingToPercent = function (g, b, f, d) {
	var e = $WH.g_convertRatingToPercent.RB;
	if (g < 0) {
		g = 1
	} else {
		if (g > 80) {
			g = 80
		}
	}
	if ((b == 12 || b == 13 || b == 14 || b == 15) && g < 34) {
		g = 34
	}
	if ((b == 28 || b == 36) && (d == 2 || d == 6 || d == 7 || d == 11)) {
		e[b] /= 1.3
	}
	if (f < 0) {
		f = 0
	}
	var a;
	if (e[b] == null) {
		a = 0
	} else {
		var c;
		if (g > 70) {
			c = (82 / 52) * Math.pow((131 / 63), ((g - 70) / 10))
		} else {
			if (g > 60) {
				c = (82 / (262 - 3 * g))
			} else {
				if (g > 10) {
					c = ((g - 8) / 52)
				} else {
					c = 2 / 52
				}
			}
		}
		a = f / e[b] / c
	}
	return a
};
$WH.g_convertRatingToPercent.RB = {
	12: 1.5,
	13: 13.8,
	14: 13.8,
	15: 5,
	16: 10,
	17: 10,
	18: 8,
	19: 14,
	20: 14,
	21: 14,
	22: 10,
	23: 10,
	24: 0,
	25: 0,
	26: 0,
	27: 0,
	28: 10,
	29: 10,
	30: 10,
	31: 10,
	32: 14,
	33: 0,
	34: 0,
	35: 28.75,
	36: 10,
	37: 2.5,
	44: 4.69512176513672 / 1.1
};
$WH.g_statToJson = {
	1: "health",
	2: "mana",
	3: "agi",
	4: "str",
	5: "int",
	6: "spi",
	7: "sta",
	12: "defrtng",
	13: "dodgertng",
	14: "parryrtng",
	15: "blockrtng",
	16: "mlehitrtng",
	17: "rgdhitrtng",
	18: "splhitrtng",
	19: "mlecritstrkrtng",
	20: "rgdcritstrkrtng",
	21: "splcritstrkrtng",
	22: "_mlehitrtng",
	23: "_rgdhitrtng",
	24: "_splhitrtng",
	25: "_mlecritstrkrtng",
	26: "_rgdcritstrkrtng",
	27: "_splcritstrkrtng",
	28: "mlehastertng",
	29: "rgdhastertng",
	30: "splhastertng",
	31: "hitrtng",
	32: "critstrkrtng",
	33: "_hitrtng",
	34: "_critstrkrtng",
	35: "resirtng",
	36: "hastertng",
	37: "exprtng",
	38: "atkpwr",
	43: "manargn",
	44: "armorpenrtng",
	45: "splpwr"
};
$WH.g_convertScalingFactor = function (c, b, g, d, j) {
	var f = $WH.g_convertScalingFactor.SV;
	var e = $WH.g_convertScalingFactor.SD;
	var i = {},
		h = f[c],
		a = e[g];
	if (!a || !(d >= 0 && d <= 9)) {
		i.v = h[b]
	} else {
		i.n = $WH.g_statToJson[a[d]];
		i.s = a[d];
		i.v = Math.floor(h[b] * a[d + 10] / 10000)
	}
	return (j ? i : i.v)
};
$WH.g_ajaxIshRequest("/data=item-scaling");
$WH.g_convertScalingSpell = function (b, g) {
	var f = $WH.g_convertScalingSpell.SV;
	var d = $WH.g_convertScalingSpell.SD;
	var j = {},
		a = d[g],
		k = f[b][a[3] - 1];
	k *= (Math.min(b, a[14]) + (a[13] * Math.max(0, b - a[14]))) / b;
	j.cast = Math.min(a[1], a[1] > 0 && b > 1 ? a[0] + (((b - 1) * (a[1] - a[0])) / (a[2] - 1)) : a[0]);
	j.effects = {};
	for (var c = 0; c < 3; ++c) {
		var l = a[4 + c],
			h = a[7 + c],
			e = a[10 + c],
			m = j.effects[c + 1] = {};
		m.avg = l * k * (a[1] > 0 ? j.cast / a[1] : 1);
		m.min = Math.round(m.avg) - Math.floor(m.avg * h / 2);
		m.max = Math.round(m.avg) + Math.floor(m.avg * h / 2);
		m.pts = Math.round(e * k);
		m.avg = Math.max(Math.ceil(l), Math.round(m.avg))
	}
	j.cast = Math.round(j.cast / 10) / 100;
	return j
};
$WH.g_ajaxIshRequest("/data=spell-scaling");
$WH.g_getDataSource = function () {
	if ($WH.isset("g_pageInfo")) {
		switch (g_pageInfo.type) {
		case 3:
			if ($WH.isset("g_items")) {
				return g_items
			}
		case 6:
			if ($WH.isset("g_spells")) {
				return g_spells
			}
		}
	}
	return []
};
$WH.g_setJsonItemLevel = function (s, a) {
	if (!s.scadist || !s.scaflags) {
		return
	}
	s.bonuses = s.bonuses || {};
	var c = -1,
		r = -1,
		k = -1,
		p = -1,
		f = 262175,
		o = 16253408,
		d = 32256,
		g = 32768,
		b = 5120;
	for (var h = 0; h < 24; ++h) {
		var l = 1 << h;
		if (l & s.scaflags) {
			if (l & f && c < 0) {
				c = h
			} else {
				if (l & o && r < 0) {
					r = h
				} else {
					if (l & d && k < 0) {
						k = h
					} else {
						if (l & g && p < 0) {
							p = h
						}
					}
				}
			}
		}
	}
	if (c >= 0) {
		for (var h = 0; h < 10; ++h) {
			var q = $WH.g_convertScalingFactor(a, c, s.scadist, h, 1);
			if (q.n) {
				s[q.n] = q.v
			}
			s.bonuses[q.s] = q.v
		}
	}
	if (r >= 0) {
		s.armor = $WH.g_convertScalingFactor(a, r)
	}
	if (k >= 0) {
		var j = (s.scaflags & b ? 0.2 : 0.3),
			m = (s.mledps ? "mle" : "rgd");
		s.dps = s[m + "dps"] = g_convertScalingFactor(a, k);
		s.dmgmin = s[m + "dmgmin"] = Math.floor(s.dps * (s.speed / 1000) * (1 - j));
		s.dmgmax = s[m + "dmgmax"] = Math.floor(s.dps * (s.speed / 1000) * (1 + j))
	}
	if (p >= 0) {
		s.splpwr = s.bonuses[45] = $WH.g_convertScalingFactor(a, p)
	}
	if (s.gearscore != null) {
		if (s._gearscore == null) {
			s._gearscore = s.gearscore
		}
		var e = Math.min(80, a + 1);
		if (e >= 70) {
			n = ((e - 70) * 9.5) + 105
		} else {
			if (e >= 60) {
				n = ((e - 60) * 4.5) + 60
			} else {
				n = e + 5
			}
		}
		s.gearscore = (s._gearscore * n) / 1.8
	}
};
$WH.g_setJsonSpellLevel = function (a, b) {
	if (!a.scadist) {
		return
	}
	$WH.cO(a, $WH.g_convertScalingSpell(b, a.scadist))
};
$WH.g_setTooltipLevel = function (g, a, l) {
	var h = typeof g;
	if (h == "number") {
		var e = $WH.g_getDataSource();
		if (e[g] && e[g][(l ? "buff_" : "tooltip_") + Locale.getName()]) {
			g = e[g][(l ? "buff_" : "tooltip_") + Locale.getName()]
		} else {
			return g
		}
	} else {
		if (h != "string") {
			return g
		}
	}
	h = g.match(/<!--\?([0-9:]*)-->/);
	if (!h) {
		return g
	}
	h = h[1].split(":");
	var a = Math.min(parseInt(h[2]), Math.max(parseInt(h[1]), a)),
		b = parseInt(h[4]) || 0;
	if (b) {
		if (!g.match(/<!--pts[0-9](:[0-9])?-->/g)) {
			var k = parseInt(h[5]) || 0,
				c = g.match(/<!--spd-->(\d\.\d+)/);
			if (c) {
				c = Math.floor(parseFloat(c[1]) * 1000) || 0
			}
			var j = {
				scadist: b,
				scaflags: k,
				speed: c
			};
			$WH.g_setJsonItemLevel(j, a);
			g = g.replace(/(<!--asc(\d+)-->)([^<]+)/, function (o, i, m) {
				h = m;
				if (a < 40 && (m == 3 || m == 4)) {
					--h
				}
				return i + g_itemset_types[h]
			});
			g = g.replace(/(<!--dmg-->)\d+(\D+)\d+/, function (o, i, m) {
				return i + j.dmgmin + m + j.dmgmax
			});
			g = g.replace(/(<!--dps-->\D*?)(\d+\.\d)/, function (m, i) {
				return i + j.dps.toFixed(1)
			});
			g = g.replace(/<span class="c11"><!--fap-->(\D*?)(\d+)(\D*?)<\/span>(<br \/>)?/i, function (q, i, m, r, o) {
				var p;
				m = Math.floor((j.dps - 54.8) * 14);
				if (j.dps > 54.8 && m > 0) {
					p = "";
					o = (o ? "<br />" : "")
				} else {
					m = 0;
					p = ' style="display: none"';
					o = (o ? "<!--br-->" : "")
				}
				return '<span class="c11"' + p + "><!--fap-->" + i + m + r + "</span>" + o
			});
			g = g.replace(/(<!--amr-->)\d+/, function (m, i) {
				return i + j.armor
			});
			g = g.replace(/<span><!--stat(\d+)-->[-+]\d+(\D*?)<\/span>(<!--e-->)?(<!--ps-->)?(<br ?\/?>)?/gi, function (q, m, i, s, t, o) {
				var p, r = j.bonuses[m];
				if (r) {
					r = (r > 0 ? "+" : "-") + r;
					p = "";
					o = (o ? "<br />" : "")
				} else {
					r = "+0";
					p = ' style="display: none"';
					o = (o ? "<!--br-->" : "")
				}
				return "<span" + p + "><!--stat" + m + "-->" + r + i + "</span>" + (s || "") + (t || "") + o
			});
			g = g.replace(/<span class="q2">(.*?)<!--rtg(\d+)-->\d+(.*?)<\/span>(<br \/>)?/gi, function (i, p, r, t, q, m, u) {
				var o, s = (r == 18 ? j.bonuses[31] : j.bonuses[r]);
				if (s) {
					o = "";
					u = (u ? "<br />" : "")
				} else {
					o = ' style="display: none"';
					u = (u ? "<!--br-->" : "")
				}
				return '<span class="q2"' + o + ">" + p + "<!--rtg" + r + "-->" + s + t + "</span>" + u
			})
		} else {
			var j = {
				scadist: b
			};
			$WH.g_setJsonSpellLevel(j, a);
			g = g.replace(/<!--cast-->\d+\.\d+/, "<!--cast-->" + j.cast);
			if (j.effects) {
				for (var d = 1; d < 4; ++d) {
					var f = j.effects[d];
					g = g.replace(new RegExp("<!--pts" + d + "(:0)?-->(.+?)<", "g"), "<!--pts" + d + "$1-->" + (f.min == f.max ? f.avg : f.min + " to " + f.max) + "<");
					g = g.replace(new RegExp("<!--pts" + d + ":1-->(.+?)<", "g"), "<!--pts" + d + ":1-->" + f.min + "<");
					g = g.replace(new RegExp("<!--pts" + d + ":2-->(.+?)<", "g"), "<!--pts" + d + ":2-->" + f.max + "<");
					g = g.replace(new RegExp("<!--pts" + d + ":3:(\\d+)-->(.+?)<", "g"), function (m, i) {
						return "<!--pts" + d + ":3:" + i + "-->" + (f.avg * i) + "<"
					});
					g = g.replace(new RegExp("<!--pts" + d + ":4-->(.+?)<", "g"), "<!--pts" + d + ":4-->" + f.pts + "<")
				}
			}
		}
	}
	g = g.replace(/(<!--rtg%(\d+)-->)([\.0-9]+)/g, function (o, i, p, m) {
		h = g.match(new RegExp("<!--rtg" + p + "-->(\\d+)"));
		if (!h) {
			return o
		}
		return i + Math.round($WH.g_convertRatingToPercent(a, p, h[1]) * 100) / 100
	});
	g = g.replace(/(<!--\?\d+:\d+:\d+:)\d+/, "$1" + a);
	g = g.replace(/<!--lvl-->\d+/g, "<!--lvl-->" + a);
	return g
};
$WH.g_enhanceTooltip = function (b, g, f, e, h) {
	var d = typeof b;
	if (d == "number") {
		var a = $WH.g_getDataSource();
		if (a[b] && a[b][(h ? "buff_" : "tooltip_") + Locale.getName()]) {
			b = a[b][(h ? "buff_" : "tooltip_") + Locale.getName()]
		} else {
			return b
		}
	} else {
		if (d != "string") {
			return b
		}
	}
	if (f) {
		var c = $WH.g_getGets();
		if (c.lvl) {
			b = $WH.g_setTooltipLevel(b, c.lvl, h)
		}
	}
	if (g) {
		b = b.replace(/<span class="q2"><!--addamr(\d+)--><span>.*?<\/span><\/span>/i, function (i, j) {
			return '<span class="q2 tip" onmouseover="Tooltip.showAtCursor(event, sprintf(LANG.tooltip_armorbonus, ' + j + '), 0, 0, \'q\')" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()">' + i + "</span>"
		});
		b = b.replace(/\(([^\)]*?<!--lvl-->[^\(]*?)\)/gi, function (j, i) {
			return '(<a href="javascript:;" onmousedown="return false" class="tip" style="color: white; cursor: pointer" onclick="g_staticTooltipLevelClick(this, null, 0)" onmouseover="Tooltip.showAtCursor(event, \'<span class=\\\'q2\\\'>\' + LANG.tooltip_changelevel + \'</span>\')" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()">' + i + "</a>)"
		})
	}
	if (e && Slider) {
		if (h && h.slider) {
			h.bufftip = this
		} else {
			var d = b.match(/<!--\?(\d+):(\d+):(\d+):(\d+)/);
			if (d) {
				this.slider = Slider.init(e, {
					minValue: parseInt(d[2]),
					maxValue: parseInt(d[3]),
					onMove: g_tooltipSliderMove.bind(this)
				});
				Slider.setValue(this.slider, parseInt(d[4]));
				this.slider.onmouseover = function (i) {
					Tooltip.showAtCursor(i, LANG.tooltip_changelevel2, 0, 0, "q2")
				};
				this.slider.onmousemove = Tooltip.cursorUpdate;
				this.slider.onmouseout = Tooltip.hide
			}
		}
	}
	return b
};
$WH.g_staticTooltipLevelClick = function (b, a, g, i) {
	while (b.className.indexOf("tooltip") == -1) {
		b = b.parentNode
	}
	var h = b.innerHTML;
	h = h.match(/<!--\?(\d+):(\d+):(\d+):(\d+)/);
	if (!h) {
		return
	}
	var j = parseInt(h[1]),
		e = parseInt(h[2]),
		f = parseInt(h[3]),
		d = parseInt(h[4]);
	if (!a) {
		a = prompt($WH.sprintf(LANG.prompt_ratinglevel, e, f), d)
	}
	a = parseInt(a);
	if (isNaN(a)) {
		return
	}
	if (a == d || a < e || a > f) {
		return
	}
	var c = $WH.g_getDataSource();
	h = g_setTooltipLevel(c[j][(i ? "buff_" : "tooltip_") + Locale.getName()], a, i);
	h = g_enhanceTooltip(h, true);
	b.innerHTML = "<table><tr><td>" + h + '</td><th style="background-position: top right"></th></tr><tr><th style="background-position: bottom left"></th><th style="background-position: bottom right"></th></tr></table>';
	Tooltip.fixSafe(b, 1, 1);
	if (b.slider && !g) {
		Slider.setValue(b.slider, a)
	}
};
$WH.g_tooltipSliderMove = function (c, b, a) {
	g_staticTooltipLevelClick(this, a.value, 1);
	if (this.bufftip) {
		g_staticTooltipLevelClick(this.bufftip, a.value, 1, 1)
	}
	Tooltip.hide()
};
$WH.Tooltip = {
	create: function (i) {
		var g = $WH.ce("div"),
			l = $WH.ce("table"),
			b = $WH.ce("tbody"),
			f = $WH.ce("tr"),
			c = $WH.ce("tr"),
			a = $WH.ce("td"),
			k = $WH.ce("th"),
			j = $WH.ce("th"),
			h = $WH.ce("th");
		g.className = "wowhead-tooltip";
		k.style.backgroundPosition = "top right";
		j.style.backgroundPosition = "bottom left";
		h.style.backgroundPosition = "bottom right";
		if (i) {
			a.innerHTML = i
		}
		$WH.ae(f, a);
		$WH.ae(f, k);
		$WH.ae(b, f);
		$WH.ae(c, j);
		$WH.ae(c, h);
		$WH.ae(b, c);
		$WH.ae(l, b);
		$WH.Tooltip.icon = $WH.ce("p");
		$WH.Tooltip.icon.style.visibility = "hidden";
		$WH.ae($WH.Tooltip.icon, $WH.ce("div"));
		$WH.ae(g, $WH.Tooltip.icon);
		$WH.ae(g, l);
		var e = $WH.ce("div");
		e.className = "wowhead-tooltip-powered";
		$WH.ae(g, e);
		$WH.Tooltip.logo = e;
		return g
	},
	getMultiPartHtml: function (b, a) {
		return "<table><tr><td>" + b + "</td></tr></table><table><tr><td>" + a + "</td></tr></table>"
	},
	fix: function (d, b, f) {
		var e = $WH.gE(d, "table")[0],
			h = $WH.gE(e, "td")[0],
			g = h.childNodes;
		d.className = $WH.trim(d.className.replace("tooltip-slider", ""));
		if (g.length >= 2 && g[0].nodeName == "TABLE" && g[1].nodeName == "TABLE") {
			g[0].style.whiteSpace = "nowrap";
			var a = parseInt(d.style.width);
			if (!d.slider || !a) {
				if (g[1].offsetWidth > 300) {
					a = Math.max(300, g[0].offsetWidth) + 20
				} else {
					a = Math.max(g[0].offsetWidth, g[1].offsetWidth) + 20
				}
			}
			a = Math.min(320, a);
			if (a > 20) {
				d.style.width = a + "px";
				g[0].style.width = g[1].style.width = "100%";
				if (d.slider) {
					Slider.setSize(d.slider, a - 6);
					d.className += " tooltip-slider"
				}
				if (!b && d.offsetHeight > document.body.clientHeight) {
					e.className = "shrink"
				}
			}
		}
		if (f) {
			d.style.visibility = "visible"
		}
	},
	fixSafe: function (c, b, a) {
		$WH.Tooltip.fix(c, b, a)
	},
	append: function (c, b) {
		var c = ge(c);
		var a = $WH.Tooltip.create(b);
		$WH.ae(c, a);
		$WH.Tooltip.fixSafe(a, 1, 1)
	},
	prepare: function () {
		if ($WH.Tooltip.tooltip) {
			return
		}
		var a = $WH.Tooltip.create();
		a.style.position = "absolute";
		a.style.left = a.style.top = "-2323px";
		$WH.ae(document.body, a);
		$WH.Tooltip.tooltip = a;
		$WH.Tooltip.tooltipTable = $WH.gE(a, "table")[0];
		$WH.Tooltip.tooltipTd = $WH.gE(a, "td")[0]
	},
	set: function (b) {
		var a = $WH.Tooltip.tooltip;
		a.style.width = "550px";
		a.style.left = "-2323px";
		a.style.top = "-2323px";
		$WH.Tooltip.tooltipTd.innerHTML = b;
		a.style.display = "";
		$WH.Tooltip.fix(a, 0, 0)
	},
	moveTests: [
		[null, null],
		[null, false],
		[false, null],
		[false, false]],
	move: function (m, l, d, o, c, a) {
		if (!$WH.Tooltip.tooltipTable) {
			return
		}
		var k = $WH.Tooltip.tooltip,
			g = $WH.Tooltip.tooltipTable.offsetWidth,
			b = $WH.Tooltip.tooltipTable.offsetHeight,
			p;
		k.style.width = g + "px";
		var j, e;
		for (var f = 0, h = $WH.Tooltip.moveTests.length; f < h; ++f) {
			p = $WH.Tooltip.moveTests[f];
			j = $WH.Tooltip.moveTest(m, l, d, o, c, a, p[0], p[1]);
			if ($WH.isset("Ads") && !Ads.intersect(j)) {
				e = true;
				break
			} else {
				if (!$WH.isset("Ads")) {
					break
				}
			}
		}
		if ($WH.isset("Ads") && !e) {
			Ads.intersect(j, true)
		}
		k.style.left = j.l + "px";
		k.style.top = j.t + "px";
		k.style.visibility = "visible"
	},
	moveTest: function (e, l, o, y, c, a, m, b) {
		var k = e,
			w = l,
			f = $WH.Tooltip.tooltip,
			i = $WH.Tooltip.tooltipTable.offsetWidth,
			q = $WH.Tooltip.tooltipTable.offsetHeight,
			g = $WH.g_getWindowSize(),
			j = $WH.g_getScroll(),
			h = g.w,
			p = g.h,
			d = j.x,
			v = j.y,
			u = d,
			t = v,
			s = d + h,
			r = v + p;
		if (m == null) {
			m = (e + o + i <= s)
		}
		if (b == null) {
			b = (l - q >= t)
		}
		if (m) {
			e += o + c
		} else {
			e = Math.max(e - i, u) - c
		}
		if (b) {
			l -= q + a
		} else {
			l += y + a
		}
		if (e < u) {
			e = u
		} else {
			if (e + i > s) {
				e = s - i
			}
		}
		if (l < t) {
			l = t
		} else {
			if (l + q > r) {
				l = Math.max(v, r - q)
			}
		}
		if ($WH.Tooltip.iconVisible) {
			if (k >= e - 48 && k <= e && w >= l - 4 && w <= l + 48) {
				l -= 48 - (w - l)
			}
		}
		return $WH.g_createRect(e, l, i, q)
	},
	show: function (f, e, d, b, c) {
		if ($WH.Tooltip.disabled) {
			return
		}
		if (!d || d < 1) {
			d = 1
		}
		if (!b || b < 1) {
			b = 1
		}
		if (c) {
			e = '<span class="' + c + '">' + e + "</span>"
		}
		var a = $WH.ac(f);
		$WH.Tooltip.prepare();
		$WH.Tooltip.set(e);
		$WH.Tooltip.move(a.x, a.y, f.offsetWidth, f.offsetHeight, d, b)
	},
	showAtCursor: function (d, f, c, a, b) {
		if ($WH.Tooltip.disabled) {
			return
		}
		if (!c || c < 10) {
			c = 10
		}
		if (!a || a < 10) {
			a = 10
		}
		if (b) {
			f = '<span class="' + b + '">' + f + "</span>"
		}
		d = $WH.$E(d);
		var g = $WH.g_getCursorPos(d);
		$WH.Tooltip.prepare();
		$WH.Tooltip.set(f);
		$WH.Tooltip.move(g.x, g.y, 0, 0, c, a)
	},
	showAtXY: function (d, a, e, c, b) {
		if ($WH.Tooltip.disabled) {
			return
		}
		$WH.Tooltip.prepare();
		$WH.Tooltip.set(d);
		$WH.Tooltip.move(a, e, 0, 0, c, b)
	},
	cursorUpdate: function (b, a, d) {
		if ($WH.Tooltip.disabled || !$WH.Tooltip.tooltip) {
			return
		}
		b = $WH.$E(b);
		if (!a || a < 10) {
			a = 10
		}
		if (!d || d < 10) {
			d = 10
		}
		var c = $WH.g_getCursorPos(b);
		$WH.Tooltip.move(c.x, c.y, 0, 0, a, d)
	},
	hide: function () {
		if ($WH.Tooltip.tooltip) {
			$WH.Tooltip.tooltip.style.display = "none";
			$WH.Tooltip.tooltip.visibility = "hidden";
			$WH.Tooltip.tooltipTable.className = "";
			$WH.Tooltip.setIcon(null);
			if ($WH.isset("Ads")) {
				Ads.restoreHidden()
			}
		}
	},
	setIcon: function (b) {
		$WH.Tooltip.prepare();
		if (b) {
			var a = "";
			if (window.location.protocol == "https:") {
				a = "s"
			}
			$WH.Tooltip.icon.style.backgroundImage = "url(http" + a + "://static.wowhead.com/images/wow/icons/medium/" + b.toLowerCase() + ".jpg)";
			$WH.Tooltip.icon.style.visibility = "visible"
		} else {
			$WH.Tooltip.icon.style.backgroundImage = "none";
			$WH.Tooltip.icon.style.visibility = "hidden"
		}
		$WH.Tooltip.iconVisible = b ? 1 : 0
	}
};
if ($WH.isset("$WowheadPower")) {
	$WowheadPower.init()
};