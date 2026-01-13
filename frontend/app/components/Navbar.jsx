"use client";

import { useRouter } from "next/navigation";

export default function Navbar({ user }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <h1
          className="text-lg font-semibold cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          Ticket System
        </h1>

        {user?.role === "customer" && (
          <button
            onClick={() => router.push("/tickets/new")}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700"
          >
            Create Ticket
          </button>
        )}
      </div>

      {user && (
        <div className="flex items-center gap-4 text-sm">
          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 capitalize">
            {user.role}
          </span>

          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
