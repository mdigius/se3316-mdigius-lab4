"use client";
import { Button, Checkbox, Label, Alert, TextInput } from "flowbite-react";
import React, { useState } from 'react';
import Image from 'next/image';
import { HiInformationCircle } from 'react-icons/hi';
import CustomButton from './CustomButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

const Authenticate = () => {
    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
    const [alertMessage, setAlertMessage] = useState(''); // State to manage alert message

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        // URL to connect to api
        const url = 'http://localhost:5001/api/secure/';
        // Creates json body object to be passed in post request params
        const data = {
            username: username,
            password: password
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
                console.log('POST successful:', responseData);
                // If succesful authentication, reroute to account page
                router.push('/')
            })
            .catch(error => {
                console.error('Error:', error);
                // Set an alert if authentication failed
                setAlertMessage(`Error! Incorrect username or password.`);
                setShowAlert(true);
            });


        
    }

    return (
        <div className="hero">
            <div className="flex-1 pt-36 padding-x">
                <h1 className="hero__title">
                    Login
                </h1>
                <p>
                    Please login with the username and password you registered with.
                </p>
                <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="username" value="Username" />
                        </div>
                        <TextInput
                            id="username2"
                            type="username"
                            placeholder="Enter username"
                            required
                            shadow
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password2" value="Password" />
                        </div>
                        <TextInput
                            id="password2"
                            type="password"
                            placeholder="Enter password"
                            required
                            shadow
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit">Login</Button>
                    {/* Conditionally render the Alert component */}
                    {showAlert && <Alert color="failure" icon={HiInformationCircle}>{alertMessage}</Alert>}
                </form>
            </div>
            <div className="hero__image-container">
                <div className="hero__image">
                    <Image src="/deadpool.png" alt="hero"
                        fill className="object-contain"
                    />
                </div>
            </div>
        </div>
    )
}

export default Authenticate;

