import DashboardSidebar from "@/shared/navigation/DashboardSidebar";
import DashboardTopbar from "@/shared/navigation/DashboardTopbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}

        <DashboardSidebar />

        {/* Main Area */}

        <div className="flex-1">
          <DashboardTopbar />

          <main className="dashboard-spacing">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
