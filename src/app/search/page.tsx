import ItemCard from "@/components/ItemCard"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"

interface SearchPageProps{
    searchParams: {query: string}
}
export function generateMetadata({
    searchParams: {query},
}: SearchPageProps): Metadata {
    return{
        title: `Search ${query} - Marketplace`
    }
}
export default async function SearchPage({searchParams:{query}}: SearchPageProps){
    const items = await prisma.item.findMany({
        where:{
            OR: [
                { name: {contains: query, mode: "insensitive"}},
                { description: {contains: query, mode: "insensitive"}},
                
            ]
        },
        orderBy: {id: "desc"}
    })
    if(items.length === 0){
        return <div className="text-center">No products found.</div>
    }
    return(
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl">
            {items.map(item => (
                <ItemCard item={item} key={item.id}/>
            ))}
        </div>
    )
}