import { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../redux/hooks'
import Web3Connect from './Web3Connect';
import { ThemeContext, darkCss, lightCss } from '../ThemeContext'
import { Headshot } from './Headshot';
import { syncFounderData } from '../utils/syncData';
import { MakeOfferForm, UpdateOfferForm } from './Forms';
import { OfferContext } from '../ModalContext';

export const ModalWeb3Connect = (props:any) => {
  const { setShowModal } = props
  const { t } = useTranslation();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-80" onClick={() => setShowModal(false)}></div>
      <div className="fixed top-36 left-1 right-1 bg-white text-black lg:w-1/2 lg:left-1/4 p-10 rounded-lg shadow-lg">
        <div className='flex flex-col mb-8 rounded-lg items-center'>
          <h1 className="text-xl font-bold">{t('found-page.PleaseConnectWallet')}</h1>
          <Web3Connect text={`${t('ConnectWallet')}`}/>
        </div>
      </div>
    </>
  )
}

export const CoinFounderCardForModal = (props:any) => {
  const { coinFounder, coin } = props
  const headshot = coinFounder?.contact.headshot
  const accountAddress = coinFounder?.accountAddress
  const listingPrice = coin?.metrics.marketPrice
  const bestOffer = coin?.metrics?.bestOffer

  return(
      <div className='flex'>
        <div className='-mt-4 my-2 w-28'>
          <Headshot headshotUrl={headshot} generatingSeed={accountAddress}/>
        </div>
        <div className='flex flex-col justify-center ml-4 space-y-3'>
          <div>
            <p>{listingPrice} </p>
            <p className='text-sm text-gray-500'>listing price</p>
          </div>
              {bestOffer ? (
                <div>
                  <p>{bestOffer}</p>
                  <p className='text-sm text-gray-500'>best offer</p>
                </div>
              ) : <p>Be the first offerer!</p>
            }
        </div>
      </div>
  )

}

const MakeOffer = (props:any) => {

  const { enable, coinFounder, coin, submittedOffer, setSubmittedOffer } = props

  // 判斷是否connected, 如果沒有connected, 要跳出connect wallet
  const isConnected = useAppSelector(state => state.isConnected.value)
  const { dark } = useContext(ThemeContext)
  const { showOfferModal, setShowOfferModal } = useContext(OfferContext)
  const [offerModalTitle, setOfferModalTitle] = useState('Make an Offer')
  const [CTAText, setCTAtext] = useState('Make an Offer')

  const handleOnClick = async () => {
    // 把offerSubmitted Ids & coin 傳給backend 去判斷是否已經有make an offer
    // 有的話要跳出 offer review modal, 提供 withdraw offer 選擇
    // 沒有的話就直接跳出make an offer modal
    setShowOfferModal(!showOfferModal)
  }

  useEffect(() => {
    console.log('i am in submittedOffer change of MakeOffer')
    if (submittedOffer?.status === 'pending') {
      setOfferModalTitle('Review & Edit')
      setCTAtext('Review & Edit')
    }else{
      setOfferModalTitle('Make an Offer')
      setCTAtext('Make an Offer')
    }
  }, [submittedOffer])

  return showOfferModal ? isConnected ? (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-80" onClick={() => setShowOfferModal(false)}></div>
        <div className="fixed top-24 left-1 right-1 bg-white text-black lg:w-1/2 lg:left-1/4 p-10 rounded-lg shadow-lg">
          <h3 className="text-xl mb-5 font-semibold">{offerModalTitle}</h3>
          <div className='flex border border-gray-400 mb-8 rounded-lg'>
            <CoinFounderCardForModal coinFounder={coinFounder} coin={coin}/>
          </div>
          
          {submittedOffer?.status === 'pending' ? (
            <UpdateOfferForm setShowModal={setShowOfferModal} coinFounder={coinFounder} coin={coin} 
              setSubmittedOffer={setSubmittedOffer} submittedOffer={submittedOffer}/>
          ) : (
            <MakeOfferForm setShowModal={setShowOfferModal} coinFounder={coinFounder} coin={coin} setSubmittedOffer={setSubmittedOffer}/>          
            )
          }

        </div>
    </div>
  ) : (
    <div>
      <ModalWeb3Connect setShowModal={setShowOfferModal}/>
    </div>
    ) : (
    <div className={`${dark ? darkCss : lightCss} fixed w-full bottom-0 text-center ${enable ? 'translate-y-0':'translate-y-full'} transition-all duration-300`}>
      <button className='bg-brand text-primary text-lg font-semibold rounded-lg my-4 py-2 px-8'
        onClick={handleOnClick}>
        {CTAText}
      </button>
    </div>
  )
}

export default MakeOffer