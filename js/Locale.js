var LOCALE_ENUS = 0;
var LOCALE_FRFR = 2;
var LOCALE_DEDE = 3;
var LOCALE_ESES = 6;
var LOCALE_RURU = 8;//7;
var Locale = {
	current: {},
	locales: {
		0: {
			id: LOCALE_ENUS,
			name: "enus",
			domain: "www.wowhead.com",
			description: "English"
		},
		2: {
			id: LOCALE_FRFR,
			name: "frfr",
			domain: "fr.wowhead.com",
			description: "Fran" + String.fromCharCode(231) + "ais"
		},
		3: {
			id: LOCALE_DEDE,
			name: "dede",
			domain: "de.wowhead.com",
			description: "Deutsch"
		},
		6: {
			id: LOCALE_ESES,
			name: "eses",
			domain: "es.wowhead.com",
			description: "Espa" + String.fromCharCode(241) + "ol"
		},
		7: {
			id: LOCALE_RURU,
			name: "ruru",
			domain: "ru.wowhead.com",
			description: String.fromCharCode(1056, 1091, 1089, 1089, 1082, 1080, 1081)
		}
	},
	getAll: function () {
		var a = [];
		for (var b in Locale.locales) {
			a.push(Locale.locales[b])
		}
		return a
	},
	getAllByName: function () {
		var a = Locale.getAll();
		a.sort(function (d, c) {
			return strcmp(d.description, c.description)
		});
		return a
	},
	getId: function () {
		return Locale.current.id
	},
	getName: function () {
		var a = Locale.getId();
		return Locale.locales[a].name
	},
	get: function () {
		var a = Locale.getId();
		return Locale.locales[a]
	},
	set: function (a) {
		$.extend(Locale.current, Locale.locales[a])
	}
};
Locale.set(LOCALE_ENUS);

