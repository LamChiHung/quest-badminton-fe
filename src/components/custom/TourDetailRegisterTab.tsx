import { formatDate } from "@/utils/StringUtil";
import { Button } from "../ui/button";
import Countdown from "./CountDown";
import RegisterPlayerDialog from "./RegisterPlayerDialog";
import { Notebook, User } from "lucide-react";
import type { TourResponse } from "@/types/tourTypes";
import { TourMatchTypeEnumText, TourRoleEnum, TourStatusEnumText, TourTypeEnumText } from "@/types/enums";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

interface TourDetailRegisterTabProps {
    data: TourResponse | undefined
    tourRole: string | undefined
}
export default function TourDetailRegisterTab({ data, tourRole }: TourDetailRegisterTabProps) {
    const infos = [
        {
            title: "Tên giải đấu",
            value: data?.name
        },
        {
            title: "Mã giải đấu",
            value: data?.code
        },
        {
            title: "Loại giải đấu",
            value: TourTypeEnumText[data?.type as keyof typeof TourTypeEnumText]
        },
        {
            title: "Loại trận đấu",
            value: TourMatchTypeEnumText[data?.matchType as keyof typeof TourMatchTypeEnumText]
        },
        {
            title: "Trạng thái",
            value: TourStatusEnumText[data?.status as keyof typeof TourStatusEnumText]
        },
        {
            title: "Ngày bắt đầu giải đấu",
            value: formatDate(data?.startDate)
        },
        {
            title: "Địa điểm",
            value: data?.location,
            url: data?.locationUrl
        },
        {
            title: "Nội quy giải đấu",
            value: 'Bấm vào để xem nội quy',
            url: data?.ruleUrl
        }
    ]

    const unregisterText: Record<string, string> = {
        PLAYER: 'Đã đăng ký',
        CAPTAIN: 'Đã đăng ký',
        REFEREE: 'Không thể đăng ký',
        GUEST: 'Không thể đăng ký'
    };
    return (
        <div>
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
                        <RegisterPlayerDialog id={data.id} buttonClassName="text-xl w-60 bg-linear-to-br from-green-500 to-green-700 shadow-2xl drop-shadow-md transition-all duration-150 hover:bg-green-700 hover:opacity-80" /> :
                        <Button className="text-xl w-60" disabled={true} variant={"secondary"}>{unregisterText[tourRole as keyof typeof unregisterText]}</Button>
                    }
                </div>
            </div>
            <div className="mt-5">
                <div className="flex text-2xl items-center font-semibold"><Notebook /><span>Thông tin giải đấu</span></div>
                <div className="w-full flex flex-col items-center border-dashed border-2 border-blue-300">
                    <img className="w-fit h-full object-cover rounded-md" src={data?.avatarUrl ? data.avatarUrl : `/images/quest-logo.jpg`} alt="banner-img" />
                    <Table>
                        <TableBody>
                            {infos.map((info, index) => (
                                <TableRow className="text-center md:text-lg" key={info.title}>
                                    <TableCell className="font-semibold">{info.title}</TableCell>
                                    <TableCell>{info.url ? <a href={info.url} target="_blank" className="underline underline-offset-2 text-blue-500">{info.value}</a> : info.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </div>
        </div>
    );
}