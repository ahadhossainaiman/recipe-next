'use client'
import React from "react";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation'
const RecipeCart = ({recipe}) => {
    // console.log(recipe);
    const {title,instruction,recipeURL} = recipe;
    const router = useRouter()

    const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/recipes/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
               router.push("/")
              }
            });
        }
      });
    };

  return (
    <div className="w-96 rounded-lg border-[1px] z-10 border-green-300 bg-white">
      <div className="m-2">
        <img
          className="rounded-lg w-[400px] h-[300px]"
          src={recipeURL || "https://i.ibb.co/M9XVbSR/recipe.jpg"}
          alt=""
        />
      </div>
      <div className="mx-4 flex justify-between my-3">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M10.7902 8.54675C10.6175 8.71408 10.5382 8.95608 10.5775 9.19341L11.1702 12.4734C11.2202 12.7514 11.1029 13.0327 10.8702 13.1934C10.6422 13.3601 10.3389 13.3801 10.0902 13.2467L7.13753 11.7067C7.03486 11.6521 6.92086 11.6227 6.8042 11.6194H6.62353C6.56086 11.6287 6.49953 11.6487 6.44353 11.6794L3.4902 13.2267C3.3442 13.3001 3.17886 13.3261 3.01686 13.3001C2.6222 13.2254 2.35886 12.8494 2.42353 12.4527L3.01686 9.17275C3.0562 8.93341 2.97686 8.69008 2.8042 8.52008L0.396863 6.18675C0.19553 5.99141 0.12553 5.69808 0.21753 5.43341C0.306863 5.16941 0.534863 4.97675 0.810196 4.93341L4.12353 4.45275C4.37553 4.42675 4.59686 4.27341 4.7102 4.04675L6.1702 1.05341C6.20486 0.986748 6.24953 0.925415 6.30353 0.873415L6.36353 0.826748C6.39486 0.792081 6.43086 0.763415 6.47086 0.740081L6.54353 0.713415L6.65686 0.666748H6.93753C7.1882 0.692748 7.40886 0.842748 7.5242 1.06675L9.00353 4.04675C9.1102 4.26475 9.31753 4.41608 9.55686 4.45275L12.8702 4.93341C13.1502 4.97341 13.3842 5.16675 13.4769 5.43341C13.5642 5.70075 13.4889 5.99408 13.2835 6.18675L10.7902 8.54675Z"
              fill="#FDC040"
            />
          </svg>
          <span className="text-xl text-gray-500">4.5</span>
        </div>
       
      </div>
      <div className="flex items-center gap-5 my-4 mx-4 ">
            <Link href={`/recipes/${recipe._id}`}><GrView  className="text-2xl " /></Link>
            <Link href={`/editrecipe/${recipe._id}`}><FaEdit className="text-2xl" /></Link>
           <span  onClick={()=>handleDelete(recipe._id)}> <RiDeleteBin5Line className="text-2xl text-red-600"/></span>
      </div>
    </div>
  );
};

export default RecipeCart;
