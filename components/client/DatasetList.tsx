"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Database } from "lucide-react"

type Dataset = {
    id: string
    title: string
    description: string
}

const datasets: Dataset[] = [
    {
        id: "1",
        title: "Latest EVS",
        description: "Latest EVs in the market as of 2024",

    },
    {
        id: "2",
        title: "Latest Investments",
        description: "Investments in EV Adoption",
    },
    {
        id: "3",
        title: "Latest EV Bikes",
        description: "Latest EV Bikes in the market as of 2024",
    }
]

export default function DataEntries() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Available Datasets</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {datasets.map((datasets) => (
                    <Card key={datasets.id} className="hover:shadow-lg transition-shadow duration-300">
                        <Link href={`/datasets/${datasets.id}`}>
                        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                            <Database />
                            <CardTitle className="text-xl">{datasets.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm text-muted-foreground">
                                {datasets.description}
                            </CardDescription>
                        </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    )
}