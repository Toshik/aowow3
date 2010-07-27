function g_isUsernameValid(a) {
	return (a.match(/[^a-z0-9]/i) == null && a.length >= 4 && a.length <= 16)
}
function g_requireCaptcha() {
	if ((g_user.permissions & 1) > 0) {
		return false
	}
	var b = gc("captcha");
	if (b) {
		b = b.split("||");
		var a = new Date();
		if (a.getTime() > parseInt(b[1]) + 900000) {
			return true
		}
		if (parseInt(b[0]) >= 5) {
			return true
		}
		return false
	}
	return true
}
var User = new
function () {
	var a = this;
	a.hasPermissions = function (b) {
		if (!b) {
			return true
		}
		return !! (g_user.roles & b)
	}
};
function Ajax(b, c) {
	if (!b) {
		return
	}
	var a;
	try {
		a = new XMLHttpRequest()
	} catch(d) {
		try {
			a = new ActiveXObject("Msxml2.XMLHTTP")
		} catch(d) {
			try {
				a = new ActiveXObject("Microsoft.XMLHTTP")
			} catch(d) {
				if (window.createRequest) {
					a = window.createRequest()
				} else {
					alert(LANG.message_ajaxnotsupported);
					return
				}
			}
		}
	}
	this.request = a;
	cO(this, c);
	this.method = this.method || (this.params && "POST") || "GET";
	a.open(this.method, b, this.async == null ? true : this.async);
	a.onreadystatechange = Ajax.onReadyStateChange.bind(this);
	if (this.method.toUpperCase() == "POST") {
		a.setRequestHeader("Content-Type", (this.contentType || "application/x-www-form-urlencoded") + "; charset=" + (this.encoding || "UTF-8"))
	}
	a.send(this.params)
}
Ajax.onReadyStateChange = function () {
	if (this.request.readyState == 4) {
		if (this.request.status == 0 || (this.request.status >= 200 && this.request.status < 300)) {
			this.onSuccess != null && this.onSuccess(this.request, this)
		} else {
			this.onFailure != null && this.onFailure(this.request, this)
		}
		if (this.onComplete != null) {
			this.onComplete(this.request, this)
		}
	}
};
function co_addYourComment() {
	tabsContribute.focus(0);
	var a = gE(document.forms.addcomment, "textarea")[0];
	a.focus()
}
function co_cancelReply() {
	ge("gjkdlfgkjh436").style.display = "none";
	document.forms.addcomment.elements.replyto.value = ""
}
function co_validateForm(b) {
	var a = gE(b, "textarea")[0];
	if (Listview.funcBox.coValidate(a)) {
		if (!g_requireCaptcha()) {
			return true
		}
		if (b.elements.captcha.value.length == 5) {
			return true
		} else {
			alert(LANG.message_codenotentered);
			b.elements.captcha.focus()
		}
	}
	return false
}
$(document).ready(function () {
	g_setupChangeWarning($("form[name=addcomment]"), [$("textarea[name=commentbody]")], LANG.message_startedpost)
});
function g_cookiesEnabled() {
	document.cookie = "enabledTest";
	return (document.cookie.indexOf("enabledTest") != -1) ? true : false
}
function g_getWowheadCookie(a) {
	if (g_user.id > 0) {
		return g_user.cookies[a]
	} else {
		return gc(a)
	}
}
function g_setWowheadCookie(c, d, b) {
	var a = c.substr(0, 5) == "temp_";
	if (!b && g_user.id > 0 && !a) {
		new Ajax("/cookie=" + c + "&" + c + "=" + urlencode(d), {
			method: "get",
			onSuccess: function (e) {
				if (e.responseText == 0) {
					g_user.cookies[c] = d
				}
			}
		})
	} else {
		if (b || g_user.id == 0) {
			sc(c, 14, d, null, ".wowhead.com")
		}
	}
}
function g_addCss(b) {
	var c = ce("style");
	c.type = "text/css";
	if (c.styleSheet) {
		c.styleSheet.cssText = b
	} else {
		ae(c, ct(b))
	}
	var a = document.getElementsByTagName("head")[0];
	ae(a, c)
}
function g_setTextNodes(c, b) {
	if (c.nodeType == 3) {
		c.nodeValue = b
	} else {
		for (var a = 0; a < c.childNodes.length; ++a) {
			g_setTextNodes(c.childNodes[a], b)
		}
	}
}
function g_setInnerHtml(d, c, a) {
	if (d.nodeName.toLowerCase() == a) {
		d.innerHTML = c
	} else {
		for (var b = 0; b < d.childNodes.length; ++b) {
			g_setInnerHtml(d.childNodes[b], c, a)
		}
	}
}
function g_getFirstTextContent(c) {
	for (var b = 0; b < c.childNodes.length; ++b) {
		if (c.childNodes[b].nodeName == "#text") {
			return c.childNodes[b].nodeValue
		}
		var a = g_getFirstTextContent(c.childNodes[b]);
		if (a) {
			return a
		}
	}
	return false
}
function g_getTextContent(c) {
	var a = "";
	for (var b = 0; b < c.childNodes.length; ++b) {
		if (c.childNodes[b].nodeValue) {
			a += c.childNodes[b].nodeValue
		} else {
			if (c.childNodes[b].nodeName == "BR") {
				if (Browser.ie67) {
					a += "\r"
				} else {
					a += "\n"
				}
			}
		}
		a += g_getTextContent(c.childNodes[b])
	}
	return a
}
function g_toggleDisplay(a) {
	a = $(a);
	a.toggle();
	if (a.is(":visible")) {
		return true
	}
	return false
}
function g_enableScroll(a) {
	if (!a) {
		aE(document, "mousewheel", g_enableScroll.F);
		aE(window, "DOMMouseScroll", g_enableScroll.F)
	} else {
		dE(document, "mousewheel", g_enableScroll.F);
		dE(window, "DOMMouseScroll", g_enableScroll.F)
	}
}
g_enableScroll.F = function (a) {
	if (a.stopPropagation) {
		a.stopPropagation()
	}
	if (a.preventDefault) {
		a.preventDefault()
	}
	a.returnValue = false;
	a.cancelBubble = true;
	return false
};

function g_setCaretPosition(c, b) {
	if (!c) {
		return
	}
	if (c.createTextRange) {
		var a = c.createTextRange();
		a.move("character", b);
		a.select()
	} else {
		if (c.selectionStart != undefined) {
			c.focus();
			c.setSelectionRange(b, b)
		} else {
			c.focus()
		}
	}
}
function g_insertTag(d, a, i, j) {
	var b = ge(d);
	b.focus();
	if (b.selectionStart != null) {
		var l = b.selectionStart,
			h = b.selectionEnd,
			k = b.scrollLeft,
			c = b.scrollTop;
		var g = b.value.substring(l, h);
		if (typeof j == "function") {
			g = j(g)
		}
		b.value = b.value.substr(0, l) + a + g + i + b.value.substr(h);
		b.selectionStart = b.selectionEnd = h + a.length;
		b.scrollLeft = k;
		b.scrollTop = c
	} else {
		if (document.selection && document.selection.createRange) {
			var f = document.selection.createRange();
			if (f.parentElement() != b) {
				return
			}
			var g = f.text;
			if (typeof j == "function") {
				g = j(g)
			}
			f.text = a + g + i
		}
	}
	if (b.onkeyup) {
		b.onkeyup()
	}
}
function g_onAfterTyping(a, d, c) {
	var e;
	var b = function () {
		if (e) {
			clearTimeout(e);
			e = null
		}
		e = setTimeout(d, c)
	};
	a.onkeyup = b
}
function g_onClick(c, d) {
	var b = 0;

	function a(e) {
		if (b) {
			if (b != e) {
				return
			}
		} else {
			b = e
		}
		d(true)
	}
	c.oncontextmenu = function () {
		a(1);
		return false
	};
	c.onmouseup = function (f) {
		f = $E(f);
		if (f._button == 3 || f.shiftKey || f.ctrlKey) {
			a(2)
		} else {
			if (f._button == 1) {
				d(false)
			}
		}
		return false
	}
}
function g_isLeftClick(a) {
	a = $E(a);
	return (a && a._button == 1)
}
function g_preventEmptyFormSubmission() {
	if (!$.trim(this.elements[0].value)) {
		return false
	}
}
function g_getViewport() {
	var a = $(window);
	return new Rectangle(a.scrollLeft(), a.scrollTop(), a.width(), a.height())
}
function g_cleanCharacterName(a) {
	return (a.match(/^[A-Z]/) ? a.charAt(0).toLowerCase() + a.substr(1) : a)
}
function g_getProfileUrl(a) {
	if (a.region) {
		return "/profile=" + a.region + "." + a.realm + "." + g_cleanCharacterName(a.name)
	} else {
		return "/profile=" + a.id
	}
}
function g_getProfileRealmUrl(a) {
	return "/profiles=" + a.region + "." + a.realm
}
function g_getProfileIcon(a) {
	if (a.icon) {
		return a.icon
	}
	return "chr_" + g_file_races[a.race] + "_" + g_file_genders[a.gender] + "_" + g_file_classes[a.classs] + "0" + (a.level > 59 ? (Math.floor((a.level - 60) / 10) + 2) : 1)
}
function Rectangle(d, c, a, b) {
	this.l = d;
	this.t = c;
	this.r = d + a;
	this.b = c + b
}
Rectangle.prototype = {
	intersectWith: function (a) {
		var b = !(this.l >= a.r || a.l >= this.r || this.t >= a.b || a.t >= this.b);
		return b
	},
	contains: function (a) {
		var b = (this.l <= a.l && this.t <= a.t && this.r >= a.r && this.b >= a.b);
		return b
	},
	containedIn: function (a) {
		return a.contains(this)
	}
};
var RedButton = {
	create: function (k, g, j) {
		var d = ce("a"),
			f = ce("em"),
			c = ce("b"),
			e = ce("i"),
			h = ce("span");
		d.href = "javascript:;";
		d.className = "button-red";
		ae(c, e);
		ae(f, c);
		ae(f, h);
		ae(d, f);
		RedButton.setText(d, k);
		RedButton.enable(d, g);
		RedButton.setFunc(d, j);
		return d
	},
	setText: function (a, b) {
		st(a.firstChild.childNodes[0].firstChild, b);
		st(a.firstChild.childNodes[1], b)
	},
	enable: function (a, b) {
		if (b || b == null) {
			a.className = a.className.replace("button-red-disabled", "")
		} else {
			if (a.className.indexOf("button-red-disabled") == -1) {
				a.className += " button-red-disabled"
			}
		}
	},
	setFunc: function (a, b) {
		if (b) {
			$(a).click(b)
		} else {
			$(a).unbind()
		}
	}
};

function ss_submitAScreenshot() {
	tabsContribute.focus(1)
}
function ss_validateForm(a) {
	if (!a.elements.screenshotfile.value.length) {
		alert(LANG.message_noscreenshot);
		return false
	}
	return true
}
function ss_appendSticky() {
	var j = ge("infobox-sticky-ss");
	var g = g_pageInfo.type;
	var f = g_pageInfo.typeId;
	var h = in_array(lv_screenshots, 1, function (a) {
		return a.sticky
	});
	if (h != -1) {
		var b = lv_screenshots[h];
		var i = ce("a");
		i.href = "#screenshots:id=" + b.id;
		i.onclick = function (a) {
			ScreenshotViewer.show({
				screenshots: lv_screenshots,
				pos: h
			});
			return rf2(a)
		};
		var l = (lv_videos && lv_videos.length ? [120, 90] : [150, 150]);
		var e = ce("img"),
			d = Math.min(l[0] / b.width, l[1] / b.height);
		e.src = g_staticUrl + "/uploads/screenshots/thumb/" + b.id + ".jpg";
		e.width = Math.round(d * b.width);
		e.height = Math.round(d * b.height);
		e.className = "border";
		ae(i, e);
		ae(j, i);
		var c = $("#infobox-screenshots");
		if (!c) {
			var k = $("th", j.parentNode);
			c = k[k.length - (lv_videos && lv_videos.length ? 2 : 1)]
		}
		c.append(" (" + lv_screenshots.length + ")").wrapInner($('<a href="#screenshots"></a>').click(function () {
			tabsRelated.focus((lv_videos && lv_videos.length) || (g_user && g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_VIDEO)) ? -2 : -1);
			return false
		}))
	} else {
		var i;
		if (g_user.id > 0) {
			i = '<a href="javascript:;" onclick="ss_submitAScreenshot(); return false">'
		} else {
			i = '<a href="/account=signin">'
		}
		j.innerHTML = sprintf(LANG.infobox_noneyet, i + LANG.infobox_submitone + "</a>")
	}
}
var suDialog;

function su_addToSaved(c, d, a, e) {
	if (!c) {
		return
	}
	if (!suDialog) {
		suDialog = new Dialog()
	}
	var b = function (h) {
		var g = g_getWowheadCookie("compare_groups"),
			f = "/compare";
		if (h.action > 1) {
			if (g) {
				c = g + ";" + c
			}
			g_setWowheadCookie("compare_groups", c, true);
			if (e) {
				g_setWowheadCookie("compare_level", e, true)
			}
		} else {
			f += "?items=" + c + (e ? "&l=" + e : "")
		}
		if (h.action < 3) {
			if (a) {
				window.open(f)
			} else {
				location.href = f
			}
		}
	};
	suDialog.show("docompare", {
		data: {
			selecteditems: d,
			action: 1
		},
		onSubmit: b
	})
}
function g_trackPageview(a) {
	function b() {
		if (isset("pageTracker")) {
			pageTracker._trackPageview(a)
		}
	}
	$(document).ready(b)
}
function g_trackEvent(d, a, c) {
	var b = function (g, f, e) {
		if (isset("pageTracker")) {
			pageTracker._trackEvent(g, f, e)
		} else {
			setTimeout(arguments.callee.bind(null, g, f, e), 200)
		}
	};
	$(document).ready(b.bind(null, d, a, c))
}
function g_attachTracking(e, d, a, c) {
	var b = $(e);
	b.click(function () {
		g_trackEvent(d, a, c)
	})
}
function g_addAnalytics() {
	var c = {
		"home-featuredbox": {
			category: "Featured Box",
			actions: {
				"Follow link": function (d) {
					return (d.parentNode.className != "home-featuredbox-links")
				},
				"Click image": function (d) {
					return (d.parentNode.className == "home-featuredbox-links")
				}
			}
		},
		"home-oneliner": {
			category: "Oneliner",
			actions: {
				"Follow link": function (d) {
					return true
				}
			}
		},
		"sidebar-contents": {
			category: "Page sidebar",
			actions: {
				"Click image": function (d) {
					return true
				}
			}
		},
		"toptabs-promo": {
			category: "Page header",
			actions: {
				"Click image": function (d) {
					return true
				}
			}
		}
	};
	for (var a in c) {
		var b = ge(a);
		if (b) {
			g_addAnalyticsToNode(b, c[a])
		}
	}
}
function g_getNodeTextId(a) {
	var c = null;
	var b = g_getFirstTextContent(a);
	if (b) {
		c = g_urlize(b)
	} else {
		if (a.title) {
			c = g_urlize(a.title)
		} else {
			if (a.id) {
				c = g_urlize(a.id)
			}
		}
	}
	return c
}
function g_addAnalyticsToNode(d, b, g) {
	if (!b || !b.actions || !b.category) {
		if (isset("g_dev") && g_dev) {
			console.log("Tried to add analytics event without appropriate parameters.");
			console.log(d);
			console.log(b)
		}
		return
	}
	var c = b.category;
	var k = gE(d, "a");
	for (var f = 0; f < k.length; ++f) {
		var d = k[f];
		var e = "Follow link";
		for (var j in b.actions) {
			if (b.actions[j] && b.actions[j](d)) {
				e = j;
				break
			}
		}
		var h = (g ? g + "-" : "") + g_getNodeTextId(d);
		g_attachTracking(d, c, e, h)
	}
}
$(document).ready(g_addAnalytics);

function g_addTooltip(b, c, a) {
	if (!a && c.indexOf("<table>") == -1) {
		a = "q"
	}
	b.onmouseover = function (d) {
		Tooltip.showAtCursor(d, c, 0, 0, a)
	};
	b.onmousemove = Tooltip.cursorUpdate;
	b.onmouseout = Tooltip.hide
}
function g_addStaticTooltip(b, c, a) {
	if (!a && c.indexOf("<table>") == -1) {
		a = "q"
	}
	b.onmouseover = function (d) {
		Tooltip.show(b, c, 0, 0, a)
	};
	b.onmouseout = Tooltip.hide
}
function g_formatTimeElapsed(e) {
	function c(m, l, i) {
		if (i && LANG.timeunitsab[l] == "") {
			i = 0
		}
		if (i) {
			return m + " " + LANG.timeunitsab[l]
		} else {
			return m + " " + (m == 1 ? LANG.timeunitssg[l] : LANG.timeunitspl[l])
		}
	}
	var g = [31557600, 2629800, 604800, 86400, 3600, 60, 1];
	var a = [1, 3, 3, -1, 5, -1, -1];
	e = Math.max(e, 1);
	for (var f = 3, h = g.length; f < h; ++f) {
		if (e >= g[f]) {
			var d = f;
			var k = Math.floor(e / g[d]);
			if (a[d] != -1) {
				var b = a[d];
				e %= g[d];
				var j = Math.floor(e / g[b]);
				if (j > 0) {
					return c(k, d, 1) + " " + c(j, b, 1)
				}
			}
			return c(k, d, 0)
		}
	}
	return "(n/a)"
}
function g_formatDateSimple(g, c) {
	function a(b) {
		return (b < 10 ? "0" + b : b)
	}
	var i = "",
		j = g.getDate(),
		f = g.getMonth() + 1,
		h = g.getFullYear();
	i += sprintf(LANG.date_simple, a(j), a(f), h);
	if (c == 1) {
		var k = g.getHours() + 1,
			e = g.getMinutes() + 1;
		i += LANG.date_at + a(k) + ":" + a(e)
	}
	return i
}
function g_createGlow(a, h) {
	var e = ce("span");
	for (var c = -1; c <= 1; ++c) {
		for (var b = -1; b <= 1; ++b) {
			var g = ce("div");
			g.style.position = "absolute";
			g.style.whiteSpace = "nowrap";
			g.style.left = c + "px";
			g.style.top = b + "px";
			if (c == 0 && b == 0) {
				g.style.zIndex = 4
			} else {
				g.style.color = "black";
				g.style.zIndex = 2
			}
			g.innerHTML = a;
			ae(e, g)
		}
	}
	e.style.position = "relative";
	e.className = "glow" + (h != null ? " " + h : "");
	var f = ce("span");
	f.style.visibility = "hidden";
	ae(f, ct(a));
	ae(e, f);
	return e
}
function g_createProgressBar(c) {
	if (c == null) {
		c = {}
	}
	if (!c.text) {
		c.text = " "
	}
	if (c.color == null) {
		c.color = "rep0"
	}
	if (c.width == null || c.width > 100) {
		c.width = 100
	}
	var d, e;
	if (c.hoverText) {
		d = ce("a");
		d.href = "javascript:;"
	} else {
		d = ce("span")
	}
	d.className = "progressbar";
	if (c.text || c.hoverText) {
		e = ce("div");
		e.className = "progressbar-text";
		if (c.text) {
			var a = ce("del");
			ae(a, ct(c.text));
			ae(e, a)
		}
		if (c.hoverText) {
			var b = ce("ins");
			ae(b, ct(c.hoverText));
			ae(e, b)
		}
		ae(d, e)
	}
	e = ce("div");
	e.className = "progressbar-" + c.color;
	e.style.width = c.width + "%";
	ae(e, ct(String.fromCharCode(160)));
	ae(d, e);
	return d
}
function g_createReputationBar(g) {
	var f = g_createReputationBar.P;
	if (!g) {
		g = 0
	}
	g += 42000;
	if (g < 0) {
		g = 0
	} else {
		if (g > 84999) {
			g = 84999
		}
	}
	var e = g,
		h, b = 0;
	for (var d = 0, a = f.length; d < a; ++d) {
		if (f[d] > e) {
			break
		}
		if (d < a - 1) {
			e -= f[d];
			b = d + 1
		}
	}
	h = f[b];
	var c = {
		text: g_reputation_standings[b],
		hoverText: e + " / " + h,
		color: "rep" + b,
		width: parseInt(e / h * 100)
	};
	return g_createProgressBar(c)
}
g_createReputationBar.P = [36000, 3000, 3000, 3000, 6000, 12000, 21000, 999];

function g_createAchievementBar(b, d, a, e) {
	if (!b) {
		b = 0
	}
	var c = {
		text: b + (e > 0 ? "(+" + e + ")" : "") + (d > 0 ? " / " + d : ""),
		color: (a ? "rep7" : "ach" + (d > 0 ? 0 : 1)),
		width: (d > 0 ? parseInt(b / d * 100) : 100)
	};
	return g_createProgressBar(c)
}
function g_createCaptcha(b) {
	var a = {
		0: "en",
		2: "fr",
		3: "de",
		6: "es",
		7: "ru"
	};
	Recaptcha.create("6LeQ27oSAAAAAPhnHm4d2MSm2Cd6Qn0jYJDMHPIK", b, {
		theme: "blackglass",
		lang: a[Locale.getId()]
	})
}
function g_revealCaptcha(d, b) {
	if (g_requireCaptcha() || b) {
		var a = $("#" + d);
		if (a.length == 0 || a.has("#recaptcha_area").length != 0) {
			return
		}
		g_createCaptcha(d)
	} else {
		if (!b) {
			var a = $("#" + d);
			var c = $("<input/>", {
				type: "hidden",
				name: "skipcaptcha",
				val: 1
			});
			a.append(c)
		}
	}
}
function g_getMoneyHtml(c) {
	var b = 0,
		a = "";
	if (c >= 10000) {
		b = 1;
		a += '<span class="moneygold">' + Math.floor(c / 10000) + "</span>";
		c %= 10000
	}
	if (c >= 100) {
		if (b) {
			a += " "
		} else {
			b = 1
		}
		a += '<span class="moneysilver">' + Math.floor(c / 100) + "</span>";
		c %= 100
	}
	if (c >= 1) {
		if (b) {
			a += " "
		} else {
			b = 1
		}
		a += '<span class="moneycopper">' + c + "</span>"
	}
	return a
}
function g_getMoneyHtml2(f, c, b, a) {
	var e = g_getMoneyHtml(f);
	if (c !== undefined && c !== null && c != 0) {
		if (e.length > 0) {
			e += " "
		}
		e += '<span class="money' + (c < 0 ? "horde" : "alliance") + ' tip" onmouseover="Listview.funcBox.moneyHonorOver(event)" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()">' + g_numberFormat(Math.abs(c)) + "</span>"
	}
	if (b !== undefined && b !== null && b > 0) {
		if (e.length > 0) {
			e += " "
		}
		e += '<span class="moneyarena tip" onmouseover="Listview.funcBox.moneyArenaOver(event)" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()">' + g_numberFormat(b) + "</span>"
	}
	if (a !== undefined && a !== null && a.length > 0) {
		for (var d = 0; d < a.length; ++d) {
			if (e.length > 0) {
				e += " "
			}
			var h = a[d][0];
			var g = a[d][1];
			e += '<a href="/item=' + h + '" class="moneyitem" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + (g_items[h] && g_items[h]["icon"] ? g_items[h]["icon"] : "inv_misc_questionmark").toLowerCase() + '.gif)">' + g + "</a>"
		}
	}
	return e
}
function g_pickerWheel(a) {
	a = $E(a);
	if (a._wheelDelta < 0) {
		this.scrollTop += 27
	} else {
		this.scrollTop -= 27
	}
}
function g_setSelectedLink(c, b) {
	if (!g_setSelectedLink.groups) {
		g_setSelectedLink.groups = {}
	}
	var a = g_setSelectedLink.groups;
	if (a[b]) {
		a[b].className = a[b].className.replace("selected", "")
	}
	c.className += " selected";
	a[b] = c
}
function g_setCheckedRow(c, b) {
	if (!g_setCheckedRow.groups) {
		g_setCheckedRow.groups = {}
	}
	var a = g_setCheckedRow.groups;
	if (a[b]) {
		a[b].className = a[b].className.replace("checked", "")
	}
	c.className += " checked";
	a[b] = c
}
function g_addPages(l, b) {
	function o(q, d) {
		var i;
		if (q == b.page) {
			i = ce("span");
			i.className = "selected"
		} else {
			i = ce("a");
			i.href = (q > 1 ? b.url + b.sep + q + b.pound : b.url + b.pound)
		}
		ae(i, ct(d != null ? d : q));
		return i
	}
	if (!b.pound) {
		b.pound = ""
	}
	if (!b.sep) {
		b.sep = "."
	}
	if (b.allOrNothing && b.nPages <= 1) {
		return
	}
	var c = (b.align && b.align == "left");
	var e = ce("div"),
		k, p = ce("var");
	e.className = "pages";
	if (c) {
		e.className += " pages-left"
	}
	if (b.nPages > 1) {
		k = ce("div");
		k.className = "pages-numbers";
		var n = Math.max(2, b.page - 3);
		var h = Math.min(b.nPages - 1, b.page + 3);
		var m = [];
		if (b.page != b.nPages) {
			m.push(o(b.page + 1, LANG.lvpage_next + String.fromCharCode(8250)))
		}
		m.push(o(b.nPages));
		if (h < b.nPages - 1) {
			var a = ce("span");
			ae(a, ct("..."));
			m.push(a)
		}
		for (var g = h; g >= n; --g) {
			m.push(o(g))
		}
		if (n > 2) {
			var a = ce("span");
			ae(a, ct("..."));
			m.push(a)
		}
		m.push(o(1));
		if (b.page != 1) {
			m.push(o(b.page - 1, String.fromCharCode(8249) + LANG.lvpage_previous))
		}
		if (c) {
			m.reverse()
		}
		for (var g = 0, j = m.length; g < j; ++g) {
			ae(k, m[g])
		}
		k.firstChild.style.marginRight = "0";
		k.lastChild.style.marginLeft = "0"
	}
	var p = ce("var");
	ae(p, ct(sprintf(LANG[b.wording[b.nItems == 1 ? 0 : 1]], b.nItems)));
	if (b.nPages > 1) {
		var a = ce("span");
		ae(a, ct(String.fromCharCode(8211)));
		ae(p, a);
		var f = ce("a");
		f.className = "gotopage";
		f.href = "javascript:;";
		ns(f);
		f.onclick = function () {
			var d = prompt(sprintf(LANG.prompt_gotopage, 1, b.nPages), b.page);
			if (d != null) {
				d |= 0;
				if (d != b.page && d >= 1 && d <= b.nPages) {
					document.location.href = (d > 1 ? b.url + b.sep + d + b.pound : b.url + b.pound)
				}
			}
		};
		f.onmouseover = function (d) {
			Tooltip.showAtCursor(d, LANG.tooltip_gotopage, 0, 0, "q2")
		};
		f.onmousemove = Tooltip.cursorUpdate;
		f.onmouseout = Tooltip.hide;
		ae(p, f)
	}
	if (c) {
		ae(e, p);
		if (k) {
			ae(e, k)
		}
	} else {
		if (k) {
			ae(e, k)
		}
		ae(e, p)
	}
	ae(l, e)
}
function g_disclose(a, b) {
	b.className = "disclosure-" + (g_toggleDisplay(a) ? "on" : "off");
	return false
}
function g_setupChangeWarning(f, c, b) {
	if ($.browser.msie) {
		return
	}
	if (!f) {
		return
	}
	function e() {
		return b
	}
	f.submit(function () {
		window.onbeforeunload = null
	});
	var d = [];
	for (var a in c) {
		var g = c[a];
		if (!g) {
			continue
		}
		d[a] = g.val();
		g.keydown(function () {
			for (var h in c) {
				var i = c[h];
				if (!i) {
					continue
				}
				if (i.val() != d[h]) {
					window.onbeforeunload = e;
					return
				}
				window.onbeforeunload = null
			}
		})
	}
}
$(document).ready(function () {
	$("dfn").each(function () {
		var a = $(this).attr("title");
		$(this).attr("title", "").addClass("tip").mouseover(function (b) {
			Tooltip.showAtCursor(b, a, 0, 0, "q")
		}).mousemove(function (b) {
			Tooltip.cursorUpdate(b)
		}).mouseout(function () {
			Tooltip.hide()
		})
	})
});

function g_GetExpansionClassName(a) {
	switch (a) {
	case 0:
		return null;
	case 1:
		return "icon-bc-right";
	case 2:
		return "icon-wotlk-right";
	case 3:
		return "icon-cata-right"
	}
	return "icon-unknown" + a + "-right"
}
function UpdateProgressBar(a, c) {
	if (!b || c < 0 || c > 100) {
		return
	}
	var b = $(a);
	b.find("b").text(c + "%");
	b.find("img").css("background-position", (-120 + Math.floor(c * 1.2)) + "px 50%")
}
function g_createRange(c, a) {
	range = {};
	for (var b = c; b <= a; ++b) {
		range[b] = b
	}
	return range
}
function g_sortIdArray(a, b, c) {
	a.sort(c ?
	function (e, d) {
		return strcmp(b[e][c], b[d][c])
	} : function (e, d) {
		return strcmp(b[e], b[d])
	})
}
function g_sortJsonArray(e, d, f, a) {
	var c = [];
	for (var b in e) {
		if (d[b] && (a == null || a(d[b]))) {
			c.push(b)
		}
	}
	if (f != null) {
		c.sort(f)
	} else {
		g_sortIdArray(c, d)
	}
	return c
}
function g_urlize(b, c) {
	var a = ce("textarea");
	a.innerHTML = b.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	b = a.value;
	b = str_replace(b, " / ", "-");
	b = str_replace(b, "'", "");
	b = trim(b);
	if (c) {
		b = str_replace(b, " ", "-")
	} else {
		b = b.replace(/[^a-z0-9]/ig, "-")
	}
	b = str_replace(b, "--", "-");
	b = str_replace(b, "--", "-");
	b = rtrim(b, "-");
	b = b.replace(/[A-Z]/g, function (d) {
		return d.toLowerCase()
	});
	return b
}
function g_isDateValid(b) {
	var a = /^(20[0-2]\d)-([01]\d)-([0-3]\d) ([0-2]\d):([0-5]\d):([0-5]\d)$/.exec(b);
	return a
}
function g_isIpAddress(a) {
	return /[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/.test(a)
}
function g_isEmailValid(a) {
	return a.match(/^([a-z0-9._-]+)(\+[a-z0-9._-]+)?(@[a-z0-9.-]+\.[a-z]{2,4})$/i) != null
}
function g_getCurrentDomain() {
	if (g_getCurrentDomain.CACHE) {
		return g_getCurrentDomain.CACHE
	}
	var a = location.hostname;
	if (!g_isIpAddress(a)) {
		var b = a.split(".");
		if (b.length > 2) {
			b.splice(0, b.length - 2)
		}
		a = b.join(".")
	}
	g_getCurrentDomain.CACHE = a;
	return a
}
function g_isExternalUrl(a) {
	if (!a) {
		return false
	}
	return (a.indexOf("http") == 0 && a.indexOf(g_getCurrentDomain()) == -1)
}
function g_numberFormat(f, b, l, h) {
	var c = f,
		a = b;
	var e = function (r, q) {
		var i = Math.pow(10, q);
		return (Math.round(r * i) / i).toString()
	};
	c = !isFinite(+c) ? 0 : +c;
	a = !isFinite(+a) ? 0 : Math.abs(a);
	var p = (typeof h === "undefined") ? "," : h;
	var d = (typeof l === "undefined") ? "." : l;
	var o = (a > 0) ? e(c, a) : e(Math.round(c), a);
	var m = e(Math.abs(c), a);
	var k, g;
	if (m >= 1000) {
		k = m.split(/\D/);
		g = k[0].length % 3 || 3;
		k[0] = o.slice(0, g + (c < 0)) + k[0].slice(g).replace(/(\d{3})/g, p + "$1");
		o = k.join(d)
	} else {
		o = o.replace(".", d)
	}
	var j = o.indexOf(d);
	if (a >= 1 && j !== -1 && (o.length - j - 1) < a) {
		o += new Array(a - (o.length - j - 1)).join(0) + "0"
	} else {
		if (a >= 1 && j === -1) {
			o += d + new Array(a).join(0) + "0"
		}
	}
	return o
}
function g_createOrRegex(c) {
	c = c.replace(/(\(|\)|\|\+|\*|\?|\$|\^)/g, "\\$1");
	var e = c.split(" "),
		d = "";
	for (var b = 0, a = e.length; b < a; ++b) {
		if (b > 0) {
			d += "|"
		}
		d += e[b]
	}
	return new RegExp("(" + d + ")", "gi")
}
function g_modifyUrl(a, d, b) {
	if (!b) {
		b = $.noop
	}
	var c = "";
	if (a.match(/(#.+)$/)) {
		c = RegExp.$1;
		a = a.replace(c, "")
	}
	$.each(d, function (i, h) {
		var k;
		var e;
		var j;
		var g = a.match(new RegExp("(&|\\?)?" + i + "=?([^&]+)?"));
		if (g != null) {
			k = g[0];
			e = g[1];
			j = decodeURIComponent(g[2])
		}
		if (h == null) {
			if (!k) {
				return
			}
			j = null
		} else {
			if (h.substr(0, 2) == "+=") {
				if (j && b.onAppendCollision) {
					j = b.onAppendCollision(j, h.substr(2))
				} else {
					if (!j) {
						j = ""
					}
					j += $.trim(h.substr(2))
				}
			} else {
				j = h
			}
		}
		if (k) {
			var f = "";
			if (e) {
				f += e
			}
			if (j != null) {
				f += i;
				if (j) {
					f += "=" + urlencode2(j)
				}
			}
			a = a.replace(k, f)
		} else {
			a += (a.indexOf("?") == -1 ? "?" : "&") + i;
			if (j) {
				a += "=" + urlencode2(j)
			}
		}
	});
	a = a.replace("?&", "?");
	a = a.replace(/&&/g, "&");
	a = a.replace(/\/\?/g, "/");
	a = a.replace(/(&|\?)+$/, "");
	return a + c
}
function g_getIngameLink(a, c, b) {
	prompt(LANG.prompt_ingamelink, '/script DEFAULT_CHAT_FRAME:AddMessage("\\124c' + a + "\\124H" + c + "\\124h[" + b + ']\\124h\\124r");')
};
cO(g_items, {
	add: function (b, a) {
		if (g_items[b] != null) {
			cO(g_items[b], a)
		} else {
			g_items[b] = a
		}
	},
	getIcon: function (a) {
		if (g_items[a] != null && g_items[a].icon) {
			return g_items[a].icon
		} else {
			return "inv_misc_questionmark"
		}
	},
	createIcon: function (d, b, a, c) {
		return Icon.create(g_items.getIcon(d), b, null, "/item=" + d, a, c)
	}
});
cO(g_spells, {
	add: function (b, a) {
		if (g_spells[b] != null) {
			cO(g_spells[b], a)
		} else {
			g_spells[b] = a
		}
	},
	getIcon: function (a) {
		if (g_spells[a] != null && g_spells[a].icon) {
			return g_spells[a].icon
		} else {
			return "inv_misc_questionmark"
		}
	},
	createIcon: function (d, b, a, c) {
		return Icon.create(g_spells.getIcon(d), b, null, "/spell=" + d, a, c)
	}
});
cO(g_achievements, {
	getIcon: function (a) {
		if (g_achievements[a] != null && g_achievements[a].icon) {
			return g_achievements[a].icon
		} else {
			return "inv_misc_questionmark"
		}
	},
	createIcon: function (d, b, a, c) {
		return Icon.create(g_achievements.getIcon(d), b, null, "/achievement=" + d, a, c)
	}
});
cO(g_gatheredstatistics, {
	getIcon: function (a) {
		if (g_gatheredstatistics[a] != null && g_gatheredstatistics[a].icon) {
			return g_gatheredstatistics[a].icon
		} else {
			return "inv_misc_questionmark"
		}
	},
	createIcon: function (d, b, a, c) {
		return Icon.create(g_gatheredstatistics.getIcon(d), b, null, "/statistic=" + d, a, c)
	}
});
cO(g_classes, {
	getIcon: function (a) {
		if (g_file_classes[a]) {
			return "class_" + g_file_classes[a]
		} else {
			return "inv_misc_questionmark"
		}
	},
	createIcon: function (d, b, a, c) {
		return Icon.create(g_classes.getIcon(d), b, null, "/class=" + d, a, c)
	}
});
cO(g_races, {
	getIcon: function (b, a) {
		if (a === undefined) {
			a = 0
		}
		if (g_file_races[b] && g_file_genders[a]) {
			return "race_" + g_file_races[b] + "_" + g_file_genders[a]
		} else {
			return "inv_misc_questionmark"
		}
	},
	createIcon: function (d, b, a, c) {
		return Icon.create(g_races.getIcon(d), b, null, "/race=" + d, a, c)
	}
});
cO(g_skills, {
	getIcon: function (a) {
		if (g_skills[a] != null && g_skills[a].icon) {
			return g_skills[a].icon
		} else {
			return "inv_misc_questionmark"
		}
	},
	createIcon: function (d, b, a, c) {
		return Icon.create(g_skills.getIcon(d), b, null, "/skill=" + d, a, c)
	}
});
