"use client";

import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
const Hero = () => {
    const handleScroll = () => {

    }
  return (
    <div className="hero">
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Superhero Website!
            </h1>
            <p>
                Sample subtitle
            </p>
            <CustomButton
            title="Register"
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

export default Hero