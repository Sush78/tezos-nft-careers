import { useState, useEffect } from "react";
import { TokenCard } from "./components/TokenCard";
import { collectNFT } from "./utils/opertions";
import { fetchData } from "./utils/tzkt";
import { Header } from "./components/Header";
import { useNavigate } from "react-router-dom";
import { copyAndMint } from "./utils/tzkt";

const App = () => {

  const [allTokens, setAllTokens] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    (async () => {
      const storage = await fetchData();
      setAllTokens(storage);
      console.log(allTokens)
    })();
  }, []);

  const tokens = allTokens.map((obj, idx) => (
    <TokenCard
      key={idx}
      item={obj}
      onCollect={() =>
       //collectNFT({ amount: obj.amount, id: obj.token_id })
       copyAndMint(obj)
      }
      onClick={() =>
        navigate(`/show/${obj.token_id}`)
      }
      buttonText="Apply"
    />
  ));
  return (
    <>
      <Header />
      <div className="main-landing-page">
        <h1>Pick Companies</h1>
        <div className="ui link three column grid cards">{tokens}</div>
      </div>
    </>
  )
};

export default App;
