var Icon = {
	sizes: ["small", "medium", "large"],
	sizes2: [18, 36, 56],
	premiumOffsets: [
		[-56, -36],
		[-56, 0],
		[0, 0]],
	create: function (c, m, i, b, f, l) {
		var h = ce("div"),
			d = ce("ins"),
			g = ce("del");
		if (m == null) {
			m = 1
		}
		h.className = "icon" + Icon.sizes[m];
		ae(h, d);
		ae(h, g);
		Icon.setTexture(h, m, c);
		if (b) {
			var j = ce("a");
			j.href = b;
			if (b.indexOf("wowhead.com") == -1 && b.substr(0, 5) == "http:") {
				j.target = "_blank"
			}
			ae(h, j)
		} else {
			if (c) {
				var k = h.firstChild.style;
				var e = (k.backgroundImage.indexOf("/avatars/") != -1);
				if (!e) {
					h.onclick = Icon.onClick;
					var j = ce("a");
					j.href = "javascript:;";
					ae(h, j)
				}
			}
		}
		Icon.setNumQty(h, f, l);
		return h
	},
	createUser: function (d, f, c, b, a) {
		if (d == 2) {
			f = g_staticUrl + "/uploads/avatars/" + f + ".jpg"
		}
		var e = Icon.create(f, c, null, b);
		if (a) {
			e.className += " " + e.className + "-premium"
		}
		if (d == 2) {
			Icon.moveTexture(e, c, Icon.premiumOffsets[c][0], Icon.premiumOffsets[c][1], true)
		}
		return e
	},
	setTexture: function (d, c, b) {
		if (!b) {
			return
		}
		var a = d.firstChild.style;
		if (b.indexOf("/") != -1) {
			a.backgroundImage = "url(" + b + ")"
		} else {
			a.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/" + Icon.sizes[c] + "/" + b.toLowerCase() + ".jpg)"
		}
		Icon.moveTexture(d, c, 0, 0)
	},
	moveTexture: function (e, c, a, f, d) {
		var b = e.firstChild.style;
		if (a || f) {
			if (d) {
				b.backgroundPosition = a + "px " + f + "px"
			} else {
				b.backgroundPosition = (-a * Icon.sizes2[c]) + "px " + (-f * Icon.sizes2[c]) + "px"
			}
		} else {
			if (b.backgroundPosition) {
				b.backgroundPosition = ""
			}
		}
	},
	setNumQty: function (e, c, f) {
		var b = gE(e, "span");
		for (var d = 0, a = b.length; d < a; ++d) {
			if (b[d]) {
				de(b[d])
			}
		}
		if (c != null && ((c > 1 && c < 2147483647) || c.length)) {
			b = g_createGlow(c, "q1");
			b.style.right = "0";
			b.style.bottom = "0";
			b.style.position = "absolute";
			ae(e, b)
		}
		if (f != null && f > 0) {
			b = g_createGlow("(" + f + ")", "q");
			b.style.left = "0";
			b.style.top = "0";
			b.style.position = "absolute";
			ae(e, b)
		}
	},
	getLink: function (a) {
		return gE(a, "a")[0]
	},
	showIconName: function (a) {
		if (a.firstChild) {
			var c = a.firstChild.style;
			if (c.backgroundImage.length && c.backgroundImage.indexOf("http://static.wowhead.com") >= 4) {
				var d = c.backgroundImage.lastIndexOf("/"),
					b = c.backgroundImage.indexOf(".jpg");
				if (d != -1 && b != -1) {
					Icon.displayIcon(c.backgroundImage.substring(d + 1, b))
				}
			}
		}
	},
	onClick: function () {
		Icon.showIconName(this)
	},
	displayIcon: function (b) {
		if (!Dialog.templates.icondisplay) {
			var a = 364;
			switch (Locale.getId()) {
			case LOCALE_ESES:
				a = 380;
				break;
			case LOCALE_RURU:
				a = 384;
				break
			}
			Dialog.templates.icondisplay = {
				title: LANG.icon,
				width: a,
				buttons: ["original", "close"],
				fields: [{
					id: "icon",
					label: LANG.dialog_imagename,
					required: 1,
					type: "text",
					labelAlign: "left",
					compute: function (e, d, c, h) {
						var g = ce("div");
						h.style.width = "300px";
						g.style.position = "relative";
						g.style.cssFloat = "left";
						g.style.paddingRight = "6px";
						e.style.width = "200px";
						var f = this.iconDiv = ce("div");
						f.style.position = "absolute";
						f.style.top = "-12px";
						f.style.right = "-70px";
						f.update = function () {
							setTimeout(function () {
								e.focus();
								e.select()
							},
							10);
							ee(f);
							ae(f, Icon.create(e.value, 2))
						};
						ae(f, Icon.create(d, 2));
						ae(g, f);
						ae(g, e);
						ae(h, g)
					}
				},
				{
					id: "location",
					label: " ",
					required: 1,
					type: "caption",
					compute: function (h, g, e, d, f) {
						ee(d);
						d.style.padding = "3px 3px 0 3px";
						d.style.lineHeight = "17px";
						d.style.whiteSpace = "normal";
						var j = ce("div");
						j.style.position = "relative";
						j.style.width = "250px";
						var c = ce("span");
						var i = LANG.dialog_seeallusingicon;
						i = i.replace("$1", '<a href="/items?filter=cr=142;crs=0;crv=' + this.data.icon + '">' + LANG.types[3][3] + "</a>");
						i = i.replace("$2", '<a href="/spells?filter=cr=15;crs=0;crv=' + this.data.icon + '">' + LANG.types[6][3] + "</a>");
						i = i.replace("$3", '<a href="/achievements?filter=cr=10;crs=0;crv=' + this.data.icon + '">' + LANG.types[10][3] + "</a>");
						c.innerHTML = i;
						ae(j, c);
						ae(d, j)
					}
				}],
				onInit: function (c) {
					this.updateIcon = this.template.updateIcon.bind(this, c)
				},
				onShow: function (c) {
					this.updateIcon();
					if (location.hash && location.hash.indexOf("#icon") == -1) {
						this.oldHash = location.hash
					} else {
						this.oldHash = ""
					}
					var d = "#icon";
					var e = (isset("g_pageInfo") && g_pageInfo.type && in_array([3, 6, 10], g_pageInfo.type) == -1);
					if (!e) {
						d += ":" + this.data.icon
					}
					location.hash = d
				},
				onHide: function (c) {
					if (this.oldHash) {
						location.hash = this.oldHash
					} else {
						location.hash = "#."
					}
				},
				updateIcon: function (c) {
					this.iconDiv.update()
				},
				onSubmit: function (f, e, c, d) {
					if (c == "original") {
						var g = window.open("http://static.wowhead.com/images/wow/icons/large/" + e.icon.toLowerCase() + ".jpg", "_blank");
						g.focus();
						return false
					}
					return true
				}
			}
		}
		if (!Icon.icDialog) {
			Icon.icDialog = new Dialog()
		}
		Icon.icDialog.show("icondisplay", {
			data: {
				icon: b
			}
		})
	},
	checkPound: function () {
		if (location.hash && location.hash.indexOf("#icon") == 0) {
			var b = location.hash.split(":");
			var a = false;
			if (b.length == 2) {
				a = b[1]
			} else {
				if (b.length == 1 && isset("g_pageInfo")) {
					switch (g_pageInfo.type) {
					case 3:
						a = g_items[g_pageInfo.typeId].icon.toLowerCase();
						break;
					case 6:
						a = g_spells[g_pageInfo.typeId].icon.toLowerCase();
						break;
					case 10:
						a = g_achievements[g_pageInfo.typeId].icon.toLowerCase();
						break;
					case 16:
						a = g_gatheredstatistics[g_pageInfo.typeId].icon.toLowerCase();
						break
					}
				}
			}
			if (a) {
				Icon.displayIcon(a)
			}
		}
	}
};
$(document).ready(Icon.checkPound);
