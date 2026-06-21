"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { CarFront, Loader2 } from "lucide-react";
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

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const res = await authService.login({
        loginType: "PASSWORD",
        email: values.email,
        password: values.password,
      });

      setAuth(res.user, res.accessToken, res.refreshToken);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials");
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

        {/* Animated glowing orbs inside the left pane */}
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
              Streamline your enterprise fleet operations.
            </h2>
            <p className="text-xl text-white/70 font-light leading-relaxed">
              {siteConfig.mission}
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-24 relative overflow-hidden">
        {/* Mobile background orbs */}
        <div className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 -translate-x-1/2 -translate-y-1/2 lg:hidden" />

        <div className="w-full max-w-md relative z-10">
          <div className="flex lg:hidden flex-col items-center mb-8">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-4">
              <Image src="/icon.png" alt="Logo" fill className="object-cover" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{siteConfig.name}</h1>
            <p className="text-muted-foreground mt-2 text-center">
              {siteConfig.tagline}
            </p>
          </div>

          <Card className="border-border shadow-2xl bg-surface/80 backdrop-blur-xl">
            <CardHeader className="space-y-2 pb-8">
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription className="text-base">Enter your credentials to securely access your portal</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Corporate Email</FormLabel>
                        <FormControl>
                          <Input className="h-12 bg-background/50 border-border" placeholder={siteConfig.company.adminEmail} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-foreground/80">Password</FormLabel>
                          <Link href="/forgot-password" className="text-sm text-primary hover:underline font-medium">Forgot password?</Link>
                        </div>
                        <FormControl>
                          <Input className="h-12 bg-background/50 border-border" type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold mt-4 shadow-lg shadow-primary/25" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      "Sign in to Dashboard"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don&apos;t have an account? <a href="/contact" className="text-primary hover:underline font-medium">Request access</a>
          </p>
        </div>
      </div>
    </div>
  );
}
