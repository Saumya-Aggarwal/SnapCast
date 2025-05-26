import Image from "next/image";
import React from "react";

const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <section className="empty-state">
      <div>
        <Image src={icon} alt="icon" height={46} width={46}></Image>
      </div>
      <article>
        <h1>{title}</h1>
        <p>{description} </p>
      </article>
    </section>
  );
};

export default EmptyState;
