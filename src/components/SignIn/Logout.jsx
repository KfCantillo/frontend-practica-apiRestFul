import React, { Component } from 'react'

export default class Logout extends Component {
    componentDidMount = () =>{
        localStorage.removeItem('tokenKfC');
        window.location.href="/";
    }
    render() {
        return (
            <div>
                Cerrando sessión....
            </div>
        )
    }
}
