"use client";
import * as z from "zod";
import FormHeader from '@/components/backoffice/FormHeader'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { NewStaffSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/backoffice/SubmitButton";
import { makePostRequest } from "@/lib/apiRequest";
import { Textarea } from "@/components/ui/textarea";
import { generateUserCode } from "@/lib/generateUserCode";
import { Switch } from "@/components/ui/switch";

export default function NewStaff() {

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof NewStaffSchema>>({
    resolver: zodResolver(NewStaffSchema),
    defaultValues: {
      name: "",
      password: "",
      phone: "",
      email: "",
      physicalAddress: "",
      notes: "",
      code: "",
      nin: "",
      dob: "",
      isActive: false,
    },
  });

  const onSubmit = (values: z.infer<typeof NewStaffSchema>) => {
    const code = generateUserCode("LSM", values.name);
    values.code = code;
    console.log(values);

    makePostRequest(setLoading, "api/staff", values, "Staff", form.reset);

  };

  return (
    <div>
      <FormHeader title='New Staff' />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 space-y-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                    Staff's Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Type the staff's name"
                      className="focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                    NIN (Id Number)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Type the id number"
                      className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                    Date of Birth
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      //placeholder="Type the date of birth"
                      className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
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
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                    Staff's Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Type the staff's password"
                      className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
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
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                    Staff's Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Type the staff's email address"
                      className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                    Staff's Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Type the staff's phone"
                      className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <FormField
              control={form.control}
              name="physicalAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                    Staff's Physical Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Type the staff's physical address"
                      className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-1 sm:col-span-2 w-full">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                      Notes
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Type Notes"
                        className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <FormLabel className="text-base">
                      Publish Your Staff
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

            </div>
          </div>
          <SubmitButton
            isLoading={loading}
            buttonTitle="Create Staff"
            loadingButtonTitle="Creating Staff please wait..."
          />
        </form>
      </Form>

    </div>
  )
}
