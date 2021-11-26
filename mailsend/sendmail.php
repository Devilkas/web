<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('uk', 'PHPMailer/language/');
$mail->isHTML(true);


$mail->isSMTP();
$mail->Host = 'smtp.mailtrap.io';
$mail->SMTPAuth = true;
$mail->Port = 2525;
$mail->Username = 'aee8ac09241573';
$mail->Password = '7c3e5b3ac50c7d';


$mail->setFrom('mymail@gg.com', 'Title');

$mail->addAddress('send@asda.asd');
$mail->Subject = 'Привіт!!!!!';

$body = '<h1>Повідомлення з форми</h1>';

if (trim(!empty($_POST['email']))) {
    $body .= "<p>Email: <strong>" . $_POST['email'] . "</strong></p>";
}

if (trim(!empty($_POST['name']))) {
    $body .= "<p>Name: <strong>" . $_POST['name'] . "</strong></p>";
}
if (trim(!empty($_POST['city']))) {
    $body .= "<p>City: <strong>" . $_POST['city'] . "</strong></p>";
}
if (trim(!empty($_POST['description']))) {
    $body .= "<p>Description: <strong>" . $_POST['description'] . "</strong></p>";
}
if (trim(!empty($_POST['message']))) {
    $body .= "<p>Message: <strong>" . $_POST['message'] . "</strong></p>";
}

if (!empty($_FILES['image']['tmp_name'])) {
    $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];

    if (copy($_FILES['image']['tmp_name'], $filePath)) {
        $fileAttach = $filePath;
        $body .= "<p><strong>Зображення</strong></p>";
        $mail->addAttachment($fileAttach);
    }
}

$mail->Body = $body;

if (!$mail->send()) {
    $message = "Сталося помилка!";
} else {
    $message = "Повідомлення відправлено";
}

$response = ['message' => $message];

echo json_encode($response);
