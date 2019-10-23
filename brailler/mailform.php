<?php
include('../../lib/constants.php');
$url = $_SERVER['HTTP_REFERER'];
$bannedIPs = array('69.48.19.49', '119.136.96.144', '122.160.99.22');

if (in_array($_SERVER['REMOST_HOST'], $bannedIPs) || (strpos($url, UMB) === false
	 && strpos($url, 'faculty.umb.edu/sandy_smith/') === false && strpos($url, 'communityinclusion.org') !== false)) {
	exit;
}

include(LIVE ? '/home/nercve/lib/lib.php' : '/Users/cnagle/workspace/lib/lib.php');
$to = $from = $replyTo = $cc = $subject = $body = $returnTo = '';

$to = has_value($_POST, 'to') ? str_replace("\r\n", ' ', $_POST['to']) : '';
if (has_value($_POST, 'from') && (strpos($_POST['from'], '@nercve.org') || strpos($_POST['from'], '@umb.edu'))
		|| strpos($_POST['from'], '@communityinclusion.org')) {
	$from = str_replace("\r\n", ' ', $_POST['from']);
} else {
	$msg =  print_r($_POST, true) . "\n" . print_r($_SERVER, true);
	mail('Robert McCulley <robert.mcculley@umb.edu>', 'Bad Mail Request', $msg, 'From: mailform@nercve.org' . "\r\n");
	exit;
}
$subject = has_value($_POST, 'subject') ? str_replace("\r\n", ' ', $_POST['subject']) : '';
$returnTo = has_value($_POST, 'returnTo') ? $_POST['returnTo'] : $url;
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
		 . 'User-Agent: PHP '.phpversion();
$returnTo = (preg_match('/(&|\?)success=[^&]*/', $returnTo)
	? preg_replace('/(&|\?)success=[^&]*/', '$1success=', $returnTo)
	: $returnTo . (strpos($returnTo, '?') === false ? '?' : '&') .  'success=');
if ($_SERVER['HTTP_REFERER'] == $url && valid($to) && valid($from) && valid($subject) && valid($body)) {
	mail($to, $subject, $body, $headers . ((valid($cc)) ? "\r\n" . 'CC: ' . $cc . "\r\n" : ''));
	header('Location: ' . $returnTo . 1);
} else {
	header('Location: ' . $returnTo . 0);
}
$body .= "\n\n" . 'To: ' . $to . "\n" . (!$from ? "\nfrom:$from" : '')
	   . (valid($cc) ?  'CC: ' . $cc . "\n" : '') . 'IP: ' . $_SERVER['REMOTE_ADDR'] . "\n"
	   . 'User-Agent: ' . $_SERVER['HTTP_USER_AGENT'] . "\n" . 'Refering URL: ' . $_SERVER['HTTP_REFERER'];
if (in_array(strtolower($_SERVER['HTTP_HOST']), array('beta.nercve.org','www.nercve.org', 'nercve.org', 'www.nercve.com', 'nercve.com'))) {
	mail('Robert McCulley <robert.mcculley@umb.edu>', $subject, $body, $headers);
}
exit; ?>
