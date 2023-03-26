//auto login 功能, 在頁面刷新時, 保持登入狀態, 獲取最新的founder profile & coin data (from backend)
import axios from "axios";
import { API_ALL_COINS, GRAPHQL_API_URL } from "../constants/APIs";

export async function getAllCoins() {
  const res = await axios.get(API_ALL_COINS);
  // error handling, if res.data is null or there is an error message returned from backend
  if(res.data.error) throw new Error(res.data.error)

  return res.data;
}

export async function getAllCoinsByGraphQL() {

  const query = `query {
    coins {
      contractAddress,
      name,
      whitePaper,
      founder,
      holders,
    }
  }`
  const res = await axios.post(GRAPHQL_API_URL, {
    query
  });

  // error handling, if res.data is null or there is an error message returned from backend
  if(res.data.error) throw new Error(res.data.error)

  return res.data.data.coins;
}

export async function getOfferByGraphQL(offerID: string){
  const query = `query {
    offer(_id:"${offerID}") {
      _id,
      contractAddress,
      desiredAmount,
      payingAmount,
      expireAt,
      addendum,
      status,
    }
  }`

  const res = await axios.post(GRAPHQL_API_URL, {
    query
  });

  // error handling, if res.data is null or there is an error message returned from backend
  if(res.data.error) throw new Error(res.data.error)

  let offer = res.data.data.offer
  return offer;
}

export async function getOffersByGraphQL(offerIDs: string[]) {

  const query = `query {
    offers(_ids: ${JSON.stringify(offerIDs)}) {
      _id,
      contractAddress,
      desiredAmount,
      payingAmount,
      expireAt,
      addendum,
      status,
    }
  }`

  const res = await axios.post(GRAPHQL_API_URL, {
    query
  });

  // error handling, if res.data is null or there is an error message returned from backend
  if(res.data.error) throw new Error(res.data.error)

  let offers = res.data.data.offers
  return offers;
}


export async function getHolderByGraphQL(holderID: string) {
  //除了 holderID, 還需要 holdingCoinContractAddress 來過濾出該持有者在特定contract的代幣
  const query = `query {
    holder(_id:"${holderID}") {
      accountAddress,
      holdingCoins,
      testimonials,
      contact {
        headshot,
        name
      },
    }
  }`
  const res = await axios.post(GRAPHQL_API_URL, {
    query
  });

  // error handling, if res.data is null or there is an error message returned from backend
  if(res.data.error) throw new Error(res.data.error)

  let holder = res.data.data.holder
  return holder;
}

export async function getFounderByGraphQL(input:any) {
  // contruct query
  let accountAddress = input?.accountAddress
  let _id = input?._id

  const variables = { accountAddress, _id }

  console.log('variables: ', variables)

  const query = `query FounderProfile($accountAddress: String, $_id: String){
    founder(accountAddress: $accountAddress, _id: $_id) {
      accountAddress,
      offerSubmitted,
      offerReceived,
      contact {
        headshot,
        name,
        supplement
      },
      holderID,
      foundingCoins {
        contractAddress,
        name,
        whitePaper,
        holders,
        metrics {
          marketPrice,
          totalSupply,
          numOfHolders,
        }
      }
    }
  }`

  const res = await axios.post(GRAPHQL_API_URL, {
    query,
    variables
  });

  // error handling, if res.data is null or there is an error message returned from backend
  if(res.data.error) throw new Error(res.data.error)

  let founder = res.data.data.founder
  return founder;

}

export async function getCoin(contractAddress: string) {
  const res = await axios.get(`${API_ALL_COINS}/${contractAddress}`);
  // error handling, if res.data is null or there is an error message returned from backend
  if(res.data.error) throw new Error(res.data.error)
  
  return res.data;
}


