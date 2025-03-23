import db from "@/lib/db";
import { NextResponse } from "next/server";

interface OnboardingProps {
    params: Promise<{ id: string }>;
  }


export async function GET(request: Request, {params}: OnboardingProps) {
    try {
        const { id } = await params;
        
         const user = await db.user.findUnique({
            where: {
                id: id,
                role: "FARMER"
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
         });
         return NextResponse.json(user);
    } catch (error){
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch User",
                error,
            },
            {status: 500}
        )
    }
}