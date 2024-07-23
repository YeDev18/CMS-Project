import url from '@/api';
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
import { useEffect, useState } from 'react';
import { Pie, PieChart } from 'recharts';

export function Chart() {
  const [countConformes, setCountConformes] = useState<number>(0);
  const [countNonConformes, setCountNonConformes] = useState<number>(0);
  const [countNonDeclare, setCountNonDeclare] = useState<number>(0);
  const chartData = [
    {
      browser: 'Conformes',
      visitors: countConformes,
      fill: 'var(--color-Conformes)',
    },
    {
      browser: 'Non_conformes',
      visitors: countNonConformes,
      fill: 'var(--color-Non_conformes)',
    },
    {
      browser: 'Non_declares',
      visitors: countNonDeclare,
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
      label: 'Non_Conformes',
      color: '#F59069',
    },
    Non_declares: {
      label: 'Non_Declare',
      color: '#F0352B',
    },
  } satisfies ChartConfig;

  useEffect(() => {
    url
      .get('/api/declare-conforme')
      .then(res => res.data)
      .then(data => setCountConformes(data.length))
      .catch(error => console.log(error));
    url
      .get('/api/declare-non-conforme')
      .then(res => res.data)
      .then(data => setCountNonConformes(data.length))
      .catch(error => console.log(error));

    url
      .get('/api/non-declare')
      .then(res => res.data)
      .then(data => setCountNonDeclare(data.length))
      .catch(error => console.log(error));
  }, []);
  // console.log(countNavire);
  // console.log(countConsignataire);
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
