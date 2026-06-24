"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trip, tripService } from "@/services/trip.service";
import { driverService } from "@/services/driver.service";
import { useAuthStore } from "@/store/useAuthStore";

const formSchema = z.object({
  driverId: z.string().optional(),
  assignmentType: z.enum(["AUTO", "MANUAL"]),
});

type AssignDriverFormValues = z.infer<typeof formSchema>;

interface AssignDriverFormProps {
  trip: Trip;
  onSuccess?: () => void;
}

export function AssignDriverForm({ trip, onSuccess }: AssignDriverFormProps) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: driversData } = useQuery({
    queryKey: ["drivers", user?.companyId],
    queryFn: () => driverService.getAll(user?.companyId as string),
    enabled: !!user?.companyId,
  });

  const drivers = driversData || [];
  const availableDrivers = drivers.filter((d: any) => d.availabilityStatus === "AVAILABLE" && d.active);

  const form = useForm<AssignDriverFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assignmentType: "AUTO",
      driverId: "",
    },
  });

  const assignmentType = form.watch("assignmentType");

  const mutation = useMutation({
    mutationFn: (data: AssignDriverFormValues) =>
      tripService.assignDriver(trip.id, user?.companyId as string, data.driverId || undefined, data.assignmentType),
    onSuccess: () => {
      toast.success("Driver assigned successfully");
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to assign driver");
    },
  });

  const onSubmit = (data: AssignDriverFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="assignmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AUTO">Auto-Assign (Best Match)</SelectItem>
                  <SelectItem value="MANUAL">Manual Assignment</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {assignmentType === "MANUAL" && (
          <FormField
            control={form.control}
            name="driverId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Driver</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an available driver" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableDrivers.length === 0 && (
                      <SelectItem value="no-drivers" disabled>No available drivers found</SelectItem>
                    )}
                    {availableDrivers.map((d: any) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.user?.name} ({d.driverCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={mutation.isPending || (assignmentType === "MANUAL" && !form.watch("driverId"))}>
            {mutation.isPending ? "Assigning..." : "Assign Driver"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
