"use client"

import DataEntries from "@/components/client/DatasetList";
import { datasetService } from "@/lib/http/client";
import { useEffect, useState } from "react";
import Unauthenticated from "@/components/client/Unauthenticated";

export default function Home() {
  const [datasets, setDatasets] = useState([]);
  const [error, setError] = useState(false)

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  useEffect(()=>{
    async function getDatasets(){
      try { 
        const token = getCookie("token");
        const { data } = await datasetService.getAllDatasets(token || '')
        setDatasets(data.data.data) 
        
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }
    getDatasets()
  }, [])

  return (
    <div className="w-full h-screen relative flex justify-center items-center">
      {error ? <Unauthenticated />: <DataEntries datasets={datasets} />}
    </div>
  );
}
