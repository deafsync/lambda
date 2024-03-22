




import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'

import EventsTwo from '@/components/events/EventsTwo'
import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import React from 'react'
export const metadata = {
  title: 'Event-list-2 ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}
export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>

        <Header/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
            <PageLinks/>
            <EventsTwo/>
            <FooterOne/>
        </div>

    </div>
  )
}
