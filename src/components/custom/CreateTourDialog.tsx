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
import { CalendarIcon, Eye, EyeOff, Loader2, LockIcon, MailIcon, Plus, PlusIcon } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router"
import { useConfirmRegisterMutation, useLoginMutation } from "@/services/auth"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { toast } from "sonner"
import { TourMatchTypeEnum, TourTypeEnum } from "@/types/enums"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { Switch } from "../ui/switch"
import { useCreateTourMutation, useGetToursQuery } from "@/services/tour"


const createTourSchema = z.object({
    name: z.string().nonempty({ message: "Vui lòng nhập tên giải đấu" }),
    type: z.string().nonempty({ message: "Vui lòng chọn loại giải đấu" }),
    matchType: z.string().nonempty({ message: "Vui lòng chọn loại trận đấu" }),
    malePlayers: z.string().nonempty({ message: "Vui lòng nhập số lượng vận động viên" }).regex(/^[0-9]+$/, "Chỉ được nhập số nguyên"),
    femalePlayers: z.string().nonempty({ message: "Vui lòng nhập số lượng vận động viên" }).regex(/^[0-9]+$/, "Chỉ được nhập số nguyên"),
    registrationEndDate: z.date().min(new Date(), "Ngày kết thúc đăng ký không hợp lệ").nonoptional({ message: "Vui lòng chọn ngày kết thúc đăng ký" }),
    startDate: z.date().min(new Date(), "Ngày bắt đầu giải không hợp lệ").nonoptional({ message: "Vui lòng chọn ngày bắt đầu giải đấu" }),
    location: z.string().nonempty({ message: "Vui lòng điền địa chỉ giải đấu" }),
    locationUrl: z.url({ message: "Link không hợp lệ" }).nonempty({ message: "Vui lòng điền url google map địa chỉ giải đấu" }),
    ruleUrl: z.url({ message: "Link không hợp lệ" }).nonempty({ message: "Vui lòng điền url nội quy giải đấu" }),
    isPrivate: z.boolean({ message: "Vui lòng chọn có private giải đấu" }),
});
export type CreateTourSchemaType = z.infer<typeof createTourSchema>


export default function CreateTourDialog() {
    const TYPE_ENTRIES = Object.entries(TourTypeEnum).map(
        ([key, value]) => ({
            key: key as keyof typeof TourTypeEnum,
            value,
        })
    );
    const MATCH_TYPE_ENTRIES = Object.entries(TourMatchTypeEnum).map(
        ([key, value]) => ({
            key: key as keyof typeof TourMatchTypeEnum,
            value,
        })
    );
    const today = new Date();

    const form = useForm<CreateTourSchemaType>({
        resolver: zodResolver(createTourSchema),
        defaultValues: {
            name: "",
            type: "",
            matchType: undefined,
            malePlayers: "",
            femalePlayers: "",
            registrationEndDate: undefined,
            startDate: undefined,
            location: "",
            locationUrl: "",
            ruleUrl: "",
            isPrivate: false
        }
    })

    const [open, setOpen] = useState(false);
    const [createTour, { isLoading, isSuccess, error, data }] = useCreateTourMutation()

    const onSubmit = async (values: CreateTourSchemaType) => {
        await createTour({
            name: values.name,
            type: values.type,
            matchType: values.matchType,
            malePlayers: Number(values.malePlayers),
            femalePlayers: Number(values.malePlayers),
            registrationEndDate: values.registrationEndDate,
            startDate: values.startDate,
            location: values.location,
            locationUrl: values.locationUrl,
            ruleUrl: values.ruleUrl,
            isPrivate: values.isPrivate
        }).unwrap()
            .then(res => {
                toast.success("Tạo giải đấu thành công!")
                form.reset();
                setOpen(false)
            })
    }


    return (
        <div className="flex">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default"> <Plus />Thêm giải đấu</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 flex flex-1 flex-col justify-center overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Thêm giải đấu</DialogTitle>
                                <DialogDescription>
                                    Form tạo giải đấu, hãy điền đầy đủ thông tin.
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
                                name="malePlayers"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    id="malePlayers"
                                                    type="text"
                                                    placeholder="Số lượng vận động viên nam"
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
                                name="femalePlayers"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    id="femalePlayers"
                                                    type="text"
                                                    placeholder="Số lượng vận động viên nữ"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control as any}
                                name="registrationEndDate"
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
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Ngày kết thúc đăng ký</span>
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
                                name="startDate"
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
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Ngày bắt đầu giải đấu</span>
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
                                name="locationUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    id="locationUrl"
                                                    type="text"
                                                    placeholder="Link google map địa chỉ giải đấu"
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
                                name="ruleUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    id="ruleUrl"
                                                    type="text"
                                                    placeholder="Link nội quy giải đấu"
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
                                                Private giải đấu
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
                                <Button className="cursor-pointer mr-2" variant="outline" type="reset" onClick={() => form.reset({
                                    name: "",
                                    type: "",
                                    matchType: "",
                                    malePlayers: "",
                                    femalePlayers: "",
                                    registrationEndDate: undefined,
                                    startDate: undefined,
                                    location: "",
                                    locationUrl: "",
                                    ruleUrl: "",
                                    isPrivate: false,
                                })} >Đặt lại</Button>
                                <Button className="cursor-pointer" type="submit">Lưu thay đổi {isLoading && <Loader2 className="size-4 animate-spin" />}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}