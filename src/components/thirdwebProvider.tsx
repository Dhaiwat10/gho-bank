'use client'

import type { PropsWithChildren } from 'react';
import { ThirdwebProvider, smartWallet, embeddedWallet } from '@thirdweb-dev/react';

const ThirdWebProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID} activeChain="goerli" supportedWallets={[
      smartWallet(
        embeddedWallet(),
        {
          factoryAddress: '0x4e1d6a36bbe946774a49a58304a1ba64d00f15a5',
          gasless: false
        }
      )
    ]}>
      {children}
    </ThirdwebProvider>
  )
}

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ThirdWebProvider>{children}</ThirdWebProvider>
  )
}
