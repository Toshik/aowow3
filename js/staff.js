var mn_content = [
	[3, "Announcements", "/admin=announcements", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU
	}],
	[5, "Screenshots", "/admin=screenshots", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_SCREENSHOT
	}],
	[18, "Upload Image", "npc=15384#submit-a-screenshot", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_DEV | U_GROUP_EDITOR | U_GROUP_LOCALIZER,
		rel: "np"
	}],
	[17, "Videos", "/admin=screenshots", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_VIDEO
	}],
	[, "Homepage"],
	[13, "Featured Box", "/admin=home-featuredbox", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU,
		breadcrumb: "Homepage Featured Box"
	}],
	[14, "Oneliners", "/admin=home-oneliners", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU,
		breadcrumb: "Homepage Oneliners"
	}],
	[15, "Skins", "/admin=home-skins", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_SALESAGENT,
		breadcrumb: "Homepage Skins"
	}],
	[16, "Titles", "/admin=home-titles", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU,
		breadcrumb: "Homepage Titles"
	}],
	[, "Articles"],
	[8, "List", "/admin=articles", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_DEV | U_GROUP_EDITOR | U_GROUP_LOCALIZER,
		breadcrumb: "List of Articles"
	}],
	[9, "Editors' Lounge", "/admin=editors-lounge", null, {
		requiredAccess: U_GROUP_EMPLOYEE | U_GROUP_EDITOR | U_GROUP_LOCALIZER
	}],
	[, "Blog"],
	[10, "New Post", "/edit=blog", null, {
		requiredAccess: U_GROUP_EMPLOYEE | U_GROUP_BLOGGER,
		breadcrumb: "New Blog Post"
	}],
	[11, "Bloggers' Corner", "/admin=bloggers-corner", null, {
		requiredAccess: U_GROUP_EMPLOYEE | U_GROUP_BLOGGER
	}],
	[12, "Tags", "/admin=blogtag", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_DEV | U_GROUP_BLOGGER,
		breadcrumb: "Blog Tags"
	}],
	[, "Community"],
	[4, "Contests", "/admin=contests", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_SALESAGENT
	}],
	[19, "Forums", "/admin=forums", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU
	}],
	[6, "Profanity Filter", "/admin=profanity", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU
	}],
	[, "Other"],
	[7, "Holiday Gift Guide", "/admin=holidaygift", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU
	}]];
var mn_dev = [
	[17, "Cookies", "/admin=cookies", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}],
	[21, "PHP Information", "/admin=phpinfo", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}],
	[18, "Site Configuration", "/admin=siteconfig", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}],
	[16, "Weight Presets", "/admin=weight-presets", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_DEV
	}],
	[22, "API Keys", "/admin=apikey", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_DEV
	}],
	[, "Cache"],
	[2, "Create Folders", "/admin=cachefolder", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV,
		breadcrumb: "Create Cache Folders"
	}],
	[3, "Expire Range", "/admin=cacheexpire", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV,
		breadcrumb: "Expire Cache Range"
	}],
	[1, "Manage", "/admin=cache", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV,
		breadcrumb: "Manage Cache"
	}],
	[20, "Memcached", "/admin=memcached", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV,
		breadcrumb: "Manage Memcached"
	}],
	[, "Database"],
	[8, "Add Fake Item", "/admin=fakeitem", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}],
	[10, "Add Fake NPC", "/admin=fakenpc", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}],
	[19, "Check Consistency", "/admin=db-check-consistency", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV,
		breadcrumb: "Check Database Consistency"
	}],
	[4, "Execute SQL", "/admin=sql", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}],
	[9, "Export Fake Item", "/admin=luaitem", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}],
	[11, "Minimum & Maximum Values", "/admin=minmax", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}],
	[6, "Purge Deleted Comments", "/admin=comments", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}],
	[7, "SQL Find & Replace", "/admin=sql-replace", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}],
	[5, "Updates", "/admin=db-update", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV,
		breadcrumb: "Database Updates"
	}],
	[, "Generators"],
	[12, "Talent Calculator Icons", "/admin=talentcalc-icons", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}],
	[, "Profiler"],
	[14, "Update Realms", "/admin=profile-catgs", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV,
		breadcrumb: "Update Profiler Realms"
	}]];
var mn_localization = [
	[1, "Generate Files", "/admin=locale-export", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV,
		breadcrumb: "Generate Localization Files"
	}],
	[, "Terms"],
	[4, "Check Integrity", "/admin=locale-integrity", null, {
		requiredAccess: U_GROUP_EMPLOYEE | U_GROUP_LOCALIZER,
		breadcrumb: "Check Term Integrity"
	}],
	[2, "Manage", "/admin=locale-search", null, {
		requiredAccess: U_GROUP_EMPLOYEE | U_GROUP_LOCALIZER,
		breadcrumb: "Manage Terms"
	}],
	[, "Deprecated"],
	[6, "Create Template", "/admin=locale-template", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV,
		breadcrumb: "Create Localization Template"
	}],
	[5, "Import Old Localized File", "/admin=locale-import", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}],
	[7, "Upload Global Strings", "/admin=locale-upload", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_DEV
	}]];
var mn_statistics = [
	[1, "Comments", "/admin=stats&table=comments"],
	[2, "Comment Ratings", "/admin=stats&table=commentratings"],
	[3, "Forum Posts", "/admin=stats&table=forumposts"],
	[4, "Screenshots", "/admin=stats&table=screenshots"],
	[7, "Uploads", "/admin=stats&table=uploads"],
	[5, "Users", "/admin=stats&table=users"],
	[6, "Videos", "/admin=stats&table=videos"]];
var mn_users = [
	[2, "Action Log", "/admin=log", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU
	}],
	[3, "Banned IPs", "/admin=bannedip", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU
	}],
	[1, "Manage", "/admin=finduser", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU,
		breadcrumb: "Manage Users"
	}],
	[5, "Roles", "/admin=staff", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_MODERATOR
	}],
	[, "Profiler"],
	[6, "Edit Character Data", "/admin=characterdata", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU
	}],
	[, "Deprecated"],
	[4, "Get Registration Email", "/admin=getregistrationemail", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU
	}]];
var mn_staff = [
	[1, "Content", null, mn_content],
	[2, "Development", null, mn_dev],
	[3, "Localization", null, mn_localization],
	[7, "Statistics", null, mn_statistics, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_DEV
	}],
	[4, "Users", null, mn_users],
	[5, "View Reports", "/admin=reports", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_EDITOR | U_GROUP_MOD | U_GROUP_LOCALIZER | U_GROUP_SCREENSHOT | U_GROUP_VIDEO
	}],
	[, "Page"],
	[102, "Validate", "http://validator.w3.org/check/referer", null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_DEV | U_GROUP_TESTER
	}]];
mn_path[4] = [4, "Staff", null, mn_staff];
$(document).ready(function () {
	var c = U_GROUP_EMPLOYEE | U_GROUP_EDITOR | (Locale.getId() != LOCALE_ENUS ? U_GROUP_LOCALIZER : 0);
	var b = g_getGets();
	var d;
	var a = {};
	if (b.refresh != null) {
		d = "See Cached";
		a.refresh = null
	} else {
		d = "Refresh";
		if (PageTemplate.get("pageName") == "home") {
			a.home = ""
		}
		a.refresh = ""
	}
	mn_staff.push([100, d, g_modifyUrl(location.href, a), null, {
		requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_DEV
	}]);
	if (location.href.match(/blog=([0-9]+)/i)) {
		mn_staff.push([, "Blog Post"]);
		mn_staff.push([200, "Edit", "/edit=blog&id=" + RegExp.$1, null, {
			requiredAccess: U_GROUP_EMPLOYEE | U_GROUP_BLOGGER
		}])
	}
	if (location.href.match(/user=([a-z0-9]+)/i)) {
		mn_staff.push([, "User"]);
		mn_staff.push([201, "Manage", "/admin=manageuser&name=" + RegExp.$1, null, {
			requiredAccess: U_GROUP_MODERATOR
		}])
	}
	if (location.href.match(/profile=([a-z]+\.[^#]*)/i)) {
		mn_staff.push([, "Character"]);
		mn_staff.push([202, "Edit character data", "/admin=characterdata&name=" + RegExp.$1, null, {
			requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU
		}])
	}
	if (isset("g_pageInfo")) {
		if (g_pageInfo.type && g_pageInfo.typeId) {
			mn_staff.push([, "DB Entry"]);
			mn_staff.push([1001, "Edit Article", "/edit=article&type=" + g_pageInfo.type + "&typeid=" + g_pageInfo.typeId, null, {
				requiredAccess: c
			}]);
			mn_staff.push([1000, "Manage Screenshots", "/admin=screenshots&type=" + g_pageInfo.type + "&typeid=" + g_pageInfo.typeId, null, {
				requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_SCREENSHOT
			}]);
			mn_staff.push([1000, "Manage Videos", "/admin=videos&type=" + g_pageInfo.type + "&typeid=" + g_pageInfo.typeId, null, {
				requiredAccess: U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_VIDEO
			}])
		}
		if (g_pageInfo.articleUrl) {
			mn_staff.push([, "Article"]);
			mn_staff.push([1002, "Edit", "/edit=article&" + g_pageInfo.articleUrl, null, {
				requiredAccess: c
			}]);
			mn_staff.push([1003, "Options", "/edit=article-options&url=" + g_pageInfo.articleUrl, null, {
				requiredAccess: c
			}])
		}
	}
	Menu.sort(mn_staff)
});
var staff_deleteCacheKey = function (b, d) {
	var c = $("#purge-memcache" + b);
	$.ajax({
		method: "GET",
		url: "/purgekey=" + d,
		success: function (a) {
			if (a == 0) {
				this.replaceWith('<span class="q2">Key successfully deleted!</span>')
			} else {
				this.replaceWith('<span style="color: red">Key deletion failed: ' + a + "</span>")
			}
		}.bind(c)
	})
};