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

function getImage(id: string) {
  switch (id) {
    case 'ed9bbec6-99c8-42b8-b6ba-9da13eb6243e':
      return '/moe.png'
    case 'f3341c27-49e8-4fe2-8f84-305ad55527ed':
      return '/mot.ico'
    case 'a69e5528-7df7-4405-9f3a-13064f806013':
      return '/antara.png'
    case '198d5144-5fad-4216-9ec6-ad9f86c01cca':
      return '/thnews.png'
    case '0dd87552-9582-4867-83ed-039e755d2e2f':
      return '/vnews.jpeg'
  }
}