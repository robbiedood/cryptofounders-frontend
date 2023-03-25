import { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../redux/hooks'
import { NavContext } from "../NavContext"
import Web3Connect from "../components/Web3Connect";
import { ThemeContext, darkCss, lightCss } from '../ThemeContext';
import { tallyFormEmbedUrl, tallyFormTinyUrl } from "../constants";


export default function FoundPage() {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const isConnected = useAppSelector(state => state.isConnected.value)
  const founderProfile = useAppSelector(state => state.founderProfile.value)
  const isFounder = founderProfile.foundingCoins?.length > 0
  const { dark } = useContext(ThemeContext);
  const { menuOpen } = useContext(NavContext)

  const Link = ({ children, href }:any) => {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  };



  return ( isConnected && !isFounder ) ? (
      <div className={`${dark ? darkCss : lightCss} pt-24 z-0 h-screen ${menuOpen ? 'bg-gray-500 overflow-hidden' : ''}`}>
        <iframe src={tallyFormEmbedUrl} title="Let's Create Your Coin"
        className="w-full h-5/6"></iframe>
        <div className="text-right mr-4 mt-10">
          <button className="p-2 rounded-lg border-2 text-sm"
            onClick={()=> navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
  ) : (!isFounder) ? (
    <div className={`${dark ? darkCss : lightCss} pt-24 z-0 h-screen ${menuOpen ? 'bg-gray-500 overflow-hidden' : ''}`}>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-xl font-bold">{t('found-page.PleaseConnectWallet')}</h1>
        <Web3Connect text={`${t('ConnectWallet')}`}/>
        <h1 className="text-base mt-8">{'Do not have a wallet and no time to set one ?'}</h1>
        <h1 className="text-base underline mt-2">
          <Link href={tallyFormTinyUrl}>found anyway and let us prepare one for you</Link>
        </h1>
      </div>
    </div>
  ) : (
    <div className={`${dark ? darkCss : lightCss} pt-28 z-0 h-screen ${menuOpen ? 'bg-gray-500 overflow-hidden' : ''}`}>
        <p className="ml-4">{`You have found a coin`}</p>
        <div className="ml-4 mt-8">
          <button className="p-2 rounded-lg border-2 text-sm"
            onClick={()=> navigate('/account')}>
            Go to Account
          </button>
        </div>
        <div className="flex flex-col mt-20 items-center text-center">
          <h1>Wanna found more currency ?</h1>
          <div className='bg-brand text-white font-bold text-lg p-4 w-56 mx-auto mt-8 mb-16 rounded-xl cursor-pointer'
          >
          <Link href="https://discord.gg/7JEgNHWE">Join Our Discord</Link>
        </div>
        </div>
    </div>
  );
}