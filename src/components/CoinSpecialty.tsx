import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext';
import { robbie } from '../assets';


function isVideo(url:string) {

  //TODO(luke): 要區分 youtube, vimeo 還是 aws s3 上的video, 會有不同的處理方式
  const videoStrings = ['mp4', 'webm', 'youtube', 'vimeo', 'avi', 'mov'];
  return videoStrings.some((videoString) => url?.includes(videoString));
}

function isImage(url:string) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  return imageExtensions.some((imgExt) => url?.includes(imgExt));
}

const CoinSpecialty = (props:any) => {
  const { coinName, whitePaper, founder } = props;
  const { dark } = useContext(ThemeContext);
  const supplement = founder?.contact?.supplement

  return (
    <div className={`mt-12`}>
      <div className='ml-4 text-lg font-semibold'>
        {`What's ${coinName} Coin for ?`}
      </div>
      
      <div className={`w-full h-0 border-b border-${dark ? 'white' : 'secondary'} my-4`}></div>

      <div className='ml-4'>
        {whitePaper}
      </div>
      <div className='flex flex-col mt-8 justify-center items-center text-gray-600 text-sm text-center'>
        {isImage(supplement) ? (
          <img className='w-full max-w-7xl' src={supplement} />
        ) : isVideo(supplement) ? (
          <iframe className='w-full lg:max-w-7xl aspect-video' src={supplement} />
        ) : ( 
          <>
            <p>{"When the founder video is pending,"}</p>
            <p>{"the web3 bernedoodle shows up :)"}</p>
            <img className='w-full max-w-max' src={robbie} />
          </>
        ) 
        }
      </div>
    </div>
  )
}

export default CoinSpecialty