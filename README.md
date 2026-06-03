# BriefCV

BriefCV is a high-performance, ATS-optimized CV builder designed to help professionals craft impactful resumes that stand out.

## Key Features

- **ATS-Optimized Templates:** Choose from professionally crafted, ATS-friendly templates to ensure your resume reaches human recruiters.
- **AI-Powered Builder:** Utilize AI to rapidly populate sections based on your professional experience and essays.
- **Responsive Editor:** A seamless, mobile-first builder experience allowing you to edit and preview your resume on any device.
- **High-Fidelity Export:** Generate professional PDF resumes with high-fidelity formatting.
- **Flexible Customization:** Advanced layout control, including column management and design styling.

## Tech Stack

BriefCV is built using modern web standards for speed, security, and scalability:

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **Library:** [React](https://react.dev/) 19
- **Database:** [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) 4
- **State Management:** [Zustand](https://zustand.docs.pmnd.rs/)
- **PDF Generation:** [Puppeteer](https://pptr.dev/) & [react-to-pdf](https://www.npmjs.com/package/react-to-pdf)
- **AI Integration:** [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gladiarn/BriefCV.git
   cd briefcv
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory and add necessary configuration (e.g., MongoDB URI, API keys).

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Development & Contribution

- **Linting:** `npm run lint`
- **Formatting:** `npm run format`

Contributions, issues, and feature requests are welcome!
