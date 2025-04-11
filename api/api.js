import { validateEmails } from '../middleware/emailValidator.js';
import emailService from '../services/emailService.js';
import aiService from '../services/aiService.js';

// Main Vercel handler
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your frontend domain in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.url.includes('generate-email') && req.method === 'POST') {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const generatedEmail = await aiService.generateEmail(prompt);
      return res.status(200).json({ generatedEmail });

    } else if (req.url.includes('send-email') && req.method === 'POST') {
      const isValid = validateEmails(req, res);
      if (!isValid) return; // early return if validation fails

      const { emailContent } = req.body;
      const recipients = req.validRecipients;

      if (!emailContent) {
        return res.status(400).json({ error: 'Email content is required' });
      }

      const result = await emailService.sendEmail(recipients, emailContent);
      return res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        data: result
      });
    } else {
      return res.status(404).json({ error: 'Route not found' });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
