<?php
include('../lib/nercve/constants.php');
include('../lib/utils/utils.php');
$to = $from = $replyTo = $cc = $subject = $body = $returnTo = '';
$url = $_SERVER['HTTP_REFERER'];
$url = (strpos($url, UMB) !== false || strpos($url, 'faculty.umb.edu/sandy_smith/') !== false
	 || strpos($url, 'communityinclusion.org') !== false) ? $url : UMB;

$to = (has_value($_POST, 'to')) ? str_replace("\r\n", ' ', $_POST['to']) : '';
if (has_value($_POST, 'from') && (strpos($_POST['from'], '@nercve.org') || strpos($_POST['from'], '@umb.edu'))
		|| strpos($_POST['from'], '@communityinclusion.org')) {
	$from = str_replace("\r\n", ' ', $_POST['from']);
}
$subject = (has_value($_POST, 'subject')) ? str_replace("\r\n", ' ', $_POST['subject']) : '';
$returnTo = (has_value($_POST, 'returnTo')) ? $_POST['returnTo'] : UMB;
if (isset($_POST['body']) && valid($_POST['body'])) {
	$body = $_POST['body'];
} else {
	foreach($_POST as $k => $v) {
		if (!in_array($k, array('to', 'from', 'cc', 'reply-to', 'body', 'subject', 'returnTo'))) {
			$k = str_replace('_', ' ', $k);
			$body .= "\n$k: $v\n";
		}
	}
}

if (isset($_POST['cc']) && valid_email($_POST['cc'])) {
	$cc = str_replace("\r\n", ' ', $_POST['cc']);
}
if (isset($_POST['reply-to']) && valid_email($_POST['reply-to'])) {
	$replyTo = str_replace("\r\n", ' ', $_POST['reply-to']);
}
$headers = 'From: ' . $from . "\r\n" . ((valid($replyTo)) ? 'Reply-To: ' . $replyTo . "\r\n" : '')
		 . 'User-Agent: PHP 5.2.5';

$bannedIPs = array();
if ($_SERVER['HTTP_REFERER'] == $url && !in_array($_SERVER['REMOST_HOST'], $bannedIPs) && valid($to)
	&& valid($from) && valid($subject) && valid($body)) {
	mail($to, $subject, $body, $headers . ((valid($cc)) ? "\r\n" . 'CC: ' . $cc . "\r\n" : ''));
	header('Location: ' . $returnTo . ((strpos($url, '?') === false)?'?':'&') . 'success=1');
} else if ($_SERVER['HTTP_REFERER'] != $url) {
	header('Location: ' . $returnTo);
} else {
	header('Location: ' . $returnTo . ((strpos($url, '?') === false)?'?':'&') . 'success=0');
}
$body .= "\n\n" . 'To: ' . $to . "\n" . (!$from ? "\nfrom:$from" : '')
	   . ((valid($cc)) ?  'CC: ' . $cc . "\n" : '') . 'IP: ' . $_SERVER['REMOTE_ADDR'] . "\n"
	   . 'User-Agent: ' . $_SERVER['HTTP_USER_AGENT'] . "\n" . 'Refering URL: ' . $_SERVER['HTTP_REFERER'];
if (in_array(strtolower($_SERVER['HTTP_HOST']), array('www.nercve.org', 'nercve.org', 'www.nercve.com', 'nercve.com'))) {
	mail('Robert McCulley <robert.mcculley@umb.edu>', $subject, $body, $headers);
}
exit; ?>