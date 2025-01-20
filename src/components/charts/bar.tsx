"use client";

import * as React from "react";
import {
  Bar,
  BarChart as BaseBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type ChartConfig = {
  [key: string]: {
    label: string;
    color: string;
  };
};

const CustomBar = ({
  x,
  y,
  width,
  height,
  fill,
  value,
  label,
  percentage,
  parentWidth,
}: any) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const radius = 8;
  const gap = 4;
  const adjustedWidth = width - gap;
  const adjustedX = x + gap / 2;

  // Set tooltip dimensions
  const tooltipWidth = 150;
  const tooltipPadding = 10; // Padding from container edges

  // Calculate tooltip position
  const calculateTooltipX = () => {
    // Start with the bar's center position
    let tooltipX = adjustedX + (adjustedWidth / 2) - (tooltipWidth / 2);

    // Account for left boundary including padding
    if (tooltipX < tooltipPadding) {
      tooltipX = tooltipPadding;
    }

    // Account for right boundary including padding
    if (tooltipX + tooltipWidth > parentWidth - tooltipPadding) {
      tooltipX = parentWidth - tooltipWidth - tooltipPadding;
    }

    return tooltipX;
  };

  const tooltipY = y < window.innerHeight / 2 ? y - 50 : y + height;

  return (
    <g
      // onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <rect
        x={adjustedX}
        y={y}
        width={adjustedWidth}
        height={height}
        fill={fill}
        rx={radius}
        ry={radius}
      />
      {showTooltip && (
        <foreignObject
          x={calculateTooltipX()}
          y={tooltipY}
          width={tooltipWidth}
          height={50}
          style={{ overflow: "visible" }}
        >
          <div
            className="bg-white p-2 shadow-lg rounded-lg border border-gray-200 text-sm absolute z-50"
            style={{ whiteSpace: "nowrap" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: fill }}
              />
              <span className="font-medium">{label}</span>
              <span>{value}</span>
              <span className="text-xs text-gray-500">
                {percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </foreignObject>
      )}
    </g>
  );
};

export function BarChart({ data }: { data: Record<string, number> }) {
  const parentRef = React.useRef<HTMLDivElement | null>(null);
  const [parentWidth, setParentWidth] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      if (parentRef.current) {
        setParentWidth(parentRef.current.getBoundingClientRect().width);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const chartData = [
    {
      name: "Browsers",
      ...Object.entries(data || {}).reduce((acc, [key, value]) => {
        acc[key.toLowerCase()] = value;
        return acc;
      }, {} as Record<string, number>),
    },
  ];

  const chartConfig = Object.entries(data || {}).reduce((config: ChartConfig, [key], index) => {
    config[key.toLowerCase()] = {
      label: key.replace(/_/g, " "),
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return config;
  }, {});

  const totalValue = React.useMemo(() => {
    return Object.values(data || {}).reduce((total, value) => total + value, 0);
  }, [data]);

  return (
    <div ref={parentRef} className="h-[60px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <BaseBarChart
          data={chartData}
          layout="vertical"
          stackOffset="expand"
          barSize={12}
        // margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
        >
          <XAxis hide type="number" />
          <YAxis hide type="category" dataKey="name" />
          {Object.keys(chartConfig).map((key) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="stack"
              fill={chartConfig[key].color}
              shape={
                <CustomBar
                  label={chartConfig[key].label}
                  percentage={(data[key] / totalValue) * 100}
                  parentWidth={parentWidth}
                />
              }
            />
          ))}
        </BaseBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
