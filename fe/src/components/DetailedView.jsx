import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { useParams } from 'react-router-dom';
import { rateTalent } from '../utils/opertions';
import { Button, Icon } from 'semantic-ui-react'

export const DetailedView = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [ddval, setDdval] = useState("")

    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem("allTokens"));
        const tok = temp.find((ele) => ele.token_id === id)
        if (temp) {
          setData(tok);
        }
    }, [id]);

    const rateTalentWrapper = (tokenId) => {
      const rating = localStorage.getItem("ddval")
      localStorage.setItem("ddval", 1)
      rateTalent(tokenId, rating)
    }

    const openLinkedIn = (link) => {
      window.open(
        link,
        '_blank'
      )
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
                <h3>CV Info</h3>
                {data.cvInfo.name &&<div className="ui">
                  <h3 className="ui right floated header ui-info">{data.cvInfo.name}</h3>
                  <h3 className="ui left aligned header">Talent Name</h3>
                </div>}
                {data.cvInfo.age &&<div className="ui">
                  <h3 className="ui right floated header ui-info">{data.cvInfo.age}</h3>
                  <h3 className="ui left aligned header">Talent Age</h3>
                </div>}
                {data.cvInfo.contact &&<div className="ui">
                  <h3 className="ui right floated header ui-info">{data.cvInfo.contact}</h3>
                  <h3 className="ui left aligned header">Talent Contact Info</h3>
                </div>}
                {data.cvInfo.yearsOfExp &&<div className="ui">
                  <h3 className="ui right floated header ui-info">{data.cvInfo.yearsOfExp}</h3>
                  <h3 className="ui left aligned header">Years of Experience</h3>
                </div>}
                {data.cvInfo.degree &&<div className="ui">
                  <h3 className="ui right floated header ui-info">{data.cvInfo.degree}</h3>
                  <h3 className="ui left aligned header">Last Degree</h3>
                </div>}
                {data.cvInfo.skills &&<div className="ui">
                  <h3 className="ui right floated header ui-info">{data.cvInfo.skills}</h3>
                  <h3 className="ui left aligned header">Technical Skills</h3>
                </div>}
                <div className='nft-info'>
                    <Button color='linkedin' onClick={() =>
                            openLinkedIn(data.cvInfo.linkedInUrl)
                        }>
                      <Icon name='linkedin' /> View Talent LinkedIn
                    </Button>
                    <div>
                    <select
                      onChange={(e) => setDdval(e.currentTarget.value)}
                      className="ant-input"
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
                    </select>
                    <button
                      className="fluid ui button basic green"
                      onClick={() =>
                        rateTalentWrapper(data.token_id)
                      }
                    >
                      Rate
                    </button>
                    </div>
                </div>
                </div>
            </div>
          </>
        ) : null}
      </div>
      </>
    )
}
