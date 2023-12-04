"use client";

import { SuperheroResultProps } from "@/types";
import { Card, Button, Label, Accordion } from "flowbite-react";
import React, {useEffect, useState } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


const SuperheroResult = ({superheroData}: SuperheroResultProps) => {
  const [powers, setPowers] = useState([])
  async function fetchPowers(){
    const url = `${apiUrl}/power/hero/${superheroData.name}`
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
          setPowers(responseData)
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
  useEffect(() => {
    fetchPowers()
  }, [])
  return (
    <div className="mt-5 mb-5">
      {superheroData && (
        <Card>
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {superheroData.name}
            </h5>
            <p>Publisher: {superheroData.Publisher}</p>
            <Accordion collapseAll>
              <Accordion.Panel>
                <Accordion.Title>More Info</Accordion.Title>
                <Accordion.Content>
                  <p>ID: {superheroData.id}</p>
                  <p>Gender: {superheroData.Gender}</p>
                  <p>Eye color: {superheroData["Eye color"]}</p>
                  <p>Race: {superheroData.Race}</p>
                  <p>Hair color: {superheroData["Hair color"]}</p>
                  <p>Height: {superheroData.Height}</p>
                  <p>Skin color: {superheroData["Skin color"]}</p>
                  <p>Alignment: {superheroData.Alignment}</p>
                  <p>Weight: {superheroData.Weight}</p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Powers</Accordion.Title>
                <Accordion.Content>
                <div className='results' id='results'>
                    {powers.map((result, index) => (
                        <p key={index}>{result}</p>
                    ))}        
                    </div>
                  
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            
            
            
          </div>
          <Button className="transition-transform transform hover:scale-105" gradientDuoTone="purpleToBlue" href={`https://duckduckgo.com/?q=${superheroData.name}%20${superheroData.Publisher}`} target="_blank">Search on DuckDuckGo!</Button>
        </Card>
      )}
    </div>
  );
};


export default SuperheroResult;
