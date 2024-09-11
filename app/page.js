import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='flex min-h-screen bg-gradient-to-r from-[#0d4ca1] to-card via-[#fbcf16]   flex-col items-center justify-center p-24'>
      <Card className='animate-bounceIn shadow-md '>
        <CardContent>
          <Image src='/jasamarga-logo.png' width={300} height={10} alt='' />
          <div className='w-full flex flex-col gap-2'>
            <p className='text-center'>Please Login to acces this site..</p>
            <Link href='/dashboard'>
              <Button variant='link' className='w-full font-bold'>
                Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
