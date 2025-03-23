import { NextResponse } from "next/server";
import { NewMarketSchema } from '@/schemas/index'; 
import { z } from 'zod';
import db from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { title, slug, uploadedFiles, description, isActive, categoryIds } = await request.json();

        const newMarket = NewMarketSchema.parse({ title, slug, uploadedFiles, description, isActive, categoryIds});

        console.log(newMarket);

        const existingMarket = await db.market.findUnique({
            where: {
                slug: newMarket.slug,
            }
        });

        if (existingMarket) {
            return NextResponse.json({
                data: null,
                message: "Market Already exists"
            }, { status: 409 });
        }

         await db.market.create({
            data: {
                title: newMarket.title,
                description: newMarket.description,
                slug: newMarket.slug,
                uploadedFiles: newMarket.uploadedFiles,      
                isActive: newMarket.isActive,
                categoryIds: newMarket.categoryIds
            },
        });

        return NextResponse.json(newMarket);
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
        const markets = await db.market.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return NextResponse.json(markets);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to fetch Market",
                error,
            },
            {status: 500},
        );        
    }
}