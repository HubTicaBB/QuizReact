﻿import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Quiz } from './components/Quiz.js';

import './custom.css';

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.state = { isReady: false };
    }

    handleStartClick = () => {
        this.setState({
            isReady: true
        });
    }

    render() {
        return (

            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />

                {/*  <Fragment>
                    {this.state.isReady
                        ? (
                            <Quiz />

                        ) : (
                            <button onClick={this.handleStartClick}>Start Quiz</button>
                        )}
                </Fragment> */}

            </Layout>

        );
    }
}
