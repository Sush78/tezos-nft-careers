import React from 'react'
import { useState, useEffect } from "react";
import { TokenCard } from './TokenCard';
import { collectNFT, filterTokens } from '../utils/opertions';
import { fetchData } from '../utils/tzkt';
import { Header } from './Header';
import { useNavigate } from "react-router-dom";

export const Companies = () => {
    const [allTokens, setAllTokens] = useState([])
    const [talentTokens, setTalentTokens] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
      (async () => {
        const storage = await fetchData();
        console.log("storage: ", storage)
        setAllTokens(storage);
        let { _talentTokens } = await filterTokens(allTokens);
        setTalentTokens(_talentTokens);
      })();
    }, []);
  
    const tokens = talentTokens.map((obj, idx) => (
      <TokenCard
        key={idx}
        item={obj}
        onCollect={() =>
         collectNFT({ amount: obj.amount, id: obj.token_id })
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
          <h1>Pick Talent</h1>
          <div className="ui link three column grid cards">{tokens}</div>
        </div>
      </>
    )
}
