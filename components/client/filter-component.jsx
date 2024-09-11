"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SearchIcon } from "lucide-react";
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
import { Input } from "../ui/input";

const FormSchema = z.object({
    date: z.string().min(1, "data tidak valid"),
    search: z.string().max(100, 'kata kunci terlalu banyak')
});

export function FilterComponent() {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: { search: "", date: "" }
    });

    function onSubmit(data) {
        console.log(data);
        router.push(`?tanggal=${data.date}&search=${data.search}`);
    }

    function handleReset() {
        form.reset(); // Reset nilai form ke defaultValues
        router.push('/laporan-lalin-perhari'); // Kembalikan ke dashboard tanpa filter
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=' '>
                <div className="flex flex-wrap w-full items-center gap-2 my-2">
                    <FormField
                        control={form.control}
                        name='search'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex   items-center rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground '>
                                        <div className='flex items-center px-3 text-muted-foreground'>
                                            <SearchIcon className='w-4 h-4' />
                                        </div>
                                        <Input
                                            type='search'
                                            placeholder='Search'
                                            className='flex-1   text-foreground bg-transparent border-none focus:ring-0'
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className='text-left' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='date'
                        render={({ field }) => (
                            <FormItem className=''>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] py-5 justify-between text-right font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}>
                                            {field.value ? (
                                                field.value.toString()
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
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
                </div>

                <Button className='mr-1' type='submit'>Filter</Button>
                <Button onClick={handleReset} className='ml-1' variant='outline'>Reset</Button>
            </form>
        </Form>
    );
}
