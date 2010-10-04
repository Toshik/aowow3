<!DOCTYPE html>
<html>
<head>

<?php $this->brick('head.php'); ?>

<style type="text/css">
body{background:black;}
</style>
</head>

<body class="home">

	<div class="pad2"></div>

	<div class="home-wrapper">

		<h1><?php echo htmlspecialchars($this->title); ?></h1>

		<div class="home-logo" id="home-logo"></div>
		<div class="home-search" id="home-search"><form method="GET" action="?"><input type="text" name="q" /></form></div>
		<div class="home-menu" id="home-menu"></div>

		<p class="home-oneliner text" id="home-oneliner"><?php echo $this->oneliner->toHTML(); ?></p>

		<div class="home-featuredbox" style="background-image: url(images/news-bg.jpg)" id="home-featuredbox">
			<div class="home-featuredbox-links"></div>
			<div class="home-featuredbox-inner text"><?php echo $this->newstext->toHTML(); ?></div>
		</div>
	</div>

<?php $this->brick('toplinks.php'); ?>

<?php $this->brick('footer_links.php'); ?>

<script type="text/javascript">
PageTemplate.set({pageName: 'home'});
PageTemplate.init();
</script>

<?php /* if($this->user && $this->user->HasRoles(U_GROUP_STAFFERS)) $this->brick('footer_staff.php'); */ ?>

<?php $this->brick('noscript.php'); ?>

</body>

</html>