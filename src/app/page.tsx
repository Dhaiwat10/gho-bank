'use client'

import Wallet from '@/components/Wallet';
import { Button } from '@/components/ui/button';
import { useWallet } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/utils';

export default function Home() {
  const wallet = useWallet();

  const [address, setAddress] = useState<string>("");

  const { toast } = useToast();

  const navigation = useRouter();

  useEffect(() => {
    (async () => {
      if (wallet) {
        const address = await wallet?.getAddress();

        const { data } = await supabaseClient.from("Accounts").select("*").eq("account", address);
        if (data?.length === 0) {
          await supabaseClient.from("Accounts").insert({ account: address });
          console.log("Address add to database");
        }
        setAddress(address)
      }
    })()
  }, [wallet])
  return (
    <main className='max-h-screen h-screen flex flex-col gap-5 justify-center items-center'>
      <Wallet />
      <div className='space-x-2'>{address && <Button onClick={() => {
        navigator.clipboard.writeText(address);
        toast({
          description: "Address copied to clipboard"
        })
      }}>Add funds</Button>}

        {address && <Button onClick={() => navigation.push('/dashboard?id=dashboard')}>Go to app</Button>}
      </div>

    </main>
  )
}
