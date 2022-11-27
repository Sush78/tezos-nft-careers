import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { useParams } from 'react-router-dom';
import { collectNFT } from '../utils/opertions';

export const JobDetailedView = () => {
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
                <h3>{`${data.name} job description!`}</h3>
                {data.name &&<div className="ui">
                  <h3 className="ui right floated header">{data.name}</h3>
                  <h3 className="ui left aligned header">Company Name</h3>
                </div>}
                {data.jobInfo.role &&<div className="ui">
                  <h3 className="ui right floated header">{data.jobInfo.role}</h3>
                  <h3 className="ui left aligned header">Job Role</h3>
                </div>}
                {data.description &&<div className="ui">
                  <p className="ui right floated header">{data.description}</p>
                  <h3 className="ui left aligned header">Job Description</h3>
                </div>}
                {data.jobInfo.skills &&<div className="ui">
                  <h3 className="ui right floated header">{data.jobInfo.skills}</h3>
                  <h3 className="ui left aligned header">Skills Required</h3>
                </div>}
                {data.jobInfo.salary&&<div className="ui">
                  <h3 className="ui right floated header">{data.jobInfo.salary}</h3>
                  <h3 className="ui left aligned header">Salary</h3>
                </div>}
                {data.jobInfo.contact &&<div className="ui">
                  <h3 className="ui right floated header">{data.jobInfo.contact}</h3>
                  <h3 className="ui left aligned header">Company/Recruiter Contact</h3>
                </div>}
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
