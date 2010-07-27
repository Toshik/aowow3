function Tabs(a) {
	cO(this, a);
	if (this.parent) {
		this.parent = ge(this.parent)
	} else {
		return
	}
	this.selectedTab = -1;
	this.uls = [];
	this.tabs = [];
	this.nShows = 0;
	if (this.poundable == null) {
		this.poundable = 1
	}
	this.poundedTab = null;
	if (this.onLoad == null) {
		this.onLoad = Tabs.onLoad.bind(this)
	}
	if (this.onShow == null) {
		this.onShow = Tabs.onShow.bind(this)
	}
	if (this.onHide) {
		this.onHide = this.onHide.bind(this)
	}
}
Tabs.prototype = {
	add: function (a, d) {
		var c, b = this.tabs.length;
		c = {
			caption: a,
			index: b,
			owner: this
		};
		cO(c, d);
		this.tabs.push(c);
		return b
	},
	hide: function (c, e) {
		if (this.tabs[c]) {
			var b = this.selectedTab;
			if (c != this.poundedTab) {
				this.selectedTab = -1
			}
			ee(this.parent);
			this.tabs[c].hidden = !e;
			this.flush();
			if (!e && c == b) {
				for (var d = 0, a = this.tabs.length; d < a; ++d) {
					if (d != c && !this.tabs[d].hidden) {
						return this.show(d, 1)
					}
				}
			}
		}
	},
	focus: function (a) {
		if (a < 0) {
			a = this.tabs.length + a
		}
		this.forceScroll = 1;
		gE(this.uls[2], "a")[a].onclick({},
		true);
		this.forceScroll = null
	},
	show: function (b, d) {
		var a;
		if (isNaN(b) || b < 0 || this.tabs[b].hidden) {
			b = 0
		} else {
			if (b >= this.tabs.length) {
				b = this.tabs.length - 1
			}
		}
		if (d == null && b == this.selectedTab) {
			return
		}
		if (this.selectedTab != -1) {
			a = this.tabs[this.selectedTab];
			if (this.onHide && !this.onHide(a)) {
				return
			}
			if (a.onHide && !a.onHide()) {
				return
			}
		}++this.nShows;
		for (var c = 0; c <= 3; ++c) {
			a = gE(this.uls[c], "a");
			if (this.selectedTab != -1) {
				a[this.selectedTab].className = ""
			}
			a[b].className = "selected"
		}
		a = this.tabs[b];
		if (a.onLoad) {
			a.onLoad();
			a.onLoad = null
		}
		this.onShow(this.tabs[b], this.tabs[this.selectedTab]);
		if (a.onShow) {
			a.onShow(this.tabs[this.selectedTab])
		}
		this.selectedTab = b
	},
	flush: function (m) {
		var q, f, p, o, n, c;
		var k = ce("div");
		k.className = "tabs-container";
		n = ce("div");
		n.style.visibility = "hidden";
		this.uls[0] = ce("ul");
		this.uls[0].className = "tabs";
		ae(n, this.uls[0]);
		ae(k, n);
		n = ce("div");
		n.className = "tabs-levels";
		for (var h = 1; h <= 3; ++h) {
			c = ce("div");
			c.className = "tabs-level";
			this.uls[h] = ce("ul");
			this.uls[h].className = "tabs";
			this.uls[h].style.top = (-30 * (3 - h)) + "px";
			ae(c, this.uls[h]);
			ae(n, c)
		}
		ae(k, n);
		for (var h = 0; h < this.tabs.length; ++h) {
			var e = this.tabs[h];
			for (var g = 0; g <= 3; ++g) {
				f = ce("li");
				p = ce("a");
				o = ce("b");
				if (e.hidden) {
					f.style.display = "none"
				}
				if (this.poundable) {
					p.href = "#" + e.id
				} else {
					p.href = "javascript:;"
				}
				if (g > 0) {
					ns(p);
					p.onclick = Tabs.onClick.bind(e, p)
				}
				n = ce("div");
				if (e.icon) {
					s = ce("span");
					s.className = "icontiny";
					s.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + e.icon.toLowerCase() + ".gif)";
					ae(n, s)
				}
				if (e["class"]) {
					n.className = e["class"]
				}
				ae(n, ct(e.caption));
				ae(p, n);
				if (e.icon) {
					s = ce("span");
					s.className = "icontiny";
					s.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + e.icon.toLowerCase() + ".gif)";
					ae(o, s)
				}
				ae(o, ct(e.caption));
				ae(p, o);
				ae(f, p);
				ae(this.uls[g], f)
			}
		}
		ae(this.parent, k);
		if (this.onLoad) {
			q = this.onLoad();
			if (q != null) {
				this.poundedTab = m = q
			}
		}
		this.show(m)
	},
	setTabName: function (c, b) {
		this.tabs[c].caption = b;
		for (var d = 0; d <= 3; ++d) {
			var a = gE(this.uls[d], "a");
			g_setTextNodes(a[c], b)
		}
	},
	setTabPound: function (c, a) {
		if (!this.poundable) {
			return
		}
		for (var d = 0; d <= 3; ++d) {
			var b = gE(this.uls[d], "a");
			b[c].href = "#" + this.tabs[c].id + ":" + a
		}
	},
	getSelectedTab: function () {
		return this.selectedTab
	}
};
Tabs.onClick = function (b, g, f) {
	if (f == null && this.index == this.owner.selectedTab) {
		return
	}
	var d = rf2(g);
	if (d == null) {
		return
	}
	this.owner.show(this.index, f);
	if (this.owner.poundable) {
		var c = b.href.indexOf("#");
		c != -1 && location.replace(b.href.substr(c))
	}
	return d
};
Tabs.onLoad = function () {
	if (!this.poundable || !location.hash.length) {
		return
	}
	var a = location.hash.substr(1).split(":")[0];
	if (a) {
		return in_array(this.tabs, a, function (b) {
			return b.id
		})
	}
};
Tabs.onShow = function (d, e) {
	var b;
	if (e) {
		ge("tab-" + e.id).style.display = "none"
	}
	b = ge("tab-" + d.id);
	b.style.display = "";
	if (((this.nShows == 1 && this.poundedTab != null && this.poundedTab >= 0) || this.forceScroll) && !this.noScroll) {
		var c, a;
		if (this.__st) {
			c = this.__st;
			a = 15
		} else {
			c = b;
			a = this.parent.offsetHeight + 15
		}
		setTimeout(g_scrollTo.bind(null, c, a), 10)
	}
};
