"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <h1
          className="text-lg font-semibold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Ticket System
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Sign Up
          </button>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to the Ticket System
            </h2>
            <p className="text-gray-600 text-lg">
              Raise issues, track progress, and get resolutions — all in one
              place.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <p className="text-gray-700 leading-relaxed">
              This platform allows users to report issues they face while using
              the application or services. Once a ticket is raised, it is
              reviewed by our support team and handled based on priority and
              category. You can track the status of your ticket, add comments,
              and stay updated until it is resolved.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-medium">
                  I am unable to login or sign up. What should I do?
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Please make sure you are using a valid email address and the
                  correct password. If the issue persists, raise a ticket
                  describing the problem and our support team will assist you.
                </p>
              </div>

              <div>
                <p className="font-medium">
                  The website crashes or does not respond properly.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Try refreshing the page or logging in again. If the problem
                  continues, create a ticket with details about what you were
                  doing when the issue occurred.
                </p>
              </div>

              <div>
                <p className="font-medium">
                  How can I track the status of my issue?
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  After logging in, you can view all your raised tickets in the
                  dashboard along with their current status and updates from the
                  support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
