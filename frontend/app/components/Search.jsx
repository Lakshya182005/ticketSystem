"use client";

export default function Search({ value = "", onChange }) {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
    />
  );
}
