import React, { Component } from 'react';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div>
                <h4>Enter your Contact Data</h4>
                <form>
                    
                </form>
            </div>
        )
    }
}

export default ContactData;