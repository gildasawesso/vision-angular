import {environment} from '../../../environments/environment';

export const apiConstants = {
  baseUrl: window['env'].apiUrl,
  // baseUrl: environment.baseUrl,
  signin: '/auth/signin',
  signup: '/auth/signup'
};
