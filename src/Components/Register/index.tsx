import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import logo from '../assets/Logo.png';
import bg from '../assets/bg.png';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api';

type TFormData = {
  name: string
  email: string,
  password: string,
  passwordA: string
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")) {
      navigate('/home')
    }
  })
  const [form, setForm] = useState<TFormData>({
    name: '',
    email: '',
    password: '',
    passwordA: ''
  })

  const handleSumbit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const m = document.querySelector('.message');
    m?.classList.remove('anim')
    if (form.password == form.passwordA) {
      api.post('/user', { name: form.name, email: form.email, password: form.password}).then(function (response) {
        if(response.data.user.error) {
          m!.innerHTML = `<p>${response.data.user.error}</p>`
          m?.classList.add('anim')
        } else if (response.data.user) {
          m!.innerHTML = `<p>Account created by redirecting...</p>`
          m?.classList.add('anim')
          setTimeout(function() {
            navigate('/')
        }, 5000);
        }
      })

    } else {
      m!.innerHTML = `<p>Passwords do not match.</p>`
        m?.classList.add('anim')
    }
    
    
  }, [form])

  return (
    <div className="login-containar">
      <div className="message"></div>
        <img src={bg} alt="" />
        <div className="login">
            <form onSubmit={handleSumbit}>
                <h1>Welcome!</h1>
                <p>Enter your information below</p>

                <label htmlFor="email" className='lemail'>Your email:</label>
                <input type="email" required id="email" onChange={(event) => setForm({
                  ...form,
                  email: event.currentTarget?.value
                })} />

                <label htmlFor="name" className='lemail'>Your name:</label>
                <input type="text" required id="name" onChange={(event) => setForm({
                  ...form,
                  name: event.currentTarget?.value
                })} />

                <label htmlFor="password" className='lpassword' >Your password:</label>
                <input type="password" required id="password" onChange={(event) => setForm({
                  ...form,
                  password: event.currentTarget?.value
                })} />

                <label htmlFor="password" className='lpassworda' >Your password Again:</label>
                <input type="password" required id="password" onChange={(event) => setForm({
                  ...form,
                  passwordA: event.currentTarget?.value
                })}/>
                
                <button type="submit">Register</button>
                <Link to={`/`}>Already have an account? In between!</Link>
            </form>
        </div>
        <div className="banner">
            <h1>OF DEVS FOR DEVS</h1>
            <img src={logo} />
        </div>
    </div>
  );
}

export default Register;