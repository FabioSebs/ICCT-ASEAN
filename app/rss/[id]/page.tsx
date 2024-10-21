"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import RSSComponent from '@/components/client/RSS'

export default function RSS({ params }: { params: { id: string } }) {
  const router = useRouter()
  
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
  }

  const token = getCookie('token')

  return (
    <div>
      <RSSComponent id={params.id} token={token || ""}/>
    </div>
  )
}
