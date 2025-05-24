import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
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
                {Array.from({ length: 5 }).map((_, index) => ( <Image src={}></Image> ))}
            </figure>
          </section>
        </div>
      </aside>
    </main>
  );
};

export default page;
