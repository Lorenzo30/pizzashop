import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import {useForm} from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {z} from "zod"


const SignOutForm = z.object({
    email:z.string().email(),
    restaurantName:z.string(),
    managerName:z.string(),
    phone:z.string()
})

type SignOutForm = z.infer<typeof SignOutForm>

export function SignOut() {

    const {register,handleSubmit,formState: {isSubmitting}} = useForm<SignOutForm>();
    const navigate = useNavigate();

    async function handleSign(data:SignOutForm) {
       try {

          toast.success("Restaurante cadastrado com sucesso",{
            action:{
               label:"Login",
               onClick:() => navigate("/")
            }
          })

       } catch {
          toast.error("Erro ao cadastrar restaurante")
       }
    }

    return (
        <>
            <Helmet title="Cadastro" />
            <div className="p-8">

            <Button asChild className="absolute right-4 top-8" variant="ghost"> 
                    <Link to="/signIn" className=""> 
                        Fazer login
                    </Link>
                </Button>

                <div className="w-[350px] flex flex-col justify-content-center gap-6"> 
                    <div className="flex flex-col gap-2 text-center"> 
                        <h1 className="text-2xl font-semibold tracking-tight"> Criar conta gratis </h1>
                        <p className="text-sm text-muted-foreground"> Seja uma parceiro </p>
                     </div>

                  <form className="space-y-4" onSubmit={handleSubmit(handleSign)}> 
                    <div className="space-y-2"> 
                      <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                      <Input id="restaurantName" type="text" {...register("restaurantName")}/>
                    </div>

                    <div className="space-y-2"> 
                      <Label htmlFor="managerName">Seu nome</Label>
                      <Input id="managerName" type="text" {...register("managerName")}/>
                    </div>


                    <div className="space-y-2"> 
                      <Label htmlFor="email">Seu e-mail</Label>
                      <Input id="email" type="email" {...register("email")}/>
                    </div>

                    <div className="space-y-2"> 
                      <Label htmlFor="phone">Seu celular</Label>
                      <Input id="phone" type="tel" {...register("phone")}/>
                    </div>



                    <Button 
                        className="w-full"
                        disabled={isSubmitting}
                         type="submit">Criar conta</Button>


                    <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                      Ao continuar você concorda com nossos termos de serviço e politicas 
                    </p>
                  </form>
                </div>
            </div>
        </>
    )
}