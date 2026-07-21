import { expect, test } from "@playwright/test";

test("uploads an image and reveals the mocked transparent result", async ({ page }) => {
  await page.route("**/api/remove-background", async (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ originalUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9Z1z8AAAAASUVORK5CYII=", processedUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9Z1z8AAAAASUVORK5CYII=", publicId: "avery-background-remover/mock", width: 1200, height: 800 }) }));
  await page.goto("/software/background-remover");
  await page.waitForFunction(() => document.readyState === "complete");
  await page.waitForTimeout(1_000);
  await page.locator('input[type="file"]').setInputFiles({ name: "product.jpg", mimeType: "image/jpeg", buffer: Buffer.from([0xff,0xd8,0xff,0,0,0,0,0,0,0,0,0]) });
  await expect(page.getByRole("heading", { name: "Working on your image" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "See the Difference" })).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole("button", { name: "Download PNG" })).toBeVisible();
  await expect(page.getByLabel("Before and after comparison position")).toBeVisible();
});
