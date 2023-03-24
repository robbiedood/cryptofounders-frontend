import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import logo from '../assets/logo.jpg'
import Menu from './Menu'
import { NavContext } from "../NavContext"
import { ThemeContext, darkCss, lightCss } from '../ThemeContext';
import { HeadshotMini } from './Headshot'

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div className='flex items-center cursor-pointer' onClick={handleClick}>
      <img className='w-16 rounded-full' src={logo}/>
      <p className='text-xl font-bold ml-2'>CryptoFounders</p>
    </div>
  )
}

const Nav = () => {
  const {menuOpen} = useContext(NavContext)
  const { dark } = useContext(ThemeContext);
  const founderContact = useAppSelector(state => state.founderProfile.value.contact)
  const isConnected = useAppSelector(state => state.isConnected.value)
  const {headshot} = founderContact

  return (
    <div className={`${dark ? darkCss : lightCss} fixed left-0 right-0 ${menuOpen ? '' : 'bg-opacity-50 backdrop-blur-xl'}`}>
      <div className={`flex justify-between p-4 items-center`}>
          <Logo/>
          <div className='flex mr-4 space-x-10 items-center'>
            {isConnected && 
            <div className='ml-4 mt-2'>
                <HeadshotMini headshotUrl={headshot}/>
            </div>
            }
            <Menu/>
          </div>
      </div>
    </div>
  )
}

export default Nav