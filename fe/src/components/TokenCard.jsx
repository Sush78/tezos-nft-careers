import React from 'react'
import { useState } from 'react';

export const TokenCard = ({item, onClick, onCollect, buttonText, onViewlarge}) => {

    const [ddval, setDdval] = useState("")
    const rateWrapper = () => {
      localStorage.setItem("ddval",ddval)
      onCollect()
    }
    return (
        <div className="ui fluid card background-colr">
          <div className="image">
            <img
              // onClick={onClick}
              style={{ maxHeight: "200px", objectFit: "cover" }}
              src={`https://ipfs.io/ipfs/${item.image.split("ipfs://")[1]}`}
              alt={item.description}
            />
          </div>
          <div className="content">
            <div className="right floated">
              Price:
              <div>{item.amount}</div>
            </div>
            <div className="header">{item.name}</div>
            <div className="meta">{item.symbol}</div>
            <div className="description">
              {item.description.length > 15
                ? item.description.slice(0, 15) + "..."
                : item.description}
            </div>
          </div>
    
          <div className="extra content">
            <span className="right floated">
            {buttonText==="Rate" && <select
              onChange={(e) => setDdval(e.currentTarget.value)}
              className="ant-input selectBox"
              style={{width: 200}}
              placeholder="Select a person"
              value={ddval}
              defaultValue={1}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>}
            {buttonText==="Rate" &&
              <button className="ui positive basic button" onClick={rateWrapper}>
                {/* {item.collectable ? "Buy" : "Sold Out"} */}
                {buttonText}
              </button>}
              {buttonText==="Apply" &&
              <button className="ui positive basic button" onClick={onCollect}>
                {/* {item.collectable ? "Buy" : "Sold Out"} */}
                {buttonText}
              </button>}
              <button className="ui primary basic button" onClick={onClick}>
                View Details
              </button>
            </span>
          </div>
        </div>
      );
}
