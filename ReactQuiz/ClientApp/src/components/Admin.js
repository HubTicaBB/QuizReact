import React from 'react';
import authService from './api-authorization/AuthorizeService';
import { Table, Card, CardTitle, ListGroup, ListGroupItem, CardFooter, CardText, ButtonGroup, Button } from 'reactstrap';

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
                <div> <Button size="lg" className=" mb-4 mt-4">Add Question</Button>
                </div>
                <div>

                    {this.state.questions.map((question) =>
                        <Card className="mt-2 mb-4 " key={question.id}>
                            <CardTitle className="m-2 h3">Question {question.id}: {question.content}</CardTitle>

                            <ListGroup className="m-2 "> Answers:  {
                                question.answers.map((answer) =>
                                    <ListGroupItem className="m-2" key={answer.id} >
                                        {answer.content}
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                            <CardText className="m-2">Correct answer:{question.correctAnswer}</CardText>
                            <CardFooter className="bg-white">
                                <ButtonGroup size="lg" className="mb-2 float-right">
                                    <Button>Edit</Button>
                                    <Button>Delete</Button>

                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    )}

                </div>
            </div>

        );
    }
}
