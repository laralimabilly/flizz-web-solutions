<?php
// Contact form endpoint for Hostinger shared hosting. Receives the JSON body
// posted by Contact.tsx / ContactPanel.tsx and relays it through the Resend
// API. The API key lives in resend-config.php next to this file, which is
// gitignored; copy resend-config.example.php and fill it in on the server.
declare(strict_types=1);

header('Content-Type: application/json');
header('X-Robots-Tag: noindex');

function respond(int $status, array $body): void {
  http_response_code($status);
  echo json_encode($body);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

$configPath = __DIR__ . '/resend-config.php';
if (!file_exists($configPath)) {
  respond(500, ['ok' => false, 'error' => 'not_configured']);
}
require $configPath; // defines RESEND_API_KEY, CONTACT_FROM, CONTACT_TO

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
  $data = $_POST;
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$company = trim((string)($data['company'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$honeypot = trim((string)($data['website'] ?? ''));

// Bots fill every field; humans never see this one. Pretend success so the
// bot moves on without retrying.
if ($honeypot !== '') {
  respond(200, ['ok' => true]);
}

if (
  $name === '' || $message === ''
  || !filter_var($email, FILTER_VALIDATE_EMAIL)
  || mb_strlen($name) > 200
  || mb_strlen($company) > 200
  || mb_strlen($email) > 320
  || mb_strlen($message) > 5000
) {
  respond(422, ['ok' => false, 'error' => 'validation']);
}

$subject = 'Project inquiry from ' . $name . ($company !== '' ? " ($company)" : '');
$text = $message . "\n\n--\n" . $name . "\n" . $email . ($company !== '' ? "\n" . $company : '');

$payload = json_encode([
  'from' => CONTACT_FROM,
  'to' => [CONTACT_TO],
  'reply_to' => $email,
  'subject' => $subject,
  'text' => $text,
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'Authorization: Bearer ' . RESEND_API_KEY,
    'Content-Type: application/json',
  ],
  CURLOPT_POSTFIELDS => $payload,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 15,
]);
$response = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
curl_close($ch);

if ($response === false || $status >= 400) {
  respond(502, ['ok' => false, 'error' => 'send_failed']);
}

respond(200, ['ok' => true]);
