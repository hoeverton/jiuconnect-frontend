import DashboardLayout from "../layouts/DashboardLayout";

import DashboardHeader from "../components/dashboard/widgets/DashboardHeader";
import StatsCards from "../components/dashboard/widgets/StatsCards";
import UpcomingLessons from "../components/dashboard/widgets/UpcomingLessons";
import RecentActivity from "../components/dashboard/widgets/RecentActivity";
import CalendarWidget from "../components/dashboard/widgets/CalendarWidget";

export default function DashboardProfessor() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <DashboardHeader />

        <StatsCards />

        {/* Linha 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2">
            <UpcomingLessons />
          </div>

          <CalendarWidget />

        </div>

        {/* Linha 2 */}
        <RecentActivity />

      </div>
    </DashboardLayout>
  );
}