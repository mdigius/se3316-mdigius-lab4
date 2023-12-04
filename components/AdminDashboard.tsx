"use client"
import { Accordion, Alert, Button, Card, Label, TextInput, ToggleSwitch } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { AdminDisableUser, AdminReviewControl } from '.'
import { HiInformationCircle } from 'react-icons/hi';
import {useRouter} from 'next/navigation'
import Cookies from 'js-cookie'
const AdminDashboard = () => {
    const router = useRouter()
    const [reviewResults, setReviewResults] = useState([])
    const [userResults, setUserResults] = useState([]);
    const [privacy, setPrivacy] = useState('')
    const [dmca, setDMCA] = useState('')
    const [au, setAu] = useState('')
    const [disputeTitle, setDisputeTitle] = useState('')
    const [disputeMessage, setDisputeMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColour, setAlertColour] = useState('failure');
    const [showAlert2, setShowAlert2] = useState(false);
    const [alertMessage2, setAlertMessage2] = useState('');
    const [alertColour2, setAlertColour2] = useState('failure');
    async function handleSubmitDispute(event: React.FormEvent){
        event.preventDefault()
        var url = `http://localhost:5002/api/admin/disputes/`

        const data = {
            disputeTitle: disputeTitle,
            disputeMessage: disputeMessage
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
                console.log(responseData);
                setAlertColour('success');
                setAlertMessage('Dispute Submitted!');
                setShowAlert(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }
    async function handleSubmit(event: React.FormEvent){
        event.preventDefault()
        var url = `http://localhost:5002/api/admin/privacy/`

        const data = {
            privacyData: privacy,
            dmcaData: dmca,
            auData: au
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
                console.log(responseData);
                setAlertColour2('success');
                setAlertMessage2('Policies Updated!');
                setShowAlert2(true);
                
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }
    async function fetchPolicies(){
        
        var url = `http://localhost:5002/api/privacy/`
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
                
                setPrivacy(responseData[0].policyData)
                setDMCA(responseData[1].policyData)
                setAu(responseData[2].policyData)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }
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
        if(Cookies.get('admin') != 'true'){
            router.push('/register')

        }
        fetchUserList()
        fetchReviews()
        fetchPolicies()
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
                <Accordion.Panel>
                    <Accordion.Title>
                        DMCA Workflow Guide
                    </Accordion.Title>
                    <Accordion.Content>
                    <p>
                    DMCA Takedown Procedure and Tools
                    Document to Describe Workflow and Usage of Tools
                    Workflow Document: Use the step below to submit a takedown request

                    Tools to Log Requests, Notices, and Disputes
                    Log Mechanisms:

                    HeroHub maintains logs for takedown requests, infringement notices, and dispute claims.
                    Logs include date, review details, and actions taken.
                    Tools to Disable Display of Reviews with Alleged Copyright Violations
                    Disable Display Tools:

                    HeroHub has tools to promptly disable the display of reviews with alleged copyright violations upon verification.
                    Tools to Restore Contested Content
                    Restore Tools:

                    HeroHub provides tools to restore contested content after successful resolution of disputes.
                    </p>
                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
                    <Accordion.Title>
                        Privacy
                    </Accordion.Title>
                    <Accordion.Content>
                    <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={handleSubmit}>
                  <div className="mb-2 block">
                     <Label value="Privacy/Security" />
                     <TextInput
                        
                        value={privacy}
                        required
                        shadow
                        onChange={(e) => setPrivacy(e.target.value)}
                      />
                  </div>
                  <div className="mb-2 block">
                     <Label value="Description (Optional)" />
                     <TextInput
                        value={dmca}
                        shadow
                        onChange={(e) => setDMCA(e.target.value)}
                      />
                  </div>
                  
                  <div className="mb-2 block">
                     <Label value="Hero ID's (Comma seperated)" />
                     <TextInput
                        value={au}
                        required
                        shadow
                        onChange={(e) => setAu(e.target.value)}
                      />
                    </div>
                  <Button className="mt-5 transition-transform transform hover:scale-105" gradientDuoTone="redToYellow" type="submit">Submit</Button>
                  {showAlert2 && <Alert color={alertColour2} icon={HiInformationCircle}>{alertMessage2}</Alert>}
                   
            </form>
                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
                    <Accordion.Title>
                        Submit Dispute
                    </Accordion.Title>
                    <Accordion.Content>
                    <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={handleSubmitDispute}>
                  <div className="mb-2 block">
                     <Label value="Dispute Title" />
                     <TextInput
                        required
                        placeholder='Enter title'
                        shadow
                        onChange={(e) => setDisputeTitle(e.target.value)}
                      />
                  </div>
                  <div className="mb-2 block">
                     <Label value="Dispute Message" />
                     <TextInput
                        shadow
                        placeholder='Enter more info'
                        required
                        onChange={(e) => setDisputeMessage(e.target.value)}
                      />
                  </div>
                  
                  <Button className="mt-5 transition-transform transform hover:scale-105" gradientDuoTone="redToYellow" type="submit">Submit Dispute</Button>
                  {showAlert && <Alert color={alertColour} icon={HiInformationCircle}>{alertMessage}</Alert>}
                   
            </form>
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