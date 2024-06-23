




import Descriptions from '@/components/aboutCourses/lesson/Descriptions'
import LessonItems from '@/components/aboutCourses/lesson/LessonItems'
import Reviews from '@/components/aboutCourses/lesson/Reviews'
import Video from '@/components/aboutCourses/lesson/VideoStudio'
import VideoTwo from '@/components/aboutCourses/lesson/VideoTwo'
import HeaderTen from '@/components/layout/headers/HeaderStudio'
import React from 'react'

import AsideStudio from '@/components/courseSingle/AsideStudio'


export const metadata = {
  title: 'Studio ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

export default function page({params}) {

  return (
    <AsideStudio id={params.id} />
  )
}
