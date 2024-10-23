"use client"

import { requestService } from "@/lib/http/client"
import RequestTable from "@/components/client/RequestTable"
import { useState, useEffect } from "react";
import Unauthenticated from "@/components/client/Unauthenticated";

export default function Home() {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(false)

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
    };

    useEffect(() => {
        async function getRequests() {
            try {
                const token = getCookie("token");
                const { data } = await requestService.getRequest(token || '')
                setRequests(data.data.data)

            } catch (error) {
                console.log(error)
                setError(true)
            }
        }
        getRequests()
    }, [])

    return (
        <>
            {error ? <Unauthenticated/> : <RequestTable data={requests} />}
        </>
    )

}