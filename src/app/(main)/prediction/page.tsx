"use client"

import { Suspense } from "react";
import { Skeleton } from "@/components/skeletons";
import { useSession } from "@/app/(main)/SessionProvider";
import { useEffect, useState } from "react";
import { predictBigWay } from "@/app/(main)/prediction/action";
import { JobDistributionChart } from "@/components/jobDistributionChart";
import { CompanyDistributionChart } from "@/components/companyDistributionChart";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { DesireWayForm } from "@/components/DesireWayForm";
import { RecentAbilitiesRadarChart } from "@/components/RecentAbilitiesRadarChart";
import RecommendWay from "@/components/RecommendWay";

interface SmallWayData {
  organization: string;
  count: number;
}

const FormSchema = z.object({
  direction: z.enum(["升学", "留学", "就业", "选调"], {
    required_error: "请选择一个就业方向。",
  }),
});

export default function Prediction() {
  const { user } = useSession();
  const { userId } = user;

  //就业大方向数据
  const [bigChartData, setBigChartData] = useState<{ way: string; count: number; fill:string }[]>([]); // 存储能力数据

  //用户倾向或往届选择最多的大方向下，各个小方向（企业单位名）的分布
  const [companyChartData, setCompanyChartData] = useState<SmallWayData[]>([]);

  const [recommendData, setRecommendData] = useState<SmallWayData>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  useEffect(() => {
    //这里若用户没有倾向，应选择往届学长就业去向最多的大方向。现在写死为“升学”
    const selectedDirection = form.getValues("direction") || "升学";
    predictBigWay(userId, selectedDirection)
      .then(([bigData, smallData]) => {
        setBigChartData(bigData);
        setCompanyChartData(smallData);
      })
      .catch((error) => console.error("Failed to fetch chart data:", error));
  }, [userId, form.watch("direction")]);

  useEffect(() => {
    setRecommendData(companyChartData[0] || null);
  }, [companyChartData]);

  return (
    <main className="h-[200vh] w-full bg-red-50">
      <DesireWayForm form={form} />
      <div className="w-full flex flex-col items-center gap-y-6">
        {/* 学生就业意愿问卷 */}


        {/* 就业分布图表 */}
          <div className="w-full">
            <JobDistributionChart chartData={bigChartData} />
          </div>


        {/* 推荐路径 */}
        <div className="w-full">
          <RecommendWay direction={form.watch("direction")} recommendData={recommendData}/>
        </div>

        {/* 图表部分 */}
          <Suspense fallback={<Skeleton height="400px" />}>
            <div className="w-full">
              <CompanyDistributionChart
                chartData={companyChartData}
                direction={form.watch("direction") || "升学"}
              />
            </div>
          </Suspense>

      </div>
    </main>
  );
}