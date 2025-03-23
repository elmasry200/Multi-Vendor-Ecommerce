import db from "@/lib/db";
import { NextResponse } from "next/server";

interface CouponDetailedProps {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, {params}: CouponDetailedProps) {
    try {

        const { id } = await params;

        const coupon = await db.coupon.findUnique({
            where: {
                id
            },
        });
        return NextResponse.json(coupon);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to fetch Coupon",
                error,
            },
            {status: 500},
        );
    }
}

export async function DELETE(request: Request, {params}: CouponDetailedProps) {
    try {

        const { id } = await params;

        const existingCoupon = await db.coupon.findUnique({
            where: {
                id
            },
        });
        if(!existingCoupon) {
            return NextResponse.json({
                data: null,
                message: "Coupon Not Found"
            },
            {status: 404}
        );    
        }
        const deletedCoupon = await db.coupon.delete({
            where: {
                id,
            }
        });
        return NextResponse.json(deletedCoupon);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to Delete Coupon",
                error,
            },
            {status: 500},
        );
    }
}