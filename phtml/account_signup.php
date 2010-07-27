<?php $this->brick('header.php'); ?>

		<div id="main">
			<div id="main-precontents"></div>
			<div id="main-contents">
				<div class="pad3"></div>

					<form action="?account=signup_do" method="post" id="acctmgr">
						<div class="inputbox inputbox-big" style="position: relative">
							<h1><?php echo T('signup_createaccount'); ?></h1>
							<div id="inputbox-error"><?php if($this->acct_error) echo T($this->acct_error); ?></div>

							<table align="center">
								<tr>
									<td align="right" valign="top"><?php echo T('username'); ?>:</td>
									<td><input type="text" name="username" value="" maxlength="16" id="username-generic" style="width: 10em" />
										<div class="inputbox-note"><?php echo T('desc_username'); ?></div>
									</td>
								</tr>
								<tr>
									<td align="right" valign="top"><?php echo T('password'); ?>:</td>
									<td><input type="password" name="password" style="width: 10em" />
										<div class="inputbox-note"><?php echo T('desc_password'); ?></div>
									</td>
								</tr>
								<tr>
									<td align="right" valign="top"><?php echo T('confirm_password'); ?>:</td>
									<td><input type="password" name="password2" style="width: 10em" />
										<div class="inputbox-note"><?php echo T('desc_confirmpassword'); ?></div>
									</td>
								</tr>
								<tr>
								<tr>
									<td align="right" valign="top"><?php echo T('email'); ?>:</td>
									<td><input type="text" name="email" style="width: 10em" />
										<div class="inputbox-note"><?php echo T('desc_email'); ?></div>
									</td>
								</tr>
									<td align="right" valign="top"><input type="checkbox" name="remember_me" id="remember_me" value="yes" /></td>
									<td>
										<label for="remember_me"><?php echo T('signin_rememberme'); ?></label>
										<div class="pad2"></div>
										<input type="submit" name="signup" value="<?php echo T('signup'); ?>" />
									</td>
								</tr>
							</table>
						</div>

						<input type="hidden" name="register" />
					</form>

				<script type="text/javascript">
					AccountMgr.init(false);
					//ge('username-generic').focus()
				</script>
				<div class="clear"></div>
			</div>
		</div>

<?php $this->brick('footer.php'); ?>