







import Faq from '@/components/common/Faq'
import Preloader from '@/components/common/Preloader'

import ContactTwo from '@/components/contacts/ContactTwo'

import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import React from 'react'
export const metadata = {
  title: 'Contact-2 ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>

        <Header/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
            

            <ContactTwo/>
            <Faq/>

           
            
            <FooterOne/>
        </div>

    </div>
  )
}

