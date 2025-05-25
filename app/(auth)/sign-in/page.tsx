"use client";
import { authclient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  const handleSignIn = async () => {
    return await authclient.signIn.social({ provider: "google" });
  };
  return (
    <main className="sign-in">
      <aside className="testimonial">
        <Link href={"/"}>
          <Image
            src={"/assets/icons/logo.svg"}
            alt="logo"
            height={32}
            width={32}
          ></Image>

          <h1>SnapCast</h1>
        </Link>

        <div className="description">
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  src={"/assets/icons/star.svg"}
                  alt="stars"
                  height={20}
                  width={20}
                  key={index}
                ></Image>
              ))}
            </figure>
            <p>
              "SnapCast makes screen recording easy. From quick WalkThroughs to
              full Presentation, it's fast, smooth and shareable in seconds."{" "}
            </p>
            <article>
              <Image
                src={"/assets/images/jason.png"}
                alt="Jason"
                width={64}
                height={64}
                className="rounded-full"
              ></Image>
              <div>
                <h2>Jason Rivera</h2>
                <p>Product Designer, NovaByte</p>
              </div>
            </article>
          </section>
        </div>
        <p> &copy; SnapCast {new Date().getFullYear()}</p>
      </aside>
      <aside className="google-sign-in">
        <section>
          <Link href={"/"}>
            <Image
              src={"/assets/icons/logo.svg"}
              alt="logo"
              height={40}
              width={40}
            ></Image>

            <h1>SnapCast</h1>
          </Link>
          <p>
            Create and share your very first <span>SnapCast Video</span>in no
            Time!
          </p>
          <button onClick={handleSignIn}>
            <Image
              src={"/assets/icons/google.svg"}
              alt="google"
              width={22}
              height={22}
            ></Image>
            <span>Sign in with Google</span>
          </button>
        </section>
      </aside>
      <div className="overlay" />
    </main>
  );
};

export default page;
