"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColDef } from "ag-grid-community";
import { Plus } from "lucide-react";

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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        title="Add New Candidate"
        description="Register a new employee for the cab service."
      >
        <CandidateForm onSuccess={() => setIsAddModalOpen(false)} />
      </FormModal>
    </div>
  );
}
