"use server"

import RSSEntries from "@/components/client/RSSEntries";
import { rssService } from "@/lib/http/client";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  
  try { 
    const { data } = await rssService.getAllRSS(token?.value || '')
    const rss = data.data
    console.log(rss)
  
    return (
      <div className="w-full h-screen relative flex justify-center items-center">
        <RSSEntries rss={rss}/> 
      </div>
    );
  } catch (error) {
    console.log(error)
    redirect('/')
  }
}
