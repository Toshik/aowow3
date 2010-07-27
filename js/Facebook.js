var Facebook = {
	getCurrentOpenGraphUrl: function () {
		return $("head meta[property='og:url']").attr("content")
	},
	createLikeButton: function (b, c) {
		if (!c) {
			c = {}
		}
		var a, d, e;
		if (c.simple) {
			d = 90;
			e = 21;
			a = "button_count"
		} else {
			d = 400;
			e = 23;
			a = "standard"
		}
		var f = $("<iframe></iframe>", {
			src: "http://www.facebook.com/plugins/like.php?href=" + urlencode(b) + "&layout=" + a + "&show_faces=false&action=like&font=arial&colorscheme=dark&width=" + d + "&height=" + e,
			scrolling: "no",
			frameborder: "0",
			allowtransparency: "true",
			css: {
				border: "none",
				overflow: "hidden",
				width: d + "px",
				height: e + "px",
				display: "none"
			}
		}).load(function () {
			$(this).show()
		});
		return f
	}
};
