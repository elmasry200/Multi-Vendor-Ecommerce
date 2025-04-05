"use client";
import * as z from "zod";
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCouponSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from "@/components/ui/input";
import DatePickerComponent from "@/components/backoffice/DatePickerComponent";
import SubmitButton from "@/components/backoffice/SubmitButton";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateCouponCode } from "@/lib/generateCouponCode";
import { Switch } from "@/components/ui/switch";
import { generateIsoFormattedDate } from "@/lib/generateIsoFormattedDate";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { convertIsoDateToNormal } from "@/lib/convertIsoDateToNormal";

export default function NewCouponForm({ updateData }: { updateData?: Prisma.CouponGetPayload<{}> }) {
    const router = useRouter();

    const id = updateData?.id ?? "";
   
    const expiryDateString = updateData?.expiryDate ?? new Date().toISOString(); // Always a string
    const expiryDateValue = new Date(expiryDateString); // Convert to Date for state

    const [expiryDate, setExpiryDate] = useState<Date>(expiryDateValue);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof NewCouponSchema>>({
        resolver: zodResolver(NewCouponSchema),
        defaultValues: {
            title: updateData?.title ?? "",
            expiryDate: expiryDateString, // Ensure it's a string
            isActive: updateData?.isActive ?? false,
            couponCode: updateData?.couponCode ?? "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewCouponSchema>) => {
        values.expiryDate = expiryDate.toISOString(); 

        // Generate a new coupon code based on the expiry date
        values.couponCode = generateCouponCode(values.title, values.expiryDate);
        console.log(values);

       if (id) {
                   makePutRequest(setLoading, `api/coupons/${id}`, values, "coupons", form.reset)
                   console.log("update Request: ", values)
               } else {
                   makePostRequest(setLoading, "api/coupons", values, "coupons", form.reset);
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
                                    Coupon Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Type the coupon title"
                                        className="w-full focus:outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DatePickerComponent
                        date={expiryDate}
                        setDate={setExpiryDate}
                        label="Expiration Date"
                    />

                    <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <FormLabel className="text-base">
                                    Publish Your Coupon
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
                    buttonTitle={id ? "Update Coupon" : "Create Coupon"}
                    loadingButtonTitle={`${id ? "Updating" : "Creating"} Coupon please wait...`}
                />
            </form>
        </Form>
    )
}
