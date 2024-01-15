
import RecipeCart from '@/components/ui/RecipeCart'

export default async function  Home () {
      const recipes = await fetch(`http://localhost:5000/recipes`)
      const data = await recipes.json();
      // console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
   <div className='grid grid-cols-3 justify-center items-center gap-7'>
        {
          data?.map((recipe,index)=>{
            return  <RecipeCart recipe={recipe}/>
          })
        }
      </div>
    </main>
  )
}
