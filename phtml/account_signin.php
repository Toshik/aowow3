<?php $this->brick('header.php'); ?>

<div class="main" id="main">
	<div class="main-precontents" id="main-precontents"></div>
	<div class="main-contents" id="main-contents">

		<script type="text/javascript">//<![CDATA[
		PageTemplate.set({pageName: 'account'});
		PageTemplate.init();//]]></script>

		<div class="pad3"></div>

		<script type="text/javascript">
			//<![CDATA[
			function inputBoxValidate(f)
			{
				var _ = f.elements[0];
				if (_.value.length == 0)
				{
					ge('inputbox-error').innerHTML = LANG.message_enterusername;
					_.focus();
					return false;
				}

				_ = f.elements[1];
				if (_.value.length == 0)
				{
					ge('inputbox-error').innerHTML = LANG.message_enterpassword;
					_.focus();
					return false;
				}
			}//]]>
		</script>

		<form
			action="?account=signin_do<?php if ($next = Get(GET_STRING, 'b')) echo '&b=' . htmlspecialchars($next); ?>"
			method="post" onsubmit="return inputBoxValidate(this)">
			<div class="inputbox" style="position: relative">
				<h1><?php echo T('signin_signinto'); ?></h1>

				<div id="inputbox-error"></div>

				<table align="center">
					<tr>
						<td align="right"><?php echo T('username'); ?>:</td>
						<td><input type="text" name="username" value="" maxlength="16" id="k4bjhv436"
								   style="width: 10em"/>
						</td>
					</tr>
					<tr>
						<td align="right"><?php echo T('password'); ?>:</td>
						<td><input type="password" name="password" style="width: 10em"/></td>
					</tr>

					<tr>
						<td align="right" valign="top"><input type="checkbox" name="remember_me" id="remember_me"
															  value="yes"/></td>
						<td>
							<label for="remember_me"><?php echo T('signin_rememberme'); ?></label>

							<div class="pad2"></div>
							<input type="submit" value="<?php echo T('signin'); ?>"/>
						</td>
					</tr>
				</table>

				<?php /* <div style="position: absolute; right: 5px; bottom: 5px">Forgot: <a href="/account=forgotusername">Username</a>
					| <a href="/account=forgotpassword">Password</a></div> */ ?>

				<div class="pad3"></div>

			</div>
		</form>

		<div class="pad3"></div>
		<div style="text-align: center; line-height: 1.5em; font-size: 125%"><?php echo T('signin_createone'); ?></div>

		<script type="text/javascript">ge('k4bjhv436').focus()</script>
		<div class="clear"></div>

	</div>
</div>
