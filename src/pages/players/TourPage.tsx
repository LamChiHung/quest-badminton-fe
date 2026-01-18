import PaginationSetState from "@/components/custom/PaginationSetState";
import SearchTourBarPlayer from "@/components/custom/SearchTourBarPlayer";
import TourCard from "@/components/custom/TourCard";
import { useGetPublicToursQuery } from "@/services/tour";
import type { PageResponse } from "@/types/commonTypes";
import type { SearchTourRequest, TourResponse } from "@/types/tourTypes";
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
                <div className="py-6">
                    <SearchTourBarPlayer searchTour={searchTour} setSearchTour={setSearchTour} />
                </div>
                <div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(385px,1fr))] gap-4 py-2 space-y-4 place-items-center">
                        {tours?.content?.map(tour => {
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