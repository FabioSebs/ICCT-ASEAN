"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

type BlogPost = {
  id: string
  title: string
  description: string
  logoUrl: string
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Oto Dealership",
    description: "Find the latest EV Cars in Oto's registry of ev cars",
    logoUrl: "/oto-logo.svg"
  },
  {
    id: "2",
    title: "Ministry of Energy and Mineral Resources",
    description: "Find the latest news from the official ministry website",
    logoUrl: "/moe.png"
  },
  {
    id: "3",
    title: "Ministry of Transport",
    description: "Find the latest news from the official ministry website.",
    logoUrl: "/mot.ico"
  }
]

export default function ProjectEntries() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Launch RSS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Image
                src={post.logoUrl}
                alt={`${post.title} logo`}
                width={40}
                height={40}
                className="rounded-full"
              />
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