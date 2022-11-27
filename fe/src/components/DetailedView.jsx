import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { useParams } from 'react-router-dom';
import { collectNFT } from '../utils/opertions';

export const DetailedView = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem("allTokens"));
        const tok = temp.find((ele) => ele.token_id === id)
        if (temp) {
          setData(tok);
        }
    }, [id]);

    return (
      <>
      <Header />  
      <div className="ui internally celled grid">
        {data !== null ? (
          <>
            <div className="ui">{data.description}</div>
            <div className="row">
              <div className="nine wide column">
                <img
                  src={`https://ipfs.io/ipfs/${data.image.split("ipfs://")[1]}`}
                  alt={data.description}
                />
              </div>
              <div className="seven wide column container center">
                <h3>CV Info</h3>
                {data.cvInfo.name &&<div className="ui">
                  <h3 className="ui right floated header">{data.cvInfo.name}</h3>
                  <h3 className="ui left aligned header">Talent Name</h3>
                </div>}
                {data.cvInfo.age &&<div className="ui">
                  <h3 className="ui right floated header">{data.cvInfo.age}</h3>
                  <h3 className="ui left aligned header">Talent Age</h3>
                </div>}
                {data.cvInfo.contact &&<div className="ui">
                  <h3 className="ui right floated header">{data.cvInfo.contact}</h3>
                  <h3 className="ui left aligned header">Talent Contact Info</h3>
                </div>}
                {data.cvInfo.yearsOfExp &&<div className="ui">
                  <h3 className="ui right floated header">{data.cvInfo.yearsOfExp}</h3>
                  <h3 className="ui left aligned header">Years of Experience</h3>
                </div>}
                {data.cvInfo.degree &&<div className="ui">
                  <h3 className="ui right floated header">{data.cvInfo.degree}</h3>
                  <h3 className="ui left aligned header">Last Degree</h3>
                </div>}
                {data.cvInfo.skills &&<div className="ui">
                  <h3 className="ui right floated header">{data.cvInfo.skills}</h3>
                  <h3 className="ui left aligned header">Technical Skills</h3>
                </div>}
                <div className='nft-info'>
                    <h3>NFT Info</h3>
                    <div className="ui">
                    <h3 className="ui right floated header">{data.name}</h3>
                    <h3 className="ui left aligned header">Name</h3>
                    </div>
                    <div className="ui">
                    <h3 className="ui right floated header">{data.symbol}</h3>
                    <h3 className="ui left aligned header">Symbol</h3>
                    </div>
                    <div
                    className="ui "
                    onClick={() => {
                        navigator.clipboard.writeText(data.holder + "");
                    }}
                    >
                    <h3
                        className="ui right floated header green"
                        style={{ cursor: "pointer" }}
                        data-content="Copy to clipboard"
                    >
                        {data.holder?.slice(0, 6) + "..."}
                    </h3>
                    <h3 className="ui left aligned header">Holder</h3>
                    </div>
                    <div
                    className="ui "
                    onClick={() => {
                        navigator.clipboard.writeText(data.author + "");
                    }}
                    >
                    <h3
                        className="ui right floated header green"
                        style={{ cursor: "pointer" }}
                        data-content="Copy to clipboard"
                    >
                        {data.author?.slice(0, 6) + "..."}
                    </h3>
                    <h3 className="ui left aligned header">Author</h3>
                    </div>
                    <div className="ui">
                    <h3 className="ui right floated header">{data.amount}</h3>
                    <h3 className="ui left aligned header">Price</h3>
                    </div>
                    <div className="ui">
                    <h3 className="ui right floated header">{data.token_id}</h3>
                    <h3 className="ui left aligned header">Token ID</h3>
                    </div>
                    {/*...*/}
                </div>
                </div>
            </div>
            <div className="ui">
              <button
                className="fluid ui button basic green"
                onClick={() =>
                  data.collectable &&
                    collectNFT({
                        amount: data.amount,
                        id: data.token_id,
                    })
                }
              >
                {data.collectable ? "Buy" : "Sold Out"}
              </button>
            </div>
          </>
        ) : null}
      </div>
      </>
    )
}
