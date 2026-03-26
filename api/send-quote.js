import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const {
    name,
    email,
    phone,
    service,
    propertyType,
    moveDate,
    fromAddress,
    toAddress,
    message
  } = req.body;

  try {
    await resend.emails.send({
      from: 'Paisley Removals <quotes@paisleyremovalsanduplift.co.uk>',
      to: 'YOUR_EMAIL_HERE',
      subject: 'New Quote Request',
      html: `
        <h2>New Quote Request</h2>

        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>

        <hr>

        <p><b>Service:</b> ${service}</p>
        <p><b>Property Type:</b> ${propertyType}</p>
        <p><b>Move Date:</b> ${moveDate}</p>

        <p><b>From Address:</b> ${fromAddress}</p>
        <p><b>To Address:</b> ${toAddress}</p>

        <hr>

        <p><b>Additional Info:</b></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}