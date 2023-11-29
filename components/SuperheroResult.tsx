"use client";

import { SuperheroResultProps } from "@/types";
import { Card, Button, Label } from "flowbite-react";
import React, {useEffect, useState } from 'react';



const SuperheroResult = ({superheroData}: SuperheroResultProps) => {
  
    

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
