import { NextResponse } from "next/server";
import { NewCouponSchema } from '@/schemas/index'; 
import { z } from 'zod';
import db from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { title, couponCode, expiryDate, isActive} = await request.json();
        console.log(expiryDate);
        const newCoupon = NewCouponSchema.parse({ title, couponCode, expiryDate, isActive});
      
        await db.coupon.create({ data: newCoupon });
      
        console.log(newCoupon);
      
        return NextResponse.json(newCoupon);
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
         const coupons = await db.coupon.findMany({
            orderBy: {
                createdAt: "desc"
            }
         });
         return NextResponse.json(coupons);
    } catch (error){
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