var MENU_IDX_ID = 0;
var MENU_IDX_NAME = 1;
var MENU_IDX_URL = 2;
var MENU_IDX_SUB = 3;
var MENU_IDX_OPT = 4;
var Menu = new
function () {
	var l = this;
	l.add = function (ao, ap, an) {
		if (!an) {
			an = $.noop
		}
		var am = $(ao);
		am.data("menu", ap);
		if (an.showAtCursor) {
			am.click(aj)
		} else {
			am.mouseover(w).mouseout(n)
		}
	};
	l.remove = function (am) {
		$(am).data("menu", null).unbind("click", aj).unbind("mouseover", w).unbind("mouseout", n)
	};
	l.show = function (ao, an) {
		var am = $(an);
		W(ao, am)
	};
	l.showAtCursor = function (an, am) {
		B(an, am.pageX, am.pageY)
	};
	l.showAtXY = function (an, am, ao) {
		B(an, am, ao)
	};
	l.hide = function () {
		n()
	};
	l.addButtons = function (am, ao) {
		var ap = $(am);
		if (!ap.length) {
			return
		}
		var an = $('<span class="menu-buttons"></span>');
		$.each(ao, function (aq, at) {
			if (ag(at)) {
				return
			}
			var au = $("<a></a>");
			var ar = $("<span></span>", {
				text: at[MENU_IDX_NAME]
			}).appendTo(au);
			l.linkifyItem(at, au);
			if (P(at)) {
				ar.addClass("hassubmenu");
				l.add(au, at[MENU_IDX_SUB])
			}
			an.append(au)
		});
		ap.append(an)
	};
	l.linkifyItem = function (am, ap) {
		var ao = l.getItemOpt(am);
		if (!am[MENU_IDX_URL]) {
			ap.attr("href", "javascript:;");
			ap.addClass("unlinked");
			return
		}
		if (typeof am[MENU_IDX_URL] == "function") {
			ap.attr("href", "javascript:;");
			ap.click(ad);
			ap.click(am[MENU_IDX_URL])
		} else {
			var an = l.getItemUrl(am);
			ap.attr("href", an);
			if (ao.newWindow || g_isExternalUrl(an)) {
				ap.attr("target", "_blank")
			}
			if (ao.rel) {
				ap.attr("rel", ao.rel)
			}
		}
	};
	l.updateItem = function (an) {
		var ap = an.$a;
		if (!ap) {
			return
		}
		var ao = l.getItemOpt(an);
		ap.removeClass("checked tinyicon icon");
		ap.css("background-image", "");
		if (an.checked) {
			ap.addClass("checked")
		} else {
			if (ao.tinyIcon) {
				ap.addClass("tinyicon");
				ap.css("background-image", "url(" + g_staticUrl + "/images/wow/icons/tiny/" + ao.tinyIcon.toLowerCase() + ".gif)")
			} else {
				if (ao.icon) {
					ap.addClass("icon");
					ap.css("background-image", "url(" + ao.icon + ")")
				} else {
					if (ao.socketColor && g_file_gems[ao.socketColor]) {
						ap.addClass("socket-" + g_file_gems[ao.socketColor])
					}
				}
			}
		}
		var am = (ao["class"] || ao.className);
		if (am) {
			ap.addClass(am)
		}
	};
	l.hasMenu = function (an) {
		var am = $(an);
		return am.data("menu") != null
	};
	l.modifyUrl = function (am, ap, ao) {
		var an = {
			params: ap,
			opt: ao
		};
		p(am, function (aq) {
			aq.modifyUrl = an
		});
		PageTemplate.updateBreadcrumb()
	};
	l.fixUrls = function (ao, am, an) {
		an = an || {};
		an.hash = (an.hash ? "#" + an.hash : "");
		f(ao, am, an, 0)
	};
	l.sort = function (am) {
		if (T(am)) {
			Q(am)
		} else {
			h(am)
		}
	};
	l.sortSubmenus = function (an, am) {
		$.each(am, function (ao, aq) {
			var ap = l.findItem(an, aq);
			if (ap && ap[MENU_IDX_SUB]) {
				l.sort(ap[MENU_IDX_SUB])
			}
		})
	};
	l.implode = function (ap, am) {
		if (!am) {
			am = $.noop
		}
		var ao = [];
		var an;
		if (am.createHeadinglessGroup) {
			an = [];
			ao.push([0, "", null, an])
		}
		$.each(ap, function (aq, ar) {
			if (ag(ar)) {
				an = [];
				ao.push([0, ar[MENU_IDX_NAME], null, an])
			} else {
				if (an) {
					an.push(ar)
				} else {
					ao.push(ar)
				}
			}
		});
		return ao
	};
	l.findItem = function (an, am) {
		return l.getFullPath(an, am).pop()
	};
	l.getFullPath = function (aq, ap) {
		var ao = [];
		for (var an = 0; an < ap.length; ++an) {
			var ar = X(aq, ap[an]);
			if (ar != -1) {
				var am = aq[ar];
				am.parentMenu = aq;
				aq = am[MENU_IDX_SUB];
				ao.push(am)
			}
		}
		return ao
	};
	l.getItemUrl = function (am) {
		var an = am[MENU_IDX_URL];
		if (!an) {
			return null
		}
		var ao = l.getItemOpt(am);
		if (am.modifyUrl) {
			an = g_modifyUrl(an, am.modifyUrl.params, am.modifyUrl.opt)
		}
		return an
	};
	l.getItemOpt = function (am) {
		if (!am[MENU_IDX_OPT]) {
			am[MENU_IDX_OPT] = {}
		}
		return am[MENU_IDX_OPT]
	};
	l.removeItemById = function (am, ao) {
		var an = X(am, ao);
		if (an != -1) {
			am.splice(an, 1)
		}
	};
	var Y = 25;
	var M = 333;
	var g = 4;
	var t = 6;
	var U = 6;
	var R = 3;
	var H = 26;
	var o = false;
	var L;
	var C;
	var O = {};
	var J = {};
	var c = {};
	var k = {};
	var N = 0;

	function ah() {
		if (o) {
			return
		}
		o = true;
		var am = $('<div class="menu"><a href="#"><span>ohai</span></a></div>').css({
			left: "-1000px",
			top: "-1000px"
		}).appendTo(document.body);
		var an = am.children("a").outerHeight();
		am.remove();
		if (an > 15) {
			H = an
		}
	}
	function W(an, am) {
		if (C) {
			C.removeClass("open")
		}
		C = am;
		C.addClass("open");
		d(an)
	}
	function ad() {
		if (C) {
			C.removeClass("open");
			C = null
		}
		j(0)
	}
	function B(an, am, ao) {
		clearTimeout(L);
		d(an, am, ao)
	}
	function d(an, am, ao) {
		af(0);
		q(an, 0, am, ao);
		j(1)
	}
	function q(ao, aq, av, au) {
		ah();
		S(ao);
		var ar = Z(aq);
		var an = ai(ao);
		var am = u(an, aq);
		ar.append(am);
		var ap = !K(aq);
		O[aq] = ar;
		var at = I(ar, aq, av, au);
		ar.css({
			left: at.x + "px",
			top: at.y + "px"
		});
		var aw = g_createRect(at.x, at.y, ar.width(), ar.height());
		Ads.intersect(aw, true);
		z(ar, ap)
	}
	function Z(an) {
		if (c[an]) {
			var am = c[an];
			am.children().detach();
			return am
		}
		var am = $('<div class="menu"></div>').mouseover(V).mouseleave(i).delegate("a", "mouseenter", {
			depth: an
		},
		D).delegate("a", "click", r).hide().appendTo(document.body);
		c[an] = am;
		return am
	}
	function ai(ap) {
		var an = b(ap);
		if (k[an]) {
			return k[an]
		}
		var aq;
		var am = [];
		$.each(ap, function (ar, at) {
			if (!G(at)) {
				return
			}
			$a = F(at);
			if (ag(at)) {
				aq = $a;
				return
			}
			if (aq) {
				am.push(aq);
				aq = null
			}
			am.push($a)
		});
		var ao = $(am);
		k[ap] = ao;
		return ao
	}
	function F(an) {
		ak(an);
		var ao = $("<a></a>");
		an.$a = ao;
		ao.data("menuItem", an);
		l.linkifyItem(an, ao);
		l.updateItem(an);
		if (ag(an)) {
			ao.addClass("separator");
			ao.text(an[MENU_IDX_NAME]);
			return ao
		}
		var am = $("<span></span>");
		am.text(an[MENU_IDX_NAME]);
		am.appendTo(ao);
		if (P(an)) {
			am.addClass("hassubmenu")
		}
		return ao
	}
	function u(am, aw) {
		var aA = am.length;
		var aq = $(window).height() - (R * 2) - U;
		var av = Math.floor(aq / H);
		if (av >= aA || aw == 0) {
			var ay = $('<div class="menu-outer"></div>');
			var an = $('<div class="menu-inner"></div>');
			am.appendTo(an);
			ay.append(an);
			return ay
		}
		var ap = Math.min(g, Math.ceil(aA / av));
		var az = Math.ceil(aA / ap);
		var ar = 0;
		var aB = aA;
		var at = $("<div></div>");
		while (aB > 0) {
			var ay = $('<div class="menu-outer"></div>');
			var an = $('<div class="menu-inner"></div>');
			var ax = Math.min(aB, az);
			var ao = ar;
			var au = ao + ax;
			am.slice(ao, au).appendTo(an);
			ay.append(an);
			at.append(ay);
			ar += ax;
			aB -= ax
		}
		return at
	}
	function I(an, ao, am, ap) {
		if (ao == 0) {
			return aa(an, ao, am, ap)
		}
		return m(an, ao)
	}
	function aa(aw, ar, az, ay) {
		var av = g_getViewport();
		var an = aw.width();
		var at = aw.height();
		var ap = an + t;
		var am = at + U;
		var au = (az != null && ay != null);
		if (au) {
			if (ay + am > av.b) {
				ay = Math.max(av.t, av.b - am)
			}
		} else {
			var ao = C;
			var aq = ao.offset();
			var ax = false;
			az = aq.left;
			ay = aq.top + ao.outerHeight();
			if (ay + am > av.b && aq.top >= am) {
				ay = aq.top - am
			}
			var aA = g_createRect(az, ay, ap, am);
			if (Ads.intersect(aA)) {
				ax = true
			}
			if (ax) {
				az = aq.left + ao.outerWidth() - an
			}
		}
		if (az + ap > av.r) {
			az = Math.max(av.l, av.r - ap)
		}
		return {
			x: az,
			y: ay
		}
	}
	function m(av, ar) {
		var au = g_getViewport();
		var an = av.width();
		var at = av.height();
		var ap = an + t;
		var am = at + U;
		var ao = J[ar - 1];
		var aq = ao.offset();
		var aw = false;
		x = aq.left + ao.outerWidth() - 5;
		y = aq.top - 2;
		if (x + ap > au.r) {
			aw = true
		}
		if (aw) {
			x = Math.max(au.l, aq.left - an)
		}
		if (y + am > au.b) {
			y = Math.max(au.t, au.b - am)
		}
		return {
			x: x,
			y: y
		}
	}
	function z(an, am) {
		if (am) {
			an.css({
				opacity: "0"
			}).show().animate({
				opacity: "1"
			},
			"fast", null, ab)
		} else {
			an.show()
		}
	}
	function ab(am) {
		$(this).css("opacity", "")
	}
	function j(am) {
		while (O[am]) {
			O[am].stop().hide();
			O[am] = null;
			++am
		}
		if (!O[0]) {
			Ads.restoreHidden()
		}
	}
	function af(am) {
		while (J[am]) {
			J[am].removeClass("open");
			J[am] = null;
			++am
		}
	}
	function K(am) {
		return O[am || 0] != null
	}
	function al(am) {
		return am[MENU_IDX_ID]
	}
	function ag(am) {
		return am[MENU_IDX_ID] == null
	}
	function T(am) {
		return in_array(am, true, ag) != -1
	}
	function P(am) {
		return am[MENU_IDX_SUB] != null
	}
	function X(am, an) {
		return in_array(am, an, al)
	}
	function e(am) {
		var an = l.getItemOpt(am);
		if (an.requiredAccess && !User.hasPermissions(an.requiredAccess)) {
			return false
		}
		return true
	}
	function G(am) {
		if (!e(am)) {
			return false
		}
		if (P(am)) {
			if (!a(am[MENU_IDX_SUB])) {
				return false
			}
		}
		return true
	}
	function a(am) {
		return in_array(am, true, E) != -1
	}
	function E(am) {
		return !ag(am) && e(am)
	}
	function b(am) {
		if (am.uniqueId == null) {
			am.uniqueId = N++
		}
		return am.uniqueId
	}
	function A(an, am) {
		$.each(an, function (ao, ap) {
			p(ap, am)
		})
	}
	function p(am, an) {
		an(am);
		if (P(am)) {
			A(am[MENU_IDX_SUB], an)
		}
	}
	function f(ap, am, an, ao) {
		$.each(ap, function (ar, at) {
			if (ag(at)) {
				return
			}
			if (at[MENU_IDX_URL] == null) {
				at[MENU_IDX_URL] = am + at[MENU_IDX_ID] + an.hash
			}
			if (P(at)) {
				var aq = true;
				if (an.useSimpleIds) {
					aq = false
				} else {
					if (an.useSimpleIdsAfter != null && ao >= an.useSimpleIdsAfter) {
						aq = false
					}
				}
				var au = am;
				if (aq) {
					au += at[MENU_IDX_ID] + "."
				}
				f(at[MENU_IDX_SUB], au, an, ao + 1)
			}
		})
	}
	function h(am) {
		am.sort(function (ao, an) {
			return strcmp(ao[MENU_IDX_NAME], an[MENU_IDX_NAME])
		})
	}
	function Q(an) {
		var am = l.implode(an, {
			createHeadinglessGroup: true
		});
		$.each(am, function (ao, ap) {
			h(ap[MENU_IDX_SUB])
		});
		v(an, am)
	}
	function v(an, am) {
		an.splice(0, an.length);
		$.each(am, function (ao, ap) {
			if (ap[MENU_IDX_NAME]) {
				an.push([, ap[MENU_IDX_NAME]])
			}
			$.each(ap[MENU_IDX_SUB], function (aq, ar) {
				an.push(ar)
			})
		})
	}
	function ak(am) {
		var an = l.getItemOpt(am);
		if (an.checkedUrl && location.href.match(an.checkedUrl)) {
			am.checked = true
		}
	}
	function S(am) {
		if (am.onBeforeShow) {
			am.onBeforeShow(am)
		}
		$.each(am, function (an, ao) {
			var ap = l.getItemOpt(ao);
			if (ap.onBeforeShow) {
				ap.onBeforeShow(ao)
			}
		})
	}
	function w(an) {
		clearTimeout(L);
		var am = $(this);
		if (!K()) {
			L = setTimeout(W.bind(null, am.data("menu"), am), Y);
			return
		}
		W(am.data("menu"), am)
	}
	function n(am) {
		clearTimeout(L);
		if (K()) {
			L = setTimeout(ad, M)
		}
	}
	function aj(am) {
		clearTimeout(L);
		l.showAtCursor($(this).data("menu"), am)
	}
	function V(am) {
		clearTimeout(L)
	}
	function i(am) {
		clearTimeout(L);
		L = setTimeout(ad, M)
	}
	function D(an) {
		clearTimeout(L);
		var ao = $(this);
		var ap = an.data.depth;
		af(ap);
		var am = ao.data("menuItem");
		var aq = ap;
		if (am && P(am)) {
			ao.addClass("open");
			J[ap] = ao;
			q(am[MENU_IDX_SUB], ap + 1);
			++aq
		}
		j(aq + 1)
	}
	function r(ao) {
		var ap = $(this);
		var am = ap.data("menuItem");
		if (!am) {
			return
		}
		var an = l.getItemOpt(am);
		if (an.onClick) {
			an.onClick()
		}
	}
};
Menu.fixUrls(mn_achievements, "/achievements=", {
	useSimpleIds: true
});
Menu.fixUrls(mn_classes, "/class=");
Menu.fixUrls(mn_factions, "/factions=");
Menu.fixUrls(mn_forums, "/forums?board=", {
	useSimpleIds: true
});
Menu.fixUrls(mn_items, "/items=");
Menu.fixUrls(mn_itemSets, "/itemsets?filter=cl=", {
	hash: "0-2+1"
});
Menu.fixUrls(mn_npcs, "/npcs=");
Menu.fixUrls(mn_objects, "/objects=");
Menu.fixUrls(mn_petCalc, "/petcalc=");
Menu.fixUrls(mn_pets, "/pets=");
Menu.fixUrls(mn_quests, "/quests=");
Menu.fixUrls(mn_races, "/race=");
Menu.fixUrls(mn_spells, "/spells=");
Menu.fixUrls(mn_statistics, "/statistics=", {
	useSimpleIds: true
});
Menu.fixUrls(mn_titles, "/titles=");
Menu.fixUrls(mn_zones, "/zones=");
$(document).ready(function () {
	if (Locale.getId() == LOCALE_ENUS) {
		return
	}
	Menu.sort(mn_classes);
	Menu.sort(mn_database);
	Menu.sortSubmenus(mn_forums, [
		[-2]]);
	Menu.sortSubmenus(mn_items, [
		[4, 1],
		[4, 2],
		[4, 3],
		[4, 4],
		[1],
		[0],
		[16],
		[7],
		[6],
		[11],
		[9]]);
	Menu.sort(mn_itemSets);
	Menu.sort(mn_npcs);
	Menu.sort(mn_objects);
	Menu.sort(mn_talentCalc);
	Menu.sort(mn_petCalc);
	Menu.sort(mn_pets);
	Menu.sort(mn_races);
	Menu.sort(mn_skills);
	Menu.sortSubmenus(mn_spells, [
		[7],
		[-2],
		[-3],
		[11],
		[9]])
});
