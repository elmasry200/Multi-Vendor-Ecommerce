import db from "@/lib/db";
import { NextResponse } from "next/server";

interface ProductDetailedProps {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, {params}: ProductDetailedProps) {
    try {

        const { id } = await params;

        const product = await db.product.findUnique({
            where: {
                id
            },
        });
        return NextResponse.json(product);
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

export async function DELETE(request: Request, {params}: ProductDetailedProps) {
    try {

        const { id } = await params;

        const existingProduct = await db.product.findUnique({
            where: {
                id
            },
        });
        if(!existingProduct) {
            return NextResponse.json({
                data: null,
                message: "Product Not Found"
            },
            {status: 404}
        );    
        }
        const deletedProduct = await db.product.delete({
            where: {
                id,
            }
        });
        return NextResponse.json(deletedProduct);
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Failed to Delete Product",
                error,
            },
            {status: 500},
        );
    }
}

export async function PUT(request: Request, {params}: ProductDetailedProps) {
    try {

        const { id } = await params;

    const {title, description, slug, uploadedFiles, sku, barcode, productPrice,
        salePrice, categoryId, userId, tags, isActive, isWholesale, wholesalePrice, wholesaleQty,
        productCode, productStock, unit,qty} = await request.json();

    const existingProduct = await db.product.findUnique({
        where: {
            id,
        },
        
    });

    if (!existingProduct) {
        return NextResponse.json({
            data: null,
            message: "Product is Not Found"
        }, { status: 404 });
    }

    const updatedProduct = await db.product.update({
        where: {
            id
        },
        data: {title, description, slug, uploadedFiles, sku, barcode, productPrice,
            salePrice, categoryId, userId, tags, isActive, isWholesale, wholesalePrice, wholesaleQty,
            productCode, productStock, unit,qty},
    });

    return new NextResponse(JSON.stringify(updatedProduct), { status: 200 });

    } catch (error) {
        console.log(error);
       return NextResponse.json({
        data: null,
        message: "Failed to update Product"
    }, { status: 500 });
    }
}