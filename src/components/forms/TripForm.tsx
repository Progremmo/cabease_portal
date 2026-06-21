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
import { Input } from "@/components/ui/input";
import { Trip, tripService } from "@/services/trip.service";
import { candidateService } from "@/services/candidate.service";
import { useAuthStore } from "@/store/useAuthStore";

const formSchema = z.object({
  candidateId: z.string().min(1, "Candidate selection is required"),
  scheduledPickupAt: z.string().optional(),
});

type TripFormValues = z.infer<typeof formSchema>;

interface TripFormProps {
  initialData?: Trip;
  onSuccess?: () => void;
}

export function TripForm({ initialData, onSuccess }: TripFormProps) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const isEditMode = !!initialData;

  const { data: candidatesData } = useQuery({
    queryKey: ["candidates", user?.companyId],
    queryFn: () => candidateService.getAll(user?.companyId as string, 0, 100),
    enabled: !!user?.companyId,
  });

  const candidates = candidatesData?.content || [];

  const form = useForm<TripFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      candidateId: initialData?.candidate?.id || "",
      scheduledPickupAt: initialData?.scheduledPickupAt ? new Date(initialData.scheduledPickupAt).toISOString().slice(0, 16) : "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: TripFormValues) => {
      let isoDate = undefined;
      if (data.scheduledPickupAt) {
        isoDate = new Date(data.scheduledPickupAt).toISOString();
      }
      if (isEditMode) {
        return tripService.update(initialData.id, data.candidateId, isoDate);
      }
      return tripService.create(data.candidateId, user?.companyId as string, isoDate);
    },
    onSuccess: () => {
      toast.success(isEditMode ? "Trip updated successfully" : "Trip created successfully");
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || (isEditMode ? "Failed to update trip" : "Failed to create trip"));
    },
  });

  const onSubmit = (data: TripFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="candidateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Candidate</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a candidate for this trip" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {candidates.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} ({c.pickupAddress})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scheduledPickupAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scheduled Pickup (Optional)</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Trip" : "Create Trip")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
