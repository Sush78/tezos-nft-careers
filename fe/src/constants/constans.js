import { CLIENT_ID } from "../creds"

export const nftContractAddress =  "KT1KSgaHjTyiY2reVU4zA1V7uXd8SPNGs1A3" 
export const careerFairContractAddress = "KT18sQkTMmKRC8843qJPXqsGUtrcUwJfwoCp"

// Old config 

// export const nftContractAddress =  "KT1RLC6aVFcpPdGAYQxfanVn14ZnFVvf2uYc"
// export const careerFairContractAddress =  "KT1EqQuXWPCdyA2DRqjSDHATMn63WhJ7H53i"

// LinkedIn config

export const LINKEDIN_STATE = 'random_string'
const LINKEDIN_SCOPE = 'r_liteprofile r_emailaddress'
const LINKEDIN_RIDERECT = 'http://localhost:3000/'  //'http://localhost:3000/create'
const LINKEDIN_CLIENT_ID = CLIENT_ID

export const getURLWithQueryParams = (base, params) => {
    const query = Object
      .entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')
      
    return `${base}?${query}`
}

export const queryToObject = queryString => {
    const pairsString = queryString[0] === '?' ? queryString.slice(1) : queryString
    const pairs = pairsString
      .split('&')
      .map(str => str.split('=').map(decodeURIComponent))
    return pairs.reduce((acc, [key, value]) => key ? { ...acc, [key]: value } : acc, {})
  }
  
export const LINKEDIN_URL = getURLWithQueryParams('https://www.linkedin.com/oauth/v2/authorization', {
  response_type: "code",
  client_id: LINKEDIN_CLIENT_ID,
  redirect_uri: LINKEDIN_RIDERECT,
  state: LINKEDIN_STATE,
  scope: LINKEDIN_SCOPE
})