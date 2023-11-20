



import React from 'react'
import Header from '@/components/layout/headers/Header'
import Hero from '@/components/homes/heros/HeroSix'
import Brands from '@/components/common/Brands'
import StepsOne from '@/components/common/StepsOne'
import Line from '@/components/common/Line'
import Join from "@/components/homes/join/Join";

import CategoriesFour from '@/components/homes/categories/CategoriesFour'
import Courses from '@/components/homes/courses/Courses'
import LearningPath from '@/components/homes/LearningPath/LearningPath'
import FeaturedCourses from '@/components/homes/courses/FeaturedCourses'
import LandJob from '@/components/homes/landJob/LandJob'
import TestimonialsFour from '@/components/homes/testimonials/TestimonialsFour'
import AchievementsTwo from '@/components/homes/achievements/AchievementsTwo'
import InstractorFour from '@/components/homes/instractors/InstractorFour'
import EventsFour from '@/components/homes/events/EventsFour'
import LearningSelection from '@/components/homes/LearningSelection'
import Footer from '@/components/layout/footers/FooterOne'
import Preloader from '@/components/common/Preloader'
export const metadata = {
  title: 'lambda',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
}




export default function page() {
  return (
    <>
      <div className='main-content'>
        <Preloader/>
        <Header/>
      </div>
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <Hero/>
        {/* <Brands/> */}
        <CategoriesFour/>
        <Courses/>
        <Line />
        <StepsOne/>
        {/* <FeaturedCourses/> */}
        <LandJob/>
        {/* <TestimonialsFour/> */}
        <AchievementsTwo/>
        <InstractorFour/>
        {/* <EventsFour/> */}
        {/* <LearningSelection/> */}
        <Footer/>
      </div>
      </>
  )
}
