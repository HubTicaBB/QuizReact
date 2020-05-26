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
        this.setState({ name: user.name });

        const body = {
            username: this.state.name,
            points: this.props.showPointsHandler,
            date: currentDate
        };
        const stringifyBody = JSON.stringify(body);

        const token = await authService.getAccessToken();

        await fetch('api/highscores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': (!token ? '' : `Bearer ${token}` ) },
            body: stringifyBody
        })
            .then(response => response.json())
            .then(data => console.info(data))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <p>Congratulations!</p>
                <button onClick={this.handleResetClick} >Start a new Quiz</button>
                <p>Your points: {this.props.showPointsHandler}</p>
            </div>
        )
    }
}
