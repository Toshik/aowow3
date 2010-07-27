<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<html>
<!-- MWebServ report: error.

	Could not locate file '__xtc_ptrbased_internal_header.jtpl' (safed) to display; skipping.
-->
<head>
<?php $this->brick('head.php'); ?>
</head>

<body>
<div id="layers"></div>
<!--[if lte IE 6]><table id="ie6layout"><tr><th class="ie6layout-th"></th><td id="ie6layout-td"><div id="ie6layout-div"></div><![endif]-->
<div id="layout">
	<div id="header">
		<div id="header-logo">
			<a href="."></a>
			<h1><?php echo htmlspecialchars($this->title); ?></h1>
		</div>
	</div>

	<?php $this->brick('toplinks.php'); ?>

	<div id="wrapper" class="nosidebar">
		<div id="toptabs">
			<div id="toptabs-inner">
				<div id="toptabs-right"></div>
				<div id="ptewhjkst46"></div>
				<div class="clear"></div>
			</div>
		</div>

		<div id="topbar-right"><div><form action="."><a href="javascript:;"></a><input name="search" size="35" value="" id="oh2345v5ks" /></form></div></div>
		<div id="topbar"><span id="kbl34h6b43" class="menu-buttons"></span><div class="clear"></div></div>

<?php echo '<script type="text/javascript">';
	// Tab
	//if($this->tab >= 0)
		echo 'g_initHeader('.$this->tab.');';
	if($this->path)
		echo 'g_initPath('.$this->path.');';


	// Live search
	echo 'LiveSearch.attach(ge("oh2345v5ks"));';

	echo '</script>';
?>