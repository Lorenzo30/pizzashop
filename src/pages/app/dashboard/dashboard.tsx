import { MonthCard } from "./month-renevue-card";
import { MonthOrdersAmount } from "./month-order-amount";
import { MonthCanceledOrdersAmount } from "./month-canceled-aount-card";
import { DayOrdersAmountCard } from "./day-orders-amount-card";
import { RenevueChart } from "./revenue-chart";
import { PopularProductsChart } from "./popular-products-chart";

export function Dashboard() {
    return ( 
        <div className="flex flex-col gap-4"> 
          <h1 className="text-3xl font-bold tracking-tighter"> Dashboard</h1>

          <div className="grid grid-cols-4 gap-200"> 
            <MonthCard />
            <MonthOrdersAmount />
            <DayOrdersAmountCard />
            <MonthCanceledOrdersAmount />
          </div>

          <div className="grid grid-cols-9 gap-4">
              <RenevueChart />
              <PopularProductsChart />
          </div>
        </div>
    )
}