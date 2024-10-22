'use client'

import { useRouter } from 'next/navigation'
import { eventService } from '@/lib/http/client'
import { photoService } from '@/lib/http/client'
import { useEffect, useState } from 'react'
import PhotoGallery from '@/components/client/PhotoGallery'

export default function Event({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [eventData, setEventData] = useState<any>(null)
  const [photos, setPhotos] = useState<string[]>([])
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
      })

    photoService.getPhotos(token, params.id)
      .then((data) => {
        const sources = data.data.data.data.map((photo : any) => {
          return photo.source
        })
        setPhotos(sources)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [params.id, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full h-screen relative flex flex-col justify-center items-center">
      {eventData?.name || 'Event not found'}
      <PhotoGallery sources={photos}/>
    </div>
  )
}
