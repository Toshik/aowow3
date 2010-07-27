var Ads = {
	dimensions: {
		leaderboard: [728, 90],
		skyscraper: [160, 600],
		medrect: [300, 250]
	},
	autofill: {
		leaderboard: ["ad-header"],
		skyscraper: ["ad-sidebar"],
		medrect: ["ad-content", "ad-article", "ad-contribute"]
	},
	alternates: {
		leaderboard: {},
		skyscraper: {},
		medrect: {
			"ad-article": 2
		}
	},
	spots: [],
	hidden: [],
	hiding: false,
	removed: false,
	init: function () {
		if (PageTemplate.get("pageName") == "ads") {
			return
		}
		for (var f in Ads.dimensions) {
			var c = Ads.autofill[f],
				e = false;
			for (var b = 0, a = c.length; b < a; ++b) {
				var d = ge(c[b]);
				if (d) {
					if (e) {
						de(d)
					} else {
						e = Ads.fillSpot(f, d, c[b])
					}
				}
			}
		}
	},
	fillSpot: function (e, d, c) {
		if (Ads.removed || !g_user.ads) {
			de(d);
			return false
		}
		var a = $(d);
		if ($("iframe", a).length > 0) {
			return false
		}
		var b = ce("iframe");
		b.width = Ads.dimensions[e][0];
		b.height = Ads.dimensions[e][1];
		b.frameBorder = 0;
		b.scrolling = "no";
		b.src = g_staticUrl + "/ads/dynamic/" + e + (Ads.alternates[e][c] ? Ads.alternates[e][c] : "") + ".html?4";
		d.className += " ad-" + e;
		ae(d, b);
		Ads.spots.push(d);
		return true
	},
	removeAll: function () {
		for (var e in Ads.dimensions) {
			var c = Ads.spots;
			for (var b = 0, a = c.length; b < a; ++b) {
				var d = c[b];
				if (d) {
					de(d)
				}
			}
		}
		Ads.removed = true;
		Ads.spots = []
	},
	reveal: function (b) {
		var a = gE(b, "iframe")[0];
		if (a) {
			a.style.display = ""
		}
	},
	hide: function (b) {
		var a = gE(b, "iframe")[0];
		if (a) {
			a.style.display = "none";
			Ads.hidden.push(b)
		}
	},
	hideAll: function () {
		Ads.hiding = true;
		for (var e in Ads.dimensions) {
			var c = Ads.spots;
			for (var b = 0, a = c.length; b < a; ++b) {
				var d = c[b];
				if (d && !Ads.isHidden(d)) {
					Ads.hide(d)
				}
			}
		}
	},
	isHidden: function (b) {
		var a = gE(b, "iframe")[0];
		if (a) {
			return a.style.display == "none"
		}
		return false
	},
	intersect: function (g, e) {
		var b;
		for (var h in Ads.dimensions) {
			var d = Ads.spots;
			for (var c = 0, a = d.length; c < a; ++c) {
				var f = d[c];
				if (f) {
					if (!Ads.isHidden(f)) {
						coords = ac(f);
						b = g_createRect(coords.x, coords.y, f.offsetWidth, f.offsetHeight);
						if (g_intersectRect(g, b)) {
							if (e) {
								Ads.hide(f)
							}
							return f
						}
					}
				}
			}
		}
		return false
	},
	restoreHidden: function () {
		Ads.hiding = false;
		if (Ads.hidden.length) {
			for (var c = 0, a = Ads.hidden.length; c < a; ++c) {
				var d = Ads.hidden[c],
					b = gE(d, "iframe")[0];
				if (b) {
					b.style.display = ""
				}
			}
			Ads.hidden = []
		}
	}
};
$(document).ready(Ads.init);
/*if (document.domain.indexOf(".wowhead.com") != -1) {
	document.domain = "wowhead.com"
}*/
