"use client"

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useRouter } from 'next/navigation'

interface Request {
  id: string
  uid: string
  name: string
  description: string
  type: string
  status: string 
  created_at: string
  updated_at: string
}

interface Props {
  data: Request[]
}

type SortKey = keyof Request
type SortOrder = 'asc' | 'desc'

export default function RequestTable({ data }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('created_at')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const router = useRouter()

  const sortedData = [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort('name')}>
                Name {sortKey === 'name' && (sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
              </Button>
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort('type')}>
                Type {sortKey === 'type' && (sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort('status')}>
                Status {sortKey === 'status' && (sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort('created_at')}>
                Created At {sortKey === 'created_at' && (sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
              </Button>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.name}</TableCell>
              <TableCell className="max-w-xs truncate" title={request.description}>{request.description}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  request.status === 'completed' ? 'bg-green-100 text-green-800' :
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {request.status}
                </span>
              </TableCell>
              <TableCell>{formatDate(request.created_at)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(request.id)}>
                      Copy request ID
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=> router.push("/requests/create")}>Create New Request</DropdownMenuItem>
                    <DropdownMenuItem>Remind Sys Admin</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}