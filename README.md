# Belal Nagy's Portfolio

A modern, responsive portfolio website showcasing my skills, projects, and experience. Built with React, Vite, and Tailwind CSS.

## 🚀 Features

- 📱 Fully responsive design
- ✨ Smooth animations using Framer Motion
- 📊 Interactive components and UI elements
- 🎯 Project showcase with detailed descriptions
- 💻 Skills section with technology stack
- 📧 Contact form with EmailJS integration (sends emails directly)
- 📄 CV download functionality
- 📜 Scroll progress indicator
- 🔔 Notification system for user feedback
- 🌙 Dark theme optimized

## 🛠️ Technologies Used

- [React](https://reactjs.org/) - Frontend library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [EmailJS](https://www.emailjs.com/) - Email service for contact form

## 📦 Installation

1. Clone the repository

```bash
git clone https://github.com/Belalnajy/portfolio.git
```

2. Navigate to the project directory

```bash
cd portfolio
```

3. Install dependencies

```bash
npm install
```

4. Set up environment variables

Copy `.env.example` to `.env` and fill in your EmailJS credentials:

```bash
cp .env.example .env
```

Then edit `.env` with your EmailJS values. See [EMAILJS_SETUP.md](./docs/EMAILJS_SETUP.md) for detailed instructions.

5. Start the development server

```bash
npm run dev
```

6. Build for production

```bash
npm run build
```

## 📧 Contact Form Setup

The contact form uses EmailJS to send emails directly to your inbox. To set it up:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up a Gmail service with your email and app password
3. Create an email template
4. Copy your Service ID, Template ID, and Public Key to `.env`

For detailed step-by-step instructions, see [EMAILJS_SETUP.md](./docs/EMAILJS_SETUP.md)

## 🌐 Deployment

This project is deployed on Vercel. Visit the live site at: [https://portfolio-belalnajy.vercel.app](https://portfolio-16ey.vercel.app/)

**Important for Vercel deployment:**
- Add your environment variables in Vercel Dashboard → Settings → Environment Variables
- Add all three EmailJS variables (Service ID, Template ID, Public Key)

## 🎨 Design

- Modern and clean interface
- Responsive layout for all devices
- Smooth transitions and animations
- Custom favicon and branding

## 📝 Project Structure

```
portfolio/
├── public/             # Static assets
│   ├── components/     # React components
│   ├── assets/         # Project assets
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind configuration
└── vercel.json         # Vercel deployment configuration
```

## 🤝 Contact

- GitHub: [@Belalnajy](https://github.com/Belalnajy)
- LinkedIn: [Belal Nagy](https://linkedin.com/in/belalnajy)
- Email: belalnajy9@gmail.com
