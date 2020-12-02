import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import car from '../pages/CreateCar';
import CarEdit from '../pages/EditCar';
import sellers from '../pages/CreateSellers';

import Route from './Route';

export default function Routes() {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} isPrivate/>
        <Route path="/login" exact component={Login} />
        <Route
          path="/car"
          exact
          component={car}
          isPrivate
        />
        <Route path="/car/:id" exact component={CarEdit} isPrivate />
        <Route path="/sellers" exact component={sellers} isPrivate />
      </Switch>
    </BrowserRouter>
  );
}
