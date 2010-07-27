{include file='header.tpl'}

		<div id="main">
			<div id="main-precontents"></div>
			<div id="main-contents" class="main-contents">
				<table class="infobox">
					<tr><th>{#Quick_Facts#}</th></tr>
					<tr><td>
						<div id="ci_msg"></div>
						<div class="infobox-spacer"></div>
						<ul>
							<li><div>{#Username#}: <b>{$user.login}</b></div></li>
							<li><div>{#Email#}: <b>{$user.email}</b></div></li>
							<li><div>{#IP_Address#}: <span class="tip" onmouseover="Tooltip.showAtCursor(event, LANG.tooltip_lastip, 0, 0, 'q')" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()"><b>{$user.lastip}</b></span></div></li>
							<li><div>{#JoinDate#}: <span class="tip" onmouseover="Tooltip.showAtCursor(event, LANG.tooltip_joindate, 0, 0, 'q')" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()"><b>{$user.joindate}</b></span></div></li>
							<li><div>{#LastLogin#}: <span class="tip" onmouseover="Tooltip.showAtCursor(event, LANG.tooltip_lastlogin, 0, 0, 'q')" onmousemove="Tooltip.cursorUpdate(event)" onmouseout="Tooltip.hide()"><b>{$user.lastlogin}</b></span></div></li>
							<li><div><a href="?item=35200" class="q3 icontiny" style="background-image:url(images/icons/tiny/inv_scroll_04.gif)">Pinter's Bill</a>: {$user.pb}</div></li>
						</ul>
					</td></tr>
				</table>

				<div class="text">

					<h1>{#My_account#}</h1>
{if $banned}
					<div class="minibox">
						<h3 class="q7">Аккаунт Заблокирован</h3>
						<ul style="text-align:left">
							<li><div><b>Дата блокировки</b>: {$banned.ban}</div></li>
							<li><div><b>Дата разблокировки</b>: {$banned.unban}</div></li>
							<li><div><b>Причина</b>: <span class="msg-failure">{if $banned.reason}{$banned.reason}{else}неизвестно.{/if}</span></div></li>
						</ul>
					</div>
{/if}
					{#Simply_use_the_forms_below_to_update_your_account_information#}
{if $user.roles & 8}
					<br /><br /><br />
					<div><a href="javascript:;" onclick="ChrProblemSolver.init(this)">Character Problems &#187;</a></div>
{/if}
{*
					<ul class="last">
						<li><div><a href="#public-description">{#Public_Description#}</a></div></li>
						<li><div><a href="#change-password">{#Password#}</a></div></li>
					</ul>
*}

					<h2 id="public-description">{#Public_Description#}</h2>
						<div class="msg-success" style="display:{if $pdupdate}block{else}none{/if};">{#Your_description_has_been_updated_successfully#}.</div>

						<form action="?account=public-description" name="pd" method="post" onsubmit="return spd(this)">
						{#Public_Description_desc#} <a href="?user={$user.name}">{#profile#}</a>.
						<div class="pad2"></div>
						<div id="pd"></div>
						<script type="text/javascript">//<![CDATA[
							Listview.funcBox.coEditAppend(ge('pd'), {ldelim}body: '{$user.description|escape:"javascript"}'{rdelim}, 2);
						//]]></script>
						<div class="pad"></div>
						<input type="submit" value="{#Submit#}" />
						</form>

					<h2 id="select-character">Отображаемый персонаж</h2>
{if $character}
					<div style="background-color: #141414; float: right; text-align: right; padding: 8px; width: 300px;" class="rcorners">
						<tt></tt><strong></strong><var></var><em></em>
						<span style="float: left; text-align: left; max-width: 228px;"><b>{$character.name}</b><br />{$character.text}</span>
						<div style="float: right;" class="iconlarge"><ins style="background-image: url(images/icons/large/{$character.icon}.jpg);"></ins><del></del></div><br />
					</div>
{/if}

{strip}

{if $characters}
					<table>
	{foreach from=$characters item=c}
						<tr>
							<td><div class="iconsmall"><ins style="background-image: url(images/icons/small/{$c.icon}.jpg);"></ins><del></del></div></td>
							<td>
								{if $c.this}
									<b>{$c.name}</b>
								{else}
									<a href="?account=select-character&id={$c.guid}">{$c.name}</a>
								{/if}
								&nbsp;
								{if $c.guild}
									<b>&lt;{$c.guild|escape:"html"}&gt;</b>
								{/if}
								&nbsp;— {$c.text}
							</td>
						</tr>
	{/foreach}
					</table>
{else}
			На вашем аккаунте нет персонажей.
{/if}
			<div class="pad"></div>

{if $user.roles & $Roles.ROLEMASK_DEV}
			Использовать системное имя вместо персонажа: <b>{if $user.flags & 2}ДА{else}НЕТ{/if}</b><br />
		{if $user.flags & 2}
			<a href="?account=select-character&id=deny&deny=undeny">Отключить</a>
		{else}
			<a href="?account=select-character&id=deny&deny=deny">Включить</a>
		{/if}
{/if}

{/strip}

					<h2 id="change-password">{#Change_password#}</h2>
					<form action="?account" method="post">
						<input type="hidden" name="what" value="change-pass" />
{if $cpmsg}
						<div class="msg-{$cpmsg.class}">{$cpmsg.msg}</div>
{/if}
						<table cellspacing="5" cellpadding="0" border="0">
							<tr><td nowrap="nowrap">{#Current_password#}:</td><td><input style="width: 15em" name="old" type="password" value="" /></td></tr>
							<tr><td nowrap="nowrap">{#New_password#}:</td><td><input style="width: 15em" name="new" type="password" value="" /></td></tr>
							<tr><td nowrap="nowrap">{#Confirm_new_password#}:</td><td><input style="width: 15em" name="new2" type="password" value="" /></td></tr>
							<tr><td></td><td><input value="{#Submit#}" type="submit" /></td></tr>
						</table>
					</form>
				</div>

{if $iplog}
				<div class="clear"></div>
				<div class="pad"></div>
				<a name="iplog"></a>
				<div id="lv-iplog" class="listview"></div>

				<script type="text/javascript">
					{include	file='bricks/iplog_table.tpl' id='iplog' data=$iplog} 
				</script>
{/if}
				<div class="clear"></div>
			</div>
		</div>
{include file='footer.tpl'}