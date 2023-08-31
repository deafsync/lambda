


import JoinToday from '@/components/aboutCourses/become/JoinToday'
import PageHeading from '@/components/aboutCourses/become/PageHeading'
import Tabs from '@/components/aboutCourses/become/Tabs'
import Instructors from '@/components/common/Instructors'
import LearningCommon from '@/components/common/LearningCommon'
import Join from "@/components/homes/join/Join";

import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'

import React from 'react'

export const metadata = {
  title: 'Instractors-become ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

export default function page() {
  return (
    <div  className="main-content  ">
      <Preloader/>
        <Header/>
        <div  className="content-wrapper  js-content-wrapper overflow-hidden">
            {/* <PageLinks/> */}
            <div className='mt-20'></div>
            <JoinToday/>
    
            <section  className=" layout-pb-lg">
              <div  className="container">
      
                <LearningCommon/>
                <PageHeading/>
                <Tabs/>

              </div>
            </section>
            
            <Join /> 
            <FooterOne/>

        </div>
    </div>
  )
}
