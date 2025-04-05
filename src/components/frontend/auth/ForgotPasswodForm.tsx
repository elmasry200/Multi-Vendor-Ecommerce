"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from 'react'
import CardWrapper from './card-wrapper'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import SubmitButton from '@/components/backoffice/SubmitButton'
import { ForgotPasswordSchema } from '@/schemas'

import { HiInformationCircle } from "react-icons/hi";
import toast from "react-hot-toast";

export default function ForgotPasswodForm() {
    
      const [loading, setLoading] = useState(false);
      const [ showNotification, setShowNotification] = useState(false);

      const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
          resolver: zodResolver(ForgotPasswordSchema),
          defaultValues: {
            email: "",
          },
        });

     async function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
        console.log(values);
        try {
          setLoading(true);
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
          const response = await fetch(`${baseUrl}/api/users/forgot-password`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          if(response.ok) {
            setLoading(false);
            setShowNotification(true);
            form.reset();
            toast.success("Password reset link sent Successfully");
          } else{
            setLoading(false);
            toast.error("Someting went wrong");
          }
        } catch (error) {
         setLoading(false);
         console.log("Network Error: ", error);
         toast.error("Its seems something is wrong with your Network");
        }
     }

  return (
    <div>
      <CardWrapper
              headerLabel=""
              headerHeading="Reset Password"
              backButtonLabel="Do you remember your Password? Login"
              backButtonHref="/login"
              vendorbuttonLabel=""
              vendorButtonHref="/"
              showBackButton={false}
              showSocial={false}
            >
               <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-4"
                        >
                            {showNotification && (
                               <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                               <HiInformationCircle className="shrink-0 inline w-4 h-4 me-3" />
                               <span className="sr-only">Info</span>
                               <div>
                                 <span className="font-medium">Please check your Email!</span> We have sent you a Password Reset Link and Click on the Link in Order to craete a new Password
                               </div>
                             </div>
                            )}
                          <div className="space-y-2">              
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Enter Your Email</FormLabel>
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
                          </div>
                          <div className="flex justify-center items-center">
                            <SubmitButton
                              isLoading={loading}
                              buttonTitle="Send Email for Reset Email"
                              loadingButtonTitle="Sending please wait..."
                            />
                          </div>
                        </form>
                      </Form> 
            </CardWrapper>
    </div>
  )
}
