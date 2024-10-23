"use client";

import { useEffect, useState } from "react";
import CreateRequestForm from "@/components/client/CreateRequestForm";
import Unauthenticated from "@/components/client/Unauthenticated";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  useEffect(() => {
    const token = getCookie("token");
    setToken(token || '');
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      {token !== '' ? <CreateRequestForm token={token || ""} /> : <Unauthenticated />}
    </div>
  );
}
