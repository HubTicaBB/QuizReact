﻿import React from 'react';
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

        event.preventDefault()
        this.submitFormHandler();
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
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Question content </Label>
                    <input
                        type="text"
                        value={questionContent}
                        onChange={this.handleQuestionContent}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Answer 1</label>
                    <textarea
                        value={answer1}
                        onChange={this.handleAnswer1}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Answer 2</label>
                    <textarea
                        value={answer2}
                        onChange={this.handleAnswer2}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Answer 3</label>
                    <textarea
                        value={answer3}
                        onChange={this.handleAnswer3}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Answer 4</label>
                    <textarea
                        value={answer4}
                        onChange={this.handleAnswer4}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Correct answer</label>
                    <textarea
                        value={correctAnswer}
                        onChange={this.handleCorrectAnswer}
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        )
    }
}