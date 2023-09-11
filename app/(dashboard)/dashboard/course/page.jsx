










import DashboardOne from '@/components/dashboard/DashboardOne'
import Sidebar from '@/components/dashboard/Sidebar'
import Course from '@/components/dashboard/Course'
import HeaderDashboard from '@/components/layout/headers/HeaderDashboard'
import React from 'react'
import Preloader from '@/components/common/Preloader'

export const metadata = {
  title: 'Dashboard-administration ',
  description:
    'Elevate your e-learning content with lambda, the most impressive platforms for online courses and education.',
  
}

export default function page() {
  return (
    <div  className="barba-container" data-barba="container">
        <main  className="main-content">
        <Preloader/>
            <HeaderDashboard/>
            <div  className="content-wrapper js-content-wrapper overflow-hidden">
              <div id='dashboardOpenClose'  className="dashboard -home-9 js-dashboard-home-9">
                <div  className="dashboard__sidebar scroll-bar-1">
                    <Sidebar/>

                </div>
                <Course/>
              </div>
          </div>
        </main>
    </div>
  )
}
