



import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import CourseDetailsThree from '@/components/courseSingle/CourseDetailsThree'


import CourseSlider from '@/components/courseSingle/CourseSlider'
import FooterOne from '@/components/layout/footers/FooterOne'

import Header from '@/components/layout/headers/Header'
import React from 'react'


export const metadata = {
  title: 'Course detail',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

export default function page({ params }) {
  return (
    <div  className="main-content  ">
      <Preloader/>
        <Header/>
        <div  className="content-wrapper  js-content-wrapper ">
            <div style={{marginTop: '90px',
                        padding: '16px 0'}}></div>
            <CourseDetailsThree id={params.id} />
            <CourseSlider/>
            <FooterOne/>
        </div>


    </div>
  )
}
