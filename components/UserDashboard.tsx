"use client";
import { Alert, Button, Label, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

const UserDashboard = () => {
  const router = useRouter()

  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const [alertMessage, setAlertMessage] = useState(''); // State to manage alert message
  async function handleSubmit(event: React.FormEvent){

  }
  async function handleLogout(){
    Cookies.set('username', '')
    Cookies.set('loggedin', 'false')

  }
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Account Settings
            </h1>
            <p>Modify account details below</p>

            <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={handleSubmit}>
                  <div className="mb-2 block">
                     <Label value="Current Password:" />
                     <TextInput
                        id="listname"
                        placeholder="Enter Current Password"
                        required
                        shadow
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                  </div>
                  
                  <div className="mb-2 block">
                     <Label value="New Password:" />
                     <TextInput
                        id="newPassword"
                        placeholder="Enter New Password"
                        required
                        shadow
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  
                  <Button className="mt-5 transition-transform transform hover:scale-105" outline gradientDuoTone="redToYellow" type="submit">Change Password</Button>
                  
                    {/* Conditionally render the Alert component */}
                    {showAlert && <Alert color="failure" icon={HiInformationCircle}>{alertMessage}</Alert>}
            </form>
            
            <Button href='/authenticate' onClick={handleLogout} className="mt-10 transition-transform transform hover:scale-105 max-w-md" gradientDuoTone="tealToLime" type="submit">
              Logout</Button>
            
      </div>
    </div>
  )
}

export default UserDashboard