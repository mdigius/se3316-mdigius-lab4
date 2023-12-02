"use client";
import { UserDataForAdminProps } from '@/types';
import { Alert, Card, ToggleSwitch } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import { HiInformationCircle } from 'react-icons/hi';

const AdminDisableUser = ({userDataForAdmin}: UserDataForAdminProps) => {
    const [switch1, setSwitch1] = useState(userDataForAdmin.disabled);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColour, setAlertColour] = useState('failure');

    useEffect(() => {
        modifyDisabled(switch1);
    }, [switch1]);

    async function modifyDisabled(switchValue: boolean) {
        const url = 'http://localhost:5002/api/admin/users';

        const data = {
            username: userDataForAdmin.username,
            disabled: switchValue
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
            if(switchValue){
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
                <ToggleSwitch
                    checked={switch1}
                    label="Disabled?"
                    onChange={(newSwitchValue) => {
                        setSwitch1(newSwitchValue);
                    }}
                />
            </div>
            {showAlert && <Alert color={alertColour} icon={HiInformationCircle}>{alertMessage}</Alert>}
        </Card>
    );
}

export default AdminDisableUser;
