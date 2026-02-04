import { GenderEnumText, PlayerTierEnumText } from "@/types/enums";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import type { TeamResponse, TourResponse } from "@/types/tourTypes";
import type { PageResponse } from "@/types/commonTypes";
import { useGetTourPlayersQuery, useGetTourTeamsQuery } from "@/services/tour";


interface Props {
    tour: TourResponse | undefined;
}
export default function TourPlayerTab({ tour }: Props) {
    const { data: players, isLoading: isLoadingPlayers, isError: isErrorPlayers } = useGetTourPlayersQuery(tour?.id!, { skip: !tour?.id, });
    const { data: teams, isLoading: isLoadingTeams, isError: isErrorTeams } = useGetTourTeamsQuery(tour?.id!, { skip: !tour?.id, });

    return (
        <div className="w-full flex flex-col items-center">
            <div className="my-5 text-3xl font-bold text-primary">
                Danh Sách Vận Động Viên
            </div>
            <div>
                <Table className="w-full text-center">
                    <TableHeader className="bg-neutral-300 border-2 border-neutral-300 text-center">
                        <TableRow >
                            <TableHead className="text-center">STT</TableHead>
                            <TableHead className="text-center">Tên</TableHead>
                            <TableHead className="text-center">Email</TableHead>
                            <TableHead className="text-center">Trình độ</TableHead>
                            <TableHead className="text-center">Giới tính đăng ký</TableHead>
                            <TableHead className="text-center">Đội</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="shadow-2xl border-2 border-neutral-200 text-center">
                        {players?.content.map((player, index) => (
                            <TableRow className="text-center" key={player.id}>
                                <TableCell>{player.id}</TableCell>
                                <TableCell>{player.name}</TableCell>
                                <TableCell>{player.email}</TableCell>
                                <TableCell>{PlayerTierEnumText[player.tier as keyof typeof PlayerTierEnumText]}</TableCell>
                                <TableCell>{GenderEnumText[player.gender as keyof typeof GenderEnumText]}</TableCell>
                                <TableCell>{player.teamId ? teams?.content.find((team) => team.id === player.teamId)?.name : '-'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}