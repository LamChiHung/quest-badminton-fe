import CreateTourDialog from "@/components/custom/CreateTourDialog";
import DashboardCard from "@/components/custom/DashboardCard";
import InfoCard from "@/components/custom/InforCard";
import PaginationSetState from "@/components/custom/PaginationSetState";
import SearchTourDialog from "@/components/custom/SearchTourDialog";
import TourCard from "@/components/custom/TourCard";
import { Button } from "@/components/ui/button";
import { useGetToursQuery } from "@/services/tour";
import type { PageResponse } from "@/types/commonTypes";
import { TourMatchTypeEnum, TourStatusEnum, TourTypeEnum } from "@/types/enums";
import type { SearchTourRequest, TourResponse } from "@/types/tourTypes";
import { formatDate } from "@/utils/StringUtil";
import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function TourManagement() {

    const [searchTour, setSearchTour] = useState<SearchTourRequest>({});
    const [tours, setTours] = useState<PageResponse<TourResponse>>({
        number: 0,
        totalPages: 0,
        content: [],
        totalElements: 0,
        size: 0
    });
    const { data, isLoading, isError } = useGetToursQuery(searchTour);
    const STATUS_ENTRIES = Object.entries(TourStatusEnum).map(
        ([key, value]) => ({
            key: key as keyof typeof TourStatusEnum,
            value,
        })
    );
    const navigator = useNavigate();
    useEffect(() => {
        if (data) {
            setTours(data);
        }
    }, [data]);

    return (
        <div className="flex flex-col">
            <div className="flex flex-wrap w-full md:space-x-4 space-y-4 border-b pb-2 md:justify-start justify-center">
                <DashboardCard header="Tổng giải đấu" content="100" subContent="Giải" />
                <DashboardCard header="Giải đấu đang diễn ra" content="2" subContent="Giải" />
                <DashboardCard header="Giải đấu sắp tới" content="50" subContent="Giải" />
            </div>
            <div className="border-b pb-2 pt-2 flex items-center space-x-2">
                <CreateTourDialog />
                <SearchTourDialog setParams={setSearchTour} />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(385px,1fr))] gap-4 py-2 space-y-4 place-items-center">
                {tours?.content?.map(tour => {
                    return <TourCard key={tour.id} tour={tour} isAdmin={true} className={`cursor-pointer hover:bg-neutral-100 col-span-1`} />
                })}
            </div>
            <div>
                {isLoading ? <></> : <PaginationSetState props={{ currentPage: tours?.number, totalPage: tours?.totalPages, data: searchTour, setData: setSearchTour }} />}
            </div>
        </div>
    )
}