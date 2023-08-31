






import BlogsOne from '@/components/blogs/BlogsOne'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'

import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'

import React from 'react'

import CourseCart from '../../../components/cartsAndCheckout/CourseCart'
export const metadata = {
  title: 'Course-cart ',
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

            <CourseCart/>
            
            <FooterOne/>
        </div>

    </div>
  )
}

