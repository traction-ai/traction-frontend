"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Documents", href: "/dashboard" },
  { label: "Shared", href: "/dashboard" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col w-[240px] h-screen border-r hairline bg-white flex-shrink-0">
      {/* Logo */}
      <div className="h-[72px] flex items-center px-7 border-b hairline">
        <Link href="/dashboard" className="text-[20px] font-black tracking-tight">
          TRACTION<span className="text-accent">.</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-8 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-[10px] text-[13px] uppercase tracking-[0.06em] font-medium",
                isActive
                  ? "font-bold text-black"
                  : "text-gray-200 hover:text-black"
              )}
            >
              {isActive && (
                <span className="w-[3px] h-[3px] bg-black mr-3 flex-shrink-0" />
              )}
              {item.label}
            </Link>
          );
        })}

        <div className="my-5 mx-3 border-t hairline" />

        <Link
          href="/settings"
          className={cn(
            "flex items-center px-3 py-[10px] text-[13px] uppercase tracking-[0.06em] font-medium",
            pathname === "/settings"
              ? "font-bold text-black"
              : "text-gray-200 hover:text-black"
          )}
        >
          {pathname === "/settings" && (
            <span className="w-[3px] h-[3px] bg-black mr-3 flex-shrink-0" />
          )}
          Settings
        </Link>
      </nav>

      {/* User */}
      <div className="border-t hairline px-7 py-5">
        <p className="text-[13px] font-semibold text-black">Alex Chen</p>
        <p className="text-[11px] text-gray-200 mt-1">alex@example.com</p>
      </div>
    </aside>
  );
}
