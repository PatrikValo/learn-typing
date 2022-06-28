import { defineConfig } from "vite";
import config from "../shared/config";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
	plugins: [solidPlugin()],
	build: {
		target: "esnext",
		polyfillDynamicImport: false,
	},
	base: `http://localhost:${config.port}/`,
});
