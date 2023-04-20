import React, { useState } from 'react';
import { PeopleList } from '../people-list/people-list';
import { PeopleInfo } from '../people-info/people-info';

export const PeoplePage: React.FC = () => {
  const [selectedPeopleId, setSelectedPeopleId] = useState<number>(1);
  const onSelectedPeople = (selectedPeopleId: number) => setSelectedPeopleId(selectedPeopleId);

  const rows = [<PeopleList onSelectedPeople={onSelectedPeople} />, <PeopleInfo selectedPeopleId={selectedPeopleId.toString()} />];
  return (
    <>
      {rows.map((row, index) => (
        <div className='col-4' key={index}>
          {row}
        </div>
      ))}
    </>
  );
};
