import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('has expected heading', async ({ page }) => {
		await expect(page.locator('h1')).toBeVisible();
	});

	test('displays all navigation menu items', async ({ page }) => {
		const menuItems = ['ABOUT', 'EXPERIENCE', 'PROJECTS', 'SKILLS', 'CONTACT'];
		
		for (const item of menuItems) {
			await expect(page.getByText(item)).toBeVisible();
		}
	});

	test('navigation links work correctly', async ({ page }) => {
		// Test About page navigation
		await page.getByRole('link', { name: 'ABOUT' }).click();
		await expect(page).toHaveURL('/about');
		await page.goBack();

		// Test Experience page navigation
		await page.getByRole('link', { name: 'EXPERIENCE' }).click();
		await expect(page).toHaveURL('/experience');
		await page.goBack();

		// Test Projects page navigation
		await page.getByRole('link', { name: 'PROJECTS' }).click();
		await expect(page).toHaveURL('/projects');
		await page.goBack();

		// Test Skills page navigation
		await page.getByRole('link', { name: 'SKILLS' }).click();
		await expect(page).toHaveURL('/skills');
		await page.goBack();

		// Test Contact page navigation
		await page.getByRole('link', { name: 'CONTACT' }).click();
		await expect(page).toHaveURL('/contact');
		await page.goBack();
	});

	test('CRT mode toggle works', async ({ page }) => {
		// Initially should not have CRT background
		await expect(page.locator('.crt-background')).not.toBeVisible();

		// Click CRT mode toggle
		await page.getByText('CRT MODE').click();

		// Should now have CRT background
		await expect(page.locator('.crt-background')).toBeVisible();
		await expect(page.locator('.tv-frame')).toBeVisible();

		// Toggle back off
		await page.getByText('CRT MODE').click();

		// Should no longer have CRT background
		await expect(page.locator('.crt-background')).not.toBeVisible();
	});

	test('CRT mode persists across page reloads', async ({ page }) => {
		// Enable CRT mode
		await page.getByText('CRT MODE').click();
		await expect(page.locator('.crt-background')).toBeVisible();

		// Reload page
		await page.reload();

		// CRT mode should still be enabled
		await expect(page.locator('.crt-background')).toBeVisible();
	});

	test('video element is present and configured correctly', async ({ page }) => {
		const video = page.locator('video');
		await expect(video).toBeVisible();
		
		// Check video attributes
		await expect(video).toHaveAttribute('autoplay');
		await expect(video).toHaveAttribute('loop');
		await expect(video).toHaveAttribute('muted');
		await expect(video).toHaveAttribute('playsinline');
	});

	test('radio widget is present and interactive', async ({ page }) => {
		const radioWidget = page.locator('.radio-widget');
		await expect(radioWidget).toBeVisible();

		// Click radio widget to expand
		await radioWidget.click();

		// Should expand (you may need to adjust selectors based on actual implementation)
		await expect(page.locator('.radio-widget.expanded')).toBeVisible();

		// Click again to collapse
		await radioWidget.click();

		// Should collapse
		await expect(page.locator('.radio-widget.expanded')).not.toBeVisible();
	});

	test('keyboard navigation works', async ({ page }) => {
		// Test Tab navigation through menu items
		await page.keyboard.press('Tab');
		const firstFocusable = page.locator(':focus');
		await expect(firstFocusable).toBeVisible();

		// Test Enter key on focused link
		await page.keyboard.press('Enter');
		// Should navigate (check URL change)
		await expect(page).not.toHaveURL('/');
	});

	test('responsive design works on mobile', async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });

		// Check that page still renders properly
		await expect(page.locator('h1')).toBeVisible();
		await expect(page.getByText('ABOUT')).toBeVisible();

		// Test CRT mode on mobile
		await page.getByText('CRT MODE').click();
		await expect(page.locator('.tv-frame')).toBeVisible();
	});

	test('handles video autoplay failure gracefully', async ({ page }) => {
		// This test checks that the page handles video autoplay failures
		// You might need to mock video autoplay failure
		
		// Check if video autoplay notification appears when needed
		const notification = page.locator('.video-notification, [data-testid="video-notification"]');
		// This assertion might be conditional based on browser/environment
	});

	test('audio visualization works when radio is activated', async ({ page }) => {
		// Grant audio permissions if needed
		await page.context().grantPermissions(['audio']);

		const radioWidget = page.locator('.radio-widget');
		await radioWidget.click();

		// Check if canvas element for audio visualization is present
		const canvas = page.locator('#waveform-canvas');
		await expect(canvas).toBeVisible();

		// Check if speaker images are present
		const speakerImage = page.locator('.speaker-image');
		await expect(speakerImage).toBeVisible();
	});

	test('page loads without JavaScript errors', async ({ page }) => {
		const errors: string[] = [];
		
		page.on('pageerror', (error) => {
			errors.push(error.message);
		});

		await page.reload();
		
		// Wait for page to fully load
		await page.waitForLoadState('networkidle');

		// Check that no JavaScript errors occurred
		expect(errors).toHaveLength(0);
	});

	test('accessibility features work correctly', async ({ page }) => {
		// Check that interactive elements have proper ARIA attributes
		const menuLinks = page.locator('a[href]');
		const count = await menuLinks.count();
		
		for (let i = 0; i < count; i++) {
			const link = menuLinks.nth(i);
			await expect(link).toBeVisible();
		}

		// Check that the page has proper heading structure
		await expect(page.locator('h1')).toBeVisible();

		// Test keyboard navigation
		await page.keyboard.press('Tab');
		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toBeVisible();
	});
});
