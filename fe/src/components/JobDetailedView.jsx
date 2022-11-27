import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { useParams } from 'react-router-dom';
import { getTokenIdForAddress } from '../utils/opertions';
import { applyJob } from '../utils/opertions';

export const JobDetailedView = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [currentAccount, setCurrentAccount] = useState("");
    const [allTokens, setAllTokens] = useState([])

    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem("allTokens"));
        setCurrentAccount(JSON.parse(localStorage.getItem("currentAccount")))
        setAllTokens(temp)
        const tok = temp.find((ele) => ele.token_id === id)
        if (temp) {
          setData(tok);
        }
    }, [id]);

    const applyWrapper = async (companyId) => {
      const talentId = getTokenIdForAddress(currentAccount, allTokens)
      await applyJob(companyId, talentId);
    }

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
                  <h3 className="ui right floated header ui-info">{data.name}</h3>
                  <h3 className="ui left aligned header ui-label">Company name:</h3>
                </div>}
                {data.jobInfo.role &&<div className="ui">
                  <h3 className="ui right floated header ui-info">{data.jobInfo.role}</h3>
                  <h3 className="ui left aligned header ui-label">Job Role:</h3>
                </div>}
                {data.description &&<div className="ui">
                  <p className="ui right floated header ui-info">{data.description}</p>
                  <h3 className="ui left aligned header ui-label">Job Description:</h3>
                </div>}
                {data.jobInfo.skills &&<div className="ui">
                  <h3 className="ui right floated header ui-info">{data.jobInfo.skills}</h3>
                  <h3 className="ui left aligned header ui-label">Skills Required:</h3>
                </div>}
                {data.jobInfo.salary&&<div className="ui">
                  <h3 className="ui right floated header ui-info">{data.jobInfo.salary}</h3>
                  <h3 className="ui left aligned header ui-label">Salary:</h3>
                </div>}
                {data.jobInfo.contact &&<div className="ui">
                  <h3 className="ui right floated header ui-info">{data.jobInfo.contact}</h3>
                  <h3 className="ui left aligned header ui-label">Company/Recruiter Contact:</h3>
                </div>}
                <div className="ui">
                  <button
                    className="fluid ui button basic green"
                    onClick={() =>
                      applyWrapper(data.token_id)
                    }
                  >
                    Apply
                  </button>
                </div>
                </div>
            </div>
          </>
        ) : null}
      </div>
      </>
    )
}
