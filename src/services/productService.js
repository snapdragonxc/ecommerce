import Axios from 'axios';

export async function getEditProducts(page = 1, callback) {
  // this is not cached
  try {
    const category = 'all-items';
    const url = `/api/products/${category}/${page}`;
    const response = await Axios.get(url);
    if (callback) {
      callback(response.data);
    }
  } catch (err) {
    throw (err);
  }
}

export async function getProduct(_id) {
  // this is not cached
  try {
    const url = `/api/products/product/id/${_id}`;
    const response = await Axios.get(url);
    return response.data;
  } catch (err) {
    throw (err);
  }
}

export async function getProductByName(name) {
  // this is cached
  try {
    const url = `/api/products/product/name/${name}`;
    const data = JSON.parse(sessionStorage.getItem(url));
    if (!data) {
      const response = await Axios.get(url);
      sessionStorage.setItem(url, JSON.stringify(response.data));
      return response.data;
    }
    return data;
  } catch (err) {
    throw (err);
  }
}

export async function createProduct(payload) {
  try {
    const response = await Axios.post('/api/products/', payload);
    return response.data;
  } catch (err) {
    throw (err);
  }
}

export async function updateProduct(id, payload) {
  try {
    const response = await Axios.put(`/api/products/${id}`, payload);
    return response.data;
  } catch (err) {
    throw (err);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await Axios.delete(`/api/products/${id}`);
    return response.data;
  } catch (err) {
    throw (err);
  }
}
