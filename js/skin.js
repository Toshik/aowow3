function sk_setFrontpageSkin(c) {
	if (!c.link || !c.image) {
		return
	}
	var d = "";
	d += " .home-skin { display: block; width: 1px; height: 1px; margin: 0 auto; position: relative } ";
	d += " .home-skin a { position: absolute; display: block; z-index: 1 } ";
	d += " .home-skin-left { left: -550px; top: 25px; width: 250px; height: 765px } ";
	d += " .home-skin-right { left: 300px; top: 25px; width: 195px; height: 765px } ";
	if (c.featured) {
		d += " .home-skin-bottom { left: -300px; top: 545px; width: 600px; height: 245px } "
	} else {
		d += " .home-skin-bottom { left: -300px; top: 380px; width: 600px; height: 410px } "
	}
	if (c.transparent) {
		d += " .home-logo { background: url(" + g_staticUrl + "/images/logos/home.png) 0 0 no-repeat !important; width: 261px !important; height:119px !important } ";
		$("#home-logo").empty().unbind().css({
			cursor: "default"
		})
	}
	d += " .home-search form { width: 375px !important }";
	if (c.featured) {
		d += " .footer { padding-top: 300px !important } "
	} else {
		d += " .footer { padding-top: 540px !important } ";
		d += " .home-featuredbox { display: none !important } "
	}
	d += " .toplinks { -webkit-border-bottom-left-radius: 8px; -moz-border-radius-bottomleft: 8px; border-bottom-left-radius: 8px; background-color: rgba(0, 0, 0, 0.75) } ";
	g_addCss(d);
	var b = $("<div></div>", {
		className: "home-skin"
	});
	var a = [{
		id: "left"
	},
	{
		id: "right"
	},
	{
		id: "bottom"
	}];
	$(a).each(function () {
		var f = this.id;
		var e = $("<a></a>", {
			className: "home-skin-" + f,
			href: c.link
		});
		if (g_isExternalUrl(c.link)) {
			e.attr("target", "_blank")
		}
		if (c.name) {
			g_attachTracking(e[0], "Skins", "Click image", c.name + "-" + f)
		}
		b.append(e)
	});
	if (c.impression) {
		$("<img />").attr("src", c.impression).css({
			position: "absolute",
			left: -10000,
			top: -10000,
			width: 1,
			height: 1
		}).appendTo(b)
	}
	$(document.body).addClass("skin").css("background", "black url(" + c.image + ") center top no-repeat").prepend(b);
	if (c.name) {
		g_trackEvent("Skins", "Show", c.name)
	}
};