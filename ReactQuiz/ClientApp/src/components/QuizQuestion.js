import React from 'react';
import { QuizQuestionButton } from './QuizQuestionButton.js';

export class QuizQuestion extends React.Component {
    handleNextQuestion = () => {
        this.props.showNextQuestionHandler();
    }

    render() {
        return (

            <div>
                <div>
                    <p>Question {this.props.quizQuestion.id}</p>
                    <p>{this.props.quizQuestion.content}</p>
                </div>
                <div className="buttons">
                    <ul>
                        {this.props.quizQuestion.answers.map((answer, index) => {
                            return <QuizQuestionButton key={index} button_text={answer.content} is_answered={this.props.isAnswered}
                                clickHandler={this.props.handleAnswerQuestion} />
                        }
                        )}

                    </ul>
                </div>
                {this.props.isAnswered
                    ? (
                        this.props.incorrectAnswer ? <p className="error">Sorry, your answer is incorrect</p> : <p className="correct">Correct</p>
                    ) : (
                        <p>You have to choose an answer</p>
                    )}
                {this.props.isAnswered && <button className="buttons" onClick={this.handleNextQuestion}>Next</button>}

            </div>
        )
    }
}
