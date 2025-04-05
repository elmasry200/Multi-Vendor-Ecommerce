import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template"

export async function PUT(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY); 

    try {
       const { email } = await request.json();

       const existingUser = await db.user.findUnique({
              where: {
                email,
              },
            });
         if (!existingUser) {
            return NextResponse.json({
                data: null,
                message: "User Not Found"
            }, { status: 404 });
         }

         const rawToken = uuidv4();
         console.log(rawToken);
         
         const token = base64url.encode(rawToken);

         const updatedUser = await db.user.update({
           where: {
            email,
           },
           data: {
              verificationToken: token,
           },         
        });

        const linkText = "Reset Password";
        const userId = existingUser.id;
        const name = existingUser.name || "";
        const redirectUrl = `reset-password?token=${token}&id=${userId}`;
        const description = "Click on the following link in order to reset your password. Thank you";
        const subject = "Password Reset - Limi Ecommerce"; 
        console.log(userId, name, redirectUrl);

        const sendMail = await resend.emails.send({
            from: 'Ahmed <onboarding@resend.dev>',
            to: email,
            subject: subject,
            react: EmailTemplate({name, redirectUrl, linkText, description, subject})
         });
         console.log(sendMail);

         console.log(token);

         return NextResponse.json(
            {
                data: null,
                message: "User Updated Successfully",
            },
            { status: 200 },
         );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                data: null,
                message: "ServerError: Something went wrong",
            },
            { status: 500 },
         );
    }
}