import { NextResponse } from "next/server";
import { RegisterSchema } from '@/schemas/index';
import { z } from 'zod';
import db from "@/lib/db";
import bcrypt from 'bcrypt';
import {v4 as uuidv4 } from "uuid";
import base64url from "base64url";
 import { Resend } from "resend";
 import { EmailTemplate } from "@/components/email-template"

export async function POST(request: Request) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY); 

        const { name, email, password, role } = await request.json();

        const verifyUser = RegisterSchema.parse({ name, email, password, role });

        const existingUser = await db.user.findUnique({
            where: {
                email: verifyUser.email,
            }
        });

        if (existingUser) {
            return NextResponse.json({
                data: null,
                message: "User Already exists"
            }, { status: 409 });
        }

        const hashdPassword = await bcrypt.hash(password, 10);

        const rawToken = uuidv4();
        console.log(rawToken);

        const token = base64url.encode(rawToken);

        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashdPassword,
                role,
                verificationToken: token, 
            }
        });

        console.log(newUser);
        // SEND THE EMAIL IF USER ROLE == FARMER
        if(role === "FARMER") {
         const userId = newUser.id;
         const linkText = "Verify Account";
         const redirectUrl = `onboarding/${userId}?token=${token}`;
         const description = "Thank you for creating an account with us. We request you to click on the link Below in order to Complete your onboarding Process. Thank you!";
         const subject = "Account Verification - Limi Ecommerce";
         const sendMail = await resend.emails.send({
            from: 'Ahmed <onboarding@resend.dev>',
            to: email,
            subject: subject,
            react: EmailTemplate({name, redirectUrl, linkText, description, subject})
         });
         console.log(sendMail);
        }
        return NextResponse.json({
            data: newUser,
            message: "User Created Successfully"
        },
        { status: 201 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle Zod validation errors
            return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        console.error('Unexpected error:', error);
        return NextResponse.json({
            error,
            message: "ServerError: Something went wrong"
        },
            { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to fetch User",
                error,
            },
            { status: 500 },
        );
    }
}