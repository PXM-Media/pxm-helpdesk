"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FormsListPage() {
    const [forms, setForms] = useState<any[]>([])

    useEffect(() => {
        const fetchForms = async () => {
            const token = localStorage.getItem('token')
            const res = await fetch('http://localhost:3001/forms', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.ok) {
                setForms(await res.json())
            }
        }
        fetchForms()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Manage Forms</h1>
                <Link href="/admin/forms/new">
                    <Button>Create Form</Button>
                </Link>
            </div>
            <div className="grid gap-4">
                {forms.map((form) => (
                    <Card key={form.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">
                                {form.title}
                            </CardTitle>
                            <Link href={`/portal/forms/${form.slug}`} target="_blank" className="text-sm text-blue-500 hover:underline">
                                View Public Link
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">Slug: {form.slug}</p>
                            <p className="text-sm text-gray-500">Fields: {JSON.parse(form.schema).length} configured</p>
                        </CardContent>
                    </Card>
                ))}
                {forms.length === 0 && <p className="text-gray-500">No forms found.</p>}
            </div>
        </div>
    )
}
