import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { NaturalBriefing } from "../../src/features/operations/overview/NaturalBriefing";
import "../../src/app.css";
import "../../src/features/operations/operations.css";

const assetId = "CNC-S04-L04-01";
const eventId = "EVT-SOLUTIONLINK-MAIN";

// This is a test-only, read-only capture surface. It exercises the same briefing
// component and evidence disclosure path without creating approvals or work orders.
const originalFetch = window.fetch.bind(window);
window.fetch = async (input, init) => {
  const url = new URL(typeof input === "string" ? input : input instanceof URL ? input.href : input.url, location.href);
  if (!url.pathname.startsWith("/api/")) return originalFetch(input, init);
  if (url.pathname.endsWith("/agent-review-summary")) return Response.json({
    summary: {
      asset_id: assetId, mode: "llm", summary: "생산 영향과 점검 기록을 함께 확인하세요.", source_refs: ["maintenance-request", "production-plan"], limitations: ["고정 fixture의 참고값이며 실제 생산 승인 또는 확정 손실이 아닙니다."],
      role_summaries: [{ role: "process_manager", quote: "현재 정비 요청은 생산 일정과 대조가 필요한 단계입니다. [[ref:maintenance-request]]\n요청 정지 시간 120분은 생산 계획 기준으로 비교한 참고값입니다. [[ref:production-plan]]\n승인 또는 재협의는 생산관리자가 근거를 확인한 뒤 결정합니다." }],
    },
    trace: { provider: "controlled-fixture", fallback: false, reason: null, validation_errors: [], reuse_eligibility: "EXACT_VALIDATED", current_ready: true, historical_available: false, materialization: { status: "ready", summary_key: "solutionlink-main-fixture", decision_as_of: "2026-10-07T09:00:00Z" } },
  });
  if (url.pathname.endsWith("/agent-review-packet")) return Response.json({
    project_id: "manufacturing-demo-project", asset_id: assetId, generated_at: "2026-10-07T09:00:00Z", snapshot_basis: { event_id: eventId }, source_refs: ["maintenance-request", "production-plan"],
    evidence_context: { selected_basis: [
      { candidate_id: "maintenance-request", source_ref: "maintenance-request", fact_type: "maintenance_request", value_summary: "점검 요청 · 정지 120분", display_fields: [{ label: "정비 요청", value: "공구 체결부 점검" }, { label: "요청 정지 시간", value: "120분" }], relation_paths: [] },
      { candidate_id: "production-plan", source_ref: "production-plan", fact_type: "production_plan", value_summary: "생산 계획 · 참고 산정", display_fields: [{ label: "생산 계획", value: "당일 가공 순서" }, { label: "영향 기준", value: "정지 시간 참고값" }], relation_paths: [] },
    ] },
  });
  return Response.json({ items: [] });
};

function Preview() {
  const [selected, setSelected] = useState(false);
  return <main style={{ maxWidth: 1100, margin: "40px auto", padding: 20 }}>
    <header style={{ marginBottom: 20 }}><strong>생산 대응 검토</strong><p>촬영용 고정 fixture · 실제 생성·저장·승인은 수행하지 않습니다.</p></header>
    <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, .8fr) minmax(360px, 1.4fr) minmax(220px, .8fr)", gap: 16 }}>
      <section aria-label="정비 승인 요청 목록" style={{ padding: 16, border: "1px solid #cbd5e1", borderRadius: 6, background: "#fff" }}><strong>정비 승인 요청 목록</strong><button type="button" aria-pressed={selected} onClick={() => setSelected(true)} style={{ display: "block", width: "100%", textAlign: "left", marginTop: 12, padding: 12 }}>4구역 · 4셀 · CNC 가공기 1<br/><small>공구 체결부 점검 · 요청 정지 120분</small></button></section>
      <section aria-label="생산 대응 검토" style={{ padding: 16, border: "1px solid #cbd5e1", borderRadius: 6, background: "#fff" }}><strong>생산 대응 검토</strong>{selected ? <><dl style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "12px 0" }}><div><dt>예상 정지 시간</dt><dd>120분</dd></div><div><dt>생산 영향 기준</dt><dd>참고 산정</dd></div><div><dt>비용 기준</dt><dd>가정값</dd></div><div><dt>관측 기준</dt><dd>2026-10-07 09:00</dd></div></dl><NaturalBriefing projectId="manufacturing-demo-project" workspaceId="manufacturing-demo" assetId={assetId} eventId={eventId} observedAt="2026-10-07T09:00:00Z" role="process_manager" canGenerate={false}/></> : <p>왼쪽에서 정비 승인 요청을 선택하세요.</p>}</section>
      <aside aria-label="작업 승인 검토" style={{ padding: 16, border: "1px solid #cbd5e1", borderRadius: 6, background: "#fff" }}><strong>작업 승인 검토</strong><p>근거와 생산 일정을 확인한 뒤 생산관리자가 결정합니다.</p><button type="button" disabled>승인 검토</button><button type="button" disabled style={{ marginLeft: 8 }}>재협의</button><p><small>이 fixture는 사람의 다음 행동만 보여주며 승인 상태를 바꾸지 않습니다.</small></p></aside>
    </div>
  </main>;
}

createRoot(document.getElementById("root")!).render(<Preview/>);
