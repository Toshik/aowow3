var MARKUP_MODE_COMMENT = 1,
	MARKUP_MODE_ARTICLE = 2,
	MARKUP_MODE_QUICKFACTS = 3,
	MARKUP_MODE_SIGNATURE = 4,
	MARKUP_CLASS_ADMIN = 40,
	MARKUP_CLASS_STAFF = 30,
	MARKUP_CLASS_PREMIUM = 20,
	MARKUP_CLASS_USER = 10;
var MARKUP_SOURCE_LIVE = 1,
	MARKUP_SOURCE_PTR = 2,
	MARKUP_SOURCE_BETA = 3;
var MarkupModeMap = {};
MarkupModeMap[MARKUP_MODE_COMMENT] = "comment";
MarkupModeMap[MARKUP_MODE_ARTICLE] = "article";
MarkupModeMap[MARKUP_MODE_QUICKFACTS] = "quickfacts";
MarkupModeMap[MARKUP_MODE_SIGNATURE] = "signature";
var MarkupSourceMap = {};
MarkupSourceMap[MARKUP_SOURCE_LIVE] = "live";
MarkupSourceMap[MARKUP_SOURCE_PTR] = "ptr";
MarkupSourceMap[MARKUP_SOURCE_BETA] = "beta";
var Markup = {
	MODE_COMMENT: MARKUP_MODE_COMMENT,
	MODE_ARTICLE: MARKUP_MODE_ARTICLE,
	MODE_QUICKFACTS: MARKUP_MODE_QUICKFACTS,
	MODE_SIGNATURE: MARKUP_MODE_SIGNATURE,
	SOURCE_LIVE: MARKUP_SOURCE_LIVE,
	SOURCE_PTR: MARKUP_SOURCE_PTR,
	SOURCE_BETA: MARKUP_SOURCE_BETA,
	CLASS_ADMIN: MARKUP_CLASS_ADMIN,
	CLASS_STAFF: MARKUP_CLASS_STAFF,
	CLASS_PREMIUM: MARKUP_CLASS_PREMIUM,
	CLASS_USER: MARKUP_CLASS_USER,
	rolesToClass: function (a) {
		if (a & U_GROUP_ADMIN) {
			return Markup.CLASS_ADMIN
		} else {
			if (a & U_GROUP_STAFF) {
				return Markup.CLASS_STAFF
			} else {
				if (a & U_GROUP_PREMIUM) {
					return Markup.CLASS_PREMIUM
				} else {
					return Markup.CLASS_USER
				}
			}
		}
	},
	defaultSource: false,
	nameCol: "name_enus",
	domainToLocale: {
		www: "enus",
		ptr: "ptr",
		beta: "beta",
		cata: "beta",
		fr: "frfr",
		de: "dede",
		es: "eses",
		ru: "ruru"
	},
	maps: [],
	firstTags: {},
	postTags: [],
	collectTags: {},
	excludeTags: {},
	tooltipTags: {},
	attributes: {
		id: {
			req: false,
			valid: /^[a-z0-9_-]+$/i
		},
		title: {
			req: false,
			valid: /[\S ]+/
		},
		"class": {
			req: false,
			valid: /\S+/
		}
	},
	tags: {
		"<text>": {
			empty: true,
			toHtml: function (b, a) {
				a = a || $.noop;
				if (b._text == " " && !a.noNbsp) {
					b._text = "&nbsp;"
				}
				b._text = b._text.replace(/\\\[/g, "[");
				if (a && a.noLink) {
					return b._text
				} else {
					if (a && a.needsRaw) {
						return b._rawText
					} else {
						var d = [];
						var e = Markup._preText(b._rawText.replace(/(https?:\/\/|www\.)([\/_a-z0-9\%\?#@\-\+~&=;:']|\.[a-z0-9\-])+/gi, function (f) {
							matchUrl = Markup._preText(f.replace(/^www/, "http://www"));
							f = Markup._preText(f);
							var g = d.length;
							d.push([matchUrl, f]);
							return "$L" + g
						}));
						e = e.replace(/\$L([\d+]) /gi, "$L$1&nbsp;");
						for (var c in d) {
							e = e.replace("$L" + c, function (g) {
								var f = '<a href="' + d[c][0] + '"';
								if (Markup._isUrlExternal(d[c][0])) {
									f += ' target="_blank"'
								}
								f += ">" + d[c][1] + "</a>";
								return f
							})
						}
						return e
					}
				}
			},
			toText: function (a) {
				return a._text
			}
		},
		achievement: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var f = a.unnamed;
				var e = Markup._getDatabaseDomainInfo(a);
				var c = e[0];
				var d = e[1];
				if (g_achievements[f] && g_achievements[f][d]) {
					var b = g_achievements[f];
					return '<a href="' + c + "/achievement=" + f + '" class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + b.icon.toLowerCase() + '.gif)"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
				}
				return '<a href="' + c + "/achievement=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[10][0] + " #" + f + ")</a>"
			},
			toText: function (a) {
				var e = a.unnamed;
				var d = Markup._getDatabaseDomainInfo(a);
				var b = d[0];
				var c = d[1];
				if (g_achievements[e] && g_achievements[e][c]) {
					return Markup._safeHtml(g_achievements[e][c])
				}
				return LANG.types[10][0] + " #" + e
			}
		},
		achievementpoints: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var b = '<span class="moneyachievement tip" onmouseover="Listview.funcBox.moneyAchievementOver(event)" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()"' + Markup._addGlobalAttributes(a) + ">" + a.unnamed + "</span>";
				return b
			}
		},
		anchor: {
			empty: true,
			ltrim: true,
			rtrim: true,
			attr: {
				unnamed: {
					req: false,
					valid: /\S+/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if (!a.unnamed && !a.id) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				if (a.unnamed) {
					a.id = a.unnamed
				}
				return "<span" + Markup._addGlobalAttributes(a) + "></span>"
			}
		},
		b: {
			empty: false,
			toHtml: function (a) {
				return ["<b" + Markup._addGlobalAttributes(a) + ">", "</b>"]
			}
		},
		blip: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /\S+/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var b = "http://blip.tv/play/" + a.unnamed;
				var d = 600;
				var e = 368;
				var c = "";
				c += '<object width="' + d + '" height="' + e + '"' + Markup._addGlobalAttributes(a) + '><param name="movie" value="' + b + '">';
				c += '<param name="allowfullscreen" value="true"></param>';
				c += '<param name="allowscriptaccess" value="always"></param>';
				c += '<param name="wmode" value="opaque"></param>';
				c += '<embed width="' + d + '" height="' + e + '" src="' + b + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque"></embed>';
				c += "</object>";
				return c
			}
		},
		br: {
			empty: true,
			toHtml: function (a) {
				return "<br />"
			}
		},
		"class": {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				if (a.unnamed >= 1 && a.unnamed <= 11 && a.unnamed != 10) {
					return true
				}
				return false
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var f = a.unnamed;
				var e = Markup._getDatabaseDomainInfo(a);
				var c = e[0];
				var d = e[1];
				if (g_classes[f] && g_classes[f][d]) {
					var b = g_classes[f];
					return '<a href="' + c + "/class=" + f + '" class="icontiny c' + f + '" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + g_classes.getIcon(f) + '.gif)"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
				}
				return '<a href="' + c + "/class=" + f + '" class="c' + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[13][0] + " #" + f + ")</a>"
			},
			toText: function (a) {
				var d = a.unnamed;
				var c = Markup._getDatabaseDomainInfo(a);
				var b = c[1];
				if (g_classes[d] && g_classes[d][b]) {
					return Markup._safeHtml(g_classes[d][b])
				}
				return LANG.types[13][0] + " #" + d
			}
		},
		code: {
			block: true,
			empty: false,
			rtrim: true,
			itrim: true,
			allowedChildren: {
				"<text>": 1
			},
			toHtml: function (a) {
				var b = '<pre class="code';
				if (a.first) {
					b += " first"
				}
				if (a.last) {
					b += " last"
				}
				b += '"' + Markup._addGlobalAttributes(a) + ">";
				return [b, "</pre>"]
			}
		},
		color: {
			empty: false,
			attr: {
				unnamed: {
					req: true,
					valid: /^.*/i
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			extraColors: {
				deathknight: "c6",
				dk: "c6",
				druid: "c11",
				hunter: "c3",
				mage: "c8",
				palading: "c2",
				priest: "c5",
				rogue: "c4",
				shaman: "c7",
				warlock: "c9",
				warrior: "c1",
				poor: "q0",
				common: "q1",
				uncommon: "q2",
				rare: "q3",
				epic: "q4",
				legendary: "q5",
				artifact: "q6",
				heirloom: "q7"
			},
			toHtml: function (a) {
				var c = /^(aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|purple|red|silver|teal|white|yellow|c\d+|r\d+|q\d*?|#[a-f0-9]{6})$/i;
				var d = "<span ";
				if (a.unnamed.match(c)) {
					var b = a.unnamed.charAt(0);
					d += ((b == "q" || b == "c" || (b == "r" && a.unnamed != "red")) ? 'class="' : 'style="color: ') + a.unnamed + '"' + Markup._addGlobalAttributes(a)
				} else {
					if (Markup.tags.color.extraColors[a.unnamed]) {
						d += 'class = "' + Markup.tags.color.extraColors[a.unnamed] + '"'
					}
				}
				d += ">";
				return [d, "</span>"]
			}
		},
		db: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^(live|ptr|beta|cata)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				if (a.unnamed == "live") {
					Markup.defaultSource = Markup.SOURCE_LIVE
				} else {
					if (a.unnamed == "ptr") {
						Markup.defaultSource = Markup.SOURCE_PTR
					} else {
						if (a.unnamed == "beta" || a.unnamed == "cata") {
							Markup.defaultSource = Markup.SOURCE_BETA
						}
					}
				}
				return ""
			}
		},
		div: {
			empty: false,
			block: true,
			ltrim: true,
			rtrim: true,
			itrim: true,
			attr: {
				clear: {
					req: false,
					valid: /^(left|right|both)$/i
				},
				unnamed: {
					req: false,
					valid: /^hidden$/i
				},
				"float": {
					req: false,
					valid: /^(left|right)$/i
				},
				align: {
					req: false,
					valid: /^(left|right|center)$/i
				},
				margin: {
					req: false,
					valid: /^\d+$/
				},
				width: {
					req: false,
					valid: /^[0-9]+(px|em|\%)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var d = "<div" + Markup._addGlobalAttributes(a);
				var b = [];
				var c = [];
				if (a.clear) {
					b.push("clear: " + a.clear)
				}
				if (a.unnamed) {
					b.push("display: none")
				}
				if (a.width) {
					b.push("width: " + a.width)
				}
				if (a["float"]) {
					b.push("float: " + a["float"]);
					if (a.margin === undefined) {
						if (a["float"] == "left") {
							b.push("margin: 0 10px 10px 0")
						} else {
							b.push("margin: 0 0 10px 10px")
						}
					}
				}
				if (a.align) {
					b.push("text-align: " + a.align)
				}
				if (a.margin) {
					b.push("margin: " + a.margin)
				}
				if (a.first) {
					c.push("first")
				}
				if (a.last) {
					c.push("last")
				}
				if (b.length > 0) {
					d += ' style="' + b.join(";") + '"'
				}
				if (c.length > 0) {
					d += ' class="' + c.join(" ") + '"'
				}
				d += ">";
				return [d, "</div>"]
			}
		},
		event: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var f = a.unnamed;
				var e = Markup._getDatabaseDomainInfo(a);
				var c = e[0];
				var d = e[1];
				if (g_holidays[f] && g_holidays[f][d]) {
					var b = g_holidays[f];
					return '<a href="' + c + "/event=" + f + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
				}
				return '<a href="' + c + "/event=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[12][0] + " #" + f + ")</a>"
			},
			toText: function (a) {
				var d = a.unnamed;
				var c = Markup._getDatabaseDomainInfo(a);
				var b = c[1];
				if (g_holidays[d] && g_holidays[d][b]) {
					return Markup._safeHtml(g_holidays[d][b])
				}
				return LANG.types[12][0] + " #" + d
			}
		},
		faction: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var f = a.unnamed;
				var e = Markup._getDatabaseDomainInfo(a);
				var b = e[0];
				var c = e[1];
				if (g_factions[f] && g_factions[f][c]) {
					var d = g_factions[f];
					return '<a href="' + b + "/faction=" + f + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(d[c]) + "</a>"
				}
				return '<a href="' + b + "/faction=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[8][0] + " #" + f + ")</a>"
			},
			toText: function (a) {
				var d = a.unnamed;
				var c = Markup._getDatabaseDomainInfo(a);
				var b = c[1];
				if (g_factions[d] && g_factions[d][b]) {
					return Markup._safeHtml(g_factions[d][b])
				}
				return LANG.types[8][0] + " #" + d
			}
		},
		feedback: {
			empty: true,
			allowedClass: MARKUP_CLASS_STAFF,
			attr: {
				mailto: {
					req: false,
					valid: /^true$/i
				}
			},
			toHtml: function (a) {
				return '<b><span class="icontiny" style="background-image: url(' + g_staticUrl + '/images/icons/email.gif)"><a href="' + (a.mailto ? "mailto:feedback@wowhead.com" : 'javascript:;" onclick="ContactTool.show();') + '">feedback@wowhead.com</a></span></b>'
			}
		},
		hr: {
			empty: true,
			trim: true,
			toHtml: function (a) {
				return "<hr />"
			}
		},
		h2: {
			block: true,
			empty: false,
			ltrim: true,
			rtrim: true,
			itrim: true,
			allowedClass: MARKUP_CLASS_STAFF,
			attr: {
				unnamed: {
					req: false,
					valid: /^first$/i
				},
				clear: {
					req: false,
					valid: /^(true|both|left|right)$/i
				},
				toc: {
					req: false,
					valid: /^false$/i
				}
			},
			toHtml: function (a) {
				if (!a.id) {
					a.id = g_urlize(a._textContents)
				}
				str = "<h2" + Markup._addGlobalAttributes(a);
				var b = [];
				if (a.first || a.unnamed) {
					b.push("first")
				}
				if (a.last) {
					b.push("last")
				}
				if (b.length > 0) {
					str += ' class="' + b.join(" ") + '"'
				}
				if (a.clear) {
					if (a.clear == "true" || a.clear == "both") {
						str += ' style="clear: both"'
					} else {
						str += ' style="clear: ' + a.clear + '"'
					}
				}
				return [str + ">", "</h2>"]
			}
		},
		h3: {
			block: true,
			empty: false,
			ltrim: true,
			rtrim: true,
			itrim: true,
			attr: {
				unnamed: {
					req: false,
					valid: /^first$/i
				},
				toc: {
					req: false,
					valid: /^false$/i
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				if (!a.id) {
					a.id = g_urlize(a._textContents)
				}
				var c = "<h3" + Markup._addGlobalAttributes(a);
				var b = [];
				if (a.first || a.unnamed) {
					b.push("first")
				}
				if (a.last) {
					b.push("last")
				}
				if (b.length > 0) {
					c += ' class="' + b.join(" ") + '"'
				}
				return [c + ">", "</h3>"]
			}
		},
		html: {
			empty: false,
			allowedClass: MARKUP_CLASS_ADMIN,
			allowedChildren: {
				"<text>": 1
			},
			rawText: true,
			taglessSkip: true,
			toHtml: function (a) {
				return [a._contents]
			}
		},
		i: {
			empty: false,
			toHtml: function (a) {
				return ["<i" + Markup._addGlobalAttributes(a) + ">", "</i>"]
			}
		},
		icon: {
			empty: false,
			itrim: true,
			attr: {
				align: {
					req: false,
					valid: /^right$/i
				},
				"float": {
					req: false,
					valid: /^(left|right)$/i
				},
				name: {
					req: false,
					valid: /\S+/
				},
				size: {
					req: false,
					valid: /^(tiny|small|medium|large)$/
				},
				unnamed: {
					req: false,
					valid: /^class$/i
				},
				url: {
					req: false,
					valid: /\S+/
				},
				preset: {
					req: false,
					valid: /\S+/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			presets: {
				boss: g_staticUrl + "/images/icons/boss.gif",
				heroic: g_staticUrl + "/images/icons/heroic.gif"
			},
			validate: function (a) {
				if (!a.name && !a.url && !a.preset) {
					return false
				}
				if (a.preset && !Markup.tags.icon.presets[a.preset]) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var c = (a.size ? a.size : "tiny");
				if (c == "tiny") {
					var f = "<span" + Markup._addGlobalAttributes(a) + ' class="';
					if (a.unnamed == undefined) {
						f += "icontiny";
						if (a.align) {
							f += "r"
						}
						var e = "";
						if (a.name) {
							e = g_staticUrl + "/images/wow/icons/tiny/" + a.name.toLowerCase() + ".gif"
						} else {
							if (a.preset) {
								e = Markup.tags.icon.presets[a.preset]
							} else {
								if (a.url && Markup._isUrlSafe(a.url)) {
									e = a.url
								} else {
									return ""
								}
							}
						}
						f += '" style="background-image: url(' + e + ')">'
					} else {
						f += a.name + '">'
					}
					return [f, "</span>"]
				} else {
					var f = "<div" + Markup._addGlobalAttributes(a) + ' onclick="Icon.showIconName(this)" class="icon' + c + (a["float"] ? '" style="float: ' + a["float"] + ';">' : '">');
					var d = {
						small: 0,
						medium: 1,
						large: 2
					};
					var b = null;
					if (a.url && Markup._isUrlSafe(a.url)) {
						b = a.url
					} else {
						if (a._textContents && Markup._isUrlSafe(a._textContents)) {
							b = a._textContents
						}
					}
					icon = Icon.create(a.name.toLowerCase(), d[c], null, b);
					f += icon.innerHTML + "</div>";
					return [f]
				}
			}
		},
		img: {
			empty: true,
			attr: {
				src: {
					req: false,
					valid: /\S+/
				},
				icon: {
					req: false,
					valid: /\S+/
				},
				id: {
					req: false,
					valid: /^[0-9]+$/
				},
				size: {
					req: false,
					valid: /^(thumb|resized|normal|large|medium|small|tiny)$/i
				},
				width: {
					req: false,
					valid: /^[0-9]+$/
				},
				height: {
					req: false,
					valid: /^[0-9]+$/
				},
				"float": {
					req: false,
					valid: /^(left|right|center)$/i
				},
				border: {
					req: false,
					valid: /^[0-9]+$/
				},
				margin: {
					req: false,
					valid: /^[0-9]+$/
				}
			},
			idSize: /^(thumb|resized|normal)$/i,
			iconSize: /^(large|medium|small|tiny)$/i,
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if (a.src) {
					return true
				} else {
					if (a.id) {
						return (a.size ? Markup.tags.img.idSize.test(a.size) : true)
					} else {
						if (a.icon) {
							return (a.size ? Markup.tags.img.iconSize.test(a.size) : true)
						}
					}
				}
				return false
			},
			toHtml: function (a) {
				var c = "<img" + Markup._addGlobalAttributes(a);
				var b = "";
				if (a.src) {
					c += ' src="' + a.src + '"'
				} else {
					if (a.id) {
						c += ' src="' + g_staticUrl + "/uploads/screenshots/" + (a.size ? a.size : "normal") + "/" + a.id + '.jpg"'
					} else {
						if (a.icon) {
							c += ' src="' + g_staticUrl + "/images/wow/icons/" + (a.size ? a.size : "large") + "/" + a.icon + '.jpg"'
						}
					}
				}
				if (a.width) {
					c += ' width="' + a.width + '"'
				}
				if (a.height) {
					c += ' height="' + a.height + '"'
				}
				if (a["float"]) {
					if (a["float"] == "center") {
						c = '<div style="text-align: center">' + c + ' style="margin: 10px auto"';
						b = "</div>"
					} else {
						c += ' style="float: ' + a["float"] + ";";
						if (!a.margin) {
							a.margin = 10
						}
						if (a["float"] == "left") {
							c += " margin: 0 " + a.margin + "px " + a.margin + 'px 0"'
						} else {
							c += " margin: 0 0 " + a.margin + "px " + a.margin + 'px"'
						}
					}
				}
				if (a.border != 0) {
					c += ' class="border"'
				}
				if (a.title) {
					c += ' alt="' + a.title + '"'
				} else {
					c += ' alt=""'
				}
				c += " />" + b;
				return c
			}
		},
		item: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				icon: {
					req: false,
					valid: /^false$/i
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var g = a.unnamed;
				var f = Markup._getDatabaseDomainInfo(a);
				var b = f[0];
				var c = f[1];
				if (g_items[g] && g_items[g][c]) {
					var d = g_items[g];
					var e = "<a" + Markup._addGlobalAttributes(a) + ' href="' + b + "/item=" + g + '" class="q' + d.quality;
					if (a.icon) {
						e += '">'
					} else {
						e += ' icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + d.icon.toLowerCase() + '.gif)">'
					}
					e += Markup._safeHtml(d[c]) + "</a>";
					return e
				}
				return '<a href="' + b + "/item=" + g + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[3][0] + " #" + g + ")</a>"
			},
			toText: function (a) {
				var d = a.unnamed;
				var c = Markup._getDatabaseDomainInfo(a);
				var b = c[1];
				if (g_items[d] && g_items[d][b]) {
					return Markup._safeHtml(g_items[d][b])
				}
				return LANG.types[3][0] + " #" + d
			}
		},
		itemset: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^-?[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var f = a.unnamed;
				var d = Markup._getDatabaseDomainInfo(a);
				var b = d[0];
				var c = d[1];
				if (g_itemsets[f] && g_itemsets[f][c]) {
					var e = g_itemsets[f];
					return '<a href="' + b + "/itemset=" + f + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(e[c]) + "</a>"
				}
				return '<a href="' + b + "/itemset=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[4][0] + " #" + f + ")</a>"
			},
			toText: function (a) {
				var d = a.unnamed;
				var c = Markup._getDatabaseDomainInfo(a);
				var b = c[1];
				if (g_itemsets[d] && g_itemsets[d][b]) {
					return Markup._safeHtml(g_itemsets[d][b])
				}
				return LANG.types[4][0] + " #" + d
			}
		},
		li: {
			empty: false,
			itrim: true,
			allowedParents: {
				ul: 1,
				ol: 1
			},
			toHtml: function (a) {
				return ["<li" + Markup._addGlobalAttributes(a) + "><div>", "</div></li>"]
			}
		},
		lightbox: {
			empty: false,
			allowedClass: MARKUP_CLASS_STAFF,
			attr: {
				unnamed: {
					req: true,
					valid: /^(map|model|screenshot)$/
				},
				zone: {
					req: false,
					valid: /^-?[0-9]+[a-z]?$/i
				},
				floor: {
					req: false,
					valid: /^[0-9]+$/
				},
				pins: {
					req: false,
					valid: /^[0-9]+$/
				}
			},
			validate: function (a) {
				switch (a.unnamed) {
				case "map":
					if (a.zone) {
						return true
					}
					break;
				case "model":
					break;
				case "screenshot":
					break
				}
				return false
			},
			toHtml: function (a) {
				var b = "";
				var c = "";
				switch (a.unnamed) {
				case "map":
					b = "/maps=" + a.zone;
					if (a.floor) {
						b += "." + a.floor
					}
					if (a.pins) {
						b += ":" + a.pins
					}
					var d = b.substr(6);
					c = "if(!g_isLeftClick(event)) return; MapViewer.show({ link: '" + d + "' }); return false;";
					break
				}
				if (b && c) {
					return ['<a href="' + b + '" onclick="' + c + '"' + Markup._addGlobalAttributes(a) + ">", "</a>"]
				}
				return ""
			}
		},
		map: {
			empty: false,
			attr: {
				zone: {
					req: true,
					valid: /^-?[0-9]+[a-z]?$/i
				},
				source: {
					req: false,
					valid: /\S+/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			allowedChildren: {
				pin: 1
			},
			toHtml: function (b) {
				var a = b._contents;
				b.id = "dsgdfngjkfdg" + (Markup.maps.length);
				var c = "<div" + Markup._addGlobalAttributes(b) + '></div><div style="clear: left"></div>';
				Markup.maps.push([b.id, b.zone, a]);
				return [c]
			}
		},
		pin: {
			empty: false,
			attr: {
				url: {
					req: false,
					valid: /\S+/
				},
				type: {
					req: false,
					valid: /^[0-9]+$/
				},
				x: {
					req: true,
					valid: /^[0-9]{1,2}(\.[0-9])?$/
				},
				y: {
					req: true,
					valid: /^[0-9]{1,2}(\.[0-9])?$/
				}
			},
			taglessSkip: true,
			allowedClass: MARKUP_CLASS_STAFF,
			allowedParents: {
				map: 1
			},
			toHtml: function (a) {
				if (a.url && !Markup._isUrlSafe(a.url)) {
					a.url = ""
				}
				var b = a._contents;
				if (a.url && a.url.indexOf("npc=") != -1) {
					b = '<b class="q">' + b + '</b><br /><span class="q2">Click to view this NPC</span>'
				}
				return [[parseFloat(a.x || 0), parseFloat(a.y || 0), {
					label: b,
					url: a.url,
					type: a.type
				}]]
			}
		},
		markupdoc: {
			empty: true,
			attr: {
				tag: {
					req: false,
					valid: /[a-z0-9]+/i
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if (a.tag && !Markup.tags[a.tag]) {
					return false
				}
				return true
			},
			toHtml: function (b) {
				var c = "";
				if (b.tag) {
					c = Markup._generateTagDocs(b.tag)
				} else {
					for (var a in Markup.tags) {
						if (c != "") {
							c += '<div class="pad3"></div>'
						}
						c += Markup._generateTagDocs(a)
					}
				}
				return c
			}
		},
		menu: {
			empty: true,
			trim: true,
			ltrim: true,
			rtrim: true,
			attr: {
				tab: {
					req: true,
					valid: /^[0-9]+$/
				},
				path: {
					req: true,
					valid: /\S+/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var b = a.path.split(",");
				PageTemplate.set({
					activeTab: a.tab,
					breadcrumb: b
				})
			}
		},
		minibox: {
			empty: false,
			rtrim: true,
			itrim: true,
			attr: {
				"float": {
					req: false,
					valid: /^(left|right)$/i
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var b = "<div" + Markup._addGlobalAttributes(a) + ' class="minibox';
				if (a["float"] == "left") {
					b += " minibox-left"
				}
				b += '">';
				return [b, "</div>"]
			}
		},
		modelviewer: {
			empty: false,
			attr: {
				item: {
					req: false,
					valid: /^[0-9]+$/
				},
				object: {
					req: false,
					valid: /^[0-9]+$/
				},
				npc: {
					req: false,
					valid: /^[0-9]+$/
				},
				itemset: {
					req: false,
					valid: /^[0-9,]+$/
				},
				slot: {
					req: false,
					valid: /^[0-9]+$/
				},
				humanoid: {
					req: false,
					valid: /^1$/
				},
				"float": {
					req: false,
					valid: /^(left|right)$/i
				},
				img: {
					req: false,
					valid: /\S+/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			skipSlots: {
				4: 1,
				5: 1,
				6: 1,
				7: 1,
				8: 1,
				9: 1,
				10: 1,
				16: 1,
				19: 1,
				20: 1
			},
			toHtml: function (a) {
				var b = "";
				if (a.npc) {
					b = "<a" + Markup._addGlobalAttributes(a) + ' href="#modelviewer:1:' + a.npc + ":" + (a.humanoid ? "1" : "0") + '" onclick="ModelViewer.show({ type: 1, displayId: ' + a.npc + ", slot: " + a.slot + ", " + (a.humanoid ? "humanoid: 1, " : "") + 'displayAd: 1, fromTag: 1 });"><img alt="' + Markup._safeHtml(a._contents) + '" title="' + Markup._safeHtml(a._contents) + '" src="' + (a.img ? a.img : g_staticUrl + "/modelviewer/thumbs/npc/" + a.npc + '.png" width="150" height="150') + '" class="border" ';
					if (a["float"]) {
						b += 'style="float: ' + a["float"] + "; ";
						if (a["float"] == "left") {
							b += 'margin: 0 10px 10px 0" '
						} else {
							b += 'margin: 0 0 10px 10px" '
						}
					}
					b += "/></a>";
					return [b]
				} else {
					if (a.object) {
						b = "<a" + Markup._addGlobalAttributes(a) + ' href="#modelviewer:2:' + a.object + '" onclick="ModelViewer.show({ type: 2, displayId: ' + a.object + ', displayAd: 1, fromTag: 1 });"><img alt="' + Markup._safeHtml(a._contents) + '" title="' + Markup._safeHtml(a._contents) + '" src="' + (a.img ? a.img : g_staticUrl + "/modelviewer/thumbs/obj/" + a.object + '.png" width="150" height="150') + '" class="border" ';
						if (a["float"]) {
							b += 'style="float: ' + a["float"] + "; ";
							if (a["float"] == "left") {
								b += 'margin: 0 10px 10px 0" '
							} else {
								b += 'margin: 0 0 10px 10px" '
							}
						}
						b += "/></a>";
						return [b]
					} else {
						if (a.item && a.slot) {
							b = "<a" + Markup._addGlobalAttributes(a) + ' href="#modelviewer:3:' + a.item + ":" + a.slot + '" onclick="ModelViewer.show({ type: 3, displayId: ' + a.item + ", slot: " + a.slot + ', displayAd: 1, fromTag: 1 });"><img alt="' + Markup._safeHtml(a._contents) + '" title="' + Markup._safeHtml(a._contents) + '" src="' + (a.img ? a.img : g_staticUrl + "/modelviewer/thumbs/item/" + a.item + '.png" width="150" height="150') + '" class="border" ';
							if (a["float"]) {
								b += 'style="float: ' + a["float"] + "; ";
								if (a["float"] == "left") {
									b += 'margin: 0 10px 10px 0" '
								} else {
									b += 'margin: 0 0 10px 10px" '
								}
							}
							b += "/></a>";
							return [b]
						} else {
							if (a.itemset) {
								b = "<a" + Markup._addGlobalAttributes(a) + ' href="javascript:;" onclick="ModelViewer.show({ type: 4, equipList: [' + a.itemset + '], displayAd: 1, fromTag: 1 });">'
							} else {
								return ["[modelviewer]", "[/modelviewer]"]
							}
						}
					}
				}
				return [b, "</a>"]
			}
		},
		money: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				honor: {
					req: false,
					valid: /\S+/
				},
				arena: {
					req: false,
					valid: /^[0-9]+$/
				},
				items: {
					req: false,
					valid: /^[0-9,]+$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var b = [];
				if (a.items) {
					var d = a.items.split(",");
					if (d.length >= 2) {
						for (var c = 0; c < d.length - 1; c += 2) {
							b.push([d[c], d[c + 1]])
						}
					}
				}
				return g_getMoneyHtml2(a.unnamed, a.honor, a.arena, b)
			}
		},
		npc: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var f = a.unnamed;
				var e = Markup._getDatabaseDomainInfo(a);
				var c = e[0];
				var d = e[1];
				if (g_npcs[f] && g_npcs[f][d]) {
					var b = g_npcs[f];
					return '<a href="' + c + "/npc=" + f + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
				}
				return '<a href="' + c + "/npc=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[1][0] + " #" + f + ")</a>"
			},
			toText: function (a) {
				var d = a.unnamed;
				var c = Markup._getDatabaseDomainInfo(a);
				var b = c[1];
				if (g_npcs[d] && g_npcs[d][b]) {
					return Markup._safeHtml(g_npcs[d][b])
				}
				return LANG.types[1][0] + " #" + d
			}
		},
		object: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var f = a.unnamed;
				var e = Markup._getDatabaseDomainInfo(a);
				var b = e[0];
				var c = e[1];
				if (g_objects[f] && g_objects[f][c]) {
					var d = g_objects[f];
					return '<a href="' + b + "/object=" + f + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(d[c]) + "</a>"
				}
				return '<a href="' + b + "/object=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[2][0] + " #" + f + ")</a>"
			},
			toText: function (a) {
				var d = a.unnamed;
				var c = Markup._getDatabaseDomainInfo(a);
				var b = c[1];
				if (g_objects[d] && g_objects[d][b]) {
					return Markup._safeHtml(g_objects[d][b])
				}
				return LANG.types[2][0] + " #" + d
			}
		},
		ol: {
			block: true,
			empty: false,
			ltrim: true,
			rtrim: true,
			itrim: true,
			allowedChildren: {
				li: 1
			},
			toHtml: function (a) {
				var b = "<ol";
				var c = [];
				if (a.first) {
					c.push("first")
				}
				if (a.last) {
					c.push("last")
				}
				if (c.length > 0) {
					b += ' class="' + c.join(" ") + '"'
				}
				b += Markup._addGlobalAttributes(a) + ">";
				return [b, "</ol>"]
			}
		},
		p: {
			empty: false,
			ltrim: true,
			rtrim: true,
			itrim: true,
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				return ['<p style="line-height: 1.4em; margin: 1em 0px 0px 0px;"' + Markup._addGlobalAttributes(a) + ">", "</p>"]
			}
		},
		pad: {
			empty: true,
			block: true,
			trim: true,
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var b = '<div class="pad';
				if (a.first) {
					b += " first"
				}
				if (a.last) {
					b += " last"
				}
				b += '"' + Markup._addGlobalAttributes(a) + "></div>";
				return b
			}
		},
		pet: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var f = a.unnamed;
				var e = Markup._getDatabaseDomainInfo(a);
				var b = e[0];
				var c = e[1];
				if (g_pet_families && g_pet_families[f] && g_pets && g_pets[f]) {
					var d = '<span class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + g_pets[f]["icon"].toLowerCase() + '.gif)">';
					d += '<a href="' + b + "/pet=" + f + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(g_pet_families[f]) + "</a></span>";
					return d
				}
				return '<a href="' + b + "/pet=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[9][0] + " #" + f + ")</a>"
			},
			toText: function (a) {
				var b = a.unnamed;
				if (g_pet_families && g_pet_families[b]) {
					return Markup._safeHtml(g_pet_families[b])
				}
				return LANG.types[9][0] + " #" + b
			}
		},
		pre: {
			empty: false,
			block: true,
			rtrim: true,
			toHtml: function (a) {
				var b = '<pre class="code';
				if (a.first) {
					b += " first"
				}
				if (a.last) {
					b += " last"
				}
				b += '"' + Markup._addGlobalAttributes(a) + ">";
				return [b, "</pre>"]
			}
		},
		quest: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var f = a.unnamed;
				var e = Markup._getDatabaseDomainInfo(a);
				var c = e[0];
				var d = e[1];
				if (g_quests[f] && g_quests[f][d]) {
					var b = g_quests[f];
					return '<a href="' + c + "/quest=" + f + '" class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + (b.daily ? "quest_start_daily" : "quest_start") + '.gif)"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
				}
				return '<a href="' + c + "/quest=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[5][0] + " #" + f + ")</a>"
			},
			toText: function (a) {
				var d = a.unnamed;
				var c = Markup._getDatabaseDomainInfo(a);
				var b = c[1];
				if (g_quests[d] && g_quests[d][b]) {
					return Markup._safeHtml(g_quests[d][b])
				}
				return LANG.types[5][0] + " #" + d
			}
		},
		quote: {
			block: true,
			empty: false,
			rtrim: true,
			ltrim: true,
			itrim: true,
			attr: {
				unnamed: {
					req: false,
					valid: /[\S ]+/
				},
				url: {
					req: false,
					valid: /\S+/
				},
				blizzard: {
					req: false,
					valid: /^true$/
				},
				display: {
					req: false,
					valid: /^block$/
				},
				align: {
					req: false,
					valid: /^(left|right|center)$/i
				}
			},
			allowedModes: {
				article: 1,
				quickfacts: 1,
				comment: 1
			},
			validate: function (a) {
				if (a.blizzard || a.url) {
					if (Markup.allow < Markup.CLASS_STAFF) {
						return false
					}
				}
				return true
			},
			toHtml: function (a) {
				var d = "<div" + Markup._addGlobalAttributes(a);
				var b = [];
				if (a.display) {
					b.push("display: " + a.display)
				}
				if (a.align) {
					b.push("text-align: " + a.align)
				}
				if (b.length) {
					d += ' style="' + b.join("; ") + '" '
				}
				d += ' class="quote';
				if (a.first) {
					d += " first"
				}
				if (a.last) {
					d == " last"
				}
				if (a.blizzard) {
					if (a.unnamed && a.blizzard) {
						var c = a.unnamed.trim();
						if (c.length <= 0) {
							return ["", ""]
						}
						d += ' comment-blue"><small class="icon-blizzard"><b class="comment-blue">' + (a.url && Markup._isUrlSafe(a.url) ? '<a href="' + Markup._fixUrl(a.url) + '" target="_blank">' + c + "</a>" : c) + "</b> " + LANG.markup_said + '</small><div class="pad"></div>';
						return [d, "</div>"]
					}
					return ["", ""]
				} else {
					d += '">';
					if (a.unnamed) {
						var c = a.unnamed.trim();
						if (c.length > 0) {
							d += "<small><b>";
							if (a.url && Markup._isUrlSafe(a.url)) {
								d += '<a href="' + Markup._fixUrl(a.url) + '"' + (Markup._isUrlExternal(a.url) ? ' target="_blank"' : "") + ">" + c + "</a>"
							} else {
								if (g_isUsernameValid(c)) {
									d += '<a href="/user=' + c + '">' + c + "</a>"
								} else {
									d += c
								}
							}
							d += "</b> " + LANG.markup_said + '</small><div class="pad"></div>'
						}
					}
					return [d, "</div>"]
				}
			}
		},
		race: {
			empty: true,
			valid: {
				1: true,
				2: true,
				3: true,
				4: true,
				5: true,
				6: true,
				7: true,
				8: true,
				9: true,
				10: true,
				11: true,
				22: true
			},
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				gender: {
					req: false,
					valid: /^(0|1)$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				if (Markup.tags.race.valid[a.unnamed]) {
					return true
				}
				return false
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var g = a.unnamed;
				var b = a.gender | 0;
				var f = Markup._getDatabaseDomainInfo(a);
				var c = f[0];
				var e = f[1];
				if (g_races[g] && g_races[g][e]) {
					var d = g_races[g];
					return '<a href="' + c + "/race=" + g + '" class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + g_races.getIcon(g, b) + '.gif)"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(d[e]) + "</a>"
				}
				return '<a href="' + c + "/race=" + g + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[14][0] + " #" + g + ")</a>"
			},
			toText: function (a) {
				var d = a.unnamed;
				var c = Markup._getDatabaseDomainInfo(a);
				var b = c[1];
				if (g_races[d] && g_races[d][b]) {
					return Markup._safeHtml(g_races[d][b])
				}
				return LANG.types[14][0] + " #" + d
			}
		},
		s: {
			empty: false,
			toHtml: function (a) {
				return ["<del" + Markup._addGlobalAttributes(a) + ">", "</del>"]
			}
		},
		screenshot: {
			empty: false,
			attr: {
				id: {
					req: false,
					valid: /^[0-9]+$/
				},
				url: {
					req: false,
					valid: /\S+/
				},
				thumb: {
					req: false,
					valid: /\S+/
				},
				width: {
					req: false,
					valid: /^[0-9]+$/
				},
				height: {
					req: false,
					valid: /^[0-9]+$/
				},
				"float": {
					req: false,
					valid: /^(left|right)$/i
				},
				border: {
					req: false,
					valid: /^[0-9]+$/
				}
			},
			taglessSkip: true,
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if (a.url && !a.thumb) {
					return false
				} else {
					if (!a.id && !a.url) {
						return false
					}
				}
				return true
			},
			toHtml: function (a) {
				var d = "";
				var c = "";
				if (a.id) {
					d = "http://static.wowhead.com/uploads/screenshots/normal/" + a.id + ".jpg";
					var e = a.id;
					if (a.thumb && a.thumb.match(/^[0-9]+$/)) {
						e = a.thumb;
						a.thumb = null
					}
					c = g_staticUrl + "/uploads/screenshots/thumb/" + e + ".jpg"
				} else {
					if (a.url) {
						d = a.url
					}
				}
				if (a.thumb) {
					c = a.thumb
				}
				var b = a._contents.replace(/\n/g, "<br />");
				if (!g_screenshots[Markup.uid]) {
					g_screenshots[Markup.uid] = []
				}
				var f = '<a href="' + d + '" onclick="if(!g_isLeftClick(event)) return; ScreenshotViewer.show({screenshots: \'' + Markup.uid + "', pos: " + g_screenshots[Markup.uid].length + '}); return false;"' + Markup._addGlobalAttributes(a) + ">";
				f += '<img src="' + c + '" ';
				if (a.border != 0) {
					f += 'class="border" '
				}
				if (a["float"]) {
					f += 'style="float: ' + a["float"] + "; ";
					if (a["float"] == "left") {
						f += "margin: 0 10px 10px 0"
					} else {
						f += "margin: 0 0 10px 10px"
					}
					f += '" '
				}
				f += 'alt="" ';
				var g = {
					caption: b,
					width: a.width,
					height: a.height,
					noMarkup: true
				};
				if (a.id) {
					g.id = a.id
				} else {
					g.url = a.url
				}
				g_screenshots[Markup.uid].push(g);
				return [f + "/></a>"]
			}
		},
		script: {
			ltrim: true,
			rtrim: true,
			empty: false,
			allowedClass: MARKUP_CLASS_ADMIN,
			allowedChildren: {
				"<text>": 1
			},
			rawText: true,
			taglessSkip: true,
			toHtml: function (a) {
				$.globalEval(a._contents);
				return [""]
			}
		},
		skill: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var f = a.unnamed;
				var e = Markup._getDatabaseDomainInfo(a);
				var c = e[0];
				var d = e[1];
				if (g_skills[f] && g_skills[f][d]) {
					var b = g_skills[f];
					return '<a href="' + c + "/skill=" + f + '" class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + g_skills.getIcon(f) + '.gif)"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
				}
				return '<a href="' + c + "/skill=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[15][0] + " #" + f + ")</a>"
			},
			toText: function (a) {
				var d = a.unnamed;
				var c = Markup._getDatabaseDomainInfo(a);
				var b = c[1];
				if (g_skills[d] && g_skills[d][b]) {
					return Markup._safeHtml(g_skills[d][b])
				}
				return LANG.types[15][0] + " #" + d
			}
		},
		small: {
			empty: false,
			toHtml: function (a) {
				return ["<small" + Markup._addGlobalAttributes(a) + ">", "</small>"]
			}
		},
		span: {
			empty: false,
			attr: {
				unnamed: {
					req: false,
					valid: /^(hidden|invisible)$/
				},
				tooltip: {
					req: false,
					valid: /\S+/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var c = "<span" + Markup._addGlobalAttributes(a);
				var b = [];
				if (a.unnamed == "hidden") {
					b.push("display: none")
				} else {
					if (a.unnamed == "invisible") {
						b.push("visibility: hidden")
					}
				}
				if (b.length > 0) {
					c += ' style="' + b.join(";") + '"'
				}
				if (a.tooltip && Markup.tooltipTags[a.tooltip]) {
					c += " onmouseover=\"Tooltip.showAtCursor(event, Markup.tooltipTags['" + a.tooltip + '\'], 0, 0, \'q\')" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()"'
				}
				c += ">";
				return [c, "</span>"]
			}
		},
		spell: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				buff: {
					req: false,
					valid: /^true$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var f = a.unnamed;
				var e = Markup._getDatabaseDomainInfo(a);
				var c = e[0];
				var d = e[1];
				if (g_spells[f] && g_spells[f][d]) {
					var b = g_spells[f];
					return '<a href="' + c + "/spell=" + f + '" class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + b.icon.toLowerCase() + '.gif)"' + (a.buff ? " rel='buff'" : "") + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
				}
				return '<a href="' + c + "/spell=" + f + '"' + (a.buff ? " rel='buff'" : "") + ">(" + LANG.types[6][0] + " #" + f + ")</a>"
			},
			toText: function (a) {
				var d = a.unnamed;
				var c = Markup._getDatabaseDomainInfo(a);
				var b = c[1];
				if (g_spells[d] && g_spells[d][b]) {
					return Markup._safeHtml(g_spells[d][b])
				}
				return LANG.types[6][0] + " #" + d
			}
		},
		statistic: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var f = a.unnamed;
				var e = Markup._getDatabaseDomainInfo(a);
				var c = e[0];
				var d = e[1];
				if (g_gatheredstatistics[f] && g_gatheredstatistics[f][d]) {
					var b = g_gatheredstatistics[f];
					return '<a href="' + c + "/statistic=" + f + '" class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + b.icon.toLowerCase() + '.gif)"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
				}
				return '<a href="' + c + "/statistic=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[10][0] + " #" + f + ")</a>"
			},
			toText: function (a) {
				var e = a.unnamed;
				var d = Markup._getDatabaseDomainInfo(a);
				var b = d[0];
				var c = d[1];
				if (g_gatheredstatistics[e] && g_gatheredstatistics[e][c]) {
					return Markup._safeHtml(g_gatheredstatistics[e][c])
				}
				return LANG.types[10][0] + " #" + e
			}
		},
		style: {
			ltrim: true,
			rtrim: true,
			empty: false,
			allowedClass: MARKUP_CLASS_ADMIN,
			allowedChildren: {
				"<text>": 1
			},
			rawText: true,
			taglessSkip: true,
			toHtml: function (a) {
				g_addCss(a._contents);
				return [""]
			}
		},
		sub: {
			empty: false,
			toHtml: function (a) {
				return ["<sub" + Markup._addGlobalAttributes(a) + ">", "</sub>"]
			}
		},
		sup: {
			empty: false,
			toHtml: function (a) {
				return ["<sup" + Markup._addGlobalAttributes(a) + ">", "</sup>"]
			}
		},
		tabs: {
			block: true,
			empty: false,
			ltrim: true,
			rtrim: true,
			itrim: true,
			allowedClass: MARKUP_CLASS_STAFF,
			allowedChildren: {
				tab: 1
			},
			attr: {
				name: {
					req: true,
					valid: /\S+/
				},
				width: {
					req: false,
					valid: /^[0-9]+(px|em|\%)$/
				}
			},
			toHtml: function (b) {
				b.id = g_urlize(b.name);
				var a = Markup.preview;
				var f = '<div class="clear"></div><div id="dsf67g4d-' + b.id + (a ? "-preview" : "") + '"></div>';
				f += "<div";
				if (b.width) {
					f += ' style="width: ' + b.width + '"'
				}
				f += ">";
				f += '<div class="tabbed-contents">';
				var d = b._contents;
				for (var c = 0; c < d.length; ++c) {
					var e = d[c];
					f += '<div id="tab-' + b.id + "-" + e.id + '" style="display: none">';
					f += e.content;
					f += '<div class="clear"></div>';
					f += "</div>"
				}
				f += "</div>";
				f += "</div>";
				setTimeout(Markup.createTabs.bind(null, b, d, (a ? "preview" : "")), 100);
				return [f]
			}
		},
		tab: {
			block: true,
			empty: false,
			ltrim: true,
			rtrim: true,
			itrim: true,
			allowedClass: MARKUP_CLASS_STAFF,
			allowedParents: {
				tabs: 1
			},
			attr: {
				name: {
					req: true,
					valid: /[\S ]+/
				},
				icon: {
					req: false,
					valid: /\S+/
				}
			},
			toHtml: function (a) {
				a.id = g_urlize(a.name);
				a.name = str_replace(a.name, "_", " ");
				if (typeof(a["class"]) != "undefined") {
					a["class"] = str_replace(a["class"], "_", " ")
				}
				return [{
					content: a._contents,
					id: a.id,
					name: a.name,
					icon: a.icon,
					"class": a["class"]
				}]
			}
		},
		table: {
			empty: false,
			ltrim: true,
			rtrim: true,
			itrim: true,
			allowedChildren: {
				tr: 1
			},
			attr: {
				border: {
					req: false,
					valid: /^[0-9]+$/
				},
				cellspacing: {
					req: false,
					valid: /^[0-9]+$/
				},
				cellpadding: {
					req: false,
					valid: /^[0-9]+$/
				},
				width: {
					req: false,
					valid: /^[0-9]+(px|em|\%)$/
				}
			},
			toHtml: function (a) {
				var b = "<table" + Markup._addGlobalAttributes(a);
				if (a.border != undefined) {
					b += ' border="' + a.border + '"'
				}
				if (a.cellspacing != undefined) {
					b += ' cellspacing="' + a.cellspacing + '"'
				}
				if (a.cellpadding != undefined) {
					b += ' cellpadding="' + a.cellpadding + '"'
				}
				if (a.width != undefined) {
					b += ' style="width: ' + a.width + '"'
				}
				b += "><tbody>";
				return [b, "</tbody></table>"]
			}
		},
		tr: {
			empty: false,
			itrim: true,
			allowedChildren: {
				td: 1
			},
			allowedParents: {
				table: 1
			},
			toHtml: function (a) {
				return ["<tr" + Markup._addGlobalAttributes(a) + ">", "</tr>"]
			}
		},
		td: {
			empty: false,
			itrim: true,
			allowedParents: {
				tr: 1
			},
			attr: {
				align: {
					req: false,
					valid: /^(right|left|center|justify)$/i
				},
				valign: {
					req: false,
					valid: /^(top|middle|bottom|baseline)$/i
				},
				colspan: {
					req: false,
					valid: /^[0-9]+$/
				},
				rowspan: {
					req: false,
					valid: /^[0-9]+$/
				},
				width: {
					req: false,
					valid: /^[0-9]+(px|em|\%)$/
				}
			},
			toHtml: function (a) {
				var b = "<td" + Markup._addGlobalAttributes(a);
				if (a.align != undefined) {
					b += ' align="' + a.align + '"'
				}
				if (a.valign != undefined) {
					b += ' valign="' + a.valign + '"'
				}
				if (a.colspan != undefined) {
					b += ' colspan="' + a.colspan + '"'
				}
				if (a.rowspan != undefined) {
					b += ' rowspan="' + a.rowspan + '"'
				}
				if (a.width != undefined) {
					b += ' style="width: ' + a.width + '"'
				}
				b += ">";
				return [b, "</td>"]
			}
		},
		time: {
			empty: true,
			count: 0,
			attr: {
				until: {
					req: false,
					valid: /^\d+$/
				},
				since: {
					req: false,
					valid: /^\d+$/
				},
				server: {
					req: false,
					valid: /^true$/
				}
			},
			validate: function (a) {
				if (!a.until && !a.since) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var c = Markup.tags.time.count++;
				var b = '<span title="' + (new Date((a.until ? a.until : a.since) * 1000)).toLocaleString() + '" id="markupTime' + c + '">' + Markup.tags.time.getTime(a) + "</span>";
				setInterval(Markup.tags.time.updateTime.bind(null, c, a), 5000);
				return b
			},
			getTime: function (a) {
				var c;
				if (a.server) {
					c = g_serverTime.getTime() / 1000
				} else {
					c = (new Date()).getTime() / 1000
				}
				var b = 0;
				if (a.until) {
					b = a.until - c
				} else {
					b = c - a.since
				}
				if (b > 0) {
					return g_formatTimeElapsed(b)
				} else {
					return "0 " + LANG.timeunitspl[6]
				}
			},
			updateTime: function (c, a) {
				var b = ge("markupTime" + c);
				if (!b) {
					return
				}
				b.firstChild.nodeValue = Markup.tags.time.getTime(a)
			}
		},
		toc: {
			block: true,
			post: true,
			trim: true,
			ltrim: true,
			rtrim: true,
			collect: {
				h2: 1,
				h3: 1
			},
			exclude: {
				tabs: {
					h2: 1,
					h3: 1
				},
				minibox: {
					h2: 1,
					h3: 1
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			attr: {
				h3: {
					req: false,
					valid: /^false$/
				}
			},
			postHtml: function (g, a) {
				var j = "<h3";
				var d = [];
				if (g.first) {
					d.push("first")
				}
				if (g.last) {
					d.push("last")
				}
				if (d.length > 0) {
					j += ' class="' + d.join(" ") + '"'
				}
				j += Markup._addGlobalAttributes(g) + ">" + LANG.markup_toc + "</h3><ul>";
				var h = "";
				var f = 1;
				var k = (g.h3 != "false");
				var b = [];
				for (var c in a.h2) {
					b.push(a.h2[c])
				}
				for (var c in a.h3) {
					b.push(a.h3[c])
				}
				b.sort(function (l, i) {
					return l.offset - i.offset
				});
				for (var e in b) {
					c = b[e];
					if (c.name == "h2" && c.attr.toc != "false") {
						if (h == "h3") {
							j += "</ul>";
							f--
						}
						j += "<li><b><a href='#" + (c.attr.id ? g_urlize(c.attr.id) : g_urlize(c.attr._textContents)) + "'>" + c.attr._textContents + "</a></b></li>";
						h = "h2"
					}
					if (c.name == "h3" && k && c.attr.toc != "false" && (h != "" || a.h2.length == 0)) {
						if (h == "h2") {
							j += "<ul>";
							f++
						}
						j += "<li><b><a href='#" + (c.attr.id ? g_urlize(c.attr.id) : g_urlize(c.attr._textContents)) + "'>" + c.attr._textContents + "</a></b></li>";
						h = "h3"
					}
				}
				for (var e = 0; e < f; e++) {
					j += "</ul>"
				}
				return j
			}
		},
		toggler: {
			empty: false,
			attr: {
				id: {
					req: true,
					valid: /^[a-z0-9_-]+$/i
				},
				unnamed: {
					req: false,
					valid: /^hidden$/i
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var b = '<a href="javascript:;" class="disclosure-' + (a.unnamed ? "off" : "on") + '" onclick="return g_disclose(ge(\'' + a.id + "'), this)\">";
				return [b, "</a>"]
			}
		},
		tooltip: {
			empty: false,
			attr: {
				unnamed: {
					req: false,
					valid: /\S+/
				},
				name: {
					req: false,
					valid: /\S+/
				}
			},
			taglessSkip: true,
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if (!a.unnamed && !a.name) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				if (a.unnamed) {
					return ['<span class="tip" onmouseover="Tooltip.showAtCursor(event, LANG[\'' + a.unnamed + '\'], 0, 0, \'q\')" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()">', "</span>"]
				} else {
					Markup.tooltipTags[a.name] = a._contents;
					return [""]
				}
			}
		},
		u: {
			empty: false,
			toHtml: function (a) {
				return ["<ins" + Markup._addGlobalAttributes(a) + ">", "</ins>"]
			}
		},
		ul: {
			block: true,
			empty: false,
			ltrim: true,
			rtrim: true,
			itrim: true,
			allowedChildren: {
				li: 1
			},
			toHtml: function (a) {
				var b = "<ul";
				var c = [];
				if (a.first) {
					c.push("first")
				}
				if (a.last) {
					c.push("last")
				}
				if (c.length > 0) {
					b += ' class="' + c.join(" ") + '"'
				}
				b += Markup._addGlobalAttributes(a) + ">";
				return [b, "</ul>"]
			}
		},
		url: {
			empty: false,
			attr: {
				unnamed: {
					req: false,
					valid: /\S+/
				},
				rel: {
					req: false,
					valid: /(item|quest|spell|achievement|npc|object)=([0-9]+)/
				},
				onclick: {
					req: false,
					valid: /[\S ]+/
				},
				tooltip: {
					req: false,
					valid: /\S+/
				}
			},
			validate: function (a) {
				if (a.onclick && Markup.allow < Markup.CLASS_ADMIN) {
					return false
				}
				if (a.tooltip && Markup.allow < Markup.CLASS_STAFF) {
					return false
				}
				var b = "";
				if (a.unnamed && /^(mailto:|irc:)/i.test(a.unnamed.trim()) && Markup.allow < Markup.CLASS_STAFF) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var c;
				if (a.unnamed) {
					c = a.unnamed;
					c = c.replace(/&amp;/, "&");
					if (c.indexOf("http") != 0 && c.charAt(0) != "/" && c.charAt(0) != "#") {
						c = "/" + c
					}
					if (Markup._isUrlSafe(c, true)) {
						var b = "<a" + Markup._addGlobalAttributes(a) + ' href="' + Markup._fixUrl(c) + '"';
						if (Markup._isUrlExternal(c)) {
							b += ' target="_blank"'
						}
						if (a.rel) {
							b += ' rel="' + a.rel + '"'
						}
						if (a.onclick) {
							b += ' onclick="' + a.onclick + '"'
						}
						if (a.tooltip && Markup.tooltipTags[a.tooltip]) {
							b += " onmouseover=\"Tooltip.showAtCursor(event, Markup.tooltipTags['" + a.tooltip + '\'], 0, 0, \'q\')" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()"'
						}
						b += ">";
						return [b, "</a>"]
					} else {
						return ["", ""]
					}
				} else {
					c = a._textContents;
					c = c.replace(/&amp;/, "&");
					if (Markup._isUrlSafe(c)) {
						var b = "<a" + Markup._addGlobalAttributes(a) + ' href="' + Markup._fixUrl(c) + '"';
						if (Markup._isUrlExternal(c)) {
							b += ' target="_blank"'
						}
						if (a.rel) {
							b += ' rel="' + a.rel + '"'
						}
						if (a.onclick) {
							b += ' onclick="' + a.onclick + '"'
						}
						b += ">";
						return [b + c + "</a>"]
					} else {
						return ["", ""]
					}
				}
			}
		},
		video: {
			empty: true,
			attr: {
				id: {
					req: true,
					valid: /^[0-9]+$/
				},
				unnamed: {
					req: false,
					valid: /^embed$/i
				},
				"float": {
					req: false,
					valid: /^(left|right)$/i
				},
				border: {
					req: false,
					valid: /^[0-9]+$/
				}
			},
			ltrim: true,
			rtrim: true,
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				if (g_videos[a.id]) {
					var b = "",
						c = g_videos[a.id];
					if (a.unnamed) {
						if (c.videoType == 1) {
							b += Markup.toHtml("[youtube=" + c.videoId + "]")
						}
					} else {
						if (!g_videos[Markup.uid]) {
							g_videos[Markup.uid] = []
						}
						b += '<div style="position: relative; display: -moz-inline-stack; display: inline-block; zoom: 1; *display: inline"><a href="' + sprintf(vi_siteurls[c.videoType], c.videoId) + '" onclick="if(!g_isLeftClick(event)) return; VideoViewer.show({videos: \'' + Markup.uid + "', pos: " + g_videos[Markup.uid].length + '}); return false;"' + Markup._addGlobalAttributes(a) + ">";
						b += '<img src="' + sprintf(vi_thumbnails[c.videoType], c.videoId) + '" ';
						if (a.border != 0) {
							b += 'class="border" '
						}
						if (a["float"]) {
							b += 'style="float: ' + a["float"] + "; ";
							if (a["float"] == "left") {
								b += "margin: 0 10px 10px 0"
							} else {
								b += "margin: 0 0 10px 10px"
							}
							b += '" '
						}
						b += 'alt="' + Markup.removeTags(c.caption, {
							mode: Markup.MODE_SIGNATURE
						}) + '" />';
						b += '<img src="https://static.wowhead.com/images/icons/play-sm.png" style="opacity: 0.6; filter:alpha(opacity=60); position: absolute; width: 48px; height: 48px; top: 23px; left: 38px" />';
						b += "</a></div>";
						g_videos[Markup.uid].push(dO(c))
					}
					return b
				}
				return "<b>Video #" + a.id + "</b>"
			}
		},
		wowheadresponse: {
			block: true,
			empty: false,
			rtrim: true,
			ltrim: true,
			itrim: true,
			attr: {
				unnamed: {
					req: true,
					valid: /[\S ]+/
				},
				roles: {
					req: true,
					valid: /[0-9]+/
				}
			},
			allowedModes: {
				article: 1,
				quickfacts: 1,
				comment: 1
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var e = "<div" + Markup._addGlobalAttributes(a);
				var c = [];
				e += ' class="quote ';
				if (a.first) {
					e += "firstmargin "
				}
				if (a.last) {
					e == "last "
				}
				var d = a.unnamed.trim();
				if (d.length <= 0) {
					return ["", ""]
				}
				var b = "";
				if (a.roles & U_GROUP_ADMIN) {
					b = "comment-blue"
				} else {
					b = "comment-green"
				}
				if (g_customColors[d]) {
					b = "comment-" + g_customColors[d]
				}
				e += b + '"><small class="icon-wowhead"><b class="' + b + '"><a href="/user=' + d + '">' + d + "</a></b> " + LANG.markup_said + '</small><div class="pad"></div>';
				return [e, "</div>"]
			}
		},
		youtube: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /\S+/
				},
				width: {
					req: false,
					valid: /^[0-9]+$/
				},
				height: {
					req: false,
					valid: /^[0-9]+$/
				},
				autoplay: {
					req: false,
					valid: /^true$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			toHtml: function (a) {
				var b = "http://www.youtube.com/v/" + a.unnamed + "&fs=1&rel=0" + (a.autoplay ? "&autoplay=1" : "");
				var d = a.width ? a.width : 640;
				var e = a.height ? a.height : 385;
				var c = "";
				c += '<object width="' + d + '" height="' + e + '"' + Markup._addGlobalAttributes(a) + '><param name="movie" value="' + b + '">';
				c += '<param name="allowfullscreen" value="true"></param>';
				c += '<param name="allowscriptaccess" value="always"></param>';
				c += '<param name="wmode" value="opaque"></param>';
				c += '<embed width="' + d + '" height="' + e + '" src="' + b + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque"></embed>';
				c += "</object>";
				return c
			}
		},
		zone: {
			empty: true,
			attr: {
				unnamed: {
					req: true,
					valid: /^[0-9]+$/
				},
				domain: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				},
				site: {
					req: false,
					valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
				}
			},
			allowedClass: MARKUP_CLASS_STAFF,
			validate: function (a) {
				if ((a.domain || a.site) && Markup.dbpage) {
					return false
				}
				return true
			},
			toHtml: function (a) {
				var e = a.unnamed;
				var d = Markup._getDatabaseDomainInfo(a);
				var b = d[0];
				var c = d[1];
				if (g_gatheredzones[e] && g_gatheredzones[e][c]) {
					return '<a href="' + b + "/zone=" + e + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(g_gatheredzones[e][c]) + "</a>"
				}
				return '<a href="' + b + "/zone=" + e + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[7][0] + " #" + e + ")</a>"
			},
			toText: function (a) {
				var d = a.unnamed;
				var c = Markup._getDatabaseDomainInfo(a);
				var b = c[1];
				if (g_gatheredzones[d] && g_gatheredzones[d][b]) {
					return Markup._safeHtml(g_gatheredzones[d][b])
				}
				return LANG.types[7][0] + " #" + d
			}
		}
	},
	_addGlobalAttributes: function (a) {
		var b = "";
		if (a.id) {
			b += ' id="' + a.id + '"'
		}
		if (a.title) {
			b += ' title="' + Markup._safeQuotes(a.title) + '"'
		}
		if (a["class"]) {
			b += ' class="' + a["class"] + '"'
		}
		return b
	},
	_generateTagDocs: function (d) {
		var b = Markup.tags[d];
		if (!b) {
			return ""
		}
		var g = '<div><h3 class="first">Tag: [' + Markup._safeHtml(d) + "]</h3>";
		g += '<table class="grid">';
		if (b.attr) {
			g += '<tr><td align="right" width="200">Attributes:</td><td>';
			for (var c in b.attr) {
				g += '<div style="margin: 5px; display: inline-block"><table><tr><th style="background-color: #242424; font-weight: bolder" colspan="2">';
				if (c == "unnamed") {
					g += "Self ([" + d + "=???])"
				} else {
					g += c
				}
				g += "</th></tr>";
				g += '<tr><td align="right">Required:</td><td>' + (b.attr[c].req ? "Yes" : "No") + "</td></tr>";
				g += '<tr><td align="right">Valid:</td><td>' + (b.attr[c].valid ? Markup._safeHtml(b.attr[c].valid.toString()) : "--") + "</td></tr></table></div>"
			}
			g += "</td></tr>"
		}
		g += '<tr><td align="right" width="200">Has closing tag:</td><td>' + (b.empty ? "No" : "Yes") + "</td></tr>";
		g += '<tr><td align="right">Required group:</td><td>';
		if (b.allowedClass == MARKUP_CLASS_ADMIN) {
			g += "Administrator"
		} else {
			if (b.allowedClass == MARKUP_CLASS_STAFF) {
				g += "Staff"
			} else {
				if (b.allowedClass == MARKUP_CLASS_PREMIUM) {
					g += "Premium"
				} else {
					g += "None"
				}
			}
		}
		g += "</td></tr>";
		if (b.allowedChildren) {
			g += '<tr><td align="right">Allowed children:</td><td>';
			for (var e in b.allowedChildren) {
				g += Markup._safeHtml(e) + "<br />"
			}
			g += "</td></tr>"
		}
		if (b.allowedParents) {
			g += '<tr><td align="right">Allowed parents:</td><td>';
			for (var e in b.allowedParents) {
				g += Markup._safeHtml(e) + "<br />"
			}
			g += "</td></tr>"
		}
		if (b.presets) {
			g += '<tr><td align="right">Preset values:</td><td><table>';
			for (var f in b.presets) {
				g += '<tr><td align="right">' + f + "</td><td>" + Markup._safeHtml(b.presets[f]) + "</td></tr>"
			}
			g += "</table></td></tr>"
		}
		if (b.trim) {
			g += '<tr><td colspan="2">Trim whitespace</td></tr>'
		}
		if (b.ltrim) {
			g += '<tr><td colspan="2">Trim preceding whitespace</td></tr>'
		}
		if (b.rtrim) {
			g += '<tr><td colspan="2">Trim following whitespace</td></tr>'
		}
		if (b.itrim) {
			g += '<tr><td colspan="2">Trim whitespace around interior content</td></tr>'
		}
		if (b.block) {
			g += '<tr><td colspan="2">Automatically remove top padding if not the first item</td></tr>'
		}
		g += "</table></div>";
		return g
	},
	_init: function () {
		if (!this.inited) {
			var b = [],
				c = [],
				e = [];
			for (var a in Markup.tags) {
				if (Markup.tags[a].block) {
					this.firstTags[a] = true
				}
				if (Markup.tags[a].exclude) {
					for (var d in Markup.tags[a].exclude) {
						if (!this.excludeTags[d]) {
							this.excludeTags[d] = {}
						}
						this.excludeTags[d][a] = Markup.tags[a].exclude[d]
					}
				}
				if (Markup.tags[a].post) {
					this.postTags.push(a)
				}
				if (Markup.tags[a].trim) {
					e.push(a)
				}
				if (Markup.tags[a].ltrim) {
					b.push(a)
				}
				if (Markup.tags[a].rtrim) {
					c.push(a)
				}
			}
			if (b.length > 0) {
				this.ltrimRegex = new RegExp("\\s*\\[(" + b.join("|") + ")([^a-z0-9]+.*)?]", "ig")
			}
			if (c.length > 0) {
				this.rtrimRegex = new RegExp("\\[/(" + c.join("|") + ")\\]\\s*", "ig")
			}
			if (e.length > 0) {
				this.trimRegex = new RegExp("\\s*\\[(" + e.join("|") + ")([^\\[]*)?\\]\\s*", "ig")
			}
			this.inited = true
		}
	},
	_safeJsString: function (a) {
		return a.replace(/'/g, "'")
	},
	_safeQuotes: function (a) {
		return a.replace('"', '"').replace("'", "'")
	},
	_safeHtml: function (a) {
		var b = ["nbsp", "ndash"];
		a = a.replace(/&/g, "&amp;");
		if (b.length > 0) {
			a = a.replace(new RegExp("&amp;(" + b.join("|") + ");", "g"), "&$1;")
		}
		return a.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
	},
	_preText: function (a) {
		a = Markup._safeHtml(a);
		a = a.replace(/\n/g, "<br />");
		return a
	},
	_getDatabaseDomainInfo: function (b) {
		var c = "";
		var d = Markup.nameCol;
		var a = false;
		if (b.domain) {
			a = b.domain
		} else {
			if (b.site) {
				a = b.site
			} else {
				if (Markup.defaultSource) {
					a = MarkupSourceMap[Markup.defaultSource]
				}
			}
		}
		if (a) {
			if (a == "beta") {
				a = "cata"
			}
			c = "http://" + a + ".wowhead.com";
			d = "name_" + Markup.domainToLocale[a]
		}
		return [c, d]
	},
	_isUrlSafe: function (d, a) {
		if (!d) {
			return true
		}
		if (d == "javascript:;") {
			return true
		}
		var b = d.match(/^([^:\\./]+):/i);
		if (b && b[1]) {
			var c = b[1];
			if (c == "http" || c == "https") {
				return true
			}
			if (a && (c == "mailto" || c == "irc")) {
				return true
			}
			if (c != "mailto" && d.indexOf("://") == -1) {
				return true
			}
			return false
		}
		return true
	},
	_fixUrl: function (a) {
		if (!a) {
			return ""
		}
		var b = a.charAt(0);
		if (b == "/" || b == "?") {
			a = a.replace(/^[\/\?]+/, "");
			a = "/" + a
		}
		return a
	},
	_isUrlExternal: function (a) {
		if (!a) {
			return false
		}
		return (a.indexOf("wowhead.com") == -1 && a.match(/^https?:/i))
	},
	_nodeSearch: function (b, a, c) {
		if (!c) {
			c = 0
		}
		if (c >= 3) {
			return
		}
		if (b.name == a) {
			return true
		} else {
			if (b.parent) {
				return Markup._nodeSearch(b.parent, a, c + 1)
			}
		}
	},
	_parse: function (p, f) {
		Markup.nameCol = "name_" + Locale.getName();
		if (isset("g_beta") && g_beta) {
			Markup.nameCol = "name_beta"
		} else {
			if (isset("g_ptr") && g_ptr) {
				Markup.nameCol = "name_ptr"
			}
		}
		p = p.replace(/\r/g, "");
		if (!f) {
			f = {}
		}
		Markup.uid = f.uid || "abc";
		Markup.root = f.root;
		Markup.preview = f.preview || false;
		Markup.dbpage = f.dbpage || false;
		Markup.defaultSource = false;
		if (Markup.uid != "abc") {
			g_screenshots[Markup.uid] = []
		}
		if (f.roles && (f.roles & (U_GROUP_ADMIN | U_GROUP_EDITOR | U_GROUP_MOD | U_GROUP_BUREAU | U_GROUP_DEV | U_GROUP_BLOGGER)) && f.mode != Markup.MODE_SIGNATURE) {
			f.mode = Markup.MODE_ARTICLE
		}
		Markup.mode = f.mode || Markup.MODE_ARTICLE;
		Markup.allow = f.allow || Markup.CLASS_STAFF;
		if (f.stopAtBreak) {
			var v = p.indexOf("[break]");
			if (v != -1) {
				p = p.substring(0, v)
			}
		} else {
			p = p.replace("[break]", "")
		}
		var m = new MarkupTree();
		p = p.trim();
		if (this.postTags.length) {
			for (var t in this.postTags) {
				var F = this.postTags[t];
				if (p.indexOf("[" + F) != -1) {
					if (! (Markup.tags[F].allowedModes && Markup.tags[F].allowedModes[MarkupModeMap[f.mode]] == undefined)) {
						for (var j in Markup.tags[F].collect) {
							this.collectTags[j] = true
						}
					}
				}
			}
		}
		p = p.replace(/\n(\s*)\n/g, "\n\n");
		var u = p.length;
		var z = 0,
			k = 0,
			g = -1,
			l = -1,
			b = true,
			q = false;
		var c = function (I) {
			var i, H, G;
			if (I.charAt(0) == '"' || I.charAt(0) == "'") {
				i = I.charAt(0);
				var a = I.indexOf(i, 1);
				if (a > -1) {
					G = I.substring(1, a);
					I = I.substring(a + 1).trim();
					return {
						value: Markup._safeHtml(G),
						str: I
					}
				}
			}
			H = I.indexOf(" ");
			if (H > -1) {
				G = I.substring(0, H);
				I = I.substring(H + 1).trim()
			} else {
				G = I;
				I = ""
			}
			return {
				value: G,
				str: I
			}
		};
		var r = /^\s*[a-z0-9]+\s*=/;
		while (k < u) {
			g = p.indexOf("[", k);
			if (g > -1) {
				k = g + 1;
				if (g > 0 && p.charAt(g - 1) == "\\") {
					b = false;
					g = -1
				} else {
					l = p.indexOf("]", k)
				}
			} else {
				k = u
			}
			var d, n = {};
			if (l > -1) {
				var B = p.substring(g + 1, l);
				if (B.charAt(0) == "/") {
					q = true;
					d = B.substr(1).trim().toLowerCase()
				}
				if (!q) {
					var A = B.indexOf(" "),
						w = B.indexOf("=");
					var C;
					if ((w < A || A == -1) && w > -1) {
						d = B.substring(0, w).toLowerCase();
						B = B.substring(w + 1).trim();
						var E = c(B);
						B = E.str;
						if (Markup.tags[d] == undefined || Markup.tags[d].attr == undefined || Markup.tags[d].attr.unnamed == undefined) {
							b = false
						} else {
							n.unnamed = E.value
						}
					} else {
						if (A > -1) {
							d = B.substring(0, A).toLowerCase();
							B = B.substring(A + 1).trim();
							if (B.indexOf("=") == -1) {
								if (Markup.tags[d] == undefined || Markup.tags[d].attr == undefined || Markup.tags[d].attr.unnamed == undefined) {
									b = false
								} else {
									n.unnamed = B
								}
								B = ""
							}
						} else {
							d = B.toLowerCase();
							B = ""
						}
					}
					if (Markup.tags[d] == undefined) {
						b = false
					} else {
						if (b) {
							var F = Markup.tags[d];
							while (B != "") {
								var o = "";
								if (!r.test(B)) {
									o = "unnamed"
								} else {
									w = B.indexOf("=");
									if (w == -1) {
										b = false;
										break
									}
									o = B.substring(0, w).trim().toLowerCase();
									B = B.substring(w + 1).trim()
								}
								var E = c(B);
								B = E.str;
								if (F.attr == undefined || F.attr[o] == undefined) {
									if (Markup.attributes[o] == undefined || (Markup.attributes[o].valid != undefined && !Markup.attributes[o].valid.test(E.value))) {
										b = false;
										break
									}
								}
								n[o] = E.value
							}
							if (b && F.attr) {
								for (var D in F.attr) {
									if (F.attr[D].req && n[D] == undefined) {
										b = false;
										break
									} else {
										if (n[D] == undefined) {
											continue
										}
									}
									if (F.attr[D].valid != undefined && !F.attr[D].valid.test(n[D])) {
										b = false;
										break
									}
								}
								if (b && F.validate != undefined) {
									b = F.validate(n)
								}
							}
						}
					}
				} else {
					if (Markup.tags[d] == undefined) {
						b = false
					}
				}
			} else {
				b = false
			}
			if (b) {
				if (z != g) {
					var h = p.substring(z, g).replace(/\\\[/g, "[");
					var e = {
						_rawText: h
					};
					m.openTag("<text>", e)
				}
				if (q) {
					b = m.closeTag(d)
				} else {
					b = m.openTag(d, n)
				}
				if (b) {
					z = k = l + 1
				} else {
					z = g
				}
			}
			b = true;
			q = false;
			g = l = -1
		}
		if (z < u) {
			var h = p.substr(z).replace(/\\\[/g, "[");
			var e = {
				_rawText: h
			};
			m.openTag("<text>", e)
		}
		return m
	},
	createMaps: function () {
		for (var b = 0; b < Markup.maps.length; ++b) {
			var a = Markup.maps[b];
			new Mapper({
				parent: a[0],
				zone: a[1],
				coords: a[2],
				unique: b
			})
		}
		Markup.maps = []
	},
	toHtml: function (d, c) {
		if (!c) {
			c = {}
		}
		if (!c.allow) {
			if (c.roles) {
				c.allow = Markup.rolesToClass(c.roles)
			} else {
				c.allow = Markup.CLASS_STAFF
			}
		}
		var a = Markup._parse(d, c);
		var b = a.toHtml();
		if (c.prepend) {
			b = c.prepend + b
		}
		if (c.append) {
			b += append
		}
		setTimeout(Markup.createMaps, 250);
		return b
	},
	removeTags: function (c, b) {
		var a = Markup._parse(c, b);
		return a.tagless()
	},
	getImageUploadIds: function (c, b) {
		var a = Markup._parse(c, b);
		return a.imageUploadIds()
	},
	printHtml: function (c, d, b) {
		d = ge(d);
		var a = Markup.toHtml(c, b);
		d.innerHTML = a;
		Markup.createMaps()
	},
	mapperPreview: function (c) {
		try {
			window.mapper = Markup.maps[c];
			var b = window.open("/edit=mapper-preview", "mapperpreview", "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=no,width=800,height=540");
			b.focus()
		} catch(a) {}
	},
	createTabs: function (a, d, f) {
		var b = new Tabs({
			parent: ge("dsf67g4d-" + a.id + (f ? "-preview" : "")),
			forum: 1,
			noScroll: (f ? true : false)
		});
		for (var c = 0; c < d.length; ++c) {
			var e = d[c];
			b.add(e.name, {
				id: a.id + "-" + e.id,
				icon: e.icon,
				"class": e["class"]
			})
		}
		b.flush()
	}
};
var MarkupUtil = {
	ltrimText: function (a) {
		a._rawText = a._rawText.ltrim();
		return a
	},
	rtrimText: function (a) {
		a._rawText = a._rawText.rtrim();
		return a
	},
	checkSiblingTrim: function (a, b) {
		if (b.name == "<text>" && (Markup.tags[a.name].rtrim || Markup.tags[a.name].trim)) {
			b.attr = MarkupUtil.ltrimText(b.attr)
		} else {
			if (a.name == "<text>" && (Markup.tags[b.name].ltrim || Markup.tags[b.name].trim)) {
				a.attr = MarkupUtil.rtrimText(a.attr)
			}
		}
		return [a, b]
	}
};
var MarkupTree = function () {
	this.nodes = [];
	this.currentNode = null
};
MarkupTree.prototype = {
	openTag: function (b, c) {
		if (!Markup.tags[b]) {
			return false
		} else {
			if (Markup.tags[b].allowedModes && Markup.tags[b].allowedModes[MarkupModeMap[Markup.mode]] == undefined) {
				return false
			} else {
				if (Markup.tags[b].allowedClass && Markup.tags[b].allowedClass > Markup.allow) {
					return false
				}
			}
		}
		var d = {
			name: b,
			attr: c,
			parent: null,
			nodes: []
		};
		if (this.currentNode) {
			d.parent = this.currentNode
		}
		if (Markup.tags[b].allowedParents) {
			if (d.parent != null) {
				if (Markup.tags[b].allowedParents[d.parent.name] === undefined) {
					return false
				}
			} else {
				if (Markup.root == undefined || Markup.tags[b].allowedParents[Markup.root] == undefined) {
					return false
				}
			}
		}
		if (d.parent && Markup.tags[d.parent.name].allowedChildren && Markup.tags[d.parent.name].allowedChildren[b] == undefined) {
			return false
		}
		if (this.currentNode) {
			if (this.currentNode.nodes.length == 0 && d.name == "<text>" && Markup.tags[this.currentNode.name].itrim) {
				d.attr = MarkupUtil.ltrimText(d.attr)
			} else {
				if (this.currentNode.nodes.length > 0) {
					var a = this.currentNode.nodes.length - 1;
					var e = MarkupUtil.checkSiblingTrim(this.currentNode.nodes[a], d);
					this.currentNode.nodes[a] = e[0];
					d = e[1]
				}
			}
			if (d.name == "<text>") {
				d.attr._text = Markup._preText(d.attr._rawText);
				if (d.attr._text.length > 0) {
					this.currentNode.nodes.push(d)
				}
			} else {
				this.currentNode.nodes.push(d)
			}
		} else {
			if (this.nodes.length > 0) {
				var a = this.nodes.length - 1;
				var e = MarkupUtil.checkSiblingTrim(this.nodes[a], d);
				this.nodes[a] = e[0];
				d = e[1]
			}
			if (d.name == "<text>") {
				d.attr._text = Markup._preText(d.attr._rawText);
				if (d.attr._text.length > 0) {
					this.nodes.push(d)
				}
			} else {
				this.nodes.push(d)
			}
		}
		if (!Markup.tags[b].empty && !Markup.tags[b].post) {
			this.currentNode = d
		}
		return true
	},
	closeTag: function (c) {
		if (Markup.tags[c].empty || Markup.tags[c].post) {
			return false
		}
		if (!this.currentNode) {
			return false
		} else {
			if (this.currentNode.name == c) {
				if (this.currentNode.nodes.length > 0) {
					var b = this.currentNode.nodes.length - 1;
					if (Markup.tags[this.currentNode.name].itrim && this.currentNode.nodes[b].name == "<text>") {
						var e = this.currentNode.nodes[b];
						e.attr = MarkupUtil.rtrimText(e.attr);
						e.attr._text = Markup._preText(e.attr._rawText);
						this.currentNode.nodes[b] = e
					}
				}
				this.currentNode = this.currentNode.parent
			} else {
				var d = function (g, f) {
					for (var h = f.length - 1; h >= 0; --h) {
						if (f[h].name == g) {
							return h
						}
					}
					return -1
				};
				var a;
				if (this.currentNode.parent) {
					a = d(c, this.currentNode.parent.nodes)
				} else {
					a = d(c, this.nodes)
				}
				if (a == -1) {
					return false
				}
			}
		}
		return true
	},
	toHtml: function () {
		var c = [];
		var b = {};
		for (var h in Markup.collectTags) {
			b[h] = []
		}
		this.tagless(true);
		var g = 0;
		var a = function (k, n, q) {
			var u = "";
			for (var m = 0; m < k.length; ++m) {
				var l = k[m];
				if (n == 0 && m == 0 && Markup.firstTags[l.name]) {
					l.attr.first = true
				} else {
					if (n > 0 && m == 0 && Markup.firstTags[l.parent.name]) {
						l.attr.first = true
					}
				}
				if (m == k.length - 1 && Markup.firstTags[l.name]) {
					l.attr.last = true
				}
				if (Markup.excludeTags[l.name]) {
					q[l.name] = (q[l.name] ? q[l.name] + 1 : 1)
				}
				for (var r in q) {
					for (var v in Markup.excludeTags[r]) {
						if (Markup.excludeTags[r][v][l.name]) {
							l.attr[v] = false
						}
					}
				}
				if (Markup.collectTags[l.name]) {
					l.offset = g++;
					b[l.name].push(l)
				}
				if (Markup.tags[l.name].post) {
					c.push([l, u.length])
				} else {
					if (Markup.tags[l.name].empty) {
						var p;
						if (l.parent && Markup.tags[l.parent.name].rawText) {
							p = Markup.tags[l.name].toHtml(l.attr, {
								needsRaw: true
							})
						} else {
							p = Markup.tags[l.name].toHtml(l.attr)
						}
						if (typeof p == "string") {
							u += p
						} else {
							if (p !== undefined) {
								if (u == "") {
									u = []
								}
								u.push(p)
							}
						}
					} else {
						var o = arguments.callee(l.nodes, n + 1, q);
						l.attr._contents = o;
						var w = Markup.tags[l.name].toHtml(l.attr);
						if (w.length == 2) {
							u += w[0] + o + w[1]
						} else {
							if (w.length == 1) {
								if (typeof w[0] == "string") {
									u += w[0]
								} else {
									if (u == "") {
										u = []
									}
									u.push(w[0])
								}
							}
						}
					}
				}
				if (q[l.name]) {
					q[l.name]--;
					if (q[l.name] == 0) {
						delete q[l.name]
					}
				}
			}
			return u
		};
		str = a(this.nodes, 0, []);
		for (var e = 0; e < c.length; ++e) {
			var d = c[e][0];
			var j = c[e][1];
			var f = Markup.tags[d.name].postHtml(d.attr, b);
			if (typeof f == "string") {
				str = str.substr(0, j) + f + str.substr(j)
			}
		}
		return str
	},
	tagless: function (c) {
		var a = function (e) {
			var h = "";
			for (var f = 0; f < e.length; ++f) {
				var g = e[f];
				var d = arguments.callee(g.nodes);
				if (c) {
					g.attr._textContents = d
				} else {
					g.attr._contents = d
				}
				if (g.name == "<text>") {
					h += Markup.tags[g.name].toHtml(g.attr, {
						noLink: true,
						noNbsp: true
					})
				} else {
					if (Markup.tags[g.name].toText) {
						h += Markup.tags[g.name].toText(g.attr)
					}
				}
				if (!Markup.tags[g.name].taglessSkip) {
					h += d
				}
			}
			return h
		};
		if (c) {
			a(this.nodes)
		} else {
			var b = a(this.nodes);
			b = b.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
			return b
		}
	},
	imageUploadIds: function () {
		var b = [];
		var a = function (c) {
			for (var d = 0; d < c.length; ++d) {
				var e = c[d];
				if (e.name == "img" && e.attr.upload) {
					b.push(e.attr.upload)
				}
				arguments.callee(e.nodes)
			}
		};
		a(this.nodes);
		return b
	}
};
Markup._init();
