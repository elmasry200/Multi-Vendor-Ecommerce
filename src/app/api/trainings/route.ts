import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(request: Request) {
    try {    

        const newTraining = await request.json();
        console.log(newTraining);

        const existingTraining = await db.training.findUnique({
            where: {
                slug: newTraining.slug,
            }
        });

        if (existingTraining) {
            return NextResponse.json({
                data: null,
                message: "Training Already exists"
            }, { status: 409 });
        }

        await db.training.create({
            data: {
                title: newTraining.title,
                description: newTraining.description,
                slug: newTraining.slug,
                uploadedFiles: newTraining.uploadedFiles,      
                isActive: newTraining.isActive,
                categoryId: newTraining.categoryId,
                content: newTraining.content
            },
        });

        return NextResponse.json(newTraining);
    } catch (error) {
        if (error instanceof Error){
            console.log("Error: ", error.stack)
        }
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch Training",
                error,
            },
            {status: 500},
        );
    }
}

export async function GET(request: Request) {
    try {
         const trainings = await db.training.findMany({
            orderBy: {
                createdAt: "desc"
            }
         });
         return NextResponse.json(trainings);
    } catch (error){
        console.log(error);
        return Response.json(
            {
                message: "Failed to fetch Training",
                error,
            },
            {status: 500},
        );
    }
}