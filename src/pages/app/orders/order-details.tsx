import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface OrderDetailsProps { }

export function OrderDetails() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Pedidos 33432</DialogTitle>
                <DialogDescription>Detalhes do pedido</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Status</TableCell>
                            <TableCell className="flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400"> </span>
                                    <span className="font-medium text-muted-foreground">Pendente</span>
                                </div>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Cliente</TableCell>
                            <TableCell className="flex justify-end">
                               <span>Lorenzo</span>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Telefone</TableCell>
                            <TableCell className="flex justify-end">
                               <span>51 993784415</span>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">E-mail</TableCell>
                            <TableCell className="flex justify-end">
                               <span>lorenzo@</span>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Realizado há</TableCell>
                            <TableCell className="flex justify-end">
                               <span>3 minutos</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">Produto</TableHead>
                            <TableHead className="text-right">Quantidade</TableHead>
                            <TableHead className="text-right">Preço</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody> 
                        <TableRow>
                            <TableCell>
                                Pizza peperoni familia
                            </TableCell>
                            <TableCell className="text-right">
                                2
                            </TableCell>
                            <TableCell className="text-right">
                                R$ 49,90
                            </TableCell>
                            <TableCell className="text-right">
                                R$ 99,90
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                Pizza mussarela
                            </TableCell>
                            <TableCell className="text-right">
                                2
                            </TableCell>
                            <TableCell className="text-right">
                                R$ 49,90
                            </TableCell>
                            <TableCell className="text-right">
                                R$ 99,90
                            </TableCell>
                        </TableRow>
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total do pedido</TableCell>
                            <TableCell className="text-right font-medium">10000</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </DialogContent>
    )
}


