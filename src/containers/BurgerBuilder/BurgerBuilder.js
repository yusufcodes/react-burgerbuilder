import React, { Component } from 'react';

/* Components */
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

/* Utils */
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

/* BurgerBuilder: Main component handling the burger building side of the application. */
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    // Fetching the ingredients from firebase DB (URL preset in axios defaults)
    componentDidMount() {
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(() => {
            this.setState({error:true});
        });
    }

    // updatePurchasedState: Determines if burger can be bought yet based on current price
    updatePurchasedState(newIngredients) {
        const sum = Object.values(newIngredients)
        .reduce((accumulator, currentValue) => 
        { return accumulator + currentValue }, 0);
        this.setState({purchasable: sum > 0});
    }

    // addIngredientHandler: Handles addition of an ingredient to the burger, updating price and state accordingly
    addIngredientHandler = (type) => {
        // Adding to the number of ingredients
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type] = newCount;

        // Adding to the price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // Updating the state
        this.setState({
            totalPrice: newPrice,
            ingredients: newIngredients
        });

        // Updating the purchasing state based on new ingredients
        this.updatePurchasedState(newIngredients);
    }

    // removeIngredientHandler: Inverse of addIngredient method 
    removeIngredientHandler = (type) => {
        // Adding to the number of ingredients

        const oldCount = this.state.ingredients[type];
        if(!oldCount <= 0)
        {
            const newCount = oldCount - 1;
            const newIngredients = {
                ...this.state.ingredients
            };
            newIngredients[type] = newCount;

            // Removing from the price
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;

            // Updating the state
            this.setState({
                totalPrice: newPrice,
                ingredients: newIngredients
            });
            this.updatePurchasedState(newIngredients);
        }
    }

    // purchaseHandler / purchaseCancelHandler: true/false setting of 'purchasing' determining if customer is buying a burger
    purchaseHandler = () => this.setState({purchasing: true});
    purchaseCancelHandler = () => this.setState({purchasing: false});

    /* purchaseContinueHandler: When the customer clicks continue, a loading icon is displayed based on loading state,
    and then the order details are built into a JS object and sent to DB via a post request */
    purchaseContinueHandler = () => {
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Yusuf',
                address: {
                    street: 'Test Street',
                    zipCode: 2343,
                    country: 'UK'
                },
                email: 'email@email.com'
            },
            deliveryMethod: 'Fast'
        };

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.setState({purchasing: false});
        })
        .catch(error => {
            this.setState({loading: false});
            this.setState({purchasing: false});
        });
    }

    render() {
        // Boolean values dictating if particular button should be enabled/disabled
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        // Initial setting of OrderSummary to nothing / loader until ingredients loaded later
        let orderSummary = null;
        if (this.state.loading)
        {
            orderSummary = <Spinner />
        }

        // Spinner set to main burger building section until ingredients are loaded in
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />

        // Loading of main burger building and order summary sections once the ingredients have loaded
        if (this.state.ingredients) {
            burger =
            <React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                totalPrice={this.state.totalPrice}
                ordered={this.purchaseHandler}
                purchasable={this.state.purchasable}
                />
            </React.Fragment>

            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            orderTotal={this.state.totalPrice}/>;
        }

        return (
            <React.Fragment>
                <Modal
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            
            </React.Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);