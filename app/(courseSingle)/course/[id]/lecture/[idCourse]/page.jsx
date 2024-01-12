


import Descriptions from '@/components/aboutCourses/lesson/Descriptions'
import LessonItems from '@/components/aboutCourses/lesson/LessonItems'
import Reviews from '@/components/aboutCourses/lesson/Reviews'
import Video from '@/components/aboutCourses/lesson/Video'
import Preloader from '@/components/common/Preloader'
import HeaderTen from '@/components/layout/headers/HeaderTen'
import React from 'react'

import CourseDetailsFive from '@/components/courseSingle/CourseDetailsFive'

export const metadata = {
  title: 'Lesson-single-1 ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

// Active course on a module/chapter

export default function page({params}) {
  return (
    <div  className="main-content  " >
      <Preloader/>
        <HeaderTen/>
        <div  className="content-wrapper  js-content-wrapper overflow-hidden">
            <LessonItems/>
            <section  className="layout-pt-lg layout-pb-lg md:pt-40">
                <div  className="">
                    <div  className="row justify-end">
                        <div  className="col-lg-9 col-md-8">
                            <Video/> {/*
                              TODO: Put video depend on the id
                            */}
                            
                            <CourseDetailsFive id={params.id} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}
