import {useContext} from 'react'
import { ThemeContext, darkCss, lightCss } from '../ThemeContext';

const CTAOffer = ({coinName}:any) => {
  const {dark} = useContext(ThemeContext);

  const handleOnClick = () => {

  }

  return (
    <div className={`${dark ? darkCss : lightCss} flex flex-col text-center items-center pt-8`}>
      <p className='text-xl font-medium'>
        {`Want ${coinName} Coin ?`}
      </p>
      <div className='text-opacity-500 text-sm mt-4'>
        <p>Offer any kind of cryptos, </p>
        <p>ETH, GoerliETH or personalized coins !</p>
      </div>
    </div>
  )
}

export default CTAOffer