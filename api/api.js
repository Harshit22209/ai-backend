import { generateEmail } from '../services/aiService.js';
import { sendEmail } from '../services/emailService.js';
import { validateEmails } from '../middleware/emailValidator.js';
import errorHandler from '../middleware/errorHandler.js';

export default async function handler(req, res) {
  try {
    const { method, url } = req;

    // POST /api/generate-email
    if (method === 'POST' && url.endsWith('/generate-email')) {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const generatedEmail = await generateEmail(prompt);
      return res.status(200).json({ generatedEmail });
    }

    // POST /api/send-email
    if (method === 'POST' && url.endsWith('/send-email')) {
      const isValid = validateEmails(req, res);
      if (!isValid) return;

      const { emailContent } = req.body;
      const recipients = req.validRecipients;

      if (!emailContent) {
        return res.status(400).json({ error: 'Email content is required' });
      }

      const result = await sendEmail(recipients, emailContent);
      return res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        data: result
      });
    }

    return res.status(404).json({ error: 'Endpoint not found' });

  } catch (err) {
    console.error('API error:', err);
    errorHandler(err, req, res);
  }
}
