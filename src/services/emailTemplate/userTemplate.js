const userTemplate = ({ name, message }) => `
  <div style="font-family: Arial, sans-serif; margin:0; padding:0; background-color:#0f172a; color:white;">
    <!-- Header -->
    <div style="padding:20px; background-color:white; text-align:center; display:flex; align-items:center; justify-content:center; gap:10px;">
      <img src="https://rislix.com/assets/Rislix%20Logo.png" alt="Rislix Logo" style="width:50px; height:50px; object-fit:contain;"/>
      <h1 style="margin:0; line-height:50px; font-family: Arial, sans-serif; font-size:24px; font-weight:bold;">
        <span style="color:#1e3a8a;">RIS</span><span style="color:#16a34a;">LIX</span>
      </h1>
      </div>
      
      
      <!-- Body -->
      <div style="padding:30px; background-color:#0f172a;">
      <h1 style="margin:10px 0; color:white;">Thank You for Contacting Us!</h1>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for reaching out to <strong>Rislix</strong>. We've received your message and our team will get back to you shortly.</p>

      <h4 style="color:#16a34a;">Your Message:</h4>
      <div style="background:#1e293b; padding:15px; border-radius:8px; color:white;">
        ${message}
      </div>

      <p style="margin-top:20px;">Best Regards,<br/>Rislix Team</p>
    </div>
  </div>
`;

export default userTemplate;
