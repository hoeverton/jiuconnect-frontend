import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">

        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}