"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Image from 'next/image';
import { authService } from '@/lib/http/client';
import { useRouter } from 'next/navigation'
import toast, { Toaster } from "react-hot-toast";

export default function RegisterForm() {
    const router = useRouter()
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

     // Function to set cookie
     const setCookie = (name :string, value : string, days : number) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
    };

    async function Login() {
        try {
            const { data } = await authService.login({
                email,
                password
            });
            
            if (data.data) {
                setCookie('token', data.data, 7);
            }

            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async function Register() {
        try {
            const { data } = await authService.register({
                email,
                password,
                username,
            });
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // TODO: get errors and success from api
        if (mode == 'login') {
            Login()
                .then((data) => {
                    console.log(data)
                    router.push('/projects');
                    toast.success("Account created! Login to continue")
                })
                .catch((error) => {
                    setError('Login failed. Please check your credentials.');
                    toast.error("Login failed.")
                });
        }

        if (mode == 'register') {
            Register()
                .then((data) => {
                    setMode('login')
                    toast.success("Account created! Login to continue")
                })
                .catch((error) => {
                    setError('Register failed. Please check your credentials.');
                    toast.error("Register failed.")
                });
        }

        console.log('Login submitted:', { email, password });
    };

    return (
        <Card className="w-full max-w-md mx-auto min-h-[40rem]">
            <Toaster />
            <CardHeader>

                <div className='w-full flex justify-center my-8'>
                    <Image src={"/icct.png"} alt='logo' width={150} height={150} />
                </div>

                <CardTitle className='w-full text-center'>
                    {mode == 'register' ? 'Registration Page!' : 'Login to Dashboard!'}
                </CardTitle>

                <CardDescription className='w-full text-center'>Access ICCT ASEAN Dashboard</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">

                    {mode == 'register' &&
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    }

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

                <CardFooter className='flex flex-col'>
                    <Button type="submit" className="w-full">
                        {mode == 'register' ? 'Register' : 'Login'}
                    </Button>


                    <h5 className='hover:cursor-pointer italic text-gray-500 mt-2 underline' onClick={_ => setMode(mode == 'register' ? 'login' : 'register')}>
                        {mode == 'register' ?
                            'Already have an account? Login' :
                            'Create an account'}
                    </h5>
                </CardFooter>
            </form>
        </Card>
    )
}