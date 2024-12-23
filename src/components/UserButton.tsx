"use client";

import { logout } from "@/app/(auth)/action";
import { useSession } from "@/app/(main)/SessionProvider";
import { cn } from "@/lib/utils";
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuPortal,
  DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { useTheme } from "next-themes";
import ThemeChooser from "@/components/ThemeChooser";

interface UserButtonProps {
  className?: string;
}

export default function UserButton({ className }: UserButtonProps) {
  const { user } = useSession();

  return (
    <DropdownMenu>

      {/*下拉框设置*/}
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as {user.userId}</DropdownMenuLabel>
        {/*<DropdownMenuSeparator />*/}
        {/*<Link href={`/users/${user.username}`}>*/}
        {/*  <DropdownMenuItem>*/}
        {/*    <UserIcon className="mr-2 size-4" />*/}
        {/*    Profile*/}
        {/*  </DropdownMenuItem>*/}
        {/*</Link>*/}

        {/*<ThemeChooser/>*/}

        {/*不同项的分隔线*/}
        {/*<DropdownMenuSeparator />*/}

        {/*点击后退出登录*/}
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}