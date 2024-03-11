import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import Image from 'next/image';
import { Metadata } from "next";
import { cache } from "react";
import { itemQuantity } from "./actions";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

interface ItemPageProps{
    params: {
        id: string,
    }
}
// type GenerateMetaDataFunction = (props: ItemPageProps) => Promise<Metadata>;


const getItem = cache(async (id:string) => {
    const item = await prisma.item.findUnique({where: {id}})
    if (!item) notFound();
    return item;
})

// export async function generateMetaData(
//     { params: {id}} : ItemPageProps
//     ): Promise<Metadata>{
//     const item = await getItem(id);    
//     return{
//         title: item.name + " -marketplace",
//         description: item.description,
//         openGraph:{
//             images: [{url: item.imageUrl}],
//         }      
//     }
// }

export default async function ItemPage(
    {params:{id},
} : ItemPageProps) {

    const item = await getItem(id);

    return(
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <Image 
                src={item.imageUrl}
                alt={item.name}
                width={500}
                height={500} 
                className="rounded-lg"
                priority
            />
        <div>
                <h1 className="text-5xl font-bold">{item.name}</h1>
                <PriceTag price = {item.price} className="mt-4" />
                <p className="py-6">{item.description}</p>
                {item.userId && (
                    <button className="btn btn-secondary"><Link href={`/profile/${item.userId}`}>View seller profile</Link></button>
                )}
                {/* <Link href={`/user/${item.userId}`}> View seller profile</Link> */}
                <AddToCartButton 
                    itemId={item.id} 
                    itemQuantity={itemQuantity}/>
            </div>
        </div>
    )  
}