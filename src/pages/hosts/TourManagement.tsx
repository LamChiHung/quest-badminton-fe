import DashboardCard from "@/components/custom/DashboardCard";
import { Button } from "@/components/ui/button";

export default function TourManagement() {

    

    return (
        <div className="flex flex-col">
            <div className="flex flex-wrap w-full space-x-4 space-y-4 border-b pb-2">
                <DashboardCard header="Tổng giải đấu" content="100" subContent="Giải" />
                <DashboardCard header="Giải đấu đang diễn ra" content="2" subContent="Giải" />
                <DashboardCard header="Giải đấu sắp tới" content="50" subContent="Giải" />
            </div>
            <div className="border-b space-y-4 pb-2 pt-2">
                <Button className="cursor-pointer">Thêm giải đấu</Button>
            </div>
            <div>

            </div>
        </div>
    )
}