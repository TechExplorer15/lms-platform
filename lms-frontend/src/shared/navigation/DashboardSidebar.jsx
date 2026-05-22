import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/student/dashboard",
  },

  {
    title: "My Courses",
    icon: BookOpen,
    href: "/student/courses",
  },

  {
    title: "Learning",
    icon: GraduationCap,
    href: "/student/learning",
  },

  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        `
          hidden md:flex
          min-h-screen
          flex-col
          border-r
          bg-card
          transition-all duration-300
        `,
        collapsed ? "w-[90px]" : "w-[280px]",
      )}
    >
      {/* Header */}

      <div
        className="
          flex h-16 items-center
          justify-between border-b px-4
        "
      >
        {!collapsed && (
          <h1 className="text-lg font-bold tracking-tight">LMS Platform</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            rounded-lg border p-2
            hover:bg-muted
            transition-default
          "
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  `
                    flex items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm font-medium
                    transition-all duration-200
                  `,
                  isActive
                    ? `
                      bg-primary
                      text-primary-foreground
                      shadow-soft
                    `
                    : `
                      text-muted-foreground
                      hover:bg-muted
                      hover:text-foreground
                    `,
                )
              }
            >
              <Icon size={20} />

              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default DashboardSidebar;
