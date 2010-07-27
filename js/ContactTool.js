var ContactTool = new
function () {
	this.general = 0;
	this.comment = 1;
	this.post = 2;
	this.screenshot = 3;
	this.character = 4;
	this.video = 5;
	var d;
	var c = {
		0: [
			[1, true],
			[2, true],
			[8, true],
			[3, true],
			[4, true],
			[5, true],
			[6, true],
			[7, true]],
		1: [
			[15, function (e) {
				return ((e.roles & U_GROUP_MODERATOR) == 0)
			}],
			[16, true],
			[17, true],
			[18, function (e) {
				return ((e.roles & U_GROUP_MODERATOR) == 0)
			}],
			[19, function (e) {
				return ((e.roles & U_GROUP_MODERATOR) == 0)
			}],
			[20, function (e) {
				return ((e.roles & U_GROUP_MODERATOR) == 0)
			}]],
		2: [
			[30, function (e) {
				return (g_users && g_users[e.user] && (g_users[e.user].roles & U_GROUP_MODERATOR) == 0)
			}],
			[37, function (e) {
				return ((e.roles & U_GROUP_MODERATOR) == 0 && g_users && g_users[e.user] && (g_users[e.user].roles & U_GROUP_MODERATOR) == 0 && g_users[e.user].avatar == 2)
			}],
			[31, true],
			[32, true],
			[33, function (e) {
				return (g_users && g_users[e.user] && (g_users[e.user].roles & U_GROUP_MODERATOR) == 0)
			}],
			[34, function (e) {
				return (g_users && g_users[e.user] && (g_users[e.user].roles & U_GROUP_MODERATOR) == 0 && e.op && !e.sticky)
			}],
			[35, function (e) {
				return (g_users && g_users[e.user] && (g_users[e.user].roles & U_GROUP_MODERATOR) == 0)
			}],
			[36, function (e) {
				return (g_users && g_users[e.user] && (g_users[e.user].roles & U_GROUP_MODERATOR) == 0)
			}]],
		3: [
			[45, true],
			[46, true],
			[47, function (e) {
				return (g_users && g_users[e.user] && (g_users[e.user].roles & U_GROUP_MODERATOR) == 0)
			}],
			[48, function (e) {
				return (g_users && g_users[e.user] && (g_users[e.user].roles & U_GROUP_MODERATOR) == 0)
			}]],
		4: [
			[60, true],
			[61, true]],
		5: [
			[45, true],
			[46, true],
			[47, function (e) {
				return (g_users && g_users[e.user] && (g_users[e.user].roles & U_GROUP_MODERATOR) == 0)
			}],
			[48, function (e) {
				return (g_users && g_users[e.user] && (g_users[e.user].roles & U_GROUP_MODERATOR) == 0)
			}]]
	};
	var b = {
		1: LANG.ct_resp_error1,
		2: LANG.ct_resp_error2,
		3: LANG.ct_resp_error3,
		7: LANG.ct_resp_error7
	};
	var a = null;
	this.displayError = function (f, e) {
		alert(e)
	};
	this.onShow = function () {
		if (location.hash && location.hash != "#contact") {
			a = location.hash
		}
		if (this.data.mode == 0) {
			location.replace("#contact")
		}
	};
	this.onHide = function () {
		if (a && (a.indexOf("screenshots:") == -1 || a.indexOf("videos:") == -1)) {
			location.replace(a)
		} else {
			location.replace("#.")
		}
	};
	this.onSubmit = function (j, f, h) {
		if (j.submitting) {
			return false
		}
		for (var g = 0; g < h.elements.length; ++g) {
			h.elements[g].disabled = true
		}
		var k = ["contact=1", "mode=" + urlencode(j.mode), "reason=" + urlencode(j.reason), "desc=" + urlencode(j.description), "ua=" + urlencode(navigator.userAgent), "appname=" + urlencode(navigator.appName), "page=" + urlencode(j.currenturl)];
		if (j.mode == 0) {
			if (j.relatedurl) {
				k.push("relatedurl=" + urlencode(j.relatedurl))
			}
			if (j.email) {
				k.push("email=" + urlencode(j.email))
			}
			if (!j.skipCaptcha) {
				k.push("captcharesponse=" + urlencode(j.captcha_response));
				k.push("captchachallenge=" + urlencode(j.captcha_challenge))
			} else {
				k.push("skipcaptcha=1")
			}
		} else {
			if (j.mode == 1) {
				k.push("id=" + urlencode(j.comment.id))
			} else {
				if (j.mode == 2) {
					k.push("id=" + urlencode(j.post.id))
				} else {
					if (j.mode == 3) {
						k.push("id=" + urlencode(j.screenshot.id))
					} else {
						if (j.mode == 4) {
							k.push("id=" + urlencode(j.profile.source))
						} else {
							if (j.mode == 5) {
								k.push("id=" + urlencode(j.video.id))
							}
						}
					}
				}
			}
		}
		j.submitting = true;
		var e = "/contactus";
		new Ajax(e, {
			method: "POST",
			params: k.join("&"),
			onSuccess: function (m, i) {
				var l = m.responseText;
				if (l == 0) {
					if (g_user.name) {
						alert(sprintf(LANG.ct_dialog_thanks_user, g_user.name))
					} else {
						alert(LANG.ct_dialog_thanks)
					}
					Lightbox.hide()
				} else {
					if (b[l]) {
						alert(b[l])
					} else {
						alert("Error: " + l)
					}
				}
			},
			onFailure: function (l, i) {
				alert("Failure submitting contact request: " + l.statusText)
			},
			onComplete: function (n, m) {
				for (var l = 0; l < h.elements.length; ++l) {
					h.elements[l].disabled = false
				}
				j.submitting = false
			}
		});
		return false
	};
	this.show = function (e) {
		if (!e) {
			e = {}
		}
		var g = {
			mode: 0
		};
		cO(g, e);
		g.reasons = c[g.mode];
		if (location.href.indexOf("#contact") != -1) {
			g.currenturl = location.href.substr(0, location.href.indexOf("#contact"))
		} else {
			g.currenturl = location.href
		}
		var f = "contactus";
		if (g.mode != 0) {
			f = "reportform"
		}
		if (!d) {
			this.init()
		}
		d.show(f, {
			data: g,
			onShow: this.onShow,
			onHide: this.onHide,
			onSubmit: this.onSubmit
		})
	};
	this.checkPound = function () {
		if (location.hash && location.hash == "#contact") {
			ContactTool.show()
		}
	};
	this.init = function () {
		d = new Dialog();
		Dialog.templates.contactus = {
			title: LANG.ct_dialog_contactwowhead,
			width: 550,
			buttons: ["okay", "cancel"],
			fields: [{
				id: "reason",
				type: "select",
				label: LANG.ct_dialog_reason,
				required: 1,
				options: [],
				compute: function (m, n, g, k) {
					ee(m);
					for (var l = 0; l < this.data.reasons.length; ++l) {
						var h = this.data.reasons[l][0];
						var f = this.data.reasons[l][1];
						var e = false;
						if (typeof f == "function") {
							e = f(this.extra)
						} else {
							e = f
						}
						if (!e) {
							continue
						}
						var j = ce("option");
						j.value = h;
						if (n && n == h) {
							j.selected = true
						}
						ae(j, ct(g_contact_reasons[h]));
						ae(m, j)
					}
					m.onchange = function () {
						if (this.value == 1 || this.value == 2 || this.value == 3) {
							g.currenturl.parentNode.parentNode.style.display = "";
							g.relatedurl.parentNode.parentNode.style.display = ""
						} else {
							g.currenturl.parentNode.parentNode.style.display = "none";
							g.relatedurl.parentNode.parentNode.style.display = "none"
						}
					}.bind(m);
					k.style.width = "98%"
				},
				validate: function (h, g, f) {
					var e = "";
					if (!h || h.length == 0) {
						e = LANG.ct_dialog_error_reason
					}
					if (e == "") {
						return true
					}
					ContactTool.displayError(f.reason, e);
					f.reason.focus();
					return false
				}
			},
			{
				id: "currenturl",
				type: "text",
				disabled: true,
				label: LANG.ct_dialog_currenturl,
				size: 40
			},
			{
				id: "relatedurl",
				type: "text",
				label: LANG.ct_dialog_relatedurl,
				caption: LANG.ct_dialog_optional,
				size: 40,
				validate: function (i, h, g) {
					var f = "";
					var e = /^(http(s?)\:\/\/|\/)?([\w]+:\w+@)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5}))(:[\d]{1,5})?((\/?\w+\/)+|\/?)(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?/;
					i = i.trim();
					if (i.length >= 250) {
						f = LANG.ct_dialog_error_relatedurl
					} else {
						if (i.length > 0 && !e.test(i)) {
							f = LANG.ct_dialog_error_invalidurl
						}
					}
					if (f == "") {
						return true
					}
					ContactTool.displayError(g.relatedurl, f);
					g.relatedurl.focus();
					return false
				}
			},
			{
				id: "email",
				type: "text",
				label: LANG.ct_dialog_email,
				caption: LANG.ct_dialog_email_caption,
				compute: function (h, g, e, i, f) {
					if (g_user.email) {
						this.data.email = g_user.email;
						f.style.display = "none"
					}
				},
				validate: function (h, g, f) {
					var e = "";
					h = h.trim();
					if (h.length >= 100) {
						e = LANG.ct_dialog_error_emaillen
					} else {
						if (h.length > 0 && !g_isEmailValid(h)) {
							e = LANG.ct_dialog_error_email
						}
					}
					if (e == "") {
						return true
					}
					ContactTool.displayError(f.email, e);
					f.email.focus();
					return false
				}
			},
			{
				id: "description",
				type: "textarea",
				caption: LANG.ct_dialog_desc_caption,
				width: "98%",
				required: 1,
				size: [10, 30],
				validate: function (h, g, f) {
					var e = "";
					h = h.trim();
					if (h.length == 0 || h.length > 10000) {
						e = LANG.ct_dialog_error_desc
					}
					if (e == "") {
						return true
					}
					ContactTool.displayError(f.description, e);
					f.description.focus();
					return false
				}
			},
			{
				id: "captcha_response",
				type: "dynamic",
				compute: function (h, g, e, j, f) {
					if (!g_requireCaptcha()) {
						this.data.skipCaptcha = true;
						return
					}
					Lightbox.setSize(550, 555);
					if (!this.data.captchaInit) {
						this.data.captchaInit = 0
					}
					this.data.captchaInit++;
					if (this.data.captchaInit % 3 == 0) {
						var i = $("<div/>", {
							id: "shjlfwhseo3w"
						});
						j = $(j);
						j.append(i);
						g_revealCaptcha("shjlfwhseo3w")
					}
				},
				getValue: function (g, f, e) {
					return Recaptcha.get_response()
				},
				validate: function (h, g, f) {
					var e = "";
					if (typeof h == "string") {
						h = trim(h)
					}
					if (!g.skipCaptcha && !h) {
						e = LANG.ct_dialog_error_captcha
					}
					if (e == "") {
						return true
					}
					ContactTool.displayError(null, e);
					Recaptcha.focus_response_field();
					return false
				}
			},
			{
				id: "captcha_challenge",
				type: "dynamic",
				compute: function (h, g, e, i, f) {},
				getValue: function (g, f, e) {
					return Recaptcha.get_challenge()
				}
			}],
			onInit: function (e) {},
			onShow: function (e) {
				if (this.data.focus && e[this.data.focus]) {
					setTimeout(g_setCaretPosition.bind(null, e[this.data.focus], e[this.data.focus].value.length), 100)
				} else {
					if (e.reason && !e.reason.value) {
						setTimeout(bindfunc(e.reason.focus, e.reason), 10)
					} else {
						if (e.relatedurl && !e.relatedurl.value) {
							setTimeout(bindfunc(e.relatedurl.focus, e.relatedurl), 10)
						} else {
							if (e.email && !e.email.value) {
								setTimeout(bindfunc(e.email.focus, e.email), 10)
							} else {
								if (e.description && !e.description.value) {
									setTimeout(bindfunc(e.description.focus, e.description), 10)
								} else {
									if (e.captcha && !e.captcha.value) {
										setTimeout(bindfunc(e.captcha.focus, e.captcha), 10)
									}
								}
							}
						}
					}
				}
			}
		};
		Dialog.templates.reportform = {
			title: LANG.ct_dialog_report,
			width: 550,
			buttons: ["okay", "cancel"],
			fields: [{
				id: "reason",
				type: "select",
				label: LANG.ct_dialog_reason,
				options: [],
				compute: function (p, q, g, l) {
					switch (this.data.mode) {
					case 1:
						g.firstChild.innerHTML = sprintf(LANG.ct_dialog_reportcomment, '<a href="/user=' + this.data.comment.user + '">' + this.data.comment.user + "</a>");
						break;
					case 2:
						var n = '<a href="/user=' + this.data.post.user + '">' + this.data.post.user + "</a>";
						if (this.data.post.op) {
							g.firstChild.innerHTML = sprintf(LANG.ct_dialog_reporttopic, n)
						} else {
							g.firstChild.innerHTML = sprintf(LANG.ct_dialog_reportpost, n)
						}
						break;
					case 3:
						g.firstChild.innerHTML = sprintf(LANG.ct_dialog_reportscreen, '<a href="/user=' + this.data.screenshot.user + '">' + this.data.screenshot.user + "</a>");
						break;
					case 4:
						ee(g.firstChild);
						ae(g.firstChild, ct(LANG.ct_dialog_reportchar));
						break;
					case 5:
						g.firstChild.innerHTML = sprintf(LANG.ct_dialog_reportvideo, '<a href="/user=' + this.data.video.user + '">' + this.data.video.user + "</a>");
						break
					}
					g.firstChild.setAttribute("style", "");
					ee(p);
					var k;
					if (this.data.mode == 1) {
						k = this.data.comment
					} else {
						if (this.data.mode == 2) {
							k = this.data.post
						} else {
							if (this.data.mode == 3) {
								k = this.data.screenshot
							} else {
								if (this.data.mode == 4) {
									k = this.data.profile
								} else {
									if (this.data.mode == 5) {
										k = this.data.video
									}
								}
							}
						}
					}
					ae(p, ce("option", {
						selected: (!q),
						value: -1
					}));
					for (var m = 0; m < this.data.reasons.length; ++m) {
						var h = this.data.reasons[m][0];
						var f = this.data.reasons[m][1];
						var e = false;
						if (typeof f == "function") {
							e = f(k)
						} else {
							e = f
						}
						if (!e) {
							continue
						}
						var j = ce("option");
						j.value = h;
						if (q && q == h) {
							j.selected = true
						}
						ae(j, ct(g_contact_reasons[h]));
						ae(p, j)
					}
					l.style.width = "98%"
				},
				validate: function (h, g, f) {
					var e = "";
					if (!h || h == -1 || h.length == 0) {
						e = LANG.ct_dialog_error_reason
					}
					if (e == "") {
						return true
					}
					ContactTool.displayError(f.reason, e);
					f.reason.focus();
					return false
				}
			},
			{
				id: "description",
				type: "textarea",
				caption: LANG.ct_dialog_desc_caption,
				width: "98%",
				required: 1,
				size: [10, 30],
				validate: function (h, g, f) {
					var e = "";
					h = h.trim();
					if (h.length == 0 || h.length > 10000) {
						e = LANG.ct_dialog_error_desc
					}
					if (e == "") {
						return true
					}
					ContactTool.displayError(f.description, e);
					f.description.focus();
					return false
				}
			}],
			onInit: function (e) {},
			onShow: function (f) {
				var g = $(f).find("*[name=reason]")[0];
				var e = $(f).find("*[name=description]")[0];
				if (this.data.focus && f[this.data.focus]) {
					setTimeout(g_setCaretPosition.bind(null, f[this.data.focus], f[this.data.focus].value.length), 100)
				} else {
					if (!g.value) {
						setTimeout(bindfunc(g.focus, g), 10)
					} else {
						if (!e.value) {
							setTimeout(bindfunc(e.focus, e), 10)
						}
					}
				}
			}
		}
	};
	$(document).ready(this.checkPound)
};

