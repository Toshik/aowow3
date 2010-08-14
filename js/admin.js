function ar_IsValidUrl(a) {
	return a.match(/^[a-z0-9=_&\.\/\-]{2,64}$/i) != null
}
function ar_ValidateUrl(a) {
	if (ar_IsValidUrl(a)) {
		return null
	}
	if (a.length < 2) {
		return "URL must be at least 2 characters long."
	} else {
		if (a.length > 64) {
			return "URL must be at most 64 characters long."
		} else {
			return "You used invalid characters in your URL.\n\nYou can only use the following:\n a to z\n 0 to 9\n =    _    &    .     /    -"
		}
	}
}
function __AddToolbar(h, g, f, k) {
	var a = function (i, e) {
		var l = prompt("Please enter the ID of the " + i + ".", "");
		if (l != null) {
			g_insertTag(g, "[" + e + "=" + (parseInt(l) || 0) + "]", "")
		}
	};
	var j = [{
		name: "title",
		mode: 11,
		title: "Title: [h3]Text[/h3]",
		onclick: g_insertTag.bind(null, g, "[h3]", "[/h3]")
	},
	{
		name: "b",
		mode: 31,
		title: "Bold: [b]Text[/b]",
		onclick: g_insertTag.bind(null, g, "[b]", "[/b]")
	},
	{
		name: "i",
		mode: 31,
		title: "Italic: [i]Text[/i]",
		onclick: g_insertTag.bind(null, g, "[i]", "[/i]")
	},
	{
		name: "u",
		mode: 31,
		title: "Underline: [u]Text[/u]",
		onclick: g_insertTag.bind(null, g, "[u]", "[/u]")
	},
	{
		name: "s",
		mode: 31,
		title: "Strikethrough: [s]Text[/s]",
		onclick: g_insertTag.bind(null, g, "[s]", "[/s]")
	},
	{
		name: "small",
		mode: 11,
		title: "Small: [small]Text[/small]",
		onclick: g_insertTag.bind(null, g, "[small]", "[/small]")
	},
	{
		name: "url",
		mode: 31,
		title: "URL: [url=...]Text[/url]",
		onclick: function () {
			var e = prompt("Please enter a URL (e.g. /item=1234).", "");
			if (e != null) {
				g_insertTag(g, "[url=" + trim(e) + "]", "[/url]")
			}
		}
	},
	{
		name: "quote",
		mode: 11,
		title: "Quote: [quote]Text[/quote]",
		onclick: g_insertTag.bind(null, g, "[quote]", "[/quote]")
	},
	{
		name: "code",
		mode: 11,
		title: "Code: [code]Text[/code]",
		onclick: g_insertTag.bind(null, g, "[code]", "[/code]")
	},
	{
		name: "ul",
		mode: 11,
		title: "Unordered list (bullets)",
		onclick: g_insertTag.bind(null, g, "[ul][li]", "[/li][/ul]")
	},
	{
		name: "ol",
		mode: 11,
		title: "Ordered list (numbers)",
		onclick: g_insertTag.bind(null, g, "[ol][li]", "[/li][/ol]")
	},
	{
		name: "li",
		mode: 15,
		title: "List item",
		onclick: g_insertTag.bind(null, g, "[li]", "[/li]")
	},
	{
		name: "img",
		mode: 11,
		title: "Image: [img src=... width=# height=# float=left|right]",
		onclick: function () {
			var e = prompt("Please enter a URL to the image.", "");
			if (e != null) {
				g_insertTag(g, "[img src=" + trim(e) + "]", "")
			}
		}
	},
	{
		name: "pad",
		mode: 11,
		title: "Padding: [pad]",
		onclick: g_insertTag.bind(null, g, "[pad]", "")
	},
	{
		name: "winners",
		mode: 8,
		title: "Winners",
		onclick: g_insertTag.bind(null, g, "[winners]", "")
	},
	{
		name: "prizes",
		mode: 8,
		title: "Prizes",
		onclick: g_insertTag.bind(null, g, "[prizes]", "")
	},
	{
		name: "entryform",
		mode: 8,
		title: "Entryform",
		onclick: g_insertTag.bind(null, g, "[entryform]", "")
	}];
	var b = [
		[0, "Color", , [
			[, "Items"],
			[0, "Poor", g_insertTag.bind(null, g, "[color=q0]", "[/color]"), null, {
				className: "q0"
			}],
			[1, "Common", g_insertTag.bind(null, g, "[color=q1]", "[/color]"), null, {
				className: "q1"
			}],
			[2, "Uncommon", g_insertTag.bind(null, g, "[color=q2]", "[/color]"), null, {
				className: "q2"
			}],
			[3, "Rare", g_insertTag.bind(null, g, "[color=q3]", "[/color]"), null, {
				className: "q3"
			}],
			[4, "Epic", g_insertTag.bind(null, g, "[color=q4]", "[/color]"), null, {
				className: "q4"
			}],
			[5, "Legendary", g_insertTag.bind(null, g, "[color=q5]", "[/color]"), null, {
				className: "q5"
			}],
			[7, "Heirloom", g_insertTag.bind(null, g, "[color=q7]", "[/color]"), null, {
				className: "q7"
			}],
			[, "Classes"],
			[10, "Death Knight", g_insertTag.bind(null, g, "[color=c6]", "[/color]"), null, {
				className: "c6"
			}],
			[11, "Druid", g_insertTag.bind(null, g, "[color=c11]", "[/color]"), null, {
				className: "c11"
			}],
			[12, "Hunter", g_insertTag.bind(null, g, "[color=c3]", "[/color]"), null, {
				className: "c3"
			}],
			[13, "Mage", g_insertTag.bind(null, g, "[color=c8]", "[/color]"), null, {
				className: "c8"
			}],
			[14, "Paladin", g_insertTag.bind(null, g, "[color=c2]", "[/color]"), null, {
				className: "c2"
			}],
			[15, "Priest", g_insertTag.bind(null, g, "[color=c5]", "[/color]"), null, {
				className: "c5"
			}],
			[16, "Rogue", g_insertTag.bind(null, g, "[color=c4]", "[/color]"), null, {
				className: "c4"
			}],
			[17, "Shaman", g_insertTag.bind(null, g, "[color=c7]", "[/color]"), null, {
				className: "c7"
			}],
			[18, "Warlock", g_insertTag.bind(null, g, "[color=c9]", "[/color]"), null, {
				className: "c9"
			}],
			[19, "Warrior", g_insertTag.bind(null, g, "[color=c1]", "[/color]"), null, {
				className: "c1"
			}],
			[, "Skills"],
			[20, "Red", g_insertTag.bind(null, g, "[color=q10]", "[/color]"), null, {
				className: "q10"
			}],
			[21, "Orange", g_insertTag.bind(null, g, "[color=r1]", "[/color]"), null, {
				className: "r1"
			}],
			[22, "Yellow", g_insertTag.bind(null, g, "[color=r2]", "[/color]"), null, {
				className: "r2"
			}],
			[23, "Green", g_insertTag.bind(null, g, "[color=r3]", "[/color]"), null, {
				className: "r3"
			}],
			[24, "Gray", g_insertTag.bind(null, g, "[color=r4]", "[/color]"), null, {
				className: "r4"
			}], ]],
		[1, "Icon", , [
			[0, "Other...", function () {
				var e = prompt("Please enter the name of the icon.", "");
				if (e != null) {
					g_insertTag("editBox", "[icon name=" + e + "]", "[/icon]")
				}
			}],
			[, "Classes"],
			[10, "Death Knight", g_insertTag.bind(null, g, "[icon name=class_deathknight]", "[/icon]"), null, {
				className: "c6",
				tinyIcon: "class_deathknight"
			}],
			[11, "Druid", g_insertTag.bind(null, g, "[icon name=class_druid]", "[/icon]"), null, {
				className: "c11",
				tinyIcon: "class_druid"
			}],
			[12, "Hunter", g_insertTag.bind(null, g, "[icon name=class_hunter]", "[/icon]"), null, {
				className: "c3",
				tinyIcon: "class_hunter"
			}],
			[13, "Mage", g_insertTag.bind(null, g, "[icon name=class_mage]", "[/icon]"), null, {
				className: "c8",
				tinyIcon: "class_mage"
			}],
			[14, "Paladin", g_insertTag.bind(null, g, "[icon name=class_paladin]", "[/icon]"), null, {
				className: "c2",
				tinyIcon: "class_paladin"
			}],
			[15, "Priest", g_insertTag.bind(null, g, "[icon name=class_priest]", "[/icon]"), null, {
				className: "c5",
				tinyIcon: "class_priest"
			}],
			[16, "Rogue", g_insertTag.bind(null, g, "[icon name=class_rogue]", "[/icon]"), null, {
				className: "c4",
				tinyIcon: "class_rogue"
			}],
			[17, "Shaman", g_insertTag.bind(null, g, "[icon name=class_shaman]", "[/icon]"), null, {
				className: "c7",
				tinyIcon: "class_shaman"
			}],
			[18, "Warlock", g_insertTag.bind(null, g, "[icon name=class_warlock]", "[/icon]"), null, {
				className: "c9",
				tinyIcon: "class_warlock"
			}],
			[19, "Warrior", g_insertTag.bind(null, g, "[icon name=class_warrior]", "[/icon]"), null, {
				className: "c1",
				tinyIcon: "class_warrior"
			}],
			[, "Factions"],
			[30, "Alliance", g_insertTag.bind(null, g, "[icon name=side_alliance]", "[/icon]"), null, {
				tinyIcon: "side_alliance"
			}],
			[31, "Horde", g_insertTag.bind(null, g, "[icon name=side_horde]", "[/icon]"), null, {
				tinyIcon: "side_horde"
			}],
			[, "Professions"],
			[40, "Alchemy", g_insertTag.bind(null, g, "[icon name=trade_alchemy]", "[/icon]"), null, {
				tinyIcon: "trade_alchemy"
			}],
			[41, "Blacksmithing", g_insertTag.bind(null, g, "[icon name=trade_blacksmithing]", "[/icon]"), null, {
				tinyIcon: "trade_blacksmithing"
			}],
			[42, "Enchanting", g_insertTag.bind(null, g, "[icon name=trade_engraving]", "[/icon]"), null, {
				tinyIcon: "trade_engraving"
			}],
			[43, "Engineering", g_insertTag.bind(null, g, "[icon name=trade_engineering]", "[/icon]"), null, {
				tinyIcon: "trade_engineering"
			}],
			[44, "Herbalism", g_insertTag.bind(null, g, "[icon name=spell_nature_naturetouchgrow]", "[/icon]"), null, {
				tinyIcon: "spell_nature_naturetouchgrow"
			}],
			[45, "Inscription", g_insertTag.bind(null, g, "[icon name=inv_inscription_tradeskill01]", "[/icon]"), null, {
				tinyIcon: "inv_inscription_tradeskill01"
			}],
			[46, "Jewelcrafting", g_insertTag.bind(null, g, "[icon name=inv_misc_gem_01]", "[/icon]"), null, {
				tinyIcon: "inv_misc_gem_01"
			}],
			[47, "Leatherworking", g_insertTag.bind(null, g, "[icon name=inv_misc_armorkit_17]", "[/icon]"), null, {
				tinyIcon: "inv_misc_armorkit_17"
			}],
			[48, "Mining", g_insertTag.bind(null, g, "[icon name=trade_mining]", "[/icon]"), null, {
				tinyIcon: "trade_mining"
			}],
			[49, "Skinning", g_insertTag.bind(null, g, "[icon name=inv_misc_pelt_wolf_01]", "[/icon]"), null, {
				tinyIcon: "inv_misc_pelt_wolf_01"
			}],
			[50, "Tailoring", g_insertTag.bind(null, g, "[icon name=trade_tailoring]", "[/icon]"), null, {
				tinyIcon: "trade_tailoring"
			}], ]],
		[2, "More", , [
			[, "Links"],
			[0, "Item...", a.bind(null, "item", "item")],
			[1, "Item Set...", a.bind(null, "item set", "itemset")],
			[2, "NPC...", a.bind(null, "NPC", "npc")],
			[3, "Object...", a.bind(null, "object", "object")],
			[4, "Quest...", a.bind(null, "quest", "quest")],
			[5, "Spell...", a.bind(null, "spell", "spell")],
			[6, "Zone...", a.bind(null, "zone", "zone")],
			[7, "Faction...", a.bind(null, "faction", "faction")],
			[8, "Pet...", a.bind(null, "pet", "pet")],
			[9, "Achievement...", a.bind(null, "achievement", "achievement")],
			[10, "Event...", a.bind(null, "event", "event")],
			[11, "Class...", a.bind(null, "class", "class")],
			[12, "Race...", a.bind(null, "race", "race")],
			[13, "Skill...", a.bind(null, "skill", "skill")],
			[14, "Statistic...", a.bind(null, "statistic", "statistic")]]]];
	if (f) {
		var c;
		f.className += " toolbar";
		for (var d in j) {
			if (j[d].mode & h) {
				ae(f, c = ce("button", {
					title: j[d].title,
					onclick: j[d].onclick
				},
				[ce("img", {
					className: "toolbar-" + j[d].name,
					src: g_staticUrl + "/images/deprecated/pixel.gif"
				})]));
				c.setAttribute("type", "button")
			}
		}
	}
	if (k && (3 & h)) {
		if (h == 2) {
			b[2][3] = b[2][3].concat([
				[, "Maps"],
				[10, "Map...", insertMapLink],
				[11, "Pin", g_insertTag.bind(null, g, "[pin x=0 y=0 url=?]", "[/pin]")]])
		}
		k.className += " menu-buttons";
		Menu.addButtons(k, b)
	}
}
bl_AddToolbar = __AddToolbar.bind(null, 1);
ar_AddToolbar = __AddToolbar.bind(null, 2);
ar_AddQuickfactToolbar = __AddToolbar.bind(null, 4);
cn_AddToolbar = __AddToolbar.bind(null, 8);
cn_AddSummaryToolbar = __AddToolbar.bind(null, 16);