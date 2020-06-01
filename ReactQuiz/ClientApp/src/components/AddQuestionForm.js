import React from 'react';
import { Button, Form, FormGroup, label, input, FormText } from 'reactstrap';
import authService from './api-authorization/AuthorizeService';

export class AddQuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionContent: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            correctAnswer: ''
        };
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    submitHandler = (event) => {
        event.preventDefault();

        const token = authService.getAccessToken();
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

        fetch('api/admin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': (!token ? '' : `Bearer ${token}`)
            },
            body: stringifyBody
        })
            .then(response => response.json())
            .then(data => console.info(data))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div className="form-group">
                    <label htmlFor="questionContent">Question content:</label>
                    <input type="textarea"
                        name="questionContent"
                        id="questionContent"
                        value={this.state.questionContent}
                        onChange={this.changeHandler}
                        placeholder="Question content"
                        className="form-control form-control-lg"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answer1">Answer 1:</label>
                    <input type="text"
                        name="answer1"
                        id="answer1"
                        value={this.state.answer1}
                        onChange={this.changeHandler}
                        placeholder="Answer 1"
                        className="form-control form-control-lg"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answer2">Answer 2:</label>
                    <input type="text"
                        name="answer2"
                        id="answer2"
                        value={this.state.answer2}
                        onChange={this.changeHandler}
                        placeholder="Answer 2"
                        className="form-control form-control-lg"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answer3">Answer 3:</label>
                    <input type="text"
                        name="answer3"
                        id="answer3"
                        value={this.state.answer3}
                        onChange={this.changeHandler}
                        placeholder="Answer 3"
                        className="form-control form-control-lg"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answer4">Answer 4:</label>
                    <input type="text"
                        name="answer4"
                        id="answer4"
                        value={this.state.answer4}
                        onChange={this.changeHandler}
                        placeholder="Answer 4"
                        className="form-control form-control-lg"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="correctAnswer">Correct Answer:</label>
                    <input type="text"
                        name="correctAnswer"
                        id="correctAnswer"
                        value={this.state.correctAnswer}
                        onChange={this.changeHandler}
                        placeholder="Correct Answer"
                        className="form-control form-control-lg"
                    />
                </div>
                <input type='submit' className='btn btn-success btn-lg' value='Submit question' />
            </form>
        );
    }
}
