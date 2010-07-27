var g_screenshots = {};
var ScreenshotViewer = new
function () {
	var G, m, e, E, J, c, r, u = 0,
		A, b, q, k, C, D, z, h, B, l, o, F;

	function g(K) {
		var N = G[m];
		var L = Math.max(50, Math.min(618, g_getWindowSize().h - 72 - K));
		if (u != 1 || N.id || N.resize) {
			c = Math.min(772 / N.width, 618 / N.height);
			J = Math.min(772 / N.width, L / N.height)
		} else {
			c = J = 1
		}
		if (c > 1) {
			c = 1
		}
		if (J > 1) {
			J = 1
		}
		e = Math.round(J * N.width);
		E = Math.round(J * N.height);
		var M = Math.max(480, e);
		Lightbox.setSize(M + 20, E + 52 + K);
		if (K) {
			k.firstChild.width = e;
			k.firstChild.height = E
		}
	}
	function d(M) {
		var L = G[M],
			K = "#screenshots:";
		if (u == 0) {
			K += "id=" + L.id
		} else {
			K += A + ":" + (M + 1)
		}
		return K
	}
	function w(N) {
		if (N && (J == c) && g_getWindowSize().h > b.offsetHeight) {
			return
		}
		b.style.visibility = "hidden";
		var K = G[m],
			Q = (K.width > 772 || K.height > 618);
		g(0);
		var M = (K.url ? K.url : g_staticUrl + "/uploads/screenshots/" + (Q ? "resized/" : "normal/") + K.id + ".jpg");
		var R = '<img src="' + M + '" width="' + e + '" height="' + E + '">';
		k.innerHTML = R;
		if (!N) {
			g_trackEvent("Screenshots", "Show", K.id + ((K.caption && K.caption.length) ? " (" + K.caption + ")" : ""));
			if (K.url) {
				h.href = M
			} else {
				h.href = "http://static.wowhead.com/uploads/screenshots/normal/" + K.id + ".jpg"
			}
			if (!K.user && typeof g_pageInfo == "object") {
				K.user = g_pageInfo.username
			}
			var T = (K.date && K.user),
				S = (G.length > 1);
			if (T) {
				var P = new Date(K.date),
					V = (g_serverTime - P) / 1000;
				var U = B.firstChild.childNodes[1];
				U.href = "/user=" + K.user;
				U.innerHTML = K.user;
				var X = B.firstChild.childNodes[3];
				ee(X);
				Listview.funcBox.coFormatDate(X, V, P);
				B.firstChild.style.display = ""
			} else {
				B.firstChild.style.display = "none"
			}
			var X = B.childNodes[1];
			ee(X);
			if (K.user) {
				if (T) {
					ae(X, ct(" " + LANG.dash + " "))
				}
				var U = ce("a");
				U.href = "javascript:;";
				U.onclick = ContactTool.show.bind(ContactTool, {
					mode: 3,
					screenshot: K
				});
				U.className = "icon-report";
				g_addTooltip(U, LANG.report_tooltip, "q2");
				ae(U, ct(LANG.report));
				ae(X, U)
			}
			X = B.childNodes[2];
			if (S) {
				var W = "";
				if (K.user) {
					W = LANG.dash
				}
				W += (m + 1) + LANG.lvpage_of + G.length;
				X.innerHTML = W;
				X.style.display = ""
			} else {
				X.style.display = "none"
			}
			B.style.display = (T || S ? "" : "none");
			if (Locale.getId() != LOCALE_ENUS && K.caption) {
				K.caption = ""
			}
			var L = (K.caption != null && K.caption.length);
			var O = (K.subject != null && K.subject.length && K.type && K.typeId);
			if (L || O) {
				var R = "";
				if (O) {
					R += LANG.types[K.type][0] + LANG.colon;
					R += '<a href="/' + g_types[K.type] + "=" + K.typeId + '">';
					R += K.subject;
					R += "</a>"
				}
				if (L) {
					if (O) {
						R += LANG.dash
					}
					R += (K.noMarkup ? K.caption : Markup.toHtml(K.caption, {
						mode: Markup.MODE_SIGNATURE
					}))
				}
				l.innerHTML = R;
				l.style.display = ""
			} else {
				l.style.display = "none"
			}
			if (G.length > 1) {
				C.href = d(v(-1));
				D.href = d(v(1));
				C.style.display = D.style.display = "";
				z.style.display = "none"
			} else {
				C.style.display = D.style.display = "none";
				z.style.display = ""
			}
			location.replace(d(m))
		}
		Lightbox.reveal();
		if (l.offsetHeight > 18) {
			g(l.offsetHeight - 18)
		}
		b.style.visibility = "visible"
	}
	function v(K) {
		var L = m;
		L += K;
		if (L < 0) {
			L = G.length - 1
		} else {
			if (L >= G.length) {
				L = 0
			}
		}
		return L
	}
	function a() {
		m = v(-1);
		j();
		return false
	}
	function t() {
		m = v(1);
		j();
		return false
	}
	function p(K) {
		K = $E(K);
		switch (K.keyCode) {
		case 37:
			a();
			break;
		case 39:
			t();
			break
		}
	}
	function f() {
		w(1)
	}
	function n() {
		I();
		if (G.length > 1) {
			dE(document, "keyup", p)
		}
		if (r && u == 0) {
			if (r.indexOf(":id=") != -1) {
				r = "#screenshots"
			}
			location.replace(r)
		} else {
			location.replace("#.")
		}
	}
	function H(K, O, L) {
		if (typeof L.screenshots == "string") {
			G = g_screenshots[L.screenshots];
			u = 1;
			A = L.screenshots
		} else {
			G = L.screenshots;
			u = 0;
			A = null
		}
		b = K;
		m = 0;
		if (L.pos && L.pos >= 0 && L.pos < G.length) {
			m = L.pos
		}
		if (O) {
			K.className = "screenshotviewer";
			q = ce("div");
			q.className = "screenshotviewer-screen";
			C = ce("a");
			D = ce("a");
			C.className = "screenshotviewer-prev";
			D.className = "screenshotviewer-next";
			C.href = "javascript:;";
			D.href = "javascript:;";
			var Q = ce("span");
			ae(Q, ce("b"));
			ae(C, Q);
			var Q = ce("span");
			ae(Q, ce("b"));
			ae(D, Q);
			C.onclick = a;
			D.onclick = t;
			z = ce("a");
			z.className = "screenshotviewer-cover";
			z.href = "javascript:;";
			z.onclick = Lightbox.hide;
			var Q = ce("span");
			ae(Q, ce("b"));
			ae(z, Q);
			ae(q, C);
			ae(q, D);
			ae(q, z);
			k = ce("div");
			ae(q, k);
			ae(K, q);
			var P = ce("a");
			P.className = "screenshotviewer-close";
			P.href = "javascript:;";
			P.onclick = Lightbox.hide;
			ae(P, ce("span"));
			ae(K, P);
			h = ce("a");
			h.className = "screenshotviewer-original";
			h.href = "javascript:;";
			h.target = "_blank";
			ae(h, ce("span"));
			ae(K, h);
			B = ce("div");
			B.className = "screenshotviewer-from";
			var M = ce("span");
			ae(M, ct(LANG.lvscreenshot_from));
			ae(M, ce("a"));
			ae(M, ct(" "));
			ae(M, ce("span"));
			ae(B, M);
			ae(B, ce("span"));
			ae(B, ce("span"));
			ae(K, B);
			l = ce("div");
			l.className = "screenshotviewer-caption";
			ae(K, l);
			var N = ce("div");
			N.className = "clear";
			ae(K, N)
		}
		r = location.hash;
		if (G.length > 1) {
			aE(document, "keyup", p)
		}
		j()
	}
	function j() {
		var L = G[m];
		if (!L.width || !L.height) {
			if (o) {
				o.onload = null;
				o.onerror = null
			} else {
				b.className = "";
				F = [];
				while (b.firstChild) {
					F.push(b.firstChild);
					de(b.firstChild)
				}
			}
			var K = setTimeout(function () {
				L.width = 126;
				L.height = 22;
				g(0);
				L.width = null;
				L.height = null;
				var N = ce("div");
				N.style.margin = "0 auto";
				N.style.width = "126px";
				var M = ce("img");
				M.src = g_staticUrl + "/images/ui/misc/progress-anim.gif";
				M.width = 126;
				M.height = 22;
				ae(N, M);
				ae(b, N);
				Lightbox.reveal();
				b.style.visiblity = "visible"
			},
			150);
			o = new Image();
			o.onload = (function (M, N) {
				clearTimeout(N);
				M.width = this.width;
				M.height = this.height;
				o = null;
				i();
				w()
			}).bind(o, L, K);
			o.onerror = (function (M) {
				clearTimeout(M);
				o = null;
				Lightbox.hide();
				i()
			}).bind(o, K);
			o.src = (L.url ? L.url : g_staticUrl + "/uploads/screenshots/normal/" + L.id + ".jpg")
		} else {
			w()
		}
	}
	function I() {
		if (!o) {
			return
		}
		o.onload = null;
		o.onerror = null;
		o = null;
		i()
	}
	function i() {
		if (!F) {
			return
		}
		ee(b);
		b.className = "screenshotviewer";
		for (var K = 0; K < F.length; ++K) {
			ae(b, F[K])
		}
		F = null
	}
	this.checkPound = function () {
		if (location.hash && location.hash.indexOf("#screenshots") == 0) {
			if (!g_listviews.screenshots) {
				var L = location.hash.split(":");
				if (L.length == 3) {
					var M = g_screenshots[L[1]],
						K = parseInt(L[2]);
					if (M && K >= 1 && K <= M.length) {
						ScreenshotViewer.show({
							screenshots: L[1],
							pos: K - 1
						})
					}
				}
			}
		}
	};
	this.show = function (K) {
		Lightbox.show("screenshotviewer", {
			onShow: H,
			onHide: n,
			onResize: f
		},
		K)
	};
	$(document).ready(this.checkPound)
};
