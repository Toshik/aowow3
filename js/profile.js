function pr_setRegionRealm(e, h, g) {
	if (!e) {
		return
	}
	var d = e.elements.rg || e.elements[0],
		c = e.elements.sv || e.elements[1];
	if (!d || !c) {
		return
	}
	for (var b = 0, a = d.options.length; b < a; ++b) {
		if (d.options[b].value == h) {
			d.options[b].selected = true;
			break
		}
	}
	pr_onChangeRegion(e, h, g);
	if (c.onchange) {
		c.onchange()
	}
}
function pr_onChangeRegion(k, m, g) {
	if (!k) {
		return
	}
	var a = k.elements.rg || k.elements[0],
		l = k.elements.sv || k.elements[1];
	if (!a || !l) {
		return
	}
	var c = a.options[0];
	c.value = "";
	c.style.color = "#999999";
	st(c, (k._hints ? LANG.pr_region : ""));
	ee(l);
	c = ce("option");
	c.value = "";
	c.style.color = "#999999";
	st(c, (k._hints ? LANG.pr_realm : ""));
	ae(l, c);
	if (l.onchange == null) {
		l.onchange = function () {
			this.className = (this.selectedIndex ? "" : "search-character")
		}
	}
	if (m == null) {
		m = a.options[a.selectedIndex].value
	}
	if (!m) {
		a.className = "search-character";
		l.className = "search-character";
		var c = ce("option");
		c.disabled = true;
		ae(c, ct(LANG.pr_selectregion));
		ae(l, c)
	} else {
		var d;
		a.className = "";
		l.className = "search-character";
		if (pr_onChangeRegion.C[m] != null) {
			d = pr_onChangeRegion.C[m]
		} else {
			d = pr_onChangeRegion.C[m] = g_sortJsonArray(g_realms, g_realms, function (i, f) {
				return strcmp(g_realms[i].name, g_realms[f].name)
			},


			function (f) {
				return f.region == m
			})
		}
		for (var e = 0, j = d.length; e < j; ++e) {
			var b = d[e],
				h = g_realms[b];
			c = ce("option");
			c.value = g_urlize(h.name, true);
			ae(c, ct(h.name));
			if (g != null && h.name == g) {
				l.className = "";
				c.selected = true
			}
			ae(l, c)
		}
	}
}
pr_onChangeRegion.C = {};

function pr_updateStatus(div, characterId, request, tryAgain, partial) {
	if (tryAgain == null) {
		tryAgain = function (partial) {
			new Ajax("/profile=resync&id=" + characterId, {
				method: "POST",
				onSuccess: function (xhr, opt) {
					pr_updateStatus(div, characterId, request, null, partial)
				}
			})
		}
	}
	new Ajax("/profile=status&id=" + characterId + "&t=" + (new Date().getTime()), {
		onSuccess: function (xhr, opt) {
			var text = xhr.responseText;
			if (text.charAt(0) != "[" || text.charAt(text.length - 1) != "]") {
				return
			}
			var a = eval(text),
				processes = a[0],
				status = a[1],
				refresh = a[2],
				count = a[3],
				errcode = a[4],
				nresyncs = a[5],
				duration;
			if (status == 3 && !nresyncs) {
				request = true
			}
			if (status && (status != 3 || request)) {
				duration = (count && processes ? g_formatTimeElapsed((count * 30 / processes) + 30) : LANG.pr_queue_unknown);
				count = (!isNaN(count) ? number_format(count) : LANG.pr_queue_unknown);
				div.innerHTML = ((status == 3 && !nresyncs) || partial ? LANG.pr_queue_partial : LANG.pr_queue_resyncreq);
				if (!processes) {
					div.innerHTML += " " + LANG.pr_queue_noprocess
				}
				div.innerHTML += '<a id="close-profiler-notification" class="announcement-close" href="javascript:;" onclick="$(\'.profiler-message\').remove(); return false;">';
				div.innerHTML += "<br />" + (status != 4 && !refresh && !nresyncs ? LANG.pr_queue_addqueue : (status == 4 ? sprintf(LANG.pr_queue_status4, LANG["pr_error_armory" + errcode]) : sprintf(LANG["pr_queue_status" + status], count, duration, (location.search || location.pathname).substr(1))));
				div.style.backgroundImage = "";
				div.style.display = "";
				if (status == 4) {
					var a = gE(div, "a")[1];
					a.onclick = tryAgain;
					div.style.backgroundImage = "none"
				} else {
					if (refresh) {
						setTimeout(pr_updateStatus.bind(null, div, characterId, request, tryAgain, partial), refresh)
					} else {
						if (!nresyncs) {
							tryAgain(true)
						} else {
							div.style.backgroundImage = "none"
						}
					}
				}
			} else {
				div.style.display = "none"
			}
		}
	})
}
function pr_initRosterListview() {
	this.applySort();
	if (g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU)) {
		this.mode = 1;
		this.createCbControls = function (c, b) {
			if (!b && this.data.length < 15) {
				return
			}
			var a = ce("input");
			a.type = "button";
			a.value = LANG.button_resync;
			a.onclick = (function () {
				var e = this.getCheckedRows();
				if (!e.length) {
					alert(LANG.message_nocharacterselected)
				} else {
					var d = "";
					array_walk(e, function (f) {
						d += f.id + ","
					});
					d = rtrim(d, ",");
					if (d != "") {
						new Ajax("/profile=resync&id=" + d)
					} (Listview.cbSelect.bind(this, false))();
					alert(LANG.message_characterresync)
				}
			}).bind(this);
			ae(c, a)
		}
	}
}
function pr_getGearScoreQuality(h, e, g, c, a) {
	var f, b = 0,
		d = 4.75;
	if (!e) {
		return 0
	}
	if (c == null) {
		b = 12.25390625;
		if (h < 55) {
			if (g) {
				b -= 81 / 256
			}
			b -= 18 / 16;
			if (h < 25) {
				b -= 25 / 16;
				if (h < 20) {
					b -= 30 / 16
				}
			}
		}
	} else {
		switch (c) {
		case 1:
		case 5:
		case 7:
		case 16:
		case 17:
			b = 1;
			break;
		case 3:
		case 10:
		case 6:
		case 8:
			b = 3 / 4;
			break;
		case 9:
		case 2:
		case 15:
		case 11:
		case 12:
		case 13:
		case 14:
			b = 9 / 16;
			break;
		case 18:
			b = 81 / 256;
			break
		}
		if (a) {
			b *= 2
		}
	}
	if (h >= 70) {
		f = ((h - 70) * 9.5) + 105
	} else {
		if (h >= 60) {
			f = ((h - 60) * 4.5) + 60
		} else {
			f = h + 5
		}
	}
	while (e < Math.floor(((b * f) / ((6 - d) * 0.6))) && d > 0) {
		d = Math.ceil(d) - 1
	}
	return Math.ceil(d)
}
function pr_getSpecFromTalents(b, e) {
	var a = 0;
	if (e == null || (e[0] == 0 && e[1] == 0 && e[2] == 0)) {
		a = -1
	} else {
		if (e[0] - e[1] > 5 && e[0] - e[2] > 5) {
			a = 1
		} else {
			if (e[1] - e[0] > 5 && e[1] - e[2] > 5) {
				a = 2
			} else {
				if (e[2] - e[0] > 5 && e[2] - e[1] > 5) {
					a = 3
				}
			}
		}
	}
	var d;
	var c;
	if (a <= 0) {
		d = g_chr_specs[a];
		if (a == -1) {
			c = "spell_shadow_sacrificialshield"
		} else {
			c = "spell_nature_elementalabsorption"
		}
	} else {
		d = g_chr_specs[b][a - 1];
		if (isset("$WowheadTalentCalculator")) {
			var f = $WowheadTalentCalculator.getTalentTrees();
			if (f) {
				c = f[a - 1].icon
			}
		}
	}
	return {
		id: a,
		name: d || "",
		icon: c || ""
	}
}
function pr_getScaleFromSpec(d, b) {
	var c = wt_presets[d].pve,
		a = [];
	for (var e in c) {
		a.push(c[e])
	}
	return dO(a[b])
}
function pr_getScaleFilter(h) {
	var d = [];
	if (h) {
		for (var e = 0, c = fi_filters.items.length; e < c; ++e) {
			var g = fi_filters.items[e];
			if (h[g.name]) {
				d.push([g.id, h[g.name]])
			}
		}
	}
	d.sort(function (i, f) {
		return -strcmp(i[1], f[1])
	});
	var b = [],
		a = [];
	for (var e = 0, c = d.length; e < c; ++e) {
		b.push(d[e][0]);
		a.push(d[e][1])
	}
	if (b.length && a.length) {
		return ";gm=4;wt=" + b.join(":") + ";wtv=" + a.join(":")
	}
	return ""
}
function pr_showClassPresetMenu(k, n, l, i, b) {
	var e = [
		[, LANG.menu_chooseclassspec]];
	if (n && l && i) {
		for (var g in wt_presets) {
			var m = [g, g_chr_classes[g], , [], {
				className: "c" + g,
				tinyIcon: "class_" + g_file_classes[g]
			}];
			e.push(m);
			var f = 0;
			for (var d in wt_presets[g].pve) {
				m[3].push([f, LANG.presets[d], "/items=" + l + "?filter=ub=" + g + ";cr=161;crs=1;crv=0" + pr_getScaleFilter(wt_presets[g].pve[d]) + (l == 2 ? ";gb=1" : "") + ";upg=" + n + (l == 2 && g_item_slots[i] ? "#" + g_urlize(g_item_slots[i]) : ""), , {
					tinyIcon: wt_presets[g].pve[d].__icon
				}]);
				f++
			}
		}
		var h = g_getCursorPos(b);
		Menu.sort(e);
		Menu.showAtXY(e, h.x, h.y)
	}
}
function pr_onBreadcrumbUpdate() {
	var j = PageTemplate.get("breadcrumb");
	if (!j || j.length != 5) {
		return
	}
	var h = Menu.getFullPath(mn_path, j);
	var c = h[h.length - 1];
	var e = PageTemplate.expandBreadcrumb()[0];
	var g = ce("form"),
		d = ce("input"),
		b = ce("a");
	e.className = "profiler-charlookup";
	g.onsubmit = function () {
		var a = this.elements[0];
		if (!trim(a.value)) {
			alert(LANG.message_missingcharacter);
			a.focus();
			return
		}
		location.href = c[2].replace("profiles", "profile") + "." + g_cleanCharacterName(a.value);
		return false
	};
	d.className = "search-character";
	d.type = "text";
	d.onfocus = function () {
		this.className = ""
	};
	d.onblur = function () {
		if (trim(this.value) == "") {
			this.className = "search-character";
			this.value = ""
		}
	};
	b.className = "profiler-charlookup-go";
	b.href = "javascript:;";
	b.onclick = g.onsubmit.bind(g);
	ae(g, d);
	ae(g, b);
	ae(e, g)
}
if (isset("mn_profiles")) {
	Menu.findItem(mn_path, [1, 5])[MENU_IDX_SUB] = mn_profiles;
	PageTemplate.getBreadcrumb().bind("update", pr_onBreadcrumbUpdate)
};