"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
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
  { name: "Drivers", href: "/drivers", icon: Car },
  { name: "Candidates", href: "/candidates", icon: UserCheck },
  { name: "Trips", href: "/trips", icon: MapPin },
  { name: "Excel Uploads", href: "/uploads", icon: Upload },
  { name: "Reports", href: "/reports", icon: BarChart },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-surface shadow-2xl">
      <div className="flex h-16 items-center border-b px-6">
        <Car className="h-6 w-6 text-primary mr-2" />
        <span className="text-lg font-bold">{siteConfig.name}</span>
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
                  ? "bg-primary/20 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
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
