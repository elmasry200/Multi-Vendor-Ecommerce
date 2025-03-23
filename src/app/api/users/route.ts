import { NextResponse } from "next/server";
import { RegisterSchema } from '@/schemas/index';
import { z } from 'zod';
import db from "@/lib/db";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
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

        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashdPassword,
                role,
            }
        });

        console.log(newUser);
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