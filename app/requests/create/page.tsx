"use client"

import CreateRequestForm from "@/components/client/CreateRequestForm"

export default function Home() {

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
    };

    const token = getCookie("token");

    return (
        <div className='w-full flex flex-col justify-center items-center h-full'>
            <CreateRequestForm token={token || ""} />
        </div>
    )

}