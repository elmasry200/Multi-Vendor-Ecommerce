"use client";
import * as z from "zod";

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { NewProductSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Switch } from "@/components/ui/switch"

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
import ArrayItemsInput from "@/components/backoffice/ArrayItemsInput";
import { useWatch } from "react-hook-form";
import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";

interface NewProductFormProps {
  categories: { id: string; title: string; }[];
  farmers: { id: string; title: string; }[];
  updateData?: Prisma.ProductGetPayload<{}>;
}

export default function NewProductForm({ categories, farmers, updateData }: NewProductFormProps) {

  console.log(updateData);

  const router = useRouter();

  const id = updateData?.id ?? "";

  const initialImage = updateData?.uploadedFiles[0] ?? null;
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(initialImage ? [initialImage] : []);

  const initialTags = updateData?.tags ?? [];
  const [tags, setTags] = useState<string[]>(initialTags);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof NewProductSchema>>({
    resolver: zodResolver(NewProductSchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      uploadedFiles: [],
      sku: "",
      barcode: "",
      productPrice: 0.00,
      salePrice: 0.00,
      categoryId: "",
      userId: "",
      tags: [],
      isActive: false,
      isWholesale: false,
      wholesalePrice: 0.00,
      wholesaleQty: 0,
      productCode: "",
      productStock: 0,
      unit: "",
      qty: 1,
      ...Object.fromEntries(
        Object.entries(updateData || {}).map(([key, value]) => [key, value ?? undefined])
      ),
    },
  });

  const isWholesale = useWatch({
    control: form.control,
    name: "isWholesale",
    defaultValue: updateData?.isWholesale ?? false,
  });

  const onSubmit = (values: z.infer<typeof NewProductSchema>) => {

    const slug = generateSlug(values.title);
    const productCode = generateUserCode('LLP', values.title);
    values.slug = slug;
    values.productCode = productCode;
    values.uploadedFiles = uploadedFiles;
    values.tags = tags;
    console.log(values);

    if (id) {
      makePutRequest(setLoading, `api/products/${id}`, values, "Product", form.reset);
    } else {
      makePostRequest(setLoading, "api/products", values, "Product", form.reset);
      setUploadedFiles([]);
      setTags([]);
    }


    router.back();
    router.refresh();
  };

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 space-y-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                  Product Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type the product title"
                    className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                  Product SKU
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type the product sku"
                    className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                  Product Barcode
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type the product barcode"
                    className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                  Product Price (Before Discount)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    placeholder="Type the product price before discount"
                    className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                  Product Sale Price (Discounted)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    placeholder="Type the product sale price discounted"
                    className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                  Product Stock
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Type the product stock"
                    className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                  Unit of Measurement (eg Kilograms)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type the  Unit of Measurement (eg Kilograms)"
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
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value || "")}
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
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-[180px] mt-8">
                      <SelectValue placeholder="Select Farmer" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        farmers.map((farmer, i) => (
                          <SelectItem key={farmer.id} value={farmer.id}>{farmer.title}</SelectItem>
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
            name="isWholesale"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <FormLabel className="text-base">
                  Supports Wholesale Selling
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                   // onCheckedChange={field.onChange}
                   onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {isWholesale && (
            <>
              <FormField
                control={form.control}
                name="wholesalePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                      Wholesale Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        placeholder="Type the product wholesale price"
                        className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wholesaleQty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                      Minimum Wholesale Qty
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Type the product  Minimum Whole Qty"
                        className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <ImageInput
            label="Product Image"
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            endpoint="productImageUploader"
          />
          {/* tags */}
          <ArrayItemsInput items={tags} setItems={setTags} itemTitle="Tag" />


          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                  Product Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Type the product description"
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
                  Publish Your Product
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
          buttonTitle={id ? "Update Product" : "Create Product"}
          loadingButtonTitle={`${id ? "Updating" : "Creating"} Product please wait...`}
        />

      </form>
    </Form>
  )
}
