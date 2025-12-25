export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="z-10 max-w-5xl w-full text-center font-sans">
                <h1 className="text-5xl font-bold mb-6 text-blue-600">Helpdesk Portal</h1>
                <p className="mb-8 text-xl">Welcome to your support center.</p>

                <div className="flex gap-4 justify-center">
                    <a href="/portal/kb" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                        Browse Knowledge Base
                    </a>
                    <a href="/login" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
                        Agent Login
                    </a>
                </div>
            </div>
        </main>
    );
}
