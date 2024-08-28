import { Helmet } from "react-helmet-async";

export function Dashboard() {
    return ( 
        <div className="min-h-screen grid grid-cols-2"> 
          <Helmet title="dashboard"/>
          <div> Dashboard</div>
        </div>
    )
}