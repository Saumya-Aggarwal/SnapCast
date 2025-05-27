import { ICONS } from "@/constants";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import DropDownList from "./DropDownList";
import RecordScreen from "./RecordScreen";

function Header({ subHeader, title, userImg }: SharedHeaderProps) {
  return (
    <header className="header">
      <section className="header-container">
        <div className="details">
          {userImg && (
            <img
              src={userImg}
              alt="User Image"
              className="user-image rounded-full w-[66px] h-[66px]"
            />
          )}

          <article>
            <p>{subHeader}</p>
            <h1 className="title">{title}</h1>
          </article>
        </div>
        <aside>
          <Link href={"/upload"}>
            <Image
              src={"/assets/icons/upload.svg"}
              alt="Upload"
              width={16}
              height={16}
            />
            <span>Upload a video</span>
          </Link>
          <RecordScreen />
        </aside>
      </section>

      <section className="search-filter">
        <div className="search">
          <input type="text" placeholder="Search videos, tags, folders..." />
          <Image
            src={"/assets/icons/search.svg"}
            alt="search"
            width={16}
            height={16}
          ></Image>
        </div>
        <DropDownList/>
      </section>
    </header>
  );
}

export default Header;
