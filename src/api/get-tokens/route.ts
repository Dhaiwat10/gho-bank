import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
  apiKey: "",
  Network: Network.ETH_GOERLI
}

const alchemy = new Alchemy(settings);

export async function POST(req: Request) {
  const { address } = await req.json();
}
