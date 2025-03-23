"use client";
import * as z from "zod";

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { NewBannerSchema } from "@/schemas";
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
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";

export default function NewBannerForm({ updateData }: { updateData?: Prisma.BannerGetPayload<{}> }) {

    const router = useRouter();
    const id = updateData?.id ?? "";
    const initialImage = updateData?.uploadedFiles[0] ?? null;
    const [uploadedFiles, setUploadedFiles] = useState<string[]>(initialImage ? [initialImage] : []);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof NewBannerSchema>>({
        resolver: zodResolver(NewBannerSchema),
        defaultValues: {
            title: "",
            link: "",
            uploadedFiles: [],
            isActive: false,
            ...updateData,
        },
    });

    const onSubmit = (values: z.infer<typeof NewBannerSchema>) => {

        values.uploadedFiles = uploadedFiles;
        console.log(values);

        if (id) {
            makePutRequest(setLoading, `api/banners/${id}`, values, "Banner", form.reset)
            console.log("update Request: ", values)
        } else {
            makePostRequest(setLoading, "api/banners", values, "Banner", form.reset);
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
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                                        Banner Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Type the banner title"
                                            className="focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium leading-6 text-gray-900
                dark:text-slate-50 mb-2">
                                        Banner Link
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="url"
                                            placeholder="Type the banner title"
                                            className="focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <ImageInput
                            label="Banner Image"
                            uploadedFiles={uploadedFiles}
                            setUploadedFiles={setUploadedFiles}
                            endpoint="bannerImageUploader"
                        />

                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <FormLabel className="text-base">
                                        Publish Your Banner
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
                        buttonTitle={id ? "Update Banner" : "Create Banner"}
                        loadingButtonTitle={`${id ? "Updating" : "Creating"} Banner please wait...`}
                    />
                </form>
            </Form>
        </div>
    )
}
