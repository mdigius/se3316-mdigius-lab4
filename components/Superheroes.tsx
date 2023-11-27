"use client";
import {Button, TextInput, Select, Label}from "flowbite-react";
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import Link from 'next/link'
import SuperheroResult from "./SuperheroResult";

const Superheroes = () => {
    const router = useRouter()
    const [searchCriteria, setSearchCriteria] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    async function handleSearch(event: React.FormEvent){
        event.preventDefault()
        var url = "http://localhost:5002/api/"
        if(searchCriteria == 'name'){
            url += 'superheroInfo/name/' + searchQuery
        } else if(searchCriteria == 'race'){
            url += 'race/' + searchQuery
        } else if(searchCriteria == 'publisher'){
            url += 'publisher/' + searchQuery
        } else if(searchCriteria == 'power'){
            url += 'power/name/' + searchQuery
        }

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
                console.log(responseData.json)
            })
            .catch(error => {
                console.error('Error:', error);
                // Set an alert if authentication failed
            });


    }
  return (
    <div className="hero">
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Superhero Search
            </h1>
            
            <p>
                Search for any superhero below!
            </p>
            <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={handleSearch}>
                <div className="mb-2 block">
                    <Label value="Search By" />
                    <Select id="search-criteria" onChange={(e) => setSearchCriteria(e.target.value.toLowerCase())}>
                        <option>Name</option>
                        <option>Race</option>
                        <option>Publisher</option>
                        <option>Power</option>
                    </Select>
                </div>
                
                
                <TextInput
                id="searchQuery"
                placeholder="Example: Batman"
                required
                shadow
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button outline gradientDuoTone="tealToLime" type="submit">Search!</Button>
            </form>
            <SuperheroResult/>
            <SuperheroResult/>
            <SuperheroResult/>
            <SuperheroResult/>
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