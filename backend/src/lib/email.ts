import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[Email] SMTP not configured, skipping email to:', to);
    return { success: false, reason: 'SMTP not configured' };
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'DatasetForge <noreply@datasetforge.com>',
      to,
      subject,
      html,
    });
    console.log('[Email] Sent successfully to:', to, 'Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('[Email] Failed to send to:', to, error.message);
    return { success: false, error: error.message };
  }
}

export function getCommentEmailTemplate(datasetName: string, commenterName: string, content: string, datasetUrl: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1976d2;">New comment on ${datasetName}</h2>
      <p><strong>${commenterName}</strong> commented:</p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 4px; margin: 15px 0;">
        ${content}
      </div>
      <p><a href="${datasetUrl}" style="background: #1976d2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View Dataset</a></p>
    </div>
  `;
}

export function getMentionEmailTemplate(datasetName: string, mentionerName: string, content: string, datasetUrl: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1976d2;">You were mentioned in ${datasetName}</h2>
      <p><strong>${mentionerName}</strong> mentioned you:</p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 4px; margin: 15px 0;">
        ${content}
      </div>
      <p><a href="${datasetUrl}" style="background: #1976d2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View Dataset</a></p>
    </div>
  `;
}
