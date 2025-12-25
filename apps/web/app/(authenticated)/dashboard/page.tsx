"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
    const [tickets, setTickets] = useState<any[]>([])

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem('token')
            if (!token) return;
            const res = await fetch('http://localhost:3001/tickets', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.ok) {
                setTickets(await res.json())
            }
        }
        fetchTickets()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">My Tickets</h1>
                <Link href="/tickets/new">
                    <Button>Create Ticket</Button>
                </Link>
            </div>
            <div className="grid gap-4">
                {tickets.map((ticket) => (
                    <Card key={ticket.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">
                                <Link href={`/tickets/${ticket.id}`} className="hover:underline">
                                    {ticket.subject}
                                </Link>
                            </CardTitle>
                            <span className="text-xs font-bold px-2 py-1 rounded bg-gray-200">{ticket.status}</span>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">Priority: {ticket.priority}</p>
                            <p className="text-sm text-gray-500">Created: {new Date(ticket.createdAt).toLocaleDateString()}</p>
                        </CardContent>
                    </Card>
                ))}
                {tickets.length === 0 && <p className="text-gray-500">No tickets found.</p>}
            </div>
        </div>
    )
}
