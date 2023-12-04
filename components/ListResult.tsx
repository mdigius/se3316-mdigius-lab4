"use client";

import { ListResultProps } from '@/types'
import { Accordion, Alert, Button, Card, Label, Rating, TextInput, ToggleSwitch } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi';
import React, { useEffect, useState } from 'react'
import SuperheroResult from "./SuperheroResult";
import { SuperheroResultProps } from "@/types";
import Cookies from 'js-cookie';
import Review from './Review';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const ListResult = ({listData}: ListResultProps) => {
    const username = Cookies.get('username')
    const [superheroResults, setSuperheroResults] = useState([]);
    const [reviewResults, setReviewResults] = useState([]);
    const [comment, setComment] = useState('')
    const [selectedStars, setSelectedStars] = useState(3);
    const [showAlert, setShowAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(''); 
    const [totalStars, setTotalStars] = useState(0)
    const handleStarClick = (index: number) => {
        // Update the number of selected stars when a star is clicked
        setSelectedStars(index + 1);
    };
    async function fetchHeroes(){
        var url = `${apiUrl}/secure/lists/${listData.listName}/heroes`
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
    async function fetchReviews(){
        var url = `${apiUrl}/secure/reviews/${listData.listName}`
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
                setReviewResults(responseData)
            })
            .catch(error => {
                setReviewResults([])
                console.error('Error:', error);
            });

    }
    async function fetchTotalStars(){
        var url = `${apiUrl}/reviews/${listData.listName}`
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
                setTotalStars(responseData)
            })
            .catch(error => {
                setTotalStars(0)
                console.error('Error:', error);
            });

    }
    
    useEffect(()=> {
        fetchHeroes()
        fetchReviews()
        fetchTotalStars()
    }, []);
    async function handleSubmitReview(event: React.FormEvent){
        event.preventDefault()
        const url = `${apiUrl}/secure/reviews/${listData.listName}`

        const data = {
            author: username,
            selectedStars: selectedStars,
            comment: comment
        }

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
                window.location.reload()
                
            })
            .catch(error => {
                console.error('Error:', error);
                setAlertMessage(`You have already left a review on this list!`);
                setShowAlert(true);
            });

    }
    return (
        <div className="mt-10 mb-10 max-w-xl">
        {listData && (
            <Card>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {listData.listName}
            </h5>
            
            
            {listData.description!='' && 
                <p>Description: {listData.description}</p>
                }
           
            <p>Number of heroes: {listData.heroIDs.length}</p>
            <p>Made by: {listData.username}</p>
            <p>Last modified: {new Date(listData.date).toLocaleString()}</p>
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
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Rating:
            </h5>
            <Rating size="lg">
                    {[...Array(5)].map((_, index) => (
                    <Rating.Star
                        key={index}
                        filled={index < totalStars}
                    />
                    ))}
                </Rating>
            <Accordion collapseAll>
            <Accordion.Panel>
                <Accordion.Title>View reviews</Accordion.Title>
                <Accordion.Content>
                <div className='results' id='results'>
                    {reviewResults.map((result, index) => (
                        <div key={index} className=" mb-3 max-w-lg">
                            
                            <Review reviewData={result}/>
                        </div>
                    ))}        
                    </div>
                        
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Leave a review!</Accordion.Title>
                <Accordion.Content>
                <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={handleSubmitReview}>
    
                  <div className="mb-2 block">
                  <Rating size="md" className="-mt-5 mb-5">
                    {[...Array(5)].map((_, index) => (
                    <Rating.Star
                        key={index}
                        filled={index < selectedStars}
                        onClick={() => handleStarClick(index)}
                    />
                    ))}
                </Rating>
                     <Label value="Comment (Optional)" />
                     <TextInput
                        id="description"
                        placeholder="Enter Comment"
                        shadow
                        onChange={(e) => setComment(e.target.value)}
                      />
                  </div>
                  
                  {showAlert && <Alert color="failure" icon={HiInformationCircle}>{alertMessage}</Alert>}
                  <Button className="mt-5 transition-transform transform hover:scale-105" gradientMonochrome="success" type="submit">Submit Review!</Button>
                  
            </form>
                    
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