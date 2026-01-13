import { Calendar, Home, Inbox, Search, Settings, Trophy } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router"


interface AppSidebarProps {
  items: {
    title: string
    url: string
    icon: React.ReactNode
  }[]
}

export function AppSidebar({ items }: AppSidebarProps) {
  const path = window.location.pathname;
  return (
    <Sidebar >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className={`font-bold cursor-pointer ${path === item.url ? "border-b-primary border-b-2" : ""}`}>
                  <SidebarMenuButton asChild className="hover:bg-secondary">
                    <NavLink to={item.url}>
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}