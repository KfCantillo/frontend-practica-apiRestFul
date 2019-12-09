import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import CreatePosts from './CreatePosts'

const Token = localStorage.getItem("tokenKfC");

function initialSatae() {
  return {
    posts: [],
    user: {
      name: "",
      email: ""
    },
    users: [],
    newPost: false,
    searchByUser:'',
    searchByTitle: ''
  };
}

export default class Posts extends Component {
  state = initialSatae();

  componentDidMount = async () => {
    const Token = localStorage.getItem("tokenKfC");
    if (!Token) {
        window.location.href= "/sign-in";
    }
    const users = await axios.get("https://api-practica-kevin-cantillo.herokuapp.com/users");
    const posts = await axios.get("https://api-practica-kevin-cantillo.herokuapp.com/posts/user/current", {
      headers: { "x-access-token": Token }
    });
    if (!posts.data.auth && posts.status!==200) {
      window.location.href= "/sign-in";
    }
    //console.log(posts)
    this.setState({
      user: posts.data.dataUser,
      users: users.data
    });
    this.searchPosts();
  };

  savePost = ()=>{
    this.setState({
        newPost: false
    });
    this.searchPosts();
  }

  searchPosts = async ()=>{
    const posts = await axios.get('https://api-practica-kevin-cantillo.herokuapp.com/posts', {headers: { "x-access-token": Token }});
    //console.log(posts);
    this.setState({
        posts: posts.data
    })
  }
  deletePost = async (_id)=>{
    if (window.confirm("¿Desea eliminar este Posts?")) {
        const post = await axios.delete(`https://api-practica-kevin-cantillo.herokuapp.com/posts/${_id}`, {headers: { "x-access-token": Token }});
        if(post.data.status==='ok'){
            window.alert('Post eliminado con éxito!');
            this.searchPosts();
        }
    }
  }

  render() {
    const posts = this.state.posts.map(p=>{
        let updatePost = 
            <div className="card-action">
                <Link to={"./posts/"+p._id}>Editar </Link>
                <Link to="#" onClick={()=>this.deletePost(p._id)}>Eliminar </Link>
            </div>;
        if(this.state.user._id !== p._id_users) { 
            updatePost = ''; 
        }
        const user = this.state.users.find(u=>u._id===p._id_users);
        return(
            <div key={p._id} className="col s12">
                <div className="card blue-grey lighten-5">
                  <div className="card-content">
                    <span className="card-title">{p.title}</span>
                    <div className="row">
                        <div className="col s10 offset-s1" style={{ height:'300px',  background: `url('${p.image}') center center` }}></div>
                    </div>
                    <p>
                      { p.content }
                    </p>
                    <span className="grey-text">Posteado por: {user.name}</span>
                  </div>
                  { updatePost }
                </div>
            </div>
        )
    })

    return (
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="card">
                <div className="card-image">
                  <img
                    src="//tuswallpapersgratis.com/wp-content/uploads/2013/11/german_landscapes-1280x800.jpg"
                    alt="Fondo"
                  />
                  <span className="card-title" style={{ marginBottom: "10px" }}>
                    {this.state.user.name}
                  </span>
                  <span className="card-title" style={{ fontSize: "10pt" }}>
                    {this.state.user.email}
                  </span>
                  <span onClick={()=>{this.setState({newPost:true})}} className="btn-floating halfway-fab waves-effect waves-light red">
                    <i className="material-icons">add</i>
                  </span>
                </div>
                <div className="card-content">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                        <div className="input-field col s12">
                            <input required id="searchByTitle" type="text" className="validate" value={this.state.searchByTitle} onChange={this.handleChange} />
                            <label htmlFor="searchByTitle">Buscar por título</label>
                        </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                            <div className="input-field col s12">
                                <input required id="searchByUser" type="text" className="validate" value={this.state.searchByUser} onChange={this.handleChange} />
                                <label htmlFor="searchByUser">Buscar por Usuario</label>
                            </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col s12 m8">
              { this.props.match.params.id ? <CreatePosts onSave={this.savePost} _id={this.props.match.params.id} /> : null }
              { this.state.newPost ? <CreatePosts onSave={this.savePost} /> : null }  
              { !this.props.match.params.id ? posts : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
