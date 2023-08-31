


import ModeChanger from '@/components/homes/ModeChanger'
import HomeNine from '@/components/homes/homepageWrappers/HomeNine'
import React from 'react'

export const metadata = {
  title: 'Home-9 ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

export default function page() {
  return (
    <div style={{maxWidth:'100vw',overflow:'hidden'}}>
      
      <ModeChanger whiteMode={true}/>
        <HomeNine/>
    </div>
  )
}
