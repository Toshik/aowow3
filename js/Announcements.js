var Announcement = function (a) {
	if (!a) {
		a = {}
	}
	cO(this, a);
	if (this.parent) {
		this.parentDiv = ge(this.parent)
	} else {
		return
	}
	if (g_user.id == 0 && (!g_cookiesEnabled() || g_getWowheadCookie("announcement-" + this.id) == "closed")) {
		return
	}
	this.initialize()
};
Announcement.prototype = {
	initialize: function () {
		this.parentDiv.style.display = "none";
		if (this.mode === undefined || this.mode == 1) {
			this.parentDiv.className = "announcement announcement-contenttop"
		} else {
			this.parentDiv.className = "announcement announcement-pagetop"
		}
		var f = this.innerDiv = ce("div");
		f.className = "announcement-inner text";
		this.setStyle(this.style);
		var b = null;
		var e = parseInt(this.id);
		if (e >= 0) {
			b = ce("a");
			b.id = "closeannouncement";
			b.href = "javascript:;";
			b.className = "announcement-close";
			if (this.nocookie) {
				b.onclick = this.hide.bind(this)
			} else {
				b.onclick = this.markRead.bind(this)
			}
			ae(f, b);
			g_addTooltip(b, LANG.close)
		}
		if (g_user && (g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU)) > 0 && Math.abs(e) > 0) {
			if (e < 0) {
				b = ce("a");
				b.style.cssFloat = b.style.styleFloat = "right";
				b.href = "/admin=announcements&id=" + Math.abs(e) + "&status=2";
				b.onclick = function () {
					return confirm("Are you sure you want to delete " + this.name + "?")
				};
				ae(b, ct("Delete"));
				var d = ce("small");
				ae(d, b);
				ae(f, d);
				b = ce("a");
				b.style.cssFloat = b.style.styleFloat = "right";
				b.style.marginRight = "10px";
				b.href = "/admin=announcements&id=" + Math.abs(e) + "&status=" + (this.status == 1 ? 0 : 1);
				b.onclick = function () {
					return confirm("Are you sure you want to delete " + this.name + "?")
				};
				ae(b, ct((this.status == 1 ? "Disable" : "Enable")));
				var d = ce("small");
				ae(d, b);
				ae(f, d)
			}
			b = ce("a");
			b.style.cssFloat = b.style.styleFloat = "right";
			b.style.marginRight = "10px";
			b.href = "/admin=announcements&id=" + Math.abs(e) + "&edit";
			ae(b, ct("Edit announcement"));
			var d = ce("small");
			ae(d, b);
			ae(f, d)
		}
		var c = ce("div");
		c.id = this.parent + "-markup";
		ae(f, c);
		ae(this.parentDiv, f);
		ae(f, ce("div", {
			style: {
				clear: "both"
			}
		}));
		this.setText(this.text);
		setTimeout(this.show.bind(this), 500)
	},
	show: function () {
		$(this.parentDiv).animate({
			opacity: "show",
			height: "show"
		},
		{
			duration: 333
		});
		g_trackEvent("Announcements", "Show", "" + this.name)
	},
	hide: function () {
		$(this.parentDiv).animate({
			opacity: "hide",
			height: "hide"
		},
		{
			duration: 200
		})
	},
	markRead: function () {
		g_trackEvent("Announcements", "Close", "" + this.name);
		g_setWowheadCookie("announcement-" + this.id, "closed");
		this.hide()
	},
	setStyle: function (a) {
		this.style = a;
		this.innerDiv.setAttribute("style", a)
	},
	setText: function (a) {
		this.text = a;
		Markup.printHtml(this.text, this.parent + "-markup");
		g_addAnalyticsToNode(ge(this.parent + "-markup"), {
			category: "Announcements",
			actions: {
				"Follow link": function (b) {
					return true
				}
			}
		},
		this.id)
	}
};
