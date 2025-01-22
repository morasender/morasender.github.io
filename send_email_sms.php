<?php
header('Content-Type: application/json');
$apiKey = $_POST['api_key'] ?? '';
$smtpServer = $_POST['smtp_server'] ?? '';
$smtpUser = $_POST['smtp_user'] ?? '';
$smtpPass = $_POST['smtp_pass'] ?? '';
$messageType = $_POST['type'] ?? 'email';
$recipients = json_decode($_POST['recipients'] ?? '[]');
$message = $_POST['message'] ?? '';
$customSender = $_POST['custom_sender'] ?? '';

$response = ['success' => 0, 'failure' => 0, 'logs' => []];

foreach ($recipients as $recipient) {
    if ($messageType === 'email') {
        if (filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
            $response['success']++;
        } else {
            $response['failure']++;
            $response['logs'][] = ['recipient' => $recipient, 'reason' => 'Invalid email address.'];
        }
    } elseif ($messageType === 'sms') {
        if (preg_match('/^[0-9]{10,15}$/', $recipient)) {
            $response['success']++;
        } else {
            $response['failure']++;
            $response['logs'][] = ['recipient' => $recipient, 'reason' => 'Invalid phone number.'];
        }
    }
}

echo json_encode($response);
?>