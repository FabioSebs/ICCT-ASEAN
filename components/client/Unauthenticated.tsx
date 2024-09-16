"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LockIcon } from "lucide-react"

export function Unauthenticated() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-[350px] text-center">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center space-x-2">
                        <LockIcon className="w-6 h-6 text-destructive" />
                        <span>Unauthenticated</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        You are not authenticated. Please log in to access this page.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button>
                        Log In
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}