'use client'

import { publicClient, supabaseClient } from '@/lib/utils';
import { useWallet } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Database } from '@/types/database';
import { parseUnits } from 'viem';

export default function page() {

  const [loaded, setLoaded] = useState<boolean>(false);
  const [wallet, setWallet] = useState<string>("");
  const [transactions, setTransactions] = useState<Database["public"]["Tables"]["PendingTransactions"]["Row"][]>([])

  useWallet()?.getAddress().then((data) => setWallet(data))

  useEffect(() => {
    (async () => {
      const { data, error } = await supabaseClient.from("PendingTransactions").select("*").eq("account", wallet);
      if (!error) {
        setTransactions(data);
      }
    })()
    setLoaded(true);
  }, [wallet]);

  useEffect(() => {
    console.log("Transactions: ", transactions);
  }, [transactions]);

  if (!loaded) return;


  return (
    <div className='max-w-[1400px] mx-auto'>
      <Table>
        <TableBody>
          <TableRow className='font-bold text-gray-800'>
            <TableCell>Tx hash</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Invest</TableCell>
            <TableCell>Approve</TableCell>
          </TableRow>

          {transactions && transactions.map((trans) => {
            // const { } = publicClient
            return (<TableRow>
              <TableCell>{trans.transactionHash.slice(0, 4)}...{trans.transactionHash.slice(-4)}</TableCell>
              <TableCell>{parseUnits(trans.amount, 18).toString()}</TableCell>
              <TableCell>{(Number(trans.amount) * 75) / 100}</TableCell>
              <TableCell><Button>Approve</Button></TableCell>
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </div>
  )
}
