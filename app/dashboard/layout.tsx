"use client";
import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";
import ReportIssueButton from "./ReportIssueButton";

const LG_BREAKPOINT = "(min-width: 1024px)";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const drawerToggle: RefObject<HTMLInputElement | null> = useRef(null);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(LG_BREAKPOINT);
    const onChange = () => {
      // A checked overlay toggle becomes a dimmed drawer as soon as
      // `lg:drawer-open` no longer applies, so clear it at the desktop breakpoint.
      if (media.matches && drawerToggle.current) {
        drawerToggle.current.checked = false;
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleSidebar = () => {
    // DaisyUI ignores the drawer checkbox while `lg:drawer-open` is set, so
    // desktop collapse has to drop that class. Mobile still uses the overlay checkbox.
    if (window.matchMedia(LG_BREAKPOINT).matches) {
      setDesktopSidebarOpen((open) => !open);
      if (drawerToggle.current) {
        drawerToggle.current.checked = false;
      }
      return;
    }
    if (drawerToggle.current) {
      drawerToggle.current.checked = !drawerToggle.current.checked;
    }
  };

  return (
    <div className={desktopSidebarOpen ? "drawer lg:drawer-open" : "drawer"}>
      <input
        id="my-drawer-2"
        ref={drawerToggle}
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content">
        <div className="navbar bg-base-100 shadow-lg">
          <div className="flex-none">
            <button
              type="button"
              className="btn btn-square btn-ghost"
              aria-label="Toggle sidebar"
              aria-controls="dashboard-sidebar"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <Link href={"/dashboard"} className="btn btn-ghost text-xl">
              Interstellar AI Rap Battles
            </Link>
          </div>
          <div className="flex-none">
            <ReportIssueButton />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul
          id="dashboard-sidebar"
          className="menu bg-base-200 text-base-content min-h-full w-56 p-4"
        >
          <li>
            <Link href={"/dashboard/rankings"}>Agent Leaderboard</Link>
          </li>
          <div className="divider"></div>
          <li>
            <Link href={"/auth/logout"}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
