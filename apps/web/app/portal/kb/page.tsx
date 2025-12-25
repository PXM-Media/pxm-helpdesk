"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KnowledgeBaseHome() {
    const [categories, setCategories] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (searchQuery.length > 2) {
            handleSearch();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const fetchCategories = async () => {
        try {
            const res = await fetch("http://localhost:3001/kb/categories");
            if (res.ok) {
                setCategories(await res.json());
            }
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    };

    const handleSearch = async () => {
        try {
            const res = await fetch(`http://localhost:3001/kb/search?q=${searchQuery}`);
            if (res.ok) {
                setSearchResults(await res.json());
            }
        } catch (error) {
            console.error("Search failed", error);
        }
    };

    return (
        <div className="container mx-auto py-10 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">How can we help you?</h1>

            <div className="mb-12">
                <Input
                    className="w-full text-lg p-6 shadow-md"
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchResults.length > 0 && (
                    <Card className="mt-2 absolute z-10 w-full max-w-4xl shadow-xl">
                        <CardContent className="p-4">
                            {searchResults.map(article => (
                                <Link key={article.id} href={`/portal/kb/${article.id}`} className="block p-3 hover:bg-slate-50 border-b last:border-0">
                                    <div className="font-semibold text-blue-600">{article.title}</div>
                                    <div className="text-sm text-gray-500 truncate">{article.content}</div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => (
                    <Card key={category.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>{category.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {category.articles?.slice(0, 5).map((article: any) => (
                                    <li key={article.id}>
                                        <Link href={`/portal/kb/${article.id}`} className="text-blue-500 hover:underline">
                                            {article.title}
                                        </Link>
                                    </li>
                                ))}
                                {category.articles?.length > 5 && (
                                    <li className="text-sm text-gray-400 italic">...and more</li>
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
