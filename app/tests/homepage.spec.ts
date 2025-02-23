import { test, expect } from "playwright/test";

test.describe("Homepage", () => {
	// Before each test, navigate to the homepage
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:5173/"); // Adjust the URL to where your Vue app is hosted
	});

	test("should load the homepage title correctly", async ({ page }) => {
		// Wait for the logo to be visible and check if it contains the correct text
		const logo = page.locator(".logo");
		await expect(logo).toBeVisible();
		await expect(logo).toHaveText("TVVerse");
	});

	// test("should show a loading skeleton when data is being fetched", async ({
	// 	page,
	// }) => {
	// 	// Wait for the skeleton loader to appear
	// 	const skeletonRow = page.locator("v-row:has(v-skeleton-loader)");

	// 	// Check if the skeleton loader is visible within the row
	// 	const skeletonLoader = skeletonRow.locator("v-skeleton-loader");
	// 	await expect(skeletonLoader).toBeVisible();
	// });

	test("should show error message when data fetching fails", async ({
		page,
	}) => {
		// Mock the failure of an API call
		// You can use Playwright's request API to intercept and mock the response here

		// Example: Mocking API failure (adjust according to your app's API calls)
		await page.route("https://api.tvmaze.com/shows", (route) => route.abort()); // Example API route
		await page.reload(); // Trigger error display
		const errorMessage = page.locator(
			'v-alert >> text="Failed to load TV shows"'
		);

		// Check that the error message is visible
		await expect(errorMessage).toBeVisible();
	});

	test("should filter shows when search query is entered", async ({ page }) => {
		// Wait for the input field to be visible
		const searchInput = page.locator('input[type="text"]');
		await expect(searchInput).toBeVisible();

		// Enter a search query in the input field
		await searchInput.fill("Breaking bad");
		await searchInput.press("Enter"); // Simulate pressing the Enter key

		// Wait for the filtered results and check that a show with the search term appears
		const showName = page.locator(".show-title"); // Adjust the selector to match your UI
		await expect(showName).toContainText("Breaking Bad");
	});

	test("should display no results message if no matching shows are found", async ({
		page,
	}) => {
		// Enter a non-existent query in the input field
		await page.fill('input[type="text"]', "NonExistentShow");
		await page.press('input[type="text"]', "Enter"); // Simulate pressing the Enter key

		// Wait for the "no results" message to appear and check the text
		const noResultsMessage = page.locator("h6");
		await expect(noResultsMessage).toBeVisible();
		await expect(noResultsMessage).toHaveText(
			"Sorry, we couldn't find any results matching your search. Try a different Keywords! "
		);
	});

	test("should display genre sections correctly", async ({ page }) => {
		// Wait for the GenreSection to load
		const genreSections = page.locator(".GenreSection");
		const genreCount = await genreSections.count();
		expect(genreCount).toBeGreaterThan(0);

		// Check if each genre section is visible
		for (let i = 0; i < genreCount; i++) {
			const genreSection = genreSections.nth(i);
			await expect(genreSection).toBeVisible();
		}

		// Check if there is a genre title inside each section
		const genreTitles = page.locator(".GenreSection .genre-title");

		// Ensure at least 1 genre title is present
		const genreTitleCount = await genreTitles.count();
		expect(genreTitleCount).toBeGreaterThan(0);

		// Check if each genre title is visible
		for (let i = 0; i < genreTitleCount; i++) {
			const genreTitle = genreTitles.nth(i);
			await expect(genreTitle).toBeVisible();
		}
	});
});
