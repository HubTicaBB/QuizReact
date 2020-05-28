import React from 'react';
import authService from './api-authorization/AuthorizeService';

export class Admin extends React.Component {
    constructor(props) {
        super(props);

    }


    async componentDidMount() {

        //const currentDate = new Date();
        //const user = await authService.getUser();
        //const userId = await authService.getUserId();
        //this.setState({ name: user.name, id: userId, isAdmin: false });

        const token = await authService.getAccessToken();


        await fetch('api/highscores', {

            headers: { 'Content-Type': 'application/json', 'Authorization': (!token ? '' : `Bearer ${token}`) },
            body: stringifyBody
        })
            .then(response => response.json())
            .then(data => console.info(data))
            .catch(err => console.error(err));

    }

    render() {
        return (
            <div>
                <p>I am the admin</p>
            </div>
        )
    }
}
