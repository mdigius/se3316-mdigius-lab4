"use client";

import { ListResultProps } from '@/types'
import { Accordion, Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import SuperheroResult from "./SuperheroResult";
import { SuperheroResultProps } from "@/types";

const ListResult = ({listData}: ListResultProps) => {
    const [superheroResults, setSuperheroResults] = useState([]);
    async function fetchHeroes(){
        var url = `http://localhost:5002/api/secure/lists/${listData.listName}/heroes`
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
                console.log('Successfully retrieved heroes');
                // If succesful authentication, reroute to account page
                setSuperheroResults(responseData)
            })
            .catch(error => {
                setSuperheroResults([])
                console.error('Error:', error);
            });

    }
    
    useEffect(()=> {
        fetchHeroes()
    }, []);
    return (
        <div className="mt-10 mb-10 max-w-xl">
        {listData && (
            <Card>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {listData.listName}
            </h5>
            <p>Made by: {listData.username}</p>
            {listData.description!='' && 
                <p>Description: {listData.description}</p>
                }
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Heroes:
            </h5>
            <Accordion collapseAll>
              <Accordion.Panel>
                <Accordion.Title>View List Heroes</Accordion.Title>
                <Accordion.Content>
                    <div className='results' id='results'>
                    {superheroResults.map((result, index) => (
                        <div key={index} className="transition-transform transform hover:scale-105 max-w-lg">
                            
                            <SuperheroResult superheroData={result}/>
                        </div>
                    ))}        
                    </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
           
            

            </Card>
        )
        }
        </div>
    )
    
}

export default ListResult