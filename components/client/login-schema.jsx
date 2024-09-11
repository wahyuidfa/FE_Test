"use client";
import React, { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useLoadingStore from "@/hooks/use-loding-store";
import useRouteLoading from "@/hooks/use-route-loading";
export const loginValidation = z.object({
    username: z.string().min(2, "Username min 2 Character"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginSchema() {
    const [loading, setLoading] = useState(false);
    const showLoading = useLoadingStore((state) => state.showLoading);
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(loginValidation),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const onSubmit = async data => {

        // console.log(JSON.stringify(data));
        // showLoading()
        setLoading(true);
        setTimeout(
            () =>
                axios
                    .post(
                        "http://localhost:3000/api/login",
                        {
                            username: data?.username,
                            password: data?.password,
                        },
                    )
                    .then(res => {
                        setLoading(false)
                        setTimeout(() => {
                            window.location.href = '/dashboard'
                        }, 500); // Jeda 
                        console.log(res);
                        // document.cookie = `myData=${hashData}; path=/;`;
                        toast({
                            title: 'Auth',
                            description: res?.data?.message
                        })
                    })
                    .catch(err => {
                        toast({
                            variant: 'destructive',
                            title: 'Auth',
                            description: err?.response?.data?.error
                        })
                        setLoading(false);
                    }),
            4000
        );
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='grid grid-cols-1 gap-4'>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete='false'
                                    className='p-7'
                                    disabled={loading}
                                    type='username'
                                    placeholder='Username'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-left' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    className='p-7'
                                    disabled={loading}
                                    type='password'
                                    placeholder='Password'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='text-left' />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end  gap-1 '>
                    <Button
                        disabled={loading}
                        className=' jus flex py-7  rounded-md  px-16 transform transition-transform duration-200 hover:scale-[1.01]  active:scale-95 '>
                        {loading ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait...{" "}
                            </>
                        ) : (
                            <>Login</>
                        )}{" "}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
