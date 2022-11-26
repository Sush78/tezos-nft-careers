import { tezos } from "./tezos";
import { careerFairContractAddress } from "../constants/constans";
import { getAccount } from "./wallet";

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
    const op = await contractInstance.methods
      .collect(id)
      .send({ mutez: true, amount: amount});
    await op.confirmation();
  } catch (err) {
    throw err;
  }
};

export const applyJob = async (talentId, companyId) => {
  try {
    const contractInstance = await tezos.wallet.at(careerFairContractAddress);
    const op = await contractInstance.methods
      .apply(talentId, companyId)
      .send({ mutez: true, amount: 1 });
    await op.confirmation();
  } catch (err) {
    throw err;
  }
};

export const rateTalent = async (talentId, rating) => {
  try {
    const contractInstance = await tezos.wallet.at(careerFairContractAddress);
    const op = await contractInstance.methods
      .rateTalent(talentId, rating)
      .send({ mutez: true, amount: 1 });
    await op.confirmation();
  } catch (err) {
    throw err;
  }
};

export const filterTokens = async (allTokens) => {
  let _talentTokens = [];
  let _companyTokens = []; 
  for (let token in allTokens) {
    if (token.user === "talent") {
      _talentTokens.push(token)
    } else {
      _companyTokens.push(token)
    }
  };
  console.log("talent/: ", _talentTokens);
  console.log("company/: ", _companyTokens);
  return { _talentTokens, _companyTokens }
}

export const getTokenIdForAddress = (address, allTokens) => {
  for (let token in allTokens) {
    if (token.author === address) {
      return token.token_id
    } 
    return -1
  }
}