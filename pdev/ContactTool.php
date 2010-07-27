<?php

enum(array( // ContactReasons
	// General
	'CT_GENERAL_FEEDBACK'		=>	1,
	'CT_BUGREPORT'				=>	2,
	'CT_TYPE_MISTRANSLATION'	=>	3,
	'CT_ADVERTISE_WITH_US'		=>	4,
	'CT_PARTNERSHIP_OPPORTUN'	=>	5,
	'CT_PRESS_INQUIRY'			=>	6,
	'CT_GENERAL_OTHER'			=>	7,
	'CT_ARTICLE_MISINFO'		=>	8,

	// Comment
	'CT_COMMENT_ADVERTISING'	=>	15,
	'CT_COMMENT_INACCURATE'		=>	16,
	'CT_COMMENT_OUT_OF_DATE'	=>	17,
	'CT_COMMENT_SPAM'			=>	18,
	'CT_COMMENT_VULGAR_INAPPR'	=>	19,
	'CT_COMMENT_OTHER'			=>	20,

	// Forum Post/Topic
	'CT_FORUM_ADVERTISING'		=>	30,
	'CT_FORUM_INACCURATE'		=>	31,
	'CT_FORUM_OUT_OF_DATE'		=>	32,
	'CT_FORUM_SPAM'				=>	33,
	'CT_FORUM_STICKY_REQUEST'	=>	34,
	'CT_FORUM_VULGAR_INAPPR'	=>	35,
	'CT_FORUM_OTHER'			=>	36,
	'CT_FORUM_AVATAR'			=>	37,

	// Schreenshot / Video
	'CT_MEDIA_INACCURATE'		=>	45,
	'CT_MEDIA_OUT_OF_DATE'		=>	46,
	'CT_MEDIA_VULGAR_INAPPR'	=>	47,
	'CT_MEDIA_OTHER'			=>	48,

	// Character
	'CT_CHAR_INACCURATE_DATA'	=> 60,
	'CT_CHAR_OTHER'				=> 61,
));

class ContactTool
{
	public static $reasons = array(
		// General
		CT_GENERAL_FEEDBACK			=>	'ct_general_feedback',
		CT_BUGREPORT				=>	'ct_bugreport',
		CT_TYPE_MISTRANSLATION		=>	'ct_typo_mistranslation',
		CT_ADVERTISE_WITH_US		=>	'ct_advertise_with_us',
		CT_PARTNERSHIP_OPPORTUN		=>	'ct_partnership_opportun',
		CT_PRESS_INQUIRY			=>	'ct_press_inquiry',
		CT_GENERAL_OTHER			=>	'ct_general_other',
		CT_ARTICLE_MISINFO			=>	'ct_article_misinfo',

		// Comment
		CT_COMMENT_ADVERTISING		=>	'ct_comment_advert',
		CT_COMMENT_INACCURATE		=>	'ct_comment_inaccurate',
		CT_COMMENT_OUT_OF_DATE		=>	'ct_comment_outofdate',
		CT_COMMENT_SPAM				=>	'ct_comment_spam',
		CT_COMMENT_VULGAR_INAPPR	=>	'ct_comment_vulgar_inappr',
		CT_COMMENT_OTHER			=>	'ct_comment_other',

		// Forum Post/Topic
		CT_FORUM_ADVERTISING		=>	'ct_advertising',
		CT_FORUM_INACCURATE			=>	'ct_forum_inaccurate',
		CT_FORUM_OUT_OF_DATE		=>	'ct_forum_outofdate',
		CT_FORUM_SPAM				=>	'ct_forum_spam',
		CT_FORUM_STICKY_REQUEST		=>	'ct_forum_stickyrequest',
		CT_FORUM_VULGAR_INAPPR		=>	'ct_forum_vulgar_inappr',
		CT_FORUM_OTHER				=>	'ct_forum_other',
		CT_FORUM_AVATAR				=>	'ct_forum_avatar',

		// Schreenshot / Video
		CT_MEDIA_INACCURATE			=>	'ct_media_inaccurate',
		CT_MEDIA_OUT_OF_DATE		=>	'ct_media_outofdate',
		CT_MEDIA_VULGAR_INAPPR		=>	'ct_media_vulgar_inappr',
		CT_MEDIA_OTHER				=>	'ct_media_other',

		// Character
		CT_CHAR_INACCURATE_DATA		=> 'ct_char_inaccuratedata',
		CT_CHAR_OTHER				=> 'ct_char_other',
	);
}

?>