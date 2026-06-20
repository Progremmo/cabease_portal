"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColDef } from "ag-grid-community";
import { Plus } from "lucide-react";

import { DataTable } from "@/components/tables/DataTable";
import { FormModal } from "@/components/shared/FormModal";
import { TripForm } from "@/components/forms/TripForm";
import { LiveMap } from "@/components/map/LiveMap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tripService, Trip } from "@/services/trip.service";
import { useAuthStore } from "@/store/useAuthStore";

export default function TripsPage() {
  const { user } = useAuthStore();
  const companyId = user?.companyId;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["trips", companyId],
    queryFn: () => tripService.getAll(companyId as string),
    enabled: !!companyId,
  });

  const trips = data?.content || [];

  const columnDefs = useMemo<ColDef<Trip>[]>(
    () => [
      { field: "tripNumber", headerName: "Trip ID", width: 140 },
      { field: "candidate.name", headerName: "Candidate", flex: 1 },
      { field: "driver.user.name", headerName: "Driver", flex: 1, valueFormatter: (p) => p.value || "Unassigned" },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: (params: any) => {
          const status = params.value;
          let variant: "default" | "secondary" | "destructive" | "outline" = "default";
          if (status === "CREATED") variant = "secondary";
          if (status === "ASSIGNED") variant = "default";
          if (status === "STARTED" || status === "IN_PROGRESS" || status === "PICKED_UP") variant = "default";
          if (status === "COMPLETED") variant = "outline";
          if (status === "CANCELLED") variant = "destructive";
          return <Badge variant={variant} className="mt-2">{status}</Badge>;
        },
      },
      { field: "scheduledPickupAt", headerName: "Scheduled", valueFormatter: (p) => p.value ? new Date(p.value).toLocaleString() : "Now" },
      { field: "candidate.pickupAddress", headerName: "Pickup", flex: 1 },
      { field: "candidate.dropAddress", headerName: "Drop", flex: 1 },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trips</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage active ride assignments.
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Trip
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl bg-card border border-border shadow-sm p-4">
          <DataTable
            rowData={trips}
            columnDefs={columnDefs}
            isLoading={isLoading}
            height={600}
          />
        </div>
        <div className="h-[600px] lg:col-span-1">
          <LiveMap 
            height={635} 
            markers={trips.map((t: Trip) => ({
              id: t.id,
              lat: t.candidate.pickupLatitude,
              lng: t.candidate.pickupLongitude,
              title: `Trip ${t.tripNumber} - ${t.candidate.name}`
            }))} 
          />
        </div>
      </div>

      <FormModal
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        title="Create New Trip"
        description="Initiate a trip request for a candidate."
      >
        <TripForm onSuccess={() => setIsAddModalOpen(false)} />
      </FormModal>
    </div>
  );
}
