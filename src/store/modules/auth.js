import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

export const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',

  updateCurrentUserStart: '[auth] updateCurrentUserStart',
  updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
  updateCurrentUserFailure: '[auth] updateCurrentUserFailure',

  logout: '[auth] logout',
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser',
  logout: '[auth] logout',
};

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
};

export const auth = {
  state: () => ({
    isSubmiting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
  }),
  getters: {
    [getterTypes.currentUser]: (state) => {
      return state.currentUser;
    },
    [getterTypes.isLoggedIn]: (state) => {
      return Boolean(state.isLoggedIn);
    },
    [getterTypes.isAnonymous]: (state) => {
      return state.isLoggedIn === false;
    },
  },
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
    [mutationsTypes.getCurrentUserStart](state) {
      state.isLoading = true;
    },
    [mutationsTypes.getCurrentUserSuccess](state, payload) {
      state.isLoading = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    [mutationsTypes.getCurrentUserFailure](state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    [mutationsTypes.updateCurrentUserStart]() {},
    [mutationsTypes.updateCurrentUserSuccess](state, payload) {
      state.currentUser = payload;
    },
    [mutationsTypes.updateCurrentUserFailure]() {},
    [mutationsTypes.logout](state) {
      state.currentUser = null;
      state.isLoggedIn = false;
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
    [actionTypes.getCurrentUser](context) {
      return new Promise((resolve) => {
        context.commit(mutationsTypes.getCurrentUserStart);
        authApi
          .getCurrentUser()
          .then((response) => {
            context.commit(
              mutationsTypes.getCurrentUserSuccess,
              response.data.user
            );
            resolve(response.data.user);
          })
          .catch(() => {
            context.commit(mutationsTypes.getCurrentUserFailure);
          });
      });
    },
    [actionTypes.updateCurrentUser](context, {currentUserInput}) {
      return new Promise((resolve) => {
        context.commit(mutationsTypes.updateCurrentUserStart);
        authApi
          .updateCurrentUser(currentUserInput)
          .then((user) => {
            context.commit(mutationsTypes.updateCurrentUserSuccess, user);
            resolve(user);
          })
          .catch((result) => {
            context.commit(
              mutationsTypes.updateCurrentUserFailure,
              result.response.data.errors
            );
          });
      });
    },
    [actionTypes.logout](context) {
      return new Promise((resolve) => {
        setItem('accessToken', '');
        context.commit(mutationsTypes.logout);
        resolve();
      });
    },
  },
  modules: {},
};
