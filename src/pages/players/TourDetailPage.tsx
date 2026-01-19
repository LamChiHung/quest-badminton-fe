import Countdown from "@/components/custom/CountDown";
import RegisterPlayerDialog from "@/components/custom/RegisterPlayerDialog";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetTourDetailPublicQuery } from "@/services/tour";
import { formatDate } from "@/utils/StringUtil";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function TourDetailPage() {
    const { tourCode } = useParams();
    const { data, isLoading, isError } = useGetTourDetailPublicQuery(tourCode || '');
    const [active, setActive] = useState(1);

    const menu = [
        {
            id: 1,
            title: "Đăng ký thi đấu",
        },
        {
            id: 2,
            title: "Xếp đội hình",
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
                        <div className="mt-5 bg-linear-to-br from-secondary to-primary w-full h-fit flex flex-col items-center justify-between p-10 space-y-5">
                            <div className="md:text-xl font-medium text-white flex flex-col md:flex-row space-x-2 justify-center items-center">
                                <span>Giải cho phép đăng ký đến hết ngày </span><span className="text-yellow-200">{formatDate(data?.registrationEndDate)}</span>
                            </div>
                            <div className="md:space-x-4 font-normal text-white flex flex-col md:flex-row justify-center items-center">
                                <span className="flex justify-center items-center">
                                    <span>Vận động viên Nam:</span> <span className="text-blue-400 ml-1">{data?.malePlayerRegistered}/{data?.malePlayers}</span> <User className="text-blue-400" size={20} />
                                </span>
                                <span className="h-5 border-2 border-white hidden md:block"></span>
                                <span className="flex justify-center items-center">
                                    <span>Vận động viên Nữ: </span> <span className="text-pink-300 ml-1">{data?.femalePlayerRegistered}/{data?.femalePlayers}</span> <User className="text-pink-300" size={20} />
                                </span>
                            </div>
                            <div>
                                <Countdown date={data?.registrationEndDate ? new Date(data.registrationEndDate) : new Date()} />
                            </div>
                            <div>
                                {data?.isAvailableToRegister ?
                                    <RegisterPlayerDialog id={data.id} buttonClassName="text-xl w-60 bg-green-700 shadow-2xl drop-shadow-md transition-all duration-150 hover:bg-green-700 hover:opacity-80" /> :
                                    <Button className="text-xl w-60" disabled={true} variant={"secondary"}>Không thể đăng ký</Button>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}