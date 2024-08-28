import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilter } from "./order-table-filter";

export function Orders() {
    return (
        <>
            <Helmet title="Pedidos" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Pedidos</h1>
                <div className="space-y-2.5">
                    <OrderTableFilter />
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[64px]"></TableHead>
                                    <TableHead className="w-[140px]">Identificador</TableHead>
                                    <TableHead className="w-[180px]">Realizado Há</TableHead>
                                    <TableHead className="w-[140px]">Status</TableHead>
                                    <TableHead>CLiente</TableHead>
                                    <TableHead  className="w-[140px]">Total do pedido</TableHead>
                                    <TableHead className="w-[164px]"></TableHead>
                                    <TableHead className="w-[132px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                              <OrderTableRow />
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}