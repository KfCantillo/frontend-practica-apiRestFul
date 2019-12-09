import React, { Component } from 'react';
import axios from 'axios';

function initState(){
    return {
        email: '',
        password: ''
    }
}

export default class SignIn extends Component {

    state=initState();

    handleChange = e=>{
        const {id, value} = e.target
        this.setState({
            [id]:value
        });
        //console.log(id, value)
    }

    handleAuthLogin = async e=>{
        e.preventDefault();
        const log = await axios.post('//localhost:4000/users/login', this.state);
        if(log.data.auth){
            localStorage.setItem('tokenKfC', log.data.token);
            window.location.href="./posts";
        }else{
            window.alert('Datos Incorrectos!!!');
        }
        //console.log(log);
    }

    render() {
        return (
            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12 m4 offset-m4">
                            <h4>Inicio de Sesión de Usuarios</h4>
                            <br/>
                            <form action="" onSubmit={this.handleAuthLogin}>
                                <div className="input-field col s12">
                                    <input required id="email" type="email" className="validate" onChange={this.handleChange}/>
                                    <label htmlFor="email">Correo</label>
                                </div>
                                <div className="input-field col s12">
                                    <input required id="password" type="password" className="validate" onChange={this.handleChange}/>
                                    <label htmlFor="password">Contraseña</label>
                                </div>
                                <div className="input-field col s12">
                                    <button className="btn " type="submit">
                                        Iniciar Sesión
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
