import { prisma } from "@/lib/db/prisma";
import ItemCard from "@/components/ItemCard";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const items = await prisma.item.findMany({
    orderBy: {
      id: 'desc',
    },
  });


  return (
    <div>
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex-col lg-flex-row">
        <Image 
          src = {items[0].imageUrl}
          alt = {items[0].name}
          width = {400}
          height = {800}
          className="w-full max-w-sm rounded-xl shadow-xl"
          priority
        />
        <div>
          <h1 className="text-5xl font-bold">{items[0].name}</h1>
          <p>{items[0].description}</p>
          <Link 
            href={"/items/"+ items[0].id}
            className="btn btn-primary mt-4"
          >
            View Item
            </Link>
        </div>
        </div>
      </div>

      <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.slice(1).map(item => (
          <ItemCard item={item} key={item.id} />
        ))}
      </div>

    </div>
  );
}