function pm() {
	var d = $("#newpass").val();
	var b = $("#confirmpass").val();
	var a = "",
		c = "";
	if (d != "" && trim(d).length < 6) {
		c = '<span class="q10">' + LANG.message_passwordmin + "</span>"
	}
	if (d != "" && b != "") {
		if (c != "") {
			c += "<br />"
		}
		if (d == b) {
			c += '<span class="q2">' + LANG.myaccount_passmatch + "</span>"
		} else {
			c += '<span class="q10">' + LANG.myaccount_passdontmatch + "</span>"
		}
	}
	if (c != "") {
		a = "}"
	}
	ge("pm1").innerHTML = a;
	ge("pm2").innerHTML = c
}
function spd(c) {
	var a = c.elements.desc;
	if (a.value.length == 0) {
		return true
	}
	if (a.value.length < 10) {
		alert(LANG.message_descriptiontooshort);
		return false
	}
	var b = Listview.funcBox.coGetCharLimit(2);
	if (a.value.length > b) {
		if (!confirm(sprintf(LANG.confirm_descriptiontoolong, b, a.value.substring(b - 30, b)))) {
			return false
		}
	}
	return true
}
function sfs(c) {
	var a = c.elements.sig;
	a.value = trim(a.value);
	if (a.value.length == 0) {
		return true
	}
	var b = Listview.funcBox.coGetCharLimit(4);
	if (a.value.length > b) {
		if (!confirm(sprintf(LANG.confirm_signaturetoolong, b, a.value.substring(b - 30, b)))) {
			return false
		}
	}
	var d;
	if ((d = a.value.indexOf("\n")) != -1 && (d = a.value.indexOf("\n", d + 1)) != -1 && (d = a.value.indexOf("\n", d + 1)) != -1) {
		if (!confirm(sprintf(LANG.confirm_signaturetoomanylines, 3))) {
			return false
		}
	}
	return true
}
$(document).ready(function () {
	if (!$("#change-email-password")) {
		return
	}
	$("#change-email-password").submit(function () {
		var f = $("input[name=current-email]");
		var c = $("input[name=newemail]");
		var d = $("input[name=current]");
		var e = $("input[name=new]");
		var b = $("input[name=confirm]");
		var a = $("input[name=captcha]");
		if (!c.val() && !d.val() && !e.val() && !b.val()) {
			alert(LANG.message_enteremailorpass);
			return false
		}
		if (e.val() || b.val()) {
			if (!d.val()) {
				alert(LANG.message_enterpassword);
				d[0].focus();
				return false
			}
			if (trim(e.val()).length < 6) {
				alert(LANG.message_passwordmin);
				e[0].focus();
				return false
			}
			if (trim(e.val()) == trim(d.val())) {
				alert(LANG.message_newpassdifferent);
				e[0].focus();
				return false
			}
			if (e.val() != b.val()) {
				alert(LANG.message_passwordsdonotmatch);
				e[0].focus();
				return false
			}
		}
		if (c.val()) {
			if (c.val() == f.val()) {
				alert(LANG.message_newemaildifferent);
				c[0].focus();
				return false
			}
			if (!g_isEmailValid(c.val())) {
				alert(LANG.message_emailnotvalid);
				c[0].focus();
				return false
			}
			if (!g_requireCaptcha()) {
				return true
			}
			if (a.val().length != 5) {
				alert(LANG.message_codenotentered);
				a[0].focus();
				return false
			}
		}
		return true
	})
});

function fa_validateForm(a) {
	if (a.elements.avatar[2].checked && a.elements.customicon.selectedIndex == 0) {
		a.action = "/upload=image-crop";
		a.enctype = "multipart/form-data"
	} else {
		a.action = "/account=forum-avatar";
		a.enctype = "application/x-www-form-urlencoded"
	}
	return true
}
function faChange(a) {
	ge("avaSel1").style.display = (a == 1 ? "" : "none");
	ge("avaSel2").style.display = (a == 2 ? "" : "none")
}
function spawi() {
	var a = ge("wowicon");
	a.value = trim(a.value);
	var b = ge("avaPre1");
	while (b.firstChild) {
		de(b.firstChild)
	}
	ae(b, Icon.createUser(1, a.value, 2, null, (g_user.roles & U_GROUP_PREMIUM) && !g_user.settings.premiumborder))
}
function spawj() {
	var a = ge("customicon");
	var b = ge("avaPre2");
	while (b.firstChild) {
		de(b.firstChild)
	}
	if (a.selectedIndex != 0) {
		ge("iconbrowse").style.display = "none";
		iconId = a.options[a.selectedIndex].value;
		ae(b, Icon.createUser(2, iconId, 2, null, (g_user.roles & U_GROUP_PREMIUM) && !g_user.settings.premiumborder))
	} else {
		ge("iconbrowse").style.display = ""
	}
}
var imageDetailDialog = new Dialog();
Listview.templates.uploads = {
	sort: [1],
	nItemsPerPage: -1,
	mode: 1,
	columns: [{
		id: "id",
		name: "ID",
		type: "text",
		value: "id",
		width: "75px",
		compute: function (b, c, a) {
			a.onclick = imageDetailDialog.show.bind(null, "imageupload", {
				data: b,
				onSubmit: this.template.updateImageInfo.bind(this, b)
			});
			return b.id
		},
		getVisibleText: function (a) {
			return a.id
		},
		sortFunc: function (d, c, e) {
			return d.id - c.id
		}
	},
	{
		id: "name",
		name: "Name",
		type: "text",
		value: "name",
		align: "left",
		compute: function (a, c) {
			var b = Icon.createUser(2, a.id, 0, null, (g_user.roles & U_GROUP_PREMIUM) && !g_user.settings.premiumborder);
			b.style.cssFloat = b.style.styleFloat = "left";
			c.style.position = "relative";
			ae(c, b);
			ae(c, ce("span", {
				style: {
					paddingLeft: "7px",
					lineHeight: "1.8em"
				},
				innerHTML: a.name
			}));
			if (a.current) {
				ae(c, ce("span", {
					style: {
						fontStyle: "italic",
						cssFloat: "right",
						styleFloat: "right",
						marginTop: "3px"
					},
					className: "small",
					innerHTML: "Current"
				}))
			}
		},
		getVisibleText: function (a) {
			return a.caption
		}
	},
	{
		id: "size",
		name: "Size",
		type: "number",
		value: "size",
		width: "125px",
		compute: function (a, b) {
			return Listview.funcBox.coFormatFileSize(a.size)
		}
	},
	{
		id: "status",
		name: "Status",
		type: "text",
		value: "status",
		width: "100px",
		compute: function (a, b) {
			if (a.status == 2) {
				ae(b, ce("span", {
					className: "q10",
					innerHTML: "Rejected"
				}))
			} else {
				return "Ready"
			}
		}
	},
	{
		id: "when",
		name: "When",
		type: "date",
		value: "when",
		width: "150px",
		compute: function (b, d) {
			var c = ce("span");
			var a = new Date(b.when);
			Listview.funcBox.coFormatDate(c, (g_serverTime - a) / 1000, a);
			ae(d, c)
		}
	}],
	onBeforeCreate: function () {
		for (i in this.data) {
			this.data[i].pos = i
		}
	},
	createCbControls: function (d, c) {
		if (!c && this.data.length < 15) {
			return
		}
		var b = ce("input"),
			a = ce("input");
		iAvatar = ce("input");
		iUpload = ce("input");
		b.type = a.type = iAvatar.type = iUpload.type = "button";
		b.value = "Delete";
		a.value = LANG.button_deselect;
		iAvatar.value = "Set as avatar";
		iUpload.value = "Upload new one";
		b.onclick = this.template.deleteFiles.bind(this);
		a.onclick = Listview.cbSelect.bind(this, false);
		iAvatar.onclick = this.template.useAvatar.bind(this);
		iUpload.onclick = this.template.jumpToUpload.bind(this);
		ae(d, iAvatar);
		ae(d, b);
		ae(d, iUpload);
		ae(d, a)
	},
	updateImageInfo: function (b, a) {
		if (b.name != a.name) {
			new Ajax("/account=rename-icon&id=" + a.id + "&name=" + a.name);
			this.setRow(a)
		}
	},
	deleteFiles: function () {
		var b = this.getCheckedRows();
		if (!b.length) {
			return
		}
		var a = "",
			c = true;
		array_walk(b, function (e) {
			if (c) {
				c = false
			} else {
				a += ","
			}
			a += e.id
		});
		var d = confirm("Are you sure you want to delete these icons?");
		if (d == false) {
			return
		}
		new Ajax("/account=delete-icon&id=" + a);
		this.deleteRows(b);
		this.resetCheckedRows();
		this.refreshRows()
	},
	useAvatar: function () {
		var a = this.getCheckedRows();
		if (!a.length) {
			return
		}
		if (a.length > 1) {
			alert("Please select only 1 image to use as your avatar.");
			return
		}
		var b = a[0];
		array_walk(this.data, function (c) {
			c.current = 0;
			c.__tr = null
		});
		b.current = 1;
		new Ajax("/account=forum-avatar&avatar=2&customicon=" + b.id);
		this.refreshRows()
	},
	jumpToUpload: function () {
		_.show(2);
		location.href = "/account#community";
		var a = ac(document.fa);
		window.scrollTo(0, a.y);
		document.fa.avatar[2].click();
		document.fa.customicon.selectedIndex = 0;
		spawj()
	},
	onNoData: function (d) {
		var c = ce("span");
		var b = ce("a");
		b.onclick = this.template.jumpToUpload.bind(this);
		b.href = "javascript:;";
		ae(b, ct("Upload"));
		ae(c, ct("You havn't uploaded any custom avatars yet. "));
		ae(c, b);
		ae(c, ct(" one now!"));
		ae(d, c)
	}
};
Dialog.templates.imageupload = {
	title: LANG.dialog_imagedetails,
	width: 300,
	buttons: ["okay", "cancel"],
	fields: [{
		id: "id",
		type: "hidden",
		label: " ",
		size: 30,
		required: 0,
		compute: function (d, c, b, g) {
			var f = ce("div");
			f.style.position = "relative";
			var e = ce("div");
			e.style.position = "relative";
			var a = Icon.createUser(2, null, 2, null, (g_user.roles & U_GROUP_PREMIUM) && !g_user.settings.premiumborder);
			ae(e, a);
			this.icon = a;
			ae(f, d);
			ae(f, e);
			ae(g, f)
		}
	},
	{
		id: "name",
		type: "text",
		label: LANG.dialog_imagename,
		size: 20,
		required: 1,
		submitOnEnter: 1,
		validate: function (b, a) {
			if (b.match(/^[a-zA-Z][a-zA-Z0-9 ]{0,19}$/)) {
				return true
			} else {
				alert(LANG.message_invalidname);
				return false
			}
		}
	},
	],
	onShow: function (b) {
		var a = g_staticUrl + "/uploads/avatars/" + this.data.id + ".jpg";
		Icon.setTexture(this.icon, 2, a);
		setTimeout(function () {
			var c = b.elements.name;
			c.focus();
			c.select()
		},
		1)
	}
};