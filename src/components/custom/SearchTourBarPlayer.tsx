import type { SearchTourRequest } from "@/types/tourTypes";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import z from "zod/v3";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { TourMatchTypeEnumText, TourStatusEnumText, TourTypeEnumText } from "@/types/enums";
import { Button } from "../ui/button";

const searchTourSchema = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    matchType: z.string().optional(),
    status: z.string().optional()
});
export type SearchTourSchemaType = z.infer<typeof searchTourSchema>
interface SearchTourBarPlayerProps {
    searchTour: SearchTourRequest,
    setSearchTour: React.Dispatch<React.SetStateAction<SearchTourRequest>>
}
export default function SearchTourBarPlayer({ searchTour, setSearchTour }: SearchTourBarPlayerProps) {
    const TYPE_ENTRIES = Object.entries(TourTypeEnumText).map(
        ([key, value]) => ({
            key: key as keyof typeof TourTypeEnumText,
            value,
        })
    )
    const MATCH_TYPE_ENTRIES = Object.entries(TourMatchTypeEnumText).map(
        ([key, value]) => ({
            key: key as keyof typeof TourMatchTypeEnumText,
            value,
        })
    );
    const TOUR_STATUS_ENTRIES = Object.entries(TourStatusEnumText).map(
        ([key, value]) => ({
            key: key as keyof typeof TourStatusEnumText,
            value,
        })
    );

    const form = useForm<SearchTourSchemaType>({
        resolver: zodResolver(searchTourSchema),
        defaultValues: {
            name: "",
            type: undefined,
            matchType: undefined,
            status: undefined
        }
    })

    const onSubmit = async (values: SearchTourSchemaType) => {
        console.log(values);
        setSearchTour({
            "name.contains": values.name?.trim() || undefined,
            "type.equals": values.type?.trim() || undefined,
            "matchType.equals": values.matchType?.trim() || undefined,
            "status.equals": values.status?.trim() || undefined,
            "page": 0,
        })
    }
    return (
        <div className="w-full p-4 rounded-2xl bg-neutral-100">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-4 flex flex-col md:flex-row flex-1 justify-between">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-2">
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Tên giải đấu"
                                            {...field}
                                            className="bg-white"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                    <FormControl>
                                        <div className="relative">
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Chọn loại giải đấu" />
                                            </SelectTrigger>
                                        </div>
                                    </FormControl>
                                    <SelectContent>
                                        {TYPE_ENTRIES.map((t) => (
                                            <SelectItem key={t.key} value={t.key}>
                                                {t.value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="matchType"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                    <FormControl>
                                        <div className="relative">
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Chọn loại trận đấu" />
                                            </SelectTrigger>
                                        </div>
                                    </FormControl>
                                    <SelectContent>
                                        {MATCH_TYPE_ENTRIES.map((t) => (
                                            <SelectItem key={t.key} value={t.key}>
                                                {t.value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                    <FormControl>
                                        <div className="relative">
                                            <SelectTrigger className="w-full bg-white">
                                                <SelectValue placeholder="Chọn trạng thái giải đấu" />
                                            </SelectTrigger>
                                        </div>
                                    </FormControl>
                                    <SelectContent>
                                        {TOUR_STATUS_ENTRIES.map((t) => (
                                            <SelectItem key={t.key} value={t.key}>
                                                {t.value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-x-2">
                        <Button className="cursor-pointer" type="submit">Tìm kiếm</Button>
                        <Button className="cursor-pointer mr-2" variant="outline" type="reset" onClick={() => {
                            form.reset();
                            setSearchTour({})
                        }}
                        >
                            Đặt lại
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}