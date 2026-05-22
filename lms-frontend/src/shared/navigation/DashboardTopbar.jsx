import { Bell } from "lucide-react";

import { Input } from "@/shared/ui/input";

import MobileSidebar from "@/shared/navigation/MobileSidebar";

import ThemeToggle from "@/shared/theme/ThemeToggle";

function DashboardTopbar() {
  return (
    <header
      className="
        sticky top-0 z-40
        border-b
        bg-background/80
        backdrop-blur-md
      "
    >
      <div
        className="
          flex h-16 items-center
          justify-between gap-4
          px-4 md:px-6
        "
      >
        {/* Left */}

        <div className="flex items-center gap-3">
          <MobileSidebar />

          <div className="hidden md:block w-full max-w-md">
            <Input placeholder="Search courses..." className="bg-card" />
          </div>
        </div>

        {/* Right */}

        <div className="ml-auto flex items-center gap-3">
          {/* Theme */}

          <ThemeToggle />

          {/* Notifications */}

          <button
            className="
              rounded-xl border
              bg-card p-2
              hover:bg-muted
              transition-default
            "
          >
            <Bell size={18} />
          </button>

          {/* User */}

          <div
            className="
              flex items-center gap-3
              rounded-xl border
              bg-card px-3 py-2
            "
          >
            <div
              className="
                flex h-9 w-9 items-center
                justify-center rounded-full
                bg-primary text-sm
                font-semibold
                text-primary-foreground
              "
            >
              T
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-medium">Tanmay</p>

              <p className="text-xs text-muted-foreground">Student</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardTopbar;
