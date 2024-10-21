'use client'

import { useRouter } from 'next/navigation'
import { eventService } from '@/lib/http/client'
import { useEffect, useState } from 'react'

export default function Event({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [eventData, setEventData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
  }

  useEffect(() => {
    const token = getCookie('token') || '' 
    if (!params.id) {
      router.push('/') 
      return
    }

    eventService.getEventById(params.id, token)
      .then((data) => {
        setEventData(data.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        router.push('/')
      })
  }, [params.id, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full h-screen relative flex justify-center items-center">
      {eventData?.name || 'Event not found'}
    </div>
  )
}
