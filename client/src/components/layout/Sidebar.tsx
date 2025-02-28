import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  Users, 
  Puzzle 
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Team", href: "/team", icon: Users },
  { name: "Integrations", href: "/integrations", icon: Puzzle },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-card border-r">
      <div className="flex h-16 items-center gap-2 px-6 border-b">
        <div className="h-8 w-8 rounded-lg bg-primary" />
        <span className="font-semibold">AI Support</span>
      </div>
      
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.name} href={item.href}>
              <a className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-muted"
              )}>
                <Icon className="h-4 w-4" />
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
