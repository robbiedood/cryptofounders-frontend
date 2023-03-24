import { AiOutlineCopyrightCircle } from 'react-icons/ai'
import { API_SITEMAP } from '../constants/APIs'

const Footer = () => {
  return (
    <div className='bg-brand p-4 text-xs text-primary'>
      <div className='flex p-2'>
        2023, JingMint<AiOutlineCopyrightCircle/>
      </div>
      <div className='p-2 cursor-pointer'>
        Privacy Policy
      </div>
      <div className='p-2 cursor-pointer'>
        Terms of Service
      </div>
      <div className='p-2 cursor-pointer'>
        <a href={API_SITEMAP}>Sitemap</a>
      </div>
    </div>
  )
}

export default Footer