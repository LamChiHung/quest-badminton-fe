import { useApprovePlayerMutation, useGetPlayersQuery } from "@/services/tour";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { GenderEnum, GenderEnumText, PlayerStatusEnum, PlayerStatusEnumText, PlayerTierEnum, PlayerTierEnumText } from "@/types/enums";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function PlayerApproveTab({ tourId }: { tourId: number }) {
    const { data, isLoading, isError } = useGetPlayersQuery({ "tourId.equals": tourId, "status.in": [`${PlayerStatusEnum.PENDING_APPROVE}`], size: 999 });

    const pendingPlayers = data?.content.map((p) => {
        return [
            {
                title: 'id', value: p.id
            },
            {
                title: 'Tên', value: p.name
            }, {
                title: 'Email', value: p.email
            }, {
                title: 'Câu lạc bộ', value: p.club
            }, {
                title: 'Trình độ', value: PlayerTierEnumText[p.tier as keyof typeof PlayerTierEnumText]
            }, {
                title: 'Giới tính', value: GenderEnumText[p.gender as keyof typeof GenderEnumText]
            }, {
                title: 'Trạng thái', value: PlayerStatusEnumText[p.status as keyof typeof PlayerStatusEnumText]
            }
        ]
    }) ?? [];

    const [approvePlayer, { isLoading: isApproveLoading, isSuccess, error, data: approveData }] = useApprovePlayerMutation()

    const handleApprove = (playerId: number) => {
        approvePlayer({
            tourId: tourId,
            playerId: playerId,
            isApprove: true
        })
            .unwrap()
            .then(res => {
                toast.success("Duyệt đơn tham gia thành công!")
            })
    }

    const handleReject = (playerId: number) => {
        approvePlayer({
            tourId: tourId,
            playerId: playerId,
            isApprove: false
        })
            .unwrap()
            .then(res => {
                toast.success("Từ chối đơn tham gia thành công!")
            })
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-2xl">Đơn đợi duyệt</div>
                <div className="w-full p-6 flex justify-center">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="lg:w-2xl xl:w-4xl w-72"
                    >
                        <CarouselContent>
                            {pendingPlayers?.map((p, index) => (
                                <div>
                                    <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                                        <div className="text-center">
                                            {index + 1} / {pendingPlayers.length}
                                        </div>
                                        <div className="p-1">
                                            <Card className="w-66 border-2 border-primary">
                                                <CardContent className="flex flex-col aspect-square text-sm space-y-2">
                                                    {p.filter((item) => item.title !== "id").map((item, index) => (
                                                        <div key={index} className="">
                                                            <div className="font-bold">{item.title}: </div>
                                                            <div>{item.value}</div>
                                                        </div>
                                                    ))}
                                                    <div className="flex justify-between mt-2">
                                                        <Button onClick={() => handleReject(p[0].value as number)} disabled={isApproveLoading} className={`bg-gray-500 cursor-pointer hover:opacity-80 hover:bg-gray-500`}>Từ Chối {isLoading && <Loader2 className="size-4 animate-spin" />}</Button>
                                                        <Button onClick={() => handleApprove(p[0].value as number)} disabled={isApproveLoading} className="bg-green-600 cursor-pointer hover:opacity-80 hover:bg-green-600">Chấp nhận {isLoading && <Loader2 className="size-4 animate-spin" />}</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                </div>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </div>
    )
}