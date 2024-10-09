import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { signOut } from "@/api/sign-out"
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { StoreProfileDialog } from "./store-profile-dialog";
import { useNavigate } from "react-router-dom";

export function AccountMenu() {

    const navigate = useNavigate();

    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile
    })

    const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
        queryKey: ['managedRestaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity
    })

    const { mutateAsync: signOutFn, isPending: isSignOut } = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            navigate("/signIn", { replace: true })
        }
    })

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild >
                    <Button variant="outline" className="flex items-center select-none gap-2">
                        {isLoadingManagedRestaurant ? (
                            <Skeleton className="h-4 w-40" />
                        ) : <span>{managedRestaurant?.name}</span>}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                        {
                            isLoadingProfile ? (<Skeleton className="h-4 w-40" />) :
                                <>
                                    <span>{profile?.name}</span>
                                    <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
                                </>
                        }

                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <Building className="w-4 h-4 mr-2" />
                            <span>Perfil da loja</span>
                        </DropdownMenuItem>
                    </DialogTrigger>


                    <DropdownMenuItem className="text-rose-500 dark:text-rose-400" asChild disabled={isSignOut}>
                        <button className="w-full" onClick={() => signOutFn()}>
                            <LogOut className="w-4 h-4 mr-2" />
                            <span>Sair</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <StoreProfileDialog />

        </Dialog>
    );
}