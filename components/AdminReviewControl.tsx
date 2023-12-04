"use client";
import { ReviewProps } from '@/types'
import { Alert, Button, Card, ToggleSwitch } from 'flowbite-react'
import { HiInformationCircle } from 'react-icons/hi';
import React, { useState } from 'react'
import { Review } from '.'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const AdminReviewControl = ({reviewData}: ReviewProps) => {
  const [switch1, setSwitch1] = useState(reviewData.hidden);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColour, setAlertColour] = useState('failure');

  async function handleSubmit(event: React.FormEvent){
    event.preventDefault()
    const url = `${apiUrl}/admin/reviews`;

        const data = {
            author: reviewData.author,
            listName: reviewData.listName,
            hidden: switch1
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
                setAlertMessage('Comment is now hidden!');
                setShowAlert(true);
            } else {
                setAlertColour('success');
                setAlertMessage('Comment is no longer hidden!');
                setShowAlert(true);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
  }
  return (
    <Card>
      <Review reviewData={reviewData}></Review>
      <form className="flex max-w-md flex-col gap-4 mt-10" onSubmit={handleSubmit}>
            <ToggleSwitch
                    checked={switch1}
                    label="Disabled?"
                    onChange={setSwitch1}
                />
            <Button className="mt-5 transition-transform transform hover:scale-105" gradientDuoTone="redToYellow" type="submit">Submit</Button>
                

            </form>
            {showAlert && <Alert color={alertColour} icon={HiInformationCircle}>{alertMessage}</Alert>}

    </Card>
  )
}

export default AdminReviewControl