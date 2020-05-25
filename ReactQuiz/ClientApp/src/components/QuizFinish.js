import React from 'react';

export class QuizFinish extends React.Component {
    handleResetClick = () => {
        this.props.resetClickHandler();
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
