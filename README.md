# Terminal-Style Portfolio Website

A modern, terminal-inspired portfolio website with a unique UI that mimics a command-line interface. Built with React, TypeScript, and styled-components.

![Terminal Portfolio Preview](preview.png)

## 🌟 Features

- **Terminal-Inspired UI**: Command-line interface aesthetic with typing animations and terminal-like interactions
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, animations, and interactive components throughout
- **Dark Mode**: Sleek dark theme with accent colors for better readability
- **Secret Access**: Hidden logs section accessible via Konami code (desktop) or tap sequence (mobile)
- **Performance Optimized**: Fast loading times and smooth animations

## 🚀 Live Demo

[View Live Demo](https://yourusername.github.io/terminal-portfolio)

## 🛠️ Technologies Used

- React 18
- TypeScript
- styled-components
- React Router
- React Context API
- CSS Animations
- Local Storage for data persistence

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Git

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/terminal-portfolio.git
   cd terminal-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📦 Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

## 🔐 Secret Access

### Desktop
To access the hidden logs section on desktop, enter the Konami code:
```
↑ ↑ ↓ ↓ ← → ← → B A
```

### Mobile
On mobile devices, tap the "?" button in the bottom-right corner 5 times within 2 seconds.

## 📁 Project Structure

```
terminal-portfolio/
├── public/              # Static files
├── src/                 # Source files
│   ├── components/      # React components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── styles/          # Global styles
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── index.tsx        # Entry point
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## 🧩 Customization

### Changing Colors
Edit the CSS variables in `src/styles/GlobalStyles.ts` to change the color scheme.

### Adding Content
Update the content in the respective component files:
- `src/components/ArticlesSection.tsx` for articles
- `src/components/CareerSection.tsx` for career information
- `src/components/HomeSection.tsx` for home page content

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Your Name - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Inspired by terminal interfaces and hacker aesthetics
- Icons from [Font Awesome](https://fontawesome.com/)
- Fonts from [Google Fonts](https://fonts.google.com/) 