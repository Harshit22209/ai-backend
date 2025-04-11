/**
 * Combined API routes for the AI Email Generator
 */

const express = require('express');
const router = express.Router();
const { validateEmails } = require('../middleware/emailValidator.js');
const emailService = require('../services/emailService.js');
const aiService = require('../services/aiService.js');

/**
 * POST /api/generate-email
 * Generate email content from a prompt
 */
router.post('/generate-email', async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const generatedEmail = await aiService.generateEmail(prompt);
    res.json({ generatedEmail });
  } catch (error) {
    console.error('Error generating email:', error);
    next(error);
  }
});

/**
 * POST /api/send-email
 * Send generated email to recipients
 */
router.post('/send-email', validateEmails, async (req, res, next) => {
  try {
    const { emailContent } = req.body;
    const recipients = req.validRecipients;

    if (!emailContent) {
      return res.status(400).json({ error: 'Email content is required' });
    }

    const result = await emailService.sendEmail(recipients, emailContent);
    res.json({
      success: true,
      message: 'Email sent successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    next(error);
  }
});

module.exports = router;
