"use client";

import Search from "./Search";

export default function Sidebar({
  users = [],
  currentUserRole,
  onRoleChange,
  search,
  onSearch,
}) {
  return (
    <aside className="w-64 border-r bg-white h-full flex flex-col">
      {currentUserRole === "admin" && (
        <div className="p-3 border-b">
          <Search value={search} onChange={onSearch} />
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        {!Array.isArray(users) || users.length === 0 ? (
          <p className="text-sm text-gray-500 p-4">No users found</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-50"
            >
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p
                  className={`text-xs ${
                    user.role === "admin"
                      ? "text-purple-600"
                      : user.role === "agent"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {user.role}
                </p>
              </div>
              {currentUserRole === "admin" && (
                <>
                  {user.role === "customer" && (
                    <button
                      onClick={() => onRoleChange(user._id, "agent")}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Make Agent
                    </button>
                  )}

                  {user.role === "agent" && (
                    <button
                      onClick={() => onRoleChange(user._id, "customer")}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove Agent
                    </button>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
