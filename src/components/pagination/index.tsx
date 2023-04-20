import React, {useEffect, useState} from 'react';
import './style.css';
import classNames from 'classnames';
import {IPerson} from "../../models";

interface IProps {
  itemsPerPage: number;
  onChangePage: (index: number) => void;
  items: IPerson[];
}

const minSteps = 1;

export const Pagination: React.FC<IProps> = ({ items, itemsPerPage, onChangePage }) => {
  const [currentPage, setCurrentPage] = useState<number>(minSteps);
  const maxSteps: number = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
      onChangePage(currentPage);
  }, [currentPage])

  const handleClickPrevious = () =>
    setCurrentPage((prevState) => {
      if (prevState <= minSteps) return prevState;
      return prevState - 1;
    });
  const handleClickNext = () =>
    setCurrentPage((prevState) => {
      if (prevState >= maxSteps) return prevState;
      return prevState + 1;
    });
  const handleClickPaginationItem = (index: number) => {
      setCurrentPage(index);
      onChangePage(index);
  };

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination pagination-sm'>
        <li
          className={classNames('page-item', {
            disabled: currentPage <= minSteps,
          })}
          onClick={handleClickPrevious}
        >
          <a className='page-link'>Previous</a>
        </li>
        {new Array(maxSteps).fill(null).map((pag, index) => (
          <li
            className={classNames('page-item', {
              active: index + 1 === currentPage,
            })}
            onClick={() => handleClickPaginationItem(index + 1)}
          >
            <a className='page-link'>{index + 1}</a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage >= maxSteps,
          })}
          onClick={handleClickNext}
        >
          <a className='page-link'>Next</a>
        </li>
      </ul>
    </nav>
  );
};
