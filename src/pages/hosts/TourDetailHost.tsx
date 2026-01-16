import { useGetTourDetailQuery } from "@/services/tour";
import { useParams } from "react-router";

interface TourDetailHostProps {
}
export default function TourDetailHost({ }: TourDetailHostProps) {
    const { tourId } = useParams<{ tourId: string }>();

    const id = Number(tourId); // convert sang number

    const { data, isLoading, isError } = useGetTourDetailQuery(id);

    console.log(data);
    return (
        <div>TourDetailHost</div>
    )
}