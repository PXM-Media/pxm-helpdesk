"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            if (res.ok) {
                const data = await res.json()
                localStorage.setItem('token', data.access_token)
                router.push('/dashboard')
            } else {
                alert('Login failed. Please check your credentials.')
            }
        } catch (error) {
            alert('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-multiply dark:mix-blend-screen animate-blob" />

            <Card className="w-full max-w-md z-10 shadow-2xl border-slate-200 dark:border-slate-800 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold tracking-tight text-center">Welcome back</CardTitle>
                    <p className="text-center text-slate-500 dark:text-slate-400">
                        Enter your credentials to access your account
                    </p>
                </CardHeader>
                <CardContent className="grid gap-4 pt-4">
                    <form onSubmit={handleLogin} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-11"
                            />
                        </div>
                        <Button className="w-full h-11 mt-2 text-base" type="submit" disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-center w-full text-slate-500">
                        Don't have an account? <Link href="/register" className="font-semibold text-primary hover:underline underline-offset-4">Sign up</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
