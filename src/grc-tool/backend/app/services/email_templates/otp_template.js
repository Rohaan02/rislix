export default function otpTemplate({ name, otp }) {
    const year = new Date().getFullYear();
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your password reset code</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f4f7; font-family: Arial, sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    .header { background: #1e3a5f; padding: 28px 40px; }
    .header-logo { font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 1px; text-decoration: none; }
    .body { padding: 40px; }
    h2 { margin: 0 0 16px; color: #1a1a2e; font-size: 22px; }
    p { margin: 0 0 16px; color: #555; line-height: 1.6; font-size: 15px; }
    .otp-box { margin: 24px 0; text-align: center; }
    .otp-code { display: inline-block; background: #f0f4ff; border: 2px solid #2563eb; border-radius: 10px; padding: 18px 36px; font-size: 40px; font-weight: 900; letter-spacing: 10px; color: #1e3a5f; font-family: 'Courier New', monospace; }
    .expiry { font-size: 13px; color: #888; text-align: center; margin-top: 8px; }
    .note { font-size: 13px; color: #888; }
    .footer { padding: 20px 40px; border-top: 1px solid #eee; font-size: 12px; color: #aaa; text-align: center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <span class="header-logo">Rislix</span>
    </div>
    <div class="body">
      <h2>Password reset code</h2>
      <p>Hi ${name},</p>
      <p>Use the one-time code below to reset your Rislix GRC password. This code expires in <strong>5 minutes</strong>.</p>
      <div class="otp-box">
        <span class="otp-code">${otp}</span>
        <p class="expiry">Valid for 5 minutes only</p>
      </div>
      <p class="note">Enter this code on the password reset page. Do not share it with anyone.</p>
      <p class="note">If you did not request a password reset, you can safely ignore this email — your account remains secure.</p>
    </div>
    <div class="footer">© ${year} Rislix. All rights reserved.</div>
  </div>
</body>
</html>`;
}
//# sourceMappingURL=otp_template.js.map