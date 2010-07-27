var swfobject = function () {
	var at = "undefined",
		aG = "object",
		ab = "Shockwave Flash",
		X = "ShockwaveFlash.ShockwaveFlash",
		aH = "application/x-shockwave-flash",
		ad = "SWFObjectExprInst",
		az = "onreadystatechange",
		ah = window,
		aO = document,
		aD = navigator,
		aa = false,
		Z = [aQ],
		aJ = [],
		ai = [],
		an = [],
		aM, af, ar, av, am = false,
		aX = false,
		aK, ap, aL = true,
		aj = function () {
		var a = typeof aO.getElementById != at && typeof aO.getElementsByTagName != at && typeof aO.createElement != at,
			e = aD.userAgent.toLowerCase(),
			c = aD.platform.toLowerCase(),
			h = c ? /win/.test(c) : /win/.test(e),
		j = c ? /mac/.test(c) : /mac/.test(e),
		g = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
		d = !+"\v1",
		f = [0, 0, 0],
		k = null;
		if (typeof aD.plugins != at && typeof aD.plugins[ab] == aG) {
			k = aD.plugins[ab].description;
			if (k && !(typeof aD.mimeTypes != at && aD.mimeTypes[aH] && !aD.mimeTypes[aH].enabledPlugin)) {
				aa = true;
				d = false;
				k = k.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				f[0] = parseInt(k.replace(/^(.*)\..*$/, "$1"), 10);
				f[1] = parseInt(k.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				f[2] = /[a-zA-Z]/.test(k) ? parseInt(k.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
			}
		} else {
			if (typeof ah.ActiveXObject != at) {
				try {
					var i = new ActiveXObject(X);
					if (i) {
						k = i.GetVariable("$version");
						if (k) {
							d = true;
							k = k.split(" ")[1].split(",");
							f = [parseInt(k[0], 10), parseInt(k[1], 10), parseInt(k[2], 10)]
						}
					}
				} catch(b) {}
			}
		}
		return {
			w3: a,
			pv: f,
			wk: g,
			ie: d,
			win: h,
			mac: j
		}
	} (),
		aN = function () {
		if (!aj.w3) {
			return
		}
		if ((typeof aO.readyState != at && aO.readyState == "complete") || (typeof aO.readyState == at && (aO.getElementsByTagName("body")[0] || aO.body))) {
			aS()
		}
		if (!am) {
			if (typeof aO.addEventListener != at) {
				aO.addEventListener("DOMContentLoaded", aS, false)
			}
			if (aj.ie && aj.win) {
				aO.attachEvent(az, function () {
					if (aO.readyState == "complete") {
						aO.detachEvent(az, arguments.callee);
						aS()
					}
				});
				if (ah == top) {
					(function () {
						if (am) {
							return
						}
						try {
							aO.documentElement.doScroll("left")
						} catch(a) {
							setTimeout(arguments.callee, 0);
							return
						}
						aS()
					})()
				}
			}
			if (aj.wk) {
				(function () {
					if (am) {
						return
					}
					if (!/loaded|complete/.test(aO.readyState)) {
						setTimeout(arguments.callee, 0);
						return
					}
					aS()
				})()
			}
			aF(aS)
		}
	} ();

	function aS() {
		if (am) {
			return
		}
		try {
			var b = aO.getElementsByTagName("body")[0].appendChild(au("span"));
			b.parentNode.removeChild(b)
		} catch(a) {
			return
		}
		am = true;
		var d = Z.length;
		for (var c = 0; c < d; c++) {
			Z[c]()
		}
	}
	function al(a) {
		if (am) {
			a()
		} else {
			Z[Z.length] = a
		}
	}
	function aF(a) {
		if (typeof ah.addEventListener != at) {
			ah.addEventListener("load", a, false)
		} else {
			if (typeof aO.addEventListener != at) {
				aO.addEventListener("load", a, false)
			} else {
				if (typeof ah.attachEvent != at) {
					aP(ah, "onload", a)
				} else {
					if (typeof ah.onload == "function") {
						var b = ah.onload;
						ah.onload = function () {
							b();
							a()
						}
					} else {
						ah.onload = a
					}
				}
			}
		}
	}
	function aQ() {
		if (aa) {
			Y()
		} else {
			ao()
		}
	}
	function Y() {
		var d = aO.getElementsByTagName("body")[0];
		var b = au(aG);
		b.setAttribute("type", aH);
		var a = d.appendChild(b);
		if (a) {
			var c = 0;
			(function () {
				if (typeof a.GetVariable != at) {
					var e = a.GetVariable("$version");
					if (e) {
						e = e.split(" ")[1].split(",");
						aj.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)]
					}
				} else {
					if (c < 10) {
						c++;
						setTimeout(arguments.callee, 10);
						return
					}
				}
				d.removeChild(b);
				a = null;
				ao()
			})()
		} else {
			ao()
		}
	}
	function ao() {
		var g = aJ.length;
		if (g > 0) {
			for (var h = 0; h < g; h++) {
				var c = aJ[h].id;
				var l = aJ[h].callbackFn;
				var a = {
					success: false,
					id: c
				};
				if (aj.pv[0] > 0) {
					var i = aV(c);
					if (i) {
						if (aq(aJ[h].swfVersion) && !(aj.wk && aj.wk < 312)) {
							aA(c, true);
							if (l) {
								a.success = true;
								a.ref = ax(c);
								l(a)
							}
						} else {
							if (aJ[h].expressInstall && aw()) {
								var e = {};
								e.data = aJ[h].expressInstall;
								e.width = i.getAttribute("width") || "0";
								e.height = i.getAttribute("height") || "0";
								if (i.getAttribute("class")) {
									e.styleclass = i.getAttribute("class")
								}
								if (i.getAttribute("align")) {
									e.align = i.getAttribute("align")
								}
								var f = {};
								var d = i.getElementsByTagName("param");
								var k = d.length;
								for (var j = 0; j < k; j++) {
									if (d[j].getAttribute("name").toLowerCase() != "movie") {
										f[d[j].getAttribute("name")] = d[j].getAttribute("value")
									}
								}
								ag(e, f, c, l)
							} else {
								aI(i);
								if (l) {
									l(a)
								}
							}
						}
					}
				} else {
					aA(c, true);
					if (l) {
						var b = ax(c);
						if (b && typeof b.SetVariable != at) {
							a.success = true;
							a.ref = b
						}
						l(a)
					}
				}
			}
		}
	}
	function ax(b) {
		var d = null;
		var c = aV(b);
		if (c && c.nodeName == "OBJECT") {
			if (typeof c.SetVariable != at) {
				d = c
			} else {
				var a = c.getElementsByTagName(aG)[0];
				if (a) {
					d = a
				}
			}
		}
		return d
	}
	function aw() {
		return !aX && aq("6.0.65") && (aj.win || aj.mac) && !(aj.wk && aj.wk < 312)
	}
	function ag(f, d, h, e) {
		aX = true;
		ar = e || null;
		av = {
			success: false,
			id: h
		};
		var a = aV(h);
		if (a) {
			if (a.nodeName == "OBJECT") {
				aM = aR(a);
				af = null
			} else {
				aM = a;
				af = h
			}
			f.id = ad;
			if (typeof f.width == at || (!/%$/.test(f.width) && parseInt(f.width, 10) < 310)) {
				f.width = "310"
			}
			if (typeof f.height == at || (!/%$/.test(f.height) && parseInt(f.height, 10) < 137)) {
				f.height = "137"
			}
			aO.title = aO.title.slice(0, 47) + " - Flash Player Installation";
			var b = aj.ie && aj.win ? "ActiveX" : "PlugIn",
			c = "MMredirectURL=" + ah.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + b + "&MMdoctitle=" + aO.title;
			if (typeof d.flashvars != at) {
				d.flashvars += "&" + c
			} else {
				d.flashvars = c
			}
			if (aj.ie && aj.win && a.readyState != 4) {
				var g = au("div");
				h += "SWFObjectNew";
				g.setAttribute("id", h);
				a.parentNode.insertBefore(g, a);
				a.style.display = "none";
				(function () {
					if (a.readyState == 4) {
						a.parentNode.removeChild(a)
					} else {
						setTimeout(arguments.callee, 10)
					}
				})()
			}
			aC(f, d, h)
		}
	}
	function aI(a) {
		if (aj.ie && aj.win && a.readyState != 4) {
			var b = au("div");
			a.parentNode.insertBefore(b, a);
			b.parentNode.replaceChild(aR(a), b);
			a.style.display = "none";
			(function () {
				if (a.readyState == 4) {
					a.parentNode.removeChild(a)
				} else {
					setTimeout(arguments.callee, 10)
				}
			})()
		} else {
			a.parentNode.replaceChild(aR(a), a)
		}
	}
	function aR(b) {
		var d = au("div");
		if (aj.win && aj.ie) {
			d.innerHTML = b.innerHTML
		} else {
			var e = b.getElementsByTagName(aG)[0];
			if (e) {
				var a = e.childNodes;
				if (a) {
					var f = a.length;
					for (var c = 0; c < f; c++) {
						if (! (a[c].nodeType == 1 && a[c].nodeName == "PARAM") && !(a[c].nodeType == 8)) {
							d.appendChild(a[c].cloneNode(true))
						}
					}
				}
			}
		}
		return d
	}
	function aC(e, g, c) {
		var d, a = aV(c);
		if (aj.wk && aj.wk < 312) {
			return d
		}
		if (a) {
			if (typeof e.id == at) {
				e.id = c
			}
			if (aj.ie && aj.win) {
				var f = "";
				for (var i in e) {
					if (e[i] != Object.prototype[i]) {
						if (i.toLowerCase() == "data") {
							g.movie = e[i]
						} else {
							if (i.toLowerCase() == "styleclass") {
								f += ' class="' + e[i] + '"'
							} else {
								if (i.toLowerCase() != "classid") {
									f += " " + i + '="' + e[i] + '"'
								}
							}
						}
					}
				}
				var h = "";
				for (var j in g) {
					if (g[j] != Object.prototype[j]) {
						h += '<param name="' + j + '" value="' + g[j] + '" />'
					}
				}
				a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + h + "</object>";
				ai[ai.length] = e.id;
				d = aV(e.id)
			} else {
				var b = au(aG);
				b.setAttribute("type", aH);
				for (var k in e) {
					if (e[k] != Object.prototype[k]) {
						if (k.toLowerCase() == "styleclass") {
							b.setAttribute("class", e[k])
						} else {
							if (k.toLowerCase() != "classid") {
								b.setAttribute(k, e[k])
							}
						}
					}
				}
				for (var l in g) {
					if (g[l] != Object.prototype[l] && l.toLowerCase() != "movie") {
						aT(b, l, g[l])
					}
				}
				a.parentNode.replaceChild(b, a);
				d = b
			}
		}
		return d
	}
	function aT(b, d, c) {
		var a = au("param");
		a.setAttribute("name", d);
		a.setAttribute("value", c);
		b.appendChild(a)
	}
	function ay(a) {
		var b = aV(a);
		if (b && b.nodeName == "OBJECT") {
			if (aj.ie && aj.win) {
				b.style.display = "none";
				(function () {
					if (b.readyState == 4) {
						aW(a)
					} else {
						setTimeout(arguments.callee, 10)
					}
				})()
			} else {
				b.parentNode.removeChild(b)
			}
		}
	}
	function aW(a) {
		var b = aV(a);
		if (b) {
			for (var c in b) {
				if (typeof b[c] == "function") {
					b[c] = null
				}
			}
			b.parentNode.removeChild(b)
		}
	}
	function aV(a) {
		var c = null;
		try {
			c = aO.getElementById(a)
		} catch(b) {}
		return c
	}
	function au(a) {
		return aO.createElement(a)
	}
	function aP(a, c, b) {
		a.attachEvent(c, b);
		an[an.length] = [a, c, b]
	}
	function aq(a) {
		var b = aj.pv,
			c = a.split(".");
		c[0] = parseInt(c[0], 10);
		c[1] = parseInt(c[1], 10) || 0;
		c[2] = parseInt(c[2], 10) || 0;
		return (b[0] > c[0] || (b[0] == c[0] && b[1] > c[1]) || (b[0] == c[0] && b[1] == c[1] && b[2] >= c[2])) ? true : false
	}
	function aB(b, f, a, c) {
		if (aj.ie && aj.mac) {
			return
		}
		var e = aO.getElementsByTagName("head")[0];
		if (!e) {
			return
		}
		var g = (a && typeof a == "string") ? a : "screen";
		if (c) {
			aK = null;
			ap = null
		}
		if (!aK || ap != g) {
			var d = au("style");
			d.setAttribute("type", "text/css");
			d.setAttribute("media", g);
			aK = e.appendChild(d);
			if (aj.ie && aj.win && typeof aO.styleSheets != at && aO.styleSheets.length > 0) {
				aK = aO.styleSheets[aO.styleSheets.length - 1]
			}
			ap = g
		}
		if (aj.ie && aj.win) {
			if (aK && typeof aK.addRule == aG) {
				aK.addRule(b, f)
			}
		} else {
			if (aK && typeof aO.createTextNode != at) {
				aK.appendChild(aO.createTextNode(b + " {" + f + "}"))
			}
		}
	}
	function aA(a, c) {
		if (!aL) {
			return
		}
		var b = c ? "visible" : "hidden";
		if (am && aV(a)) {
			aV(a).style.visibility = b
		} else {
			aB("#" + a, "visibility:" + b)
		}
	}
	function ak(b) {
		var a = /[\\\"<>\.;]/;
		var c = a.exec(b) != null;
		return c && typeof encodeURIComponent != at ? encodeURIComponent(b) : b
	}
	var aU = function () {
		if (aj.ie && aj.win) {
			window.attachEvent("onunload", function () {
				var a = an.length;
				for (var b = 0; b < a; b++) {
					an[b][0].detachEvent(an[b][1], an[b][2])
				}
				var d = ai.length;
				for (var c = 0; c < d; c++) {
					ay(ai[c])
				}
				for (var e in aj) {
					aj[e] = null
				}
				aj = null;
				for (var f in swfobject) {
					swfobject[f] = null
				}
				swfobject = null
			})
		}
	} ();
	return {
		registerObject: function (a, e, c, b) {
			if (aj.w3 && a && e) {
				var d = {};
				d.id = a;
				d.swfVersion = e;
				d.expressInstall = c;
				d.callbackFn = b;
				aJ[aJ.length] = d;
				aA(a, false)
			} else {
				if (b) {
					b({
						success: false,
						id: a
					})
				}
			}
		},
		getObjectById: function (a) {
			if (aj.w3) {
				return ax(a)
			}
		},
		embedSWF: function (k, e, h, f, c, a, b, i, g, j) {
			var d = {
				success: false,
				id: e
			};
			if (aj.w3 && !(aj.wk && aj.wk < 312) && k && e && h && f && c) {
				aA(e, false);
				al(function () {
					h += "";
					f += "";
					var q = {};
					if (g && typeof g === aG) {
						for (var o in g) {
							q[o] = g[o]
						}
					}
					q.data = k;
					q.width = h;
					q.height = f;
					var n = {};
					if (i && typeof i === aG) {
						for (var p in i) {
							n[p] = i[p]
						}
					}
					if (b && typeof b === aG) {
						for (var l in b) {
							if (typeof n.flashvars != at) {
								n.flashvars += "&" + l + "=" + b[l]
							} else {
								n.flashvars = l + "=" + b[l]
							}
						}
					}
					if (aq(c)) {
						var m = aC(q, n, e);
						if (q.id == e) {
							aA(e, true)
						}
						d.success = true;
						d.ref = m
					} else {
						if (a && aw()) {
							q.data = a;
							ag(q, n, e, j);
							return
						} else {
							aA(e, true)
						}
					}
					if (j) {
						j(d)
					}
				})
			} else {
				if (j) {
					j(d)
				}
			}
		},
		switchOffAutoHideShow: function () {
			aL = false
		},
		ua: aj,
		getFlashPlayerVersion: function () {
			return {
				major: aj.pv[0],
				minor: aj.pv[1],
				release: aj.pv[2]
			}
		},
		hasFlashPlayerVersion: aq,
		createSWF: function (a, b, c) {
			if (aj.w3) {
				return aC(a, b, c)
			} else {
				return undefined
			}
		},
		showExpressInstall: function (b, a, d, c) {
			if (aj.w3 && aw()) {
				ag(b, a, d, c)
			}
		},
		removeSWF: function (a) {
			if (aj.w3) {
				ay(a)
			}
		},
		createCSS: function (b, a, c, d) {
			if (aj.w3) {
				aB(b, a, c, d)
			}
		},
		addDomLoadEvent: al,
		addLoadEvent: aF,
		getQueryParamValue: function (b) {
			var a = aO.location.search || aO.location.hash;
			if (a) {
				if (/\?/.test(a)) {
					a = a.split("?")[1]
				}
				if (b == null) {
					return ak(a)
				}
				var c = a.split("&");
				for (var d = 0; d < c.length; d++) {
					if (c[d].substring(0, c[d].indexOf("=")) == b) {
						return ak(c[d].substring((c[d].indexOf("=") + 1)))
					}
				}
			}
			return ""
		},
		expressInstallCallback: function () {
			if (aX) {
				var a = aV(ad);
				if (a && aM) {
					a.parentNode.replaceChild(aM, a);
					if (af) {
						aA(af, true);
						if (aj.ie && aj.win) {
							aM.style.display = "block"
						}
					}
					if (ar) {
						ar(av)
					}
				}
				aX = false
			}
		}
	}
} ();
