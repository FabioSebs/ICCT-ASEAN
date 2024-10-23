"use client"

import ProjectEntries from "@/components/client/ProjectList";
import { projectService } from "@/lib/http/client";
import { useState, useEffect } from "react";
import Unauthenticated from "@/components/client/Unauthenticated";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false)
  
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  useEffect(()=>{
    async function getProjects() {
      try { 
        const token = getCookie("token");
        const { data } = await projectService.getAllProjects(token || '')
        setProjects(data.data.data)
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }
    getProjects()
  }, [])

  
  return (
    <div className="w-full h-screen relative flex justify-center items-center">
        {error ? <Unauthenticated/>:<ProjectEntries projects={projects}/> } 
    </div>
  );
 
}
