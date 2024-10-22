"use client"

import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { requestService } from '@/lib/http/client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
interface Props {
    token: string
}

export default function CreateRequestForm({ token }: Props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const res = await requestService.postRequest({
                name,
                description,
                type
            }, token)

            toast.success("request created successfully!")
            router.push("/requests")
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 border px-14 py-14 shadow-md rounded-sm w-96">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    placeholder="Enter request name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Describe your request in detail"
                    className="resize-none"
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={setType} required>
                    <SelectTrigger id="type">
                        <SelectValue placeholder="Select a request type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="dataset">Dataset</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
        </form>
    )
}