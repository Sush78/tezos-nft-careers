import React, { useState, useEffect } from "react";
import { connectWallet, getAccount } from "../utils/wallet";
import { Link } from "react-router-dom";

export const Header = ({ setTezos }) => {
  const [account, setAccount] = useState("")

  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  const onClick = (event) => {
    event.preventDefault();
    if(account !== "") return
    connectWallet()
  };

  return (
    <div className="ui menu black" style={{ marginTop: "5px" }}>
      <a href="/" className="ui header item">
        Talent
      </a>
      <Link className="item" to="/companies">
        Companies
      </Link>

      {account !== "" ? (
        <Link className="item" to="/create">
          Create NFT
        </Link>
      ) : null}

      <div className="right menu">
        {account === "" ? (
          <a href="/#" className="item" onClick={onClick}>
            Connect Wallet
          </a>
        ) : (
          <a href="/#" className="item" onClick={onClick}>
            Disconnect Wallet
          </a>
        )}
      </div>
    </div>
  );

};