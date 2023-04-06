import { useEffect, useState } from "react";
import { api } from "../../api";

type Props = {
  how: string,
  user: string,
  text: string,
  date: string,
  id: number
}
function newEdit(id: number) {
 
  const modal = document.querySelector(".modall") as HTMLElement;
  modal!.style.display = 'flex'
}
type s = {
  value: string;
}
const Post = (props:Props) => {
  function newPostClosee() {
    const modal = document.querySelector(".modall") as HTMLElement;
    modal!.style.display = 'none'
}
  
  const [form, setForm] = useState<s>({
    value:"k"
  })
type ss = Number
  const [id, setID] = useState<ss | null>(null)

  useEffect(() => {
    if(localStorage.getItem('postid')) {
      setID(Number(localStorage.getItem('postid')))
    }
   
  })

function EditPost(message: string) {
  
  api.post('/posts/update',{
    id,
message
  },  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  const modal = document.querySelector(".modall") as HTMLElement;
  modal!.style.display = 'none'
}
  function DeletePost(id: number) {
    api.delete('/posts',{
      data:{
        id
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

 

  return (
    <div className="post">
       <div className="modall">
            <div className="black">
                <div className="tl"><p>Edit Post</p> <button onClick={newPostClosee}>X</button></div>
                
                <input type="text" id="newp" onChange={(event) => setForm({
                  value: event.currentTarget?.value
                })} /> <button onClick={() => EditPost(form.value)}>EDIT POST</button>
            </div>
        </div>
      <div className="itens">
        <div className="infos">
          <p>
            &lt;<span className="pur">{props.how}</span>/&gt;
          </p>
          <p className="user ">@{props.user}</p>
        </div>
        <p className="message">{props.text}</p>
        <p className="date">{props.date}</p>
      </div>
      <button onClick={() => { localStorage.setItem("postid", String(props.id)) 
        newEdit(props.id) }}>EDIT POST</button>
      <button onClick={() => DeletePost(props.id)}>DELETE POST</button>
    </div>
  );
};

export default Post;
