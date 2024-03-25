"use client";

import { useState, useTransition } from "react";
import { Toaster, toast } from 'sonner';

interface AddToCartButtonProps{
    itemId: string,
    itemQuantity: (itemId: string) => Promise<void>;
}

export default function AddToCartButton({itemId, itemQuantity}: AddToCartButtonProps) {

    const [isPending, startTransaction] = useTransition();
    const [success, setSuccess] = useState(false);

    return(
        <div className="flex items-center gap-2">
            <button
            className="btn btn-primary"
            onClick={() => {
                setSuccess(false);
                startTransaction(async () => {
                    try {
                        await itemQuantity(itemId);
                        setSuccess(true);
                        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Product' }), 300));
                        toast.promise(promise, {
                            loading: 'Loading...',
                            success: (data: any) => {
                                return `${data.name} has been successfully added to Cart!`;
                            },
                            error: 'Error',
                            style: {
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '16px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                textAlign: 'center',
                                maxWidth: '350px',
                                margin: 'auto',
                            },
                        })
                    } catch (error) {
                        toast.error('Failed to add product to cart');
                    }
                })
            }}
            >
                Buy Now 
            </button>
            <Toaster position="bottom-right" expand={false} richColors/>
            {isPending && <span className="loading loading-spinner loading-md" />}
        </div>
    )

}