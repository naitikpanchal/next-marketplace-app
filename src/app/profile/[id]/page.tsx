import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import Image from 'next/image';
// import { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";

interface ProfilePageProps{
    params: {
        id: string,
    }
}

const getUser = cache(async (id:string) => {
    const user = await prisma.user.findUnique({where: {id}})
    if (!user) notFound();
    return user;
});

// export async function generateMetaData(
//     { params: {id}} : ProfilePageProps
//     ): Promise<Metadata>{

//     const user = await getUser(id);
    
//     return{
//         title: user.name + " -marketplace",
//         description: user.bio,
//         openGraph:{
//             images: [{url: user.image}],
//         }
//     }
// }

export default async function ProfilePage(
    {params:{id},
} : ProfilePageProps) {

    const user = await getUser(id);

    return(
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <Image 
                src={user.image ?? ''}
                alt={user.name ?? ''}
                width={500}
                height={500} 
                className="rounded-lg"
                priority
            />
            <div>
                <h1 className="text-5xl font-bold">{user.name}</h1>
                <p className="text-lg">{user.email}</p>
            </div>
        </div>
    )
}
