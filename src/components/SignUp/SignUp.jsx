import React, { Component } from 'react';
import axios from 'axios';

function initState(){
    return {
        name:'',
        email:'',
        password:'',
        password2:'',
    }
}

export default class SignUp extends Component {
    
    state=initState();
    

    handleChange = e=>{
        const {id, value} = e.target
        this.setState({
            [id]:value
        });
        //console.log(id, value)
    }

    handleSaveUser = async e=>{
        e.preventDefault();
        let state = this.state;
        if(state.password===state.password2){
            delete state['password2'];
            const user = await axios.put('https://api-practica-kevin-cantillo.herokuapp.com/users', state);
            console.log(user);
            window.alert(user.data.message);
            if(user.data.status==="ok"){
                window.location.href="./sign-in";
            }
        }else{
            window.alert("Las contraseñas no coinciden.")
        }
    }

    async componentDidMount() {
        const res = await axios.get('http:https://api-practica-kevin-cantillo.herokuapp.com/users');
        console.log(res);
        window.M.updateTextFields();
    }
    
    

    render() {
        return (
            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12 m4 offset-m4">
                            <h4>Registrar Usuarios</h4>
                            <br/>
                            <form action="" onSubmit={this.handleSaveUser}>
                                <div className="input-field col s12">
                                    <input required id="name" type="text" className="validate" onChange={this.handleChange}/>
                                    <label htmlFor="name">Nombre</label>
                                </div>
                                <div className="input-field col s12">
                                    <input required id="email" type="email" className="validate" onChange={this.handleChange}/>
                                    <label htmlFor="email">Correo</label>
                                </div>
                                <div className="input-field col s12">
                                    <input required id="password" type="password" className="validate" onChange={this.handleChange}/>
                                    <label htmlFor="password">Contraseña</label>
                                </div>
                                <div className="input-field col s12">
                                    <input required id="password2" type="password" className="validate" onChange={this.handleChange}/>
                                    <label htmlFor="password2">Repita la Contraseña</label>
                                </div>
                                <div className="input-field col s12">
                                    <button className="btn " type="submit">
                                        Registrarse
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
