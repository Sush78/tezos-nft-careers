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
    const [sortedToks, setSortedToks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
      (async () => {
        const storage = await fetchData();
        setAllTokens(storage);
        const val = filterTokens(storage);
        sortTalentTokens(val._talentTokens)
      })();
    }, []);

    const sortTalentTokens = (allTokens) => {
      const ratingsMap = JSON.parse(localStorage.getItem("ratingMap"))
      console.log(ratingsMap)
      let sortedTokens = []
      for(let tok in allTokens){
        let avgRating = 0
        let token = allTokens[tok]
        if(!ratingsMap.hasOwnProperty(token.token_id)) avgRating = 1
        else{
          const ratingList = ratingsMap[token.token_id]
          avgRating = ratingList.reduce((a, b) => parseInt(a) + parseInt(b), 0) / ratingList.length;
        }
        token["avgRating"] = avgRating
        sortedTokens.push(token)
      }
      sortedTokens = sortedTokens.sort((tokA, tokB) => tokB.avgRating - tokA.avgRating)
      setSortedToks(sortedTokens)
    }
    
    const rateTalentWrapper = (tokenId) => {
      const rating = localStorage.getItem("ddval")
      localStorage.setItem("ddval", 1)
      rateTalent(rating, tokenId)
    }

    const tokens = sortedToks.map((obj, idx) => (
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
          <h1>Pick Talent</h1>
          <div className="ui link three column grid cards">{tokens}</div>
        </div>
      </>
    )
}
