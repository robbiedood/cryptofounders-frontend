import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  // check if user is connected
  // if not, ask user to connect
  // if connected, go to found page
  const handleOnClick = () => {
    navigate('/found')
  }

  return (
      <div className={`p-4 text-center`}>
        {/* <div className='mt-12 text-xl font-medium'>
          {t('root-page.PersonalizedCoin')}
        </div> */}
        <div className='text-lg mt-8'>
          {t('root-page.Slogan')}
        </div>
        <div className='bg-brand text-white font-bold text-lg p-4 w-56 mx-auto mt-8 mb-16 rounded-xl cursor-pointer'
          onClick={handleOnClick}>
          {t('root-page.CTA')}
        </div>
        <div className='underline mb-8'>
          <a href="https://calendly.com/lukelu520/jingmint" target="_blank" rel="noreferrer">
            Hesitate? Schedule a 1:1 Demo with us!
          </a>
        </div>
      </div>

  )
}

export default CTA