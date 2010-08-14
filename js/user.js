function us_isOwnProfile() {
	return (typeof g_pageInfo == "object" && g_user.name == g_pageInfo.username)
}
function us_addDescription() {
	var e = ge("description");
	var c = us_isOwnProfile();
	var f = (e.childNodes.length == 0);
	if (f) {
		if (c) {
			ae(e, ct(LANG.user_nodescription2))
		} else {
			ae(e, ct(LANG.user_nodescription))
		}
	}
	if (c) {
		var a = ce("button"),
			g = ce("div");
		g.className = "pad";
		a.onclick = function () {
			location.href = "/account#community"
		};
		if (f) {
			ae(a, ct(LANG.user_composeone))
		} else {
			ae(a, ct(LANG.user_editdescription))
		}
		ae(e, g);
		ae(e, a)
	}
}
function us_addCharactersTab(e) {
	var c = (us_isOwnProfile() || g_user.roles & U_GROUP_MODERATOR);
	if (!c) {
		var b = [];
		for (var d = 0, a = e.length; d < a; ++d) {
			if (e[d].published && !e[d].deleted) {
				b.push(e[d])
			}
		}
		e = b
	}
	if (e.length) {
		new Listview({
			template: "profile",
			id: "characters",
			name: LANG.tab_characters,
			tabs: tabsRelated,
			parent: "lkljbjkb574",
			onBeforeCreate: Listview.funcBox.beforeUserCharacters,
			sort: [-11],
			visibleCols: ["race", "classs", "level", "talents", "gearscore", "achievementpoints"],
			data: e
		})
	}
}
function us_addProfilesTab(e) {
	var c = (us_isOwnProfile() || g_user.roles & U_GROUP_MODERATOR);
	if (!c) {
		var b = [];
		for (var d = 0, a = e.length; d < a; ++d) {
			if (e[d].published && !e[d].deleted) {
				b.push(e[d])
			}
		}
		e = b
	}
	if (e.length) {
		new Listview({
			template: "profile",
			id: "profiles",
			name: LANG.tab_profiles,
			tabs: tabsRelated,
			parent: "lkljbjkb574",
			onBeforeCreate: Listview.funcBox.beforeUserProfiles,
			sort: [-11],
			visibleCols: ["race", "classs", "level", "talents", "gearscore"],
			hiddenCols: ["location", "guild"],
			data: e
		})
	}
}
Listview.funcBox.beforeUserComments = function () {
	if (g_user.roles & U_GROUP_COMMENTS_MODERATOR) {
		this.mode = 1;
		this.createCbControls = function (b) {
			var a = ce("input");
			a.type = "button";
			a.value = "Delete";
			a.onclick = (function () {
				var e = this.getCheckedRows();
				if (!e.length) {
					alert("No comments selected.")
				} else {
					if (confirm("Are you sure that you want to delete " + (e.length == 1 ? "this comment" : "these " + e.length + " comments") + "?")) {
						var c = "";
						var d = 0;
						array_walk(e, function (f) {
							if (!f.purged && !f.deleted) {
								f.deleted = 1;
								if (f.__tr != null) {
									f.__tr.__status.innerHTML = " (Deleted)"
								}
								c += f.id + ","
							} else {
								if (f.purged == 1) {
									++d
								}
							}
						});
						c = rtrim(c, ",");
						if (c != "") {
							new Ajax("/comment=delete&id=" + c + "&username=" + g_pageInfo.username)
						} (Listview.cbSelect.bind(this, false))();
						if (d > 0) {
							alert("Purged comments cannot be deleted.\n\nA purged comment is a comment that has been\nautomatically removed from the site due to a negative rating.")
						}
					}
				}
			}).bind(this);
			ae(b, a);
			var a = ce("input");
			a.type = "button";
			a.value = "Undelete";
			a.onclick = (function () {
				var d = this.getCheckedRows();
				if (!d.length) {
					alert("No comments selected.")
				} else {
					var c = "";
					array_walk(d, function (e) {
						if (e.deleted) {
							e.deleted = 0;
							if (e.__tr != null) {
								e.__tr.__status.innerHTML = ""
							}
							c += e.id + ","
						}
					});
					c = rtrim(c, ",");
					if (c != "") {
						new Ajax("/comment=undelete&id=" + c + "&username=" + g_pageInfo.username)
					} (Listview.cbSelect.bind(this, false))()
				}
			}).bind(this);
			ae(b, a)
		}
	}
};
Listview.funcBox.beforeUserCharacters = function () {
	if (us_isOwnProfile()) {
		this.mode = 1;
		this.createCbControls = function (c, b) {
			if (!b && this.data.length < 15) {
				return
			}
			var a = ce("input");
			a.type = "button";
			a.value = LANG.button_remove;
			a.onclick = (function () {
				var e = this.getCheckedRows();
				if (!e.length) {
					alert(LANG.message_nocharacterselected)
				} else {
					if (confirm(LANG.confirm_unlinkcharacter)) {
						var d = "";
						array_walk(e, function (f) {
							d += f.id + ","
						});
						d = rtrim(d, ",");
						if (d != "") {
							new Ajax("/profile=unlink&id=" + d)
						}
						this.deleteRows(e)
					}
				}
			}).bind(this);
			ae(c, a);
			var a = ce("input");
			a.type = "button";
			a.value = LANG.button_makepub;
			a.onclick = (function () {
				var e = this.getCheckedRows();
				if (!e.length) {
					alert(LANG.message_noprofileselected)
				} else {
					if (confirm(LANG.confirm_publicprofile)) {
						var d = "";
						array_walk(e, function (f) {
							if (!f.published) {
								f.published = 1;
								if (f.__tr != null) {
									f.__tr.__status.innerHTML = ""
								}
								d += f.id + ","
							}
						});
						d = rtrim(d, ",");
						if (d != "") {
							new Ajax("/profile=public&id=" + d + "&bookmarked")
						} (Listview.cbSelect.bind(this, false))()
					}
				}
			}).bind(this);
			ae(c, a);
			var a = ce("input");
			a.type = "button";
			a.value = LANG.button_makepriv;
			a.onclick = (function () {
				var e = this.getCheckedRows();
				if (!e.length) {
					alert(LANG.message_noprofileselected)
				} else {
					if (confirm(LANG.confirm_privateprofile)) {
						var d = "";
						array_walk(e, function (f) {
							if (f.published) {
								f.published = 0;
								if (f.__tr != null) {
									f.__tr.__status.innerHTML = LANG.privateprofile
								}
								d += f.id + ","
							}
						});
						d = rtrim(d, ",");
						if (d != "") {
							new Ajax("/profile=private&id=" + d + "&bookmarked")
						} (Listview.cbSelect.bind(this, false))()
					}
				}
			}).bind(this);
			ae(c, a);
			if (g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU)) {
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
};
Listview.funcBox.beforeUserProfiles = function () {
	if (us_isOwnProfile()) {
		this.mode = 1;
		this.createCbControls = function (c, b) {
			if (!b && this.data.length < 15) {
				return
			}
			var a = ce("input");
			a.type = "button";
			a.value = LANG.button_new;
			a.onclick = function () {
				document.location.href = "/profile&new"
			};
			ae(c, a);
			var a = ce("input");
			a.type = "button";
			a.value = LANG.button_delete;
			a.onclick = (function () {
				var e = this.getCheckedRows();
				if (!e.length) {
					alert(LANG.message_noprofileselected)
				} else {
					if (confirm(LANG.confirm_deleteprofile)) {
						var d = "";
						array_walk(e, function (f) {
							d += f.id + ","
						});
						d = rtrim(d, ",");
						if (d != "") {
							new Ajax("/profile=delete&id=" + d)
						}
						this.deleteRows(e)
					}
				}
			}).bind(this);
			ae(c, a);
			var a = ce("input");
			a.type = "button";
			a.value = LANG.button_makepub;
			a.onclick = (function () {
				var e = this.getCheckedRows();
				if (!e.length) {
					alert(LANG.message_noprofileselected)
				} else {
					if (confirm(LANG.confirm_publicprofile)) {
						var d = "";
						array_walk(e, function (f) {
							if (!f.published) {
								f.published = 1;
								if (f.__tr != null) {
									f.__tr.__status.innerHTML = ""
								}
								d += f.id + ","
							}
						});
						d = rtrim(d, ",");
						if (d != "") {
							new Ajax("/profile=public&id=" + d)
						} (Listview.cbSelect.bind(this, false))()
					}
				}
			}).bind(this);
			ae(c, a);
			var a = ce("input");
			a.type = "button";
			a.value = LANG.button_makepriv;
			a.onclick = (function () {
				var e = this.getCheckedRows();
				if (!e.length) {
					alert(LANG.message_noprofileselected)
				} else {
					if (confirm(LANG.confirm_privateprofile)) {
						var d = "";
						array_walk(e, function (f) {
							if (f.published) {
								f.published = 0;
								if (f.__tr != null) {
									f.__tr.__status.innerHTML = LANG.privateprofile
								}
								d += f.id + ","
							}
						});
						d = rtrim(d, ",");
						if (d != "") {
							new Ajax("/profile=private&id=" + d)
						} (Listview.cbSelect.bind(this, false))()
					}
				}
			}).bind(this);
			ae(c, a)
		}
	}
};