"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CustomButton } from '.';
import Cookies from 'js-cookie';

import { get } from 'http';
import { useRouter } from 'next/navigation'
const Navbar = () => {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState('')
  const [username, setUsername] = useState('')
  useEffect(() => {
    const loggedQuery = Cookies.get("loggedin")
    const userQuery = Cookies.get("username")
    if(loggedQuery==undefined || loggedQuery == 'false'){
      setLoggedIn('false')
    } else {
      setLoggedIn('true')
    }
    if(userQuery==undefined){
      setUsername('')
    } else {
      setUsername(userQuery)
    }
    
  }, [])

  
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
          
          {loggedIn == 'true' && 
          <CustomButton
            title="Lists"
            href="/lists/public"
            btnType="button"
            containerStyles="text-white rounded-xl bg-black-100 min-w-w[130px] transition-transform transform hover:scale-105"
          />
          }
          {loggedIn == 'true' && 
          <CustomButton
            title={username}
            href="/dashboard"
            btnType="button"
            containerStyles="text-white rounded-xl bg-black-100 min-w-w[130px] transition-transform transform hover:scale-105"
          />
          }
          {loggedIn == 'false' && 
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
