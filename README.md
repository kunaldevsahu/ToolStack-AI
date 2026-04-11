# ToolStack AI 🚀

ToolStack AI is a premium, AI-powered toolkit designed to supercharge productivity for developers, writers, and students. Built with the full MERN stack and fully integrated with the powerful Google Gemini AI model, this platform provides a unified suite of AI utilities wrapped in a stunning, highly-responsive glassmorphic interface.

## 🌟 Key Features

### 🛠️ Comprehensive AI Tool Suite
- **✨ Humanizer**: Transforms robotic-sounding AI generated text into natural, conversational, human-like language that bypasses AI detectors.
- **📖 Summarizer**: Quickly extracts the most important points and core message from lengthy articles, documents, or reports.
- **✒️ Rewriter**: Paraphrases your existing text to improve clarity, fix grammar, and adjust the tone without changing the original meaning.
- **📧 Email Generator**: Instantly drafts complete, articulate professional emails based on a short description.
- **🧠 Explain Simple**: Breaks down highly technical, academic, or complex jargon into simple terms that a 5th grader could understand.
- **🔑 Keyword Extractor**: Scans your content and identifies the most important SEO keywords, primary topics, and underlying themes.
- **💻 Code Converter**: Translates functional code snippets from one programming language to another while preserving core logic.
- **📊 JSON to CSV Converter**: Transforms structural JSON objects or arrays of objects into properly formatted and downloadable CSV data.

### 🔐 Secure & Personalized Experience
- **Authentication**: Fully secure JWT-based stateless authentication system.
- **Generation History**: A dedicated history feed where all of your past outputs, inputs, and selected tools are securely saved. Easily expand, view, or copy past generations.
- **User Profile & Stats**: Visually engaging usage dashboards showing how many words you've generated, total prompt runs, and usage charts highlighting your favorite tools.
- **Smart Navigation**: A predictive, dynamic top search bar that allows users to instantly filter and jump to any specific tool or page.

## 🏗️ Technology Stack

**Frontend:**
- **React (Vite)** for lightning-fast client-side rendering.
- **Tailwind CSS** for the custom responsive dark mode design.
- **Framer Motion** for elegant layouts and fluid micro-animations.
- **Lucide React** for premium iconography.
- **Axios** for API integrations.

**Backend:**
- **Node.js & Express.js** providing a robust custom REST API.
- **MongoDB & Mongoose** for securely storing user accounts and historical AI interactions.
- **JSON Web Token (JWT)** for route protection middleware.

**AI Integration:**
- **Google Generative AI (Gemini)** dynamically processing custom curated prompt engineering to act as multiple specialized tools.

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine. You will also need a MongoDB instance (local or MongoDB Atlas) and an API key from Google Gemini Studio.

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd ToolStack
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `/server` directory containing the following:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```
Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal tab and navigate to the client folder.
```bash
cd client
npm install
```
Start the Vite development server:
```bash
npm run dev
```

### 4. Open the App
Navigate to `http://localhost:5173` in your browser. Create an account, log in, and start generating!

## 🎨 UI / UX Design Note
ToolStack AI strictly adheres to modern luxury web design aesthetics. The interface utilizes dark modes, multi-faceted glassmorphism (translucent panels over blurred backgrounds), and rich, vibrant gradients to provide an extremely premium interaction feel beyond a simple utility.

---
*Built with ❤️ and AI.*
