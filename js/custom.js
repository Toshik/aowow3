function g_getGlobalLevel(l) {
	var a = (l > 59 ? (Math.floor((l - 60) / 10) + 2) : 1);

	if (a > 4)
		a = 4;

	return a
}