import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import colors from "tailwindcss/colors"

const data = [
    {
        product: "Peperoni",
        amount: 12000
    },
    {
        product: "Mussarela",
        amount: 500
    },
    {
        product: "4 queijos",
        amount: 1333
    },
    {
        product: "chocolate",
        amount: 44444
    },
    {
        product: "doce",
        amount: 12222
    }
]

const COLORS = [
    colors.sky[500],
    colors.amber[500],
    colors.violet[500],
    colors.emerald[500],
    colors.rose[500]
]

export function PopularProductsChart() {
    return (
        <Card className="col-span-3">
            <CardHeader className="pb-8">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">Produtos populares</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={248}>
                    <PieChart style={{ fontSize: 12 }}>
                        <Pie
                            data={data}
                            dataKey="amount"
                            nameKey="product"
                            cx="50%"
                            outerRadius={86}
                            innerRadius={64}
                            strokeWidth={8}
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = 12 + innerRadius + (outerRadius - innerRadius);
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        fill={colors.gray[800]}
                                        textAnchor={x > cx ? 'start' : 'end'}
                                        dominantBaseline="central"
                                        fontSize={12}
                                    >
                                        {data[index].product.length > 12
                                            ? `${data[index].product.substring(0, 12)}...`
                                            : data[index].product}{' '}
                                        ({value})
                                    </text>
                                );
                            }}
                        >
                            {
                                data.map((_,index) => {
                                    return (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={COLORS[index]}
                                            className="stroke-background hover:opacity-80" 
                                        />
                                    )   
                                })
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}