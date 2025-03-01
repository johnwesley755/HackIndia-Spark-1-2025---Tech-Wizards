import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Puzzle,
  FileText,
  FolderOpen,
  HelpCircle,
  CreditCard,
  LogOut,
  Menu,
} from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface SidebarProps {
  onClose?: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Team", href: "/team", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Integrations", href: "/integrations", icon: Puzzle },
  { name: "Support", href: "/support", icon: HelpCircle },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigation = () => {
    if (onClose) onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 bg-card border-r shadow-lg transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          {!collapsed && <span className="font-semibold">Lemma AI</span>}
        </div>
   
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-2 p-4">
        <img
          src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        {!collapsed && (
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 p-4">
        <TooltipProvider>
          {navigation.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <a
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      )}
                      onClick={handleNavigation}
                    >
                      <Icon className="h-5 w-5" />
                      {!collapsed && item.name}
                    </a>
                  </Link>
                </TooltipTrigger>
                {collapsed && <TooltipContent>{item.name}</TooltipContent>}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto p-4">
        <button
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-red-500 hover:text-white"
          onClick={() => alert("Logging out...")}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}
