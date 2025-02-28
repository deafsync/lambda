

import dynamic from 'next/dynamic'

import FindCourse from '@/components/homes/FindCourse'
import LearningJourney from '@/components/common/LearningJourney'
import LearningPathSeven from '@/components/homes/LearningPath/LearningPathSeven'

import Statictis from '@/components/homes/Statistics/Statictis'

import Brands from '@/components/common/Brands'

import CategoriesSeven from '@/components/homes/categories/CategoriesSeven'
import CoursesSeven from '@/components/homes/courses/CoursesSeven'
import CoursesFive from '@/components/homes/courses/CoursesFive'
import EventsSeven from '@/components/homes/events/EventsSeven'
import HeroSeven from '@/components/homes/heros/HeroSeven'
import InstractorSeven from '@/components/homes/instractors/InstractorSeven'
import Pricing from '@/components/common/Pricing'
import Testimonials from '@/components/homes/testimonials/Testimonials'
// import FooterSeven from '@/components/layout/footers/FooterSeven'
// import HeaderDashboard from '@/components/layout/headers/HeaderDashboard'
import Header from '@/components/layout/headers/Header'

import CategoriesThree from '@/components/homes/categories/CategoriesThree'

import CoursesTwo from '@/components/homes/courses/CoursesTwo'
import Footer from '@/components/layout/footers/FooterOne'

import React from 'react'
import Preloader from '@/components/common/Preloader'
import PrivateComponent from '@/components/Private'

export const metadata = {
  title: 'Home',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
}

export default function page() {
  return (
    <div className='main-content'>
      <Preloader/>
        <PrivateComponent />
        <Header />
        <div className="content-wrapper  js-content-wrapper overflow-hidden">
          <HeroSeven/>
          <CoursesSeven/>
          <CategoriesThree/>
          <CoursesFive />
          <CoursesTwo />
          {/* <InstractorSeven/> */}
          {/* <FindCourse/>
          <LearningPathSeven/>
          <LearningJourney/>
          <Testimonials backgroundComponent={'white'}/>
          <EventsSeven /> */}
          {/* <Pricing/> */}
          {/* <Brands/> */}
          {/* <Statictis/> */}
          {/* <CategoriesSeven/> */}
          <Footer/>
        </div>
    </div>
  )
}
