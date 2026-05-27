import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Settings, Database, Zap, Rocket, Gamepad2, Download, Github, User } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/Dashboard", icon: BarChart3 },
  { title: "FastFlags Manager", url: "/FastFlags", icon: Settings },
  { title: "PS99 Data", url: "/PS99Data", icon: Database },
  { title: "Leak Tracker", url: "/LeakTracker", icon: Zap },
  { title: "Script Hub", url: "/ScriptHub", icon: Zap },
  { title: "Multi-Instance Launcher", url: "/MultiInstanceLauncher", icon: Rocket },
  { title: "Macros", url: "/Macros", icon: Gamepad2 },
  { title: "AI Macro Generator", url: "/MacroGenerator", icon: Zap },
  { title: "My Configs", url: "/MyConfigs", icon: User },
  { title: "Download App", url: "/DownloadApp", icon: Download },
  { title: "Export to GitHub", url: "/GitHubExport", icon: Github },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    async function loadUser() {
      try {
        const { base44 } = await import("@/api/base44Client");
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (e) {}
    }
    loadUser();
  }, []);
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <Sidebar className="border-r border-purple-800/30 bg-slate-950/50">
          <SidebarHeader className="border-b border-purple-800/30 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">PS99 Hub</h2>
                <p className="text-xs text-purple-300">Performance Center</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-purple-400 uppercase tracking-wider px-3 py-2">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={`hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-200 rounded-xl mb-1 ${location.pathname === item.url ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' : 'text-gray-400'}`}>
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          {user && (
            <SidebarFooter className="border-t border-purple-800/30 p-4">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{user.full_name?.[0] || user.email[0].toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.full_name || user.email}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
            </SidebarFooter>
          )}
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 backdrop-blur-xl bg-slate-950/50 border-b border-purple-800/30 p-4">
            <SidebarTrigger className="text-purple-300 hover:text-purple-100" />
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}