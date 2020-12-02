/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import styles from '../../styles/createCar.module.css';
import api from '../../services/api';
import Navbar from '../../components/navbars/navbarDark';
import 'react-toastify/dist/ReactToastify.min.css';
import { Button,Form } from 'react-bootstrap'

function createSellers({ history }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [cellphone, setCellphone] = useState();
  const [sellers, setSellers] = useState([]);

  async function handleSubmit() {
    if (validateInputs()) {
      try {
        await api.post('/sellers', {
          name,
          email,
          cellphone
        })
        toast.success('Vendedor cadastrado com sucesso!')
      } catch (error) {
        console.log(error)
        toast.error('Erro no cadastro!')
      }
    }
  }

  async function showAllSelers() {
    try {
      const { data } = await api.get('/sellers')
      setSellers(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleEdit(id) {
    history.push("/edit/" + id)
  }

  const sellersList = sellers.map(seller =>
    <Form.Group key={seller.idCar} controlId="formGroupEmail">
      <Form.Label className={styles.title}>Nome</Form.Label>
      <Form.Control
        type="text"
        name="url"
        value={seller.name}
        required />
      <Button className={styles.buttonDelete} variant="primary" onClick={() => handleEdit(seller.id)}>
        Editar
      </Button>
    </Form.Group>
  )

  useEffect(() => {
    showAllSelers()
  }, []);

  function validateInputs() {
    if (name === undefined || email === undefined || cellphone === undefined) {
      toast.error('Preencha todos os campos!')
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <Navbar />
      <div className={styles.pag}>
        <div className={styles.cardLeft}>
          <ToastContainer />
          <Form>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Nome</Form.Label>
              <Form.Control placeholder="Digite seu nome"
                type="text"
                name="name"
                value={name}
                onChange={event => setName(event.target.value)}
                required />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder="example@gmail.com"
                type="email"
                name="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Telefone</Form.Label>
              <Form.Control placeholder="Digite seu telefone"
                type="cellphone"
                name="cellphone"
                value={cellphone}
                onChange={event => setCellphone(event.target.value)}
                required />
            </Form.Group>

            <Button variant="light" onClick={() => handleSubmit()}>
              Cadastrar
            </Button>
          </Form>
        </div>
        <div className={styles.cardRight}>
          <center><h1>Vendedores cadastrados</h1></center>
          {sellersList}
        </div>
      </div>
    </>
  );
}

export default createSellers;
