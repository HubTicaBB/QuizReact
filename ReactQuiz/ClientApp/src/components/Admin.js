import React from 'react';
import authService from './api-authorization/AuthorizeService';
import { Table, Card } from 'reactstrap';

export class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            isLoaded: false
        };
    }

    async componentDidMount() {

        const token = await authService.getAccessToken();
        await fetch("api/admin", { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } })
            .then((response) => response.json())
            .then(data => this.setState({ questions: data, isLoaded: true }))
            .catch(err => console.error(err));

    }

    render() {
        return (
            <div>


                {this.state.questions.map((question) =>
                    <Card className="mt-2 mb-2 " key={question.id}>
                        <p className="m-2">Question {question.id}: {question.content}</p>

                        <ul className="m-2"> Answers:  {
                            question.answers.map((answer) =>
                                <li className="m-2" key={answer.id} >
                                    {answer.content}
                                </li>
                            )}
                        </ul>
                        <p className="m-2">Correct answer:{question.correctAnswer}</p>
                    </Card>
                )}

            </div>

        );
    }
}
