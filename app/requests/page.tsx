"use server"

import { requestService } from "@/lib/http/client"
import { console } from "inspector"
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import RequestTable from "@/components/client/RequestTable"

export default async function Home() {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    try {
        const { data } = await requestService.getRequest(token?.value || '')
        const requests = data.data.data
        return (
            <>
                <RequestTable data={requests}/>
            </>
        )
    } catch (error) {
        console.log(error)
    }

}