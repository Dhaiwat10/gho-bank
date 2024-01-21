'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from 'react';

export default function Page() {
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  return (
    <section className="max-w-[1400px] mx-auto">
      <div>
        <p>Send Assets</p>
        <form>
          <Label htmlFor="address">Recipient address</Label>
          <Input value={address} required onChange={(e) => setAddress(e.target.value)} />

          <Label htmlFor="assets">Select Assets</Label>
          <Input value={amount} onChange={(e) => setAmount((e.target.value))} />
        </form>
      </div>
    </section>
  )
}
