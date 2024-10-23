"use client"

import EventEntries from "@/components/client/EventList";
import { eventService } from "@/lib/http/client";
import { useEffect, useState } from "react";
import Unauthenticated from "@/components/client/Unauthenticated";


export default function Home() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false)

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  useEffect(()=>{
    async function getEvents(){
      try {
        const token = getCookie("token");
        const { data } = await eventService.getAllEvents(token || '')
        setEvents(data.data.data)
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }
    getEvents()
  }, [])

  return (
    <div className="w-full h-screen relative flex justify-center items-center">
      {error ? <Unauthenticated />: <EventEntries events={events} />}
    </div>
  );

}
