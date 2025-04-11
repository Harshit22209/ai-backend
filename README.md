# AI Email Generator

A full-stack application that generates professional emails using AI based on user prompts and sends them to specified recipients.

## Features

- Input multiple recipients (comma-separated)
- Enter a prompt describing the email you want
- Generate an AI-written email based on your prompt using Groq's API
- Edit the generated email before sending
- Send the final email to all recipients via Brevo email service

## Live Demo

View the live application: [AI Email Generator on Render](https://your-app-name.onrender.com)

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **AI**: Groq API (LLama3-70B model)
- **Email Service**: Brevo (formerly Sendinblue)
- **Deployment**: Render

## Local Development

### Prerequisites

- Node.js v20.x or newer
- npm or yarn
- Groq API key
- Brevo account and API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ai-email-generator.git
cd ai-email-generator
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

4. Create a `.env` file in the root directory with:
```
GROQ_API_KEY=your_groq_api_key
BREVO_API_KEY=your_brevo_api_key
FROM_EMAIL=your_verified_sender_email
PORT=5000
```

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:3000`

## Deployment

This application is deployed on Render. To deploy your own instance:

1. Create a Render account
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the environment variables
5. Deploy the application

## Usage

1. Enter recipient email addresses separated by commas
2. Type a description of the email you want to generate
3. Click "Generate Email"
4. Edit the generated email if needed
5. Click "Send Email" to send it to the recipients

## Project Structure

```
ai-email-generator/
├── client/                  # React frontend
├── middleware/              # Express middleware
├── routes/                  # API routes
├── services/                # Business logic
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Backend dependencies
├── README.md                # Project documentation
└── server.js                # Express server
```

## API Endpoints

- `POST /api/generate-email`: Generates an email based on a prompt
- `POST /api/send-email`: Sends the email to specified recipients

## Environment Variables

- `GROQ_API_KEY`: API key for Groq
- `BREVO_API_KEY`: API key for Brevo email service
- `FROM_EMAIL`: Verified sender email for Brevo
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

## License

MIT

## Author

Your Name