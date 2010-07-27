var mn_classes = [
	[6, "Death Knight", , , {
		className: "c6",
		tinyIcon: "class_deathknight"
	}],
	[11, "Druid", , , {
		className: "c11",
		tinyIcon: "class_druid"
	}],
	[3, "Hunter", , , {
		className: "c3",
		tinyIcon: "class_hunter"
	}],
	[8, "Mage", , , {
		className: "c8",
		tinyIcon: "class_mage"
	}],
	[2, "Paladin", , , {
		className: "c2",
		tinyIcon: "class_paladin"
	}],
	[5, "Priest", , , {
		className: "c5",
		tinyIcon: "class_priest"
	}],
	[4, "Rogue", , , {
		className: "c4",
		tinyIcon: "class_rogue"
	}],
	[7, "Shaman", , , {
		className: "c7",
		tinyIcon: "class_shaman"
	}],
	[9, "Warlock", , , {
		className: "c9",
		tinyIcon: "class_warlock"
	}],
	[1, "Warrior", , , {
		className: "c1",
		tinyIcon: "class_warrior"
	}]];
var mn_races = [
	[, "Alliance", , , {
		tinyIcon: "side_alliance"
	}],
	[11, "Draenei", , , {
		tinyIcon: "race_draenei_female"
	}],
	[3, "Dwarf", , , {
		tinyIcon: "race_dwarf_female"
	}],
	[7, "Gnome", , , {
		tinyIcon: "race_gnome_female"
	}],
	[1, "Human", , , {
		tinyIcon: "race_human_female"
	}],
	[4, "Night Elf", , , {
		tinyIcon: "race_nightelf_female"
	}],
	[, "Horde", , , {
		tinyIcon: "side_horde"
	}],
	[10, "Blood Elf", , , {
		tinyIcon: "race_bloodelf_female"
	}],
	[2, "Orc", , , {
		tinyIcon: "race_orc_female"
	}],
	[6, "Tauren", , , {
		tinyIcon: "race_tauren_female"
	}],
	[8, "Troll", , , {
		tinyIcon: "race_troll_female"
	}],
	[5, "Undead", , , {
		tinyIcon: "race_scourge_female"
	}]];
var mn_items = [
	[2, "Weapons", , [
		[, "One-Handed", "/items=2?filter=ty=15:13:0:4:7"],
		[15, "Daggers"],
		[13, "Fist Weapons"],
		[0, "One-Handed Axes"],
		[4, "One-Handed Maces"],
		[7, "One-Handed Swords"],
		[, "Two-Handed", "/items=2?filter=ty=6:10:1:5:8"],
		[6, "Polearms"],
		[10, "Staves"],
		[1, "Two-Handed Axes"],
		[5, "Two-Handed Maces"],
		[8, "Two-Handed Swords"],
		[, "Ranged", "/items=2?filter=ty=2:18:3:16:19"],
		[2, "Bows"],
		[18, "Crossbows"],
		[3, "Guns"],
		[16, "Thrown"],
		[19, "Wands"],
		[, "Other", "/items=2?filter=ty=20:14"],
		[20, "Fishing Poles"],
		[14, "Miscellaneous"]]],
	[4, "Armor", , [
		[, "Types", "/items=4?filter=ty=1:2:3:4"],
		[1, "Cloth", , [
			[5, "Chest", "/items=4.1?filter=sl=5"],
			[8, "Feet", "/items=4.1?filter=sl=8"],
			[10, "Hands", "/items=4.1?filter=sl=10"],
			[1, "Head", "/items=4.1?filter=sl=1"],
			[7, "Legs", "/items=4.1?filter=sl=7"],
			[3, "Shoulder", "/items=4.1?filter=sl=3"],
			[6, "Waist", "/items=4.1?filter=sl=6"],
			[9, "Wrist", "/items=4.1?filter=sl=9"]]],
		[2, "Leather", , [
			[5, "Chest", "/items=4.2?filter=sl=5"],
			[8, "Feet", "/items=4.2?filter=sl=8"],
			[10, "Hands", "/items=4.2?filter=sl=10"],
			[1, "Head", "/items=4.2?filter=sl=1"],
			[7, "Legs", "/items=4.2?filter=sl=7"],
			[3, "Shoulder", "/items=4.2?filter=sl=3"],
			[6, "Waist", "/items=4.2?filter=sl=6"],
			[9, "Wrist", "/items=4.2?filter=sl=9"]]],
		[3, "Mail", , [
			[5, "Chest", "/items=4.3?filter=sl=5"],
			[8, "Feet", "/items=4.3?filter=sl=8"],
			[10, "Hands", "/items=4.3?filter=sl=10"],
			[1, "Head", "/items=4.3?filter=sl=1"],
			[7, "Legs", "/items=4.3?filter=sl=7"],
			[3, "Shoulder", "/items=4.3?filter=sl=3"],
			[6, "Waist", "/items=4.3?filter=sl=6"],
			[9, "Wrist", "/items=4.3?filter=sl=9"]]],
		[4, "Plate", , [
			[5, "Chest", "/items=4.4?filter=sl=5"],
			[8, "Feet", "/items=4.4?filter=sl=8"],
			[10, "Hands", "/items=4.4?filter=sl=10"],
			[1, "Head", "/items=4.4?filter=sl=1"],
			[7, "Legs", "/items=4.4?filter=sl=7"],
			[3, "Shoulder", "/items=4.4?filter=sl=3"],
			[6, "Waist", "/items=4.4?filter=sl=6"],
			[9, "Wrist", "/items=4.4?filter=sl=9"]]],
		[, "Jewelry", "/items=4?filter=ty=-3:-2:-4"],
		[-3, "Amulets"],
		[-2, "Rings"],
		[-4, "Trinkets"],
		[, "Relics", "/items=4?filter=ty=8:7:9:10"],
		[8, "Idols"],
		[7, "Librams"],
		[10, "Sigils"],
		[9, "Totems"],
		[, "Other", "/items=4?filter=ty=-6:-5:-7:6:-8:0"],
		[-6, "Cloaks"],
		[-5, "Off-hand Frills"],
		[6, "Shields"],
		[-8, "Shirts"],
		[-7, "Tabards"],
		[0, "Miscellaneous"]]],
	[1, "Containers", , [
		[0, "Bags"],
		[3, "Enchanting Bags"],
		[4, "Engineering Bags"],
		[5, "Gem Bags"],
		[2, "Herb Bags"],
		[8, "Inscription Bags"],
		[7, "Leatherworking Bags"],
		[6, "Mining Bags"],
		[1, "Soul Bags"]]],
	[0, "Consumables", , [
		[7, "Bandages"],
		[0, "Consumables"],
		[2, "Elixirs", , [
			[1, "Battle"],
			[2, "Guardian"]]],
		[3, "Flasks"],
		[5, "Food & Drinks"],
		[6, "Item Enhancements (Permanent)"],
		[-3, "Item Enhancements (Temporary)"],
		[1, "Potions"],
		[4, "Scrolls"],
		[8, "Other"]]],
	[16, "Glyphs", , [
		[6, "Death Knight", , [
			[1, "Major", "/items=16.6?filter=cr=132;crs=1;crv=0"],
			[2, "Minor", "/items=16.6?filter=cr=132;crs=2;crv=0"]], {
			className: "c6",
			tinyIcon: "class_deathknight"
		}],
		[11, "Druid", , [
			[1, "Major", "/items=16.11?filter=cr=132;crs=1;crv=0"],
			[2, "Minor", "/items=16.11?filter=cr=132;crs=2;crv=0"]], {
			className: "c11",
			tinyIcon: "class_druid"
		}],
		[3, "Hunter", , [
			[1, "Major", "/items=16.3?filter=cr=132;crs=1;crv=0"],
			[2, "Minor", "/items=16.3?filter=cr=132;crs=2;crv=0"]], {
			className: "c3",
			tinyIcon: "class_hunter"
		}],
		[8, "Mage", , [
			[1, "Major", "/items=16.8?filter=cr=132;crs=1;crv=0"],
			[2, "Minor", "/items=16.8?filter=cr=132;crs=2;crv=0"]], {
			className: "c8",
			tinyIcon: "class_mage"
		}],
		[2, "Paladin", , [
			[1, "Major", "/items=16.2?filter=cr=132;crs=1;crv=0"],
			[2, "Minor", "/items=16.2?filter=cr=132;crs=2;crv=0"]], {
			className: "c2",
			tinyIcon: "class_paladin"
		}],
		[5, "Priest", , [
			[1, "Major", "/items=16.5?filter=cr=132;crs=1;crv=0"],
			[2, "Minor", "/items=16.5?filter=cr=132;crs=2;crv=0"]], {
			className: "c5",
			tinyIcon: "class_priest"
		}],
		[4, "Rogue", , [
			[1, "Major", "/items=16.4?filter=cr=132;crs=1;crv=0"],
			[2, "Minor", "/items=16.4?filter=cr=132;crs=2;crv=0"]], {
			className: "c4",
			tinyIcon: "class_rogue"
		}],
		[7, "Shaman", , [
			[1, "Major", "/items=16.7?filter=cr=132;crs=1;crv=0"],
			[2, "Minor", "/items=16.7?filter=cr=132;crs=2;crv=0"]], {
			className: "c7",
			tinyIcon: "class_shaman"
		}],
		[9, "Warlock", , [
			[1, "Major", "/items=16.9?filter=cr=132;crs=1;crv=0"],
			[2, "Minor", "/items=16.9?filter=cr=132;crs=2;crv=0"]], {
			className: "c9",
			tinyIcon: "class_warlock"
		}],
		[1, "Warrior", , [
			[1, "Major", "/items=16.1?filter=cr=132;crs=1;crv=0"],
			[2, "Minor", "/items=16.1?filter=cr=132;crs=2;crv=0"]], {
			className: "c1",
			tinyIcon: "class_warrior"
		}]]],
	[7, "Trade Goods", , [
		[14, "Armor Enchantments"],
		[5, "Cloth"],
		[3, "Devices"],
		[10, "Elemental"],
		[12, "Enchanting"],
		[2, "Explosives"],
		[9, "Herbs"],
		[4, "Jewelcrafting"],
		[6, "Leather"],
		[13, "Materials"],
		[8, "Meat"],
		[7, "Metal & Stone"],
		[1, "Parts"],
		[15, "Weapon Enchantments"],
		[11, "Other"]]],
	[6, "Projectiles", , [
		[2, "Arrows"],
		[3, "Bullets"]]],
	[11, "Quivers", , [
		[3, "Ammo Pouches"],
		[2, "Quivers"]]],
	[9, "Recipes", , [
		[0, "Books"],
		[6, "Alchemy", , , {
			tinyIcon: "trade_alchemy"
		}],
		[4, "Blacksmithing", , , {
			tinyIcon: "trade_blacksmithing"
		}],
		[5, "Cooking", , , {
			tinyIcon: "inv_misc_food_15"
		}],
		[8, "Enchanting", , , {
			tinyIcon: "trade_engraving"
		}],
		[3, "Engineering", , , {
			tinyIcon: "trade_engineering"
		}],
		[7, "First Aid", , , {
			tinyIcon: "spell_holy_sealofsacrifice"
		}],
		[9, "Fishing", , , {
			tinyIcon: "trade_fishing"
		}],
		[11, "Inscription", , , {
			tinyIcon: "inv_inscription_tradeskill01"
		}],
		[10, "Jewelcrafting", , , {
			tinyIcon: "inv_misc_gem_01"
		}],
		[1, "Leatherworking", , , {
			tinyIcon: "inv_misc_armorkit_17"
		}],
		[2, "Tailoring", , , {
			tinyIcon: "trade_tailoring"
		}]]],
	[3, "Gems", , [
		[, "Colors"],
		[6, "Meta", , , {
			className: "gem1"
		}],
		[0, "Red", , , {
			className: "gem2"
		}],
		[1, "Blue", , , {
			className: "gem8"
		}],
		[2, "Yellow", , , {
			className: "gem4"
		}],
		[3, "Purple", , , {
			className: "gem10"
		}],
		[4, "Green", , , {
			className: "gem12"
		}],
		[5, "Orange", , , {
			className: "gem6"
		}],
		[8, "Prismatic", , , {
			className: "gem14"
		}],
		[, "Other"],
		[7, "Simple"]]],
	[15, "Miscellaneous", , [
		[-2, "Armor Tokens"],
		[3, "Holiday"],
		[0, "Junk"],
		[1, "Reagents"],
		[5, "Mounts"],
		[-7, "Flying Mounts"],
		[-6, "Combat Pets"],
		[2, "Companions"],
		[4, "Other"]]],
	[10, "Currency"],
	[12, "Quest"],
	[13, "Keys"]];
var mn_itemSets = [
	[, "By Class"],
	[6, "Death Knight", , , {
		className: "c6",
		tinyIcon: "class_deathknight"
	}],
	[11, "Druid", , , {
		className: "c11",
		tinyIcon: "class_druid"
	}],
	[3, "Hunter", , , {
		className: "c3",
		tinyIcon: "class_hunter"
	}],
	[8, "Mage", , , {
		className: "c8",
		tinyIcon: "class_mage"
	}],
	[2, "Paladin", , , {
		className: "c2",
		tinyIcon: "class_paladin"
	}],
	[5, "Priest", , , {
		className: "c5",
		tinyIcon: "class_priest"
	}],
	[4, "Rogue", , , {
		className: "c4",
		tinyIcon: "class_rogue"
	}],
	[7, "Shaman", , , {
		className: "c7",
		tinyIcon: "class_shaman"
	}],
	[9, "Warlock", , , {
		className: "c9",
		tinyIcon: "class_warlock"
	}],
	[1, "Warrior", , , {
		className: "c1",
		tinyIcon: "class_warrior"
	}]];
var mn_npcs = [
	[1, "Beasts"],
	[8, "Critters"],
	[3, "Demons"],
	[2, "Dragonkin"],
	[4, "Elementals"],
	[5, "Giants"],
	[7, "Humanoids"],
	[9, "Mechanicals"],
	[6, "Undead"],
	[10, "Uncategorized"]];
var mn_objects = [
	[9, "Books"],
	[3, "Containers"],
	[-5, "Footlockers"],
	[-3, "Herbs"],
	[-4, "Mineral Veins"],
	[-2, "Quest"]];
var mn_quests = [
	[, "Continents"],
	[0, "Eastern Kingdoms", , [
		[36, "Alterac Mountains"],
		[2839, "Alterac Valley"],
		[45, "Arathi Highlands"],
		[3, "Badlands"],
		[25, "Blackrock Mountain"],
		[4, "Blasted Lands"],
		[46, "Burning Steppes"],
		[279, "Dalaran Crater"],
		[41, "Deadwind Pass"],
		[2257, "Deeprun Tram"],
		[1, "Dun Morogh"],
		[10, "Duskwood"],
		[139, "Eastern Plaguelands"],
		[12, "Elwynn Forest"],
		[3430, "Eversong Woods"],
		[3433, "Ghostlands"],
		[133, "Gnomeregan"],
		[267, "Hillsbrad Foothills"],
		[1537, "Ironforge"],
		[4080, "Isle of Quel'Danas"],
		[131, "Kharanos"],
		[38, "Loch Modan"],
		[44, "Redridge Mountains"],
		[51, "Searing Gorge"],
		[236, "Shadowfang Keep"],
		[3487, "Silvermoon City"],
		[130, "Silverpine Forest"],
		[1519, "Stormwind City"],
		[33, "Stranglethorn Vale"],
		[8, "Swamp of Sorrows"],
		[47, "The Hinterlands"],
		[85, "Tirisfal Glades"],
		[1497, "Undercity"],
		[28, "Western Plaguelands"],
		[40, "Westfall"],
		[11, "Wetlands"]]],
	[1, "Kalimdor", , [
		[1939, "Abyssal Sands"],
		[331, "Ashenvale"],
		[16, "Azshara"],
		[3524, "Azuremyst Isle"],
		[3525, "Bloodmyst Isle"],
		[1941, "Caverns of Time"],
		[148, "Darkshore"],
		[393, "Darkspear Strand"],
		[1657, "Darnassus"],
		[405, "Desolace"],
		[14, "Durotar"],
		[15, "Dustwallow Marsh"],
		[361, "Felwood"],
		[357, "Feralas"],
		[493, "Moonglade"],
		[215, "Mulgore"],
		[1637, "Orgrimmar"],
		[1377, "Silithus"],
		[406, "Stonetalon Mountains"],
		[440, "Tanaris"],
		[141, "Teldrassil"],
		[17, "The Barrens"],
		[3557, "The Exodar"],
		[400, "Thousand Needles"],
		[1638, "Thunder Bluff"],
		[1216, "Timbermaw Hold"],
		[490, "Un'Goro Crater"],
		[618, "Winterspring"],
		[978, "Zul'Farrak"]]],
	[8, "Outland", , [
		[3896, "Aldor Rise"],
		[3522, "Blade's Edge Mountains"],
		[3905, "Coilfang Reservoir"],
		[3483, "Hellfire Peninsula"],
		[4095, "Magisters' Terrace"],
		[3518, "Nagrand"],
		[3523, "Netherstorm"],
		[3520, "Shadowmoon Valley"],
		[3703, "Shattrath City"],
		[3679, "Skettis"],
		[3519, "Terokkar Forest"],
		[3846, "The Arcatraz"],
		[3840, "The Black Temple"],
		[3842, "The Eye"],
		[3521, "Zangarmarsh"]]],
	[10, "Northrend", , [
		[3537, "Borean Tundra"],
		[4024, "Coldarra"],
		[4395, "Dalaran"],
		[4613, "Dalaran City"],
		[65, "Dragonblight"],
		[394, "Grizzly Hills"],
		[495, "Howling Fjord"],
		[210, "Icecrown"],
		[3711, "Sholazar Basin"],
		[67, "The Storm Peaks"],
		[4197, "Wintergrasp"],
		[66, "Zul'Drak"]]],
	[, "Other"],
	[6, "Battlegrounds", , [
		[2597, "Alterac Valley"],
		[3358, "Arathi Basin"],
		[-25, "Battlegrounds"],
		[3820, "Eye of the Storm"],
		[4710, "Isle of Conquest"],
		[4384, "Strand of the Ancients"],
		[3277, "Warsong Gulch"]]],
	[4, "Classes", , [
		[-372, "Death Knight"],
		[-263, "Druid"],
		[-261, "Hunter"],
		[-161, "Mage"],
		[-141, "Paladin"],
		[-262, "Priest"],
		[-162, "Rogue"],
		[-82, "Shaman"],
		[-61, "Warlock"],
		[-81, "Warrior"]]],
	[2, "Dungeons", , [
		[4494, "Ahn'kahet: The Old Kingdom"],
		[3790, "Auchenai Crypts"],
		[4277, "Azjol-Nerub"],
		[719, "Blackfathom Deeps"],
		[1584, "Blackrock Depths"],
		[1583, "Blackrock Spire"],
		[2557, "Dire Maul"],
		[4196, "Drak'Tharon Keep"],
		[4416, "Gundrak"],
		[4272, "Halls of Lightning"],
		[4820, "Halls of Reflection"],
		[4264, "Halls of Stone"],
		[3535, "Hellfire Citadel"],
		[3562, "Hellfire Ramparts"],
		[4131, "Magisters' Terrace"],
		[3792, "Mana-Tombs"],
		[2100, "Maraudon"],
		[2367, "Old Hillsbrad Foothills"],
		[4813, "Pit of Saron"],
		[2437, "Ragefire Chasm"],
		[722, "Razorfen Downs"],
		[491, "Razorfen Kraul"],
		[796, "Scarlet Monastery"],
		[2057, "Scholomance"],
		[3791, "Sethekk Halls"],
		[3789, "Shadow Labyrinth"],
		[209, "Shadowfang Keep"],
		[2017, "Stratholme"],
		[1417, "Sunken Temple"],
		[2366, "The Black Morass"],
		[3713, "The Blood Furnace"],
		[3847, "The Botanica"],
		[4100, "The Culling of Stratholme"],
		[1581, "The Deadmines"],
		[4809, "The Forge of Souls"],
		[3849, "The Mechanar"],
		[4265, "The Nexus"],
		[4228, "The Oculus"],
		[3714, "The Shattered Halls"],
		[3717, "The Slave Pens"],
		[3715, "The Steamvault"],
		[717, "The Stockade"],
		[3716, "The Underbog"],
		[4415, "The Violet Hold"],
		[4723, "Trial of the Champion"],
		[1337, "Uldaman"],
		[206, "Utgarde Keep"],
		[1196, "Utgarde Pinnacle"],
		[718, "Wailing Caverns"]]],
	[5, "Professions", , [
		[-181, "Alchemy"],
		[-121, "Blacksmithing"],
		[-304, "Cooking"],
		[-201, "Engineering"],
		[-324, "First Aid"],
		[-101, "Fishing"],
		[-24, "Herbalism"],
		[-371, "Inscription"],
		[-373, "Jewelcrafting"],
		[-182, "Leatherworking"],
		[-264, "Tailoring"]]],
	[3, "Raids", , [
		[2677, "Blackwing Lair"],
		[3606, "Hyjal Summit"],
		[4812, "Icecrown Citadel"],
		[3457, "Karazhan"],
		[3836, "Magtheridon's Lair"],
		[2717, "Molten Core"],
		[3456, "Naxxramas"],
		[2159, "Onyxia's Lair"],
		[3429, "Ruins of Ahn'Qiraj"],
		[3607, "Serpentshrine Cavern"],
		[4075, "Sunwell Plateau"],
		[3845, "Tempest Keep"],
		[3428, "Temple of Ahn'Qiraj"],
		[4500, "The Eye of Eternity"],
		[4493, "The Obsidian Sanctum"],
		[4987, "The Ruby Sanctum"],
		[4722, "Trial of the Crusader"],
		[4273, "Ulduar"],
		[3805, "Zul'Aman"],
		[1977, "Zul'Gurub"]]],
	[9, "World Events", , [
		[-370, "Brewfest"],
		[-1002, "Children's Week"],
		[-364, "Darkmoon Faire"],
		[-1007, "Day of the Dead"],
		[-1003, "Hallow's End"],
		[-1005, "Harvest Festival"],
		[-1004, "Love is in the Air"],
		[-366, "Lunar Festival"],
		[-369, "Midsummer"],
		[-1006, "New Year's Eve"],
		[-1008, "Pilgrim's Bounty"],
		[-374, "Noblegarden"],
		[-1001, "Winter Veil"]]],
	[7, "Miscellaneous", , [
		[-365, "Ahn'Qiraj War Effort"],
		[-1010, "Dungeon Finder"],
		[-1, "Epic"],
		[-344, "Legendary"],
		[-367, "Reputation"],
		[-368, "Scourge Invasion"],
		[-241, "Tournament"]]],
	[-2, "Uncategorized"]];
var mn_titles = [
	[0, "General"],
	[4, "Quests"],
	[1, "Player vs. Player"],
	[3, "Dungeons & Raids"],
	[5, "Professions"],
	[2, "Reputation"],
	[6, "World Events"]];
var mn_skills = [
	[, "Professions", "/skills=11"],
	[171, "Alchemy", "/skill=171", , {
		tinyIcon: "trade_alchemy"
	}],
	[164, "Blacksmithing", "/skill=164", , {
		tinyIcon: "trade_blacksmithing"
	}],
	[333, "Enchanting", "/skill=333", , {
		tinyIcon: "trade_engraving"
	}],
	[202, "Engineering", "/skill=202", , {
		tinyIcon: "trade_engineering"
	}],
	[182, "Herbalism", "/skill=182", , {
		tinyIcon: "spell_nature_naturetouchgrow"
	}],
	[773, "Inscription", "/skill=773", , {
		tinyIcon: "inv_inscription_tradeskill01"
	}],
	[755, "Jewelcrafting", "/skill=755", , {
		tinyIcon: "inv_misc_gem_01"
	}],
	[165, "Leatherworking", "/skill=165", , {
		tinyIcon: "inv_misc_armorkit_17"
	}],
	[186, "Mining", "/skill=186", , {
		tinyIcon: "trade_mining"
	}],
	[393, "Skinning", "/skill=393", , {
		tinyIcon: "inv_misc_pelt_wolf_01"
	}],
	[197, "Tailoring", "/skill=197", , {
		tinyIcon: "trade_tailoring"
	}],
	[, "Secondary Skills", "/skills=9"],
	[185, "Cooking", "/skill=185", , {
		tinyIcon: "inv_misc_food_15"
	}],
	[129, "First Aid", "/skill=129", , {
		tinyIcon: "spell_holy_sealofsacrifice"
	}],
	[356, "Fishing", "/skill=356", , {
		tinyIcon: "trade_fishing"
	}],
	[762, "Riding", "/skill=762", , {
		tinyIcon: "spell_nature_swiftness"
	}],
	[, "Other"],
	[8, "Armor Proficiencies", "/skills=8"],
	[10, "Languages", "/skills=10"],
	[-4, "Racial Traits", "/skills=-4"],
	[6, "Weapon Skills", "/skills=6"]];
var mn_spells = [
	[, "Abilities & Talents"],
	[7, "Abilities", , [
		[6, "Death Knight", , [
			[770, "Blood", , , {
				tinyIcon: "Spell_Deathknight_BloodPresence"
			}],
			[771, "Frost", , , {
				tinyIcon: "Spell_Deathknight_FrostPresence"
			}],
			[772, "Unholy", , , {
				tinyIcon: "Spell_Deathknight_UnholyPresence"
			}],
			[776, "Runeforging"]], {
			className: "c6",
			tinyIcon: "class_deathknight"
		}],
		[11, "Druid", , [
			[574, "Balance", , , {
				tinyIcon: "Spell_Nature_StarFall"
			}],
			[134, "Feral Combat", , , {
				tinyIcon: "Ability_Racial_BearForm"
			}],
			[573, "Restoration", , , {
				tinyIcon: "Spell_Nature_HealingTouch"
			}]], {
			className: "c11",
			tinyIcon: "class_druid"
		}],
		[3, "Hunter", , [
			[50, "Beast Mastery", , , {
				tinyIcon: "Ability_Hunter_BeastTaming"
			}],
			[163, "Marksmanship", , , {
				tinyIcon: "Ability_Marksmanship"
			}],
			[51, "Survival", , , {
				tinyIcon: "Ability_Hunter_SwiftStrike"
			}]], {
			className: "c3",
			tinyIcon: "class_hunter"
		}],
		[8, "Mage", , [
			[237, "Arcane", , , {
				tinyIcon: "Spell_Holy_MagicalSentry"
			}],
			[8, "Fire", , , {
				tinyIcon: "Spell_Fire_FireBolt02"
			}],
			[6, "Frost", , , {
				tinyIcon: "Spell_Frost_FrostBolt02"
			}]], {
			className: "c8",
			tinyIcon: "class_mage"
		}],
		[2, "Paladin", , [
			[594, "Holy", , , {
				tinyIcon: "Spell_Holy_HolyBolt"
			}],
			[267, "Protection", , , {
				tinyIcon: "Spell_Holy_DevotionAura"
			}],
			[184, "Retribution", , , {
				tinyIcon: "Spell_Holy_AuraOfLight"
			}]], {
			className: "c2",
			tinyIcon: "class_paladin"
		}],
		[5, "Priest", , [
			[613, "Discipline", , , {
				tinyIcon: "Spell_Holy_WordFortitude"
			}],
			[56, "Holy", , , {
				tinyIcon: "Spell_Holy_GuardianSpirit"
			}],
			[78, "Shadow Magic", , , {
				tinyIcon: "Spell_Shadow_ShadowWordPain"
			}]], {
			className: "c5",
			tinyIcon: "class_priest"
		}],
		[4, "Rogue", , [
			[253, "Assassination", , , {
				tinyIcon: "Ability_Rogue_Eviscerate"
			}],
			[38, "Combat", , , {
				tinyIcon: "Ability_BackStab"
			}],
			[633, "Lockpicking", , , {
				tinyIcon: "spell_nature_moonkey"
			}],
			[39, "Subtlety", , , {
				tinyIcon: "Ability_Stealth"
			}]], {
			className: "c4",
			tinyIcon: "class_rogue"
		}],
		[7, "Shaman", , [
			[375, "Elemental Combat", , , {
				tinyIcon: "Spell_Nature_Lightning"
			}],
			[373, "Enhancement", , , {
				tinyIcon: "Spell_Nature_LightningShield"
			}],
			[374, "Restoration", , , {
				tinyIcon: "Spell_Nature_MagicImmunity"
			}]], {
			className: "c7",
			tinyIcon: "class_shaman"
		}],
		[9, "Warlock", , [
			[355, "Affliction", , , {
				tinyIcon: "Spell_Shadow_DeathCoil"
			}],
			[354, "Demonology", , , {
				tinyIcon: "Spell_Shadow_Metamorphosis"
			}],
			[593, "Destruction", , , {
				tinyIcon: "Spell_Shadow_RainOfFire"
			}]], {
			className: "c9",
			tinyIcon: "class_warlock"
		}],
		[1, "Warrior", , [
			[26, "Arms", , , {
				tinyIcon: "Ability_Rogue_Eviscerate"
			}],
			[256, "Fury", , , {
				tinyIcon: "Ability_Warrior_InnerRage"
			}],
			[257, "Protection", , , {
				tinyIcon: "INV_Shield_06"
			}]], {
			className: "c1",
			tinyIcon: "class_warrior"
		}]]],
	[-2, "Talents", , [
		[6, "Death Knight", , [
			[770, "Blood", , , {
				tinyIcon: "Spell_Deathknight_BloodPresence"
			}],
			[771, "Frost", , , {
				tinyIcon: "Spell_Deathknight_FrostPresence"
			}],
			[772, "Unholy", , , {
				tinyIcon: "Spell_Deathknight_UnholyPresence"
			}]], {
			className: "c6",
			tinyIcon: "class_deathknight"
		}],
		[11, "Druid", , [
			[574, "Balance", , , {
				tinyIcon: "Spell_Nature_StarFall"
			}],
			[134, "Feral Combat", , , {
				tinyIcon: "Ability_Racial_BearForm"
			}],
			[573, "Restoration", , , {
				tinyIcon: "Spell_Nature_HealingTouch"
			}]], {
			className: "c11",
			tinyIcon: "class_druid"
		}],
		[3, "Hunter", , [
			[50, "Beast Mastery", , , {
				tinyIcon: "Ability_Hunter_BeastTaming"
			}],
			[163, "Marksmanship", , , {
				tinyIcon: "Ability_Marksmanship"
			}],
			[51, "Survival", , , {
				tinyIcon: "Ability_Hunter_SwiftStrike"
			}]], {
			className: "c3",
			tinyIcon: "class_hunter"
		}],
		[8, "Mage", , [
			[237, "Arcane", , , {
				tinyIcon: "Spell_Holy_MagicalSentry"
			}],
			[8, "Fire", , , {
				tinyIcon: "Spell_Fire_FireBolt02"
			}],
			[6, "Frost", , , {
				tinyIcon: "Spell_Frost_FrostBolt02"
			}]], {
			className: "c8",
			tinyIcon: "class_mage"
		}],
		[2, "Paladin", , [
			[594, "Holy", , , {
				tinyIcon: "Spell_Holy_HolyBolt"
			}],
			[267, "Protection", , , {
				tinyIcon: "Spell_Holy_DevotionAura"
			}],
			[184, "Retribution", , , {
				tinyIcon: "Spell_Holy_AuraOfLight"
			}]], {
			className: "c2",
			tinyIcon: "class_paladin"
		}],
		[5, "Priest", , [
			[613, "Discipline", , , {
				tinyIcon: "Spell_Holy_WordFortitude"
			}],
			[56, "Holy", , , {
				tinyIcon: "Spell_Holy_GuardianSpirit"
			}],
			[78, "Shadow Magic", , , {
				tinyIcon: "Spell_Shadow_ShadowWordPain"
			}]], {
			className: "c5",
			tinyIcon: "class_priest"
		}],
		[4, "Rogue", , [
			[253, "Assassination", , , {
				tinyIcon: "Ability_Rogue_Eviscerate"
			}],
			[38, "Combat", , , {
				tinyIcon: "Ability_BackStab"
			}],
			[39, "Subtlety", , , {
				tinyIcon: "Ability_Stealth"
			}]], {
			className: "c4",
			tinyIcon: "class_rogue"
		}],
		[7, "Shaman", , [
			[375, "Elemental Combat", , , {
				tinyIcon: "Spell_Nature_Lightning"
			}],
			[373, "Enhancement", , , {
				tinyIcon: "Spell_Nature_LightningShield"
			}],
			[374, "Restoration", , , {
				tinyIcon: "Spell_Nature_MagicImmunity"
			}]], {
			className: "c7",
			tinyIcon: "class_shaman"
		}],
		[9, "Warlock", , [
			[355, "Affliction", , , {
				tinyIcon: "Spell_Shadow_DeathCoil"
			}],
			[354, "Demonology", , , {
				tinyIcon: "Spell_Shadow_Metamorphosis"
			}],
			[593, "Destruction", , , {
				tinyIcon: "Spell_Shadow_RainOfFire"
			}]], {
			className: "c9",
			tinyIcon: "class_warlock"
		}],
		[1, "Warrior", , [
			[26, "Arms", , , {
				tinyIcon: "Ability_Rogue_Eviscerate"
			}],
			[256, "Fury", , , {
				tinyIcon: "Ability_Warrior_InnerRage"
			}],
			[257, "Protection", , , {
				tinyIcon: "INV_Shield_06"
			}]], {
			className: "c1",
			tinyIcon: "class_warrior"
		}]]],
	[-3, "Pet Abilities", , [
		[, "Death Knight"],
		[782, "Ghoul"],
		[, "Hunter"],
		[270, "Generic"],
		[653, "Bat"],
		[210, "Bear"],
		[655, "Bird of Prey"],
		[211, "Boar"],
		[213, "Carrion Bird"],
		[209, "Cat"],
		[780, "Chimaera"],
		[787, "Core Hound"],
		[214, "Crab"],
		[212, "Crocolisk"],
		[781, "Devilsaur"],
		[763, "Dragonhawk"],
		[215, "Gorilla"],
		[654, "Hyena"],
		[775, "Moth"],
		[764, "Nether Ray"],
		[217, "Raptor"],
		[767, "Ravager"],
		[786, "Rhino"],
		[236, "Scorpid"],
		[768, "Serpent"],
		[783, "Silithid"],
		[203, "Spider"],
		[788, "Spirit Beast"],
		[765, "Sporebat"],
		[218, "Tallstrider"],
		[251, "Turtle"],
		[766, "Warp Stalker"],
		[785, "Wasp"],
		[656, "Wind Serpent"],
		[208, "Wolf"],
		[784, "Worm"],
		[, "Warlock"],
		[761, "Felguard"],
		[189, "Felhunter"],
		[188, "Imp"],
		[205, "Succubus"],
		[204, "Voidwalker"]]],
	[-7, "Pet Talents", , [
		[411, "Cunning", , , {
			tinyIcon: "Ability_Hunter_CombatExperience"
		}],
		[410, "Ferocity", , , {
			tinyIcon: "Ability_Druid_Swipe"
		}],
		[409, "Tenacity", , , {
			tinyIcon: "Ability_Hunter_Pet_Bear"
		}]]],
	[-8, "NPC Abilities"],
	[, "Professions & Skills"],
	[11, "Professions", , [
		[171, "Alchemy", , , {
			tinyIcon: "trade_alchemy"
		}],
		[164, "Blacksmithing", , [
			[9788, "Armorsmithing"],
			[9787, "Weaponsmithing"],
			[17041, "Master Axesmithing"],
			[17040, "Master Hammersmithing"],
			[17039, "Master Swordsmithing"]], {
			tinyIcon: "trade_blacksmithing"
		}],
		[333, "Enchanting", , , {
			tinyIcon: "trade_engraving"
		}],
		[202, "Engineering", , [
			[20219, "Gnomish Engineering"],
			[20222, "Goblin Engineering"]], {
			tinyIcon: "trade_engineering"
		}],
		[182, "Herbalism", , , {
			tinyIcon: "spell_nature_naturetouchgrow"
		}],
		[773, "Inscription", , , {
			tinyIcon: "inv_inscription_tradeskill01"
		}],
		[755, "Jewelcrafting", , , {
			tinyIcon: "inv_misc_gem_01"
		}],
		[165, "Leatherworking", , [
			[10656, "Dragonscale Leatherworking"],
			[10658, "Elemental Leatherworking"],
			[10660, "Tribal Leatherworking"]], {
			tinyIcon: "inv_misc_armorkit_17"
		}],
		[186, "Mining", , , {
			tinyIcon: "trade_mining"
		}],
		[393, "Skinning", , , {
			tinyIcon: "inv_misc_pelt_wolf_01"
		}],
		[197, "Tailoring", , [
			[26798, "Mooncloth Tailoring"],
			[26801, "Shadoweave Tailoring"],
			[26797, "Spellfire Tailoring"]], {
			tinyIcon: "trade_tailoring"
		}]]],
	[9, "Secondary Skills", , [
		[185, "Cooking", , , {
			tinyIcon: "inv_misc_food_15"
		}],
		[129, "First Aid", , , {
			tinyIcon: "spell_holy_sealofsacrifice"
		}],
		[356, "Fishing", , , {
			tinyIcon: "trade_fishing"
		}],
		[762, "Riding", , , {
			tinyIcon: "spell_nature_swiftness"
		}]]],
	[, "Other"],
	[8, "Armor Proficiencies"],
	[-6, "Companions"],
	[-9, "GM Abilities"],
	[10, "Languages"],
	[-5, "Mounts"],
	[-4, "Racial Traits"],
	[6, "Weapon Skills"],
	[0, "Uncategorized"]];
var mn_zones = [
	[, "Continents"],
	[0, "Eastern Kingdoms"],
	[1, "Kalimdor"],
	[8, "Outland"],
	[10, "Northrend"],
	[, "Other"],
	[9, "Arenas"],
	[6, "Battlegrounds"],
	[2, "Dungeons", , [
		[0, "Classic"],
		[1, "The Burning Crusade"],
		[2, "Wrath of the Lich King"]]],
	[3, "Raids", , [
		[0, "Classic"],
		[1, "The Burning Crusade"],
		[2, "Wrath of the Lich King"]]]];
var mn_factions = [
	[1118, "Classic", , [
		[469, "Alliance"],
		[891, "Alliance Forces"],
		[67, "Horde"],
		[892, "Horde Forces"],
		[169, "Steamwheedle Cartel"]]],
	[980, "The Burning Crusade", , [
		[936, "Shattrath City"]]],
	[1097, "Wrath of the Lich King", , [
		[1037, "Alliance Vanguard"],
		[1052, "Horde Expedition"],
		[1117, "Sholazar Basin"]]],
	[0, "Other"]];
var mn_pets = [
	[2, "Cunning", , , {
		tinyIcon: "Ability_Hunter_CombatExperience"
	}],
	[0, "Ferocity", , , {
		tinyIcon: "Ability_Druid_Swipe"
	}],
	[1, "Tenacity", , , {
		tinyIcon: "Ability_Hunter_Pet_Bear"
	}]];
var mn_achievements = [
	[92, "General"],
	[96, "Quests", , [
		[14861, "Classic"],
		[14862, "The Burning Crusade"],
		[14863, "Wrath of the Lich King"]]],
	[97, "Exploration", , [
		[14777, "Eastern Kingdoms"],
		[14778, "Kalimdor"],
		[14779, "Outland"],
		[14780, "Northrend"]]],
	[95, "Player vs. Player", , [
		[165, "Arena"],
		[14801, "Alterac Valley"],
		[14802, "Arathi Basin"],
		[14803, "Eye of the Storm"],
		[14804, "Warsong Gulch"],
		[14881, "Strand of the Ancients"],
		[14901, "Wintergrasp"],
		[15003, "Isle of Conquest"]]],
	[168, "Dungeons & Raids", , [
		[14808, "Classic"],
		[14805, "The Burning Crusade"],
		[14806, "Lich King Dungeon"],
		[14921, "Lich King Heroic"],
		[14922, "Lich King 10-Player Raid"],
		[14923, "Lich King 25-Player Raid"],
		[14961, "Secrets of Ulduar 10-Player Raid"],
		[14962, "Secrets of Ulduar 25-Player Raid"],
		[15001, "Call of the Crusade 10-Player Raid"],
		[15002, "Call of the Crusade 25-Player Raid"],
		[15041, "Fall of the Lich King 10-Player Raid"],
		[15042, "Fall of the Lich King 25-Player Raid"]]],
	[169, "Professions", , [
		[170, "Cooking"],
		[171, "Fishing"],
		[172, "First Aid"]]],
	[201, "Reputation", , [
		[14864, "Classic"],
		[14865, "The Burning Crusade"],
		[14866, "Wrath of the Lich King"]]],
	[155, "World Events", , [
		[160, "Lunar Festival"],
		[187, "Love is in the Air"],
		[159, "Noblegarden"],
		[163, "Children's Week"],
		[161, "Midsummer"],
		[162, "Brewfest"],
		[158, "Hallow's End"],
		[14981, "Pilgrim's Bounty"],
		[156, "Winter Veil"],
		[14941, "Argent Tournament"]]],
	[81, "Feats of Strength"]];
var mn_statistics = [
	[130, "Character", , [
		[140, "Wealth"],
		[145, "Consumables"],
		[147, "Reputation"],
		[191, "Gear"]]],
	[141, "Combat"],
	[128, "Kills", , [
		[135, "Creatures"],
		[136, "Honorable Kills"],
		[137, "Killing Blows"]]],
	[122, "Deaths", , [
		[123, "Arenas"],
		[124, "Battlegrounds"],
		[125, "Dungeons"],
		[126, "World"],
		[127, "Resurrection"]]],
	[133, "Quests"],
	[14807, "Dungeons & Raids", , [
		[14821, "Classic"],
		[14822, "The Burning Crusade"],
		[14823, "Wrath of the Lich King"],
		[14963, "Secrets of Ulduar"],
		[15021, "Call of the Crusade"],
		[15062, "Fall of the Lich King"]]],
	[132, "Skills", , [
		[178, "Secondary Skills"],
		[173, "Professions"]]],
	[134, "Travel"],
	[131, "Social"],
	[21, "Player vs. Player", , [
		[152, "Rated Arenas"],
		[153, "Battlegrounds"],
		[154, "World"]]]];
var mn_talentCalc = [
	[6, "Death Knight", "/talent#j", , {
		className: "c6",
		tinyIcon: "class_deathknight"
	}],
	[11, "Druid", "/talent#0", , {
		className: "c11",
		tinyIcon: "class_druid"
	}],
	[3, "Hunter", "/talent#c", , {
		className: "c3",
		tinyIcon: "class_hunter"
	}],
	[8, "Mage", "/talent#o", , {
		className: "c8",
		tinyIcon: "class_mage"
	}],
	[2, "Paladin", "/talent#s", , {
		className: "c2",
		tinyIcon: "class_paladin"
	}],
	[5, "Priest", "/talent#b", , {
		className: "c5",
		tinyIcon: "class_priest"
	}],
	[4, "Rogue", "/talent#f", , {
		className: "c4",
		tinyIcon: "class_rogue"
	}],
	[7, "Shaman", "/talent#h", , {
		className: "c7",
		tinyIcon: "class_shaman"
	}],
	[9, "Warlock", "/talent#I", , {
		className: "c9",
		tinyIcon: "class_warlock"
	}],
	[1, "Warrior", "/talent#L", , {
		className: "c1",
		tinyIcon: "class_warrior"
	}]];
var mn_petCalc = [
	[, "Cunning", , , {
		tinyIcon: "Ability_Hunter_CombatExperience"
	}],
	[24, "Bat", "/petcalc#MR", , {
		tinyIcon: "Ability_Hunter_Pet_Bat"
	}],
	[26, "Bird of Prey", "/petcalc#Mb", , {
		tinyIcon: "Ability_Hunter_Pet_Owl"
	}],
	[38, "Chimaera", "/petcalc#cw", , {
		tinyIcon: "Ability_Hunter_Pet_Chimera"
	}],
	[30, "Dragonhawk", "/petcalc#c0", , {
		tinyIcon: "Ability_Hunter_Pet_DragonHawk"
	}],
	[34, "Nether Ray", "/petcalc#cR", , {
		tinyIcon: "Ability_Hunter_Pet_NetherRay"
	}],
	[31, "Ravager", "/petcalc#cM", , {
		tinyIcon: "Ability_Hunter_Pet_Ravager"
	}],
	[35, "Serpent", "/petcalc#ca", , {
		tinyIcon: "Spell_Nature_GuardianWard"
	}],
	[41, "Silithid", "/petcalc#mM", , {
		tinyIcon: "Ability_Hunter_Pet_Silithid"
	}],
	[3, "Spider", "/petcalc#0o", , {
		tinyIcon: "Ability_Hunter_Pet_Spider"
	}],
	[33, "Sporebat", "/petcalc#co", , {
		tinyIcon: "Ability_Hunter_Pet_Sporebat"
	}],
	[27, "Wind Serpent", "/petcalc#Mr", , {
		tinyIcon: "Ability_Hunter_Pet_WindSerpent"
	}],
	[, "Ferocity", , , {
		tinyIcon: "Ability_Druid_Swipe"
	}],
	[7, "Carrion Bird", "/petcalc#0r", , {
		tinyIcon: "Ability_Hunter_Pet_Vulture"
	}],
	[2, "Cat", "/petcalc#0m", , {
		tinyIcon: "Ability_Hunter_Pet_Cat"
	}],
	[45, "Core Hound", "/petcalc#ma", , {
		tinyIcon: "Ability_Hunter_Pet_CoreHound"
	}],
	[39, "Devilsaur", "/petcalc#ch", , {
		tinyIcon: "Ability_Hunter_Pet_Devilsaur"
	}],
	[25, "Hyena", "/petcalc#Ma", , {
		tinyIcon: "Ability_Hunter_Pet_Hyena"
	}],
	[37, "Moth", "/petcalc#cr", , {
		tinyIcon: "Ability_Hunter_Pet_Moth"
	}],
	[11, "Raptor", "/petcalc#zM", , {
		tinyIcon: "Ability_Hunter_Pet_Raptor"
	}],
	[46, "Spirit Beast", "/petcalc#mb", , {
		tinyIcon: "Ability_Druid_PrimalPrecision"
	}],
	[12, "Tallstrider", "/petcalc#zm", , {
		tinyIcon: "Ability_Hunter_Pet_TallStrider"
	}],
	[44, "Wasp", "/petcalc#mR", , {
		tinyIcon: "Ability_Hunter_Pet_Wasp"
	}],
	[1, "Wolf", "/petcalc#0M", , {
		tinyIcon: "Ability_Hunter_Pet_Wolf"
	}],
	[, "Tenacity", , , {
		tinyIcon: "Ability_Hunter_Pet_Bear"
	}],
	[4, "Bear", "/petcalc#0R", , {
		tinyIcon: "Ability_Hunter_Pet_Bear"
	}],
	[5, "Boar", "/petcalc#0a", , {
		tinyIcon: "Ability_Hunter_Pet_Boar"
	}],
	[8, "Crab", "/petcalc#0w", , {
		tinyIcon: "Ability_Hunter_Pet_Crab"
	}],
	[6, "Crocolisk", "/petcalc#0b", , {
		tinyIcon: "Ability_Hunter_Pet_Crocolisk"
	}],
	[9, "Gorilla", "/petcalc#0h", , {
		tinyIcon: "Ability_Hunter_Pet_Gorilla"
	}],
	[43, "Rhino", "/petcalc#mo", , {
		tinyIcon: "Ability_Hunter_Pet_Rhino"
	}],
	[20, "Scorpid", "/petcalc#M0", , {
		tinyIcon: "Ability_Hunter_Pet_Scorpid"
	}],
	[21, "Turtle", "/petcalc#MM", , {
		tinyIcon: "Ability_Hunter_Pet_Turtle"
	}],
	[32, "Warp Stalker", "/petcalc#cm", , {
		tinyIcon: "Ability_Hunter_Pet_WarpStalker"
	}],
	[42, "Worm", "/petcalc#mm", , {
		tinyIcon: "Ability_Hunter_Pet_Worm"
	}]];
var mn_holidays = [
	[1, "Holidays", "/events=1"],
	[2, "Recurring", "/events=2"],
	[3, "Player vs. Player", "/events=3"]];
var mn_database = [
	[9, "Achievements", "/achievements", mn_achievements],
	[12, "Classes", "/classes", mn_classes],
	[7, "Factions", "/factions", mn_factions],
	[8, "Hunter Pets", "/pets", mn_pets],
	[2, "Item Sets", "/itemsets", mn_itemSets],
	[0, "Items", "/items", mn_items],
	[4, "NPCs", "/npcs", mn_npcs],
	[5, "Objects", "/objects", mn_objects],
	[14, "Professions & Skills", "/skills", mn_skills],
	[3, "Quests", "/quests", mn_quests],
	[13, "Races", "/races", mn_races],
	[1, "Spells", "/spells", mn_spells],
	[15, "Statistics", "/statistics", mn_statistics],
	[10, "Titles", "/titles", mn_titles],
	[11, "World Events", "/events", mn_holidays],
	[6, "Zones", "/zones", mn_zones]];
var mn_tools = [
	[0, "Talent Calculator", "/talent", mn_talentCalc],
	[2, "Hunter Pet Calculator", "/petcalc", mn_petCalc],
	[3, "Item Comparison", "/compare"],
	[5, "Profiler", "/profiles"],
	[1, "Maps", "/maps"],
	[, "Other"],
	[6, "Guides", "", [
		[, "Expansions"],
		["cataclysm", "Cataclysm", "/guide=cataclysm"],
		["wotlk", "Wrath of the Lich King", "/guide=wotlk"],
		[, "Patches"],
		["3.3", "3.3: Fall of the Lich King", "/guide=3.3"],
		[, "World Events"],
		["midsummer-fire-festival", "Midsummer Fire Festival", "/guide=midsummer-fire-festival"],
		["childrens-week", "Children's Week", "/guide=childrens-week"],
		["noblegarden", "Noblegarden", "/guide=noblegarden"],
		["lunar-festival", "Lunar Festival", "/guide=lunar-festival"],
		["love-is-in-the-air", "Love is in the Air", "/guide=love-is-in-the-air"],
		["winter-veil", "Winter Veil", "/guide=winter-veil"],
		["pilgrims-bounty", "Pilgrim's Bounty", "/guide=pilgrims-bounty"]]],
	[4, "Patch Notes", "", [
		[, "Cataclysm"],
		[16, "Beta", "/patchnotes=cataclysm"],
		[, "Wrath of the Lich King"],
		[15, "3.3.5", "/patchnotes=3.3.5"],
		[14, "3.3.3", "/patchnotes=3.3.3"],
		[13, "3.3.2", "/patchnotes=3.3.2"],
		[12, "3.3.0", "/patchnotes=3.3.0"],
		[0, "3.2.2", "/patchnotes=3.2.2"],
		[1, "3.2.0", "/patchnotes=3.2.0"],
		[2, "3.1.3", "/patchnotes=3.1.3"],
		[3, "3.1.2", "/patchnotes=3.1.2"],
		[4, "3.1.0", "/patchnotes=3.1.0"],
		[5, "3.0.9", "/patchnotes=3.0.9"],
		[6, "3.0.8", "/patchnotes=3.0.8"],
		[7, "3.0.3", "/patchnotes=3.0.3"],
		[8, "3.0.2", "/patchnotes=3.0.2"],
		[, "The Burning Crusade"],
		[9, "2.4.3", "/patchnotes=2.4.3"],
		[10, "2.4.2", "/patchnotes=2.4.2"],
		[11, "2.4.0", "/patchnotes=2.4.0"]]],
	[8, "Utilities", , [
		[, "Database"],
		[0, "Latest Additions", "/latest-additions"],
		[2, "Latest Comments", "/latest-comments"],
		[3, "Latest Screenshots", "/latest-screenshots"],
		[11, "Latest Videos", "/latest-videos"],
		[9, "New Items in Patch", , [
			[30300, "3.3", "/items?filter=cr=82;crs=0;crv=3.3;gb=2"],
			[30200, "3.2", "/items?filter=cr=82;crs=0;crv=3.2;gb=2"],
			[30100, "3.1", "/items?filter=cr=82;crs=0;crv=3.1;gb=2"]]],
		[4, "Random Page", "/random"],
		[5, "Unrated Comments", "/unrated-comments"],
		[, "Forums"],
		[6, "Latest Replies", "/latest-replies"],
		[7, "Latest Topics", "/latest-topics"],
		[8, "Unanswered Topics", "/unanswered-topics"],
		[, "Blog"],
		[10, "Latest Comments", "/latest-blog-comments", null, {
			breadcrumb: "Latest Blog Comments"
		}]]]];
var mn_forums = [
	[, "World of Warcraft"],
	[0, "WoW General", , , {
		icon: "https://static.wowhead.com/images/forums/icons/general.png"
	}],
	[16, "WoW Help", , , {
		icon: "https://static.wowhead.com/images/forums/icons/wowhelp.png"
	}],
	[21, "Cataclysm", , , {
		icon: "https://static.wowhead.com/images/forums/icons/cata.png"
	}],
	[-2, "Classes", "", [
		[18, "Death Knight", , , {
			className: "c6",
			tinyIcon: "class_deathknight"
		}],
		[3, "Druid", , , {
			className: "c11",
			tinyIcon: "class_druid"
		}],
		[4, "Hunter", , , {
			className: "c3",
			tinyIcon: "class_hunter"
		}],
		[6, "Mage", , , {
			className: "c8",
			tinyIcon: "class_mage"
		}],
		[7, "Paladin", , , {
			className: "c2",
			tinyIcon: "class_paladin"
		}],
		[8, "Priest", , , {
			className: "c5",
			tinyIcon: "class_priest"
		}],
		[5, "Rogue", , , {
			className: "c4",
			tinyIcon: "class_rogue"
		}],
		[9, "Shaman", , , {
			className: "c7",
			tinyIcon: "class_shaman"
		}],
		[10, "Warlock", , , {
			className: "c9",
			tinyIcon: "class_warlock"
		}],
		[11, "Warrior", , , {
			className: "c1",
			tinyIcon: "class_warrior"
		}]], {
		icon: "https://static.wowhead.com/images/forums/icons/classes.png"
	}],
	[14, "Dungeons & Raids", , , {
		icon: "https://static.wowhead.com/images/forums/icons/raids.png"
	}],
	[15, "PvP", , , {
		icon: "https://static.wowhead.com/images/forums/icons/pvp.png"
	}],
	[13, "Professions", , , {
		icon: "https://static.wowhead.com/images/forums/icons/professions.png"
	}],
	[12, "UI & Macros", , , {
		icon: "https://static.wowhead.com/images/forums/icons/ui.png"
	}],
	[19, "Lore & Roleplaying", , , {
		icon: "https://static.wowhead.com/images/forums/icons/lore.png"
	}],
	[17, "Guild Recruitment", , , {
		icon: "https://static.wowhead.com/images/forums/icons/recruitment.png"
	}],
	[20, "Theorycrafting", , , {
		icon: "https://static.wowhead.com/images/forums/icons/theorycrafting.png"
	}],
	[, "Other"],
	[1, "Wowhead Feedback", , , {
		icon: "https://static.wowhead.com/images/forums/icons/feedback.png"
	}],
	[22, "WoW Official Magazine", , , {
		icon: "https://static.wowhead.com/images/forums/icons/magazine.png"
	}],
	[23, "StarCraft II", , , {
		icon: "https://static.wowhead.com/images/forums/icons/sc2.png"
	}],
	[24, "Diablo III", , , {
		icon: "https://static.wowhead.com/images/forums/icons/diablo3.png"
	}],
	[2, "Off-Topic", , , {
		icon: "https://static.wowhead.com/images/forums/icons/offtopic.png"
	}],
	[, "Private"],
	[1337, "Wowhead Dev", null, null, {
		requiredAccess: 50,
		icon: "https://static.wowhead.com/images/forums/icons/dev.png"
	}],
	[101, "Wowhead Staff", null, null, {
		requiredAccess: 1726,
		icon: "https://static.wowhead.com/images/forums/icons/staff.png"
	}],
	[100, "Test", null, null, {
		requiredAccess: 50,
		icon: "https://static.wowhead.com/images/forums/icons/test.png"
	}]];
var mn_community = [
	[3, "Forums", "/forums", mn_forums],
	[7, "News / Blog", "/blog"],
	[1, "Contests", "/contests"],
	[4, "IRC Channel", "/irc"],
	[, "Social"],
	[6, "Facebook Page", "http://facebook.com/Wowhead", null, {
		icon: "https://static.wowhead.com/images/icons/facebook.gif"
	}],
	[5, "Twitter Page", "http://twitter.com/Wowhead", null, {
		icon: "https://static.wowhead.com/images/icons/twitter.gif"
	}]];
var mn_more = [
	[, "All About Wowhead"],
	[0, "About Us & Contact", "/aboutus"],
	[14, "Advertise", "/advertise"],
	[3, "FAQ", "/faq"],
	[13, "Help", , [
		[0, "Commenting and You", "/help=commenting-and-you"],
		[5, "Item Comparison", "/help=item-comparison"],
		[1, "Model Viewer", "/help=modelviewer"],
		[6, "Profiler", "/help=profiler"],
		[2, "Screenshots: Tips & Tricks", "/help=screenshots-tips-tricks"],
		[3, "Stat Weighting", "/help=stat-weighting"],
		[4, "Talent Calculator", "/help=talent-calculator"]]],
	[12, "Job Opportunities", "/jobs"],
	[4, "Premium Subscription", "/premium"],
	[8, "Search Plugins", "/searchplugins"],
	[15, "Site Logos", "/logos"],
	[7, "What's New", "/whats-new"],
	[2, "Wowhead Client", "/client"],
	[, "Goodies for Your Site"],
	[16, "Search Box", "/searchbox"],
	[10, "Tooltips", "/tooltips"],
	[, "Even More"],
	[99, "LMWHTFY", "http://www.lmwhtfy.com"],
	[4, "Wowhead Store", "http://store.wowhead.com/"],
	[5, "Network Sites", , [
		[99, "ZAM", "http://www.zam.com/", [
			[99, "Aion", "http://aion.zam.com"],
			[99, "Dark Age of Camelot", "http://camelot.allakhazam.com"],
			[99, "EVE Online", "http://eve.allakhazam.com"],
			[99, "EverQuest", "http://everquest.allakhazam.com"],
			[99, "EverQuest II", "http://eq2.allakhazam.com"],
			[99, "EverQuest Online Adventures", "http://eqoa.allakhazam.com"],
			[99, "Final Fantasy XI", "http://ffxi.allakhazam.com"],
			[99, "Final Fantasy XIV", "http://ffxiv.zam.com"],
			[99, "FreeRealms", "http://fr.zam.com"],
			[99, "Legends of Norrath", "http://lon.allakhazam.com"],
			[99, "Lord of the Rings Online", "http://lotro.allakhazam.com"],
			[99, "Star Wars Galaxies", "http://swg.allakhazam.com"],
			[99, "Warhammer Online", "http://war.allakhazam.com"],
			[99, "World of Warcraft", "http://wow.allakhazam.com"]]],
		[99, "MMOUI", "http://www.mmoui.com/", [
			[99, "EverQuest", "http://www.eqinterface.com"],
			[99, "EverQuest II", "http://www.eq2interface.com"],
			[99, "Lord of the Rings Online", "http://www.lotrointerface.com"],
			[99, "Vanguard: Saga of Heroes", "http://www.vginterface.com"],
			[99, "Warhammer Online", "http://war.mmoui.com"],
			[99, "World of Warcraft", "http://www.wowinterface.com"]]],
		[99, "Online Gaming Radio", "http://www.onlinegamingradio.com/"],
		[99, "TankSpot", "http://www.tankspot.com/"],
		[99, "Thottbot", "http://www.thottbot.com/"]]]];
var mn_path = [
	[0, "Database", , mn_database],
	[1, "Tools", , mn_tools],
	[3, "Community", , mn_community],
	[2, "More", , mn_more]];
