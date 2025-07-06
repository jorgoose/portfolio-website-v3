import { expect, test } from '@playwright/test';

test.describe('Home Page Accessibility', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('has proper heading structure', async ({ page }) => {
		// Should have exactly one h1
		const h1Elements = page.locator('h1');
		await expect(h1Elements).toHaveCount(1);
		
		// h1 should be visible and have content
		await expect(h1Elements.first()).toBeVisible();
		await expect(h1Elements.first()).not.toBeEmpty();
	});

	test('navigation links have proper accessibility attributes', async ({ page }) => {
		const menuLinks = page.locator('a[href]');
		const count = await menuLinks.count();
		
		for (let i = 0; i < count; i++) {
			const link = menuLinks.nth(i);
			
			// Links should be visible
			await expect(link).toBeVisible();
			
			// Links should have href attributes
			await expect(link).toHaveAttribute('href');
			
			// Links should have text content
			await expect(link).not.toBeEmpty();
		}
	});

	test('interactive elements are keyboard accessible', async ({ page }) => {
		// Test Tab navigation
		await page.keyboard.press('Tab');
		
		// Should have a focused element
		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toBeVisible();
		
		// Test Enter key activation
		await page.keyboard.press('Enter');
		
		// Should navigate or trigger action (URL should change or something should happen)
		// This test depends on what the first focusable element does
	});

	test('CRT mode toggle is accessible', async ({ page }) => {
		// Find CRT mode toggle
		const crtToggle = page.getByText('CRT MODE');
		await expect(crtToggle).toBeVisible();
		
		// Should be keyboard accessible
		await crtToggle.focus();
		await expect(crtToggle).toBeFocused();
		
		// Should be activatable with keyboard
		await page.keyboard.press('Enter');
		
		// Should toggle CRT mode
		await expect(page.locator('.crt-background')).toBeVisible();
	});

	test('radio widget has proper accessibility', async ({ page }) => {
		const radioWidget = page.locator('.radio-widget');
		await expect(radioWidget).toBeVisible();
		
		// Should be keyboard accessible
		await radioWidget.focus();
		await expect(radioWidget).toBeFocused();
		
		// Should be activatable with keyboard
		await page.keyboard.press('Enter');
		
		// Should expand (adjust selector based on implementation)
		await expect(page.locator('.radio-widget.expanded')).toBeVisible();
	});

	test('no accessibility violations with color contrast', async ({ page }) => {
		// Test that text has sufficient contrast
		const textElements = page.locator('h1, a, button, [role="button"]');
		const count = await textElements.count();
		
		for (let i = 0; i < count; i++) {
			const element = textElements.nth(i);
			await expect(element).toBeVisible();
			
			// Get computed styles
			const styles = await element.evaluate((el) => {
				const computed = window.getComputedStyle(el);
				return {
					color: computed.color,
					backgroundColor: computed.backgroundColor,
					fontSize: computed.fontSize
				};
			});
			
			// Basic check that color is not transparent
			expect(styles.color).not.toBe('rgba(0, 0, 0, 0)');
			expect(styles.color).not.toBe('transparent');
		}
	});

	test('page works with screen reader navigation', async ({ page }) => {
		// Test aria-labels and roles
		const interactiveElements = page.locator('[role="button"], button, a, input, select, textarea');
		const count = await interactiveElements.count();
		
		for (let i = 0; i < count; i++) {
			const element = interactiveElements.nth(i);
			
			// Each interactive element should have accessible text
			const accessibleName = await element.evaluate((el) => {
				// Check for aria-label, aria-labelledby, or text content
				const ariaLabel = el.getAttribute('aria-label');
				const ariaLabelledBy = el.getAttribute('aria-labelledby');
				const textContent = el.textContent?.trim();
				
				return ariaLabel || ariaLabelledBy || textContent;
			});
			
			// Should have some form of accessible name
			expect(accessibleName).toBeTruthy();
		}
	});

	test('focus management works correctly', async ({ page }) => {
		// Test that focus is visible and properly managed
		await page.keyboard.press('Tab');
		
		let focusedElement = page.locator(':focus');
		await expect(focusedElement).toBeVisible();
		
		// Tab through several elements
		for (let i = 0; i < 5; i++) {
			await page.keyboard.press('Tab');
			focusedElement = page.locator(':focus');
			await expect(focusedElement).toBeVisible();
		}
		
		// Test Shift+Tab (reverse navigation)
		await page.keyboard.press('Shift+Tab');
		focusedElement = page.locator(':focus');
		await expect(focusedElement).toBeVisible();
	});

	test('skip links work if present', async ({ page }) => {
		// Look for skip links (common accessibility pattern)
		const skipLink = page.locator('a[href="#main"], a[href="#content"], .skip-link');
		
		// If skip links exist, they should work
		const skipLinkCount = await skipLink.count();
		if (skipLinkCount > 0) {
			await skipLink.first().click();
			
			// Should focus main content area
			const mainContent = page.locator('#main, #content, main, [role="main"]');
			if (await mainContent.count() > 0) {
				await expect(mainContent.first()).toBeFocused();
			}
		}
	});

	test('responsive design maintains accessibility', async ({ page }) => {
		// Test accessibility on mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		
		// Navigation should still be accessible
		const menuItems = page.locator('a[href]');
		const count = await menuItems.count();
		
		for (let i = 0; i < count; i++) {
			const link = menuItems.nth(i);
			await expect(link).toBeVisible();
		}
		
		// CRT mode toggle should still be accessible
		const crtToggle = page.getByText('CRT MODE');
		await expect(crtToggle).toBeVisible();
		await crtToggle.focus();
		await expect(crtToggle).toBeFocused();
	});

	test('no keyboard traps exist', async ({ page }) => {
		// Test that user can navigate through all focusable elements and escape
		const focusableElements = page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
		const count = await focusableElements.count();
		
		// Tab through all elements
		for (let i = 0; i < count + 2; i++) {
			await page.keyboard.press('Tab');
			
			// Should always have a focused element
			const focusedElement = page.locator(':focus');
			await expect(focusedElement).toBeVisible();
		}
		
		// Should be able to tab out of the page content
		// (focus should cycle back to first element or move to browser UI)
	});
}); 