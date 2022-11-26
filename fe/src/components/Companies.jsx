import React from 'react'
import { useState, useEffect } from "react";
import { TokenCard } from './TokenCard';
import { fetchData } from '../utils/tzkt';
import { Header } from './Header';
import { useNavigate } from "react-router-dom";
import { filterTokens } from '../utils/opertions';
import { rateTalent } from '../utils/opertions';

export const Companies = () => {
    const [allTokens, setAllTokens] = useState([])
    const [talentTokens, setTalentTokens] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
      (async () => {
        const storage = await fetchData();
        setAllTokens(storage);
        const val = filterTokens(storage);
        setTalentTokens(val._talentTokens);
      })();
    }, []);
    
    const rateTalentWrapper = () => {

    }

    const tokens = talentTokens.map((obj, idx) => (
      <TokenCard
        key={idx}
        item={obj}
        onCollect={() =>
          rateTalentWrapper()
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
