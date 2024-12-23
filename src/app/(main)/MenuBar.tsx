import { Button } from "@/components/ui/button";
import { Search, Home } from "lucide-react";
import Link from "next/link";

interface MenuBarProps {
   className?: string;
}


// 侧边导航栏
export default function MenuBar({ className }: MenuBarProps) {
   return (
     <div className={className}>

       {/*返回主页的按钮*/}
        <Button
          variant="ghost"
          className="flex items-center justify-start gap-3"
          title="Home"
          asChild     //asChild属性使得button内部可以内嵌其它组件
        >
           <Link href="/">
              <Home />
              <span className="hidden lg:inline">Home</span>
           </Link>
        </Button>

       {/*返回预测界面的按钮*/}
        <Button
          variant="ghost"
          className="flex items-center justify-start gap-3"
          title="Notifications"
          asChild
        >
           <Link href="/prediction">
              <Search />
              <span className="hidden lg:inline">Notifications</span>
           </Link>
        </Button>

     </div>
   );
}