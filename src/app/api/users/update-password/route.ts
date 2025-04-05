import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function PUT(request: Request) {
    try {
        const { id, password } = await request.json();
        const user = await db.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            return NextResponse.json({
                data: null,
                message: "User Not Found",
            }, { status: 404 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await db.user.update({
            where: {
                id,
            },
            data: {
                password: hashedPassword,
            },
        });
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error,
            message: "Failed to update User",
        }, { status: 500 });
    }
}