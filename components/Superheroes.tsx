"use client";
import {Button, TextInput, Select, Label}from "flowbite-react";
import { useRouter } from 'next/router';
import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import Link from 'next/link'
import SuperheroResult from "./SuperheroResult";

const Superheroes = () => {
  return (
    <div className="hero">
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Superhero Search
            </h1>
            
            <p>
                Search for any superhero below!
            </p>
            <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={()=>{}}>
                <div className="mb-2 block">
                    <Label value="Search By" />
                    <Select id="search-criteria">
                        <option>Name</option>
                        <option>Race</option>
                        <option>Publisher</option>
                        <option>Power</option>
                    </Select>
                </div>
                
                
                <TextInput
                id="searchcriteria"
                placeholder="Example: Batman"
                required
                shadow
                />
                <Button outline gradientDuoTone="tealToLime" type="submit">Search!</Button>
            </form>
            <SuperheroResult/>

        </div>

        
       
        
        <div className="hero__image-container">
                <div className="hero__image">
                    <Image src="/blackpanther.png" alt="hero" 
                    fill className="object-contain"
                    />

                </div>
             </div>
    </div>
  )
}

export default Superheroes