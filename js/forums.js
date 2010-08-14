$(document).ready(function () {
	g_setupChangeWarning($("form[name=newtopic]"), [$("textarea[name=body]"), $("input[name=subject]")], LANG.message_startedpost)
});
var fo_landingOnDiv = false;
var fo_landingTimer = null;
var fo_landingChangeBackground = function (c, a) {
	var b = $("#forum-id" + c);
	b.css("background-position", (a ? "0 -112px" : "0 0"))
};
var fo_landingOverDiv = function (e) {
	var d = $("#forum-id" + e);
	var c = $("#subforum-id" + e);
	if (fo_landingTimer) {
		clearTimeout(fo_landingTimer);
		fo_landingTimer = null
	}
	if (fo_landingOnDiv && fo_landingOnDiv != e) {
		var a = $("#forum-id" + fo_landingOnDiv);
		var b = $("#subforum-id" + fo_landingOnDiv);
		b.hide()
	}
	fo_landingOnDiv = e;
	c.fadeIn("fast")
};
var fo_landingOutDiv = function (a) {
	fo_landingOnDiv = false;
	if (fo_landingTimer) {
		clearTimeout(fo_landingTimer)
	}
	fo_landingTimer = setTimeout(function () {
		$("#subforum-id" + a).fadeOut("fast");
		fo_landingTimer = null
	},
	333)
};
var fo_togglePollPanel = function () {
	var c = $("#wefjskdfjweolk");
	var d = $("#aeowifjslks");
	var b = g_toggleDisplay(d);
	c.toggleClass("disclosure-on", b);
	c.toggleClass("disclosure-off", !b)
};
var fo_numPollOptions = 0;
var fo_addPollOption = function (b) {
	var c = $("#fiasdlkfe");
	var d = $("<tr/>");
	var e = $("<td/>", {
		text: LANG.poll_optionnum.replace("$1", ++fo_numPollOptions)
	});
	d.append(e);
	e = $("<td/>");
	var a = $("<input/>", {
		type: "text",
		val: (b ? b : ""),
		name: "polloption[]"
	});
	e.append(a);
	d.append(e);
	c.append(d)
};

function fo_addPageNavigation(e, d, f, b) {
	var a;
	var c = {
		nItems: e,
		page: d,
		url: b
	};
	if (f == 1) {
		a = 20;
		c.wording = ["fonavpost", "fonavposts"]
	} else {
		a = 50;
		c.wording = ["fonavtopic", "fonavtopics"]
	}
	c.nPages = Math.ceil(e / a);
	g_addPages(ge("nmvnct34cg46"), c);
	g_addPages(ge("nmvnct34cg47"), c)
}
Listview.templates.forumstopic = {
	sort: ["-lastpost"],
	nItemsPerPage: -1,
	hideBands: 1 | 2,
	poundable: 2,
	sortable: false,
	columns: [{
		id: "subject",
		name: LANG.subject,
		align: "left",
		value: "subject",
		compute: function (j, f) {
			var c = ce("div");
			var m = ce("a"),
				b, l;
			m.className = "forums-topicsubject";
			m.href = this.template.getItemLink(j);
			b = ce("span");
			ae(b, ct(j.subject));
			if (j.locked || (j.blog && j.blog != 1)) {
				b.className = "icon-lock";
				l = ce("span");
				ae(l, b);
				b = l
			}
			if (j.sticky) {
				var h = new Date(j.firstpost),
					n = (g_serverTime - h) / 1000;
				b.className = (n < 1209600 ? "icon-bell" : "icon-sticky");
				l = ce("span");
				ae(l, b);
				b = l
			}
			if (j.blog == 1) {
				b.className = "icon-book";
				l = ce("span");
				ae(l, b);
				b = l
			}
			if (j.poll == 1) {
				b.className = "icon-poll";
				l = ce("span");
				ae(l, b);
				b = l
			}
			ae(m, b);
			ae(f, m);
			var o = Math.ceil((j.replies + 1) / 20);
			if (o > 1) {
				var e = ce("div");
				e.className = "forums-topicpages";
				ae(e, ct(LANG.lvboard_pages));
				var d = Math.max(1, o / 4);
				for (var g = 1; g <= 5; ++g) {
					var k;
					if (g == 5) {
						k = o
					} else {
						k = Math.floor(1 + (g - 1) * d)
					}
					if (k > o) {
						break
					}
					m = ce("a");
					m.href = "/forums&topic=" + j.id + (k > 1 ? "." + k : "") + (j.lastpost[1] == k ? "&p=" + j.lastpost[2] : "");
					ae(m, ct("[" + k + "]"));
					ae(e, m);
					if (k == o) {
						break
					}
				}
				ae(f, e)
			}
		}
	},
	{
		id: "author",
		name: LANG.author,
		value: "author",
		compute: function (d, e) {
			var b = ce("a");
			b.href = "/user=" + d.author;
			ae(b, ct(d.author));
			var c;
			if (d.roles) {
				d.user = d.author;
				c = Listview.funcBox.coGetColor(d, 4)
			}
			b.className = (c ? c : "q1");
			ae(e, b)
		}
	},
	{
		id: "replies",
		name: LANG.replies,
		value: "replies"
	},
	{
		id: "views",
		name: LANG.views,
		value: "views"
	},
	{
		id: "lastpost",
		name: LANG.lastpost,
		align: "left",
		value: "lastpost",
		compute: function (e, h) {
			var c = new Date(e.lastpost[0]),
				g = (g_serverTime - c) / 1000;
			h.className = "small";
			h.style.whiteSpace = "nowrap";
			ae(h, ct(LANG.lvboard_by));
			var b = ce("a");
			b.href = "/user=" + e.lastpost[3];
			b.style.fontWeight = "bold";
			if (e.lastpost[4]) {
				var d;
				e.user = e.lastpost[3];
				var f = e.roles;
				e.roles = e.lastpost[4];
				d = Listview.funcBox.coGetColor(e, 4);
				e.roles = f;
				if (d) {
					b.className = d
				}
			}
			ae(b, ct(e.lastpost[3]));
			ae(h, b);
			ae(h, ct(" "));
			b = ce("a");
			Listview.funcBox.coFormatDate(b, g, c);
			b.style.cursor = "pointer";
			b.className += " q1 icon-arrowrightbullet-right";
			b.href = "/forums&topic=" + e.id + (e.lastpost[1] > 1 ? "." + e.lastpost[1] : "") + "&p=" + e.lastpost[2] + "#p" + e.lastpost[2];
			ae(h, b)
		},
		sortFunc: function (d, c) {
			var e = strcmp(d.sticky, c.sticky);
			if (e != 0) {
				return e
			}
			if (d.sticky) {
				return -strcmp(d.id, c.id)
			} else {
				return strcmp(d.lastpost[2], c.lastpost[2])
			}
		}
	}],
	getItemLink: function (a) {
		return "/forums&topic=" + a.id + (a.lastpost[1] == 1 ? "&p=" + a.lastpost[2] : "")
	}
};
Listview.templates.forumspost = {
	sort: [],
	mode: 2,
	nItemsPerPage: -1,
	hideBands: 1 | 2,
	poundable: 2,
	columns: [],
	compute: function (p, W, V) {
		var e = (g_user.roles & U_GROUP_MODERATOR) != 0,
			K = e || (g_pageInfo.locked == 0 && p.user.toLowerCase() == g_user.name.toLowerCase() && !g_user.forumban),
			C = K && !p.op,
			Y = 0,
			x = g_users[p.user],
			c = 0,
			h = 0,
			X = 0,
			v = null;
		if (V == 0) {
			W.style.paddingTop = "6px"
		}
		if (g_pageInfo.blog && p.op && (g_user.roles & U_GROUP_MODERATOR)) {
			K = true
		}
		if (x != null) {
			if (g_customColors[p.user]) {
				v = g_customColors[p.user]
			} else {
				if (x.roles & U_GROUP_ADMIN) {
					c = 1
				} else {
					if (x.roles & U_GROUP_GREEN_TEXT) {
						h = 1
					} else {
						if (x.roles & U_GROUP_VIP) {
							X = 1
						}
					}
				}
			}
			if (!g_pageInfo.blog || !p.op) {
				Y = 1
			}
		}
		var U = ce("div");
		var g = ce("div");
		var o = ce("div");
		var q = ce("em");
		var t = ce("div");
		p.divPost = o;
		p.divLinks = q;
		p.divBody = t;
		U.className = "forums-post-wrapper";
		U.id = "p" + p.id;
		g.className = "forums-post-container forums-post-container" + (V % 2);
		if (!this.blog) {
			var y = ce("div");
			y.className = "forums-post-userinfo";
			if (x != null && x.avatar) {
				ae(y, Icon.createUser(x.avatar, x.avatarmore, 2, null, ((x.roles & U_GROUP_PREMIUM) && !(x.border))))
			}
			var S = ce("p");
			var R = ce("a");
			R.href = "/user=" + p.user;
			ae(R, ct(p.user));
			ae(S, R);
			if (x != null && !x.title && (x.roles & U_GROUP_PREMIUM)) {
				x.title = LANG.premium_title
			}
			if (x != null && x.title != null) {
				ae(S, ce("br"));
				ae(S, ct("<" + x.title + ">"))
			}
			var P = ce("p");
			if (x != null) {
				ae(P, ct(LANG.lvtopic_joined));
				var I = ce("span");
				var m = new Date(x.joined),
					Q = (g_serverTime - m) / 1000;
				Listview.funcBox.coFormatDate(I, Q, m);
				ae(P, I);
				ae(P, ce("br"));
				ae(P, ct(LANG.lvtopic_posts + number_format(x.posts)));
				if (x.roles > 0) {
					var J = 0;
					for (var T = 1; T <= 32; ++T) {
						if (x.roles & (1 << (T - 1))) {
							++J
						}
					}
					if (J > 0) {
						ae(P, ce("br"));
						ae(P, ct((J != 1 ? LANG.lvtopic_roles : LANG.lvtopic_role)));
						J = 0;
						for (var T = 1; T <= 32; ++T) {
							if (x.roles & (1 << (T - 1))) {
								if (J++>0) {
									ae(P, ct(LANG.comma))
								}
								if (T == 9) {
									if (!g_user.premium) {
										var G = ce("a");
										ae(G, ct(g_user_roles[T]));
										G.href = "/premium";
										ae(P, G)
									} else {
										ae(P, ct(g_user_roles[T]))
									}
								} else {
									ae(P, ct(g_user_roles[T]))
								}
							}
						}
					}
				}
				ae(S, P)
			}
			ae(y, S);
			ae(g, y)
		}
		o.className = "forums-post";
		if (this.blog) {
			o.className += " forums-post-blog"
		}
		var d = ce("p");
		d.className = "forums-post-dateline";
		var E = 0;
		if (K) {
			var b = ce("span");
			var H = ce("a");
			if (g_pageInfo.blog && p.op) {
				H.href = "/edit=blog&id=" + g_pageInfo.topic
			} else {
				H.href = "javascript:;";
				H.onclick = Listview.funcBox.coEdit.bind(this, p, -1)
			}
			ae(H, ct(LANG.lvtopic_edit));
			ae(b, H);
			ae(q, b);
			E = 1
		}
		if (C) {
			var r = ce("span");
			if (E) {
				ae(r, ct("|"))
			}
			var w = ce("a");
			w.href = "javascript:;";
			w.onclick = Listview.funcBox.foDelete.bind(this, p);
			ae(w, ct(LANG.lvtopic_delete));
			ae(r, w);
			ae(q, r);
			E = 1
		}
		if (Y) {
			var D = ce("span");
			if (E) {
				ae(D, ct("|"))
			}
			var l = ce("a");
			ae(l, ct(LANG.lvcomment_report));
			if (p.op && g_pageInfo) {
				p.sticky = g_pageInfo.sticky
			}
			l.onclick = ContactTool.show.bind(ContactTool, {
				mode: 2,
				post: p
			});
			l.className = "icon-report";
			l.href = "javascript:;";
			g_addTooltip(l, LANG.report_tooltip, "q2");
			ae(D, l);
			ae(q, D);
			E = 1
		}
		if ((g_pageInfo.locked == 0 && !g_user.forumban) || e) {
			if (!g_pageInfo.blog || (g_pageInfo.blog && !p.op)) {
				var M = ce("span");
				if (E) {
					ae(M, ct("|"))
				}
				var O = ce("a");
				if (g_user.id > 0) {
					O.href = "javascript:;";
					O.onclick = fo_goToNewPost.bind(O, 1, p)
				} else {
					O.href = "/account=signin"
				}
				ae(O, ct(LANG.lvtopic_quote));
				ae(M, O);
				ae(q, M);
				E = 1
			}
			var k = ce("span");
			if (E) {
				ae(k, ct("|"))
			}
			var n = ce("a");
			if (g_user.id > 0) {
				n.onclick = fo_goToNewPost.bind(n, 1);
				n.href = "#post-reply"
			} else {
				n.href = "/account=signin"
			}
			ae(n, ct(LANG.lvtopic_reply));
			ae(k, n);
			ae(q, k)
		}
		ae(d, q);
		var u = ce("var");
		ae(u, ct(LANG.lvtopic_by));
		R = ce("a");
		R.href = "/user=" + p.user;
		ae(R, ct(p.user));
		ae(u, R);
		ae(u, ct(" "));
		var a = ce("a");
		a.className = "q0";
		a.href = "#p" + p.id;
		var A = new Date(p.date),
			Q = (g_serverTime - A) / 1000;
		Listview.funcBox.coFormatDate(a, Q, A, 1);
		ae(u, a);
		ae(u, ct(sprintf(LANG.lvcomment_patch, g_getPatchVersion(A))));
		if (this.blog && x != null && x.avatar) {
			var f = Icon.createUser(x.avatar, x.avatarmore, 0, null, ((x.roles & U_GROUP_PREMIUM) && !(x.border)));
			f.style.marginRight = "3px";
			f.style.cssFloat = f.style.styleFloat = "left";
			ae(d, f);
			u.style.lineHeight = "26px"
		}
		ae(d, u);
		ae(o, d);
		t.className = "forums-post-body text";
		if (v) {
			t.className += " comment-" + v
		} else {
			if (c) {
				t.className += " comment-blue"
			} else {
				if (h) {
					t.className += " comment-green"
				} else {
					if (X) {
						t.className += " comment-gold"
					}
				}
			}
		}
		var L = Markup.CLASS_USER;
		if (x && x.roles) {
			L = Markup.rolesToClass(x.roles)
		}
		if (g_pageInfo.blog && p.op && L != Markup.CLASS_ADMIN) {
			L = Markup.CLASS_STAFF
		}
		t.innerHTML = Markup.toHtml(p.body, {
			allow: L,
			roles: x ? x.roles : null,
			uid: p.id
		});
		ae(o, t);
		var z = ce("div");
		z.className = "forums-post-body text";
		if (p.response) {
			z.innerHTML = Markup.toHtml("[div][/div][wowheadresponse=" + p.responseuser + " roles=" + p.responseroles + "]" + p.response + "[/wowheadresponse]", {
				allow: Markup.CLASS_STAFF,
				roles: p.responseroles,
				uid: "resp-" + p.id
			})
		}
		ae(o, z);
		p.divResponse = z;
		if (x == null || !(x.roles & U_GROUP_STAFF) || (g_user.roles & U_GROUP_STAFF)) {
			var N = ce("div");
			p.divLastEdit = N;
			N.className = "comment-lastedit";
			ae(N, ct(LANG.lvtopic_lastedit));
			var s = ce("a");
			ae(s, ct(" "));
			ae(N, s);
			ae(N, ct(" "));
			var I = ce("span");
			ae(N, I);
			ae(N, ct(" "));
			ae(o, N);
			Listview.funcBox.coUpdateLastEdit(p)
		}
		if (!this.blog && x != null && x.sig != null) {
			var B = ce("div");
			B.className = "forums-post-sig";
			if (v) {
				B.className += " comment-" + v
			} else {
				if (c) {
					B.className += " comment-blue"
				} else {
					if (h) {
						B.className += " comment-green"
					} else {
						if (X) {
							B.className += " comment-gold"
						}
					}
				}
			}
			B.innerHTML = Markup.toHtml(x.sig, {
				allow: L,
				mode: Markup.MODE_SIGNATURE,
				uid: (p.id + "-sig")
			});
			ae(o, B)
		}
		ae(g, o);
		var F = ce("div");
		F.className = "clear";
		ae(g, F);
		ae(U, g);
		ae(W, U)
	},
	onAfterCreate: function (l) {
		if (!this.poll) {
			return
		}
		var e = $(this.mainDiv);
		var a = $("<div/>", {
			css: {
				"padding-top": "6px"
			}
		});
		var k = $("<div/>", {
			id: "pollinfo",
			className: "forums-post-wrapper"
		});
		var q = $("<div/>", {
			className: "forums-post-container forums-post-container1 forums-poll",
			css: {
				padding: "8px 10px"
			}
		});
		var b = ["rep0", "rep1", "rep2", "rep3", "rep4", "rep5", "rep6", "rep7", "ach0", "ach1", "green", "yellow", "red"];
		var n = function () {
			this.poll.resultsTable.before(this.poll.voteTable);
			this.poll.resultsTable.detach()
		};
		var p = function () {
			this.poll.voteTable.before(this.poll.resultsTable);
			this.poll.voteTable.detach()
		};
		var h = function () {
			var v = $("<table/>", {
				className: "grid"
			});
			var w = $("<tr/>");
			var x = $("<th/>", {
				colspan: 4
			});
			if ((g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU)) > 0) {
				x.append($("<a/>", {
					css: {
						"float": "right"
					},
					text: LANG.compose_edit,
					href: "javascript:;",
					click: function () {
						(d.bind(this))(this.poll.resultsTable)
					}.bind(this)
				}))
			}
			x.append($("<span/>", {
				text: LANG.poll_pollresults + this.poll.question
			}));
			w.append(x);
			v.append(w);
			var t = 0;
			for (var s = 0; s < this.poll.options.length; ++s) {
				t += this.poll.options[s][2]
			}
			for (var s = 0; s < this.poll.options.length; ++s) {
				var r = this.poll.options[s];
				w = $("<tr/>");
				x = $("<td/>", {
					text: r[1]
				});
				w.append(x);
				x = $("<td/>", {
					id: "pollresultnum" + r[0],
					text: r[2]
				});
				w.append(x);
				x = $("<td/>", {
					id: "pollresultbar" + r[0]
				});
				var u = $(g_createProgressBar({
					width: (t > 0 ? Math.floor((r[2] / t) * 100) : 0),
					color: b[r[0] % b.length]
				}));
				x.append(u);
				w.append(x);
				x = $("<td/>", {
					id: "pollresultpct" + r[0],
					text: (t > 0 ? ((r[2] / t) * 100).toFixed(1) : 0) + "%"
				});
				w.append(x);
				if (isset("fo_pollVotes") && $.inArray(r[0], fo_pollVotes) != -1) {
					$("td", w).addClass("forums-poll-voted")
				}
				v.append(w)
			}
			if (!g_user.forumban && g_user.id > 0) {
				w = $("<tr/>");
				x = $("<td/>", {
					colspan: 4
				});
				x.append($("<a/>", {
					text: LANG.poll_returntovoting,
					href: "javascript:;",
					click: n.bind(this)
				}));
				w.append(x);
				v.append(w)
			}
			return v
		};
		var d = function (u) {
			var w = $("<form/>", {
				method: "post",
				action: "/forums=editpoll&poll=" + g_pageInfo.topic
			});
			var v = $("<table/>", {
				className: "grid"
			});
			var x = $("<tr/>");
			var y = $("<td/>", {
				text: LANG.poll_question
			});
			y.append($("<input/>", {
				size: 40,
				type: "text",
				name: "question",
				val: this.poll.question
			}));
			x.append(y);
			v.append(x);
			for (var t = 0; t < this.poll.options.length; ++t) {
				var s = this.poll.options[t];
				x = $("<tr/>");
				y = $("<td/>");
				y.append($("<input/>", {
					type: "text",
					name: "polloption" + s[0],
					val: s[1]
				}));
				var r = $("<a/>", {
					href: "javascript:;",
					text: LANG.button_delete,
					css: {
						"padding-left": "15px"
					},
					click: function () {
						this.detach()
					}.bind(x)
				});
				y.append(r);
				x.append(y);
				v.append(x)
			}
			x = $("<tr/>");
			y = $("<td/>");
			var r = $("<a/>", {
				href: "javascript:;",
				text: LANG.poll_addoption,
				click: function () {
					var z = $("<tr/>");
					var A = $("<td/>");
					A.append($("<input/>", {
						type: "text",
						name: "newoptions[]"
					}));
					var i = $("<a/>", {
						href: "javascript:;",
						text: LANG.button_delete,
						css: {
							"padding-left": "15px"
						},
						click: function () {
							this.detach()
						}.bind(z)
					});
					A.append(i);
					z.append(A);
					this.before(z)
				}.bind(x)
			});
			y.append(r);
			x.append(y);
			v.append(x);
			x = $("<tr/>");
			y = $("<td/>");
			y.append($("<input/>", {
				type: "checkbox",
				name: "allowmultiple",
				id: "editpoll-multiple",
				checked: this.poll.multiple
			}));
			y.append($("<label/>", {
				"for": "editpoll-multiple",
				text: LANG.poll_allowmultiple
			}));
			if (this.poll.multiple) {
				y.append($("<span/>", {
					css: {
						"padding-left": "15px"
					},
					className: "q10",
					text: "WARNING: Changing this will invalidate existing votes!"
				}))
			}
			x.append(y);
			v.append(x);
			x = $("<tr/>");
			y = $("<td/>");
			y.append($("<input/>", {
				type: "submit",
				name: "edit",
				value: LANG.compose_save
			}));
			y.append($("<a/>", {
				css: {
					"padding-left": "15px"
				},
				href: "javascript:;",
				text: LANG.compose_cancel,
				click: function () {
					w.before(u);
					w.detach()
				}
			}));
			x.append(y);
			v.append(x);
			w.append(v);
			u.before(w);
			u.detach()
		};
		var o = $("<table/>", {
			className: "grid"
		});
		var j = $("<tr/>");
		var f = $("<th/>");
		if ((g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU)) > 0) {
			f.append($("<a/>", {
				css: {
					"float": "right"
				},
				text: LANG.compose_edit,
				href: "javascript:;",
				click: function () {
					(d.bind(this))(this.poll.voteTable)
				}.bind(this)
			}))
		}
		f.append($("<span/>", {
			text: this.poll.question
		}));
		j.append(f);
		o.append(j);
		for (var g = 0; g < this.poll.options.length; ++g) {
			var c = this.poll.options[g];
			j = $("<tr/>");
			f = $("<td/>");
			if (this.poll.multiple) {
				var m = $("<input/>", {
					type: "checkbox",
					name: "polloption" + c[0],
					id: "polloption" + c[0],
					value: c[0]
				})
			} else {
				var m = $("<input/>", {
					type: "radio",
					name: "polloption",
					value: c[0],
					id: "polloption" + c[0],
					value: c[0]
				})
			}
			f.append(m);
			f.append($("<label/>", {
				"for": "polloption" + c[0],
				text: c[1]
			}));
			j.append(f);
			o.append(j)
		}
		j = $("<tr/>");
		f = $("<td/>");
		m = $("<button/>", {
			type: "button",
			text: LANG.poll_vote
		});
		m.click(function (u) {
			u.preventDefault();
			var t = [];
			if (this.poll.multiple) {
				var s = $("input:checkbox:checked")
			} else {
				var s = $("input:radio:checked")
			}
			for (var r = 0; r < s.length; ++r) {
				t.push(parseInt(s[r].value, 10))
			}
			if (t.length > 0) {
				$.ajax({
					url: "/forums=pollvote&poll=" + g_pageInfo.topic + "&options=" + t.join(","),
					type: "GET",
					success: function (w) {
						if (w == 1) {
							for (var v = 0; v < this.poll.options.length; ++v) {
								if (isset("fo_pollVotes") && $.inArray(this.poll.options[v][0], fo_pollVotes) != -1) {
									this.poll.options[v][2]--
								}
								if ($.inArray(this.poll.options[v][0], t) != -1) {
									this.poll.options[v][2]++
								}
							}
							fo_pollVotes = t;
							this.poll.resultsTable = (h.bind(this))();
							(p.bind(this))()
						}
					}.bind(this)
				})
			}
		}.bind(this));
		f.append(m);
		f.append($("<a/>", {
			css: {
				"padding-left": "15px"
			},
			text: LANG.poll_viewresults,
			href: "javascript:;",
			click: p.bind(this)
		}));
		j.append(f);
		o.append(j);
		this.poll.voteTable = o;
		o = (h.bind(this))();
		this.poll.resultsTable = o;
		if (g_user.id > 0 && !g_user.forumban && (!isset("fo_pollVotes") || fo_pollVotes.length == 0)) {
			this.poll.currentTable = this.poll.voteTable
		} else {
			this.poll.currentTable = this.poll.resultsTable
		}
		q.append(this.poll.currentTable);
		k.append(q);
		a.append(k);
		e.children().first().css("padding-top", "0");
		e.prepend(a)
	}
};
Listview.templates.forumpostpreview = {
	sort: [3],
	nItemsPerPage: 75,
	columns: [{
		id: "subject",
		name: LANG.subject,
		align: "left",
		value: "subject",
		compute: function (c, f) {
			var b = ce("a");
			b.style.fontFamily = "Verdana, sans-serif";
			if (c.blog) {
				$(b).addClass("icon-book")
			}
			b.href = this.template.getItemLink(c);
			ae(b, ct(c.subject));
			ae(f, b);
			var e = ce("div");
			e.className = "small";
			b = ce("a");
			b.className = "q1";
			b.href = "/forums&board=" + c.board;
			ae(b, ct(LANG.foboards[c.board]));
			ae(e, b);
			ae(f, e)
		}
	},
	{
		id: "preview",
		name: LANG.preview,
		align: "left",
		width: "50%",
		value: "preview",
		compute: function (c, f) {
			var e = ce("div");
			e.className = "crop";
			ae(e, ct(Markup.removeTags(c.preview, {
				mode: Markup.MODE_ARTICLE,
				uid: c.id
			})));
			ae(f, e);
			if (c.user) {
				e = ce("div");
				e.className = "small3";
				ae(e, ct(LANG.lvtopic_by));
				var b = ce("a");
				b.href = "/user=" + c.user;
				ae(b, ct(c.user));
				ae(e, b);
				ae(f, e)
			}
		}
	},
	{
		id: "posted",
		name: LANG.posted,
		width: "16%",
		value: "elapsed",
		compute: function (b, e) {
			var a = new Date(b.date),
				d = (g_serverTime - a) / 1000;
			var c = ce("span");
			Listview.funcBox.coFormatDate(c, d, a, 0, 1);
			ae(e, c)
		}
	}],
	getItemLink: function (a) {
		if (a.offset) {
			var b = Math.ceil((a.offset + (a.blog ? 0 : 1)) / 20);
			if (a.blog) {
				return "/blog=" + a.topic + (b > 1 ? "." + b : "") + "#p" + a.id
			} else {
				return "/forums&topic=" + a.topic + (b > 1 ? "." + b : "") + "#p" + a.id
			}
		} else {
			if (a.blog) {
				return "/blog=" + a.topic
			} else {
				return "/forums&topic=" + a.topic
			}
		}
	}
};
Listview.funcBox.foDelete = function (a) {
	if (confirm(LANG.confirm_deletepost)) {
		new Ajax("/forums=deletepost&id=" + a.id);
		this.deleteRows([a]);
		alert(LANG.message_postdeleted + " " + LANG.message_allow5min)
	}
};
Listview.funcBox.beforeTopics = function () {
	function a(g, f, h, e) {
		var d = this.getCheckedRows();
		if (!d.length) {
			alert("No topics selected.")
		} else {
			if (g == null || confirm("Are you sure you want to " + g + " " + (d.length == 1 ? "this topic" : "these " + d.length + " topics") + "?")) {
				var b = "",
					c = 0;
				array_walk(d, function (i) {
					if (e == null || e(i)) {
						b += i.id + ",";
						++c
					}
				});
				b = rtrim(b, ",");
				if (b != "") {
					new Ajax("/forums=" + f + "&id=" + b);
					if (h) {
						this.deleteRows(d)
					}
				}
				alert(c + " topic" + (c == 1 ? "" : "s") + " affected." + (c > 0 ? "\n\nPlease allow up to 5 minutes for this to take effect." : ""));
				(Listview.cbSelect.bind(this, false))()
			}
		}
	}
	if (g_user.roles & U_GROUP_MODERATOR) {
		this.mode = 1;
		this.hideBands = null;
		this.createCbControls = function (j) {
			var e = ce("input"),
				h = ce("input"),
				c = ce("input"),
				g = ce("input"),
				i = ce("select");
			e.type = h.type = c.type = g.type = "button";
			e.value = "Delete";
			h.value = "Rename";
			c.value = "Lock";
			g.value = "Unlock";
			e.onclick = a.bind(this, "delete", "deletetopic&deleted=1", 1, function (d) {
				if (!d.blog || (g_user.roles & U_GROUP_ADMIN)) {
					return 1
				}
			});
			c.onclick = a.bind(this, "lock", "locktopic&locked=1", 0, function (d) {
				if ((!d.blog || (g_user.roles & U_GROUP_ADMIN)) && !d.locked) {
					d.locked = 1;
					return 1
				}
			});
			g.onclick = a.bind(this, "unlock", "locktopic&locked=0", 0, function (d) {
				if ((!d.blog || (g_user.roles & U_GROUP_ADMIN)) && d.locked) {
					d.locked = null;
					return 1
				}
			});
			h.onclick = (function () {
				var d = this.getCheckedRows();
				if (!d.length) {
					alert("You might want to pick a topic to rename.")
				} else {
					if (d.length > 1) {
						alert("You may only rename one topic at a time.")
					} else {
						fo_RenameTopic2(d[0].subject, d[0].id)
					}
				} (Listview.cbSelect.bind(this, false))()
			}).bind(this);
			i.onchange = (function (l) {
				var d = l.options[l.selectedIndex].value;
				l.selectedIndex = 0;
				(a.bind(this, "move", "movetopic&board=" + d, 1, function (m) {
					return 1
				}))()
			}).bind(this, i);
			var f = ce("option");
			ae(f, ct("Move to..."));
			f.style.color = "#bbbbbb";
			ae(i, f);
			fo_addOptBoards(i, mn_forums, g_pageInfo.board);
			ae(j, e);
			ae(j, h);
			ae(j, c);
			ae(j, g);
			var k = ce("input"),
				b = ce("input");
			k.type = b.type = "button";
			k.value = "Stick";
			b.value = "Unstick";
			k.onclick = a.bind(this, "stick", "sticktopic&sticky=1", 0, function (d) {
				if ((!d.blog || (g_user.roles & U_GROUP_ADMIN)) && !d.sticky) {
					d.sticky = 1;
					return 1
				}
			});
			b.onclick = a.bind(this, "unstick", "sticktopic&sticky=0", 0, function (d) {
				if ((!d.blog || (g_user.roles & U_GROUP_ADMIN)) && d.sticky) {
					d.sticky = null;
					return 1
				}
			});
			ae(j, k);
			ae(j, b);
			ae(j, i)
		}
	}
};

function fo_addOptBoards(h, b, c, d, j) {
	for (var e = 0, f = b.length; e < f; ++e) {
		if (b[e][0] == null) {
			continue
		}
		if (j && b[e][4] && b[e][4].requiredAccess) {
			continue
		}
		if (b[e][4] && b[e][4].requiredAccess && !(g_user.roles & b[e][4].requiredAccess)) {
			continue
		}
		if (b[e][3] != null) {
			var g = ce("optgroup");
			g.label = b[e][1];
			fo_addOptBoards(g, b[e][3], c, d);
			ae(h, g)
		} else {
			if (b[e][0] != c) {
				var a = ce("option");
				a.value = b[e][0];
				if (b[e][0] == d) {
					a.selected = true
				}
				ae(a, ct(b[e][1]));
				ae(h, a)
			}
		}
	}
}
function fo_getForumPath(f, d, b) {
	if (!b) {
		b = "3,3,"
	}
	for (var c = 0, a = f.length; c < a; ++c) {
		if (f[c][0] == null) {
			continue
		}
		if (f[c][3] != null) {
			var e = fo_getForumPath(f[c][3], d, b + f[c][0] + ",");
			if (e) {
				return e
			}
		} else {
			if (f[c][0] == d) {
				return b + f[c][0]
			}
		}
	}
}
function fo_validateForm(c, d) {
	if (d == 0) {
		var b = c.elements.subject;
		if (trim(b.value).length < 1) {
			alert(LANG.message_topicsubject);
			b.focus();
			return false
		}
	}
	var a = c.elements.body;
	if (!Listview.funcBox.coValidate(a, d)) {
		return false
	}
	if (!g_requireCaptcha()) {
		return true
	}
	if (c.elements.captcha.value.length == 5) {
		return true
	} else {
		alert(LANG.message_codenotentered);
		c.elements.captcha.focus();
		return false
	}
	return true
}
function fo_goToNewPost(d, b) {
	var c = document.forms.newtopic;
	if (this.href == "javascript:;") {
		if (d == 0) {
			location.replace("#new-topic")
		} else {
			location.replace("#post-reply")
		}
	}
	if (c) {
		var a = gE(c, "textarea")[0];
		if (d == 1 && b != null && b.user != null && b.body != null) {
			a.value += "[quote " + b.user + "]" + b.body + "[/quote]\n\n";
			g_setCaretPosition(a, a.value.length)
		}
		setTimeout((function () {
			this.focus()
		}).bind(a), 25)
	}
}
function fo_RenameTopic() {
	var a = fo_RenameTopic2(g_pageInfo.subject, g_pageInfo.topic);
	if (a != "") {
		g_pageInfo.subject = a
	}
}
function fo_RenameTopic2(b, a) {
	var c = prompt(LANG.prompt_renametopic, b);
	if (c != null) {
		c = trim(c);
		if (c.length >= 1) {
			if (c.length >= 100) {
				alert(LANG.message_subjectlimit)
			} else {
				if (c != b) {
					new Ajax("/forums=renametopic&id=" + a, {
						method: "POST",
						params: "subject=" + urlencode(c),
						onSuccess: function () {
							location.reload(true)
						}
					});
					return c
				}
			}
		}
	}
	return ""
}
function fo_LockTopic(a) {
	a = a ? 0 : 1;
	if (confirm(a ? "Are you sure you want to lock this topic?" : "Are you sure you want to unlock this topic?")) {
		new Ajax("/forums=locktopic&locked=" + a + "&id=" + g_pageInfo.topic, {
			onSuccess: function () {
				location.reload(true)
			}
		})
	}
}
function fo_DeleteTopic(a) {
	a = a ? 0 : 1;
	if (confirm(a ? "Are you sure you want to delete this topic?" : "Are you sure you want to undelete this topic?")) {
		new Ajax("/forums=deletetopic&deleted=" + a + "&id=" + g_pageInfo.topic, {
			onSuccess: function () {
				location.reload(true)
			}
		})
	}
}
function fo_StickyTopic(a) {
	a = a ? 0 : 1;
	if (confirm(a ? "Are you sure you want to stick this topic?" : "Are you sure you want to unstick this topic?")) {
		new Ajax("/forums=sticktopic&sticky=" + a + "&id=" + g_pageInfo.topic, {
			onSuccess: function () {
				location.reload(true)
			}
		})
	}
}
function fo_MoveTopic(c) {
	if (!c.selectedIndex) {
		return
	}
	var b = c.options[c.selectedIndex];
	if (confirm("Are you sure you want to move this topic to " + b.text + "?")) {
		new Ajax("/forums=movetopic&board=" + b.value + "&id=" + g_pageInfo.topic, {
			onSuccess: function () {
				location.reload(true)
			}
		});
		PageTemplate.set({
			breadcrumb: fo_getForumPath(mn_forums, b.value).split(",")
		});
		ee(c);
		var a = ce("option");
		ae(a, ct("Move to..."));
		a.style.color = "#bbbbbb";
		ae(c, a);
		fo_addOptBoards(c, mn_forums, b.value)
	}
	c.selectedIndex = 0
};