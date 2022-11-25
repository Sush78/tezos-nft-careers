import { tezos } from "./tezos";
import { careerFairContractAddress } from '../constants/constans'

export const mintNFT = async ({ amount, metadata }) => {
    try {
        const contractInstance = await tezos.wallet.at(careerFairContractAddress);
        let bytes = "";
        for (var i = 0; i < metadata.length; i++) {
            bytes += metadata.charCodeAt(i).toString(16).slice(-4);
        }
        const op = await contractInstance.methods.mint(amount, bytes).send();
        await op.confirmation();
    } catch (err) {
      throw err;
    }
};

export const collectNFT = async ({ amount, id }) => {
    try {
        const contractInstance = await tezos.wallet.at(careerFairContractAddress);
        const op = await contractInstance.methods.collect(id).send({ mutez: true, amount: amount });
		await op.confirmation();
    } catch (err) {
      throw err;
    }
};