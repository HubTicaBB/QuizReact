import React from 'react';
import { QuizQuestion } from './QuizQuestion.js';
import { QuizFinish } from './QuizFinish.js';

let quizData = require('./QuizData.json') //fetch

export class Quiz extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            position: 1,
            isAnswered: false,
            incorrectAnswer: false,
            points: 0
        }
    }
    showNextQuestion = () => {
        this.setState({
            position: this.state.position + 1,
            isAnswered: false
        });
    }

    handleResetClick = () => {
        this.setState({ position: 1, points: 0 });
    }

    handleAnswerQuestion = (buttonText) => {

        if (!this.state.isAnswered) {

            if (buttonText === quizData.questions[this.state.position - 1].correctAnswer) {

                this.setState({ incorrectAnswer: false, points: this.state.points + 1 });
            }
            else {
                this.setState({ incorrectAnswer: true });
            }
            this.setState({ isAnswered: true });
        }
    }


    render() {
        const isQuizFinished = ((this.state.position - 1) === quizData.questions.length)
        return (
            <div>
                {isQuizFinished ?
                    <QuizFinish resetClickHandler={this.handleResetClick} showPointsHandler={this.state.points} /> :
                    <QuizQuestion showNextQuestionHandler={this.showNextQuestion} handleAnswerQuestion={this.handleAnswerQuestion} isAnswered={this.state.isAnswered}
                        quizQuestion={quizData.questions[this.state.position - 1]} incorrectAnswer={this.state.incorrectAnswer} />}
            </div>
        )
    }
}
