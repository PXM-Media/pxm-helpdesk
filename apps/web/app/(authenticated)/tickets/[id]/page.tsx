"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TicketDetailPage() {
    const params = useParams()
    const [ticket, setTicket] = useState<any>(null)

    useEffect(() => {
        const fetchTicket = async () => {
            const token = localStorage.getItem('token')
            const res = await fetch(`http://localhost:3001/tickets/${params.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.ok) {
                setTicket(await res.json())
            }
        }
        if (params.id) fetchTicket()
    }, [params.id])

    if (!ticket) return <div>Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Ticket #{ticket.id}</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">{ticket.status}</span>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{ticket.subject}</CardTitle>
                    <div className="text-sm text-gray-500">
                        Created by {ticket.requester?.email} on {new Date(ticket.createdAt).toLocaleString()}
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-wrap">{ticket.description}</p>
                </CardContent>
            </Card>

            {/* Comments section would go here */}
        </div>
    )
}
