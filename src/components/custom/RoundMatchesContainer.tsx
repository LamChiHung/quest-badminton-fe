import type { RoundResponse } from "@/types/tourTypes"
import CreateGroupMatchDialog from "./CreateGroupMatchDialog"
import { useGetGroupMatchesQuery } from "@/services/tour";
import CreateMatchDialog from "./CreateMatchDialog";

interface RoundMatchesContainerProps {
    tourId: number
    round?: RoundResponse
}
export default function RoundMatchesContainer({ tourId, round }: RoundMatchesContainerProps) {

    const { data: groupMatches, isLoading: isLoadingGroupMatches, isError: isErrorGroupMatches } = useGetGroupMatchesQuery({
        "tourId.equals": tourId,
        "roundId.equals": round?.id,
        size: 99999
    });


    return (
        <div className="w-full flex flex-col items-center p-2">
            <div className="text-3xl font-semibold">
                {round?.name}
            </div>
            <div className="flex justify-start w-full mb-5">
                <CreateGroupMatchDialog tourId={tourId} roundId={round?.id} />
            </div>
            {groupMatches?.content.map((gm) => (
                <div className="w-full flex flex-col items-center p-2 rounded-md my-2 bg-neutral-300" key={gm.id} >
                    <div className="font-semibold text-2xl text-secondary">
                        {gm.name}
                    </div>
                    <div className="flex justify-start w-full">
                        <CreateMatchDialog tourId={tourId} roundId={round?.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}