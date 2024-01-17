import RecipeCart from "@/components/ui/RecipeCart";
import SearchInput from "@/components/ui/SearchInput";

export default async function Home({ searchParams }) {
  const recipes = await fetch(`http://localhost:5000/recipes?title=${searchParams.title}`, {
    cache: "no-store",
  });
  const data = await recipes.json();
  console.log(data.length);
  return (
    <main className="flex relative min-h-screen flex-col items-center justify-between py-24 ">
      
      <img className="absolute lg:block hidden top-20 right-0 z-0" src="https://i.ibb.co/BfbVzX2/image-2.png" alt="" />
      <img className="absolute lg:block hidden top-64  left-0 z-0" src="https://i.ibb.co/xS17ng1/red-whole-sliced-onion-fresh-onion-isolated-white-surface-with-clipping-path-sliced-red-onion-with-p.png" alt="" />
      <SearchInput />
      <div className="grid lg:grid-cols-3 mb-96 grid-cols-1 mx-auto md:grid-cols-2 justify-center items-center gap-7">
        {
        data.length>0?
        data?.map((recipe, index) => {
          return <RecipeCart recipe={recipe} />;
        }):
        <>
        <p></p>
        <p className="w-56 mx-auto text-3xl">Recipe Not Found</p>
        </>
        }
      </div>
    </main>
  );
}
