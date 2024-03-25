import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import UserProfileButton from "./UserProfileButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import ShoppingCartBtn from "./ShoppingCartBtn";
import { getCart } from "@/lib/db/cart";

async function searchItems(formData: FormData){
    "use server";
    const searchQuery = formData.get("searchQuery")?.toString();
    if (searchQuery) {
        redirect("/search?query=" + searchQuery);
    }
}

export default async function Navbar() {

    const cart = await getCart();
    const session = await getServerSession(authOptions);

    return (
        <div className="bg-base-100 ">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl">
                        <Image src={logo} alt="marketplace logo" width={20} height={20} />
                        Home
                    </Link>
                </div>
                {session && (
                    <div className="flex-1">
                        <Link href="/add-item" className="btn btn-ghost text-xl">
                            Add Item
                        </Link>
                    </div>
                )}
                <div className="flex-none gap-2">
                    <form action={searchItems}>
                        <div className="form-control">
                            <input 
                                name="searchQuery"
                                placeholder="Search"
                                className="input input-bordered w-full min-w-[100px]"
                            />
                        </div>
                    </form>
                    <ShoppingCartBtn cart={cart} />
                </div>
                <UserProfileButton session={session}/>
            </div>
        </div>
    )   
}