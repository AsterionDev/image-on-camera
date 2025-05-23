# image-on-camera

A lightweight Preact + Vite app that lets you overlay a custom image on your device's live camera feed. Drag, scale, rotate, adjust opacity—and even go fullscreen—all in real time.

## Features

- 📷 Live camera stream (with on-demand permission request)
- 🖼️ Image upload as overlay
- 🤏 Drag overlay with mouse or touch
- 📐 Pinch to scale & rotate via two-finger gestures
- 🎚️ Slider controls for manual opacity, scale & rotation
- 🔲 Fullscreen toggle for immersive view
- 🔒 Works over HTTPS (or localhost) for secure getUserMedia

## Demo

View the live demo on GitHub Pages:

https://AsterionDev.github.io/image-on-camera/

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Git

### Installation

```bash
# Clone the repo
git clone https://github.com/AsterionDev/image-on-camera.git
cd image-on-camera

# Install dependencies
npm install
# or yarn install
```

### Development

Start the development server with HTTPS support on LAN:

```bash
npm run dev -- --host --https
```

Your app will be available at:

```
https://localhost:5173/
https://<your-lan-ip>:5173/
```

### Production Build

```bash
npm run build
```

Then serve the generated `dist/` directory with any static file server (e.g., `serve`, Netlify, GitHub Pages).

## Deployment to GitHub Pages

1. In `vite.config.ts`, set the base path for production:
   ```ts
   export default defineConfig({
     base: '/image-on-camera/',
     plugins: [preact()],
   });
   ```
2. Add these scripts to `package.json`:
   ```json
   "scripts": {
     "build": "vite build",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Install `gh-pages` as a dev dependency:
   ```bash
   npm install --save-dev gh-pages
   ```
4. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

Your site will go live at:

```
https://AsterionDev.github.io/image-on-camera/
```

## Usage

1. Click **Permitir Cámara** to grant camera access.
2. Upload an image via the file input.
3. Drag the overlay to reposition.
4. Pinch or use sliders to scale, rotate & change opacity.
5. Click **Pantalla Completa** for fullscreen view.

## Configuration

- **SSL in Development**: Use `mkcert` to generate a local CA and certificates:
  ```bash
  mkcert -install
  mkcert 127.0.0.1 localhost <your-lan-ip>
  ```
  Then configure `vite.config.ts`:
  ```ts
  server: {
    host: true,
    https: {
      key: fs.readFileSync('certs/127.0.0.1+2-key.pem'),
      cert: fs.readFileSync('certs/127.0.0.1+2.pem')
    }
  }
  ```

## Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes (`git commit -m 'feat: add my feature'`)
4. Push to the branch (`git push origin feat/my-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- [Preact](https://preactjs.com)
- [Vite](https://vite.dev)
- [Interact.js](https://interactjs.io)
- mkcert for local HTTPS

