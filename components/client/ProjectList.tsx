"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Pencil } from "lucide-react"

type BlogPost = {
  id: string
  title: string
  description: string
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Heavy Duty Vehicles",
    description: "Find the latest EV Cars in Oto's registry of ev cars",
  },
  {
    id: "2",
    title: "EV Adoption Outline",
    description: "Find the latest news from the official ministry website",
  },
  {
    id: "3",
    title: "EV Adoption Outline",
    description: "Find the latest news from the official ministry website",
  },
  {
    id: "2",
    title: "EV Adoption Outline",
    description: "Find the latest news from the official ministry website",
  },
  {
    id: "2",
    title: "EV Adoption Outline",
    description: "Find the latest news from the official ministry website",
  },
]

export default function ProjectEntries() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Pencil />
              <CardTitle className="text-xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground">
                {post.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}