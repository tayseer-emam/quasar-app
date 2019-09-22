import axios from 'axios';
import { Notify } from 'quasar'

// "async" is optional
export default async ({ Vue }) => {

  const config = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
  });

  

  config.interceptors.response.use(
    response => response,
    error => {
      Notify.create({
        message: 'You have lost connection to the internet, check your cnnection and try again',
        color: 'negative',
        position: 'top'
      })
      return Promise.reject(error);
  });

  Vue.prototype.$axios = config;
}
