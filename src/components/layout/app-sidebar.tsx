"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center text-[13px] uppercase tracking-[0.08em] transition-colors",
        isActive
          ? "font-bold text-black bg-[#f5f5f5]"
          : "font-medium text-gray-200 hover:text-black hover:bg-[#fafafa]"
      )}
      style={{ padding: "12px 16px" }}
    >
      {isActive && (
        <span className="w-[3px] h-[14px] bg-accent flex-shrink-0" style={{ marginRight: "14px" }} />
      )}
      {label}
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  // Context detection
  const projectMatch = pathname.match(/^\/projects\/([^/]+)/);
  const projectId = projectMatch ? projectMatch[1] : null;
  const isNewPitch = pathname === "/dashboard";
  const { user } = useAuth();

  // Build context-aware nav items (above divider)
  const topItems: { label: string; href: string; isActive: boolean }[] = [];

  // PROJECTS — always shown, exact match only
  topItems.push({
    label: "Projects",
    href: "/projects",
    isActive: pathname === "/projects",
  });

  if (isNewPitch) {
    // New pitch context: show Dashboard
    topItems.push({
      label: "Dashboard",
      href: "/dashboard",
      isActive: true,
    });
  } else if (projectId) {
    // Inside a project: show Dashboard + Documents
    topItems.push({
      label: "Dashboard",
      href: `/projects/${projectId}`,
      isActive: pathname === `/projects/${projectId}` || pathname.startsWith(`/projects/${projectId}/finalize`),
    });
    topItems.push({
      label: "Documents",
      href: `/projects/${projectId}/documents`,
      isActive: pathname === `/projects/${projectId}/documents`,
    });
  }

  // Bottom items (below divider) — always visible
  const bottomItems: { label: string; href: string; isActive: boolean }[] = [
    {
      label: "Shared",
      href: "/shared",
      isActive: pathname === "/shared",
    },
    {
      label: "Settings",
      href: "/settings",
      isActive: pathname === "/settings",
    },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col w-[280px] h-screen border-r hairline bg-white flex-shrink-0">
      {/* Logo */}
      <div className="h-[72px] flex items-center border-b hairline" style={{ padding: "0 28px" }}>
        <Link href="/projects" className="text-[22px] font-black tracking-tight">
          TRACTION<span className="text-accent">.</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1" style={{ padding: "32px 20px 20px" }}>
        <div className="flex flex-col" style={{ gap: "2px" }}>
          {topItems.map((item) => (
            <NavLink key={item.label} href={item.href} label={item.label} isActive={item.isActive} />
          ))}
        </div>

        <div className="border-t hairline" style={{ margin: "20px 16px" }} />

        <div className="flex flex-col" style={{ gap: "2px" }}>
          {bottomItems.map((item) => (
            <NavLink key={item.label} href={item.href} label={item.label} isActive={item.isActive} />
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="border-t hairline" style={{ padding: "20px 28px" }}>
        <p className="text-[14px] font-semibold text-black">
          {user.display_name || user.username}
        </p>
        <p className="text-[12px] text-gray-200" style={{ marginTop: "4px" }}>
          {user.email}
        </p>
      </div>
    </aside>
  );
}
