"use client"

import RSSEntries from "@/components/client/RSSEntries";
import Unauthenticated from "@/components/client/Unauthenticated";
import { rssService } from "@/lib/http/client";
import { useState, useEffect } from "react";

export default function Home() {
  const [rss, setRSS] = useState([]);
  const [error, setError] = useState(false)
  
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  useEffect(()=>{
    async function getRSS() {
      try { 
        const token = getCookie("token");
        const { data } = await rssService.getAllRSS(token || '')
        setRSS(data.data)
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }
    getRSS()
  }, [])

  return (
    <div className="w-full h-screen relative flex justify-center items-center">
      {error ? <Unauthenticated />: <RSSEntries rss={rss}/> }
    </div>
  );
}
