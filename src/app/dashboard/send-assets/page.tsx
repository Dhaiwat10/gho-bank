'use client'

import { permitToken } from "@/abi/bank";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { alchemy, publicClient } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useWallet } from "@thirdweb-dev/react";
import { useState, useEffect } from 'react';

export default function Page() {
  const [wallet, setWallet] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");

  const [tokens, setTokens] = useState<{ name: string, tokenAddress: string, balance: string | null }[]>([]);
  useWallet()?.getAddress().then((data) => setWallet(data));


  const getTokenName = async (address: string) => {
    const data = await publicClient.readContract({
      address: address as `0x${string}`,
      abi: permitToken,
      functionName: "name"
    })
    return data;
  }

  useEffect(() => {
    (async () => {
      if (wallet.length === 0) return;
      const data = await alchemy.core.getTokenBalances(wallet);

      const tokenPromises = data.tokenBalances.map(async (tokenBalance) => {
        const name = await getTokenName(tokenBalance.contractAddress);
        return {
          name: name,
          tokenAddress: tokenBalance.contractAddress,
          balance: tokenBalance.tokenBalance
        }
      });

      const _tokens = await Promise.all(tokenPromises);
      setTokens(_tokens);
    })()
  }, [wallet])


  return (
    <section className="max-w-[1400px] mx-auto">
      <div className="bg-white rounded-md border mt-20 border-gray-300 p-2 w-2/6 mx-auto flex flex-col items-start justify-center gap-10">
        <p className="text-black font-medium">Send Assets</p>
        <form onSubmit={() => { }} className="space-y-5 w-full">
          <div>
            <Label htmlFor="address" className="text-sm text-gray-800">Recipient address</Label>
            <Input value={address} className="w-full" required onChange={(e) => setAddress(e.target.value)} placeholder="address" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="assets" className="text-sm text-gray-800">Select Assets</Label>
              <Select>
                <SelectTrigger className="w-max">
                  <SelectValue placeholder="tokens" />
                </SelectTrigger>
                <SelectContent>
                  {tokens?.map((token) => (
                    <SelectItem key={token.tokenAddress} value={token.tokenAddress}>{token.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input value={amount} onChange={(e) => setAmount((e.target.value))} />
          </div>
          <Button className="bg-[#2563EB] w-full">Send Asset</Button>
        </form>
      </div >
    </section >
  )
}
