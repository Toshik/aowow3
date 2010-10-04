<?php
if (implements_interface($this, 'ITemplate'))
{
	echo '<script type="text/javascript">';
	echo 'PageTemplate.set({pageName: "'.jsEscape($this->GetTemplateName()).'", activeTab: '.
		$this->GetActiveTab().', breadcrumb: '.$this->GetPath().'});';
	echo 'PageTemplate.init();';
	echo '</script>';
}
?>

<?php $this->brick('footer_links.php'); ?>

</div><?php /* wrapper */ ?>
</div><?php /* layout-inner */ ?>
</div><?php /* layout */ ?>

<?php /* Staff Bar Here */ ?>

<?php $this->brick('noscript.php'); ?>

<?php /* <script type="text/javascript">DomContentLoaded.now()</script> */ ?>

</body>
</html>