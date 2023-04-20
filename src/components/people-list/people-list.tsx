import React, { useEffect, useState } from 'react';
import { SwapiService } from '../../services/api';
import Spinner from '../spinner/spinner';
import { ErrorIndicator } from '../error-indicator/error-indicator';
import classNames from 'classnames';
import { Pagination } from '../pagination';
import { Input } from '../input';
import { IFilter, IPerson } from '../../models';
import { Filters } from '../filters';

interface IProps {
  onSelectedPeople: (id: number) => void;
}

export const PeopleList: React.FC<IProps> = ({ onSelectedPeople }) => {
  const swapi = new SwapiService();

  const itemsPerPage = 10;
  const [searchValue, setSearchValue] = useState<string>('');
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [activeLineIndex, setActiveLineIndex] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<IPerson[]>([]);
  const [filter, setFilter] = useState<IFilter>({} as IFilter);

  const onError = () => setError(true);

  useEffect(() => {
    getAllPeople();
  }, []);

  const onAllPeopleLoaded = (data: IPerson[]) => {
    setData(data);
  };
  const getAllPeople = () => {
    swapi.getAllPeople().then(onAllPeopleLoaded).catch(onError);
  };

  const handleSetFilterField = (field: IFilter) => setFilter(field);
  const handleSetPageIndex = (id: number) => setPageIndex(id);
  const handleSetSearchValue = (value: string) => {
    setFilter({} as IFilter);
    setSearchValue(value.toLowerCase());
  };

  const renderPeoples = (data: IPerson[][]) => {
    if (!data || !data.length) return [];

    const collection = data[pageIndex - 1];

    if(!collection) return [];

    return data[pageIndex - 1].map(({ id, name }) => (
      <li
        className={classNames('list-group-item', {
          active: id === activeLineIndex,
        })}
        onClick={() => {
          setActiveLineIndex(id);
          onSelectedPeople(id);
        }}
        key={id}
        style={{ cursor: 'pointer' }}
      >
        {name}
      </li>
    ));
  };

  const filteringByValue = (data: IPerson[]) => {
    const filteredData = data.filter((item) => {
      if (filter.key) {
        return item[`${filter.field as keyof IPerson}`] === filter.key;
      }

      return (
        item.birth_year.toLowerCase().includes(searchValue) ||
        item.eye_color.toLowerCase().includes(searchValue) ||
        item.gender.toLowerCase().includes(searchValue) ||
        item.height.toLowerCase().includes(searchValue) ||
        item.id.toString().toLowerCase().includes(searchValue) ||
        item.name.toLowerCase().includes(searchValue)
      );
    });

    return filteredData;
  };

  const sliceIntoChunks = (data: IPerson[]) => {
    const res = [];
    for (let i = 0; i < data.length; i += itemsPerPage) {
      const chunk: IPerson[] = data.slice(i, i + itemsPerPage);
      res.push(chunk);
    }

    return res;
  };

  if (error) return <ErrorIndicator />;

  const filteredData = filteringByValue(data);
  const noData = !filteredData.length;

  const items = renderPeoples(sliceIntoChunks(searchValue || filter.key ? filteredData : data));

  return (
    <div className='card'>
      <div className='card-body'>
        <Input onChange={handleSetSearchValue} />
        <Filters onChangeFilter={handleSetFilterField} searchValueExist={searchValue}/>
        {data.length ? (
          <>
            {!noData ? <ul className='list-group'>{items}</ul> : 'No data'}
            {!noData && (
              <Pagination
                items={searchValue || filter.key ? filteredData : data}
                itemsPerPage={itemsPerPage}
                onChangePage={handleSetPageIndex}
              />
            )}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
