import { IPlanet } from '../../models';
import React from 'react';

interface IProps {
  planet: IPlanet;
}

const getImgUrl = (id: number) => `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;

export const PlanetView: React.FC<IProps> = ({ planet }) => {
  const { id, name, population, rotation_period, diameter, terrain } = planet;
  return (
      <div className='card'>
          <div className='card-body'>
              <img className='rounded' src={getImgUrl(id)} alt='img' style={{ width: '4rem' }} />
              <h5 className='card-title'>{name}</h5>
              <h6 className='card-subtitle mb-2 text-muted'>Population: {population}</h6>
              <h6 className='card-subtitle mb-2 text-muted'>Rotation: {rotation_period}</h6>
              <h6 className='card-subtitle mb-2 text-muted'>Diameter: {diameter}</h6>
              <h6 className='card-subtitle mb-2 text-muted'>Terrain: {terrain}</h6>
          </div>
      </div>
  );
};
