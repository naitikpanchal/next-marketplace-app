import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/db/prisma";
import bcryptjs from 'bcryptjs';


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password, phone } = reqBody;

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });   
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
            },
        });
        return NextResponse.json({ message: 'User registered successfully',success:true ,user: newUser }, { status: 200});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
