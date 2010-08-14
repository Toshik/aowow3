var U_GROUP_TESTER = 1;
var U_GROUP_ADMIN = 2;
var U_GROUP_EDITOR = 4;
var U_GROUP_MOD = 8;
var U_GROUP_BUREAU = 16;
var U_GROUP_DEV = 32;
var U_GROUP_VIP = 64;
var U_GROUP_BLOGGER = 128;
var U_GROUP_PREMIUM = 256;
var U_GROUP_LOCALIZER = 512;
var U_GROUP_SALESAGENT = 1024;
var U_GROUP_SCREENSHOT = 2048;
var U_GROUP_VIDEO = 4096;
var U_GROUP_STAFF = U_GROUP_ADMIN | U_GROUP_EDITOR | U_GROUP_MOD | U_GROUP_BUREAU | U_GROUP_DEV | U_GROUP_BLOGGER | U_GROUP_LOCALIZER | U_GROUP_SALESAGENT;
var U_GROUP_EMPLOYEE = U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_DEV;
var U_GROUP_GREEN_TEXT = U_GROUP_MOD | U_GROUP_BUREAU | U_GROUP_DEV;
var U_GROUP_MODERATOR = U_GROUP_ADMIN | U_GROUP_MOD | U_GROUP_BUREAU;
var U_GROUP_COMMENTS_MODERATOR = U_GROUP_MODERATOR | U_GROUP_LOCALIZER;
var U_GROUP_PREMIUM_PERMISSIONS = U_GROUP_PREMIUM | U_GROUP_STAFF | U_GROUP_VIP;
var g_users = {};
var g_customColors = {
	Miyari: "pink"
};
var g_dev = false;
var g_localTime = new Date();
var vi_thumbnails = {
	1: "http://i3.ytimg.com/vi/$1/default.jpg"
};
var vi_siteurls = {
	1: "http://www.youtube.com/watch?v=$1"
};
var vi_sitevalidation = {
	1: /^http:\/\/www\.youtube\.com\/watch\?v=([^& ]{11})/
};
var g_file_genders = {
	{constant:MALE}: "male",
	{constant:FEMALE}: "female"
};
var g_file_factions = {
	{constant:ALLIANCE}: "alliance",
	{constant:HORDE}: "horde"
};
var g_file_gems = {
	1: "meta",
	2: "red",
	4: "yellow",
	6: "orange",
	8: "blue",
	10: "purple",
	12: "green",
	14: "prismatic"
};
var g_npcs = {},
	g_objects = {},
	g_items = {},
	g_itemsets = {},
	g_quests = {},
	g_spells = {},
	g_gatheredzones = {},
	g_factions = {},
	g_pets = {},
	g_achievements = {},
	g_gatheredstatistics = {},
	g_titles = {},
	g_holidays = {},
	g_classes = {},
	g_races = {},
	g_skills = {};

// TODO: move to php
var g_types = {
	1: "npc",
	2: "object",
	3: "item",
	4: "itemset",
	5: "quest",
	6: "spell",
	7: "zone",
	8: "faction",
	9: "pet",
	10: "achievement",
	11: "title",
	12: "event",
	13: "class",
	14: "race",
	15: "skill",
	16: "statistic"
};
