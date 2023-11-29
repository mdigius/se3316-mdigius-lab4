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
    const [returnN, setReturnN] = useState('8');
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
        const data = {
            returnN: returnN
        };
        // Converts the data to URL params
        const params = new URLSearchParams(data);

        // Construct the URL with parameters
        const urlWithParams = `${url}?${params}`;

        fetch(urlWithParams, {
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
                <div className="mb-2 block">
                    <Label value="Results Length" />
                    <Select id="returnN" defaultValue = '8' onChange={(e) => setReturnN(e.target.value)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        
                    </Select>
                </div>
                
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