import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

/*
*   Componente de menu desenvolvido com a ferramenta
*   bootstrap uma versão light do menu
*
*/

const navbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">Clube17</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link eventKey={2} href="/createCar">Push createCar</Nav.Link></Nav>
        <Nav>
          <Nav.Link eventKey={2} href="/clientes">Relatorios</Nav.Link>
          <Nav.Link eventKey={3} href="/">Configurações</Nav.Link>
          <Nav.Link eventKey={4} href="/">Sair</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default navbar
