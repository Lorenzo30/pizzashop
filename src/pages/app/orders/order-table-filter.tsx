import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const orderFiltersSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional()
})

type OrderFiltersSchemaType = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilter() {

    const [searchParams,setSearchParams] = useSearchParams();

    const orderId = searchParams.get("orderId")
    const customerName = searchParams.get("customerName");
    const status = searchParams.get("status")

    const { register, handleSubmit, control, reset } = useForm<OrderFiltersSchemaType>({
        resolver: zodResolver(orderFiltersSchema),
        defaultValues:{
            orderId:orderId ?? '',
            customerName:customerName ?? '',
            status:status ?? 'all'
        }
    })

    function handleClearFilter () {
        setSearchParams(state => {
            state.delete("orderId")
            state.delete("customerName")
            state.delete("status")
            state.set("page","1")

            return state;
        })

        reset({
            orderId:"",
            customerName:"",
            status:""
        })
    
    }

    function handleFilter({orderId,customerName,status}: OrderFiltersSchemaType) {
        setSearchParams((state) => {
            if (orderId) {
                state.set("orderId",orderId)
            } else {
                state.delete("orderId")
            }

            if (customerName) {
                state.set("customerName",customerName)
            } else {
                state.delete("customerName")
            }

            if (status) {
                state.set("status",status)
            } else {
                state.delete("status")
            }

            state.set("page","1");

            return state;
        })
    }

    return (
        <form  onSubmit={handleSubmit(handleFilter)}  className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros</span>
            <Input placeholder="Id do pedido" className="h-8 w-[320px]" {...register("orderId")} />
            <Input placeholder="Nome do cliente" className="h-8 w-[320px]" {...register("customerName")}/>
           
                <Controller 
                   name="status"
                   control={control}
                   render={({field: {name,onChange,value,disabled} }) => {
                   return ( <Select name={name} onValueChange={onChange} value={value}> 
                            <SelectTrigger className="h-8 w-[180px]">
                                <SelectValue placeholder="Todos"/>
                            </SelectTrigger>
                            <SelectContent>

                            <SelectItem value="all" >Todos</SelectItem>
                            <SelectItem value="pending">Pendente</SelectItem>
                            <SelectItem value="canceled">Cancelado</SelectItem>
                            <SelectItem value="processing">Em preparo</SelectItem>
                            <SelectItem value="delivering">Em entrega</SelectItem>
                            <SelectItem value="delivered">Entregue</SelectItem>
                        </SelectContent>
                    </Select> 
            
                    )}} />
               

            <Button type="submit" variant="secondary" size="xs">
                <Search className="h-4 w-4 mr-2" />
                Filtrar resultados
            </Button>

            <Button type="button" onClick={handleClearFilter} variant="secondary" size="xs">
                <X  className="h-4 w-4 mr-2" />
                Remover filtros
            </Button>
        </form >
    );
}