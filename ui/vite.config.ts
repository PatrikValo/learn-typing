import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const port = 8080;

export default defineConfig({
	plugins: [solidPlugin()],
	build: {
		target: "esnext",
		polyfillDynamicImport: false,
	},
	base: `http://localhost:${port}/`,
});
