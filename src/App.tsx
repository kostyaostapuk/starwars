import React, { Component } from 'react';
import './services/api';
import { PeoplePage } from './components/people-page/people-page';
import { RandomPlanet } from './components/random-planet/random-planet';

export default class App extends Component {
  render() {
    return (
      <div className='container-fluid mt-3'>
        <div className='row'>
          <div className='col-3'>
            <RandomPlanet />
          </div>
          <PeoplePage />
        </div>
      </div>
    );
  }
}
