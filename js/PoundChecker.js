var PoundChecker = new
function () {
	var b = null;
	var d = null;
	var c = 1000;
	var a = function () {
		if (!d) {
			PoundChecker.stop();
			return
		}
		if (location.hash) {
			d()
		}
	};
	this.start = function (e, g) {
		if (d) {
			if (isset("g_dev")) {
				alert("Multiple pound checkers are bad, mmkay?")
			}
			return
		}
		d = e;
		if (g) {
			c = g
		}
		b = setInterval(a, c)
	};
	this.stop = function () {
		clearInterval(b);
		b = d = null;
		c = 1000
	};
	this.pause = function () {
		clearInterval(b)
	};
	this.resume = function () {
		if (d) {
			b = setInterval(d, c)
		}
	}
};

