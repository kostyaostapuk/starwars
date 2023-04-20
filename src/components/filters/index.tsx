import React, { useEffect, useState } from 'react';
import './style.css';
import classNames from 'classnames';
import { IFilter } from '../../models';

interface IProps {
  onChangeFilter: (field: IFilter) => void;
  searchValueExist: string;
}

enum FilterField {
  Gender = 'gender',
}

enum FilterKeys {
  Male = 'male',
  Female = 'female',
}

export const Filters: React.FC<IProps> = ({ onChangeFilter, searchValueExist }) => {
  const [activeFilterKey, setActiveFilterKey] = useState<string>('');
  const handleFilterClick = (filter: IFilter) => () => {
    const { key } = filter;

    setActiveFilterKey(key);
    onChangeFilter(filter);
  };

  useEffect(() => {
    setActiveFilterKey('');
  }, [searchValueExist.length]);
  return (
    <div className='filters'>
      {[
        { key: FilterKeys.Male, field: FilterField.Gender },
        { key: FilterKeys.Female, field: FilterField.Gender },
      ].map((filter) => (
        <span
          className={classNames('badge', { 'badge-active': filter.key === activeFilterKey })}
          onClick={handleFilterClick({ key: filter.key, field: filter.field })}
        >
          {filter.key}
        </span>
      ))}
    </div>
  );
};
