"use client";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod';

import React from 'react'
import { useForm } from 'react-hook-form';
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateCheckoutFormData } from "@/redux/slices/checkoutSlice";
import { step1Schema, step2Schema, step3Schema } from "@/schemas";
import { useSession } from "next-auth/react";

export default function PersonalDetailsForm() {

const {data:session , status} = useSession();
const userId = session?.user?.id; 

  //  const finalCheckoutSchema = step1Schema.merge(step2Schema).merge(step3Schema); 
  const dispatch = useDispatch();
  const currentStep = useSelector((store: any) => store.checkout.currentStep);
  const existingFormData = useSelector((store: any) => store.checkout.checkoutFormData);

  const form = useForm({
    //         resolver: zodResolver(step1Schema),
    defaultValues: {
      ...existingFormData || {},
    }
  });

  async function processData(data: any) {
    data.userId = userId;
    await dispatch(updateCheckoutFormData(data));
    // update current step
    console.log("Before:", currentStep);
    await dispatch(setCurrentStep(currentStep + 1));
    console.log("After:", currentStep);
    console.log(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processData)} >
        <h2 className='text-xl font-semibold mb-4 dark:text-lime-400'>Personal Details</h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                                      dark:text-slate-50 mb-2">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
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
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                                      dark:text-slate-50 mb-2">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
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
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                                      dark:text-slate-50 mb-2">
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                                      dark:text-slate-50 mb-2">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <NavButtons />
      </form>
    </Form>
  )
}
