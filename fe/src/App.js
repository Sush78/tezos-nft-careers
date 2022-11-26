import { useState, useEffect } from "react";
import { TokenCard } from "./components/TokenCard";
import { applyJob, collectNFT, filterTokens, getTokenIdForAddress } from "./utils/opertions";
import { fetchData } from "./utils/tzkt";
import { Header } from "./components/Header";
import { useNavigate } from "react-router-dom";
import { getAccount } from "./utils/wallet";

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [allTokens, setAllTokens] = useState([])
  const [companyToken, setCompanyToken] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    (async () => {
      const storage = await fetchData();
      setAllTokens(storage);
      console.log("alltoken: ", allTokens)
      // const { _companyToken } = await filterTokens(allTokens);
      // console.log(_companyToken);
      // setCompanyToken(_companyToken);
      // setCurrentAccount(await getAccount());
    })();
  }, []);

  const applyWrapper = async (companyId) => {
    const talentId = getTokenIdForAddress(currentAccount, allTokens)
    await applyJob(talentId, companyId);
  }

  const tokens = allTokens.map((obj, idx) => (
    <TokenCard
      key={idx}
      item={obj}
      onCollect={() =>
       //collectNFT({ amount: obj.amount, id: obj.token_id })
       applyWrapper(obj.token_id)
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
