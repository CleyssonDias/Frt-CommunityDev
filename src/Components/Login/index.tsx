import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import logo from '../assets/Logo.png';
import bg from '../assets/bg.png';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api';

type TFormData = {
  email: string,
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")) {
      navigate('/home')
    }
  })

  const [form, setForm] = useState<TFormData>({
    email: '',
    password: ''
  });

  const handleSumbit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api.get(`/user/${form.email}/${form.password}`).then(function (response) {
      const m = document.querySelector('.message');
      m?.classList.remove('anim')
      if(response.data.error) {
        m!.innerHTML = `<p>${response.data.error}</p>`
        m?.classList.add('anim')
      } else if (response.data.user) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("email", form.email)
        m!.innerHTML = `<p>Logged in successfully, redirecting...</p>`
        m?.classList.add('anim')
        
        setTimeout(function() {
          navigate('/home')
      }, 1000);
      
        
      }
    })

    
    
  }, [form])

  return (
    <div className="login-containar">
        <div className="message"></div>
        <img src={bg} alt="" />
        <div className="login">
            <form onSubmit={handleSumbit}>
                <h1>Good to see you!</h1>
                <p>Sign in below</p>

                <label htmlFor="email" className='lemail'>Your email:</label>
                <input type="email" value={form.email} onChange={(event) => setForm({
                  ...form,
                  email: event.currentTarget?.value
                })}  required id="email" />

                <label htmlFor="password" className='lpassword' >Your password:</label>
                <input type="password" value={form.password} onChange={(event) => setForm({
                  ...form,
                  password: event.currentTarget?.value
                })}  required id="password" />

                <button type="submit">Login</button>
                <Link to={`/register`}>New here? Register!</Link>
            </form>
        </div>
        <div className="banner">
            <h1>OF DEVS FOR DEVS</h1>
            <img src={logo} />
        </div>
    </div>
  );
}

export default Login;