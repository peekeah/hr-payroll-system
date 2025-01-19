"use client";

import * as React from "react";
import {
  Bar,
  BarChart as BaseBarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    name: "Browsers",
    chrome: 275,
    safari: 200,
    firefox: 287,
    edge: 173,
    other: 190,
  },
];

const chartConfig = {
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function BarChart() {
  // Calculate total visitors
  const totalVisitors = React.useMemo(() => {
    const data = chartData[0];
    return Object.keys(data).reduce((total, key) => {
      if (key !== "name" && typeof data[key] === "number") {
        return total + (data[key] as number);
      }
      return total;
    }, 0);
  }, []);

  // Custom Bar Shape
  const CustomBar = (props: any) => {
    const { x, y, width, height, fill } = props;
    const radius = 8;
    const gap = 4;
    const adjustedWidth = width - gap;
    const adjustedX = x + gap / 2;

    return (
      <g>
        <rect
          x={adjustedX}
          y={y}
          width={adjustedWidth}
          height={height}
          fill={fill}
          rx={radius}
          ry={radius}
        />
      </g>
    );
  };

  return (
    <ChartContainer config={chartConfig} className="h-[100px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BaseBarChart
          data={chartData}
          layout="vertical"
          stackOffset="expand"
          barSize={12}
        >
          <XAxis hide type="number" />
          <YAxis hide type="category" dataKey="name" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    content={payload.map((item, index) => {
                      const browser = item.dataKey as keyof typeof chartConfig;
                      const value = item.value as number;
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{
                                backgroundColor:
                                  chartConfig[browser].color,
                              }}
                            />
                            <span className="font-medium">
                              {chartConfig[browser].label}
                            </span>
                          </div>
                          <span>{value}</span>
                          <span className="text-xs text-muted-foreground">
                            {((value / totalVisitors) * 100).toFixed(1)}%
                          </span>
                        </div>
                      );
                    })}
                  />
                );
              }
              return null;
            }}
          />
          {Object.keys(chartConfig).map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="stack"
              fill={chartConfig[key as keyof typeof chartConfig].color}
              shape={<CustomBar />}
            />
          ))}
        </BaseBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

