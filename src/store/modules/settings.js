import {mutationsTypes as authMutationsTypes} from '@/store/modules/auth';

export const settings = {
  state: () => ({
    isSubmiting: false,
    validationErrors: null,
  }),
  getters: {},
  mutations: {
    [authMutationsTypes.updateCurrentUserStart](state) {
      state.isSubmiting = true;
      state.validationErrors = null;
    },
    [authMutationsTypes.updateCurrentUserSuccess](state) {
      state.isSubmiting = false;
    },
    [authMutationsTypes.updateCurrentUserFailure](state, payload) {
      state.isSubmiting = false;
      state.validationErrors = payload;
    },
  },
  actions: {},
};
