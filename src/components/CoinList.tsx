import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { useTranslation } from 'react-i18next';
import { ThemeContext, darkCss, lightCss } from '../ThemeContext';
import { NavContext } from "../NavContext"
import { HeadshotMini } from './Headshot';
import { getFounderByGraphQL } from '../utils/getData';


const CoinSummary = (props:any) => {
  const {n, name, whitePaper, contractAddress, founderID} = props
  const navigate = useNavigate();
  const { dark } = useContext(ThemeContext);
  const [contact, setContact] = useState<any>(null)

  const handleClick = () => {
    if(contractAddress) navigate(`/coins/${contractAddress}`)
  }

  useEffect(() => {
    const fetchFounder = async () => {
      const founder = await getFounderByGraphQL({_id: founderID})
      setContact(founder.contact)
    }
    fetchFounder()
  }, [])

  return (
    <div className={`flex p-4 items-center cursor-pointer ${dark ? 'hover:bg-gray-500' : 'hover:bg-gray-50'}`} onClick={handleClick}>
      {/* <div className='pr-4 text-base text-opacity-50 font-semibold'>
        {n}
        <HeadshotMini headshotUrl={'https://robohash.org/jingmint?size=128x128'} />
      </div> */}
      <div className='flex flex-col text-base font-semibold w-28'>
        <div className='ml-1'>
          <HeadshotMini headshotUrl={contact?.headshot} />
        </div>
        <p className=''>
          {name}
        </p>
      </div>
      
      <div className='pl-2 text-sm font-medium w-52 h-10 line-clamp-2 
      lg:w-1/2 lg:line-clamp-2'>
        {whitePaper}
      </div>
  </div>
  )  
}

const CoinList = () => {

  const { t } = useTranslation()
  // 使用useAppSelector會造成多次renderings, why ?
  // 可考慮使用記憶體中的資料or reselect library
  const allCoins = useAppSelector(state => state.coinAll.value)
  const { showNumOfCoinsPerColumn, toggleView } = useContext(NavContext)
  const { dark } = useContext(ThemeContext);
  const [ isViewAll, setIsViewAll ] = useState(false)
  const [width, setWidth] = useState(window.innerWidth);
  
  const handleOnClickViewAll = () => {
    toggleView(width, allCoins.length)
    setIsViewAll(!isViewAll)
  }

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`pt-20`}>
      <div className='flex justify-between items-center'>
        <div className='text-xl font-medium m-4'>
          {t('root-page.Trending')}
        </div>
        <div className={`text-sm font-medium mr-8 cursor-pointer ${dark ? 'hover:bg-gray-500' : 'hover:bg-gray-50'}`}
          onClick={handleOnClickViewAll}>
          {
           isViewAll ? t('root-page.viewless') : t('root-page.viewall')
          }
        </div>
      </div>
      <div className={`w-full h-0 border-b border-${dark ? 'white' : 'secondary'} mb-4`}></div>
      
      <div className='flex'>
        {/* Coin list starts */}
        <div className=''>
          <div className='flex pl-4 pr-14'>
            <div className={`ml-2 mr-2 text-sm font-medium ${ dark ? 'text-gray-500' : 'text-secondary-500'}`}>
              {t('root-page.CoinName')}
            </div>
            <div className={`ml-16 text-sm font-medium ${ dark ? 'text-gray-500' : 'text-secondary-500'}`}>
              {t('root-page.ValueProposition')}
            </div>
          </div>
          {
            allCoins.map((coin:any, ind:number) => {
              return  (ind < showNumOfCoinsPerColumn) && (
                <CoinSummary key={'coin'+ind} 
                n={ind+1} name={coin.name} whitePaper={coin.whitePaper}
                contractAddress={coin.contractAddress} founderID={coin.founder}/>
            )
          })
          }
        </div>
        {/* Coin list ends */}

        {/* Show one more column of coins if user screen width > 1024 */}
        { (width > 1024) &&
        <div className=''>
          <div className='flex pl-4 pr-14'>
            <div className={`ml-2 mr-2 text-sm font-medium ${ dark ? 'text-gray-500' : 'text-secondary-500'}`}>
              {t('root-page.CoinName')}
            </div>
            <div className={`ml-16 text-sm font-medium ${ dark ? 'text-gray-500' : 'text-secondary-500'}`}>
              {t('root-page.ValueProposition')}
            </div>
          </div>
          {
            allCoins.map((coin:any, ind:number) => {
              return  (ind >= showNumOfCoinsPerColumn && ind < 2*showNumOfCoinsPerColumn) && (
                <CoinSummary key={'coin'+ind+showNumOfCoinsPerColumn} 
                n={ind+1} name={coin.name} whitePaper={coin.whitePaper}
                contractAddress={coin.contractAddress} founderID={coin.founder}/>
            )
          })
          }
        </div>
        }

      </div>
      <div className='flex justify-end text-sm font-medium mr-12 mb-4 mt-4 cursor-pointer'>
          <div className={`${dark ? 'hover:bg-gray-500' : 'hover:bg-gray-50'}`}
            onClick={handleOnClickViewAll}>{
              isViewAll ? t('root-page.viewless') : t('root-page.viewall')
            }
          </div>
      </div>
      <div className={`w-full h-0 border-b border-${dark ? 'white' : 'secondary'}`}></div>
    </div>
  )
}

export default CoinList