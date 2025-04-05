"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from 'react'
import CardWrapper from './card-wrapper'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import SubmitButton from '@/components/backoffice/SubmitButton'
import toast from "react-hot-toast";
import { ResetPasswordSchema } from "@/schemas";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            id: searchParams.get("id") ?? "",
        },
    });
    async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
        console.log(values);
        const id = searchParams.get("id") ?? ""; 

        if (!id) {
            toast.error("Invalid request. No user ID found.");
            return;
        }

        const payload = { ...values, id };
        
        console.log(values);
        try {
            setLoading(true);
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            const response = await fetch(`${baseUrl}/api/users/update-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                setLoading(false);

                router.push("/login")
                toast.success("Password Updated Successfully");
            } else {
                setLoading(false);
                toast.error("Someting went wrong");
            }
        } catch (error) {
            setLoading(false);
            console.log("Network Error: ", error);
            toast.error("Its seems something is wrong with your Network");
        }
    }
        return (
            <div>
                <CardWrapper
                    headerLabel=""
                    headerHeading="Reset Password"
                    backButtonLabel=""
                    backButtonHref="/login"
                    vendorbuttonLabel=""
                    vendorButtonHref="/"
                    showBackButton={false}
                    showSocial={false}
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="******"
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex justify-center items-center">
                                <SubmitButton
                                    isLoading={loading}
                                    buttonTitle="Reset Password"
                                    loadingButtonTitle="Updating please wait..."
                                />
                            </div>
                        </form>
                    </Form>
                </CardWrapper>
            </div>
        )
    
}