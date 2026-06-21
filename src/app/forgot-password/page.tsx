"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const resetSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { otp: "", password: "", confirmPassword: "" },
  });

  async function onEmailSubmit(values: z.infer<typeof emailSchema>) {
    try {
      setIsLoading(true);
      await authService.sendOtp({
        identifier: values.email,
        otpType: "PASSWORD_RESET",
      });
      setEmail(values.email);
      setStep(2);
      toast.success("OTP sent to your email");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  }

  async function onResetSubmit(values: z.infer<typeof resetSchema>) {
    try {
      setIsLoading(true);
      await authService.resetPassword({
        identifier: email,
        otp: values.otp,
        newPassword: values.password,
      });
      toast.success("Password reset successfully. Please login.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-background selection:bg-primary/30">
      {/* Left Pane - Branding & Visuals */}
      <div className="hidden lg:flex w-1/2 relative bg-muted overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/40 to-purple-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 z-10 bg-background/50" />
        <Image src="/images/dashboard_mockup.png" alt="Dashboard" fill className="object-cover opacity-60" priority sizes="50vw" />

        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen opacity-70 -translate-x-1/4 -translate-y-1/4 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen opacity-60 translate-x-1/4 translate-y-1/4 animate-pulse" style={{ animationDuration: '10s' }} />

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-16 text-foreground">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <Image src="/icon.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">{siteConfig.name}</span>
          </div>

          <div className="max-w-lg mb-12">
            <h2 className="text-4xl font-semibold mb-6 text-white leading-tight">
              Secure Account Recovery.
            </h2>
            <p className="text-xl text-white/70 font-light leading-relaxed">
              Regain access to your enterprise dashboard securely.
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 -translate-x-1/2 -translate-y-1/2 lg:hidden" />

        <div className="w-full max-w-md relative z-10">
          <div className="mb-6">
            <Link href="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>

          <Card className="border-border shadow-2xl bg-surface/80 backdrop-blur-xl">
            <CardHeader className="space-y-2 pb-8">
              <CardTitle className="text-2xl">Reset Password</CardTitle>
              <CardDescription className="text-base">
                {step === 1 ? "Enter your email to receive a verification code." : `Enter the verification code sent to ${email}.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <Form {...emailForm}>
                  <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-5">
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                         <FormItem>
                          <FormLabel className="text-foreground/80">Corporate Email</FormLabel>
                          <FormControl>
                            <Input className="h-12 bg-background/50 border-border" placeholder="admin@cabease.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold mt-4 shadow-lg shadow-primary/25" disabled={isLoading}>
                      {isLoading ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                      ) : "Send Verification Code"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...resetForm}>
                  <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-5">
                    <FormField
                      control={resetForm.control}
                      name="otp"
                      render={({ field }) => (
                         <FormItem>
                          <FormLabel className="text-foreground/80">Verification Code (OTP)</FormLabel>
                          <FormControl>
                            <Input className="h-12 bg-background/50 border-border text-center tracking-[0.5em] font-mono text-lg" placeholder="••••••" maxLength={6} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={resetForm.control}
                      name="password"
                      render={({ field }) => (
                         <FormItem>
                          <FormLabel className="text-foreground/80">New Password</FormLabel>
                          <FormControl>
                            <Input className="h-12 bg-background/50 border-border" type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={resetForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                         <FormItem>
                          <FormLabel className="text-foreground/80">Confirm New Password</FormLabel>
                          <FormControl>
                            <Input className="h-12 bg-background/50 border-border" type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold mt-4 shadow-lg shadow-primary/25" disabled={isLoading}>
                      {isLoading ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Resetting...</>
                      ) : "Reset Password"}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
