



import Preloader from '@/components/common/Preloader'
import DashboardOne from '@/components/dashboard/DashboardOne'
import Sidebar from '@/components/dashboard/Sidebar'
import Survey from '@/components/dashboard/Survey'
import HeaderDashboard from '@/components/layout/headers/HeaderDashboard'
import React from 'react'
export const metadata = {
  title: 'Dashboard-survey ',
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
                <Survey/>
              </div>
          </div>
        </main>
    </div>
  )
}
