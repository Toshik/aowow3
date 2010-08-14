function cn_ValidateForm(e) {
	if (!g_contestfields || !g_contestfields.length) {
		return false
	}
	for (var b = 0, a = g_contestfields.length; b < a; ++b) {
		var f = g_contestfields[b],
			d = e.elements[f.field ? f.field : f.id];
		if (!d) {
			continue
		}
		if (f.required && !d.value) {
			alert(sprintf(LANG.cn_fieldrequired, f.label));
			d.focus();
			return false
		}
		if (f.validate && !f.validate(d.value, null, e)) {
			if (f.regex) {
				alert(sprintf(LANG.cn_fieldinvalid, f.label));
				d.focus()
			}
			return false
		}
	}
	var c = g_getGets();
	if (!c.contest) {
		alert("You cannot submit a contest entry from the admin panel.");
		return false
	}
	return confirm(LANG.cn_confirm)
}
function cn_formatDateRange(b, a) {
	if (typeof b == "string") {
		b = new Date(b)
	}
	if (a == null) {
		a = b
	} else {
		if (typeof a == "string") {
			a = new Date(a)
		}
	}
	if (b.getFullYear() == a.getFullYear()) {
		if (b.getMonth() == a.getMonth()) {
			if (b.getDate() == a.getDate()) {
				return LANG.date_months[b.getMonth()] + " " + cn_FormatOrdinal(b.getDate()) + LANG.comma + b.getFullYear()
			} else {
				return LANG.date_months[b.getMonth()] + " " + cn_FormatOrdinal(b.getDate()) + LANG.dash + cn_FormatOrdinal(a.getDate()) + LANG.comma + a.getFullYear()
			}
		} else {
			return LANG.date_months[b.getMonth()] + " " + cn_FormatOrdinal(b.getDate()) + LANG.dash + LANG.date_months[a.getMonth()] + " " + cn_FormatOrdinal(a.getDate()) + LANG.comma + a.getFullYear()
		}
	} else {
		return LANG.date_months[b.getMonth()] + " " + cn_FormatOrdinal(b.getDate()) + LANG.comma + b.getFullYear() + LANG.dash + LANG.date_months[a.getMonth()] + " " + cn_FormatOrdinal(a.getDate()) + LANG.comma + a.getFullYear()
	}
}
function cn_FormatOrdinal(c) {
	if (isNaN(c)) {
		return c
	}
	var a = Math.abs(c) % 10,
		b = Math.abs(c) % 100;
	return c + (b < 21 && b > 4 ? "th" : (a < 4 ? (a < 3 ? (a < 2 ? (a < 1 ? "th" : "st") : "nd") : "rd") : "th"))
}
function cn_ConvertFieldToTag(g) {
	var f = "";
	if (g.type == "fieldset") {
		if (g.fields) {
			for (var e = 0, a = g.fields.length; e < a; ++e) {
				f += cn_ConvertFieldToTag(g.fields[e])
			}
		}
		f += "[field=" + (g.field ? g.field : g.id) + " type=hidden]"
	} else {
		f += "[field=" + (g.field ? g.field : g.id) + " type=" + g.type;
		if (g.value) {
			f += " value=" + g.value
		}
		var d;
		if (g.options) {
			d = [];
			if (g.optorder) {
				cO(d, g.optorder)
			} else {
				for (var c in g.options) {
					d.push(c)
				}
			}
			if (g.sort) {
				d.sort(function (i, h) {
					return g.sort * strcmp(g.options[i], g.options[h])
				})
			}
			f += " options=";
			for (var c = 0, b = d.length; c < b; ++c) {
				if (c > 0) {
					f += ","
				}
				f += d[c] + ":" + g.options[d[c]]
			}
		}
		if (g.disabled) {
			f += " disabled=true"
		}
		if (g.multiple) {
			f += " multiple=true"
		}
		if (g.size && g.type != "file") {
			f += " size=" + (isNaN(g.size) ? g.size.join(",") : g.size)
		}
		f += "]"
	}
	return f
}
function cn_ComputeFields(c) {
	if (!c || !c.length) {
		return false
	}
	var e = document.forms.signup;
	for (var b = 0, a = c.length; b < a; ++b) {
		var f = c[b],
			d = e.elements[f.field ? f.field : f.id];
		if (f.fields) {
			cn_ComputeFields(f.fields)
		}
		if (d && f.compute) {
			f.compute(d, d.value, e)
		}
	}
}
Markup.tags.entryform = {
	empty: true,
	trim: true,
	toHtml: function (b) {
		if (!g_contestfields || !g_contestfields.length) {
			return ""
		}
		var d = "",
			e = g_getGets();
		d += '<div class="pad"></div><form name="signup" method="post" enctype="multipart/form-data" onsubmit="return cn_ValidateForm(this)"' + (e.contest ? ' action="/contest=' + e.contest + '#how-to-win"' : "") + ">";
		d += '<div class="signup">';
		switch (g_contest.mode) {
		case 0:
			d += LANG.cn_entrylogin;
			break;
		case 999:
			d += '<span style="color: red">' + LANG.cn_entryerror + '</span><div class="pad2"></div>';
		case 1:
			d += "<table>";
			j = 0;
			for (var c = 0, a = g_contestfields.length; c < a; ++c) {
				var f = g_contestfields[c];
				if (f.standard && !f.checked) {
					continue
				}
				d += "<tr><th>" + f.label + (f.required ? '<span style="color: red">*</span>' : "") + "</th>";
				d += "<td>" + Markup.toHtml(cn_ConvertFieldToTag(f)) + "</td></tr>";
				j++
			}
			d += '<tr><th></th><td><div class="pad"></div><input type="submit" value="' + LANG.submit + '" /></td></tr></table>';
			if (!j) {
				return ""
			}
			break;
		case 2:
			if (g_contest.entered) {
				d += sprintf(LANG.cn_entrywhen, cn_formatDateRange(g_contest.entered))
			} else {
				d += LANG.cn_entrywhen2
			}
			break;
		case 3:
			d += LANG.cn_entrysuccess;
			break;
		case 4:
			d += LANG.cn_entryended;
			break;
		case 5:
			d += LANG.cn_entryupcoming;
			break;
		case 6:
			d += LANG.cn_entryregion;
			break
		}
		d += '</div></form><div class="clear"></div>';
		setTimeout(cn_ComputeFields.bind(null, g_contestfields), 1);
		return d
	}
};
Markup.tags.field = {
	empty: true,
	trim: true,
	attr: {
		unnamed: {
			req: true,
			valid: /\S+/
		},
		type: {
			req: false,
			valid: /^(textarea|select|checkbox|radio|text|hidden|file)$/i
		},
		value: {
			req: false,
			valid: /[\S ]+/
		},
		options: {
			req: false,
			valid: /\S+/
		},
		disabled: {
			req: false,
			valid: /^true$/
		},
		multiple: {
			req: false,
			valid: /^true$/
		},
		size: {
			req: false,
			valid: /^[0-9,]+$/
		}
	},
	toHtml: function (h) {
		var f = "";
		var k = [];
		if (h.options) {
			var d = h.options.split(",");
			h.options = {};
			for (var e = 0, g = d.length; e < g; ++e) {
				var l = d[e].split(":");
				if (l.length == 2) {
					k.push(l[0]);
					h.options[l[0]] = l[1]
				}
			}
		}
		if (h.size) {
			h.size = h.size.split(",")
		}
		switch (h.type) {
		case "textarea":
			f += '<textarea name="' + h.unnamed + '"' + (h.disabled ? ' disabled="disabled"' : "") + ' rows="' + h.size[0] + '" cols="' + h.size[1] + '">';
			f += (h.value ? h.value : "") + "</textarea>";
			break;
		case "select":
			f += '<select name="' + h.unnamed + '"' + (h.size ? ' size="' + h.size + '"' : "");
			f += (h.disabled ? ' disabled="disabled"' : "") + (h.multiple ? ' multiple="multiple"' : "") + ">";
			for (var c = 0, b = k.length; c < b; ++c) {
				f += '<option value="' + k[c] + (h.value == k[c] ? ' selected="selected"' : "") + '">' + h.options[k[c]] + "</option>"
			}
			f += "</select>";
			return f;
			break;
		case "checkbox":
		case "radio":
			for (var c = 0, b = k.length; c < b; ++c) {
				var a = "sd9f8gy" + h.unnamed + "-" + k[c];
				f += '<label for="' + a + '" onselectstart="return false">';
				f += '<input type="' + h.type + '" name="' + h.unnamed + (h.type == "checkbox" ? "[]" : "") + '" value="' + k[c] + '"';
				f += ' id="' + a + '"' + (h.disabled ? ' disabled="disabled"' : "");
				f += (h.value == k[c] ? ' checked="checked"' : "") + " />" + h.options[k[c]] + "</label>"
			}
			break;
		default:
			f += '<input type="' + h.type + '" name="' + h.unnamed + '"' + (h.disabled ? ' disabled="disabled"' : "") + (h.value ? ' value="' + h.value + '"' : "") + (h.size ? ' size="' + h.size + '"' : "") + " />";
			break
		}
		return f
	}
};
Markup.tags.winners = {
	empty: true,
	trim: true,
	attr: {
		unnamed: {
			req: false,
			valid: /^(compact)$/i
		},
		display: {
			req: false,
			valid: /^true$/i
		}
	},
	toHtml: function (b) {
		if (!g_contestdates || !g_contestdates.length) {
			return ""
		}
		var e = "",
			h = g_getGets(),
			f;
		e += '<h3><a class="disclosure-' + (b.display ? "on" : "off") + '" onclick="return g_disclose(ge(\'dlkjg89ee\'), this)" href="javascript:;">' + LANG.cn_winnerslist + "</a>";
		e += (g_contest.updated ? ' &nbsp;<small class="q0">' + LANG.cn_updated + g_contest.updated + "</small>" : "");
		e += '</h3><div id="dlkjg89ee"' + (b.display ? "" : ' style="display: none"') + ">";
		e += '<table class="winners grid"><tr><th>' + LANG.date + "</th><th>" + LANG.prize + "</th><th>" + LANG.user + "</th></tr>";
		for (var d = 0, a = g_contestdates.length; d < a; ++d) {
			var c = g_contestdates[d];
			if (!b.unnamed || (c.when + c.name) != f) {
				if (b.unnamed && f) {
					e += "</td></tr>"
				}
				e += "<tr><td>" + cn_formatDateRange(c.when) + "</td><td>" + Markup.toHtml(c.name) + "</td><td>";
				f = (c.when + c.name)
			} else {
				if (b.unnamed && f && c.username) {
					e += ", "
				}
			}
			e += (c.username ? '<a href="/user=' + c.username + '">' + c.username + "</a>" : "");
			if (!b.unnamed) {
				e += "</td></tr>"
			}
		}
		if (b.unnamed && f) {
			e += "</td></tr>"
		}
		e += "</table></div>";
		return e
	}
};
Markup.tags.prizes = {
	empty: true,
	trim: true,
	toHtml: function (p) {
		if (!g_contestprizes || !g_contestprizes.length) {
			return ""
		}
		var h = "",
			l = g_getGets();
		h += '<table class="prizes"><tr>';
		var e = 0;
		for (var f = 0, o = g_contestprizes.length; f < o; ++f) {
			var m = g_contestprizes[f],
				a = [],
				n = 0;
			for (var d = 0, c = g_contestdates.length; d < c; ++d) {
				var b = g_contestdates[d];
				if (b.prize != m.id) {
					continue
				}
				a.push(b.when);
				n++
			}
			a.sort();
			if ((e++%3) == 0) {
				h += "</tr><tr>"
			}
			h += '<td><div class="prize">';
			h += "<img" + (m.border ? ' class="border"' : "") + ' alt="" src="' + m.image + '" />';
			h += '<h3 class="first">' + Markup.removeTags(m.name) + (n ? "&nbsp;(" + n + ")" : "") + (a.length ? '<br /><small><b class="q0">' + cn_formatDateRange(a[0], a[a.length - 1]) + "</b></small>" : "") + "</h3>";
			h += Markup.toHtml(m.description) + '<div class="clear"></div></td>'
		}
		while ((e % 3) != 0) {
			h += "<td></td>";
			e++
		}
		h += "</tr></table>";
		return h
	}
};
Markup.inited = false;
Markup._init();
var cn_FieldTemplates = {
	country: {
		compute: function (g, e, d) {
			var b;
			if (g_contest.geotargeting) {
				b = {};
				var f = g_contest.geotargeting.split(",");
				for (var c = 0, a = f.length; c < a; ++c) {
					b[f[c]] = 1
				}
			}
			ee(g);
			var h = ce("option");
			ae(g, h);
			for (var c in g_countries) {
				if (!b || b[c]) {
					h = ce("option");
					h.value = c;
					st(h, g_countries[c].name);
					ae(g, h)
				}
			}
			if (g.onchange) {
				g.onchange()
			}
		}
	},
	state: {
		fields: [{
			id: "state-text",
			type: "text"
		},
		{
			id: "state-select",
			type: "select",
			compute: function (e, d, c) {
				var a = c.elements["state-text"],
					g = c.elements.country;
				ee(e);
				e.style.display = "none";
				a.value = null;
				a.style.display = "";
				if (g) {
					g.onchange = arguments.callee.bind(null, e, d, c);
					if (g_countries[g.value] && g_countries[g.value].states) {
						var f = ce("option");
						ae(e, f);
						for (var b in g_countries[g.value].states) {
							f = ce("option");
							f.value = b;
							st(f, g_countries[g.value].states[b]);
							ae(e, f)
						}
						e.style.display = "";
						a.style.display = "none"
					}
				}
			}
		}],
		compute: function (e, d, c) {
			var a = c.elements["state-text"],
				b = c.elements["state-select"];
			e.value = (b.selectedIndex > 0 ? b.options[b.selectedIndex].text : a.value);
			b.onchange = a.onchange = arguments.callee.bind(null, e, d, c)
		},
		validate: function (c, b, a) {
			var d = a.elements.country;
			if (d && g_countries[d.value] && g_countries[d.value].states && !c) {
				alert(sprintf(LANG.cn_fieldrequired, this.label));
				a.elements["state-select"].focus();
				return false
			}
			return true
		}
	},
	zip: {
		validate: function (c, b, a) {
			var d = a.elements.country;
			if (d && g_countries[d.value] && g_countries[d.value].zip && !c) {
				alert(sprintf(LANG.cn_fieldrequired, this.label));
				a.elements.zip.focus();
				return false
			}
			return true
		}
	},
	birthday: {
		fields: [{
			id: "birthday-day",
			type: "select",
			options: g_createRange(1, 31)
		},
		{
			id: "birthday-month",
			type: "select",
			options: {
				1: LANG.date_months[0],
				2: LANG.date_months[1],
				3: LANG.date_months[2],
				4: LANG.date_months[3],
				5: LANG.date_months[4],
				6: LANG.date_months[5],
				7: LANG.date_months[6],
				8: LANG.date_months[7],
				9: LANG.date_months[8],
				10: LANG.date_months[9],
				11: LANG.date_months[10],
				12: LANG.date_months[11]
			}
		},
		{
			id: "birthday-year",
			type: "select",
			options: g_createRange(1900, 2010),
			sort: -1
		}],
		compute: function (h, i, a) {
			var g = a.elements["birthday-year"],
				b = a.elements["birthday-month"],
				e = a.elements["birthday-day"];
			var f = parseInt(g.options[g.selectedIndex].value);
			var c = parseInt(b.options[b.selectedIndex].value);
			var k = parseInt(e.options[e.selectedIndex].value);
			h.value = f + "/" + c + "/" + k;
			g.onchange = b.onchange = e.onchange = arguments.callee.bind(null, h, i, a)
		},
		validate: function (e, d, c) {
			var a = new Date(),
				b = new Date(e);
			if (a.getFullYear() < b.getFullYear() + 18 || (a.getFullYear() == b.getFullYear() + 18 && (a.getMonth() + 1 < b.getMonth() || (a.getMonth() + 1 == b.getMonth() && a.getDate() < b.getDate())))) {
				alert(LANG.cn_mustbe18);
				return false
			}
			return true
		}
	}
};