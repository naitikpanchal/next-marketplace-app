import {Item} from '@prisma/client';
import Link from 'next/link';
import PriceTag from './PriceTag';
import Image from 'next/image';

interface ItemCardProps {
    item : Item;
}

export default function ItemCard({item} : ItemCardProps) {
    const isNew = (Date.now() - new Date(item.createdAt).getTime()) < 1000 * 60 * 60 * 24 * 7;
    return (
        <Link href={"/items/"+item.id}
        className='card w-full bg-base-100 hover:shadow-xl transition-shadow duration-200'>
            <figure>
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={300}
                    height={300} 
                    className='h-48 object-cover'
                />
            </figure>
            <div className='card-body'>
                <h2 className='card-title'>{item.name}</h2>
                {isNew && <div className='badge badge-secondary'>NEW</div>}
                <p>{item.description}</p>
                <PriceTag price={item.price} />
            </div>
        </Link>
        
    )
}