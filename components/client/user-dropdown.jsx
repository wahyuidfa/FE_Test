"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";

export function UserDropdown() {
    const router = useRouter()
    const logout = () => {
        axios
            .get("/api/logout")
            .then(res => {
                console.log(res);
                setTimeout(() => {
                    router.push('/login')
                }, 500); // Jeda 
            })
            .catch(err => {
                router.refresh()
                console.log(err);
            });
    };
    return (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="#" alt="Avatar" />
                                    <AvatarFallback className="bg-transparent">JD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Profile</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href="/account" className="flex items-center">
                            <User className="w-4 h-4 mr-3 text-muted-foreground" />
                            Account
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:cursor-pointer" onClick={() => logout()}>
                    <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}