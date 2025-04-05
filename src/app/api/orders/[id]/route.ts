import db from "@/lib/db";
import { NextResponse } from "next/server";

interface OrderProps {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, {params}: OrderProps) {
    try {

        const { id } = await params;

        const order = await db.order.findUnique({
            where: {
                id
            },
            include: {
                orderItems: true
            },
        });
        return NextResponse.json(order);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to fetch an Order",
                error,
            },
            {status: 500},
        );
    }
}

export async function DELETE(request: Request, {params}: OrderProps) {
    try {

        const { id } = await params;

        const existingOrder = await db.order.findUnique({
            where: {
                id
            },
        });
        if(!existingOrder) {
            return NextResponse.json({
                data: null,
                message: "Order Not Found"
            },
            {status: 404}
        );    
        }
        const deletedOrder = await db.order.delete({
            where: {
                id,
            }
        });
        return NextResponse.json(deletedOrder);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to Delete an Order",
                error,
            },
            {status: 500},
        );
    }
}

