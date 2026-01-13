import InfoCard from "@/components/custom/InforCard";
import PaginationSetState from "@/components/custom/PaginationSetState";
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
            <div className="container flex flex-col bg-amber-200">
                <div>
                    Search bar
                </div>
                <div>
                    <div className="flex py-2 md:space-x-4 space-y-4 flex-wrap md:justify-start justify-center">
                        {tours?.content?.map(tour => {

                            const statusKey = tour.status as keyof typeof TourStatusEnum;
                            const statusClassMap: Record<string, string> = {
                                UPCOMING: "border-yellow-300",
                                LIVE: "border-green-500",
                                END: "border-gray-400",
                                CANCEL: "border-red-500",
                            };
                            const tourTypeKey = tour.type as keyof typeof TourTypeEnum;
                            const tourMatchTypeKey = tour.matchType as keyof typeof TourMatchTypeEnum;


                            const tourMap = new Map<string, string>()
                            tourMap.set("Tên giải đấu", tour.name)
                            tourMap.set("Mã code", tour.code)
                            tourMap.set("Trạng thái", TourStatusEnum[statusKey])
                            tourMap.set("Loại", TourTypeEnum[tourTypeKey])
                            tourMap.set("Loại trận", TourMatchTypeEnum[tourMatchTypeKey])
                            tourMap.set("Ngày kết thúc đăng ký", formatDate(tour.registrationEndDate))
                            tourMap.set("Ngày bắt đầu giải đấu", formatDate(tour.startDate))
                            console.log(tour.status);
                            console.log(TourStatusEnum.UPCOMING);

                            return <InfoCard key={tour.id} haveDetail={true} info={tourMap} title={tour.name} className={`${statusClassMap[statusKey]} cursor-pointer hover:bg-neutral-100`} />
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