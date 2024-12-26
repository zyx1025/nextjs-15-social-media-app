"use client"
import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
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

const chartData = [
  { dimension: "学业成绩", 我的水平: 8.86, 学长平均水平: 8.32 },
  { dimension: "艺术素养", 我的水平: 6.25, 学长平均水平: 7.02 },
  { dimension: "竞赛获奖", 我的水平: 4.5, 学长平均水平: 6.4 },
  { dimension: "家庭情况", 我的水平: 8, 学长平均水平: 7.5 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig
export function RecentAbilitiesRadarChart() {

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>就业能力对比图</CardTitle>
        <CardDescription>
          展示你的就业能力和该去向的学长能力平均值的差异
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[520px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="dimension" />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey="我的水平"
              fill="var(--color-desktop)"
              fillOpacity={0}
              stroke="var(--color-desktop)"
              strokeWidth={2}
            />
            <Radar
              dataKey="学长平均水平"
              fill="var(--color-mobile)"
              fillOpacity={0}
              stroke="var(--color-mobile)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          说明信息1
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          说明信息2
        </div>
      </CardFooter>
    </Card>
  )
}