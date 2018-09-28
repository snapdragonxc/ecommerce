// @flow

import React from 'react';
import { SmallSpinner } from '../../components/Spinner';
import type { Category } from '../../PropTypes/Shop';

type Error = {
  name?: string,
  img?: string,
  price?: string,
}

type EditProps = {
  id: string,
  name: string,
  onChange: (event: SyntheticEvent<*>) => void,
  onSubmit: (event: SyntheticEvent<*>) => void,
  onCancel: (event: SyntheticEvent<*>) => void,
  description: string,
  price: number,
  saleprice: number,
  qty: number,
  qtyAdd: () => void,
  qtySub: () => void,
  categories: Array<Category>,
  category: string,
  onImage: (event: SyntheticEvent<*>) => void,
  imgUrl: string,
  onBlur: (event: SyntheticEvent<*>) => void,
  error: Error,
};

const Edit = ({
  id,
  name,
  onChange,
  onSubmit,
  onCancel,
  description,
  price,
  saleprice,
  qty,
  qtyAdd,
  qtySub,
  categories,
  category,
  onImage,
  imgUrl,
  onBlur,
  error,
}: EditProps) => (
  <div className="wrapper">
    <section className="add">
    <h2 className="add__title">{(id) ? 'Edit Product' : 'Add Product'}</h2>
    <form id="formEdit" className="add-form" onSubmit={event => onSubmit(event)} noValidate>
      <div className="row">
        <div className="lg-col-span-7">
          <label htmlFor="name" className="add-form__label">Product Name</label>
          { error && error.name }
          <input
            id="name"
            className="add-form__name"
            name="name"
            type="text"
            value={name}
            onChange={event => onChange(event)}
            onBlur={event => onBlur(event)}
            required
          />
          <label htmlFor="description" className="add-form__label">Description</label>
          <textarea
            id="description"
            className="add-form__description"
            rows="7"
            name="description"
            value={description}
            onChange={event => onChange(event)}>
          </textarea>
          <label className="add-form__label">Category</label>
          <select name="category" className="add-form__category" value={category} onChange={onChange}>
            <option value="none">none set</option>
            { categories.map((el, index) => (
              <option key={index + 1} value={el.name}>
                {el.name}
              </option>))
            }
          </select>
          <div className="add-form__group">
            <label htmlFor="price" className="add-form__label">$ Price</label>
            { error && error.price }
            <input
              id="price"
              className="add-form__price"
              name="price"
              type="text"
              value={price}
              onChange={event => onChange(event)}
              onBlur={event => onBlur(event)}
            />
          </div>
          <div className="add-form__group">
            <label htmlFor="saleprice" className="add-form__label">$ Sale Price</label>
            <input
              id="sellprice"
              className="add-form__sale-price"
              name="saleprice"
              type="text"
              value={saleprice}
              onChange={event => onChange(event)}/>
          </div>
          <div className="add-form__group">
            <label className="add-form__label add-form__label--inventory">Inventory</label>
            <SmallSpinner
              value={qty}
              sub={qtySub}
              add={qtyAdd}/>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="lg-col-span-5">
          <a className="add-form__img-btn" >
            <i className="fa fa-plus" aria-hidden="true"></i> Add Image
            { error && error.img }
            <input className="add-form__img-input"
              id="selectedFile"
              name="img"
              type="file"
              onChange={event => onImage(event)}
            />
          </a>
          <div className="add-form__img-container">
            <div className="img img--no-border">
              <img className="img__content" src={imgUrl} alt="" width='374' height='374'/>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        </div>
      <div className="add-form__btn-container">
        <button className="add-form__btn" type="submit" form="formEdit" value="Submit">SAVE</button>
        <button className="add-form__btn" type="button" onClick={event => onCancel(event)}>CANCEL</button>
      </div>
    </form>
  </section>
  </div>
);
export default Edit;


/*
<a className="add-form__img-btn" onClick={(event) => onSelectFile(event)}>
  <i className="fa fa-plus" aria-hidden="true"></i> Add Image</a>
  { error && error.img } */

/*
  function onSelectFile(event) {
    console.log(event)
    document.getElementById('selectedFile').click();
  } */
