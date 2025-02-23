import { defineConfig, devices } from "playwright/test";

export default defineConfig({
	testDir: "./tests", // Folder for your test cases
	timeout: 30000,
	use: {
		headless: true, // Run tests in headless mode
		actionTimeout: 0,
		baseURL: "http://localhost:5173/", // your dev server URL
		video: "on-first-retry", // optional: to record videos of tests
	},
});
