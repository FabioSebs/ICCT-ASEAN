"use server"

import ProjectEntries from "@/components/client/ProjectList";
import { projectService } from "@/lib/http/client";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  try { 
    const { data } = await projectService.getAllProjects(token?.value || '')
    const projects = data.data.data
    console.log(projects)
  
    return (
      <div className="w-full h-screen relative flex justify-center items-center">
        <ProjectEntries projects={projects}/> 
      </div>
    );
  } catch (error) {
    console.log(error)
    redirect('/')
  }
}
