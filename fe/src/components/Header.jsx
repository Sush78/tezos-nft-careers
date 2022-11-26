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
    <div className="ui menu black background-colr border-updown" style={{ marginTop: "5px" }}>
      <a href="/" className="ui header item">
        Talent
      </a>
      <Link className="header-item item" to="/companies">
        Companies
      </Link>

      {account !== "" ? (
        <Link className="header-item item" to="/create">
          Create CV NFT
        </Link>
      ) : null}
      <Link className="header-item item" to="/create-job">
        Create Job NFT
      </Link>

      <div className="right menu">
        {account === "" ? (
          <a href="/#" className="header-item item" onClick={onClick}>
            Connect Wallet
          </a>
        ) : (
          <a href="/#" className="header-item item" onClick={onClick}>
            Disconnect Wallet
          </a>
        )}
      </div>
    </div>
  );

};