import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TypedDataDomain, createPublicClient, hashTypedData, http } from "viem";
import { sepolia } from "viem/chains";
import { permitToken } from "@/abi/bank";
import { BANK_ADDRESS } from "./constant";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";
import { Alchemy, Network } from "alchemy-sdk";
import { IPermitSignatureParams } from "@/types";

export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const publicClient = createPublicClient({
  transport: http(),
  chain: sepolia,
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
  network: Network.ETH_SEPOLIA
})

export const genPermitHash = async ({
  asset,
  amount,
  account,
  deadline,
  chainId,
}: IPermitSignatureParams) => {
  const nonces = await publicClient.readContract({
    address: asset,
    abi: permitToken,
    functionName: "nonces",
    args: [account],
  });

  const name = await publicClient.readContract({
    address: asset,
    abi: permitToken,
    functionName: "name",
  });

  const permitTypes = {
    Permit: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
      {
        name: "value",
        type: "uint256",
      },
      {
        name: "nonce",
        type: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
      },
    ],
  };

  const values = {
    owner: account,
    spender: BANK_ADDRESS,
    value: amount,
    nonce: nonces,
    deadline: deadline,
  };

  const domain = {
    name,
    chainId,
    verifyingContract: asset,
  } as TypedDataDomain;

  const typedHash = hashTypedData({
    domain,
    primaryType: "Permit",
    types: permitTypes,
    message: values,
  });

  return typedHash;
};
