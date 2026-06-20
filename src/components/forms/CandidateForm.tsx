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
import { candidateService, CreateCandidateRequest } from "@/services/candidate.service";
import { useAuthStore } from "@/store/useAuthStore";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  mobile: z.string().min(1, "Mobile is required"),
  pickupAddress: z.string().min(1, "Pickup Address is required"),
  pickupLatitude: z.coerce.number().min(-90).max(90),
  pickupLongitude: z.coerce.number().min(-180).max(180),
  dropAddress: z.string().min(1, "Drop Address is required"),
  dropLatitude: z.coerce.number().min(-90).max(90),
  dropLongitude: z.coerce.number().min(-180).max(180),
  shiftTime: z.string().optional(),
});

type CandidateFormValues = z.infer<typeof formSchema>;

interface CandidateFormProps {
  onSuccess?: () => void;
}

export function CandidateForm({ onSuccess }: CandidateFormProps) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const form = useForm<CandidateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      pickupAddress: "",
      pickupLatitude: 0,
      pickupLongitude: 0,
      dropAddress: "",
      dropLatitude: 0,
      dropLongitude: 0,
      shiftTime: "09:00",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreateCandidateRequest) => candidateService.create(data),
    onSuccess: () => {
      toast.success("Candidate created successfully");
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create candidate");
    },
  });

  const onSubmit = (data: CandidateFormValues) => {
    mutation.mutate({
      ...data,
      companyId: user?.companyId as string,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl><Input placeholder="1234567890" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shiftTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shift Time</FormLabel>
                <FormControl><Input type="time" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 border p-3 rounded-md bg-zinc-50 dark:bg-zinc-900/50">
          <h4 className="text-sm font-medium">Pickup Details</h4>
          <FormField
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl><Input placeholder="Pickup Address" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField control={form.control} name="pickupLatitude" render={({ field }) => (<FormItem><FormControl><Input type="number" step="any" placeholder="Lat" {...field} /></FormControl></FormItem>)} />
            <FormField control={form.control} name="pickupLongitude" render={({ field }) => (<FormItem><FormControl><Input type="number" step="any" placeholder="Lng" {...field} /></FormControl></FormItem>)} />
          </div>
        </div>

        <div className="space-y-2 border p-3 rounded-md bg-zinc-50 dark:bg-zinc-900/50">
          <h4 className="text-sm font-medium">Drop Details</h4>
          <FormField
            control={form.control}
            name="dropAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl><Input placeholder="Drop Address" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField control={form.control} name="dropLatitude" render={({ field }) => (<FormItem><FormControl><Input type="number" step="any" placeholder="Lat" {...field} /></FormControl></FormItem>)} />
            <FormField control={form.control} name="dropLongitude" render={({ field }) => (<FormItem><FormControl><Input type="number" step="any" placeholder="Lng" {...field} /></FormControl></FormItem>)} />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating..." : "Create Candidate"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
