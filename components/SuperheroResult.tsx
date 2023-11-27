"use client";

import { Card, Button, Label } from "flowbite-react";
import React, { useEffect, useState } from 'react';

interface SuperheroData {
  id: number;
  name: string;
  Gender: string;
  "Eye color": string;
  Race: string;
  "Hair color": string;
  Height: number;
  Publisher: string;
  "Skin color": string;
  Alignment: string;
  Weight: number;
}

const SuperheroResult = () => {
  const [superheroData, setSuperheroData] = useState<SuperheroData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/superheroInfo/15"); // Update with your actual API endpoint
        const data: SuperheroData = await response.json();
        setSuperheroData(data);
      } catch (error) {
        console.error("Error fetching superhero data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-5 mb-5">
      {superheroData && (
        <Card>
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {superheroData.name}
            </h5>
            <p>ID: {superheroData.id}</p>
            <p>Gender: {superheroData.Gender}</p>
            <p>Eye color: {superheroData["Eye color"]}</p>
            <p>Race: {superheroData.Race}</p>
            <p>Hair color: {superheroData["Hair color"]}</p>
            <p>Height: {superheroData.Height}</p>
            <p>Publisher: {superheroData.Publisher}</p>
            <p>Skin color: {superheroData["Skin color"]}</p>
            <p>Alignment: {superheroData.Alignment}</p>
            <p>Weight: {superheroData.Weight}</p>
          </div>
          <Button outline gradientDuoTone="purpleToBlue">View Powers!</Button>
          <Button outline gradientDuoTone="tealToLime">Search on DuckDuckGo!</Button>
        </Card>
      )}
    </div>
  );
};

export default SuperheroResult;
