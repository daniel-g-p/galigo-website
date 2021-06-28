<?php

if(isset($_POST["submit-newsletter"])) {
    $name = $_POST["firstName"];
    $mailFrom = $_POST["email"];
    $mailTo = "marketing@3daerospace.eu";
    $subject = "NEW GALIGO NEWSLETTER SUBSCRIBER";
    $message = "Subscriber Details: \n\nName: ".$name."\nEmail: ".$mailFrom;
    $headers = "From: ".$mailFrom;
    mail($mailTo, $subject, $message, $headers);
    header("Location: /");
}

if(isset($_POST["submit-contact"])) {
    $name = $_POST["name"];
    $mailFrom = $_POST["email"];
    $subject = $_POST["subject"];
    $text = $_POST["message"];
    $mailTo = "marketing@3daerospace.eu";
    $message = "New Message on the GaliGo Website: \n\nName: ".$name."\nEmail: ".$mailFrom."\n\nMessage:\n".$text;
    $headers = "From: ".$mailFrom;
    mail($mailTo, $subject, $message, $headers);
    header("Location: /");
}
?>