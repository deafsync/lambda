'use client'

import '../public/assets/sass/styles.scss'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-calendar/dist/Calendar.css';
config.autoAddCss = false

import AOS from "aos";
import "aos/dist/aos.css";


import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Context from '@/context/Context';

import { Toaster } from "react-hot-toast"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 120,
      easing: 'ease-out',
      once:true
    });
  }, []);

  const router = useRouter()
  const pathname = usePathname()

  return (
    <html lang="en" className=''>
      <head>
      
      </head>
      <body>

        <Toaster/>
        <Context> 
          <AppRouterCacheProvider>
            {children}
          </AppRouterCacheProvider>
        </Context>
      </body>
    </html>
  )
}
