"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ColDef } from "ag-grid-community";
import { Plus, Edit, Power, PowerOff } from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/tables/DataTable";
import { FormModal } from "@/components/shared/FormModal";
import { CandidateForm } from "@/components/forms/CandidateForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { candidateService, Candidate } from "@/services/candidate.service";
import { useAuthStore } from "@/store/useAuthStore";

export default function CandidatesPage() {
  const { user } = useAuthStore();
  const companyId = user?.companyId;

  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);

  const isFormModalOpen = isAddModalOpen || !!editingCandidate;

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingCandidate(null);
  };

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      candidateService.update(id, { status }),
    onSuccess: () => {
      toast.success("Status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
    onError: () => toast.error("Failed to update status"),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["candidates", companyId],
    queryFn: () => candidateService.getAll(companyId as string),
    enabled: !!companyId,
  });

  const candidates = data?.content || [];

  const columnDefs = useMemo<ColDef<Candidate>[]>(
    () => [
      { field: "candidateCode", headerName: "Code", width: 120 },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "mobile", headerName: "Mobile", flex: 1 },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: (params: any) => {
          const status = params.value;
          let variant: "default" | "secondary" | "destructive" | "outline" = "default";
          if (status === "INACTIVE") variant = "secondary";
          if (status === "ON_TRIP") variant = "default";
          if (status === "COMPLETED") variant = "outline";
          return <Badge variant={variant} className="mt-2">{status}</Badge>;
        },
      },
      { field: "shiftTime", headerName: "Shift Time" },
      { field: "pickupAddress", headerName: "Pickup", flex: 1 },
      { field: "dropAddress", headerName: "Drop", flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        sortable: false,
        filter: false,
        cellRenderer: (params: any) => {
          const candidate = params.data;
          if (!candidate) return null;
          const isActive = candidate.status !== "INACTIVE";
          
          return (
            <div className="flex items-center gap-2 mt-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setEditingCandidate(candidate)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={isActive ? "text-destructive h-8 w-8" : "text-green-600 h-8 w-8"}
                onClick={() => updateStatusMutation.mutate({ 
                  id: candidate.id, 
                  status: isActive ? "INACTIVE" : "ACTIVE" 
                })}
              >
                {isActive ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground mt-1">
            Manage employees requiring transportation.
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Candidate
        </Button>
      </div>

      <div className="rounded-xl bg-card border border-border shadow-sm p-4">
        <DataTable
          rowData={candidates}
          columnDefs={columnDefs}
          isLoading={isLoading}
          height={600}
        />
      </div>

      <FormModal
        isOpen={isFormModalOpen}
        onOpenChange={(open) => !open && handleCloseModal()}
        title={editingCandidate ? "Edit Candidate" : "Add New Candidate"}
        description={editingCandidate ? "Update candidate details." : "Register a new employee for the cab service."}
      >
        <CandidateForm 
          initialData={editingCandidate} 
          onSuccess={handleCloseModal} 
        />
      </FormModal>
    </div>
  );
}
