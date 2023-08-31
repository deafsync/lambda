



import Instractors from '@/components/aboutCourses/instractors/Instractors'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'

import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'

import React from 'react'

export const metadata = {
  title: 'Instractors-list-1 ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

export default function page() {
  return (
    
        <main  className="main-content">
          <Preloader/>
           <Header/>
           <div  className="content-wrapper  js-content-wrapper overflow-hidden">


<PageLinks/>

<Instractors/>




<FooterOne/>


</div>
            
        </main>
  
  )
}
