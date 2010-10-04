<!DOCTYPE html>
<html>
<head>
<?php $this->brick('head.php'); ?>
</head>

<?php
if (implements_interface($this, 'ITemplate'))
	echo '<body class="'.$this->GetTemplateName().'">';
else
	echo '<body>';
?>

<div class="layout nosidebar" id="layout">
<div class="layout-inner">

	<div class="header">
		<h1><?php echo htmlspecialchars($this->title); ?></h1>
		<a href="." class="header-logo"></a>
	</div>

	<div class="wrapper" id="wrapper">

		<div class="wrapper-center" id="wrapper-center"></div>
		<div class="wrapper-right" id="wrapper-right"></div>

		<?php $this->brick('toplinks.php'); ?>

		<div class="toptabs" id="toptabs"></div>

		<div class="topbar" id="topbar">
			<div class="topbar-search"><form action="?search"><input name="q" value="" /></form></div>
			<div class="topbar-buttons"></div>
		</div>
