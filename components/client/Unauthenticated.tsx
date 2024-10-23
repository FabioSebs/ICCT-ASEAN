"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LockIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Unauthenticated() {
    const router = useRouter()

    const handleRedirect = () =>{ 
        router.replace("/")
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 w-full">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <LockIcon className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Authentication Required</CardTitle>
          <CardDescription>Please sign in or create an account to access this content.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            This area is restricted to authenticated users only. Sign in to your existing account or create a new one to continue.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button className="w-full" variant="default" onClick={(_) => handleRedirect()}>
            Sign In
          </Button>
          <Button className="w-full" variant="outline" onClick={(_) => handleRedirect()}>
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}