import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import './signup.css';

class Signup extends Component {
    goTo(route) {
        this.props.history.replace(`${route}`)
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <div>
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" className='btn-margin'>
                                <Glyphicon glyph="gift" fontSize="50px" onClick={this.goTo.bind(this)} />
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            {
                                !isAuthenticated() && (
                                    <NavItem className="Login" onClick={this.login.bind(this)}>
                                        Log In
                                    </NavItem>
                                )
                            }
                            {
                                isAuthenticated() && (
                                    <NavItem
                                        onClick={this.goTo.bind(this, 'profile')}>
                                        Profile
                                    </NavItem>
                                )
                            }
                            {
                                isAuthenticated() && (
                                    <NavItem
                                        onClick={this.goTo.bind(this, 'products')}>
                                        Product History
                                    </NavItem>
                                )
                            }
                            {
                                isAuthenticated() && (
                                    <NavItem
                                        id="qsLogoutBtn" onClick={this.logout.bind(this)}>
                                        Log Out
                                    </NavItem>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
    // state = {};

//     handleSubmit(event) {
//         event.preventDefault();
//         console.log("hey what's up");
//         const firstName = event.target.firstName.value;
//         const lastName = event.target.lastName.value
//         const email = event.target.email.value
//         const password = event.target.password.value

//         console.log(firstName, lastName, password, email);

//         fetch('/register', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify({
//                 firstName: firstName,
//                 lastName: lastName,
//                 password: password,
//                 email: email
//             })
//         }).then(res => res.text())

//             // histor.push bc in react, otherwise redirect
//             .then(res => console.log(res))
//         // .catch(err => {
//         // console.log(err);
//         // })
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit} method="POST">
//                 <label htmlFor="firstName">First Name</label>
//                 <input id="firtName" name="firstName" type="text" autoComplete="given-name" />

//                 <label htmlFor="lastName">Last Name</label>
//                 <input id="lastName" name="lastName" type="text" autoComplete="family-name" />

//                 <label htmlFor="password">password</label>
//                 <input id="password" name="password" type="text" autoComplete="password" />

//                 <label htmlFor="email">Email</label>
//                 <input id="email" name="email" type="email" autoComplete="email" />

//                 <button>Send data!</button>
//             </form>
//         );
//     }
// }




export default Signup;