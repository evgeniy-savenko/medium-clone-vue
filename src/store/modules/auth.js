import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

export const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
};

export const auth = {
  state: () => ({
    isSubmiting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
  }),
  getters: {},
  mutations: {
    [mutationsTypes.registerStart](state) {
      state.isSubmiting = true;
      state.validationErrors = null;
    },
    [mutationsTypes.registerSuccess](state, payload) {
      state.isSubmiting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    [mutationsTypes.registerFailure](state, payload) {
      state.isSubmiting = false;
      state.validationErrors = payload;
    },
    [mutationsTypes.loginStart](state) {
      state.isSubmiting = true;
      state.validationErrors = null;
    },
    [mutationsTypes.loginSuccess](state, payload) {
      state.isSubmiting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    [mutationsTypes.loginFailure](state, payload) {
      state.isSubmiting = false;
      state.validationErrors = payload;
    },
  },
  actions: {
    [actionTypes.register](context, credential) {
      return new Promise((resolve) => {
        context.commit(mutationsTypes.registerStart);
        authApi
          .register(credential)
          .then((response) => {
            context.commit(mutationsTypes.registerSuccess, response.data.user);
            setItem('accessToken', response.data.user.token);
            resolve(response.data.user);
          })
          .catch((result) => {
            context.commit(
              mutationsTypes.registerFailure,
              result.response.data.errors
            );
          });
      });
    },
    [actionTypes.login](context, credential) {
      return new Promise((resolve) => {
        context.commit(mutationsTypes.loginStart);
        authApi
          .login(credential)
          .then((response) => {
            context.commit(mutationsTypes.loginSuccess, response.data.user);
            setItem('accessToken', response.data.user.token);
            resolve(response.data.user);
          })
          .catch((result) => {
            context.commit(
              mutationsTypes.loginFailure,
              result.response.data.errors
            );
          });
      });
    },
  },
  modules: {},
};
