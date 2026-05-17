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
    console.log('Email not configured, skipping send to:', to);
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'DatasetForge <noreply@datasetforge.com>',
      to,
      subject,
      html,
    });
    console.log('Email sent to:', to);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

export function getCommentEmailTemplate(datasetName: string, commenterName: string, content: string, datasetUrl: string) {
  return `
    <h2>New comment on ${datasetName}</h2>
    <p><strong>${commenterName}</strong> commented:</p>
    <blockquote>${content}</blockquote>
    <p><a href="${datasetUrl}">View Dataset</a></p>
  `;
}

export function getMentionEmailTemplate(datasetName: string, mentionerName: string, content: string, datasetUrl: string) {
  return `
    <h2>You were mentioned in ${datasetName}</h2>
    <p><strong>${mentionerName}</strong> mentioned you:</p>
    <blockquote>${content}</blockquote>
    <p><a href="${datasetUrl}">View Dataset</a></p>
  `;
}
