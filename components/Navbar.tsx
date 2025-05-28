"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

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
        {isPending ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <figure>
            <button onClick={() => router.push(`/profile/${user?.id}`)}>
              <Image
                src={user?.image || ""}
                alt="user image"
                width={30}
                height={30}
                className="rounded-full"
              ></Image>
            </button>
            <button className="cursor-pointer" onClick={handleLogout}>
              <img
                src="/assets/icons/logout.svg"
                alt="Logout"
                className="w-[25px] h-[25px] rotate-180 aspect-square"
              />
            </button>
          </figure>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
