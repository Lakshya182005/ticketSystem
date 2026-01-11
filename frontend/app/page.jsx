'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <h1 className="text-lg font-semibold">Ticket System</h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.push('/login')}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>

          <button
            onClick={() => router.push('/signup')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Welcome to the Ticket System
          </h2>

          <p className="text-gray-600 mb-8">
            A simple platform to raise, track, and resolve issues efficiently.
          </p>

          {/* Demo / FAQ */}
          <div className="text-left bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Common Issues</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Unable to login to account</li>
              <li>• Application crashes on startup</li>
              <li>• Feature not working as expected</li>
              <li>• Request for account access</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
