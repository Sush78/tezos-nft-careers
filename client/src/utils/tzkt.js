import axios from "axios";
import { careerFairContractAddress } from '../constants/constans'
import { nftContractAddress } from '../constants/constans'

export const fetchStorageCareerFair = async () => {
  const res = await axios.get(
    `https://api.ghostnet.tzkt.io/v1/contracts/${careerFairContractAddress}/storage`
  );
  return res.data;
};

export const fetchStorageNFT = async () => {
    const res = await axios.get(
      `https://api.ghostnet.tzkt.io/v1/contracts/${nftContractAddress}/storage`
    );
    return res.data;
  };