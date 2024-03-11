import Link from "next/link";

export default function Navbar() {
    return (
        <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow ">
          <Link className="text-gray-800 hover:text-sky-400 transition-colors" href={"/"}>
            Home
          </Link>
          <Link className="text-gray-800 hover:text-sky-400 transition-colors" href={"/add-item"}>
            Add Item
          </Link>
          <Link className="text-gray-800 hover:text-sky-400 transition-colors" href={"/dashboard"}>
            Dashboard
          </Link>
        </header>
      );
}