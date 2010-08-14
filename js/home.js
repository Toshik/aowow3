$(document).ready(function () {
	Menu.addButtons($("#home-menu"), mn_path);
	var b = $("#home-search form");
	b.submit(g_preventEmptyFormSubmission);
	var a = $("input", b);
	LiveSearch.attach(a);
	a.focus();
	$("<a></a>").attr("href", "javascript:;").click(function () {
		$(this).parent("form").submit().children("input").focus()
	}).appendTo(b)
});