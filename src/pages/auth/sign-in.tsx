import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import {useForm} from "react-hook-form"
import { Link } from "react-router-dom";
import {z} from "zod"


const signInForm = z.object({
    email:z.string().email()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {

    const {register,handleSubmit,formState: {isSubmitting}} = useForm<SignInForm>();

    async function handleSign(data:SignInForm) {
       
    }

    return (
        <>
            <Helmet title="login" />
            <div className="p-8">
                
                <Button asChild className="absolute right-4 top-8" variant="ghost"> 
                    <Link to="/signOut" className=""> 
                        Novo estabelecimento
                    </Link>
                </Button>
               
                <div className="w-[350px] flex flex-col justify-content-center gap-6"> 
                    <div className="flex flex-col gap-2 text-center"> 
                        <h1 className="text-2xl font-semibold tracking-tight"> Acessar painel </h1>
                        <p className="text-sm text-muted-foreground"> Acompanhe suas vendas pelo painel do parceiro</p>
                     </div>

                  <form className="space-y-4" onSubmit={handleSubmit(handleSign)}> 
                    <div className="space-y-2"> 
                      <Label htmlFor="email">Seu e-mail</Label>
                      <Input id="email" type="email" {...register("email")}/>
                    </div>

                    <Button 
                        className="w-full"
                        disabled={isSubmitting}
                         type="submit">Acessar painel</Button>
                  </form>
                </div>
            </div>
        </>
    )
}