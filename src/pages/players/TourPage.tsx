import InfoCard from "@/components/custom/InforCard";
import PaginationSetState from "@/components/custom/PaginationSetState";
import TourCard from "@/components/custom/TourCard";
import { useGetPublicToursQuery } from "@/services/tour";
import type { PageResponse } from "@/types/commonTypes";
import { TourMatchTypeEnum, TourStatusEnum, TourTypeEnum } from "@/types/enums";
import type { SearchTourRequest, TourResponse } from "@/types/tourTypes";
import { formatDate } from "@/utils/StringUtil";
import { useEffect, useState } from "react";

export default function TourPage() {
    const [searchTour, setSearchTour] = useState<SearchTourRequest>({});
    const { data, isLoading, isError } = useGetPublicToursQuery(searchTour);
    const [tours, setTours] = useState<PageResponse<TourResponse>>({
        number: 0,
        totalPages: 0,
        content: [],
        totalElements: 0,
        size: 0
    });
    useEffect(() => {
        if (data) {
            setTours(data);
        }
    }, [data]);
    return (
        <div className="w-dvw flex justify-center">
            <div className="container flex flex-col">
                <div>
                    Search bar
                </div>
                <div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(385px,1fr))] gap-4 py-2 space-y-4 place-items-center">
                        {tours?.content?.map(tour => {

                            const statusKey = tour.status as keyof typeof TourStatusEnum;
                            const tourTypeKey = tour.type as keyof typeof TourTypeEnum;
                            const tourMatchTypeKey = tour.matchType as keyof typeof TourMatchTypeEnum;


                            const tourMap = new Map<string, string>()
                            tourMap.set("Mã code", tour.code)
                            tourMap.set("Trạng thái", TourStatusEnum[statusKey])
                            tourMap.set("Loại", TourTypeEnum[tourTypeKey])
                            tourMap.set("Loại trận", TourMatchTypeEnum[tourMatchTypeKey])
                            tourMap.set("Ngày kết thúc đăng ký", formatDate(tour.registrationEndDate))
                            tourMap.set("Ngày bắt đầu giải đấu", formatDate(tour.startDate))
                            console.log(tour.status);
                            console.log(TourStatusEnum.UPCOMING);

                            return <TourCard key={tour.id} tour={tour} className={`cursor-pointer hover:bg-neutral-100 col-span-1`} />
                        })}
                    </div>
                    <div>
                        {isLoading ? <></> : <PaginationSetState props={{ currentPage: tours.number, totalPage: tours.totalPages, data: searchTour, setData: setSearchTour }} />}
                    </div>
                </div>
            </div>
        </div>
    )
}