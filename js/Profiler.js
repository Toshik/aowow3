var $WowheadProfiler;

function Profiler() {
	$WowheadProfiler = this;
	var E = 0,
		aw = 1,
		N = 2,
		C = 3,
		ax = 4,
		m = 5,
		B = 14,
		aI = this,
		ak = {},
		Q = {},
		ad = [],
		X, v, an, aK, aa, aR, ah, aM, aF, j, o, n, l, h, J, w, b, Z, f, g, aB, aS, G, at, Y, aq, z, k, S, P, ac, aG, A, aP, aA, M, a, u, av, F, I, W, aj, p, c, q, U, al, aD, e, x, aO, K, az, s = {
		atkpwr: ["mleatkpwr", "rgdatkpwr"],
		critstrkrtng: ["mlecritstrkrtng", "rgdcritstrkrtng", "arcsplcritstrkrtng", "firsplcritstrkrtng", "frosplcritstrkrtng", "holsplcritstrkrtng", "natsplcritstrkrtng", "shasplcritstrkrtng"],
		hastertng: ["mlehastertng", "rgdhastertng", "splhastertng"],
		hitrtng: ["mlehitrtng", "rgdhitrtng", "splhitrtng"],
		splpwr: ["splheal", "arcspldmg", "firspldmg", "frospldmg", "holspldmg", "natspldmg", "shaspldmg"],
		spldmg: ["arcspldmg", "firspldmg", "frospldmg", "holspldmg", "natspldmg", "shaspldmg"],
		splcritstrkpct: ["arcsplcritstrkpct", "firsplcritstrkpct", "frosplcritstrkpct", "holsplcritstrkpct", "natsplcritstrkpct", "shasplcritstrkpct"],
		splcritstrkrtng: ["arcsplcritstrkrtng", "firsplcritstrkrtng", "frosplcritstrkrtng", "holsplcritstrkrtng", "natsplcritstrkrtng", "shasplcritstrkrtng"],
		arcsplpwr: ["arcspldmg"],
		firsplpwr: ["firspldmg"],
		frosplpwr: ["frospldmg"],
		holsplpwr: ["holspldmg"],
		natsplpwr: ["natspldmg"],
		shasplpwr: ["shaspldmg"]
	},
		R = {
		3456: {
			0: 576,
			1: 577
		},
		4493: {
			0: 1876,
			1: 625
		},
		4500: {
			0: 622,
			1: 623
		},
		4273: {
			0: 2894,
			1: 2895
		},
		4722: {
			0: 3917,
			1: 3916
		},
		4812: {
			0: 4532,
			1: 4608
		}
	},
		aC = [3456, 4493, 4500, 4273, 4722, 4812],
		aN = {
		14922: 0,
		14923: 1,
		14961: 0,
		14962: 1,
		15001: 0,
		15002: 1,
		15041: 0,
		15042: 1
	};
	g_items.add = function (aV, aU) {
		if (aU.jsonequip) {
			ao(aU.jsonequip);
			if (aU.jsonequip.socketbonusstat) {
				ao(aU.jsonequip.socketbonusstat)
			}
			if (aU.jsonequip.subitems) {
				for (var aT in aU.jsonequip.subitems) {
					if (aU.jsonequip.subitems[aT].jsonequip) {
						ao(aU.jsonequip.subitems[aT].jsonequip)
					}
				}
			}
		}
		if (g_items[aV] != null) {
			cO(g_items[aV], aU)
		} else {
			g_items[aV] = aU
		}
	};
	this.initialize = function (aU, aT) {
		v = ge(aU);
		if (!v) {
			return
		}
		ay();
		ab();
		aL();
		O();
		if (aT && aT.id) {
			T(aT.id)
		} else {
			ar({
				id: 0,
				name: LANG.pr_header_noname,
				region: ["", ""],
				battlegroup: ["", ""],
				realm: ["", ""],
				level: 80,
				classs: 1,
				race: 1,
				faction: 0,
				gender: 0,
				source: 0,
				sourcename: "",
				user: g_user.id,
				username: g_user.name,
				published: 1,
				nomodel: 0,
				talents: {},
				pets: {},
				skills: {},
				reputation: {},
				achievements: {},
				statistics: {},
				titles: {},
				quests: {},
				spells: {}
			});
			q.resetAll();
			h.onclick()
		}
	};
	this.requestProfile = function (aT) {
		T(aT)
	};
	this.registerProfile = function (aT) {
		ar(aT)
	};
	this.isArmoryProfile = function (aT) {
		return aQ(aT)
	};
	this.showGearScoreTooltip = function (aT, aU) {
		ap(aT, aU)
	};
	this.updateInfoboxSpec = function () {
		aJ()
	};
	this.setPlayedTime = function (aT) {
		ak.playedtime = aT;
		L()
	};
	this.setTitles = function (aV, aU, aT) {
		ak.titles = {};
		cO(ak.titles, aV);
		aj.hide(8, 1);
		e.setData(ak.titles, aU, aT);
		ai()
	};
	this.setQuests = function (aV, aU, aT) {
		ak.quests = {};
		cO(ak.quests, aV);
		aj.hide(6, 1);
		x.setData(ak.quests, aU, aT)
	};
	this.setSpells = function (aV, aU, aT) {
		ak.spells = {};
		cO(ak.spells, aV);
		aj.hide(3, 1);
		K.setData(ak.spells, aU, aT);
		aj.hide(4, 1);
		aO.setData(ak.spells, aU, aT);
		aj.hide(5, 1);
		az.setData(ak.spells, aU, aT);
		V()
	};
	this.resetExclusions = function () {
		if (!confirm(LANG.confirm_resetexclusions)) {
			return
		}
		g_user.excludegroups = 1;
		g_user.excludes = {};
		g_user.includes = {};
		new Ajax("/account=exclude?reset");
		K.updateExclusions();
		aO.updateExclusions();
		az.updateExclusions();
		x.updateExclusions();
		aD.updateExclusions();
		e.updateExclusions();
		al.updateExclusions();
		Lightbox.hide()
	};
	this.loadOnDemand = function (aU, aT) {
		K.onLoad(aU, aT);
		aO.onLoad(aU, aT);
		az.onLoad(aU, aT);
		x.onLoad(aU, aT);
		aD.onLoad(aU, aT);
		e.onLoad(aU, aT);
		al.onLoad(aU, aT)
	};
	this.resync = function () {
		if (!aQ()) {
			return
		}
		J.innerHTML = LANG.pr_queue_addqueue;
		J.style.display = "";
		RedButton.enable(aF, false);
		RedButton.setFunc(aF, null);
		new Ajax("/profile=resync&id=" + ak.source, {
			method: "POST",
			onSuccess: function (aV, aT) {
				var aU = parseInt(aV.responseText);
				if (isNaN(aU)) {
					alert(LANG.message_resyncerror + aU)
				} else {
					if (aU < 0 && aU != -102) {
						alert(LANG.message_resyncerror + "#" + aU)
					}
				}
				pr_updateStatus(J, ak.source, true)
			}
		})
	};
	this.link = function () {
		if (!aQ() || !g_user.id) {
			return
		}
		Tooltip.hide();
		if (confirm(LANG.confirm_linkcharacter)) {
			new Ajax("/profile=link&id=" + ak.source);
			RedButton.enable(aM, false);
			RedButton.setFunc(aM, null);
			aM.onmouseover = null;
			aM.onmousemove = null;
			aM.onmouseout = null;
			if (confirm(LANG.confirm_linkedcharacter)) {
				window.open("/user=" + g_user.name + "#characters")
			}
		}
	};
	this.save = function () {
		if (ak.user != g_user.id) {
			return
		}
		var aU = q.getTalentBuilds();
		var aV = ["name=" + urlencode(ak.name), "level=" + urlencode(ak.level), "class=" + urlencode(ak.classs), "race=" + urlencode(ak.race), "gender=" + urlencode(ak.gender), "nomodel=" + urlencode(ak.nomodel), "talenttree1=" + urlencode(aU.spent[0]), "talenttree2=" + urlencode(aU.spent[1]), "talenttree3=" + urlencode(aU.spent[2]), "activespec=" + urlencode(aU.active), "talentbuild1=" + urlencode(aU.talents[0]), "glyphs1=" + urlencode(aU.glyphs[0]), "talentbuild2=" + urlencode(aU.talents[1]), "glyphs2=" + urlencode(aU.glyphs[1]), "gearscore=" + urlencode(ak.gearscore), "icon=" + urlencode(ak.icon), "public=" + urlencode(ak.published)];
		if (ak.description) {
			aV.push("description=" + urlencode(ak.description))
		}
		if (ak.source) {
			aV.push("source=" + ak.source)
		}
		if (ak.copy) {
			aV.push("copy=" + ak.copy)
		}
		var aW = p.getInventory();
		for (var aT in aW) {
			aV.push("inv[]=" + aT + "," + aW[aT].join(","))
		}
		new Ajax("/profile=save&id=" + ak.id, {
			method: "POST",
			params: aV.join("&"),
			onSuccess: function (aZ, aX) {
				var aY = parseInt(aZ.responseText);
				if (isNaN(aY)) {
					alert(LANG.message_saveerror)
				} else {
					if (aY < 0) {
						alert(LANG.message_saveerror)
					} else {
						if (aY != ak.id) {
							r(1);
							location.href = "/profile=" + aY
						} else {
							ak.lastupdated = g_serverTime;
							r(1);
							L();
							alert(LANG.message_saveok)
						}
					}
				}
			}
		})
	};
	this.saveAs = function () {
		var aT = prompt(LANG.prompt_nameprofile, ak.name);
		if (!aT) {
			return
		} else {
			if (!aT.match(/^[a-zA-Z][a-zA-Z0-9 ]{0,29}$/)) {
				return alert(LANG.message_saveasinvalidname)
			}
		}
		au({
			id: 0,
			name: aT,
			copy: ak.id
		});
		aI.save()
	};
	this.remove = function () {
		if (ak.user != g_user.id) {
			return
		}
		if (!confirm(LANG.confirm_deleteprofile2)) {
			return
		}
		new Ajax("/profile=delete&id=" + ak.id, {
			method: "POST",
			onSuccess: function (aU, aT) {
				location.href = "/user=" + g_user.name + "#profiles"
			}
		})
	};
	this.updateSavedChanges = function (aT) {
		return r(aT)
	};
	this.updateGearScore = function () {
		return y()
	};
	this.equipItem = function (aU, aT) {
		return p.equipItem(aU, aT)
	};
	this.equipSubitem = function (aU, aT) {
		return p.equipSubitem(aU, aT)
	};
	this.socketItem = function (aT, aV, aU) {
		return p.socketItem(aT, aV, aU)
	};
	this.enchantItem = function (aU, aT) {
		return p.enchantItem(aU, aT)
	};
	this.calcScore = function (aU, aT) {
		return af(aU, aT)
	};
	this.selectPet = function (aT) {
		Lightbox.hide();
		return _selectPet(aT)
	};
	this.updateMenu = function (aU, aT) {
		return p.updateMenu(aU, aT)
	};
	this.onMouseUpSlot = function (aU, aT, aV) {
		return p.onMouseUpSlot(aU, aT, aV)
	};
	this.fixJson = function (aT, aU) {
		ao(aT, aU)
	};
	this.getVars = function () {
		return {
			profile: ak,
			statistics: c,
			inventory: p,
			talents: q,
			tabs: aj,
			dialog: W
		}
	};

	function ay() {
		for (var aV in g_itemsets) {
			for (var aU in g_itemsets[aV].setbonus) {
				ao(g_itemsets[aV].setbonus[aU])
			}
		}
		for (var aV in g_gems) {
			ao(g_gems[aV].jsonequip)
		}
		for (var aV in g_enchants) {
			ao(g_enchants[aV].jsonequip)
		}
		for (var aV in R) {
			R[aV].achievements = {
				0: [],
				1: []
			}
		}
		for (var aV in g_achievements) {
			var aT = g_achievements[aV];
			if (R[aT.zone] && aN[aT.category] != null) {
				R[aT.zone].achievements[aN[aT.category]].push(aT.id)
			}
		}
	}
	function ao(aX, aZ) {
		for (var aW in s) {
			var aY = aX[aW],
				aV = s[aW];
			if (aY && aV.length) {
				for (var aU = 0, aT = aV.length; aU < aT; ++aU) {
					if (typeof aY == "object") {
						if (aY.length) {
							aX[aV[aU]] = aY.slice(0)
						} else {
							aX[aV[aU]] = {};
							cO(aX[aV[aU]], aY)
						}
					} else {
						aX[aV[aU]] = aY
					}
				}
				delete aX[aW];
				if (aZ) {
					break
				}
			}
		}
	}
	function aL() {
		var aU, aV, aT, aW;
		aB = aU = ce("div");
		aU.className = "profiler-tabs";
		ae(v, aU);
		aj = new Tabs({
			parent: aU,
			onShow: am
		});
		c = new ProfilerStatistics(aI);
		q = new ProfilerTalents(aI);
		aU = ce("div");
		aU.id = "tab-inventory";
		aU.style.display = "none";
		aS = aV = ce("div");
		aV.style.display = "none";
		ae(aU, aS);
		ae(v, aU);
		p = new ProfilerInventory(aI);
		aW = aj.add(LANG.tab_character, {
			id: "inventory"
		});
		p.initialize(aS, aW);
		aG = ce("div");
		aS.insertBefore(aG, aS.childNodes[3]);
		c.initialize(aG, aW);
		aU = ce("div");
		aU.id = "tab-talents";
		aU.style.display = "none";
		A = aV = ce("div");
		aV.style.display = "none";
		ae(aU, A);
		ae(v, aU);
		aW = aj.add(LANG.tab_talents, {
			id: "talents"
		});
		q.initialize(A, aW);
		aU = ce("div");
		aU.id = "tab-pets";
		aU.style.display = "none";
		aP = aV = ce("div");
		aV.style.display = "none";
		ae(aU, aP);
		ae(v, aU);
		U = new ProfilerTalents(aI);
		aW = aj.add(LANG.tab_pets, {
			id: "pets",
			hidden: 1
		});
		U.initialize(aP, aW);
		aU = ce("div");
		aU.id = "tab-mounts";
		aU.style.display = "none";
		F = aV = ce("div");
		aV.style.display = "none";
		ae(aU, F);
		ae(v, aU);
		K = new ProfilerCompletion(aI);
		aW = aj.add(LANG.tab_mounts, {
			id: "mounts",
			hidden: 1
		});
		K.initialize(F, aW, {
			template: "gallery",
			noAd: 1,
			onDemand: 1,
			source: "g_spells",
			catgid: "skill",
			subcat: "cat",
			typeid: 6,
			filter: function (aX) {
				return (aX.cat == -5 || aX.cat == 7)
			},
			models: 1
		});
		aU = ce("div");
		aU.id = "tab-companions";
		aU.style.display = "none";
		av = aV = ce("div");
		aV.style.display = "none";
		ae(aU, av);
		ae(v, aU);
		aO = new ProfilerCompletion(aI);
		aW = aj.add(LANG.tab_companions, {
			id: "companions",
			hidden: 1
		});
		aO.initialize(av, aW, {
			template: "gallery",
			noAd: 1,
			onDemand: 1,
			source: "g_spells",
			catgid: "skill",
			subcat: "cat",
			typeid: 6,
			filter: function (aX) {
				return aX.cat == -6
			},
			models: 1
		});
		aU = ce("div");
		aU.id = "tab-recipes";
		aU.style.display = "none";
		I = aV = ce("div");
		aV.style.display = "none";
		ae(aU, I);
		ae(v, aU);
		az = new ProfilerCompletion(aI);
		aW = aj.add(LANG.tab_recipes, {
			id: "recipes",
			hidden: 1
		});
		az.initialize(I, aW, {
			template: "spell",
			onDemand: 1,
			dataArgs: function (aX) {
				var aY = [185, 129, 356];
				for (var aZ in aX.skills) {
					aY.push(aZ)
				}
				return "&skill=" + aY.join(",")
			},
			source: "g_spells",
			order: "g_skill_order",
			catgs: "g_spell_skills",
			catgid: "skill",
			subcat: "cat",
			typeid: 6,
			filter: function (aX) {
				return aX.cat == 11 || aX.cat == 9
			},
			reqcatg: 1,
			noempty: 1
		});
		aU = ce("div");
		aU.id = "tab-quests";
		aU.style.display = "none";
		u = aV = ce("div");
		aV.style.display = "none";
		ae(aU, u);
		ae(v, aU);
		x = new ProfilerCompletion(aI);
		aW = aj.add(LANG.tab_quests, {
			id: "quests",
			hidden: 1
		});
		x.initialize(u, aW, {
			template: "quest",
			onDemand: 1,
			partial: 1,
			dataArgs: function (aX) {
				return "&partial"
			},
			source: "g_quests",
			order: "g_quest_catorder",
			catgs: "g_quest_categories",
			catgid: "category2",
			subcat: "category",
			typeid: 5,
			overall: -1,
			reqcatg: 1,
			nosubcatg: [4],
			subname: function (aX) {
				return Listview.funcBox.getQuestCategory(aX)
			}
		});
		aU = ce("div");
		aU.id = "tab-achievements";
		aU.style.display = "none";
		M = aV = ce("div");
		aV.style.display = "none";
		ae(aU, M);
		ae(v, aU);
		aD = new ProfilerCompletion(aI);
		aW = aj.add(LANG.tab_achievements, {
			id: "achievements",
			hidden: 1
		});
		aD.initialize(M, aW, {
			template: "achievement",
			source: "g_achievements",
			order: "g_achievement_catorder",
			catgs: "g_achievement_categories",
			catgid: "parentcat",
			subcat: "category",
			typeid: 10,
			nototal: [81],
			points: 1,
			overall: 0,
			compute: function (aY, aX) {
				if (aY.parentcat == -1) {
					aY.parentcat = aY.category
				}
				return aX
			},
			subname: function (aX) {
				return g_achievement_categories[aX]
			}
		});
		aU = ce("div");
		aU.id = "tab-titles";
		aU.style.display = "none";
		a = aV = ce("div");
		aV.style.display = "none";
		ae(aU, a);
		ae(v, aU);
		e = new ProfilerCompletion(aI);
		aW = aj.add(LANG.tab_titles, {
			id: "titles",
			hidden: 1
		});
		e.initialize(a, aW, {
			template: "title",
			noAd: 1,
			source: "g_titles",
			catgid: "category",
			typeid: 11
		});
		aU = ce("div");
		aU.id = "tab-reputation";
		aU.style.display = "none";
		aA = aV = ce("div");
		aV.style.display = "none";
		ae(aU, aA);
		ae(v, aU);
		al = new ProfilerCompletion(aI);
		aW = aj.add(LANG.tab_reputation, {
			id: "reputation",
			hidden: 1
		});
		al.initialize(aA, aW, {
			template: "faction",
			onDemand: "factions",
			source: "g_factions",
			order: "g_faction_order",
			catgs: "g_faction_categories",
			catgid: "category2",
			subcat: "category",
			typeid: 8,
			compute: function (aY, aX) {
				aY.standing = aX | 0;
				return aX >= 42000
			}
		});
		aj.flush()
	}
	function r(aT) {
		if (aT) {
			J.style.display = "none";
			J.style.backgroundImage = ""
		} else {
			J.innerHTML = sprintf(LANG.message_profilenotsaved, '<span style="color: red">', "</span>");
			J.style.display = "";
			J.style.backgroundImage = "none"
		}
		window.onbeforeunload = (aT ? null : function (aU) {
			return LANG.message_savebeforeexit
		})
	}
	function aH() {
		var aT = "chr_" + g_file_races[ak.race] + "_" + g_file_genders[ak.gender] + "_" + g_file_classes[ak.classs] + "0" + Math.max(1, (Math.floor(ak.level / 10) - 4));
		if (!ak.icon) {
			ak.icon = aT
		}
		ak.defaulticon = (ak.icon == aT)
	}
	function ab() {
		var aU, aV, aT;
		W = new Dialog();
		an = aU = ce("div");
		aU.className = "profiler-header";
		aK = RedButton.create(LANG.button_new, true);
		aa = RedButton.create(LANG.button_save, false);
		aR = RedButton.create(LANG.button_saveas, false);
		ah = RedButton.create(LANG.button_delete, false);
		aM = RedButton.create(LANG.button_claimchar, false);
		aF = RedButton.create(LANG.button_resync, false);
		aK.href = "/profile&new";
		aK.onmouseover = function (aW) {
			Tooltip.showAtCursor(aW, LANG.pr_tt_new)
		};
		aK.onmousemove = Tooltip.cursorUpdate;
		aK.onmouseout = Tooltip.hide;
		ae(aU, aF);
		ae(aU, aM);
		ae(aU, ah);
		ae(aU, aR);
		ae(aU, aa);
		ae(aU, aK);
		j = aV = Icon.create(null, 2);
		ae(aU, aV);
		o = aV = ce("div");
		aV.className = "profiler-header-line1";
		ae(aU, aV);
		n = aV = ce("div");
		aV.className = "profiler-header-line2";
		ae(aU, aV);
		l = aV = ce("div");
		aV.className = "profiler-header-line3";
		ae(aV, ce("span"));
		h = aT = ce("a");
		aT.className = "profiler-header-editlink icon-edit";
		aT.href = "javascript:;";
		aT.onclick = W.show.bind(null, "profileredit", {
			data: ak,
			onSubmit: au
		});
		ae(aT, ct(LANG.pr_header_edit));
		ae(aV, aT);
		ae(aU, aV);
		ae(v, aU);
		J = aU = ce("div");
		aU.className = "profiler-message";
		aU.style.display = "none";
		ae(v, aU);
		w = aU = ce("div");
		aU.className = "profiler-tablinks";
		ae(v, aU);
		Z = aU = ce("a");
		aU.className = "profiler-tablinks-help";
		aU.href = "/help=profiler";
		aU.target = "_blank";
		ae(aU, ct(LANG.pr_header_help));
		ae(w, aU);
		f = aU = ce("a");
		aU.className = "profiler-tablinks-armory";
		aU.href = "#";
		aU.style.display = "none";
		ae(aU, ct(LANG.pr_header_armory));
		ae(w, aU);
		g = aU = ce("a");
		aU.className = "profiler-tablinks-figureprint";
		aU.href = "#";
		aU.style.display = "none";
		ae(aU, ct(LANG.pr_header_figureprint));
		ae(w, aU);
		g_attachTracking(g, "Profile", "Visit FigurePrints", "")
	}
	function ai() {
		var aU;
		if (X == null) {
			X = document.title
		}
		var aY = ak.name;
		if (aQ()) {
			aY += " (";
			aY += ak.realm[1] + LANG.hyphen + ak.region[1];
			aY += ")"
		}
		aY += LANG.hyphen + X;
		document.title = aY;
		if (aQ(ak.genuine)) {
			PageTemplate.set({
				breadcrumb: [1, 5, ak.region[0], ak.battlegroup[0], ak.realm[0]]
			})
		} else {
			PageTemplate.set({
				breadcrumb: [1, 5]
			})
		}
		array_apply([aa, aR, ah, aM, aF], function (aZ) {
			RedButton.enable(aZ, false);
			RedButton.setFunc(aZ, null)
		});
		if (aQ()) {
			RedButton.enable(aF, true);
			RedButton.setFunc(aF, aI.resync);
			aF.onmouseover = function (aZ) {
				Tooltip.showAtCursor(aZ, LANG.pr_tt_resync)
			};
			aF.onmousemove = Tooltip.cursorUpdate;
			aF.onmouseout = Tooltip.hide;
			aM.style.display = "";
			ah.style.display = "none";
			if (g_user.id && !array_index(ak.bookmarks, g_user.id)) {
				RedButton.enable(aM, true);
				RedButton.setFunc(aM, aI.link);
				aM.onmouseover = function (aZ) {
					Tooltip.showAtCursor(aZ, LANG.pr_tt_claim)
				};
				aM.onmousemove = Tooltip.cursorUpdate;
				aM.onmouseout = Tooltip.hide
			}
			pr_updateStatus(J, ak.source, false)
		} else {
			aM.style.display = "none";
			ah.style.display = "";
			J.style.display = "none"
		}
		if (g_user.id) {
			if (ak.id > 0 && g_user.id == ak.user) {
				RedButton.enable(aa, true);
				RedButton.setFunc(aa, aI.save);
				RedButton.enable(ah, true);
				RedButton.setFunc(ah, aI.remove)
			}
			RedButton.enable(aR, true);
			RedButton.setFunc(aR, aI.saveAs);
			aR.onmouseover = function (aZ) {
				Tooltip.showAtCursor(aZ, LANG.pr_tt_saveas)
			};
			aR.onmousemove = Tooltip.cursorUpdate;
			aR.onmouseout = Tooltip.hide
		}
		Icon.setTexture(j, 2, ak.icon);
		ee(o);
		if (aQ() && ak.title && g_titles[ak.title]) {
			var aW = g_titles[ak.title].name,
				aT = str_replace(aW, "%s", "");
			var aX = ce("b");
			st(aX, ak.name);
			if (!aj.tabs[8].hidden) {
				var aV = ce("a");
				aV.href = "#titles";
				aV.onclick = Tabs.onClick.bind(aj.tabs[8], aV);
				ns(aV)
			} else {
				aV = ce("span")
			}
			st(aV, trim(aT));
			if (aW.indexOf("%s") > 0) {
				ae(o, aV);
				if (trim(aT) != aT) {
					ae(o, ct(" "))
				}
				ae(o, aX)
			} else {
				if (aW.indexOf("%s") == 0) {
					ae(o, aX);
					if (trim(aT) != aT) {
						ae(o, ct(" "))
					}
					ae(o, aV)
				}
			}
		} else {
			aU = ce("b");
			ae(aU, ct(ak.name));
			ae(o, aU)
		}
		ee(n);
		if (aQ(ak.genuine) && !ak.description) {
			if (ak.guild) {
				aU = ce("var");
				ae(aU, ct("<"));
				ae(n, aU);
				aU = ce("a");
				aU.href = "/profiles=" + ak.region[0] + "." + ak.realm[0] + "?filter=cr=9;crs=0;crv=" + urlencode2(ak.guild) + "&roster=1";
				ae(aU, ct(ak.guild));
				ae(n, aU);
				aU = ce("var");
				ae(aU, ct(">"));
				ae(n, aU)
			}
		} else {
			if (ak.description) {
				ae(n, ct(ak.description))
			}
		}
		l.firstChild.innerHTML = sprintfa(LANG.pr_header_character, ak.level, g_chr_races[ak.race], g_chr_classes[ak.classs], ak.race, ak.classs);
		if (aQ(ak.genuine)) {
			f.href = "http://" + g_regions[ak.region[0]] + "/character-sheet.xml?locale=" + Locale.getName().substr(0, 2) + "_" + Locale.getName().substr(2) + "&r=" + ak.realm[1] + "&n=" + ak.name;
			f.style.display = "";
			f.target = "_blank";
			g.href = "http://www.shareasale.com/r.cfm?b=202118&u=436923&m=24868&afftrack=&urllink=www%2Efigureprints%2Ecom%2FArmory%2Easpx%3Futm%5Fsource%3Dwowhead%26n%3D" + encodeURIComponent(ak.name) + "%26e%3D" + (ak.region[0] == "us" ? "US" : "EU") + "%26r%3D" + encodeURIComponent(ak.realm[1]);
			g.style.display = "";
			g.target = "_blank"
		} else {
			f.style.display = "none";
			g.style.display = "none"
		}
	}
	function aQ(aT) {
		return (ak.region && ak.region[0] && ak.battlegroup && ak.battlegroup[0] && ak.realm && ak.realm[0] && (aT || !ak.user))
	}
	function O() {
		var a2 = ce("table"),
			aY = ce("tbody"),
			a0 = ce("tr"),
			aU = ce("th"),
			aW = ce("td"),
			aT = ce("div"),
			aZ = ce("ul");
		G = ce("table");
		G.className = "infobox";
		ae(aU, ct(LANG.pr_qf_quickfacts));
		ae(a0, aU);
		ae(aY, a0);
		a0 = ce("tr");
		aT.className = "infobox-spacer";
		ae(aW, aT);
		at = aZ;
		ae(aW, aZ);
		ae(a0, aW);
		ae(aY, a0);
		k = a0 = ce("tr");
		aU = ce("th");
		aU.style.paddingBottom = "0";
		a0.style.display = "none";
		ae(aU, ct(LANG.pr_qf_progress));
		ae(a0, aU);
		ae(aY, a0);
		S = a0 = ce("tr");
		aW = ce("td");
		a0.style.display = "none";
		aT = ce("div");
		aT.className = "infobox-spacer";
		ae(aW, aT);
		P = a2;
		a2.className = "profiler-infobox-raids iconlist";
		var a1 = ce("tbody"),
			aX = ce("tr"),
			aV;
		aX.className = "profiler-infobox-raids-header";
		ae(aX, ce("td"));
		aV = ce("th");
		ae(aV, ct(LANG.pr_qf_raid));
		ae(aX, aV);
		aV = ce("td");
		ae(aV, ct(LANG.pr_qf_n));
		ae(aX, aV);
		aV = ce("td");
		ae(aV, ct(LANG.pr_qf_h));
		ae(aX, aV);
		ae(a1, aX);
		ae(a2, a1);
		ae(aW, a2);
		ac = aT = ce("div");
		ae(aW, aT);
		ae(a0, aW);
		ae(aY, a0);
		ae(G, aY);
		aT = ce("div");
		aef(aS, aT);
		Ads.fillSpot("medrect", aT);
		aef(aS, G)
	}
	function L() {
		var a7, a8, bc, bi;
		ee(at);
		if (ak.lastupdated) {
			var a3 = (g_serverTime - ak.lastupdated) / 1000;
			a7 = ce("li");
			a8 = ce("div");
			bc = ce("span");
			ae(a8, ct((aQ() ? LANG.pr_qf_resynced : LANG.pr_qf_updated)));
			Listview.funcBox.coFormatDate(bc, a3, ak.lastupdated);
			ae(a8, bc);
			ae(a7, a8);
			ae(at, a7)
		}
		if (ak.user && ak.username) {
			a7 = ce("li");
			a8 = ce("div");
			bi = ce("a");
			bi.href = "/user=" + ak.username;
			st(bi, ak.username);
			ae(a8, ct(LANG.pr_qf_owner));
			ae(a8, bi);
			ae(a7, a8);
			ae(at, a7)
		}
		if (ak.user && ak.source) {
			a7 = ce("li");
			a8 = ce("div");
			bi = ce("a");
			bi.href = g_getProfileUrl({
				id: ak.id,
				region: ak.region[0],
				realm: ak.realm[0],
				name: ak.sourcename
			});
			st(bi, ak.sourcename + " (" + ak.realm[1] + " - " + ak.region[0].toUpperCase() + ")");
			ae(a8, ct(LANG.pr_qf_character));
			ae(a8, bi);
			ae(a7, a8);
			ae(at, a7)
		}
		if (ak.playedtime) {
			a7 = ce("li");
			a8 = ce("div");
			st(a8, LANG.pr_qf_playedtime + g_formatTimeElapsed(ak.playedtime));
			ae(a7, a8);
			ae(at, a7)
		}
		a7 = ce("li");
		a8 = ce("div");
		bc = ce("a");
		bc.href = "#gear-summary";
		ae(a8, ct(LANG.pr_qf_gearscore));
		Y = bc;
		y();
		ae(a8, bc);
		ae(a7, a8);
		ae(at, a7);
		a7 = ce("li");
		aq = a8 = ce("div");
		ae(a8, ct(LANG.pr_qf_talents));
		bc = ce("a");
		bc.href = "#talents";
		bc.onclick = Tabs.onClick.bind(aj.tabs[1], bc);
		bc.className = "icontiny q1 tip";
		bc.onmousemove = Tooltip.cursorUpdate;
		bc.onmouseout = Tooltip.hide;
		ae(a8, bc);
		ae(a7, a8);
		ae(at, a7);
		aJ();
		if (ak.achievementpoints) {
			a7 = ce("li");
			a8 = ce("div");
			bc = ce("a");
			bc.href = "#achievements";
			bc.style.textDecoration = "none";
			ns(bc);
			bc.onclick = Tabs.onClick.bind(aj.tabs[7], bc);
			ae(a8, ct(LANG.pr_qf_achievements));
			Listview.funcBox.appendMoney(bc, 0, null, 0, 0, 0, ak.achievementpoints);
			ae(a8, bc);
			ae(a7, a8);
			ae(at, a7)
		}
		z = [];
		if (ak.skills) {
			var ba = g_sortJsonArray(ak.skills, g_spell_skills);
			for (var bd = 0, be = ba.length; bd < be; ++bd) {
				var a9 = ba[bd],
					a2 = ak.skills[a9];
				if (!a2[1]) {
					a2[1] = 450
				}
				var aT = {
					text: g_spell_skills[a9],
					hoverText: a2[0] + " / " + a2[1],
					color: "rep" + Math.min(6, Math.ceil(a2[1] / 75)),
					width: Math.min(100, (a2[0] / a2[1]) * 100)
				};
				a7 = ce("li");
				a8 = ce("div");
				a7.className = "profiler-infobox-skill";
				var bc = g_createProgressBar(aT);
				bc.skill = a9;
				bc.rel = "np";
				ns(bc);
				z.push(bc);
				ae(a8, bc);
				ae(a7, a8);
				ae(at, a7)
			}
		}
		V();
		if (ak.arenateams) {
			for (var bd in ak.arenateams) {
				bd = parseInt(bd);
				if (ak.arenateams[bd]) {
					a7 = ce("li");
					a8 = ce("div");
					ae(a8, ct(sprintfa(LANG.pr_qf_xvxteam, bd)));
					bi = ce("a");
					bi.href = "/profiles=" + ak.region[0] + "." + ak.realm[0] + "?filter=cr=" + (bd == 2 ? 12 : (bd == 3 ? 15 : 18)) + ";crs=0;crv=" + urlencode2(ak.arenateams[bd]) + "&roster=" + (bd == 5 ? 4 : bd);
					ae(bi, ct(ak.arenateams[bd]));
					ae(a8, bi);
					ae(a7, a8);
					ae(at, a7)
				}
			}
		}
		if (aQ(ak.genuine) && ak.level == 80) {
			ee(ac);
			Listview.funcBox.createCenteredIcons([
				[40752, (ak.statistics[1464] | 0) + ""],
				[40753, (ak.statistics[1465] | 0) + ""],
				[45624, (ak.statistics[3018] | 0) + ""],
				[47241, (ak.statistics[4729] | 0) + ""],
				[49426, (ak.statistics[4730] | 0) + ""]], ac, null);
			var bi = gE(ac, "a");
			bi[0]._fixTooltip = i.bind(bi[0], (ak.statistics[1464] | 0), 0);
			bi[1]._fixTooltip = i.bind(bi[1], (ak.statistics[1465] | 0), 0);
			bi[2]._fixTooltip = i.bind(bi[2], (ak.statistics[3018] | 0), 0);
			bi[3]._fixTooltip = i.bind(bi[3], (ak.statistics[4729] | 0), 0);
			bi[4]._fixTooltip = i.bind(bi[4], (ak.statistics[4730] | 0), 0);
			var a1 = P.firstChild;
			ee(a1, 1);
			for (var bd = 0, be = aC.length; bd < be; ++bd) {
				var aU = aC[bd],
					aX = R[aU];
				if (!aX.achievements) {
					continue
				}
				var aV = ce("tr"),
					aY = ce("th"),
					a6 = ce("ul"),
					a7 = ce("li"),
					a4 = ce("var"),
					a0 = ce("td");
				ae(a4, ct(String.fromCharCode(160)));
				ae(a7, a4);
				ae(a6, a7);
				ae(aY, a6);
				ae(aV, aY);
				var bi = ce("a");
				bi.href = "/zone=" + aU;
				ae(bi, ct(g_zones[aU]));
				ae(a0, bi);
				ae(aV, a0);
				for (var bh = 0; bh < 2; ++bh) {
					var a5 = ce("th"),
						bg = aX[bh],
						bf, bi, bc = ce("span"),
						aW = 0;
					for (var bb = 0, aZ = aX.achievements[bh].length; bb < aZ; ++bb) {
						if (ak.achievements[aX.achievements[bh][bb]]) {
							++aW
						}
					}
					bf = g_achievements.createIcon(bg, 0, "" + parseInt(aW / aX.achievements[bh].length * 100));
					bi = Icon.getLink(bf);
					if (ak.achievements[bg]) {
						bf.className += " iconsmall-gold"
					}
					bi.rel = "np";
					bi.onmouseover = H.bind(bi, aU, bh, aW, aX.achievements[bh], ak.achievements[bg]);
					bi.onmouseout = Tooltip.hide;
					ae(a5, bf);
					ae(aV, a5)
				}
				ae(a1, aV)
			}
			k.style.display = S.style.display = ""
		} else {
			k.style.display = S.style.display = "none"
		}
	}
	function y() {
		var aU = Y;
		if (!aU) {
			return
		}
		var aT = p.getGearScore();
		ak.gearscore = aT.item + aT.ench + aT.gems;
		ak.gearsubtotal = aT;
		aU.className = "q" + pr_getGearScoreQuality(ak.level, ak.gearscore, array_index([2, 6, 7, 11], ak.classs));
		if (ak.gearsubtotal) {
			aU.className += " tip";
			aU.onmouseover = ap.bind(0, ak.gearsubtotal);
			aU.onmousemove = Tooltip.cursorUpdate;
			aU.onmouseout = Tooltip.hide
		} else {
			aU.onmouseover = aU.onmousemove = aU.onmouseout = null
		}
		st(aU, number_format(ak.gearscore))
	}
	function aJ() {
		var aU = q.getTalentBuilds(),
			aT = pr_getSpecFromTalents(ak.classs, aU.spent),
			aV = aq.childNodes[1];
		aV.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + aT.icon.toLowerCase() + ".gif)";
		st(aV, (aU.spent ? aU.spent.join("/") : "0/0/0"));
		aV.onmouseover = function (aW) {
			Tooltip.showAtCursor(aW, aT.name, 0, 0, "q")
		}
	}
	function V() {
		for (var aU = 0, aT = z.length; aU < aT; ++aU) {
			var aV = z[aU];
			if (aj.tabs[5].hidden) {
				aV.className = aV.className.replace("tip", "");
				aV.href = null;
				aV.onclick = rf
			} else {
				aV.className += " tip";
				aV.href = "#recipes";
				aV.onclick = function (aW) {
					(Tabs.onClick.bind(aj.tabs[5], this, aW))();
					az.filterData(0, this.skill)
				}
			}
		}
	}
	function D(aW, aV) {
		for (var aU = 0, aT = aW.length; aU < aT; ++aU) {
			if (ak.achievements[aW[aU]]) {
				aV = aV.replace(new RegExp("<!--cr([0-9]+):8:" + aW[aU] + "-->(.+?)<", "g"), '<span class="r3">$2</span><')
			}
		}
		return aV
	}
	function i(aV, aU, aT) {
		return aT + '<br /><br /><span class="q' + (aU ? 10 : 9) + '">' + (aU ? LANG.pr_tt_nodata : sprintf(LANG.pr_tt_obtained, aV)) + "</span>"
	}
	function H(aX, a1, aT, a0, aU, aZ) {
		var aW = "";
		aW += '<b class="q">' + sprintf((a1 == 0 ? LANG.pr_tt_normal : LANG.pr_tt_heroic), g_zones[aX]) + "</b><br /><br />";
		if (aU) {
			aW += sprintf(LANG.pr_tt_earned2, ak.name) + "<br />"
		}
		aW += sprintf(LANG.pr_tt_earned, ak.name, aT, a0.length, parseInt(aT / a0.length * 100)) + "<br /><br />";
		aW += '<span class="q">' + LANG.pr_tt_progress + "</span>";
		aW += '<table width="100%"><tr>';
		aW += '<td class="q0" style="white-space: nowrap"><small>';
		for (var aV = 0, aY = Math.ceil(a0.length / 2); aV < aY; ++aV) {
			if (aV > 0) {
				aW += "<br />"
			}
			aW += "<!--cr0:8:" + a0[aV] + "-->- " + g_achievements[a0[aV]].name
		}
		aW += "</small></td>";
		aW += '<th class="q0" style="white-space: nowrap; text-align: left"><small>';
		for (var aV = Math.ceil(a0.length / 2), aY = a0.length; aV < aY; ++aV) {
			if (aV > Math.ceil(a0.length / 2)) {
				aW += "<br />"
			}
			aW += "<!--cr0:8:" + a0[aV] + "-->- " + g_achievements[a0[aV]].name
		}
		aW += "</small></th>";
		aW += "</tr></table>";
		aW = D(a0, aW);
		Tooltip.setIcon(g_achievements.getIcon(R[aX][a1]));
		Tooltip.show(this, aW)
	}
	function T(aV) {
		if (!aV) {
			return
		}
		var aU = "/profile=load&id=" + aV + "&" + (new Date().getTime()),
			aT = g_getGets();
		if (aT.items) {
			ad = aT.items.split(":");
			aU += "&items=" + ad.join(":")
		}
		g_ajaxIshRequest(aU)
	}
	function ar(aT) {
		eO(ak);
		cO(ak, aT);
		ak.genuine = (!ak.sourcename && !ak.user && !ak.username);
		aH();
		ai();
		if (ak.talents.builds && ak.talents.builds.length) {
			q.setTalents(ak.talents.active, ak.talents.builds)
		}
		p.setInventory(ak.inventory);
		p.addItems(ad);
		c.updateModifiers();
		L();
		if (aQ()) {
			aj.hide(7, 1);
			aD.setData(ak.achievements);
			aj.hide(9, 1);
			al.setData(ak.reputation)
		} else {
			aj.hide(3);
			aj.hide(4);
			aj.hide(5);
			aj.hide(6);
			aj.hide(7);
			aj.hide(8);
			aj.hide(9)
		}
		if ((g_serverTime - aT.lastupdated) >= 3600000) {
			setTimeout(aI.resync, 1000)
		}
		if (ak.status == 1 || ((g_serverTime - ak.lastupdated) < 300000 && !(g_user.roles & U_GROUP_MODERATOR))) {
			RedButton.enable(aF, false);
			RedButton.setFunc(aF, null)
		}
		r(1);
		ag()
	}
	function au(aX) {
		var aY = ak.name,
			aV = ak.race,
			aT = ak.gender,
			aW = ak.classs,
			aZ = ak.level,
			aU = aQ();
		if (aX.description) {
			aX.description = str_replace(aX.description, "\n", " ")
		}
		cO(ak, aX);
		ak.gender = parseInt(ak.gender);
		ak.published = parseInt(ak.published);
		if (!ak.user || ak.user != g_user.id) {
			ak.sourcename = (aU ? aY : "");
			ak.username = g_user.name;
			ak.user = g_user.id;
			ak.id = 0;
			delete ak.lastupdated
		}
		delete ak.customs;
		if (ak.classs != aW) {
			q.resetAll();
			p.updateAllIcons()
		}
		if (ak.level != aZ) {
			p.updateAllHeirlooms()
		}
		q.updateAll();
		aH();
		ai();
		L();
		r();
		if (ak.race != aV || ak.gender != aT) {
			p.updateModel(null, 1)
		}
		if (ak.classs != aW || ak.race != aV || ak.level != aZ) {
			c.updateModifiers()
		}
	}
	function af(aV, aU) {
		var aW = q.getWeightScale(),
			aX = 0;
		for (var aT in aW) {
			if (!LANG.traits[aT]) {
				continue
			}
			if (!isNaN(aV[aT])) {
				aX += aV[aT] * aW[aT]
			}
		}
		return aX
	}
	function ap(aV, aW) {
		var aT = "",
			aU = parseInt(aV.item + aV.gems + aV.ench);
		aT += "<table>";
		aT += '<tr><td class="q">' + LANG.pr_tt_items + "</td><th>" + aV.item + '</th><th><small class="q0">' + (!aV.item ? 0 : Math.round(aV.item / aU * 100)) + "%</small></th></tr>";
		aT += '<tr><td class="q">' + LANG.pr_tt_gems + "</td><th>" + aV.gems + '</th><th><small class="q0">' + (!aV.gems ? 0 : Math.round(aV.gems / aU * 100)) + "%</small></th></tr>";
		aT += '<tr><td class="q">' + LANG.pr_tt_enchants + "</td><th>" + aV.ench + '</th><th><small class="q0">' + (!aV.ench ? 0 : Math.round(aV.ench / aU * 100)) + "%</small></th></tr>";
		aT += "</table>";
		Tooltip.showAtCursor(aW, aT)
	}
	function am(aT, aU) {
		Tabs.onShow(aT, aU);
		if (aU) {
			ag(aT.index)
		}
	}
	function ag(aT) {
		if (aT == null) {
			aT = aj.getSelectedTab()
		}
		p.showModel(aT == 0);
		switch (aT) {
		case 0:
			aS.style.display = "";
			break;
		case 1:
			q.onShow();
			A.style.display = "";
			break;
		case 2:
			U.onShow();
			aP.style.display = "";
			break;
		case 3:
			K.onShow();
			F.style.display = "";
			break;
		case 4:
			aO.onShow();
			av.style.display = "";
			break;
		case 5:
			az.onShow();
			I.style.display = "";
			break;
		case 6:
			x.onShow();
			u.style.display = "";
			break;
		case 7:
			aD.onShow();
			M.style.display = "";
			break;
		case 8:
			e.onShow();
			a.style.display = "";
			break;
		case 9:
			al.onShow();
			aA.style.display = "";
			break
		}
	}
}
function ProfilerTalents(A) {
	var k = this,
		o, u, s, p, f, x, r, g, l, b, C, j, B, q, z, e, h;
	this.initialize = function (E, F) {
		j = ge(E);
		if (!j) {
			return
		}
		u = A.getVars();
		s = u.profile;
		_statistics = u.statistics;
		_inventory = u.inventory;
		p = u.tabs;
		f = F;
		if (!p.tabs[f]) {
			return
		}
		e = p.tabs[f].id;
		k.resetAll()
	};
	this.setTalents = function (F, E) {
		w(F, E)
	};
	this.resetAll = function () {
		x = 0;
		r = [];
		for (var G = 0, E = (e == "pets" ? 5 : 2); G < E; ++G) {
			var F = {
				talents: ""
			};
			if (e == "pets") {
				F.spent = 0;
				F.name = "";
				F.family = 0;
				F.npcId = 0;
				F.displayId = 0
			} else {
				F.glyphs = "";
				F.spent = [0, 0, 0];
				F.spec = -1;
				F.scale = ""
			}
			r.push(F)
		}
		l = false;
		b = false;
		if (p.getSelectedTab() == f) {
			k.onShow()
		}
	};
	this.updateAll = function () {
		D();
		n()
	};
	this.getTalentBuilds = function () {
		if (!h) {
			c(true);
			h = dO(r[x]);
			h.active = x;
			h.talents = [];
			if (e != "pets") {
				h.glyphs = []
			}
			for (var F = 0, E = r.length; F < E; ++F) {
				h.talents.push(r[F].talents);
				if (e != "pets") {
					h.glyphs.push(r[F].glyphs)
				}
			}
		}
		return h
	};
	this.getTalentRanks = function (E) {
		if (!g) {
			return
		}
		return o.getTalentRanks(E)
	};
	this.getWeightScale = function (E) {
		return c(E)
	};
	this.onShow = function (E) {
		if (!g) {
			y();
			a();
			g = true
		}
		if (!l) {
			D();
			n();
			l = true
		}
	};

	function w(F, E) {
		x = F;
		r = dO(E);
		l = false;
		k.onShow()
	}
	function y() {
		B = ce("div");
		B.className = "profiler-talents-specs";
		q = [];
		for (var G = 0, E = r.length; G < E; ++G) {
			var F = ce("a");
			F.className = "profiler-" + e + "-button";
			F.onclick = m.bind(0, G);
			F.href = "javascript:;";
			q[G] = ce("span");
			if (e == "pets") {
				var H = Icon.create("inv_misc_questionmark", 0);
				H.style.position = "absolute";
				ae(F, H);
				q[G].icon = H
			}
			ae(F, q[G]);
			ae(B, F)
		}
		var I = ce("div");
		I.className = "clear";
		ae(B, I);
		ae(j, B)
	}
	function D() {
		if (!g) {
			return
		}
		g_setSelectedLink(B.childNodes[x], "activebuild");
		for (var F = 0, E = r.length; F < E; ++F) {
			i(F)
		}
	}
	function i(N) {
		if (N == null) {
			N = x
		}
		if (!r[N]) {
			return
		}
		r[N].spent = o.getSpentFromBlizzBuild(r[N].talents, s.classs);
		var F = q[N],
			G = ce("small");
		ee(F);
		if (e == "pets") {
			var H = r[N].family,
				M = (H ? g_pet_icons[H] : "inv_misc_questionmark"),
				O = (H ? r[N].name : LANG.pr_nonepet);
			Icon.setTexture(F.icon, 0, M);
			ae(F, ct(O));
			if (H) {
				st(G, "(" + g_pet_families[H] + ")");
				ae(F, G)
			}
		} else {
			var J = Math.max(0, s.level - 9),
				L = r[N].spent[0] + r[N].spent[1] + r[N].spent[2],
				E = L - J;
			for (var K = 2; K >= 0; --K) {
				if (E <= 0) {
					break
				} else {
					if (r[N].spent[K] >= E) {
						r[N].spent[K] -= E;
						E = 0
					} else {
						if (r[N].spent[K] > 0) {
							E -= r[N].spent[K];
							r[N].spent[K] = 0
						}
					}
				}
			}
			var I = pr_getSpecFromTalents(s.classs, r[N].spent);
			F.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + I.icon.toLowerCase() + ".gif)";
			ae(F, ct(I.name + " "));
			st(G, "(" + r[N].spent.join("/") + ")");
			ae(F, G);
			return I
		}
	}
	function m(E) {
		x = E;
		l = false;
		if (p.getSelectedTab() == f) {
			k.onShow()
		}
	}
	function a() {
		z = ce("div");
		z.style.display = "none";
		ae(j, z);
		o = new TalentCalc();
		o.initialize(z, {
			onChange: v,
			noAd: 1,
			profiler: 1,
			mode: (e == "pets" ? TalentCalc.MODE_PET : TalentCalc.MODE_DEFAULT)
		})
	}
	function n() {
		if (!g) {
			return
		}
		o.setClass(s.classs);
		C = true;
		if (r[x].talents) {
			o.setBlizzBuild(s.classs, r[x].talents)
		} else {
			o.resetBuild()
		}
		C = true;
		if (r[x].glyphs) {
			o.setBlizzGlyphs(r[x].glyphs)
		} else {
			o.resetGlyphs()
		}
		if (b) {
			o.setLevelCap(s.level)
		}
		if (e != "pets") {
			if (b) {
				r[x].glyphs = o.getBlizzGlyphs()
			}
			r[x].spec = -1;
			r[x].scale = ""
		}
	}
	function v(H, E, K) {
		var N = r[x].talents,
			L = r[x].glyphs;
		if (!C) {
			r[x].talents = o.getBlizzBuild();
			r[x].spent = E.pointsSpent;
			if (e != "pets") {
				r[x].glyphs = o.getBlizzGlyphs()
			}
		}
		if (!b) {
			o.setLevelCap(s.level);
			D();
			b = true;
			z.style.display = ""
		} else {
			if (N != r[x].talents || L != r[x].glyphs) {
				A.updateSavedChanges()
			}
		}
		if (e != "pets") {
			A.updateInfoboxSpec();
			var I = i(),
				F = (r[x].spec != I.id),
				G = c(F);
			A.updateGearScore();
			var N = H.getTalents();
			_statistics.removeAllModifiers("talent");
			for (var J = 0, M = N.length; J < M; ++J) {
				if (N[J].j) {
					_statistics.addModifiers("talent", N[J].s[N[J].k - 1], N[J].j[N[J].k - 1])
				}
			}
			_inventory.updateInventory()
		}
		C = false;
		h = null
	}
	function c(J) {
		if (!wt_presets[s.classs] || !r[x]) {
			return
		}
		var G = pr_getSpecFromTalents(s.classs, r[x].spent),
			K = G.id,
			L = wt_presets[s.classs].pve;
		switch (s.classs) {
		case 1:
			t = K - (K > 1 ? 2 : 1);
			break;
		case 6:
		case 11:
			if (K == 2) {
				var E = [794, 2242, 2241, 1968, 1990, 2218],
					M = 0;
				for (var H = 0, I = E.length; H < I; ++H) {
					if (k.getTalentRanks(E[H])) {
						M++
					}
				}
				t = (M > 0 ? 2 : 1)
			} else {
				t = K - (K > 2 ? 0 : 1)
			}
			break;
		default:
			t = K - 1;
			break
		}
		var F = pr_getScaleFromSpec(s.classs, t);
		if (J) {
			r[x].spec = G.id;
			r[x].scale = pr_getScaleFilter(F)
		}
		A.fixJson(F);
		return F
	}
}
function ProfilerStatistics(A) {
	var c = this,
		r, q, z, n, I, l, v, a = ["arc", "fir", "fro", "hol", "nat", "sha"],
		k = {},
		b = {
		str: {
			getTooltip: function () {
				return LANG["pr_statstt_str" + (q.classs == 1 || q.classs == 2 || q.classs == 7 ? 2 : "")]
			},
			tooltipModifiers: ["mleatkpwr", "block"],
			addModifiers: function () {
				var J = g_statistics.classs[q.classs];
				return {
					mleatkpwr: [J[0][1], "percentOf", ["str", (J[0][1] ? (J[0][0] / (J[0][2] ? 2 : 1)) : 0)]],
					rgdatkpwr: [J[1][1], "percentOf", ["str", (J[1][1] ? (J[1][0] / (J[1][2] ? 2 : 1)) : 0)]],
					block: [0.5, "percentOf", ["str", -10]]
				}
			}
		},
		agi: {
			tooltipModifiers: ["mleatkpwr", "mlecritstrkpct", "armor"],
			addModifiers: function () {
				var J = g_statistics.race[q.race],
					L = g_statistics.classs[q.classs],
					K = g_statistics.combo[q.classs][q.level];
				return {
					mleatkpwr: [L[0][2], "percentOf", ["agi", (L[0][2] ? (L[0][0] / (L[0][1] ? 2 : 1)) : 0)]],
					rgdatkpwr: [L[1][2], "percentOf", ["agi", (L[1][2] ? (L[1][0] / (L[1][1] ? 2 : 1)) : 0)]],
					mlecritstrkpct: [K[7], "percentOf", ["agi", L[2][0]]],
					rgdcritstrkpct: [K[7], "percentOf", ["agi", L[2][0]]],
					armor: [2, "percentOf", "agi"],
					dodgepct: [K[9], "percentOf", ["agi", -K[9] * (J[1] + K[1])]]
				}
			}
		},
		sta: {
			getTooltip: function () {
				return LANG["pr_statstt_sta" + (q.classs == 3 || q.classs == 9 ? 2 : "")]
			},
			tooltipModifiers: ["health", "petsta"],
			addModifiers: function () {
				return {
					health: [10, "percentOf", ["sta", -180]],
					petsta: [0.3, "percentOf", "sta"]
				}
			}
		},
		"int": {
			getTooltip: function () {
				return LANG["pr_statstt_int" + (q.classs == 9 ? 2 : "")]
			},
			tooltipModifiers: ["mana", "arcsplcritstrkpct", "petint"],
			addModifiers: function () {
				if (q.classs == 1 || q.classs == 4 || q.classs == 6) {
					return {}
				}
				var K = g_statistics.classs[q.classs],
					J = g_statistics.combo[q.classs][q.level];
				return {
					mana: [15, "percentOf", ["int", -280]],
					arcsplcritstrkpct: [J[8], "percentOf", ["int", K[2][1]]],
					firsplcritstrkpct: [J[8], "percentOf", ["int", K[2][1]]],
					frosplcritstrkpct: [J[8], "percentOf", ["int", K[2][1]]],
					holsplcritstrkpct: [J[8], "percentOf", ["int", K[2][1]]],
					natsplcritstrkpct: [J[8], "percentOf", ["int", K[2][1]]],
					shasplcritstrkpct: [J[8], "percentOf", ["int", K[2][1]]],
					petint: (q.classs == 9 ? [0.3, "percentOf", "int"] : 0)
				}
			}
		},
		spi: {
			tooltipModifiers: ["healthrgn", "spimanargn"],
			addModifiers: function () {
				return {
					healthrgn: [1, "functionOf", function () {
						return Math.round((b.spi.subtotal[0] * g_statistics.combo[q.classs][q.level][10] / 2) + (b.spi.subtotal[1] * g_statistics.combo[q.classs][q.level][11]))
					}],
					spimanargn: [5, "functionOf", function () {
						return (0.001 + Math.sqrt(b["int"].total) * b.spi.total * g_statistics.level[q.level])
					}]
				}
			}
		},
		health: {},
		mana: {},
		rage: {},
		energy: {},
		runic: {},
		mledps: {
			decimals: 1
		},
		mleatkpwr: {
			tooltipModifiers: ["mledps"],
			addModifiers: function () {
				return {
					mledps: [1 / 14, "percentOf", "mleatkpwr"]
				}
			}
		},
		mlecritstrkpct: {
			decimals: 2,
			rating: {
				id: 19,
				stat: "mlecritstrkrtng"
			}
		},
		mlehastepct: {
			decimals: 2,
			rating: {
				id: 28,
				stat: "mlehastertng"
			}
		},
		mlehitpct: {
			decimals: 2,
			rating: {
				id: 16,
				stat: "mlehitrtng"
			}
		},
		armorpenpct: {
			decimals: 2,
			rating: {
				id: 44,
				stat: "armorpenrtng"
			}
		},
		exp: {
			rating: {
				id: 37,
				stat: "exprtng"
			},
			tooltipCompute: function (J) {
				return [(0.25 * J).toFixed(2)]
			}
		},
		rgddps: {
			decimals: 1
		},
		rgdatkpwr: {
			getTooltip: function () {
				return LANG["pr_statstt_rgdatkpwr" + (q.classs == 3 ? 2 : "")]
			},
			tooltipModifiers: ["rgddps", "petatkpwr", "petspldmg"],
			addModifiers: function () {
				return {
					rgddps: [1 / 14, "percentOf", "rgdatkpwr"],
					petatkpwr: (q.classs == 3 ? [0.22, "percentOf", "rgdatkpwr"] : 0),
					petspldmg: (q.classs == 3 ? [0.1287, "percentOf", "rgdatkpwr"] : 0)
				}
			}
		},
		rgdcritstrkpct: {
			decimals: 2,
			rating: {
				id: 20,
				stat: "rgdcritstrkrtng"
			}
		},
		rgdhastepct: {
			decimals: 2,
			rating: {
				id: 29,
				stat: "rgdhastertng"
			}
		},
		rgdhitpct: {
			decimals: 2,
			rating: {
				id: 17,
				stat: "rgdhitrtng"
			}
		},
		splheal: {},
		spldmg: {
			magic: 1,
			getTooltip: function () {
				return LANG["pr_statstt_spldmg" + (q.classs == 9 ? 2 : "")]
			},
			tooltipModifiers: ["spldmg", "petatkpwr", "petspldmg"],
			addModifiers: function () {
				var J = function () {
					var M = b[a[0] + "spldmg"].total;
					for (var L = 1, K = a.length; L < K; ++L) {
						if (b[a[L] + "spldmg"].total > M) {
							M = b[a[L]]
						}
					}
					return M
				};
				return {
					petatkpwr: (q.classs == 9 ? [0.57, "functionOf", J] : 0),
					petspldmg: (q.classs == 9 ? [0.15, "functionOf", J] : 0)
				}
			}
		},
		splcritstrkpct: {
			decimals: 2,
			rating: {
				id: 21,
				stat: "splcritstrkrtng"
			},
			magic: 1
		},
		splhastepct: {
			decimals: 2,
			rating: {
				id: 30,
				stat: "splhastertng"
			}
		},
		splhitpct: {
			decimals: 2,
			rating: {
				id: 18,
				stat: "splhitrtng"
			}
		},
		splpen: {},
		healthrgn: {},
		manargn: {
			addModifiers: function () {
				return {
					oocmanargn: [1, "percentOf", "manargn"]
				}
			}
		},
		spimanargn: {
			addModifiers: function () {
				return {
					oocmanargn: [1, "percentOf", "spimanargn"]
				}
			}
		},
		oocmanargn: {
			tooltipCompute: function (J) {
				return [J, b.manargn.total]
			}
		},
		armor: {
			getTooltip: function () {
				return LANG["pr_statstt_armor" + (q.classs == 3 || q.classs == 9 ? 2 : "")]
			},
			tooltipModifiers: ["petarmor"],
			tooltipCompute: function (K) {
				var J = (q.level > 59 ? q.level + (4.5 * (q.level - 59)) : q.level),
					L = (0.1 * K) / ((8.5 * J) + 40);
				L /= 1 + L;
				return [Math.min(75, L * 100).toFixed(2)]
			},
			addModifiers: function () {
				return {
					petarmor: [0.35, "percentOf", "armor"]
				}
			}
		},
		def: {
			rating: {
				id: 12,
				stat: "defrtng"
			},
			tooltipModifiers: ["dodgepct", "dodgepct"],
			addModifiers: function () {
				var J = (q.level * 5) / -25,
					K = g_statistics.classs[q.classs];
				return {
					dodgepct: [0.04, "percentOf", ["def", J]],
					parrypct: (K[6] ? [0.04, "percentOf", ["def", J]] : 0),
					blockpct: (K[8] ? [0.04, "percentOf", ["def", J]] : 0)
				}
			}
		},
		dodgepct: {
			decimals: 2,
			rating: {
				id: 13,
				stat: "dodgertng"
			},
			computeDiminished: function (J) {
				var K = g_statistics.classs[q.classs];
				return J * K[5] / ((K[5] * K[3]) + J)
			}
		},
		parrypct: {
			decimals: 2,
			rating: {
				id: 14,
				stat: "parryrtng"
			},
			computeDiminished: function (J) {
				var K = g_statistics.classs[q.classs];
				return J * K[7] / ((K[7] * K[3]) + J)
			}
		},
		blockpct: {
			decimals: 2,
			rating: {
				id: 15,
				stat: "blockrtng"
			},
			tooltipCompute: function (J) {
				return [b.block.total]
			}
		},
		block: {},
		resipct: {
			decimals: 2,
			rating: {
				id: 35,
				stat: "resirtng"
			},
			tooltipCompute: function (J) {
				return [J, (2.2 * J).toFixed(2), (2 * J).toFixed(2)]
			}
		},
		arcres: {
			icon: "spell_arcane_blast",
			getTooltip: function () {
				return sprintf(LANG.pr_statstt_resist, LANG.pr_statstt_arc)
			},
			tooltipCompute: function (J) {
				return [Math.min(75, (J / (q.level * 5)) * 75).toFixed(2)]
			},
			addModifiers: function () {
				return {
					petarcres: [0.4, "percentOf", "arcres"]
				}
			}
		},
		firres: {
			icon: "spell_fire_burnout",
			getTooltip: function () {
				return sprintf(LANG.pr_statstt_resist, LANG.pr_statstt_fir)
			},
			tooltipCompute: function (J) {
				return [Math.min(75, (J / (q.level * 5)) * 75).toFixed(2)]
			},
			addModifiers: function () {
				return {
					petfirres: [0.4, "percentOf", "firres"]
				}
			}
		},
		frores: {
			icon: "spell_frost_arcticwinds",
			getTooltip: function () {
				return sprintf(LANG.pr_statstt_resist, LANG.pr_statstt_fro)
			},
			tooltipCompute: function (J) {
				return [Math.min(75, (J / (q.level * 5)) * 75).toFixed(2)]
			},
			addModifiers: function () {
				return {
					petfrores: [0.4, "percentOf", "frores"]
				}
			}
		},
		holres: {
			icon: "spell_holy_powerwordbarrier",
			getTooltip: function () {
				return sprintf(LANG.pr_statstt_resist, LANG.pr_statstt_hol)
			},
			tooltipCompute: function (J) {
				return [Math.min(75, (J / (q.level * 5)) * 75).toFixed(2)]
			},
			addModifiers: function () {
				return {
					petholres: [0.4, "percentOf", "holres"]
				}
			}
		},
		natres: {
			icon: "ability_druid_flourish",
			getTooltip: function () {
				return sprintf(LANG.pr_statstt_resist, LANG.pr_statstt_nat)
			},
			tooltipCompute: function (J) {
				return [Math.min(75, (J / (q.level * 5)) * 75).toFixed(2)]
			},
			addModifiers: function () {
				return {
					petnatres: [0.4, "percentOf", "natres"]
				}
			}
		},
		shares: {
			icon: "spell_shadow_shadowfury",
			getTooltip: function () {
				return sprintf(LANG.pr_statstt_resist, LANG.pr_statstt_sha)
			},
			tooltipCompute: function (J) {
				return [Math.min(75, (J / (q.level * 5)) * 75).toFixed(2)]
			},
			addModifiers: function () {
				return {
					petshares: [0.4, "percentOf", "shares"]
				}
			}
		},
		petsta: {},
		petint: {},
		petatkpwr: {
			dependent: {
				rgdatkpwr: 1,
				spldmg: 1
			},
			ndependent: 2
		},
		petspldmg: {
			dependent: {
				rgdatkpwr: 1,
				spldmg: 1
			},
			ndependent: 2
		},
		petarmor: {},
		petarcres: {},
		petfirres: {},
		petfrores: {},
		petholres: {},
		petnatres: {},
		petshares: {}
	},
		u = [
		[{
			id: "base",
			type: "title"
		},
		{
			id: "health",
			type: "bar"
		},
		{
			id: "mana",
			type: "bar"
		},
		{
			id: "rage",
			type: "bar"
		},
		{
			id: "energy",
			type: "bar"
		},
		{
			id: "runic",
			type: "bar"
		},
		{
			id: "str"
		},
		{
			id: "agi"
		},
		{
			id: "sta"
		},
		{
			id: "int"
		},
		{
			id: "spi"
		}],
		[{
			id: "melee",
			type: "title"
		},
		{
			id: "mleatkpwr"
		},
		{
			id: "mlecritstrkpct"
		},
		{
			id: "mlehastepct"
		},
		{
			id: "mlehitpct"
		},
		{
			id: "armorpenpct"
		},
		{
			id: "exp"
		}],
		[{
			id: "ranged",
			type: "title"
		},
		{
			id: "rgdatkpwr"
		},
		{
			id: "rgdcritstrkpct"
		},
		{
			id: "rgdhastepct"
		},
		{
			id: "rgdhitpct"
		},
		{
			id: "armorpenpct"
		}],
		[{
			id: "spell",
			type: "title"
		},
		{
			id: "spldmg"
		},
		{
			id: "splheal"
		},
		{
			id: "splcritstrkpct"
		},
		{
			id: "splhastepct"
		},
		{
			id: "splhitpct"
		},
		{
			id: "splpen"
		},
		{
			id: "oocmanargn"
		}],
		[{
			id: "defenses",
			type: "title"
		},
		{
			id: "armor"
		},
		{
			id: "def"
		},
		{
			id: "dodgepct"
		},
		{
			id: "parrypct"
		},
		{
			id: "blockpct"
		},
		{
			id: "resipct"
		},
		{
			id: "arcres",
			type: "resist"
		},
		{
			id: "firres",
			type: "resist"
		},
		{
			id: "frores",
			type: "resist"
		},
		{
			id: "natres",
			type: "resist"
		},
		{
			id: "shares",
			type: "resist"
		}]];
	this.initialize = function (J, K) {
		_container = ge(J);
		if (!_container) {
			return
		}
		r = A.getVars();
		q = r.profile;
		z = r.inventory;
		G();
		w()
	};
	this.addModifiers = function (J, L, K) {
		i(J, L, K)
	};
	this.removeModifiers = function (J, K) {
		e(J, K)
	};
	this.removeAllModifiers = function (J) {
		y(J)
	};
	this.updateModifiers = function () {
		h()
	};

	function f(J) {
		if (in_array(["rage", "energy", "runic", "mana"], J) != -1) {
			return (J == f())
		}
		switch (q.classs) {
		case 1:
			return "rage";
		case 4:
			return "energy";
		case 6:
			return "runic";
		default:
			return "mana"
		}
	}
	function i(J, N, M) {
		for (var L in M) {
			var K = {};
			cO(K, M);
			K.source = J;
			K.sourceId = N;
			if (J != "class" && J != "talent") {
				K.diminish = true
			}
			k.push(K);
			C();
			break
		}
	}
	function s(N, Q, J) {
		var L = b[J],
			P = 0;
		for (var K = 0, M = L.modifiers.length; K < M; ++K) {
			var O = L.modifiers[K],
				R = (L.slotMultiple[O.slot] || 0) + L.multiple;
			if (O.source == N && O.sourceId == Q) {
				P += E(O, R)
			}
		}
		if (!L.decimals) {
			P = Math.floor(P)
		}
		return P.toFixed(L.decimals)
	}
	function E(K, J) {
		if (K.subtotal != null) {
			return K.subtotal
		}
		K.subtotal = 0;
		if (K.functionOf) {
			K.subtotal += J * K.percent * K.functionOf(q)
		}
		if (K.percentOf) {
			K.subtotal += J * K.percent * (K.percentOf == "level" ? q.level : b[K.percentOf].total) + K.percentBase
		}
		if (K.add) {
			K.subtotal += J * K.add
		}
		return K.subtotal
	}
	function e(K, N) {
		var M = [];
		for (var L = 0, J = k.length; L < J; ++L) {
			if (k[L].source != K || k[L].sourceId != N) {
				M.push(k[L])
			}
		}
		k = M;
		C()
	}
	function y(K) {
		var M = [];
		for (var L = 0, J = k.length; L < J; ++L) {
			if (k[L].source != K) {
				M.push(k[L])
			}
		}
		k = M;
		C()
	}
	function x(K) {
		var M = b[K];
		M.modifiers = [];
		for (var L = 0, J = k.length; L < J; ++L) {
			if (k[L][K] != null) {
				M.modifiers.push(p(k[L][K], K, k[L].source, k[L].sourceId))
			}
		}
		M.modifiers.sort(function (O, N) {
			if (O.multiple != N.multiple) {
				return -strcmp(O.multiple, N.multiple)
			}
			if (O.percentOf != N.percentOf) {
				return -strcmp(O.percentOf, N.percentOf)
			}
			return strcmp(O.slot, N.slot)
		})
	}
	function p(N, L, K, Q) {
		var O = b[L],
			P = {};
		if (typeof N == "object" && N.length) {
			for (var M = 1, J = N.length; M < J; M += 2) {
				P[N[M]] = N[M + 1]
			}
			if (P.percentOf != null) {
				P.percentBase = 0;
				if (typeof P.percentOf == "object" && P.percentOf.length) {
					P.percentBase = P.percentOf[1];
					P.percentOf = P.percentOf[0]
				}
				if (P.percentOf == L) {
					P.multiple = N[0];
					if (P.percentBase) {
						P.add = P.percentBase
					}
					delete P.percentOf;
					delete P.percentBase
				} else {
					P.percent = N[0]
				}
			}
			if (P.functionOf != null) {
				P.percent = N[0]
			}
			if (P.percentOf && P.percentOf != "level" && O.dependent[P.percentOf] == null) {
				O.dependent[P.percentOf] = 1;
				O.ndependent++
			}
			if (P.forSlots != null) {
				P.slotMultiple = {};
				for (var M = 0, J = P.forSlots.length; M < J; ++M) {
					P.slotMultiple[P.forSlots[M]] = N[0]
				}
				delete P.forSlots
			}
			if (P.forStance != null) {
				return {}
			}
			if (P.forClass != null) {
				if (!z.hasItemClassQty(P.forClass[0], P.forClass[1], P.forClass[2])) {
					return {}
				}
			}
			if (!P.percent && !P.multiple && !P.forSlots) {
				P.add = N[0]
			}
		} else {
			if (!isNaN(N)) {
				P = {
					add: N
				}
			}
		}
		P.source = K;
		P.sourceId = Q;
		if (K != "class" && K != "talent") {
			P.diminish = true
		}
		if (K == "item" && Q != null) {
			P.slot = Q
		}
		return P
	}
	function h() {
		y("stat");
		for (var L in b) {
			var N = b[L];
			if (N.addModifiers) {
				i("stat", L, N.addModifiers())
			}
			if (N.rating) {
				var K = b[N.rating.stat],
					O = {};
				O[L] = [g_convertRatingToPercent(q.level, N.rating.id, 1, q.classs), "percentOf", N.rating.stat];
				i("stat", N.rating.stat, O)
			}
		}
		y("race");
		var J = g_statistics.race[q.race],
			P = {
			str: J[0],
			agi: J[1],
			sta: J[2],
			"int": J[3],
			spi: J[4]
		};
		i("race", q.race, P);
		i("race", q.race, J[5]);
		i("race", q.race, J[6]);
		y("class");
		var R = g_statistics.classs[q.classs],
			Q = g_statistics.combo[q.classs][q.level],
			P = {
			str: Q[0],
			agi: Q[1],
			sta: Q[2],
			"int": Q[3],
			spi: Q[4],
			health: Q[5],
			mleatkpwr: [R[0][3], "percentOf", "level"],
			rgdatkpwr: [R[1][3], "percentOf", "level"],
			def: [5, "percentOf", "level"],
			dodgepct: R[4] + Q[9] * (J[1] + Q[1]),
			parrypct: R[6],
			blockpct: R[8]
		};
		P[f()] = Q[6];
		i("class", q.classs, P);
		i("class", q.classs, R[9]);
		i("class", q.classs, R[10]);
		y("skill");
		for (var M in q.skills) {
			var S = Math.max(1, Math.floor(q.skills[M][0] / 75) * 75);
			if (g_statistics.skills[M] && g_statistics.skills[M][S]) {
				A.fixJson(g_statistics.skills[M][S]);
				i("skill", M, g_statistics.skills[M][S])
			}
		}
	}
	function G() {
		var P = {};
		for (var L in b) {
			var O = b[L];
			O.total = 0;
			O.subtotal = [0, 0];
			O.modifiers = [];
			if (O.decimals == null) {
				O.decimals = 0
			}
			if (O.multiple == null) {
				O.multiple = 1
			}
			if (O.slotMultiple == null) {
				O.slotMultiple = {}
			}
			if (O.dependent == null) {
				O.dependent = {};
				O.ndependent = 0
			}
			if (O.magic) {
				for (var N = 0, J = a.length; N < J; ++N) {
					var M = {
						total: 0,
						subtotal: [0, 0],
						modifiers: [],
						dependent: {},
						ndependent: 0,
						decimals: O.decimals,
						multiple: O.multiple,
						slotMultiple: {}
					};
					cO(M.slotMultiple, O.slotMultiple);
					if (O.rating) {
						var K = {
							total: 0,
							subtotal: [0, 0],
							modifiers: [],
							dependent: {},
							ndependent: 0,
							decimals: 0,
							multiple: 1,
							slotMultiple: {}
						};
						M.rating = {
							id: O.rating.id,
							stat: a[N] + O.rating.stat
						};
						M.tooltipRatings = [M.rating.stat];
						P[M.rating.stat] = K;
						M.dependent[M.rating.stat] = 1;
						M.ndependent++
					}
					P[a[N] + L] = M;
					O.dependent[a[N] + L] = 1;
					O.ndependent++
				}
				delete O.rating
			} else {
				if (O.rating) {
					var K = {
						total: 0,
						subtotal: [0, 0],
						modifiers: [],
						dependent: {},
						ndependent: 0,
						decimals: 0,
						multiple: 1,
						slotMultiple: {}
					};
					if (!O.tooltipRatings) {
						O.tooltipRatings = [O.rating.stat]
					}
					P[O.rating.stat] = K;
					O.dependent[O.rating.stat] = 1;
					O.ndependent++
				}
			}
		}
		cO(b, P)
	}
	function C() {
		if (n > 0) {
			clearTimeout(n);
			n = 0
		}
		n = setTimeout(D, 750)
	}
	function D() {
		var R = [],
			J = [],
			X = {};
		for (var O in b) {
			var Q = b[O];
			Q.multiple = 1;
			if (!Q.magic) {
				x(O)
			}
			J.push(O);
			X[O] = 0
		}
		var V = function (ah) {
			var af = [];
			for (var ac = 0, Z = ah.length; ac < Z; ++ac) {
				var aa = ah[ac],
					ad = b[aa],
					ag = 0;
				for (var ab in ad.dependent) {
					if (X[ab]) {
						ag++
					}
				}
				if (ag == ad.ndependent) {
					R.push(aa);
					X[aa] = 1
				} else {
					af.push(aa)
				}
			}
			if (af.length && af.length != ah.length) {
				V(af)
			}
		};
		V(J);
		for (var P = 0, T = R.length; P < T; ++P) {
			var O = R[P],
				Q = b[O],
				K = [0, 0];
			Q.total = 0;
			Q.subtotal = [0, 0];
			if (Q.magic) {
				Q.subtotal[0] = b[a[0] + O].total;
				for (var N = 1, L = a.length; N < L; ++N) {
					var M = b[a[N] + O];
					if (M.total < Q.subtotal[0]) {
						Q.subtotal[0] = M.total
					}
				}
			} else {
				for (var N = 0, L = Q.modifiers.length; N < L; ++N) {
					var U = Q.modifiers[N];
					if (U.multiple) {
						Q.multiple += U.multiple
					} else {
						var Y = (Q.slotMultiple[U.slot] || 0) + Q.multiple,
							W = (U.source == "race" || U.source == "class" || U.source == "stat" || (U.source == "talent" && O != "manargn") || (U.source == "item" && O == "armor") ? 0 : 1),
							S = (Q.computeDiminished && U.diminish ? 1 : 0);
						Q.subtotal[W] += E(U, Y);
						K[S] += E(U, Y)
					}
				}
			}
			if (!Q.decimals) {
				for (var N = 0; N < 2; ++N) {
					Q.subtotal[N] = Math.floor(Q.subtotal[N]);
					K[N] = Math.floor(K[N])
				}
			}
			if (Q.computeDiminished) {
				K[1] = Q.computeDiminished(K[1])
			}
			Q.total = (parseFloat(K[0]) + parseFloat(K[1])).toFixed(Q.decimals)
		}
		H()
	}
	function w() {
		var af, L, Q = ce("table"),
			O = ce("tbody"),
			J = ce("tr"),
			N = ce("td"),
			ad, S, K;
		Q.className = "profiler-inventory-stats";
		v = Q;
		af = ce("div");
		af.className = "text";
		L = ce("h2");
		L.className = "clear";
		L.id = "statistics";
		ad = ce("a");
		ad.className = "header-link";
		ad.href = "#statistics";
		ae(ad, ct(LANG.pr_stats_title));
		ae(L, ad);
		ae(af, L);
		ae(_container, af);
		ae(L, ct(String.fromCharCode(160)));
		S = ce("small");
		S.className = "q0";
		ae(S, ct(LANG.pr_stats_beta));
		ae(L, S);
		I = af = ce("div");
		af.className = "profiler-inventory-bars";
		ae(_container, I);
		l = af = ce("div");
		af.className = "profiler-inventory-resists";
		ae(_container, l);
		af = ce("div");
		af.className = "clear pad";
		ae(_container, af);
		for (var X = 0, Y = u.length; X < Y; ++X) {
			N = ce("td");
			S = ce("p");
			K = ce("h3");
			N.style.width = (100 / Y) + "%";
			if (X == Y - 1) {
				S.style.marginRight = "0"
			}
			ae(S, K);
			var U = u[X];
			for (var W = 0, M = U.length; W < M; ++W) {
				var ac = U[W],
					P = ac.id,
					ab = b[P],
					ad, R, V, T;
				switch (ac.type) {
				case "title":
					ad = ce("a");
					ad.className = "disclosure-off";
					ad.href = "javascript:;";
					ns(ad);
					U.disclosure = ad;
					ad.onclick = F.bind(0, U);
					st(ad, o(P, ac));
					ae(K, ad);
					break;
				case "bar":
					var Z = g_createProgressBar({
						color: P
					});
					Z.style.display = "none";
					ac.bar = Z;
					ae(I, Z);
					break;
				case "resist":
					var aa = Icon.create(ab.icon, 1, null, "javascript:;");
					aa.style.cssFloat = aa.style.styleFloat = "left";
					ad = Icon.getLink(aa);
					ad.onmouseover = g.bind(T, P, ac);
					ad.onmouseout = Tooltip.hide;
					ac.icon = aa;
					ae(l, aa);
					break;
				default:
					ad = ce("a");
					ad.href = "javascript:;";
					ad.onmouseover = g.bind(T, P, ac);
					ad.onmousemove = Tooltip.cursorUpdate;
					ad.onmouseout = Tooltip.hide;
					T = ce("var");
					ae(ad, T);
					ac.span = T;
					V = ce("em");
					ae(V, ct(o(P)));
					ae(ad, V);
					R = ce("div");
					R.className = "clear";
					ae(ad, R);
					ae(S, ad);
					R = ce("small");
					R.className = "q2";
					R.style.display = "none";
					ac.detail = R;
					ad.onclick = m.bind(R, P, ac, null, U);
					ae(S, R);
					break
				}
			}
			ae(N, S);
			ae(J, N)
		}
		ae(O, J);
		ae(Q, O);
		ae(_container, v);
		af = ce("div");
		af.className = "pad";
		ae(_container, af);
		R = ce("div");
		R.className = "text";
		ae(R, ct(LANG.pr_stats_warning));
		ae(_container, R)
	}
	function H() {
		for (var N = 0, P = u.length; N < P; ++N) {
			var J = u[N];
			for (var M = 0, K = J.length; M < K; ++M) {
				var Q = J[M],
					L = Q.id,
					O = b[L],
					R;
				switch (Q.type) {
				case "title":
					break;
				case "bar":
					if (f(L)) {
						R = B(L);
						st(Q.bar.firstChild.firstChild, o(L) + " " + R);
						Q.bar.style.display = (R > 0 ? "" : "none")
					}
					break;
				case "resist":
					R = [B(L)];
					Icon.setNumQty(Q.icon, R);
					break;
				default:
					R = B(L);
					st(Q.span, R);
					Q.span.className = (O.subtotal[0] > 0 && O.subtotal[1] > 0 ? "q2" : "");
					Q.detail.innerHTML = j(L, Q, true);
					break
				}
			}
		}
	}
	function F(N) {
		var O = (N.disclosure.className == "disclosure-off");
		for (var M = 0, L = N.length; M < L; ++M) {
			var J = N[M],
				K = J.id;
			if (J.type == "title" || J.type == "bar" || J.type == "resist") {
				continue
			} (m.bind(div, K, J, O, N))()
		}
		N.disclosure.className = "disclosure-" + (O ? "on" : "off")
	}
	function B(J) {
		var K = b[J];
		return K.total + (K.decimals > 0 ? "%" : "")
	}
	function o(K, J) {
		var L = (J ? J : b[K]);
		if (L.label != null && LANG[L.label] != null) {
			return LANG[L.label]
		}
		if (LANG["pr_stats_" + K] != null) {
			return LANG["pr_stats_" + K]
		}
		return K
	}
	function j(O, V, K) {
		var R = b[O],
			W = (R.getTooltip ? R.getTooltip() : LANG["pr_statstt_" + O]);
		buff = "";
		if (!K) {
			buff += "<b>" + o(O);
			buff += " " + R.total + (R.decimals > 0 ? "%" : "");
			if (R.subtotal[0] > 0 && R.subtotal[1] > 0) {
				buff += " (" + R.subtotal[0].toFixed(R.decimals) + '<span class="q2">+' + R.subtotal[1].toFixed(R.decimals) + "</span>)"
			}
			buff += "</b>"
		}
		if (W != null) {
			var T = [W];
			if (R.magic) {
				var P = '<table width="100%">',
					J = [];
				for (var Q = 0, S = a.length; Q < S; ++Q) {
					var U = a[Q] + O,
						N = b[U];
					P += '<tr><td class="q"><span class="moneyschool' + a[Q] + '">' + LANG["pr_statstt_" + a[Q]] + '</span></td><td class="q" align="right">' + N.total + (R.decimals > 0 ? "%" : "") + "</td></tr>";
					if (N.tooltipRatings && Q == 0) {
						for (var M = 0, L = N.tooltipRatings.length; M < L; ++M) {
							J.push(b[N.tooltipRatings[M]].total);
							J.push(s("stat", N.tooltipRatings[M], U))
						}
					}
				}
				P += "</table>";
				T.push(P);
				T = T.concat(J)
			}
			if (R.tooltipRatings) {
				for (var Q = 0, S = R.tooltipRatings.length; Q < S; ++Q) {
					T.push(b[R.tooltipRatings[Q]].total);
					T.push(s("stat", R.tooltipRatings[Q], O))
				}
			}
			if (R.tooltipModifiers) {
				for (var Q = 0, S = R.tooltipModifiers.length; Q < S; ++Q) {
					T.push(s("stat", O, R.tooltipModifiers[Q]))
				}
			}
			if (R.tooltipCompute) {
				T = T.concat(R.tooltipCompute(R.total))
			}
			T.push(R.total);
			T.push(q.level);
			if (!K) {
				buff += '<br /><span class="q">' + sprintfo(T) + "</span>"
			} else {
				buff = str_replace(str_replace("- " + str_replace(sprintfo(T), "<br />", "<!--br />- "), "<!--br />", "<br />"), "- <table", "<table")
			}
		}
		return buff
	}
	function g(K, J, L) {
		if (J.type == "resist") {
			Tooltip.show(J.icon, j(K, J))
		} else {
			Tooltip.showAtCursor(L, j(K, J))
		}
	}
	function m(L, K, O, N) {
		if (O == null) {
			O = (K.detail.style.display == "none")
		}
		K.detail.style.display = (O ? "block" : "none");
		for (var M = 0, J = N.length; M < J; ++M) {
			if (!N[M].detail) {
				continue
			}
			if (N[M].detail.style.display == "none") {
				N.disclosure.className = "disclosure-off";
				return
			}
		}
		N.disclosure.className = "disclosure-on"
	}
}
function ProfilerInventory(_parent) {
	var _self = this,
		_parentVars, _profile, _statistics, _tabs, _timer, _inited, _data = [],
		_itemType, _enchantSource, _gemSource, _gemColor, _mvInited, _shiftClick = (Browser.opera),
		_cursorPos = {
		x: 0,
		y: 0
	},
		_container, _divModel, _swfModel, _divInventory, _lnkPrint, _divTipRclk, _listview, _lvItems, _spSearchName, _spSearchMsg, _lvSubitems, _lvEnchants, _lvGems, _currentSlot = -1,
		_currentSocket = -1,
		_currentColor = -1,
		_currentSearch = "",
		_searchResults, _slots = [{
		id: 1,
		name: "head",
		itemslots: [1],
		enchant: 1
	},
	{
		id: 2,
		name: "neck",
		itemslots: [2],
		nomodel: 2
	},
	{
		id: 3,
		name: "shoulder",
		itemslots: [3],
		enchant: 1
	},
	{
		id: 15,
		name: "chest",
		itemslots: [16],
		enchant: 1
	},
	{
		id: 5,
		name: "chest",
		itemslots: [5, 20],
		enchant: 1,
		upgradeslots: [5]
	},
	{
		id: 4,
		name: "shirt",
		itemslots: [4],
		noupgrade: 1
	},
	{
		id: 19,
		name: "tabard",
		itemslots: [19],
		noupgrade: 1
	},
	{
		id: 9,
		name: "wrists",
		itemslots: [9],
		enchant: 1,
		socket: 2,
		socketskill: 164
	},
	{
		id: 10,
		name: "hands",
		itemslots: [10],
		enchant: 1,
		socket: 2,
		socketskill: 164
	},
	{
		id: 6,
		name: "waist",
		itemslots: [6],
		enchant: 2,
		socket: 1,
		enchantskill: 202
	},
	{
		id: 7,
		name: "legs",
		itemslots: [7],
		enchant: 1
	},
	{
		id: 8,
		name: "feet",
		itemslots: [8],
		enchant: 1
	},
	{
		id: 11,
		name: "finger",
		itemslots: [11],
		nomodel: 2,
		enchant: 2,
		enchantskill: 333
	},
	{
		id: 12,
		name: "finger",
		itemslots: [11],
		nomodel: 2,
		enchant: 2,
		enchantskill: 333
	},
	{
		id: 13,
		name: "trinket",
		itemslots: [12],
		nomodel: 2
	},
	{
		id: 14,
		name: "trinket",
		itemslots: [12],
		nomodel: 2
	},
	{
		id: 16,
		name: "mainhand",
		itemslots: [21, 13, 17],
		enchant: 1,
		weapon: 1
	},
	{
		id: 17,
		name: "offhand",
		itemslots: [22, 13, 23, 14],
		enchant: 3,
		noenchantclasses: [-5],
		weapon: 2
	},
	{
		id: 18,
		name: "ranged",
		itemslots: [15, 25],
		classes: [3, 8, 5, 4, 9, 1],
		nomodel: 1,
		enchant: 3,
		noenchantclasses: [16, 19],
		weapon: 1
	},
	{
		id: 18,
		name: "relic",
		itemslots: [28],
		classes: [6, 11, 2, 7],
		nomodel: 2,
		noupgrade: 2
	},
	{
		id: 0,
		name: "ammo",
		itemslots: [24],
		classes: [3],
		nomodel: 2,
		noupgrade: 1
	}];
	_proficiencies = {
		1: {
			2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 13, 15, 16, 18],
			4: [6, 1, 2, 3, 4]
		},
		2: {
			2: [0, 1, 4, 5, 6, 7, 8],
			4: [6, 7, 1, 2, 3, 4]
		},
		3: {
			2: [0, 1, 2, 3, 6, 7, 8, 10, 13, 15, 16, 18],
			4: [1, 2, 3]
		},
		4: {
			2: [2, 3, 4, 7, 13, 15, 16, 18],
			4: [1, 2]
		},
		5: {
			2: [4, 10, 15, 19],
			4: [1]
		},
		6: {
			2: [0, 1, 4, 5, 6, 7, 8],
			4: [10, 1, 2, 3, 4]
		},
		7: {
			2: [0, 1, 4, 5, 10, 13, 15],
			4: [6, 9, 1, 2, 3]
		},
		8: {
			2: [7, 10, 15, 19],
			4: [1]
		},
		9: {
			2: [7, 10, 15, 19],
			4: [1]
		},
		11: {
			2: [4, 5, 6, 10, 13, 15],
			4: [8, 1, 2]
		}
	},
	jsonEquipCopy = {
		id: 1,
		name: 1,
		level: 1,
		slot: 1,
		source: 1,
		sourcemore: 1,
		nsockets: 1,
		socket1: 1,
		socket2: 1,
		socket3: 1
	};
	this.initialize = function (container, tabIndex) {
		_container = ge(container);
		if (!_container) {
			return
		}
		_parentVars = _parent.getVars();
		_profile = _parentVars.profile;
		_statistics = _parentVars.statistics;
		_talents = _parentVars.talents;
		_tabs = _parentVars.tabs;
		_initModel();
		_initCharacter();
		_initListview(tabIndex)
	};
	this.setInventory = function (inventory) {
		_setInventory(inventory)
	};
	this.getInventory = function () {
		return _getInventory()
	};
	this.updateInventory = function () {
		_updateInventory()
	};
	this.addItems = function (items) {
		var slots = {};
		for (var i = 0, len = items.length; i < len; ++i) {
			var item = g_items[items[i]];
			if (item) {
				var slotId = _getValidSlot(item.jsonequip.slotbak, 0, 1);
				if (slotId == -1) {
					continue
				}
				if (slots[slotId] && (slotId == 12 || slotId == 14 || slotId == 16)) {
					slotId++
				}
				slots[slotId] = items[i];
				_equipItem(items[i], slotId)
			}
		}
		_updateModel(-1, 1)
	};
	this.equipItem = function (itemId, itemSlotId) {
		var slotId = _getValidSlot(itemSlotId, 0, 1);
		Lightbox.hide();
		_equipItem(itemId, slotId)
	};
	this.equipSubitem = function (subitemId, slotId) {
		var slotId = _getValidSlot(slotId, 1);
		Lightbox.hide();
		_equipSubitem(subitemId, slotId)
	};
	this.socketItem = function (gemId, socketId, slotId) {
		var slotId = _getValidSlot(slotId, 1),
			socketId = _getValidSocket(socketId, 1);
		Lightbox.hide();
		_socketItem(gemId, socketId, slotId)
	};
	this.enchantItem = function (enchantId, slotId) {
		var slotId = _getValidSlot(slotId, 1);
		Lightbox.hide();
		_enchantItem(enchantId, slotId)
	};
	this.updateAllIcons = function () {
		_updateAllIcons()
	};
	this.updateAllHeirlooms = function () {
		_updateAllHeirlooms()
	};
	this.updateAllMenus = function () {
		_updateAllMenus()
	};
	this.updateMenu = function (slotId, a) {
		_updateMenu(slotId, a)
	};
	this.onMouseUpSlot = function (slotId, a, e) {
		_onMouseUpSlot(slotId, a, e)
	};
	this.updateListview = function () {
		_updateListview()
	};
	this.printSummary = function () {
		_printSummary()
	};
	this.showModel = function (visible) {
		_divModel.style.left = (visible ? "" : "-2323px")
	};
	this.updateModel = function (slotId, refresh) {
		_updateModel(slotId, refresh)
	};
	this.matchGemSocket = function (gemColor, socketColor) {
		return _matchGemSocket(gemColor, socketColor)
	};
	this.getGearScore = function (slotId) {
		return _getGearScore(slotId)
	};
	this.hasItemClassQty = function (classId, subclassMask, qty) {
		return _hasItemClassQty(classId, subclassMask, qty)
	};

	function _isSlotNeeded(slotId, checkWeapons) {
		var equip = true;
		equip = equip && (!_data[slotId].classes || (_profile.classs != -1 && array_index(_data[slotId].classes, _profile.classs)));
		if (checkWeapons && slotId == 17 && !_hasTitansGrip()) {
			var itemId = _getSlotItem(16)[0];
			equip = equip && (!itemId || g_items[itemId].jsonequip.slotbak != 17)
		}
		return equip
	}
	function _hasTitansGrip() {
		return _talents.getTalentRanks(1867)
	}
	function _setInventory(inventory) {
		_inited = false;
		if (inventory) {
			for (var i = 0, len = _data.length; i < len; ++i) {
				var item = _getSlotItem(i);
				_data[i].history = [];
				if (inventory[_data[i].id] != null && inventory[_data[i].id].length == 8) {
					var item = inventory[_slots[i].id];
					_equipItem(item[0], i, 1);
					_equipSubitem(item[1], i);
					_enchantItem(item[2], i);
					for (var j = 4; j < 8; ++j) {
						_socketItem(item[j], j, i)
					}
				}
			}
		} else {
			for (var i = 0, len = _data.length; i < len; ++i) {
				_unequipItem(i)
			}
		}
		_inited = true;
		_updateInventory()
	}
	function _updateInventory() {
		for (var i = 0, len = _data.length; i < len; ++i) {
			cO(_data[i], _slots[i]);
			if (_slots[i].nomodel != 2) {
				_data[i].nomodel = (_profile.nomodel & 1 << i ? 1 : 0)
			}
		}
		if (_hasTitansGrip()) {
			_data[17].itemslots.push(17)
		}
		if (_profile.classs == 3) {
			_data[16].nomodel = _data[17].nomodel = 1;
			_data[18].nomodel = 0
		} else {
			_data[18].nomodel = 1
		}
		if (_getSlotItem(6)[0] == 5976) {
			_data[6].nomodel = 1
		}
		_updateModel();
		_updateAllIcons();
		_updateAllMenus();
		_updateListview()
	}
	function _getInventory() {
		var inventory = {};
		for (var i = 0, len = _data.length; i < len; ++i) {
			if (_isSlotNeeded(i)) {
				inventory[_data[i].id] = _getSlotItem(i)
			}
		}
		return inventory
	}
	function _getGearScore(slotId) {
		var slotId = _getValidSlot(slotId),
			buildData = _talents.getTalentBuilds(),
			gearscore = {},
			mh = 1,
			oh = 1,
			mainHand, offHand;
		for (var i = 0, len = _data.length; i < len; ++i) {
			var item = _getSlotItem(i);
			gearscore[i] = {
				item: 0,
				ench: 0,
				gems: 0
			};
			if (item[0] && g_items[item[0]]) {
				if (i == 16) {
					mainHand = g_items[item[0]].jsonequip
				} else {
					if (i == 17) {
						offHand = g_items[item[0]].jsonequip
					} else {
						gearscore[i].item += Math.round(g_items[item[0]].jsonequip.gearscore)
					}
				}
			}
			if (item[2] && g_enchants[item[2]]) {
				gearscore[i].ench += Math.round(g_enchants[item[2]].gearscore)
			}
			for (var j = 0; j < 4; ++j) {
				if (item[j + 4] && g_gems[item[j + 4]]) {
					gearscore[i].gems += Math.round(g_gems[item[j + 4]].gearscore)
				}
			}
		}
		if (mainHand) {
			if (offHand) {
				if (mainHand.slotbak == 21 || mainHand.slotbak == 13) {
					if (offHand.slotbak == 22 || offHand.slotbak == 13) {
						if (_profile.classs == 6 || _profile.classs == 3 || _profile.classs == 4 || (_profile.classs == 7 && buildData.spent[1] > 30 && buildData.spec == 2) || (_profile.classs == 1 && buildData.spent[1] < 51 && buildData.spec == 2)) {
							mh = 64 / 27;
							oh = 64 / 27
						}
					} else {
						if (offHand.slotbak == 23 || offHand.slotbak == 14) {
							if (_profile.classs == 5 || _profile.classs == 9 || _profile.classs == 8 || (_profile.classs == 11 && (buildData.spec == 1 || buildData.spec == 3)) || (_profile.classs == 7 && (buildData.spec == 1 || buildData.spec == 3)) || (_profile.classs == 2 && (buildData.spec == 1 || buildData.spec == 2)) || (_profile.classs == 1 && buildData.spec == 3)) {
								mh = 64 / 27;
								oh = 16 / 9
							}
						}
					}
				}
			} else {
				if (mainHand.slotbak == 17) {
					if (_profile.classs == 5 || _profile.classs == 9 || _profile.classs == 8 || _profile.classs == 11 || _profile.classs == 3 || _profile.classs == 6 || (_profile.classs == 7 && buildData.spent[1] < 31 && buildData.spec == 2) || (_profile.classs == 2 && buildData.spec == 3) || (_profile.classs == 1 && buildData.spec == 1)) {
						mh = 2;
						oh = 0
					}
				}
			}
		}
		if (mainHand) {
			gearscore[16].item += Math.round(mainHand.gearscore * mh)
		}
		if (offHand) {
			gearscore[17].item += Math.round(offHand.gearscore * oh)
		}
		if (slotId != -1) {
			return gearscore[slotId]
		}
		var total = {
			item: 0,
			ench: 0,
			gems: 0
		};
		for (var i in gearscore) {
			if (_isSlotNeeded(i)) {
				total.item += gearscore[i].item;
				total.ench += gearscore[i].ench;
				total.gems += gearscore[i].gems
			}
		}
		return total
	}
	function _compare() {
		var inventory = _getInventory(),
			items = [];
		for (var i in inventory) {
			if (inventory[i][0]) {
				items.push(inventory[i].join(".").replace(/(\.0)+$/, ""))
			}
		}
		su_addToSaved(items.join(":"), items.length, true, _profile.level)
	}
	function _initModel() {
		var _ = ce("div"),
			__ = _divModel = ce("div");
		_.className = "profiler-model-outer";
		__.className = "profiler-model";
		_swfModel = ce("div");
		_swfModel.id = "hsae8y8hjidj";
		ae(__, _swfModel);
		ae(_, __);
		_container.parentNode.parentNode.insertBefore(_, _container.parentNode)
	}
	function _updateModel(slotId, refresh) {
		if (g_user.cookies && g_user.cookies.profiler3d == false) {
			if (!_mvInited) {
				ee(_swfModel);
				var btn = RedButton.create(LANG.button_viewin3d, true);
				btn.onclick = function () {
					g_user.cookies.profiler3d = 1;
					_updateModel(-1, 1)
				};
				ae(_swfModel, btn);
				_mvInited = true
			}
			return
		}
		var origSlotId = slotId,
			slotId = _getValidSlot(slotId),
			equipList = [],
			emptySlots = [];
		for (var i = 0, len = _data.length; i < len; ++i) {
			if (slotId == -1 || i == slotId) {
				var itemId = _getSlotItem(i)[0];
				if (!_data[i].nomodel && g_items[itemId]) {
					equipList.push((((i == 16 || i == 17) && g_items[itemId].jsonequip.slotbak != 14) ? _data[i].itemslots[0] : g_items[itemId].jsonequip.slotbak));
					equipList.push(g_items[itemId].jsonequip.displayid)
				} else {
					emptySlots.push(_data[i].itemslots[0])
				}
			}
		}
		if (!_mvInited || refresh) {
			var flashVars = {
				model: g_file_races[_profile.race] + g_file_genders[_profile.gender],
				modelType: 16,
				equipList: equipList,
				sk: _profile.skincolor,
				ha: _profile.hairstyle,
				hc: _profile.haircolor,
				fa: _profile.facetype,
				fh: _profile.features,
				fc: _profile.haircolor,
				mode: 3,
				contentPath: "http://static.wowhead.com/modelviewer/"
			};
			var params = {
				wmode: "opaque",
				quality: "high",
				allowscriptaccess: "always",
				allowfullscreen: true,
				menu: false,
				bgcolor: "#141414"
			};
			var attributes = {
				style: "outline: none"
			};
			swfobject.embedSWF("http://static.wowhead.com/modelviewer/ModelView.swf", _swfModel.id, "100%", "100%", "10.0.0", "http://static.wowhead.com/modelviewer/expressInstall.swf", flashVars, params, attributes);
			_mvInited = true
		} else {
			_swfModel = ge(_swfModel.id);
			if (_swfModel.clearSlots) {
				_swfModel.setAppearance(_profile.hairstyle, _profile.haircolor, _profile.facetype, _profile.skincolor, _profile.features, _profile.haircolor);
				_swfModel.clearSlots(emptySlots);
				_swfModel.attachList(equipList)
			}
		}
	}
	function _toggleDisplay(slotId) {
		var slotId = _getValidSlot(slotId, 1);
		if (_data[slotId].nomodel == 2) {
			return
		}
		_data[slotId].nomodel = !_data[slotId].nomodel;
		_profile.nomodel ^= 1 << slotId;
		if (!_data[slotId].nomodel) {
			if ((slotId == 16 || slotId == 17) && _data[18].nomodel != 2) {
				_data[18].nomodel = 1;
				_updateModel(18);
				_updateMenu(18)
			} else {
				if (slotId == 18) {
					_data[16].nomodel = _data[17].nomodel = 1;
					_updateModel(16);
					_updateMenu(16);
					_updateModel(17);
					_updateMenu(17)
				}
			}
		}
		_updateModel(slotId);
		_updateIcon(slotId);
		_updateMenu(slotId)
	}
	function _initCharacter() {
		var _, __, a, divLeft = ce("div"),
			divRight = ce("div"),
			divBottom = ce("div");
		_divInventory = _ = ce("div");
		_.className = "profiler-inventory";
		__ = ce("div");
		__.className = "profiler-inventory-inner";
		divLeft.className = "profiler-inventory-left";
		divRight.className = "profiler-inventory-right";
		divBottom.className = "profiler-inventory-bottom";
		ae(__, RedButton.create(LANG.button_compare, true, _compare));
		ae(__, divLeft);
		ae(__, divRight);
		ae(__, divBottom);
		ae(_divInventory, __);
		ae(_container, _divInventory);
		for (var i = 0, len = _slots.length; i < len; ++i) {
			_data[i] = {};
			cO(_data[i], _slots[i]);
			_data[i].history = [
				[0, 0, 0, 0, 0, 0, 0, 0]]
		}
		for (var i = 0, len = _data.length; i < len; ++i) {
			_data[i].icon = Icon.create("inventoryslot_" + _data[i].name, 1, null, "javascript:;");
			ae((i < 8 ? divLeft : (i < 16 ? divRight : divBottom)), _data[i].icon);
			a = Icon.getLink(_data[i].icon);
			a.oncontextmenu = a.onclick = rf;
			a.onmouseup = _onMouseUpSlot.bind(0, i, a)
		}
		_ = ce("div");
		_.style.clear = "left";
		ae(_container, _);
		div = ce("div");
		div.className = "text";
		div.style.width = "290px";
		ae(div, ct(_shiftClick ? LANG.pr_tip_sclkopt : LANG.pr_tip_rclkopt));
		ae(_container, div)
	}
	function _getValidSlot(slotId, useCurrentSlot, isItemSlot) {
		var validId = -1;
		if (useCurrentSlot && _currentSlot != -1) {
			validId = _currentSlot
		} else {
			if (typeof slotId == "number") {
				validId = slotId
			} else {
				if (typeof slotId == "string" && !isNaN(parseInt(slotId))) {
					validId = parseInt(slotId)
				}
			}
		}
		if (validId != -1 && isItemSlot) {
			for (var i = 0, len = _data.length; i < len; ++i) {
				if (array_index(_data[i].itemslots, validId)) {
					return i
				}
			}
		}
		if (isItemSlot || validId >= _data.length) {
			validId = -1
		}
		return validId
	}
	function _getValidSocket(socketId, useCurrentSocket) {
		var validId = -1;
		if (useCurrentSocket && _currentSocket != -1) {
			validId = _currentSocket
		} else {
			if (typeof socketId == "number") {
				validId = socketId
			} else {
				if (typeof socketId == "string" && !isNaN(parseInt(socketId))) {
					validId = parseInt(socketId)
				}
			}
		}
		if (validId < 4 || validId > 8) {
			validId = -1
		}
		return validId
	}
	function _getSlotItem(slotId) {
		var slotId = _getValidSlot(slotId),
			_ = _data[slotId];
		if (slotId == -1 || !_.history.length) {
			return [0, 0, 0, 0, 0, 0, 0, 0]
		}
		return _.history[_.history.length - 1]
	}
	function _isSlotEmpty(slotId) {
		return !_getSlotItem(slotId)[0]
	}
	function _hasEnhancements(slotId) {
		var item = _getSlotItem(slotId);
		for (var i = 1; i < 8; ++i) {
			if (item[i] != 0) {
				return true
			}
		}
		return false
	}
	function _clearEnhancements(slotId) {
		_unequipSubitem(slotId);
		_unsocketAllItem(slotId);
		_unenchantItem(slotId)
	}
	function _equipItem(itemId, slotId, ignoreSubitem) {
		var origSlotId = slotId,
			slotId = _getValidSlot(slotId, 1),
			curItem = _getSlotItem(slotId);
		if (itemId == curItem[0]) {
			return
		}
		if (!itemId) {
			return _unequipItem(slotId)
		}
		if (!curItem[0]) {
			_data[slotId].history.splice(-1, 1)
		}
		_clearEnhancements(slotId);
		_data[slotId].history.push([itemId, 0, 0, 0, 0, 0, 0, 0]);
		if (curItem[2]) {
			_enchantItem(curItem[2], slotId)
		}
		for (var j = 4; j < 8; ++j) {
			if (curItem[j]) {
				_socketItem(curItem[j], j, slotId)
			}
		}
		_parent.updateSavedChanges();
		_updateModel(origSlotId);
		_updateAllIcons();
		_updateHeirloom(slotId);
		_updateMenu(slotId);
		_updateListview();
		_updateItemSets();
		_statistics.removeModifiers("item", slotId);
		if (_isSlotNeeded(slotId)) {
			_statistics.addModifiers("item", slotId, g_items[itemId].jsonequip)
		}
		if (g_items[itemId].jsonequip.subitems && !ignoreSubitem) {
			_openSubitemPicker(slotId)
		}
	}
	function _unequipItem(slotId) {
		var slotId = _getValidSlot(slotId, 1);
		if (_isSlotEmpty(slotId)) {
			return
		}
		_clearEnhancements(slotId);
		_data[slotId].history.push([0, 0, 0, 0, 0, 0, 0, 0]);
		_parent.updateSavedChanges();
		_updateModel(slotId);
		_updateAllIcons();
		_updateMenu(slotId);
		_updateListview();
		_updateItemSets();
		_statistics.removeModifiers("item", slotId)
	}
	function _updateItemSets() {
		var itemsetpcs = {},
			itemsetbak = {};
		for (var i = 0, len = _data.length; i < len; ++i) {
			if (_isSlotNeeded(i)) {
				var p = _getSlotItem(i)[0];
				if (g_items[p]) {
					var s = g_items[p].jsonequip.itemset,
						_ = g_itemsets[s];
					if (_) {
						s = _.idbak;
						if (itemsetpcs[s] == null) {
							itemsetpcs[s] = {}
						}
						itemsetpcs[s][p] = 1;
						itemsetbak[s] = _
					}
				}
			}
		}
		_statistics.removeAllModifiers("itemset");
		for (var s in itemsetpcs) {
			var itemset = itemsetbak[s],
				nItems = 0;
			if (!itemset.setbonus) {
				continue
			}
			for (var p in itemsetpcs[s]) {
				nItems++
			}
			for (var n in itemset.setbonus) {
				if (n > nItems) {
					break
				}
				_statistics.addModifiers("itemset", (s * 10) + n, itemset.setbonus[n])
			}
		}
	}
	function _getItemClassQty(itemClass, subclassMask) {
		var qty = 0;
		for (var i = 0, len = _data.length; i < len; ++i) {
			var itemId = _getSlotItem(i)[0];
			if (g_items[itemId]) {
				if (g_items[itemId].jsonequip.classs == itemClass && (1 << g_items[itemId].jsonequip.subclass) & subclassMask) {
					qty++
				}
			}
		}
		return qty
	}
	function _hasItemClassQty(itemClass, subclassMask, qty) {
		return _getItemClassQty(itemClass, subclassMask) >= qty
	}
	function _equipSubitem(subitemId, slotId) {
		var item = _getSlotItem(slotId),
			curSubitemId = item[1];
		if (subitemId == curSubitemId || !g_items[item[0]].jsonequip.subitems || !g_items[item[0]].jsonequip.subitems[subitemId]) {
			return
		}
		if (!subitemId) {
			return _unequipSubitem(slotId)
		}
		item = item.slice(0);
		item[1] = subitemId;
		_data[slotId].history.push(item);
		_parent.updateSavedChanges();
		_updateIcon(slotId);
		_updateMenu(slotId);
		_updateListview();
		_statistics.removeModifiers("subitem", slotId);
		if (_isSlotNeeded(slotId)) {
			_statistics.addModifiers("subitem", slotId, g_items[item[0]].jsonequip.subitems[subitemId].jsonequip)
		}
	}
	function _unequipSubitem(slotId) {
		var item = _getSlotItem(slotId);
		if (_isSlotEmpty(slotId) || !item[1]) {
			return
		}
		item = item.slice(0);
		item[1] = 0;
		_data[slotId].history.push(item);
		_parent.updateSavedChanges();
		_updateIcon(slotId);
		_updateMenu(slotId);
		_updateListview();
		_statistics.removeModifiers("subitem", slotId)
	}
	function _socketItem(gemId, socketId, slotId) {
		var item = _getSlotItem(slotId),
			curGemId = item[socketId];
		if (gemId == curGemId) {
			return
		}
		if (!gemId || (socketId >= _getExtraSocketPos(item[0]) + (_canBeSocketed(slotId) ? 1 : 0))) {
			return _unsocketItem(socketId, slotId, true)
		}
		item = item.slice(0);
		item[socketId] = gemId;
		_data[slotId].history.push(item);
		_parent.updateSavedChanges();
		_updateIcon(slotId);
		_updateMenu(slotId);
		_updateListview();
		_statistics.removeModifiers("gem", (slotId * 10) + (socketId - 4));
		if (!g_gems[gemId]) {
			return
		}
		if (_isSlotNeeded(slotId)) {
			_statistics.addModifiers("gem", (slotId * 10) + (socketId - 4), g_gems[gemId].jsonequip)
		}
		_statistics.removeModifiers("socket", slotId);
		if (_isSlotNeeded(slotId) && _hasSocketBonus(slotId)) {
			_statistics.addModifiers("socket", slotId, g_items[item[0]].jsonequip.socketbonusstat)
		}
	}
	function _unsocketItem(socketId, slotId, none) {
		var item = _getSlotItem(slotId);
		if (_isSlotEmpty(slotId) || !item[socketId]) {
			return
		}
		var pos = _getExtraSocketPos(item[0]);
		item = item.slice(0);
		item[socketId] = (socketId == pos && none ? -1 : 0);
		_data[slotId].history.push(item);
		_parent.updateSavedChanges();
		_updateIcon(slotId);
		_updateMenu(slotId);
		_updateListview();
		_statistics.removeModifiers("gem", (slotId * 10) + (socketId - 4));
		_statistics.removeModifiers("socket", slotId);
		if (_isSlotNeeded(slotId) && _hasSocketBonus(slotId)) {
			_statistics.addModifiers("socket", slotId, g_items[item[0]].jsonequip.socketbonusstat)
		}
	}
	function _unsocketAllItem(slotId) {
		for (var i = 4; i < 8; ++i) {
			_unsocketItem(i, slotId, false)
		}
		if (_hasExtraSocket(slotId)) {
			_toggleExtraSocket(slotId)
		}
	}
	function _toggleExtraSocket(slotId) {
		var item = _getSlotItem(slotId),
			pos = _getExtraSocketPos(item[0]);
		if (_hasExtraSocket(slotId)) {
			_unsocketItem(pos, slotId, false)
		} else {
			_socketItem(-1, pos, slotId)
		}
	}
	function _getExtraSocketPos(itemId) {
		if (!itemId || !g_items[itemId]) {
			return 4
		}
		return 4 + (g_items[itemId].jsonequip.nsockets | 0)
	}
	function _hasExtraSocket(slotId) {
		var item = _getSlotItem(slotId),
			pos = _getExtraSocketPos(item[0]);
		return (_canBeSocketed(slotId) && item[pos] ? 1 : 0)
	}
	function _canBeSocketed(slotId) {
		var slotId = _getValidSlot(slotId),
			itemId = _getSlotItem(slotId)[0];
		return (_data[slotId].socket == 1 || (_data[slotId].socket == 2 && (_profile.user || (_profile.skills && _profile.skills[_data[slotId].socketskill] && _profile.skills[_data[slotId].socketskill][0] >= 400))))
	}
	function _getMetaCondition() {
		var condition = {
			t: 0
		};
		for (var i = 0, len = _data.length; i < len; ++i) {
			var item = _getSlotItem(i);
			if (g_items[item[0]]) {
				for (var j = 0; j < 4; ++j) {
					var gemId = item[j + 4];
					if (gemId && g_gems[gemId] && g_gems[gemId].condition) {
						for (var k in g_gems[gemId].condition) {
							if (!condition[k]) {
								condition[k] = 0
							}
							condition[k] += g_gems[gemId].condition[k];
							condition.t += g_gems[gemId].condition[k]
						}
					}
				}
			}
		}
		return condition
	}
	function _enchantItem(enchantId, slotId) {
		var item = _getSlotItem(slotId),
			curEnchantId = item[2];
		if (enchantId == curEnchantId) {
			return
		}
		if (!enchantId) {
			return _unenchantItem(slotId)
		}
		if (!g_enchants[enchantId]) {
			return
		}
		item = item.slice(0);
		item[2] = enchantId;
		_data[slotId].history.push(item);
		_parent.updateSavedChanges();
		_updateIcon(slotId);
		_updateMenu(slotId);
		_updateListview();
		_statistics.removeModifiers("enchant", slotId);
		if (_isSlotNeeded(slotId)) {
			_statistics.addModifiers("enchant", slotId, g_enchants[enchantId].jsonequip)
		}
	}
	function _unenchantItem(slotId) {
		var item = _getSlotItem(slotId);
		if (_isSlotEmpty(slotId) || !item[2]) {
			return
		}
		item = item.slice(0);
		item[2] = 0;
		_data[slotId].history.push(item);
		_parent.updateSavedChanges();
		_updateIcon(slotId);
		_updateMenu(slotId);
		_updateListview();
		_statistics.removeModifiers("enchant", slotId)
	}
	function _canBeEnchanted(slotId) {
		var slotId = _getValidSlot(slotId),
			itemId = _getSlotItem(slotId)[0];
		return (_data[slotId].enchant == 1 || (_data[slotId].enchant == 2 && (_profile.user || (_profile.skills && _profile.skills[_data[slotId].enchantskill] && _profile.skills[_data[slotId].enchantskill][0] >= 360))) || (_data[slotId].enchant == 3 && g_items[itemId] && !array_index(_data[slotId].noenchantclasses, g_items[itemId].jsonequip.subclass)))
	}
	function _onMouseUpSlot(slotId, a, e) {
		e = $E(e);
		_currentSlot = slotId;
		if (e._button == 3 || e.shiftKey || e.ctrlKey) {
			var pos = g_getCursorPos(e);
			setTimeout(Menu.showAtXY.bind(null, a.menu, pos.x, pos.y), 1);
			Tooltip.hide()
		}
		return false
	}
	function _onKeyUpSearch(e) {
		var search = trim(_spSearchName.value.replace(/\s+/g, " "));
		if (search == _currentSearch) {
			return
		}
		_currentSearch = search;
		_prepareSearch(search)
	}
	function _onKeyDownSearch(e) {
		e = $E(e);
		var textbox = e._target;
		switch (e.keyCode) {
		case 13:
			_lvItems.submitSearch(e);
			break;
		case 27:
			hide();
			break;
		case 38:
			cycle(0);
			break;
		case 40:
			cycle(1);
			break
		}
	}
	function _updateAllMenus() {
		for (var i = 0, len = _data.length; i < len; ++i) {
			_updateMenu(i)
		}
	}
	function _updateMenu(slotId, a) {
		var slotId = _getValidSlot(slotId),
			item = _getSlotItem(slotId),
			itemId = item[0],
			extraSocket = _hasExtraSocket(slotId),
			buildData = _talents.getTalentBuilds();
		if (a == null) {
			a = Icon.getLink(_data[slotId].icon)
		}
		a.menu = [
			[, g_item_slots[_data[slotId].itemslots[0]]],
			[0, (item[0] ? LANG.pr_menu_replace : LANG.pr_menu_equip), _openItemPicker.bind(this, slotId)]];
		if (!_isSlotEmpty(slotId)) {
			a.menu.push([0, LANG.pr_menu_unequip, _unequipItem.bind(this, slotId)]);
			if (item[1] || g_items[itemId].jsonequip.subitems != null) {
				a.menu.push([0, (item[1] ? LANG.pr_menu_repsubitem : LANG.pr_menu_addsubitem), _openSubitemPicker.bind(this, slotId)])
			}
			if (item[2] || _canBeEnchanted(slotId)) {
				var _ = [0, (item[2] ? LANG.pr_menu_repenchant : LANG.pr_menu_addenchant), _openEnchantPicker.bind(this, slotId), null, {}];
				if (item[2] && g_enchants[item[2]]) {
					_[4].tinyIcon = g_enchants[item[2]].icon
				}
				a.menu.push(_)
			}
			if (g_items[itemId].jsonequip.nsockets || extraSocket) {
				for (var i = 0, len = (g_items[itemId].jsonequip.nsockets | 0) + extraSocket; i < len; ++i) {
					var gemId = (item[i + 4] > 0 ? item[i + 4] : 0),
						c = (extraSocket && i == len - 1 ? 14 : g_items[itemId].jsonequip["socket" + (i + 1)]),
						_ = [0, (gemId ? LANG.pr_menu_repgem : LANG.pr_menu_addgem), _openGemPicker.bind(this, c, 4 + i, slotId), null, {}];
					if (gemId) {
						_[4].tinyIcon = g_gems[gemId].icon
					} else {
						_[4].socketColor = c
					}
					a.menu.push(_)
				}
			}
			if (extraSocket || _canBeSocketed(slotId)) {
				var _ = [0, LANG.pr_menu_extrasock, _toggleExtraSocket.bind(this, slotId)];
				_.checked = extraSocket;
				a.menu.push(_)
			}
			if (_hasEnhancements(slotId)) {
				a.menu.push([0, LANG.pr_menu_clearenh, _clearEnhancements.bind(this, slotId)])
			}
			if (_data[slotId].nomodel != 2) {
				var _ = [0, LANG.pr_menu_display, _toggleDisplay.bind(this, slotId)];
				_.checked = !_data[slotId].nomodel;
				a.menu.push(_)
			}
			a.menu.push([, LANG.pr_menu_links]);
			a.menu.push([0, LANG.pr_menu_compare, su_addToSaved.bind(this, itemId + "", 1, true)])
		}
		if (_data[slotId].noupgrade != 1) {
			if (_isSlotEmpty(slotId)) {
				a.menu.push([, LANG.pr_menu_links])
			}
			var x = (_data[slotId].weapon ? (_data[slotId].weapon == 1 ? "=2" : "") : "=4"),
				_ = [0, LANG.pr_menu_upgrades, "/items" + x + "?filter=" + (_data[slotId].noupgrade && g_items[itemId] ? "minle=" + g_items[itemId].jsonequip.level + ";" : "") + "maxrl=" + _profile.level + ";si=" + (_profile.faction + 1) + ";ub=" + _profile.classs + ";cr=161;crs=1;crv=0" + (_data[slotId].noupgrade ? "" : buildData.scale + (_data[slotId].weapon ? ";gb=1" : "") + (itemId ? ";upg=" + itemId + (_data[slotId].weapon ? "#" + g_urlize(g_item_slots[g_items[itemId].jsonequip.slot]) : "") : "")), null, {
				newWindow: true
			}];
			a.menu.push(_)
		}
		if (!_isSlotEmpty(slotId)) {
			var _ = [0, LANG.pr_menu_whowears, "/profiles?filter=cr=21;crs=0;crv=" + itemId + "&sort=2", null, {
				newWindow: true
			}];
			a.menu.push(_)
		}
	}
	function _updateAllHeirlooms() {
		for (var i = 0, len = _data.length; i < len; ++i) {
			_updateHeirloom(i)
		}
	}
	function _updateHeirloom(slotId) {
		var slotId = _getValidSlot(slotId),
			itemId = _getSlotItem(slotId)[0];
		if (g_items[itemId] && g_items[itemId].quality == 7) {
			g_setJsonItemLevel(g_items[itemId].jsonequip, _profile.level);
			g_items.add(itemId, g_items[itemId]);
			_statistics.removeModifiers("item", slotId);
			if (_isSlotNeeded(slotId)) {
				_statistics.addModifiers("item", slotId, g_items[itemId].jsonequip)
			}
		}
	}
	function _updateAllIcons() {
		for (var i = 0, len = _data.length; i < len; ++i) {
			_updateIcon(i)
		}
	}
	function _updateIcon(slotId) {
		var slotId = _getValidSlot(slotId),
			item = _getSlotItem(slotId),
			itemId = item[0],
			icon = _data[slotId].icon,
			a = Icon.getLink(icon);
		icon.className = icon.className.replace(/ iconmedium-q[0-9]+/, "");
		if (_isSlotEmpty(slotId)) {
			Icon.setTexture(icon, 1, "inventoryslot_" + _data[slotId].name);
			a.onclick = rf;
			a.onmouseover = _showEmptyItemTooltip.bind(a, slotId);
			a.onmouseout = Tooltip.hide;
			a._fixTooltip = null;
			a.href = "javascript:;";
			a.className = "";
			a.rel = ""
		} else {
			Icon.setTexture(icon, 1, g_items[itemId].icon.toLowerCase());
			a.onclick = (Browser.opera || OS.mac ?
			function (e) {
				e = $E(e);
				if (e.shiftKey || e.ctrlKey) {
					return false
				}
			} : null);
			a.onmouseover = null;
			a.onmouseout = null;
			a._fixTooltip = _fixItemTooltip.bind(a, slotId);
			a.href = "/item=" + itemId;
			a.rel = _getItemRel(slotId);
			icon.className += " iconmedium-" + _getItemHilite(slotId)
		}
		icon.style.display = _isSlotNeeded(slotId) ? "" : "none"
	}
	function _showEmptyItemTooltip(slotId) {
		Tooltip.show(this, "<b>" + g_item_slots[_data[slotId].itemslots[0]] + "</b>", 0, 0, "q")
	}
	function _showEmptyGemTooltip(color) {
		Tooltip.show(this, "<b>" + g_socket_names[color] + "</b>", 0, 0, "q")
	}
	function _fixItemTooltip(slotId, html) {
		var item = _getSlotItem(slotId),
			pcs = [];
		if (!g_items[item[0]]) {
			return
		}
		var e = g_enchants[item[2]];
		if (e && e.jsonequip.reqlevel > _profile.level) {
			html = html.replace(new RegExp('<span class="q2"><!--ee-->(.+?)</span>', "g"), '<span class="q10">$1<br />' + sprintf(LANG.pr_tt_enchreq, e.jsonequip.reqlevel) + "</span>")
		}
		if (g_items[item[0]].jsonequip.itemset) {
			for (var i = 0, len = _data.length; i < len; ++i) {
				var p = _getSlotItem(i)[0];
				if (g_items[p] && g_items[p].jsonequip.itemset == g_items[item[0]].jsonequip.itemset) {
					pcs.push(p)
				}
			}
		}
		var metaCondition = _getMetaCondition(),
			errors = {};
		for (var i = 0, len = _data.length; i < len; ++i) {
			var row = _getItemErrors(i, metaCondition);
			if (slotId == i) {
				errors = row.errors
			}
		}
		if (errors.level || errors.ench || errors.gems || errors.sock) {
			html += '<br /><span class="q10">'
		}
		if (errors.level) {
			html += sprintf(LANG.pr_inv_item, LANG.pr_inv_lowlevel.replace(": ", ""))
		}
		if (errors.ench || errors.gems || errors.sock) {
			if (errors.level) {
				html += LANG.dash
			}
			html += LANG.pr_inv_missing;
			if (errors.gems) {
				html += sprintf(errors.gems == 1 ? LANG.pr_inv_gem : LANG.pr_inv_gems, errors.gems)
			}
			if (errors.sock && errors.gems) {
				html += LANG.comma
			}
			if (errors.sock) {
				html += sprintf(errors.sock == 1 ? LANG.pr_inv_socket : LANG.pr_inv_sockets, errors.sock)
			}
			if (errors.ench && (errors.gems || errors.sock)) {
				html += LANG.comma
			}
			if (errors.ench) {
				html += sprintf(errors.ench == 1 ? LANG.pr_inv_enchant : LANG.pr_inv_enchants, errors.ench)
			}
		}
		if (errors.level || errors.ench || errors.gems || errors.sock) {
			html += "</span>"
		}
		return html
	}
	function _getItemRel(slotId) {
		var item = _getSlotItem(slotId),
			extraSocket = _hasExtraSocket(slotId),
			rel = [],
			gems = [],
			pcs = [];
		if (!g_items[item[0]]) {
			return
		}
		if (item[1]) {
			rel.push("rand=" + item[1])
		}
		if (item[2]) {
			rel.push("ench=" + item[2])
		}
		for (var i = 0, len = (g_items[item[0]].jsonequip.nsockets | 0) + extraSocket; i < len; ++i) {
			gems.push(item[4 + i] > 0 ? item[4 + i] : 0)
		}
		if (gems.length) {
			rel.push("gems=" + gems.join(":"))
		}
		if (extraSocket) {
			rel.push("sock")
		}
		if (g_items[item[0]].jsonequip.itemset) {
			for (var i = 0, len = _data.length; i < len; ++i) {
				var p = _getSlotItem(i)[0];
				if (g_items[p] && g_items[p].jsonequip.itemset) {
					pcs.push(p)
				}
			}
			rel.push("pcs=" + pcs.join(":"))
		}
		if (_profile.level) {
			rel.push("lvl=" + _profile.level)
		}
		if (_profile.classs) {
			rel.push("c=" + _profile.classs)
		}
		var result = rel.join("&");
		if (result) {
			result = "&" + result
		}
		return result
	}
	function _getItemHilite(slotId) {
		var itemId = _getSlotItem(slotId)[0];
		if (!g_items[itemId]) {
			return
		}
		var item = g_items[itemId].jsonequip;
		if ((item.reqlevel > _profile.level) || (item.reqclass && !(item.reqclass & 1 << _profile.classs - 1)) || (item.subclass > 0 && item.subclass != 14 && item.subclass != 20 && _proficiencies[_profile.classs][item.classs] && !array_index(_proficiencies[_profile.classs][item.classs], item.subclass))) {
			return "q10"
		}
		return "q" + g_items[itemId].quality
	}
	function _getItemErrors(slotId, metaCondition) {
		var item = _getSlotItem(slotId);
		if (!item[0] || !g_items[item[0]] || !_isSlotNeeded(slotId)) {
			return
		}
		var targetItemLvl = 0,
			row = {},
			inventory = _getInventory(),
			jsonequip = g_items[item[0]].jsonequip,
			extraSocket = _hasExtraSocket(slotId),
			enchantId = item[2];
		if (_profile.level >= 70) {
			targetItemLvl = ((_profile.level - 70) * 9.5) + 105
		} else {
			if (_profile.level >= 60) {
				targetItemLvl = ((_profile.level - 60) * 4.5) + 60
			} else {
				targetItemLvl = _profile.level + 5
			}
		}
		for (var k in jsonEquipCopy) {
			row[k] = jsonequip[k]
		}
		if (item[1] && g_items[item[0]].jsonequip.subitems != null && g_items[item[0]].jsonequip.subitems[item[1]] != null) {
			row.name += " " + g_items[item[0]].jsonequip.subitems[item[1]].name
		}
		row.profileslot = slotId;
		row.rel = _getItemRel(slotId);
		row.score = _getGearScore(slotId);
		row.use2h = (jsonequip.slot == 17 && !inventory[17][0]);
		row.gems = [];
		row.matchSockets = {};
		row.errors = {};
		if (jsonequip.level < targetItemLvl && (slotId != 5 && slotId != 6 && slotId != 20) && (!jsonequip.scadist || !jsonequip.scaflags)) {
			row.errors.level = 1
		}
		for (var j = 0, len2 = (jsonequip.nsockets | 0) + extraSocket; j < len2; ++j) {
			var gemId = (item[j + 4] > 0 ? item[j + 4] : 0),
				socketColor = (extraSocket && j == len2 - 1 ? 14 : jsonequip["socket" + (j + 1)]);
			row.matchSockets[j] = (gemId && g_gems[gemId] && _matchGemSocket(g_gems[gemId].colors, socketColor));
			row.gems.push(gemId);
			for (var k in metaCondition) {
				if (k == "t" || !(metaCondition[k] > 0)) {
					continue
				}
				if (gemId && g_gems[gemId] && _matchGemSocket(g_gems[gemId].colors, k)) {
					metaCondition[k]--;
					metaCondition.t--
				}
			}
			if (gemId <= 0) {
				row.errors.gems = (row.errors.gems | 0) + 1
			}
		}
		if (_canBeSocketed(slotId) && !extraSocket && (_data[slotId].socket != 2 || _parent.isArmoryProfile())) {
			row.errors.sock = 1
		}
		if (enchantId || _canBeEnchanted(slotId)) {
			row.enchant = 0;
			if (enchantId && g_enchants[enchantId]) {
				var enchant = g_enchants[enchantId],
					slotMask = 1 << (jsonequip.slot - 1);
				if (typeof enchant.name == "string") {
					if (enchant.slots & slotMask) {
						row.enchant = enchant.source;
						row.enchantid = enchantId
					}
				} else {
					for (var j = 0, len2 = enchant.slots.length; j < len2; ++j) {
						if (enchant.slots[j] & slotMask) {
							row.enchant = enchant.source[j];
							row.enchantid = enchantId;
							break
						}
					}
				}
				if (row.enchant) {
					var ref = (row.enchant < 0 ? g_items : g_spells),
						refId = Math.abs(row.enchant);
					if (ref[refId] == null) {
						ref[refId] = {
							icon: enchant.icon
						}
					}
				}
			}
			if (!row.enchant) {
				if (_data[slotId].enchant != 2 || _parent.isArmoryProfile()) {
					row.errors.ench = 1
				} else {
					delete row.enchant
				}
			}
		}
		return row
	}
	function _initListview(tabIndex) {
		var _, __, a;
		_ = ce("div");
		_.className = "text";
		__ = ce("h2");
		__.id = "gear-summary";
		_lnkPrint = ce("a");
		_lnkPrint.className = "profiler-tablinks-print";
		_lnkPrint.href = "javascript:;";
		_lnkPrint.onclick = _printSummary.bind(0);
		ae(_lnkPrint, ct(LANG.pr_header_print));
		ae(__, _lnkPrint);
		a = ce("a");
		a.className = "header-link";
		a.href = "#gear-summary";
		ae(a, ct(LANG.pr_inv_title));
		ae(__, a);
		ae(_, __);
		ae(_container, _);
		_ = ce("div");
		_.className = "listview";
		ae(_container, _);
		var extraCols = [{
			id: "score",
			name: LANG.score,
			compute: function (item, td) {
				if (!item.score) {
					return
				}
				var sum = item.score.item + item.score.ench + item.score.gems,
					sp = ce("span");
				td.className = "q" + pr_getGearScoreQuality(_profile.level, sum, null, _data[item.profileslot].id, item.use2h);
				if (sum > 0) {
					sp.className = "tip";
					sp.onmouseover = _parent.showGearScoreTooltip.bind(0, item.score);
					sp.onmousemove = Tooltip.cursorUpdate;
					sp.onmouseout = Tooltip.hide
				}
				ae(sp, ct(number_format(sum)));
				ae(td, sp)
			},
			getVisibleText: function (item) {
				if (!item.score) {
					return
				}
				return item.score.item + item.score.ench + item.score.gems
			},
			sortFunc: function (a, b, col) {
				var ascore = (a.score ? a.score.item + a.score.ench + a.score.gems : 0),
					bscore = (b.score ? b.score.item + b.score.ench + b.score.gems : 0);
				return strcmp(ascore, bscore)
			}
		},
		{
			id: "gems",
			name: LANG.gems,
			compute: function (item, td) {
				if (item.errors.gems || item.errors.sock) {
					td.style.backgroundColor = "#8C0C0C"
				}
				if (!item.gems.length) {
					return
				}
				td.style.padding = "0";
				var sockets = [],
					i;
				for (i = 0; i < item.nsockets; ++i) {
					sockets.push(item["socket" + (i + 1)])
				}
				if (i < item.gems.length) {
					sockets.push(14)
				}
				Listview.funcBox.createSocketedIcons(sockets, td, item.gems, item.matchSockets);
				var d = td.firstChild,
					buildData = _talents.getTalentBuilds();
				for (var i = 0, len = sockets.length; i < len; ++i) {
					var a = Icon.getLink(d.childNodes[i]);
					a.oncontextmenu = a.onclick = rf;
					a.onmouseup = _onMouseUpSlot.bind(0, item.profileslot, a);
					if (! (item.gems[i] > 0)) {
						a.onclick = rf;
						a.onmouseover = _showEmptyGemTooltip.bind(a, sockets[i]);
						a.onmouseout = Tooltip.hide
					}
					a.menu = [
						[, g_socket_names[sockets[i]]],
						[0, (item.gems[i] > 0 ? LANG.pr_menu_replace : LANG.pr_menu_add), _openGemPicker.bind(this, sockets[i], i + 4, item.profileslot)]];
					if (item.gems[i] > 0) {
						a.menu.push([0, LANG.pr_menu_remove, _unsocketItem.bind(this, 4 + i, item.profileslot, false)])
					}
					a.menu.push([, LANG.pr_menu_links]);
					var _ = [0, LANG.pr_menu_upgrades, "/items=3?filter=maxrl=" + _profile.level + ";ub=" + _profile.classs + (sockets[i] == 1 ? ";cr=81;crs=1;crv=0" : ";cr=81:81:81;crs=2:3:4;crv=0:0:0;ma=1") + buildData.scale + (item.gems[i] ? ";gb=1;upg=" + item.gems[i] : ""), null, {
						newWindow: true
					}];
					a.menu.push(_)
				}
			},
			getVisibleText: function (item) {
				if (!item.gems.length) {
					return
				}
				var buff = "";
				for (var i = 0, len = item.gems.length; i < len; ++i) {
					var gemId = item.gems[i];
					if (gemId > 0) {
						if (i > 0) {
							buff += " "
						}
						buff += g_gems[item.gems[i]].name
					}
				}
				return buff
			},
			getValue: function (item) {
				return item.gems.length
			},
			sortFunc: function (a, b, col) {
				return strcmp(a.gems.length, b.gems.length)
			}
		},
		{
			id: "enchant",
			name: LANG.enchant,
			compute: function (item, td) {
				if (item.errors.ench) {
					td.style.backgroundColor = "#8C0C0C"
				}
				if (item.enchant == null) {
					return
				}
				td.style.padding = "0";
				Listview.funcBox.createCenteredIcons([Math.abs(item.enchant)], td, null, (item.enchant > 0 ? 1 : null));
				var a = Icon.getLink(td.firstChild.childNodes[0]),
					buildData = _talents.getTalentBuilds();
				a.oncontextmenu = a.onclick = rf;
				a.onmouseup = _onMouseUpSlot.bind(0, item.profileslot, a);
				ns(a);
				if (!item.enchant) {
					a.onclick = rf;
					a.onmouseover = _showEmptyItemTooltip.bind(a, item.profileslot);
					a.onmouseout = Tooltip.hide
				}
				a.menu = [
					[, g_item_slots[item.slot]],
					[0, (item.enchant ? LANG.pr_menu_replace : LANG.pr_menu_add), _openEnchantPicker.bind(this, item.profileslot)]];
				if (item.enchant) {
					a.menu.push([0, LANG.pr_menu_remove, _unenchantItem.bind(this, item.profileslot)])
				}
				a.menu.push([, LANG.pr_menu_links]);
				var _ = [0, LANG.pr_menu_upgrades, "/items=0.6?filter=maxrl=" + _profile.level + ";ub=" + _profile.classs + buildData.scale + (item.enchant < 0 ? ";gb=1;upg=" + Math.abs(item.enchant) : ""), null, {
					newWindow: true
				}];
				a.menu.push(_)
			},
			getVisibleText: function (item) {
				if (item.enchant == null) {
					return
				}
				return g_enchants[item.enchantid].name
			},
			getValue: function (item) {
				return (item.enchant == null ? 0 : 1)
			},
			sortFunc: function (a, b, col) {
				if (g_enchants[a.enchantid] && g_enchants[b.enchantid]) {
					return strcmp(g_enchants[a.enchantid].gearscore, g_enchants[b.enchantid].gearscore)
				}
				return strcmp(a.enchant, b.enchant)
			}
		}];
		_listview = new Listview({
			template: "inventory",
			id: "inventory",
			parent: _,
			extraCols: extraCols
		});
		if (tabIndex != null) {
			_listview.tabs = _tabs;
			_listview.tabIndex = tabIndex
		}
		_ = ce("div");
		_.className = "pad";
		ae(_container, _);
		_divTipRclk = _ = ce("div");
		_.className = "text";
		_.style.display = "none";
		ae(_, ct(_shiftClick ? LANG.pr_tip_sclkopt2 : LANG.pr_tip_rclkopt2));
		ae(_container, _)
	}
	function _updateListview() {
		if (!_inited) {
			return
		}
		var dataz = [],
			metaCondition = _getMetaCondition(),
			targetItemLvl = 0,
			lowLevelItems = 0,
			missingItems = 0,
			missingGems = 0,
			missingEnchants = 0,
			missingSockets = 0;
		_parent.updateGearScore();
		for (var i = 0, len = _data.length; i < len; ++i) {
			var slotId = i,
				item = _getSlotItem(slotId);
			if (_isSlotNeeded(slotId, 1) && !item[0] && (slotId != 5 && slotId != 6 && slotId != 20) && ((_profile.level > 55) || (_profile.level > 25 && (slotId != 14 || slotId != 15 || slotId != 19)) || (_profile.level > 20 && (slotId != 0 || slotId != 1)) || (slotId != 2 || slotId != 12 || slotId != 13))) {
				missingItems++
			}
			if (!item[0] || !g_items[item[0]] || !_isSlotNeeded(slotId)) {
				continue
			}
			var row = _getItemErrors(slotId, metaCondition);
			if (row.errors.level) {
				lowLevelItems++
			}
			if (row.errors.gems) {
				missingGems += row.errors.gems
			}
			if (row.errors.sock) {
				missingSockets++
			}
			if (row.errors.ench) {
				missingEnchants++
			}
			dataz.push(row)
		}
		var note = _listview.getNoteTopDiv().firstChild,
			buff = "";
		if (lowLevelItems) {
			buff += LANG.pr_inv_lowlevel + sprintf(lowLevelItems == 1 ? LANG.pr_inv_item : LANG.pr_inv_items, lowLevelItems);
			if (missingItems || missingEnchants || missingGems || missingSockets || metaCondition.t > 0) {
				buff += LANG.dash
			}
		}
		if (missingItems || missingEnchants || missingGems || missingSockets) {
			buff += LANG.pr_inv_missing;
			if (missingItems) {
				buff += sprintf(missingItems == 1 ? LANG.pr_inv_item : LANG.pr_inv_items, missingItems)
			}
			if (missingGems && missingItems) {
				buff += LANG.comma
			}
			if (missingGems) {
				buff += sprintf(missingGems == 1 ? LANG.pr_inv_gem : LANG.pr_inv_gems, missingGems)
			}
			if (missingSockets && (missingItems || missingGems)) {
				buff += LANG.comma
			}
			if (missingSockets) {
				buff += sprintf(missingSockets == 1 ? LANG.pr_inv_socket : LANG.pr_inv_sockets, missingSockets)
			}
			if (missingEnchants && (missingItems || missingGems || missingSockets)) {
				buff += LANG.comma
			}
			if (missingEnchants) {
				buff += sprintf(missingEnchants == 1 ? LANG.pr_inv_enchant : LANG.pr_inv_enchants, missingEnchants)
			}
			if (metaCondition.t > 0) {
				buff += LANG.dash
			}
		}
		if (metaCondition.t > 0) {
			buff += LANG.pr_inv_metareq;
			var i = 0;
			for (var k in metaCondition) {
				if (k == "t" || !(metaCondition[k] > 0)) {
					continue
				}
				if (i++>0) {
					buff += LANG.comma
				}
				buff += sprintf(metaCondition[k] == 1 ? LANG.pr_inv_gem : LANG.pr_inv_gems, metaCondition[k] + " " + g_gem_colors[k])
			}
		}
		st(note, (buff.length ? buff : String.fromCharCode(160)));
		_listview.setData(dataz);
		_listview.updateFilters(true);
		_divTipRclk.style.display = (dataz.length ? "" : "none")
	}
	function _printSummary() {
		var buff = "<html><head><title>" + document.title + '</title></head><body style="font-family: Arial, sans-serif; font-size: 13px">';
		buff += "<h2>" + _profile.name + " " + LANG.pr_inv_title + "</h2>";
		for (var i = 0, len = _slots.length; i < len; ++i) {
			var slotId = i,
				item = _getSlotItem(slotId);
			if (!item[0] || !g_items[item[0]] || !_isSlotNeeded(slotId)) {
				continue
			}
			var row = {},
				jsonequip = g_items[item[0]].jsonequip,
				subitems = g_items[item[0]].jsonequip.subitems,
				extraSocket = _hasExtraSocket(slotId);
			buff += g_item_slots[_slots[slotId].itemslots[0]] + ": <b>" + jsonequip.name.substring(1);
			if (item[1] && subitems != null && subitems[item[1]] != null) {
				buff += " " + subitems[item[1]].name
			}
			buff += "</b>";
			buff += "<ul>";
			if (jsonequip.source) {
				buff += "<li><b>" + LANG.source + "</b> - ";
				for (var j = 0, len2 = jsonequip.source.length; j < len2; ++j) {
					var sm = (jsonequip.sourcemore && jsonequip.sourcemore[j] ? jsonequip.sourcemore[j] : {}),
						ls = Listview.funcBox.getLowerSource(jsonequip.source[j], sm, (sm.t | 0));
					if (j > 0) {
						buff += ", "
					}
					if (sm.t) {
						buff += sm.n
					} else {
						buff += Listview.funcBox.getUpperSource(jsonequip.source[j], sm)
					}
					buff += " (" + g_sources[jsonequip.source[j]];
					if (ls != null) {
						buff += "; " + ls.text;
						if (sm.dd) {
							if (sm.dd < 0) {
								buff += " " + (sm.dd < -1 ? LANG.pr_print_heroic : LANG.pr_print_normal)
							} else {
								buff += " " + (sm.dd & 1 ? LANG.lvitem_raid10 : LANG.lvitem_raid25) + " " + (sm.dd > 2 ? LANG.pr_print_heroic : LANG.pr_print_normal)
							}
						}
					}
					buff += ")"
				}
				buff += "</li>"
			}
			if (item[2] || _canBeEnchanted(slotId)) {
				buff += "<li><b>" + LANG.enchant + "</b> - ";
				if (item[2] && g_enchants[item[2]]) {
					var enchant = g_enchants[item[2]],
						slotMask = 1 << (jsonequip.slot - 1);
					if (typeof enchant.name == "string") {
						if (enchant.slots & slotMask) {
							buff += enchant.name
						}
					} else {
						for (var j = 0, len2 = enchant.slots.length; j < len2; ++j) {
							if (enchant.slots[j] & slotMask) {
								buff += enchant.name[j];
								break
							}
						}
					}
				} else {
					buff += "<i>" + LANG.pr_print_none + "</i>"
				}
				buff += "</li>"
			}
			if (_canBeSocketed(slotId)) {
				buff += "<li><b>" + LANG.pr_menu_extrasock + "</b> - " + (extraSocket ? LANG.pr_print_yes : "<i>" + LANG.pr_print_no + "</i>") + "</li>"
			}
			if (jsonequip.nsockets || extraSocket) {
				buff += "<li><b>" + LANG.gems + "</b> - ";
				for (var j = 0, len2 = (jsonequip.nsockets | 0) + extraSocket; j < len2; ++j) {
					if (j > 0) {
						buff += ", "
					}
					if (item[j + 4] && g_gems[item[j + 4]]) {
						buff += g_gems[item[j + 4]].name
					} else {
						buff += "<i>" + LANG.pr_print_none + "</i>"
					}
					buff += " (" + g_socket_names[(extraSocket && j == len2 - 1 ? 14 : jsonequip["socket" + (j + 1)])] + ")"
				}
				buff += "</li>"
			}
			buff += "</ul>"
		}
		buff += "</body></html>";
		profileSummary = buff;
		window.open("/profile=summary", "", "toolbar=no,menubar=yes,status=yes,scrollbars=yes,resizable=yes")
	}
	function _prepareSearch(search) {
		if (_timer > 0) {
			clearTimeout(_timer);
			_timer = 0
		}
		if (search) {
			st(_spSearchMsg, sprintf(LANG.pr_searching, search))
		}
		_spSearchMsg.className = "";
		_timer = setTimeout(_searchItems.bind(0, search, _currentSlot), 1000)
	}
	function _searchItems(search, slotId) {
		var lv = g_listviews.items;
		_searchResults = [{
			none: 1,
			__alwaysvisible: 1
		}];
		lv.searchable = false;
		lv.setData(_searchResults);
		lv.clearSearch();
		lv.updateFilters(true);
		_spSearchMsg.className = "";
		if (!search) {
			st(_spSearchMsg, LANG.pr_specifyitem);
			return
		}
		st(_spSearchMsg, sprintf(LANG.pr_searching, search));
		new Ajax("/search?q=" + urlencode(search) + "&json&slots=" + _data[slotId].itemslots.join(":"), {
			method: "POST",
			search: search,
			onSuccess: function (xhr, opt) {
				var text = xhr.responseText;
				if (text.charAt(0) != "[" || text.charAt(text.length - 1) != "]") {
					return
				}
				var a = eval(text);
				if (search == opt.search && a.length == 3) {
					for (var i = 0, len = a[1].length; i < len; ++i) {
						_searchResults.push(a[1][i])
					}
					for (var i = 0, len = a[2].length; i < len; ++i) {
						var _ = {};
						_["name_" + Locale.getName()] = a[2][i].name.substring(1);
						cO(_, {
							quality: 7 - parseInt(a[2][i].name.charAt(0)),
							icon: a[2][i].icon,
							jsonequip: {}
						});
						cO(_.jsonequip, a[2][i]);
						g_items.add(a[2][i].id, _)
					}
					lv.searchable = true;
					ee(_spSearchMsg)
				} else {
					st(_spSearchMsg, sprintf(LANG.pr_noresults, opt.search));
					_spSearchMsg.className = "q10"
				}
				_currentSearch = "";
				lv.setData(_searchResults);
				lv.clearSearch();
				lv.updateFilters(true)
			}
		})
	}
	function _isValidItem(item) {
		if (item.none) {
			return true
		}
		var itemTypes = _proficiencies[_profile.classs][item.classs];
		return ((_itemType == null || !itemTypes || item.subclass < 1 || item.subclass == 14 || ((_itemType == 1 || item.classs == 2 || item.subclass > 4) && array_index(itemTypes, item.subclass)) || (_itemType == 2 && item.subclass == itemTypes[itemTypes.length - 1])))
	}
	function _filterItems(wut, value) {
		switch (wut) {
		case 0:
			_itemType = value;
			break;
		default:
			return
		}
		if (this && this.nodeName == "A") {
			g_setSelectedLink(this, "items" + wut)
		}
		_lvItems.updateFilters(true);
		return false
	}
	function _createItemsNote(div) {
		var sm = ce("small"),
			sp = ce("span"),
			a;
		ae(sm, ct(LANG.pr_note_type));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterItems.bind(a, 0, null);
		ae(a, ct(LANG.pr_note_all));
		g_setSelectedLink(a, "items0");
		ae(sm, a);
		ae(sm, ct(LANG.comma));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterItems.bind(a, 0, 1);
		ae(a, ct(LANG.pr_note_usable));
		ae(sm, a);
		ae(sm, sp);
		ae(sp, ct(LANG.comma));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterItems.bind(a, 0, 2);
		ae(sp, a);
		sp = ce("span");
		sp.style.padding = "0 8px";
		sp.style.color = "white";
		ae(sp, ct("|"));
		ae(sm, sp);
		ae(div, sm);
		sm = ce("small");
		ae(sm, ct(LANG.pr_note_name));
		_spSearchName = ce("input");
		_spSearchName.type = "text";
		_spSearchName.value = _currentSearch;
		aE(_spSearchName, "keyup", _onKeyUpSearch);
		aE(_spSearchName, "keydown", _onKeyDownSearch);
		ae(sm, _spSearchName);
		_spSearchMsg = ce("span");
		_spSearchMsg.style.fontWeight = "bold";
		ae(sm, _spSearchMsg);
		ae(div, sm)
	}
	function _isValidEnchant(enchant) {
		if (enchant.none) {
			return true
		}
		var slotMask = 1 << (g_items[_getSlotItem(_currentSlot)[0]].jsonequip.slot - 1),
			classMask = 1 << (_profile.classs - 1);
		return ((enchant.classes <= 0 || enchant.classes & classMask) && (enchant.slots & slotMask) && (_enchantSource == null || (_enchantSource == 1 && enchant.source < 0) || (_enchantSource == 2 && enchant.source > 0)))
	}
	function _filterEnchants(wut, value) {
		switch (wut) {
		case 0:
			_enchantSource = value;
			break;
		case 1:
			_lvEnchants.setSort([value], true, false);
			break;
		default:
			return
		}
		if (this && this.nodeName == "A") {
			g_setSelectedLink(this, "enchants" + wut)
		}
		_lvEnchants.updateFilters(true);
		return false
	}
	function _createEnchantsNote(div) {
		var sm = ce("small"),
			a;
		ae(sm, ct(LANG.pr_note_source));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterEnchants.bind(a, 0, null);
		ae(a, ct(LANG.pr_note_all));
		g_setSelectedLink(a, "enchants0");
		ae(sm, a);
		ae(sm, ct(LANG.comma));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterEnchants.bind(a, 0, 1);
		ae(a, ct(LANG.pr_note_items));
		ae(sm, a);
		ae(sm, ct(LANG.comma));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterEnchants.bind(a, 0, 2);
		ae(a, ct(LANG.pr_note_profs));
		ae(sm, a);
		ae(div, sm);
		sm = ce("small");
		var sp = ce("span");
		sp.style.padding = "0 8px";
		sp.style.color = "white";
		ae(sp, ct("|"));
		ae(sm, sp);
		ae(sm, ct(LANG.pr_note_sort + " "));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterEnchants.bind(a, 1, 1);
		ae(a, ct(LANG.pr_note_gearscore));
		g_setSelectedLink(a, "enchants1");
		ae(sm, a);
		ae(sm, ct(LANG.comma));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterEnchants.bind(a, 1, 2);
		ae(a, ct(LANG.pr_note_weighted));
		ae(sm, a);
		ae(sm, a);
		ae(div, sm)
	}
	function _hasSocketBonus(slotId) {
		var item = _getSlotItem(slotId),
			nMatches = 0;
		if (!g_items[item[0]] || !g_items[item[0]].jsonequip.nsockets) {
			return false
		}
		for (var j = 0; j < 3; ++j) {
			if (item[j + 4] && g_gems[item[j + 4]]) {
				if (_matchGemSocket(g_gems[item[j + 4]].colors, g_items[item[0]].jsonequip["socket" + (j + 1)])) {
					++nMatches
				}
			}
		}
		return (nMatches == g_items[item[0]].jsonequip.nsockets)
	}
	function _matchGemSocket(gemColor, socketColor) {
		for (var i = 1; i <= 8; i *= 2) {
			if ((socketColor & i) && (gemColor & i)) {
				return true
			}
		}
		return false
	}
	function _isValidGem(gem) {
		if (gem.none) {
			return true
		}
		return ((_gemSource == null || gem.expansion == _gemSource) && ((_gemColor == null && _currentColor != 1 && gem.colors != 1) || _matchGemSocket(gem.colors, _currentColor)))
	}
	function _filterGems(wut, value) {
		switch (wut) {
		case 0:
			_gemSource = value;
			break;
		case 1:
			_gemColor = value;
			break;
		default:
			return
		}
		if (this && this.nodeName == "A") {
			g_setSelectedLink(this, "gems" + wut)
		}
		_lvGems.updateFilters(true);
		return false
	}
	function _createGemsNote(div) {
		var sm = ce("small"),
			a;
		ae(sm, ct(LANG.pr_note_source));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterGems.bind(a, 0, null);
		ae(a, ct(LANG.pr_note_all));
		g_setSelectedLink(a, "gems0");
		ae(sm, a);
		ae(sm, ct(LANG.comma));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterGems.bind(a, 0, 1);
		ae(a, ct(LANG.pr_note_bc));
		ae(sm, a);
		ae(sm, ct(LANG.comma));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterGems.bind(a, 0, 2);
		ae(a, ct(LANG.pr_note_wotlk));
		ae(sm, a);
		ae(div, sm);
		sm = ce("small");
		var sp = ce("span");
		sp.style.padding = "0 8px";
		sp.style.color = "white";
		ae(sp, ct("|"));
		ae(sm, sp);
		ae(sm, ct(LANG.pr_note_color));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterGems.bind(a, 1, null);
		ae(a, ct(LANG.pr_note_all));
		g_setSelectedLink(a, "gems1");
		ae(sm, a);
		ae(sm, ct(LANG.comma));
		a = ce("a");
		a.href = "javascript:;";
		a.onclick = _filterGems.bind(a, 1, 1);
		ae(a, ct(LANG.pr_note_match));
		ae(sm, a);
		ae(div, sm)
	}
	function _openItemPicker(slotId) {
		_currentSlot = _getValidSlot(slotId);
		Lightbox.show("itempicker", {
			onShow: _onShowItemPicker
		})
	}
	function _openSubitemPicker(slotId) {
		_currentSlot = _getValidSlot(slotId);
		Lightbox.show("subitempicker", {
			onShow: _onShowSubitemPicker
		})
	}
	function _openEnchantPicker(slotId) {
		_currentSlot = _getValidSlot(slotId);
		Lightbox.show("enchantpicker", {
			onShow: _onShowEnchantPicker
		})
	}
	function _openGemPicker(socketColor, socketId, slotId) {
		_currentSlot = _getValidSlot(slotId);
		_currentSocket = socketId;
		_currentColor = socketColor;
		Lightbox.show("gempicker", {
			onShow: _onShowGemPicker
		})
	}
	function _onShowItemPicker(dest, first, opt) {
		Lightbox.setSize(800, 564);
		var lv;
		if (first) {
			dest.className = "profiler-picker listview";
			var d = ce("div"),
				a = ce("a"),
				clear = ce("div");
			d.className = "listview";
			ae(dest, d);
			a = ce("a");
			a.className = "screenshotviewer-close";
			a.href = "javascript:;";
			a.onclick = Lightbox.hide;
			ae(a, ce("span"));
			ae(dest, a);
			clear.className = "clear";
			ae(dest, clear);
			_lvItems = lv = new Listview({
				template: "itempicker",
				id: "items",
				parent: d,
				data: [],
				clip: {
					w: 780,
					h: 478
				},
				createNote: _createItemsNote,
				customFilter: _isValidItem
			});
			if (Browser.firefox) {
				aE(lv.getClipDiv(), "DOMMouseScroll", g_pickerWheel)
			} else {
				lv.getClipDiv().onmousewheel = g_pickerWheel
			}
		} else {
			lv = g_listviews.items
		}
		var div = lv.getNoteTopDiv(),
			sms = gE(div, "small");
		if (!array_index([0, 2, 4, 7, 8, 9, 10, 11, 16, 17, 18, 19], _currentSlot)) {
			sms[0].style.display = "none"
		} else {
			var ss = gE(div, "span"),
				as = gE(div, "a");
			sms[0].style.display = "";
			if (_currentSlot > 15) {
				ss[0].style.display = "none";
				if (_itemType == 2) {
					as[1].onclick()
				}
			} else {
				var itemTypes = _proficiencies[_profile.classs][4];
				ss[0].style.display = "";
				st(as[2], g_itemset_types[itemTypes[itemTypes.length - 1]])
			}
		}
		setTimeout(function () {
			_searchItems("", _currentSlot);
			_spSearchName.value = "";
			_spSearchName.focus()
		},
		1)
	}
	function _onShowSubitemPicker(dest, first, opt) {
		Lightbox.setSize(800, 564);
		var lv, itemId = _getSlotItem(_currentSlot)[0],
			dataz = [];
		for (var subitemId in g_items[itemId].jsonequip.subitems) {
			var subitem = g_items[itemId].jsonequip.subitems[subitemId];
			subitem.id = subitemId;
			subitem.item = itemId;
			dataz.push(subitem)
		}
		if (first) {
			dest.className = "profiler-picker listview";
			var d = ce("div"),
				a = ce("a"),
				clear = ce("div");
			d.className = "listview";
			ae(dest, d);
			a = ce("a");
			a.className = "screenshotviewer-close";
			a.href = "javascript:;";
			a.onclick = Lightbox.hide;
			ae(a, ce("span"));
			ae(dest, a);
			clear.className = "clear";
			ae(dest, clear);
			_lvSubitems = lv = new Listview({
				template: "subitempicker",
				id: "subitems",
				parent: d,
				data: dataz
			});
			if (Browser.firefox) {
				aE(lv.getClipDiv(), "DOMMouseScroll", g_pickerWheel)
			} else {
				lv.getClipDiv().onmousewheel = g_pickerWheel
			}
		} else {
			lv = g_listviews.subitems;
			lv.setData(dataz);
			lv.clearSearch();
			lv.updateFilters(true)
		}
		setTimeout(function () {
			lv.focusSearch()
		},
		1)
	}
	function _onShowEnchantPicker(dest, first, opt) {
		Lightbox.setSize(800, 564);
		var lv, dataz = [];
		dataz.push({
			none: 1,
			__alwaysvisible: 1
		});
		for (var enchantId in g_enchants) {
			var enchant = g_enchants[enchantId];
			enchant.id = enchantId;
			enchant.score = _parent.calcScore(enchant.jsonequip);
			if (typeof enchant.name == "string") {
				dataz.push(enchant)
			} else {
				for (var i = 0, len = g_enchants[enchantId].name.length; i < len; ++i) {
					var row = dO(enchant);
					row.name = enchant.name[i];
					row.source = enchant.source[i];
					row.slots = enchant.slots[i];
					dataz.push(row)
				}
			}
		}
		if (first) {
			dest.className = "profiler-picker listview";
			var d = ce("div"),
				a = ce("a"),
				clear = ce("div");
			d.className = "listview";
			ae(dest, d);
			a = ce("a");
			a.className = "screenshotviewer-close";
			a.href = "javascript:;";
			a.onclick = Lightbox.hide;
			ae(a, ce("span"));
			ae(dest, a);
			clear.className = "clear";
			ae(dest, clear);
			_lvEnchants = lv = new Listview({
				template: "enchantpicker",
				id: "enchants",
				parent: d,
				data: dataz,
				createNote: _createEnchantsNote,
				customFilter: _isValidEnchant
			});
			if (Browser.firefox) {
				aE(lv.getClipDiv(), "DOMMouseScroll", g_pickerWheel)
			} else {
				lv.getClipDiv().onmousewheel = g_pickerWheel
			}
		} else {
			lv = g_listviews.enchants;
			lv.setData(dataz);
			lv.clearSearch();
			lv.updateFilters(true)
		}
		setTimeout(function () {
			lv.focusSearch()
		},
		1)
	}
	function _onShowGemPicker(dest, first, opt) {
		Lightbox.setSize(800, 564);
		var lv;
		if (first) {
			dest.className = "profiler-picker listview";
			var dataz = [],
				d = ce("div"),
				a = ce("a"),
				clear = ce("div");
			dataz.push({
				none: 1,
				__alwaysvisible: 1
			});
			for (var gemId in g_gems) {
				var gem = g_gems[gemId];
				gem.id = gemId;
				dataz.push(gem)
			}
			d.className = "listview";
			ae(dest, d);
			a = ce("a");
			a.className = "screenshotviewer-close";
			a.href = "javascript:;";
			a.onclick = Lightbox.hide;
			ae(a, ce("span"));
			ae(dest, a);
			clear.className = "clear";
			ae(dest, clear);
			_lvGems = lv = new Listview({
				template: "gempicker",
				id: "gems",
				parent: d,
				data: dataz,
				createNote: _createGemsNote,
				customFilter: _isValidGem
			});
			if (Browser.firefox) {
				aE(lv.getClipDiv(), "DOMMouseScroll", g_pickerWheel)
			} else {
				lv.getClipDiv().onmousewheel = g_pickerWheel
			}
		} else {
			lv = g_listviews.gems;
			lv.clearSearch();
			lv.updateFilters(true)
		}
		var div = lv.getNoteTopDiv(),
			sms = gE(div, "small"),
			as = gE(div, "a");
		if (_currentColor == 1 || _currentColor == 14) {
			sms[1].style.display = "none"
		} else {
			sms[1].style.display = ""
		}
		setTimeout(function () {
			lv.focusSearch()
		},
		1)
	}
}
function ProfilerCompletion(H) {
	var p = this,
		ap, L, q, k, s, j, W, aq, z, a, w, n, U, R, l, ah, O, B, ai, at, J, g, K, x, ab, c, e, Z, au, y, af, m, P, u, aa, al, S, o, D = {},
		ad = [{
		id: "completed",
		name: LANG.completed,
		type: "text",
		width: "16%",
		value: "completed",
		compute: function (ax, ay) {
			var aw = ce("img");
			aw.src = (ax.completed ? g_staticUrl + "/images/icons/" + (!ax._included() ? "star" : "tick") + ".png" : g_staticUrl + "/images/icons/delete.gif");
			aw.onmouseover = function (az) {
				Tooltip.showAtCursor(az, LANG[(ax.completed ? (ax._included() ? "pr_note_complete" : "pr_tt_excldone") : "pr_note_incomplete")], 0, 0, "q")
			};
			aw.onmousemove = Tooltip.cursorUpdate;
			aw.onmouseout = Tooltip.hide;
			aw.style.border = "none";
			ae(ay, aw);
			if (ax.completed && ax.completed.getTime) {
				ae(ay, ct(" " + g_formatDateSimple(ax.completed)))
			}
		},
		getVisibleText: function (aw) {
			var ax = LANG[(aw.completed ? "pr_note_complete" : "pr_note_incomplete")];
			if (aw.completed && aw.completed.getTime) {
				ax += " " + g_formatDateSimple(aw.completed)
			}
			return ax
		},
		sortFunc: function (ax, aw, ay) {
			return (strcmp(ax.completed, aw.completed) || strcmp(ax._included(), aw._included()))
		}
	}];
	this.initialize = function (ax, ay, aw) {
		K = ge(ax);
		if (!K) {
			return
		}
		ap = H.getVars();
		L = ap.profile;
		q = ap.tabs;
		k = ap.dialog;
		s = ay;
		if (!q.tabs[s]) {
			return
		}
		o = q.tabs[s].id;
		cO(D, aw);
		x = ce("img");
		x.src = g_staticUrl + "/images/ui/misc/progress-anim.gif";
		x.style.clear = "both";
		x.style.display = (D.onDemand ? "block" : "none");
		x.style.margin = "0 auto";
		ae(K, x);
		au = ce("div");
		if (!D.onDemand) {
			ai = true
		} else {
			if (typeof D.onDemand != "string") {
				D.onDemand = o
			}
		}
		if (!D.reqcatg) {
			D.partial = false
		}
	};
	this.updateExclusions = function () {
		f()
	};
	this.setData = function (ay, ax, aw) {
		ao(ay, ax, aw)
	};
	this.filterData = function (aA, aB) {
		if (!B) {
			B = {}
		}
		if (B[aA] > 0) {
			clearTimeout(B[aA]);
			B[aA] = 0
		}
		if (!aq || O) {
			return B[aA] = setTimeout(p.filterData.bind(p, aA, aB), 750)
		}
		var ay = 0;
		if (aA === 0) {
			var ax = gE(Z, "a");
			for (var az = 0, aw = ax.length; az < aw; ++az) {
				if (ax[az].category == aB) {
					ay = ax[az];
					break
				}
			}
		} (h.bind(ay, aA, aB))()
	};
	this.onLoad = function (ay, ax) {
		if (ay == D.onDemand) {
			var aw = O;
			O = null;
			x.style.display = "none";
			au.style.display = (o == "quests" ? "" : "none");
			ao(ah, j, W, 1);
			if (ax !== null) {
				ai[ax] = 1;
				g = false;
				p.filterData(0, ax)
			}
		}
	};
	this.onShow = function () {
		if (D.onDemand && !O && !ai) {
			g_ajaxIshRequest("/data=" + D.onDemand + (D.dataArgs ? D.dataArgs(L) : "") + "&callback=$WowheadProfiler.loadOnDemand&" + (new Date().getTime()));
			x.style.display = "block";
			au.style.display = "none";
			O = this;
			ai = {}
		}
		if (!aq || O) {
			return
		}
		if (!at) {
			Y();
			M();
			G();
			A();
			E();
			v();
			ak();
			at = true
		}
		if (!J) {
			U = null;
			R = null;
			l = ($WH[D.order] ? null : true);
			b();
			am();
			N();
			X();
			aj();
			av();
			ac();
			J = true
		}
	};

	function ao(aA, az, aw) {
		aq = [];
		j = az;
		W = aw;
		ah = aA;
		var ax = false;
		for (var ay in $WH[D.source]) {
			var aB = dO($WH[D.source][ay]);
			aB.id = parseInt(ay);
			if (D.filter && !D.filter(aB)) {
				continue
			}
			if ((!D.compute || D.compute(aB, aA[ay])) && aA[ay]) {
				aB.completed = (aA[ay].getTime ? aA[ay] : 1);
				ax = true
			} else {
				aB.completed = null
			}
			aB.who = L.name;
			aB.faction = L.faction + 1;
			aB._included = r.bind(0, aB, 1);
			if ((!aB.side || (aB.side & (L.faction + 1))) && (!aB.reqclass || aB.reqclass & 1 << L.classs - 1) && (!aB.reqrace || aB.reqrace & 1 << L.race - 1) && (!aB.gender || aB.gender & 1 << L.gender) && (!aB.wflags || !(aB.wflags & 31)) && (!aB.historical || (aB.historical && aB.completed)) && (!D.models || (aB.npcId && aB.displayId && aB.displayName))) {
				aq.push(aB)
			}
		}
		if (!ax && D.onDemand) {
			for (var ay in aA) {
				if (typeof aA[ay] == "object" && aA[ay].length) {
					var aB = {};
					aB.id = parseInt(ay);
					if (D.catgid) {
						aB[D.catgid] = aA[ay][1]
					}
					if (D.subcat) {
						aB[D.subcat] = aA[ay][0]
					}
					if (D.filter && !D.filter(aB)) {
						continue
					}
				}
				ax = true;
				break
			}
		}
		J = false;
		g = false;
		if (!ax) {
			q.hide(s);
			return
		}
		if (q.getSelectedTab() == s) {
			p.onShow()
		}
	}
	function b(aG) {
		var aC = {
			all: {},
			complete: {},
			incomplete: {},
			bonus: {},
			excluded: {}
		},
			aF = (aG == null ? D.overall : aG),
			aB = l,
			aw = U,
			ax = R;
		l = null;
		U = (aG != null ? aG : null);
		R = null;
		w = true;
		aC.all[aF] = 0;
		aC.complete[aF] = 0;
		aC.incomplete[aF] = 0;
		aC.bonus[aF] = 0;
		aC.excluded[aF] = 0;
		for (var az = 0, aA = aq.length; az < aA; ++az) {
			var aD = aq[az],
				ay = (aG == null ? Q(aD) : F(aD));
			if (ay == aG) {
				ay = "current"
			} else {
				if (ay == aF) {
					continue
				}
			}
			if (aC.all[ay] == null) {
				aC.all[ay] = 0
			}
			if (aC.complete[ay] == null) {
				aC.complete[ay] = 0
			}
			if (aC.incomplete[ay] == null) {
				aC.incomplete[ay] = 0
			}
			if (aC.bonus[ay] == null) {
				aC.bonus[ay] = 0
			}
			if (aC.excluded[ay] == null) {
				aC.excluded[ay] = 0
			}
			if (an(aD)) {
				if (r(aD)) {
					if (!r(aD, 1)) {
						aC.bonus[ay]++;
						aC.bonus[aF]++;
						aC.excluded[ay]++;
						aC.excluded[aF]++;
						continue
					}
					if (!array_index(D.nototal, ay)) {
						aC.all[ay]++;
						aC.all[aF]++;
						if (aD.completed) {
							aC.complete[aF]++
						} else {
							aC.incomplete[aF]++
						}
					} else {
						aC.all[ay]++
					}
					if (aD.completed != null) {
						aC.complete[ay]++
					} else {
						aC.incomplete[ay]++
					}
				} else {
					aC.excluded[ay]++;
					aC.excluded[aF]++
				}
			}
		}
		if (D.noempty) {
			for (var ay in aC.complete) {
				if (ay == aF) {
					continue
				}
				if (!aC.complete[ay] && !array_index(D.nototal, ay)) {
					aC.all[aF] -= aC.all[ay]
				}
			}
		}
		l = aB;
		U = aw;
		R = ax;
		w = false;
		if (aG != null) {
			a[aG] = aC
		} else {
			z = aC
		}
	}
	function Y() {
		if (!D.noAd) {
			_ = ce("div");
			ae(K, _);
			Ads.fillSpot("medrect", _)
		}
	}
	function M() {
		ab = _ = ce("div");
		_.className = "text profiler-achievements-source";
		ae(K, _)
	}
	function am() {
		ee(ab);
		if (j && W.getDate) {
			var aA = new Date(W),
				az = (g_serverTime - aA) / 1000,
				ay = ce("span"),
				ax = ce("span");
			ae(ax, ay);
			Listview.funcBox.coFormatDate(ay, az, aA);
			ab.innerHTML = "<small>" + sprintfa(LANG.pr_datasource, j, ax.innerHTML) + "</small>";
			var aw = ce("a");
			aw.href = "javascript:;";
			aw.onclick = ContactTool.show.bind(ContactTool, {
				mode: 4,
				profile: L
			});
			aw.className = "icon-report";
			aw.style.marginLeft = "10px";
			g_addTooltip(aw, LANG.report_tooltip, "q2");
			ae(aw, ct(LANG.report));
			ae(ab.firstChild, aw)
		}
	}
	function G() {
		var aw, ax;
		c = aw = ce("div");
		aw.className = "profiler-achievements-summary";
		if (D.points) {
			e = ax = ce("div");
			ax.className = "profiler-achievements-summary-points";
			ae(aw, ax)
		}
		Z = ax = ce("div");
		ax.className = "profiler-achievements-summary-inner";
		ae(aw, ax);
		ae(K, aw);
		ae(K, x);
		ax = au;
		ax.className = "text clear";
		ax.innerHTML = LANG.pr_tip_quests;
		ax.style.display = (o == "quests" && ai ? "" : "none");
		aw = gE(ax, "span")[0];
		aw.onmouseover = function () {
			Tooltip.show(this, LANG.pr_tt_questtip, 0, 0, "q")
		};
		aw.onmousemove = Tooltip.cursorUpdate;
		aw.onmouseout = Tooltip.hide;
		aw = ce("div");
		aw.className = "pad";
		ae(ax, aw);
		ae(K, ax)
	}
	function N() {
		var ay;
		if (D.points) {
			ee(e);
			Listview.funcBox.appendMoney(e, 0, null, 0, 0, 0, L.achievementpoints);
			ae(e.firstChild, ct(" / " + number_format(g_achievement_points[0])))
		}
		ee(Z);
		ae(Z, I(D.overall, 0));
		if ($WH[D.order]) {
			var ax = 1;
			for (var az = 0, aw = $WH[D.order].length; az < aw; ++az) {
				if (!z.all[$WH[D.order][az]] && !z.excluded[$WH[D.order][az]]) {
					continue
				}
				if (D.noempty && !(z.complete[$WH[D.order][az]] || z.excluded[$WH[D.order][az]])) {
					continue
				}
				ae(Z, I($WH[D.order][az], ax));
				++ax
			}
		}
		ay = ce("div");
		ay.className = "clear";
		ae(Z, ay)
	}
	function I(aA, aw) {
		var ax = ce("a"),
			ay = ce("var"),
			az = ce("em");
		if (aw > 0) {
			ax.className = (aw % 3 != 0 ? "profiler-achievements-total" : "profiler-achievements-total-right")
		}
		ax.category = aA;
		ax.onclick = h.bind(ax, 0, (aA != D.overall ? aA : null));
		if (aw == 0) {
			ae(az, ct(LANG.pr_ach_overall))
		} else {
			ae(az, ct($WH[D.catgs][aA]))
		}
		ae(ay, az);
		ae(ay, g_createAchievementBar(z.complete[aA], (!array_index(D.nototal, aA) ? z.all[aA] : -1), (aA == D.overall), z.bonus[aA]));
		ae(ax, ay);
		if (aA == U || (aw == 0 && U == null)) {
			g_setSelectedLink(ax, o + "0")
		}
		return ax
	}
	function A() {
		y = ce("div");
		y.className = "clear";
		ae(K, y);
		u = new Tabs({
			parent: y,
			onShow: V
		});
		u.add(LANG.pr_note_subcategories, {
			id: o
		});
		u.add(LANG.pr_note_all, {
			id: o
		});
		u.add(LANG.pr_note_complete, {
			id: o
		});
		u.add(LANG.pr_note_incomplete, {
			id: o
		});
		u.add(LANG.pr_note_excluded, {
			id: o
		});
		u.flush()
	}
	function X() {
		var aw = (U === null ? D.overall : U);
		y.style.display = (U !== null || !D.reqcatg ? "" : "none");
		u.setTabName(1, LANG.pr_note_all + " (" + z.all[aw] + ")");
		u.setTabName(2, LANG.pr_note_complete + " (" + z.complete[aw] + (z.bonus[aw] ? "+" + z.bonus[aw] : "") + ")");
		u.setTabName(3, LANG.pr_note_incomplete + " (" + z.incomplete[aw] + ")");
		u.setTabName(4, LANG.pr_note_excluded + " (" + z.excluded[aw] + ")")
	}
	function V(aw, ax) {
		if (!at) {
			return
		}
		if (O) {
			af.style.display = "none";
			m.style.display = "none";
			P.style.display = "none"
		} else {
			n = false;
			switch (aw.index) {
			case 0:
				af.style.display = "";
				m.style.display = "none";
				P.style.display = "none";
				break;
			case 1:
				h(1, null);
				af.style.display = "none";
				m.style.display = "";
				break;
			case 2:
				h(1, true);
				af.style.display = "none";
				m.style.display = "";
				P.style.display = "none";
				break;
			case 3:
				h(1, false);
				af.style.display = "none";
				m.style.display = "";
				P.style.display = "none";
				break;
			case 4:
				n = true;
				av();
				af.style.display = "none";
				m.style.display = "none";
				P.style.display = "";
				break
			}
		}
	}
	function E() {
		af = ce("div");
		af.className = "listview";
		aa = new Listview({
			template: "completion",
			id: o + "-subcatgs",
			parent: af,
			onNoData: i,
			onClickRow: h
		});
		ae(K, af)
	}
	function aj(az) {
		h(2, null);
		if (a == null) {
			a = {}
		}
		var aw = false;
		var ay = [];
		if (U !== null && D.subname) {
			if (a[U] == null) {
				b(U)
			}
			for (var ax in a[U].all) {
				if (ax == U) {
					continue
				}
				if (!a[U].all[ax] && !a[U].excluded[ax]) {
					continue
				}
				if (ax !== "current") {
					aw = true
				}
				ay.push({
					id: ax,
					name: (ax == "current" ? D.subname(U) : D.subname(ax)),
					current: (ax == "current"),
					total: a[U].all[ax],
					complete: a[U].complete[ax]
				})
			}
		}
		aa.setData(ay);
		if (!az) {
			u.hide(0, aw);
			u.show((aw ? 0 : 2), 1)
		}
	}
	function v() {
		m = ce("div");
		m.className = "listview";
		m.style.display = "none";
		var aw = null,
			ax = ["side", "location", "rewards", "reagents"];
		switch (o) {
		case "achievements":
			aw = [-6];
			break;
		case "recipes":
			aw = [-7];
			break;
		case "quests":
			ax.shift();
			break
		}
		al = new Listview({
			template: D.template,
			id: o + "-includes",
			parent: m,
			visibleCols: ["category", "standing", "source"],
			hiddenCols: ax,
			extraCols: ad,
			sort: aw,
			customFilter: an,
			onBeforeCreate: ag,
			onNoData: i,
			onEmptyFilter: C
		});
		ae(K, m)
	}
	function ac() {
		if (D.reqcatg && U === null) {
			return
		}
		al.setData(array_filter(aq, function (aw) {
			return r(aw)
		}));
		al.updateFilters(true);
		g = true
	}
	function ak() {
		P = ce("div");
		P.className = "listview";
		P.style.display = "none";
		var aw = null,
			ax = ["side", "location", "rewards", "reagents"];
		switch (o) {
		case "achievements":
			aw = [-6];
			break;
		case "recipes":
			aw = [-7];
			break;
		case "quests":
			ax.shift();
			break
		}
		S = new Listview({
			template: D.template,
			id: o + "-excludes",
			parent: P,
			visibleCols: ["category", "standing", "source"],
			hiddenCols: ax,
			extraCols: ad,
			sort: aw,
			customFilter: an,
			onBeforeCreate: ag,
			include: 1,
			onNoData: i,
			onEmptyFilter: C
		});
		ae(K, P)
	}
	function av() {
		if (D.reqcatg && U === null) {
			return
		}
		S.setData(array_filter(aq, function (aw) {
			return !r(aw) || !r(aw, 1)
		}));
		S.updateFilters();
		S.refreshRows()
	}
	function i(aw) {
		if ((! (D.reqcatg && U == null) && this.filtered) || (!this.include && (U !== null || R !== null))) {
			return -1
		}
		if (this.quickSearchBox.value != "") {
			ae(aw, ct(LANG.lvnodata2));
			return
		}
		this.bandTop.style.display = this.bandBot.style.display = this.mainContainer.style.display = (U !== null || R !== null ? "" : "none");
		ae(aw, ct(this.include ? LANG.lvnodata4 : LANG.lvnodata3))
	}
	function C(aw) {
		if (aw.id == "category") {
			this.removeIndicators()
		}
	}
	function ag() {
		if (!g_user) {
			g_user = {}
		}
		if (!g_user.excludes) {
			g_user.excludes = {}
		}
		if (!g_user.includes) {
			g_user.includes = {}
		}
		if (!g_user.excludes[D.typeid]) {
			g_user.excludes[D.typeid] = []
		}
		if (!g_user.includes[D.typeid]) {
			g_user.includes[D.typeid] = []
		}
		this.poundable = 0;
		this.createCbControls = function (aD, aC) {
			var aB = function (aH) {
				var aG = this.getCheckedRows();
				if (!aG.length) {
					alert(sprintf(LANG.message_norowselected, aH))
				} else {
					var aF = [];
					array_walk(aG, function (aI) {
						g_user.includes[D.typeid] = array_filter(g_user.includes[D.typeid], function (aJ) {
							return aJ != aI.id
						});
						g_user.excludes[D.typeid] = array_filter(g_user.excludes[D.typeid], function (aJ) {
							return aJ != aI.id
						});
						g_user[aH + "s"][D.typeid].push(aI.id);
						aI.__tr = null;
						aF.push(aI.id)
					});
					if (aF.length) {
						new Ajax("/account=exclude?type=" + D.typeid + "&id=" + aF.join(",") + "&" + aH);
						f()
					}
				}
			};
			var aA = ce("input"),
				ay = ce("input"),
				az = ce("input"),
				ax = ce("input"),
				aw = ce("input");
			aA.type = ay.type = az.type = ax.type = aw.type = "button";
			aA.value = LANG.button_selectall;
			ay.value = LANG.button_deselect;
			az.value = LANG.button_exclude;
			ax.value = LANG.button_include;
			aw.value = LANG.button_quickexclude;
			aA.onclick = Listview.cbSelect.bind(this, true);
			ay.onclick = Listview.cbSelect.bind(this, false);
			az.onclick = aB.bind(this, "exclude");
			ax.onclick = aB.bind(this, "include");
			aw.onclick = k.show.bind(null, "quickexclude", {
				data: {
					empty: T
				},
				onSubmit: ar
			});
			az.onmouseover = function (aF) {
				Tooltip.showAtCursor(aF, LANG.pr_tt_exclude)
			};
			ax.onmouseover = function (aF) {
				Tooltip.showAtCursor(aF, LANG.pr_tt_include)
			};
			az.onmousemove = ax.onmousemove = Tooltip.cursorUpdate;
			az.onmouseout = ax.onmouseout = Tooltip.hide;
			az.style.display = (this.include ? "none" : "");
			ax.style.display = (this.include ? "" : "none");
			ae(aD, aA);
			ae(aD, az);
			ae(aD, ax);
			ae(aD, ay);
			ae(aD, ct("| "));
			ae(aD, aw)
		};
		if (!D.models) {
			this.mode = 1
		}
	}
	function T(ax) {
		if (ax == null) {
			var aA = true;
			for (var az in g_excludes[D.typeid]) {
				aA = (aA && T(1 << az - 1))
			}
			return aA
		}
		for (var az in g_excludes[D.typeid]) {
			if (! (ax & 1 << az - 1)) {
				continue
			}
			for (var ay = 0, aw = aq.length; ay < aw; ++ay) {
				if (array_index(g_excludes[D.typeid][az], aq[ay].id)) {
					return false
				}
			}
		}
		return true
	}
	function ar(az) {
		var ay = (g_user.settings ? g_user.excludegroups | 0 : 1);
		for (var ax in az) {
			if (isNaN(ax)) {
				continue
			}
			var aw = az[ax] = parseInt(az[ax]);
			if (aw == 1 && (ay & ax)) {
				ay -= parseInt(ax)
			}
			if (aw == 2 && !(ay & ax)) {
				ay += parseInt(ax)
			}
		}
		g_user.excludegroups = ay;
		new Ajax("/account=exclude?groups=" + ay);
		f()
	}
	function f() {
		if (!J || !g) {
			return
		}
		a = null;
		b();
		N();
		X();
		aj(1);
		av();
		ac()
	}
	function r(az, ay) {
		if (!ay && az.completed) {
			return true
		}
		if (!g_excludes[D.typeid] && (!g_user.excludes || !g_user.excludes[D.typeid])) {
			return true
		}
		if (g_user.includes && g_user.includes[D.typeid] && array_index(g_user.includes[D.typeid], az.id)) {
			return true
		}
		if (g_user.excludes && g_user.excludes[D.typeid] && array_index(g_user.excludes[D.typeid], az.id)) {
			return false
		}
		var aw = (g_user.settings ? g_user.excludegroups | 0 : 1);
		for (var ax in g_excludes[D.typeid]) {
			if (!array_index(g_excludes[D.typeid][ax], az.id)) {
				continue
			}
			if (! (aw & 1 << ax - 1)) {
				continue
			}
			if (ax < 6 || ax > 10) {
				return false
			}
			if (ax == 6 && !((L.faction + 1) & 1)) {
				return false
			}
			if (ax == 7 && !((L.faction + 1) & 2)) {
				return false
			}
			if (ax == 8 && !L.skills[356]) {
				continue
			}
			if (ax == 9 && !L.skills[202]) {
				return false
			}
			if (ax == 10 && !L.skills[197]) {
				return false
			}
		}
		return true
	}
	function Q(aw) {
		var ax = aw[D.catgid];
		if (typeof ax == "object" && ax.length) {
			ax = ax[0]
		}
		return ax
	}
	function F(aw) {
		var ax = aw[D.subcat];
		if (typeof ax == "object" && ax.length) {
			ax = ax[0]
		}
		return (array_index(D.nosubcatg, Q(aw)) ? Q(aw) : ax)
	}
	function an(aw) {
		if (!aw.id || (U === null && D.reqcatg && !w)) {
			return
		}
		return ((n || w || r(aw, !l)) && ((U === null && (!array_index(D.nototal, Q(aw)) || w)) || U == Q(aw)) && (!w || (R === null || R == F(aw))) && (n || l == null || (l && aw.completed) || (!l && aw.completed == null)))
	}
	function h(az, aB) {
		switch (az) {
		case 0:
			var ax = U;
			U = aB;
			if (U !== null) {
				if (D.onDemand && D.partial && !ai[U] && !O) {
					g_ajaxIshRequest("/data=" + D.onDemand + "&catg=" + U + "&callback=$WowheadProfiler.loadOnDemand&" + (new Date().getTime()));
					x.style.display = "block";
					au.style.display = "none";
					O = this;
					U = null
				} else {
					if (!g) {
						ac();
						av()
					}
				}
			}
			al.resetFilters();
			al.clearSearch();
			al.quickSearchBox.onblur();
			break;
		case 1:
			l = aB;
			var aA = gE(al.cbBarTop, "input");
			for (var ay = 0, aw = aA.length; ay < aw; ++ay) {
				if (aA[ay].value == LANG.button_include) {
					aA[ay].style.display = (l === false ? "none" : "");
					break
				}
			}
			break;
		case 2:
			R = (aB == "current" ? U : aB);
			al.removeIndicators();
			S.removeIndicators();
			break;
		default:
			return
		}
		al.updateFilters(true);
		S.updateFilters(true);
		if (this && this.nodeName == "A") {
			g_setSelectedLink(this, o + az)
		}
		if (az == 0) {
			aj();
			X()
		}
		if (az == 2) {
			if (!R && this && this.nodeName == "TR") {
				this.className = ""
			}
			X();
			if (R) {
				if (a[U] == null) {
					b(U)
				}
				u.show((a[U].complete[R] ? 2 : 3));
				if (D.subname) {
					al.createIndicator(sprintf(LANG["lvnote_" + o + "ind"], U, R, D.subname(R)), Listview.headerFilter.bind(al, al.columns[al.columns.length - 2], ""));
					S.createIndicator(sprintf(LANG["lvnote_" + o + "ind"], U, R, D.subname(R)), Listview.headerFilter.bind(S, al.columns[al.columns.length - 2], ""));
					setTimeout(Listview.headerFilter.bind(al, al.columns[al.columns.length - 2], D.subname(R)), 1);
					setTimeout(Listview.headerFilter.bind(S, S.columns[S.columns.length - 2], D.subname(R)), 1)
				}
			}
		}
		return false
	}
}
Listview.templates.inventory = {
	searchable: 1,
	filtrable: 1,
	createNote: function (b) {
		var a = ce("span");
		a.style.color = "red";
		a.style.fontWeight = "bold";
		st(a, String.fromCharCode(160));
		ae(b, a)
	},
	columns: [{
		id: "name",
		name: LANG.name,
		type: "text",
		align: "left",
		span: 2,
		value: "name",
		compute: function (f, h, g) {
			var c = ce("td"),
				e = g_items.createIcon(f.id, 0, null, "javascript:;"),
				b = Icon.getLink(e);
			b.oncontextmenu = rf;
			b.onclick = (Browser.opera || OS.mac ?
			function (a) {
				a = $E(a);
				if (a.shiftKey || a.ctrlKey) {
					return false
				}
			} : null);
			b.onmouseup = $WowheadProfiler.onMouseUpSlot.bind(0, f.profileslot, b);
			b.href = "/item=" + f.id;
			e.className += " iconsmall-q" + (7 - parseInt(f.name.charAt(0)));
			$WowheadProfiler.updateMenu(f.profileslot, b);
			c.style.width = "1px";
			c.style.padding = "0";
			c.style.borderRight = "none";
			ae(c, e);
			ae(g, c);
			h.style.borderLeft = "none";
			b = ce("a");
			b.oncontextmenu = rf;
			b.onclick = (Browser.opera || OS.mac ?
			function (a) {
				a = $E(a);
				if (a.shiftKey || a.ctrlKey) {
					return false
				}
			} : null);
			b.onmouseup = $WowheadProfiler.onMouseUpSlot.bind(0, f.profileslot, b);
			b.className = "q" + (7 - parseInt(f.name.charAt(0)));
			b.style.fontFamily = "Verdana, sans-serif";
			b.href = "/item=" + f.id;
			$WowheadProfiler.updateMenu(f.profileslot, b);
			if (f.rel) {
				Icon.getLink(e).rel = f.rel;
				b.rel = f.rel
			}
			ae(b, ct(f.name.substring(1)));
			ae(h, b)
		},
		getVisibleText: function (a) {
			return a.name.substring(1)
		}
	},
	{
		id: "level",
		name: LANG.level,
		value: "level",
		compute: function (a, c, b) {
			if (a.errors.level) {
				c.style.color = "red";
				c.style.fontWeight = "bold"
			}
			return a.level
		}
	},
	{
		id: "slot",
		name: LANG.slot,
		type: "text",
		compute: function (a, b) {
			nw(b);
			return g_item_slots[a.slot]
		},
		getVisibleText: function (a) {
			return g_item_slots[a.slot]
		},
		sortFunc: function (e, c, f) {
			return strcmp(g_item_slots[e.slot], g_item_slots[c.slot])
		}
	},
	{
		id: "source",
		name: LANG.source,
		type: "text",
		compute: function (g, k) {
			k.className = "small";
			if (g.source != null) {
				if (g.source.length == 1) {
					nw(k);
					var j = (g.sourcemore ? g.sourcemore[0] : {});
					var f = 0;
					if (j.t) {
						f = j.t;
						var c = ce("a");
						if (j.q != null) {
							c.className = "q" + j.q
						} else {
							c.className = "q1"
						}
						if (j.t == 5) {
							c.className += " icontiny";
							c.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_start.gif)"
						}
						c.href = "/" + g_types[j.t] + "=" + j.ti;
						ae(c, ct(j.n));
						ae(k, c)
					} else {
						if (j.z) {
							if (g.source[0] == 5) {
								ae(k, ct(LANG.pr_vendorsin))
							}
							var c = ce("a");
							c.className = "q1";
							c.href = "/zone=" + j.z;
							ae(c, ct(g_zones[j.z]));
							ae(k, c)
						} else {
							ae(k, ct(Listview.funcBox.getUpperSource(g.source[0], j)))
						}
					}
					if (j.dd) {
						if (j.dd < 0) {
							ae(k, ct(sprintf(LANG.lvitem_dd, "", (j.dd < -1 ? LANG.lvitem_heroic : LANG.lvitem_normal))))
						} else {
							ae(k, ct(sprintf(LANG.lvitem_dd, (j.dd & 1 ? LANG.lvitem_raid10 : LANG.lvitem_raid25), (j.dd > 2 ? LANG.lvitem_heroic : LANG.lvitem_normal))))
						}
					}
				} else {
					var h = "";
					for (var e = 0, b = g.source.length; e < b; ++e) {
						if (e > 0) {
							h += LANG.comma
						}
						h += g_sources[g.source[e]]
					}
					return h
				}
			}
		},
		getVisibleText: function (b) {
			if (b.source != null) {
				if (b.source.length == 1) {
					var e = "";
					var c = (b.sourcemore ? b.sourcemore[0] : {});
					var a = 0;
					if (c.t) {
						a = c.t;
						e += " " + c.n
					} else {
						e += " " + Listview.funcBox.getUpperSource(b.source[0], c)
					}
					ls = Listview.funcBox.getLowerSource(b.source[0], c, a);
					if (ls != null) {
						if (ls.pretext) {
							e += " " + ls.pretext
						}
						e += " " + ls.text;
						if (ls.posttext) {
							e += " " + ls.posttext
						}
					}
					return e
				} else {
					return Listview.funcBox.arrayText(b.source, g_sources)
				}
			}
		},
		sortFunc: function (g, e, h) {
			var i = Listview.funcBox.assocArrCmp(g.source, e.source, g_sources);
			if (i != 0) {
				return i
			}
			var f = (g.sourcemore && g.source.length == 1 ? g.sourcemore[0].n : null),
				c = (e.sourcemore && e.source.length == 1 ? e.sourcemore[0].n : null);
			return strcmp(f, c)
		}
	}],
	getItemLink: function (a) {
		return "/item=" + a.id
	}
};
Listview.templates.completion = {
	sort: [1],
	nItemsPerPage: -1,
	searchable: 1,
	poundable: 0,
	createNote: function (b) {
		var a = ce("small");
		st(a, LANG.lvnote_clicksubcatg);
		ae(b, a)
	},
	columns: [{
		id: "name",
		name: LANG.name,
		type: "text",
		align: "left",
		value: "name",
		compute: function (f, g, e) {
			var c = ce("img");
			c.style.margin = "0 6px -3px 0";
			c.src = (f.complete == f.total ? g_staticUrl + "/images/icons/tick.png" : g_staticUrl + "/images/icons/delete.gif");
			c.onmouseover = function (b) {
				Tooltip.showAtCursor(b, LANG[(f.complete == f.total ? "pr_note_complete" : "pr_note_incomplete")], 0, 0, "q")
			};
			c.onmousemove = Tooltip.cursorUpdate;
			c.onmouseout = Tooltip.hide;
			c.style.border = "none";
			ae(g, c);
			if (f.current) {
				var a = ce("b");
				st(a, f.name);
				ae(g, a)
			} else {
				ae(g, ct(f.name))
			}
		},
		sortFunc: function (e, c, f) {
			return -strcmp(e.current, c.current) || strcmp(e.name, c.name)
		}
	},
	{
		id: "progress",
		name: LANG.progress,
		width: "250px",
		compute: function (b, c, a) {
			c.style.padding = 0;
			ae(c, g_createAchievementBar(b.complete, b.total));
			a.onclick = this.onClickRow.bind(a, 2, b.id)
		},
		sortFunc: function (e, c, f) {
			var h = Math.floor((e.complete / e.total) * 1000);
			var g = Math.floor((c.complete / c.total) * 1000);
			if (h == g) {
				return e.total - c.total
			}
			return h - g
		}
	}]
};
Listview.templates.gallery = {
	sort: [1],
	mode: 3,
	nItemsPerPage: -1,
	nItemsPerRow: 8,
	searchable: 1,
	poundable: 2,
	columns: [{
		value: "displayName"
	}],
	compute: function (h, e, g) {
		e.className = "screenshot-cell";
		e.vAlign = "top";
		Listview.funcBox.ssCreateCb(e, h);
		var l = ce("a");
		l.href = "javascript:;";
		l.onclick = this.template.modelShow.bind(this.template, h.npcId, h.displayId, false);
		l.style.position = "relative";
		var f = ce("img");
		f.src = (h.completed ? g_staticUrl + "/images/icons/" + (!h._included() ? "star" : "tick") + ".png" : g_staticUrl + "/images/icons/delete.gif");
		f.onmouseover = function (a) {
			Tooltip.showAtCursor(a, LANG[(h.completed ? (h._included() ? "pr_note_complete" : "pr_tt_excldone") : "pr_note_incomplete")], 0, 0, "q")
		};
		f.onmousemove = Tooltip.cursorUpdate;
		f.onmouseout = Tooltip.hide;
		f.style.border = "none";
		f.style.position = "absolute";
		f.style.right = "6px";
		f.style.bottom = "9px";
		ae(l, f);
		f = ce("img");
		f.src = g_staticUrl + "/modelviewer/thumbs/npc/" + h.displayId + ".png";
		f.height = f.width = 75;
		ae(l, f);
		ae(e, l);
		d = ce("div");
		d.className = "screenshot-cell-user";
		l = ce("a");
		l.href = "/spell=" + h.id;
		ae(l, ct(h.displayName));
		ae(d, l);
		ae(e, d);
		var m = h.item;
		if (m && m.source) {
			d = ce("div");
			d.style.position = "relative";
			d.style.height = "1em";
			var b = ce("div");
			b.className = "screenshot-caption";
			var n = ce("small");
			if (m.source.length == 1) {
				var c = (m.sourcemore ? m.sourcemore[0] : {});
				var k = 0;
				if (c.t) {
					k = c.t;
					var l = ce("a");
					if (c.q != null) {
						l.className = "q" + c.q
					} else {
						l.className = "q1"
					}
					if (c.t == 5) {
						l.className += " icontiny";
						l.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_start.gif)"
					}
					l.href = "/" + g_types[c.t] + "=" + c.ti;
					ae(l, ct(c.n));
					ae(n, l)
				} else {
					if (c.z) {
						if (m.source[0] == 5) {
							ae(n, ct(LANG.pr_vendorsin))
						}
						var l = ce("a");
						l.className = "q1";
						l.href = "/zone=" + c.z;
						ae(l, ct(g_zones[c.z]));
						ae(n, l)
					} else {
						ae(n, ct(Listview.funcBox.getUpperSource(m.source[0], c)))
					}
				}
				if (c.dd) {
					if (c.dd < 0) {
						ae(n, ct(sprintf(LANG.lvitem_dd, "", (c.dd < -1 ? LANG.lvitem_heroic : LANG.lvitem_normal))))
					} else {
						ae(n, ct(sprintf(LANG.lvitem_dd, (c.dd & 1 ? LANG.lvitem_raid10 : LANG.lvitem_raid25), (c.dd > 2 ? LANG.lvitem_heroic : LANG.lvitem_normal))))
					}
				}
			} else {
				for (var g = 0, j = m.source.length; g < j; ++g) {
					if (g > 0) {
						ae(n, ct(LANG.comma))
					}
					ae(n, ct(g_sources[m.source[g]]))
				}
			}
			ae(n, ce("br"));
			ae(b, n);
			ae(d, b);
			ae(e, d)
		}
		aE(e, "click", this.template.modelShow.bind(this.template, h.npcId, h.displayId, true))
	},
	getVisibleText: function (b) {
		var h = b.displayName;
		var f = b.item;
		if (f && f.source != null) {
			if (f.source.length == 1) {
				var g = (f.sourcemore ? f.sourcemore[0] : {});
				var e = 0;
				if (g.t) {
					e = g.t;
					h += " " + g.n
				} else {
					if (g.z) {
						h += " " + g_zones[g.z]
					}
				}
				h += " " + Listview.funcBox.getUpperSource(f.source[0], g);
				if (g.dd) {
					h += " " + (g.dd < -1 || g.dd > 2 ? LANG.pr_print_heroic : LANG.pr_print_normal)
				}
			} else {
				for (var c = 0, a = f.source.length; c < a; ++c) {
					h += " " + g_sources[f.source[c]]
				}
			}
		}
		return h
	},
	modelShow: function (f, b, g, h) {
		if (g) {
			h = $E(h);
			if (h.shiftKey || h.ctrlKey) {
				return
			}
			var a = 0,
				c = h._target;
			while (c && a < 3) {
				if (c.nodeName == "A") {
					return
				}
				if (c.nodeName == "IMG") {
					break
				}
				c = c.parentNode
			}
		}
		ModelViewer.show({
			type: 1,
			typeId: f,
			displayId: b,
			noPound: 1
		})
	}
};
Listview.templates.itempicker = {
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
	onBeforeCreate: function () {},
	onSearchSubmit: function (a) {
		if (this.nRowsVisible != 2 || !a.id) {
			return
		}
		$WowheadProfiler.equipItem(a.id)
	},
	columns: [{
		id: "item",
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
			b.className = "q" + g.quality;
			b.style.fontFamily = "Verdana, sans-serif";
			b.href = "/item=" + g.id;
			ae(b, ct(g.name));
			nw(j);
			ae(j, b);
			$(h).click(function (a) {
				if (a.which != 2 || a.target != b) {
					a.preventDefault();
					($WowheadProfiler.equipItem.bind(this, g.id, g.slot))()
				}
			})
		},
		sortFunc: function (e, c, f) {
			if (e.none) {
				return -1
			}
			if (c.none) {
				return 1
			}
			return (-strcmp(e.gearscore, c.gearscore) || -strcmp(e.quality, c.quality) || strcmp(e.name, c.name) || -strcmp(e.level, c.level))
		}
	},
	{
		id: "level",
		name: LANG.level,
		value: "level"
	},
	{
		id: "type",
		name: LANG.type,
		type: "text",
		compute: function (e, g, f) {
			if (e.none) {
				ee(f);
				$(f).click($WowheadProfiler.equipItem.bind(this, 0, e.slot));
				g.colSpan = 4;
				g.style.fontWeight = "bold";
				g.style.textAlign = "center";
				return LANG.dash + LANG.pr_noneitem + LANG.dash
			}
			g.className = "small q1";
			nw(g);
			var b = ce("a");
			var c = Listview.funcBox.getItemType(e.classs, e.subclass, e.subsubclass);
			b.href = c.url;
			ae(b, ct(c.text));
			ae(g, b)
		},
		getVisibleText: function (a) {
			return Listview.funcBox.getItemType(a.classs, a.subclass, a.subsubclass).text
		}
	}]
};
Listview.templates.subitempicker = {
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
	onBeforeCreate: function () {},
	onSearchSubmit: function (a) {
		if (this.nRowsVisible != 2 || !a.id) {
			return
		}
		$WowheadProfiler.equipSubitem(a.id)
	},
	columns: [{
		id: "subitem",
		type: "text",
		align: "left",
		value: "name",
		span: 2,
		compute: function (k, c, f) {
			if (k.none) {
				return
			}
			var b = "/item=" + k.item,
				l = g_items[k.item];
			var e = ce("td");
			e.style.width = "1px";
			e.style.padding = "0";
			e.style.borderRight = "none";
			var g = Icon.create(l.icon, 0, null, b),
				h = Icon.getLink(g);
			ae(e, g);
			ae(f, e);
			c.style.borderLeft = "none";
			h.onclick = rf;
			h.rel = "rand=" + k.id;
			var j = ce("a");
			if (k.quality != -1) {
				j.className = "q" + l.quality
			}
			j.style.fontFamily = "Verdana, sans-serif";
			j.href = b;
			j.rel = "rand=" + k.id;
			ae(j, ct(l["name_" + Locale.getName()] + " " + k.name));
			nw(c);
			ae(c, j);
			$(f).click(function (a) {
				if (a.which != 2 || a.target != j) {
					a.preventDefault();
					($WowheadProfiler.equipSubitem.bind(this, k.id))()
				}
			})
		}
	},
	{
		id: "enchantment",
		type: "text",
		align: "left",
		value: "enchantment",
		compute: function (a, e, b) {
			if (a.none) {
				return
			}
			var c = ce("div");
			c.className = "small crop";
			e.title = a.enchantment;
			ae(c, ct(a.enchantment));
			ae(e, c)
		}
	}]
};
Listview.templates.gempicker = {
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
	onBeforeCreate: function () {},
	onSearchSubmit: function (a) {
		if (this.nRowsVisible != 2 || !a.id) {
			return
		}
		$WowheadProfiler.socketItem(a.id)
	},
	columns: [{
		id: "gem",
		type: "text",
		align: "left",
		value: "name",
		span: 2,
		compute: function (j, h, g) {
			if (j.none) {
				return
			}
			var c = ce("td");
			c.style.width = "1px";
			c.style.padding = "0";
			c.style.borderRight = "none";
			var e = Icon.create(j.icon, 0, null, "/item=" + j.id),
				f = Icon.getLink(e);
			ae(c, e);
			ae(g, c);
			h.style.borderLeft = "none";
			f.onclick = rf;
			var b = ce("a");
			b.className = "q" + j.quality;
			b.style.fontFamily = "Verdana, sans-serif";
			b.href = "/item=" + j.id;
			ae(b, ct(j.name));
			nw(h);
			ae(h, b);
			$(g).click(function (a) {
				if (a.which != 2 || a.target != b) {
					a.preventDefault();
					($WowheadProfiler.socketItem.bind(this, j.id, j.socket, j.slot))()
				}
			})
		},
		sortFunc: function (e, c, f) {
			if (e.none) {
				return -1
			}
			if (c.none) {
				return 1
			}
			return (-strcmp(e.gearscore, c.gearscore) || strcmp(e.quality, c.quality) || strcmp(e.colors, c.colors) || strcmp(e.icon, c.icon) || strcmp(e.name, c.name))
		}
	},
	{
		id: "enchantment",
		type: "text",
		align: "left",
		value: "enchantment",
		compute: function (e, c, a) {
			if (e.none) {
				return
			}
			var b = ce("div");
			b.className = "small crop";
			c.title = e.enchantment;
			ae(b, ct(e.enchantment));
			ae(c, b)
		}
	},
	{
		id: "colors",
		compute: function (c, b, a) {
			if (c.none) {
				ee(a);
				$(a).click($WowheadProfiler.socketItem.bind(this, 0, c.socket, c.slot));
				b.colSpan = 4;
				b.style.fontWeight = "bold";
				b.style.textAlign = "center";
				return LANG.dash + LANG.pr_nonegem + LANG.dash
			}
			b.className = "small gem" + c.colors;
			nw(b);
			return g_gem_colors[c.colors]
		},
		getVisibleText: function (a) {
			if (a.none) {
				return
			}
			return g_gem_colors[a.colors]
		}
	}]
};
Listview.templates.enchantpicker = {
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
	onBeforeCreate: function () {},
	onSearchSubmit: function (a, b) {
		if (this.nRowsVisible != 2 || !a.id) {
			return
		}
		$WowheadProfiler.enchantItem(a.id)
	},
	columns: [{
		id: "enchant",
		type: "text",
		align: "left",
		value: "name",
		span: 2,
		compute: function (j, k, h) {
			if (j.none) {
				return
			}
			var c = (j.source > 0 ? "/spell=" : "/item=") + Math.abs(j.source);
			var e = ce("td");
			e.style.width = "1px";
			e.style.padding = "0";
			e.style.borderRight = "none";
			var f = Icon.create(j.icon, 0, null, c),
				g = Icon.getLink(f);
			ae(e, f);
			ae(h, e);
			k.style.borderLeft = "none";
			g.onclick = rf;
			var b = ce("a");
			if (j.quality != -1) {
				b.className = "q" + j.quality
			}
			b.style.fontFamily = "Verdana, sans-serif";
			b.href = c;
			ae(b, ct(j.name));
			nw(k);
			ae(k, b);
			$(h).click(function (a) {
				if (a.which != 2 || a.target != b) {
					a.preventDefault();
					($WowheadProfiler.enchantItem.bind(this, j.id))()
				}
			})
		},
		sortFunc: function (e, c, f) {
			if (e.none) {
				return -1
			}
			if (c.none) {
				return 1
			}
			return (-strcmp(e.gearscore, c.gearscore) || strcmp(e.name, c.name))
		}
	},
	{
		id: "enchantment",
		type: "text",
		align: "left",
		value: "enchantment",
		compute: function (b, e, a) {
			if (b.none) {
				return
			}
			var c = ce("div");
			c.className = "small crop";
			e.title = b.enchantment;
			ae(c, ct(b.enchantment));
			ae(e, c)
		},
		sortFunc: function (e, c, f) {
			if (e.none) {
				return -1
			}
			if (c.none) {
				return 1
			}
			return (-strcmp(e.score, c.score) || strcmp(e.name, c.name))
		}
	},
	{
		id: "skill",
		type: "text",
		compute: function (b, c, a) {
			if (b.none) {
				ee(a);
				$(a).click($WowheadProfiler.enchantItem.bind(this, 0));
				c.colSpan = 4;
				c.style.fontWeight = "bold";
				c.style.textAlign = "center";
				return LANG.dash + LANG.pr_noneenchant + LANG.dash
			}
			c.className = "small q0";
			nw(c);
			if (b.skill > 0) {
				return g_spell_skills[b.skill]
			} else {
				return LANG.types[3][0]
			}
		},
		getVisibleText: function (a) {
			if (a.none) {
				return
			}
			if (a.skill > 0) {
				return g_spell_skills[a.skill]
			} else {
				return LANG.types[3][0]
			}
		}
	}]
};
Listview.templates.petpicker = {
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
	onBeforeCreate: function () {},
	onSearchSubmit: function (a, b) {
		if (this.nRowsVisible != 2 || !a.id) {
			return
		}
		$WowheadProfiler.selectPet(a.id)
	},
	columns: [{
		id: "pet",
		type: "text",
		align: "left",
		value: "name",
		span: 2,
		compute: function (b, k, j) {
			if (b.none) {
				return
			}
			var e = "/npc=" + b.id;
			var f = ce("td");
			f.style.width = "1px";
			f.style.padding = "0";
			f.style.borderRight = "none";
			var g = Icon.create(b.icon, 0, null, e),
				h = Icon.getLink(g);
			ae(f, g);
			ae(j, f);
			k.style.borderLeft = "none";
			h.onclick = rf;
			var c = ce("a");
			c.style.fontFamily = "Verdana, sans-serif";
			c.href = e;
			ae(c, ct(b.name));
			nw(k);
			ae(k, c);
			$(j).click(function (a) {
				if (a.which != 2 || a.target != c) {
					a.preventDefault();
					($WowheadProfiler.selectPet.bind(this, b.id))()
				}
			})
		},
		sortFunc: function (e, c, f) {
			if (e.none) {
				return -1
			}
			if (c.none) {
				return 1
			}
			if (e.family != c.family) {
				return strcmp(g_pet_families[e.family], g_pet_families[c.family])
			}
			if (e.skin != c.skin) {
				return strcmp(e.skin, c.skin)
			}
			return strcmp(e.name, c.name)
		}
	},
	{
		id: "skin",
		type: "text",
		value: "skin",
		compute: function (a, e, b) {
			if (a.none) {
				return
			}
			var c = ce("div");
			c.className = "small crop";
			e.title = a.skin;
			ae(c, ct(a.skin));
			ae(e, c)
		}
	},
	{
		id: "level",
		type: "range",
		getMinValue: function (a) {
			return a.minlevel
		},
		getMaxValue: function (a) {
			return a.maxlevel
		},
		compute: function (a, c, b) {
			if (a.none) {
				ee(b);
				$(b).click($WowheadProfiler.selectPet.bind(this, 0));
				c.colSpan = 4;
				c.style.fontWeight = "bold";
				c.style.textAlign = "center";
				return LANG.dash + LANG.pr_nonepet + LANG.dash
			}
			if (a.minlevel > 0 && a.maxlevel > 0) {
				if (a.minlevel != a.maxlevel) {
					return a.minlevel + LANG.hyphen + a.maxlevel
				} else {
					return a.minlevel
				}
			} else {
				return -1
			}
		}
	}]
};
Dialog.templates.profileredit = {
	title: LANG.pr_dialog_chardetails,
	width: 400,
	buttons: ["okay", "cancel"],
	fields: [{
		id: "savewarning",
		type: "caption",
		compute: function (c, b, a, e) {
			if (this.data.region && this.data.region[0] && this.data.battlegroup && this.data.battlegroup[0] && this.data.realm && this.data.realm[0] && !this.data.user) {
				e.style.whiteSpace = "normal";
				e.style.lineHeight = "normal";
				e.style.paddingBottom = "10px";
				st(e, LANG.dialog_losechanges)
			}
		}
	},
	{
		id: "name",
		type: "text",
		label: LANG.pr_dialog_name,
		size: 30,
		required: 1,
		validate: function (b, a) {
			if (b.match(/^[a-zA-Z][a-zA-Z0-9 ]{0,29}$/)) {
				return true
			} else {
				alert(LANG.message_saveasinvalidname);
				return false
			}
		}
	},
	{
		id: "level",
		type: "select",
		label: LANG.pr_dialog_level,
		options: g_createRange(10, 80),
		value: 80,
		sort: -1,
		compute: function (c, b, a) {
			c.onchange = this.updateIcon
		}
	},
	{
		id: "race",
		type: "select",
		label: LANG.pr_dialog_race,
		options: g_chr_races,
		sort: 1,
		compute: function (c, b, a) {
			c.onchange = this.updateIcon
		}
	},
	{
		id: "classs",
		type: "select",
		label: LANG.pr_dialog_class,
		options: g_chr_classes,
		sort: 1,
		compute: function (c, b, a) {
			c.onchange = this.updateIcon
		},
		validate: function (b, a) {
			if (b != 6 || a.level >= 55) {
				return true
			} else {
				alert(LANG.message_invalidlevel);
				return false
			}
		}
	},
	{
		id: "gender",
		type: "radio",
		label: LANG.pr_dialog_gender,
		options: {
			0: LANG.male,
			1: LANG.female
		},
		compute: function (c, b, a) {
			c.onclick = this.updateIcon
		}
	},
	{
		id: "icon",
		type: "text",
		label: LANG.pr_dialog_icon,
		caption: LANG.pr_dialog_iconeg,
		size: 30,
		required: 1,
		compute: function (f, e, c, i) {
			var h = ce("div");
			h.style.position = "relative";
			var g = ce("div");
			g.style.position = "absolute";
			g.style.left = "151px";
			g.style.top = "-71px";
			var b = this.btnPreview = ce("input");
			b.type = "button";
			b.value = LANG.preview;
			b.onclick = function () {
				f.value = trim(f.value);
				ee(g);
				ae(g, Icon.create(f.value, 2))
			};
			var a = this;
			f.onchange = function () {
				a.data.defaulticon = false
			};
			ae(h, f);
			ae(h, b);
			ae(h, g);
			ae(i, h)
		}
	},
	{
		id: "description",
		type: "textarea",
		label: LANG.pr_dialog_description,
		width: "98%",
		size: [5, 30]
	},
	{
		id: "published",
		type: "radio",
		label: LANG.pr_dialog_public,
		options: {
			0: LANG.privateprofile,
			1: LANG.publicprofile
		}
	}],
	onInit: function (a) {
		this.updateIcon = this.template.updateIcon.bind(this, a)
	},
	onShow: function () {
		this.updateIcon()
	},
	updateIcon: function (f) {
		if (this.data.defaulticon) {
			var e = this.getSelectedValue("race"),
				i = this.getSelectedValue("classs"),
				b = this.getCheckedValue("gender"),
				a = this.getSelectedValue("level");
			var h = {
				10: {
					6: 1,
					3: 1,
					8: 1,
					2: 1,
					5: 1,
					4: 1,
					9: 1
				},
				11: {
					6: 1,
					3: 1,
					8: 1,
					2: 1,
					5: 1,
					7: 1,
					1: 1
				},
				3: {
					6: 1,
					3: 1,
					2: 1,
					5: 1,
					4: 1,
					1: 1
				},
				7: {
					6: 1,
					8: 1,
					4: 1,
					9: 1,
					1: 1
				},
				1: {
					6: 1,
					8: 1,
					2: 1,
					5: 1,
					4: 1,
					9: 1,
					1: 1
				},
				4: {
					6: 1,
					11: 1,
					3: 1,
					5: 1,
					4: 1,
					1: 1
				},
				2: {
					6: 1,
					3: 1,
					4: 1,
					7: 1,
					9: 1,
					1: 1
				},
				6: {
					6: 1,
					11: 1,
					3: 1,
					7: 1,
					1: 1
				},
				8: {
					6: 1,
					3: 1,
					8: 1,
					5: 1,
					4: 1,
					7: 1,
					1: 1
				},
				5: {
					6: 1,
					8: 1,
					5: 1,
					4: 1,
					9: 1,
					1: 1
				}
			};
			if (!h[e][i] || (i == 6 && a < 55)) {
				this.setValue("icon", "inv_misc_questionmark")
			} else {
				this.setValue("icon", "chr_" + g_file_races[e] + "_" + g_file_genders[b] + "_" + g_file_classes[i] + "0" + Math.max(1, (Math.floor(a / 10) - 4)))
			}
		}
		this.btnPreview.onclick()
	}
};
Dialog.templates.quickexclude = {
	title: LANG.dialog_manageexclusions,
	width: 480,
	buttons: ["okay", "cancel"],
	fields: [{
		id: "excludeexplain",
		type: "caption",
		compute: function (e, c, a, g, b) {
			g.style.whiteSpace = "normal";
			g.style.lineHeight = "1.4em";
			g.innerHTML = LANG.dialog_exclude;
			var f = ce("div");
			f.className = "pad";
			ae(g, f)
		}
	},
	{
		id: "miniheader",
		type: "caption",
		compute: function (h, g, e, i, f) {
			ae(f, ce("td"));
			i.setAttribute("colSpan", null);
			var c = ce("label"),
				a = ce("b");
			st(a, LANG.button_exclude);
			ae(c, a);
			ae(i, c);
			c = ce("label");
			a = ce("b");
			st(a, LANG.button_include);
			ae(c, a);
			ae(i, c)
		}
	},
	{
		id: "noquickexcl",
		type: "caption",
		compute: function (e, c, a, g, b) {
			g.style.whiteSpace = "normal";
			g.style.lineHeight = "1.4em";
			g.innerHTML = LANG.pr_tt_noqexcl;
			var f = ce("div");
			f.className = "pad";
			ae(g, f)
		}
	},
	{
		id: 1,
		label: LANG.dialog_notavail
	},
	{
		id: 2,
		label: LANG.dialog_tcg
	},
	{
		id: 4,
		label: LANG.dialog_collector
	},
	{
		id: 8,
		label: LANG.dialog_promo
	},
	{
		id: 16,
		label: LANG.dialog_nonus
	},
	{
		id: 96,
		label: LANG.dialog_faction
	},
	{
		id: 896,
		label: LANG.dialog_profession
	},
	{
		id: 1024,
		label: LANG.dialog_noexalted
	},
	{
		id: "resetall",
		type: "caption",
		compute: function (g, f, c, i, e) {
			i.style.textAlign = "center";
			var h = ce("div");
			h.className = "pad";
			ae(i, h);
			var b = ce("a");
			b.href = "javascript:;";
			b.onclick = $WowheadProfiler.resetExclusions;
			st(b, LANG.dialog_resetexclusions);
			ae(i, b)
		}
	}],
	onInit: function (f, e) {
		var g = [],
			b = [];
		for (var c = 0, a = this.template.fields.length; c < a; ++c) {
			var h = this.template.fields[c];
			if (isNaN(h.id)) {
				g = g.concat(b.sort(function (j, i) {
					return strcmp(j.label, i.label)
				}));
				b = [];
				g.push(h)
			} else {
				cO(h, {
					type: "radio",
					noInputBr: 1,
					options: {
						2: "",
						1: ""
					},
					optorder: [2, 1]
				});
				b.push(h)
			}
		}
		g = g.concat(b.sort(function (j, i) {
			return strcmp(j.label, i.label)
		}));
		this.template.fields = g
	},
	onBeforeShow: function (f) {
		gE(f, "table")[0].className = "profiler-exclusion";
		var c = 0,
			b = 0;
		for (var e = 0, a = this.template.fields.length; e < a; ++e) {
			var g = this.template.fields[e];
			if (!isNaN(g.id)) {
				this.data[g.id] = (g_user.excludegroups & g.id ? 2 : 1);
				g.__tr.firstChild.style.textAlign = "left";
				g.__tr.style.display = (this.data.empty(g.id) ? "none" : "");
				if (!this.data.empty(g.id)) {
					if (c++%2) {
						g.__tr.style.backgroundColor = "#202020"
					}
					b++
				}
			} else {
				c = 0
			}
		}
		this.template.fields[1].__tr.style.display = (b ? "" : "none");
		this.template.fields[2].__tr.style.display = (b ? "none" : "")
	}
};
var profileSummary;