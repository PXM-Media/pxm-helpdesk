"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Globe, LayoutDashboard, ShieldCheck } from "lucide-react";

export default function Home() {
    const [brandName, setBrandName] = useState("Loading...");
    const [brandLogo, setBrandLogo] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/settings/public")
            .then(res => res.json())
            .then(data => {
                const name = data.find((s: any) => s.key === 'helpdesk_name')?.value;
                const logo = data.find((s: any) => s.key === 'helpdesk_logo')?.value;
                setBrandName(name || "PXM-Helpdesk");
                setBrandLogo(logo || "");
                setLoaded(true);
            })
            .catch(() => {
                setBrandName("PXM-Helpdesk");
                setLoaded(true);
            });
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none opacity-40 mix-blend-multiply dark:mix-blend-screen animate-blob" />

            {/* Navbar */}
            <header className="w-full px-8 py-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg backdrop-blur-sm">
                        {brandLogo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={brandLogo} alt="Logo" className="w-8 h-8 object-contain" />
                        ) : (
                            <Globe className="w-6 h-6 text-primary" />
                        )}
                    </div>
                    <span className={`font-bold text-xl tracking-tight transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                        {brandName}
                    </span>
                </div>
                <Link href="/login">
                    <Button variant="ghost" className="gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        Agent Login
                    </Button>
                </Link>
            </header>

            {/* Hero Section */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 pb-32">
                <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium dark:bg-blue-900/40 dark:text-blue-300">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Support Center Online
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
                        How can we <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                            help you today?
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Search our comprehensive knowledge base for answers or submit a ticket to get personalized support from our team.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                        <Link href="/portal/kb">
                            <Button size="lg" className="h-14 px-8 text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5">
                                <Book className="mr-2 h-5 w-5" />
                                Browse Knowledge Base
                            </Button>
                        </Link>

                        <div className="text-slate-400 text-sm font-medium px-2">or</div>

                        <Link href="/login?redirect=/tickets/new">
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/50 backdrop-blur-sm hover:bg-white/80 border-slate-200 dark:border-slate-700 dark:bg-slate-800/50">
                                Submit a Ticket
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 text-center text-slate-500 text-sm z-10">
                <p>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</p>
            </footer>
        </main>
    );
}
