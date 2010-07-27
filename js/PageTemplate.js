var PageTemplate = new
function () {
	var r = this;
	r.init = function () {
		n();
		j();
		v();
		f();
		o();
		i();
		a();
		$(document).ready(z);
		A = true
	};
	r.get = function (F) {
		return c[F]
	};
	r.set = function (G) {
		if (!G) {
			return
		}
		var F = {};
		$.extend(F, c);
		$.extend(c, G);
		c.activeTab = parseInt(c.activeTab);
		if (A) {
			if (c.activeTab != F.activeTab) {
				b();
				q()
			}
			if (c.breadcrumb != F.breadcrumb) {
				m()
			}
		}
	};
	r.getBreadcrumb = function () {
		return B
	};
	r.updateBreadcrumb = function () {
		m()
	};
	r.expandBreadcrumb = function () {
		return p()
	};
	var A = false;
	var c = {};
	var B;
	var d;
	var g = [];

	function E() {
		w();
		k()
	}
	function w() {
		B = $('<div class="breadcrumb"></div>')
	}
	function k() {
		if (Browser.ie6) {
			$(document.documentElement).addClass("ie6 ie67 ie678")
		}
		if (Browser.ie7) {
			$(document.documentElement).addClass("ie7 ie67 ie678")
		}
		if (Browser.ie8) {
			$(document.documentElement).addClass("ie8 ie678")
		}
	}
	function n() {
		var F = $("#toplinks-user");
		if (!F.length) {
			return
		}
		F.attr("href", "/user=" + g_user.name);
		var J = [];
		var I = ["user-page", LANG.userpage, "/user=" + g_user.name, null, {
			checkedUrl: new RegExp("user=" + g_user.name + "$", "i")
		}];
		J.push(I);
		var G = ["settings", LANG.settings, "https://" + window.location.hostname + "/account", null, {
			icon: g_staticUrl + "/images/icons/cog.gif",
			checkedUrl: /account/i
		}];
		J.push(G);
		l(J);
		h(J);
		var H;
		if (!g_user.premium) {
			H = ["premium-upgarde", LANG.premiumupgrade, "/premium", null, {
				className: "q7",
				checkedUrl: /premium/i
			}];
			J.push(H)
		}
		J.push(["sign-out", LANG.signout, "/account=signout"]);
		Menu.add(F, J);
		F.addClass("hassubmenu")
	}
	function l(G) {
		if (!g_user.characters || !g_user.characters.length) {
			return
		}
		var F = ["characters", LANG.tab_characters, "/user=" + g_user.name + "#characters", null, {
			onBeforeShow: C
		}];
		G.push(F)
	}
	function h(F) {
		if (!g_user.profiles || !g_user.profiles.length) {
			return
		}
		var G = ["profiles", LANG.tab_profiles, "/user=" + g_user.name + "#profiles", null, {
			onBeforeShow: e
		}];
		F.push(G)
	}
	function C(G) {
		var F = [];
		g_user.characters.sort(function (J, I) {
			return strcmp(J.realmname, I.realmname) || strcmp(J.region, I.region) || strcmp(J.name, I.name)
		});
		var H;
		$.each(g_user.characters, function (I, L) {
			var K = L.region + L.realm;
			if (K != H) {
				var M = [, L.realmname + " (" + L.region.toUpperCase() + ")", g_getProfileRealmUrl(L)];
				F.push(M);
				H = K
			}
			var J = [L.id, L.name, g_getProfileUrl(L), null, {
				className: "c" + L.classs,
				tinyIcon: g_getProfileIcon(L)
			}];
			F.push(J)
		});
		G[MENU_IDX_SUB] = F
	}
	function e(G) {
		var F = [];
		g_user.profiles.sort(function (I, H) {
			return strcmp(I.name, H.name)
		});
		$.each(g_user.profiles, function (H, J) {
			var I = [J.id, J.name, g_getProfileUrl(J), null, {
				className: "c" + J.classs,
				tinyIcon: g_getProfileIcon(J)
			}];
			F.push(I)
		});
		F.push([0, LANG.menu_newprofile, "/profile&new", null, {
			tinyIcon: "inv_misc_questionmark"
		}]);
		G[MENU_IDX_SUB] = F
	}
	function j() {
		$("#toplinks-feedback").attr("href", "javascript:;").click(function () {
			ContactTool.show()
		})
	}
	function v() {
		var G = "http://";
		var J = location.pathname + location.search + location.hash;
		var F = Locale.getId();
		var I = [];
		var H;
		$.each(Locale.getAllByName(), function (K, M) {
			var L = [M.id, M.description, G + M.domain + J];
			if (M.id == F) {
				L.checked = true;
				H = M
			}
			I.push(L)
		});
		D($("#toplinks-language"), I, H);
		$(document).ready(function () {
			D($("#footer-links-language"), I, H)
		})
	}
	function D(F, H, G) {
		F.attr("href", "javascript:;");
		F.text(G.description);
		F.addClass("hassubmenu");
		Menu.add(F, H)
	}
	function f() {
		$("#header-expandsite").attr("href", "javascript:;").click(u)
	}
	function z() {
		var F = Facebook.getCurrentOpenGraphUrl();
		if (F && !B.is(":empty") && !{
			blog: 1
		} [c.pageName]) {
			$("<div></div>", {
				className: "header-facebook-like"
			}).append(Facebook.createLikeButton(F, {
				simple: true
			})).appendTo($("#wrapper-right"))
		}
	}
	function o() {
		var F = $("#toptabs");
		if (!F.length) {
			return
		}
		d = $("<dl/>");
		$.each(mn_path, function (G, H) {
			var I = $("<dt><a><span><big>" + H[MENU_IDX_NAME].charAt(0) + "</big>" + H[MENU_IDX_NAME].substr(1) + "</span></a></dt>");
			var J = I.children("a");
			Menu.linkifyItem(H, J);
			I.appendTo(d)
		});
		b();
		d.appendTo(F)
	}
	function i() {
		var F = $("#topbar");
		if (!F.length) {
			return
		}
		var G = $("div.topbar-search", F);
		$("<a></a>").attr("href", "javascript:;").click(t).appendTo(G);
		$("form", G).submit(g_preventEmptyFormSubmission);
		LiveSearch.attach($("input", G));
		q()
	}
	function a() {
		m();
		B.appendTo($("#main-precontents"))
	}
	function b() {
		if (!d) {
			return
		}
		var F = $("a", d);
		$.each(mn_path, function (G, I) {
			var J = $(F.get(G));
			var H = (I[MENU_IDX_ID] == c.activeTab);
			if (H) {
				J.addClass("active");
				Menu.remove(J)
			} else {
				J.removeClass("active");
				if (I[MENU_IDX_SUB]) {
					Menu.add(J, I[MENU_IDX_SUB])
				}
			}
		})
	}
	function q() {
		var G = $("#topbar div.topbar-buttons");
		if (!G.length) {
			return
		}
		G.empty();
		switch (c.activeTab) {
		case 0:
			Menu.addButtons(G, [
				[0, LANG.menu_browse, null, mn_database], Menu.findItem(mn_tools, [8]), Menu.findItem(mn_tools, [8, 4])]);
			break;
		case 1:
			var F = [
				[, LANG.calculators], Menu.findItem(mn_tools, [0]), Menu.findItem(mn_tools, [2]), Menu.findItem(mn_tools, [3])];
			Menu.addButtons(G, Menu.implode(F));
			Menu.addButtons(G, Menu.implode(mn_tools.slice(3)));
			break;
		case 2:
			Menu.addButtons(G, Menu.implode(mn_more));
			break;
		case 3:
			Menu.addButtons(G, Menu.implode(mn_community));
			Menu.addButtons(G, [Menu.findItem(mn_tools, [8])]);
			break;
		case 4:
			Menu.addButtons(G, Menu.implode(mn_staff));
			break
		}
	}
	function m() {
		if (!c.breadcrumb || !c.breadcrumb.length) {
			B.hide();
			return
		}
		B.empty();
		if (g.length) {
			$.each(g, function () {
				this.checked = false;
				Menu.updateItem(this)
			});
			g = []
		}
		var F = Menu.getFullPath(mn_path, c.breadcrumb);
		if (!F.length) {
			return
		}
		var G = (F.length - 1);
		$.each(F, function (H, L) {
			var K = Menu.getItemOpt(L);
			L.checked = true;
			g.push(L);
			Menu.updateItem(L);
			var J = p();
			var I = J;
			if (L[MENU_IDX_URL]) {
				I = $("<a/>", {
					href: Menu.getItemUrl(L)
				}).appendTo(J)
			}
			if (K.breadcrumb) {
				I.text(K.breadcrumb)
			} else {
				I.text(L[MENU_IDX_NAME])
			}
			Menu.add(I, L.parentMenu);
			J.appendTo(B);
			if (H == G && L[MENU_IDX_SUB]) {
				J.addClass("breadcrumb-arrow");
				var M = $('<span class="breadcrumb-ellipsis">...</span>');
				Menu.add(M, L[MENU_IDX_SUB]);
				M.appendTo(B)
			}
		});
		B.trigger("update");
		B.show()
	}
	function p() {
		B.children("span:last").addClass("breadcrumb-arrow");
		return $("<span/>").appendTo(B)
	}
	function u() {
		Ads.removeAll();
		$("#sidebar, #header-expandsite").remove();
		if ($("#layout").hasClass("nosidebar")) {
			return
		}
		$("#wrapper").animate({
			"margin-right": "10px"
		},
		333, null, function () {
			$("#wrapper").css("margin-right", "0px");
			$("#layout").addClass("nosidebar")
		})
	}
	function t() {
		$(this).prev("form").submit().children("input").focus()
	}
	E()
};

