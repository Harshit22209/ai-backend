/**
 * Email service using Brevo (formerly Sendinblue)
 */

const SibApiV3Sdk = require('sib-api-v3-sdk');

class EmailService {
  constructor() {
    this.client = SibApiV3Sdk.ApiClient.instance;
    // Configure API key authorization
    const apiKey = this.client.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  }

  /**
   * Send email to recipients
   * @param {Array} recipients - Array of email addresses
   * @param {String} content - Email content
   * @returns {Promise} - Promise resolving to send info
   */
  async sendEmail(recipients, content) {
    const recipientsList = Array.isArray(recipients) ? recipients : [recipients];
    
    // Extract subject from content if available
    let subject = 'Generated Email';
    let emailBody = content;
    
    const subjectMatch = content.match(/^Subject:(.+?)(?:\n|\r\n){2}/i);
    if (subjectMatch) {
      subject = subjectMatch[1].trim();
      emailBody = content.slice(subjectMatch[0].length);
    }
    
    // Prepare recipients in Brevo format
    const toList = recipientsList.map(email => ({ email }));
    
    const sendSmtpEmail = {
      sender: { 
        email: process.env.FROM_EMAIL || 'noreply@aiemail.example.com',
        name: 'AI Email Generator'
      },
      to: toList,
      subject: subject,
      textContent: emailBody
    };

    try {
      const data = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log('Email sent successfully via Brevo:', data);
      return {
        messageId: data.messageId,
        success: true
      };
    } catch (error) {
      console.error('Error sending email with Brevo:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();