"use client";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod';

import React from 'react'
import { useForm } from 'react-hook-form';
import NavButtons from "../NavButtons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateCheckoutFormData } from "@/redux/slices/checkoutSlice";
import { step1Schema, step2Schema, step3Schema } from "@/schemas";

export default function ShippingDetailsForm() {

//const finalCheckoutSchema = step1Schema.merge(step2Schema).merge(step3Schema); 
const dispatch = useDispatch();
  const currentStep = useSelector((store: any) => store.checkout.currentStep);
  const existingFormData = useSelector((store: any) => store.checkout.checkoutFormData);

  const form = useForm({
   //         resolver: zodResolver(step2Schema),
            defaultValues: {
              ...existingFormData || {},
            }
          });

  async function processData(data: any) {
    
        // update checkout data
            dispatch(updateCheckoutFormData(data));
            // update current step
            dispatch(setCurrentStep(currentStep + 1));  
            console.log(existingFormData, data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processData)} >
        <h2 className='text-xl font-semibold mb-4 dark:text-lime-400'>Shipping Details</h2>
        <div className="grid grid-cols-1  gap-4 sm:grid-cols-2 sm:gap-6">
          <FormField control={form.control} name="streetAddress" render={({ field }) => (
            <FormItem>
               <FormLabel className="text-sm font-medium leading-6 text-gray-900
                                                    dark:text-slate-50 mb-2">
                                Street Address
                              </FormLabel>
              <FormControl>
                <Input placeholder="Street Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem>
               <FormLabel className="text-sm font-medium leading-6 text-gray-900
                                                    dark:text-slate-50 mb-2">
                                City
                              </FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="country" render={({ field }) => (
            <FormItem>
               <FormLabel className="text-sm font-medium leading-6 text-gray-900
                                                    dark:text-slate-50 mb-2">
                                Country
                              </FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="district" render={({ field }) => (
            <FormItem>
               <FormLabel className="text-sm font-medium leading-6 text-gray-900
                                                    dark:text-slate-50 mb-2">
                                District
                              </FormLabel>
              <FormControl>
                <Input placeholder="District" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="shippingCost" render={({ field }) => (
            <FormItem className="col-span-1 sm:col-span-2">
              <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Shipping Cost ?</h3>
              <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value}
                className="flex flex-col gap-5 sm:flex-row justify-between items-center"
              >
                <div className="w-full flex justify-between items-center p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-blue-600 hover:border-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-blue-600">
                  <div className="flex gap-2 items-center">
                    <Truck className="w-5 h-5 ms-3" />
                    <div>
                      <p>UPS</p>
                      <p>Delivery Cost: $8</p>
                    </div>
                  </div>
                  <FormControl>
                    <RadioGroupItem value="8" />
                  </FormControl>
                </div>
                <div className="w-full flex justify-between items-center p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-blue-600 hover:border-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-blue-600">
                  <div className="flex gap-2 items-center">
                    <Truck className="w-5 h-5 ms-3" />
                    <div>
                      <p>UPS</p>
                      <p>Delivery Cost: $20</p>
                    </div>
                  </div>
                  <FormControl>
                    <RadioGroupItem value="20" />
                  </FormControl>
                </div>
              </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <NavButtons />
      </form>
    </Form>
  )
}
