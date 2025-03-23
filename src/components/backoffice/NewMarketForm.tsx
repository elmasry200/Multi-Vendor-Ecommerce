"use client";
import * as z from "zod";
import FormHeader from '@/components/backoffice/FormHeader'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { NewMarketSchema } from "@/schemas";
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
import ImageInput from "@/components/backoffice/ImageInput";
import { makePostRequest } from "@/lib/apiRequest";
import { Textarea } from "@/components/ui/textarea";
import { generateSlug } from "@/lib/generateSlug";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

interface NewMarketFormProps {
    categories: {id: string; title: string;}[];
  }

export default function NewMarketForm({categories}: NewMarketFormProps) {

     const router= useRouter();

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof NewMarketSchema>>({
    resolver: zodResolver(NewMarketSchema),
    defaultValues: {
      title: "",
      description: "",
      uploadedFiles: [],
      slug: "",
    categoryIds: [],
      isActive: false,
    },
  });

  const selectedCategories = form.watch("categoryIds");


  const handleSelect = (value: string) => {
    const newValues = selectedCategories.includes(value)
      ? selectedCategories.filter((v) => v !== value)
      : [...selectedCategories, value];
    form.setValue("categoryIds", newValues);
  };


  const onSubmit = (values: z.infer<typeof NewMarketSchema>) => {

    const slug = generateSlug(values.title);
    values.slug = slug;

    values.uploadedFiles = uploadedFiles;
    console.log(values);

    makePostRequest(setLoading, "api/markets", values, "Market", form.reset);
    setUploadedFiles([]);

    router.back();
    router.refresh();
    
  };

  return (
    <div>
      <FormHeader title='New Market' />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                    Market Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Type the banner title"
                      className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryIds"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2">
                    Select Categories
                  </FormLabel>
                  <div className="flex flex-col space-y-2 border p-3 rounded-md">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      >
                        <Checkbox
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleSelect(category.id)}
                        />
                        <span>{category.title}</span>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ImageInput
              label="Market Logo"
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              endpoint="marketImageUploader"
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                    Market Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type the market description"
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
                    Publish Your Market
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
            buttonTitle="Create Market"
            loadingButtonTitle="Creating Market please wait..."
          />
        </form>
      </Form>
    </div>
  )
}
