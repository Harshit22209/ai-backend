/**
 * Email validation middleware
 * Validates email addresses before sending
 */

const validateEmails = (req, res, next) => {
    const { recipients } = req.body;
    
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ error: 'At least one recipient is required' });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validRecipients = recipients.filter(email => emailRegex.test(email));
    
    if (validRecipients.length === 0) {
      return res.status(400).json({ error: 'No valid recipient email addresses provided' });
    }
    
    // Add valid recipients to request for use in next middleware/route handler
    req.validRecipients = validRecipients;
    next();
  };
  
  module.exports = {
    validateEmails
  };