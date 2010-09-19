<!DOCTYPE html>
<html>
<head>
<?php $this->brick('head.php'); ?>
</head>

<body>

<div class="layout nosidebar" id="layout">
<div class="layout-inner">

	<div id="header">
		<div id="header-logo">
			<a href="."></a>
			<h1><?php echo htmlspecialchars($this->title); ?></h1>
		</div>
	</div>

	<div class="header">
		<h1><?php echo $this->full_title; ?></h1>
		<a href="/" class="header-logo"></a>
	</div>

	<div class="wrapper" id="wrapper">

		<div class="wrapper-center" id="wrapper-center"></div>
		<div class="wrapper-right" id="wrapper-right"></div>

		<?php $this->brick('toplinks.php'); ?>

		<div class="toptabs" id="toptabs"></div>

		<div class="topbar" id="topbar">
			<div class="topbar-search"><form action="/search"><input name="q" value="" /></form></div>
			<div class="topbar-buttons"></div>
		</div>

<?php
	echo '<script type="text/javascript">';
	// Tab
	//echo 'g_initHeader('.$this->tab.');';
	//if($this->path)
		//echo 'g_initPath('.$this->path.');';


	// Live search
	//echo 'LiveSearch.attach(ge("oh2345v5ks"));';

	echo '</script>';
?>