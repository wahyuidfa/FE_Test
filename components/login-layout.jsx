import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

function LoginLayout({ children }) {
    return (
        <>
            {" "}
            <main className=' w-full h-screen p-4'>
                <Card className={cn('h-full bg-gradient-to-l w-full from-[#0d4ca1] via-card to-card')}>
                    <CardContent className='grid grid-cols-2 h-full '>
                        <div className='h-full flex flex-col justify-center '>

                            <div className='w-1/2 m-auto'><Image className="m-auto w-36" src={'/jasamarga-logo.png'} width={1000} height={100} alt="" />{children}</div>
                        </div>
                        <div className='h-full'>
                            <Image
                                src='/background.svg'
                                width={1000}
                                height={1000}
                                alt=''
                                className='object-cover h-full '
                            />
                        </div>
                    </CardContent>
                </Card>
            </main>
        </>
    );
}

export default LoginLayout;
