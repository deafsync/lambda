




import About from '@/components/about/About'


import Brands from '@/components/common/Brands'
import Instructors from '@/components/common/Instructors'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import TestimonialsOne from '@/components/common/TestimonialsOne'
import WhyCourse from '@/components/homes/WhyCourse'
import LearningPaths from '@/components/homes/LearningPath/LearningPathsSix'
import Achievements from '@/components/homes/achievements/Achievements'


import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import React from 'react'

export const metadata = {
  title: 'About ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>

        <Header/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          {/* <PageLinks/> */}
          <About/>

          <WhyCourse/>

          <Achievements />

          <LearningPaths />            

          {/* <TestimonialsOne/> */}
          {/* <Instructors/> */}
          {/* <Brands/> */}
          
          <FooterOne/>
        </div>

    </div>
  )
}

