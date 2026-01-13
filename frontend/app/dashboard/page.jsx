"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Tickets from "../components/Tickets";
import { apiFetch } from "@/lib/api";

function tokenData(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    const decoded = tokenData(token);
    if (!decoded?.role) {
      router.replace("/login");
      return;
    }

    setUser({
      id: decoded.id,
      role: decoded.role,
    });

    const loadDashboard = async () => {
      try {
        let ticketsData;
        if (decoded.role === "customer") {
          ticketsData = await apiFetch("/tickets/my");
        } else {
          ticketsData = await apiFetch("/tickets");
        }
        setTickets(Array.isArray(ticketsData) ? ticketsData : []);
        if (decoded.role === "admin") {
          const usersData = await apiFetch("/users");
          setUsers(Array.isArray(usersData) ? usersData : []);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error("Dashboard load failed", err);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  const visibleUsers = (() => {
    if (!Array.isArray(users)) return [];

    if (user?.role === "agent") {
      return users.filter((u) => u.role === "agent");
    }

    if (user?.role === "admin") {
      return users.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return [];
  })();

  const handleMakeAgent = async (userId) => {
    try {
      await apiFetch(`/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role: "agent" }),
      });

      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: "agent" } : u))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar user={user} />

      <div className="flex flex-1 overflow-hidden">
        {user.role !== "customer" && (
          <Sidebar
            users={visibleUsers}
            currentUserRole={user.role}
            onRoleChange={handleMakeAgent}
            search={search}
            onSearch={setSearch}
          />
        )}
        <main className="flex-1 p-6 overflow-y-auto">
          <Tickets tickets={tickets} />
        </main>
      </div>
    </div>
  );
}
