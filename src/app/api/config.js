import axios from 'axios';
import {DEFAULT_URL} from "amaker/app/constants";

const setInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      config.headers = {
        ...config.headers,
      };
      return config;
    },
    (error) => {
      return Promise.reject(error.response);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error.response);
    },
  );
  return instance;
};

const setAuthInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      config.headers = {
        ...config.headers,
        Authorization: localStorage.getItem('token')
      };
      return config;
    },
    (error) => {
      return Promise.reject(error.response);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error.response);
    },
  );
  return instance;
};

const createInstance = () => {
  const instance = axios.create({
    baseURL: DEFAULT_URL,
    timeout: 5000,
  });
  return setInterceptors(instance);
};
export const request = createInstance();

const createInstanceWithAuth = () => {
  const instance = axios.create({
    baseURL: DEFAULT_URL,
    timeout: 5000,
  });
  return setAuthInterceptors(instance);
};
export const authRequest = createInstanceWithAuth();