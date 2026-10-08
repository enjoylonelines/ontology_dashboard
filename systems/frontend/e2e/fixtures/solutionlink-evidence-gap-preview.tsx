import React from "react";
import { createRoot } from "react-dom/client";
import { NaturalBriefing } from "../../src/features/operations/overview/NaturalBriefing";
import "../../src/app.css";
import "../../src/features/operations/operations.css";

// Test-only controlled response for the Runbook C capture. It makes no API call
// and must never be presented as a live production response.
const withheldResponse = {
  summary: null,
  trace: {
    provider: "controlled-fixture",
    fallback: true,
    reason: "summary_validation_failed",
    validation_errors: ["forbidden_claims:정비 완료"],
    fallback_validation_errors: [],
    evidence_gaps: [
      { field: "maintenance_context", reason: "maintenance_context_missing_or_unresolved", owner_domain: "maintenance" },
      { field: "operation_context", reason: "operation_context_missing_or_unresolved", owner_domain: "operations" },
    ],
    reuse_eligibility: "INELIGIBLE" as const,
    current_ready: false,
    historical_available: false,
    materialization: { status: "fallback" as const, summary_key: "solutionlink-evidence-gap-fixture" },
  },
};

function Preview() {
  return <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
    <header style={{ marginBottom: 20 }}><strong>생산 대응 검토</strong><p>촬영용 고정 fixture · 실제 생성·저장·승인은 수행하지 않습니다.</p></header>
    <section aria-label="선택한 정비 요청" style={{ padding: 16, border: "1px solid #cbd5e1", borderRadius: 6, background: "#fff" }}>
      <strong>4구역 · 4셀 · CNC 가공기 1</strong><p>정비 이력과 생산 작업 조건을 확인한 뒤, 생산관리자가 다음 대응을 검토합니다.</p>
      <NaturalBriefing projectId="manufacturing-demo-project" workspaceId="manufacturing-demo" assetId="CNC-S04-L04-01"
        eventId="EVT-SOLUTIONLINK-EVIDENCE-GAP" observedAt="2026-10-07T09:00:00Z" role="process_manager"
        providedResponse={withheldResponse} canGenerate={false}/>
    </section>
    <p style={{ marginTop: 16, color: "#596f83", fontSize: 13 }}>이 화면은 실제 데이터 결손을 임의로 추정하지 않고, fixture의 검증된 근거 공백만 표시합니다.</p>
  </main>;
}

createRoot(document.getElementById("root")!).render(<Preview/>);
