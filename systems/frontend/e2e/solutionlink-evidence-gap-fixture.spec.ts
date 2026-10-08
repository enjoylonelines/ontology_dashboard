import { expect, test } from "@playwright/test";

test("shows only packet-backed evidence gaps when briefing prose is withheld", async ({ page }) => {
  await page.goto("/e2e/fixtures/solutionlink-evidence-gap-preview.html");

  await expect(page.getByText("촬영용 고정 fixture · 실제 생성·저장·승인은 수행하지 않습니다.")).toBeVisible();
  await expect(page.getByRole("status")).toContainText("현재 근거 확인 규칙과 일치하지 않아 표시하지 않았습니다");
  await expect(page.getByLabel("확인할 데이터")).toContainText("정비 이력과 작업 조건이 연결되지 않았습니다");
  await expect(page.getByLabel("확인할 데이터")).toContainText("생산 일정과 작업 조건이 연결되지 않았습니다");
  await expect(page.getByLabel("확인할 데이터")).not.toContainText("forbidden_claims");
  await expect(page.locator(".natural-briefing-line")).toHaveCount(0);
});
