cO(LANG, {
	blnavblogentry: "$1 blog entry",
	blnavblogentries: "$1 blog entries",
	blnavcomment: "$1 comment",
	blnavcomments: "$1 comments"
});
var bl_share = [{
	id: "delicious",
	name: "Delicious",
	url: "http://del.icio.us/post?partner=wowhead&url=$1&title=$2&notes=",
	icon: g_staticUrl + "/images/icons/delicious.gif"
},
{
	id: "digg",
	name: "Digg",
	url: "http://digg.com/submit?partner=wowhead&url=$1&title=$2&bodytext=",
	icon: g_staticUrl + "/images/icons/digg.gif"
},
{
	id: "facebook",
	name: "Facebook",
	url: "http://www.facebook.com/sharer.php?u=$1",
	icon: g_staticUrl + "/images/icons/facebook.gif"
},
{
	id: "googlebuzz",
	name: "Google Buzz",
	url: "http://www.google.com/buzz/post?url=$1",
	icon: g_staticUrl + "/images/icons/buzz.gif"
},
{
	id: "reddit",
	name: "Reddit",
	url: "http://reddit.com/submit?url=$1&title=$2",
	icon: g_staticUrl + "/images/icons/reddit.gif"
},
{
	id: "stumbleupon",
	name: "StumbleUpon",
	url: "http://www.stumbleupon.com/submit?url=$1&title=$2",
	icon: g_staticUrl + "/images/icons/stumbleupon.gif"
},
{
	id: "twitter",
	name: "Twitter",
	url: "http://twitter.com/home?status=%40Wowhead+$2%3A+$1",
	icon: g_staticUrl + "/images/icons/twitter.gif"
},
{
	id: "windowslive",
	name: "Windows Live",
	url: "https://favorites.live.com/quickadd.aspx?marklet=1&mkt=en-us&url=$1&title=$2&top=1",
	icon: g_staticUrl + "/images/icons/live.gif"
}];

function bl_addPageNavigation(f, e, g, c, b) {
	var a;
	var d = {
		nItems: f,
		page: e,
		url: c,
		pound: b
	};
	if (g == 1) {
		a = 20;
		d.sep = ".";
		d.wording = ["blnavcomment", "blnavcomments"]
	} else {
		a = 10;
		d.sep = "&p=";
		d.wording = ["blnavblogentry", "blnavblogentries"]
	}
	d.nPages = Math.ceil(f / a);
	g_addPages(ge("nmvnct64cg46"), d);
	d.allOrNothing = true;
	g_addPages(ge("nmvnct64cg47"), d)
}
function bl_archiveSelect(a, b) {
	if (b && b.value) {
		location = "/blog&" + a + "=" + b.value
	}
}
function bl_initPost(b, a) {
	if (!a.rel || !a.rel.match(/id=([0-9]+)/)) {
		return
	}
	var c = parseInt(RegExp.$1);
	bl_initShareButton(a, c);
	bl_addLikeButton(c)
}
function bl_initShareButton(a, b) {
	var c = [];
	c.blogId = b;
	c.onBeforeShow = bl_generateShareMenu;
	Menu.add(a, c)
}
function bl_generateShareMenu(c) {
	if (c.length) {
		return
	}
	var a = c.blogId;
	var d = $("#blog-entry-" + a + " h1 a:first").text();
	var b = "http://www.wowhead.com/blog=" + a;
	$.each(bl_share, function (e, g) {
		var f = [e, g.name, sprintf(g.url, b, urlencode2(d)), null, {
			icon: g.icon,
			newWindow: true,
			onClick: function () {
				g_trackEvent("Blog", "Share", g.name)
			}
		}];
		c.push(f)
	})
}
function bl_addLikeButton(b) {
	var a = $("<div></div>", {
		className: "blog-entry-facebook-like"
	}).append(Facebook.createLikeButton("http://www.wowhead.com/blog=" + b, {
		simple: true
	})).prependTo($("#blog-entry-" + b + " h1"))
}
$(document).ready(function () {
	$("#blog-wrapper a.blog-entry-share").each(bl_initPost)
});