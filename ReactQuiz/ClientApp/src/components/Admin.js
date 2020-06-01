import React from 'react';
import authService from './api-authorization/AuthorizeService';
import { Card, CardTitle, ListGroup, ListGroupItem, CardFooter, CardText, ButtonGroup, Button } from 'reactstrap';
import { AddQuestionForm } from './AddQuestionForm';


export class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            isLoaded: false,
            isAddQuestionButtonClicked: false
        };

    }

    handleAddQuestion = () => {
        this.setState({ isAddQuestionButtonClicked: true });
    }


    handleBackToQuestions = async () => {
        await this.getQuestionsForAdmin();
        this.setState({
            isAddQuestionButtonClicked: false
        });

    }

    componentDidMount() {
        this.getQuestionsForAdmin();
    }


    deleteQuestion = async (questionId) => {
        alert(`Are you sure you want to delete Question ${questionId}?`);
        const token = await authService.getAccessToken();
        await fetch(`api/admin/${questionId}`, {
            method: 'DELETE',
            headers: { 'Authorization': (!token ? '' : `Bearer ${token}`) }
        })
            .then(response => response.json())
            .then(data => console.info(data))
            .catch(err => console.error(err));

        this.getQuestionsForAdmin();
    }

    getQuestionsForAdmin = async () => {
        const token = await authService.getAccessToken();
        await fetch("api/admin", { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                this.setState({ questions: data, isLoaded: true })
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <div> <Button size="lg" className=" mb-4 mt-4" onClick={this.handleAddQuestion}>Add Question</Button>
                </div>

                {(this.state.isAddQuestionButtonClicked) ?
                    (
                        <AddQuestionForm handler={this.handleBackToQuestions} />

                    ) :
                    (
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
                                            <Button onClick={() => this.deleteQuestion(question.id)}>Delete</Button>

                                        </ButtonGroup>
                                    </CardFooter>
                                </Card>
                            )}
                        </div>
                    )
                }
            </div>
        );
    }
}
