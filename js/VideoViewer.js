function vi_submitAVideo() {
	tabsContribute.focus(2)
}
function vi_validateForm(b) {
	if (!b.elements.videourl.value.length) {
		alert(LANG.message_novideo);
		return false
	}
	var c = false;
	for (var a in vi_sitevalidation) {
		if (b.elements.videourl.value.match(vi_sitevalidation[a])) {
			c = true;
			break
		}
	}
	if (!c) {
		alert(LANG.message_novideo);
		return false
	}
	return true
}
function vi_appendSticky() {
	var i = ge("infobox-sticky-vi");
	var f = g_pageInfo.type;
	var e = g_pageInfo.typeId;
	var g = in_array(lv_videos, 1, function (a) {
		return a.sticky
	});
	if (g != -1) {
		var c = lv_videos[g];
		var h = ce("a");
		h.href = "#videos:id=" + c.id;
		h.onclick = function (a) {
			VideoViewer.show({
				videos: lv_videos,
				pos: g
			});
			return rf2(a)
		};
		var d = ce("img");
		d.src = sprintf(vi_thumbnails[c.videoType], c.videoId);
		d.className = "border";
		ae(h, d);
		ae(i, h);
		var b = $("#infobox-videos");
		if (!b) {
			var j = $("th", i.parentNode);
			b = j[j.length - (lv_videos && lv_videos.length ? 2 : 1)]
		}
		b.append(" (" + lv_videos.length + ")").wrapInner($('<a href="#videos"></a>').click(function () {
			tabsRelated.focus(-1);
			return false
		}))
	} else {
		if (g_user && g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_VIDEO)) {
			var h;
			if (g_user.id > 0) {
				h = '<a href="javascript:;" onclick="vi_submitAVideo(); return false">'
			} else {
				h = '<a href="/account=signin">'
			}
			i.innerHTML = sprintf(LANG.infobox_noneyet, h + LANG.infobox_suggestone + "</a>")
		} else {
			$("#infobox-videos,#infobox-sticky-vi").closest("tr").css("display", "none")
		}
	}
}
var g_videos = [];
var VideoViewer = new
function () {
	var d, k, c, C, G, p, q = 0,
		v, h, D, a, o, i, z, B, u, g, w, j;

	function f() {
		var J = d[k];
		var H = Math.max(j.offsetHeight - 18, 0),
			I = Math.max(50, Math.min(520, g_getWindowSize().h - 72 - H)),
			K = Math.min(1, I / 520);
		c = Math.round(K * 880);
		C = Math.round(K * 520);
		z.style.height = B.style.height = u.style.height = (C - 95) + "px";
		Lightbox.setSize(Math.max(480, c) + 20, C + 52 + H + (D ? 96 : 0))
	}
	function b(J) {
		var H = d[J],
			I = "#videos:";
		if (q == 0) {
			I += "id=" + H.id
		} else {
			I += v + ":" + (J + 1)
		}
		return I
	}
	function t(I) {
		if (I && (G == 1) && g_getWindowSize().h > a.offsetHeight) {
			return
		}
		a.style.visibility = "hidden";
		var J = d[k];
		f();
		if (!I) {
			g_trackEvent("Videos", "Show", J.id + (J.caption.length ? " (" + J.caption + ")" : ""));
			if (J.videoType == 1) {
				i.innerHTML = Markup.toHtml("[youtube=" + J.videoId + " width=" + c + " height=" + C + " autoplay=true]")
			}
			g.href = sprintf(vi_siteurls[J.videoType], J.videoId);
			if (!J.user && typeof g_pageInfo == "object") {
				J.user = g_pageInfo.username
			}
			var O = (J.date && J.user),
				N = (d.length > 1);
			if (O) {
				var M = new Date(J.date),
					Q = (g_serverTime - M) / 1000;
				var P = w.firstChild.childNodes[1];
				P.href = "/user=" + J.user;
				P.innerHTML = J.user;
				var S = w.firstChild.childNodes[3];
				ee(S);
				Listview.funcBox.coFormatDate(S, Q, M);
				w.firstChild.style.display = ""
			} else {
				w.firstChild.style.display = "none"
			}
			var S = w.childNodes[1];
			ee(S);
			S = w.childNodes[2];
			if (N) {
				var R = "";
				if (J.user) {
					R = LANG.dash
				}
				R += (k + 1) + LANG.lvpage_of + d.length;
				S.innerHTML = R;
				S.style.display = ""
			} else {
				S.style.display = "none"
			}
			w.style.display = (O || N ? "" : "none");
			var H = (J.caption != null && J.caption.length);
			var K = (J.subject != null && J.subject.length && J.type && J.typeId);
			if (H || K) {
				var L = "";
				if (K) {
					L += LANG.types[J.type][0] + LANG.colon;
					L += '<a href="/' + g_types[J.type] + "=" + J.typeId + '">';
					L += J.subject;
					L += "</a>"
				}
				if (H) {
					if (K) {
						L += LANG.dash
					}
					L += (J.noMarkup ? J.caption : Markup.toHtml(J.caption, {
						mode: Markup.MODE_SIGNATURE
					}))
				}
				j.innerHTML = L;
				j.style.display = ""
			} else {
				j.style.display = "none"
			}
			if (d.length > 1) {
				z.href = b(r(-1));
				B.href = b(r(1));
				z.style.display = B.style.display = "";
				u.style.display = "none"
			} else {
				z.style.display = B.style.display = "none";
				u.style.display = ""
			}
			location.replace(b(k))
		} else {
			$("object, embed", i).each(function () {
				this.width = c;
				this.height = C
			})
		}
		Lightbox.reveal();
		a.style.visibility = "visible";
		setTimeout(m, 1)
	}
	function r(H) {
		var I = k;
		I += H;
		if (I < 0) {
			I = d.length - 1
		} else {
			if (I >= d.length) {
				I = 0
			}
		}
		return I
	}
	function A() {
		k = r(-1);
		t();
		return false
	}
	function E() {
		k = r(1);
		t();
		return false
	}
	function m() {
		if (h) {
			document.title = h
		}
	}
	function n(H) {
		H = $E(H);
		switch (H.keyCode) {
		case 37:
			A();
			break;
		case 39:
			E();
			break
		}
	}
	function e() {
		t(1)
	}
	function l() {
		ee(i);
		if (d.length > 1) {
			dE(document, "keyup", n)
		}
		if (p && q == 0) {
			if (p.indexOf(":id=") != -1) {
				p = "#videos"
			}
			location.replace(p)
		} else {
			location.replace("#.")
		}
		m()
	}
	function F(H, M, I) {
		if (typeof I.videos == "string") {
			d = g_videos[I.videos];
			q = 1;
			v = I.videos
		} else {
			d = I.videos;
			q = 0;
			v = null
		}
		a = H;
		k = 0;
		if (I.pos && I.pos >= 0 && I.pos < d.length) {
			k = I.pos
		}
		if (M) {
			H.className = "screenshotviewer";
			o = ce("div");
			o.className = "screenshotviewer-screen";
			z = ce("a");
			B = ce("a");
			z.className = "screenshotviewer-prev";
			B.className = "screenshotviewer-next";
			z.href = "javascript:;";
			B.href = "javascript:;";
			var O = ce("span");
			ae(O, ce("b"));
			ae(z, O);
			var O = ce("span");
			ae(O, ce("b"));
			ae(B, O);
			z.onclick = A;
			B.onclick = E;
			u = ce("a");
			u.className = "screenshotviewer-cover";
			u.href = "javascript:;";
			u.onclick = Lightbox.hide;
			var O = ce("span");
			ae(O, ce("b"));
			ae(u, O);
			ae(o, z);
			ae(o, B);
			ae(o, u);
			i = ce("div");
			ae(o, i);
			ae(H, o);
			var N = ce("a");
			N.className = "screenshotviewer-close";
			N.href = "javascript:;";
			N.onclick = Lightbox.hide;
			ae(N, ce("span"));
			ae(H, N);
			g = ce("a");
			g.className = "screenshotviewer-original";
			g.href = "javascript:;";
			g.target = "_blank";
			ae(g, ce("span"));
			ae(H, g);
			w = ce("div");
			w.className = "screenshotviewer-from";
			var K = ce("span");
			ae(K, ct(LANG.lvscreenshot_from));
			ae(K, ce("a"));
			ae(K, ct(" "));
			ae(K, ce("span"));
			ae(w, K);
			ae(w, ce("span"));
			ae(w, ce("span"));
			ae(H, w);
			j = ce("div");
			j.className = "screenshotviewer-caption";
			ae(H, j);
			var L = ce("div");
			L.className = "clear";
			ae(H, L);
			if (I.displayAd) {
				L.style.paddingBottom = "4px";
				L = ce("div");
				L.id = "videoviewer-ad";
				L.style.paddingBottom = "10px";
				L.style.margin = "0px auto";
				ae(H, L);
				D = true
			}
		}
		var J = ge("videoviewer-ad");
		if (!M && J) {
			ee(J)
		}
		if (I.displayAd && J) {
			Ads.fillSpot("leaderboard", J)
		}
		p = location.hash;
		if (d.length > 1) {
			aE(document, "keyup", n)
		}
		t()
	}
	this.checkPound = function () {
		h = $("title").html();
		if (location.hash && location.hash.indexOf("#videos") == 0) {
			if (!g_listviews.videos) {
				var I = location.hash.split(":");
				if (I.length == 3) {
					var J = g_videos[I[1]],
						H = parseInt(I[2]);
					if (J && H >= 1 && H <= J.length) {
						VideoViewer.show({
							videos: I[1],
							pos: H - 1,
							displayAd: true
						})
					}
				}
			}
		}
	};
	this.show = function (H) {
		Lightbox.show("videoviewer", {
			onShow: F,
			onHide: l,
			onResize: e
		},
		H);
		return false
	};
	$(document).ready(this.checkPound)
};
