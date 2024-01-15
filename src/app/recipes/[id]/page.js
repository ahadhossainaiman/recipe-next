import React from 'react';

const RecipePage = async ({params}) => {
    console.log(params);
    const singleRecipe = await fetch(`http://localhost:5000/recipes/${params.id}`)
    const data = await singleRecipe.json();
    console.log(data);

    return (
        <div>
            <h1>Aiman</h1>
        </div>
    );
};

export default RecipePage;