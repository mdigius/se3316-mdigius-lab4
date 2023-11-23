"use client";
import { Button, Checkbox, Label, Alert, TextInput } from "flowbite-react";
import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import Link from 'next/link';

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
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="email2" value="Email" />
                    </div>
                    <TextInput id="email2" type="email" placeholder="example@example.com" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="password2" value="Password" />
                    </div>
                    <TextInput id="password2" type="password" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="repeat-password" value="Confirm Password" />
                    </div>
                    <TextInput id="repeat-password" type="password" required shadow />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="agree" />
                    <Label htmlFor="agree" className="flex">
                    I agree with the&nbsp;
                    <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                        terms and conditions
                    </Link>
                    </Label>
                </div>
                <Button type="submit">Register new account</Button>
                </form>
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