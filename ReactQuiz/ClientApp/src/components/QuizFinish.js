import React from 'react';

export class QuizFinish extends React.Component {
    handleResetClick = () => {
        this.props.resetClickHandler();
    }

    componentDidMount() {
        var currentDate = new Date();
        fetch('api/highscores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'replaceByUsername', points: this.props.showPointsHandler, date: currentDate })
        })
            .then(response => response.json())
            .then(data => this.setState({ id: data.id }));
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
