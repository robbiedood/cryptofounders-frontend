import { useContext } from 'react'
import { addressTrim, ensTrim, nameTrim } from '../utils'
import { topNumOfHolders } from '../constants'
import { ThemeContext, darkCss, lightCss } from '../ThemeContext';
import { HolderHeadshot } from './Headshot';


const HoldingAmount = ({amount}:any) => {
  const { dark } = useContext(ThemeContext);
  return (
    <div className='text-center mt-4 mr-4'>
      <p className='font-semibold'>{amount}</p>
      <p className={`${ dark ? 'text-gray-500' : 'text-secondary-500'} text-sm`}>coins holding</p>
    </div>
  )
}

const HolderIdentification = (holder:any) => {
  const name = nameTrim(holder?.contact.name)
  const headshot = holder?.contact.headshot
  const ens = holder?.ens? holder?.ens : ''
  const address = holder?.accountAddress

  const displayAccount = ensTrim(ens) || addressTrim(address)

  return (
    <div className='flex ml-4 mt-4 items-center'>
      <HolderHeadshot headshotUrl={headshot} generatingSeed={address}/>
      <div className='flex flex-col ml-4'>
        <p className='font-semibold'>{name}</p>
        <p className='text-xs text-opacity-500'>{displayAccount}</p>
      </div>
    </div>
  )
}

export const HolderCard = (props:any) => {
  // 此時holdingCoins應該只有一對key-value pair
  const holder = props.holder
  const showHoldingAmount = props.showHoldingAmount
  const contractAddress = holder?.desiredContractAddress
  const amount = (holder?.holdingCoins[contractAddress] / 1000000000000000000).toString()
  const testimonial = holder?.testimonials.hasOwnProperty(contractAddress) ? holder?.testimonials[contractAddress] : ''
  const { dark } = useContext(ThemeContext);

  return (
    <div className='flex justify-center mt-4'>
      <div className={`flex flex-col border-2 border-${dark ? 'white' : 'secondary'} rounded-xl w-11/12`}>
        <div className='flex items-center justify-between text-center'>
          <HolderIdentification {...holder}/>
          {showHoldingAmount && <HoldingAmount amount={amount}/>}
        </div>
        <div className='my-4 mx-4 text-sm text-opacity-300'>
          {`${testimonial}`}
        </div>
      </div>
    </div>
  )
}

HolderCard.defaultProps = {
  showHoldingAmount: true, // default prop value
};

const CoinHolders = ({holders}:any) => {
  const topHolders = holders?.length > topNumOfHolders ? holders.slice(0, topNumOfHolders) : holders
  const { dark } = useContext(ThemeContext);
  return (
    <div className={``}>
      <h1 className='text-xl font-semibold ml-4 pt-12'>Top Holders</h1>
      <div className={`w-full h-0 border-b border-${dark ? 'white' : 'secondary'} my-4`}></div>
      {
        topHolders.map( (holder:any, ind: number) => (
          <HolderCard key={`holder_${ind}_${holder.accountAddress}`} holder={holder}/>
        ))
      }
    </div>
  )
}

export default CoinHolders