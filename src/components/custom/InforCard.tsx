import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowRightIcon, StarIcon } from "lucide-react"



export default function InfoCard({ info, title, className, haveDetail = false }: { info: Map<string, string>, title: string, className?: string, haveDetail?: boolean }) {


    return (
        <Card className={`w-52 h-64 py-2 ${className}`}>
            <CardContent className="p-2">
                <CardTitle className="text-sm mb-1">{title}</CardTitle>
                {[...info?.entries()].map(i =>
                    <CardDescription key={i[0]} className="text-xs mb-1 line-clamp-2">
                        <span className="font-bold">{i[0]}</span>: {i[1]}
                    </CardDescription>)}
                {haveDetail &&
                    <CardFooter className="flex justify-end p-0">
                        <CardDescription className="text-xs mb-1 line-clamp-2 underline">
                            Bấm để xem chi tiết
                        </CardDescription>
                    </CardFooter>
                }
            </CardContent>
        </Card>
    )
}