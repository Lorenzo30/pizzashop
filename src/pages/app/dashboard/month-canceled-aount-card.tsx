import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function MonthCanceledOrdersAmount () {
    return (
        <Card> 
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> 
           <CardTitle className="text-base font-semibold">Cancelamento no mes</CardTitle>
           <DollarSign className="h-4 w-4 text-muted-foreground"/>
        </CardHeader>
        <CardContent className="space-y-1">
           <span className="text-2xl font-bold tracking-tighter"> 
             32
           </span>
           <p className="text-xs text-muted-foreground"> 
               <span className="text-emerald-500 dark:text-emerald-600"> -2% </span> em relação ao mes passado
           </p>
        </CardContent>
     </Card>
    );
}