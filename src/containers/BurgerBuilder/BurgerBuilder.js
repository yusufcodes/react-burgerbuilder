import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchasedState(newIngredients) {
        const sum = Object.values(newIngredients)
        .reduce((accumulator, currentValue) => 
        { return accumulator + currentValue }, 0);

        console.log(sum);
        this.setState({purchasable: sum > 0});
    }

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
        this.setState({
            totalPrice: newPrice,
            ingredients: newIngredients
        });

        // Passing in the most up to date version of ingredients
        this.updatePurchasedState(newIngredients);
    }

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

            // Adding to the price
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({
                totalPrice: newPrice,
                ingredients: newIngredients
            });
            this.updatePurchasedState(newIngredients);
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

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

        let orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        orderTotal={this.state.totalPrice}/>;

        if (this.state.loading)
        {
            orderSummary = <Spinner />
        }

        return (
            <React.Fragment>
                <Modal
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
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
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);