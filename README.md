# Kali Linux Terminal Portfolio

A modern, Kali Linux-inspired portfolio website with a unique UI that mimics a Kali Linux terminal interface. Built with React, TypeScript, and styled-components.

## 🌟 Features

- **Kali Linux Terminal UI**: Authentic Kali Linux terminal aesthetic with glitch animations and terminal-like interactions
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, animations, and interactive components throughout
- **Dark Theme**: Sleek dark theme with Kali Linux signature colors (blue, green, red)
- **Animated Header**: Glitch effect animations on the header component
- **Performance Optimized**: Fast loading times and smooth animations

## 🚀 Live Demo

[View Live Demo](https://yourusername.github.io/kali-terminal-portfolio)

## 🛠️ Technologies Used

- React 18
- TypeScript
- styled-components
- Vite
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
   git clone https://github.com/yourusername/kali-terminal-portfolio.git
   cd kali-terminal-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📦 Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

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
kali-terminal-portfolio/
├── public/              # Static files
├── src/                 # Source files
│   ├── components/      # React components
│   │   ├── AnimatedHeader.tsx
│   │   └── ...         # Other components
│   ├── styles/          # Global styles
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## 🧩 Customization

### Changing Colors
The theme colors are defined as CSS variables in the global styles:
- `--kali-terminal-bg`: Terminal background color
- `--kali-blue`: Primary accent color
- `--kali-green`: Secondary accent color
- `--kali-red`: Tertiary accent color
- `--kali-text`: Text color

### Modifying Header
The animated header component (`AnimatedHeader.tsx`) can be customized by:
- Adjusting the glitch animation parameters
- Modifying the gradient background
- Changing the text content and styling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Aleric - Cloud Security Engineer

## 🙏 Acknowledgments

- Inspired by Kali Linux terminal interface
- Fonts from [Google Fonts](https://fonts.google.com/) 