import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { Table } from 'reactstrap';

export class Highscores extends Component {
    static displayName = Highscores.name;

    constructor(props) {
        super(props);
        this.state = { highscores: [], loading: true };
    }

    componentDidMount() {
        this.populateHighscores();
    }

    static renderHighscoresTable(highscores) {
        return (
            <Table hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {highscores.map(score =>
                        <tr key={score.id}>
                            <td>{score.username}</td>
                            <td>{score.points}</td>
                            <td>{new Intl.DateTimeFormat('en-GB', {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit"
                            }).format(Date.parse(score.date + "Z"))}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Highscores.renderHighscoresTable(this.state.highscores);

        return (
            <div>
                <h1 id="tabelLabel" >Highscores</h1>               
                {contents}
            </div>
        );
    }

    async populateHighscores() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/highscores', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ highscores: data, loading: false });
    }
}