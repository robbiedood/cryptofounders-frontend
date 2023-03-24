import { useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { FaChevronRight, FaChevronLeft, FaCheck } from 'react-icons/fa'
import { FiFeather, FiUser, FiMoon } from 'react-icons/fi'
import { MdLanguage } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { NavContext } from "../NavContext"
import Web3Connect from './Web3Connect';
import { ThemeContext, darkCss, lightCss } from '../ThemeContext';

const LanguageMenu = ({setShowLanguageMenu}:any) => {

  const {t, i18n } = useTranslation();

  const changeLanguage = (lng:any) => {
    i18n.changeLanguage(lng);
  };

  return (
      <div>
        <div>
          <div className='flex items-center py-2 cursor-pointer'
            onClick={()=> setShowLanguageMenu(false)}>
            <FaChevronLeft color='#0041d11'/>
            <p className='font-semibold ml-4'>{t('Language')}</p>
          </div>
          <div className="w-full h-0 border-b border-secondary-500 my-4"></div>
        </div>
        <div className='flex justify-between mt-4 py-4 cursor-pointer hover:opacity-80'
          onClick={()=> changeLanguage('en')}>
            <p className='ml-4 text-base font-bold'>English</p>
            { (i18n.language == 'en') && <FaCheck color='#0041d11'/>}
        </div>
        <div className='flex justify-between mt-4 py-4 cursor-pointer hover:opacity-80'
        onClick={()=> changeLanguage('zh-TW')}>
            <p className='ml-4 text-base font-bold'>繁體中文</p>
            { (i18n.language == 'zh-TW') && <FaCheck color='#0041d11'/>}
        </div>
        <div className='flex justify-between mt-4 py-4 cursor-pointer hover:opacity-80'
        onClick={()=> changeLanguage('zh-CN')}>
            <p className='ml-4 text-base font-bold'>简体中文</p>
            { (i18n.language == 'zh-CN') && <FaCheck color='#0041d11'/>}
        </div>
      </div>
  )
}

const AccountMenu = ({setShowAccountMenu}:any) => {

}

const Menu = () => {
  /**
   * TODO(Luke):
   *  - 當 screen size >= 1200 時, menu icon消失, 改成列在 header
   *  - (optional) 當 screen size 在 desktop ~ max mobile (opensea是以 1024 為邊界), menu item的寬度固定在 ~400 左右. 
   *      => 暫時不需要為了 1024 ~ 1199特別製作一個case, 等到後面phase再考慮
   */
  const navigate = useNavigate()
  const isConnected = useAppSelector(state => state.isConnected.value)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const { dark, toggleDark } = useContext(ThemeContext);
  const {t, i18n } = useTranslation();
  const {menuOpen, toggleMenu} = useContext(NavContext)
  const menu = useRef<any>(null)

  const closeOpenMenus = (e:any)=>{
    if(menu.current && menuOpen && !menu.current.contains(e.target)){
      toggleMenu();
      setShowLanguageMenu(false);
    }
  }

  const onClickLanguage = () => {
    setShowLanguageMenu(true)
  }

  const onClickFound = () => {
    //進入Found Page
    //P0-P1是 embed Tally Form
    toggleMenu()
    navigate('/found')
  }

  const onClickAccount = () => {
    //進入Account Page
    toggleMenu()
    navigate('/account')
  }

  document.addEventListener('mousedown',closeOpenMenus)


  return (
    <div className={``}>
      <div className='cursor-pointer'>
        {menuOpen ? <AiOutlineClose color={`${ dark ? 'white' : '#041d11'}`} size='28' onClick={toggleMenu}/>
        : <AiOutlineMenu color={`${ dark ? 'white' : '#041d11'}`} size='28' onClick={toggleMenu}/>
        }
      </div>
      <div ref={menu} className={`${dark ? darkCss : lightCss} fixed top-24 w-full lg:w-1/3 h-screen p-4
      ${menuOpen ? 'left-0 lg:left-2/3' : 'left-full'} transition-all duration-300`}
      >
        {showLanguageMenu ? (
          <LanguageMenu setShowLanguageMenu={setShowLanguageMenu}/>
        ) : (
        <div>
          <div className='flex mt-4 py-4 cursor-pointer hover:opacity-80'
            onClick={onClickFound}>
            <FiFeather color='#0041d11' size='24'/>
            <p className='ml-4 text-base font-bold'>{t('Found')}</p>
          </div>

          {isConnected ? (
            <div className='flex justify-between mt-4 py-4 cursor-pointer hover:opacity-80'
            onClick={onClickAccount}>
              <div className='flex'>
                <FiUser color='#0041d11' size='24'/>
                <p className='ml-4 text-base font-bold'>{t('Account')}</p>
              </div>
              {/* <FaChevronRight color='#0041d11'/> */}
            </div>
            ) : (
              <></>
            )}

          <div className='flex mt-4 py-4 justify-between cursor-pointer hover:opacity-80'
            onClick={onClickLanguage}>
            <div className='flex'>
              <MdLanguage color='#0041d11' size='24'/>
              <p className='ml-4 text-base font-bold'>{t('Language')}</p>
            </div>
            <div className='flex font-bold items-center'>
              <p className='mr-2'>{t(i18n.language)}</p>
              <FaChevronRight color='#0041d11'/>
            </div>
          </div>
          <div className='flex mt-4 py-4 justify-between cursor-pointer hover:opacity-80' onClick={toggleDark}>
            <div className='flex'>
              <FiMoon color='#0041d11' size='24'/>
              <p className='ml-4 text-base font-bold'>{t('NightMode')}</p>
            </div>
            <div className="relative flex items-center">
              <span className={`block w-10 h-6 rounded-full shadow-inner ${dark ? 'bg-brand' : 'bg-gray-500'}`}></span>
              <span className={`absolute inset-0 w-6 h-6 rounded-full bg-white shadow-md transition-transform ease-in-out duration-300 transform ${dark ? 'translate-x-full' : ''}`}></span>
            </div>
          </div>
          {!isConnected ? <Web3Connect text={`${t('ConnectWallet')}`}/> : (<></>)}
        </div>
        )}
      </div>
    </div>
  )
}

export default Menu