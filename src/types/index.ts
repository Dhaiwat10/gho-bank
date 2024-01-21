import { Address } from "viem";

export type IPermitSignatureParams = {
	asset: Address;
	amount: bigint;
	account: Address;
	deadline: bigint;
	chainId: number;
};
