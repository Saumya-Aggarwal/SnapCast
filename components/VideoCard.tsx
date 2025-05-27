"use client";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

const VideoCard = ({
  id,
  title,
  thumbnail,
  userImg,
  username,
  createdAt,
  views,
  visibility,
  duration,
}: VideoCardProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/video/${id}`);
    setCopied(true);
  };
  useEffect(() => {
    const changeChecked = setTimeout(() => {
      if (copied) setCopied(false);
    }, 2000);
    return () => {
      clearTimeout(changeChecked);
    };
  }, [copied]);

  return (
    <div className="video-card">
      <Link href={`/video/${id}`}>
        <Image
          src={thumbnail}
          alt="thumbnail"
          width={290}
          height={160}
          className="thumbnail"
        ></Image>
        <article>
          <div>
            <figure>
              <Image
                src={userImg}
                alt="UserImage"
                width={34}
                height={34}
                className="rounded-full"
              ></Image>
              <figcaption>
                <h3>{username}</h3>
                <p>{visibility}</p>
              </figcaption>
            </figure>
            <aside>
              <Image
                src={"/assets/icons/eye.svg"}
                alt="views"
                width={16}
                height={16}
              ></Image>
              <span>{views}</span>
            </aside>
          </div>
          <h2 className="flex justify-between">
            {title}
            <span className="align-self-end">
              {createdAt.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
                day: "numeric",
              })}
            </span>
          </h2>
        </article>{" "}
      </Link>
      <button onClick={handleCopyLink} className="copy-btn">
        <Image
          src={"/assets/icons/link.svg"}
          alt="copy"
          width={18}
          height={18}
        ></Image>
      </button>{" "}
      {duration !== null && duration !== 0 && (
        <div className="duration">
          {duration >= 60
            ? `${Math.floor(duration / 60)} min ${duration % 60} sec`
            : `${duration} sec`}
        </div>
      )}
    </div>
  );
};

export default VideoCard;
