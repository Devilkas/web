<?php
// https://api.telegram.org/botXXXXXXXXXXXXXXXXX/getUpdates
// XXXXXXXXXXXXXXXXX - token teg bot
header("Access-Control-Allow-Origin: *");

if ($_SERVER["REQUEST_METHOD"] = "POST") {

    $token = "YOUR_TELEGRAM_BOT_TOKEN";
    $chat_id = "YOUR_CHAT_ID";

    if (isset($_POST["email"])) {
        if (!empty($_POST['email'])) {
            $email = "<b>Email: </b>" . strip_tags($_POST['email']) . "0x0a";
        }
    }
    if (isset($_POST["name"])) {
        if (!empty($_POST['name'])) {
            $name = "<b>Name: </b>" . strip_tags($_POST['name']) . "0x0a";
        }
    }
    if (isset($_POST["city"])) {
        if (!empty($_POST['city'])) {
            $city = "<b>City: </b>" . strip_tags($_POST['city']) . "0x0a";
        }
    }
    if (isset($_POST["description"])) {
        if (!empty($_POST['description'])) {
            $description = "<b>Description: </b>" . strip_tags($_POST['description']) . "0x0a";
        }
    }
    if (isset($_POST["message"])) {
        if (!empty($_POST['message'])) {
            $message = "<b>Message: </b>" . strip_tags($_POST['message']) . "0x0a";
        }
    }

    $txt = $email . $name . $city . $description . $message;

    $sendToTelegram = file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}");

    if ($sendToTelegram) {
        $message = "Error";
    } else {
        $message = "OK!";
    }
    $response = ['message' => $message];
    echo json_encode($response);
}
