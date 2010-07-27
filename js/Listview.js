var g_listviews = {};

function Listview(a) {
	cO(this, a);
	if (this.id) {
		var n = (this.tabs ? "tab-" : "lv-") + this.id;
		if (this.parent) {
			var l = ce("div");
			l.id = n;
			ae(ge(this.parent), l);
			this.container = l
		} else {
			this.container = ge(n)
		}
	} else {
		return
	}
	var c = g_getGets();
	if ((c.debug != null || g_user.debug) && g_user.roles & U_GROUP_MODERATOR) {
		this.debug = true
	}
	if (this.template && Listview.templates[this.template]) {
		this.template = Listview.templates[this.template]
	} else {
		return
	}
	g_listviews[this.id] = this;
	if (this.data == null) {
		this.data = []
	}
	if (this.poundable == null) {
		if (this.template.poundable != null) {
			this.poundable = this.template.poundable
		} else {
			this.poundable = true
		}
	}
	if (this.searchable == null) {
		if (this.template.searchable != null) {
			this.searchable = this.template.searchable
		} else {
			this.searchable = false
		}
	}
	if (this.filtrable == null) {
		if (this.template.filtrable != null) {
			this.filtrable = this.template.filtrable
		} else {
			this.filtrable = false
		}
	}
	if (this.sortable == null) {
		if (this.template.sortable != null) {
			this.sortable = this.template.sortable
		} else {
			this.sortable = true
		}
	}
	if (this.customPound == null) {
		if (this.template.customPound != null) {
			this.customPound = this.template.customPound
		} else {
			this.customPound = false
		}
	}
	if (this.data.length == 1) {
		this.filtrable = false;
		this.searchable = false
	}
	if (this.searchable && this.searchDelay == null) {
		if (this.template.searchDelay != null) {
			this.searchDelay = this.template.searchDelay
		} else {
			this.searchDelay = 333
		}
	}
	if (this.clickable == null) {
		if (this.template.clickable != null) {
			this.clickable = this.template.clickable
		} else {
			this.clickable = true
		}
	}
	if (this.hideBands == null) {
		this.hideBands = this.template.hideBands
	}
	if (this.hideNav == null) {
		this.hideNav = this.template.hideNav
	}
	if (this.hideHeader == null) {
		this.hideHeader = this.template.hideHeader
	}
	if (this.hideCount == null) {
		this.hideCount = this.template.hideCount
	}
	if (this.computeDataFunc == null && this.template.computeDataFunc != null) {
		this.computeDataFunc = this.template.computeDataFunc
	}
	if (this.createCbControls == null && this.template.createCbControls != null) {
		this.createCbControls = this.template.createCbControls
	}
	if (this.template.onBeforeCreate != null) {
		if (this.onBeforeCreate == null) {
			this.onBeforeCreate = this.template.onBeforeCreate
		} else {
			this.onBeforeCreate = [this.template.onBeforeCreate, this.onBeforeCreate]
		}
	}
	if (this.onAfterCreate == null && this.template.onAfterCreate != null) {
		this.onAfterCreate = this.template.onAfterCreate
	}
	if (this.onNoData == null && this.template.onNoData != null) {
		this.onNoData = this.template.onNoData
	}
	if (this.createNote == null && this.template.createNote != null) {
		this.createNote = this.template.createNote
	}
	if (this.customFilter == null && this.template.customFilter != null) {
		this.customFilter = this.template.customFilter
	}
	if (this.onSearchSubmit == null && this.template.onSearchSubmit != null) {
		this.onSearchSubmit = this.template.onSearchSubmit
	}
	if (this.clip == null && this.template.clip != null) {
		this.clip = this.template.clip
	}
	if (this.mode == null) {
		this.mode = this.template.mode
	}
	if (this.nItemsPerPage == null) {
		if (this.template.nItemsPerPage != null) {
			this.nItemsPerPage = this.template.nItemsPerPage
		} else {
			this.nItemsPerPage = 50
		}
	}
	this.nItemsPerPage |= 0;
	if (this.nItemsPerPage <= 0) {
		this.nItemsPerPage = 0
	}
	this.nFilters = 0;
	this.resetRowVisibility();
	if (this.mode == Listview.MODE_TILED) {
		if (this.nItemsPerRow == null) {
			var r = this.template.nItemsPerRow;
			this.nItemsPerRow = (r != null ? r : 4)
		}
		this.nItemsPerRow |= 0;
		if (this.nItemsPerRow <= 1) {
			this.nItemsPerRow = 1
		}
	} else {
		this.nItemsPerRow = 1
	}
	this.columns = [];
	for (var f = 0, k = this.template.columns.length; f < k; ++f) {
		var q = this.template.columns[f],
			e = {};
		cO(e, q);
		this.columns.push(e)
	}
	if (this.extraCols != null) {
		for (var f = 0, k = this.extraCols.length; f < k; ++f) {
			var m = null;
			var b = this.extraCols[f];
			if (b.after || b.before) {
				var j = in_array(this.columns, (b.after ? b.after : b.before), function (d) {
					return d.id
				});
				if (j != -1) {
					m = (b.after ? j + 1 : j)
				}
			}
			if (m == null) {
				m = this.columns.length
			}
			if (b.id == "debug-id") {
				this.columns.splice(0, 0, b)
			} else {
				this.columns.splice(m, 0, b)
			}
		}
	}
	this.visibility = [];
	var o = [],
		p = [];
	if (this.visibleCols != null) {
		array_walk(this.visibleCols, function (d) {
			o[d] = 1
		})
	}
	if (this.hiddenCols != null) {
		array_walk(this.hiddenCols, function (d) {
			p[d] = 1
		})
	}
	for (var f = 0, k = this.columns.length; f < k; ++f) {
		var b = this.columns[f];
		if (o[b.id] != null || (!b.hidden && p[b.id] == null)) {
			this.visibility.push(f)
		}
	}
	if (this.sort == null && this.template.sort) {
		this.sort = this.template.sort.slice(0)
	}
	if (this.sort != null) {
		var h = this.sort;
		this.sort = [];
		for (var f = 0, k = h.length; f < k; ++f) {
			var b = parseInt(h[f]);
			if (isNaN(b)) {
				var g = 0;
				if (h[f].charAt(0) == "-") {
					g = 1;
					h[f] = h[f].substring(1)
				}
				var j = in_array(this.columns, h[f], function (d) {
					return d.id
				});
				if (j != -1) {
					if (g) {
						this.sort.push(-(j + 1))
					} else {
						this.sort.push(j + 1)
					}
				}
			} else {
				this.sort.push(b)
			}
		}
	} else {
		this.sort = []
	}
	if ((this.debug || g_user.debug) && this.id != "topics" && this.id != "recipes") {
		this.columns.splice(0, 0, {
			id: "debug-id",
			compute: function (d, i) {
				if (d.id) {
					ae(i, ct(d.id))
				}
			},
			getVisibleText: function (d) {
				if (d.id) {
					return d.id
				} else {
					return ""
				}
			},
			getValue: function (d) {
				if (d.id) {
					return d.id
				} else {
					return 0
				}
			},
			sortFunc: function (i, d, t) {
				if (i.id == null) {
					return -1
				} else {
					if (d.id == null) {
						return 1
					}
				}
				return strcmp(i.id, d.id)
			},
			name: "ID",
			width: "5%",
			tooltip: "ID"
		});
		this.visibility.splice(0, 0, -1);
		for (var f = 0, k = this.visibility.length; f < k; ++f) {
			this.visibility[f] = this.visibility[f] + 1
		}
		for (var f = 0, k = this.sort.length; f < k; ++f) {
			if (this.sort[f] < 0) {
				this.sort[f] = this.sort[f] - 1
			} else {
				this.sort[f] = this.sort[f] + 1
			}
		}
	}
	if (this.tabs) {
		this.tabIndex = this.tabs.add(this.getTabName(), {
			id: this.id,
			onLoad: this.initialize.bind(this)
		})
	} else {
		this.initialize()
	}
}
Listview.MODE_DEFAULT = 0;
Listview.MODE_CHECKBOX = 1;
Listview.MODE_DIV = 2;
Listview.MODE_TILED = 3;
Listview.prototype = {
	initialize: function () {
		if (this.data.length) {
			if (this.computeDataFunc != null) {
				for (var d = 0, a = this.data.length; d < a; ++d) {
					this.computeDataFunc(this.data[d])
				}
			}
		}
		if (this.tabs) {
			this.pounded = (this.tabs.poundedTab == this.tabIndex);
			if (this.pounded) {
				this.readPound()
			}
		} else {
			this.readPound()
		}
		this.applySort();
		var b;
		if (this.onBeforeCreate != null) {
			if (typeof this.onBeforeCreate == "function") {
				b = this.onBeforeCreate()
			} else {
				for (var d = 0; d < this.onBeforeCreate.length; ++d) {
					(this.onBeforeCreate[d].bind(this))()
				}
			}
		}
		this.noData = ce("div");
		this.noData.className = "listview-nodata text";
		if (this.mode == Listview.MODE_DIV) {
			this.mainContainer = this.mainDiv = ce("div");
			this.mainContainer.className = "listview-mode-div"
		} else {
			this.mainContainer = this.table = ce("table");
			this.thead = ce("thead");
			this.tbody = ce("tbody");
			if (this.clickable) {
				this.tbody.className = "clickable"
			}
			if (this.mode == Listview.MODE_TILED) {
				this.table.className = "listview-mode-tiled";
				var e = (100 / this.nItemsPerRow) + "%",
					f = ce("colgroup"),
					c;
				for (var d = 0; d < this.nItemsPerRow; ++d) {
					c = ce("col");
					c.style.width = e;
					ae(f, c)
				}
				ae(this.mainContainer, f)
			} else {
				this.table.className = "listview-mode-default";
				this.createHeader();
				this.updateSortArrow()
			}
			ae(this.table, this.thead);
			ae(this.table, this.tbody)
		}
		this.createBands();
		if (this.customFilter != null) {
			this.updateFilters()
		}
		this.updateNav();
		this.refreshRows();
		if (this.onAfterCreate != null) {
			this.onAfterCreate(b)
		}
	},
	createHeader: function () {
		var h = ce("tr");
		if (this.mode == Listview.MODE_CHECKBOX) {
			var g = ce("th"),
				j = ce("div"),
				c = ce("a");
			g.style.width = "33px";
			c.href = "javascript:;";
			c.className = "listview-cb";
			ns(c);
			ae(c, ct(String.fromCharCode(160)));
			ae(j, c);
			ae(g, j);
			ae(h, g)
		}
		for (var f = 0, b = this.visibility.length; f < b; ++f) {
			var e = this.visibility[f],
				d = this.columns[e],
				g = ce("th");
			j = ce("div"),
			c = ce("a"),
			outerSpan = ce("span"),
			innerSpan = ce("span");
			d.__th = g;
			c.href = "javascript:;";
			if (this.filtrable && (d.filtrable == null || d.filtrable)) {
				c.onmouseup = Listview.headerClick.bind(this, d, e);
				c.onclick = c.oncontextmenu = rf
			} else {
				if (this.sortable) {
					c.onclick = this.sortBy.bind(this, e + 1)
				}
			}
			if (c.onclick) {
				c.onmouseover = Listview.headerOver.bind(this, c, d);
				c.onmouseout = Tooltip.hide;
				ns(c)
			} else {
				c.className = "static"
			}
			if (d.width != null) {
				g.style.width = d.width
			}
			if (d.align != null) {
				g.style.textAlign = d.align
			}
			if (d.span != null) {
				g.colSpan = d.span
			}
			ae(innerSpan, ct(d.name));
			ae(outerSpan, innerSpan);
			ae(c, outerSpan);
			ae(j, c);
			ae(g, j);
			ae(h, g)
		}
		if (this.hideHeader) {
			this.thead.style.display = "none"
		}
		ae(this.thead, h)
	},
	createBands: function () {
		var i = ce("div"),
			k = ce("div"),
			l = ce("div"),
			j = ce("div");
		this.bandTop = i;
		this.bandBot = k;
		this.noteTop = l;
		this.noteBot = j;
		i.className = "listview-band-top";
		k.className = "listview-band-bottom";
		this.navTop = this.createNav(true);
		this.navBot = this.createNav(false);
		l.className = j.className = "listview-note";
		if (this.note) {
			l.innerHTML = this.note
		} else {
			if (this.createNote) {
				this.createNote(l, j)
			}
		}
		if (this.debug && this.id != "topics") {
			ae(l, ct(" ("));
			var b = ce("a");
			b.onclick = this.getList.bind(this);
			ae(b, ct("CSV"));
			ae(l, b);
			ae(l, ct(")"))
		}
		if (!l.firstChild && !(this.createCbControls || this.mode == Listview.MODE_CHECKBOX)) {
			ae(l, ct(String.fromCharCode(160)))
		}
		if (! (this.createCbControls || this.mode == Listview.MODE_CHECKBOX)) {
			ae(j, ct(String.fromCharCode(160)))
		}
		ae(i, this.navTop);
		if (this.searchable) {
			var m = this.updateFilters.bind(this, true),
				e = (this._truncated ? "search-within-results2" : "search-within-results"),
				d = ce("span"),
				c = ce("em"),
				h = ce("a"),
				g = ce("input");
			d.className = "listview-quicksearch";
			ae(d, c);
			h.href = "javascript:;";
			h.onclick = function () {
				var a = this.nextSibling;
				a.value = "";
				a.className = e;
				m()
			};
			h.style.display = "none";
			ae(h, ce("span"));
			ae(d, h);
			ns(h);
			g.setAttribute("type", "text");
			g.className = e;
			g.style.width = (this._truncated ? "19em" : "15em");
			g_onAfterTyping(g, m, this.searchDelay);
			g.onmouseover = function () {
				if (trim(this.value) != "") {
					this.className = ""
				}
			};
			g.onfocus = function () {
				this.className = ""
			};
			g.onblur = function () {
				if (trim(this.value) == "") {
					this.className = e;
					this.value = ""
				}
			};
			g.onkeypress = this.submitSearch.bind(this);
			ae(d, g);
			this.quickSearchBox = g;
			this.quickSearchGlass = c;
			this.quickSearchClear = h;
			ae(i, d)
		}
		ae(i, l);
		ae(k, this.navBot);
		ae(k, j);
		if (this.createCbControls || this.mode == Listview.MODE_CHECKBOX) {
			if (this.note) {
				l.style.paddingBottom = "5px"
			}
			this.cbBarTop = this.createCbBar(true);
			this.cbBarBot = this.createCbBar(false);
			ae(i, this.cbBarTop);
			ae(k, this.cbBarBot);
			if (!this.noteTop.firstChild && !this.cbBarTop.firstChild) {
				this.noteTop.innerHTML = "&nbsp;"
			}
			if (!this.noteBot.firstChild && !this.cbBarBot.firstChild) {
				this.noteBot.innerHTML = "&nbsp;"
			}
			if (this.noteTop.firstChild && this.cbBarTop.firstChild) {
				this.noteTop.style.paddingBottom = "6px"
			}
			if (this.noteBot.firstChild && this.cbBarBot.firstChild) {
				this.noteBot.style.paddingBottom = "6px"
			}
		}
		if (this.hideBands & 1) {
			i.style.display = "none"
		}
		if (this.hideBands & 2) {
			k.style.display = "none"
		}
		ae(this.container, this.bandTop);
		if (this.clip) {
			var f = ce("div");
			f.className = "listview-clip";
			f.style.width = this.clip.w + "px";
			f.style.height = this.clip.h + "px";
			this.clipDiv = f;
			ae(f, this.mainContainer);
			ae(f, this.noData);
			ae(this.container, f)
		} else {
			ae(this.container, this.mainContainer);
			ae(this.container, this.noData)
		}
		ae(this.container, this.bandBot)
	},
	createNav: function (g) {
		var c = ce("div"),
			d = ce("a"),
			b = ce("a"),
			a = ce("a"),
			j = ce("a"),
			i = ce("span"),
			h = ce("b"),
			f = ce("b"),
			e = ce("b");
		c.className = "listview-nav";
		d.href = b.href = a.href = j.href = "javascript:;";
		ae(d, ct(String.fromCharCode(171) + LANG.lvpage_first));
		ae(b, ct(String.fromCharCode(8249) + LANG.lvpage_previous));
		ae(a, ct(LANG.lvpage_next + String.fromCharCode(8250)));
		ae(j, ct(LANG.lvpage_last + String.fromCharCode(187)));
		ns(d);
		ns(b);
		ns(a);
		ns(j);
		d.onclick = this.firstPage.bind(this);
		b.onclick = this.previousPage.bind(this);
		a.onclick = this.nextPage.bind(this);
		j.onclick = this.lastPage.bind(this);
		ae(h, ct("a"));
		ae(f, ct("a"));
		ae(e, ct("a"));
		ae(i, h);
		ae(i, ct(LANG.hyphen));
		ae(i, f);
		ae(i, ct(LANG.lvpage_of));
		ae(i, e);
		ae(c, d);
		ae(c, b);
		ae(c, i);
		ae(c, a);
		ae(c, j);
		if (g) {
			if (this.hideNav & 1) {
				c.style.display = "none"
			}
		} else {
			if (this.hideNav & 2) {
				c.style.display = "none"
			}
		}
		return c
	},
	createCbBar: function (a) {
		var b = ce("div");
		if (this.createCbControls) {
			this.createCbControls(b, a)
		}
		if (b.firstChild) {
			b.className = "listview-withselected" + (a ? "" : "2")
		}
		return b
	},
	refreshRows: function () {
		var a = (this.mode == Listview.MODE_DIV ? this.mainContainer : this.tbody);
		ee(a);
		if (this.nRowsVisible == 0) {
			if (!this.filtered) {
				this.bandTop.style.display = this.bandBot.style.display = "none";
				this.mainContainer.style.display = "none"
			}
			this.noData.style.display = "";
			this.showNoData();
			return
		}
		var n, b, c;
		if (! (this.hideBands & 1)) {
			this.bandTop.style.display = ""
		}
		if (! (this.hideBands & 2)) {
			this.bandBot.style.display = ""
		}
		if (this.nItemsPerPage > 0) {
			n = this.rowOffset;
			b = Math.min(n + this.nRowsVisible, n + this.nItemsPerPage);
			if (this.filtered && this.rowOffset > 0) {
				for (var f = 0, g = 0; f < this.data.length && g < this.rowOffset; ++f) {
					var o = this.data[f];
					if (o.__hidden || o.__deleted) {
						++n
					} else {
						++g
					}
				}
				b += (n - this.rowOffset)
			}
		} else {
			n = 0;
			b = this.nRowsVisible
		}
		var h = b - n;
		if (this.mode == Listview.MODE_DIV) {
			for (var e = 0; e < h; ++e) {
				var f = n + e,
					o = this.data[f];
				if (!o) {
					break
				}
				if (o.__hidden || o.__deleted) {
					++h;
					continue
				}
				ae(this.mainDiv, this.getDiv(f))
			}
		} else {
			if (this.mode == Listview.MODE_TILED) {
				var d = 0,
					l = ce("tr");
				for (var e = 0; e < h; ++e) {
					var f = n + e,
						o = this.data[f];
					if (!o) {
						break
					}
					if (o.__hidden || o.__deleted) {
						++h;
						continue
					}
					ae(l, this.getCell(f));
					if (++d == this.nItemsPerRow) {
						ae(this.tbody, l);
						if (e + 1 < h) {
							l = ce("tr")
						}
						d = 0
					}
				}
				if (d != 0) {
					for (; d < 4; ++d) {
						var m = ce("td");
						m.className = "empty-cell";
						ae(l, m)
					}
					ae(this.tbody, l)
				}
			} else {
				for (var e = 0; e < h; ++e) {
					var f = n + e,
						o = this.data[f];
					if (!o) {
						break
					}
					if (o.__hidden || o.__deleted) {
						++h;
						continue
					}
					ae(this.tbody, this.getRow(f))
				}
			}
		}
		this.mainContainer.style.display = "";
		this.noData.style.display = "none"
	},
	showNoData: function () {
		var b = this.noData;
		ee(b);
		var a = -1;
		if (this.onNoData) {
			a = (this.onNoData.bind(this, b))()
		}
		if (a == -1) {
			ae(this.noData, ct(this.filtered ? LANG.lvnodata2 : LANG.lvnodata))
		}
	},
	getDiv: function (a) {
		var b = this.data[a];
		if (b.__div == null || this.minPatchVersion != b.__minPatch) {
			this.createDiv(b, a)
		}
		return b.__div
	},
	createDiv: function (b, a) {
		var c = ce("div");
		b.__div = c;
		if (this.minPatchVersion) {
			b.__minPatch = this.minPatchVersion
		} (this.template.compute.bind(this, b, c, a))()
	},
	getCell: function (a) {
		var b = this.data[a];
		if (b.__div == null) {
			this.createCell(b, a)
		}
		return b.__td
	},
	createCell: function (b, a) {
		var c = ce("td");
		b.__td = c;
		(this.template.compute.bind(this, b, c, a))();
		if (this.template.getItemLink) {
			c.onclick = this.itemClick.bind(this, b)
		}
	},
	getRow: function (a) {
		var b = this.data[a];
		if (b.__tr == null) {
			this.createRow(b)
		}
		return b.__tr
	},
	setRow: function (a) {
		if (this.data[a.pos]) {
			this.data[a.pos] = a;
			this.data[a.pos].__tr = a.__tr;
			this.createRow(this.data[a.pos]);
			this.refreshRows()
		}
	},
	createRow: function (j) {
		var g = ce("tr");
		j.__tr = g;
		if (this.mode == Listview.MODE_CHECKBOX) {
			var c = ce("td");
			if (!j.__nochk) {
				c.className = "listview-cb";
				c.onclick = Listview.cbCellClick;
				var b = ce("input");
				ns(b);
				b.type = "checkbox";
				b.onclick = Listview.cbClick;
				if (j.__chk) {
					b.checked = true
				}
				j.__cb = b;
				ae(c, b)
			}
			ae(g, c)
		}
		for (var d = 0, e = this.visibility.length; d < e; ++d) {
			var f = this.visibility[d],
				a = this.columns[f],
				c = ce("td"),
				h;
			if (a.align != null) {
				c.style.textAlign = a.align
			}
			if (a.compute) {
				h = (a.compute.bind(this, j, c, g, f))()
			} else {
				if (j[a.value] != null) {
					h = j[a.value]
				} else {
					h = -1
				}
			}
			if (h != -1 && h != null) {
				c.insertBefore(ct(h), c.firstChild)
			}
			ae(g, c)
		}
		if (this.mode == Listview.MODE_CHECKBOX && j.__chk) {
			g.className = "checked"
		}
		if (this.template.getItemLink) {
			g.onclick = this.itemClick.bind(this, j)
		}
	},
	itemClick: function (d, c) {
		c = $E(c);
		var a = 0,
			b = c._target;
		while (b && a < 3) {
			if (b.nodeName == "A") {
				return
			}
			b = b.parentNode
		}
		location.href = this.template.getItemLink(d)
	},
	submitSearch: function (c) {
		c = $E(c);
		if (!this.onSearchSubmit || c.keyCode != 13) {
			return
		}
		for (var b = 0, a = this.data.length; b < a; ++b) {
			if (this.data[b].__hidden) {
				continue
			} (this.onSearchSubmit.bind(this, this.data[b]))()
		}
	},
	validatePage: function () {
		var c = this.nItemsPerPage,
			b = this.rowOffset,
			a = this.nRowsVisible;
		if (b < 0) {
			this.rowOffset = 0
		} else {
			this.rowOffset = this.getRowOffset(b + c > a ? a - 1 : b)
		}
	},
	getRowOffset: function (b) {
		var a = this.nItemsPerPage;
		return (a > 0 && b > 0 ? Math.floor(b / a) * a : 0)
	},
	resetRowVisibility: function () {
		for (var b = 0, a = this.data.length; b < a; ++b) {
			this.data[b].__hidden = false
		}
		this.filtered = false;
		this.rowOffset = 0;
		this.nRowsVisible = this.data.length
	},
	getColText: function (c, a) {
		var b = "";
		if (this.template.getVisibleText) {
			b = trim(this.template.getVisibleText(c) + " ")
		}
		if (a.getVisibleText) {
			return b + a.getVisibleText(c)
		}
		if (a.getValue) {
			return b + a.getValue(c)
		}
		if (a.value) {
			return b + c[a.value]
		}
		if (a.compute) {
			return b + a.compute(c)
		}
		return ""
	},
	resetFilters: function () {
		for (var d = 0, a = this.visibility.length; d < a; ++d) {
			var c = this.visibility[d];
			var b = this.columns[c];
			if (b.__filter) {
				b.__th.firstChild.firstChild.className = "";
				b.__filter = null;
				--(this.nFilters)
			}
		}
	},
	updateFilters: function (d) {
		Tooltip.hide();
		this.resetRowVisibility();
		var z, q, c;
		if (this.searchable) {
			this.quickSearchBox.parentNode.style.display = "";
			z = trim(this.quickSearchBox.value);
			if (z) {
				this.quickSearchGlass.style.display = "none";
				this.quickSearchClear.style.display = "";
				z = z.toLowerCase().replace(/\s+/g, " ");
				q = z.split(" ");
				c = q.length
			} else {
				this.quickSearchGlass.style.display = "";
				this.quickSearchClear.style.display = "none"
			}
		} else {
			if (this.quickSearchBox) {
				this.quickSearchBox.parentNode.style.display = "none"
			}
		}
		if (!z && this.nFilters == 0 && this.customFilter == null) {
			if (d) {
				this.updateNav();
				this.refreshRows()
			}
			return
		}
		var C = {
			1: function (i, j) {
				return i > j
			},
			2: function (i, j) {
				return i == j
			},
			3: function (i, j) {
				return i < j
			},
			4: function (i, j) {
				return i >= j
			},
			5: function (i, j) {
				return i <= j
			},
			6: function (i, k, j) {
				return k <= i && i <= j
			}
		};
		var p = {
			1: function (j, i, k) {
				return i > k
			},
			2: function (j, i, k) {
				return j <= k && k <= i
			},
			3: function (j, i, k) {
				return j < k
			},
			4: function (j, i, k) {
				return i >= k
			},
			5: function (j, i, k) {
				return j <= k
			},
			6: function (j, i, E, k) {
				return E <= i && j <= k
			}
		};
		var o = 0;
		for (var v = 0, w = this.data.length; v < w; ++v) {
			var g = this.data[v],
				m = 0;
			nSearchMatches = 0,
			matches = [];
			g.__hidden = true;
			if (this.customFilter && !this.customFilter(g, v)) {
				continue
			}
			for (var u = 0, h = this.visibility.length; u < h; ++u) {
				var n = this.visibility[u];
				var e = this.columns[n];
				if (e.__filter) {
					var a = e.__filter,
						b = false;
					if (e.type != null && e.type == "range") {
						var D = e.getMinValue(g),
							B = e.getMaxValue(g);
						b = (p[a.type])(D, B, a.value, a.value2)
					} else {
						if (e.type == null || e.type == "num" || a.type > 0) {
							var r = null;
							if (e.getValue) {
								r = e.getValue(g)
							} else {
								if (e.value) {
									r = parseFloat(g[e.value])
								}
							}
							if (!r) {
								r = 0
							}
							b = (C[a.type])(r, a.value, a.value2)
						} else {
							var l = this.getColText(g, e);
							if (l) {
								l = l.toString().toLowerCase();
								if (a.invert) {
									b = l.match(a.regex) != null
								} else {
									var A = 0;
									for (var t = 0, f = a.words.length; t < f; ++t) {
										if (l.indexOf(a.words[t]) != -1) {
											++A
										} else {
											break
										}
									}
									b = (A == a.words.length)
								}
							}
						}
					}
					if (a.invert) {
						b = !b
					}
					if (b) {
						++m
					} else {
						break
					}
				}
				if (z) {
					var l = this.getColText(g, e);
					if (l) {
						l = l.toString().toLowerCase();
						for (var t = 0, f = q.length; t < f; ++t) {
							if (!matches[t]) {
								if (l.indexOf(q[t]) != -1) {
									matches[t] = 1;
									++nSearchMatches
								}
							}
						}
					}
				}
			}
			if (g.__alwaysvisible || ((this.nFilters == 0 || m == this.nFilters) && (!z || nSearchMatches == c))) {
				g.__hidden = false;
				++o
			}
		}
		this.filtered = (o < this.data.length);
		this.nRowsVisible = o;
		if (d) {
			this.updateNav();
			this.refreshRows()
		}
	},
	changePage: function () {
		this.validatePage();
		this.refreshRows();
		this.updateNav();
		this.updatePound();
		var a = g_getScroll(),
			b = ac(this.container);
		if (a.y > b[1]) {
			scrollTo(a.x, b[1])
		}
	},
	firstPage: function () {
		this.rowOffset = 0;
		this.changePage();
		return false
	},
	previousPage: function () {
		this.rowOffset -= this.nItemsPerPage;
		this.changePage();
		return false
	},
	nextPage: function () {
		this.rowOffset += this.nItemsPerPage;
		this.changePage();
		return false
	},
	lastPage: function () {
		this.rowOffset = 99999999;
		this.changePage();
		return false
	},
	addSort: function (a, c) {
		var b = in_array(a, Math.abs(c), function (d) {
			return Math.abs(d)
		});
		if (b != -1) {
			c = a[b];
			a.splice(b, 1)
		}
		a.splice(0, 0, c)
	},
	sortBy: function (a) {
		if (a <= 0 || a > this.columns.length) {
			return
		}
		if (Math.abs(this.sort[0]) == a) {
			this.sort[0] = -this.sort[0]
		} else {
			var b = -1;
			if (this.columns[a - 1].type == "text") {
				b = 1
			}
			this.addSort(this.sort, b * a)
		}
		this.applySort();
		this.refreshRows();
		this.updateSortArrow();
		this.updatePound()
	},
	applySort: function () {
		if (this.sort.length == 0) {
			return
		}
		Listview.sort = this.sort;
		Listview.columns = this.columns;
		if (this.indexCreated) {
			this.data.sort(Listview.sortIndexedRows)
		} else {
			this.data.sort(Listview.sortRows)
		}
		this.updateSortIndex()
	},
	setSort: function (b, c, a) {
		if (this.sort.toString() != b.toString()) {
			this.sort = b;
			this.applySort();
			if (c) {
				this.refreshRows()
			}
			if (a) {
				this.updatePound()
			}
		}
	},
	readPound: function () {
		if (!this.poundable || !location.hash.length) {
			return false
		}
		var b = location.hash.substr(1);
		if (this.tabs) {
			var g = b.lastIndexOf(":");
			if (g == -1) {
				return false
			}
			b = b.substr(g + 1)
		}
		var a = parseInt(b);
		if (!isNaN(a)) {
			this.rowOffset = a;
			this.validatePage();
			if (this.poundable != 2) {
				var d = [];
				var f = b.match(/(\+|\-)[0-9]+/g);
				if (f != null) {
					for (var c = f.length - 1; c >= 0; --c) {
						var e = parseInt(f[c]) | 0;
						var b = Math.abs(e);
						if (b <= 0 || b > this.columns.length) {
							break
						}
						this.addSort(d, e)
					}
					this.setSort(d, false, false)
				}
			}
			if (this.tabs) {
				this.tabs.setTabPound(this.tabIndex, this.getTabPound())
			}
		}
	},
	updateSortArrow: function () {
		if (!this.sort.length || !this.thead || this.mode == Listview.MODE_TILED) {
			return
		}
		var a = in_array(this.visibility, Math.abs(this.sort[0]) - 1);
		if (a == -1) {
			return
		}
		if (this.mode == Listview.MODE_CHECKBOX) {
			a += 1
		}
		var b = this.thead.firstChild.childNodes[a].firstChild.firstChild.firstChild;
		if (this.lsa && this.lsa != b) {
			this.lsa.className = ""
		}
		b.className = (this.sort[0] < 0 ? "sortdesc" : "sortasc");
		this.lsa = b
	},
	updateSortIndex: function () {
		var b = this.data;
		for (var c = 0, a = b.length; c < a; ++c) {
			b[c].__si = c
		}
		this.indexCreated = true
	},
	updateTabName: function () {
		if (this.tabs && this.tabIndex != null) {
			this.tabs.setTabName(this.tabIndex, this.getTabName())
		}
	},
	updatePound: function (a) {
		if (!this.poundable) {
			return
		}
		var b = "",
			d = "";
		if (a) {
			if (location.hash.length && this.tabs) {
				var c = location.hash.lastIndexOf(":");
				if (c != -1 && !isNaN(parseInt(location.hash.substr(c + 1)))) {
					b = location.hash.substr(c + 1)
				}
			}
		} else {
			b = this.getTabPound()
		}
		if (this.customPound) {
			d = this.customPound
		} else {
			if (this.tabs) {
				d = this.id
			}
		}
		if (b && this.tabs) {
			this.tabs.setTabPound(this.tabIndex, b)
		}
		location.replace("#" + d + (d && b ? ":" : "") + b)
	},
	updateNav: function () {
		var e = [this.navTop, this.navBot],
			j = this.nItemsPerPage,
			h = this.rowOffset,
			d = this.nRowsVisible,
			g = 0,
			b = 0,
			f = 0,
			k = 0;
		if (d > 0) {
			if (! (this.hideNav & 1)) {
				e[0].style.display = ""
			}
			if (! (this.hideNav & 2)) {
				e[1].style.display = ""
			}
		} else {
			e[0].style.display = e[1].style.display = "none"
		}
		if (j) {
			if (h > 0) {
				b = 1;
				if (h >= j + j) {
					g = 1
				}
			}
			if (h + j < d) {
				f = 1;
				if (h + j + j < d) {
					k = 1
				}
			}
		}
		for (var c = 0; c < 2; ++c) {
			var a = e[c].childNodes;
			a[0].style.display = (g ? "" : "none");
			a[1].style.display = (b ? "" : "none");
			a[3].style.display = (f ? "" : "none");
			a[4].style.display = (k ? "" : "none");
			a = a[2].childNodes;
			a[0].firstChild.nodeValue = h + 1;
			a[2].firstChild.nodeValue = j ? Math.min(h + j, d) : d;
			a[4].firstChild.nodeValue = d
		}
	},
	getTabName: function () {
		var b = this.name,
			d = this.data.length;
		for (var c = 0, a = this.data.length; c < a; ++c) {
			if (this.data[c].__hidden || this.data[c].__deleted) {
				--d
			}
		}
		if (d > 0 && !this.hideCount) {
			b += sprintf(LANG.qty, d)
		}
		return b
	},
	getTabPound: function () {
		var a = "";
		a += this.rowOffset;
		if (this.poundable != 2 && this.sort.length) {
			a += ("+" + this.sort.join("+")).replace(/\+\-/g, "-")
		}
		return a
	},
	getCheckedRows: function () {
		var d = [];
		for (var c = 0, a = this.data.length; c < a; ++c) {
			var b = this.data[c];
			if ((b.__cb && b.__cb.checked) || (!b.__cb && b.__chk)) {
				d.push(b)
			}
		}
		return d
	},
	resetCheckedRows: function () {
		for (var c = 0, a = this.data.length; c < a; ++c) {
			var b = this.data[c];
			if (b.__cb) {
				b.__cb.checked = false
			} else {
				if (b.__chk) {
					b.__chk = null
				}
			}
			if (b.__tr) {
				b.__tr.className = b.__tr.className.replace("checked", "")
			}
		}
	},
	deleteRows: function (c) {
		if (!c || !c.length) {
			return
		}
		for (var b = 0, a = c.length; b < a; ++b) {
			var d = c[b];
			if (!d.__hidden && !d.__hidden) {
				this.nRowsVisible -= 1
			}
			d.__deleted = true
		}
		this.updateTabName();
		if (this.rowOffset >= this.nRowsVisible) {
			this.previousPage()
		} else {
			this.refreshRows();
			this.updateNav()
		}
	},
	setData: function (a) {
		this.data = a;
		this.indexCreated = false;
		this.resetCheckedRows();
		this.resetRowVisibility();
		if (this.tabs) {
			this.pounded = (this.tabs.poundedTab == this.tabIndex);
			if (this.pounded) {
				this.readPound()
			}
		} else {
			this.readPound()
		}
		this.applySort();
		this.updateSortArrow();
		if (this.customFilter != null) {
			this.updateFilters()
		}
		this.updateNav();
		this.refreshRows()
	},
	getClipDiv: function () {
		return this.clipDiv
	},
	getNoteTopDiv: function () {
		return this.noteTop
	},
	focusSearch: function () {
		this.quickSearchBox.focus()
	},
	clearSearch: function () {
		this.quickSearchBox.value = ""
	},
	getList: function () {
		if (!this.debug) {
			return
		}
		var b = "";
		for (var a = 0; a < this.data.length; a++) {
			if (!this.data[a].__hidden) {
				b += this.data[a].id + ", "
			}
		}
		prompt("", b)
	},
	createIndicator: function (a, b, d) {
		if (!this.noteIndicators) {
			this.noteIndicators = ce("div");
			this.noteIndicators.className = "listview-indicators";
			$(this.noteIndicators).insertBefore($(this.noteTop))
		}
		$(this.noteIndicators).append($('<span class="indicator"></span>').html(a).append(b ? $('<a class="indicator-x" style="outline: none">[x]</a>').attr("href", (typeof b == "function" ? "javascript:;" : b)).click(typeof b == "function" ? b : null) : "").css("cursor", (typeof d == "function" ? "pointer" : null)).click(typeof d == "function" ? d : null))
	},
	removeIndicators: function () {
		if (this.noteIndicators) {
			$(this.noteIndicators).remove();
			this.noteIndicators = null
		}
	}
};
Listview.sortRows = function (e, d) {
	var j = Listview.sort,
		k = Listview.columns;
	for (var h = 0, c = j.length; h < c; ++h) {
		var g, f = k[Math.abs(j[h]) - 1];
		if (f.sortFunc) {
			g = f.sortFunc(e, d, j[h])
		} else {
			g = strcmp(e[f.value], d[f.value])
		}
		if (g != 0) {
			return g * j[h]
		}
	}
	return 0
},
Listview.sortIndexedRows = function (d, c) {
	var g = Listview.sort,
		h = Listview.columns,
		e = h[Math.abs(g[0]) - 1],
		f;
	if (e.sortFunc) {
		f = e.sortFunc(d, c, g[0])
	} else {
		f = strcmp(d[e.value], c[e.value])
	}
	if (f != 0) {
		return f * g[0]
	}
	return (d.__si - c.__si)
},
Listview.cbSelect = function (c) {
	for (var e = 0, b = this.data.length; e < b; ++e) {
		var d = this.data[e];
		var g = c;
		if (d.__hidden) {
			continue
		}
		if (!d.__nochk && d.__cb) {
			var a = d.__cb,
				f = a.parentNode.parentNode;
			if (g == null) {
				g = !a.checked
			}
			if (a.checked != g) {
				a.checked = g;
				f.className = (a.checked ? f.className + " checked" : f.className.replace("checked", ""))
			}
		} else {
			if (g == null) {
				g = true
			}
		}
		d.__chk = g
	}
};
Listview.cbClick = function (a) {
	setTimeout(Listview.cbUpdate.bind(0, 0, this, this.parentNode.parentNode), 1);
	sp(a)
};
Listview.cbCellClick = function (a) {
	setTimeout(Listview.cbUpdate.bind(0, 1, this.firstChild, this.parentNode), 1);
	sp(a)
};
Listview.cbUpdate = function (c, a, b) {
	if (c) {
		a.checked = !a.checked
	}
	b.className = (a.checked ? b.className + " checked" : b.className.replace("checked", ""))
};
Listview.headerClick = function (a, b, c) {
	c = $E(c);
	if (c._button == 3 || c.shiftKey || c.ctrlKey) {
		Tooltip.hide();
		setTimeout(Listview.headerFilter.bind(this, a, null), 1)
	} else {
		this.sortBy(b + 1)
	}
	return false
};
Listview.headerFilter = function (c, f) {
	var j = "";
	if (c.__filter) {
		if (c.__filter.invert) {
			j += "!"
		}
		j += c.__filter.text
	}
	if (f == null) {
		var f = prompt(sprintf(LANG.prompt_colfilter1 + (c.type == "text" ? LANG.prompt_colfilter2 : LANG.prompt_colfilter3), c.name), j)
	}
	if (f != null) {
		var e = {
			text: "",
			type: -1
		};
		f = trim(f.replace(/\s+/g, " "));
		if (!f && this.onEmptyFilter) {
			this.onEmptyFilter(c)
		} else {
			if (f) {
				if (f.charAt(0) == "!" || f.charAt(0) == "-") {
					e.invert = 1;
					f = f.substr(1)
				}
				if (c.type == "text") {
					e.type = 0;
					e.text = f;
					if (e.invert) {
						e.regex = g_createOrRegex(f)
					} else {
						e.words = f.toLowerCase().split(" ")
					}
				}
				var i, b;
				if (f.match(/(>|=|<|>=|<=)\s*([0-9\.]+)/)) {
					i = parseFloat(RegExp.$2);
					if (!isNaN(i)) {
						switch (RegExp.$1) {
						case ">":
							e.type = 1;
							break;
						case "=":
							e.type = 2;
							break;
						case "<":
							e.type = 3;
							break;
						case ">=":
							e.type = 4;
							break;
						case "<=":
							e.type = 5;
							break
						}
						e.value = i;
						e.text = RegExp.$1 + " " + i
					}
				} else {
					if (f.match(/([0-9\.]+)\s*\-\s*([0-9\.]+)/)) {
						i = parseFloat(RegExp.$1);
						b = parseFloat(RegExp.$2);
						if (!isNaN(i) && !isNaN(b)) {
							if (i > b) {
								var g = i;
								i = b;
								b = g
							}
							if (i == b) {
								e.type = 2;
								e.value = i;
								e.text = "= " + i
							} else {
								e.type = 6;
								e.value = i;
								e.value2 = b;
								e.text = i + " - " + b
							}
						}
					} else {
						var d = f.toLowerCase().split(" ");
						if (!c.allText && d.length == 1 && !isNaN(i = parseFloat(d[0]))) {
							e.type = 2;
							e.value = i;
							e.text = "= " + i
						} else {
							if (c.type == "text") {
								e.type = 0;
								e.text = f;
								if (e.invert) {
									e.regex = g_createOrRegex(f)
								} else {
									e.words = d
								}
							}
						}
					}
				}
				if (e.type == -1) {
					alert(LANG.message_invalidfilter);
					return
				}
			}
		}
		if (!c.__filter || e.text != c.__filter.text || e.invert != c.__filter.invert) {
			var h = c.__th.firstChild.firstChild;
			if (f && e.text) {
				if (!c.__filter) {
					h.className = "q5";
					++(this.nFilters)
				}
				c.__filter = e
			} else {
				if (c.__filter) {
					h.className = "";
					--(this.nFilters)
				}
				c.__filter = null
			}
			this.updateFilters(1)
		}
	}
};
Listview.headerOver = function (b, c, f) {
	var d = "";
	d += '<b class="q1">' + (c.tooltip ? c.tooltip : c.name) + "</b>";
	if (c.__filter) {
		d += "<br />" + sprintf((c.__filter.invert ? LANG.tooltip_colfilter2 : LANG.tooltip_colfilter1), c.__filter.text)
	}
	d += '<br /><span class="q2">' + LANG.tooltip_lvheader1 + "</span>";
	if (this.filtrable && (c.filtrable == null || c.filtrable)) {
		d += '<br /><span class="q2">' + (Browser.opera ? LANG.tooltip_lvheader3 : LANG.tooltip_lvheader2) + "</span>"
	}
	Tooltip.show(b, d, 0, 0, "q")
};
Listview.extraCols = {
	id: {
		id: "id",
		name: "ID",
		width: "5%",
		compute: function (a, b) {
			if (a.id) {
				ae(b, ct(a.id))
			}
		}
	},
	patch: {
		id: "obj-patch",
		name: LANG.patch,
		compute: function (e, g) {
			if (typeof e.patch != "undefined") {
				var a = parseInt(e.patch);
				if (a == 0 || a == -1) {
					ae(g, ct("???"))
				} else {
					var b = Math.floor(a / 10000);
					var d = Math.floor(a / 100) % 100;
					var f = a % 100;
					var c = sprintf("$1.$2.$3", b, d, f);
					ae(g, ct(c))
				}
			}
		},
		sortFunc: function (d, c, e) {
			if (d.patch == c.patch) {
				return 0
			} else {
				if (d.patch < c.patch) {
					return -1
				} else {
					return 1
				}
			}
		}
	},
	date: {
		id: "obj-date",
		name: LANG.added,
		compute: function (c, d) {
			if (c.date) {
				if (c.date <= 86400) {
					ae(d, ct("???"))
				} else {
					var a = new Date(c.date * 1000);
					var b = (g_serverTime - a) / 1000;
					return Listview.funcBox.coFormatDate(d, b, a, null, true)
				}
			}
		},
		sortFunc: function (d, c, e) {
			if (d.date == c.date) {
				return 0
			} else {
				if (d.date < c.date) {
					return -1
				} else {
					return 1
				}
			}
		}
	},
	cost: {
		id: "cost",
		name: LANG.cost,
		getValue: function (a) {
			if (a.cost) {
				return (a.cost[3] && a.cost[3][0] ? a.cost[3][0][1] : 0) || a.cost[2] || a.cost[1] || a.cost[0]
			}
		},
		compute: function (a, b) {
			if (a.cost) {
				Listview.funcBox.appendMoney(b, a.cost[0], null, a.cost[1], a.cost[2], a.cost[3])
			}
		},
		sortFunc: function (d, c, e) {
			if (d.cost == null) {
				return -1
			} else {
				if (c.cost == null) {
					return 1
				}
			}
			var g = 0,
				f = 0;
			if (d.cost[3] != null) {
				array_walk(d.cost[3], function (a, b, j, h) {
					g += Math.pow(10, h) + a[1]
				})
			}
			if (c.cost[3] != null) {
				array_walk(c.cost[3], function (a, b, j, h) {
					f += Math.pow(10, h) + a[1]
				})
			}
			return strcmp(g, f) || strcmp(d.cost[2], c.cost[2]) || strcmp(d.cost[1], c.cost[1]) || strcmp(d.cost[0], c.cost[0])
		}
	},
	count: {
		id: "count",
		name: LANG.count,
		value: "count",
		compute: function (b, c) {
			if (! (this._totalCount > 0 || b.outof > 0)) {
				return
			}
			if (b.outof) {
				var a = ce("div");
				a.className = "small q0";
				ae(a, ct(sprintf(LANG.lvdrop_outof, b.outof)));
				ae(c, a)
			}
			return b.count
		},
		getVisibleText: function (a) {
			var b = a.count;
			if (a.outof) {
				b += " " + a.outof
			}
			return b
		},
		sortFunc: function (d, c, e) {
			if (d.count == null) {
				return -1
			} else {
				if (c.count == null) {
					return 1
				}
			}
			return strcmp(d.count, c.count)
		}
	},
	percent: {
		id: "percent",
		name: "%",
		value: "percent",
		compute: function (a, b) {
			if (a.count <= 0) {
				return "??"
			}
			if (a.percent >= 1.95) {
				return a.percent.toFixed(0)
			} else {
				return parseFloat(a.percent.toFixed(1))
			}
		},
		getVisibleText: function (a) {
			if (a.count <= 0) {
				return "??"
			}
			if (a.percent >= 1.95) {
				return a.percent.toFixed(0)
			} else {
				return parseFloat(a.percent.toFixed(1))
			}
		},
		sortFunc: function (e, c, f) {
			if (e.count == null) {
				return -1
			} else {
				if (c.count == null) {
					return 1
				}
			}
			if (e.percent >= 1.95) {
				var d = e.percent.toFixed(0)
			} else {
				d = parseFloat(e.percent.toFixed(1))
			}
			if (c.percent >= 1.95) {
				var g = c.percent.toFixed(0)
			} else {
				g = parseFloat(c.percent.toFixed(1))
			}
			return strcmp(d, g)
		}
	},
	stock: {
		id: "stock",
		name: LANG.stock,
		width: "10%",
		value: "stock",
		compute: function (a, b) {
			if (a.stock > 0) {
				return a.stock
			} else {
				b.style.fontFamily = "Verdana, sans-serif";
				return String.fromCharCode(8734)
			}
		},
		getVisibleText: function (a) {
			if (a.stock > 0) {
				return a.stock
			} else {
				return String.fromCharCode(8734) + " infinity"
			}
		}
	},
	mode: {
		id: "mode",
		name: "Mode",
		after: "name",
		type: "text",
		compute: function (a, b) {
			if (a.modes && a.modes.mode) {
				if ((a.modes.mode & 120) == 120 || (a.modes.mode & 3) == 3) {
					return LANG.pr_note_all
				}
				return Listview.extraCols.mode.getVisibleText(a)
			}
		},
		getVisibleText: function (f) {
			var a = !!(f.modes.mode & 26);
			var g = !!(f.modes.mode & 97);
			var e = !!(f.modes.mode & 40);
			var b = !!(f.modes.mode & 80);
			var d;
			if (e && !b) {
				d = 10
			} else {
				if (b && !e) {
					d = 25
				}
			}
			var c;
			if (a && !g) {
				c = "normal"
			} else {
				if (g && !a) {
					c = "heroic"
				}
			}
			if (c) {
				if (d) {
					return sprintf(LANG["tab_" + c + "X"], d)
				} else {
					return LANG["tab_" + c]
				}
			}
			if (d) {
				return sprintf(LANG.lvzone_xman, d)
			}
			return LANG.pr_note_all
		},
		sortFunc: function (d, c, e) {
			if (d.modes && c.modes) {
				return -strcmp(d.modes.mode, c.modes.mode)
			}
		}
	}
};
Listview.funcBox = {
	createSimpleCol: function (c, d, a, b) {
		return {
			id: c,
			name: (LANG[d] !== undefined ? LANG[d] : d),
			width: a,
			value: b
		}
	},
	initLootTable: function (b) {
		var a;
		if (this._totalCount != null) {
			a = this._totalCount
		} else {
			a = b.outof
		}
		if (a == 0) {
			if (b.count != -1) {
				b.percent = b.count
			} else {
				b.percent = 0
			}
		} else {
			b.percent = b.count / a * 100
		}
		if (b.modes) {
			(Listview.funcBox.initModeFilter.bind(this, b))()
		}
	},
	initModeFilter: function (b) {
		if (this._lootModes == null) {
			this._lootModes = {}
		}
		for (var a = -2; a <= 4; ++a) {
			if (this._lootModes[a] == null) {
				this._lootModes[a] = 0
			}
			if (b.modes && (b.modes.mode & 1 << parseInt(a) + 2)) {
				this._lootModes[a]++
			}
		}
	},
	addModeIndicator: function () {
		var d = location.hash.match(/:mode=([^:]+)/),
			c = [0, -1, -2, 1, 3, 2, 4],
			n = {
			"-2": LANG.tab_heroic,
			"-1": LANG.tab_normal,
			0: LANG.tab_world,
			1: sprintf(LANG.tab_normalX, 10),
			2: sprintf(LANG.tab_normalX, 25),
			3: sprintf(LANG.tab_heroicX, 10),
			4: sprintf(LANG.tab_heroicX, 25)
		};
		var m = function (i, f, a) {
			g_setSelectedLink(this, "lootmode");
			e.customPound = e.id + (f != null ? ":mode=" + g_urlize(n[f].replace(" ", "")) : "");
			e.customFilter = function (j) {
				return Listview.funcBox.filterMode(j, e._totalCount, i)
			};
			e.updateFilters(1);
			e.applySort();
			e.refreshRows();
			if (a) {
				e.updatePound(1)
			}
		};
		var e = this,
			b = [],
			o;
		o = $("<a><span>" + LANG.pr_note_all + "</span></a>");
		o[0].f = m.bind(o[0], null, null, 1);
		o.click(o[0].f);
		var h = m.bind(o[0], null, null, 0);
		h();
		b.push($('<span class="indicator-mode"></span>').append(o).append($("<b>" + LANG.pr_note_all + "</b>")));
		for (var g = 0, l = c.length; g < l; ++g) {
			var k = c[g];
			if (!this._lootModes[k]) {
				continue
			}
			o = $("<a><span>" + n[k] + "</span> (" + this._lootModes[k] + ")</a>");
			o[0].f = m.bind(o[0], 1 << k + 2, k, 1);
			o.click(o[0].f);
			if (k < -1 || k > 2) {
				o.addClass("icon-heroic")
			}
			b.push($('<span class="indicator-mode"></span>').append(o).append($("<b" + (k < -1 || k > 2 ? ' class="icon-heroic"' : "") + ">" + n[k] + " (" + this._lootModes[k] + ")</b>")));
			if (d && d[1] == g_urlize(n[k].replace(" ", ""))) {
				(o[0].f)()
			}
		}
		if (b.length > 2) {
			for (var k = 0, l = b.length; k < l; ++k) {
				this.createIndicator(b[k], null, $("a", b[k])[0].f)
			}
			$(this.noteTop).append($('<div class="clear"></div>'))
		}
	},
	filterMode: function (d, b, c) {
		if (b != null && d.count != null) {
			if (d._count == null) {
				d._count = d.count
			}
			var a = d._count;
			if (c != null && d.modes[c]) {
				a = d.modes[c].count;
				b = d.modes[c].outof
			}
			d.__tr = null;
			d.count = a;
			d.outof = b;
			d.percent = a / b * 100
		}
		return (c != null ? (d.modes && (d.modes.mode & c)) : true)
	},
	initSubclassFilter: function (b) {
		var a = b.classs || 0;
		if (this._itemClasses == null) {
			this._itemClasses = {}
		}
		if (this._itemClasses[a] == null) {
			this._itemClasses[a] = 0
		}
		this._itemClasses[a]++
	},
	addSubclassIndicator: function () {
		var k = location.hash.match(/:type=([^:]+)/),
			b = [];
		for (var h in g_item_classes) {
			b.push({
				i: h,
				n: g_item_classes[h]
			})
		}
		b.sort(function (i, f) {
			return strcmp(i.n, f.n)
		});
		var m = function (f, a) {
			g_setSelectedLink(this, "itemclass");
			d.customPound = d.id + (f != null ? ":type=" + f : "");
			d.customFilter = function (i) {
				return f == null || f == i.classs
			};
			d.updateFilters(1);
			d.applySort();
			d.refreshRows();
			if (a) {
				d.updatePound(1)
			}
		};
		var d = this,
			c = [],
			n;
		n = $("<a><span>" + LANG.pr_note_all + "</span></a>");
		n[0].f = m.bind(n[0], null, 1);
		n.click(n[0].f);
		var g = m.bind(n[0], null, 0);
		g();
		c.push($('<span class="indicator-mode"></span>').append(n).append($("<b>" + LANG.pr_note_all + "</b>")));
		for (var e = 0, l = b.length; e < l; ++e) {
			var h = b[e].i;
			if (!this._itemClasses[h]) {
				continue
			}
			n = $("<a><span>" + g_item_classes[h] + "</span> (" + this._itemClasses[h] + ")</a>");
			n[0].f = m.bind(n[0], h, 1);
			n.click(n[0].f);
			c.push($('<span class="indicator-mode"></span>').append(n).append($("<b>" + g_item_classes[h] + " (" + this._itemClasses[h] + ")</b>")));
			if (k && k[1] == g_urlize(h)) {
				(n[0].f)()
			}
		}
		if (c.length > 2) {
			for (var h = 0, l = c.length; h < l; ++h) {
				this.createIndicator(c[h], null, $("a", c[h])[0].f)
			}
			$(this.noteTop).css("padding-bottom", "12px");
			$(this.noteIndicators).append($('<div class="clear"></div>')).insertAfter($(this.navTop))
		}
	},
	initStatisticFilter: function (b) {
		var a = b.statistic || 0;
		if (this._achievTypes == null) {
			this._achievTypes = {}
		}
		if (this._achievTypes[a] == null) {
			this._achievTypes[a] = 0
		}
		this._achievTypes[a]++
	},
	addStatisticIndicator: function () {
		if (!this._achievTypes || !(this._achievTypes[0] && this._achievTypes[1])) {
			return
		}
		var g = location.hash.match(/:statistics/);
		var d = function (f, a) {
			g_setSelectedLink(this, "achievtype");
			e.customPound = e.id + (f ? ":statistics" : "");
			e.customFilter = function (h) {
				return h.statistic == f
			};
			e.updateFilters(1);
			e.applySort();
			e.refreshRows();
			if (a) {
				e.updatePound(1)
			}
		};
		var e = this,
			b;
		b = $("<a><span>" + LANG.types[10][2] + "</span></a>");
		b[0].f = d.bind(b[0], 0, 1);
		b.click(b[0].f);
		if (!g) {
			var c = d.bind(b[0], 0, 0)
		}
		this.createIndicator($('<span class="indicator-mode"></span>').append(b).append($("<b>" + LANG.types[10][2] + "</b>")), null, b[0].f);
		b = $("<a><span>" + LANG.types[16][2] + "</span></a>");
		b[0].f = d.bind(b[0], 1, 1);
		b.click(b[0].f);
		if (g) {
			var c = d.bind(b[0], 1, 0)
		}
		this.createIndicator($('<span class="indicator-mode"></span>').append(b).append($("<b>" + LANG.types[16][2] + "</b>")), null, b[0].f);
		$(this.noteTop).append($('<div class="clear"></div>'));
		c()
	},
	assocArrCmp: function (e, d, c) {
		if (e == null) {
			return -1
		} else {
			if (d == null) {
				return 1
			}
		}
		var h = Math.max(e.length, d.length);
		for (var g = 0; g < h; ++g) {
			if (e[g] == null) {
				return -1
			} else {
				if (d[g] == null) {
					return 1
				}
			}
			var f = strcmp(c[e[g]], c[d[g]]);
			if (f != 0) {
				return f
			}
		}
		return 0
	},
	assocBinFlags: function (d, a) {
		var c = [];
		for (var b in a) {
			if (!isNaN(b) && (d & 1 << b - 1)) {
				c.push(b)
			}
		}
		c.sort(function (f, e) {
			return strcmp(a[f], a[e])
		});
		return c
	},
	location: function (f, g) {
		if (f.location == null) {
			return -1
		}
		for (var d = 0, b = f.location.length; d < b; ++d) {
			if (d > 0) {
				ae(g, ct(LANG.comma))
			}
			var e = f.location[d];
			if (e == -1) {
				ae(g, ct(LANG.ellipsis))
			} else {
				var c = ce("a");
				c.className = "q1";
				c.href = "/zone=" + e;
				ae(c, ct(g_zones[e]));
				ae(g, c)
			}
		}
	},
	arrayText: function (b, e) {
		if (b == null) {
			return
		} else {
			if (!is_array(b)) {
				return e[b]
			}
		}
		var d = "";
		for (var c = 0, a = b.length; c < a; ++c) {
			if (c > 0) {
				d += " "
			}
			if (!e[b[c]]) {
				continue
			}
			d += e[b[c]]
		}
		return d
	},
	createCenteredIcons: function (k, f, t, o) {
		if (k != null) {
			var n = ce("div"),
				b = ce("div");
			if (t) {
				var m = ce("div");
				m.style.position = "relative";
				m.style.width = "1px";
				var p = ce("div");
				p.className = "q0";
				p.style.position = "absolute";
				p.style.right = "2px";
				p.style.lineHeight = "26px";
				p.style.fontSize = "11px";
				p.style.whiteSpace = "nowrap";
				ae(p, ct(t));
				ae(m, p);
				ae(n, m)
			}
			var j = g_items;
			if (o == 1) {
				j = g_spells
			}
			for (var g = 0, l = k.length; g < l; ++g) {
				var q;
				if (k[g] == null) {
					q = ce("div");
					q.style.width = q.style.height = "26px"
				} else {
					var e, h;
					if (typeof k[g] == "object") {
						e = k[g][0];
						h = k[g][1]
					} else {
						e = k[g]
					}
					if (e) {
						q = j.createIcon(e, 0, h)
					} else {
						q = Icon.create("inventoryslot_empty", 0, null, "javascript:;")
					}
				}
				if (k.length == 1 && o == 2) {
					if (e && g_items[e]) {
						ee(n);
						var u = g_items[e],
							r = ce("a"),
							c = ce("span");
						c.style.paddingTop = "4px";
						r.href = "/item=" + e;
						r.className = "q" + u.quality + " icontiny";
						r.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + u.icon.toLowerCase() + ".gif)";
						r.style.whiteSpace = "nowrap";
						st(r, u["name_" + Locale.getName()]);
						ae(c, r);
						if (h > 1) {
							ae(c, ct(" (" + h + ")"))
						}
						if (t) {
							var m = ce("span");
							var p = ce("span");
							m.className = p.className = "q0";
							m.style.fontSize = p.style.fontSize = "11px";
							m.style.whiteSpace = p.style.whiteSpace = "nowrap";
							p.style.visibility = "hidden";
							ae(m, ct(t));
							ae(p, ct(t));
							ae(n, m);
							ae(n, c);
							ae(n, p)
						} else {
							ae(n, c)
						}
					}
				} else {
					q.style.cssFloat = q.style.styleFloat = "left";
					ae(n, q);
					n.style.margin = "0 auto";
					n.style.textAlign = "left";
					n.style.width = (26 * k.length) + "px"
				}
			}
			b.className = "clear";
			ae(f, n);
			ae(f, b);
			return true
		}
	},
	createSocketedIcons: function (b, e, c, g, n) {
		var m = 0,
			k = ce("div"),
			a = ce("div");
		for (var f = 0, h = b.length; f < h; ++f) {
			var l, j = c[f];
			if (!c || !j) {
				l = Icon.create(null, 0, null, "javascript:;")
			} else {
				if (g_items[j]) {
					l = g_items.createIcon(j, 0)
				} else {
					l = Icon.create(g_gems[j].icon, 0, null, "/item=" + j)
				}
			}
			l.className += " iconsmall-socket-" + g_file_gems[b[f]] + (!c || !j ? "-empty" : "");
			l.style.cssFloat = l.style.styleFloat = "left";
			if (g && g[f]) {
				l.insertBefore(ce("var"), l.childNodes[1]);
				++m
			}
			ae(k, l)
		}
		k.style.margin = "0 auto";
		k.style.textAlign = "left";
		k.style.width = (26 * b.length) + "px";
		a.className = "clear";
		ae(e, k);
		ae(e, a);
		if (n && m == b.length) {
			k = ce("div");
			k.style.paddingTop = "4px";
			ae(k, ct(n));
			ae(e, k)
		}
	},
	getItemType: function (c, a, b) {
		if (b != null && g_item_subsubclasses[c] != null && g_item_subsubclasses[c][a] != null) {
			return {
				url: "/items=" + c + "." + a + "." + b,
				text: g_item_subsubclasses[c][a][b]
			}
		} else {
			if (a != null && g_item_subclasses[c] != null) {
				return {
					url: "/items=" + c + "." + a,
					text: g_item_subclasses[c][a]
				}
			} else {
				return {
					url: "/items=" + c,
					text: g_item_classes[c]
				}
			}
		}
	},
	getQuestCategory: function (a) {
		return g_quest_sorts[a]
	},
	getQuestReputation: function (d, b) {
		if (b.reprewards) {
			for (var c = 0, a = b.reprewards.length; c < a; ++c) {
				if (b.reprewards[c][0] == d) {
					return b.reprewards[c][1]
				}
			}
		}
	},
	getFactionCategory: function (b, a) {
		if (b) {
			return g_faction_categories[b]
		} else {
			return g_faction_categories[a]
		}
	},
	getEventNextDates: function (e, a, h) {
		if (typeof e != "string" || typeof a != "string") {
			return [null, null]
		}
		e = new Date(e.replace(/-/g, "/"));
		a = new Date(a.replace(/-/g, "/"));
		if (isNaN(e.getTime()) || isNaN(a.getTime())) {
			return [null, null]
		}
		var b = 0;
		if (h == -1) {
			var j = new Date(g_serverTime.getFullYear(), g_serverTime.getMonth(), 1, e.getHours(), e.getMinutes(), e.getSeconds());
			for (var c = 0; c < 2; ++c) {
				j.setDate(1);
				j.setMonth(j.getMonth() + c);
				var g = j.getDay();
				var f = 1;
				if (j.getYear() == 2009) {
					f = 0
				}
				if (g > f) {
					j.setDate(j.getDate() + (7 - g))
				}
				var d = new Date(j);
				d.setDate(d.getDate() + (7 - f));
				if (g_serverTime.getTime() < d.getTime()) {
					break
				}
			}
			b = j.getTime() - e.getTime()
		} else {
			if (h > 0) {
				h *= 1000;
				b = Math.ceil((g_serverTime.getTime() - a.getTime()) / h) * h
			}
		}
		e.setTime(e.getTime() + b);
		a.setTime(a.getTime() + b);
		return [e, a]
	},
	createTextRange: function (b, a) {
		b |= 0;
		a |= 0;
		if (b > 1 || a > 1) {
			if (b != a && a > 0) {
				return b + "-" + a
			} else {
				return b + ""
			}
		}
		return null
	},
	coGetColor: function (c, a) {
		if (c.user && g_customColors[c.user]) {
			return " comment-" + g_customColors[c.user]
		}
		switch (a) {
		case -1:
			var b = c.divPost.childNodes[1].className.match(/comment-([a-z]+)/);
			if (b != null) {
				return " comment-" + b[1]
			}
			break;
		case 3:
		case 4:
			if (c.roles & U_GROUP_GREEN_TEXT) {
				return " comment-green"
			} else {
				if (c.roles & U_GROUP_VIP) {
					return " comment-gold"
				}
			}
			break
		}
		if (c.roles & U_GROUP_ADMIN) {
			return " comment-blue"
		} else {
			if (c.rating >= 10) {
				return " comment-green"
			} else {
				if (c.rating < 0) {
					return " comment-bt"
				}
			}
		}
		return ""
	},
	coToggleVis: function (c) {
		var b = g_toggleDisplay(c.divBody);
		this.firstChild.nodeValue = (b ? LANG.lvcomment_hide : LANG.lvcomment_show);
		c.__div.className = trim(c.__div.className.replace("comment-collapsed", "")) + (b ? "" : " comment-collapsed");
		var a = c.divHeader.firstChild.lastChild;
		if (c.ratable) {
			a.style.display = ""
		} else {
			if (c.deleted || c.purged) {
				a.style.fontWeight = "normal";
				a.className = "q10";
				a.innerHTML = (c.deleted ? LANG.lvcomment_deleted : LANG.lvcomment_purged);
				a.style.display = ""
			}
		}
		g_toggleDisplay(c.divLinks);
		if (c.lastEdit != null) {
			g_toggleDisplay(c.divLastEdit)
		}
	},
	coDisplayRating: function (b) {
		if (typeof(Listview._ratingMode) == "undefined") {
			Listview._ratingMode = 0
		}
		var c = Listview._ratingMode;
		if (c == 0) {
			if (b.rating < 0) {
				return b.rating
			} else {
				return "+" + b.rating
			}
		}
		if (c == 1) {
			var e = 0,
				d = 0;
			for (var a = 0; a < b.raters.length; a++) {
				if (b.raters[a][1] < 0) {
					e += b.raters[a][1]
				} else {
					d += b.raters[a][1]
				}
			}
			return "+" + d + " / " + e
		}
	},
	coToggleRating: function () {
		if (typeof(Listview._ratingMode) == "undefined") {
			Listview._ratingMode = 0
		}
		if (++Listview._ratingMode > 1) {
			Listview._ratingMode = 0
		}
		for (var b = 0; b < this.data.length; ++b) {
			if (this.data[b].__div) {
				var a = $(".comment-rating b a span", this.data[b].__div).get(0);
				if (a && a.firstChild) {
					a.firstChild.nodeValue = Listview.funcBox.coDisplayRating(this.data[b])
				}
			}
		}
	},
	coRate: function (d, a) {
		if (a == 0) {
			var b = 5;
			if (g_user.roles & U_GROUP_ADMIN) {
				b = 25
			} else {
				if (g_user.roles & U_GROUP_BUREAU) {
					b = 15
				}
			}
			var c = prompt(sprintf(LANG.prompt_customrating, b, b), 0);
			if (c == null) {
				return
			} else {
				c |= 0;
				if (c != 0 && Math.abs(c) <= b) {
					a = c
				}
			}
			if (a == 0) {
				return
			}
		} else {
			if (g_user.roles & U_GROUP_COMMENTS_MODERATOR) {
				a *= 5
			}
		}
		$.get("/comment=rate&id=" + d.id + "&rating=" + a, null, function (f) {
			var e = d.divHeader.firstChild;
			Tooltip.hide();
			if (f == "0") {
				d.rating += a;
				d.raters.push([g_user.id, a]);
				e = e.childNodes[e.childNodes.length - 3];
				var g = ge("commentrating" + d.id);
				g.firstChild.nodeValue = Listview.funcBox.coDisplayRating(d);
				de(e.nextSibling);
				de(e.nextSibling)
			} else {
				if (f == "1") {
					$(e).html(LANG.tooltip_banned_rating)
				} else {
					$(e).html(LANG.genericerror)
				}
			}
		})
	},
	coDelete: function (a) {
		if (a.purged) {
			alert(LANG.message_cantdeletecomment)
		} else {
			if (confirm(LANG.confirm_deletecomment)) {
				new Ajax("/comment=delete&id=" + a.id);
				this.deleteRows([a])
			}
		}
	},
	coDetach: function (a) {
		if (a.replyTo == 0) {
			alert(LANG.message_cantdetachcomment)
		} else {
			if (confirm(LANG.confirm_detachcomment)) {
				new Ajax("/comment=detach&id=" + a.id);
				a.replyTo = 0;
				alert(LANG.message_commentdetached)
			}
		}
	},
	coEdit: function (f, d) {
		f.divBody.style.display = "none";
		f.divResponse.style.display = "none";
		f.divLinks.firstChild.style.display = "none";
		var e = $("<div/>");
		e.addClass("comment-edit");
		f.divEdit = e[0];
		if (d == -1) {
			if (g_users[f.user] != null) {
				f.roles = g_users[f.user].roles
			}
		}
		var a = Listview.funcBox.coEditAppend(e, f, d);
		var b = $("<div/>");
		b.addClass("comment-edit-buttons");
		var c = $("<button/>", {
			text: LANG.compose_save
		});
		c.click(Listview.funcBox.coEditButton.bind(c[0], f, true, d));
		b.append(c);
		b.append(ct(" "));
		c = $("<button/>", {
			text: LANG.compose_cancel
		});
		c.click(Listview.funcBox.coEditButton.bind(c[0], f, false, d));
		b.append(c);
		e.append(b);
		e.insertAfter(f.divBody);
		a.focus()
	},
	coEditAppend: function (o, c, n) {
		var g = Listview.funcBox.coGetCharLimit(n);
		if (n == 1 || n == 3 || n == 4) {
			c.user = g_user.name;
			c.roles = g_user.roles;
			c.rating = 1
		} else {
			if (n == 2) {
				c.roles = g_user.roles;
				c.rating = 1
			}
		}
		if (n == -1 || n == 0) {
			var k = $("<div/>", {
				text: LANG.compose_mode
			});
			k.addClass("comment-edit-modes");
			var r = $("<a/>", {
				href: "javascript:;",
				text: LANG.compose_edit
			});
			r.click(Listview.funcBox.coModeLink.bind(r[0], 1, n, c));
			r.addClass("selected");
			k.append(r);
			k.append(ct("|"));
			var A = $("<a/>", {
				href: "javascript:;",
				text: LANG.compose_preview
			});
			A.click(Listview.funcBox.coModeLink.bind(A[0], 2, n, c));
			k.append(A);
			o.append(k)
		}
		var a = $("<div/>", {
			css: {
				display: "none"
			}
		});
		a.addClass("text comment-body" + Listview.funcBox.coGetColor(c, n));
		var j = $("<div/>");
		j.addClass("comment-edit-body");
		var f = $("<div/>");
		f.addClass("toolbar");
		var h = $("<textarea/>", {
			val: c.body,
			rows: 10
		});
		h.addClass("comment-editbox");
		switch (n) {
		case 1:
			h.attr("name", "commentbody");
			h.focus(g_revealCaptcha.bind(null, "klrbetkjerbt46", false));
			break;
		case 2:
			h.attr({
				name: "desc",
				originalValue: c.body
			});
			break;
		case 3:
			h.attr("name", "body");
			h.focus(g_revealCaptcha.bind(null, "klrbetkjerbt46", false));
			break;
		case 4:
			h.attr({
				name: "sig",
				originalValue: c.body,
				rows: 3
			});
			h.css("height", "auto");
			break
		}
		if (n != -1 && n != 0) {
			var e = $("<h3/>"),
				B = $("<a/>"),
				z = $("<div/>"),
				w = $("<div/>");
			var d = Listview.funcBox.coLivePreview.bind(h[0], c, n, z[0]);
			B.addClass("disclosure-on");
			B.text(LANG.compose_livepreview);
			e.append(B);
			B.attr("href", "javascript:;");
			B.click(function () {
				d(1);
				var i = g_toggleDisplay(z);
				B.toggleClass("disclosure-on", i);
				B.toggleClass("disclosure-off", !i)
			});
			e.addClass("first");
			w.addClass("pad");
			a.append(e);
			a.append(z);
			a.append(w);
			g_onAfterTyping(h[0], d, 50);
			h.focus(function () {
				d();
				a.css("display", "");
				if (n != 4) {
					h.css("height", "22em")
				}
			})
		} else {
			if (n != 4) {
				h.focus(function () {
					h.css("height", "22em")
				})
			}
		}
		var v = [{
			id: "b",
			title: LANG.markup_b,
			pre: "[b]",
			post: "[/b]"
		},
		{
			id: "i",
			title: LANG.markup_i,
			pre: "[i]",
			post: "[/i]"
		},
		{
			id: "u",
			title: LANG.markup_u,
			pre: "[u]",
			post: "[/u]"
		},
		{
			id: "s",
			title: LANG.markup_s,
			pre: "[s]",
			post: "[/s]"
		},
		{
			id: "small",
			title: LANG.markup_small,
			pre: "[small]",
			post: "[/small]"
		},
		{
			id: "url",
			title: LANG.markup_url,
			onclick: function () {
				var i = prompt(LANG.prompt_linkurl, "http://");
				if (i) {
					g_insertTag(h[0], "[url=" + i + "]", "[/url]")
				}
			}
		},
		{
			id: "quote",
			title: LANG.markup_quote,
			pre: "[quote]",
			post: "[/quote]"
		},
		{
			id: "code",
			title: LANG.markup_code,
			pre: "[code]",
			post: "[/code]"
		},
		{
			id: "ul",
			title: LANG.markup_ul,
			pre: "[ul]\n[li]",
			post: "[/li]\n[/ul]",
			rep: function (i) {
				return i.replace(/\n/g, "[/li]\n[li]")
			}
		},
		{
			id: "ol",
			title: LANG.markup_ol,
			pre: "[ol]\n[li]",
			post: "[/li]\n[/ol]",
			rep: function (i) {
				return i.replace(/\n/g, "[/li]\n[li]")
			}
		},
		{
			id: "li",
			title: LANG.markup_li,
			pre: "[li]",
			post: "[/li]"
		}];
		for (var t = 0, u = v.length; t < u; ++t) {
			var m = v[t];
			if (n == 4 && m.id == "quote") {
				break
			}
			var p = $("<button/>", {
				click: function (i, D) {
					D.preventDefault();
					(i.onclick != null ? i.onclick : g_insertTag.bind(0, h[0], i.pre, i.post, i.rep))()
				}.bind(null, m)
			});
			p[0].setAttribute("type", "button");
			var C = $("<img/>");
			p.attr("title", m.title);
			C.attr("src", g_staticUrl + "/images/deprecated/pixel.gif");
			C.addClass("toolbar-" + m.id);
			p.append(C);
			f.append(p)
		}
		j.append(f);
		j.append(h);
		j.append($("<br/>"));
		if (n == 4) {
			j.append(ct(sprintf(LANG.compose_limit2, g, 3)))
		} else {
			j.append(ct(sprintf(LANG.compose_limit, g)))
		}
		if ((n == -1 || n == 0) && g_user.roles & U_GROUP_MODERATOR) {
			var b = $("<div/>", {
				"class": "pad"
			});
			var q = $("<div/>", {
				text: (g_user.roles & U_GROUP_ADMIN ? "Admin" : "Moderator") + " response"
			});
			var l = $("<textarea/>", {
				val: c.response,
				rows: 3,
				css: {
					height: "6em"
				}
			});
			j.append(b);
			j.append(q);
			j.append(l)
		}
		o.append(j);
		o.append($("<br/>"));
		o.append(a);
		return h
	},
	coLivePreview: function (f, e, a, b) {
		if (b != 1 && a.style.display == "none") {
			return
		}
		var c = this,
			i = Listview.funcBox.coGetCharLimit(e),
			g = (c.value.length > i ? c.value.substring(0, i) : c.value);
		if (e == 4) {
			var h;
			if ((h = g.indexOf("\n")) != -1 && (h = g.indexOf("\n", h + 1)) != -1 && (h = g.indexOf("\n", h + 1)) != -1) {
				g = g.substring(0, h)
			}
		}
		var j = Markup.rolesToClass(f.roles);
		var d = Markup.toHtml(g, {
			allow: j,
			mode: Markup.MODE_COMMENT,
			roles: f.roles
		});
		if (d) {
			a.innerHTML = d
		} else {
			a.innerHTML = '<span class="q6">...</span>'
		}
	},
	coEditButton: function (f, a, e) {
		if (a) {
			var d = gE(f.divEdit, "textarea");
			var c = d[0];
			if (!Listview.funcBox.coValidate(c, e)) {
				return
			}
			if (c.value != f.body || (d[1] && d[1].value != f.response)) {
				var g = 0;
				if (f.lastEdit != null) {
					g = f.lastEdit[1]
				}++g;
				f.lastEdit = [g_serverTime, g, g_user.name];
				Listview.funcBox.coUpdateLastEdit(f);
				var h = Listview.funcBox.coGetCharLimit(e);
				var i = Markup.rolesToClass(f.roles);
				f.divBody.innerHTML = Markup.toHtml((c.value.length > h ? c.value.substring(0, h) : c.value), {
					allow: i,
					mode: Markup.MODE_COMMENT,
					roles: f.roles
				});
				f.divResponse.innerHTML = ((d[1] && d[1].value.length > 0) ? Markup.toHtml("[div][/div][wowheadresponse=" + g_user.name + " roles=" + g_user.roles + "]" + d[1].value + "[/wowheadresponse]", {
					allow: Markup.CLASS_STAFF,
					mode: Markup.MODE_COMMENT,
					roles: g_user.roles
				}) : "");
				f.body = c.value;
				if (g_user.roles & U_GROUP_MODERATOR && d[1]) {
					f.response = d[1].value
				}
				var b = "body=" + urlencode(f.body);
				if (f.response !== undefined) {
					b += "&response=" + urlencode(f.response)
				}
				if (e == -1) {
					new Ajax("/forums=editpost&id=" + f.id, {
						method: "POST",
						params: b
					})
				} else {
					new Ajax("/comment=edit&id=" + f.id, {
						method: "POST",
						params: b
					})
				}
			}
		}
		f.divBody.style.display = "";
		f.divResponse.style.display = "";
		f.divLinks.firstChild.style.display = "";
		de(f.divEdit);
		f.divEdit = null
	},
	coGetCharLimit: function (a) {
		if (a == 2) {
			return 7500
		}
		if (a == 4) {
			return 250
		}
		if (g_user.roles & U_GROUP_STAFF) {
			return 16000000
		}
		var b = 1;
		if (g_user.premium) {
			b = 3
		}
		switch (a) {
		case 0:
		case 1:
			return 7500 * b;
		case -1:
		case 3:
			return 15000 * b
		}
	},
	coModeLink: function (g, b, h) {
		var l = Listview.funcBox.coGetCharLimit(b);
		var c = Markup.MODE_COMMENT;
		array_walk(gE(this.parentNode, "a"), function (m) {
			m.className = ""
		});
		this.className = "selected";
		var f = gE(this.parentNode.parentNode, "textarea"),
			d = f[0],
			k = d.parentNode,
			a = $(".comment-body", k.parentNode)[0];
		if (b == 4) {
			c = Markup.MODE_SIGNATURE
		}
		switch (g) {
		case 1:
			k.style.display = "";
			a.style.display = "none";
			k.firstChild.focus();
			break;
		case 2:
			k.style.display = "none";
			var i = (d.value.length > l ? d.value.substring(0, l) : d.value);
			if (b == 4) {
				var j;
				if ((j = i.indexOf("\n")) != -1 && (j = i.indexOf("\n", j + 1)) != -1 && (j = i.indexOf("\n", j + 1)) != -1) {
					i = i.substring(0, j)
				}
			}
			var n = Markup.rolesToClass(h.roles);
			var e = Markup.toHtml(i, {
				allow: n,
				mode: c,
				roles: h.roles
			});
			if (f[1] && f[1].value.length > 0) {
				e += Markup.toHtml("[div][/div][wowheadresponse=" + g_user.name + " roles=" + g_user.roles + "]" + f[1].value + "[/wowheadresponse]", {
					allow: Markup.CLASS_STAFF,
					mode: c,
					roles: g_user.roles
				})
			}
			a.innerHTML = e;
			a.style.display = "";
			break
		}
	},
	coReply: function (b) {
		document.forms.addcomment.elements.replyto.value = b.replyTo;
		var a = ge("gjkdlfgkjh436");
		gE(a, "span")[0].innerHTML = b.user;
		a.style.display = "";
		co_addYourComment()
	},
	coValidate: function (a, c) {
		c |= 0;
		if (c == 1 || c == -1) {
			if (trim(a.value).length < 1) {
				alert(LANG.message_forumposttooshort);
				return false
			}
		} else {
			if (trim(a.value).length < 1) {
				alert(LANG.message_commenttooshort);
				return false
			}
		}
		var b = Listview.funcBox.coGetCharLimit(c);
		if (a.value.length > b) {
			if (!confirm(sprintf(c == 1 ? LANG.confirm_forumposttoolong : LANG.confirm_commenttoolong, b, a.value.substring(b - 30, b)))) {
				return false
			}
		}
		return true
	},
	coCustomRatingOver: function (a) {
		Tooltip.showAtCursor(a, LANG.tooltip_customrating, 0, 0, "q")
	},
	coPlusRatingOver: function (a) {
		Tooltip.showAtCursor(a, LANG.tooltip_uprate, 0, 0, "q2")
	},
	coMinusRatingOver: function (a) {
		Tooltip.showAtCursor(a, LANG.tooltip_downrate, 0, 0, "q10")
	},
	coSortDate: function (a) {
		a.nextSibling.nextSibling.className = "";
		a.className = "selected";
		this.mainDiv.className += " listview-aci";
		this.setSort([1], true, false);
		g_setWowheadCookie("temp_comment_sort", 1)
	},
	coSortHighestRatedFirst: function (a) {
		a.previousSibling.previousSibling.className = "";
		a.className = "selected";
		this.mainDiv.className = this.mainDiv.className.replace("listview-aci", "");
		this.setSort([-3, 2], true, false);
		g_setWowheadCookie("temp_comment_sort", 2)
	},
	coFilterByPatchVersion: function (a) {
		this.minPatchVersion = a.value;
		this.refreshRows()
	},
	coUpdateLastEdit: function (f) {
		var b = f.divLastEdit;
		if (!b) {
			return
		}
		if (f.lastEdit != null) {
			var e = f.lastEdit;
			b.childNodes[1].firstChild.nodeValue = e[2];
			b.childNodes[1].href = "/user=" + e[2];
			var c = new Date(e[0]);
			var d = (g_serverTime - c) / 1000;
			if (b.childNodes[3].firstChild) {
				de(b.childNodes[3].firstChild)
			}
			Listview.funcBox.coFormatDate(b.childNodes[3], d, c);
			var a = "";
			if (f.rating != null) {
				a += sprintf(LANG.lvcomment_patch, g_getPatchVersion(c))
			}
			if (e[1] > 1) {
				a += LANG.dash + sprintf(LANG.lvcomment_nedits, e[1])
			}
			b.childNodes[4].nodeValue = a;
			b.style.display = ""
		} else {
			b.style.display = "none"
		}
	},
	coFormatDate: function (c, m, a, e, n) {
		var d;
		var h = new Date();
		var b = new Date();
		b.setTime(h.getTime() - (1000 * m));
		var g;
		var i = new Date(b.getYear(), b.getMonth(), b.getDate());
		var o = new Date(h.getYear(), h.getMonth(), h.getDate());
		var l = (o.getTime() - i.getTime());
		l /= 1000;
		l /= 86400;
		l = Math.round(l);
		if (m >= 2592000) {
			g = LANG.date_on + g_formatDateSimple(a, e)
		} else {
			if (l > 1) {
				g = sprintf(LANG.ddaysago, l);
				var k = new Date();
				k.setTime(a.getTime() + (g_localTime - g_serverTime));
				if (c) {
					c.className += " tip";
					c.title = k.toLocaleString()
				}
			} else {
				if (m >= 43200) {
					if (h.getDay() == b.getDay()) {
						g = LANG.today
					} else {
						g = LANG.yesterday
					}
					var f = b.getHours();
					var j = f;
					if (f == 12) {
						g = sprintf(LANG.dayatnoon, g)
					} else {
						if (f == 0) {
							g = sprintf(LANG.dayatmidnight, g)
						} else {
							if (f > 12) {
								g = sprintf(LANG.dayatpm, g, f - 12, j)
							} else {
								g = sprintf(LANG.dayatam, g, f, j)
							}
						}
					}
					var k = new Date();
					k.setTime(a.getTime() + (g_localTime - g_serverTime));
					if (c) {
						c.className += " tip";
						c.title = k.toLocaleString()
					}
				} else {
					var g = sprintf(LANG.date_ago, g_formatTimeElapsed(m));
					var k = new Date();
					k.setTime(a.getTime() + (g_localTime - g_serverTime));
					if (c) {
						c.className += " tip";
						c.title = k.toLocaleString()
					}
				}
			}
		}
		if (n == 1) {
			g = g.substr(0, 1).toUpperCase() + g.substr(1)
		}
		d = ct(g);
		if (c) {
			ae(c, d)
		} else {
			return g
		}
	},
	coFormatFileSize: function (c) {
		var b = -1;
		var a = "KMGTPEZY";
		while (c >= 1024 && b < 7) {
			c /= 1024;
			++b
		}
		if (b < 0) {
			return c + " byte" + (c > 1 ? "s" : "")
		} else {
			return c.toFixed(1) + " " + a[b] + "B"
		}
	},
	ssCellOver: function () {
		this.className = "screenshot-caption-over"
	},
	ssCellOut: function () {
		this.className = "screenshot-caption"
	},
	ssCellClick: function (b, d) {
		d = $E(d);
		if (d.shiftKey || d.ctrlKey) {
			return
		}
		var a = 0,
			c = d._target;
		while (c && a < 3) {
			if (c.nodeName == "A") {
				return
			}
			if (c.nodeName == "IMG") {
				break
			}
			c = c.parentNode
		}
		ScreenshotViewer.show({
			screenshots: this.data,
			pos: b
		})
	},
	ssCreateCb: function (d, b) {
		if (b.__nochk) {
			return
		}
		var c = ce("div");
		c.className = "listview-cb";
		c.onclick = Listview.cbCellClick;
		var a = ce("input");
		a.type = "checkbox";
		a.onclick = Listview.cbClick;
		ns(a);
		if (b.__chk) {
			a.checked = true
		}
		b.__cb = a;
		ae(c, a);
		ae(d, c)
	},
	viCellClick: function (b, d) {
		d = $E(d);
		if (d.shiftKey || d.ctrlKey) {
			return
		}
		var a = 0,
			c = d._target;
		while (c && a < 3) {
			if (c.nodeName == "A") {
				return
			}
			if (c.nodeName == "IMG") {
				break
			}
			c = c.parentNode
		}
		VideoViewer.show({
			videos: this.data,
			pos: b
		})
	},
	moneyHonorOver: function (a) {
		Tooltip.showAtCursor(a, LANG.tooltip_honorpoints, 0, 0, "q")
	},
	moneyArenaOver: function (a) {
		Tooltip.showAtCursor(a, LANG.tooltip_arenapoints, 0, 0, "q")
	},
	moneyAchievementOver: function (a) {
		Tooltip.showAtCursor(a, LANG.tooltip_achievementpoints, 0, 0, "q")
	},
	appendMoney: function (g, a, f, m, j, c, l) {
		var k, h = 0;
		if (a >= 10000) {
			h = 1;
			k = ce("span");
			k.className = "moneygold";
			ae(k, ct(Math.floor(a / 10000)));
			ae(g, k);
			a %= 10000
		}
		if (a >= 100) {
			if (h) {
				ae(g, ct(" "))
			} else {
				h = 1
			}
			k = ce("span");
			k.className = "moneysilver";
			ae(k, ct(Math.floor(a / 100)));
			ae(g, k);
			a %= 100
		}
		if (a >= 1 || f != null) {
			if (h) {
				ae(g, ct(" "))
			} else {
				h = 1
			}
			k = ce("span");
			k.className = "moneycopper";
			ae(k, ct(a));
			ae(g, k)
		}
		if (m != null && m != 0) {
			if (h) {
				ae(g, ct(" "))
			} else {
				h = 1
			}
			k = ce("span");
			k.className = "money" + (m < 0 ? "horde" : "alliance") + " tip";
			k.onmouseover = Listview.funcBox.moneyHonorOver;
			k.onmousemove = Tooltip.cursorUpdate;
			k.onmouseout = Tooltip.hide;
			ae(k, ct(number_format(Math.abs(m))));
			ae(g, k)
		}
		if (j >= 1) {
			if (h) {
				ae(g, ct(" "))
			} else {
				h = 1
			}
			k = ce("span");
			k.className = "moneyarena tip";
			k.onmouseover = Listview.funcBox.moneyArenaOver;
			k.onmousemove = Tooltip.cursorUpdate;
			k.onmouseout = Tooltip.hide;
			ae(k, ct(number_format(j)));
			ae(g, k)
		}
		if (c != null) {
			for (var b = 0; b < c.length; ++b) {
				if (h) {
					ae(g, ct(" "))
				} else {
					h = 1
				}
				var n = c[b][0];
				var e = c[b][1];
				k = ce("a");
				k.href = "/item=" + n;
				k.className = "moneyitem";
				k.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + g_items.getIcon(n).toLowerCase() + ".gif)";
				ae(k, ct(e));
				ae(g, k)
			}
		}
		if (l != null) {
			if (h) {
				ae(g, ct(" "))
			} else {
				h = 1
			}
			k = ce("span");
			k.className = "moneyachievement tip";
			k.onmouseover = Listview.funcBox.moneyAchievementOver;
			k.onmousemove = Tooltip.cursorUpdate;
			k.onmouseout = Tooltip.hide;
			ae(k, ct(number_format(l)));
			ae(g, k)
		}
	},
	getUpperSource: function (a, b) {
		switch (a) {
		case 2:
			if (b.z) {
				return LANG.source_zonedrop
			}
			break;
		case 4:
			return LANG.source_quests;
		case 5:
			return LANG.source_vendors
		}
		return g_sources[a]
	},
	getLowerSource: function (a, d, c) {
		switch (a) {
		case 3:
			if (d.p && g_sources_pvp[d.p]) {
				return {
					text: g_sources_pvp[d.p]
				}
			}
			break
		}
		switch (c) {
		case 0:
		case 1:
		case 2:
			if (d.z) {
				var b = {
					url: "/zone=" + d.z,
					text: g_zones[d.z]
				};
				if (d.t && a == 5) {
					b.pretext = LANG.lvitem_vendorin
				}
				if (d.dd && d.dd != 99) {
					if (d.dd < 0) {
						b.posttext = sprintf(LANG.lvitem_dd, "", (d.dd < -1 ? LANG.lvitem_heroic : LANG.lvitem_normal))
					} else {
						b.posttext = sprintf(LANG.lvitem_dd, (d.dd & 1 ? LANG.lvitem_raid10 : LANG.lvitem_raid25), (d.dd > 2 ? LANG.lvitem_heroic : LANG.lvitem_normal))
					}
				}
				return b
			}
			break;
		case 5:
			return {
				url: "/quests=" + d.c2 + "." + d.c,
				text: Listview.funcBox.getQuestCategory(d.c)
			};
			break;
		case 6:
			if (d.c && d.s) {
				return {
					url: "/spells=" + d.c + "." + d.s,
					text: g_spell_skills[d.s]
				}
			} else {
				return {
					url: "/spells=0",
					text: "??"
				}
			}
			break
		}
	},
	getExpansionText: function (a) {
		var b = "";
		if (a.expansion == 1) {
			b += " bc"
		} else {
			if (a.expansion == 2) {
				b += " wotlk wrath"
			} else {
				if (a.expansion == 3) {
					b += " cat cata cataclysm"
				}
			}
		}
		return b
	}
};
Listview.templates = {
	faction: {
		sort: [1],
		nItemsPerPage: -1,
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			value: "name",
			compute: function (d, e) {
				var b = ce("a");
				b.style.fontFamily = "Verdana, sans-serif";
				b.href = this.template.getItemLink(d);
				ae(b, ct(d.name));
				if (d.expansion) {
					var c = ce("span");
					c.className = g_GetExpansionClassName(d.expansion);
					ae(c, b);
					ae(e, c)
				} else {
					ae(e, b)
				}
			},
			getVisibleText: function (a) {
				var b = a.name + Listview.funcBox.getExpansionText(a);
				return b
			}
		},
		{
			id: "side",
			name: LANG.side,
			type: "text",
			compute: function (a, c) {
				if (a.side && a.side != 3) {
					var b = ce("span");
					b.className = (a.side == 1 ? "icon-alliance" : "icon-horde");
					b.onmouseover = function (d) {
						Tooltip.showAtCursor(d, g_sides[a.side], 0, 0, "q")
					};
					b.onmousemove = Tooltip.cursorUpdate;
					b.onmouseout = Tooltip.hide;
					ae(c, b)
				}
			},
			getVisibleText: function (a) {
				if (a.side) {
					return g_sides[a.side]
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_sides[d.side], g_sides[c.side])
			}
		},
		{
			id: "standing",
			name: LANG.reputation,
			value: "standing",
			compute: function (a, b) {
				b.style.padding = 0;
				ae(b, g_createReputationBar(a.standing))
			},
			hidden: 1
		},
		{
			id: "category",
			name: LANG.category,
			type: "text",
			width: "16%",
			compute: function (d, e) {
				if (d.category2 != null) {
					e.className = "small q1";
					var b = ce("a"),
						c = "/factions=" + d.category2;
					if (d.category) {
						c += "." + d.category
					}
					b.href = c;
					ae(b, ct(Listview.funcBox.getFactionCategory(d.category, d.category2)));
					ae(e, b)
				}
			},
			getVisibleText: function (a) {
				return Listview.funcBox.getFactionCategory(a.category, a.category2)
			},
			sortFunc: function (d, c, f) {
				var e = Listview.funcBox.getFactionCategory;
				return strcmp(e(d.category, d.category2), e(c.category, c.category2))
			}
		}],
		getItemLink: function (a) {
			return "/faction=" + a.id
		}
	},
	item: {
		sort: [1],
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			span: 2,
			value: "name",
			compute: function (q, g, o) {
				if (q.upgraded) {
					o.className = "upgraded"
				}
				var j = ce("td");
				j.style.width = "1px";
				j.style.padding = "0";
				j.style.borderRight = "none";
				var k = null,
					r = null;
				if (q.stack != null) {
					k = Listview.funcBox.createTextRange(q.stack[0], q.stack[1])
				}
				if (q.avail != null) {
					r = q.avail
				}
				ae(j, g_items.createIcon(q.id, (this.iconSize == null ? 1 : this.iconSize), k, r));
				ae(o, j);
				g.style.borderLeft = "none";
				var p = ce("a");
				p.className = "q" + (7 - parseInt(q.name.charAt(0)));
				p.style.fontFamily = "Verdana, sans-serif";
				p.href = this.template.getItemLink(q);
				if (q.rel) {
					Icon.getLink(j.firstChild).rel = q.rel;
					p.rel = q.rel
				}
				ae(p, ct(q.name.substring(1)));
				var b = ce("div");
				ae(b, p);
				if (q.reqclass) {
					var m = ce("div");
					m.className = "small2";
					var f = Listview.funcBox.assocBinFlags(q.reqclass, g_chr_classes);
					for (var j = 0, l = f.length; j < l; ++j) {
						if (j > 0) {
							ae(m, ct(", "))
						}
						var p = ce("a");
						p.href = "/class=" + f[j];
						p.className = "c" + f[j];
						st(p, g_chr_classes[f[j]]);
						ae(m, p)
					}
					ae(b, m)
				}
				if (typeof fi_nExtraCols == "number" && fi_nExtraCols >= 5) {
					if (q.source != null && q.source.length == 1) {
						if (q.reqclass) {
							ae(m, ct(LANG.dash))
						} else {
							var m = ce("div");
							m.className = "small2"
						}
						var e = (q.sourcemore ? q.sourcemore[0] : {});
						var n = 0;
						if (e.t) {
							n = e.t;
							var p = ce("a");
							if (e.q != null) {
								p.className = "q" + e.q
							} else {
								p.className = "q1"
							}
							p.href = "/" + g_types[e.t] + "=" + e.ti;
							if (e.n.length <= 30) {
								ae(p, ct(e.n))
							} else {
								p.title = e.n;
								ae(p, ct(trim(e.n.substr(0, 27)) + "..."))
							}
							ae(m, p)
						} else {
							ae(m, ct(Listview.funcBox.getUpperSource(q.source[0], e)))
						}
						var h = Listview.funcBox.getLowerSource(q.source[0], e, n);
						if (h != null) {
							ae(m, ct(LANG.hyphen));
							if (h.pretext) {
								ae(m, ct(h.pretext))
							}
							if (h.url) {
								var p = ce("a");
								p.className = "q1";
								p.href = h.url;
								ae(p, ct(h.text));
								ae(m, p)
							} else {
								ae(m, ct(h.text))
							}
							if (h.posttext) {
								ae(m, ct(h.posttext))
							}
						}
						ae(b, m)
					}
				}
				if (q.heroic || q.reqrace) {
					b.style.position = "relative";
					var m = ce("div");
					m.className = "small";
					m.style.fontStyle = "italic";
					m.style.position = "absolute";
					m.style.right = m.style.bottom = "3px";
					if (q.heroic) {
						var t = ce("span");
						t.className = "q2";
						ae(t, ct(LANG.lvitem_heroicitem));
						ae(m, t)
					}
					if (q.reqrace) {
						if ((q.reqrace & 1791) != 1101 && (q.reqrace & 1791) != 690) {
							if (q.heroic) {
								ae(m, ce("br"));
								m.style.bottom = "-6px"
							}
							var c = Listview.funcBox.assocBinFlags(q.reqrace, g_chr_races);
							for (var j = 0, l = c.length; j < l; ++j) {
								if (j > 0) {
									ae(m, ct(", "))
								}
								var p = ce("a");
								p.href = "/race=" + c[j];
								st(p, g_chr_races[c[j]]);
								ae(m, p)
							}
							m.className += " q1"
						}
					}
					ae(b, m)
				}
				ae(g, b)
			},
			getVisibleText: function (c) {
				var e = c.name.substring(1);
				if (c.heroic) {
					e += " " + LANG.lvitem_heroicitem
				}
				if (c.reqrace) {
					e += " " + Listview.funcBox.arrayText(Listview.funcBox.assocBinFlags(c.reqrace, g_chr_races), g_chr_races)
				}
				if (c.reqclass) {
					e += " " + Listview.funcBox.arrayText(Listview.funcBox.assocBinFlags(c.reqclass, g_chr_classes), g_chr_classes)
				}
				if (typeof fi_nExtraCols == "number" && fi_nExtraCols >= 5) {
					if (c.source != null && c.source.length == 1) {
						var d = (c.sourcemore ? c.sourcemore[0] : {});
						var b = 0;
						if (d.t) {
							b = d.t;
							e += " " + d.n
						} else {
							e += " " + Listview.funcBox.getUpperSource(c.source[0], d)
						}
						var a = Listview.funcBox.getLowerSource(c.source[0], d, b);
						if (a != null) {
							if (a.pretext) {
								e += " " + a.pretext
							}
							e += " " + a.text;
							if (a.posttext) {
								e += " " + a.posttext
							}
						}
					}
				}
				return e
			}
		},
		{
			id: "level",
			name: LANG.level,
			value: "level"
		},
		{
			id: "reqlevel",
			name: LANG.req,
			tooltip: LANG.tooltip_reqlevel,
			value: "reqlevel",
			compute: function (a, b) {
				if (a.reqlevel > 1) {
					return a.reqlevel
				}
			}
		},
		{
			id: "side",
			name: LANG.side,
			type: "text",
			compute: function (a, c) {
				if (a.side && a.side != 3) {
					var b = ce("span");
					b.className = (a.side == 1 ? "icon-alliance" : "icon-horde");
					b.onmouseover = function (d) {
						Tooltip.showAtCursor(d, g_sides[a.side], 0, 0, "q")
					};
					b.onmousemove = Tooltip.cursorUpdate;
					b.onmouseout = Tooltip.hide;
					ae(c, b)
				}
			},
			getVisibleText: function (a) {
				if (a.side) {
					return g_sides[a.side]
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_sides[d.side], g_sides[c.side])
			}
		},
		{
			id: "dps",
			name: LANG.dps,
			value: "dps",
			compute: function (a, b) {
				return (a.dps || 0).toFixed(1)
			},
			hidden: true
		},
		{
			id: "speed",
			name: LANG.speed,
			value: "speed",
			compute: function (a, b) {
				return (a.speed || 0).toFixed(2)
			},
			hidden: true
		},
		{
			id: "armor",
			name: LANG.armor,
			value: "armor",
			compute: function (a, b) {
				if (a.armor > 0) {
					return a.armor
				}
			},
			hidden: true
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
			sortFunc: function (d, c, e) {
				return strcmp(g_item_slots[d.slot], g_item_slots[c.slot])
			}
		},
		{
			id: "slots",
			name: LANG.slots,
			value: "nslots",
			hidden: true
		},
		{
			id: "skill",
			name: LANG.skill,
			value: "skill",
			hidden: true
		},
		{
			id: "glyph",
			name: LANG.glyphtype,
			type: "text",
			value: "glyph",
			compute: function (a, b) {
				if (a.glyph) {
					return g_item_glyphs[a.glyph]
				}
			},
			getVisibleText: function (a) {
				return g_item_glyphs[a.glyph]
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_item_glyphs[d.glyph], g_item_glyphs[c.glyph])
			},
			hidden: true
		},
		{
			id: "source",
			name: LANG.source,
			type: "text",
			compute: function (k, d) {
				if (this.iconSize == 0) {
					d.className = "small"
				}
				if (k.source != null) {
					if (k.source.length == 1) {
						nw(d);
						var c = (k.sourcemore ? k.sourcemore[0] : {});
						var h = 0;
						if (c.t) {
							h = c.t;
							var j = ce("a");
							if (c.q != null) {
								j.className = "q" + c.q
							} else {
								j.className = "q1"
							}
							j.href = "/" + g_types[c.t] + "=" + c.ti;
							j.style.whiteSpace = "nowrap";
							if (c.icon) {
								j.className += " icontiny";
								j.style.backgroundImage = 'url("' + g_staticUrl + "/images/wow/icons/tiny/" + c.icon.toLowerCase() + '.gif")'
							}
							ae(j, ct(c.n));
							ae(d, j)
						} else {
							ae(d, ct(Listview.funcBox.getUpperSource(k.source[0], c)))
						}
						var f = Listview.funcBox.getLowerSource(k.source[0], c, h);
						if (this.iconSize != 0 && f != null) {
							var b = ce("div");
							b.className = "small2";
							if (f.pretext) {
								ae(b, ct(f.pretext))
							}
							if (f.url) {
								var j = ce("a");
								j.className = "q1";
								j.href = f.url;
								ae(j, ct(f.text));
								ae(b, j)
							} else {
								ae(b, ct(f.text))
							}
							if (f.posttext) {
								ae(b, ct(f.posttext))
							}
							ae(d, b)
						}
					} else {
						var l = "";
						for (var e = 0, g = k.source.length; e < g; ++e) {
							if (e > 0) {
								l += LANG.comma
							}
							l += g_sources[k.source[e]]
						}
						return l
					}
				}
			},
			getVisibleText: function (c) {
				if (c.source != null) {
					if (c.source.length == 1) {
						var e = "";
						var d = (c.sourcemore ? c.sourcemore[0] : {});
						var b = 0;
						if (d.t) {
							b = d.t;
							e += " " + d.n
						} else {
							e += " " + Listview.funcBox.getUpperSource(c.source[0], d)
						}
						var a = Listview.funcBox.getLowerSource(c.source[0], d, b);
						if (a != null) {
							if (a.pretext) {
								e += " " + a.pretext
							}
							e += " " + a.text;
							if (a.posttext) {
								e += " " + a.posttext
							}
						}
						return e
					} else {
						return Listview.funcBox.arrayText(c.source, g_sources)
					}
				}
			},
			sortFunc: function (f, d) {
				var g = Listview.funcBox.assocArrCmp(f.source, d.source, g_sources);
				if (g != 0) {
					return g
				}
				var e = (f.sourcemore && f.source.length == 1 ? f.sourcemore[0].n : null),
					c = (d.sourcemore && d.source.length == 1 ? d.sourcemore[0].n : null);
				return strcmp(e, c)
			}
		},
		{
			id: "type",
			name: LANG.type,
			type: "text",
			compute: function (d, e) {
				e.className = "small q1";
				nw(e);
				var b = ce("a");
				var c = Listview.funcBox.getItemType(d.classs, d.subclass, d.subsubclass);
				b.href = c.url;
				ae(b, ct(c.text));
				ae(e, b)
			},
			getVisibleText: function (a) {
				return Listview.funcBox.getItemType(a.classs, a.subclass, a.subsubclass).text
			},
			sortFunc: function (d, c, f) {
				var e = Listview.funcBox.getItemType;
				return strcmp(e(d.classs, d.subclass, d.subsubclass).text, e(c.classs, c.subclass, c.subsubclass).text)
			}
		}],
		getItemLink: function (a) {
			return "/item=" + a.id
		},
		onBeforeCreate: function () {
			var b = false;
			for (var c = 0, a = this.data.length; c < a; ++c) {
				var d = this.data[c];
				if ((d.slot > 0 && d.slot != 18) || (in_array(ModelViewer.validSlots, d.slotbak) >= 0 && d.displayid > 0) || d.modelviewer) {
					++b
				} else {
					d.__nochk = 1
				}
			}
			if (b > 0) {
				this.mode = 1;
				this._nComparable = b
			}
		},
		createCbControls: function (e, d) {
			if (!d && this._nComparable < 15) {
				return
			}
			var c = ce("input"),
				b = ce("input"),
				a = ce("input");
			c.type = b.type = a.type = "button";
			c.value = LANG.button_compare;
			b.value = LANG.button_viewin3d;
			a.value = LANG.button_deselect;
			c.onclick = this.template.compareItems.bind(this);
			b.onclick = this.template.viewIn3d.bind(this);
			a.onclick = Listview.cbSelect.bind(this, false);
			if (this._nComparable == 0 || typeof this._nComparable == "undefined") {
				c.disabled = "disabled";
				b.disabled = "disabled";
				a.disabled = "disabled"
			}
			ae(e, c);
			ae(e, b);
			ae(e, a)
		},
		compareItems: function () {
			var b = this.getCheckedRows();
			if (!b.length) {
				return
			}
			var a = "";
			array_walk(b, function (c) {
				if (c.slot == 0 || c.slot == 18) {
					return
				}
				a += c.id + ";"
			});
			su_addToSaved(rtrim(a, ";"), b.length)
		},
		viewIn3d: function () {
			var j = this.getCheckedRows();
			if (!j.length) {
				return
			}
			var g = false,
				e = false,
				f = false;
			var c = {};
			var d = null;
			array_walk(j, function (i) {
				if (in_array(ModelViewer.validSlots, i.slotbak) >= 0 && i.displayid > 0) {
					var k = ModelViewer.slotMap[i.slotbak];
					if (c[k]) {
						e = true
					}
					c[k] = i.displayid;
					g = true
				} else {
					if (i.modelviewer) {
						d = i.modelviewer
					} else {
						f = true
					}
				}
			});
			var h = null;
			if (d) {
				if (g || f) {
					h = LANG.dialog_cantdisplay
				}
				ModelViewer.show({
					type: d.type,
					displayId: d.displayid,
					slot: d.slot,
					message: h
				})
			} else {
				if (e || f) {
					h = LANG.dialog_cantdisplay
				}
				var a = [];
				for (var b in c) {
					a.push(parseInt(b));
					a.push(c[b])
				}
				if (a.length > 0) {
					ModelViewer.show({
						type: 4,
						equipList: a,
						message: h
					})
				} else {
					alert(LANG.message_nothingtoviewin3d)
				}
			}
		}
	},
	itemset: {
		sort: [1],
		nItemsPerPage: 75,
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			value: "name",
			compute: function (c, g) {
				var b = ce("a");
				b.className = "q" + (7 - parseInt(c.name.charAt(0)));
				b.style.fontFamily = "Verdana, sans-serif";
				b.href = this.template.getItemLink(c);
				ae(b, ct(c.name.substring(1)));
				var f = ce("div");
				f.style.position = "relative";
				ae(f, b);
				if (c.heroic) {
					var e = ce("div");
					e.className = "small q2";
					e.style.fontStyle = "italic";
					e.style.position = "absolute";
					e.style.right = "3px";
					e.style.bottom = "3px";
					ae(e, ct(LANG.lvitem_heroicitem));
					ae(f, e)
				}
				ae(g, f);
				if (c.note) {
					var e = ce("div");
					e.className = "small";
					ae(e, ct(g_itemset_notes[c.note]));
					ae(g, e)
				}
			},
			getVisibleText: function (a) {
				var b = a.name.substring(1);
				if (a.note) {
					b += " " + g_itemset_notes[a.note]
				}
				return b
			}
		},
		{
			id: "level",
			name: LANG.level,
			type: "range",
			getMinValue: function (a) {
				return a.minlevel
			},
			getMaxValue: function (a) {
				return a.maxlevel
			},
			compute: function (a, b) {
				if (a.minlevel > 0 && a.maxlevel > 0) {
					if (a.minlevel != a.maxlevel) {
						return a.minlevel + LANG.hyphen + a.maxlevel
					} else {
						return a.minlevel
					}
				} else {
					return -1
				}
			},
			sortFunc: function (d, c, e) {
				if (e > 0) {
					return strcmp(d.minlevel, c.minlevel) || strcmp(d.maxlevel, c.maxlevel)
				} else {
					return strcmp(d.maxlevel, c.maxlevel) || strcmp(d.minlevel, c.minlevel)
				}
			}
		},
		{
			id: "pieces",
			name: LANG.pieces,
			getValue: function (a) {
				return a.pieces.length
			},
			compute: function (a, b) {
				b.style.padding = "0";
				Listview.funcBox.createCenteredIcons(a.pieces, b)
			},
			sortFunc: function (d, c) {
				var f = (d.pieces != null ? d.pieces.length : 0);
				var e = (c.pieces != null ? c.pieces.length : 0);
				return strcmp(f, e)
			}
		},
		{
			id: "type",
			name: LANG.type,
			type: "text",
			compute: function (a, b) {
				return g_itemset_types[a.type]
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_itemset_types[d.type], g_itemset_types[c.type])
			}
		},
		{
			id: "classes",
			name: LANG.classes,
			type: "text",
			width: "20%",
			getVisibleText: function (d) {
				var e = "";
				if (d.reqclass) {
					var c = Listview.funcBox.assocBinFlags(d.reqclass, g_chr_classes);
					for (var b = 0, a = c.length; b < a; ++b) {
						if (b > 0) {
							e += LANG.comma
						}
						e += g_chr_classes[c[b]]
					}
				}
				return e
			},
			compute: function (f, g) {
				if (f.reqclass) {
					var e = Listview.funcBox.assocBinFlags(f.reqclass, g_chr_classes);
					for (var d = 0, b = e.length; d < b; ++d) {
						if (d > 0) {
							ae(g, ct(LANG.comma))
						}
						var c = ce("a");
						c.href = "/class=" + e[d];
						c.className = "c" + e[d];
						ae(c, ct(g_chr_classes[e[d]]));
						ae(g, c)
					}
				}
			},
			sortFunc: function (d, c, e) {
				return Listview.funcBox.assocArrCmp(Listview.funcBox.assocBinFlags(d.reqclass, g_chr_classes), Listview.funcBox.assocBinFlags(c.reqclass, g_chr_classes), g_chr_classes)
			}
		}],
		getItemLink: function (a) {
			return "/itemset=" + a.id
		}
	},
	npc: {
		sort: [1],
		nItemsPerPage: 100,
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			value: "name",
			compute: function (c, f) {
				if (c.boss) {
					f.className = "icon-boss-padded"
				}
				var b = ce("a");
				b.style.fontFamily = "Verdana, sans-serif";
				b.href = this.template.getItemLink(c);
				ae(b, ct(c.name));
				ae(f, b);
				if (c.tag != null) {
					var e = ce("div");
					e.className = "small";
					ae(e, ct("<" + c.tag + ">"));
					ae(f, e)
				}
			},
			getVisibleText: function (a) {
				var b = a.name;
				if (a.tag) {
					b += " <" + a.tag + ">"
				}
				if (a.boss) {
					b += " boss skull"
				}
				return b
			},
			sortFunc: function (d, c, e) {
				return strcmp(c.boss, d.boss) || strcmp(d.name, c.name)
			}
		},
		{
			id: "level",
			name: LANG.level,
			type: "range",
			width: "10%",
			getMinValue: function (a) {
				return a.minlevel
			},
			getMaxValue: function (a) {
				return a.maxlevel
			},
			compute: function (a, c) {
				if (a.classification) {
					var b = ce("div");
					b.className = "small";
					ae(b, ct(g_npc_classifications[a.classification]));
					ae(c, b)
				}
				if (a.classification == 3) {
					return "??"
				}
				if (a.minlevel > 0 && a.maxlevel > 0) {
					if (a.minlevel != a.maxlevel) {
						return a.minlevel + LANG.hyphen + a.maxlevel
					} else {
						return a.minlevel
					}
				}
				return -1
			},
			getVisibleText: function (a) {
				var b = "";
				if (a.classification) {
					b += " " + g_npc_classifications[a.classification]
				}
				if (a.minlevel > 0 && a.maxlevel > 0) {
					b += " ";
					if (a.minlevel != a.maxlevel) {
						b += a.minlevel + LANG.hyphen + a.maxlevel
					} else {
						b += a.minlevel
					}
				}
				return b
			},
			sortFunc: function (d, c, e) {
				if (e > 0) {
					return strcmp(d.minlevel, c.minlevel) || strcmp(d.maxlevel, c.maxlevel) || strcmp(d.classification, c.classification)
				} else {
					return strcmp(d.maxlevel, c.maxlevel) || strcmp(d.minlevel, c.minlevel) || strcmp(d.classification, c.classification)
				}
			}
		},
		{
			id: "location",
			name: LANG.location,
			type: "text",
			compute: function (a, b) {
				return Listview.funcBox.location(a, b)
			},
			getVisibleText: function (a) {
				return Listview.funcBox.arrayText(a.location, g_zones)
			},
			sortFunc: function (d, c, e) {
				return Listview.funcBox.assocArrCmp(d.location, c.location, g_zones)
			}
		},
		{
			id: "react",
			name: LANG.react,
			type: "text",
			width: "10%",
			value: "react",
			filtrable: 0,
			compute: function (b, g) {
				if (b.react == null) {
					return -1
				}
				var d = [LANG.lvnpc_alliance, LANG.lvnpc_horde];
				var f = 0;
				for (var a = 0; a < 2; ++a) {
					if (b.react[a] != null) {
						if (f++>0) {
							ae(g, ct(" "))
						}
						var e = ce("span");
						e.className = (b.react[a] < 0 ? "q10" : (b.react[a] > 0 ? "q2" : "q"));
						ae(e, ct(d[a]));
						ae(g, e)
					}
				}
			}
		},
		{
			id: "skin",
			name: LANG.skin,
			type: "text",
			value: "skin",
			compute: function (c, d) {
				if (c.skin) {
					var b = ce("a");
					b.className = "q1";
					b.href = "/npcs?filter=cr=35;crs=0;crv=" + c.skin;
					ae(b, ct(c.skin));
					ae(d, b)
				}
			},
			hidden: 1
		},
		{
			id: "petfamily",
			name: LANG.petfamily,
			type: "text",
			width: "12%",
			compute: function (c, d) {
				d.className = "q1";
				var b = ce("a");
				b.href = "/pet=" + c.family;
				ae(b, ct(g_pet_families[c.family]));
				ae(d, b)
			},
			getVisibleText: function (a) {
				return g_pet_families[a.family]
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_pet_families[d.family], g_pet_families[c.family])
			},
			hidden: 1
		},
		{
			id: "type",
			name: LANG.type,
			type: "text",
			width: "12%",
			compute: function (c, d) {
				d.className = "small q1";
				var b = ce("a");
				b.href = "/npcs=" + c.type;
				ae(b, ct(g_npc_types[c.type]));
				ae(d, b)
			},
			getVisibleText: function (a) {
				return g_npc_types[a.type]
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_npc_types[d.type], g_npc_types[c.type])
			}
		}],
		getItemLink: function (a) {
			return "/npc=" + a.id
		}
	},
	object: {
		sort: [1],
		nItemsPerPage: 100,
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			value: "name",
			compute: function (c, d) {
				var b = ce("a");
				b.style.fontFamily = "Verdana, sans-serif";
				b.href = this.template.getItemLink(c);
				ae(b, ct(c.name));
				ae(d, b)
			}
		},
		{
			id: "location",
			name: LANG.location,
			type: "text",
			compute: function (a, b) {
				return Listview.funcBox.location(a, b)
			},
			getVisibleText: function (a) {
				return Listview.funcBox.arrayText(a.location, g_zones)
			},
			sortFunc: function (d, c, e) {
				return Listview.funcBox.assocArrCmp(d.location, c.location, g_zones)
			}
		},
		{
			id: "skill",
			name: LANG.skill,
			width: "10%",
			value: "skill",
			hidden: true
		},
		{
			id: "type",
			name: LANG.type,
			type: "text",
			width: "12%",
			compute: function (c, d) {
				d.className = "small q1";
				var b = ce("a");
				b.href = "/objects=" + c.type;
				ae(b, ct(g_object_types[c.type]));
				ae(d, b)
			},
			getVisibleText: function (a) {
				return g_object_types[a.type]
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_object_types[d.type], g_object_types[c.type])
			}
		}],
		getItemLink: function (a) {
			return "/object=" + a.id
		}
	},
	quest: {
		sort: [1, 2],
		nItemsPerPage: 100,
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			value: "name",
			compute: function (j, f) {
				var l = $("<a/>", {
					css: {
						"font-family": "Verdana, sans serif"
					},
					href: this.template.getItemLink(j),
					text: j.name
				});
				var b = $("<div/>");
				b.append(l);
				if (j.historical) {
					b.css("position", "relative");
					var k = $("<div/>", {
						"class": "small",
						css: {
							"font-style": "italic",
							position: "absolute",
							right: "3px",
							bottom: "3px"
						}
					});
					var m = $("<span/>", {
						css: {
							color: "red"
						},
						text: LANG.lvquest_removed
					});
					k.append(m);
					b.append(k)
				}
				if (j.reqclass) {
					var k = $("<div/>", {
						"class": "small"
					});
					var e = Listview.funcBox.assocBinFlags(j.reqclass, g_chr_classes);
					for (var g = 0, h = e.length; g < h; ++g) {
						if (g > 0) {
							k.append(", ")
						}
						var l = $("<a/>", {
							href: "/class=" + e[g],
							"class": "c" + e[g],
							text: g_chr_classes[e[g]]
						});
						k.append(l)
					}
					b.append(k)
				}
				if (!j.historical && j.reqrace && j.reqrace != -1) {
					b.css("position", "relative");
					var k = $("<div/>", {
						"class": "small q1",
						css: {
							"font-style": "italic",
							position: "absolute",
							right: "3px",
							bottom: "3px"
						}
					});
					var c = Listview.funcBox.assocBinFlags(j.reqrace, g_chr_races);
					for (var g = 0, h = c.length; g < h; ++g) {
						if (g > 0) {
							k.append(", ")
						}
						var l = $("<a/>", {
							href: "/race=" + c[g],
							text: g_chr_races[c[g]]
						});
						k.append(l)
					}
					b.append(k)
				}
				if (j.reqrace && false) {
					b.style.position = "relative";
					var k = ce("div");
					k.className = "small";
					k.style.fontStyle = "italic";
					k.style.position = "absolute";
					k.style.right = k.style.bottom = "3px";
					if (j.reqrace) {
						if ((j.reqrace & 1791) != 1101 && (j.reqrace & 1791) != 690) {
							var c = Listview.funcBox.assocBinFlags(j.reqrace, g_chr_races);
							for (var g = 0, h = c.length; g < h; ++g) {
								if (g > 0) {
									ae(k, ct(", "))
								}
								var l = ce("a");
								l.href = "/race=" + c[g];
								st(l, g_chr_races[c[g]]);
								ae(k, l)
							}
							k.className += " q1"
						}
					}
					ae(b, k)
				}
				$(f).append(b)
			}
		},
		{
			id: "level",
			name: LANG.level,
			width: "7%",
			value: "level",
			compute: function (a, c) {
				if (a.type || a.daily || a.weekly) {
					var b = ce("div");
					b.className = "small";
					nw(b);
					if (a.daily) {
						if (a.type) {
							ae(b, ct(sprintf(LANG.lvquest_daily, g_quest_types[a.type])))
						} else {
							ae(b, ct(LANG.daily))
						}
					} else {
						if (a.weekly) {
							if (a.type) {
								ae(b, ct(sprintf(LANG.lvquest_weekly, g_quest_types[a.type])))
							} else {
								ae(b, ct(LANG.weekly))
							}
						} else {
							if (a.type) {
								ae(b, ct(g_quest_types[a.type]))
							}
						}
					}
					ae(c, b)
				}
				return a.level
			},
			getVisibleText: function (a) {
				var b = "";
				if (a.type) {
					b += " " + g_quest_types[a.type]
				}
				if (a.daily) {
					b += " " + LANG.daily
				} else {
					if (a.weekly) {
						b += " " + LANG.weekly
					}
				}
				if (a.level) {
					b += " " + a.level
				}
				return b
			},
			sortFunc: function (d, c, e) {
				return strcmp(d.level, c.level) || strcmp(d.type, c.type)
			}
		},
		{
			id: "reqlevel",
			name: LANG.req,
			tooltip: LANG.tooltip_reqlevel,
			width: "7%",
			value: "reqlevel"
		},
		{
			id: "side",
			name: LANG.side,
			type: "text",
			compute: function (a, c) {
				if (a.side && a.side != 3) {
					var b = ce("span");
					b.className = (a.side == 1 ? "icon-alliance" : "icon-horde");
					b.onmouseover = function (d) {
						Tooltip.showAtCursor(d, g_sides[a.side], 0, 0, "q")
					};
					b.onmousemove = Tooltip.cursorUpdate;
					b.onmouseout = Tooltip.hide;
					ae(c, b)
				} else {
					if (!a.side) {
						ae(c, ct("??"))
					}
				}
			},
			getVisibleText: function (a) {
				if (a.side) {
					return g_sides[a.side]
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_sides[d.side], g_sides[c.side])
			}
		},
		{
			id: "rewards",
			name: LANG.rewards,
			filtrable: 0,
			width: "25%",
			compute: function (b, i) {
				var a = (b.itemchoices != null || b.itemrewards != null);
				if (a) {
					var h, g;
					if (b.itemchoices && b.itemchoices.length > 1) {
						i.style.padding = "0";
						h = LANG.lvquest_pickone;
						if (b.itemrewards && b.itemrewards.length > 0) {
							g = LANG.lvquest_alsoget
						}
					}
					Listview.funcBox.createCenteredIcons(b.itemchoices, i, h, 2);
					Listview.funcBox.createCenteredIcons(b.itemrewards, i, g, 2)
				}
				if (b.xp > 0 || b.money > 0) {
					var f = ce("div");
					if (a) {
						f.style.padding = "4px"
					}
					if (b.xp > 0) {
						ae(f, ct(sprintf(LANG.lvquest_xp, b.xp) + (b.money > 0 ? " + " : "")))
					}
					if (b.money > 0) {
						Listview.funcBox.appendMoney(f, b.money)
					}
					ae(i, f)
				}
				if (b.titlereward && g_titles[b.titlereward]) {
					var e = g_titles[b.titlereward]["name_" + Locale.getName()];
					e = e.replace("%s", '<span class="q0">&lt;' + LANG.name + "&gt;</span>");
					var c = ce("a");
					c.className = "q1";
					c.href = "/title=" + b.titlereward;
					c.innerHTML = e;
					ae(i, c);
					ae(i, ce("br"))
				}
			},
			getVisibleText: function (a) {
				var b = "";
				if (a.itemchoices && a.itemchoices.length) {
					b += " " + LANG.lvquest_pickone;
					if (a.itemrewards && a.itemrewards.length) {
						b += " " + LANG.lvquest_alsoget
					}
				}
				if (a.xp > 0) {
					b += " " + sprintf(LANG.lvquest_xp, a.xp)
				}
				if (a.titlereward && g_titles[a.titlereward]) {
					b += " " + g_titles[a.titlereward]["name_" + Locale.getName()]
				}
				return b
			},
			sortFunc: function (d, c, e) {
				var g = (d.itemchoices != null ? d.itemchoices.length : 0) + (d.itemrewards != null ? d.itemrewards.length : 0);
				var f = (c.itemchoices != null ? c.itemchoices.length : 0) + (c.itemrewards != null ? c.itemrewards.length : 0);
				return strcmp(g, f) || strcmp((d.xp | 0) + (d.money | 0), (c.xp | 0) + (c.money | 0))
			}
		},
		{
			id: "reputation",
			name: LANG.reputation,
			width: "14%",
			value: "id",
			hidden: true
		},
		{
			id: "category",
			name: LANG.category,
			type: "text",
			width: "16%",
			compute: function (c, d) {
				if (c.category != 0) {
					d.className = "small q1";
					var b = ce("a");
					b.href = "/quests=" + c.category2 + "." + c.category;
					ae(b, ct(Listview.funcBox.getQuestCategory(c.category)));
					ae(d, b)
				}
			},
			getVisibleText: function (a) {
				return Listview.funcBox.getQuestCategory(a.category)
			},
			sortFunc: function (d, c, f) {
				var e = Listview.funcBox.getQuestCategory;
				return strcmp(e(d.category), e(c.category))
			}
		}],
		getItemLink: function (a) {
			return "/quest=" + a.id
		}
	},
	skill: {
		sort: [1],
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			value: "name",
			span: 2,
			compute: function (c, h, f) {
				var d = ce("td");
				d.style.width = "1px";
				d.style.padding = "0";
				d.style.borderRight = "none";
				ae(d, Icon.create(c.icon, 0, null, this.template.getItemLink(c)));
				ae(f, d);
				h.style.borderLeft = "none";
				var g = ce("div");
				var b = ce("a");
				b.style.fontFamily = "Verdana, sans-serif";
				b.href = this.template.getItemLink(c);
				ae(b, ct(c.name));
				if (c.expansion) {
					var e = ce("span");
					e.className = g_GetExpansionClassName(c.expansion);
					ae(e, b);
					ae(g, e)
				} else {
					ae(g, b)
				}
				ae(h, g)
			},
			getVisibleText: function (a) {
				var b = a.name + Listview.funcBox.getExpansionText(a);
				return b
			}
		},
		{
			id: "category",
			name: LANG.category,
			type: "text",
			width: "16%",
			compute: function (c, d) {
				if (c.category != 0) {
					d.className = "small q1";
					var b = ce("a");
					b.href = "/skills=" + c.category;
					ae(b, ct(g_skill_categories[c.category]));
					ae(d, b)
				}
			},
			getVisibleText: function (a) {
				return g_skill_categories[skill.category]
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_skill_categories[d.category], g_skill_categories[c.category])
			}
		}],
		getItemLink: function (a) {
			return "/skill=" + a.id
		}
	},
	spell: {
		sort: ["name", "skill", "level"],
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			span: 2,
			value: "name",
			compute: function (h, f, l) {
				var g = ce("td"),
					o;
				g.style.width = "44px";
				g.style.padding = "0";
				g.style.borderRight = "none";
				if (h.creates != null) {
					o = g_items.createIcon(h.creates[0], 1, Listview.funcBox.createTextRange(h.creates[1], h.creates[2]))
				} else {
					o = g_spells.createIcon(h.id, 1)
				}
				o.style.cssFloat = o.style.styleFloat = "left";
				ae(g, o);
				ae(l, g);
				f.style.borderLeft = "none";
				var b = ce("div");
				var n = ce("a");
				var m = h.name.charAt(0);
				if (m != "@") {
					n.className = "q" + (7 - parseInt(m))
				}
				n.style.fontFamily = "Verdana, sans-serif";
				n.href = this.template.getItemLink(h);
				ae(n, ct(h.name.substring(1)));
				ae(b, n);
				if (h.rank) {
					var k = ce("div");
					k.className = "small2";
					ae(k, ct(h.rank));
					ae(b, k)
				}
				if (h.reqrace) {
					b.style.position = "relative";
					var k = ce("div");
					k.className = "small";
					k.style.fontStyle = "italic";
					k.style.position = "absolute";
					k.style.right = k.style.bottom = "3px";
					if ((h.reqrace & 1791) == 1101) {
						ae(k, ct(g_sides[1]))
					} else {
						if ((h.reqrace & 1791) == 690) {
							ae(k, ct(g_sides[2]))
						} else {
							var e = Listview.funcBox.assocBinFlags(h.reqrace, g_chr_races);
							k.className += " q1";
							for (var g = 0, j = e.length; g < j; ++g) {
								if (g > 0) {
									ae(k, ct(LANG.comma))
								}
								var n = ce("a");
								n.href = "/race=" + e[g];
								st(n, g_chr_races[e[g]]);
								ae(k, n)
							}
						}
					}
					ae(b, k)
				}
				ae(f, b)
			},
			getVisibleText: function (a) {
				var b = a.name;
				if (a.rank) {
					b += " " + a.rank
				}
				if (a.reqrace) {
					b += " " + Listview.funcBox.arrayText(Listview.funcBox.assocBinFlags(a.reqrace, g_chr_races), g_chr_races)
				}
				return b
			}
		},
		{
			id: "tier",
			name: LANG.tier,
			width: "10%",
			value: "level",
			compute: function (b, d) {
				if (b.level > 0) {
					var a = (!this._petTalents ? 10 : 20),
						c = (!this._petTalents ? 5 : 12);
					return Math.floor((b.level - a) / c) + 1
				}
			},
			hidden: true
		},
		{
			id: "level",
			name: LANG.level,
			width: "10%",
			value: "level",
			compute: function (a, b) {
				if (a.level > 0) {
					return a.level
				}
			},
			hidden: true
		},
		{
			id: "classes",
			name: LANG.classes,
			type: "text",
			width: "20%",
			getVisibleText: function (b) {
				var e = "";
				if (b.reqclass) {
					var d = Listview.funcBox.assocBinFlags(b.reqclass, g_chr_classes);
					for (var c = 0, a = d.length; c < a; ++c) {
						if (c > 0) {
							e += LANG.comma
						}
						e += g_chr_classes[d[c]]
					}
				}
				return e
			},
			compute: function (d, g) {
				if (d.reqclass) {
					var f = Listview.funcBox.assocBinFlags(d.reqclass, g_chr_classes);
					for (var e = 0, b = f.length; e < b; ++e) {
						if (e > 0) {
							ae(g, ct(LANG.comma))
						}
						var c = ce("a");
						c.href = "/class=" + f[e];
						c.className = "c" + f[e];
						ae(c, ct(g_chr_classes[f[e]]));
						ae(g, c)
					}
				}
			},
			sortFunc: function (d, c, e) {
				return Listview.funcBox.assocArrCmp(Listview.funcBox.assocBinFlags(d.reqclass, g_chr_classes), Listview.funcBox.assocBinFlags(c.reqclass, g_chr_classes), g_chr_classes)
			}
		},
		{
			id: "guildlevel",
			name: LANG.guildlevel,
			width: "10%",
			value: "guildlevel",
			compute: function (a, b) {
				if (a.guildlevel > 0) {
					return a.guildlevel
				}
			},
			hidden: true
		},
		{
			id: "schools",
			name: LANG.school,
			type: "text",
			width: "10%",
			hidden: true,
			compute: function (a, e) {
				var d = "";
				var c = a.schools ? a.schools : a.school;
				for (var b = 0; b < 32; ++b) {
					if (! (c & (1 << b))) {
						continue
					}
					if (d != "") {
						d += ", "
					}
					d += g_spell_resistances[b]
				}
				return d
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_spell_resistances[d.school], g_spell_resistances[c.school])
			}
		},
		{
			id: "reagents",
			name: LANG.reagents,
			align: "left",
			width: "9%",
			getValue: function (a) {
				return (a.reagents ? a.reagents.length : 0)
			},
			compute: function (g, c) {
				var a = (g.reagents != null);
				if (a) {
					c.style.padding = "0";
					var k = ce("div");
					var j = g.reagents;
					k.style.width = (44 * j.length) + "px";
					for (var e = 0, h = j.length; e < h; ++e) {
						var b = j[e][0];
						var f = j[e][1];
						var l = g_items.createIcon(b, 1, f);
						l.style.cssFloat = l.style.styleFloat = "left";
						ae(k, l);
						if (this.centerReagents) {
							k.style.margin = "0 auto"
						}
					}
					ae(c, k)
				}
			},
			sortFunc: function (d, c) {
				var f = (d.reagents != null ? d.reagents.length : 0);
				var e = (c.reagents != null ? c.reagents.length : 0);
				if (f > 0 && f == e) {
					return strcmp(d.reagents.toString(), c.reagents.toString())
				} else {
					return strcmp(f, e)
				}
			}
		},
		{
			id: "source",
			name: LANG.source,
			type: "text",
			width: "12%",
			hidden: true,
			compute: function (b, e) {
				if (b.source != null) {
					var d = "";
					for (var c = 0, a = b.source.length; c < a; ++c) {
						if (c > 0) {
							d += LANG.comma
						}
						d += g_sources[b.source[c]]
					}
					return d
				}
			},
			sortFunc: function (d, c, e) {
				return Listview.funcBox.assocArrCmp(d.source, c.source, g_sources)
			}
		},
		{
			id: "skill",
			name: LANG.skill,
			type: "text",
			width: "16%",
			getValue: function (a) {
				return a.learnedat
			},
			compute: function (j, g, m, q) {
				if (j.skill != null) {
					this.skillsColumn = q;
					var c = ce("div");
					c.className = "small";
					for (var h = 0, k = j.skill.length; h < k; ++h) {
						if (h > 0) {
							ae(c, ct(LANG.comma))
						}
						if (j.skill[h] == -1) {
							ae(c, ct(LANG.ellipsis))
						} else {
							if (in_array([7, -2, -3, -5, -6, -7, 11, 9], j.cat) != -1) {
								var o = ce("a");
								o.className = "q1";
								if (in_array([-5, -6, -7], j.cat) != -1) {
									o.href = "/spells=" + j.cat
								} else {
									o.href = "/spells=" + j.cat + "." + ((j.reqclass && (j.cat == 7 || j.cat == -2)) ? (1 + Math.log(j.reqclass) / Math.LN2) + "." : "") + j.skill[h]
								}
								var e = g_getGets();
								var f = (e.spells ? e.spells.split(".") : [false, false]);
								if (j.reqclass && (j.cat == 7 || j.cat == -2)) {
									if (h < 1 && ((1 + Math.log(j.reqclass) / Math.LN2) != f[1])) {
										var b = ce("a");
										b.className = "q0";
										b.href = "/spells=" + j.cat + "." + (1 + Math.log(j.reqclass) / Math.LN2);
										ae(b, ct(g_chr_classes[(1 + Math.log(j.reqclass) / Math.LN2)]));
										ae(c, b);
										ae(c, ce("br"))
									}
								}
								ae(o, ct(g_spell_skills[j.skill[h]]));
								ae(c, o)
							} else {
								ae(c, ct(g_spell_skills[j.skill[h]]))
							}
						}
					}
					if (j.learnedat > 0) {
						ae(c, ct(" ("));
						var d = ce("span");
						if (j.learnedat == 9999) {
							d.className = "q0";
							ae(d, ct("??"))
						} else {
							if (j.learnedat > 0) {
								ae(d, ct(j.learnedat));
								d.style.fontWeight = "bold"
							}
						}
						ae(c, d);
						ae(c, ct(")"))
					}
					ae(g, c);
					if (j.colors != null) {
						this.columns[q].type = null;
						var l = j.colors,
							p = 0;
						for (var h = 0; h < l.length; ++h) {
							if (l[h] > 0) {
								++p;
								break
							}
						}
						if (p > 0) {
							p = 0;
							c = ce("div");
							c.className = "small";
							c.style.fontWeight = "bold";
							for (var h = 0; h < l.length; ++h) {
								if (l[h] > 0) {
									if (p++>0) {
										ae(c, ct(" "))
									}
									var n = ce("span");
									n.className = "r" + (h + 1);
									ae(n, ct(l[h]));
									ae(c, n)
								}
							}
							ae(g, c)
						}
					}
				}
			},
			getVisibleText: function (a) {
				var b = Listview.funcBox.arrayText(a.skill, g_spell_skills);
				if (a.learnedat > 0) {
					b += " " + (a.learnedat == 9999 ? "??" : a.learnedat)
				}
				return b
			},
			sortFunc: function (e, c) {
				if (e.reqclass && c.reqclass) {
					return strcmp(g_chr_classes[(1 + Math.log(e.reqclass) / Math.LN2)], g_chr_classes[(1 + Math.log(c.reqclass) / Math.LN2)])
				}
				var d = [e.learnedat, c.learnedat];
				for (var g = 0; g < 2; ++g) {
					var h = (g == 0 ? e : c);
					if (d[g] == 9999 && h.colors != null) {
						var f = 0;
						while (h.colors[f] == 0 && f < h.colors.length) {
							f++
						}
						if (f < h.colors.length) {
							d[g] = h.colors[f]
						}
					}
				}
				var j = strcmp(d[0], d[1]);
				if (j != 0) {
					return j
				}
				if (e.colors != null && c.colors != null) {
					for (var f = 0; f < 4; ++f) {
						j = strcmp(e.colors[f], c.colors[f]);
						if (j != 0) {
							return j
						}
					}
				}
				return Listview.funcBox.assocArrCmp(e.skill, c.skill, g_spell_skills)
			}
		}],
		getItemLink: function (a) {
			return "/spell=" + a.id
		},
		onBeforeCreate: function () {
			if (this.centerReagents) {
				this.columns[3].align = null
			}
		}
	},
	zone: {
		sort: [1],
		nItemsPerPage: -1,
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			value: "name",
			compute: function (c, e) {
				var b = ce("a");
				b.style.fontFamily = "Verdana, sans-serif";
				b.href = this.template.getItemLink(c);
				ae(b, ct(c.name));
				if (c.expansion) {
					var d = ce("span");
					d.className = g_GetExpansionClassName(c.expansion);
					ae(d, b);
					ae(e, d)
				} else {
					ae(e, b)
				}
			},
			getVisibleText: function (a) {
				var b = a.name + Listview.funcBox.getExpansionText(a);
				if (a.instance == 5 || a.instance == 8) {
					b += " heroic"
				}
				return b
			}
		},
		{
			id: "level",
			name: LANG.level,
			type: "range",
			width: "10%",
			getMinValue: function (a) {
				return a.minlevel
			},
			getMaxValue: function (a) {
				return a.maxlevel
			},
			compute: function (a, b) {
				if (a.minlevel > 0 && a.maxlevel > 0) {
					if (a.minlevel != a.maxlevel) {
						return a.minlevel + LANG.hyphen + a.maxlevel
					} else {
						return a.minlevel
					}
				}
			},
			sortFunc: function (d, c, e) {
				if (e > 0) {
					return strcmp(d.minlevel, c.minlevel) || strcmp(d.maxlevel, c.maxlevel)
				} else {
					return strcmp(d.maxlevel, c.maxlevel) || strcmp(d.minlevel, c.minlevel)
				}
			}
		},
		{
			id: "players",
			name: LANG.players,
			type: "text",
			hidden: true,
			compute: function (a, d) {
				if (a.instance > 0) {
					var b = ce("span");
					if (a.nplayers == -2) {
						a.nplayers = "10/25"
					}
					var c = "";
					if (a.nplayers) {
						if (a.instance == 4) {
							c += sprintf(LANG.lvzone_xvx, a.nplayers, a.nplayers)
						} else {
							c += sprintf(LANG.lvzone_xman, a.nplayers)
						}
					}
					ae(b, ct(c));
					ae(d, b)
				}
			},
			getVisibleText: function (a) {
				if (a.instance > 0) {
					if (a.nplayers == -2) {
						a.nplayers = "10/25"
					}
					var b = "";
					if (a.nplayers && ((a.instance != 2 && a.instance != 5) || a.nplayers > 5)) {
						if (a.instance == 4) {
							b += sprintf(LANG.lvzone_xvx, a.nplayers, a.nplayers)
						} else {
							b += sprintf(LANG.lvzone_xman, a.nplayers)
						}
					}
					return b
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp(d.nplayers, c.nplayers)
			}
		},
		{
			id: "territory",
			name: LANG.territory,
			type: "text",
			width: "13%",
			compute: function (a, c) {
				var b = ce("span");
				switch (a.territory) {
				case 0:
					b.className = "icon-alliance";
					break;
				case 1:
					b.className = "icon-horde";
					break;
				case 4:
					b.className = "icon-ffa";
					break
				}
				ae(b, ct(g_zone_territories[a.territory]));
				ae(c, b)
			},
			getVisibleText: function (a) {
				return g_zone_territories[a.territory]
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_zone_territories[d.territory], g_zone_territories[c.territory])
			}
		},
		{
			id: "instancetype",
			name: LANG.instancetype,
			type: "text",
			compute: function (a, f) {
				if (a.instance > 0) {
					var b = ce("span");
					if ((a.instance >= 1 && a.instance <= 5) || a.instance == 7 || a.instance == 8) {
						b.className = "icon-instance" + a.instance
					}
					var e = g_zone_instancetypes[a.instance];
					if (a.instance == 5 || a.instance == 8) {
						var c = ce("span");
						c.className = "icon-heroic";
						var d = a.maxlevel;
						if (Math.floor(a.minlevel / 10) == Math.floor(a.maxlevel / 10) && a.maxlevel % 10 > 0) {
							d = (Math.floor(a.maxlevel / 10) + 1) * 10
						}
						g_addTooltip(c, LANG.tooltip_heroicmodeavailable + LANG.qty.replace("$1", d));
						ae(f, c)
					}
					ae(b, ct(e));
					ae(f, b)
				}
			},
			getVisibleText: function (a) {
				if (a.instance > 0) {
					var b = g_zone_instancetypes[a.instance];
					if (a.nplayers && ((a.instance != 2 && a.instance != 5) || a.nplayers > 5)) {
						if (a.instance == 4) {
							b += " " + sprintf(LANG.lvzone_xvx, a.nplayers, a.nplayers)
						} else {
							b += " " + sprintf(LANG.lvzone_xman, a.nplayers)
						}
					}
					if (a.instance == 5 || a.instance == 8) {
						b += " heroic"
					}
					return b
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_zone_instancetypes[d.instance], g_zone_instancetypes[c.instance]) || strcmp(d.instance, c.instance) || strcmp(d.nplayers, c.nplayers)
			}
		},
		{
			id: "category",
			name: LANG.category,
			type: "text",
			width: "15%",
			compute: function (c, d) {
				d.className = "small q1";
				var b = ce("a");
				b.href = "/zones=" + c.category;
				ae(b, ct(g_zone_categories[c.category]));
				ae(d, b)
			},
			getVisibleText: function (a) {
				return g_zone_categories[a.category]
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_zone_categories[d.category], g_zone_categories[c.category])
			}
		}],
		getItemLink: function (a) {
			return "/zone=" + a.id
		}
	},
	holiday: {
		sort: [1],
		nItemsPerPage: -1,
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			value: "name",
			compute: function (c, d) {
				var b = ce("a");
				b.style.fontFamily = "Verdana, sans-serif";
				b.href = this.template.getItemLink(c);
				ae(b, ct(c.name));
				ae(d, b)
			},
			getVisibleText: function (a) {
				return a.name
			}
		},
		{
			id: "date",
			name: LANG.date,
			type: "text",
			width: "16%",
			allText: true,
			compute: function (b, e) {
				if (b.startDate && b.endDate) {
					var c = Listview.funcBox.getEventNextDates(b.startDate, b.endDate, b.rec || 0);
					if (c[0] && c[1]) {
						var d = g_formatDateSimple(c[0]),
							a = g_formatDateSimple(c[1]);
						if (d != a) {
							ae(e, ct(d + LANG.hyphen + a))
						} else {
							ae(e, ct(d))
						}
						return
					}
				}
			},
			getVisibleText: function (b) {
				if (b.startDate && b.endDate) {
					var c = Listview.funcBox.getEventNextDates(b.startDate, b.endDate, b.rec || 0);
					if (c[0] && c[1]) {
						var d = g_formatDateSimple(c[0]),
							a = g_formatDateSimple(c[1]);
						if (d != a) {
							return d + LANG.hyphen + a
						} else {
							return d
						}
					}
				}
				return ""
			},
			sortFunc: function (e, c, g) {
				if (e.startDate && c.startDate) {
					var d = Listview.funcBox.getEventNextDates(e.startDate, e.endDate, e.rec || 0);
					var f = Listview.funcBox.getEventNextDates(c.startDate, c.endDate, c.rec || 0);
					if (d[0] && f[0]) {
						return d[0] - f[0]
					}
				} else {
					if (e.startDate) {
						return -1
					} else {
						if (c.startDate) {
							return 1
						}
					}
				}
				return 0
			}
		},
		{
			id: "category",
			name: LANG.category,
			type: "text",
			width: "16%",
			compute: function (d, e) {
				e.className = "small q1";
				var b = ce("a"),
					c = "/events=" + d.category;
				b.href = c;
				ae(b, ct(g_holiday_categories[d.category]));
				ae(e, b)
			},
			getVisibleText: function (a) {
				return g_holiday_categories[a.category]
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_holiday_categories[d.category], g_holiday_categories[c.category])
			}
		}],
		getItemLink: function (a) {
			return "/event=" + a.id
		}
	},
	comment: {
		sort: [1],
		mode: 2,
		nItemsPerPage: 40,
		poundable: 2,
		columns: [{
			value: "number"
		},
		{
			value: "id"
		},
		{
			value: "rating"
		}],
		compute: function (E, U, T) {
			var Y, D = new Date(E.date),
				R = (g_serverTime - D) / 1000,
				e = (g_user.roles & U_GROUP_COMMENTS_MODERATOR) != 0,
				V = E.rating < 0 || E.purged || E.deleted || (E.__minPatch && g_getPatchVersion.T[E.__minPatch] > D),
				N = e || (E.user.toLowerCase() == g_user.name.toLowerCase() && !g_user.commentban),
				G = N && E.deleted == 0,
				c = N && E.replyTo != E.id,
				W = true,
				P = E.purged == 0 && E.deleted == 0 && g_user.id && E.user.toLowerCase() != g_user.name.toLowerCase() && in_array(E.raters, g_user.id, function (i) {
				return i[0]
			}) == -1 && !g_user.ratingban,
				m = E.rating >= 0 && (g_user.id == 0 || P || g_user.ratingban),
				B = g_users[E.user];
			E.ratable = P;
			var S = U;
			var H = ce("div");
			var t = ce("div");
			var o = ce("em");
			E.divHeader = H;
			E.divBody = t;
			E.divLinks = o;
			S.className = "comment-wrapper";
			if (E.indent) {
				S.className += " comment-indent"
			}
			if (V) {
				S.className += " comment-collapsed"
			}
			U = ce("div");
			U.className = "comment comment" + (T % 2);
			ae(S, U);
			H.className = "comment-header";
			ae(U, H);
			var k = ce("em");
			k.className = "comment-rating";
			if (V) {
				var w = ce("a");
				w.href = "javascript:;";
				w.onclick = Listview.funcBox.coToggleVis.bind(w, E);
				ae(w, ct(LANG.lvcomment_show));
				ae(k, w);
				ae(k, ct(" " + String.fromCharCode(160) + " "))
			}
			var u = ce("b");
			var q = ce("a");
			q.href = "javascript:;";
			ae(q, ct(LANG.lvcomment_rating));
			var z = ce("span");
			z.id = "commentrating" + E.id;
			ae(z, ct(Listview.funcBox.coDisplayRating(E)));
			q.onclick = Listview.funcBox.coToggleRating.bind(this);
			ae(q, z);
			ae(u, q);
			ae(k, u);
			ae(k, ct(" "));
			var M = ce("span");
			var n = ce("a"),
				X = ce("a");
			if (P) {
				n.href = X.href = "javascript:;";
				n.onclick = Listview.funcBox.coRate.bind(n, E, 1);
				X.onclick = Listview.funcBox.coRate.bind(X, E, -1);
				if (e) {
					var L = ce("a");
					L.href = "javascript:;";
					L.onclick = Listview.funcBox.coRate.bind(L, E, 0);
					L.onmouseover = Listview.funcBox.coCustomRatingOver;
					L.onmousemove = Tooltip.cursorUpdate;
					L.onmouseout = Tooltip.hide;
					ae(L, ct("[~]"));
					ae(M, L);
					ae(M, ct(" "))
				}
			} else {
				if (g_user.ratingban) {
					n.href = X.href = "javascript:;"
				} else {
					n.href = X.href = "/account=signin"
				}
			}
			ae(n, ct("[+]"));
			if (!g_user.ratingban) {
				n.onmouseover = Listview.funcBox.coPlusRatingOver;
				X.onmouseover = Listview.funcBox.coMinusRatingOver;
				n.onmousemove = X.onmousemove = Tooltip.cursorUpdate;
				n.onmouseout = X.onmouseout = Tooltip.hide
			} else {
				g_addTooltip(n, LANG.tooltip_banned_rating, "q");
				g_addTooltip(X, LANG.tooltip_banned_rating, "q")
			}
			ae(X, ct("[-]"));
			ae(M, X);
			ae(M, ct(" "));
			ae(M, n);
			ae(k, M);
			if (!m) {
				M.style.display = "none"
			}
			ae(H, k);
			o.className = "comment-links";
			var d = false;
			if (N) {
				var b = ce("span");
				var K = ce("a");
				ae(K, ct(LANG.lvcomment_edit));
				K.onclick = Listview.funcBox.coEdit.bind(this, E, 0);
				ns(K);
				K.href = "javascript:;";
				ae(b, K);
				d = true;
				ae(o, b)
			}
			if (G) {
				var p = ce("span");
				var A = ce("a");
				if (d) {
					ae(p, ct("|"))
				}
				ae(A, ct(LANG.lvcomment_delete));
				A.onclick = Listview.funcBox.coDelete.bind(this, E);
				ns(A);
				A.href = "javascript:;";
				ae(p, A);
				d = true;
				ae(o, p)
			}
			if (c) {
				var J = ce("span");
				var g = ce("a");
				if (d) {
					ae(J, ct("|"))
				}
				ae(g, ct(LANG.lvcomment_detach));
				g.onclick = Listview.funcBox.coDetach.bind(this, E);
				ns(g);
				g.href = "javascript:;";
				ae(J, g);
				d = true;
				ae(o, J)
			}
			if (W) {
				var F = ce("span");
				var j = ce("a");
				if (d) {
					ae(F, ct("|"))
				}
				ae(j, ct(LANG.lvcomment_report));
				j.onclick = ContactTool.show.bind(ContactTool, {
					mode: 1,
					comment: E
				});
				j.className = "icon-report";
				j.href = "javascript:;";
				g_addTooltip(j, LANG.report_tooltip, "q2");
				ae(F, j);
				d = true;
				ae(o, F)
			}
			if (!g_user.commentban) {
				var h = ce("span");
				var l = ce("a");
				if (d) {
					ae(h, ct("|"))
				}
				ae(l, ct(LANG.lvcomment_reply));
				if (g_user.id > 0) {
					l.onclick = Listview.funcBox.coReply.bind(this, E);
					l.href = "javascript:;"
				} else {
					l.href = "/account=signin"
				}
				ae(h, l);
				d = true;
				ae(o, h)
			}
			if (V) {
				t.style.display = "none";
				o.style.display = "none"
			}
			ae(H, o);
			var v = ce("var");
			ae(v, ct(LANG.lvcomment_by));
			aUser = ce("a");
			aUser.href = "/user=" + E.user;
			ae(aUser, ct(E.user));
			ae(v, aUser);
			ae(v, ct(" "));
			var a = ce("a");
			a.className = "q0";
			a.id = "comments:id=" + E.id;
			a.href = "#" + a.id;
			Listview.funcBox.coFormatDate(a, R, D);
			ae(v, a);
			ae(v, ct(sprintf(LANG.lvcomment_patch, g_getPatchVersion(D))));
			if (B != null && B.avatar) {
				var f = Icon.createUser(B.avatar, B.avatarmore, 0, null, ((B.roles & U_GROUP_PREMIUM) && !(B.border)));
				f.style.marginRight = "3px";
				f.style.cssFloat = f.style.styleFloat = "left";
				ae(H, f);
				v.style.lineHeight = "26px"
			}
			ae(H, v);
			t.className = "text comment-body" + Listview.funcBox.coGetColor(E);
			if (E.indent) {
				t.className += " comment-body-indent"
			}
			var O = Markup.rolesToClass(E.roles);
			t.innerHTML = Markup.toHtml(E.body, {
				allow: O,
				mode: Markup.MODE_COMMENT,
				roles: E.roles
			});
			ae(U, t);
			var C = ce("div");
			C.className = "text comment-body";
			if (E.indent) {
				C.className += " comment-body-indent"
			}
			if (E.response) {
				C.innerHTML = Markup.toHtml("[div][/div][wowheadresponse=" + E.responseuser + " roles=" + E.responseroles + "]" + E.response + "[/wowheadresponse]", {
					allow: Markup.CLASS_STAFF,
					roles: E.responseroles,
					uid: "resp-" + E.id
				})
			}
			ae(U, C);
			E.divResponse = C;
			if ((E.roles & U_GROUP_COMMENTS_MODERATOR) == 0 || g_user.roles & U_GROUP_COMMENTS_MODERATOR) {
				var Q = ce("div");
				E.divLastEdit = Q;
				Q.className = "comment-lastedit";
				ae(Q, ct(LANG.lvcomment_lastedit));
				var r = ce("a");
				ae(r, ct(" "));
				ae(Q, r);
				ae(Q, ct(" "));
				var I = ce("span");
				ae(Q, I);
				ae(Q, ct(" "));
				Listview.funcBox.coUpdateLastEdit(E);
				if (V) {
					Q.style.display = "none"
				}
				ae(U, Q)
			}
		},
		createNote: function (b) {
			var g = ce("small");
			if (!g_user.commentban) {
				var m = ce("a");
				if (g_user.id > 0) {
					m.href = "javascript:;";
					m.onclick = co_addYourComment
				} else {
					m.href = "/account=signin"
				}
				ae(m, ct(LANG.lvcomment_add));
				ae(g, m);
				var e = ce("span");
				e.style.padding = "0 5px";
				e.style.color = "white";
				ae(e, ct("|"));
				ae(g, e)
			}
			ae(g, ct(LANG.lvcomment_sort));
			var n = ce("a");
			n.href = "javascript:;";
			ae(n, ct(LANG.lvcomment_sortdate));
			n.onclick = Listview.funcBox.coSortDate.bind(this, n);
			ae(g, n);
			ae(g, ct(LANG.comma));
			var o = ce("a");
			o.href = "javascript:;";
			ae(o, ct(LANG.lvcomment_sortrating));
			o.onclick = Listview.funcBox.coSortHighestRatedFirst.bind(this, o);
			ae(g, o);
			var h = 1;
			if (g_user && g_user.cookies.comment_sort) {
				h = g_user.cookies.comment_sort
			} else {
				h = g_getWowheadCookie("temp_comment_sort")
			}
			if (h == "2") {
				o.onclick()
			} else {
				n.onclick()
			}
			var e = ce("span");
			e.style.padding = "0 5px";
			e.style.color = "white";
			ae(e, ct("|"));
			ae(g, e);
			var q = ce("select");
			var f = ce("option");
			f.value = 0;
			f.selected = "selected";
			ae(q, f);
			var l = {};
			for (var j = 0; j < this.data.length; ++j) {
				var i = new Date(this.data[j].date).getTime();
				l[g_getPatchVersionIndex(i)] = true
			}
			var k = [];
			for (var c in l) {
				k.push(c)
			}
			k.sort(function (p, d) {
				return d - p
			});
			for (var c = 0; c < k.length; ++c) {
				var f = ce("option");
				f.value = k[c];
				ae(f, ct(g_getPatchVersion.V[k[c]]));
				ae(q, f)
			}
			q.onchange = Listview.funcBox.coFilterByPatchVersion.bind(this, q);
			ae(g, ct(LANG.lvcomment_patchfilter));
			ae(g, q);
			ae(b, g)
		},
		onNoData: function (c) {
			if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
				var a = "<b>" + LANG.lvnodata_co1 + '</b><div class="pad2"></div>';
				if (g_user.id > 0) {
					var b = LANG.lvnodata_co2;
					b = b.replace("<a>", '<a href="javascript:;" onclick="co_addYourComment()" onmousedown="return false">');
					a += b
				} else {
					var b = LANG.lvnodata_co3;
					b = b.replace("<a>", '<a href="/account=signin">');
					b = b.replace("<a>", '<a href="/account=signup">');
					a += b
				}
				c.style.padding = "1.5em 0";
				c.innerHTML = a
			}
		},
		onBeforeCreate: function () {
			if (location.hash && location.hash.match(/:id=([0-9]+)/) != null) {
				var a = in_array(this.data, parseInt(RegExp.$1), function (b) {
					return b.id
				});
				this.rowOffset = this.getRowOffset(a);
				return this.data[a]
			}
		},
		onAfterCreate: function (a) {
			if (a != null) {
				var b = a.__div;
				this.tabs.__st = b;
				b.firstChild.style.border = "1px solid #505050"
			}
		}
	},
	commentpreview: {
		sort: [4],
		nItemsPerPage: 75,
		columns: [{
			id: "subject",
			name: LANG.subject,
			align: "left",
			value: "subject",
			compute: function (f, e) {
				var b = ce("a");
				b.style.fontFamily = "Verdana, sans-serif";
				b.href = this.template.getItemLink(f);
				ae(b, ct(f.subject));
				ae(e, b);
				var c = ce("div");
				c.className = "small";
				ae(c, ct(LANG.types[f.type][0]));
				ae(e, c)
			}
		},
		{
			id: "preview",
			name: LANG.preview,
			align: "left",
			width: "50%",
			value: "preview",
			compute: function (g, f, b) {
				var c = ce("div");
				c.className = "crop";
				if (g.rating >= 10) {
					c.className += " comment-green"
				}
				ae(c, ct(Markup.removeTags(g.preview, {
					mode: Markup.MODE_ARTICLE
				})));
				ae(f, c);
				if (g.rating) {
					c = ce("div");
					c.className = "small3";
					ae(c, ct(LANG.lvcomment_rating + (g.rating > 0 ? "+" : "") + g.rating));
					var a = ce("span"),
						e = "";
					a.className = "q10";
					if (g.deleted) {
						e = LANG.lvcomment_deleted
					} else {
						if (g.purged) {
							e = LANG.lvcomment_purged
						}
					}
					ae(a, ct(e));
					ae(c, a);
					b.__status = a;
					ae(f, c)
				}
			}
		},
		{
			id: "author",
			name: LANG.author,
			value: "user",
			compute: function (d, c) {
				c.className = "q1";
				var b = ce("a");
				b.href = "/user=" + d.user;
				ae(b, ct(d.user));
				ae(c, b)
			}
		},
		{
			id: "posted",
			name: LANG.posted,
			width: "16%",
			value: "elapsed",
			compute: function (e, d) {
				var a = new Date(e.date),
					c = (g_serverTime - a) / 1000;
				var b = ce("span");
				Listview.funcBox.coFormatDate(b, c, a, 0, 1);
				ae(d, b)
			}
		}],
		getItemLink: function (a) {
			return "/" + g_types[a.type] + "=" + a.typeId + (a.id != null ? "#comments:id=" + a.id : "")
		}
	},
	screenshot: {
		sort: [],
		mode: 3,
		nItemsPerPage: 40,
		nItemsPerRow: 4,
		poundable: 2,
		columns: [],
		compute: function (k, e, l) {
			var u, o = new Date(k.date),
				f = (g_serverTime - o) / 1000;
			e.className = "screenshot-cell";
			e.vAlign = "bottom";
			var q = ce("a");
			q.href = "#screenshots:id=" + k.id;
			q.onclick = rf2;
			var v = ce("img"),
				t = Math.min(150 / k.width, 150 / k.height);
			v.src = g_staticUrl + "/uploads/screenshots/thumb/" + k.id + ".jpg";
			ae(q, v);
			ae(e, q);
			var p = ce("div");
			p.className = "screenshot-cell-user";
			var m = (k.user != null && k.user.length);
			if (m) {
				q = ce("a");
				q.href = "/user=" + k.user;
				ae(q, ct(k.user));
				ae(p, ct(LANG.lvscreenshot_from));
				ae(p, q);
				ae(p, ct(" "))
			}
			var j = ce("span");
			if (m) {
				Listview.funcBox.coFormatDate(j, f, o)
			} else {
				Listview.funcBox.coFormatDate(j, f, o, 0, 1)
			}
			ae(p, j);
			ae(p, ct(" " + LANG.dash + " "));
			var q = ce("a");
			q.href = "javascript:;";
			q.onclick = ContactTool.show.bind(ContactTool, {
				mode: 3,
				screenshot: k
			});
			q.className = "icon-report";
			g_addTooltip(q, LANG.report_tooltip, "q2");
			ae(q, ct(LANG.report));
			ae(p, q);
			ae(e, p);
			p = ce("div");
			p.style.position = "relative";
			p.style.height = "1em";
			if (Locale.getId() != LOCALE_ENUS && k.caption) {
				k.caption = ""
			}
			var h = (k.caption != null && k.caption.length);
			var g = (k.subject != null && k.subject.length);
			if (h || g) {
				var r = ce("div");
				r.className = "screenshot-caption";
				if (g) {
					var c = ce("small");
					ae(c, ct(LANG.types[k.type][0] + LANG.colon));
					var b = ce("a");
					ae(b, ct(k.subject));
					b.href = "/" + g_types[k.type] + "=" + k.typeId;
					ae(c, b);
					ae(r, c);
					if (h && k.caption.length) {
						ae(c, ct(" (...)"))
					}
					ae(c, ce("br"))
				}
				if (h) {
					aE(e, "mouseover", Listview.funcBox.ssCellOver.bind(r));
					aE(e, "mouseout", Listview.funcBox.ssCellOut.bind(r));
					var n = ce("span");
					n.innerHTML = Markup.toHtml(k.caption, {
						mode: Markup.MODE_SIGNATURE
					});
					ae(r, n)
				}
				ae(p, r)
			}
			aE(e, "click", Listview.funcBox.ssCellClick.bind(this, l));
			ae(e, p)
		},
		createNote: function (d) {
			if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
				var c = ce("small");
				var b = ce("a");
				if (g_user.id > 0) {
					b.href = "javascript:;";
					b.onclick = ss_submitAScreenshot
				} else {
					b.href = "/account=signin"
				}
				ae(b, ct(LANG.lvscreenshot_submit));
				ae(c, b);
				ae(d, c)
			}
		},
		onNoData: function (c) {
			if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
				var a = "<b>" + LANG.lvnodata_ss1 + '</b><div class="pad2"></div>';
				if (g_user.id > 0) {
					var b = LANG.lvnodata_ss2;
					b = b.replace("<a>", '<a href="javascript:;" onclick="ss_submitAScreenshot()" onmousedown="return false">');
					a += b
				} else {
					var b = LANG.lvnodata_ss3;
					b = b.replace("<a>", '<a href="/account=signin">');
					b = b.replace("<a>", '<a href="/account=signup">');
					a += b
				}
				c.style.padding = "1.5em 0";
				c.innerHTML = a
			} else {
				return -1
			}
		},
		onBeforeCreate: function () {
			if (location.hash && location.hash.match(/:id=([0-9]+)/) != null) {
				var a = in_array(this.data, parseInt(RegExp.$1), function (b) {
					return b.id
				});
				this.rowOffset = this.getRowOffset(a);
				return a
			}
		},
		onAfterCreate: function (a) {
			if (a != null) {
				setTimeout((function () {
					ScreenshotViewer.show({
						screenshots: this.data,
						pos: a
					})
				}).bind(this), 1)
			}
		}
	},
	video: {
		sort: [],
		mode: 3,
		nItemsPerPage: 40,
		nItemsPerRow: 4,
		poundable: 2,
		columns: [],
		compute: function (e, f, j) {
			var q, k = new Date(e.date),
				r = (g_serverTime - k) / 1000;
			f.className = "screenshot-cell";
			f.vAlign = "bottom";
			var p = ce("a");
			p.href = "#videos:id=" + e.id;
			p.onclick = rf2;
			var h = ce("img");
			h.src = sprintf(vi_thumbnails[e.videoType], e.videoId);
			ae(p, h);
			ae(f, p);
			var l = ce("div");
			l.className = "screenshot-cell-user";
			var t = (e.user != null && e.user.length);
			if (t) {
				p = ce("a");
				p.href = "/user=" + e.user;
				ae(p, ct(e.user));
				ae(l, ct(LANG.lvvideo_from));
				ae(l, p);
				ae(l, ct(" "))
			}
			var u = ce("span");
			if (t) {
				Listview.funcBox.coFormatDate(u, r, k)
			} else {
				Listview.funcBox.coFormatDate(u, r, k, 0, 1)
			}
			ae(l, u);
			ae(f, l);
			l = ce("div");
			l.style.position = "relative";
			l.style.height = "1em";
			if (Locale.getId(true) != LOCALE_ENUS && e.caption) {
				e.caption = ""
			}
			var c = (e.caption != null && e.caption.length);
			var g = (e.subject != null && e.subject.length);
			if (c || g) {
				var b = ce("div");
				b.className = "screenshot-caption";
				if (g) {
					var o = ce("small");
					ae(o, ct(LANG.types[e.type][0] + LANG.colon));
					var n = ce("a");
					ae(n, ct(e.subject));
					n.href = "/" + g_types[e.type] + "=" + e.typeId;
					ae(o, n);
					ae(b, o);
					if (c && e.caption.length) {
						ae(o, ct(" (...)"))
					}
					ae(o, ce("br"))
				}
				if (c) {
					aE(f, "mouseover", Listview.funcBox.ssCellOver.bind(b));
					aE(f, "mouseout", Listview.funcBox.ssCellOut.bind(b));
					var m = ce("span");
					m.innerHTML = Markup.toHtml(e.caption, {
						mode: Markup.MODE_SIGNATURE
					});
					ae(b, m)
				}
				ae(l, b)
			}
			aE(f, "click", Listview.funcBox.viCellClick.bind(this, j));
			ae(f, l)
		},
		createNote: function (d) {
			if (g_user && g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_VIDEO)) {
				if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
					var c = ce("small");
					var b = ce("a");
					if (g_user.id > 0) {
						b.href = "javascript:;";
						b.onclick = vi_submitAVideo
					} else {
						b.href = "/account=signin"
					}
					ae(b, ct(LANG.lvvideo_suggest));
					ae(c, b);
					ae(d, c)
				}
			}
		},
		onNoData: function (c) {
			if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
				var a = "<b>" + LANG.lvnodata_vi1 + '</b><div class="pad2"></div>';
				if (g_user.id > 0) {
					var b = LANG.lvnodata_vi2;
					b = b.replace("<a>", '<a href="javascript:;" onclick="vi_submitAVideo()" onmousedown="return false">');
					a += b
				} else {
					var b = LANG.lvnodata_vi3;
					b = b.replace("<a>", '<a href="/account=signin">');
					b = b.replace("<a>", '<a href="/account=signup">');
					a += b
				}
				c.style.padding = "1.5em 0";
				c.innerHTML = a
			} else {
				return -1
			}
		},
		onBeforeCreate: function () {
			if (location.hash && location.hash.match(/:id=([0-9]+)/) != null) {
				var a = in_array(this.data, parseInt(RegExp.$1), function (b) {
					return b.id
				});
				this.rowOffset = this.getRowOffset(a);
				return a
			}
		},
		onAfterCreate: function (a) {
			if (a != null) {
				setTimeout((function () {
					VideoViewer.show({
						videos: this.data,
						pos: a,
						displayAd: true
					})
				}).bind(this), 1)
			}
		}
	},
	pet: {
		sort: [1],
		nItemsPerPage: -1,
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			value: "name",
			span: 2,
			compute: function (b, k, g) {
				var e = ce("td");
				e.style.width = "1px";
				e.style.padding = "0";
				e.style.borderRight = "none";
				ae(e, Icon.create(b.icon, 0));
				ae(g, e);
				k.style.borderLeft = "none";
				var j = ce("div");
				var c = ce("a");
				c.style.fontFamily = "Verdana, sans-serif";
				c.href = this.template.getItemLink(b);
				ae(c, ct(b.name));
				if (b.expansion) {
					var f = ce("span");
					f.className = g_GetExpansionClassName(b.expansion);
					ae(f, c);
					ae(j, f)
				} else {
					ae(j, c)
				}
				if (b.exotic) {
					j.style.position = "relative";
					var h = ce("div");
					h.className = "small q1";
					h.style.fontStyle = "italic";
					h.style.position = "absolute";
					h.style.right = "3px";
					h.style.bottom = "0px";
					var c = ce("a");
					c.href = "/spell=53270";
					ae(c, ct(LANG.lvpet_exotic));
					ae(h, c);
					ae(j, h)
				}
				ae(k, j)
			},
			getVisibleText: function (a) {
				var b = a.name + Listview.funcBox.getExpansionText(a);
				if (a.exotic) {
					b += " " + LANG.lvpet_exotic
				}
				return b
			}
		},
		{
			id: "level",
			name: LANG.level,
			type: "range",
			getMinValue: function (a) {
				return a.minlevel
			},
			getMaxValue: function (a) {
				return a.maxlevel
			},
			compute: function (a, b) {
				if (a.minlevel > 0 && a.maxlevel > 0) {
					if (a.minlevel != a.maxlevel) {
						return a.minlevel + LANG.hyphen + a.maxlevel
					} else {
						return a.minlevel
					}
				} else {
					return -1
				}
			},
			sortFunc: function (d, c, e) {
				if (e > 0) {
					return strcmp(d.minlevel, c.minlevel) || strcmp(d.maxlevel, c.maxlevel)
				} else {
					return strcmp(d.maxlevel, c.maxlevel) || strcmp(d.minlevel, c.minlevel)
				}
			}
		},
		{
			id: "abilities",
			name: LANG.abilities,
			type: "text",
			getValue: function (b) {
				if (!b.spells) {
					return ""
				}
				if (b.spells.length > 0) {
					var d = "";
					for (var c = 0, a = b.spells.length; c < a; ++c) {
						if (b.spells[c]) {
							d += g_spells[b.spells[c]]["name_" + Locale.getName()]
						}
					}
					return d
				}
			},
			compute: function (a, b) {
				if (!a.spells) {
					return ""
				}
				if (a.spells.length > 0) {
					b.style.padding = "0";
					Listview.funcBox.createCenteredIcons(a.spells, b, "", 1)
				}
			},
			sortFunc: function (d, c) {
				if (!d.spells || !c.spells) {
					return 0
				}
				return strcmp(d.spellCount, c.spellCount) || strcmp(d.spells, c.spells)
			},
			hidden: true
		},
		{
			id: "diet",
			name: LANG.diet,
			type: "text",
			compute: function (a, e) {
				if (e) {
					e.className = "small"
				}
				var b = 0,
					c = "";
				for (var d in g_pet_foods) {
					if (a.diet & d) {
						if (b++>0) {
							c += LANG.comma
						}
						c += g_pet_foods[d]
					}
				}
				return c
			},
			sortFunc: function (d, c) {
				return strcmp(c.foodCount, d.foodCount) || Listview.funcBox.assocArrCmp(d.diet, c.diet, g_pet_foods)
			}
		},
		{
			id: "type",
			name: LANG.type,
			type: "text",
			compute: function (b, d) {
				if (b.type != null) {
					d.className = "small q1";
					var c = ce("a");
					c.href = "/pets=" + b.type;
					ae(c, ct(g_pet_types[b.type]));
					ae(d, c)
				}
			},
			getVisibleText: function (a) {
				if (a.type != null) {
					return g_pet_types[a.type]
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_pet_types[d.type], g_pet_types[c.type])
			}
		}],
		getItemLink: function (a) {
			return "/pet=" + a.id
		},
		getStatPct: function (b) {
			var a = ce("span");
			if (!isNaN(b) && b > 0) {
				a.className = "q2";
				ae(a, ct("+" + b + "%"))
			} else {
				if (!isNaN(b) && b < 0) {
					a.className = "q10";
					ae(a, ct(b + "%"))
				}
			}
			return a
		}
	},
	achievement: {
		sort: [1, 2],
		nItemsPerPage: 100,
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			value: "name",
			span: 2,
			compute: function (c, j, g) {
				var b = null;
				if (c.who && c.completed) {
					b = "who=" + c.who + "&when=" + c.completed.getTime()
				}
				var f = ce("td");
				f.style.width = "1px";
				f.style.padding = "0";
				f.style.borderRight = "none";
				if (c.statistic) {
					ae(f, g_gatheredstatistics.createIcon(c.id, 1))
				} else {
					ae(f, g_achievements.createIcon(c.id, 1))
				}
				Icon.getLink(f.firstChild).href = this.template.getItemLink(c);
				Icon.getLink(f.firstChild).rel = b;
				ae(g, f);
				j.style.borderLeft = "none";
				var e = ce("a");
				e.style.fontFamily = "Verdana, sans-serif";
				e.href = this.template.getItemLink(c);
				e.rel = b;
				ae(e, ct(c.name));
				ae(j, e);
				if (c.description != null) {
					var h = ce("div");
					h.className = "small";
					ae(h, ct(c.description));
					ae(j, h)
				}
			},
			getVisibleText: function (a) {
				var b = a.name;
				if (a.description) {
					b += " " + a.description
				}
				return b
			}
		},
		{
			id: "side",
			name: LANG.side,
			type: "text",
			compute: function (a, c) {
				if (a.side && a.side != 3) {
					var b = ce("span");
					b.className = (a.side == 1 ? "icon-alliance" : "icon-horde");
					b.onmouseover = function (d) {
						Tooltip.showAtCursor(d, g_sides[a.side], 0, 0, "q")
					};
					b.onmousemove = Tooltip.cursorUpdate;
					b.onmouseout = Tooltip.hide;
					ae(c, b)
				}
			},
			getVisibleText: function (a) {
				if (a.side) {
					return g_sides[a.side]
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_sides[d.side], g_sides[c.side])
			}
		},
		{
			id: "points",
			name: LANG.points,
			type: "number",
			width: "10%",
			value: "points",
			compute: function (a, b) {
				if (a.points) {
					Listview.funcBox.appendMoney(b, 0, null, 0, 0, 0, a.points)
				}
			}
		},
		{
			id: "rewards",
			name: LANG.rewards,
			type: "text",
			width: "20%",
			compute: function (h, d) {
				if (h.rewards) {
					var c = [];
					var b = [];
					var f = [];
					for (var e = 0; e < h.rewards.length; e++) {
						if (h.rewards[e][0] == 11) {
							f.push(h.rewards[e][1])
						} else {
							if (h.rewards[e][0] == 3) {
								c.push(h.rewards[e][1])
							} else {
								if (h.rewards[e][0] == 6) {
									b.push(h.rewards[e][1])
								}
							}
						}
					}
					if (c.length > 0) {
						for (var e = 0; e < c.length; e++) {
							if (!g_items[c[e]]) {
								return
							}
							var l = g_items[c[e]];
							var j = ce("a");
							j.href = "/item=" + c[e];
							j.className = "q" + l.quality + " icontiny";
							j.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + l.icon.toLowerCase() + ".gif)";
							ae(j, ct(l["name_" + Locale.getName()]));
							var k = ce("span");
							ae(k, j);
							ae(d, k);
							ae(d, ce("br"))
						}
					}
					if (b.length > 0) {
						for (var e = 0; e < b.length; e++) {
							if (!g_spells[b[e]]) {
								return
							}
							var l = g_spells[b[e]];
							var j = ce("a");
							j.href = "/spell=" + b[e];
							j.className = "q8 icontiny";
							j.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + l.icon.toLowerCase() + ".gif)";
							ae(j, ct(l["name_" + Locale.getName()]));
							var k = ce("span");
							ae(k, j);
							ae(d, k);
							ae(d, ce("br"))
						}
					}
					if (f.length > 0) {
						for (var e = 0; e < f.length; e++) {
							if (!g_titles[f[e]]) {
								return
							}
							var g = g_titles[f[e]]["name_" + Locale.getName()];
							g = g.replace("%s", '<span class="q0">&lt;' + LANG.name + "&gt;</span>");
							var k = ce("a");
							k.className = "q1";
							k.href = "/title=" + f[e];
							k.innerHTML = g;
							ae(d, k);
							ae(d, ce("br"))
						}
					}
				} else {
					if (h.reward) {
						var k = ce("span");
						k.className = "q1";
						ae(k, ct(h.reward));
						ae(d, k)
					}
				}
			},
			getVisibleText: function (a) {
				var c = "";
				if (a.rewards) {
					for (var b = 0; b < a.rewards.length; b++) {
						if (a.rewards[b][0] == 11) {
							c += " " + g_titles[a.rewards[b][1]]["name_" + Locale.getName()].replace("%s", "<" + LANG.name + ">")
						} else {
							if (a.rewards[b][0] == 3) {
								c += " " + g_items[a.rewards[b][1]]["name_" + Locale.getName()]
							} else {
								if (a.rewards[b][0] == 6) {
									c += " " + g_spells[a.rewards[b][1]]["name_" + Locale.getName()]
								}
							}
						}
					}
				} else {
					if (a.reward) {
						c += " " + a.reward
					}
				}
				return c
			},
			sortFunc: function (d, c) {
				var f = this.getVisibleText(d);
				var e = this.getVisibleText(c);
				if (f != "" && e == "") {
					return -1
				}
				if (e != "" && f == "") {
					return 1
				}
				return strcmp(f, e)
			}
		},
		{
			id: "category",
			name: LANG.category,
			type: "text",
			width: "15%",
			compute: function (c, e) {
				e.className = "small";
				if (in_array([14808, 14821, 14822, 14823, 14861, 14862, 14863, 14864, 14865, 14866, 15067], c.category) != -1 && c.parentcat != -1) {
					var b = ce("a");
					b.className = "q0";
					b.href = (c.statistic ? "/statistics=" : "/achievements=") + c.parentcat;
					ae(b, ct(g_achievement_categories[c.parentcat]));
					ae(e, b);
					ae(e, ce("br"))
				}
				var d = ce("a");
				d.className = "q1";
				d.href = (c.statistic ? "/statistics=" : "/achievements=") + c.category;
				ae(d, ct(g_achievement_categories[c.category]));
				ae(e, d)
			},
			getVisibleText: function (a) {
				return g_achievement_categories[a.category]
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_achievement_categories[d.category], g_achievement_categories[c.category])
			},
			hidden: true
		}],
		getItemLink: function (a) {
			return (a.statistic ? "/statistic=" : "/achievement=") + a.id
		}
	},
	title: {
		sort: [1],
		nItemsPerPage: -1,
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			value: "name",
			compute: function (e, g, d) {
				var c = ce("a"),
					f = ce("span"),
					b = ct(str_replace(e.name, "%s", ""));
				g.style.whiteSpace = "nowrap";
				g.style.fontFamily = "Verdana, sans-serif";
				c.href = this.template.getItemLink(e);
				if (e.who) {
					ae(f, ct(e.who))
				} else {
					ae(f, ct("<" + LANG.name + ">"));
					f.className = "q0"
				}
				if (e.name.indexOf("%s") > 0) {
					ae(c, b);
					ae(c, f)
				} else {
					if (e.name.indexOf("%s") == 0) {
						ae(c, f);
						ae(c, b)
					}
				}
				if (e.expansion) {
					var a = ce("span");
					a.className = g_GetExpansionClassName(e.expansion);
					ae(a, c);
					ae(g, a)
				} else {
					ae(g, c)
				}
			},
			sortFunc: function (d, c, e) {
				var f = trim(d.name.replace("%s", "").replace(/^[\s,]*(,|the |of the |of )/i, ""));
				bName = trim(c.name.replace("%s", "").replace(/^[\s,]*(,|the |of the |of )/i, ""));
				return strcmp(f, bName)
			},
			getVisibleText: function (a) {
				var b = a.name + Listview.funcBox.getExpansionText(a);
				return b
			}
		},
		{
			id: "gender",
			name: LANG.gender,
			type: "text",
			value: "gender",
			compute: function (c, d) {
				if (c.gender && c.gender != 3) {
					var a = g_file_genders[c.gender - 1];
					var b = ce("span");
					b.className = "icon-" + a;
					b.onmouseover = function (f) {
						Tooltip.showAtCursor(f, LANG[a], 0, 0, "q")
					};
					b.onmousemove = Tooltip.cursorUpdate;
					b.onmouseout = Tooltip.hide;
					ae(d, b)
				}
			},
			getVisibleText: function (a) {
				if (a.gender && a.gender != 3) {
					return LANG[g_file_genders[a.gender - 1]]
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp(d.gender, c.gender)
			}
		},
		{
			id: "side",
			name: LANG.side,
			type: "text",
			compute: function (b, c) {
				if (b.side && b.side != 3) {
					var a = ce("span");
					a.className = (b.side == 1 ? "icon-alliance" : "icon-horde");
					a.onmouseover = function (d) {
						Tooltip.showAtCursor(d, g_sides[b.side], 0, 0, "q")
					};
					a.onmousemove = Tooltip.cursorUpdate;
					a.onmouseout = Tooltip.hide;
					ae(c, a)
				}
			},
			getVisibleText: function (a) {
				if (a.side) {
					return g_sides[a.side]
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_sides[d.side], g_sides[c.side])
			}
		},
		{
			id: "source",
			name: LANG.source,
			type: "text",
			width: "50%",
			compute: function (j, d) {
				if (j.source) {
					nw(d);
					var b = 0;
					for (var k in j.source) {
						j.source[k].sort(function (l, i) {
							return i.s - l.s
						});
						for (var e = 0, f = j.source[k].length; e < f; ++e) {
							var c = j.source[k][e];
							var g = 0;
							if (j.faction && typeof c != "string" && c.s !== undefined && c.s != -1 && c.s != 2 - j.faction) {
								continue
							}
							if (b++>0) {
								ae(d, ct(" / "))
							}
							if (typeof c == "string") {
								ae(d, ct(c))
							} else {
								if (c.t) {
									g = c.t;
									var h = ce("a");
									h.href = "/" + g_types[c.t] + "=" + c.ti;
									h.className = "q1";
									if (c.s == 1) {
										h.className += " icon-alliance"
									}
									if (c.s == 0) {
										h.className += " icon-horde"
									}
									if (c.t == 5) {
										h.className += " icontiny";
										h.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_start.gif)"
									}
									ae(h, ct(c.n));
									ae(d, h)
								}
							}
						}
					}
				}
			},
			getVisibleText: function (d) {
				var f = "";
				if (d.source) {
					for (var c in d.source) {
						for (var b = 0, a = d.source[c].length; b < a; ++b) {
							var e = d.source[c][b];
							if (typeof e == "string") {
								f += " " + e
							} else {
								if (e.t) {
									f += " " + e.n
								}
							}
						}
					}
				}
				return f
			},
			sortFunc: function (d, c, e) {
				return strcmp(this.getVisibleText(d), this.getVisibleText(c))
			}
		},
		{
			id: "category",
			name: LANG.category,
			type: "text",
			width: "15%",
			compute: function (c, d) {
				nw(d);
				d.className = "small q1";
				var b = ce("a");
				b.href = "/titles=" + c.category;
				ae(b, ct(g_title_categories[c.category]));
				ae(d, b)
			},
			getVisibleText: function (a) {
				return g_title_categories[a.category]
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_title_categories[d.category], g_title_categories[c.category])
			},
			hidden: true
		}],
		getItemLink: function (a) {
			return "/title=" + a.id
		}
	},
	profile: {
		sort: [],
		nItemsPerPage: 50,
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			value: "name",
			type: "text",
			align: "left",
			span: 2,
			compute: function (f, c, h) {
				if (f.level) {
					var e = ce("td");
					e.style.width = "1px";
					e.style.padding = "0";
					e.style.borderRight = "none";
					ae(e, Icon.create(f.icon ? f.icon : "chr_" + g_file_races[f.race] + "_" + g_file_genders[f.gender] + "_" + g_file_classes[f.classs] + "0" + (f.level > 59 ? (Math.floor((f.level - 60) / 10) + 2) : 1), 1, null, this.template.getItemLink(f)));
					ae(h, e);
					c.style.borderLeft = "none"
				} else {
					c.colSpan = 2
				}
				var b = ce("div");
				b.style.position = "relative";
				var k = ce("a");
				k.style.fontFamily = "Verdana, sans-serif";
				k.href = this.template.getItemLink(f);
				ae(k, ct(f.name));
				ae(b, k);
				var g = ce("div");
				g.className = "small";
				g.style.marginRight = "20px";
				if (f.guild) {
					var k = ce("a");
					k.className = "q1";
					k.href = "/profiles=" + f.region + "." + f.realm + "?filter=cr=9;crs=0;crv=" + str_replace(urlencode(f.guild), "%20", "+") + "&roster=1";
					ae(k, ct(f.guild));
					ae(g, ct("<"));
					ae(g, k);
					ae(g, ct(">"))
				} else {
					if (f.description) {
						ae(g, ct(f.description))
					}
				}
				var l = ce("span"),
					j = "";
				l.className = "q10";
				if (f.deleted) {
					j = LANG.lvcomment_deleted
				}
				ae(l, ct(j));
				ae(g, l);
				ae(b, g);
				var g = ce("div");
				g.className = "small";
				g.style.fontStyle = "italic";
				g.style.position = "absolute";
				g.style.right = "3px";
				g.style.bottom = "0px";
				h.__status = g;
				if (f.published === 0) {
					ae(g, ct(LANG.privateprofile))
				}
				ae(b, g);
				ae(c, b)
			},
			getVisibleText: function (a) {
				var b = a.name;
				if (a.guild) {
					b += " " + a.guild
				}
				return b
			}
		},
		{
			id: "faction",
			name: LANG.faction,
			type: "text",
			compute: function (a, f) {
				if (!a.size && a.members === undefined && !a.level) {
					return
				}
				var e = ce("div"),
					c = ce("div"),
					b;
				b = Icon.create("faction_" + g_file_factions[a.faction + 1], 0);
				b.onmouseover = function (d) {
					Tooltip.showAtCursor(d, g_sides[a.faction + 1], 0, 0, "q")
				};
				b.onmousemove = Tooltip.cursorUpdate;
				b.onmouseout = Tooltip.hide;
				b.style.cssFloat = b.style.syleFloat = "left";
				e.style.margin = "0 auto";
				e.style.textAlign = "left";
				e.style.width = "26px";
				c.className = "clear";
				ae(e, b);
				ae(f, e);
				ae(f, c)
			},
			getVisibleText: function (a) {
				return g_sides[a.faction + 1]
			},
			sortFunc: function (d, c, e) {
				return strcmp(this.getVisibleText(d), this.getVisibleText(c))
			}
		},
		{
			id: "members",
			name: LANG.members,
			value: "members",
			hidden: 1
		},
		{
			id: "size",
			name: "Size",
			value: "size",
			hidden: 1
		},
		{
			id: "rank",
			name: "Rank",
			value: "rank",
			hidden: 1
		},
		{
			id: "race",
			name: LANG.race,
			type: "text",
			compute: function (a, f) {
				if (a.race) {
					var e = ce("div"),
						c = ce("div"),
						b;
					b = Icon.create("race_" + g_file_races[a.race] + "_" + g_file_genders[a.gender], 0, null, "/race=" + a.race);
					b.onmouseover = function (d) {
						Tooltip.showAtCursor(d, g_chr_races[a.race], 0, 0, "q")
					};
					b.onmousemove = Tooltip.cursorUpdate;
					b.onmouseout = Tooltip.hide;
					b.style.cssFloat = b.style.syleFloat = "left";
					e.style.margin = "0 auto";
					e.style.textAlign = "left";
					e.style.width = "26px";
					c.className = "clear";
					ae(e, b);
					ae(f, e);
					ae(f, c)
				}
			},
			getVisibleText: function (a) {
				return g_file_genders[a.gender] + " " + g_chr_races[a.race]
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_chr_races[d.race], g_chr_races[c.race])
			},
			hidden: 1
		},
		{
			id: "classs",
			name: LANG.classs,
			type: "text",
			compute: function (a, f) {
				if (a.classs) {
					var e = ce("div"),
						c = ce("div"),
						b;
					b = Icon.create("class_" + g_file_classes[a.classs], 0, null, "/class=" + a.classs);
					b.onmouseover = function (d) {
						Tooltip.showAtCursor(d, g_chr_classes[a.classs], 0, 0, "q")
					};
					b.onmousemove = Tooltip.cursorUpdate;
					b.onmouseout = Tooltip.hide;
					b.style.cssFloat = b.style.syleFloat = "left";
					e.style.margin = "0 auto";
					e.style.textAlign = "left";
					e.style.width = "26px";
					c.className = "clear";
					ae(e, b);
					ae(f, e);
					ae(f, c)
				} else {
					return -1
				}
			},
			getVisibleText: function (a) {
				if (a.classs) {
					return g_chr_classes[a.classs]
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp(this.getVisibleText(d), this.getVisibleText(c))
			},
			hidden: 1
		},
		{
			id: "level",
			name: LANG.level,
			value: "level",
			hidden: 1
		},
		{
			id: "talents",
			name: LANG.talents,
			type: "text",
			compute: function (c, f) {
				if (!c.level) {
					return
				}
				var e = [c.talenttree1, c.talenttree2, c.talenttree3];
				var d = pr_getSpecFromTalents(c.classs, e);
				var b = ce("a");
				b.className = "q1";
				b.rel = "np";
				b.href = this.template.getItemLink(c) + "#talents";
				b.onmouseover = function (a) {
					Tooltip.showAtCursor(a, d.name, 0, 0, "q")
				};
				b.onmousemove = Tooltip.cursorUpdate;
				b.onmouseout = Tooltip.hide;
				ae(b, ct(c.talenttree1 + "/" + c.talenttree2 + "/" + c.talenttree3));
				ae(f, b)
			},
			getVisibleText: function (a) {
				if (a.talenttree1 || a.talenttree2 || a.talenttree3) {
					if (a.talentspec > 0) {
						return g_chr_specs[a.classs][a.talentspec - 1]
					} else {
						return g_chr_specs[0]
					}
				} else {
					return g_chr_specs["-1"]
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp(this.getVisibleText(d), this.getVisibleText(c))
			},
			hidden: 1
		},
		{
			id: "gearscore",
			name: LANG.gearscore,
			tooltip: LANG.gearscore_real,
			value: "gearscore",
			compute: function (a, c) {
				var b = (a.level ? a.level : (a.members !== undefined ? 80 : 0));
				if (isNaN(a.gearscore) || !b) {
					return
				}
				c.className = "q" + pr_getGearScoreQuality(b, a.gearscore, (in_array([2, 6, 7, 11], a.classs) != -1));
				return (a.gearscore ? number_format(a.gearscore) : 0)
			},
			hidden: 1
		},
		{
			id: "achievementpoints",
			name: LANG.points,
			value: "achievementpoints",
			tooltip: LANG.tooltip_achievementpoints,
			compute: function (a, b) {
				if (a.achievementpoints) {
					Listview.funcBox.appendMoney(b, 0, null, 0, 0, 0, a.achievementpoints)
				}
			},
			hidden: 1
		},
		{
			id: "wins",
			name: LANG.wins,
			value: "wins",
			hidden: 1
		},
		{
			id: "losses",
			name: LANG.losses,
			compute: function (a, b) {
				return a.games - a.wins
			},
			hidden: 1
		},
		{
			id: "guildrank",
			name: LANG.guildrank,
			value: "guildrank",
			compute: function (c, d) {
				if (c.guildrank > 0) {
					return sprintf(LANG.rankno, c.guildrank)
				} else {
					if (c.guildrank == 0) {
						var a = ce("b");
						ae(a, ct(LANG.guildleader));
						ae(d, a)
					}
				}
			},
			getVisibleText: function (a) {
				if (a.guildrank > 0) {
					return sprintf(LANG.rankno, a.guildrank)
				} else {
					if (a.guildrank == 0) {
						return LANG.guildleader
					}
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp((d.guildrank >= 0 ? d.guildrank : 11), (c.guildrank >= 0 ? c.guildrank : 11))
			},
			hidden: 1
		},
		{
			id: "rating",
			name: LANG.rating,
			value: "rating",
			compute: function (a, b) {
				if (a.roster && a.arenateam[a.roster]) {
					return a.arenateam[a.roster].rating
				}
				return a.rating
			},
			sortFunc: function (d, c, e) {
				if (d.roster && d.arenateam[d.roster] && c.roster && c.arenateam[c.roster]) {
					return strcmp(d.arenateam[d.roster].rating, c.arenateam[c.roster].rating)
				}
				return strcmp(d.rating, c.rating)
			},
			hidden: 1
		},
		{
			id: "location",
			name: LANG.location,
			type: "text",
			compute: function (c, e) {
				var b;
				if (c.region) {
					if (c.realm) {
						b = ce("a");
						b.className = "q1";
						b.href = "/profiles=" + c.region + "." + c.realm;
						ae(b, ct(c.realmname));
						ae(e, b);
						ae(e, ce("br"))
					}
					var d = ce("small");
					b = ce("a");
					b.className = "q1";
					b.href = "/profiles=" + c.region;
					ae(b, ct(c.region.toUpperCase()));
					ae(d, b);
					if (c.battlegroup) {
						ae(d, ct(LANG.hyphen));
						b = ce("a");
						b.className = "q1";
						b.href = "/profiles=" + c.region + "." + c.battlegroup;
						ae(b, ct(c.battlegroupname));
						ae(d, b)
					}
					ae(e, d)
				}
			},
			getVisibleText: function (a) {
				var b = "";
				if (a.region) {
					b += " " + a.region
				}
				if (a.battlegroup) {
					b += " " + a.battlegroup
				}
				if (a.realm) {
					b += " " + a.realm
				}
				return trim(b)
			},
			sortFunc: function (d, c, e) {
				if (d.region != c.region) {
					return strcmp(d.region, c.region)
				}
				if (d.battlegroup != c.battlegroup) {
					return strcmp(d.battlegroup, c.battlegroup)
				}
				return strcmp(d.realm, c.realm)
			}
		},
		{
			id: "guild",
			name: LANG.guild,
			value: "guild",
			type: "text",
			compute: function (c, d) {
				if (!c.region || !c.battlegroup || !c.realm || !c.guild) {
					return
				}
				var b = ce("a");
				b.className = "q1";
				b.href = "/profiles=" + c.region + "." + c.realm + "?filter=cr=9;crs=0;crv=" + str_replace(urlencode(c.guild), "%20", "+") + "&roster=1";
				ae(b, ct(c.guild));
				ae(d, b)
			}
		}],
		getItemLink: function (a) {
			if (a.size !== undefined) {
				return "/profiles=" + a.region + "." + a.realm + "?filter=cr=" + (a.size == 2 ? 12 : (a.size == 3 ? 15 : 18)) + ";crs=0;crv=" + str_replace(urlencode(a.name), "%20", "+") + "&roster=" + (a.size == 5 ? 4 : a.size)
			} else {
				if (a.members !== undefined) {
					return "/profiles=" + a.region + "." + a.realm + "?filter=cr=9;crs=0;crv=" + str_replace(urlencode(a.name), "%20", "+") + "&roster=1"
				} else {
					return g_getProfileUrl(a)
				}
			}
		}
	},
	model: {
		sort: [],
		mode: 3,
		nItemsPerPage: 40,
		nItemsPerRow: 4,
		poundable: 2,
		columns: [],
		compute: function (e, k, f) {
			k.className = "screenshot-cell";
			k.vAlign = "bottom";
			var b = ce("a");
			b.href = "javascript:;";
			b.onclick = this.template.modelShow.bind(this.template, e.npcId, e.displayId, false);
			var c = ce("img");
			c.src = g_staticUrl + "/modelviewer/thumbs/npc/" + e.displayId + ".png";
			ae(b, c);
			ae(k, b);
			var j = ce("div");
			j.className = "screenshot-cell-user";
			b = ce("a");
			b.href = "/npcs=1?filter=" + (e.family ? "fa=" + e.family + ";" : "") + "minle=1;cr=35;crs=0;crv=" + e.skin;
			ae(b, ct(e.skin));
			ae(j, b);
			ae(j, ct(" (" + e.count + ")"));
			ae(k, j);
			j = ce("div");
			j.style.position = "relative";
			j.style.height = "1em";
			var h = ce("div");
			h.className = "screenshot-caption";
			var g = ce("small");
			ae(g, ct(LANG.level + ": "));
			ae(g, ct(e.minLevel + (e.minLevel == e.maxLevel ? "" : LANG.hyphen + (e.maxLevel == 9999 ? "??" : e.maxLevel))));
			ae(g, ce("br"));
			ae(h, g);
			ae(j, h);
			ae(k, j);
			aE(k, "click", this.template.modelShow.bind(this.template, e.npcId, e.displayId, true))
		},
		modelShow: function (d, b, f, g) {
			if (f) {
				g = $E(g);
				if (g.shiftKey || g.ctrlKey) {
					return
				}
				var a = 0,
					c = g._target;
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
				typeId: d,
				displayId: b,
				noPound: 1
			})
		}
	},
	classs: {
		sort: [1],
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			span: 2,
			value: "name",
			compute: function (e, k, g) {
				var c = ce("td");
				c.style.width = "1px";
				c.style.padding = "0";
				c.style.borderRight = "none";
				ae(c, Icon.create("class_" + g_file_classes[e.id], 0, null, this.template.getItemLink(e)));
				ae(g, c);
				k.style.borderLeft = "none";
				var j = ce("div");
				var b = ce("a");
				b.className = "c" + e.id;
				b.style.fontFamily = "Verdana, sans-serif";
				b.href = this.template.getItemLink(e);
				ae(b, ct(e.name));
				if (e.expansion) {
					var f = ce("span");
					f.className = g_GetExpansionClassName(e.expansion);
					ae(f, b);
					ae(j, f)
				} else {
					ae(j, b)
				}
				if (e.hero) {
					j.style.position = "relative";
					var h = ce("div");
					h.className = "small";
					h.style.fontStyle = "italic";
					h.style.position = "absolute";
					h.style.right = "3px";
					h.style.bottom = "0px";
					ae(h, ct(LANG.lvclass_hero));
					ae(j, h)
				}
				ae(k, j)
			}
		},
		{
			id: "races",
			name: LANG.races,
			type: "text",
			compute: function (e, g) {
				if (e.races) {
					var f = Listview.funcBox.assocBinFlags(e.races, g_chr_races);
					g.className = "q1";
					for (var d = 0, b = f.length; d < b; ++d) {
						if (d > 0) {
							ae(g, ct(LANG.comma))
						}
						var c = ce("a");
						c.href = "/race=" + f[d];
						ae(c, ct(g_chr_races[f[d]]));
						ae(g, c)
					}
				}
			},
			getVisibleText: function (a) {
				if (a.races) {
					return Listview.funcBox.arrayText(Listview.funcBox.assocBinFlags(a.races, g_chr_races), g_chr_races)
				}
			},
			sortFunc: function (d, c, e) {
				return Listview.funcBox.assocArrCmp(Listview.funcBox.assocBinFlags(d.races, g_chr_races), Listview.funcBox.assocBinFlags(c.races, g_chr_races), g_chr_races)
			}
		}],
		getItemLink: function (a) {
			return "/class=" + a.id
		}
	},
	race: {
		sort: [1],
		searchable: 1,
		filtrable: 1,
		columns: [{
			id: "name",
			name: LANG.name,
			type: "text",
			align: "left",
			span: 2,
			value: "name",
			compute: function (g, e, j) {
				var h = ce("div"),
					k;
				h.style.margin = "0 auto";
				h.style.textAlign = "left";
				h.style.width = "52px";
				k = Icon.create("race_" + g_file_races[g.id] + "_" + g_file_genders[0], 0, null, this.template.getItemLink(g));
				k.style.cssFloat = k.style.styleFloat = "left";
				ae(h, k);
				k = Icon.create("race_" + g_file_races[g.id] + "_" + g_file_genders[1], 0, null, this.template.getItemLink(g));
				k.style.cssFloat = k.style.styleFloat = "left";
				ae(h, k);
				var f = ce("td");
				f.style.width = "1px";
				f.style.padding = "0";
				f.style.borderRight = "none";
				ae(f, h);
				ae(j, f);
				e.style.borderLeft = "none";
				var b = ce("div");
				var l = ce("a");
				l.style.fontFamily = "Verdana, sans-serif";
				l.href = this.template.getItemLink(g);
				ae(l, ct(g.name));
				if (g.expansion) {
					var c = ce("span");
					c.className = g_GetExpansionClassName(g.expansion);
					ae(c, l);
					ae(b, c)
				} else {
					ae(b, l)
				}
				ae(e, b)
			}
		},
		{
			id: "side",
			name: LANG.side,
			type: "text",
			compute: function (a, c) {
				if (a.side && a.side != 3) {
					var b = ce("span");
					b.className = (a.side == 1 ? "icon-alliance" : "icon-horde");
					b.onmouseover = function (d) {
						Tooltip.showAtCursor(d, g_sides[a.side], 0, 0, "q")
					};
					b.onmousemove = Tooltip.cursorUpdate;
					b.onmouseout = Tooltip.hide;
					ae(c, b)
				}
			},
			getVisibleText: function (a) {
				if (a.side) {
					return g_sides[a.side]
				}
			},
			sortFunc: function (d, c, e) {
				return strcmp(g_sides[d.side], g_sides[c.side])
			}
		},
		{
			id: "classes",
			name: LANG.classes,
			type: "text",
			compute: function (f, g) {
				if (f.classes) {
					var e = Listview.funcBox.assocBinFlags(f.classes, g_chr_classes);
					for (var d = 0, b = e.length; d < b; ++d) {
						if (d > 0) {
							ae(g, ct(LANG.comma))
						}
						var c = ce("a");
						c.href = "/class=" + e[d];
						c.className = "c" + e[d];
						ae(c, ct(g_chr_classes[e[d]]));
						ae(g, c)
					}
				}
			},
			getVisibleText: function (a) {
				if (a.classes) {
					return Listview.funcBox.arrayText(Listview.funcBox.assocBinFlags(a.classes, g_chr_classes), g_chr_classes)
				}
			},
			sortFunc: function (d, c, e) {
				return Listview.funcBox.assocArrCmp(Listview.funcBox.assocBinFlags(d.classes, g_chr_classes), Listview.funcBox.assocBinFlags(c.classes, g_chr_classes), g_chr_classes)
			}
		}],
		getItemLink: function (a) {
			return "/race=" + a.id
		}
	}
};
