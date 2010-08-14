var $WowheadTalentCalculator;

function TalentCalc() {
	var bi = 0,
		aU = 1,
		G = 85,
		bb = this,
		x, U = {},
		bc = {},
		P = {},
		k, aO, W, bj, aR = -1,
		ap = -1,
		R = 0,
		am, aP, Q = false,
		aN, A, bd, al, aw, az = {
		1: [15, 30, 80],
		2: [15, 50, 70]
	},
		ar, a5, ba, aB, v = 0,
		aa, D, aC, n, aX, z, aQ, f, aG, h, t = {},
		H = {},
		g, C, bg, af, a3, aT, N, aj, s, O = [],
		V, aL = [],
		aK = [],
		aZ = [],
		o, at = "0zMcmVokRsaqbdrfwihuGINALpTjnyxtgevElBCDFHJKOPQSUWXYZ123456789",
		T = "Z",
		ah = [7, 24, 26, 27, 30, 34, 37, 38],
		aS, E = {};
	this.getTalentTrees = function () {
		return U[aR]
	};
	this.addGlyph = function (bo) {
		if (bo) {
			aH(am, bo)
		} else {
			ai(am)
		}
		Lightbox.hide()
	};
	this.getBlizzBuild = function () {
		if (aR == -1) {
			return
		}
		var br = U[aR],
			bq = "";
		for (var bo = 0; bo < A; ++bo) {
			for (var bp = 0; bp < br[bo].t.length; ++bp) {
				bq += br[bo].t[bp].k
			}
		}
		bq = rtrim(bq, "0");
		return bq
	};
	this.getBlizzGlyphs = function () {
		if (aR == -1) {
			return
		}
		var bq = U[aR],
			bo = "";
		for (var bp = 0; bp < al; ++bp) {
			if (bp > 0) {
				bo += ":"
			}
			if (bq.glyphs[bp]) {
				bo += bq.glyphs[bp]
			} else {
				bo += "0"
			}
		}
		return bo
	};
	this.getGlyphs = function () {
		var bo = [];
		if (aR != -1) {
			var bq = U[aR];
			if (bq) {
				for (var bp = 0; bp < al; ++bp) {
					if (bq.glyphs[bp]) {
						bo.push(g_glyphs[bq.glyphs[bp]])
					}
				}
			}
		}
		return bo
	};
	this.getSpentFromBlizzBuild = function (bv, bt) {
		var bu = U[bt],
			bs = [0, 0, 0];
		if (bu) {
			var bw = 0,
				bo = 0;
			for (var br = 0; br < bv.length; ++br) {
				var bp = Math.min(parseInt(bv.charAt(br)), bu[bw].t[bo].m);
				if (isNaN(bp)) {
					continue
				}
				for (var bq = 0; bq < bp; ++bq) {
					++bs[bw]
				}
				if (++bo > bu[bw].t.length - 1) {
					bo = 0;
					if (++bw > A - 1) {
						break
					}
				}
			}
		}
		return bs
	};
	this.getTalents = function () {
		var bp = [];
		if (aR != -1) {
			var bq = U[aR];
			if (bq) {
				for (var bo = 0; bo < A; ++bo) {
					for (i = 0; i < bq[bo].t.length; ++i) {
						if (bq[bo].t[i].k) {
							bp.push(bq[bo].t[i])
						}
					}
				}
			}
		}
		return bp
	};
	this.getTalentRanks = function (bo) {
		if (aR == -1) {
			return
		}
		if (P[bo]) {
			return P[bo].k
		}
		return 0
	};
	this.getWhBuild = function () {
		if (aR == -1) {
			return
		}
		var bt = U[aR],
			bp = "",
			bs, br;
		for (var bo = 0; bo < A; ++bo) {
			bs = "";
			for (br = 0; br < bt[bo].t.length; ++br) {
				bs += bt[bo].t[br].k
			}
			bs = rtrim(bs, "0");
			bp += B(bs);
			br = bs.length;
			if (br % 2 == 1) {
				++br
			}
			if (br < bt[bo].t.length) {
				bp += T
			}
		}
		var bq;
		if (aN == aU) {
			bq = at.charAt(Math.floor(aR / 10)) + at.charAt((2 * (aR % 10)) + (v ? 1 : 0))
		} else {
			bq = at.charAt(aJ(aR) * 3 + (v ? 1 : 0))
		}
		bq += rtrim(bp, T);
		return bq
	};
	this.getWhGlyphs = function () {
		if (aR == -1) {
			return
		}
		var br = U[aR],
			bo = {
			1: "",
			2: ""
		};
		for (var bq = 0; bq < al; ++bq) {
			if (br.glyphs[bq]) {
				bo[aV(bq)] += at.charAt(g_glyphs[br.glyphs[bq]].index)
			}
		}
		var bp = bo[1];
		if (bp.length < 3) {
			bp += T
		}
		bp += bo[2];
		bp = rtrim(bp, T);
		return bp
	};
	this.initialize = function (bp, bo) {
		if (D) {
			return
		}
		bp = ge(bp);
		if (!bp) {
			return
		}
		D = bp;
		D.className = "talentcalc";
		if (bo == null) {
			bo = {}
		}
		x = bo;
		if (x.onChange) {
			aS = x.onChange
		}
		if (x.mode == aU) {
			aN = aU;
			A = 1;
			bd = 6;
			ar = 3;
			a5 = 16;
			aB = 0;
			ba = g_pet_families;
			D.className += " talentcalc-pet";
			J(0)
		} else {
			aN = bi;
			A = 3;
			bd = 11;
			ar = 5;
			a5 = 71;
			aB = 0;
			ba = g_chr_classes;
			if (isset("g_beta")) {
				bd = 7;
				a5 = 41;
				aB = 31
			}
			D.className += " talentcalc-default";
			$WowheadTalentCalculator = bb;
			J(80);
			r()
		}
		aa = a5 + v;
		g = ce("div");
		g.className = "talentcalc-wrapper";
		ae(D, g);
		m();
		bl();
		au();
		Z();
		aD();
		ao();
		if (x.whBuild) {
			aY(x.whBuild)
		} else {
			if (x.classId > 0 && ba[x.classId]) {
				if (x.blizzBuild) {
					Y(x.classId, x.blizzBuild)
				} else {
					u(x.classId)
				}
			}
		}
		if (x.whGlyphs) {
			L(x.whGlyphs)
		} else {
			if (x.blizzGlyphs) {
				bk(x.blizzGlyphs)
			}
		}
	};
	this.promptBlizzBuild = function () {
		if (aN == aU) {
			return
		}
		var bq, bo = prompt(LANG.prompt_importblizz, "");
		if (!bo) {
			return
		}
		if (bo.match(/\?cid=([0-9]+)&tal=([0-9]+)/)) {
			bq = parseInt(RegExp.$1);
			Y(bq, RegExp.$2);
			return
		} else {
			var br = bo.indexOf("?tal=");
			if (br != -1) {
				for (var bp in g_file_classes) {
					if (bo.indexOf(g_file_classes[bp]) != -1) {
						bq = parseInt(bp);
						break
					}
				}
				if (bq) {
					Y(bq, bo.substring(br + 5));
					return
				}
			}
		}
		alert(LANG.alert_invalidurl)
	};
	this.promptWhBuild = function () {
		var bp = prompt(LANG.prompt_importwh, "");
		if (!bp) {
			return
		}
		var bv = bp.indexOf("#");
		if (bv != -1) {
			var bt = bp.substr(bv);
			if (bt.indexOf("-") != -1) {
				var bs = bt.substr(1).split("-"),
					bo = bs[0] || "",
					br = bs[1] || "",
					bu = -1;
				for (var bq in g_file_classes) {
					if (g_file_classes[bq] == bo) {
						bu = bq;
						break
					}
				}
				if (bu != -1) {
					Y(bu, br)
				}
			} else {
				var bs = bt.substr(1).split(":"),
					bw = bs[0] || "",
					bx = bs[1] || "";
				aY(bw);
				L(bx)
			}
		}
	};
	this.registerClass = function (bp, bo) {
		ac(bp, bo)
	};
	this.reset = function (bo) {
		if (aR == -1) {
			return
		}
		if (bo > A - 1) {
			return
		}
		Q = false;
		a7(bo, aR, true)
	};
	this.resetAll = function () {
		if (!U[aR]) {
			return
		}
		Q = false;
		ay(aR);
		ab()
	};
	this.resetBuild = function () {
		if (!U[aR]) {
			return
		}
		Q = false;
		bh(aR);
		e(aR);
		ab()
	};
	this.resetGlyphs = function () {
		aW();
		ab()
	};
	this.restore = function () {
		aq()
	};
	this.setBlizzBuild = function (bo, bp) {
		Y(bo, bp)
	};
	this.setBlizzGlyphs = function (bo) {
		if (aR == -1) {
			return
		}
		bk(bo)
	};
	this.setBonusPoints = function (bo) {
		an(bo)
	};
	this.getBonusPoints = function (bo) {
		return v
	};
	this.setClass = function (bo) {
		return u(bo)
	};
	this.setLevelCap = function (bp) {
		bp = parseInt(bp);
		if (isNaN(bp) || bp < 1 || bp > 85) {
			return
		}
		var bo;
		if (aN == aU) {
			bo = Math.max(0, Math.floor((bp - 16) / 4))
		} else {
			if (isset("g_beta")) {
				bo = Math.max(0, Math.min(10, bp) - 9) + Math.max(0, Math.floor((Math.min(80, bp) - 9) / 2)) + Math.max(0, bp - 80)
			} else {
				bo = Math.max(0, bp - 9)
			}
		}
		p(bo, -1, true);
		J(bp);
		ad()
	};
	this.setLock = function (bo) {
		if (aR == -1) {
			return
		}
		av(bo)
	};
	this.setWhBuild = function (bo) {
		return aY(bo)
	};
	this.setWhGlyphs = function (bo) {
		if (aR == -1) {
			return
		}
		L(bo)
	};
	this.showSummary = function (bs) {
		if (aR == -1) {
			return
		}
		var bt = U[aR],
			bq, bp, bo, br = "<html><head><title>" + document.title + '</title></head><body style="font-family: Arial, sans-serif; font-size: 13px">';
		if (bs) {
			br += "<h2>";
			if (aN == aU) {
				br += sprintf(LANG.tc_printh, a2(), g_pet_families[bt.n])
			} else {
				br += sprintf(LANG.tc_printh, a2(), g_chr_classes[bt.n]) + " (" + bt[0].k + "/" + bt[1].k + "/" + bt[2].k + ")"
			}
			br += "</h2>";
			br += "<p></p>";
			for (bq = 0; bq < A; ++bq) {
				br += "<h3>" + bt[bq].n + " (" + bt[bq].k + " " + LANG[bt[bq].k == 1 ? "tc_point" : "tc_points"] + ")</h3>";
				br += "<blockquote>";
				bo = 0;
				for (bp = 0; bp < bt[bq].t.length; ++bp) {
					if (bt[bq].t[bp].k) {
						if (bo) {
							br += "<br /><br />"
						}
						br += "<b>" + bt[bq].t[bp].n + "</b>" + LANG.hyphen + sprintf(LANG.tc_rank, bt[bq].t[bp].k, bt[bq].t[bp].m) + "<br />";
						br += aF(bt[bq].t[bp]);
						++bo
					}
				}
				if (bo == 0) {
					br += LANG.tc_none
				}
				br += "</blockquote>"
			}
			br += "<h3>" + LANG.tc_glyphs + "</h3>";
			br += "<blockquote>";
			glyphCount = 0;
			for (bq = 0; bq < al; ++bq) {
				glyph = g_glyphs[bt.glyphs[bq]];
				if (glyph) {
					if (glyphCount) {
						br += "<br /><br />"
					}
					br += "<b>" + glyph.name + "</b> ";
					if (glyph.type == 1) {
						br += "(" + LANG.tc_majgly + ")<br />"
					} else {
						br += "(" + LANG.tc_mingly + ")<br />"
					}
					br += glyph.description;
					glyphCount++
				}
			}
			if (glyphCount == 0) {
				br += LANG.tc_none
			}
			br += "</blockquote>"
		} else {
			br += "<pre>";
			for (bq = 0; bq < A; ++bq) {
				br += "<b>" + bt[bq].n + " (" + bt[bq].k + " " + LANG[bt[bq].k == 1 ? "tc_point" : "tc_points"] + ")</b>\n\n";
				bo = 0;
				for (bp = 0; bp < bt[bq].t.length; ++bp) {
					if (bt[bq].t[bp].k) {
						br += "&nbsp;&nbsp;&nbsp;&nbsp;" + bt[bq].t[bp].k + "/" + bt[bq].t[bp].m + " " + bt[bq].t[bp].n + "\n";
						++bo
					}
				}
				if (bo == 0) {
					br += "&nbsp;&nbsp;&nbsp;&nbsp;" + LANG.tc_none + "\n"
				}
				br += "\n"
			}
			br += "</pre>"
		}
		br += "</body></html>";
		talentSummary = br;
		window.open("/talent=summary", "", "toolbar=no,menubar=yes,status=yes,scrollbars=yes,resizable=yes")
	};
	this.simplifyGlyphName = function (bo) {
		return aI(bo)
	};
	this.toggleLock = function () {
		if (aR == -1) {
			return
		}
		w()
	};

	function aH(br, bp, bo) {
		var bq = U[aR];
		glyph = g_glyphs[bp];
		if (glyph && q(br, glyph)) {
			if (bq.glyphs[br]) {
				bq.glyphItems[bq.glyphs[br]] = 0
			}
			bq.glyphs[br] = bp;
			bq.glyphItems[bp] = 1;
			if (!bo) {
				a9(br);
				ab()
			}
		}
	}
	function y() {
		var bs = U[aR];
		if (bs.k > aa) {
			for (var bo = A - 1; bo >= 0; --bo) {
				for (var br = bs[bo].t.length - 1; br >= 0; --br) {
					var bp = bs[bo].t[br].k;
					for (var bq = 0; bq < bp; ++bq) {
						l(bs[bo].t[br]);
						if (bs.k <= aa) {
							return
						}
					}
				}
			}
		}
	}
	function I(bp, bo) {
		if (v) {
			an(0)
		} else {
			if (aN == aU) {
				an(4)
			} else {
				an(5)
			}
		}
		aA(bp, bo)
	}
	function aA(bp, bo) {
		if (aN == aU) {
			Tooltip.showAtCursor(bo, LANG[v ? "tc_rembon" : "tc_addbon"], null, null, "q")
		} else {
			Tooltip.showAtCursor(bo, LANG[v ? "tc_deccap" : "tc_inccap"], null, null, "q")
		}
	}
	function a6(bo, br, bs) {
		var bt = ce("div"),
			bq, bp;
		bt.className = "talentcalc-arrow";
		switch (bo) {
		case 0:
			br = 15;
			bq = a0(1, 2);
			bq.className = "talentcalc-arrow-down";
			bp = bq.firstChild.childNodes[0].childNodes[0].style;
			bp.width = "15px";
			bp.height = "4px";
			bp = bq.firstChild.childNodes[1].childNodes[0].style;
			bp.backgroundPosition = "bottom";
			bp.height = (bs - 4) + "px";
			break;
		case 1:
			bq = a0(2, 2, true);
			bq.className = "talentcalc-arrow-leftdown";
			bp = bq.firstChild.childNodes[0].childNodes[0].style;
			bp.backgroundPosition = "left";
			bp.width = (br - 4) + "px";
			bp.height = "11px";
			bp = bq.firstChild.childNodes[0].childNodes[1].style;
			bp.backgroundPosition = "right";
			bp.width = "4px";
			bp = bq.firstChild.childNodes[1].childNodes[0].style;
			bp.backgroundPosition = "bottom left";
			bp.backgroundRepeat = "no-repeat";
			bp.height = (bs - 11) + "px";
			break;
		case 2:
			bq = a0(2, 2, true);
			bq.className = "talentcalc-arrow-rightdown";
			bp = bq.firstChild.childNodes[0].childNodes[0].style;
			bp.backgroundPosition = "left";
			bp.width = "4px";
			bp = bq.firstChild.childNodes[0].childNodes[1].style;
			bp.backgroundPosition = "right";
			bp.width = (br - 4) + "px";
			bp.height = "11px";
			bp = bq.firstChild.childNodes[1].childNodes[0].style;
			bp.backgroundPosition = "bottom right";
			bp.backgroundRepeat = "no-repeat";
			bp.height = (bs - 11) + "px";
			break;
		case 3:
			bs = 15;
			bq = a0(2, 1);
			bq.className = "talentcalc-arrow-right";
			bp = bq.firstChild.childNodes[0].childNodes[0].style;
			bp.backgroundPosition = "left";
			bp.width = "4px";
			bp = bq.firstChild.childNodes[0].childNodes[1].style;
			bp.backgroundPosition = "right";
			bp.width = (br - 4) + "px";
			break;
		case 4:
			bs = 15;
			bq = a0(2, 1);
			bq.className = "talentcalc-arrow-left";
			bp = bq.firstChild.childNodes[0].childNodes[0].style;
			bp.backgroundPosition = "left";
			bp.width = (br - 4) + "px";
			bp = bq.firstChild.childNodes[0].childNodes[1].style;
			bp.backgroundPosition = "right";
			bp.width = "4px";
			break
		}
		bt.style.width = br + "px";
		bt.style.height = bs + "px";
		ae(bt, bq);
		return bt
	}
	function Z() {
		aj = ce("div");
		aj.className = "talentcalc-masteries";
		aj.style.display = "none";
		var bo = ce("div");
		bo.className = "clear";
		ae(aj, bo);
		ae(g, aj)
	}
	function ao() {
		s = RedButton.create(LANG.tc_viewtalents, true);
		if (aB <= 0) {
			s.style.display = "none"
		}
		s.style.marginTop = "3px";
		s.style.display = "none";
		RedButton.setFunc(s, a4.bind(null, 1));
		ae(g, s)
	}
	function au() {
		var br, bt, bq;
		V = ce("div");
		V.className = "talentcalc-treenames";
		V.style.display = "none";
		for (var bp = 0; bp < A; ++bp) {
			br = ce("div");
			br.className = "talentcalc-treenames-tree" + (bp + 1);
			aL[bp] = bt = ce("p");
			bt.icon = Icon.create(null, 1);
			ae(bt, bt.icon);
			if (isset("g_beta")) {
				bt.className = "locked"
			}
			var bs = ce("span");
			var bo = ce("b");
			aK[bp] = bs;
			aZ[bp] = bo;
			ae(bs, bo);
			ae(bt, bs);
			bq = ce("a");
			bq.href = "javascript:;";
			bq.onclick = bb.reset.bind(null, bp);
			g_addTooltip(bq, LANG.tc_resettree);
			ae(bt, bq);
			bq = ce("em");
			ae(bt, bq);
			ae(br, bt);
			ae(V, br)
		}
		ae(g, V)
	}
	function aD() {
		o = ce("div");
		o.className = "talentcalc-main";
		if (isset("g_beta")) {
			o.style.height = "354px"
		}
		var bo = ce("div");
		bo.className = "clear";
		ae(o, bo);
		ae(g, o)
	}
	function bn(bw) {
		var bu = [{}],
			bo, bx;
		var bq = in_array(ah, bw) != -1;
		for (var bt = 0, bv = g_pet_talents.length; bt < bv; ++bt) {
			var bp = g_pet_talents[bt];
			if (in_array(bp.f, bw) >= 0) {
				bu[0].n = bp.n;
				bu[0].t = [];
				bu[0].i = bt;
				bu[0].icon = bp.icon;
				for (var bs = 0, br = bp.t.length; bs < br; ++bs) {
					bo = bp.t[bs];
					bx = bu[0].t[bs] = {};
					cO(bx, bo);
					if (bt == 0 && ((bs == 1 && bq) || (bs == 2 && !bq) || (bs == 11 && bq) || (bs == 12 && !bq))) {
						bx.hidden = true
					}
					if (bt == 2 && ((bs == 1 && bq) || (bs == 2 && !bq) || (bs == 6 && bq) || (bs == 7 && !bq))) {
						bx.hidden = true
					}
				}
				break
			}
		}
		return bu
	}
	function m() {
		var bo, bC, bB, bs;
		aC = ce("div");
		aC.className = "talentcalc-sidebar";
		bo = ce("div");
		bo.className = "talentcalc-sidebar-inner";
		bC = ce("a");
		bC.className = "talentcalc-button-help icon-help";
		bC.href = (aN == aU ? "http://petopia.brashendeavors.net/html/patch30/patch30faq_talents.php" : "/help=talent-calculator");
		bC.target = "_blank";
		ae(bC, ct(LANG.tc_help));
		ae(bo, bC);
		n = ce("div");
		n.className = "talentcalc-sidebar-controls";
		n.style.display = "none";
		bC = ce("a");
		bC.className = "talentcalc-button-reset icon-delete";
		bC.href = "javascript:;";
		bC.onclick = bb.resetAll;
		ae(bC, ct(LANG.tc_resetall));
		ae(n, bC);
		bC = z = ce("a");
		bC.className = "icon-lock";
		bC.href = "javascript:;";
		bC.onclick = w;
		ae(bC, ct(LANG.tc_lock));
		ae(n, bC);
		bC = ce("div");
		bC.className = "clear";
		ae(n, bC);
		ae(bo, n);
		bC = ce("div");
		bC.className = "talentcalc-sidebar-controls2";
		bB = ce("a");
		bB.className = "talentcalc-button-import";
		bB.href = "javascript:;";
		bB.onclick = (x.profiler ? bb.promptWhBuild : bb.promptBlizzBuild);
		ae(bB, ct(LANG.tc_import));
		ae(bC, bB);
		bB = f = ce("a");
		bB.className = "talentcalc-button-restore";
		bB.style.display = "none";
		bB.href = "javascript:;";
		bB.onclick = aq;
		ae(bB, ct(LANG.tc_restore));
		ae(bC, bB);
		bB = aQ = ce("a");
		bB.className = "talentcalc-button-print icon-print";
		bB.style.display = "none";
		bB.href = "javascript:;";
		bB.onclick = bb.showSummary.bind(null, 1);
		ae(bB, ct(LANG.tc_print));
		ae(bC, bB);
		bB = aG = ce("a");
		bB.className = "icon-link";
		bB.style.display = "none";
		bB.href = "#";
		bB.target = "_blank";
		ae(bB, ct(LANG.tc_link));
		ae(bC, bB);
		bB = ce("div");
		bB.className = "clear";
		ae(bC, bB);
		ae(bo, bC);
		aX = bC = ce("div");
		Ads.fillSpot("medrect", aX);
		ae(bo, bC);
		if (aN == bi) {
			h = ce("div");
			h.style.display = "none";
			bC = ce("h3");
			ae(bC, ct(LANG.tc_glyphs));
			ae(h, bC);
			bB = ce("a");
			bB.href = "javascript:;";
			bB.onclick = bb.resetGlyphs;
			g_addTooltip(bB, LANG.tc_resetglyphs);
			ae(bB, ct("[x]"));
			ae(bC, bB);
			bC = ce("div");
			bC.className = "talentcalc-sidebar-majorglyphs q9";
			bB = ce("b");
			ae(bB, ct(g_item_glyphs[1]));
			ae(bC, bB);
			ae(h, bC);
			bC = ce("div");
			bC.className = "talentcalc-sidebar-minorglyphs q9";
			bB = ce("b");
			ae(bB, ct(g_item_glyphs[2]));
			ae(bC, bB);
			ae(h, bC);
			bC = ce("div");
			bC.className = "clear";
			ae(h, bC);
			var bz = Math.max(az[1].length, az[2].length),
				bD = ce("table"),
				br = ce("tbody"),
				bt, bp, bq, bw, bv, by;
			bD.className = "icontab";
			for (var bu = 0; bu < bz; ++bu) {
				bt = ce("tr");
				for (var bx = 0; bx < 2; ++bx) {
					var bA = (bx * az[1].length) + bu;
					bp = ce("th");
					bq = ce("td");
					ae(bt, bp);
					ae(bt, bq);
					if (!az[bx + 1][bu]) {
						continue
					}
					bw = Icon.create("inventoryslot_empty", 1, null, "javascript:;");
					bv = Icon.getLink(bw);
					t[bA] = bw;
					ae(bp, bw);
					by = ce("a");
					H[bA] = by;
					ae(bq, by);
					by.target = bv.target = "_blank";
					by.rel = bv.rel = "np";
					by.onmousedown = bv.onmousedown = rf;
					by.onclick = bv.onclick = rf;
					g_onClick(by, ax.bind(by, bA));
					by.onmouseover = K.bind(null, by, bA);
					by.onmousemove = Tooltip.cursorUpdate;
					by.onmouseout = Tooltip.hide;
					g_onClick(bv, ax.bind(bv, bA));
					bv.onmouseover = K.bind(null, bv, bA);
					bv.onmouseout = Tooltip.hide;
					bq.oncontextmenu = rf
				}
				ae(br, bt)
			}
			ae(bD, br);
			ae(h, bD);
			ae(bo, h)
		}
		ae(aC, bo);
		ae(D, aC)
	}
	function a0(br, bv, bo) {
		var bx = ce("table"),
			bq = ce("tbody"),
			bs, bw;
		for (var bt = 0; bt < bv; ++bt) {
			bs = ce("tr");
			for (var bu = 0; bu < br; ++bu) {
				if (bo && bt > 0) {
					bw = ce("th");
					bw.colSpan = 2;
					ae(bs, bw);
					break
				} else {
					var bp = ce("td");
					bp.className = "talentcalc-main-cell";
					ae(bs, bp)
				}
			}
			ae(bq, bs)
		}
		ae(bx, bq);
		return bx
	}
	function X(bD) {
		var bO = U[bD],
			bT;
		bO.k = 0;
		bO.div = ce("div");
		bO.div2 = ce("div");
		bO.div.style.display = bO.div2.style.display = "none";
		bO.div.style.position = bO.div2.style.position = "relative";
		aef(o, bO.div);
		aef(aj, bO.div2);
		for (var bB = 0; bB < A; ++bB) {
			bO[bB].k = 0;
			var bN = ce("div"),
				bS = ce("div"),
				bA;
			bN.style.backgroundRepeat = "no-repeat";
			if (bB > 0) {
				bN.style.borderLeft = "1px solid black"
			}
			bN.style.position = "absolute";
			bN.style.width = (aN == bi ? "204px" : "244px");
			bN.style.left = ((aN == bi ? 204 : 244) * bB) + (bB == 2 ? 1 : 0) + "px";
			bA = $(bN).clone().get(0);
			bS.className = "talent-tree-inner" + (bB + 1);
			var bM = a0(4, bd);
			ae(bS, bM);
			ae(bN, bS);
			ae(bO.div, bN);
			var bH = $.makeArray($(bM).find("td.talentcalc-main-cell")),
				bQ, bP = "?" + G,
				bJ = (isset("g_beta") ? "beta" : isset("g_ptr") ? "ptr" : "live");
			if (aN == aU) {
				bN.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/hunterpettalents/" + bJ + "/bg_" + (bO[0].i + 1) + ".jpg" + bP + ")";
				bQ = g_staticUrl + "/images/wow/hunterpettalents/" + bJ + "/icons_" + (bO[0].i + 1) + ".jpg" + bP
			} else {
				bN.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/talents/backgrounds/" + bJ + "/" + g_file_classes[bD] + "_" + (bB + 1) + ".jpg" + bP + ")";
				bQ = g_staticUrl + "/images/wow/talents/icons/" + bJ + "/" + g_file_classes[bD] + "_" + (bB + 1) + ".jpg" + bP
			}
			for (var bG = bO[bB].t.length - 1; bG >= 0; --bG) {
				var bx = bO[bB].t[bG],
					bL = Icon.create(bQ, 1, null, "javascript:;"),
					bt = Icon.getLink(bL),
					bC = bH[(bx.y * 4 + bx.x + 1) - 1];
				P[bO[bB].t[bG].i] = bx;
				if ((typeof g_dev == "undefined" || !g_dev) && bC.childNodes.length) {
					bx.hidden = true
				}
				bt.rel = "np";
				bt.target = "_blank";
				bt.onmousedown = rf;
				bt.onclick = rf;
				g_onClick(bt, M.bind(bt, bx));
				bt.onmouseover = ak.bind(null, bt, bx);
				bt.onmouseout = Tooltip.hide;
				var bK = ce("div"),
					bR = ce("div");
				ae(bR, ct("0"));
				bK.className = "icon-border";
				bR.className = "icon-bubble";
				ae(bL, bK);
				ae(bL, bR);
				bx.k = 0;
				bx.i = bG;
				bx.tree = bB;
				bx.classId = bD;
				bx.icon = bL;
				bx.link = bt;
				bx.border = bK;
				bx.bubble = bR;
				if (!bx.hidden) {
					ae(bC, bL)
				}
				if (bx.r) {
					var bv = bO[bB].t[bx.r[0]],
						br = bx.x - bv.x,
						bq = bx.y - bv.y,
						bE, by, bw, bI, bu = -1;
					if (bv.links == null) {
						bv.links = [bG]
					} else {
						bv.links.push(bG)
					}
					if (bq > 0) {
						if (br == 0) {
							bu = 0
						} else {
							if (br < 0) {
								bu = 1
							} else {
								bu = 2
							}
						}
					} else {
						if (bq == 0) {
							if (br > 0) {
								bu = 3
							} else {
								if (br < 0) {
									bu = 4
								}
							}
						}
					}
					if (aN == aU) {
						bw = (Math.abs(br) - 1) * 60;
						bI = (Math.abs(bq) - 1) * 60
					} else {
						bw = (Math.abs(br) - 1) * 50;
						bI = (Math.abs(bq) - 1) * 50
					}
					if (aN == aU) {
						switch (bu) {
						case 0:
							bI += 27;
							bE = 21;
							by = 6 - bI;
							break
						}
					} else {
						switch (bu) {
						case 0:
							bI += 17;
							bE = 16;
							by = 6 - bI;
							break;
						case 1:
							bw += 36;
							bI += 42;
							bE = 16;
							by = 6 - bI;
							break;
						case 2:
							bw += 37;
							bI += 42;
							bE = -6;
							by = 6 - bI;
							break;
						case 3:
							bw += 15;
							bE = -6;
							by = 12;
							break;
						case 4:
							bw += 15;
							bE = 37;
							by = 12;
							break
						}
					}
					var bp = a6(bu, bw, bI);
					bp.style.left = bE + "px";
					bp.style.top = by + "px";
					var bz = ce("div");
					bz.className = "talentcalc-arrow-anchor";
					ae(bz, bp);
					if (!bx.hidden) {
						bC.insertBefore(bz, bC.firstChild)
					}
					bx.arrow = bp
				}
			}
			if (aB > 0 && bO[bB].mastery) {
				bA.style.borderLeft = "";
				bA.style.left = (204 * bB) + "px";
				var bo = ce("div"),
					bs = ce("div"),
					bT;
				bo.className = "talentcalc-masteries-tree";
				bo.style.borderColor = bO[bB].color;
				if (bB > 0) {
					bo.style.marginLeft = "0"
				}
				ae(bo, bs);
				O[bB] = RedButton.create(bO[bB].n, true);
				RedButton.setFunc(O[bB], ag.bind(null, bB));
				ae(bs, O[bB]);
				bT = ce("div");
				bT.className = "mastery-icon";
				bT.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/large/" + bO[bB].icon.toLowerCase() + ".jpg)";
				ae(bT, ce("ins"));
				ae(bs, bT);
				if (Browser.ie) {
					aef(bT, ce("del"))
				} else {
					bs.className = "mastery-glow";
					bs.style.backgroundColor = bO[bB].color
				}
				var bF = 0;
				for (var bG = 2; bG <= bO[bB].role; bG *= 2) {
					if (bO[bB].role & bG) {
						bN = ce("var", {
							className: "role" + bG
						});
						if ((bO[bB].role | bG) != bG) {
							bN.style.right = (1 - (12 * bF)) + "px";
							bN.style.bottom = ((14 * bF) - 8) + "px";
							bF++
						}
						ae(bT, bN)
					}
				}
				if (bO[bB].mastery.spells) {
					var bL, bt;
					for (var bG = 0; bG < 4; ++bG) {
						bT = ce("div");
						bT.style.height = (bG == 0 ? 44 : 26) + "px";
						ae((bG > 0 ? bo : bs), bT);
						if (!bO[bB].mastery.spells[bG]) {
							continue
						}
						if (bG > 0) {
							ae(bT, ce("small"));
							bT = bT.firstChild
						}
						bL = Icon.create(bO[bB].mastery.spells[bG].icon, (bG == 0 ? 1 : 0), null, "/spell=" + bO[bB].mastery.spells[bG].id);
						bt = Icon.getLink(bL);
						bL.style.cssFloat = bL.style.styleFloat = "left";
						a = ce("a");
						a.className = "mastery-spell";
						a.style.height = (bG == 0 ? 44 : 26) + "px";
						st(a, bO[bB].mastery.spells[bG].name);
						a.href = bt.href;
						a.target = bt.target = "_blank";
						ae(bT, bL);
						ae(bT, a)
					}
				}
				bT = ce("div");
				bT.className = "clear pad";
				ae(bo, bT);
				bT = ce("small");
				st(bT, bO[bB].mastery.description);
				ae(bo, bT);
				ae(bA, bo);
				ae(bO.div2, bA)
			}
		}
	}
	function bl() {
		var bo, bp;
		C = ce("div");
		C.className = "talentcalc-upper";
		C.style.display = "none";
		bo = ce("span");
		bo.className = "talentcalc-upper-class";
		bg = a = ce("a");
		a.target = "_blank";
		ae(bo, a);
		ae(bo, ct(" "));
		af = ce("b");
		ae(bo, af);
		ae(C, bo);
		bo = ce("span");
		bo.className = "talentcalc-upper-ptsleft";
		ae(bo, ct(LANG.tc_ptsleft));
		aT = ce("b");
		ae(bo, aT);
		ae(C, bo);
		if (aN == aU || !isset("g_beta")) {
			bp = N = ce("a");
			bp.href = "javascript:;";
			bp.onclick = I.bind(null, bp);
			bp.onmouseover = aA.bind(null, bp);
			bp.onmousemove = Tooltip.cursorUpdate;
			bp.onmouseout = Tooltip.hide;
			ae(bo, bp)
		}
		bo = ce("span");
		bo.className = "talentcalc-upper-reqlevel";
		ae(bo, ct(LANG.tc_reqlevel));
		a3 = ce("b");
		ae(bo, a3);
		ae(C, bo);
		bo = ce("div");
		bo.className = "clear";
		ae(C, bo);
		ae(g, C)
	}
	function B(bs) {
		var bo = "";
		var br = [];
		for (var bq = 0; bq < bs.length; bq += 2) {
			for (var bp = 0; bp < 2; ++bp) {
				br[bp] = parseInt(bs.substring(bq + bp, bq + bp + 1));
				if (isNaN(br[bp])) {
					br[bp] = 0
				}
			}
			bo += at.charAt(br[0] * 6 + br[1])
		}
		return bo
	}
	function l(bo, bv, bu) {
		var bw = U[bo.classId];
		if (bo.k > 0) {
			if (bo.links) {
				for (bq = 0; bq < bo.links.length; ++bq) {
					if (bw[bo.tree].t[bo.links[bq]].k) {
						return
					}
				}
			}
			bo.k--;
			var bt = 0,
				bs = {},
				bp = 0;
			for (var bq = 0; bq < bw[bo.tree].t.length; ++bq) {
				var br = bw[bo.tree].t[bq];
				if (bs[br.y] == null) {
					bs[br.y] = 0
				}
				bs[br.y] += br.k;
				if (br.k > 0) {
					bp = Math.max(bp, br.y)
				}
			}
			for (var bq = 0; bq <= bp; ++bq) {
				if (bt < bq * ar) {
					bo.k++;
					return
				}
				bt += bs[bq]
			}
			bw[bo.tree].k--;
			bq = bw.k--;
			bm(bo.tree, bv, null, bo.classId);
			if (bv) {
				ak(bu, bo);
				if (bw.k >= aa - 1 || aB > 0) {
					ag(false)
				}
				ab()
			}
		}
	}
	function j(bq) {
		var bo = j.L;
		if (bo == null) {
			bo = j.L = {};
			for (var bp in aJ.L) {
				bo[aJ.L[bp]] = bp
			}
		}
		return bo[bq]
	}
	function aJ(bo) {
		return aJ.L[bo]
	}
	aJ.L = {
		6: 9,
		11: 0,
		3: 1,
		8: 2,
		2: 3,
		5: 4,
		4: 5,
		7: 6,
		9: 7,
		1: 8
	};

	function aV(bo) {
		return (bo >= 0 && bo < az[1].length ? 1 : 2)
	}
	function be(bo) {
		return (in_array(aw[aV(bo)], bo) == -1)
	}
	function S(bs) {
		var br = 0;
		for (var bq = 1; bq <= 2; ++bq) {
			for (var bp = 0, bo = az[bq].length; bp < bo; ++bp) {
				if (br == bs) {
					return az[bq][bp]
				}++br
			}
		}
		return 0
	}
	function a2() {
		var bq = U[aR],
			bo;
		if (aN == aU) {
			bo = Math.max(v ? 60 : 0, bq.k > 0 ? (bq.k - v) * 4 + 16 : 0)
		} else {
			if (isset("g_beta")) {
				bo = (bq.k > 0 ? Math.max(0, 2 - bq.k) + Math.min(36, bq.k - 1) * 2 + Math.max(0, bq.k - 37) + 9 : 0)
			} else {
				bo = (bq.k > 0 ? bq.k + 9 : 0)
			}
		}
		for (var bp = 0; bp < al; ++bp) {
			if (bq.glyphs[bp]) {
				bo = Math.max(bo, S(bp))
			}
		}
		return bo
	}
	function aF(br, bp) {
		var bo = br.d;
		var bq = Math.max(0, br.k - 1) + (bp ? 1 : 0);
		return br.d[bq]
	}
	function ax(bp, bo) {
		if (!Q && !be(bp)) {
			if (bo) {
				if (ai(bp)) {
					K(this, bp)
				}
			} else {
				am = bp;
				Lightbox.show("glyphpicker", {
					onShow: bf
				})
			}
		} else {
			if (!bo && this.href != "javascript:;") {
				window.open(this.href)
			} else {
				return false
			}
		}
	}
	function bf(bv, bs, bo) {
		Lightbox.setSize(800, 564);
		var bq;
		if (bs) {
			bv.className = "talentcalc-glyphpicker listview";
			var bp = [],
				bt = ce("div"),
				bu = ce("a"),
				br = ce("div");
			bp.push({
				none: 1
			});
			for (var bw in g_glyphs) {
				bp.push(g_glyphs[bw])
			}
			bt.className = "listview";
			ae(bv, bt);
			bu.className = "screenshotviewer-close";
			bu.href = "javascript:;";
			bu.onclick = Lightbox.hide;
			ae(bu, ce("span"));
			ae(bv, bu);
			br.className = "clear";
			ae(bv, br);
			bq = new Listview({
				template: "glyph",
				id: "glyphs",
				parent: bt,
				data: bp,
				customFilter: q.bind(0, null)
			});
			if (Browser.firefox) {
				aE(bq.getClipDiv(), "DOMMouseScroll", g_pickerWheel)
			} else {
				bq.getClipDiv().onmousewheel = g_pickerWheel
			}
		} else {
			bq = g_listviews.glyphs;
			bq.clearSearch();
			bq.updateFilters(true)
		}
		setTimeout(function () {
			bq.focusSearch()
		},
		1)
	}
	function M(bp, bo) {
		if (!Q) {
			if (bo) {
				l(bp, true, this)
			} else {
				c(bp, true, this)
			}
		} else {
			if (!bo) {
				window.open(this.href)
			} else {
				return false
			}
		}
	}
	function c(br, bo, bq) {
		var bp = U[br.classId];
		if (bp.k < aa) {
			if (br.enabled && br.k < br.m) {
				bp.k++;
				bp[br.tree].k++;
				br.k++;
				bm(br.tree, bo, br, br.classId);
				if (bo) {
					ak(bq, br);
					if (bp.k == aa || aB > 0) {
						ag(false)
					}
					ab()
				}
			}
		} else {
			if (aN == aU && bp.k == aa && !bo) {
				p(-1, 4, true);
				c(br, bo, bq)
			}
		}
	}
	function r() {
		var bs, bu, bq, br = [];
		for (var bt in g_glyphs) {
			br.push(bt)
		}
		br.sort();
		for (var bp = 0, bo = br.length; bp < bo; ++bp) {
			var bt = br[bp];
			bs = g_glyphs[bt];
			bu = bs.classs;
			bq = bs.type;
			if (!bc[bu]) {
				bc[bu] = {
					1: [],
					2: []
				}
			}
			bs.id = bt;
			bs.index = bc[bu][bq].length;
			bc[bu][bq].push(bs.id)
		}
	}
	function q(bq, bo) {
		if (bo.none) {
			return true
		}
		var bp = U[aR];
		return (bo.classs == aR && bo.type == aV(bq != null ? bq : am) && !bp.glyphItems[bo.id])
	}
	function ab() {
		var bp = U[aR];
		if (!bp) {
			return
		}
		E.mode = aN;
		E.classId = aR;
		E.locked = Q;
		E.requiredLevel = a2();
		E.pointsLeft = aa - bp.k;
		E.pointsSpent = (aN == aU ? bp[0].k : [bp[0].k, bp[1].k, bp[2].k]);
		E.bonusPoints = v;
		st(af, "(" + (aN == aU ? bp.k : E.pointsSpent.join("/")) + ")");
		st(a3, E.requiredLevel ? E.requiredLevel : "-");
		st(aT, E.pointsLeft);
		if (Q) {
			st(z, LANG.tc_unlock);
			z.className = "icon-unlock"
		} else {
			st(z, LANG.tc_lock);
			z.className = "icon-lock"
		}
		if (N) {
			if (v) {
				st(N, "[-]");
				N.className = "q10"
			} else {
				st(N, "[+]");
				N.className = "q2"
			}
		}
		if (aG) {
			aG.href = "/talent#" + bb.getWhBuild() + ":" + bb.getWhGlyphs()
		}
		for (var bo = 0; bo < A; ++bo) {
			st(aZ[bo], bp[bo].k)
		}
		if (aS) {
			aS(bb, E, bp)
		}
	}
	function ag(bo) {
		var br = U[aR];
		var bq = aP;
		aP = null;
		if (bo !== false) {
			aP = bo
		} else {
			var bp = 0;
			for (var bo = 0; bo < A; ++bo) {
				if (bp > 0 && br[bo].k == bp) {
					continue
				}
				if (br[bo].k > bp) {
					bp = br[bo].k;
					aP = bo
				}
			}
		}
		for (var bo = 0; bo < A; ++bo) {
			bm(bo, true, null, aR)
		}
		if (isset("g_beta")) {
			$(aL).removeClass("locked mastery");
			$(".talent-tree-inner1, .talent-tree-inner2, .talent-tree-inner3").removeClass("mastery");
			if (aL[aP]) {
				$(aL[aP]).addClass("mastery");
				$(".talent-tree-inner" + (aP + 1)).addClass("mastery")
			}
			if (br.k < aB) {
				for (var bo = 0; bo < A; ++bo) {
					if (bo != aP) {
						$(aL[bo]).addClass("locked")
					}
				}
			}
			a4()
		}
	}
	function a4(bp) {
		var bo = (aB <= 0 ? false : (bp ? g_toggleDisplay(aj) : aP == null));
		o.style.display = (bo ? "none" : "");
		aj.style.display = (bo ? "" : "none");
		RedButton.setText(s, (bo ? LANG.tc_viewtalents : LANG.tc_viewsummary));
		s.style.display = (isset("g_beta") && aR != -1 ? "" : "none")
	}
	function a8() {
		st(bg, ba[aR]);
		if (aN == aU) {
			bg.href = "/pet=" + aR
		} else {
			bg.href = "/class=" + aR;
			bg.className = "c" + aR
		}
		if (R == 0) {
			n.style.display = "";
			aQ.style.display = "";
			if (aG) {
				aG.style.display = ""
			}
			if (h) {
				h.style.display = ""
			}
			C.style.display = "";
			if (aB > 0) {
				aj.style.display = ""
			}
			V.style.display = ""
		} else {
			ag(null)
		}
		var br = U[aR];
		for (var bo = 0; bo < A; ++bo) {
			var bq = aK[bo];
			st(bq, br[bo].n);
			$(aL[bo]).css("background-color", br[bo].color);
			$(".role2, .role4, .role8", aL[bo]).remove();
			for (var bp = 2; bp <= br[bo].role; bp *= 2) {
				if (br[bo].role & bp) {
					d = ce("var", {
						className: "role" + bp
					});
					ae(aL[bo], ce("var", {
						className: "role" + bp
					}))
				}
			}
			Icon.setTexture(aL[bo].icon, 1, br[bo].icon.toLowerCase())
		}
		y();
		e(aR);
		ab();
		++R
	}
	function a1(bw, bu) {
		var bv = U[bu];
		var bx = 0,
			bo = 0;
		var bq = [];
		for (var bs = 0; bs < bw.length; ++bs) {
			var bp = Math.min(parseInt(bw.charAt(bs)), bv[bx].t[bo].m);
			if (isNaN(bp)) {
				continue
			}
			for (var br = 0; br < bp; ++br) {
				c(bv[bx].t[bo])
			}
			for (var bt = 0; bt < bq.length; ++bt) {
				if (bq[bt][0].enabled && bq[bt][1] > 0) {
					for (var br = 0; br < bq[bt][1]; ++br) {
						c(bq[bt][0])
					}
					bq[bt][1] = 0
				}
			}
			if (bv[bx].t[bo].k < bp) {
				bq.push([bv[bx].t[bo], bp - bv[bx].t[bo].k])
			}
			if (++bo > bv[bx].t.length - 1) {
				bo = 0;
				if (++bx > A - 1) {
					break
				}
			}
		}
	}
	function b(bw) {
		var bq = ("" + bw).split(":"),
			bt = 0,
			bp = 0;
		for (var br = 0, bs = bq.length; br < bs; ++br) {
			var bo = bq[br],
				bu = g_glyphs[bo];
			if (bu) {
				var bv = -1;
				if (bu.type == 1) {
					if (bt < aw[1].length) {
						bv = aw[1][bt];
						++bt
					}
				} else {
					if (bp < aw[2].length) {
						bv = aw[2][bp];
						++bp
					}
				}
				if (bv != -1) {
					aH(bv, bo, true)
				}
			} else {
				if (aV(br) == 1) {
					++bt
				} else {
					++bp
				}
			}
		}
	}
	function aM(bz, bw) {
		var bx = U[bw];
		var bA = 0,
			bp = 0;
		var by = [];
		var br = [];
		for (var bu = 0; bu < bz.length; ++bu) {
			var bo = bz.charAt(bu);
			if (bo != T) {
				var bq = at.indexOf(bo);
				if (bq < 0) {
					continue
				}
				by[1] = bq % 6;
				by[0] = (bq - by[1]) / 6;
				for (var bt = 0; bt < 2; ++bt) {
					bq = Math.min(by[bt], bx[bA].t[bp].m);
					for (var bs = 0; bs < bq; ++bs) {
						c(bx[bA].t[bp])
					}
					for (var bv = 0; bv < br.length; ++bv) {
						if (br[bv][0].enabled && br[bv][1] > 0) {
							for (var bs = 0; bs < br[bv][1]; ++bs) {
								c(br[bv][0])
							}
							br[bv][1] = 0
						}
					}
					if (bx[bA].t[bp].k < bq) {
						br.push([bx[bA].t[bp], bq - bx[bA].t[bp].k])
					}
					if (++bp >= bx[bA].t.length) {
						break
					}
				}
			}
			if (bp >= bx[bA].t.length || bo == T) {
				bp = 0;
				if (++bA > A - 1) {
					return
				}
			}
		}
	}
	function F(bp) {
		var bs = 0;
		for (var bq = 0, bo = bp.length; bq < bo && bq < al; ++bq) {
			var br = bp.charAt(bq);
			if (br == "Z") {
				bs = az[1].length;
				continue
			}
			aH(bs, bc[aR][aV(bs)][at.indexOf(br)], true);
			++bs
		}
	}
	function e(bp) {
		ad();
		for (var bo = 0; bo < A; ++bo) {
			bm(bo, true, null, bp)
		}
	}
	function ad() {
		if (aN != bi) {
			return
		}
		var br = 0,
			bs = 0;
		for (var bq = 1; bq <= 2; ++bq) {
			for (var bp = 0, bo = az[bq].length; bp < bo; ++bp) {
				if (a9(bs)) {
					++br
				}++bs
			}
		}
		h.style.display = (br == 0 && Q && x.profiler ? "none" : "")
	}
	function ac(bq, bp) {
		if (U[bq] == null) {
			bp.n = bq;
			U[bq] = bp;
			var br = U[bq];
			br.glyphs = [];
			br.glyphItems = {};
			X(bq);
			if (k && k.classId == bq) {
				for (var bo = 0; bo < A; ++bo) {
					bm(bo, false, null, bq)
				}
				if (k.wh || k.blizz) {
					Q = true;
					if (k.wh) {
						aM(k.wh, bq)
					} else {
						a1(k.blizz, bq)
					}
				}
			} else {
				Q = false
			}
			k = null;
			ag(false);
			if (bj && bj.classId == bq) {
				if (bj.wh) {
					F(bj.wh)
				} else {
					b(bj.blizz)
				}
			}
			bj = null;
			if (bq == aR) {
				a8();
				br.div.style.display = br.div2.style.display = "";
				a4();
				for (var bo = 0; bo < A; ++bo) {
					bm(bo, true, null, bq)
				}
			}
		}
	}
	function ai(bq, bo) {
		var bp = U[aR];
		if (bp.glyphs[bq]) {
			bp.glyphItems[bp.glyphs[bq]] = 0;
			bp.glyphs[bq] = 0;
			if (!bo) {
				a9(bq);
				ab()
			}
			return true
		}
	}
	function ay(bo) {
		bh(bo);
		aW();
		e(bo)
	}
	function bh(bp) {
		if (aN == aU) {
			p(-1, 0, true)
		}
		ag(null);
		for (var bo = 0; bo < A; ++bo) {
			a7(bo, bp, false)
		}
	}
	function aW(br) {
		var bt = U[aR];
		if (!bt) {
			return
		}
		var bs = 0;
		for (var bq = 1; bq <= 2; ++bq) {
			for (var bp = 0, bo = az[bq].length; bp < bo; ++bp) {
				ai(bs, !br);
				++bs
			}
		}
		ad()
	}
	function a7(bo, br, bq) {
		var bs = U[br];
		var bp;
		for (bp = 0; bp < bs[bo].t.length; ++bp) {
			bs[bo].t[bp].k = 0
		}
		bs.k -= bs[bo].k;
		bs[bo].k = 0;
		if (bq) {
			if (aP == bo) {
				ag(false)
			}
			for (bo = 0; bo < A; ++bo) {
				bm(bo, true, null, br)
			}
			ab()
		}
	}
	function aq() {
		if (aO) {
			if (aO.wh) {
				aY(aO.wh)
			} else {
				Y(aO.classId, aO.blizz)
			}
		}
		if (W) {
			if (W.wh) {
				L(W.wh)
			}
		}
	}
	function Y(bo, bp) {
		if (ba[bo] == null) {
			return
		}
		if (!bp) {
			return
		}
		Q = true;
		if (!aO) {
			aO = {
				classId: bo,
				blizz: bp
			};
			f.style.display = ""
		}
		if (U[bo]) {
			bh(bo);
			e(bo);
			a1(bp, bo);
			e(bo);
			ag(false)
		} else {
			k = {
				classId: bo,
				blizz: bp
			}
		}
		if (!u(bo)) {
			ab()
		}
	}
	function bk(bo) {
		if (!bo) {
			return
		}
		if (U[aR]) {
			aW();
			b(bo);
			ad();
			ab()
		} else {
			bj = {
				classId: aR,
				blizz: bo
			}
		}
	}
	function an(bo) {
		if (isNaN(bo) || (bo != 0 && bo != 4 && bo != 5)) {
			return
		}
		p(-1, bo)
	}
	function u(bo) {
		if (ba[bo] == null) {
			return
		}
		if (bo != aR) {
			ap = aR;
			aR = bo;
			if (aN == aU && U[bo] == null) {
				ac(bo, bn(bo))
			} else {
				if (U[bo]) {
					a8();
					var bp = U[bo];
					bp.div.style.display = bp.div2.style.display = "";
					a4()
				} else {
					g_ajaxIshRequest("/data=talents?class=" + bo + "&" + G)
				}
			}
			if (U[ap]) {
				U[ap].div.style.display = U[ap].div2.style.display = "none"
			}
			return true
		}
	}
	function av(bo) {
		if (Q != bo) {
			Q = bo;
			e(aR);
			ab()
		}
	}
	function p(bq, br, bp) {
		var bo = aa;
		if (bq == -1) {
			bq = a5
		}
		if (br == -1) {
			br = v
		}
		a5 = bq;
		v = br;
		aa = bq + br;
		if (aR != -1) {
			if (aa < bo) {
				y()
			}
			e(aR);
			if (!bp) {
				ab()
			}
		}
	}
	function J(bs) {
		al = 0;
		aw = {};
		var br = 0;
		for (var bq = 1; bq <= 2; ++bq) {
			aw[bq] = [];
			for (var bp = 0, bo = az[bq].length; bp < bo; ++bp) {
				if (bs >= az[bq][bp]) {
					aw[bq].push(br);
					al++
				}++br
			}
		}
	}
	function aY(bs) {
		if (!bs) {
			return
		}
		var bo = bs,
			bp = false,
			bq;
		if (aN == aU) {
			var bt = at.indexOf(bs.charAt(0));
			if (bt >= 0 && bt <= 4) {
				var br = at.indexOf(bs.charAt(1));
				if (br % 2 == 1) {
					p(-1, 4, true);
					--br
				} else {
					p(-1, 0, true)
				}
				bq = bt * 10 + (br / 2);
				if (g_pet_families[bq] != null) {
					bs = bs.substr(2);
					bp = true
				}
			}
		} else {
			var bt = at.indexOf(bs.charAt(0));
			if (bt >= 0 && bt <= 28) {
				var br = bt % 3;
				var bq = (bt - br) / 3;
				if (br == 1) {
					p(-1, 5, true);
					--br
				} else {
					p(-1, 0, true)
				}
				bq = j(bq);
				if (bq != null) {
					bs = bs.substr(1);
					bp = true
				}
			}
		}
		if (bp) {
			if (bs.length) {
				Q = true;
				if (!aO) {
					aO = {
						wh: bo
					};
					f.style.display = ""
				}
			}
			if (U[bq]) {
				bh(bq);
				aM(bs, bq);
				e(bq);
				ag(false)
			} else {
				k = {
					classId: bq,
					wh: bs
				}
			}
			if (!u(bq)) {
				ab()
			}
			return bq
		}
	}
	function L(bo) {
		if (!bo) {
			return
		}
		if (!W) {
			W = {
				wh: bo
			}
		}
		if (U[aR]) {
			aW();
			F(bo);
			ad();
			ab()
		} else {
			bj = {
				classId: aR,
				wh: bo
			}
		}
	}
	function K(bu, bt) {
		var bs = U[aR],
			bq = "",
			bo = "",
			br = g_glyphs[bs.glyphs[bt]],
			bp = be(bt);
		if (br && !bp) {
			bq += "<b>" + br.name + "</b>";
			bq += '<br /><span class="q9">' + LANG[bt < az[1].length ? "tc_majgly" : "tc_mingly"] + "</span>";
			bo += '<span class="q">' + br.description + "</span>";
			if (!Q) {
				bo += '<br /><span class="q10">' + LANG.tc_remgly + "</span>"
			}
		} else {
			if (!bp) {
				bq += '<b class="q0">' + LANG.tc_empty + "</b>";
				bq += '<br /><span class="q9">' + LANG[bt < az[1].length ? "tc_majgly" : "tc_mingly"] + "</span>";
				if (!Q) {
					bo += '<span class="q2">' + LANG.tc_addgly + "</span>"
				}
			} else {
				bq += '<b class="q0">' + LANG.tc_locked + "</b>";
				bq += '<br /><span class="q9">' + LANG[bt < az[1].length ? "tc_majgly" : "tc_mingly"] + "</span>";
				bo += '<span class="q10">' + sprintf(LANG.tc_lockgly, S(bt)) + "</span>"
			}
		}
		if (br && bu.parentNode.className.indexOf("icon") != 0) {
			Tooltip.setIcon(br.icon)
		} else {
			Tooltip.setIcon(null)
		}
		Tooltip.show(bu, Tooltip.getMultiPartHtml(bq, bo))
	}
	function ak(br, bq) {
		var bp = U[bq.classId],
			bo = "<table><tr><td><b>";
		if (bq.z) {
			bo += '<span style="float: right" class="q0">' + bq.z + "</span>"
		}
		bo += bq.n + "</b><br />" + sprintf(LANG.tc_rank, bq.k, bq.m) + "<br />";
		if (bq.r) {
			if (bp[bq.tree].t[bq.r[0]].k < bq.r[1]) {
				bo += '<span class="q10">';
				bo += sprintf(LANG[bq.r[1] == 1 ? "tc_prereq" : "tc_prereqpl"], bq.r[1], bp[bq.tree].t[bq.r[0]].n);
				bo += "</span><br />"
			}
		}
		if (bp[bq.tree].k < bq.y * ar) {
			bo += '<span class="q10">' + sprintf(LANG.tc_tier, (bq.y * ar), bp[bq.tree].n) + "</span><br />"
		}
		if (bq.t && bq.t.length >= 1) {
			bo += bq.t[0]
		}
		bo += "</td></tr></table><table><tr><td>";
		if (bq.t && bq.t.length > 1) {
			bo += bq.t[1] + "<br />"
		}
		bo += '<span class="q">' + aF(bq) + "</span><br />";
		if (Q) {} else {
			if (bq.enabled) {
				if (!bq.k) {
					bo += '<span class="q2">' + LANG.tc_learn + "</span><br />"
				} else {
					if (bq.k == bq.m) {
						bo += '<span class="q10">' + LANG.tc_unlearn + "</span><br />"
					}
				}
				if (bq.k && bq.k < bq.m) {
					bo += "<br />" + LANG.tc_nextrank + '<br /><span class="q">' + aF(bq, 1) + "</span><br />"
				}
			}
		}
		bo += "</td></tr></table>";
		Tooltip.show(br, g_setTooltipLevel(bo, a2()))
	}
	function aI(bo) {
		if (Locale.getId() == LOCALE_ENUS) {
			return bo.replace(/^Glyph of (the )?/i, "")
		}
		return bo
	}
	function w() {
		Q = !Q;
		e(aR);
		ab();
		return Q
	}
	function a9(bu) {
		var bt = U[aR],
			bq = t[bu],
			bs = Icon.getLink(bq),
			bp = be(bu),
			bo = H[bu];
		if (bt.glyphs[bu] && !bp) {
			var br = g_glyphs[bt.glyphs[bu]];
			Icon.setTexture(bq, 1, br.icon);
			bo.href = bs.href = "/item=" + br.id;
			st(bo, aI(br.name));
			bo.className = "q1";
			return true
		} else {
			Icon.setTexture(bq, 1, "inventoryslot_empty");
			bo.href = bs.href = "javascript:;";
			st(bo, (!bp ? LANG.tc_empty : LANG.tc_locked));
			bo.className = "q0";
			return false
		}
	}
	function bm(bw, br, bo, bs) {
		var bu = U[bs];
		var bt = (aB > 0 && (aP === null || (bu[aP] && bu[aP].k < aB)));
		if (bt && bw != aP && bu[bw].k > 0) {
			return a7(bw, bs, true)
		}
		var bq;
		if (!bo || bu.k == aa) {
			bq = aa - 21
		} else {
			bq = Math.ceil(bu[bw].k / ar) * ar
		}
		for (var bp = 0; bp < bu[bw].t.length; ++bp) {
			bo = bu[bw].t[bp];
			if (bt && bw != aP) {
				bo.enabled = 0
			} else {
				if (bu.k == aa && !bo.k) {
					bo.enabled = 0
				} else {
					if (bu[bw].k >= bo.y * ar) {
						if (bo.r) {
							if (bu[bw].t[bo.r[0]].k >= bo.r[1]) {
								bo.enabled = 1
							} else {
								bo.enabled = 0
							}
						} else {
							bo.enabled = 1
						}
					} else {
						bo.enabled = 0
					}
				}
			}
			if (br) {
				if (bo.enabled && (!Q || bo.k)) {
					if ((bo.k == bo.m)) {
						bo.border.style.backgroundPosition = "-42px 0";
						bo.bubble.style.color = "#E7BA00"
					} else {
						bo.border.style.backgroundPosition = "-84px 0";
						bo.bubble.style.color = "#17FD17"
					}
					Icon.moveTexture(bo.icon, 1, bp, 0);
					bo.link.className = "bubbly";
					bo.bubble.style.visibility = "visible";
					if (bo.r) {
						var bv = bo.arrow.firstChild;
						if (bv.className.charAt(bv.className.length - 1) != "2") {
							bv.className += "2"
						}
					}
				} else {
					bo.border.style.backgroundPosition = "0 0";
					Icon.moveTexture(bo.icon, 1, bp, 1);
					bo.link.className = "";
					bo.bubble.style.visibility = "hidden";
					if (bo.r) {
						var bv = bo.arrow.firstChild;
						if (bv.className.charAt(bv.className.length - 1) == "2") {
							bv.className = bv.className.substr(0, bv.className.length - 1)
						}
					}
				}
				bo.bubble.firstChild.nodeValue = bo.k;
				bo.link.href = "/spell=" + bo.s[Math.max(0, bo.k - 1)]
			}
		}
	}
}
TalentCalc.MODE_DEFAULT = 0;
TalentCalc.MODE_PET = 1;
Listview.templates.glyph = {
	sort: [1],
	nItemsPerPage: -1,
	hideBands: 2,
	hideNav: 1 | 2,
	hideHeader: 1,
	searchable: 1,
	searchDelay: 100,
	poundable: 0,
	filtrable: 0,
	clip: {
		w: 780,
		h: 486
	},
	onBeforeCreate: function () {
		this.applySort()
	},
	onSearchSubmit: function (b) {
		if (this.nRowsVisible != 1) {
			return
		}
		$WowheadTalentCalculator.addGlyph(b.id)
	},
	columns: [{
		id: "glyph",
		type: "text",
		align: "left",
		value: "name",
		span: 2,
		compute: function (g, j, h) {
			if (g.none) {
				return
			}
			var c = ce("td");
			c.style.width = "1px";
			c.style.padding = "0";
			c.style.borderRight = "none";
			var e = Icon.create(g.icon, 0, null, "/item=" + g.id),
				f = Icon.getLink(e);
			ae(c, e);
			ae(h, c);
			j.style.borderLeft = "none";
			f.onclick = rf;
			var b = ce("a");
			b.style.fontFamily = "Verdana, sans-serif";
			b.href = "/item=" + g.id;
			ae(b, ct($WowheadTalentCalculator.simplifyGlyphName(g.name)));
			j.style.whiteSpace = "nowrap";
			ae(j, b);
			$(h).click(function (k) {
				if (k.which != 2 || k.target != b) {
					k.preventDefault();
					($WowheadTalentCalculator.addGlyph.bind(null, g.id))()
				}
			})
		},
		sortFunc: function (e, c, f) {
			if (e.none) {
				return -1
			}
			return strcmp(e.name, c.name)
		}
	},
	{
		id: "description",
		type: "text",
		align: "left",
		value: "description",
		compute: function (b, e) {
			if (b.none) {
				return
			}
			var c = ce("div");
			c.className = "small crop";
			e.title = b.description;
			ae(c, ct(b.description));
			ae(e, c)
		}
	},
	{
		id: "skill",
		type: "text",
		align: "center",
		getValue: function (b) {
			if (b.none) {
				return
			}
			return g_spell_skills[b.skill]
		},
		compute: function (b, e, c) {
			if (b.none) {
				ee(c);
				$(c).click($WowheadTalentCalculator.addGlyph.bind(null, 0));
				e.colSpan = 4;
				e.style.fontWeight = "bold";
				e.style.textAlign = "center";
				return LANG.dash + LANG.tc_nonegly + LANG.dash
			}
			if (b.skill) {
				e.className = "small q0";
				e.style.whiteSpace = "nowrap";
				return g_spell_skills[b.skill]
			}
		}
	}]
};
var talentSummary;