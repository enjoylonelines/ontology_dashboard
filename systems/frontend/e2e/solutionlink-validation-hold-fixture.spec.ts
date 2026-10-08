import { expect, test } from "@playwright/test";

test("does not misrepresent validation hold as missing data", async ({ page }) => {
  await page.goto("/e2e/fixtures/solutionlink-validation-hold-preview.html");

  await expect(page.getByText("촬영용 고정 fixture · 실제 생성·저장·승인은 수행하지 않습니다.")).toBeVisible();
  await expect(page.getByRole("status")).toContainText("현재 근거 확인 규칙과 일치하지 않아 표시하지 않았습니다");
  await expect(page.getByRole("status")).toContainText("현재 판단에 사용하지 않습니다");
  await expect(page.getByLabel("확인할 데이터")).toHaveCount(0);
  await expect(page.getByText("forbidden_claims")).toHaveCount(0);
  await expect(page.locator(".natural-briefing-line")).toHaveCount(0);
});
