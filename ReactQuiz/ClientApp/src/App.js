import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Quiz } from './components/Quiz.js';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import { Highscores } from './components/Highscores';
import { Admin } from './components/Admin';

import './custom.css';

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.state = { isReady: false };
    }

    handleStartClick = () => {
        document.getElementById('StartBtn').style.display = 'none';
        this.setState({
            isReady: true
        });

    }

    render() {
        return (

            <Layout>
                <Route exact path='/' component={Home} />
                {/* <Route path='/counter' component={Counter} />
                <AuthorizeRoute path='/fetch-data' component={FetchData} /> */}
                <AuthorizeRoute path='/highscores' component={Highscores} />
                <AuthorizeRoute path='/admin' component={Admin} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />

            </Layout>

        );
    }
}
