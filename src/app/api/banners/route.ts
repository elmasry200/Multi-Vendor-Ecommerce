import { NextResponse } from "next/server";
import { NewBannerSchema } from '@/schemas/index'; 
import { z } from 'zod';
import db from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { title, link, uploadedFiles, isActive} = await request.json();

        const newBanner = NewBannerSchema.parse({ title, link, uploadedFiles, isActive});
        await db.banner.create({ data: newBanner });
        console.log(newBanner);
        return NextResponse.json(newBanner);
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
         const banners = await db.banner.findMany({
            orderBy: {
                createdAt: "desc"
            }
         });
         return NextResponse.json(banners);
    } catch (error){
        console.log(error);
        return Response.json(
            {
                message: "Failed to fetch Banner",
                error,
            },
            {status: 500},
        );
    }
}