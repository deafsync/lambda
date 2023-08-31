

import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import CourseListSix from '@/components/courseList/CourseListSix'
import CoursesSlider from '@/components/courseList/CourseSlider'
import Instractors from '@/components/courseList/Instractors'

import PageHeading from '@/components/courseList/PageHeading'


import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import React from 'react'
export const metadata = {
  title: 'Couese-list-6 ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}
export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>
        <Header/>
        <div className="content-wrapper  js-content-wrapper overflow-hidden">
            <PageLinks/>
            <PageHeading/>
            <CoursesSlider/>
            <Instractors/>
           
            <CourseListSix/>
            <FooterOne/>
        </div>
    </div>
  )
}
