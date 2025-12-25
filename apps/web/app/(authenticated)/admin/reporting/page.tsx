"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportingDashboard() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch("http://localhost:3001/reporting/tickets"); // Assumes no auth for mvp or proxy
            if (res.ok) {
                setStats(await res.json());
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (!stats) return <div className="p-8">Loading stats...</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">Reporting Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Tickets by Status</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {stats.status?.map((s: any) => (
                                <div key={s.status} className="flex justify-between p-2 bg-slate-100 rounded">
                                    <span className="font-medium">{s.status}</span>
                                    <span className="font-bold">{s.count}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Tickets by Priority</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {stats.priority?.map((p: any) => (
                                <div key={p.priority} className="flex justify-between p-2 bg-slate-100 rounded">
                                    <span className="font-medium">{p.priority}</span>
                                    <span className="font-bold">{p.count}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <Card>
                    <CardHeader><CardTitle>Agent Performance (Mock Data)</CardTitle></CardHeader>
                    <CardContent>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2">Agent</th>
                                    <th className="p-2">Resolved Tickets</th>
                                    <th className="p-2">Avg Response Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-2">Admin User</td>
                                    <td className="p-2">12</td>
                                    <td className="p-2">1h 45m</td>
                                </tr>
                                <tr>
                                    <td className="p-2">Support Bot</td>
                                    <td className="p-2">45</td>
                                    <td className="p-2">0m 05s</td>
                                </tr>
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
