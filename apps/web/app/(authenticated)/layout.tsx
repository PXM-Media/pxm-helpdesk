"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return (
        <div className="flex min-h-screen w-full bg-gray-50">
            <aside className="hidden w-64 flex-col border-r bg-white px-4 py-6 md:flex">
                <div className="mb-8 text-2xl font-bold px-2">Helpdesk</div>
                <nav className="flex flex-col space-y-1">
                    <Link href="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                        Dashboard
                    </Link>
                    <Link href="/tickets/new" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                        New Ticket
                    </Link>
                    <Link href="/profile" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                        Profile
                    </Link>

                    <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Admin
                    </div>
                    <Link href="/admin/forms" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                        Forms Builder
                    </Link>
                    <Link href="/admin/kb" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                        Knowledge Base
                    </Link>
                    <Link href="/admin/reporting" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                        Reporting
                    </Link>
                    <Link href="/admin/settings" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                        Settings
                    </Link>
                </nav>
                <div className="mt-auto">
                    <Button variant="outline" className="w-full" onClick={handleLogout}>Logout</Button>
                </div>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    )
}
