


import Descriptions from '@/components/aboutCourses/lesson/Descriptions'
import LessonItems from '@/components/aboutCourses/lesson/LessonItems'
import Reviews from '@/components/aboutCourses/lesson/Reviews'
import Video from '@/components/aboutCourses/lesson/Video'
import Preloader from '@/components/common/Preloader'
import HeaderTen from '@/components/layout/headers/HeaderTen'
import React from 'react'

export const metadata = {
  title: 'Lesson-single-1 ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

// Active course on a module/chapter

export default function page({params}) {

  // TODO: pathname to retrive id : send video url & list

  return (
    <div  className="main-content  " >
      <Preloader/>
        <HeaderTen/>  {/*
                        TODO: Pass the course name
                      */}
        <div  className="content-wrapper  js-content-wrapper overflow-hidden">
            <LessonItems 
              id={params.idCourse}
            /> {/*
                        TODO: Pass active course id
                      */}
            
        </div>
    </div>
  )
}
