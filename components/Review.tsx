"use client";
import { Card, Rating } from 'flowbite-react'
import React from 'react'
import { ReviewProps } from "@/types";


const Review = ({reviewData}: ReviewProps) => {
  return (
    <Card>
        {/* Display Rating Stars */}
      <Rating size="md">
        {[...Array(5)].map((_, index) => (
          <Rating.Star
            key={index}
            filled={index < reviewData.selectedStars}
          />
        ))}
      </Rating>

      {/* Display Comment */}
      {reviewData.comment && (
        <p className="text-gray-600 mb-2">
            {reviewData.comment}
        </p>
      )}

      {/* Display Author's Name */}
      <p className="text-sm">Author: {reviewData.author}</p>
       
    </Card>
  )
}

export default Review