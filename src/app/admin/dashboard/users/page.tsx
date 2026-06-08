"use client";

import { Check, Edit } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AdminTabHeader } from "@/components/admin/AdminTabHeader";
import { UserForm } from "@/components/admin/UserForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DeleteConfirmation } from "@/components/ui/DeleteConfirmation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/store/useToast";

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  lastLogin: string | null;
  resumeCount: number;
}

export default function UsersPage() {
  const { addToast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<string>("");
  const [isAddingUser, setIsAddingUser] = useState(false);
  const limit = 10;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      `/api/admin/users?page=${page}&limit=${limit}&search=${search}`,
    );
    const data = await res.json();
    setUsers(data.users);
    setTotal(data.total);
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deleteUser = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      addToast({ message: "User deleted successfully", variant: "success" });
      fetchUsers();
    } catch (error) {
      addToast({ message: "Failed to delete user", variant: "destructive" });
      throw error;
    }
  };

  const updateRole = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({ role: editRole }),
      });
      if (!res.ok) throw new Error("Failed to update");
      addToast({ message: "User updated successfully", variant: "success" });
      setEditingId(null);
      fetchUsers();
    } catch (_error) {
      addToast({ message: "Failed to update user", variant: "destructive" });
    }
  };

  const addUser = async (data: {
    email: string;
    role: string;
    password?: string;
  }) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add");
      addToast({ message: "User added successfully", variant: "success" });
      setIsAddingUser(false);
      setPage(1);
      fetchUsers();
    } catch (_error) {
      addToast({ message: "Failed to add user", variant: "destructive" });
    }
  };

  const selectClassName =
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

  const renderRoleCell = (user: User) => {
    if (editingId === user._id) {
      return (
        <div className="flex gap-2 justify-center items-center">
          <select
            value={editRole}
            onChange={(e) => setEditRole(e.target.value)}
            className={selectClassName}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateRole(user._id)}
          >
            <Check className="h-4 w-4 text-emerald-600" />
          </Button>
        </div>
      );
    }
    return (
      <div className="flex justify-center items-center gap-2">
        <Badge variant={user.role === "admin" ? "primary" : "outline"}>
          {user.role}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setEditingId(user._id);
            setEditRole(user.role);
          }}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="p-6">
      <AdminTabHeader
        title="Users"
        onSearch={(val) => {
          setSearch(val);
          setPage(1);
        }}
        onAdd={() => setIsAddingUser(true)}
        view={view}
        onViewChange={setView}
      />

      {isAddingUser && (
        <UserForm onClose={() => setIsAddingUser(false)} onSuccess={addUser} />
      )}

      {loading ? (
        <Card className="p-10 text-center">Loading...</Card>
      ) : (
        <Card className="overflow-hidden">
          {view === "table" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-center">Role</TableHead>
                  <TableHead>Resumes</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{renderRoleCell(user)}</TableCell>
                    <TableCell>{user.resumeCount}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : "Never"}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <DeleteConfirmation
                        onConfirm={() => deleteUser(user._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {users.map((user) => (
                <Card key={user._id} className="p-4 flex flex-col gap-2">
                  <div className="font-bold">{user.email}</div>
                  {renderRoleCell(user)}
                  <div className="text-sm text-muted-foreground">
                    Resumes: {user.resumeCount}
                  </div>
                  <div className="text-sm">
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <DeleteConfirmation
                      onConfirm={() => deleteUser(user._id)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
          <div className="p-4 border-t flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, total)} of {total} users
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={page * limit >= total}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
