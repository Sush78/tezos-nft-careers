import axios from "axios";
import { careerFairContractAddress } from '../constants/constans'
import { nftContractAddress } from '../constants/constans'
import { skipNfts } from "../constants/constans";

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

export const hex2buf = (hex) => {
  return new Uint8Array(hex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16)));
};

export function bytes2Char(hex) {
  return Buffer.from(hex2buf(hex)).toString("utf8");
}

export const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.ghostnet.tzkt.io/v1/contracts/${careerFairContractAddress}/bigmaps/data/keys`
      );
      const response1 = await axios.get(
        `https://api.ghostnet.tzkt.io/v1/contracts/${nftContractAddress}/bigmaps/token_metadata/keys`
      );
      const response2 = await axios.get(
        `https://api.ghostnet.tzkt.io/v1/contracts/${careerFairContractAddress}/storage`
      );
      localStorage.setItem("allmaps",{})
      const d1 = response.data;
      const d2 = response1.data;
      const applymap = response2.data.applymap
      const companyMap = response2.data.compMap
      const ratingMap = response2.data.ratingMap
      let tokenData = [];
      for (let i = 0; i < d1.length; i++) {
        try{
          const s = bytes2Char(d2[i].value.token_info[""]).split("//").at(-1);
          if(skipNfts.includes(s)) continue

          const res = await axios.get("https://ipfs.io/ipfs/" + s);

          const l1 = d1[i].value;
          const l2 = res.data;
          tokenData[i] = {
            ...l1,
            ...l2,
            token_id: d2[i].value.token_id,
          };
        } catch(error){
          console.log(error)
        }
      }
      localStorage.setItem("allTokens", JSON.stringify(tokenData))
      localStorage.setItem("companyMap", JSON.stringify(companyMap))
      localStorage.setItem("applyMap", JSON.stringify(applymap))
      localStorage.setItem("ratingMap", JSON.stringify(ratingMap))
      return tokenData
    } catch (e) {
      console.log(e);
    }
};
