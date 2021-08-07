import axios from 'axios';
import { STORE_USER_LIST, STORE_GET_USER_DATA } from '../type/action-type';

const apiUrl = 'http://localhost:8080/users';

const storeUserList = list => ({
  type: STORE_USER_LIST,
  list,
});

const StoreUserData = data => ({
  type: STORE_GET_USER_DATA,
  data,
});

export const loginUser = data => {
  console.log('request data::', data);
  return axios
    .post(`${apiUrl}/signin`, data)
    .then(response => {
      console.log('back the response', response);
      return Promise.resolve(response.data);
    })
    .catch(error => {
      console.log('error in save data', error, error.response);
      return Promise.reject(error.response.data);
    });
};

export const userList = () => {
  return dispatch => {
    return axios
      .get(apiUrl)
      .then(res => {
        console.log('response::userList', res);
        dispatch(storeUserList(res.data));
      })
      .catch(error => console.log('error in userList', error));
  };
};

export const saveUserData = data => {
  console.log('request data::', data);
  return axios
    .post(`${apiUrl}/signup`, data)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      console.log('error in save data', error.response);
      if (error.response.status === 413) {
        error.response['message'] = error.response.statusText;
        return Promise.reject(error.response);
      }
      return Promise.reject(error.response.data);
    });
};

export const getDataFromUser = id => {
  return dispatch => {
    console.log('request data::', id);
    return axios
      .get(`${apiUrl}/${id}`)
      .then(response => {
        dispatch(StoreUserData(response.data));
        console.log('getDataFromUser response', response);
      })
      .catch(error => console.log('error in get data', error));
  };
};

export const UpdateUser = (id, data) => {
  return dispatch => {
    console.log('request data::updateUser', data, id);
    return axios
      .patch(`${apiUrl}/${id}`, data)
      .then(res => {
        console.log('response::updateUser', res);
        dispatch(StoreUserData(res.data));
      })
      .catch(error => {
        console.log('error in update data', error);
        if (error.response.status === 413) {
          error.response['message'] = error.response.statusText;
          return Promise.reject(error.response);
        }
      });
  };
};

