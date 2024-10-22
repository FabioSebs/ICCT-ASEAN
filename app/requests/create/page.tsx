"use server"

import { cookies } from 'next/headers'
import CreateRequestForm from "@/components/client/CreateRequestForm"

export default async function Home() {
    const cookieStore = cookies()
    const token = cookieStore.get('token')


    return (
        <div className='w-full flex flex-col justify-center items-center h-full'>
            <CreateRequestForm token={token?.value || ""} />
        </div>
    )

}