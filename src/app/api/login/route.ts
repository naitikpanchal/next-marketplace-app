import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/db/prisma";
import bcryptjs from 'bcryptjs';


export async function POST(request: NextRequest) {
    try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!existingUser) {
        return NextResponse.json({ error: 'User not found.' }, { status: 400 });   
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
        const currentUser = await prisma.user.findFirst({
            where: {
                email: email,
                password: password,
            },
        });
        return NextResponse.json({ message: 'User logged in successfully',success:true ,user: currentUser }, { status: 200});
    } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
