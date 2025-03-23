"use client";
import * as z from "zod";
import FormHeader from '@/components/backoffice/FormHeader'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { NewTrainingSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/backoffice/SubmitButton";
import { generateSlug } from "@/lib/generateSlug";
import ImageInput from "@/components/backoffice/ImageInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { Switch } from "@/components/ui/switch";
import RichTextEditor from "@/components/RichTextEditor";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";

interface NewTrainingFormProps {
  categories: { id: string; title: string; }[];
  updateData?: Prisma.TrainingGetPayload<{}>;
}


export default function NewTrainingForm({ categories, updateData }: NewTrainingFormProps) {
  console.log(updateData);
  const router = useRouter();

  const id = updateData?.id ?? "";

  const initialImage = updateData?.uploadedFiles[0] ?? null;
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(initialImage ? [initialImage] : []);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof NewTrainingSchema>>({
    resolver: zodResolver(NewTrainingSchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      uploadedFiles: [],
      categoryId: "",
      content: "",
      isActive: false,
      ...Object.fromEntries(
        Object.entries(updateData || {}).map(([key, value]) => [key, value ?? undefined])
      ),
    },
  });


  const onSubmit = (values: z.infer<typeof NewTrainingSchema>) => {

    const slug = generateSlug(values.title);
    values.slug = slug;
    values.uploadedFiles = uploadedFiles;

    console.log(values);

  
          if (id) {
              makePutRequest(setLoading, `api/trainings/${id}`, values, "Training", form.reset)
              console.log("update Request: ", values)
          } else {
              makePostRequest(setLoading, "api/trainings", values, "Training", form.reset);
              setUploadedFiles([]);
          }
  

    router.back();
    router.refresh();
  };

  return (

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
                  Training Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type the training title"
                    className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-[180px] mt-8">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        categories.map((category, i) => (
                          <SelectItem key={category.id} value={category.id}>{category.title}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
                    placeholder="Type the category description"
                    className="focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ImageInput
            label="Training Thumbnail"
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            endpoint="trainingImageUploader"
          />


          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Content End */}

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <FormLabel className="text-base">
                  Publish Your Training
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
          buttonTitle={id ? "Update Training" : "Create Training"}
          loadingButtonTitle={`${id ? "Updating" : "Creating"} Training please wait...`}
        />
      </form>
    </Form>
  )
}
