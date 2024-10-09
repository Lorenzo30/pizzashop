import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer,LineChart,XAxis,YAxis,CartesianGrid,Line,Tooltip} from "recharts"
import colors from "tailwindcss/colors"

const data = [
    {
        date:"10/12",
        renevue:12000
    },
    {
        date:"10/12",
        renevue:500
    },
    {
        date:"10/12",
        renevue:1333
    },
    {
        date:"10/12",
        renevue:44444
    },
    {
        date:"10/12",
        renevue:12222
    }
]

export function RenevueChart(){
    return (
        <Card className="col-span-6"> 
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1"> 
                    <CardTitle className="text-base font-medium">Receita no periodo</CardTitle>
                    <CardDescription>Receita diaria no periodo</CardDescription>
                </div>
             </CardHeader>
             <CardContent> 
                <ResponsiveContainer width="100%" height={248}>
                    <LineChart data={data}  style={{fontSize:12}}>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16}/>
                        <YAxis 
                            stroke="#888"
                            axisLine={false}
                            tickLine={false} 
                            width={80}
                            tickFormatter={(value:Number) => value.toLocaleString('pt-BR',{style:"currency",currency:"BRL"})}/>
                        <Line type="linear" strokeWidth={2} dataKey="renevue" stroke={colors.violet['500']}/>
                    </LineChart>

                    <CartesianGrid vertical={false}/>
                </ResponsiveContainer>
             </CardContent>
        </Card>
    );
}