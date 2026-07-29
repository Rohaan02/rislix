export default function passwordResetTemplate({ name, resetLink, }) {
    const year = new Date().getFullYear();
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your password</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f4f7; font-family: Arial, sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    .header { background: #1e3a5f; padding: 28px 40px; }
    .header-logo { font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 1px; }
    .body { padding: 40px; }
    h2 { margin: 0 0 16px; color: #1a1a2e; font-size: 22px; }
    p { margin: 0 0 16px; color: #555; line-height: 1.6; font-size: 15px; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 13px 30px; border-radius: 6px; font-weight: bold; font-size: 15px; margin: 8px 0 24px; }
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
      <h2>Reset your password</h2>
      <p>Hi ${name},</p>
      <p>We received a request to reset the password for your Rislix GRC account. Click the button below to choose a new password. This link expires in <strong>1 hour</strong>.</p>
      <a href="${resetLink}" class="btn">Reset Password</a>
      <p class="note">If the button doesn't work, copy and paste this link into your browser:<br />${resetLink}</p>
      <p class="note">If you didn't request a password reset, you can safely ignore this email — your password will not change.</p>
    </div>
    <div class="footer">© ${year} Rislix. All rights reserved.</div>
  </div>
</body>
</html>`;
}
//# sourceMappingURL=password_reset_template.js.map