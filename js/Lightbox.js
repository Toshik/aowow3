var Lightbox = new
function () {
	var d, l, m, h = {},
		c = {},
		i, f;

	function n() {
		aE(d, "click", e);
		aE(document, "keydown", g);
		aE(window, "resize", a)
	}
	function k() {
		dE(d, "click", e);
		dE(document, "keydown", g);
		dE(window, "resize", a)
	}
	function b() {
		if (i) {
			return
		}
		i = 1;
		var o = document.body;
		d = ce("div");
		d.className = "lightbox-overlay";
		l = ce("div");
		l.className = "lightbox-outer";
		m = ce("div");
		m.className = "lightbox-inner";
		d.style.display = l.style.display = "none";
		ae(o, d);
		ae(l, m);
		ae(o, l)
	}
	function g(o) {
		o = $E(o);
		switch (o.keyCode) {
		case 27:
			e();
			break
		}
	}
	function a(o) {
		if (o != 1234) {
			if (c.onResize) {
				c.onResize()
			}
		}
		d.style.height = document.body.offsetHeight + "px"
	}
	function e() {
		if (!i) {
			return
		}
		k();
		if (c.onHide) {
			c.onHide()
		}
		d.style.display = l.style.display = "none";
		Ads.restoreHidden();
		PoundChecker.resume();
		g_enableScroll(true)
	}
	function j() {
		d.style.display = l.style.display = h[f].style.display = "";
		Lightbox.setSize(m.offsetWidth, m.offsetHeight, 1)
	}
	this.setSize = function (o, p, q) {
		m.style.visibility = "hidden";
		if (!q) {
			m.style.width = o + "px";
			if (p) {
				m.style.height = p + "px"
			}
		}
		m.style.left = -parseInt(o / 2) + "px";
		if (p) {
			m.style.top = -parseInt(p / 2) + "px"
		}
		m.style.visibility = "visible"
	};
	this.show = function (t, r, o) {
		c = r || {};
		Ads.hideAll();
		PoundChecker.pause();
		b();
		n();
		if (f != t && h[f] != null) {
			h[f].style.display = "none"
		}
		f = t;
		var q = 0,
			p;
		if (h[t] == null) {
			q = 1;
			p = ce("div");
			ae(m, p);
			h[t] = p
		} else {
			p = h[t]
		}
		if (c.onShow) {
			c.onShow(p, q, o)
		}
		a(1234);
		j();
		g_enableScroll(false)
	};
	this.reveal = function () {
		j()
	};
	this.hide = function () {
		e()
	};
	this.isVisible = function () {
		return (d && d.style.display != "none")
	}
};
