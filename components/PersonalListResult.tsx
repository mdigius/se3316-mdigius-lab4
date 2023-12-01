"use client";

import { ListResultProps } from '@/types'
import { Accordion, Alert, Button, Card, Label, TextInput, ToggleSwitch } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import SuperheroResult from "./SuperheroResult";
import { SuperheroResultProps } from "@/types";
import { HiInformationCircle } from 'react-icons/hi';
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';
const PersonalListResult = ({listData}: ListResultProps) => {
    const router = useRouter();
    const username = Cookies.get("username")
    const [superheroResults, setSuperheroResults] = useState([]);
    const [listName, setListName] = useState('');
    const [heroIDs, setHeroIDs] = useState('');
    const [description, setDescription] = useState('');
    const [switch1, setSwitch1] = useState(listData.publicList);
    const [showAlert, setShowAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(''); 
    async function handleSubmit(event: React.FormEvent) {
                event.preventDefault();
                // URL to connect to api
                const url = `http://localhost:5002/api/secure/${username}/lists`;
                // Creates json body object to be passed in post request
                const data = {
                    username: username,
                    listName: listName,
                    description: description,
                    heroIDs: heroIDs,
                    publicList: switch1
                };
                fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(responseData => {
                    console.log('POST successful:', responseData);
                    router.push('')
                    
                })
                .catch(error => {
                    console.error('Error:', error);
                    setAlertMessage(`Error creating list`);
                    setShowAlert(true);
                });


        }
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
    async function deleteList(){

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
                    <Accordion.Title>
                        Modify List
                    </Accordion.Title>
                    <Accordion.Content>
                    <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={handleSubmit}>
                  <div className="mb-2 block">
                     <Label value="List Name" />
                     <TextInput
                        id="listname"
                        placeholder="Enter List Name"
                        required
                        value={listData.listName}
                        shadow
                        onChange={(e) => setListName(e.target.value)}
                      />
                  </div>
                  <div className="mb-2 block">
                     <Label value="Description (Optional)" />
                     <TextInput
                        id="description"
                        value={listData.description}
                        placeholder="Enter Description"
                        shadow
                        onChange={(e) => setDescription(e.target.value)}
                      />
                  </div>
                  
                  <div className="mb-2 block">
                     <Label value="Hero ID's (Comma seperated)" />
                     <TextInput
                        id="heroIDs"
                        placeholder="Example: 240, 55, 76"
                        value={listData.heroIDs.map(id=>String(id))}
                        required
                        shadow
                        onChange={(e) => setHeroIDs(e.target.value)}
                      />
                    </div>
                  <div className="flex max-w-md flex-col gap-4">
                    <ToggleSwitch checked={switch1} label="Public List?" onChange={setSwitch1}>
                    </ToggleSwitch>
                  </div>
                  <Button className="mt-5 transition-transform transform hover:scale-105" outline gradientDuoTone="redToYellow" type="submit">Update List</Button>
                  <Button className="mt-5 transition-transform transform hover:scale-105" color="failure" onClick={deleteList}>Delete List</Button>
                    {/* Conditionally render the Alert component */}
                    {showAlert && <Alert color="failure" icon={HiInformationCircle}>{alertMessage}</Alert>}
            </form>
                    </Accordion.Content>
                </Accordion.Panel>
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

export default PersonalListResult