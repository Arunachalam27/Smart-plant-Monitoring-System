import { LayoutDashboard, Settings, Leaf } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type Page = "dashboard" | "manage";

const items = [
  { title: "Dashboard", page: "dashboard" as Page, icon: LayoutDashboard },
  { title: "Manage Plants", page: "manage" as Page, icon: Settings },
];

export function AppSidebar({
  activePage,
  onNavigate,
}: {
  activePage: Page;
  onNavigate: (page: Page) => void;
}) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-base">
            <Leaf className="h-5 w-5 text-emerald-500" />
            Plant Monitor
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.page}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.page)}
                    isActive={activePage === item.page}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
