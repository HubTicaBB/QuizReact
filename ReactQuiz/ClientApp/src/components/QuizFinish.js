import React from 'react';
import authService from './api-authorization/AuthorizeService';

export class QuizFinish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    handleResetClick = () => {
        this.props.resetClickHandler();
    }

    async componentDidMount() {

        const currentDate = new Date();
        const user = await authService.getUser();
        const userId = await authService.getUserId();
        this.setState({ name: user.name, id: userId, isAdmin: false });

        const token = await authService.getAccessToken();
        const response = await fetch('api/role', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.userId === this.state.id) {
            this.setState({ isAdmin: true })
        }        

        if (this.state.isAdmin) {
            console.log("I am the admin");
            const body = {
                username: this.state.name,
                points: this.props.showPointsHandler,
                date: currentDate
            };
            const stringifyBody = JSON.stringify(body);

            await fetch('api/highscores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': (!token ? '' : `Bearer ${token}`) },
                body: stringifyBody
            })
                .then(response => response.json())
                .then(data => console.info(data))
                .catch(err => console.error(err));
        }
        else {
            console.log("Fuck off non-admin");
        }
    }

    render() {
        return (
            <div>
                <h3 className="mt-5 mb-3 p-1"><i aria-hidden="true" className="chess queen icon"></i> &nbsp; Congratulations!</h3>
                <p className="mb-3">Your score is: {this.props.showPointsHandler} points</p>
                <button className="btn btn-info" style={{ width: 200 }} onClick={this.handleResetClick} >Start a new Quiz</button>
            </div>
        )
    }
}
