"use client";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
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
//import { fa } from "@faker-js/faker";

export default function RegisterForm({ role = "USER" }: { role: string }) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: role,
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {

    try {
      console.log(values);
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData);
        setLoading(false);
        toast.success("User Created Successfully");
        form.reset();
        if (role === "USER") {
          router.push("/");
        } else {
          router.push("/verify-email");
        }

      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailError("User with this Email already exists");
          toast.error("User with this Email already exists");
        } else {
          console.error("Server Error:", responseData.error);
          toast.error("Oops Something went wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Something went wrong, Please Try Again");
    }
  }

  return (
    <div>
      <CardWrapper
        headerLabel="Create an account"
        headerHeading="Sign Up"
        backButtonLabel="Already have an account?"
        backButtonHref="/login"
        vendorbuttonLabel= {role === "USER" ? "Are You a Farmer? Register here." : "Are You a Customer? Register here."}
        vendorButtonHref= {role === "USER" ? "/register-farmer" : "/register"}
        showBackButton={true}
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
              {emailError && <small className="text-red-600">{emailError}</small>}
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

            {/* <Button 
                disabled = {isPending}
                type="submit"
                className="w-full"
              >
                 Create an account
              </Button>   */}

            <SubmitButton
              isLoading={loading}
              buttonTitle="Register"
              loadingButtonTitle="Creating User please wait..."
            />
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}
