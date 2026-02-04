import RegisterPlayerPairTab from "@/components/custom/RegisterPlayerPairTab";
import TourDetailRegisterTab from "@/components/custom/TourDetailRegisterTab";
import TourPlayerTab from "@/components/custom/TourPlayersTab";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetPlayersQuery, useGetTeamsQuery, useGetTourDetailPublicQuery, useGetTourPlayersQuery, useGetTourRoleQuery, useGetTourTeamsQuery } from "@/services/tour";
import { GenderEnumText, PlayerTierEnumText, TourRoleEnum } from "@/types/enums";
import { useState } from "react";
import { useParams } from "react-router";

export default function TourDetailPage() {
    const { tourCode } = useParams();
    const { data, isLoading, isError } = useGetTourDetailPublicQuery(tourCode || '');
    const { data: tourRole, isLoading: isLoadingTourRole, isError: isErrorTourRole } = useGetTourRoleQuery(data?.id!, { skip: !data?.id, });


    const [active, setActive] = useState(1);

    const menu = [
        {
            id: 1,
            title: "Đăng ký thi đấu",
        },
        {
            id: 2,
            title: "Đội hình",
        },
        {
            id: 3,
            title: "Danh sách vận động viên",
        },
        {
            id: 4,
            title: "Danh sách trận đấu",
        },
        {
            id: 5,
            title: "Dữ liệu giải đấu",
        },
    ]

    const handleClickMenu = (id: number) => {
        setActive(id);
    }

    return (
        <div className="w-full">
            <div className="w-full bg-black flex justify-center">
                <div className="container flex flex-col">
                    <div className="headbar w-full h-16 flex items-center  text-neutral-400 space-x-1">
                        <ScrollArea className="w-full">
                            <div className="flex space-x-4 p-4">
                                {menu.map((item, index) => (
                                    item.id === 2 && (tourRole?.role !== TourRoleEnum.CAPTAIN && tourRole?.role !== TourRoleEnum.PLAYER) ? null :
                                        <div key={item.id} onClick={() => handleClickMenu(item.id)}
                                            className={`${active === item.id && "border-b-2 border-white text-white font-medium"} pb-2 w-fit text-center whitespace-nowrap cursor-pointer hover:opacity-80`}
                                        >
                                            {item.title}
                                        </div>
                                ))}
                            </div>
                            <ScrollBar className="" orientation="horizontal" color="neutral-400" />
                        </ScrollArea>
                    </div>

                </div>
            </div>
            <div className="flex justify-center">
                <div className="container w-full ">
                    {active === 1 &&
                        <TourDetailRegisterTab data={data} tourRole={tourRole?.role} />
                    }
                    {active === 2 &&
                        <RegisterPlayerPairTab tour={data} />
                    }
                    {active === 3 &&
                        <TourPlayerTab tour={data} />
                    }
                </div>
            </div>
        </div >
    )
}