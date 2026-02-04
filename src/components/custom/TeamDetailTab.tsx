import { useGetPlayerPairsQuery, useGetPlayersQuery, useGetTeamsQuery } from "@/services/tour";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import type { TeamResponse } from "@/types/tourTypes";
import { GenderEnumText, PlayerPairTypeEnumText, PlayerStatusEnum, PlayerTierEnumText } from "@/types/enums";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Check, ChevronDown } from "lucide-react";
import CreateTeamDialog from "./CreateTeamDialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import React from "react";
import AddPlayerDialog from "./AddPlayerDialog";

interface TeamDetailHostProps {
    tourId: number
}
export default function TeamDetailTab({ tourId }: TeamDetailHostProps) {

    const { data: teamsData, isLoading: isTeamsLoading, isError: isTeamsError } = useGetTeamsQuery({ "tourId.equals": tourId });
    const { data: playersData, isLoading: isPlayersLoading, isError: isPlayersError } = useGetPlayersQuery({
        "tourId.equals": tourId,
        "status.in": [PlayerStatusEnum.APPROVED]
    });
    const { data: pairsData, isLoading: isPairsLoading, isError: isPairsError } = useGetPlayerPairsQuery({
        "tourId.equals": tourId,
        size: 999999
    });
    const [openItems, setOpenItems] = React.useState<number[]>([])
    const [openPairItems, setOpenPairItems] = React.useState<string[]>([])


    const toggleItem = (index: number) => {
        setOpenItems(prev =>
            prev.includes(index) ? prev.filter(item => item !== index) : [...prev, index],
        )
    }

    const togglePairItem = (index: number) => {
        const key = `pair-${index}`
        setOpenPairItems(prev =>
            prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key],
        )
    }

    return (
        <div className="flex flex-col w-full items-center">
            <div className="border-b pb-2 pt-2 flex items-center space-x-2 w-full m-2">
                <CreateTeamDialog tourId={tourId} />
            </div>
            <p className="text-2xl font-bold">
                Danh Sách Đội
            </p>
            <div className="flex flex-col w-full">
                <div >
                    {teamsData?.content.map((team: TeamResponse) => (
                        <div className="flex flex-col items-center border-2 border-secondary mt-5 rounded-2xl p-4 w-full relative">
                            <div className="absolute top-2 right-2">
                                <AddPlayerDialog teamId={team.id} players={playersData?.content} captainId={team.captain?.id} />
                            </div>
                            <div className="text-xl  font-semibold">
                                <span>STT: {team.number}</span>
                                <span> - </span>
                                <span>{team.name}</span>
                            </div>
                            <div className="w-full">
                                <Collapsible className="border rounded-lg mt-2 w-full relative"
                                    key={team.id}
                                    onOpenChange={() => toggleItem(team.id)}
                                    open={openItems.includes(team.id)}
                                >
                                    <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50">
                                        <span className="font-medium">Danh sách vận động viên</span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ${openItems.includes(team.id) ? "transform rotate-180" : ""
                                                }`}
                                        />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="border-t w-[80vw] md:w-full">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Tên</TableHead>
                                                    <TableHead>Email</TableHead>
                                                    <TableHead>Trình độ</TableHead>
                                                    <TableHead>Giới tính đăng ký</TableHead>
                                                    <TableHead>Đội trưởng</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    playersData?.content.filter((player) => player.teamId === team.id).map((player) => (
                                                        <TableRow key={player.id}>
                                                            <TableCell>{player.name}</TableCell>
                                                            <TableCell>{player.email}</TableCell>
                                                            <TableCell>{PlayerTierEnumText[player.tier as keyof typeof PlayerTierEnumText]}</TableCell>
                                                            <TableCell>{GenderEnumText[player.gender as keyof typeof GenderEnumText]}</TableCell>
                                                            <TableCell className="text-green-500">{team?.captain?.id === player.id && <Check />}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </CollapsibleContent>
                                </Collapsible>
                                <Collapsible className="border rounded-lg mt-2"
                                    key={`pair-${team.id}`}
                                    onOpenChange={() => togglePairItem(team.id)}
                                    open={openPairItems.includes(`pair-${team.id}`)}
                                >
                                    <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50">
                                        <span className="font-medium">Danh sách đội hình</span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ${openPairItems.includes(`pair-${team.id}`) ? "transform rotate-180" : ""
                                                }`}
                                        />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="border-t w-[80vw] md:w-full">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>STT</TableHead>
                                                    <TableHead>Vận động viên</TableHead>
                                                    <TableHead>Nội dung</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    pairsData?.content.filter((pair) => pair.teamId === team.id).map((pair) => (
                                                        <TableRow key={pair.id}>
                                                            <TableCell>{pair.id}</TableCell>
                                                            <TableCell><span>{pair.player1?.name}</span> {pair.player2 && <><br /> <span>{pair.player2?.name}</span></>}</TableCell>
                                                            <TableCell>{PlayerPairTypeEnumText[pair.type as keyof typeof PlayerPairTypeEnumText]}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div >
    )
}