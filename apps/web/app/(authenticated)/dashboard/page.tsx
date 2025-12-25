"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function DashboardPage() {
    const [tickets, setTickets] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem('token')
            if (!token) return;
            try {
                const res = await fetch('http://localhost:3001/tickets', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res.ok) {
                    setTickets(await res.json())
                }
            } finally {
                setLoading(false)
            }
        }
        fetchTickets()
    }, [])

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Overview of your current support requests.
                    </p>
                </div>
                <Link href="/tickets/new">
                    <Button size="lg" className="shadow-lg shadow-blue-500/20">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Ticket
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-blue-100">Total Tickets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{tickets.length}</div>
                        <p className="text-xs text-blue-100 mt-1 opacity-80">All time</p>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Open Tickets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-slate-900 dark:text-white">
                            {tickets.filter(t => t.status === 'NEW' || t.status === 'OPEN').length}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Awaiting action</p>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Resolved</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-slate-900 dark:text-white">
                            {tickets.filter(t => t.status === 'RESOLVED' || t.status === 'CLOSED').length}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Completed</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader>
                    <CardTitle>Recent Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {loading ? (
                            <div className="space-y-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-16 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg" />
                                ))}
                            </div>
                        ) : tickets.length > 0 ? (
                            tickets.map((ticket) => (
                                <Link key={ticket.id} href={`/tickets/${ticket.id}`} className="block group">
                                    <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-200">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {ticket.subject}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                Created {new Date(ticket.createdAt).toLocaleDateString()} &middot; ID: #{ticket.id}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${ticket.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                                                ticket.priority === 'MEDIUM' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>
                                                {ticket.priority}
                                            </span>
                                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${ticket.status === 'NEW' ? 'bg-emerald-100 text-emerald-700' :
                                                ticket.status === 'CLOSED' ? 'bg-slate-100 text-slate-600' :
                                                    'bg-indigo-100 text-indigo-700'
                                                }`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-10 text-slate-500">
                                <p>No tickets found.</p>
                                <Link href="/tickets/new" className="text-blue-600 hover:underline mt-2 inline-block">
                                    Create your first ticket
                                </Link>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
