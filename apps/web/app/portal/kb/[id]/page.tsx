"use client";

// app/portal/kb/[id]/page.tsx
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ArticleDetail() {
    const params = useParams();
    const [article, setArticle] = useState<any>(null);

    useEffect(() => {
        if (params.id) {
            // In a real app we'd have a specific getArticle endpoint, 
            // but for now we might need to rely on search or list if we didn't make one.
            // Actually I didn't make a getOne endpoint in the backend controller yet!
            // I should fix that, or just mock it for now implies I can't fetch it easily.
            // Wait, I can add the endpoint quickly or just filter from category list if lazy.
            // Let's assume I'll add the endpoint or use a quick fetch if it existed.
            // Re-reading backend: I only made findAllCategories (with relations) and search. 
            // I should add `getArticle(id)` to backend. 
            // For this moment, I will mock the fetch call assuming I add it, or use search to find it by ID if I hack it?
            // No, let's fix backend in next step. For now I write this assuming the endpoint exists.
            fetchArticle(params.id as string);
        }
    }, [params.id]);

    const fetchArticle = async (id: string) => {
        // START_HACK: Since I missed the endpoint, let's use search to find by title mostly matching? 
        // No that's bad. I'll just write the fetch here and fix the backend immediately after.
        const res = await fetch(`http://localhost:3001/kb/articles/${id}`);
        if (res.ok) {
            setArticle(await res.json());
        }
    };

    if (!article) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="container mx-auto py-10 max-w-3xl">
            <Link href="/portal/kb">
                <Button variant="ghost" className="mb-4">← Back to Knowledge Base</Button>
            </Link>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">{article.title}</CardTitle>
                    <div className="text-sm text-gray-500">category: {article.category?.name}</div>
                </CardHeader>
                <CardContent className="prose max-w-none">
                    {/* Simple text rendering for MVP. Markdown or HTML renderer would be better */}
                    <div className="whitespace-pre-wrap">{article.content}</div>
                </CardContent>
            </Card>

            <div className="mt-8 text-center border-t pt-8">
                <p className="text-gray-600 mb-4">Didn't find what you were looking for?</p>
                <Link href="/portal/forms/contact">
                    <Button>Contact Support</Button>
                </Link>
            </div>
        </div>
    );
}
