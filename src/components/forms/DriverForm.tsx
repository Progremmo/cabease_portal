"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Input } from "@/components/ui/input";
import { driverService, CreateDriverRequest } from "@/services/driver.service";
import { useAuthStore } from "@/store/useAuthStore";

const formSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  licenseNumber: z.string().min(1, "License Number is required"),
  licenseExpiry: z.string().min(1, "License Expiry Date is required"),
  vehicleId: z.string().optional(),
});

type DriverFormValues = z.infer<typeof formSchema>;

interface DriverFormProps {
  onSuccess?: () => void;
}

export function DriverForm({ onSuccess }: DriverFormProps) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const form = useForm<DriverFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      licenseNumber: "",
      licenseExpiry: "",
      vehicleId: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreateDriverRequest) => driverService.create(data),
    onSuccess: () => {
      toast.success("Driver profile created successfully");
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create driver");
    },
  });

  const onSubmit = (data: DriverFormValues) => {
    mutation.mutate({
      ...data,
      companyId: user?.companyId as string,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID (UUID)</FormLabel>
              <FormControl>
                <Input placeholder="Enter existing User UUID..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Number</FormLabel>
              <FormControl>
                <Input placeholder="DL-1234567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="licenseExpiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Expiry Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vehicleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned Vehicle ID (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Vehicle UUID..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating..." : "Create Driver Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
