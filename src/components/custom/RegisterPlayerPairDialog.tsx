import { useRegisterPlayerPairMutation } from "@/services/tour";
import { PlayerPairTypeEnum, PlayerPairTypeEnumText } from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/v3";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react";
import type { PlayerResponse } from "@/types/tourTypes";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

const registerPlayerPairSchema = z.object({
    player1Id: z.string().nonempty({ message: "Vui lòng chọn vận đông viên" }),
    player2Id: z.string().optional(),
    type: z.string().nonempty({ message: "Vui lòng chọn nội dung" })
});
export type RegisterPlayerPairSchemaType = z.infer<typeof registerPlayerPairSchema>
interface RegisterPlayerPairDialogProps {
    tourId: number,
    buttonClassName?: string
    players?: PlayerResponse[]
}

export default function RegisterPlayerPairDialog({ tourId, buttonClassName, players }: RegisterPlayerPairDialogProps) {
    const PAIRTYPE_ENTRIES = Object.entries(PlayerPairTypeEnumText).map(
        ([key, value]) => ({
            key: key as keyof typeof PlayerPairTypeEnumText,
            value,
        })
    );

    const form = useForm<RegisterPlayerPairSchemaType>({
        resolver: zodResolver(registerPlayerPairSchema),
        defaultValues: {
            player1Id: "",
            player2Id: "",
            type: ""
        }
    })

    const [open, setOpen] = useState(false);
    const [createPlayerPair, { isLoading, isSuccess, error, data }] = useRegisterPlayerPairMutation();
    const [type, setType] = useState("");

    const onSubmit = async (values: RegisterPlayerPairSchemaType) => {

        await createPlayerPair({
            tourId: tourId,
            player1Id: Number(values.player1Id),
            player2Id: Number(values.player2Id) || undefined,
            type: values.type
        }).unwrap()
            .then(res => {
                toast.success("Đăng ký cặp đấu thành công!")
                form.reset();
                setOpen(false)
            })
    }

    const clickDialog = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    }

    return (
        <div onClick={(e) => clickDialog(e)} className="flex">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" className={`cursor-pointer hover:opacity-80 ${buttonClassName}`}><Plus /> Thêm đội hình</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 flex flex-1 flex-col justify-center overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Đăng ký cặp đấu</DialogTitle>
                                <DialogDescription>
                                    Form đăng ký cặp đấu, hãy điền đầy đủ thông tin.
                                </DialogDescription>
                            </DialogHeader>
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={(value) => {
                                            field.onChange(value)
                                            setType(value)
                                            form.resetField("player1Id")
                                            form.resetField("player2Id")
                                        }}
                                            value={field.value ?? ""}>
                                            <FormControl>
                                                <div className="relative">
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Chọn nội dung" />
                                                    </SelectTrigger>
                                                </div>
                                            </FormControl>
                                            <SelectContent>
                                                {PAIRTYPE_ENTRIES.map((t) => (
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
                                name="player1Id"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        className={cn(
                                                            "w-full justify-between",
                                                            !field.value && "text-muted-foreground",
                                                        )}
                                                        role="combobox"
                                                        variant="outline"
                                                    >
                                                        {field.value
                                                            ? players?.find(player => String(player.id) === field.value)?.name
                                                            : "Vận động viên 1"}
                                                        <ChevronsUpDown className="opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput className="h-9" placeholder="Tìm vận động viên..." />
                                                    <CommandList>
                                                        <CommandEmpty>Không tìm thấy vận động viên.</CommandEmpty>
                                                        <CommandGroup>
                                                            {players?.map(player => (
                                                                <CommandItem
                                                                    key={player.id}
                                                                    onSelect={() => {
                                                                        field.onChange(String(player.id))
                                                                    }}
                                                                    value={player.name}
                                                                >
                                                                    {player.name}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            player.id === field.value ? "opacity-100" : "opacity-0",
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {[PlayerPairTypeEnum.DOUBLE_FEMALE, PlayerPairTypeEnum.DOUBLE_MALE, PlayerPairTypeEnum.MIX].includes(type as keyof typeof PlayerPairTypeEnum) &&
                                <FormField
                                    control={form.control as any}
                                    name="player2Id"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            className={cn(
                                                                "w-full justify-between",
                                                                !field.value && "text-muted-foreground",
                                                            )}
                                                            role="combobox"
                                                            variant="outline"
                                                        >
                                                            {field.value
                                                                ? players?.find(player => String(player.id) === field.value)?.name
                                                                : "Vận động viên 2"}
                                                            <ChevronsUpDown className="opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput className="h-9" placeholder="Tìm vận động viên..." />
                                                        <CommandList>
                                                            <CommandEmpty>Không tìm thấy vận động viên.</CommandEmpty>
                                                            <CommandGroup>
                                                                {players?.map(player => (
                                                                    <CommandItem
                                                                        key={player.id}
                                                                        onSelect={() => {
                                                                            field.onChange(String(player.id))
                                                                        }}
                                                                        value={player.name}
                                                                    >
                                                                        {player.name}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                player.id === field.value ? "opacity-100" : "opacity-0",
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            }
                            <DialogFooter>
                                <Button className="cursor-pointer" type="submit">Đăng ký {isLoading && <Loader2 className="size-4 animate-spin" />}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}