'use client';

import { TrendingUp } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useServer } from '@/Context/ServerProvider';

export function ChartUpdate() {
  const conform = useServer().conform;
  const notConform = useServer().notConform;
  const undeclared = useServer().undeclared;

  const chartData = [
    {
      browser: 'Conformes',
      visitors: conform.length,
      fill: 'var(--color-chrome)',
    },
    {
      browser: 'safari',
      visitors: notConform.length,
      fill: 'var(--color-Non_conformes)',
    },
    {
      browser: 'firefox',
      visitors: undeclared.length,
      fill: 'var(--color-Non_declares)',
    },
  ];

  const chartConfig = {
    visitors: {
      label: 'Navires',
    },
    chrome: {
      label: 'Chrome',
      color: 'hsl(var(--chart-1))',
    },
    Conformes: {
      label: 'Conformes',
      color: 'hsl(var(--chart-1))',
    },
    Non_conformes: {
      label: 'Non_Conformes',
      color: '#F59069',
    },
    Non_declares: {
      label: 'Non_Declare',
      color: '#F0352B',
    },
  } satisfies ChartConfig;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Label List</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

export default ChartUpdate;
