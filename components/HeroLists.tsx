"use client";
import { Button } from 'flowbite-react'
import React from 'react'

const HeroLists = () => {
  return (
    <div className="hero">
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Superhero Lists
            </h1>
            <h2>
              Create a list or view and rate public lists below!
            </h2>
            <Button className="transition-transform transform hover:scale-105 max-w-sm mt-10" 
            gradientDuoTone="tealToLime" href='/lists/create'>
              Create List!
            </Button>
            <Button className="transition-transform transform hover:scale-105 max-w-sm mt-10" 
            gradientDuoTone="tealToLime" href='/lists/personal'>
              View Personal Lists!
            </Button>
            <h1 className="hero__title mt-10">
                Public Lists:
            </h1>
          </div>
         

    </div>
  )
}

export default HeroLists