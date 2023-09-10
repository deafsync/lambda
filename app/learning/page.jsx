
import Preloader from '@/components/common/Preloader'
import MyCourses from '@/components/dashboard/MyCourses'
import Sidebar from '@/components/dashboard/Sidebar'
import HeaderDashboard from '@/components/layout/headers/HeaderDashboard'
import React from 'react'

export const metadata = {
  title: 'learning',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

export default function page() {
  return (

    <>
    <div className='main-content'>
      <Preloader/>
      <HeaderDashboard/>
    </div>
    <div className="content-wrapper  js-content-wrapper overflow-hidden">
      <MyCourses/>
    </div>
    </>
  )
}

// <div  className="barba-container" data-barba="container">
//        <main  className="main-content">
//            <Preloader/>
//            <HeaderDashboard/>
//            <MyCourses/>
//            {/* <div  className="content-wrapper js-content-wrapper overflow-hidden">
//              <div id='dashboardOpenClose'  className="dashboard -home-9 js-dashboard-home-9">
//                
//              </div>
//          </div> */}
//        </main>
//    </div>