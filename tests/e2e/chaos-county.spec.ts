import { expect, type Page, type TestInfo, test } from '@playwright/test';

const saveKey = 'chaos-county-3d-save-v2';

interface PageDiagnostics {
  assetFailures: string[];
  consoleErrors: string[];
}

function watchPageDiagnostics(page: Page): PageDiagnostics {
  const diagnostics: PageDiagnostics = {
    assetFailures: [],
    consoleErrors: []
  };

  page.on('response', (response) => {
    const url = response.url();
    const isGameAsset = /\/assets\/|\.glb($|\?)|\.gltf($|\?)|\.png($|\?)|\.jpg($|\?)/i.test(url);
    if (isGameAsset && response.status() >= 400) {
      diagnostics.assetFailures.push(`${response.status()} ${url}`);
    }
  });

  page.on('console', (message) => {
    const text = message.text();
    const relevant = /webgl|gltf|glb|three|failed to load resource|404|could not load/i.test(text);
    if (message.type() === 'error' && relevant) {
      diagnostics.consoleErrors.push(text);
    }
  });

  page.on('pageerror', (error) => {
    diagnostics.consoleErrors.push(error.message);
  });

  return diagnostics;
}

async function expectCleanDiagnostics(diagnostics: PageDiagnostics, testInfo: TestInfo) {
  const lines = [
    ...diagnostics.assetFailures.map((failure) => `asset: ${failure}`),
    ...diagnostics.consoleErrors.map((failure) => `console: ${failure}`)
  ];

  if (lines.length) {
    await testInfo.attach('browser-diagnostics', {
      body: lines.join('\n'),
      contentType: 'text/plain'
    });
  }

  expect(lines).toEqual([]);
}

async function waitForStableStartScene(page: Page) {
  await expect(page.getByTestId('start-scene-ready')).toBeVisible({ timeout: 60_000 });
  await page.waitForTimeout(750);
}

async function waitForStableGameScene(page: Page) {
  await expect(page.getByTestId('scene-ready')).toBeVisible({ timeout: 60_000 });
  await page.waitForTimeout(750);
}

async function openFreshStart(page: Page) {
  await page.addInitScript((key) => window.localStorage.removeItem(key), saveKey);
  await page.goto('/');
  await expect(page.getByTestId('start-screen')).toBeVisible();
  await waitForStableStartScene(page);
}

async function startNewGame(page: Page) {
  await openFreshStart(page);
  await page.getByTestId('new-game-button').click();
  await expect(page.getByTestId('hud')).toBeVisible();
  await waitForStableGameScene(page);
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
  await page.screenshot({ path, fullPage: false });
  await testInfo.attach(name, { path, contentType: 'image/png' });
}

async function expectMobileEventCardsDoNotOverlap(page: Page) {
  const boxes = await page.getByTestId('event-board').locator('.event-card').evaluateAll((cards) =>
    cards.map((card) => {
      const rect = card.getBoundingClientRect();
      return {
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height
      };
    })
  );

  for (let index = 0; index < boxes.length - 1; index += 1) {
    expect(boxes[index].height).toBeGreaterThan(64);
    expect(boxes[index].bottom).toBeLessThanOrEqual(boxes[index + 1].top + 1);
  }
}

test('start screen loads', async ({ page }, testInfo) => {
  const diagnostics = watchPageDiagnostics(page);
  await openFreshStart(page);

  await expect(page.getByText('Chaos County', { exact: true })).toBeVisible();
  await expect(page.getByTestId('start-screen')).toContainText('Gas Station Goblin Panic');
  await expect(page.getByTestId('start-game-button')).toBeVisible();
  await expectCleanDiagnostics(diagnostics, testInfo);
});

test('starts a new game and shows core HUD', async ({ page }, testInfo) => {
  const diagnostics = watchPageDiagnostics(page);
  await startNewGame(page);

  await expect(page.getByTestId('game-canvas')).toBeVisible();
  await expect(page.getByTestId('scene-ready')).toBeVisible();
  await expect(page.getByTestId('event-banner')).toContainText('Gas Station Goblin Panic');
  await expect(page.getByTestId('coins-chip')).toBeVisible();
  await expect(page.getByTestId('snack-progress-chip')).toBeVisible();
  await expectCleanDiagnostics(diagnostics, testInfo);
});

test('mobile layout smoke test', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-mobile', 'mobile-only layout check');
  const diagnostics = watchPageDiagnostics(page);

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
  await expectCleanDiagnostics(diagnostics, testInfo);
});

test('basic NPC interaction smoke test', async ({ page }, testInfo) => {
  const diagnostics = watchPageDiagnostics(page);
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
  await waitForStableStartScene(page);
  await page.getByTestId('start-game-button').click();
  await waitForStableGameScene(page);
  await dismissIntroIfVisible(page);

  await expect(page.locator('.world-label').filter({ hasText: 'Gas Station Owner' }).first()).toBeVisible();
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
  await expectCleanDiagnostics(diagnostics, testInfo);
});

test('captures desktop and mobile visual smoke screenshots', async ({ page }, testInfo) => {
  const diagnostics = watchPageDiagnostics(page);
  await openFreshStart(page);
  await attachScreenshot(page, 'start-screen', testInfo);

  await page.getByTestId('new-game-button').click();
  await expect(page.getByTestId('hud')).toBeVisible();
  await waitForStableGameScene(page);
  await dismissIntroIfVisible(page);
  await attachScreenshot(page, 'gameplay', testInfo);

  if (testInfo.project.name === 'chromium-mobile') {
    await page.getByTestId('bulletin-board-button').click();
    await expect(page.getByTestId('event-board')).toBeVisible();
    await expectMobileEventCardsDoNotOverlap(page);
    await attachScreenshot(page, 'event-board', testInfo);
  }

  await expectCleanDiagnostics(diagnostics, testInfo);
});
