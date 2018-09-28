// @flow
import React from 'react';
import type { Category } from '../../PropTypes/Shop';

type Error = {
  name?: string,
}

type CategoriesMngProps = {
  categories: Array<Category>,
  handleChange: (event: SyntheticEvent<*>) => void,
  category: string,
  add: () => void,
  remove: (index: string) => void,
  error: Error,
  onFocus: () => void,
};

const CategoriesMng = ({
  categories,
  handleChange,
  category,
  add,
  remove,
  error,
  onFocus,
}: CategoriesMngProps) => {
  const names = categories.map(({ _id, name }, index) => (
    <tr key={index} className="table__tr">
      <td className="table__td">{name}</td>
      <td className="table__td center">
        <span className="table__btn" onClick={ () => remove(_id) }>&#215;</span>
      </td>
    </tr>
  ));
  return (
    <div className="wrapper">
      <section className="mng mng--categories">
        <div className="mng__header">
          <h2 className="mng__title">Categories</h2>
        </div>
        <div className="mng__category-input-container">
          <input
            className="mng__category-input"
            type="text"
            value={category}
            onChange={event => handleChange(event)}
            onFocus={onFocus}
          />
          <span className="mng__category-input-btn" onClick={add}>+</span>
          {error && error.name}
        </div>
          <form>
            <table className="table">
              <tbody>
                {names}
              </tbody>
            </table>
          </form>
      </section>
    </div>
  );
};
export default CategoriesMng;
