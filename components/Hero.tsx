"use client";
import { useRouter } from 'next/router';
import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import Link from 'next/link'
import { Button, Checkbox, Label, Alert, TextInput } from "flowbite-react";

const Hero = () => {
  return (
    <div className="hero">
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                HeroHub
            </h1>
            <p>
                Welcome to HeroHub! Register for an account to create custom superhero lists, or view heroes as a guest!
            </p>
            
        <Button className="mt-10 transition-transform transform hover:scale-105" gradientDuoTone="purpleToPink" href="/register">
            Sign up!
            </Button>
            <Button className="mt-10 transition-transform transform hover:scale-105" gradientDuoTone="purpleToPink" href="/superheroes">
            View Heroes!
            </Button>
        </div>
        <div className="hero__image-container">
                <div className="hero__image">
                    <Image src="/deadpool2.png" alt="hero" 
                    fill className="object-contain mt-10"
                    />
                </div>
             </div>
    </div>
    
  )
}

export default Hero