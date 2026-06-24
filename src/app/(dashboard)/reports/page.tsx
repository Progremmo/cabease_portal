"use client";

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColDef } from "ag-grid-community";
import { Shield } from "lucide-react";

import { DataTable } from "@/components/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { auditService, AuditLog } from "@/services/audit.service";
import { useAuthStore } from "@/store/useAuthStore";

export default function ReportsPage() {
  const { user } = useAuthStore();
  const companyId = user?.companyId;

  const { data, isLoading } = useQuery({
    queryKey: ["audit-logs", companyId],
    queryFn: () => auditService.getLogs(companyId as string),
    enabled: !!companyId,
  });

  const logs = data?.content || [];

  const columnDefs = useMemo<ColDef<AuditLog>[]>(
    () => [
      { field: "createdAt", headerName: "Timestamp", width: 180, valueFormatter: (p) => new Date(p.value).toLocaleString() },
      { field: "actorEmail", headerName: "Actor Email", flex: 1 },
      { field: "action", headerName: "Action" },
      { field: "resourceType", headerName: "Resource" },
      { field: "resourceId", headerName: "Resource ID", flex: 1 },
      {
        field: "result",
        headerName: "Status",
        width: 120,
        cellRenderer: (params: any) => {
          const status = params.value;
          return <Badge variant={status === "SUCCESS" ? "default" : "destructive"} className="mt-2">{status}</Badge>;
        },
      },
      { field: "ipAddress", headerName: "IP Address" },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Reports</h1>
          <p className="text-muted-foreground mt-1">
            System-wide activity logs for compliance and debugging.
          </p>
        </div>
        <Shield className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="rounded-xl bg-card border border-border shadow-sm p-4">
        <DataTable
          rowData={logs}
          columnDefs={columnDefs}
          isLoading={isLoading}
          height={650}
          paginationPageSize={50}
        />
      </div>
    </div>
  );
}
