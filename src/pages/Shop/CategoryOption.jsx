// @flow

import React from 'react';

type CategoryOptionProps = {
  name: string,
  handleOptionChange: (event: SyntheticEvent<*>, name: string) => void,
  category: string,
};

const CategoryOption = ({
  name,
  handleOptionChange,
  category,
}: CategoryOptionProps) => (
  <div>
    <a className="category__link">{name}</a>
    <input
      className="category__selector"
      type="radio"
      value={ name }
      checked={ name === category }
      onChange={event => handleOptionChange(event, name)}
    />
  </div>
);
export default CategoryOption;
