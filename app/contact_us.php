<?php

$curl = curl_init("https://hooks.slack.com/services/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");
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

function isValidJSON($str) {
   json_decode($str);
   return json_last_error() == JSON_ERROR_NONE;
}
$json_params = file_get_contents("php://input");
if (strlen($json_params) > 0 && isValidJSON($json_params)) {
  $d = $decoded_params = json_decode($json_params);
  $name = $decoded_params->name;
  $phone = $d->phone;
  $email = $d->email;
  $descr = $d->descr;
  $verification = $d->verification;
} else {
  $name  = $_POST['name'];
  $phone = $_POST['phone'];
  $email = $_POST['email'];
  $descr = $_POST['descr'];
  $verification = $_POST['verification'];
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: content-type, cache-control, x-http-method-override');

if ($verification != '14') {
  $output = "Verification failed. Please provide the correct verification answer.";
} else {

    $data = "payload=" . json_encode(array(
        "text" => "@piousbox Contact from wasya.co form. Name: " . $name . " phone: " . $phone . " email: " . $email . " descr: " . $descr
    ));
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    $output = curl_exec($curl);
    curl_close($curl);
}

echo json_encode($output);
