import { test, expect } from "playwright/test";

test.describe("Homepage", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:5173/");
	});

	test("should load the homepage title correctly", async ({ page }) => {
		const logo = page.locator(".logo");
		await expect(logo).toBeVisible();
		await expect(logo).toHaveText("TVVerse");
	});

	test("should filter shows when search query is entered", async ({ page }) => {
		const searchInput = page.locator('input[type="text"]');
		await expect(searchInput).toBeVisible();

		await searchInput.fill("Breaking bad");
		await searchInput.press("Enter");

		const showName = page.locator(".show-title");
		await expect(showName).toContainText("Breaking Bad");
	});

	test("should display genre sections correctly", async ({ page }) => {
		const genreSections = page.locator(".GenreSection");
		const genreCount = await genreSections.count();
		expect(genreCount).toBeGreaterThan(0);

		for (let i = 0; i < genreCount; i++) {
			const genreSection = genreSections.nth(i);
			await expect(genreSection).toBeVisible();
		}

		const genreTitles = page.locator(".GenreSection .genre-title");

		const genreTitleCount = await genreTitles.count();
		expect(genreTitleCount).toBeGreaterThan(0);

		for (let i = 0; i < genreTitleCount; i++) {
			const genreTitle = genreTitles.nth(i);
			await expect(genreTitle).toBeVisible();
		}
	});
});
