import React from 'react';
import authService from './api-authorization/AuthorizeService';
import { Card, CardTitle, ListGroup, ListGroupItem, CardFooter, CardText, ButtonGroup, Button } from 'reactstrap';
import { QuestionForm } from './QuestionForm';


export class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            isLoaded: false,
            isAddQuestionButtonClicked: false,
            isEditQuestionButtonClicked: false,
            editQuestionId: undefined
        };

    }

    handleAddQuestion = () => {

        this.setState({ isAddQuestionButtonClicked: true, editQuestionId: undefined, isEditQuestionButtonClicked: false });
    }

    handleEditQuestion = (questionId) => {
        this.setState({ isEditQuestionButtonClicked: true, editQuestionId: questionId, isAddQuestionButtonClicked: false });

    }

    handleBackToQuestions = async () => {
        await this.getQuestionsForAdmin();
        this.setState({
            isAddQuestionButtonClicked: false,
            isEditQuestionButtonClicked: false
        });

    }

    componentDidMount() {
        this.getQuestionsForAdmin();
    }


    deleteQuestion = async (questionId) => {
        alert(`This action is permanently deleting Question ${questionId}.`);
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
                <div> <Button size="lg" className=" mb-4 mt-4" style={(this.state.isAddQuestionButtonClicked === true || this.state.isEditQuestionButtonClicked === true) ? { display: 'none' } : { display: 'block' }} onClick={this.handleAddQuestion}>Add Question</Button>
                </div>

                {(this.state.isAddQuestionButtonClicked || this.state.isEditQuestionButtonClicked) ?
                    (
                        <QuestionForm handler={this.handleBackToQuestions} questionId={this.state.editQuestionId} />

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
                                            <Button onClick={() => this.handleEditQuestion(question.id)}>Edit</Button>
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
