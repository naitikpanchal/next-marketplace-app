"use client";
import { CartItemWithItem } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryProps{
    cartItem: CartItemWithItem;
    setItemQuantity: (itemId: string, quantity: number) => Promise<void>;
}
export default function CartEntry(
    {cartItem :{item, quantity},
    setItemQuantity,
}: CartEntryProps){
    const [isPending, startTransition] = useTransition();
    const quantityOptions: JSX.Element[] = [];
    for(let i = 0; i<=1; i++){
        quantityOptions.push(
            <option value={i} key={i}>
                {i}
            </option>
        )
    }
    return(
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="rounded-lg"
                />
                <div>
                    <Link href={"/items/" + item.id} className="font-bold" >
                        {item.name}
                    </Link>
                    <div>Price:{formatPrice(item.price)}</div>
                    <div className="my-1 flex items-center gap-2">
                        Quantity:
                        <select className="select select-bordered w-full max-w-[80px]" defaultValue={quantity} 
                        onChange={e => {
                            const newQuantity = parseInt(e.currentTarget.value)
                            startTransition(async () => {
                                await setItemQuantity(item.id, newQuantity)
                            })
                        }}>
                            {quantityOptions}
                    </select>
                    </div>
                    <div className="flex items-center gap-3">
                        Total: {formatPrice(item.price * quantity)}
                    </div>
                    {isPending && (
                        <span className="loading loading-spinner loading-sm"/>
                    )}
                </div>
            </div>  
            <div className="divider" />
        </div>
    )
}