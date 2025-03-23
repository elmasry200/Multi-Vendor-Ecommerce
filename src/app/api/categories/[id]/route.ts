import db from "@/lib/db";
import { NextResponse } from "next/server";

interface CategoryDetailedProps {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, {params}: CategoryDetailedProps) {
    try {

        const { id } = await params;

        const category = await db.category.findUnique({
            where: {
                id
            },
            include: {
                products: true
            }
        });
        return NextResponse.json(category);
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

export async function DELETE(request: Request, {params}: CategoryDetailedProps) {
    try {

        const { id } = await params;

        const existingCategory = await db.category.findUnique({
            where: {
                id
            },
        });
        if(!existingCategory) {
            return NextResponse.json({
                data: null,
                message: "Category Not Found"
            },
            {status: 404}
        );    
        }
        const deletedCategory = await db.category.delete({
            where: {
                id,
            }
        });
        return NextResponse.json(deletedCategory);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to Delete Category",
                error,
            },
            {status: 500},
        );
    }
}

export async function PUT(request: Request, {params}: CategoryDetailedProps) {
    try {
        const { id } = await params;
        const {title, slug, uploadedFiles, description, isActive } = await request.json();

        const existingCategory = await db.category.findUnique({
            where: {
                id,
            }
        });

        if (!existingCategory) {
            return NextResponse.json({
                data: null,
                message: "Category is Not Found"
            }, { status: 404 });
        }

        const updatedCategory = await db.category.update({
            where: {
                id
            },
            data: {title, slug, uploadedFiles, description, isActive },
        });

        return NextResponse.json(updatedCategory);
    } catch (error) {
       console.log(error);
       return NextResponse.json({
        data: null,
        message: "Failed to update Category"
    }, { status: 500 });
    }
}