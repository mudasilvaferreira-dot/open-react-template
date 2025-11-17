import SidebarHS from "@/components/SidebarHS";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarHS>{children}</SidebarHS>;
}
