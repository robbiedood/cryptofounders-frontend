// 放在homepage 上的 tesimonials 至少需要 coin founders 自己的pitch
// 可以reuse HolderCard in CoinHolders

import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setTopHolders } from '../redux/topHoldersSlice';
import { HolderCard } from './CoinHolders'
import { getHolderByGraphQL } from '../utils/getData';

function Testimonials() {
  const dispatch = useAppDispatch()
  const coins = useAppSelector(state => state.coinAll.value);
  const holders = useAppSelector(state => state.topHolders.value);


  useEffect(() => {
    async function fetchData() {
      let queue = []
      for(let i=0; i<=coins.length; i++){
        const coin = coins[i] as any
        
        if(!coin?.holders) continue
  
        const holderData = await getHolderByGraphQL(coin.holders[0]) // [0] is the founder
        const contractAddress = coin.contractAddress
        queue.push({...holderData, desiredContractAddress: contractAddress})
      }

      dispatch(setTopHolders(queue))
      
    }

    fetchData();

  }, [coins])

  if(!holders || holders.length==0) return (<div>loading...</div>)

  return (
    <div className='lg:w-4/5 lg:mx-auto'>
      <div className='flex justify-center mt-8 mb-4 pt-4 border-t-4 text-lg lg:text-2xl border-brand-500'>
        <h2>Coin supporters <strong>say</strong></h2>
      </div>
      <div className='flex flex-wrap justify-center'>
        {
        holders.map( (holder:any, ind: number) => (
          <div className='lg:max-w-[320px]' key={`home-page-testimonial-holder_${ind}`} >
            <HolderCard holder={holder}
            showHoldingAmount={false}/>
          </div>
          )
        )
      }
    </div>
    </div>

  )
}


export default Testimonials
