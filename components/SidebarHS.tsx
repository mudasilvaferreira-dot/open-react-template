"use client";
import React, { useState } from "react";
import Link from "next/link";

type Submenu = { label: string; href?: string };
type MenuItem = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: Submenu[];
};

const menu: MenuItem[] = [
  {
    label: "Dashboard",
    icon: (
      <svg
        className="size-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    href: "/page2",
  },
  {
    label: "OEE",
    icon: (
      <svg
        className="size-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    submenu: [{ label: "Reports", href: "/page2/OEE/Reports" }],
  },
  {
    label: "Users",
    icon: (
      <svg
        className="size-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    submenu: [
      { label: "Sub Menu 1", href: "/page2/users/submenu1" },
      { label: "Sub Menu 2", href: "/page2/users/submenu2" },
    ],
  },
];

export default function SidebarHS({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  // Sidebar width
  const sidebarWidth = "w-64";

  return (
    <div className="flex min-h-screen bg-white dark:bg-neutral-800">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full ${sidebarWidth} bg-white dark:bg-neutral-800 border-e border-gray-200 dark:border-neutral-700
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
        style={{
          // No desktop, sidebar só aparece se open=true
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          {/* Header */}
          <header className="p-4 flex justify-between items-center gap-x-2">
            <Link
              className="font-semibold text-xl text-black dark:text-white"
              href="/page2"
              aria-label="Brand"
            >
              Brand
            </Link>
            <button
              type="button"
              className="flex justify-center items-center size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700"
              onClick={() => setOpen(false)}
            >
              <svg
                className="shrink-0 size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </header>
          {/* Body */}
          <nav className="h-full overflow-y-auto px-2">
            <ul className="space-y-1">
              {menu.map((item) => (
                <li key={item.label}>
                  {item.submenu ? (
                    <>
                      <button
                        type="button"
                        className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                        aria-expanded={openSub === item.label}
                        onClick={() =>
                          setOpenSub(openSub === item.label ? null : item.label)
                        }
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        <svg
                          className={`ms-auto size-4 transition-transform ${
                            openSub === item.label ? "rotate-180" : ""
                          } text-gray-600 dark:text-neutral-400`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                      {openSub === item.label && (
                        <ul className="pt-1 ps-7 space-y-1">
                          {item.submenu.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                                href={sub.href ?? "#"}
                                onClick={() => setOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                      href={item.href ?? "#"}
                      onClick={() => setOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
          aria-label="Fechar sidebar"
        />
      )}
      {/* Content */}
      <div
        className={`flex-1 min-h-screen transition-all duration-300 ${
          open ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navigation Toggle (sempre visível) */}
        <div className="p-2">
          <button
            type="button"
            className="flex justify-center items-center size-8 text-sm text-gray-600 hover:bg-gray-100 rounded-full dark:text-neutral-400 dark:hover:bg-neutral-700"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="sidebar"
            aria-label="Toggle navigation"
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg
              className="shrink-0 size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M15 3v18" />
              <path d="m8 9 3 3-3 3" />
            </svg>
            <span className="sr-only">Navigation Toggle</span>
          </button>
        </div>
        {/* Main Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
