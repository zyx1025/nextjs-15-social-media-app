"use client"
// import PostEditor from "@/components/posts/editor/PostEditor";

//主页内容
import { StudentAbilitiesChart } from "@/components/StudentAbilitiesRadarChart";
import { useEffect, useState } from "react";
import { useSession } from "@/app/(main)/SessionProvider";
import { getAllAbilities } from "@/app/(main)/action";
import StudentInformation from "@/components/StudentInformation";

export default function Home() {
  const { user } = useSession();
  const { userId } = user;
  const [chartData, setChartData] = useState<{ dimension: string; value: number }[]>([]); // 存储能力数据

  useEffect(() => {
    console.log("学号"+userId);
    // 获取所有能力值并设置到状态
    getAllAbilities(userId)
      .then(setChartData)
      .catch((error) => console.error("Failed to fetch chart data:", error));
  }, [userId]);

  return (
    <main className="h-[200vh] w-full bg-red-50">
      <div className="w-full">

        <StudentInformation id={userId}/>
        {/*显示学生能力信息的雷达图*/}
        <StudentAbilitiesChart chartData={chartData}/>
        {/*<PostEditor />*/}
      </div>
    </main>
  );
}