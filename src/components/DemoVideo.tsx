import { useState, useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'

const DemoVideo = ({src}:any) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //由於google chrome不支援 iframe 的 load event, 所以要用下面的方法, 而且return 要有一個<div>包起來
    const iframe = document.querySelector('iframe'); 
    const loadHandler = () => {
      setLoading(false);
    };
    iframe?.addEventListener('load', loadHandler);
    return () => {
      iframe?.removeEventListener('load', loadHandler);
    };
  }, []);


  return (
    <div className='flex w-full max-w-7xl justify-center'>
      {loading && 
        <div className='fixed top-48'>
          <FaSpinner className='animate-spin text-brand' size={28}/>
        </div>
      }
      <iframe className="w-full object-cover aspect-video" src={src} 
        allow="accelerometer; encrypted-media; gyroscope;"
        title="How to create your own unique coin in 21 sec"
        itemScope
        itemType="http://schema.org/VideoObject"
      />
    </div>
  )
  
}

export default DemoVideo