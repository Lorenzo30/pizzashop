import {createBrowserRouter} from "react-router-dom"
import { Dashboard } from "./pages/app/dashboard";
import { SignIn } from "./pages/auth/sign-in";
import { AppLayout } from "./_layouts/app";
import { AuthLayout } from "./_layouts/auth";
import { SignOut } from "./pages/auth/sign-out";
import { Orders } from "./pages/app/orders/order";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout />,
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
            {path:"/signOut",element:<SignOut />}
        ]
    }
]);