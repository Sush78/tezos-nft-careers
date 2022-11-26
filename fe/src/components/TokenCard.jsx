import React from 'react'

export const TokenCard = ({item, onClick, onCollect, buttonText, onViewlarge}) => {
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
              <button className="ui positive basic button" onClick={onCollect}>
                {/* {item.collectable ? "Buy" : "Sold Out"} */}
                {buttonText}
              </button>
              <button className="ui primary basic button" onClick={onClick}>
                View Details
              </button>
            </span>
            <span>
              Token ID:
              <div>{item.token_id}</div>
            </span>
          </div>
        </div>
      );
}
