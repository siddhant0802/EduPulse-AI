import { DashboardLayout } from "../../components/layout";
import {
  AIInsightsCard,
  AnalyticsOverview,
  AttendanceTrendChart,
  DepartmentPerformance,
  LowAttendanceAlert,
  PerformanceChart,
  PredictionCard,
  QuickStats,
  TopStudentsCard,
} from "../../components/analytics";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div>
            <p className="text-sm font-medium text-cyan-300">Module 5</p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              AI Analytics Dashboard
            </h1>
          </div>

          <AnalyticsOverview />
          <QuickStats />

          <div className="grid gap-6 xl:grid-cols-2">
            <AttendanceTrendChart />
            <PerformanceChart />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
            <DepartmentPerformance />
            <TopStudentsCard />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <LowAttendanceAlert />
            <AIInsightsCard />
            <PredictionCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
