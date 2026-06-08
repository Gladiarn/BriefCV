"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AdminTabHeader } from "@/components/admin/AdminTabHeader";
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

interface Resume {
  _id: string;
  title: string;
  userId: { email: string };
  createdAt: string;
}

export default function ResumesPage() {
  const { addToast } = useToast();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchResumes = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      `/api/admin/resumes?page=${page}&limit=${limit}&search=${search}`,
    );
    const data = await res.json();
    setResumes(data.resumes);
    setTotal(data.total);
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const deleteResume = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/admin/resumes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      addToast({ message: "Resume deleted successfully", variant: "success" });
      fetchResumes();
    } catch (error) {
      addToast({ message: "Failed to delete resume", variant: "destructive" });
      throw error;
    }
  };

  return (
    <div className="p-6">
      <AdminTabHeader
        title="Resumes"
        onSearch={(val) => {
          setSearch(val);
          setPage(1);
        }}
        view={view}
        onViewChange={setView}
      />

      {loading ? (
        <Card className="p-10 text-center">Loading...</Card>
      ) : (
        <Card className="overflow-hidden">
          {view === "table" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Owner Email</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resumes.map((resume) => (
                  <TableRow key={resume._id}>
                    <TableCell className="font-medium">
                      {resume.title}
                    </TableCell>
                    <TableCell>{resume.userId?.email || "Unknown"}</TableCell>
                    <TableCell>
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <DeleteConfirmation
                        onConfirm={() => deleteResume(resume._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {resumes.map((resume) => (
                <Card key={resume._id} className="p-4 flex flex-col gap-2">
                  <div className="font-bold">{resume.title}</div>
                  <div className="text-sm">
                    Owner: {resume.userId?.email || "Unknown"}
                  </div>
                  <div className="text-sm">
                    Created: {new Date(resume.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <DeleteConfirmation
                      onConfirm={() => deleteResume(resume._id)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
          <div className="p-4 border-t flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, total)} of {total} resumes
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
