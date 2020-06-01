import React from 'react';
import authService from './api-authorization/AuthorizeService';
import { Form, FormGroup, Button, Label } from 'reactstrap';

export class AddQuestionForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            questionContent: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            correctAnswer: ''
        }
    }

    handleQuestionContent = event => {

        this.setState({
            questionContent: event.target.value
        })
    }

    handleAnswer1 = event => {

        this.setState({
            answer1: event.target.value
        })
    }
    handleAnswer2 = event => {

        this.setState({
            answer2: event.target.value
        })
    }
    handleAnswer3 = event => {

        this.setState({
            answer3: event.target.value
        })
    }
    handleAnswer4 = event => {

        this.setState({
            answer4: event.target.value
        })
    }

    handleCorrectAnswer = event => {

        this.setState({
            correctAnswer: event.target.value
        })
    }

    handleSubmit = event => {

        event.preventDefault();
        this.submitFormHandler();
        this.props.handler();
    }



    submitFormHandler = async () => {
        const token = await authService.getAccessToken();
        const body = {
            content: this.state.questionContent,
            answers: [
                {
                    content: this.state.answer1
                },
                {
                    content: this.state.answer2
                },
                {
                    content: this.state.answer3
                },
                {
                    content: this.state.answer4
                }
            ],
            correctAnswer: this.state.correctAnswer
        };
        const stringifyBody = JSON.stringify(body);
        await fetch('api/admin', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': (!token ? '' : `Bearer ${token}`) },
            body: stringifyBody
        })
            .then(response => response.json())
            .then(data => console.info(data))
            .catch(err => console.error(err));
    }

    render() {
        const { questionContent, answer1, answer2, answer3, answer4, correctAnswer } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="questionContent">Question content </label>
                    <input
                        type="text"
                        id="questionContent"
                        value={questionContent}
                        placeholder="Write question content..."
                        onChange={this.handleQuestionContent}
                        className="form-control form-control-lg"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answer1">Answer 1</label>
                    <input
                        type="text"
                        id="answer1"
                        value={answer1}
                        placeholder="Write answer 1..."
                        onChange={this.handleAnswer1}
                        className="form-control form-control-lg"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answer1">Answer 2</label>
                    <input
                        type="text"
                        id="answer2"
                        value={answer2}
                        placeholder="Write answer 2..."
                        onChange={this.handleAnswer2}
                        className="form-control form-control-lg"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answer1">Answer 3</label>
                    <input
                        type="text"
                        id="answer3"
                        value={answer3}
                        placeholder="Write answer 3..."
                        onChange={this.handleAnswer3}
                        className="form-control form-control-lg"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answer4">Answer 4</label>
                    <input
                        type="text"
                        id="answer4"
                        value={answer4}
                        placeholder="Write answer 4..."
                        onChange={this.handleAnswer4}
                        className="form-control form-control-lg"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="correctAnswer">Correct answer</label>
                    <input
                        type="text"
                        id="correctAnswer"
                        value={correctAnswer}
                        placeholder="Write correct answer ..."
                        onChange={this.handleCorrectAnswer}
                        className="form-control form-control-lg"
                    />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
            </form >
        )
    }
}
