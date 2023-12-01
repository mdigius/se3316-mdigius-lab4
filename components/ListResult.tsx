"use client";

import { ListResultProps } from '@/types'
import { Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { SuperheroResult } from '.';

const ListResult = ({listData}: ListResultProps) => {
    async function fetchHeroByID(id: number){
        var url = `http://localhost:5002/api/lists/${listData.listName}/heroes`
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
                setSuperheroResults(responseData)
            })
            .catch(error => {
                
                console.error('Error:', error);
            });

    }
    const [superheroResults, setSuperheroResults] = useState([[]]);
    useEffect(()=> {


        
    }, []);
    return (
        <div className="mt-5 mb-5">
        {listData && (
            <Card>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {listData.listName}
            </h5>
            <p>Made by: ${listData.username}</p>

            
            

            </Card>
        )
        }
        </div>
    )
    
}

export default ListResult