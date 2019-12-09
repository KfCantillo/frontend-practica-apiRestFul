import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios, { post } from 'axios';
import "./Posts.css";

const Token = localStorage.getItem("tokenKfC");
function initialState() {
    return {
        title: '',
        content: '',
        image: '',
    }
}

export default class CreatePosts extends Component {
  
  state = initialState();

  handleChange = e=>{
    const {id, value} = e.target
    this.setState({
        [id]:value
    });
    //console.log(id, value);
  }
  handleChangeFile = e => {
    this.setState({image:e.target.files[0]})
  }

  handleSavePost = async e =>{
    e.preventDefault();
    this.imgUpload(this.state.image).then(async (res)=>{
        //console.log(res);
        if (res.data.status==='ok') { 
            let data = this.state;
            data.image = res.data.location_image ? res.data.location_image: data.image;
            let post = null;
            if (this.props._id) {
                delete data.createdAt
                delete data.updatedAt
                delete data.__v
                delete data._id
                delete data._id_users
                post = await axios.post(`https://api-practica-kevin-cantillo.herokuapp.com/posts/${this.props._id}`, data, {headers: {"x-access-token": Token}});
            }else{
                post = await axios.put('https://api-practica-kevin-cantillo.herokuapp.com/posts', data, {headers: {"x-access-token": Token}});        
            }
            //console.log(post);
            window.alert(post.data.message);
            if (post.data.status==='ok') {
                document.location.href='/posts';
            }
        }
    });
  }
  componentDidMount = () => {
        if(this.props._id){
            this.searchPost(this.props._id)
        }
  }

  searchPost = async (_id)=>{
    const posts = await axios.get(`https://api-practica-kevin-cantillo.herokuapp.com/posts/${_id}`, {headers: { "x-access-token": Token }});
    console.log(posts.data[0]);
    this.setState(posts.data[0],()=>{
        window.M.updateTextFields();
    });
  }

  imgUpload = file=>{
    const url = 'https://api-practica-kevin-cantillo.herokuapp.com/posts/upload';

    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            "x-access-token": Token
        }
    }
    return  post(url, formData,config)
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card blue-grey lighten-4 ">
            <div className="card-content">
              <form className="row">
              <span className="card-title">Nuevo Post</span>
                <div className="input-field col s12">
                  <input required id="title" type="text" className="validate" value={this.state.title} onChange={this.handleChange} />
                  <label htmlFor="title">Título</label>
                </div>
                <div className="input-field col s12">
                    <textarea id="content" className="materialize-textarea" value={this.state.content} onChange={this.handleChange} ></textarea>
                    <label htmlFor="content">Contenido</label>
                </div>
                <div className="col s12">
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Imagen</span>
                            <input type="file" accept="" onChange={this.handleChangeFile}/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
              </form>
            </div>
            <div className="card-action black-text">
              <Link to="/posts" onClick={()=>this.props.onSave()}>Cancelar</Link>
              <Link to="#" onClick={this.handleSavePost}>Guardar</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
