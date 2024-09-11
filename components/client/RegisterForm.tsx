"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Image from 'next/image';

// TODO: handle redirects
// TODO: react-hot-toast (handling errors / messages)

export default function RegisterForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }

        // Here you would typically send the data to your backend
        console.log('Registration submitted:', { email, password })
        // Reset form after submission
        setEmail('')
        setPassword('')
    }

    return (
        <Card className="w-full max-w-md mx-auto min-h-[40rem]">
            <CardHeader>
                <div className='w-full flex justify-center my-8'>
                    <Image src={"/icct.webp"} alt='logo' width={150} height={150} />
                </div>
                <CardTitle className='w-full text-center'>Log In</CardTitle>
                <CardDescription className='w-full text-center'>Access ICCT ASEAN Dashboard</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="flex items-center text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {error}
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Log In</Button>
                </CardFooter>
            </form>
        </Card>
    )
}