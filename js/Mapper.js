function Mapper(b, c) {
	cO(this, b);
	if (this.parent) {
		this.parent = ge(this.parent)
	} else {
		return
	}
	var a;
	this.mouseX = this.mouseY = 0;
	this.editable = this.editable || false;
	if (this.editable) {
		this.zoomable = this.toggle = false;
		this.show = this.mouse = true
	} else {
		this.zoomable = (this.zoomable == null ? true : this.zoomable);
		this.toggle = (this.toggle == null ? true : this.toggle);
		this.show = (this.show == null ? true : this.show);
		this.mouse = (this.mouse == null ? false : this.mouse)
	}
	this.zoneLink = (this.zoneLink == null ? true : this.zoneLink);
	if (location.href.indexOf("zone=") != -1) {
		this.zoneLink = false
	}
	this.zoom = (this.zoom == null ? 0 : this.zoom);
	this.zone = (this.zone == null ? 0 : this.zone);
	this.level = (this.level == null ? (Mapper.zoneDefaultLevel[this.zone] ? Mapper.zoneDefaultLevel[this.zone] : 0) : this.level);
	this.pins = [];
	this.nCoords = 0;
	this.tempWidth = null;
	this.tempHeight = null;
	this.parent.className = "mapper";
	this.parent.appendChild(this.span = ce("span"));
	a = this.span.style;
	a.display = "block";
	a.position = "relative";
	ns(this.span);
	this.buttonDiv = a = ce("div");
	a.style.position = "absolute";
	a.style.top = a.style.right = "3px";
	this.parent.appendChild(a);
	if (this.editable) {
		this.span.onmouseup = this.addPin.bind(this);
		a = g_createGlow(LANG.mapper_tippin);
		a.style.fontSize = "11px";
		a.style.position = "absolute";
		a.style.bottom = a.style.right = "0";
		ns(a);
		this.parent.appendChild(a)
	} else {
		this.sToggle = a = RedButton.create(LANG.mapper_hidepins, true, this.toggleShow.bind(this));
		a.style["float"] = "right";
		a.style.display = "none";
		ns(a);
		this.buttonDiv.appendChild(a)
	}
	if (this.zoomable) {
		this.span.onclick = this.toggleZoom.bind(this);
		this.span.id = "sjdhfkljawelis" + (this.unique !== undefined ? this.unique : "");
		this.sZoom = a = g_createGlow(LANG.mapper_tipzoom);
		a.style.fontSize = "11px";
		a.style.position = "absolute";
		a.style.bottom = a.style.right = "0";
		ns(a);
		this.span.appendChild(a)
	}
	this.sZoneLink = a = g_createGlow("");
	a.style.display = "none";
	a.style.position = "absolute";
	a.style.top = a.style.left = "0";
	this.parent.appendChild(a);
	if (this.mouse) {
		this.parent.onmouseout = (function () {
			this.timeout = setTimeout((function () {
				this.sMouse.style.display = "none"
			}).bind(this), 1)
		}).bind(this);
		this.parent.onmouseover = (function () {
			clearTimeout(this.timeout);
			this.sMouse.style.display = ""
		}).bind(this);
		this.span.onmousemove = this.span.onmousedown = this.getMousePos.bind(this);
		this.sMouse = a = g_createGlow("(0.0, 0.0)");
		a.style.display = "none";
		a.style.position = "absolute";
		a.style.bottom = a.style.left = "0";
		a.onmouseup = sp;
		ns(a);
		this.span.appendChild(a)
	}
	this.floorPins = {};
	if (b.coords != null) {
		this.setCoords(b.coords)
	} else {
		if (b.link != null) {
			this.setLink(b.link)
		}
	}
	if (b.objectives) {
		this.setObjectives(b.objectives)
	}
	if (b.zoneparent && b.zones) {
		this.setZones(b.zoneparent, b.zones)
	}
	this.updateMap(c)
}
Mapper.sizes = [
	[488, 325, "normal"],
	[772, 515, "zoom"]];
Mapper.onlyOneFloor = {
	4120: true,
	4264: true,
	4375: true,
	4415: true,
	4493: true,
	4500: true,
	4603: true,
	4723: true,
	4809: true,
	4813: true,
	4820: true
};
Mapper.zoneLevelOffset = {
	4273: 0
};
Mapper.zoneDefaultLevel = {
	3456: 4,
	4812: 4
};
Mapper.multiLevelZones = {
	206: ["206-1", "206-2", "206-3"],
	1196: ["1196-1", "1196-2"],
	3456: ["3456-1", "3456-2", "3456-3", "3456-4", "3456-5", "3456-6"],
	3477: ["3477-3", "3477-2", "3477-1"],
	4100: ["4100-1", "4100-2"],
	4196: ["4196-1", "4196-2"],
	4228: ["4228-1", "4228-2", "4228-3", "4228-4"],
	4272: ["4272-1", "4272-2"],
	4273: ["4273-0", "4273-1", "4273-2", "4273-3", "4273-4", "4273-6"],
	4395: ["4395", "4395-2"],
	4494: ["4494-1", "4494-2"],
	4722: ["4722-1", "4722-2"],
	4812: ["4812-1", "4812-2", "4812-3", "4812-4", "4812-5", "4812-6", "4812-7", "4812-8"]
};
if (isset("g_beta") && g_beta) {
	Mapper.multiLevelZones[1637] = ["1637-1", "1637-2"]
}
Mapper.remappedLevels = {
	4273: {
		6: 5
	}
};
Mapper.prototype = {
	update: function (c, f) {
		if (c.zoom != null) {
			this.zoom = c.zoom
		}
		if (c.zone != null) {
			this.zone = c.zone
		}
		if (c.show != null) {
			this.show = c.show
		}
		this.pins = [];
		this.nCoords = 0;
		for (var b in this.floorPins) {
			if (this.floorPins[b].parentNode) {
				de(this.floorPins[b])
			}
		}
		this.floorPins = {};
		if (this.floorButton) {
			de(this.floorButton);
			this.floorButton = null
		}
		var g = (c.level === undefined ? 0 : this.fixLevel(parseInt(c.level)));
		this.level = 0;
		var d = false;
		if (isset("g_mapperData")) {
			d = g_mapperData
		} else {
			if (isset("g_mapper_data")) {
				d = g_mapper_data
			}
		}
		if (d && d[this.zone] && !c.coords) {
			var a = d[this.zone];
			var e = -1;
			for (var b in a) {
				b = parseInt(b);
				iLevel = this.fixLevel(b);
				if (c.level === undefined && a[b].count > e) {
					g = parseInt(iLevel);
					e = a[b].count
				}
				if (a[b].coords) {
					this.setCoords(a[b].coords, iLevel)
				}
			}
			this.level = g;
			if (this.floorPins[this.level]) {
				ae(this.span, this.floorPins[this.level])
			}
		} else {
			if (c.coords != null) {
				this.setCoords(c.coords)
			} else {
				if (c.link != null) {
					this.setLink(c.link)
				}
			}
		}
		this.updateMap(f)
	},
	fixLevel: function (a) {
		if (Mapper.zoneLevelOffset[this.zone] !== undefined) {
			a += Mapper.zoneLevelOffset[this.zone]
		} else {
			if (Mapper.multiLevelZones[this.zone] && a > 0) {
				a += -1
			} else {
				if (Mapper.multiLevelZones[this.zone] == undefined) {
					a = 0
				}
			}
		}
		if (Mapper.remappedLevels[this.zone] && Mapper.remappedLevels[this.zone][a] !== undefined) {
			a = Mapper.remappedLevels[this.zone][a]
		}
		return a
	},
	getZone: function () {
		return this.zone
	},
	setZone: function (a, c, b) {
		this.pins = [];
		this.nCoords = 0;
		if (this.floorPins[this.level]) {
			de(this.floorPins[this.level])
		}
		this.floorPins = {};
		if (this.floorButton) {
			de(this.floorButton);
			this.floorButton = null
		}
		this.zone = a;
		this.level = c | 0;
		this.updateMap(b);
		return true
	},
	showFloors: function (d) {
		if (!Mapper.multiLevelZones[this.zone]) {
			return
		}
		var e = [];
		var b = Mapper.multiLevelZones[this.zone];
		for (var c = 0; c < b.length; ++c) {
			var a;
			if (!g_zone_areas[this.zone]) {
				a = [c, "[Level " + (c + 1) + "]", this.setMap.bind(this, b[c], c, true)]
			} else {
				a = [c, g_zone_areas[this.zone][c], this.setMap.bind(this, b[c], c, true)]
			}
			if (c == this.level || (this.level === undefined && c == 0)) {
				a.checked = true
			}
			e.push(a)
		}
		Menu.showAtCursor(e, d)
	},
	setMap: function (g, h, c) {
		if (h != this.level) {
			if (this.floorPins[this.level]) {
				de(this.floorPins[this.level])
			}
			if (this.floorPins[h]) {
				ae(this.span, this.floorPins[h])
			}
			this.level = h
		}
		var d = "enus";
		if (isset("g_ptr") && g_ptr) {
			d = "ptr"
		} else {
			if (isset("g_beta") && g_beta) {
				d = "beta"
			}
		}
		this.span.style.background = "url(" + g_staticUrl + "/images/wow/maps/" + d + "/" + Mapper.sizes[this.zoom][2] + "/" + g + ".jpg)";
		if (this.sZoneLink) {
			var a = "";
			var f = parseInt(this.zone);
			var e = g_zones[f] != null;
			if (e) {
				if (this.zoneLink) {
					a += '<a href="/zone=' + f + '">' + g_zones[f] + "</a>"
				}
				if (Mapper.multiLevelZones[f]) {
					if (this.zoneLink) {
						a += ": "
					}
					a += (g_zone_areas[f] ? g_zone_areas[f][this.level] : "Level " + (this.level + 1))
				}
				g_setInnerHtml(this.sZoneLink, a, "div");
				if (this.zoneLink) {
					for (var b = 0; b < 9; ++b) {
						if (b == 4) {
							continue
						}
						this.sZoneLink.childNodes[b].firstChild.style.color = "black"
					}
				}
			}
			this.sZoneLink.style.display = e ? "" : "none"
		}
		if (c) {
			this.onMapUpdate && this.onMapUpdate(this)
		}
	},
	setObjectives: function (h) {
		var b = {
			start: 1,
			end: 1,
			startend: 1,
			sourcestart: 1,
			sourceend: 1
		};
		for (var m in h) {
			var k = h[m];
			if (g_mapperData[m] === undefined) {
				g_mapperData[m] = {}
			}
			var g = {};
			var j = 0;
			for (var c in k.levels) {
				var a = k.levels[c];
				var f = ShowOnMap.combinePins(a);
				var d = f[0];
				g_mapperData[m][c] = {
					count: d.length,
					coords: []
				};
				for (var e = 0; e < d.length; ++e) {
					var n = ShowOnMap.buildTooltip(d[e].list);
					g_mapperData[m][c].coords.push([d[e].coord[0], d[e].coord[1], {
						type: n[1],
						url: n[2],
						menu: n[3],
						label: n[0]
					}])
				}
			}
		}
	},
	setZones: function (m, n) {
		m = $("#" + m);
		if (!m || !n || n.length == 0 || !this.objectives) {
			return
		}
		var r = function (C, H, B, I) {
			var G = [false, -1];
			for (var E = 0; E < B.length; ++E) {
				if (E > 0) {
					u.append((E == B.length - 1 ? LANG.and : LANG.comma))
				}
				var F = null;
				if (C.objectives[B[E][0]].mappable > 0) {
					F = $("<a/>", {
						href: "javascript:;",
						text: C.objectives[B[E][0]].zone
					});
					F.click(function (J, i) {
						C.update({
							zone: i
						});
						g_setSelectedLink(J, "mapper")
					}.bind(C, F[0], B[E][0]));
					F.isLink = true
				} else {
					F = $("<a/>", {
						href: "/zone=" + B[E][0],
						text: C.objectives[B[E][0]].zone
					});
					g_addTooltip(F[0], LANG.tooltip_zonelink)
				}
				if (n.length > 1) {
					var D = I[B[E][0]];
					if (D.start && D.end) {
						F.addClass("icontiny");
						F.css("background-image", "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_startend.gif)");
						F.css("padding-left", "20px")
					} else {
						if (D.start) {
							F.addClass("icontiny");
							F.css("background-image", "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_start.gif)");
							F.css("padding-left", "14px")
						} else {
							if (D.end) {
								F.addClass("icontiny");
								F.css("background-image", "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_end.gif)");
								F.css("padding-left", "16px")
							}
						}
					}
				}
				H.append(F);
				if (B[E][1] > G[1]) {
					G = [F, B[E][1]]
				}
			}
			return G[0]
		};
		var j = function (B, F, E) {
			var C = [];
			for (var D = 0; D < B.length; ++D) {
				if (F[B[D][0]][E]) {
					C.push(B[D])
				}
			}
			return C
		};
		var e = {};
		var k = {
			start: [],
			end: [],
			objective: []
		};
		for (var c in this.objectives) {
			if (e[c] === undefined) {
				e[c] = {}
			}
			var v = this.objectives[c];
			for (var o in v.levels) {
				var b = v.levels[o];
				for (var t = 0; t < b.length; ++t) {
					if (b[t].point == "start" || b[t].point == "sourcestart") {
						k.start.push(c);
						e[c].start = true
					} else {
						if (b[t].point == "end" || b[t].point == "sourceend") {
							k.end.push(c);
							e[c].end = true
						} else {
							if (b[t].point == "requirement" || b[t].point == "sourcerequirement") {
								k.objective.push(c);
								e[c].objective = true
							}
						}
					}
				}
			}
		}
		var f = $("<h3/>", {
			text: LANG.mapper_relevantlocs
		});
		m.append(f);
		if (n.length == 1 && this.missing == 0) {
			var u = $("<span/>", {
				html: LANG.mapper_entiretyinzone.replace("$$", "<b>" + this.objectives[n[0][0]].zone + "</b>.")
			});
			m.append(u);
			this.update({
				zone: n[0][0]
			})
		} else {
			if (this.missing > 0) {
				var u = $("<span/>");
				var l = false,
					h = false,
					w = false;
				k.objective = array_unique(k.objective);
				k.start = array_unique(k.start);
				k.end = array_unique(k.end);
				var z = k.start.length > 0 && array_compare(k.start, k.end);
				var d = k.start.length > 0 && array_compare(k.start, k.objective);
				var p = k.end.length > 0 && array_compare(k.end, k.objective);
				var A = j(n, e, "objective");
				var a = j(n, e, "start");
				var g = j(n, e, "end");
				if (z && d) {
					var q = LANG.mapper_happensin.split("$$");
					u.text(q[0]);
					l = r(this, u, n, e);
					u.append(q[1])
				} else {
					if (z && k.objective.length == 0) {
						var q = LANG.mapper_objectives.sex.split("$$");
						u.text(q[0]);
						l = r(this, u, n, e);
						u.append(q[1])
					} else {
						if (z) {
							var q = LANG.mapper_objectives.ox_sey.split("$$");
							u.text(q[0]);
							l = r(this, u, a, e);
							u.append(q[1]);
							h = r(this, u, A, e);
							u.append(q[2])
						} else {
							if (d && k.end.length == 0) {
								var q = LANG.mapper_objectives.osx.split("$$");
								u.text(q[0]);
								l = r(this, u, n, e);
								u.append(q[1])
							} else {
								if (d) {
									var q = LANG.mapper_objectives.osx_ey.split("$$");
									u.text(q[0]);
									l = r(this, u, A, e);
									u.append(q[1]);
									h = r(this, u, g, e);
									u.append(q[2])
								} else {
									if (p && k.start.length == 0) {
										var q = LANG.mapper_objectives.oex.split("$$");
										u.text(q[0]);
										l = r(this, u, n, e);
										u.append(q[1])
									} else {
										if (p) {
											var q = LANG.mapper_objectives.oex_sy.split("$$");
											u.text(q[0]);
											l = r(this, u, a, e);
											u.append(q[1]);
											h = r(this, u, A, e);
											u.append(q[2])
										} else {
											if (k.start.length > 0 && k.end.length > 0 && k.objective.length > 0) {
												var q = LANG.mapper_objectives.ox_sy_ez.split("$$");
												u.text(q[0]);
												l = r(this, u, a, e);
												u.append(q[1]);
												h = r(this, u, A, e);
												u.append(q[2]);
												w = r(this, u, g, e);
												u.append(q[3])
											} else {
												if (k.start.length > 0 && k.end.length > 0) {
													var q = LANG.mapper_objectives.sx_ey.split("$$");
													u.text(q[0]);
													l = r(this, u, a, e);
													u.append(q[1]);
													h = r(this, u, g, e);
													u.append(q[2])
												} else {
													if (k.start.length > 0 && k.objective.length > 0) {
														var q = LANG.mapper_objectives.ox_sy.split("$$");
														u.text(q[0]);
														l = r(this, u, a, e);
														u.append(q[1]);
														h = r(this, u, A, e);
														u.append(q[2])
													} else {
														if (k.end.length > 0 && k.objective.length > 0) {
															var q = LANG.mapper_objectives.ox_ey.split("$$");
															u.text(q[0]);
															l = r(this, u, A, e);
															u.append(q[1]);
															h = r(this, u, g, e);
															u.append(q[2])
														} else {
															if (k.start.length > 0) {
																var q = LANG.mapper_objectives.sx.split("$$");
																u.text(q[0]);
																l = r(this, u, n, e);
																u.append(q[1])
															} else {
																if (k.end.length > 0) {
																	var q = LANG.mapper_objectives.ex.split("$$");
																	u.text(q[0]);
																	l = r(this, u, n, e);
																	u.append(q[1])
																} else {
																	if (k.objective.length > 0) {
																		var q = LANG.mapper_objectives.ox.split("$$");
																		u.text(q[0]);
																		l = r(this, u, n, e);
																		u.append(q[1])
																	} else {
																		var q = LANG.mapper_happensin.split("$$");
																		u.text(q[0]);
																		l = r(this, u, n, e);
																		u.append(q[1])
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
				m.append(u);
				if (l && l.isLink) {
					l.click()
				} else {
					if (h && h.isLink) {
						h.click()
					} else {
						if (w && w.isLink) {
							w.click()
						}
					}
				}
			} else {
				var q = LANG.mapper_happensin.split("$$");
				var u = $("<span/>", {
					text: q[0]
				});
				var l = r(this, u, n, e);
				u.append(q[1]);
				m.append(u);
				if (l && l.isLink) {
					l.click()
				}
			}
		}
	},
	setSize: function (a, b) {
		this.tempWidth = a;
		this.tempHeight = b;
		this.updateMap(true)
	},
	getZoom: function () {
		return this.zoom
	},
	setZoom: function (a, b) {
		this.zoom = a;
		this.tempWidth = this.tempHeight = null;
		this.updateMap(b)
	},
	toggleZoom: function (a) {
		this.zoom = 1 - this.zoom;
		this.updateMap(true);
		if (a) {
			this.getMousePos(a)
		}
		if (this.sZoom) {
			if (this.sZoom.style.display == "none") {
				this.sZoom.style.display = ""
			} else {
				this.sZoom.style.display = "none"
			}
		}
		if (this.zoom) {
			MapViewer.show({
				mapper: this
			})
		}
	},
	getShow: function () {
		return this.show
	},
	setShow: function (a) {
		this.show = a;
		var c = this.show ? "" : "none";
		for (var b in this.floorPins) {
			this.floorPins[b].style.display = c
		}
		RedButton.setText(this.sToggle, (this.show ? LANG.mapper_hidepins : LANG.mapper_showpins))
	},
	toggleShow: function () {
		this.setShow(!this.show)
	},
	getCoords: function () {
		var b = [];
		for (var c in this.pins) {
			if (!this.pins[c].free) {
				b.push([this.pins[c].x, this.pins[c].y])
			}
		}
		return b
	},
	clearPins: function () {
		for (var a in this.pins) {
			this.pins[a].style.display = "none";
			this.pins[a].free = true
		}
	},
	setCoords: function (k, g) {
		var j;
		var b, e;
		if (g === undefined) {
			this.clearPins();
			if (k.length) {
				e = true;
				b = 0
			} else {
				for (var d in k) {
					b = d;
					break
				}
				if (b == null) {
					return
				}
				k = k[b]
			}
			b = parseInt(b);
			if (!e) {
				b = this.fixLevel(b);
				this.level = b
			}
		} else {
			b = g
		}
		this.nCoords = k.length;
		for (var d in k) {
			var h = k[d],
				c = h[2];
			j = this.getPin(b);
			j.x = h[0];
			j.y = h[1];
			j.style.left = j.x + "%";
			j.style.top = j.y + "%";
			if (this.editable) {
				j.a.onmouseup = this.delPin.bind(this, j)
			} else {
				if (c && c.url) {
					j.a.href = Markup._fixUrl(c.url);
					j.a.rel = "np";
					j.a.style.cursor = "pointer"
				}
			}
			if (c && c.tooltip) {
				j.a.tt = "";
				var f = false;
				for (var a in c.tooltip) {
					if (j.a.tt != "") {
						j.a.tt += "<br />"
					}
					j.a.tt += '<b class="q">' + a + "</b> ($)<br />";
					for (var l in c.tooltip[a].info) {
						j.a.tt += "<div>" + c.tooltip[a].info[l] + "</div>"
					}
					if (!f && c.tooltip[a].footer) {
						j.a.tt += c.tooltip[a].footer + "<br />";
						f = true
					}
				}
			} else {
				if (c && c.label) {
					j.a.tt = c.label
				} else {
					j.a.tt = "$"
				}
			}
			if (c && c.menu) {
				j.a.menu = c.menu;
				Menu.add(j.a, j.a.menu, {
					showAtCursor: true
				})
			}
			if (c && c.type) {
				j.className += " pin-" + c.type
			}
			j.a.tt = str_replace(j.a.tt, "$", j.x.toFixed(1) + ", " + j.y.toFixed(1))
		}
		this.onPinUpdate && this.onPinUpdate(this)
	},
	getLink: function () {
		var b = "";
		for (var a in this.pins) {
			if (!this.pins[a].free && this.pins[a].floor == this.level) {
				b += (this.pins[a].x < 10 ? "0" : "") + (this.pins[a].x < 1 ? "0" : "") + (this.pins[a].x * 10).toFixed(0) + (this.pins[a].y < 10 ? "0" : "") + (this.pins[a].y < 1 ? "0" : "") + (this.pins[a].y * 10).toFixed(0)
			}
		}
		return (this.zone ? this.zone : "") + (Mapper.multiLevelZones[this.zone] && this.level != 0 ? "." + this.level : "") + (b ? ":" + b : "")
	},
	setLink: function (h, e) {
		var k = [];
		h = h.split(":");
		var f = h[0];
		var b = 0;
		if (f.indexOf(".") != -1) {
			var d = f.split(".");
			f = d[0];
			b = parseInt(d[1])
		}
		if (!this.setZone(f, b, e)) {
			return false
		}
		if (h.length == 2) {
			for (var c = 0; c < h[1].length; c += 6) {
				var j = h[1].substr(c, 3) / 10;
				var g = h[1].substr(c + 3, 3) / 10;
				if (isNaN(j) || isNaN(g)) {
					break
				}
				k.push([j, g])
			}
		}
		this.setCoords(k, b);
		return true
	},
	updateMap: function (a) {
		this.parent.style.width = this.span.style.width = (this.tempWidth ? this.tempWidth : Mapper.sizes[this.zoom][0]) + "px";
		this.parent.style.height = this.span.style.height = (this.tempHeight ? this.tempHeight : Mapper.sizes[this.zoom][1]) + "px";
		if (!this.editable) {
			this.parent.style.cssFloat = this.parent.style.styleFloat = "left"
		}
		if (this.zone == "0") {
			this.span.style.background = "black"
		} else {
			var c = this.level;
			if (c == 1 && Mapper.onlyOneFloor[this.zone]) {
				c = 0
			}
			var b = this.zone + (c ? "-" + c : "");
			if (Mapper.multiLevelZones[this.zone]) {
				b = Mapper.multiLevelZones[this.zone][c]
			}
			this.setMap(b, c);
			if (!this.floorButton && Mapper.multiLevelZones[this.zone]) {
				this.floorButton = _ = RedButton.create(LANG.mapper_floor, true, this.showFloors.bind(this));
				_.style["float"] = "right";
				ns(_);
				this.buttonDiv.appendChild(_)
			} else {
				if (this.floorButton) {
					this.floorButton.style.display = Mapper.multiLevelZones[this.zone] ? "" : "none"
				}
			}
		}
		if (this.sToggle) {
			this.sToggle.style.display = (this.toggle && this.nCoords ? "" : "none")
		}
		this.onMapUpdate && this.onMapUpdate(this)
	},
	cleanPin: function (b, c) {
		var a = this.pins[b];
		a.style.display = "";
		a.free = false;
		a.className = "pin";
		a.a.onmousedown = rf;
		a.a.onmouseup = rf;
		a.a.href = "javascript:;";
		a.a.style.cursor = "default";
		a.floor = c;
		return a
	},
	getPin: function (e) {
		for (var d = 0; d < this.pins.length; ++d) {
			if (this.pins[d].free) {
				return this.cleanPin(d, e)
			}
		}
		var c = ce("div"),
			b = ce("a");
		c.className = "pin";
		c.appendChild(b);
		c.a = b;
		c.floor = e;
		b.onmouseover = this.pinOver;
		b.onmouseout = Tooltip.hide;
		b.onclick = sp;
		this.pins.push(c);
		this.cleanPin(this.pins.length - 1, e);
		if (!this.floorPins[e]) {
			this.floorPins[e] = ce("div");
			this.floorPins[e].style.display = this.show ? "" : "none";
			if (e == this.level) {
				ae(this.span, this.floorPins[e])
			}
		}
		ae(this.floorPins[e], c);
		return c
	},
	addPin: function (b) {
		b = $E(b);
		if (b._button >= 2) {
			return
		}
		this.getMousePos(b);
		var a = this.getPin(this.level);
		a.x = this.mouseX;
		a.y = this.mouseY;
		a.style.left = a.x.toFixed(1) + "%";
		a.style.top = a.y.toFixed(1) + "%";
		a.a.onmouseup = this.delPin.bind(this, a);
		a.a.tt = a.x.toFixed(1) + ", " + a.y.toFixed(1);
		this.onPinUpdate && this.onPinUpdate(this);
		return false
	},
	delPin: function (a, b) {
		b = $E(b);
		a.style.display = "none";
		a.free = true;
		sp(b);
		this.onPinUpdate && this.onPinUpdate(this);
		return
	},
	pinOver: function () {
		Tooltip.show(this, this.tt, 4, 0)
	},
	getMousePos: function (b) {
		b = $E(b);
		var d = ac(this.parent);
		var a = g_getScroll();
		this.mouseX = Math.floor((b.clientX + a.x - d[0] - 3) / Mapper.sizes[this.zoom][0] * 1000) / 10;
		this.mouseY = Math.floor((b.clientY + a.y - d[1] - 3) / Mapper.sizes[this.zoom][1] * 1000) / 10;
		if (this.mouseX < 0) {
			this.mouseX = 0
		} else {
			if (this.mouseX > 100) {
				this.mouseX = 100
			}
		}
		if (this.mouseY < 0) {
			this.mouseY = 0
		} else {
			if (this.mouseY > 100) {
				this.mouseY = 100
			}
		}
		if (this.mouse) {
			g_setTextNodes(this.sMouse, "(" + this.mouseX.toFixed(1) + ", " + this.mouseY.toFixed(1) + ")")
		}
	}
};
var MapViewer = new
function () {
	var f, t, z, b, u, d, l, i, v, c, m, a, o, k, q;

	function h() {
		var A = Math.max(50, Math.min(618, g_getWindowSize().h - 72));
		b = 1;
		z = 1;
		if (b > 1) {
			b = 1
		}
		if (z > 1) {
			z = 1
		}
		f = Math.round(z * 772);
		t = Math.round(z * 515);
		var B = Math.max(480, f);
		Lightbox.setSize(B + 20, t + 52)
	}
	function e(A) {
		var B = function (E, D) {
			D += ":" + E.zone;
			if (E.level) {
				D += "." + E.level
			}
			return D
		};
		var C = "#map";
		if (c) {
			C += "=" + u.getLink()
		} else {
			if (Mapper.zoneDefaultLevel[u.zone]) {
				if (Mapper.zoneDefaultLevel[u.zone] != u.level) {
					C = B(u, C)
				}
			} else {
				if (u.level != 0) {
					C = B(u, C)
				} else {
					if ((!isset("g_mapperData") || !g_mapperData[u.zone]) && (!isset("g_mapper_data") || !g_mapper_data[u.zone])) {
						C = B(u, C)
					}
				}
			}
		}
		return C
	}
	function r() {
		if (l) {
			l(u)
		}
		location.replace(e(true))
	}
	function p(A) {
		if (A && (z == b) && g_getWindowSize().h > a.offsetHeight) {
			return
		}
		a.style.visibility = "hidden";
		h(0);
		if (!A) {
			if (!m) {
				m = ce("div");
				m.style.height = "325px";
				m.style.padding = "3px";
				m.style.marginTop = "10px"
			}
			u.parent.style.borderWidth = "0px";
			u.parent.style.marginTop = "0px";
			u.span.style.cursor = "pointer";
			if (u.span.onclick) {
				d = u.span.onclick
			}
			u.span.onclick = Lightbox.hide;
			u.span.onmouseover = function () {
				q.style.display = "block"
			};
			u.span.onmouseout = function () {
				setTimeout(function () {
					if (!q.hasMouse) {
						q.style.display = "none"
					}
				},
				10)
			};
			if (u.onMapUpdate) {
				l = u.onMapUpdate
			}
			u.onMapUpdate = r;
			if (!c) {
				i = u.parent.parentNode;
				v = u.parent.nextSibling;
				i.insertBefore(m, u.parent);
				de(u.parent);
				ae(mapDiv, u.parent)
			} else {
				de(c);
				ae(mapDiv, c)
			}
			if (location.hash.indexOf("#show") == -1) {
				location.replace(e(false))
			} else {
				if (isset("mapShower")) {
					mapShower.onExpand()
				}
			}
		}
		Lightbox.reveal();
		a.style.visibility = "visible"
	}
	function g() {
		p(1)
	}
	function n() {
		if (d) {
			u.span.onclick = d
		} else {
			u.span.onclick = null
		}
		d = null;
		if (l) {
			u.onMapUpdate = l
		} else {
			u.onMapUpdate = null
		}
		l = null;
		u.span.style.cursor = "";
		u.span.onmouseover = null;
		u.span.onmouseout = null;
		if (!c) {
			de(m);
			de(u.parent);
			u.parent.style.borderWidth = "";
			u.parent.style.marginTop = "";
			if (v) {
				i.insertBefore(u.parent, v)
			} else {
				ae(i, u.parent)
			}
			i = v = null
		} else {
			de(c);
			c = null
		}
		u.toggleZoom();
		if (location.hash.indexOf("#show") == -1) {
			location.replace("#.")
		} else {
			if (isset("mapShower")) {
				mapShower.onCollapse()
			}
		}
	}
	function w(A, D, B) {
		u = B.mapper;
		a = A;
		if (D) {
			A.className = "mapviewer";
			o = ce("div");
			o.style.width = "772px";
			o.style.height = "515px";
			o.className = "mapviewer-screen";
			q = ce("a");
			q.className = "mapviewer-cover";
			q.href = "javascript:;";
			q.onclick = Lightbox.hide;
			q.onmouseover = function () {
				q.hasMouse = true
			};
			q.onmouseout = function () {
				q.hasMouse = false
			};
			var F = ce("span");
			ae(F, ce("b"));
			ae(q, F);
			ae(o, q);
			mapDiv = ce("div");
			ae(o, mapDiv);
			ae(A, o);
			var E = ce("a");
			E.className = "mapviewer-close";
			E.href = "javascript:;";
			E.onclick = Lightbox.hide;
			ae(E, ce("span"));
			ae(A, E);
			var C = ce("div");
			C.className = "clear";
			ae(A, C)
		}
		j()
	}
	function j() {
		p()
	}
	this.checkPound = function () {
		if (location.hash && location.hash.indexOf("#map") == 0) {
			var E = location.hash.split("=");
			if (E.length == 2) {
				var C = E[1];
				if (C) {
					MapViewer.show({
						link: C
					})
				}
			} else {
				E = location.hash.split(":");
				var D = ge("sjdhfkljawelis");
				if (D) {
					D.onclick()
				}
				if (E.length == 2) {
					if (!D) {
						MapViewer.show({
							link: E[1]
						})
					}
					var A = E[1].split(".");
					var B = {
						zone: A[0]
					};
					if (A.length == 2) {
						B.level = parseInt(A[1]) + 1
					}
					u.update(B)
				}
			}
		}
	};
	this.show = function (A) {
		if (A.link) {
			c = ce("div");
			c.id = "fewuiojfdksl";
			ae(document.body, c);
			var B = new Mapper({
				parent: c.id
			});
			B.setLink(A.link, true);
			B.toggleZoom()
		} else {
			Lightbox.show("mapviewer", {
				onShow: w,
				onHide: n,
				onResize: g
			},
			A)
		}
	};
	$(document).ready(this.checkPound)
};
