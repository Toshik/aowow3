var ModelViewer = new
function () {
	this.validSlots = [1, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26];
	this.slotMap = {
		1: 1,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		10: 10,
		13: 21,
		14: 22,
		15: 22,
		16: 16,
		17: 21,
		19: 19,
		20: 5,
		21: 21,
		22: 22,
		23: 22,
		25: 21,
		26: 21
	};
	var d, B, E = [],
		h, w, n, A, g, C, p, q, e, m, u, t, l, o = [{
		id: 10,
		name: g_chr_races[10],
		model: "bloodelf"
	},
	{
		id: 11,
		name: g_chr_races[11],
		model: "draenei"
	},
	{
		id: 3,
		name: g_chr_races[3],
		model: "dwarf"
	},
	{
		id: 7,
		name: g_chr_races[7],
		model: "gnome"
	},
	{
		id: 1,
		name: g_chr_races[1],
		model: "human"
	},
	{
		id: 4,
		name: g_chr_races[4],
		model: "nightelf"
	},
	{
		id: 2,
		name: g_chr_races[2],
		model: "orc"
	},
	{
		id: 6,
		name: g_chr_races[6],
		model: "tauren"
	},
	{
		id: 8,
		name: g_chr_races[8],
		model: "troll"
	},
	{
		id: 5,
		name: g_chr_races[5],
		model: "scourge"
	}],
		i = [{
		id: 0,
		name: LANG.male,
		model: "male"
	},
	{
		id: 1,
		name: LANG.female,
		model: "female"
	}];

	function z() {
		w.style.display = "none";
		n.style.display = "none";
		A.style.display = "none"
	}
	function a() {
		var F, G;
		if (p.style.display == "") {
			F = (p.selectedIndex >= 0 ? p.options[p.selectedIndex].value : "")
		} else {
			F = (q.selectedIndex >= 0 ? q.options[q.selectedIndex].value : "")
		}
		G = (e.selectedIndex >= 0 ? e.options[e.selectedIndex].value : 0);
		return {
			r: F,
			s: G
		}
	}
	function c(F, G) {
		return (!isNaN(F) && F > 0 && in_array(o, F, function (H) {
			return H.id
		}) != -1 && !isNaN(G) && G >= 0 && G <= 1)
	}
	function v() {
		var G = 600;
		if (t.displayAd && g_user.ads) {
			G = 725
		}
		C.style.width = G + "px";
		if (u == 2 && !f()) {
			u = 0
		}
		if (u == 2) {
			var K = '<object id="3dviewer-plugin" type="application/x-zam-wowmodel" width="' + G + '" height="400"><param name="model" value="' + d + '" /><param name="modelType" value="' + B + '" /><param name="contentPath" value="http://static.wowhead.com/modelviewer/" />';
			if (B == 16 && E.length) {
				K += '<param name="equipList" value="' + E.join(",") + '" />'
			}
			K += '<param name="bgColor" value="#181818" /></object>';
			A.innerHTML = K;
			A.style.display = ""
		} else {
			if (u == 1) {
				var K = '<applet id="3dviewer-java" code="org.jdesktop.applet.util.JNLPAppletLauncher" width="' + G + '" height="400" archive="http://static.wowhead.com/modelviewer/applet-launcher.jar,http://download.java.net/media/jogl/builds/archive/jsr-231-webstart-current/jogl.jar,http://download.java.net/media/gluegen/webstart/gluegen-rt.jar,http://download.java.net/media/java3d/webstart/release/vecmath/latest/vecmath.jar,http://static.wowhead.com/modelviewer/ModelView510.jar"><param name="jnlp_href" value="http://static.wowhead.com/modelviewer/ModelView.jnlp"><param name="codebase_lookup" value="false"><param name="cache_option" value="no"><param name="subapplet.classname" value="modelview.ModelViewerApplet"><param name="subapplet.displayname" value="Model Viewer Applet"><param name="progressbar" value="true"><param name="jnlpNumExtensions" value="1"><param name="jnlpExtension1" value="http://download.java.net/media/jogl/builds/archive/jsr-231-webstart-current/jogl.jnlp"><param name="contentPath" value="http://static.wowhead.com/modelviewer/"><param name="model" value="' + d + '"><param name="modelType" value="' + B + '">';
				if (B == 16 && E.length) {
					K += '<param name="equipList" value="' + E.join(",") + '">'
				}
				K += '<param name="bgColor" value="#181818"></applet>';
				n.innerHTML = K;
				n.style.display = ""
			} else {
				var H = {
					model: d,
					modelType: B,
					contentPath: "http://static.wowhead.com/modelviewer/",
					blur: (OS.mac ? "0" : "1")
				};
				var J = {
					quality: "high",
					allowscriptaccess: "always",
					allowfullscreen: true,
					menu: false,
					bgcolor: "#181818"
				};
				var I = {};
				if (B == 16 && E.length) {
					H.equipList = E.join(",")
				}
				swfobject.embedSWF("http://static.wowhead.com/modelviewer/ModelView.swf", "dsjkgbdsg2346", G, "400", "10.0.0", "http://static.wowhead.com/modelviewer/expressInstall.swf", H, J, I);
				w.style.display = ""
			}
		}
		var N = a(),
			L = N.r,
			M = N.s;
		if (!h.noPound) {
			var F = "#modelviewer";
			var N = ge("dsgndslgn464d");
			if (!N) {
				switch (h.type) {
				case 1:
					F += ":1:" + h.displayId + ":" + (h.humanoid | 0);
					break;
				case 2:
					F += ":2:" + h.displayId;
					break;
				case 3:
					F += ":3:" + h.displayId + ":" + (h.slot | 0);
					break;
				case 4:
					F += ":4:" + E.join(";");
					break
				}
			}
			if (L && M) {
				F += ":" + L + "+" + M
			} else {
				F += ":"
			}
			if (h.extraPound != null) {
				F += ":" + h.extraPound
			}
			location.replace(rtrim(F, ":"))
		}
	}
	function b() {
		var J = a(),
			G = J.r,
			H = J.s;
		if (!G) {
			if (e.style.display == "none") {
				return
			}
			e.style.display = "none";
			d = E[1];
			switch (h.slot) {
			case 1:
				B = 2;
				break;
			case 3:
				B = 4;
				break;
			default:
				B = 1
			}
		} else {
			if (e.style.display == "none") {
				e.style.display = ""
			}
			var J = function (K) {
				return K.id
			};
			var I = in_array(o, G, J);
			var F = in_array(i, H, J);
			if (I != -1 && F != -1) {
				d = o[I].model + i[F].model;
				B = 16
			}
			g_setWowheadCookie("temp_default_3dmodel", G + "," + H)
		}
		z();
		v()
	}
	function j(F) {
		if (F == u) {
			return
		}
		g_setSelectedLink(this, "modelviewer-mode");
		z();
		if (u == null) {
			u = F;
			setTimeout(v, 50)
		} else {
			u = F;
			sc("modelviewer_mode", 7, F, "/", ".wowhead.com");
			v()
		}
	}
	function r(L, G) {
		var N = -1,
			P = -1,
			H, K;
		if (G.race != null && G.sex != null) {
			N = G.race;
			P = G.sex;
			g.style.display = "none";
			L = 0
		} else {
			g.style.display = ""
		}
		if (N == -1 && P == -1) {
			if (location.hash) {
				var M = location.hash.match(/modelviewer:.*?([0-9]+)\+([0-9]+)/);
				if (M != null) {
					if (c(M[1], M[2])) {
						N = M[1];
						P = M[2];
						e.style.display = ""
					}
				}
			}
		}
		if (L) {
			H = p;
			K = 1;
			p.style.display = "";
			p.selectedIndex = -1;
			q.style.display = "none";
			if (P == -1) {
				e.style.display = "none"
			}
		} else {
			if (N == -1 && P == -1) {
				var S = 1,
					J = 0;
				if (g_user && g_user.cookies.default_3dmodel) {
					var F = g_user.cookies.default_3dmodel.split(",");
					if (F.length == 2) {
						S = F[0];
						J = F[1] - 1
					}
				} else {
					var O = g_getWowheadCookie("temp_default_3dmodel");
					if (O) {
						var F = O.split(",");
						if (F.length == 2) {
							S = F[0];
							J = F[1]
						}
					}
				}
				if (c(S, J)) {
					N = S;
					P = J
				} else {
					N = 1;
					P = 0
				}
			}
			H = q;
			K = 0;
			p.style.display = "none";
			q.style.display = "";
			e.style.display = ""
		}
		if (P != -1) {
			e.selectedIndex = P
		}
		if (N != -1 && P != -1) {
			var R = function (T) {
				return T.id
			};
			var Q = in_array(o, N, R);
			var I = in_array(i, P, R);
			if (Q != -1 && I != -1) {
				d = o[Q].model + i[I].model;
				B = 16;
				Q += K;
				H.selectedIndex = Q;
				e.selectedIndex = I
			}
		}
	}
	function f() {
		var G = navigator.mimeTypes["application/x-zam-wowmodel"];
		if (G) {
			var F = G.enabledPlugin;
			if (F) {
				return true
			}
		}
		return false
	}
	function k() {
		if (!h.noPound) {
			if (!h.fromTag && m && m.indexOf("modelviewer") == -1) {
				location.replace(m)
			} else {
				location.replace("#.")
			}
		}
		if (h.onHide) {
			h.onHide()
		}
	}
	function D(T, N, J) {
		var I, G;
		t = J;
		if (!J.displayAd || !g_user.ads) {
			Lightbox.setSize(620, 452)
		} else {
			Lightbox.setSize(749, 546)
		}
		if (N) {
			if (o.length == 10 && isset("g_beta") && g_beta) {
				o.splice(4, 0, {
					id: 9,
					name: g_chr_races[9],
					model: "goblin"
				});
				o.push({
					id: 22,
					name: g_chr_races[22],
					model: "worgen"
				})
			}
			T.className = "modelviewer";
			var S = ce("div");
			w = ce("div");
			n = ce("div");
			A = ce("div");
			var R = ce("div");
			R.id = "dsjkgbdsg2346";
			ae(w, R);
			S.className = "modelviewer-screen";
			w.style.display = n.style.display = A.style.display = "none";
			ae(S, w);
			ae(S, n);
			ae(S, A);
			var P = ce("div");
			P.style.backgroundColor = "#181818";
			P.style.margin = "0";
			ae(P, S);
			ae(T, P);
			C = S;
			I = ce("a"),
			G = ce("a");
			I.className = "modelviewer-help";
			I.href = "/help=modelviewer";
			I.target = "_blank";
			ae(I, ce("span"));
			G.className = "modelviewer-close";
			G.href = "javascript:;";
			G.onclick = Lightbox.hide;
			ae(G, ce("span"));
			ae(T, G);
			ae(T, I);
			var Q = ce("div"),
				H = ce("span"),
				I = ce("a"),
				G = ce("a");
			Q.className = "modelviewer-quality";
			I.href = G.href = "javascript:;";
			ae(I, ct("Flash"));
			ae(G, ct("Java"));
			I.onclick = j.bind(I, 0);
			G.onclick = j.bind(G, 1);
			ae(H, I);
			ae(H, ct(" " + String.fromCharCode(160)));
			ae(H, G);
			if (f()) {
				var F = ce("a");
				F.href = "javascript:;";
				ae(F, ct("Plugin"));
				F.onclick = j.bind(F, 2);
				ae(H, ct(" " + String.fromCharCode(160)));
				ae(H, F)
			}
			ae(Q, ce("div"));
			ae(Q, H);
			ae(T, Q);
			g = ce("div");
			g.className = "modelviewer-model";
			var R = function (X, W) {
				return strcmp(X.name, W.name)
			};
			o.sort(R);
			p = ce("select");
			q = ce("select");
			e = ce("select");
			p.onchange = q.onchange = e.onchange = b;
			ae(p, ce("option"));
			for (var M = 0, O = o.length; M < O; ++M) {
				var K = ce("option");
				K.value = o[M].id;
				ae(K, ct(o[M].name));
				ae(p, K)
			}
			for (var M = 0, O = o.length; M < O; ++M) {
				var K = ce("option");
				K.value = o[M].id;
				ae(K, ct(o[M].name));
				ae(q, K)
			}
			for (var M = 0, O = i.length; M < O; ++M) {
				var K = ce("option");
				K.value = i[M].id;
				ae(K, ct(i[M].name));
				ae(e, K)
			}
			e.style.display = "none";
			ae(g, ce("div"));
			ae(g, p);
			ae(g, q);
			ae(g, e);
			ae(T, g);
			Q = ce("div");
			Q.className = "clear";
			ae(T, Q);
			Q = ce("div");
			Q.id = "modelviewer-msg";
			Q.className = "sub";
			Q.style.display = "none";
			Q.style.marginTop = "-6px";
			Q.style.color = "#cccccc";
			Q.style.fontSize = "11px";
			ae(T, Q);
			if (J.displayAd) {
				Q.style.paddingBottom = "4px";
				Q = ce("div");
				Q.id = "modelviewer-ad";
				Q.style.paddingBottom = "10px";
				ae(T, Q)
			}
		}
		switch (J.type) {
		case 1:
			g.style.display = "none";
			if (J.humanoid) {
				B = 32
			} else {
				B = 8
			}
			d = J.displayId;
			break;
		case 2:
			g.style.display = "none";
			B = 64;
			d = J.displayId;
			break;
		case 3:
		case 4:
			if (J.type == 3) {
				E = [J.slot, J.displayId]
			} else {
				E = J.equipList
			}
			if (E.length > 2 || in_array([4, 5, 6, 7, 8, 9, 10, 16, 19, 20], E[0]) != -1) {
				r(0, J)
			} else {
				switch (E[0]) {
				case 1:
					B = 2;
					break;
				case 3:
					B = 4;
					break;
				default:
					B = 1
				}
				d = E[1];
				r(1, J)
			}
			break
		}
		var V = ge("modelviewer-ad");
		if (N) {
			if (gc("modelviewer_mode") == "2" && f()) {
				F.onclick()
			} else {
				if (gc("modelviewer_mode") == "1") {
					G.onclick()
				} else {
					I.onclick()
				}
			}
		} else {
			if (V) {
				ee(V)
			}
			z();
			setTimeout(v, 1)
		}
		if (J.displayAd && V) {
			Ads.fillSpot("leaderboard", V)
		}
		var L = ge("modelviewer-msg");
		if (J.message && L) {
			L.innerHTML = J.message;
			L.style.display = ""
		} else {
			if (L) {
				L.style.display = "none"
			}
		}
		var U = "";
		if (J.fromTag) {
			U += "Custom ";
			switch (J.type) {
			case 1:
				U += "NPC " + J.displayId + (J.humanoid ? " humanoid" : "");
				break;
			case 2:
				U += "Object " + J.displayId;
				break;
			case 3:
				U += "Item " + J.displayId + " Slot " + (J.slot | 0);
				break;
			case 4:
				U += "Item set " + E.join(".");
				break
			}
		} else {
			switch (J.type) {
			case 1:
				U += "NPC " + (J.typeId ? J.typeId : " DisplayID " + J.displayId);
				break;
			case 2:
				U += "Object " + J.typeId;
				break;
			case 3:
				U += "Item " + J.typeId;
				break;
			case 4:
				U += "Item set " + E.join(".");
				break
			}
		}
		g_trackEvent("Model Viewer", "Show", g_urlize(U));
		m = location.hash
	}
	this.checkPound = function () {
		if (location.hash && location.hash.indexOf("#modelviewer") == 0) {
			var J = location.hash.split(":");
			if (J.length >= 3) {
				J.shift();
				var H = parseInt(J.shift());
				var G = {
					type: H,
					displayAd: 1
				};
				switch (H) {
				case 1:
					G.displayId = parseInt(J.shift());
					var F = parseInt(J.shift());
					if (F == 1) {
						G.humanoid = 1
					}
					break;
				case 2:
					G.displayId = parseInt(J.shift());
					break;
				case 3:
					G.displayId = parseInt(J.shift());
					G.slot = parseInt(J.shift());
					break;
				case 4:
					var I = J.shift();
					G.equipList = I.split(";");
					break
				}
				if (G.displayId || G.equipList) {
					ModelViewer.show(G)
				}
				if (l != null) {
					if (J.length > 0 && J[J.length - 1]) {
						l(J[J.length - 1])
					}
				}
			} else {
				if (l != null && J.length == 2 && J[1]) {
					l(J[1])
				} else {
					var K = ge("dsgndslgn464d");
					if (K) {
						K.onclick()
					}
				}
			}
		}
	};
	this.addExtraPound = function (F) {
		l = F
	};
	this.show = function (F) {
		h = F;
		Lightbox.show("modelviewer", {
			onShow: D,
			onHide: k
		},
		F)
	};
	$(document).ready(this.checkPound)
};
