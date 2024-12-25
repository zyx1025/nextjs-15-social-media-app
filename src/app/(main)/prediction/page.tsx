"use client"

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { direction: "升学" },
  });

  useEffect(() => {
    const selectedDirection = form.getValues("direction");
    predictBigWay(userId, selectedDirection)
      .then(([bigData, smallData]) => {
        setBigChartData(bigData);
        setCompanyChartData(smallData);
      })
      .catch((error) => console.error("Failed to fetch chart data:", error));
  }, [userId, form.watch("direction")]);


  return (
    <main className="h-[200vh] w-full bg-red-50">
      <div className="w-full">
        {/* RadioGroup 表单 */}
        <div className="mb-6">
          <Card>
            <DesireWayForm form={form} />
          </Card>
        </div>

        <JobDistributionChart chartData={bigChartData} />
        <br/>

        {/* 图表部分 */}


          {form.watch("direction") && (
            <CompanyDistributionChart
              chartData={companyChartData}
              direction={form.watch("direction")}
            />
          )}

      </div>
    </main>
  );
}