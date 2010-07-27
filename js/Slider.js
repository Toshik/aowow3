var Slider = new
function () {
	var a, f;

	function g(j) {
		j = $E(j);
		f = this;
		a = g_getCursorPos(j);
		aE(document, "mousemove", b);
		aE(document, "mouseup", c);
		return false
	}
	function b(j) {
		j = $E(j);
		if (!a || !f) {
			return
		}
		var k = g_getCursorPos(j),
			m = k[f._dir] - a[f._dir],
			l = h(f, f._pos + m);
		if (!l) {
			a = k
		}
		if (f.onMove) {
			f.onMove(j, f, e(f))
		}
	}
	function c(j) {
		j = $E(j);
		f = null;
		a = null;
		dE(document, "mousemove", b);
		dE(document, "mouseup", c);
		return false
	}
	function i(l, k) {
		k = $E(k);
		f = l;
		a = g_getCursorPos(k);
		var m = ac(f.parentNode),
			j = Math.floor((f._dir == "y" ? f.offsetHeight : f.offsetWidth) / 2);
		h(l, a[f._dir] - m[f._dir] - j);
		if (l.onMove) {
			l.onMove(k, l, e(l))
		}
		aE(document, "mousemove", b);
		aE(document, "mouseup", c);
		return false
	}
	function h(j, k) {
		var l = false;
		if (k < 0) {
			k = 0;
			l = true
		} else {
			if (k > d(j)) {
				k = d(j);
				l = true
			}
		}
		j.style[(j._dir == "y" ? "top" : "left")] = k + "px";
		j._pos = k;
		return l
	}
	function d(j) {
		if (j._dir == "y") {
			return j.parentNode.offsetHeight - j.offsetHeight + 2
		}
		return j.parentNode.offsetWidth - j.offsetWidth + 2
	}
	function e(m) {
		var j = m._pos / d(m),
			l = Math.round((j * (m._max - m._min)) + m._min),
			k = [j, l];
		k.percent = j;
		k.value = l;
		return k
	}
	this.setPercent = function (k, j) {
		h(k, parseInt(j * d(k)))
	};
	this.setValue = function (k, j) {
		if (j < k._min) {
			j = k._min
		} else {
			if (j > k._max) {
				j = k._max
			}
		}
		this.setPercent(k, (j - k._min) / (k._max - k._min))
	};
	this.setSize = function (m, j) {
		var l = e(m),
			k = d(m);
		m.parentNode.style[(m._dir == "y" ? "height" : "width")] = j + "px";
		if (k != d(m)) {
			this.setValue(m, l.value)
		}
	};
	this.init = function (l, k) {
		var m = ce("a");
		m.href = "javascript:;";
		m.onmousedown = g;
		m.className = "handle";
		var j = ce("a");
		j.href = "javascript:;";
		j.onmousedown = i.bind(0, m);
		j.className = "track";
		ae(l, ce("span"));
		ae(l, j);
		ae(l, m);
		m._dir = "x";
		m._min = 1;
		m._max = 100;
		m._pos = 0;
		if (k != null) {
			if (k.direction == "y") {
				m._dir = "y"
			}
			if (k.minValue) {
				m._min = k.minValue
			}
			if (k.maxValue) {
				m._max = k.maxValue
			}
			if (k.onMove) {
				m.onMove = k.onMove
			}
		}
		l.className = "slider-" + m._dir;
		return m
	}
};
