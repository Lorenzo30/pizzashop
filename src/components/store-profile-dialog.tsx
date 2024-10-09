import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";
import { useEffect, useState } from "react";


export function StoreProfileDialog () {

    const storeProfileSchema = z.object({
        name:z.string().min(1),
        description:z.string().nullable()
    })

    type StoreProfileSchema = z.infer<typeof storeProfileSchema>

    const queryClient = useQueryClient()

    const {data:managedRestaurant} = useQuery({
        queryKey:['managedRestaurant'],
        queryFn:getManagedRestaurant,
        staleTime:Infinity
    })

    const updateRestaurantCached = function ({name,description}:StoreProfileSchema){
        const cached = queryClient.getQueryData(['managedRestaurant'])
        if (cached){
            queryClient.setQueryData(['managedRestaurant'],{
                ...cached,
                name,
                description
            })
        }

        return cached;
    }

    const {mutateAsync:updateProfileFn} = useMutation({
        mutationFn:updateProfile,
        onMutate({name,description}) {
           const cached = updateRestaurantCached({name,description});
           return {previousProfile:cached}
        },
        onError(_,__,context){
            if (context?.previousProfile){
                updateRestaurantCached(context.previousProfile as StoreProfileSchema)
            }
        }
    })

    async function handleUpdateProfile(data:StoreProfileSchema){
        try {
            await updateProfileFn({
                name:data.name,
                description:data.description
            })

            toast.success("Atualizado com sucesso!");
        } catch (e) {
            toast.error("Falha ao atualizar o perfil");
        }
    }

 

    const {
        register,
        handleSubmit,
        formState:{isSubmitting},
        reset
    } = useForm<StoreProfileSchema>({
        resolver:zodResolver(storeProfileSchema),
        defaultValues: {
            name:managedRestaurant?.name ?? '',
            description:managedRestaurant?.description ?? ''
        },
    });


    useEffect(() => {
        reset(managedRestaurant);
    },[managedRestaurant])



    return (
        <DialogContent> 
            <DialogHeader> 
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>Atualize as informações</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleUpdateProfile)}> 
                <div className="space-y-4"> 
                    <div className="grid grid-cols-4 items-center gap-4"> 
                        <Label className="text-right" htmlFor="Name">Nome</Label>
                        <Input className="col-span-3" id="name" {...register("name")}/>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4"> 
                        <Label className="text-right" htmlFor="description">Descrição</Label>
                        <Textarea className="col-span-3" id="description" {...register("description")}/>
                    </div>
                </div>
                <DialogFooter className="mt-7"> 
                    <DialogClose asChild> 
                        <Button variant="ghost" type="button">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" variant="success" disabled={isSubmitting}>Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}