"use server"

import EventEntries from "@/components/client/EventList";
// import { eventService } from "@/lib/http/client";

export default async function Home() {

  // const {data} = await eventService.getAllEvents()

  return (
    <div className="w-full h-screen relative flex justify-center items-center">
        <EventEntries />
    </div>
  );
}
