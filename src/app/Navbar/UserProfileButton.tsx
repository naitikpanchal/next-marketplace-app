"use client"
import { Session } from "next-auth";
import Link from "next/link";
// import profilePic from "@/assets/profile-svgrepo-com.png";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

type UserProfileButtonProps = {
    session: Session | null;
};

export default function UserProfileButton({session} : UserProfileButtonProps) {
    const user = session?.user;
    console.log("user from UserProfileButton: "+user);
    console.log(user);

  return (
    <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost ">
            {user ? ( <><Image 
                src={user?.image ?? ""}
                alt="profile picture"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full" /> {user.name}</>)
            : (<Link href="/login" className="btn btn-ghost text-xl">
                    Login
                </Link>)
            }
        </label>
        {
            user ? (<ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 mt-3">
            <li>
                {user ?
                (<button className="btn btn-ghost">
                            <Link href="/profile">Profile</Link>
                        </button>)
                        : (<></>)
                }
            </li>
            <li>
                {user ? 
                    (
                        <button onClick={() => signOut({callbackUrl:"/"})} className="btn btn-ghost">
                        Logout
                        </button>
                    ) : 
                ( <button onClick={() => redirect("/login")}>Sign In</button>  )
                } 
            </li>
        </ul>) : (<></>)
        }
    </div>
  );
}