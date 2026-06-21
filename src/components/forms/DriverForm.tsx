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
  userId: z.string().optional(), // Make optional since we don't edit it
  licenseNumber: z.string().min(1, "License Number is required"),
  licenseExpiry: z.string().min(1, "License Expiry Date is required"),
  aadhaarNumber: z.string().min(12, "Aadhaar Number must be 12 digits").max(12, "Aadhaar Number must be 12 digits"),
  panNumber: z.string().min(10, "PAN Number must be 10 characters").max(10, "PAN Number must be 10 characters"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  vendorId: z.string().optional(),
});

type DriverFormValues = z.infer<typeof formSchema>;

interface DriverFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export function DriverForm({ initialData, onSuccess }: DriverFormProps) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const form = useForm<DriverFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      licenseNumber: initialData?.licenseNumber || "",
      licenseExpiry: initialData?.licenseExpiry || "",
      aadhaarNumber: initialData?.aadhaarNumber || "",
      panNumber: initialData?.panNumber || "",
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      vendorId: initialData?.vendor?.id || "",
    },
  });

  const isEditing = !!initialData;

  const mutation = useMutation({
    mutationFn: (data: any) =>
      isEditing
        ? driverService.update(initialData.id, data)
        : driverService.create(data as CreateDriverRequest),
    onSuccess: () => {
      toast.success(isEditing ? "Driver updated successfully" : "Driver profile created successfully");
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || `Failed to ${isEditing ? "update" : "create"} driver`);
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
        {!isEditing && (
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
        )}
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
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="aadhaarNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aadhaar Number <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="123456789012" {...field} maxLength={12} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="panNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN Number <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="ABCDE1234F" {...field} maxLength={10} className="uppercase" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="vendorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor ID (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Vendor UUID..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : isEditing ? "Update Driver" : "Create Driver Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
