export const responseEmailTemplate = ({ name, email, phone, message }) => {
  return `
  <div style="font-family: 'Segoe UI', sans-serif; background:#f4f7fb; padding:30px;">
    <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb;">
      
      <!-- Header -->
      <div style="background:#16a34a; padding:20px; text-align:center;">
        <h1 style="color:#ffffff; margin:0;">Rislix</h1>
        <p style="color:#dcfce7; margin:5px 0 0;">New Contact Form Submission</p>
      </div>

      <!-- Body -->
      <div style="padding:25px;">
        <h2 style="margin-bottom:10px; color:#111827;">📩 New Lead Received</h2>
        <p style="color:#6b7280;">A new user has submitted the contact form on your website.</p>

        <table style="width:100%; margin-top:20px; border-collapse:collapse;">
          <tr>
            <td style="padding:10px; font-weight:bold; background:#f9fafb;">Name</td>
            <td style="padding:10px;">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px; font-weight:bold; background:#f9fafb;">Email</td>
            <td style="padding:10px;">${email}</td>
          </tr>
          <tr>
            <td style="padding:10px; font-weight:bold; background:#f9fafb;">Phone</td>
            <td style="padding:10px;">${phone}</td>
          </tr>
          <tr>
            <td style="padding:10px; font-weight:bold; background:#f9fafb;">Message</td>
            <td style="padding:10px;">${message || "—"}</td>
          </tr>
        </table>

        <div style="margin-top:30px; padding:15px; background:#ecfdf5; border-left:4px solid #16a34a;">
          <p style="margin:0; color:#065f46;">
            💡 Tip: Respond quickly to increase conversion chances.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align:center; padding:15px; font-size:12px; color:#9ca3af;">
        © ${new Date().getFullYear()} Rislix.com — All rights reserved
      </div>
    </div>
  </div>
  `;
};
