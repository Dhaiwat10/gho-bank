'use client'

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
export const Navbar = () => {
  const router = useSearchParams();
  console.log(router.get('id'))
  const id = router.get('id');
  return (
    <nav className='flex gap-10 justify-between items-center h-16 max-w-[1400px] mx-auto'>
      <h1 className='text-2xl font-bold text-[#2563EB]'>GHO Bank</h1>
      <div className='flex justify-start items-center gap-5 text-sm text-[#171717]'>
        <Link className={cn('block p-3', id === "dashboard" && "bg-white rounded-full shadow-md")} href="/dashboard?id=dashboard">Dashboard</Link>
        <Link className={cn("block p-3", id === "gho-permits" && "bg-white rounded-full shadow-md")} href="/dashboard/gho-permits?id=gho-permits">GHO Permits</Link>
        <Link className={cn("block p-3", id === "send-assets" && "bg-white rounded-full shadow-md")} href="/dashboard/send-assets?id=send-assets" >Send Assets</Link>
      </div>
    </nav>

  )
}
