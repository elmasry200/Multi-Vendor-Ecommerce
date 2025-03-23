import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(request: Request) {
    try {
        const {
            name,
            phone,
            email,
            physicalAddress,
            contactPerson,
            contactPersonPhone,
            terms,
            notes,
            code,
            uploadedFiles,
            isActive,
            products,
            landSize,
            mainCrop,
            userId,
         } = await request.json();

  
     const newFarmerProfile =   await db.farmerProfile.create({
            data: {
                name: name,
                phone: phone,
                email: email,
                physicalAddress: physicalAddress,
                contactPerson: contactPerson,
                contactPersonPhone: contactPersonPhone,
                terms: terms,
                notes: notes,
                uploadedFiles: uploadedFiles,
                code: code,
                isActive: isActive,
                userId: userId,
                products: products,
                landSize: landSize,
                mainCrop: mainCrop,
            }      
        })
        return NextResponse.json(newFarmerProfile);
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
         const farmers = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                role: "FARMER"
            },
            include: {
                farmerProfile: true
            },
         });
         return NextResponse.json(farmers);
    } catch (error){
        console.log(error);
        return NextResponse.json(
            {
                message: "Failed to fetch Farmer Profile",
                error,
            },
            {status: 500},
        );
    }
}