import { useEffect, useState, useContext } from "react";
import { useAppSelector } from '../redux/hooks'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavContext } from "../NavContext"
import { CoinFounder, CoinSpecialty, CoinMetrics, CoinHolders, CTAOffer } from "../components"
import MakeOffer from "../components/MakeOffer";
import { scrollYEnableOffset } from "../constants";
import { ThemeContext, darkCss, lightCss } from '../ThemeContext';
import axios from "axios";
import { API_COIN, API_FOUNDER } from "../constants/APIs";
import { getHolderByGraphQL, getOfferByGraphQL } from "../utils/getData";
import { HolderChart, TransferChart } from "../components/CoinCharts";

const getMatchedSubmittedOffer = async (offerSubmitted:string[], contractAddress:string | undefined) => {
  //TODO(LUke): 這裡也許應該考慮offer.status
  let matchedOffer = null;
  for(let i=0; i<offerSubmitted.length; i++){
    const offer = await getOfferByGraphQL(offerSubmitted[i])
    if(offer?.contractAddress == contractAddress){
      matchedOffer = offer;
      break;
    }
  }
  return matchedOffer
}

export default function CoinPage() {
  const navigate = useNavigate()
  const { dark } = useContext(ThemeContext);
  const {contractAddress} = useParams()
  const [ coin, setCoin ] = useState<any>(null)
  const [ coinFounder, setCoinFounder ] = useState<any>(null)
  const [ holders, setHolders ] = useState<any>([])
  const [ submittedOffer, setSubmittedOffer ] = useState<any>(null)

  const founderProfile = useAppSelector(state => state.founderProfile.value)
  const isConnected = useAppSelector(state => state.isConnected.value)
  const offerSubmitted = founderProfile.offerSubmitted
  const {menuOpen} = useContext(NavContext)
  const [displayOfferBtn, setDisplayOfferBtn] = useState(false)


  // check if scrollY > scrollYEnableOffset, then display make an offer btn
  window.onscroll = function() {
    const scrollY = window.pageYOffset;
    if(scrollY>scrollYEnableOffset){
      setDisplayOfferBtn(true)
    }else{
      setDisplayOfferBtn(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0); //進入新頁面要scroll to the top
    const fetchData = async () => {

      // get coin data
      const coinData = await axios.get(`${API_COIN}/${contractAddress}`)
      const {founder: founderId, holders: holdersId} = coinData.data
      setCoin(coinData.data)
      if(coinData.data.length==0){navigate('/error')}
      
      // get founder data
      const founderData = await axios.get(`${API_FOUNDER}/${founderId}`)
      setCoinFounder(founderData.data)

      // get holders data from holdersIds
      const holdersData = await Promise.all(holdersId.map( (id:string) => {
          return getHolderByGraphQL(id)
        }
      ))
      const holders = holdersData.map( (holder:any) => {
        const address = contractAddress as string
        return {...holder, desiredContractAddress: address}
      })
      setHolders(holders)

      // check if there is a matched offer, if yes, set matchedOffer
      const submittedOffer = await getMatchedSubmittedOffer(offerSubmitted, contractAddress)
      setSubmittedOffer(submittedOffer);
    }

    fetchData();

  }, []);

  // 一旦 connected, 要重新render
  useEffect(() => {
    async function fetchSubmission() {
      // check if there is a matched offer, if yes, set matchedOffer
      const submittedOffer = await getMatchedSubmittedOffer(offerSubmitted, contractAddress)
      setSubmittedOffer(submittedOffer);
    }
    fetchSubmission();

  }, [isConnected])

  return (
      <div className={`${dark ? darkCss : lightCss} w-full`}>
        <div className={`${dark ? darkCss : lightCss} pt-24 z-0 h-screen ${menuOpen ? 'bg-gray-500 overflow-hidden' : ''}`}>
          { submittedOffer?.status==='pending' && 
          <div className="bg-blue-500 text-white p-4">
            Offer submitted, check {<a className="underline" onClick={()=>navigate('/account')}>Account</a> } to learn more
          </div>
          }
          <CoinFounder coinName={coin?.name} founder={coinFounder}/>
          <CoinSpecialty coinName={coin?.name} whitePaper={coin?.whitePaper} founder={coinFounder}/>
          <CoinMetrics metrics={coin?.metrics}/>
          <HolderChart contractAddress={contractAddress}/>
          <CoinHolders holders={holders} contractAddress={contractAddress}/>
          <CTAOffer coinName={coin?.name}/>
          <div className={`h-24 ${dark ? darkCss : lightCss}`}></div>
        </div>
        <MakeOffer enable={displayOfferBtn} coinFounder={coinFounder} coin={coin} submittedOffer={submittedOffer} setSubmittedOffer={setSubmittedOffer}/>
      </div>
  );
}