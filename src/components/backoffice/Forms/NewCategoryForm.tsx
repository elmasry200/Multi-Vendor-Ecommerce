"use client";
import * as z from "zod";

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCaetgorySchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/backoffice/SubmitButton";
import { generateSlug } from "@/lib/generateSlug";
import ImageInput from "@/components/backoffice/ImageInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";

export default function NewCategoryForm({ updateData }: { updateData?: Prisma.CategoryGetPayload<{}> }) {

  const router = useRouter();
  const id = updateData?.id ?? "";
  const initialImage = updateData?.uploadedFiles[0] ?? null;
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(initialImage ? [initialImage]: []);
  const [loading, setLoading] = useState(false);

  ///const markets: { id: string; title: string }[] = [];

  // const markets = [
  //   { id: "1", title: "market 1" },
  //   { id: "2", title: "market 2" },
  //   { id: "3", title: "market 3" },
  // ];

  const form = useForm<z.infer<typeof NewCaetgorySchema>>({
    resolver: zodResolver(NewCaetgorySchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      uploadedFiles: [],
      //      marketIds: [],
      isActive: false,
      ...updateData,
    },
  });


  // const selectedMarkets = form.watch("marketIds");


  // const handleSelect = (value: string) => {
  //   const newValues = selectedMarkets.includes(value)
  //     ? selectedMarkets.filter((v) => v !== value)
  //     : [...selectedMarkets, value];
  //   form.setValue("marketIds", newValues);
  // };


  const onSubmit = (values: z.infer<typeof NewCaetgorySchema>) => {

    const slug = generateSlug(values.title);
    values.slug = slug;
    values.uploadedFiles = uploadedFiles;

    console.log(values);

if(id) {
    makePutRequest(setLoading, `api/categories/${id}`, values, "Category", form.reset)
    console.log("update Request: ", values)
}else {
    makePostRequest(setLoading, "api/categories", values, "Category", form.reset);
    setUploadedFiles([]);
}
    router.back();
    router.refresh();
  };

  return (
    <div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 space-y-6"
        >
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                    Category Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Type the category title"
                      className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="marketIds"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2">
                    Select Markets
                  </FormLabel>
                  <div className="flex flex-col space-y-2 border p-3 rounded-md">
                    {markets.map((market) => (
                      <div
                        key={market.id}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      >
                        <Checkbox
                          checked={selectedMarkets.includes(market.id)}
                          onCheckedChange={() => handleSelect(market.id)}
                        />
                        <span>{market.title}</span>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <ImageInput
              label="Category Image"
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              endpoint="categoryImageUploader"
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                    Cateory Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Type the category description"
                      className="focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
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
                    Publish Your Category
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
          <SubmitButton
            isLoading={loading}
            buttonTitle={id ? "Update Category" : "Create Category"}
            loadingButtonTitle={`${id? "Updating" : "Creating"} Category please wait...`}
          />
        </form>
      </Form>

    </div>
  )
}
