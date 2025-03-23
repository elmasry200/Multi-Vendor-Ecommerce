import { NextResponse } from "next/server";
import { NewStaffSchema } from '@/schemas/index'; 
import { z } from 'zod';

export async function POST(request: Request) {
    try {    

        const newStaff = NewStaffSchema.parse(await request.json());
        console.log(newStaff);
        return NextResponse.json(newStaff);
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle Zod validation errors
            return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
          }
          console.error('Unexpected error:', error);
          return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}