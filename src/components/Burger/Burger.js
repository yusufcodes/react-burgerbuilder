import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css'

const burger = (props) => {
    // Ingredients: Object -> Array
    // This retrieves each key so we will end up with:
    // ['salad', 'bacon', 'cheese', ...]

    /* transformedIngredients: We want a way to know how many of each ingredient in the ingredients 
    object we have. First, we start by grabbing only the keys */
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        // Map #1: Each ingredient now becomes an Array with some undefined elements.
        // We do not care about the fact that is is not defined but rather, the length of such element.
        // e.g. 'salad: 1' from props.ingredients -> Array(1), because props.ingredients[igKey] renders the value of 1.
        /* Example Output: 
        0: [undefined]
        1: (2) [undefined, undefined]
        2: [undefined] */
        return [...Array(props.ingredients[igKey])]
        // Map #2: For each undefined item in our new arrays, we create a new BurgerIngredient component
        // passing in the 'igKey' i.e. the ingredient we need. The amounts are dictated from the output of the
        // first Mapping, so all we do is loop through each array of undefined to determine how many we need.
        .map((_, index) => {
            return <BurgerIngredient key={igKey + index} type={igKey} />
        });
    })
    // Reduce: Currently we have an array of arrays, however we want to simply have one array of
    // values - this is so we can determine how many ingredients in total we have.
    // Reduce has the ability to extract the inner array elements and pop them out.
    // For each iteration, we take the current element inside the inner array and add it to the end of
    // out new 'accumulator' Array. This in turn ends up as a single one dimensional array.
    .reduce((accumulatedArray, currentEl) => {
        return accumulatedArray.concat(currentEl);
    });

    if (transformedIngredients.length === 0) 
    {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )

}

export default burger;