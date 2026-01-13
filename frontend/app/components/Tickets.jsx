"use client";

import TicketCard from "./TicketCard";

export default function Tickets({ tickets = [] }) {
  if (!Array.isArray(tickets) || tickets.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-gray-500">
        No tickets available
      </div>
    );
  }

  const sortedTickets = [...tickets].sort((a, b) => {
    if (a.status === "resolved" && b.status !== "resolved") return 1;
    if (a.status !== "resolved" && b.status === "resolved") return -1;

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="space-y-3">
      {sortedTickets.map((ticket) => (
        <TicketCard key={ticket._id} ticket={ticket} />
      ))}
    </div>
  );
}
