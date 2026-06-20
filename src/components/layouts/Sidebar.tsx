"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Car,
  UserCheck,
  Truck,
  MapPin,
  ClipboardList,
  Upload,
  BarChart,
  Bell,
  Settings,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users },
  { name: "Drivers", href: "/drivers", icon: Car },
  { name: "Candidates", href: "/candidates", icon: UserCheck },
  { name: "Vehicles", href: "/vehicles", icon: Truck },
  { name: "Trips", href: "/trips", icon: MapPin },
  { name: "Assignments", href: "/assignments", icon: ClipboardList },
  { name: "Excel Uploads", href: "/uploads", icon: Upload },
  { name: "Reports", href: "/reports", icon: BarChart },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-zinc-50 dark:bg-zinc-950/50">
      <div className="flex h-16 items-center border-b px-6">
        <Car className="h-6 w-6 text-primary mr-2" />
        <span className="text-lg font-bold">CabEase</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
