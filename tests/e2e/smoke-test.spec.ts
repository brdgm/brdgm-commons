import { test, expect } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('brdgm-commons')

  // credits dialog
  await page.getByRole('link', { name: 'Credits' }).click()
  await page.getByText('Close').click()
})
