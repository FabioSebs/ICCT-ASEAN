"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

type RSSEntry = {
  id: string
  name: string
  description: string
  source: string
}

interface RSSEntriesProps {
  rss: RSSEntry[]
}

export default function RSSEntries({ rss }: RSSEntriesProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Launch RSS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rss.map((entry) => (
          <Card key={entry.id} className="hover:shadow-lg transition-shadow duration-300">
            <Link href={`rss/${entry.id}`}>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Image
                  src={getImage(entry.id) || '/default-logo.png'} // Provide a fallback image if needed
                  alt={`${entry.name} logo`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <CardTitle className="text-xl">{entry.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  {entry.description}
                </CardDescription>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

function getImage(id : string) {
  switch (id) {
    case 'cad9f765-b068-4424-8b88-a421859c5dcb':
      return '/moe.png'
    case '7338ee7c-3c4c-4dc3-8cf9-54a3ff5f8ff7':
      return '/mot.ico'
  }
}