"use client";
import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ListResult from './ListResult';
import Cookies from 'js-cookie';
import PersonalListResult from './PersonalListResult';
import { useRouter } from 'next/navigation';
const PersonalLists = () => {
  const router = useRouter()
    useEffect(()=>{
      if(Cookies.get('loggedin') != 'true'){
        router.push('/register')

    }
        const userQuery = Cookies.get("username")
       
        if(userQuery==undefined){
                setUsername('')
                
          } else {
            
            setUsername(userQuery)
            fetchPersonalLists(userQuery)
            
          }
      }, [])
  const [listResults, setListResults] = useState([]);
  const [username, setUsername] = useState('')
  async function fetchPersonalLists(user: string){
    var url = `http://localhost:5002/api/secure/${user}/lists`
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
          // If succesful authentication, reroute to account page
          setListResults(responseData)
      })
      .catch(error => {
          setListResults([])
          console.error('Error:', error);
      });
  }
  
  return (
    
    <div className="hero">
        {username!='' && 
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                {username}'s Lists
            </h1>
            <h2>
              Create a new list or modify an existing one below!
            </h2>
            <Button className="transition-transform transform hover:scale-105 max-w-sm mt-10" 
            gradientDuoTone="purpleToPink" href='/lists/create'>
              Create List!
            </Button>
            <Button className="transition-transform transform hover:scale-105 max-w-sm mt-10" 
            gradientDuoTone="purpleToPink" href='/lists/public'>
              View Public Lists!
            </Button>
            
            {username!='' && listResults.map((result, index) => (
                    <div key={index} className="transition-transform transform hover:scale-105">
                        <PersonalListResult listData={result}/>
                    </div>
                ))} 
          </div>
                 
         
            }
    </div>
  )
}

export default PersonalLists