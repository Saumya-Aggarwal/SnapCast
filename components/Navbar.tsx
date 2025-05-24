"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
const user = {};
function Navbar() {
  const router = useRouter();
  return (
    <header className="navbar">
      <nav>
        <Link href="/" className="font-satoshi text-2xl">
          <img
            src="/assets/icons/logo.svg"
            alt="Logo"
            className="w-[32px] h-[32px]"
          />
          <h1>SnapCast</h1>
        </Link>

        {user ? (
          <figure>
            <button onClick={() => router.push('/profile/123456')} className="cursor-pointer">
              <img
                src="/assets/images/dummy.jpg"
                alt="User"
                className="w-[32px] h-[32px] rounded-full aspect-square"
              />
            </button>
            <button className="cursor-pointer">
              <img
                src="/assets/icons/logout.svg"
                alt="Logout"
                className="w-[25px] h-[25px] rotate-180 aspect-square"
              />
            </button>
            
          </figure>
        ) : (
          <div>no one</div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
