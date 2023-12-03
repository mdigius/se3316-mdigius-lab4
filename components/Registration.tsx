"use client";
import { Button, Checkbox, Label, Alert, TextInput } from "flowbite-react";
import React, { useState } from 'react';
import Image from 'next/image';
import { HiInformationCircle } from 'react-icons/hi';
import Link from "next/link";
import { useRouter } from 'next/navigation'

const Registration = () => {
    const router = useRouter()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(''); 

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        // URL to connect to api
        const url = 'http://localhost:5002/api/secure/';
        // Creates json body object to be passed in post request
        const data = {
            username: username,
            email: email,
            password: password
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
                router.push('/authenticate')
            })
            .catch(error => {
                console.error('Error:', error);
                setAlertMessage(`Error! Username or email already taken.`);
                setShowAlert(true);
            });
    }

    return (
        <div className="hero">
            <div className="flex-1 pt-36 padding-x">
                <h1 className="hero__title">
                    Register!
                </h1>
                <p>
                    Please enter a username, email, and password below to register for our website.
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
                            <Label htmlFor="email2" value="Email" />
                        </div>
                        <TextInput
                            id="email2"
                            type="email"
                            placeholder="example@example.com"
                            required
                            shadow
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <Button className="transition-transform transform hover:scale-105" gradientDuoTone="purpleToBlue" type="submit">Register new account</Button>
                    {/* Conditionally render the Alert component */}
                    {showAlert && <Alert color="failure" icon={HiInformationCircle}>{alertMessage}</Alert>}
                </form>
                
            </div>
            <div className="hero__image-container">
                <div className="hero__image">
                    <Image src="/ironman.png" alt="hero"
                        fill className="object-contain"
                    />
                </div>
            </div>
        </div>
    )
}

export default Registration;

