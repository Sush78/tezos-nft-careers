import { BeaconWallet } from "@taquito/beacon-wallet";

export const wallet = new BeaconWallet({
  name: "Tezos NFT CF",
  preferredNetwork: "ghostnet",
});

// TODO 2.b - Setup connectWallet function (on ghostnet)
export const connectWallet = async () => {
  await wallet.requestPermissions({ network: { type: "ghostnet" } });
};

// TODO 2.c - Setup getAccount function
export const getAccount = async () => {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    localStorage.setItem("activeAccount", activeAccount.address)
    return activeAccount.address;
  } else {
    return "";
  }
};