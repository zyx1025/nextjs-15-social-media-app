import {
  DropdownMenuItem,
  DropdownMenuPortal, DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeChooser(){

  const {theme,setTheme} = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Monitor className="mr-2 size-4" />
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Monitor className="mr-2 size-4" />
            System default
            {/*当主题是系统默认时，显示Check组件（一个勾）*/}
            {theme === "system" && <Check className="ms-2 size-4" />}
          </DropdownMenuItem>

          {/*切换白天主题*/}
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 size-4" />
            Light
            {theme === "light" && <Check className="ms-2 size-4" />}
          </DropdownMenuItem>

          {/*切换黑暗主题*/}
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 size-4" />
            Dark
            {theme === "dark" && <Check className="ms-2 size-4" />}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}