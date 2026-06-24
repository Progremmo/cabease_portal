"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ColDef } from "ag-grid-community";
import { Plus, Edit, Power, PowerOff } from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/tables/DataTable";
import { DriverForm } from "@/components/forms/DriverForm";
import { FormModal } from "@/components/shared/FormModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { driverService, Driver } from "@/services/driver.service";
import { useAuthStore } from "@/store/useAuthStore";

export default function DriversPage() {
  const { user } = useAuthStore();
  const companyId = user?.companyId;

  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  const isFormModalOpen = isAddModalOpen || !!editingDriver;

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingDriver(null);
  };

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      driverService.update(id, { active }),
    onSuccess: () => {
      toast.success("Driver status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: () => toast.error("Failed to update driver status"),
  });

  // Fetch Drivers
  const { data: drivers = [], isLoading } = useQuery({
    queryKey: ["drivers", companyId],
    queryFn: () => driverService.getAll(companyId as string),
    enabled: !!companyId,
  });

  // AG Grid Column Definitions
  const columnDefs = useMemo<ColDef<Driver>[]>(
    () => [
      {
        field: "driverCode",
        headerName: "Code",
        width: 120,
      },
      {
        field: "user.name",
        headerName: "Name",
        flex: 1,
      },
      {
        field: "user.mobile",
        headerName: "Mobile",
        flex: 1,
      },
      {
        field: "availabilityStatus",
        headerName: "Status",
        cellRenderer: (params: any) => {
          const status = params.value;
          let variant: "default" | "secondary" | "destructive" | "outline" = "default";
          
          switch (status) {
            case "AVAILABLE":
              variant = "default";
              break;
            case "ON_TRIP":
              variant = "secondary";
              break;
            case "OFFLINE":
              variant = "outline";
              break;
            case "ON_LEAVE":
              variant = "destructive";
              break;
          }
          return <Badge variant={variant} className="mt-2">{status}</Badge>;
        },
      },
      {
        field: "licenseNumber",
        headerName: "License",
      },
      {
        field: "vehicle.vehicleNumber",
        headerName: "Vehicle No.",
      },
      {
        field: "rating",
        headerName: "Rating",
        width: 100,
        cellRenderer: (params: any) => {
          return <span>{params.value ? `⭐ ${params.value}` : "N/A"}</span>;
        },
      },
      {
        colId: "actions",
        headerName: "Actions",
        width: 120,
        sortable: false,
        filter: false,
        cellRenderer: (params: any) => {
          const driver = params.data;
          if (!driver) return null;
          const isActive = driver.active;
          
          return (
            <div className="flex items-center gap-2 mt-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setEditingDriver(driver)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={isActive ? "text-destructive h-8 w-8" : "text-green-600 h-8 w-8"}
                onClick={() => updateStatusMutation.mutate({ 
                  id: driver.id, 
                  active: !isActive 
                })}
                title={isActive ? "Disable Driver" : "Enable Driver"}
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
          <h1 className="text-3xl font-bold tracking-tight">Drivers</h1>
          <p className="text-muted-foreground mt-1">
            Manage your driver profiles, availability, and vehicle assignments.
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Driver
        </Button>
      </div>

      <div className="rounded-xl bg-card border border-border shadow-sm p-4">
        <DataTable
          rowData={drivers}
          columnDefs={columnDefs}
          isLoading={isLoading}
          height={600}
        />
      </div>

      <FormModal
        isOpen={isFormModalOpen}
        onOpenChange={(open) => !open && handleCloseModal()}
        title={editingDriver ? "Edit Driver" : "Add New Driver"}
        description={editingDriver ? "Update driver details." : "Create a new driver profile and assign a vehicle."}
      >
        <DriverForm 
          initialData={editingDriver} 
          onSuccess={handleCloseModal} 
        />
      </FormModal>
    </div>
  );
}
