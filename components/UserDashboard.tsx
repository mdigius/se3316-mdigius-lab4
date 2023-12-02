"use client";
import Image from 'next/image';
import { Alert, Button, Label, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

const UserDashboard = () => {
  const router = useRouter()
  const username = Cookies.get('username')
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const [alertMessage, setAlertMessage] = useState(''); // State to manage alert message
  const [alertColour, setAlertColour] = useState('failure')
  
  async function handleLogout(){
    Cookies.set('username', '')
    Cookies.set('loggedin', 'false')
  }
  async function changePassword(event: React.FormEvent){
    event.preventDefault()
    const url = `http://localhost:5002/api/secure/${username}/modify`
    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword
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
          setAlertMessage(`Successfully updated password!`);
          setAlertColour('success')
          setShowAlert(true);
          
          
      })
      .catch(error => {
          console.error('Error:', error);
          setAlertMessage(`Incorrect password!`);
          setAlertColour('failure')
          setShowAlert(true);
      });


  }
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Account Settings
            </h1>
            <p>Modify account details below</p>

            <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={changePassword}>
                  <div className="mb-2 block">
                     <Label value="Current Password:" />
                     <TextInput
                        id="currentPswd"
                        placeholder="Enter Current Password"
                        type="password"
                        required
                        shadow
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                  </div>
                  
                  <div className="mb-2 block">
                     <Label value="New Password:" />
                     <TextInput
                        id="newPswd"
                        placeholder="Enter New Password"
                        type="password"
                        required
                        shadow
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    {/* Conditionally render the Alert component */}
                    {showAlert && <Alert color={alertColour} icon={HiInformationCircle}>{alertMessage}</Alert>}
                  
                  <Button className="mt-5 transition-transform transform hover:scale-105" gradientMonochrome="success" type="submit">Change Password</Button>
                  
                    
            </form>
            
            <Button href='/authenticate' onClick={handleLogout} className="mt-10 transition-transform transform hover:scale-105 max-w-md" gradientMonochrome="failure" type="submit">
              Logout</Button>
            
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
export default UserDashboard