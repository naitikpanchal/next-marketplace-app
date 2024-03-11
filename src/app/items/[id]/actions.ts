"use server";
import { getCart, createCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function itemQuantity(itemId: string){

    const cart = await getCart() ?? (await createCart());

    const articleInCart = cart.items.find(item => item.itemId == itemId)

    if(articleInCart){
        await prisma.cartItem.update({
            where: {id: articleInCart.id},
            data: { quantity : 1}
        })
    } else {
        await prisma.cartItem.create({
            data :{
                cartId: cart.id,
                itemId,
                quantity: 1,
            },
        });
    }
    revalidatePath("/items/[id]");
}