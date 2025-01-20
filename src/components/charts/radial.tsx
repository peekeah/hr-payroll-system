"use client"
import { Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function RadialChart({ data }: { data: any }) {

  const chartData = Object.entries(data || {}).map(([key, value], index) => ({
    label: key === "ACTIVE" ? "Active" : (
      key === "INVITE_SENT" ? "Invite Sent" : "Payroll Only"
    ),
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
      className="mx-auto p-0 h-[150px] aspect-square"
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
          endAngle={180}
        />
      </PieChart>
    </ChartContainer>
  )
}

