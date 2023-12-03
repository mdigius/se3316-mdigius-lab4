"use client";
import { UserDataForAdminProps } from '@/types';
import { Alert, Button, Card, ToggleSwitch } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import { HiInformationCircle } from 'react-icons/hi';

const AdminDisableUser = ({userDataForAdmin}: UserDataForAdminProps) => {
    const [switch1, setSwitch1] = useState(userDataForAdmin.disabled);
    const [switch2, setSwitch2] = useState(userDataForAdmin.admin);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColour, setAlertColour] = useState('failure');

    

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault
        const url = 'http://localhost:5002/api/admin/users';

        const data = {
            username: userDataForAdmin.username,
            disabled: switch1,
            admin: switch2
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
            if(switch1){
                setAlertColour('failure');
                setAlertMessage('User is now disabled!');
                setShowAlert(true);
            } else {
                setAlertColour('success');
                setAlertMessage('User is no longer disabled!');
                setShowAlert(true);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <Card>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {userDataForAdmin.username}
            </h5>
            <div className="flex max-w-md flex-col gap-4">
            <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={handleSubmit}>
            <ToggleSwitch
                    checked={switch1}
                    label="Disabled?"
                    onChange={setSwitch1}
                />
            <ToggleSwitch
                    checked={switch2}
                    disabled={userDataForAdmin.admin}
                    label="Admin user?"
                    onChange={setSwitch2}
                />
            <Button className="mt-5 transition-transform transform hover:scale-105" gradientDuoTone="redToYellow" type="submit">Submit</Button>
                

            </form>
            {showAlert && <Alert color={alertColour} icon={HiInformationCircle}>{alertMessage}</Alert>}
                
            </div>
            
        </Card>
    );
}

export default AdminDisableUser;
