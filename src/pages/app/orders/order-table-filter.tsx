import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function OrderTableFilter() {
    return (
        <form className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Filtros</span>
            <Input placeholder="Id do pedido" className="h-8 w-[320px]" />
            <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
            <Select defaultValue="all"> 
                <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue></SelectValue>
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
        </form>
    );
}