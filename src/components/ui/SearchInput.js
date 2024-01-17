"use client";
import { useRouter } from "next/navigation";
import React from "react";

const SearchInput = () => {
  const router = useRouter();
  const handleQuery = (e) => {
    fetch(`http://localhost:5000/recipes?title=${e?.target?.value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push(`?title=${e?.target?.value}`)
      });
  };
  return (
    <div className="my-5">
      <input
        onChange={handleQuery}
        type="text"
        placeholder="search recipe title"
        className="input input-bordered input-accent lg:w-[500px]  mb-5"
      />
    </div>
  );
};

export default SearchInput;
