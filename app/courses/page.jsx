

import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'

import CourseList from '@/components/courseList/CourseList'

import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import React from 'react'
export const metadata = {
  title: 'Couese-list',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
}

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>
        <Header/>
        <div className="content-wrapper  js-content-wrapper overflow-hidden">
            <div style={{marginTop: '90px',
                        padding: '16px 0'}}></div>
            <CourseList idCategory={0}/>
            <FooterOne/>
        </div>
    </div>
  )
}
