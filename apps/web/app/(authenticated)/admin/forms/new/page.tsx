"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type FieldType = 'text' | 'email' | 'textarea' | 'select' | 'checkbox';

interface FormField {
    id: string;
    type: FieldType;
    label: string;
    required: boolean;
    options?: string[]; // Comma separated for MVP
}

export default function NewFormBuilder() {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [fields, setFields] = useState<FormField[]>([])

    const addField = () => {
        setFields([...fields, {
            id: Date.now().toString(),
            type: 'text',
            label: 'New Field',
            required: false
        }])
    }

    const updateField = (id: string, key: keyof FormField, value: any) => {
        setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f))
    }

    const removeField = (id: string) => {
        setFields(fields.filter(f => f.id !== id))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const schema = JSON.stringify(fields)

        // Auto-generate slug if empty
        const finalSlug = slug || title.toLowerCase().replace(/ /g, '-')

        const res = await fetch('http://localhost:3001/forms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title, slug: finalSlug, schema })
        })

        if (res.ok) {
            router.push('/admin/forms')
        } else {
            alert('Failed to create form')
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Form Builder</h1>
            <form onSubmit={handleSubmit}>
                <Card className="mb-6">
                    <CardHeader><CardTitle>Form Settings</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Form Title</Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="slug">URL Slug (Optional)</Label>
                            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="contact-support" />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4 mb-6">
                    {fields.map((field, index) => (
                        <Card key={field.id}>
                            <CardContent className="pt-6 flex gap-4 items-start">
                                <div className="grid gap-2 flex-1">
                                    <Label>Label</Label>
                                    <Input value={field.label} onChange={(e) => updateField(field.id, 'label', e.target.value)} />
                                </div>
                                <div className="grid gap-2 w-32">
                                    <Label>Type</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={field.type}
                                        onChange={(e) => updateField(field.id, 'type', e.target.value)}
                                    >
                                        <option value="text">Text</option>
                                        <option value="email">Email</option>
                                        <option value="textarea">Long Text</option>
                                        <option value="checkbox">Checkbox</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2 mt-8">
                                    <input
                                        type="checkbox"
                                        checked={field.required}
                                        onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                                    />
                                    <span className="text-sm">Required</span>
                                </div>
                                <Button variant="destructive" type="button" className="mt-6" onClick={() => removeField(field.id)}>X</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={addField}>+ Add Field</Button>
                    <Button type="submit">Save Form</Button>
                </div>
            </form>
        </div>
    )
}
