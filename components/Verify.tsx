"use client";
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Alert, Button, Card, Label } from 'flowbite-react';
import { useRouter } from 'next/navigation'
import { HiInformationCircle } from 'react-icons/hi';

const Verify = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [showAlert, setShowAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(''); 
    const [alertColour, setAlertColour] = useState('failure')
    
    useEffect(() => {
        const userQuery = Cookies.get("username")
        if(userQuery==undefined || userQuery == ''){
            setUsername('')
        } else {
            setUsername(userQuery)
        }

    }, [])

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        // URL to connect to api
        const url = 'http://localhost:5002/api/verify';
        // Creates json body object to be passed in post request
        const data = {
            username: username
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
                setAlertMessage(`Successful Verification! You may now login.`);
                setAlertColour("success")
                setShowAlert(true);
            })
            .catch(error => {
                console.error('Error:', error);
                setAlertMessage(`User already verified!`);
                setAlertColour("failure")
                setShowAlert(true);
                
            });
    }
  return (
    <div className="hero">
        <div className="flex-1 pt-36 padding-x">
            <Card className="max-w-xl">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {'Verify Account!'}
            </h5>
                <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={handleSubmit}>
                    <div className="mb-5 block">
                        <Label value={`Verify user: ${username}`} />
                        <Button disabled={username == ''}className="transition-transform transform hover:scale-105 mt-10 mb-10" gradientDuoTone="purpleToBlue" type="submit">Verify Account</Button>
                        {/* Conditionally render the Alert component */}
                        {showAlert && <Alert color={alertColour} icon={HiInformationCircle}>{alertMessage}</Alert>}
                    </div>
                </form>
                
            </Card>
        </div>
    </div>

    
  )
}

export default Verify