import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";

import { formatDistanceToNow } from 'date-fns'

import { ptBR } from "date-fns/locale"
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { approveOrder } from "@/api/approve-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";


export interface OrderTableRowProps {
    order: {
        orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
        customerName: string;
        total: number;
    }
}

export function OrderTableRow({ order }: OrderTableRowProps) {

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const queryClient = useQueryClient();

    function updateOrderStatusOnCache(orderId: string, orderStatus: string) {
        const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
            queryKey: ['orders']
        })

        ordersListCache.forEach(([cacheKey, cacheData]) => {

            if (!cacheData) {
                return false;
            }

            queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
                ...cacheData,
                orders: cacheData.orders.map(order => {
                    if (order.orderId == orderId) {
                        return { ...order, status: orderStatus }
                    }

                    return order;
                })
            })
        })
    }

    const { mutateAsync: cancelOrderFn,isPending:isCancelingOrder } = useMutation({
        mutationFn: cancelOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCache(orderId, "canceled");
        }
    })

    const { mutateAsync: approveOrderFn,isPending:isApprovingOrder } = useMutation({
        mutationFn: approveOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCache(orderId, "processing");
        }
    })

    const { mutateAsync: deliverOrderFn,isPending:isDeliverOrder } = useMutation({
        mutationFn: deliverOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCache(orderId, "delivered");
        }
    })

    const { mutateAsync: dispatchOrderFn, isPending:isDispatchOrder} = useMutation({
        mutationFn: dispatchOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCache(orderId, "delivering");
        }
    })

    return (
        <TableRow>
            <TableCell>
                <Dialog onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do pedido</span>
                        </Button>
                    </DialogTrigger>

                    <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
                </Dialog>

            </TableCell>
            <TableCell className="font-mono text-xs font-medium">{order.orderId}</TableCell>
            <TableCell className="text-muted-foreground">{formatDistanceToNow(order.createdAt, {
                locale: ptBR,
                addSuffix: true
            })}</TableCell>
            <TableCell>
                <OrderStatus status={order.status} />
            </TableCell>
            <TableCell className="font-medium">
                {order.customerName}
            </TableCell>
            <TableCell className="font-medium">
                {(order.total / 100).toLocaleString('pt-BR', {
                    style: "currency",
                    currency: "BRL"
                })}
            </TableCell>
            <TableCell>

                {
                    order.status == "pending" && (
                        <Button
                            disabled={isApprovingOrder} 
                            onClick={() => approveOrderFn({orderId:order.orderId})} variant="outline" size="xs" >
                            <ArrowRight className="h-3 w-3 mr-2" />
                            Aprovar
                        </Button>
                    )
                }

                {
                    order.status == "processing" && (
                        <Button
                            disabled={isDispatchOrder} 
                            onClick={() => dispatchOrderFn({orderId:order.orderId})} variant="outline" size="xs" >
                            <ArrowRight className="h-3 w-3 mr-2" />
                            Em entrega
                        </Button>
                    )
                }

                {
                    order.status == "delivering" && (
                        <Button
                            disabled={isDeliverOrder} 
                            onClick={() => deliverOrderFn({orderId:order.orderId})} variant="outline" size="xs" >
                            <ArrowRight className="h-3 w-3 mr-2" />
                            Entregue
                        </Button>
                    )
                }

            </TableCell>
            <TableCell>
                <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => cancelOrderFn({ orderId: order.orderId })}
                    disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder}>
                    <X className="h-3 w-3 mr-2" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}


