














import Preloader from '@/components/common/Preloader'
import Settings from '@/components/dashboard/Settings/Settings'
import Sidebar from '@/components/dashboard/Sidebar'
import HeaderDashboard from '@/components/layout/headers/Header'
import React from 'react'
import Footer from "@/components/layout/footers/FooterOne";

export const metadata = {
  title: 'Dashboard-settings ',
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
                {/* <div  className="dashboard__sidebar scroll-bar-1">
                    <Sidebar/>

                </div> */}
                <Settings/>
              </div>
          </div>
          <Footer />
        </main>
    </div>
  )
}
