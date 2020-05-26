import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { NavLink, Button } from 'reactstrap'
import { Quiz } from './Quiz.js';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from './api-authorization/ApiAuthorizationConstants';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        this.state = {
            IsUserAuthenticated: false,
            IsQuizReady: false
        };
    }

    async componentDidMount() {
        this.setState({ IsUserAuthenticated: await authService.isAuthenticated() });
    }

    handleStartClick = () => {
        this.setState({
            IsQuizReady: true
        });
    }

    render() {
        const registerPath = `${ApplicationPaths.Register}`;
        const loginPath = `${ApplicationPaths.Login}`;
        return (
            <div>
                <h1>Hello, to the best quiz app in the world!</h1>


                {this.state.IsUserAuthenticated ?
                    <div>
                        <p>You are authenticated </p>
                        {this.state.IsQuizReady
                            ? (
                                <Quiz />

                            ) : (
                                <button onClick={this.handleStartClick}>Start Quiz</button>
                            )}
                    </div> :
                    <div>
                        <p>In order to be able to play this awesome quiz you will have to create an account on this webpage. </p>
                        <p>Do you already have an account here ?</p>
                        <p>Then login your account and start playing this amazing quiz</p>
                        <p>You are not authenticated</p>
                        <p><Button >
                            <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
                        </Button></p>
                        <p><Button>
                            <NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
                        </Button></p>
                    </div>
                }
            </div>
        );
    }
}
