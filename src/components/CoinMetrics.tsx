import { useContext } from 'react'
import { priceChart } from '../assets'
import { ThemeContext, darkCss, lightCss } from '../ThemeContext';

const MarketPrice = ({price}:any) => {
  //顯示時用listing price instead of market price
  const { dark } = useContext(ThemeContext);
  return (
    <div className='text-center'>
      <p className='text-lg font-semibold'>{price}</p>
      <p className={`${ dark ? 'text-gray-500' : 'text-secondary-500'} text-sm`}>listing price</p>
    </div>
  )
}

const TotalSupply = ({amount}:any) => {
  const { dark } = useContext(ThemeContext);
  return (
    <div className='text-center'>
      <p className='text-lg font-semibold'>{amount}</p>
      <p className={`${ dark ? 'text-gray-500' : 'text-secondary-500'} text-sm`}>totoal supply</p>
    </div>
  )
}

const NumOfHolders = ({num}:any) => {
  const { dark } = useContext(ThemeContext);
  return (
    <div className='text-center'>
      <p className='text-lg font-semibold'>{num}</p>
      <p className={`${ dark ? 'text-gray-500' : 'text-secondary-500'} text-sm`}>holders</p>
    </div>
  )
}

const NumOfTransactions = ({num}:any) => {
  const { dark } = useContext(ThemeContext);
  return (
    <div className='text-center'>
      <p className='text-lg font-semibold'>{num}</p>
      <p className={`${ dark ? 'text-gray-500' : 'text-secondary-500'} text-sm`}>transactions</p>
    </div>
  )
}

const PriceChart = () => {
  return (
    <div className={`mt-8`}>
      <img className='w-full' src={priceChart}/>
    </div>
  )
}

const CoinMetrics = ({metrics}:any) => {

  const marketPrice = metrics?.marketPrice
  //totalSupply 要除以10^18, 要展開10^18, 並且最後要 toString(), 不然會發生NaN錯誤
  const totalSupply = (metrics?.totalSupply / 1000000000000000000).toString()
  const numOfHolders = metrics?.numOfHolders
  const numOfTransactions = metrics?.numOfTransactions

  const { dark } = useContext(ThemeContext);

  return (
    <div className={`mt-12`}>
      <h1 className='text-xl font-semibold ml-4'>Metrics</h1>
      <div className={`w-full h-0 border-b border-${dark ? 'white' : 'secondary'} my-4`}></div>
      <div className='flex justify-between mx-4 lg:justify-start lg:space-x-32'>
        <MarketPrice price={marketPrice}/>
        <TotalSupply amount={totalSupply}/>
        <NumOfHolders num={numOfHolders}/>
        <NumOfTransactions num={numOfTransactions}/>
      </div>
      {/* <PriceChart/> */}
    </div>
  )
}

export default CoinMetrics