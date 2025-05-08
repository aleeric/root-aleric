# root@aleric

A modern, interactive cybersecurity portfolio website built with React and TypeScript, featuring a Kali Linux-inspired terminal interface and responsive design.

![](imgs/home.png)

## 🌟 Features

- **Interactive Terminal Interface**: Experience a fully functional terminal emulator with command history and custom commands
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Dynamic Content**: Articles, career information, and real-time logging dashboard
- **Modern UI/UX**: Kali Linux-inspired theme with smooth animations and transitions
- **Performance Optimized**: Lazy loading and optimized assets for fast loading times

## 🚀 Tech Stack

- React 18
- TypeScript
- Styled Components
- React Router
- Vite
- Custom Hooks and Context API

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/aleeric/root-aleric.git
cd root-aleric
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🎯 Project Structure

```
src/
├── components/         # React components
├── context/           # React context providers
├── styles/            # Global styles and themes
├── utils/             # Utility functions
└── App.tsx           # Main application component
```

## 🔧 Configuration

The project uses environment variables for configuration. Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
```

## 📱 Responsive Design

- Desktop: Full terminal interface with side menu
- Mobile: Optimized touch interface with simplified navigation
- Tablet: Adaptive layout with touch-friendly controls

## 🎨 Customization

The theme can be customized by modifying the CSS variables in `src/styles/kali-theme.css`:

```css
:root {
  --kali-blue: #00ff9d;
  --kali-bg: #0a0a0a;
  --kali-text: #ffffff;
  /* Add more custom variables */
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For any questions or suggestions, please open an issue in the GitHub repository.

## 🙏 Acknowledgments

- Inspired by Kali Linux terminal interface
- Built with modern web technologies
- Special thanks to the open-source community 