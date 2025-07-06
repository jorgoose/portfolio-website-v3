import { expect, test } from '@playwright/test';

test.describe('Home Page Performance', () => {
	test('page loads within acceptable time', async ({ page }) => {
		const startTime = Date.now();
		
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		
		const loadTime = Date.now() - startTime;
		
		// Page should load within 3 seconds
		expect(loadTime).toBeLessThan(3000);
	});

	test('Core Web Vitals are within acceptable ranges', async ({ page }) => {
		await page.goto('/');
		
		// Wait for page to fully load
		await page.waitForLoadState('networkidle');
		
		// Measure Core Web Vitals
		const vitals = await page.evaluate(() => {
			return new Promise<{fcp: number, lcp: number, loadTime: number}>((resolve) => {
				// Simple performance measurement
				const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
				
				resolve({
					// First Contentful Paint approximation
					fcp: perfData.responseStart - perfData.fetchStart,
					// Largest Contentful Paint approximation
					lcp: perfData.loadEventEnd - perfData.fetchStart,
					// Total load time
					loadTime: perfData.loadEventEnd - perfData.fetchStart
				});
			});
		});
		
		// FCP should be under 1.8 seconds
		expect(vitals.fcp).toBeLessThan(1800);
		
		// LCP should be under 2.5 seconds
		expect(vitals.lcp).toBeLessThan(2500);
		
		// Total load time should be reasonable
		expect(vitals.loadTime).toBeLessThan(3000);
	});

	test('video loads efficiently', async ({ page }) => {
		await page.goto('/');
		
		// Wait for video element to be present
		const video = page.locator('video');
		await expect(video).toBeVisible();
		
		// Check video loading performance
		const videoMetrics = await page.evaluate(() => {
			const video = document.querySelector('video') as HTMLVideoElement;
			if (!video) return null;
			
			return {
				readyState: video.readyState,
				networkState: video.networkState,
				currentTime: video.currentTime,
				duration: video.duration
			};
		});
		
		// Video should be in a good ready state
		expect(videoMetrics?.readyState).toBeGreaterThanOrEqual(1); // HAVE_METADATA
	});

	test('audio context initializes efficiently', async ({ page }) => {
		await page.goto('/');
		
		// Click radio widget to initialize audio
		const radioWidget = page.locator('.radio-widget');
		await radioWidget.click();
		
		// Check audio context creation time
		const audioMetrics = await page.evaluate(() => {
			const startTime = performance.now();
			
			// Try to create audio context
			try {
				const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
				const creationTime = performance.now() - startTime;
				
				return {
					creationTime,
					state: audioContext.state,
					sampleRate: audioContext.sampleRate
				};
			} catch (error) {
				return { error: error.message };
			}
		});
		
		// Audio context should initialize quickly
		if (!audioMetrics.error) {
			expect(audioMetrics.creationTime).toBeLessThan(100); // Less than 100ms
		}
	});

	test('CRT mode toggle is performant', async ({ page }) => {
		await page.goto('/');
		
		// Measure CRT mode toggle performance
		const toggleTime = await page.evaluate(() => {
			const startTime = performance.now();
			
			// Find and click CRT mode toggle
			const crtToggle = document.querySelector('[data-testid="crt-toggle"]') || 
							 Array.from(document.querySelectorAll('*')).find(el => 
								el.textContent?.includes('CRT MODE')
							 );
			
			if (crtToggle) {
				(crtToggle as HTMLElement).click();
			}
			
			return performance.now() - startTime;
		});
		
		// CRT mode toggle should be instantaneous
		expect(toggleTime).toBeLessThan(50); // Less than 50ms
	});

	test('memory usage is reasonable', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		
		// Measure memory usage if available
		const memoryInfo = await page.evaluate(() => {
			// @ts-ignore - performance.memory is not in standard types
			const memory = (performance as any).memory;
			if (memory) {
				return {
					usedJSHeapSize: memory.usedJSHeapSize,
					totalJSHeapSize: memory.totalJSHeapSize,
					jsHeapSizeLimit: memory.jsHeapSizeLimit
				};
			}
			return null;
		});
		
		if (memoryInfo) {
			// Memory usage should be reasonable (less than 50MB)
			expect(memoryInfo.usedJSHeapSize).toBeLessThan(50 * 1024 * 1024);
		}
	});

	test('no memory leaks when toggling CRT mode', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		
		// Get initial memory usage
		const initialMemory = await page.evaluate(() => {
			// @ts-ignore
			const memory = (performance as any).memory;
			return memory ? memory.usedJSHeapSize : 0;
		});
		
		// Toggle CRT mode multiple times
		for (let i = 0; i < 10; i++) {
			await page.getByText('CRT MODE').click();
			await page.waitForTimeout(100);
		}
		
		// Force garbage collection if possible
		await page.evaluate(() => {
			// @ts-ignore - gc is not in standard types but may be available in some environments
			if ((window as any).gc) {
				(window as any).gc();
			}
		});
		
		// Get final memory usage
		const finalMemory = await page.evaluate(() => {
			// @ts-ignore
			const memory = (performance as any).memory;
			return memory ? memory.usedJSHeapSize : 0;
		});
		
		// Memory shouldn't increase significantly (allow for some variance)
		if (initialMemory > 0 && finalMemory > 0) {
			const memoryIncrease = finalMemory - initialMemory;
			expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // Less than 10MB increase
		}
	});

	test('responsive design performance on mobile', async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		
		const startTime = Date.now();
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		const loadTime = Date.now() - startTime;
		
		// Mobile should load reasonably fast
		expect(loadTime).toBeLessThan(4000); // Allow slightly more time for mobile
		
		// Test CRT mode performance on mobile
		const crtToggleTime = await page.evaluate(() => {
			const startTime = performance.now();
			
			const crtToggle = Array.from(document.querySelectorAll('*')).find(el => 
				el.textContent?.includes('CRT MODE')
			);
			
			if (crtToggle) {
				(crtToggle as HTMLElement).click();
			}
			
			return performance.now() - startTime;
		});
		
		// CRT mode should still be fast on mobile
		expect(crtToggleTime).toBeLessThan(100);
	});
}); 