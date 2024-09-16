"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Database } from "lucide-react"

type Dataset = {
  id: string
  name: string
  description: string
  link: string
  owner: string
  file_format: string
  size: number
  tags: string
  source: string
  created_at: string
  updated_at: string
}

interface DataEntriesProps {
  datasets: Dataset[]
}

export default function DataEntries({ datasets }: DataEntriesProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Available Datasets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((dataset) => (
          <Card key={dataset.id} className="hover:shadow-lg transition-shadow duration-300">
            <Link href={`/datasets/${dataset.id}`}>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Database />
                <CardTitle className="text-xl">{dataset.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  {dataset.description}
                </CardDescription>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
