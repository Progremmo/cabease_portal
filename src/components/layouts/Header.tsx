"use client";

import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Moon, Sun, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const { theme, setTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b px-6 bg-background">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold capitalize">
          {/* We will replace this with breadcrumbs later */}
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-8 w-8 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{user?.email?.[0]?.toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || "user@cabease.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
