import Image from "next/image";
import React from "react";

const Rating = ({ rating }) => {
  const ratings = new Array(rating).fill(0);
  return (
    <>
      {ratings.map((_, index) => (
        <Image src={`/assets/images/rating.svg`} height={20} width={20} />
      ))}
    </>
  );
};

export default Rating;
