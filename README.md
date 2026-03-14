# ALONE CODE STUDIO v4 🚀

A professional offline-capable web IDE with Live Preview, built with Vue 3 + CodeMirror 6.

## ✨ What's New in v4

| Feature | Description |
|---|---|
| 📱 **PWA Support** | Installable on Android, iOS & Desktop |
| 🔌 **Offline Mode** | Editor & File Manager work 100% offline |
| 📺 **Live Preview** | Phone-frame preview for HTML/CSS/JS |
| 🌐 **Network Status** | Real-time Online/Offline indicator |
| 🚫 **Smart Disable** | AI & Run blocked offline with tooltip |

## 🚀 Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source: GitHub Actions**
3. The workflow auto-deploys on every push to `main`

## 🔑 AI Assistant Setup

1. Get your API key from [console.anthropic.com](https://console.anthropic.com)
2. Open **Settings (⚙)** → paste key in **Anthropic API Key**
3. Key is stored only in your browser's localStorage

## 📦 Tech Stack

- **Vue 3** (CDN, no build step)
- **CodeMirror 6** (via esm.sh)
- **Piston API** (code execution)
- **Anthropic API** (AI assistant)
- **Service Worker** (offline caching)
