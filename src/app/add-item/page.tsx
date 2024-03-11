import SubmitBtn from "@/components/SubmitBtn";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

export const metadata = {
    title: "Add Item",
    description: "Add an item to the marketplace",
};

async function addItem(formdata: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    const name = formdata.get("name")?.toString();
    const description = formdata.get("description")?.toString();
    const imageUrl = formdata.get("imageUrl")?.toString();
    const price = Number(formdata.get("price") || 0) ;
    const condition = formdata.get("condition")?.toString();
    const shipping = formdata.get("shipping")?.toString() || "Not Available";


    console.log({ name, description, imageUrl, price, condition, shipping });
    if (!name || !description || !imageUrl || !price || !condition || !shipping) {
        throw new Error("Missing required fields");
    }
    if (!session) {
        throw new Error("Not authenticated");
    }
    else {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email || undefined,
            },
        });
    await prisma.item.create({
        data: {
            name,
            description,
            imageUrl,
            price,
            condition,
            shipping,
            userId: user?.id || undefined,
        },
    });
    redirect("/");
    }
}

export default async function AddItemPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }
    
    return (
        <div>
        <h1 className="text-lg mb-3 font-bold">Add Item</h1>
        <form action={addItem}>
            <input required
            name="name"
            placeholder="Name"
            className="mb-3 w-full input-bordered input-info"/>

            <textarea required
            name="description"
            placeholder="Description"
            className=" textarea-bordered mb-3 w-full"/>

            <input required
            name="imageUrl"
            placeholder="Image URL"
            type="url"
            className="mb-3 w-full input-bordered"/>

            <input required
            name="price"
            placeholder="Price"
            type="number"
            className="mb-3 w-full input-bordered"/>
            

            <label htmlFor="condition">Condition
            <select required
            name="condition"
            className="mb-3 w-full input-bordered">
                    <option value="New">New</option>
                    <option value="Used - Like New">Used - Like New</option>
                    <option value="Used - Good">Used - Good</option>
                </select>
                </label>
            <div>
            <p>Shipping:</p>
            <label><input type="radio" name="shipping" value="Available"/>Available</label>
            <label><input type="radio" name="shipping" value="Not Available"/>Not Available</label>
            </div>
            <SubmitBtn className="btn-block">Add Item</SubmitBtn>
        </form>
        </div>
    )
}