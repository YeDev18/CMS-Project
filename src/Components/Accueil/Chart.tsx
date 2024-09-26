import { useServer } from '@/Context/ServerProvider';
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

export function Chart() {
  const conform = useServer()?.conform;
  const notConform = useServer()?.notConform;
  const undeclared = useServer()?.undeclared;
  const chartData = [
    {
      browser: 'Conformes',
      visitors: conform?.length,
      fill: 'var(--color-Conformes)',
    },
    {
      browser: 'Non_conformes',
      visitors: notConform?.length,
      fill: 'var(--color-Non_conformes)',
    },
    {
      browser: 'Non_declares',
      visitors: undeclared?.length,
      fill: 'var(--color-Non_declares)',
    },
  ];

  const chartConfig = {
    visitors: {
      label: 'Navire',
    },
    Conformes: {
      label: 'Conformes',
      color: 'hsl(var(--chart-1))',
    },
    Non_conformes: {
      label: 'Non Conformes',
      color: '#F59069',
    },
    Non_declares: {
      label: 'Non Declare',
      color: '#F0352B',
    },
  } satisfies ChartConfig;

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
          className="mx-auto aspect-square max-h-[400px]"
        >
          <PieChart className="flex">
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
          Tendance Haute de mois en mois <TrendingUp className="size-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
