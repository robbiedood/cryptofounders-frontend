/**
 * 在Account page使用的 offer component for offer review and edit
 * 與 MakeOffer.tsx 的差別在於:
 *  不需要ModalWeb3Connect (一定是connected)
 *  不需要enable (一定是enable)
 *  不需要判斷是否已經有make an offer (一定是已經有make an offer)
 *  
 *  可以重複使用的部分:
 *  1. CoinFounderCardForModal
 *  2. UpdateOfferForm
 *  
 * */ 
import axios from 'axios';
import { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { ThemeContext, darkCss, lightCss } from '../ThemeContext'
import { MakeOfferForm, ReplyOfferForm, UpdateOfferForm } from './Forms';
import { CoinFounderCardForModal } from './MakeOffer';
import { OfferContext } from '../ModalContext';
import { API_COIN, API_FOUNDER } from '../constants/APIs';

export const EditOffer = (props:any) => {

  const { offer, setOffer } = props

  // 判斷是否connected, 如果沒有connected, 要跳出connect wallet
  const { dark } = useContext(ThemeContext)
  const { showOfferModal, setShowOfferModal } = useContext(OfferContext)
  const [offerModalTitle, setOfferModalTitle] = useState('Make an Offer')
  const [coinFounder, setCoinFounder] = useState<any>(null)
  const [coin, setCoin] = useState<any>(null)
  const contractAddress = offer.contractAddress

  useEffect(() => {
    if (offer?.status === 'pending') {
      setOfferModalTitle('Review & Edit')
    }else{
      setOfferModalTitle(`The Offer has been ${offer.status}`)
    }
  }, [offer])

  useEffect(() => {
    const fetchData = async () => {

      // get coin data
      const coinData = await axios.get(`${API_COIN}/${contractAddress}`)
      const { founder: founderId } = coinData.data
      setCoin(coinData.data)      
      // get founder data
      const founderData = await axios.get(`${API_FOUNDER}/${founderId}`)
      setCoinFounder(founderData.data)
    }

    fetchData();

  }, [showOfferModal])

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-80" onClick={() => setShowOfferModal(false)}></div>
        <div className="fixed top-24 left-1 right-1 bg-white text-black lg:w-1/2 lg:left-1/4 p-10 rounded-lg shadow-lg">
          <h3 className="text-xl mb-5 font-semibold">{offerModalTitle}</h3>
          <div className='flex border border-gray-400 mb-8 rounded-lg'>
            <CoinFounderCardForModal coinFounder={coinFounder} coin={coin}/>
          </div>
          
          {offer?.status === 'pending' ? (
            <UpdateOfferForm setShowModal={setShowOfferModal} coinFounder={coinFounder} coin={coin} 
              setSubmittedOffer={setOffer} submittedOffer={offer}/>
          ) : (
            // <MakeOfferForm setShowModal={setShowOfferModal} coinFounder={coinFounder} coin={coin} setSubmittedOffer={setOffer}/>
            <ReplyOfferForm setShowModal={setShowOfferModal} coinFounder={coinFounder} coin={coin} 
            setSubmittedOffer={setOffer} submittedOffer={offer}/>         
            )
          }

        </div>
    </div>
  ) 
}

export const ReplyOffer = (props:any) => {

  const { offer, setOffer } = props

  // 判斷是否connected, 如果沒有connected, 要跳出connect wallet
  const { dark } = useContext(ThemeContext)
  const { showOfferModal, setShowOfferModal } = useContext(OfferContext)
  const [offerModalTitle, setOfferModalTitle] = useState('Review & Reply')
  const [coinFounder, setCoinFounder] = useState<any>(null)
  const [coin, setCoin] = useState<any>(null)
  const contractAddress = offer.contractAddress

  useEffect(() => {
    if (offer?.status === 'pending') {
      setOfferModalTitle('Review & Reply')
    }else{
      setOfferModalTitle(`The offer has been ${offer.status}`)
    }
  }, [offer])

  useEffect(() => {
    const fetchData = async () => {

      // get coin data
      const coinData = await axios.get(`${API_COIN}/${contractAddress}`)
      const { founder: founderId } = coinData.data
      setCoin(coinData.data)      
      // get founder data
      const founderData = await axios.get(`${API_FOUNDER}/${founderId}`)
      setCoinFounder(founderData.data)
    }

    fetchData();

  }, [showOfferModal])

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-80" onClick={() => setShowOfferModal(false)}></div>
        <div className="fixed top-24 left-1 right-1 bg-white text-black lg:w-1/2 lg:left-1/4 p-10 rounded-lg shadow-lg">
          <h3 className="text-xl mb-5 font-semibold">{offerModalTitle}</h3>
          <div className='flex border border-gray-400 mb-8 rounded-lg'>
            <CoinFounderCardForModal coinFounder={coinFounder} coin={coin}/>
          </div>
          
          <ReplyOfferForm setShowModal={setShowOfferModal} coinFounder={coinFounder} coin={coin} 
              setSubmittedOffer={setOffer} submittedOffer={offer}/>

        </div>
    </div>
  ) 

}