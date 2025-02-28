"use client";

import { auth } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const PrivateComponent = () => {

  const router = useRouter()

  useEffect(() => {
    auth()
      .then(res => {
        if(!res) {
          router.push('/')
        }
      })
  }, [])

  return <div></div>
}

export default PrivateComponent