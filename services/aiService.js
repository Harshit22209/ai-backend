/**
 * AI service to handle interaction with Groq API
 */

const { Groq } = require('groq-sdk');

class AiService {
  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  /**
   * Generate email content based on prompt
   * @param {String} prompt - User's prompt describing the email
   * @returns {Promise<String>} - Generated email content
   */
  async generateEmail(prompt) {
    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a professional email writer. Create well-written, appropriate emails based on the user\'s prompt. Include a subject line in the format "Subject: Your Subject Here" followed by two newlines and then the email body. The email should be formal and professional unless otherwise specified.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'llama3-70b-8192',
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Groq API:', error);
      throw new Error('Failed to generate email content');
    }
  }
}

module.exports = new AiService();