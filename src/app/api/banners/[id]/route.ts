import db from "@/lib/db";
import { NextResponse } from "next/server";

interface BannerDetailedProps {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, {params}: BannerDetailedProps) {
    try {

        const { id } = await params;

        const banner = await db.banner.findUnique({
            where: {
                id
            }
        });
        return NextResponse.json(banner);
    } catch (error) {
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

export async function DELETE(request: Request, {params}: BannerDetailedProps) {
    try {

        const { id } = await params;

        const existingBanner = await db.banner.findUnique({
            where: {
                id
            },
        });
        if(!existingBanner) {
            return NextResponse.json({
                data: null,
                message: "Banner Not Found"
            },
            {status: 404}
        );    
        }
        const deletedBanner = await db.banner.delete({
            where: {
                id,
            }
        });
        return NextResponse.json(deletedBanner);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to Delete Banner",
                error,
            },
            {status: 500},
        );
    }
}

export async function PUT(request: Request, {params}: BannerDetailedProps) {
    try {
        const { id } = await params;
        const {title, uploadedFiles, link, isActive } = await request.json();

        const existingBanner = await db.banner.findUnique({
            where: {
                id,
            }
        });

        if (!existingBanner) {
            return NextResponse.json({
                data: null,
                message: "Banner is Not Found"
            }, { status: 404 });
        }

        const updatedBanner = await db.banner.update({
            where: {
                id
            },
            data: {title, uploadedFiles, link, isActive },
        });

        return NextResponse.json(updatedBanner);
    } catch (error) {
       console.log(error);
       return NextResponse.json({
        data: null,
        message: "Failed to update Banner"
    }, { status: 500 });
    }
}