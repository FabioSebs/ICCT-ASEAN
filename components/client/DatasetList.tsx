"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import Pagination from "./Pagination";
import SearchComponent from "./SearchFilter";

type Dataset = {
  id: string;
  name: string;
  description: string;
  link: string;
  owner: string;
  file_format: string;
  size: number;
  tag: string;
  source: string;
  created_at: string;
  updated_at: string;
};

interface DataEntriesProps {
  datasets: Dataset[];
}

export default function DataEntries({ datasets }: DataEntriesProps) {
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<Dataset[]>(datasets)

  const handleDownload = (url: string) => {
    toast.success("Download Started!")
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.setAttribute("download", "");
    anchor.click();
  };

  return (
    <div className="container mx-auto py-8">
      <Toaster />

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-8">Available Datasets</h1>
        <SearchComponent initialData={datasets} data={data} setData={setData}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gradient-to-b from-blue-500 to-green-500 p-10 rounded">
        {data.map((dataset) => (
          <Card key={dataset.id} className="hover:shadow-lg transition-shadow duration-300 relative">
            <div
              onClick={() => handleDownload(dataset.link)}
              className="cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Database />
                <CardTitle className="text-xl">{dataset.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  {dataset.description}
                  <span className="absolute right-1 bottom-1 bg-red-500 p-2 rounded-lg text-white">
                    # {dataset.tag}
                  </span>
                </CardDescription>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <Pagination currentPage={page} setCurrentPage={setPage} totalPages={Math.round(datasets.length / 9)} />
    </div>
  );
}
