import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
        });
    }

    render() {
        let form = (<form>
            <Input inputtype="input" type="text" name="name" placeholder="Name"></Input>
            <Input inputtype="input" type="email" name="email" placeholder="Email"></Input>
            <Input inputtype="input" type="text" name="street" placeholder="Street"></Input>
            <Input inputtype="input" type="text" name="postcode" placeholder="Postcode"></Input>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;