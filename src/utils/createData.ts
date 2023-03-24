//auto login 功能, 在頁面刷新時, 保持登入狀態, 獲取最新的founder profile & coin data (from backend)
import axios from "axios";
import { GRAPHQL_API_URL } from "../constants/APIs";


export async function createFounderByGraphQL(accountAddress: string){
  const query = `mutation {
    createFounder(accountAddress:"${accountAddress}") {
      accountAddress,
      holderID,
      offerSubmitted,
      offerReceived,
      contact {
        headshot
      },
      foundingCoins {
        name,
        whitePaper,
        contractAddress
      }
    }
  }`
  const res = await axios.post(GRAPHQL_API_URL, {
    query
  });

  // error handling, if res.data is null or there is an error message returned from backend
  if(res.data.error) throw new Error(res.data.error)
  let founder = res.data.data.createFounder
  return founder;

}





