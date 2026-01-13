"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

const severityOptions = ["low", "medium", "high", "critical"];
const statusOptions = ["new", "in-progress", "resolved"];

function decodeRole() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]))?.role;
  } catch {
    return null;
  }
}

export default function TicketDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [role, setRole] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userRole = decodeRole();
    if (!userRole) {
      router.replace("/login");
      return;
    }
    setRole(userRole);

    const loadTicket = async () => {
      try {
        const data = await apiFetch(`/tickets/${id}`);
        setTicket(data.ticket);
        setComments(Array.isArray(data.comments) ? data.comments : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id, router]);

  const updateTicketField = async (field, value) => {
    try {
      const updated = await apiFetch(`/tickets/${id}/${field}`, {
        method: "PATCH",
        body: JSON.stringify({ [field]: value }),
      });
      setTicket(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const comment = await apiFetch(`/tickets/${id}/comments`, {
        method: "POST",
        body: JSON.stringify({
          content: newComment,
          isInternal: role !== "customer" ? isInternal : false,
        }),
      });

      setComments((prev) => [...prev, comment]);
      setNewComment("");
      setIsInternal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || "Ticket not found"}
      </div>
    );
  }

  const canEdit = role === "agent" || role === "admin";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => router.push("/dashboard")}
        className="text-sm text-blue-600 hover:underline mb-4"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h1 className="text-xl font-semibold mb-2">{ticket.title}</h1>

        <p className="text-gray-700 mb-4">{ticket.description}</p>

        <div className="flex flex-wrap gap-3 text-xs">
          {canEdit ? (
            <select
              value={ticket.severity || ""}
              onChange={(e) => updateTicketField("severity", e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">Unassigned</option>
              {severityOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          ) : (
            <span className="px-2 py-1 bg-gray-100 rounded">
              Severity: {ticket.severity || "unassigned"}
            </span>
          )}

          {canEdit ? (
            <select
              value={ticket.status}
              onChange={(e) => updateTicketField("status", e.target.value)}
              className="border rounded px-2 py-1"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          ) : (
            <span className="px-2 py-1 bg-gray-100 rounded">
              Status: {ticket.status}
            </span>
          )}

          <span className="px-2 py-1 bg-gray-100 rounded">
            Category: {ticket.categoryId?.name || "unassigned"}
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-sm font-semibold mb-4">Discussion</h2>

        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet</p>
        ) : (
          <div className="space-y-3 mb-4">
            {comments.map((c) => (
              <div
                key={c._id}
                className={`border rounded p-3 text-sm ${
                  c.isInternal ? "bg-yellow-50" : ""
                }`}
              >
                <p className="text-gray-800">{c.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {c.authorRole}
                  {c.isInternal && " • internal"}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
          />

          {canEdit && (
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
              />
              Internal comment (visible only to agents/admins)
            </label>
          )}

          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
