<?php $this->brick('header.php'); ?>

		<div id="main">
			<div id="main-precontents"></div>
			<div id="main-contents">
				<div class="pad3"></div>

				<form action="?account=signin_do<?php if($next = Get(GET_STRING, 'b')) echo '&b='.htmlspecialchars($next); ?>" method="post" id="acctmgr">
					<div class="inputbox" style="position: relative">
						<h1><?php echo T('signin_signinto'); ?></h1>
						<div id="inputbox-error"><?php if($this->acct_error) echo T($this->acct_error); ?></div>

						<table align="center">
							<tr>
								<td align="right"><?php echo T('username'); ?>:</td>
								<td><input type="text" name="username" value="" maxlength="16" id="username-generic" style="width: 10em" /></td>
							</tr>
							<tr>
								<td align="right"><?php echo T('password'); ?>:</td>
								<td><input type="password" name="password" style="width: 10em" /></td>
							</tr>
							<tr>
								<td align="right" valign="top"><input type="checkbox" name="remember_me" id="remember_me" value="yes" /></td>
								<td>
									<label for="remember_me"><?php echo T('signin_rememberme'); ?></label>
									<div class="pad2"></div>
									<input type="submit" value="<?php echo T('signin'); ?>" />
								</td>
							</tr>
						</table>
					</div>

					<input type="hidden" name="register" />
				</form>

				<div class="pad3"></div>

				<div style="text-align: center; line-height: 1.5em; font-size: 125%"><?php echo T('signin_createone'); ?></a></div>

				<script type="text/javascript">
					AccountMgr.init(true);
					//ge('username-generic').focus()
				</script>
				<div class="clear"></div>
			</div>
		</div>

<?php $this->brick('footer.php'); ?>