import { NextResponse } from "next/server";
import { NewCaetgorySchema } from '@/schemas/index';
import { z } from 'zod';
import db from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { title, slug, uploadedFiles, description, isActive } = await request.json();

        const existingCategory = await db.category.findUnique({
            where: {
                slug,
            }
        });

        if (existingCategory) {
            return NextResponse.json({
                data: null,
                message: "Category Already exists"
            }, { status: 409 });
        }

        const newCategory = NewCaetgorySchema.parse({ title, slug, uploadedFiles, description, isActive });

        const category = await db.category.create({
            data: newCategory,
        });

        return NextResponse.json(category);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle Zod validation errors 
            return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        console.error('Unexpected error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const categories = await db.category.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                products: true
            }
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to fetch Category",
                error,
            },
            {status: 500},
        );
    }
}