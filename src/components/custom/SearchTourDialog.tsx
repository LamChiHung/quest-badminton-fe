import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { CalendarIcon, Eye, EyeOff, Loader2, LockIcon, MailIcon, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { toast } from "sonner"
import { TourMatchTypeEnum, TourStatusEnum, TourTypeEnum } from "@/types/enums"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { Switch } from "../ui/switch"
import { useCreateTourMutation } from "@/services/tour"
import type { SearchTourRequest } from "@/types/tourTypes"


const searchTourSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    code: z.string().optional(),
    type: z.string().optional(),
    matchType: z.string().optional(),
    fromStartDate: z.date().optional(),
    toStartDate: z.date().optional(),
    location: z.string().optional(),
    isPrivate: z.boolean(),
    status: z.string().optional()
});
export type SearchTourSchemaType = z.infer<typeof searchTourSchema>

type SearchTourProps = {
    setParams: React.Dispatch<
        React.SetStateAction<SearchTourRequest>
    >;
};

export default function SearchTourDialog({ setParams }: SearchTourProps) {
    const TYPE_ENTRIES = Object.entries(TourTypeEnum).map(
        ([key, value]) => ({
            key: key as keyof typeof TourTypeEnum,
            value,
        })
    )
    const MATCH_TYPE_ENTRIES = Object.entries(TourMatchTypeEnum).map(
        ([key, value]) => ({
            key: key as keyof typeof TourMatchTypeEnum,
            value,
        })
    );
    const TOUR_STATUS_ENTRIES = Object.entries(TourStatusEnum).map(
        ([key, value]) => ({
            key: key as keyof typeof TourStatusEnum,
            value,
        })
    );
    const today = new Date();

    const form = useForm<SearchTourSchemaType>({
        resolver: zodResolver(searchTourSchema),
        defaultValues: {
            name: "",
            code: "",
            type: undefined,
            matchType: undefined,
            fromStartDate: undefined,
            toStartDate: undefined,
            location: "",
            isPrivate: false,
            status: undefined
        }
    })

    const [open, setOpen] = useState(false);

    const onSubmit = async (values: SearchTourSchemaType) => {
        console.log(values);
        setParams({
            "name.contains": values.name?.trim() || undefined,
            "code.contains": values.code?.trim() || undefined,
            "type.equals": values.type?.trim() || undefined,
            "matchType.equals": values.matchType?.trim() || undefined,
            "fromStartDate.greaterThanOrEqual": values.fromStartDate?.toISOString() || undefined,
            "toStartDate.lessThanOrEqual": values.toStartDate?.toISOString() || undefined,
            "location.contains": values.location?.trim() || undefined,
            "isPrivate.equals": values.isPrivate,
            "status.equals": values.status?.trim() || undefined,
            "page": 0,
        })
        setOpen(false)
    }

    return (
        <div className="flex">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="secondary"><Search />Tìm giải đấu</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 flex flex-1 flex-col justify-center overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Tìm giải đấu</DialogTitle>
                                <DialogDescription>
                                    Điền thông tin giải đấu cần tìm.
                                </DialogDescription>
                            </DialogHeader>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Tên giải đấu"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    id="code"
                                                    type="text"
                                                    placeholder="Code giải đấu"
                                                    {...field}
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
                                    <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                            <FormControl>
                                                <div className="relative">
                                                    <SelectTrigger className="w-full">
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
                                    <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                            <FormControl>
                                                <div className="relative">
                                                    <SelectTrigger className="w-full">
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
                                    <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                            <FormControl>
                                                <div className="relative">
                                                    <SelectTrigger className="w-full">
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
                            <FormField
                                control={form.control as any}
                                name="fromStartDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PP")
                                                        ) : (
                                                            <span>Từ ngày bắt đầu giải đấu</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < today
                                                    }
                                                    captionLayout="dropdown"
                                                    startMonth={new Date(today.getFullYear(), today.getMonth())}
                                                    endMonth={new Date(today.getFullYear() + 10, 0)}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control as any}
                                name="toStartDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PP")
                                                        ) : (
                                                            <span>Đến ngày bắt đầu giải đấu</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < today
                                                    }
                                                    captionLayout="dropdown"
                                                    startMonth={new Date(today.getFullYear(), today.getMonth())}
                                                    endMonth={new Date(today.getFullYear() + 10, 0)}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    id="location"
                                                    type="text"
                                                    placeholder="Địa chỉ giải đấu"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isPrivate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border px-3 py-2 shadow-sm">
                                        <div className="space-y-0.5 pr-4">
                                            <FormDescription className="text-sm">
                                                Giải đấu Private
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button className="cursor-pointer mr-2" variant="outline" type="reset" onClick={() => form.reset()} >Đặt lại</Button>
                                <Button className="cursor-pointer" type="submit">Tìm kiếm</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}