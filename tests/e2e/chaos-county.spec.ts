import { expect, type Page, type TestInfo, test } from '@playwright/test';

const saveKey = 'chaos-county-3d-save-v2';

async function openFreshStart(page: Page) {
  await page.addInitScript((key) => window.localStorage.removeItem(key), saveKey);
  await page.goto('/');
  await expect(page.getByTestId('start-screen')).toBeVisible();
}

async function startNewGame(page: Page) {
  await openFreshStart(page);
  await page.getByTestId('new-game-button').click();
  await expect(page.getByTestId('hud')).toBeVisible();
}

async function dismissIntroIfVisible(page: Page) {
  const introDismiss = page.getByTestId('event-intro-dismiss');
  await introDismiss.waitFor({ state: 'visible', timeout: 2_000 }).catch(() => undefined);
  if (await introDismiss.isVisible().catch(() => false)) {
    await introDismiss.click();
    await expect(page.getByTestId('event-intro-card')).toBeHidden();
  }
}

async function attachScreenshot(page: Page, name: string, testInfo: TestInfo) {
  const path = testInfo.outputPath(`${testInfo.project.name}-${name}.png`);
  await page.screenshot({ path, fullPage: true });
  await testInfo.attach(name, { path, contentType: 'image/png' });
}

test('start screen loads', async ({ page }) => {
  await openFreshStart(page);

  await expect(page.getByText('Chaos County', { exact: true })).toBeVisible();
  await expect(page.getByTestId('start-screen')).toContainText('Gas Station Goblin Panic');
  await expect(page.getByTestId('start-game-button')).toBeVisible();
});

test('starts a new game and shows core HUD', async ({ page }) => {
  await startNewGame(page);

  await expect(page.getByTestId('game-canvas')).toBeVisible();
  await expect(page.getByTestId('event-banner')).toContainText('Gas Station Goblin Panic');
  await expect(page.getByTestId('coins-chip')).toBeVisible();
  await expect(page.getByTestId('snack-progress-chip')).toBeVisible();
});

test('mobile layout smoke test', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-mobile', 'mobile-only layout check');

  await startNewGame(page);
  await dismissIntroIfVisible(page);

  await expect(page.getByTestId('mobile-joystick')).toBeVisible();
  await expect(page.getByTestId('mobile-interact-button')).toBeVisible();
  await expect(page.getByTestId('bulletin-board-button')).toBeVisible();
  await expect(page.locator('select')).toHaveCount(0);
  await expect(page.locator('.dev-event-select')).toHaveCount(0);

  const viewport = page.viewportSize();
  const hudTop = await page.locator('.hud-top').boundingBox();
  expect(viewport).not.toBeNull();
  expect(hudTop).not.toBeNull();
  expect(hudTop!.height).toBeLessThan(viewport!.height * 0.35);
});

test('basic NPC interaction smoke test', async ({ page }, testInfo) => {
  await page.addInitScript((key) => {
    window.localStorage.setItem(
      key,
      JSON.stringify({
        version: 2,
        activeEventId: 'gas-station-goblin-panic',
        playerPosition: { x: -9.2, z: -2.55 },
        coins: 0,
        progressByEvent: {
          'gas-station-goblin-panic': {
            status: 'not_started',
            stepIndex: 0,
            collectedItemIds: [],
            completedZoneIds: []
          }
        },
        unlockedCosmetics: [],
        earnedBadges: [],
        introCompleted: false
      })
    );
  }, saveKey);

  await page.goto('/');
  await page.getByTestId('start-game-button').click();
  await dismissIntroIfVisible(page);

  await expect(page.getByText('Big Dale')).toBeVisible();
  if (testInfo.project.name === 'chromium-mobile') {
    await expect(page.getByTestId('mobile-interact-button')).toHaveText('Talk');
    await page.getByTestId('mobile-interact-button').click();
  } else {
    await expect(page.getByTestId('npc-talk-prompt')).toBeVisible();
    await page.evaluate(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e', bubbles: true }));
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'e', bubbles: true }));
    });
  }

  await expect(page.getByTestId('dialogue-box')).toContainText('Big Dale');
});

test('captures desktop and mobile visual smoke screenshots', async ({ page }, testInfo) => {
  await openFreshStart(page);
  await attachScreenshot(page, 'start-screen', testInfo);

  await page.getByTestId('new-game-button').click();
  await expect(page.getByTestId('hud')).toBeVisible();
  await dismissIntroIfVisible(page);
  await attachScreenshot(page, 'gameplay', testInfo);
});
