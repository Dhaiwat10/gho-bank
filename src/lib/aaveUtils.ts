import { ethers } from "ethers";
import {
	UiPoolDataProvider,
	UiIncentiveDataProvider,
	ChainId,
} from "@aave/contract-helpers";
import * as markets from "@bgd-labs/aave-address-book";
import { Address } from "viem";

const publicProvider = new ethers.providers.AlchemyProvider(
	{
		name: "alchemy provider",
		chainId: ChainId.sepolia,
	},
	process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
);

const poolDataProviderContract = new UiPoolDataProvider({
	uiPoolDataProviderAddress: markets.AaveV3Sepolia.UI_POOL_DATA_PROVIDER,
	provider: publicProvider,
	chainId: ChainId.sepolia,
});

const incentiveDataProviderContract = new UiIncentiveDataProvider({
	uiIncentiveDataProviderAddress:
		markets.AaveV3Ethereum.UI_INCENTIVE_DATA_PROVIDER,
	provider: publicProvider,
	chainId: ChainId.mainnet,
});

export const getReservesHumanized = async () => {
	const { baseCurrencyData, reservesData } =
		await poolDataProviderContract.getReservesHumanized({
			lendingPoolAddressProvider: markets.AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
		});
	return { baseCurrencyData, reservesData };
};

export const getUserReserves = async (account: Address) => {
	const { userEmodeCategoryId, userReserves } =
		await poolDataProviderContract.getUserReservesHumanized({
			lendingPoolAddressProvider: markets.AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
			user: account,
		});

	return { userEmodeCategoryId, userReserves };
};

export const getReservesIncentive = async () => {
	const reserveIncentives =
		await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
			lendingPoolAddressProvider: markets.AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
		});

	return { reserveIncentives };
};

export const getUserIncentives = async (account: Address) => {
	const userIncentives =
		await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized({
			lendingPoolAddressProvider: markets.AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
			user: account,
		});

	return { userIncentives };
};
