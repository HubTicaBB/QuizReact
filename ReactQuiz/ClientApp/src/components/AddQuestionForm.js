import React from 'react';

export class AddQuestionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    changeHandler = event => {
        this.setState({
            email: event.target.value
        });
    }

    render() {
        return (
            <form>
                <input type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.changeHandler}
                />
            </form>
        );
    }

}
