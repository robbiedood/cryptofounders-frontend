import React, { useState, useEffect, useContext } from 'react'
import { FiShare2, FiMoreHorizontal } from 'react-icons/fi'
import { ThemeContext, darkCss, lightCss } from '../ThemeContext';
import { Headshot } from './Headshot';

const CoinName = (props:any) => {
  const { name } = props
  const { dark } = useContext(ThemeContext);
  const handleOnClick = () => {
    
  }
  return (
    <div className='flex items-center ml-4 mt-4'>
      <p className='text-xl font-bold mr-4'>{`${name}` + " Coin"}</p>
      <button onClick={handleOnClick}>
        <FiShare2 size='24' className='hover:opacity-80' color={`${ dark ? 'white' : '#041d11'}`}/>
      </button>
    </div>
  )
}

const FounderName = (props:any) => {
  const { name } = props
  const { dark } = useContext(ThemeContext);
  const handleOnClick = () => {
  }

  return (
    <div className='flex items-center ml-4 mt-2'>
      <p className='font-semibold mr-4'>{"by " + `${name}`}</p>
      <FiMoreHorizontal size='24' className='hover:opacity-80' color={`${ dark ? 'white' : '#041d11'}`} 
      onClick={handleOnClick}/>
    </div>
  )
}

const CoinFounder = ({coinName, founder}:any) => {
  const headshot = founder?.contact.headshot
  const founderName = founder?.contact.name
  const accountAddress = founder?.accountAddress
  return (
    <div className={``}>
      <Headshot headshotUrl={headshot} generatingSeed={accountAddress}/>
      <CoinName name={coinName} />
      <FounderName name={founderName} />
    </div>
  )
}

export default CoinFounder