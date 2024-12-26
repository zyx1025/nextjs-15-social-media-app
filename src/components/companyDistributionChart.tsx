"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


interface CompanyChartData {
  organization: string;
  count: number;
}

interface Props {
  chartData: CompanyChartData[];
  direction: string;
}


export function CompanyDistributionChart({ chartData, direction }: Props) {

  console.log(direction);

  const chartHeight = Math.max(chartData.length * 31, 150);

  return (
    <Card>
      <CardHeader>
        <CardTitle>选择 {direction} 的学长去向分布</CardTitle>
        <CardDescription>统计级别为就业单位</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          style={{ height: `${chartHeight}px` }}
        >
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 120 }}
          >
            {/* Y 轴 - 显示组织名称 */}
            <YAxis
              type="category"
              dataKey="organization"
              tickLine={true}
              tickMargin={5}
              axisLine={true}
              width={130}
            />

            <XAxis
              type="number"
              domain={[0, Math.max(12,Math.max(...chartData.map((item) => item.count)) )]}
              scale={"linear"}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Bar - 使用数量绑定 */}
            <Bar
              dataKey="count"
              fill="hsl(var(--chart-1))"
              radius={[0, 5, 5, 0]}
              className="w-full"
              maxBarSize={500}
              minPointSize={5} // 设置最小点尺寸，避免 bar 太小
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          说明1
        </div>
        <div className="leading-none text-muted-foreground">
          说明2
        </div>
      </CardFooter>
    </Card>
  );
}