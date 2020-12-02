/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import styles from '../../styles/createCar.module.css';
import api from '../../services/api';
import Navbar from '../../components/navbars/navbarDark';
import 'react-toastify/dist/ReactToastify.min.css';
import { Button, Col, Form } from 'react-bootstrap'

function createCar() {
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [year, setYear] = useState();
  const [km, setKm] = useState();
  const [price, setPrice] = useState();
  const [url_master, setUrl_master] = useState();
  const [description, setDescription] = useState();
  const [gearbox, setGearbox] = useState();
  const [imagem, setImagem] = useState([]);
  const [imageTemp, setImageTemp] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    console.log(gearbox)
  }, [gearbox]);

  async function handleSubmit() {
    if (validateInputs()) {
      try {
        const { data } = await api.post('/cars', {
          name,
          brand,
          km,
          year,
          description,
          gearbox,
          price,
          urlMaster: url_master,
        })
        toast.success('Carro cadastrado com sucesso!')
        setId(data.id);
      } catch (error) {
        console.log(error)
        toast.error('Erro no cadastro!')
      }
    }
  }


  async function handleDelete(id) {
    try {
      await api.delete('/images/' + id)
      toast.success('Imagem deletado com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao deletar!')
    }

  }

  async function cadastrarImagem(url) {
    if (validateInputsImages(url)) {
      try {
        await api.post('/images', {
          idCar: id,
          url
        })
        toast.success('Imagem cadastrado com sucesso!')
        setImagem([url].concat(imagem));
      } catch (error) {
        console.log(error)
        toast.error('Erro no cadastro!')
      }
    }
  }


  function addImage(url) {
    if (id === undefined) {
      toast.error('Primeiro cadastre um veiculo')
    } else {
      setImageTemp("");
      cadastrarImagem(url);

    }

  }

  useEffect(() => {
    console.log(imagem)
  }, [imagem]);


  function validateInputs() {
    if (name === undefined || brand === undefined || year === undefined || km === undefined ||
      price === undefined || url_master === undefined || description === undefined || gearbox === undefined) {
      toast.error('Preencha todos os campos!')
      return false;
    } else {
      return true;
    }
  }

  function validateInputsImages(imagem) {
    if (imagem === undefined) {
      toast.error('Preencha todos os campos!')
      return false;
    } else {
      return true;
    }
  }

  const imagesForm = imagem.map(image =>
    <Form.Group key={image} controlId="formGroupEmail">
      <Form.Label className={styles.title}>Imagem</Form.Label>
      <Form.Control
        type="text"
        name="url"
        value={image}
        onChange={event => setImageTemp(event.target.value)}
        required />
      <Button className={styles.buttonDelete} variant="danger" onClick={() => handleDelete(image.id)}>
        Remover
      </Button>
    </Form.Group>
  )

  return (
    <>
      <Navbar />
      <div className={styles.pag}>
        <div className={styles.cardLeft}>
          <ToastContainer />
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text"
                  name="name"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  required />
              </Form.Group>


              <Form.Group as={Col} controlId="formGridPrice">

                <Form.Label>Preço R$</Form.Label>

                <Form.Control type="text"
                  placeholder="120.000,00"
                  name="price"
                  value={price}
                  onChange={event => setPrice(event.target.value)}
                  required />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Marca</Form.Label>
                <Form.Control type="text"
                  name="brand"
                  value={brand}
                  onChange={event => setBrand(event.target.value)}
                  required />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Ano</Form.Label>
                <Form.Control
                  type="text"
                  name="year"
                  value={year}
                  onChange={event => setYear(event.target.value)}
                  required />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Câmbio</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." type="text"
                  name="gearbox"
                  value={gearbox}
                  onChange={event => setGearbox(event.target.value)}
                  required >
                  <option>Escolha...</option>
                  <option>Automatico</option>
                  <option>Manual</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>KM</Form.Label>
                <Form.Control type="text"
                  name="km"
                  value={km}
                  onChange={event => setKm(event.target.value)}
                  required />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>URL da imagem principal</Form.Label>
              <Form.Control placeholder="https://www.example.com.br"
                type="text"
                name="url_master"
                value={url_master}
                onChange={event => setUrl_master(event.target.value)}
                required />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Descrição</Form.Label>
              <Form.Control placeholder="Breve descrição do carro a cadastrar"
                type="text"
                as="textarea"
                name="description"
                value={description}
                onChange={event => setDescription(event.target.value)}
                required />
            </Form.Group>

            <Button variant="light" onClick={() => handleSubmit()}>
              Cadastrar
            </Button>
          </Form>
        </div>
        <div className={styles.cardRight}>
          <Form>
            {imagesForm}
            <Form.Group controlId="formGroupEmail">
              <Form.Label className={styles.title}>Imagem</Form.Label>
              <Form.Control
                placeholder="https://www.example.com.br"
                type="text"
                name="url"
                value={imageTemp}
                onChange={event => setImageTemp(event.target.value)}
                required />
            </Form.Group>
            <Button variant="light" onClick={() => addImage(imageTemp)}>
              Cadastrar
            </Button>
          </Form>

        </div>
      </div>
    </>
  );
}

export default createCar;
