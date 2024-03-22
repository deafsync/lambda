






import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import EventDetails from '@/components/events/EventDetails'


import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import React from 'react'
export const metadata = {
  title: 'Event-details ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}
export default function page({ params }) {
  return (
    <div className="main-content">
      <Preloader/>
      <Header/>
      <div className="content-wrapper js-content-wrapper overflow-hidden">
          <PageLinks/>
          <EventDetails id={params.id} />
    
          <FooterOne/>
      </div>
    </div>
  )
}
