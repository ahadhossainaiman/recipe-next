"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import ingredients from '../../../../ingredients.json';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const EditRecipePage = ({params}) => {
  const router = useRouter();
  
    const [singleRecipe,setSingleRecipe] = useState({})
    useEffect(()=>{
        fetch(`https://recipe-next-server.vercel.app/recipes/${params.id}`)
        .then(res=>res.json())
        .then((data)=>setSingleRecipe(data))
    },[])

    
    const {
      register,
      handleSubmit,
      watch,
      control,
      reset,
      formState: { errors },
    } = useForm();
 
    const onSubmit = (data) => {
  
          fetch(`https://recipe-next-server.vercel.app/recipes/${params.id}`,{
              method:'PUT',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({...data,ingredients:singleRecipe?.ingredients})
            })
            .then(res=>res.json())
            .then((data)=>{
              console.log(data);
              if(data.modifiedCount>0){
                  toast.success("Recipe Create Successfully !", {
                      position:  "top-center"
                    })
                
                    router.push(`/recipes/${params.id}`)
                    reset();
              }
            })
  
    };
    return (
        <div data-theme="light">
        {/* <Toaster position="top-right" /> */}
        <header className="hero min-h-screen bg-base-200 bg-[url('https://media.gettyimages.com/id/1363638825/photo/vegan-plant-based-asian-food-recipes-with-rice-and-brown-rice-as.jpg?s=2048x2048&w=gi&k=20&c=D35HS8P0YsEwY6NyrlBs8txwUOviLcRBO6PhWqEpW9s=')]">
          <div className="min-w-[50%]">
            <form
              style={{ backdropFilter: "saturate(180%) blur(5px)" }}
              className="card-body shadow-2xl p-6 md:mt-16 rounded-2xl border border-black min-w-[70%]"
              
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className=" text-5xl flex justify-center my-2 text-white">
                Update Recipe
              </h1>
              <div className="flex gap-2 flex-1">
                <div className="form-control w-full">
                  <input
                    type="text"
                    placeholder="Recipe Title"
                    defaultValue={singleRecipe?.title}
                    {...register("title", { required: true })}
                    className="input input-bordered w-full"
                  />
                  {errors.title && (
                    <span className="text-white">Recipe Title is Required</span>
                  )}
                </div>
                </div>
                <div className="form-control">
                  <Select
                    value={singleRecipe?.ingredients}
                    isMulti
                    name="colors"
                    onChange={(option)=>{
                      setSingleRecipe({...singleRecipe,ingredients:option})
                    }}
                    options={ingredients}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                  {errors.email && (
                    <span className="text-white">Email is required</span>
                  )}
                </div>
              <div className="flex gap-2">
                <div className="form-control w-full">
                  <textarea
                    type="text"
                    placeholder="Instruction"
                    defaultValue={singleRecipe?.instruction}
                    {...register("instruction", {
                      required: true,
                    })}
                    className="input input-bordered"
                  />
                  {errors.instruction && (
                    <p className="text-white">Instruction is required</p>
                  )}
                </div>
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Recipe URL"
                  defaultValue={singleRecipe?.recipeURL}
                  {...register("recipeURL", { required: true })}
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-white">Recipe URL is required</span>
                )}
              </div>
              <div className="form-control bg-green-400 mt-6">
                <button>
                  {" "}
                  <input type="submit" value="Resubmit Recipe" />
                </button>
              </div>
            </form>
          </div>
        </header>
      </div>
    );
};

export default EditRecipePage;