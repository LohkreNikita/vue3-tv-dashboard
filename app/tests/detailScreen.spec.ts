import { test, expect } from "playwright/test";

test.describe("Show Details Page", () => {
	const showId = 1; // Replace with a valid show ID for your application
	const baseUrl = "http://localhost:5173/"; // Replace with the actual URL of your Vue app

	// Before each test, navigate to the show details page
	test.beforeEach(async ({ page }) => {
		await page.goto(`${baseUrl}show/${showId}`); // Navigate to show details page with a dynamic ID
	});

	test("should display loading skeleton while data is being fetched", async ({
		page,
	}) => {
		// Wait for the loading skeleton to be visible
		const loadingSkeleton = page.locator("v-row:has(v-skeleton-loader)");
		await expect(loadingSkeleton).toBeVisible();
	});

	test("should display error message when data fetching fails", async ({
		page,
	}) => {
		// Mock API to simulate a failure scenario
		await page.route("**/tv-shows/*", (route) => route.abort()); // Abort API request
		await page.reload(); // Trigger the error state
		const errorMessage = page.locator('v-alert[type="error"]');

		// Check that the error message is displayed
		await expect(errorMessage).toBeVisible();
		await expect(errorMessage).toHaveText("Failed to load TV show details");
	});

	test("should display show details correctly when data is fetched", async ({
		page,
	}) => {
		// Check if the show title is visible and dynamic
		const showTitle = page.locator(".show-detail-container h1");
		await expect(showTitle).toBeVisible();

		// Extract the dynamic show name directly from the text on the page
		const dynamicShowName = await showTitle.textContent();
		expect(dynamicShowName).not.toBeNull();

		// Check if the premiered date is visible
		const premieredDate = page.locator(
			'.show-detail-container p:has-text("Premiered:")'
		);
		await expect(premieredDate).toBeVisible();
		await expect(premieredDate).toContainText("Premiered:"); // The actual premiered date is dynamic

		// Check if the show rating is visible and dynamic
		const showRating = page.locator(
			'.show-detail-container .v-chip:has-text("⭐")'
		);
		await expect(showRating).toBeVisible();

		// Extract the dynamic rating from the page
		const dynamicRating = await showRating.textContent();
		expect(dynamicRating).not.toBeNull();
		expect(dynamicRating).toContain("⭐"); // The actual rating is dynamic (replace the test case depending on your actual data)
	});

	test("should display cast details if available", async ({ page }) => {
		// Locate the cast section header
		const castHeader = page.locator(".cast-section h2");
		await expect(castHeader).toBeVisible(); // Check if the "Cast" header is visible

		// Verify each actor card contains an image and the actor's name
		const actorImages = page.locator(".actor-image");
		await expect(actorImages.first()).toBeVisible(); // Check if the first actor image is visible
		const actorNames = page.locator(".actor-name");
		await expect(actorNames.first()).toHaveText(/.+/); // Check if the first actor name is non-empty

		// Check if the character name is shown for the first actor
		const characterNames = page.locator(".character-name");
		await expect(characterNames.first()).toHaveText(/.+/); // Check if the first character name is non-empty
	});
});
