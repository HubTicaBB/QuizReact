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
                <Route path='/counter' component={Counter} />
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <AuthorizeRoute path='/play-quiz' component={Quiz} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />

                

                <Link to="/play-quiz">
                    <button style={{ display: 'block' }} id='StartBtn' onClick={this.handleStartClick}>Start Quiz</button>
                </Link>
                

                {/*
                <Fragment>
                    {this.state.isReady
                        ? (
                            <Quiz />

                        ) : (
                            <div>
                            <button onClick={this.handleStartClick} tag={Link} to="/play-quiz" >Start Quiz</button>
                                <NavLink tag={Link} className="btn btn-success text-light" to="/play-quiz">Start-quiz</NavLink>
                            </div>
                        )}
                </Fragment>
                */}
            </Layout>

        );
    }
}
