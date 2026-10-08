import { expect, test } from "@playwright/test";

test("replays the production-manager review without submitting a decision", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/e2e/fixtures/solutionlink-main-scenario-preview.html");

  await page.getByRole("button", { name: /4구역 · 4셀 · CNC 가공기 1/ }).click();
  await expect(page.getByLabel("생산 대응 검토")).toContainText("예상 정지 시간");
  await expect(page.getByLabel("생산 대응 검토")).toContainText("120분");
  await expect(page.getByLabel("생산 대응 검토")).toContainText("현재 근거 기준");
  await page.getByText("근거", { exact: true }).first().click();
  await expect(page.getByText("정비 요청: 공구 체결부 점검")).toBeVisible();
  await expect(page.getByLabel("작업 승인 검토")).toContainText("근거와 생산 일정을 확인한 뒤 생산관리자가 결정합니다");
  await expect(page.getByRole("button", { name: "승인 검토" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "재협의" })).toBeDisabled();
});
