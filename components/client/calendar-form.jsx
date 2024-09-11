"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    date: z.string().min(1, 'data tidak valid')
});

export function CalendarForm() {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data) {
        console.log(data);
        router.push(`dashboard?tanggal=${data.date}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=' flex gap-4 items-center'>
                <FormField
                    control={form.control}
                    name='date'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-between text-right font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}>
                                        {field.value ? field.value.toString() : <span>Pick a date</span>}
                                        <CalendarIcon className='mr-2 h-4 w-4' />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align='start' className=' w-auto p-0'>
                                    <Calendar
                                        mode='single'
                                        captionLayout='dropdown-buttons'
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        fromYear={1960}
                                        toYear={2030}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Filter</Button>
            </form>
        </Form>
    );
}
