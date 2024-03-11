import { cookies } from "next/dist/client/components/headers";
import { prisma } from "./prisma";
import { Cart, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export type CartWithProducts = Prisma.CartGetPayload<{
    include : {items: {include : {item: true}}}
}>;

export type CartItemWithItem = Prisma.CartItemGetPayload<{
    include: {item:true};
}>;

export type ShoppingCart = CartWithProducts & {
    size : number,
    subtotal : number,
}

export async function getCart(): Promise<ShoppingCart|null>{
    const session = await getServerSession(authOptions);
    console.log("session: "+ JSON.stringify(session));
    let cart: CartWithProducts | null = null;
    
    if(session){
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email || undefined
            }
        });
        cart = await prisma.cart.findFirst({
            where: {
                userId: currentUser?.id
            },
            include: {
                items: {
                    include: {
                        item: true
                    }
                }
            }
        })
    }else {
    const localCartId = cookies().get("localCartId")?.value
    cart = localCartId ?
    await prisma.cart.findUnique({
        where :{id : localCartId},
        include : {items: {include : {item: true}}}
    })
    : null;
    }

    if(!cart){
        return null;
    }
    
    return {
        ...cart,
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0), 
        subtotal: cart.items.reduce(
            (acc, item) => acc + item.quantity *item.item.price, 0
        ) 
    }
}

export async function createCart(): Promise<ShoppingCart> {

const session = await getServerSession(authOptions);

    let newCart: Cart;
    if(session){
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email || undefined
            }
        });
        newCart = await prisma.cart.create({
            data : {
                userId: currentUser?.id
            },
        })
    } else {
    newCart = await prisma.cart.create({
        data : {}
    })

    cookies().set("localCartId", newCart.id);
    }
    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0
    }
}