"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PublicFormPage() {
    const params = useParams()
    const [form, setForm] = useState<any>(null)
    const [formData, setFormData] = useState<any>({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const fetchForm = async () => {
            const res = await fetch(`http://localhost:3001/forms/${params.slug}`)
            if (res.ok) {
                setForm(await res.json())
            }
        }
        if (params.slug) fetchForm()
    }, [params.slug])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3001/forms/${params.slug}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        if (res.ok) {
            setSubmitted(true)
        } else {
            alert('Submission failed')
        }
    }

    if (!form) return <div className="p-8">Loading form...</div>
    if (submitted) return (
        <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md text-center p-8">
                <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
                <p>Your request has been submitted successfully.</p>
            </Card>
        </div>
    )

    const schema = JSON.parse(form.schema)

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{form.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {schema.map((field: any) => (
                                <div key={field.id} className="grid gap-2">
                                    <Label>
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </Label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            required={field.required}
                                            onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                                        />
                                    ) : field.type === 'checkbox' ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                onChange={(e) => setFormData({ ...formData, [field.label]: e.target.checked })}
                                            />
                                            <span className="text-sm">Yes</span>
                                        </div>
                                    ) : (
                                        <Input
                                            type={field.type}
                                            required={field.required}
                                            onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                                        />
                                    )}
                                </div>
                            ))}
                            <Button className="w-full mt-4" type="submit">Submit Request</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
