import db from "@/lib/db";
import { NextResponse } from "next/server";

interface OnboardingProps {
    params: Promise<{ id: string }>;
  }


export async function GET(request: Request, {params}: OnboardingProps) {
    try {
        const { id } = await params;
        
         const farmer = await db.user.findUnique({
            where: {
                id: id,
                role: "FARMER"
            },
            include: {
                farmerProfile: true
            },
         });
         return NextResponse.json(farmer);
    } catch (error){
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch Farmer",
                error,
            },
            {status: 500}
        )
    }
}

export async function DELETE(request: Request, {params}: OnboardingProps) {
    try {
        const { id } = await params;
        
         const existingFarmer = await db.user.findUnique({
            where: {
                id: id,
            },
         });
         if(!existingFarmer) {
            return NextResponse.json(
                {
                    data: null,
                    message: "User not found"
                },
                {status: 404}
            );
         }
         const deletedUser = await db.user.delete({
            where: {
                id,
            },
         });
         return NextResponse.json(deletedUser);
    } catch (error){
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch Farmer",
                error,
            },
            {status: 500}
        )
    }
}
