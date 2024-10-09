import {createBrowserRouter} from "react-router-dom"
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { SignIn } from "./pages/auth/sign-in";
import { AppLayout } from "./_layouts/app";
import { AuthLayout } from "./_layouts/auth";
import { SignUp } from "./pages/auth/sign-up";
import { Orders } from "./pages/app/orders/order";
import { NotFound } from "./pages/404";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout />,
        errorElement:<NotFound />,
        children:[
            {path:"/",element:<Dashboard />},
            {path:"/orders",element:<Orders />}
        ]
    },
    {
        path:"/",
        element:<AuthLayout />,
        children:[
            {path:"/signIn",element:<SignIn />}
        ]
    },
    {
        path:"/",
        element:<AuthLayout />,
        children:[
            {path:"/signUp",element:<SignUp />}
        ]
    }
]);