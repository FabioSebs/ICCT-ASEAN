"use server"

import EventEntries from "@/components/client/EventList";
import { eventService } from "@/lib/http/client";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'


export default async function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  try {
    const { data } = await eventService.getAllEvents(token?.value || '')
    const events = data.data.data
    return (
      <div className="w-full h-screen relative flex justify-center items-center">
        <EventEntries events={events}/>
      </div>
    );
  } catch (error) {
    console.log(error)
    redirect('/')
  }
}
