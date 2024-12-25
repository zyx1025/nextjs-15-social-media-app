"use client"

//用于主页展示学生能力水平的雷达图
import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
const {key1,key2} = require("@/config/RadarChartConfig");

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

interface ChartData {
  dimension: string;
  value: number;
}
interface Props {
  chartData: ChartData[];
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function StudentAbilitiesChart({ chartData }: Props) {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>学生就业能力图</CardTitle>
        <CardDescription>
          展示学生在以下4个方面的能力值
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[600px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey={key1} />
            <PolarGrid />
            <Radar
              dataKey={key2}
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          您的能力已超过同层次60%的同学 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          2024.12.23
        </div>
      </CardFooter>
    </Card>
  )
}
