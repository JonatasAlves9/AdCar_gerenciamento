/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import Styles from '../../styles/Dashboard.module.css'
import Navbar from '../../components/navbars/navbarDark'
import { Card, Button, Container, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-nice-dates/build/style.css'

import api from '../../services/api'

export default function dashboard({ history }) {

  const [cars, setCars] = useState();

  async function showAllCars() {
    try {
      const { data } = await api.get('/cars');
      setCars(data);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    showAllCars()
  }, []);

  function redirect(id) {
    history.push('/car/' + id)
  }

  if (cars !== undefined) {

    if (cars.length !== 0) {
      const carsCards = cars.map(car =>
        <Col xs={{ order: 1 }}>
          <Card style={{ width: '25rem', marginTop: '2rem' }}>
            <Card.Img variant="top" src={car.url_master} />
            <Card.Body>
              <Card.Title>{car.name}</Card.Title>
              <Card.Text>Marca: {car.brand}<br />Preço: {'R$ ' + car.price}
              <br />Ano: {car.year}</Card.Text>
              <Button variant="danger" onClick={() => redirect(car.id)}>Editar</Button>
            </Card.Body>
          </Card>
        </Col>
      )

      return (
        <div className={Styles.pag}>
          <Navbar />
          <Container>
            <Row>
              {carsCards}
            </Row>
          </Container>

        </div>
      )
    } else {
      return (
        <div className={Styles.pag}>
          <Navbar />
          <Container>
            <Row>
              <div className={Styles.container}>
                <h1>Ainda não existe carros cadastrados :(</h1>
              </div>
            </Row>
          </Container>

        </div>
      )

    }
  } else {
    return (
      <div>Carregando</div>
    )
  }
}
