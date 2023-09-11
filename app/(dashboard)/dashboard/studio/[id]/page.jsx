


import Descriptions from '@/components/aboutCourses/lesson/Descriptions'
import LessonItems from '@/components/aboutCourses/lesson/LessonItems'
import Reviews from '@/components/aboutCourses/lesson/Reviews'
import Video from '@/components/aboutCourses/lesson/Video'
import Preloader from '@/components/common/Preloader'
import Header from '@/components/layout/headers/HeaderStudio'
import React from 'react'

import CourseDetailsFive from '@/components/courseSingle/CourseDetailsFive'

export const metadata = {
  title: 'Lesson-single-1 ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

export default function page({params}) {
  return (
    <div  className="main-content  " >
      <Preloader/>
        <Header/>
        <div  className="content-wrapper  js-content-wrapper overflow-hidden">
            <LessonItems/>
            <section  className="layout-pt-lg layout-pb-lg lg:pt-40">
                <div  className="">
                    <div  className="row justify-end">
                        <div  className="col-xxl-9 col-xl-8 col-lg-9">
                            <Video/>
                            
                            <CourseDetailsFive id={params.id} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}
