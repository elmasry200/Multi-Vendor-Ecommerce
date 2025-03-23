import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(request: Request) {
    try {
        const productData = await request.json();
   
        console.log("productData",productData);
        const existingProduct = await db.product.findUnique({
            where: {
                slug: productData.slug,
            }
        });

        if (existingProduct) {
            return NextResponse.json({
                data: null,
                message: "Product Already exists"
            }, { status: 409 });
        }

        const product = await db.product.create({
            data: {
                title: productData.title,
                description: productData.description,
                slug: productData.slug,
                uploadedFiles: productData.uploadedFiles,
                sku: productData.sku,
                barcode: productData.barcode,
                productCode: productData.productCode,
                unit: productData.unit,
                productPrice: productData.productPrice,
                salePrice: productData.salePrice,
                wholesalePrice: productData.wholesalePrice,
                wholesaleQty: productData.wholesaleQty,
                productStock: productData.productStock,
                qty: productData.qty,
                tags: productData.tags,  
                categoryId: productData.categoryId,
                userId: productData.farmerId,
                isActive: productData.isActive,
                isWholesale: productData.isWholesale,   
            },
        });

       console.log(product);
        return NextResponse.json(productData);
    } catch (error) {
        if (error instanceof Error){
            console.log("Error: ", error.stack)
        }
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch Farmer",
                error,
            },
            {status: 500},
        );
    }
}

export async function GET(request: Request) {
    try {
        const products = await db.product.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return NextResponse.json(products);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to fetch Product",
                error,
            },
            {status: 500},
        );        
    }
}