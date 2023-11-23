"use client";

import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
const Registration = () => {
    const handleScroll = () => {

    }
  return (
    <div className="hero">
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Register!
            </h1>
            <p>
                Please enter an email and password below to register for our website.
            </p>
            <CustomButton
            title="Create Account"
            containerStyles="bg-primary-blue
            text-white rounded-full mt-10"
            handleClick = {handleScroll}
             />
        </div>
        <div className="hero__image-container">
                <div className="hero__image">
                    <Image src="/deadpool.png" alt="hero" 
                    fill className="object-contain"
                    />
                </div>
             </div>
    </div>
  )
}

export default Registration