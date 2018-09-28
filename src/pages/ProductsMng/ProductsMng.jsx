// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import Paginator from '../../components/Paginator';
import { IMG_URL } from '../../constants';
import type { Product } from '../../PropTypes/Shop';

type ProductsMngProps = {
  products: Array<Product>,
  decPage: () => void,
  incPage: () => void,
  onClickPage: (page: number) => void,
  curPage: number,
  max: number,
  editProduct: (event: SyntheticEvent<*>, _id: string) => void,
  deleteProduct: (event: SyntheticEvent<*>, _id: string) => void,
  addQty: (index: number) => void,
  subQty: (index: number) => void,
  onDisplayChange: (index: number) => void,
};

const ProductsMng = ({
  products,
  decPage,
  incPage,
  onClickPage,
  curPage,
  max,
  editProduct,
  deleteProduct,
  addQty,
  subQty,
  onDisplayChange,
}: ProductsMngProps) => {
  if (!products) {
    return <div>loading</div>;
  }
  return (
    <div className="wrapper">
      <section className="mng">
        <div className="mng__header">
          <h2 className="mng__title">Products</h2>
          <Link to="/dashboard/add" className="mng__btn">ADD</Link>
        </div>
        <form>
          <table className="table">
            <thead>
              <tr className="table__tr">
                <th className="table__th">IMAGE</th>
                <th className="table__th">SKU</th>
                <th className="table__th">PRODUCT NAME</th>
                <th className="table__th">DISPLAY</th>
                <th className="table__th">PRICE</th>
                <th className="table__th center">INVENTORY</th>
                <th className="table__th">EDIT</th>
                <th className="table__th center">DELETE</th>
              </tr>
            </thead>
            <tbody>
            {
              products.map(({
                price,
                name,
                img,
                inventory,
                _id,
                onDisplay,
              }, index) => (
                <tr key={index} className="table__tr">
                  <td className="table__td">
                    <div className="img img--sml">
                      <img className="img__content" src={`${IMG_URL + img.slice(0, -4)}_thb.jpg`}/>
                    </div>
                  </td>
                  <td className="table__td">C65733DA</td>
                  <td className="table__td">{ name }</td>
                  <td className="table__td">
                    <input
                       type="checkbox"
                       checked={onDisplay}
                       onChange={ () => onDisplayChange(index)}
                    />
                  </td>
                  <td className="table__td">{ price }</td>
                  <td className="table__td center">
                     <Spinner
                       value={ inventory }
                       add={ () => addQty(index)}
                       sub={ () => subQty(index)}
                    />
                  </td>
                  <td className="table__td"><a className="pointer" onClick={event => editProduct(event, _id)} >Edit</a></td>
                  <td className="table__td center"><a className="pointer" onClick={event => deleteProduct(event, _id)}>Delete</a></td>
                </tr>))
            }
            </tbody>
          </table>
        </form>
        <Paginator
          dec={decPage}
          inc={incPage}
          onClickPage={onClickPage}
          curPage={curPage} max={max}
        />
        <div className="clearfix"></div>
      </section>
    </div>
  );
};

export default ProductsMng;
