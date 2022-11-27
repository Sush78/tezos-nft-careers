import React from 'react'
import { useState, useEffect } from "react";
import { TokenCard } from './TokenCard';
import { fetchData } from '../utils/tzkt';
import { Header } from './Header';
import { useNavigate } from "react-router-dom";
import { applyJob, rateTalent } from '../utils/opertions';
import { getTokenIdForAddress } from '../utils/opertions';
import { getAccount } from '../utils/wallet';

export const ApplicationsReceived = () => {
    const [allTokens, setAllTokens] = useState([])
    const [currentAccount, setCurrentAccount] = useState("");
    const [requiredTokens, setRequiredTokens] = useState([]);
    const navigate = useNavigate()

    const filterBasedTokens = async(allTokens) => {
        const applyMap = JSON.parse(localStorage.getItem("applyMap"))
        const companyId = getTokenIdForAddress(currentAccount, allTokens)
        const talentTokenList = applyMap[companyId]
        let filteredTokens = []
        for(let tok in allTokens){
            let token = allTokens[tok]
            if(talentTokenList.includes(token.token_id)){
                filteredTokens.push(token)
            }
        }
        setRequiredTokens(filteredTokens)
    }

    const rateTalentWrapper = (tokenId) => {
        const rating = localStorage.getItem("ddval")
        localStorage.setItem("ddval", 1)
        rateTalent(tokenId, rating)
    }

    useEffect(() => {
      (async () => {
        const storage = await fetchData();
        setAllTokens(storage);
        setCurrentAccount(await getAccount());
        await filterBasedTokens(storage)
      })();
    }, []);

    const tokens = requiredTokens.map((obj, idx) => (
      <TokenCard
        key={idx}
        item={obj}
        onCollect={() =>
            rateTalentWrapper(obj.token_id)
        }
        onClick={() =>
          navigate(`/show/${obj.token_id}`)
        }
        buttonText="Rate"
      />
    ));
    return (
      <>
        <Header />
        <div className="main-landing-page">
          <h1>Jobs Applied</h1>
          <div className="ui link three column grid cards">{tokens}</div>
        </div>
      </>
  )
}
