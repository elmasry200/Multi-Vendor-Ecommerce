"use client";
import * as z from "zod";
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { NewFarmerSchema } from "@/schemas";
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

import ImageInput from "@/components/backoffice/ImageInput";

import { User } from "@prisma/client";
import ArrayItemsInput from "./ArrayItemsInput";


interface NewFarmerFormProps {
  user?: User;
}

export default function NewFarmerForm({ user }: NewFarmerFormProps) {

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<string[]>([]);

  const form = useForm<z.infer<typeof NewFarmerSchema>>({
    resolver: zodResolver(NewFarmerSchema),
    defaultValues: {
      ...user,
      name: user?.name || "",
      phone: "",
      email: user?.email || "",
      physicalAddress: null,
      contactPerson: null,
      contactPersonPhone: null,
      landSize: 0,
      mainCrop: "",
      products: [],
      uploadedFiles: [],
      terms: null,
      notes: null,
      code: "",
      isActive: false,
      userId: user?.id,
    },
  });

  const onSubmit = (values: z.infer<typeof NewFarmerSchema>) => {
    const code = generateUserCode("LFF", values.name);
    values.code = code;
    values.uploadedFiles = uploadedFiles;
    values.userId = user?.id || "";
    values.products = products;
    console.log(values);

    makePostRequest(setLoading, "api/farmers", values, "Farmer Profile", form.reset);
    setUploadedFiles([]);
    setProducts([]);
  

  };

  return (

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
                  Farmer's Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type the farmer's name"
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
                  Farmer's Phone
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="Type the farmer phone"
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
                  Farmer's Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type the farmer's email address"
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
                  Farmer's Physical Address
                </FormLabel>
                <FormControl>
                  <Input
                   {...field}
                    value={field.value ?? ""}
                   type="text"
                    placeholder="Type the farmer's physical address"
                    className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                  Farmer's Contact Person
                </FormLabel>
                <FormControl>
                  <Input
                     {...field}
                    value={field.value ?? ""}
                    type="text"
                    placeholder="Type the farmer's contact Person"
                    className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPersonPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                  Farmer's Contact Person Phone
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type="tel"
                    placeholder="Type the farmer's contact person phone"
                    className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="landSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                  What is the Size of Your Land in Accres
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    value={field.value ?? 0} // Ensure it always starts at 0
                    min={0} // Prevents negative numbers
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      field.onChange(value < 0 ? 0 : value); // Prevents negative numbers
                    }}
                    className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mainCrop"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                  What is your main Crop that you cultivate
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type="text"
                    placeholder="Type the farmer's contact person phone"
                    className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ArrayItemsInput setItems={setProducts} items={products} itemTitle="Product"/>

          <ImageInput
            label="Farmer Profile Image"
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            endpoint="farmerImageUploader"
          />
          <div className="col-span-1 sm:col-span-2 w-full">
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                    Farmer's Payment Terms
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Type the farmer's payment Terms"
                      className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                      value={field.value ?? ""}
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
                    Publish Your Farmer
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
          buttonTitle="Create Farmer"
          loadingButtonTitle="Creating Farmer please wait..."
        />
      </form>
    </Form>
  )
}
