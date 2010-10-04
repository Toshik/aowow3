<?php $this->brick('header.php'); ?>

<style type="text/css">
.searchoptions { float: left; }
.searchoptions td { padding: 0 8px 6px 0 }
.grid th { background-color: #404040 }
.grid td { vertical-align: top }
</style>


<div class="main" id="main">
	<div class="main-precontents" id="main-precontents"></div>
	<div class="main-contents" id="main-contents">

		<div class="text">

			<h1>Manage Terms</h1>

			<form action="?admin&locale-search" method="post" name="findterm">
				<table class="searchoptions">
					<tr>
						<td style="text-align: right">Term:</td>
						<td><input type="text" name="term" size="20" value=""/></td>
					</tr>
					<tr>
						<td style="text-align: right">Localized text:</td>
						<td><input type="text" name="text" size="30" value=""/></td>
					</tr>
					<tr>
						<td style="text-align: right">Match type:</td>
						<td>
							<input type="radio" name="matchtype" value="0" id="matchtype1"/>
							<label for="matchtype1">Exact</label>
							<input type="radio" name="matchtype" value="1" id="matchtype2"/>
							<label for="matchtype2">Starts with</label>
							<input type="radio" name="matchtype" value="2" id="matchtype3"/>
							<label for="matchtype3">Contains</label>
						</td>
					</tr>
					<tr>
						<td style="text-align: right">Locale:</td>
						<td>
							<select name="locale">
								<?php
									$selected = isset($_REQUEST['locale'])
										? Get(GET_INT, 'locale', 'REQUEST')
										: $this->locale;

									foreach (Main::$locales as $loc)
										echo '<option value="'.$loc.'">'.T(Main::$languages[$loc]).'</option>';
								?>
							</select>

							<input type="checkbox" name="nolocalized" id="nolocalized" value="1"/>
							<label for="nolocalized">Untranslated</label></td>
					</tr>

					<tr>
						<td></td>
						<td><input type="submit" value="Submit"/> <input type="reset" value="Reset form"/></td>
					</tr>
				</table>
				<div class="clear"></div>
			</form>

<?php
if ($this->terms !== null)
{
?>

			<h2>Results</h2>

<?php
	if (!$this->terms)
		echo '<span id="noresults">Nothing found!</span>';
	else
	{
		echo '<div class="pad"></div>Found '.count($this->terms).' matching terms.';
?>

				<div class="pad2"></div>

				<table class="grid" style="width: 100%" id="found-terms">

					<tr>
						<th>Term</th><?php foreach (Main::$languages as $lang) echo '<th>' . T($lang) . '</th>'; ?>
						<th>Links</th>
					</tr>
<?php
		foreach ($this->terms as $iter => $term)
		{
			echo '<tr id="term' . $iter . '"><td style="white-space: nowrap"><a href="?admin&locale-edit-term&term='.
				$term['id'].'&name='.htmlspecialchars($term['textid']).'">'.htmlspecialchars($term['textid']).'</a></td>';

			foreach (Main::$locales as $loc)
				echo '<td>'.htmlspecialchars($term['content_loc'.$loc]).'</td>';

			echo '<td style="white-space: nowrap"><small><a href="javascript:;" onclick="deleteTerm('.$term['id']
				.')">Delete</a> | <a href="javascript:;" onclick="removeRow(\'term'.$term['id'].'\')">Ignore</a></small></td>';

			echo '</tr>'."\n";
		}
?>
				</table>
<?php
	}
}
?>
			<script type="text/javascript">
				var e = document.forms['findterm'].elements;
				e[0].value = '<?php echo jsEscape(Get(GET_STRING, 'term', 'REQUEST')); ?>';
				e[1].value = '<?php echo jsEscape(Get(GET_STRING, 'text', 'REQUEST')); ?>';
				e[<?php echo (2+Get(GET_INT, 'matchtype', 'REQUEST')); ?>].checked = true;
				for (var i = 0; i < e[5].length; i++)
				{
					if (e[5][i].value == '<?php echo isset($_REQUEST['locale'])
										? Get(GET_INT, 'locale', 'REQUEST')
										: $this->locale; ?>')
						e[5][i].selected = true;
				}
				e[6].checked = <?php echo Get(GET_BOOL, 'nolocalized', 'REQUEST') ? 'true' : 'false'; ?>;
				e[0].focus();

				function deleteTerm(term, tr)
				{
					if (confirm('Are you sure you wish to delete the term ' + term + '?'))
					{
						//new Ajax('?admin&locale&term=' + term + '&delete');
						alert('DELETEING NOT IMPLEMENTED');
						// TODO: implement

						removeRow(tr);

						if (gE(ge('found-terms'), 'tr').length == 1)
						{
							de(ge('found-terms'));
							ge('noresults').style.display = '';
						}
					}
				}

				function removeRow(tr)
				{
					de(ge(tr));
				}
			</script>

			<h2>Add Term</h2>

<?php
	if ($add = Get(GET_STRING, 'add'))
	{
		echo '<span class="msg-failure">Cannot create term: <b>'.htmlspecialchars($add).
			'</b> ('.htmlspecialchars(Get(GET_STRING, 'reason')).')</span><div class="pad"></div>';
	}
?>

			<form action="?admin&locale-add-term" method="post" name="addterm">

				<input type="text" name="term" value=""/>
				<input type="submit" value="Submit"/>
			</form>

		</div>

		<div class="clear"></div>

	</div>
	<!-- main-contents -->
</div><!-- main -->

<?php $this->brick('footer.php'); ?>
