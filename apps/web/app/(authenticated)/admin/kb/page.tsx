"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";

export default function AdminKB() {
    const [articles, setArticles] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newArticle, setNewArticle] = useState({ title: "", content: "", categoryId: "", isPublic: true });
    // const { toast } = useToast();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const catsRes = await fetch("http://localhost:3001/kb/categories");
        if (catsRes.ok) setCategories(await catsRes.json());

        // For MVP just fetch all via categories or search, 
        // ideally we'd have a "getAllArticles" for admin. 
        // Let's just use the category list to flatten them for display
        if (catsRes.ok) {
            // const allArticles = (await catsRes.json()).flatMap(c => c.articles); // Wait, already consumed json
            // Re-fetching or just using the state update logic properly
        }
    };

    const visibleArticles = categories.flatMap(c => c.articles || []);

    const handleCreate = async () => {
        const res = await fetch("http://localhost:3001/kb/articles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...newArticle,
                category: { id: parseInt(newArticle.categoryId) }
            })
        });
        if (res.ok) {
            // toast({ title: "Article Created" });
            alert("Article Created");
            setIsCreating(false);
            loadData();
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Knowledge Base Management</h1>
                <Button onClick={() => setIsCreating(!isCreating)}>
                    {isCreating ? "Cancel" : "New Article"}
                </Button>
            </div>

            {isCreating && (
                <Card className="mb-8 border-blue-200 bg-blue-50">
                    <CardHeader><CardTitle>Create New Article</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={newArticle.title}
                                onChange={e => setNewArticle({ ...newArticle, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label>Category</Label>
                            <select
                                className="w-full p-2 border rounded"
                                value={newArticle.categoryId}
                                onChange={e => setNewArticle({ ...newArticle, categoryId: e.target.value })}
                            >
                                <option value="">Select Category...</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <Label>Content</Label>
                            <textarea
                                className="w-full p-2 border rounded h-32"
                                value={newArticle.content}
                                onChange={e => setNewArticle({ ...newArticle, content: e.target.value })}
                            />
                        </div>
                        <Button onClick={handleCreate}>Save Article</Button>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {visibleArticles.length === 0 && <div className="text-gray-500">No articles found. Create categories/articles in DB or here.</div>}
                {visibleArticles.map(article => (
                    <Card key={article.id}>
                        <CardContent className="flex justify-between items-center p-4">
                            <div>
                                <div className="font-bold text-lg">{article.title}</div>
                                <div className="text-sm text-gray-500">ID: {article.id} | Public: {article.isPublic ? 'Yes' : 'No'}</div>
                            </div>
                            <Button variant="outline" size="sm">Edit</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
