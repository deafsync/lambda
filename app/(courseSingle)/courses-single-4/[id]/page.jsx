





import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import CourseDetailsFour from '@/components/courseSingle/CourseDetailsFour'

import CourseSlider from '@/components/courseSingle/CourseSlider'
import FooterOne from '@/components/layout/footers/FooterOne'

import Header from '@/components/layout/headers/Header'
import React from 'react'


export const metadata = {
  title: 'Couese-single-4 ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

export default function page({ params }) {
  return (
    <div  className="main-content  ">
      <Preloader/>
        <Header/>
        <div  className="content-wrapper  js-content-wrapper">
            <PageLinks/>
            <CourseDetailsFour id={params.id} />
            <CourseSlider/>
            <FooterOne/>
        </div>


    </div>
  )
}
