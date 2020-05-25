import React from 'react';

export class QuizQuestionButton extends React.Component {
    handleClickOnAnswerButton = () => {
        this.props.clickHandler(this.props.button_text);
    }

    render() {
        return (
            <li>
                <button onClick={this.handleClickOnAnswerButton} disabled={this.props.is_answered} className="quiz_button"> {this.props.button_text}</button>
            </li>
        )
    }
}
