import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import {setItemQuantity} from "./actions";
import { formatPrice } from "@/lib/format";

export const metadata = {
    title : "Your Cart - MarketPlace",
};

export default async function CartPage(){
    const cart = await getCart();

    return(
        <div>
            <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
            {cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setItemQuantity={setItemQuantity} />
            ))}
            {!cart?.items.length && <p>Empty Cart!</p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    Total: {formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary sm:w-[200px]">Checkout</button>
            </div>
        </div>
    )
}