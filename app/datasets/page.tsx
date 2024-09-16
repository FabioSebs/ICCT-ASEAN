"use server"

import DataEntries from "@/components/client/DatasetList";
import { datasetService } from "@/lib/http/client";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  try { 
    const { data } = await datasetService.getAllDatasets(token?.value || '')
    const datasets = data.data.data // Adjust based on the actual API response structure
  
    return (
      <div className="w-full h-screen relative flex justify-center items-center">
        <DataEntries datasets={datasets} />
      </div>
    );
  } catch (error) {
    console.log(error)
    redirect('/')
  }
}
