import React, { Component } from 'react';
import Signup from '../Signup';
import Auth from '../../Auth/Auth';
import './products.css';

const auth = new Auth();


class Products extends Component {
    
    state = {
        products: []
    };

    // displays mysql data 
    componentDidMount() {
        const { isAuthenticated, userProfile, getProfile } = auth;
        if (!isAuthenticated()) {
            alert("Oops! You'll need to log in to see your products!")
        }

        if (isAuthenticated()) {
            if (!userProfile) {
                getProfile((err, profile) => {
                    this.getProducts(profile.email)
                });
            } else {
                this.getProducts(userProfile.email);

            }
        } 
    }

    getProducts = (email) => {
        console.log("getting products");
        // looks for /products in server.js
        fetch(`/products/${email}`)
            .then((res) => {
                return res.json();
            })
            .then(res => this.setState({ products: res.data }))
            .catch(err => console.error(err))
         //console.log(data);
           console.log(this.state.products);
    }


    render() {
        const { products } = this.state;
        const renderProduct = (title) =>
        <li
            key={title}>
            {title}
        </li>
        return (
            <div className="page">
                <Signup auth={this.props.auth} history={this.props.history} />
                    <div className="Products">
                    <h1>Your saved products:</h1>
                    <ul>
                        {products.map(product =>renderProduct(product.TITLE))}
                    </ul>
                    </div>
            </div>
        );
    }
}


export default Products;
