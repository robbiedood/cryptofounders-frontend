import { useEffect, useState, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { FaPencilAlt } from 'react-icons/fa'
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { NavContext } from "../NavContext"
import { ThemeContext, darkCss, lightCss } from '../ThemeContext';
import { HeadshotEditable } from "../components/Headshot";
import { getHolderByGraphQL, getOffersByGraphQL } from "../utils/getData";
import { Wei2ETH, addressTrim, dateTimeTrim } from "../utils";
import { syncFounderData } from "../utils/syncData";
import Web3Connect from "../components/Web3Connect";
import { OfferContext } from "../ModalContext";
import { EditOffer, ReplyOffer } from "../components/AccountOffer";

const FounderName = (props:any) => {
  const { contact } = props
  const name  = contact?.name

  const handleEdit = () => {
    console.log('edit')
  }

  return (
    <div className='flex items-center ml-4 mt-2'>
      {name &&
      <div>
        <p className='font-semibold mr-4'>{name}</p>
        {/* <FaPencilAlt
          className="cursor-pointer -ml-6"
          color='gray'
          onClick={handleEdit}
        /> */}
      </div>}
    </div>
  )
}

const FoundingCoins = (props:any) => {
  const { coins } = props
  const { dark } = useContext(ThemeContext);
  const { name, whitePaper, contractAddress } = coins[0]
  
  return (
    <div>
      <div className="flex items-center mt-8">
        <p className='text-lg font-semibold ml-4'>{`You are the Founder of ${name} coin`}</p>
        {/* <p className='text-sm ml-4'>{addressTrim(contractAddress)}</p> */}
      </div>

      <div className={`w-full h-0 border-b border-${dark ? 'white' : 'secondary'} my-4`}></div>
      <h1 className='ml-4 mb-4'>{whitePaper}</h1>
    </div>
  )
}

const HoldingCoins = (props:any) => {
  //建議加上 holdingCoins 的 coinName (可以用contractaddress從backend查到)
  const { holderID } = props
  const [ holdingCoinsObj, setHoldingCoinsObj ] = useState<any>({})
  const { dark } = useContext(ThemeContext);


  useEffect(() => {
    
    const fetchData = async () => {
      const holder = await getHolderByGraphQL(holderID)
      setHoldingCoinsObj(holder.holdingCoins)
    }
    fetchData();

  }, [holderID])

  return (
    <div>
      <div className="flex border-b border-gray-200">
        <h1 className='pt-12 px-6 py-3 border-b-2 border-brand-500 font-bold text-brand-700'>Holding Coins</h1>
      </div>
      {/* <div className={`w-full h-0 border-b border-${dark ? 'white' : 'secondary'} my-4`}></div> */}
      <div className="grid grid-cols-2 gap-4 max-w-sm p-6">
        <div className=" p-2 text-center space-y-4">
          <p className="font-semibold">amount</p>
          {
            Object.values(holdingCoinsObj).map( (value:any, ind:number) => {
              const holdingAmount = Wei2ETH(value)
              return (
                <p key={`holdingCoins_${ind}`}>{`${holdingAmount}`}</p>
              )
            })
          }
        </div>
        <div className="p-2 text-left space-y-4">
          <p className="font-semibold">contract address</p>
          {
            Object.keys(holdingCoinsObj).map( (key:any) => {
              return (
                <p key={`holdingCoins_${key}`}>{addressTrim(key)}</p>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

// Show received offers
const ReceivedOffer = ({offers}:any) => {
  
  const columnClass = "pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  const cellClass = "pl-6 py-4 whitespace-nowrap"

  const { showOfferModal, setShowOfferModal } = useContext(OfferContext)
  const [ replyingOffer, setReplyingOffer ] = useState<any>(null)

  const onClickOffer = (offer:any) => {
    setReplyingOffer(offer)
    setShowOfferModal(true)
  }

  return (
      <div className="w-full overflow-x-auto">
        <div className="py-2 inline-block shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className={columnClass}
                  >
                    Expire At
                  </th>
                  <th
                    scope="col"
                    className={columnClass}
                  >
                    Asking
                  </th>
                  <th
                    scope="col"
                    className={columnClass}
                  >
                    Paying
                  </th>
                  <th
                    scope="col"
                    className={columnClass}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {offers.map((offer:any, ind:number) => (
                  <tr key={offer._id} onClick={()=>onClickOffer(offer)}>
                    <td className={cellClass}>
                      <div className="text-sm text-gray-900">{dateTimeTrim(offer.expireAt)}</div>
                    </td>
                    <td className={cellClass}>
                      <div className="text-sm text-gray-900">{offer.desiredAmount}</div>
                    </td>
                    <td className={cellClass}>
                      <div className="text-sm text-gray-900">{offer.payingAmount}</div>
                    </td>
                    <td className={cellClass}>
                      <div className="text-sm text-gray-900">{offer.status}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showOfferModal && <ReplyOffer offer={replyingOffer} setOffer={setReplyingOffer} />}
        </div>
      </div>
  )
}

// Show submitted offers
const SubmittedOffer = ({offers}:any) => {

  const columnClass = "pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  const cellClass = "pl-6 py-4 whitespace-nowrap"
  const { showOfferModal, setShowOfferModal } = useContext(OfferContext)
  const [ editingOffer, setEditingOffer ] = useState<any>(null)

  const onClickOffer = (offer:any) => {
    setEditingOffer(offer)
    setShowOfferModal(true)
  }

  return (
      <div className="w-full overflow-x-auto">
        <div className="py-2 inline-block shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className={columnClass}
                  >
                    Expire At
                  </th>
                  <th
                    scope="col"
                    className={columnClass}
                  >
                    Asking
                  </th>
                  <th
                    scope="col"
                    className={columnClass}
                  >
                    Paying
                  </th>
                  <th
                    scope="col"
                    className={columnClass}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {offers.map((offer:any, ind:number) => (
                  <tr key={offer._id} onClick={() => onClickOffer(offer)}>
                    <td className={cellClass}>
                      <div className="text-sm text-gray-900">{dateTimeTrim(offer.expireAt)}</div>
                    </td>
                    <td className={cellClass}>
                      <div className="text-sm text-gray-900">{offer.desiredAmount}</div>
                    </td>
                    <td className={cellClass}>
                      <div className="text-sm text-gray-900">{offer.payingAmount}</div>
                    </td>
                    <td className={cellClass}>
                      <div className="text-sm text-gray-900">{offer.status}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        {showOfferModal && <EditOffer offer={editingOffer} setOffer={setEditingOffer} />}
      </div>
  )
}

// Call to Action for founder who has not found any coin yet
const CTAFoundCoin = (props:any) => {
  const {accountAddress} = props

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/found')
  }

  return (
    <div className="flex flex-col items-center">    
      <p className="ml-8 mt-2 self-start text-sm">{`${addressTrim(accountAddress)}`}</p>
      <p className="ml-8 mt-2 self-start text-lg">You are not a coin founder yet</p>
      <div className='mt-16 mb-4 mx-16 bg-brand p-4 text-center text-white text-lg font-bold rounded-xl cursor-pointer'>
        <button
          onClick={handleOnClick}
          >
          Found Your Coin
        </button>
      </div>
    </div>
  )
}

const OfferTabs = (props:any) => {

  const { submittedOfferIds, receivedOfferIds } = props
  const [ submittedOffers, setSubmittedOffers ] = useState<any>([])
  const [ receivedOffers, setReceivedOffers ] = useState<any>([])
  const { showOfferModal } = useContext(OfferContext)

  const [activeTab, setActiveTab] = useState('received');
  const { dark } = useContext(ThemeContext);

  const fectchsubmittedOffers = async () => {
    return await getOffersByGraphQL(submittedOfferIds)
  }

  const fectchreceivedOffers = async () => {
    return await getOffersByGraphQL(receivedOfferIds)
  }

  useEffect(() => {
    if (activeTab === 'submitted') {
      fectchsubmittedOffers().then((res:any) => {
        setSubmittedOffers(res)
      })
    } else if (activeTab === 'received') {
      fectchreceivedOffers().then((res:any) => {
        setReceivedOffers(res)
      })
    }
  }, [activeTab, showOfferModal])

  const handleTabClick = (tab:string) => {
    setActiveTab(tab);
  };

  return (
    <div className={`${dark ? darkCss : lightCss} w-full`}>
      <div className="flex border-b border-gray-200">
        <button
          className={`px-6 py-3 ${
            activeTab === 'received'
              ? 'border-b-2 border-brand-500 font-bold text-brand-700'
              : 'text-gray-500'
          }`}
          onClick={() => handleTabClick('received')}
        >
          Received Offers
        </button>
        <button
          className={`px-6 py-3 ${
            activeTab === 'submitted'
              ? 'border-b-2 border-brand-500 font-bold text-brand-700'
              : 'text-gray-500'
          }`}
          onClick={() => handleTabClick('submitted')}
        >
          Submitted Offers
        </button>
      </div>
      {activeTab === 'received' && <ReceivedOffer offers={receivedOffers} />}
      {activeTab === 'submitted' && <SubmittedOffer offers={submittedOffers} />}
    </div>
  );
};

export default function AccountPage() {

  const dispatch = useAppDispatch()
  const { t } = useTranslation();
  const founderProfile = useAppSelector(state => state.founderProfile.value)
  const contact = founderProfile.contact
  const accountAddress = founderProfile.accountAddress
  const isConnected = useAppSelector(state => state.isConnected.value)
  const isFounder = founderProfile.foundingCoins.length > 0 ? true : false
  const { dark } = useContext(ThemeContext);
  const { menuOpen } = useContext(NavContext)

  useEffect(() => {
    // get founder data from backend (如果剛用Tally found完coin，資料會在後端更新，所以要再抓一次)
    syncFounderData(accountAddress, dispatch)
    console.log('i am syncing founder data')
    const intervalId = setInterval(() => {
      syncFounderData(accountAddress, dispatch);
  }, 10*1000); // 每10秒重新 fetch founder profile

  // clean up any effects when the component is unmounted. ensure that the interval won't keep running in the background even when the component is no longer displayed, potentially leading to memory leaks.
  return () => {
    clearInterval(intervalId);
  };
  }, [])


  return isConnected ? (
    <div className={`${dark ? darkCss : lightCss} pt-24 h-screen ${menuOpen ? 'bg-gray-500 overflow-hidden' : ''}`}>
        <HeadshotEditable headshotUrl={contact.headshot} generatingSeed={accountAddress}/>
        {!isFounder && <CTAFoundCoin accountAddress={accountAddress}/>}
        <FounderName contact={contact}/>
        {isFounder && <FoundingCoins coins={founderProfile.foundingCoins}/>}
        <div className="mt-8">
          <OfferTabs submittedOfferIds={founderProfile.offerSubmitted} receivedOfferIds={founderProfile.offerReceived}/>
        </div>
        <HoldingCoins holderID={founderProfile.holderID}/>
    </div>
  ) : (
    <div className={`${dark ? darkCss : lightCss} pt-24 z-0 h-screen ${menuOpen ? 'bg-gray-500 overflow-hidden' : ''}`}>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-xl font-bold">{t('account-page.PleaseConnectWallet')}</h1>
        <Web3Connect text={`${t('ConnectWallet')}`}/>
      </div>
    </div>
  );
}