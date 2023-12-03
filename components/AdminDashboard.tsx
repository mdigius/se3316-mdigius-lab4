"use client"
import { Accordion, Alert, Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { AdminDisableUser, AdminReviewControl } from '.'

const AdminDashboard = () => {
    const [reviewResults, setReviewResults] = useState([])
    const [userResults, setUserResults] = useState([]);
    

    async function fetchReviews(){
        
        var url = `http://localhost:5002/api/admin/reviews/`
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
                console.log(responseData);
                // If succesful authentication, reroute to account page
                setReviewResults(responseData)
            })
            .catch(error => {
                setReviewResults([])
                console.error('Error:', error);
            });

    }
    async function fetchUserList(){
        const url = 'http://localhost:5002/api/admin/users'
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
                setUserResults(responseData)
                
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    useEffect(()=> {
        fetchUserList()
        fetchReviews()

    }, [])
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Admin Dashboard
            </h1>
            <p>Modify site activity below</p>
            <Card>
            <Accordion collapseAll>
                <Accordion.Panel>
                    <Accordion.Title>
                        Users
                    </Accordion.Title>
                    <Accordion.Content>
                    <div className='results' id='results'>
                    {userResults.map((result, index) => (
                        <div key={index} className="mb-5 max-w-lg">
                            
                            <AdminDisableUser userDataForAdmin={result}/>
                        </div>
                    ))}        
                    </div>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>
                        Reviews
                    </Accordion.Title>
                    <Accordion.Content>
                    <div className='results' id='results'>
                    {reviewResults.map((result, index) => (
                        <div key={index} className="mb-5 max-w-lg">  
                            <AdminReviewControl reviewData={result}/>
                        </div>
                    ))} 
                          
                    </div>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
            </Card>
      </div>
      <div className="hero__image-container mt-1">
                <div className="hero__image">
                    <Image src="/subzero.png" alt="hero"
                        fill className="object-contain mt-10"
                    />
                </div>
            </div>
    </div>
  )
}

export default AdminDashboard