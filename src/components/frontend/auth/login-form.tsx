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
import { useRouter} from "next/navigation";
//import { fa } from "@faker-js/faker";

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

try{   
      console.log(values);
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      });
      const responseData = await response.json();
      if(response.ok) {
        console.log(responseData);
        setLoading(false);
        toast.success("User Created Successfully");
        form.reset();
        
                
      } else {
         setLoading(false);
         if(response.status === 409) {
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
        headerLabel="Login to an account"
        headerHeading="Sign In"
        backButtonLabel="Don't have an account?"
        backButtonHref="/register"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit( onSubmit )}
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

            <SubmitButton
              isLoading={loading}
              buttonTitle="Login"
              loadingButtonTitle="Sign In User please wait..."
            />
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}
