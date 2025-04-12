# Deployment Guide: Terminal Portfolio to GitHub

This guide provides step-by-step instructions for deploying your terminal-style portfolio website to GitHub as a private repository.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Creating a Private GitHub Repository](#creating-a-private-github-repository)
3. [Preparing Your Project](#preparing-your-project)
4. [Pushing to GitHub](#pushing-to-github)
5. [Setting Up GitHub Pages](#setting-up-github-pages)
6. [Custom Domain (Optional)](#custom-domain-optional)
7. [Maintenance and Updates](#maintenance-and-updates)

## Prerequisites

Before you begin, ensure you have:

- A GitHub account
- Git installed on your local machine
- Your project ready for deployment
- Basic knowledge of Git commands

## Creating a Private GitHub Repository

1. **Log in to GitHub** at [github.com](https://github.com)

2. **Create a new repository**:
   - Click the "+" icon in the top-right corner
   - Select "New repository"
   - Enter a repository name (e.g., "terminal-portfolio")
   - Add a description (optional)
   - Select "Private" for repository visibility
   - Check "Add a README file" if you want to start with a README
   - Click "Create repository"

3. **Note your repository URL**:
   - It will look like: `https://github.com/yourusername/terminal-portfolio.git`

## Preparing Your Project

1. **Update your README.md**:
   - Replace the placeholder content with your actual project information
   - Update the repository URL in the installation instructions

2. **Create a preview image**:
   - Take a screenshot of your website
   - Save it as `preview.png` in the root directory
   - This will be displayed in your README

3. **Check your .gitignore file**:
   - Ensure it includes:
     ```
     # dependencies
     /node_modules
     
     # production
     /build
     
     # misc
     .DS_Store
     .env.local
     .env.development.local
     .env.test.local
     .env.production.local
     
     npm-debug.log*
     yarn-debug.log*
     yarn-error.log*
     ```

4. **Update package.json**:
   - Add the homepage field with your GitHub Pages URL:
     ```json
     "homepage": "https://yourusername.github.io/terminal-portfolio",
     ```
   - Add a deploy script:
     ```json
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
     ```

5. **Install gh-pages package**:
   ```bash
   npm install --save-dev gh-pages
   # or
   yarn add --dev gh-pages
   ```

## Pushing to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

2. **Add your files**:
   ```bash
   git add .
   ```

3. **Commit your changes**:
   ```bash
   git commit -m "Initial commit"
   ```

4. **Add the remote repository**:
   ```bash
   git remote add origin https://github.com/yourusername/terminal-portfolio.git
   ```

5. **Push to GitHub**:
   ```bash
   git push -u origin main
   # or if your default branch is master
   git push -u origin master
   ```

## Setting Up GitHub Pages

1. **Install gh-pages package** (if not already done):
   ```bash
   npm install --save-dev gh-pages
   # or
   yarn add --dev gh-pages
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   # or
   yarn deploy
   ```

3. **Configure GitHub Pages settings**:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "GitHub Pages" section
   - Under "Source", select "gh-pages" branch
   - Click "Save"

4. **Verify deployment**:
   - Your site will be available at `https://yourusername.github.io/terminal-portfolio`
   - It may take a few minutes for the changes to propagate

## Custom Domain (Optional)

If you want to use a custom domain:

1. **Purchase a domain** from a domain registrar

2. **Add DNS records**:
   - Add a CNAME record pointing to `yourusername.github.io`
   - Example: `www.yourdomain.com` → `yourusername.github.io`

3. **Configure GitHub Pages**:
   - Go to your repository settings
   - Under "GitHub Pages", enter your custom domain
   - Check "Enforce HTTPS" if available
   - Click "Save"

4. **Create a CNAME file**:
   - Create a file named `CNAME` in the `public` directory
   - Add your domain name to the file
   - Commit and push the changes

5. **Deploy again**:
   ```bash
   npm run deploy
   # or
   yarn deploy
   ```

## Maintenance and Updates

1. **Make changes to your code**

2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

3. **Push to GitHub**:
   ```bash
   git push
   ```

4. **Deploy updates**:
   ```bash
   npm run deploy
   # or
   yarn deploy
   ```

5. **Check deployment status**:
   - Go to your repository on GitHub
   - Click on "Actions" tab
   - You can see the status of your deployment

## Troubleshooting

- **404 Error**: Ensure your repository is public or you have GitHub Pro for private repositories with GitHub Pages
- **Build Failures**: Check the Actions tab for error messages
- **Styling Issues**: Make sure all paths in your code are relative, not absolute
- **Deployment Not Working**: Verify that the gh-pages branch exists and is selected as the source

## Security Considerations

- **Private Repository**: Your code is private, but the deployed site is public
- **API Keys**: Never commit API keys or sensitive information to your repository
- **Environment Variables**: Use environment variables for sensitive data
- **Dependencies**: Regularly update dependencies to patch security vulnerabilities

---

For more information, visit the [GitHub Pages documentation](https://docs.github.com/en/pages). 