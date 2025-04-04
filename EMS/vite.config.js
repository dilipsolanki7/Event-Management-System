import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss(),],
});

// const { defineConfig } = require('vite');
// const react = require('@vitejs/plugin-react');
// const tailwindcss = require('@tailwindcss/vite');

// // https://vitejs.dev/config/
// module.exports = defineConfig({
//   plugins: [react(), tailwindcss()],
// });