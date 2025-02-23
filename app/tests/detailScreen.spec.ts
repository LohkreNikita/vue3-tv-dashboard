import { test, expect } from "playwright/test";

test.describe("Show Details Page", () => {
	const showId = 1;
	const baseUrl = "http://localhost:5173/";

	test.beforeEach(async ({ page }) => {
		await page.goto(`${baseUrl}show/${showId}`);
	});

	test("should display show details correctly when data is fetched", async ({
		page,
	}) => {
		const showTitle = page.locator(".show-detail-container h1");
		await expect(showTitle).toBeVisible();

		const dynamicShowName = await showTitle.textContent();
		expect(dynamicShowName).not.toBeNull();

		const premieredDate = page.locator(
			'.show-detail-container p:has-text("Premiered:")'
		);
		await expect(premieredDate).toBeVisible();
		await expect(premieredDate).toContainText("Premiered:");
	});

	test("should display cast details if available", async ({ page }) => {
		const castHeader = page.locator(".cast-section h2");
		await expect(castHeader).toBeVisible();

		const actorImages = page.locator(".actor-image");
		await expect(actorImages.first()).toBeVisible();
		const actorNames = page.locator(".actor-name");
		await expect(actorNames.first()).toHaveText(/.+/);
		const characterNames = page.locator(".character-name");
		await expect(characterNames.first()).toHaveText(/.+/);
	});
});
