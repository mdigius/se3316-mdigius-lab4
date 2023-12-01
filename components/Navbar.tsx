
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CustomButton } from '.';
import Cookies from 'js-cookie';

import { get } from 'http';

const Navbar = () => {
  return (
    <header className="w-full absolute z-9">
      <nav className="mt-3 bg-blue-300 max-w-[1440px] mx-auto flex justify-between items-center rounded-2xl sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center z-10">
          <Image
            src="/herohub.png"
            alt="logo"
            width={118}
            height={18}
            className="object-contain transition-transform transform hover:scale-105" 
          />
        </Link>

        <div className="flex space-x-4">
          <CustomButton
            title="Privacy Policy"
            href="/"
            btnType="button"
            containerStyles="text-white rounded-xl bg-black-100 min-w-w[130px] transition-transform transform hover:scale-105"
            
          />
          <CustomButton
          
            title="View Heroes"
            href="/superheroes"
            btnType="button"
            containerStyles="text-white rounded-xl bg-black-100 min-w-w[130px] transition-transform transform hover:scale-105"
          />
          {(Cookies.get("loggedin") == "true")  && 
          <CustomButton
            title="Lists"
            href="/lists/public"
            btnType="button"
            containerStyles="text-white rounded-xl bg-black-100 min-w-w[130px] transition-transform transform hover:scale-105"
          />
          }
          {(Cookies.get("loggedin") != "true" || Cookies.get('loggedin') == undefined ) && 
          <CustomButton
            title="Sign In"
            href="/authenticate"
            btnType="button"
            containerStyles="text-white rounded-xl bg-black-100 min-w-w[130px] transition-transform transform hover:scale-105"
          />
          }

        </div>

      </nav>
    </header>
  );
};

export default Navbar;
