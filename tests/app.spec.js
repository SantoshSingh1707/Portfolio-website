import { test, expect } from '@playwright/test';

async function signIn(page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.locator('.taskbar')).toBeVisible();
}

async function openStartApp(page, appName) {
  await page.locator('.start-btn').click();
  await page.locator('.start-menu-grid').getByRole('button', { name: appName, exact: true }).click();
}

test('desktop loads without auto-opening a window', async ({ page }) => {
  await signIn(page);
  await expect(page.locator('.window')).toHaveCount(0);
});

test('terminal keeps its toolbar visible and desktop stays viewport-locked', async ({ page }) => {
  await signIn(page);
  await openStartApp(page, 'Terminal');

  await expect(page.locator('.window-title', { hasText: 'Terminal' })).toBeVisible();
  await expect(page.locator('.terminal-toolbar')).toBeVisible();
  await expect(page.locator('.terminal-input-row')).toBeVisible();

  const layout = await page.evaluate(() => ({
    innerHeight: window.innerHeight,
    docScrollHeight: document.documentElement.scrollHeight,
    windowRect: (() => {
      const terminalWindow = Array.from(document.querySelectorAll('.window')).find((node) =>
        node.querySelector('.window-title')?.textContent?.includes('Terminal'),
      );

      if (!terminalWindow) {
        return null;
      }

      const rect = terminalWindow.getBoundingClientRect();
      return { x: rect.x, y: rect.y };
    })(),
  }));

  expect(layout.docScrollHeight).toBeLessThanOrEqual(layout.innerHeight + 2);
  expect(layout.windowRect).not.toBeNull();
  expect(layout.windowRect.x).toBeGreaterThanOrEqual(0);
  expect(layout.windowRect.y).toBeGreaterThanOrEqual(0);
});

test('settings choices persist after refresh', async ({ page }) => {
  await signIn(page);
  await openStartApp(page, 'Settings');

  await page.getByRole('button', { name: 'Style 2' }).click();
  await page.getByRole('button', { name: 'Switch accent color to #107c10' }).click();

  await page.reload();
  await signIn(page);
  await openStartApp(page, 'Settings');

  await expect(page.getByRole('button', { name: 'Style 2' })).toHaveClass(/active/);
  await expect(page.getByRole('button', { name: 'Switch accent color to #107c10' })).toHaveClass(/active/);
});

test('notepad content persists after refresh', async ({ page }) => {
  await signIn(page);
  await openStartApp(page, 'Notepad');

  const textarea = page.locator('.notepad-textarea');
  await textarea.fill('Persistent ML notes');

  await page.reload();
  await signIn(page);
  await openStartApp(page, 'Notepad');

  await expect(page.locator('.notepad-textarea')).toHaveValue('Persistent ML notes');
});

test('browser opens blocked sites externally and shows feedback', async ({ page }) => {
  await signIn(page);
  await openStartApp(page, 'Browser');

  const popupPromise = page.waitForEvent('popup');
  await page.locator('.browser-shortcuts').getByRole('button', { name: 'Hugging Face' }).click();
  const popup = await popupPromise;
  await popup.close();

  await expect(page.locator('.browser-fallback-note')).toContainText('already launched');
  await expect(page.locator('.system-toast')).toContainText('opened externally');
});

test('resume app opens from the start menu with preview actions', async ({ page }) => {
  await signIn(page);
  await openStartApp(page, 'Resume');

  await expect(page.getByRole('heading', { name: 'Resume Preview' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open PDF' })).toBeVisible();
  await expect(page.locator('.resume-profile-copy')).toContainText('Software Engineering student');
});

test('file explorer opens preview in the custom modal', async ({ page }) => {
  await signIn(page);
  await openStartApp(page, 'Explorer');

  await page.locator('.explorer-sidebar').getByText('Documents', { exact: true }).click();
  await page.getByRole('button', { name: 'Resume.pdf' }).dblclick();

  await expect(page.getByRole('heading', { name: 'File Preview' })).toBeVisible();
  await expect(page.locator('.system-modal')).toContainText('Resume.pdf');
});

test('task manager critical process uses custom confirmation modal', async ({ page }) => {
  await signIn(page);
  await openStartApp(page, 'Task Manager');

  await page.locator('.tm-row.critical .tm-end-task').click();

  await expect(page.getByRole('heading', { name: 'Critical Process Warning' })).toBeVisible();
  await expect(page.locator('.system-modal')).toContainText('System Kernel');
});

test('projects window shows repo-backed ML evidence panels', async ({ page }) => {
  await signIn(page);
  await openStartApp(page, 'Projects');

  await expect(page.locator('.projects-shell')).toContainText('Repo-backed ML project snapshots');
  await expect(page.locator('.projects-shell')).toContainText('AI Study Tool');
  await expect(page.locator('.projects-shell')).toContainText('Kidney Disease Classifier');
});

test('command palette opens with Ctrl+K and launches an app', async ({ page }) => {
  await signIn(page);
  await page.keyboard.press('Control+k');

  await expect(page.locator('.command-palette')).toBeVisible();
  await page.getByPlaceholder('Search commands and apps...').fill('model monitor');
  await page.keyboard.press('Enter');

  await expect(page.locator('.command-palette')).toHaveCount(0);
  await expect(page.locator('.window-title', { hasText: 'Model Monitor' })).toBeVisible();
});

test('recruiter tour opens the guided overlay and advances to resume', async ({ page }) => {
  await signIn(page);
  await openStartApp(page, 'Recruiter Tour');
  await page.getByRole('button', { name: 'Start Guided Tour' }).click();

  await expect(page.locator('.tour-guide')).toContainText('Step 1 of');
  await expect(page.locator('.window-title', { hasText: 'About Me' })).toBeVisible();

  await page.getByRole('button', { name: 'Next Step' }).click();
  await expect(page.locator('.tour-guide')).toContainText('Step 2 of');
  await expect(page.locator('.window-title', { hasText: 'Resume' })).toBeVisible();
});

test('live demo app switches modes and renders local output', async ({ page }) => {
  await signIn(page);
  await openStartApp(page, 'Live Demo');

  await page.getByRole('button', { name: 'Research Brief' }).click();
  await expect(page.getByRole('heading', { name: 'Research Brief' })).toBeVisible();
  await expect(page.locator('.demo-summary')).toContainText('Retrieval augmented generation');
});

test('ai assistant answers portfolio questions with app-aware help', async ({ page }) => {
  await signIn(page);
  await openStartApp(page, 'AI Assistant');

  await page.getByRole('button', { name: 'What does Santosh focus on?' }).click();
  await expect(page.locator('.assistant-thread')).toContainText('machine learning systems');
  await expect(page.getByRole('button', { name: 'Open related app' })).toBeVisible();
});

test.describe('mobile behavior', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('desktop icons open apps with a single tap in fullscreen mobile mode', async ({ page }) => {
    await signIn(page);
    await page.locator('.desktop-icon', { hasText: 'About Me' }).click({ force: true });

    await expect(page.locator('.window.fullscreen')).toBeVisible();
    await expect(page.locator('.window-title')).toContainText('About Me');
  });
});
