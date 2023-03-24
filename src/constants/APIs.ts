/**
 * 定義各種API URLs
 *  Restful API
 *  GraphQL API
 * 
 */

// const SERVER_DOMAIN = 'http://10.0.0.200' //local host, 測試用
const SERVER_DOMAIN = 'https://cryptofounders.app' //domain name
const SERVER_URL = SERVER_DOMAIN + ':4210' //反向代理port (proxy server url)

// Restful API
// founder related
const API_FOUNDER = SERVER_URL + '/founder'
const API_GET_FOUNDER_CONNECTED = API_FOUNDER + '/getFounderConnected'
const API_UPLOAD_HEADSHOT = API_FOUNDER + '/uploadHeadshot'

// coin related
const API_COIN = SERVER_URL + '/coin'
const API_ALL_COINS = API_COIN + '/allCoins'

// offer related
const API_OFFER = SERVER_URL + '/offer'
const API_MAKE_OFFER = API_OFFER + '/make'
const API_WITHDRAW_OFFER = API_OFFER + '/withdraw'
const API_UPDATE_OFFER = API_OFFER + '/update'
const API_ACCEPT_OFFER = API_OFFER + '/accept'
const API_REJECT_OFFER = API_OFFER + '/reject'

// sitemap related
const API_SITEMAP = SERVER_URL + '/sitemap.xml'

// GraphQL API
const GRAPHQL_API_URL = SERVER_DOMAIN + ':4210/graphql' //graphql server url


export {
  GRAPHQL_API_URL,
  API_GET_FOUNDER_CONNECTED,
  API_UPLOAD_HEADSHOT,
  API_ALL_COINS,
  API_OFFER,
  API_MAKE_OFFER,
  API_WITHDRAW_OFFER,
  API_UPDATE_OFFER,
  API_COIN,
  API_FOUNDER,
  API_ACCEPT_OFFER,
  API_REJECT_OFFER,
  API_SITEMAP
}
