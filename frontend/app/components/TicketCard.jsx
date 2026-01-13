"use client";

import { useRouter } from "next/navigation";

const severityStyles = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
  unassigned: "bg-gray-100 text-gray-600",
};

const statusStyles = {
  new: "bg-blue-100 text-blue-700",
  "in-progress": "bg-purple-100 text-purple-700",
  resolved: "bg-gray-200 text-gray-600",
};

export default function TicketCard({ ticket }) {
  const router = useRouter();

  if (!ticket?._id) return null;

  const severity = ticket.severity || "unassigned";
  const status = ticket.status || "new";
  const category = ticket.categoryId?.name || "unassigned";
  const assignedAgent = ticket.assignedAgentId?.name;

  return (
    <div
      onClick={() => router.push(`/tickets/${ticket._id}`)}
      className="cursor-pointer border rounded-lg p-4 bg-white hover:shadow-sm transition"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span
            className={`px-2 py-0.5 rounded capitalize ${
              severityStyles[severity] || severityStyles.unassigned
            }`}
          >
            {severity}
          </span>

          <span
            className={`px-2 py-0.5 rounded capitalize ${
              statusStyles[status] || statusStyles.new
            }`}
          >
            {status}
          </span>

          <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
            {category}
          </span>
        </div>

        <span className="text-xs text-gray-500">
          {assignedAgent ? `Assigned to ${assignedAgent}` : "Unassigned"}
        </span>
      </div>

      <h3 className="text-sm font-medium text-gray-900 truncate">
        {ticket.title}
      </h3>
    </div>
  );
}
