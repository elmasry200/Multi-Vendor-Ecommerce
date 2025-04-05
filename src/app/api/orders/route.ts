import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(request: Request) {
    try {

        const { checkoutFormData, orderItems } = await request.json();

        function generateOrderNumber(length: number) {
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          let orderNumber = '';

          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            orderNumber += characters.charAt(randomIndex);
          }
          return orderNumber;
        }

        const {
            city,
            country,
            email,
            firstName,
            lastName,
            phoneNumber,
            district,
            streetAddress,
            userId,
            paymentMethod,
            shippingCost
        } = checkoutFormData;

        const result = await db.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
            data: {
                orderNumber: generateOrderNumber(8),
                city,
                country,
                email,
                firstName,
                lastName,
                phone:phoneNumber,
                district,
                streetAddress,
                userId,
                paymentMethod,
                shippingCost: parseFloat(shippingCost)
            },
        });

        await tx.orderItem.createMany({
            data: orderItems.map((item: any) => ({
                orderId: newOrder.id,
                productId: item.id,
                quantity: parseInt(item.qty),
                price: parseFloat(item.salePrice),
                title: item.title,
                imageUrl: item.uploadedFiles[0],       
            })),
        });
        console.log(newOrder);
        return newOrder;
    });
        console.log(result);
        return NextResponse.json(result);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error: ", error.stack)
        }
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to create Order",
                error,
            },
            { status: 500 },
        );
    }
}

export async function GET(request: Request) {
    try {
        const orders = await db.order.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                orderItems: true
            },
        });
        return NextResponse.json(orders);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to create Order",
                error,
            },
            { status: 500 },
        );
    }
}