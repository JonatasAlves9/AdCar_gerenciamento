import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

/*
*   Componente de menu desenvolvido com a ferramenta
*   bootstrap uma versão dark do menu
*
*/



const navbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">AdCar</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link eventKey={1} href="/car">Cadastrar Novo Carro</Nav.Link></Nav>
        <Nav>
          <Nav.Link eventKey={4} href="/sellers">Vendedores</Nav.Link>
          <Nav.Link eventKey={4} href="/login">Sair</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default navbar
