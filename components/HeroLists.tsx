"use client";
import Image from 'next/image';
import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ListResult from './ListResult';

const HeroLists = () => {
  const [listResults, setListResults] = useState([]);
  async function fetchPublicLists(){
    var url = `http://localhost:5002/api/secure/publicLists`
    fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(responseData => {
          console.log('GET successful:', responseData);
          // If succesful authentication, reroute to account page
          setListResults(responseData)
      })
      .catch(error => {
          setListResults([])
          console.error('Error:', error);
      });
  }
  useEffect(()=>{
    fetchPublicLists()

  }, [])
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
            {listResults.map((result, index) => (
                    <div key={index} className="transition-transform transform hover:scale-105">
                        <ListResult listData={result}/>
                    </div>
                ))} 
          </div>
                 
          <div className="hero__image-container mt-10">
                <div className="hero__image mt-10">
                    <Image src="/batman.png" alt="hero"
                        fill className="object-contain mt-10"
                    />
                </div>
            </div>

    </div>
  )
}

export default HeroLists