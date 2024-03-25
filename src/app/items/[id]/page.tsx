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

const getItem = cache(async (id:string) => {
    const item = await prisma.item.findUnique({where: {id}})
    if (!item) notFound();
    return item;
})

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
                <AddToCartButton 
                    itemId={item.id} 
                    itemQuantity={itemQuantity}/>
            </div>
        </div>
    )  
}