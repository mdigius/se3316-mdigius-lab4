"use client";
import { Alert, Button, Label, TextInput, ToggleSwitch } from 'flowbite-react';
import React, { useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi';
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';
const CreateHeroList = () => {
  const router = useRouter();
  const username = Cookies.get("username")
  const [listName, setListName] = useState('');
  const [heroIDs, setHeroIDs] = useState('');
  const [description, setDescription] = useState('');
  const [switch1, setSwitch1] = useState(false);
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
          router.push('/lists/public')
      })
      .catch(error => {
          console.error('Error:', error);
          setAlertMessage(`Error creating list`);
          setShowAlert(true);
      });


  }
  return (
    <div className="hero">
        <div className="flex-1 pt-36 padding-x mb-10">
            <h1 className="hero__title">
                Create a list!
            </h1>
            <p>
                Create your own superhero list!
            </p>

            <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={handleSubmit}>
                  <div className="mb-2 block">
                     <Label value="List Name" />
                     <TextInput
                        id="listname"
                        placeholder="Enter List Name"
                        required
                        shadow
                        onChange={(e) => setListName(e.target.value)}
                      />
                  </div>
                  <div className="mb-2 block">
                     <Label value="Description (Optional)" />
                     <TextInput
                        id="description"
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
                        required
                        shadow
                        onChange={(e) => setHeroIDs(e.target.value)}
                      />
                    </div>
                  <div className="flex max-w-md flex-col gap-4">
                    <ToggleSwitch checked={switch1} label="Public List?" onChange={setSwitch1} />
                  </div>
                  <Button className="mt-5 transition-transform transform hover:scale-105" outline gradientDuoTone="redToYellow" type="submit">Create List</Button>
                    {/* Conditionally render the Alert component */}
                    {showAlert && <Alert color="failure" icon={HiInformationCircle}>{alertMessage}</Alert>}
            </form>
          </div>
    </div>
  )
}

export default CreateHeroList