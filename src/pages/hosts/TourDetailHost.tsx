import PlayerApproveTab from "@/components/custom/PlayerApproveTab";
import TeamDetailTab from "@/components/custom/TeamDetailTab";
import TourDetailInfoTab from "@/components/custom/TourDetailInfoTab";
import { useGetTourDetailQuery } from "@/services/tour";
import type { TourResponse } from "@/types/tourTypes";
import { da } from "date-fns/locale";
import { useState } from "react";
import { useParams } from "react-router";
import { set } from "zod";

interface TourDetailHostProps {
}
export default function TourDetailHost({ }: TourDetailHostProps) {
    const { tourId } = useParams<{ tourId: string }>();

    const id = Number(tourId); // convert sang number

    const { data, isLoading, isError } = useGetTourDetailQuery(id);

    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            id: 0,
            title: "Thông tin chung",
            color: "border-red-500",
        },
        {
            id: 1,
            title: "Đơn tham gia",
            color: "border-green-500",
        },
        {
            id: 2,
            title: "Danh sách đội",
            color: "border-yellow-500",
        },
        {
            id: 3,
            title: "Danh sách trận đấu",
            color: "border-blue-500",
        }
    ]

    const chooseTab = (index: number) => {
        setActiveTab(index);
    }

    console.log(data);
    return (
        <div className="flex flex-col">
            <div className="flex space-x-2 items-end relative">
                {tabs.map((tab, index) => (
                    <div className={`border-2 ${tab.color} p-2 w-16 md:w-42 bg-neutral-200  text-neutral-400 flex justify-center items-center rounded-t-md border-b-0 cursor-pointer h-26 md:h-8 ${activeTab === index ? " border-b-white z-10 h-28 md:h-10 font-medium bg-white text-neutral-950" : ""}`} onClick={() => chooseTab(index)}>
                        <div key={tab.title} className="">
                            {tab.title}
                        </div>
                    </div>
                ))}
            </div>
            <div className="pt-5">
                {activeTab === 0 && <TourDetailInfoTab tour={data as TourResponse} />}
                {activeTab === 1 && <PlayerApproveTab tourId={id} />}
                {activeTab === 2 && <TeamDetailTab tourId={id} />}
                {activeTab === 3 && <div>Danh sách trận đấu</div>}
            </div>
        </div>
    )
}