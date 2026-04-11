# ToolStack AI

ToolStack AI is a full-stack web application that provides a unified interface for multiple AI-powered utilities. Built with the MERN stack and integrated with the Google Gemini API, it allows users to generate, transform, and analyze text and data through a single dashboard.

## Features

### AI Tools
- **Humanizer**: Rewrites AI-generated text to sound more natural and conversational.
- **Summarizer**: Extracts key points and core messages from long-form text or documents.
- **Rewriter**: Paraphrases text to improve clarity, grammar, or adjust the tone.
- **Email Generator**: Drafts professional emails based on short prompts.
- **Explain Simple**: Breaks down complex technical concepts into easily understandable terms.
- **Keyword Extractor**: Identifies SEO keywords and primary topics from content.
- **Code Converter**: Translates functional code snippets between different programming languages.
- **JSON to CSV Converter**: Transforms JSON objects or arrays into formatted CSV data.

### Platform Functionality
- **Authentication**: JWT-based stateless authentication system.
- **History Tracking**: Saves inputs, outputs, and selected tools for past generations.
- **User Dashboard**: Provides statistics on tool usage and total prompt execution.
- **Global Search**: Quick navigation to tools and pages from the navigation bar.

## Technology Stack

- **Frontend**: React (Vite), Tailwind CSS (v4), Framer Motion, Lucide React, Axios.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens.
- **AI Integration**: `@google/generative-ai` (Gemini API).

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB database (local or Atlas cluster)
- Google Gemini API key

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd ToolStack
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the client folder, and install dependencies:
```bash
cd client
npm install
```

Start the Vite development server:
```bash
npm run dev
```

### 4. Usage
Open `http://localhost:5173` in your browser. Create an account to log in and access the dashboard.

## Architecture Notes
The application features a component-based frontend architecture using React context for authentication state management. The UI is custom-styled with Tailwind CSS. The backend utilizes Express routers and controllers to separate concerns, isolating authentication, user session logic, AI prompt generation, and history persistence.
