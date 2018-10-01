// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { RouterHistory, Location, Match } from 'react-router';
import { getProduct, updateProduct, createProduct } from '../../services/productService';
import Verify from '../../services/verify';
import { getCategories } from '../../actions/categoryActions';
import Edit from './Edit';
import { IMG_URL } from '../../constants';
import type { Product, Category } from '../../PropTypes/Shop';

type Error = {
  name?: string,
  img?: string,
  price?: string,
}

type EditContainerState = {
  _id: string,
  name: string,
  description: string,
  price: number,
  saleprice: number,
  inventory: number,
  img: string,
  existingImg: string,
  category: string,
  onDisplay: boolean,
  categories: Array<Category>,
  error: Error,
  file?: string | File | Blob,
}

type EditContainerProps = {
  getProducts: (
    category: string,
    page: number,
    cached: boolean,
    callback: () => void,
  ) => void,
  getCategories: (cached: boolean, callback?: () => void) => void,
  products: Array<Product>,
  categories: Array<Category>,
  fetchCategories: boolean,
  pages: number,
  match: Match,
  history: RouterHistory,
  location: Location,
}

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/pjpeg',
  'image/png',
];

class EditContainer extends Component<EditContainerProps, EditContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name: '',
      description: '',
      price: 0,
      saleprice: 0,
      inventory: 1,
      img: '',
      existingImg: '',
      category: '',
      onDisplay: false,
      categories: [],
      fetchCategories: false,
      error: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inventoryAdd = this.inventoryAdd.bind(this);
    this.inventorySub = this.inventorySub.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onImage = this.onImage.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.validate = this.validate.bind(this);
    this.validateAll = this.validateAll.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      const product = this.props.products.find(prod => prod._id === id);
      if (!product) {
        getProduct(id, false).then((data) => {
          this.setState({
            _id: data._id,
            name: data.name,
            description: data.description,
            price: data.price,
            saleprice: data.saleprice,
            inventory: data.inventory,
            img: IMG_URL + data.img,
            existingImg: data.img,
            category: data.category,
            onDisplay: data.onDisplay,
          });
        });
      } else {
        this.setState({
          _id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          saleprice: product.saleprice,
          inventory: product.inventory,
          img: IMG_URL + product.img,
          existingImg: product.img,
          category: product.category,
          onDisplay: product.onDisplay,
        });
      }
    }
    this.props.getCategories(true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchCategories !== this.props.fetchCategories) {
      this.setState({ categories: this.props.categories });
    }
  }

  handleChange: (event: SyntheticEvent<*>) => void

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  inventoryAdd: () => void

  inventoryAdd() {
    const qty = this.state.inventory + 1;
    this.setState({ inventory: qty });
  }

  inventorySub: () => void

  inventorySub() {
    let qty = this.state.inventory - 1;
    if (qty < 0) {
      qty = 0;
    }
    this.setState({ inventory: qty });
  }

  handleSubmit: (event: SyntheticEvent<*>) => void

  handleSubmit(event) {
    event.preventDefault();
    if (!this.validateAll()) {
      return;
    }
    const {
      _id,
      name,
      description,
      price,
      saleprice,
      inventory,
      category,
      onDisplay,
      file,
      existingImg,
      img,
    } = this.state;
    const productData = new FormData();
    let updateImage = false;
    if (img !== (IMG_URL + existingImg)) {
      updateImage = true;
      const fileUpload = file || '';
      productData.append('imgUploader', fileUpload); // don't stringify file
    }
    productData.append('name', name);
    productData.append('description', description);
    productData.append('category', category);
    productData.append('price', price.toString());
    productData.append('saleprice', saleprice.toString());
    productData.append('inventory', inventory.toString());
    productData.append('onDisplay', onDisplay.toString());
    productData.append('img', existingImg);
    productData.append('updateImage', updateImage.toString());
    if (!_id) {
      createProduct(productData).then(() => this.props.history.goBack());
    } else {
      updateProduct(_id, productData).then(() => this.props.history.goBack());
    }
  }

  onBlur: (event: SyntheticEvent<*>) => void

  onBlur(event) {
    const error = this.validate([event.target.name]);
    this.setState({ error });
  }

  validateAll: () => void

  validateAll() {
    const error = this.validate(['name', 'price', 'img']);
    if (Verify.isEmptyObject(error)) {
      return true;
    }
    this.setState({ error });
    return false;
  }

  validate: (types: Array<string>) => void

  validate(types) {
    const error = {};
    const { name, img } = this.state;
    let { price } = this.state;
    types.forEach((type) => {
      switch (type) {
        case 'name':
          if (!Verify.isEmpty(name)) {
            error.name = 'A name is required';
          }
          break;
        case 'price':
          price = Number(price);
          if (!Verify.isNumber(price)) {
            error.price = 'The price must be a number';
          }
          if (price === 0) {
            error.price = 'The price can not be zero.';
          }
          break;
        case 'img':
          if (!Verify.isEmpty(img)) {
            error.img = 'An image file is required';
          }
          break;
        default:
          break;
      }
    });
    return error;
  }

  onCancel: (event: SyntheticEvent<*>) => void

  onCancel(event) {
    event.preventDefault();
    this.props.history.goBack();
  }

  onImage: (event: SyntheticEvent<*>) => void

  onImage(event) {
    event.preventDefault();
    const { files } = event.target;
    if (files.length === 0) {
      return;
    }
    if (EditContainer.validFileType(files[0])) {
      const imgPreviewUrl = window.URL.createObjectURL(files[0]);
      this.setState({
        img: imgPreviewUrl,
        file: files[0],
      });
    }
  }

  static validFileType(file) {
    for (let i = 0; i < ALLOWED_FILE_TYPES.length; i++) {
      if (file.type === ALLOWED_FILE_TYPES[i]) {
        return true;
      }
    }
    return false;
  }

  render() {
    const {
      _id,
      name,
      description,
      price,
      saleprice,
      img,
      category,
      onDisplay,
      categories,
      error,
      inventory,
    } = this.state;

    return (
      <Edit
        id={_id}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onCancel={this.onCancel}
        name={name}
        description={description}
        price={price}
        saleprice={saleprice}
        qty={inventory}
        qtyAdd={this.inventoryAdd}
        qtySub={this.inventorySub}
        categories={categories}
        category={category}
        onDisplay={onDisplay}
        onImage={this.onImage}
        imgUrl={img}
        error={error}
        onBlur={this.onBlur}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCategories: (cached, callback) => dispatch(getCategories(cached, callback)),
});

const mapStateToProps = state => ({
  products: state.products.products,
  categories: state.categories.categories,
  fetchCategories: state.categories.fetchCategories,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer);
