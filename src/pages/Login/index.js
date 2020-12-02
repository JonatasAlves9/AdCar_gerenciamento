import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import styles from '../../styles/Login.module.css';
import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.min.css';

function Login({ history, match }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (validateEmail() && validatePassword()) {
      console.log(email, password)
      try {
         await api.post('/admins/login', {
          email: email,
          password: password,
        });
        sessionStorage.setItem('@tokenAd', '@token');
        history.push('/');
      } catch (error) {
        toast.error('Falha na Autenticação, confira os campos!');
      }
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('@tokenAd');
  }

  useEffect(() => {
    handleLogout()
  }, []);

  function validateEmail() {
    if (email !== '') {
      return true;
    }
    toast.error('Campo de email está vazio!');
    return false;
  }

  function validatePassword() {
    if (password !== '') {
      return true;
    }
    toast.error('Campo de senha está vazio!');
    return false;
  }

  return (
    <>
      <div className={styles.pag}>
        <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.card}>
              <h1 className={styles.logo}>AdCar</h1>
              <ToastContainer />
              <form onSubmit={handleSubmit}>
                <input
                  className={styles.input}
                  type="text"
                  name="user"
                  placeholder="E-mail"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
                <br />
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
                <br />
                <input
                  className={styles.button}
                  onClick={() => { }}
                  type="submit"
                  value="Login"
                />
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Login;
