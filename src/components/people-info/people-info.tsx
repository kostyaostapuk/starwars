import React, { useEffect, useRef, useState } from 'react';
import { SwapiService } from '../../services/api';
import Spinner from '../spinner/spinner';
import { IPerson } from '../../models';
import { useLocation } from 'react-router-dom';
import { Routes } from '../../constants';

interface IProps {
  selectedPeopleId?: string;
}

const usePreviousValue = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const getIdFromUrl = (search: string) => {
  const indexOfId = search.indexOf('Id=');
  return search.slice(indexOfId + 3);
}

export const PeopleInfo: React.FC<IProps> = ({ selectedPeopleId }) => {
  const swapi = new SwapiService();
  const { pathname, search } = useLocation();

  const prevSelectedPeopleId = usePreviousValue(selectedPeopleId);

  const [people, setPeople] = useState<IPerson>({} as IPerson);
  const [loading, setLoading] = useState<boolean>(true);
  const [peopleId] = useState(selectedPeopleId || getIdFromUrl(search));

  const onError = () => setLoading(false);

  const updatePeopleData = () => {

    swapi
      .getPeopleById(selectedPeopleId || peopleId)
      .then((people) => {
        setPeople(people);
        setLoading(false);
      })
      .catch(onError);
  };

  useEffect(() => {
    updatePeopleData();
  }, []);

  useEffect(() => {
    if (prevSelectedPeopleId !== selectedPeopleId) {
      setLoading(true);
      updatePeopleData();
    }
  }, [selectedPeopleId]);

  if (loading) return <Spinner />;
  if (!people) return <span>Please select the people from list</span>;

  const { id, name, gender, birth_year, eye_color, height, hair_color, skin_color } = people;

  const showMoreInfo = pathname === Routes.More;

  return (
    <div className='person-details card'>
      <div className='card-body'>
        {pathname === Routes.More && (
          <h6>
            <a href='/'>
              Back to home
            </a>
          </h6>
        )}
        <img
          className='person-image rounded img-responsive mb-2'
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt='character'
          style={{ width: '10rem' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h4>{name}</h4>
          {!showMoreInfo && (
              <a href={`/more?userId=${selectedPeopleId}`}>
                Read more
              </a>
          )}
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <span className='term me-2'>Gender:</span>
            <span>{gender}</span>
          </li>
          <li className='list-group-item'>
            <span className='term me-2'>Birth Year:</span>
            <span>{birth_year}</span>
          </li>
          <li className='list-group-item'>
            <span className='term me-2'>Height:</span>
            <span>{height}</span>
          </li>

          {showMoreInfo && (
            <React.Fragment>
              <li className='list-group-item'>
                <span className='term me-2'>Eye Color:</span>
                <span>{eye_color}</span>
              </li>

              <li className='list-group-item'>
                <span className='term me-2'>Hair Color:</span>
                <span>{hair_color}</span>
              </li>

              <li className='list-group-item'>
                <span className='term me-2'>Skin Color:</span>
                <span>{skin_color}</span>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </div>
  );
};
