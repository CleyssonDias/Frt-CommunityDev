import React, { useEffect, useState } from "react";
import "./styles.scss";
import logo from "../assets/Logo.png";
import Post from "../Post";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

type s = {
  value: string;
}
type TUser = {
  post: {
    name: string,
  id: number
  }
  
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState<TUser>({
    post: {
      name:"",
      id:0
    }
  });
  const [edit, setEdit] = useState({})

  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("token")) {
      navigate('/')
    }

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

    

    api.get(`/posts/${localStorage.getItem("email")}`, config).then((res) => {
      setPosts(res.data.post.posts)
      setUser(res.data)
      
    })

  }, [user, posts])
  const [form, setForm] = useState<s>()
     
    function newPost() {
        const modal = document.querySelector(".modal") as HTMLElement;
        modal!.style.display = 'flex'
    }
    function newPostClose() {
        const modal = document.querySelector(".modal") as HTMLElement;
        modal!.style.display = 'none'
    }

    
    function CreatePost() {
     
    
    let email: any =  localStorage.getItem('email')
        api.post('/posts',{
          email,
	message:form?.value
        },  {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        } )

        const modal = document.querySelector(".modal") as HTMLElement;
        modal!.style.display = 'none'
    }

    
  return (
    <div className="cont">
        <div className="modal">
            <div className="black">
                <div className="tl"><p>New Post</p> <button onClick={newPostClose}>X</button></div>
                
                <input type="text" id="newp" onChange={(event) => setForm({
                  value: event.currentTarget?.value
                })} /> <button onClick={CreatePost}>CREATE POST</button>
            </div>
        </div>

       
      <div className="he">
        <div className="backdrop">
          <img src={logo} alt="" />
        </div>
        <div className="infoss">
          <div className="icon"></div>
          <div className="infooss">
            <p>
              &lt;<span className="pur">{user!.post.name}</span>/&gt;
            </p>
            <p className="user ">@{user!.post.name}</p>
          </div>
          <button className="leave" onClick={() => {
            localStorage.removeItem('token')
          }}>leave</button>
        </div>
        
      </div>
      <div className="posts">
        {posts.map((post:any) => {
          
          return (
            <Post
            key={post.id}
              how={user!.post.name}
              date={post.create_at}
              text={post.message}
              user={user!.post.name}
              id={post.id}
            />
          );
        })}

        <div className="plus">
          <button onClick={newPost}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
