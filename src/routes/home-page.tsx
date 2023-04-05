import { useContext, useEffect } from "react"
import { useAppDispatch } from '../redux/hooks'
// import Category from "../components/Category"
import { setCoinAll } from '../redux/coinAllSlice'
import { getAllCoinsByGraphQL } from "../utils/getData"
import DemoVideo from "../components/DemoVideo"
import CoinList from "../components/CoinList"
import CTA from "../components/CTA"
import Footer from "../components/Footer"
import { NavContext } from "../NavContext"
import { ThemeContext, darkCss, lightCss } from '../ThemeContext';
import Testimonials from "../components/Testimonials"

export default function HomePage() {

  const { dark } = useContext(ThemeContext);
  const { menuOpen } = useContext(NavContext);
  const dispatch = useAppDispatch()
  //auto login 功能, 在頁面刷新時, 保持登入狀態, 獲取最新的founder profile (from backend)
  useEffect( () => {
    const autoLogin = async () => {
    }
    autoLogin();
  }, [])

  // 需要一個方法, 避免每次都要重新 fetch coins
  useEffect( () => {
    const fectchCoins = async () => {
      const allCoins = await getAllCoinsByGraphQL()
      dispatch(setCoinAll(allCoins))
    }
    console.log('First-fetching coins')
    fectchCoins();

    const intervalId = setInterval(() => {
        fectchCoins();
        console.log('Re-fetching coins')
    }, 60*1000); // 每60秒重新 fetch coins

    return () => {
      clearInterval(intervalId);
    };

  }, [])

  return (
    <div className={`${dark ? darkCss : lightCss} w-full`}>
      <div className={`pt-24 z-0 h-screen ${menuOpen ? 'bg-gray-500 overflow-hidden' : ''}`}>
          {/* <Category/> */}
          <div className="flex mt-4 justify-center">
            {/* <DemoVideo src={"https://www.youtube.com/embed/M6k9ZZVTHFQ?autoplay=1&controls=0&mute=1loop=1&modestbranding=1"}/> */}
            {/* <DemoVideo src={"https://player.vimeo.com/video/811707993?autoplay=1&loop=1&muted=1&controls=0"} /> */}
          </div>
        <CoinList/>
        <Testimonials/>
        <CTA/>
        <Footer/>
      </div>
    </div>
  )
}