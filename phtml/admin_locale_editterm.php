<?php $this->brick('header.php'); ?>

<div class="main" id="main">
	<div class="main-precontents" id="main-precontents"></div>
	<div class="main-contents" id="main-contents">

		<div class="text">

			<h1>Manage Term <?php echo htmlspecialchars($this->term_name); ?></h1>

<?php
	if (!empty($this->edit_message))
	{
		echo '<span class="msg-success">'.$this->edit_message.'</span><div class="pad"></div>';
	}
?>

			<form action="?admin&locale-edit-term&term=<?php echo htmlspecialchars($this->term_id); ?>&name=<?php echo htmlspecialchars($this->term_name); ?>" method="post">
				<input type="hidden" name="term_id" value="<?php echo htmlspecialchars($this->term_id); ?>"/>
				<table style="width: 100%">
					<tr>
						<td style="width: 550px; vertical-align: top;">
							<div style="margin-right: 50px;">
								<h3 class="first">Localization</h3>
								<table class="grid" style="width: auto">
									<tr>
										<th>Term*</th>
										<td><input type="text" name="term" value="<?php echo htmlspecialchars($this->term_name); ?>" size="20"/></td>
									</tr>
<?php
	foreach (Main::$locales as $loc)
	{
		echo '<tr><th>'.T(Main::$languages[$loc]).'</th><td><textarea name="text_loc'.$loc.'" rows="3" cols="70">';
		echo htmlspecialchars($this->data['content_loc'.$loc]);
		echo '</textarea></td></tr>'."\n"; 
	}
?>
								</table>
<?php if ($this->user->HasRoles(U_GROUP_SUPREME)) { ?>
								<div class="pad2"></div>
								
								<input id="allow_html" type="checkbox" name="allow_html" value="1"<?php if ($this->data['flags'] & TERMFLAG_CONTAINS_HTML) echo ' checked'; ?>/>
								<label for="allow_html">Allow HTML tags in the current term. (flags & <?php echo TERMFLAG_CONTAINS_HTML; ?>)</label>
<?php } ?>
							</div>
						</td>
						<td style="vertical-align: top">
							<h3 class="first">Links</h3>
							<a href="javascript:;" onclick="document.forms['findterm'].submit()">View similar english translations</a><br/><br/>

							<h3 class="first">Comments</h3>
							<textarea style="width: 100%" rows="15" cols="20" name="comments"><?php echo htmlspecialchars($this->data['comments']); ?></textarea>
						</td>
					</tr>
				</table>

				<div class="clear"></div>
				<div class="pad2"></div>

				* denotes fields that must be unique among all terms.


				<div class="pad2"></div>

				<input type="submit" value="Save changes"/>

			</form>

			<form action="?admin&locale-search" method="post" name="findterm">
				<input type="hidden" name="text" value="<?php echo htmlspecialchars($this->term_name); ?>"/>
				<input type="hidden" name="locale" value="0"/>
				<input type="hidden" name="matchtype" value="2"/>
			</form>

		</div>

		<div class="clear"></div>

	</div>
	<!-- main-contents -->

</div><!-- main -->

<?php $this->brick('footer.php'); ?>
