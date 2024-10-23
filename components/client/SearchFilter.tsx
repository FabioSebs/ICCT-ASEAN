import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchComponentProps<T> {
    initialData: T[];
    data: T[];
    setData: React.Dispatch<React.SetStateAction<T[]>>;
}

export default function SearchComponent<T extends { [key: string]: any }>({
    initialData,
    data,
    setData
}: SearchComponentProps<T>) {
    const [searchTerm, setSearchTerm] = useState('')
    

    useEffect(() => {
        console.log(initialData)
        const filteredData = data.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        if (filteredData.length) {
            setData(filteredData)
        }
        if (!searchTerm) {
            setData(initialData)
        }
    }, [searchTerm, data, initialData, setData])

    return (
        <div className="relative flex items-center gap-4">
            <div>
                <Search className="h-6 w-6 text-gray-500" />
            </div>
            <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4"
            />
        </div>
    )
}