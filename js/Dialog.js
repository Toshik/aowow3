var Dialog = function () {
	var d = this,
		i, r = null,
		m, j = {},
		l, c = false,
		o = ce("form"),
		b = {};
	o.onsubmit = function () {
		p();
		return false
	};
	this.show = function (u, v) {
		if (u) {
			m = u;
			i = Dialog.templates[m];
			d.template = i
		} else {
			return
		}
		if (i.onInit && !c) {
			(i.onInit.bind(d, o, v))()
		}
		if (v.onBeforeShow) {
			j.onBeforeShow = v.onBeforeShow.bind(d, o)
		}
		if (i.onBeforeShow) {
			i.onBeforeShow = i.onBeforeShow.bind(d, o)
		}
		if (v.onShow) {
			j.onShow = v.onShow.bind(d, o)
		}
		if (i.onShow) {
			i.onShow = i.onShow.bind(d, o)
		}
		if (v.onHide) {
			j.onHide = v.onHide.bind(d, o)
		}
		if (i.onHide) {
			i.onHide = i.onHide.bind(d, o)
		}
		if (v.onSubmit) {
			j.onSubmit = v.onSubmit
		}
		if (i.onSubmit) {
			r = i.onSubmit.bind(d, o)
		}
		if (v.data) {
			c = false;
			l = {};
			cO(l, v.data)
		}
		d.data = l;
		Lightbox.show("dialog-" + m, {
			onShow: a,
			onHide: k
		})
	};
	this.getValue = function (u) {
		return h(u)
	};
	this.setValue = function (v, u) {
		f(v, u)
	};
	this.getSelectedValue = function (u) {
		return q(u)
	};
	this.getCheckedValue = function (u) {
		return t(u)
	};

	function a(u, v) {
		Lightbox.setSize(i.width, i.height);
		u.className = "dialog";
		if (v || !c) {
			e(u)
		}
		if (i.onBeforeShow) {
			i.onBeforeShow()
		}
		if (j.onBeforeShow) {
			j.onBeforeShow()
		}
		n();
		if (i.onShow) {
			i.onShow()
		}
		if (j.onShow) {
			j.onShow()
		}
	}
	function e(E) {
		ee(E);
		ee(o);
		var u = ce("div");
		u.className = "text";
		ae(E, u);
		ae(u, o);
		if (i.title) {
			var N = ce("h1");
			ae(N, ct(i.title));
			ae(o, N)
		}
		var G = ce("table"),
			C = ce("tbody"),
			z = false;
		ae(G, C);
		ae(o, G);
		for (var M = 0, O = i.fields.length; M < O; ++M) {
			var v = i.fields[M],
				D;
			if (!z) {
				tr = ce("tr");
				th = ce("th");
				td = ce("td")
			}
			v.__tr = tr;
			if (l[v.id] == null) {
				l[v.id] = (v.value ? v.value : "")
			}
			var B;
			if (v.options) {
				B = [];
				if (v.optorder) {
					cO(B, v.optorder)
				} else {
					for (var L in v.options) {
						B.push(L)
					}
				}
				if (v.sort) {
					B.sort(function (T, S) {
						return v.sort * strcmp(v.options[T], v.options[S])
					})
				}
			}
			switch (v.type) {
			case "caption":
				th.colSpan = 2;
				th.style.textAlign = "left";
				th.style.padding = 0;
				if (v.compute) {
					(v.compute.bind(d, null, l[v.id], o, th, tr))()
				} else {
					if (v.label) {
						ae(th, ct(v.label))
					}
				}
				ae(tr, th);
				ae(C, tr);
				continue;
				break;
			case "textarea":
				var P = D = ce("textarea");
				P.name = v.id;
				if (v.disabled) {
					P.disabled = true
				}
				P.rows = v.size[0];
				P.cols = v.size[1];
				td.colSpan = 2;
				if (v.label) {
					th.colSpan = 2;
					th.style.textAlign = "left";
					th.style.padding = 0;
					td.style.padding = 0;
					ae(th, ct(v.label));
					ae(tr, th);
					ae(C, tr);
					tr = ce("tr")
				}
				ae(td, P);
				break;
			case "select":
				var P = D = ce("select");
				P.name = v.id;
				if (v.size) {
					P.size = v.size
				}
				if (v.disabled) {
					P.disabled = true
				}
				if (v.multiple) {
					P.multiple = true
				}
				for (var L = 0, A = B.length; L < A; ++L) {
					var I = ce("option");
					I.value = B[L];
					ae(I, ct(v.options[B[L]]));
					ae(P, I)
				}
				ae(td, P);
				break;
			case "dynamic":
				td.colSpan = 2;
				td.style.textAlign = "left";
				td.style.padding = 0;
				if (v.compute) {
					(v.compute.bind(d, null, l[v.id], o, td, tr))()
				}
				ae(tr, td);
				ae(C, tr);
				D = td;
				break;
			case "checkbox":
			case "radio":
				var K = 0;
				D = [];
				for (var L = 0, A = B.length; L < A; ++L) {
					var H = ce("span"),
						P, J, w = "sdfler46" + v.id + "-" + B[L];
					if (L > 0 && !v.noInputBr) {
						ae(td, ce("br"))
					}
					J = ce("label");
					J.setAttribute("for", w);
					J.onmousedown = rf;
					P = ce("input");
					P.setAttribute("type", v.type);
					P.name = v.id;
					P.value = B[L];
					P.id = w;
					if (v.disabled) {
						P.disabled = true
					}
					if (v.submitOnDblClick) {
						J.ondblclick = P.ondblclick = function (S) {
							p()
						}
					}
					if (v.compute) {
						(v.compute.bind(d, P, l[v.id], o, td, tr))()
					}
					ae(J, P);
					ae(J, ct(v.options[B[L]]));
					ae(td, J);
					D.push(P)
				}
				break;
			default:
				var P = D = ce("input");
				P.name = v.id;
				if (v.size) {
					P.size = v.size
				}
				if (v.disabled) {
					P.disabled = true
				}
				if (v.submitOnEnter) {
					P.onkeypress = function (S) {
						S = $E(S);
						if (S.keyCode == 13) {
							p()
						}
					}
				}
				P.setAttribute("type", v.type);
				ae(td, P);
				break
			}
			if (v.label) {
				if (v.type == "textarea") {
					if (v.labelAlign) {
						td.style.textAlign = v.labelAlign
					}
					td.colSpan = 2
				} else {
					if (v.labelAlign) {
						th.style.textAlign = v.labelAlign
					}
					ae(th, ct(v.label));
					ae(tr, th)
				}
			}
			if (v.type != "checkbox" && v.type != "radio") {
				if (v.width) {
					P.style.width = v.width
				}
				if (v.compute) {
					(v.compute.bind(d, P, l[v.id], o, td, tr))()
				}
			}
			if (v.caption) {
				var H = ce("small");
				if (v.type != "textarea") {
					H.style.paddingLeft = "2px"
				}
				ae(H, ct(v.caption));
				ae(td, H)
			}
			ae(tr, td);
			ae(C, tr);
			z = v.mergeCell;
			b[v.id] = D
		}
		for (var M = i.buttons.length; M > 0; --M) {
			var F = i.buttons[M - 1],
				Q = ce("a");
			Q.onclick = p.bind(Q, F);
			Q.className = "dialog-" + F;
			Q.href = "javascript:;";
			ae(Q, ce("span"));
			ae(E, Q)
		}
		var R = ce("div");
		R.className = "clear";
		ae(E, R);
		c = true
	}
	function n() {
		for (var z = 0, u = i.fields.length; z < u; ++z) {
			var B = i.fields[z],
				A = b[B.id];
			switch (B.type) {
			case "caption":
				break;
			case "select":
				for (var w = 0, v = A.options.length; w < v; w++) {
					A.options[w].selected = (A.options[w].value == l[B.id] || in_array(l[B.id], A.options[w].value) != -1)
				}
				break;
			case "dynamic":
				if (B.compute) {
					(B.compute.bind(d, null, l[B.id], o, A))()
				}
				break;
			case "checkbox":
			case "radio":
				for (var w = 0, v = A.length; w < v; w++) {
					A[w].checked = (A[w].value == l[B.id] || in_array(l[B.id], A[w].value) != -1)
				}
				break;
			default:
				A.value = l[B.id];
				break
			}
		}
	}
	function k() {
		if (i.onHide) {
			i.onHide()
		}
		if (j.onHide) {
			j.onHide()
		}
	}
	function p(v) {
		if (v == "cancel") {
			return Lightbox.hide()
		}
		for (var w = 0, u = i.fields.length; w < u; ++w) {
			var A = i.fields[w],
				z;
			switch (A.type) {
			case "caption":
				continue;
			case "select":
				z = q(A.id);
				break;
			case "checkbox":
			case "radio":
				z = t(A.id);
				break;
			case "dynamic":
				if (A.getValue) {
					z = A.getValue(A, l, o);
					break
				}
			default:
				z = h(A.id);
				break
			}
			if (A.validate) {
				if (!A.validate(z, l, o)) {
					return
				}
			}
			if (z && typeof z == "string") {
				z = trim(z)
			}
			l[A.id] = z
		}
		g(v)
	}
	function g(v) {
		var u;
		if (r) {
			u = r(l, v, o)
		}
		if (j.onSubmit) {
			u = j.onSubmit(l, v, o)
		}
		if (u === undefined || u) {
			Lightbox.hide()
		}
		return false
	}
	function h(u) {
		return b[u].value
	}
	function f(v, u) {
		b[v].value = u
	}
	function q(A) {
		var z = [],
			w = b[A];
		for (var v = 0, u = w.options.length; v < u; v++) {
			if (w.options[v].selected) {
				z.push(parseInt(w.options[v].value) == w.options[v].value ? parseInt(w.options[v].value) : w.options[v].value)
			}
		}
		if (z.length == 1) {
			z = z[0]
		}
		return z
	}
	function t(A) {
		var z = [],
			w = b[A];
		for (var v = 0, u = w.length; v < u; v++) {
			if (w[v].checked) {
				z.push(parseInt(w[v].value) == w[v].value ? parseInt(w[v].value) : w[v].value)
			}
		}
		return z
	}
};
Dialog.templates = {};
Dialog.extraFields = {};
Dialog.templates.docompare = {
	title: LANG.dialog_compare,
	width: 400,
	buttons: ["okay", "cancel"],
	fields: [{
		id: "selecteditems",
		type: "caption",
		compute: function (c, b, a, d) {
			d.innerHTML = sprintf((b == 1 ? LANG.dialog_selecteditem : LANG.dialog_selecteditems), b)
		}
	},
	{
		id: "action",
		type: "radio",
		label: "",
		value: 3,
		submitOnDblClick: 1,
		options: {
			1: LANG.dialog_nosaveandview,
			2: LANG.dialog_saveandview,
			3: LANG.dialog_saveforlater
		}
	}]
};
