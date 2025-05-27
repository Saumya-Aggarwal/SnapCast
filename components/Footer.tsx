import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer w-full py-6 mt-10 border-t border-gray-200 bg-white text-center text-gray-600 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2 justify-center">
          <Image src="/assets/icons/logo.svg" alt="SnapCast Logo" width={24} height={24} />
          <span className="font-bold text-gray-800">SnapCast</span>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/upload" className="hover:underline">Upload</Link>
          <a href="https://github.com/saumya-aggarwal/snapcast" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          <a href="https://www.linkedin.com/in/saumya-aggarwal-0a009a28b/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
        </div>
        <div className="text-xs text-gray-400">© {new Date().getFullYear()} SnapCast. Made with ❤️ by Saumya Aggarwal.</div>
      </div>
    </footer>
  );
};

export default Footer;
