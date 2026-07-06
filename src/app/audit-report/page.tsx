import { Suspense } from "react";
import ReportContent from "./ReportContent";

export default function AuditReportPage() {
  return (
    <Suspense fallback={null}>
      <ReportContent />
    </Suspense>
  );
}
