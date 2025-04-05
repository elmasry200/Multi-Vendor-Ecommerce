"use client";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";

import CardWrapper from "@/components/frontend/auth/card-wrapper";
import SubmitButton from "@/components/backoffice/SubmitButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginForm() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      console.log("Attempting to sign in with credentials:", values);
      const loginData = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      console.log("SignIn response:", loginData);
      if (loginData?.error) {
        setLoading(false);
        toast.error("Sign-in error: Check your credentials");
      } else {
        toast.success("Login Successful");
        form.reset();
        router.push("/");
      }
    }
    catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Something went wrong, Please Try Again");
    }
  }

  return (
    <div>
      <CardWrapper
        headerLabel="Login to an account"
        headerHeading="Sign In"
        backButtonLabel="Don't have an account?"
        backButtonHref="/register"
        vendorbuttonLabel=""
        vendorButtonHref="/"
        showBackButton={false}
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <Button
                variant="link"
                className="font-normal text-normal"
                size="sm"
                asChild
              >
                <Link href="forgot-password" >
                  Forgot Password
                </Link>
              </Button>
              <SubmitButton
                isLoading={loading}
                buttonTitle="Login"
                loadingButtonTitle="Sign In User please wait..."
              />
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}
