"use client";
import Image from "next/image";
import { useState } from "react";

const DropDownList = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="filter-trigger">
          <figure>
            <Image
              src={"/assets/icons/hamburger.svg"}
              alt="menu"
              width={14}
              height={14}
            ></Image>
            Most Recent
          </figure>
          <Image
            src={"/assets/icons/arrow-down.svg"}
            alt="arrow-down"
            width={20}
            height={20}
          ></Image>
        </div>
      </div>
      {isOpen && (
        <ul className="dropdown">
            {['Most Recent', 'Most Popular', 'Most Liked'].map((option) => (
              <li
                key={option}
                className="list-item"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownList;
