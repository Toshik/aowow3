var UrlShortener = {
	get: function (a) {
		var b = "http://ggl-shortener.appspot.com/?url=" + urlencode2(a) + "&jsonp=UrlShortener.callback";
		$.getScript(b)
	},
	callback: function (a) {
		if (a && a.short_url) {
			prompt(LANG.message_sharetheurlbelow, a.short_url)
		}
	}
};
