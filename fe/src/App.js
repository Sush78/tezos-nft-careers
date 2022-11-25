import { useState, useEffect } from "react";
import { TokenCard } from "./components/TokenCard";
import { collectNFT } from "./utils/opertions";
import { fetchData } from "./utils/tzkt";

const App = () => {

  const [allTokens, setAllTokens] = useState([])

  useEffect(() => {
    (async () => {
      const storage = await fetchData();
      console.log("storage: ", storage)
      setAllTokens(storage);
    })();
  }, []);

  const tokens = allTokens.map((obj, idx) => (
    <TokenCard
      key={idx}
      item={obj}
      onCollect={() =>
       collectNFT({ amount: obj.amount, id: obj.token_id })
      }
    />
  ));
  return (
    <div>
      <h1>NFT Careers</h1>
      <div className="ui link three column grid cards">{tokens}</div>
    </div>
  )
};

export default App;
