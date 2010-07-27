var Draggable = new
function () {
	var a = {},
		h = {},
		l, d;

	function j(p) {
		p = $E(p);
		if (this._handle) {
			var m = p._target,
				o = false,
				n = 0;
			while (m && n <= 3) {
				if (m == this._handle) {
					o = true;
					break
				}
				m = m.parentNode;
				++n
			}
			if (!o) {
				return false
			}
		}
		l = this;
		a = g_getCursorPos(p);
		aE(document, "mousemove", b);
		aE(document, "mouseup", c);
		if (l.onClick) {
			l.onClick(p, l)
		}
		return false
	}
	function b(p) {
		p = $E(p);
		var q = g_getCursorPos(p);
		if (l) {
			if (Math.abs(q.x - a.x) > 5 || Math.abs(q.y - a.y) > 5) {
				i(p, l);
				l = null
			}
		}
		if (!d) {
			return false
		}
		var o = g(d),
			n = q.x - a.x,
			m = q.y - a.y;
		n = Math.max(d._bounds.x1 - h.x, Math.min(d._bounds.x2 - h.x - (o.x2 - o.x1), n));
		m = Math.max(d._bounds.y1 - h.y, Math.min(d._bounds.y2 - h.y - (o.y2 - o.y1), m));
		k(n, m);
		return false
	}
	function c(m) {
		m = $E(m);
		l = null;
		if (d) {
			f(m)
		}
	}
	function i(n, m) {
		if (d) {
			f(n)
		}
		var o = ac(m);
		h.x = o[0];
		h.y = o[1];
		if (m._targets.length) {
			d = m.cloneNode(true);
			d._orig = m;
			ae(document.body, d);
			k(-2323, -2323)
		} else {
			d = m
		}
		Tooltip.disabled = true;
		Tooltip.hide();
		if (m.onDrag) {
			m.onDrag(n, d, m)
		}
		d._bounds = g(m._container);
		d.className += " dragged"
	}
	function f(r) {
		var q = false,
			t = g_getCursorPos(r);
		if (d._orig && d._orig._targets.length) {
			e();
			var u = {
				x1: d._x,
				x2: d._x + parseInt(d.offsetWidth),
				y1: d._y,
				y2: d._y + parseInt(d.offsetHeight)
			};
			de(d);
			d = d._orig;
			for (var p = 0, n = d._targets.length; p < n; ++p) {
				var m = d._targets[p],
					o = g(m);
				if (u.x2 >= o.x1 && u.x1 < o.x2 && u.y2 >= o.y1 && u.y1 < o.y2) {
					q = true;
					if (d.onDrop) {
						d.onDrop(r, d, m, (t.x >= o.x1 && t.x <= o.x2 && t.y >= o.y1 && t.y <= o.y2))
					} else {
						ae(m, d)
					}
				}
			}
		}
		if (!q && d.onDrop) {
			d.onDrop(r, d, null)
		}
		dE(document, "mousemove", b);
		dE(document, "mouseup", c);
		Tooltip.disabled = false;
		d.className = d.className.replace(/dragged/, "");
		d = null
	}
	function k(n, m) {
		d.style.position = "absolute";
		d.style.left = h.x + n + "px";
		d.style.top = h.y + m + "px";
		d._x = h.x + n;
		d._y = h.y + m
	}
	function e() {
		d.style.left = "-2323px";
		d.style.top = "-2323px"
	}
	function g(m) {
		var n = ac(m);
		return {
			x1: n[0],
			x2: n[0] + parseInt(m.offsetWidth),
			y1: n[1],
			y2: n[1] + parseInt(m.offsetHeight)
		}
	}
	this.init = function (q, p) {
		q.onmousedown = j;
		var n = q.getElementsByTagName("a");
		for (var o = 0, m = n.length; o < m; ++o) {
			ns(n[o])
		}
		if (!q._targets) {
			q._targets = []
		}
		if (!q._container) {
			q._container = document.body
		}
		if (p != null) {
			if (p.targets) {
				for (var o = 0, m = p.targets.length; o < m; ++o) {
					q._targets.push(ge(p.targets[o]))
				}
			}
			if (p.container) {
				q._container = ge(p.container)
			}
			if (p.onClick) {
				q.onClick = p.onClick
			}
			if (p.onDrop) {
				q.onDrop = p.onDrop
			}
			if (p.onDrag) {
				q.onDrag = p.onDrag
			}
		}
	}
};
