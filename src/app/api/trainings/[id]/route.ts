import db from "@/lib/db";
import { NextResponse } from "next/server";

interface TrainingDetailedProps {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, {params}: TrainingDetailedProps) {
    try {

        const { id } = await params;

        const training = await db.training.findUnique({
            where: {
                id
            },
        });
        return NextResponse.json(training);
    } catch (error) {
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

export async function DELETE(request: Request, {params}: TrainingDetailedProps) {
    try {

        const { id } = await params;

        const existingTraining = await db.training.findUnique({
            where: {
                id
            },
        });
        if(!existingTraining) {
            return NextResponse.json({
                data: null,
                message: "Training Not Found"
            },
            {status: 404}
        );    
        }
        const deletedTraining = await db.training.delete({
            where: {
                id,
            }
        });
        return NextResponse.json(deletedTraining);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to Delete Training",
                error,
            },
            {status: 500},
        );
    }
}

export async function PUT(request: Request, {params}: TrainingDetailedProps) {
    try {
        const { id } = await params;
        const {title, description, slug, categoryId, content, uploadedFiles, isActive } = await request.json();

        const existingTraining = await db.training.findUnique({
            where: {
                id,
            }
        });

        if (!existingTraining) {
            return NextResponse.json({
                data: null,
                message: "Training is Not Found"
            }, { status: 404 });
        }

        const updatedTraining = await db.training.update({
            where: {
                id
            },
            data: {title, description, slug, categoryId, content, uploadedFiles, isActive },
        });

        return NextResponse.json(updatedTraining);
    } catch (error) {
       console.log(error);
       return NextResponse.json({
        data: null,
        message: "Failed to update Training"
    }, { status: 500 });
    }
}