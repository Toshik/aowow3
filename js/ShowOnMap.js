var ShowOnMap = function (b) {
	var a = this;
	a.data = b;
	a._legend = null;
	a._legendLabel = null;
	a._legendContents = null;
	a._legendHorde = null;
	a._legendAlliance = null;
	a._menu = [];
	a.construct()
};
ShowOnMap.prototype.onExpand = function () {
	this.expanded = true;
	location.replace(this.pound + ".map")
};
ShowOnMap.prototype.onCollapse = function () {
	this.expanded = false;
	if (location.hash.indexOf("#show") == 0 && location.hash.indexOf(".map") > 0) {
		this.pound = location.hash.substr(0, location.hash.indexOf(".map"));
		location.replace(this.pound)
	}
};
ShowOnMap.prototype.construct = function () {
	if (!this.data) {
		return
	}
	var Q = $("#lenrlkn4");
	var a = function (i, d) {
		return strcmp(i[1], d[1])
	};
	var A = [];
	var N = [];
	for (var M in this.data) {
		if (this.data[M].length === undefined) {
			var e = [];
			var f = [];
			var C = {};
			var r = this.data[M];
			for (var H in r) {
				var g = g_urlize(H);
				if (r[H][0].name_enus !== undefined) {
					g = g_urlize(r[H][0].name_enus)
				}
				var F = [];
				var j = {};
				var w = [g];
				z.list.key = M;
				var c = ShowOnMap.combinePins(r[H]);
				var E = c[0];
				var u = c[1];
				for (var J = 0; J < E.length; ++J) {
					var z = E[J];
					var k = ShowOnMap.buildTooltip(z.list);
					var b = k[2];
					var L = null;
					if (b == "javascript:;") {
						L = k[3]
					}
					if (z.list.length == 1) {
						b = "/" + g_types[z.list[0].type] + "=" + z.list[0].id
					}
					if (M == "rare" || M == "herb" || M == "vein") {
						k[1] = e.length + 1
					}
					F.push([z.coord[0], z.coord[1], {
						url: b,
						label: k[0],
						menu: L,
						type: k[1]
					}])
				}
				if (F.length > 0) {
					var b = "/" + g_types[r[H][0].type] + "=" + r[H][0].id;
					j[e.length + 1] = [H, b];
					w.push(H + sprintf(LANG.qty, u));
					w.push(this.showStuff.bind(this, F, [M, g], j));
					e.push(w);
					f = f.concat(F);
					C[e.length] = [H, b]
				}
			}
			if (e.length > 0) {
				e.sort(a);
				var w = [M, LANG.som[M], this.showStuff.bind(this, f, [M], C), e];
				this._menu.push(w)
			}
		} else {
			if (this.data[M].length == 0) {
				continue
			}
			var w = [M];
			var F = [];
			var I = [];
			var h = [];
			var j = {};
			var l = {};
			var D = {};
			var c = ShowOnMap.combinePins(this.data[M]);
			var E = c[0];
			var u = c[1];
			for (var J = 0; J < E.length; ++J) {
				var z = E[J];
				var P = M;
				z.list.key = M;
				var k = ShowOnMap.buildTooltip(z.list);
				var b = k[2];
				var L = null;
				if (b == "javascript:;") {
					L = k[3]
				}
				if (z.list.length == 1) {
					b = "/" + g_types[z.list[0].type] + "=" + z.list[0].id
				}
				var q = [z.coord[0], z.coord[1], {
					url: b,
					label: k[0],
					menu: L,
					type: k[1]
				}];
				if (P != "rare" && P != "spirithealer" && P != "book" && P != "hordequests" && P != "alliancequests") {
					if (k[1] == 2 || k[1] == 0) {
						if (k[1] == 2) {
							l[2] = [LANG.som_legend_horde, null]
						} else {
							l[0] = [LANG.som_legend_neutral, null]
						}
						I.push(q)
					}
					if (k[1] == 3 || k[1] == 0) {
						if (k[1] == 3) {
							D[3] = [LANG.som_legend_alliance, null]
						} else {
							D[0] = [LANG.som_legend_neutral, null]
						}
						h.push(q)
					}
				} else {
					if (P == "hordequests") {
						P = "quest";
						if (k[1] == 2) {
							l[2] = [LANG.som_legend_horde, null]
						} else {
							l[0] = [LANG.som_legend_neutral, null]
						}
						I.push(q)
					} else {
						if (P == "alliancequests") {
							P = "quest";
							if (k[1] == 3) {
								D[3] = [LANG.som_legend_alliance, null]
							} else {
								D[0] = [LANG.som_legend_neutral, null]
							}
							h.push(q)
						} else {
							F.push(q)
						}
					}
				}
			}
			if (P == "rare") {
				u = this.data[P].length
			}
			if (F.length > 0) {
				var w = [P, LANG.som[P] + sprintf(LANG.qty, u), this.showStuff.bind(this, F, [P], j)];
				this._menu.push(w)
			}
			if (I.length > 0) {
				var w = [P, LANG.som[P] + sprintf(LANG.qty, I.length), this.showStuff.bind(this, I, ["horde", P], l), null];
				if (P == "quest") {
					w.push({
						tinyIcon: "quest_start"
					})
				}
				N.push(w)
			}
			if (h.length > 0) {
				var w = [P, LANG.som[P] + sprintf(LANG.qty, h.length), this.showStuff.bind(this, h, ["alliance", P], D), null];
				if (P == "quest") {
					w.push({
						tinyIcon: "quest_start"
					})
				}
				A.push(w)
			}
		}
	}
	A.sort(a);
	N.sort(a);
	this._menu.sort(a);
	if (N.length > 0) {
		this._menu.unshift(["horde", LANG.som.horde, "", N, {
			tinyIcon: "side_horde"
		}])
	}
	if (A.length > 0) {
		this._menu.unshift(["alliance", LANG.som.alliance, "", A, {
			tinyIcon: "side_alliance"
		}])
	}
	var o = [-1, LANG.som_nothing, this.showStuff.bind(this, [], [-1], {})];
	o.checked = true;
	this._menu.push(o);
	var v = RedButton.create(LANG.showonmap, true);
	v.className += " mapper-som-button";
	Menu.add(v, this._menu, {
		showAtCursor: true
	});
	Q.append(v);
	var B;
	if (!this._legend) {
		this._legend = $("<div/>", {
			"class": "mapper-legend",
			css: {
				display: "none"
			}
		});
		var K = $("<div/>", {
			"class": "mapper-legend-container"
		});
		this._legendLabel = $("<b/>", {
			text: LANG.som_legend
		});
		K.append(this._legendLabel);
		this._legendContents = $("<div/>", {
			css: {
				"float": "right"
			}
		});
		K.append(this._legendContents);
		var B = $("<div/>", {
			css: {
				clear: "right"
			}
		});
		K.append(B);
		this._legend.append(K)
	}
	Q.append(this._legend);
	B = $("<div/>", {
		css: {
			clear: "left"
		}
	});
	Q.append(B);
	if (location.hash && location.hash.indexOf("#show:") != -1) {
		var t = location.hash.split(".");
		if (t.length == 2 && t[1] == "map" && isset("myMapper")) {
			this.expanded = true;
			myMapper.toggleZoom()
		}
		var G = t[0].split(":");
		if (G.length < 2) {
			return
		}
		var O = this._menu;
		for (var J = 1; J < G.length; ++J) {
			var R = G.length - 1;
			for (var H = 0; H < O.length; ++H) {
				if (O[H][0] == G[J]) {
					if (O[H][3] && J < R) {
						O = O[H][3]
					} else {
						O = O[H]
					}
					break
				}
			}
		}
		if (O && O[2] && jQuery.isFunction(O[2])) {
			O[2]()
		}
	}
};
ShowOnMap.prototype.setLegend = function (f) {
	this._legendContents.empty();
	var g = $("<div/>");
	var d = 0;
	for (var c in f) {
		var e = $("<span/>", {
			"class": ("mapper-pin mapper-pin-" + c + " mapper-legend-pin")
		});
		if (f[c][1]) {
			var b = $("<a/>", {
				href: f[c][1],
				text: f[c][0]
			});
			e.append(b)
		} else {
			e.text(f[c][0])
		}
		g.append(e);
		if ((++d) % 4 == 0) {
			g.append($("<br/>"))
		}
	}
	this._legendContents.append(g)
};
ShowOnMap.prototype.showStuff = function (a, c, b) {
	myMapper.update({
		zone: g_pageInfo.id,
		coords: {
			0: a
		}
	});
	this.setLegend(b);
	this.checkMenu(c);
	if (c.length == 1 && c[0] == -1) {
		this.pound = "";
		location.replace("#.");
		return
	}
	this.pound = "#show:" + c.join(":");
	location.replace(this.pound + (this.expanded ? ".map" : ""))
};
ShowOnMap.prototype.clearChecks = function (b) {
	for (var a = 0; a < b.length; ++a) {
		b[a].checked = false;
		if (b[a][3] && b[a][3].length > 0) {
			this.clearChecks(b[a][3])
		}
	}
	this._legend.hide()
};
ShowOnMap.prototype.checkMenu = function (k) {
	this.clearChecks(this._menu);
	if (k[0] != -1) {
		this._legend.show()
	} else {
		this._legend.hide()
	}
	var a = this._menu;
	var g = [];
	for (var c = 0; c < k.length; ++c) {
		for (var b = 0; b < a.length; ++b) {
			if (a[b][0] == k[c]) {
				a[b].checked = true;
				g.push([a[b][0], a[b][1]]);
				a = a[b][3];
				break
			}
		}
	}
	var d = g.length - 1;
	var f = "";
	var e = {
		rare: true,
		herb: true,
		vein: true
	};
	for (var c = 0; c < g.length; ++c) {
		if (c > 0 && e[g[0][0]]) {
			var h = $("span", this._legendContents);
			h.removeClass("mapper-legend-pin");
			h.append($("<b/>", {
				text: " " + g[c][1].substr(g[c][1].lastIndexOf("("))
			}))
		} else {
			if (c == d) {
				f += "<span>"
			} else {
				f += '<span class="breadcrumb-arrow">'
			}
			f += g[c][1] + "</span>"
		}
	}
	this._legendLabel.html(f)
};
ShowOnMap.combinePins = function (f) {
	var g = {};
	var j = null,
		r = null;
	var o, n;
	var e = 0;
	var d = function (t, i) {
		var c = Math.floor(t[0]);
		var p = Math.floor(t[1]);
		if (!i) {
			if (c % 2 == 1) {
				c += 1
			}
			if (p % 2 == 1) {
				p += 1
			}
		}
		if (g[c] === undefined) {
			g[c] = {}
		}
		if (g[c][p] === undefined) {
			g[c][p] = []
		}
		return [c, p]
	};
	for (var b = 0; b < f.length; ++b) {
		var a = f[b];
		if (a.point == "start" || a.point == "end") {
			j = d(a.coord);
			o = j[0];
			n = j[1];
			if (g[o][n].length > 3) {
				var q = g[o][n];
				g[o][n] = [];
				for (var h = 0; h < q.length; ++h) {
					r = d(q[h].coord, true);
					g[r[0]][r[1]].push(q[h])
				}
			}
			g[o][n].push(a);
			e++
		} else {
			for (var l = 0; l < a.coords.length; ++l) {
				j = d(a.coords[l]);
				o = j[0];
				n = j[1];
				var m = dO(a);
				m.coord = a.coords[l];
				if (g[o][n].length > 3) {
					var q = g[o][n];
					g[o][n] = [];
					for (var h = 0; h < q.length; ++h) {
						r = d(q[h].coord, true);
						g[r[0]][r[1]].push(q[h])
					}
				}
				g[o][n].push(m);
				e++
			}
		}
	}
	var k = [];
	for (o in g) {
		for (n in g[o]) {
			k.push({
				coord: [g[o][n][0].coord[0], g[o][n][0].coord[1]],
				list: g[o][n]
			})
		}
	}
	return [k, e]
};
ShowOnMap.buildTooltip = function (t) {
	var m = "";
	var d = "";
	var b = [];
	var j = -1;
	var f = {};
	var e = 0;
	var a = {};
	var u = 1;
	for (var l = 0; l < t.length; ++l) {
		var g = t[l];
		d = "/" + g_types[g.type] + "=" + g.id;
		var w = d + g.item;
		var h = d + g.point;
		if (!f[w]) {
			f[w] = {
				url: d,
				obj: g,
				coords: [g.coord],
				all: [g]
			};
			e++
		} else {
			if (!a[h]) {
				f[w].all.push(g)
			}
			f[w].coords.push(g.coord)
		}
		a[h] = 1
	}
	var l = 0;
	for (var w in f) {
		var d = f[w].url;
		var c = f[w].all;
		var g = f[w].obj;
		var r = f[w].coords;
		if (l > 0) {
			m += "<br />"
		}
		b.push([l++, g.name, d]);
		u = g.type;
		if (!g.point) {
			if ((g.reacthorde == 1 && g.reactalliance < 1) || g.side == 2) {
				if (j == 2 || j == -1) {
					j = 2
				} else {
					j = 0
				}
			} else {
				if ((g.reactalliance == 1 && g.reacthorde < 1) || g.side == 1) {
					if (j == 3 || j == -1) {
						j = 3
					} else {
						j = 0
					}
				} else {
					j = 0
				}
			}
		}
		m += '<b class="q' + (j == 2 ? " icon-horde" : "") + (j == 3 ? " icon-alliance" : "") + '">' + g.name + "</b>";
		if (r.length > 0) {
			m += " (" + r[0][0] + ", " + r[0][1] + ")<br />"
		}
		if (g.quests) {
			if (g.quests.length > 1) {
				m += LANG.som_startsquestpl
			} else {
				m += LANG.som_startsquest
			}
			m += '<div class="indent">';
			for (var i = 0; i < g.quests.length; ++i) {
				var p = g.quests[i];
				m += '<span class="q0">[' + p.level + "]</span> " + p.name + ((p.series && !p.first) ? '<sup style="font-size: 8px">(*)</sup>' : "") + ((p.category < 0 && g_quest_sorts[p.category]) ? ' <i class="q0">' + g_quest_sorts[p.category] + "</i>" : "") + "<br />"
			}
			m += "</div>"
		} else {
			if (g.description) {
				m += g.description + "<br />"
			} else {
				if (g.point) {
					for (var l = 0; l < c.length; ++l) {
						var k = c[l];
						switch (k.point) {
						case "start":
							m += LANG.mapper_startsquest + "<br />";
							if (j == "end") {
								j = "startend"
							} else {
								if (j != "startend") {
									j = "start"
								}
							}
							break;
						case "end":
							m += LANG.mapper_endsquest + "<br />";
							if (j == "start") {
								j = "startend"
							} else {
								if (j != "startend") {
									j = "end"
								}
							}
							break;
						case "sourcestart":
							m += LANG.mapper_sourcestart + "<br />";
							m += '<div class="indent">' + k.item + "</div>";
							if (j == "end") {
								j = "startend"
							} else {
								if (j != "startend") {
									j = "start"
								}
							}
							break;
						case "sourceend":
							m += LANG.mapper_sourceend + "<br />";
							m += '<div class="indent">' + k.item + "</div>";
							if (j == "start") {
								j = "startend"
							} else {
								if (j != "startend") {
									j = "end"
								}
							}
							break;
						case "requirement":
							m += LANG.mapper_requiredquest + "<br />";
							if (j == -1) {
								j = k.objective
							}
							break;
						case "sourcerequirement":
							m += LANG.mapper_sourcereq + "<br />";
							m += '<div class="indent">' + k.item + "</div>";
							if (j == -1) {
								j = k.objective
							}
							break
						}
					}
				}
			}
		}
	}
	m += '<div class="q2">';
	if (t.length == 1) {
		m += (t[0].type == 1 ? LANG.som_viewnpc : LANG.som_viewobj)
	} else {
		if (e == 1) {
			m += (u == 1 ? LANG.som_viewnpc : LANG.som_viewobj)
		} else {
			m += "<br />" + LANG.som_view
		}
	}
	m += "</div>";
	var v = [];
	v.push(m);
	v.push(j);
	if (t.length == 1 || e == 1) {
		v.push(d);
		v.push(null)
	} else {
		v.push("javascript:;");
		v.push(b)
	}
	return v
};
