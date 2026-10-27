import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

test("страница загружается без ошибок, изображения доступны и ширина адаптивна", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Придаёмформувашим идеям.");

  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("проект открывается, удерживает фокус и закрывается клавишей Escape", async ({ page }) => {
  await page.goto("/");
  const project = page.getByRole("button", { name: "Смотреть проект AURA", exact: true });
  await project.click();
  const dialog = page.getByRole("dialog", { name: "AURA", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Пространство, в котором хочется остаться." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Закрыть проект" })).toBeFocused();
  for (let index = 0; index < 3; index += 1) {
    await page.keyboard.press("Tab");
    // Native dialogs can yield focus to browser chrome (reported as BODY).
    // No interactive element in the inert background may receive focus.
    expect(await dialog.evaluate((element) => element.contains(document.activeElement) || document.activeElement === document.body)).toBe(true);
  }
  // Return from browser chrome before sending Escape to the modal.
  await page.getByRole("button", { name: "Закрыть проект" }).focus();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(project).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("форма валидирует поля и скачивает заполненный бриф", async ({ page }) => {
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Обсудить проект", exact: true }).first();
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "С чего начнём?", exact: true });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Скачать бриф" }).click();
  await expect(dialog.locator("input:invalid, textarea:invalid")).toHaveCount(3);
  await expect(dialog).toBeVisible();

  await dialog.getByLabel("Ваше имя").fill("Анна Тестовая");
  await dialog.getByLabel("Email").fill("anna@example.com");
  await dialog.getByLabel("Что будем создавать?").selectOption("Брендинг");
  await dialog.getByLabel("Пару слов о проекте").fill("Нужен адаптивный сайт и фирменный стиль для нового проекта.");
  const downloadPromise = page.waitForEvent("download");
  await dialog.getByRole("button", { name: "Скачать бриф" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("forma-project-brief.txt");
  const filePath = await download.path();
  expect(filePath).not.toBeNull();
  const content = await readFile(filePath!, "utf8");
  expect(content).toContain("Анна Тестовая");
  expect(content).toContain("anna@example.com");
  expect(content).toContain("Направление: Брендинг");
  expect(content).toContain("Нужен адаптивный сайт");

  await expect(page.getByRole("status")).toContainText("Ваш бриф подготовлен и скачан");
  await page.getByRole("button", { name: "Готово", exact: true }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("навигация ведёт к разделу, а мобильное меню закрывается", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    const toggle = page.getByRole("button", { name: "Открыть меню" });
    await toggle.click();
    const menu = page.getByRole("navigation", { name: "Мобильная навигация" });
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).not.toBeVisible();
    await toggle.click();
    await menu.getByRole("link", { name: "Услуги", exact: true }).click();
    await expect(menu).not.toBeVisible();
  } else {
    await page.getByRole("navigation", { name: "Основная навигация" }).getByRole("link", { name: "Услуги", exact: true }).click();
  }
  await expect(page).toHaveURL(/#services$/);
  await expect(page.locator("#services")).toBeInViewport();
});
