"use client";
import {Button, TextInput, Select, Label, Alert}from "flowbite-react";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import Link from 'next/link'
import SuperheroResult from "./SuperheroResult";
import { HiInformationCircle } from 'react-icons/hi';
import { SuperheroResultProps } from "@/types";


const Superheroes = () => {
    const router = useRouter()
    const [searchCriteria, setSearchCriteria] = useState('name');
    const [publisher, setPublisher] = useState('any')
    const [race, setRace] = useState('any')
    const [publisherList, setPublisherList] = useState([])
    const [name, setName] = useState('')
    const [raceList, setRaceList] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [returnN, setReturnN] = useState('8');
    const [superheroResults, setSuperheroResults] = useState([]);
    const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
    const [alertMessage, setAlertMessage] = useState(''); // State to manage alert message

    async function handleSearch(event: React.FormEvent){
        event.preventDefault()
        var url = "http://localhost:5002/api/superheroInfo/query"
        
        const data = {
            returnN: returnN,
            name: name,
            publisher: publisher,
            race: race
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
                setSuperheroResults(responseData)
                setShowAlert(false);
                console.log(superheroResults)
            })
            .catch(error => {
                setSuperheroResults([])
                setAlertMessage(`No heroes found for: ${name}`);
                setShowAlert(true);
                console.error('Error:', error);
            });


    }
    async function fetchRaces(){
        var url = "http://localhost:5002/api/race"

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
                setRaceList(responseData)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    async function fetchPublishers(){
        var url = "http://localhost:5002/api/publisher"

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
                setPublisherList(responseData)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }
    useEffect(() => {
        fetchPublishers()
        fetchRaces()

    }, [])
    
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
                    <Label value="Name:" />
                    <TextInput
                        id="searchQuery"
                        placeholder="Example: Batman"
                        shadow
                        onChange={(e) => {
                            setName(e.target.value);
                            // if(e.target.value!=''){
                            //     handleSearch(e); 
                            // }
                        }}
                    />
                </div>
                
                
                
                <div className="mb-2 block">
                    <Label value="Publisher" />
                    <Select id="publisher" defaultValue = 'Any' onChange={(e) => setPublisher(e.target.value.toLowerCase())}>
                        <option>Any</option>
                        {publisherList.map((result, index) => (
                                <option key={index}>{result}</option>                 
                            ))}  
                        
                    </Select>
                </div>
                <div className="mb-2 block">
                    <Label value="Race" />
                    <Select id="race" defaultValue = 'Any' onChange={(e) => setRace(e.target.value.toLowerCase())}>
                        <option>Any</option>
                        {raceList.map((result, index) => (
                                <option key={index}>{result}</option>                 
                            ))}  
                        
                    </Select>
                </div>
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
                
                <Button className="transition-transform transform hover:scale-105" gradientDuoTone="purpleToPink" type="submit">Search!</Button>
                {showAlert && <Alert color="failure" icon={HiInformationCircle}>{alertMessage}</Alert>}
            </form>
            <div className='results' id='results'>
                {superheroResults.map((result, index) => (
                    <div key={index} className="transition-transform transform hover:scale-105">
                    <SuperheroResult superheroData={result} />
                    </div>
                ))}        
            </div>
        </div>

        
       
        
        <div className="hero__image-container">
                <div className="hero__image">
                    <Image src="/blackpanther.png" alt="hero" 
                    fill className="object-contain mt-8"
                    />

                </div>
             </div>
    </div>
  )
}

export default Superheroes