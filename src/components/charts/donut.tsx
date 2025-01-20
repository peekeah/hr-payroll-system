"use client"
import { Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function DonutChart({ data }: { data: any }) {
  const chartData = Object.entries(data || {}).map(([key, value], index) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    count: value,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

  const chartConfig = chartData.reduce((config: any, item, index) => {
    config[item.label.toLowerCase()] = {
      label: item.label,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return config;
  }, {});

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto h-[150px] aspect-square"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="label"
          innerRadius={50}
          paddingAngle={5}
          cornerRadius={8}
        />
      </PieChart>
    </ChartContainer>
  )
}
