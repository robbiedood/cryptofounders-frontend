import axios from 'axios';
import { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { CgArrowsExchangeV } from 'react-icons/cg'
import { FaSpinner } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { ThemeContext, darkCss, lightCss } from '../ThemeContext'
import { API_MAKE_OFFER, API_WITHDRAW_OFFER, API_UPDATE_OFFER } from '../constants/APIs';
import { formValidation } from '../utils';
import { syncFounderData } from '../utils/syncData';
import { API_ACCEPT_OFFER, API_REJECT_OFFER } from '../constants/APIs';

export const MakeOfferForm = (prop: any) => {
  const { setShowModal, coinFounder, coin, setSubmittedOffer } = prop
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({ desiredAmount: "", payingAmount: "", payingCoinType: "GoerliETH", expireAt: "", addendum: "" });

  const [isAddendumChecked, setIsAddendumChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const founderProfile = useAppSelector(state => state.founderProfile.value)
  const foundingCoinNames = founderProfile.foundingCoins.map((c: any) => c.name)

  const handleFormChange = (event: any) => {

    let newValue = event.target.value;
    setFormData({ ...formData, [event.target.name]: newValue });

    if (event.target.name === 'payingCoinType') {
      if (!['OKT', 'ETH'].includes(newValue)) {
        setIsAddendumChecked(true)
      } else {
        setIsAddendumChecked(false)
      }
    }

  };

  const handleSubmit = async (event: any) => {

    event.preventDefault(); // Prevent page reload, and use axios to send data to backend
    setIsLoading(true)
    //do some validation here, at least check empty input
    const isFormValid = formValidation(formData)

    if (isFormValid === false) {
      setIsLoading(false)
      setErrorMsg("Please fill in all the fields") //show error message on the current modal
      return
    } else {
      setErrorMsg("")
    }

    // Perform action with formData here: Send formData to backend
    try {

      const res = await axios.post(API_MAKE_OFFER, {
        offererAddress: founderProfile.accountAddress,
        offereeAddress: coinFounder.accountAddress,
        contractAddress: coin.contractAddress,
        desiredAmount: formData.desiredAmount.toString() + ' ' + coin.name,
        payingAmount: formData.payingAmount.toString() + ' ' + formData.payingCoinType,
        expireAt: formData.expireAt,
        addendum: formData.addendum,
      })
      //sync up with backend, get updated founder profile
      await syncFounderData(founderProfile.accountAddress, dispatch)
      setShowModal(false)
      console.log('submitted: ', res.data)
      setSubmittedOffer(res.data)

    } catch (error) {
      console.log(error)
      setErrorMsg("Something went wrong, please try again later") //show error message on the current modal
    }

    setErrorMsg("")
    setIsLoading(false)

  };

  return (
    <form className={`bg-white`} onSubmit={handleSubmit}>

      <DesiredAmount coin={coin} formData={formData} handleChange={handleFormChange} />

      <div className='flex justify-center mb-4'>
        <CgArrowsExchangeV size={28} />
      </div>

      <PayingAmount formData={formData} handleChange={handleFormChange} foundingCoinNames={foundingCoinNames} />

      <ExpireAt formData={formData} handleChange={handleFormChange} />

      <Addendum isChecked={isAddendumChecked} setIsChecked={setIsAddendumChecked} formData={formData} handleChange={handleFormChange} />

      <SubmitBtn isLoading={isLoading} errorMsg={errorMsg} />

    </form>
  );
};

export const UpdateOfferForm = (prop: any) => {
  const { setShowModal, coin, submittedOffer, setSubmittedOffer } = prop
  const dispatch = useAppDispatch()

  const offerID = submittedOffer._id;
  const desiredAmount = parseFloat(submittedOffer.desiredAmount.split(' ')[0])
  const payingAmount = parseFloat(submittedOffer.payingAmount.split(' ')[0])
  const payingCoinType = submittedOffer.payingAmount.split(' ')[1]
  const expireAt = submittedOffer.expireAt
  const addendum = submittedOffer.addendum

  const [formData, setFormData] = useState({ desiredAmount, payingAmount, payingCoinType, expireAt, addendum });

  const [isAddendumChecked, setIsAddendumChecked] = useState(addendum ? true : false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const founderProfile = useAppSelector(state => state.founderProfile.value)
  const foundingCoinNames = founderProfile.foundingCoins.map((c: any) => c.name)

  const handleFormChange = (event: any) => {

    let newValue = event.target.value;
    setFormData({ ...formData, [event.target.name]: newValue });

    if (event.target.name === 'payingCoinType') {
      if (!['OKT', 'ETH'].includes(newValue)) {
        setIsAddendumChecked(true)
      } else {
        setIsAddendumChecked(false)
      }
    }

  };

  const handleReSubmit = async (event: any) => {

    event.preventDefault(); // Prevent page reload, and use axios to send data to backend
    setIsLoading(true)
    //do some validation here, at least check empty input
    const isFormValid = formValidation(formData)

    if (isFormValid === false) {
      setIsLoading(false)
      setErrorMsg("Please fill in all the fields") //show error message on the current modal
      return
    } else {
      setErrorMsg("")
    }

    // Perform action with formData here: Send formData to backend
    try {
      const res = await axios.post(API_UPDATE_OFFER, {
        _id: offerID,
        desiredAmount: formData.desiredAmount.toString() + ' ' + coin.name,
        payingAmount: formData.payingAmount.toString() + ' ' + formData.payingCoinType,
        expireAt: formData.expireAt,
        addendum: formData.addendum,
      })
      //sync up with backend, get updated founder profile
      await syncFounderData(founderProfile.accountAddress, dispatch)
      setShowModal(false)
      console.log('submitted: ', res.data)
      setSubmittedOffer(res.data)

    } catch (error) {
      console.log(error)
      setErrorMsg("Something went wrong, please try again later") //show error message on the current modal
    }

    setErrorMsg("")
    setIsLoading(false)

  };

  const handleWithDraw = async (event: any) => {
    event.preventDefault(); // Prevent page reload, and use axios to send data to backend
    setIsLoading(true)
    //do some validation here, at least check empty input
    // Perform action with formData here: Send formData to backend
    try {
      const res = await axios.post(API_WITHDRAW_OFFER, {
        _id: submittedOffer._id,
      })
      //sync up with backend, get updated founder profile
      // await syncFounderData(founderProfile.accountAddress, dispatch)
      setShowModal(false)
      console.log('offer widthdrawn: ', res.data)
      setSubmittedOffer(res.data)

    } catch (error) {
      console.log(error)
      setErrorMsg("Something went wrong, please try again later") //show error message on the current modal
    }

    setErrorMsg("")
    setIsLoading(false)
  }

  return (
    <form className={`bg-white`} onSubmit={handleReSubmit}>

      <DesiredAmount coin={coin} formData={formData} handleChange={handleFormChange} />

      <div className='flex justify-center mb-4'>
        <CgArrowsExchangeV size={28} />
      </div>

      <PayingAmount formData={formData} handleChange={handleFormChange} foundingCoinNames={foundingCoinNames} />

      <ExpireAt formData={formData} handleChange={handleFormChange} />

      <Addendum isChecked={isAddendumChecked} setIsChecked={setIsAddendumChecked} formData={formData} handleChange={handleFormChange} />

      {/* need a widthdraw and a re-submit btn */}
      <div className='space-y-4'>
        <ReSubmitBtn isLoading={isLoading} errorMsg={errorMsg} />
        <WithdrawBtn isLoading={isLoading} errorMsg={errorMsg} handleOnClick={handleWithDraw} />
      </div>

    </form>
  )
}

export const ReplyOfferForm = (prop: any) => {
  //必須考慮 Accept, Reject, Counter Offer 三種情況
  // Accept / Reject 直接改變 offer 的 status
  // TODO(Luke): Counter Offer 等於拒絕原Offer, offeree重提一個offer (此時offerer & offeree 的立場互換，並且把原本的 offerID 作為 addendum)
  
  const { setShowModal, coin, submittedOffer, setSubmittedOffer } = prop
  const dispatch = useAppDispatch()

  const offerID = submittedOffer._id;
  const desiredAmount = parseFloat(submittedOffer.desiredAmount.split(' ')[0])
  const payingAmount = parseFloat(submittedOffer.payingAmount.split(' ')[0])
  const payingCoinType = submittedOffer.payingAmount.split(' ')[1]
  const expireAt = submittedOffer.expireAt
  const addendum = submittedOffer.addendum

  const [formData, setFormData] = useState({ desiredAmount, payingAmount, payingCoinType, expireAt, addendum });

  const [isAddendumChecked, setIsAddendumChecked] = useState(addendum ? true : false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const founderProfile = useAppSelector(state => state.founderProfile.value)
  const foundingCoinNames = founderProfile.foundingCoins.map((c: any) => c.name)

  const handleFormChange = (event: any) => {

    let newValue = event.target.value;
    setFormData({ ...formData, [event.target.name]: newValue });

    if (event.target.name === 'payingCoinType') {
      if (!['OKT', 'ETH'].includes(newValue)) {
        setIsAddendumChecked(true)
      } else {
        setIsAddendumChecked(false)
      }
    }

  };

  const handleAccept = async (event: any) => {
    event.preventDefault(); // Prevent page reload, and use axios to send data to backend
    setIsLoading(true)
    //do some validation here, at least check empty input
    // Perform action with formData here: Send formData to backend
    try {
      const res = await axios.post(API_ACCEPT_OFFER, {
        _id: submittedOffer._id,
      })
      //sync up with backend, get updated founder profile
      // await syncFounderData(founderProfile.accountAddress, dispatch)
      setShowModal(false)
      console.log('offer rejected: ', res.data)
      setSubmittedOffer(res.data)

    } catch (error) {
      console.log(error)
      setErrorMsg("Something went wrong, please try again later") //show error message on the current modal
    }

    setErrorMsg("")
    setIsLoading(false)
  }

  const handleReject = async (event: any) => {
    event.preventDefault(); // Prevent page reload, and use axios to send data to backend
    setIsLoading(true)
    //do some validation here, at least check empty input
    // Perform action with formData here: Send formData to backend
    try {
      const res = await axios.post(API_REJECT_OFFER, {
        _id: submittedOffer._id,
      })
      //sync up with backend, get updated founder profile
      // await syncFounderData(founderProfile.accountAddress, dispatch)
      setShowModal(false)
      console.log('offer rejected: ', res.data)
      setSubmittedOffer(res.data)

    } catch (error) {
      console.log(error)
      setErrorMsg("Something went wrong, please try again later") //show error message on the current modal
    }

    setErrorMsg("")
    setIsLoading(false)
  }

  const handleCounter = async (event: any) => {

    event.preventDefault(); // Prevent page reload, and use axios to send data to backend
    setIsLoading(true)
    //do some validation here, at least check empty input
    const isFormValid = formValidation(formData)

    if (isFormValid === false) {
      setIsLoading(false)
      setErrorMsg("Please fill in all the fields") //show error message on the current modal
      return
    } else {
      setErrorMsg("")
    }

    // Perform action with formData here: Send formData to backend
    try {
      const res = await axios.post(API_UPDATE_OFFER, {
        _id: offerID,
        desiredAmount: formData.desiredAmount.toString() + ' ' + coin.name,
        payingAmount: formData.payingAmount.toString() + ' ' + formData.payingCoinType,
        expireAt: formData.expireAt,
        addendum: formData.addendum,
      })
      //sync up with backend, get updated founder profile
      await syncFounderData(founderProfile.accountAddress, dispatch)
      setShowModal(false)
      console.log('submitted: ', res.data)
      setSubmittedOffer(res.data)

    } catch (error) {
      console.log(error)
      setErrorMsg("Something went wrong, please try again later") //show error message on the current modal
    }

    setErrorMsg("")
    setIsLoading(false)

  };

  return (
    <form className={`bg-white`} onSubmit={handleCounter}>
      <fieldset disabled>

      <DesiredAmount coin={coin} formData={formData} handleChange={handleFormChange} />

      <div className='flex justify-center mb-4'>
        <CgArrowsExchangeV size={28} />
      </div>

      <PayingAmount formData={formData} handleChange={handleFormChange} foundingCoinNames={foundingCoinNames} />

      <ExpireAt formData={formData} handleChange={handleFormChange} />

      <Addendum isChecked={isAddendumChecked} setIsChecked={setIsAddendumChecked} formData={formData} handleChange={handleFormChange} />

      { submittedOffer.status === 'pending' && (
      <div className='flex justify-evenly'>
        <AcceptBtn isLoading={isLoading} errorMsg={errorMsg} handleOnClick={handleAccept} />
        <RejectBtn isLoading={isLoading} errorMsg={errorMsg} handleOnClick={handleReject} />
      </div>
      )
      }

      </fieldset>
    </form>
  )
}

const DesiredAmount = (props: any) => {
  const { coin, formData, handleChange } = props
  return (
    <div className="flex items-center mb-4">
      <input
        className="border border-gray-400 p-2 w-1/2 rounded-lg rounded-r-none text-center"
        type="number"
        id="desiredAmount"
        name="desiredAmount" //name needs to add a random string to avoid browser autocomplete
        autoComplete="0xoff" // also, autoComplete needs to turn off with a random string as well.
        value={formData.desiredAmount}
        onChange={handleChange}
      />
      <label className=" text-gray-700 font-medium w-1/2 text-center border py-2 bg-gray-200 rounded-r-lg">
        {coin?.name}
      </label>
    </div>
  )
}

const PayingAmount = (props: any) => {
  const { formData, handleChange, foundingCoinNames } = props
  return (
    <div className="flex items-center mb-8 text-gray-700 font-medium">
      <input
        className="border border-gray-400 p-2 w-1/2 rounded-lg rounded-r-none text-center"
        type="number"
        id="payingAmount"
        name="payingAmount"  //name needs to add a random string to avoid browser autocomplete
        autoComplete="0xoff" // also, autoComplete needs to turn off with a random string as well.
        value={formData.payingAmount}
        onChange={handleChange}
      />
      <select
        className="block w-1/2 bg-gray-200 border py-2 rounded-r-lg shadow focus:outline-none text-center"
        id="payingCoinType"
        name="payingCoinType"
        value={formData.payingCoinType}
        onChange={handleChange}
      >
        {
          foundingCoinNames.map((c: any, ind: number) => <option key={`${ind}+${c}`}>{c}</option>)
        }
        <option key={'10k-OKT'}>OKT</option>
        <option key={'100k-ETH'}>ETH</option>
      </select>
    </div>
  )
}

const ExpireAt = (props: any) => {
  const { formData, handleChange } = props
  return (
    <div className="mb-4">
      <label className="" htmlFor='expireAt'>
        Expire at
        <input
          className="ml-1 border h-12 rounded-lg"
          type="datetime-local"
          id="expireAt"
          name="expireAt"
          value={formData.expireAt}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}

const Addendum = (props: any) => {
  const { isChecked, setIsChecked, formData, handleChange } = props
  return (
    <div className="mb-4">
      {/* use htmlFor, 當check label時也會有作用 */}
      <label className="block text-gray-700 font-medium" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          className='w-4 mr-2'
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        Addendum
      </label>
      {
        isChecked && (
          <textarea
            className="border border-gray-400 p-2 w-full"
            id="addendum"
            name="addendum"
            rows={2}
            value={formData.addendum}
            onChange={handleChange}
            placeholder='Include more details to convince the founder for the exchange'
          />
        )
      }
    </div>
  )
}

const SubmitBtn = (props: any) => {
  const { handleSubmit, isLoading, errorMsg } = props
  return (
    <div className='flex flex-col justify-center items-center'>
      <button className="bg-brand text-white font-semibold py-2 px-4 rounded-lg" onClick={handleSubmit}>
        {isLoading ? (<FaSpinner className='animate-spin' />) : (<p> Submit Your Offer</p>)}
      </button>
      <p className='text-red-600 text-sm mt-2'>{errorMsg}</p>
    </div>
  )
}

const ReSubmitBtn = (props: any) => {
  const { handleSubmit, isLoading, errorMsg } = props
  return (
    <div className='flex flex-col justify-center items-center'>
      <button className="bg-brand text-white font-semibold py-2 px-4 rounded-lg" onClick={handleSubmit}>
        {isLoading ? (<FaSpinner className='animate-spin' />) : (<p> Re-Submit Offer</p>)}
      </button>
      <p className='text-red-600 text-sm mt-2'>{errorMsg}</p>
    </div>
  )
}

const WithdrawBtn = (props: any) => {
  const { handleOnClick, isLoading, errorMsg } = props

  return (
    <div className='flex flex-col justify-center items-center'>
      <button className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg" onClick={handleOnClick}>
        {isLoading ? (<FaSpinner className='animate-spin' />) : (<p> Withdraw Offer</p>)}
      </button>
      <p className='text-red-600 text-sm mt-2'>{errorMsg}</p>
    </div>
  )
}

const AcceptBtn = (props: any) => {
  const { handleOnClick, isLoading, errorMsg } = props

  return (
    <div className='flex flex-col justify-center items-center'>
      <button className="bg-brand text-white font-semibold py-2 px-4 rounded-lg" onClick={handleOnClick}>
        {isLoading ? (<FaSpinner className='animate-spin' />) : (<p> Accept</p>)}
      </button>
      <p className='text-red-600 text-sm mt-2'>{errorMsg}</p>
    </div>
  )
}

const RejectBtn = (props: any) => {
  const { handleOnClick, isLoading, errorMsg } = props

  return (
    <div className='flex flex-col justify-center items-center'>
      <button className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg" onClick={handleOnClick}>
        {isLoading ? (<FaSpinner className='animate-spin' />) : (<p> Reject</p>)}
      </button>
      <p className='text-red-600 text-sm mt-2'>{errorMsg}</p>
    </div>
  )
}