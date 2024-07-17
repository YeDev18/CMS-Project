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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';
const chartData = [
  { browser: 'Conformes', visitors: 275, fill: 'var(--color-Conformes)' },
  {
    browser: 'Non_conformes',
    visitors: 200,
    fill: 'var(--color-Non_conformes)',
  },
  { browser: 'Non_declares', visitors: 187, fill: 'var(--color-Non_declares)' },
  // { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  // { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];
const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  Conformes: {
    label: 'Conformes',
    color: 'hsl(var(--chart-1))',
  },
  Non_conformes: {
    label: 'Non_Conformes',
    color: 'hsl(var(--chart-2))',
  },
  Non_declares: {
    label: 'Non_Declare',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;
export function Chart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Statistiques des differents navires </CardTitle>
        <CardDescription>
          Conformes - Non Comformes - Non-Declares
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              stroke="0"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Tendance Haute de mois en mois <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
