import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	root: path.resolve(__dirname),
	plugins: [react()],
	build: {
		outDir: 'dist',
		emptyOutDir: true,
	},
	server: {
		port: 5174,
	},
	resolve: {
		alias: {
			'@lib': path.resolve(__dirname, '../lib'),
		},
	},
});