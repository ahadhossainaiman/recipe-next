import React from "react";
import { MdOutlinePerson2 } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import RecipeCart from "@/components/ui/RecipeCart";

const RecipePage = async ({ params }) => {
  console.log(params);
  const singleRecipe = await fetch(
    `http://localhost:5000/recipes/${params.id}`,{
      cache:'no-store'
    }
  );
  const data = await singleRecipe.json();
  console.log(data);
  const recipes = await fetch(`http://localhost:5000/recipes`, {
    cache: "no-store",
  });
  const recipesItems = await recipes.json();
  return (
    <div className="lg:mx-20">
      <div className="mt-28">
        <p className="my-2 text-xl">{`Home > Recipe > ${data.title}`}</p>
        <h1 className="text-3xl">{data.title}</h1>
        <div className="flex items-center gap-2 my-2">
          <MdOutlinePerson2 />
          <span>Ahad Hossain Aiman</span>
          <FaRegComment />
          <span>{`${Math.floor(Math.random() * 90) + 10}`}</span>
        </div>
        <hr className="my-3" />
        <div className="grid lg:grid-cols-6 gap-5 lg:mx-5">
          <div className="col-span-4 w-[90%]">
            <img className="rounded-xl mb-4 lg:w-full w-[95%] mx-5" src={data.recipeURL} alt="" />
            <p className="text-xl w-[95%]">
              This recipe features a vibrant and refreshing salad made with a
              medliey of mixed greens,accompanied by a flavorful sun-dried
              tomato dressing
            </p>
            <h1 className="text-3xl">Ingredients:</h1>
            <ul>
              {data?.ingredients.map((item) => {
                return (
                  <li className="flex gap-2 items-center">
                    <FaLongArrowAltRight />
                    {item?.value}
                  </li>
                );
              })}
            </ul>
            <div className="my-5">
              <h1 className="text-3xl">Instruction:</h1>
              <p className="text-wrap text-justify lg:text-xl w-[95%]">{data?.instruction}</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-gray-200 p-2 rounded-sm">
              <h1 className="text-xl">Nutrition Facts</h1>
              <div className="flex p-1 justify-between border-b-[1px] border-gray-500">
                <p>Calories</p>
                <p>494</p>
              </div>
              <div className="flex p-1 justify-between border-b-[1px] border-gray-500">
                <p>Carbs</p>
                <p>80g</p>
              </div>
              <div className="flex p-1 justify-between border-b-[1px] border-gray-500">
                <p>Fat</p>
                <p>18</p>
              </div>
              <div className="flex p-1 justify-between border-b-[1px] border-gray-500">
                <p>Protein</p>
                <p>24g</p>
              </div>
              <div className="flex p-1 justify-between border-b-[1px] border-gray-500">
                <p>Net Carbs</p>
                <p>46</p>
              </div>
              <div className="flex p-1 justify-between">
                <p>Sodium</p>
                <p>494mg</p>
              </div>
            </div>
            <div className="flex items-center flex-col">
                <h1 className="text-3xl mt-3">Most Famous :</h1>
                <div className="my-5">
              {recipesItems?.slice(0,4)?.map((recipe, index) => {
                return <div className="my-5"><RecipeCart recipe={recipe} /></div>;
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
