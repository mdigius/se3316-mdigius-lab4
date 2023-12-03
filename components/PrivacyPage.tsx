"use client";
import { Accordion, Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { AdminDisableUser, AdminReviewControl } from '.';

const PrivacyPage = () => {
    const [privacy, setPrivacy] = useState('')
    const [dmca, setDMCA] = useState('')
    const [au, setAu] = useState('')
    
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


  useEffect(() => {
    fetchPolicies()

  }, [])
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Privacy
            </h1>
            <p>View Privacy Policies</p>
            <Card className="mt-5">
            <Accordion collapseAll>
                <Accordion.Panel>
                    <Accordion.Title>
                        Security and Privacy Policy
                    </Accordion.Title>
                    <Accordion.Content>
                      <p>
                      {privacy}
                      </p>
                    
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title>
                      DMCA Notice & Takedown Policy
                    </Accordion.Title>
                    <Accordion.Content>
                      <p>
                     {dmca}
                      </p>
                    
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title>
                    Acceptable Use Policy (AUP)
                    </Accordion.Title>
                    <Accordion.Content>
                      <p>
                     {au}
                      </p>
                    
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title>
                    Contact
                    </Accordion.Title>
                    <Accordion.Content>
                      <p>
                        For any notices of infringement please email mdigius@uwo.ca
                      </p>
                    
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

export default PrivacyPage