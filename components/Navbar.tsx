import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CustomButton } from '.';

const Navbar = () => {
  return (
    <header className="w-full absolute z-9">
      <nav className="bg-blue-300 max-w-[1440px] mx-auto flex justify-between items-center rounded-2xl sm:px-16 px-6 py-4">

        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/next.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>

        <div className="flex space-x-4">
          <CustomButton
            title="Privacy Policy"
            href="/"
            btnType="button"
            containerStyles="text-white rounded-xl bg-black-100 min-w-w[130px]"
          />
          <CustomButton
            title="View Heroes"
            href="/superheroes"
            btnType="button"
            containerStyles="text-white rounded-xl bg-black-100 min-w-w[130px]"
          />
          <CustomButton
            title="Sign In"
            href="/authenticate"
            btnType="button"
            containerStyles="text-white rounded-xl bg-black-100 min-w-w[130px]"
          />
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
