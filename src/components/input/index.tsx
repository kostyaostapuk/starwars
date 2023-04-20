import React, { useState } from 'react';

interface IProps {
  onChange: (value: string) => void;
}

export const Input: React.FC<IProps> = ({ onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.FormEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setInputValue(value);
    onChange(value);
  };
  return (
    <nav>
      <form className='form-inline'>
        <input
          className='form-control mr-sm-2'
          type='search'
          placeholder='Search'
          aria-label='Search'
          onInput={handleChange}
        />
      </form>
    </nav>
  );
};
