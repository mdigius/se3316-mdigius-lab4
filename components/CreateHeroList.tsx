"use client";
import { Alert, Button, Label, TextInput, ToggleSwitch } from 'flowbite-react';
import React, { useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi';

const CreateHeroList = () => {
  const [listName, setListName] = useState('');
  const [heroIDs, setHeroIDs] = useState('');
  const [switch1, setSwitch1] = useState(false);
  const [showAlert, setShowAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(''); 
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // URL to connect to api
    const url = 'http://localhost:5002/api/secure/';
    // Creates json body object to be passed in post request
    const data = {
        listName: listName,
        public: switch1,
        heroIDs: heroIDs

    };


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
                        onChange={(e) => setHeroIDs(e.target.value)}
                      />
                  </div>
                  
                  <div className="mb-2 block">
                     <Label value="Hero ID's" />
                     <TextInput
                        id="heroIDs"
                        placeholder="Example: 240, 55, 76"
                        required
                        shadow
                        onChange={(e) => setListName(e.target.value)}
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